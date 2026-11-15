/* UBO Training Site — lightbox, scrollspy, mobile menu, back-to-top */
(function () {
  'use strict';

  /* ------------------------------------------------------------ lightbox */
  var figs = Array.prototype.slice.call(document.querySelectorAll('figure.fig img'));
  var lb = document.getElementById('lightbox');
  if (lb && figs.length) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lb-cap');
    var lbCount = lb.querySelector('.lb-count');
    var idx = 0;

    function show(i) {
      idx = (i + figs.length) % figs.length;
      var img = figs[idx];
      lbImg.src = img.src;
      var fig = img.closest('figure');
      var cap = fig ? fig.querySelector('figcaption') : null;
      lbCap.textContent = cap ? cap.textContent : '';
      lbCount.textContent = (idx + 1) + ' / ' + figs.length;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function hide() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }

    figs.forEach(function (img, i) {
      img.addEventListener('click', function () { show(i); });
    });

    lb.querySelector('.lb-close').addEventListener('click', hide);
    lb.querySelector('.lb-prev').addEventListener('click', function (e) {
      e.stopPropagation(); show(idx - 1);
    });
    lb.querySelector('.lb-next').addEventListener('click', function (e) {
      e.stopPropagation(); show(idx + 1);
    });
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target === lbCap) hide();
    });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') hide();
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* ----------------------------------------------------------- scrollspy */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.sidebar a[href^="#"]'));
  if (navLinks.length && 'IntersectionObserver' in window) {
    var targets = navLinks
      .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
      .filter(Boolean);

    var current = null;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) current = en.target.id;
      });
      if (current) {
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
      }
    }, { rootMargin: '-70px 0px -70% 0px', threshold: 0 });

    targets.forEach(function (t) { observer.observe(t); });
  }

  /* -------------------------------------------------------- mobile menu */
  var menuBtn = document.getElementById('menuBtn');
  var sidebar = document.getElementById('sidebar');
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
    sidebar.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.innerWidth <= 980) {
        sidebar.classList.remove('open');
      }
    });
  }

  /* -------------------------------------------------------- back to top */
  var topBtn = document.getElementById('toTop');
  if (topBtn) {
    window.addEventListener('scroll', function () {
      topBtn.classList.toggle('show', window.scrollY > 600);
    });
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
