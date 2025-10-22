
// Simple client-side 'auth' using localStorage (demo only)
const $ = (s, r=document)=>r.querySelector(s);
const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

const AUTH_KEY = "peve.session";
function setSession(user){ localStorage.setItem(AUTH_KEY, JSON.stringify(user)); }
function getSession(){ try { return JSON.parse(localStorage.getItem(AUTH_KEY)||"null"); } catch(e){ return null } }
function clearSession(){ localStorage.removeItem(AUTH_KEY); }

function toggleContrast(){
  document.documentElement.classList.toggle("high-contrast");
  localStorage.setItem("peve.hc", document.documentElement.classList.contains("high-contrast")?"1":"0");
}
function applyContrast(){ if(localStorage.getItem("peve.hc")==="1"){ document.documentElement.classList.add("high-contrast") } }
applyContrast();

function fontDelta(delta){
  const size = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--fs")||"16");
  const newSize = Math.max(12, Math.min(22, size + delta));
  document.documentElement.style.setProperty("--fs", newSize+"px");
}
document.addEventListener("click", (e)=>{
  const t = e.target.closest("[data-action]"); if(!t) return;
  const a = t.dataset.action;
  if(a==="contrast"){ toggleContrast(); }
  if(a==="fs-inc"){ fontDelta(1); }
  if(a==="fs-dec"){ fontDelta(-1); }
  if(a==="logout"){ clearSession(); location.href="./"; }
});

// PWA
if("serviceWorker" in navigator){ navigator.serviceWorker.register("./service-worker.js"); }


// Theme management (light/dark/high-contrast/sepia)
(function(){
  const THEMES = ['light','dark','high-contrast','sepia'];
  function setTheme(t){
    if(!THEMES.includes(t)) t = 'dark';
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('peve.theme', t);
    const meta = document.querySelector('meta[name="theme-color"]');
    const color = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
    if(meta && color) meta.setAttribute('content', color);
  }
  function initTheme(){
    const t = localStorage.getItem('peve.theme') || 'dark';
    setTheme(t);
  }
  window.setTheme = setTheme;
  window.initTheme = initTheme;
  if (document.readyState !== 'loading') initTheme();
  else document.addEventListener('DOMContentLoaded', initTheme);
})();


// === Topbar + Theme menu logic (v2.1) ===
(function(){
  function ensureThemeAPI(){
    if(!window.setTheme){
      const THEMES = ['light','dark','high-contrast','sepia'];
      window.setTheme = function(t){
        if(!THEMES.includes(t)) t = 'dark';
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('peve.theme', t);
        const meta = document.querySelector('meta[name="theme-color"]');
        const color = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
        if(meta && color) meta.setAttribute('content', color);
      };
      window.initTheme = function(){
        const t = localStorage.getItem('peve.theme') || 'dark';
        window.setTheme(t);
      };
      if (document.readyState !== 'loading') window.initTheme();
      else document.addEventListener('DOMContentLoaded', window.initTheme);
    }
  }

  function buildTopbar(){
    if(document.querySelector('.topbar')) return; // evitar duplicados
    const bar = document.createElement('div');
    bar.className = 'topbar';
    bar.innerHTML = `
      <div class="left">
        <button class="btn" data-action="menu">☰ MENÚ</button>
        <button class="btn" data-action="back">← ATRÁS</button>
        <button class="btn" data-action="accept">✔ ACEPTAR</button>
        <button class="btn" data-action="cancel">✖ CANCELAR</button>
      </div>
      <div class="right">
        <div class="theme-switcher">
          <button class="btn menu-btn" aria-haspopup="true" aria-expanded="false">🎨 Tema</button>
          <div class="menu" role="menu">
            <button role="menuitem" data-theme="light">☀️ Claro</button>
            <button role="menuitem" data-theme="dark">🌙 Oscuro</button>
            <button role="menuitem" data-theme="high-contrast">⚡ Alto contraste</button>
            <button role="menuitem" data-theme="sepia">📜 Sepia</button>
          </div>
        </div>
        <a class="btn" href="./app/evidence.html">🧾 Evidencias</a>
      </div>
    `;
    document.body.prepend(bar);

    const ts = bar.querySelector('.theme-switcher');
    const btn = ts.querySelector('.menu-btn');
    const menu = ts.querySelector('.menu');
    btn.addEventListener('click', ()=>{
      const open = ts.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true':'false');
    });
    document.addEventListener('click', (e)=>{
      if(!ts.contains(e.target)) ts.classList.remove('open');
    });
    menu.addEventListener('click', (e)=>{
      const t = e.target.getAttribute('data-theme');
      if(t){ window.setTheme(t); ts.classList.remove('open'); }
    });

    bar.addEventListener('click', (e)=>{
      const a = e.target.closest('[data-action]')?.getAttribute('data-action');
      if(!a) return;
      if(a==='menu'){ document.body.classList.toggle('show-menu'); }
      if(a==='back'){ history.length > 1 ? history.back() : location.href = './'; }
      if(a==='accept'){ const form=document.querySelector('form'); if(form){ form.requestSubmit ? form.requestSubmit() : form.submit(); } }
      if(a==='cancel'){ if(confirm('¿Cancelar y volver al inicio?')) location.href='./'; }
    });
  }

  function initTopbar(){
    ensureThemeAPI();
    if (document.readyState !== 'loading') buildTopbar();
    else document.addEventListener('DOMContentLoaded', buildTopbar);
  }
  initTopbar();
})();
// === Fin v2.1 ===
