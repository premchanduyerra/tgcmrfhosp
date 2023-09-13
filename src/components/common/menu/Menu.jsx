import React from 'react'
import { Link } from 'react-router-dom'

export const Menu = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light p-0" style={{ backgroundColor: '#0096da' }}>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item active" style={{ backgroundColor: '#001171', borderRight: '1px solid white' }}>
                    <Link to='/' className='text-decoration-none text-white nav-link m-2'>Home</Link>
                </li>
                <li class="nav-item dropdown" style={{borderRight: '1px solid white' }}>
                    <a className='nav-link dropdown-toggle text-decoration-none text-white nav-link m-2' href='#' id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                    </a>
                    <div class="dropdown-menu m-0 p-0" aria-labelledby="navbarDropdown">
                        <Link class="dropdown-item" to='/about-us' className='text-decoration-none text-white nav-link' style={{background:'#0096da'}}>About Us</Link>
                    </div>
                </li>
                <li class="nav-item" style={{ borderRight: '1px solid white' }}>
                    <Link to='/contact-us' className='text-decoration-none text-white nav-link m-2'>Contact Us</Link>
                </li>
                <li class="nav-item" style={{ borderRight: '1px solid white' }}>
                    <Link className='text-decoration-none text-white nav-link m-2' to='/otp-login'> <img src="https://relieffund.telangana.gov.in:443//images/new.gif" alt='new logo' />Hospital Login(OTP-Based)</Link>
                </li>
                <li class="nav-item">
                    <Link className='text-decoration-none text-white nav-link m-2' to='/'> <img src="https://relieffund.telangana.gov.in:443//images/new.gif" alt='new logo' />Hospital Help-File</Link>
                </li>
            </ul>
        </div>
    </nav>
    )
}
