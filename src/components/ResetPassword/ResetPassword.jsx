import React, { useEffect, useState } from 'react';
import "./ResetPassword.css";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants';
import { toast } from 'react-toastify';

function ResetPassword() {

    const [password, setPassword] = useState('');
    const [isTokenVerified, setIsTokenVerified] = useState(false);
    const { token } = useParams();

    const resetPassword = (token, password) => {
        return axios.post(`${BASE_URL}/api/auth/reset-password`, { token: token, password: password })
    }

    const verifyToken = (token) => {
        return axios.post(`${BASE_URL}/api/auth/verify-password-reset-token`, {
            token: token
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(token, password);
            toast.success("New password has been set");
        } catch (err) {
            toast.error("Token is expired");
        }
    }

    useEffect(() => {
        const loadResetPasswordPage = async (token) => {
            try {
                await verifyToken(token);
                setIsTokenVerified(true);
                toast.success("Token Valid");
            } catch (err) {
                setIsTokenVerified(false);
                toast.success("Token is Invalid");
            }
        }
        if (token) {
            loadResetPasswordPage(token)
        }
    }, [token])

    if (!isTokenVerified) {
        return <p>Toke is Invalid</p>
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="email" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>

            <Link to="/login">Redirect to LogIn</Link>
        </div>
    )
}

export default ResetPassword