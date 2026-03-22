"use client";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  useMediaQuery,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import BedIcon from "@mui/icons-material/Bed";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import { useRouter, usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Water", icon: <WaterDropIcon />, path: "/water" },
  { label: "Sleep", icon: <BedIcon />, path: "/sleep" },
  { label: "Nutrition", icon: <RestaurantIcon />, path: "/nutrition" },
  { label: "Workout", icon: <FitnessCenterIcon />, path: "/workout" },
];

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isMobile = useMediaQuery("(max-width:560px)");

  return (
    <Stack
      sx={{
        pt: isMobile ? 0 : 2,

        // 👉 mobile: thành bottom bar
        position: isMobile ? "fixed" : "relative",
        bottom: isMobile ? 0 : "auto",
        left: isMobile ? 0 : "auto",
        width: isMobile ? "100%" : "auto",
        zIndex: 1200,
        background: isMobile ? "#fff" : "transparent",
        borderTop: isMobile ? "1px solid #eee" : "none",
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          justifyContent: "space-around",
        }}
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <ListItem
              disablePadding
              key={item.label}
              sx={{
                width: isMobile ? "auto" : "100%",
              }}
            >
              <ListItemButton
                onClick={() => router.push(item.path)}
                sx={{
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "center",
                  borderRadius: 2,
                  mx: isMobile ? 0 : 1,
                  mb: isMobile ? 0 : 1,
                  gap: 2,
                  py: 1,
                  backgroundColor: isActive ? "#E3F2FD" : "transparent",
                  "&:hover": { backgroundColor: "#BBDEFB" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    color: isActive ? "#1976d2" : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {/* 👉 Ẩn text khi mobile */}
                {!isMobile && <ListItemText primary={item.label} />}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
};
