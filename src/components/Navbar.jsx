import React from 'react'
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav>
        <div className="nav-title">Password Manager</div>
        <img className='nav-pass-png' src="icons/password.png" width={40}/>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
    </nav>
)
}

export default Navbar