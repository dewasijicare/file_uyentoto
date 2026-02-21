(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. CONFIG WARNA ---
        const theme = {
            bgMain: "#f4f4f4",        
            bgCard: "#ffffff",        
            textPasaran: "#000000",     // NAMA PASARAN JADI HITAM
            textDate: "#888888",        // Abu
            textResult: "#d32f2f",      // RESULT JADI MERAH
            bgActive: "#111111",        // Hitam Gelap
            textActiveLight: "#ffffff", // Putih
            textActiveGold: "#ffd700",  // Gold Murni
            accentRed: "#c0392b",       // Garis Pinggir & Warna Aktif Pagination
            border: "#e0e0e0"         
        };

        // --- 2. CSS INJECTION ---
        const styles = `
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

            #togel-mobile {
                padding: 20px 30px !important;
                background-color: ${theme.bgMain} !important;
                height: auto !important; 
                min-height: auto !important;
                padding-bottom: 40px !important; 
                font-family: 'Poppins', sans-serif !important;
            }

            #togel-mobile .accordion-item {
                background: ${theme.bgCard} !important;
                border: none !important; 
                border-radius: 8px !important; 
                margin-bottom: 10px !important;
                box-shadow: 0 2px 5px rgba(0,0,0,0.05) !important; 
                overflow: hidden;
            }

            #togel-mobile .accordion-button {
                background: ${theme.bgCard} !important;
                padding: 12px 12px !important; 
                border: none !important;
                box-shadow: none !important;
                border-left: 5px solid ${theme.accentRed} !important;
                display: grid !important;
                grid-template-columns: 1fr 74px 60px 15px !important;
                align-items: center !important;
                gap: 8px !important; 
                border-radius: 8px !important;
                transition: background 0.2s ease;
            }

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

            #togel-mobile .accordion-button:not(.collapsed) {
                background-color: ${theme.bgActive} !important;
                border-bottom: 1px solid #333 !important; 
                border-bottom-left-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
            }
            #togel-mobile .accordion-button:not(.collapsed) .pasaran { color: ${theme.textActiveLight} !important; }
            #togel-mobile .accordion-button:not(.collapsed) .tanggal { color: #cccccc !important; }
            #togel-mobile .accordion-button:not(.collapsed) .keluaran {
                color: ${theme.textActiveGold} !important;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.6) !important;
            }
            #togel-mobile .accordion-button:not(.collapsed)::after {
                content: "▼";
                transform: rotate(180deg);
                color: ${theme.accentRed}; 
            }
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
            #togel-mobile .accordion-collapse .result:last-child { border-bottom: none !important; }
            #togel-mobile .accordion-collapse .result::before { content: ""; display: block; }
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
            #togel-mobile .accordion-collapse .result .pasaran { display: none !important; }
            .togel-title { display: none !important; }
            
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

            /* --- CUSTOM PAGINATION (NATIVE BOOTSTRAP CONTROL) --- */
            #custom-pagination-container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 6px;
                margin-top: 25px;
                font-family: 'Poppins', sans-serif;
            }

            .page-link-custom {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: 38px;
                height: 38px;
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
                cursor: pointer;
                outline: none;
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
            
            .page-link-custom i { font-size: 12px; }

            /* Sembunyikan titik asli menggunakan display:none karena kita sudah menggunakan Native Bootstrap */
            #mobile-togel {
                display: none !important;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);

        // --- 3. JS FIX PANAH BAWAAN ---
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

        // --- 5. INJECT PAGINATION DENGAN NATIVE BOOTSTRAP TARGET ---
        const originalIndicatorsWrap = document.getElementById('mobile-togel');

        if(parent && originalIndicatorsWrap && !document.getElementById('custom-pagination-container')) {
            
            // Mencari div terluar yang membungkus slider
            const carouselEl = originalIndicatorsWrap.closest('.carousel');
            
            if (carouselEl) {
                // Pastikan div slider ini punya ID agar bisa ditargetkan oleh pagination baru kita
                if (!carouselEl.id) {
                    carouselEl.id = 'carousel-togel-native';
                }
                const targetId = carouselEl.id;
                
                // Kumpulkan jumlah halaman dari indikator bawaan
                const originalIndicators = originalIndicatorsWrap.querySelectorAll('button[data-bs-slide-to]');
                
                const paginationContainer = document.createElement('div');
                paginationContainer.id = 'custom-pagination-container';
                
                let numsHtml = '';
                originalIndicators.forEach((ind, index) => {
                    const isActive = index === 0 ? 'active' : '';
                    // Menambahkan atribut data-bs-target & data-bs-slide-to persis seperti bawaan Bootstrap
                    numsHtml += `<button type="button" class="page-link-custom pg-num ${isActive}" data-bs-target="#${targetId}" data-bs-slide-to="${index}">${index + 1}</button>`;
                });

                // Susun HTML dengan atribut Prev/Next Bootstrap
                paginationContainer.innerHTML = `
                    <button type="button" class="page-link-custom" data-bs-target="#${targetId}" data-bs-slide="prev"><i class="bi bi-chevron-left"></i> Prev</button>
                    ${numsHtml}
                    <button type="button" class="page-link-custom" data-bs-target="#${targetId}" data-bs-slide="next">Next <i class="bi bi-chevron-right"></i></button>
                `;
                
                parent.appendChild(paginationContainer);

                // --- 6. UPDATE WARNA MERAH (ACTIVE) KETIKA SLIDE BERGESER ---
                // Fungsi ini bertugas memindahkan kotak merah (active) ketika slide bergeser otomatis/manual
                carouselEl.addEventListener('slid.bs.carousel', function (e) {
                    document.querySelectorAll('.pg-num').forEach(btn => btn.classList.remove('active'));
                    const activeBtn = document.querySelector(`.pg-num[data-bs-slide-to="${e.to}"]`);
                    if(activeBtn) activeBtn.classList.add('active');
                });
            }
        }

    });

})();
