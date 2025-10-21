
async function peveConfig(){
  if(!window.__peve_cfg){
    window.__peve_cfg = await fetch('/data/config.json').then(r=>r.json()).catch(()=>({scriptUrl:null, timezone:'America/Santiago'}));
  }
  return window.__peve_cfg;
}
async function pevePost(action, payload){
  const cfg = await peveConfig();
  if(!cfg.scriptUrl){ throw new Error('Falta configurar data/config.json -> scriptUrl'); }
  const res = await fetch(cfg.scriptUrl, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({action, payload})
  });
  if(!res.ok){ throw new Error('HTTP '+res.status); }
  return await res.json();
}
window.PEVE_API = { peveConfig, pevePost };
