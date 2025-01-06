const mongoose = require("mongoose");

const whoweareSchema = new mongoose.Schema({
  image: {
    type: String,
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

const WhoWeAre = mongoose.model("WhoWeAre", whoweareSchema);

module.exports = WhoWeAre;
