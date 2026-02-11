(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. PENGATURAN LINK & GAMBAR ---
        const config = {
            linkRTP: "/", 
            imgRTP: "https://cdn.jsdelivr.net/gh/dewasijicare/file_uyentoto@53d447bf4ad0c8dec5b75118f6159edc54bdb2a8/RTP.webp",
            
            linkWA: "/",
            imgWA: "https://cdn.jsdelivr.net/gh/dewasijicare/file_uyentoto@53d447bf4ad0c8dec5b75118f6159edc54bdb2a8/WA.webp",
            
            linkPrediksi: "/",
            imgPrediksi: "https://cdn.jsdelivr.net/gh/dewasijicare/file_uyentoto@53d447bf4ad0c8dec5b75118f6159edc54bdb2a8/PREDIKSI-TOGEL.webp"
        };

        // --- 2. INJEKSI CSS ---
        const widgetStyles = `
            /* Container Utama */
            #mbak-sidebar-container {
                position: fixed;
                left: 0;
                bottom: 50px; /* Posisi Kiri Bawah */
                z-index: 99999;
                display: flex;
                align-items: stretch; /* Agar tombol mengikuti tinggi icon */
                transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
                font-family: sans-serif;
            }

            /* State Tertutup: Geser ke kiri sebesar lebar area icon (80px) */
            #mbak-sidebar-container.closed {
                transform: translateX(-80px); 
            }

            /* Area Icon */
            .mbak-sidebar-content {
                background: transparent;
                display: flex;
                flex-direction: column;
                gap: 15px; /* JARAK ANTAR ICON (VERTIKAL) */
                padding: 10px; /* JARAK KELILING (KANAN KIRI ATAS BAWAH) */
                width: 80px; /* Lebar area diperbesar agar muat padding */
                box-sizing: border-box;
            }

            /* Gambar Icon */
            .mbak-sidebar-content a img {
                width: 100%;
                height: auto;
                display: block;
                border-radius: 5px;
                transition: transform 0.2s;
            }
            
            .mbak-sidebar-content a img:hover {
                transform: scale(1.1);
            }

            /* Tombol Toggle (Batang Merah) */
            #mbak-sidebar-toggle {
                background-color: #ff0000; /* UBAH JADI MERAH */
                width: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
                color: #fff;
                font-weight: bold;
                font-size: 14px;
            }
            
            /* Panah Indikator */
            #mbak-toggle-arrow {
                display: inline-block;
                transition: transform 0.4s;
            }

            /* Putar panah saat tertutup */
            #mbak-sidebar-container.closed #mbak-toggle-arrow {
                transform: rotate(180deg); 
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = widgetStyles;
        document.head.appendChild(styleElement);

        // --- 3. INJEKSI HTML ---
        const widgetHtml = `
            <div id="mbak-sidebar-container">
                <div class="mbak-sidebar-content">
                    <a href="${config.linkRTP}" target="_blank" title="RTP Slot">
                        <img src="${config.imgRTP}" alt="RTP">
                    </a>
                    <a href="${config.linkWA}" target="_blank" title="WhatsApp">
                        <img src="${config.imgWA}" alt="WA">
                    </a>
                    <a href="${config.linkPrediksi}" target="_blank" title="Prediksi Togel">
                        <img src="${config.imgPrediksi}" alt="Prediksi">
                    </a>
                </div>

                <div id="mbak-sidebar-toggle" title="Buka/Tutup">
                    <span id="mbak-toggle-arrow">◀</span>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', widgetHtml);

        // --- 4. LOGIKA SLIDE ---
        const container = document.getElementById('mbak-sidebar-container');
        const toggleBtn = document.getElementById('mbak-sidebar-toggle');
        
        // Cek LocalStorage
        const isClosed = localStorage.getItem('mbakSidebarClosed') === 'true';
        if (isClosed) {
            container.classList.add('closed');
            document.getElementById('mbak-toggle-arrow').style.transform = "rotate(180deg)";
        }

        if (toggleBtn && container) {
            toggleBtn.addEventListener('click', function() {
                container.classList.toggle('closed');
                
                if (container.classList.contains('closed')) {
                    localStorage.setItem('mbakSidebarClosed', 'true');
                } else {
                    localStorage.setItem('mbakSidebarClosed', 'false');
                }
            });
        }
    });

})();

