import { resolve } from "path";
import { defineConfig } from "vite";

console.log(process.env.NODE_ENV);

export default defineConfig({
  base: process.env.NODE_ENV === "development" ? undefined : "/framework-free/",
  build: {
    rollupOptions: {
      input: resolve(__dirname, "src/index.html")
    },
  },
});
