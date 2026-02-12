(function() {
    document.addEventListener('DOMContentLoaded', function() {
        
        // --- KONFIGURASI ---
        const newLogoUrl = "https://cdn.jsdelivr.net/gh/dewasijicare/file_uyentoto@1bc58ac292cf0e6b7a2b20ed8b85b446362a149b/logoweb.webp";

        // Fungsi Ganti Logo dengan Pengecekan Ketat
        function changeLogo() {
            // Targetkan semua logo (Header & Menu Informasi)
            const targets = [
                ...document.querySelectorAll('img.logoimg'), 
                ...document.querySelectorAll('#informasi-logo img')
            ];

            targets.forEach(img => {
                if (img) {
                    // --- PERBAIKAN UTAMA DI SINI ---
                    // Cek dulu: Apakah src sudah benar? 
                    // Jika SUDAH mengandung link logo baru, JANGAN diapa-apakan.
                    // Ini mencegah animasi restart (reset) terus menerus.
                    if (!img.src.includes("file_uyentoto@1bc58ac292cf0e6b7a2b20ed8b85b446362a149b/logoweb.webp")) {
                        
                        img.src = newLogoUrl;
                        
                        // Bersihkan atribut lain yang mungkin mengganggu
                        img.removeAttribute('srcset'); 
                        
                        // Styling agar rapi
                        img.style.width = "auto"; 
                        img.style.height = "auto";
                        img.style.maxHeight = "50px"; 
                        img.style.objectFit = "contain";
                    }
                }
            });
        }

        // 1. Jalankan saat halaman siap
        changeLogo();

        // 2. Gunakan Observer untuk memantau perubahan halaman (AJAX/Loading)
        // Observer ini aman karena kita sudah pasang pengecekan "if" di atas
        const observer = new MutationObserver((mutations) => {
            changeLogo();
        });
        
        observer.observe(document.body, { childList: true, subtree: true });

    });
})();
