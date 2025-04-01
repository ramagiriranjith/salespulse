const { addInventoryItemDB, updateInventoryItemDB, deleteInventoryItemDB, getAllInventoryItemsDB, getInventoryItemDB, updateInventoryItemImageDB } = require("../services/inventory.service");

const path = require("path")
const fs = require("fs");

exports.addInventoryItem = async (req, res) => {
    try {
        const tenantId = req.user.tenant_id;
        const { title, categoryId, quantity, supplier_name, stock_alert_quantity } = req.body;

        if (!(title && categoryId && quantity)) {
            return res.status(400).json({
                success: false,
                message: "Please provide required details: title, categoryId, quantity, stock_alert_quantity"
            });
        }

        const InventoryItemId = await addInventoryItemDB(title, categoryId, quantity, supplier_name, stock_alert_quantity, tenantId);

        return res.status(200).json({
            success: true,
            message: "Inventory Item Added.",
            InventoryItemId
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try later!"
        });
    }
};

exports.updateInventoryItem = async (req, res) => {
    try {
        const tenantId = req.user.tenant_id;
        const id = req.params.id;
        const { title, categoryId, quantity, supplier_name, stock_alert_quantity } = req.body;

        if (!(title && categoryId && quantity && stock_alert_quantity)) {
            return res.status(400).json({
                success: false,
                message: "Please provide required details: title, categoryId, quantity, StockAlertQuantity"
            });
        }

        await updateInventoryItemDB(id, title, quantity, categoryId, tenantId, supplier_name, stock_alert_quantity);

        return res.status(200).json({
            success: true,
            message: "Inventory Item Updated."
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try later!"
        });
    }
};

exports.uploadInventoryItemPhoto = async (req, res) => {
    try {
        const tenantId = req.user.tenant_id;
        const id = req.params.id;

        const file = req.files.image;

        const imagePath = path.join(__dirname, `../../inventory/${tenantId}/`) + id;

        if (!fs.existsSync(path.join(__dirname, `../../inventory/${tenantId}/`))) {
            fs.mkdirSync(path.join(__dirname, `../../inventory/${tenantId}/`));
        }

        const imageURL = `/inventory/${tenantId}/${id}`;

        await file.mv(imagePath);
        await updateInventoryItemImageDB(id, imageURL, tenantId);

        return res.status(200).json({
            success: true,
            message: "Inventory Item Image Uploaded.",
            imageURL: imageURL
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try later!"
        });
    }
};

exports.removeInventoryItemPhoto = async (req, res) => {
    try {
        const tenantId = req.user.tenant_id;
        const id = req.params.id;
        const imagePath = path.join(__dirname, `../../inventory/${tenantId}/`) + id;

        fs.unlinkSync(imagePath)

        await updateInventoryItemImageDB(id, null, tenantId);

        return res.status(200).json({
            success: true,
            message: "Inventory Item Image Removed.",
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try later!"
        });
    }
};

exports.deleteInventoryItem = async (req, res) => {
    try {
        const tenantId = req.user.tenant_id;
        const id = req.params.id;

        await deleteInventoryItemDB(id, tenantId);

        return res.status(200).json({
            success: true,
            message: "Inventory Item Deleted."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try later!"
        });
    }
};

exports.getAllInventoryItems = async (req, res) => {
    try {
        const tenantId = req.user.tenant_id;
        const InventoryItems = await getAllInventoryItemsDB(tenantId);

        return res.status(200).json(InventoryItems);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try later!"
        });
    }
};

exports.getInventoryItem = async (req, res) => {
    try {
        const tenantId = req.user.tenant_id;
        const id = req.params.id;

        const InventoryItem = await getInventoryItemDB(id, tenantId);
        return res.status(200).json(InventoryItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try later!"
        });
    }
};