const express = require("express");
const router = express.Router();
const tuitionController = require("../controllers/tutionController");

// Route GET tất cả Tuition
router.get("/", tuitionController.getAllTuition);

// Route GET Tuition theo ID
router.get("/:id", tuitionController.getTuitionById);

// Route PUT cập nhật Tuition theo ID
router.put("/:id", tuitionController.updateTuition); // Chỉ cập nhật, không tạo mới

module.exports = router;
