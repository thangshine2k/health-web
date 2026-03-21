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
  Drawer,
  Grid,
  Stack,
} from "@mui/material";
import { Sidebar } from "../components/Sidebar";

type LogType = {
  id: number;
  type: string;
  value: number;
};

const drawerWidth = 220;

export default function Dashboard() {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(localStorage.getItem("token"));
    setMounted(true);
  }, []);

  // ✅ Hook luôn được gọi
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["health-logs"],
    queryFn: async () => {
      const res = await api.get("/health?userId=1");
      return res.data;
    },
    enabled: !!token, // 👈 control ở đây
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/");
  };
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
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Sidebar />
      </Drawer>

      {/* Main */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Health Dashboard</Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          {isLoading && (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          )}

          {error && <Typography color="error">Failed to load data</Typography>}

          {!isLoading && !error && data.length === 0 && (
            <Typography>No data available</Typography>
          )}

          <Grid container spacing={3}>
            {data?.map((item: LogType) => (
              <Stack key={item.id}>
                <Card
                  sx={{
                    borderRadius: 4,
                    p: 1,
                    boxShadow: 2,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      {item.type}
                    </Typography>

                    <Typography variant="h4" fontWeight="bold">
                      {item.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
