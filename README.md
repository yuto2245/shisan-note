# 資産ノート

暮らしを整えながら、長期の資産形成を学ぶための日本語ブログです。Cloudflare Pagesで無料運営できる静的サイトとして作っています。

## 方針

- 記事はMarkdownファイルで管理する
- 通常のページ閲覧では、テーマ切替以外のJavaScriptを使わない
- データベース、CMS、認証、コメント機能は持たない
- 特定の金融商品を推奨せず、学習と経験の共有を目的にする

## 技術構成

- Astro 7（静的HTML生成）
- TypeScript（strict）
- Astro Content Collections + Markdown
- CSS Custom Properties
- Node.js 24 LTS / npm
- GitHub / Cloudflare Pages

Vue、React、Tailwind CSS、データベース、Cloudflareアダプターは使用していません。現在は完全な静的サイトなので、Cloudflare Pages用アダプターも不要です。

## ディレクトリ構成

```text
public/
  images/               記事画像・OG画像
src/
  components/           共通UI
  content/articles/     Markdown記事
  layouts/              共通HTMLレイアウト
  lib/                   記事取得・日付処理
  pages/                 URLに対応するページ
  styles/global.css     サイト全体のCSS
  content.config.ts     記事frontmatterの検証
  site.config.ts        サイト名・カテゴリー
astro.config.mjs        Astro設定・公開URL設定
```

## 必要環境

- Node.js 24 LTS（Astro 7の最低要件はNode.js 22.12.0）
- npm 11以上を推奨
- Git

このリポジトリの`.nvmrc`はNode.js 24を指定しています。

## 初期セットアップ

```bash
npm install
```

秘密情報は不要です。公開URLをローカルで指定したい場合だけ、`.env.example`をコピーして`.env`を作り、`SITE_URL`を設定します。`.env`はGit管理されません。

## 開発サーバー

```bash
npm run dev
```

表示された`http://localhost:4321`をブラウザで開きます。停止はターミナルで`Ctrl + C`です。

## 記事を追加する

1. `src/content/articles/`に、英数字とハイフンのファイル名で`.md`を作る
2. 既存記事を参考にfrontmatterを書く
3. Markdownで本文を書く
4. `npm run check`を実行する

```yaml
---
title: "記事タイトル"
description: "検索結果や記事カードに表示する説明"
publishedAt: 2026-07-18
updatedAt: 2026-07-18
category: "資産形成の基礎"
tags: ["初心者", "長期投資"]
draft: true
featured: false
image: "/images/example.svg"
author: "資産ノート編集部"
---
```

利用できるカテゴリーは`src/site.config.ts`と`src/content.config.ts`で管理しています。`draft: true`の記事は本番ビルドに含まれません。ファイル名が記事URLになります。

## 画像を追加する

1. 画像を`public/images/`へ置く
2. 記事の`image`へ`/images/ファイル名`を指定する
3. 横長（おおむね12:7）、幅960px以上を目安にする
4. 写真はWebPまたはAVIF、図はSVGを推奨する

画像の権利と個人情報を確認してから追加してください。

## 品質確認

```bash
npm run check   # Astro・TypeScriptの型チェック
npm run lint    # 現在はcheckと同じ検証
npm run build   # check後に本番用ファイルをdist/へ生成
npm run preview # build後の表示確認
```

`dist/`は生成物なのでGitには含めません。

## GitHubへpushする

GitHub上で空のリポジトリを作成したあと、このフォルダーで実行します。

```bash
git add .
git commit -m "Create initial asset-building blog"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/shisan-note.git
git push -u origin main
```

認証情報や`.env`をコミットしないでください。`git status`と`git diff --staged`で対象を確認してからコミットします。

## Cloudflare Pagesへ公開する

Cloudflare公式のAstro向けPages設定に合わせています。

1. [Cloudflare dashboard](https://dash.cloudflare.com/)へログインする
2. 左メニューの「Workers & Pages」を開く
3. 「Create application」を押す
4. 「Pages」タブを選び、「Connect to Git」または「Import an existing Git repository」を押す
5. 初回だけGitHub連携画面で「Install & Authorize」を押し、`shisan-note`リポジトリへのアクセスを許可する
6. リポジトリ一覧で`shisan-note`を選び、「Begin setup」を押す
7. 「Set up builds and deployments」で次を入力する

| 項目 | 入力値 |
| --- | --- |
| Project name | `shisan-note`（空いていない場合は別名） |
| Production branch | `main` |
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | 空欄 |

8. 環境変数は初回公開では追加しない。Cloudflareが提供する`CF_PAGES_URL`をサイトURLとして使用する
9. 「Save and Deploy」を押す
10. ビルドが成功したら「Continue to project」を押し、表示された`*.pages.dev` URLでトップ・記事・404を確認する

Node.jsはリポジトリ直下の`.nvmrc`により24系が選ばれます。画面で明示する場合は「Settings」→「Environment variables」で`NODE_VERSION`を作り、値を`24`にします。Cloudflare Pagesのv3 build imageは`.nvmrc`に対応しています。

独自の公開URLを使う場合は、同じ環境変数画面で`SITE_URL`へ`https://`から始まるURLを設定して再デプロイします。`SITE_URL`未設定時は`CF_PAGES_URL`、ローカルでは`http://localhost:4321`を使用します。

参考：

- [Cloudflare Pages: Deploy an Astro site](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
- [Cloudflare Pages: Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)
- [Cloudflare Pages: Build image](https://developers.cloudflare.com/pages/configuration/build-image/)

## 独自ドメイン（初回公開後）

まず`pages.dev`で正常表示を確認します。その後、Pagesプロジェクトの「Custom domains」→「Set up a custom domain」からドメインを入力します。CloudflareでDNSを管理しているドメインは案内に従ってレコードを追加します。設定後は`SITE_URL`も独自ドメインへ変更し、再デプロイしてください。

## 環境変数

| 名前 | 必須 | 用途 |
| --- | --- | --- |
| `SITE_URL` | いいえ | canonical、OGP、サイトマップの基準URL |
| `CF_PAGES_URL` | Cloudflareが自動設定 | `SITE_URL`未設定時の公開URL |

APIキー、パスワード、トークンは使いません。

## よくあるエラー

- `npm: command not found`: Node.js 24 LTSをインストールし、ターミナルを開き直す
- 記事のbuildエラー: frontmatterの項目、日付形式、カテゴリー名を確認する
- CloudflareでAstroのNode要件エラー: `.nvmrc`がリポジトリ直下にあるか確認する
- 画像が表示されない: `public/images/`内の名前と`image`のパス、大文字小文字を確認する
- canonicalがlocalhostになる: 公開環境の`SITE_URL`または`CF_PAGES_URL`を確認する
- CloudflareがGitHubリポジトリを表示しない: GitHubのSettings → Applications → Cloudflare Workers and Pages → ConfigureでRepository accessを確認する

## 今後の拡張候補

- 記事数が増えたときのページネーション
- タグ別一覧とサイト内検索
- 実在する運営者情報・問い合わせ方法への更新
- OGP画像のPNG化と記事ごとの自動生成
- Cloudflare Web Analytics（導入時はプライバシーポリシーも更新）

最初はMarkdown記事の更新と定期的な情報確認だけで運営できる状態を保ちます。
