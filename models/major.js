// Đường dẫn đến tệp nơi bạn định nghĩa mô hình

const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema(
  {
    kien_truc: String,
    muc_tieu: String,
    co_hoi_nghe_nghiep: String,
    dieu_kien_tuyen_sinh: String,
    mon_hoc_tieu_bieu: [String], // Mảng để lưu danh sách các môn học
    bang_cap: String,
  },
  { _id: false }
); // Không tạo _id cho subdocument

const majorSchema = new mongoose.Schema({
  khoi_nganh: String,
  ten_nganh: String,
  details_nganh: detailsSchema,
});

const Major = mongoose.model("Major", majorSchema);

module.exports = Major;
