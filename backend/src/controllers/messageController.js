const Model = require("../models/messageModel");
const { calculatePagination } = require("../utils/calculatePagination");
const { pick } = require("../utils/pick");

exports.add = async (req, res) => {
  const data = req?.body;

  try {
    const result = await Model.create(data);

    res.status(200).json({
      success: true,
      message: "message add success",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAll = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const result = await Model.find({}).skip(skip).limit(limit);

    if (!result) {
      return res.json({
        success: false,
        message: "message not found",
      });
    }

    const total = await Model.countDocuments({});
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      success: true,
      message: "message get success",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
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
        message: "message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "message get success",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const result = await Model.findByIdAndDelete(req?.params?.id);

    if (!result) {
      return res.json({
        success: false,
        message: "message not deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "message deleted successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
