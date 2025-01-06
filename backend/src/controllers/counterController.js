const Counter = require("../models/counterModel");
const fs = require("fs");

exports.add = async (req, res) => {
  const image = req?.file?.filename;

  try {
    if (!image) {
      return res.json({
        success: false,
        message: "background image is required",
      });
    }

    const isExist = await Counter.findOne();

    if (isExist?._id) {
      return res.json({
        success: false,
        message: "Counter already added",
      });
    }

    const data = {
      ...req.body,
      bgImage: `/counter/${image}`,
    };

    const result = await Counter.create(data);

    res.status(201).json({
      success: true,
      message: "Counter created successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    fs.unlink(`./uploads/counter/${image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Counter.findOne();

    res.status(200).json({
      success: true,
      message: "Counter found successfully",
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
  const data = req?.body;
  const id = req?.params?.id;

  try {
    const counter = await Counter.findById(id);

    let newData;

    if (image) {
      newData = {
        ...data,
        bgImage: `/counter/${image}`,
      };

      fs.unlink(`./uploads/${counter?.bgImage}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } else {
      newData = {
        ...data,
        bgImage: counter?.bgImage,
      };
    }
    const result = await Counter.findByIdAndUpdate(id, newData, { new: true });

    res.status(200).json({
      success: true,
      message: "Counter updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    fs.unlink(`./uploads/counter/${image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

exports.addCount = async (req, res) => {
  const { id, title, number } = req?.body;

  try {
    const isExist = await Counter.findOne({
      _id: id,
      "count.title": title,
    });

    if (isExist?._id) {
      return res.json({
        success: false,
        message: "count already exist",
      });
    }

    const updatedCount = await Counter.findByIdAndUpdate(
      id,
      {
        $push: {
          count: {
            title,
            number,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Counter count add successfully",
      data: updatedCount,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCount = async (req, res) => {
  const { id, title, number, newTitle, newNumber } = req?.body;

  try {
    const updatedCount = await Counter.findOneAndUpdate(
      {
        _id: id,
        "count.title": title,
        "count.number": number,
      },
      {
        $set: {
          "count.$.title": newTitle,
          "count.$.number": newNumber,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Counter count updated successfully",
      data: updatedCount,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCount = async (req, res) => {
  const { id, title, number } = req?.body;

  try {
    const updatedCount = await Counter.findByIdAndUpdate(
      id,
      {
        $pull: {
          count: {
            title,
            number,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Counter count deleted successfully",
      data: updatedCount,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
