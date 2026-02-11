(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. PENGATURAN LINK & GAMBAR ---
        const config = {
            linkRTP: "https://rtpmbak4d1o.mainplay.click/", 
            imgRTP: "https://cdn.jsdelivr.net/gh/dewasijicare/file_uyentoto@53d447bf4ad0c8dec5b75118f6159edc54bdb2a8/RTP.webp",
            
            linkWA: "https://wa.me/6283191991449",
            imgWA: "https://cdn.jsdelivr.net/gh/dewasijicare/file_uyentoto@53d447bf4ad0c8dec5b75118f6159edc54bdb2a8/WA.webp",
            
            linkPrediksi: "https://syair.mbaksyair.it.com/",
            imgPrediksi: "https://cdn.jsdelivr.net/gh/dewasijicare/file_uyentoto@53d447bf4ad0c8dec5b75118f6159edc54bdb2a8/PREDIKSI-TOGEL.webp"
        };

        // --- 2. INJEKSI CSS ---
        const widgetStyles = `
            /* Container Utama */
            #mbak-sidebar-container {
                position: fixed;
                left: 0;
                bottom: 30px; /* POSISI DI BAWAH KIRI */
                z-index: 99999;
                display: flex;
                align-items: stretch; /* AGAR TOMBOL MENGIKUTI TINGGI ICON */
                transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
                font-family: sans-serif;
            }

            /* State Tertutup: Geser ke kiri sebesar lebar area icon (60px) */
            #mbak-sidebar-container.closed {
                transform: translateX(-60px); 
            }

            /* Area Icon (Tanpa Background) */
            .mbak-sidebar-content {
                background: transparent; /* BACKGROUND HILANG */
                display: flex;
                flex-direction: column;
                gap: 5px; /* Jarak antar icon */
                width: 60px; /* Lebar area icon */
                box-sizing: border-box;
                padding-bottom: 5px;
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

            /* Tombol Toggle (Batang Biru) */
            #mbak-sidebar-toggle {
                background-color: #00aaff; /* Warna Biru */
                width: 30px; /* Lebar tombol */
                /* Tinggi otomatis menyesuaikan (stretch) */
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
