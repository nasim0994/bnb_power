const bcrypt = require("bcrypt");
const { createJsonWebToken } = require("../utils/jsonWebToken");
const Administrator = require("../models/adminModal");

exports.add = async (req, res) => {
  const data = req?.body;

  try {
    const result = await Administrator.create(data);

    if (!result) {
      return res.json({
        success: false,
        message: "Administrator not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Administrator added successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const data = req?.body;
  try {
    const { email, password } = data;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const admin = await Administrator.findOne({ email: email });

    if (!admin) {
      return res.json({
        success: false,
        message: "You are not authorized!",
      });
    }

    const isMatch = await bcrypt.compare(password, admin?.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    let accessToken = createJsonWebToken({ email, password }, "24h");

    res.status(200).json({
      success: true,
      message: "You are logged in successfully",
      token: accessToken,
      data: admin,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const result = await Administrator.findByIdAndDelete(req?.params?.id);

    if (!result) {
      return res.json({
        success: false,
        message: "Administrator not deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Administrator deleted successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await Administrator.find({});

    if (!result) {
      return res.json({
        success: false,
        message: "Administrators not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All administrators",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await Administrator.findOne({
      email: req.user.email,
    });

    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.json({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateInfo = async (req, res) => {
  try {
    const result = await Administrator.findByIdAndUpdate(
      req?.params?.id,
      req?.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!result) {
      return res.json({
        success: false,
        message: "updated failed",
      });
    }

    res.status(200).json({
      success: true,
      message: "updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req?.body;

    const admin = await Administrator.findById(req?.params?.id);

    if (!admin) {
      return res.json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin?.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Your password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    console.log(hashedPassword);

    const result = await Administrator.findByIdAndUpdate(
      req?.params?.id,
      { password: hashedPassword },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.json({
        success: false,
        message: "Password not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// delete account
exports.deleteAccount = async (req, res) => {
  try {
    const { password } = req?.body;

    const admins = await Administrator.find({});
    const admin = await Administrator.findById(req?.params?.id);

    if (!admin) {
      return res.json({
        success: false,
        message: "Admin not found",
      });
    }

    if (admins?.length >= 1) {
      return res.json({
        success: false,
        message: "You can't delete the last admin",
      });
    }

    const isMatch = await bcrypt.compare(password, admin?.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Your password is incorrect",
      });
    }

    const result = await Administrator.findByIdAndDelete(req?.params?.id);

    if (!result) {
      return res.json({
        success: false,
        message: "Account not deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
