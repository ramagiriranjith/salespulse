const { Router } = require("express");
const { addEmployees, getEmployeesList, deleteEmployeesList, updateEmployeesList, getEmployeeList, uploadProfilePicture, updateProfilePicture, addEmployeeFeedback, getEmployeePerformance } = require("../controllers/employee.controller");



const router = Router();

router.post(
    "/add",
    addEmployees
)
router.get(
    "/",
    getEmployeesList
)
router.delete(
    "/delete/:employeeId",
    deleteEmployeesList
)
router.put(
    "/:employeeId",
    updateEmployeesList
)
router.get(
    "/:employeeId",
    getEmployeeList
    
)

router.post(
    "/:employeeId/update-image",
    updateProfilePicture
)
router.post(
    "/feedback",
    addEmployeeFeedback
)

module.exports = router;


