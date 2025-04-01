import React, {useState, useEffect} from 'react';
import Page from "../../components/Page";
import { getAttendanceReport, getEmployees } from '../../controllers/reports.controller';
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas-pro";
import toast from 'react-hot-toast';

export const AttendanceReport = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = async () => {
    if(!selectedEmployee || !startDate || !endDate){
      alert("Please select an employee and date range.");
      return;
    }
    const data = await getAttendanceReport(selectedEmployee, startDate, endDate);
    setAttendanceData(data);
  }

  const statusCount = attendanceData.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, {Present:0, Absent :0, Leave:0, Late:0});

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
      <h3 className="text-2xl"> Attendance Report</h3>
      <div className="grid grid-cols-1 md:grid-cols-0 lg:grid-cols-0 gap-0 mt-2">


        <div className='period-date row m-1' >


          {/* <!-- Employee --> */}
          <div className="col-md-3  ">
            <label htmlFor="employee" className="block mb-1">
              Employee <span className="text-danger">*</span>
            </label>
            <select

              name="employee"
              id="employee"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
              required
            >
              <option value="" disabled selected></option>
              {employees.map((emp) => (
                <option key={emp.employeeId} value={emp.employeeId}>
                  {emp.employeeName} (EMP-{emp.employeeId})
                </option>
              ))}

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
          {/* <!-- End Date --> */}

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
            <button onClick={handleFilter} className='filter-button'><i className='bx bxs-paper-plane'></i>Filter</button>
          </div>

        </div>

        {/* PDF Download button */}

        <div className='d-flex mt-6 mb-3 justify-content-md-end justify-content-center col-12 col-md-12'>
          
          <div onClick={handleDownloadPDF} className='download-2' style={{ textAlign: 'center', paddingTop: "3px", fontSize: "22px", color: "white" }}>
            <i class="fa-solid fa-file-pdf"></i>
          </div>
          

        </div>
        <div id="pdf-content" style={{ width: "100%", padding: "15px" }}>
          <table className='table workPeriodReport' >
            <thead >
              <tr  >
                <th>#</th>
                <th>Employee</th>
                <th>Shift</th>
                <th>Date</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Status</th>
                <th>Updated At</th>
                <th>Updated By</th>
              </tr>
            </thead>
            <tbody>
            {attendanceData.length > 0 ? (
                attendanceData.map((record) => (
                  <tr key={record.employeeId}>
                    <td>{record.employeeId}</td>
                    <td>{record.employeeName}</td>
                    <td>{record.employeeShift}</td>
                    <td>{record.attendanceDate}</td>
                    <td>{record.checkInTime}</td>
                    <td>{record.checkOutTime}</td>
                    <td>{record.status}</td>
                    <td>{record.updated_at}</td>
                    <td>{record.updated_by}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>No Result Found</td>
                </tr>
              )}
              
              {/* Summary Rows */}
              <tr >
                <td colSpan="8" className='text-right'><strong>Total Present</strong></td>
                <td colSpan="3"><strong>{statusCount.Present}</strong></td>
              </tr>
              <tr >
                <td colSpan="8" className='text-right'><strong>Total Absent</strong></td>
                <td colSpan="3"><strong>{statusCount.Absent}</strong></td>
              </tr>
              <tr>
                <td colSpan="8" className='text-right'><strong>Total Leave</strong></td>
                <td colSpan="3"><strong>{statusCount.Leave}</strong></td>
              </tr>
              <tr >
                <td colSpan="8" className='text-right'><strong>Total Late</strong></td>
                <td colSpan="3"><strong>{statusCount.Late}</strong></td>
              </tr>
            </tbody>

          </table>

        </div>
      </div>


    </Page>

  )
}
