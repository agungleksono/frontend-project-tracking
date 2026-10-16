# AFFA Project Tracking Frontend

Frontend aplikasi AFFA Project Tracking untuk mengelola dan memantau proses registrasi kasus merek dagang.

## Teknologi

- Vue 3
- TypeScript
- Vite
- Vuetify
- Vue Router

## Menjalankan proyek

Pastikan Node.js dan npm sudah terpasang, lalu jalankan:

```bash
npm install
cp .env.example .env
npm run dev
```

Aplikasi akan tersedia di `http://localhost:5173`.

## Konfigurasi environment

Salin `.env.example` menjadi `.env`, kemudian sesuaikan nilainya:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_API_BEARER_TOKEN=replace-with-the-backend-token
```

File `.env` tidak dilacak oleh Git agar konfigurasi lokal dan token tidak ikut terunggah.

## Perintah tersedia

```bash
npm run dev        # Menjalankan development server
npm run build      # Type-check dan membuat production build
npm run type-check # Memeriksa tipe TypeScript
```
