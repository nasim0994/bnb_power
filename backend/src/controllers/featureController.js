const Model = require("../models/featureModel");
const fs = require("fs");

exports.add = async (req, res) => {
  const file = req?.file?.filename;

  try {
    const data = req?.body;

    const result = await Model.create({ ...data, icon: `/features/${file}` });

    if (!result) {
      return res.json({
        success: false,
        message: "Something went wrong",
      });
    }

    res.status(201).json({
      success: true,
      message: "Feature add success",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/features/${file}`, (err) => {
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
  const file = req?.file?.filename;

  try {
    const id = req?.params?.id;
    const isExist = await Model.findById(id);
    if (!isExist) {
      return res.json({
        success: false,
        message: "Feature not found",
      });
    }

    const data = req.body;

    if (file) {
      fs.unlink(`./uploads/${isExist?.icon}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      await Model.findByIdAndUpdate(
        id,
        { ...data, icon: `/features/${file}` },
        {
          new: true,
        }
      );
    } else {
      await Model.findByIdAndUpdate(
        id,
        { ...data, icon: isExist?.icon },
        {
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Features updated success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });

    fs.unlink(`./uploads/features/${file}`, (err) => {
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
        fs.unlink(`./uploads/${isExist?.icon}`, (err) => {
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
