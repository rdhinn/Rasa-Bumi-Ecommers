// === SPLASH SCREEN ===
const splash = document.getElementById("splashScreen");
const main = document.getElementById("mainContent");
setTimeout(() => {
  splash.style.display = "none";
  main.classList.remove("hidden");
}, 2500);

// === SLIDER ===
const slider = document.getElementById("promoSlider");
const slides = Array.from(slider.children);
const dots = [
  document.getElementById("dot1"),
  document.getElementById("dot2"),
  document.getElementById("dot3"),
];
let slideIndex = 0;
function updateDots() {
  dots.forEach(
    (dot, i) =>
      (dot.className =
        i === slideIndex
          ? "w-2 h-2 rounded-full bg-amber-500"
          : "w-2 h-2 rounded-full bg-gray-300")
  );
}
function goToSlide(idx) {
  slider.scrollTo({ left: idx * slider.clientWidth, behavior: "smooth" });
  slideIndex = idx;
  updateDots();
}
function nextSlide() {
  goToSlide((slideIndex + 1) % slides.length);
}
let slideInterval = setInterval(nextSlide, 3500);
slider.addEventListener("touchstart", () => clearInterval(slideInterval));
slider.addEventListener(
  "touchend",
  () => (slideInterval = setInterval(nextSlide, 3500))
);
slider.addEventListener("scroll", () => {
  const idx = Math.round(slider.scrollLeft / slider.clientWidth);
  if (idx !== slideIndex) {
    slideIndex = idx;
    updateDots();
  }
});

// === BURGER MENU ===
const menuBtn = document.getElementById("menuBtn"),
  sideMenu = document.getElementById("sideMenu"),
  closeMenu = document.getElementById("closeMenu");
menuBtn.addEventListener("click", () =>
  sideMenu.classList.replace("hidden", "flex")
);
closeMenu.addEventListener("click", () =>
  sideMenu.classList.replace("flex", "hidden")
);
sideMenu.addEventListener("click", (e) => {
  if (e.target === sideMenu) sideMenu.classList.replace("flex", "hidden");
});

// === FILTER MODAL ===
const filterBtn = document.getElementById("filterBtn"),
  filterModal = document.getElementById("filterModal"),
  closeFilter = document.getElementById("closeFilter"),
  applyFilterBtn = document.getElementById("applyFilter"),
  filterButtons = document.querySelectorAll(".filter-btn");
filterBtn.addEventListener("click", () =>
  filterModal.classList.replace("hidden", "flex")
);
closeFilter.addEventListener("click", () =>
  filterModal.classList.replace("flex", "hidden")
);
applyFilterBtn.addEventListener("click", () => {
  applyFilterAndRender();
  filterModal.classList.replace("flex", "hidden");
});
filterModal.addEventListener("click", (e) => {
  if (e.target === filterModal) filterModal.classList.replace("flex", "hidden");
});

// === DATA PRODUK ===
const productData = [
  {
    title: "Ubi Segar (Kualitas Premium)",
    img: "../image/produk/produk3.jpeg",
    desc: "1 Kg Ubi Cilembu Segar Pilihan (Kualitas Premium) + 1 Pack Teh Rosella Kering Lokal + 1 Lembar Panduan Cara Memanggang Terbaik",
    sold: 120,
    rating: "⭐⭐⭐⭐☆",
    price: "Rp25.000",
    category: "Ubi Segar",
  },
  {
    title: "Paket Bekal Praktis",
    img: "../image/produk/produk1.jpeg",
    desc: "500 gr Ubi Cilembu Panggang (Sudah dipotong dan dikemas vacuum-sealed individual) + 1 pcs Garpu Kayu Ramah Lingkungan",
    sold: 90,
    rating: "⭐⭐⭐⭐⭐",
    price: "Rp30.000",
    category: "Paket Hemat",
  },
  {
    title: "Combo Jelajah Rasa",
    img: "../image/produk/produk5.jpeg",
    desc: "Paket hemat combo dengan 3 pcs Ubi Cilembu Panggang (Medium) + Pack Keripik Ubi Manis (200 gr) + 1 Botol Mini Saus Keju Pedas/Saus Karamel",
    sold: 75,
    rating: "⭐⭐⭐⭐⭐",
    price: "Rp20.000",
    category: "Paket Hemat",
  },
  {
    title: "Combo Keluarga Rasa",
    img: "../image/produk/produk4.jpeg",
    desc: "8 pcs Ubi Cilembu Panggang (Ukuran Besar/Jumbo) + 1 Botol Mini Saus Cokelat Aren Organik + Bonus: 2 Kemasan Dessicant untuk menjaga kelembapan ubi.",
    sold: 200,
    rating: "⭐⭐⭐⭐☆",
    price: "Rp50.000",
    category: "Siap Santap",
  },
  {
    title: "Ubi Madu Spesial",
    img: "../image/produk/produk2.jpeg",
    desc: "4 pcs Ubi Cilembu Panggang (Ukuran Medium) + 1 sachet Sambal Cocolan Madu",
    sold: 50,
    rating: "⭐⭐⭐☆☆",
    price: "Rp15.000",
    category: "Siap Santap",
  },
];

// === RENDER PRODUK ===
const bestSellerDiv = document.getElementById("bestSellerProducts");
function renderProducts(products) {
  bestSellerDiv.innerHTML = "";
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className =
      "bg-white shadow-sm rounded-xl p-3 flex flex-col gap-2 cursor-pointer hover:scale-105 transition";
    card.innerHTML = `<img src="${p.img}" class="rounded-xl" alt="${p.title}" />
      <h3 class="text-sm font-semibold text-gray-800">${p.title}</h3>
      <p class="text-xs text-gray-500">${p.price}</p>`;
    card.addEventListener("click", () => showDetail(p));
    bestSellerDiv.appendChild(card);
  });
}

// === MODAL DETAIL PRODUK ===
const detailModal = document.getElementById("productDetailModal"),
  detailTitle = document.getElementById("detailTitle"),
  detailImage = document.getElementById("detailImage"),
  detailDesc = document.getElementById("detailDesc"),
  detailSold = document.getElementById("detailSold"),
  detailRating = document.getElementById("detailRating"),
  detailPrice = document.getElementById("detailPrice"),
  closeDetail = document.getElementById("closeDetail");
function showDetail(product) {
  detailTitle.textContent = product.title;
  detailImage.src = product.img;
  detailDesc.textContent = product.desc;
  detailSold.textContent = "Terjual: " + product.sold;
  detailRating.textContent = "Rating: " + product.rating;
  detailPrice.textContent = product.price;
  detailModal.classList.replace("hidden", "flex");
}
closeDetail.addEventListener("click", () =>
  detailModal.classList.replace("flex", "hidden")
);
detailModal.addEventListener("click", (e) => {
  if (e.target === detailModal) detailModal.classList.replace("flex", "hidden");
});

// === FILTER KATEGORI & SORT ===
const categoryButtons = document.querySelectorAll(".category-btn");
let selectedCategory = "Semua";
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => {
      // reset semua tombol selain yang diklik
      b.classList.remove("bg-amber-600", "text-white");
      b.classList.add("bg-gray-100", "text-gray-700");
    });
    // tombol yang diklik jadi aktif
    btn.classList.remove("bg-gray-100", "text-gray-700");
    btn.classList.add("bg-amber-600", "text-white");

    selectedCategory = btn.dataset.category || btn.textContent.trim();
    applyFilterAndRender();
  });
});
let activeSort = null;
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) =>
      b.classList.remove("bg-amber-50", "text-white")
    );
    btn.classList.add("bg-amber-50", "text-white");
    activeSort = btn.querySelector("span").textContent.trim();
  });
});

// === SEARCH ===
const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener("input", () => {
  applyFilterAndRender(); // memanggil filter & search setiap input
});

// === FILTER + SEARCH + SORT FUNCTION ===
function applyFilterAndRender() {
  const keyword = searchInput.value.toLowerCase();
  let filtered = [...productData];

  // filter kategori
  if (selectedCategory !== "Semua") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  // filter search
  if (keyword) {
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(keyword));
  }

  // sort
  switch (activeSort) {
    case "Harga Terendah":
      filtered.sort(
        (a, b) =>
          parseInt(a.price.replace(/\D/g, "")) -
          parseInt(b.price.replace(/\D/g, ""))
      );
      break;
    case "Harga Tertinggi":
      filtered.sort(
        (a, b) =>
          parseInt(b.price.replace(/\D/g, "")) -
          parseInt(a.price.replace(/\D/g, ""))
      );
      break;
    case "Terlaris":
      filtered.sort((a, b) => b.sold - a.sold);
      break;
    case "Terbaru":
      filtered.reverse();
      break;
  }

  renderProducts(filtered);
}

// === NAVIGATION ===
const navButtons = document.querySelectorAll("nav button");

// Fungsi untuk update warna
function updateActive(page) {
  navButtons.forEach((btn) => {
    btn.classList.remove("text-amber-600");
    btn.classList.add("text-gray-500");
    if (btn.dataset.page === page) {
      btn.classList.add("text-amber-600");
      btn.classList.remove("text-gray-500");
    }
  });
}

//animation
let cartCount = 0;
const cartBadge = document.getElementById("cartBadge");
const cartBtn = document.querySelector('nav button[data-page="cart"]');

function animateToCart(imgSrc, startRect) {
  const img = document.createElement("img");
  img.src = imgSrc;
  img.style.width = startRect.width + "px";
  img.style.height = startRect.height + "px";
  img.style.left = startRect.left + "px";
  img.style.top = startRect.top + "px";
  img.classList.add("fly");
  document.body.appendChild(img);

  // Hitung jarak ke keranjang
  const cartRect = cartBtn.getBoundingClientRect();
  const dx =
    cartRect.left + cartRect.width / 2 - (startRect.left + startRect.width / 2);
  const dy =
    cartRect.top + cartRect.height / 2 - (startRect.top + startRect.height / 2);

  img.style.setProperty("--x", dx + "px");
  img.style.setProperty("--y", dy + "px");

  img.addEventListener("animationend", () => {
    img.remove();
    cartCount++;
    cartBadge.textContent = cartCount;
    cartBadge.classList.remove("hidden");
  });
}

// Tambahkan listener untuk semua tombol beli di card dan modal
document.querySelectorAll("button").forEach((btn) => {
  if (
    btn.textContent.includes("Beli Sekarang") ||
    btn.textContent.includes("Pesan Sekarang")
  ) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      // Ambil gambar produk
      let imgSrc;
      let imgEl;

      // Jika dari modal
      if (btn.closest("#productDetailModal")) {
        imgSrc = document.getElementById("detailImage").src;
        imgEl = document.getElementById("detailImage");
      } else {
        // Dari card
        imgEl = btn.closest("div").querySelector("img");
        imgSrc = imgEl.src;
      }

      const rect = imgEl.getBoundingClientRect();
      animateToCart(imgSrc, rect);
    });
  }
});

// === RENDER AWAL ===
renderProducts(productData);
