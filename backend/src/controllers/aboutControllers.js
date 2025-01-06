const AboutUs = require("../models/aboutModel");
const makeSlug = require("../utils/makeSlug");
const fs = require("fs");

exports.add = async (req, res) => {
  const file = req?.file?.filename;
  const data = req?.body;

  const newData = {
    ...data,
    slug: makeSlug(data?.title),
    image: `/aboutus/${file}`,
  };

  try {
    const result = await AboutUs.create(newData);

    return res.status(201).json({
      success: true,
      message: `${data?.title} created successfully`,
      data: result,
    });
  } catch (err) {
    fs.unlink(`./uploads/aboutus/${file}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await AboutUs.find({});

    res.status(200).json({
      success: true,
      message: "About Us fetched successfully",
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
    const result = await AboutUs.findById(id);

    if (!result) {
      return res.json({
        success: false,
        message: "About Us not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "About Us fetched successfully",
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
    const result = await AboutUs.findOne({ slug: slug });

    if (!result) {
      return res.json({
        success: false,
        message: "About Us not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "About Us fetched successfully",
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
  const file = req?.file?.filename;
  const data = req?.body;

  try {
    const isExit = await AboutUs.findById(id);

    if (!isExit) {
      return res.json({
        success: false,
        message: "About Us not found",
      });
    }

    const result = await AboutUs.findByIdAndUpdate(
      id,
      {
        ...data,
        slug: makeSlug(data?.title),
        image: file ? `/aboutus/${file}` : isExit?.image,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `${data?.title} updated successfully`,
      data: result,
    });

    if (file && result) {
      fs.unlink(`./uploads/${isExit?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  } catch (error) {
    if (file) {
      fs.unlink(`./uploads/aboutus/${file}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req?.params?.id;

  try {
    const isExit = await AboutUs.findById(id);

    if (!isExit) {
      return res.json({
        success: false,
        message: `${isExit?.title} not found!`,
      });
    }

    const result = await AboutUs.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `${isExit?.title} deleted successfully`,
      data: result,
    });

    if (result) {
      fs.unlink(`./uploads/${isExit?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
