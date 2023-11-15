export const printTable = (tableRef) => {
  const printWindow = window.open('', '', 'width=600,height=600');
  printWindow.document.open();
  printWindow.document.write(`
      <html>
        <head>
          <title>Table Print</title>
        </head>
        <body>
          ${tableRef.current.outerHTML}
        </body>
      </html>
    `);
  printWindow.document.close();
  printWindow.print();
  printWindow.close();
};
  // printUtils.js
export const printContent = (content) => {
  const printWindow = window.open('', '', 'width=600,height=600');
  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.print();
};


