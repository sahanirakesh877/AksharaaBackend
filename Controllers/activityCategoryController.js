const asyncHandler = require("express-async-handler");
const Category = require("../Models/activitiesCategorySchema");

// Create Category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const category = new Category({
      title: req.body.title,
    });

    await category.save();
    const categories = await Category.find({});
    res.json({
      success: true,
      message: "Category Added",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
  console.log(req.body);
});

// get categories
const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({
      success: true,
      message: "Fetched Categories",
      categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { createCategory, getCategories };
