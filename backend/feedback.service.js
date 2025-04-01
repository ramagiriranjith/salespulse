const { getMySqlPromiseConnection } = require("../config/mysql.db")

exports.addCustomerReviewDB = async (review, rating, customer_name, review_result, tenant_id) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const sql = `
        INSERT INTO customer_feedbacks
        (review, rating, customer_name, review_result, tenant_id)
        VALUES
        (?, ?, ?, ?, ?);
        `;

        const [result] = await conn.query(sql, [review, rating, customer_name, review_result, tenant_id]);

        return result.insertId;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
}

exports.deleteCustomerFeedBackDB = async (id, tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const sql = `
        DELETE FROM customer_feedbacks
        WHERE id = ? AND tenant_id = ?;
        `;

        await conn.query(sql, [id, tenantId]);

        return;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
}

exports.getAllCustomerFeedbacksDB = async (tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const sql = `SELECT * from customer_feedbacks where tenant_id = ?`;

        const [result] = await conn.query(sql, [tenantId]);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
}

exports.getCustomerFeedbackDB = async (id, tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const sql = `SELECT * from customer_feedbacks where id = ? AND tenant_id = ?`;

        const [result] = await conn.query(sql, [id, tenantId]);
        return result[0];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
}
