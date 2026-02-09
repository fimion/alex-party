import rss from '@astrojs/rss';
import {getCollection} from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from '../config';
import sanitizeHtml from 'sanitize-html';

const postImportResult = await getCollection('posts');
const posts = Object.values(postImportResult).reverse().filter((post) => !post.data.draft).map(async (post) => ({
	link: "/posts/"+post.id,
	title: post.data.title,
	pubDate: post.data.pubDate,
	content: sanitizeHtml(post.rendered.html),
}));


export const GET = async () => {

	const rssResponse = await rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		stylesheet: '/rss/styles.xsl',
		items: await Promise.all(posts),
	});
	rssResponse.headers.delete('Content-Type');
	rssResponse.headers.set('Content-Type', 'text/xml; charset=utf-8');
	rssResponse.headers.set('X-Content-Type-Options', 'nosniff');
	return rssResponse;
}

