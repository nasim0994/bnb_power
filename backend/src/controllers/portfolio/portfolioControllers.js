const Model = require("../../models/portfolio/portfolioModel");

exports.add = async (req, res) => {
  const data = req?.body;
  const newData = {
    ...data,
    slug: data?.title?.toLowerCase().replace(/ /g, "-"),
  };

  try {
    const result = await Model.create(newData);

    if (!result) {
      return res.json({
        success: false,
        message: "Failed to create",
      });
    }

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
  try {
    const result = await Model.find({})
      .sort({ order: 1 })
      .populate({
        path: "classCategory",
        select: "title slug",
        populate: {
          path: "class",
        },
      });

    res.status(200).json({
      success: true,
      message: "Portfolio fetched successfully",
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
    const result = await Model.findById(id).populate("classCategory");

    if (!result) {
      return res.json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio fetched successfully",
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
    const result = await Model.findOne({ slug }).populate({
      path: "classCategory",
      select: "title slug",
      populate: {
        path: "class",
        select: "title slug order",
      },
    });

    if (!result) {
      return res.json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio fetched successfully",
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
  const slug = data?.title?.toLowerCase().replace(/ /g, "-");
  const newData = {
    ...data,
    slug,
  };

  try {
    const isExit = await Model.findById(id);

    if (!isExit) {
      return res.json({
        success: false,
        message: "Portfolio not found",
      });
    }

    const result = await Model.findByIdAndUpdate(id, newData, { new: true });
    if (!result) {
      return res.json({
        success: false,
        message: "Failed to update",
      });
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
        message: "Portfolio not found",
      });
    }

    if (isExit?.classCategory?.length > 0) {
      return res.json({
        success: false,
        message: "Portfolio has class category!. Please delete category first.",
      });
    }

    const result = await Model.findByIdAndDelete(id);

    if (!result) {
      return res.json({
        success: false,
        message: "Failed to delete",
      });
    }

    res.status(200).json({
      success: true,
      message: `${title} deleted successfully`,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
