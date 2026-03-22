/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../service/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Button,
  Stack,
} from "@mui/material";

// ===== Types =====
type Water = {
  totalIntake: number;
};

type Nutrition = {
  totalCalories: number;
};

type Sleep = {
  totalSleep: number;
};

type Workout = {
  totalMinutes: number;
};

export default function Dashboard() {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setMounted(true);
  }, []);

  // ===== Queries =====
  const { data: water, isLoading: loadingWater } = useQuery<Water>({
    queryKey: ["water"],
    queryFn: async () => (await api.get("/water?userId=1")).data,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });

  const { data: nutrition, isLoading: loadingNutrition } = useQuery<Nutrition>({
    queryKey: ["nutrition"],
    queryFn: async () => (await api.get("/nutrition?userId=1")).data,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });

  const { data: sleep, isLoading: loadingSleep } = useQuery<Sleep>({
    queryKey: ["sleep"],
    queryFn: async () => (await api.get("/sleep?userId=1")).data,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });

  const { data: workout, isLoading: loadingWorkout } = useQuery<Workout>({
    queryKey: ["workout"],
    queryFn: async () => (await api.get("/workouts?userId=1")).data,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });

  const isLoading =
    loadingWater || loadingNutrition || loadingSleep || loadingWorkout;

  // ===== Logout =====
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/");
  };

  // ===== Auth check =====
  if (!mounted || !token) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* ===== Header ===== */}
      <AppBar
        position="static"
        elevation={0}
        sx={{ background: "transparent", color: "#000", px: 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Dashboard</Typography>

          <Button
            onClick={handleLogout}
            sx={{
              color: "#fff",
              background: "#ef4444",
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 2,
              px: 2,
              "&:hover": {
                background: "#dc2626",
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* ===== Content ===== */}
      <Stack sx={{ m: 3, my: 2 }} display={{ xm: "block", md: "flex" }}>
        {isLoading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {/* Water */}
            <Card
              sx={{
                flex: "1 1 250px",
                borderRadius: 4,
                background: "#E3F2FD",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Typography color="text.secondary">Water 💧</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {water?.totalIntake || 0} L
                </Typography>
              </CardContent>
            </Card>

            {/* Nutrition */}
            <Card
              sx={{
                flex: "1 1 250px",
                borderRadius: 4,
                background: "#FFF3E0",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Typography color="text.secondary">Calories 🍎</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {nutrition?.totalCalories || 0} kcal
                </Typography>
              </CardContent>
            </Card>

            {/* Sleep */}
            <Card
              sx={{
                flex: "1 1 250px",
                borderRadius: 4,
                background: "#E8F5E9",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Typography color="text.secondary">Sleep 😴</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {sleep?.totalSleep || 0} h
                </Typography>
              </CardContent>
            </Card>

            {/* Workout */}
            <Card
              sx={{
                flex: "1 1 250px",
                borderRadius: 4,
                background: "#F3E5F5",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Typography color="text.secondary">Workout 💪</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {workout?.totalMinutes || 0} min
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
