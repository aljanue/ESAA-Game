const VIEWS={"prota_chico_f":{"s": "img/prota_chico_f.webp", "h": 0.9327, "w": 483, "px": 637}, "prota_chico_b":{"s": "img/prota_chico_b.webp", "h": 0.9239, "w": 463, "px": 631}, "prota_chica_f":{"s": "img/prota_chica_f.webp", "h": 0.9546, "w": 469, "px": 652}, "prota_chica_b":{"s": "img/prota_chica_b.webp", "h": 0.9239, "w": 452, "px": 631}, "julian_f":{"s": "img/julian_f.webp", "h": 0.8067, "w": 423, "px": 551}, "julian_b":{"s": "img/julian_b.webp", "h": 0.798, "w": 383, "px": 545}, "marcos_f":{"s": "img/marcos_f.webp", "h": 0.9092, "w": 455, "px": 621}, "marcos_b":{"s": "img/marcos_b.webp", "h": 0.8873, "w": 410, "px": 606}, "elena_f":{"s": "img/elena_f.webp", "h": 0.9209, "w": 431, "px": 629}, "elena_b":{"s": "img/elena_b.webp", "h": 0.9078, "w": 400, "px": 620}, "daniel_f":{"s": "img/daniel_f.webp", "h": 0.9327, "w": 483, "px": 637}, "daniel_b":{"s": "img/daniel_b.webp", "h": 0.9239, "w": 463, "px": 631}, "sofia_f":{"s": "img/sofia_f.webp", "h": 0.9546, "w": 470, "px": 652}, "sofia_b":{"s": "img/sofia_b.webp", "h": 0.9239, "w": 452, "px": 631}};
const IMG={lab:"img/lab.webp",i_movil:"img/i_movil.webp",i_barra:"img/i_barra.webp",i_alicates:"img/i_alicates.webp",cocina:"img/cocina.webp",comun:"img/comun.webp",chico:"img/chico.webp",chica:"img/chica.webp",room:"img/room.webp",plano:"img/plano.webp"};
const SVG={puerta:`<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linejoin="round"><path d="M6 21V4h10v17"/><path d="M3 21h18"/><circle cx="13.2" cy="13" r=".9" fill="#111"/></svg>`,pin:`<svg viewBox="0 0 24 24" fill="#111"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>`,movil:`<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/></svg>`};
const KEY="esaa_partida_v1";
const INIT_DISC=["prota","vestibulo","cocina","distrib","bano1"];
let PREV='room',S=null,cur="s1",pickSex=null;
function newTest(){return{nombre:'',curso:'',ans:Array(10).fill(-1),i:0,stage:'form',dl:false}}
function cleanTest(o){const n=newTest();if(!o||typeof o!=='object')return n;if(typeof o.nombre==='string')n.nombre=o.nombre.slice(0,60);if(typeof o.curso==='string')n.curso=o.curso.slice(0,20);
 if(Array.isArray(o.ans)&&o.ans.length===10)n.ans=o.ans.map(x=>[0,1,2].includes(x)?x:-1);if(Number.isInteger(o.i)&&o.i>=0&&o.i<10)n.i=o.i;if(['form','q','rev','fin'].includes(o.stage))n.stage=o.stage;n.dl=o.dl===true;return n}
const newState=()=>({sex:pickSex,name:"",phone:false,phoneRead:false,disc:INIT_DISC.slice(),pres:false,maletin:false,items:[],labIntro:false,test:newTest()});
S=newState();
const $=id=>document.getElementById(id);
function go(id){cur=id;document.body.classList.toggle('noui',id==='comic'||id==='s4');document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));$(id).classList.add('on')}
const _preloaded=new Set();
function preloadImgs(urls){urls.forEach(u=>{if(!u||_preloaded.has(u))return;_preloaded.add(u);const i=new Image();i.src=u;});}
function msg(t){$('msgT').textContent=t;$('msg').classList.add('on')}
function pick(x){pickSex=x;$('bChico').classList.toggle('sel',x=='chico');$('bChica').classList.toggle('sel',x=='chica');chk()}
function chk(){$('cont').disabled=!(pickSex&&$('nm').value.trim())}
const EYE='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3.2" fill="#fff"/></svg>';
function eyeOn(n){const c=$('cv'+n);const b=document.createElement('button');b.className='eye';b.title='Revelar viñeta';b.innerHTML=EYE;b.onclick=()=>reveal(n);c.appendChild(b);c.style.pointerEvents='auto'}
function reveal(n){const c=$('cv'+n);c.innerHTML='';c.classList.add('rev');c.style.pointerEvents='none';typePanel(n,()=>{if(n<5)eyeOn(n+1);else $('comicGo').style.display='block'})}
function newGame(){S=newState();S.name=$('nm').value.trim();beginComic()}
function beginComic(){clearInterval(TM);TM=null;TDONE=null;$('cimg').src=IMG[S.sex];$('tagP').textContent=S.name;preloadImgs([IMG.room,IMG.i_movil]);
 for(let n=2;n<=5;n++){const c=$('cv'+n);c.innerHTML='';c.classList.remove('rev');c.style.pointerEvents='none'}
 $('comicGo').style.display='none';buildTexts();go('comic');fitTexts();typePanel(1,()=>eyeOn(2))}

// ---- Texto del cómic (escrito por código sobre los cómics sin texto) ----
// id:[viñeta,x,y,ancho,alto,margen] en px sobre 1535x1024
const BOX={A:[1,23,13,340,37,1],B:[1,23,170,464,133,1],C:[2,792,16,483,100,1],D:[2,792,223,314,68,1],E:[3,13,325,404,70,1],F:[3,13,597,507,74,1],
G:[4,785,325,422,53,1],H:[4,922,611,487,62,1],I:[5,16,710,217,102,1.3],J:[5,590,712,200,106,1.3]};
const TXT={A:["La Sierra de Espadán, en plena primavera."],
B:["Los bosques de alcornoques y pinos cubrían las montañas,","los barrancos volvían a llevar agua y las flores comenzaban","a abrirse. El aire tenía ese olor a tierra húmeda que solo","aparece después de las lluvias.","","Un lugar precioso. Tranquilo. De esos en los que parece","imposible que pueda ocurrir nada malo."],
C:["Sin embargo, para mí, Espadán siempre tendría ciertos tintes","de misterio. Quizá fuera el silencio de sus bosques.","O aquella sensación de que, entre tanta belleza,","había lugares que era mejor no descubrir."],
D:["Por aquel entonces, todavía no sabía","hasta qué punto tenía razón..."],
E:["Todo empezó unas semanas antes, cuando Julián,","mi profesor de Biología, me propuso participar","en una expedición científica."],
G:["La expedición tendría lugar en una pequeña estación","de seguimiento ambiental, escondida en plena sierra."],
H:["Pasaríamos allí varios días estudiando el ecosistema,","recogiendo muestras y analizando distintos fenómenos naturales."],
I:["Eso suena muy bien...","Aunque todavía no sé","muy bien qué hacemos aquí."],
J:["Ya lo entenderás.","Te aseguro que hay","mucho más que descubrir","de lo que imaginas."]};
const TF={chico:["No era precisamente el alumno más brillante de la clase.","Tampoco tenía experiencia en investigación. Así que,","para ser sincero, no entendía muy bien por qué me había elegido."],
chica:["No era precisamente la alumna más brillante de la clase.","Tampoco tenía experiencia en investigación. Así que,","para ser sincera, no entendía muy bien por qué me había elegido."]};
let TL=[],TM=null,TDONE=null,TQ=[];
function buildTexts(){const box=$('ctext');box.innerHTML='';TL=[];
 Object.entries(BOX).forEach(([id,[p,x,y,w,h,pad]])=>{const lines=id==='F'?TF[S.sex]:TXT[id];
  const el=document.createElement('div');el.className='tb';
  el.style.cssText='left:'+(x/15.35)+'%;top:'+(y/10.24)+'%;width:'+(w/15.35)+'%;height:'+(h/10.24)+'%;padding:0 '+pad+'cqw';
  const objs=[];lines.forEach(tx=>{const d=document.createElement('div');if(tx===''){d.className='gap';el.appendChild(d);return}
   d.className='ln';const v=document.createElement('span'),hd=document.createElement('span');hd.style.visibility='hidden';hd.textContent=tx;d.append(v,hd);el.appendChild(d);objs.push({v,h:hd,t:tx,d})});
  box.appendChild(el);TL.push({p,el,lines:objs})})}
function fitTexts(){TL.forEach(b=>{let fs=1.05;b.el.style.fontSize=fs+'cqw';const pad=parseFloat(getComputedStyle(b.el).paddingLeft)*2;
 while(fs>.5&&(b.el.scrollHeight>b.el.clientHeight+1||b.lines.some(l=>l.d.scrollWidth>b.el.clientWidth-pad+1))){fs-=.03;b.el.style.fontSize=fs+'cqw'}})}
function typePanel(n,done){clearInterval(TM);const q=[];TL.filter(b=>b.p===n).forEach(b=>b.lines.forEach(l=>q.push(l)));
 const total=q.reduce((s,l)=>s+l.t.length,0),step=Math.max(2,Math.ceil(total/100)),tk=Math.max(30,Math.round(3000/Math.ceil(total/step)));let li=0,ci=0;TQ=q;TDONE=done;
 TM=setInterval(()=>{let k=step;while(k>0&&li<q.length){const l=q[li],take=Math.min(k,l.t.length-ci);ci+=take;k-=take;l.v.textContent=l.t.slice(0,ci);l.h.textContent=l.t.slice(ci);if(ci>=l.t.length){li++;ci=0}}
  if(li>=q.length)finishType()},tk)}
function finishType(){clearInterval(TM);TM=null;TQ.forEach(l=>{l.v.textContent=l.t;l.h.textContent=''});TQ=[];const d=TDONE;TDONE=null;if(d)d()}
function skipType(e){if(e.target.closest('.eye'))return;if(TM)finishType()}
const ico=k=>()=>'<img src="'+IMG['i_'+k]+'" alt="">';
const ITEMS={movil:['Móvil',ico('movil'),readPhone],barra:['Barra en T',ico('barra'),()=>msg('Una barra en forma de T, de las de abrir alcantarillas.')],alicates:['Alicates',ico('alicates'),()=>msg('Unos alicates.')]};
function renderInv(){const list=(S.phone?['movil']:[]).concat(S.items);document.querySelectorAll('.slots').forEach(el=>{el.innerHTML='';list.forEach(k=>{const [n,s,f]=ITEMS[k],b=document.createElement('button');b.className='itm';b.title=n;b.innerHTML=typeof s==='function'?s():s;b.onclick=f;el.appendChild(b)})})}
function renderInvOld(){document.querySelectorAll('.slots').forEach(el=>{el.innerHTML='';if(S.phone){const b=document.createElement('button');b.className='slot';b.title='Móvil';b.innerHTML=SVG.movil;b.onclick=readPhone;el.appendChild(b)}})}
function readPhone(){if(!S.phoneRead){msg('Escribí por WhatsApp a mamá. Me dijo que me lo pasara bien y que tuviera cuidado.');S.phoneRead=true;$('roomDoor').style.display='grid'}else{PREV=cur;go('phone')}}
function bag(){if(!S.phone){S.phone=true;renderInv();msg('Cogí mi móvil de la mochila, no he avisado a mis padres de que hemos llegado.')}else msg('Me traje apuntes de clase, carpetas, la agenda y otras cosas. De momento no me hacía falta nada más.')}
function showRoom(){$('roomImg').src=IMG.room;$('locTxt').textContent='ESAA - Habitación de '+S.name;$('roomDoor').style.display=S.phoneRead?'grid':'none';renderInv();go('room');preloadImgs([IMG.plano])}
// Estancias con nombre que se descubre (centro de su placa en px sobre 1535x1024)
const LBL={archivoB:[["Archivo B"],207,281],archivoA:[["Archivo A"],190,368],control:[["Sala de","Control"],448,343],lab:[["Laboratorio"],217,507],
pasillo:[["Pasillo","Interior"],393,528],tecnica:[["Zona","Técnica"],505,528],vestibulo:[["Vestíbulo"],212,700],cocina:[["Cocina - Comedor"],447,682],
prota:[null,963,363],cian:[["Habitación","Cian"],1113,373],comun:[["Sala Común"],1353,383],distrib:[["Distribuidor"],1137,527],paso:[["Zona de","paso"],940,528],
bano1:[["Baño 1"],1415,533],bano2:[["Baño 2"],1415,640],despacho:[["Despacho","Julián"],1032,666],julian:[["Habitación","Julián"],1180,666],marcos:[["Habitación","Marcos"],1308,673]};
const NAMES={lab:"Laboratorio",patio:"Patio",vestibulo:"Vestíbulo",cocina:"Cocina - Comedor",distrib:"Distribuidor",bano1:"Baño 1",comun:"Sala Común"};
// [id,x,y,tipo(p=puerta,u=ubicación),acceso(room|black|no)]
const SPOTS=[["archivoB",330,300,"p","no"],["archivoA",290,415,"p","no"],["control",372,428,"p","no"],["lab",318,560,"p","lab"],["pasillo",393,585,"u","no"],
["tecnica",470,598,"p","no"],["vestibulo",130,745,"p","black"],["cocina",597,688,"p","scene"],["entrada",295,880,"u","no"],["fachada",400,955,"u","no"],
["cobertizo",727,392,"u","no"],["patio",760,650,"u","black"],["prota",960,425,"p","room"],["cian",1113,440,"p","no"],["comun",1225,455,"p","scene"],
["paso",905,585,"u","no"],["distrib",1235,530,"u","black"],["despacho",1035,592,"p","no"],["julian",1165,598,"p","no"],["marcos",1300,598,"p","no"],
["bano1",1355,505,"p","black"],["bano2",1360,622,"p","no"]];
const SLASH='<svg class="slash" viewBox="0 0 24 24"><path d="M3.5 20.5L20.5 3.5" stroke="#fff" stroke-width="4.4" stroke-linecap="round"/><path d="M3.5 20.5L20.5 3.5" stroke="#a52a2a" stroke-width="2.4" stroke-linecap="round"/></svg>';
function renderLabels(){const box=$('mapLabels');box.innerHTML='';
 S.disc.forEach(id=>{const d=LBL[id];if(!d)return;let lines=d[0],fs=1;
  if(id==='prota'){lines=["Habitación","de "+S.name];fs=Math.min(1,11/(3+S.name.length))}
  const e=document.createElement('div');e.className='lbl';e.style.left=(d[1]/1535*100)+'%';e.style.top=(d[2]/1024*100)+'%';
  lines.forEach((l,i)=>{const s=document.createElement('div');s.textContent=l;if(id==='prota'&&i==1)s.style.fontSize=(fs*100)+'%';e.appendChild(s)});box.appendChild(e)})}
function showMap(){renderLabels();renderInv();const lk=document.querySelector('#mapIcons [data-id=lab]');lk.classList.toggle('lock',!S.pres);lk.querySelector('.slash').style.display=S.pres?'none':'';go('map')}
function addDisc(id){if(LBL[id]&&!S.disc.includes(id))S.disc.push(id)}
function buildMap(){$('mapImg').src=IMG.plano;preloadImgs([IMG.comun,IMG.cocina,IMG.lab]);SPOTS.forEach(([id,x,y,t,acc])=>{const b=document.createElement('button');b.className='ico'+(acc=='no'||acc=='lab'?' lock':'');b.dataset.id=id;
 b.style.left=(x/1535*100)+'%';b.style.top=(y/1024*100)+'%';b.innerHTML=(t=='u'?SVG.pin:SVG.puerta)+(acc=='no'||acc=='lab'?SLASH:'');
 b.onclick=()=>{if(acc=='room')showRoom();else if(acc=='scene')showScene(id);else if(acc=='lab'){if(S.pres)showScene('lab');else msg('Estancia sin acceso')}else if(acc=='black'){if(!S.disc.includes(id))S.disc.push(id);$('rbTitle').textContent=NAMES[id];go('roomBlack')}else msg('Estancia sin acceso')};$('mapIcons').appendChild(b)})}
buildMap();

const PUERTA=SVG.puerta,LUPA=`<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.6" stroke-linecap="round"><circle cx="10" cy="10" r="6"/><path d="M15 15l6 6"/></svg>`,CHEV='<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';
const OBS={cocina:{loc:'ESAA - Cocina - Comedor',exit:[5,46],hs:[
[13.5,53,'maletin'],[16,27,'Un cuadro con un paisaje de montaña. Seguro que es de por aquí.'],[79.5,43,'Una nevera azul. No me pareció el momento de abrirla.'],
[84,57.5,'Un dispensador de agua. Me tomaré un vaso más tarde.'],[49.6,32,'Por la ventana se veían las montañas cubiertas de pinos.'],[70,43.5,'Dos botellas de aceite junto a los fogones.'],[29.6,40,'La puerta de cristal daba a un patio de piedra con plantas.']]},
comun:{loc:'ESAA - Sala Común',exit:[50,92],hs:[[91,35,'Una estantería llena de libros, frascos e instrumentos científicos.'],[17,25,'Dos cuadros con paisajes de montaña.'],[40,32,'Los bosques de la sierra se veían desde las ventanas.']]},
lab:{loc:'ESAA - Laboratorio',exit:[95.5,50],hs:[[65.5,42.5,'Un microscopio. Seguro que le sacaremos partido estos días.'],[57.4,58,'Probetas y un matraz con un líquido azul. Mejor no tocar nada sin permiso.'],
[57.4,26.6,'Desde la ventana se veían el barranco y la sierra. Lo interesante estaba ahí fuera.'],[88,35,'Una estantería llena de frascos, muestras y cajas, todo etiquetado.'],[9.6,53.7,'Una gradilla con tubos de ensayo, junto al fregadero.']]}};
function mkScene(id){const o=OBS[id],s=document.createElement('section');s.id='sc_'+id;s.className='screen';
 s.innerHTML='<div class="wrap" style="--r:1672/941"><div class="stage"><img alt=""><div class="loc"><svg viewBox="0 0 24 24" fill="#111"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg><span></span></div><div class="chars"></div><div class="dlg"><b></b><div class="tx"><div class="ln"></div><div class="ln"></div></div></div></div><div class="inv"><span class="lab">INVENTARIO</span><span class="slots"></span></div></div>';
 s.querySelector('img').src=IMG[id];s.querySelector('.loc span').textContent=o.loc;const st=s.querySelector('.stage');
 const mk=(x,y,h,f,cls)=>{const b=document.createElement('button');b.className='ico '+(cls||'');b.style.left=x+'%';b.style.top=y+'%';b.innerHTML=h;b.onclick=f;st.appendChild(b);return b};
 o.hs.forEach(([x,y,a])=>mk(x,y,LUPA,()=>a==='maletin'?maletin():msg(a)));
 mk(o.exit[0],o.exit[1],PUERTA,showMap);
 if(id==='cocina'||id==='lab'){mk(93,90,CHEV,()=>id==='cocina'?startPres():startLab(),'adv');s.querySelector('.dlg').onclick=nextStep}
 document.body.appendChild(s)}
function maletin(){if(!S.maletin){S.maletin=true;S.items.push('barra','alicates');renderInv();msg('En el maletín había una barra en forma de T, de las de abrir alcantarillas, y unos alicates. Una vez jugué a un videojuego donde esto ayudaba al protagonista. Me lo guardaré por si acaso.')}else msg('No había nada más en el maletín.')}
function showScene(id){if(id==='lab'&&S.labIntro&&!S.test.dl){showTest();return}const s=$('sc_'+id);addDisc(id);renderInv();const first=(id==='cocina'&&!S.pres)||(id==='lab'&&!S.labIntro);s.classList.toggle('pres',first);s.classList.toggle('pre',first);
 s.querySelector('.dlg').style.display='none';s.querySelector('.chars').innerHTML='';go('sc_'+id);document.body.classList.toggle('noui',first)}
// ---- Secuencias con personajes (comedor y laboratorio) ----
const COL={prota:'#2878D0',julian:'#A94343',comp:'#815C9C',marcos:'#B58A24',elena:'#548B55'};
const POSS={cocina:{prota:[13,'back',64],julian:[32,'front',58],comp:[51,'front',58],marcos:[70,'front',58],elena:[88,'front',58]},
lab:{prota:[13,'back',64],comp:[32,'front',58],elena:[52,'front',58],marcos:[72,'front',58]}};
let POS=POSS.cocina;
function fig(k,view){const key=k==='prota'?'prota_'+S.sex+'_'+view:k==='comp'?(S.sex==='chico'?'sofia':'daniel')+'_f':k+'_f',V=VIEWS[key];if(!V)return figOld(k);
 const d=document.createElement('div');d.className='fig';d.style.cssText='left:'+POS[k][0]+'%;bottom:0;height:'+(V.h*56)+'%';const i=document.createElement('img');i.src=V.s;i.alt='';d.appendChild(i);return d}
function figOld(k){const c=COL[k],[x,v,h]=POS[k],nm=wname(k);
 const d=document.createElement('div');d.className='fig';d.style.cssText='left:'+x+'%;height:'+h+'%';
 d.innerHTML='<svg viewBox="0 0 60 140"><circle cx="30" cy="17" r="14" fill="#fff" stroke="'+c+'" stroke-width="2.5"/><path d="M10 138V60q0-22 20-22t20 22v78z" fill="#fff" stroke="'+c+'" stroke-width="2.5"/><circle cx="25" cy="16" r="1.6" fill="'+c+'"/><circle cx="35" cy="16" r="1.6" fill="'+c+'"/><text x="30" y="85" font-size="8" text-anchor="middle" fill="'+c+'" font-family="Arial" font-weight="700">'+nm+'</text></svg>';return d}
const CMP=()=>S.sex==='chico'?{n:'Sofía',a:'a',e:'Encantada'}:{n:'Daniel',a:'o',e:'Encantado'};
const wname=k=>k==='prota'?S.name:k==='julian'?'Julián':k==='comp'?CMP().n:k==='marcos'?'Marcos':'Elena';
function STEPS(){const n=S.name,c=CMP(),A=['prota','julian'],B=A.concat('comp'),C=B.concat('marcos'),D=C.concat('elena');return[
{ch:A,w:'julian',t:'¡Ya habéis llegado! Bienvenidos a la ESAA. Pasad, que os presento a la gente.'},
{ch:A,w:'prota',t:'Hola, profesor. Es un sitio precioso.'},
{ch:B,w:'julian',t:n+', te presento a '+c.n+', tu compañer'+c.a+' de expedición.'},
{ch:B,w:'comp',t:'Hola, '+n+'. '+c.e+' de conocerte.'},
{ch:C,w:'julian',t:'Y este es Marcos, investigador colaborador de la estación.'},
{ch:C,w:'marcos',t:'Encantado. Si necesitáis algo del material, preguntadme.'},
{ch:D,w:'elena',t:'Perdonad el retraso. Soy Elena, agente medioambiental. Para explicaros qué hacéis aquí y qué vamos a investigar, os llevo al laboratorio.'}]}
const G=[['marcos','Diez días en plena Semana Santa. No todo el mundo puede decir que ha cambiado las vacaciones por una estación científica.'],['comp','Bueno, depende de lo que nos tengáis preparado.'],
['elena','¡Bienvenidos! Pasad, pasad. Este será uno de los lugares donde más tiempo vamos a pasar durante los próximos diez días.'],['marcos','Aunque espero que no os paséis los diez días encerrados aquí. Lo interesante está ahí fuera.'],
['comp','¿Y qué vamos a hacer exactamente durante estos diez días?'],['elena','Vais a participar en una investigación sobre los ecosistemas de esta zona. Queremos conocer mejor cómo funcionan, qué especies viven aquí, cómo se relacionan entre ellas y qué factores condicionan su equilibrio.'],
['prota','¿Vamos a salir al monte a investigar?'],['marcos','¡Claro! Observaremos el entorno, identificaremos organismos, recogeremos información y analizaremos datos. También trabajaremos aquí, en el laboratorio.'],
['comp','¿Y qué tiene de especial esta zona?'],['elena','Mucho más de lo que parece a simple vista. Un ecosistema no es solamente un conjunto de animales y plantas. Es un sistema en el que intervienen los seres vivos, las condiciones del medio y las relaciones que se establecen entre todos ellos.'],
['marcos','Y esas relaciones pueden ser bastante más complejas de lo que imagináis. Si desaparece una especie, cambia una población o se modifica algún factor ambiental, las consecuencias pueden extenderse por todo el ecosistema.'],
['prota','Entonces, ¿vamos a estudiar cómo funciona todo eso?'],['elena','Exactamente. Pero también queremos entender por qué los ecosistemas son como son. Para eso tendremos que mirar más allá de lo que vemos: cómo se adaptan los organismos, cómo han evolucionado, qué papel tiene la información genética, cómo influye la historia geológica del territorio...'],
['marcos','Vamos, que no os vais a aburrir.'],['comp','¿Y nosotros vamos a poder participar en la investigación de verdad?'],['elena','Esa es la idea. Pero antes tenemos que comprobar una cosa.'],['prota','¿Qué cosa?'],
['elena','Hoy es nuestro primer día aquí. Durante los próximos diez días trabajaréis con nosotros, pero no os hemos seleccionado para que os limitéis a mirar. Queremos que participéis, que planteéis preguntas, que interpretéis resultados y que seáis capaces de sacar vuestras propias conclusiones.'],
['marcos','Y para eso necesitamos saber qué conocimientos traéis de casa.'],['comp','¿Nos vais a hacer un examen?'],['marcos','¡Tranquilos! Todavía no os vamos a pedir que publiquéis ningún artículo científico.'],
['elena','Lo llamaremos una evaluación inicial. Nos servirá para conocer vuestro punto de partida y comprobar que domináis algunos conceptos fundamentales. No se trata de memorizar definiciones sin más: tendréis que observar, relacionar ideas, interpretar situaciones y razonar vuestras respuestas.'],
['prota','¿Y sobre qué tendremos que demostrar que sabemos?'],['elena','La evaluación abarcará conocimientos de Biología y Geología que habéis ido aprendiendo durante estos años en el instituto. Queremos comprobar que tenéis una buena base para afrontar la investigación.'],
['marcos','Tendréis que pensar como científicos: no basta con recordar conceptos, hay que saber relacionarlos, interpretar situaciones y explicar por qué ocurren las cosas.'],
['elena','Al fin y al cabo, para investigar necesitamos comprender cómo funciona el mundo natural. Desde los seres vivos y su organización hasta la evolución, la genética, los ecosistemas o los procesos geológicos que dan forma al paisaje.'],
['comp','Bueno... ¡Pues vamos allá!'],['elena','Perfecto. Cuando estéis preparados, empezamos.']];
const LABSTEPS=()=>G.map(([w,t])=>({ch:['prota','comp','elena','marcos'],w,t}));
// ---- Motor de diálogo: 2 líneas visibles; al avanzar sube una línea y se escribe la siguiente ----
let SEQ=null,SP=null,TMS=null;
function wrapLines(el,text){const m=document.createElement('span');m.style.cssText='position:absolute;visibility:hidden;white-space:nowrap;font:inherit';el.appendChild(m);const W=el.clientWidth,L=[];let cur='';
 text.split(' ').forEach(w=>{const x=cur?cur+' '+w:w;m.textContent=x;if(m.offsetWidth>W&&cur){L.push(cur);cur=w}else cur=x});if(cur)L.push(cur);m.remove();return L}
function typeInto(items,ms){clearInterval(TMS);const total=items.reduce((s,i)=>s+i.t.length,0),step=Math.max(1,Math.ceil(total/100)),tk=Math.max(25,Math.round(ms/Math.ceil(total/step)));let li=0,ci=0;
 SP.fin=()=>{clearInterval(TMS);TMS=null;items.forEach(i=>i.el.textContent=i.t);SP.fin=null};items.forEach(i=>i.el.textContent='');
 TMS=setInterval(()=>{let k=step;while(k>0&&li<items.length){const it=items[li],take=Math.min(k,it.t.length-ci);ci+=take;k-=take;it.el.textContent=it.t.slice(0,ci);if(ci>=it.t.length){li++;ci=0}}if(li>=items.length)SP.fin()},tk)}
function startSpeech(d,text){const sl=d.querySelectorAll('.ln');sl[0].style.display=sl[1].style.display='block';const L=wrapLines(d.querySelector('.tx'),text);SP={L,sl,next:Math.min(2,L.length),fin:null};
 if(L.length<2)sl[1].style.display='none';clearInterval(TMS);typeInto([{el:sl[0],t:L[0]}].concat(L[1]?[{el:sl[1],t:L[1]}]:[]),3000)}
function advSpeech(){if(SP.fin){SP.fin();return 'typing'}if(SP.next<SP.L.length){const[a,b]=SP.sl;a.textContent=b.textContent;b.textContent='';typeInto([{el:b,t:SP.L[SP.next++]}],1500);return 'more'}return 'end'}
function startSeq(id,steps,end){SEQ={id,st:steps,i:0,end};POS=POSS[id];$('sc_'+id).classList.remove('pre');showStep()}
function showStep(){const s=$('sc_'+SEQ.id),st=SEQ.st[SEQ.i],ch=s.querySelector('.chars');ch.innerHTML='';st.ch.forEach(k=>ch.appendChild(fig(k,k==='prota'&&!(st.w==='prota'||st.t.includes(S.name))?'b':'f')));
 const d=s.querySelector('.dlg'),b=d.querySelector('b');d.style.display='block';b.textContent=wname(st.w);b.style.color=COL[st.w];startSpeech(d,st.t)}
function nextStep(){if(!SEQ)return;const r=advSpeech();if(r!=='end')return;SEQ.i++;if(SEQ.i<SEQ.st.length)showStep();else{const e=SEQ.end;SEQ=null;e()}}
function startPres(){startSeq('cocina',STEPS(),endPres)}
function startLab(){startSeq('lab',LABSTEPS(),endLab)}
function endPres(){const s=$('sc_cocina');s.querySelector('.chars').innerHTML='';s.querySelector('.dlg').style.display='none';s.classList.remove('pres');document.body.classList.remove('noui');S.pres=true;addDisc('lab');
 msg('Elena quiere llevarnos al laboratorio para explicarnos qué hacemos aquí. Debería ir hacia allí, aunque antes puedo echar un vistazo por el comedor.')}
function endLab_old(){const s=$('sc_lab');s.querySelector('.chars').innerHTML='';s.querySelector('.dlg').style.display='none';s.classList.remove('pres');document.body.classList.remove('noui');S.labIntro=true;go('test')}
function endLab(){const s=$('sc_lab');s.querySelector('.chars').innerHTML='';s.querySelector('.dlg').style.display='none';s.classList.remove('pres');document.body.classList.remove('noui');S.labIntro=true;showTest()}
mkScene('cocina');mkScene('comun');mkScene('lab');

// ---- Test de evaluación inicial (las soluciones NO están en el juego) ----
const TEST=[
{t:'Estructura de la geosfera',q:'Elige la opción que tenga las capas correctas y en el orden correcto (desde la superficie hacia el interior).',o:['Mesosfera, litosfera, endosfera','Litosfera, mesosfera, endosfera','Litosfera, exosfera, endosfera']},
{t:'Placas tectónicas',q:'En un límite convergente, donde dos placas chocan, ¿qué suele ocurrir?',o:['Se forma nueva corteza oceánica y las placas se separan','Las placas se deslizan lateralmente sin destruir corteza','Una placa se hunde bajo otra y se forman cordilleras, con terremotos y volcanes']},
{t:'Topografía',q:'En un mapa topográfico, las curvas de nivel muy juntas entre sí indican...',o:['Una pendiente fuerte','Un terreno llano','Una zona con agua']},
{t:'Estratigrafía',q:'En el esquema, una falla corta tres capas de roca superpuestas. ¿Qué es más reciente?',img:1,o:['Los estratos (las capas de roca)','La falla','Todo se formó a la vez']},
{t:'La Tierra y el universo',q:'¿Cuál es el orden correcto, de mayor a menor?',o:['Sistema Solar, Vía Láctea, Universo','Vía Láctea, Universo, Sistema Solar','Universo, Vía Láctea, Sistema Solar']},
{t:'Darwin y Lamarck',q:'Una jirafa tiene el cuello largo. Según Lamarck, esto se explicaría porque...',o:['Sus antepasados estiraron el cuello para alcanzar hojas altas, y ese cambio se heredó','Las jirafas de cuello largo sobrevivieron mejor y dejaron más descendencia','Todas las jirafas son idénticas y no hay variación entre ellas']},
{t:'Selección natural',q:'¿Qué enunciado describe mejor la selección natural?',o:['Los individuos cambian durante su vida según sus necesidades y transmiten ese cambio','Los individuos con variaciones favorables sobreviven y se reproducen más, y transmiten esos caracteres','La naturaleza decide qué caracteres debe tener una especie']},
{t:'Mendel',q:'Se cruzan dos plantas de guisante heterocigóticas (Aa × Aa), con A dominante sobre a. ¿Qué proporción de la descendencia mostrará el carácter recesivo?',o:['0 %','50 %','25 %']},
{t:'Ecosistemas',q:'En la cadena trófica hierba → conejo → zorro, ¿qué papel desempeña el conejo?',o:['Consumidor primario','Productor','Descomponedor']},
{t:'Cuidado del planeta',q:'¿Cuál de estas medidas contribuye mejor a una gestión sostenible de los residuos?',o:['Usar más envases desechables','Reducir, reutilizar y reciclar','Quemar los residuos al aire libre']}];
const SCH=[['r',0,0,300,132,'#ffffff'],['r',0,0,160,44,'#e8d9b0'],['r',0,44,160,44,'#c9a66b'],['r',0,88,160,44,'#9c7a4a'],['r',160,14,140,44,'#e8d9b0'],['r',160,58,140,44,'#c9a66b'],['r',160,102,140,30,'#9c7a4a'],['l',160,0,160,132,'#222222',3]];
const esc2=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const svg4=()=>'<svg viewBox="0 0 300 132" style="width:min(340px,80%);display:block;margin:10px 0;border:1px solid #888">'+SCH.map(s=>s[0]==='r'?'<rect x="'+s[1]+'" y="'+s[2]+'" width="'+s[3]+'" height="'+s[4]+'" fill="'+s[5]+'"/>':'<line x1="'+s[1]+'" y1="'+s[2]+'" x2="'+s[3]+'" y2="'+s[4]+'" stroke="'+s[5]+'" stroke-width="'+s[6]+'"/>').join('')+'</svg>';
function showTest(){go('test');renderTest()}
function renderTest(){const T=S.test,b=$('tscr');let h='';b.scrollTop=0;
 if(T.stage==='form'){b.innerHTML='<h2>Evaluación inicial</h2><p>Antes de empezar, escribe tus datos reales. Aparecerán en el documento que tendrás que enviar al profesor.</p><label>Nombre y apellidos<input id="tn" maxlength="60" autocomplete="off"></label><label>Curso y grupo<input id="tc" maxlength="20" autocomplete="off"></label><button id="tgo" class="btn" disabled>EMPEZAR</button>';
  const tn=$('tn'),tc=$('tc'),g=$('tgo');tn.value=T.nombre;tc.value=T.curso;const u=()=>{T.nombre=tn.value;T.curso=tc.value;g.disabled=!(tn.value.trim()&&tc.value.trim())};tn.oninput=tc.oninput=u;u();g.onclick=()=>{T.stage='q';T.i=0;renderTest()};return}
 if(T.stage==='q'){const q=TEST[T.i];b.innerHTML='<div class="pr">Pregunta '+(T.i+1)+' de 10 · '+esc2(q.t)+'</div><div class="bar2"><i style="width:'+((T.i+1)*10)+'%"></i></div><h3>'+esc2(q.q)+'</h3>'+(q.img?svg4():'')+
  q.o.map((o,k)=>'<button class="opt'+(T.ans[T.i]===k?' sel':'')+'" data-k="'+k+'"><b>'+'ABC'[k]+')</b> '+esc2(o)+'</button>').join('')+'<div class="nav"><button class="btn" id="tp"'+(T.i?'':' disabled')+'>ANTERIOR</button><button class="btn" id="tx">'+(T.i<9?'SIGUIENTE':'REVISAR')+'</button></div>';
  b.querySelectorAll('.opt').forEach(el=>el.onclick=()=>{T.ans[T.i]=+el.dataset.k;renderTest()});$('tp').onclick=()=>{T.i--;renderTest()};$('tx').onclick=()=>{if(T.i<9)T.i++;else T.stage='rev';renderTest()};return}
 if(T.stage==='rev'){const f=T.ans.includes(-1);b.innerHTML='<h2>Repaso</h2><p>Revisa tus respuestas. Pulsa en una pregunta para cambiarla.</p>'+TEST.map((q,n)=>'<button class="opt" data-n="'+n+'"><b>'+(n+1)+'.</b> '+esc2(q.t)+' — '+(T.ans[n]<0?'<span style="color:#b3261e">sin responder</span>':'respuesta <b>'+'ABC'[T.ans[n]]+'</b>')+'</button>').join('')+
  '<div class="nav"><button class="btn" id="tb">VOLVER</button><button class="btn" id="tf"'+(f?' disabled':'')+'>TERMINAR</button></div>'+(f?'<p class="sm">Debes responder todas las preguntas para terminar.</p>':'');
  b.querySelectorAll('.opt').forEach(el=>el.onclick=()=>{T.i=+el.dataset.n;T.stage='q';renderTest()});$('tb').onclick=()=>{T.i=9;T.stage='q';renderTest()};$('tf').onclick=()=>{T.stage='fin';renderTest()};return}
 b.innerHTML='<h2>Test terminado</h2><p>Has terminado el test. Pulsa en «Descargar» para bajar tu test ya rellenado y envía ese archivo al profesor: <strong>ma.argenteblanco@edu.gva.es</strong></p><div class="nav"><button class="btn" id="td">DESCARGAR</button><button class="btn" id="tk"'+(T.dl?'':' disabled')+'>CONTINUAR</button></div>'+(T.dl?'':'<p class="sm">Podrás continuar cuando hayas descargado el archivo. Si hace falta, puedes volver a pulsar «Descargar».</p>');
 $('td').onclick=dlPDF;$('tk').onclick=()=>showScene('lab')}
// PDF escrito a mano (Helvetica estándar, sin librerías ni internet)
const HW={' ':278,'!':278,'"':355,'#':556,'$':556,'%':889,'&':667,"'":191,'(':333,')':333,'*':389,'+':584,',':278,'-':333,'.':278,'/':278,':':278,';':278,'<':584,'=':584,'>':584,'?':556,'@':1015,'[':278,'\\':278,']':278,'^':469,'_':556,'`':333,'{':334,'|':260,'}':334,'~':584,'¿':611,'¡':333,'«':556,'»':556,'×':584};
const UP='ABCDEFGHIJKLMNOPQRSTUVWXYZ',UW=[667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611],LO='abcdefghijklmnopqrstuvwxyz',LW=[556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500];
function cw(ch){if(HW[ch])return HW[ch];if(ch>='0'&&ch<='9')return 556;const b=ch.normalize('NFD')[0];let i=UP.indexOf(b);if(i>=0)return UW[i];i=LO.indexOf(b);if(i>=0)return LW[i];return 556}
const PP=s=>String(s).replace(/→/g,'->').replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/[–—]/g,'-');
function makePDF(T){const L=50,TW=495,pages=[];let c=[],y=0;const fecha=new Date().toLocaleString('es-ES');
 const nu=()=>{if(c.length)pages.push(c.join('\n'));c=[];y=792};
 const px=s=>{let o='';for(const ch of PP(s)){o+=ch.charCodeAt(0)>255?'?':ch}return o.replace(/([\\()])/g,'\\$1')};
 const tx=(s,x,yy,fs,bd)=>c.push('BT /F'+(bd?2:1)+' '+fs+' Tf '+x.toFixed(1)+' '+yy.toFixed(1)+' Td ('+px(s)+') Tj ET');
 const sw=(s,fs)=>[...PP(s)].reduce((a,ch)=>a+cw(ch),0)*fs/1000;
 const wr=(s,fs,mw)=>{const o=[];let cur='';String(s).split(' ').forEach(w=>{const x=cur?cur+' '+w:w;if(sw(x,fs)>mw&&cur){o.push(cur);cur=w}else cur=x});if(cur)o.push(cur);return o};
 const rgb=h=>[1,3,5].map(i=>(parseInt(h.substr(i,2),16)/255).toFixed(3)).join(' ');
 nu();tx('Evaluación inicial - El enigma de Ajuez',L,y,16,1);y-=26;tx('Nombre y apellidos: '+T.nombre.trim(),L,y,11);y-=16;tx('Curso y grupo: '+T.curso.trim(),L,y,11);y-=16;tx('Fecha y hora: '+fecha,L,y,11);y-=12;
 c.push('0.5 w 0 G '+L+' '+y+' m '+(L+TW)+' '+y+' l S');y-=22;
 TEST.forEach((q,n)=>{const ql=wr(q.q,11,TW),ols=q.o.map((o,k)=>wr('ABC'[k]+') '+o,10.5,TW-28));
  const h=18+ql.length*14+(q.img?116:0)+ols.reduce((a,l)=>a+l.length*13+5,0)+12;if(y-h<50)nu();
  tx('Pregunta '+(n+1)+' - '+q.t,L,y,10,1);y-=16;ql.forEach(l=>{tx(l,L,y,11);y-=14});
  if(q.img){const s=.8,ox=L+10,oy=y;SCH.forEach(e=>{if(e[0]==='r')c.push(rgb(e[5])+' rg '+(ox+e[1]*s).toFixed(1)+' '+(oy-(e[2]+e[4])*s).toFixed(1)+' '+(e[3]*s).toFixed(1)+' '+(e[4]*s).toFixed(1)+' re f');else c.push(rgb(e[5])+' RG '+e[6]+' w '+(ox+e[1]*s).toFixed(1)+' '+(oy-e[2]*s).toFixed(1)+' m '+(ox+e[3]*s).toFixed(1)+' '+(oy-e[4]*s).toFixed(1)+' l S')});c.push('0 g 0 G');y-=(132*s+18)}
  ols.forEach((ls,k)=>{const sel=T.ans[n]===k;if(sel)c.push('0 g '+(L+8)+' '+(y-1)+' 9 9 re f');else c.push('0.7 w 0 G '+(L+8)+' '+(y-1)+' 9 9 re S');ls.forEach(l=>{tx(l,L+28,y,10.5);y-=13});y-=5});y-=12});
 pages.push(c.join('\n'));
 const ob=[null,'<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids ['+pages.map((_,i)=>(5+2*i)+' 0 R').join(' ')+'] /Count '+pages.length+' >>','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'];
 pages.forEach((p,i)=>{ob[5+2*i]='<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents '+(6+2*i)+' 0 R >>';ob[6+2*i]='<< /Length '+p.length+' >>\nstream\n'+p+'\nendstream'});
 let out='%PDF-1.4\n';const off=[];for(let i=1;i<ob.length;i++){off[i]=out.length;out+=i+' 0 obj\n'+ob[i]+'\nendobj\n'}
 const xr=out.length;out+='xref\n0 '+ob.length+'\n0000000000 65535 f \n'+off.slice(1).map(o=>String(o).padStart(10,'0')+' 00000 n \n').join('')+'trailer\n<< /Size '+ob.length+' /Root 1 0 R >>\nstartxref\n'+xr+'\n%%EOF';
 return Uint8Array.from(out,ch=>ch.charCodeAt(0)&255)}
function dlPDF(){const T=S.test,a=document.createElement('a');a.href=URL.createObjectURL(new Blob([makePDF(T)],{type:'application/pdf'}));a.download='ESAA_test_'+T.nombre.trim().replace(/[^\wÀ-ÿ]+/g,'_')+'.pdf';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),3000);T.dl=true;renderTest()}
// ---- Guardado ----
const snap=()=>({v:1,sex:S.sex,name:S.name,phone:S.phone,phoneRead:S.phoneRead,disc:S.disc,pres:S.pres,maletin:S.maletin,items:S.items,labIntro:S.labIntro,test:S.test,scr:(x=>x==='room'?'room':(x==='map'||x==='roomBlack')?'map':x==='sc_cocina'?'cocina':x==='sc_comun'?'comun':x==='sc_lab'?'lab':x==='test'?'test':'intro')(cur==='phone'?PREV:cur)});
function restore(o){
 if(!o||o.v!==1||!['chico','chica'].includes(o.sex)||typeof o.name!=='string'||!o.name.trim())return false;
 const d=new Set(INIT_DISC);if(Array.isArray(o.disc))o.disc.forEach(x=>{if(typeof x==='string'&&LBL[x])d.add(x)});
 S={sex:o.sex,name:o.name.trim().slice(0,20),phone:o.phone===true||o.phoneRead===true,phoneRead:o.phoneRead===true,disc:[...d],pres:o.pres===true,labIntro:o.labIntro===true,test:cleanTest(o.test),maletin:o.maletin===true,items:o.maletin===true?['barra','alicates']:[]};if(S.pres)S.disc.push('lab');
 if(o.scr==='room')showRoom();else if(o.scr==='map')showMap();else if(o.scr==='cocina'||o.scr==='comun'||o.scr==='lab')showScene(o.scr);else if(o.scr==='test')showTest();else beginComic();return true}
function noGame(){if(!S.name){msg('Todavía no hay ninguna partida que guardar.');return true}return false}
const SUPA_URL='https://fvqyzlogbqbfjnzzbrwj.supabase.co';
const SUPA_KEY='sb_publishable_S9EOtgX8zMrHsm9Iw5X0tA_UIrRe8ga';
const sb=window.supabase?window.supabase.createClient(SUPA_URL,SUPA_KEY):null;
let sbUid=null;
async function initAuth(){
 if(!sb)return null;
 try{
  const{data:{session}}=await sb.auth.getSession();
  if(session?.user){sbUid=session.user.id;return sbUid}
  const{data,error}=await sb.auth.signInAnonymously();
  if(!error&&data?.user)sbUid=data.user.id;
 }catch(e){}
 return sbUid;
}
async function saveCloud(silent=false){
 if(noGame()||!sb)return false;
 const uid=sbUid||await initAuth();
 if(!uid)return false;
 try{
  const{error}=await sb.from('partidas').upsert({
   user_id:uid,
   nombre:S.name,
   estado:snap(),
   updated_at:new Date().toISOString()
  },{onConflict:'user_id'});
  if(!error&&!silent)msg('Partida guardada en la nube y en este navegador.');
  return !error;
 }catch(e){return false}
}
async function loadCloud(){
 if(!sb)return null;
 const uid=sbUid||await initAuth();
 if(!uid)return null;
 try{
  const{data,error}=await sb.from('partidas').select('estado').eq('user_id',uid).maybeSingle();
  if(!error&&data?.estado)return data.estado;
 }catch(e){}
 return null;
}
function saveLocal(){if(noGame())return;let okLocal=false;try{localStorage.setItem(KEY,JSON.stringify(snap()));okLocal=true}catch(e){}saveCloud(false).then(okCloud=>{if(!okCloud&&okLocal)msg('Partida guardada en este navegador.');else if(!okCloud&&!okLocal)msg('No se ha podido guardar. Puedes exportar la partida.')})}
async function loadLocal(){
 const cloud=await loadCloud();
 if(cloud&&restore(cloud))return;
 try{if(!restore(JSON.parse(localStorage.getItem(KEY))))msg('La partida guardada no es válida.')}catch(e){msg('No se ha podido cargar la partida guardada.')}
}
function exportGame(){if(noGame())return;const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(snap())],{type:'application/json'}));
 a.download='ESAA_partida_'+S.name.replace(/[^\w\-]+/g,'_')+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),2000);msg('Partida exportada: se ha descargado el archivo.')}
function importGame(inp){const f=inp.files[0];inp.value='';if(!f)return;const r=new FileReader();
 r.onload=()=>{let ok=false;try{ok=restore(JSON.parse(r.result))}catch(e){}if(ok){saveCloud(true);msg('Partida importada.')}else msg('El archivo no es una partida válida.')};r.readAsText(f)}
try{if(localStorage.getItem(KEY))$('contBtn').style.display='inline-block'}catch(e){}
initAuth().then(async uid=>{if(uid&&await loadCloud())$('contBtn').style.display='inline-block'});
