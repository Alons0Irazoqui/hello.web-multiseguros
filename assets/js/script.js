/* ==========================================================================
   MULTISEGUROS — Landing Page interactions
   ========================================================================== */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------- Footer year -------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------- Loading screen -------------------- */
  (function loadingScreen() {
    var MIN_DISPLAY = 900;
    var start = Date.now();
    function reveal() {
      var elapsed = Date.now() - start;
      var wait = Math.max(MIN_DISPLAY - elapsed, 0);
      setTimeout(function () {
        document.body.classList.add('is-loaded');
      }, prefersReducedMotion ? 0 : wait);
    }
    if (document.readyState === 'complete') {
      reveal();
    } else {
      window.addEventListener('load', reveal);
      setTimeout(reveal, 4000); // safety net in case 'load' never fires
    }
  })();

  /* -------------------- Header scroll state -------------------- */
  var header = document.getElementById('siteHeader');
  function onScrollHeader() {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* -------------------- Mobile menu -------------------- */
  var menuToggle = document.getElementById('menuToggle');
  var mainNav = document.getElementById('mainNav');
  function closeMenu() {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    var isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  }
  menuToggle.addEventListener('click', toggleMenu);
  document.querySelectorAll('[data-nav]').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* -------------------- Hide floating WhatsApp where it would cover contact actions -------------------- */
  (function floatingWhatsAppVisibility() {
    var floatBtn = document.querySelector('.whatsapp-float');
    var contact = document.getElementById('hablemos');
    var footer = document.querySelector('.site-footer');
    var targets = [contact, footer].filter(Boolean);
    if (!floatBtn || !targets.length || !('IntersectionObserver' in window)) return;

    var visibleTargets = new WeakMap();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visibleTargets.set(entry.target, entry.isIntersecting);
      });
      var shouldHide = targets.some(function (target) { return visibleTargets.get(target); });
      document.body.classList.toggle('hide-whatsapp-float', shouldHide);
    }, { threshold: 0.08 });

    targets.forEach(function (target) {
      visibleTargets.set(target, false);
      observer.observe(target);
    });
  })();

  /* -------------------- Active nav link on scroll -------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link[href^="#"]'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = '#' + entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* -------------------- Scroll reveal animations -------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* -------------------- Stats banner count-up -------------------- */
  (function statsCounter() {
    var el = document.getElementById('statsCount');
    if (!el) return;
    var target = parseInt(el.dataset.countTo, 10) || 0;

    function animateCount() {
      if (prefersReducedMotion) { el.textContent = target; return; }
      var start = null;
      var duration = 1600;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      var statsObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount();
            obs.disconnect();
          }
        });
      }, { threshold: 0.5 });
      statsObserver.observe(el);
    } else {
      animateCount();
    }
  })();

  /* -------------------- Hero highlighted word -------------------- */
  (function staticHeroWord() {
    var el = document.getElementById('cycleWord');
    if (el) el.textContent = 'tranquilidad';
  })();

  /* -------------------- Aprende: filters + search + load more -------------------- */
  (function learnSection() {
    var grid = document.getElementById('learnGrid');
    if (!grid) return;
    var filterBtns = document.querySelectorAll('.filter-btn');
    var searchInput = document.getElementById('learnSearch');
    var loadMoreBtn = document.getElementById('loadMoreBtn');
    var emptyMsg = document.getElementById('learnEmpty');
    var currentFilter = 'todo';

    function applyFilters() {
      var query = (searchInput.value || '').trim().toLowerCase();
      var visibleCount = 0;
      grid.querySelectorAll('.content-card').forEach(function (card) {
        if (card.hasAttribute('data-extra') && !card.dataset.revealed) {
          card.classList.add('is-hidden-filter');
          return;
        }
        var matchesFilter = currentFilter === 'todo' || card.dataset.category === currentFilter;
        var text = card.textContent.toLowerCase();
        var matchesSearch = query === '' || text.indexOf(query) !== -1;
        var show = matchesFilter && matchesSearch;
        card.classList.toggle('is-hidden-filter', !show);
        if (show) visibleCount++;
      });
      emptyMsg.hidden = visibleCount !== 0;
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        currentFilter = btn.dataset.filter;
        applyFilters();
      });
    });

    searchInput.addEventListener('input', applyFilters);

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function () {
        grid.querySelectorAll('[data-extra]').forEach(function (card) {
          card.hidden = false;
          card.dataset.revealed = 'true';
          card.classList.add('reveal');
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { card.classList.add('in-view'); });
          });
        });
        loadMoreBtn.setAttribute('disabled', 'true');
        loadMoreBtn.textContent = 'Has visto todo el contenido disponible';
        applyFilters();
      });
    }
  })();

  /* -------------------- Protect cards -> jump to contact + preselect topic -------------------- */
  var temaSelect = document.getElementById('tema');
  document.querySelectorAll('.protect-card[data-topic]').forEach(function (card) {
    card.addEventListener('click', function () {
      var topic = card.dataset.topic;
      if (temaSelect && topic) {
        temaSelect.value = topic;
      }
      var target = document.getElementById('hablemos');
      if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      setTimeout(function () {
        var nombre = document.getElementById('nombre');
        if (nombre) nombre.focus({ preventScroll: true });
      }, 500);
    });
  });

  /* -------------------- Contact form -------------------- */
  (function contactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var successBox = document.getElementById('formSuccess');
    var WHATSAPP_NUMBER = '524421897275';

    var TOPIC_LABELS = {
      'vida': 'Protección familiar / Seguro de Vida',
      'gastos-medicos': 'Salud / Gastos Médicos Mayores',
      'educacion': 'Plan de Ahorro para la Educación',
      'retiro': 'Plan Personal de Retiro (PPR)',
      'auto': 'Auto',
      'ahorro-inversion': 'Ahorro e Inversión',
      'otro': 'Otro / No estoy seguro'
    };

    function getPhoneDigits(value) {
      return value.replace(/\D/g, '');
    }

    function isValidPhone(value) {
      var digits = getPhoneDigits(value);
      return digits.length >= 10 && digits.length <= 13;
    }

    if (form.telefono) {
      form.telefono.addEventListener('input', function () {
        form.telefono.value = form.telefono.value.replace(/[^\d+\s().-]/g, '');
        form.telefono.setCustomValidity('');
        form.telefono.classList.remove('field-error');
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nombre = form.nombre.value.trim();
      var telefono = form.telefono.value.trim();
      var email = form.email ? form.email.value.trim() : '';
      var tema = form.tema.value;
      var mensaje = form.mensaje.value.trim();
      var privacidad = form.privacidad.checked;

      var valid = true;
      [['nombre', nombre], ['telefono', telefono], ['tema', tema], ['mensaje', mensaje]].forEach(function (pair) {
        var field = form.elements[pair[0]];
        if (!pair[1]) { field.classList.add('field-error'); valid = false; }
        else { field.classList.remove('field-error'); }
      });

      if (!isValidPhone(telefono)) {
        form.telefono.setCustomValidity('Ingresa un número telefónico válido.');
        form.telefono.classList.add('field-error');
        valid = false;
      } else {
        form.telefono.setCustomValidity('');
        form.telefono.classList.remove('field-error');
      }

      if (form.email && email && !form.email.checkValidity()) {
        form.email.classList.add('field-error');
        valid = false;
      } else if (form.email) {
        form.email.classList.remove('field-error');
      }

      if (!privacidad) {
        form.privacidad.classList.add('field-error');
        valid = false;
      } else {
        form.privacidad.classList.remove('field-error');
      }

      if (!valid) {
        form.reportValidity();
        return;
      }

      var topicLabel = TOPIC_LABELS[tema] || tema;

      var whatsappText = 'Hola, soy ' + nombre + '. Me gustaría recibir orientación sobre: ' + topicLabel + '.\n\n' +
        'Mensaje: ' + mensaje + '\n' +
        'Teléfono de contacto: ' + telefono +
        (email ? '\nCorreo electrónico: ' + email : '');
      var whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(whatsappText);

      successBox.hidden = false;
      successBox.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });

      window.open(whatsappUrl, '_blank', 'noopener');
    });

    ['nombre', 'telefono', 'email', 'tema', 'mensaje', 'privacidad'].forEach(function (name) {
      if (!form.elements[name]) return;
      form.elements[name].addEventListener('input', function () {
        form.elements[name].classList.remove('field-error');
        if (name === 'telefono') form.elements[name].setCustomValidity('');
      });
    });
  })();
})();
