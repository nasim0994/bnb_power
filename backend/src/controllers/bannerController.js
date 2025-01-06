const Model = require("../models/bannerModel");
const fs = require("fs");

exports.add = async (req, res) => {
  const file = req?.file?.filename;
  const filePath = `/banners/${file}`;

  try {
    const data = req?.body;

    const result = await Model.create({ ...data, bgImage: filePath });

    if (!result) {
      return res.json({
        success: false,
        message: "Something went wrong",
      });
    }

    res.status(201).json({
      success: true,
      message: "Banner add success",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/banners/${file}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await Model.find({});

    res.status(200).json({
      success: true,
      message: "Features get success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await Model.findById(id);
    if (!result) {
      return res.json({
        success: false,
        message: "Feature not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feature get success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req?.params?.id;
  const file = req?.file?.filename;
  const data = req.body;

  console.log(req.body);

  try {
    const isExist = await Model.findById(id);
    if (!isExist) {
      return res.json({
        success: false,
        message: "Banner not found",
      });
    }

    const newData = {
      ...data,
      bgImage: file ? `/banners/${file}` : isExist?.bgImage,
    };

    const result = await Model.findByIdAndUpdate(id, newData, { new: true });

    res.status(200).json({
      success: true,
      message: "Banner updated success",
    });

    if (result && file) {
      fs.unlink(`./uploads/banners/${isExist?.bgImage}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });

    fs.unlink(`./uploads/banners/${file}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const id = req?.params?.id;
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Feature not found",
      });
    }

    if (isExist) {
      const result = await Model.findByIdAndDelete(id);

      if (result) {
        fs.unlink(`./uploads/${isExist?.bgImage}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }

      res.status(200).json({
        success: true,
        message: "Delete success",
        data: result,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });
  }
};
