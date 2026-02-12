(function() {
    
    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. KONFIGURASI WARNA (Bisa diedit) ---
        const config = {
            gold: "#d4af37",       // Warna Emas (Angka & Aksen)
            bgMain: "#1a1a1a",     // Background Utama (Hitam Abu)
            bgDark: "#000000",     // Background History (Hitam Pekat)
            textWhite: "#ffffff",  // Teks Utama
            textGrey: "#888888",   // Teks Tanggal/Secondary
            border: "#333333"      // Warna Garis Tipis
        };

        // --- 2. CSS CUSTOM (Premium Table Look) ---
        // Kita menimpa style bawaan Bootstrap Accordion
        const premiumStyles = `
            /* --- Reset Container --- */
            #togel-mobile {
                padding: 10px !important;
                background: ${config.bgMain} !important;
            }

            /* Hilangkan style accordion default bootstrap */
            #togel-mobile .accordion-item {
                background-color: transparent !important;
                border: none !important;
                margin-bottom: 8px !important;
                border-radius: 8px !important;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            }

            /* --- HEADER (Baris Utama Pasaran) --- */
            #togel-mobile .accordion-button {
                background: linear-gradient(145deg, #2b2b2b, #1e1e1e) !important;
                color: ${config.textWhite} !important;
                box-shadow: none !important; /* Hilangkan glow biru default */
                padding: 15px 20px !important;
                border: 1px solid ${config.border} !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
            }

            /* Saat Header Diklik (Aktif/Terbuka) */
            #togel-mobile .accordion-button:not(.collapsed) {
                background: #111 !important;
                border-left: 4px solid ${config.gold} !important; /* Aksen Emas di kiri */
                color: ${config.gold} !important;
            }

            /* Hilangkan icon panah default bootstrap yang jelek */
            #togel-mobile .accordion-button::after {
                filter: invert(1) grayscale(100%) brightness(200%); /* Bikin jadi putih */
                width: 12px !important;
                height: 12px !important;
                background-size: contain !important;
            }
            #togel-mobile .accordion-button:not(.collapsed)::after {
                filter: sepia(100%) saturate(300%) hue-rotate(5deg); /* Bikin jadi emas saat aktif */
            }

            /* --- ELEMEN DALAM HEADER --- */
            
            /* Nama Pasaran */
            #togel-mobile .accordion-button .pasaran {
                font-weight: bold !important;
                font-size: 14px !important;
                text-transform: uppercase !important;
                letter-spacing: 0.5px;
            }

            /* Angka Keluaran Utama */
            #togel-mobile .accordion-button .keluaran {
                font-family: 'Oswald', sans-serif !important;
                font-size: 18px !important;
                font-weight: bold !important;
                color: ${config.gold} !important;
                position: absolute;
                right: 50px; /* Posisi angka agar tidak nabrak panah */
            }

            /* Tanggal di Header (Opsional: disembunyikan agar bersih, atau dikecilkan) */
            #togel-mobile .accordion-button .tanggal {
                font-size: 10px !important;
                color: ${config.textGrey} !important;
                display: block;
                position: absolute;
                right: 50px;
                bottom: 8px; /* Tanggal ditaruh di bawah angka */
                display: none; /* Sembunyikan tanggal di header biar rapi (opsional) */
            }


            /* --- HISTORY (Daftar Keluaran Sebelumnya) --- */
            
            /* Container History */
            #togel-mobile .accordion-collapse {
                background-color: ${config.bgDark} !important;
                border-left: 1px solid ${config.border};
                border-right: 1px solid ${config.border};
                border-bottom: 1px solid ${config.border};
                border-radius: 0 0 8px 8px;
            }

            /* Baris History Item */
            #togel-mobile .accordion-collapse .result {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                padding: 10px 20px !important;
                border-bottom: 1px solid #222 !important;
                transition: background 0.2s;
            }

            #togel-mobile .accordion-collapse .result:last-child {
                border-bottom: none !important;
            }

            /* Hover Effect pada History */
            #togel-mobile .accordion-collapse .result:hover {
                background-color: #222 !important;
            }

            /* Tanggal di History */
            #togel-mobile .accordion-collapse .result .tanggal {
                font-size: 12px !important;
                color: ${config.textGrey} !important;
                font-family: monospace !important; /* Supaya lebar angka tanggal sama */
            }

            /* Angka di History */
            #togel-mobile .accordion-collapse .result .keluaran {
                font-size: 16px !important;
                font-weight: bold !important;
                color: ${config.textWhite} !important;
                letter-spacing: 1px;
            }
            
            /* Pasaran di History (Biasanya kosong di history, kita sembunyikan) */
            #togel-mobile .accordion-collapse .result .pasaran {
                display: none !important; 
            }

            /* Label 'History' Kecil (Opsional) */
            .history-label {
                font-size: 10px; 
                color: #555; 
                padding: 5px 20px; 
                text-transform: uppercase; 
                letter-spacing: 1px;
                background: #000;
            }
        `;

        // Inject Style
        const styleElement = document.createElement('style');
        styleElement.innerHTML = premiumStyles;
        document.head.appendChild(styleElement);


        // --- 3. DOM MANIPULATION (Opsional: Menambah Label) ---
        // Kita tambahkan sedikit label agar user tau itu history
        const accordions = document.querySelectorAll('#togel-mobile .accordion-collapse');
        accordions.forEach(acc => {
            if (!acc.querySelector('.history-label')) {
                const lbl = document.createElement('div');
                lbl.className = 'history-label';
                lbl.innerText = 'Riwayat Keluaran';
                acc.insertBefore(lbl, acc.firstChild);
            }
        });

    });

})();
