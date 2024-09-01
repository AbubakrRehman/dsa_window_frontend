import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./UpdateTopicPopup.css"

function UpdateTopicPopup({ show, handleClose, topic, onSubmit }) {
   
    const [formValue, setFormValue] = useState(topic?.title || '');
 
    return (
        <Modal show={show} onHide={handleClose} centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Update Topic</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="topic-title" className="form-label">Topic Name</label>
                        <input type="email" onChange={(e)=> setFormValue(e.target.value)} name="title" value={formValue} placeholder="Enter Topic name here..." className="form-control" id="topic-title"  />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>

                <Button disabled={topic.title === formValue} variant="primary" onClick={() => { onSubmit(topic, formValue); handleClose() }}>
                 Update
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default UpdateTopicPopup