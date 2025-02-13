const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true, // Tránh trùng số điện thoại
    match: /^[0-9]{10,11}$/, // Chỉ chấp nhận số điện thoại 10-11 số
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Phones = mongoose.model("Phones", phoneSchema);

module.exports = Phones;
