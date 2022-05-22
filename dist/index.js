(()=>{(function(f,h){typeof exports=="object"&&typeof module<"u"?h(exports):typeof define=="function"&&define.amd?define(["exports"],h):(f=typeof globalThis<"u"?globalThis:f||self,h(f.visualscript={}))})(void 0,function(f){"use strict";let h=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,x=Symbol(),k=new Map;class _{constructor(e,t){if(this._$cssResult$=!0,t!==x)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=k.get(this.cssText);return h&&e===void 0&&(k.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}let L=n=>new _(typeof n=="string"?n:n+"",x),w=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((i,s,r)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new _(t,x)},z=(n,e)=>{h?n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{let i=document.createElement("style"),s=window.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)})},M=h?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return L(t)})(n):n;var R;let U=window.trustedTypes,G=U?U.emptyScript:"",xe=window.reactiveElementPolyfillSupport,ce={toAttribute(n,e){switch(e){case Boolean:n=n?G:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},K=(n,e)=>e!==n&&(e==e||n==n),Oe={attribute:!0,type:String,converter:ce,reflect:!1,hasChanged:K};class Q extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach((t,i)=>{let s=this._$Eh(i,t);s!==void 0&&(this._$Eu.set(s,i),e.push(s))}),e}static createProperty(e,t=Oe){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let i=typeof e=="symbol"?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){let r=this[e];this[t]=s,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Oe}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){let t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(let s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(M(s))}else e!==void 0&&t.push(M(e));return t}static _$Eh(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;let t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return z(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=Oe){var s,r;let a=this.constructor._$Eh(e,i);if(a!==void 0&&i.reflect===!0){let o=((r=(s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==null&&r!==void 0?r:ce.toAttribute)(t,i.type);this._$Ei=e,o==null?this.removeAttribute(a):this.setAttribute(a,o),this._$Ei=null}}_$AK(e,t){var i,s,r;let a=this.constructor,o=a._$Eu.get(e);if(o!==void 0&&this._$Ei!==o){let d=a.getPropertyOptions(o),u=d.converter,y=(r=(s=(i=u)===null||i===void 0?void 0:i.fromAttribute)!==null&&s!==void 0?s:typeof u=="function"?u:null)!==null&&r!==void 0?r:ce.fromAttribute;this._$Ei=o,this[o]=y(t,d.type),this._$Ei=null}}requestUpdate(e,t,i){let s=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||K)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((s,r)=>this[r]=s),this._$Et=void 0);let t=!1,i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(s=>{var r;return(r=s.hostUpdate)===null||r===void 0?void 0:r.call(s)}),this.update(i)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$ES(i,this[i],t)),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}Q.finalized=!0,Q.elementProperties=new Map,Q.elementStyles=[],Q.shadowRootOptions={mode:"open"},xe?.({ReactiveElement:Q}),((R=globalThis.reactiveElementVersions)!==null&&R!==void 0?R:globalThis.reactiveElementVersions=[]).push("1.3.1");var Re;let ee=globalThis.trustedTypes,ot=ee?ee.createPolicy("lit-html",{createHTML:n=>n}):void 0,X=`lit$${(Math.random()+"").slice(9)}$`,lt="?"+X,ii=`<${lt}>`,te=document,de=(n="")=>te.createComment(n),ue=n=>n===null||typeof n!="object"&&typeof n!="function",ct=Array.isArray,si=n=>{var e;return ct(n)||typeof((e=n)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},he=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,ut=/>/g,J=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,ht=/'/g,pt=/"/g,ft=/^(?:script|style|textarea|title)$/i,ni=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),b=ni(1),W=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),gt=new WeakMap,ri=(n,e,t)=>{var i,s;let r=(i=t?.renderBefore)!==null&&i!==void 0?i:e,a=r._$litPart$;if(a===void 0){let o=(s=t?.renderBefore)!==null&&s!==void 0?s:null;r._$litPart$=a=new fe(e.insertBefore(de(),o),o,void 0,t??{})}return a._$AI(n),a},ie=te.createTreeWalker(te,129,null,!1),ai=(n,e)=>{let t=n.length-1,i=[],s,r=e===2?"<svg>":"",a=he;for(let d=0;d<t;d++){let u=n[d],y,v,$=-1,T=0;for(;T<u.length&&(a.lastIndex=T,v=a.exec(u),v!==null);)T=a.lastIndex,a===he?v[1]==="!--"?a=dt:v[1]!==void 0?a=ut:v[2]!==void 0?(ft.test(v[2])&&(s=RegExp("</"+v[2],"g")),a=J):v[3]!==void 0&&(a=J):a===J?v[0]===">"?(a=s??he,$=-1):v[1]===void 0?$=-2:($=a.lastIndex-v[2].length,y=v[1],a=v[3]===void 0?J:v[3]==='"'?pt:ht):a===pt||a===ht?a=J:a===dt||a===ut?a=he:(a=J,s=void 0);let D=a===J&&n[d+1].startsWith("/>")?" ":"";r+=a===he?u+ii:$>=0?(i.push(y),u.slice(0,$)+"$lit$"+u.slice($)+X+D):u+X+($===-2?(i.push(void 0),d):D)}let o=r+(n[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ot!==void 0?ot.createHTML(o):o,i]};class pe{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,a=0,o=e.length-1,d=this.parts,[u,y]=ai(e,t);if(this.el=pe.createElement(u,i),ie.currentNode=this.el.content,t===2){let v=this.el.content,$=v.firstChild;$.remove(),v.append(...$.childNodes)}for(;(s=ie.nextNode())!==null&&d.length<o;){if(s.nodeType===1){if(s.hasAttributes()){let v=[];for(let $ of s.getAttributeNames())if($.endsWith("$lit$")||$.startsWith(X)){let T=y[a++];if(v.push($),T!==void 0){let D=s.getAttribute(T.toLowerCase()+"$lit$").split(X),C=/([.?@])?(.*)/.exec(T);d.push({type:1,index:r,name:C[2],strings:D,ctor:C[1]==="."?li:C[1]==="?"?di:C[1]==="@"?ui:we})}else d.push({type:6,index:r})}for(let $ of v)s.removeAttribute($)}if(ft.test(s.tagName)){let v=s.textContent.split(X),$=v.length-1;if($>0){s.textContent=ee?ee.emptyScript:"";for(let T=0;T<$;T++)s.append(v[T],de()),ie.nextNode(),d.push({type:2,index:++r});s.append(v[$],de())}}}else if(s.nodeType===8)if(s.data===lt)d.push({type:2,index:r});else{let v=-1;for(;(v=s.data.indexOf(X,v+1))!==-1;)d.push({type:7,index:r}),v+=X.length-1}r++}}static createElement(e,t){let i=te.createElement("template");return i.innerHTML=e,i}}function se(n,e,t=n,i){var s,r,a,o;if(e===W)return e;let d=i!==void 0?(s=t._$Cl)===null||s===void 0?void 0:s[i]:t._$Cu,u=ue(e)?void 0:e._$litDirective$;return d?.constructor!==u&&((r=d?._$AO)===null||r===void 0||r.call(d,!1),u===void 0?d=void 0:(d=new u(n),d._$AT(n,t,i)),i!==void 0?((a=(o=t)._$Cl)!==null&&a!==void 0?a:o._$Cl=[])[i]=d:t._$Cu=d),d!==void 0&&(e=se(n,d._$AS(n,e.values),d,i)),e}class oi{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;let{el:{content:i},parts:s}=this._$AD,r=((t=e?.creationScope)!==null&&t!==void 0?t:te).importNode(i,!0);ie.currentNode=r;let a=ie.nextNode(),o=0,d=0,u=s[0];for(;u!==void 0;){if(o===u.index){let y;u.type===2?y=new fe(a,a.nextSibling,this,e):u.type===1?y=new u.ctor(a,u.name,u.strings,this,e):u.type===6&&(y=new hi(a,this,e)),this.v.push(y),u=s[++d]}o!==u?.index&&(a=ie.nextNode(),o++)}return r}m(e){let t=0;for(let i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class fe{constructor(e,t,i,s){var r;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cg=(r=s?.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=se(this,e,t),ue(e)?e===j||e==null||e===""?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==W&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.k(e):si(e)?this.S(e):this.$(e)}M(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.M(e))}$(e){this._$AH!==j&&ue(this._$AH)?this._$AA.nextSibling.data=e:this.k(te.createTextNode(e)),this._$AH=e}T(e){var t;let{values:i,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=pe.createElement(s.h,this.options)),s);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.m(i);else{let a=new oi(r,this),o=a.p(this.options);a.m(i),this.k(o),this._$AH=a}}_$AC(e){let t=gt.get(e.strings);return t===void 0&&gt.set(e.strings,t=new pe(e)),t}S(e){ct(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let r of e)s===t.length?t.push(i=new fe(this.M(de()),this.M(de()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){let s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class we{constructor(e,t,i,s,r){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){let r=this.strings,a=!1;if(r===void 0)e=se(this,e,t,0),a=!ue(e)||e!==this._$AH&&e!==W,a&&(this._$AH=e);else{let o=e,d,u;for(e=r[0],d=0;d<r.length-1;d++)u=se(this,o[i+d],t,d),u===W&&(u=this._$AH[d]),a||(a=!ue(u)||u!==this._$AH[d]),u===j?e=j:e!==j&&(e+=(u??"")+r[d+1]),this._$AH[d]=u}a&&!s&&this.C(e)}C(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class li extends we{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===j?void 0:e}}let ci=ee?ee.emptyScript:"";class di extends we{constructor(){super(...arguments),this.type=4}C(e){e&&e!==j?this.element.setAttribute(this.name,ci):this.element.removeAttribute(this.name)}}class ui extends we{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){var i;if((e=(i=se(this,e,t,0))!==null&&i!==void 0?i:j)===W)return;let s=this._$AH,r=e===j&&s!==j||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,a=e!==j&&(s===j||r);r&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class hi{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){se(this,e)}}let mt=window.litHtmlPolyfillSupport;mt?.(pe,fe),((Re=globalThis.litHtmlVersions)!==null&&Re!==void 0?Re:globalThis.litHtmlVersions=[]).push("2.2.2");var Ie,De;class F extends Q{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;let i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=ri(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return W}}F.finalized=!0,F._$litElement$=!0,(Ie=globalThis.litElementHydrateSupport)===null||Ie===void 0||Ie.call(globalThis,{LitElement:F});let vt=globalThis.litElementPolyfillSupport;vt?.({LitElement:F}),((De=globalThis.litElementVersions)!==null&&De!==void 0?De:globalThis.litElementVersions=[]).push("3.2.0");class bt extends F{constructor(e={}){super(),this.volume=e.volume??0,this.backgroundColor=e.backgroundColor??"#69ce2b",this.count=e.count??10}static get styles(){return w`

      :host {
        width: 100%;
      }

      #wrapper{
        width: 100%;
      }

      `}static get properties(){return{volume:{type:Number},count:{type:Number},backgroundColor:{type:String,reflect:!0}}}willUpdate(e){e.has("volume")&&(!this.volume||this.volume<0?this.volume=0:this.volume>1&&(this.volume=1))}render(){let e=Math.round(this.count*(this.volume??0));return b`
      <style>
        .target{
          width: calc(${100/this.count}% - 10px);
          height: 10px;
          display: inline-block;
          margin: 5px;
          background-color: #e6e7e8;
        }

        .active {
          background-color: ${this.backgroundColor};
        }
        
      </style>

        <div id="wrapper">
          ${Array.from({length:this.count},(t,i)=>b`<div class=${i<e?"target active":"target"}></div>`)}
        </div>
    `}}customElements.define("visualscript-audio-volume",bt);var pi=Object.freeze({__proto__:null,Volume:bt});class yt extends F{constructor(e={}){super(),this.source=e.source,this.autoplay=e.autoplay,this.controls=e.controls}static get styles(){return w`

      video {
        width: 100%;
      }

      `}static get properties(){return{source:{converter:{toAttribute(e){return e},fromAttribute(e){return e}}},autoplay:{type:Boolean},controls:{type:Boolean}}}willUpdate(e){}render(){let e=document.createElement("video");if(typeof this.source=="object")e.srcObject=this.source;else if(this.source){let t=document.createElement("source");t.src=this.source,e.insertAdjacentElement("beforeend",t)}return this.autoplay&&(e.autoplay=this.autoplay),this.controls&&(e.controls=this.controls),e}}customElements.define("visualscript-video-player",yt);var fi=Object.freeze({__proto__:null,Player:yt});function je(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,i=new Array(e);t<e;t++)i[t]=n[t];return i}function gi(n){if(Array.isArray(n))return je(n)}function mi(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function vi(n,e){if(!!n){if(typeof n=="string")return je(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);if(t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set")return Array.from(n);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return je(n,e)}}function bi(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ge(n){return gi(n)||mi(n)||vi(n)||bi()}function yi(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function xt(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}function xi(n,e,t){return e&&xt(n.prototype,e),t&&xt(n,t),Object.defineProperty(n,"prototype",{writable:!1}),n}function wt(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}class $e{constructor(e,t,i,s){this.r=e,this.g=t,this.b=i,this.a=s}}class wi{constructor(){this.scaleX=1,this.scaleY=1,this.offsetX=0,this.offsetY=0,this.loop=!1,this._vbuffer=0,this._coord=0,this.visible=!0,this.intensity=1,this.xy=new Float32Array([]),this.numPoints=0,this.color=new $e(0,0,0,1),this.webglNumPoints=0}}class Ue extends wi{constructor(e,t){super(),this.currentIndex=0,this.webglNumPoints=t,this.numPoints=t,this.color=e,this.xy=new Float32Array(2*this.webglNumPoints)}setX(e,t){this.xy[e*2]=t}setY(e,t){this.xy[e*2+1]=t}getX(e){return this.xy[e*2]}getY(e){return this.xy[e*2+1]}lineSpaceX(e,t){for(let i=0;i<this.numPoints;i++)this.setX(i,e+t*i)}arrangeX(){this.lineSpaceX(-1,2/this.numPoints)}constY(e){for(let t=0;t<this.numPoints;t++)this.setY(t,e)}shiftAdd(e){let t=e.length;for(let i=0;i<this.numPoints-t;i++)this.setY(i,this.getY(i+t));for(let i=0;i<t;i++)this.setY(i+this.numPoints-t,e[i])}addArrayY(e){if(this.currentIndex+e.length<=this.numPoints)for(let t=0;t<e.length;t++)this.setY(this.currentIndex,e[t]),this.currentIndex++}replaceArrayY(e){if(e.length==this.numPoints)for(let t=0;t<this.numPoints;t++)this.setY(t,e[t])}}class $i{constructor(e,t){this.debug=!1,this.addLine=this.addDataLine,t==null?this.webgl=e.getContext("webgl",{antialias:!0,transparent:!1}):(this.webgl=e.getContext("webgl",{antialias:t.antialias,transparent:t.transparent,desynchronized:t.deSync,powerPerformance:t.powerPerformance,preserveDrawing:t.preserveDrawing}),this.debug=t.debug==null?!1:t.debug),this.log("canvas type is: "+e.constructor.name),this.log(`[webgl-plot]:width=${e.width}, height=${e.height}`),this._linesData=[],this._linesAux=[],this._thickLines=[],this._surfaces=[],this.gScaleX=1,this.gScaleY=1,this.gXYratio=1,this.gOffsetX=0,this.gOffsetY=0,this.gLog10X=!1,this.gLog10Y=!1,this.webgl.clear(this.webgl.COLOR_BUFFER_BIT),this.webgl.viewport(0,0,e.width,e.height),this._progLine=this.webgl.createProgram(),this.initThinLineProgram(),this.webgl.enable(this.webgl.BLEND),this.webgl.blendFunc(this.webgl.SRC_ALPHA,this.webgl.ONE_MINUS_SRC_ALPHA)}get linesData(){return this._linesData}get linesAux(){return this._linesAux}get thickLines(){return this._thickLines}get surfaces(){return this._surfaces}_drawLines(e){let t=this.webgl;e.forEach(i=>{if(i.visible){t.useProgram(this._progLine);let s=t.getUniformLocation(this._progLine,"uscale");t.uniformMatrix2fv(s,!1,new Float32Array([i.scaleX*this.gScaleX*(this.gLog10X?1/Math.log(10):1),0,0,i.scaleY*this.gScaleY*this.gXYratio*(this.gLog10Y?1/Math.log(10):1)]));let r=t.getUniformLocation(this._progLine,"uoffset");t.uniform2fv(r,new Float32Array([i.offsetX+this.gOffsetX,i.offsetY+this.gOffsetY]));let a=t.getUniformLocation(this._progLine,"is_log");t.uniform2iv(a,new Int32Array([this.gLog10X?1:0,this.gLog10Y?1:0]));let o=t.getUniformLocation(this._progLine,"uColor");t.uniform4fv(o,[i.color.r,i.color.g,i.color.b,i.color.a]),t.bufferData(t.ARRAY_BUFFER,i.xy,t.STREAM_DRAW),t.drawArrays(i.loop?t.LINE_LOOP:t.LINE_STRIP,0,i.webglNumPoints)}})}_drawSurfaces(e){let t=this.webgl;e.forEach(i=>{if(i.visible){t.useProgram(this._progLine);let s=t.getUniformLocation(this._progLine,"uscale");t.uniformMatrix2fv(s,!1,new Float32Array([i.scaleX*this.gScaleX*(this.gLog10X?1/Math.log(10):1),0,0,i.scaleY*this.gScaleY*this.gXYratio*(this.gLog10Y?1/Math.log(10):1)]));let r=t.getUniformLocation(this._progLine,"uoffset");t.uniform2fv(r,new Float32Array([i.offsetX+this.gOffsetX,i.offsetY+this.gOffsetY]));let a=t.getUniformLocation(this._progLine,"is_log");t.uniform2iv(a,new Int32Array([this.gLog10X?1:0,this.gLog10Y?1:0]));let o=t.getUniformLocation(this._progLine,"uColor");t.uniform4fv(o,[i.color.r,i.color.g,i.color.b,i.color.a]),t.bufferData(t.ARRAY_BUFFER,i.xy,t.STREAM_DRAW),t.drawArrays(t.TRIANGLE_STRIP,0,i.webglNumPoints)}})}_drawTriangles(e){let t=this.webgl;t.bufferData(t.ARRAY_BUFFER,e.xy,t.STREAM_DRAW),t.useProgram(this._progLine);let i=t.getUniformLocation(this._progLine,"uscale");t.uniformMatrix2fv(i,!1,new Float32Array([e.scaleX*this.gScaleX*(this.gLog10X?1/Math.log(10):1),0,0,e.scaleY*this.gScaleY*this.gXYratio*(this.gLog10Y?1/Math.log(10):1)]));let s=t.getUniformLocation(this._progLine,"uoffset");t.uniform2fv(s,new Float32Array([e.offsetX+this.gOffsetX,e.offsetY+this.gOffsetY]));let r=t.getUniformLocation(this._progLine,"is_log");t.uniform2iv(r,new Int32Array([0,0]));let a=t.getUniformLocation(this._progLine,"uColor");t.uniform4fv(a,[e.color.r,e.color.g,e.color.b,e.color.a]),t.drawArrays(t.TRIANGLE_STRIP,0,e.xy.length/2)}_drawThickLines(){this._thickLines.forEach(e=>{if(e.visible){let t=Math.min(this.gScaleX,this.gScaleY);e.setActualThickness(e.getThickness()/t),e.convertToTriPoints(),this._drawTriangles(e)}})}update(){this.clear(),this.draw()}draw(){this._drawLines(this.linesData),this._drawLines(this.linesAux),this._drawThickLines(),this._drawSurfaces(this.surfaces)}clear(){this.webgl.clear(this.webgl.COLOR_BUFFER_BIT)}_addLine(e){e._vbuffer=this.webgl.createBuffer(),this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER,e._vbuffer),this.webgl.bufferData(this.webgl.ARRAY_BUFFER,e.xy,this.webgl.STREAM_DRAW),e._coord=this.webgl.getAttribLocation(this._progLine,"coordinates"),this.webgl.vertexAttribPointer(e._coord,2,this.webgl.FLOAT,!1,0,0),this.webgl.enableVertexAttribArray(e._coord)}addDataLine(e){this._addLine(e),this.linesData.push(e)}addAuxLine(e){this._addLine(e),this.linesAux.push(e)}addThickLine(e){this._addLine(e),this._thickLines.push(e)}addSurface(e){this._addLine(e),this.surfaces.push(e)}initThinLineProgram(){let e=`
      attribute vec2 coordinates;
      uniform mat2 uscale;
      uniform vec2 uoffset;
      uniform ivec2 is_log;

      void main(void) {
         float x = (is_log[0]==1) ? log(coordinates.x) : coordinates.x;
         float y = (is_log[1]==1) ? log(coordinates.y) : coordinates.y;
         vec2 line = vec2(x, y);
         gl_Position = vec4(uscale*line + uoffset, 0.0, 1.0);
      }`,t=this.webgl.createShader(this.webgl.VERTEX_SHADER);this.webgl.shaderSource(t,e),this.webgl.compileShader(t);let i=`
         precision mediump float;
         uniform highp vec4 uColor;
         void main(void) {
            gl_FragColor =  uColor;
         }`,s=this.webgl.createShader(this.webgl.FRAGMENT_SHADER);this.webgl.shaderSource(s,i),this.webgl.compileShader(s),this._progLine=this.webgl.createProgram(),this.webgl.attachShader(this._progLine,t),this.webgl.attachShader(this._progLine,s),this.webgl.linkProgram(this._progLine)}popDataLine(){this.linesData.pop()}removeAllLines(){this._linesData=[],this._linesAux=[],this._thickLines=[],this._surfaces=[]}removeDataLines(){this._linesData=[]}removeAuxLines(){this._linesAux=[]}viewport(e,t,i,s){this.webgl.viewport(e,t,i,s)}log(e){this.debug&&console.log("[webgl-plot]:"+e)}}var Ai=function(){function n(e){var t=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;if(yi(this,n),wt(this,"updateAllLines",function(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,o=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1,d=!0,u=ge(r);s.forEach(function(y,v){var $;if(y.length!==(($=t.linesY[v])===null||$===void 0?void 0:$.length)){var T;y.length>((T=t.linesY[v])===null||T===void 0?void 0:T.length)?t.linesY[v]=n.downsample(y,t.linesY[v].length):t.linesY[v]=n.upsample(y,t.linesY[v]),u[v]=Math.ceil(y.length/t.nSecGraph),a&&(t.linesY[v]=t.autoscale(y,v,t.nLines,o)),d=!1}else a?t.linesY[v]=t.autoscale(y,v,t.nLines,o):t.linesY[v]=y}),d||(t.deinitPlot(),t.initPlot(s.length,u)),t.useOverlay&&(t.overlayctx.clearRect(0,0,t.overlay.width,t.overlay.height),t.overlayctx.font="1em Courier",t.overlayctx.fillStyle="white"),t.linesY.forEach(function(y,v){for(var $=0;$<y.length;$++)t.lines[v].setY($,y[$]);t.useOverlay&&(t.overlayctx.fillText(t.lineSettings[v].ymax.toFixed(2),t.overlay.width-70,t.overlay.height*(v+.1)/t.lines.length),t.overlayctx.fillText(t.lineSettings[v].ymin.toFixed(2),t.overlay.width-70,t.overlay.height*(v+.9)/t.lines.length))})}),wt(this,"updateLine",function(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:500,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,o=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0,d=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!1;s.length!==r*t.nSecGraph&&(r=s.length/t.nSecGraph,t.linesSPS[a]=r,t.deinitPlot(),t.initPlot(t.lines.length,t.linesSPS)),s.length!==t.linesY[a].length?(s.length>t.linesY[a].length?t.linesY[a]=n.downsample(s,t.linesY[a].length):t.linesY[a]=n.upsample(s,t.linesY[a]),o&&(t.linesY[a]=t.autoscale(s,a,t.nLines,d))):o?t.linesY[a]=t.autoscale(s,a,t.nLines,d):t.linesY[a]=s;for(var u=0;u<t.linesY[a].length;u++)t.lines[a].setY(u,t.linesY[a][u]);t.useOverlay&&(t.overlayctx.clearRect(0,t.overlay.height*a/t.lines.length,t.overlay.width,t.overlay.height*(a+1)/t.lines.length),t.overlayctx.fillText(t.lineSettings[a].ymax.toFixed(2),t.overlay.width-70,t.overlay.height*(a+.1)/t.lines.length),t.overlayctx.fillText(t.lineSettings[a].ymin.toFixed(2),t.overlay.width-70,t.overlay.height*(a+.9)/t.lines.length))}),!e)throw new Error("Supply a canvas to the webgl plot!");this.canvas=e,this.useOverlay=i,this.overlay,this.overlayctx,this.plot=new $i(e),this.useOverlay&&(this.overlay=document.createElement("canvas"),this.overlay.style=this.canvas.style,this.overlay.width=this.canvas.width,this.overlay.height=this.canvas.height,this.overlay.style.position="absolute",this.overlay.style.zIndex=this.canvas.style.zIndex+1,this.overlayctx=this.overlay.getContext("2d"),this.canvas.parentNode.insertAdjacentElement("afterbegin",this.overlay)),this.lines=[],this.linesY=[],this.linesSPS=[],this.axes=[],this.dividers=[],this.colors=[],this.lineSettings=[],this.axisscalar=1,this.nLines=0,this.nSecGraph=10,this.nMaxPointsPerSec=512,this.animationSpeed=6.9}return xi(n,[{key:"autoscale",value:function(t){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1,a=Math.max.apply(Math,ge(t)),o=Math.min.apply(Math,ge(t));this.lineSettings[i].ymax=a,this.lineSettings[i].ymin=o;var d=1/s,u;if(r){var y=Math.max(Math.abs(o),Math.abs(a));return u=d/y,t.map(function(v){return v*u+(d*(i+1)*2-1-d)})}else return u=d/(a-o),t.map(function(v){return 2*((v-o)*u-1/(2*s))+(d*(i+1)*2-1-d)})}},{key:"deinitPlot",value:function(){var t,i;(t=this.plot)===null||t===void 0||t.clear(),(i=this.plot)===null||i===void 0||i.removeAllLines()}},{key:"HSLToRGB",value:function(t,i,s){i/=100,s/=100;var r=(1-Math.abs(2*s-1))*i,a=r*(1-Math.abs(t/60%2-1)),o=s-r/2,d=0,u=0,y=0;return 0<=t&&t<60?(d=r,u=a,y=0):60<=t&&t<120?(d=a,u=r,y=0):120<=t&&t<180?(d=0,u=r,y=a):180<=t&&t<240?(d=0,u=a,y=r):240<=t&&t<300?(d=a,u=0,y=r):300<=t&&t<360&&(d=r,u=0,y=a),d=Math.round((d+o)*255),u=Math.round((u+o)*255),y=Math.round((y+o)*255),[d,u,y]}},{key:"initPlot",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:this.nSecGraph,r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:this.nMaxPointsPerSec;this.nSecGraph=s,this.nMaxPointsPerSec=r;var a=new $e(1,1,1,.3),o=new $e(1,1,1,1),d=1/t;this.nLines=t,this.lines=[],this.linesSPS=i;for(var u=0;u<t;u++){var y=this.HSLToRGB(360*(u/t)%360,100,50),v=new $e(y[0],y[1],y[2],1);this.colors.push(v);var $=10;i[u]>r?$=s*r:$=i[u]*s,$=Math.floor($);var T=new Ue(v,$);T.arrangeX(),this.lines.push(T),this.linesY.length<this.lines.length&&this.linesY.push(new Array($)),this.plot.addDataLine(T);var D=d*(u+1)*2-1-d,C=new Ue(a,2);if(C.constY(D),C.arrangeX(),C.xy[2]=1,this.plot.addAuxLine(C),this.axes.push(C),u!==t-1){var P=d*(u+1)*2-1,O=new Ue(o,2);O.constY(P),O.arrangeX(),O.xy[2]=1,this.plot.addAuxLine(O),this.dividers.push(O)}this.lineSettings[u]={color:v,sps:i[u],ymin:-1,ymax:1}}return this.linesY.length>this.lines.length&&this.linesY.splice(this.lines.length),!0}},{key:"update",value:function(){this.plot.update()}},{key:"animate",value:function(){var t=this;this.update(),setTimeout(function(){requestAnimationFrame(t.animate)},this.animationSpeed)}}],[{key:"absmax",value:function(t){return Math.max(Math.abs(Math.min.apply(Math,ge(t))),Math.max.apply(Math,ge(t)))}},{key:"downsample",value:function(t,i){var s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1;if(t.length>i){for(var r=new Array(i),a=t.length/i,o=t.length-1,d=0,u=0,y=a;y<t.length;y+=a){var v=Math.round(y);v>o&&(v=o);for(var $=d;$<v;$++)r[u]+=t[$];r[u]/=(v-d)*s,u++,d=v}return r}else return t}},{key:"upsample",value:function(t,i){var s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,r=function(D,C,P){return(D+(C-D)*P)*s},a=new Array(i),o=new Number((t.length-1)/(i-1));a[0]=t[0];for(var d=1;d<i-1;d++){var u=d*o,y=new Number(Math.floor(u)).toFixed(),v=new Number(Math.ceil(u)).toFixed(),$=u-y;a[d]=r(t[y],t[v],$)}return a[i-1]=t[t.length-1],a}},{key:"test",value:function(t){var i=document.getElementById(t),s=globalThis.devicePixelRatio||1;i.width=i.clientWidth*s,i.height=i.clientHeight*s;var r=512,a=256,o=3,d=512,u=1,y=.5,v=.5,$=new Array(r*o),T=new Array(a*o),D=new n(i);D.initPlot(2,[r,a],o,d);function C(){for(var O=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:512,l=arguments.length>2&&arguments[2]!==void 0?arguments[2]:10,p=c*l,g=l/p,m=0,A=0;A<c*l;A++){var E=Math.sin(Math.PI*m*u*Math.PI*2+performance.now()*.001),S=Math.random()-.5;O[A]=E*y+S*v,m+=g}}var P=function O(){C($,r,o),C(T,a,o),D.updateAllLines([$,T],[r,a],!0),D.update(),requestAnimationFrame(O)};requestAnimationFrame(P)}}]),n}();class $t extends F{constructor(e={seconds:5,sps:512}){super(),this.data=[],this.spss=[],this.buffers=[],this.updateData=i=>{this.data=i},this.init=()=>{let i=this.data.length,s=60;this.sps=this.seconds*s,this.spss=Array.from({length:i},r=>this.sps),this.buffers=Array.from({length:i},r=>[]),this.util.initPlot(i,this.spss,this.seconds,s)},this.clear=()=>{this.util.plot.clear(),this.buffers=[],this.data=[]},this.draw=()=>{this.data.length!=this.buffers.length&&this.init(),this.data.forEach((i,s)=>{this.buffers[s].length===0?this.buffers[s]=Array.from({length:this.spss[s]},r=>i):(Array.isArray(i)||(i=[i]),i.forEach(()=>this.buffers[s].pop()),this.buffers[s].unshift(...i))})},this.canvas=document.createElement("canvas"),this.util=new Ai(this.canvas,!1),this.sps=e.sps??512,this.seconds=e.seconds??5,this.backgroundColor=e.backgroundColor??"#69ce2b";let t=()=>{this.buffers.length>0&&(this.util.updateAllLines(this.buffers,this.spss,!0),this.util.update()),requestAnimationFrame(t)};requestAnimationFrame(t)}static get styles(){return w`

      canvas{
        background: black;
      }

      `}static get properties(){return{data:{type:Array,reflect:!0},sps:{type:Number,reflect:!0},seconds:{type:Number,reflect:!0},backgroundColor:{type:String,reflect:!0}}}willUpdate(e){e.has("data")&&this.draw(),e.has("seconds")&&(this.seconds||(this.seconds=.001),this.init())}render(){return this.canvas}}customElements.define("visualscript-timeseries",$t);class At extends F{constructor(e={}){super(),this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.reset=!1,this.offset=!0,this.colorScale=["#000000","#030106","#06010c","#090211","#0c0215","#0e0318","#10031b","#12041f","#130522","#140525","#150628","#15072c","#16082f","#160832","#160936","#160939","#17093d","#170a40","#170a44","#170a48","#17094b","#17094f","#170953","#170956","#16085a","#16085e","#150762","#140766","#140669","#13066d","#110571","#100475","#0e0479","#0b037d","#080281","#050185","#020089","#00008d","#000090","#000093","#000096","#000099","#00009c","#00009f","#0000a2","#0000a5","#0000a8","#0000ab","#0000ae","#0000b2","#0000b5","#0000b8","#0000bb","#0000be","#0000c1","#0000c5","#0000c8","#0000cb","#0000ce","#0000d1","#0000d5","#0000d8","#0000db","#0000de","#0000e2","#0000e5","#0000e8","#0000ec","#0000ef","#0000f2","#0000f5","#0000f9","#0000fc","#0803fe","#2615f9","#3520f4","#3f29ef","#4830eb","#4e37e6","#543ee1","#5944dc","#5e49d7","#614fd2","#6554cd","#6759c8","#6a5ec3","#6c63be","#6e68b9","#6f6db4","#7072af","#7177aa","#717ba5","#7180a0","#71859b","#718996","#708e91","#6f928b","#6e9786","#6c9b80","#6aa07b","#68a475","#65a96f","#62ad69","#5eb163","#5ab65d","#55ba56","#4fbf4f","#48c347","#40c73f","#36cc35","#34ce32","#37cf31","#3ad130","#3cd230","#3fd32f","#41d52f","#44d62e","#46d72d","#48d92c","#4bda2c","#4ddc2b","#4fdd2a","#51de29","#53e029","#55e128","#58e227","#5ae426","#5ce525","#5ee624","#60e823","#62e922","#64eb20","#66ec1f","#67ed1e","#69ef1d","#6bf01b","#6df11a","#6ff318","#71f416","#73f614","#75f712","#76f810","#78fa0d","#7afb0a","#7cfd06","#7efe03","#80ff00","#85ff00","#89ff00","#8eff00","#92ff00","#96ff00","#9aff00","#9eff00","#a2ff00","#a6ff00","#aaff00","#adff00","#b1ff00","#b5ff00","#b8ff00","#bcff00","#bfff00","#c3ff00","#c6ff00","#c9ff00","#cdff00","#d0ff00","#d3ff00","#d6ff00","#daff00","#ddff00","#e0ff00","#e3ff00","#e6ff00","#e9ff00","#ecff00","#efff00","#f3ff00","#f6ff00","#f9ff00","#fcff00","#ffff00","#fffb00","#fff600","#fff100","#ffec00","#ffe700","#ffe200","#ffdd00","#ffd800","#ffd300","#ffcd00","#ffc800","#ffc300","#ffbe00","#ffb900","#ffb300","#ffae00","#ffa900","#ffa300","#ff9e00","#ff9800","#ff9300","#ff8d00","#ff8700","#ff8100","#ff7b00","#ff7500","#ff6f00","#ff6800","#ff6100","#ff5a00","#ff5200","#ff4900","#ff4000","#ff3600","#ff2800","#ff1500","#ff0004","#ff000c","#ff0013","#ff0019","#ff001e","#ff0023","#ff0027","#ff002b","#ff012f","#ff0133","#ff0137","#ff013b","#ff023e","#ff0242","#ff0246","#ff0349","#ff034d","#ff0450","#ff0454","#ff0557","#ff065b","#ff065e","#ff0762","#ff0865","#ff0969","#ff0a6c","#ff0a70","#ff0b73","#ff0c77","#ff0d7a","#ff0e7e","#ff0f81","#ff1085","#ff1188","#ff128c","#ff138f","#ff1493"],this.data=[],this.dynNormalize=!0,this.init=()=>{this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.offscreenctx.fillStyle="black",this.offscreenctx.fillRect(0,0,this.canvas.width,this.canvas.height)},this.updateData=t=>{this.data=t},this.onresize=()=>{let t=this.canvas.parentNode?.clientWidth,i=this.canvas.parentNode?.clientHeight;t&&(this.canvas.width=this.canvas.parentNode?.clientWidth,this.canvas.style.width=t.toString()),i&&(this.canvas.height=this.canvas.parentNode?.clientHeight,this.canvas.style.height=i.toString())},this.draw=()=>{var t=this.canvas.width,i=Math.floor(this.canvas.height),s=this.offscreenctx,r=s.canvas;s.drawImage(this.canvas,0,0,t,i);var a=[...Array.from(this.data)];if(a.length!==i){var o=a;a=this.interpolateArray(o,i)}var d=0;this.offset===!0&&(d=Math.pow(10,Math.floor(Math.log10(Math.min(...a))))),this.dynNormalize===!0&&(this.normalizeFactor=1/Math.pow(10,Math.floor(Math.log10(Math.max(...a))+.5)));for(var u=0;u<a.length;u++){var y=Math.floor((a[u]-d)*this.normalizeFactor*255);y>255?y=255:y<0&&(y=0),this.ctx.fillStyle=this.colorScale[y],this.ctx.fillRect(t-1,i-u,1,1)}this.reset===!1?(this.ctx.translate(-1,0),this.ctx.drawImage(r,0,0,t,i),this.ctx.setTransform(1,0,0,1,0,0)):this.reset=!1},this.max=e.max??1,this.normalizeFactor=e.max?1/e.max:1,this.backgroundColor=e.backgroundColor??"#69ce2b",window.addEventListener("resize",()=>{this.onresize()}),this.offscreen=new OffscreenCanvas(this.canvas.width,this.canvas.height),this.offscreenctx=this.offscreen.getContext("2d"),this.init(),this.data=e.data??new Array(this.canvas.height).fill(0),this.onresize()}static get styles(){return w`

      canvas{
        background: black;
      }

      `}static get properties(){return{max:{type:Number,reflect:!0},data:{type:Array,reflect:!0},backgroundColor:{type:String,reflect:!0}}}willUpdate(e){e.has("data")&&this.draw()}interpolateArray(e,t){var i=this.canvas.height/e.length,s=function(T,D,C){return(T+(D-T)*C)*i},r=new Array,a=new Number((e.length-1)/(t-1));r[0]=e[0];for(var o=1;o<t-1;o++){var d=o*a,u=new Number(Math.floor(d)),y=u.toFixed(),v=new Number(Math.ceil(d)).toFixed(),$=d-u;r[o]=s(e[y],e[v],$)}return r[t-1]=e[e.length-1],r}render(){return this.canvas}}customElements.define("visualscript-spectrogram",At);let St=["Hot","Cold","YlGnBu","YlOrRd","RdBu","Portland","Picnic","Jet","Greys","Greens","Electric","Earth","Bluered","Blackbody"];class Be extends F{constructor(e={}){super(),this.colorscale="Electric",this.div=document.createElement("div"),this.data=[],this.plotData=[],this.config={},this.windowSize=300,this.binWidth=256,this.colorscales=St,this.data=e.data??[[]],e.colorscale&&(this.colorscale=e.colorscale),this.plotData=[{x:[1,2],z:this.transpose(this.data),showscale:!0,colorscale:this.colorscale,type:"heatmap"}],this.config={responsive:!0,autosize:!0},e.Plotly?(this.Plotly=e.Plotly,this.Plotly.newPlot(this.div,this.plotData,this.config)):console.warn("<interactive-spectrogram>: Plotly instance not provided..."),window.addEventListener("resize",()=>{})}static get styles(){return w`

      `}createRenderRoot(){return this}static get properties(){return{max:{type:Number,reflect:!0},data:{type:Array,reflect:!0},colorscale:{type:Object,reflect:!0},backgroundColor:{type:String,reflect:!0}}}transpose(e){return Object.keys(e[0]).map(function(t){return e.map(function(i){return i[t]})})}willUpdate(e){e.has("colorscale")&&(!Array.isArray(this.colorscale)&&!this.colorscales.includes(this.colorscale)&&(this.colorscale="Electric"),this.Plotly.restyle(this.div,"colorscale",this.colorscale)),e.has("data")&&(this.plotData[0].z=this.transpose(this.data),this.Plotly.newPlot(this.div,this.plotData,this.config))}render(){return this.div}}Be.colorscales=St,customElements.define("visualscript-spectrogram-interactive",Be);var Si=Object.freeze({__proto__:null,TimeSeries:$t,Spectrogram:At,InteractiveSpectrogram:Be}),ki=Object.freeze({__proto__:null,audio:pi,video:fi,data:Si});class kt extends F{constructor(e={brand:{},primary:{menu:[],options:[]},secondary:[]}){super(),this.getElement=t=>{switch(t.type){case"button":return b`<a href="${t.link}" target=${t.external?"_blank":"_self"}><button>${t.content}</button></a>`;default:return b`<a href="${t.link}" target=${t.external?"_blank":"_self"} class="decorate">${t.content}</a>`}},this.primary=e.primary??{menu:[],options:[]},this.secondary=e.secondary??[],this.color=e.color??"blue",this.brand=e.brand??{content:"My Brand"}}static get styles(){return w`

    
    :host {
      z-index: 2;
      border-bottom: 1px solid rgb(180,180,180);
      background: white;
      color: black;
      display:flex;
      align-items: center;
      width: 100%;
      grid-area: nav;
      z-index: 100;
    }

    header {
      width: 100%;
    }

    :host * {
      box-sizing: border-box;
    }
    
    h1 {
      margin: 0;
    }

    nav {
      width: 100%;
      padding:  0px 25px;
      display: flex;
      align-items: center;
    }

    #primary {
      position: sticky; 
      top: 0;
      left: 0;
      height: 70px;
      max-height: 100px;
      justify-content: space-between;
      font-size: 80%;
    }

    #primary > * {
      flex-grow: 1;
      display: flex;
    }

    #primary > div:lastchild {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row-reverse;
    }

    #menu, #options {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #secondary {
      height: 50px;
      justify-content: flex-end;
      border-bottom: 1px solid #3d3d3d;
      font-size: 75%;
    }

    a{
      color: black;
      text-decoration: none;
    }

    .brand {
      padding-right: 15px;
    }

    a:not(.brand) {
      height: 100%;
      display: flex;
      align-items: center; 
      justify-content: center;
      text-align: center;
    }

    .decorate {
      padding: 10px 15px;
    }

    #primary .decorate:hover {
      box-shadow: 0 4px 0 #0fb3ff inset;
    }

    #secondary .decorate:hover {
      box-shadow: 0 3px 0 #c4c4c4 inset;
    }

    button {
      border: 1px solid white;
      border-radius: 3px;
      background: transparent;
      padding: 5px 10px;
      margin-left: 10px;
      font-size: 95%;
    }
    
    nav button:last-child {
      margin-right: 0px;
    }

    button:hover {
      outline: 1.1px solid white;
      cursor: pointer;
    }

    @media only screen and (max-width: 800px) {
      #primary #menu {
        display: none;
      }
    }

    @media (prefers-color-scheme: dark) {
      :host {
        background: #060606;
        color: white;
      }

      a {
        color: white;
      }
    }

    `}static get properties(){return{primary:{type:Object},secondary:{type:Array,reflect:!0},brand:{type:Object},color:{type:String,reflect:!0}}}willUpdate(e){e.has("primary")}render(){return b`
      <header>
      ${this.secondary.length>0?b`<nav id="secondary">${this.secondary?.map(e=>this.getElement(e))}</nav>`:""}
      <nav id="primary">
      ${b`<div><a class="brand" target=${this.brand.external?"_blank":"_self"} href=${this.brand.link}>${this.brand.content?/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(this.brand.content)?b`<img src="${this.brand.content}"></img>`:b`<h1>${this.brand.content}</h1><slot></slot>`:b`<h1><slot></slot></h1>`}</a></div>`}
        <div>
          <div id="options">
          ${this.primary.options?.map(e=>this.getElement(e))}
          </div>
          <div id="menu">
            ${this.primary.menu?.map(e=>this.getElement(e))}
          </div>
        </div>

      </nav>
      </header>
    `}}customElements.define("visualscript-nav",kt);class _t extends F{constructor(e={}){super(),this.progress=e.progress,this.color=e.color,this.background=e.background??"#f3f3f3",this.type=e.type??"default",this.showPercent=e.showPercent??!0,this.text=e.text,this.textBackground=e.textBackground,this.textColor=e.textColor,this.size=e.size??"13px",this.color||(this.type==="default"?this.color="blue":this.color="#7aff80")}static get styles(){return w`
    
    :host {
      
    }

    #container {  
      width: 100%;
    }

    #indicator { 
      width: 100%;
      overflow: hidden;
      animate: 0.5s;
      opacity: 0.7;
    }

    #indicator > div {
      width: 100%;
      height: 100%;
    }

    #linear-text {  
      padding: 10px 15px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      font-size: 75%;
      background: white;
    }

    .loader-container {
      width: 80px;
      height: 80px;
      position: relative;
      color: #5b5b5b;
    }

    .loader {
      width: 100%;
      height: 100%;
      border: 4px solid;
      background: white;
      border-right: none;
      border-top: none;
      border-left: none;
      z-index: 2000;
      background-color: transparent;
      border-radius: 100%;
      transform: rotateZ(0);
    }

    .loader-container > span{
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 80%;
      transform: translate(-50%, -50%);
      user-select: none;
    }

    .loader.active {
      opacity: 0.45;
      -webkit-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;
    }

    /* @-moz-keyframes spin {  . . . } */
    
    
    /* @-ms-keyframes spin {  . . . } */
    
    
    /* @-o-keyframes spin { . . . } */
    
    @-webkit-keyframes spin {
      from {
        transform: rotateZ(0deg) scale(1);
      }
      50% {
        transform: rotateZ(540deg) scale(0.9);
        filter: brightness(50%);        
      }
      to {
        transform: rotateZ(1080deg) scale(1);
      }
    }
    
    @keyframes spin {
      from {
        transform: rotateZ(0deg) scale(1);
      }
      50% {
        transform: rotateZ(540deg) scale(0.9);
        filter: brightness(50%);
      }
      to {
        transform: rotateZ(1080deg) scale(1);
      }
    }
    `}static get properties(){return{progress:{type:Number,reflect:!0},text:{type:String,reflect:!0},type:{type:String,reflect:!0},color:{type:String,reflect:!0},background:{type:String,reflect:!0},textBackground:{type:String,reflect:!0},textColor:{type:String,reflect:!0},size:{type:String,reflect:!0}}}willUpdate(e){}render(){let e=this.progress??0,t=this.text!=null?this.text:this.showPercent?`${(e*100).toFixed(1)}%`:"";switch(this.type){case"linear":return b`
            ${t?b`<div id="linear-text" style="background: ${this.textBackground}; color: ${this.textColor};">${t}</div>`:""}
            <div id="indicator" style="height:${this.size}; background:${this.background}; opacity:${e===1?1:""};">
                <div style="width:${e*100}%; background: ${this.color}"></div>
              </div>
            `;default:return b`
            <div class="loader-container" style="height:${this.size}; width:${this.size}; background: ${this.textBackground};">
              ${t?b`<span style="color: ${this.textColor};">${t}</span>`:""}
              <div class="loader active" style="border-color: ${this.color};"></div>
            </div>
            `}}}customElements.define("visualscript-loader",_t);let Ct={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Et=n=>(...e)=>({_$litDirective$:n,values:e});class Lt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}let _i=Et(class extends Lt{constructor(n){var e;if(super(n),n.type!==Ct.ATTRIBUTE||n.name!=="style"||((e=n.strings)===null||e===void 0?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((e,t)=>{let i=n[t];return i==null?e:e+`${t=t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(n,[e]){let{style:t}=n.element;if(this.ct===void 0){this.ct=new Set;for(let i in e)this.ct.add(i);return this.render(e)}this.ct.forEach(i=>{e[i]==null&&(this.ct.delete(i),i.includes("-")?t.removeProperty(i):t[i]="")});for(let i in e){let s=e[i];s!=null&&(this.ct.add(i),i.includes("-")?t.setProperty(i,s):t[i]=s)}return W}});class Ne extends F{constructor(e={}){super(),this.primary=e.primary,this.backgroundColor=e.backgroundColor,this.size=e.size,this.onClick=e.onClick}static get styles(){return w`

    .storybook-button {
      
      font-weight: 700;
      border: 0;
      border-radius: 1em;
      cursor: pointer;
      display: inline-block;
      line-height: 1;
    }
    .storybook-button--primary {
      color: white;
      background-color: #1ea7fd;
    }
    .storybook-button--secondary {
      color: #333;
      background-color: transparent;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
    }
    .storybook-button--extra-small {
      font-size: 10px;
      padding: 7px 12px;
    }

    .storybook-button--small {
      font-size: 12px;
      padding: 10px 16px;
    }
    .storybook-button--medium {
      font-size: 14px;
      padding: 11px 20px;
    }
    .storybook-button--large {
      font-size: 16px;
      padding: 12px 24px;
    }


    @media (prefers-color-scheme: dark) {
      .storybook-button--secondary {
        color: #cccccc;
        background-color: transparent;
        box-shadow: rgba(255, 255, 255, 0.50) 0px 0px 0px 1px inset;
      }
    }

    `}static get properties(){return{primary:{type:Boolean,reflect:!0},backgroundColor:{type:String,reflect:!0},size:{type:String,reflect:!0},onClick:{type:Function,reflect:!0}}}willUpdate(e){}render(){let e=this.primary?"storybook-button--primary":"storybook-button--secondary";return b`
      <button
           type="button"
            class=${["storybook-button",`storybook-button--${this.size||"medium"}`,e].join(" ")}
            style=${_i({backgroundColor:this.backgroundColor})}
            @click=${this.onClick}
      >
        <slot>Button</slot>
      </button>
    `}}customElements.define("visualscript-button",Ne);class Ft extends F{constructor(e={}){super(),this.toggle=()=>this.open=!this.open,this.open=e.open,this.header=e.header,this.footer=e.footer}static get styles(){return w`
/* Modal Header */

  :host {
    
    z-index: 101;
  }
  
  :host * {
    box-sizing: border-box;
    
  }

.modal-header {
  padding: 12px 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
}

.modal-header span {
  font-weight: 800;
  font-size: 120%;
}


/* Modal Body */
.modal-body {
  padding: 16px;
  overflow: scroll;
  width: 100%;
  flex-grow: 1;
}

/* Modal Footer */
.modal-footer {
  border-top: 1px solid #e3e3e3;
  padding: 12px 16px;
  width: 100%;
}

.modal-footer span {
  font-size: 80%;
}

/* Modal Content */
.modal-content {
  
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);

  background-color: #fefefe;
  margin: auto;
  border-radius: 4px;
  padding: 0;
  width: 80vw;
  height: 80vh;
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
  transition: opacity 0.5s;
  display: flex; 
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  pointer-events: none;
  z-index: 102;
  opacity: 0;
}

.modal-content.open {
  opacity: 1;
  pointer-events: all;
}

    `}static get properties(){return{open:{type:Boolean,reflect:!0},header:{type:Object,reflect:!0},footer:{type:String,reflect:!0}}}willUpdate(e){}render(){return b`
      <div class="modal-content ${this.open?"open":""}">
        ${this.header?b`<div class="modal-header">
          <span>${this.header}</span>
          <visualscript-button secondary size="extra-small" @click="${this.toggle}">Close</visualscript-button>
        </div>`:""}
        <div class="modal-body">
          <slot>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fringilla dolor vitae hendrerit feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ultricies arcu nec nibh commodo aliquam at in felis. Mauris lorem dui, porttitor et lectus vel, ornare sodales risus. Sed eu rhoncus ex. Donec tristique nibh lacus, sed dictum lacus lacinia eu. Nunc imperdiet a ante et feugiat. Praesent euismod tortor lacus, et euismod turpis mollis vitae. Etiam sagittis vehicula pulvinar. Aliquam id tincidunt tortor, sed feugiat nulla. Donec sollicitudin tincidunt viverra. Nunc condimentum molestie massa a feugiat. Nam mattis bibendum sodales. Nulla at maximus arcu, quis tempus lacus.

Vestibulum pharetra pretium neque eu faucibus. Morbi aliquam urna non lacinia congue. Donec sed odio interdum, imperdiet tellus in, porttitor erat. Mauris erat velit, facilisis ut luctus sit amet, laoreet vitae ligula. Morbi a mi ultrices, feugiat ante in, convallis enim. Etiam sollicitudin leo purus, ut commodo ex placerat et. Proin ut nulla non risus luctus eleifend eu id orci.

Ut aliquam tristique massa. Nullam a ipsum tincidunt, malesuada ipsum non, suscipit lectus. Suspendisse sit amet risus ut lectus efficitur feugiat in ut urna. Suspendisse odio felis, efficitur eu molestie eu, malesuada nec nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque fermentum sit amet odio id convallis. Donec luctus risus ac pretium ultrices. Quisque congue velit sed hendrerit posuere. Integer dictum felis eu tortor mattis scelerisque. Fusce facilisis justo nec velit vehicula gravida sit amet at erat. Suspendisse sit amet nibh metus. Aenean euismod, tortor a venenatis laoreet, sapien arcu semper turpis, non molestie risus ligula nec velit.

Nulla eget ultrices justo, non posuere dui. Praesent ultrices dui eget erat accumsan varius. Ut ut mi arcu. Integer porttitor, neque vitae fermentum dictum, tellus quam tincidunt mauris, eget tristique turpis mauris nec magna. Phasellus ut tortor eros. Ut vehicula non purus in efficitur. Quisque justo elit, varius id luctus et, pulvinar eget ipsum. Sed tristique et odio eu facilisis.

Phasellus sodales eros at erat elementum, a semper ligula facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi at maximus nunc. In porttitor rutrum rhoncus. Ut dignissim viverra erat in aliquet. Suspendisse potenti. Donec lorem sem, vulputate non diam a, facilisis luctus tortor. In pellentesque ut eros id vulputate. Proin rutrum tincidunt libero, vel dictum libero ullamcorper in. Nam nec ultricies tortor, sit amet pellentesque ante. Sed tellus purus, pharetra vitae purus quis, accumsan vestibulum tellus. Vivamus porttitor urna a odio tincidunt tristique. Integer ut metus finibus, ultricies magna sed, congue eros. Duis velit velit, consectetur at faucibus ac, scelerisque nec diam.
</slot>
        </div>
        ${this.footer?b`<div class="modal-footer">
          <span>${this.footer}</span>
        </div>`:""}
      </div>
      <visualscript-overlay .open=${this.open}></visualscript-overlay>
    `}}customElements.define("visualscript-modal",Ft);class Pt extends F{static get styles(){return w`

    :host {
      padding: 25px;
      border-top: 1px solid rgb(180,180,180);
      background: white;
      color: black;
      display:flex;
      align-items: center;
      width: 100%;
      font-size: 70%;
      box-sizing: border-box;
      z-index: 100;
      grid-area: foot;
    }

    :host * {
      box-sizing: border-box;
    }

    @media (prefers-color-scheme: dark) {
      :host {
        background: #060606;
        color: white;
      }

      a {
        color: white;
      }
    }
    `}static get properties(){return{}}constructor(e={}){super()}render(){return b`

      <slot></slot>
    `}}customElements.define("visualscript-footer",Pt);class Tt extends F{constructor(e={}){super(),this.open=!1,this.open=e.open??!1}static get styles(){return w`

    div {
      opacity: 0;
      width: 100vw;
      height: 100vh;
      transition: 0.5s;
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 50;
      color: black;
      background: rgb(255,255, 255, 0.7);
    }
    

    div[open] {
      opacity: 1;
      pointer-events: all;
      backdrop-filter: blur(3px);
    }

    @media (prefers-color-scheme: dark) {
      div {
        color: white;
        background: rgb(0,0,0, 0.5);
      }
    }

    `}static get properties(){return{open:{type:Boolean,reflect:!0}}}render(){return b`
      <div ?open=${!!this.open}>
        <slot></slot>
      </div>
    `}}customElements.define("visualscript-overlay",Tt);var He;((He=window.HTMLSlotElement)===null||He===void 0?void 0:He.prototype.assignedElements)!=null;console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");let Ci=Et(class extends Lt{constructor(n){var e;if(super(n),n.type!==Ct.ATTRIBUTE||n.name!=="class"||((e=n.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(e=>n[e]).join(" ")+" "}update(n,[e]){var t,i;if(this.et===void 0){this.et=new Set,n.strings!==void 0&&(this.st=new Set(n.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in e)e[r]&&!(!((t=this.st)===null||t===void 0)&&t.has(r))&&this.et.add(r);return this.render(e)}let s=n.element.classList;this.et.forEach(r=>{r in e||(s.remove(r),this.et.delete(r))});for(let r in e){let a=!!e[r];a===this.et.has(r)||((i=this.st)===null||i===void 0?void 0:i.has(r))||(a?(s.add(r),this.et.add(r)):(s.remove(r),this.et.delete(r)))}return W}}),Ae={label:{type:String,reflect:!0},persist:{type:Boolean,reflect:!0},value:{type:String,reflect:!0},onChange:{type:Function,reflect:!0}},Se=n=>{n.persist&&n.label&&localStorage.setItem(n.label,String(n.value))},ke=n=>{if(n.value)return n.value;if(n.persist&&n.label){let e=localStorage.getItem(n.label);return e==="null"?null:e==="undefined"?void 0:e}};class Ye extends F{constructor(e={}){super(),this.value=e.value??"",this.outline=e.outline??!1,this.disabled=e.disabled??!1,this.label=e.label,this.persist=e.persist;let t=ke(e);t&&(this.value=t)}static get properties(){return Object.assign(Ae,{disabled:{type:Boolean,reflect:!0},outline:{type:Boolean,reflect:!0}})}willUpdate(e){e.has("value")&&Se(this)}static get styles(){return w`

        :host {
            width: 100%;
        }
*{
box-sizing: border-box;
}
.form-group {
position: relative;
margin: 1rem 0;
}
input.outline {
border: 1px solid  #333333;
border-radius: 5px;
}
label {
position: absolute;
font-size: 1rem;
left: 0;
top: 50%;
transform: translateY(-50%);
color: gray;
padding: 0 0.3rem;
margin: 0 0.5rem;
transition: 0.1s ease-out;
transform-origin: left top;
pointer-events: none;
}
input {
font-size: 1rem;
outline: none;
border: none;
border-radius: 0px;
padding: 1rem 0.6rem;
transition: 0.1s ease-out;
border-bottom: 1px solid  #333333;
background: transparent;
cursor: text;
margin-left: auto;
width: 95%;
margin-right: auto;
}
input::placeholder {
    color: transparent;
}
input:focus{
border-color:  #b949d5;
}
input:focus + label{
color:  #b949d5;
top: 0;
transform: translateY(-50%) scale(0.9);
}
input:not(:placeholder-shown) + label{
top: 0;
transform: translateY(-50%) scale(0.9);
}
input:focus:not(.outline) ~ label,
input:not(:placeholder-shown):not(.outline) ~ label
{
padding-left: 0px;
}
input:disabled,  input:disabled ~ .label {
opacity: 0.5;
}

@media (prefers-color-scheme: dark) {
    label {
      color: rgb(120,120,120);
    }
  }
`}render(){return b`
            <div class="form-group">
                <input
                class=${Ci({outline:this.outline})}
                type="${this.type}"
                placeholder="${this.label}"
                .value=${this.value!="null"&&this.value!="undefined"?this.value:""}
                ?disabled="${this.disabled}"

                @change=${e=>{this.value=e.target.value}}
                />
                <label>${this.label}</label>
            </div>
        `}}customElements.define("visualscript-input",Ye);class zt extends F{constructor(e={}){super(),this.getModal=()=>this.shadowRoot.querySelector("visualscript-modal"),e.items&&(this.items=e.items),window.onkeydown=t=>{switch(t.code){case"Enter":this.modal.open=!1;break;case"ArrowUp":console.log("Up!");break;case"ArrowDown":console.log("Down!");break;case"Escape":this.modal.open=!1;break}}}static get styles(){return w`

    :host {
      display: flex;
      align-items: center;
      padding: 10px;
    }

    :host * {
      
      box-sizing: border-box;
      
    }

    button {
      padding: 5px;
      border-radius: 5px;
    }

    `}static get properties(){return{placeholder:{type:String},items:{type:Object},value:{type:String,reflect:!0}}}render(){let e=new RegExp(this.value,"i");return b`
        <visualscript-button @click=${()=>{this.modal=this.getModal(),this.modal.toggle()}}>Search</visualscript-button>
        <visualscript-modal 
          .header=${b`<visualscript-input label="Search" @input=${t=>{this.value=t.composedPath()[0].value}}></visualscript-input>`}
          .footer=${b`<div id=commands>Enter to select. Up and Down Arrows to navigate. Esc to close.</div>`}
        >
        <div>${this.items.map(t=>{let i=!1;if(this.value?(t.tags&&t.tags.forEach(s=>{s.match(e)&&(i=!0)}),t.name.match(e)&&(i=!0)):i=!0,i)return b`<div><h3>${t.name}</h3><small>${t.tags??"No Tags"}</small></div>`})}</div>
        </visualscript-modal>
      `}}customElements.define("visualscript-search",zt);class qe extends F{constructor(e={}){super(),this.persist=!1,this.optionChecked="",this.optionHoveredIndex=-1,this.options=[],this.onChange=()=>{},this.add=i=>{this.options=[...this.options,i]},this.openSelectCustom=()=>{if(this.elements.elSelectCustom.classList.add("isActive"),this.elements.elSelectCustom.setAttribute("aria-hidden","false"),this.optionChecked){let i=this.elements.customOptsList.findIndex(s=>s.getAttribute("data-value")===this.optionChecked);this.updateCustomSelectHovered(i)}document.addEventListener("keydown",this.supportKeyboardNavigation)},this.closeSelectCustom=()=>{this.elements.elSelectCustom.classList.remove("isActive"),this.elements.elSelectCustom.setAttribute("aria-hidden","true"),this.updateCustomSelectHovered(-1),document.removeEventListener("keydown",this.supportKeyboardNavigation)},this.updateCustomSelectHovered=i=>{let s=this.elements.elSelectCustomOpts.children[this.optionHoveredIndex],r=this.elements.elSelectCustomOpts.children[i];s&&s.classList.remove("isHover"),r&&r.classList.add("isHover"),this.optionHoveredIndex=i},this.updateCustomSelectChecked=(i,s)=>{if(this.elements){s||(s=this.elements.elSelectCustomOpts.querySelectorAll(`[data-value="${i}"]`)[0]?.textContent);let r=this.optionChecked,a=this.elements.elSelectCustomOpts.querySelector(`[data-value="${r}"`),o=this.elements.elSelectCustomOpts.querySelector(`[data-value="${i}"`);a&&a.classList.remove("isActive"),o&&o.classList.add("isActive");let d=this.elements.elSelectCustom.children[0].children[0];d.textContent=s,this.optionChecked=i}},this.watchClickOutside=i=>{!this.contains(i.target)&&this.closeSelectCustom()},this.supportKeyboardNavigation=i=>{if(i.keyCode===40&&this.optionHoveredIndex<this.optionsCount-1&&(this.optionHoveredIndex,i.preventDefault(),this.updateCustomSelectHovered(this.optionHoveredIndex+1)),i.keyCode===38&&this.optionHoveredIndex>0&&(i.preventDefault(),this.updateCustomSelectHovered(this.optionHoveredIndex-1)),i.keyCode===13||i.keyCode===32){i.preventDefault();let s=this.elements.elSelectCustomOpts.children[this.optionHoveredIndex],r=s&&s.getAttribute("data-value");r&&(this.elements.elSelectNative.value=r,this.updateCustomSelectChecked(r,s.textContent)),this.closeSelectCustom()}i.keyCode===27&&this.closeSelectCustom()},this.options=e.options??[],e.onChange&&(this.onChange=e.onChange),e.label&&(this.label=e.label),e.persist&&(this.persist=e.persist);let t=ke(e);t&&(this.value=t)}static get styles(){return w`

    #container { 
      position: relative;
    }

    :host * {
      box-sizing: border-box;
    }

    .selectNative, .selectCustom {
      position: relative;
      width: 100%;
      height: 50px;
      font-size: 15px;
    }

    
    .selectCustom {
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      background: white;
    }
    
    .selectNative:focus,
    .selectCustom.isActive .selectCustom-trigger {
      outline: none;
      box-shadow: white 0 0 5px 2px;
    }
    

    .select {
      position: relative;
    }
    
    .selectLabel {
      display: block;
      font-weight: bold;
      margin-bottom: 0.4rem;
    }
    
    .selectNative, .selectCustom-trigger {
      border: 1px solid #6f6f6f;
      border-radius: 0.4rem;
    }
    
    .selectNative {
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
      background-repeat: no-repeat;
      background-position-x: 100%;
      background-position-y: 0.8rem;
      padding: 0rem 0.8rem;
    }
    
    .selectCustom-trigger  > div {
      overflow: scroll;
      white-space: nowrap;
    }

    .selectCustom-trigger {
      display: flex;
      align-items: center;
      position: relative;
      padding: 0rem 0.8rem;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    
    .selectCustom-trigger::after {
      content: "▾";
      position: absolute;
      top: 0;
      line-height: 3.2rem;
      right: 0.5rem;
    }
    
    .selectCustom-trigger:hover {
      border-color: #028ee6;
    }
    
    .selectCustom-options {
      position: absolute;
      top: calc(2.8rem + 0.8rem);
      left: 0;
      width: 100%;
      border: 1px solid #6f6f6f;
      border-radius: 0.4rem;
      background-color: whitesmoke;
      box-shadow: 0 0 4px #e9e1f8;
      z-index: 1;
      padding: 0.8rem 0;
      display: none;
    }
    
    .selectCustom.isActive .selectCustom-options {
      display: block;
    }
    
    .selectCustom-option {
      position: relative;
      padding: 0.8rem;
      padding-left: 2.5rem;
      font-size: 80%;
    }

    .selectCustom-option.isHover,
    .selectCustom-option:hover {
      background-color: #1ea7fd; // contrast AA
      color: white;
      cursor: default;
    }
    
    .selectCustom-option:not(:last-of-type)::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-bottom: 1px solid #d3d3d3;
    }
    
    .selectCustom-option.isActive::before {
      content: "✓";
      position: absolute;
      left: 0.8rem;
    }


    /* This makes the Custom Select work... 
      Issues: Doesn't work inside of another component (e.g. Control), it clicks on that instead
    @media (hover: hover) {
      
      .selectCustom {
        display: block;
      }
    
      .selectNative:focus + .selectCustom {
        display: none;
      }
    }
    */

    @media (prefers-color-scheme: dark) {
      .selectCustom {
        background: rgb(59, 59, 59);
      }

      .selectCustom-options {
        background: rgb(45, 45, 45);
      }
    }
    `}static get properties(){return Object.assign({options:{type:Array,reflect:!0}},Ae)}willUpdate(e){if(e.has("value")&&Se(this),e.has("options")){let t=this.options[0]?.value??this.options[0];this.value=this.value??t}}updated(e){let t=this.shadowRoot.querySelectorAll(".js-selectNative")[0],i=this.shadowRoot.querySelectorAll(".js-selectCustom")[0],s=i.children[1],r=Array.from(s.children);this.optionsCount=r.length,this.elements={elSelectNative:t,elSelectCustom:i,elSelectCustomOpts:s,customOptsList:r},this.value&&this.updateCustomSelectChecked(this.value)}render(){return b`
      <div id=container>
      <select class="selectNative js-selectNative" aria-labelledby="${this.label}Label" 
      @change=${e=>{let t=e.target.value,i=this.elements.elSelectCustomOpts.querySelectorAll(`[data-value="${t}"]`)[0];this.updateCustomSelectChecked(t,i.textContent),this.value=e.target.value,this.onChange(e)}}>
      ${this.options.length===0?b`<slot></slot>`:this.options.map((e,t)=>(typeof e!="object"&&(e={value:e,text:e}),b`<option 
          value=${e.value} 
          ?selected=${e.value===this.value} 
          >
            ${e.text}
          </option>`))}
    </select>

    <div class="selectCustom js-selectCustom" aria-hidden="true"}>
      <div class="selectCustom-trigger" @click=${e=>{!e.target.parentNode.classList.contains("isActive")?this.openSelectCustom():this.closeSelectCustom()}}>
        <div></div>
      </div>
        <div class="selectCustom-options">
        ${this.options.map((e,t)=>(typeof e!="object"&&(e={value:e,text:e}),b` <div 
          class="selectCustom-option" 
          data-value=${e.value}
          @mouseenter=${i=>{this.updateCustomSelectHovered(t)}}
          @click=${i=>{let s=i.target.getAttribute("data-value");this.elements.elSelectNative.value=s,this.updateCustomSelectChecked(s,i.target.textContent),this.closeSelectCustom()}}
          >
            ${e.text}
          </div>`))}
          </div>
        </div>
      </div>
    </div>
    `}}customElements.define("visualscript-select",qe);class Ge extends F{constructor(e={}){super(),this.onChange=()=>{},e.accept&&(this.accept=e.accept),e.onChange&&(this.onChange=e.onChange)}static get styles(){return w`

    :host {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    
    input[type=file] {
      display: none;
    }

    :host * {
      box-sizing: border-box;
    }
    
    button {
      flex: auto;
      padding: 8px 12px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border: none;  
      color: #ffffff;
      background-color: #1ea7fd;
      width: 100%;
      cursor: pointer;    
      /* white-space: nowrap; */
      font-weight: bold;
    }

    .hide {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
      border: 0;
    }

    input[type=text] {
      flex-grow: 1;
      padding: 8px 8px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border: none;
    }

    input[type=text] {
      flex-grow: 1;
      padding: 8px 8px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border: none;
      color: black;
      background-color: white;
    }

    @media (prefers-color-scheme: dark) {
      input[type=text] {
        color: white;
        background-color: rgb(59, 59, 59);
      }
    }
    
    `}static get properties(){return{accept:{type:String,reflect:!0},onChange:{type:Function,reflect:!0}}}render(){return b`
      <label for="fileupload" id="buttonlabel">
        <button aria-controls="filename" tabindex="0" @click=${()=>{let e=this.shadowRoot.querySelector("input[type=file]");e&&e.click()}}>Choose File</button>
      </label>
      <input type="file" id="fileupload" accept="${this.accept??""}" @change=${e=>{let t=e.target.files[0],i=this.shadowRoot.querySelector("input[type=text]");var s=t.name;i.value=s,i.placeholder=s,i.focus(),this.onChange(e)}}>
      <label for="filename" class="hide">
        uploaded file
      </label>
      <input type="text" id="filename" autocomplete="off" readonly placeholder="no file chosen">  
    `}}customElements.define("visualscript-file",Ge);class Xe extends F{constructor(e={}){super(),this.persist=!1,this.onChange=()=>{},e.onChange&&(this.onChange=e.onChange),e.label&&(this.label=e.label),e.persist&&(this.persist=e.persist);let t=ke(e);t&&(this.value=t)}static get styles(){return w`

    :host * {
      box-sizing: border-box;
    }

    [role="switch"] {  
      position: relative;
      border-radius: 0.5rem;
      padding: 1em 2em;
      cursor: pointer;
      background-color: white;
      border: none;
      border-radius: 14px;
      -webkit-transition: .4s;
      transition: .4s;
    }

    [role="switch"] * {
      pointer-events: none;
    }


    [role="switch"][aria-pressed="true"] {
      background-color: #1ea7fd;
    }

    [role="switch"][aria-pressed="true"] > .slider{
      -webkit-transform: translateY(-50%) translateX(100%);
      -ms-transform: translateY(-50%) translateX(100%);
      transform: translateY(-50%) translateX(100%);
    }

    /* Remove the default outline and 
    add the outset shadow */  
    [aria-pressed]:focus {
      outline: none;
      box-shadow: white 0 0 5px 2px;
    }

    /* The slider */
    .slider {
      padding: 3px;
      position: absolute;
      cursor: pointer;
      top: 50%;
      left: 0;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      -webkit-transition: .4s;
      transition: .4s;
      height: 100%;
      aspect-ratio: 1/1;
    }
    .slider > * {
      background-color: #ccc;
      width: 100%;
      height: 100%;
    }

    /* Rounded sliders */
    .slider.round > * {
      border-radius: 34px;
    }

    `}static get properties(){return Ae}willUpdate(e){e.has("value")&&Se(this)}render(){return b`
      <button class="switch" role="switch" aria-pressed="${String(this.value)}" aria-labelledby=${this.label} @click=${e=>{let t=e.target.getAttribute("aria-pressed")==="true";this.value=!t,e.target.setAttribute("aria-pressed",String(this.value)),this.onChange(e)}}>
        <div class="slider round"><div></div></div>
    </button>
    `}}customElements.define("visualscript-switch",Xe);class We extends F{constructor(e={}){super(),this.persist=!1,this.value=0,this.min=0,this.max=100,this.onChange=()=>{},this.onInput=()=>{},e.onChange&&(this.onChange=e.onChange),e.label&&(this.label=e.label),e.persist&&(this.persist=e.persist),e.min&&(this.min=e.min),e.max&&(this.max=e.max);let t=ke(e);t&&(this.value=t)}static get styles(){return w`

    :host {
      width: 100%;
      height: 100%;
    }

    :host * {
      box-sizing: border-box;
    }

    .wrapper {
      position: relative;
      width: 100%;
      height: 100%;
    }

    input[type="range"] {
      -webkit-appearance: none;
      position: relative;
      overflow: hidden;
      height: 30%;
      width: 100%;
      cursor: pointer;
      border: none;
      margin: 0;
  }
  
  output {
      position: absolute; 
      user-select: none; 
      pointer-events: none; 
      z-index: 1;
      top: 50%;
      left: 10px;
      transform: translate(0%, calc(-50% - 0.12rem));
      font-size: 80%;
  }
  
  input[type="range"]::-webkit-slider-runnable-track {
  }
  
  input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 0; /* 1 */
      height: 20px;
      box-shadow: -100vw 0 0 100vw #1ea7fd;
      opacity: 0.9;
      transition: opacity 0.5s;
  }
  
  input[type="range"]:hover::-webkit-slider-thumb{
      opacity: 1;
  }
  
  input[type="range"]::-moz-range-track {

  }
  
    .visually-hidden { 
        position: absolute !important;
        height: 1px; 
        width: 1px;
        overflow: hidden;
        clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap; /* added line */
    }

    `}static get properties(){return Object.assign(Ae,{min:{type:Number,reflect:!0},max:{type:Number,reflect:!0}})}willUpdate(e){e.has("value")&&Se(this)}render(){return b`
      <div class="wrapper">
        <input type="range" min="${this.min}" max="${this.max}" id="${this.label}" @change=${e=>{this.value=e.target.value,this.onChange(e)}} @input=${e=>{this.onInput(e)}}/>
        <output for="${this.label}">${this.value}</output>
        <label class="visually-hidden" for="${this.label}">${this.label}</label>
      </div>
    `}}customElements.define("visualscript-range",We);class Mt extends F{constructor(e={target:{},header:"Object"}){super(),this.history=[],this.getActions=(t,i)=>{let s;return typeof i[t]=="object"&&(s=b`<visualscript-button primary=true size="small" @click="${()=>{this.history.push({parent:i,key:this.header}),this.target=i[t],this.header=t,this.mode=Array.isArray(i[t])?"plot":"view"}}">${Array.isArray(i[t])?b`Plot`:b`View`}</visualscript-button>`),b`
      <div class="actions">
            ${s}
      </div>
      `},this.getElement=(t,i)=>b`
        <div class="attribute separate">
        <div>
          <span class="name">${t}</span><br>
          <span class="value">${typeof i[t]=="object"?Object.keys(i[t]).length?i[t].constructor.name:b`Empty ${i[t].constructor.name}`:i[t]}</span>
        </div>
          ${this.getActions(t,i)}
        </div>`,this.target=e.target??{},this.header=e.header??"Object",this.mode=e.mode??"view"}static get styles(){return w`

    
    :host {
      
    }
    :host * {
      box-sizing: border-box;
      
    }

    :host > * {
      background: white;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
    }

    .main {
      
    }

    .header {
      padding: 10px 20px;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      font-size: 70%;
      border-bottom: 1px solid #e3e3e3;
    }

    .header span {
      font-weight: 800;
      font-size: 120%;
    }

    .container {
      background: white;
      width: 100%;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }

    .separate {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .attribute {
      width: 100%;
      font-size: 90%;
      padding: 15px;
      flex-grow: 1;
      flex-wrap: wrap;
    }

    .name {
      font-weight: 800;
      padding-right: 10px;
    }

    .value {
      font-size: 80%;
    }

    `}static get properties(){return{target:{type:Object,reflect:!0},header:{type:String,reflect:!0},mode:{type:String,reflect:!0}}}willUpdate(e){e.has("target")}render(){return b`
      <div>
        <div class="header separate">
          <span>${this.header}</span>
          ${this.history.length>0?b`<visualscript-button size="extra-small" @click="${()=>{let e=this.history.pop();this.header=e.key,this.target=e.parent}}">Go Back</visualscript-button>`:""}
        </div>
        <div class="container">
              ${this.mode==="view"?Object.keys(this.target)?.map(e=>this.getElement(e,this.target)):Object.keys(this.target)?.map(e=>this.getElement(e,this.target))}
        </div>
      </div>
    `}}customElements.define("visualscript-object-editor",Mt);var Ot=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Rt={exports:{}};(function(n){var e=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};var t=function(i){var s=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,r=0,a={},o={manual:i.Prism&&i.Prism.manual,disableWorkerMessageHandler:i.Prism&&i.Prism.disableWorkerMessageHandler,util:{encode:function c(l){return l instanceof d?new d(l.type,c(l.content),l.alias):Array.isArray(l)?l.map(c):l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(c){return Object.prototype.toString.call(c).slice(8,-1)},objId:function(c){return c.__id||Object.defineProperty(c,"__id",{value:++r}),c.__id},clone:function c(l,p){p=p||{};var g,m;switch(o.util.type(l)){case"Object":if(m=o.util.objId(l),p[m])return p[m];g={},p[m]=g;for(var A in l)l.hasOwnProperty(A)&&(g[A]=c(l[A],p));return g;case"Array":return m=o.util.objId(l),p[m]?p[m]:(g=[],p[m]=g,l.forEach(function(E,S){g[S]=c(E,p)}),g);default:return l}},getLanguage:function(c){for(;c;){var l=s.exec(c.className);if(l)return l[1].toLowerCase();c=c.parentElement}return"none"},setLanguage:function(c,l){c.className=c.className.replace(RegExp(s,"gi"),""),c.classList.add("language-"+l)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document&&1<2)return document.currentScript;try{throw new Error}catch(g){var c=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(g.stack)||[])[1];if(c){var l=document.getElementsByTagName("script");for(var p in l)if(l[p].src==c)return l[p]}return null}},isActive:function(c,l,p){for(var g="no-"+l;c;){var m=c.classList;if(m.contains(l))return!0;if(m.contains(g))return!1;c=c.parentElement}return!!p}},languages:{plain:a,plaintext:a,text:a,txt:a,extend:function(c,l){var p=o.util.clone(o.languages[c]);for(var g in l)p[g]=l[g];return p},insertBefore:function(c,l,p,g){g=g||o.languages;var m=g[c],A={};for(var E in m)if(m.hasOwnProperty(E)){if(E==l)for(var S in p)p.hasOwnProperty(S)&&(A[S]=p[S]);p.hasOwnProperty(E)||(A[E]=m[E])}var I=g[c];return g[c]=A,o.languages.DFS(o.languages,function(B,V){V===I&&B!=c&&(this[B]=A)}),A},DFS:function c(l,p,g,m){m=m||{};var A=o.util.objId;for(var E in l)if(l.hasOwnProperty(E)){p.call(l,E,l[E],g||E);var S=l[E],I=o.util.type(S);I==="Object"&&!m[A(S)]?(m[A(S)]=!0,c(S,p,null,m)):I==="Array"&&!m[A(S)]&&(m[A(S)]=!0,c(S,p,E,m))}}},plugins:{},highlightAll:function(c,l){o.highlightAllUnder(document,c,l)},highlightAllUnder:function(c,l,p){var g={callback:p,container:c,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};o.hooks.run("before-highlightall",g),g.elements=Array.prototype.slice.apply(g.container.querySelectorAll(g.selector)),o.hooks.run("before-all-elements-highlight",g);for(var m=0,A;A=g.elements[m++];)o.highlightElement(A,l===!0,g.callback)},highlightElement:function(c,l,p){var g=o.util.getLanguage(c),m=o.languages[g];o.util.setLanguage(c,g);var A=c.parentElement;A&&A.nodeName.toLowerCase()==="pre"&&o.util.setLanguage(A,g);var E=c.textContent,S={element:c,language:g,grammar:m,code:E};function I(V){S.highlightedCode=V,o.hooks.run("before-insert",S),S.element.innerHTML=S.highlightedCode,o.hooks.run("after-highlight",S),o.hooks.run("complete",S),p&&p.call(S.element)}if(o.hooks.run("before-sanity-check",S),A=S.element.parentElement,A&&A.nodeName.toLowerCase()==="pre"&&!A.hasAttribute("tabindex")&&A.setAttribute("tabindex","0"),!S.code){o.hooks.run("complete",S),p&&p.call(S.element);return}if(o.hooks.run("before-highlight",S),!S.grammar){I(o.util.encode(S.code));return}if(l&&i.Worker){var B=new Worker(o.filename);B.onmessage=function(V){I(V.data)},B.postMessage(JSON.stringify({language:S.language,code:S.code,immediateClose:!0}))}else I(o.highlight(S.code,S.grammar,S.language))},highlight:function(c,l,p){var g={code:c,grammar:l,language:p};if(o.hooks.run("before-tokenize",g),!g.grammar)throw new Error('The language "'+g.language+'" has no grammar.');return g.tokens=o.tokenize(g.code,g.grammar),o.hooks.run("after-tokenize",g),d.stringify(o.util.encode(g.tokens),g.language)},tokenize:function(c,l){var p=l.rest;if(p){for(var g in p)l[g]=p[g];delete l.rest}var m=new v;return $(m,m.head,c),y(c,m,l,m.head,0),D(m)},hooks:{all:{},add:function(c,l){var p=o.hooks.all;p[c]=p[c]||[],p[c].push(l)},run:function(c,l){var p=o.hooks.all[c];if(!(!p||!p.length))for(var g=0,m;m=p[g++];)m(l)}},Token:d};i.Prism=o;function d(c,l,p,g){this.type=c,this.content=l,this.alias=p,this.length=(g||"").length|0}d.stringify=function c(l,p){if(typeof l=="string")return l;if(Array.isArray(l)){var g="";return l.forEach(function(I){g+=c(I,p)}),g}var m={type:l.type,content:c(l.content,p),tag:"span",classes:["token",l.type],attributes:{},language:p},A=l.alias;A&&(Array.isArray(A)?Array.prototype.push.apply(m.classes,A):m.classes.push(A)),o.hooks.run("wrap",m);var E="";for(var S in m.attributes)E+=" "+S+'="'+(m.attributes[S]||"").replace(/"/g,"&quot;")+'"';return"<"+m.tag+' class="'+m.classes.join(" ")+'"'+E+">"+m.content+"</"+m.tag+">"};function u(c,l,p,g){c.lastIndex=l;var m=c.exec(p);if(m&&g&&m[1]){var A=m[1].length;m.index+=A,m[0]=m[0].slice(A)}return m}function y(c,l,p,g,m,A){for(var E in p)if(!(!p.hasOwnProperty(E)||!p[E])){var S=p[E];S=Array.isArray(S)?S:[S];for(var I=0;I<S.length;++I){if(A&&A.cause==E+","+I)return;var B=S[I],V=B.inside,Vt=!!B.lookbehind,Zt=!!B.greedy,Li=B.alias;if(Zt&&!B.pattern.global){var Fi=B.pattern.toString().match(/[imsuy]*$/)[0];B.pattern=RegExp(B.pattern.source,Fi+"g")}for(var Jt=B.pattern||B,N=g.next,q=m;N!==l.tail&&!(A&&q>=A.reach);q+=N.value.length,N=N.next){var ne=N.value;if(l.length>c.length)return;if(!(ne instanceof d)){var Ce=1,Y;if(Zt){if(Y=u(Jt,q,c,Vt),!Y||Y.index>=c.length)break;var Ee=Y.index,Pi=Y.index+Y[0].length,Z=q;for(Z+=N.value.length;Ee>=Z;)N=N.next,Z+=N.value.length;if(Z-=N.value.length,q=Z,N.value instanceof d)continue;for(var me=N;me!==l.tail&&(Z<Pi||typeof me.value=="string");me=me.next)Ce++,Z+=me.value.length;Ce--,ne=c.slice(q,Z),Y.index-=q}else if(Y=u(Jt,0,ne,Vt),!Y)continue;var Ee=Y.index,Le=Y[0],Qe=ne.slice(0,Ee),Kt=ne.slice(Ee+Le.length),et=q+ne.length;A&&et>A.reach&&(A.reach=et);var Fe=N.prev;Qe&&(Fe=$(l,Fe,Qe),q+=Qe.length),T(l,Fe,Ce);var Ti=new d(E,V?o.tokenize(Le,V):Le,Li,Le);if(N=$(l,Fe,Ti),Kt&&$(l,N,Kt),Ce>1){var tt={cause:E+","+I,reach:et};y(c,l,p,N.prev,q,tt),A&&tt.reach>A.reach&&(A.reach=tt.reach)}}}}}}function v(){var c={value:null,prev:null,next:null},l={value:null,prev:c,next:null};c.next=l,this.head=c,this.tail=l,this.length=0}function $(c,l,p){var g=l.next,m={value:p,prev:l,next:g};return l.next=m,g.prev=m,c.length++,m}function T(c,l,p){for(var g=l.next,m=0;m<p&&g!==c.tail;m++)g=g.next;l.next=g,g.prev=l,c.length-=m}function D(c){for(var l=[],p=c.head.next;p!==c.tail;)l.push(p.value),p=p.next;return l}if(!i.document)return i.addEventListener&&(o.disableWorkerMessageHandler||i.addEventListener("message",function(c){var l=JSON.parse(c.data),p=l.language,g=l.code,m=l.immediateClose;i.postMessage(o.highlight(g,o.languages[p],p)),m&&i.close()},!1)),o;var C=o.util.currentScript();C&&(o.filename=C.src,C.hasAttribute("data-manual")&&(o.manual=!0));function P(){o.manual||o.highlightAll()}if(!o.manual){var O=document.readyState;O==="loading"||O==="interactive"&&C&&C.defer?document.addEventListener("DOMContentLoaded",P):window.requestAnimationFrame?window.requestAnimationFrame(P):window.setTimeout(P,16)}return o}(e);n.exports&&(n.exports=t),typeof Ot<"u"&&(Ot.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(i){i.type==="entity"&&(i.attributes.title=i.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(s,r){var a={};a["language-"+r]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[r]},a.cdata=/^<!\[CDATA\[|\]\]>$/i;var o={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:a}};o["language-"+r]={pattern:/[\s\S]+/,inside:t.languages[r]};var d={};d[s]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return s}),"i"),lookbehind:!0,greedy:!0,inside:o},t.languages.insertBefore("markup","cdata",d)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(i,s){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+i+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[s,"language-"+s],inside:t.languages[s]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,function(i){var s=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;i.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+s.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+s.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+s.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:s,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},i.languages.css.atrule.inside.rest=i.languages.css;var r=i.languages.markup;r&&(r.tag.addInlined("style","css"),r.tag.addAttribute("style","css"))}(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var i="Loading\u2026",s=function(C,P){return"\u2716 Error "+C+" while fetching file: "+P},r="\u2716 Error: File does not exist or is empty",a={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},o="data-src-status",d="loading",u="loaded",y="failed",v="pre[data-src]:not(["+o+'="'+u+'"]):not(['+o+'="'+d+'"])';function $(C,P,O){var c=new XMLHttpRequest;c.open("GET",C,!0),c.onreadystatechange=function(){c.readyState==4&&(c.status<400&&c.responseText?P(c.responseText):c.status>=400?O(s(c.status,c.statusText)):O(r))},c.send(null)}function T(C){var P=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(C||"");if(P){var O=Number(P[1]),c=P[2],l=P[3];return c?l?[O,Number(l)]:[O,void 0]:[O,O]}}t.hooks.add("before-highlightall",function(C){C.selector+=", "+v}),t.hooks.add("before-sanity-check",function(C){var P=C.element;if(P.matches(v)){C.code="",P.setAttribute(o,d);var O=P.appendChild(document.createElement("CODE"));O.textContent=i;var c=P.getAttribute("data-src"),l=C.language;if(l==="none"){var p=(/\.(\w+)$/.exec(c)||[,"none"])[1];l=a[p]||p}t.util.setLanguage(O,l),t.util.setLanguage(P,l);var g=t.plugins.autoloader;g&&g.loadLanguages(l),$(c,function(m){P.setAttribute(o,u);var A=T(P.getAttribute("data-range"));if(A){var E=m.split(/\r\n?|\n/g),S=A[0],I=A[1]==null?E.length:A[1];S<0&&(S+=E.length),S=Math.max(0,Math.min(S-1,E.length)),I<0&&(I+=E.length),I=Math.max(0,Math.min(I,E.length)),m=E.slice(S,I).join(`
`),P.hasAttribute("data-start")||P.setAttribute("data-start",String(S+1))}O.textContent=m,t.highlightElement(O)},function(m){P.setAttribute(o,y),O.textContent=m})}}),t.plugins.fileHighlight={highlight:function(P){for(var O=(P||document).querySelectorAll(v),c=0,l;l=O[c++];)t.highlightElement(l)}};var D=!1;t.fileHighlight=function(){D||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),D=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(Rt);var Ei=Rt.exports;class It extends F{constructor(e={instance:{},header:"Object"}){super(),this.history=[],this.getControls=()=>b`
      <div class="actions">
            ${["Save","Reset","Close"].map((i,s)=>b`<visualscript-button  size="small" @click="${()=>{console.log("Clicked",i,s)}}">${i}</visualscript-button>`)}
      </div>
      `,this.text=t=>{let i=this.shadowRoot.getElementById("highlight");if(i){let s=i.querySelector("code"),r=t.replace(new RegExp("&","g"),"&amp").replace(new RegExp("<","g"),"&lt;");s.innerHTML=r,Ei.highlightElement(s)}},this.scroll=t=>{let i=this.shadowRoot.getElementById("highlight");i&&(i.scrollTop=t.scrollTop,i.scrollTop<t.scrollTop&&(t.scrollTop=i.scrollTop),i.scrollLeft=t.scrollLeft)},this.instance=e.instance??{},this.header=e.header??"Object",this.mode=e.mode??"view"}static get styles(){return w`

    
    :host {
      
      width: 100%; 
      height: 100%; 
      z-index: 100000; 
      overflow: scroll;
    }

    :host * {
      box-sizing: border-box;
      
    }

    :host > * {
      background: white;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
    }

    h3 {
      margin: 0;
    }

    #controls {
      display: flex; 
      align-items: center; 
      justify-content: space-between; 
      padding: 10px 25px;
      z-index: 2;
    }

  button {
      margin: 0px;
      border-radius: 0px;
      border: 1px solid rgb(35,35,35);
      padding: 0px 15px;
      font-size: 60%;
  }
  
  textarea {
      border: none;
  }
  
  #editor {
      // color: transparent;
      background: transparent;
      opacity: 0.5;
      caret-color: black;
      z-index: 1;
  }
  
  
  #highlight {
      // background-color: rgba(0,0,0,0.8) !important; 
      z-index: -1 !important;
      white-space: pre !important;
      position:absolute !important;
      top: 0 !important;
      left: 0 !important;
  }
  
  #editor, #highlight {
    margin: 0px !important;
    width: 100% !important;
    height: 100% !important;
    overflow: auto !important;
    white-space: nowrap !important;
    padding: 25px !important;
    resize: none !important;
    -moz-tab-size : 4 !important;
      -o-tab-size : 4 !important;
         tab-size : 4 !important;
  }
  
  #editor, #highlight, #highlight code {
      font-size: 12px !important;
      font-family: monospace !important;
      line-height: 20pt !important;
      box-sizing: border-box !important;
  }
  

    `}static get properties(){return{instance:{type:Object,reflect:!0},header:{type:String,reflect:!0},mode:{type:String,reflect:!0}}}willUpdate(e){e.has("instance")}render(){let e="javascript";return b`
      <div id="controls">
        <h3>${e[0].toUpperCase()+e.slice(1)} Editor</h3>
        ${this.getControls()}
      </div>
      <div id='editorContainer' style="position: relative; width: 100%; height: 100%;">
        <textarea 
        id='editor' 
        spellcheck="false" 
        placeholder='Write your ${e} code...'
        @input="${t=>{console.error("input detected"),this.text(t.target.value),this.scroll(t.target)}}"
      
      ></textarea>
        <pre id="highlight" aria-hidden="true">
            <code class="language-${e}"></code>
        </pre>
    </div>
    `}}customElements.define("visualscript-code-editor",It);class Dt extends F{constructor(e={graph:{},header:"Object"}){super(),this.history=[],this.getActions=(t,i)=>{let s;return typeof i[t]=="object"&&(s=b`<visualscript-button primary=true size="small" @click="${()=>{this.history.push({parent:i,key:this.header}),this.graph=i[t],this.header=t,this.mode=Array.isArray(i[t])?"plot":"view"}}">${Array.isArray(i[t])?b`Plot`:b`View`}</visualscript-button>`),b`
      <div class="actions">
            ${s}
      </div>
      `},this.getElement=(t,i)=>b`
        <div class="attribute separate">
        <div>
          <span class="name">${t}</span><br>
          <span class="value">${typeof i[t]=="object"?Object.keys(i[t]).length?i[t].constructor.name:b`Empty ${i[t].constructor.name}`:i[t]}</span>
        </div>
          ${this.getActions(t,i)}
        </div>`,this.graph=e.graph??{},this.header=e.header??"Object",this.mode=e.mode??"view"}static get styles(){return w`

    
    :host {
      
    }
    :host * {
      box-sizing: border-box;
      
    }

    :host > * {
      background: white;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
    }

    .main {
      
    }

    .header {
      padding: 10px 20px;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      font-size: 70%;
      border-bottom: 1px solid #e3e3e3;
    }

    .header span {
      font-weight: 800;
      font-size: 120%;
    }

    .container {
      background: white;
      width: 100%;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }

    .separate {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .attribute {
      width: 100%;
      font-size: 90%;
      padding: 15px;
      flex-grow: 1;
      flex-wrap: wrap;
    }

    .name {
      font-weight: 800;
      padding-right: 10px;
    }

    .value {
      font-size: 80%;
    }

    `}static get properties(){return{graph:{type:Object,reflect:!0},header:{type:String,reflect:!0},mode:{type:String,reflect:!0}}}willUpdate(e){e.has("graph")}render(){return b`
      <div>
        <div class="header separate">
          <span>${this.header}</span>
          ${this.history.length>0?b`<visualscript-button size="extra-small" @click="${()=>{let e=this.history.pop();this.header=e.key,this.graph=e.parent}}">Go Back</visualscript-button>`:""}
        </div>
        <div class="container">
              ${this.mode==="view"?Object.keys(this.graph)?.map(e=>this.getElement(e,this.graph)):Object.keys(this.graph)?.map(e=>this.getElement(e,this.graph))}
        </div>
      </div>
    `}}customElements.define("visualscript-graph-editor",Dt);class jt extends F{static get styles(){return w`
    :host {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    :host * {
      
      box-sizing: border-box;
      
    }
    `}static get properties(){return{}}constructor(e={target:{},header:"Object"}){super()}render(){return b`

      <slot></slot>
    `}}customElements.define("visualscript-device-editor",jt);class Ut extends F{static get styles(){return w`
    :host {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    :host * {
      
      box-sizing: border-box;
      
    }
    `}static get properties(){return{}}constructor(e={target:{},header:"Object"}){super()}render(){return b`

      <slot></slot>
    `}}customElements.define("visualscript-session-editor",Ut);class Ve extends F{constructor(e={}){super(),this.apps=new Map,this.open=e.open??!0,this.closeHandler=e.closeHandler??(()=>{}),this.toggle=typeof e.toggle=="string"?document.getElementById(e.toggle):e.toggle}static get styles(){return w`
    
    :host {
      position: relative;
      width: 100%;
      height: 100%;
    }

    

    :host([global]) {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
      pointer-events: none;
    }

    :host([open]) {
      pointer-events: all;
    }


    :host([global]) slot {
      opacity: 0;
      pointer-events: none;
    }

    :host([open]) #close {
      display: block;
    }

    :host * {
      
      box-sizing: border-box;
      
    }

    slot {
      background: white;
      color: black;
    }

    slot {
      display: grid;
      grid-template-columns: 1fr fit-content(100%);
      grid-template-rows: fit-content(75px) 1fr fit-content(75px);
      grid-template-areas: 
              "nav nav"
              "main side"
              "foot foot";
  
      width: 100%;
      height: 100%;
    }

    :host([open]) slot {
      opacity: 1;
      pointer-events: all;
    }

    #close {
      position: absolute; 
      top: 22px;
      right: 22px;
      z-index: 101;
      display: none;
    }

    #dashboard-toggle {
      background: white;
      position: absolute; 
      pointer-events: all;
      top: 0px;
      right: 22px;
      z-index: 1000;
      color: black;
      border: 1px solid black;
      border-top: none;
      padding: 10px 15px;
      cursor: pointer;
      font-size: 70%;
      font-weight: bold;
      border-bottom-left-radius: 7px;
      border-bottom-right-radius: 7px;
      box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
    }

    :host([open]) #dashboard-toggle {
      display: none;
    }

    @media (prefers-color-scheme: dark) {
      slot {
        color: white;
        background: black;
      }

      #dashboard-toggle { 
        border: 1px solid white;
        border-top: none;
        color: white;
        box-shadow: 0 1px 5px 0 rgb(255 255 255 / 20%);
        background: black;
      }
    }
    `}static get properties(){return{open:{type:Boolean,reflect:!0},closeHandler:{type:Function,reflect:!0},global:{type:Boolean,reflect:!0}}}render(){if(this.global?this.classList.add("global"):this.classList.remove("global"),this.global){let i=document.querySelectorAll("visualscript-app");for(var e=0;e<i.length;e++){let s=i[e];this.apps.has(s.name)||this.apps.set(s.name,s)}}this.open?this.classList.add("open"):(this.classList.remove("open"),this.dispatchEvent(new CustomEvent("close"))),this.main=this.querySelector("visualscript-main"),this.footer=this.querySelector("visualscript-footer"),this.nav=this.querySelector("visualscript-nav"),this.sidebar=this.querySelector("visualscript-sidebar");let t=()=>{this.open=!0,this.apps.values().next().value.toggle.shadowRoot.querySelector("button").click()};return this.toggle&&(this.toggle.onclick=t),b`
      ${this.global&&!this.toggle?b`<div id="dashboard-toggle" @click=${t}>Edit</div>`:""}
      ${this.global?b`<visualscript-button id='close' secondary size="small" @click=${()=>this.open=!1}>Close</visualscript-button>`:""}
      <slot>
      </slot>
    `}}customElements.define("visualscript-dashboard",Ve);let Bt={name:{type:String,reflect:!0}};class Ze extends F{constructor(e){super(),this.to=e}static get styles(){return w`

    :host {
      flex-grow: 1;
      min-width: 100px;
    }

    :host * {
      box-sizing: border-box;
    }

    button {
        color: black;
        background: rgb(205,205,205);
        border-right: 1px solid rgb(230,230,230);
        border: 0px;
        padding: 6px 20px;
        text-align: center;
        font-size: 80%;
        cursor: pointer;
        width: 100%;
        height: 100%;
    }

    button > span {
      font-size: 60%;
    }

    button:hover {
        background: rgb(230,230,230);
      }
  
      button:active {
        background: rgb(210,210,210);
      }
  
      button.selected {
        background: rgb(230,230,230);
      }


      @media (prefers-color-scheme: dark) {
        button {
            color: white;
            background: rgb(50,50,50);
            border-right: 1px solid rgb(25,25,25);
        }

        button:hover {
            background: rgb(60,60,60);
        }
      
        button:active {
        background: rgb(75,75,75);
        }
      
        button.selected {
        background: rgb(60,60,60);
        }

      }
    `}static get properties(){return Bt}render(){return b`
      <button class="${this.selected?"selected":""}"  @click=${e=>{this.to.on(e),this.to.dashboard.main.shadowRoot.querySelector("visualscript-tab-bar")?(this.to.toggle.shadowRoot.querySelector("button").classList.add("selected"),this.to.dashboard.main.tabs.forEach(s=>{s!=this.to?(s.toggle.shadowRoot.querySelector("button").classList.remove("selected"),s.style.display="none",s.off(e)):s.style.display=""})):console.warn("No TabBar instance in the global Main");let i=this.to.dashboard;if(i){let s=i.querySelector("visualscript-sidebar");s&&(s.content=this.to.controlPanel.children.length?this.to.controlPanel:"")}}}>${this.to.name??"Tab"} <span>${this.to.type}</span></button>
    `}}customElements.define("visualscript-tab-toggle",Ze);class Je extends F{constructor(e={}){super(),this.label="Control",this.type="button",this.persist=!1,this.options=[],this.onChange=()=>{},this.willUpdate=t=>{t.forEach((i,s)=>{this.element&&(this.element[s]=this[s])})},e.label&&(this.label=e.label),e.type&&(this.type=e.type),e.park&&(this.park=e.park),e.persist&&(this.persist=e.persist),e.options&&(this.options=e.options),e.value&&(this.value=e.value),e.onChange&&(this.onChange=e.onChange),e.accept&&(this.accept=e.accept),e.onClick&&(this.onClick=e.onClick),e.primary&&(this.primary=e.primary),e.backgroundColor&&(this.backgroundColor=e.backgroundColor),e.size&&(this.size=e.size)}static get styles(){return w`

    :host {
      width: 100%;
      height: 100%;
    }

    slot {
      display: none;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 15px;
      margin: 10px;
      border: 1px solid rgb(180,180,180);
      /* white-space: nowrap; */
    }

    h5 {
      margin: 0;
    }


    div > * {
      padding: 10px;
    }

    span { 
      flex-grow: 1;
    }

    @media (prefers-color-scheme: dark) {
      div {
        border: 1px solid rgb(120,120,120);
      }
    }

    `}static get properties(){return{label:{type:String,reflect:!0},type:{type:String,reflect:!0},persist:{type:Boolean,reflect:!0},park:{type:Boolean,reflect:!0},value:{type:Object,reflect:!0},options:{type:Object,reflect:!0},onChange:{type:Object,reflect:!0},accept:{type:String,reflect:!0},primary:{type:Boolean,reflect:!0},backgroundColor:{type:String,reflect:!0},size:{type:String,reflect:!0},onClick:{type:Object,reflect:!0}}}render(){return this.type==="select"?this.element=new qe(this):this.type==="file"?this.element=new Ge(this):this.type==="switch"?this.element=new Xe(this):this.type==="range"?this.element=new We(this):["input","text","number"].includes(this.type)?this.element=new Ye(this):this.element=new Ne(this),b`<div><h5>${this.label}</h5>${this.element}</div><slot></slot>`}updated(e){let i=this.shadowRoot.querySelector("slot").assignedNodes();this.type==="button"&&i.length&&i.forEach(s=>this.element.appendChild(s))}}customElements.define("visualscript-control",Je);let Ke={name:{type:String,reflect:!0},controls:{type:Array,reflect:!0},on:{type:Function,reflect:!0},off:{type:Function,reflect:!0}};class _e extends F{constructor(e={}){super(),this.controls=[],this.on=()=>{},this.off=()=>{},this.type="tab",this.addControl=i=>{this.controlPanel.appendChild(i)},this.updated=()=>{this.querySelectorAll("visualscript-control").forEach(s=>{this.type==="app"?s.park=!0:s.park||this.addControl(s)})},e.name&&(this.name=e.name),e.controls&&(this.controls=e.controls),e.on&&(this.on=e.on),e.off&&(this.off=e.off);let t=document.body.querySelectorAll("visualscript-dashboard");this.dashboard=Array.from(t).find(i=>i.parentNode===document.body)??new Ve,this.dashboard.global=!0,this.dashboard.open=!1,this.toggle=new Ze(this),this.dashboard.addEventListener("close",i=>{this.off(i)})}static get styles(){return w`

    :host {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background: inherit;
    }

    slot {
      overflow: scroll;
    }

    :host * {
      
      box-sizing: border-box;
      
    }
    `}static get properties(){return Ke}willUpdate(e){e.has("controls")&&(this.controlPanel=document.createElement("div"),this.controls.forEach(t=>{this.addControl(new Je(t))}))}render(){return b`
      <slot></slot>
    `}}customElements.define("visualscript-tab",_e);class Nt extends _e{constructor(e={}){let t=Object.assign({on:i=>{this.dashboard.main.appendChild(this),e.on instanceof Function&&e.on(i)},off:i=>{this.style.display="",this.parent.appendChild(this),e.off instanceof Function&&e.off(i)}},e);t.name=e.name,super(t),this.name=e.name,this.type="app",this.parent=this.parentNode}static get properties(){return Object.assign({},Ke)}render(){return parent||(this.parent=this.parentNode),b`
        <slot></slot>
      `}}customElements.define("visualscript-app",Nt);let Ht={};class Yt extends F{static get styles(){return w`

    :host {
      background: whitesmoke;
      overflow-y: hidden;
      overflow-x: scroll;
      display: flex;
      position: sticky;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 10;
    }

    /* Tab Scrollbar */
    :host::-webkit-scrollbar {
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
    }

    :host::-webkit-scrollbar-track {
      background: transparent;
    }

    :host::-webkit-scrollbar-thumb {
      border-radius: 10px;
    }

    /* Handle on hover */
    :host(:hover)::-webkit-scrollbar-thumb {
      background: rgb(118, 222, 255);
    }

      @media (prefers-color-scheme: dark) {

        :host {
          background: rgb(25,25,25);
        }

        :host(:hover)::-webkit-scrollbar-thumb {
          background: rgb(240, 240, 240);
        }

      }
    `}static get properties(){return Ht}constructor(e={}){super()}render(){return b`
      <slot></slot>
    `}}customElements.define("visualscript-tab-bar",Yt);class qt extends F{constructor(e={target:{},header:"Object"}){super(),this.tabs=new Map,this.getTabs=()=>{let t=[];if(this.parentNode?.global){let s=document.querySelectorAll("visualscript-app");for(var i=0;i<s.length;i++)t.includes(s[i])||t.push(s[i])}for(var i=0;i<this.children.length;i++){let r=this.children[i];r instanceof _e&&t.push(r)}return t.forEach(s=>this.tabs.set(s.name,s)),t}}static get styles(){return w`

    :host {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      grid-area: main;
      overflow-x: hidden;
      overflow-y: scroll;
      background: inherit;
      color: inherit;
    }

    :host * {
      
      box-sizing: border-box;
      
    }
    `}static get properties(){return{tabs:{type:Object}}}render(){let t=this.getTabs().map((i,s)=>(s!==0&&(i.style.display="none"),i.toggle));return b`
      <visualscript-tab-bar style="${t.length<1?"display: none;":""}">${t}</visualscript-tab-bar>
      <slot></slot>
    `}}customElements.define("visualscript-main",qt);class Gt extends F{constructor(e={}){super(),this.things=[],this.search=!1,this.load=(t,i)=>(t.style.display="none",b`<div id=tile @click=${()=>{console.log("clicked!")}}>
        <div>
          <h3>${t.name}</h3>
          <p>Item #${i}.</p>
        <div>
      </div>`),this.getThings=()=>{this.things=[];for(var t=0;t<this.children.length;t++){let i=this.children[t];i.name&&this.things.push(i)}return this.things},e.search&&(this.search=e.search)}static get styles(){return w`

    :host {
      width: 100%;
      height: 100%;
    } 

    #things {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
    }

    #tile {
      box-sizing: border-box;
      flex: 1 0 auto;
      aspect-ratio: 1 / 1 ;
      max-width: 200px;
      border-radius: 10px;
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.2);
      cursor: pointer;
      transition: 0.5s;
    }

    #tile:hover{
      background: rgba(0,0,0,0.1);
    }

    #tile > div {
      padding: 25px;
    }
    `}static get properties(){return{}}render(){return this.getThings(),b`
      <visualscript-search .items=${this.things}></visualscript-search>
      <div id=things>
      ${this.things.map(this.load)}
      </div>
      <section>
        <slot></slot>
      </section>
    `}}customElements.define("visualscript-gallery",Gt);let Xt=600;class Wt extends F{constructor(e={}){super(),this.content="",this.interacted=!1,this.closed=e.closed,this.classList.add("default")}static get styles(){return w`

    
    :host {

      --collapse-width: ${Xt}px;
      --dark-color: rgb(25, 25, 25);
      --light-color: rgb(240, 240, 240);

      --blue-spiral: repeating-linear-gradient(
        45deg,
        rgb(30, 167, 253),
        rgb(30, 167, 253) 10px,
        rgb(118, 222, 255) 10px,
        rgb(118, 222, 255) 20px
      );

      /* Light Hue: 118, 222, 255 */
      /* Dark Hue: 0, 116, 196 */

      --light-spiral: repeating-linear-gradient(
        45deg,
        rgb(190, 190, 190),
        rgb(190, 190, 190) 10px,
        rgb(240, 240, 240) 10px,
        rgb(240, 240, 240) 20px
      );

      --dark-spiral: repeating-linear-gradient(
        45deg,
        rgb(25, 25, 25),
        rgb(25, 25, 25) 10px,
        rgb(75, 75, 75) 10px,
        rgb(75, 75, 75) 20px
      );

      --final-toggle-width: 15px;

      color: black;
      grid-area: side;
      background: var(--light-color);
      position: relative;
      display: flex;
    }


    :host > * {
      box-sizing: border-box;
    }

    :host(.closed) > #main {
        width: 0px;
        overflow: hidden;
    }

    :host(.closed) > #toggle {
      width: var(--final-toggle-width);
    }

    #toggle:hover { 
      background: var(--blue-spiral)
    }

    .hidden {
      display: none;
    }

    #toggle {
      height: 100%;
      width: 10px;
      background: rgb(25, 25, 25);
      cursor: pointer;
      background: var(--light-spiral);
      border:none;
    }

    #toggle:active {
      background: var(--blue-spiral)
    }

    #controls {
      overflow-x: scroll; 
      overflow-y: scroll;
      height: 100%;
    }

    @media only screen and (max-width: ${Xt}px) {
      :host(.default) > #main {
          width: 0px;
          overflow: hidden;
      }

      :host(.default) > #toggle {
        width: var(--final-toggle-width);
      }
    }


    #header {
      width: 100%;
      padding: 10px 25px;
      background: var(--dark-color);
      color: white;
      margin: 0px;
      position: sticky;
      left:0;
      top: 0;
    }

    @media (prefers-color-scheme: dark) {
      :host {
        color: white;
        background: var(--dark-color);
      }

      #toggle {
        background: var(--dark-spiral)
      }

      #header {
        width: 100%;
        padding: 5px 25px;
        color: black;
        background: var(--light-color);
      }
    }

    `}static get properties(){return{closed:{type:Boolean,reflect:!0},content:{type:Object,reflect:!0}}}render(){let e=this.content||this.children?.length;return this.closed&&this.classList.add("closed"),b`
        <button id=toggle class="${e?"":"hidden"}" @click=${()=>{this.classList.remove("default"),this.classList.toggle("closed")}}></button>
        <div id=main>
        ${e?b`<h4 id=header>Controls</h4>`:""}
          <div id=controls>
          ${this.content}
          <slot></slot>
          </div>
        </div>
      `}}customElements.define("visualscript-sidebar",Wt),f.App=Nt,f.Button=Ne,f.CodeEditor=It,f.Control=Je,f.Dashboard=Ve,f.DeviceEditor=jt,f.File=Ge,f.Footer=Pt,f.Gallery=Gt,f.GraphEditor=Dt,f.Input=Ye,f.Loader=_t,f.Main=qt,f.Modal=Ft,f.Nav=kt,f.ObjectEditor=Mt,f.Overlay=Tt,f.Range=We,f.Search=zt,f.Select=qe,f.SessionEditor=Ut,f.Sidebar=Wt,f.Switch=Xe,f.Tab=_e,f.TabBar=Yt,f.TabBarPropsLit=Ht,f.TabPropsLit=Ke,f.TabToggle=Ze,f.TabTogglePropsLit=Bt,f.streams=ki,Object.defineProperty(f,"__esModule",{value:!0})});var zi=(f,h)=>f.map((x,k)=>x+h[k]),Mi=(f,h)=>f.map((x,k)=>Math.abs(x-h[k])),re=transformations={add:zi,difference:Mi};var ve=class{get in(){return this.nodes[0]}constructor(h){this.context=null,this.info=h,this.nodes=[],this.analyser=null,this.out=null,this.canListen=!1,this.fftData={},this.analyses={},this.integrations={}}analyse=()=>{for(let h in this.analyses)this.analyses[h].output=this.analyses[h].function();for(let h in this.integrations)this.integrations[h].output=this.integrations[h].function()};initializeContext=()=>{if(!this.context){if(setInterval(this.analyse,50),this.context=new(window.AudioContext||window.webkitAudioContext),this.info.minFreq){let h=this.context.createBiquadFilter();this.nodes.push(h),h.type="highpass",h.frequency.value=this.info.minFreq}if(this.info.maxFreq){let h=this.context.createBiquadFilter();this.nodes.push(h),h.type="lowpass",h.frequency.value=this.info.maxFreq,this.nodes[this.nodes.length-1].connect(h)}this.analyser=this.createAnalyser(),this.nodes[this.nodes.length-1].connect(this.analyser),this.out=this.context.createGain(),this.out.gain.value=1,this.out.connect(this.context.destination)}};createAnalyser=(h=this.context)=>{let x=h.createAnalyser();return x.smoothingTimeConstant=this.info.smoothingTimeConstant,x.fftSize=this.info.fftSize,x.minDecibels=this.info.minDecibels,x.maxDecibels=this.info.maxDecibels,x};cloneAudioBuffer=h=>{let x=new AudioBuffer({length:h.length,numberOfChannels:h.numberOfChannels,sampleRate:h.sampleRate});for(let k=0;k<x.numberOfChannels;++k){let _=h.getChannelData(k);x.copyToChannel(_,k)}return x};fft=function(h,x,k){let _=new OfflineAudioContext(1,h.length,this.context.sampleRate),L=this.split(h.numberOfChannels,()=>{},{context:_,nodes:[(z,M)=>{let R=_.createScriptProcessor(1024,1,1);return this.fftData[z]=[],R.onaudioprocess=U=>{let G=new Uint8Array(M.analyser.frequencyBinCount);M.analyser.getByteFrequencyData(G),typeof x=="function"&&x(G),this.fftData[z].push(G)},R}]}),w=_.createBufferSource();w.connect(L.input),L.output.connect(_.destination),w.buffer=h,w.onended=z=>{typeof k=="function"&&k(this.fftData)},w.start(),_.startRendering().catch(z=>console.log("Rendering failed: "+z))};split=(h,x,k={})=>{let _=k.context??this.context;var L=_.createChannelSplitter(h),w=_.createChannelMerger(h);for(let z=0;z<h;z++){let M=_.createGain();M.gain.setValueAtTime(1,_.currentTime);let R=this.createAnalyser(_);L.connect(R,z);let U={analyser:R,gainNode:M},G=R;k.nodes&&k.nodes.forEach((xe,ce)=>{let K=xe(z,U);G.connect(K),G=K,U[`custom${ce}`]=K}),G.connect(M),M.connect(w,0,z),x instanceof Function&&x(z,U)}return{output:w,input:L}};addSource=(h,x=()=>{})=>{h.connect(this.in);let k=h.channelCount??h.buffer?.numberOfChannels;if(k>1){let _=this.split(k,(M,R)=>{let U=x();U.container.insertAdjacentHTML("afterbegin",`<h3>${M==0?"Left":"Right"} Channel </h3>`),this.addAnalysis(R.analyser,"fft",U.spectrogram,this.info.onData)});this.analyser.connect(_.input);let L=x();L.container.insertAdjacentHTML("afterbegin","<h3>Additive</h3>"),this.integrate("additive",[0,1],M=>re.add(M[0].frequencies,M[1].frequencies),L.spectrogram,"data");let w=x();w.container.insertAdjacentHTML("afterbegin","<h3>Difference</h3>"),this.integrate("difference",[0,1],M=>re.difference(M[0].frequencies,M[1].frequencies),w.spectrogram,"data");let z=this.context.createGain();_.output.connect(z),z.connect(this.out),this.canListen?z.gain.value=1:z.gain.value=0}else{let _=x(),L=this.context.createGain();this.analyser.connect(L),L.connect(this.out),this.canListen?L.gain.value=1:L.gain.value=0,this.addAnalysis(this.analyser,"fft",_.spectrogram)}video&&(video.onended=()=>{h.disconnect()}),h.start instanceof Function&&h.start()};addAnalysis=(h,x,k,_=()=>{})=>{let L=Object.keys(this.analyses).length,w=()=>{};switch(x){case"fft":let z=new Uint8Array(h.frequencyBinCount);w=()=>{h.getByteFrequencyData(z);let R=Array.from(z);k.updateData(R);let U={frequencies:R};return _(U,L),U};break;case"raw":let M=new Uint8Array(1);w=()=>{h.getByteTimeDomainData(M);let R=Array.from(M);k.updateData([R]);let U={timeseries:R};return _(U,L),U};break}this.analyses[L]={function:w,output:null}};integrate=(h,x,k=w=>{},_,L)=>{this.integrations[h]={function:()=>{let w=k(x.map(z=>this.analyses[z].output));_[L]=w},output:null}};listen=(h=!this.canListen)=>{this.canListen=h}};var oe=document.querySelector("visualscript-overlay"),le=document.createElement("div");oe.insertAdjacentElement("beforeend",le);le.style=`
width: 100%;
height: 100%;
display: flex;
align-items:center;
justify-content: center;
font-size:170%;
font-weight: bold;
font-family: sans-serif;
`;var it=[],Oi=document.getElementById("design"),st=document.getElementById("colorscale"),ae=document.getElementById("transformation"),Pe=document.getElementById("threshold"),nt=document.getElementById("dataSelect"),Ri=(f,h)=>{if(f[0]&&f[1]){if(h instanceof Function)return f[0].map((x,k)=>h(x,f[1][k]));console.error("Invalid transformation function provided...")}else console.warn("No FFT data yet...")};ae.options=Object.keys(re);ae.onChange=f=>{be(void 0,void 0,f.target.value)};Pe.onChange=f=>{be(void 0,void 0,void 0,f.target.value)};nt.options=["Right Channel","Left Channel","Combined"];var be=(f=H.fftData,h=nt.element.value,x=ae.element.value,k=Pe.element.value)=>new Promise(_=>{H.fftData[0]&&(le.innerHTML=`Plotting ${f[0].length} FFT windows...`,oe.open=!0,setTimeout(()=>{let L;switch(h){case"Right Channel":ae.style.display="none",L=f[0];break;case"Left Channel":ae.style.display="none",L=f[1];break;case"Combined":ae.style.display="",L=Ri(f,re[x])}if(L){let w=Math.min(...L.map(M=>Math.min(...M))),z=Math.max(...L.map(M=>Math.max(...M)));Pe.element.min=w,Pe.element.max=z,it=L.map(M=>M.map(R=>R<k?0:R)),Te.data=it}else console.warn("Plot not updated because there was no data");oe.open=!1,_(it)},500))});nt.onChange=f=>{be(void 0,f.target.value)};st.options=visualscript.streams.data.InteractiveSpectrogram.colorscales;var Te=new visualscript.streams.data.InteractiveSpectrogram({Plotly});Oi.insertAdjacentElement("beforeend",Te);st.value=Te.colorscale;st.onChange=f=>{Te.colorscale=f.target.value};var Ii=Math.pow(2,11),Di=7e3,ji=0,Ui={smoothingTimeConstant:.2,fftSize:Ii,minDecibels:-127,maxDecibels:0,minFreq:Di,maxFreq:ji,onData:(f,h)=>{if(h===0){let x=0;for(let _ of f.frequencies)x+=_;let k=x/f.frequencies.length;volume.volume=k/(H.info.maxDecibels-H.info.minDecibels)}}},H=new ve(Ui);var ss=document.getElementById("app"),ns=document.getElementById("data"),Ni=document.getElementById("start"),ze=document.getElementById("in"),rt=document.getElementById("out"),Me=document.getElementById("video"),Hi=document.getElementById("files"),qi=document.getElementById("main"),ei=document.getElementById("videos"),Yi=document.getElementById("analyses"),qi=document.getElementById("volume");navigator.mediaDevices.enumerateDevices().then(Gi);var at={};function Gi(f){for(var h=0;h!==f.length;++h){var x=f[h],k=document.createElement("option");k.value=x.deviceId,x.kind==="audioinput"?(k.text=x.label||"Microphone "+(ze.options.length+1),ze.options=[...ze.options,k]):x.kind==="audiooutput"?(k.text=x.label||"Speaker "+(rt.options.length+1),rt.options=[...rt.options,k]):x.kind==="videoinput"&&(k.text=x.label||"Camera "+(Me.options.length+1),Me.options=[...Me.options,k])}}var ti=(f,h={})=>{let x=document.createElement("div");return x.classList.add("container"),Yi.insertAdjacentElement("beforeend",x),h.video&&(h.stream?(h.video.srcObject=h.stream,h.video.controls=!0,h.video.muted=!0):h.video.controls=!0,h.video.autoplay=!0),at[f]={container:x,video:h.video,stream:h.stream,spectrogram:new visualscript.streams.data.Spectrogram},x.insertAdjacentElement("beforeend",at[f].spectrogram),at[f]},ye=0;Hi.onChange=async f=>{H.initializeContext(),ye=0;for(let h of f.target.files){let x=h.type.split("/")[0],k,_;x==="video"?(_=document.createElement("video"),_.src=URL.createObjectURL(h),k=H.context.createMediaElementSource(_),Qt(h).then(L=>{console.log("Audio done")})):k=await Qt(h),_&&ei.insertAdjacentElement("beforeend",_),H.addSource(k,()=>{let L=ti(ye,{video:_});return ye++,L})}};Ni.onClick=()=>{H.initializeContext(),H.listen(!1),navigator.mediaDevices.getUserMedia({audio:{deviceId:{exact:ze.element.value}},video:{deviceId:{exact:Me.element.value}}}).then(f=>{let h=document.createElement("video"),x=H.context.createMediaStreamSource(f);ei.insertAdjacentElement("beforeend",h),H.addSource(x,()=>{let k=ti(ye,{video:h,stream:f});return ye++,k})})};var Qt=f=>{let h=f.type.split("/")[0];return new Promise((x,k)=>{let _=new FileReader;_.onload=w=>{le.innerHTML=`Decoding audio data from ${h} file...`,oe.open=!0,H.context.decodeAudioData(w.target.result,z=>{le.innerHTML="Audio decoded! Analysing audio data...",H.fft(z,null,async M=>{await be(M),oe.open=!1;let R=H.context.createBufferSource();R.buffer=z,x(R)})})};function L(w){console.log(`${w.type}: ${w.loaded} bytes transferred
`),w.type}_.addEventListener("error",L),_.readAsArrayBuffer(f)})};})();
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
