"use client";

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import BedIcon from "@mui/icons-material/Bed";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import { useRouter, usePathname } from "next/navigation";
import React from "react";

interface MenuItemType {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItemType[] = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Water", icon: <WaterDropIcon />, path: "/water" },
  { label: "Sleep", icon: <BedIcon />, path: "/sleep" },
  { label: "Nutrition", icon: <RestaurantIcon />, path: "/nutrition" },
  { label: "Workout", icon: <FitnessCenterIcon />, path: "/workout" },
];

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Stack sx={{ pt: 2 }}>
      <List>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <ListItem disablePadding key={item.label}>
              <ListItemButton
                onClick={() => router.push(item.path)}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  mb: 1,
                  backgroundColor: isActive ? "#E3F2FD" : "transparent",
                  "&:hover": { backgroundColor: "#BBDEFB" },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
};