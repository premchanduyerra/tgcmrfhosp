import React,{useState,useEffect} from 'react'
import { printContent } from '../../utils/printUtils';
import { exportToExcel } from '../../utils/excelUtils';
import { exportToPDF } from '../../utils/pdfUtils';
import DataTable from 'react-data-table-component';
import { AnchorButton, InputStyle, StyledButton, SuccessButton } from '../../globalstyles/styled';

export const CustomDataTable = ({data,columns,title,fileName}) => {
    const [filteredData, setFilteredData] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        setFilteredData(data); // Set filteredData initially to the full dataset
      }, [data]);
    console.log(filteredData)
    const customStyles = {
        headRow: {
          style: {
            border: '1px solid #ccc',
            borderRight: '1px solid #ccc', 
            backgroundColor: '#82CAFF',
          }
        },
        cells: {
          style: {
            fontSize: '15px',
            color:'red',
          }
        },
      }
      const columnStyles = {
        fontSize: '16px',
      }
      const inputStyle = {
        width: '100%',
        display: 'inline-block',
        border: '1px solid #ccc',
      }
      const handlePrint = () => {
        const content = generateTableContent();
        printContent(content);
      };
      const generateTableContent = () => {
        const tableStart = '<table style="border-collapse: collapse; width: 100%;">';
        const tableEnd = '</table>';
        const headingRow = `<tr><th colspan="${Object.keys(data[0]).length + 1}" style="text-align: center; padding: 15px; border: 1px solid #ddd;">${title}</th></tr>`;
        const thStyle = 'text-align: center;border: 1px solid #ddd;';
        const headerRow = `<tr><th style="${thStyle}">${Object.keys(data[0]).map(header => header.charAt(0).toUpperCase() + header.slice(1)).join('</th><th style="border: 1px solid #ddd; text-align:center">')}</th></tr><tr></tr>`;
        const tdStyle = 'text-align: center; padding: 5px; border: 1px solid #ddd;';
        const dataRows = data.map((report) => `<tr>${Object.values(report).map(value => `<td style="${tdStyle}">${value}</td>`).join('')}</tr>`);
        const content = [tableStart, headingRow, headerRow, ...dataRows, tableEnd].join('');
        return content;
    };
      const handleExportExcel=()=> {
       exportToExcel(data,title,fileName)
      }
      const handlePdf= () => { 
        const content = generateTableContent();
        console.log(content);
        exportToPDF(content,title,fileName);
      }
      const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const newData = data.filter((row) =>
          Object.values(row).some((value) =>value!==null && value.toString().toLowerCase().includes(searchTerm))
        );
        setFilteredData(newData);
      };
      const handlePageChange = (page) => {
        setCurrentPage(page);
      }
  return (
    <div className='px-5 pt-4 my-2 text-center'>
          <div className='text-end mb-2'>
            <SuccessButton style={{ marginRight: '0px' }} onClick={() => window.history.back()}>Back</SuccessButton>
          </div>
          {data.length!==0 ?(
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <StyledButton onClick={handlePrint}>Print</StyledButton>
              <StyledButton onClick={handleExportExcel}>Excel</StyledButton>
              <StyledButton onClick={handlePdf}>PDF</StyledButton>
            </div>
            <div className='w-25' style={{ position: 'relative' }}>
              <input type='text' placeholder='Search...' onChange={handleSearch} style={{ width: '100%', borderRadius:'5px'}} />
              <i className="bi bi-search" style={{ position: 'absolute', right: '10px', top: '35%', transform: 'translateY(-50%)', cursor: 'pointer' }}></i>
            </div>
          </div>
          ):null}
          <DataTable
            columns={columns.map((column) => ({
              ...column,
              name: <span style={columnStyles}>{column.name}</span>,
            }))}
            striped
            highlightOnHover
            data={filteredData}
            customStyles={customStyles}
            pagination
          />

        </div>
  )
}
