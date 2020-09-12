import React from 'react'
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { css } from "@emotion/core";
import { getRandVideo, getVideosByTitle, getComments } from '../../Api'
import PropagateLoader from "react-spinners/PropagateLoader";
import Comment from '../Comment/Comment';
import Filterbar from '../Filterbar/Filterbar';

import './Home.css';
import SearchResults from '../SearchResults/SearchResults';


function Home({
  randomId
}) {
    const [videoSearch, setVideoSearch] = useState({ query: '', res: null});
    const [videoId, setVideoId] = useState("");
    const [comments, setComments] = useState(null);
    const [commentFilter, setCommentFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [nextPgToken, setNextPgToken] = useState('');

    useEffect(() => {
      setVideoId(randomId);
    },[randomId])
    
    useEffect(() => {
      if(videoSearch.query === '') {
          setVideoSearch(videoSearch => ({...videoSearch, res: null }));
      }
    }, [videoSearch.query]);

    useEffect(() => {
      setVideoSearch(videoSearch => ({...videoSearch, query: ''}));
      setNextPgToken('');
      setCommentFilter('');
      handleGetComments();
    }, [videoId]);

    useEffect(() => {
      setNextPgToken('');
      handleGetComments();
    }, [commentFilter]);

    const handleChange = (evt) => {
      let q = evt.target.value;
      setVideoSearch(videoSearch => ({...videoSearch, query: q}));
    }

    const handleSubmit = async (evt) => {
      evt.preventDefault();

      let response = await getVideosByTitle(videoSearch.query);
      setVideoSearch(videoSearch => ({...videoSearch, res: response.items }));
    }

    const handleGetComments = async () => {
      let response = await getComments(videoId, '', commentFilter);
      if(response){
        setComments(response.items);
        if(response.nextPageToken)
          setNextPgToken(response.nextPageToken);
        else
          setNextPgToken('');
      }
      
    }

    const handleMoreComments = async () => {
      setLoading(true);
      let res = await getComments(videoId, nextPgToken, commentFilter);
      if(res){
        comments.push(...res.items);
        if(res.nextPageToken)
          setNextPgToken(res.nextPageToken);
        else
          setNextPgToken('');
      }
      setLoading(false);
    }

    return (
        <div className='home'>
            <div className="home-container row">
              <form className='searchbar' onSubmit={handleSubmit}>
                <input 
                  className='searchbar-text' 
                  type="search" 
                  value={videoSearch.query} 
                  onChange={handleChange} 
                  placeholder='Search Videos'
                />
                <div className="searchbar-submit">
                  <AiOutlineSearch 
                    className='searchbar-submit-btn'
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            </div>
            {videoSearch.res && 
              <SearchResults
                query={videoSearch.query}
                videos={videoSearch.res}
                setCurrentVideo={setVideoId}
              />
            }
            {videoId && <div className="container">
              <div className="video-container">
                <iframe className='video' title='tvid' width="889" height="500" src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                </iframe> 
              </div>

              <Filterbar 
               setFilter={setCommentFilter}
              />


              {comments && comments.length===0 && (
                <div className="no-comments">
                  No comments yet
                </div>
              )}

              <div className="comments-container">
                {comments && comments.map((comment, i) => (
                  <Comment key={i} 
                    id={comment.id}
                    author={comment.snippet.topLevelComment.snippet.authorDisplayName}
                    pfp={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                    text={comment.snippet.topLevelComment.snippet.textOriginal}
                    likeCount={comment.snippet.topLevelComment.snippet.likeCount}
                    replyCount={comment.snippet.totalReplyCount}
                  />
                ))}
              </div>
              
              {nextPgToken !== '' && <div className="btn-more-container">
                <div className="button btn-more-comments" onClick={handleMoreComments}>
                  {!loading && <div className="more-comments-body">Show More Comments</div>}
                  <PropagateLoader
                    className='more-comments-spinner'
                    size={15}
                    color={"rgb(197, 36, 36)"}
                    loading={loading}
                    css={css`margin: 0 0 17px -10px;`}
                  />
                </div>
              </div>}
              
            </div>}
            
            
        </div>
    )
}

export default Home
