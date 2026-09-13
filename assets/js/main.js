/* Theme toggle.
   Three states are respected: no stamp on <html> means "follow the OS",
   data-theme="light" and data-theme="dark" are explicit choices.
   The stored choice is a per-browser convenience, so every access is guarded. */
(function () {
  var root = document.documentElement;
  var KEY = "theme";

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function store(value) {
    try {
      if (value) localStorage.setItem(KEY, value);
      else localStorage.removeItem(KEY);
    } catch (e) { /* private window, blocked site data — ignore */ }
  }

  var saved = stored();
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  function current() {
    var stamp = root.getAttribute("data-theme");
    if (stamp === "light" || stamp === "dark") return stamp;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest(".theme-toggle");
    if (!button) return;
    var next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    store(next);
    button.setAttribute("aria-label", next === "dark" ? "Switch to light theme" : "Switch to dark theme");
  });
})();
