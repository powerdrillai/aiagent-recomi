import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/openApi": {
        target: "http://10.107.0.210:3300/api/v1/team",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/openApi/, ""),
      },
    },
  },
});
