/* Illustrated stations share the original simulation and optional walkable map. */
LO.Visual={
 sprite(id){return LO.NPCS[id]?.sprite??({vera:0,iris:0,june:1,driver:1,frank:6,mechanic:6,sam:4,office:4,robin:3,tourist:3}[id]??3);},
 crop(ctx,image,frame,w,h,pan=0,zoom=1){
  const [x,y,fw,fh]=frame,scale=Math.max(w/fw,h/fh)*zoom,sw=w/scale,sh=h/scale;
  const sx=x+(fw-sw)*(.5+pan*.5),sy=y+(fh-sh)*.5;
  ctx.drawImage(image,sx,sy,sw,sh,0,0,w,h);
  return [sx,sy,sw,sh];
 }
};
LO.SceneWorld=class extends LO.World{
 constructor(canvas,core,interact){
  super(canvas,core,interact);this.view='scene';this.sceneKey='counter';this.pan=0;this.zoom=1;this.selected=null;
  this.rooms=new Image();this.rooms.src=LO_ART.rooms;
  this.cover=new Image();const background=getComputedStyle(document.querySelector('.title-art')).backgroundImage;
  this.cover.src=background?.match(/^url\(["']?(.*?)["']?\)$/)?.[1]||'cover.png';
  this.food=new Image();this.food.src=LO_ART.food;
  canvas.addEventListener('pointermove',e=>{if(this.view==='scene'&&this.drag!==undefined&&e.buttons){this.pan=LO.clamp(this.pan+(e.clientX-this.drag)/canvas.clientWidth*3,-1,1);this.drag=e.clientX;}});
  canvas.addEventListener('pointerleave',()=>this.drag=undefined);
 }
 go(key){super.go(key);if(this.stations[key]){this.sceneKey=key;this.pan=0;this.zoom=1;}}
 nearest(){return this.view==='walk'?super.nearest():{key:this.sceneKey,distance:0,...this.stations[this.sceneKey]};}
 update(dt,enabled){
  if(this.view==='walk')return super.update(dt,enabled);
  this.time+=dt;if(!enabled)return;
  if(this.keys.arrowleft||this.keys.a)this.pan=LO.clamp(this.pan-dt*.7,-1,1);
  if(this.keys.arrowright||this.keys.d)this.pan=LO.clamp(this.pan+dt*.7,-1,1);
  if(this.keys.w||this.keys.arrowup)this.zoom=LO.clamp(this.zoom+dt*.15,1,1.16);
  if(this.keys.s||this.keys.arrowdown)this.zoom=LO.clamp(this.zoom-dt*.15,1,1.16);
 }
 foodSprite(index,x,y,size){if(this.food.complete&&this.food.naturalWidth)this.ctx.drawImage(this.food,index%4*48,Math.floor(index/4)*64,48,64,x,y,size*.75,size);}
 draw(){
  if(this.view==='walk')return super.draw();
  const c=this.ctx,s=this.core.state,aspect=(this.canvas.clientWidth||960)/(this.canvas.clientHeight||540);
  const w=Math.min(1120,Math.max(480,Math.round(aspect*480))),h=Math.round(w/aspect);
  if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;}
  c.imageSmoothingEnabled=false;c.fillStyle='#211b20';c.fillRect(0,0,w,h);
  let frame=LO_ART.roomFrames[this.sceneKey],image=this.rooms;
  if(this.sceneKey==='drinks'){image=this.cover;frame=[1140,160,532,680];}
  if(!frame)frame=[207,0,355,164];
  let region;
  if(image.complete&&image.naturalWidth)region=LO.Visual.crop(c,image,frame,w,h,this.pan,this.zoom);
  else if(this.cover.complete&&this.cover.naturalWidth)LO.Visual.crop(c,this.cover,[0,0,this.cover.naturalWidth,this.cover.naturalHeight],w,h,this.pan,this.zoom);
  if(this.sceneKey==='counter'&&s.queue.length&&this.characters.complete&&this.characters.naturalWidth){
   const customer=s.queue.find(v=>v.uid===this.selected)||s.queue[0],sprite=LO.Visual.sprite(customer.npc),height=h*.8,width=height*.5,x=w*.48-width*.5-this.pan*w*.04,y=h*.16;
   c.drawImage(this.characters,sprite%4*48,Math.floor(sprite/4)*96,48,96,x,y,width,height);
   /* Restore the illustrated foreground over the customer's lower edge. */
   if(region)c.drawImage(image,region[0],region[1]+region[3]*.84,region[2],region[3]*.16,0,h*.84,w,h*.16);
  }
  if(this.sceneKey==='kitchen'){
   s.grill.forEach((p,i)=>this.foodSprite(p.status==='raw'?5:p.status==='ready'?6:7,w*.35+i*w*.12,h*.51,h*.18));
   if(s.fryer?.status==='ready')this.foodSprite(2,w*.18,h*.57,h*.2);
  }
  if(!s.power){c.fillStyle='#08111caa';c.fillRect(0,0,w,h);}
  const shade=c.createRadialGradient(w*.5,h*.42,h*.15,w*.5,h*.5,w*.75);shade.addColorStop(0,'#10091000');shade.addColorStop(1,'#140c2266');c.fillStyle=shade;c.fillRect(0,0,w,h);
 }
};
