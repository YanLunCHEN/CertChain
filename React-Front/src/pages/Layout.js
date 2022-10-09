import { Outlet, Link } from "react-router-dom";
import React from 'react'


const Layout = () => {
  return (
    
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Userlogin">UserLogin</Link>
          </li>
          <li>
            <Link to="/institutionlogin">InstitutionLogin</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;