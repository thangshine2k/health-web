"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { api } from "../service/api"; // axios instance

type SessionType = {
  label: string;
  duration: number;
};

type WorkoutData = {
  totalMinutes: number;
  goalMinutes: number;
  percentage: number;
  sessions: SessionType[];
};

export default function WorkoutPage() {
  const { data, isLoading, error } = useQuery<WorkoutData>({
    queryKey: ["workouts"],
    queryFn: async () => {
      const res = await api.get("/workouts?userId=1");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
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

  // Error
  if (error || !data || !localStorage.getItem("token")) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error">Failed to load workout data</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // ml: `${drawerWidth}px`, // tránh đè lên Drawer
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Workout 💪
        </Typography>

        {/* ===== Overview ===== */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          flexWrap="wrap"
          mb={3}
          gap={3}
        >
          <Card
            sx={{
              flex: { xs: "1 1 120px", sm: "1 1 250px" },
              borderRadius: 4,
              background: "#E3F2FD",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <CardContent>
              <Typography color="text.secondary">Total Minutes</Typography>
              <Typography variant="h3" fontWeight="bold">
                {data.totalMinutes} min
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              flex: { xs: "1 1 160px", sm: "1 1 250px" },
              borderRadius: 4,
              background: "#E3F2FD",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <CardContent>
              <Typography color="text.secondary">Goal Minutes</Typography>
              <Typography variant="h3" fontWeight="bold">
                {data.goalMinutes} min
              </Typography>
              <Chip
                label={`${data.percentage}%`}
                color={data.percentage >= 100 ? "success" : "warning"}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Stack>

        {/* ===== Workout Breakdown ===== */}
        <Box mb={4}>
          <Typography variant="h6" mb={2}>
            Session Breakdown
          </Typography>

          <Stack spacing={2}>
            {data.sessions?.map((session) => (
              <Card key={session.label} sx={{ borderRadius: 4 }}>
                <CardContent>
                  <Typography>
                    {session.label} - {session.duration} min
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* ===== AI Suggestion ===== */}
        <Box>
          <Typography variant="h6" mb={2}>
            AI Suggestion 🤖
          </Typography>

          <Card sx={{ borderRadius: 4, background: "#E8F5E9" }}>
            <CardContent>
              <Typography>
                You are slightly below your daily workout goal. Try adding a
                short 15-minute session in the afternoon or evening to meet your
                target.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
