const { getMySqlPromiseConnection } = require("../config/mysql.db")

exports.addInventoryItemDB = async (title, categoryId, quantity, supplier_name, stock_alert_quantity, tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const sql = `
        INSERT INTO inventory_items
        (title, category, quantity, supplier_name, stock_alert_quantity, tenant_id)
        VALUES
        (?, ?, ?, ?, ?, ?);
        `;

        const [result] = await conn.query(sql, [title, categoryId, quantity, supplier_name, stock_alert_quantity, tenantId]);

        return result.insertId;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
}

exports.updateInventoryItemDB = async (id, title, quantity, categoryId, tenantId, supplierName, stock_alert_quantity) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const sql = `
        UPDATE inventory_items SET
        title = ?, quantity = ?, category = ?, supplier_name = ?, stock_alert_quantity = ?
        WHERE id = ? AND tenant_id = ?;
        `;
        await conn.query(sql, [title, quantity, categoryId, supplierName, stock_alert_quantity, id, tenantId]);

        return;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
}

exports.updateInventoryItemImageDB = async (id, image, tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const sql = `
        UPDATE inventory_items SET
        image = ?
        WHERE id = ? AND tenant_id = ?;
        `;

        await conn.query(sql, [image, id, tenantId]);

        return;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
}

exports.deleteInventoryItemDB = async (id, tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const sql = `
        DELETE FROM inventory_items 
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

exports.getAllInventoryItemsDB = async (tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const sql = `SELECT * from inventory_items where tenant_id = ?`;

        const [result] = await conn.query(sql, [tenantId]);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
}

exports.getInventoryItemDB = async (id, tenantId) => {
    const conn = await getMySqlPromiseConnection();
    try {

        const sql = `SELECT * from inventory_items where id = ? AND tenant_id = ?`;

        const [result] = await conn.query(sql, [id, tenantId]);
        return result[0];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        conn.release();
    }
}
