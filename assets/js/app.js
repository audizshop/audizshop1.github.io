const WHATSAPP_NUMBER = "50557178449";
const CART_KEY = "novatech-cart";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const money = (value) => `$${value.toFixed(2)} USD`;
const categoryById = (id) => CATEGORIES.find((category) => category.id === id);
const productById = (id) => PRODUCTS.find((product) => product.id === id);
const params = new URLSearchParams(window.location.search);

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === productId);
  if (item) item.quantity += quantity;
  else cart.push({ id: productId, quantity });
  saveCart(cart);
  renderCartPage();
}

function removeFromCart(productId) {
  saveCart(getCart().filter((entry) => entry.id !== productId));
  renderCartPage();
}

function setQuantity(productId, quantity) {
  const cleanQuantity = Math.max(1, Number(quantity) || 1);
  saveCart(getCart().map((entry) => entry.id === productId ? { ...entry, quantity: cleanQuantity } : entry));
  renderCartPage();
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  $$(".cart-count").forEach((node) => node.textContent = count);
}

function productCard(product) {
  const category = categoryById(product.category);
  return `
    <article class="product-card">
      <a class="product-image" href="product.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}">
      </a>
      <div class="product-info">
        <span class="pill">${category.name}</span>
        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <p>${product.description}</p>
        <div class="product-meta">
          <strong>${money(product.price)}</strong>
          <span>${product.condition}</span>
        </div>
        <button class="button dark add-to-cart" type="button" data-id="${product.id}">Agregar</button>
      </div>
    </article>
  `;
}

function renderShared() {
  const nav = $(".category-nav");
  if (nav) {
    nav.innerHTML = CATEGORIES.map((category) => `<a href="category.html?cat=${category.id}">${category.name}</a>`).join("");
  }
  updateCartCount();
  if (window.lucide) window.lucide.createIcons();
}

function renderHome() {
  const featured = $(".featured-products");
  if (featured) featured.innerHTML = PRODUCTS.filter((product) => product.featured && product.available).map(productCard).join("");

  const grid = $(".category-grid");
  if (grid) {
    grid.innerHTML = CATEGORIES.map((category) => `
      <a class="category-card" href="category.html?cat=${category.id}">
        <img src="${category.image}" alt="${category.name}">
        <span>${category.name}</span>
      </a>
    `).join("");
  }
}

function sortedProducts(products) {
  const sort = $(".sort-select")?.value || "featured";
  return [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return Number(b.featured) - Number(a.featured);
  });
}

function renderCategory() {
  const catId = params.get("cat") || CATEGORIES[0].id;
  const category = categoryById(catId) || CATEGORIES[0];
  document.title = `${category.name} | NovaTech`;
  $(".category-title").textContent = category.name;
  $(".category-description").textContent = `Productos disponibles en ${category.name.toLowerCase()}.`;
  const products = PRODUCTS.filter((product) => product.category === category.id && product.available);
  $(".result-count").textContent = `${products.length} producto${products.length === 1 ? "" : "s"} disponible${products.length === 1 ? "" : "s"}`;
  $(".category-products").innerHTML = sortedProducts(products).map(productCard).join("");
}

function renderProduct() {
  const product = productById(params.get("id")) || PRODUCTS[0];
  const category = categoryById(product.category);
  document.title = `${product.name} | NovaTech`;
  $(".product-page").innerHTML = `
    <section class="product-detail">
      <div class="gallery">
        <img class="main-product-image" src="${product.gallery[0]}" alt="${product.name}">
        <div class="thumbs">
          ${product.gallery.map((image, index) => `<button type="button" class="thumb ${index === 0 ? "active" : ""}" data-image="${image}"><img src="${image}" alt="${product.name} vista ${index + 1}"></button>`).join("")}
        </div>
      </div>
      <div class="product-copy">
        <a class="back-link" href="category.html?cat=${category.id}">${category.name}</a>
        <h1>${product.name}</h1>
        <div class="status-row">
          <span class="pill">${product.condition}</span>
          <span class="pill ${product.available ? "available" : "sold"}">${product.available ? "Disponible" : "Agotado"}</span>
        </div>
        <p class="price">${money(product.price)}</p>
        <p class="lead">${product.description}</p>
        <div class="purchase-row">
          <button class="button primary add-to-cart" type="button" data-id="${product.id}">Anadir al carrito</button>
          <a class="button ghost" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quiero consultar por ${product.name}.`)}" target="_blank" rel="noreferrer">Consultar</a>
        </div>
        <div class="detail-panels">
          <section><h2>Features</h2><ul>${product.features.map((item) => `<li>${item}</li>`).join("")}</ul></section>
          <section><h2>Incluye</h2><ul>${product.includes.map((item) => `<li>${item}</li>`).join("")}</ul></section>
        </div>
      </div>
    </section>
  `;
}

function renderCartPage() {
  if (document.body.dataset.page !== "cart") return;
  const cartItems = getCart().map((item) => ({ ...item, product: productById(item.id) })).filter((item) => item.product);
  const container = $(".cart-items");
  const summary = $(".cart-summary");
  if (!cartItems.length) {
    container.innerHTML = `<div class="empty-state"><h2>Tu carrito esta vacio</h2><p>Agrega productos disponibles y vuelve para enviar tu pedido.</p><a class="button primary" href="index.html#destacados">Ver productos</a></div>`;
    summary.innerHTML = "";
    return;
  }
  container.innerHTML = cartItems.map(({ product, quantity }) => `
    <article class="cart-item">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h2>${product.name}</h2>
        <p>${product.condition} - ${money(product.price)}</p>
        <div class="quantity-control">
          <button type="button" class="qty-btn" data-id="${product.id}" data-action="decrease" aria-label="Reducir cantidad">-</button>
          <input type="number" min="1" value="${quantity}" data-id="${product.id}" aria-label="Cantidad de ${product.name}">
          <button type="button" class="qty-btn" data-id="${product.id}" data-action="increase" aria-label="Aumentar cantidad">+</button>
        </div>
      </div>
      <div class="cart-line-total">
        <strong>${money(product.price * quantity)}</strong>
        <button type="button" class="text-button remove-item" data-id="${product.id}">Quitar</button>
      </div>
    </article>
  `).join("");
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const message = [
    "Hola, quiero realizar este pedido:",
    ...cartItems.map((item) => `- ${item.quantity} x ${item.product.name} (${money(item.product.price)} c/u) = ${money(item.product.price * item.quantity)}`),
    `Total estimado: ${money(subtotal)}`,
    "",
    "Nombre:",
    "Direccion o punto de entrega:",
    "Metodo de pago:"
  ].join("\n");
  summary.innerHTML = `
    <h2>Resumen</h2>
    <div class="summary-line"><span>Productos</span><strong>${cartItems.reduce((sum, item) => sum + item.quantity, 0)}</strong></div>
    <div class="summary-line total"><span>Total</span><strong>${money(subtotal)}</strong></div>
    <p>El total no incluye envio. Confirmaremos disponibilidad y entrega por WhatsApp.</p>
    <a class="button primary checkout-button" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}" target="_blank" rel="noreferrer">Enviar pedido por WhatsApp</a>
    <button class="button ghost clear-cart" type="button">Vaciar carrito</button>
  `;
}

function renderSearchResults(query = "") {
  const results = $(".search-results");
  if (!results) return;
  const clean = query.trim().toLowerCase();
  const matches = clean
    ? PRODUCTS.filter((product) => [product.name, product.description, categoryById(product.category).name, ...product.features].join(" ").toLowerCase().includes(clean))
    : PRODUCTS.filter((product) => product.featured);
  results.innerHTML = matches.length ? matches.map((product) => `
    <a class="search-result" href="product.html?id=${product.id}">
      <img src="${product.image}" alt="${product.name}">
      <span><strong>${product.name}</strong><small>${categoryById(product.category).name} - ${money(product.price)}</small></span>
    </a>
  `).join("") : `<p class="no-results">No encontramos productos con esa busqueda.</p>`;
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const addButton = event.target.closest(".add-to-cart");
    if (addButton) addToCart(addButton.dataset.id);

    const removeButton = event.target.closest(".remove-item");
    if (removeButton) removeFromCart(removeButton.dataset.id);

    const qtyButton = event.target.closest(".qty-btn");
    if (qtyButton) {
      const item = getCart().find((entry) => entry.id === qtyButton.dataset.id);
      const next = (item?.quantity || 1) + (qtyButton.dataset.action === "increase" ? 1 : -1);
      setQuantity(qtyButton.dataset.id, next);
    }

    const thumb = event.target.closest(".thumb");
    if (thumb) {
      $(".main-product-image").src = thumb.dataset.image;
      $$(".thumb").forEach((node) => node.classList.toggle("active", node === thumb));
    }

    if (event.target.closest(".search-trigger")) {
      $(".search-panel").hidden = false;
      renderSearchResults();
      $("#globalSearch").focus();
    }

    if (event.target.closest(".search-close") || event.target.classList.contains("search-panel")) {
      $(".search-panel").hidden = true;
    }

    if (event.target.closest(".clear-cart")) {
      saveCart([]);
      renderCartPage();
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.matches(".quantity-control input")) setQuantity(event.target.dataset.id, event.target.value);
    if (event.target.matches("#globalSearch")) renderSearchResults(event.target.value);
  });

  $(".sort-select")?.addEventListener("change", renderCategory);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && $(".search-panel")) $(".search-panel").hidden = true;
  });
}

function init() {
  renderShared();
  bindEvents();
  if (document.body.dataset.page === "home") renderHome();
  if (document.body.dataset.page === "category") renderCategory();
  if (document.body.dataset.page === "product") renderProduct();
  if (document.body.dataset.page === "cart") renderCartPage();
  if (window.lucide) window.lucide.createIcons();
}

init();
