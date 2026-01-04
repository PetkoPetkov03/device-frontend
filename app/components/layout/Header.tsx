import React, { useContext } from 'react'
import { AuthContext } from '../../providers/auth/AuthProvider';
import UnAuthHeader from './UnAuthHeader';
import AuthHeader from './AuthHeader';

const Header = () => {
    const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated === false ? <UnAuthHeader /> : <AuthHeader />
}

export default Header