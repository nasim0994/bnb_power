const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    bgImage: {
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
  },
  { timestamps: false }
);

const Banner = mongoose.model("Banner", BannerSchema);

module.exports = Banner;
