import React, { useEffect, useState } from 'react'
import { privateAxios } from '../../hooks/axios/axiosHelper';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import { Menu } from '../common/menu/Menu';
import { Link } from 'react-router-dom';

export const PendingReports = () => {
    const [pendingReports,setPendingReports] = useState([])
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(()=>{
            privateAxios.get(`/auth/GetPendingPatientReports?p=P`)
                .then((response) => {
                    console.log(response.data.data);
                    setPendingReports(response.data.data)  
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(`Error ${error}`);
                });
    },[])
    const handleSearch = () => {
      // Perform a search operation here based on the 'searchTerm' value
      // Update 'pendingReports' with the filtered results
      // For example, you can filter based on the 'name' field
      // const filteredReports = pendingReports.filter((report) =>
      //   report.name.toLowerCase().includes(searchTerm.toLowerCase())
      // );
      // setPendingReports(filteredReports);
    };
  

    const columns = [
        {
        name: 'Serial No', // Add a column for the serial number
        selector: (_, index) => index + 1,
        conditionalCellStyles: [
          {
            when: (row) => true, // Add your condition here if needed
            style: {
              borderLeft: '1px solid #ccc', // Add border style to the right of this column
              padding: '8px',
            },
          },
        ],
        },
        {
            name: 'Patient IP',
            cell: row=><Link to={`${row.patientIp}`}>{row.patientIp}</Link>,
          },
          {
            name:'Admission No',
            selector:row=>row.admissionNo
          },
          {
            name:'Patient Ip Status',
            selector:row=>row.patientIpStatus
          },
          {
            name: 'Application Received Date From CMO',
            selector: row=>row.applicationDate,
            conditionalCellStyles: [
              {
                when: (row) => true, // Add your condition here if needed
                style: {
                  borderRight: '1px solid #ccc', // Add border style to the right of this column
                  padding: '8px',
                },
              },
            ],
          },
    ]
    const customStyles = {
       headRow:{
        style:{
          border: '1px solid #ccc',
        }
       },
        cells:{
          style:{
            fontSize:'14px',
            textAlign:'center',
          }
        }
       }
       const columnStyles={
        fontSize:'15px',
       }
  return (
    <>
        <Menu/>
        <div className='container'>
          
        <div className='d-flex justify-content-start'>
            <button>Print</button>
            <button>Excel</button>
            <button>PDF</button>
        </div>
        {/* <div className='d-flex justify-content-end'><input type='text' placeholder='search...'/></div> */}
        </div>
        <DataTable
        columns={columns.map((column) => ({
            ...column,
            name: <span style={columnStyles}>{column.name}</span>,
          }))}
        data={pendingReports}
        customStyles={customStyles}
        pagination
      />
      </>
        
  )
}
