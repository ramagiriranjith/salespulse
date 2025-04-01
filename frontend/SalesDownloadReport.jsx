
import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';



export const SalesDownloadReport = () => {
  const reportRef = useRef(); // Reference to the HTML element you want to convert to PDF

  // Function to generate the PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Use the 'html' method to capture the HTML content from the reference
    doc.html(reportRef.current, {
      callback: (doc) => {
        doc.save('report.pdf'); // Save the PDF with a name
      },
      x: 10,
      y: 10,
    });
  };

  return (
    <div>
      {/* The HTML report content you want to convert */}
      <div ref={reportRef}>
        <h1>Monthly Report</h1>
        <p>This is a detailed report for the month of March 2025.</p>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity Sold</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Product A</td>
              <td>150</td>
              <td>$3000</td>
            </tr>
            <tr>
              <td>Product B</td>
              <td>200</td>
              <td>$4000</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Button to download PDF */}
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};


  