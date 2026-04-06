(function () {
  const checkboxes = Array.from(document.querySelectorAll('.check-group input[type="checkbox"]'));
  const selectionList = document.getElementById('menu-selection');
  const priceRange = document.getElementById('price-range');

  function updateBuilder() {
    if (!selectionList || !priceRange) return;

    const selected = checkboxes.filter((item) => item.checked);
    const total = selected.reduce((sum, item) => sum + Number(item.dataset.price || 0), 0);

    if (!selected.length) {
      selectionList.innerHTML = '<li>Selecione itens para visualizar.</li>';
      priceRange.textContent = 'R$ 0 a R$ 0';
      return;
    }

    selectionList.innerHTML = selected.map((item) => `<li>${item.parentElement.textContent.trim()}</li>`).join('');
    const min = Math.max(0, Math.round(total * 0.9));
    const max = Math.round(total * 1.2);
    priceRange.textContent = `R$ ${min} a R$ ${max}`;
  }

  checkboxes.forEach((item) => item.addEventListener('change', updateBuilder));
  updateBuilder();

  const leadForm = document.getElementById('lead-form');
  const leadProgress = document.getElementById('lead-progress');
  const leadStepText = document.getElementById('lead-step-text');
  const confirmation = document.getElementById('lead-confirmation');

  function updateLeadProgress() {
    if (!leadForm || !leadProgress || !leadStepText) return;
    const inputs = Array.from(leadForm.querySelectorAll('input, select, textarea'));
    const required = inputs.filter((field) => field.hasAttribute('required'));
    const done = required.filter((field) => String(field.value).trim().length > 0).length;
    const percent = Math.round((done / required.length) * 100) || 20;

    leadProgress.style.background = `linear-gradient(90deg, var(--gold) ${percent}%, #e2e2e2 ${percent}%)`;

    const missing = Math.max(required.length - done, 0);
    leadStepText.textContent = missing <= 1 ? 'Falta só 1 passo' : `Faltam ${missing} passos`;
  }

  if (leadForm) {
    leadForm.addEventListener('input', updateLeadProgress);
    updateLeadProgress();

    leadForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(leadForm);
      const msg = `Olá! Quero orçamento.%0AEvento: ${data.get('tipo')}%0AConvidados: ${data.get('convidados')}%0AData: ${data.get('data')}%0APreferências: ${data.get('preferencias')}%0AContato: ${data.get('contato')}`;
      if (confirmation) confirmation.classList.remove('hidden');
      window.open(`https://wa.me/554134222897?text=${msg}`, '_blank', 'noopener');
    });
  }
})();
