import React, { useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function AuthenticatedLayout() {
    const { user } = useAuth();

    if (user === null) {
        <Navigate to="/login" />
    }

    return (
        user ? <Outlet /> : <p>Loading....</p>
    )
}

export default AuthenticatedLayout