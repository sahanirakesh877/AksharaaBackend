const asyncHandler = require("express-async-handler");
const Blog = require("../Models/BlogSchema");

// create Blogs
const createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (req.file) {
      if (
        title?.trim() === "" ||
        description?.trim() === "" ||
        category?.trim() === ""
      ) {
        return res.status(400).json({
          error:
            "All fields (title, description, image, category) are required",
        });
      }
      const image = req.file.path;
      const newBlog = new Blog({
        title,
        description,
        image,
        category,
      });
      const savedBlog = await newBlog.save();
      res.status(201).json({
        success: true,
        message: "Blog Created successfully",
        savedBlog,
      });
    } else {
      return res.status(400).json({ error: "Image is required" });
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get all  Blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    // Count the total number of blogs
    const TotalblogsLength = await Blog.countDocuments();
    if (!blogs) {
      return res.status(404).json({ message: "Blogs not found" });
    }
    res.status(200).json({
      message: "All blogs retrieved successfully",
      TotalblogsLength,
      blogs,
    });
  } catch (error) {
    console.error("Error getting all  blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get single  Blogs
const getBlogById = asyncHandler(async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(404).json({ error: "Blog id not found" });
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      res.status(404).json({ error: "Single Blog not found" });
    } else {
      res.status(200).json({
        message: "Single blogs found Successfully",
        blog,
      });
    }
  } catch (error) {
    console.error("Error in getting single blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// edit Blogs by id
const updateBlogById = asyncHandler(async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(404).json({ error: "Blog id not found" });
    }

    const { title, description, image, category } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, description, image, category },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      res.status(404).json({ error: "Blog not found" });
    } else {
      res.status(200).json({
        message: "blog updated successfully",
        updatedBlog,
      });
    }
  } catch (error) {
    console.error("Error in update blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete single Blogs
const deleteBlogById = asyncHandler(async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(404).json({ error: "Blog id not found" });
    }

    const deleteBlog = await Blog.findByIdAndDelete(blogId);
    return res.status(200).json({
      message: " Single Blog deleted successfully",
      deleteBlog,
    });
  } catch (error) {
    console.error("Error in delete single blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete all  Blogs
const deleteAllBlogs = asyncHandler(async (req, res) => {
  try {
    const deleteBlogs = await Blog.deleteMany();
    return res.status(200).json({
      message: "All Blogs deleted successfully",
      TotalRemainingBlogscount: deleteBlogs.deletedCount,
    });
  } catch (error) {
    console.error("Error in delete blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteAllBlogs,
  deleteBlogById,
};
