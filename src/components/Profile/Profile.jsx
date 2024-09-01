import axios from 'axios';
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { BASE_URL } from '../../constants/constants';
import { useAuth } from '../../context/AuthContext';
import "./Profile.css";
import uploadSolid from "../../assets/upload_solid.png";
import deleteSolid from "../../assets/delete_solid.png"
import { toast } from 'react-toastify';

function Profile() {

    const fileInputRef = useRef();

    const { user } = useAuth();
    const [userDetail, setUserDetail] = useState(null);
    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const [formValue, setFormValue] = useState({
        name: "",
        email: "",
        role: ""
    })

    const [file, setFile] = useState(null);
    const [edit, setEdit] = useState(false);
    const [_, forceUpdate] = useReducer(x => x + 1, 0);

    // const [formValue, setFormValue] = useState(userDetail)

    const updateUser = (userDetail) => {
        return axios.put(`${BASE_URL}/api/users`, userDetail, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${user.token}`
            }
        })
    }

    useEffect(() => {
        const loadUserDetail = async () => {
            const result = await axios.get(`${BASE_URL}/api/auth/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${user.token}`
                }
            });

            const { name, email, role, profilePic } = result.data;
            setUserDetail({ name, email, role, profilePic });
            setFormValue({ name, email, role, profilePic });
            setProfilePicUrl(profilePic);
            setEdit(false);
        }

        if (user) {
            loadUserDetail();
        }
    }, [_, user])

    const handleInputChange = (e) => {
        const newFormvalue = { ...formValue, [e.target.name]: e.target.value };
        setFormValue(newFormvalue);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', file);

        for (let key in formValue) {
            if (formValue.hasOwnProperty(key)) {
                const value = formValue[key];
                formData.append(key, value)
            }
        }

        try {
            await updateUser(formData);
            toast.success(`User details updated successfully`);
            forceUpdate();

        } catch (error) {
            toast.error(`Failed to update user details`);
        }

    }

    const handleCancelClick = async (e) => {
        setEdit(false);
        setFormValue(userDetail);
        setProfilePicUrl(userDetail.profilePic)
    }

    const handleFileInputChange = (e) => {
        setFile(e.target.files[0]);
        setProfilePicUrl(URL.createObjectURL(e.target.files[0]));
    }

    const handleImageDeleteBtnClick = (e) => {
        setFile(null);
        setProfilePicUrl(null);
        fileInputRef.current.value = "";
    }

    const handleFileInputClick = () => {
        console.log("file input click");
    }

    const tempClass = !edit ? 'd-flex' : '';

    return (

        <div className='profile-container user-detail mt-3'>

            <div className='d-flex'>
                {!edit ? <button className='ms-auto edit-btn d-flex' onClick={() => setEdit(true)}>Edit</button> : null}
            </div>

            <form onSubmit={handleSubmit} className='user-form'>
                <div className='profile-pic mb-3 border'>
                    {!profilePicUrl ? <span className='profile-pic-text'>A</span> : null}
                    {profilePicUrl ? <img src={profilePicUrl} alt="profile_pic" /> : null}
                </div>

                {edit ?
                    <div className='image-actions'>

                        {profilePicUrl ?
                            <button type="button" className='delete-btn' onClick={handleImageDeleteBtnClick}>
                                <img src={deleteSolid} alt="" width="30px" height="30px" />
                            </button> : null
                        }

                        <div className='upload-image'>
                            <label htmlFor="upload-image-input">
                                <img src={uploadSolid} alt="" width="30px" height="30px" />
                            </label>
                            <input ref={fileInputRef}  onClick={handleFileInputClick}  id="upload-image-input" type="file" name="avatar" onChange={handleFileInputChange} />
                        </div>

                    </div> : null
                }
                {/* <input type="file" name="avatar" id="avatar" onChange={handleFileInputChange} /> */}



                <div>
             
                    <div className={`mb-3 ${tempClass}`}>
                        <label htmlFor="username" className="form-label">Username: &nbsp;</label>
                        {edit ? <input type="text" value={formValue.name} onChange={handleInputChange} disabled={user.user.role === 'USER'} className="form-control" id="username" aria-describedby="emailHelp" name="name" />
                            : <div>{formValue.name}</div>}
                    </div>
                    <div className={`mb-3 ${tempClass}`}>
                        <label htmlFor="email" className="form-label">Email: &nbsp; </label>
                        {edit ? <input type="email" value={formValue.email} onChange={handleInputChange} disabled={user.user.role === 'USER'}  className="form-control" id="email" name="email" />
                            : <div>{formValue.email}</div>}
                    </div>
                    <div className={`mb-3 ${tempClass}`}>
                        <label htmlFor="role" className="form-label">Role: &nbsp;</label>
                        {edit ?
                            // <input type="text" value={formValue.role} onChange={handleInputChange} className="form-control" id="role" name="role" />
                            <select id="role" onChange={handleInputChange} name="role" value={formValue.role} disabled={user.user.role === 'USER'}  className="form-select" aria-label="Default select example">
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </select>

                            : <div>{formValue.role}</div>
                        }
                    </div>
                    {edit ?
                        <div className='d-flex'>
                            <div className='ms-auto action-btns'>
                                <button className="cancel-btn" type="button" onClick={handleCancelClick}>Cancel</button>
                                <button disabled={(userDetail.profilePic === profilePicUrl)  && JSON.stringify(formValue) === JSON.stringify(userDetail)} type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </div>

                        : null
                    }
                </div>
            </form>

        </div>

    )
}

export default Profile