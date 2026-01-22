# Fullstack App (Go + Vite)

Repositori ini berisi source code aplikasi yang terbagi menjadi dua layanan:

- **Backend:** `be-testnds` (Golang)
- **Frontend:** `fe-testnds` (Vite + TypeScript)

## 🛠 Prasyarat

Pastikan komputer kamu sudah terinstall:

- [Go](https://go.dev/dl/)
- [Node.js](https://nodejs.org/) & NPM

---

## Panduan Instalasi & Menjalankan

### 1. Setup Backend (Golang)

Buka terminal, masuk ke folder backend, dan setup environment variable.

```bash
cd be-testnds
```

Buat file .env di dalam folder be-testnds dengan isi berikut:

# Database Config (Sesuaikan DB Postgres kamu)

```bash
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=testnds_db
DB_PORT=5432
DB_SSLMODE=disable
DB_TIMEZONE=Asia/Jakarta
```

Jalankan Server:

```bash
# Download dependencies
go mod tidy

# Jalankan aplikasi
go run main.go
```

Server backend akan berjalan di http://localhost:8080

### 1. Setup Frontend (Vite)

```bash
cd fe-testnds
```

Buat file .env di dalam folder fe-testnds dengan isi berikut:

```bash
# URL Backend (Pastikan sama dengan PORT backend)
VITE_API_BASE_URL=http://localhost:8080
```

Jalankan Client

```bash
# Install dependencies
npm install

# Jalankan mode development
npm run dev

# Atau
yarn install
yarn dev

```

### Catatan Penting

CORS: Pastikan di kode Golang (main.go) kamu sudah mengaktifkan CORS untuk mengizinkan request dari URL frontend (biasanya http://localhost:5173 untuk VITE).

Environment Variable: Untuk Frontend (Vite), setiap variabel .env yang ingin dibaca oleh browser wajib diawali dengan VITE
