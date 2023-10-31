import React, { useEffect, useState,useRef} from 'react'
import { Link } from 'react-router-dom';
import { Menu } from '../common/menu/Menu'
import { privateAxios } from '../../hooks/axios/axiosHelper';
import { toast } from 'react-toastify';
import { Button,Table } from 'reactstrap';
import { StyledButton } from '../../globalstyles/styled';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';
import { printTable } from '../../utils/printUtils';
import { exportToPDF, exportToPdfTable } from '../../utils/pdfUtils';
import { exportToExcelTable } from '../../utils/excelUtils';


export const PatientReport = () => {
    const tableRef = useRef(null);
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
      const exportToExcel = () => {
        exportToExcelTable(tableRef)
      };
     const exportToPDF = () => {
      exportToPdfTable('table-content')
     } 
  return (
    <div>
        <Menu/>
    <div className='container'>
    <div className='px-5 pt-4 my-5 text-center'>
        <div className='d-flex justify-content-start'>
            <StyledButton onClick={() => printTable(tableRef)}>Print</StyledButton>
            <StyledButton onClick={exportToExcel}>Excel</StyledButton>
            <StyledButton onClick={exportToPDF}>PDF</StyledButton>
        </div>
        <table className='table table-bordered table-primary striped' id='table-content' ref={tableRef}>
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
                    <td><Link to='pending-reports' style={{color:'black'}}><b>{report.pendingCount}</b></Link></td>
                    <td><Link to='verified-list' style={{color:'black'}}><b>{report.verifiedCount}</b></Link></td>
                </tr>   
            </tbody>
            </table>
        <div style={{color:'red',fontSize:'15px'}} className='text-start'><b>*Note:For Approval/Rejection of the patient please click on Pending Applications</b></div>
    </div>
    </div>
    </div>
  )
}
