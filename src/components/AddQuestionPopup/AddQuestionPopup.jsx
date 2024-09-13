import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function AddQuestionPopup({ show, handleClose, onAdd }) {

    const [formValue, setFormValue] = useState({
        title: "",
        link: ""
    });


    const handleInputChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }

    useEffect(() => {
     if(show) {
        setFormValue({ ...formValue, title: "", link:""})
     }
    
    }, [show])
    

    return (
        <Modal show={show} onHide={handleClose} centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Add Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Question</label>
                        <textarea value={formValue.title} onChange={handleInputChange} className="form-control" id="title" rows="2" name="title"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="link" className="form-label">Link</label>
                        <textarea value={formValue.link} onChange={handleInputChange} className="form-control" id="link" rows="1" name="link"></textarea>
                    </div>
                    {/* <button type="submit" className="btn btn-primary">Submit</button> */}
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

export default AddQuestionPopup