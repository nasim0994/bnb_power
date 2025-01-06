const fs = require("fs");
const Favicon = require("../models/faviconModel");

exports.add = async (req, res) => {
  const icon = req?.file?.filename;

  try {
    if (!icon) {
      return res.json({ success: false, message: "Favicon is required" });
    }

    const isExist = await Favicon.findOne();

    if (isExist?._id) {
      return res.json({
        success: false,
        message: "Favicon already added",
      });
    }

    const result = await Favicon.create({ icon: `/favicon/${icon}` });

    res.status(200).json({
      success: true,
      message: "Favicon added successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });

    fs.unlink(`./uploads/favicon/${icon}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

exports.get = async (req, res) => {
  try {
    const favicons = await Favicon.findOne();

    if (!favicons) {
      return res.json({
        success: false,
        message: "Favicon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Favicon found successfully",
      data: favicons,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const icon = req?.file?.filename;

  try {
    if (!icon) {
      return res.status(400).json({
        success: false,
        message: "Favicon is required",
      });
    }

    const id = req?.params?.id;
    const isFavicon = await Favicon.findOne({ _id: id });

    if (isFavicon) {
      await Favicon.findByIdAndUpdate(
        id,
        { icon: `/favicon/${icon}` },
        { new: true }
      );

      fs.unlink(`./uploads/${isFavicon?.icon}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      res.status(200).json({
        success: true,
        message: "Favicon updated successfully",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    fs.unlink(`./uploads/favicon/${icon}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};
