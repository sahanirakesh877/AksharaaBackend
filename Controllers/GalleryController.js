const asyncHandler = require("express-async-handler");
const Gallery = require("../Models/GallerySchema");

// create Blogs
const createGallery = asyncHandler(async (req, res) => {
  try {
    const { images } = req.body;
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res
        .status(400)
        .json({ error: "Images array is required and cannot be empty" });
    }
    const newGallery = new Gallery({
      images,
    });
    const savedGallery = await newGallery.save();
    res.status(201).json({
      message: "Blog Created successfully",
      savedGallery,
    });
  } catch (error) {
    console.error("Error creating gallery:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get all  Blogs
const getAllGalleries = asyncHandler(async (req, res) => {
  try {
    const galleries = await Gallery.find();
    // Count the total number of blogs
    const TotalImageLength = await Gallery.countDocuments();
    if (!galleries) {
      return res.status(404).json({ message: "Images not found" });
    }
    res.status(200).json({
      message: "All Image retrieved successfully",
      TotalImageLength,
      galleries,
    });
  } catch (error) {
    console.error("Error getting all  blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get single  Blogs
const getGalleryById = asyncHandler(async (req, res) => {
  try {
    const galleryId = req.params.id;
    if (!galleryId) {
      return res.status(404).json({ error: "image ID is required" });
    }
    const gallery = await Gallery.findById(galleryId);
    if (!gallery) {
      res.status(404).json({ error: "Single image not found" });
    } else {
      res.status(200).json({
        message: "Single image found Successfully",
        gallery,
      });
    }
  } catch (error) {
    console.error("Error in getting single image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete single Blogs
const deleteGalleryById = asyncHandler(async (req, res) => {
  try {
    const galleryId = req.params.id;
    if (!galleryId) {
      return res.status(404).json({ error: "image ID is required" });
    }

    const deletedGallery = await Gallery.findByIdAndDelete(galleryId);
    return res.status(200).json({
      message: " Single image deleted successfully",
      Gallery: deletedGallery,
    });
  } catch (error) {
    console.error("Error in delete single image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete all  Blogs
const deleteAllImage = asyncHandler(async (req, res) => {
  try {
    const deleteGallery = await Gallery.deleteMany();
    return res.status(200).json({
      message: "All images deleted successfully",
      TotalImagecount: deleteGallery.deletedCount,
    });
  } catch (error) {
    console.error("Error in delete blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  createGallery,
  getAllGalleries,
  getGalleryById,
  deleteAllImage,
  deleteGalleryById,
};
