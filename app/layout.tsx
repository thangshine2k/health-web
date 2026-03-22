"use client";

import { Drawer } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { Providers } from "./providers";
import ThemeRegistry from "./ThemeRegistry";
import { drawerWidth } from "./config";
import LayoutClient from "./LayoutClient";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
