import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function AddTopicPopup( {show, handleClose, onAdd }) {
    const [formValue, setFormValue] = useState({
        title: ""
    });


    const handleInputChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }

    useEffect(() => {
     if(show) {
        setFormValue({ ...formValue, title: ""})
     }
    
    }, [show])


  return (
    <Modal show={show} onHide={handleClose} centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Add Topic</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        {/* <label htmlFor="title" className="form-label">Topic</label> */}
                        <input type="text" placeholder="Enter topic title here..." value={formValue.title} onChange={handleInputChange} className="form-control" id="title" name="title"/>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>

                <Button disabled={formValue.title.trim() === ''} variant="primary" onClick={() => { onAdd(formValue); handleClose() }}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal >
  )
}

export default AddTopicPopup