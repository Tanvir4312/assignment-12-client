import React from 'react'

import { Navigate } from 'react-router-dom';
import useRole from '../hooks/useRole';

const ModeratorRoute = ({ children }) => {
  
   
    const [role, isLoading] = useRole()

    if (isLoading) {
        return <div className="flex justify-center mt-60"> <span className="loading loading-bars loading-xl"></span></div>;
    }
    if (role === 'moderator') {
        return children;
    }
    return <Navigate to={'/'}  replace></Navigate>
}

export default ModeratorRoute
