const Phone = require("../models/phone");

// Lấy danh sách tất cả số điện thoại
exports.getAllPhones = async (req, res) => {
  try {
    const phones = await Phone.find();
    res.json({ success: true, data: phones });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// Lấy một số điện thoại theo ID
exports.getPhoneById = async (req, res) => {
  try {
    const phone = await Phone.findById(req.params.id);
    if (!phone)
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy" });

    res.json({ success: true, data: phone });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// Thêm số điện thoại mới
exports.createPhone = async (req, res) => {
  try {
    const { phone } = req.body;
    let newPhone = new Phone({ phone });

    await newPhone.save();
    res.json({
      success: true,
      message: "Số điện thoại đã được lưu!",
      data: newPhone,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi server hoặc số đã tồn tại" });
  }
};

// Cập nhật số điện thoại
exports.updatePhone = async (req, res) => {
  try {
    const { phone } = req.body;
    const updatedPhone = await Phone.findByIdAndUpdate(
      req.params.id,
      { phone },
      { new: true }
    );

    if (!updatedPhone)
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy" });

    res.json({
      success: true,
      message: "Cập nhật thành công",
      data: updatedPhone,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// Xóa số điện thoại
exports.deletePhone = async (req, res) => {
  try {
    const deletedPhone = await Phone.findByIdAndDelete(req.params.id);

    if (!deletedPhone)
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy" });

    res.json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};
