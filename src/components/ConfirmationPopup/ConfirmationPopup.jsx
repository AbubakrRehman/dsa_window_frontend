import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ConfirmationPopup({ show, handleClose, topic, onSubmit }) {
    return (
        <Modal show={show} onHide={handleClose} centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Delete Topic</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete <span className='topic-name'>{topic.title}</span> topic.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>

                <Button variant="primary" onClick={() => { onSubmit(topic); handleClose() }}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default ConfirmationPopup