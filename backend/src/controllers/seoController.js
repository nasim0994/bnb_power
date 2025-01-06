const SEO = require("../models/seoModel");

exports.add = async (req, res) => {
  const data = req?.body;

  try {
    const isExited = await SEO.findOne();
    if (isExited?._id) {
      return res.json({
        success: false,
        message: "SEO already added",
      });
    }

    const result = await SEO.create(data);

    res.status(200).json({
      success: true,
      message: "SEO Setting created success",
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
    const result = await SEO.findOne({});

    if (!result) {
      return res.json({
        success: false,
        message: "SEO Setting not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "SEO Setting get success",
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
    const isExist = await SEO.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "SEO Setting not found",
      });
    }

    const result = await SEO.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.json({
        success: false,
        message: "SEO Setting not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "SEO Setting updated success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
