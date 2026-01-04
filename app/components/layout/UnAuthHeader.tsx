import { useContext, useEffect, useState } from "react"
import { Link, NavLink } from "react-router";

const UnAuthHeader = () => {

  return (

    <header className='d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom shadow-sm'>

      <div className='d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none ml-10'>
        <NavLink to="/">
          <h1 className="fs-4 d-inline-flex link-body-emphasis text-decoration-none">Devices</h1>
        </NavLink>
      </div>
      <ul className="nav nav-pills mr-4">
        <li className="nav-item m-2">
          <NavLink to="/auth" className="nav-link">Register</NavLink>
        </li>
        <li className="nav-item m-2">
          <NavLink to="/auth/login" className="nav-link">Login</NavLink>
        </li>
      </ul>
    </header>
  )
}

export default UnAuthHeader;