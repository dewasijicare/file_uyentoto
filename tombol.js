(function() {
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. PENGATURAN LINK (Ganti sesuai kebutuhan) ---
        const config = {
            linkRTP: "https://rtpuyentoto.online/",
            linkWA: "https://wa.me/6281234567890", // Ganti dengan nomor WA Anda
            linkPrediksi: "/prediksi" // Ganti dengan link halaman prediksi Anda
        };

        // --- 2. INJEKSI CSS ---
        const customStyles = `
            /* Styling dasar untuk tombol tambahan */
            .action-btn-extra {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                width: 100%;
                margin-bottom: 10px; /* Memberi jarak antar tombol agar tidak menempel */
                padding: 12px 15px;
                border-radius: 5px; /* Sudut membulat, sama dengan tombol login */
                font-family: inherit;
                font-weight: 800;
                font-size: 1rem;
                text-transform: uppercase;
                text-decoration: none;
                color: #ffffff !important;
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-sizing: border-box;
                position: relative;
                transition: all 0.3s ease;
            }
            
            /* Memberikan jarak antara tombol 'Daftar Sekarang' dengan tombol tambahan pertama */
            .action-btn-extra:first-child {
                margin-top: 10px;
            }

            /* Menghilangkan jarak pada tombol paling bawah */
            .action-btn-extra:last-child {
                margin-bottom: 0;
            }

            /* Efek Hover */
            .action-btn-extra:hover {
                filter: brightness(1.2);
                transform: translateY(-2px);
            }

            /* Warna dan Efek Glow untuk masing-masing tombol */
            .btn-extra-rtp {
                background: linear-gradient(180deg, #ff2a00 0%, #cc0000 100%);
                box-shadow: 0 4px 15px rgba(255, 0, 0, 0.4);
            }
            
            .btn-extra-wa {
                background: linear-gradient(180deg, #00c922 0%, #008a17 100%);
                box-shadow: 0 4px 15px rgba(0, 255, 0, 0.4);
            }

            .btn-extra-prediksi {
                background: linear-gradient(180deg, #0066ff 0%, #0037cc 100%);
                box-shadow: 0 4px 15px rgba(0, 102, 255, 0.4);
            }

            /* Ukuran Icon */
            .action-btn-extra i {
                font-size: 1.2rem;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = customStyles;
        document.head.appendChild(styleElement);

        // --- 3. INJEKSI HTML ---
        // Ikon telah ditambahkan pada semua tombol
        const buttonsHtml = `
            <a href="${config.linkRTP}" class="action-btn-extra btn-extra-rtp" target="_blank">
                <i class="bi bi-lightning-charge-fill"></i> RTP Gacor Hari Ini
            </a>
            <a href="${config.linkWA}" class="action-btn-extra btn-extra-wa" target="_blank">
                <i class="bi bi-whatsapp"></i> Whatsapp Uyentoto
            </a>
            <a href="${config.linkPrediksi}" class="action-btn-extra btn-extra-prediksi" target="_blank">
                <i class="bi bi-bullseye"></i> Prediksi Togel
            </a>
        `;

        // Mencari container yang membungkus tombol login asli
        const existingButtonsContainer = document.querySelector('#mobilelogin > div[style*="margin-top: 10px"]');

        if (existingButtonsContainer) {
            // Menyisipkan tombol-tombol baru ke dalam container yang sama
            // Ini akan membuat lebarnya otomatis mengikuti tombol login
            existingButtonsContainer.insertAdjacentHTML('beforeend', buttonsHtml);
        } else {
            console.error("Container tombol login tidak ditemukan.");
        }

    });
})();
