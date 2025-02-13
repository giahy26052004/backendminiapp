const express = require("express");
const router = express.Router();
const phoneController = require("../controllers/phoneController");

router.get("/", phoneController.getAllPhones); // Lấy danh sách số điện thoại
router.get("/:id", phoneController.getPhoneById); // Lấy số điện thoại theo ID
router.post("/", phoneController.createPhone); // Thêm số điện thoại mới
router.put("/:id", phoneController.updatePhone); // Cập nhật số điện thoại
router.delete("/:id", phoneController.deletePhone); // Xóa số điện thoại

module.exports = router;
