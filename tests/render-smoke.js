/* Software-renderer smoke tests, not a browser or screenshot test. */
var window=globalThis;window.addEventListener=function(){};
var localStorage={setItem:function(){}};
var draws=0,fills=0,uploads=0;
function assert(x,msg){if(!x)throw Error(msg);}
function context(){return {fillRect:function(){fills++;},createImageData:function(w,h){return {width:w,height:h,data:new Uint8ClampedArray(w*h*4)};},putImageData:function(){uploads++;},beginPath:function(){},moveTo:function(){},lineTo:function(){},stroke:function(){},fillText:function(){},createLinearGradient:function(){return{addColorStop:function(){}};},createRadialGradient:function(){return{addColorStop:function(){}};},drawImage:function(img){assert(img,'Missing sprite or texture');draws++;}};}
function canvas(){let c=context();return {width:640,height:360,getContext:function(){return c;},addEventListener:function(){},focus:function(){}};}
var document={createElement:function(){return canvas();},querySelector:function(){return null;}};
var Image=function(){this.complete=true;this.naturalWidth=192;};
load('dist/story.js');load('dist/core.js');load('dist/world.js');
var g=new LO.Core(),w=new LO.World(canvas(),g,function(){});
for(let key of Object.keys(w.stations)){w.go(key);assert(!w.solid(w.player.x,w.player.y),'Station inside wall: '+key);for(let a=0;a<8;a++){w.player.a=a*Math.PI/4;w.draw();}}
print('PASS Every station renders in eight directions with valid sprite references.');
g.state.queue=[{npc:'nico',mission:true},{npc:'iris'},{npc:'cole'},{npc:'driver'}];w.go('counter');w.draw();g.state.power=false;g.state.day=4;w.draw();assert(draws>10000,'Expected world rendering work');print('PASS Contact and procedural NPCs render in lit and outage scenes.');
w.go('counter');w.player.y=7.3;w.player.a=-Math.PI/2;w.keys.w=true;for(let i=0;i<60;i++)w.update(.05,true);assert(w.player.y>=7.15,'Movement crossed the solid service counter');print('PASS Forward movement respects service-counter collision.');
var depthBuffer=w.zBuffer,floorBuffer=w.floorImage.data.buffer,counterBuffer=w.counterDist;
fills=0;uploads=0;w.draw();assert(fills<2500,'Too many rectangle calls in the optimized renderer');assert(uploads===1,'Expected one floor upload');w.draw();assert(w.zBuffer===depthBuffer&&w.floorImage.data.buffer===floorBuffer&&w.counterDist===counterBuffer,'Rendering buffers were replaced');
print('PASS Floor rendering uses one upload and retains depth, counter and pixel buffers.');
assert(w.floorImage.data[3]===255&&w.floorImage.data[w.floorImage.data.length-1]===255,'Unpainted floor alpha');
print('PASS Floor pixels, including the horizon and final row, are opaque.');
var positions=[{x:5.4,y:7.4,a:-Math.PI/2},{x:3.1,y:10.4,a:Math.PI},{x:14,y:11.5,a:Math.PI/2}];
for(let p of positions)for(let lit of [true,false]){
 w.player=p;let dx=Math.cos(p.a),dy=Math.sin(p.a),px=-dy*.68,py=dx*.68;w.drawFloor(dx,dy,px,py,lit);
 for(let row of [1,55,133])for(let x of [12,210,411]){
  let distance=.5*w.h/row,fx=p.x+distance*(dx-px+2*px*x/w.w),fy=p.y+distance*(dy-py+2*py*x/w.w),tile=(Math.floor(fx)+Math.floor(fy))%2===0;
  let rgb=lit?(tile?[116,101,86]:[178,163,138]):(tile?[45,48,52]:[68,72,75]),alpha=Math.min(.7,distance*.07),index=(row*w.w+x)*4;
  for(let channel=0;channel<3;channel++)assert(Math.abs(w.floorImage.data[index+channel]-Math.round(rgb[channel]*(1-alpha)+[21,21,26][channel]*alpha))<=1,'Floor palette or projection changed');
 }
}
print('PASS Floor samples preserve the previous projection and lit/outage colors.');
print('RESULT 6 renderer smoke checks passed. No actual browser pixels were evaluated.');
