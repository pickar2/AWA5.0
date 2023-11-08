import{m as W,$ as qe,c as ve,a as Ye,s as Ce,b as A,D as he,d as Je,S as Ke,F as Xe,e as P,g as Z,f as G,i as R,t as ee,h as Qe,j as Ze,r as et,o as tt,k as rt}from"./entry-client-2bd57fa3.js";let d=function(e){return e[e.nop=0]="nop",e[e.prn=1]="prn",e[e.pr1=2]="pr1",e[e.red=3]="red",e[e.r3d=4]="r3d",e[e.blo=5]="blo",e[e.sbm=6]="sbm",e[e.pop=7]="pop",e[e.dpl=8]="dpl",e[e.srn=9]="srn",e[e.mrg=10]="mrg",e[e["4dd"]=11]="4dd",e[e.sub=12]="sub",e[e.mul=13]="mul",e[e.div=14]="div",e[e.cnt=15]="cnt",e[e.lbl=16]="lbl",e[e.jmp=17]="jmp",e[e.eql=18]="eql",e[e.lss=19]="lss",e[e.gr8=20]="gr8",e[e.clr=29]="clr",e[e.slp=30]="slp",e[e.trm=31]="trm",e}({});function nt(e){const r=[],t=e.replace(/[^aw]+/gi,"").toLowerCase().replaceAll("aa","a a");let n=0;for(;n<t.length-3;n++)if(t.substr(n,3)=="awa"){n+=3;break}if(n>=t.length-3)return r;let l=0,s=5,o=0,a=!1,u=!1;for(;n<t.length-1;)if(t.substr(n,2)=="wa"?(l==0&&u?o=-1:(o<<=1,o+=1),n+=2,l++):n<t.length-3&&t.substr(n,4)==" awa"?(l++,o<<=1,n+=4):n++,l>=s){if(r.push(o),l=0,a)s=5,a=!1,u=!1;else switch(o){case d.blo:case d.sbm:case d.srn:case d.lbl:case d.jmp:o==d.blo?(s=8,u=!0):(s=5,u=!1),a=!0;break}o=0}return r}let C=function(e){return e[e.Stopped=0]="Stopped",e[e.Paused=1]="Paused",e[e.Running=2]="Running",e}({});function k(e){return Array.isArray(e)}function Se(e){return new Promise(r=>setTimeout(r,e))}async function ot(e,r,t,n,l,s){const o=()=>s({...l(),state:C.Stopped}),a=nt(e),u=[],i=[];for(let c=0;c<a.length;c++)switch(a[c]){case d.lbl:u[a[c+1]]=c+1,c++;break;case d.blo:case d.sbm:case d.srn:case d.jmp:c++;break}let f=0,p=0;for(;f<a.length&&l().state!=C.Stopped;){switch(p++,p==5e3&&(await Se(0),p=0),a[f]){case d.nop:break;case d.prn:{const c=i.pop();if(typeof c>"u")break;r(xe("",c,!1));break}case d.pr1:{const c=i.pop();if(typeof c>"u")break;r(xe("",c,!0));break}case d.red:{const c=await n(),b=[];for(let v=c.length-1;v>=0;v--){const h=ge.indexOf(c.substr(v,1));h!=-1&&b.push(h)}i.push(b);break}case d.r3d:{const c=await n(),b=parseInt(c);i.push(b);break}case d.blo:{f++,i.push(a[f]);break}case d.sbm:{f++;const c=i.pop();if(typeof c>"u")break;a[f]==0?i.unshift(c):i.splice(i.length-a[f],0,c);break}case d.pop:{const c=i.pop();if(typeof c>"u")break;if(k(c))for(;;){const b=c.shift();if(typeof b>"u")break;i.push(b)}break}case d.dpl:{const c=structuredClone(i[i.length-1]);i.push(c);break}case d.srn:{f++;const c=[];for(let b=0;b<a[f];b++){const v=i.pop();if(typeof v>"u")break;c.unshift(v)}i.push(c);break}case d.mrg:{const c=i.pop(),b=i.pop();if(typeof c>"u"||typeof b>"u")break;const v=k(c),h=k(b);if(!v&&!h){const m=[];m.push(b),m.push(c),i.push(m)}else if(v&&!h)c.unshift(b),i.push(c);else if(!v&&h)b.push(c),i.push(b);else{for(;;){const m=c.shift();if(typeof m>"u")break;b.push(m)}i.push(b)}break}case d["4dd"]:{const c=i.pop(),b=i.pop();if(typeof c>"u"||typeof b>"u")break;i.push(de(c,b));break}case d.sub:{const c=i.pop(),b=i.pop();if(typeof c>"u"||typeof b>"u")break;i.push(fe(c,b));break}case d.mul:{const c=i.pop(),b=i.pop();if(typeof c>"u"||typeof b>"u")break;i.push(pe(c,b));break}case d.div:{const c=i.pop(),b=i.pop();if(typeof c>"u"||typeof b>"u")break;i.push(be(c,b));break}case d.cnt:{k(i[i.length-1])?i.push(i[i.length-1].length):i.push(0);break}case d.lbl:{f++;break}case d.jmp:{f++,a[f]in u&&(f=u[a[f]]);break}case d.eql:{if(!(!k(i[i.length-1])&&!k(i[i.length-2])&&i[i.length-1]==i[i.length-2]))switch(a[f+1]){case d.lbl:case d.blo:case d.sbm:case d.srn:case d.jmp:f+=2;break;default:f++;break}break}case d.lss:{if(!(!k(i[i.length-1])&&!k(i[i.length-2])&&i[i.length-1]<i[i.length-2]))switch(a[f+1]){case d.lbl:case d.blo:case d.sbm:case d.srn:case d.jmp:f+=2;break;default:f++;break}break}case d.gr8:{if(!(!k(i[i.length-1])&&!k(i[i.length-2])&&i[i.length-1]>i[i.length-2]))switch(a[f+1]){case d.lbl:case d.blo:case d.sbm:case d.srn:case d.jmp:f+=2;break;default:f++;break}break}case d.clr:{t("");break}case d.slp:{const c=i.pop();if(typeof c>"u"||k(c))break;await Se(c);break}case d.trm:{o();break}}f++}o()}function de(e,r){const t=k(e),n=k(r);if(!t&&!n)return e+r;if(t&&!n){const l=e;return l.forEach((s,o)=>{l[o]=de(s,r)}),e}else if(!t&&n){const l=r;return l.forEach((s,o)=>{l[o]=de(e,s)}),r}else{const l=e,s=r,o=[];let a=0;for(;a<l.length&&a<s.length;a++)o.unshift(de(l[l.length-1-a],s[s.length-1-a]));return o}}function fe(e,r){const t=k(e),n=k(r);if(!t&&!n)return e-r;if(t&&!n){const l=e;return l.forEach((s,o)=>{l[o]=fe(s,r)}),e}else if(!t&&n){const l=r;return l.forEach((s,o)=>{l[o]=fe(e,s)}),r}else{const l=e,s=r,o=[];let a=0;for(;a<l.length&&a<s.length;a++)o.unshift(fe(l[l.length-1-a],s[s.length-1-a]));return o}}function pe(e,r){const t=k(e),n=k(r);if(!t&&!n)return e*r;if(t&&!n){const l=e;return l.forEach((s,o)=>{l[o]=pe(s,r)}),e}else if(!t&&n){const l=r;return l.forEach((s,o)=>{l[o]=pe(e,s)}),r}else{const l=e,s=r,o=[];let a=0;for(;a<l.length&&a<s.length;a++)o.unshift(pe(l[l.length-1-a],s[s.length-1-a]));return o}}function be(e,r){const t=k(e),n=k(r),l=[];if(!t&&!n){const s=e,o=r;l.push(s%o);const a=s/o;return l.push(Math[a<0?"ceil":"floor"](a)),l}else if(t&&!n){const s=e;return s.forEach((o,a)=>{s[a]=be(o,r)}),e}else if(!t&&n){const s=r;return s.forEach((o,a)=>{s[a]=be(e,o)}),r}else{const s=e,o=r,a=[];let u=0;for(;u<s.length&&u<o.length;u++)a.unshift(be(s[s.length-1-u],o[o.length-1-u]));return a}}const ge=`AWawJELYHOSIUMjelyhosiumPCNTpcntBDFGRbdfgr0123456789 .,!'()~_/;
`;function xe(e,r,t){if(k(r)){const n=r;for(let l=n.length-1;l>=0;l--)e=xe(e,n[l],t);e+=" "}else{const n=r;t?e+=n+" ":n>=0&&n<ge.length&&(e+=ge[n])}return e}const w=(e,r,t)=>{let n="";t&&r--;for(let l=0;l<r;l++)n=(e&1?"wa":" awa")+n,e=e>>1;return t&&(n=(e<0?"wa":" awa")+n),n},st=e=>{const r=e.split(`
`);let t="awa";for(let n of r){n=n.trimStart();const l=n.indexOf("#");l!==-1&&(n=n.substring(0,l));const[s,o]=[n.substring(0,3),n.substring(4)];if(s==="")continue;const a=d[s];if(a&&(a!==d.blo&&(t+=`
 `+w(a,5,!1)),o!=="")){if(a==d.blo)if(o.startsWith('"')){const u=o.substring(1).indexOf('"');if(u!==-1&&o.length>2){const i={reverse:!1,surround:!1},f=o.substring(u+2);for(const v of f)v=="r"&&(i.reverse=!0),v=="s"&&(i.surround=!0);const p=o.substring(1,u+1).replaceAll(/\\n/g,`
`).split("");i.reverse&&p.reverse();let c=0,b=!1;for(const v of p)t+=`
 `+w(d.blo,5,!1),t+=w(ge.indexOf(v),8,!0),c++,i.surround&&c==31&&(t+=`
 `+w(d.srn,5,!1),t+=w(31,5,!1),b&&(t+=`
 `+w(d.mrg,5,!1)),b=!0,c=0);i.surround&&c!==31&&(t+=`
 `+w(d.srn,5,!1),t+=w(c,5,!1),b&&(t+=`
 `+w(d.mrg,5,!1)))}}else{let u=parseInt(o);if(u>=-128&&u<=127)t+=`
 `+w(d.blo,5,!1),t+=w(parseInt(o),8,!0);else{let i=0;const f=Math.sign(u);for(u=Math.abs(u);u>0;){t+=`
 `+w(d.blo,5,!1),t+=w(u&63,8,!0);for(let p=0;p<i;p++)t+=`
 `+w(d.blo,5,!1),t+=w(64,8,!0),t+=`
 `+w(d.mul,5,!1);i>0&&(t+=`
 `+w(d["4dd"],5,!1)),u=u>>6,i++}f<0&&(t+=`
 `+w(d.blo,5,!1),t+=w(-1,8,!0),t+=`
 `+w(d.mul,5,!1))}}(a==d.sbm||a==d.srn||a==d.lbl||a==d.jmp)&&(t+=w(parseInt(o),5,!1))}}return t},it=e=>{const r=e.replace(/[^aw]+/gi,"").toLowerCase().replaceAll("aa","a a"),t=r.indexOf("awa");if(t==-1)return"";const n="0".charCodeAt(0),l=r.substring(t+3).replaceAll(" awa","0").replaceAll("wa","1").split("").map(p=>p.charCodeAt(0)-n),s=[];let o=!0,a=!1,u=5,i=0;for(let p=0;p<l.length;p++)u--,a?(i=-l[p],a=!1):(i&=~(1<<u),i|=l[p]<<u),!(u>0)&&(s.push(i),o?i==d.sbm||i==d.srn||i==d.lbl||i==d.jmp?(u=5,o=!1,a=!1):i==d.blo?(u=8,o=!1,a=!0):(u=5,o=!0,a=!1):(u=5,o=!0,a=!1),i=0);let f="";for(let p=0;p<s.length;p++){const c=s[p];f+=d[c],(c==d.sbm||c==d.srn||c==d.lbl||c==d.jmp||c==d.blo)&&(p++,f+=" "+s[p]),f+=`
`}return f};function Ne(e){var r,t,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e))for(r=0;r<e.length;r++)e[r]&&(t=Ne(e[r]))&&(n&&(n+=" "),n+=t);else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}function Oe(){for(var e,r,t=0,n="";t<arguments.length;)(e=arguments[t++])&&(r=Ne(e))&&(n&&(n+=" "),n+=r);return n}const Ae="-";function lt(e){const r=ct(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:n}=e;function l(o){const a=o.split(Ae);return a[0]===""&&a.length!==1&&a.shift(),Be(a,r)||at(o)}function s(o,a){const u=t[o]||[];return a&&n[o]?[...u,...n[o]]:u}return{getClassGroupId:l,getConflictingClassGroupIds:s}}function Be(e,r){if(e.length===0)return r.classGroupId;const t=e[0],n=r.nextPart.get(t),l=n?Be(e.slice(1),n):void 0;if(l)return l;if(r.validators.length===0)return;const s=e.join(Ae);return r.validators.find(({validator:o})=>o(s))?.classGroupId}const $e=/^\[(.+)\]$/;function at(e){if($e.test(e)){const r=$e.exec(e)[1],t=r?.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}}function ct(e){const{theme:r,prefix:t}=e,n={nextPart:new Map,validators:[]};return dt(Object.entries(e.classGroups),t).forEach(([s,o])=>{we(o,n,s,r)}),n}function we(e,r,t,n){e.forEach(l=>{if(typeof l=="string"){const s=l===""?r:_e(r,l);s.classGroupId=t;return}if(typeof l=="function"){if(ut(l)){we(l(n),r,t,n);return}r.validators.push({validator:l,classGroupId:t});return}Object.entries(l).forEach(([s,o])=>{we(o,_e(r,s),t,n)})})}function _e(e,r){let t=e;return r.split(Ae).forEach(n=>{t.nextPart.has(n)||t.nextPart.set(n,{nextPart:new Map,validators:[]}),t=t.nextPart.get(n)}),t}function ut(e){return e.isThemeGetter}function dt(e,r){return r?e.map(([t,n])=>{const l=n.map(s=>typeof s=="string"?r+s:typeof s=="object"?Object.fromEntries(Object.entries(s).map(([o,a])=>[r+o,a])):s);return[t,l]}):e}function ft(e){if(e<1)return{get:()=>{},set:()=>{}};let r=0,t=new Map,n=new Map;function l(s,o){t.set(s,o),r++,r>e&&(r=0,n=t,t=new Map)}return{get(s){let o=t.get(s);if(o!==void 0)return o;if((o=n.get(s))!==void 0)return l(s,o),o},set(s,o){t.has(s)?t.set(s,o):l(s,o)}}}const Le="!";function pt(e){const r=e.separator,t=r.length===1,n=r[0],l=r.length;return function(o){const a=[];let u=0,i=0,f;for(let h=0;h<o.length;h++){let m=o[h];if(u===0){if(m===n&&(t||o.slice(h,h+l)===r)){a.push(o.slice(i,h)),i=h+l;continue}if(m==="/"){f=h;continue}}m==="["?u++:m==="]"&&u--}const p=a.length===0?o:o.substring(i),c=p.startsWith(Le),b=c?p.substring(1):p,v=f&&f>i?f-i:void 0;return{modifiers:a,hasImportantModifier:c,baseClassName:b,maybePostfixModifierPosition:v}}}function bt(e){if(e.length<=1)return e;const r=[];let t=[];return e.forEach(n=>{n[0]==="["?(r.push(...t.sort(),n),t=[]):t.push(n)}),r.push(...t.sort()),r}function gt(e){return{cache:ft(e.cacheSize),splitModifiers:pt(e),...lt(e)}}const ht=/\s+/;function mt(e,r){const{splitModifiers:t,getClassGroupId:n,getConflictingClassGroupIds:l}=r,s=new Set;return e.trim().split(ht).map(o=>{const{modifiers:a,hasImportantModifier:u,baseClassName:i,maybePostfixModifierPosition:f}=t(o);let p=n(f?i.substring(0,f):i),c=!!f;if(!p){if(!f)return{isTailwindClass:!1,originalClassName:o};if(p=n(i),!p)return{isTailwindClass:!1,originalClassName:o};c=!1}const b=bt(a).join(":");return{isTailwindClass:!0,modifierId:u?b+Le:b,classGroupId:p,originalClassName:o,hasPostfixModifier:c}}).reverse().filter(o=>{if(!o.isTailwindClass)return!0;const{modifierId:a,classGroupId:u,hasPostfixModifier:i}=o,f=a+u;return s.has(f)?!1:(s.add(f),l(u,i).forEach(p=>s.add(a+p)),!0)}).reverse().map(o=>o.originalClassName).join(" ")}function yt(){let e=0,r,t,n="";for(;e<arguments.length;)(r=arguments[e++])&&(t=Ge(r))&&(n&&(n+=" "),n+=t);return n}function Ge(e){if(typeof e=="string")return e;let r,t="";for(let n=0;n<e.length;n++)e[n]&&(r=Ge(e[n]))&&(t&&(t+=" "),t+=r);return t}function vt(e,...r){let t,n,l,s=o;function o(u){const i=r.reduce((f,p)=>p(f),e());return t=gt(i),n=t.cache.get,l=t.cache.set,s=a,a(u)}function a(u){const i=n(u);if(i)return i;const f=mt(u,t);return l(u,f),f}return function(){return s(yt.apply(null,arguments))}}function x(e){const r=t=>t[e]||[];return r.isThemeGetter=!0,r}const Ve=/^\[(?:([a-z-]+):)?(.+)\]$/i,xt=/^\d+\/\d+$/,wt=new Set(["px","full","screen"]),kt=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Ct=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,At=/^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,St=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;function z(e){return V(e)||wt.has(e)||xt.test(e)}function E(e){return F(e,"length",Tt)}function V(e){return!!e&&!Number.isNaN(Number(e))}function ae(e){return F(e,"number",V)}function K(e){return!!e&&Number.isInteger(Number(e))}function $t(e){return e.endsWith("%")&&V(e.slice(0,-1))}function g(e){return Ve.test(e)}function j(e){return kt.test(e)}const _t=new Set(["length","size","percentage"]);function It(e){return F(e,_t,We)}function zt(e){return F(e,"position",We)}const Mt=new Set(["image","url"]);function Rt(e){return F(e,Mt,jt)}function Pt(e){return F(e,"",Et)}function X(){return!0}function F(e,r,t){const n=Ve.exec(e);return n?n[1]?typeof r=="string"?n[1]===r:r.has(n[1]):t(n[2]):!1}function Tt(e){return Ct.test(e)}function We(){return!1}function Et(e){return At.test(e)}function jt(e){return St.test(e)}function Nt(){const e=x("colors"),r=x("spacing"),t=x("blur"),n=x("brightness"),l=x("borderColor"),s=x("borderRadius"),o=x("borderSpacing"),a=x("borderWidth"),u=x("contrast"),i=x("grayscale"),f=x("hueRotate"),p=x("invert"),c=x("gap"),b=x("gradientColorStops"),v=x("gradientColorStopPositions"),h=x("inset"),m=x("margin"),_=x("opacity"),I=x("padding"),N=x("saturate"),U=x("scale"),H=x("sepia"),te=x("skew"),re=x("space"),ne=x("translate"),q=()=>["auto","contain","none"],O=()=>["auto","hidden","clip","visible","scroll"],Y=()=>["auto",g,r],y=()=>[g,r],oe=()=>["",z,E],M=()=>["auto",V,g],se=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],B=()=>["solid","dashed","dotted","double","none"],ie=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity","plus-lighter"],J=()=>["start","end","center","between","around","evenly","stretch"],T=()=>["","0",g],le=()=>["auto","avoid","all","avoid-page","page","left","right","column"],L=()=>[V,ae],D=()=>[V,g];return{cacheSize:500,separator:":",theme:{colors:[X],spacing:[z,E],blur:["none","",j,g],brightness:L(),borderColor:[e],borderRadius:["none","","full",j,g],borderSpacing:y(),borderWidth:oe(),contrast:L(),grayscale:T(),hueRotate:D(),invert:T(),gap:y(),gradientColorStops:[e],gradientColorStopPositions:[$t,E],inset:Y(),margin:Y(),opacity:L(),padding:y(),saturate:L(),scale:L(),sepia:T(),skew:D(),space:y(),translate:y()},classGroups:{aspect:[{aspect:["auto","square","video",g]}],container:["container"],columns:[{columns:[j]}],"break-after":[{"break-after":le()}],"break-before":[{"break-before":le()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none"]}],clear:[{clear:["left","right","both","none"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...se(),g]}],overflow:[{overflow:O()}],"overflow-x":[{"overflow-x":O()}],"overflow-y":[{"overflow-y":O()}],overscroll:[{overscroll:q()}],"overscroll-x":[{"overscroll-x":q()}],"overscroll-y":[{"overscroll-y":q()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[h]}],"inset-x":[{"inset-x":[h]}],"inset-y":[{"inset-y":[h]}],start:[{start:[h]}],end:[{end:[h]}],top:[{top:[h]}],right:[{right:[h]}],bottom:[{bottom:[h]}],left:[{left:[h]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",K,g]}],basis:[{basis:Y()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",g]}],grow:[{grow:T()}],shrink:[{shrink:T()}],order:[{order:["first","last","none",K,g]}],"grid-cols":[{"grid-cols":[X]}],"col-start-end":[{col:["auto",{span:["full",K,g]},g]}],"col-start":[{"col-start":M()}],"col-end":[{"col-end":M()}],"grid-rows":[{"grid-rows":[X]}],"row-start-end":[{row:["auto",{span:[K,g]},g]}],"row-start":[{"row-start":M()}],"row-end":[{"row-end":M()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",g]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",g]}],gap:[{gap:[c]}],"gap-x":[{"gap-x":[c]}],"gap-y":[{"gap-y":[c]}],"justify-content":[{justify:["normal",...J()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...J(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...J(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[I]}],px:[{px:[I]}],py:[{py:[I]}],ps:[{ps:[I]}],pe:[{pe:[I]}],pt:[{pt:[I]}],pr:[{pr:[I]}],pb:[{pb:[I]}],pl:[{pl:[I]}],m:[{m:[m]}],mx:[{mx:[m]}],my:[{my:[m]}],ms:[{ms:[m]}],me:[{me:[m]}],mt:[{mt:[m]}],mr:[{mr:[m]}],mb:[{mb:[m]}],ml:[{ml:[m]}],"space-x":[{"space-x":[re]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[re]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit",g,r]}],"min-w":[{"min-w":["min","max","fit",g,z]}],"max-w":[{"max-w":["0","none","full","min","max","fit","prose",{screen:[j]},j,g]}],h:[{h:[g,r,"auto","min","max","fit"]}],"min-h":[{"min-h":["min","max","fit",z,g]}],"max-h":[{"max-h":[g,r,"min","max","fit"]}],"font-size":[{text:["base",j,E]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",ae]}],"font-family":[{font:[X]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",g]}],"line-clamp":[{"line-clamp":["none",V,ae]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",z,g]}],"list-image":[{"list-image":["none",g]}],"list-style-type":[{list:["none","disc","decimal",g]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[_]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[_]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...B(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",z,E]}],"underline-offset":[{"underline-offset":["auto",z,g]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],indent:[{indent:y()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",g]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",g]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[_]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...se(),zt]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",It]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},Rt]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[v]}],"gradient-via-pos":[{via:[v]}],"gradient-to-pos":[{to:[v]}],"gradient-from":[{from:[b]}],"gradient-via":[{via:[b]}],"gradient-to":[{to:[b]}],rounded:[{rounded:[s]}],"rounded-s":[{"rounded-s":[s]}],"rounded-e":[{"rounded-e":[s]}],"rounded-t":[{"rounded-t":[s]}],"rounded-r":[{"rounded-r":[s]}],"rounded-b":[{"rounded-b":[s]}],"rounded-l":[{"rounded-l":[s]}],"rounded-ss":[{"rounded-ss":[s]}],"rounded-se":[{"rounded-se":[s]}],"rounded-ee":[{"rounded-ee":[s]}],"rounded-es":[{"rounded-es":[s]}],"rounded-tl":[{"rounded-tl":[s]}],"rounded-tr":[{"rounded-tr":[s]}],"rounded-br":[{"rounded-br":[s]}],"rounded-bl":[{"rounded-bl":[s]}],"border-w":[{border:[a]}],"border-w-x":[{"border-x":[a]}],"border-w-y":[{"border-y":[a]}],"border-w-s":[{"border-s":[a]}],"border-w-e":[{"border-e":[a]}],"border-w-t":[{"border-t":[a]}],"border-w-r":[{"border-r":[a]}],"border-w-b":[{"border-b":[a]}],"border-w-l":[{"border-l":[a]}],"border-opacity":[{"border-opacity":[_]}],"border-style":[{border:[...B(),"hidden"]}],"divide-x":[{"divide-x":[a]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[a]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[_]}],"divide-style":[{divide:B()}],"border-color":[{border:[l]}],"border-color-x":[{"border-x":[l]}],"border-color-y":[{"border-y":[l]}],"border-color-t":[{"border-t":[l]}],"border-color-r":[{"border-r":[l]}],"border-color-b":[{"border-b":[l]}],"border-color-l":[{"border-l":[l]}],"divide-color":[{divide:[l]}],"outline-style":[{outline:["",...B()]}],"outline-offset":[{"outline-offset":[z,g]}],"outline-w":[{outline:[z,E]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:oe()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[_]}],"ring-offset-w":[{"ring-offset":[z,E]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",j,Pt]}],"shadow-color":[{shadow:[X]}],opacity:[{opacity:[_]}],"mix-blend":[{"mix-blend":ie()}],"bg-blend":[{"bg-blend":ie()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[n]}],contrast:[{contrast:[u]}],"drop-shadow":[{"drop-shadow":["","none",j,g]}],grayscale:[{grayscale:[i]}],"hue-rotate":[{"hue-rotate":[f]}],invert:[{invert:[p]}],saturate:[{saturate:[N]}],sepia:[{sepia:[H]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[n]}],"backdrop-contrast":[{"backdrop-contrast":[u]}],"backdrop-grayscale":[{"backdrop-grayscale":[i]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[f]}],"backdrop-invert":[{"backdrop-invert":[p]}],"backdrop-opacity":[{"backdrop-opacity":[_]}],"backdrop-saturate":[{"backdrop-saturate":[N]}],"backdrop-sepia":[{"backdrop-sepia":[H]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[o]}],"border-spacing-x":[{"border-spacing-x":[o]}],"border-spacing-y":[{"border-spacing-y":[o]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",g]}],duration:[{duration:D()}],ease:[{ease:["linear","in","out","in-out",g]}],delay:[{delay:D()}],animate:[{animate:["none","spin","ping","pulse","bounce",g]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[U]}],"scale-x":[{"scale-x":[U]}],"scale-y":[{"scale-y":[U]}],rotate:[{rotate:[K,g]}],"translate-x":[{"translate-x":[ne]}],"translate-y":[{"translate-y":[ne]}],"skew-x":[{"skew-x":[te]}],"skew-y":[{"skew-y":[te]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",g]}],accent:[{accent:["auto",e]}],appearance:["appearance-none"],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",g]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":y()}],"scroll-mx":[{"scroll-mx":y()}],"scroll-my":[{"scroll-my":y()}],"scroll-ms":[{"scroll-ms":y()}],"scroll-me":[{"scroll-me":y()}],"scroll-mt":[{"scroll-mt":y()}],"scroll-mr":[{"scroll-mr":y()}],"scroll-mb":[{"scroll-mb":y()}],"scroll-ml":[{"scroll-ml":y()}],"scroll-p":[{"scroll-p":y()}],"scroll-px":[{"scroll-px":y()}],"scroll-py":[{"scroll-py":y()}],"scroll-ps":[{"scroll-ps":y()}],"scroll-pe":[{"scroll-pe":y()}],"scroll-pt":[{"scroll-pt":y()}],"scroll-pr":[{"scroll-pr":y()}],"scroll-pb":[{"scroll-pb":y()}],"scroll-pl":[{"scroll-pl":y()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",g]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[z,E,ae]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}}const Ot=vt(Nt),De=(...e)=>Ot(Oe(e));function Fe(e){return(...r)=>{for(const t of e)t&&t(...r)}}function Bt(e){return(...r)=>{for(let t=e.length-1;t>=0;t--){const n=e[t];n&&n(...r)}}}var ke=e=>typeof e=="function"&&!e.length?e():e;function ce(){return!0}var Lt={get(e,r,t){return r===qe?t:e.get(r)},has(e,r){return e.has(r)},set:ce,deleteProperty:ce,getOwnPropertyDescriptor(e,r){return{configurable:!0,enumerable:!0,get(){return e.get(r)},set:ce,deleteProperty:ce}},ownKeys(e){return e.keys()}},Gt=/((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;function Ie(e){const r={};let t;for(;t=Gt.exec(e);)r[t[1]]=t[2];return r}function Vt(e,r){if(typeof e=="string"){if(typeof r=="string")return`${e};${r}`;e=Ie(e)}else typeof r=="string"&&(r=Ie(r));return{...e,...r}}var me=(e,r,t)=>{let n;for(const l of e){const s=ke(l)[r];n?s&&(n=t(n,s)):n=s}return n};function Wt(...e){const r=Array.isArray(e[0]),t=r?e[0]:e;if(t.length===1)return t[0];const n=r&&e[1]?.reverseEventHandlers?Bt:Fe,l={};for(const o of t){const a=ke(o);for(const u in a)if(u[0]==="o"&&u[1]==="n"&&u[2]){const i=a[u],f=u.toLowerCase(),p=typeof i=="function"?i:Array.isArray(i)?i.length===1?i[0]:i[0].bind(void 0,i[1]):void 0;p?l[f]?l[f].push(p):l[f]=[p]:delete l[f]}}const s=W(...t);return new Proxy({get(o){if(typeof o!="string")return Reflect.get(s,o);if(o==="style")return me(t,"style",Vt);if(o==="ref"){const a=[];for(const u of t){const i=ke(u)[o];typeof i=="function"&&a.push(i)}return n(a)}if(o[0]==="o"&&o[1]==="n"&&o[2]){const a=l[o.toLowerCase()];return a?n(a):Reflect.get(s,o)}return o==="class"||o==="className"?me(t,o,(a,u)=>`${a} ${u}`):o==="classList"?me(t,o,(a,u)=>({...a,...u})):Reflect.get(s,o)},has(o){return Reflect.has(s,o)},keys(){return Object.keys(s)}},Lt)}function Dt(...e){return Fe(e)}function Ft(e){return Array.isArray(e)}function Ut(e){return Object.prototype.toString.call(e)==="[object String]"}function Ht(e,r){return W(e,r)}var Q=new Map,ze=new Set;function Me(){if(typeof window>"u")return;const e=t=>{if(!t.target)return;let n=Q.get(t.target);n||(n=new Set,Q.set(t.target,n),t.target.addEventListener("transitioncancel",r)),n.add(t.propertyName)},r=t=>{if(!t.target)return;const n=Q.get(t.target);if(n&&(n.delete(t.propertyName),n.size===0&&(t.target.removeEventListener("transitioncancel",r),Q.delete(t.target)),Q.size===0)){for(const l of ze)l();ze.clear()}};document.body.addEventListener("transitionrun",e),document.body.addEventListener("transitionend",r)}typeof document<"u"&&(document.readyState!=="loading"?Me():document.addEventListener("DOMContentLoaded",Me));/*!
 * Portions of this file are based on code from ariakit.
 * MIT Licensed, Copyright (c) Diego Haz.
 *
 * Credits to the ariakit team:
 * https://github.com/ariakit/ariakit/blob/8a13899ff807bbf39f3d89d2d5964042ba4d5287/packages/ariakit-react-utils/src/hooks.ts
 */function qt(e,r){const[t,n]=ve(Re(r?.()));return Ye(()=>{n(e()?.tagName.toLowerCase()||Re(r?.()))}),t}function Re(e){return Ut(e)?e:void 0}function Yt(e){const[r,t]=Ce(e,["asChild","as","children"]);if(!r.asChild)return A(he,W({get component(){return r.as}},t,{get children(){return r.children}}));const n=Je(()=>r.children);if(Pe(n())){const l=Te(t,n()?.props??{});return A(he,l)}if(Ft(n())){const l=n().find(Pe);if(l){const s=()=>A(Xe,{get each(){return n()},children:a=>A(Ke,{when:a===l,fallback:a,get children(){return l.props.children}})}),o=Te(t,l?.props??{});return A(he,W(o,{children:s}))}}throw new Error("[kobalte]: Component is expected to render `asChild` but no children `As` component was found.")}const Jt=Symbol("$$KobalteAsComponent");function Pe(e){return e?.[Jt]===!0}function Te(e,r){return Wt([e,r],{reverseEventHandlers:!0})}/*!
 * Portions of this file are based on code from ariakit
 * MIT Licensed, Copyright (c) Diego Haz.
 *
 * Credits to the ariakit team:
 * https://github.com/hope-ui/hope-ui/blob/54125b130195f37161dbeeea0c21dc3b198bc3ac/packages/core/src/button/is-button.ts
 */const Kt=["button","color","file","image","reset","submit"];function Xt(e){const r=e.tagName.toLowerCase();return r==="button"?!0:r==="input"&&e.type?Kt.indexOf(e.type)!==-1:!1}function Qt(e){let r;e=Ht({type:"button"},e);const[t,n]=Ce(e,["ref","type","disabled"]),l=qt(()=>r,()=>"button"),s=P(()=>{const u=l();return u==null?!1:Xt({tagName:u,type:t.type})}),o=P(()=>l()==="input"),a=P(()=>l()==="a"&&r?.getAttribute("href")!=null);return A(Yt,W({as:"button",ref(u){const i=Dt(f=>r=f,t.ref);typeof i=="function"&&i(u)},get type(){return s()||o()?t.type:void 0},get role(){return!s()&&!a()?"button":void 0},get tabIndex(){return!s()&&!a()&&!t.disabled?0:void 0},get disabled(){return s()||o()?t.disabled:void 0},get"aria-disabled"(){return!s()&&!o()&&t.disabled?!0:void 0},get"data-disabled"(){return t.disabled?"":void 0}},n))}const Ee=e=>typeof e=="boolean"?"".concat(e):e===0?"0":e,je=Oe,Zt=(e,r)=>t=>{var n;if(r?.variants==null)return je(e,t?.class,t?.className);const{variants:l,defaultVariants:s}=r,o=Object.keys(l).map(i=>{const f=t?.[i],p=s?.[i];if(f===null)return null;const c=Ee(f)||Ee(p);return l[i][c]}),a=t&&Object.entries(t).reduce((i,f)=>{let[p,c]=f;return c===void 0||(i[p]=c),i},{}),u=r==null||(n=r.compoundVariants)===null||n===void 0?void 0:n.reduce((i,f)=>{let{class:p,className:c,...b}=f;return Object.entries(b).every(v=>{let[h,m]=v;return Array.isArray(m)?m.includes({...s,...a}[h]):{...s,...a}[h]===m})?[...i,p,c]:i},[]);return je(e,o,u,t?.class,t?.className)},er=Zt("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),ye=e=>{const[r,t]=Ce(e,["class","variant","size"]);return A(Qt,W({get class(){return De(er({size:r.size,variant:r.variant}),r.class)}},t))},tr=ee("<textarea rows=3>"),rr=ee("<span>Not running"),nr=ee("<span>Paused"),or=ee("<span>Running for <!$><!/>ms"),sr=ee('<main class="bg-slate-900 min-h-screen"><div class="flex absolute justify-center items-center w-full h-full opacity-30 pointer-events-none"><div class=relative><div class="opacity-0 absolute w-[33%] h-[17%] top-[8%] right-[27%] rounded-full rotate-[20deg] cursor-[grabbing] pointer-events-auto"></div><img class="pointer-events-none select-none"src=/AWA5.0/jellyAwa.png alt="Jelly art by Sena Bonbon"></div></div><div class="flex absolute top-4 right-4 flex-col gap-4"></div><div class="flex flex-col gap-4 p-4"><div class="flex gap-2"><!$><!/><!$><!/></div><div class="flex gap-2"><!$><!/><div class="flex flex-col gap-2 justify-center"><!$><!/><!$><!/><!$><!/></div></div><div class="flex gap-2"></div></div><div class="absolute bottom-1 left-1">Awa5.0 Logo by Sena Bonbon'),ue=e=>(()=>{const r=Z(tr);return Qe(r,"spellcheck",!1),Ze(r,W(e,{get class(){return De("border-[1px] border-border bg-slate-900 p-1 outline-none transition-colors hover:bg-slate-800 focus:bg-slate-800 focus:border-x-slate-200 disabled:opacity-50 resize",e.class)}}),!1,!1),et(),r})(),ir=e=>{let r;return tt(()=>{r=setInterval(()=>{const t=e.info();t.state==C.Running&&(t.timeMillis=Date.now()-t.startTime,e.setState({...t}))},10)}),rt(()=>clearInterval(r)),[P((()=>{const t=P(()=>e.info().state==C.Stopped);return()=>t()&&Z(rr)})()),P((()=>{const t=P(()=>e.info().state==C.Paused);return()=>t()&&Z(nr)})()),P((()=>{const t=P(()=>e.info().state==C.Running);return()=>t()&&(()=>{const n=Z(or),l=n.firstChild,s=l.nextSibling,[o,a]=G(s.nextSibling);return o.nextSibling,R(n,()=>e.info().timeMillis,o,a),n})()})())]},ar=()=>{const[e,r]=ve({state:C.Stopped,startTime:0,timeMillis:0}),[t,n]=ve(!1);let l,s,o,a,u;const i=()=>{r({...e(),state:C.Stopped}),n(!1)},f=()=>{!u||!s||(s.value=st(u.value))},p=()=>{!u||!s||(u.value=it(s.value))},c=h=>{o&&(o.value+=h,o.scrollTop=o.scrollHeight)},b=h=>{o&&(o.value=h)},v=async()=>(n(!0),r({...e(),state:C.Paused}),new Promise(h=>{a.addEventListener("click",()=>{n(!1),r({...e(),state:C.Running}),h(l.value)},{once:!0})}));return(()=>{const h=Z(sr),m=h.firstChild,_=m.nextSibling,I=_.nextSibling,N=I.firstChild,U=N.firstChild,[H,te]=G(U.nextSibling),re=H.nextSibling,[ne,q]=G(re.nextSibling),O=N.nextSibling,Y=O.firstChild,[y,oe]=G(Y.nextSibling),M=y.nextSibling,se=M.firstChild,[B,ie]=G(se.nextSibling),J=B.nextSibling,[T,le]=G(J.nextSibling),L=T.nextSibling,[D,Ue]=G(L.nextSibling),He=O.nextSibling;return R(_,A(ue,{ref(S){const $=u;typeof $=="function"?$(S):u=S},class:"w-[500px] resize-y",name:"awatism-input",id:"awatism-input",rows:10,onchange:f,onkeyup:f})),R(N,A(ue,{ref(S){const $=l;typeof $=="function"?$(S):l=S},class:"w-[500px]",name:"user-input",id:"user-input",get disabled(){return!t()}}),H,te),R(N,A(ye,{variant:"outline",get disabled(){return!t()},ref(S){const $=a;typeof $=="function"?$(S):a=S},children:"Input"}),ne,q),R(O,A(ue,{ref(S){const $=s;typeof $=="function"?$(S):s=S},class:"w-[500px]",name:"awa-input",id:"awa-input",get disabled(){return e().state==C.Running},onchange:p,onkeyup:p,value:"awa",placeholder:"awa...",rows:10}),y,oe),R(M,A(ir,{info:e,setState:r}),B,ie),R(M,A(ye,{variant:"outline",get disabled(){return e().state!=C.Stopped},onclick:()=>{!s||!l||!o||(r({state:C.Running,startTime:Date.now(),timeMillis:0}),o.value="",ot(s.value,c,b,v,e,r))},children:"Run"}),T,le),R(M,A(ye,{variant:"outline",get disabled(){return e().state==C.Stopped},onclick:i,children:"Stop"}),D,Ue),R(He,A(ue,{ref(S){const $=o;typeof $=="function"?$(S):o=S},class:"w-[500px]",name:"output",id:"output",get disabled(){return e().state==C.Running}})),h})()};export{ar as default};
