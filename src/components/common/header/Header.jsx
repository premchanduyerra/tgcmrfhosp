import React from 'react';
import './header.css';
const Header = () => {
  const headerStyle = {
    background: 'url("assets/header-images/header-bg.jpg")',
    backgroundSize: 'cover',
  };

  const logoStyle = {
    display: 'flex',
    zIndex: 1,
  };

  const imgStyle = {
    width: '80px',
    marginTop: '15px',
  };

  return (
    <div className="container">
      <div className="header-middle row header_background"  >
        <div className="col-sm-8 logo" style={logoStyle}>
          <a href="#">
            <img
              src="/assets/header-images/telanganalogo.png"
              alt="Telangana Logo"
              style={imgStyle}
            />
          </a>
          <h1>
            <span>Chief Minister Relief Fund</span>
            <br />
            Government of Telangana
          </h1>
        </div>
        <div className="col-sm-2"></div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
};

export default Header;
