// models/Gift.js
const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("gift", giftSchema);
