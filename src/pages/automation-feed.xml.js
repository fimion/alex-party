import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../config';
import sanitizeHtml from 'sanitize-html';

const postImportResult = import.meta.glob('./posts/**/*.{md,mdx}', { eager: true });
const posts = Object.values(postImportResult);


export const get = () =>
	rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		stylesheet:'/rss/styles.xsl',
		items: posts.filter((post) => !post.frontmatter.draft&&!post.frontmatter.rssOnly).map((post) => ({
			link: post.url,
			title: post.frontmatter.title,
			pubDate: post.frontmatter.pubDate,
			content: sanitizeHtml(post.compiledContent()),
		})),
	});
