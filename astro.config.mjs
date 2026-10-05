// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://brandonwalkers.com",
  devToolbar: { enabled: false },
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes("/blog") })],
  redirects: {
    "/resume.html": "/resume",
    "/interests.html": "/interests",
    "/donate.html": "/donate",
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: false, // Disable to avoid injecting experimental Permissions-Policy headers
    },
  }),
});
