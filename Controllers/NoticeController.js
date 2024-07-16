const Notice = require("../Models/NoticeSchema");
const asyncHandler = require("express-async-handler");

// Create a new notice
const createNotice = asyncHandler(async (req, res) => {
  try {
  
    // const { images } = req.body;
    const image = req.files.map((file) => file.path);
    const newNotice = new Notice({ image });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get all notices
const getNotices = asyncHandler(async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete a notice
const deleteNotice = asyncHandler(async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    res.status(200).json({ message: "Notice deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { createNotice, getNotices, deleteNotice };
