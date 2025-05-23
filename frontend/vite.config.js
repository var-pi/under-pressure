import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslint()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".ts", ".json", ".vue"],
  },
  server: {
    port: 8080,
  },
});
