import React, {useState, useEffect} from 'react';
import Page from "../../components/Page";
import { getStockAlertReport } from '../../controllers/reports.controller';
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas-pro";
import toast from 'react-hot-toast';

export const StockAlertReport = () => {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchStockAlertReport = async () => {
    try {
      const data = await getStockAlertReport();
      setReportData(data);
    } catch (err) {
      setError(err.message || "Failed to load report.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStockAlertReport();
  }, []);

  if (isLoading) return <Page>Loading...</Page>;
  if (error) return <Page>{error}</Page>;

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
      <h3 className="text-2xl"> Stock Alert Report</h3>
      <div className="grid grid-cols-1 md:grid-cols-0 lg:grid-cols-0 gap-0 mt-2">


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
                <th>Ingredient Item</th>
                <th>Stock</th>
                <th>Alert Quantity</th>


              </tr>
            </thead>
            <tbody>
            {reportData.length > 0 ? (
                reportData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>{item.stock_alert_quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">No stock alerts available.</td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      </div>
    </Page>
  )
}
