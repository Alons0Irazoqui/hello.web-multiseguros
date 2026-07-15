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

  /* -------------------- Hero typewriter cycling word -------------------- */
  (function typewriter() {
    var el = document.getElementById('cycleWord');
    if (!el) return;
    var words = ['tranquilidad', 'confianza', 'protección', 'bienestar'];

    if (prefersReducedMotion) return; // keep static first word

    var wordIndex = 0;
    var charIndex = words[0].length;
    var typingSpeed = 90;
    var deletingSpeed = 45;
    var pauseAfterWord = 1800;
    var pauseAfterDelete = 400;

    function tick() {
      var current = words[wordIndex];
      var deleting = tick.deleting;

      if (!deleting && charIndex <= current.length) {
        el.textContent = current.slice(0, charIndex);
        charIndex++;
        if (charIndex > current.length) {
          tick.deleting = true;
          setTimeout(tick, pauseAfterWord);
          return;
        }
        setTimeout(tick, typingSpeed);
      } else {
        el.textContent = current.slice(0, charIndex);
        charIndex--;
        if (charIndex < 0) {
          tick.deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          charIndex = 0;
          setTimeout(tick, pauseAfterDelete);
          return;
        }
        setTimeout(tick, deletingSpeed);
      }
    }
    tick.deleting = false;
    setTimeout(tick, pauseAfterWord);
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
    var CONTACT_EMAIL = 'mseguros911@gmail.com';

    var TOPIC_LABELS = {
      'vida': 'Seguro de Vida',
      'gastos-medicos': 'Gastos Médicos Mayores',
      'educacion': 'Plan de Ahorro para la Educación',
      'retiro': 'Plan Personal de Retiro (PPR)',
      'auto': 'Auto',
      'ahorro-inversion': 'Ahorro e Inversión',
      'otro': 'Otro / No estoy seguro'
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nombre = form.nombre.value.trim();
      var telefono = form.telefono.value.trim();
      var tema = form.tema.value;
      var mensaje = form.mensaje.value.trim();
      var privacidad = form.privacidad.checked;

      var valid = true;
      [['nombre', nombre], ['telefono', telefono], ['tema', tema], ['mensaje', mensaje]].forEach(function (pair) {
        var field = form.elements[pair[0]];
        if (!pair[1]) { field.classList.add('field-error'); valid = false; }
        else { field.classList.remove('field-error'); }
      });
      if (!privacidad) valid = false;

      if (!valid) {
        form.reportValidity();
        return;
      }

      var topicLabel = TOPIC_LABELS[tema] || tema;

      var whatsappText = 'Hola, soy ' + nombre + '. Me gustaría recibir orientación sobre: ' + topicLabel + '.\n\n' +
        'Mensaje: ' + mensaje + '\n' +
        'Teléfono de contacto: ' + telefono;
      var whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(whatsappText);

      var mailSubject = 'Nuevo contacto desde la landing — ' + topicLabel;
      var mailBody = 'Nombre completo: ' + nombre + '\n' +
        'WhatsApp / Teléfono: ' + telefono + '\n' +
        'Tema de interés: ' + topicLabel + '\n\n' +
        'Mensaje:\n' + mensaje;
      var mailtoUrl = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(mailSubject) + '&body=' + encodeURIComponent(mailBody);

      successBox.hidden = false;
      successBox.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });

      window.open(whatsappUrl, '_blank', 'noopener');
      window.location.href = mailtoUrl;

      form.reset();
    });

    ['nombre', 'telefono', 'tema', 'mensaje'].forEach(function (name) {
      form.elements[name].addEventListener('input', function () {
        form.elements[name].classList.remove('field-error');
      });
    });
  })();

  /* -------------------- Privacy notice placeholder -------------------- */
  var privacyLink = document.getElementById('privacyLink');
  if (privacyLink) {
    privacyLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.alert('Aviso de Privacidad de MULTISEGUROS:\n\nTus datos serán utilizados únicamente para brindarte orientación y contacto sobre asesoría financiera y de seguros. No compartimos tu información con terceros sin tu consentimiento.');
    });
  }

  /* -------------------- Social buttons pending real URLs -------------------- */
  document.querySelectorAll('[data-social]').forEach(function (btn) {
    if (btn.getAttribute('href') === '#') {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.alert('Pendiente: agrega aquí el enlace real de la página de Facebook "M Seguros".');
      });
    }
  });
})();
