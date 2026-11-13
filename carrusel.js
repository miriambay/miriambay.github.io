// Carrusel de certificados (sección #certificados del index.html)
(function () {
  const pista = document.getElementById('pista');
  if (!pista) return;

  const slides = pista.children;
  const puntos = document.getElementById('puntos');
  const contador = document.getElementById('contador');
  let actual = 0;

  // Un puntito por cada certificado
  for (let i = 0; i < slides.length; i++) {
    const p = document.createElement('button');
    p.setAttribute('aria-label', 'Ir al certificado ' + (i + 1));
    p.onclick = () => ir(i);
    puntos.appendChild(p);
  }

  function ir(n) {
    actual = (n + slides.length) % slides.length;
    pista.style.transform = 'translateX(-' + actual * 100 + '%)';
    [...puntos.children].forEach((p, i) => p.classList.toggle('activo', i === actual));
    contador.textContent = (actual + 1) + ' de ' + slides.length;
  }

  document.querySelector('#certificados .ant').onclick = () => ir(actual - 1);
  document.querySelector('#certificados .sig').onclick = () => ir(actual + 1);

  // Flechas del teclado: solo cuando la pestaña de certificados está abierta
  document.addEventListener('keydown', e => {
    if (location.hash !== '#certificados') return;
    if (e.key === 'ArrowLeft') ir(actual - 1);
    if (e.key === 'ArrowRight') ir(actual + 1);
  });

  // Deslizar con el dedo en el celular
  let x0 = null;
  pista.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; });
  pista.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) ir(actual + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  ir(0);
})();
