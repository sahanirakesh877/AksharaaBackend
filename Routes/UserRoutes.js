const express = require("express");
const router = express.Router();
const { checkIsUserAuthenticated} = require("../middleware/AuthMiddleware");

const usercontroller = require("../Controllers/user-controller");


router.route("/register").post(usercontroller.register);
router.route("/login").post(usercontroller.login);
router.route("/logout").get(usercontroller.logout);
router.route("/changepassword").post(usercontroller.changePassword);
router.route("/forgetpassword").post(usercontroller.forgetpassword);
router.route("/resetpassword/:id/:resetToken").post(usercontroller.resetPassword);



module.exports = router;
