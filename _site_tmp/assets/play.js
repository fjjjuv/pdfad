
const M={spec:"PDFAD/1.0",doc_id:"sha256:3a7f…",generator:"pdfbadger/1.0",created:"2026-11-22T15:00:00Z",
 dna:{fonts:{h1:{font:"helv",size:18,color:"#111111"},body:{font:"helv",size:11,color:"#333333"}},
      palette:["#1a5276","#000000","#8ba0cc","#db2777"],grid:{margins:[50,50,50,50],columns:1},rhythm:{spacing_scale:[8,12,16,24]}},
 elements_index:{pages:4,id_scheme:"e<base36(sha1(pos|style|text))>",stats:{tables:2,images:5,form_fields:0}},
 capabilities:["roles","patches","journal","verify"],
 journal_head:"blake3:0c19…",integrity:{scene_root:"blake3:77de…",pages:["blake3:11aa…","blake3:22bb…","blake3:33cc…","blake3:44dd…"]}};
const pal=document.getElementById('pal');
M.dna.palette.forEach(c=>{const d=document.createElement('div');d.className='sw';d.style.background=c;
 d.title=c;d.textContent=c;if(c==='#000000'||c==='#1a5276')d.style.color='#fff';
 d.addEventListener('click',()=>navigator.clipboard.writeText(c));pal.appendChild(d)});
const caps=document.getElementById('caps');
M.capabilities.forEach(c=>{const s=document.createElement('span');s.className='chip';s.textContent=c;caps.appendChild(s)});
const fnt=document.getElementById('fonts');
Object.entries(M.dna.fonts).forEach(([r,f])=>{const d=document.createElement('div');d.className='card';
 d.innerHTML='<h3>role: '+r+'</h3><p style="font-size:'+Math.min(f.size,20)+'px;color:'+f.color+';background:#f6f3ef;padding:6px;border-radius:6px">Aa — '+f.font+' '+f.size+'pt</p>';fnt.appendChild(d)});
document.getElementById('raw').textContent=JSON.stringify(M,null,2);
