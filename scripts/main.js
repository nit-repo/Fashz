// main.js
const COMPONENTS = {
  header: "/core/header.html",
  footer: "/core/footer.html",
  hero: "/core/hero.html",
  productsTitle: "/core/products-title.html",
  productList: "/core/product-list.html"
};

async function loadComponent(selector, path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP ${response.status} - ${path}`);
    const html = await response.text();
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${path}:`, error);
  }
}

async function loadProducts(jsonPath) {
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const products = await response.json();
    const grid = document.querySelector("#product-grid");
    if (!grid) return;

    grid.innerHTML = products
      .map(
        p => `
        <article class="card">
          <div class="img"><img src="${p.image}" alt="${p.name}" /></div>
          <h3>${p.name}</h3>
          <div class="muted small">${p.variant}</div>
          <div class="price-row">
            <div class="price">${p.price}</div>
            <button class="pill ghost">+ Add</button>
          </div>
        </article>
      `
      )
      .join("");

    const count = document.querySelector(".section-title .muted.small:last-child");
    if (count) count.textContent = `Showing ${products.length} items`;
  } catch (error) {
    console.error("Error loading products:", error);
  }
}
