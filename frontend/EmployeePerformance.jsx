import React, { useEffect, useState } from 'react';
import { getEmployeePerformance } from '../../controllers/reports.controller';
import Page from "../../components/Page";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas-pro";
import toast from 'react-hot-toast';

export const EmployeePerformance = () => {
    const [performanceData, setPerformanceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getEmployeePerformance();
            console.log(data);

            setPerformanceData(data);
            setFilteredData(data);
        } catch (error) {
            console.error('Failed to load employee performance:', error);
        }
    };
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = performanceData.filter((data) =>
            Object.values(data).some(
                (value) =>
                    value &&
                    value.toString().toLowerCase().includes(query)
            )
        );
        setFilteredData(filtered);
    };
    const clearSearch = () => {
        setSearchQuery("");
        setFilteredData(performanceData);
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

    // const handleSort = (column) => {
    //     const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    //     setSortColumn(column);
    //     setSortOrder(order);

    //     const sortedData = [...filteredData].sort((a, b) => {
    //         if (a[column] < b[column]) return order === "asc" ? -1 : 1;
    //         if (a[column] > b[column]) return order === "asc" ? 1 : -1;
    //         return 0;
    //     });

    //     setFilteredData(sortedData);
    // };

    // const getSortIndicator = (column) => {
    //     if (sortColumn === column) {
    //         return sortOrder === "asc" ? "↑" : "↓";
    //     }
    //     return;
    // };
    const handleSort = (field) => {
        const sorted = [...filteredData].sort((a, b) => {
            let aValue = a[field];
            let bValue = b[field];

            if (!isNaN(aValue) && !isNaN(bValue)) {
                aValue = Number(aValue);
                bValue = Number(bValue);
            } else {
                aValue = aValue?.toString().toLowerCase();
                bValue = bValue?.toString().toLowerCase();
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredData(sorted);
        setSortField(field);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <Page>
            <h3 className="text-2xl"> Employee Performance</h3>

            <div className="flex justify-between items-center mb-4">

                {/* Search Input with Clear Button */}
                <div className="relative w-60 mt-2 ">
                    <input
                        onChange={handleSearch}
                        value={searchQuery}
                        type="text"
                        placeholder="Search Employee"
                        className="bg-gray-100 placeholder:text-gray-400 outline-none block w-full h-9 px-4 pr-10 py-2 rounded-lg"
                    />
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    )}
                </div>

                {/* PDF Download Button */}
                <div className=''>
                    <div onClick={handleDownloadPDF} className='download-2' style={{ textAlign: 'center', paddingTop: "3px", fontSize: "22px", color: "white" }}>
                        <i class="fa-solid fa-file-pdf"></i>
                    </div>
                </div>

            </div>

            <div id="pdf-content" style={{ width: "100%" }}>
                <table className='table table-sm table-zebra border w-full text-lg'>
                    <thead>
                        <tr>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('id')}>
                                S.NO {sortField === 'id' && (sortOrder === "asc" ? '↑' : '↓')}
                            </th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('employeeName')}>
                                Employee Name {sortField === 'employeeName' && (sortOrder == "asc" ? '↑' : '↓')}
                            </th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('punchuality')}>
                                Punchuality {sortField === 'punchuality' && (sortOrder == "asc" ? '↑' : '↓')}
                            </th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('service')}>
                                Service {sortField === 'service' && (sortOrder == "asc" ? '↑' : '↓')}
                            </th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('customerFeedback')}>
                                Customer Feedback {sortField === 'customerFeedback' && (sortOrder == "asc" ? '↑' : '↓')}
                            </th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('managerFeedback')}>
                                Manager Feedback {sortField === 'managerFeedback' && (sortOrder == "asc" ? '↑' : '↓')}
                            </th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('review')}>
                                Review {sortField === 'review' && (sortOrder == "asc" ? '↑' : '↓')}
                            </th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('rating')}>
                                Rating {sortField === 'rating' && (sortOrder == "asc" ? '↑' : '↓')}
                            </th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('reviewResult')}>
                                Review Result {sortField === 'reviewResult' && (sortOrder == "asc" ? '↑' : '↓')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((data, index) => (
                                <tr key={data.id}>
                                    <td className='text-center'>{data.id}</td>
                                    <td className='text-center'>{data.employeeName}</td>
                                    <td className='text-center'>{data.punchuality}</td>
                                    <td className='text-center'>{data.service}</td>
                                    <td className='text-center'>{data.customerFeedback}</td>
                                    <td className='text-center'>{data.managerFeedback}</td>
                                    <td className='text-center'>{data.review}</td>
                                    <td className='text-center'>{data.rating}</td>
                                    <td className='text-center'>{data.reviewResult}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-4">
                                    No employee data found.
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </Page>
    )
}
