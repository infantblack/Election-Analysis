import { Box, Alert, AlertTitle, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ErrorFallback({ message, onRetry }) {
  
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3
      }}
    >
      <Alert
        severity="error"
        sx={{ maxWidth: 500, width: "100%" }}
        action={
          <Button
            color="inherit"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
          >
            Retry
          </Button>
        }
      >
        <AlertTitle>Upload Failed</AlertTitle>
        {message || "Something went wrong while processing the file."}
      </Alert>
    </Box>
  );
}
