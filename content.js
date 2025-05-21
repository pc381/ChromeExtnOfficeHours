(() => {
  const SELECTOR = "#spentHour";
  const WORKDAY = 480; // minutes

  const hhmmToMinutes = t => { const [h,m]=t.split(":" ).map(Number); return h*60+m; };
  function read() {
    const el=document.querySelector(SELECTOR);
    if(el){const txt=el.textContent.trim(); if(/^\d+:\d{2}$/.test(txt)) chrome.storage.local.set({ totalMinutes: hhmmToMinutes(txt), timestamp: Date.now() });}
  }
  read();
  new MutationObserver(read).observe(document, {subtree:true,childList:true,characterData:true});
  // Fallback polling every 30 s in case DOM doesn't mutate
  setInterval(read,30_000);
})();
