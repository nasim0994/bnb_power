const fs = require("fs");
const Logo = require("../models/logoModel");

exports.add = async (req, res) => {
  const logo = req?.file?.filename;

  try {
    if (!logo) {
      return res.json({
        success: false,
        message: "Logo is required",
      });
    }

    const isExist = await Logo.findOne();

    if (isExist?._id) {
      return res.json({
        success: false,
        message: "Logo already added",
      });
    }

    const result = await Logo.create({ logo: `/logo/${logo}` });

    res.status(200).json({
      success: true,
      message: "Logo added successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    fs.unlink(`./uploads/logo/${logo}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

exports.get = async (req, res) => {
  try {
    const logo = await Logo.findOne();

    if (!logo) {
      return res.json({
        success: false,
        message: "Logo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Logo found successfully",
      data: logo,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const logo = req?.file?.filename;

  try {
    if (!logo) {
      return res.json({
        success: false,
        message: "Logo is required",
      });
    }

    const id = req?.params?.id;
    const isLogo = await Logo.findOne({ _id: id });

    if (isLogo) {
      await Logo.findByIdAndUpdate(
        id,
        { logo: `/logo/${logo}` },
        { new: true }
      );

      fs.unlink(`./uploads/${isLogo?.logo}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      res.status(200).json({
        success: true,
        message: "Logo updated successfully",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    fs.unlink(`./uploads/logo/${logo}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};
