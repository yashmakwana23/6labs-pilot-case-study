/* ──────────────────────────────────────────────────────────────
   recon.js — click a reconstruction to open it enlarged in a carousel.
   Works on .rs blocks; caption comes from the enclosing <figure>.
   ────────────────────────────────────────────────────────────── */
(function () {
  var shots = [].slice.call(document.querySelectorAll('.rs'));
  if (!shots.length) return;

  var i = 0;

  /* Enlarge as much as the window allows, leaving room for the caption.
     The natural size differs per page (225px in the report grids, 290px on
     the home page, 380px for the chat feed), so measure the source each time. */
  function scaleFor(w, h) {
    var availH = window.innerHeight - 52 - 150;   // overlay padding + caption block
    var availW = Math.min(window.innerWidth - 150, 900);
    return Math.max(1, Math.min(availH / h, availW / w, 2));
  }

  /* make each reconstruction operable */
  shots.forEach(function (el, n) {
    el.classList.add('rs-clickable');
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', 'Enlarge reconstruction ' + (n + 1) + ' of ' + shots.length);
    el.addEventListener('click', function () { open(n); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(n); }
    });
  });

  /* overlay */
  var lb = document.createElement('div');
  lb.className = 'rlb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.hidden = true;
  lb.innerHTML =
    '<button class="rlb-x" aria-label="Close">&times;</button>' +
    '<button class="rlb-prev" aria-label="Previous">&#8249;</button>' +
    '<button class="rlb-next" aria-label="Next">&#8250;</button>' +
    '<div class="rlb-inner">' +
      '<div class="rlb-stage"></div>' +
      '<div class="rlb-meta"><div class="rlb-count"></div><div class="rlb-cap"></div></div>' +
    '</div>';
  document.body.appendChild(lb);

  var stage = lb.querySelector('.rlb-stage'),
      capEl = lb.querySelector('.rlb-cap'),
      cntEl = lb.querySelector('.rlb-count'),
      prevB = lb.querySelector('.rlb-prev'),
      nextB = lb.querySelector('.rlb-next'),
      lastFocus = null;

  /* clone the figcaption node rather than copying its markup as a string:
     keeps the <b>/<span> formatting without ever parsing HTML at runtime */
  function captionFor(el) {
    var fig = el.closest('figure');
    var cap = fig && fig.querySelector('figcaption');
    return cap ? cap.cloneNode(true) : null;
  }

  function render() {
    var src = shots[i];
    var r = src.getBoundingClientRect();
    var w = r.width || 290, h = r.height || (w * 16 / 9);
    var SCALE = scaleFor(w, h);

    stage.textContent = '';
    var clone = src.cloneNode(true);
    clone.classList.remove('rs-clickable');
    clone.removeAttribute('role');
    clone.removeAttribute('tabindex');
    clone.removeAttribute('aria-label');
    /* pin to the measured size: the clone sits outside the grid/figure it came
       from, so the max-width rules that sized it there no longer apply */
    clone.style.margin = '0';
    clone.style.maxWidth = 'none';
    clone.style.width = w + 'px';
    clone.style.height = h + 'px';
    clone.style.transform = 'scale(' + SCALE + ')';
    clone.style.transformOrigin = 'top left';

    var box = document.createElement('div');
    box.className = 'rlb-box';
    box.style.width = (w * SCALE) + 'px';
    box.style.height = (h * SCALE) + 'px';
    box.appendChild(clone);
    stage.appendChild(box);

    capEl.textContent = '';
    var cap = captionFor(src);
    if (cap) capEl.appendChild(cap);
    cntEl.textContent = (i + 1) + ' / ' + shots.length;
    prevB.disabled = nextB.disabled = shots.length < 2;
  }

  function open(n) {
    i = n;
    lastFocus = document.activeElement;
    lb.hidden = false;
    document.body.classList.add('rlb-open');
    render();
    lb.querySelector('.rlb-x').focus();
  }
  function close() {
    lb.hidden = true;
    document.body.classList.remove('rlb-open');
    stage.textContent = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function step(d) { i = (i + d + shots.length) % shots.length; render(); }

  lb.querySelector('.rlb-x').addEventListener('click', close);
  prevB.addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
  nextB.addEventListener('click', function (e) { e.stopPropagation(); step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target === stage) close(); });

  window.addEventListener('resize', function () { if (!lb.hidden) render(); });

  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });
})();
