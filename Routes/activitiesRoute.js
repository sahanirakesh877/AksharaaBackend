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
router.route("/").get(activitiesController.getAllActivities);
router.route("/:id").get(activitiesController.getActivityById);
router.route("/:id").put(activitiesController.updateActivityById);
router.route("/:id").delete(activitiesController.deleteActivityById);
router
  .route("/deleteallblogs")
  .delete(activitiesController.deleteAllActivities);

module.exports = router;
