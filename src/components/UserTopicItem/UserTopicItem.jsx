import React, { memo } from 'react';
import {  useNavigate } from "react-router-dom";
import "./UserTopicItem.css"

function UserTopicItem({ topic }) {
    console.log("userTopicItem");

    let percentageCompleted = topic._count.questions ? parseInt(topic.completedCount * 100 / topic._count.questions) : 0;
    const navigate = useNavigate();

    return (
        <div className='card' onClick={() => navigate(`topics/${topic.id}/questions`, {state: {title: topic.title}})}>
            <div className="card-headerr">
                <div className='topic-title'>{topic.title}</div>
                <div>{topic._count.questions} Questions</div>
            </div>

            <div className="card-footerr">
                {percentageCompleted ?
                    <>
                        <div className='stat'>
                            <div>{percentageCompleted}% done</div>
                            <div>{topic.completedCount} / {topic._count.questions}</div>
                        </div>

                        <div className="progress-container">
                            <div className="progress-item" style={{ width: `${percentageCompleted}%` }}></div>
                        </div>
                    </>
                    : <div className='mt-2'> Yet to start</div>
                }
            </div>
        </div>
    )
}

export default memo(UserTopicItem)