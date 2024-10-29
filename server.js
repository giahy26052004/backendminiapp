const express = require("express");
const mongoose = require("mongoose");
const newsRoutes = require("./routes/newsRoutes");
const majorRoutes = require("./routes/majorRoutes");
const tuitionRoutes = require("./routes/tuitionRoutes");
const cors = require("cors"); // Import CORS
const dotenv = require("dotenv"); // Import dotenv

const app = express();
const PORT = 3009;

// Sử dụng dotenv để load biến môi trường từ .env file
dotenv.config();

// Middleware để phân tích dữ liệu JSON
app.use(express.json());

// Cấu hình CORS
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"], // Thay thế bằng các URL frontend của bạn
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

// Kiểm tra biến môi trường MONGODBURL
console.log("process.env.MONGODBURL", process.env.MONGODBURL);

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
app.use("/api/tuition", tuitionRoutes); // Thêm dòng này

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
