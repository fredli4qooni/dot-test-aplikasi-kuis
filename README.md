# Aplikasi Kuis Interaktif (DOT Indonesia Internship Test)

Ini adalah sebuah aplikasi kuis interaktif yang dibangun sebagai bagian dari proses seleksi untuk program magang di **DOT Indonesia**. Proyek ini dikembangkan menggunakan React, Vite, dan Tailwind CSS, serta memenuhi semua kriteria teknis yang telah ditentukan.

## Fitur Utama

Aplikasi ini dilengkapi dengan serangkaian fitur untuk memberikan pengalaman kuis yang lengkap dan modern:

*   ✅ **Sistem Login**: Pengguna harus memasukkan nama untuk memulai sesi kuis, yang disimpan untuk personalisasi.
*   ✅ **Integrasi API Dinamis**: Soal-soal diambil secara *real-time* dari [Open Trivia Database API](https://opentdb.com/), memastikan konten yang selalu segar.
*   ✅ **Konfigurasi Kuis Fleksibel**: Jumlah dan tipe soal dapat dengan mudah diubah melalui kode di layanan API.
*   ✅ **Pelacakan Progres**: Tampilan antarmuka secara jelas menunjukkan nomor soal saat ini dan total soal yang harus dikerjakan.
*   ✅ **Timer Countdown**: Setiap sesi kuis memiliki batas waktu yang telah ditentukan, menambah elemen tantangan.
*   ✅ **Navigasi Soal Otomatis**: Setelah memilih jawaban, aplikasi akan secara otomatis menampilkan soal berikutnya.
*   ✅ **Penanganan Waktu Habis**: Jika waktu habis, kuis akan berhenti secara otomatis dan langsung menampilkan halaman hasil.
*   ✅ **Fitur Resume Kuis**: Progres kuis (soal, jawaban, sisa waktu) disimpan di `localStorage`. Jika browser tidak sengaja ditutup, pengguna dapat melanjutkan kuis dari titik terakhir.
*   ✅ **Halaman Hasil**: Setelah kuis selesai, pengguna akan melihat ringkasan skor yang mencakup jumlah jawaban benar, salah, dan total yang dijawab.

## Tech Stack

Proyek ini dibangun dengan menggunakan teknologi modern di ekosistem JavaScript:

*   **Framework**: ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
*   **Build Tool**: ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
*   **Styling**: ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
*   **Package Manager**: ![pnpm](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
*   **Routing**: `react-router-dom`
*   **Linting**: `ESLint`

## Struktur Proyek

Struktur folder proyek ini dirancang untuk skalabilitas dan kemudahan pemeliharaan dengan mengikuti prinsip *separation of concerns*.

```
/src
├── api/          # Logika untuk berinteraksi dengan API eksternal (quizService.js)
├── components/   # Komponen UI kecil yang dapat digunakan kembali
├── hooks/        # Custom hooks untuk logika yang dapat dipakai ulang
├── pages/        # Komponen yang merepresentasikan satu halaman penuh (LoginPage, QuizPage, ResultPage)
└── utils/        # Fungsi-fungsi bantuan (helper functions) seperti decodeHtml.js
```

## Memulai Proyek Secara Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di mesin lokal Anda.

### Prasyarat

Pastikan Anda telah menginstal perangkat lunak berikut:
*   [Node.js](https://nodejs.org/) (v18 atau lebih baru)
*   [pnpm](https://pnpm.io/installation)

### Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/fredli4qooni/dot-test-aplikasi-kuis.git
    ```
2.  **Masuk ke direktori proyek:**
    ```bash
    cd dot-test-aplikasi-kuis
    ```

3.  **Install semua dependencies:**
    ```bash
    pnpm install
    ```

4.  **Jalankan development server:**
    ```bash
    pnpm dev
    ```

5.  Buka browser Anda dan kunjungi `http://localhost:5173` (atau port lain yang ditampilkan di terminal).

## Skrip yang Tersedia

Dalam proyek ini, Anda dapat menjalankan beberapa skrip:

*   `pnpm dev`: Menjalankan aplikasi dalam mode development.
*   `pnpm build`: Mem-build aplikasi untuk production ke dalam folder `dist`.
*   `pnpm lint`: Menjalankan ESLint untuk menganalisis kode dan menemukan masalah.
*   `pnpm preview`: Menjalankan server lokal untuk melihat hasil build production.

## 🧠 Penjelasan Logika Inti

Beberapa bagian dari aplikasi ini memiliki logika yang menarik untuk dibahas:

### 1. Mekanisme Resume Kuis

Fitur ini dicapai dengan memanfaatkan `localStorage` dan hook `useEffect` di React.
*   **Penyimpanan**: Sebuah `useEffect` memantau perubahan pada state kuis (`currentQuestionIndex`, `userAnswers`, `timer`). Setiap kali ada perubahan, seluruh state sesi kuis disimpan sebagai satu objek JSON di `localStorage` dengan *key* `quizSession`.
*   **Pemuatan**: Saat komponen `QuizPage` pertama kali dimuat, `useEffect` utama akan memeriksa apakah `quizSession` ada di `localStorage`. Jika ada, state komponen akan diisi dengan data yang tersimpan, memungkinkan pengguna untuk melanjutkan kuis. Jika tidak, kuis baru akan dimulai dengan mengambil soal dari API.

### 2. Penanganan API Call di `React.StrictMode`

Selama development, `React.StrictMode` akan menjalankan `useEffect` dua kali saat komponen pertama kali dimuat untuk mendeteksi *side-effects* yang tidak diinginkan. Hal ini menyebabkan dua panggilan API dikirim secara bersamaan, yang memicu *rate limiting* (Error 429) dari API OpenTDB.

Solusi yang diimplementasikan adalah dengan menggunakan `useRef` untuk memastikan logika *fetch* hanya berjalan sekali.
*   Sebuah `ref` (`effectRan`) digunakan sebagai penanda.
*   Pada pemanggilan `useEffect` pertama di mode development, logika *fetch* dilewati, dan *cleanup function* akan mengubah nilai `ref` menjadi `true`.
*   Pada pemanggilan kedua, karena nilai `ref` sudah `true`, logika *fetch* akan dieksekusi.
*   Untuk lingkungan Vite, pengecekan `import.meta.env.DEV` digunakan untuk memastikan logika ini hanya aktif selama development.

---

Author :  **Fredli Fourqoni**