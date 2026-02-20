(function() {
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. PENGATURAN LINK ---
        const config = {
            linkRTP: "https://rtpuyentoto.online/",
            linkWA: "https://wa.me/6281234567890", // Ganti dengan nomor WhatsApp
            linkPrediksi: "/prediksi" // Ganti dengan link prediksi
        };

        // --- 2. INJEKSI CSS ---
        const customStyles = `
            /* Wadah pembungkus ke 3 tombol */
            #custom-action-buttons {
                display: flex;
                flex-direction: column;
                gap: 10px; /* Jarak konsisten antar tombol */
                width: 100%;
                margin-top: 10px; /* Jarak dari tombol Daftar Sekarang */
            }

            /* Styling agar lebar, border-radius, dan font sama dengan form login */
            .action-btn-extra {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                width: 100%;
                padding: 10px 15px; 
                border-radius: 5px; /* Mengikuti radius kotak Masuk/Daftar */
                font-family: inherit;
                font-weight: 700;
                font-size: 0.95rem;
                text-transform: uppercase;
                text-decoration: none;
                color: #ffffff !important;
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-sizing: border-box;
                transition: filter 0.3s ease;
            }

            .action-btn-extra:hover {
                filter: brightness(1.2);
            }

            /* Warna latar (Gradient) untuk masing-masing tombol */
            .btn-extra-rtp { background: linear-gradient(180deg, #ff2a00 0%, #cc0000 100%); }
            .btn-extra-wa { background: linear-gradient(180deg, #00c922 0%, #008a17 100%); }
            .btn-extra-prediksi { background: linear-gradient(180deg, #0066ff 0%, #0037cc 100%); }

            /* Penyesuaian ikon */
            .action-btn-extra i {
                font-size: 1.2rem;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = customStyles;
        document.head.appendChild(styleElement);

        // --- 3. INJEKSI HTML ---
        const buttonsHtml = `
            <div id="custom-action-buttons">
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

        // --- 4. EKSEKUSI PENEMPATAN ---
        // Mencari target yang paling akurat: tombol "Daftar Sekarang" versi mobile
        const btnDaftar = document.querySelector('#mobilelogin .btn-daftar-mobile');

        if (btnDaftar) {
            // Memasukkan kumpulan tombol langsung di BAWAH tombol "Daftar Sekarang"
            btnDaftar.insertAdjacentHTML('afterend', buttonsHtml);
        } else {
            console.warn("Tombol Daftar tidak ditemukan, mencari fallback...");
        }

    });
})();
