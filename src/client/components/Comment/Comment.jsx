import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { getReplies } from '../../Api'

import './Comment.css';

function Comment({
    id,
    author,
    pfp,
    text,
    likeCount,
    replyCount
}) {
    const [ replies, setReplies ] = useState(null);
    const [ nextPgToken, setNextPgToken ] = useState('');
    const [ showReplies, setShowReplies ] = useState(false);

    useEffect(() => {
        setReplies(null);
        setNextPgToken('');
        setShowReplies(false);
    },[id])

    const handleGetReplies = async () => {
        setShowReplies(!showReplies);
        if(!replies){
            let repl = await getReplies(id);
            if(repl){
                console.log(repl);
                if(repl.nextPageToken){
                    setNextPgToken(repl.nextPageToken);
                }
                setReplies(repl.items);
            }
        }
    }

    const handleGetMoreReplies = async () => {
        let repl = await getReplies(id, nextPgToken);
        if(repl){
            replies.push(...repl.items);
            console.log(repl);
            if(repl.nextPageToken){
                setNextPgToken(repl.nextPageToken);
            }else{
                setNextPgToken('');
            }
        }
    }

    return (
        <div  className="comment">
            <div className="like-count">
                {likeCount < 6 ? [...Array(5)].map((x,i) => 
                    <AiFillStar key={i} className={i+1 > likeCount ? 'icon-like grey' : 'icon-like'}/> 
                ) :
                    <>
                    <AiFillStar className='icon-like'/> 
                    <AiFillStar className='icon-like'/> 
                    <AiFillStar className='icon-like'/> 
                    <AiFillStar className='icon-like'/> 
                    <AiFillStar className='icon-like'/> 
                    ...{likeCount}
                    </>
                }
            </div>
            
            <p className='comment-body'>
                <i className='quotation-marks'>"</i> 
                {text} 
                <i className='quotation-marks'>"</i>
            </p>
            <div className="comment-author">
                <h3>
                    — {author}
                </h3>
                <img className='comment-author-pfp' alt='pfp' src={pfp}/>
            </div>
            <div className="reply-btn">
                {replyCount > 0 && <div className='button' onClick={handleGetReplies}>
                    {replyCount>1 ? 
                        (showReplies ? `Hide ${replyCount} Replies` : `Show ${replyCount} Replies`) 
                        : (showReplies ? `Hide Reply` : `Show Reply`)}
                </div>}
            </div>
            
            <div className="reply-container-all">
                {replies && showReplies && replies.map((reply,i) => (
                    <div key={i} className="reply-container">
                        <div className="like-count">
                            {reply.snippet.likeCount < 6 ? [...Array(5)].map((x,i) => 
                                <AiFillStar key={i} className={i+1 > reply.snippet.likeCount ? 'icon-like grey' : 'icon-like'}/> 
                            ) :
                                <>
                                <AiFillStar className='icon-like'/> 
                                <AiFillStar className='icon-like'/> 
                                <AiFillStar className='icon-like'/> 
                                <AiFillStar className='icon-like'/> 
                                <AiFillStar className='icon-like'/> 
                                ...{reply.snippet.likeCount}
                                </>
                            }
                        </div>
                        
                        <p className='comment-body'>
                            <i className='quotation-marks'>"</i> 
                            {reply.snippet.textOriginal}
                            <i className='quotation-marks'>"</i>
                        </p>
                        <div className="comment-author">
                            <h3 className='reply'>
                                — {reply.snippet.authorDisplayName}
                            </h3>
                            <img className='comment-author-pfp reply' alt='pfp' src={reply.snippet.authorProfileImageUrl}/>
                        </div>
                    </div>
                ))}
                {showReplies && nextPgToken !== '' && <div className="moreReplies-container">
                    <div className="button btn-moreReplies" onClick={handleGetMoreReplies}>
                        Show More Replies
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Comment
