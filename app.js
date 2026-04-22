
// Tab switching
var CUR='overview';
var SM={overview:'s-overview',map:'s-map',budget:'s-budget',info:'s-info'};
function st(t){
  if(t===CUR)return;
  document.getElementById(SM[CUR]).classList.remove('on');
  document.getElementById('tab-'+CUR).classList.remove('on');
  document.getElementById(SM[t]).classList.add('on');
  document.getElementById('tab-'+t).classList.add('on');
  CUR=t;
  if(t==='budget')rb();
}

// Day switching
function sd(i){
  document.querySelectorAll('.dst').forEach(function(e,j){e.classList.toggle('on',i===j);});
  document.querySelectorAll('.dp').forEach(function(e,j){e.classList.toggle('on',i===j);});
  document.getElementById('s-overview').scrollTop=0;
}

// Location data
var LD={
  'Ban That Thong':{desc:'曼谷朱拉隆功大學附近的老街，聚集了大量機車修車廠、五金零件店，地面佈滿機油痕跡。',tips:['利用地面黑油反光拍出低角度鏡面倒影','尋找修車師傅專注工作的臉部特寫','逆光拍攝零件架構成強烈幾何感'],time:'下午 3–5 點，陽光斜射帶出金屬光澤',tr:'MRT 藍線|#1A3E8F|Sam Yan|步行約 10 分鐘'},
  'Ban That Thong 夜拍':{desc:'入夜後路邊攤全面展開，霓虹燈與攤車燈光交錯，人潮密集，充滿壓迫感與生命力。',tips:['用慢速快門拍出人流動態殘影','霓虹燈招牌作為背景製造色彩壓迫感','尋找攤販與顧客之間的眼神互動'],time:'晚上 7–10 點，攤販全開、人潮最旺',tr:'MRT 藍線|#1A3E8F|Sam Yan|步行約 10 分鐘'},
  'Chula 巷弄':{desc:'朱拉隆功大學周邊巷弄，老咖啡館、書店與學生聚集的小吃攤並排，新舊世代交疊共存。',tips:['拍攝老店招牌與年輕學生的對比構圖','窄巷利用兩側建築製造強烈透視線','傍晚燈光亮起前後的轉換光線'],time:'下午 4–6 點，學生下課時段最有人氣',tr:'MRT 藍線|#1A3E8F|Sam Yan|步行約 5 分鐘'},
  'Talat Noi':{desc:'曼谷最古老的社區之一，打鐵舖、舊機械店與百年老建築密集，時間在此彷彿靜止。',tips:['拍攝鐵匠揮錘的動態瞬間搭配火花','老建築剝落牆面的細節紋理特寫','透過窄巷框景拍攝遠處河岸'],time:'清晨 8–10 點，工匠開工、光線柔和',tr:'MRT 藍線|#1A3E8F|Hua Lamphong|步行約 15 分鐘'},
  'Song Wat Road':{desc:'沿河的歷史街道，文青咖啡館與創意店進駐，百年倉庫旁停著復古腳踏車，新舊並存張力十足。',tips:['老倉庫磚牆與現代裝置的並置構圖','街道上的光影條紋利用建築間隙製造','尋找新舊招牌重疊的有趣畫面'],time:'下午 2–4 點，側光照射老建築最立體',tr:'MRT 藍線|#1A3E8F|Hua Lamphong|步行約 10 分鐘'},
  'Yaowarat 唐人街':{desc:'東南亞最大唐人街之一，金色招牌、霓虹燈與海鮮攤車從傍晚開始燃亮，光線層次極為豐富。',tips:['日落後藍調時刻拍攝霓虹燈倒影','長焦壓縮街道縱深感製造招牌堆疊','捕捉海鮮攤現場交易的手部特寫'],time:'日落前後 30 分鐘藍調最美，入夜後霓虹全開',tr:'MRT 藍線|#1A3E8F|Wat Mangkon|出站即達'},
  'Pak Khlong Talat 花市':{desc:'曼谷最大花卉批發市場，凌晨開始運作，暖黃燈光下花海與搬運工人形成強烈視覺對比。',tips:['低角度拍攝花束與工人腿部的並置','暖色燈光下花卉色彩飽和度極高','搬運工人扛著大束鮮花的側影剪裁'],time:'深夜 11 點至凌晨 2 點，交貨高峰期',tr:'MRT 藍線|#1A3E8F|Sanam Chai|步行約 10 分鐘'},
  '美功鐵道市場':{desc:'火車每天數次穿越市集，攤販迅速收起遮陽棚讓火車通過，危險與秩序並存的奇景舉世聞名。',tips:['站在鐵軌正面拍攝火車逼近的壓迫感','攤販收棚瞬間的連拍記錄','火車通過後人潮恢復的動態對比'],time:'配合火車時刻表，約 08:30 / 11:10 / 14:30 / 17:40',tr:'BTS 淺綠線|#54B948|Ekkamai|轉小巴車程約 1 小時'},
  '安帕瓦水上市場':{desc:'距曼谷約 80 公里，木造房屋沿運河而建，船上販售現煮食物，傍晚螢火蟲季節更為壯觀。',tips:['搭船拍攝兩岸倒影與水面波紋','煮食攤的蒸氣煙霧製造神秘氛圍','傍晚逆光拍攝船隻剪影'],time:'下午 3 點後市場熱鬧，傍晚光線最美',tr:'包車從曼谷出發||車程約 1.5 小時|'},
  'Nang Loeng 市場':{desc:'曼谷保存最完整的百年傳統市場，木造攤位、老字號小吃與在地居民構成靜謐的人文風景。',tips:['拍攝老攤主與陳舊攤位的時間感','市場內穿透屋頂的光束製造戲劇光影','記錄老顧客熟悉的日常互動'],time:'早上 8–11 點，早市最熱鬧',tr:'MRT 藍線|#1A3E8F|Sam Yot|步行約 15 分鐘'},
  'BACC 曼谷文化藝術中心':{desc:'曼谷市中心當代藝術中心，中庭白色螺旋樓梯是極簡主義攝影的經典場景，幾何感強烈。',tips:['從樓梯底部仰拍螺旋圓形構圖','利用欄杆線條製造重複韻律感','人物置於幾何中心點綴空間尺度'],time:'開館後早上人少，光線均勻最適合建築攝影',tr:'BTS 淺綠線|#54B948|National Stadium|步行約 3 分鐘'},
  'Chatuchak 市場':{desc:'全球最大的週末市集之一，超過 15,000 個攤位，色彩繽紛、品類龐雜，混亂中自有秩序。',tips:['拍攝攤位色彩層疊的大景俯瞰','店主與商品的人物環境肖像','窄通道人流與懸掛商品的壓迫感'],time:'開市後早上 9–11 點，午後悶熱人潮稍退',tr:'BTS 淺綠線|#54B948|Mo Chit|步行約 3 分鐘'},
  'Or Tor Kor 市場':{desc:'緊鄰 Chatuchak 的高端食材市場，陳列精緻、品質頂尖，與周邊庶民市場形成強烈階級對比。',tips:['精緻蔬果陳列的靜物式構圖','攤位燈光製造高飽和食材色彩','與 Chatuchak 混亂形成對比的乾淨畫面'],time:'下午 3–6 點，採買人潮開始聚集',tr:'BTS 淺綠線|#54B948|Mo Chit|步行約 5 分鐘'},
  'Dusit Central Park':{desc:'曼谷新開發的都市公園，現代景觀步道緊鄰高樓群，自然與城市天際線形成強烈視覺對比。',tips:['廣角拍攝公園綠意與玻璃帷幕大樓的對比','步道的透視線引導視線至遠處建築','黃昏光線讓建築立面染成暖色'],time:'下午 3–5 點，陽光角度最佳',tr:'BTS 深綠線|#007B40|Sala Daeng|步行約 10 分鐘'},
  'Benjakitti Forest Park':{desc:'曼谷市中心城市森林公園，環湖步道圍繞大片水面，城市天際線倒映湖中，是都市中的綠色喘息地。',tips:['湖面倒影拍攝城市天際線的鏡像構圖','日落前黃金光線穿透樹隙的丁達爾效應','晨霧或雨後的霧氣製造夢幻氛圍'],time:'日落前 1 小時，光線角度低且色溫暖',tr:'BTS 淺綠線|#54B948|Asok|步行約 5 分鐘'},
  'Mahanakhon Skywalk':{desc:'曼谷最高觀景台 314 公尺，透明玻璃地板天台可俯瞰整個曼谷城市幾何網格，日落與藍調時刻絕美。',tips:['透明地板製造懸空感的垂直構圖','藍調時刻城市燈光與天空色彩漸層','長曝光拍攝城市車流光軌'],time:'日落前 30 分鐘入場，可同時拍到日落藍調夜景三段光線',tr:'BTS 深綠線|#007B40|Chong Nonsi|步行約 5 分鐘'},
  'SW1 Market':{desc:'Sathorn 區的文青夜市，獨立品牌、街頭美食與現場音樂聚集，是曼谷年輕創意族群的聚集地。',tips:['攤位彩燈與人群的散景光點背景','拍攝年輕買家與獨立品牌商品的互動','夜市燈光下的食物特寫'],time:'晚上 6–9 點，人潮最旺',tr:'BTS 深綠線|#007B40|Surasak|步行約 10 分鐘'},
  'Wongwian Yai 車站':{desc:'曼谷西岸的老火車站，通勤族、市場攤販與學生在此交匯，是真實在地生活的縮影。',tips:['月台上等車人群的側面長焦壓縮','火車進站的動態模糊與靜止人物對比','站內老舊設施與現代手機的時代對比'],time:'早上 7–9 點通勤高峰，人流與光線俱佳',tr:'BTS 深綠線|#007B40|Wongwian Yai|出站即達'},
  'Tha Tian 市場':{desc:'鄭王廟碼頭旁的傳統市場，魚乾、乾貨與香料攤位密集，粗糙真實的市井氣息撲面而來。',tips:['魚乾攤位色彩與紋理的靜物構圖','攤販整理貨物時的手部動態特寫','碼頭方向的逆光剪影'],time:'清晨 6–9 點，漁貨最新鮮、攤販最忙碌',tr:'MRT 藍線|#1A3E8F|Sanam Chai|步行約 10 分鐘'},
  'Nextopia（Siam Paragon）':{desc:'Siam Paragon 內的未來感展示空間，大量反光金屬與科技裝置，與曼谷傳統市場形成極端的視覺對比。',tips:['金屬反射面拍攝扭曲變形的環境映像','強烈人工光源製造科技感冷色調','廣角拍攝挑高空間的幾何線條'],time:'平日下午人少，可從容構圖',tr:'BTS 淺綠線|#54B948|Siam|直接連通'},
  '鄭王廟對岸':{desc:'從河對岸望向鄭王廟（Wat Arun），夕陽西下時廟塔剪影映照昭披耶河，是曼谷最經典的靜態收尾場景。',tips:['日落剪影拍攝廟塔與河面反光','長焦壓縮對岸廟塔與渡船的層次','等待渡船入畫作為前景點綴'],time:'日落前 30 分鐘至日落後 15 分鐘，光線最戲劇化',tr:'MRT 藍線|#1A3E8F|Sanam Chai|步行至碼頭搭渡船'},
  'Khlong Toei 市場':{desc:'曼谷最大的生鮮批發市場，清晨搬運工人穿梭、叫賣聲震天，原始的人文張力是曼谷最真實的一面。',tips:['搬運工扛貨的力量感側面構圖','市場通道煙霧與濕地的環境感','魚販肉販工作中的臉部表情特寫'],time:'清晨 5–8 點，批發交易高峰',tr:'MRT 藍線|#1A3E8F|Khlong Toei|步行約 5 分鐘'}
};
function os(name,theme){
  var d=LD[name]||{};
  document.getElementById('sn').textContent=name;
  document.getElementById('sth').textContent=theme||'';
  var tips=(d.tips||[]).map(function(t){return '<div class="tpr"><span class="tpd">◆</span><span class="tpt">'+t+'</span></div>';}).join('');
  var tr='';
  if(d.tr){var p=d.tr.split('|');if(p[1]){tr='搭 <span class="tbdg" style="background:'+p[1]+'">'+p[0]+'</span> 至 <b>'+p[2]+'</b> 站，'+p[3];}else{tr=p[0];}}
  document.getElementById('sb').innerHTML=
    '<div class="st">地點概述</div><div class="sb2">'+(d.desc||'—')+'</div>'+
    '<div class="st" style="margin-top:4px">📷 拍攝技巧</div>'+(tips||'—')+
    '<div class="st" style="margin-top:12px">⏰ 最佳時段</div><div class="sb2">'+(d.time||'—')+'</div>'+
    '<div class="st" style="margin-top:4px">🚇 交通</div><div class="sb2">'+tr+'</div>';
  // override sb2 style inline
  document.querySelectorAll('#sb .sb2').forEach(function(e){e.style.cssText='font-size:12px;color:#6B6560;line-height:1.75;margin-bottom:16px;';});
  document.getElementById('bkdrop').classList.add('on');
  document.getElementById('sht').classList.add('on');
  document.getElementById('sb').scrollTop=0;
}
function cs(){
  document.getElementById('bkdrop').classList.remove('on');
  document.getElementById('sht').classList.remove('on');
}

// Map
(function(){
  var box=document.getElementById('mapbox'),img=document.getElementById('mapimg');
  var sc=1,tx=0,ty=0,MAX=6;
  function cl(v,a,b){return Math.min(Math.max(v,a),b);}
  function ap(sm){
    var vw=box.offsetWidth,vh=box.offsetHeight,iw=img.naturalWidth||880,ih=img.naturalHeight||1244;
    var rw=vw*sc,rh=vw*(ih/iw)*sc;
    tx=cl(tx,Math.min(0,vw-rw),0);ty=cl(ty,Math.min(0,vh-rh),0);
    img.style.transition=sm?'transform .18s ease':'none';
    img.style.transform='translate('+tx+'px,'+ty+'px) scale('+sc+')';
  }
  function za(px,py,f){var ns=cl(sc*f,1,MAX);tx=px-(px-tx)*(ns/sc);ty=py-(py-ty)*(ns/sc);sc=ns;ap(true);}
  var dg=false,sx,sy,mvx=0,mvy=0,lt=0,lx=0,ly=0,lt2=null,raf=null;
  function mo(){cancelAnimationFrame(raf);var d=.88;(function t(){if(Math.abs(mvx)<.3&&Math.abs(mvy)<.3)return;tx+=mvx;ty+=mvy;mvx*=d;mvy*=d;ap(false);raf=requestAnimationFrame(t);})();}
  box.addEventListener('touchstart',function(e){cancelAnimationFrame(raf);mvx=mvy=0;if(e.touches.length===1){dg=true;sx=e.touches[0].clientX-tx;sy=e.touches[0].clientY-ty;lx=e.touches[0].clientX;ly=e.touches[0].clientY;lt=Date.now();}else{dg=false;lt2=e.touches;}e.preventDefault();},{passive:false});
  box.addEventListener('touchmove',function(e){if(e.touches.length===1&&dg){var now=Date.now(),nx=e.touches[0].clientX,ny=e.touches[0].clientY,dt=Math.max(now-lt,1);mvx=(nx-lx)/dt*12;mvy=(ny-ly)/dt*12;lx=nx;ly=ny;lt=now;tx=nx-sx;ty=ny-sy;ap(false);}else if(e.touches.length===2&&lt2){var t0=e.touches[0],t1=e.touches[1],p0=lt2[0],p1=lt2[1];var pd=Math.hypot(p0.clientX-p1.clientX,p0.clientY-p1.clientY),cd=Math.hypot(t0.clientX-t1.clientX,t0.clientY-t1.clientY);var mx=(t0.clientX+t1.clientX)/2,my=(t0.clientY+t1.clientY)/2,r=box.getBoundingClientRect();za(mx-r.left,my-r.top,cd/pd);tx+=(mx-(p0.clientX+p1.clientX)/2);ty+=(my-(p0.clientY+p1.clientY)/2);lt2=e.touches;ap(false);}e.preventDefault();},{passive:false});
  box.addEventListener('touchend',function(e){dg=false;lt2=e.touches.length?e.touches:null;mo();});
  box.addEventListener('mousedown',function(e){cancelAnimationFrame(raf);mvx=mvy=0;dg=true;sx=e.clientX-tx;sy=e.clientY-ty;lx=e.clientX;ly=e.clientY;lt=Date.now();});
  window.addEventListener('mousemove',function(e){if(!dg)return;var now=Date.now(),dt=Math.max(now-lt,1);mvx=(e.clientX-lx)/dt*12;mvy=(e.clientY-ly)/dt*12;lx=e.clientX;ly=e.clientY;lt=now;tx=e.clientX-sx;ty=e.clientY-sy;ap(false);});
  window.addEventListener('mouseup',function(){if(dg){dg=false;mo();}});
  box.addEventListener('wheel',function(e){e.preventDefault();var r=box.getBoundingClientRect();za(e.clientX-r.left,e.clientY-r.top,e.deltaY<0?1.12:.9);},{passive:false});
  document.getElementById('zi').onclick=function(){var r=box.getBoundingClientRect();za(r.width/2,r.height/2,1.35);};
  document.getElementById('zo').onclick=function(){var r=box.getBoundingClientRect();za(r.width/2,r.height/2,1/1.35);};
  document.getElementById('zr').onclick=function(){sc=1;tx=0;ty=0;ap(true);};
})();

// Budget
var CC={'🍜':'#FFF3E0','🚇':'#E3F2FD','🏨':'#F3E5F5','🛍️':'#FCE4EC','📷':'#E8F5E9','💊':'#F5F5F5'};
var CN={'🍜':'餐飲','🚇':'交通','🏨':'住宿','🛍️':'購物','📷':'票券','💊':'其他'};
function gi(){try{return JSON.parse(localStorage.getItem('bkk26')||'[]');}catch(e){return [];}}
function si(a){try{localStorage.setItem('bkk26',JSON.stringify(a));}catch(e){}}
function addI(){
  var amt=parseFloat(document.getElementById('ba').value);
  if(!amt||amt<=0){var el=document.getElementById('ba');el.style.borderColor='#e53';setTimeout(function(){el.style.borderColor='';},800);return;}
  var note=document.getElementById('bn').value.trim(),cat=document.getElementById('bc').value,day=document.getElementById('bd').value;
  var items=gi();
  items.unshift({id:Date.now(),amt:amt,note:note||(CN[cat]||'消費'),cat:cat,day:day,ts:new Date().toLocaleTimeString('zh-TW',{hour:'2-digit',minute:'2-digit'})});
  si(items);document.getElementById('ba').value='';document.getElementById('bn').value='';rb();
}
function di(id){si(gi().filter(function(i){return i.id!==id;}));rb();}
function rb(){
  var items=gi();
  var total=items.reduce(function(s,i){return s+i.amt;},0);
  var today=items.filter(function(i){return i.day==='11/5';}).reduce(function(s,i){return s+i.amt;},0);
  document.getElementById('tA').textContent='฿'+Math.round(total).toLocaleString();
  document.getElementById('tdA').textContent='฿'+Math.round(today).toLocaleString();
  document.getElementById('tC').textContent=items.length;
  var list=document.getElementById('bl');
  if(!items.length){list.innerHTML='<div class="bemp"><div class="bemp-i">💰</div>還沒有記錄，開始記帳吧！</div>';return;}
  var html='',cur='';
  items.forEach(function(item){
    if(item.day!==cur){cur=item.day;var dt=items.filter(function(i){return i.day===cur;}).reduce(function(s,i){return s+i.amt;},0);html+='<div class="bdh"><span>'+cur+'</span><span>฿'+Math.round(dt).toLocaleString()+'</span></div>';}
    html+='<div class="bitem"><div class="bcat" style="background:'+(CC[item.cat]||'#f5f5f5')+'">'+item.cat+'</div><div class="binfo"><div class="bnote">'+item.note+'</div><div class="bmeta">'+item.day+' · '+item.ts+'</div></div><div class="bamt">฿'+item.amt.toLocaleString()+'</div><button class="bdel" onclick="di('+item.id+')">✕</button></div>';
  });
  list.innerHTML=html;
}
rb();
