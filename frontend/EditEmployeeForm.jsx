import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getEmployeeList, updateEmployeesList, updateProfilePicture } from "../../controllers/employee.controller";
import placeholderImage from '../../assets/avatar.png'
import toast from 'react-hot-toast';
import Page from "../../components/Page";

export const EditEmployeeForm = () => {
    const [employeeProfilePicture, setEmployeeProfilePicture] = useState(placeholderImage);
    const [profileImgFile, setProfileImgFile] = useState(null);

    const navigation = useNavigate();
    const goToEmployeeList = () => {
        navigation('../employee-list');
    }
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState({
        employeeName: "",
        employeeDepartment: "",
        employeeDesignation: "",
        employeeShift: "",
        employeeJoiningDate: "",
        employeeLeavingDate: "",
        employeeEmail: "",
        employeePhone: "",
        employeePresentAddress: "",
        employeePermanentAddress: "",
        employeeEmergencyContact: "",
        employeeNIDNumber: "",
        employeeGender: "",
        employeeReligion: "",
        employeeMartialStatus: "",
        employeeDOB: "",
        employeeSalaryType: "",
        employeeSalary: "",
        employeeStatus: "",
        employeeAccountHolderName: "",
        employeeAccountNumber: "",
        employeeBankName: "",
        employeeBankIdentifierCode: "",
        employeeBranchLocation: "",
        employeeTaxPayerId: "",
        employeeProfilePicture: "",

    });
    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await getEmployeeList(employeeId);
                setEmployee(response.data);
            } catch (error) {
                console.error("Error fetching employee details:", error);

            }
        };
        fetchEmployeeDetails();
    }, [employeeId]);

    const handleChange = (e) => {


        const { name, value } = e.target;
        console.log(name);
        console.log(value);


        setEmployee({ ...employee, [name]: value });
    }

    const handleControl = (name, value) => {


        setEmployee({ ...employee, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if(profileImgFile) {

                const formData = new FormData();
                formData.append("employeeProfilePicture", profileImgFile);
                
                
                await updateProfilePicture(employeeId, formData);
            }

            await updateEmployeesList(employeeId, employee);
           toast.success('Employee updated Successfully');
            navigation('../employee-list');

        } catch (error) {
            console.error("Error updating employee:", error);
            toast.error("Failed to update employee");
        }
    }
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setProfileImgFile(file);
        try {
            

            setEmployeeProfilePicture(URL.createObjectURL(file));

            // const formData = new FormData();
            // formData.append("employeeProfilePicture", file);


            // const response = await updateProfilePicture(employeeId, formData);

            // if (response.status === 200) {
            //     toast.dismiss();
            //     toast.success(response.data.message);

            //     setEmployeeProfilePicture(response.data.fileUrl);
            //     handleControl('employeeProfilePicture', response.data.fileUrl);
            // } else {
            //     throw new Error("Failed to upload image..");
            // }

        } catch (error) {
            console.error(error);
            toast.dismiss();
            const message =
                error?.response?.data?.message ||
                "Failed to upload profile picture. Try again!";
            toast.error(message);
        }
    }

    return (

        <Page>
            <h3 className="text-2xl"> Edit Employee List</h3>
            <div className="grid grid-cols-1 md:grid-cols-0 lg:grid-cols-0 gap-0 mt-2">





                <form>
                    <div>
                        <div className="row g-3">

                            {/* <!-- Department --> */}
                            <div className="mt-3 col-lg-3 col-md-6 ">
                                <label htmlFor="department" className="block mb-1">
                                    Department <span className="text-danger">*</span>
                                </label>
                                <select

                                    name="employeeDepartment"
                                    id="department"
                                    value={employee.employeeDepartment}
                                    onChange={handleChange}
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

                                    name="employeeDesignation"
                                    id="designation"
                                    value={employee.employeeDesignation}
                                    onChange={handleChange}
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

                                    name="employeeShift"
                                    id="shift"
                                    value={employee.employeeShift}
                                    onChange={handleChange}
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
                                    name="employeeName"
                                    id="name"
                                    value={employee.employeeName}
                                    onChange={handleChange}
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
                                    name="employeeJoiningDate"
                                    id="joining_date"
                                    value={employee.employeeJoiningDate}
                                    onChange={handleChange}
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

                                    type="date"
                                    name="employeeLeavingDate"
                                    id="leaving_date"
                                    value={employee.employeeLeavingDate}
                                    onChange={handleChange}
                                    className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-200 outline-salespos-border-green-light"
                                    disabled

                                />
                            </div>

                            {/* <!-- Email --> */}
                            <div className="mt-3 col-lg-3 col-md-6">
                                <label htmlFor="email" className="block mb-1">
                                    Email <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="employeeEmail"
                                    id="email"
                                    value={employee.employeeEmail}
                                    onChange={handleChange}
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
                                    name="employeePhone"
                                    id="phone"
                                    value={employee.employeePhone}
                                    onChange={handleChange}
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
                                    name="employeePresentAddress"
                                    id="present_address"
                                    value={employee.employeePresentAddress}
                                    onChange={handleChange}
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
                                    name="employeePermanentAddress"
                                    id="permanent_address"
                                    value={employee.employeePermanentAddress}
                                    onChange={handleChange}
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
                                    name="employeeEmergencyContact"
                                    id="emergency_contact"
                                    value={employee.employeeEmergencyContact}
                                    onChange={handleChange}
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
                                    name="employeeNIDNumber"
                                    id="nid_number"
                                    value={employee.employeeNIDNumber}
                                    onChange={handleChange}
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

                                    name="employeeGender"
                                    id="gender"
                                    value={employee.employeeGender}
                                    onChange={handleChange}
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
                                    name="employeeReligion"
                                    id="religion"
                                    value={employee.employeeReligion}
                                    onChange={handleChange}
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

                                    name="employeeMartialStatus"
                                    id="martial_status"
                                    value={employee.employeeMartialStatus}
                                    onChange={handleChange}
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
                                    name="employeeDOB"
                                    id="dob"
                                    value={employee.employeeDOB}
                                    onChange={handleChange}
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
                                    name="employeeSalaryType"
                                    id="salary_type"
                                    value={employee.employeeSalaryType}
                                    onChange={handleChange}
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
                                        name="employeeSalary"
                                        id="salary"
                                        value={employee.employeeSalary}
                                        onChange={handleChange}
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
                                        value={employee.employeeStatus}
                                        checked={employee.employeeStatus === "Active"}
                                        onChange={(e) => handleControl('employeeStatus', employee.employeeStatus === 'Inactive' ? "Active" : "Inactive")}
                                        name="employeeStatus"
                                        className="sr-only peer"
                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-salespos-green peer-checked:after:border-white after:content-[''] after:absolute after:top-[18px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600">

                                    </div>
                                    <p className='m-3'>Status (InActive/Active)</p>
                                </label>


                            </div>

                            {/* <!-- Profile Picture --> */}
                            <div className="flex justify-center flex-column  ml-3">
                                <h1 className='mb-2'>Image</h1>

                                <div className="relative w-52 h-52 border-2 border-gray-200 rounded-lg overflow-hidden flex flex-col items-center justify-center">

                                    <img
                                        src={employeeProfilePicture || placeholderImage}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleUploadImage}
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
                                    name="employeeAccountHolderName"
                                    id="account_holder_name"
                                    value={employee.employeeAccountHolderName}
                                    onChange={handleChange}
                                    className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"

                                />
                            </div>
                            {/* <!-- Account Number--> */}

                            <div className="mt-2 col-lg-4 col-md-6">
                                <label htmlFor="account_number" className="block mb-1">
                                    Account Number
                                </label>
                                <input

                                    type="text"
                                    name="employeeAccountNumber"
                                    id="account_number"
                                    value={employee.employeeAccountNumber}
                                    onChange={handleChange}
                                    className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"

                                />
                            </div>
                            {/* <!-- Bank Name --> */}

                            <div className="mt-2 col-lg-4 col-md-6">
                                <label htmlFor="bank_name" className="block mb-1">
                                    Bank Name
                                </label>
                                <input

                                    type="text"
                                    name="employeeBankName"
                                    id="bank_name"
                                    value={employee.employeeBankName}
                                    onChange={handleChange}
                                    className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"

                                />
                            </div>
                            {/* <!-- Bank Identifier Code --> */}

                            <div className="mt-2 col-lg-4 col-md-6">
                                <label htmlFor="bank_identifier_code" className="block mb-1">
                                    Bank Identifier Code
                                </label>
                                <input

                                    type="text"
                                    name="employeeBankIdentifierCode"
                                    id="bank_identifier_code"
                                    value={employee.employeeBankIdentifierCode}
                                    onChange={handleChange}
                                    className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"

                                />
                            </div>
                            {/* <!-- Branch Location --> */}

                            <div className="mt-2 col-lg-4 col-md-6">
                                <label htmlFor="branch_location" className="block mb-1">
                                    Branch Location
                                </label>
                                <input

                                    type="text"
                                    name="employeeBranchLocation"
                                    id="branch_location"
                                    value={employee.employeeBranchLocation}
                                    onChange={handleChange}
                                    className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"

                                />
                            </div>
                            {/* <!-- Tax Payer Id --> */}

                            <div className="mt-2 col-lg-4 col-md-6">
                                <label htmlFor="tax_payer_id" className="block mb-1">
                                    Tax Payer Id
                                </label>
                                <input

                                    type="text"
                                    name="employeeTaxPayerId"
                                    id="tax_payer_id"
                                    value={employee.employeeTaxPayerId}
                                    onChange={handleChange}
                                    className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"

                                />
                            </div>

                        </div>

                    </div>



                </form>
                <div className='row '>
                    {/* <!-- Update Button --> */}
                    <div className="m-3">
                        <button onClick={handleSubmit} className="text-white w-22 bg-salespos-green transition hover:bg-salespos-green/80 active:scale-95 rounded-lg px-4 py-2 mt-6 outline-salespos-border-green-light">
                            Update
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

        </Page>

    )
}