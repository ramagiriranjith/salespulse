import React, {useState, useEffect} from 'react';
import Page from "../../components/Page";
import { getExpenseReport } from '../../controllers/reports.controller';
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas-pro";
import toast from 'react-hot-toast';

export const ExpenseReport = () => {

  const [period, setPeriod] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);


  const getReport = async () => {
    if (!period || !startDate || !endDate) {
      alert("Please select a period and date range.");
      return;
    }
   
    const data = await getExpenseReport(period, startDate, endDate);
    
    
    setReportData(data);
  
    
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
      <h3 className="text-2xl"> Expense Report</h3>
      <div className="grid grid-cols-1 md:grid-cols-0 lg:grid-cols-0 gap-0 mt-2">

        <div className='period-date row m-1' >


          {/* <!-- Period --> */}
          <div className="col-md-3  ">
            <label htmlFor="period" className="block mb-1">
              Period <span className="text-danger">*</span>
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              name="period"
              id="period"
              className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
              required
            >
              <option value="" disabled selected></option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>

            </select>
          </div>
          {/* <!-- Start Date --> */}

          <div className="col-md-3">
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
          {/* <!-- End Start --> */}

          <div className="col-md-3">
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
          <div className="col-md-3 " style={{ display: "flex", alignItems: "end", paddingTop: "20px" }}>
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
                <th>Total Amount</th>
                <th>Period</th>

              </tr>
            </thead>
            <tbody>
            {reportData.length > 0 ?  (
              reportData.map((record) => (
              <tr key={record.total_expense}>
                <td>{record.total_expense}</td>
                <td>{record.period}</td>
              </tr>
              ))
          ) : (
            <tr>
              <td colSpan="2">No Data Found</td>
            </tr>
          )}



            </tbody>

          </table>

        </div>
      </div>

    </Page>

  )
}
