(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. CONFIG WARNA ---
        const theme = {
            bgMain: "#f4f4f4",        
            bgCard: "#ffffff",        
            
            // Warna Default
            textDefault: "#d32f2f",   // MERAH (Untuk Nama Pasaran Default)
            textDate: "#95a5a6",      // Abu Soft
            textGoldDefault: "#d35400", // Orange/Gold Gelap (Default)
            
            // Warna Saat Aktif (Gelap)
            bgActive: "#1a1a1a",      // Hitam Elegan
            textActiveLight: "#ffffff", // Putih
            textActiveGold: "#ffc107",  // Gold Terang (Menyala)
            
            accentRed: "#c0392b",     // Garis Pinggir
            border: "#ecf0f1"         
        };

        // --- 2. CSS INJECTION ---
        const styles = `
            /* IMPORT FONT PREMIUM */
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

            /* --- CONTAINER UTAMA --- */
            #togel-mobile {
                padding: 20px 45px !important;
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

            /* --- HEADER TOMBOL (DEFAULT / TERTUTUP) --- */
            #togel-mobile .accordion-button {
                background: ${theme.bgCard} !important;
                padding: 12px 15px !important; 
                border: none !important;
                box-shadow: none !important;
                border-left: 5px solid ${theme.accentRed} !important;
                
                /* GRID SYSTEM */
                display: grid !important;
                grid-template-columns: 1fr 85px 60px 20px !important; 
                align-items: center !important;
                gap: 10px !important; 

                border-radius: 8px !important;
                transition: all 0.3s ease; /* Transisi halus saat berubah warna */
            }

            /* --- ISI HEADER (DEFAULT) --- */
            
            /* Nama Pasaran (DEFAULT: MERAH) */
            #togel-mobile .accordion-button .pasaran {
                font-family: 'Poppins', sans-serif !important;
                font-size: 14px !important; 
                font-weight: 700 !important;
                color: ${theme.textDefault} !important; /* MERAH */
                text-transform: uppercase;
                text-align: left;
                line-height: 1.3;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                transition: color 0.3s;
            }

            /* Tanggal Default */
            #togel-mobile .accordion-button .tanggal {
                font-family: 'Poppins', sans-serif !important;
                font-size: 12px !important;
                color: ${theme.textDate} !important;
                font-weight: 500;
                display: flex !important;
                align-items: center;
                justify-content: center;
                margin-top: 1px;
                transition: color 0.3s;
            }

            /* Angka Default */
            #togel-mobile .accordion-button .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 20px !important;
                font-weight: 800 !important;
                color: ${theme.textGoldDefault} !important;
                text-align: right;
                display: block !important;
                transition: color 0.3s;
            }


            /* --- HEADER SAAT DI-KLIK / AKTIF (GELAP) --- */
            
            #togel-mobile .accordion-button:not(.collapsed) {
                background-color: ${theme.bgActive} !important; /* BACKGROUND GELAP */
                border-bottom-left-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                border-bottom: 1px solid #333 !important; /* Border bawah gelap */
            }

            /* Nama Pasaran Saat Aktif -> PUTIH */
            #togel-mobile .accordion-button:not(.collapsed) .pasaran {
                color: ${theme.textActiveLight} !important; 
            }

            /* Tanggal Saat Aktif -> PUTIH AGAK GELAP */
            #togel-mobile .accordion-button:not(.collapsed) .tanggal {
                color: #cccccc !important; 
            }

            /* Angka Saat Aktif -> GOLD MENYALA */
            #togel-mobile .accordion-button:not(.collapsed) .keluaran {
                color: ${theme.textActiveGold} !important; 
                text-shadow: 0 0 5px rgba(255, 193, 7, 0.5); /* Efek Glow dikit */
            }

            /* Panah Saat Aktif -> PUTIH/MERAH */
            #togel-mobile .accordion-button:not(.collapsed)::after {
                content: "▼"; 
                transform: rotate(180deg);
                color: ${theme.accentRed}; /* Tetap merah agar kontras */
            }


            /* --- PANAH DEFAULT --- */
            #togel-mobile .accordion-button::after {
                background-image: none !important;
                font-size: 12px;
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
                padding: 10px 15px !important;
                border-bottom: 1px dashed ${theme.border} !important;
                display: grid !important;
                grid-template-columns: 1fr 85px 60px 20px !important;
                align-items: center !important;
                gap: 10px !important;
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

            #togel-mobile .accordion-collapse .result .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 18px !important;
                font-weight: 700 !important;
                color: ${theme.textGoldDefault} !important;
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
                color: ${theme.textDefault}; /* Judul Merah juga */
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
