import React, { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react'

const RegisterForm = () => {

  const [serialNumber, setSerialNumber] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [fullName, setFullName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [conPassword, setConPassword] = useState<string>();
  const [purchaseDate, setPurchaseDate] = useState<Date|null>();

  const register = (event: FormEvent) => {
    event.preventDefault();

    console.log(purchaseDate);
    
  }

  return (
    <div className='d-flex w-100 align-items-center py-4'>
      <main className='form-signin w-50 py-5 mt-5 m-auto d-flex flex-column shadow-lg rounded align-items-center border justify-content-center'>
        <h1 className='h3 mb-3 fw-normal'>Sign in</h1>
        <form onSubmit={(e) => register(e)}>
          <div className='form-floating w-90 mb-2'>
            <input id="dSN" className='form-control' type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} placeholder='Device Serial Number' />
            <label htmlFor="dSN">Device Serial Number</label>
          </div>
          <div className='form-floating w-90 mb-2'>
            <input id="email" className='form-control' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' />
            <label htmlFor="email">Email address</label>
          </div>
          <div className='form-floating w-90 mb-2'>
            <input id="fullName" className='form-control' type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Full Name' />
            <label htmlFor="fullName">Full Name</label>
          </div>
          <div className='form-floating w-90 mb-2'>
            <input id="phoneNum" className='form-control' type="tel" placeholder='Phone Number' value={phone} onChange={(e) => setPhone(phone)} pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
            <label htmlFor="phoneNum">Phone Number</label>
          </div>
          <div className='form-floating w-90 mb-2'>
            <input id="password" className='form-control' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <label htmlFor="password">Password</label>
          </div>
          <div className='form-floating w-90 mb-2'>
            <input id="cPassword" className='form-control' type="password" value={conPassword} onChange={(e) => setConPassword(e.target.value)} placeholder='Confirmed Password' />
            <label htmlFor="cPassword">Confirm Password</label>
          </div>
          <div className='form-floating w-90 mb-2'>
            <input id="purchaseDate" className='form-control' type="date" onChange={(e) => setPurchaseDate(e.target.value ? new Date(e.target.value) : null)} placeholder='date' />
            <label htmlFor="purchaseDate">Purchase Date</label>
          </div>
          <div className='form-floating w-90 d-flex mt-4 justify-content-center'>
            <button className='btn btn-primary py-2 w-80'>Register</button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default RegisterForm