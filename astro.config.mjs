// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/server";

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
});
