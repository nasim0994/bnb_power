const mongoose = require("mongoose");

const DirectorSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Director = mongoose.model("Director", DirectorSchema);

module.exports = Director;
