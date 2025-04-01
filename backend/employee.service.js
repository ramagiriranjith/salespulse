const { getMySqlPromiseConnection } = require("../config/mysql.db")

exports.addEmployeeDB = async(employeeName, employeeDepartment, employeeDesignation, employeeShift, employeeJoiningDate, employeeEmail, employeePhone, employeePresentAddress, employeePermanentAddress, employeeEmergencyContact, employeeNIDNumber, employeeGender, employeeReligion, employeeMartialStatus, employeeDOB, employeeSalaryType, employeeSalary, employeeStatus, employeeAccountHolderName, employeeAccountNumber, employeeBankName, employeeBankIdentifierCode, employeeBranchLocation, employeeTaxPayerId) => {
    const conn = await getMySqlPromiseConnection();
    try {
        const sql = `
        INSERT INTO employee
        (employeeName, employeeDepartment, employeeDesignation, employeeShift, employeeJoiningDate, employeeEmail, employeePhone, employeePresentAddress, employeePermanentAddress, employeeEmergencyContact, employeeNIDNumber, employeeGender, employeeReligion, employeeMartialStatus, employeeDOB, employeeSalaryType, employeeSalary, employeeStatus, employeeAccountHolderName, employeeAccountNumber, employeeBankName, employeeBankIdentifierCode, employeeBranchLocation, employeeTaxPayerId, updated_at)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); 
        `;
        const [result] = await conn.query(sql, [employeeName, employeeDepartment, employeeDesignation, employeeShift, employeeJoiningDate, employeeEmail, employeePhone, employeePresentAddress, employeePermanentAddress, employeeEmergencyContact, employeeNIDNumber, employeeGender, employeeReligion, employeeMartialStatus, employeeDOB, employeeSalaryType, employeeSalary, employeeStatus, employeeAccountHolderName, employeeAccountNumber, employeeBankName, employeeBankIdentifierCode, employeeBranchLocation, employeeTaxPayerId, new Date()]);
        return result.insertId;
        
    } catch (error) {
        console.error(error);
        throw error;
        
    }finally{
        conn.release();
    }
}

exports.getEmployeesMailOrPhoneDB = async(employeeEmail, employeePhone) => {
    const conn = await getMySqlPromiseConnection();
    try {
        const [result] = await conn.execute
        (`SELECT * FROM employee WHERE employeeEmail = ? OR employeePhone = ?;`, [employeeEmail, employeePhone]);
        return result;
    } catch (error) {
        console.log("Error fetching employee employeeEmail OR employeePhone:",error);
        throw(error)
        
    }finally{
        conn.release();
    }
}

exports.getEmployeesListDB = async() => {
    const conn = await getMySqlPromiseConnection();
    try{
        const [result] = await conn.execute
        (`SELECT * FROM employee;`);
        return result;
    }catch (error){
        console.log("Error fetching employee details:",error);
        throw(error)
    }finally{
        conn.release();
    }
}

exports.deleteEmployeesListDB = async(employeeId)=>{
    const conn = await getMySqlPromiseConnection();
    try {
        const sql = `DELETE FROM employee WHERE employeeId = ? ;`
        return await conn.query(sql, [employeeId]);
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }finally{
        conn.release();
    }

}

exports.updateEmployeesListDB = async (employeeId, employeeName, employeeDepartment, employeeDesignation, employeeShift, employeeJoiningDate, employeeLeavingDate, employeeEmail, employeePhone, employeePresentAddress, employeePermanentAddress, employeeEmergencyContact, employeeNIDNumber, employeeGender, employeeReligion, employeeMartialStatus, employeeDOB, employeeSalaryType, employeeSalary, employeeStatus, employeeAccountHolderName, employeeAccountNumber, employeeBankName, employeeBankIdentifierCode, employeeBranchLocation, employeeTaxPayerId) =>{
    const conn = await getMySqlPromiseConnection();
    try {
        const sql = `UPDATE employee SET employeeName = ?, employeeDepartment = ?, employeeDesignation = ?, employeeShift = ?, employeeJoiningDate = ?, employeeLeavingDate = ?, employeeEmail = ?, employeePhone = ?, employeePresentAddress = ?, employeePermanentAddress = ?, employeeEmergencyContact = ?, employeeNIDNumber = ?, employeeGender = ?, employeeReligion = ?, employeeMartialStatus = ?, employeeDOB = ?, employeeSalaryType = ?, employeeSalary = ?, employeeStatus = ?, employeeAccountHolderName = ?, employeeAccountNumber = ?, employeeBankName = ?, employeeBankIdentifierCode = ?, employeeBranchLocation = ?, employeeTaxPayerId = ?, updated_at = ?  WHERE employeeId = ?`;
        const [result] = await conn.query(sql, [ employeeName, employeeDepartment, employeeDesignation, employeeShift, employeeJoiningDate, employeeLeavingDate, employeeEmail, employeePhone, employeePresentAddress, employeePermanentAddress, employeeEmergencyContact, employeeNIDNumber, employeeGender, employeeReligion, employeeMartialStatus, employeeDOB, employeeSalaryType, employeeSalary, employeeStatus, employeeAccountHolderName, employeeAccountNumber, employeeBankName, employeeBankIdentifierCode, employeeBranchLocation, employeeTaxPayerId, new Date(), employeeId]);
        console.log(sql);
        
        return result;
        
    } catch (error) {
        console.error("Database update error:",error);
        throw error;
        
    }finally{
        conn.release();
    }
}
exports.getEmployeeListDB = async(employeeId) => {
    const conn = await getMySqlPromiseConnection();
    try{
        const [result] = await conn.execute(
        `SELECT * FROM employee WHERE employeeId = ?;`, [employeeId]
        );
        return result[0];
    }catch (error){
        console.log("Error fetching employee details:",error);
        throw(error)
    }finally{
        conn.release();
    }
}



exports.updateProfilePictureDB = async(employeeId, employeeProfilePicture ) => {
    const conn = await getMySqlPromiseConnection();
    try {
        const sql = `UPDATE employee SET employeeProfilePicture = ? WHERE employeeId = ?`;
        await conn.query(sql, [employeeProfilePicture, employeeId]);
        return;
        
    } catch (error) {
        console.error(error);
        throw error;
    }finally{
        conn.release();
    }
}



exports.addEmployeeFeedbackDB = async ({employeeName, review, rating, service, review_result, punchuality, customerFeedback, managerBehaviour}) => {
    const conn = await getMySqlPromiseConnection();
    try {
        const sql =
            `INSERT INTO employee_feedback (employee_name, review, rating, service, review_result, punchuality, customer_feedback_on_staff, manager_behaviour_feedback_on_employee) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

         await conn.query(sql, [employeeName, review, rating, service, review_result, punchuality, customerFeedback, managerBehaviour]);
        return ;
    } catch (error) {
        console.error(error);
        throw error;
    }finally{
        conn.release();
    }
};




