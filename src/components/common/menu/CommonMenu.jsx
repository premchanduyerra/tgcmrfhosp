import React from 'react'
import { Link } from 'react-router-dom'
import './menu.css'

export const CommonMenu = () => {
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
                <li class="nav-item gradient-hover" style={{ borderRight: '1px solid white' }}>
                    <Link to='/' className='text-decoration-none text-white nav-link m-2'><span className="nav-text">About Us</span></Link>
                </li>
                <li class="nav-item gradient-hover" style={{ borderRight: '1px solid white' }}>
                    <Link to='/contact-us' className='text-decoration-none text-white nav-link m-2'><span className="nav-text">Contact-Us</span></Link>
                </li>
                <li class="nav-item gradient-hover" style={{ borderRight: '1px solid white' }}>
                    <Link className='text-decoration-none text-white nav-link m-2' to='/otp-login'><span className='nav-text'> <img src="https://relieffund.telangana.gov.in:443//images/new.gif" alt='new logo' />Hospital Login(OTP-Based)</span></Link>
                </li>
                <li class="nav-item gradient-hover">
                    <a className='text-decoration-none text-white nav-link m-2' 
                    to='/' href="assets/downloads/CMRFHospitalHelpFile.pdf" target='_blank'>
                    <span className='nav-text'> <img src="https://relieffund.telangana.gov.in:443//images/new.gif" alt='new logo' />Hospital Help-File</span></a>
                </li>
            </ul>
        </div>
    </nav>
    )
}
