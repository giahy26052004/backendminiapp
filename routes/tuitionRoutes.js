const express = require("express");
const Tuition = require("../models/tution");
const router = express.Router();


// Tạo endpoint GET để lấy dữ liệu học phí từ DB
router.get("/", async (req, res) => {
  try {
    // Lấy dữ liệu học phí từ MongoDB
    const tuitionData = await Tuition.findOne(); // Giả sử bạn chỉ có một record duy nhất
    if (!tuitionData) {
      return res.status(404).json({ message: "Tuition data not found" });
    }
    res.json(tuitionData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo endpoint PUT để cập nhật dữ liệu học phí
router.put("/", async (req, res) => {
  const { tuitionFees, additionalInfo, policyNotes } = req.body;

  try {
    // Kiểm tra xem dữ liệu học phí đã tồn tại chưa
    let tuitionData = await Tuition.findOne(); // Giả sử bạn chỉ có một record duy nhất
    if (tuitionData) {
      // Nếu đã tồn tại, cập nhật dữ liệu
      tuitionData.tuitionFees = tuitionFees;
      tuitionData.additionalInfo = additionalInfo;
      tuitionData.policyNotes = policyNotes;

      // Lưu dữ liệu vào DB
      await tuitionData.save();
      return res.json({ message: "Tuition data updated successfully" });
    } else {
      // Nếu chưa có dữ liệu, tạo mới
      tuitionData = new Tuition({ tuitionFees, additionalInfo, policyNotes });
      await tuitionData.save();
      return res
        .status(201)
        .json({ message: "Tuition data created successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
