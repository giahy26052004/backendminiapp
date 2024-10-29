const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Thêm yêu cầu nếu cần
  },
  content: {
    type: String,
    required: true, // Thêm yêu cầu nếu cần
  },
  date: {
    type: Date,
    default: Date.now, // Đặt giá trị mặc định là thời gian hiện tại
  },
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
