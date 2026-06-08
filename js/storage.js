const StorageManager = {
    // Total 80 pasangan kata yang mirip, ambigu, dan menjebak
    defaultWords: [
        { wordA: "Kopi", wordB: "Teh" },
        { wordA: "Laptop", wordB: "Komputer" },
        { wordA: "Pantai", wordB: "Laut" },
        { wordA: "Kucing", wordB: "Harimau" },
        { wordA: "Sepakbola", wordB: "Futsal" },
        { wordA: "Kereta", wordB: "KRL" },
        { wordA: "Rumah", wordB: "Apartemen" },
        { wordA: "Jaket", wordB: "Sweter" },
        { wordA: "Es Krim", wordB: "Gelato" },
        { wordA: "Sendok", wordB: "Garpu" },
        { wordA: "Buku", wordB: "Novel" },
        { wordA: "Kacamata", wordB: "Lensa Kontak" },
        { wordA: "Sepeda", wordB: "Sepeda Motor" },
        { wordA: "Kue", wordB: "Roti" },
        { wordA: "Bantal", wordB: "Guling" },
        { wordA: "Televisi", wordB: "Bioskop" },
        { wordA: "Kemeja", wordB: "Kaos" },
        { wordA: "Gitar", wordB: "Ukulele" },
        { wordA: "Jeruk", wordB: "Lemon" },
        { wordA: "Sandal", wordB: "Sepatu" },
        { wordA: "Madrasah", wordB: "Pesantren" },
        { wordA: "Susu", wordB: "Yogurt" },
        { wordA: "Dokter", wordB: "Perawat" },
        { wordA: "Pasar", wordB: "Swalayan" },
        { wordA: "Dompet", wordB: "Tas" },
        { wordA: "Hujan", wordB: "Gerimis" },
        { wordA: "Sungai", wordB: "Danau" },
        { wordA: "Ayam", wordB: "Bebek" },
        { wordA: "Minyak", wordB: "Mentega" },
        { wordA: "Pena", wordB: "Pensil" },
        { wordA: "Emas", wordB: "Perak" },
        { wordA: "Madu", wordB: "Sirup" },
        { wordA: "Kambing", wordB: "Domba" },
        { wordA: "Soto", wordB: "Bakso" },
        { wordA: "Garam", wordB: "Penyedap Rasa" },
        { wordA: "Handphone", wordB: "Tablet" },
        { wordA: "Bioskop", wordB: "Netflix" },
        { wordA: "Kipas Angin", wordB: "AC" },
        { wordA: "Topi", wordB: "Peci" },
        { wordA: "Lilin", wordB: "Senter" },
        { wordA: "Taksi", wordB: "Angkot" },
        { wordA: "Tangga", wordB: "Eskalator" },
        { wordA: "Hotel", wordB: "Penginapan" },
        { wordA: "Sapu", wordB: "Kemoceng" },
        { wordA: "Kertas", wordB: "Kardus" },
        { wordA: "Piring", wordB: "Mangkok" },
        { wordA: "Bandara", wordB: "Stasiun" },
        { wordA: "Singa", wordB: "Macan" },
        { wordA: "Tepung", wordB: "Aci" },
        { wordA: "Handuk", wordB: "Keset" },
        { wordA: "Martabak Manis", wordB: "Kue Bandung" },
        { wordA: "Ketoprak", wordB: "Gado-Gado" },
        { wordA: "Cermin", wordB: "Kaca" },
        { wordA: "Lemari", wordB: "Laci" },
        { wordA: "Pagar", wordB: "Tembok" },
        { wordA: "Helm", wordB: "Topi Baja" },
        { wordA: "Wifi", wordB: "Kuota Data" },
        { wordA: "Sajadah", wordB: "Karpet" },
        { wordA: "Gelas", wordB: "Cangkir" },
        { wordA: "Payung", wordB: "Jas Hujan" },
        { wordA: "Celana", wordB: "Rok" },
        { wordA: "Kura-Kura", wordB: "Penyu" },
        { wordA: "Kera", wordB: "Monyet" },
        { wordA: "Tahu", wordB: "Tempe" },
        { wordA: "Cabai", wordB: "Lada" },
        { wordA: "Bawang Merah", wordB: "Bawang Putih" },
        { wordA: "Semangka", wordB: "Melon" },
        { wordA: "Kulkas", wordB: "Freezer" },
        { wordA: "Sepatu", wordB: "Boot" },
        { wordA: "Gantungan Baju", wordB: "Lemari Pakaian" },
        { wordA: "Kardus", wordB: "Kotak Kayu" },
        { wordA: "Selimut", wordB: "Bedcover" },
        { wordA: "Gorden", wordB: "Kelambu" },
        { wordA: "Ember", wordB: "Bak Air" },
        { wordA: "Gayung", wordB: "Shower" },
        { wordA: "Bedak", wordB: "Foundation" },
        { wordA: "Lipstik", wordB: "Lipbalm" },
        { wordA: "Keripik", wordB: "Kerupuk" },
        { wordA: "Mete", wordB: "Kacang Tanah" },
        { wordA: "Sisir", wordB: "Sikat Rambut" }
    ],

    init() {
        // Mengubah key ke v5 agar browser mendeteksi database 80 kata yang baru
        if (!localStorage.getItem("who_is_me_v5")) {
            localStorage.setItem("who_is_me_v5", JSON.stringify(this.defaultWords));
        }
    },

    getWords() {
        this.init();
        return JSON.parse(localStorage.getItem("who_is_me_v5"));
    },

    addWordPair(wordA, wordB) {
        const currentWords = this.getWords();
        currentWords.push({ wordA, wordB });
        localStorage.setItem("who_is_me_v5", JSON.stringify(currentWords));
    },

    getRandomPair() {
        const words = this.getWords();
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }
};