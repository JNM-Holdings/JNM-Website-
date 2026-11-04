/* Portfolio: filters and photo viewer.
   Cards are generated from the list in the build script; to edit by hand,
   change the data-* attributes on the matching button in portfolio.html. */
(function () {
  var grid = document.getElementById("pgrid");
  if (!grid) return;
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".pcard"));
  var buttons = document.querySelectorAll(".filters button");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var count = document.getElementById("pcount");
  var chlist = document.getElementById("chlist");

  function apply(cat) {
    var shown = 0;
    cards.forEach(function (c) {
      var match = cat === "all" || c.dataset.cat === cat;
      if (match) shown++;
      if (reduce) { c.hidden = !match; return; }
      if (match) { c.hidden = false; requestAnimationFrame(function () { c.classList.remove("out"); }); }
      else { c.classList.add("out"); setTimeout(function () { if (c.classList.contains("out")) c.hidden = true; }, 250); }
    });
    if (chlist) chlist.hidden = !(cat === "all" || cat === "chancery");
    if (count) count.textContent = shown + (shown === 1 ? " property" : " properties");
  }
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      buttons.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", "true");
      apply(b.dataset.filter);
    });
  });
  apply("all");

  var dlg = document.getElementById("viewer");
  var vImg = document.getElementById("v-img"), vCat = document.getElementById("v-cat"),
      vTitle = document.getElementById("v-title");
  var currentCard = null;
  function visible() { return cards.filter(function (c) { return !c.hidden; }); }
  function show(card) {
    vImg.src = card.dataset.full; vImg.alt = card.dataset.alt;
    vCat.textContent = card.dataset.label; vTitle.textContent = card.dataset.title;
    currentCard = card;
  }
  function open(card) {
    show(card);
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
  }
  cards.forEach(function (c) { c.addEventListener("click", function () { open(c); }); });
  function step(dir) {
    var list = visible(); if (!list.length) return;
    var i = list.indexOf(currentCard);
    if (i < 0) i = 0;
    show(list[(i + dir + list.length) % list.length]);
  }
  document.getElementById("v-prev").addEventListener("click", function () { step(-1); });
  document.getElementById("v-next").addEventListener("click", function () { step(1); });
  document.getElementById("v-close").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
