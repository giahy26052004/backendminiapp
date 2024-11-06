// controllers/tuitionController.js

const Tuition = require("../models/tuition");


// Lấy tất cả dữ liệu Tuition
const getAllTuition = async (req, res) => {
  try {
    const tuitionData = await Tuition.find();
    res.status(200).json(tuitionData);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu Tuition", error });
  }
};

// Lấy Tuition theo ID
const getTuitionById = async (req, res) => {
  try {
    const tuition = await Tuition.findById(req.params.id);
    if (!tuition) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy Tuition với ID này" });
    }
    res.status(200).json(tuition);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu Tuition", error });
  }
};

const createTuition = async (req, res) => {
  const { tuitionData } = req.body;

  console.log("Received tuitionData:", req.body); // In ra dữ liệu nhận được từ client

  if (!tuitionData) {
    return res
      .status(400)
      .json({ message: "Dữ liệu tuitionData không hợp lệ" });
  }

  try {
    const newTuition = new Tuition({ tuitionData });
    await newTuition.save();
    res.status(201).json(newTuition);
  } catch (error) {
    console.error("Error when saving Tuition:", error); // In ra lỗi chi tiết nếu có
    res.status(500).json({ message: "Lỗi khi tạo mới Tuition", error });
  }
};

// Cập nhật Tuition theo ID
const updateTuition = async (req, res) => {
  const { tuitionData } = req.body;

  if (!tuitionData) {
    return res
      .status(400)
      .json({ message: "Dữ liệu tuitionData không hợp lệ" });
  }

  try {
    const updatedTuition = await Tuition.findByIdAndUpdate(
      req.params.id,
      { tuitionData },
      { new: true, runValidators: true }
    );

    if (!updatedTuition) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy Tuition với ID này" });
    }

    res.status(200).json(updatedTuition);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật Tuition", error });
  }
};

// Xóa Tuition theo ID
const deleteTuition = async (req, res) => {
  try {
    const deletedTuition = await Tuition.findByIdAndDelete(req.params.id);
    if (!deletedTuition) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy Tuition với ID này" });
    }
    res.status(200).json({ message: "Tuition đã được xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa Tuition", error });
  }
};

module.exports = {
  getAllTuition,
  getTuitionById,
  createTuition,
  updateTuition,
  deleteTuition,
};
