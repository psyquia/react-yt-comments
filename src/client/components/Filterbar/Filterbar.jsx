import React, { useState } from 'react'

import './Filterbar.css';

function Filterbar({
    setFilter,
}) {

    const [query, setQuery] = useState('');

    const handleChange = (evt) => {
        setQuery(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setFilter(query);
    }

    return (
        <>
            <div className="filterbar-header">
                  Comment Filter
              </div>
              <form className='filterbar' onSubmit={handleSubmit}>
                
                <input 
                  className='filterbar-text' 
                  type="search" 
                  value={query} 
                  onChange={handleChange} 
                  placeholder='Enter Keywords'
                />
                <div className="filterbar-submit-container">
                  <div 
                    className='filterbar-submit-btn'
                    onClick={handleSubmit}
                  >
                    FILTER
                  </div>
                </div>
              </form>
        </>
    )
}

export default Filterbar
