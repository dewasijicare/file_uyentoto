(function() {
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. PENGATURAN LINK ---
        // Link RTP sudah disesuaikan. Jangan lupa sesuaikan juga link WA dan Prediksi di bawah ini:
        const config = {
            linkRTP: "https://rtpuyentoto.online/",
            linkWA: "https://wa.me/6281234567890", // <-- Ganti dengan nomor WhatsApp Uyentoto Anda
            linkPrediksi: "/prediksi"              // <-- Ganti dengan URL halaman Prediksi Togel Anda
        };

        // --- 2. INJEKSI CSS ---
        const customStyles = `
            /* Wadah pembungkus ke 3 tombol */
            #custom-action-buttons {
                display: flex;
                flex-direction: column;
                gap: 10px; /* Jarak rapi antar tombol */
                width: 100%;
                margin-top: 10px; /* Jarak dari tombol Daftar Sekarang */
            }

            /* Styling dasar tombol (Lebar 100%, Sudut membulat sama dengan form login) */
            .action-btn-extra {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                width: 100%;
                padding: 10px 15px; 
                border-radius: 5px; /* Mengikuti radius kotak tombol Daftar/Masuk */
                font-family: inherit;
                font-weight: 700;
                font-size: 0.95rem;
                text-transform: uppercase;
                text-decoration: none;
                color: #ffffff !important;
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-sizing: border-box;
                transition: filter 0.3s ease, transform 0.2s ease;
            }

            /* Efek saat disentuh/klik */
            .action-btn-extra:hover {
                filter: brightness(1.2);
                transform: translateY(-2px);
            }

            /* Warna latar (Gradient) dan Animasi Glow untuk masing-masing tombol */
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

            /* Penyesuaian ukuran ikon */
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
        // Mengunci langsung tombol "Daftar Sekarang" pada form mobile
        const btnDaftar = document.querySelector('#mobilelogin .btn-daftar-mobile');

        if (btnDaftar) {
            // Memasukkan 3 tombol ekstra langsung di bawah tombol Daftar
            btnDaftar.insertAdjacentHTML('afterend', buttonsHtml);
        } else {
            console.warn("Tombol Daftar tidak ditemukan.");
        }

    });
})();
