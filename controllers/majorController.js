const Major = require("../models/major");
exports.getAllMajors = async (req, res) => {
  const majors = await Major.find();
  res.json(majors);
};

exports.getMajorById = async (req, res) => {
  const item = await Major.findById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Ngành đào tạo không tìm thấy");
  }
};

exports.createMajor = async (req, res) => {
  const newMajor = new Major(req.body);
  await newMajor.save();
  res.status(201).json(newMajor);
};

exports.updateMajor = async (req, res) => {
  const item = await Major.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Ngành đào tạo không tìm thấy");
  }
};

exports.deleteMajor = async (req, res) => {
  const item = await Major.findByIdAndDelete(req.params.id);
  if (item) {
    res.status(204).send();
  } else {
    res.status(404).send("Ngành đào tạo không tìm thấy");
  }
};
