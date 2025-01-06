const Blogs = require("../models/blogsModel");
const fs = require("fs");
const { pick } = require("../utils/pick");
const { calculatePagination } = require("../utils/calculatePagination");

exports.add = async (req, res) => {
  const image = req?.file?.filename;
  const imagePath = `/blogs/${image}`;

  try {
    const data = req?.body;

    const result = await Blogs.create({ ...data, image: imagePath });

    if (!result) {
      return res.json({
        success: false,
        message: "Something went wrong",
      });
    }

    res.status(201).json({
      success: true,
      message: "Blogs add success",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/blogs/${image}`, (err) => {
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
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const result = await Blogs.find({}).skip(skip).limit(limit);

    const total = await Blogs.countDocuments({});
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Blogs get success",
      meta: {
        total,
        pages,
        page,
        limit,
      },
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
    const result = await Blogs.findById(id);
    if (!result) {
      return res.json({
        success: false,
        message: "Blogs not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog get success",
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
  const image = req?.file?.filename;

  try {
    const id = req?.params?.id;
    const isExist = await Blogs.findById(id);
    if (!isExist) {
      return res.json({
        success: false,
        message: "Blogs not found",
      });
    }

    const data = req.body;

    if (image) {
      fs.unlink(`./uploads/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      await Blogs.findByIdAndUpdate(
        id,
        { ...data, image: `/blogs/${image}` },
        {
          new: true,
        }
      );
    } else {
      await Blogs.findByIdAndUpdate(
        id,
        { ...data, image: isExist?.image },
        {
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Blogs updated success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });

    fs.unlink(`./uploads/blogs/${image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const id = req?.params?.id;
    const isExist = await Blogs.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Blogs not found",
      });
    }

    if (isExist) {
      const result = await Blogs.findByIdAndDelete(id);

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
