import React from 'react'
import _ from 'lodash'

import './SearchResTile.css';

function SearchResTile({
    id,
    author,
    title,
    thumb,
    setCurrentVideo
}) {
    const handleClick = () => {
        setCurrentVideo(id);
    }

    return (
        <div className='button searchResTile-container' onClick={handleClick}>
            <img className="searchResTile-img" src={thumb.url} width={thumb.width} height={thumb.height} alt='thumbnail'/>
            <div className="searchResTile-text">
                <h3 className='searchResTile-title'>
                    {_.unescape(title)}
                </h3>
                <div className='searchResTile-author'>
                    {author}
                </div>
            </div>
        </div>
    )
}

export default SearchResTile