import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./NotePopup.css";

function NotePopup({ show, handleClose, question, onSubmit }) {

    const [formValue, setFormValue] = useState({
        note: question.note
    });

    return (
        <Modal show={show} onHide={handleClose} centered scrollable>
            <Modal.Body>
                <p className='question-title'>{question.title}</p>
                <form>
                    <textarea row="3" className="txtarea" onChange={(e) => setFormValue({ ...formValue, [e.target.name]: e.target.value })} name="note" value={formValue.note}></textarea>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>

                <Button variant="primary" onClick={() => { onSubmit({...question, ...formValue}, 'note'); handleClose() }}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default NotePopup