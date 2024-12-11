const multer = require("multer");
const path = require("path"); // Import path để sử dụng extname

// Cấu hình lưu file vào thư mục 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Đường dẫn tới thư mục chứa file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Đặt tên cho file
  },
});

// Middleware để xử lý file upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Giới hạn kích thước tối đa 10MB
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf/; // Các loại file được phép
    const mimetype = fileTypes.test(file.mimetype); // Kiểm tra loại MIME
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    ); // Kiểm tra phần mở rộng file

    if (mimetype && extname) {
      return cb(null, true); // Cho phép file
    } else {
      cb(new Error("File type not supported"), false); // Nếu không hợp lệ
    }
  },
});

module.exports = upload;
