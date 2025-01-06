const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema({
  icon: {
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

const Feature = mongoose.model("Feature", FeatureSchema);

module.exports = Feature;
