import{d as T,aL as v,h as b,c as q,a as F,i as P,j as _,k as w,b as R,w as Z,V as U,G as W,o as g,a5 as Y,g as $,r as E,z as X,a$ as J,Y as K,y as G,t as Q}from"./index-8c4b8b6b.js";import{u as k,a_ as L,aW as O,aX as A,aY as S,aZ as B,a$ as I}from"./installCanvasRenderer-3ce2e16e.js";import{k as M,f as D,l as V,g as tt,m as j,h as et,j as ot}from"./chartZoom-888b3aed.js";function at(i,o){const n=Math.min(...i),u=(Math.max(...i)-n)*1.01/o,l=[...Array(o).keys()].map(t=>[Math.round((n+t*u)*1e3)/1e3,0]);for(let t=0;t<i.length;t++){const r=Math.min(Math.floor((i[t]-n)/u),o-1);isNaN(r)||l[r][1]++}return l}const st={class:"d-flex flex-column h-100 position-relative"},rt={class:"flex-grow-1 order-2"},x="Trade count",nt=T({__name:"ProfitDistributionChart",props:{trades:{required:!0,type:Array},showTitle:{default:!0,type:Boolean}},setup(i){const o=i;k([M,L,O,D,A,S,B]);const n=v(),p=[10,15,20,25,50],u=b(()=>{const t=o.trades.map(r=>r.profit_ratio);return at(t,n.profitDistributionBins)}),l=b(()=>({title:{text:"Profit distribution",show:o.showTitle},backgroundColor:"rgba(0, 0, 0, 0)",dataset:{source:u.value},tooltip:{trigger:"axis",axisPointer:{type:"line",label:{backgroundColor:"#6a7985"}}},legend:{data:[x],right:"5%",selectedMode:!1},xAxis:{type:"category",name:"Profit %",nameLocation:"middle",nameGap:25},yAxis:[{type:"value",name:x,splitLine:{show:!1},nameRotate:90,nameLocation:"middle",nameGap:35,position:"left"}],series:[{type:"bar",name:x,animation:!0,encode:{x:"x0",y:"y0"}}]}));return(t,r)=>{const y=Y,e=W;return g(),q("div",st,[F("div",rt,[i.trades?(g(),P(_(I),{key:0,option:l.value,autoresize:"",theme:_(n).chartTheme},null,8,["option","theme"])):w("",!0)]),R(e,{class:U(["order-1",i.showTitle?"ms-5 ps-5":"position-absolute"]),label:"Bins",style:{width:"33%","min-width":"12rem"},"label-for":"input-bins","label-cols":"6","content-cols":"6",size:"sm"},{default:Z(()=>[R(y,{id:"input-bins",modelValue:_(n).profitDistributionBins,"onUpdate:modelValue":r[0]||(r[0]=a=>_(n).profitDistributionBins=a),size:"sm",class:"mt-1",options:p},null,8,["modelValue"])]),_:1},8,["class"])])}}});const mt=$(nt,[["__scopeId","data-v-1dc7de89"]]),C="Profit",it=T({__name:"CumProfitChart",props:{trades:{required:!0,type:Array},openTrades:{required:!1,type:Array,default:()=>[]},showTitle:{default:!0,type:Boolean},profitColumn:{default:"profit_abs",type:String}},setup(i){const o=i;k([M,V,L,O,D,tt,A,S,B]);const n=v(),p=E(),u=b(()=>o.openTrades.reduce((e,a)=>e+(a.total_profit_abs??a[o.profitColumn]??0),0)),l=b(()=>{const e=[],a={},h=o.trades.slice().sort((c,d)=>c.close_timestamp>d.close_timestamp?1:-1);let m=0;for(let c=0,d=h.length;c<d;c+=1){const s=h[c];s.close_timestamp&&s[o.profitColumn]&&(m+=s[o.profitColumn],a[s.close_timestamp]?(a[s.close_timestamp].profit+=s[o.profitColumn],a[s.close_timestamp][s.botId]?a[s.close_timestamp][s.botId]+=s[o.profitColumn]:a[s.close_timestamp][s.botId]=m):a[s.close_timestamp]={profit:m,[s.botId]:m},e.push({date:s.close_timestamp,profit:m,[s.botId]:m}))}const f=Object.entries(a).map(([c,d])=>({date:parseInt(c,10),profit:d.profit}));if(o.openTrades.length>0){let c=0,d=0;if(f.length>0){const z=f[f.length-1];c=z.profit??0,d=z.date??0}else d=o.openTrades[0].open_timestamp;const s=(c??0)+u.value;f.push({date:d,currentProfit:c});const H=Date.now()+24*60*60*1e3;f.push({date:H,currentProfit:s})}return f});function t(e=!1){return{dataset:{dimensions:["date","profit","currentProfit"],source:l.value},series:[{type:"line",name:"currentProfit",animation:e,lineStyle:{color:u.value>0?"green":"red",type:"dotted"},itemStyle:{color:u.value>0?"green":"red"},encode:{x:"date",y:"currentProfit"}},{type:"line",name:C,animation:e,step:"end",lineStyle:{color:n.chartTheme==="dark"?"#c2c2c2":"black"},itemStyle:{color:n.chartTheme==="dark"?"#c2c2c2":"black"},encode:{x:"date",y:"profit"}}]}}function r(e=!1){var h;const a=t(e);(h=p.value)==null||h.setOption(a,{replaceMerge:["series","dataset"],noMerge:!e})}function y(){var h,m;(h=p.value)==null||h.setOption({},{noMerge:!0});const e={title:{text:"Cumulative Profit",show:o.showTitle},backgroundColor:"rgba(0, 0, 0, 0)",tooltip:{trigger:"axis",formatter:f=>{const c=f[0].data.profit,d=f[0].data.currentProfit;return d?`Projected profit (incl. unrealized): ${G(d,3)}`:`Profit: ${G(c,3)}`},axisPointer:{type:"line",label:{backgroundColor:"#6a7985"}}},legend:{data:[C],right:"5%",selectedMode:!1},useUTC:!1,xAxis:{type:"time"},yAxis:[{type:"value",name:C,splitLine:{show:!1},nameRotate:90,nameLocation:"middle",nameGap:40}],grid:{bottom:80},dataZoom:[{type:"inside",start:0,end:100},{bottom:10,start:0,end:100,...j}]},a=t(!0);e.series=a.series,e.dataset=a.dataset,(m=p.value)==null||m.setOption(e,{noMerge:!0}),r(!0)}return X(()=>{y()}),J(()=>o.openTrades,()=>{r()},{throttle:60*1e3}),K(()=>o.trades,()=>{r()}),(e,a)=>i.trades?(g(),P(_(I),{key:0,ref_key:"chart",ref:p,autoresize:"","manual-update":"",theme:_(n).chartTheme},null,8,["theme"])):w("",!0)}});const ft=$(it,[["__scopeId","data-v-264732c6"]]),N="Profit %",lt="#9be0a8",ct=T({__name:"TradesLog",props:{trades:{required:!0,type:Array},showTitle:{default:!0,type:Boolean}},setup(i){const o=i;k([M,V,L,O,D,A,S,B,et,ot]);const n=v(),p=b(()=>{const l=[],t=o.trades.slice(0).sort((r,y)=>r.close_timestamp>y.close_timestamp?1:-1);for(let r=0,y=t.length;r<y;r+=1){const e=t[r],a=[r,(e.profit_ratio*100).toFixed(2),e.pair,e.botName,Q(e.close_timestamp),e.is_short===void 0||!e.is_short?"Long":"Short"];l.push(a)}return l}),u=b(()=>{const l=p.value.length>0?(1-50/p.value.length)*100:100;return{title:{text:"Trades log",show:o.showTitle},backgroundColor:"rgba(0, 0, 0, 0)",dataset:{dimensions:["date","profit"],source:p.value},tooltip:{trigger:"axis",formatter:t=>{const r=t[0].data[3]?` | ${t[0].data[3]}`:"";return`${t[0].data[2]} | ${t[0].data[5]} ${r}<br>${t[0].data[4]}<br>Profit ${t[0].data[1]} %`},axisPointer:{type:"line",label:{backgroundColor:"#6a7985"}}},xAxis:{type:"value",show:!1},yAxis:[{type:"value",name:N,splitLine:{show:!1},nameRotate:90,nameLocation:"middle",nameGap:30}],grid:{bottom:80},dataZoom:[{type:"inside",start:l,end:100},{bottom:10,start:l,end:100,...j}],visualMap:[{show:!0,seriesIndex:0,pieces:[{max:0,color:"#f84960"},{min:0,color:"#2ed191"}]}],series:[{type:"bar",name:N,barGap:"0%",barCategoryGap:"0%",animation:!1,label:{show:!0,position:"top",rotate:90,offset:[7.5,7.5],formatter:"{@[1]} %",color:n.chartTheme==="dark"?"#c2c2c2":"#3c3c3c"},encode:{x:0,y:1},itemStyle:{color:lt}}]}});return(l,t)=>i.trades.length>0?(g(),P(_(I),{key:0,option:u.value,autoresize:"",theme:_(n).chartTheme},null,8,["option","theme"])):w("",!0)}});const ht=$(ct,[["__scopeId","data-v-dd80fb73"]]);export{ft as C,mt as P,ht as T};
//# sourceMappingURL=TradesLog-ce01201a.js.map
