const express = require("express");
const router = express.Router();
const { checkIsUserAuthenticated } = require("../middleware/AuthMiddleware");

const enquiryController = require("../Controllers/enquiryController");

router.route("/").post(enquiryController.postEnquiry);

router.route("/").get(enquiryController.getEnquiry);

module.exports = router;
