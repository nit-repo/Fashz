// main.js — Works in VSCode (localhost) and GitHub Pages

const repoName = "fashz";
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

// Always point BASE to project root, not /scripts/
const BASE = isLocal
  ? window.location.origin + "/" // → http://localhost:5500/
  : `${window.location.origin}/${repoName}/`; // → https://username.github.io/fashz/

const COMPONENTS = {
  header: BASE + "core/header.html",
  footer: BASE + "core/footer.html",
  hero: BASE + "core/hero.html",
  productsTitle: BASE + "core/products-title.html",
  productList: BASE + "core/product-list.html",
};

async function loadComponent(selector, path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${path}`);
    const html = await res.text();
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  } catch (err) {
    console.error(`Error loading ${path}:`, err);
  }
}

async function loadProducts(jsonPath) {
  try {
    const res = await fetch(BASE + jsonPath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const products = await res.json();
    const grid = document.querySelector("#product-grid");
    if (!grid) return;

    grid.innerHTML = products
      .map(
        (p) => `
        <article class="card">
          <div class="img"><img src="${p.image}" alt="${p.name}" /></div>
          <h3>${p.name}</h3>
          <div class="muted small">${p.variant}</div>
          <div class="price-row">
            <div class="price">${p.price}</div>
            <button class="pill ghost">+ Add</button>
          </div>
        </article>`
      )
      .join("");

    const count = document.querySelector(".section-title .muted.small:last-child");
    if (count) count.textContent = `Showing ${products.length} items`;
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#header", COMPONENTS.header);
  loadComponent("#footer", COMPONENTS.footer);
  loadComponent("#hero", COMPONENTS.hero);
  loadComponent("#products-title", COMPONENTS.productsTitle);
  loadComponent("#product-list", COMPONENTS.productList);
  loadProducts("data/products.json");
});
