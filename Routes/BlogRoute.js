const express = require("express");
const router = express.Router();

const blogcontroller = require("../Controllers/BlogController");
const upload = require("../multerconfig/Storageconfig");

router
  .route("/createblog")
  .post(upload.blogUpload.single("Blogimage"), blogcontroller.createBlog);

router
  .route("/:id/reupload")
  .post(
    upload.activityUpload.single("activityImage"),
    blogcontroller.reuploadImage
  );

router.route("/").get(blogcontroller.getAllBlogs);
router.route("/:id").get(blogcontroller.getBlogById);
router.route("/:id").put(blogcontroller.updateBlogById);
router.route("/:id").delete(blogcontroller.deleteBlogById);
router.route("/deleteallblogs").delete(blogcontroller.deleteAllBlogs);

module.exports = router;
