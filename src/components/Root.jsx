import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import { useAuth } from '../context/AuthContext';

function Root() {

    const { user } = useAuth();

    return (
        <>
            {user ? <Navbar /> : ""}
            <Outlet />
        </>
    )
}

export default Root