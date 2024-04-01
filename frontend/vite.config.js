import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },

    plugins: [
      react(),
      eslint({
        lintOnStart: true,
        failOnError: mode === "production",
      }),
    ],
    server: {
      proxy: {
        "/api": "http://localhost:8000",
      },
      // To automatically open the app in the browser whenever the server starts,
      // uncomment the following line:
      // open: true
    },
  };
});
