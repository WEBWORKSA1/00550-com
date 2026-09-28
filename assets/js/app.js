/* 00550.com — core site behaviour (no dependencies) */
(function () {
  "use strict";
  var C = window.SITE_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    sget: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    sset: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };
  window.SiteStore = store;

  /* ---------- owner address (never in plain text) ---------- */
  function owner() { return (C._k || []).slice().reverse().map(function (c) { return String.fromCharCode(c - 7); }).join(""); }
  function mailto(subject, body) {
    var u = "mailto:" + owner() + "?subject=" + encodeURIComponent(subject || "Inquiry via 00550.com");
    if (body) u += "&body=" + encodeURIComponent(body);
    window.location.href = u;
  }
  window.SiteMail = mailto;
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-mail]");
    if (!a) return;
    e.preventDefault();
    mailto(a.getAttribute("data-mail") || "Inquiry via 00550.com");
  });

  /* ---------- toast ---------- */
  function toast(msg) {
    var t = $("#toast"); if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }
  window.SiteToast = toast;

  /* ---------- theme ---------- */
  var saved = store.get("theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
  $$("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      if (!cur) cur = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      store.set("theme", next);
    });
  });

  /* ---------- mobile menu ---------- */
  var burger = $(".burger"), menu = $(".menu");
  if (burger && menu) burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  /* ---------- footer year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- back to top ---------- */
  var top = $(".to-top");
  if (top) {
    window.addEventListener("scroll", function () { top.classList.toggle("show", window.scrollY > 600); }, { passive: true });
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* ---------- ads ---------- */
  var ads = C.adsense || {};
  var adsOn = ads.client && ads.client.indexOf("XXXX") === -1;
  function renderAds() {
    $$("[data-ad]").forEach(function (box) {
      if (box.getAttribute("data-rendered")) return;
      box.setAttribute("data-rendered", "1");
      var slot = (ads.slots || {})[box.getAttribute("data-ad")] || "";
      if (adsOn && slot && !/^0+$/.test(slot)) {
        box.innerHTML = '<div class="ad-label">Advertisement</div><ins class="adsbygoogle" style="display:block" data-ad-client="' + ads.client + '" data-ad-slot="' + slot + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
      } else {
        var root = document.body.getAttribute("data-root") || "";
        box.innerHTML = '<div class="ad-label">Sponsored</div><a class="ad-house" href="' + root + 'support.html#sponsor"><span style="font-size:1.6rem">📣</span><span><strong>Your brand here.</strong> Reach readers curious about Chinese culture, luck &amp; numbers.</span><span class="btn btn-sm btn-gold">Advertise</span></a>';
      }
    });
  }
  function loadAdsense(npa) {
    if (!adsOn || window._adsLoaded) return;
    window._adsLoaded = true;
    if (npa) (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
    var s = document.createElement("script");
    s.async = true; s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + ads.client;
    document.head.appendChild(s);
  }
  function loadGA() {
    if (!C.gaMeasurementId || window._gaLoaded) return;
    window._gaLoaded = true;
    var s = document.createElement("script"); s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + C.gaMeasurementId;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date()); gtag("config", C.gaMeasurementId);
  }

  /* ---------- cookie consent ---------- */
  var consent = store.get("consent");
  var cookie = $("#cookie");
  if (!consent && cookie) setTimeout(function () { cookie.classList.add("show"); }, 900);
  if (consent === "all") { loadAdsense(false); loadGA(); }
  if (consent === "essential") loadAdsense(true);
  $$("[data-consent]").forEach(function (b) {
    b.addEventListener("click", function () {
      var v = b.getAttribute("data-consent");
      store.set("consent", v); if (cookie) cookie.classList.remove("show");
      if (v === "all") { loadAdsense(false); loadGA(); } else loadAdsense(true);
    });
  });
  renderAds();
  window.SiteRenderAds = renderAds;

  /* ---------- forms ---------- */
  function formToObj(form) {
    var o = {};
    new FormData(form).forEach(function (v, k) {
      if (o[k] !== undefined) o[k] = o[k] + ", " + v; else o[k] = v;
    });
    return o;
  }
  function track(ev, p) { if (window.gtag) try { gtag("event", ev, p || {}); } catch (e) {} }
  $$("form[data-form]").forEach(function (form) {
    form.setAttribute("novalidate", "");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = $(".form-status", form);
      if (!form.checkValidity()) {
        var bad = form.querySelector(":invalid"); if (bad) bad.focus();
        if (status) { status.className = "form-status err"; status.textContent = "Please complete the highlighted fields."; }
        return;
      }
      var data = formToObj(form);
      if (data._honey) return; // bot
      var name = form.getAttribute("data-form");
      data._subject = "[00550.com] " + (form.getAttribute("data-subject") || name);
      data._template = "table";
      data._captcha = "false";
      data.form_name = name;
      data.page = location.href;
      if (data.email) data._replyto = data.email;
      var btn = form.querySelector("[type=submit]");
      if (btn) { btn.disabled = true; btn._t = btn.textContent; btn.textContent = "Sending…"; }
      fetch((C.forms && C.forms.endpointBase || "https://formsubmit.co/ajax/") + owner(), {
        method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (!res.ok || res.j.success === "false" || res.j.success === false) throw new Error("send");
          done(true);
        }).catch(function () { done(false, data); });

      function done(ok, d) {
        if (btn) { btn.disabled = false; btn.textContent = btn._t; }
        track("generate_lead", { form: name });
        if (ok) {
          if (status) { status.className = "form-status ok"; status.textContent = form.getAttribute("data-success") || "Thank you! Your message has been received — we'll reply within 1–2 business days."; }
          form.reset();
          $$(".step", form).forEach(function (s, i) { s.classList.toggle("active", i === 0); });
          $$(".steps span", form).forEach(function (s, i) { s.classList.toggle("on", i === 0); });
        } else {
          if (status) { status.className = "form-status ok"; status.textContent = "Opening your email app to finish sending…"; }
          var body = Object.keys(d).filter(function (k) { return k.charAt(0) !== "_"; }).map(function (k) { return k + ": " + d[k]; }).join("\n");
          mailto(d._subject, body);
        }
        var unlock = form.getAttribute("data-unlock");
        if (unlock) { store.set("unlock_" + unlock, "1"); document.dispatchEvent(new CustomEvent("unlock", { detail: unlock })); }
        var m = form.closest(".modal"); if (m && ok) setTimeout(function () { m.classList.remove("open"); }, 2200);
      }
    });
  });

  /* ---------- multi-step forms ---------- */
  $$("[data-steps]").forEach(function (form) {
    var steps = $$(".step", form), bars = $$(".steps span", form), i = 0;
    function go(n) {
      if (n > i) {
        var fields = $$("input,select,textarea", steps[i]);
        for (var k = 0; k < fields.length; k++) if (!fields[k].checkValidity()) { fields[k].reportValidity(); return; }
      }
      i = Math.max(0, Math.min(steps.length - 1, n));
      steps.forEach(function (s, j) { s.classList.toggle("active", j === i); });
      bars.forEach(function (b, j) { b.classList.toggle("on", j <= i); });
    }
    $$("[data-next]", form).forEach(function (b) { b.addEventListener("click", function () { go(i + 1); }); });
    $$("[data-prev]", form).forEach(function (b) { b.addEventListener("click", function () { go(i - 1); }); });
    go(0);
  });

  /* ---------- modals ---------- */
  function openModal(id) { var m = document.getElementById(id); if (m) { m.classList.add("open"); var f = m.querySelector("input,button"); if (f) setTimeout(function () { f.focus(); }, 50); } }
  window.SiteModal = openModal;
  $$("[data-open]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); openModal(b.getAttribute("data-open")); }); });
  $$(".modal").forEach(function (m) {
    m.addEventListener("click", function (e) { if (e.target === m || e.target.closest(".modal-close")) m.classList.remove("open"); });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") $$(".modal.open").forEach(function (m) { m.classList.remove("open"); }); });

  /* exit-intent / timed lead magnet — once per session, never on form pages */
  if (!document.body.hasAttribute("data-no-popup") && !store.sget("magnet") && !store.get("unlock_cheatsheet")) {
    var shown = false;
    function show() { if (shown) return; shown = true; store.sset("magnet", "1"); openModal("magnet"); }
    document.addEventListener("mouseout", function (e) { if (!e.relatedTarget && e.clientY < 8) show(); });
    setTimeout(function () { if (window.scrollY > 1200) show(); }, 45000);
  }

  /* ---------- countdowns (to next MM-DD) ---------- */
  $$("[data-countdown]").forEach(function (el) {
    var md = el.getAttribute("data-countdown").split("-");
    function target() {
      var n = new Date(), t = new Date(n.getFullYear(), +md[0] - 1, +md[1], 23, 59, 59);
      if (t < n) t.setFullYear(t.getFullYear() + 1);
      return t;
    }
    var T = target();
    $$("[data-countdown-date]").forEach(function (d) { d.textContent = T.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }); });
    function tick() {
      var s = Math.max(0, Math.floor((T - new Date()) / 1000));
      var parts = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
      el.innerHTML = ["Days", "Hours", "Min", "Sec"].map(function (l, i) { return "<div><b>" + parts[i] + "</b><small>" + l + "</small></div>"; }).join("");
    }
    tick(); setInterval(tick, 1000);
  });

  /* ---------- videos ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  window.SiteEsc = esc;
  $$("[data-videos]").forEach(function (box) {
    var list = (C.youtube && C.youtube.videos) || [];
    var max = +box.getAttribute("data-videos") || list.length;
    box.innerHTML = list.slice(0, max).map(function (v) {
      var inner = v.id
        ? '<button type="button" data-yt="' + esc(v.id) + '" aria-label="Play: ' + esc(v.title) + '"><img loading="lazy" alt="" src="https://i.ytimg.com/vi/' + esc(v.id) + '/hqdefault.jpg"><span class="play">▶</span></button>'
        : '<a class="vthumb" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' + encodeURIComponent(v.q) + '"><span class="play">▶</span><strong>' + esc(v.title) + '</strong><small>Watch on YouTube</small></a>';
      return '<div><div class="video">' + inner + '</div><h3 style="margin-top:10px;font-size:1rem">' + esc(v.title) + '</h3></div>';
    }).join("");
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-yt]"); if (!b) return;
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + b.getAttribute("data-yt") + "?autoplay=1&rel=0";
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"; f.allowFullscreen = true;
    f.title = b.getAttribute("aria-label") || "YouTube video";
    b.parentNode.replaceChild(f, b);
  });
  $$("[data-yt-channel]").forEach(function (a) {
    if (C.youtube && C.youtube.channel) a.href = C.youtube.channel; else a.href = "https://www.youtube.com/results?search_query=chinese+number+meanings";
  });

  /* ---------- donations ---------- */
  var D = C.donate || {};
  var names = { paypal: "PayPal", buymeacoffee: "Buy Me a Coffee", kofi: "Ko-fi", stripe: "Card (Stripe)", patreon: "Patreon", githubSponsors: "GitHub Sponsors" };
  $$("[data-pay-links]").forEach(function (box) {
    var keys = Object.keys(names).filter(function (k) { return D[k]; });
    if (!keys.length) { box.innerHTML = ""; return; }
    box.innerHTML = keys.map(function (k) { return '<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="' + esc(D[k]) + '">' + names[k] + "</a>"; }).join(" ");
  });
  $$(".amounts").forEach(function (g) {
    g.addEventListener("click", function (e) {
      var b = e.target.closest(".amt"); if (!b) return;
      $$(".amt", g).forEach(function (x) { x.classList.remove("sel"); }); b.classList.add("sel");
      var input = document.getElementById(g.getAttribute("data-target"));
      if (input) { input.value = b.getAttribute("data-v"); if (b.getAttribute("data-v") === "") input.focus(); }
    });
  });

  /* ---------- share ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-share]"); if (!b) return;
    var url = b.getAttribute("data-share-url") || location.href, text = b.getAttribute("data-share") || document.title;
    if (navigator.share) navigator.share({ title: document.title, text: text, url: url }).catch(function () {});
    else if (navigator.clipboard) navigator.clipboard.writeText(text + " " + url).then(function () { toast("Link copied — share it anywhere!"); });
  });

  /* ---------- reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.style.opacity = 1; en.target.style.transform = "none"; io.unobserve(en.target); } }); }, { rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach(function (el) { el.style.opacity = 0; el.style.transform = "translateY(14px)"; el.style.transition = "opacity .5s ease, transform .5s ease"; io.observe(el); });
  }

  /* ---------- PWA ---------- */
  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", function () { navigator.serviceWorker.register((document.body.getAttribute("data-root") || "") + "sw.js").catch(function () {}); });
  }
})();
