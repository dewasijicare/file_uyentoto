(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. CONFIG WARNA ---
        const theme = {
            bgMain: "#f8f9fa",        
            bgCard: "#ffffff",        
            textDark: "#000000",      // Hitam pekat agar lebih jelas
            textDate: "#555555",      // Abu agak gelap agar terbaca
            accentRed: "#d32f2f",     
            textGold: "#b08432",      
            border: "#e0e0e0"         
        };

        // --- 2. CSS INJECTION ---
        const styles = `
            /* --- CONTAINER UTAMA --- */
            #togel-mobile {
                /* Padding Kiri-Kanan diperbesar (30px) agar tabel tidak terlalu lebar */
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
                margin-bottom: 6px !important; /* Jarak antar baris diperkecil */
                box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
                overflow: hidden;
            }

            /* --- HEADER TOMBOL (Tampilan Utama) --- */
            #togel-mobile .accordion-button {
                background: ${theme.bgCard} !important;
                /* Padding SANGAT KECIL agar RAMPING (Atas-Bawah 8px) */
                padding: 8px 10px !important; 
                border: none !important;
                box-shadow: none !important;
                border-left: 5px solid ${theme.accentRed} !important;
                
                /* GRID: Kolom dipadatkan */
                display: grid !important;
                /* Nama (Auto) | Tanggal (70px) | Angka (55px) | Panah (15px) */
                grid-template-columns: 1fr 75px 55px 15px !important; 
                align-items: center !important;
                gap: 4px !important; /* Jarak antar kolom rapat */
            }

            /* Saat Aktif */
            #togel-mobile .accordion-button:not(.collapsed) {
                background-color: #fff8e1 !important; 
                border-bottom: 1px solid ${theme.border} !important;
            }

            /* --- ISI KONTEN HEADER --- */
            
            /* Nama Pasaran (FONT LEBIH BESAR) */
            #togel-mobile .accordion-button .pasaran {
                font-size: 14px !important; /* Diperbesar dari 13px */
                font-weight: 800 !important;
                color: ${theme.textDark} !important;
                text-transform: uppercase;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: left;
                line-height: 1.2;
            }

            /* Tanggal (FONT LEBIH BESAR) */
            #togel-mobile .accordion-button .tanggal {
                font-size: 11px !important; /* Diperbesar dari 10px */
                color: ${theme.textDate} !important;
                text-align: center;
                display: block !important;
                position: static !important;
                transform: none !important;
                font-weight: 600;
            }

            /* Angka (TETAP JELAS) */
            #togel-mobile .accordion-button .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 18px !important;
                font-weight: 800 !important;
                color: ${theme.textGold} !important;
                text-align: right;
                display: block !important;
            }

            /* Panah */
            #togel-mobile .accordion-button::after {
                background-image: none !important;
                font-size: 10px;
                color: ${theme.accentRed};
                font-weight: bold;
                justify-self: end;
            }
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

            /* Baris History Item */
            #togel-mobile .accordion-collapse .result {
                padding: 6px 10px !important; /* Padding History juga RAMPING */
                border-bottom: 1px dashed ${theme.border} !important;
                
                display: grid !important;
                /* GRID HISTORY HARUS SAMA PERSIS DENGAN HEADER */
                grid-template-columns: 1fr 75px 55px 15px !important;
                align-items: center !important;
                gap: 4px !important;
            }
            
            #togel-mobile .accordion-collapse .result:last-child {
                border-bottom: none !important;
            }

            #togel-mobile .accordion-collapse .result::before {
                content: ""; /* Spacer kolom pertama */
                display: block;
            }

            #togel-mobile .accordion-collapse .result .tanggal {
                font-size: 11px !important; /* Samakan besarnya */
                color: ${theme.textDate} !important;
                text-align: center;
                display: block !important;
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

        const parent = document.querySelector('#togel-mobile');
        if(parent && !document.getElementById('custom-title-inject')) {
            const title = document.createElement('div');
            title.id = 'custom-title-inject';
            title.innerText = 'Hasil Keluaran Togel';
            parent.insertBefore(title, parent.firstChild);
        }

    });

})();
