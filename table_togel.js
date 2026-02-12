(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. CONFIG WARNA ---
        const theme = {
            bgContainer: "#f0f2f5",   // Background Halaman (Abu sangat muda)
            bgItem: "#ffffff",        // Background Kotak (Putih)
            textDark: "#1a1a1a",      // Warna Teks Pasaran (Hitam Soft)
            textDate: "#888888",      // Warna Teks Tanggal (Abu)
            accentRed: "#d32f2f",     // Merah (Border Kiri & Panah)
            textGold: "#b08432",      // Gold (Angka Keluaran)
            borderSoft: "#e0e0e0"     // Garis tipis
        };

        // --- 2. CSS INJECTION ---
        const styles = `
            /* --- 1. CONTAINER UTAMA (Fix Mepet) --- */
            #togel-mobile {
                padding: 20px 15px !important; /* Jarak Atas-Bawah 20px, Kiri-Kanan 15px */
                background-color: ${theme.bgContainer} !important;
                min-height: 100vh;
            }

            /* Hapus style accordion bawaan yang mengganggu */
            #togel-mobile .accordion-item {
                border: none !important;
                background: transparent !important;
                margin-bottom: 12px !important; /* Jarak antar kotak */
                box-shadow: 0 2px 5px rgba(0,0,0,0.05) !important;
                border-radius: 8px !important;
                overflow: hidden;
            }

            /* --- 2. HEADER PASARAN (Tampilan Utama) --- */
            #togel-mobile .accordion-button {
                background-color: ${theme.bgItem} !important;
                padding: 15px 20px !important;
                border: 1px solid ${theme.borderSoft} !important;
                border-left: 5px solid ${theme.accentRed} !important; /* GARIS MERAH DI KIRI */
                border-radius: 8px !important;
                color: ${theme.textDark} !important;
                box-shadow: none !important;
                position: relative;
                display: flex;
                align-items: center;
            }

            /* Saat Terbuka (Active) */
            #togel-mobile .accordion-button:not(.collapsed) {
                background-color: #fff !important;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
                border-bottom-left-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                border-bottom: 1px dashed ${theme.borderSoft} !important;
            }

            /* --- 3. TEKS & ANGKA --- */
            
            /* Nama Pasaran */
            #togel-mobile .accordion-button .pasaran {
                font-weight: 700 !important;
                font-size: 14px !important;
                color: ${theme.textDark} !important;
                text-transform: uppercase;
                margin-bottom: 0 !important;
            }

            /* Angka Keluaran (GOLD) */
            #togel-mobile .accordion-button .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 20px !important;
                font-weight: 700 !important;
                color: ${theme.textGold} !important;
                position: absolute;
                right: 50px; /* Geser dikit biar gak nabrak panah */
                top: 50%;
                transform: translateY(-50%);
            }

            /* Tanggal (Kecil di bawah nama pasaran) */
            #togel-mobile .accordion-button .tanggal {
                font-size: 10px !important;
                color: ${theme.textDate} !important;
                position: absolute;
                left: 25px; /* Sesuaikan dengan padding */
                bottom: 8px; /* Posisi di bawah nama pasaran */
                font-weight: normal;
            }
            /* Kita sesuaikan padding header biar tanggal muat */
            #togel-mobile .accordion-button {
                padding-bottom: 25px !important; /* Ruang untuk tanggal */
            }


            /* --- 4. CUSTOM PANAH (MERAH) --- */
            
            /* Hapus panah default bootstrap */
            #togel-mobile .accordion-button::after {
                background-image: none !important; 
                content: "▼"; /* Panah Bawah Manual */
                font-size: 14px;
                color: ${theme.accentRed};
                position: absolute;
                right: 15px;
                top: 45%;
                transform: translateY(-50%);
                transition: transform 0.3s ease;
            }

            /* Putar Panah saat Terbuka */
            #togel-mobile .accordion-button:not(.collapsed)::after {
                transform: translateY(-50%) rotate(180deg); /* Jadi Menghadap Atas */
            }


            /* --- 5. HISTORY (Isi Dalam) --- */
            #togel-mobile .accordion-collapse {
                background-color: #fafafa !important; /* Abu sangat muda */
                border: 1px solid ${theme.borderSoft};
                border-top: none;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }

            /* Baris History */
            #togel-mobile .accordion-collapse .result {
                padding: 10px 20px !important;
                border-bottom: 1px solid #eee !important;
                display: flex !important;
                justify-content: space-between !important;
            }
            
            #togel-mobile .accordion-collapse .result:last-child {
                border-bottom: none !important;
            }

            /* Teks History */
            #togel-mobile .accordion-collapse .result .tanggal {
                color: ${theme.textDate} !important;
                font-size: 12px !important;
            }
            
            #togel-mobile .accordion-collapse .result .keluaran {
                color: ${theme.textDark} !important;
                font-weight: bold !important;
                font-size: 16px !important;
            }
            
            /* Sembunyikan 'Pasaran' di dalam history karena redundan */
            #togel-mobile .accordion-collapse .result .pasaran {
                display: none !important;
            }

            /* Judul Title Halaman (Togel Result) */
            .togel-title {
                color: ${theme.textDark} !important;
                text-align: center;
                font-weight: bold;
                margin-bottom: 20px;
                text-transform: uppercase;
                border-bottom: 2px solid ${theme.accentRed};
                display: inline-block;
                padding-bottom: 5px;
            }
            /* Tengahkan title */
            #togel-mobile > div:first-child { 
                text-align: center;
            }

        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);

    });

})();
