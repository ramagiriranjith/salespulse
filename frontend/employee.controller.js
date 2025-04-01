import axios from "axios";
import { API } from "../config/config"

export async function addEmployees(employeeName, employeeDepartment, employeeDesignation, employeeShift, employeeJoiningDate, employeeLeavingDate, employeeEmail, employeePhone, employeePresentAddress, employeePermanentAddress, employeeEmergencyContact, employeeNIDNumber, employeeGender, employeeReligion, employeeMartialStatus, employeeDOB, employeeSalaryType, employeeSalary, employeeStatus, employeeAccountHolderName, employeeAccountNumber, employeeBankName, employeeBankIdentifierCode, employeeBranchLocation, employeeTaxPayerId, updated_at, employeeProfilePicture) {
    axios.defaults.withCredentials = true;

    try {
        const response = await axios.post(`${API}/employee/add`, {
            employeeName, employeeDepartment, employeeDesignation, employeeShift, employeeJoiningDate, employeeLeavingDate, employeeEmail, employeePhone, employeePresentAddress, employeePermanentAddress, employeeEmergencyContact, employeeNIDNumber, employeeGender, employeeReligion, employeeMartialStatus, employeeDOB, employeeSalaryType, employeeSalary, employeeStatus, employeeAccountHolderName, employeeAccountNumber, employeeBankName, employeeBankIdentifierCode, employeeBranchLocation, employeeTaxPayerId, updated_at, employeeProfilePicture
        });
        return response;

    } catch (error) {
        throw error;
    }
}
export async function getEmployeesList(employeeName,
    employeeId,
    employeeDepartment,
    employeeDesignation,
    employeeShift,
    employeeJoiningDate,
    employeeLeavingDate,
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
    employeeProfilePicture,
    updated_at) {
    try {
        const response = await axios.get(`${API}/employee/`, {
            employeeName, employeeId, employeeDepartment, employeeDesignation, employeeShift, employeeJoiningDate, employeeLeavingDate, employeeEmail, employeePhone, employeePresentAddress, employeePermanentAddress, employeeEmergencyContact, employeeNIDNumber, employeeGender, employeeReligion, employeeMartialStatus, employeeDOB, employeeSalaryType, employeeSalary, employeeStatus, employeeAccountHolderName, employeeAccountNumber, employeeBankName, employeeBankIdentifierCode, employeeBranchLocation, employeeTaxPayerId,employeeProfilePicture, updated_at
        });
        return response;

    } catch (error) {
        throw error;
    }

}

export async function deleteEmployeesList(employeeId) {
    axios.defaults.withCredentials = true;
    try {
        const response = await axios.delete(`${API}/employee/delete/${employeeId}`, {
            data: { employeeId }
        });
        return response;

    } catch (error) {
        throw error;
    }

}
export async function updateEmployeesList(employeeId, employee)  {
    axios.defaults.withCredentials = true;
    try {
        const response = await axios.put(`${API}/employee/${employeeId}`, employee
           
        
        );
        return response.data;
    } catch (error) {
        throw error;
    }

}
export async function getEmployeeList(
    employeeId,
    employeeName,
    employeeDepartment,
    employeeDesignation,
    employeeShift,
    employeeJoiningDate,
    employeeLeavingDate,
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
    updated_at) {
        try {
            const response = await axios.get(`${API}/employee/${employeeId}`, {

                employeeId, employeeName, employeeId, employeeDepartment, employeeDesignation, employeeShift, employeeJoiningDate, employeeLeavingDate, employeeEmail, employeePhone, employeePresentAddress, employeePermanentAddress, employeeEmergencyContact, employeeNIDNumber, employeeGender, employeeReligion, employeeMartialStatus, employeeDOB, employeeSalaryType, employeeSalary, employeeStatus, employeeAccountHolderName, employeeAccountNumber, employeeBankName, employeeBankIdentifierCode, employeeBranchLocation, employeeTaxPayerId, updated_at
            });
            return response;
    
        } catch (error) {
            throw error;
        }
    
}
export async function uploadProfilePicture( form) {
    try {
        const response = await axios.post(`${API}/employee/update-image`, form,{
        
        });
        return response;
        
    } catch (error) {
        throw error;
    }
    
}
export async function updateProfilePicture(employeeId, form) {
    try {
        const response = await axios.post(`${API}/employee/${employeeId}/update-image`, form,{
        
        });
        return response;
        
    } catch (error) {
        throw error;
    }
    
}

export async function addEmployeeFeedback(employeeName, review, rating, service, punchuality, customerFeedback, managerBehaviour) {
    try {
        const response = await axios.post(`${API}/employee/feedback`,{employeeName, review, rating, service, punchuality, customerFeedback, managerBehaviour});        
        return response;
        
    } catch (error) {
        throw error;
        
    }
}
