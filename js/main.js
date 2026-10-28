/* Craftistry website behaviour: icons, mobile nav, gallery filters and lightbox, quote form.
   Plain JS, no dependencies. Loaded with `defer` after js/icons.js. */
(function () {
  "use strict";

  var EMAIL = "info.craftistry@gmail.com";
  var WHATSAPP = "918143013030";

  /* ---------- Icons ---------- */
  function renderIcons(root) {
    var icons = window.CRAFTISTRY_ICONS || {};
    (root || document).querySelectorAll("[data-icon]").forEach(function (el) {
      var body = icons[el.getAttribute("data-icon")];
      if (!body) return;
      var size = el.getAttribute("data-size") || 24;
      el.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size +
        '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + "</svg>";
    });
  }
  renderIcons();

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      var icon = toggle.querySelector("[data-icon]");
      icon.setAttribute("data-icon", open ? "close" : "menu");
      renderIcons(toggle);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Gallery filters ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var shots = document.querySelectorAll(".gallery-grid > li");
  var countEl = document.getElementById("gallery-count");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter");
      var shown = 0;
      filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      shots.forEach(function (li) {
        var match = cat === "all" || li.getAttribute("data-cat") === cat;
        li.hidden = !match;
        if (match) shown++;
      });
      if (countEl) countEl.textContent = "Showing " + shown + (shown === 1 ? " piece" : " pieces");
    });
  });

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox && typeof lightbox.showModal === "function") {
    var lbImg = lightbox.querySelector("img");
    var lbName = lightbox.querySelector(".lightbox-name");
    var lbMeta = lightbox.querySelector(".lightbox-meta");
    document.querySelectorAll(".shot-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lbName.textContent = btn.querySelector(".shot-name").textContent;
        lbMeta.textContent = btn.querySelector(".shot-meta").textContent;
        lightbox.showModal();
      });
    });
    lightbox.querySelector(".lightbox-close").addEventListener("click", function () { lightbox.close(); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) lightbox.close(); });
  }

  /* ---------- Quote form ---------- */
  var form = document.getElementById("quote-form");
  if (!form) return;

  // Prefill the occasion from links like contact.html?occasion=wedding
  var params = new URLSearchParams(window.location.search);
  var occasion = params.get("occasion");
  var occasionSelect = form.elements.occasion;
  if (occasion && occasionSelect.querySelector('option[value="' + occasion + '"]')) {
    occasionSelect.value = occasion;
  }

  function setError(field, message) {
    var wrap = field.closest(".cr-field");
    var msg = wrap.querySelector(".cr-field-msg-error");
    if (message) {
      wrap.classList.add("cr-field-error");
      field.setAttribute("aria-invalid", "true");
      if (!msg) {
        msg = document.createElement("p");
        msg.className = "cr-field-msg cr-field-msg-error";
        msg.id = field.id + "-err";
        msg.innerHTML = '<span data-icon="info" data-size="16"></span><span></span>';
        wrap.appendChild(msg);
        renderIcons(msg);
      }
      msg.lastChild.textContent = message;
      field.setAttribute("aria-describedby", msg.id);
    } else {
      wrap.classList.remove("cr-field-error");
      field.removeAttribute("aria-invalid");
      field.removeAttribute("aria-describedby");
      if (msg) msg.remove();
    }
  }

  function validate() {
    var firstBad = null;
    var checks = [
      [form.elements.name, function (v) { return v ? "" : "Tell us your name."; }],
      [form.elements.email, function (v) {
        if (!v) return "We need your email to send the quote.";
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "That email doesn't look quite right.";
      }],
      [form.elements.idea, function (v) { return v ? "" : "Tell us a little about your idea."; }]
    ];
    checks.forEach(function (c) {
      var msg = c[1](c[0].value.trim());
      setError(c[0], msg);
      if (msg && !firstBad) firstBad = c[0];
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  function summary() {
    var f = form.elements;
    var occ = f.occasion.options[f.occasion.selectedIndex].text;
    var lines = [
      "Name: " + f.name.value.trim(),
      "Email: " + f.email.value.trim(),
      "Phone: " + (f.phone.value.trim() || "-"),
      "Occasion: " + occ,
      "Quantity: " + (f.quantity.value.trim() || "-"),
      "Needed by: " + (f.date.value || "-"),
      "Budget: " + (f.budget.value.trim() || "-"),
      "",
      "Idea:",
      f.idea.value.trim()
    ];
    return { occasion: occ, text: lines.join("\n") };
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
    var s = summary();
    var subject = "Quote request: " + s.occasion + " (" + form.elements.name.value.trim() + ")";
    window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(s.text);
    var status = document.getElementById("form-status");
    status.classList.add("is-visible");
    status.focus();
  });

  var waBtn = document.getElementById("whatsapp-btn");
  if (waBtn) {
    waBtn.addEventListener("click", function () {
      if (!validate()) return;
      var text = "Hi Craftistry! I'd like a quote.\n\n" + summary().text;
      window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    });
  }

  form.querySelectorAll("input, textarea").forEach(function (field) {
    field.addEventListener("input", function () {
      if (field.getAttribute("aria-invalid")) setError(field, "");
    });
  });
})();
