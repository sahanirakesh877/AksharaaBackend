const asyncHandler = require("express-async-handler");
const activity = require("../Models/actvitiesSchema");
const path = require("path");
const fs = require("fs");

// create activities
const createActivity = asyncHandler(async (req, res) => {
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
      const newActivity = new activity({
        title,
        description,
        image,
        category,
      });
      const savedActivity = await newActivity.save();
      setTimeout(() => {
        res.status(201).json({
          success: true,
          message: "activity Created successfully",
          savedActivity,
        });
      }, 5000);
    } else {
      return res.status(400).json({ error: "Image is required" });
    }
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ error });
  }
});

// get all  activities
const getAllActivities = asyncHandler(async (req, res) => {
  console.log("getting activities");
  try {
    const activities = await activity.find({});
    // Count the total number of activities
    const TotalactivitiesLength = await activity.countDocuments();
    if (!activities) {
      return res.status(404).json({ message: "activities not found" });
    }

    await Promise.all(
      activities.map((activity) => activity.populate("category"))
    );

    res.status(200).json({
      success: true,
      message: "All activities retrieved successfully",
      TotalactivitiesLength,
      activities,
    });
  } catch (error) {
    console.error("Error getting all  activity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get single  activity
const getActivityById = asyncHandler(async (req, res) => {
  try {
    const activityId = req.params.id;
    if (!activityId) {
      return res.status(404).json({ error: "activity id not found" });
    }
    const activityFound = await activity
      .findById(activityId)
      .populate("category");
    if (!activityFound) {
      res.status(404).json({ error: "Single activity not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "fetched activity",
        activity: activityFound,
      });
    }
  } catch (error) {
    console.error("Error in getting single activity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// edit activities by id
const updateActivityById = asyncHandler(async (req, res) => {
  try {
    const activityId = req.params.id;
    if (!activityId) {
      return res.status(404).json({ error: "activity id not found" });
    }

    const { title, description, selectedCategory } = req.body;

    const updatedActivity = await activity.findByIdAndUpdate(
      activityId,
      { title, description, category: selectedCategory },
      { new: true, runValidators: true }
    );

    if (!updatedActivity) {
      res.status(404).json({ error: "activity not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "activity updated successfully",
        updatedActivity,
      });
    }
  } catch (error) {
    console.error("Error in update activity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete single activities
const deleteActivityById = asyncHandler(async (req, res) => {
  try {
    const activityId = req.params.id;
    if (!activityId) {
      return res.status(404).json({ error: "activity id not found" });
    }

    const deleteActivity = await activity.findByIdAndDelete(activityId);

    const activities = await activity.find({});
    // Count the total number of activities
    const TotalactivitiesLength = await activity.countDocuments();

    await Promise.all(
      activities.map((activity) => activity.populate("category"))
    );

    if (deleteActivity) {
      const fileUrl = deleteActivity.image;
      const filePath = path.join(__dirname, "..", fileUrl);
      const normalizedPath = path.normalize(filePath);

      console.log(`Deleting file at path: ${normalizedPath}`);

      if (fs.existsSync(normalizedPath)) {
        fs.unlink(normalizedPath, async (err) => {
          if (err) {
            console.error(`Error deleting file: ${err.message}`);
            return res
              .status(500)
              .json({ message: "Error deleting file", error: err.message });
          }
          res.json({
            success: true,
            message: "activity Deleted",
            TotalactivitiesLength,
            activities,
          });
        });
      } else {
        res.json({
          status: true,
          message: "activity deleted without image.",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "activity not found",
      });
    }
  } catch (error) {
    console.error("Error in delete single activity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete all  activities
const deleteAllActivities = asyncHandler(async (req, res) => {
  try {
    const deleteActivities = await activity.deleteMany();
    return res.status(200).json({
      message: "All activities deleted successfully",
      TotalRemainingActivitiescount: deleteActivities.deletedCount,
    });
  } catch (error) {
    console.error("Error in delete activities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const reuploadImage = asyncHandler(async (req, res) => {
  try {
    const activityId = req.params.id;

    const activityFound = await activity.findById(activityId);

    if (!activityFound) {
      return res.status(404).json({ error: "activity not found" });
    }
    if (req.file) {
      const filePath = path.join(__dirname, "..", activityFound.image);
      const normalizedPath = path.normalize(filePath);

      console.log(`Deleting file at path: ${normalizedPath}`);

      if (fs.existsSync(normalizedPath)) {
        fs.unlink(normalizedPath, async (err) => {
          if (err) {
            console.error(`Error deleting file: ${err.message}`);
            return res
              .status(500)
              .json({ message: "Error deleting file", error: err.message });
          }
          console.log(req.file.path);
          activityFound.image = req.file.path;
          await activityFound.save();
          console.log("updated");

          res.json({
            success: true,
            message: "activity image updated",
          });
        });
      } else {
        console.log(req.file.path);
        activityFound.image = req.file.path;
        await activityFound.save();
        res.json({
          success: true,
          message: "activity deleted without image.",
        });
      }

      activityFound.image = req.file.path;
    } else {
      res.json({
        message: "file not uploaded",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivityById,
  deleteAllActivities,
  deleteActivityById,
  reuploadImage,
};
