import React from 'react'
import type { Route } from '../+types/root'
import LoginForm from '~/auth/LoginForm'

export const meta = ({}: Route.MetaArgs) => {
    return [
        {title:"Login"}
        
    ]
}

const Login = () => {
  return <LoginForm />
}

export default Login