const express = require("express");
const router = express.Router();
const { checkIsUserAuthenticated } = require("../middleware/AuthMiddleware");

const categoryController = require("../Controllers/activityCategoryController");

router.route("/").post(categoryController.createCategory);

router.route("/").get(categoryController.getCategories);

module.exports = router;
