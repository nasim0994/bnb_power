const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModal");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.json({
        success: false,
        message: "You are not logged in",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await Admin.findOne({ email: decoded.email });

    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }

    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
