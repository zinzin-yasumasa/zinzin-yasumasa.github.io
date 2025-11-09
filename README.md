# 杉本 泰正（YASSAN）ポートフォリオサイト

**「人事を尽くし、運を天に任す」**

製造技術×古物商×学び。数字・仕組み・人の三点同時最適を追求するポートフォリオサイトです。

## 🌟 特徴

- **Astro + TypeScript + Tailwind CSS** による高速SSG
- **ダークモード対応**（システム設定に追従 + 手動切替）
- **完全レスポンシブデザイン**（320px〜対応）
- **アクセシビリティ重視**（ARIAラベル、スキップリンク、適切な見出し階層）
- **日本語最適化**（Noto Sans JP、適切な行間・字間）
- **SEO対応**（メタタグ、OGP、構造化データ）
- **GitHub Pages 自動デプロイ**

## 📋 要件

- Node.js 20.x 以上
- npm 10.x 以上

## 🚀 クイックスタート

> 💡 **GitHub Pagesに公開したい方は、以下のデプロイガイドをご覧ください:**
> - **[⚡ QUICKSTART.md](./QUICKSTART.md)** - 最短5ステップで公開
> - **[📖 STEP_BY_STEP.md](./STEP_BY_STEP.md)** - 画像付き詳細ガイド
> - **[📚 GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)** - 完全ガイド

### 1. リポジトリのクローン

```bash
git clone https://github.com/yourusername/yassan-portfolio.git
cd yassan-portfolio
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:4321` を開いてください。

### 4. プロダクションビルド

```bash
npm run build
```

ビルド成果物は `dist/` ディレクトリに生成されます。

### 5. プレビュー

```bash
npm run preview
```

ビルドしたサイトをローカルでプレビューできます。

## 📝 利用可能なコマンド

| コマンド          | 説明                                 |
| ----------------- | ------------------------------------ |
| `npm run dev`     | 開発サーバーを起動（ホットリロード） |
| `npm run build`   | プロダクションビルド                 |
| `npm run preview` | ビルド結果をプレビュー               |
| `npm run format`  | Prettierでコード整形                 |
| `npm run lint`    | ESLintでコードチェック               |
| `npm run test`    | Playwrightでテスト実行               |
| `npm run test:ui` | PlaywrightのUIモードでテスト         |

## 🔧 カスタマイズ方法

### コンテンツの編集

すべてのコンテンツは `src/content/profile.yaml` に集約されています。

```yaml
# src/content/profile.yaml
name: '杉本 泰正（YASSAN）'
motto: '人事を尽くし、運を天に任す'
# ... その他の設定
```

このファイルを編集するだけで、サイト全体の内容が更新されます。

### 環境変数の設定

連絡先情報は環境変数で上書き可能です。`.env` ファイルを作成してください：

```bash
# .env
PUBLIC_EMAIL=your@email.example
PUBLIC_GITHUB=https://github.com/yourname
PUBLIC_X=https://x.com/yourhandle
PUBLIC_YOUTUBE=https://youtube.com/@yourchannel
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

`.env.example` をコピーして編集してください：

```bash
cp .env.example .env
```

### お問い合わせフォームの設定

1. [Formspree](https://formspree.io/) でアカウントを作成
2. 新しいフォームを作成してエンドポイントURLを取得
3. `.env` に `PUBLIC_FORMSPREE_ENDPOINT` を設定

### 画像の差し替え

#### OG画像（SNSシェア用）

`public/og.jpg` を差し替えてください。推奨サイズ：1200×630px

#### ファビコン

`public/favicon.svg` を差し替えてください。

## 🌐 GitHub Pages へのデプロイ

### 初回セットアップ

1. **GitHubリポジトリの作成**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/yassan-portfolio.git
git push -u origin main
```

2. **astro.config.mjs の設定**

`site` と `base` を自分のリポジトリに合わせて変更：

```js
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/yassan-portfolio', // リポジトリ名がルートでない場合
  // ...
});
```

ユーザーサイト（`yourusername.github.io`）の場合は `base: '/'` のままでOK。

3. **GitHub Pagesの設定**

- リポジトリの `Settings` → `Pages` へ移動
- `Source` を **GitHub Actions** に変更
- `Actions` タブで自動的にワークフローが実行されます

4. **デプロイ完了**

数分後、`https://yourusername.github.io/` でサイトが公開されます！

### カスタムドメインの設定（任意）

1. DNSプロバイダーでCNAMEレコードを追加：

```
www.yourdomain.com → yourusername.github.io
```

2. リポジトリの `Settings` → `Pages` → `Custom domain` に `www.yourdomain.com` を入力

3. `Enforce HTTPS` にチェック

4. `public/CNAME` ファイルを作成：

```
www.yourdomain.com
```

## 🎨 デザインシステム

### カラーパレット

- **プライマリ**: `rgb(59, 130, 246)` - Blue
- **アクセント**: `rgb(139, 92, 246)` - Purple
- **背景（Light）**: `rgb(255, 255, 255)` / `rgb(249, 250, 251)`
- **背景（Dark）**: `rgb(17, 24, 39)` / `rgb(31, 41, 55)`

### タイポグラフィ

- **本文**: Noto Sans JP（ウェイト: 400, 500, 700）
- **見出し**: Noto Serif JP（ウェイト: 500, 700）
- **行間**: 1.8（日本語最適化）
- **字間**: 0.04em

### スペーシング

- **セクション間**: `py-20`（80px）
- **要素間**: `space-y-6`（24px）
- **ボーダー半径**: `rounded-2xl`（16px）

## 📊 パフォーマンス目標

Lighthouse スコア（モバイル）:

- ✅ Performance: ≥95
- ✅ Accessibility: ≥95
- ✅ Best Practices: ≥95
- ✅ SEO: ≥95

## 🧪 テスト

Playwrightによる自動テストを実装しています。

```bash
# テスト実行（ヘッドレス）
npm run test

# UIモードでテスト
npm run test:ui
```

テストケース：

- ページタイトルの確認
- 主要セクションの表示確認
- ナビゲーションの動作確認
- ダークモード切替の動作確認
- レスポンシブデザインの確認
- アクセシビリティの確認

## 📁 プロジェクト構造

```
/
├── public/
│   ├── favicon.svg          # ファビコン
│   ├── og.jpg               # OG画像
│   └── og.svg               # OG画像（SVG版）
├── src/
│   ├── components/          # Astroコンポーネント
│   │   ├── BasicInfo.astro
│   │   ├── Contact.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Seo.astro
│   │   ├── SiteFooter.astro
│   │   ├── Story.astro
│   │   ├── Study.astro
│   │   ├── ThemeToggle.astro
│   │   ├── Timeline.astro
│   │   ├── Values.astro
│   │   ├── Vision.astro
│   │   └── Work.astro
│   ├── content/
│   │   └── profile.yaml     # コンテンツデータ
│   ├── layouts/
│   │   └── Layout.astro     # ベースレイアウト
│   ├── lib/
│   │   └── profile.ts       # プロファイルローダー
│   ├── pages/
│   │   └── index.astro      # トップページ
│   └── styles/
│       └── global.css       # グローバルスタイル
├── tests/
│   └── ui.spec.ts           # UIテスト
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions
├── astro.config.mjs         # Astro設定
├── tailwind.config.js       # Tailwind設定
├── tsconfig.json            # TypeScript設定
├── playwright.config.ts     # Playwright設定
├── .prettierrc.json         # Prettier設定
├── .eslintrc.json           # ESLint設定
└── package.json
```

## 🔒 ライセンス

MIT License

Copyright (c) 2025 YASSAN / 杉本 泰正

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🤝 コントリビューション

このプロジェクトは個人ポートフォリオサイトですが、改善提案や不具合報告は歓迎します。

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📞 お問い合わせ

- **Email**: your@email.example
- **GitHub**: [https://github.com/yourname](https://github.com/yourname)
- **X (Twitter)**: [https://x.com/yourhandle](https://x.com/yourhandle)
- **YouTube**: [https://youtube.com/@yourchannel](https://youtube.com/@yourchannel)

---

Built with ❤️ using [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com)
