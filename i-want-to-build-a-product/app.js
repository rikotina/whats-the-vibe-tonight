const STORAGE_KEY = "wtvt_places_v1";
const SAVED_KEY = "wtvt_saved_v1";

const moods = [
  { id: "cozy", label: "Cozy", hint: "Warm, unforced, easy to stay too long" },
  { id: "polished", label: "Polished", hint: "Sharp room, good lighting, no chaos" },
  { id: "romantic", label: "Romantic", hint: "Date energy without stiffness" },
  { id: "quiet", label: "Quiet", hint: "Conversation can actually happen" },
  { id: "electric", label: "Electric", hint: "A little louder, later, more alive" },
  { id: "artsy", label: "Artsy", hint: "Gallery-adjacent, curious, low pressure" },
  { id: "indulgent", label: "Indulgent", hint: "Worth dressing for, worth lingering" },
  { id: "lowkey", label: "Low-key", hint: "Good taste without performing" }
];

const filters = {
  neighborhood: ["Any", "Shibuya", "Ebisu", "Nakameguro", "Daikanyama", "Ginza", "Kagurazaka", "Shimokitazawa", "Koenji", "Aoyama", "Roppongi", "Kiyosumi-Shirakawa"],
  budget: ["Any", "low", "medium", "high", "worth-it"],
  outfit: ["Any", "casual", "smart-casual", "dressed-up", "streetwear", "workwear"],
  energy: ["Any", "solo", "date", "close-friends", "group", "networking", "low-talk"],
  time: ["Any", "afternoon", "after-work", "after-dinner", "late-night", "rainy-day"],
  friction: ["Any", "walk-in", "book-ahead", "special-effort"]
};

const seedPlaces = [
  place("p001", "Ebisu listening bar", "Ebisu", "Bar", "medium", "walk-in", "quiet", "date", "smart-casual", "after-dinner", ["cozy", "quiet", "polished", "low-talk"], "Dim, careful, and better for a second drink than a first impression.", "Good after dinner when everyone wants the night to get more specific."),
  place("p002", "Nakameguro wine counter", "Nakameguro", "Wine bar", "medium", "walk-in", "romantic", "date", "dressed-up", "after-dinner", ["romantic", "cozy", "polished"], "A close-quarters wine stop with soft lighting and unfussy taste.", "Best when you want the night to feel chosen, not planned to death."),
  place("p003", "Daikanyama book cafe", "Daikanyama", "Cafe", "low", "walk-in", "artsy", "solo", "casual", "afternoon", ["artsy", "quiet", "lowkey"], "Browsing, coffee, and a small sense of becoming more interesting.", "Strong solo afternoon energy; easy to turn into dinner nearby."),
  place("p004", "Ginza cocktail room", "Ginza", "Cocktail bar", "high", "book-ahead", "indulgent", "date", "dressed-up", "after-dinner", ["indulgent", "polished", "romantic"], "Precise drinks, adult lighting, and a room that rewards being dressed well.", "Use when the outfit is doing some of the work."),
  place("p005", "Shimokitazawa vinyl basement", "Shimokitazawa", "Music bar", "low", "walk-in", "electric", "close-friends", "streetwear", "late-night", ["electric", "artsy", "lowkey"], "A loose, music-first room where the night can get pleasantly strange.", "Good when nobody wants a formal plan."),
  place("p006", "Kagurazaka hidden bistro", "Kagurazaka", "Bistro", "medium", "book-ahead", "romantic", "date", "smart-casual", "after-work", ["romantic", "cozy", "polished"], "Sloped-street charm, warm plates, and enough polish to feel intentional.", "A first real date that does not announce itself too loudly."),
  place("p007", "Koenji standing sake bar", "Koenji", "Sake bar", "low", "walk-in", "lowkey", "close-friends", "casual", "after-work", ["lowkey", "cozy", "electric"], "Easygoing, inexpensive, and good for letting conversation find its rhythm.", "The fallback that still has character."),
  place("p008", "Aoyama garden terrace", "Aoyama", "Restaurant", "high", "book-ahead", "polished", "networking", "dressed-up", "after-work", ["polished", "indulgent", "quiet"], "Clean lines, calmer tables, and a little social polish without hotel-lobby energy.", "Useful when the night has professional undertones."),
  place("p009", "Kiyosumi coffee and gallery", "Kiyosumi-Shirakawa", "Cafe gallery", "low", "walk-in", "artsy", "solo", "casual", "afternoon", ["artsy", "quiet", "lowkey"], "A soft landing for people who want culture without making it a production.", "Best before a slow walk or a casual dinner."),
  place("p010", "Roppongi late lounge", "Roppongi", "Lounge", "high", "special-effort", "electric", "group", "dressed-up", "late-night", ["electric", "indulgent", "polished"], "Glossy, social, and better when the night wants volume.", "Not for deep talks; good for momentum."),
  place("p011", "Shibuya tiny izakaya", "Shibuya", "Izakaya", "low", "walk-in", "cozy", "close-friends", "casual", "after-work", ["cozy", "lowkey", "electric"], "Small, warm, and forgiving when the group is hungry and indecisive.", "A safe first stop before something louder."),
  place("p012", "Nakameguro riverside dessert", "Nakameguro", "Dessert", "low", "walk-in", "romantic", "date", "smart-casual", "late-night", ["romantic", "cozy", "quiet"], "A sweet final move that makes the walk feel like part of the plan.", "Best after wine or a low-key dinner."),
  place("p013", "Ginza kissaten classic", "Ginza", "Kissaten", "medium", "walk-in", "quiet", "solo", "workwear", "afternoon", ["quiet", "polished", "lowkey"], "Old-school calm, serious coffee, and no pressure to be exciting.", "Good when you need a composed hour in the city."),
  place("p014", "Ebisu charcoal counter", "Ebisu", "Yakitori", "medium", "book-ahead", "cozy", "date", "smart-casual", "after-work", ["cozy", "romantic", "indulgent"], "Warm smoke, counter seats, and just enough intimacy.", "Works for dates that should feel hungry and relaxed."),
  place("p015", "Aoyama natural wine room", "Aoyama", "Wine bar", "medium", "walk-in", "artsy", "close-friends", "dressed-up", "after-dinner", ["artsy", "polished", "romantic"], "Interesting bottles, stylish people, and a room that stays human.", "Good for a dressed-up friend catch-up."),
  place("p016", "Shimokitazawa curry cinema", "Shimokitazawa", "Dinner", "low", "walk-in", "lowkey", "solo", "casual", "rainy-day", ["lowkey", "cozy", "artsy"], "Comfort food with a movie-adjacent mood and no need to impress.", "Rainy-day reliable."),
  place("p017", "Kagurazaka tea salon", "Kagurazaka", "Tea", "medium", "walk-in", "quiet", "solo", "smart-casual", "afternoon", ["quiet", "cozy", "polished"], "Calm, elegant, and generous to people who want a softer city.", "A reset button before evening plans."),
  place("p018", "Koenji live corner", "Koenji", "Live music", "low", "walk-in", "electric", "group", "streetwear", "late-night", ["electric", "artsy", "lowkey"], "Loose live music energy without the heavy door-policy feeling.", "Take friends who are willing to be surprised."),
  place("p019", "Daikanyama aperitivo table", "Daikanyama", "Restaurant", "medium", "book-ahead", "polished", "date", "dressed-up", "after-work", ["polished", "romantic", "indulgent"], "Good clothes, small plates, and a neighborhood that does half the flirting.", "Ideal for easing into a longer night."),
  place("p020", "Shibuya rooftop bite", "Shibuya", "Restaurant", "medium", "book-ahead", "electric", "group", "smart-casual", "after-dinner", ["electric", "polished", "indulgent"], "City lights and easy food when the group wants a visible win.", "Useful when visitors are involved."),
  place("p021", "Kiyosumi riverside ramen", "Kiyosumi-Shirakawa", "Ramen", "low", "walk-in", "lowkey", "solo", "casual", "after-work", ["lowkey", "cozy", "quiet"], "A simple, satisfying meal that keeps the evening grounded.", "Best when the budget is part of the brief."),
  place("p022", "Roppongi quiet hotel bar", "Roppongi", "Hotel bar", "high", "book-ahead", "quiet", "date", "dressed-up", "after-dinner", ["quiet", "polished", "romantic"], "A more composed Roppongi option for talking rather than performing.", "Good if someone is dressed too well for a casual bar."),
  place("p023", "Ginza after-theater counter", "Ginza", "Sushi counter", "high", "special-effort", "indulgent", "date", "dressed-up", "after-dinner", ["indulgent", "quiet", "polished"], "Small, precise, and built for a night that already has occasion energy.", "Use sparingly; the friction is part of the point."),
  place("p024", "Nakameguro casual gyoza", "Nakameguro", "Dinner", "low", "walk-in", "lowkey", "close-friends", "casual", "after-work", ["lowkey", "cozy", "electric"], "Unpretentious, fast, and good before the more interesting second stop.", "A practical anchor for a flexible night.")
];

let state = {
  mood: "cozy",
  neighborhood: "Any",
  budget: "Any",
  outfit: "Any",
  energy: "Any",
  time: "Any",
  friction: "Any"
};

function place(id, name, neighborhood, category, budget, walkIn, mood, energy, outfit, time, tags, oneLiner, notes) {
  return {
    id,
    name,
    neighborhood,
    category,
    budget,
    walkIn,
    primaryMood: mood,
    socialEnergy: energy,
    outfit,
    time,
    tags,
    oneLiner,
    notes,
    address: `${neighborhood}, Tokyo`,
    englishFriendly: tags.includes("polished") || tags.includes("indulgent") ? "likely" : "mixed",
    reservation: walkIn === "walk-in" ? "Walk-in friendly" : walkIn === "book-ahead" ? "Book ahead" : "Special effort",
    verified: "Demo seed. Verify before publishing.",
    accentA: colorFor(tags[0]),
    accentB: colorFor(tags[1] || mood)
  };
}

function colorFor(tag) {
  const colors = {
    cozy: "rgba(214, 176, 94, 0.58)",
    polished: "rgba(108, 148, 207, 0.52)",
    romantic: "rgba(217, 112, 116, 0.54)",
    quiet: "rgba(143, 184, 110, 0.46)",
    electric: "rgba(90, 183, 173, 0.55)",
    artsy: "rgba(199, 125, 215, 0.42)",
    indulgent: "rgba(238, 151, 83, 0.5)",
    lowkey: "rgba(170, 162, 146, 0.44)"
  };
  return colors[tag] || "rgba(214, 176, 94, 0.48)";
}

function getPlaces() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPlaces));
    return seedPlaces;
  }
  return JSON.parse(stored);
}

function setPlaces(places) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(places));
}

function getSaved() {
  return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
}

function setSaved(ids) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
}

function scorePlace(placeItem) {
  let score = 0;
  if (placeItem.tags.includes(state.mood)) score += 32;
  if (placeItem.primaryMood === state.mood) score += 12;
  if (state.neighborhood === "Any" || placeItem.neighborhood === state.neighborhood) score += 16;
  if (state.budget === "Any" || placeItem.budget === state.budget) score += 14;
  if (state.outfit === "Any" || placeItem.outfit === state.outfit) score += 11;
  if (state.energy === "Any" || placeItem.socialEnergy === state.energy) score += 16;
  if (state.time === "Any" || placeItem.time === state.time) score += 10;
  if (state.friction === "Any" || placeItem.walkIn === state.friction) score += 9;
  if (state.friction === "walk-in" && placeItem.walkIn !== "walk-in") score -= 13;
  if (state.budget === "low" && placeItem.budget === "high") score -= 18;
  return score;
}

function getRecommendations() {
  const ranked = getPlaces()
    .map((placeItem) => ({ ...placeItem, score: scorePlace(placeItem) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const bolder = ranked.find((item) => item.id !== best?.id && (item.tags.includes("electric") || item.tags.includes("indulgent") || item.walkIn === "special-effort")) || ranked[1];
  const easy = ranked.find((item) => item.id !== best?.id && item.id !== bolder?.id && item.walkIn === "walk-in" && item.budget !== "high") || ranked[2];
  return [
    { role: "Best match", ...best },
    { role: "Slightly bolder", ...bolder },
    { role: "Easy fallback", ...easy }
  ].filter(Boolean);
}

function renderMoodOptions() {
  const container = document.querySelector("#mood-options");
  container.innerHTML = moods
    .map((mood) => `<button class="mood-option ${state.mood === mood.id ? "active" : ""}" type="button" data-mood="${mood.id}">${mood.label}<span>${mood.hint}</span></button>`)
    .join("");
}

function fillSelect(id, options, value) {
  const select = document.querySelector(`#${id}`);
  select.innerHTML = options.map((option) => `<option value="${option}">${labelize(option)}</option>`).join("");
  select.value = value;
}

function labelize(value) {
  return value.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderControls() {
  fillSelect("neighborhood", filters.neighborhood, state.neighborhood);
  fillSelect("budget", filters.budget, state.budget);
  fillSelect("outfit", filters.outfit, state.outfit);
  fillSelect("energy", filters.energy, state.energy);
  fillSelect("time", filters.time, state.time);
  fillSelect("friction", filters.friction, state.friction);
  fillSelect("place-budget", filters.budget.filter((value) => value !== "Any"), "medium");
  fillSelect("place-walkin", filters.friction.filter((value) => value !== "Any"), "walk-in");
}

function cardTemplate(placeItem) {
  return `
    <article class="place-card">
      <div class="place-art" style="--accent-a:${esc(placeItem.accentA)}; --accent-b:${esc(placeItem.accentB)};"></div>
      <div class="place-card-body">
        <p class="meta">${esc(placeItem.role || placeItem.neighborhood)} · ${esc(placeItem.category)}</p>
        <h3>${esc(placeItem.name)}</h3>
        <p>${esc(placeItem.oneLiner)}</p>
        <div class="chip-row">
          <span class="chip">${esc(placeItem.neighborhood)}</span>
          <span class="chip">${esc(labelize(placeItem.budget))}</span>
          <span class="chip">${esc(labelize(placeItem.walkIn))}</span>
          <span class="chip">${esc(labelize(placeItem.socialEnergy))}</span>
        </div>
        <div class="card-actions">
          <button type="button" data-detail="${esc(placeItem.id)}">Details</button>
          <button type="button" data-save="${esc(placeItem.id)}">${getSaved().includes(placeItem.id) ? "Saved" : "Save"}</button>
        </div>
      </div>
    </article>
  `;
}

function renderResults() {
  document.querySelector("#results").innerHTML = getRecommendations().map(cardTemplate).join("");
  updateUrl();
}

function renderSaved() {
  const saved = getSaved();
  const places = getPlaces().filter((item) => saved.includes(item.id));
  document.querySelector("#saved-list").innerHTML = places.length
    ? places.map(cardTemplate).join("")
    : `<div class="saved-empty">Saved places will live here. Start by saving a recommendation from Discover.</div>`;
}

function renderAdmin() {
  const places = getPlaces();
  const neighborhoods = new Set(places.map((item) => item.neighborhood));
  const tags = new Set(places.flatMap((item) => item.tags));
  document.querySelector("#stats").innerHTML = `
    <div class="stat"><strong>${places.length}</strong><span>Places</span></div>
    <div class="stat"><strong>${neighborhoods.size}</strong><span>Neighborhoods</span></div>
    <div class="stat"><strong>${tags.size}</strong><span>Vibe tags</span></div>
    <div class="stat"><strong>3</strong><span>Result types</span></div>
  `;
  document.querySelector("#admin-list").innerHTML = places
    .map(
      (item) => `
      <article class="admin-row">
        <strong>${esc(item.name)}</strong>
        <span class="meta">${esc(item.neighborhood)} · ${esc(item.category)} · ${esc(item.tags.join(", "))}</span>
        <button class="ghost-action" type="button" data-edit="${esc(item.id)}">Edit</button>
      </article>
    `
    )
    .join("");
}

function showDetail(id) {
  const placeItem = getPlaces().find((item) => item.id === id);
  if (!placeItem) return;
  document.querySelector("#place-detail").innerHTML = `
    <div class="detail-grid">
      <div class="place-art" style="--accent-a:${esc(placeItem.accentA)}; --accent-b:${esc(placeItem.accentB)};"></div>
      <div>
        <p class="eyebrow">${esc(placeItem.neighborhood)} · ${esc(placeItem.category)}</p>
        <h2>${esc(placeItem.name)}</h2>
        <p>${esc(placeItem.oneLiner)}</p>
        <div class="chip-row">${placeItem.tags.map((tag) => `<span class="chip">${esc(labelize(tag))}</span>`).join("")}</div>
        <div class="detail-list">
          <div><strong>Why tonight</strong><span>${esc(placeItem.notes)}</span></div>
          <div><strong>Budget</strong><span>${esc(labelize(placeItem.budget))}</span></div>
          <div><strong>Outfit</strong><span>${esc(labelize(placeItem.outfit))}</span></div>
          <div><strong>Social fit</strong><span>${esc(labelize(placeItem.socialEnergy))}</span></div>
          <div><strong>Reservation</strong><span>${esc(placeItem.reservation)}</span></div>
          <div><strong>Data status</strong><span>${esc(placeItem.verified)}</span></div>
        </div>
      </div>
    </div>
  `;
  document.querySelector("#place-dialog").showModal();
}

function savePlace(id) {
  const saved = getSaved();
  setSaved(saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id]);
  renderResults();
  renderSaved();
}

function editPlace(id) {
  const item = getPlaces().find((placeItem) => placeItem.id === id);
  if (!item) return;
  document.querySelector("#place-id").value = item.id;
  document.querySelector("#place-name").value = item.name;
  document.querySelector("#place-neighborhood").value = item.neighborhood;
  document.querySelector("#place-category").value = item.category;
  document.querySelector("#place-budget").value = item.budget;
  document.querySelector("#place-walkin").value = item.walkIn;
  document.querySelector("#place-oneliner").value = item.oneLiner;
  document.querySelector("#place-tags").value = item.tags.join(", ");
  document.querySelector("#place-notes").value = item.notes;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetPlaceForm() {
  document.querySelector("#place-form").reset();
  document.querySelector("#place-id").value = "";
  document.querySelector("#place-budget").value = "medium";
  document.querySelector("#place-walkin").value = "walk-in";
}

function savePlaceFromForm(event) {
  event.preventDefault();
  const id = document.querySelector("#place-id").value || `p${Date.now()}`;
  const tags = document.querySelector("#place-tags").value.split(",").map((tag) => tag.trim().toLowerCase()).filter(Boolean);
  const nextPlace = {
    id,
    name: document.querySelector("#place-name").value,
    neighborhood: document.querySelector("#place-neighborhood").value,
    category: document.querySelector("#place-category").value,
    budget: document.querySelector("#place-budget").value,
    walkIn: document.querySelector("#place-walkin").value,
    primaryMood: tags[0] || "cozy",
    socialEnergy: tags.includes("date") ? "date" : tags.includes("group") ? "group" : "close-friends",
    outfit: tags.includes("dressed-up") ? "dressed-up" : tags.includes("streetwear") ? "streetwear" : "smart-casual",
    time: tags.includes("late-night") ? "late-night" : "after-dinner",
    tags,
    oneLiner: document.querySelector("#place-oneliner").value,
    notes: document.querySelector("#place-notes").value,
    address: `${document.querySelector("#place-neighborhood").value}, Tokyo`,
    englishFriendly: "unknown",
    reservation: labelize(document.querySelector("#place-walkin").value),
    verified: "User-added. Needs verification.",
    accentA: colorFor(tags[0]),
    accentB: colorFor(tags[1] || tags[0])
  };
  const places = getPlaces();
  const index = places.findIndex((item) => item.id === id);
  if (index >= 0) places[index] = nextPlace;
  else places.unshift(nextPlace);
  setPlaces(places);
  resetPlaceForm();
  renderAll();
}

function updateUrl() {
  const params = new URLSearchParams(state);
  history.replaceState(null, "", `?${params.toString()}`);
}

function hydrateFromUrl() {
  const params = new URLSearchParams(location.search);
  Object.keys(state).forEach((key) => {
    if (params.has(key)) state[key] = params.get(key);
  });
}

function tune(direction) {
  if (direction === "quieter") {
    state.mood = "quiet";
    state.energy = "low-talk";
  }
  if (direction === "bolder") {
    state.mood = "electric";
    state.friction = "Any";
  }
  if (direction === "cheaper") {
    state.budget = "low";
    state.friction = "walk-in";
  }
  renderAll();
}

function switchView(view) {
  document.querySelectorAll(".view").forEach((item) => item.classList.toggle("active", item.id === `${view}-view`));
  document.querySelectorAll(".nav-button").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  if (view === "saved") renderSaved();
  if (view === "admin") renderAdmin();
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const moodButton = event.target.closest("[data-mood]");
    const navButton = event.target.closest("[data-view]");
    const tuneButton = event.target.closest("[data-tune]");
    const detailButton = event.target.closest("[data-detail]");
    const saveButton = event.target.closest("[data-save]");
    const editButton = event.target.closest("[data-edit]");
    if (moodButton) {
      state.mood = moodButton.dataset.mood;
      renderAll();
    }
    if (navButton) switchView(navButton.dataset.view);
    if (tuneButton) tune(tuneButton.dataset.tune);
    if (detailButton) showDetail(detailButton.dataset.detail);
    if (saveButton) savePlace(saveButton.dataset.save);
    if (editButton) editPlace(editButton.dataset.edit);
  });

  document.querySelector("#vibe-form").addEventListener("submit", (event) => {
    event.preventDefault();
    ["neighborhood", "budget", "outfit", "energy", "time", "friction"].forEach((key) => {
      state[key] = document.querySelector(`#${key}`).value;
    });
    renderAll();
  });

  document.querySelector("#soft-reset").addEventListener("click", () => {
    state = { mood: "cozy", neighborhood: "Any", budget: "Any", outfit: "Any", energy: "Any", time: "Any", friction: "Any" };
    renderAll();
  });

  document.querySelector("#close-dialog").addEventListener("click", () => document.querySelector("#place-dialog").close());
  document.querySelector("#clear-saved").addEventListener("click", () => {
    setSaved([]);
    renderSaved();
    renderResults();
  });
  document.querySelector("#new-place").addEventListener("click", resetPlaceForm);
  document.querySelector("#place-form").addEventListener("submit", savePlaceFromForm);
}

function renderAll() {
  renderMoodOptions();
  renderControls();
  renderResults();
  renderSaved();
  renderAdmin();
}

hydrateFromUrl();
renderAll();
bindEvents();
