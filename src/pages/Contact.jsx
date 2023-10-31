import React from 'react'
import { Menu } from '../components/common/menu/Menu'

export const Contact = () => {
    const fontstyle = {
        fontFamily: 'Times New Roman',
    }
    return (
        <><Menu/>
        <div className='p-3' style={fontstyle}>
            <label className='text-decoration-underline mb-2'><b>Contact Us</b></label>
            <pre>Ground Floor, HMRL Building,<br />
                Rasoolpura, Begumpet,<br />
                Hyderabad, Telangana - 500022<br />
                <b>Land Line Numbers:</b> 040-23456054/23459905</pre>
        </div>
        </>
    )
}
