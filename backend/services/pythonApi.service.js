import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export const sendToPythonService = async (file) => {
  const formData = new FormData();

  formData.append(
    "file",
    fs.createReadStream(file.path),
    {
      filename: file.originalname,
      contentType: file.mimetype
    }
  );

  const response = await axios.post(
    process.env.PYTHON_SERVICE_URL, // http://localhost:8000/process
    formData,
    {
      headers: formData.getHeaders(), // ✅ THIS IS CRITICAL
      maxBodyLength: Infinity,
      maxContentLength: Infinity
    }
  );

  return response.data;
};
