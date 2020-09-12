import React, { useEffect, useState } from 'react';
import SearchResTile from './SearchResTile';

import './SearchResults.css';

function SearchResults({
    query,
    videos,
    setCurrentVideo
}) {
    const [ active, setActive ] = useState(false);

    useEffect(() => {
        setActive(true);
    }, [])

    return (
        <div className='searchResults-wrapper'>
            <div className={`searchResults-container ${active ? 'active' : 'inactive'}`}>
            <div className="search-msg">
                You searched for "{query}"
            </div>
            {videos && videos.map((video, i) => (
                <SearchResTile key={i} 
                  id={video.id.videoId}
                  author={video.snippet.channelTitle}
                  title={video.snippet.title}
                  thumb={video.snippet.thumbnails.default}
                  setCurrentVideo={setCurrentVideo}
                />
            ))}
            </div>
        </div>
    )
}

export default SearchResults
