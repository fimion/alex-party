/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@staticcms/core/dist/index.d.ts" />

export type BlogPostOptions = {
    title: string;
    pubDate: string|Date;
    updatedDate: string|Date;
    rssOnly?: boolean;
    draft?: boolean;
    style?: string;
}
