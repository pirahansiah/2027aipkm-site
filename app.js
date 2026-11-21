// 2027aiPKM sales page — no dependencies, no build step.
(function () {
  "use strict";

  // Wire these three before launch. Empty string = button explains it is not connected.
  var CHECKOUT = {
    solo: "",   // TODO: Lemon Squeezy / Gumroad product URL for Solo (EUR 49)
    team: ""    // TODO: checkout URL or invoice request form for Team (EUR 199)
  };

  var toast = document.createElement("div");
  toast.className = "toast";
  document.body.appendChild(toast);
  var timer;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove("show"); }, 5000);
  }

  document.querySelectorAll("[data-checkout]").forEach(function (el) {
    el.addEventListener("click", function (ev) {
      var key = el.getAttribute("data-checkout");
      if (CHECKOUT[key]) { el.href = CHECKOUT[key]; return; }
      ev.preventDefault();
      say("Checkout is not connected yet. This page is pre-launch: nothing can be purchased.");
    });
  });

  // Highlight the section currently in view in the left rail.
  var links = [].slice.call(document.querySelectorAll(".rail nav a"));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.style.borderLeftColor = "transparent"; a.style.color = ""; });
        var i = sections.indexOf(entry.target);
        if (i > -1) { links[i].style.borderLeftColor = "#1f3dff"; links[i].style.color = "#1f3dff"; }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    sections.forEach(function (s) { if (s) obs.observe(s); });
  }
})();
