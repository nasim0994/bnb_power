const fs = require("fs");
const AboutUs = require("../models/whoweareModel");

exports.add = async (req, res) => {
  const image = req?.file?.filename;
  const data = req?.body;

  const aboutUs = {
    ...data,
    image: `/aboutus/${image}`,
  };

  try {
    if (!image) {
      return res.json({
        success: false,
        message: "Image is required",
      });
    }

    const isExist = await AboutUs.findOne();

    if (isExist?._id) {
      return res.json({
        success: false,
        message: "About Us already added",
      });
    }

    const result = await AboutUs.create(aboutUs);

    res.status(201).json({
      success: true,
      message: "About Us created successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });

    fs.unlink(`./uploads/aboutus/${image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await AboutUs.findOne();

    res.status(200).json({
      success: true,
      message: "About Us fetched successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req?.params?.id;
  const image = req?.file?.filename;
  const data = req?.body;

  try {
    const isExist = await AboutUs.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "About Us not found",
      });
    }

    let newData;

    if (image) {
      fs.unlink(`./uploads/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      newData = {
        ...data,
        image: `/aboutus/${image}`,
      };
    } else {
      newData = { ...data };
    }

    const result = await AboutUs.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.json({
        success: false,
        message: "About Us not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "About Us updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    fs.unlink(`./uploads/aboutus/${image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};
