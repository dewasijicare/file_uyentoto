(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. CONFIG WARNA ---
        const theme = {
            bgMain: "#f4f4f4",        
            bgCard: "#ffffff",        
            
            // --- WARNA DEFAULT (SAAT TERTUTUP/NORMAL) ---
            textDefault: "#d32f2f",     // MERAH (Nama Pasaran)
            textDate: "#95a5a6",        // Abu Soft
            textResultDefault: "#111111", // HITAM GELAP (Angka Keluaran Default & History)
            
            // --- WARNA SAAT AKTIF (DIKLIK/TERBUKA) ---
            bgActive: "#1a1a1a",        // Background Hitam
            textActiveLight: "#ffffff", // Teks Putih
            textActiveGold: "#ffc107",  // Angka Gold (Hanya saat header aktif/gelap)
            
            accentRed: "#c0392b",       // Garis Pinggir Merah
            border: "#ecf0f1"         
        };

        // --- 2. CSS INJECTION ---
        const styles = `
            /* IMPORT FONT POPPINS */
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

            /* --- CONTAINER UTAMA --- */
            #togel-mobile {
                /* Padding 30px agar lebar kotak optimal */
                padding: 20px 30px !important;
                background-color: ${theme.bgMain} !important;
                height: auto !important; 
                min-height: auto !important;
                padding-bottom: 80px !important; 
                font-family: 'Poppins', sans-serif !important; 
            }

            /* --- BARIS TABEL --- */
            #togel-mobile .accordion-item {
                background: ${theme.bgCard} !important;
                border: none !important; 
                border-radius: 8px !important; 
                margin-bottom: 10px !important;
                box-shadow: 0 2px 5px rgba(0,0,0,0.05) !important; 
                overflow: hidden;
            }

            /* --- HEADER TOMBOL --- */
            #togel-mobile .accordion-button {
                background: ${theme.bgCard} !important;
                padding: 12px 12px !important; 
                border: none !important;
                box-shadow: none !important;
                border-left: 5px solid ${theme.accentRed} !important;
                
                /* GRID SYSTEM */
                display: grid !important;
                /* Nama | Tanggal | Angka | Panah */
                grid-template-columns: 1fr 74px 60px 15px !important; 
                align-items: center !important;
                gap: 8px !important; 

                border-radius: 8px !important;
                transition: all 0.3s ease;
            }

            /* --- KONTEN HEADER --- */
            
            /* Nama Pasaran (DEFAULT: MERAH) */
            #togel-mobile .accordion-button .pasaran {
                font-family: 'Poppins', sans-serif !important;
                font-size: 14px !important; 
                font-weight: 700 !important;
                color: ${theme.textDefault} !important; 
                text-transform: uppercase;
                text-align: left;
                line-height: 1.2;
                white-space: normal !important; /* Text boleh turun baris jika panjang */
                transition: color 0.3s;
            }

            /* Tanggal (DEFAULT: ABU) */
            #togel-mobile .accordion-button .tanggal {
                font-family: 'Poppins', sans-serif !important;
                font-size: 12px !important; 
                color: ${theme.textDate} !important;
                font-weight: 500;
                display: flex !important;
                align-items: center;
                justify-content: center;
                margin-top: 1px;
                white-space: nowrap; 
                transition: color 0.3s;
            }

            /* Angka (DEFAULT: HITAM/GELAP) */
            #togel-mobile .accordion-button .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 20px !important;
                font-weight: 800 !important;
                color: ${theme.textResultDefault} !important; /* HITAM */
                text-align: right;
                display: block !important;
                transition: color 0.3s;
            }


            /* --- HEADER SAAT DI-KLIK (GELAP) --- */
            #togel-mobile .accordion-button:not(.collapsed) {
                background-color: ${theme.bgActive} !important; 
                border-bottom-left-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                border-bottom: 1px solid #333 !important; 
            }

            /* Nama Pasaran Aktif -> PUTIH */
            #togel-mobile .accordion-button:not(.collapsed) .pasaran {
                color: ${theme.textActiveLight} !important; 
            }

            /* Tanggal Aktif -> PUTIH REDUP */
            #togel-mobile .accordion-button:not(.collapsed) .tanggal {
                color: #dddddd !important; 
            }

            /* Angka Aktif -> GOLD (Agar Mewah di Background Hitam) */
            #togel-mobile .accordion-button:not(.collapsed) .keluaran {
                color: ${theme.textActiveGold} !important; 
                text-shadow: 0 0 8px rgba(255, 193, 7, 0.4);
            }

            /* Panah Aktif -> MERAH */
            #togel-mobile .accordion-button:not(.collapsed)::after {
                content: "▼"; 
                transform: rotate(180deg);
                color: ${theme.accentRed}; 
            }


            /* --- PANAH DEFAULT --- */
            #togel-mobile .accordion-button::after {
                background-image: none !important;
                font-size: 10px;
                color: ${theme.accentRed};
                font-weight: bold;
                justify-self: center;
                transition: transform 0.3s ease;
                display: block;
            }
            #togel-mobile .accordion-button.collapsed::after {
                content: "▼"; 
                transform: rotate(0deg);
            }


            /* --- HISTORY (ISI DALAM) --- */
            #togel-mobile .accordion-collapse {
                background-color: #fcfcfc !important;
                border-bottom-left-radius: 8px !important;
                border-bottom-right-radius: 8px !important;
            }

            #togel-mobile .accordion-collapse .result {
                padding: 10px 12px !important;
                border-bottom: 1px dashed ${theme.border} !important;
                display: grid !important;
                /* GRID HISTORY SAMA DENGAN HEADER */
                grid-template-columns: 1fr 74px 60px 15px !important;
                align-items: center !important;
                gap: 8px !important;
            }
            
            #togel-mobile .accordion-collapse .result:last-child {
                border-bottom: none !important;
            }

            #togel-mobile .accordion-collapse .result::before {
                content: ""; display: block;
            }

            #togel-mobile .accordion-collapse .result .tanggal {
                font-family: 'Poppins', sans-serif !important;
                font-size: 12px !important; 
                color: ${theme.textDate} !important;
                display: flex !important;
                align-items: center;
                justify-content: center;
                font-weight: 500;
            }

            /* Angka History -> HITAM/GELAP */
            #togel-mobile .accordion-collapse .result .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 18px !important;
                font-weight: 700 !important;
                color: ${theme.textResultDefault} !important; /* Menggunakan Warna Gelap */
                text-align: right;
                display: block !important;
            }

            #togel-mobile .accordion-collapse .result .pasaran {
                display: none !important;
            }
            
            .togel-title { display: none !important; }
            
            /* Custom Title */
            #custom-title-inject {
                text-align: center;
                font-weight: 800;
                color: ${theme.textResultDefault}; /* Judul ikut warna gelap */
                padding-bottom: 10px;
                font-size: 18px;
                text-transform: uppercase;
                border-bottom: 4px solid ${theme.accentRed};
                border-radius: 2px;
                margin-bottom: 25px;
                width: fit-content;
                margin-left: auto;
                margin-right: auto;
                letter-spacing: 1px;
                font-family: 'Poppins', sans-serif;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);

        // --- 3. JS FIX PANAH ---
        const fixArrowState = () => {
            const btns = document.querySelectorAll('#togel-mobile .accordion-button');
            btns.forEach(btn => {
                if (!btn.classList.contains('collapsed')) {
                    btn.classList.add('collapsed');
                }
            });
        };
        
        fixArrowState();
        setTimeout(fixArrowState, 200);

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
