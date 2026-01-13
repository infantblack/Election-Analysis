import fs from "fs";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "application/json"
];

export const validateFiles = (files) => {

  if (!files || files.length === 0) {
    throw new Error("No files uploaded");
  }

  if (files.length > 2) {
    throw new Error("Maximum 2 files allowed");
  }

  for (const file of files) {
    // ✔ MIME type validation
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      throw new Error(`Unsupported file type: ${file.originalname}`);
    }

    // ✔ REAL size validation
    const stats = fs.statSync(file.path);
    if (stats.size > MAX_FILE_SIZE) {
      throw new Error(`${file.originalname} exceeds 2MB limit`);
    }
  }
};
