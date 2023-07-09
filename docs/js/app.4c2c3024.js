(()=>{"use strict";var e={9335:(e,t,r)=>{var o=r(7004),n=r(604),a=r(7071),i=r(5008);function s(e,t,r,o,n,a){const s=(0,i.up)("router-view");return(0,i.wg)(),(0,i.j4)(s)}var l=r(6629);const u=(0,i.aZ)({name:"App",setup(){(0,l.Z)()}});var c=r(446);const d=(0,c.Z)(u,[["render",s]]),h=d;var p=r(9930),f=r(709);const v=(0,p.h)((()=>{const e=(0,f.WB)();return e}));var g=r(9158);const m=[{path:"/",component:()=>Promise.all([r.e(736),r.e(196)]).then(r.bind(r,2196)),children:[{path:"",component:()=>Promise.all([r.e(736),r.e(272)]).then(r.bind(r,5272))},{path:"/help",component:()=>Promise.all([r.e(736),r.e(206)]).then(r.bind(r,4206))},{path:"/charts",component:()=>Promise.all([r.e(736),r.e(842)]).then(r.bind(r,9842))}]},{path:"/:catchAll(.*)*",component:()=>Promise.all([r.e(736),r.e(464)]).then(r.bind(r,2464))}],y=m,b=(0,p.BC)((function(){const e=g.r5,t=(0,g.p7)({scrollBehavior:()=>({left:0,top:0}),routes:y,history:e("")});return t}));async function w(e,t){const r=e(h);r.use(n.Z,t);const o="function"===typeof v?await v({}):v;r.use(o);const i=(0,a.Xl)("function"===typeof b?await b({store:o}):b);return o.use((({store:e})=>{e.router=i})),{app:r,store:o,router:i}}var P=r(873);const O={config:{dark:!0},plugins:{Notify:P.Z}},S="";async function j({app:e,router:t,store:r},o){let n=!1;const a=e=>{try{return t.resolve(e).href}catch(r){}return Object(e)===e?null:e},i=e=>{if(n=!0,"string"===typeof e&&/^https?:\/\//.test(e))return void(window.location.href=e);const t=a(e);null!==t&&(window.location.href=t,window.location.reload())},s=window.location.href.replace(window.location.origin,"");for(let u=0;!1===n&&u<o.length;u++)try{await o[u]({app:e,router:t,store:r,ssrContext:null,redirect:i,urlPath:s,publicPath:S})}catch(l){return l&&l.url?void i(l.url):void console.error("[Quasar] boot error:",l)}!0!==n&&(e.use(t),e.mount("#q-app"))}w(o.ri,O).then((e=>{const[t,o]=void 0!==Promise.allSettled?["allSettled",e=>e.map((e=>{if("rejected"!==e.status)return e.value.default;console.error("[Quasar] boot error:",e.reason)}))]:["all",e=>e.map((e=>e.default))];return Promise[t]([Promise.resolve().then(r.bind(r,9375))]).then((t=>{const r=o(t).filter((e=>"function"===typeof e));j(e,r)}))}))},9375:(e,t,r)=>{r.r(t),r.d(t,{auth:()=>c,db:()=>d,default:()=>p,googleProvider:()=>h});var o=r(2094),n=r(6613),a=r(2145),i=r(7862),s=r(9930);const l={apiKey:"AIzaSyBQqfq7czWKwwN0kE45ldlH8iJjFqm1oJU",authDomain:"todo-99fc2.firebaseapp.com",projectId:"todo-99fc2",storageBucket:"todo-99fc2.appspot.com",messagingSenderId:790490764299,appId:"1:790490764299:web:30c5c28dfec1988249e30e"},u=(0,o.ZF)(l),c=(0,a.v0)(u),d=(0,n.ad)(u),h=new a.hJ,p=(0,s.xr)((({router:e,store:t})=>{const r=(0,i.L)(t);c.onAuthStateChanged((async e=>{e?(r.isAuthenticated=!0,r.user=e,console.log("User is signed in!",e.displayName)):(r.isAuthenticated=!1,r.user=null,console.log("User is not signed in!"))}))}))},7862:(e,t,r)=>{r.d(t,{L:()=>i});var o=r(709),n=r(9375),a=r(2145);const i=(0,o.Q_)("userStore",{state:()=>({user:null,isAuthenticated:!1}),actions:{async signInWithRedirect(){try{await(0,a.F6)(n.auth,n.googleProvider)}catch(e){console.error("Sign-in with redirect failed:",e)}},signOut(){n.auth.signOut().then((()=>{this.user=null,this.isAuthenticated=!1,console.log("Signed out user")})).catch((e=>{console.log("Error during sign out",e)}))}}})}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,r),a.exports}r.m=e,(()=>{var e=[];r.O=(t,o,n,a)=>{if(!o){var i=1/0;for(c=0;c<e.length;c++){for(var[o,n,a]=e[c],s=!0,l=0;l<o.length;l++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](o[l])))?o.splice(l--,1):(s=!1,a<i&&(i=a));if(s){e.splice(c--,1);var u=n();void 0!==u&&(t=u)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[o,n,a]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,o)=>(r.f[o](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+e+"."+{196:"a714f797",206:"5af162fe",272:"5b6ae91c",464:"a7e829a3",842:"aaa668ce"}[e]+".js"})(),(()=>{r.miniCssF=e=>"css/"+e+".0f802ee6.css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={};r.l=(t,o,n,a)=>{if(e[t])e[t].push(o);else{var i,s;if(void 0!==n)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var c=l[u];if(c.getAttribute("src")==t){i=c;break}}i||(s=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,r.nc&&i.setAttribute("nonce",r.nc),i.src=t),e[t]=[o];var d=(r,o)=>{i.onerror=i.onload=null,clearTimeout(h);var n=e[t];if(delete e[t],i.parentNode&&i.parentNode.removeChild(i),n&&n.forEach((e=>e(o))),r)return r(o)},h=setTimeout(d.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=d.bind(null,i.onerror),i.onload=d.bind(null,i.onload),s&&document.head.appendChild(i)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.p=""})(),(()=>{if("undefined"!==typeof document){var e=(e,t,r,o,n)=>{var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var i=r=>{if(a.onerror=a.onload=null,"load"===r.type)o();else{var i=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=s,a.parentNode.removeChild(a),n(l)}};return a.onerror=a.onload=i,a.href=t,r?r.parentNode.insertBefore(a,r.nextSibling):document.head.appendChild(a),a},t=(e,t)=>{for(var r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var n=r[o],a=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(a===e||a===t))return n}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){n=i[o],a=n.getAttribute("data-href");if(a===e||a===t)return n}},o=o=>new Promise(((n,a)=>{var i=r.miniCssF(o),s=r.p+i;if(t(i,s))return n();e(o,s,null,n,a)})),n={143:0};r.f.miniCss=(e,t)=>{var r={272:1};n[e]?t.push(n[e]):0!==n[e]&&r[e]&&t.push(n[e]=o(e).then((()=>{n[e]=0}),(t=>{throw delete n[e],t})))}}})(),(()=>{var e={143:0};r.f.j=(t,o)=>{var n=r.o(e,t)?e[t]:void 0;if(0!==n)if(n)o.push(n[2]);else{var a=new Promise(((r,o)=>n=e[t]=[r,o]));o.push(n[2]=a);var i=r.p+r.u(t),s=new Error,l=o=>{if(r.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var a=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,n[1](s)}};r.l(i,l,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,o)=>{var n,a,[i,s,l]=o,u=0;if(i.some((t=>0!==e[t]))){for(n in s)r.o(s,n)&&(r.m[n]=s[n]);if(l)var c=l(r)}for(t&&t(o);u<i.length;u++)a=i[u],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(c)},o=globalThis["webpackChunk"]=globalThis["webpackChunk"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var o=r.O(void 0,[736],(()=>r(9335)));o=r.O(o)})();