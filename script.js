document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.getElementById("darkToggle");

  // 🌙 Apply stored theme on load
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) applyTheme(storedTheme);

  // 🌗 Toggle theme on click
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = body.classList.contains("bg-black") ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("theme", next);
    });
  }

  function applyTheme(theme) {
    if (theme === "light") {
      body.classList.remove("bg-black", "text-white");
      body.classList.add("bg-white", "text-gray-800");
    } else {
      body.classList.remove("bg-white", "text-gray-800");
      body.classList.add("bg-black", "text-white");
    }
  }

  // 🔗 Alert for inactive project links
  document.querySelectorAll("#projects a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === "#") {
      link.addEventListener("click", e => {
        e.preventDefault();
        alert("This link is not yet active. Stay tuned!");
      });
    }
  });

  // 🎯 Smooth scroll for anchor links
  document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ✨ Scroll reveal animation
  const revealElements = document.querySelectorAll("section, .glass");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("transition", "duration-700", "opacity-100", "translate-y-0");
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.classList.add("opacity-0", "-translate-y-4");
    observer.observe(el);
  });
});