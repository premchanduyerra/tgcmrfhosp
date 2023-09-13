import React from 'react'
import { Input,InputGroup,InputGroupText } from 'reactstrap'


export const OtpLogin = () => {
    return (
        <div className='container'>
        <div className='p-2 w-50 mx-auto' style={{ border: '1px solid black', marginTop: '70px', marginBottom: '70px' }} >
            <form>
                <h5 className='text-center text-primary'>OTP for Hospital Login</h5>
                <InputGroup size="sm" className='my-3'>
                    <InputGroupText className='bg-primary text-white' onFocus={(e)=>e.target.blur()}>
                        Enter Mobile No.
                    </InputGroupText>
                     <Input type='text'/> 
                </InputGroup>
            </form>
        </div>
    </div>
    )
}
