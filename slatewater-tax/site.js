(function () {
  var d = document, root = d.documentElement;
  root.classList.add('js');
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Status board: cycles through the four steps.
  var rows = [].slice.call(d.querySelectorAll('.board-steps li'));
  var n = d.getElementById('board-n'), fill = d.getElementById('board-fill');
  function setStep(s) {
    rows.forEach(function (li, i) {
      var k = i + 1;
      li.className = k < s ? 'done' : k === s ? 'now' : '';
      li.querySelector('.st-tag').textContent = k < s ? 'Done' : k === s ? 'Now' : 'Next';
    });
    if (n) n.textContent = s;
    if (fill) fill.style.width = (s * 25) + '%';
  }
  var cur = 2; setStep(cur);
  if (!calm && rows.length) setInterval(function () { cur = cur === 4 ? 1 : cur + 1; setStep(cur); }, 2800);

  // Who we help: tabs.
  var tabs = [].slice.call(d.querySelectorAll('.who-tabs [role=tab]'));
  function pick(t) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', on ? 'true' : 'false');
      x.tabIndex = on ? 0 : -1;
      d.getElementById(x.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { pick(t); });
    t.addEventListener('keydown', function (e) {
      var j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : -9;
      if (j === -9) return;
      var nx = tabs[(j + tabs.length) % tabs.length]; pick(nx); nx.focus();
    });
  });
  if (tabs.length) pick(tabs[0]);

  // Checklist counter (nothing is stored or sent).
  var boxes = [].slice.call(d.querySelectorAll('#checklist input'));
  var cn = d.getElementById('chk-n'), cf = d.getElementById('chk-fill');
  function count() {
    var c = boxes.filter(function (b) { return b.checked; }).length;
    cn.textContent = c; cf.style.width = (c / boxes.length * 100) + '%';
  }
  boxes.forEach(function (b) { b.addEventListener('change', count); });

  // Contact form: sample only.
  var form = d.getElementById('contact-form'), done = d.getElementById('form-done');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    done.hidden = false;
    done.scrollIntoView({ block: 'nearest', behavior: calm ? 'auto' : 'smooth' });
  });

  // Reveal on scroll.
  var items = [].slice.call(d.querySelectorAll('.reveal'));
  if (calm || !('IntersectionObserver' in window)) { items.forEach(function (el) { el.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
})();
