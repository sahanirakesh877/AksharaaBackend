const express = require("express");
const router = express.Router();

const ThreeDController = require("../Controllers/ThreeDGalleryController");
const upload = require("../multerconfig/Storageconfig");

router
  .route("/createthreed")
  .post(upload.ThreeDGalleryUpload.single("ThreeDimage"),ThreeDController.createThreeDPhoto);

router.route("/getallthreedimg").get(ThreeDController.getAllThreeDImage);
router.route("/deletethreedimg/:id").delete(ThreeDController.deleteThreeD);

module.exports = router;

