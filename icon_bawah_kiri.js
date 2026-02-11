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

        // --- 2. INJEKSI CSS (STYLE BARU) ---
        const widgetStyles = `
            /* Container Utama (Wrapper) */
            #mbak-sidebar-container {
                position: fixed;
                left: 0;
                top: 50%; /* Posisi Vertikal Tengah */
                transform: translateY(-50%); /* Center vertical alignment */
                z-index: 99999;
                display: flex;
                align-items: center; /* Sejajarkan menu dan tombol */
                transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1); /* Animasi halus */
                font-family: sans-serif;
            }

            /* State Tertutup: Geser ke kiri sebesar lebar menu, sisakan tombol */
            #mbak-sidebar-container.closed {
                transform: translateY(-50%) translateX(-70px); /* -70px sesuai lebar menu */
            }

            /* Bagian Hitam (Tempat Icon) */
            .mbak-sidebar-content {
                background-color: #1a1a1a; /* Warna latar gelap sesuai contoh */
                padding: 15px 10px;
                display: flex;
                flex-direction: column;
                gap: 15px;
                width: 70px; /* Lebar area menu */
                box-sizing: border-box;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                /* HILANGKAN SHADOW sesuai request */
                box-shadow: none !important; 
            }

            /* Styling Gambar Icon */
            .mbak-sidebar-content a img {
                width: 100%;
                height: auto;
                display: block;
                border-radius: 5px;
                /* HILANGKAN SHADOW pada gambar */
                box-shadow: none !important; 
                transition: transform 0.2s;
            }
            
            .mbak-sidebar-content a img:hover {
                transform: scale(1.1);
            }

            /* Tombol Toggle (Batang Biru) */
            #mbak-sidebar-toggle {
                background-color: #00aaff; /* Warna Biru sesuai contoh */
                width: 25px;
                height: 120px; /* Tinggi tombol */
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
                color: #fff;
                font-weight: bold;
                font-size: 14px;
                box-shadow: none; /* Tanpa shadow */
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

        // --- 3. INJEKSI HTML (STRUKTUR SIDEBAR) ---
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

                <div id="mbak-sidebar-toggle" title="Buka/Tutup Menu">
                    <span id="mbak-toggle-arrow">◀</span> </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', widgetHtml);

        // --- 4. LOGIKA SLIDE (JAVASCRIPT) ---
        const container = document.getElementById('mbak-sidebar-container');
        const toggleBtn = document.getElementById('mbak-sidebar-toggle');
        
        // Cek LocalStorage agar posisi terakhir tersimpan (Optional, agar user tidak terganggu)
        const isClosed = localStorage.getItem('mbakSidebarClosed') === 'true';
        if (isClosed) {
            container.classList.add('closed');
            document.getElementById('mbak-toggle-arrow').style.transform = "rotate(180deg)";
        }

        if (toggleBtn && container) {
            toggleBtn.addEventListener('click', function() {
                container.classList.toggle('closed');
                
                // Simpan status buka/tutup ke browser user
                if (container.classList.contains('closed')) {
                    localStorage.setItem('mbakSidebarClosed', 'true');
                } else {
                    localStorage.setItem('mbakSidebarClosed', 'false');
                }
            });
        }
    });

})();
