const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentAge: {
    type: Number,
    required: true,
  },
  studentGender: {
    type: String,
    required: true,
  },
  studentGrade: {
    type: String,
    required: true,
  },
  parentName: {
    type: String,
    required: true,
  },
  parentEmail: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  parentAddress: {
    type: String,
    required: true,
  },
  transportation: {
    type: Boolean,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
});

const enquiryModel = mongoose.model("Enquiry", enquirySchema);
module.exports = enquiryModel;
