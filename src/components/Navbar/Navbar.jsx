import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import "./Navbar.css";

function Navbar() {

    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleLogOut = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">DSA Window</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {user.user.role === 'ADMIN' ?
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin">Admin</Link>
                                </li>
                                : null
                            }

                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                            <button className="logout-btn" onClick={handleLogOut}>Logout</button>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar