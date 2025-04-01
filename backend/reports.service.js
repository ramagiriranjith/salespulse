const { getMySqlPromiseConnection } = require("../config/mysql.db")

exports.getOrdersCountDB = async (type, from, to, tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const { filter, params } = getFilterCondition('date', type, from, to);

        const sql = `
        SELECT
            count(*) AS todays_orders
        FROM
            orders
        WHERE
            tenant_id = ? AND
            ${filter}
        `;

        const [result] = await conn.query(sql, [tenantId, ...params]);

        return result[0].todays_orders;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
};


exports.getNewCustomerCountDB = async (type, from, to, tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const { filter, params } = getFilterCondition('created_at', type, from, to);

        const sql = `
        SELECT
            count(*) AS new_customers_count
        FROM
            customers
        WHERE
        tenant_id = ? AND
            ${filter}
        `;

        const [result] = await conn.query(sql, [tenantId, ...params]);

        return result[0].new_customers_count;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
};

exports.getRepeatCustomerCountDB = async (type, from, to, tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const { filter, params } = getFilterCondition('date', type, from, to);

        const sql = `
        SELECT
            COUNT(distinct customer_id) as todays_repeat_customers
        FROM
            orders
        WHERE
            tenant_id = ? AND
            ${filter}
            AND customer_type = 'CUSTOMER';
        `;

        const [result] = await conn.query(sql, [tenantId, ...params]);

        return result[0].todays_repeat_customers;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
};

exports.getAverageOrderValueDB = async (type, from, to, tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const { filter, params } = getFilterCondition('created_at', type, from, to);

        const sql = `
        SELECT
            avg(total) AS avg_order_value
        FROM
            invoices
        WHERE    
            tenant_id = ? AND
            ${filter}
        `;

        const [result] = await conn.query(sql, [tenantId, ...params]);

        return result[0].avg_order_value;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
};

exports.getTotalPaymentsByPaymentTypesDB = async (type, from, to, tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {
        const { filter, params } = getFilterCondition('created_at', type, from, to);

        const sql = `
        SELECT
            i.payment_type_id,
            pt.title,
            SUM(total) as total
        FROM
            invoices i
        INNER JOIN 
            payment_types pt
        ON i.payment_type_id = pt.id AND i.tenant_id = pt.tenant_id
        WHERE
            i.tenant_id = ? AND
            ${filter}
        GROUP BY i.payment_type_id
        `;

        const [result] = await conn.query(sql, [tenantId, ...params]);

        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
};

exports.getTotalCustomersDB = async (tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const sql = `
        SELECT
            count(*) AS total_customer
        FROM
            customers
        WHERE tenant_id = ?;
        `;

        const [result] = await conn.query(sql, [tenantId]);

        return result[0].total_customer;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
};

exports.getRevenueDB = async (type, from, to, tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const { filter, params } = getFilterCondition('created_at', type, from, to);

        const sql = `
        SELECT
            SUM(total) AS total_revenue
        FROM
            invoices
        WHERE 
            tenant_id = ? AND
            ${filter}
        `;

        const [result] = await conn.query(sql, [tenantId, ...params]);

        return result[0].total_revenue;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }

};

exports.getTotalTaxDB = async (type, from, to, tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const { filter, params } = getFilterCondition('created_at', type, from, to);

        const sql = `
        SELECT
            SUM(tax_total) AS total_tax
        FROM
            invoices
        WHERE
            tenant_id = ? AND
            ${filter}
        `;

        const [result] = await conn.query(sql, [tenantId, ...params]);

        return result[0].total_tax;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
};

exports.getTotalNetRevenueDB = async (type, from, to, tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const { filter, params } = getFilterCondition('created_at', type, from, to);

        const sql = `
        SELECT
            SUM(sub_total) AS total_net_revenue
        FROM
            invoices
        WHERE
            tenant_id = ? AND
            ${filter}
        `;

        const [result] = await conn.query(sql, [tenantId, ...params]);

        return result[0].total_net_revenue;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
};

exports.getTopSellingItemsDB = async (type, from, to, tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {
        const { filter, params } = getFilterCondition('date', type, from, to);

        const sql = `
        SELECT
            mi.*,
            oi_c.orders_count
        FROM
            menu_items mi
            INNER JOIN (
                SELECT
                    item_id,
                    SUM(quantity) AS orders_count
                FROM
                    order_items
                WHERE
                    tenant_id = ${tenantId} AND
                    status <> 'cancelled'
                    AND ${filter}
                GROUP BY
                    item_id
                ) oi_c ON mi.id = oi_c.item_id
        WHERE tenant_id = ${tenantId}
        ORDER BY
            oi_c.orders_count DESC;
        `;

        const [result] = await conn.query(sql, params);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
};

const getFilterCondition = (field, type, from, to) => {
    const params = [];
    let filter = '';

    switch (type) {
        case 'custom': {
            params.push(from, to);
            filter = `DATE(${field}) >= ? AND DATE(${field}) <= ?`;
            break;
        }
        case 'today': {
            filter = `DATE(${field}) = CURDATE()`;
            break;
        }
        case 'this_month': {
            filter = `YEAR(${field}) = YEAR(NOW()) AND MONTH(${field}) = MONTH(NOW())`;
            break;
        }
        case 'last_month': {
            // filter = `DATE(${field}) >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND DATE(${field}) <= CURDATE()`;
            filter = `MONTH(${field}) = MONTH(DATE_ADD(NOW(), INTERVAL -1 MONTH)) AND YEAR(${field}) = YEAR(DATE_ADD(NOW(), INTERVAL -1 MONTH))`;
            break;
        }
        case 'last_7days': {
            filter = `DATE(${field}) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND DATE(${field}) <= CURDATE()`;
            break;
        }
        case 'yesterday': {
            filter = `DATE(${field}) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)`;
            break;
        }
        case 'tomorrow': {
            filter = `DATE(${field}) = DATE_ADD(CURDATE(), INTERVAL 1 DAY)`;
            break;
        }
        default: {
            filter = '';
        }
    }

    return { params, filter };
}

exports.getItemSaleReportDB = async (startDate, endDate) => {
    const conn = await getMySqlPromiseConnection();
    try {
        const sql = `SELECT mi.title, SUM(COALESCE(oi.quantity, 0)) AS quantity
        FROM salespulse.menu_items mi  
        LEFT JOIN salespulse.order_items oi  
        ON mi.id = oi.item_id 
        AND oi.date BETWEEN ? AND ?
        GROUP BY mi.title;`
        const [rows] = await conn.execute(sql, [startDate, endDate]);
        return rows;

    } catch (error) {
        console.error(error);
    } finally {
        conn.release();
    }
};

exports.getCustomerDueReportDB = async (startDate, endDate) => {
    const conn = await getMySqlPromiseConnection();
    try {
        const sql = `SELECT 
    c.name AS customer_name, 
    o.tenant_id, 
    COALESCE(SUM(COALESCE(oi.price, 0) * COALESCE(oi.quantity, 0)), 0) AS total_amount
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN customers c ON o.tenant_id = c.tenant_id
WHERE o.payment_status = 'pending'
AND o.date BETWEEN CONCAT(?, ' 00:00:00') AND CONCAT(?, ' 23:59:59')
GROUP BY c.name, o.tenant_id;
`
        const [rows] = await conn.execute(sql, [startDate, endDate]);
        return rows;
    } catch (error) {
        console.error(error);
    } finally {
        conn.release();
    }

}

exports.getSupplierDueReportDB = async (startDate, endDate) => {
    const conn = await getMySqlPromiseConnection();
    try {
        const sql = `SELECT 
    s.name AS supplier_name, 
    COALESCE(SUM(COALESCE(si.price, 0) * COALESCE(si.quantity, 0)), 0) AS total_amount
FROM supplier_orders so
LEFT JOIN supplier_items si ON so.id = si.order_id
LEFT JOIN suppliers s ON s.id = so.supplier_id
WHERE so.payment_status = 'pending'
AND so.date BETWEEN  CONCAT(?, ' 00:00:00') AND CONCAT(?, ' 23:59:59')
GROUP BY s.name, so.supplier_id;
`
        const [rows] = await conn.execute(sql, [startDate, endDate]);
        return rows;
    } catch (error) {
        console.error(error);
    } finally {
        conn.release();
    }

}
exports.getEmployeesDB = async () => {
    const conn = await getMySqlPromiseConnection();
    const query = "SELECT employeeId, employeeName, employeeShift FROM employee;";
    const [employees] = await conn.execute(query);
    return employees;
};
exports.getAttendanceReportDB = async (employeeId, startDate, endDate) => {
    const conn = await getMySqlPromiseConnection();
    const query = `
      SELECT 
    ea.id,
    e.employeeId,
    e.employeeName, 
    e.employeeShift,
    ea.attendanceDate,
    TIME(ea.checkInTime) AS checkInTime, 
    TIME(ea.checkOutTime) AS checkOutTime, 
    ea.status, 
    ea.updated_at, 
    ea.updated_by
FROM employee_attendance ea 
JOIN employee e ON ea.employeeId = e.employeeId
WHERE ea.employeeId = ?
AND ea.attendanceDate BETWEEN CONCAT(?, ' 00:00:00') AND CONCAT(?, ' 23:59:59');
    `;
    const [attendanceReport] = await conn.execute(query, [employeeId, startDate, endDate]);
    return attendanceReport;
};
exports.getExpenseReportBD = async (period, startDate, endDate) => {
    const conn = await getMySqlPromiseConnection();
    let query = "";

    switch (period) {
        case "daily":
            query = `
          SELECT DATE(so.date) AS period, 
          COALESCE(SUM(si.quantity * si.price), 0) AS total_expense
          FROM supplier_orders so
          LEFT JOIN supplier_items si ON so.id = si.order_id
          WHERE so.payment_status = 'pending'
          AND so.date BETWEEN CONCAT(?, ' 00:00:00') AND CONCAT(?, ' 23:59:59')
          GROUP BY period
          ORDER BY period;
        `;
            break;

        case "monthly":
            query = `
          SELECT DATE_FORMAT(so.date, '%Y-%m') AS period, 
                 COALESCE(SUM(si.quantity * si.price), 0) AS total_expense
          FROM supplier_orders so
          LEFT JOIN supplier_items si ON so.id = si.order_id
          WHERE so.payment_status = 'pending'
          AND so.date BETWEEN CONCAT(?, ' 00:00:00') AND CONCAT(?, ' 23:59:59')
          GROUP BY period
          ORDER BY period;
        `;
            break;

        case "yearly":
            query = `
          SELECT DATE_FORMAT(so.date, '%Y') AS period, 
                 COALESCE(SUM(si.quantity * si.price), 0) AS total_expense
          FROM supplier_orders so
          LEFT JOIN supplier_items si ON so.id = si.order_id
          WHERE so.payment_status = 'pending'
          AND so.date BETWEEN CONCAT(?, ' 00:00:00') AND CONCAT(?, ' 23:59:59')
          GROUP BY period
          ORDER BY period;
        `;
            break;

        default:
            throw new Error("Invalid period selection");
    }

    const [rows] = await conn.execute(query, [startDate, endDate]);
    return rows;
};

exports.getSalesReportDB = async (period, startDate, endDate) => {
    const conn = await getMySqlPromiseConnection();
    let query = "";

    switch (period) {
        case "daily":
            query = `
            SELECT 
            DATE(o.date) AS order_date,  
            o.tenant_id, 
            SUM(i.charges) AS charges,
            SUM(i.sub_total) AS sub_total,
            SUM(i.tax_total) AS tax,
            SUM(i.total) AS total_amount,  
            SUM(CASE WHEN o.payment_status = 'paid' THEN i.total ELSE 0 END) AS paid_amount,  
            SUM(CASE WHEN o.payment_status = 'pending' THEN i.total ELSE 0 END) AS pending_amount  
            FROM orders o
            JOIN invoices i ON o.invoice_id = i.id
            WHERE o.date BETWEEN CONCAT(?, ' 00:00:00') AND CONCAT(?, ' 23:59:59') 
            GROUP BY order_date, o.tenant_id
            ORDER BY order_date;`;
            break;

        case "monthly":
            query = `
            SELECT 
            DATE_FORMAT(o.date, '%Y-%m') AS order_month,  
            o.tenant_id, 
            SUM(i.charges) AS charges,
            SUM(i.sub_total) AS sub_total,
            SUM(i.tax_total) AS tax,
            SUM(i.total) AS total_amount,  
            SUM(CASE WHEN o.payment_status = 'paid' THEN i.total ELSE 0 END) AS paid_amount,  
            SUM(CASE WHEN o.payment_status = 'pending' THEN i.total ELSE 0 END) AS pending_amount  
            FROM orders o
            JOIN invoices i ON o.invoice_id = i.id
            WHERE o.date BETWEEN CONCAT(?, '00:00:00') AND CONCAT(?, '23:59:59')
            GROUP BY order_month, o.tenant_id
            ORDER BY order_month;`;
            break;

        case "yearly":
            query = `
            SELECT 
            DATE_FORMAT(o.date, '%Y') AS order_year,  
            o.tenant_id, 
            SUM(i.charges) AS charges,
            SUM(i.sub_total) AS sub_total,
            SUM(i.tax_total) AS tax,
            SUM(i.total) AS total_amount,  
            SUM(CASE WHEN o.payment_status = 'paid' THEN i.total ELSE 0 END) AS paid_amount 
            FROM orders o
            JOIN invoices i ON o.invoice_id = i.id
            WHERE o.date BETWEEN CONCAT(?, '00:00:00') AND CONCAT(?, '23:59:59')
            GROUP BY order_year, o.tenant_id
            ORDER BY order_year;`;
            break;

        default:
            throw new Error("Invalid period selection");
    }

    const [rows] = await conn.execute(query, [startDate, endDate]);
    return rows;
}
exports.getStockAlertReportDB = async () => {
    const conn = await getMySqlPromiseConnection();

    const query = `SELECT title, quantity, stock_alert_quantity FROM inventory_items`;
    const [rows] = await conn.execute(query);
    return rows;
};
exports.getPurchaseReportDB = async (period, startDate, endDate) => {
    const conn = await getMySqlPromiseConnection();
    let query = "";

    switch (period) {
        case "daily":
            query = `
            SELECT 
            DATE(so.date) AS order_date,
            SUM(CASE WHEN so.payment_status = 'pending' THEN si.quantity * si.price - so.amount_paid ELSE 0 END) AS due_amount,
            SUM(CASE 
            WHEN so.payment_status = 'pending' THEN so.amount_paid 
            WHEN so.payment_status = 'paid' THEN si.quantity * si.price  
            ELSE 0 
            END) AS paid_amount,
            SUM(si.quantity*si.price) AS total_amount
            FROM supplier_orders so
            RIGHT JOIN supplier_items si ON si.order_id = so.id
            WHERE so.date BETWEEN CONCAT(?, ' 00:00:00') AND CONCAT(?, ' 23:59:59') 
            GROUP BY order_date
            ORDER BY order_date;
            `;
            break;

        case "monthly":
            query = `
            SELECT 
            DATE_FORMAT(so.date, '%Y-%m') AS order_date,
            SUM(CASE WHEN so.payment_status = 'pending' THEN si.quantity * si.price - so.amount_paid ELSE 0 END) AS due_amount,
            SUM(CASE 
            WHEN so.payment_status = 'pending' THEN so.amount_paid 
            WHEN so.payment_status = 'paid' THEN si.quantity * si.price  
            ELSE 0 
            END) AS paid_amount,
            SUM(si.quantity*si.price) AS total_amount
            FROM supplier_orders so
            RIGHT JOIN supplier_items si ON si.order_id = so.id
            WHERE so.date BETWEEN CONCAT(?, ' 00:00:00') AND CONCAT(?, ' 23:59:59') 
            GROUP BY order_date
            ORDER BY order_date;
        `;
            break;

        case "yearly":
            query = `
            SELECT 
            DATE_FORMAT(so.date, '%Y') AS order_date,
            SUM(CASE WHEN so.payment_status = 'pending' THEN si.quantity * si.price - so.amount_paid ELSE 0 END) AS due_amount,
            SUM(CASE 
            WHEN so.payment_status = 'pending' THEN so.amount_paid 
            WHEN so.payment_status = 'paid' THEN si.quantity * si.price  
            ELSE 0 
            END) AS paid_amount,
            SUM(si.quantity*si.price) AS total_amount
            FROM supplier_orders so
            RIGHT JOIN supplier_items si ON si.order_id = so.id
            WHERE so.date BETWEEN CONCAT(?, ' 00:00:00') AND CONCAT(?, ' 23:59:59') 
            GROUP BY order_date
            ORDER BY order_date;
        `;
            break;

        default:
            throw new Error("Invalid period selection");
    }

    const [rows] = await conn.execute(query, [startDate, endDate]);
    return rows;
}

exports.getWorkPeriodReportDB = async (startDate, endDate) => {
    const conn = await getMySqlPromiseConnection();
    try {
        const sql = `SELECT * FROM work_period WHERE start_date >= ? AND end_date <= ? ;`
        const [rows] = await conn.execute(sql, [startDate, endDate]);
        return rows;

    } catch (error) {
        console.error(error);
    } finally {
        conn.release();
    }
};

exports.getSaleSummaryReportDB = async (startDate, endDate) => {
    const conn = await getMySqlPromiseConnection();
    try {
        const query = `
        
        SELECT COUNT(o.id) AS orderQuantity,
        SUM(i.sub_total) AS subTotal,
        SUM(i.charges) AS charges,
        SUM(i.total - i.tax_total) AS amountTaxExcluded,
        SUM(i.tax_total) AS tax,
        SUM(i.total) AS totalAmount
        FROM orders o
        JOIN invoices i ON o.invoice_id = i.id
        WHERE o.date BETWEEN CONCAT(?, ' 00:00:00') AND CONCAT(?, ' 23:59:59')`;
    
    const [rows] = await conn.query(query, [startDate, endDate]);
    return rows[0];
        
    } catch (error) {
        console.error(error);
        
    }finally {
        conn.release();
    }
};

exports.getSaleDetailedReportDB = async (startDate, endDate) => {
    const conn = await getMySqlPromiseConnection();
    try {
        const query = `
        SELECT o.date ,
        o.delivery_type AS type,
        o.table_id,
        mi.title AS item_name,
        oi.quantity,
        inv.sub_total,
        inv.charges,
        inv.tax_total,
        mi.discount
        FROM orders o RIGHT JOIN order_items oi ON o.id = oi.order_id 
        RIGHT JOIN menu_items mi ON oi.item_id = mi.id
        RIGHT JOIN invoices inv ON inv.id = o.invoice_id
        WHERE o.date BETWEEN CONCAT(?, ' 00:00:00') AND CONCAT(?, ' 23:59:59');`;
    
    const [rows] = await conn.query(query, [startDate, endDate]);
    return rows;
        
    } catch (error) {
        console.error(error);
        
    }finally {
        conn.release();
    }
};
exports.getEmployeePerformanceDB = async () => {
    const conn = await getMySqlPromiseConnection();
    try {
        const sql = `SELECT 
                id,
                employee_name AS employeeName,
                review,
                rating,
                review_result AS reviewResult,
                service,
                punchuality,
                customer_feedback_on_staff AS customerFeedback,
                manager_behaviour_feedback_on_employee AS managerFeedback
            FROM 
                employee_feedback;`;
        const [result] = await conn.execute(sql)
        return result;
        
    } catch (error) {
        console.error(error);
        throw error;
    }finally{
        conn.release();
    }
}
