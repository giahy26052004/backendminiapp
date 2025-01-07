const News = require("../models/news");
const fs = require("fs");
const path = require("path");

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).send("Lỗi khi lấy tin tức");
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const item = await News.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).send("Tin tức không tìm thấy");
    }
  } catch (error) {
    res.status(500).send("Lỗi khi lấy tin tức");
  }
};

exports.createNews = async (req, res) => {
  try {
    // Kiểm tra xem có file được upload hay không
    console.log(req.file); // Log file đã upload
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { title, content } = req.body;

    const newNews = new News({
      title,
      content,
      file: req.file.path, // Lưu đường dẫn tới file
    });

    await newNews.save();
    res.status(201).json(newNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedData = { title, content };

    // Check if a new file is uploaded
    if (req.file) {
      // Delete the old file if it exists
      const news = await News.findById(req.params.id);
      if (news && news.file) {
        fs.unlink(path.join(__dirname, "..", news.file), (err) => {
          if (err) console.error("Error deleting old file:", err);
        });
      }

      // Add the new file path
      updatedData.file = req.file.path;
    }

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (updatedNews) {
      res.json(updatedNews);
    } else {
      res.status(404).send("News not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating news");
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const item = await News.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(204).send();
    } else {
      res.status(404).send("Tin tức không tìm thấy");
    }
  } catch (error) {
    res.status(500).send("Lỗi khi xóa tin tức");
  }
};
exports.getImage = async (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.resolve(__dirname, "..", "uploads", filename);

  // Kiểm tra xem tệp có tồn tại không
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send("Tệp không tìm thấy");
  }
};
