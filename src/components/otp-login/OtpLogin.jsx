import React, { useState } from 'react'
import { useRef ,useEffect} from 'react';
import { toast } from 'react-toastify';
import { Label, FormGroup, Col, Input } from 'reactstrap';
import { InputStyle, LabelStyle, StyledButton, SuccessButton} from '../../globalstyles/styled';
import { myAxios } from '../../hooks/axios/axiosHelper';



export const OtpLogin = () => {
   
    const [mobileNo,setMobileNum] = useState('')
    
    const handleChange=(e)=>{
        setMobileNum(e.target.value)
    }
    const submitHandler=(e)=>{

        e.preventDefault();
        const numericMobileNo = mobileNo.replace(/\D/g, '');
        if (numericMobileNo.length !== 10) {
            toast.error('Please enter a valid mobile number');
            return;
        }
    
        if (!/^[9876]/.test(numericMobileNo)) {
            toast.error('Mobile number should start with 9, 8, 7, or 6');
            return;
        }

        //send data to sever
        myAxios.post('/auth/GenerateOtpForHospitalLogin', { mobileNo: numericMobileNo }).then((response) => {
            if (response.status === 200) {
                if (response.data.statusCode === 200) {
                    toast.success('OTP sent successfully')
                    setMobileNum('')
                }
                else {
                    toast.error(response.data.message)
                }
            }
        })
        .catch((error) => {
                console.log(error);
                toast.error(`error ${error}`)
        })   
    }


    return (
        <div className='container'>
        <div className='p-3 w-50 mx-auto' style={{ border: '1px solid black', marginTop: '70px', marginBottom: '70px' }} >
        <div className='text-end'>
                <SuccessButton  onClick={() => window.history.back()}>Back</SuccessButton>
            </div>
            <form method='post' onSubmit={submitHandler}>
                <h5 className='text-center text-primary'>OTP for Hospital Login</h5>
                {/* <LabelStyle>OTP for Hospital login</LabelStyle> */}
                <FormGroup row className='mt-4 mb-2'>
                        <Label md={4} className='text-lg-end py-1 px-3'>Mobile Number:</Label>
                        <Col md={8}><InputStyle type='text' className='form-control' name='mobileNo' value={mobileNo} onChange={e => handleChange(e, 'mobileNo')} placeholder='New password'/></Col>
                    </FormGroup>
                <div className='text-center'>
                    <StyledButton type='submit'>Send OTP</StyledButton>
                </div>
            </form>
        </div>
    </div>
    )
}
