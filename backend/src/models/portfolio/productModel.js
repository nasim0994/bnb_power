const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  image: {
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
  mothercompany: {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Portfolio",
  },
  classCategory: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "ClassCategory",
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Class",
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
