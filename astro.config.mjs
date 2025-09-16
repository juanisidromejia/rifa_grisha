import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server", // Changed to server-side rendering for API routes
  adapter: vercel({
    // Vercel adapter configuration for server output
    imageService: true,
  }),
  vite: {
    ssr: {
      external: ["@prisma/client"],
    },
  },
});
