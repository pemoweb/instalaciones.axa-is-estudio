/**
 * INSTALACIONES AXA — NUEVA WEB CORPORATIVA
 * Modular Vanilla JavaScript Implementation (ES2022+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile Drawer Navigation
  const mobileToggle = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const closeDrawerBtn = document.querySelector('.drawer-close-btn');

  if (mobileToggle && mobileDrawer) {
    const openMenu = () => {
      mobileDrawer.classList.add('is-open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      mobileDrawer.classList.remove('is-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', openMenu);
    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', closeMenu);
    }

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  // 3. Synchronize Active Navbar Links across Desktop and Mobile
  const initActiveNavbarLinks = () => {
    let currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
    if (!currentPath.endsWith('/')) {
      currentPath += '/';
    }

    const navLinks = document.querySelectorAll('.main-nav .nav-link, .mobile-drawer .mobile-nav-link, .mobile-drawer .mobile-nav-sublink');
    
    // First, check if there is an exact link match
    let exactMatchFound = false;
    navLinks.forEach(link => {
      try {
        const rawHref = link.getAttribute('href');
        if (!rawHref || rawHref.startsWith('#')) return;

        const linkUrl = new URL(rawHref, window.location.href);
        let linkPath = linkUrl.pathname.replace(/\/index\.html$/, '/');
        if (!linkPath.endsWith('/')) {
          linkPath += '/';
        }

        if (currentPath === linkPath) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
          exactMatchFound = true;
        }
      } catch (err) {
        // Ignore parsing errors
      }
    });

    // If on a sub-service page (e.g. electricidad, fontaneria, mantenimiento) where no specific link exists in desktop main-nav
    if (currentPath.includes('/servicios/')) {
      navLinks.forEach(link => {
        const text = link.textContent.trim().toLowerCase();
        if (text === 'servicios') {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
      });
    }
  };
  initActiveNavbarLinks();

  // 4. Dynamic Current Year
  const yearEl = document.querySelector('.current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 4. Contact Form Client-Side Validation and Submission Handling
  const quoteForm = document.querySelector('#quote-form');
  const formSuccessBox = document.querySelector('#form-success-box');

  if (quoteForm) {
    const nameInput = quoteForm.querySelector('[name="nombre"], #campo-nombre');
    const phoneInput = quoteForm.querySelector('[name="telefono"], #campo-telefono');
    const emailInput = quoteForm.querySelector('[name="email"], #campo-email');
    const serviceSelect = quoteForm.querySelector('[name="servicio"], #campo-servicio');
    const messageInput = quoteForm.querySelector('[name="mensaje"], #campo-mensaje');

    // Standard email validation pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Helper to display error message on a field
    const showFieldError = (field, message) => {
      if (!field) return;
      field.classList.add('is-invalid');
      field.setAttribute('aria-invalid', 'true');
      const parent = field.closest('.form-group');
      if (parent) {
        let errorEl = parent.querySelector('.field-error-msg');
        if (!errorEl) {
          errorEl = document.createElement('span');
          errorEl.className = 'field-error-msg';
          errorEl.setAttribute('role', 'alert');
          field.insertAdjacentElement('afterend', errorEl);
        }
        errorEl.textContent = message;
      }
    };

    // Helper to clear error state on a field
    const clearFieldError = (field) => {
      if (!field) return;
      field.classList.remove('is-invalid');
      field.removeAttribute('aria-invalid');
      const parent = field.closest('.form-group');
      if (parent) {
        const errorEl = parent.querySelector('.field-error-msg');
        if (errorEl) {
          errorEl.remove();
        }
      }
    };

    // Attach real-time input listeners to clear error once user starts correcting
    const fieldsToValidate = [nameInput, phoneInput, emailInput, serviceSelect, messageInput].filter(Boolean);
    fieldsToValidate.forEach((field) => {
      const eventType = field.tagName.toLowerCase() === 'select' ? 'change' : 'input';
      field.addEventListener(eventType, () => {
        clearFieldError(field);
      });
    });

    // Form submit listener with validation
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const serviceVal = serviceSelect ? serviceSelect.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      let hasEmptyFields = false;
      let firstInvalidField = null;

      // Validate required fields: nombre, telefono, email, servicio, mensaje
      if (!nameVal) {
        showFieldError(nameInput, 'El campo nombre es obligatorio.');
        hasEmptyFields = true;
        if (!firstInvalidField) firstInvalidField = nameInput;
      } else {
        clearFieldError(nameInput);
      }

      if (!phoneVal) {
        showFieldError(phoneInput, 'El campo teléfono es obligatorio.');
        hasEmptyFields = true;
        if (!firstInvalidField) firstInvalidField = phoneInput;
      } else {
        clearFieldError(phoneInput);
      }

      if (!emailVal) {
        showFieldError(emailInput, 'El campo correo electrónico es obligatorio.');
        hasEmptyFields = true;
        if (!firstInvalidField) firstInvalidField = emailInput;
      } else {
        clearFieldError(emailInput);
      }

      if (!serviceVal) {
        showFieldError(serviceSelect, 'Debe seleccionar un servicio.');
        hasEmptyFields = true;
        if (!firstInvalidField) firstInvalidField = serviceSelect;
      } else {
        clearFieldError(serviceSelect);
      }

      if (!messageVal) {
        showFieldError(messageInput, 'El campo mensaje es obligatorio.');
        hasEmptyFields = true;
        if (!firstInvalidField) firstInvalidField = messageInput;
      } else {
        clearFieldError(messageInput);
      }

      // Check for empty required fields
      if (hasEmptyFields) {
        alert('Por favor, complete todos los campos obligatorios: nombre, teléfono, email, servicio y mensaje.');
        if (firstInvalidField) firstInvalidField.focus();
        return;
      }

      // Check email format
      if (!emailRegex.test(emailVal)) {
        showFieldError(emailInput, 'El formato del correo electrónico no es válido.');
        alert('Por favor, introduzca un correo electrónico con un formato válido (ej. usuario@dominio.com).');
        if (emailInput) emailInput.focus();
        return;
      }

      // On successful validation: show #form-success-box and hide the form
      quoteForm.style.display = 'none';
      if (formSuccessBox) {
        formSuccessBox.style.display = 'block';
        formSuccessBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // 5. Interactive Filter for Projects / Services Hub
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('[data-category]');

  if (filterBtns.length > 0 && filterItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCategory = btn.getAttribute('data-filter');

        filterItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (selectedCategory === 'all' || itemCat === selectedCategory) {
            item.style.display = '';
            item.style.opacity = '1';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. Subtle Intersection Observer Reveal Animation for Feature Cards
  const featureCards = document.querySelectorAll('.process-step, .reveal-card');
  if (featureCards.length > 0) {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      featureCards.forEach(card => card.classList.add('is-revealed'));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const card = entry.target;
            const parent = card.parentElement;
            let index = 0;
            if (parent) {
              const siblings = Array.from(parent.children);
              index = siblings.indexOf(card);
            }
            card.style.transitionDelay = `${(index % 4) * 90}ms`;
            card.classList.add('is-revealed');
            observer.unobserve(card);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      featureCards.forEach(card => observer.observe(card));
    }
  }
});
