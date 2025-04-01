const path = require("path")
const fs = require("fs");
const { deleteCustomerFeedBackDB, getAllCustomerFeedbacksDB, getCustomerFeedbackDB, addCustomerReviewDB } = require("../services/feedback.service");

exports.addFeedback = async (req, res) => {
    try {
        const tenantId = req.user.tenant_id;
        const { review, rating, customer_name } = req.body;

        var review_result = '';
        if (!(review && rating && customer_name)) {
            return res.status(400).json({
                success: false,
                message: "Please provide required details: review, rating, customer_name"
            });
        }
        if (rating > 3) {
            review_result = 'POSITIVE';
        } else if (rating <= 2) {
            review_result = 'NEGATIVE';
        } else {
            review_result = 'NEUTRAL';
        }

        const feedbackId = await addCustomerReviewDB(review, rating, customer_name, review_result, tenantId);

        return res.status(200).json({
            success: true,
            message: "Feedback submitted successfully.",
            feedbackId
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try later!"
        });
    }
};

exports.deleteFeedback = async (req, res) => {
    try {
        const tenantId = req.user.tenant_id;
        const id = req.params.id;

        await deleteCustomerFeedBackDB(id, tenantId);

        return res.status(200).json({
            success: true,
            message: "Feedback Deleted."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try later!"
        });
    }
};

exports.getAllCustomerFeedbacks = async (req, res) => {
    try {
        const tenantId = req.user.tenant_id;
        const feedbacks = await getAllCustomerFeedbacksDB(tenantId);

        return res.status(200).json(feedbacks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try later!"
        });
    }
};

exports.getCustomerFeedback = async (req, res) => {
    try {
        const tenantId = req.user.tenant_id;
        const id = req.params.id;

        const customerFeedback = await getCustomerFeedbackDB(id, tenantId);
        return res.status(200).json(customerFeedback);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try later!"
        });
    }
};