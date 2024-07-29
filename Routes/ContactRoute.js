const express = require("express");
const contactform = require("../Controllers/ContactController");
const router = express.Router();



router.route("/contact").post(contactform.contactData);

module.exports = router;