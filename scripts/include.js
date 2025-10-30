document.addEventListener("DOMContentLoaded", () => {
  const includeElements = document.querySelectorAll("[data-include]");
  
  includeElements.forEach(async el => {
    const file = el.getAttribute("data-include");
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Could not load ${file}`);
      const html = await response.text();
      el.innerHTML = html;

      // Recursively load nested includes (like header → nav → logo)
      const nested = el.querySelectorAll("[data-include]");
      nested.forEach(async innerEl => {
        const innerFile = innerEl.getAttribute("data-include");
        const innerRes = await fetch(innerFile);
        if (innerRes.ok) innerEl.innerHTML = await innerRes.text();
      });
    } catch (err) {
      el.innerHTML = `<div style="color:red;">Error loading ${file}</div>`;
    }
  });
});
