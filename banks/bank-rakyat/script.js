/* Bank Rakyat login page interactions — demo only */
document.addEventListener('click', (event) => {
  const details = event.target.closest('.tx-details');
  if (details) {
    const extra = details.nextElementSibling;
    if (extra && extra.classList.contains('transaction-extra')) {
      extra.classList.toggle('open');
      details.classList.toggle('open');
    }
  }
  const notes = event.target.closest('.notes');
  if (notes) {
    const id = notes.getAttribute('aria-controls');
    const content = id ? document.getElementById(id) : null;
    if (content) {
      const opening = content.hidden;
      content.hidden = !opening;
      notes.setAttribute('aria-expanded', String(opening));
      notes.classList.toggle('open', opening);
    }
  }
});

async function copyReference(button) {
  try { await navigator.clipboard.writeText('BP15Q53UC9WOEI3'); button.setAttribute('aria-label','Copied'); }
  catch (error) { /* Clipboard permission may be unavailable in local preview. */ }
}
document.querySelectorAll('.tx-meta button').forEach(button => button.addEventListener('click', () => copyReference(button)));

// Demo prototype only: credentials are not transmitted or stored.
document.querySelectorAll('.login-form').forEach(form => form.addEventListener('submit', event => {
  event.preventDefault();
  alert('Demo prototype only. No login credentials were sent or saved.');
}));
