/**
 * ==========================================================================
 * INSTALACIONES AXA — Vanilla JavaScript Corporate Module
 * Native ES2022+ APIs only. Zero external dependencies.
 * ==========================================================================
 */

// 1. Sticky Header Behaviour
function initStickyHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 15);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

// 2. Mobile Navigation Drawer
function initMobileNavigation() {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const drawer = document.getElementById("mobile-drawer");
  if (!toggleBtn || !drawer) return;

  const closeMenu = () => {
    drawer.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  drawer.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeMenu();
    }
  });
}

// 3. Navigation Active State on Scroll
function initActiveNav() {
  const sections = document.querySelectorAll("main > section[id]");
  const navLinks = document.querySelectorAll(".nav-main a[href^='#']");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            link.classList.toggle("active", href === `#${id}`);
          });
        }
      });
    },
    {
      rootMargin: "-20% 0px -70% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// 4. Quick Service Select Preselection
function initServicePreselection() {
  document.querySelectorAll("[data-set-service]").forEach((el) => {
    el.addEventListener("click", () => {
      const serviceVal = el.getAttribute("data-set-service");
      const selectEl = document.getElementById("contact-service");
      if (selectEl && serviceVal) {
        selectEl.value = serviceVal;
      }
    });
  });
}

// 5. Scroll Reveal Animation using IntersectionObserver
function initScrollReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal-item").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal-item").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const revealElements = document.querySelectorAll(".reveal-item");
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

  revealElements.forEach((el) => observer.observe(el));
}

// 6. Corporate Contact Form Submission & Validation
function initContactForm() {
  const form = document.getElementById("corp-contact-form");
  const feedback = document.getElementById("form-feedback");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = (document.getElementById("contact-name")?.value || "Estimado cliente").trim();
    const serviceSelect = document.getElementById("contact-service");
    const serviceName = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : "el servicio solicitado";

    if (feedback) {
      feedback.innerHTML = `
        <strong>Solicitud registrada correctamente.</strong><br>
        Gracias, <strong>${name}</strong>. Su consulta relativa a <em>"${serviceName}"</em> ha sido transmitida a los técnicos de <strong>Instalaciones AXA</strong> en Tarragona. Revisaremos su proyecto para ponernos en contacto con usted a la mayor brevedad.
      `;
      feedback.classList.add("is-visible");
      feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
      form.reset();
    }
  });
}

// 7. Accessible Legal Modal Dialog
function initLegalDialog() {
  const dialog = document.getElementById("legal-dialog");
  const closeBtn = document.getElementById("close-legal-dialog");
  const dialogTitle = document.getElementById("legal-dialog-title");
  const dialogContent = document.getElementById("legal-dialog-content");

  if (!dialog || !closeBtn || !dialogTitle || !dialogContent) return;

  const legalTexts = {
    "aviso-legal": {
      title: "Aviso Legal",
      content: `
        <p><strong>Identificación del Titular:</strong> Instalaciones AXA, con sede de operaciones en Rambla Nova 124, 43001 Tarragona, España.</p>
        <p style="margin-top: 1rem;"><strong>Objeto:</strong> El presente sitio web tiene carácter informativo y comercial, orientado a la presentación de servicios técnicos de climatización, refrigeración, mantenimiento e instalaciones.</p>
        <p style="margin-top: 1rem;"><strong>Propiedad Intelectual:</strong> Los textos, logotipos oficiales, fotografías técnicas y diseños son propiedad de Instalaciones AXA o disponen de las correspondientes licencias de uso. Queda prohibida su reproducción sin consentimiento expreso.</p>
      `,
    },
    "privacidad": {
      title: "Política de Privacidad",
      content: `
        <p><strong>Responsable del Tratamiento:</strong> Instalaciones AXA (Tarragona).</p>
        <p style="margin-top: 1rem;"><strong>Finalidad:</strong> Los datos de contacto facilitados voluntariamente a través del formulario (nombre, empresa, teléfono, email y detalles del servicio) se utilizarán exclusivamente para responder a su consulta y elaborar el presupuesto solicitado.</p>
        <p style="margin-top: 1rem;"><strong>Legitimación:</strong> Consentimiento inequívoco del usuario al enviar el formulario.</p>
        <p style="margin-top: 1rem;"><strong>Conservación:</strong> Los datos se conservarán durante el tiempo necesario para la gestión del servicio o la relación técnica-comercial.</p>
      `,
    },
    "cookies": {
      title: "Política de Cookies",
      content: `
        <p><strong>Uso de Cookies:</strong> Este sitio web utiliza únicamente cookies técnicas estrictamente necesarias para el correcto funcionamiento de la navegación y la seguridad de la sesión.</p>
        <p style="margin-top: 1rem;">No se emplean cookies de rastreo publicitario invasivas de terceros sin su consentimiento explícito.</p>
      `,
    },
  };

  document.querySelectorAll(".legal-modal-trigger").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const modalKey = trigger.getAttribute("data-modal");
      if (legalTexts[modalKey]) {
        dialogTitle.textContent = legalTexts[modalKey].title;
        dialogContent.innerHTML = legalTexts[modalKey].content;
        dialog.showModal();
      }
    });
  });

  closeBtn.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (e) => {
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      dialog.close();
    }
  });
}

// DOM Initialization
document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileNavigation();
  initActiveNav();
  initServicePreselection();
  initScrollReveal();
  initContactForm();
  initLegalDialog();
});
