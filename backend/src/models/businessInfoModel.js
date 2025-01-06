const mongoose = require("mongoose");

const businessInfoSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
    },
    businessStartYear: {
      type: Number,
    },
    businessType: {
      type: String,
    },
    tagline: {
      type: String,
    },
  },
  { timestamps: false }
);

const BusinessInfo = mongoose.model("BusinessInfo", businessInfoSchema);

module.exports = BusinessInfo;
