/* Illustration crop/room-state checks; drawing is mocked, not pixel QA. */
var window=globalThis,localStorage={setItem:function(){}},count=0;
window.addEventListener=function(){};
function assert(v,m){if(!v)throw Error(m||'Assertion failed');}
function test(name,fn){fn();count++;print('PASS '+name);}
function context(){return {fillRect:function(){},createImageData:function(w,h){return{data:new Uint8ClampedArray(w*h*4)};},putImageData:function(){},beginPath:function(){},moveTo:function(){},lineTo:function(){},stroke:function(){},fillText:function(){},drawImage:function(){},createLinearGradient:function(){return{addColorStop:function(){}};},createRadialGradient:function(){return{addColorStop:function(){}};}};}
function canvas(){return{width:960,height:540,clientWidth:1200,clientHeight:650,getContext:context,addEventListener:function(){},focus:function(){}};}
var document={createElement:canvas,querySelector:function(){return null;}},getComputedStyle=function(){return{backgroundImage:'url("cover.png")'};};
var Image=function(){this.complete=true;this.naturalWidth=768;this.naturalHeight=336;};
var LO_ART={rooms:'rooms',characters:'characters',food:'food',roomFrames:{counter:[207,0,355,164],kitchen:[562,0,206,164],office:[0,166,207,170],storeroom:[562,166,206,170]}};window.LO_ART=LO_ART;
load('dist/story.js');load('dist/core.js');load('dist/world.js');load('dist/scene.js');
test('Illustrations crop to the viewport without stretching or crossing atlas frames',function(){for(let view of [[1200,650],[360,750],[1920,700]])for(let pan of [-1,0,1]){let call;LO.Visual.crop({drawImage:function(){call=[...arguments];}}, {},[207,0,355,164],view[0],view[1],pan,1.1);let [im,x,y,w,h]=call;assert(x>=207-1e-9&&y>=-1e-9&&x+w<=562+1e-9&&y+h<=164+1e-9,'Atlas bleeding');assert(Math.abs(w/h-view[0]/view[1])<1e-8,'Distorted image');}});
test('Illustrated room navigation uses the same core and valid map positions',function(){let g=new LO.Core(),w=new LO.SceneWorld(canvas(),g,function(){});for(let key of Object.keys(w.stations)){w.go(key);assert(w.nearest().key===key);assert(!w.solid(w.player.x,w.player.y));w.draw();}assert(w.core===g);});
test('Pan and zoom stop at their limits and freeze while reading',function(){let w=new LO.SceneWorld(canvas(),new LO.Core(),function(){});w.keys={d:true,w:true};w.update(100,true);assert(w.pan===1&&w.zoom===1.16);w.keys={a:true,s:true};w.update(100,false);assert(w.pan===1&&w.zoom===1.16);w.update(100,true);assert(w.pan===-1&&w.zoom===1);});
test('A customer, cooking food and outage use the live simulation state',function(){let g=new LO.Core(),w=new LO.SceneWorld(canvas(),g,function(){});g.open();g.spawn('nico');w.draw();g.cook('beef');g.state.grill[0].status='ready';w.go('kitchen');w.draw();g.state.power=false;w.draw();assert(g.state.queue.length===1&&g.state.grill[0].status==='ready');});
test('The original walkable view remains available for every station',function(){let g=new LO.Core(),w=new LO.SceneWorld(canvas(),g,function(){});w.view='walk';for(let key of Object.keys(w.stations)){w.go(key);assert(w.nearest().key===key);w.draw();}for(let id of Object.keys(LO.NPCS))assert(LO.Visual.sprite(id)>=0&&LO.Visual.sprite(id)<8);});
print('RESULT '+count+' scene checks passed. No actual browser pixels were evaluated.');
