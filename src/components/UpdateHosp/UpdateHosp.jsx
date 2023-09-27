import React, { useEffect } from 'react'
import { Menu } from '../common/menu/Menu'
import { privateAxios } from '../../hooks/axios/axiosHelper';
import { Button } from 'reactstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';

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
                    <table class="table table-primary table-striped table-bordered">
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
                    </table>
                </div>
                <div className='p-4 w-50 mx-auto' style={{ border: '1px solid black', marginTop: '70px', marginBottom: '70px' }} >
                    <form onSubmit={submitHandler}>
                        <h5 className='text-center text-decoration-underline mb-3' style={{color:'green'}}><b>Update Hospital Registration Details</b></h5>
                        <label>Billing Incharge Name:</label>
                        <input type='text' className='form-control' name='billingInchargeName' value={hospitalDetails.billingInchargeName} onChange={e => handleChange(e, 'billingInchargeName')} />
                        <div className='text-danger' style={{ fontSize: '12px' }}><b>{valiadations.billingInchargeName}</b></div>
                        <label>Official Email id:</label>
                        <input type='text' className='form-control' name='officialEmailId' value={hospitalDetails.officialEmailId} onChange={e => handleChange(e, 'officialEmailId')} />
                        <div className='text-danger' style={{ fontSize: '12px' }}><b>{valiadations.officialEmailId}</b></div>
                        <label>Hospital Address</label>
                        <input type='text' className='form-control' name='hospitalAddress' value={hospitalDetails.hospitalAddress} onChange={e => handleChange(e, 'hospitalAddress')} />
                        <div className='text-danger' style={{ fontSize: '12px' }}><b>{valiadations.hospitalAddress}</b></div>
                        <div className='text-center'>
                            <Button style={{ background: '#5cb85c' }}>Update Details</Button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
