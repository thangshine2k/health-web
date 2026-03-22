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
import { api } from "../service/api";
import { useQuery } from "@tanstack/react-query";

type NutritionData = {
  totalCalories: number;
  goalCalories: number;
  percentage: number;
  meals: { label: string; calories: number }[];
};
export default function NutritionPage() {
  const { data, isLoading, error } = useQuery<NutritionData>({
    queryKey: ["nutrition"],
    queryFn: async () => {
      const res = await api.get("/nutrition?userId=1");
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
          // ml: `${drawerWidth}px`, // tránh đè Drawer
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Nutrition 🍎
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
              <Typography color="text.secondary">Calories Intake</Typography>
              <Typography variant="h3" fontWeight="bold">
                {data.totalCalories} kcal
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
              <Typography color="text.secondary">Goal Calories</Typography>
              <Typography variant="h3" fontWeight="bold">
                {data.goalCalories} kcal
              </Typography>
              <Chip
                label={`${data.percentage}%`}
                color={data.percentage >= 100 ? "success" : "warning"}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Stack>

        {/* ===== Meal Breakdown ===== */}
        <Box mb={4}>
          <Typography variant="h6" mb={2}>
            Meal Breakdown
          </Typography>

          <Stack spacing={2}>
            {data.meals?.map((meal) => (
              <Card key={meal.label} sx={{ borderRadius: 4 }}>
                <CardContent>
                  <Typography>
                    {meal.label} - {meal.calories} kcal
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

          <Card sx={{ borderRadius: 4, background: "#FFF3E0" }}>
            <CardContent>
              <Typography>
                You are slightly below your daily calorie goal. Consider adding
                a healthy snack like fruits or nuts to reach your target.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
