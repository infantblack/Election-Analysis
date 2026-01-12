
import { useState } from "react";
import { uploadFiles } from "../services/api";
import ErrorFallback from "../components/ErrorFallback";
import { CircularProgress, Box, Button, Typography, Stack } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function FileUpload({ onSchemaGenerated }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Handle file selection (local state)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 2) {
      alert("Max 2 files allowed");
      return;
    }
    setSelectedFiles(files);
  };

  // Handle actual upload to Node.js/Python
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    for (let f of selectedFiles) {
      if (f.size > 2 * 1024 * 1024) {
        alert(`${f.name} is too large (Max 2MB)`);
        return;
      }
      formData.append("files", f);
    }

    setLoading(true);
    setError(null);

    try {
      const res = await uploadFiles(formData);
      onSchemaGenerated(res.schema); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <ErrorFallback message={error} onRetry={() => {
      setError(null);
      setSelectedFiles([]);
    }} />;
  }

  return (
    <Box 
      sx={{ 
        p: 4, 
        border: '2px dashed', 
        borderColor: 'primary.main',
        borderRadius: 2,
        bgcolor: 'background.paper',
        textAlign: 'center' 
      }}
    >
      <Typography variant="h6" gutterBottom>
        Upload Data for Schema Generation
      </Typography>

      <Stack spacing={2} alignItems="center">
        {/* Hidden Input field */}
        <Button
          variant="outlined"
          component="label"
          disabled={loading}
        >
          Select Files
          <input
            type="file"
            hidden
            multiple
            onChange={handleFileChange}
            accept=".csv, .json, .xlsx"
          />
        </Button>

        {/* Display selected filenames */}
        {selectedFiles.length > 0 && (
          <Typography variant="body2">
            Selected: {selectedFiles.map(f => f.name).join(', ')}
          </Typography>
        )}

        {/* The Action Upload Button */}
        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
          onClick={handleUpload}
          disabled={loading || selectedFiles.length === 0}
          sx={{ minWidth: 150 }}
        >
          {loading ? "Processing..." : "Upload to Server"}
        </Button>

        <Typography variant="caption" color="textSecondary">
          Max 2 files, 2MB each (CSV, JSON, XLSX)
        </Typography>
      </Stack>
    </Box>
  );
}