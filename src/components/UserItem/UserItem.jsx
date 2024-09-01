import React, { memo, useState } from 'react';
import "./UserItem.css";
import { Link } from "react-router-dom";
import ConfirmationPopupUser from '../ConfirmationPopupUser/ConfirmationPopupUser';
import email_solid from "../../assets/email_solid.png";
import delete_solid from "../../assets/delete_solid.png";
import edit_outline from "../../assets/edit_outline.png";
import UpdateUserPopup from '../UpdateUserPopup/UpdateUserPopup';
import profile_pic from "../../assets/Photo_ID_Card.jpg";

function UserItem({ user, onRemove, onEdit }) {
    console.log("inside userItem");

    const [showEditPopup, setShowEditPopup] = useState(false);
    const [show, setShow] = useState(false);

    const handleEditPopupClose = () => setShowEditPopup(false);
    const handleEditPopupShow = () => setShowEditPopup(true);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='user-item mb-3'>
            <div className='user-detail'>
                <div className='pic-container'>
                    <span> {user.name.split("")[0]}</span>
                    <img className="profile-pic" src={profile_pic} alt="profile-pic"/>
                </div>
                <div className="user-item-content">
                    <Link className="username" to={`${user.id}/`} relative='path'>{user.name}</Link>
                    <div className='d-flex'>
                        <img src={email_solid} alt="email-icon" height="25px" width="25px" />
                        <div>&nbsp;{user.email}</div>
                    </div>
                </div>
            </div>

            <div className="user-item-actions ms-auto">
                <>
                    <button className='edit-btn'>
                        <img onClick={handleEditPopupShow} src={edit_outline} alt="edit-icon" width="25px" height="25px" />
                    </button>

                    <button className='delete-btn'>
                        <img onClick={handleShow} src={delete_solid} alt="delete-icon" />
                    </button>
                    <UpdateUserPopup show={showEditPopup} handleClose={handleEditPopupClose} user={user} onSubmit={onEdit} />
                    <ConfirmationPopupUser show={show} handleClose={handleClose} user={user} onSubmit={onRemove} />
                </>
            </div>
        </div>
    )
}

export default memo(UserItem)