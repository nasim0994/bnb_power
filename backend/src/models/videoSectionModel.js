const mongoose = require("mongoose");

const VideoSectionSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const VideoSection = mongoose.model("VideoSection", VideoSectionSchema);

module.exports = VideoSection;
