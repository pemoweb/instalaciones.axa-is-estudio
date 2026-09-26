/**
 * ==========================================================================
 * INSTALACIONES AXA — Vanilla JavaScript Module
 * Native ES2022+ APIs only. Zero external libraries.
 * ==========================================================================
 */

// Sticky Header Behaviour
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

// Mobile Navigation
function initMobileNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNavigation = document.querySelector(".main-navigation");
  if (!menuToggle || !mainNavigation) return;

  const navigationLinks = mainNavigation.querySelectorAll("a");

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNavigation.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("no-scroll", isOpen);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNavigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    });
  });

  // Close when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mainNavigation.classList.contains("is-open")) {
      mainNavigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    }
  });
}

// Service Selector with smooth scroll and highlight
function initServiceSelector() {
  const serviceButtons = document.querySelectorAll("[data-service-target]");
  if (!serviceButtons.length) return;

  serviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      serviceButtons.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });

      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");

      const targetId = button.dataset.serviceTarget;
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      target.classList.add("service-highlight");

      window.setTimeout(() => {
        target.classList.remove("service-highlight");
      }, 1200);
    });
  });
}

// Service Card Quick Links
function initServiceCardLinks() {
  const cardButtons = document.querySelectorAll("[data-scroll-to-service]");
  cardButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-scroll-to-service");
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      target.classList.add("service-highlight");
      window.setTimeout(() => {
        target.classList.remove("service-highlight");
      }, 1200);

      // Also sync the selector tab
      const selectorTab = document.querySelector(`[data-service-target="${targetId}"]`);
      if (selectorTab) {
        document.querySelectorAll("[data-service-target]").forEach((t) => {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        selectorTab.classList.add("is-active");
        selectorTab.setAttribute("aria-selected", "true");
      }
    });
  });
}

// Gallery Filters
function initGalleryFilters() {
  const filters = document.querySelectorAll("[data-filter]");
  const projects = document.querySelectorAll("[data-category]");
  if (!filters.length || !projects.length) return;

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.dataset.filter;

      filters.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed", "false");
      });

      filter.classList.add("is-active");
      filter.setAttribute("aria-pressed", "true");

      projects.forEach((project) => {
        const matches = category === "todos" || project.dataset.category === category;
        project.hidden = !matches;
      });
    });
  });
}

// Scroll Reveal with IntersectionObserver
function initScrollReveal() {
  if (!("IntersectionObserver" in window)) {
    // Fallback: make all visible if browser doesn't support IntersectionObserver
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

// Contact Form Frontend Validation & Service Prefill
function initContactForm() {
  const form = document.getElementById("contact-form");
  const notice = document.getElementById("contact-notice");
  if (!form) return;

  // Buttons that prefill the contact form service select
  const quoteButtons = document.querySelectorAll("[data-prefill-service]");
  quoteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const serviceVal = btn.getAttribute("data-prefill-service");
      const serviceSelect = document.getElementById("service");
      if (serviceSelect && serviceVal) {
        serviceSelect.value = serviceVal;
      }
      const contactSection = document.getElementById("contacto");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Notice per specification 29:
    // "Este formulario está preparado para conectar con el sistema de contacto.
    // Do not show 'Mensaje enviado correctamente' unless a real backend exists."
    if (notice) {
      notice.textContent = "Este formulario está preparado para conectar con el sistema de contacto de Instalaciones AXA.";
      notice.className = "contact-notice info is-visible";
      notice.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileNavigation();
  initServiceSelector();
  initServiceCardLinks();
  initGalleryFilters();
  initScrollReveal();
  initContactForm();
});
