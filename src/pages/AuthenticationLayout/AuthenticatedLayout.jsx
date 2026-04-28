import React, {Suspense} from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar.jsx";

function AuthenticatedLayout() {
    const { user } = useAuth();

    // console.log("auth", user);

    if (user === null) {
        return <Navigate to="/login" />
    }

    return (
        user ? 
        <>
        <Navbar/>
        <Suspense fallback={<div>...........loading</div>}>
        <Outlet />
        </Suspense>
        </>
         : <p>Loading....</p>
    )
}

export default AuthenticatedLayout