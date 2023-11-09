import React, { useEffect, useState, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Menu } from '../common/menu/Menu';
import { privateAxios } from '../../hooks/axios/axiosHelper';
import { toast } from 'react-toastify';
import { StyledButton } from '../../globalstyles/styled';
import { printTable } from '../../utils/printUtils';
import { exportToExcelTable } from '../../utils/excelUtils';
import { exportToPdfTable } from '../../utils/pdfUtils';
import { handleLogoutAndRedirect } from '../../hooks/auth/authUtils';


export const PatientReport = () => {
    const tableRef = useRef(null);
    const [report, setReport] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getPatientReport = async () => {
            try {
                const response = await privateAxios.get('/auth/GetPatientReport');
                console.log(response)
                setReport(response.data.data);
            } catch (error) {
                if(error.response){
                    handleLogoutAndRedirect(navigate,error);
                }
                else{
                    toast.error('Error in fetching Patient Report');
                }
            }
        }
        getPatientReport();

        // Disable the back button when the component mounts
        const disableBackButton = () => {
            window.history.pushState(null, null, window.location.pathname);
        };

        disableBackButton();

        // Disable the back button when the component unmounts
        return () => {
            window.history.forward(); // Move forward in history so that the user can't go back
        };
    }, []);

    const handlePrint = () => {
        printTable(tableRef);
    };

    const handleExportToExcel = () => {
        exportToExcelTable(tableRef);
    };

    const handleExportToPDF = () => {
        exportToPdfTable('table-content');
    };

    return (
        <div>
            <Menu />
            <div className='container'>
                <div className='px-5 pt-4 my-5 text-center'>
                    <div 
                    className='d-flex justify-content-start'>
                        <StyledButton onClick={handlePrint}>Print</StyledButton>
                        <StyledButton onClick={handleExportToExcel}>Excel</StyledButton>
                        <StyledButton onClick={handleExportToPDF}>PDF</StyledButton>
                    </div>
                    <div className='table-responsive'>
                    <table
                        className='table table-bordered'
                        id='table-content'
                        ref={tableRef}
                        style={{ borderColor: '#0052CC' }}
                    >
                        <thead>
                            <tr className='table-primary'>
                                <th colSpan={3} scope='col' style={{ color: 'red', fontSize: '20px' }}>
                                    Patient Report
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope='col' style={{ color: '#8B4513' }}>
                                    Total Applications
                                </th>
                                <th scope='col' style={{ color: '#8B4513' }}>
                                    Pending Applications
                                </th>
                                <th scope='col' style={{ color: '#8B4513' }}>
                                    Verified Applications
                                </th>
                            </tr>
                            <tr>
                                <td>{report.totalCount}</td>
                                <td>
                                    <Link to='pending-reports' style={{ color: 'black' }}>
                                        <b>{report.pendingCount}</b>
                                    </Link>
                                </td>
                                <td>
                                    <Link to='verified-list' style={{ color: 'black' }}>
                                        <b>{report.verifiedCount}</b>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div style={{ color: 'red', fontSize: '15px' }} className='text-start'>
                        <b>*Note:For Approval/Rejection of the patient please click on Pending Applications</b>
                    </div>
                </div>
            </div>
        </div>
    );
};
