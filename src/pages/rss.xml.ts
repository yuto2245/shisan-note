import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedArticles } from '../lib/articles';
import { SITE } from '../site.config';

export async function GET(context: APIContext) {
	const articles = await getPublishedArticles();
	return rss({
		title: SITE.title,
		description: SITE.description,
		site: context.site ?? 'http://localhost:4321',
		items: articles.map((article) => ({
			title: article.data.title,
			description: article.data.description,
			pubDate: article.data.publishedAt,
			link: `/articles/${article.id}/`,
			categories: [article.data.category, ...article.data.tags],
		})),
	});
}
