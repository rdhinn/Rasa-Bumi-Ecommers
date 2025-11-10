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
    title: "Ubi Brulee Original",
    img: "../image/produk/Ubi Brulee1.jpeg",
    desc: "Nikmati sensasi kelezatan premium Ubi Brulee Original! Ubi pilihan yang dipanggang sempurna, bagian dalamnya lembut dan creamy, kemudian diberi topping krim manis rahasia dan dibakar (brulee) hingga lapisan atasnya menjadi karamel renyah yang menggoda. Perpaduan tekstur hangat, lembut, dan renyah dalam satu gigitan.",
    sold: 120,
    rating: "⭐⭐⭐⭐☆",
    price: "Rp13.000",
    category: "Ubi Brulee",
  },
  {
    title: "Ubi Brulee Mozzarella",
    img: "../image/produk/Ubi Brulee2.jpeg",
    desc: "Hadirlah inovasi rasa yang tak terduga! Ubi Brulee Keju Mozza menggabungkan kelembutan ubi panggang manis dengan topping krim gurih yang dilapisi lelehan keju Mozzarella premium. Dibakar hingga keju meleleh sempurna dan menghasilkan tekstur yang kenyal dan sedikit smoky di atas krim manis.",
    sold: 120,
    rating: "⭐⭐⭐⭐☆",
    price: "Rp18.000",
    category: "Ubi Brulee",
  },
  {
    title: "Ubi Brulee + Ice Cream Vanilla",
    img: "../image/produk/Ubi Brulee3.jpeg",
    desc: "Rasakan pengalaman dessert yang memanjakan lidah! Ubi Brulee Es Krim menyajikan kehangatan ubi panggang yang lembut dengan lapisan karamel renyah, disempurnakan dengan satu scoop besar Es Krim Vanilla dingin di atasnya. Kombinasi rasa dan suhu yang kontras ini menciptakan sensasi yang benar-benar memuaskan.",
    sold: 120,
    rating: "⭐⭐⭐⭐☆",
    price: "Rp25.000",
    category: "Ubi Brulee",
  },
  {
    title: "Ubi Brulee Coklat",
    img: "../image/produk/Ubi Brulee4.jpeg",
    desc: "Manjakan diri Anda dengan Ubi Brulee Cokelat Lumer! Ubi panggang pilihan yang lembut dengan lapisan brulee karamel renyah, kini disempurnakan dengan lelehan cokelat premium yang melimpah di atasnya. Perpaduan sempurna antara manis alami ubi, kerenyahan karamel, dan kekayaan rasa cokelat yang meleleh di setiap gigitan.",
    sold: 120,
    rating: "⭐⭐⭐⭐☆",
    price: "Rp18.000",
    category: "Ubi Brulee",
  },
  {
    title: "Ubi Brulee Keju",
    img: "../image/produk/Ubi Brulee5.jpeg",
    desc: "Nikmati kehangatan klasik dengan sentuhan modern! Ubi Brulee Keju Klasik menghadirkan ubi panggang lembut dengan topping krim yang manis, lapisan karamel renyah, dan ditaburi dengan parutan keju cheddar premium yang melimpah. Perpaduan rasa manis dan gurih yang seimbang, menciptakan comfort food yang sempurna.",
    sold: 120,
    rating: "⭐⭐⭐⭐☆",
    price: "Rp15.000",
    category: "Ubi Brulee",
  },
  {
    title: "Ubi Original (Kualiatas Premium)",
    img: "../image/produk/ubi Original.jpeg",
    desc: "1 Kg Ubi Cilembu Segar Pilihan (Kualitas Premium) + 1 Pack Teh Rosella Kering Lokal + 1 Lembar Panduan Cara Memanggang Terbaik",
    sold: 120,
    rating: "⭐⭐⭐⭐☆",
    price: "Rp25.000",
    category: "Ubi Original",
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

// === CART LOCALSTORAGE ===
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = cart.reduce((acc, item) => acc + (item.qty || 1), 0);

const cartBadge = document.getElementById("cartBadge");
const cartBtn = document.querySelector('nav button[data-page="cart"]');

// Tampilkan badge awal
if (cartCount > 0) {
  cartBadge.textContent = cartCount;
  cartBadge.classList.remove("hidden");
}

// --- Animasi ke keranjang ---
function animateToCart(imgSrc, startRect, product) {
  const img = document.createElement("img");
  img.src = imgSrc;
  img.style.width = startRect.width + "px";
  img.style.height = startRect.height + "px";
  img.style.left = startRect.left + "px";
  img.style.top = startRect.top + "px";
  img.style.position = "fixed";
  img.style.zIndex = 1000;
  img.style.borderRadius = "8px";
  img.style.transition = "transform 0.8s ease-in-out, opacity 0.8s ease-in-out";
  document.body.appendChild(img);

  const cartRect = cartBtn.getBoundingClientRect();
  const dx =
    cartRect.left + cartRect.width / 2 - (startRect.left + startRect.width / 2);
  const dy =
    cartRect.top + cartRect.height / 2 - (startRect.top + startRect.height / 2);

  requestAnimationFrame(() => {
    img.style.transform = `translate(${dx}px, ${dy}px) scale(0.1)`;
    img.style.opacity = "0";
  });

  img.addEventListener("transitionend", () => {
    img.remove();

    // Tambahkan produk ke cart
    let cartItem = cart.find((p) => p.title === product.title);
    if (cartItem) {
      cartItem.qty = (cartItem.qty || 0) + 1;
    } else {
      product.qty = 0; // qty mulai dari 1
      cart.push(product);
    }
    saveCart();
    updateCartBadge();
  });
}

// --- Simpan dan update ---
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function updateCartBadge() {
  cartCount = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
  if (cartCount > 0) {
    cartBadge.textContent = cartCount;
    cartBadge.classList.remove("hidden");
  } else {
    cartBadge.classList.add("hidden");
  }
}

// --- Listener tombol beli ---
document.querySelectorAll("button").forEach((btn) => {
  if (
    btn.textContent.includes("Beli Sekarang") ||
    btn.textContent.includes("Pesan Sekarang")
  ) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      let imgEl, imgSrc, product;

      if (btn.closest("#productDetailModal")) {
        imgEl = document.getElementById("detailImage");
        imgSrc = imgEl.src;
        const title = document.getElementById("detailTitle").textContent;
        product = productData.find((p) => p.title === title);
      } else {
        const card = btn.closest("div");
        imgEl = card.querySelector("img");
        imgSrc = imgEl.src;
        const title = card.querySelector("h3").textContent;
        product = productData.find((p) => p.title === title);
      }

      animateToCart(imgSrc, imgEl.getBoundingClientRect(), product);
    });
  }
});

// --- CART MODAL ---
const cartModal = document.getElementById("cartModal");
const cartItemsDiv = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const closeCart = document.getElementById("closeCart");

// buka modal
cartBtn.addEventListener("click", () => {
  renderCart();
  cartModal.classList.replace("hidden", "flex");
});
closeCart.addEventListener("click", () =>
  cartModal.classList.replace("flex", "hidden")
);
cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) cartModal.classList.replace("flex", "hidden");
});

// render cart
function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `<p class="text-center text-gray-400">Keranjang kosong</p>`;
    cartTotalEl.textContent = "Rp0";
    cartBadge.classList.add("hidden");
    return;
  }

  cart.forEach((item, index) => {
    total += parseInt(item.price.replace(/\D/g, "")) * (item.qty || 1);
    const div = document.createElement("div");
    div.className =
      "flex items-center justify-between gap-3 p-2 border rounded-xl";

    div.innerHTML = `
      <img src="${item.img}" class="w-16 h-16 rounded-xl" />
      <div class="flex-1">
        <h4 class="text-sm font-semibold">${item.title}</h4>
        <p class="text-xs text-gray-500">${item.price}</p>
        <div class="flex items-center mt-1 gap-2">
          <button class="decrease text-gray-500 px-2 py-0.5 bg-gray-200 rounded transition hover:bg-gray-300">-</button>
          <span class="qty">${item.qty || 1}</span>
          <button class="increase text-gray-500 px-2 py-0.5 bg-gray-200 rounded transition hover:bg-gray-300">+</button>
        </div>
      </div>
      <button class="remove text-red-500 text-lg hover:text-red-700 transition"><i class="fa-solid fa-trash"></i></button>
    `;

    // tombol +
    div.querySelector(".increase").addEventListener("click", () => {
      item.qty = (item.qty || 1) + 1;
      saveCart();
      renderCart();
    });

    // tombol -
    div.querySelector(".decrease").addEventListener("click", () => {
      item.qty = (item.qty || 1) - 1;
      if (item.qty <= 0) cart.splice(index, 1);
      saveCart();
      renderCart();
    });

    // tombol hapus
    div.querySelector(".remove").addEventListener("click", () => {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    });

    cartItemsDiv.appendChild(div);
  });

  cartTotalEl.textContent = `Rp${total.toLocaleString("id-ID")}`;
  updateCartBadge();
}

// === RENDER AWAL ===
renderProducts(productData);
