import React,{useEffect, useState} from 'react'
import { useNavigate, useParams ,useSearchParams} from 'react-router-dom'
import { privateAxios } from '../../hooks/axios/axiosHelper';
import { toast } from 'react-toastify';
import { Menu } from '../common/menu/Menu';
import DataTable from 'react-data-table-component';
import  CustomDataTable  from '../customdatatable/CustomDataTable';
import { handleLogoutAndRedirect } from '../../hooks/auth/authUtils';

export const VerifiedReport = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reportData, setReportData] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const verifiedDate = searchParams.get('verifiedDate');
    const patientIpStatus = searchParams.get('patientIpStatus');
    const GetVerifiedPatientStatusReport = ()=>{
      privateAxios.get(`/auth/GetVerifiedPatientStatusReport?verifiedDate=${verifiedDate}&patientIpStatus=${patientIpStatus}`)
      .then((response)=>{
        setReportData(response.data.data)
        console.log(response.data.data)
      })
      .catch((error)=>{
        if(error.response){
          handleLogoutAndRedirect(navigate,error);
      }
      else{
         toast.error('Error in fetching Verified Patient Status Report');
      }
      })
    }
    GetVerifiedPatientStatusReport(); 
  }, [searchParams]);
  let columns=[]
  const patientIpStatus=searchParams.get('patientIpStatus');
  if(patientIpStatus==='true'){
    columns=[
      { name: 'Serial No', selector: (row) => row.serialNo,
      conditionalCellStyles: [
        {
          when: (row) => true,
          style: {
            borderLeft: '1px solid #ccc',
            padding: '8px',
          },
        },
      ],},
      { name: 'Patient IP', selector: (row) => row.patientIp },
      { name: 'Admission No', selector: (row) => row.admissionNo },
      { name: 'Patient Name', selector: (row) => row.patientName },
      { name: 'Verified Status', selector: (row) => row.patientIpStatus },
      { name: 'Application Received Date From CMO', selector: (row) => row.deoEnteredOn },
      { name: 'Hospital Approved Date', selector: (row) => row.hospEnteredOn ,
      conditionalCellStyles: [
        {
          when: (row) => true,
          style: {
            borderRight: '1px solid #ccc',
            padding: '8px',
          },
        },
      ],},
    ]
  }else
  columns = [
    { name: 'Serial No', selector: (row) => row.serialNo,
    conditionalCellStyles: [
      {
        when: (row) => true,
        style: {
          borderLeft: '1px solid #ccc',
          padding: '8px',
        },
      },
    ],},
    { name: 'Patient IP', selector: (row) => row.patientIp },
      { name: 'Verified Status', selector: (row) => row.patientIpStatus },
      { name: 'Rejected Reasons', selector: (row) => row.rejectedReasons },
      { name: 'Application Received Date From CMO', selector: (row) => row.deoEnteredOn },
      { name: 'Hospital Approved Date', selector: (row) => row.hospEnteredOn ,
    conditionalCellStyles: [
      {
        when: (row) => true,
        style: {
          borderRight: '1px solid #ccc',
          padding: '8px',
        },
      },
    ],},
  ]
  return (
    <>
    <Menu/>
    <div className='container'>
        <CustomDataTable data={reportData} columns={columns} title='Verified Status Report' fileName='VerifiedStatusReport'/>
        </div>
    </>
  )
}
