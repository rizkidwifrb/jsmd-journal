# Jurnal Studi Media Digital (JSMD)

Website jurnal statis untuk GitHub Pages. Dibuat dengan Vite + React, cocok untuk publikasi artikel PDF sederhana.

## Cara jalanin lokal

```bash
npm install
npm run dev
```

## Cara build

```bash
npm run build
```

## Deploy ke GitHub Pages

1. Buat repo baru di GitHub, misalnya `jsmd-journal`.
2. Upload semua file ini ke repo.
3. Buka Settings > Pages.
4. Source pilih GitHub Actions.
5. Push ke branch `main`, workflow akan build otomatis.

## Ganti artikel

Edit file:

```text
data/articles.js
```

Ganti PDF dummy di folder:

```text
public/articles/
```

## Catatan Google Scholar

- Setiap artikel punya halaman detail sendiri.
- Metadata `citation_*` dibuat otomatis saat halaman artikel dibuka.
- Ganti PDF dummy dengan PDF artikel asli yang teksnya bisa disalin.
- Submit link website ke Google Search Console.
