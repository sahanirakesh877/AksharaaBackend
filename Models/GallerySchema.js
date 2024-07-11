const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
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

const galleryModel = mongoose.model("Gallery", gallerySchema);
module.exports = galleryModel;
