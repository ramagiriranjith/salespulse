const { addEmployeeDB, getEmployeesMailOrPhoneDB, getEmployeesListDB, deleteEmployeesListDB, updateEmployeesListDB, getEmployeeListDB, updateProfilePictureDB, addEmployeeFeedbackDB, getEmployeePerformanceDB } = require("../services/employee.service");

const path = require('path');
const fs = require("fs");

exports.addEmployees = async (req, res) => {
    try {
        const { employeeName,
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
            employeeTaxPayerId } = req.body;

        const existingEmployees = await getEmployeesMailOrPhoneDB(employeeEmail, employeePhone);

        if (existingEmployees.length > 0) {
            return res.status(400).json({
                success: false,
                message: "The email or phone number is already in use"
            }
            )

        }
        

        await addEmployeeDB(employeeName, employeeDepartment, employeeDesignation, employeeShift, employeeJoiningDate, employeeLeavingDate, employeeEmail, employeePhone, employeePresentAddress, employeePermanentAddress, employeeEmergencyContact, employeeNIDNumber, employeeGender, employeeReligion, employeeMartialStatus, employeeDOB, employeeSalaryType, employeeSalary, employeeStatus, employeeAccountHolderName, employeeAccountNumber, employeeBankName, employeeBankIdentifierCode, employeeBranchLocation, employeeTaxPayerId);

        return res.status(200).json({
            success: true,
            message: "Employee added successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong please try agin later!"
        })
    }
}

exports.getEmployeesMailOrPhone = async (req, res) => {
    try {
        const { employeeEmail, employeePhone } = req.query;
        const result = await getEmployeesMailOrPhoneDB(employeeEmail, employeePhone);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try agin later!"
        })

    }
}
exports.getEmployeesList = async (req, res) => {
    try {
        const result = await getEmployeesListDB();
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try agin later!"
        })

    }

}
exports.deleteEmployeesList = async (req, res) => {
    try {
        const { employeeId } = req.body;
        if (!employeeId) {
            return res.status(400).json({
                success: false,
                message: "Employee ID is required"
            });
        }
        const deletedEmployee = await deleteEmployeesListDB(employeeId);
        if (deletedEmployee.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again later!"
        });

    }
}
exports.updateEmployeesList = async (req, res) => {
    const employeeId = req.params.employeeId;
    const { employeeName, employeeDepartment, employeeDesignation, employeeShift, employeeJoiningDate, employeeLeavingDate, employeeEmail, employeePhone, employeePresentAddress, employeePermanentAddress, employeeEmergencyContact, employeeNIDNumber, employeeGender, employeeReligion, employeeMartialStatus, employeeDOB, employeeSalaryType, employeeSalary, employeeStatus, employeeAccountHolderName, employeeAccountNumber, employeeBankName, employeeBankIdentifierCode, employeeBranchLocation, employeeTaxPayerId} = req.body;

    try {
        await updateEmployeesListDB(employeeId, employeeName, employeeDepartment, employeeDesignation, employeeShift, employeeJoiningDate, employeeLeavingDate, employeeEmail, employeePhone, employeePresentAddress, employeePermanentAddress, employeeEmergencyContact, employeeNIDNumber, employeeGender, employeeReligion, employeeMartialStatus, employeeDOB, employeeSalaryType, employeeSalary, employeeStatus, employeeAccountHolderName, employeeAccountNumber, employeeBankName, employeeBankIdentifierCode, employeeBranchLocation, employeeTaxPayerId);
        res.status(200).json({
            success: true,
            message: "Employee updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating employee", error
        });
    }
}
exports.getEmployeeList = async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const { employeeName, employeeDepartment, employeeDesignation, employeeShift, employeeJoiningDate, employeeLeavingDate, employeeEmail, employeePhone, employeePresentAddress, employeePermanentAddress, employeeEmergencyContact, employeeNIDNumber, employeeGender, employeeReligion, employeeMartialStatus, employeeDOB, employeeSalaryType, employeeSalary, employeeStatus, employeeAccountHolderName, employeeAccountNumber, employeeBankName, employeeBankIdentifierCode, employeeBranchLocation, employeeTaxPayerId, employeeProfilePicture } = req.body;
        const result = await getEmployeeListDB(employeeId, employeeName, employeeDepartment, employeeDesignation, employeeShift, employeeJoiningDate, employeeLeavingDate, employeeEmail, employeePhone, employeePresentAddress, employeePermanentAddress, employeeEmergencyContact, employeeNIDNumber, employeeGender, employeeReligion, employeeMartialStatus, employeeDOB, employeeSalaryType, employeeSalary, employeeStatus, employeeAccountHolderName, employeeAccountNumber, employeeBankName, employeeBankIdentifierCode, employeeBranchLocation, employeeTaxPayerId, employeeProfilePicture);
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ msg: 'Not found' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error updating employee details", error
        });


    }

}

exports.updateProfilePicture = async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const file = req.files?.employeeProfilePicture;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const profileDir = path.join(__dirname, `../../profile`);


        if (!fs.existsSync(profileDir)) {
            fs.mkdirSync(profileDir, { recursive: true });
        }

        const fileName = `${employeeId}_${Date.now()}${path.extname(file.name)}`;
        const filePath = path.join(profileDir, fileName);
        const fileUrl = `profile/${fileName}`;

        await file.mv(filePath);

        await updateProfilePictureDB(employeeId, fileUrl);
        return res.status(200).json({
            success: true,
            message: "Profile picture uploaded successfully.",
            fileUrl: fileUrl
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try agin later!"
        });
    }
}


exports.addEmployeeFeedback = async (req, res) => {
    try {
        const {
            employeeName, review, rating, service, punchuality, customerFeedback, managerBehaviour
        } = req.body;
        console.log("employeeName",employeeName);
        console.log("review", review);
        console.log(req.body);
        
        
        
        var review_result = '';

        if (!(employeeName && review && rating && service && punchuality && customerFeedback && managerBehaviour)
        ) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required' 
            });
        }

        if (rating > 3) {
            review_result = 'POSITIVE';
        } else if (rating <= 2) {
            review_result = 'NEGATIVE';
        } else {
            review_result = 'NEUTRAL';
        }

        const feedback = await addEmployeeFeedbackDB({
            employeeName, review, rating, service, review_result, punchuality, customerFeedback, managerBehaviour
        });

        res.status(201).json({ 
            success: true,
            message: 'Feedback added successfully', feedback 
        });
    } catch (error) {
        console.error('Error adding employee feedback:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error' 
        });
    }
};



