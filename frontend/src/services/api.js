
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 30000, // 30 seconds, as Python processing can be slow
});

/**
 * Helper to extract meaningful messages from Axios errors
 */
const handleAxiosError = (error) => {
  if (error.response) {
    // Server responded with a status code outside the 2xx range
    console.error("Backend Error:", error.response.data);
    return error.response.data.message || "Server Error occurred";
  } else if (error.request) {
    // Request was made but no response was received
    console.error("Network Error: No response from server");
    return "Network error: Please check if your Node/Python server is running.";
  } else {
    // Something happened in setting up the request
    console.error("Request Setup Error:", error.message);
    return error.message;
  }
};

// --- API Methods ---
export const uploadFiles = async (formData) => {
  try {
    const response = await API.post("/upload", formData);
    return response.data;
  } catch (error) {
    const message = handleAxiosError(error);
    throw new Error(message);
  }
};

export const fetchChartData = async (districtId, assemblyId) => {
  try {
    const response = await API.get("/data", {
      params: { district: districtId, assembly: assemblyId }
    });
    return response.data;
  } catch (error) {
    const message = handleAxiosError(error);
    throw new Error(message);
  }
};