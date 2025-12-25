// ====== Demo data (edit these later) ======
const SERVICES = [
  {
    id: "sig-facial",
    name: "Signature Facial",
    category: "facials",
    duration: 60,
    price: 95,
    desc: "A customized, results-driven facial for hydration, glow, and balance."
  },
  {
    id: "acne-clarify",
    name: "Acne Clarifying Treatment",
    category: "facials",
    duration: 75,
    price: 115,
    desc: "Deep cleanse + gentle exfoliation to calm congestion and support clarity."
  },
  {
    id: "dermaplane",
    name: "Dermaplane Facial",
    category: "facials",
    duration: 60,
    price: 120,
    desc: "Smoother texture and brighter tone with careful exfoliation."
  },
  {
    id: "brow-wax",
    name: "Brow Wax",
    category: "brows",
    duration: 20,
    price: 22,
    desc: "Clean, natural shaping tailored to your features."
  },
  {
    id: "brow-wax-tint",
    name: "Brow Wax + Tint",
    category: "brows",
    duration: 35,
    price: 45,
    desc: "Shape + tint for fuller-looking brows."
  },
  {
    id: "lip-chin",
    name: "Lip + Chin Wax",
    category: "waxing",
    duration: 20,
    price: 28,
    desc: "Quick, precise waxing for smooth results."
  },
  {
    id: "hydrojelly",
    name: "Hydrojelly Mask Add-on",
    category: "addons",
    duration: 10,
    price: 15,
    desc: "Boost hydration and calm redness with a targeted mask."
  },
  {
    id: "led",
    name: "LED Therapy Add-on",
    category: "addons",
    duration: 15,
    price: 20,
    desc: "Red/blue light support for healing and calming inflammation."
  }
];

// ====== Helpers ======
function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return [...root.querySelectorAll(sel)]; }

function scrollToSelector(sel){
  const el = $(sel);
  if(!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function formatMoney(n){
  return `$${Number(n).toFixed(0)}`;
}

// ====== Mobile menu ======
(function initMenu(){
  const btn = $("#menuBtn");
  const panel = $("#mobileNav");
  if(!btn || !panel) return;

  // Start hidden (HTML has [hidden], CSS shows on mobile; we respect hidden attribute)
  panel.hidden = true;

  btn.addEventListener("click", () => {
    const next = !panel.hidden;
    panel.hidden = next;
    btn.setAttribute("aria-expanded", String(!next));
  });

  // Close menu after clicking a link
  panel.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if(!a) return;
    panel.hidden = true;
    btn.setAttribute("aria-expanded", "false");
  });
})();

// ====== Scroll buttons ======
(function initScrollButtons(){
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-scroll]");
    if(!btn) return;
    const sel = btn.getAttribute("data-scroll");
    if(sel) scrollToSelector(sel);
  });
})();

// ====== Services render + filtering ======
(function initServices(){
  const grid = $("#servicesGrid");
  if(!grid) return;

  function render(filter){
    grid.innerHTML = "";

    const list = SERVICES.filter(s => filter === "all" ? true : s.category === filter);

    list.forEach(service => {
      const card = document.createElement("article");
      card.className = "card";
      card.dataset.category = service.category;

      // Book button: later you can set a real Acuity link OR keep it as scroll to #book
      // (If you want per-service preselect later, you can store a URL per service.)
      card.innerHTML = `
        <h3>${service.name}</h3>
        <p>${service.desc}</p>

        <div class="metaRow">
          <div class="meta">${service.duration} min</div>
          <div class="meta">${formatMoney(service.price)}</div>
        </div>

        <div class="cardActions">
          <button class="btn btn--primary" data-scroll="#book">Book</button>
          <button class="btn" data-service="${service.id}">Details</button>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  // Initial
  render("all");

  // Tabs
  const tabs = $all(".tab");
  tabs.forEach(t => {
    t.addEventListener("click", () => {
      tabs.forEach(x => x.classList.remove("is-active"));
      t.classList.add("is-active");
      render(t.dataset.filter || "all");
    });
  });

  // Details (simple demo: alert)
  grid.addEventListener("click", (e) => {
    const detailsBtn = e.target.closest("button[data-service]");
    if(!detailsBtn) return;

    const id = detailsBtn.getAttribute("data-service");
    const s = SERVICES.find(x => x.id === id);
    if(!s) return;

    alert(`${s.name}\n\nDuration: ${s.duration} min\nPrice: ${formatMoney(s.price)}\n\n${s.desc}`);
  });
})();

// ====== Footer year ======
$("#year").textContent = String(new Date().getFullYear());

// ====== Booking iframe is intentionally empty ======
// Later:
// 1) Set iframe src to her Acuity URL
// 2) Add Acuity embed script (if you choose) beneath the iframe
//
// Example:
// const frame = $("#bookingFrame");
// frame.src = "https://YOURSUBDOMAIN.acuityscheduling.com";
