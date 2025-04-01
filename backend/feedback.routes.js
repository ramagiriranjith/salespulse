const { Router } = require("express");

const {
    isLoggedIn,
    isAuthenticated,
    authorize,
    isSubscriptionActive,
} = require("../middlewares/auth.middleware");
const { SCOPES } = require("../config/user.config");
const {
    addFeedback,
    deleteFeedback,
    getAllCustomerFeedbacks,
    getCustomerFeedback,
} = require("../controllers/feedback.controller");

const router = Router();

router.post(
    "/add",
    isLoggedIn,
    isAuthenticated,
    isSubscriptionActive,
    authorize([SCOPES.FEEDBACK]),
    addFeedback
);
router.delete(
    "/delete/:id",
    isLoggedIn,
    isAuthenticated,
    isSubscriptionActive,
    authorize([SCOPES.FEEDBACK]),
    deleteFeedback
);
router.get(
    "/",
    isLoggedIn,
    isAuthenticated,
    isSubscriptionActive,
    authorize([SCOPES.FEEDBACK]),
    getAllCustomerFeedbacks
);
router.get(
    "/:id",
    isLoggedIn,
    isAuthenticated,
    isSubscriptionActive,
    authorize([SCOPES.FEEDBACK]),
    getCustomerFeedback
);

module.exports = router;
