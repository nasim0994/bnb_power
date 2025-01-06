const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    bgImage: {
      type: String,
      required: true,
    },
    count: {
      type: Array,
    },
  },
  { timestamps: false }
);

const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
