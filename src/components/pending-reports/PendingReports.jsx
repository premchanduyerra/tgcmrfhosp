import React, { useEffect, useState } from 'react'
import { privateAxios } from '../../hooks/axios/axiosHelper';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import { Menu } from '../common/menu/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { AnchorButton } from '../../globalstyles/styled';
import { useGlobalContext } from '../../context/globalContext';
import  CustomDataTable  from '../customdatatable/CustomDataTable';
import { handleLogoutAndRedirect } from '../../hooks/auth/authUtils';

export const PendingReports = () => {
  const navigate = useNavigate();
  const [pendingReports, setPendingReports] = useState([])
  const [filteredReports, setFilteredReports] = useState([])
  const { state, actions } = useGlobalContext();

  const handlePatientClick = (patientIp, admissionNo, cmrfNo) => {
    actions.setPatientData({ patientIp, admissionNo, cmrfNo })
    localStorage.setItem('patientData', JSON.stringify({ patientIp, admissionNo, cmrfNo }));
    navigate('pending-patient');
  }
  useEffect(() => {
    privateAxios.get(`/auth/GetPendingPatientReports?p=P`)
      .then((response) => {
        console.log(response.data.data);
        setPendingReports(response.data.data)
        setFilteredReports(response.data.data)
      })
      .catch((error) => {
        if(error.response){
          handleLogoutAndRedirect(navigate,error);
      }
      else{
          toast.error('Error in fetching Pending Patient Reports');
      }
      });
  }, [])

  const columns = [
    {
      name: 'Serial No',
      selector: row => row.serialNo,
      conditionalCellStyles: [
        {
          when: (row) => true,
          style: {
            borderLeft: '1px solid #ccc',
            padding: '8px',
          },
        },
      ],
    },
    {
      name: 'Patient IP',
      cell: row => <AnchorButton onClick={() => handlePatientClick(row.patientIp, row.admissionNo, row.mla_cmrf)}>{row.patientIp}</AnchorButton>,
    },
    {
      name: 'Admission No',
      selector: row => row.admissionNo
    },
    {
      name: 'Patient Ip Status',
      selector: row => row.patientIpStatus
    },
    {
      name: 'Application Received Date From CMO',
      selector: row => row.applicationDate,
      conditionalCellStyles: [
        {
          when: (row) => true,
          style: {
            borderRight: '1px solid #ccc',
            padding: '8px',
          },
        },
      ],
    },
  ];
  return (
    <>
      <Menu />
      <div className='container'>
        <CustomDataTable data={pendingReports} columns={columns} title="Pending Reports" fileName = "PendingReports"/>
      </div>
    </>

  )
}
