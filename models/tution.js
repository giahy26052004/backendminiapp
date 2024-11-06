const mongoose = require("mongoose");

// Định nghĩa schema cho tuition data
const tuitionSchema = new mongoose.Schema({
  tuitionFees: [
    {
      system: { type: String, required: true },
      total: { type: String, required: true },
      average: { type: String, required: true },
    },
  ],
  additionalInfo: { type: String, required: true },
  policyNotes: [{ type: String, required: true }],
});

// Tạo model từ schema
const Tuition = mongoose.model("Tuition", tuitionSchema);

module.exports = Tuition;
