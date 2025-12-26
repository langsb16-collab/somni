var vt=Object.defineProperty;var Me=e=>{throw TypeError(e)};var xt=(e,t,r)=>t in e?vt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var g=(e,t,r)=>xt(e,typeof t!="symbol"?t+"":t,r),Ae=(e,t,r)=>t.has(e)||Me("Cannot "+r);var d=(e,t,r)=>(Ae(e,t,"read from private field"),r?r.call(e):t.get(e)),m=(e,t,r)=>t.has(e)?Me("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),f=(e,t,r,s)=>(Ae(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),v=(e,t,r)=>(Ae(e,t,"access private method"),r);var Be=(e,t,r,s)=>({set _(n){f(e,t,n,r)},get _(){return d(e,t,s)}});var Pe=(e,t,r)=>(s,n)=>{let a=-1;return i(0);async function i(l){if(l<=a)throw new Error("next() called multiple times");a=l;let c,o=!1,u;if(e[l]?(u=e[l][0][0],s.req.routeIndex=l):u=l===e.length&&n||void 0,u)try{c=await u(s,()=>i(l+1))}catch(p){if(p instanceof Error&&t)s.error=p,c=await t(p,s),o=!0;else throw p}else s.finalized===!1&&r&&(c=await r(s));return c&&(s.finalized===!1||o)&&(s.res=c),s}},bt=Symbol(),_t=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,a=(e instanceof st?e.raw.headers:e.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?wt(e,{all:r,dot:s}):{}};async function wt(e,t){const r=await e.formData();return r?Et(r,t):{}}function Et(e,t){const r=Object.create(null);return e.forEach((s,n)=>{t.all||n.endsWith("[]")?Rt(r,n,s):r[n]=s}),t.dot&&Object.entries(r).forEach(([s,n])=>{s.includes(".")&&(St(r,s,n),delete r[s])}),r}var Rt=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},St=(e,t,r)=>{let s=e;const n=t.split(".");n.forEach((a,i)=>{i===n.length-1?s[a]=r:((!s[a]||typeof s[a]!="object"||Array.isArray(s[a])||s[a]instanceof File)&&(s[a]=Object.create(null)),s=s[a])})},Xe=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},jt=e=>{const{groups:t,path:r}=Dt(e),s=Xe(r);return Tt(s,t)},Dt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const n=`@${s}`;return t.push([n,r]),n}),{groups:t,path:e}},Tt=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let n=e.length-1;n>=0;n--)if(e[n].includes(s)){e[n]=e[n].replace(s,t[r][1]);break}}return e},Se={},qt=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return Se[s]||(r[2]?Se[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:Se[s]=[e,r[1],!0]),Se[s]}return null},Fe=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},kt=e=>Fe(e,decodeURI),Ze=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let s=r;for(;s<t.length;s++){const n=t.charCodeAt(s);if(n===37){const a=t.indexOf("?",s),i=t.slice(r,a===-1?void 0:a);return kt(i.includes("%25")?i.replace(/%25/g,"%2525"):i)}else if(n===63)break}return t.slice(r,s)},Ct=e=>{const t=Ze(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},se=(e,t,...r)=>(r.length&&(t=se(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),et=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))s+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){r.length===0&&s===""?r.push("/"):r.push(s);const a=n.replace("?","");s+="/"+a,r.push(s)}else s+="/"+n}),r.filter((n,a,i)=>i.indexOf(n)===a)},Ie=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Fe(e,rt):e):e,tt=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const l=e.charCodeAt(i+t.length+1);if(l===61){const c=i+t.length+2,o=e.indexOf("&",c);return Ie(e.slice(c,o===-1?void 0:o))}else if(l==38||isNaN(l))return"";i=e.indexOf(`&${t}`,i+1)}if(s=/[%+]/.test(e),!s)return}const n={};s??(s=/[%+]/.test(e));let a=e.indexOf("?",8);for(;a!==-1;){const i=e.indexOf("&",a+1);let l=e.indexOf("=",a);l>i&&i!==-1&&(l=-1);let c=e.slice(a+1,l===-1?i===-1?void 0:i:l);if(s&&(c=Ie(c)),a=i,c==="")continue;let o;l===-1?o="":(o=e.slice(l+1,i===-1?void 0:i),s&&(o=Ie(o))),r?(n[c]&&Array.isArray(n[c])||(n[c]=[]),n[c].push(o)):n[c]??(n[c]=o)}return t?n[t]:n},Ot=tt,At=(e,t)=>tt(e,t,!0),rt=decodeURIComponent,We=e=>Fe(e,rt),ie,T,M,nt,at,Le,W,Ve,st=(Ve=class{constructor(e,t="/",r=[[]]){m(this,M);g(this,"raw");m(this,ie);m(this,T);g(this,"routeIndex",0);g(this,"path");g(this,"bodyCache",{});m(this,W,e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const n=Object.keys(t)[0];return n?t[n].then(a=>(n==="json"&&(a=JSON.stringify(a)),new Response(a)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,f(this,T,r),f(this,ie,{})}param(e){return e?v(this,M,nt).call(this,e):v(this,M,at).call(this)}query(e){return Ot(this.url,e)}queries(e){return At(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await _t(this,e))}json(){return d(this,W).call(this,"text").then(e=>JSON.parse(e))}text(){return d(this,W).call(this,"text")}arrayBuffer(){return d(this,W).call(this,"arrayBuffer")}blob(){return d(this,W).call(this,"blob")}formData(){return d(this,W).call(this,"formData")}addValidatedData(e,t){d(this,ie)[e]=t}valid(e){return d(this,ie)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[bt](){return d(this,T)}get matchedRoutes(){return d(this,T)[0].map(([[,e]])=>e)}get routePath(){return d(this,T)[0].map(([[,e]])=>e)[this.routeIndex].path}},ie=new WeakMap,T=new WeakMap,M=new WeakSet,nt=function(e){const t=d(this,T)[0][this.routeIndex][1][e],r=v(this,M,Le).call(this,t);return r&&/\%/.test(r)?We(r):r},at=function(){const e={},t=Object.keys(d(this,T)[0][this.routeIndex][1]);for(const r of t){const s=v(this,M,Le).call(this,d(this,T)[0][this.routeIndex][1][r]);s!==void 0&&(e[r]=/\%/.test(s)?We(s):s)}return e},Le=function(e){return d(this,T)[1]?d(this,T)[1][e]:e},W=new WeakMap,Ve),It={Stringify:1},it=async(e,t,r,s,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const a=e.callbacks;return a!=null&&a.length?(n?n[0]+=e:n=[e],Promise.all(a.map(l=>l({phase:t,buffer:n,context:s}))).then(l=>Promise.all(l.filter(Boolean).map(c=>it(c,t,!1,s,n))).then(()=>n[0]))):Promise.resolve(e)},Nt="text/plain; charset=UTF-8",Ne=(e,t)=>({"Content-Type":e,...t}),ye,ve,N,oe,L,D,xe,ce,le,G,be,_e,$,ne,ze,Lt=(ze=class{constructor(e,t){m(this,$);m(this,ye);m(this,ve);g(this,"env",{});m(this,N);g(this,"finalized",!1);g(this,"error");m(this,oe);m(this,L);m(this,D);m(this,xe);m(this,ce);m(this,le);m(this,G);m(this,be);m(this,_e);g(this,"render",(...e)=>(d(this,ce)??f(this,ce,t=>this.html(t)),d(this,ce).call(this,...e)));g(this,"setLayout",e=>f(this,xe,e));g(this,"getLayout",()=>d(this,xe));g(this,"setRenderer",e=>{f(this,ce,e)});g(this,"header",(e,t,r)=>{this.finalized&&f(this,D,new Response(d(this,D).body,d(this,D)));const s=d(this,D)?d(this,D).headers:d(this,G)??f(this,G,new Headers);t===void 0?s.delete(e):r!=null&&r.append?s.append(e,t):s.set(e,t)});g(this,"status",e=>{f(this,oe,e)});g(this,"set",(e,t)=>{d(this,N)??f(this,N,new Map),d(this,N).set(e,t)});g(this,"get",e=>d(this,N)?d(this,N).get(e):void 0);g(this,"newResponse",(...e)=>v(this,$,ne).call(this,...e));g(this,"body",(e,t,r)=>v(this,$,ne).call(this,e,t,r));g(this,"text",(e,t,r)=>!d(this,G)&&!d(this,oe)&&!t&&!r&&!this.finalized?new Response(e):v(this,$,ne).call(this,e,t,Ne(Nt,r)));g(this,"json",(e,t,r)=>v(this,$,ne).call(this,JSON.stringify(e),t,Ne("application/json",r)));g(this,"html",(e,t,r)=>{const s=n=>v(this,$,ne).call(this,n,t,Ne("text/html; charset=UTF-8",r));return typeof e=="object"?it(e,It.Stringify,!1,{}).then(s):s(e)});g(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});g(this,"notFound",()=>(d(this,le)??f(this,le,()=>new Response),d(this,le).call(this,this)));f(this,ye,e),t&&(f(this,L,t.executionCtx),this.env=t.env,f(this,le,t.notFoundHandler),f(this,_e,t.path),f(this,be,t.matchResult))}get req(){return d(this,ve)??f(this,ve,new st(d(this,ye),d(this,_e),d(this,be))),d(this,ve)}get event(){if(d(this,L)&&"respondWith"in d(this,L))return d(this,L);throw Error("This context has no FetchEvent")}get executionCtx(){if(d(this,L))return d(this,L);throw Error("This context has no ExecutionContext")}get res(){return d(this,D)||f(this,D,new Response(null,{headers:d(this,G)??f(this,G,new Headers)}))}set res(e){if(d(this,D)&&e){e=new Response(e.body,e);for(const[t,r]of d(this,D).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=d(this,D).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of s)e.headers.append("set-cookie",n)}else e.headers.set(t,r)}f(this,D,e),this.finalized=!0}get var(){return d(this,N)?Object.fromEntries(d(this,N)):{}}},ye=new WeakMap,ve=new WeakMap,N=new WeakMap,oe=new WeakMap,L=new WeakMap,D=new WeakMap,xe=new WeakMap,ce=new WeakMap,le=new WeakMap,G=new WeakMap,be=new WeakMap,_e=new WeakMap,$=new WeakSet,ne=function(e,t,r){const s=d(this,D)?new Headers(d(this,D).headers):d(this,G)??new Headers;if(typeof t=="object"&&"headers"in t){const a=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,l]of a)i.toLowerCase()==="set-cookie"?s.append(i,l):s.set(i,l)}if(r)for(const[a,i]of Object.entries(r))if(typeof i=="string")s.set(a,i);else{s.delete(a);for(const l of i)s.append(a,l)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??d(this,oe);return new Response(e,{status:n,headers:s})},ze),_="ALL",Ft="all",Ht=["get","post","put","delete","options","patch"],ot="Can not add a route since the matcher is already built.",ct=class extends Error{},Mt="__COMPOSED_HANDLER",Bt=e=>e.text("404 Not Found",404),$e=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},q,w,lt,k,J,je,De,de,Pt=(de=class{constructor(t={}){m(this,w);g(this,"get");g(this,"post");g(this,"put");g(this,"delete");g(this,"options");g(this,"patch");g(this,"all");g(this,"on");g(this,"use");g(this,"router");g(this,"getPath");g(this,"_basePath","/");m(this,q,"/");g(this,"routes",[]);m(this,k,Bt);g(this,"errorHandler",$e);g(this,"onError",t=>(this.errorHandler=t,this));g(this,"notFound",t=>(f(this,k,t),this));g(this,"fetch",(t,...r)=>v(this,w,De).call(this,t,r[1],r[0],t.method));g(this,"request",(t,r,s,n)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${se("/",t)}`,r),s,n)));g(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(v(this,w,De).call(this,t.request,t,void 0,t.request.method))})});[...Ht,Ft].forEach(a=>{this[a]=(i,...l)=>(typeof i=="string"?f(this,q,i):v(this,w,J).call(this,a,d(this,q),i),l.forEach(c=>{v(this,w,J).call(this,a,d(this,q),c)}),this)}),this.on=(a,i,...l)=>{for(const c of[i].flat()){f(this,q,c);for(const o of[a].flat())l.map(u=>{v(this,w,J).call(this,o.toUpperCase(),d(this,q),u)})}return this},this.use=(a,...i)=>(typeof a=="string"?f(this,q,a):(f(this,q,"*"),i.unshift(a)),i.forEach(l=>{v(this,w,J).call(this,_,d(this,q),l)}),this);const{strict:s,...n}=t;Object.assign(this,n),this.getPath=s??!0?t.getPath??Ze:Ct}route(t,r){const s=this.basePath(t);return r.routes.map(n=>{var i;let a;r.errorHandler===$e?a=n.handler:(a=async(l,c)=>(await Pe([],r.errorHandler)(l,()=>n.handler(l,c))).res,a[Mt]=n.handler),v(i=s,w,J).call(i,n.method,n.path,a)}),this}basePath(t){const r=v(this,w,lt).call(this);return r._basePath=se(this._basePath,t),r}mount(t,r,s){let n,a;s&&(typeof s=="function"?a=s:(a=s.optionHandler,s.replaceRequest===!1?n=c=>c:n=s.replaceRequest));const i=a?c=>{const o=a(c);return Array.isArray(o)?o:[o]}:c=>{let o;try{o=c.executionCtx}catch{}return[c.env,o]};n||(n=(()=>{const c=se(this._basePath,t),o=c==="/"?0:c.length;return u=>{const p=new URL(u.url);return p.pathname=p.pathname.slice(o)||"/",new Request(p,u)}})());const l=async(c,o)=>{const u=await r(n(c.req.raw),...i(c));if(u)return u;await o()};return v(this,w,J).call(this,_,se(t,"*"),l),this}},q=new WeakMap,w=new WeakSet,lt=function(){const t=new de({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,k,d(this,k)),t.routes=this.routes,t},k=new WeakMap,J=function(t,r,s){t=t.toUpperCase(),r=se(this._basePath,r);const n={basePath:this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,n]),this.routes.push(n)},je=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},De=function(t,r,s,n){if(n==="HEAD")return(async()=>new Response(null,await v(this,w,De).call(this,t,r,s,"GET")))();const a=this.getPath(t,{env:s}),i=this.router.match(n,a),l=new Lt(t,{path:a,matchResult:i,env:s,executionCtx:r,notFoundHandler:d(this,k)});if(i[0].length===1){let o;try{o=i[0][0][0][0](l,async()=>{l.res=await d(this,k).call(this,l)})}catch(u){return v(this,w,je).call(this,u,l)}return o instanceof Promise?o.then(u=>u||(l.finalized?l.res:d(this,k).call(this,l))).catch(u=>v(this,w,je).call(this,u,l)):o??d(this,k).call(this,l)}const c=Pe(i[0],this.errorHandler,d(this,k));return(async()=>{try{const o=await c(l);if(!o.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return o.res}catch(o){return v(this,w,je).call(this,o,l)}})()},de),dt=[];function Wt(e,t){const r=this.buildAllMatchers(),s=((n,a)=>{const i=r[n]||r[_],l=i[2][a];if(l)return l;const c=a.match(i[0]);if(!c)return[[],dt];const o=c.indexOf("",1);return[i[1][o],c]});return this.match=s,s(e,t)}var qe="[^/]+",ge=".*",me="(?:|/.*)",ae=Symbol(),$t=new Set(".\\+*[^]$()");function Ut(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===ge||e===me?1:t===ge||t===me?-1:e===qe?1:t===qe?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Q,X,C,te,Yt=(te=class{constructor(){m(this,Q);m(this,X);m(this,C,Object.create(null))}insert(t,r,s,n,a){if(t.length===0){if(d(this,Q)!==void 0)throw ae;if(a)return;f(this,Q,r);return}const[i,...l]=t,c=i==="*"?l.length===0?["","",ge]:["","",qe]:i==="/*"?["","",me]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let o;if(c){const u=c[1];let p=c[2]||qe;if(u&&c[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw ae;if(o=d(this,C)[p],!o){if(Object.keys(d(this,C)).some(y=>y!==ge&&y!==me))throw ae;if(a)return;o=d(this,C)[p]=new te,u!==""&&f(o,X,n.varIndex++)}!a&&u!==""&&s.push([u,d(o,X)])}else if(o=d(this,C)[i],!o){if(Object.keys(d(this,C)).some(u=>u.length>1&&u!==ge&&u!==me))throw ae;if(a)return;o=d(this,C)[i]=new te}o.insert(l,r,s,n,a)}buildRegExpStr(){const r=Object.keys(d(this,C)).sort(Ut).map(s=>{const n=d(this,C)[s];return(typeof d(n,X)=="number"?`(${s})@${d(n,X)}`:$t.has(s)?`\\${s}`:s)+n.buildRegExpStr()});return typeof d(this,Q)=="number"&&r.unshift(`#${d(this,Q)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},Q=new WeakMap,X=new WeakMap,C=new WeakMap,te),ke,we,Je,Vt=(Je=class{constructor(){m(this,ke,{varIndex:0});m(this,we,new Yt)}insert(e,t,r){const s=[],n=[];for(let i=0;;){let l=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const o=`@\\${i}`;return n[i]=[o,c],i++,l=!0,o}),!l)break}const a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=n.length-1;i>=0;i--){const[l]=n[i];for(let c=a.length-1;c>=0;c--)if(a[c].indexOf(l)!==-1){a[c]=a[c].replace(l,n[i][1]);break}}return d(this,we).insert(a,t,s,d(this,ke),r),s}buildRegExp(){let e=d(this,we).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,a,i)=>a!==void 0?(r[++t]=Number(a),"$()"):(i!==void 0&&(s[Number(i)]=++t),"")),[new RegExp(`^${e}`),r,s]}},ke=new WeakMap,we=new WeakMap,Je),zt=[/^$/,[],Object.create(null)],Te=Object.create(null);function ut(e){return Te[e]??(Te[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function Jt(){Te=Object.create(null)}function Kt(e){var o;const t=new Vt,r=[];if(e.length===0)return zt;const s=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,p],[y,b])=>u?1:y?-1:p.length-b.length),n=Object.create(null);for(let u=0,p=-1,y=s.length;u<y;u++){const[b,E,O]=s[u];b?n[E]=[O.map(([R])=>[R,Object.create(null)]),dt]:p++;let x;try{x=t.insert(E,p,b)}catch(R){throw R===ae?new ct(E):R}b||(r[p]=O.map(([R,B])=>{const Ee=Object.create(null);for(B-=1;B>=0;B--){const[Re,A]=x[B];Ee[Re]=A}return[R,Ee]}))}const[a,i,l]=t.buildRegExp();for(let u=0,p=r.length;u<p;u++)for(let y=0,b=r[u].length;y<b;y++){const E=(o=r[u][y])==null?void 0:o[1];if(!E)continue;const O=Object.keys(E);for(let x=0,R=O.length;x<R;x++)E[O[x]]=l[E[O[x]]]}const c=[];for(const u in i)c[u]=r[i[u]];return[a,c,n]}function re(e,t){if(e){for(const r of Object.keys(e).sort((s,n)=>n.length-s.length))if(ut(r).test(t))return[...e[r]]}}var U,Y,Ce,ht,Ke,Gt=(Ke=class{constructor(){m(this,Ce);g(this,"name","RegExpRouter");m(this,U);m(this,Y);g(this,"match",Wt);f(this,U,{[_]:Object.create(null)}),f(this,Y,{[_]:Object.create(null)})}add(e,t,r){var l;const s=d(this,U),n=d(this,Y);if(!s||!n)throw new Error(ot);s[e]||[s,n].forEach(c=>{c[e]=Object.create(null),Object.keys(c[_]).forEach(o=>{c[e][o]=[...c[_][o]]})}),t==="/*"&&(t="*");const a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=ut(t);e===_?Object.keys(s).forEach(o=>{var u;(u=s[o])[t]||(u[t]=re(s[o],t)||re(s[_],t)||[])}):(l=s[e])[t]||(l[t]=re(s[e],t)||re(s[_],t)||[]),Object.keys(s).forEach(o=>{(e===_||e===o)&&Object.keys(s[o]).forEach(u=>{c.test(u)&&s[o][u].push([r,a])})}),Object.keys(n).forEach(o=>{(e===_||e===o)&&Object.keys(n[o]).forEach(u=>c.test(u)&&n[o][u].push([r,a]))});return}const i=et(t)||[t];for(let c=0,o=i.length;c<o;c++){const u=i[c];Object.keys(n).forEach(p=>{var y;(e===_||e===p)&&((y=n[p])[u]||(y[u]=[...re(s[p],u)||re(s[_],u)||[]]),n[p][u].push([r,a-o+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(d(this,Y)).concat(Object.keys(d(this,U))).forEach(t=>{e[t]||(e[t]=v(this,Ce,ht).call(this,t))}),f(this,U,f(this,Y,void 0)),Jt(),e}},U=new WeakMap,Y=new WeakMap,Ce=new WeakSet,ht=function(e){const t=[];let r=e===_;return[d(this,U),d(this,Y)].forEach(s=>{const n=s[e]?Object.keys(s[e]).map(a=>[a,s[e][a]]):[];n.length!==0?(r||(r=!0),t.push(...n)):e!==_&&t.push(...Object.keys(s[_]).map(a=>[a,s[_][a]]))}),r?Kt(t):null},Ke),V,F,Ge,Qt=(Ge=class{constructor(e){g(this,"name","SmartRouter");m(this,V,[]);m(this,F,[]);f(this,V,e.routers)}add(e,t,r){if(!d(this,F))throw new Error(ot);d(this,F).push([e,t,r])}match(e,t){if(!d(this,F))throw new Error("Fatal error");const r=d(this,V),s=d(this,F),n=r.length;let a=0,i;for(;a<n;a++){const l=r[a];try{for(let c=0,o=s.length;c<o;c++)l.add(...s[c]);i=l.match(e,t)}catch(c){if(c instanceof ct)continue;throw c}this.match=l.match.bind(l),f(this,V,[l]),f(this,F,void 0);break}if(a===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(d(this,F)||d(this,V).length!==1)throw new Error("No active router has been determined yet.");return d(this,V)[0]}},V=new WeakMap,F=new WeakMap,Ge),fe=Object.create(null),z,j,Z,ue,S,H,K,he,Xt=(he=class{constructor(t,r,s){m(this,H);m(this,z);m(this,j);m(this,Z);m(this,ue,0);m(this,S,fe);if(f(this,j,s||Object.create(null)),f(this,z,[]),t&&r){const n=Object.create(null);n[t]={handler:r,possibleKeys:[],score:0},f(this,z,[n])}f(this,Z,[])}insert(t,r,s){f(this,ue,++Be(this,ue)._);let n=this;const a=jt(r),i=[];for(let l=0,c=a.length;l<c;l++){const o=a[l],u=a[l+1],p=qt(o,u),y=Array.isArray(p)?p[0]:o;if(y in d(n,j)){n=d(n,j)[y],p&&i.push(p[1]);continue}d(n,j)[y]=new he,p&&(d(n,Z).push(p),i.push(p[1])),n=d(n,j)[y]}return d(n,z).push({[t]:{handler:s,possibleKeys:i.filter((l,c,o)=>o.indexOf(l)===c),score:d(this,ue)}}),n}search(t,r){var c;const s=[];f(this,S,fe);let a=[this];const i=Xe(r),l=[];for(let o=0,u=i.length;o<u;o++){const p=i[o],y=o===u-1,b=[];for(let E=0,O=a.length;E<O;E++){const x=a[E],R=d(x,j)[p];R&&(f(R,S,d(x,S)),y?(d(R,j)["*"]&&s.push(...v(this,H,K).call(this,d(R,j)["*"],t,d(x,S))),s.push(...v(this,H,K).call(this,R,t,d(x,S)))):b.push(R));for(let B=0,Ee=d(x,Z).length;B<Ee;B++){const Re=d(x,Z)[B],A=d(x,S)===fe?{}:{...d(x,S)};if(Re==="*"){const P=d(x,j)["*"];P&&(s.push(...v(this,H,K).call(this,P,t,d(x,S))),f(P,S,A),b.push(P));continue}const[mt,He,pe]=Re;if(!p&&!(pe instanceof RegExp))continue;const I=d(x,j)[mt],yt=i.slice(o).join("/");if(pe instanceof RegExp){const P=pe.exec(yt);if(P){if(A[He]=P[0],s.push(...v(this,H,K).call(this,I,t,d(x,S),A)),Object.keys(d(I,j)).length){f(I,S,A);const Oe=((c=P[0].match(/\//))==null?void 0:c.length)??0;(l[Oe]||(l[Oe]=[])).push(I)}continue}}(pe===!0||pe.test(p))&&(A[He]=p,y?(s.push(...v(this,H,K).call(this,I,t,A,d(x,S))),d(I,j)["*"]&&s.push(...v(this,H,K).call(this,d(I,j)["*"],t,A,d(x,S)))):(f(I,S,A),b.push(I)))}}a=b.concat(l.shift()??[])}return s.length>1&&s.sort((o,u)=>o.score-u.score),[s.map(({handler:o,params:u})=>[o,u])]}},z=new WeakMap,j=new WeakMap,Z=new WeakMap,ue=new WeakMap,S=new WeakMap,H=new WeakSet,K=function(t,r,s,n){const a=[];for(let i=0,l=d(t,z).length;i<l;i++){const c=d(t,z)[i],o=c[r]||c[_],u={};if(o!==void 0&&(o.params=Object.create(null),a.push(o),s!==fe||n&&n!==fe))for(let p=0,y=o.possibleKeys.length;p<y;p++){const b=o.possibleKeys[p],E=u[o.score];o.params[b]=n!=null&&n[b]&&!E?n[b]:s[b]??(n==null?void 0:n[b]),u[o.score]=!0}}return a},he),ee,Qe,Zt=(Qe=class{constructor(){g(this,"name","TrieRouter");m(this,ee);f(this,ee,new Xt)}add(e,t,r){const s=et(t);if(s){for(let n=0,a=s.length;n<a;n++)d(this,ee).insert(e,s[n],r);return}d(this,ee).insert(e,t,r)}match(e,t){return d(this,ee).search(e,t)}},ee=new WeakMap,Qe),pt=class extends Pt{constructor(e={}){super(e),this.router=e.router??new Qt({routers:[new Gt,new Zt]})}},er=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(a=>typeof a=="string"?a==="*"?()=>a:i=>a===i?i:null:typeof a=="function"?a:i=>a.includes(i)?i:null)(r.origin),n=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(r.allowMethods);return async function(i,l){var u;function c(p,y){i.res.headers.set(p,y)}const o=await s(i.req.header("origin")||"",i);if(o&&c("Access-Control-Allow-Origin",o),r.credentials&&c("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&c("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),i.req.method==="OPTIONS"){r.origin!=="*"&&c("Vary","Origin"),r.maxAge!=null&&c("Access-Control-Max-Age",r.maxAge.toString());const p=await n(i.req.header("origin")||"",i);p.length&&c("Access-Control-Allow-Methods",p.join(","));let y=r.allowHeaders;if(!(y!=null&&y.length)){const b=i.req.header("Access-Control-Request-Headers");b&&(y=b.split(/\s*,\s*/))}return y!=null&&y.length&&(c("Access-Control-Allow-Headers",y.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await l(),r.origin!=="*"&&i.header("Vary","Origin",{append:!0})}},tr=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Ue=(e,t=sr)=>{const r=/\.([a-zA-Z0-9]+?)$/,s=e.match(r);if(!s)return;let n=t[s[1]];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},rr={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},sr=rr,nr=(...e)=>{let t=e.filter(n=>n!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),s=[];for(const n of r)n===".."&&s.length>0&&s.at(-1)!==".."?s.pop():n!=="."&&s.push(n);return s.join("/")||"."},ft={br:".br",zstd:".zst",gzip:".gz"},ar=Object.keys(ft),ir="index.html",or=e=>{const t=e.root??"./",r=e.path,s=e.join??nr;return async(n,a)=>{var u,p,y,b;if(n.finalized)return a();let i;if(e.path)i=e.path;else try{if(i=decodeURIComponent(n.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(i))throw new Error}catch{return await((u=e.onNotFound)==null?void 0:u.call(e,n.req.path,n)),a()}let l=s(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(i):i);e.isDir&&await e.isDir(l)&&(l=s(l,ir));const c=e.getContent;let o=await c(l,n);if(o instanceof Response)return n.newResponse(o.body,o);if(o){const E=e.mimes&&Ue(l,e.mimes)||Ue(l);if(n.header("Content-Type",E||"application/octet-stream"),e.precompressed&&(!E||tr.test(E))){const O=new Set((p=n.req.header("Accept-Encoding"))==null?void 0:p.split(",").map(x=>x.trim()));for(const x of ar){if(!O.has(x))continue;const R=await c(l+ft[x],n);if(R){o=R,n.header("Content-Encoding",x),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((y=e.onFound)==null?void 0:y.call(e,l,n)),n.body(o)}await((b=e.onNotFound)==null?void 0:b.call(e,l,n)),await a()}},cr=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const n=r[e]||e;if(!n)return null;const a=await s.get(n,{type:"stream"});return a||null},lr=e=>async function(r,s){return or({...e,getContent:async a=>cr(a,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,s)},dr=e=>lr(e);const h=new pt;h.use("/api/*",er());h.use("/static/*",dr({root:"./"}));h.get("/api/health",e=>e.json({status:"ok",timestamp:new Date().toISOString()}));h.get("/api/questionnaires",async e=>{try{const{DB:t}=e.env,{results:r}=await t.prepare("SELECT * FROM questionnaires").all();return e.json({questionnaires:r})}catch{return e.json({error:"Failed to fetch questionnaires"},500)}});h.get("/api/questionnaires/:type",async e=>{try{const{DB:t}=e.env,r=e.req.param("type"),s=await t.prepare("SELECT * FROM questionnaires WHERE type = ?").bind(r).first();return s?e.json({questionnaire:s}):e.json({error:"Questionnaire not found"},404)}catch{return e.json({error:"Failed to fetch questionnaire"},500)}});h.post("/api/questionnaires/:type/responses",async e=>{try{const{DB:t}=e.env,r=e.req.param("type"),{user_id:s=1,answers:n,score:a,email:i}=await e.req.json(),l=await t.prepare("SELECT * FROM questionnaires WHERE type = ?").bind(r).first();if(!l)return e.json({error:"Questionnaire not found"},404);let c="";r==="ISI"&&(a<=7?c="정상 범위":a<=14?c="경도 불면":a<=21?c="중등도 불면":c="중증 불면 / 전문 상담 권장");const o=await t.prepare(`
      INSERT INTO questionnaire_responses (user_id, questionnaire_id, score, answers_json, interpretation)
      VALUES (?, ?, ?, ?, ?)
    `).bind(s,l.id,a,JSON.stringify(n),c).run();return e.json({success:!0,response_id:o.meta.last_row_id,score:a,interpretation:c})}catch{return e.json({error:"Failed to save response"},500)}});h.get("/api/sleep-sessions",async e=>{try{const{DB:t}=e.env,r=e.req.query("user_id")||"1",s=e.req.query("from"),n=e.req.query("to");let a="SELECT * FROM sleep_sessions WHERE user_id = ?";const i=[r];s&&n&&(a+=" AND date BETWEEN ? AND ?",i.push(s,n)),a+=" ORDER BY date DESC LIMIT 30";const{results:l}=await t.prepare(a).bind(...i).all();return e.json({sessions:l})}catch{return e.json({error:"Failed to fetch sleep sessions"},500)}});h.post("/api/sleep-sessions",async e=>{try{const{DB:t}=e.env,{user_id:r=1,date:s,sleep_onset:n,wake_time:a,awakenings_count:i=0,sleep_efficiency:l,sleep_quality:c,notes:o}=await e.req.json(),u=await t.prepare(`
      INSERT INTO sleep_sessions (user_id, date, sleep_onset, wake_time, awakenings_count, sleep_efficiency, sleep_quality, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(r,s,n,a,i,l,c,o).run();return e.json({success:!0,session_id:u.meta.last_row_id})}catch{return e.json({error:"Failed to create sleep session"},500)}});h.get("/api/risk-score/today",async e=>{try{const{DB:t}=e.env,r=e.req.query("user_id")||"1",s=new Date().toISOString().split("T")[0],n=await t.prepare("SELECT * FROM risk_scores WHERE user_id = ? AND date = ?").bind(r,s).first();return e.json({risk_score:n||null})}catch{return e.json({error:"Failed to fetch risk score"},500)}});h.post("/api/risk-score",async e=>{try{const{DB:t}=e.env,{user_id:r=1,date:s,score:n,screen_time:a,noise_level:i,light_level:l,caffeine_intake:c,details:o}=await e.req.json(),u=await t.prepare(`
      INSERT INTO risk_scores (user_id, date, score, screen_time, noise_level, light_level, caffeine_intake, details_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(r,s,n,a,i,l,c,JSON.stringify(o||{})).run();return e.json({success:!0,risk_id:u.meta.last_row_id})}catch{return e.json({error:"Failed to save risk score"},500)}});h.get("/api/clinics",async e=>{try{const{DB:t}=e.env,r=e.req.query("city"),s=e.req.query("type");let n="SELECT * FROM clinics WHERE 1=1";const a=[];r&&(n+=" AND city LIKE ?",a.push(`%${r}%`)),s&&(n+=" AND type = ?",a.push(s)),n+=" ORDER BY name";const{results:i}=await t.prepare(n).bind(...a).all();return e.json({clinics:i})}catch{return e.json({error:"Failed to fetch clinics"},500)}});h.get("/api/clinics/:id",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),s=await t.prepare("SELECT * FROM clinics WHERE id = ?").bind(r).first();return s?e.json({clinic:s}):e.json({error:"Clinic not found"},404)}catch{return e.json({error:"Failed to fetch clinic"},500)}});h.get("/api/cbt/programs",async e=>{try{const{DB:t}=e.env,{results:r}=await t.prepare("SELECT * FROM cbt_programs WHERE is_active = 1").all();return e.json({programs:r})}catch{return e.json({error:"Failed to fetch programs"},500)}});h.get("/api/cbt/programs/:id/modules",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),{results:s}=await t.prepare("SELECT * FROM cbt_modules WHERE program_id = ? ORDER BY order_index").bind(r).all();return e.json({modules:s})}catch{return e.json({error:"Failed to fetch modules"},500)}});h.get("/api/dashboard",async e=>{try{const{DB:t}=e.env,r=e.req.query("user_id")||"1",s=await t.prepare("SELECT * FROM sleep_sessions WHERE user_id = ? ORDER BY date DESC LIMIT 1").bind(r).first(),n=await t.prepare(`
      SELECT qr.*, q.type 
      FROM questionnaire_responses qr 
      JOIN questionnaires q ON qr.questionnaire_id = q.id 
      WHERE qr.user_id = ? AND q.type = 'ISI' 
      ORDER BY qr.created_at DESC LIMIT 1
    `).bind(r).first(),a=new Date().toISOString().split("T")[0],i=await t.prepare("SELECT * FROM risk_scores WHERE user_id = ? AND date = ?").bind(r,a).first(),l=await t.prepare('SELECT * FROM user_cbt_progress WHERE user_id = ? AND status = "active" LIMIT 1').bind(r).first();return e.json({latest_sleep:s,latest_isi:n,risk_score:i,cbt_progress:l})}catch{return e.json({error:"Failed to fetch dashboard data"},500)}});h.get("/api/wellness/music",async e=>{try{const{DB:t}=e.env,r=e.req.query("category");let s="SELECT * FROM music_content WHERE 1=1";const n=[];r&&(s+=" AND category = ?",n.push(r)),s+=" ORDER BY play_count DESC, rating DESC";const{results:a}=await t.prepare(s).bind(...n).all();return e.json({music:a})}catch{return e.json({error:"Failed to fetch music content"},500)}});h.get("/api/wellness/music/:id",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),s=await t.prepare("SELECT * FROM music_content WHERE id = ?").bind(r).first();return s?e.json({music:s}):e.json({error:"Music not found"},404)}catch{return e.json({error:"Failed to fetch music"},500)}});h.get("/api/wellness/yoga",async e=>{try{const{DB:t}=e.env,r=e.req.query("category"),s=e.req.query("difficulty");let n="SELECT * FROM yoga_content WHERE 1=1";const a=[];r&&(n+=" AND category = ?",a.push(r)),s&&(n+=" AND difficulty = ?",a.push(s)),n+=" ORDER BY completion_count DESC, rating DESC";const{results:i}=await t.prepare(n).bind(...a).all();return e.json({yoga:i})}catch{return e.json({error:"Failed to fetch yoga content"},500)}});h.get("/api/wellness/yoga/:id",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),s=await t.prepare("SELECT * FROM yoga_content WHERE id = ?").bind(r).first();return s?e.json({yoga:s}):e.json({error:"Yoga not found"},404)}catch{return e.json({error:"Failed to fetch yoga"},500)}});h.get("/api/wellness/breathing",async e=>{try{const{DB:t}=e.env,r=e.req.query("type");let s="SELECT * FROM breathing_routines WHERE 1=1";const n=[];r&&(s+=" AND type = ?",n.push(r)),s+=" ORDER BY completion_count DESC, rating DESC";const{results:a}=await t.prepare(s).bind(...n).all();return e.json({breathing:a})}catch{return e.json({error:"Failed to fetch breathing routines"},500)}});h.get("/api/wellness/breathing/:id",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),s=await t.prepare("SELECT * FROM breathing_routines WHERE id = ?").bind(r).first();return s?e.json({breathing:s}):e.json({error:"Breathing routine not found"},404)}catch{return e.json({error:"Failed to fetch breathing routine"},500)}});h.get("/api/wellness/asmr",async e=>{try{const{DB:t}=e.env,r=e.req.query("category"),s=e.req.query("binaural");let n="SELECT * FROM asmr_content WHERE 1=1";const a=[];r&&(n+=" AND category = ?",a.push(r)),s==="true"&&(n+=" AND is_binaural = 1"),n+=" ORDER BY play_count DESC, rating DESC";const{results:i}=await t.prepare(n).bind(...a).all();return e.json({asmr:i})}catch{return e.json({error:"Failed to fetch ASMR content"},500)}});h.post("/api/wellness/activity",async e=>{try{const{DB:t}=e.env,{user_id:r=1,activity_type:s,content_id:n,content_title:a,duration_seconds:i,completed:l=!1,rating:c,feedback:o}=await e.req.json(),u=await t.prepare(`
      INSERT INTO wellness_activities (user_id, activity_type, content_id, content_title, duration_seconds, completed, rating, feedback)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(r,s,n,a,i,l?1:0,c,o).run();return e.json({success:!0,activity_id:u.meta.last_row_id})}catch{return e.json({error:"Failed to record activity"},500)}});h.get("/api/wellness/activities",async e=>{try{const{DB:t}=e.env,r=e.req.query("user_id")||"1",s=e.req.query("type");let n="SELECT * FROM wellness_activities WHERE user_id = ?";const a=[r];s&&(n+=" AND activity_type = ?",a.push(s)),n+=" ORDER BY created_at DESC LIMIT 50";const{results:i}=await t.prepare(n).bind(...a).all();return e.json({activities:i})}catch{return e.json({error:"Failed to fetch activities"},500)}});h.get("/api/wellness/preferences",async e=>{try{const{DB:t}=e.env,r=e.req.query("user_id")||"1",s=await t.prepare("SELECT * FROM user_wellness_preferences WHERE user_id = ?").bind(r).first();return e.json({preferences:s})}catch{return e.json({error:"Failed to fetch preferences"},500)}});h.post("/api/wellness/preferences",async e=>{try{const{DB:t}=e.env,{user_id:r=1,preferred_music_categories:s,preferred_yoga_categories:n,preferred_breathing_types:a,preferred_asmr_categories:i,night_mode_enabled:l=!0,auto_recommend_enabled:c=!0,accessibility_mode:o=!1}=await e.req.json(),u=await t.prepare(`
      INSERT OR REPLACE INTO user_wellness_preferences 
      (user_id, preferred_music_categories, preferred_yoga_categories, preferred_breathing_types, 
       preferred_asmr_categories, night_mode_enabled, auto_recommend_enabled, accessibility_mode, last_updated)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(r,JSON.stringify(s||[]),JSON.stringify(n||[]),JSON.stringify(a||[]),JSON.stringify(i||[]),l?1:0,c?1:0,o?1:0).run();return e.json({success:!0})}catch{return e.json({error:"Failed to save preferences"},500)}});h.get("/api/care/links",async e=>{try{const{DB:t}=e.env,r=e.req.query("user_id")||"1",s=e.req.query("role")||"all";let n='SELECT * FROM care_links WHERE status = "active" AND (';const a=[];s==="patient"?(n+="patient_id = ?)",a.push(r)):s==="caregiver"?(n+="caregiver_id = ?)",a.push(r)):(n+="patient_id = ? OR caregiver_id = ?)",a.push(r,r));const{results:i}=await t.prepare(n).bind(...a).all();return e.json({care_links:i})}catch{return e.json({error:"Failed to fetch care links"},500)}});h.post("/api/care/invite",async e=>{try{const{DB:t}=e.env,{user_id:r=1,permissions:s}=await e.req.json(),n=crypto.randomUUID(),a=new Date(Date.now()+600*1e3).toISOString(),i=await t.prepare(`
      INSERT INTO care_invites (patient_id, token, permissions_json, expires_at)
      VALUES (?, ?, ?, ?)
    `).bind(r,n,JSON.stringify(s),a).run();return e.json({success:!0,invite_id:i.meta.last_row_id,token:n,expires_at:a})}catch{return e.json({error:"Failed to create invite"},500)}});h.post("/api/care/accept",async e=>{try{const{DB:t}=e.env,{token:r,caregiver_id:s=1,relationship:n="family"}=await e.req.json(),a=await t.prepare('SELECT * FROM care_invites WHERE token = ? AND status = "pending"').bind(r).first();if(!a)return e.json({error:"Invalid or expired invite"},404);if(new Date(a.expires_at)<new Date)return await t.prepare('UPDATE care_invites SET status = "expired" WHERE id = ?').bind(a.id).run(),e.json({error:"Invite has expired"},400);const i=await t.prepare(`
      INSERT INTO care_links (patient_id, caregiver_id, relationship, permissions_json)
      VALUES (?, ?, ?, ?)
    `).bind(a.patient_id,s,n,a.permissions_json).run();return await t.prepare(`
      UPDATE care_invites SET status = "used", used_at = CURRENT_TIMESTAMP, used_by_user_id = ? 
      WHERE id = ?
    `).bind(s,a.id).run(),e.json({success:!0,care_link_id:i.meta.last_row_id})}catch{return e.json({error:"Failed to accept invite"},500)}});h.get("/api/care/alerts",async e=>{try{const{DB:t}=e.env,r=e.req.query("caregiver_id")||"1",s=e.req.query("unread_only")==="true";let n="SELECT * FROM care_alerts WHERE caregiver_id = ?";const a=[r];s&&(n+=" AND read_at IS NULL"),n+=" ORDER BY created_at DESC LIMIT 50";const{results:i}=await t.prepare(n).bind(...a).all();return e.json({alerts:i})}catch{return e.json({error:"Failed to fetch alerts"},500)}});h.get("/api/medications",async e=>{try{const{DB:t}=e.env,r=e.req.query("user_id")||"1",s=e.req.query("active_only")==="true";let n="SELECT * FROM medications WHERE user_id = ?";const a=[r];s&&(n+=" AND is_active = 1"),n+=" ORDER BY created_at DESC";const{results:i}=await t.prepare(n).bind(...a).all();return e.json({medications:i})}catch{return e.json({error:"Failed to fetch medications"},500)}});h.post("/api/medications",async e=>{try{const{DB:t}=e.env,{user_id:r=1,name:s,dosage:n,frequency:a,prescribed_by:i,start_date:l,end_date:c,notes:o}=await e.req.json(),u=await t.prepare(`
      INSERT INTO medications (user_id, name, dosage, frequency, prescribed_by, start_date, end_date, notes, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    `).bind(r,s,n,a,i,l,c,o).run();return e.json({success:!0,medication_id:u.meta.last_row_id})}catch{return e.json({error:"Failed to add medication"},500)}});h.post("/api/medications/log",async e=>{try{const{DB:t}=e.env,{medication_id:r,user_id:s=1,taken:n,taken_at:a,scheduled_at:i,notes:l}=await e.req.json(),c=await t.prepare(`
      INSERT INTO medication_logs (medication_id, user_id, taken, taken_at, scheduled_at, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(r,s,n?1:0,a,i,l).run();return e.json({success:!0,log_id:c.meta.last_row_id})}catch{return e.json({error:"Failed to log medication"},500)}});h.get("/api/medications/:id/logs",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),s=parseInt(e.req.query("days")||"7"),{results:n}=await t.prepare(`
      SELECT * FROM medication_logs 
      WHERE medication_id = ? 
      AND date(scheduled_at) >= date('now', '-' || ? || ' days')
      ORDER BY scheduled_at DESC
    `).bind(r,s).all();return e.json({logs:n})}catch{return e.json({error:"Failed to fetch logs"},500)}});h.get("/api/care/patients/:id/medications",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),s=e.req.query("caregiver_id")||"1",n=await t.prepare(`
      SELECT * FROM care_links 
      WHERE patient_id = ? AND caregiver_id = ? AND status = 'active'
    `).bind(r,s).first();if(!n)return e.json({error:"No active care link found"},403);if(!JSON.parse(n.permissions_json).shareMedication)return e.json({error:"No permission to view medications"},403);const{results:i}=await t.prepare(`
      SELECT * FROM medications WHERE user_id = ? AND is_active = 1
    `).bind(r).all(),l=await Promise.all(i.map(async c=>{const{results:o}=await t.prepare(`
          SELECT * FROM medication_logs 
          WHERE medication_id = ? 
          AND date(scheduled_at) >= date('now', '-7 days')
          ORDER BY scheduled_at DESC
        `).bind(c.id).all();return{...c,recent_logs:o}}));return e.json({medications:l})}catch{return e.json({error:"Failed to fetch patient medications"},500)}});h.post("/api/care/notes",async e=>{try{const{DB:t}=e.env,{care_link_id:r,user_id:s=1,author_role:n,note_type:a="general",content:i,flag:l="normal",is_shared:c=!1}=await e.req.json(),o=await t.prepare(`
      INSERT INTO care_notes (care_link_id, user_id, author_role, note_type, content, flag, is_shared)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(r,s,n,a,i,l,c?1:0).run();return e.json({success:!0,note_id:o.meta.last_row_id})}catch{return e.json({error:"Failed to create note"},500)}});h.get("/api/care/notes",async e=>{try{const{DB:t}=e.env,r=e.req.query("user_id")||"1",s=e.req.query("care_link_id"),n=e.req.query("flag");let a="SELECT * FROM care_notes WHERE 1=1";const i=[];r&&(a+=" AND user_id = ?",i.push(r)),s&&(a+=" AND care_link_id = ?",i.push(s)),n&&(a+=" AND flag = ?",i.push(n)),a+=" ORDER BY created_at DESC LIMIT 50";const{results:l}=await t.prepare(a).bind(...i).all();return e.json({notes:l})}catch{return e.json({error:"Failed to fetch notes"},500)}});h.get("/api/care/patients/:id/notes",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),s=e.req.query("caregiver_id")||"1",n=await t.prepare(`
      SELECT * FROM care_links 
      WHERE patient_id = ? AND caregiver_id = ? AND status = 'active'
    `).bind(r,s).first();if(!n)return e.json({error:"No active care link found"},403);const{results:a}=await t.prepare(`
      SELECT * FROM care_notes 
      WHERE (care_link_id = ? OR (user_id = ? AND is_shared = 1))
      ORDER BY created_at DESC LIMIT 50
    `).bind(n.id,r).all();return e.json({notes:a})}catch{return e.json({error:"Failed to fetch patient notes"},500)}});h.get("/api/md/patients/:id/notes",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),{results:s}=await t.prepare(`
      SELECT * FROM care_notes 
      WHERE user_id = ? AND is_shared = 1
      ORDER BY created_at DESC
    `).bind(r).all();return e.json({notes:s})}catch{return e.json({error:"Failed to fetch patient notes"},500)}});h.get("/api/care/patients/:id/summary",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),s=e.req.query("caregiver_id")||"1",n=await t.prepare(`
      SELECT * FROM care_links 
      WHERE patient_id = ? AND caregiver_id = ? AND status = 'active'
    `).bind(r,s).first();if(!n)return e.json({error:"No active care link found"},403);const a=JSON.parse(n.permissions_json),i=await t.prepare(`
      SELECT * FROM sleep_sessions 
      WHERE user_id = ? 
      ORDER BY date DESC LIMIT 1
    `).bind(r).first(),l=i?Math.round(i.sleep_efficiency||70):null,c=await t.prepare(`
      SELECT * FROM risk_scores 
      WHERE user_id = ? AND date = date('now')
    `).bind(r).first(),o={date:new Date().toISOString().split("T")[0],patient_id:r};return a.shareScore&&(o.sleepScore=l,o.awakenings=(i==null?void 0:i.awakenings_count)||0),a.shareRoutine&&(o.routineCompleted=!0),a.shareRisk&&(o.riskLevel=(i==null?void 0:i.risk_level)||"green"),e.json({success:!0,data:o})}catch{return e.json({error:"Failed to fetch summary"},500)}});h.get("/api/care/patients/:id/history",async e=>{try{const{DB:t}=e.env,r=e.req.param("id"),s=e.req.query("caregiver_id")||"1",n=parseInt(e.req.query("days")||"7"),a=await t.prepare(`
      SELECT * FROM care_links 
      WHERE patient_id = ? AND caregiver_id = ? AND status = 'active'
    `).bind(r,s).first();if(!a)return e.json({error:"No active care link found"},403);const i=JSON.parse(a.permissions_json);if(!i.shareScore&&!i.shareRisk)return e.json({error:"No permission to view history"},403);const{results:l}=await t.prepare(`
      SELECT date, sleep_efficiency, awakenings_count, sleep_quality, risk_level
      FROM sleep_sessions 
      WHERE user_id = ? 
      AND date >= date('now', '-' || ? || ' days')
      ORDER BY date DESC
    `).bind(r,n).all(),c=l.map(o=>{const u={date:o.date};return i.shareScore&&(u.sleepScore=Math.round(o.sleep_efficiency||70)),i.shareRisk&&(u.risk=o.risk_level||"green"),u});return e.json({success:!0,data:c})}catch{return e.json({error:"Failed to fetch history"},500)}});h.get("/wellness",e=>e.redirect("/static/wellness.html"));h.get("/wellness/music",e=>e.redirect("/static/music.html"));h.get("/assessment",e=>e.redirect("/static/assessment.html"));h.get("/clinics",async e=>{try{const{DB:t}=e.env,{results:r}=await t.prepare("SELECT * FROM clinics ORDER BY name").all();return e.html(`
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
    `)}catch{return e.json({error:"Failed to load clinics page"},500)}});h.get("/",e=>e.html(`
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
          
          /* Mobile optimizations */
          .text-truncate-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 1.4;
          }
          
          /* Language dropdown */
          .lang-dropdown {
            position: relative;
            display: inline-block;
          }
          .lang-dropdown-content {
            display: none;
            position: absolute;
            right: 0;
            background-color: white;
            min-width: 120px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            border-radius: 8px;
            z-index: 1000;
            overflow: hidden;
          }
          .lang-dropdown:hover .lang-dropdown-content {
            display: block;
          }
          .lang-dropdown-content button {
            color: #1f2937;
            padding: 10px 16px;
            text-decoration: none;
            display: block;
            width: 100%;
            text-align: left;
            border: none;
            background: white;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
          }
          .lang-dropdown-content button:hover {
            background-color: #f3f4f6;
          }
          .lang-dropdown-content button.active {
            background-color: #1f7ed6;
            color: white;
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Load Translations -->
        <script src="/static/translations.js"><\/script>
        
        <!-- Header -->
        <header class="sleep-gradient text-white shadow-lg">
            <div class="max-w-7xl mx-auto px-3 py-2 md:py-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-moon text-lg md:text-xl"></i>
                        <div>
                            <h1 class="text-base md:text-lg font-bold" id="siteName">SomniCare</h1>
                            <p class="text-xs opacity-90 hidden sm:block" id="siteTagline">불면증 치료·케어 플랫폼</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 md:gap-4">
                        <nav class="hidden md:flex space-x-4 text-sm">
                            <a href="/" class="hover:opacity-80" id="menuHome">홈</a>
                            <a href="/wellness" class="hover:opacity-80" id="menuWellness">웰니스</a>
                            <a href="/assessment" class="hover:opacity-80" id="menuAssessment">자가진단</a>
                            <a href="/program" class="hover:opacity-80" id="menuProgram">프로그램</a>
                            <a href="/clinics" class="hover:opacity-80" id="menuClinics">병원찾기</a>
                        </nav>
                        <div class="lang-dropdown">
                            <button class="px-2 py-1 bg-white bg-opacity-20 rounded-lg text-xs md:text-sm font-semibold hover:bg-opacity-30 transition flex items-center gap-1">
                                <i class="fas fa-globe"></i>
                                <span class="hidden sm:inline" id="currentLangText">한국어</span>
                                <i class="fas fa-chevron-down text-xs"></i>
                            </button>
                            <div class="lang-dropdown-content">
                                <button onclick="setLanguage('ko')">🇰🇷 한국어</button>
                                <button onclick="setLanguage('en')">🇺🇸 English</button>
                                <button onclick="setLanguage('zh')">🇨🇳 中文</button>
                                <button onclick="setLanguage('ja')">🇯🇵 日本語</button>
                                <button onclick="setLanguage('es')">🇪🇸 Español</button>
                                <button onclick="setLanguage('fr')">🇫🇷 Français</button>
                                <button onclick="setLanguage('de')">🇩🇪 Deutsch</button>
                                <button onclick="setLanguage('vi')">🇻🇳 Tiếng Việt</button>
                                <button onclick="setLanguage('th')">🇹🇭 ไทย</button>
                                <button onclick="setLanguage('id')">🇮🇩 Bahasa Indonesia</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="sleep-gradient text-white py-5 md:py-10">
            <div class="max-w-7xl mx-auto px-3 text-center">
                <h2 class="text-lg md:text-3xl font-bold mb-2 leading-tight" id="heroTitle">
                    당신의 잠은 치료 받을 수 있습니다
                </h2>
                <p class="text-xs md:text-base mb-4 opacity-90 leading-tight" id="heroSubtitle">
                    과학적 맞춤 수면루틴 + 가족/보호자 케어 + 병원 연계까지
                </p>
                <div class="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
                    <a href="/assessment" class="bg-white text-blue-600 px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-bold text-xs md:text-sm hover:bg-gray-100 transition">
                        <i class="fas fa-clipboard-check mr-1"></i>
                        <span id="btnFreeTest">무료 불면증 검사</span>
                    </a>
                    <a href="/program" class="bg-blue-800 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-bold text-xs md:text-sm hover:bg-blue-900 transition border-2 border-white">
                        <i class="fas fa-book-medical mr-1"></i>
                        <span id="btnViewProgram">프로그램 보기</span>
                    </a>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-8 md:py-12 bg-white">
            <div class="max-w-7xl mx-auto px-3">
                <h2 class="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-gray-800" id="featuresTitle">
                    세상에 하나뿐인 차별화 기능
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                    <!-- Feature 1 -->
                    <div class="bg-blue-50 rounded-lg p-3 md:p-4 card-hover">
                        <div class="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                            <i class="fas fa-chart-line text-white text-sm md:text-base"></i>
                        </div>
                        <h3 class="text-xs md:text-sm font-bold mb-1 text-gray-800" id="featureRiskScore">리스크 스코어</h3>
                        <p class="text-xs text-gray-600 text-truncate-2" id="featureRiskDesc">
                            폰 센서+생활 데이터로 불면 위험도 분석
                        </p>
                    </div>

                    <!-- Feature 2 -->
                    <div class="bg-green-50 rounded-lg p-3 md:p-4 card-hover">
                        <div class="w-8 h-8 md:w-10 md:h-10 bg-green-600 rounded-lg flex items-center justify-center mb-2">
                            <i class="fas fa-brain text-white text-sm md:text-base"></i>
                        </div>
                        <h3 class="text-xs md:text-sm font-bold mb-1 text-gray-800" id="featureAI">AI 맞춤 CBT-I</h3>
                        <p class="text-xs text-gray-600 text-truncate-2" id="featureAIDesc">
                            개인별 매일 업데이트 인지행동치료
                        </p>
                    </div>

                    <!-- Feature 3 - NEW Wellness -->
                    <div class="bg-purple-50 rounded-lg p-3 md:p-4 card-hover cursor-pointer" onclick="window.location.href='/wellness'">
                        <div class="w-8 h-8 md:w-10 md:h-10 bg-purple-600 rounded-lg flex items-center justify-center mb-2">
                            <i class="fas fa-spa text-white text-sm md:text-base"></i>
                        </div>
                        <h3 class="text-xs md:text-sm font-bold mb-1 text-gray-800" id="featureWellness">웰니스 콘텐츠</h3>
                        <p class="text-xs text-gray-600 text-truncate-2" id="featureWellnessDesc">
                            음악·요가·호흡·ASMR 힐링 콘텐츠
                        </p>
                    </div>

                    <!-- Feature 4 -->
                    <div class="bg-pink-50 rounded-lg p-3 md:p-4 card-hover">
                        <div class="w-8 h-8 md:w-10 md:h-10 bg-pink-600 rounded-lg flex items-center justify-center mb-2">
                            <i class="fas fa-users text-white text-sm md:text-base"></i>
                        </div>
                        <h3 class="text-xs md:text-sm font-bold mb-1 text-gray-800" id="featureCare">가족 케어 모드</h3>
                        <p class="text-xs text-gray-600 text-truncate-2" id="featureCareDesc">
                            야간 감지+보호자 실시간 연동
                        </p>
                    </div>

                    <!-- Feature 5 -->
                    <div class="bg-orange-50 rounded-lg p-3 md:p-4 card-hover">
                        <div class="w-8 h-8 md:w-10 md:h-10 bg-orange-600 rounded-lg flex items-center justify-center mb-2">
                            <i class="fas fa-hospital text-white text-sm md:text-base"></i>
                        </div>
                        <h3 class="text-xs md:text-sm font-bold mb-1 text-gray-800" id="featureHospital">병원 연계</h3>
                        <p class="text-xs text-gray-600 text-truncate-2" id="featureHospitalDesc">
                            전국 수면클리닉+수면다원검사 병원
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Quick Actions -->
        <section class="py-16 bg-gray-100">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12 text-gray-800" id="quickTitle">
                    빠른 시작하기
                </h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <!-- ISI Test -->
                    <div class="bg-white rounded-xl p-8 shadow-md card-hover">
                        <div class="text-center">
                            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-file-medical text-blue-600 text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-2" id="quickISI">불면증 자가진단 (ISI)</h3>
                            <p class="text-gray-600 mb-6" id="quickISIDesc">3분이면 완료되는 과학적 검사</p>
                            <a href="/assessment?type=isi" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition" id="quickISIBtn">
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
                            <h3 class="text-xl font-bold mb-2" id="quickLog">수면일지 작성</h3>
                            <p class="text-gray-600 mb-6" id="quickLogDesc">어제 밤 수면 상태 기록하기</p>
                            <a href="/sleep-log" class="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition" id="quickLogBtn">
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
                            <h3 class="text-xl font-bold mb-2" id="quickClinic">병원 찾기</h3>
                            <p class="text-gray-600 mb-6" id="quickClinicDesc">가까운 수면클리닉 검색</p>
                            <a href="/clinics" class="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition" id="quickClinicBtn">
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
                        <h3 class="text-xl font-bold mb-4" id="siteName">SomniCare</h3>
                        <p class="text-gray-400" id="siteTagline">
                            불면증 치료·케어 종합 관리 플랫폼
                        </p>
                    </div>
                    <div>
                        <h3 class="font-bold mb-4">서비스</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/assessment" class="hover:text-white" id="menuAssessment">자가진단</a></li>
                            <li><a href="/program" class="hover:text-white" id="menuProgram">CBT-I 프로그램</a></li>
                            <li><a href="/clinics" class="hover:text-white" id="menuClinics">병원 찾기</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-bold mb-4">정보</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/about" class="hover:text-white" id="footerAbout">소개</a></li>
                            <li><a href="/privacy" class="hover:text-white" id="footerPrivacy">개인정보처리방침</a></li>
                            <li><a href="/terms" class="hover:text-white" id="footerTerms">이용약관</a></li>
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
                    <p id="footerCopyright">&copy; 2025 SomniCare. All rights reserved.</p>
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
          
          // Apply translations
          function applyTranslations() {
            // Helper function to translate element by ID
            const translate = (id, key) => {
              const el = document.getElementById(id);
              if (el) el.textContent = t(key);
            };
            
            // Header
            translate('siteName', 'siteName');
            translate('siteTagline', 'siteTagline');
            translate('menuHome', 'menuHome');
            translate('menuWellness', 'menuWellness');
            translate('menuAssessment', 'menuAssessment');
            translate('menuProgram', 'menuProgram');
            translate('menuClinics', 'menuClinics');
            
            // Hero Section
            translate('heroTitle', 'heroTitle');
            translate('heroSubtitle', 'heroSubtitle');
            translate('btnFreeTest', 'btnFreeTest');
            translate('btnViewProgram', 'btnViewProgram');
            
            // Features Section
            translate('featuresTitle', 'featuresTitle');
            translate('featureRiskScore', 'featureRiskScore');
            translate('featureRiskDesc', 'featureRiskDesc');
            translate('featureAI', 'featureAI');
            translate('featureAIDesc', 'featureAIDesc');
            translate('featureWellness', 'featureWellness');
            translate('featureWellnessDesc', 'featureWellnessDesc');
            translate('featureCare', 'featureCare');
            translate('featureCareDesc', 'featureCareDesc');
            translate('featureHospital', 'featureHospital');
            translate('featureHospitalDesc', 'featureHospitalDesc');
            
            // Quick Actions
            translate('quickTitle', 'quickTitle');
            translate('quickISI', 'quickISI');
            translate('quickISIDesc', 'quickISIDesc');
            translate('quickISIBtn', 'quickISIBtn');
            translate('quickLog', 'quickLog');
            translate('quickLogDesc', 'quickLogDesc');
            translate('quickLogBtn', 'quickLogBtn');
            translate('quickClinic', 'quickClinic');
            translate('quickClinicDesc', 'quickClinicDesc');
            translate('quickClinicBtn', 'quickClinicBtn');
            
            // Footer
            translate('footerAbout', 'footerAbout');
            translate('footerPrivacy', 'footerPrivacy');
            translate('footerTerms', 'footerTerms');
            translate('footerCopyright', 'footerCopyright');
            
            // Update current language display
            const langNames = {
              'ko': '한국어',
              'en': 'English',
              'zh': '中文',
              'ja': '日本語',
              'es': 'Español',
              'fr': 'Français',
              'de': 'Deutsch',
              'vi': 'Tiếng Việt',
              'th': 'ไทย',
              'id': 'Bahasa Indonesia'
            };
            const currentLang = getCurrentLanguage();
            const el_currentLangText = document.getElementById('currentLangText');
            if (el_currentLangText) el_currentLangText.textContent = langNames[currentLang] || '한국어';
            
            // Highlight active language in dropdown
            document.querySelectorAll('.lang-dropdown-content button').forEach(btn => {
              btn.classList.remove('active');
            });
            const langButtons = document.querySelectorAll('.lang-dropdown-content button');
            const langMap = { 'ko': 0, 'en': 1, 'zh': 2, 'ja': 3, 'es': 4, 'fr': 5, 'de': 6, 'vi': 7, 'th': 8, 'id': 9 };
            if (langButtons[langMap[currentLang]]) {
              langButtons[langMap[currentLang]].classList.add('active');
            }
          }
          
          // Initialize on page load
          document.addEventListener('DOMContentLoaded', () => {
            checkHealth();
            loadDashboard();
            applyTranslations();
          });
        <\/script>
    </body>
    </html>
  `));h.get("/program",e=>e.redirect("/static/program.html"));h.get("/sleep-log",e=>e.redirect("/static/sleep-log.html"));h.get("/about",e=>e.redirect("/static/about.html"));h.get("/privacy",e=>e.redirect("/static/privacy.html"));h.get("/terms",e=>e.redirect("/static/terms.html"));h.get("/wellness/yoga",e=>e.redirect("/static/yoga.html"));h.get("/wellness/breathing",e=>e.redirect("/static/breathing.html"));h.get("/wellness/asmr",e=>e.redirect("/static/asmr.html"));const Ye=new pt,ur=Object.assign({"/src/index.tsx":h});let gt=!1;for(const[,e]of Object.entries(ur))e&&(Ye.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),Ye.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),gt=!0);if(!gt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Ye as default};
