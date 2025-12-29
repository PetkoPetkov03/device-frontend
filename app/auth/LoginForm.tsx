import React, { useState, type FormEvent } from 'react'

interface ErrorResponse {
    error: string,
    errorCode: number,
    timestamp: string,
    type: string,
    validations: []
}

type UserEntity = {
}

interface JsonResponse {
    token: string,
    user: UserEntity
}

interface LoginBody {
    username: string,
    password: string
};

const LoginForm = () => {
    const [status, setStatus] = useState<string|null>();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = async(e: FormEvent) => {
        e.preventDefault();

        const body: LoginBody = {
            username: email,
            password: password
        }

        const response = await fetch("http://localhost:9000/api/v1/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });

        if(!response.ok) {
            const errorDump: ErrorResponse = await response.json()
            setStatus(`Message: ${errorDump.error}`);
            console.log(status);
            return;
        }

        const dump: JsonResponse = await response.json();

        console.log(dump, status);
        
    }

  return (<div className='d-flex w-100 align-items-center py-4 bg-body-tertiary'>
      <main className='form-signin w-50 py-5 mt-5 m-auto d-flex flex-column align-items-center border justify-content-center'>
        <h1 className='h3 mb-3 fw-normal'>Sign in</h1>
        <form onSubmit={(e) => login(e)}>
          
          <div className='form-floating w-90 mb-2'>
            <input id="email" className='form-control' type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' />
            <label htmlFor="email">Email address</label>
          </div>
          
          <div className='form-floating w-90 mb-2'>
            <input id="password" className='form-control' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <label htmlFor="password">Password</label>
          </div>
          <div className='form-floating w-90 d-flex mt-4 justify-content-center'>
            <button className='btn btn-primary py-2 w-80'>Register</button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default LoginForm