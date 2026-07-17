import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES, type CategoryLabel } from '../site.config';

export type Article = CollectionEntry<'articles'>;

export async function getPublishedArticles(): Promise<Article[]> {
	const articles = await getCollection('articles', ({ data }) => !import.meta.env.PROD || !data.draft);
	return articles.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export function getCategorySlug(label: CategoryLabel): string {
	return CATEGORIES.find((category) => category.label === label)?.slug ?? 'articles';
}

export function getCategoryBySlug(slug: string) {
	return CATEGORIES.find((category) => category.slug === slug);
}

export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat('ja-JP', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(date);
}

export function estimateReadingMinutes(body: string): number {
	const text = body.replace(/```[\s\S]*?```/g, '').replace(/[#*_>`\[\]()-]/g, '');
	return Math.max(1, Math.ceil(text.length / 500));
}
