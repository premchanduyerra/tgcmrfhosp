import React from 'react'

export const Contact = () => {
    const fontstyle = {
        fontFamily: 'Times New Roman',
    }
    return (
        <div className='p-3' style={fontstyle}>
            <label className='text-decoration-underline mb-2'><b>Contact Us</b></label>
            <p>Ground Floor, HMRL Building,<br />
                Rasoolpura, Begumpet,<br />
                Hyderabad, Telangana - 500022<br />
                <b>Land Line Numbers:</b> 040-23456054/23459905</p>
        </div>
    )
}
