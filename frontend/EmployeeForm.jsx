import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addEmployees } from '../../controllers/employee.controller';
import placeholderImage from '../../assets/avatar.png';

export const EmployeeForm = () => {



    const [employeeName, setEmployeeName] = useState("");
    const [employeeDepartment, setEmployeeDepartment] = useState("");
    const [employeeDesignation, setEmployeeDesignation] = useState("");
    const [employeeShift, setEmployeeShift] = useState("");
    const [employeeJoiningDate, setEmployeeJoiningDate] = useState("");
    // const [employeeLeavingDate, setEmployeeLeavingDate] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [employeePhone, setEmployeePhone] = useState("");
    const [employeePresentAddress, setEmployeePresentAddress] = useState("");
    const [employeePermanentAddress, setEmployeePermanentAddress] = useState("");
    const [employeeEmergencyContact, setEmployeeEmergencyContact] = useState("");
    const [employeeNIDNumber, setEmployeeNIDNumber] = useState("");
    const [employeeGender, setEmployeeGender] = useState("");
    const [employeeReligion, setEmployeeReligion] = useState("");
    const [employeeMartialStatus, setEmployeeMartialStatus] = useState("");
    const [employeeDOB, setEmployeeDOB] = useState("");
    const [employeeSalaryType, setEmployeeSalaryType] = useState("");
    const [employeeSalary, setEmployeeSalary] = useState("");
    const [employeeStatus, setEmployeeStatus] = useState("");
    const [employeeAccountHolderName, setEmployeeAccountHolderName] = useState("");
    const [employeeAccountNumber, setEmployeeAccountNumber] = useState("");
    const [employeeBankName, setEmployeeBankName] = useState("");
    const [employeeBankIdentifierCode, setEmployeeBankIdentifierCode] = useState("");
    const [employeeBranchLocation, setEmployeeBranchLocation] = useState("");
    const [employeeTaxPayerId, setEmployeeTaxPayerId] = useState("");
    const [employeeProfilePicture, setEmployeeProfilePicture] = useState(placeholderImage);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigation = useNavigate();
    const goToEmployeeList = () => {
        navigation('../employee-list');
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addEmployees(
                employeeName,
                employeeDepartment,
                employeeDesignation,
                employeeShift,
                employeeJoiningDate,
                // employeeLeavingDate,
                employeeEmail,
                employeePhone,
                employeePresentAddress,
                employeePermanentAddress,
                employeeEmergencyContact,
                employeeNIDNumber,
                employeeGender,
                employeeReligion,
                employeeMartialStatus,
                employeeDOB,
                employeeSalaryType,
                employeeSalary,
                employeeStatus,
                employeeAccountHolderName,
                employeeAccountNumber,
                employeeBankName,
                employeeBankIdentifierCode,
                employeeBranchLocation,
                employeeTaxPayerId,
                
            );

            if (response.ok) {
                setSuccess("Your detail's have been successfully recorded.");
                setError('');
                employeeName('');
                employeeDepartment('');
                employeeDesignation('');
                employeeShift('');
                employeeJoiningDate('');
                // employeeLeavingDate('');
                employeeEmail('');
                employeePhone('');
                employeePresentAddress('');
                employeePermanentAddress('');
                employeeEmergencyContact('');
                employeeNIDNumber('');
                employeeGender('');
                employeeReligion('');
                employeeMartialStatus('');
                employeeDOB('');
                employeeSalaryType('');
                employeeSalary('');
                employeeStatus('');
                employeeAccountHolderName('');
                employeeAccountNumber('');
                employeeBankName('');
                employeeBankIdentifierCode('');
                employeeBranchLocation('');
                employeeTaxPayerId('');
                

            } else {
                setError("Your Details was inccorrect. Please check it once!");
                setSuccess('');
            }

        } catch (error) {

            setError("Something went wrong. Please try again later!");
            setSuccess('');


        }

    }


    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="form-container">
                            <h3 className="text-3xl font-light mb-3">Employee Details Form</h3>

                            <form >
                                <div>
                                    <div className="row g-3">

                                        {/* <!-- Department --> */}

                                        <div className="mt-3 col-lg-3 col-md-6 ">
                                            <label htmlFor="department" className="block mb-1">
                                                Department <span className="text-danger">*</span>
                                            </label>
                                            <select

                                                name="department"
                                                id="department"
                                                onChange={(e) => setEmployeeDepartment(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            >
                                                <option value="" disabled selected></option>
                                                <option value="management">Management</option>
                                                <option value="kitchen">Kitchen</option>
                                                <option value="front_of_house">Front of House</option>
                                                <option value="bnd">bnd</option>

                                            </select>
                                        </div>

                                        {/* <!-- Designation --> */}

                                        <div className="mt-3 col-lg-3 col-md-6 ">
                                            <label htmlFor="designation" className="block mb-1">
                                                Designation <span className="text-danger">*</span>
                                            </label>
                                            <select

                                                name="designation"
                                                id="designation"
                                                onChange={(e) => setEmployeeDesignation(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            >
                                                <option value="" disabled selected></option>
                                                <option value="general_manager">General Manager</option>
                                                <option value="assistant_manager">Assistant Manager</option>
                                                <option value="chef">Chef</option>
                                                <option value="server">Server</option>
                                                <option value="marketing_manager">Marketing Manager</option>
                                                <option value="social_media_specialist">Social Media Specialist</option>

                                            </select>
                                        </div>

                                        {/* <!-- Shift --> */}

                                        <div className="mt-3 col-lg-3 col-md-6 ">
                                            <label htmlFor="shift" className="block mb-1">
                                                Shift <span className="text-danger">*</span>
                                            </label>
                                            <select

                                                name="shift"
                                                id="shift"
                                                onChange={(e) => setEmployeeShift(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            >
                                                <option value="" disabled selected></option>
                                                <option value="morning">Morning</option>
                                                <option value="evening">Evening</option>

                                            </select>
                                        </div>

                                        {/* <!-- Name --> */}

                                        <div className="mt-3 col-lg-3 col-md-6">
                                            <label htmlFor="name" className="block mb-1">
                                                Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                onChange={(e) => setEmployeeName(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>

                                        {/* <!-- Joining Date --> */}

                                        <div className="mt-3 col-lg-3 col-md-6">
                                            <label htmlFor="joining_date" className="block mb-1">
                                                Joining Date <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="joining_date"
                                                id="joining_date"
                                                onChange={(e) => setEmployeeJoiningDate(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>

                                        {/* <!-- Leaving Date --> */}

                                        <div className="mt-3 col-lg-3 col-md-6">
                                            <label htmlFor="leaving_date" className="block mb-1">
                                                Leaving Date
                                            </label>
                                            <input
                                                disabled
                                                type="date"
                                                name="leaving_date"
                                                id="leaving_date"
                                                // onChange={(e) => setEmployeeLeavingDate(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-200 outline-salespos-border-green-light"

                                            />
                                        </div>

                                        {/* <!-- Email --> */}

                                        <div className="mt-3 col-lg-3 col-md-6">
                                            <label htmlFor="email" className="block mb-1">
                                                Email <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                onChange={(e) => setEmployeeEmail(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>

                                        {/* <!-- Phone --> */}

                                        <div className="mt-3 col-lg-3 col-md-6">
                                            <label htmlFor="phone" className="block mb-1">
                                                Phone Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="phone"
                                                name="phone"
                                                id="phone"
                                                onChange={(e) => setEmployeePhone(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>


                                        {/* <!-- Present Address --> */}

                                        <div className="mt-3 col-lg-6 col-md-6">
                                            <label htmlFor="present_address" className="block mb-1">
                                                Present Address<span className="text-danger">*</span>
                                            </label>
                                            <textarea

                                                type="text"
                                                name="present_address"
                                                id="present_address"
                                                onChange={(e) => setEmployeePresentAddress(e.target.value)}
                                                className="block w-full h-20 lg:min-w-96 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>

                                        {/* <!-- Permanent Address --> */}

                                        <div className="mt-3 col-lg-6 col-md-6">
                                            <label htmlFor="permanent_address" className="block mb-1">
                                                Permanent Address<span className="text-danger">*</span>
                                            </label>
                                            <textarea

                                                type="text"
                                                name="permanent_address"
                                                id="permanent_address"
                                                onChange={(e) => setEmployeePermanentAddress(e.target.value)}
                                                className="block w-full h-20 lg:min-w-96 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>

                                        {/* <!-- Emergency Contact --> */}

                                        <div className="mt-3 col-lg-3 col-md-6">
                                            <label htmlFor="emergency_contact" className="block mb-1">
                                                Emergency Contact <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="phone"
                                                name="emergency_contact"
                                                id="emergency_contact"
                                                onChange={(e) => setEmployeeEmergencyContact(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>

                                        {/* <!-- NID Number  --> */}

                                        <div className="mt-3 col-lg-3 col-md-6">
                                            <label htmlFor="nid_number" className="block mb-1">
                                                NID Number  <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="nid_number"
                                                id="nid_number"
                                                onChange={(e) => setEmployeeNIDNumber(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>





                                        {/* <!-- Gender --> */}
                                        <div className="mt-3 col-lg-3 col-md-6 ">
                                            <label htmlFor="gender" className="block mb-1">
                                                Gender <span className="text-danger">*</span>
                                            </label>
                                            <select

                                                name="gender"
                                                id="gender"
                                                onChange={(e) => setEmployeeGender(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            >
                                                <option value="" disabled selected></option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>

                                            </select>
                                        </div>


                                        {/* <!-- Religion --> */}

                                        <div className="mt-3 col-lg-3 col-md-6">
                                            <label htmlFor="religion" className="block mb-1">
                                                Religion<span className="text-danger">*</span>
                                            </label>
                                            <input

                                                type="text"
                                                name="religion"
                                                id="religion"
                                                onChange={(e) => setEmployeeReligion(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>



                                        {/* <!-- Martial Status  --> */}
                                        <div className="mt-3 col-lg-3 col-md-6 ">
                                            <label htmlFor="martial_status" className="block mb-1">
                                                Martial Status  <span className="text-danger">*</span>
                                            </label>
                                            <select

                                                name="martial_status"
                                                id="martial_status"
                                                onChange={(e) => setEmployeeMartialStatus(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            >
                                                <option value="" disabled selected></option>
                                                <option value="single">Single</option>
                                                <option value="married">Married</option>
                                                <option value="divorced">Divorced</option>

                                            </select>
                                        </div>

                                        {/* <!-- DOB --> */}

                                        <div className="mt-3 col-lg-3 col-md-6">
                                            <label htmlFor="dob" className="block mb-1">
                                                DOB <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="dob"
                                                id="dob"
                                                onChange={(e) => setEmployeeDOB(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>

                                        {/* <!-- Salary Type --> */}

                                        <div className="mt-3 col-lg-3 col-md-6">
                                            <label htmlFor="salary_type" className="block mb-1">
                                                Salary Type<span className="text-danger">*</span>
                                            </label>
                                            <input

                                                type="text"
                                                name="salary_type"
                                                id="salary_type"
                                                onChange={(e) => setEmployeeSalaryType(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>

                                        {/* <!-- Salary --> */}

                                        <div className="mt-3 col-lg-3 col-md-6">
                                            <label htmlFor="salary" className="block mb-1">
                                                Salary <span className="text-danger">*</span>
                                            </label>
                                            <div className="d-flex flex-row">
                                                <span className="input-group-text">$</span>

                                                <input

                                                    type="text"
                                                    name="salary"
                                                    id="salary"
                                                    onChange={(e) => setEmployeeSalary(e.target.value)}
                                                    className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* <!-- Status --> */}

                                        <div className="mt-3 col-lg-12">
                                            <label className="relative inline-flex items-center cursor-pointer no-drag">
                                                <input
                                                    type="checkbox"
                                                    id='check'
                                                    checked={employeeStatus === "Active"}
                                                    onChange={(e) => setEmployeeStatus(e.target.checked ? "Active" : "Inactive")}
                                                    name="employee_status"
                                                    className="sr-only peer"
                                                    
                                                    
                                                />

                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-salespos-green peer-checked:after:border-white after:content-[''] after:absolute after:top-[18px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ">

                                                </div>
                                                <p className='m-3'>Status (InActive/Active)</p>
                                            </label>


                                        </div>
                                        {/* <!-- Profile Picture --> */}
                                        

                                        <div className="flex justify-center flex-column  ml-3">
                                            <h1 className='mb-2'>Image</h1>
                                        
                                            <div className="relative w-52 h-52 border-2 border-gray-200 rounded-lg overflow-hidden flex flex-col items-center justify-center">
                                                
                                                <img
                                                    src={placeholderImage}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                   
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                                <button className="absolute bottom-2 bg-blue-500 text-white px-3 py-1 rounded text-sm">Choose File</button>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                                <div>
                                    <h2 className='text-2xl font-light mb-3 mt-3'>Bank Account</h2>


                                    <div className='row g-3'>

                                        {/* <!-- Account Holder Name --> */}

                                        <div className="mt-2 col-lg-4 col-md-6">
                                            <label htmlFor="account_holder_name" className="block mb-1">
                                                Account Holder Name
                                            </label>
                                            <input

                                                type="text"
                                                name="account_holder_name"
                                                id="account_holder_name"
                                                onChange={(e) => setEmployeeAccountHolderName(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>

                                        {/* <!-- Account Number--> */}

                                        <div className="mt-2 col-lg-4 col-md-6">
                                            <label htmlFor="account_number" className="block mb-1">
                                                Account Number
                                            </label>
                                            <input

                                                type="text"
                                                name="account_number"
                                                id="account_number"
                                                onChange={(e) => setEmployeeAccountNumber(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>

                                        {/* <!-- Bank Name --> */}

                                        <div className="mt-2 col-lg-4 col-md-6">
                                            <label htmlFor="bank_name" className="block mb-1">
                                                Bank Name
                                            </label>
                                            <input

                                                type="text"
                                                name="bank_name"
                                                id="bank_name"
                                                onChange={(e) => setEmployeeBankName(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>

                                        {/* <!-- Bank Identifier Code --> */}

                                        <div className="mt-2 col-lg-4 col-md-6">
                                            <label htmlFor="bank_identifier_code" className="block mb-1">
                                                Bank Identifier Code
                                            </label>
                                            <input

                                                type="text"
                                                name="bank_identifier_code"
                                                id="bank_identifier_code"
                                                onChange={(e) => setEmployeeBankIdentifierCode(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>

                                        {/* <!-- Branch Location --> */}

                                        <div className="mt-2 col-lg-4 col-md-6">
                                            <label htmlFor="branch_location" className="block mb-1">
                                                Branch Location
                                            </label>
                                            <input

                                                type="text"
                                                name="branch_location"
                                                id="branch_location"
                                                onChange={(e) => setEmployeeBranchLocation(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>

                                        {/* <!-- Tax Payer Id --> */}

                                        <div className="mt-2 col-lg-4 col-md-6">
                                            <label htmlFor="tax_payer_id" className="block mb-1">
                                                Tax Payer Id
                                            </label>
                                            <input

                                                type="text"
                                                name="tax_payer_id"
                                                id="tax_payer_id"
                                                onChange={(e) => setEmployeeTaxPayerId(e.target.value)}
                                                className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                                required
                                            />
                                        </div>





                                    </div>

                                </div>



                            </form>
                            <div className='row '>

                                {/* <!-- Save Button --> */}
                                <div className="m-3">
                                    <button onClick={handleSubmit} className="text-white w-20 bg-salespos-green transition hover:bg-salespos-green/80 active:scale-95 rounded-lg px-4 py-2 mt-6 outline-salespos-border-green-light">
                                        Save
                                    </button>

                                </div>
                                {/* <!-- Back Button --> */}
                                <div className="m-3">
                                    <button onClick={goToEmployeeList} className="text-white w-40  bg-salespos-green transition hover:bg-salespos-green/80 active:scale-95 rounded-lg px-4 py-2 mt-6 outline-salespos-border-green-light">
                                        Back To List
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
