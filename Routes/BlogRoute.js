const express = require("express");
const router = express.Router();

const blogcontroller = require("../Controllers/BlogController");

router.route("/createblog").post(blogcontroller.createBlog);
router.route("/getallblogs").get(blogcontroller.getAllBlogs);
router.route("/getblog/:id").get(blogcontroller.getBlogById);
router.route("/updateblog/:id").put(blogcontroller.updateBlogById);
router.route("/deleteblog/:id").delete(blogcontroller.deleteBlogById);
router.route("/deleteallblogs").delete(blogcontroller.deleteAllBlogs);

module.exports = router;
