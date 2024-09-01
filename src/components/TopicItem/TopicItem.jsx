import React, { useState } from 'react';
import "../TopicItem/TopicItem.css";
import { useNavigate } from "react-router-dom";
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import edit_outline from "../../assets/edit_outline.png";
import delete_solid from "../../assets/delete_solid.png";
import UpdateTopicPopup from '../UpdateTopicPopup/UpdateTopicPopup';

function TopicItem({ topic, onRemove, onEdit }) {

 

    const [show, setShow] = useState(false);
    const [showTopic, setShowTopic] = useState(false);

    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleTopicClose = () => setShowTopic(false);
    const handleTopicShow = () => setShowTopic(true);

    return (
        <div className='topic-item'>
            <div className="topic-item-content">
                <span onClick={() => navigate(`${topic.id}/questions`)} className='topic-title'>{topic.title}</span>
                <span className='question-count'>{topic._count.questions} questions</span>
            </div>
            <div className="topic-item-actions ms-auto">
                <>
                    <button className='edit-btn'>
                        <img onClick={handleTopicShow} src={edit_outline} alt="edit-icon" height="25px" width="25px"/>
                    </button>
                    <button className='delete-btn'>
                        <img onClick={handleShow} src={delete_solid} alt="delete-icon" />
                    </button>
                    <ConfirmationPopup show={show} handleClose={handleClose} topic={topic} onSubmit={onRemove} />
                    <UpdateTopicPopup show={showTopic} handleClose={handleTopicClose} topic={topic} onSubmit={onEdit} />
                </>

            </div>
        </div>
    )
}

export default TopicItem