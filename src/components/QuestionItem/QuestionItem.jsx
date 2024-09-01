import React, { useState } from 'react';
import "../../components/QuestionItem/QuestionItem.css";
import ConfirmationPopupQuestion from '../ConfirmationPopupQuestion/ConfirmationPopupQuestion';
import delete_solid from "../../assets/delete_solid.png";

function QuestionItem({ question, topicId, onRemove }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  

    return (
        <div className='topic-item'>
            <div className="question-title">
                {question.title}
            </div>
            <div className="topic-item-actions ms-auto">
                <>
                    {/* <Button variant="primary" onClick={handleShow}>Delete</Button> */}
                    <button className='delete-btn'>
                        <img onClick={handleShow} src={delete_solid} alt="delete-icon"/>
                    </button>
                    <ConfirmationPopupQuestion show={show} handleClose={handleClose} question={question} topicId={topicId} onSubmit={onRemove} />
                </>

            </div>
        </div>
    )
}

export default QuestionItem