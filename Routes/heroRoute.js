const express = require("express");
const router = express.Router();

const heroController = require("../Controllers/HeroController");
const upload = require("../multerconfig/Storageconfig");

router
  .route("/herobanner")
  .post(upload.HeroUpload.single("Heroimage"), heroController.createHero);

router.route("/getallheroimg").get(heroController.getHero);
router.route("/deleteheroimg/:id").delete(heroController.deleteBanner);

module.exports = router;
