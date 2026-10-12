// Schriftgröße umschalten und merken
(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll(".fontsize button");
  function apply(size) {
    root.dataset.schrift = size;
    buttons.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.size === size); });
    try { localStorage.setItem("schrift", size); } catch (e) {}
  }
  buttons.forEach(function (b) { b.addEventListener("click", function () { apply(b.dataset.size); }); });
  apply(root.dataset.schrift || "normal");
})();

// Aktuellen Monat bei den Terminen automatisch aufklappen
(function () {
  var monate = ["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  var d = new Date();
  var heute = (monate[d.getMonth()] + " " + d.getFullYear()).toLowerCase();
  document.querySelectorAll("details.acc > summary").forEach(function (s) {
    if (s.textContent.trim().toLowerCase() === heute) s.parentNode.open = true;
  });
})();
