import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function UnauthenticatedLayout() {
    const { user } = useAuth();
    return (
        user ? <Navigate to="/" /> : <Outlet/>
    )
}

export default UnauthenticatedLayout