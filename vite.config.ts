import path from "path";
import solid from "solid-start/vite";
import staticAdapter from "solid-start-static";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    base: "/awa/",
    plugins: [solid({ adapter: staticAdapter() })],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
