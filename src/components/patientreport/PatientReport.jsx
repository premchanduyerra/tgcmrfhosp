import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { Menu } from '../common/menu/Menu'
import { privateAxios } from '../../hooks/axios/axiosHelper';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';

export const PatientReport = () => {
    const [report,setReport] = useState({}) 
    useEffect(()=>{
        const GetPatientReport = () => {
            const response = privateAxios.get('/auth/GetPatientReport').then((response) => {
                console.log(response.data);
                setReport(response.data.data)
            }
            ).catch((error) => {
                console.log(error);
                toast.error(`error ${error}`)
            })
        }
        GetPatientReport();

    },[])
    const GetVerifiedList=()=>{
        privateAxios.get('/auth/GetVerifiedList')
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error);
            toast.error(`Error ${error}`);
        })
    }
    
  return (
    <div>
        <Menu/>
    <div className='container'>
    <div className='px-5 pt-4 my-5 text-center'>
        <div className='d-flex justify-content-start'>
            <button>Print</button>
            <button>Excel</button>
            <button>PDF</button>
        </div>
        <table class="table table-primary table-striped table-bordered">
            <thead>
                <tr>
                    <th colSpan={3} scope="col" style={{color:'red',fontSize:'20px'}}>Patient Report</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="col" style={{ color: '#8B4513' }}>Total Applications</th>
                    <th scope="col" style={{ color: '#8B4513' }}>Pending Applications</th>
                    <th scope='col' style={{ color: '#8B4513' }}>Verified Applications</th>
                </tr>
                <tr>
                    <td>{report.totalCount}</td>
                    <td><Link to='pending'>{report.pendingCount}</Link></td>
                    <td><Link to='verified'>{report.verifiedCount}</Link></td>
                </tr>
                  
            </tbody>
        </table>
        <div style={{color:'red',fontSize:'15px'}} className='text-start'><b>*Note:For Approval/Rejection of the patient please click on Pending Applications</b></div>
    </div>
    </div>
    </div>
  )
}
