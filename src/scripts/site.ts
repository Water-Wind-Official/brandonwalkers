const root = document.documentElement;
root.classList.add("js");

// Navigation remains visible when JavaScript is unavailable.
const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle");
const menu = document.querySelector<HTMLElement>("#main-nav");
const closeMenu = () => {
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation");
  menu?.classList.remove("is-open");
};
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  menu?.classList.toggle("is-open", open);
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton?.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (event.target instanceof Element && !event.target.closest(".navigation"))
    closeMenu();
});
menu
  ?.querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));

// A single motion preference controls decorative animation across every page.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let savedMotion: string | null = null;
try {
  savedMotion = localStorage.getItem("bw-motion");
} catch {
  /* Storage is optional. */
}
let paused = reducedMotion.matches || savedMotion === "paused";
const motionButton =
  document.querySelector<HTMLButtonElement>(".motion-toggle");
const hyperspace =
  document.querySelector<HTMLButtonElement>(".hyperspace-button");
const applyMotion = () => {
  root.dataset.motion = paused ? "paused" : "running";
  if (motionButton) {
    motionButton.hidden = reducedMotion.matches;
    motionButton.setAttribute("aria-pressed", String(paused));
    const label = motionButton.querySelector("span");
    if (label) label.textContent = paused ? "Resume motion" : "Pause motion";
  }
  if (hyperspace) hyperspace.hidden = paused;
  if (paused) root.classList.remove("is-hyperspace");
};
applyMotion();
motionButton?.addEventListener("click", () => {
  paused = !paused;
  try {
    localStorage.setItem("bw-motion", paused ? "paused" : "running");
  } catch {
    /* Storage is optional. */
  }
  applyMotion();
});
reducedMotion.addEventListener("change", (event) => {
  let preference = null;
  try {
    preference = localStorage.getItem("bw-motion");
  } catch {
    /* Storage is optional. */
  }
  paused = event.matches || preference === "paused";
  applyMotion();
});
hyperspace?.addEventListener("click", () => {
  if (paused) return;
  hyperspace.disabled = true;
  const label = hyperspace.querySelector("span");
  if (label) label.textContent = "Into the current…";
  root.classList.add("is-hyperspace");
  window.setTimeout(() => {
    root.classList.remove("is-hyperspace");
    hyperspace.disabled = false;
    if (label) label.textContent = "Ride the wave";
  }, 2400);
});

for (const button of document.querySelectorAll<HTMLButtonElement>(
  ".copy-email",
)) {
  if (!navigator.clipboard?.writeText) continue;
  button.hidden = false;
  button.addEventListener("click", async () => {
    const label = button.querySelector("span");
    const status =
      button.parentElement?.querySelector<HTMLElement>(".copy-status");
    try {
      await navigator.clipboard.writeText(button.dataset.email || "");
      if (label) label.textContent = "Email copied!";
      if (status) status.textContent = "Email address copied to clipboard.";
    } catch {
      if (label) label.textContent = "Use the email link";
      if (status)
        status.textContent =
          "Could not copy. Use the email link or select the address on this page.";
    }
    window.setTimeout(() => {
      if (label) label.textContent = "Copy email";
      if (status) status.textContent = "";
    }, 3500);
  });
}

// Shareable project filters; every project is present in the server-rendered HTML.
const projectGrid = document.querySelector<HTMLElement>("[data-project-grid]");
if (projectGrid) {
  const filterBar = document.querySelector<HTMLElement>(".filter-bar");
  if (filterBar) filterBar.hidden = false;
  const cards = Array.from(
    projectGrid.querySelectorAll<HTMLElement>(".project-card"),
  );
  const buttons = Array.from(
    document.querySelectorAll<HTMLButtonElement>(".filter-button"),
  );
  const search = document.querySelector<HTMLInputElement>("#project-search");
  const count = document.querySelector<HTMLElement>(".project-count");
  const empty = document.querySelector<HTMLElement>(".empty-state");
  const params = new URLSearchParams(location.search);
  let category = ["Web", "Apps", "Worlds"].includes(
    params.get("category") || "",
  )
    ? params.get("category")!
    : "All";
  if (search) search.value = params.get("q") || "";
  const filter = (updateURL = true) => {
    const query = search?.value.trim().toLowerCase() || "";
    let visible = 0;
    for (const card of cards) {
      const matches =
        (category === "All" || card.dataset.category === category) &&
        (card.dataset.search || "").includes(query);
      card.hidden = !matches;
      if (matches) visible++;
    }
    buttons.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === category),
      ),
    );
    if (count)
      count.textContent = `${visible} ${visible === 1 ? "project" : "projects"}${category === "All" ? " across the creative universe" : ` in ${category.toLowerCase()}`}`;
    if (empty) empty.hidden = visible > 0;
    if (updateURL) {
      const url = new URL(location.href);
      category === "All"
        ? url.searchParams.delete("category")
        : url.searchParams.set("category", category);
      query
        ? url.searchParams.set("q", search?.value.trim() || "")
        : url.searchParams.delete("q");
      history.replaceState(null, "", url);
    }
  };
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      category = button.dataset.filter || "All";
      filter();
    }),
  );
  search?.addEventListener("input", () => filter());
  document.querySelector(".reset-filters")?.addEventListener("click", () => {
    category = "All";
    if (search) search.value = "";
    filter();
    search?.focus();
  });
  filter(false);
}
