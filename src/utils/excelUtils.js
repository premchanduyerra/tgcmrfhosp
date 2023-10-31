// excelUtils.js
import * as XLSX from 'xlsx';

export const exportToExcelTable  = (tableRef, fileName = 'patientReport.xlsx') => {
  const ws = XLSX.utils.table_to_sheet(tableRef.current); // Convert the table to worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Patient_Report'); // Add the worksheet to the workbook
  XLSX.writeFile(wb, fileName); // Trigger the download
};
export const exportToExcel = (data,category, filename) => {
  const header = Object.keys(data[0]);
  const dataWithCategory = [
    [category], // Category name as the first row
    header.map(column => column.charAt(0).toUpperCase() + column.slice(1)),
    ...data.map(row => Object.values(row)),     // Existing data
  ];
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(dataWithCategory);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

