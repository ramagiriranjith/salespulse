
const { getOrdersCountDB, getNewCustomerCountDB, getRepeatCustomerCountDB, getAverageOrderValueDB, getTotalCustomersDB, getTotalNetRevenueDB, getTotalTaxDB, getRevenueDB, getTopSellingItemsDB, getTotalPaymentsByPaymentTypesDB, getItemSaleReportDB, getCustomerDueReportDB, getSupplierDueReportDB, getEmployeesDB, getAttendanceReportDB, getExpenseReportBD, getSalesReportDB, getStockAlertReportDB, getPurchaseReportDB, getWorkPeriodReportDB, getSaleSummaryReportDB, getSaleDetailedReportDB, getEmployeePerformanceDB } = require("../services/reports.service")
const { getCurrencyDB } = require("../services/settings.service")

exports.getReports = async (req, res) => {
    try {
        const tenantId = req.user.tenant_id;

        const from = req.query.from || null;
        const to = req.query.to || null;
        const type = req.query.type;

        if(!type) {
            return res.status(400).json({
                success: false,
                message: "Please provide required details!"
            });
        }

        if(type == 'custom') {
            if(!(from && to)) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide required details from & to dates!"
                });
            }
        }

        const [ordersCount, newCustomers, repeatedCustomers, averageOrderValue, totalCustomers, netRevenue, taxTotal, revenueTotal, topSellingItems, totalPaymentsByPaymentTypes, currency] = await Promise.all([
            getOrdersCountDB(type, from, to, tenantId),
            getNewCustomerCountDB(type, from, to, tenantId),
            getRepeatCustomerCountDB(type, from, to, tenantId),
            getAverageOrderValueDB(type, from, to, tenantId),
            getTotalCustomersDB(tenantId),
            getTotalNetRevenueDB(type, from, to, tenantId),
            getTotalTaxDB(type, from, to, tenantId),
            getRevenueDB(type, from, to, tenantId),
            getTopSellingItemsDB(type, from, to, tenantId),
            getTotalPaymentsByPaymentTypesDB(type, from, to, tenantId),
            getCurrencyDB(tenantId),
        ]);

        return res.status(200).json({
            ordersCount, newCustomers, repeatedCustomers, currency, averageOrderValue, totalCustomers, netRevenue, taxTotal, revenueTotal, topSellingItems, totalPaymentsByPaymentTypes
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try later!"
        });
    }
};

exports.getItemSaleReport = async (req, res) =>{
    try{
        const {startDate, endDate} = req.query;

        if(!startDate || !endDate){
            return res.status(400).json({
                success : false,
                message : "Start date and end date are required."
            });
        }
        const reportData = await getItemSaleReportDB(startDate, endDate);
        res.status(200).json(reportData);
    }catch(error){
        console.error("Error fetching sales reports:", error);
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        });
    }
}
exports.getCustomerDueReport = async(req, res) => {
    try {
        const {startDate, endDate} = req.query;

        if(!startDate || !endDate){
            return res.status(400).json({
                success : false,
                message : "Start date and end date are required."
            });
        }
        const reportData =  await getCustomerDueReportDB(startDate, endDate);
        res.status(200).json(reportData);
        
    } catch (error) {
        console.error("Error fetching sales reports:", error);
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        });
    }
}
exports.getSupplierDueReport = async(req, res) => {
    try {
        const {startDate, endDate} = req.query;

        if(!startDate || !endDate){
            return res.status(400).json({
                success : false,
                message : "Start date and end date are required."
            });
        }
        const reportData =  await getSupplierDueReportDB(startDate, endDate);
        res.status(200).json(reportData);
        
    } catch (error) {
        console.error("Error fetching sales reports:", error);
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        });
    }
}

exports.getEmployees = async (req, res) => {
    try {
      const employees = await getEmployeesDB();
      res.status(200).json({ data: employees });
    } catch (error) {
      res.status(500).json({ message: "Error fetching employees", error });
    }
  };

exports.getAttendanceReport = async (req, res) => {
    try {
      const { employeeId, startDate, endDate } = req.query;
      const attendanceReport = await getAttendanceReportDB(employeeId, startDate, endDate);
      res.status(200).json({ data: attendanceReport });
    } catch (error) {
      res.status(500).json({ message: "Error fetching attendance report", error });
    }
  };

exports.getExpenseReport = async (req, res) => {
    try {
      const { period, startDate, endDate } = req.query;
      const data = await getExpenseReportBD(period, startDate , endDate);
      res.status(200).json({ success: true, message: "Successfully fetch the data.",data });
    } catch (error) {
      console.error("Error fetching expense report:", error);
      res.status(500).json({ success: false, message: "Error fetching expense report", error: error.message });
    }
  };

exports.getSalesReport = async (req, res) => {
    try {
        const { period, startDate, endDate } = req.query;
        const report = await getSalesReportDB(period, startDate, endDate);
        res.status(200).json({success: true, data: report});
    } catch (error) {
        console.error("Error fetching sales report:", error);
        res.status(500).json({ success: false, message: "Error fetching sales report", error: error.message });
    }
};
exports.getStockAlertReport = async (req, res) => {
    try {
        const reportData = await getStockAlertReportDB();
        res.status(200).json({ success: true, data: reportData });
    } catch (error) {
        console.error("Error fetching stock alert report:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
exports.getPurchaseReport = async (req, res) => {
    try{
        const { period, startDate, endDate } = req.query;
        const reportData = await getPurchaseReportDB( period, startDate, endDate );
        res.status(200).json({success: true, data: reportData});
    }catch(error){
        console.error("Error fetching purchase report:", error);
        res.status(500).json({ success: false, message: "Error fetching purchase report", error: error.message});
    }
}

exports.getWorkPeriodReport = async (req, res) =>{
    try{
        const {startDate, endDate} = req.query;

        if(!startDate || !endDate){
            return res.status(400).json({
                success : false,
                message : "Start date and end date are required."
            });
        }
        const reportData = await getWorkPeriodReportDB(startDate, endDate);
        res.status(200).json(reportData);
    }catch(error){
        console.error("Error fetching work period reports:", error);
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        });
    }
}

exports.getSaleSummaryReport = async (req, res) =>{
    try{
        const {startDate, endDate} = req.query;

        if(!startDate || !endDate){
            return res.status(400).json({
                success : false,
                message : "Start date and end date are required."
            });
        }
        const reportData = await getSaleSummaryReportDB(startDate, endDate);
        res.status(200).json(reportData);
    }catch(error){
        console.error("Error fetching sale summary period reports:", error);
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        });
    }
}

exports.getSaleDetailedReport = async (req, res) =>{
    try{
        const {startDate, endDate} = req.query;

        if(!startDate || !endDate){
            return res.status(400).json({
                success : false,
                message : "Start date and end date are required."
            });
        }
        const reportData = await getSaleDetailedReportDB(startDate, endDate);
        res.status(200).json(reportData);
    }catch(error){
        console.error("Error fetching sale summary period reports:", error);
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        });
    }
}
exports.getEmployeePerformance = async(req, res) => {
    try {
        const result = await getEmployeePerformanceDB();
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try agin later!"
        })

    }
}
