import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const AuthRedirect = ({ children }) => {
    const [user] = useAuthState(auth);

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AuthRedirect;
