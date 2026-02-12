(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. CONFIG WARNA ---
        const theme = {
            bgMain: "#f4f4f4",        
            bgCard: "#ffffff",        
            textDark: "#333333",      // Hitam Soft (Lebih elegan)
            textDate: "#888888",      
            accentRed: "#c62828",     // Merah Gelap
            textGold: "#b08432",      
            border: "#e0e0e0"         
        };

        // --- 2. CSS INJECTION ---
        const styles = `
            /* --- CONTAINER UTAMA (RAMPING) --- */
            #togel-mobile {
                /* Padding Kiri-Kanan 45px! Ini akan membuat tabel jauh lebih ramping di tengah */
                padding: 20px 45px !important; 
                background-color: ${theme.bgMain} !important;
                min-height: 100vh;
                font-family: Arial, Helvetica, sans-serif !important; /* Font Standar Anti-Potong */
            }

            /* --- BARIS ITEM --- */
            #togel-mobile .accordion-item {
                background: ${theme.bgCard} !important;
                border: 1px solid ${theme.border} !important;
                border-radius: 6px !important;
                margin-bottom: 8px !important;
                box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important;
                overflow: visible !important; /* Pastikan tidak ada yang kepotong */
            }

            /* --- HEADER TOMBOL --- */
            #togel-mobile .accordion-button {
                background: ${theme.bgCard} !important;
                /* Padding Atas Bawah Pas */
                padding: 12px 10px !important; 
                border: none !important;
                box-shadow: none !important;
                border-left: 4px solid ${theme.accentRed} !important;
                
                /* GRID SYSTEM */
                display: grid !important;
                /* Nama (Sisa) | Tanggal (75px) | Angka (60px) | Panah (15px) */
                grid-template-columns: 1fr 75px 60px 15px !important; 
                align-items: center !important;
                gap: 5px !important;
                min-height: 45px !important; /* Tinggi minimum agar font aman */
            }

            /* Saat Aktif */
            #togel-mobile .accordion-button:not(.collapsed) {
                background-color: #fffcf5 !important; 
                border-bottom: 1px solid ${theme.border} !important;
            }

            /* --- KONTEN HEADER --- */
            
            /* Nama Pasaran (FONT FIX) */
            #togel-mobile .accordion-button .pasaran {
                /* Gunakan Arial agar aman tidak terpotong */
                font-family: Arial, Helvetica, sans-serif !important; 
                font-size: 13px !important; 
                font-weight: 700 !important; /* Bold tapi tidak over */
                color: ${theme.textDark} !important;
                text-transform: uppercase;
                
                /* Reset overflow clipping */
                white-space: normal !important; /* Biarkan text turun baris jika kepanjangan */
                line-height: 1.2 !important; /* Jarak baris cukup */
                text-align: left;
                padding-top: 1px; /* Tweak dikit biar center */
            }

            /* Tanggal */
            #togel-mobile .accordion-button .tanggal {
                font-family: Arial, Helvetica, sans-serif !important;
                font-size: 10px !important;
                color: ${theme.textDate} !important;
                display: flex !important;
                align-items: center;
                justify-content: center;
                height: 100%;
                margin-top: 1px;
            }

            /* Angka (TETAP OSWALD TAPI LEBIH RAPI) */
            #togel-mobile .accordion-button .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 18px !important;
                font-weight: 700 !important;
                color: ${theme.textGold} !important;
                text-align: right;
                display: block !important;
                line-height: 1 !important; /* Rapatkan baris angka */
                padding-right: 2px;
            }

            /* --- PANAH --- */
            #togel-mobile .accordion-button::after {
                background-image: none !important;
                font-size: 10px;
                color: ${theme.accentRed};
                font-weight: bold;
                justify-self: center;
                transition: transform 0.2s ease;
                display: block;
                margin-top: 1px;
            }

            /* Logika Panah */
            #togel-mobile .accordion-button.collapsed::after {
                content: "▼"; 
                transform: rotate(0deg);
            }
            #togel-mobile .accordion-button:not(.collapsed)::after {
                content: "▼"; 
                transform: rotate(180deg); 
            }


            /* --- HISTORY (ISI DALAM) --- */
            #togel-mobile .accordion-collapse {
                background-color: #fff !important;
            }

            #togel-mobile .accordion-collapse .result {
                padding: 8px 10px !important;
                border-bottom: 1px dashed ${theme.border} !important;
                
                display: grid !important;
                grid-template-columns: 1fr 75px 60px 15px !important;
                align-items: center !important;
                gap: 5px !important;
            }
            
            #togel-mobile .accordion-collapse .result:last-child {
                border-bottom: none !important;
            }

            /* Spacer */
            #togel-mobile .accordion-collapse .result::before {
                content: ""; display: block;
            }

            #togel-mobile .accordion-collapse .result .tanggal {
                font-family: monospace, sans-serif !important;
                font-size: 11px !important;
                color: ${theme.textDate} !important;
                text-align: center;
                display: block !important;
            }

            #togel-mobile .accordion-collapse .result .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 16px !important;
                font-weight: 600 !important;
                color: ${theme.textGold} !important;
                text-align: right;
                display: block !important;
                padding-right: 2px;
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
                padding-bottom: 8px;
                font-size: 16px;
                text-transform: uppercase;
                border-bottom: 3px solid ${theme.accentRed};
                margin-bottom: 20px;
                width: fit-content;
                margin-left: auto;
                margin-right: auto;
                letter-spacing: 0.5px;
                font-family: Arial, sans-serif;
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
