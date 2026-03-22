"use client";

import { Drawer, useMediaQuery } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { Providers } from "./providers";
import ThemeRegistry from "./ThemeRegistry";
import { drawerWidth } from "./config";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideSidebar = pathname === "/" || pathname === "/login" || pathname === "/register";
  const isMobile = useMediaQuery("(max-width:560px)");

  return (
    <ThemeRegistry>
      <Providers>
        <div style={{ display: "flex" }}>
          {/* ===== Desktop Sidebar ===== */}
          {!hideSidebar && !isMobile && (
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
          )}

          {/* ===== Main content ===== */}
          <main
            style={{
              flex: 1,
              paddingBottom: !hideSidebar && isMobile ? 70 : 0, // 👈 tránh bị che bởi bottom bar
            }}
          >
            {children}
          </main>
        </div>

        {/* ===== Mobile Sidebar (bottom bar) ===== */}
        {!hideSidebar && isMobile && <Sidebar />}

        <Toaster position="top-right" />
      </Providers>
    </ThemeRegistry>
  );
}