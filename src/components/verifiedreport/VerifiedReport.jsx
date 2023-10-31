import React,{useEffect, useState} from 'react'
import { useParams ,useSearchParams} from 'react-router-dom'
import { privateAxios } from '../../hooks/axios/axiosHelper';
import { toast } from 'react-toastify';
import { Menu } from '../common/menu/Menu';
import DataTable from 'react-data-table-component';
import { CustomDataTable } from '../customdatatable/CustomDataTable';

export const VerifiedReport = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reportData, setReportData] = useState([]);
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
        console.log(error);
        toast.error(`Error ${error}`);
      })
    }
    GetVerifiedPatientStatusReport(); 
  }, []);
  let columns=[]
  const patientIpStatus=searchParams.get('patientIpStatus');
  if(patientIpStatus==='true'){
    columns=[
      { name: 'Serial No', selector: (_, index) => index + 1 ,
      conditionalCellStyles: [
        {
          when: (row) => true,
          style: {
            borderLeft: '1px solid #ccc',
            padding: '8px',
          },
        },
      ],},
      { name: 'Patient IP', selector: 'patientIp'},
      { name: 'Admission No', selector: 'admissionNo' },
      { name: 'Patient Name', selector: 'patientName' },
      { name: 'Verified Status', selector: 'patientIpStatus'},
      { name: 'Application Received Date From CMO', selector: 'deoEnteredOn' },
      { name: 'Hospital Approved Date', selector: 'hospEnteredOn' ,
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
    { name: 'Serial No', selector: (_, index) => index + 1 ,
    conditionalCellStyles: [
      {
        when: (row) => true,
        style: {
          borderLeft: '1px solid #ccc',
          padding: '8px',
        },
      },
    ],},
    { name: 'Patient IP', selector: 'patientIp'},
    { name: 'Verified Status', selector: 'patientIpStatus'},
    { name: 'Rejected Reasons', selector: 'rejectedReasons'},
    { name: 'Application Received Date From CMO', selector: 'deoEnteredOn' },
    { name: 'Hospital Approved Date', selector: 'hospEnteredOn' ,
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
