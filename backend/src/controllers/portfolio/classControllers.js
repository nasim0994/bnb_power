const Model = require("../../models/portfolio/classModel");
const Category = require("../../models/portfolio/classCategoryModel");

exports.add = async (req, res) => {
  const data = req?.body;

  try {
    const category = await Category.findById(data?.category);
    if (!category) {
      return res.json({
        success: false,
        message: "Category not found",
      });
    }

    const newData = {
      ...data,
      slug:
        data?.title?.toLowerCase().replace(/ /g, "-") + "-" + category?.slug,
    };

    const result = await Model.create(newData);

    if (!result) {
      return res.json({
        success: false,
        message: "Failed to create",
      });
    }

    // Update the Category model
    category.class.push(result?._id);
    await category.save();

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
  const { category } = req?.query;

  try {
    let query = {};
    if (category && category !== "undefined" && category !== "null")
      query = { category };

    const result = await Model.find(query)
      .sort({ order: 1 })
      .populate({
        path: "category",
        select: "title",
        populate: {
          path: "portfolio",
          select: "title",
        },
      });

    res.status(200).json({
      success: true,
      message: "Class fetched successfully",
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
    const result = await Model.findById(id).populate("category");

    if (!result) {
      return res.json({
        success: false,
        message: "class not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "class fetched successfully",
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
    const result = await Model.findOne({ slug: slug }).popolate("category");

    if (!result) {
      return res.json({
        success: false,
        message: "class not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "class fetched successfully",
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
  const category = data?.category;

  try {
    const categoryData = await Category.findById(category);

    if (!categoryData) {
      return res.json({
        success: false,
        message: "Category not found",
      });
    }

    const slug =
      data?.title?.toLowerCase().replace(/ /g, "-") + "-" + categoryData?.slug;
    const newData = {
      ...data,
      slug,
    };

    const isExit = await Model.findById(id);

    if (!isExit) {
      return res.json({
        success: false,
        message: "Class not found",
      });
    }

    const result = await Model.findByIdAndUpdate(id, newData);

    if (!result) {
      return res.json({
        success: false,
        message: "Failed to update",
      });
    }

    // check if the category is changed or not
    if (isExit?.category !== category) {
      const oldCategory = await Category.findById(isExit?.category);
      oldCategory.class.pull(id);
      await oldCategory.save();

      const newCategory = await Category.findById(category);
      newCategory.class.push(id);
      await newCategory.save();
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
        message: "Class not found",
      });
    }

    const result = await Model.findByIdAndDelete(id);

    if (!result) {
      return res.json({
        success: false,
        message: "Failed to delete",
      });
    }

    const category = await Category.findById(isExit?.category);
    category.class.pull(id);
    await category.save();

    res.status(200).json({
      success: true,
      message: `Class deleted successfully`,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
