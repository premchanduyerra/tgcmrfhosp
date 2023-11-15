import React from 'react'
import './footer.css';

export const Footer = () => {
    return (
        
        <div className='container'>
        <div className='row px-1 py-3' style={{backgroundColor:'#545454'}}>
            <div className='col-md-5 text-start'>
                <p className='paragraph'>Copyright © 2023 Chief Minister Relief Fund.</p>
                <p className='paragraph'>All Rights Reserved</p>
                <p className='paragraph'>Best viewed with Internet Explorer IE 9+
                 <img src="/assets/header-images/ieimage.png" className='image' alt='Inter Explorer'/>
                 Firefox 61+ <img src="/assets/header-images/firefoximg.jpg" alt='Firefox' className='image'/>
                 Chrome 70+ <img src="/assets/header-images/chromeimg.jpg" alt='chrome' className='image'/></p>
            </div>
            <div className='col-md-7 text-start text-md-end m-md-0 mt-3'>
                <p className='paragraph'>Disclaimer</p>
                <p className='paragraph'>Designed and Developed by Centre for Good Governance,Hyderabad</p>
                <p className='paragraph'>Content owned, maintained and updated by Chief Minister Relief Fund, Govt.of Telangana</p>
            </div>
          </div>
        </div>

    )
}
