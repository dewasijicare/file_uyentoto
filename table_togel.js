(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. CONFIG WARNA ---
        const theme = {
            bgMain: "#f8f9fa",        
            bgCard: "#ffffff",        
            textDark: "#111111",      // Hitam Pekat
            textDate: "#666666",      // Abu Medium
            accentRed: "#d32f2f",     // Merah
            textGold: "#b08432",      // Gold
            border: "#e0e0e0"         
        };

        // --- 2. CSS INJECTION ---
        const styles = `
            /* --- CONTAINER UTAMA --- */
            #togel-mobile {
                padding: 15px 25px !important; 
                background-color: ${theme.bgMain} !important;
                min-height: 100vh;
                /* FONT BARU: Menggunakan font sistem yang modern & bersih */
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
            }

            /* --- BARIS TABEL --- */
            #togel-mobile .accordion-item {
                background: ${theme.bgCard} !important;
                border: 1px solid ${theme.border} !important;
                border-radius: 8px !important; /* Lebih bulat dikit */
                margin-bottom: 8px !important;
                box-shadow: 0 2px 5px rgba(0,0,0,0.03) !important;
                overflow: hidden;
            }

            /* --- HEADER TOMBOL (TAMPILAN UTAMA) --- */
            #togel-mobile .accordion-button {
                background: ${theme.bgCard} !important;
                padding: 10px 12px !important; 
                border: none !important;
                box-shadow: none !important;
                border-left: 5px solid ${theme.accentRed} !important;
                
                /* GRID SYSTEM YANG DIPERLEBAR */
                display: grid !important;
                /* Kolom: Nama (Sisa) | Tanggal (85px) | Angka (65px) | Panah (20px) */
                grid-template-columns: 1fr 85px 65px 20px !important; 
                align-items: center !important;
                gap: 5px !important;
            }

            /* Saat Aktif */
            #togel-mobile .accordion-button:not(.collapsed) {
                background-color: #fffcf2 !important; /* Cream sangat muda */
                border-bottom: 1px solid ${theme.border} !important;
            }

            /* --- KONTEN HEADER --- */
            
            /* Nama Pasaran (FONT LEBIH BESAR & BAGUS) */
            #togel-mobile .accordion-button .pasaran {
                font-size: 16px !important; /* Diperbesar */
                font-weight: 800 !important;
                color: ${theme.textDark} !important;
                text-transform: uppercase;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: left;
                letter-spacing: 0.3px;
            }

            /* Tanggal (LEBIH BESAR & TENGAH) */
            #togel-mobile .accordion-button .tanggal {
                font-size: 12px !important; /* Diperbesar */
                color: ${theme.textDate} !important;
                font-weight: 600;
                
                /* Centering */
                display: flex !important;
                align-items: center;
                justify-content: center;
                height: 100%; 
                margin-top: 2px; 
            }

            /* Angka (JARAK DENGAN PANAH DIPERLEBAR) */
            #togel-mobile .accordion-button .keluaran {
                font-family: 'Oswald', sans-serif !important; /* Tetap Oswald biar sangar */
                font-size: 20px !important;
                font-weight: 800 !important;
                color: ${theme.textGold} !important;
                text-align: right;
                display: block !important;
                padding-right: 5px; /* Jarak aman ke panah */
            }

            /* --- PANAH (LOGIKA CSS FIXED) --- */
            #togel-mobile .accordion-button::after {
                background-image: none !important;
                font-size: 12px;
                color: ${theme.accentRed};
                font-weight: bold;
                justify-self: center; /* Panah di tengah kolomnya */
                transition: transform 0.3s ease;
                display: block;
            }

            /* Default Tertutup: Panah Bawah */
            #togel-mobile .accordion-button.collapsed::after {
                content: "▼"; 
                transform: rotate(0deg);
            }

            /* Terbuka: Panah Atas */
            #togel-mobile .accordion-button:not(.collapsed)::after {
                content: "▼"; 
                transform: rotate(180deg); 
            }


            /* --- HISTORY (ISI DALAM) --- */
            #togel-mobile .accordion-collapse {
                background-color: #fff !important;
            }

            #togel-mobile .accordion-collapse .result {
                padding: 8px 12px !important;
                border-bottom: 1px dashed ${theme.border} !important;
                
                display: grid !important;
                /* GRID HISTORY MENGIKUTI HEADER */
                grid-template-columns: 1fr 85px 65px 20px !important;
                align-items: center !important;
                gap: 5px !important;
            }
            
            #togel-mobile .accordion-collapse .result:last-child {
                border-bottom: none !important;
            }

            /* Spacer */
            #togel-mobile .accordion-collapse .result::before {
                content: ""; 
                display: block;
            }

            #togel-mobile .accordion-collapse .result .tanggal {
                font-size: 12px !important; /* Disamakan */
                color: ${theme.textDate} !important;
                display: flex !important;
                align-items: center;
                justify-content: center;
                margin-top: 2px;
                font-weight: 500;
            }

            #togel-mobile .accordion-collapse .result .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 18px !important;
                font-weight: 700 !important;
                color: ${theme.textGold} !important;
                text-align: right;
                display: block !important;
                padding-right: 5px;
            }

            #togel-mobile .accordion-collapse .result .pasaran {
                display: none !important;
            }
            
            /* Hide Judul Lama */
            .togel-title { display: none !important; }
            
            /* Judul Baru */
            #custom-title-inject {
                text-align: center;
                font-weight: 900;
                color: ${theme.textDark};
                padding-bottom: 10px;
                font-size: 18px;
                text-transform: uppercase;
                border-bottom: 3px solid ${theme.accentRed};
                margin-bottom: 25px;
                width: fit-content;
                margin-left: auto;
                margin-right: auto;
                letter-spacing: 1px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);

        // --- 3. JS LOGIC: FIX PANAH TERBALIK ---
        // Memaksa status awal menjadi 'collapsed' agar panah mengarah ke bawah
        const fixArrowState = () => {
            const btns = document.querySelectorAll('#togel-mobile .accordion-button');
            btns.forEach(btn => {
                if (!btn.classList.contains('collapsed')) {
                    btn.classList.add('collapsed');
                }
            });
        };
        
        // Eksekusi segera dan fallback delay
        fixArrowState();
        setTimeout(fixArrowState, 150);


        // --- 4. INJECT JUDUL ---
        const parent = document.querySelector('#togel-mobile');
        if(parent && !document.getElementById('custom-title-inject')) {
            const title = document.createElement('div');
            title.id = 'custom-title-inject';
            title.innerText = 'Hasil Keluaran Togel';
            parent.insertBefore(title, parent.firstChild);
        }

    });

})();
