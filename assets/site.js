(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var form = document.getElementById('enquiry-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var TO = form.getAttribute('data-to');

  // Prefill the "type of work" from ?service= (plain #hash fallback too)
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.website && form.website.value) return; // honeypot
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var d = new FormData(form);
    var services = d.getAll('service').join(', ') || 'Not specified';
    var lines = [
      'Name: ' + d.get('name'),
      'Company: ' + (d.get('company') || '-'),
      'Email: ' + d.get('email'),
      'Phone: ' + d.get('phone'),
      'Project location: ' + (d.get('location') || '-'),
      'Work required: ' + services,
      'Target start: ' + (d.get('start') || '-'),
      '',
      'Project details:',
      d.get('details') || '-'
    ];
    var href = 'mailto:' + TO + '?subject=' + encodeURIComponent('Website enquiry - ' + d.get('name') + (d.get('company') ? ' (' + d.get('company') + ')' : '')) + '&body=' + encodeURIComponent(lines.join('\n'));
    status.innerHTML = 'Thanks. Your email app should open with the enquiry ready to send. If it does not, please call <a href="tel:07561851853">07561 851853</a> or email <a href="mailto:' + TO + '">' + TO + '</a>.';
    status.classList.add('show');
    try { window.location.href = href; } catch (err) {}
  });
})();
