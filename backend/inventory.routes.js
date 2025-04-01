const { Router } = require("express");

const {
    isLoggedIn,
    isAuthenticated,
    authorize,
    isSubscriptionActive,
} = require("../middlewares/auth.middleware");
const { SCOPES } = require("../config/user.config");
const {
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    getAllInventoryItems,
    getInventoryItem,
    uploadInventoryItemPhoto,
    removeInventoryItemPhoto,
} = require("../controllers/inventory.controller");

const router = Router();

router.post(
    "/add",
    isLoggedIn,
    isAuthenticated,
    isSubscriptionActive,
    authorize([SCOPES.SETTINGS]),
    addInventoryItem
);
router.post(
    "/update/:id",
    isLoggedIn,
    isAuthenticated,
    isSubscriptionActive,
    authorize([SCOPES.SETTINGS]),
    updateInventoryItem
);
router.post(
    "/update/:id/upload-photo",
    isLoggedIn,
    isAuthenticated,
    authorize([SCOPES.SETTINGS]),
    uploadInventoryItemPhoto
);
router.post(
    "/update/:id/remove-photo",
    isLoggedIn,
    isAuthenticated,
    authorize([SCOPES.SETTINGS]),
    removeInventoryItemPhoto
);
router.delete(
    "/delete/:id",
    isLoggedIn,
    isAuthenticated,
    isSubscriptionActive,
    authorize([SCOPES.SETTINGS]),
    deleteInventoryItem
);
router.get(
    "/",
    isLoggedIn,
    isAuthenticated,
    isSubscriptionActive,
    authorize([SCOPES.SETTINGS]),
    getAllInventoryItems
);
router.get(
    "/:id",
    isLoggedIn,
    isAuthenticated,
    isSubscriptionActive,
    authorize([SCOPES.SETTINGS]),
    getInventoryItem
);

module.exports = router;
