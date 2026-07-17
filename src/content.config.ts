import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
	schema: z.object({
		title: z.string().min(1),
		description: z.string().min(1).max(160),
		publishedAt: z.coerce.date(),
		updatedAt: z.coerce.date(),
		category: z.enum(['新NISA', '投資信託', '家計管理', '資産形成の基礎', '学習記録']),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		featured: z.boolean().default(false),
		image: z.string().min(1),
		author: z.string().min(1),
	}),
});

export const collections = { articles };
