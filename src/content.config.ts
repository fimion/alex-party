// 1. Import utilities from `astro:content`
import {defineCollection} from 'astro:content';

// 2. Import loader(s)
import {glob} from 'astro/loaders';

// 3. Import Zod
import {z} from 'astro/zod';

// 4. Define your collection(s)
const posts = defineCollection({
  loader: glob({pattern: "**/*.{md,mdx}", base: "./src/pages/posts"}),
  schema: z.object({
    layout: z.string().default("../../layouts/BlogPost.astro"),
    title: z.string(),
    pubDate: z.coerce.date(),
    draft: z.coerce.boolean(),
    rssOnly: z.coerce.boolean(),
    style: z.string().optional(),
  })
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = {posts};
