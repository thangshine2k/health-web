"use client";

import { Drawer } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { Providers } from "./providers";
import ThemeRegistry from "./ThemeRegistry";
import { drawerWidth } from "./config";
import { usePathname } from "next/navigation";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 👇 thêm dòng này
  const hideSidebar = pathname === "/" || pathname === "/login";

  return (
    <ThemeRegistry>
      <Providers>
        <div style={{ display: "flex" }}>
          {/* 👇 chỉ render khi KHÔNG phải login */}
          {!hideSidebar && (
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

          <main style={{ flex: 1 }}>
            {children}
          </main>
        </div>
      </Providers>
    </ThemeRegistry>
  );
}