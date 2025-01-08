const Slide = require("../models/slide");
const fs = require("fs");
const path = require("path");

// Lấy danh sách tất cả các slide
exports.getAllSlides = async (req, res) => {
  try {
    const slides = await Slide.find();
    res.json(slides);
  } catch (error) {
    res.status(500).send("Lỗi khi lấy danh sách slide");
  }
};

// Lấy thông tin slide theo ID
exports.getSlideById = async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    if (slide) {
      res.json(slide);
    } else {
      res.status(404).send("Slide không tìm thấy");
    }
  } catch (error) {
    res.status(500).send("Lỗi khi lấy slide");
  }
};

// Tạo slide mới
exports.createSlide = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Không có tệp tải lên" });
    }

    const { title, description, link } = req.body;

    const newSlide = new Slide({
      title,
      description,
      image: req.file.filename, // Lưu tên file hình ảnh
      link,
    });

    await newSlide.save();
    res.status(201).json(newSlide);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi tạo slide" });
  }
};

// Cập nhật slide
exports.updateSlide = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const updatedData = { title, description, link };

    if (req.file) {
      // Delete the old file if it exists
      const slidedata = await Slide.findById(req.params.id);
      if (slidedata && slidedata.image) {
        fs.unlink(
          path.join(__dirname, "..", "uploads", slidedata.image),
          (err) => {
            if (err) console.error("Error deleting old file:", err);
          }
        );
      }

      // Add the new file path
      updatedData.image = req.file.filename;
    }

    const updatedSlide = await Slide.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (updatedSlide) {
      res.json(updatedSlide);
    } else {
      res.status(404).send("Slide không tìm thấy");
    }
  } catch (error) {
    res.status(500).send("Lỗi khi cập nhật slide");
  }
};

// Xóa slide
exports.deleteSlide = async (req, res) => {
  try {
    const slide = await Slide.findByIdAndDelete(req.params.id);
    if (slide) {
      if (slide.image) {
        fs.unlink(path.join(__dirname, "..", "uploads", slide.image), (err) => {
          if (err) console.error("Lỗi khi xóa hình ảnh:", err);
        });
      }
      res.status(204).send();
    } else {
      res.status(404).send("Slide không tìm thấy");
    }
  } catch (error) {
    res.status(500).send("Lỗi khi xóa slide");
  }
};
