import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export const sendToPythonService = async (filePath) => {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));

  const response = await axios.post(
    process.env.PYTHON_SERVICE_URL,
    formData,
    {
      headers: formData.getHeaders()
    }
  );

  return response.data;
};
