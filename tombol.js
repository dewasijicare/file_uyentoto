(function() {
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. PENGATURAN LINK TINGGAL GANTI DI SINI ---
        const config = {
            linkRTP: "https://rtpuyentoto.online/", 
            linkWA: "https://wa.me/6281234567890", // Ganti dengan nomor WA asli
            linkPrediksi: "/prediksi" // Ganti dengan link prediksi yang benar
        };

        // --- 2. INJEKSI CSS UNTUK STYLING TOMBOL ---
        const customStyles = `
            /* Container untuk 3 tombol */
            #custom-action-buttons {
                display: flex;
                flex-direction: column;
                gap: 10px;
                width: 100%;
                padding: 12px 16px;
                box-sizing: border-box;
            }

            /* Styling dasar tombol */
            .action-btn-extra {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                width: 100%;
                padding: 10px 15px;
                border-radius: 8px;
                font-family: inherit;
                font-weight: 800;
                font-size: 1.1rem;
                text-transform: uppercase;
                text-decoration: none;
                color: #ffffff !important;
                border: 2px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
                transition: all 0.3s ease-in-out;
                position: relative;
                overflow: hidden;
            }

            /* Animasi Hover */
            .action-btn-extra:hover {
                transform: translateY(-3px);
                filter: brightness(1.2);
                box-shadow: 0 6px 15px rgba(0, 0, 0, 0.6);
            }

            /* Gradien & Glow spesifik masing-masing tombol */
            .btn-extra-rtp {
                background: linear-gradient(135deg, #ff0000 0%, #ff7b00 100%);
                animation: pulse-red 2s infinite alternate;
            }
            
            .btn-extra-wa {
                background: linear-gradient(135deg, #00a81f 0%, #00ff37 100%);
                animation: pulse-green 2s infinite alternate;
                animation-delay: 0.3s;
            }

            .btn-extra-prediksi {
                background: linear-gradient(135deg, #0011ff 0%, #00aeff 100%);
                animation: pulse-blue 2s infinite alternate;
                animation-delay: 0.6s;
            }

            /* Ukuran Icon */
            .action-btn-extra i {
                font-size: 1.3rem;
            }

            /* Keyframes untuk efek glow menyala */
            @keyframes pulse-red {
                0% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.2); }
                100% { box-shadow: 0 0 15px rgba(255, 0, 0, 0.8); }
            }
            @keyframes pulse-green {
                0% { box-shadow: 0 0 5px rgba(0, 255, 0, 0.2); }
                100% { box-shadow: 0 0 15px rgba(0, 255, 0, 0.8); }
            }
            @keyframes pulse-blue {
                0% { box-shadow: 0 0 5px rgba(0, 174, 255, 0.2); }
                100% { box-shadow: 0 0 15px rgba(0, 174, 255, 0.8); }
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = customStyles;
        document.head.appendChild(styleElement);

        // --- 3. INJEKSI HTML ---
        // Elemen HTML yang akan disisipkan
        const buttonsHtml = `
            <div id="custom-action-buttons" class="mobile-only">
                <a href="${config.linkRTP}" class="action-btn-extra btn-extra-rtp" target="_blank">
                    <i class="bi bi-lightning-charge-fill"></i> RTP Gacor Hari Ini
                </a>
                <a href="${config.linkWA}" class="action-btn-extra btn-extra-wa" target="_blank">
                    <i class="bi bi-whatsapp"></i> Whatsapp Uyentoto
                </a>
                <a href="${config.linkPrediksi}" class="action-btn-extra btn-extra-prediksi" target="_blank">
                    <i class="bi bi-crosshair"></i> Prediksi Togel
                </a>
            </div>
        `;

        // Mencari kontainer login mobile dan menyisipkan HTML tepat di bawahnya
        const mobileLoginContainer = document.getElementById('mobilelogin');
        if (mobileLoginContainer) {
            mobileLoginContainer.insertAdjacentHTML('afterend', buttonsHtml);
        }

    });
})();