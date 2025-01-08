const express = require("express");
const router = express.Router();

const slideController = require("../controllers/slideController");

const upload = require("../midleware/upload");

// Các route cho slide
router.get("/", slideController.getAllSlides);
router.get("/:id", slideController.getSlideById);
router.post("/", upload.single("image"), slideController.createSlide);
router.put("/:id", upload.single("image"), slideController.updateSlide);
router.delete("/:id", slideController.deleteSlide);

module.exports = router;
