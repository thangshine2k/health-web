"use client";

import { Drawer } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { Providers } from "./providers";
import ThemeRegistry from "./ThemeRegistry";
import { drawerWidth } from "./config";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry>
      <Providers>
        <div style={{ display: "flex" }}>
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

          <main style={{ flex: 1 }}>
            {children}
          </main>
        </div>
      </Providers>
    </ThemeRegistry>
  );
}