import React, { useState } from 'react';
import Page from "../../components/Page";
import { getSaleDetailedReport } from '../../controllers/reports.controller';
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas-pro";
import toast from 'react-hot-toast';

export const SaleDetailedReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [report, setReport] = useState([]);

  const getReport = async () => {
    if (!startDate || !endDate) {
      alert("Please select a date range.");
      return;
    }

    try {
      const data = await getSaleDetailedReport(startDate, endDate);
      console.log(data);
      
      setReport(data);
    } catch (error) {
      console.error("Error fetching sale detailed report:", error);
    }
  };
  const handleDownloadPDF = () => {
    const input = document.getElementById("pdf-content");
  
    if (!input) {
      console.error("Error: PDF content element not found!");
      return;
    }
  
    setTimeout(() => {
      html2canvas(input, { scale: 2 })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
          pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
          pdf.save(`Sales_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
          toast.success("📄 PDF Downloaded Successfully!");
        })
        .catch((error) => console.error("PDF Generation Error:", error));
    }, 300); // Slight delay to ensure rendering
  };

    return (
      <Page>
        <h3 className="text-2xl"> Sale Detailed Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-0 lg:grid-cols-0 gap-0 mt-2">

          <div className='period-date row m-1' >
            {/* <!-- Start Date --> */}

            <div className="col-md-4">
              <label htmlFor="start_date" className="block mb-1">
                From <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                name="start_date"
                id="start_date"
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}

                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"

              />
            </div>
            {/* <!-- End Date --> */}

            <div className="col-md-4">
              <label htmlFor="end_date" className="block mb-1">
                To <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                name="end_date"
                id="end_date"
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}

                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"

              />
            </div>

            {/* <!-- Filter Button --> */}
            <div className="col-md-4 " style={{ display: "flex", alignItems: "end", paddingTop: "20px" }}>
              <button onClick={getReport} className='filter-button'><i className='bx bxs-paper-plane'></i>Filter</button>
            </div>

          </div>
           {/* PDF Download button */}
        <div className='d-flex mt-6 mb-3 justify-content-md-end justify-content-center col-12 col-md-12'>
          <div onClick={handleDownloadPDF} className='download-2' style={{ textAlign: 'center', paddingTop: "3px", fontSize: "22px", color: "white" }}>
            <i class="fa-solid fa-file-pdf"></i>
          </div>

        </div>
          <div id="pdf-content" style={{ width: "100%", padding: "17px" }}>
            <table className='table workPeriodReport'>
              <thead >
                <tr  >
                  <th>#</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Created By</th>
                  <th>Closed By</th>
                  <th>Table</th>
                  <th>Items</th>
                  <th>Quantity</th>
                  <th>Sub Total</th>
                  <th>Charge</th>
                  <th>Discount</th>
                  <th>Tax</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Due</th>
                </tr>
              </thead>
              <tbody>
              {report.length > 0 ? (
                report.map((record, index) => (
                  <tr key={record}>
                    <td>{index + 1}</td>
                    <td>{record.date}</td>
                    <td>{record.type }</td>
                    <td>{'@admin'}</td>
                    <td>{'@admin'}</td>
                    <td>{record.table_id}</td>
                    <td>{record.item_name}</td>
                    <td>{record.quantity}</td>
                    <td>{record.sub_total}</td>
                    <td>{record.charges}</td>
                    <td>{record.discount}</td>
                    <td>{record.tax_total}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="15" >No Data Found</td>
                </tr>
              )}


              {/* {
                report && (
                  <tr key={report}>
                    <td></td>
                    <td>{report.date}</td>
                    <td>{report.type }</td>
                    <td></td>
                    <td></td>
                    <td>{report.table_id}</td>
                    <td>{report.item_name}</td>
                    <td>{report.quantity}</td>
                    <td>{report.sub_total}</td>
                    <td>{report.charges}</td>
                    <td>{report.discount}</td>
                    <td>{report.tax_total}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                )} */}
              

              </tbody>

            </table>

          </div>
        </div>
      </Page>
    )
  }
