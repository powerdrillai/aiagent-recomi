(function(o){typeof define=="function"&&define.amd?define(o):o()})(function(){"use strict";var g=Object.defineProperty;var h=(o,r,s)=>r in o?g(o,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[r]=s;var a=(o,r,s)=>h(o,typeof r!="symbol"?r+"":r,s);var o=(e=>(e.INITIALIZED="initialized",e.NOT_INITIALIZED="not-initialized",e))(o||{}),r=(e=>(e.RECOMI_SDK_INITIALIZED="RecomiSdkInitialized",e))(r||{});const c=class c{constructor(){a(this,"isInitialized",!1);a(this,"showApp",!1);a(this,"recomiAppIframeId");a(this,"API_KEY");a(this,"USER_ID")}static getInstance(){return c.instance||(c.instance=new c),c.instance}setPrivateProperty(t,i){this.API_KEY=t,this.USER_ID=i}getPrivateProperty(){return{API_KEY:this.API_KEY,USER_ID:this.USER_ID}}init(t,i){if(console.log("TODO 执行init"),this.isInitialized){console.warn("SDK already initialized");return}this.setPrivateProperty(t,i),this.isInitialized=!0}getState(){return console.log("getState"),this.isInitialized?o.INITIALIZED:o.NOT_INITIALIZED}bindIframe(t){this.recomiAppIframeId=t,this.changeAppVisiblity();const i=window.frames.RecomiAppIframe_RECOMI;i.onload=()=>{const n=i.contentWindow,m={message:r.RECOMI_SDK_INITIALIZED,config:this.getPrivateProperty()};if(n){console.log(n,this.getPrivateProperty());const l="https://aiagent-recomi.vercel.app/";console.log(l),n==null||n.postMessage(m,l)}}}changeAppVisiblity(){if(this.showApp=!this.showApp,console.log(this.showApp,this.recomiAppIframeId),this.recomiAppIframeId){const t=document.getElementById(this.recomiAppIframeId);if(t)this.showApp?t.style.visibility="visible":t.style.visibility="hidden";else{console.warn("unexpected unexisted ");return}}else console.warn("lack of recomiAppIframeId")}};a(c,"instance");let s=c;function I(){const e=document.createElement("iframe");e.src="https://aiagent-recomi.vercel.app/",e.id="RecomiAppIframe_RECOMI",Object.assign(e.style,{width:"400px",height:"600px",position:"fixed",bottom:"82px",right:"16px",border:"1px solid #e5e7eb",borderRadius:"8px",background:"white",zIndex:"9999"}),document.body.appendChild(e),window.recomi?window.recomi.bindIframe("RecomiAppIframe_RECOMI"):console.error("Recomi is not initialized.")}const d=(e,t)=>{var i;!window.recomi||window.recomi.getState()!==o.INITIALIZED?(window.recomi=new s,window.recomi.init(e,t),I()):(console.log("Already initialized"),(i=window==null?void 0:window.recomi)==null||i.changeAppVisiblity())};function p(e,t){const i={width:"3.5rem",height:"3.5rem",backgroundColor:"black",color:"white",borderRadius:"9999px",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)",display:"flex",alignItems:"center",justifyContent:"center",transition:"background-color 0.2s",position:"fixed",bottom:"10px",right:"16px",zIndex:"9999"},n=Object.assign(document.createElement("button"),{type:"button",ariaLabel:"Open chat"});return Object.assign(n.style,i),n.innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"/>
    </svg>
  `,n.addEventListener("click",()=>d(e,t)),document.body.appendChild(n),n}console.log({BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_API_KEY:"proj_sk_eJxLzNZNzjWtrDApqkg2MDPNMDDMMbQ0M8s3LktOtzI0NzY3MDA3MDK0NDKwci6pyA3yr9I3riiJ9E0ujKrwMnStDPeMsiwONCg1iQj1DisyDq8wSMwo8AQAdQMa0g",VITE_RECOMIAPP_IFRAMEID:"RecomiAppIframe_RECOMI",VITE_RECOMI_ORIGIN:"https://aiagent-recomi.vercel.app/",VITE_USER_ID:"tmm-cm5xo80cn05mw01l1zul3n5ib"}),typeof window<"u"&&function(){const e=document.currentScript;console.log(e),console.log(e==null?void 0:e.getAttribute("API_KEY")),console.log(e==null?void 0:e.getAttribute("USER_ID")),console.log(e==null?void 0:e.getAttribute("domain"));function t(){const i=document.createElement("div");i.id="recomi-root",document.body.appendChild(i),p((e==null?void 0:e.getAttribute("API_KEY"))||"",(e==null?void 0:e.getAttribute("USER_ID"))||"")}t()}()});
//# sourceMappingURL=RecomiSDK.umd.cjs.map
