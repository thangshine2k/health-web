"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../service/api";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      toast.success("Register successful 🎉");

      setTimeout(() => {
        router.push("/login");
      }, 500);
    } catch (err) {
      setIsLoading(false);
      toast.error("Register failed");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <Box sx={{ mt: 2, width: "100%" }}>
          {/* <TextField
            margin="normal"
            fullWidth
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /> */}

          <TextField
            margin="normal"
            fullWidth
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            fullWidth
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.2, borderRadius: 2 }}
            onClick={handleRegister}
            disabled={isLoading}
          >
            Register
          </Button>

          {/* 👇 quay lại login */}
          <Box textAlign="center" mt={2}>
            <Typography variant="body2">
              Already have an account?{" "}
              <span
                style={{
                  color: "#1976d2",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
                onClick={() => router.push("/login")}
              >
                Login
              </span>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}