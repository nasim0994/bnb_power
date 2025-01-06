const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema(
  {
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
    },
  },
  { timestamps: true }
);

const Blogs = mongoose.model("Blogs", blogsSchema);

module.exports = Blogs;
