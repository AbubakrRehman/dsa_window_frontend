import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ConfirmationPopupUser({ show, handleClose, user, onSubmit }) {
    return (
        <Modal show={show} onHide={handleClose} centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this user.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>

                <Button variant="primary" onClick={() => { onSubmit(user); handleClose() }}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default ConfirmationPopupUser