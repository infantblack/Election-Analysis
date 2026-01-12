import { Router } from "express";
import multer from "multer";
import { uploadFiles } from "../controllers/upload.controller.js";

const router = Router();

const upload = multer({
  dest: process.env.UPLOAD_DIR || "upload/",
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE)
  }
});
router.post("/upload", upload.array("files", 2), uploadFiles);

export default router;
