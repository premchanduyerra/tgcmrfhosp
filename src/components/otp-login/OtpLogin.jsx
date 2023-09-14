import React, { useState } from 'react'
import { Button, Input,InputGroup,InputGroupText } from 'reactstrap'
import { useRef ,useEffect} from 'react';
import { toast } from 'react-toastify';


export const OtpLogin = () => {
   
    const [mobileNo,setMobileNum] = useState('')
    
    const handleChange=(e)=>{
        setMobileNum(e.target.value)
    }
    const submitHandler=(e)=>{

        e.preventDefault();
        if(mobileNo.length<10){
            toast.error('Please enter valid mobile number')
        }

        //send data to sever
    
        
    }


    return (
        <div className='container'>
        <div className='p-2 w-50 mx-auto' style={{ border: '1px solid black', marginTop: '70px', marginBottom: '70px' }} >
            <form method='post' onSubmit={submitHandler}>
                <h5 className='text-center text-primary'>OTP for Hospital Login</h5>
                <InputGroup size="sm" className='my-3'>
                    <InputGroupText className='bg-primary text-white'>
                        Enter Mobile No.
                    </InputGroupText>
                     <Input type='text'maxLength={10} value={mobileNo} onChange={e=>handleChange(e)}/> 
                </InputGroup>
                <div className='text-center'>
                   <Button style={{background:'#5cb85c'}}>Get Otp</Button>
                </div>
            </form>
        </div>
    </div>
    )
}
