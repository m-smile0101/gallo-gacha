# ギャロガチャ

好きなバンド「ギャロ」の楽曲をランダムで引ける音楽ガチャアプリです。

? https://gallo-gacha.vercel.app

---

## 概要

ボタンを押すと、ギャロの楽曲がランダムで1曲表示されます。  
「今日はどの曲？」という感覚で楽しめるシンプルなガチャです。

---

## 特徴

- ランダムで楽曲を表示
- Spotifyの楽曲情報を利用
- シンプルで軽い動作
- スマホでも利用可能

---

## 技術構成
- Next.js（App Router）
- TypeScript
- Tailwind CSS
- Vercel（デプロイ）
- GitHub（コード管理）

---

## ディレクトリ構成（ざっくり）

.
├─ app
│   ├─ layout.tsx
│   ├─ page.tsx
│
├─ data
│   └─ songs.ts
│
├─ public
│
├─ next.config.js
├─ package.json


---

## データ構造

- songs.ts に配列で楽曲データを持っている

type Song = {
  id: string;
  title: string;
  artist: string;
  spotifyTrackId: string;
  comment?: string;
};


---

## 使い方

1. 上のURLにアクセス
2. ボタンを押す
3. 曲が表示される

---

## 注意

※本サイトは非公式のファン制作ツールです。  
※楽曲情報の権利は各権利者に帰属します。

---

## 今後やりたいこと

- 曲数の追加
- デザイン・演出の強化
- Spotify再生の改善
- シェア機能の強化

---

## 作者

個人制作