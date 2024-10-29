const News = require("../models/news");

exports.getAllNews = async (req, res) => {
  const news = await News.find();
  res.json(news);
};

exports.getNewsById = async (req, res) => {
  const item = await News.findById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Tin tức không tìm thấy");
  }
};

exports.createNews = async (req, res) => {
  const newItem = new News(req.body);
  await newItem.save();
  res.status(201).json(newItem);
};

exports.updateNews = async (req, res) => {
  const item = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Tin tức không tìm thấy");
  }
};

exports.deleteNews = async (req, res) => {
  const item = await News.findByIdAndDelete(req.params.id);
  if (item) {
    res.status(204).send();
  } else {
    res.status(404).send("Tin tức không tìm thấy");
  }
};
