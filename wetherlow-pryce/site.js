// Wetherlow & Pryce sample site: reveal on scroll, tab highlight, sample form. No network requests.
(function () {
  var d = document, root = d.documentElement;
  root.classList.add('js');

  // reveal
  var rv = [].slice.call(d.querySelectorAll('.rv'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  // sticky tab highlight
  var bar = d.getElementById('tabs');
  var links = [].slice.call(bar.querySelectorAll('a')).filter(function (a) { return !a.closest('.tabs-act'); });
  var secs = links.map(function (a) { return d.getElementById(a.getAttribute('href').slice(1)); });
  var cur = -1, tick = false;
  function spy() {
    tick = false;
    var line = window.innerHeight * 0.35, idx = -1;
    secs.forEach(function (s, i) { if (s.getBoundingClientRect().top <= line) idx = i; });
    if (idx === cur) return;
    cur = idx;
    links.forEach(function (a, i) {
      if (i === idx) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    if (idx >= 0 && bar.scrollWidth > bar.clientWidth) {
      var a = links[idx];
      bar.scrollLeft = Math.max(0, a.offsetLeft - (bar.clientWidth - a.offsetWidth) / 2);
    }
  }
  window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(spy); } }, { passive: true });
  spy();

  // sample form: nothing is sent anywhere
  var form = d.getElementById('inquiry'), status = d.getElementById('form-status');
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var bad = null;
    [].forEach.call(form.querySelectorAll('input,textarea'), function (f) {
      var ok = f.value.trim() !== '' && (f.type !== 'email' || /^\S+@\S+\.\S+$/.test(f.value.trim()));
      f.classList.toggle('bad', !ok);
      f.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok && !bad) bad = f;
    });
    if (bad) { status.textContent = 'Please fill in all three fields.'; bad.focus(); return; }
    status.innerHTML = '<b>This is a sample form — nothing was sent.</b>On a real site, your message would go to the front desk and you would see when to expect a reply.';
  });
})();
