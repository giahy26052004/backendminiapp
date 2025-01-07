const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const upload = require("../midleware/upload");
router.get("/", newsController.getAllNews);
router.get("/:id", newsController.getNewsById);
router.post("/", upload.single("file"), newsController.createNews);

router.put("/:id", upload.single("file"), newsController.updateNews);
router.delete("/:id", newsController.deleteNews);
router.get("/image/:filename", newsController.getImage);
module.exports = router;
