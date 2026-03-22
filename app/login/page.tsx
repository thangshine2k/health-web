"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../service/api";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (isLoading) return; // chống spam click

    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);

      toast.success("Login successful", {
        style: {
          background: "#4CAF50",
          color: "#fff",
        },
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      toast.error("Login failed");
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
          Sign in
        </Typography>

        <Box component="form" sx={{ mt: 2, width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            placeholder="Email Address"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.2, borderRadius: 2 }}
            onClick={handleLogin}
            disabled={isLoading}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
