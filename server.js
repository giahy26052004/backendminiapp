const express = require("express");
const mongoose = require("mongoose");
const newsRoutes = require("./routes/newsRoutes");
const majorRoutes = require("./routes/majorRoutes");
const tuitionRoutes = require("./routes/tuitionRoutes");
const slideRoutes = require("./routes/slideRoutes"); // Đảm bảo import slideRoutes
const phonesRoutes = require("./routes/phonesRoutes"); // Đảm bảo import slideRoutes
const giftRoutes = require("./routes/giftRoutes"); // Đảm bảo import slideRoutes

const path = require("path");
const cors = require("cors"); // Import CORS
const dotenv = require("dotenv"); // Import dotenv
const PORT = 3009;
const app = express();

// Cấu hình phục vụ các tệp tin tĩnh từ thư mục 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Sử dụng dotenv để load biến môi trường từ .env file
dotenv.config();

// Middleware để phân tích dữ liệu JSON
app.use(express.json());

const corsOptions = {
  origin: "*", // Dùng tạm thời, không an toàn cho production
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

// Kiểm tra biến môi trường MONGODBURL
console.log("process.env.MONGODBURL", process.env.MONGODBURL);

app.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);

  // Kiểm tra xem tệp có tồn tại không
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Tệp không tìm thấy");
  }
});

// Kết nối đến MongoDB
mongoose
  .connect(process.env.MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Kết nối đến MongoDB thành công"))
  .catch((err) => console.error("Kết nối đến MongoDB thất bại", err));

// Sử dụng các routes
app.use("/api/news", newsRoutes);
app.use("/api/majors", majorRoutes);
app.use("/api/slide", slideRoutes); // Đảm bảo sử dụng slideRoutes ở đây
app.use("/api/tuition", tuitionRoutes);
app.use("/api/phones", phonesRoutes);
app.use("/api", giftRoutes);
// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
