import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import { useAuth } from '../context/AuthContext';

function Root() {

    const { user } = useAuth();

    console.log("root", user);

   

    return (
        <>
            {user ? <Navbar /> : ""}
            <Outlet />
        </>
    )
}

export default Root