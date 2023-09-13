import React from 'react'
import './footer.css';

export const Footer = () => {
    return (
        <div className='container'>
        <div className='row px-1 py-3' style={{backgroundColor:'#545454'}}>
            <div className='col-md-5 text-start'>
                <p>Copyright © 2023 Chief Minister Relief Fund.</p>
                <p>All Rights Reserved</p>
                <p>Best viewed with Internet Explorer IE 9+
                 <img src="https://relieffund.telangana.gov.in:443//images/ieimage.png" style={{width:'20px'}} alt='Inter Explorer'/>
                 Firefox 61+ <img src="https://relieffund.telangana.gov.in:443//images/firefoximg.jpg" alt='Firefox' style={{width:'20px'}}/>
                 Chrome 70+ <img src="https://relieffund.telangana.gov.in:443//images/chromeimg.jpg" alt='chrome' style={{width:'20px'}}/></p>
            </div>
            <div className='col-md-7 text-start text-md-end m-md-0 mt-3'>
                <p>Disclaimer</p>
                <p>Designed and Developed by Centre for Good Governance,Hyderabad</p>
                <p>Content owned, maintained and updated by Chief Minister Relief Fund, Govt.of Telangana</p>
            </div>
          </div>
        </div>
    )
}
