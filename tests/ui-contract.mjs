/* DOM workflow checks with mocked canvas/speech. This is not browser visual QA. */
export function checkUI(parseHTML,files){
 const {window,document}=parseHTML(files['dist/index.html']),passed=[];
 function assert(v,m){if(!v)throw Error(m);}
 function check(name,fn){fn();passed.push(name);}
 const $=s=>document.querySelector(s),originalCreate=document.createElement.bind(document),draws=[];
 function context(){return new Proxy({createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}}),drawImage(...a){draws.push(a);}}, {get(o,k){return k in o?o[k]:()=>{};}});}
 document.createElement=(tag,...args)=>{let el=originalCreate(tag,...args);if(tag==='canvas')el.getContext=context;return el;};$('#world').getContext=context;
 const storage={},localStorage={getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v};
 const speech={getVoices:()=>[],addEventListener(){},cancel(){},speak(){}};window.speechSynthesis=speech;
 function Image(){this.complete=true;this.naturalWidth=768;this.naturalHeight=336;}
 let frame,now=0;const raf=cb=>frame=cb;
 const atlas={characters:'characters',food:'food',rooms:'rooms',roomFrames:{counter:[207,0,355,164],kitchen:[562,0,206,164],office:[0,166,207,170],storeroom:[562,166,206,170]}};window.LO_ART=atlas;
 const runtime=['story','report','core','interaction','world','scene'].map(p=>files['dist/'+p+'.js']).join('\n');
 const hooks='\nvar capturedCore,capturedWorld;var OriginalCore=LO.Core;LO.Core=class extends OriginalCore{constructor(...args){super(...args);capturedCore=this;}};var OriginalWorld=LO.SceneWorld;LO.SceneWorld=class extends OriginalWorld{constructor(...args){super(...args);capturedWorld=this;}};\n';
 const run=new Function('window','document','Image','LO_ART','localStorage','performance','requestAnimationFrame','getComputedStyle','SpeechSynthesisUtterance','speechSynthesis','setTimeout','clearTimeout','var LO=window.LO={};\n'+runtime+hooks+files['dist/app.js']+'\nreturn{core:()=>capturedCore,world:()=>capturedWorld};');
 const game=run(window,document,Image,atlas,localStorage,{now:()=>0},raf,()=>({backgroundImage:'url("cover.png")'}),function(text){this.text=text;},speech,()=>1,()=>{});
 function click(selector){let el=$(selector);assert(el,'Missing control: '+selector);assert(!el.disabled,'Disabled control: '+selector);el.dispatchEvent(new window.Event('click',{bubbles:true}));}
 function key(k,target=document.body){let e=new window.Event('keydown',{bubbles:true,cancelable:true});Object.defineProperty(e,'key',{value:k});target.dispatchEvent(e);}
 function advance(seconds){for(let i=0;i<Math.ceil(seconds*10);i++){now+=100;let cb=frame;cb(now);}}
 check('Title starts a new brief',()=>{click('#start');assert(game.core().state.phase==='brief','Clock in failed');assert(!$('#modal-backdrop').hidden,'Brief missing');});
 check('Brief opens the actual simulation',()=>{click('[data-action="open-shop"]');assert(game.core().state.phase==='open'&&!game.core().state.paused,'Not open');});
 check('Illustrated room draws after clock-in',()=>{advance(7.5);assert(draws.length>0,'No scene rendering');assert(game.world().view==='scene','Wrong default view');assert(game.core().state.queue.length===1,'First arrival missing');});
 let customer=game.core().state.queue[0],order=customer.order;
 check('Receipt opens a live docked counter',()=>{click('[data-open-customer]');assert($('#modal-backdrop').classList.contains('station-mode'),'Not docked');assert($('#modal').getAttribute('aria-modal')==='false','Live panel traps modal semantics');assert(!game.core().state.paused,'Counter paused');});
 check('Order is heard and caption stays inside the workstation',()=>{click('[data-action="hear"]');assert(customer.heard,'Order not heard');assert(!$('#station-dialogue').hidden&&$('#station-dialogue').textContent.includes(order.line),'Order transcript missing');assert($('#captions').hidden,'Detached caption overlaps workstation');});
 check('Persistent station switches change the room',()=>{click('.station-nav [data-station="kitchen"]');assert(game.world().sceneKey==='kitchen','Room mismatch');assert($('#grill-slots'),'Kitchen missing');});
 check('Toppings and cooking use the same live state',()=>{for(let k of ['cheese','onion']){let el=$('#'+k);el.checked=order[k];el.dispatchEvent(new window.Event('change',{bubbles:true}));}click('[data-action="cook"][data-kind="'+order.kind+'"]');if(order.fries)click('[data-action="fry"]');advance(8.5);assert(game.core().state.grill[0].status==='ready','Cooking froze');assert(document.querySelector('.grill-food .food-icon'),'No illustrated grill item');});
 check('Cooked food assembles using workstation shortcuts',()=>{key('a');if(order.fries)key('f');assert(game.core().state.tray.burger?.kind===order.kind,'Assembly failed');assert(game.core().state.tray.fries===order.fries,'Fries mismatch');});
 check('Drink and service complete an authored order without a remake',()=>{if(order.drink){click('.station-nav [data-station="drinks"]');click('[data-action="drink"][data-kind="'+order.drink+'"]');}click('.station-nav [data-station="counter"]');key('Enter');assert(game.core().state.served===1&&game.core().state.mistakes===0,'Order not served correctly');});
 check('Case file pauses the clock and returns to work',()=>{click('[data-action="notebook"]');let elapsed=game.core().state.elapsed;advance(1);assert(game.core().state.elapsed===elapsed,'Case file did not pause');assert(!$('#modal-backdrop').classList.contains('station-mode'),'Reading uses live panel');click('#modal-close');assert(!game.core().state.paused,'Closing case did not resume');});
 check('Explore toggle retains both illustrated and walkable rooms',()=>{click('#view-mode');assert(game.world().view==='walk','Explore unavailable');advance(.2);click('#view-mode');assert(game.world().view==='scene','Illustrated return unavailable');});
 check('Every station is still reachable from the bottom ledge',()=>{for(let name of ['counter','kitchen','drinks','office','storeroom']){click('.station-nav [data-station="'+name+'"]');assert(game.world().nearest().key===name,'Unreachable '+name);assert($('#station-content').textContent.length>0,'Empty '+name);}});
 check('Typing in cover identity cannot activate cooking shortcuts',()=>{game.core().state.day=3;click('.station-nav [data-station="counter"]');let input=$('#cover-answer');assert(input,'Cover identity field missing');let elapsed=game.core().state.elapsed;key('n',input);assert($('#cover-answer'),'Typing opened case file');assert(game.core().state.elapsed===elapsed,'Typing changed simulation');});
 check('Pager event can be read, resolved and stored in the office',()=>{game.core().trigger(window.LO.EVENTS.find(e=>e.id==='pager'));advance(.4);click('[data-event="pager"]');click('[data-resolve="pager"]');assert(game.core().state.lostProperty.length===1,'Pager not recorded');click('.station-nav [data-station="office"]');assert($('#station-content').textContent.includes('Lost property'),'Office registry missing');});
 check('Page has unique IDs, all workstation icons and the local visual stylesheet',()=>{let ids=[...document.querySelectorAll('[id]')].map(e=>e.id);assert(new Set(ids).size===ids.length,'Duplicate IDs');assert(document.querySelectorAll('.station-nav svg').length===5,'Missing station icons');assert(document.querySelector('link[href="visual.css"]'),'Visual stylesheet missing');});
 return passed;
}
