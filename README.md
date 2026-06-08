# 🕵️‍♂️ Who is me - Game Tebak Kata & Peran (Impostor)

**Who is me** adalah sebuah game berbasis web (*responsive web app*) yang dirancang khusus untuk dimainkan bersama teman-teman atau keluarga dalam satu perangkat (*One-Device Pass Game* / Oper HP). Game ini mengadaptasi mekanik permainan populer seperti *Undercover* atau *Word Wolf*, di mana pemain harus mendiskusikan kata kunci mereka untuk menemukan siapa penyusup di antara mereka.

Aplikasi ini dibangun menggunakan arsitektur web murni (HTML, CSS, JavaScript) secara modular dan memanfaatkan **Local Storage** bawaan browser untuk mengelola database kata kunci secara mandiri tanpa memerlukan database server.

Link Hosting: https://rayanhakim.github.io/Who-Is-Me/

---

## 🌟 Fitur Utama

* **Mobile-First & Responsive:** Tampilan antarmuka yang bersih, minimalis, dan cerah dengan tema warna **Putih-Oranye**, dioptimalkan sepenuhnya untuk layar Handphone.
* **Sistem Pendaftaran Dinamis (Oper HP):** Pendaftaran dilakukan satu per satu secara rahasia. Pemain memasukkan nama -> melihat kata kunci -> mengoper HP ke pemain berikutnya, mencegah kebocoran informasi.
* **Pengaturan Peran Fleksibel:** Jumlah kuota peran untuk **Civilian**, **Undercover**, dan **Mr. White** dapat diatur secara bebas sebelum game dimulai.
* **Database 80 Pasangan Kata Bawaan:** Dilengkapi dengan 80 pasangan kata sehari-hari yang memiliki tingkat kemiripan sangat tinggi (ambigu) sehingga membuat game menjadi lebih menantang.
* **Peran & Kata yang Diacak Total:** Posisi kata `wordA` dan `wordB` akan diacak secara otomatis saat permainan dimulai, sehingga pola kata Civilian/Undercover tidak akan bisa dihafalkan oleh pemain.
* **Manajemen Kata Kustom (Local Storage):** Pemain dapat menambahkan pasangan kata buatan mereka sendiri langsung dari aplikasi dan akan tersimpan secara permanen di browser mereka.
* **Fitur Intip Database:** Menyediakan tombol khusus untuk melihat seluruh daftar kata kunci yang terdaftar di dalam sistem.
* **Logika Kemenangan Otomatis:** Sistem akan langsung menghitung sisa pemain yang hidup setiap kali fase eliminasi dilakukan dan otomatis mengumumkan kubu pemenang (Civilian, Undercover, atau Mr. White).

---

## 📂 Struktur File Proyek

Proyek ini dipisahkan secara modular berdasarkan fungsinya agar kodenya rapi dan mudah dikembangkan lebih lanjut:

```text
├── index.html          # Struktur utama UI dan manajemen Screen aplikasi
├── style.css           # Desain Mobile-First, Variabel Warna, dan Layout Grid
└── js/
    ├── storage.js      # Mengelola data kata kunci bawaan (80 kata) dan Local Storage
    ├── game.js         # Logika pengacakan peran, pembagian kata, dan kalkulasi pemenang
    └── app.js          # Controller DOM, event listener, dan alur transisi antar layar
