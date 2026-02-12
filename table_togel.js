(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. CONFIG WARNA ---
        const theme = {
            bgContainer: "#f4f4f4",   // Background Luar (Abu sangat muda)
            bgItem: "#ffffff",        // Background Kotak (Putih Bersih)
            textDark: "#212529",      // Warna Teks Pasaran (Hitam)
            textDate: "#999999",      // Warna Teks Tanggal (Abu Soft)
            accentRed: "#d32f2f",     // Merah (Garis Kiri & Panah)
            textGold: "#b08432",      // Gold (Angka Keluaran)
            borderSoft: "#e9ecef"     // Garis tipis
        };

        // --- 2. CSS INJECTION ---
        const styles = `
            /* --- 1. CONTAINER UTAMA (FIX MEPET) --- */
            #togel-mobile {
                /* Menambah jarak padding agar tidak mepet layar */
                padding: 25px 20px !important; 
                background-color: ${theme.bgContainer} !important;
                min-height: 100vh;
                box-sizing: border-box;
            }

            /* Container item per pasaran */
            #togel-mobile .accordion-item {
                border: none !important;
                background: transparent !important;
                margin-bottom: 15px !important; /* Jarak antar kotak lebih renggang */
                box-shadow: 0 4px 10px rgba(0,0,0,0.03) !important;
                border-radius: 8px !important;
                overflow: hidden;
            }

            /* --- 2. HEADER PASARAN --- */
            #togel-mobile .accordion-button {
                background-color: ${theme.bgItem} !important;
                padding: 18px 20px !important; /* Padding dalam kotak diperbesar */
                border: 1px solid ${theme.borderSoft} !important;
                border-left: 6px solid ${theme.accentRed} !important; /* GARIS MERAH TEBAL DI KIRI */
                border-radius: 8px !important;
                color: ${theme.textDark} !important;
                box-shadow: none !important;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between; /* Pastikan isi tersebar */
            }

            /* Saat Terbuka (Active) */
            #togel-mobile .accordion-button:not(.collapsed) {
                background-color: #fff !important;
                border-bottom: 1px dashed ${theme.borderSoft} !important;
                border-bottom-left-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
            }

            /* --- 3. TEKS & ANGKA HEADER --- */
            
            /* Nama Pasaran */
            #togel-mobile .accordion-button .pasaran {
                font-weight: 800 !important;
                font-size: 15px !important;
                color: ${theme.textDark} !important;
                text-transform: uppercase;
                margin: 0 !important;
                letter-spacing: 0.5px;
            }

            /* Wrapper untuk Kanan (Tanggal + Angka + Panah) */
            /* Kita atur ulang posisi angka biar rapi */
            
            #togel-mobile .accordion-button .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 22px !important;
                font-weight: 700 !important;
                color: ${theme.textGold} !important;
                position: absolute;
                right: 45px; /* Memberi ruang untuk panah di paling kanan */
                top: 50%;
                transform: translateY(-50%);
            }

            /* Tanggal Header */
            #togel-mobile .accordion-button .tanggal {
                font-size: 11px !important;
                color: ${theme.textDate} !important;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%); /* Posisi Tanggal di TENGAH */
            }
            
            /* Jika layar HP kecil, tanggal mungkin bertabrakan, kita atur responsive */
            @media (max-width: 360px) {
                #togel-mobile .accordion-button .tanggal {
                    display: none; /* Sembunyikan tanggal di header HP kecil biar bersih */
                }
            }


            /* --- 4. CUSTOM PANAH (LOGIKA BARU) --- */
            
            /* Hapus panah bawaan */
            #togel-mobile .accordion-button::after {
                background-image: none !important;
                content: "▼"; /* Default: Panah Bawah */
                font-size: 12px;
                color: ${theme.accentRed};
                position: absolute;
                right: 15px; /* Paling kanan */
                top: 50%;
                transform: translateY(-50%);
                transition: transform 0.3s ease;
                font-weight: bold;
            }

            /* Saat Terbuka: Ubah arah jadi ATAS */
            #togel-mobile .accordion-button:not(.collapsed)::after {
                content: "▲"; /* Terbuka: Panah Atas */
                transform: translateY(-50%);
                color: ${theme.accentRed};
            }


            /* --- 5. HISTORY (ISI DALAM) --- */
            #togel-mobile .accordion-collapse {
                background-color: #fafafa !important;
                border: 1px solid ${theme.borderSoft};
                border-top: none;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }

            /* Baris History Item */
            #togel-mobile .accordion-collapse .result {
                padding: 12px 20px !important;
                border-bottom: 1px solid #eee !important;
                
                /* TEKNIK FLEXBOX UNTUK POSISI */
                display: flex !important;
                flex-direction: row !important;
                justify-content: space-between !important; /* Kiri Kanan Mentok */
                align-items: center !important;
            }

            /* Elemen 1: Tanggal (Kita paksa jadi urutan pertama/kiri) */
            #togel-mobile .accordion-collapse .result .tanggal {
                order: 1; 
                color: ${theme.textDate} !important;
                font-size: 13px !important;
                font-family: monospace, sans-serif !important;
                text-align: left;
            }
            
            /* Elemen 2: Angka Keluaran (Kita paksa jadi urutan kedua/kanan) */
            #togel-mobile .accordion-collapse .result .keluaran {
                order: 2;
                color: ${theme.textGold} !important; /* Warna Gold */
                font-weight: bold !important;
                font-size: 18px !important;
                text-align: right;
                font-family: 'Oswald', sans-serif !important;
            }
            
            /* Elemen Pasaran kosong disembunyikan */
            #togel-mobile .accordion-collapse .result .pasaran {
                display: none !important;
            }
            
            /* Hapus border item terakhir */
            #togel-mobile .accordion-collapse .result:last-child {
                border-bottom: none !important;
            }

            /* Judul Halaman */
            .togel-title {
                color: ${theme.textDark} !important;
                margin-bottom: 25px;
                border-bottom: 3px solid ${theme.accentRed};
                display: inline-block;
                padding-bottom: 5px;
                font-size: 18px;
            }

        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);

    });

})();
