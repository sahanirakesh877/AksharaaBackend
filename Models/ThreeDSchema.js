const mongoose = require("mongoose");

const ThreeDSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const ThreegalleryModel = mongoose.model("gallerythree", ThreeDSchema);
module.exports = ThreegalleryModel;
