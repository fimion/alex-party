import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../config';
import sanitizeHtml from 'sanitize-html';

const postImportResult = import.meta.glob('./posts/**/*.{md,mdx}', { eager: true });
const posts = Object.values(postImportResult).reverse().filter((post) => !post.frontmatter.draft&&!post.frontmatter.rssOnly).map(async (post) => ({
	link: post.url,
	title: post.frontmatter.title,
	pubDate: post.frontmatter.pubDate,
	content: sanitizeHtml(await post.compiledContent()),
}));


export const GET = async () =>{
	const rssResponse = await rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: await Promise.all(posts),
	});
	rssResponse.headers.delete('Content-Type');
	rssResponse.headers.set('Content-Type', 'text/xml; charset=utf-8');
	rssResponse.headers.set('X-Content-Type-Options', 'nosniff');
	return rssResponse;
}

