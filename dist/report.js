/* Small, transparent fact checks. This is not a general language grader. */
window.LO=window.LO||{};
LO.Report={
 normalize(text){return String(text).toLowerCase().replace(/’/g,"'").replace(/\bp\.\s*m\./g,'pm').replace(/\ba\.\s*m\./g,'am').replace(/(\d)\.(\d{2})\b/g,'$1:$2').replace(/[ \t\r]+/g,' ');},
 negated(text,index){
  // Sentence punctuation and contrast words end the scope of a correction.
  let before=text.slice(0,index).split(/[.!?;\n]/).pop();
  before=before.split(/\b(?:but|however|instead|whereas|yet)\b/).pop().replace(/\bnot only\b/g,'');
  const negatives=/\b(?:not|never|no|neither|nor|isn't|wasn't|aren't|weren't|won't|can't|cannot|didn't|doesn't|don't|hasn't|haven't)\b/g;
  let match,last;while((match=negatives.exec(before)))last=match;
  if(!last)return false;
  const tail=before.slice(last.index+last[0].length).trim();
  const links=/^(?:(?:be|been|being|at|to|from|in|on|the|a|an|take|taking|place|depart|departing|leave|leaving|arrive|arriving|use|using|go|going|happen|occur|confirm|confirmed|verify|verified|proven|that|it|is|was|will|would|really|actually|still|yet|scheduled|for|as|longer|by)\s*)*$/;
  if(links.test(tail))return true;
  // Carry a negation across another time/place, not across an unrelated fact
  // such as "no tickets and the van leaves depot two".
  const joined=/\b(?:or|nor|and)\b/g;let join,lastJoin;
  while((join=joined.exec(tail)))lastJoin=join;
  if(!lastJoin)return false;
  const first=tail.slice(0,lastJoin.index),after=tail.slice(lastJoin.index+lastJoin[0].length).trim();
  return links.test(after)&&/\b(?:\d{1,2}:\d{2}|six|seven|half past|entrance|door|gate|depot|terminal)\b/.test(first);
 },
 evaluate(text,criteria){
  const clean=this.normalize(text),words=String(text).trim().split(/\s+/).filter(Boolean).length;
  const checks=criteria.map(c=>{
   const re=new RegExp(c.re,'gi');let m,pass=false;
   while((m=re.exec(clean))!==null){
    let anchor=m.index;
    if(c.id==='company'){
     const predicate=/(?:ceas\w*|clos\w*|stopp\w*|no longer|out of business)/.exec(m[0]);
     if(predicate)anchor+=predicate.index;
    }
    const morning=c.id==='time'&&/^\s*am\b/.test(clean.slice(m.index+m[0].length));
    if(!morning&&!this.negated(clean,anchor)){pass=true;break;}
    if(!m[0].length)re.lastIndex++;
   }
   return{id:c.id,label:c.label,pass};
  });
  return{words,checks,score:Math.round(checks.filter(c=>c.pass).length/checks.length*100),tooShort:words<15};
 }
};
