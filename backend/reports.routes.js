const { Router } = require("express");

const { isLoggedIn, isAuthenticated,
    authorize,
    isSubscriptionActive,
  } = require("../middlewares/auth.middleware");
  const { SCOPES } = require("../config/user.config");
const { getReports, getItemSaleReport, getCustomerDueReport, getSupplierDueReport, getEmployees, getAttendanceReport, getExpenseReport, getSalesReport, getStockAlertReport, getPurchaseReport, getWorkPeriodReport, getSaleSummaryReport, getSaleDetailedReport, getEmployeePerformance } = require("../controllers/reports.controller");

const router = Router();

router.get("/", isLoggedIn, isAuthenticated, isSubscriptionActive, authorize([SCOPES.REPORTS]), getReports);
router.get("/item-sale-report", getItemSaleReport);
router.get("/customer-due-report", getCustomerDueReport);
router.get("/supplier-due-report", getSupplierDueReport);
router.get("/employees", getEmployees);
router.get("/attendance-report", getAttendanceReport);
router.get("/expense-report", getExpenseReport );
router.get("/sales-report", getSalesReport);
router.get("/stock-alert", getStockAlertReport);
router.get("/purchase-report", getPurchaseReport);
router.get("/work-period-report", getWorkPeriodReport);
router.get("/sale-summary-report", getSaleSummaryReport);
router.get("/sale-detailed-report", getSaleDetailedReport);
router.get("/employee-performance", getEmployeePerformance);
module.exports = router;

