import React, { memo } from 'react';
import {  Link, useNavigate } from "react-router-dom";
import "./UserTopicItem.css"

function UserTopicItem({ topic }) {
    console.log("userTopicItem", topic);

    // let percentageCompleted = topic._count.questions ? parseInt(topic.completedCount * 100 / topic._count.questions) : 0;
    
    let percentageCompleted = topic.totalQuestions ? Math.round((topic.completedQuestions / topic.totalQuestions) * 100) : 0; 
    const navigate = useNavigate();

    return (
        <Link className='card' to={`topics/${topic.id}/questions`}>
            <div className="card-headerr">
                <div className='topic-title'>{topic.title}</div>
                <div className='total-questions'>{topic.totalQuestions} Questions</div>
            </div>

            <div className="card-footerr">
                {percentageCompleted ?
                    <>
                        <div className='stat'>
                            <div>{percentageCompleted}% done</div>
                            <div>{topic.completedQuestions} / {topic.totalQuestions}</div>
                        </div>

                        <div className="progress-container">
                            <div className="progress-item" style={{ width: `${percentageCompleted}%` }}></div>
                        </div>
                    </>
                    : <div className='mt-2'> Yet to start</div>
                }
            </div>
        </Link>
    )
}

export default memo(UserTopicItem)