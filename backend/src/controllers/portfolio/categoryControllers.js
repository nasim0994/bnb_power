const Model = require("../../models/portfolio/classCategoryModel");
const Portfolio = require("../../models/portfolio/portfolioModel");

exports.add = async (req, res) => {
  const data = req?.body;

  try {
    const portfolio = await Portfolio.findById(data?.portfolio);

    if (!portfolio) {
      return res.json({ success: false, message: "Portfolio not found" });
    }

    const newData = {
      ...data,
      slug:
        data?.title?.toLowerCase().replace(/ /g, "-") + "-" + portfolio?.slug,
    };

    const result = await Model.create(newData);

    if (!result) {
      return res.json({
        success: false,
        message: "Failed to create",
      });
    }

    // Update the portfolio model
    portfolio.classCategory.push(result?._id);
    await portfolio.save();

    res.status(201).json({
      success: true,
      message: `${data?.title} created successfully`,
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
  const { portfolio } = req?.query;
  try {
    let query = {};

    if (portfolio && portfolio !== "undefined" && portfolio !== "null")
      query = { portfolio };

    const result = await Model.find(query)
      .sort({ order: 1 })
      .populate("portfolio class");

    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
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
  const id = req?.params?.id;

  try {
    const result = await Model.findById(id).populate("portfolio class");

    if (!result) {
      return res.json({
        success: false,
        message: "category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "category fetched successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.getBySlug = async (req, res) => {
  const slug = req?.params?.slug;

  try {
    const result = await Model.findOne({ slug: slug }).popolate(
      "portfolio class"
    );

    if (!result) {
      return res.json({
        success: false,
        message: "category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "category fetched successfully",
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
  const portfolio = data?.portfolio;

  try {
    const portfolioInfo = await Portfolio.findById(portfolio);

    if (!portfolioInfo) {
      return res.json({
        success: false,
        message: "Portfolio not found",
      });
    }

    const slug =
      data?.title?.toLowerCase().replace(/ /g, "-") + "-" + portfolioInfo?.slug;
    const newData = {
      ...data,
      slug,
    };

    const isExit = await Model.findById(id);

    if (!isExit) {
      return res.json({
        success: false,
        message: "Category not found",
      });
    }

    const result = await Model.findByIdAndUpdate(id, newData);

    if (!result) {
      return res.json({
        success: false,
        message: "Failed to update",
      });
    }

    // check if the portfolio is changed or not
    if (portfolio !== isExit?.portfolio) {
      const oldPortfolio = await Portfolio.findById(isExit?.portfolio);
      oldPortfolio.classCategory.pull(id);
      await oldPortfolio.save();

      const newPortfolio = await Portfolio.findById(portfolio);
      newPortfolio.classCategory.push(id);
      await newPortfolio.save();
    }

    res.status(200).json({
      success: true,
      message: `${data?.title} updated successfully`,
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req?.params?.id;

  try {
    const isExit = await Model.findById(id);

    if (!isExit) {
      return res.json({
        success: false,
        message: "Category not found",
      });
    }

    if (isExit?.class?.length > 0) {
      return res.json({
        success: false,
        message: "Category has classes!. Please delete class first.",
      });
    }

    const result = await Model.findByIdAndDelete(id);

    if (!result) {
      return res.json({
        success: false,
        message: "Failed to delete",
      });
    }

    const portfolio = await Portfolio.findById(isExit?.portfolio);

    portfolio.classCategory.pull(id);
    await portfolio.save();

    res.status(200).json({
      success: true,
      message: `Category deleted successfully`,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
