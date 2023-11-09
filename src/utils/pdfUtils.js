import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
const generatePdf = (canvas, fileName, imgWidth = 190, imgHeight=0) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgData = canvas.toDataURL('image/png');
  const pageHeight = (imgWidth * 295) / 210;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 10, position + 10, imgWidth, imgHeight);
    heightLeft -= imgHeight;
  }

  pdf.save(`${fileName}.pdf`);
};
export const exportToPDF = (data, title, filename) => {
  const container = document.createElement('div');
  container.innerHTML = data;

  container.style.position = 'absolute';
  container.style.left = '-9999px';

  document.body.appendChild(container);
  html2canvas(container).then((canvas) => {
    console.log(container)
    document.body.removeChild(container);
    generatePdf(canvas, filename);
  });
};
export const exportToPdfTable = (contentId, fileName = 'patientReport') => {
  const content = document.getElementById(contentId);

  html2canvas(content).then((canvas) => {
    generatePdf(canvas, fileName, 190, (canvas.height * 190) / canvas.width);
  });
};
