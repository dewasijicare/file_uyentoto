(function() {
    document.addEventListener('DOMContentLoaded', function() {
        
        // URL Logo Baru
        const newLogoUrl = "https://cdn.jsdelivr.net/gh/dewasijicare/file_uyentoto@1bc58ac292cf0e6b7a2b20ed8b85b446362a149b/logoweb.webp";

        // Fungsi untuk mengganti gambar
        function changeLogo() {
            // 1. Targetkan semua elemen dengan class 'logoimg' (Header & Appbar Mobile)
            // Sesuai source code baris 53 & 56
            const mainLogos = document.querySelectorAll('img.logoimg');
            
            // 2. Targetkan logo di dalam menu Informasi/Modal (jika ada)
            // Sesuai source code baris 315
            const infoLogos = document.querySelectorAll('#informasi-logo img');

            // Gabungkan semua target
            const allLogos = [...mainLogos, ...infoLogos];

            allLogos.forEach(img => {
                if(img) {
                    img.src = newLogoUrl;
                    // Reset srcset agar browser tidak bingung
                    img.srcset = ""; 
                    // Opsional: Pastikan ukuran proporsional
                    img.style.maxWidth = "100%"; 
                    img.style.height = "auto";
                }
            });
        }

        // Jalankan fungsi
        changeLogo();

        // Jaga-jaga jika ada elemen yang di-load belakangan (Observer)
        const observer = new MutationObserver((mutations) => {
            changeLogo();
        });
        
        // Pantau perubahan di body (opsional, untuk memastikan logo tetap berubah walau ada ajax load)
        observer.observe(document.body, { childList: true, subtree: true });

    });
})();