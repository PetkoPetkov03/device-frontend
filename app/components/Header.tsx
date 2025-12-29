
const Header = () => {
  return (

    <header className='d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom shadow-sm'>
        <div className='d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none ml-10'><h1 className="fs-4 d-inline-flex link-body-emphasis text-decoration-none">Devices</h1></div>
        <ul className="nav nav-pills mr-4">
          <li className="nav-item m-2">
            <a className="nav-link active" href="/auth">Register</a>
          </li>
          <li className="nav-item m-2">
            <a className="nav-link" href="/auth/login">Login</a>
          </li>
        </ul>
    </header>
  )
}

export default Header