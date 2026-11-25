(function () {
  var d = document;
  // scroll reveal
  var els = [].slice.call(d.querySelectorAll('.rv'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  // section highlight in the header nav
  var links = [].slice.call(d.querySelectorAll('.nav a'));
  if (links.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) { var s = d.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });
  }

  // sample form: nothing is sent anywhere
  var f = d.getElementById('inquiry'), st = d.getElementById('form-status');
  if (f) f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var req = [].slice.call(f.querySelectorAll('[required]'));
    var bad = req.filter(function (i) { return !i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value)); });
    req.forEach(function (i) { i.removeAttribute('aria-invalid'); });
    if (bad.length) {
      bad.forEach(function (i) { i.setAttribute('aria-invalid', 'true'); });
      st.className = 'status err'; st.textContent = 'Please fill in all three fields with a valid email.'; bad[0].focus(); return;
    }
    st.className = 'status ok';
    st.textContent = 'This is a sample form — nothing was sent. On a real site, a partner would reply within one business day.';
  });
})();
