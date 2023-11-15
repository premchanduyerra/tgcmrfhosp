import React from 'react';
import Login from '../../login/Login';
import {Menu} from '../menu/Menu';

const Body = () => {
  const listStyle = {
    borderBottom: '1px dotted black',
    paddingBottom: '5px',
    paddingTop: '5px',
    fontFamily: 'Times New Roman',
  };

  const iconStyle = {
    paddingRight: '5px',
    color: 'red',
  };

  return (
    <>
      <Menu />
      <div className="row p-4">
        <div className="col-lg-8">
          <h2 style={{color: '#0096da'}}>About Chief Minister Relief Fund</h2>
          <b style={{fontWeight: '700', fontFamily: 'Times New Roman'}}>
                        The Chief Minister Relief Fund is intended to extend a helping hand to the poorest of the poor who are in
                        distress due to such reasons as:
          </b>
          <ul style={{listStyle: 'none'}} className="p-3">
            <li style={listStyle}>
              <i className="bi bi-check2-square" style={iconStyle}></i>Health problems which require expensive medicare
            </li>
            <li style={listStyle}>
              <i className="bi bi-check2-square" style={iconStyle}></i>Loss of life of kin & kith
            </li>
            <li style={listStyle}>
              <i className="bi bi-check2-square" style={iconStyle}></i>
                            Loss of properties and sources of livelihood due to unforeseen incidents such as natural calamities
            </li>
            <li style={listStyle}>
              <i className="bi bi-check2-square" style={iconStyle}></i>Road accidents, fire accidents etc.
            </li>
          </ul>
        </div>
        <div className="col-lg-4">
          <Login />
        </div>
      </div>
    </>
  );
};

export default Body;
