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

  // 3. Dynamic Current Year
  const yearEl = document.querySelector('.current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 4. Contact Form Validation and Submission handling
  const quoteForm = document.querySelector('#quote-form');
  const formSuccessBox = document.querySelector('#form-success-box');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Enviar';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Enviando solicitud...';
      }

      // Simulate client response
      setTimeout(() => {
        if (formSuccessBox) {
          quoteForm.style.display = 'none';
          formSuccessBox.style.display = 'block';
          formSuccessBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          alert('¡Gracias! Hemos recibido su solicitud técnica. Le contactaremos a la brevedad.');
          quoteForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
        }
      }, 700);
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
});
