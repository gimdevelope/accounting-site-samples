(function () {
  var form = document.getElementById('inquiry');
  var status = document.getElementById('form-status');
  if (!form || !status) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fields = form.querySelectorAll('input, textarea');
    var firstBad = null;
    for (var i = 0; i < fields.length; i++) {
      var ok = fields[i].checkValidity();
      fields[i].setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok && !firstBad) firstBad = fields[i];
    }
    if (firstBad) {
      status.className = 'form-status warn';
      status.textContent = 'Please fill in all three fields with a valid email.';
      firstBad.focus();
      return;
    }
    status.className = 'form-status ok';
    status.textContent = 'This is a sample form — nothing was sent.';
    form.reset();
  });
})();

(function () {
  var root = document.documentElement;
  var items = document.querySelectorAll('[data-reveal]');
  if (!items.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  root.classList.add('js');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (el) { io.observe(el); });
  /* safety: never leave content hidden (full-page captures, print, slow observers) */
  setTimeout(function () {
    root.classList.add('reveal-done');
    items.forEach(function (el) { el.classList.add('in'); });
  }, 3500);
})();
