const Service = require("../models/serviceModel");
const fs = require("fs");
const { pick } = require("../utils/pick");
const { calculatePagination } = require("../utils/calculatePagination");

exports.add = async (req, res) => {
  const image = req?.file?.filename;

  try {
    const data = req?.body;
    const result = await Service.create({
      ...data,
      image: `/services/${image}`,
    });

    if (!result) {
      return res.json({
        success: false,
        message: "Something went wrong",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service add success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });

    fs.unlink(`./uploads/services/${image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const services = await Service.find({});

    res.status(200).json({
      success: true,
      message: "Services get success",
      data: services,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req?.params?.id;
    const service = await Service.findById(id);
    if (!service) {
      return res.json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service get success",
      data: service,
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
    const service = await Service.findById(id);
    if (!service) {
      return res.json({
        success: false,
        message: "Service not found",
      });
    }

    const data = req.body;

    if (image) {
      await Service.findByIdAndUpdate(
        id,
        { ...data, image: `/services/${image}` },
        {
          new: true,
        }
      );

      fs.unlink(`./uploads/${service?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      await Service.findByIdAndUpdate(
        id,
        { ...data, image: service?.image },
        {
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Service updated success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });

    fs.unlink(`./uploads/services/${image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const id = req?.params?.id;
    const service = await Service.findById(id);
    if (!service) {
      return res.json({
        success: false,
        message: "Service not found",
      });
    }

    if (service) {
      const result = await Service.findByIdAndDelete(id);

      if (result) {
        fs.unlink(`./uploads/${service?.image}`, (err) => {
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
