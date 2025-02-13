// routes/giftRoutes.js
const express = require("express");
const Gift = require("../models/gift");
const router = express.Router();

// Lấy danh sách quà tặng
router.get("/gifts", async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.json(gifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm quà tặng mới
router.post("/gifts", async (req, res) => {
  const gift = new Gift({
    name: req.body.name,
  });

  try {
    const newGift = await gift.save();
    res.status(201).json(newGift);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật quà tặng
router.put("/gifts/:id", async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id);
    if (gift) {
      gift.name = req.body.name || gift.name;
      await gift.save();
      res.json(gift);
    } else {
      res.status(404).json({ message: "Gift not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Xóa quà tặng
router.delete("/gifts/:id", async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id);
    if (!gift) {
      return res.status(404).json({ message: "Gift not found" });
    }

    await Gift.findByIdAndDelete(req.params.id);
    res.json({ message: "Gift deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
