import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteEmployeesList, getEmployeesList } from '../../controllers/employee.controller';
import { profilePath } from '../../config/config';
import Page from "../../components/Page";
import toast from 'react-hot-toast';


export const EmployeeList = () => {
  const navigation = useNavigate();
  const [canShowLoading, setCanShowLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [sortField, setSortField] = useState('employeeId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const goToEmployeeForm = () => {
    navigation('../employee-form');
  }

  const handleEditEmployee = (employeeId) => {
    navigation(`../edit-employee-form/${employeeId}`)
  }

  const getEmployeeDetails = async () => {
    setCanShowLoading(true);
    try {
      const response = await getEmployeesList();
      setTimeout(() => {

        setEmployees(response.data);
        setCanShowLoading(false);
      }, 1000);
    } catch (error) {
      setCanShowLoading(false);
      console.log("Error to fetch employee details", error);
    }
  };

  useEffect(() => {
    getEmployeeDetails();
  }, []);


  // Sorting employee details


  const sortEmployees = (field) => {
    const sorted = [...employees].sort((a, b) => {
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
    setEmployees(sorted);
    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  // Searching

  const filteredEmployees = employees.filter(emp => {
    const searchValue = searchTerm.toLowerCase();
    return (
      emp.employeeName.toLowerCase().includes(searchValue) ||
      emp.employeeId.toString().includes(searchValue) ||
      emp.employeePhone.toString().includes(searchValue) ||
      emp.employeeShift.toLowerCase().includes(searchValue) ||
      emp.employeeSalary.toLowerCase().includes(searchValue) ||
      emp.employeeEmail.toLowerCase().includes(searchValue) ||
      emp.employeePermanentAddress.toLowerCase().includes(searchValue) ||
      emp.employeePresentAddress.toLowerCase().includes(searchValue) ||
      emp.employeeStatus.toLowerCase().includes(searchValue) ||
      emp.updated_at.toLowerCase().includes(searchValue)
    );
  });
  console.log(filteredEmployees);

  // Pagination

  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  const displayedEmployees = filteredEmployees.slice((currentPage - 1) * pageSize, currentPage * pageSize);



  // Action ToggleMenu (View / Delete)

  const toggleMenu = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  // Deleting Employee List

  const handleDeleteEmployee = async (employeeId) => {
    const confrimDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confrimDelete) return;

    try {
      await deleteEmployeesList(employeeId);
      // setEmployees(prevEmployees => prevEmployees.filter(emp=>emp.employeeId !== employeeId));
      getEmployeeDetails();

      toast.success("Employee deleted successfully")
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee. Please try again later.");
    }
  }

  return (



    <Page>
      <h3 className="text-2xl"> Employee List</h3>
      <div className="grid grid-cols-1 md:grid-cols-0 lg:grid-cols-1 gap-0 mt-2">
        <div className='flex flex-wrap gap-4 flex-col md:flex-row items-center justify-between'>
          <div className='row pt-4 pl-3'>
            <div className='pr-5'>
              <label className='text-sm'>Show </label>
              <select className='pagination-box ' value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
                <option value={employees.length}>All</option>
              </select>
              <label className='text-sm'>Entires</label>
            </div>

            <div className="">

              <div className="bg-gray-100 px-2 py-1 rounded-lg flex items-center">

                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  type="text"
                  placeholder="Search Employee"
                  className="bg-transparent placeholder:text-gray-400 outline-none block"
                />
                {searchTerm && (<button onClick={() => setSearchTerm('')} className="text-gray-400">
                  <i class="fa-solid fa-xmark"></i>
                </button>)}
              </div>

            </div>
          </div>
          {/* <!-- Add New Button --> */}
          <div className="m-3 text-right  ">
            <button onClick={goToEmployeeForm} className="text-white w-21 bg-salespos-green transition hover:bg-salespos-green/80 active:scale-95 rounded-lg px-4 py-2 mt-6 outline-salespos-border-green-light">
              Add New
            </button>

          </div>

        </div>

        <table className='table table-sm table-zebra border w-full text-lg' >
          <thead >
            <tr >
              {/* <th onClick={sortEmployees} style={{cursor:"pointer"}}>S.No {sortOrder === 'asc' ? '↑' : '↓'}</th> */}
              <th className='font-medium' onClick={() => sortEmployees('employeeId')} style={{ cursor: "pointer" }}># {sortField === 'employeeId' && (sortOrder == 'asc' ? '↑' : '↓')}</th>
              <th className='font-medium'> Profile</th>
              <th className='px-4 font-medium' onClick={() => sortEmployees('employeeName')} style={{ cursor: "pointer" }}>Employee {sortField === 'employeeName' && (sortOrder === 'asc' ? '↑' : '↓')}  </th>
              <th className='font-medium' onClick={() => sortEmployees('employeeShift')} style={{ cursor: "pointer" }}>Shift {sortField === 'employeeShift' && (sortOrder === 'asc' ? '↑' : '↓')} </th>
              <th className='font-medium' onClick={() => sortEmployees('employeeSalary')} style={{ cursor: 'pointer' }}>Salary {sortField === 'employeeSalary' && (sortOrder === 'asc' ? '↑' : '↓')} </th>
              <th className='px-4 font-medium' onClick={() => sortEmployees('employeePhone')} style={{ cursor: "pointer" }}>Phone {sortField === 'employeePhone' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th className='px-4 font-medium' onClick={() => sortEmployees('employeeEmail')} style={{ cursor: 'pointer' }}>Email {sortField === 'employeeEmail' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th className='font-medium' onClick={() => sortEmployees('employeeAddress')} style={{ cursor: 'pointer' }}>Address {sortField === "employeeAddress" && (sortOrder === 'asc' ? '↑' : '↓')} </th>
              <th className='px-4 font-medium' onClick={() => sortEmployees('employeeStatus')} style={{ cursor: "pointer" }}>Status {sortField === "employeeStatus" && (sortOrder === 'asc' ? '↑' : '↓')} </th>
              <th className='px-4 font-medium' onClick={() => sortEmployees('employeeUpdatedAt')} style={{ cursor: "pointer" }}>Updated At {sortField === 'employeeUpdatedAt' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th className='font-medium' onClick={() => sortEmployees('updated_at')} style={{ cursor: 'pointer' }}>Updated By {sortField === 'updated_at' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th className='px-4 font-medium' onClick={() => sortEmployees('emnployeeStatus')} style={{ cursor: 'pointer' }}>Action {sortField === 'employeeStatus' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
            </tr>
          </thead>
          <tbody>
            {displayedEmployees.map((emp) => (
              <tr key={emp.employeeId} >
                <td className='font-medium'>{emp.employeeId}</td>
                <td>{emp.employeeProfilePicture ? ( <img src={`${profilePath}/${emp.employeeProfilePicture}`} alt="" style={{ height: "70px", width: "70px", borderRadius: "50px", boxShadow: "6px" }} /> ) : (<i className="fa-solid fa-user" style={{ fontSize: "50px", color: "#aaa" }}></i>)}</td>
                <td className='font-medium'>{emp.employeeName} <br /> (EMP-{emp.employeeId})<br /> {emp.employeeDepartment} <br /> {emp.employeeDesignation} </td>
                <td className='font-medium'>{emp.employeeShift}</td>
                <td className='font-medium'> {emp.employeeSalaryType} - <br /> ${emp.employeeSalary}.00 <br /> Net Salary - <br /> ${emp.employeeSalary}.00</td>
                <td className='font-medium'><i className='bx bxs-phone'></i>{emp.employeePhone} <br /> <i className='bx bxs-phone'></i>{emp.employeeEmergencyContact}</td>
                <td className='font-medium'><i class='bx bxs-envelope' ></i>{emp.employeeEmail}</td>
                <td className='font-medium'><i class='bx bxs-map'></i>{emp.employeePermanentAddress}<br /><i class='bx bxs-map'></i>{emp.employeePresentAddress}</td>
                <td className='font-medium' style={{
                  backgroundColor: emp.employeeStatus?.toLowerCase() === 'active' ? 'lightgreen' : '#ffa500',
                  borderRadius: '18px',
                  width: '80px',
                  height: '30px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}> {emp.employeeStatus} </td>
                <td> {emp.updated_at} </td>
                <td className='text-start'>@admin</td>

                <td className="px-3 py-4 text-start flex flex-wrap gap-2 items-center text-start" >
                  <button
                    onClick={() => handleEditEmployee(emp.employeeId)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition active:scale-95"
                  >
                    <i class="fa-solid fa-pen"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(emp.employeeId)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-gray-100 transition active:scale-95"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>


              </tr>

            ))}
          </tbody>
        </table>
        {canShowLoading && <p className='text-center'>Loading...</p>}

        <div className='flex flex-wrap gap-4 flex-col md:flex-row items-center justify-between'>
          <div className='' style={{ fontSize: "14px" }}>
            <span>Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filteredEmployees.length)}({filteredEmployees.length})</span>
          </div>
          <div className=''>

            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}><i class="fa-solid fa-angle-left bg-salespos-green  navigate-1"></i></button>
            <span className='current-page'>{currentPage}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}><i class="fa-solid fa-angle-right bg-salespos-green  navigate-2"></i></button>
          </div>
        </div>

      </div>
    </Page>






  )
}
