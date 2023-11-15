import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import {printContent} from '../../utils/printUtils';
import {exportToExcel} from '../../utils/excelUtils';
import {exportToPDF} from '../../utils/pdfUtils';
import {AnchorButton, InputStyle, StyledButton, SuccessButton} from '../../globalstyles/styled';

const CustomDataTable = ({data, columns, title, fileName}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const customStyles = {
    headRow: {
      style: {
        border: '1px solid #ccc',
        borderRight: '1px solid #ccc',
        backgroundColor: '#82CAFF',
        padding: '0px !important',
      },
    },
    headCells: {
      style: {
        padding: '5px !important',
      },
    },
    cells: {
      style: {
        fontSize: '15px',
        textAlign: 'center',
      },
    },
  };

  const columnStyles = {
    fontSize: '16px',
  };

  const inputStyle = {
    width: '100%',
    display: 'inline-block',
    border: '1px solid #ccc',
  };

  const handlePrint = () => {
    const content = generateTableContent();
    printContent(content);
  };

  const generateTableContent = () => {
    const tableStart = '<table style="border-collapse: collapse; width: 100%;">';
    const tableEnd = '</table>';
    const headingRow = `<tr><th colspan="${columns.length + 1}" style="text-align: center; padding: 15px; border: 1px solid #ddd;">${title}</th></tr>`;
    const thStyle = 'text-align: center;border: 1px solid #ddd';
    const headerRow = `<tr>${columns.map((column) => `<th style="${thStyle}">${column.name}</th>`).join('')}</tr>`;
    const tdStyle = 'text-align: center; padding: 5px; border: 1px solid #ddd;';
    const dataRows = filteredData.map((report) => {
      return `<tr>${columns.map((column) => {
        const cellValue = typeof column.selector === 'function' ? column.selector(report) : column.cell(report).props.children;
        const displayedValue = cellValue === null ? '' : cellValue;
        return `<td style="${tdStyle}">${displayedValue}</td>`;
      }).join('')}</tr>`;
    });
    const content = [tableStart, headingRow, headerRow, ...dataRows, tableEnd].join('');
    return content;
  };

  const handleExportExcel = () => {
    const content = generateTableContent();
    exportToExcel(content, title, fileName);
  };

  const handlePdf = () => {
    const content = generateTableContent();
    exportToPDF(content, title, fileName);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const newData = data.filter((row) =>
      Object.values(row).some((value) => value !== null && value.toString().toLowerCase().includes(searchTerm)),
    );
    setFilteredData(newData);
  };
  return (
    <div className='px-5 pt-4 my-2'>
      <div className='text-end mb-2'>
        <SuccessButton style={{marginRight: '0px'}} onClick={() => window.history.back()}>Back</SuccessButton>
      </div>
      {data.length !== 0 && (
        <div className='d-flex flex-column flex-md-row justify-content-md-between justify-content-between align-items-center'>
          <div>
            <StyledButton onClick={handlePrint}>Print</StyledButton>
            <StyledButton onClick={handleExportExcel}>Excel</StyledButton>
            <StyledButton onClick={handlePdf}>PDF</StyledButton>
          </div>
          <div style={{position: 'relative'}}>
            <input type='text' placeholder='Search...' onChange={handleSearch} style={{width: '100%', borderRadius: '5px'}} />
            <i className="bi bi-search" style={{position: 'absolute', right: '10px', top: '35%', transform: 'translateY(-50%)', cursor: 'pointer'}}></i>
          </div>
        </div>
      )}
      <div className="table-responsive">
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
          centered
        />
      </div>
    </div>
  );
};

export default CustomDataTable;
