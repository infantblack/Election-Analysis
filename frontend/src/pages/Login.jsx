import React, { useState } from "react";
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Avatar, 
  Stack 
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import "./Login.scss";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Your bypass logic
    if (user === "" && pass === "") {
      // onLogin(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box className="login-page-container">
      {/* The centered login card with the Comet effect */}
      <Paper elevation={10} className="login-card comet-effect">
        <Stack spacing={3} alignItems="center">
          <Avatar sx={{ bgcolor: "#3b82f6", width: 56, height: 56 }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          
          <Typography component="h1" variant="h4" fontWeight="bold">
            Admin Login
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              variant="filled"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              variant="filled"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mt: 4, 
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: "8px",
                background: "linear-gradient(45deg, #ff4b2b 30%, #3b82f6 90%)",
                boxShadow: "0 3px 5px 2px rgba(59, 130, 246, .3)"
              }}
            >
              Enter System
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}