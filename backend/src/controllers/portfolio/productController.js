const Model = require("../../models/portfolio/productModel");
const fs = require("fs");
const Portfolio = require("../../models/portfolio/portfolioModel");
const Category = require("../../models/portfolio/classCategoryModel");
const Class = require("../../models/portfolio/classModel");

exports.add = async (req, res) => {
  const file = req?.file?.filename;
  const data = JSON.parse(req.body.data);

  try {
    const result = await Model.create({ ...data, image: `/product/${file}` });

    if (!result) {
      return res.json({
        success: false,
        message: "Something went wrong",
      });
    }

    res.status(201).json({
      success: true,
      message: "Product add success",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/product/${file}`, (err) => {
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
  const { portfolio, category, cls } = req.query;

  try {
    const targetedPortfolio = await Portfolio.findOne({ slug: portfolio });
    const targetedCategory = await Category.findOne({ slug: category });
    const targetedClass = await Class.findOne({ slug: cls });

    const targetedPortfolioId = targetedPortfolio?._id;
    const targetedCategoryId = targetedCategory?._id;
    const targetedClassId = targetedClass?._id;

    let query = {};
    if (targetedPortfolioId) query.portfolio = targetedPortfolioId;
    if (targetedCategoryId) query.classCategory = targetedCategoryId;
    if (targetedClassId) query.class = targetedClassId;

    const result = await Model.find(query).populate(
      "portfolio classCategory class",
      "title slug mcl"
    );

    res.status(200).json({
      success: true,
      message: "Products get success",
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
    const result = await Model.findById(id).populate(
      "portfolio classCategory class",
      "title slug"
    );

    res.status(200).json({
      success: true,
      message: "Product get success",
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
  const id = req?.params?.id;
  const data = JSON.parse(req.body.data);

  try {
    const isExist = await Model.findById(id);
    if (!isExist) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    const newData = {
      ...data,
      image: file ? `/product/${file}` : isExist?.image,
    };

    const result = await Model.findByIdAndUpdate(id, newData, { new: true });

    res.status(200).json({
      success: true,
      message: "Products updated success",
    });

    if (result && file) {
      fs.unlink(`./uploads/product/${isExist?.image}`, (err) => {
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

    fs.unlink(`./uploads/product/${file}`, (err) => {
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
        message: "Product not found",
      });
    }

    if (isExist) {
      const result = await Model.findByIdAndDelete(id);

      if (result) {
        fs.unlink(`./uploads/${isExist?.image}`, (err) => {
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
