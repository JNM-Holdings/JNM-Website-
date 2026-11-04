document.documentElement.classList.add("js");
var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Settings you may need to change ---------- */
var FORM_ENDPOINT = "https://formspree.io/f/moeepqnz"; // Formspree form
var PHONE = "+254 20 7120364";

/* ---------- Mobile menu ---------- */
var menuBtn = document.querySelector(".menu-btn");
var menuNav = document.getElementById("site-nav");
function closeMenu() {
  if (!menuNav) return;
  menuNav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open menu");
}
if (menuBtn && menuNav) {
  menuBtn.addEventListener("click", function () {
    var open = menuNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  menuNav.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
}

/* ---------- Footer year ---------- */
document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

/* ---------- Prefill form subject from ?subject= ---------- */
var params = new URLSearchParams(location.search);
var subj = document.querySelector('form input[name="subject"]');
if (subj && params.get("subject")) subj.value = params.get("subject");

/* ---------- Forms ---------- */
document.querySelectorAll("form[data-msg]").forEach(function (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    var status = form.querySelector(".status");
    var button = form.querySelector("button[type=submit]");
    status.className = "status";
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (form.querySelector('[name="_gotcha"]').value) return; // spam trap
    button.disabled = true; status.textContent = "Sending...";
    try {
      var res = await fetch(FORM_ENDPOINT, {
        method: "POST", body: new FormData(form), headers: { Accept: "application/json" }
      });
      if (!res.ok) throw new Error("bad response");
      status.className = "status good";
      status.textContent = form.dataset.msg;
      form.reset();
    } catch (err) {
      status.className = "status bad";
      status.textContent = "We could not send that. Please call " + PHONE + " or email info@jnmholdings.co.ke.";
    }
    button.disabled = false;
  });
});

/* ---------- Fade in on scroll, stats count up, timeline ---------- */
function countUp(el) {
  var target = +el.dataset.count, suffix = el.dataset.suffix || "";
  if (reduce) { el.textContent = target + suffix; return; }
  var start = null;
  function step(t) {
    if (!start) start = t;
    var p = Math.min((t - start) / 1200, 1);
    el.textContent = Math.round(target * p) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
var items = document.querySelectorAll(".rv, .timeline");
if (!("IntersectionObserver" in window) || reduce) {
  items.forEach(function (el) { el.classList.add("in"); });
  document.querySelectorAll("[data-count]").forEach(countUp);
} else {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      en.target.querySelectorAll("[data-count]").forEach(countUp);
      io.unobserve(en.target);
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
}
