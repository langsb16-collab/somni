var xt=Object.defineProperty;var Le=e=>{throw TypeError(e)};var yt=(e,t,r)=>t in e?xt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var p=(e,t,r)=>yt(e,typeof t!="symbol"?t+"":t,r),Ne=(e,t,r)=>t.has(e)||Le("Cannot "+r);var o=(e,t,r)=>(Ne(e,t,"read from private field"),r?r.call(e):t.get(e)),g=(e,t,r)=>t.has(e)?Le("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),f=(e,t,r,s)=>(Ne(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),x=(e,t,r)=>(Ne(e,t,"access private method"),r);var Me=(e,t,r,s)=>({set _(n){f(e,t,n,r)},get _(){return o(e,t,s)}});var Be=(e,t,r)=>(s,n)=>{let i=-1;return a(0);async function a(d){if(d<=i)throw new Error("next() called multiple times");i=d;let c,l=!1,u;if(e[d]?(u=e[d][0][0],s.req.routeIndex=d):u=d===e.length&&n||void 0,u)try{c=await u(s,()=>a(d+1))}catch(h){if(h instanceof Error&&t)s.error=h,c=await t(h,s),l=!0;else throw h}else s.finalized===!1&&r&&(c=await r(s));return c&&(s.finalized===!1||l)&&(s.res=c),s}},bt=Symbol(),wt=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,i=(e instanceof st?e.raw.headers:e.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?Et(e,{all:r,dot:s}):{}};async function Et(e,t){const r=await e.formData();return r?_t(r,t):{}}function _t(e,t){const r=Object.create(null);return e.forEach((s,n)=>{t.all||n.endsWith("[]")?Rt(r,n,s):r[n]=s}),t.dot&&Object.entries(r).forEach(([s,n])=>{s.includes(".")&&(jt(r,s,n),delete r[s])}),r}var Rt=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},jt=(e,t,r)=>{let s=e;const n=t.split(".");n.forEach((i,a)=>{a===n.length-1?s[i]=r:((!s[i]||typeof s[i]!="object"||Array.isArray(s[i])||s[i]instanceof File)&&(s[i]=Object.create(null)),s=s[i])})},Xe=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},St=e=>{const{groups:t,path:r}=Ot(e),s=Xe(r);return Tt(s,t)},Ot=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const n=`@${s}`;return t.push([n,r]),n}),{groups:t,path:e}},Tt=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let n=e.length-1;n>=0;n--)if(e[n].includes(s)){e[n]=e[n].replace(s,t[r][1]);break}}return e},je={},Ct=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return je[s]||(r[2]?je[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:je[s]=[e,r[1],!0]),je[s]}return null},He=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},Dt=e=>He(e,decodeURI),Ze=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let s=r;for(;s<t.length;s++){const n=t.charCodeAt(s);if(n===37){const i=t.indexOf("?",s),a=t.slice(r,i===-1?void 0:i);return Dt(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(n===63)break}return t.slice(r,s)},At=e=>{const t=Ze(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},se=(e,t,...r)=>(r.length&&(t=se(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),et=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))s+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){r.length===0&&s===""?r.push("/"):r.push(s);const i=n.replace("?","");s+="/"+i,r.push(s)}else s+="/"+n}),r.filter((n,i,a)=>a.indexOf(n)===i)},Ie=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?He(e,rt):e):e,tt=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let a=e.indexOf("?",8);if(a===-1)return;for(e.startsWith(t,a+1)||(a=e.indexOf(`&${t}`,a+1));a!==-1;){const d=e.charCodeAt(a+t.length+1);if(d===61){const c=a+t.length+2,l=e.indexOf("&",c);return Ie(e.slice(c,l===-1?void 0:l))}else if(d==38||isNaN(d))return"";a=e.indexOf(`&${t}`,a+1)}if(s=/[%+]/.test(e),!s)return}const n={};s??(s=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){const a=e.indexOf("&",i+1);let d=e.indexOf("=",i);d>a&&a!==-1&&(d=-1);let c=e.slice(i+1,d===-1?a===-1?void 0:a:d);if(s&&(c=Ie(c)),i=a,c==="")continue;let l;d===-1?l="":(l=e.slice(d+1,a===-1?void 0:a),s&&(l=Ie(l))),r?(n[c]&&Array.isArray(n[c])||(n[c]=[]),n[c].push(l)):n[c]??(n[c]=l)}return t?n[t]:n},qt=tt,Nt=(e,t)=>tt(e,t,!0),rt=decodeURIComponent,$e=e=>He(e,rt),ae,T,L,nt,it,ke,$,Ye,st=(Ye=class{constructor(e,t="/",r=[[]]){g(this,L);p(this,"raw");g(this,ae);g(this,T);p(this,"routeIndex",0);p(this,"path");p(this,"bodyCache",{});g(this,$,e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const n=Object.keys(t)[0];return n?t[n].then(i=>(n==="json"&&(i=JSON.stringify(i)),new Response(i)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,f(this,T,r),f(this,ae,{})}param(e){return e?x(this,L,nt).call(this,e):x(this,L,it).call(this)}query(e){return qt(this.url,e)}queries(e){return Nt(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await wt(this,e))}json(){return o(this,$).call(this,"text").then(e=>JSON.parse(e))}text(){return o(this,$).call(this,"text")}arrayBuffer(){return o(this,$).call(this,"arrayBuffer")}blob(){return o(this,$).call(this,"blob")}formData(){return o(this,$).call(this,"formData")}addValidatedData(e,t){o(this,ae)[e]=t}valid(e){return o(this,ae)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[bt](){return o(this,T)}get matchedRoutes(){return o(this,T)[0].map(([[,e]])=>e)}get routePath(){return o(this,T)[0].map(([[,e]])=>e)[this.routeIndex].path}},ae=new WeakMap,T=new WeakMap,L=new WeakSet,nt=function(e){const t=o(this,T)[0][this.routeIndex][1][e],r=x(this,L,ke).call(this,t);return r&&/\%/.test(r)?$e(r):r},it=function(){const e={},t=Object.keys(o(this,T)[0][this.routeIndex][1]);for(const r of t){const s=x(this,L,ke).call(this,o(this,T)[0][this.routeIndex][1][r]);s!==void 0&&(e[r]=/\%/.test(s)?$e(s):s)}return e},ke=function(e){return o(this,T)[1]?o(this,T)[1][e]:e},$=new WeakMap,Ye),It={Stringify:1},at=async(e,t,r,s,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const i=e.callbacks;return i!=null&&i.length?(n?n[0]+=e:n=[e],Promise.all(i.map(d=>d({phase:t,buffer:n,context:s}))).then(d=>Promise.all(d.filter(Boolean).map(c=>at(c,t,!1,s,n))).then(()=>n[0]))):Promise.resolve(e)},Ft="text/plain; charset=UTF-8",Fe=(e,t)=>({"Content-Type":e,...t}),ve,xe,F,oe,k,O,ye,ce,le,G,be,we,W,ne,Ve,kt=(Ve=class{constructor(e,t){g(this,W);g(this,ve);g(this,xe);p(this,"env",{});g(this,F);p(this,"finalized",!1);p(this,"error");g(this,oe);g(this,k);g(this,O);g(this,ye);g(this,ce);g(this,le);g(this,G);g(this,be);g(this,we);p(this,"render",(...e)=>(o(this,ce)??f(this,ce,t=>this.html(t)),o(this,ce).call(this,...e)));p(this,"setLayout",e=>f(this,ye,e));p(this,"getLayout",()=>o(this,ye));p(this,"setRenderer",e=>{f(this,ce,e)});p(this,"header",(e,t,r)=>{this.finalized&&f(this,O,new Response(o(this,O).body,o(this,O)));const s=o(this,O)?o(this,O).headers:o(this,G)??f(this,G,new Headers);t===void 0?s.delete(e):r!=null&&r.append?s.append(e,t):s.set(e,t)});p(this,"status",e=>{f(this,oe,e)});p(this,"set",(e,t)=>{o(this,F)??f(this,F,new Map),o(this,F).set(e,t)});p(this,"get",e=>o(this,F)?o(this,F).get(e):void 0);p(this,"newResponse",(...e)=>x(this,W,ne).call(this,...e));p(this,"body",(e,t,r)=>x(this,W,ne).call(this,e,t,r));p(this,"text",(e,t,r)=>!o(this,G)&&!o(this,oe)&&!t&&!r&&!this.finalized?new Response(e):x(this,W,ne).call(this,e,t,Fe(Ft,r)));p(this,"json",(e,t,r)=>x(this,W,ne).call(this,JSON.stringify(e),t,Fe("application/json",r)));p(this,"html",(e,t,r)=>{const s=n=>x(this,W,ne).call(this,n,t,Fe("text/html; charset=UTF-8",r));return typeof e=="object"?at(e,It.Stringify,!1,{}).then(s):s(e)});p(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});p(this,"notFound",()=>(o(this,le)??f(this,le,()=>new Response),o(this,le).call(this,this)));f(this,ve,e),t&&(f(this,k,t.executionCtx),this.env=t.env,f(this,le,t.notFoundHandler),f(this,we,t.path),f(this,be,t.matchResult))}get req(){return o(this,xe)??f(this,xe,new st(o(this,ve),o(this,we),o(this,be))),o(this,xe)}get event(){if(o(this,k)&&"respondWith"in o(this,k))return o(this,k);throw Error("This context has no FetchEvent")}get executionCtx(){if(o(this,k))return o(this,k);throw Error("This context has no ExecutionContext")}get res(){return o(this,O)||f(this,O,new Response(null,{headers:o(this,G)??f(this,G,new Headers)}))}set res(e){if(o(this,O)&&e){e=new Response(e.body,e);for(const[t,r]of o(this,O).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=o(this,O).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of s)e.headers.append("set-cookie",n)}else e.headers.set(t,r)}f(this,O,e),this.finalized=!0}get var(){return o(this,F)?Object.fromEntries(o(this,F)):{}}},ve=new WeakMap,xe=new WeakMap,F=new WeakMap,oe=new WeakMap,k=new WeakMap,O=new WeakMap,ye=new WeakMap,ce=new WeakMap,le=new WeakMap,G=new WeakMap,be=new WeakMap,we=new WeakMap,W=new WeakSet,ne=function(e,t,r){const s=o(this,O)?new Headers(o(this,O).headers):o(this,G)??new Headers;if(typeof t=="object"&&"headers"in t){const i=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[a,d]of i)a.toLowerCase()==="set-cookie"?s.append(a,d):s.set(a,d)}if(r)for(const[i,a]of Object.entries(r))if(typeof a=="string")s.set(i,a);else{s.delete(i);for(const d of a)s.append(i,d)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??o(this,oe);return new Response(e,{status:n,headers:s})},Ve),w="ALL",Ht="all",Pt=["get","post","put","delete","options","patch"],ot="Can not add a route since the matcher is already built.",ct=class extends Error{},Lt="__COMPOSED_HANDLER",Mt=e=>e.text("404 Not Found",404),We=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},C,E,lt,D,K,Se,Oe,de,Bt=(de=class{constructor(t={}){g(this,E);p(this,"get");p(this,"post");p(this,"put");p(this,"delete");p(this,"options");p(this,"patch");p(this,"all");p(this,"on");p(this,"use");p(this,"router");p(this,"getPath");p(this,"_basePath","/");g(this,C,"/");p(this,"routes",[]);g(this,D,Mt);p(this,"errorHandler",We);p(this,"onError",t=>(this.errorHandler=t,this));p(this,"notFound",t=>(f(this,D,t),this));p(this,"fetch",(t,...r)=>x(this,E,Oe).call(this,t,r[1],r[0],t.method));p(this,"request",(t,r,s,n)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${se("/",t)}`,r),s,n)));p(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(x(this,E,Oe).call(this,t.request,t,void 0,t.request.method))})});[...Pt,Ht].forEach(i=>{this[i]=(a,...d)=>(typeof a=="string"?f(this,C,a):x(this,E,K).call(this,i,o(this,C),a),d.forEach(c=>{x(this,E,K).call(this,i,o(this,C),c)}),this)}),this.on=(i,a,...d)=>{for(const c of[a].flat()){f(this,C,c);for(const l of[i].flat())d.map(u=>{x(this,E,K).call(this,l.toUpperCase(),o(this,C),u)})}return this},this.use=(i,...a)=>(typeof i=="string"?f(this,C,i):(f(this,C,"*"),a.unshift(i)),a.forEach(d=>{x(this,E,K).call(this,w,o(this,C),d)}),this);const{strict:s,...n}=t;Object.assign(this,n),this.getPath=s??!0?t.getPath??Ze:At}route(t,r){const s=this.basePath(t);return r.routes.map(n=>{var a;let i;r.errorHandler===We?i=n.handler:(i=async(d,c)=>(await Be([],r.errorHandler)(d,()=>n.handler(d,c))).res,i[Lt]=n.handler),x(a=s,E,K).call(a,n.method,n.path,i)}),this}basePath(t){const r=x(this,E,lt).call(this);return r._basePath=se(this._basePath,t),r}mount(t,r,s){let n,i;s&&(typeof s=="function"?i=s:(i=s.optionHandler,s.replaceRequest===!1?n=c=>c:n=s.replaceRequest));const a=i?c=>{const l=i(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};n||(n=(()=>{const c=se(this._basePath,t),l=c==="/"?0:c.length;return u=>{const h=new URL(u.url);return h.pathname=h.pathname.slice(l)||"/",new Request(h,u)}})());const d=async(c,l)=>{const u=await r(n(c.req.raw),...a(c));if(u)return u;await l()};return x(this,E,K).call(this,w,se(t,"*"),d),this}},C=new WeakMap,E=new WeakSet,lt=function(){const t=new de({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,D,o(this,D)),t.routes=this.routes,t},D=new WeakMap,K=function(t,r,s){t=t.toUpperCase(),r=se(this._basePath,r);const n={basePath:this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,n]),this.routes.push(n)},Se=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},Oe=function(t,r,s,n){if(n==="HEAD")return(async()=>new Response(null,await x(this,E,Oe).call(this,t,r,s,"GET")))();const i=this.getPath(t,{env:s}),a=this.router.match(n,i),d=new kt(t,{path:i,matchResult:a,env:s,executionCtx:r,notFoundHandler:o(this,D)});if(a[0].length===1){let l;try{l=a[0][0][0][0](d,async()=>{d.res=await o(this,D).call(this,d)})}catch(u){return x(this,E,Se).call(this,u,d)}return l instanceof Promise?l.then(u=>u||(d.finalized?d.res:o(this,D).call(this,d))).catch(u=>x(this,E,Se).call(this,u,d)):l??o(this,D).call(this,d)}const c=Be(a[0],this.errorHandler,o(this,D));return(async()=>{try{const l=await c(d);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return x(this,E,Se).call(this,l,d)}})()},de),dt=[];function $t(e,t){const r=this.buildAllMatchers(),s=((n,i)=>{const a=r[n]||r[w],d=a[2][i];if(d)return d;const c=i.match(a[0]);if(!c)return[[],dt];const l=c.indexOf("",1);return[a[1][l],c]});return this.match=s,s(e,t)}var Ce="[^/]+",ge=".*",me="(?:|/.*)",ie=Symbol(),Wt=new Set(".\\+*[^]$()");function Ut(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===ge||e===me?1:t===ge||t===me?-1:e===Ce?1:t===Ce?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Q,X,A,te,zt=(te=class{constructor(){g(this,Q);g(this,X);g(this,A,Object.create(null))}insert(t,r,s,n,i){if(t.length===0){if(o(this,Q)!==void 0)throw ie;if(i)return;f(this,Q,r);return}const[a,...d]=t,c=a==="*"?d.length===0?["","",ge]:["","",Ce]:a==="/*"?["","",me]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const u=c[1];let h=c[2]||Ce;if(u&&c[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw ie;if(l=o(this,A)[h],!l){if(Object.keys(o(this,A)).some(m=>m!==ge&&m!==me))throw ie;if(i)return;l=o(this,A)[h]=new te,u!==""&&f(l,X,n.varIndex++)}!i&&u!==""&&s.push([u,o(l,X)])}else if(l=o(this,A)[a],!l){if(Object.keys(o(this,A)).some(u=>u.length>1&&u!==ge&&u!==me))throw ie;if(i)return;l=o(this,A)[a]=new te}l.insert(d,r,s,n,i)}buildRegExpStr(){const r=Object.keys(o(this,A)).sort(Ut).map(s=>{const n=o(this,A)[s];return(typeof o(n,X)=="number"?`(${s})@${o(n,X)}`:Wt.has(s)?`\\${s}`:s)+n.buildRegExpStr()});return typeof o(this,Q)=="number"&&r.unshift(`#${o(this,Q)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},Q=new WeakMap,X=new WeakMap,A=new WeakMap,te),De,Ee,Ke,Yt=(Ke=class{constructor(){g(this,De,{varIndex:0});g(this,Ee,new zt)}insert(e,t,r){const s=[],n=[];for(let a=0;;){let d=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const l=`@\\${a}`;return n[a]=[l,c],a++,d=!0,l}),!d)break}const i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=n.length-1;a>=0;a--){const[d]=n[a];for(let c=i.length-1;c>=0;c--)if(i[c].indexOf(d)!==-1){i[c]=i[c].replace(d,n[a][1]);break}}return o(this,Ee).insert(i,t,s,o(this,De),r),s}buildRegExp(){let e=o(this,Ee).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,i,a)=>i!==void 0?(r[++t]=Number(i),"$()"):(a!==void 0&&(s[Number(a)]=++t),"")),[new RegExp(`^${e}`),r,s]}},De=new WeakMap,Ee=new WeakMap,Ke),Vt=[/^$/,[],Object.create(null)],Te=Object.create(null);function ut(e){return Te[e]??(Te[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function Kt(){Te=Object.create(null)}function Jt(e){var l;const t=new Yt,r=[];if(e.length===0)return Vt;const s=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,h],[m,b])=>u?1:m?-1:h.length-b.length),n=Object.create(null);for(let u=0,h=-1,m=s.length;u<m;u++){const[b,_,q]=s[u];b?n[_]=[q.map(([R])=>[R,Object.create(null)]),dt]:h++;let y;try{y=t.insert(_,h,b)}catch(R){throw R===ie?new ct(_):R}b||(r[h]=q.map(([R,M])=>{const _e=Object.create(null);for(M-=1;M>=0;M--){const[Re,N]=y[M];_e[Re]=N}return[R,_e]}))}const[i,a,d]=t.buildRegExp();for(let u=0,h=r.length;u<h;u++)for(let m=0,b=r[u].length;m<b;m++){const _=(l=r[u][m])==null?void 0:l[1];if(!_)continue;const q=Object.keys(_);for(let y=0,R=q.length;y<R;y++)_[q[y]]=d[_[q[y]]]}const c=[];for(const u in a)c[u]=r[a[u]];return[i,c,n]}function re(e,t){if(e){for(const r of Object.keys(e).sort((s,n)=>n.length-s.length))if(ut(r).test(t))return[...e[r]]}}var U,z,Ae,ht,Je,Gt=(Je=class{constructor(){g(this,Ae);p(this,"name","RegExpRouter");g(this,U);g(this,z);p(this,"match",$t);f(this,U,{[w]:Object.create(null)}),f(this,z,{[w]:Object.create(null)})}add(e,t,r){var d;const s=o(this,U),n=o(this,z);if(!s||!n)throw new Error(ot);s[e]||[s,n].forEach(c=>{c[e]=Object.create(null),Object.keys(c[w]).forEach(l=>{c[e][l]=[...c[w][l]]})}),t==="/*"&&(t="*");const i=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=ut(t);e===w?Object.keys(s).forEach(l=>{var u;(u=s[l])[t]||(u[t]=re(s[l],t)||re(s[w],t)||[])}):(d=s[e])[t]||(d[t]=re(s[e],t)||re(s[w],t)||[]),Object.keys(s).forEach(l=>{(e===w||e===l)&&Object.keys(s[l]).forEach(u=>{c.test(u)&&s[l][u].push([r,i])})}),Object.keys(n).forEach(l=>{(e===w||e===l)&&Object.keys(n[l]).forEach(u=>c.test(u)&&n[l][u].push([r,i]))});return}const a=et(t)||[t];for(let c=0,l=a.length;c<l;c++){const u=a[c];Object.keys(n).forEach(h=>{var m;(e===w||e===h)&&((m=n[h])[u]||(m[u]=[...re(s[h],u)||re(s[w],u)||[]]),n[h][u].push([r,i-l+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(o(this,z)).concat(Object.keys(o(this,U))).forEach(t=>{e[t]||(e[t]=x(this,Ae,ht).call(this,t))}),f(this,U,f(this,z,void 0)),Kt(),e}},U=new WeakMap,z=new WeakMap,Ae=new WeakSet,ht=function(e){const t=[];let r=e===w;return[o(this,U),o(this,z)].forEach(s=>{const n=s[e]?Object.keys(s[e]).map(i=>[i,s[e][i]]):[];n.length!==0?(r||(r=!0),t.push(...n)):e!==w&&t.push(...Object.keys(s[w]).map(i=>[i,s[w][i]]))}),r?Jt(t):null},Je),Y,H,Ge,Qt=(Ge=class{constructor(e){p(this,"name","SmartRouter");g(this,Y,[]);g(this,H,[]);f(this,Y,e.routers)}add(e,t,r){if(!o(this,H))throw new Error(ot);o(this,H).push([e,t,r])}match(e,t){if(!o(this,H))throw new Error("Fatal error");const r=o(this,Y),s=o(this,H),n=r.length;let i=0,a;for(;i<n;i++){const d=r[i];try{for(let c=0,l=s.length;c<l;c++)d.add(...s[c]);a=d.match(e,t)}catch(c){if(c instanceof ct)continue;throw c}this.match=d.match.bind(d),f(this,Y,[d]),f(this,H,void 0);break}if(i===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(o(this,H)||o(this,Y).length!==1)throw new Error("No active router has been determined yet.");return o(this,Y)[0]}},Y=new WeakMap,H=new WeakMap,Ge),pe=Object.create(null),V,S,Z,ue,j,P,J,he,Xt=(he=class{constructor(t,r,s){g(this,P);g(this,V);g(this,S);g(this,Z);g(this,ue,0);g(this,j,pe);if(f(this,S,s||Object.create(null)),f(this,V,[]),t&&r){const n=Object.create(null);n[t]={handler:r,possibleKeys:[],score:0},f(this,V,[n])}f(this,Z,[])}insert(t,r,s){f(this,ue,++Me(this,ue)._);let n=this;const i=St(r),a=[];for(let d=0,c=i.length;d<c;d++){const l=i[d],u=i[d+1],h=Ct(l,u),m=Array.isArray(h)?h[0]:l;if(m in o(n,S)){n=o(n,S)[m],h&&a.push(h[1]);continue}o(n,S)[m]=new he,h&&(o(n,Z).push(h),a.push(h[1])),n=o(n,S)[m]}return o(n,V).push({[t]:{handler:s,possibleKeys:a.filter((d,c,l)=>l.indexOf(d)===c),score:o(this,ue)}}),n}search(t,r){var c;const s=[];f(this,j,pe);let i=[this];const a=Xe(r),d=[];for(let l=0,u=a.length;l<u;l++){const h=a[l],m=l===u-1,b=[];for(let _=0,q=i.length;_<q;_++){const y=i[_],R=o(y,S)[h];R&&(f(R,j,o(y,j)),m?(o(R,S)["*"]&&s.push(...x(this,P,J).call(this,o(R,S)["*"],t,o(y,j))),s.push(...x(this,P,J).call(this,R,t,o(y,j)))):b.push(R));for(let M=0,_e=o(y,Z).length;M<_e;M++){const Re=o(y,Z)[M],N=o(y,j)===pe?{}:{...o(y,j)};if(Re==="*"){const B=o(y,S)["*"];B&&(s.push(...x(this,P,J).call(this,B,t,o(y,j))),f(B,j,N),b.push(B));continue}const[mt,Pe,fe]=Re;if(!h&&!(fe instanceof RegExp))continue;const I=o(y,S)[mt],vt=a.slice(l).join("/");if(fe instanceof RegExp){const B=fe.exec(vt);if(B){if(N[Pe]=B[0],s.push(...x(this,P,J).call(this,I,t,o(y,j),N)),Object.keys(o(I,S)).length){f(I,j,N);const qe=((c=B[0].match(/\//))==null?void 0:c.length)??0;(d[qe]||(d[qe]=[])).push(I)}continue}}(fe===!0||fe.test(h))&&(N[Pe]=h,m?(s.push(...x(this,P,J).call(this,I,t,N,o(y,j))),o(I,S)["*"]&&s.push(...x(this,P,J).call(this,o(I,S)["*"],t,N,o(y,j)))):(f(I,j,N),b.push(I)))}}i=b.concat(d.shift()??[])}return s.length>1&&s.sort((l,u)=>l.score-u.score),[s.map(({handler:l,params:u})=>[l,u])]}},V=new WeakMap,S=new WeakMap,Z=new WeakMap,ue=new WeakMap,j=new WeakMap,P=new WeakSet,J=function(t,r,s,n){const i=[];for(let a=0,d=o(t,V).length;a<d;a++){const c=o(t,V)[a],l=c[r]||c[w],u={};if(l!==void 0&&(l.params=Object.create(null),i.push(l),s!==pe||n&&n!==pe))for(let h=0,m=l.possibleKeys.length;h<m;h++){const b=l.possibleKeys[h],_=u[l.score];l.params[b]=n!=null&&n[b]&&!_?n[b]:s[b]??(n==null?void 0:n[b]),u[l.score]=!0}}return i},he),ee,Qe,Zt=(Qe=class{constructor(){p(this,"name","TrieRouter");g(this,ee);f(this,ee,new Xt)}add(e,t,r){const s=et(t);if(s){for(let n=0,i=s.length;n<i;n++)o(this,ee).insert(e,s[n],r);return}o(this,ee).insert(e,t,r)}match(e,t){return o(this,ee).search(e,t)}},ee=new WeakMap,Qe),ft=class extends Bt{constructor(e={}){super(e),this.router=e.router??new Qt({routers:[new Gt,new Zt]})}},er=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(i=>typeof i=="string"?i==="*"?()=>i:a=>i===a?a:null:typeof i=="function"?i:a=>i.includes(a)?a:null)(r.origin),n=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(r.allowMethods);return async function(a,d){var u;function c(h,m){a.res.headers.set(h,m)}const l=await s(a.req.header("origin")||"",a);if(l&&c("Access-Control-Allow-Origin",l),r.credentials&&c("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&c("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),a.req.method==="OPTIONS"){r.origin!=="*"&&c("Vary","Origin"),r.maxAge!=null&&c("Access-Control-Max-Age",r.maxAge.toString());const h=await n(a.req.header("origin")||"",a);h.length&&c("Access-Control-Allow-Methods",h.join(","));let m=r.allowHeaders;if(!(m!=null&&m.length)){const b=a.req.header("Access-Control-Request-Headers");b&&(m=b.split(/\s*,\s*/))}return m!=null&&m.length&&(c("Access-Control-Allow-Headers",m.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await d(),r.origin!=="*"&&a.header("Vary","Origin",{append:!0})}},tr=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Ue=(e,t=sr)=>{const r=/\.([a-zA-Z0-9]+?)$/,s=e.match(r);if(!s)return;let n=t[s[1]];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},rr={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},sr=rr,nr=(...e)=>{let t=e.filter(n=>n!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),s=[];for(const n of r)n===".."&&s.length>0&&s.at(-1)!==".."?s.pop():n!=="."&&s.push(n);return s.join("/")||"."},pt={br:".br",zstd:".zst",gzip:".gz"},ir=Object.keys(pt),ar="index.html",or=e=>{const t=e.root??"./",r=e.path,s=e.join??nr;return async(n,i)=>{var u,h,m,b;if(n.finalized)return i();let a;if(e.path)a=e.path;else try{if(a=decodeURIComponent(n.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))throw new Error}catch{return await((u=e.onNotFound)==null?void 0:u.call(e,n.req.path,n)),i()}let d=s(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(a):a);e.isDir&&await e.isDir(d)&&(d=s(d,ar));const c=e.getContent;let l=await c(d,n);if(l instanceof Response)return n.newResponse(l.body,l);if(l){const _=e.mimes&&Ue(d,e.mimes)||Ue(d);if(n.header("Content-Type",_||"application/octet-stream"),e.precompressed&&(!_||tr.test(_))){const q=new Set((h=n.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(y=>y.trim()));for(const y of ir){if(!q.has(y))continue;const R=await c(d+pt[y],n);if(R){l=R,n.header("Content-Encoding",y),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((m=e.onFound)==null?void 0:m.call(e,d,n)),n.body(l)}await((b=e.onNotFound)==null?void 0:b.call(e,d,n)),await i()}},cr=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const n=r[e]||e;if(!n)return null;const i=await s.get(n,{type:"stream"});return i||null},lr=e=>async function(r,s){return or({...e,getContent:async i=>cr(i,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,s)},dr=e=>lr(e);const v=new ft;v.use("/api/*",er());v.use("/static/*",dr({root:"./"}));v.get("/api/health",e=>e.json({status:"ok",timestamp:new Date().toISOString()}));v.get("/api/questionnaires",async e=>{try{const{DB:t}=e.env,{results:r}=await t.prepare("SELECT * FROM questionnaires").all();return e.json({questionnaires:r})}catch{return e.json({error:"Failed to fetch questionnaires"},500)}});v.get("/api/questionnaires/:type",async e=>{try{const{DB:t}=e.env,r=e.req.param("type"),s=await t.prepare("SELECT * FROM questionnaires WHERE type = ?").bind(r).first();return s?e.json({questionnaire:s}):e.json({error:"Questionnaire not found"},404)}catch{return e.json({error:"Failed to fetch questionnaire"},500)}});v.post("/api/questionnaires/:type/responses",async e=>{try{const{DB:t}=e.env,r=e.req.param("type"),{user_id:s=1,answers:n,score:i,email:a}=await e.req.json(),d=await t.prepare("SELECT * FROM questionnaires WHERE type = ?").bind(r).first();if(!d)return e.json({error:"Questionnaire not found"},404);let c="";r==="ISI"&&(i<=7?c="정상 범위":i<=14?c="경도 불면":i<=21?c="중등도 불면":c="중증 불면 / 전문 상담 권장");const l=await t.prepare(`
      INSERT INTO questionnaire_responses (user_id, questionnaire_id, score, answers_json, interpretation)
      VALUES (?, ?, ?, ?, ?)
    `).bind(s,d.id,i,JSON.stringify(n),c).run();return e.json({success:!0,response_id:l.meta.last_row_id,score:i,interpretation:c})}catch{return e.json({error:"Failed to save response"},500)}});v.get("/api/sleep-sessions",async e=>{try{const{DB:t}=e.env,r=e.req.query("user_id")||"1",s=e.req.query("from"),n=e.req.query("to");let i="SELECT * FROM sleep_sessions WHERE user_id = ?";const a=[r];s&&n&&(i+=" AND date BETWEEN ? AND ?",a.push(s,n)),i+=" ORDER BY date DESC LIMIT 30";const{results:d}=await t.prepare(i).bind(...a).all();return e.json({sessions:d})}catch{return e.json({error:"Failed to fetch sleep sessions"},500)}});v.post("/api/sleep-sessions",async e=>{try{const{DB:t}=e.env,{user_id:r=1,date:s,sleep_onset:n,wake_time:i,awakenings_count:a=0,sleep_efficiency:d,sleep_quality:c,notes:l}=await e.req.json(),u=await t.prepare(`
      INSERT INTO sleep_sessions (user_id, date, sleep_onset, wake_time, awakenings_count, sleep_efficiency, sleep_quality, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(r,s,n,i,a,d,c,l).run();return e.json({success:!0,session_id:u.meta.last_row_id})}catch{return e.json({error:"Failed to create sleep session"},500)}});v.get("/api/risk-score/today",async e=>{try{const{DB:t}=e.env,r=e.req.query("user_id")||"1",s=new Date().toISOString().split("T")[0],n=await t.prepare("SELECT * FROM risk_scores WHERE user_id = ? AND date = ?").bind(r,s).first();return e.json({risk_score:n||null})}catch{return e.json({error:"Failed to fetch risk score"},500)}});v.post("/api/risk-score",async e=>{try{const{DB:t}=e.env,{user_id:r=1,date:s,score:n,screen_time:i,noise_level:a,light_level:d,caffeine_intake:c,details:l}=await e.req.json(),u=await t.prepare(`
      INSERT INTO risk_scores (user_id, date, score, screen_time, noise_level, light_level, caffeine_intake, details_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(r,s,n,i,a,d,c,JSON.stringify(l||{})).run();return e.json({success:!0,risk_id:u.meta.last_row_id})}catch{return e.json({error:"Failed to save risk score"},500)}});v.get("/api/clinics",async e=>{try{const{DB:t}=e.env,r=e.req.query("city"),s=e.req.query("type");let n="SELECT * FROM clinics WHERE 1=1";const i=[];r&&(n+=" AND city LIKE ?",i.push(`%${r}%`)),s&&(n+=" AND type = ?",i.push(s)),n+=" ORDER BY name";const{results:a}=await t.prepare(n).bind(...i).all();return e.json({clinics:a})}catch{return e.json({error:"Failed to fetch clinics"},500)}});v.get("/api/clinics/:id",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),s=await t.prepare("SELECT * FROM clinics WHERE id = ?").bind(r).first();return s?e.json({clinic:s}):e.json({error:"Clinic not found"},404)}catch{return e.json({error:"Failed to fetch clinic"},500)}});v.get("/api/cbt/programs",async e=>{try{const{DB:t}=e.env,{results:r}=await t.prepare("SELECT * FROM cbt_programs WHERE is_active = 1").all();return e.json({programs:r})}catch{return e.json({error:"Failed to fetch programs"},500)}});v.get("/api/cbt/programs/:id/modules",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),{results:s}=await t.prepare("SELECT * FROM cbt_modules WHERE program_id = ? ORDER BY order_index").bind(r).all();return e.json({modules:s})}catch{return e.json({error:"Failed to fetch modules"},500)}});v.get("/api/dashboard",async e=>{try{const{DB:t}=e.env,r=e.req.query("user_id")||"1",s=await t.prepare("SELECT * FROM sleep_sessions WHERE user_id = ? ORDER BY date DESC LIMIT 1").bind(r).first(),n=await t.prepare(`
      SELECT qr.*, q.type 
      FROM questionnaire_responses qr 
      JOIN questionnaires q ON qr.questionnaire_id = q.id 
      WHERE qr.user_id = ? AND q.type = 'ISI' 
      ORDER BY qr.created_at DESC LIMIT 1
    `).bind(r).first(),i=new Date().toISOString().split("T")[0],a=await t.prepare("SELECT * FROM risk_scores WHERE user_id = ? AND date = ?").bind(r,i).first(),d=await t.prepare('SELECT * FROM user_cbt_progress WHERE user_id = ? AND status = "active" LIMIT 1').bind(r).first();return e.json({latest_sleep:s,latest_isi:n,risk_score:a,cbt_progress:d})}catch{return e.json({error:"Failed to fetch dashboard data"},500)}});v.get("/api/wellness/music",async e=>{try{const{DB:t}=e.env,r=e.req.query("category");let s="SELECT * FROM music_content WHERE 1=1";const n=[];r&&(s+=" AND category = ?",n.push(r)),s+=" ORDER BY play_count DESC, rating DESC";const{results:i}=await t.prepare(s).bind(...n).all();return e.json({music:i})}catch{return e.json({error:"Failed to fetch music content"},500)}});v.get("/api/wellness/music/:id",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),s=await t.prepare("SELECT * FROM music_content WHERE id = ?").bind(r).first();return s?e.json({music:s}):e.json({error:"Music not found"},404)}catch{return e.json({error:"Failed to fetch music"},500)}});v.get("/api/wellness/yoga",async e=>{try{const{DB:t}=e.env,r=e.req.query("category"),s=e.req.query("difficulty");let n="SELECT * FROM yoga_content WHERE 1=1";const i=[];r&&(n+=" AND category = ?",i.push(r)),s&&(n+=" AND difficulty = ?",i.push(s)),n+=" ORDER BY completion_count DESC, rating DESC";const{results:a}=await t.prepare(n).bind(...i).all();return e.json({yoga:a})}catch{return e.json({error:"Failed to fetch yoga content"},500)}});v.get("/api/wellness/yoga/:id",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),s=await t.prepare("SELECT * FROM yoga_content WHERE id = ?").bind(r).first();return s?e.json({yoga:s}):e.json({error:"Yoga not found"},404)}catch{return e.json({error:"Failed to fetch yoga"},500)}});v.get("/api/wellness/breathing",async e=>{try{const{DB:t}=e.env,r=e.req.query("type");let s="SELECT * FROM breathing_routines WHERE 1=1";const n=[];r&&(s+=" AND type = ?",n.push(r)),s+=" ORDER BY completion_count DESC, rating DESC";const{results:i}=await t.prepare(s).bind(...n).all();return e.json({breathing:i})}catch{return e.json({error:"Failed to fetch breathing routines"},500)}});v.get("/api/wellness/breathing/:id",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),s=await t.prepare("SELECT * FROM breathing_routines WHERE id = ?").bind(r).first();return s?e.json({breathing:s}):e.json({error:"Breathing routine not found"},404)}catch{return e.json({error:"Failed to fetch breathing routine"},500)}});v.get("/api/wellness/asmr",async e=>{try{const{DB:t}=e.env,r=e.req.query("category"),s=e.req.query("binaural");let n="SELECT * FROM asmr_content WHERE 1=1";const i=[];r&&(n+=" AND category = ?",i.push(r)),s==="true"&&(n+=" AND is_binaural = 1"),n+=" ORDER BY play_count DESC, rating DESC";const{results:a}=await t.prepare(n).bind(...i).all();return e.json({asmr:a})}catch{return e.json({error:"Failed to fetch ASMR content"},500)}});v.post("/api/wellness/activity",async e=>{try{const{DB:t}=e.env,{user_id:r=1,activity_type:s,content_id:n,content_title:i,duration_seconds:a,completed:d=!1,rating:c,feedback:l}=await e.req.json(),u=await t.prepare(`
      INSERT INTO wellness_activities (user_id, activity_type, content_id, content_title, duration_seconds, completed, rating, feedback)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(r,s,n,i,a,d?1:0,c,l).run();return e.json({success:!0,activity_id:u.meta.last_row_id})}catch{return e.json({error:"Failed to record activity"},500)}});v.get("/api/wellness/activities",async e=>{try{const{DB:t}=e.env,r=e.req.query("user_id")||"1",s=e.req.query("type");let n="SELECT * FROM wellness_activities WHERE user_id = ?";const i=[r];s&&(n+=" AND activity_type = ?",i.push(s)),n+=" ORDER BY created_at DESC LIMIT 50";const{results:a}=await t.prepare(n).bind(...i).all();return e.json({activities:a})}catch{return e.json({error:"Failed to fetch activities"},500)}});v.get("/api/wellness/preferences",async e=>{try{const{DB:t}=e.env,r=e.req.query("user_id")||"1",s=await t.prepare("SELECT * FROM user_wellness_preferences WHERE user_id = ?").bind(r).first();return e.json({preferences:s})}catch{return e.json({error:"Failed to fetch preferences"},500)}});v.post("/api/wellness/preferences",async e=>{try{const{DB:t}=e.env,{user_id:r=1,preferred_music_categories:s,preferred_yoga_categories:n,preferred_breathing_types:i,preferred_asmr_categories:a,night_mode_enabled:d=!0,auto_recommend_enabled:c=!0,accessibility_mode:l=!1}=await e.req.json(),u=await t.prepare(`
      INSERT OR REPLACE INTO user_wellness_preferences 
      (user_id, preferred_music_categories, preferred_yoga_categories, preferred_breathing_types, 
       preferred_asmr_categories, night_mode_enabled, auto_recommend_enabled, accessibility_mode, last_updated)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(r,JSON.stringify(s||[]),JSON.stringify(n||[]),JSON.stringify(i||[]),JSON.stringify(a||[]),d?1:0,c?1:0,l?1:0).run();return e.json({success:!0})}catch{return e.json({error:"Failed to save preferences"},500)}});v.get("/api/care/links",async e=>{try{const{DB:t}=e.env,r=e.req.query("user_id")||"1",s=e.req.query("role")||"all";let n='SELECT * FROM care_links WHERE status = "active" AND (';const i=[];s==="patient"?(n+="patient_id = ?)",i.push(r)):s==="caregiver"?(n+="caregiver_id = ?)",i.push(r)):(n+="patient_id = ? OR caregiver_id = ?)",i.push(r,r));const{results:a}=await t.prepare(n).bind(...i).all();return e.json({care_links:a})}catch{return e.json({error:"Failed to fetch care links"},500)}});v.post("/api/care/invite",async e=>{try{const{DB:t}=e.env,{user_id:r=1,permissions:s}=await e.req.json(),n=crypto.randomUUID(),i=new Date(Date.now()+600*1e3).toISOString(),a=await t.prepare(`
      INSERT INTO care_invites (patient_id, token, permissions_json, expires_at)
      VALUES (?, ?, ?, ?)
    `).bind(r,n,JSON.stringify(s),i).run();return e.json({success:!0,invite_id:a.meta.last_row_id,token:n,expires_at:i})}catch{return e.json({error:"Failed to create invite"},500)}});v.post("/api/care/accept",async e=>{try{const{DB:t}=e.env,{token:r,caregiver_id:s=1,relationship:n="family"}=await e.req.json(),i=await t.prepare('SELECT * FROM care_invites WHERE token = ? AND status = "pending"').bind(r).first();if(!i)return e.json({error:"Invalid or expired invite"},404);if(new Date(i.expires_at)<new Date)return await t.prepare('UPDATE care_invites SET status = "expired" WHERE id = ?').bind(i.id).run(),e.json({error:"Invite has expired"},400);const a=await t.prepare(`
      INSERT INTO care_links (patient_id, caregiver_id, relationship, permissions_json)
      VALUES (?, ?, ?, ?)
    `).bind(i.patient_id,s,n,i.permissions_json).run();return await t.prepare(`
      UPDATE care_invites SET status = "used", used_at = CURRENT_TIMESTAMP, used_by_user_id = ? 
      WHERE id = ?
    `).bind(s,i.id).run(),e.json({success:!0,care_link_id:a.meta.last_row_id})}catch{return e.json({error:"Failed to accept invite"},500)}});v.get("/api/care/alerts",async e=>{try{const{DB:t}=e.env,r=e.req.query("caregiver_id")||"1",s=e.req.query("unread_only")==="true";let n="SELECT * FROM care_alerts WHERE caregiver_id = ?";const i=[r];s&&(n+=" AND read_at IS NULL"),n+=" ORDER BY created_at DESC LIMIT 50";const{results:a}=await t.prepare(n).bind(...i).all();return e.json({alerts:a})}catch{return e.json({error:"Failed to fetch alerts"},500)}});v.get("/wellness",e=>e.redirect("/static/wellness.html"));v.get("/wellness/music",e=>e.redirect("/static/music.html"));v.get("/assessment",e=>e.redirect("/static/assessment.html"));v.get("/clinics",async e=>{try{const{DB:t}=e.env,{results:r}=await t.prepare("SELECT * FROM clinics ORDER BY name").all();return e.html(`
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
                  ${r.map(s=>`
                    <div class="bg-white rounded-xl p-6 shadow-md clinic-card">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <h3 class="text-xl font-bold text-gray-800">${s.name}</h3>
                                <p class="text-sm text-gray-600 mt-1">
                                    <i class="fas fa-map-marker-alt mr-1"></i>
                                    ${s.address||s.city}
                                </p>
                            </div>
                            ${s.has_polysomnography?'<span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">수면다원검사</span>':""}
                        </div>
                        <div class="space-y-2 mt-4">
                            ${s.phone?`
                              <p class="text-sm text-gray-700">
                                  <i class="fas fa-phone text-green-600 mr-2"></i>
                                  <a href="tel:${s.phone}" class="hover:text-blue-600">${s.phone}</a>
                              </p>
                            `:""}
                            ${s.url?`
                              <p class="text-sm">
                                  <a href="${s.url}" target="_blank" class="text-blue-600 hover:text-blue-800">
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
    `)}catch{return e.json({error:"Failed to load clinics page"},500)}});v.get("/",e=>e.html(`
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
                        <a href="/wellness" class="hover:opacity-80">웰니스</a>
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
                <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
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

                    <!-- Feature 3 - NEW Wellness -->
                    <div class="bg-purple-50 rounded-xl p-6 card-hover cursor-pointer" onclick="window.location.href='/wellness'">
                        <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-spa text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-gray-800">웰니스 콘텐츠</h3>
                        <p class="text-gray-600">
                            음악·요가·호흡·ASMR 힐링 콘텐츠로 수면 보조
                        </p>
                    </div>

                    <!-- Feature 4 -->
                    <div class="bg-pink-50 rounded-xl p-6 card-hover">
                        <div class="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-users text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-gray-800">가족 케어 모드</h3>
                        <p class="text-gray-600">
                            시니어/환자 방 야간 감지 + 보호자 앱 실시간 연동
                        </p>
                    </div>

                    <!-- Feature 5 -->
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
  `));const ze=new ft,ur=Object.assign({"/src/index.tsx":v});let gt=!1;for(const[,e]of Object.entries(ur))e&&(ze.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),ze.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),gt=!0);if(!gt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{ze as default};
