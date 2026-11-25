// Sample form: nothing is sent anywhere. It only shows what a visitor would see.
(function () {
  var form = document.getElementById('note');
  if (!form) return;
  var sent = document.getElementById('f-sent');
  var err = document.getElementById('f-err');
  var flow = document.getElementById('flow');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = null;
    ['f-name', 'f-email', 'f-msg'].forEach(function (id) {
      var el = document.getElementById(id);
      var ok = el.value.trim() !== '' && el.checkValidity();
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok && !bad) bad = el;
    });
    if (bad) {
      err.hidden = false;
      sent.hidden = true;
      bad.focus();
      return;
    }
    err.hidden = true;
    sent.hidden = false;
    if (flow) flow.classList.add('done');
    form.reset();
    sent.focus();
  });
})();
