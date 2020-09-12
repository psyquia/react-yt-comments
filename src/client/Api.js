const port = process.env.REACT_APP_API_PORT || 3000;

export const getRandVideo = async () => {
    return await fetch(`http://10.0.0.209:${port}/videos/random`, {
        method: "GET",
        headers: {
            "Content-Type": "text/html",
        }
    })
        .then((res) => res.text())
        .catch((err) => err);
}

export const getVideosByTitle = async (title, nextPgToken='') => {
    let data = {
        vidTitle: title,
        nextPageToken: nextPgToken
    }

    return await fetch(`http://10.0.0.209:${port}/videos/searchby/title`, {
        method: "POST",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch((err) => err);
}


export const getComments = async (vidId, nextPgToken='', filter='') => {
    var data = {
        videoId: vidId,
        nextPageToken: nextPgToken,
        filter: filter
    };

    return await fetch(`http://10.0.0.209:${port}/comments/searchby/videoid`, {
        method: "POST",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch((err) => err);
}

export const getReplies = async (id, nextPgToken='') => {
    var data = {
        commentId: id,
        nextPageToken: nextPgToken
    };

    const response = await fetch(`http://10.0.0.209:${port}/comments/getreplies`, {
        method: "POST",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch((err) => err);
    return response;
};