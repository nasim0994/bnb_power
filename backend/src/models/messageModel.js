const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      require: true,
    },
    subject: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  { timestamps: false }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
