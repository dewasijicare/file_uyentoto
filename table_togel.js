(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. KONFIGURASI TAMPILAN ---
        const config = {
            containerID: "custom-togel-result-v2", // Versi 2
            targetParent: "#togel-mobile", 
            accentColor: "#b08432", // Warna Emas gelap (Sesuai tombol di source code baris 1136)
            highlightColor: "#ffc107", // Warna Emas terang untuk angka
            bgColor: "#1a1a1a", 
            cardBg: "linear-gradient(180deg, #2b2b2b 0%, #1a1a1a 100%)"
        };

        // --- 2. INJEKSI CSS ---
        const customStyles = `
            /* Sembunyikan Tampilan Lama */
            #togel-mobile .carousel, 
            #togel-mobile .accordion,
            #togel-mobile .togel-title {
                display: none !important;
            }

            /* Container Baru */
            #${config.containerID} {
                width: 100%;
                padding: 15px 10px;
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            }

            /* Judul Section */
            .ct-main-title {
                color: ${config.accentColor};
                text-align: center;
                font-size: 16px;
                font-weight: 800;
                margin-bottom: 15px;
                text-transform: uppercase;
                letter-spacing: 1px;
                border-bottom: 1px solid #333;
                padding-bottom: 10px;
            }

            /* Grid Layout (2 Kolom) */
            .custom-togel-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr); 
                gap: 8px;
            }

            /* Card Style */
            .custom-togel-card {
                background: ${config.cardBg};
                border: 1px solid #333;
                border-radius: 6px;
                padding: 8px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.4);
                position: relative;
            }

            /* Border Emas Halus di Kiri Card */
            .custom-togel-card::before {
                content: '';
                position: absolute;
                left: 0;
                top: 10%;
                height: 80%;
                width: 2px;
                background-color: ${config.accentColor};
                border-radius: 0 2px 2px 0;
            }

            /* Nama Pasaran (FULL NAME) */
            .ct-pasaran {
                font-size: 11px; /* Ukuran pas agar muat */
                color: #ccc;
                font-weight: 700;
                text-transform: uppercase;
                margin-bottom: 4px;
                line-height: 1.2;
                min-height: 26px; /* Menjaga tinggi baris agar sejajar */
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                word-wrap: break-word; /* Membungkus teks panjang */
            }

            /* Angka Keluaran */
            .ct-number {
                font-size: 22px;
                font-weight: 800;
                color: ${config.highlightColor};
                letter-spacing: 1px;
                margin: 2px 0;
                font-family: 'Oswald', sans-serif; /* Font angka tegas */
            }

            /* Tanggal */
            .ct-date {
                font-size: 9px;
                color: #666;
                margin-top: 2px;
                font-weight: 500;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = customStyles;
        document.head.appendChild(styleElement);


        // --- 3. LOGIKA RENDER ---
        function renderCustomTable() {
            const parent = document.querySelector(config.targetParent);
            if (!parent) return;

            // Mencegah duplikasi jika script jalan 2x
            if (document.getElementById(config.containerID)) return;

            const newContainer = document.createElement('div');
            newContainer.id = config.containerID;

            let htmlContent = `<div class="ct-main-title">Live Result Togel</div>`;
            htmlContent += `<div class="custom-togel-grid">`;

            // Mengambil data dari Accordion (Source Line 444 dst)
            const oldItems = document.querySelectorAll('#togel-mobile .result-data .result.accordion-button');

            if (oldItems.length === 0) {
                htmlContent += `<div style="color:white; text-align:center; grid-column:span 2; padding:20px;">Data result sedang dimuat...</div>`;
            } else {
                oldItems.forEach(item => {
                    // 1. Ambil Nama Pasaran Full (Tanpa Edit)
                    // Mengambil text dari class .pasaran (contoh: "SYDNEY POOLS") 
                    const pasaranRaw = item.querySelector('.pasaran')?.textContent || "";
                    const pasaranFull = pasaranRaw.trim(); 
                    
                    // 2. Ambil Angka
                    const numberRaw = item.querySelector('.keluaran')?.textContent || "----";
                    const numberClean = numberRaw.trim();

                    // 3. Ambil Tanggal
                    const dateRaw = item.querySelector('.tanggal')?.textContent || "";
                    const dateClean = dateRaw.trim();

                    // Render Card
                    // Kita gunakan class pasaranFull apa adanya
                    if(pasaranFull) {
                        htmlContent += `
                            <div class="custom-togel-card">
                                <div class="ct-pasaran">${pasaranFull}</div>
                                <div class="ct-number">${numberClean}</div>
                                <div class="ct-date">${dateClean}</div>
                            </div>
                        `;
                    }
                });
            }

            htmlContent += `</div>`; 
            newContainer.innerHTML = htmlContent;

            // Inject di bagian paling atas container target
            parent.insertBefore(newContainer, parent.firstChild);
        }

        // Jalankan dengan sedikit delay agar HTML asli load dulu
        setTimeout(renderCustomTable, 200); 

    });

})();