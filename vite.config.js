// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        detail: resolve(__dirname, "./detail.html"),
        cart: resolve(__dirname, "./cart.html"),
        checkout: resolve(__dirname, "./checkout.html"),
        login: resolve(__dirname, "./login.html"),
        shop: resolve(__dirname, "./shop.html"),
      },
    },
  },
});