(function(){
  const env = document.getElementById('envelope');
  const heartsRoot = document.getElementById('hearts');
  if(!env) return;
  function toggle(e){
    const open = env.classList.toggle('open');
    env.setAttribute('aria-pressed', String(open));
    if(open) burstHearts();
  }
  env.addEventListener('click', toggle);
  env.addEventListener('keydown', function(e){
    if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });

  // Heart effects
  function createHeart(x, y, opts = {}){
    if(!heartsRoot) return;
    const el = document.createElement('span');
    el.className = 'floating-heart pop';
    el.textContent = '❤';
    const size = opts.size || (18 + Math.floor(Math.random()*40));
    el.style.fontSize = size + 'px';
    el.style.left = (x - size/2) + 'px';
    el.style.top = (y - size/2) + 'px';
    const drift = (Math.random()*160 - 80) + 'px';
    el.style.setProperty('--drift', drift);
    const duration = opts.duration || (1800 + Math.floor(Math.random()*2200));
    el.style.setProperty('--duration', duration + 'ms');
    heartsRoot.appendChild(el);
    // pop then float
    requestAnimationFrame(()=>{
      el.classList.remove('pop');
      el.classList.add('float');
    });
    setTimeout(()=>{ if(el && el.remove) el.remove(); }, duration + 900);
    return el;
  }

  function burstHearts(){
    if(!env || !heartsRoot) return;
    const rect = env.getBoundingClientRect();
    const rootRect = heartsRoot.getBoundingClientRect();
    const cx = rect.left + rect.width/2 - rootRect.left;
    const cy = rect.top + rect.height/3 - rootRect.top;
    for(let i=0;i<14;i++){
      const rx = cx + (Math.random()*rect.width - rect.width/2) * 0.6;
      const ry = cy + (Math.random()*rect.height - rect.height/2) * 0.2;
      createHeart(rx, ry, {size: 22 + Math.floor(Math.random()*56), duration: 1400 + Math.floor(Math.random()*2000)});
    }
  }

  // gentle background hearts periodically
  let bgTimer = setInterval(()=>{
    if(!heartsRoot) return;
    const w = heartsRoot.clientWidth;
    const h = heartsRoot.clientHeight;
    const x = Math.random()*w;
    const y = h - 10;
    createHeart(x,y,{size:16 + Math.floor(Math.random()*32), duration: 2600 + Math.floor(Math.random()*2000)});
  }, 900);

  // clean up if page is hidden
  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden){ clearInterval(bgTimer); bgTimer = null; }
    else if(!bgTimer){ bgTimer = setInterval(()=>{
      const w = heartsRoot.clientWidth;
      const h = heartsRoot.clientHeight;
      const x = Math.random()*w;
      const y = h - 10;
      createHeart(x,y,{size:10 + Math.floor(Math.random()*18), duration: 2400 + Math.floor(Math.random()*1800)});
    },900); }
  });
})();
