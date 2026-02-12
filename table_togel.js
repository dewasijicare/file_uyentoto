(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. CONFIG WARNA ---
        const theme = {
            bgMain: "#f8f9fa",        // Background Halaman (Abu Terang)
            bgCard: "#ffffff",        // Background Baris (Putih)
            textDark: "#2d2d2d",      // Warna Nama Pasaran
            textDate: "#888888",      // Warna Tanggal (Abu)
            accentRed: "#c62828",     // Merah (Garis & Panah)
            textGold: "#b08432",      // Gold (Angka)
            border: "#e0e0e0"         // Garis Pemisah Halus
        };

        // --- 2. CSS INJECTION (GRID SYSTEM) ---
        const styles = `
            /* --- CONTAINER UTAMA --- */
            #togel-mobile {
                padding: 15px 10px !important; /* Jarak dari pinggir layar */
                background-color: ${theme.bgMain} !important;
                min-height: 100vh;
                font-family: sans-serif;
            }

            /* --- RESET ACCORDION ITEM --- */
            /* Kita buat seperti tabel yang menyambung */
            #togel-mobile .accordion-item {
                background: ${theme.bgCard} !important;
                border: 1px solid ${theme.border} !important;
                border-radius: 6px !important;
                margin-bottom: 8px !important; /* Jarak antar pasaran (Ramping) */
                box-shadow: 0 2px 4px rgba(0,0,0,0.02) !important;
                overflow: hidden;
            }

            /* --- HEADER PASARAN (TOMBOL UTAMA) --- */
            #togel-mobile .accordion-button {
                background: ${theme.bgCard} !important;
                padding: 10px 12px !important; /* RAMPING: Padding kecil */
                border: none !important;
                box-shadow: none !important;
                border-left: 5px solid ${theme.accentRed} !important; /* Aksen Merah Kiri */
                
                /* TEKNIK GRID: Membagi baris menjadi 3 kolom pasti */
                display: grid !important;
                /* Kolom 1 (Nama): Auto (sisa ruang) | Kolom 2 (Tanggal): 75px | Kolom 3 (Angka): 50px | Kolom 4 (Panah): 20px */
                grid-template-columns: 1fr 85px 60px 20px !important; 
                align-items: center !important;
                gap: 5px !important;
            }

            /* Saat Header Aktif/Terbuka */
            #togel-mobile .accordion-button:not(.collapsed) {
                background-color: #fff8e1 !important; /* Sedikit kuning tipis saat aktif */
                border-bottom: 1px solid ${theme.border} !important;
            }

            /* --- ISI KONTEN HEADER --- */
            
            /* Kolom 1: Nama Pasaran */
            #togel-mobile .accordion-button .pasaran {
                font-size: 13px !important;
                font-weight: 800 !important;
                color: ${theme.textDark} !important;
                text-transform: uppercase;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: left;
            }

            /* Kolom 2: Tanggal Header */
            #togel-mobile .accordion-button .tanggal {
                font-size: 10px !important;
                color: ${theme.textDate} !important;
                text-align: center; /* Rata Tengah kolomnya */
                display: block !important;
                position: static !important; /* Reset posisi absolute lama */
                transform: none !important;
            }

            /* Kolom 3: Angka Header */
            #togel-mobile .accordion-button .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 18px !important;
                font-weight: 800 !important;
                color: ${theme.textGold} !important;
                text-align: right; /* Rata Kanan kolomnya */
                position: static !important;
                display: block !important;
            }

            /* Kolom 4: PANAH (LOGIKA FIXED) */
            /* Hapus background image bawaan bootstrap */
            #togel-mobile .accordion-button::after {
                background-image: none !important;
                font-size: 10px;
                color: ${theme.accentRed};
                font-weight: bold;
                text-align: right;
                justify-self: end;
                transition: transform 0.2s;
            }

            /* KONDISI TERTUTUP (COLLAPSED) -> PANAH BAWAH */
            #togel-mobile .accordion-button.collapsed::after {
                content: "▼"; 
                transform: rotate(0deg);
            }

            /* KONDISI TERBUKA (NOT COLLAPSED) -> PANAH ATAS */
            #togel-mobile .accordion-button:not(.collapsed)::after {
                content: "▼"; /* Tetap render icon yg sama, tapi kita putar */
                transform: rotate(180deg); 
            }


            /* --- HISTORY (ISI DALAM) --- */
            #togel-mobile .accordion-collapse {
                background-color: #fff !important;
            }

            /* Baris History Item */
            #togel-mobile .accordion-collapse .result {
                padding: 8px 12px !important; /* Ramping */
                border-bottom: 1px dashed ${theme.border} !important;
                
                /* TEKNIK GRID: Menyamakan kolom dengan Header */
                display: grid !important;
                /* Kolom sama persis: 1fr | 85px | 60px | 20px */
                grid-template-columns: 1fr 85px 60px 20px !important;
                align-items: center !important;
                gap: 5px !important;
            }
            
            #togel-mobile .accordion-collapse .result:last-child {
                border-bottom: none !important;
            }

            /* Kolom 1: Kosong di History (Spacer) */
            #togel-mobile .accordion-collapse .result::before {
                content: "";
                display: block;
            }

            /* Kolom 2: Tanggal History */
            #togel-mobile .accordion-collapse .result .tanggal {
                font-size: 10px !important;
                color: ${theme.textDate} !important;
                text-align: center; /* Sejajar dengan Header */
                display: block !important;
                font-family: monospace;
            }

            /* Kolom 3: Angka History */
            #togel-mobile .accordion-collapse .result .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 16px !important;
                font-weight: 700 !important;
                color: ${theme.textGold} !important; /* Gold juga biar senada */
                text-align: right; /* Sejajar dengan Header */
                display: block !important;
            }

            /* Kolom 4: Kosong/Sembunyikan Pasaran lama */
            #togel-mobile .accordion-collapse .result .pasaran {
                display: none !important;
            }
            
            /* Styling Judul Halaman */
            .togel-title {
                display: none !important; /* Kita sembunyikan judul lama, ganti yg baru jika mau */
            }
            
            /* Custom Title (Opsional) */
            #custom-title-inject {
                text-align: center;
                font-weight: bold;
                color: ${theme.textDark};
                padding-bottom: 15px;
                font-size: 16px;
                text-transform: uppercase;
                border-bottom: 2px solid ${theme.accentRed};
                margin-bottom: 15px;
                width: fit-content;
                margin-left: auto;
                margin-right: auto;
            }

        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);

        // Tambah Judul Baru (Opsional)
        const parent = document.querySelector('#togel-mobile');
        if(parent && !document.getElementById('custom-title-inject')) {
            const title = document.createElement('div');
            title.id = 'custom-title-inject';
            title.innerText = 'Hasil Keluaran Togel';
            parent.insertBefore(title, parent.firstChild);
        }

    });

})();
