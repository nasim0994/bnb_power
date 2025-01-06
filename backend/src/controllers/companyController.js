const Model = require("../models/companyModel");
const fs = require("fs");
const makeSlug = require("../utils/makeSlug");

exports.add = async (req, res) => {
  const { image, profile } = req?.files;
  const file = image && image[0]?.filename;
  const profileDoc = profile && profile[0]?.filename;
  const data = req?.body;

  try {
    let newData = {
      ...data,
      slug: makeSlug(data?.name),
      image: `/company/${file}`,
      profile: `/company/${profileDoc}`,
    };

    const result = await Model.create(newData);

    if (!result) {
      return res.json({
        success: false,
        message: "Something went wrong",
      });
    }

    res.status(201).json({
      success: true,
      message: "Company add success",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/company/${file}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    fs.unlink(`./uploads/company/${profileDoc}`, (err) => {
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
      message: "Company get success",
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
    if (!result) {
      return res.json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company get success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBySlug = async (req, res) => {
  const { slug } = req?.params;

  try {
    const result = await Model.findOne({ slug });
    if (!result) {
      return res.json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company get success",
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
  const { image, profile } = req?.files;
  const file = image && image[0]?.filename;
  const profileDoc = profile && profile[0]?.filename;

  try {
    const id = req?.params?.id;

    const isExist = await Model.findById(id);
    if (!isExist) {
      return res.json({
        success: false,
        message: "Company not found",
      });
    }

    const data = req.body;

    const newData = {
      ...data,
      slug: makeSlug(data?.name),
      image: file ? `/company/${file}` : isExist?.image,
      profile: profileDoc ? `/company/${profileDoc}` : isExist?.profile,
    };

    const result = await Model.findByIdAndUpdate(id, newData, { new: true });

    res.status(200).json({
      success: true,
      message: "Director updated success",
    });

    if (file && result) {
      fs.unlink(`./uploads/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    if (profileDoc && result) {
      fs.unlink(`./uploads/${isExist?.profile}`, (err) => {
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

    if (file) {
      fs.unlink(`./uploads/company/${file}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    if (profile) {
      fs.unlink(`./uploads/company/${profileDoc}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
};

exports.destroy = async (req, res) => {
  try {
    const id = req?.params?.id;
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Company not found",
      });
    }

    const result = await Model.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Delete success",
      data: result,
    });

    if (result) {
      fs.unlink(`./uploads/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    if (result) {
      fs.unlink(`./uploads/${isExist?.profile}`, (err) => {
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
  }
};
