var vt=Object.defineProperty;var Le=e=>{throw TypeError(e)};var bt=(e,t,s)=>t in e?vt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var p=(e,t,s)=>bt(e,typeof t!="symbol"?t+"":t,s),Ne=(e,t,s)=>t.has(e)||Le("Cannot "+s);var o=(e,t,s)=>(Ne(e,t,"read from private field"),s?s.call(e):t.get(e)),g=(e,t,s)=>t.has(e)?Le("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),f=(e,t,s,r)=>(Ne(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s),m=(e,t,s)=>(Ne(e,t,"access private method"),s);var Me=(e,t,s,r)=>({set _(n){f(e,t,n,s)},get _(){return o(e,t,r)}});var $e=(e,t,s)=>(r,n)=>{let i=-1;return a(0);async function a(d){if(d<=i)throw new Error("next() called multiple times");i=d;let l,c=!1,h;if(e[d]?(h=e[d][0][0],r.req.routeIndex=d):h=d===e.length&&n||void 0,h)try{l=await h(r,()=>a(d+1))}catch(u){if(u instanceof Error&&t)r.error=u,l=await t(u,r),c=!0;else throw u}else r.finalized===!1&&s&&(l=await s(r));return l&&(r.finalized===!1||c)&&(r.res=l),r}},yt=Symbol(),wt=async(e,t=Object.create(null))=>{const{all:s=!1,dot:r=!1}=t,i=(e instanceof rt?e.raw.headers:e.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?Et(e,{all:s,dot:r}):{}};async function Et(e,t){const s=await e.formData();return s?Rt(s,t):{}}function Rt(e,t){const s=Object.create(null);return e.forEach((r,n)=>{t.all||n.endsWith("[]")?jt(s,n,r):s[n]=r}),t.dot&&Object.entries(s).forEach(([r,n])=>{r.includes(".")&&(_t(s,r,n),delete s[r])}),s}var jt=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:t.endsWith("[]")?e[t]=[s]:e[t]=s},_t=(e,t,s)=>{let r=e;const n=t.split(".");n.forEach((i,a)=>{a===n.length-1?r[i]=s:((!r[i]||typeof r[i]!="object"||Array.isArray(r[i])||r[i]instanceof File)&&(r[i]=Object.create(null)),r=r[i])})},Xe=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},St=e=>{const{groups:t,path:s}=Ot(e),r=Xe(s);return Ct(r,t)},Ot=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(s,r)=>{const n=`@${r}`;return t.push([n,s]),n}),{groups:t,path:e}},Ct=(e,t)=>{for(let s=t.length-1;s>=0;s--){const[r]=t[s];for(let n=e.length-1;n>=0;n--)if(e[n].includes(r)){e[n]=e[n].replace(r,t[s][1]);break}}return e},_e={},Tt=(e,t)=>{if(e==="*")return"*";const s=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const r=`${e}#${t}`;return _e[r]||(s[2]?_e[r]=t&&t[0]!==":"&&t[0]!=="*"?[r,s[1],new RegExp(`^${s[2]}(?=/${t})`)]:[e,s[1],new RegExp(`^${s[2]}$`)]:_e[r]=[e,s[1],!0]),_e[r]}return null},He=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return t(s)}catch{return s}})}},At=e=>He(e,decodeURI),Ze=e=>{const t=e.url,s=t.indexOf("/",t.indexOf(":")+4);let r=s;for(;r<t.length;r++){const n=t.charCodeAt(r);if(n===37){const i=t.indexOf("?",r),a=t.slice(s,i===-1?void 0:i);return At(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(n===63)break}return t.slice(s,r)},Dt=e=>{const t=Ze(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},re=(e,t,...s)=>(s.length&&(t=re(t,...s)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),et=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),s=[];let r="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))r+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){s.length===0&&r===""?s.push("/"):s.push(r);const i=n.replace("?","");r+="/"+i,s.push(r)}else r+="/"+n}),s.filter((n,i,a)=>a.indexOf(n)===i)},Pe=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?He(e,st):e):e,tt=(e,t,s)=>{let r;if(!s&&t&&!/[%+]/.test(t)){let a=e.indexOf("?",8);if(a===-1)return;for(e.startsWith(t,a+1)||(a=e.indexOf(`&${t}`,a+1));a!==-1;){const d=e.charCodeAt(a+t.length+1);if(d===61){const l=a+t.length+2,c=e.indexOf("&",l);return Pe(e.slice(l,c===-1?void 0:c))}else if(d==38||isNaN(d))return"";a=e.indexOf(`&${t}`,a+1)}if(r=/[%+]/.test(e),!r)return}const n={};r??(r=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){const a=e.indexOf("&",i+1);let d=e.indexOf("=",i);d>a&&a!==-1&&(d=-1);let l=e.slice(i+1,d===-1?a===-1?void 0:a:d);if(r&&(l=Pe(l)),i=a,l==="")continue;let c;d===-1?c="":(c=e.slice(d+1,a===-1?void 0:a),r&&(c=Pe(c))),s?(n[l]&&Array.isArray(n[l])||(n[l]=[]),n[l].push(c)):n[l]??(n[l]=c)}return t?n[t]:n},It=tt,Nt=(e,t)=>tt(e,t,!0),st=decodeURIComponent,Be=e=>He(e,st),ae,C,L,nt,it,Fe,B,Ve,rt=(Ve=class{constructor(e,t="/",s=[[]]){g(this,L);p(this,"raw");g(this,ae);g(this,C);p(this,"routeIndex",0);p(this,"path");p(this,"bodyCache",{});g(this,B,e=>{const{bodyCache:t,raw:s}=this,r=t[e];if(r)return r;const n=Object.keys(t)[0];return n?t[n].then(i=>(n==="json"&&(i=JSON.stringify(i)),new Response(i)[e]())):t[e]=s[e]()});this.raw=e,this.path=t,f(this,C,s),f(this,ae,{})}param(e){return e?m(this,L,nt).call(this,e):m(this,L,it).call(this)}query(e){return It(this.url,e)}queries(e){return Nt(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((s,r)=>{t[r]=s}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await wt(this,e))}json(){return o(this,B).call(this,"text").then(e=>JSON.parse(e))}text(){return o(this,B).call(this,"text")}arrayBuffer(){return o(this,B).call(this,"arrayBuffer")}blob(){return o(this,B).call(this,"blob")}formData(){return o(this,B).call(this,"formData")}addValidatedData(e,t){o(this,ae)[e]=t}valid(e){return o(this,ae)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[yt](){return o(this,C)}get matchedRoutes(){return o(this,C)[0].map(([[,e]])=>e)}get routePath(){return o(this,C)[0].map(([[,e]])=>e)[this.routeIndex].path}},ae=new WeakMap,C=new WeakMap,L=new WeakSet,nt=function(e){const t=o(this,C)[0][this.routeIndex][1][e],s=m(this,L,Fe).call(this,t);return s&&/\%/.test(s)?Be(s):s},it=function(){const e={},t=Object.keys(o(this,C)[0][this.routeIndex][1]);for(const s of t){const r=m(this,L,Fe).call(this,o(this,C)[0][this.routeIndex][1][s]);r!==void 0&&(e[s]=/\%/.test(r)?Be(r):r)}return e},Fe=function(e){return o(this,C)[1]?o(this,C)[1][e]:e},B=new WeakMap,Ve),Pt={Stringify:1},at=async(e,t,s,r,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const i=e.callbacks;return i!=null&&i.length?(n?n[0]+=e:n=[e],Promise.all(i.map(d=>d({phase:t,buffer:n,context:r}))).then(d=>Promise.all(d.filter(Boolean).map(l=>at(l,t,!1,r,n))).then(()=>n[0]))):Promise.resolve(e)},qt="text/plain; charset=UTF-8",qe=(e,t)=>({"Content-Type":e,...t}),me,ve,q,oe,F,O,be,le,ce,J,ye,we,W,ne,Ke,Ft=(Ke=class{constructor(e,t){g(this,W);g(this,me);g(this,ve);p(this,"env",{});g(this,q);p(this,"finalized",!1);p(this,"error");g(this,oe);g(this,F);g(this,O);g(this,be);g(this,le);g(this,ce);g(this,J);g(this,ye);g(this,we);p(this,"render",(...e)=>(o(this,le)??f(this,le,t=>this.html(t)),o(this,le).call(this,...e)));p(this,"setLayout",e=>f(this,be,e));p(this,"getLayout",()=>o(this,be));p(this,"setRenderer",e=>{f(this,le,e)});p(this,"header",(e,t,s)=>{this.finalized&&f(this,O,new Response(o(this,O).body,o(this,O)));const r=o(this,O)?o(this,O).headers:o(this,J)??f(this,J,new Headers);t===void 0?r.delete(e):s!=null&&s.append?r.append(e,t):r.set(e,t)});p(this,"status",e=>{f(this,oe,e)});p(this,"set",(e,t)=>{o(this,q)??f(this,q,new Map),o(this,q).set(e,t)});p(this,"get",e=>o(this,q)?o(this,q).get(e):void 0);p(this,"newResponse",(...e)=>m(this,W,ne).call(this,...e));p(this,"body",(e,t,s)=>m(this,W,ne).call(this,e,t,s));p(this,"text",(e,t,s)=>!o(this,J)&&!o(this,oe)&&!t&&!s&&!this.finalized?new Response(e):m(this,W,ne).call(this,e,t,qe(qt,s)));p(this,"json",(e,t,s)=>m(this,W,ne).call(this,JSON.stringify(e),t,qe("application/json",s)));p(this,"html",(e,t,s)=>{const r=n=>m(this,W,ne).call(this,n,t,qe("text/html; charset=UTF-8",s));return typeof e=="object"?at(e,Pt.Stringify,!1,{}).then(r):r(e)});p(this,"redirect",(e,t)=>{const s=String(e);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,t??302)});p(this,"notFound",()=>(o(this,ce)??f(this,ce,()=>new Response),o(this,ce).call(this,this)));f(this,me,e),t&&(f(this,F,t.executionCtx),this.env=t.env,f(this,ce,t.notFoundHandler),f(this,we,t.path),f(this,ye,t.matchResult))}get req(){return o(this,ve)??f(this,ve,new rt(o(this,me),o(this,we),o(this,ye))),o(this,ve)}get event(){if(o(this,F)&&"respondWith"in o(this,F))return o(this,F);throw Error("This context has no FetchEvent")}get executionCtx(){if(o(this,F))return o(this,F);throw Error("This context has no ExecutionContext")}get res(){return o(this,O)||f(this,O,new Response(null,{headers:o(this,J)??f(this,J,new Headers)}))}set res(e){if(o(this,O)&&e){e=new Response(e.body,e);for(const[t,s]of o(this,O).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const r=o(this,O).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of r)e.headers.append("set-cookie",n)}else e.headers.set(t,s)}f(this,O,e),this.finalized=!0}get var(){return o(this,q)?Object.fromEntries(o(this,q)):{}}},me=new WeakMap,ve=new WeakMap,q=new WeakMap,oe=new WeakMap,F=new WeakMap,O=new WeakMap,be=new WeakMap,le=new WeakMap,ce=new WeakMap,J=new WeakMap,ye=new WeakMap,we=new WeakMap,W=new WeakSet,ne=function(e,t,s){const r=o(this,O)?new Headers(o(this,O).headers):o(this,J)??new Headers;if(typeof t=="object"&&"headers"in t){const i=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[a,d]of i)a.toLowerCase()==="set-cookie"?r.append(a,d):r.set(a,d)}if(s)for(const[i,a]of Object.entries(s))if(typeof a=="string")r.set(i,a);else{r.delete(i);for(const d of a)r.append(i,d)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??o(this,oe);return new Response(e,{status:n,headers:r})},Ke),y="ALL",Ht="all",kt=["get","post","put","delete","options","patch"],ot="Can not add a route since the matcher is already built.",lt=class extends Error{},Lt="__COMPOSED_HANDLER",Mt=e=>e.text("404 Not Found",404),We=(e,t)=>{if("getResponse"in e){const s=e.getResponse();return t.newResponse(s.body,s)}return console.error(e),t.text("Internal Server Error",500)},T,w,ct,A,Y,Se,Oe,de,$t=(de=class{constructor(t={}){g(this,w);p(this,"get");p(this,"post");p(this,"put");p(this,"delete");p(this,"options");p(this,"patch");p(this,"all");p(this,"on");p(this,"use");p(this,"router");p(this,"getPath");p(this,"_basePath","/");g(this,T,"/");p(this,"routes",[]);g(this,A,Mt);p(this,"errorHandler",We);p(this,"onError",t=>(this.errorHandler=t,this));p(this,"notFound",t=>(f(this,A,t),this));p(this,"fetch",(t,...s)=>m(this,w,Oe).call(this,t,s[1],s[0],t.method));p(this,"request",(t,s,r,n)=>t instanceof Request?this.fetch(s?new Request(t,s):t,r,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${re("/",t)}`,s),r,n)));p(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(m(this,w,Oe).call(this,t.request,t,void 0,t.request.method))})});[...kt,Ht].forEach(i=>{this[i]=(a,...d)=>(typeof a=="string"?f(this,T,a):m(this,w,Y).call(this,i,o(this,T),a),d.forEach(l=>{m(this,w,Y).call(this,i,o(this,T),l)}),this)}),this.on=(i,a,...d)=>{for(const l of[a].flat()){f(this,T,l);for(const c of[i].flat())d.map(h=>{m(this,w,Y).call(this,c.toUpperCase(),o(this,T),h)})}return this},this.use=(i,...a)=>(typeof i=="string"?f(this,T,i):(f(this,T,"*"),a.unshift(i)),a.forEach(d=>{m(this,w,Y).call(this,y,o(this,T),d)}),this);const{strict:r,...n}=t;Object.assign(this,n),this.getPath=r??!0?t.getPath??Ze:Dt}route(t,s){const r=this.basePath(t);return s.routes.map(n=>{var a;let i;s.errorHandler===We?i=n.handler:(i=async(d,l)=>(await $e([],s.errorHandler)(d,()=>n.handler(d,l))).res,i[Lt]=n.handler),m(a=r,w,Y).call(a,n.method,n.path,i)}),this}basePath(t){const s=m(this,w,ct).call(this);return s._basePath=re(this._basePath,t),s}mount(t,s,r){let n,i;r&&(typeof r=="function"?i=r:(i=r.optionHandler,r.replaceRequest===!1?n=l=>l:n=r.replaceRequest));const a=i?l=>{const c=i(l);return Array.isArray(c)?c:[c]}:l=>{let c;try{c=l.executionCtx}catch{}return[l.env,c]};n||(n=(()=>{const l=re(this._basePath,t),c=l==="/"?0:l.length;return h=>{const u=new URL(h.url);return u.pathname=u.pathname.slice(c)||"/",new Request(u,h)}})());const d=async(l,c)=>{const h=await s(n(l.req.raw),...a(l));if(h)return h;await c()};return m(this,w,Y).call(this,y,re(t,"*"),d),this}},T=new WeakMap,w=new WeakSet,ct=function(){const t=new de({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,A,o(this,A)),t.routes=this.routes,t},A=new WeakMap,Y=function(t,s,r){t=t.toUpperCase(),s=re(this._basePath,s);const n={basePath:this._basePath,path:s,method:t,handler:r};this.router.add(t,s,[r,n]),this.routes.push(n)},Se=function(t,s){if(t instanceof Error)return this.errorHandler(t,s);throw t},Oe=function(t,s,r,n){if(n==="HEAD")return(async()=>new Response(null,await m(this,w,Oe).call(this,t,s,r,"GET")))();const i=this.getPath(t,{env:r}),a=this.router.match(n,i),d=new Ft(t,{path:i,matchResult:a,env:r,executionCtx:s,notFoundHandler:o(this,A)});if(a[0].length===1){let c;try{c=a[0][0][0][0](d,async()=>{d.res=await o(this,A).call(this,d)})}catch(h){return m(this,w,Se).call(this,h,d)}return c instanceof Promise?c.then(h=>h||(d.finalized?d.res:o(this,A).call(this,d))).catch(h=>m(this,w,Se).call(this,h,d)):c??o(this,A).call(this,d)}const l=$e(a[0],this.errorHandler,o(this,A));return(async()=>{try{const c=await l(d);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return m(this,w,Se).call(this,c,d)}})()},de),dt=[];function Bt(e,t){const s=this.buildAllMatchers(),r=((n,i)=>{const a=s[n]||s[y],d=a[2][i];if(d)return d;const l=i.match(a[0]);if(!l)return[[],dt];const c=l.indexOf("",1);return[a[1][c],l]});return this.match=r,r(e,t)}var Te="[^/]+",ge=".*",xe="(?:|/.*)",ie=Symbol(),Wt=new Set(".\\+*[^]$()");function Ut(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===ge||e===xe?1:t===ge||t===xe?-1:e===Te?1:t===Te?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Q,X,D,te,zt=(te=class{constructor(){g(this,Q);g(this,X);g(this,D,Object.create(null))}insert(t,s,r,n,i){if(t.length===0){if(o(this,Q)!==void 0)throw ie;if(i)return;f(this,Q,s);return}const[a,...d]=t,l=a==="*"?d.length===0?["","",ge]:["","",Te]:a==="/*"?["","",xe]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(l){const h=l[1];let u=l[2]||Te;if(h&&l[2]&&(u===".*"||(u=u.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(u))))throw ie;if(c=o(this,D)[u],!c){if(Object.keys(o(this,D)).some(x=>x!==ge&&x!==xe))throw ie;if(i)return;c=o(this,D)[u]=new te,h!==""&&f(c,X,n.varIndex++)}!i&&h!==""&&r.push([h,o(c,X)])}else if(c=o(this,D)[a],!c){if(Object.keys(o(this,D)).some(h=>h.length>1&&h!==ge&&h!==xe))throw ie;if(i)return;c=o(this,D)[a]=new te}c.insert(d,s,r,n,i)}buildRegExpStr(){const s=Object.keys(o(this,D)).sort(Ut).map(r=>{const n=o(this,D)[r];return(typeof o(n,X)=="number"?`(${r})@${o(n,X)}`:Wt.has(r)?`\\${r}`:r)+n.buildRegExpStr()});return typeof o(this,Q)=="number"&&s.unshift(`#${o(this,Q)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},Q=new WeakMap,X=new WeakMap,D=new WeakMap,te),Ae,Ee,Ye,Vt=(Ye=class{constructor(){g(this,Ae,{varIndex:0});g(this,Ee,new zt)}insert(e,t,s){const r=[],n=[];for(let a=0;;){let d=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const c=`@\\${a}`;return n[a]=[c,l],a++,d=!0,c}),!d)break}const i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=n.length-1;a>=0;a--){const[d]=n[a];for(let l=i.length-1;l>=0;l--)if(i[l].indexOf(d)!==-1){i[l]=i[l].replace(d,n[a][1]);break}}return o(this,Ee).insert(i,t,r,o(this,Ae),s),r}buildRegExp(){let e=o(this,Ee).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const s=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,i,a)=>i!==void 0?(s[++t]=Number(i),"$()"):(a!==void 0&&(r[Number(a)]=++t),"")),[new RegExp(`^${e}`),s,r]}},Ae=new WeakMap,Ee=new WeakMap,Ye),Kt=[/^$/,[],Object.create(null)],Ce=Object.create(null);function ht(e){return Ce[e]??(Ce[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function Yt(){Ce=Object.create(null)}function Gt(e){var c;const t=new Vt,s=[];if(e.length===0)return Kt;const r=e.map(h=>[!/\*|\/:/.test(h[0]),...h]).sort(([h,u],[x,b])=>h?1:x?-1:u.length-b.length),n=Object.create(null);for(let h=0,u=-1,x=r.length;h<x;h++){const[b,R,I]=r[h];b?n[R]=[I.map(([j])=>[j,Object.create(null)]),dt]:u++;let v;try{v=t.insert(R,u,b)}catch(j){throw j===ie?new lt(R):j}b||(s[u]=I.map(([j,M])=>{const Re=Object.create(null);for(M-=1;M>=0;M--){const[je,N]=v[M];Re[je]=N}return[j,Re]}))}const[i,a,d]=t.buildRegExp();for(let h=0,u=s.length;h<u;h++)for(let x=0,b=s[h].length;x<b;x++){const R=(c=s[h][x])==null?void 0:c[1];if(!R)continue;const I=Object.keys(R);for(let v=0,j=I.length;v<j;v++)R[I[v]]=d[R[I[v]]]}const l=[];for(const h in a)l[h]=s[a[h]];return[i,l,n]}function se(e,t){if(e){for(const s of Object.keys(e).sort((r,n)=>n.length-r.length))if(ht(s).test(t))return[...e[s]]}}var U,z,De,ut,Ge,Jt=(Ge=class{constructor(){g(this,De);p(this,"name","RegExpRouter");g(this,U);g(this,z);p(this,"match",Bt);f(this,U,{[y]:Object.create(null)}),f(this,z,{[y]:Object.create(null)})}add(e,t,s){var d;const r=o(this,U),n=o(this,z);if(!r||!n)throw new Error(ot);r[e]||[r,n].forEach(l=>{l[e]=Object.create(null),Object.keys(l[y]).forEach(c=>{l[e][c]=[...l[y][c]]})}),t==="/*"&&(t="*");const i=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=ht(t);e===y?Object.keys(r).forEach(c=>{var h;(h=r[c])[t]||(h[t]=se(r[c],t)||se(r[y],t)||[])}):(d=r[e])[t]||(d[t]=se(r[e],t)||se(r[y],t)||[]),Object.keys(r).forEach(c=>{(e===y||e===c)&&Object.keys(r[c]).forEach(h=>{l.test(h)&&r[c][h].push([s,i])})}),Object.keys(n).forEach(c=>{(e===y||e===c)&&Object.keys(n[c]).forEach(h=>l.test(h)&&n[c][h].push([s,i]))});return}const a=et(t)||[t];for(let l=0,c=a.length;l<c;l++){const h=a[l];Object.keys(n).forEach(u=>{var x;(e===y||e===u)&&((x=n[u])[h]||(x[h]=[...se(r[u],h)||se(r[y],h)||[]]),n[u][h].push([s,i-c+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(o(this,z)).concat(Object.keys(o(this,U))).forEach(t=>{e[t]||(e[t]=m(this,De,ut).call(this,t))}),f(this,U,f(this,z,void 0)),Yt(),e}},U=new WeakMap,z=new WeakMap,De=new WeakSet,ut=function(e){const t=[];let s=e===y;return[o(this,U),o(this,z)].forEach(r=>{const n=r[e]?Object.keys(r[e]).map(i=>[i,r[e][i]]):[];n.length!==0?(s||(s=!0),t.push(...n)):e!==y&&t.push(...Object.keys(r[y]).map(i=>[i,r[y][i]]))}),s?Gt(t):null},Ge),V,H,Je,Qt=(Je=class{constructor(e){p(this,"name","SmartRouter");g(this,V,[]);g(this,H,[]);f(this,V,e.routers)}add(e,t,s){if(!o(this,H))throw new Error(ot);o(this,H).push([e,t,s])}match(e,t){if(!o(this,H))throw new Error("Fatal error");const s=o(this,V),r=o(this,H),n=s.length;let i=0,a;for(;i<n;i++){const d=s[i];try{for(let l=0,c=r.length;l<c;l++)d.add(...r[l]);a=d.match(e,t)}catch(l){if(l instanceof lt)continue;throw l}this.match=d.match.bind(d),f(this,V,[d]),f(this,H,void 0);break}if(i===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(o(this,H)||o(this,V).length!==1)throw new Error("No active router has been determined yet.");return o(this,V)[0]}},V=new WeakMap,H=new WeakMap,Je),pe=Object.create(null),K,S,Z,he,_,k,G,ue,Xt=(ue=class{constructor(t,s,r){g(this,k);g(this,K);g(this,S);g(this,Z);g(this,he,0);g(this,_,pe);if(f(this,S,r||Object.create(null)),f(this,K,[]),t&&s){const n=Object.create(null);n[t]={handler:s,possibleKeys:[],score:0},f(this,K,[n])}f(this,Z,[])}insert(t,s,r){f(this,he,++Me(this,he)._);let n=this;const i=St(s),a=[];for(let d=0,l=i.length;d<l;d++){const c=i[d],h=i[d+1],u=Tt(c,h),x=Array.isArray(u)?u[0]:c;if(x in o(n,S)){n=o(n,S)[x],u&&a.push(u[1]);continue}o(n,S)[x]=new ue,u&&(o(n,Z).push(u),a.push(u[1])),n=o(n,S)[x]}return o(n,K).push({[t]:{handler:r,possibleKeys:a.filter((d,l,c)=>c.indexOf(d)===l),score:o(this,he)}}),n}search(t,s){var l;const r=[];f(this,_,pe);let i=[this];const a=Xe(s),d=[];for(let c=0,h=a.length;c<h;c++){const u=a[c],x=c===h-1,b=[];for(let R=0,I=i.length;R<I;R++){const v=i[R],j=o(v,S)[u];j&&(f(j,_,o(v,_)),x?(o(j,S)["*"]&&r.push(...m(this,k,G).call(this,o(j,S)["*"],t,o(v,_))),r.push(...m(this,k,G).call(this,j,t,o(v,_)))):b.push(j));for(let M=0,Re=o(v,Z).length;M<Re;M++){const je=o(v,Z)[M],N=o(v,_)===pe?{}:{...o(v,_)};if(je==="*"){const $=o(v,S)["*"];$&&(r.push(...m(this,k,G).call(this,$,t,o(v,_))),f($,_,N),b.push($));continue}const[xt,ke,fe]=je;if(!u&&!(fe instanceof RegExp))continue;const P=o(v,S)[xt],mt=a.slice(c).join("/");if(fe instanceof RegExp){const $=fe.exec(mt);if($){if(N[ke]=$[0],r.push(...m(this,k,G).call(this,P,t,o(v,_),N)),Object.keys(o(P,S)).length){f(P,_,N);const Ie=((l=$[0].match(/\//))==null?void 0:l.length)??0;(d[Ie]||(d[Ie]=[])).push(P)}continue}}(fe===!0||fe.test(u))&&(N[ke]=u,x?(r.push(...m(this,k,G).call(this,P,t,N,o(v,_))),o(P,S)["*"]&&r.push(...m(this,k,G).call(this,o(P,S)["*"],t,N,o(v,_)))):(f(P,_,N),b.push(P)))}}i=b.concat(d.shift()??[])}return r.length>1&&r.sort((c,h)=>c.score-h.score),[r.map(({handler:c,params:h})=>[c,h])]}},K=new WeakMap,S=new WeakMap,Z=new WeakMap,he=new WeakMap,_=new WeakMap,k=new WeakSet,G=function(t,s,r,n){const i=[];for(let a=0,d=o(t,K).length;a<d;a++){const l=o(t,K)[a],c=l[s]||l[y],h={};if(c!==void 0&&(c.params=Object.create(null),i.push(c),r!==pe||n&&n!==pe))for(let u=0,x=c.possibleKeys.length;u<x;u++){const b=c.possibleKeys[u],R=h[c.score];c.params[b]=n!=null&&n[b]&&!R?n[b]:r[b]??(n==null?void 0:n[b]),h[c.score]=!0}}return i},ue),ee,Qe,Zt=(Qe=class{constructor(){p(this,"name","TrieRouter");g(this,ee);f(this,ee,new Xt)}add(e,t,s){const r=et(t);if(r){for(let n=0,i=r.length;n<i;n++)o(this,ee).insert(e,r[n],s);return}o(this,ee).insert(e,t,s)}match(e,t){return o(this,ee).search(e,t)}},ee=new WeakMap,Qe),ft=class extends $t{constructor(e={}){super(e),this.router=e.router??new Qt({routers:[new Jt,new Zt]})}},es=e=>{const s={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},r=(i=>typeof i=="string"?i==="*"?()=>i:a=>i===a?a:null:typeof i=="function"?i:a=>i.includes(a)?a:null)(s.origin),n=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(s.allowMethods);return async function(a,d){var h;function l(u,x){a.res.headers.set(u,x)}const c=await r(a.req.header("origin")||"",a);if(c&&l("Access-Control-Allow-Origin",c),s.credentials&&l("Access-Control-Allow-Credentials","true"),(h=s.exposeHeaders)!=null&&h.length&&l("Access-Control-Expose-Headers",s.exposeHeaders.join(",")),a.req.method==="OPTIONS"){s.origin!=="*"&&l("Vary","Origin"),s.maxAge!=null&&l("Access-Control-Max-Age",s.maxAge.toString());const u=await n(a.req.header("origin")||"",a);u.length&&l("Access-Control-Allow-Methods",u.join(","));let x=s.allowHeaders;if(!(x!=null&&x.length)){const b=a.req.header("Access-Control-Request-Headers");b&&(x=b.split(/\s*,\s*/))}return x!=null&&x.length&&(l("Access-Control-Allow-Headers",x.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await d(),s.origin!=="*"&&a.header("Vary","Origin",{append:!0})}},ts=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Ue=(e,t=rs)=>{const s=/\.([a-zA-Z0-9]+?)$/,r=e.match(s);if(!r)return;let n=t[r[1]];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},ss={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},rs=ss,ns=(...e)=>{let t=e.filter(n=>n!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const s=t.split("/"),r=[];for(const n of s)n===".."&&r.length>0&&r.at(-1)!==".."?r.pop():n!=="."&&r.push(n);return r.join("/")||"."},pt={br:".br",zstd:".zst",gzip:".gz"},is=Object.keys(pt),as="index.html",os=e=>{const t=e.root??"./",s=e.path,r=e.join??ns;return async(n,i)=>{var h,u,x,b;if(n.finalized)return i();let a;if(e.path)a=e.path;else try{if(a=decodeURIComponent(n.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))throw new Error}catch{return await((h=e.onNotFound)==null?void 0:h.call(e,n.req.path,n)),i()}let d=r(t,!s&&e.rewriteRequestPath?e.rewriteRequestPath(a):a);e.isDir&&await e.isDir(d)&&(d=r(d,as));const l=e.getContent;let c=await l(d,n);if(c instanceof Response)return n.newResponse(c.body,c);if(c){const R=e.mimes&&Ue(d,e.mimes)||Ue(d);if(n.header("Content-Type",R||"application/octet-stream"),e.precompressed&&(!R||ts.test(R))){const I=new Set((u=n.req.header("Accept-Encoding"))==null?void 0:u.split(",").map(v=>v.trim()));for(const v of is){if(!I.has(v))continue;const j=await l(d+pt[v],n);if(j){c=j,n.header("Content-Encoding",v),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((x=e.onFound)==null?void 0:x.call(e,d,n)),n.body(c)}await((b=e.onNotFound)==null?void 0:b.call(e,d,n)),await i()}},ls=async(e,t)=>{let s;t&&t.manifest?typeof t.manifest=="string"?s=JSON.parse(t.manifest):s=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?s=JSON.parse(__STATIC_CONTENT_MANIFEST):s=__STATIC_CONTENT_MANIFEST;let r;t&&t.namespace?r=t.namespace:r=__STATIC_CONTENT;const n=s[e]||e;if(!n)return null;const i=await r.get(n,{type:"stream"});return i||null},cs=e=>async function(s,r){return os({...e,getContent:async i=>ls(i,{manifest:e.manifest,namespace:e.namespace?e.namespace:s.env?s.env.__STATIC_CONTENT:void 0})})(s,r)},ds=e=>cs(e);const E=new ft;E.use("/api/*",es());E.use("/static/*",ds({root:"./public"}));E.get("/api/health",e=>e.json({status:"ok",timestamp:new Date().toISOString()}));E.get("/api/questionnaires",async e=>{try{const{DB:t}=e.env,{results:s}=await t.prepare("SELECT * FROM questionnaires").all();return e.json({questionnaires:s})}catch{return e.json({error:"Failed to fetch questionnaires"},500)}});E.get("/api/questionnaires/:type",async e=>{try{const{DB:t}=e.env,s=e.req.param("type"),r=await t.prepare("SELECT * FROM questionnaires WHERE type = ?").bind(s).first();return r?e.json({questionnaire:r}):e.json({error:"Questionnaire not found"},404)}catch{return e.json({error:"Failed to fetch questionnaire"},500)}});E.post("/api/questionnaires/:type/responses",async e=>{try{const{DB:t}=e.env,s=e.req.param("type"),{user_id:r=1,answers:n,score:i,email:a}=await e.req.json(),d=await t.prepare("SELECT * FROM questionnaires WHERE type = ?").bind(s).first();if(!d)return e.json({error:"Questionnaire not found"},404);let l="";s==="ISI"&&(i<=7?l="정상 범위":i<=14?l="경도 불면":i<=21?l="중등도 불면":l="중증 불면 / 전문 상담 권장");const c=await t.prepare(`
      INSERT INTO questionnaire_responses (user_id, questionnaire_id, score, answers_json, interpretation)
      VALUES (?, ?, ?, ?, ?)
    `).bind(r,d.id,i,JSON.stringify(n),l).run();return e.json({success:!0,response_id:c.meta.last_row_id,score:i,interpretation:l})}catch{return e.json({error:"Failed to save response"},500)}});E.get("/api/sleep-sessions",async e=>{try{const{DB:t}=e.env,s=e.req.query("user_id")||"1",r=e.req.query("from"),n=e.req.query("to");let i="SELECT * FROM sleep_sessions WHERE user_id = ?";const a=[s];r&&n&&(i+=" AND date BETWEEN ? AND ?",a.push(r,n)),i+=" ORDER BY date DESC LIMIT 30";const{results:d}=await t.prepare(i).bind(...a).all();return e.json({sessions:d})}catch{return e.json({error:"Failed to fetch sleep sessions"},500)}});E.post("/api/sleep-sessions",async e=>{try{const{DB:t}=e.env,{user_id:s=1,date:r,sleep_onset:n,wake_time:i,awakenings_count:a=0,sleep_efficiency:d,sleep_quality:l,notes:c}=await e.req.json(),h=await t.prepare(`
      INSERT INTO sleep_sessions (user_id, date, sleep_onset, wake_time, awakenings_count, sleep_efficiency, sleep_quality, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(s,r,n,i,a,d,l,c).run();return e.json({success:!0,session_id:h.meta.last_row_id})}catch{return e.json({error:"Failed to create sleep session"},500)}});E.get("/api/risk-score/today",async e=>{try{const{DB:t}=e.env,s=e.req.query("user_id")||"1",r=new Date().toISOString().split("T")[0],n=await t.prepare("SELECT * FROM risk_scores WHERE user_id = ? AND date = ?").bind(s,r).first();return e.json({risk_score:n||null})}catch{return e.json({error:"Failed to fetch risk score"},500)}});E.post("/api/risk-score",async e=>{try{const{DB:t}=e.env,{user_id:s=1,date:r,score:n,screen_time:i,noise_level:a,light_level:d,caffeine_intake:l,details:c}=await e.req.json(),h=await t.prepare(`
      INSERT INTO risk_scores (user_id, date, score, screen_time, noise_level, light_level, caffeine_intake, details_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(s,r,n,i,a,d,l,JSON.stringify(c||{})).run();return e.json({success:!0,risk_id:h.meta.last_row_id})}catch{return e.json({error:"Failed to save risk score"},500)}});E.get("/api/clinics",async e=>{try{const{DB:t}=e.env,s=e.req.query("city"),r=e.req.query("type");let n="SELECT * FROM clinics WHERE 1=1";const i=[];s&&(n+=" AND city LIKE ?",i.push(`%${s}%`)),r&&(n+=" AND type = ?",i.push(r)),n+=" ORDER BY name";const{results:a}=await t.prepare(n).bind(...i).all();return e.json({clinics:a})}catch{return e.json({error:"Failed to fetch clinics"},500)}});E.get("/api/clinics/:id",async e=>{try{const{DB:t}=e.env,s=e.req.param("id"),r=await t.prepare("SELECT * FROM clinics WHERE id = ?").bind(s).first();return r?e.json({clinic:r}):e.json({error:"Clinic not found"},404)}catch{return e.json({error:"Failed to fetch clinic"},500)}});E.get("/api/cbt/programs",async e=>{try{const{DB:t}=e.env,{results:s}=await t.prepare("SELECT * FROM cbt_programs WHERE is_active = 1").all();return e.json({programs:s})}catch{return e.json({error:"Failed to fetch programs"},500)}});E.get("/api/cbt/programs/:id/modules",async e=>{try{const{DB:t}=e.env,s=e.req.param("id"),{results:r}=await t.prepare("SELECT * FROM cbt_modules WHERE program_id = ? ORDER BY order_index").bind(s).all();return e.json({modules:r})}catch{return e.json({error:"Failed to fetch modules"},500)}});E.get("/api/dashboard",async e=>{try{const{DB:t}=e.env,s=e.req.query("user_id")||"1",r=await t.prepare("SELECT * FROM sleep_sessions WHERE user_id = ? ORDER BY date DESC LIMIT 1").bind(s).first(),n=await t.prepare(`
      SELECT qr.*, q.type 
      FROM questionnaire_responses qr 
      JOIN questionnaires q ON qr.questionnaire_id = q.id 
      WHERE qr.user_id = ? AND q.type = 'ISI' 
      ORDER BY qr.created_at DESC LIMIT 1
    `).bind(s).first(),i=new Date().toISOString().split("T")[0],a=await t.prepare("SELECT * FROM risk_scores WHERE user_id = ? AND date = ?").bind(s,i).first(),d=await t.prepare('SELECT * FROM user_cbt_progress WHERE user_id = ? AND status = "active" LIMIT 1').bind(s).first();return e.json({latest_sleep:r,latest_isi:n,risk_score:a,cbt_progress:d})}catch{return e.json({error:"Failed to fetch dashboard data"},500)}});E.get("/assessment",async e=>{const t=await Bun.file("./public/static/assessment.html").text();return e.html(t)});E.get("/clinics",async e=>{try{const{DB:t}=e.env,{results:s}=await t.prepare("SELECT * FROM clinics ORDER BY name").all();return e.html(`
      <!DOCTYPE html>
      <html lang="ko">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>병원 찾기 - SomniCare</title>
          <script src="https://cdn.tailwindcss.com"><\/script>
          <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
          <style>
            .sleep-gradient { background: linear-gradient(135deg, #1f7ed6 0%, #1560a8 100%); }
            .clinic-card { transition: all 0.3s ease; }
            .clinic-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
          </style>
      </head>
      <body class="bg-gray-50">
          <header class="sleep-gradient text-white shadow-lg">
              <div class="max-w-7xl mx-auto px-4 py-4">
                  <div class="flex items-center justify-between">
                      <a href="/" class="flex items-center space-x-3">
                          <i class="fas fa-moon text-2xl"></i>
                          <h1 class="text-xl font-bold">SomniCare</h1>
                      </a>
                      <a href="/" class="text-sm hover:opacity-80"><i class="fas fa-home mr-1"></i>홈으로</a>
                  </div>
              </div>
          </header>

          <div class="max-w-7xl mx-auto px-4 py-8">
              <h2 class="text-3xl font-bold text-gray-800 mb-6">
                  <i class="fas fa-hospital text-blue-600 mr-2"></i>
                  전국 수면클리닉 검색
              </h2>
              
              <div class="grid md:grid-cols-2 gap-6">
                  ${s.map(r=>`
                    <div class="bg-white rounded-xl p-6 shadow-md clinic-card">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <h3 class="text-xl font-bold text-gray-800">${r.name}</h3>
                                <p class="text-sm text-gray-600 mt-1">
                                    <i class="fas fa-map-marker-alt mr-1"></i>
                                    ${r.address||r.city}
                                </p>
                            </div>
                            ${r.has_polysomnography?'<span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">수면다원검사</span>':""}
                        </div>
                        <div class="space-y-2 mt-4">
                            ${r.phone?`
                              <p class="text-sm text-gray-700">
                                  <i class="fas fa-phone text-green-600 mr-2"></i>
                                  <a href="tel:${r.phone}" class="hover:text-blue-600">${r.phone}</a>
                              </p>
                            `:""}
                            ${r.url?`
                              <p class="text-sm">
                                  <a href="${r.url}" target="_blank" class="text-blue-600 hover:text-blue-800">
                                      <i class="fas fa-external-link-alt mr-2"></i>
                                      웹사이트 방문
                                  </a>
                              </p>
                            `:""}
                        </div>
                    </div>
                  `).join("")}
              </div>
          </div>
      </body>
      </html>
    `)}catch{return e.json({error:"Failed to load clinics page"},500)}});E.get("/",e=>e.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SomniCare - 불면증 치료·케어 종합 관리 플랫폼</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          .sleep-gradient {
            background: linear-gradient(135deg, #1f7ed6 0%, #1560a8 100%);
          }
          .card-hover {
            transition: all 0.3s ease;
          }
          .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          }
          .risk-low { background: linear-gradient(135deg, #10b981, #059669); }
          .risk-medium { background: linear-gradient(135deg, #f59e0b, #d97706); }
          .risk-high { background: linear-gradient(135deg, #ef4444, #dc2626); }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Header -->
        <header class="sleep-gradient text-white shadow-lg">
            <div class="max-w-7xl mx-auto px-4 py-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-moon text-3xl"></i>
                        <div>
                            <h1 class="text-2xl font-bold">SomniCare</h1>
                            <p class="text-sm opacity-90">불면증 치료·케어 종합 플랫폼</p>
                        </div>
                    </div>
                    <nav class="hidden md:flex space-x-6">
                        <a href="/" class="hover:opacity-80">홈</a>
                        <a href="/assessment" class="hover:opacity-80">자가진단</a>
                        <a href="/program" class="hover:opacity-80">프로그램</a>
                        <a href="/clinics" class="hover:opacity-80">병원찾기</a>
                    </nav>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="sleep-gradient text-white py-16">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    당신의 잠은 치료 받을 수 있습니다
                </h2>
                <p class="text-xl mb-8 opacity-90">
                    과학 기반 맞춤 수면 루틴 + 가족/보호자 케어 + 병원 연계까지 한 번에
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/assessment" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
                        <i class="fas fa-clipboard-check mr-2"></i>
                        무료 불면증 검사 시작
                    </a>
                    <a href="/program" class="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition border-2 border-white">
                        <i class="fas fa-book-medical mr-2"></i>
                        프로그램 둘러보기
                    </a>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
                    세상에 하나뿐인 차별화 기능
                </h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Feature 1 -->
                    <div class="bg-blue-50 rounded-xl p-6 card-hover">
                        <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-chart-line text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-gray-800">실시간 리스크 스코어</h3>
                        <p class="text-gray-600">
                            폰 센서 + 생활 행동 데이터로 불면 위험도를 실시간 분석
                        </p>
                    </div>

                    <!-- Feature 2 -->
                    <div class="bg-green-50 rounded-xl p-6 card-hover">
                        <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-brain text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-gray-800">AI 맞춤 CBT-I</h3>
                        <p class="text-gray-600">
                            개인별 매일 업데이트되는 인지행동치료 프로토콜 자동 생성
                        </p>
                    </div>

                    <!-- Feature 3 -->
                    <div class="bg-purple-50 rounded-xl p-6 card-hover">
                        <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-users text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-gray-800">가족 케어 모드</h3>
                        <p class="text-gray-600">
                            시니어/환자 방 야간 감지 + 보호자 앱 실시간 연동
                        </p>
                    </div>

                    <!-- Feature 4 -->
                    <div class="bg-orange-50 rounded-xl p-6 card-hover">
                        <div class="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-hospital text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-gray-800">병원 연계 시스템</h3>
                        <p class="text-gray-600">
                            전국 수면클리닉 검색 + 수면다원검사 가능 병원 매핑
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Quick Actions -->
        <section class="py-16 bg-gray-100">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
                    빠른 시작하기
                </h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <!-- ISI Test -->
                    <div class="bg-white rounded-xl p-8 shadow-md card-hover">
                        <div class="text-center">
                            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-file-medical text-blue-600 text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-2">불면증 자가진단 (ISI)</h3>
                            <p class="text-gray-600 mb-6">3분이면 완료되는 과학적 검사</p>
                            <a href="/assessment?type=isi" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                                검사 시작 →
                            </a>
                        </div>
                    </div>

                    <!-- Sleep Log -->
                    <div class="bg-white rounded-xl p-8 shadow-md card-hover">
                        <div class="text-center">
                            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-bed text-green-600 text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-2">수면일지 작성</h3>
                            <p class="text-gray-600 mb-6">어제 밤 수면 상태 기록하기</p>
                            <a href="/sleep-log" class="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">
                                일지 쓰기 →
                            </a>
                        </div>
                    </div>

                    <!-- Find Clinic -->
                    <div class="bg-white rounded-xl p-8 shadow-md card-hover">
                        <div class="text-center">
                            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-map-marked-alt text-orange-600 text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-2">병원 찾기</h3>
                            <p class="text-gray-600 mb-6">가까운 수면클리닉 검색</p>
                            <a href="/clinics" class="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition">
                                병원 찾기 →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Statistics -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div class="text-4xl font-bold text-blue-600 mb-2">30%</div>
                        <div class="text-gray-600">수면 점수 개선율</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold text-green-600 mb-2">6주</div>
                        <div class="text-gray-600">CBT-I 프로그램</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold text-purple-600 mb-2">100+</div>
                        <div class="text-gray-600">전국 수면클리닉</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                        <div class="text-gray-600">AI 코치 상담</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-12">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 class="text-xl font-bold mb-4">SomniCare</h3>
                        <p class="text-gray-400">
                            불면증 치료·케어 종합 관리 플랫폼
                        </p>
                    </div>
                    <div>
                        <h3 class="font-bold mb-4">서비스</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/assessment" class="hover:text-white">자가진단</a></li>
                            <li><a href="/program" class="hover:text-white">CBT-I 프로그램</a></li>
                            <li><a href="/clinics" class="hover:text-white">병원 찾기</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-bold mb-4">정보</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/about" class="hover:text-white">소개</a></li>
                            <li><a href="/privacy" class="hover:text-white">개인정보처리방침</a></li>
                            <li><a href="/terms" class="hover:text-white">이용약관</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-bold mb-4">언어</h3>
                        <div class="flex gap-2">
                            <button class="px-3 py-1 bg-blue-600 rounded">한국어</button>
                            <button class="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">EN</button>
                            <button class="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">中文</button>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 SomniCare. All rights reserved.</p>
                </div>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <script>
          // Load dashboard data
          async function loadDashboard() {
            try {
              const response = await axios.get('/api/dashboard?user_id=1');
              console.log('Dashboard data:', response.data);
            } catch (error) {
              console.error('Failed to load dashboard:', error);
            }
          }
          
          // Check API health
          async function checkHealth() {
            try {
              const response = await axios.get('/api/health');
              console.log('API Health:', response.data);
            } catch (error) {
              console.error('API health check failed:', error);
            }
          }
          
          // Initialize
          document.addEventListener('DOMContentLoaded', () => {
            checkHealth();
            loadDashboard();
          });
        <\/script>
    </body>
    </html>
  `));const ze=new ft,hs=Object.assign({"/src/index.tsx":E});let gt=!1;for(const[,e]of Object.entries(hs))e&&(ze.all("*",t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),ze.notFound(t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),gt=!0);if(!gt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{ze as default};
