import React, {Suspense} from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function UnauthenticatedLayout() {
    const { user } = useAuth();
    return (
        user ? <Navigate to="/" /> : <Suspense fallback={<div>....loading</div>}><Outlet/></Suspense>
    )
}

export default UnauthenticatedLayout