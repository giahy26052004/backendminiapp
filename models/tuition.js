// models/tuition.js
const mongoose = require("mongoose");

const tuitionSchema = new mongoose.Schema({
  tuitionData: {
    type: String, // Đảm bảo trường này là đúng kiểu dữ liệu
    required: true,
  },
});

const Tuition = mongoose.model("Tuition", tuitionSchema);

module.exports = Tuition;
