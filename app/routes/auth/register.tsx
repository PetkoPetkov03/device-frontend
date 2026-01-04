import React from 'react'
import type { Route } from '../../+types/root'
import RegisterForm from '~/components/auth/RegisterForm'

export const meta = ({}: Route.MetaArgs) => {
    return [
        {title:"Register"}
        
    ]
}

const Register = () => {
  return <RegisterForm />
}

export default Register