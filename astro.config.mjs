import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import vue from "@astrojs/vue";
import react from "@astrojs/react";

// https://astro.build/config
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  site: "https://alex.party",
  markdown: {
    syntaxHighlight: "prism",
    drafts: true,
  },
  integrations: [mdx(), sitemap(), vue(), react()],
  output: "server",
  adapter: netlify(),
  server: {
    host: "0.0.0.0",
  },
});
