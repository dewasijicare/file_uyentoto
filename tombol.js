(function() {
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. PENGATURAN LINK ---
        const config = {
            linkRTP: "https://rtpuyentoto.online/", 
            linkWA: "https://wa.me/6281234567890", // Ganti dengan nomor WA
            linkPrediksi: "/prediksi" // Ganti dengan link prediksi
        };

        // --- 2. INJEKSI CSS ---
        const customStyles = `
            /* Container untuk 3 tombol */
            #custom-action-buttons {
                display: flex;
                flex-direction: column;
                width: 100%;
                padding: 10px 0; /* Padding kiri-kanan 0 agar ukurannya sama persis dengan form login di atasnya */
                box-sizing: border-box;
            }

            /* Styling dasar tombol */
            .action-btn-extra {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                width: 100%;
                margin-bottom: 12px; /* Memberikan jarak antar tombol agar tidak menempel */
                padding: 12px 15px;
                border-radius: 5px; /* Disesuaikan agar kotak seperti tombol Masuk/Daftar */
                font-family: inherit;
                font-weight: 800;
                font-size: 1rem;
                text-transform: uppercase;
                text-decoration: none;
                color: #ffffff !important;
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-sizing: border-box;
                position: relative;
            }

            /* Hilangkan jarak di tombol paling bawah */
            .action-btn-extra:last-child {
                margin-bottom: 0;
            }

            /* Animasi Hover */
            .action-btn-extra:hover {
                filter: brightness(1.2);
            }

            /* Gradien & Glow spesifik masing-masing tombol */
            .btn-extra-rtp {
                background: linear-gradient(180deg, #ff2a00 0%, #cc0000 100%);
                animation: pulse-red 2s infinite alternate;
            }
            
            .btn-extra-wa {
                background: linear-gradient(180deg, #00c922 0%, #008a17 100%);
                animation: pulse-green 2s infinite alternate;
                animation-delay: 0.3s;
            }

            .btn-extra-prediksi {
                background: linear-gradient(180deg, #0066ff 0%, #0037cc 100%);
                animation: pulse-blue 2s infinite alternate;
                animation-delay: 0.6s;
            }

            /* Ukuran Icon */
            .action-btn-extra i {
                font-size: 1.2rem;
            }

            /* Keyframes untuk efek glow menyala */
            @keyframes pulse-red {
                0% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.3); }
                100% { box-shadow: 0 0 15px rgba(255, 0, 0, 0.9); }
            }
            @keyframes pulse-green {
                0% { box-shadow: 0 0 5px rgba(0, 255, 0, 0.3); }
                100% { box-shadow: 0 0 15px rgba(0, 255, 0, 0.9); }
            }
            @keyframes pulse-blue {
                0% { box-shadow: 0 0 5px rgba(0, 102, 255, 0.3); }
                100% { box-shadow: 0 0 15px rgba(0, 102, 255, 0.9); }
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = customStyles;
        document.head.appendChild(styleElement);

        // --- 3. INJEKSI HTML ---
        // Ikon prediksi ditambahkan (bi-bullseye untuk ikon target, atau bi-graph-up-arrow untuk grafik)
        const buttonsHtml = `
            <div id="custom-action-buttons" class="mobile-only">
                <a href="${config.linkRTP}" class="action-btn-extra btn-extra-rtp" target="_blank">
                    <i class="bi bi-lightning-charge-fill"></i> RTP Gacor Hari Ini
                </a>
                <a href="${config.linkWA}" class="action-btn-extra btn-extra-wa" target="_blank">
                    <i class="bi bi-whatsapp"></i> Whatsapp Uyentoto
                </a>
                <a href="${config.linkPrediksi}" class="action-btn-extra btn-extra-prediksi" target="_blank">
                    <i class="bi bi-bullseye"></i> Prediksi Togel
                </a>
            </div>
        `;

        // Menempatkan tombol tepat di bawah form login
        const mobileLoginContainer = document.getElementById('mobilelogin');
        if (mobileLoginContainer) {
            mobileLoginContainer.insertAdjacentHTML('afterend', buttonsHtml);
        }

    });
})();
