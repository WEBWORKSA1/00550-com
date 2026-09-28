/* 00550.com — interactive tools */
(function () {
  "use strict";
  var N = window.NUM_DATA, $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = window.SiteEsc || function (s) { return s; };
  var root = document.body.getAttribute("data-root") || "";

  /* ================= Number decoder ================= */
  function analyze(raw) {
    var digits = String(raw).replace(/\D/g, "");
    if (!digits) return null;
    var D = N.digits, score = 0, notes = [];
    for (var i = 0; i < digits.length; i++) score += D[digits[i]].w;
    // pairs
    var pairHits = [];
    for (var j = 0; j < digits.length - 1; j++) {
      var p = digits.substr(j, 2);
      if (N.pairs[p]) { score += N.pairs[p].v; pairHits.push({ p: p, t: N.pairs[p].t, v: N.pairs[p].v }); }
    }
    // repeats of lucky digits
    var runs = digits.match(/(\d)\1{2,}/g) || [];
    runs.forEach(function (r) { var w = D[r[0]].w; score += w > 0 ? r.length : w * 2; notes.push(r + " — a run of " + r.length + " × " + r[0] + (w > 0 ? " amplifies its luck" : w < 0 ? " amplifies its bad luck" : "")); });
    // ending digit matters most (last impression)
    var last = digits[digits.length - 1]; score += D[last].w;
    var fours = (digits.match(/4/g) || []).length;
    if (fours === 0 && digits.length >= 4) { score += 2; notes.push("No 4s — buyers of phone numbers and plates prize this."); }
    // slang phrases
    var phrases = [];
    N.slang.slice().sort(function (a, b) { return b.n.length - a.n.length; }).forEach(function (s) {
      if (s.n.length >= 3 && digits.indexOf(s.n) > -1 && !phrases.some(function (x) { return x.n.indexOf(s.n) > -1; })) phrases.push(s);
    });
    phrases.forEach(function (s) { score += ({ love: 2, money: 3, praise: 2, chat: 0, emotion: -1, insult: -3 })[s.cat] || 0; });
    var avg = score / Math.max(4, digits.length);
    var pct = Math.round(Math.max(3, Math.min(99, 50 + avg * 12)));
    var grade = pct >= 85 ? "Very auspicious" : pct >= 70 ? "Auspicious" : pct >= 55 ? "Balanced" : pct >= 40 ? "Mixed" : "Challenging";
    var reading = digits.split("").map(function (d) { return N.slangChar[d]; }).join("");
    var py = digits.split("").map(function (d) { return D[d].py; }).join(" ");
    var yue = digits.split("").map(function (d) { return D[d].yue; }).join(" ");
    var han = digits.split("").map(function (d) { return D[d].han; }).join("");
    return { digits: digits, pct: pct, grade: grade, reading: reading, py: py, yue: yue, han: han, pairs: pairHits, phrases: phrases, notes: notes, last: last };
  }
  window.Analyze00550 = analyze;

  var typeTips = {
    general: "",
    phone: "Phone tip: the last 4 digits carry the most weight. Numbers ending 8, 6 or 9 without any 4 command premiums in Chinese markets.",
    plate: "Plate tip: letters are ignored. Plates with repeated 8s or 6s are auctioned at high prices in places like Hong Kong.",
    price: "Pricing tip: ending retail prices in 8 (¥88, ¥168, ¥888) signals prosperity; avoid 4 and 250.",
    date: "Date tip: enter YYYYMMDD. Also check the Lucky Date tool for lunar-month cautions such as Ghost Month.",
    address: "Address tip: many buyers avoid floors/units containing 4, and some pay more for 8.",
    domain: "Domain tip: short numeric domains are traded actively by Chinese-speaking investors; 4-free, 8-rich strings sell faster."
  };

  function renderDecoder(res, out, type) {
    if (!res) { out.classList.remove("show"); return; }
    var D = N.digits;
    var rows = res.digits.split("").map(function (d, i) {
      var x = D[d], cls = x.tone === "positive" ? "pos" : x.tone === "negative" ? "neg" : "mix";
      return "<tr><td class='dnum " + cls + "'>" + d + "</td><td><b>" + x.han + "</b><br><small class='muted'>" + x.py + " · " + x.yue + "</small></td><td>" + esc(x.sound) + "</td></tr>";
    }).join("");
    var uniq = {}; res.digits.split("").forEach(function (d) { uniq[d] = 1; });
    var phr = res.phrases.length ? res.phrases.map(function (s) { return "<li><b>" + s.n + "</b> → " + s.zh + " <span class='muted'>(" + s.py + ")</span> — " + esc(s.en) + "</li>"; }).join("") : "";
    var prs = res.pairs.map(function (p) { return "<li><b class='" + (p.v > 0 ? "pos" : p.v < 0 ? "neg" : "mix") + "'>" + p.p + "</b> — " + esc(p.t) + "</li>"; }).join("");
    var notes = res.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("");
    var share = location.origin + location.pathname + "?n=" + res.digits;
    out.innerHTML =
      "<div class='card'><div class='result-head'><div class='score-ring' style='--p:" + res.pct + "'><div><div><b>" + res.pct + "</b><br><small class='muted'>/ 100</small></div></div></div>" +
      "<div style='flex:1;min-width:220px'><span class='tag " + (res.pct >= 70 ? "jade" : res.pct >= 50 ? "gold" : "red") + "'>" + res.grade + "</span>" +
      "<div class='reading mt' style='margin-top:10px'>" + res.han + "</div><div class='muted'>" + res.py + " <span class='small'>(Cantonese: " + res.yue + ")</span></div>" +
      "<div style='margin-top:8px'>Playful slang reading: <b>" + res.reading + "</b></div></div></div>" +
      (phr ? "<h3 class='mt'>Hidden phrases found</h3><ul>" + phr + "</ul>" : "") +
      (prs ? "<h3 class='mt'>Digit pairs</h3><ul>" + prs + "</ul>" : "") +
      (notes ? "<h3 class='mt'>Patterns</h3><ul>" + notes + "</ul>" : "") +
      (typeTips[type] ? "<p class='mt'><span class='tag gold'>Tip</span> " + typeTips[type] + "</p>" : "") +
      "<div class='table-scroll'><table class='digit-table'><thead><tr><th>Digit</th><th>Character</th><th>Sounds like</th></tr></thead><tbody>" + rows + "</tbody></table></div>" +
      "<div class='hero-cta'><button class='btn btn-primary btn-sm' data-share='My number " + res.digits + " scored " + res.pct + "/100 on 00550.com —' data-share-url='" + share + "'>Share result</button>" +
      "<a class='btn btn-ghost btn-sm' href='" + root + "services.html#audit'>Get a pro number audit →</a></div>" +
      "<p class='small muted mt'>For cultural education and entertainment. Traditions differ between Mandarin, Cantonese and other communities.</p></div>" +
      "<div class='ad' data-ad='inContent'></div>";
    out.classList.add("show");
    if (window.SiteRenderAds) window.SiteRenderAds();
  }

  var dec = $("#decoder-form");
  if (dec) {
    var out = $("#decoder-out"), inp = $("#decoder-input"), typeSel = $("#decoder-type");
    function run() {
      var res = analyze(inp.value);
      renderDecoder(res, out, typeSel ? typeSel.value : "general");
      if (res && history.replaceState) history.replaceState(null, "", "?n=" + res.digits + (typeSel && typeSel.value !== "general" ? "&t=" + typeSel.value : ""));
    }
    dec.addEventListener("submit", function (e) { e.preventDefault(); run(); if (window.gtag) gtag("event", "tool_use", { tool: "decoder" }); });
    $$("[data-try]").forEach(function (b) { b.addEventListener("click", function () { inp.value = b.getAttribute("data-try"); run(); out.scrollIntoView({ behavior: "smooth", block: "start" }); }); });
    var q = new URLSearchParams(location.search);
    if (q.get("t") && typeSel) typeSel.value = q.get("t");
    if (q.get("n")) { inp.value = q.get("n"); run(); }
  }
  // Home hero quick decoder -> goes to decoder page
  var quick = $("#quick-decoder");
  if (quick) quick.addEventListener("submit", function (e) {
    e.preventDefault(); var v = $("input", quick).value.replace(/\D/g, "");
    if (v) location.href = root + "decoder.html?n=" + v;
  });

  /* ================= Zodiac & element ================= */
  function lunarInfo(date) {
    var y = date.getFullYear(), m = null, d = null, leap = false;
    try {
      var parts = new Intl.DateTimeFormat("zh-u-ca-chinese", { year: "numeric", month: "long", day: "numeric" }).formatToParts(date);
      parts.forEach(function (p) {
        if (p.type === "relatedYear" || p.type === "year") { var n = parseInt(p.value, 10); if (n > 1000) y = n; }
        if (p.type === "month") { leap = p.value.indexOf("闰") === 0; m = N.lunarMonths[p.value.replace("闰", "")] || null; }
        if (p.type === "day") d = parseInt(p.value, 10);
      });
    } catch (e) { /* fallback: Gregorian year */ }
    return { year: y, month: m, day: d, leap: leap };
  }
  window.Lunar00550 = lunarInfo;
  function signForYear(y) {
    var a = ((y - 4) % 12 + 12) % 12, s = ((y - 4) % 10 + 10) % 10;
    return { idx: a, z: N.zodiac[a], stem: N.stems[s], branch: N.branches[a] };
  }
  window.Sign00550 = signForYear;

  var zf = $("#zodiac-form");
  if (zf) {
    zf.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = $("#birth").value; if (!v) return;
      var dt = new Date(v + "T12:00:00"), L = lunarInfo(dt), S = signForYear(L.year), el = N.elements[S.stem.el];
      var approx = !L.month;
      $("#zodiac-out").innerHTML =
        "<div class='card'><div class='result-head'><div style='font-size:4.5rem;line-height:1'>" + S.z.e + "</div><div style='flex:1;min-width:220px'>" +
        "<span class='tag' style='background:" + el.color + "22;color:" + el.color + ";border-color:" + el.color + "55'>" + S.stem.yy + " " + S.stem.el + " " + el.zh + "</span>" +
        "<h2 style='margin:8px 0 4px'>" + S.stem.el + " " + S.z.a + " <span class='muted'>" + S.stem.zh + S.branch + " · " + S.z.zh + "</span></h2>" +
        "<div class='muted'>Lunar year " + L.year + (L.month ? " · lunar month " + (L.leap ? "leap " : "") + L.month + ", day " + L.day : "") + "</div></div></div>" +
        "<div class='grid g3 mt'><div><b>Traits</b><br>" + S.z.traits + "</div><div><b>Lucky numbers</b><br><span class='dnum pos'>" + S.z.lucky.join(" · ") + "</span></div><div><b>Lucky colours</b><br>" + S.z.colors + "</div></div>" +
        "<div class='grid g3 mt'><div><b>Element numbers</b><br>" + el.nums.join(" & ") + "</div><div><b>Direction / season</b><br>" + el.dir + " · " + el.season + "</div><div><b>Element cycle</b><br>" + S.stem.el + " feeds " + el.gen + "; restrains " + el.ctrl + "</div></div>" +
        "<p class='mt'>" + el.desc + "</p>" +
        (approx ? "<p class='small muted'>Your browser lacks the Chinese calendar, so the Gregorian year was used. If you were born in January or early February, check the Lunar New Year date for that year.</p>" : "") +
        "<div class='hero-cta'><button class='btn btn-primary btn-sm' data-share='I am a " + S.stem.el + " " + S.z.a + " " + S.z.e + " — find yours on 00550.com'>Share my sign</button><a class='btn btn-ghost btn-sm' href='#compat'>Check compatibility →</a></div></div><div class='ad' data-ad='inContent'></div>";
      $("#zodiac-out").classList.add("show");
      if (window.SiteRenderAds) window.SiteRenderAds();
    });
  }

  // zodiac grid rendering
  $$("[data-zgrid]").forEach(function (g) {
    var mode = g.getAttribute("data-zgrid");
    var thisYear = lunarInfo(new Date()).year;
    g.innerHTML = N.zodiac.map(function (z, i) {
      var yrs = []; for (var y = thisYear - 72; y <= thisYear + 12; y++) if (((y - 4) % 12 + 12) % 12 === i) yrs.push(y);
      return "<button type='button' class='zcell' data-z='" + i + "' title='" + z.a + ": " + yrs.slice(-4).join(", ") + "'><span class='em'>" + z.e + "</span><b>" + z.a + "</b><small>" + z.zh + " · " + yrs[yrs.length - 2] + "</small></button>";
    }).join("");
    if (mode === "info") g.addEventListener("click", function (e) {
      var c = e.target.closest(".zcell"); if (!c) return;
      $$(".zcell", g).forEach(function (x) { x.classList.remove("sel"); }); c.classList.add("sel");
      var z = N.zodiac[+c.getAttribute("data-z")], i = +c.getAttribute("data-z");
      var yrs = []; for (var y = 1924; y <= 2043; y++) if (((y - 4) % 12 + 12) % 12 === i) yrs.push(y);
      var box = $("#zinfo");
      box.innerHTML = "<div class='card'><h3>" + z.e + " " + z.a + " " + z.zh + "</h3><p>" + z.traits + ".</p><p><b>Lucky numbers:</b> " + z.lucky.join(", ") + " · <b>Colours:</b> " + z.colors + "</p><p class='small muted'>Years (Lunar New Year start): " + yrs.join(", ") + "</p></div>";
    });
  });

  // compatibility
  var cp = $("#compat-form");
  if (cp) {
    var opts = N.zodiac.map(function (z, i) { return "<option value='" + i + "'>" + z.e + " " + z.a + "</option>"; }).join("");
    $("#za").innerHTML = opts; $("#zb").innerHTML = opts; $("#zb").value = "4";
    cp.addEventListener("submit", function (e) {
      e.preventDefault();
      var a = +$("#za").value, b = +$("#zb").value, has = function (list) { return list.some(function (g) { return g.indexOf(a) > -1 && g.indexOf(b) > -1; }); };
      var r;
      if (a === b) r = [72, "Kindred spirits", "Same sign: you understand each other instinctively — just avoid mirroring each other's weak spots."];
      else if (has(N.harmonies)) r = [95, "Secret friends (六合)", "One of the six harmonious pairs — traditionally the most supportive match."];
      else if (has(N.trines)) r = [90, "Triangle of affinity (三合)", "You share the same trine — similar values and goals, a natural team."];
      else if (has(N.clashes)) r = [30, "Opposites clash (六冲)", "Directly opposite on the zodiac wheel — sparks fly, both ways. Needs patience and space."];
      else if (has(N.harms)) r = [42, "Harm pair (六害)", "Traditionally a match of subtle friction; honest communication is key."];
      else r = [64, "Neutral match", "No strong traditional pull either way — the relationship is what you make it."];
      var A = N.zodiac[a], B = N.zodiac[b];
      $("#compat-out").innerHTML = "<div class='card'><div class='result-head'><div class='score-ring' style='--p:" + r[0] + "'><div><b>" + r[0] + "%</b></div></div><div style='flex:1;min-width:200px'><div style='font-size:2rem'>" + A.e + " + " + B.e + "</div><h3>" + r[1] + "</h3><p>" + r[2] + "</p><button class='btn btn-primary btn-sm' data-share='" + A.a + " + " + B.a + " = " + r[0] + "% on 00550.com'>Share</button></div></div></div>";
      $("#compat-out").classList.add("show");
    });
  }

  /* ================= Lucky date checker ================= */
  function dateScore(dt, event) {
    var y = dt.getFullYear(), m = dt.getMonth() + 1, d = dt.getDate();
    var s = String(y) + (m < 10 ? "0" : "") + m + (d < 10 ? "0" : "") + d;
    var mmdd = s.slice(4);
    var base = analyze(mmdd).pct * 0.6 + analyze(s).pct * 0.4, flags = [];
    var L = lunarInfo(dt), key = (L.month || 0) + "-" + (L.day || 0);
    if (N.specialDates[s.slice(4, 6) + "-" + s.slice(6)]) flags.push(["gold", N.specialDates[s.slice(4, 6) + "-" + s.slice(6)]]);
    if (N.lunarSpecial[key] && !L.leap) flags.push(["gold", N.lunarSpecial[key]]);
    if (L.month === 7 && !L.leap) { base -= event === "wedding" || event === "moving" || event === "opening" ? 25 : 10; flags.push(["red", "Lunar 7th month (Ghost Month) — traditionally avoided for weddings, moves and openings"]); }
    if (/4/.test(mmdd)) { base -= 8; flags.push(["red", "Contains 4 in the month/day"]); }
    if (/8/.test(mmdd)) flags.push(["jade", "Contains 8 — prosperity"]);
    if (/9/.test(mmdd) && event === "wedding") { base += 6; flags.push(["jade", "9 = 久, long-lasting — great for weddings"]); }
    if (/6/.test(mmdd) && event === "opening") { base += 5; flags.push(["jade", "6 = smooth business"]); }
    if (mmdd === "0520" || mmdd === "0521" || s.indexOf("1314") > -1) { base += 12; }
    if (L.day === 1 || L.day === 15) flags.push(["jade", "New/full moon day of the lunar month"]);
    return { s: s, dt: dt, pct: Math.round(Math.max(5, Math.min(99, base))), flags: flags, L: L };
  }
  var lf = $("#lucky-form");
  if (lf) {
    var today = new Date(); $("#lucky-month").value = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0");
    lf.addEventListener("submit", function (e) {
      e.preventDefault();
      var mv = $("#lucky-month").value.split("-"), ev = $("#lucky-event").value;
      var y = +mv[0], m = +mv[1], days = new Date(y, m, 0).getDate(), arr = [];
      for (var d = 1; d <= days; d++) arr.push(dateScore(new Date(y, m - 1, d, 12), ev));
      var top = arr.slice().sort(function (a, b) { return b.pct - a.pct; }).slice(0, 5);
      var cal = arr.map(function (r) {
        var c = r.pct >= 75 ? "var(--jade)" : r.pct >= 55 ? "var(--gold)" : "var(--red)";
        return "<div class='card' style='padding:10px;text-align:center;border-top:4px solid " + c + "'><b class='dnum'>" + r.dt.getDate() + "</b><br><small>" + r.pct + "</small>" + (r.L.month ? "<br><small class='muted'>L" + r.L.month + "/" + r.L.day + "</small>" : "") + "</div>";
      }).join("");
      $("#lucky-out").innerHTML = "<h3>Top 5 dates for your " + ev + "</h3><div class='grid g2'>" + top.map(function (r) {
        return "<div class='card'><div class='result-head'><div class='score-ring' style='--p:" + r.pct + ";width:90px;height:90px'><div style='width:72px;height:72px'><b style='font-size:1.4rem'>" + r.pct + "</b></div></div><div style='flex:1'><b>" + r.dt.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "long", day: "numeric" }) + "</b><br><small class='muted'>" + (r.L.month ? "Lunar " + r.L.month + "/" + r.L.day : "") + "</small><div class='pill-row' style='margin-top:6px'>" + r.flags.map(function (f) { return "<span class='tag " + f[0] + "'>" + esc(f[1]) + "</span>"; }).join("") + "</div></div></div></div>";
      }).join("") + "</div><h3 class='mt'>Whole month</h3><div style='display:grid;grid-template-columns:repeat(auto-fill,minmax(64px,1fr));gap:8px'>" + cal + "</div><p class='small muted mt'>Scores blend digit symbolism with lunar-calendar customs. For a formal date selection (择日) consult a qualified practitioner — or <a href='" + root + "services.html#audit'>ask us</a>.</p><div class='ad' data-ad='inContent'></div>";
      $("#lucky-out").classList.add("show");
      if (window.SiteRenderAds) window.SiteRenderAds();
    });
    var single = $("#single-date-form");
    if (single) single.addEventListener("submit", function (e) {
      e.preventDefault(); var v = $("#single-date").value; if (!v) return;
      var r = dateScore(new Date(v + "T12:00:00"), $("#lucky-event").value);
      $("#single-out").innerHTML = "<div class='card'><b>" + r.dt.toDateString() + "</b> — score <b>" + r.pct + "/100</b>" + (r.L.month ? " · Lunar " + r.L.month + "/" + r.L.day : "") + "<div class='pill-row' style='margin-top:8px'>" + (r.flags.map(function (f) { return "<span class='tag " + f[0] + "'>" + esc(f[1]) + "</span>"; }).join("") || "<span class='tag'>No special flags</span>") + "</div></div>";
      $("#single-out").classList.add("show");
    });
  }

  /* ================= Name numerology (Pythagorean) ================= */
  var nf = $("#name-form");
  if (nf) nf.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("#name-input").value.toUpperCase().replace(/[^A-Z]/g, ""); if (!name) return;
    var sum = 0; for (var i = 0; i < name.length; i++) sum += ((name.charCodeAt(i) - 65) % 9) + 1;
    var n = sum; while (n > 9) n = String(n).split("").reduce(function (a, b) { return a + +b; }, 0);
    var x = N.digits[String(n)];
    $("#name-out").innerHTML = "<div class='card'><div class='result-head'><div class='dnum' style='font-size:4rem;color:var(--red)'>" + n + "</div><div style='flex:1;min-width:200px'><h3>Name number " + n + " · " + x.han + " (" + x.py + ")</h3><p>Western (Pythagorean) total " + sum + " → " + n + ". In Chinese symbolism: " + esc(x.meaning) + "</p><p class='muted small'>Sounds like: " + esc(x.sound) + "</p></div></div></div>";
    $("#name-out").classList.add("show");
  });

  /* ================= Dictionary ================= */
  var dl = $("#dict-list");
  if (dl) {
    var cats = { all: "All", love: "Love", money: "Money", emotion: "Emotion", praise: "Praise", chat: "Chat", insult: "Insults" };
    var cur = "all";
    $("#dict-cats").innerHTML = Object.keys(cats).map(function (k) { return "<button type='button' class='tab' data-cat='" + k + "' aria-selected='" + (k === "all") + "'>" + cats[k] + "</button>"; }).join("");
    function draw() {
      var q = ($("#dict-q").value || "").toLowerCase().trim();
      var items = N.slang.filter(function (s) {
        return (cur === "all" || s.cat === cur) && (!q || (s.n + " " + s.zh + " " + s.py + " " + s.en).toLowerCase().indexOf(q) > -1);
      });
      dl.innerHTML = items.map(function (s) {
        return "<article class='dict-item' id='n" + s.n + "'><div class='n'>" + s.n + "</div><div class='zh'>" + s.zh + "</div><div class='muted small'>" + s.py + "</div><p style='margin:.4em 0'>" + esc(s.en) + "</p>" + (s.note ? "<p class='small muted' style='margin:0'>" + esc(s.note) + "</p>" : "") + "<div style='margin-top:8px'><span class='tag " + (s.cat === "insult" ? "red" : s.cat === "money" ? "gold" : "jade") + "'>" + s.cat + "</span> <a class='small' href='" + root + "decoder.html?n=" + s.n + "'>Decode →</a></div></article>";
      }).join("") || "<p>No matches. <a href='" + root + "contact.html'>Suggest a number</a> and we'll add it.</p>";
      $("#dict-count").textContent = items.length + " entries";
    }
    $("#dict-q").addEventListener("input", draw);
    $("#dict-cats").addEventListener("click", function (e) {
      var b = e.target.closest("[data-cat]"); if (!b) return; cur = b.getAttribute("data-cat");
      $$("[data-cat]").forEach(function (x) { x.setAttribute("aria-selected", x === b); }); draw();
    });
    draw();
  }

  /* ================= Digit cards (meanings) ================= */
  $$("[data-digit-cards]").forEach(function (g) {
    g.innerHTML = Object.keys(N.digits).map(function (d) {
      var x = N.digits[d], cls = x.tone === "positive" ? "jade" : x.tone === "negative" ? "red" : "gold";
      return "<article class='card' id='digit-" + d + "'><div style='display:flex;justify-content:space-between;align-items:start'><div class='dnum' style='font-size:3rem;line-height:1'>" + d + "</div><span class='tag " + cls + "'>" + x.tone + "</span></div><h3 style='margin-top:8px'>" + x.han + " <span class='muted'>" + x.py + "</span></h3><p class='small'><b>Sounds like:</b> " + esc(x.sound) + "</p><p class='small'>" + esc(x.meaning) + "</p></article>";
    }).join("");
  });

  /* ================= Number of the day ================= */
  $$("[data-notd]").forEach(function (el) {
    var t = new Date(), seed = t.getFullYear() * 372 + t.getMonth() * 31 + t.getDate();
    var pick = N.slang.filter(function (s) { return s.cat !== "insult"; });
    var s = pick[seed % pick.length];
    el.innerHTML = "<div class='dnum' style='font-size:3rem;color:var(--red);line-height:1'>" + s.n + "</div><div class='zh' style='font-size:1.3rem;font-weight:700;margin-top:6px'>" + s.zh + "</div><div class='muted'>" + s.py + "</div><p style='margin-top:8px'>" + esc(s.en) + "</p><a class='btn btn-ghost btn-sm' href='" + root + "decoder.html?n=" + s.n + "'>Decode it</a>";
  });

  /* ================= Cheat sheet unlock ================= */
  function unlockSheet() { $$("[data-locked]").forEach(function (el) { el.classList.add("hide"); }); $$("[data-unlocked]").forEach(function (el) { el.classList.remove("hide"); }); }
  if (window.SiteStore && window.SiteStore.get("unlock_cheatsheet")) unlockSheet();
  document.addEventListener("unlock", function (e) { if (e.detail === "cheatsheet") unlockSheet(); });
})();
