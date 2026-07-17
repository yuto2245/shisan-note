export const SITE = {
	title: '資産ノート',
	description: '暮らしを整えながら、長期の資産形成を学ぶための個人ブログです。',
	author: '資産ノート編集部',
};

export const CATEGORIES = [
	{ label: '新NISA', slug: 'nisa', description: '制度を急がず、基本から理解する' },
	{ label: '投資信託', slug: 'investment-trusts', description: '商品の仕組みと選び方を学ぶ' },
	{ label: '家計管理', slug: 'household-budget', description: '投資の前に暮らしの土台を整える' },
	{ label: '資産形成の基礎', slug: 'basics', description: '長く続けるための考え方を知る' },
	{ label: '学習記録', slug: 'learning', description: '調べたことと実践を記録する' },
] as const;

export type CategoryLabel = (typeof CATEGORIES)[number]['label'];
