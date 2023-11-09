import React, { useEffect, useState,useRef } from 'react'
import { privateAxios } from '../../hooks/axios/axiosHelper';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { Menu } from '../common/menu/Menu';
import { AnchorButton, StyledButton, SuccessButton } from '../../globalstyles/styled';
import { useNavigate } from 'react-router-dom';
import  CustomDataTable  from '../customdatatable/CustomDataTable';
import { handleLogoutAndRedirect } from '../../hooks/auth/authUtils';
export const VerifiedList = () => {
  const [verifiedList, setVerifiedList] = useState([])
  const [filteredReports, setFilteredReports] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    privateAxios.get('/auth/GetVerifiedList')
      .then((response) => {
        console.log(response.data.data);
        setVerifiedList(response.data.data)
        setFilteredReports(response.data.data)
      })
      .catch((error) => {
        if(error.response){
          handleLogoutAndRedirect(navigate,error);
      }
      else{
          toast.error('Error in fetching Verified List');
      }
      })

  }, [])

  const handleClick = (row, isApproved) => {
    const verifiedDate = row.verifiedDate;
    const patientIpStatus = isApproved?'true':'false';
    navigate(`/verified-report?verifiedDate=${verifiedDate}&patientIpStatus=${patientIpStatus}`);
  }
  const totalApprovedApplications = verifiedList.reduce(
    (total, row) => total + row.applicationCount,0
  );

  const totalRejectedApplications = verifiedList.reduce(
    (total, row) => total + row.rejectedCount,0
  );
  const columns = [
    {
      name: 'Serial No', 
      selector: (row) => row.serialNo,
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
      name: 'Verified Date',
      selector: row => row.verifiedDate
    },
    {
      name: 'Total Approved Applications',
      cell: row => row.verifiedDate === 'Grand Total'
      ? <b>{row.applicationCount}</b>
      : <AnchorButton onClick={()=>handleClick(row,true)}>{row.applicationCount}</AnchorButton>
    },
    {
      name: 'Total Rejected Applications',
      cell: row => row.verifiedDate === 'Grand Total'
      ? <b>{row.rejectedCount}</b>
      : <AnchorButton onClick={()=>handleClick(row,false)}>{row.rejectedCount}</AnchorButton>
    ,
      conditionalCellStyles: [
        {
          when: (row) => true, 
          style: {
            borderRight: '1px solid #ccc', 
            padding: '8px',
          },
        },
      ],
    }
  ]
  const customRow = 
    {
      serialNo: '',
      verifiedDate:'Grand Total',
      applicationCount: totalApprovedApplications,
      rejectedCount: totalRejectedApplications,
    }
  return (
    <>
      <Menu />
      <div className='container'>
        <CustomDataTable data={[...verifiedList, customRow]} columns={columns} title="Verified List" fileName="VerifiedList"/>
      </div>
    </>
  )
}
