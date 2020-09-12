const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const fetch = require('node-fetch');
const videoIds = require('./randomVideos');

const PORT = process.env.API_PORT || 3000;
const API_KEY = process.env.API_KEY;

const MAX_RESULTS = 10;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());

console.log(PORT);

app.post('/comments/searchby/videotitle', async (req, res) => {
    const { vidTitle } = req.body;
    const vidId = await getVidId(vidTitle);
    const comments = await getComments(vidId);
    res.send(comments);
});

app.post('/comments/searchby/videoid', async (req, res) => {
    const { videoId, nextPageToken, filter } = req.body;
    const comments = await getComments(videoId, nextPageToken, filter);
    res.send(comments);
});

app.post('/comments/getreplies', async (req, res) => {
    const { commentId, nextPageToken } = req.body;
    const comments = await getReplies(commentId,nextPageToken);
    res.send(comments);
});

app.post('/videos/searchby/title', async (req, res) => {
    const { vidTitle } = req.body;
    const videos = await getVidIdList(vidTitle);
    res.send(videos);
});

app.get('/videos/random', async (req, res) => {
    let randId = videoIds[Math.floor(Math.random() * videoIds.length)];
    res.send(randId);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));


const getVidId = async (vidTitle) => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=
    ${vidTitle}&key=${API_KEY}`, {
        method: "GET"
    })
    .then((res) => res.json())
    .then((res) => res.items[0].id.videoId)
    .catch((err) => err);

    return response;
};

const getVidIdList = async (vidTitle) => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULTS}&order=relevance&q=
    ${vidTitle}&key=${API_KEY}`, {
        method: "GET"
    })
    .then((res) => res.json())
    .catch((err) => err);

    return response;
}

const getComments = async (vidId, nextPageToken='', filter='') => {
    const nextPgTokenParam = nextPageToken === '' ? '' : `&pageToken=${nextPageToken}`;
    const searchTermParam = filter === '' ? '' : `&searchTerms=${filter}`;

    const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet${nextPgTokenParam}${searchTermParam}&maxResults=${MAX_RESULTS}&order=relevance&videoId=
    ${vidId}&key=${API_KEY}`, {
        method: "GET"
    })
    .then((res) => res.json())
    .catch((err) => err);
    
    return response;
}

const getReplies = async (commentId, nextPageToken) => {
    // Version that sorts by relevance (capped at 5 replies)
    // 
    // const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=replies&id=${commentId}&order=relevance&key=${API_KEY}`, {
        // method: "GET"
    // })
    // 

    const nextPgTokenParam = nextPageToken === '' ? '' : `&pageToken=${nextPageToken}`;

    const response = await fetch(`https://www.googleapis.com/youtube/v3/comments?part=snippet${nextPgTokenParam}&parentId=${commentId}&key=${API_KEY}`, {
        method: "GET"
    })
    .then((res) => res.json())
    .catch((err) => err);
    
    return response;
    
}