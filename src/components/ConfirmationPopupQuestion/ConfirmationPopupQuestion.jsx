import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ConfirmationPopupQuestion({ show, handleClose, question, topicId, onSubmit }) {
    return (
        <Modal show={show} onHide={handleClose} centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Delete Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this question.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>

                <Button variant="primary" onClick={() => { onSubmit(question, topicId); handleClose() }}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default ConfirmationPopupQuestion