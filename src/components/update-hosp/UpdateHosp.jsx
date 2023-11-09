import React, { useEffect } from 'react'
import { Menu } from '../common/menu/Menu'
import { privateAxios } from '../../hooks/axios/axiosHelper';
import { Button } from 'reactstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Label, FormGroup, Col, Input ,Table} from 'reactstrap';
import { InputStyle, LabelStyle, StyledButton, SuccessButton } from '../../globalstyles/styled';
import { doLogout } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';
import { handleLogoutAndRedirect } from '../../hooks/auth/authUtils';
const hasRedirected = false;

export const UpdateHosp = () => {
    const navigate = useNavigate();
    const [hospitalDetails, setHospitalDetails] = useState({
        'billingInchargeName': '',
        'officialEmailId': '',
        'hospitalAddress': '',

    });
    const hasRedirected  = false;

    const [hospital, setHospital] = useState({});
    const [fetchHospDetails, setFetchHospDetails] = useState(false);
    const [valiadations, setValidations] = useState(true);



    const handleChange = (e, name) => {
        setHospitalDetails({ ...hospitalDetails, [name]: e.target.value });
    }
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(hospitalDetails)
        if (hospitalDetails.billingInchargeName === '' || hospitalDetails.officialEmailId === '' || hospitalDetails.hospitalAddress === '') {
            toast.error('Please enter all the fields')
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(hospitalDetails.officialEmailId) === false) {
            toast.error('Please enter valid email id')
            return;
        }
        //submit the data to server
        console.log(hospitalDetails)
        const response = privateAxios.put('/auth/UpdateHospDetails', hospitalDetails).then((response) => {
            if (response.status === 200) {
                if (response.data.statusCode === 200) {
                    toast.success('Hospital Details Updated Successfully')
                    setFetchHospDetails(true)
                    setHospitalDetails({
                        'billingInchargeName': '',
                        'officialEmailId': '',
                        'hospitalAddress': '',
                    }
                    )
                }
                else {
                    toast.error('Error in updating Hospital Details')
                }
            }
            setValidations('')
        }).catch((error) => {
            if(error.response){
                if (error.response.status === 400) {
                    setValidations(error.response.data);
                }
                else {
                    handleLogoutAndRedirect(navigate,error);
                }
            }
            else{
                toast.error('Error in updating Hospital Details');
            }
        })
    }


    useEffect(() => {

        //get hosp details from backend

        const getHospDetails = () => {
            const response = privateAxios.get('/auth/GetHospDetails').then((response) => {
                console.log(response);
                setHospital(response.data.data);
            }
            )
            .catch((error) => {
                if(error.response){
                    handleLogoutAndRedirect(navigate,error);
                }
                else{
                    toast.error('Error in fetching Hospital Details');
                }
            })
            .finally(() => {
                setFetchHospDetails(false);
              })
            console.log(response.data);
        }
        getHospDetails();
    }, [fetchHospDetails]);
    return (
        <div>
            <Menu />
            <div className='container'>
                <div className='px-5 pt-4 text-center'>
                    <Table  responsive bordered id="table-content" style={{borderColor: '#0052CC'}}>
                        <thead>
                            <tr className='table-primary'>
                                <th colSpan={4} scope="col"style={{color:'red',fontSize:'20px'}}>Hospital Registration Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col" style={{ color: '#8B4513' }}>Billing Incharge Name</th>
                                <th scope="col" style={{ color: '#8B4513' }}>Official Email id</th>
                                <th scope='col' style={{ color: '#8B4513' }}>Mobile No</th>
                                <th scope="col" style={{ color: '#8B4513' }}>Hospital Address</th>
                            </tr>
                            <tr>
                                <td>{hospital.hospInchargeName}</td>
                                <td>{hospital.email}</td>
                                <td>{hospital.mobileNo}</td>
                                <td>{hospital.hospAddress}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className='p-4 w-50 mx-auto' style={{boxShadow:'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px', marginTop: '70px', marginBottom: '70px' }} >
                    <form onSubmit={submitHandler}>
                        <LabelStyle>Update Hospital Registration Details</LabelStyle>
                        <FormGroup row className='mt-4 mb-2'>
                        <Label md={5}>Billing Incharge Name:</Label>
                        <Col md={7}><InputStyle type='text' className='form-control' name='billingInchargeName' value={hospitalDetails.billingInchargeName} onChange={e => handleChange(e, 'billingInchargeName')} placeholder='Enter Billing Incharge name'/></Col>
                        </FormGroup>
                        <div className='text-danger' style={{ fontSize: '12px' }}><b>{valiadations.billingInchargeName}</b></div>
                        <FormGroup row className='mt-4 mb-2'>
                        <Label md={5}>Official Email id:</Label>
                        <Col md={7}><InputStyle type='text' className='form-control' name='officialEmailId' value={hospitalDetails.officialEmailId} onChange={e => handleChange(e, 'officialEmailId')} placeholder='Enter official mail-id'/></Col>
                        </FormGroup>
                        <div className='text-danger' style={{ fontSize: '12px' }}><b>{valiadations.officialEmailId}</b></div>
                        <FormGroup row className='mt-4 mb-2'>
                        <Label md={5}>Hospital Address:</Label>
                        <Col md={7}><InputStyle type='text' className='form-control' name='hospitalAddress' value={hospitalDetails.hospitalAddress} onChange={e => handleChange(e, 'hospitalAddress')} placeholder='Enter hospital address'/></Col>
                        </FormGroup>
                        <div className='text-danger' style={{ fontSize: '12px' }}><b>{valiadations.hospitalAddress}</b></div>
                        <div className='text-center pt-2'>
                            <StyledButton>Update Details</StyledButton>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
