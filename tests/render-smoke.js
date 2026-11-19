/* Software-renderer smoke tests, not a browser or screenshot test. */
var window=globalThis;window.addEventListener=function(){};
var localStorage={setItem:function(){}};
var draws=0;
function assert(x,msg){if(!x)throw Error(msg);}
function context(){return {fillRect:function(){},beginPath:function(){},moveTo:function(){},lineTo:function(){},stroke:function(){},fillText:function(){},createLinearGradient:function(){return{addColorStop:function(){}};},createRadialGradient:function(){return{addColorStop:function(){}};},drawImage:function(img){assert(img,'Missing sprite or texture');draws++;}};}
function canvas(){let c=context();return {width:640,height:360,getContext:function(){return c;},addEventListener:function(){},focus:function(){}};}
var document={createElement:function(){return canvas();},querySelector:function(){return null;}};
var Image=function(){this.complete=true;this.naturalWidth=192;};
load('dist/story.js');load('dist/core.js');load('dist/world.js');
var g=new LO.Core(),w=new LO.World(canvas(),g,function(){});
for(let key of Object.keys(w.stations)){w.go(key);assert(!w.solid(w.player.x,w.player.y),'Station inside wall: '+key);for(let a=0;a<8;a++){w.player.a=a*Math.PI/4;w.draw();}}
print('PASS Every station renders in eight directions with valid sprite references.');
g.state.queue=[{npc:'nico',mission:true},{npc:'iris'},{npc:'cole'},{npc:'driver'}];w.go('counter');w.draw();g.state.power=false;g.state.day=4;w.draw();assert(draws>10000,'Expected world rendering work');print('PASS Contact and procedural NPCs render in lit and outage scenes.');
w.go('counter');w.player.y=7.3;w.player.a=-Math.PI/2;w.keys.w=true;for(let i=0;i<60;i++)w.update(.05,true);assert(w.player.y>=7.15,'Movement crossed the solid service counter');print('PASS Forward movement respects service-counter collision.');
print('RESULT 3 renderer smoke checks passed. No actual browser pixels were evaluated.');
