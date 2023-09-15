import React, { useEffect } from 'react'
import { Menu } from '../common/menu/Menu'
import { privateAxios } from '../../hooks/axios/axiosHelper';
import { Button } from 'reactstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const UpdateHosp = () => {
    const [hospitalDetails, setHospitalDetails] = useState({
          'billingInchargeName':'',
          'officialEmailId':'',
          'hospitalAddress':'',

    });
    const handleChange = (e,name) => {
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
            console.log(response.data);
        }
        ).catch((error) => {
            console.log(error);
        })
    }


    useEffect(() => {
        
        //get hosp details from backend

        const getHospDetails= ()=>{
            const response= privateAxios.get('/auth/GetHospDetails').then((response)=>{
                console.log(response.data);
            }
            ).catch((error)=>{
                console.log(error);
            })
            console.log(response.data);
        }
        getHospDetails();
    }, []);
        



  return (
    <div>
        <Menu />
        <div className='container'>
        <div className='px-5 pt-4 text-center'>
        <table class="table table-primary table-striped">
       <thead>
            <tr>
            <th colSpan={4} scope="col"className='text-danger'>Hospital Registration Details</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="col" style={{color:'#b8860b'}}>Billing Incharge Name</th>
                <th scope="col" style={{color:'#b8860b'}}>Official Email id</th>
                <th scope='col' style={{color:'#b8860b'}}>Mobile No</th>
                <th scope="col" style={{color:'#b8860b'}}>Hospital Address</th>
            </tr>
            <tr>
            <td>lorem</td>
            <td>lorem</td>
            <td>lorem</td>
            <td>lorem</td>
            </tr>
        </tbody>
        </table>
        </div>
        <div className='p-2 w-50 mx-auto' style={{ border: '1px solid black', marginTop: '70px', marginBottom: '70px' }} >
            <form  onSubmit={submitHandler}>
                <h5 className='text-center text-primary text-underline'>Update Hospital Registration Details</h5>
                <label>Billing Incharge Name:</label>
                <input type='text' className='form-control' value={hospitalDetails.billingInchargeName} onChange={e=>handleChange(e,'billingInchargeName')}/>
                <label>Official Email id:</label>
                <input type='text' className='form-control' value={hospitalDetails.officialEmailId} onChange={e=>handleChange(e,'officialEmailId')}/>
                <label>Hospital Address</label>
                <input type='text' className='form-control' value={hospitalDetails.hospitalAddress} onChange={e=>handleChange(e,'hospitalAddress')}/>
                <div className='text-center'>
                   <Button style={{background:'#5cb85c'}}>Update Details</Button>
                </div>
            </form>
        </div>
    </div>
    
    </div>
  )
}
