import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: "https://alex.party",
  markdown:{
    syntaxHighlight:'prism',
    drafts: true,
  },
  integrations: [mdx(), sitemap(), vue()],
});
