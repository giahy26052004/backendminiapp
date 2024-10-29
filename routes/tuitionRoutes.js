// routes/tuitionRoutes.js
const express = require("express");
const router = express.Router();

// Định nghĩa dữ liệu học phí và chính sách
const tuitionData = {
  tuitionFees: [
    {
      system: "Hệ Đại Trà",
      total: "35.000.000 đồng",
      average: "6.000.000 đồng/học kỳ",
    },
    {
      system: "Hệ Chất Lượng Cao",
      total: "60.140.000 đồng",
      average: "10.830.000 đồng/học kỳ",
    },
  ],
  additionalInfo:
    "Năm học 2024 – 2025, giảm 50% học phí học kỳ 1 cho 100% tân sinh viên xét tuyển sớm và có kết quả trúng tuyển.",
  policyNotes: [
    "Trường áp dụng hình thức tín chỉ, mỗi tín chỉ có giá 350.000 đồng.",
    "Học phí không bao gồm lệ phí nhập học và bảo hiểm.",
    "Các khoản phí khác như phí sử dụng thư viện, phí xét tốt nghiệp được tính riêng.",
  ],
};

// Tạo endpoint GET để lấy dữ liệu học phí
router.get("/", (req, res) => {
  res.json(tuitionData);
});

module.exports = router;
