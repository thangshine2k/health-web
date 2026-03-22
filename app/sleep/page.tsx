"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";
import { api } from "../service/api";
import { useQuery } from "@tanstack/react-query";

type SleepData = {
  totalSleep: number;
  deep: number;
  light: number;
  awake: number;
  score: number;
};

export default function SleepPage() {
  const { data, isLoading, error } = useQuery<SleepData>({
    queryKey: ["sleep"],
    queryFn: async () => {
      const res = await api.get("/sleep?userId=1");
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
    <Stack>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Sleep Tracking 😴
        </Typography>

        {/* ===== Overview ===== */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          flexWrap="wrap"
          mb={3}
          gap={3}
        >
          <Box sx={{ flex: 1 }}>
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
                <Typography color="text.secondary">Total Sleep Time</Typography>
                <Typography variant="h3" fontWeight="bold">
                  {data.totalSleep}h
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: 1 }}>
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
                <Typography color="text.secondary">Sleep Score</Typography>
                <Typography variant="h3" fontWeight="bold">
                  {data.score}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={data.score}
                  sx={{ mt: -0.35 }}
                />
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: 1 }}>
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
                <Typography color="text.secondary">Sleep Quality</Typography>
                <Chip
                  label={data.score > 80 ? "Good" : "Average"}
                  color={data.score > 80 ? "success" : "warning"}
                  sx={{ mt: 3.2 }}
                />
              </CardContent>
            </Card>
          </Box>
        </Stack>

        {/* ===== Sleep Breakdown ===== */}
        <Box mt={4}>
          <Typography variant="h6" mb={2}>
            Sleep Breakdown
          </Typography>

          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Stack spacing={2}>
                <Box>
                  <Typography>Deep Sleep ({data.deep}h)</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(data.deep / data.totalSleep) * 100}
                  />
                </Box>

                <Box>
                  <Typography>Light Sleep ({data.light}h)</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(data.light / data.totalSleep) * 100}
                    color="secondary"
                  />
                </Box>

                <Box>
                  <Typography>Awake ({data.awake}h)</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(data.awake / data.totalSleep) * 100}
                    color="error"
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* ===== AI Suggestion ===== */}
        <Box mt={4}>
          <Typography variant="h6" mb={2}>
            AI Suggestion 🤖
          </Typography>

          <Card sx={{ borderRadius: 4, background: "#F1F8E9" }}>
            <CardContent>
              <Typography>
                You slept less than recommended. Try going to bed 30 minutes
                earlier and avoid screen time before sleep.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Stack>
  );
}
