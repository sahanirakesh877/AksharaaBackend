const express = require("express");
const router = express.Router();

const gallerycontroller = require("../Controllers/GalleryController");

router.route("/createimage").post(gallerycontroller.createGallery);
router.route("/getallimages").get(gallerycontroller.getAllGalleries);
router.route("/getimage/:id").get(gallerycontroller.getGalleryById);
router.route("/deleteimage/:id").delete(gallerycontroller.deleteGalleryById);
router.route("/deleteallimages").delete(gallerycontroller.deleteAllImage);

module.exports = router;
