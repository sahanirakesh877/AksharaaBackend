const express = require("express");
const router = express.Router();

const noticeController = require("../Controllers/NoticeController");
const upload = require("../multerconfig/Storageconfig");

router
  .route("/createnotice")
  .post(
    upload.noticesUpload.single("Noticeimage"),
    noticeController.createNotice
  );
router.route("/getallnotice").get(noticeController.getNotices);
router.route("/deletenotice/:id").delete(noticeController.deleteNotice);

router.route("/contact").post(noticeController.contactHandler);

module.exports = router;
