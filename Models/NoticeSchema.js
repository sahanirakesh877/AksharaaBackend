const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema(
  {
    images: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const noticeModel = mongoose.model("Notice", NoticeSchema);
module.exports = noticeModel;
