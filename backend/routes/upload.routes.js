const router = require("express").Router();
const multer = require("multer");
const uploadController = require("../controllers/upload.controller");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.array("files", 2), uploadController.upload);

module.exports = router;
