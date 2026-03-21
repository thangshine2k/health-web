"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Chip,
  Drawer,
} from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import { drawerWidth } from "../config";
import { api } from "../service/api";
import { useQuery } from "@tanstack/react-query";

type data = {
  totalIntake: number;
  goal: number;
  percentage: number;
  times: { label: string; value: number }[];
};

export default function WaterPage() {
  const { data, isLoading, error } = useQuery<data>({
    queryKey: ["workouts"],
    queryFn: async () => {
      const res = await api.get("/water?userId=1");
      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 phút
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
        {/* <CircularProgress /> */}
      </Box>
    );
  }

  // Error
  if (error || !data) {
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
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Sidebar />
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Water Intake 💧
        </Typography>

        {/* ===== Overview ===== */}
        <Stack direction="row" spacing={3} flexWrap="wrap" mb={4}>
          <Card sx={{ borderRadius: 4, flex: "1 1 250px" }}>
            <CardContent>
              <Typography color="text.secondary">Total Intake</Typography>
              <Typography variant="h3" fontWeight="bold">
                {data.totalIntake} L
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 4, flex: "1 1 250px" }}>
            <CardContent>
              <Typography color="text.secondary">Goal</Typography>
              <Typography variant="h3" fontWeight="bold">
                {data.goal} L
              </Typography>
              <LinearProgress
                variant="determinate"
                value={data.percentage}
                sx={{ mt: 2, height: 8, borderRadius: 5 }}
              />
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 4, flex: "1 1 250px" }}>
            <CardContent>
              <Typography color="text.secondary">Progress</Typography>
              <Chip
                label={`${data.percentage}%`}
                color={data.percentage >= 100 ? "success" : "warning"}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Stack>

        {/* ===== Water Breakdown ===== */}
        <Box mb={4}>
          <Typography variant="h6" mb={2}>
            Daily Breakdown
          </Typography>

          <Stack spacing={2}>
            {data.times?.map((item) => (
              <Card key={item.label} sx={{ borderRadius: 4 }}>
                <CardContent>
                  <Typography>{item.label}</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(item.value / data.goal) * 100}
                  />
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

          <Card sx={{ borderRadius: 4, background: "#E0F7FA" }}>
            <CardContent>
              <Typography>
                You are slightly below your daily water goal. Try drinking a
                glass of water before lunch and another before dinner.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
