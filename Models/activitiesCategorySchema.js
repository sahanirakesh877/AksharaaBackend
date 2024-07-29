const mongoose = require("mongoose");

const activitiesCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
});

const categoryModel = mongoose.model(
  "activitiesCategory",
  activitiesCategorySchema
);
module.exports = categoryModel;
