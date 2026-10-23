(() => {
  const T = {
    es: { nav_menu: "Menú", nav_combos: "Barcos", nav_gallery: "Galería", nav_reviews: "Reseñas", nav_visit: "Visítanos", tagline: "Sabor · Tradición · Pasión",
      order_now: "Hacer pedido", menu_note: "Arma tu pedido aquí y envíalo por WhatsApp al finalizar", promos_title: "Novedades", new_badge: "NUEVO", combos_eyebrow: "Promociones y combos", combos_title: "Nuestros barcos",
      combos_lede: "Una experiencia para compartir que combina sabor, frescura y arte.", menu_title: "Menú", spicy: "Picante",
      cop: "Precios en pesos colombianos (COP)", gallery_title: "Galería", reviews_title: "Reseñas", reviews_count: "reseñas",
      see_more: "Ver más", see_less: "Ver menos", write_review: "Déjanos tu reseña en Google", reviews_by_google: "Reseñas de Google",
      visit_eyebrow: "Gracias por elegirnos", visit_title: "Visítanos",
      address: "Dirección", hours: "Horario", contact: "WhatsApp", follow: "Síguenos",
      wa_questions: "¿Preguntas?", wa_aria: "¿Preguntas? Escríbenos por WhatsApp",
      add: "Agregar", cart: "Tu pedido", empty: "Tu pedido está vacío. Agrega platos del menú.", total: "Total",
      name: "Nombre", phone: "Teléfono", mode: "Entrega", delivery: "Domicilio", pickup: "Recoger en el local",
      addr: "Dirección de entrega", notes: "Notas (sabores de sushi para combos, sin picante, etc.)",
      pay: "Pago", cash: "Efectivo", transfer: "Transferencia / Nequi", card: "Tarjeta (datáfono)",
      send: "Enviar pedido por WhatsApp", directions: "Cómo llegar", call: "Llamar", view: "Ver pedido", need: "Escribe tu nombre", needAddr: "Escribe la dirección de entrega",
      delNote: "Domicilio propio del restaurante. El costo se confirma por WhatsApp.", tripadvisor: "Califícanos en TripAdvisor", msgHead: "Hola Ryori Sushi! Quiero hacer este pedido:" },
    en: { nav_menu: "Menu", nav_combos: "Boats", nav_gallery: "Gallery", nav_reviews: "Reviews", nav_visit: "Visit", tagline: "Flavor · Tradition · Passion",
      order_now: "Order now", menu_note: "Build your order here and send it on WhatsApp at checkout.", promos_title: "What's new", new_badge: "NEW", combos_eyebrow: "Promotions & combos", combos_title: "Our boats",
      combos_lede: "A shared experience combining flavor, freshness, and artistry.", menu_title: "Menu", spicy: "Spicy",
      cop: "Prices in Colombian pesos (COP)", gallery_title: "Gallery", reviews_title: "Reviews", reviews_count: "reviews",
      see_more: "See more", see_less: "See less", write_review: "Leave us a review on Google", reviews_by_google: "Reviews by Google",
      visit_eyebrow: "Thank you for choosing us", visit_title: "Visit us",
      address: "Address", hours: "Hours", contact: "WhatsApp", follow: "Follow us",
      wa_questions: "Questions?", wa_aria: "Questions? Message us on WhatsApp",
      add: "Add", cart: "Your order", empty: "Your order is empty. Add dishes from the menu.", total: "Total",
      name: "Name", phone: "Phone", mode: "Order type", delivery: "Delivery", pickup: "Pickup",
      addr: "Delivery address", notes: "Notes (sushi choices for combos, no spicy, etc.)",
      pay: "Payment", cash: "Cash", transfer: "Transfer / Nequi", card: "Card (on delivery)",
      send: "Send order on WhatsApp", directions: "Get directions", call: "Call", view: "View order", need: "Enter your name", needAddr: "Enter the delivery address",
      delNote: "Delivered by our own team. Delivery fee is confirmed on WhatsApp.", tripadvisor: "Review us on TripAdvisor", msgHead: "Hi Ryori Sushi! I'd like to order:" }
  };

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };

  let lang = store.get("ryori_lang_v2", "es"); // always Spanish unless the visitor tapped EN
  let cart = store.get("ryori_cart_v2", {}); // key -> qty (v2: Entradas groups reordered, old position-keys would point at the wrong dish)
  let REVIEWS = null; // loaded async from data/reviews.json
  let activeTab = MENU[0].id;
  const fmt = n => "$" + n.toLocaleString("es-CO");
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- platform ----------
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isMobile = isIOS || isAndroid;
  const isMac = !isMobile && navigator.platform === "MacIntel";
  const isWindows = !isMobile && /Win/.test(navigator.platform);
  const pf = isIOS ? "pf-ios" : isAndroid ? "pf-android" : isMac ? "pf-mac" : isWindows ? "pf-windows" : "";
  document.documentElement.classList.add(isMobile ? "is-mobile" : "is-desktop");
  if (pf) document.documentElement.classList.add(pf);

  // ---------- whatsapp links ----------
  function waLink(text) {
    const q = encodeURIComponent(text);
    return isMobile
      ? { href: `https://wa.me/${CONFIG.whatsapp}?text=${q}`, target: "_self" }
      : { href: `https://web.whatsapp.com/send?phone=${CONFIG.whatsapp}&text=${q}`, target: "_blank" };
  }
  function openWhatsApp(text) {
    const wa = waLink(text);
    if (wa.target === "_self") location.href = wa.href; else window.open(wa.href, "_blank", "noopener");
  }
  function formatPhone(digits) {
    if (/^57\d{10}$/.test(digits)) return "+57 " + digits.slice(2).replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
    if (/^1\d{10}$/.test(digits)) return "+1 " + digits.slice(1).replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
    return "+" + digits;
  }

  // index every orderable item by key
  const ITEMS = {};
  COMBOS.forEach((c, i) => ITEMS["c" + i] = { name: c.name, price: c.price });
  MENU.forEach(s => s.groups.forEach((g, gi) => g.items.forEach((it, ii) => ITEMS[`${s.id}-${gi}-${ii}`] = it)));

  const addBtn = key => `<button class="add" data-add="${key}" aria-label="${T[lang].add}">+ ${T[lang].add}</button>`;

  function renderCombos() {
    $("#comboList").innerHTML = COMBOS.map((c, i) => `
      <article class="combo">
        <div class="combo-top"><h3>${c.name[lang]}</h3><span class="price">${fmt(c.price)}</span></div>
        <p class="people">${c.people[lang]}</p>
        <ul>${c.items[lang].map(x => `<li>${x}</li>`).join("")}</ul>
        ${addBtn("c" + i)}
      </article>`).join("");
  }

  function renderTabs() {
    $("#tabs").innerHTML = MENU.map(s => `<button class="tab${s.id === activeTab ? " on" : ""}" data-tab="${s.id}">${s.title[lang]}</button>`).join("");
  }

  function renderMenu() {
    const s = MENU.find(x => x.id === activeTab);
    $("#menuBody").innerHTML = `
      <div class="section">
        <div class="section-img"><img src="${s.img}" alt="" loading="lazy"></div>
        <div class="section-items">
          ${s.groups.map((g, gi) => `
            ${g.title ? `<h3 class="group">${g.title[lang]}</h3>` : ""}
            ${g.items.map((it, ii) => `
              <div class="dish">
                <div class="dish-top"><h4>${it.name[lang]}${it.spicy ? ' <span class="chili">🌶</span>' : ""}${it.isNew ? ` <span class="badge-new">${T[lang].new_badge}</span>` : ""}</h4><span class="dots"></span><span class="price">${fmt(it.price)}</span></div>
                <p>${it.desc[lang]}</p>
                ${addBtn(`${s.id}-${gi}-${ii}`)}
              </div>`).join("")}
          `).join("")}
        </div>
      </div>`;
  }

  // ---------- promos ----------
  function renderPromos() {
    $("#promosGrid").innerHTML = PROMOS.map((p, i) => `<div class="promo-card" data-promo="${i}"><img class="promo-bg" src="${p.image}" alt="" loading="lazy"><img class="promo-fg" src="${p.image}" alt="${p.alt[lang]}" loading="lazy"></div>`).join("");
  }
  function goToPromo(p) {
    if (p.tab) { activeTab = p.tab; renderTabs(); renderMenu(); }
    $("#" + (p.tab ? "menu" : p.scroll)).scrollIntoView({ behavior: "smooth" });
  }

  // ---------- gallery ----------
  function renderGallery() {
    $("#galleryGrid").innerHTML = GALLERY.map(src => `<img src="${src}" alt="" loading="lazy" data-gallery>`).join("");
  }
  const openLightbox = src => { $("#lightboxImg").src = src; document.body.classList.add("lightbox-open"); };
  const closeLightbox = () => document.body.classList.remove("lightbox-open");

  // ---------- reviews ----------
  const stars = n => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

  function renderReviews() {
    const sec = $("#reviews");
    const list = REVIEWS && REVIEWS.reviews;
    if (!list || !list.length) { sec.hidden = true; return; }
    sec.hidden = false;
    const t = T[lang];
    $("#reviewsRatingLink").href = REVIEWS.googleMapsUri || "#";
    $("#reviewsStars").textContent = stars(REVIEWS.rating || 0);
    $("#reviewsRatingText").textContent = `${(REVIEWS.rating || 0).toFixed(1)} · ${REVIEWS.userRatingCount || 0} ${t.reviews_count}`;
    $("#writeReviewBtn").href = CONFIG.googleReviewUrl;
    $("#reviewsGrid").innerHTML = list.slice(0, 5).map(r => {
      const author = r.authorAttribution || {};
      return `
      <article class="review-card">
        <div class="review-top">
          <img class="review-avatar" src="${esc(author.photoUri || "")}" alt="" loading="lazy">
          <div>
            <a class="review-author" href="${esc(author.uri || "#")}" target="_blank" rel="noopener">${esc(author.displayName || "")}</a>
            <div class="review-meta"><span class="stars">${stars(r.rating || 0)}</span> <span class="review-time">${esc(r.relativePublishTimeDescription || "")}</span></div>
          </div>
        </div>
        <p class="review-text">${esc((r.text && r.text.text) || "")}</p>
        <button class="review-more" hidden>${t.see_more}</button>
      </article>`;
    }).join("");
    $("#reviewsGrid").querySelectorAll(".review-card").forEach(card => {
      const p = card.querySelector(".review-text");
      if (p.scrollHeight > p.clientHeight + 1) card.querySelector(".review-more").hidden = false;
    });
  }

  // ---------- cart ----------
  const drawer = document.createElement("aside");
  drawer.className = "drawer"; drawer.id = "drawer";
  const bar = document.createElement("button");
  bar.className = "cartbar"; bar.id = "cartbar";
  const shade = document.createElement("div"); shade.className = "shade";
  document.body.append(shade, drawer, bar);

  let form = store.get("ryori_form", { name: "", phone: "", mode: "delivery", addr: "", notes: "", pay: "cash" });

  function totals() {
    let n = 0, sum = 0;
    for (const [k, q] of Object.entries(cart)) { if (!ITEMS[k]) continue; n += q; sum += q * ITEMS[k].price; }
    return { n, sum };
  }

  function renderCart() {
    const t = T[lang], { n, sum } = totals();
    bar.innerHTML = `<span class="badge">${n}</span> ${t.view} <b>${fmt(sum)}</b>`;
    bar.classList.toggle("show", n > 0);
    const rows = Object.entries(cart).filter(([k]) => ITEMS[k]).map(([k, q]) => `
      <li><div><b>${ITEMS[k].name[lang]}</b><small>${fmt(ITEMS[k].price)}</small></div>
      <div class="qty"><button data-dec="${k}">−</button><span>${q}</span><button data-inc="${k}">+</button></div></li>`).join("");
    drawer.innerHTML = `
      <div class="drawer-head"><h3>${t.cart}</h3><button class="x" data-close aria-label="close">×</button></div>
      ${n ? `<ul class="lines">${rows}</ul>
      <div class="total"><span>${t.total}</span><b>${fmt(sum)}</b></div>
      <form id="orderForm" novalidate>
        <label>${t.name}<input name="name" value="${esc(form.name)}" autocomplete="name"></label>
        <label>${t.phone}<input name="phone" value="${esc(form.phone)}" inputmode="tel" autocomplete="tel"></label>
        <fieldset><legend>${t.mode}</legend>
          <label class="pill"><input type="radio" name="mode" value="delivery" ${form.mode === "delivery" ? "checked" : ""}>${t.delivery}</label>
          <label class="pill"><input type="radio" name="mode" value="pickup" ${form.mode === "pickup" ? "checked" : ""}>${t.pickup}</label>
        </fieldset>
        <label class="addr" ${form.mode === "pickup" ? "hidden" : ""}>${t.addr}<input name="addr" value="${esc(form.addr)}" autocomplete="street-address"><small>${t.delNote}</small></label>
        <label>${t.pay}<select name="pay">
          ${["cash", "transfer", "card"].map(p => `<option value="${p}" ${form.pay === p ? "selected" : ""}>${t[p]}</option>`).join("")}
        </select></label>
        <label>${t.notes}<textarea name="notes" rows="3">${esc(form.notes)}</textarea></label>
        <p class="err" id="err"></p>
        <button class="btn red send" type="submit">${t.send}</button>
      </form>` : `<p class="empty">${t.empty}</p>`}`;
  }

  function change(k, d) {
    cart[k] = (cart[k] || 0) + d;
    if (cart[k] <= 0) delete cart[k];
    store.set("ryori_cart_v2", cart); renderCart();
  }
  const open = () => { document.body.classList.add("cart-open"); };
  const close = () => { document.body.classList.remove("cart-open"); };

  function buildMessage() {
    const t = T[lang], { sum } = totals();
    const lines = Object.entries(cart).filter(([k]) => ITEMS[k])
      .map(([k, q]) => `• ${q} x ${ITEMS[k].name[lang]} (${fmt(ITEMS[k].price * q)})`);
    return [t.msgHead, "", ...lines, "", `*${t.total}: ${fmt(sum)}*`, "",
      `${t.name}: ${form.name}`, form.phone ? `${t.phone}: ${form.phone}` : null,
      `${t.mode}: ${form.mode === "delivery" ? t.delivery : t.pickup}`,
      form.mode === "delivery" ? `${t.addr}: ${form.addr}` : null,
      `${t.pay}: ${t[form.pay]}`, form.notes ? `${t.notes.split(" (")[0]}: ${form.notes}` : null
    ].filter(x => x !== null).join("\n");
  }

  document.addEventListener("click", e => {
    const a = e.target.closest("[data-add]"); if (a) { change(a.dataset.add, 1); a.classList.add("pop"); setTimeout(() => a.classList.remove("pop"), 300); return; }
    const i = e.target.closest("[data-inc]"); if (i) return change(i.dataset.inc, 1);
    const d = e.target.closest("[data-dec]"); if (d) return change(d.dataset.dec, -1);
    const tb = e.target.closest("[data-tab]"); if (tb) { activeTab = tb.dataset.tab; renderTabs(); renderMenu(); return; }
    const pc = e.target.closest("[data-promo]"); if (pc) return goToPromo(PROMOS[+pc.dataset.promo]);
    const g = e.target.closest("[data-gallery]"); if (g) return openLightbox(g.src);
    if (e.target.closest("#lightbox")) return closeLightbox();
    const rm = e.target.closest(".review-more"); if (rm) {
      const expanded = rm.closest(".review-card").classList.toggle("expanded");
      rm.textContent = expanded ? T[lang].see_less : T[lang].see_more;
      return;
    }
    const on = e.target.closest("[data-order-now]"); if (on) return totals().n > 0 ? open() : $("#menu").scrollIntoView({ behavior: "smooth" });
    if (e.target.closest("#cartbar")) return open();
    if (e.target.closest("[data-close]") || e.target === shade) return close();
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { close(); closeLightbox(); } });

  drawer.addEventListener("input", e => {
    const f = e.target.form; if (!f) return;
    form = { ...form, [e.target.name]: e.target.value };
    store.set("ryori_form", form);
    if (e.target.name === "mode") f.querySelector(".addr").hidden = form.mode === "pickup";
  });
  drawer.addEventListener("submit", e => {
    e.preventDefault();
    const t = T[lang], err = drawer.querySelector("#err");
    if (!form.name.trim()) { err.textContent = t.need; return; }
    if (form.mode === "delivery" && !form.addr.trim()) { err.textContent = t.needAddr; return; }
    openWhatsApp(buildMessage());
  });

  // ---------- static bits ----------
  function renderStatic() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = T[lang][el.dataset.i18n]);
    $("#langBtn").textContent = lang === "es" ? "EN" : "ES";
    const wa = waLink(CONFIG.whatsappMessage[lang]);
    document.querySelectorAll("[data-wa]").forEach(el => { el.href = wa.href; el.target = wa.target; });
    $("#waFloat").setAttribute("aria-label", T[lang].wa_aria);
    $("#tripadvisorBtn").href = CONFIG.tripadvisor;
    $("#tripadvisorBtn").hidden = !CONFIG.tripadvisor;
    $("#directionsBtn").href = isIOS
      ? `https://maps.apple.com/?daddr=${CONFIG.lat},${CONFIG.lng}`
      : `https://www.google.com/maps/dir/?api=1&destination=${CONFIG.lat},${CONFIG.lng}`;
    $("#callBtn").href = "tel:+" + CONFIG.whatsapp;
    $("#waText").textContent = formatPhone(CONFIG.whatsapp);
    $("#addr").textContent = CONFIG.address[lang];
    $("#hrs").textContent = CONFIG.hours[lang];
    $("#ig").href = CONFIG.instagram; $("#fb").href = CONFIG.facebook; $("#tt").href = CONFIG.tiktok;
    $("#map").innerHTML = CONFIG.mapEmbed ? `<iframe src="${CONFIG.mapEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="map"></iframe>` : `<img src="assets/img/geisha.webp" alt="">`;
    $("#yr").textContent = new Date().getFullYear();
  }

  function renderAll() { renderStatic(); renderPromos(); renderCombos(); renderTabs(); renderMenu(); renderGallery(); renderReviews(); renderCart(); }
  $("#langBtn").addEventListener("click", () => { lang = lang === "es" ? "en" : "es"; store.set("ryori_lang_v2", lang); renderAll(); });
  renderAll();

  fetch("data/reviews.json").then(r => r.ok ? r.json() : null).catch(() => null).then(data => { REVIEWS = data; renderReviews(); });
})();
