const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
