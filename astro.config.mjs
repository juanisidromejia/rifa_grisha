import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server", // Add this line to enable server output
  adapter: vercel(),
  vite: {
    ssr: {
      external: ["@prisma/client"],
    },
  },
});
