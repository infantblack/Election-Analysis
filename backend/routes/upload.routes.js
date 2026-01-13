import { Router } from "express";
import multer from "multer";
import { uploadFiles } from "../controllers/upload.controller.js";

const router = Router();

const upload = multer({
  dest: process.env.UPLOAD_DIR || "upload/",
  limits: {
    fileSize: Number(2097152)
  }
});

router.post("/upload", upload.array("file", 2), uploadFiles);

export default router;
