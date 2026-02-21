(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. CONFIG WARNA ---
        const theme = {
            bgMain: "#f4f4f4",        
            bgCard: "#ffffff",        
            
            // --- WARNA DEFAULT ---
            textPasaran: "#000000",     // NAMA PASARAN JADI HITAM
            textDate: "#888888",        // Abu
            textResult: "#d32f2f",      // RESULT JADI MERAH
            
            // --- WARNA SAAT AKTIF (DIKLIK) ---
            bgActive: "#111111",        // Hitam Gelap
            textActiveLight: "#ffffff", // Putih
            textActiveGold: "#ffd700",  // Gold Murni
            
            accentRed: "#c0392b",       // Garis Pinggir & Warna Aktif Pagination
            border: "#e0e0e0"         
        };

        // --- 2. CSS INJECTION ---
        const styles = `
            /* IMPORT FONT POPPINS */
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

            /* --- CONTAINER UTAMA --- */
            #togel-mobile {
                padding: 20px 30px !important;
                background-color: ${theme.bgMain} !important;
                height: auto !important; 
                min-height: auto !important;
                padding-bottom: 40px !important; 
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
                grid-template-columns: 1fr 74px 60px 15px !important;
                align-items: center !important;
                gap: 8px !important; 

                border-radius: 8px !important;
                transition: background 0.2s ease;
            }

            /* --- KONTEN HEADER --- */
            #togel-mobile .accordion-button .pasaran {
                font-family: 'Poppins', sans-serif !important;
                font-size: 14px !important; 
                font-weight: 700 !important;
                color: ${theme.textPasaran} !important; 
                text-transform: uppercase;
                text-align: left;
                line-height: 1.2;
                white-space: normal !important; 
            }

            #togel-mobile .accordion-button .tanggal {
                font-family: 'Poppins', sans-serif !important;
                font-size: 12px !important; 
                color: ${theme.textDate} !important;
                font-weight: 500;
                display: flex !important;
                align-items: center;
                justify-content: center;
                margin-top: 1px;
            }

            #togel-mobile .accordion-button .keluaran,
            #togel-mobile .result .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 20px !important;
                font-weight: 800 !important;
                color: ${theme.textResult} !important; 
                text-align: right;
                display: block !important;
                text-shadow: none !important; 
            }

            /* --- SAAT TOMBOL DIKLIK / AKTIF --- */
            #togel-mobile .accordion-button:not(.collapsed) {
                background-color: ${theme.bgActive} !important;
                border-bottom: 1px solid #333 !important; 
                border-bottom-left-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
            }

            #togel-mobile .accordion-button:not(.collapsed) .pasaran {
                color: ${theme.textActiveLight} !important;
            }

            #togel-mobile .accordion-button:not(.collapsed) .tanggal {
                color: #cccccc !important;
            }

            #togel-mobile .accordion-button:not(.collapsed) .keluaran {
                color: ${theme.textActiveGold} !important;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.6) !important;
            }

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
                background-color: #ffffff !important;
                border-bottom-left-radius: 8px !important;
                border-bottom-right-radius: 8px !important;
            }

            #togel-mobile .accordion-collapse .result {
                padding: 10px 12px !important;
                border-bottom: 1px dashed ${theme.border} !important;
                display: grid !important;
                grid-template-columns: 1fr 74px 60px 15px !important;
                align-items: center !important;
                gap: 8px !important;
                background: transparent !important; 
            }
            
            #togel-mobile .accordion-collapse .result:last-child {
                border-bottom: none !important;
            }

            #togel-mobile .accordion-collapse .result::before {
                content: "";
                display: block;
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
                color: ${theme.textResult} !important; 
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
                color: #222222; 
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

            /* --- CUSTOM PAGINATION / LINK HALAMAN --- */
            #custom-pagination-container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                margin-top: 25px;
                font-family: 'Poppins', sans-serif;
            }

            .page-link-custom {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: 35px;
                height: 35px;
                padding: 0 10px;
                border-radius: 5px;
                background: #ffffff;
                color: #333333 !important;
                text-decoration: none;
                font-weight: 600;
                font-size: 14px;
                border: 1px solid #dcdcdc;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                transition: all 0.2s ease;
            }

            .page-link-custom:hover {
                background: #f0f0f0;
                transform: translateY(-2px);
                border-color: #bbbbbb;
            }

            .page-link-custom.active {
                background: ${theme.accentRed};
                color: #ffffff !important;
                border-color: ${theme.accentRed};
                box-shadow: 0 2px 8px rgba(192, 57, 43, 0.4);
            }
            
            .page-link-custom i {
                font-size: 12px;
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
        setTimeout(fixArrowState, 300);

        // --- 4. INJECT JUDUL ---
        const parent = document.querySelector('#togel-mobile');
        if(parent && !document.getElementById('custom-title-inject')) {
            const title = document.createElement('div');
            title.id = 'custom-title-inject';
            title.innerText = 'Hasil Keluaran Togel';
            parent.insertBefore(title, parent.firstChild);
        }

        // --- 5. INJECT PAGINATION (LINK PINDAH HALAMAN) ---
        if(parent && !document.getElementById('custom-pagination-container')) {
            const paginationContainer = document.createElement('div');
            paginationContainer.id = 'custom-pagination-container';
            
            // --- GANTI URL DI BAGIAN href="..." SESUAI DENGAN LINK HALAMAN ANDA ---
            paginationContainer.innerHTML = `
                <a href="/halaman-sebelumnya" class="page-link-custom"><i class="bi bi-chevron-left"></i> Prev</a>
                <a href="/halaman-1" class="page-link-custom active">1</a>
                <a href="/halaman-2" class="page-link-custom">2</a>
                <a href="/halaman-3" class="page-link-custom">3</a>
                <a href="/halaman-selanjutnya" class="page-link-custom">Next <i class="bi bi-chevron-right"></i></a>
            `;
            // ----------------------------------------------------------------------
            
            // Menambahkan pagination ke bagian paling bawah tabel
            parent.appendChild(paginationContainer);
        }

    });

})();
