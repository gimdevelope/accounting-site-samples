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
