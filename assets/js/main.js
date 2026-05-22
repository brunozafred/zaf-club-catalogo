/* ZAF CLUB — Catálogo */
document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.coupon').forEach(el => {
    el.addEventListener('click', () => {
      const code = el.dataset.code;
      if (!code) return;
      navigator.clipboard.writeText(code).then(() => {
        const prev = el.innerHTML;
        el.innerHTML = '✅ Copiado!';
        el.style.color = '#16a34a';
        el.style.borderColor = '#16a34a';
        setTimeout(() => {
          el.innerHTML = prev;
          el.style.color = '';
          el.style.borderColor = '';
        }, 2000);
      });
    });
  });

});
