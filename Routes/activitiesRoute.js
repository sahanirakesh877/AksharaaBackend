const express = require("express");
const router = express.Router();

const activitiesController = require("../Controllers/activityController");
const upload = require("../multerconfig/Storageconfig");

router
  .route("/")
  .post(
    upload.activityUpload.single("activityImage"),
    activitiesController.createActivity
  );
router
  .route("/:id/reupload")
  .post(
    upload.activityUpload.single("activityImage"),
    activitiesController.reuploadImage
  );
router.route("/:id").get(activitiesController.getActivityById);
router.route("/:id").put(activitiesController.updateActivityById);
router.route("/:id").delete(activitiesController.deleteActivityById);
router
  .route("/deleteallblogs")
  .delete(activitiesController.deleteAllActivities);
router.route("/").get(activitiesController.getAllActivities);

module.exports = router;
