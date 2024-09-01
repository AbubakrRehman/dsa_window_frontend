import React, { memo, useState } from 'react'
import NotePopup from '../NotePopup/NotePopup';
import "../UserQuestionItem/UserQuestionItem.css";
import bookmark_outline from "../../assets/bookmark_outline.svg";
import bookmark_solid from "../../assets/bookmark_solid.svg";
import note_outline from "../../assets/note_outline.png";
import note_solid from "../../assets/note_solid.png";

function UserQuestionItem({  index, question, onQuestionAttempt }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <tr>
            <td>
                <input type="checkbox" checked={question.isCompleted} onChange={() => onQuestionAttempt(question, 'isCompleted')} />
            </td>
            <td>{index + 1}</td>
            <td> <div className='question-title'>{question.title}</div></td>
            <td>
                <div className='action-items'>
                    <div className="bookmark" onClick={() => onQuestionAttempt(question, 'isBookmarked')}>
                        {question.isBookmarked
                            ? <img src={bookmark_solid} alt="bookmark_solid" height="30px" width="30px" />
                            : <img src={bookmark_outline} alt="bookmark_outline" height="30px" width="30px" />
                        }
                    </div>

                    <div onClick={handleShow} className='note'>
                        {question.note
                            ? <img src={note_solid} alt="note_solid" height="30px" width="30px" />
                            : <img src={note_outline} alt="note_outline" height="30px" width="30px" />
                        }
                    </div>
                    <NotePopup show={show} handleClose={handleClose} question={question} onSubmit={onQuestionAttempt} />
                </div>
            </td>
        </tr>
    )
}

export default memo(UserQuestionItem)
