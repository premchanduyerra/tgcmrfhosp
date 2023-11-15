// excelUtils.js
import * as XLSX from 'xlsx';
export const exportToExcelTable = (tableRef, fileName = 'patientReport.xlsx') => {
  const ws = XLSX.utils.table_to_sheet(tableRef.current); // Convert the table to worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Patient_Report'); // Add the worksheet to the workbook
  XLSX.writeFile(wb, fileName); // Trigger the download
};
export const exportToExcel = (htmlContent, title, fileName) => {
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = htmlContent;

  // Extract the table element from the container
  const tableElement = tempContainer.querySelector('table');

  // Convert the HTML table to a worksheet
  console.log(tableElement);

  const worksheet = XLSX.utils.table_to_sheet(tableElement, {raw: true});

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

  // Save the workbook to a file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

