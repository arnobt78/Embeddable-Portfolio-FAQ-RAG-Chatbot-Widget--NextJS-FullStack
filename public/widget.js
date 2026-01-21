/** Portfolio Chatbot Widget - Fast Loading Embeddable Script */
(function(){
'use strict';
const C={
  u:window.CHATBOT_BASE_URL||window.location.origin,
  t:window.CHATBOT_TITLE||'Chat Assistant',
  p:window.CHATBOT_PLACEHOLDER||'Message...',
  g:window.CHATBOT_GREETING||'👋 How can I help you today?'
};
let open=0,msgs=[],typing=0,menu=0,dark=false;
try{dark=matchMedia('(prefers-color-scheme:dark)').matches;}catch(e){}
const $=id=>document.getElementById(id),tog=(e,c,on)=>e&&e.classList&&e.classList.toggle(c,on);

function init(){
  // Create button immediately - appears instantly
  const btn=document.createElement('button');
  btn.id='cb-btn';
  btn.className='fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-black rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all z-[99998]';
  // CRITICAL: Inline styles ensure positioning works even without Tailwind
  btn.style.cssText='position:fixed!important;bottom:1rem!important;right:1rem!important;width:3.5rem!important;height:3.5rem!important;background-color:#000000!important;border-radius:9999px!important;border:none!important;cursor:pointer!important;z-index:99998!important;pointer-events:auto!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25)!important;';
  btn.innerHTML=`<svg id="cb-o" style="width:1.5rem;height:1.5rem;color:white;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg><svg id="cb-x" style="width:1.5rem;height:1.5rem;color:white;position:absolute;opacity:0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18L18 6M6 6l12 12"/></svg>`;
  document.body.appendChild(btn);
  
  // Load CSS asynchronously (non-blocking)
  const l=document.createElement('link');
  l.rel='stylesheet';
  l.href=C.u+'/styles.css';
  document.head.appendChild(l);
  
  // Create chat window
  const d=document.createElement('div');
  d.id='cb';
  d.innerHTML=`<div id="cb-w" class="fixed bottom-20 w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] h-[calc(100vh-6rem)] max-h-[600px] right-4 sm:bottom-24 sm:top-auto sm:h-[600px] sm:w-[400px] sm:max-w-[400px] sm:right-6 sm:left-auto rounded-2xl shadow-2xl flex flex-col overflow-hidden z-99999 opacity-0 scale-95 pointer-events-none transition-all origin-bottom-right bg-white dark:bg-gray-900">
<div class="flex items-center justify-between px-3 sm:px-5 py-3 sm:py-4 border-b bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"><div class="flex items-center gap-2 sm:gap-3 min-w-0 flex-1"><div class="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center shrink-0"><svg class="w-4 h-4 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg></div><h3 class="font-semibold text-gray-900 dark:text-white truncate min-w-0">${C.t}</h3></div>
<div class="relative shrink-0"><button id="cb-m" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"><svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
<div id="cb-d" class="hidden absolute right-0 top-full mt-2 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-[100]">
<button id="cb-th" class="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"><svg id="cb-s" class="w-4 h-4 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg><svg id="cb-n" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg><span id="cb-tt">Dark Mode</span></button>
<button id="cb-cl" class="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>Clear Chat</button></div></div></div>
<div id="cb-ms" class="flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-5 py-3 sm:py-4 space-y-3 sm:space-y-4 bg-gray-50 dark:bg-gray-950"></div>
<div id="cb-ty" class="hidden px-3 sm:px-5 pb-2 bg-gray-50 dark:bg-gray-950"><div class="flex items-center gap-2 text-gray-400 text-sm"><div class="flex gap-1"><span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span><span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:.15s"></span><span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:.3s"></span></div>Thinking...</div></div>
<form id="cb-f" class="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4 border-t bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"><input id="cb-i" type="text" class="flex-1 min-w-0 px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600" placeholder="${C.p}" autocomplete="off"/><button type="submit" id="cb-se" class="p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full disabled:opacity-50 shrink-0"><svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"/></svg></button></form></div>`;
  document.body.appendChild(d);
  
  // CRITICAL: Apply inline styles to chat window to ensure positioning works without Tailwind
  const chatWindow=$('cb-w');
  if(chatWindow){
    chatWindow.style.cssText='position:fixed!important;bottom:5rem!important;right:1rem!important;width:calc(100vw - 2rem)!important;max-width:calc(100vw - 2rem)!important;height:calc(100vh - 6rem)!important;max-height:600px!important;border-radius:1rem!important;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25)!important;display:flex!important;flex-direction:column!important;overflow:hidden!important;z-index:99999!important;opacity:0!important;transform:scale(0.95)!important;pointer-events:none!important;background-color:#ffffff!important;transition:opacity 0.2s,transform 0.2s!important;';
    // Responsive styles for larger screens
    if(window.matchMedia('(min-width: 640px)').matches){
      chatWindow.style.bottom='6rem';
      chatWindow.style.right='1.5rem';
      chatWindow.style.width='400px';
      chatWindow.style.maxWidth='400px';
      chatWindow.style.height='600px';
    }
  }
  
  bind();
  theme();
  // Load history in background (non-blocking)
  setTimeout(()=>load().catch(()=>{}),100);
}

function bind(){
  const btn=$('cb-btn'),form=$('cb-f'),menuBtn=$('cb-m'),themeBtn=$('cb-th'),clearBtn=$('cb-cl'),dropdown=$('cb-d');
  if(btn)btn.onclick=flip;
  if(form)form.onsubmit=send;
  if(menuBtn)menuBtn.onclick=e=>{e.stopPropagation();menu=!menu;tog(dropdown,'hidden',!menu);};
  if(themeBtn)themeBtn.onclick=()=>{dark=!dark;theme();menu=0;tog(dropdown,'hidden',1);};
  if(clearBtn)clearBtn.onclick=()=>{msgs=[];draw();menu=0;tog(dropdown,'hidden',1);};
  document.onclick=()=>menu&&(menu=0,tog(dropdown,'hidden',1));
}

function theme(){
  const cb=$('cb'),tt=$('cb-tt'),s=$('cb-s'),n=$('cb-n');
  tog(cb,'dark',dark);
  if(tt)tt.textContent=dark?'Light Mode':'Dark Mode';
  tog(s,'hidden',!dark);
  tog(n,'hidden',dark);
}

function flip(){
  open=!open;
  const w=$('cb-w'),o=$('cb-o'),x=$('cb-x'),input=$('cb-i');
  if(w){
    // Use inline styles for reliable positioning without Tailwind
    if(open){
      w.style.opacity='1';
      w.style.transform='scale(1)';
      w.style.pointerEvents='auto';
    }else{
      w.style.opacity='0';
      w.style.transform='scale(0.95)';
      w.style.pointerEvents='none';
    }
    tog(w,'opacity-0',!open);
    tog(w,'scale-95',!open);
    tog(w,'pointer-events-none',!open);
    tog(w,'opacity-100',open);
    tog(w,'scale-100',open);
  }
  if(o){
    tog(o,'opacity-0',open);
    tog(o,'scale-50',open);
  }
  if(x){
    tog(x,'opacity-0',!open);
    tog(x,'scale-50',!open);
    tog(x,'opacity-100',open);
    tog(x,'scale-100',open);
  }
  if(open){
    if(input)input.focus();
    if(!msgs.length)add('assistant',C.g);
  }
}

function add(r,c){
  msgs.push({role:r,content:c});
  draw();
}

function esc(t){
  const d=document.createElement('div');
  d.textContent=t;
  return d.innerHTML.replace(/\n/g,'<br>');
}

function draw(){
  const ms=$('cb-ms');
  if(!ms)return;
  ms.innerHTML=msgs.map((m,i)=>m.role==='user'
    ?`<div style="display:flex!important;justify-content:flex-end!important;"><div style="background-color:#000000!important;color:#ffffff!important;border-radius:1rem 1rem 0.25rem 1rem!important;padding:0.75rem 1rem!important;max-width:85%!important;border:1px solid #e5e7eb!important;font-size:0.875rem!important;line-height:1.5!important;white-space:pre-wrap!important;word-wrap:break-word!important;"><div id="m${i}">${esc(m.content)}</div></div></div>`
    :`<div style="display:flex!important;justify-content:flex-start!important;"><div style="background-color:#ffffff!important;color:#111827!important;border-radius:1rem 1rem 1rem 0.25rem!important;padding:0.75rem 1rem!important;max-width:85%!important;border:1px solid #e5e7eb!important;box-shadow:0 1px 2px 0 rgba(0,0,0,0.05)!important;font-size:0.875rem!important;line-height:1.5!important;white-space:pre-wrap!important;word-wrap:break-word!important;"><div style="display:flex!important;align-items:center!important;gap:0.5rem!important;margin-bottom:0.5rem!important;"><div style="width:1.5rem!important;height:1.5rem!important;background-color:#000000!important;border-radius:9999px!important;display:flex!important;align-items:center!important;justify-content:center!important;flex-shrink:0!important;"><svg style="width:1rem!important;height:1rem!important;color:white!important;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg></div><span style="font-size:0.875rem!important;font-weight:500!important;color:#374151!important;">${C.t}</span></div><div id="m${i}">${esc(m.content)}</div></div></div>`
  ).join('');
  ms.scrollTop=ms.scrollHeight;
}

async function send(e){
  e.preventDefault();
  const input=$('cb-i'),submit=$('cb-se'),typingEl=$('cb-ty'),ms=$('cb-ms');
  if(!input)return;
  const m=input.value.trim();
  if(!m||typing)return;
  add('user',m);
  input.value='';
  if(submit)submit.disabled=1;
  typing=1;
  tog(typingEl,'hidden',0);
  try{
    const r=await fetch(C.u+'/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:m}),
      credentials:'include'
    });
    if(!r.ok||!r.body)throw new Error('Request failed');
    const rd=r.body.getReader();
    const dc=new TextDecoder();
    let t='',idx=null;
    while(1){
      const{done,value}=await rd.read();
      if(done)break;
      for(const ln of dc.decode(value,{stream:1}).split('\n')){
        if(!ln.startsWith('data: '))continue;
        const d=ln.slice(6);
        if(d==='[DONE]')continue;
        try{
          const p=JSON.parse(d);
          if(p.response){
            t+=p.response;
            if(idx===null){
              tog(typingEl,'hidden',1);
              typing=0;
              msgs.push({role:'assistant',content:t});
              idx=msgs.length-1;
              draw();
            }else{
              msgs[idx].content=t;
              const el=$('m'+idx);
              if(el)el.innerHTML=esc(t);
            }
            if(ms)ms.scrollTop=ms.scrollHeight;
          }
        }catch(e){}
      }
    }
  }catch(e){
    tog(typingEl,'hidden',1);
    typing=0;
    add('assistant','Sorry, an error occurred.');
  }finally{
    if(submit)submit.disabled=0;
    typing=0;
    tog(typingEl,'hidden',1);
  }
}

async function load(){
  try{
    const r=await fetch(C.u+'/api/history',{credentials:'include'});
    if(r.ok){
      const d=await r.json();
      if(d.messages&&Array.isArray(d.messages)&&d.messages.length){
        msgs=d.messages;
        draw();
      }
    }
  }catch(e){}
}

// Initialize when body is available
function waitForBody(){
  if(document.body){
    init();
  }else{
    setTimeout(waitForBody,10);
  }
}

// Start initialization
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',waitForBody);
}else{
  waitForBody();
}
})();
