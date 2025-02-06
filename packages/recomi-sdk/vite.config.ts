import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "RecomiSDK",
      fileName: "RecomiSDK",
    },
    sourcemap: true, // 输出.map文件
  },
});
