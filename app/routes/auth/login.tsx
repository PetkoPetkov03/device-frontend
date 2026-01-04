import React from 'react'
import type { Route } from '../../+types/root'
import LoginForm from '~/components/auth/LoginForm'

export const meta = ({}: Route.MetaArgs) => {
    return [
        {title:"Login"}
        
    ]
}

const Login = () => {
  return <LoginForm />
}

export default Login