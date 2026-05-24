/* ── Theme ── */
(function () { const s = localStorage.getItem('mv-t'); if (s) document.documentElement.dataset.theme = s; updI() })();
function togTheme() { const h = document.documentElement, n = h.dataset.theme === 'dark' ? 'light' : 'dark'; h.dataset.theme = n; localStorage.setItem('mv-t', n); updI() }
function updI() { const i = document.getElementById('thI'); if (i) i.textContent = document.documentElement.dataset.theme === 'dark' ? '🌙' : '☀️' }

/* ── Nav Scroll & Back to Top ── */
const btt = document.getElementById('backToTop');
if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 40);
  if (btt) btt.classList.toggle('show', scrollY > 400);
  const d = document.documentElement.scrollHeight - innerHeight;
  document.getElementById('scrollBar').style.width = (d > 0 ? (scrollY / d) * 100 : 0) + '%';
}, { passive: true });

/* ── Mobile ── */
function togMob() { document.getElementById('ham').classList.toggle('on'); document.getElementById('mobDr').classList.toggle('open'); document.getElementById('mobOv').classList.toggle('show') }

/* ── Cursor ── */
const cR = document.getElementById('curR'), cD = document.getElementById('curD');
let mx = 0, my = 0, rx = 0, ry = 0;
addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cD.style.left = mx + 'px'; cD.style.top = my + 'px' }, { passive: true });
(function mv() { rx += (mx - rx) * .12; ry += (my - ry) * .12; cR.style.left = rx + 'px'; cR.style.top = ry + 'px'; requestAnimationFrame(mv) })();
addEventListener('mouseover', e => { if (e.target.closest('a,button,.card,.fb,.tp,.soc-a,.bene-item,.cd,input,select,textarea')) cR.classList.add('hov') });
addEventListener('mouseout', e => { if (e.target.closest('a,button,.card,.fb,.tp,.soc-a,.bene-item,.cd,input,select,textarea')) cR.classList.remove('hov') });
addEventListener('mousedown', () => { cR.classList.add('click'); cD.classList.add('click') });
addEventListener('mouseup', () => { cR.classList.remove('click'); cD.classList.remove('click') });

/* ── Reveal ── */
function obs() {
  const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') }), { threshold: .06, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.rv:not(.vis),.rv-l:not(.vis),.rv-r:not(.vis),.rv-s:not(.vis),.rv-ro:not(.vis)').forEach(el => o.observe(el));
}
obs();

/* ── Counters ── */
function ctr() {
  const o = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; const c = e.target; if (c.dataset.done) return; c.dataset.done = '1';
    const tgt = +c.dataset.target, dur = 1600, st = performance.now();
    (function u(n) { const p = Math.min((n - st) / dur, 1), v = 1 - Math.pow(1 - p, 3); c.textContent = Math.floor(v * tgt); if (p < 1) requestAnimationFrame(u); else c.textContent = tgt })(st);
  }), { threshold: .4 });
  document.querySelectorAll('.counter').forEach(c => { c.dataset.done = ''; o.observe(c) });
}
ctr();

/* ── Ripple on buttons ── */
document.querySelectorAll('.btn,.sub-btn,.btn-w,.nav-cta').forEach(b => {
  b.addEventListener('click', function (e) {
    const r = document.createElement('span'); r.classList.add('ripple');
    const rc = this.getBoundingClientRect(), sz = Math.max(rc.width, rc.height);
    r.style.width = r.style.height = sz + 'px';
    r.style.left = (e.clientX - rc.left - sz / 2) + 'px';
    r.style.top = (e.clientY - rc.top - sz / 2) + 'px';
    this.appendChild(r); setTimeout(() => r.remove(), 550);
  });
});

/* ── Card tilt on hover ── */
document.querySelectorAll('.card').forEach(c => {
  c.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    const rx = (y - .5) * -6, ry = (x - .5) * 6;
    c.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
  });
  c.addEventListener('mouseleave', () => { c.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)' });
});

/* ── Parallax orbs on scroll ── */
addEventListener('scroll', () => {
  const s = scrollY;
  document.querySelectorAll('.h-orb').forEach((o, i) => {
    o.style.transform = `translateY(${s * (.03 + i * .015)}px)`;
  });
}, { passive: true });

/* ── Highlight active nav link based on current page ── */
(function () {
  const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
  const map = { 'index': 'home', 'services': 'services', 'about': 'about', 'portfolio': 'portfolio', 'contact': 'contact' };
  const activePage = map[page] || 'home';
  document.querySelectorAll('.nl-link').forEach(l => {
    l.classList.toggle('act', l.dataset.page === activePage);
  });
})();
