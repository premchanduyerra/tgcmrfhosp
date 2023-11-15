import React, { useState } from 'react';
import { Button, Col, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { Menu } from '../common/menu/Menu';
import { privateAxios } from '../../hooks/axios/axiosHelper';
import { InputStyle, LabelStyle, StyledButton } from '../../globalstyles/styled';
import { handleLogoutAndRedirect } from '../../hooks/auth/authUtils';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [userPwd, setUserPwd] = useState({
        currentPwd: '',
        newPwd: '',
        confirmPwd: '',
    });
    const [validations, setValidations] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserPwd((prevState) => ({ ...prevState, [name]: value }));
    };
    const resetHandler = () => {
        setUserPwd({
            currentPwd: '',
            newPwd: '',
            confirmPwd: '',
        });
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!userPwd.currentPwd || !userPwd.newPwd || !userPwd.confirmPwd) {
            toast.error('Please enter all the fields');
            return;
        }
        if (userPwd.newPwd !== userPwd.confirmPwd) {
            toast.error('New password and Confirm password should be same');
            return;
        }

        try {
            const response = await privateAxios.put('/auth/ChangePassword', userPwd);

            if (response.status === 200) {
                if (response.data.statusCode === 200) {
                    toast.success('Password updated successfully!!');
                    resetHandler();
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            if(error.response){
                if (error.response.status === 400) {
                    setValidations(error.response.data);
                }
                else {
                    handleLogoutAndRedirect(navigate,error);
                }
            }
            else{
                toast.error('Error in changing password');
            }
        }
    };
    return (
        <div>
            <Menu />
            <div
                className="p-4 w-50 mx-auto"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px', marginTop: '70px', marginBottom: '70px' }}
            >
                <form method="post" onSubmit={submitHandler}>
                    <LabelStyle>Change Password</LabelStyle>
                    <FormGroup row className="mt-4 mb-2">
                        <Label sm={4}>Current password:</Label>
                        <Col sm={8}>
                            <InputStyle
                                type="password"
                                className="form-control"
                                name="currentPwd"
                                value={userPwd.currentPwd}
                                onChange={handleChange}
                                placeholder="Current password"
                            />
                        </Col>
                    </FormGroup>
                    {validations.currentPwd && (
                        <div className="text-danger" style={{ fontSize: '12px' }}>
                            <b>{validations.currentPwd}</b>
                        </div>
                    )}
                    <FormGroup row className="mt-4 mb-2">
                        <Label sm={4}>New password:</Label>
                        <Col sm={8}>
                            <InputStyle
                                type="password"
                                className="form-control"
                                name="newPwd"
                                value={userPwd.newPwd}
                                onChange={handleChange}
                                placeholder="New password"
                            />
                        </Col>
                    </FormGroup>
                    {validations.newPwd && (
                        <div className="text-danger" style={{ fontSize: '12px' }}>
                            <b>{validations.newPwd}</b>
                        </div>
                    )}
                    <FormGroup row className="mt-4 mb-2">
                        <Label sm={4}>Confirm password:</Label>
                        <Col sm={8}>
                            <InputStyle
                                type="password"
                                className="form-control"
                                name="confirmPwd"
                                value={userPwd.confirmPwd}
                                onChange={handleChange}
                                placeholder="Confirm password"
                            />
                        </Col>
                    </FormGroup>
                    {validations.passwordConfirmed && (
                        <div className="text-danger" style={{ fontSize: '12px' }}>
                            <b>{validations.passwordConfirmed}</b>
                        </div>
                    )}
                    <div className="text-center pt-2">
                        <StyledButton type="submit" style={{ marginRight: '20px' }}>
                            ChangePassword
                        </StyledButton>
                        <StyledButton type="button" onClick={resetHandler}>
                            Clear
                        </StyledButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
