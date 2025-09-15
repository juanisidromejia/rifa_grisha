import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "static", // Changed to static generation
  adapter: vercel({
    // Vercel adapter configuration for static output
    imageService: true,
  }),
  vite: {
    ssr: {
      external: ["@prisma/client"],
    },
  },
});
