import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { AuthContext } from '~/providers/auth/AuthProvider';

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        logout();
        navigate("/", {
            replace: true,
        });
        location.reload();
    },[]);
  return null;
}

export default Logout