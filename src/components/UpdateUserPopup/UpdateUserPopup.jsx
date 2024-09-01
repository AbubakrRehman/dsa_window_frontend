import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../constants/constants';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function UpdateUserPopup({ show, handleClose, user, onSubmit }) {


    const [userDetail, setUserDetail] = useState(null);
    const [formValue, setFormValue] = useState({
        name: "",
        email: "",
        role: ""
    })

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const loadUserDetail = async () => {
            const result = await axios.get(`${BASE_URL}/api/users/${user.id}`);

            const { name, email, role } = result.data;
            setUserDetail({ name, email, role });
            setFormValue({ name, email, role });
            setEdit(false);
        }

        if (show) {
            loadUserDetail();
        }


    }, [show])

    const handleInputChange = (e) => {
        const newFormvalue = { ...formValue, [e.target.name]: e.target.value };
        setFormValue(newFormvalue);
    }

  
    return (
        <Modal show={show} onHide={handleClose} centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form className='user-form'>
                        <div className='profile-pic mb-3'>
                            <span className='profile-pic-text'>A</span>
                        </div>
                        <div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username: &nbsp;</label>
                                <input type="text" value={formValue.name} onChange={handleInputChange} className="form-control" id="username" aria-describedby="emailHelp" name="name" />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email: &nbsp; </label>
                                <input type="email" value={formValue.email} onChange={handleInputChange} className="form-control" id="email" name="email" />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Role: &nbsp;</label>
                                <input type="text" value={formValue.role} onChange={handleInputChange} className="form-control" id="role" name="role" />
                            </div>
                        </div>
                    </form>
          
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>

                <Button disabled={JSON.stringify(formValue) === JSON.stringify(userDetail)} variant="primary" onClick={() => { onSubmit(user); handleClose() }}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateUserPopup