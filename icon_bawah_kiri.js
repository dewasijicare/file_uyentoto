(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. PENGATURAN LINK & GAMBAR (Bisa Diedit Disini) ---
        const config = {
            linkRTP: "/", 
            imgRTP: "https://cdn.jsdelivr.net/gh/dewasijicare/file_uyentoto@53d447bf4ad0c8dec5b75118f6159edc54bdb2a8/RTP.webp",
            
            linkWA: "/",
            imgWA: "https://cdn.jsdelivr.net/gh/dewasijicare/file_uyentoto@53d447bf4ad0c8dec5b75118f6159edc54bdb2a8/WA.webp",
            
            linkPrediksi: "/",
            imgPrediksi: "https://cdn.jsdelivr.net/gh/dewasijicare/file_uyentoto@53d447bf4ad0c8dec5b75118f6159edc54bdb2a8/PREDIKSI-TOGEL.webp"
        };
        // --- Selesai Pengaturan ---


        // --- 2. INJEKSI CSS (STYLE) ---
        const widgetStyles = `
            #mbak-widget-container {
                position: fixed;
                bottom: 20px;
                left: 10px;
                z-index: 99999;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 5px;
                font-family: sans-serif;
            }

            .mbak-widget-icons {
                display: flex;
                flex-direction: column;
                gap: 8px;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Efek membal */
                transform-origin: bottom left;
                opacity: 1;
                max-height: 500px;
                overflow: visible;
            }

            /* State saat menu ditutup (Hidden) */
            .mbak-widget-icons.closed {
                opacity: 0;
                transform: translateY(20px) scale(0.8);
                pointer-events: none;
                max-height: 0;
            }

            .mbak-widget-icons a img {
                width: 50px;
                height: auto;
                display: block;
                border-radius: 5px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.3);
                transition: transform 0.2s ease;
            }

            .mbak-widget-icons a img:hover {
                transform: scale(1.15);
            }

            /* Tombol Toggle Bulat */
            #mbak-widget-toggle-btn {
                background-color: #000;
                color: #fff;
                border: 2px solid #fff;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 3px 8px rgba(0,0,0,0.6);
                outline: none;
                margin-top: 5px;
                font-size: 20px;
                line-height: 1;
                transition: background 0.3s, transform 0.3s;
                padding: 0;
            }

            #mbak-widget-toggle-btn:hover {
                background-color: #333;
                transform: rotate(90deg);
            }
        `;

        // Pasang CSS ke Head
        const styleElement = document.createElement('style');
        styleElement.innerHTML = widgetStyles;
        document.head.appendChild(styleElement);


        // --- 3. INJEKSI HTML (ELEMENT) ---
        const widgetHtml = `
            <div id="mbak-widget-container">
                <div class="mbak-widget-icons" id="mbak-widget-list">
                    
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

                <button id="mbak-widget-toggle-btn" title="Menu">&times;</button>
            </div>
        `;

        // Pasang HTML ke Body
        document.body.insertAdjacentHTML('beforeend', widgetHtml);


        // --- 4. LOGIKA JAVASCRIPT (INTERAKSI) ---
        const toggleBtn = document.getElementById('mbak-widget-toggle-btn');
        const iconList = document.getElementById('mbak-widget-list');

        if (toggleBtn && iconList) {
            toggleBtn.addEventListener('click', function() {
                // Cek apakah class 'closed' ada
                const isClosed = iconList.classList.contains('closed');

                if (isClosed) {
                    // JIKA SEDANG TERTUTUP -> BUKA
                    iconList.classList.remove('closed');
                    toggleBtn.innerHTML = "&times;"; // Simbol X
                    toggleBtn.style.transform = "rotate(0deg)";
                } else {
                    // JIKA SEDANG TERBUKA -> TUTUP
                    iconList.classList.add('closed');
                    toggleBtn.innerHTML = "&#9776;"; // Simbol Garis Tiga (Hamburger)
                    toggleBtn.style.transform = "rotate(180deg)";
                }
            });
        }

    }); // Akhir DOMContentLoaded

})(); // Akhir IIFE
