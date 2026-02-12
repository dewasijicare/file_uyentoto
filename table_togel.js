(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. CONFIG WARNA ---
        const theme = {
            bgMain: "#f8f9fa",        
            bgCard: "#ffffff",        
            textDark: "#000000",      
            textDate: "#555555",      
            accentRed: "#d32f2f",     
            textGold: "#b08432",      
            border: "#e0e0e0"         
        };

        // --- 2. CSS INJECTION ---
        const styles = `
            /* --- CONTAINER UTAMA --- */
            #togel-mobile {
                padding: 15px 30px !important; 
                background-color: ${theme.bgMain} !important;
                min-height: 100vh;
                font-family: sans-serif;
            }

            /* --- ITEM TABEL (Baris) --- */
            #togel-mobile .accordion-item {
                background: ${theme.bgCard} !important;
                border: 1px solid ${theme.border} !important;
                border-radius: 6px !important;
                margin-bottom: 6px !important;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
                overflow: hidden;
            }

            /* --- HEADER TOMBOL --- */
            #togel-mobile .accordion-button {
                background: ${theme.bgCard} !important;
                padding: 8px 10px !important; 
                border: none !important;
                box-shadow: none !important;
                border-left: 5px solid ${theme.accentRed} !important;
                
                /* GRID SYSTEM */
                display: grid !important;
                /* Kolom: Nama | Tanggal | Angka | Panah */
                grid-template-columns: 1fr 75px 55px 15px !important; 
                align-items: center !important;
                gap: 4px !important;
            }

            /* Saat Aktif */
            #togel-mobile .accordion-button:not(.collapsed) {
                background-color: #fff8e1 !important; 
                border-bottom: 1px solid ${theme.border} !important;
            }

            /* --- ISI KONTEN HEADER --- */
            
            /* Nama Pasaran */
            #togel-mobile .accordion-button .pasaran {
                font-size: 14px !important;
                font-weight: 800 !important;
                color: ${theme.textDark} !important;
                text-transform: uppercase;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: left;
                line-height: 1.2;
            }

            /* Tanggal (FIX POSISI) */
            #togel-mobile .accordion-button .tanggal {
                font-size: 11px !important;
                color: ${theme.textDate} !important;
                font-weight: 600;
                
                /* Teknik Centering Absolut */
                display: flex !important;
                align-items: center;
                justify-content: center;
                height: 100%; 
                margin-top: 2px; /* Turunkan dikit 2px biar center optikal */
            }

            /* Angka */
            #togel-mobile .accordion-button .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 18px !important;
                font-weight: 800 !important;
                color: ${theme.textGold} !important;
                text-align: right;
                display: block !important;
            }

            /* --- PANAH (LOGIKA CSS) --- */
            #togel-mobile .accordion-button::after {
                background-image: none !important;
                font-size: 10px;
                color: ${theme.accentRed};
                font-weight: bold;
                justify-self: end;
                transition: transform 0.2s ease;
                display: block;
            }

            /* Default (Tertutup) = Panah Bawah */
            #togel-mobile .accordion-button.collapsed::after {
                content: "▼"; 
                transform: rotate(0deg);
            }

            /* Terbuka = Panah Atas */
            #togel-mobile .accordion-button:not(.collapsed)::after {
                content: "▼"; 
                transform: rotate(180deg); 
            }


            /* --- HISTORY (ISI DALAM) --- */
            #togel-mobile .accordion-collapse {
                background-color: #fff !important;
            }

            #togel-mobile .accordion-collapse .result {
                padding: 6px 10px !important;
                border-bottom: 1px dashed ${theme.border} !important;
                
                display: grid !important;
                /* Grid sama persis dengan header */
                grid-template-columns: 1fr 75px 55px 15px !important;
                align-items: center !important;
                gap: 4px !important;
            }
            
            #togel-mobile .accordion-collapse .result:last-child {
                border-bottom: none !important;
            }

            /* Spacer kolom pertama */
            #togel-mobile .accordion-collapse .result::before {
                content: ""; 
                display: block;
            }

            #togel-mobile .accordion-collapse .result .tanggal {
                font-size: 11px !important;
                color: ${theme.textDate} !important;
                
                /* Fix Centering History juga */
                display: flex !important;
                align-items: center;
                justify-content: center;
                margin-top: 2px;
                font-weight: 500;
            }

            #togel-mobile .accordion-collapse .result .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 16px !important;
                font-weight: 700 !important;
                color: ${theme.textGold} !important;
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
                color: ${theme.textDark};
                padding-bottom: 10px;
                font-size: 16px;
                text-transform: uppercase;
                border-bottom: 3px solid ${theme.accentRed};
                margin-bottom: 20px;
                width: fit-content;
                margin-left: auto;
                margin-right: auto;
                letter-spacing: 1px;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);

        // --- 3. JS LOGIC: FORCE COLLAPSED STATE ---
        // Ini memperbaiki masalah panah terbalik saat load pertama
        const fixArrowState = () => {
            const btns = document.querySelectorAll('#togel-mobile .accordion-button');
            btns.forEach(btn => {
                // Paksa tambah class 'collapsed' agar CSS ngebaca ini sebagai tertutup (Panah Bawah)
                // Bootstrap akan otomatis mencabut class ini saat diklik nanti.
                if (!btn.classList.contains('collapsed')) {
                    btn.classList.add('collapsed');
                }
            });
        };

        // Jalankan fix arrow segera setelah DOM ready
        fixArrowState();
        
        // Jalankan lagi sedikit delay utk memastikan (fallback)
        setTimeout(fixArrowState, 100);


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
