import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export const sendToPythonService = async (file) => {
  const formData = new FormData();

  formData.append(
    "files",
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
      headers: formData.getHeaders(),
      maxBodyLength: Infinity
    }
  );

  return response.data;
};
