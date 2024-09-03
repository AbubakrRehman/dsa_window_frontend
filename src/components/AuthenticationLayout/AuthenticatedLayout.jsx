import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function AuthenticatedLayout() {
    const { user } = useAuth();

    // console.log("auth", user);

    if (user === null) {
        return <Navigate to="/login" />
    }

    return (
        user ? <Outlet /> : <p>Loading....</p>
    )
}

export default AuthenticatedLayout