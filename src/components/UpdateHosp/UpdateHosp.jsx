import React, { useEffect } from 'react'
import { Menu } from '../common/menu/Menu'
import { privateAxios } from '../../hooks/axios/axiosHelper';
import { Button } from 'reactstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Label, FormGroup, Col, Input ,Table} from 'reactstrap';
import { InputStyle, LabelStyle, StyledButton, SuccessButton } from '../../globalstyles/styled';

export const UpdateHosp = () => {
    const [hospitalDetails, setHospitalDetails] = useState({
        'billingInchargeName': '',
        'officialEmailId': '',
        'hospitalAddress': '',

    });

    const [hospital, setHospital] = useState({});
    const [fetchHospDetails, setFetchHospDetails] = useState(false);
    const [valiadations, setValidations] = useState('');



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
        //submit the data to server
        console.log(hospitalDetails)
        const response = privateAxios.post('/auth/UpdateHospDetails', hospitalDetails).then((response) => {
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


    useEffect(() => {

        //get hosp details from backend

        const getHospDetails = () => {
            const response = privateAxios.get('/auth/GetHospDetails').then((response) => {
                console.log(response.data);
                setHospital(response.data.data);
                console.log(hospital);
            }
            ).catch((error) => {
                console.log(error);
                toast.error(`error ${error}`)
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
                    <Table  responsive bordered striped id="table-content" className='table-primary'>
                        <thead>
                            <tr>
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
                        <Label sm={5}>Billing Incharge Name:</Label>
                        <Col sm={7}><InputStyle type='text' className='form-control' name='billingInchargeName' value={hospitalDetails.billingInchargeName} onChange={e => handleChange(e, 'billingInchargeName')} placeholder='Enter Billing Incharge name'/></Col>
                        </FormGroup>
                        <div className='text-danger' style={{ fontSize: '12px' }}><b>{valiadations.billingInchargeName}</b></div>
                        <FormGroup row className='mt-4 mb-2'>
                        <Label sm={5}>Official Email id:</Label>
                        <Col sm={7}><InputStyle type='text' className='form-control' name='officialEmailId' value={hospitalDetails.officialEmailId} onChange={e => handleChange(e, 'officialEmailId')} placeholder='Enter official mail-id'/></Col>
                        </FormGroup>
                        <div className='text-danger' style={{ fontSize: '12px' }}><b>{valiadations.officialEmailId}</b></div>
                        <FormGroup row className='mt-4 mb-2'>
                        <Label sm={5}>Hospital Address:</Label>
                        <Col sm={7}><InputStyle type='text' className='form-control' name='hospitalAddress' value={hospitalDetails.hospitalAddress} onChange={e => handleChange(e, 'hospitalAddress')} placeholder='Enter hospital address'/></Col>
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
