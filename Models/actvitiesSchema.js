const mongoose = require("mongoose");

const activitiesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "enter title"],
    },
    description: {
      type: String,
      required: [true, "enter description"],
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Activities", blogSchema);
module.exports = blogModel;
