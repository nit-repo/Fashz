// scripts/main.js

// Reusable component loader
async function includeComponent(targetId, file) {
  const el = document.getElementById(targetId);
  if (!el) return;
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error(err);
  }
}

// Load product data dynamically
async function loadProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return; // safety check

  try {
    const res = await fetch("../data/products.json");
    const products = await res.json();

    grid.innerHTML = products
      .map(
        (p) => `
        <div class="product-card">
          <img src="${p.image}" alt="${p.title}" class="product-image" />
          <h3 class="product-title">${p.title}</h3>
          <p class="product-price">$${p.price}</p>
          <a href="../products/product.html?id=${p.id}" class="product-link">View Details</a>

        </div>
      `
      )
      .join("");
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", async () => {
  // Example: Load header/footer components
  await includeComponent("header", "../core/header.html");
  await includeComponent("footer", "../core/footer.html");

  // Load products if product grid exists
  loadProducts();
});
