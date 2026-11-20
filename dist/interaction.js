/* Input and voice selection can be checked without a running browser. */
LO.stationShortcut=function(event,panel,selected){
 const target=event.target||{},tag=target.tagName||'',key=event.key.toLowerCase();
 if(!panel?.live||event.repeat||event.ctrlKey||event.metaKey||event.altKey||target.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(tag))return null;
 // Preserve native keyboard activation of focused controls.
 if(key==='enter'&&(tag==='BUTTON'||tag==='A'||target.closest?.('button,a,[role="button"]')))return null;
 if(panel.kind==='kitchen')return ({'1':{action:'cook',kind:'beef'},'2':{action:'cook',kind:'veggie'},'3':{action:'fry'},c:{action:'toggle-cheese'},o:{action:'toggle-onion'},a:{action:'assemble-ready'},f:{action:'take-fries'}})[key]||null;
 if(panel.kind==='drinks')return ({'1':{action:'drink',kind:'coffee'},'2':{action:'drink',kind:'soda'}})[key]||null;
 if(panel.kind==='counter'&&selected)return ({r:{action:'hear',id:String(selected)},q:{action:'clarify',id:String(selected)},enter:{action:'serve',id:String(selected)}})[key]||null;
 return null;
};
LO.VoiceBank=class{
 constructor(synth){this.synth=synth;this.voices=[];this.refresh=()=>{this.voices=(this.synth?.getVoices?.()||[]).filter(v=>/^en(?:[-_]|$)/i.test(v.lang));};this.refresh();this.synth?.addEventListener?.('voiceschanged',this.refresh);}
 choose(index){return this.voices.length?this.voices[Math.abs(index|0)%this.voices.length]:undefined;}
 dispose(){this.synth?.removeEventListener?.('voiceschanged',this.refresh);}
};
