const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tiêu đề là bắt buộc"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Hình ảnh là bắt buộc"],
    },
    link: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now, // Đặt giá trị mặc định là thời gian hiện tại
    },
  },
  { timestamps: true } // Tự động thêm `createdAt` và `updatedAt`
);

module.exports = mongoose.model("Slide", slideSchema);
