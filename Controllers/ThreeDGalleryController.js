const GalleryThreeD = require("../Models/ThreeDSchema");
const asyncHandler = require("express-async-handler");



// Create a new threeDimage
const createThreeDPhoto = asyncHandler(async (req, res) => {
  try {
  
    const image = req.file.path
    const threeDimage = new GalleryThreeD({ images: image });
    await threeDimage.save();
    res.status(201).json({
      success: true,
      message: "threeDimage created"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});



// Get all threeDimage
const getAllThreeDImage = asyncHandler(async (req, res) => {
  try {
    const gallery = await GalleryThreeD.find();
    res.status(200).json({success: true, gallery});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Delete a deleteThreeD
const deleteThreeD = asyncHandler(async (req, res) => {
  try {
    const gallery = await GalleryThreeD.findByIdAndDelete(req.params.id);
    if (!gallery) return res.status(404).json({ message: "ThreeDImage not found" });
    res.status(200).json({ success: true, message: "ThreeDImage deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = { createThreeDPhoto, getAllThreeDImage, deleteThreeD };
