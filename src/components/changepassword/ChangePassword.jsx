import React from 'react'
import { Button } from 'reactstrap'
import { Menu } from '../common/menu/Menu'
import { Label, FormGroup, Col, Input } from 'reactstrap';
import { useState } from 'react'
import { toast } from 'react-toastify'
import { privateAxios } from '../../hooks/axios/axiosHelper'
import { InputStyle, LabelStyle, StyledButton} from '../../globalstyles/styled';

export const ChangePassword = () => {
    const [userPwd, setUserPwd] = useState({
        currentPwd: '',
        newPwd: '',
        confirmPwd: ''
    })
    const [valiadations, setValidations] = useState('');
    const handleChange = (e, field) => {
        setUserPwd({ ...userPwd, [field]: e.target.value })
    }
    const resetHandler = () => {
        setUserPwd({
            currentPwd: '',
            newPwd: '',
            confirmPwd: ''
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if (userPwd.currentPwd === '' || userPwd.newPwd === '' || userPwd.confirmPwd === '') {
            toast.error('Please enter all the fields')
            return;
        }
        else if (userPwd.newPwd !== userPwd.confirmPwd) {
            toast.error('New password and Confirm password should be same')
            return;
        }
        //submit the data to server
        console.log(userPwd)
        const response = privateAxios.post('/auth/ChangePassword', userPwd).then((response) => {
            if (response.status === 200) {
                if (response.data.statusCode === 200) {
                    toast.success("Password updated successfully!!")
                    setUserPwd({
                        currentPwd: '',
                        newPwd: '',
                        confirmPwd: ''
                    })
                }
                else {
                    toast.error(response.data.message)
                }
            }
        })
            .catch((error) => {
                if (error.response.status === 400) {
                    console.log(error.response.data);
                    setValidations(error.response.data);
                }
                else {
                    console.log(error);
                    toast.error(`error ${error}`)
                }
            })

    }
    return (
        <div>
            <Menu />
            <div className='p-4 w-50 mx-auto' style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px', marginTop: '70px', marginBottom: '70px' }} >
                <form method='post' onSubmit={submitHandler}>
                    <LabelStyle>Change Password</LabelStyle>
                    <FormGroup row className='mt-4 mb-2'>
                        <Label sm={4}>Current password:</Label>
                        <Col sm={8}><InputStyle type='password' className='form-control' name='currentPwd' value={userPwd.currentPwd} onChange={e => handleChange(e, 'currentPwd')} placeholder='Current password'/></Col>
                    </FormGroup>
                    <div className='text-danger' style={{ fontSize: '12px' }}><b>{valiadations.currentPwd}</b></div>
                    <FormGroup row className='mt-4 mb-2'>
                        <Label sm={4}>New password:</Label>
                        <Col sm={8}><InputStyle type='password' className='form-control' name='newPwd' value={userPwd.newPwd} onChange={e => handleChange(e, 'newPwd')} placeholder='New password'/></Col>
                    </FormGroup>
                    <div className='text-danger' style={{ fontSize: '12px' }}><b>{valiadations.newPwd}</b></div>
                    <FormGroup row className='mt-4 mb-2'>
                        <Label sm={4}>Confirm password:</Label>
                        <Col sm={8}><InputStyle type='password' className='form-control' name='confirmPwd' value={userPwd.confirmPwd} onChange={e => handleChange(e, 'confirmPwd')} placeholder='Confirm password'/></Col>
                    </FormGroup>
                    <div className='text-danger' style={{ fontSize: '12px' }}><b>{valiadations.passwordConfirmed}</b></div>
                    <div className='text-center pt-2'>
                        <StyledButton type='submit' style={{ marginRight: '20px' }}>ChangePassword</StyledButton>
                        <StyledButton type='button' onClick={resetHandler}>Clear</StyledButton>
                    </div>
                </form>
            </div>
        </div>
    )
}
