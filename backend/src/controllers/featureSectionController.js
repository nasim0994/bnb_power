const Model = require("../models/featureSectionModel");

exports.add = async (req, res) => {
  const data = req?.body;

  try {
    const isExited = await Model.findOne({});
    if (isExited?._id) {
      return res.json({
        success: false,
        message: "Feature Section already added",
      });
    }

    const result = await Model.create(data);

    res.status(200).json({
      success: true,
      message: "Feature Section add success",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Model.findOne();

    res.status(200).json({
      success: true,
      message: "Feature Section get success",
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
  const data = req?.body;

  try {
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Feature Section not found",
      });
    }

    const result = await Model.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.json({
        success: false,
        message: "Feature Section not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feature Section updated success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
