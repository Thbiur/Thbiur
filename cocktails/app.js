(() => {
  "use strict";

  /* ───────── Helpers ───────── */
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem("barkartei." + key); return v === null ? fallback : JSON.parse(v); }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem("barkartei." + key, JSON.stringify(value)); } catch { /* privat-modus */ }
    }
  };

  const DATA = COCKTAILS.map((c, idx) => ({
    id: idx,
    name: c.n,
    cat: c.c,
    catName: CATEGORIES[c.c],
    base: c.b,
    glass: c.g,
    tech: c.t,
    garnish: c.z,
    ing: c.i,
    steps: c.s,
    fact: c.f || "",
    search: norm(c.n + " " + c.i.map((x) => x[1]).join(" ") + " " + c.b)
  }));

  const known = new Set(store.get("known", []).filter((n) => DATA.some((c) => c.name === n)));
  const saveKnown = () => store.set("known", [...known]);

  /* ───────── Gläser & Farben ───────── */
  const GLASS_TYPE = {
    "Cocktailschale": "coupe", "Sour-Glas": "coupe", "Martiniglas": "martini", "Margaritaglas": "margarita",
    "Tumbler": "rocks", "Highball": "highball", "Sektflöte": "flute", "Weinglas": "wine", "Kleines Weinglas": "wine",
    "Kupferbecher": "mug", "Hurricane-Glas": "hurricane", "Julep-Becher": "julep", "Irish-Coffee-Glas": "irish",
    "Tiki-Becher": "tiki"
  };
  const BASE_STEM = '<path class="outline" d="M32 37v15"/><path class="outline" d="M22 54.5c0-1.4 4.5-2.5 10-2.5s10 1.1 10 2.5"/>';
  const GLASS_SVG = {
    coupe: `<path class="liquid" d="M15 23h34c-2 6-8.5 9-17 9s-15-3-17-9z"/>
      <path class="outline" d="M12 20h40c0 8-9 13-20 13s-20-5-20-13z"/>
      <path class="outline" d="M32 33v19"/><path class="outline" d="M22 54.5c0-1.4 4.5-2.5 10-2.5s10 1.1 10 2.5"/>`,
    martini: `<path class="liquid" d="M17 20.5h30L32 35z"/>
      <path class="outline" d="M11 15h42L32 37z"/>${BASE_STEM}
      <circle class="detail" cx="38" cy="25" r="2.4"/><path class="detail" d="M38 25l9-14"/>`,
    margarita: `<path class="liquid" d="M14 19h36c-1 5-10 6.5-13 9 2 2 2 6-5 6s-7-4-5-6c-3-2.5-12-4-13-9z"/>
      <path class="outline" d="M11 15h42c0 7-12 8-15 12 2.5 2.5 2 9-6 9s-8.5-6.5-6-9c-3-4-15-5-15-12z"/>
      <path class="outline" d="M32 36v16"/><path class="outline" d="M22 54.5c0-1.4 4.5-2.5 10-2.5s10 1.1 10 2.5"/>`,
    rocks: `<path class="liquid" d="M17.6 31h28.8l-1 19.5H18.6z"/>
      <rect class="ice" x="21" y="27" width="10" height="10" rx="1.5" transform="rotate(-8 26 32)"/>
      <rect class="ice" x="32" y="29" width="10" height="10" rx="1.5" transform="rotate(10 37 34)"/>
      <path class="outline" d="M16 21l2 30.5c.1 1 .9 1.5 2 1.5h24c1.1 0 1.9-.5 2-1.5L48 21"/>
      <path class="detail" d="M18.6 47h26.8"/>`,
    highball: `<path class="liquid" d="M20.6 20h22.8l-.9 32H21.5z"/>
      <rect class="ice" x="24" y="22" width="9" height="9" rx="1.5" transform="rotate(-6 28 26)"/>
      <rect class="ice" x="30" y="33" width="9" height="9" rx="1.5" transform="rotate(8 34 37)"/>
      <path class="outline" d="M20 8l1.4 45c0 .6.5 1 1.1 1h19c.6 0 1.1-.4 1.1-1L44 8"/>
      <path class="detail" d="M38 3l-4 30"/>`,
    flute: `<path class="liquid" d="M25.4 15h13.2c0 10-1.5 18-6.6 19.5-5.1-1.5-6.6-9.5-6.6-19.5z"/>
      <path class="outline" d="M25 6c-.5 15 1 28 7 30 6-2 7.5-15 7-30"/>
      <path class="outline" d="M32 36v16"/><path class="outline" d="M24 54.5c0-1.3 3.6-2.3 8-2.3s8 1 8 2.3"/>
      <circle class="detail" cx="31" cy="27" r=".8"/><circle class="detail" cx="33.5" cy="22" r=".8"/><circle class="detail" cx="30.5" cy="18" r=".7"/>`,
    wine: `<path class="liquid" d="M17.3 21h29.4c-.4 8-6 13.5-14.7 13.5S17.7 29 17.3 21z"/>
      <path class="outline" d="M18 9c-2.5 15 2 27 14 27s16.5-12 14-27z"/>${BASE_STEM}
      <rect class="ice" x="24" y="22" width="8" height="8" rx="1.5" transform="rotate(-10 28 26)"/>`,
    mug: `<path class="liquid" d="M19.2 24h25.6l-1.3 27H20.5z"/>
      <path class="outline" d="M18 15l2.2 37c.1 1 .9 1.6 1.8 1.6h20c.9 0 1.7-.6 1.8-1.6L46 15"/>
      <path class="outline" d="M45.4 22H50a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3h-6"/>
      <path class="detail" d="M18.5 19h27M19.6 47h24.8"/>`,
    hurricane: `<path class="liquid" d="M21.4 18h21.2c.2 5-3.6 8-2.6 14 1 6-2.5 10-8 10s-9-4-8-10c1-6-2.8-9-2.6-14z"/>
      <path class="outline" d="M22 7c-2 9 3 13 1.5 22-1.5 9 2 15 8.5 15s10-6 8.5-15C39 20 44 16 42 7"/>
      <path class="outline" d="M32 44v8"/><path class="outline" d="M23 54.5c0-1.4 4-2.5 9-2.5s9 1.1 9 2.5"/>
      <path class="detail" d="M36 3l-3 22"/>`,
    julep: `<path class="liquid" d="M19.3 18h25.4l-1.6 33H20.9z" style="opacity:.35"/>
      <circle class="ice" cx="25" cy="22" r="2.4"/><circle class="ice" cx="31" cy="20" r="2.6"/><circle class="ice" cx="37" cy="22" r="2.3"/><circle class="ice" cx="28" cy="27" r="2.2"/><circle class="ice" cx="35" cy="28" r="2.4"/><circle class="ice" cx="31" cy="33" r="2.3"/>
      <path class="outline" d="M18 12l2 40c.1 1 .9 1.7 1.9 1.7h20.2c1 0 1.8-.7 1.9-1.7l2-40"/>
      <path class="detail" d="M18.3 16h27.4M20.4 48h23.2"/>
      <path class="outline" d="M33 18c-2-5 0-9 4-11M33 18c3-3 7-3 9-1-2 3-6 3-9 1zM34 13c-4-1-6-4-6-7 3 0 6 3 6 7z"/>`,
    irish: `<path class="liquid" d="M21.4 18h21.2l-2.2 17H23.6z"/>
      <path class="liquid" d="M21 13h22l-.5 5H21.5z" style="fill:#f3ead6;opacity:1"/>
      <path class="outline" d="M20 9l3.5 27h17L44 9"/>
      <path class="outline" d="M43 14h4a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-5"/>
      <path class="outline" d="M32 36v16"/><path class="outline" d="M24 54.5c0-1.3 3.6-2.3 8-2.3s8 1 8 2.3"/>`,
    tiki: `<path class="liquid" d="M20.5 16h23l-1.6 37H22.1z" style="opacity:.6"/>
      <path class="outline" d="M19 9h26l-2 44c0 .6-.5 1-1.1 1H22.1c-.6 0-1.1-.4-1.1-1z"/>
      <path class="detail" d="M24 22h6M34 22h6M25 26c1.5 1 3.5 1 5 0M34 26c1.5 1 3.5 1 5 0M30 31v6h4v-6M25 42h14M27 46h10"/>
      <path class="outline" d="M36 9c1-4 4-6 7-6M38 9c2-3 6-3 8-1"/>`
  };

  const COLOR_RULES = [
    [/blue curacao/, "#3c8fc8"],
    [/espresso|kaffee|cola|fernet|dunkler rum|black seal/, "#4a2a1a"],
    [/tomatensaft/, "#b8352e"],
    [/campari|aperol/, "#c8442c"],
    [/creme de menthe \(grun\)|grune chartreuse/, "#7fae5a"],
    [/violette/, "#a9a3d6"],
    [/cranberry|grenadine|himbeer|cassis|mure|cherry/, "#c44462"],
    [/sahne|eiweiss|eigelb|kokos/, "#efe3c8"],
    [/maracuja|passion/, "#e8b440"],
    [/pfirsich/, "#f0b98a"],
    [/orangensaft/, "#f0a23c"],
    [/rotwein|portwein/, "#7e2335"],
    [/ananas/, "#f1d46a"]
  ];
  const BASE_COLOR = {
    Gin: "#dbe6d3", Wodka: "#e5eef0", Rum: "#d9a35b", Whiskey: "#c27a2c", Brandy: "#a85a22",
    Tequila: "#e8d88f", Schaumwein: "#f0dc8c", Likör: "#c76a3a", Andere: "#dba06a"
  };
  const liquidColor = (c) => {
    const text = norm(c.ing.map((x) => x[1]).join(" | "));
    // Trinidad Sour: Angostura ist Hauptzutat
    if (c.ing[0] && /angostura/.test(norm(c.ing[0][1]))) return "#8e2a22";
    for (const [re, col] of COLOR_RULES) if (re.test(text)) return col;
    return BASE_COLOR[c.base] || "#d9a35b";
  };
  DATA.forEach((c) => { c.color = liquidColor(c); });

  const glassSvg = (c) => {
    const type = GLASS_TYPE[c.glass] || "coupe";
    return `<div class="glass" style="--liquid:${c.color}" aria-hidden="true"><svg viewBox="0 0 64 64">${GLASS_SVG[type]}</svg></div>`;
  };

  const CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 10 17 19 7"/></svg>';

  const recipeHtml = (c) => `
    <div class="label">Zutaten</div>
    <ul class="ingredients">
      ${c.ing.map(([a, n]) => `<li><span class="amt">${esc(a)}</span><span>${esc(n)}</span></li>`).join("")}
    </ul>
    <div class="label">Zubereitung</div>
    <ol class="steps">${c.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
    <dl class="meta">
      <div><dt>Glas</dt><dd>${esc(c.glass)}</dd></div>
      <div><dt>Technik</dt><dd>${esc(c.tech)}</dd></div>
      <div><dt>Garnitur</dt><dd>${esc(c.garnish)}</dd></div>
    </dl>
    ${c.fact ? `<p class="fact">${esc(c.fact)}</p>` : ""}`;

  /* ───────── Navigation ───────── */
  const VIEWS = ["lernen", "sammlung", "quiz"];
  let currentView = "lernen";

  function showView(name) {
    if (!VIEWS.includes(name)) name = "lernen";
    currentView = name;
    VIEWS.forEach((v) => { $("#view-" + v).hidden = v !== name; });
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.viewLink === name));
    if (name === "sammlung") renderGrid();
    if (name === "quiz" && !quiz.current) nextQuestion();
    if (name === "lernen") renderLearnStats();
  }
  window.addEventListener("hashchange", () => showView(location.hash.slice(1)));

  /* ───────── Gemeinsame Filter-Chips ───────── */
  function renderChips(container, active, list, onPick) {
    const counts = { all: list.length };
    list.forEach((c) => { counts[c.cat] = (counts[c.cat] || 0) + 1; });
    const entries = [["all", "Alle"], ...Object.entries(CATEGORIES)];
    container.innerHTML = entries.map(([key, label]) =>
      `<button type="button" class="chip${key === active ? " active" : ""}" data-cat="${key}" aria-pressed="${key === active}">${esc(label)}<span class="count">${counts[key] || 0}</span></button>`
    ).join("");
    container.onclick = (e) => {
      const btn = e.target.closest(".chip");
      if (btn) onPick(btn.dataset.cat);
    };
  }

  /* ═════════ LERNEN ═════════ */
  const learn = {
    cat: store.get("learnCat", "all"),
    base: store.get("learnBase", "all"),
    unknownOnly: store.get("learnUnknown", false),
    deck: [],
    pos: 0,
    flipped: false,
    busy: false,
    round: { know: 0, again: 0 }
  };

  const card = $("#flashcard");
  const front = $("#card-front");
  const back = $("#card-back");
  const doneEl = $("#done");
  const controls = $("#learn-controls");

  const BASES = [...new Set(DATA.map((c) => c.base))].sort((a, b) => a.localeCompare(b, "de"));
  $("#learn-base").innerHTML = `<option value="all">Alle Spirituosen</option>` + BASES.map((b) => `<option value="${esc(b)}">${esc(b)}</option>`).join("");
  $("#learn-base").value = BASES.includes(learn.base) ? learn.base : "all";
  $("#learn-unknown").checked = learn.unknownOnly;

  function learnPool() {
    return DATA.filter((c) =>
      (learn.cat === "all" || c.cat === learn.cat) &&
      (learn.base === "all" || c.base === learn.base));
  }

  function buildDeck() {
    let pool = learnPool();
    if (learn.unknownOnly) pool = pool.filter((c) => !known.has(c.name));
    learn.deck = shuffle(pool.map((c) => c.id));
    learn.pos = 0;
    learn.round = { know: 0, again: 0 };
    renderCard(true);
  }

  function renderLearnChips() {
    renderChips($("#learn-cats"), learn.cat, DATA, (cat) => {
      learn.cat = cat; store.set("learnCat", cat);
      renderLearnChips(); buildDeck();
    });
  }

  function renderLearnStats() {
    const pool = learnPool();
    const k = pool.filter((c) => known.has(c.name)).length;
    $("#learn-known").textContent = `${k} / ${pool.length} gelernt`;
    $("#learn-bar").style.width = pool.length ? (k / pool.length * 100) + "%" : "0";
    const total = learn.deck.length;
    $("#learn-pos").textContent = total && learn.pos < total ? `Karte ${learn.pos + 1} von ${total}` : `${total} Karten im Stapel`;
  }

  function setFlipped(v) {
    learn.flipped = v;
    card.classList.toggle("flipped", v);
    card.setAttribute("aria-label", v ? "Karte zurückdrehen" : "Karte umdrehen");
    $("#btn-flip").textContent = v ? "Zurück" : "Umdrehen";
  }

  function renderCard(instant) {
    renderLearnStats();
    const finished = learn.pos >= learn.deck.length;
    card.hidden = finished;
    doneEl.hidden = !finished;
    controls.classList.toggle("disabled", finished);
    document.querySelectorAll(".deck-shadow").forEach((d) => { d.style.visibility = finished ? "hidden" : ""; });
    if (finished) { renderDone(); return; }

    const c = DATA[learn.deck[learn.pos]];
    const isKnown = known.has(c.name);
    const num = String(c.id + 1).padStart(2, "0");

    front.innerHTML = `
      <div class="card-top">
        <span class="card-num">№ ${num}</span>
        ${isKnown ? `<span class="known-badge">${CHECK} Gelernt</span>` : `<span>${esc(c.catName)}</span>`}
      </div>
      ${glassSvg(c)}
      <div>
        <h2 class="card-name">${esc(c.name)}</h2>
        <div class="ornament"><span></span></div>
        <div class="card-sub">${esc(c.base)} · ${esc(c.glass)}</div>
      </div>
      <div class="card-hint">Wie wird er gemixt?</div>`;

    back.innerHTML = `
      <div class="back-head">
        <h2>${esc(c.name)}</h2>
        <span class="card-sub">${esc(c.catName)}</span>
      </div>
      ${recipeHtml(c)}`;
    back.scrollTop = 0;

    card.classList.add("no-anim");
    setFlipped(false);
    if (!instant) card.classList.add("in");
    void card.offsetWidth;
    card.classList.remove("no-anim", "out-left", "out-right");
    requestAnimationFrame(() => card.classList.remove("in"));
  }

  function renderDone() {
    const pool = learnPool();
    const allKnown = pool.length > 0 && pool.every((c) => known.has(c.name));
    const empty = learn.deck.length === 0;
    let title, text;
    if (empty && pool.length === 0) {
      title = "Keine Karten"; text = "Für diese Filter gibt es keine Cocktails.";
    } else if (empty && allKnown) {
      title = "Alles gelernt!"; text = "Du kennst jeden Cocktail in dieser Auswahl. Zeit für eine Wiederholung?";
    } else {
      title = "Runde geschafft"; text = `${learn.round.know}× gewusst, ${learn.round.again}× nochmal angeschaut.`;
    }
    const k = pool.filter((c) => known.has(c.name)).length;
    doneEl.innerHTML = `
      <div class="big">${k}<span style="font-size:.45em;color:var(--muted)"> / ${pool.length}</span></div>
      <h2>${title}</h2>
      <p>${esc(text)}</p>
      <div class="actions">
        <button class="btn btn-gold" type="button" data-act="again">${learn.unknownOnly && allKnown ? "Alle wiederholen" : "Neue Runde"}</button>
        ${k > 0 ? `<button class="btn btn-ghost" type="button" data-act="reset">Fortschritt zurücksetzen</button>` : ""}
      </div>`;
  }

  doneEl.addEventListener("click", (e) => {
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (act === "again") {
      const pool = learnPool();
      if (learn.unknownOnly && pool.every((c) => known.has(c.name))) {
        learn.unknownOnly = false; $("#learn-unknown").checked = false; store.set("learnUnknown", false);
      }
      buildDeck();
    } else if (act === "reset") {
      if (confirm("Lernfortschritt für diese Auswahl wirklich zurücksetzen?")) {
        learnPool().forEach((c) => known.delete(c.name));
        saveKnown(); buildDeck();
      }
    }
  });

  function answer(knewIt) {
    if (learn.busy || learn.pos >= learn.deck.length) return;
    learn.busy = true;
    const id = learn.deck[learn.pos];
    const c = DATA[id];
    if (knewIt) {
      known.add(c.name);
      learn.round.know++;
    } else {
      known.delete(c.name);
      learn.round.again++;
      // Karte ein paar Positionen weiter hinten erneut einreihen
      const gap = 3 + Math.floor(Math.random() * 3);
      learn.deck.splice(Math.min(learn.pos + 1 + gap, learn.deck.length), 0, id);
    }
    saveKnown();
    card.classList.add(knewIt ? "out-right" : "out-left");
    setTimeout(() => {
      learn.pos++;
      renderCard(false);
      learn.busy = false;
    }, 320);
  }

  const flip = () => { if (!learn.busy && !card.hidden) setFlipped(!learn.flipped); };

  $("#btn-flip").addEventListener("click", flip);
  $("#btn-know").addEventListener("click", () => answer(true));
  $("#btn-again").addEventListener("click", () => answer(false));
  $("#learn-shuffle").addEventListener("click", buildDeck);
  $("#learn-base").addEventListener("change", (e) => { learn.base = e.target.value; store.set("learnBase", learn.base); buildDeck(); });
  $("#learn-unknown").addEventListener("change", (e) => { learn.unknownOnly = e.target.checked; store.set("learnUnknown", learn.unknownOnly); buildDeck(); });

  // Tippen zum Umdrehen, Wischen zum Bewerten
  let drag = null;
  card.addEventListener("pointerdown", (e) => {
    if (learn.busy || (e.pointerType === "mouse" && e.button !== 0)) return;
    drag = { x: e.clientX, y: e.clientY, dx: 0, moved: false, id: e.pointerId };
  });
  card.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    drag.dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (!drag.moved && Math.abs(drag.dx) > 8 && Math.abs(drag.dx) > Math.abs(dy)) {
      drag.moved = true;
      card.setPointerCapture(e.pointerId);
      card.style.transition = "none";
    }
    if (drag.moved) card.style.transform = `translateX(${drag.dx}px) rotate(${drag.dx / 18}deg)`;
  });
  const endDrag = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const { moved, dx } = drag;
    drag = null;
    card.style.transition = "";
    card.style.transform = "";
    if (!moved) {
      // Klick ohne Wischen → umdrehen (Scrollen auf der Rückseite nicht stören)
      if (e.type === "pointerup") flip();
      return;
    }
    if (dx > 90) answer(true);
    else if (dx < -90) answer(false);
  };
  card.addEventListener("pointerup", endDrag);
  card.addEventListener("pointercancel", endDrag);

  /* ═════════ SAMMLUNG ═════════ */
  const coll = { cat: "all", q: "" };
  const highlight = (text, q) => {
    if (!q) return esc(text);
    const n = norm(text);
    const i = n.indexOf(q);
    if (i < 0) return esc(text);
    return esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + q.length)) + "</mark>" + esc(text.slice(i + q.length));
  };

  function renderGrid() {
    const q = norm(coll.q.trim());
    const pool = DATA.filter((c) => !q || c.search.includes(q));
    renderChips($("#coll-cats"), coll.cat, pool, (cat) => { coll.cat = cat; renderGrid(); });
    const list = pool.filter((c) => coll.cat === "all" || c.cat === coll.cat);
    $("#result-count").textContent = `${list.length} ${list.length === 1 ? "Cocktail" : "Cocktails"}`;
    $("#grid").innerHTML = list.length ? list.map((c, i) => `
      <button type="button" class="tile" data-id="${c.id}" style="animation-delay:${Math.min(i, 20) * 18}ms">
        ${known.has(c.name) ? `<span class="tile-known" title="Gelernt">${CHECK}</span>` : ""}
        ${glassSvg(c)}
        <h3>${highlight(c.name, q)}</h3>
        <span class="tile-cat">${esc(c.catName)} · ${esc(c.tech)}</span>
        <p class="tile-ing">${c.ing.map((x) => highlight(x[1], q)).join(" · ")}</p>
      </button>`).join("")
      : `<p class="empty">Nichts gefunden – vielleicht ein neuer Signature Drink?</p>`;
  }

  $("#search").addEventListener("input", (e) => { coll.q = e.target.value; renderGrid(); });
  $("#grid").addEventListener("click", (e) => {
    const tile = e.target.closest(".tile");
    if (tile) openModal(DATA[+tile.dataset.id]);
  });

  /* ───────── Modal ───────── */
  const modal = $("#modal");
  function openModal(c) {
    const renderBody = () => {
      const isKnown = known.has(c.name);
      $("#modal-body").innerHTML = `
        ${glassSvg(c)}
        <div class="back-head">
          <h2 style="font-size:40px">${esc(c.name)}</h2>
          <span class="card-sub">${esc(c.catName)} · ${esc(c.base)}</span>
        </div>
        ${recipeHtml(c)}
        <div class="modal-actions">
          <button type="button" class="btn${isKnown ? " is-known" : ""}" id="modal-known">
            ${isKnown ? CHECK + " Gelernt" : "Als gelernt markieren"}
          </button>
        </div>`;
      $("#modal-known").onclick = () => {
        if (known.has(c.name)) known.delete(c.name); else known.add(c.name);
        saveKnown(); renderBody();
        if (currentView === "sammlung") renderGrid();
        renderLearnStats();
      };
    };
    renderBody();
    $("#modal-body").scrollTop = 0;
    if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
  }
  const closeModal = () => { if (modal.open) modal.close ? modal.close() : modal.removeAttribute("open"); };
  $("#modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  /* ═════════ QUIZ ═════════ */
  const quiz = { current: null, score: 0, total: 0, streak: 0, best: store.get("best", 0), lastId: -1 };

  const cleanIng = (s) => s.replace(/^optional:\s*/i, "").replace(/\s*\((optional|separat)\)/i, "").replace(/\s+zum Auffüllen$/i, "").trim();
  const ALL_ING = (() => {
    const map = new Map();
    DATA.forEach((c) => c.ing.forEach(([, n]) => {
      const clean = cleanIng(n);
      const key = norm(clean);
      if (!map.has(key)) map.set(key, { label: clean, bases: new Set() });
      map.get(key).bases.add(c.base);
    }));
    return map;
  })();
  const GLASSES = [...new Set(DATA.map((c) => c.glass))];

  function makeQuestion() {
    let c;
    do { c = pick(DATA); } while (c.id === quiz.lastId);
    quiz.lastId = c.id;

    const hideable = c.ing.map((x, i) => ({ i, a: x[0], n: x[1] }))
      .filter((x) => x.a && !/optional|separat/i.test(x.a + x.n));
    const types = ["name", "name", "glass"];
    if (hideable.length >= 2 && c.ing.length >= 3) types.push("missing", "missing");
    const type = pick(types);

    if (type === "name") {
      const same = shuffle(DATA.filter((o) => o.id !== c.id && o.base === c.base));
      const rest = shuffle(DATA.filter((o) => o.id !== c.id && o.base !== c.base));
      const wrong = [...same.slice(0, 2), ...rest].slice(0, 3);
      return { type, c, prompt: "Welcher Cocktail ist das?", kicker: "Erkenne den Drink", answer: c.name, options: shuffle([c.name, ...wrong.map((o) => o.name)]) };
    }
    if (type === "glass") {
      const wrong = shuffle(GLASSES.filter((g) => g !== c.glass && GLASS_TYPE[g] !== GLASS_TYPE[c.glass])).slice(0, 3);
      return { type, c, prompt: `In welchem Glas wird ein ${c.name} serviert?`, kicker: "Das richtige Glas", answer: c.glass, options: shuffle([c.glass, ...wrong]) };
    }
    const hidden = pick(hideable);
    const answerLabel = cleanIng(hidden.n);
    const own = new Set(c.ing.map(([, n]) => norm(cleanIng(n))));
    const candidates = [...ALL_ING.entries()].filter(([k]) => !own.has(k));
    const sameBase = shuffle(candidates.filter(([, v]) => v.bases.has(c.base)));
    const other = shuffle(candidates.filter(([, v]) => !v.bases.has(c.base)));
    const wrong = [...sameBase.slice(0, 2), ...other].slice(0, 3).map(([, v]) => v.label);
    return { type, c, hidden: hidden.i, prompt: `Was fehlt im ${c.name}?`, kicker: "Die fehlende Zutat", answer: answerLabel, options: shuffle([answerLabel, ...wrong]) };
  }

  function renderScore() {
    $("#q-score").textContent = quiz.score;
    $("#q-total").textContent = quiz.total;
    $("#q-streak").textContent = quiz.streak;
    $("#q-best").textContent = quiz.best;
  }

  function nextQuestion() {
    quiz.current = makeQuestion();
    const q = quiz.current;
    const c = q.c;
    let clue;
    if (q.type === "glass") {
      clue = `<ul class="ingredients">${c.ing.map(([a, n]) => `<li><span class="amt">${esc(a)}</span><span>${esc(n)}</span></li>`).join("")}</ul>`;
    } else {
      clue = `${glassSvg(c)}<ul class="ingredients">${c.ing.map(([a, n], i) =>
        q.type === "missing" && i === q.hidden
          ? `<li class="missing"><span class="amt">${esc(a)}</span><span>? ? ?</span></li>`
          : `<li><span class="amt">${esc(a)}</span><span>${esc(n)}</span></li>`).join("")}</ul>`;
    }
    const meta = q.type === "glass" ? `${esc(c.tech)} · Garnitur: ${esc(c.garnish)}` : `${esc(c.glass)} · ${esc(c.tech)}`;
    $("#quiz-card").innerHTML = `
      <div class="quiz-type">${esc(q.kicker)}</div>
      <h2 class="quiz-q">${esc(q.prompt)}</h2>
      <div class="quiz-clue">${clue}</div>
      <p class="quiz-meta">${meta}</p>
      <div class="options">${q.options.map((o, i) => `<button type="button" class="option" data-i="${i}">${esc(o)}</button>`).join("")}</div>
      <div class="quiz-feedback" id="quiz-feedback"></div>`;
    renderScore();
  }

  function choose(i) {
    const q = quiz.current;
    if (!q || q.answered) return;
    q.answered = true;
    const picked = q.options[i];
    const ok = picked === q.answer;
    quiz.total++;
    if (ok) { quiz.score++; quiz.streak++; } else { quiz.streak = 0; }
    if (quiz.streak > quiz.best) { quiz.best = quiz.streak; store.set("best", quiz.best); }
    document.querySelectorAll(".option").forEach((b, j) => {
      b.disabled = true;
      if (q.options[j] === q.answer) b.classList.add("correct");
      else if (j === i) b.classList.add("wrong");
      else b.classList.add("dim");
    });
    if (q.type === "missing") {
      const li = document.querySelector(".quiz-clue .missing span:last-child");
      if (li) li.textContent = q.answer;
    }
    const praise = ["Richtig – Prost!", "Genau so!", "Perfekt gemixt.", "Sauber!", "Ganz der Profi."];
    $("#quiz-feedback").innerHTML = `
      <p>${ok ? pick(praise) : `Leider nein – richtig ist <strong>${esc(q.answer)}</strong>.`}</p>
      <div class="row">
        <button type="button" class="btn btn-link" id="q-recipe">Rezept ansehen</button>
        <button type="button" class="btn btn-gold" id="q-next">Weiter →</button>
      </div>`;
    $("#q-recipe").onclick = () => openModal(q.c);
    $("#q-next").onclick = nextQuestion;
    $("#q-next").focus({ preventScroll: true });
    renderScore();
  }

  $("#quiz-card").addEventListener("click", (e) => {
    const opt = e.target.closest(".option");
    if (opt) choose(+opt.dataset.i);
  });

  /* ───────── Tastatur ───────── */
  document.addEventListener("keydown", (e) => {
    if (modal.open || e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = e.target.tagName;
    if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;

    if (currentView === "lernen") {
      if ((e.key === " " || e.key === "Enter") && tag !== "BUTTON") { e.preventDefault(); flip(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); answer(true); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); answer(false); }
    } else if (currentView === "quiz") {
      if (/^[1-4]$/.test(e.key)) choose(+e.key - 1);
      else if (e.key === "Enter" && quiz.current?.answered && tag !== "BUTTON") nextQuestion();
    }
  });

  /* ───────── Start ───────── */
  renderLearnChips();
  buildDeck();
  showView(location.hash.slice(1) || "lernen");
})();
