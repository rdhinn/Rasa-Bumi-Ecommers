document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Fungsionalitas "Tambah ke Keranjang" ---
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountElement = document.querySelector('.cart-count');
    let cartItemCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartItemCount++;
            cartCountElement.textContent = cartItemCount;
            button.textContent = 'Ditambahkan!';
            button.style.backgroundColor = 'var(--color-primary)'; // Ubah warna setelah ditambahkan
            button.disabled = true; // Nonaktifkan tombol setelah ditambahkan

            // Opsional: Reset tombol setelah beberapa detik
            setTimeout(() => {
                button.textContent = 'Tambah +';
                button.style.backgroundColor = 'var(--color-green)';
                button.disabled = false;
            }, 2000); // Reset setelah 2 detik
        });
    });

    // --- 2. Fungsionalitas Kategori Filter ---
    const categoryItems = document.querySelectorAll('.category-item');
    const productCards = document.querySelectorAll('.product-card');

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Hapus kelas 'active' dari semua item kategori
            categoryItems.forEach(cat => cat.classList.remove('active'));
            // Tambahkan kelas 'active' ke item yang diklik
            item.classList.add('active');

            const selectedCategory = item.dataset.category;

            // Saring produk
            productCards.forEach(card => {
                if (selectedCategory === 'siap-santap' || !selectedCategory) { // Default atau jika ingin menampilkan semua
                    card.style.display = 'block';
                } else if (card.dataset.category === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 3. Fungsionalitas Navigasi Bawah ---
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah link pindah halaman
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Di aplikasi nyata, di sini akan ada fungsi untuk memuat halaman/konten baru
            // console.log(`Navigasi ke: ${item.dataset.nav}`);
            alert(`Anda mengklik navigasi: ${item.dataset.nav.toUpperCase()}`);
        });
    });

});