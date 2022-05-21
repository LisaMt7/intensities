(()=>{(function(y,f){typeof exports=="object"&&typeof module<"u"?f(exports):typeof define=="function"&&define.amd?define(["exports"],f):(y=typeof globalThis<"u"?globalThis:y||self,f(y.visualscript={}))})(void 0,function(y){"use strict";let f=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,S=Symbol(),k=new Map;class L{constructor(e,t){if(this._$cssResult$=!0,t!==S)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=k.get(this.cssText);return f&&e===void 0&&(k.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}let z=r=>new L(typeof r=="string"?r:r+"",S),$=(r,...e)=>{let t=r.length===1?r[0]:e.reduce((i,s,n)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1],r[0]);return new L(t,S)},O=(r,e)=>{f?r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{let i=document.createElement("style"),s=window.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,r.appendChild(i)})},H=f?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return z(t)})(r):r;var D;let j=window.trustedTypes,U=j?j.emptyScript:"",V=window.reactiveElementPolyfillSupport,q={toAttribute(r,e){switch(e){case Boolean:r=r?U:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},X=(r,e)=>e!==r&&(e==e||r==r),ye={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:X};class ie extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach((t,i)=>{let s=this._$Eh(i,t);s!==void 0&&(this._$Eu.set(s,i),e.push(s))}),e}static createProperty(e,t=ye){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let i=typeof e=="symbol"?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){let n=this[e];this[t]=s,this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||ye}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){let t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(let s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(H(s))}else e!==void 0&&t.push(H(e));return t}static _$Eh(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;let t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return O(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=ye){var s,n;let a=this.constructor._$Eh(e,i);if(a!==void 0&&i.reflect===!0){let o=((n=(s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==null&&n!==void 0?n:q.toAttribute)(t,i.type);this._$Ei=e,o==null?this.removeAttribute(a):this.setAttribute(a,o),this._$Ei=null}}_$AK(e,t){var i,s,n;let a=this.constructor,o=a._$Eu.get(e);if(o!==void 0&&this._$Ei!==o){let d=a.getPropertyOptions(o),u=d.converter,b=(n=(s=(i=u)===null||i===void 0?void 0:i.fromAttribute)!==null&&s!==void 0?s:typeof u=="function"?u:null)!==null&&n!==void 0?n:q.fromAttribute;this._$Ei=o,this[o]=b(t,d.type),this._$Ei=null}}requestUpdate(e,t,i){let s=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||X)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((s,n)=>this[n]=s),this._$Et=void 0);let t=!1,i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(s=>{var n;return(n=s.hostUpdate)===null||n===void 0?void 0:n.call(s)}),this.update(i)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$ES(i,this[i],t)),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}ie.finalized=!0,ie.elementProperties=new Map,ie.elementStyles=[],ie.shadowRootOptions={mode:"open"},V?.({ReactiveElement:ie}),((D=globalThis.reactiveElementVersions)!==null&&D!==void 0?D:globalThis.reactiveElementVersions=[]).push("1.3.1");var Pe;let se=globalThis.trustedTypes,tt=se?se.createPolicy("lit-html",{createHTML:r=>r}):void 0,Z=`lit$${(Math.random()+"").slice(9)}$`,it="?"+Z,Wt=`<${it}>`,re=document,ce=(r="")=>re.createComment(r),de=r=>r===null||typeof r!="object"&&typeof r!="function",st=Array.isArray,Vt=r=>{var e;return st(r)||typeof((e=r)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},ue=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,rt=/-->/g,nt=/>/g,ee=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,at=/'/g,ot=/"/g,lt=/^(?:script|style|textarea|title)$/i,Zt=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),v=Zt(1),J=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),ct=new WeakMap,Jt=(r,e,t)=>{var i,s;let n=(i=t?.renderBefore)!==null&&i!==void 0?i:e,a=n._$litPart$;if(a===void 0){let o=(s=t?.renderBefore)!==null&&s!==void 0?s:null;n._$litPart$=a=new pe(e.insertBefore(ce(),o),o,void 0,t??{})}return a._$AI(r),a},ne=re.createTreeWalker(re,129,null,!1),Kt=(r,e)=>{let t=r.length-1,i=[],s,n=e===2?"<svg>":"",a=ue;for(let d=0;d<t;d++){let u=r[d],b,m,x=-1,P=0;for(;P<u.length&&(a.lastIndex=P,m=a.exec(u),m!==null);)P=a.lastIndex,a===ue?m[1]==="!--"?a=rt:m[1]!==void 0?a=nt:m[2]!==void 0?(lt.test(m[2])&&(s=RegExp("</"+m[2],"g")),a=ee):m[3]!==void 0&&(a=ee):a===ee?m[0]===">"?(a=s??ue,x=-1):m[1]===void 0?x=-2:(x=a.lastIndex-m[2].length,b=m[1],a=m[3]===void 0?ee:m[3]==='"'?ot:at):a===ot||a===at?a=ee:a===rt||a===nt?a=ue:(a=ee,s=void 0);let R=a===ee&&r[d+1].startsWith("/>")?" ":"";n+=a===ue?u+Wt:x>=0?(i.push(b),u.slice(0,x)+"$lit$"+u.slice(x)+Z+R):u+Z+(x===-2?(i.push(void 0),d):R)}let o=n+(r[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return[tt!==void 0?tt.createHTML(o):o,i]};class he{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,a=0,o=e.length-1,d=this.parts,[u,b]=Kt(e,t);if(this.el=he.createElement(u,i),ne.currentNode=this.el.content,t===2){let m=this.el.content,x=m.firstChild;x.remove(),m.append(...x.childNodes)}for(;(s=ne.nextNode())!==null&&d.length<o;){if(s.nodeType===1){if(s.hasAttributes()){let m=[];for(let x of s.getAttributeNames())if(x.endsWith("$lit$")||x.startsWith(Z)){let P=b[a++];if(m.push(x),P!==void 0){let R=s.getAttribute(P.toLowerCase()+"$lit$").split(Z),_=/([.?@])?(.*)/.exec(P);d.push({type:1,index:n,name:_[2],strings:R,ctor:_[1]==="."?ei:_[1]==="?"?ii:_[1]==="@"?si:xe})}else d.push({type:6,index:n})}for(let x of m)s.removeAttribute(x)}if(lt.test(s.tagName)){let m=s.textContent.split(Z),x=m.length-1;if(x>0){s.textContent=se?se.emptyScript:"";for(let P=0;P<x;P++)s.append(m[P],ce()),ne.nextNode(),d.push({type:2,index:++n});s.append(m[x],ce())}}}else if(s.nodeType===8)if(s.data===it)d.push({type:2,index:n});else{let m=-1;for(;(m=s.data.indexOf(Z,m+1))!==-1;)d.push({type:7,index:n}),m+=Z.length-1}n++}}static createElement(e,t){let i=re.createElement("template");return i.innerHTML=e,i}}function ae(r,e,t=r,i){var s,n,a,o;if(e===J)return e;let d=i!==void 0?(s=t._$Cl)===null||s===void 0?void 0:s[i]:t._$Cu,u=de(e)?void 0:e._$litDirective$;return d?.constructor!==u&&((n=d?._$AO)===null||n===void 0||n.call(d,!1),u===void 0?d=void 0:(d=new u(r),d._$AT(r,t,i)),i!==void 0?((a=(o=t)._$Cl)!==null&&a!==void 0?a:o._$Cl=[])[i]=d:t._$Cu=d),d!==void 0&&(e=ae(r,d._$AS(r,e.values),d,i)),e}class Qt{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;let{el:{content:i},parts:s}=this._$AD,n=((t=e?.creationScope)!==null&&t!==void 0?t:re).importNode(i,!0);ne.currentNode=n;let a=ne.nextNode(),o=0,d=0,u=s[0];for(;u!==void 0;){if(o===u.index){let b;u.type===2?b=new pe(a,a.nextSibling,this,e):u.type===1?b=new u.ctor(a,u.name,u.strings,this,e):u.type===6&&(b=new ri(a,this,e)),this.v.push(b),u=s[++d]}o!==u?.index&&(a=ne.nextNode(),o++)}return n}m(e){let t=0;for(let i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class pe{constructor(e,t,i,s){var n;this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cg=(n=s?.isConnected)===null||n===void 0||n}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ae(this,e,t),de(e)?e===I||e==null||e===""?(this._$AH!==I&&this._$AR(),this._$AH=I):e!==this._$AH&&e!==J&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.k(e):Vt(e)?this.S(e):this.$(e)}M(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.M(e))}$(e){this._$AH!==I&&de(this._$AH)?this._$AA.nextSibling.data=e:this.k(re.createTextNode(e)),this._$AH=e}T(e){var t;let{values:i,_$litType$:s}=e,n=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=he.createElement(s.h,this.options)),s);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===n)this._$AH.m(i);else{let a=new Qt(n,this),o=a.p(this.options);a.m(i),this.k(o),this._$AH=a}}_$AC(e){let t=ct.get(e.strings);return t===void 0&&ct.set(e.strings,t=new he(e)),t}S(e){st(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let n of e)s===t.length?t.push(i=new pe(this.M(ce()),this.M(ce()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){let s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class xe{constructor(e,t,i,s,n){this.type=1,this._$AH=I,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){let n=this.strings,a=!1;if(n===void 0)e=ae(this,e,t,0),a=!de(e)||e!==this._$AH&&e!==J,a&&(this._$AH=e);else{let o=e,d,u;for(e=n[0],d=0;d<n.length-1;d++)u=ae(this,o[i+d],t,d),u===J&&(u=this._$AH[d]),a||(a=!de(u)||u!==this._$AH[d]),u===I?e=I:e!==I&&(e+=(u??"")+n[d+1]),this._$AH[d]=u}a&&!s&&this.C(e)}C(e){e===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ei extends xe{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===I?void 0:e}}let ti=se?se.emptyScript:"";class ii extends xe{constructor(){super(...arguments),this.type=4}C(e){e&&e!==I?this.element.setAttribute(this.name,ti):this.element.removeAttribute(this.name)}}class si extends xe{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){var i;if((e=(i=ae(this,e,t,0))!==null&&i!==void 0?i:I)===J)return;let s=this._$AH,n=e===I&&s!==I||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,a=e!==I&&(s===I||n);n&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class ri{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ae(this,e)}}let dt=window.litHtmlPolyfillSupport;dt?.(he,pe),((Pe=globalThis.litHtmlVersions)!==null&&Pe!==void 0?Pe:globalThis.litHtmlVersions=[]).push("2.2.2");var Te,ze;class E extends ie{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;let i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=Jt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return J}}E.finalized=!0,E._$litElement$=!0,(Te=globalThis.litElementHydrateSupport)===null||Te===void 0||Te.call(globalThis,{LitElement:E});let ut=globalThis.litElementPolyfillSupport;ut?.({LitElement:E}),((ze=globalThis.litElementVersions)!==null&&ze!==void 0?ze:globalThis.litElementVersions=[]).push("3.2.0");class ht extends E{constructor(e={}){super(),this.volume=e.volume??0,this.backgroundColor=e.backgroundColor??"#69ce2b",this.count=e.count??10}static get styles(){return $`

      :host {
        width: 100%;
      }

      #wrapper{
        width: 100%;
      }

      `}static get properties(){return{volume:{type:Number},count:{type:Number},backgroundColor:{type:String,reflect:!0}}}willUpdate(e){e.has("volume")&&(!this.volume||this.volume<0?this.volume=0:this.volume>1&&(this.volume=1))}render(){let e=Math.round(this.count*(this.volume??0));return v`
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
          ${Array.from({length:this.count},(t,i)=>v`<div class=${i<e?"target active":"target"}></div>`)}
        </div>
    `}}customElements.define("visualscript-audio-volume",ht);var ni=Object.freeze({__proto__:null,Volume:ht});class pt extends E{constructor(e={}){super(),this.source=e.source,this.autoplay=e.autoplay,this.controls=e.controls}static get styles(){return $`

      video {
        width: 100%;
      }

      `}static get properties(){return{source:{converter:{toAttribute(e){return e},fromAttribute(e){return e}}},autoplay:{type:Boolean},controls:{type:Boolean}}}willUpdate(e){}render(){let e=document.createElement("video");if(typeof this.source=="object")e.srcObject=this.source;else if(this.source){let t=document.createElement("source");t.src=this.source,e.insertAdjacentElement("beforeend",t)}return this.autoplay&&(e.autoplay=this.autoplay),this.controls&&(e.controls=this.controls),e}}customElements.define("visualscript-video-player",pt);var ai=Object.freeze({__proto__:null,Player:pt});function Me(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,i=new Array(e);t<e;t++)i[t]=r[t];return i}function oi(r){if(Array.isArray(r))return Me(r)}function li(r){if(typeof Symbol<"u"&&r[Symbol.iterator]!=null||r["@@iterator"]!=null)return Array.from(r)}function ci(r,e){if(!!r){if(typeof r=="string")return Me(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Me(r,e)}}function di(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ge(r){return oi(r)||li(r)||ci(r)||di()}function ui(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function gt(r,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(r,i.key,i)}}function hi(r,e,t){return e&&gt(r.prototype,e),t&&gt(r,t),Object.defineProperty(r,"prototype",{writable:!1}),r}function ft(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}class we{constructor(e,t,i,s){this.r=e,this.g=t,this.b=i,this.a=s}}class pi{constructor(){this.scaleX=1,this.scaleY=1,this.offsetX=0,this.offsetY=0,this.loop=!1,this._vbuffer=0,this._coord=0,this.visible=!0,this.intensity=1,this.xy=new Float32Array([]),this.numPoints=0,this.color=new we(0,0,0,1),this.webglNumPoints=0}}class Oe extends pi{constructor(e,t){super(),this.currentIndex=0,this.webglNumPoints=t,this.numPoints=t,this.color=e,this.xy=new Float32Array(2*this.webglNumPoints)}setX(e,t){this.xy[e*2]=t}setY(e,t){this.xy[e*2+1]=t}getX(e){return this.xy[e*2]}getY(e){return this.xy[e*2+1]}lineSpaceX(e,t){for(let i=0;i<this.numPoints;i++)this.setX(i,e+t*i)}arrangeX(){this.lineSpaceX(-1,2/this.numPoints)}constY(e){for(let t=0;t<this.numPoints;t++)this.setY(t,e)}shiftAdd(e){let t=e.length;for(let i=0;i<this.numPoints-t;i++)this.setY(i,this.getY(i+t));for(let i=0;i<t;i++)this.setY(i+this.numPoints-t,e[i])}addArrayY(e){if(this.currentIndex+e.length<=this.numPoints)for(let t=0;t<e.length;t++)this.setY(this.currentIndex,e[t]),this.currentIndex++}replaceArrayY(e){if(e.length==this.numPoints)for(let t=0;t<this.numPoints;t++)this.setY(t,e[t])}}class gi{constructor(e,t){this.debug=!1,this.addLine=this.addDataLine,t==null?this.webgl=e.getContext("webgl",{antialias:!0,transparent:!1}):(this.webgl=e.getContext("webgl",{antialias:t.antialias,transparent:t.transparent,desynchronized:t.deSync,powerPerformance:t.powerPerformance,preserveDrawing:t.preserveDrawing}),this.debug=t.debug==null?!1:t.debug),this.log("canvas type is: "+e.constructor.name),this.log(`[webgl-plot]:width=${e.width}, height=${e.height}`),this._linesData=[],this._linesAux=[],this._thickLines=[],this._surfaces=[],this.gScaleX=1,this.gScaleY=1,this.gXYratio=1,this.gOffsetX=0,this.gOffsetY=0,this.gLog10X=!1,this.gLog10Y=!1,this.webgl.clear(this.webgl.COLOR_BUFFER_BIT),this.webgl.viewport(0,0,e.width,e.height),this._progLine=this.webgl.createProgram(),this.initThinLineProgram(),this.webgl.enable(this.webgl.BLEND),this.webgl.blendFunc(this.webgl.SRC_ALPHA,this.webgl.ONE_MINUS_SRC_ALPHA)}get linesData(){return this._linesData}get linesAux(){return this._linesAux}get thickLines(){return this._thickLines}get surfaces(){return this._surfaces}_drawLines(e){let t=this.webgl;e.forEach(i=>{if(i.visible){t.useProgram(this._progLine);let s=t.getUniformLocation(this._progLine,"uscale");t.uniformMatrix2fv(s,!1,new Float32Array([i.scaleX*this.gScaleX*(this.gLog10X?1/Math.log(10):1),0,0,i.scaleY*this.gScaleY*this.gXYratio*(this.gLog10Y?1/Math.log(10):1)]));let n=t.getUniformLocation(this._progLine,"uoffset");t.uniform2fv(n,new Float32Array([i.offsetX+this.gOffsetX,i.offsetY+this.gOffsetY]));let a=t.getUniformLocation(this._progLine,"is_log");t.uniform2iv(a,new Int32Array([this.gLog10X?1:0,this.gLog10Y?1:0]));let o=t.getUniformLocation(this._progLine,"uColor");t.uniform4fv(o,[i.color.r,i.color.g,i.color.b,i.color.a]),t.bufferData(t.ARRAY_BUFFER,i.xy,t.STREAM_DRAW),t.drawArrays(i.loop?t.LINE_LOOP:t.LINE_STRIP,0,i.webglNumPoints)}})}_drawSurfaces(e){let t=this.webgl;e.forEach(i=>{if(i.visible){t.useProgram(this._progLine);let s=t.getUniformLocation(this._progLine,"uscale");t.uniformMatrix2fv(s,!1,new Float32Array([i.scaleX*this.gScaleX*(this.gLog10X?1/Math.log(10):1),0,0,i.scaleY*this.gScaleY*this.gXYratio*(this.gLog10Y?1/Math.log(10):1)]));let n=t.getUniformLocation(this._progLine,"uoffset");t.uniform2fv(n,new Float32Array([i.offsetX+this.gOffsetX,i.offsetY+this.gOffsetY]));let a=t.getUniformLocation(this._progLine,"is_log");t.uniform2iv(a,new Int32Array([this.gLog10X?1:0,this.gLog10Y?1:0]));let o=t.getUniformLocation(this._progLine,"uColor");t.uniform4fv(o,[i.color.r,i.color.g,i.color.b,i.color.a]),t.bufferData(t.ARRAY_BUFFER,i.xy,t.STREAM_DRAW),t.drawArrays(t.TRIANGLE_STRIP,0,i.webglNumPoints)}})}_drawTriangles(e){let t=this.webgl;t.bufferData(t.ARRAY_BUFFER,e.xy,t.STREAM_DRAW),t.useProgram(this._progLine);let i=t.getUniformLocation(this._progLine,"uscale");t.uniformMatrix2fv(i,!1,new Float32Array([e.scaleX*this.gScaleX*(this.gLog10X?1/Math.log(10):1),0,0,e.scaleY*this.gScaleY*this.gXYratio*(this.gLog10Y?1/Math.log(10):1)]));let s=t.getUniformLocation(this._progLine,"uoffset");t.uniform2fv(s,new Float32Array([e.offsetX+this.gOffsetX,e.offsetY+this.gOffsetY]));let n=t.getUniformLocation(this._progLine,"is_log");t.uniform2iv(n,new Int32Array([0,0]));let a=t.getUniformLocation(this._progLine,"uColor");t.uniform4fv(a,[e.color.r,e.color.g,e.color.b,e.color.a]),t.drawArrays(t.TRIANGLE_STRIP,0,e.xy.length/2)}_drawThickLines(){this._thickLines.forEach(e=>{if(e.visible){let t=Math.min(this.gScaleX,this.gScaleY);e.setActualThickness(e.getThickness()/t),e.convertToTriPoints(),this._drawTriangles(e)}})}update(){this.clear(),this.draw()}draw(){this._drawLines(this.linesData),this._drawLines(this.linesAux),this._drawThickLines(),this._drawSurfaces(this.surfaces)}clear(){this.webgl.clear(this.webgl.COLOR_BUFFER_BIT)}_addLine(e){e._vbuffer=this.webgl.createBuffer(),this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER,e._vbuffer),this.webgl.bufferData(this.webgl.ARRAY_BUFFER,e.xy,this.webgl.STREAM_DRAW),e._coord=this.webgl.getAttribLocation(this._progLine,"coordinates"),this.webgl.vertexAttribPointer(e._coord,2,this.webgl.FLOAT,!1,0,0),this.webgl.enableVertexAttribArray(e._coord)}addDataLine(e){this._addLine(e),this.linesData.push(e)}addAuxLine(e){this._addLine(e),this.linesAux.push(e)}addThickLine(e){this._addLine(e),this._thickLines.push(e)}addSurface(e){this._addLine(e),this.surfaces.push(e)}initThinLineProgram(){let e=`
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
         }`,s=this.webgl.createShader(this.webgl.FRAGMENT_SHADER);this.webgl.shaderSource(s,i),this.webgl.compileShader(s),this._progLine=this.webgl.createProgram(),this.webgl.attachShader(this._progLine,t),this.webgl.attachShader(this._progLine,s),this.webgl.linkProgram(this._progLine)}popDataLine(){this.linesData.pop()}removeAllLines(){this._linesData=[],this._linesAux=[],this._thickLines=[],this._surfaces=[]}removeDataLines(){this._linesData=[]}removeAuxLines(){this._linesAux=[]}viewport(e,t,i,s){this.webgl.viewport(e,t,i,s)}log(e){this.debug&&console.log("[webgl-plot]:"+e)}}var fi=function(){function r(e){var t=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;if(ui(this,r),ft(this,"updateAllLines",function(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,o=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1,d=!0,u=ge(n);s.forEach(function(b,m){var x;if(b.length!==((x=t.linesY[m])===null||x===void 0?void 0:x.length)){var P;b.length>((P=t.linesY[m])===null||P===void 0?void 0:P.length)?t.linesY[m]=r.downsample(b,t.linesY[m].length):t.linesY[m]=r.upsample(b,t.linesY[m]),u[m]=Math.ceil(b.length/t.nSecGraph),a&&(t.linesY[m]=t.autoscale(b,m,t.nLines,o)),d=!1}else a?t.linesY[m]=t.autoscale(b,m,t.nLines,o):t.linesY[m]=b}),d||(t.deinitPlot(),t.initPlot(s.length,u)),t.useOverlay&&(t.overlayctx.clearRect(0,0,t.overlay.width,t.overlay.height),t.overlayctx.font="1em Courier",t.overlayctx.fillStyle="white"),t.linesY.forEach(function(b,m){for(var x=0;x<b.length;x++)t.lines[m].setY(x,b[x]);t.useOverlay&&(t.overlayctx.fillText(t.lineSettings[m].ymax.toFixed(2),t.overlay.width-70,t.overlay.height*(m+.1)/t.lines.length),t.overlayctx.fillText(t.lineSettings[m].ymin.toFixed(2),t.overlay.width-70,t.overlay.height*(m+.9)/t.lines.length))})}),ft(this,"updateLine",function(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:500,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,o=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0,d=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!1;s.length!==n*t.nSecGraph&&(n=s.length/t.nSecGraph,t.linesSPS[a]=n,t.deinitPlot(),t.initPlot(t.lines.length,t.linesSPS)),s.length!==t.linesY[a].length?(s.length>t.linesY[a].length?t.linesY[a]=r.downsample(s,t.linesY[a].length):t.linesY[a]=r.upsample(s,t.linesY[a]),o&&(t.linesY[a]=t.autoscale(s,a,t.nLines,d))):o?t.linesY[a]=t.autoscale(s,a,t.nLines,d):t.linesY[a]=s;for(var u=0;u<t.linesY[a].length;u++)t.lines[a].setY(u,t.linesY[a][u]);t.useOverlay&&(t.overlayctx.clearRect(0,t.overlay.height*a/t.lines.length,t.overlay.width,t.overlay.height*(a+1)/t.lines.length),t.overlayctx.fillText(t.lineSettings[a].ymax.toFixed(2),t.overlay.width-70,t.overlay.height*(a+.1)/t.lines.length),t.overlayctx.fillText(t.lineSettings[a].ymin.toFixed(2),t.overlay.width-70,t.overlay.height*(a+.9)/t.lines.length))}),!e)throw new Error("Supply a canvas to the webgl plot!");this.canvas=e,this.useOverlay=i,this.overlay,this.overlayctx,this.plot=new gi(e),this.useOverlay&&(this.overlay=document.createElement("canvas"),this.overlay.style=this.canvas.style,this.overlay.width=this.canvas.width,this.overlay.height=this.canvas.height,this.overlay.style.position="absolute",this.overlay.style.zIndex=this.canvas.style.zIndex+1,this.overlayctx=this.overlay.getContext("2d"),this.canvas.parentNode.insertAdjacentElement("afterbegin",this.overlay)),this.lines=[],this.linesY=[],this.linesSPS=[],this.axes=[],this.dividers=[],this.colors=[],this.lineSettings=[],this.axisscalar=1,this.nLines=0,this.nSecGraph=10,this.nMaxPointsPerSec=512,this.animationSpeed=6.9}return hi(r,[{key:"autoscale",value:function(t){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1,a=Math.max.apply(Math,ge(t)),o=Math.min.apply(Math,ge(t));this.lineSettings[i].ymax=a,this.lineSettings[i].ymin=o;var d=1/s,u;if(n){var b=Math.max(Math.abs(o),Math.abs(a));return u=d/b,t.map(function(m){return m*u+(d*(i+1)*2-1-d)})}else return u=d/(a-o),t.map(function(m){return 2*((m-o)*u-1/(2*s))+(d*(i+1)*2-1-d)})}},{key:"deinitPlot",value:function(){var t,i;(t=this.plot)===null||t===void 0||t.clear(),(i=this.plot)===null||i===void 0||i.removeAllLines()}},{key:"HSLToRGB",value:function(t,i,s){i/=100,s/=100;var n=(1-Math.abs(2*s-1))*i,a=n*(1-Math.abs(t/60%2-1)),o=s-n/2,d=0,u=0,b=0;return 0<=t&&t<60?(d=n,u=a,b=0):60<=t&&t<120?(d=a,u=n,b=0):120<=t&&t<180?(d=0,u=n,b=a):180<=t&&t<240?(d=0,u=a,b=n):240<=t&&t<300?(d=a,u=0,b=n):300<=t&&t<360&&(d=n,u=0,b=a),d=Math.round((d+o)*255),u=Math.round((u+o)*255),b=Math.round((b+o)*255),[d,u,b]}},{key:"initPlot",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:this.nSecGraph,n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:this.nMaxPointsPerSec;this.nSecGraph=s,this.nMaxPointsPerSec=n;var a=new we(1,1,1,.3),o=new we(1,1,1,1),d=1/t;this.nLines=t,this.lines=[],this.linesSPS=i;for(var u=0;u<t;u++){var b=this.HSLToRGB(360*(u/t)%360,100,50),m=new we(b[0],b[1],b[2],1);this.colors.push(m);var x=10;i[u]>n?x=s*n:x=i[u]*s,x=Math.floor(x);var P=new Oe(m,x);P.arrangeX(),this.lines.push(P),this.linesY.length<this.lines.length&&this.linesY.push(new Array(x)),this.plot.addDataLine(P);var R=d*(u+1)*2-1-d,_=new Oe(a,2);if(_.constY(R),_.arrangeX(),_.xy[2]=1,this.plot.addAuxLine(_),this.axes.push(_),u!==t-1){var F=d*(u+1)*2-1,T=new Oe(o,2);T.constY(F),T.arrangeX(),T.xy[2]=1,this.plot.addAuxLine(T),this.dividers.push(T)}this.lineSettings[u]={color:m,sps:i[u],ymin:-1,ymax:1}}return this.linesY.length>this.lines.length&&this.linesY.splice(this.lines.length),!0}},{key:"update",value:function(){this.plot.update()}},{key:"animate",value:function(){var t=this;this.update(),setTimeout(function(){requestAnimationFrame(t.animate)},this.animationSpeed)}}],[{key:"absmax",value:function(t){return Math.max(Math.abs(Math.min.apply(Math,ge(t))),Math.max.apply(Math,ge(t)))}},{key:"downsample",value:function(t,i){var s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1;if(t.length>i){for(var n=new Array(i),a=t.length/i,o=t.length-1,d=0,u=0,b=a;b<t.length;b+=a){var m=Math.round(b);m>o&&(m=o);for(var x=d;x<m;x++)n[u]+=t[x];n[u]/=(m-d)*s,u++,d=m}return n}else return t}},{key:"upsample",value:function(t,i){var s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,n=function(R,_,F){return(R+(_-R)*F)*s},a=new Array(i),o=new Number((t.length-1)/(i-1));a[0]=t[0];for(var d=1;d<i-1;d++){var u=d*o,b=new Number(Math.floor(u)).toFixed(),m=new Number(Math.ceil(u)).toFixed(),x=u-b;a[d]=n(t[b],t[m],x)}return a[i-1]=t[t.length-1],a}},{key:"test",value:function(t){var i=document.getElementById(t),s=globalThis.devicePixelRatio||1;i.width=i.clientWidth*s,i.height=i.clientHeight*s;var n=512,a=256,o=3,d=512,u=1,b=.5,m=.5,x=new Array(n*o),P=new Array(a*o),R=new r(i);R.initPlot(2,[n,a],o,d);function _(){for(var T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:512,l=arguments.length>2&&arguments[2]!==void 0?arguments[2]:10,h=c*l,p=l/h,g=0,w=0;w<c*l;w++){var C=Math.sin(Math.PI*g*u*Math.PI*2+performance.now()*.001),A=Math.random()-.5;T[w]=C*b+A*m,g+=p}}var F=function T(){_(x,n,o),_(P,a,o),R.updateAllLines([x,P],[n,a],!0),R.update(),requestAnimationFrame(T)};requestAnimationFrame(F)}}]),r}();class mt extends E{constructor(e={seconds:5,sps:512}){super(),this.data=[],this.spss=[],this.buffers=[],this.updateData=i=>{this.data=i},this.init=()=>{let i=this.data.length,s=60;this.sps=this.seconds*s,this.spss=Array.from({length:i},n=>this.sps),this.buffers=Array.from({length:i},n=>[]),this.util.initPlot(i,this.spss,this.seconds,s)},this.clear=()=>{this.util.plot.clear(),this.buffers=[],this.data=[]},this.draw=()=>{this.data.length!=this.buffers.length&&this.init(),this.data.forEach((i,s)=>{this.buffers[s].length===0?this.buffers[s]=Array.from({length:this.spss[s]},n=>i):(Array.isArray(i)||(i=[i]),i.forEach(()=>this.buffers[s].pop()),this.buffers[s].unshift(...i))})},this.canvas=document.createElement("canvas"),this.util=new fi(this.canvas,!1),this.sps=e.sps??512,this.seconds=e.seconds??5,this.backgroundColor=e.backgroundColor??"#69ce2b";let t=()=>{this.buffers.length>0&&(this.util.updateAllLines(this.buffers,this.spss,!0),this.util.update()),requestAnimationFrame(t)};requestAnimationFrame(t)}static get styles(){return $`

      canvas{
        background: black;
      }

      `}static get properties(){return{data:{type:Array,reflect:!0},sps:{type:Number,reflect:!0},seconds:{type:Number,reflect:!0},backgroundColor:{type:String,reflect:!0}}}willUpdate(e){e.has("data")&&this.draw(),e.has("seconds")&&(this.seconds||(this.seconds=.001),this.init())}render(){return this.canvas}}customElements.define("visualscript-timeseries",mt);class vt extends E{constructor(e={}){super(),this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.reset=!1,this.offset=!0,this.colorScale=["#000000","#030106","#06010c","#090211","#0c0215","#0e0318","#10031b","#12041f","#130522","#140525","#150628","#15072c","#16082f","#160832","#160936","#160939","#17093d","#170a40","#170a44","#170a48","#17094b","#17094f","#170953","#170956","#16085a","#16085e","#150762","#140766","#140669","#13066d","#110571","#100475","#0e0479","#0b037d","#080281","#050185","#020089","#00008d","#000090","#000093","#000096","#000099","#00009c","#00009f","#0000a2","#0000a5","#0000a8","#0000ab","#0000ae","#0000b2","#0000b5","#0000b8","#0000bb","#0000be","#0000c1","#0000c5","#0000c8","#0000cb","#0000ce","#0000d1","#0000d5","#0000d8","#0000db","#0000de","#0000e2","#0000e5","#0000e8","#0000ec","#0000ef","#0000f2","#0000f5","#0000f9","#0000fc","#0803fe","#2615f9","#3520f4","#3f29ef","#4830eb","#4e37e6","#543ee1","#5944dc","#5e49d7","#614fd2","#6554cd","#6759c8","#6a5ec3","#6c63be","#6e68b9","#6f6db4","#7072af","#7177aa","#717ba5","#7180a0","#71859b","#718996","#708e91","#6f928b","#6e9786","#6c9b80","#6aa07b","#68a475","#65a96f","#62ad69","#5eb163","#5ab65d","#55ba56","#4fbf4f","#48c347","#40c73f","#36cc35","#34ce32","#37cf31","#3ad130","#3cd230","#3fd32f","#41d52f","#44d62e","#46d72d","#48d92c","#4bda2c","#4ddc2b","#4fdd2a","#51de29","#53e029","#55e128","#58e227","#5ae426","#5ce525","#5ee624","#60e823","#62e922","#64eb20","#66ec1f","#67ed1e","#69ef1d","#6bf01b","#6df11a","#6ff318","#71f416","#73f614","#75f712","#76f810","#78fa0d","#7afb0a","#7cfd06","#7efe03","#80ff00","#85ff00","#89ff00","#8eff00","#92ff00","#96ff00","#9aff00","#9eff00","#a2ff00","#a6ff00","#aaff00","#adff00","#b1ff00","#b5ff00","#b8ff00","#bcff00","#bfff00","#c3ff00","#c6ff00","#c9ff00","#cdff00","#d0ff00","#d3ff00","#d6ff00","#daff00","#ddff00","#e0ff00","#e3ff00","#e6ff00","#e9ff00","#ecff00","#efff00","#f3ff00","#f6ff00","#f9ff00","#fcff00","#ffff00","#fffb00","#fff600","#fff100","#ffec00","#ffe700","#ffe200","#ffdd00","#ffd800","#ffd300","#ffcd00","#ffc800","#ffc300","#ffbe00","#ffb900","#ffb300","#ffae00","#ffa900","#ffa300","#ff9e00","#ff9800","#ff9300","#ff8d00","#ff8700","#ff8100","#ff7b00","#ff7500","#ff6f00","#ff6800","#ff6100","#ff5a00","#ff5200","#ff4900","#ff4000","#ff3600","#ff2800","#ff1500","#ff0004","#ff000c","#ff0013","#ff0019","#ff001e","#ff0023","#ff0027","#ff002b","#ff012f","#ff0133","#ff0137","#ff013b","#ff023e","#ff0242","#ff0246","#ff0349","#ff034d","#ff0450","#ff0454","#ff0557","#ff065b","#ff065e","#ff0762","#ff0865","#ff0969","#ff0a6c","#ff0a70","#ff0b73","#ff0c77","#ff0d7a","#ff0e7e","#ff0f81","#ff1085","#ff1188","#ff128c","#ff138f","#ff1493"],this.data=[],this.dynNormalize=!0,this.init=()=>{this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.offscreenctx.fillStyle="black",this.offscreenctx.fillRect(0,0,this.canvas.width,this.canvas.height)},this.updateData=t=>{this.data=t},this.onresize=()=>{let t=this.canvas.parentNode?.clientWidth,i=this.canvas.parentNode?.clientHeight;t&&(this.canvas.width=this.canvas.parentNode?.clientWidth,this.canvas.style.width=t.toString()),i&&(this.canvas.height=this.canvas.parentNode?.clientHeight,this.canvas.style.height=i.toString())},this.draw=()=>{var t=this.canvas.width,i=Math.floor(this.canvas.height),s=this.offscreenctx,n=s.canvas;s.drawImage(this.canvas,0,0,t,i);var a=[...Array.from(this.data)];if(a.length!==i){var o=a;a=this.interpolateArray(o,i)}var d=0;this.offset===!0&&(d=Math.pow(10,Math.floor(Math.log10(Math.min(...a))))),this.dynNormalize===!0&&(this.normalizeFactor=1/Math.pow(10,Math.floor(Math.log10(Math.max(...a))+.5)));for(var u=0;u<a.length;u++){var b=Math.floor((a[u]-d)*this.normalizeFactor*255);b>255?b=255:b<0&&(b=0),this.ctx.fillStyle=this.colorScale[b],this.ctx.fillRect(t-1,i-u,1,1)}this.reset===!1?(this.ctx.translate(-1,0),this.ctx.drawImage(n,0,0,t,i),this.ctx.setTransform(1,0,0,1,0,0)):this.reset=!1},this.max=e.max??1,this.normalizeFactor=e.max?1/e.max:1,this.backgroundColor=e.backgroundColor??"#69ce2b",window.addEventListener("resize",()=>{this.onresize()}),this.offscreen=new OffscreenCanvas(this.canvas.width,this.canvas.height),this.offscreenctx=this.offscreen.getContext("2d"),this.init(),this.data=e.data??new Array(this.canvas.height).fill(0),this.onresize()}static get styles(){return $`

      canvas{
        background: black;
      }

      `}static get properties(){return{max:{type:Number,reflect:!0},data:{type:Array,reflect:!0},backgroundColor:{type:String,reflect:!0}}}willUpdate(e){e.has("data")&&this.draw()}interpolateArray(e,t){var i=this.canvas.height/e.length,s=function(P,R,_){return(P+(R-P)*_)*i},n=new Array,a=new Number((e.length-1)/(t-1));n[0]=e[0];for(var o=1;o<t-1;o++){var d=o*a,u=new Number(Math.floor(d)),b=u.toFixed(),m=new Number(Math.ceil(d)).toFixed(),x=d-u;n[o]=s(e[b],e[m],x)}return n[t-1]=e[e.length-1],n}render(){return this.canvas}}customElements.define("visualscript-spectrogram",vt);let bt=["Hot","Cold","YlGnBu","YlOrRd","RdBu","Portland","Picnic","Jet","Greys","Greens","Electric","Earth","Bluered","Blackbody"];class Re extends E{constructor(e={}){super(),this.colorscale="Electric",this.div=document.createElement("div"),this.data=[],this.plotData=[],this.windowSize=300,this.binWidth=256,this.colorscales=bt,this.data=e.data??[[]],e.colorscale&&(this.colorscale=e.colorscale),this.plotData=[{x:[1,2],z:this.transpose(this.data),showscale:!0,colorscale:this.colorscale,type:"heatmap"}];var t={responsive:!0};e.Plotly?(this.Plotly=e.Plotly,this.Plotly.newPlot(this.div,this.plotData,t)):console.warn("<interactive-spectrogram>: Plotly instance not provided...")}static get styles(){return $`

      `}static get properties(){return{max:{type:Number,reflect:!0},data:{type:Array,reflect:!0},colorscale:{type:Object,reflect:!0},backgroundColor:{type:String,reflect:!0}}}transpose(e){return Object.keys(e[0]).map(function(t){return e.map(function(i){return i[t]})})}willUpdate(e){e.has("colorscale")&&(!Array.isArray(this.colorscale)&&!this.colorscales.includes(this.colorscale)&&(this.colorscale="Electric"),this.Plotly.restyle(this.div,"colorscale",this.colorscale))}render(){return this.div}}Re.colorscales=bt,customElements.define("visualscript-spectrogram-interactive",Re);var mi=Object.freeze({__proto__:null,TimeSeries:mt,Spectrogram:vt,InteractiveSpectrogram:Re}),vi=Object.freeze({__proto__:null,audio:ni,video:ai,data:mi});class yt extends E{constructor(e={brand:{},primary:{menu:[],options:[]},secondary:[]}){super(),this.getElement=t=>{switch(t.type){case"button":return v`<a href="${t.link}" target=${t.external?"_blank":"_self"}><button>${t.content}</button></a>`;default:return v`<a href="${t.link}" target=${t.external?"_blank":"_self"} class="decorate">${t.content}</a>`}},this.primary=e.primary??{menu:[],options:[]},this.secondary=e.secondary??[],this.color=e.color??"blue",this.brand=e.brand??{content:"My Brand"}}static get styles(){return $`

    
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

    `}static get properties(){return{primary:{type:Object},secondary:{type:Array,reflect:!0},brand:{type:Object},color:{type:String,reflect:!0}}}willUpdate(e){e.has("primary")}render(){return v`
      <header>
      ${this.secondary.length>0?v`<nav id="secondary">${this.secondary?.map(e=>this.getElement(e))}</nav>`:""}
      <nav id="primary">
      ${v`<div><a class="brand" target=${this.brand.external?"_blank":"_self"} href=${this.brand.link}>${this.brand.content?/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(this.brand.content)?v`<img src="${this.brand.content}"></img>`:v`<h1>${this.brand.content}</h1><slot></slot>`:v`<h1><slot></slot></h1>`}</a></div>`}
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
    `}}customElements.define("visualscript-nav",yt);class xt extends E{constructor(e={}){super(),this.progress=e.progress,this.color=e.color,this.background=e.background??"#f3f3f3",this.type=e.type??"default",this.showPercent=e.showPercent??!0,this.text=e.text,this.textBackground=e.textBackground,this.textColor=e.textColor,this.size=e.size??"13px",this.color||(this.type==="default"?this.color="blue":this.color="#7aff80")}static get styles(){return $`
    
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
    `}static get properties(){return{progress:{type:Number,reflect:!0},text:{type:String,reflect:!0},type:{type:String,reflect:!0},color:{type:String,reflect:!0},background:{type:String,reflect:!0},textBackground:{type:String,reflect:!0},textColor:{type:String,reflect:!0},size:{type:String,reflect:!0}}}willUpdate(e){}render(){let e=this.progress??0,t=this.text!=null?this.text:this.showPercent?`${(e*100).toFixed(1)}%`:"";switch(this.type){case"linear":return v`
            ${t?v`<div id="linear-text" style="background: ${this.textBackground}; color: ${this.textColor};">${t}</div>`:""}
            <div id="indicator" style="height:${this.size}; background:${this.background}; opacity:${e===1?1:""};">
                <div style="width:${e*100}%; background: ${this.color}"></div>
              </div>
            `;default:return v`
            <div class="loader-container" style="height:${this.size}; width:${this.size}; background: ${this.textBackground};">
              ${t?v`<span style="color: ${this.textColor};">${t}</span>`:""}
              <div class="loader active" style="border-color: ${this.color};"></div>
            </div>
            `}}}customElements.define("visualscript-loader",xt);let wt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},At=r=>(...e)=>({_$litDirective$:r,values:e});class $t{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}let bi=At(class extends $t{constructor(r){var e;if(super(r),r.type!==wt.ATTRIBUTE||r.name!=="style"||((e=r.strings)===null||e===void 0?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((e,t)=>{let i=r[t];return i==null?e:e+`${t=t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(r,[e]){let{style:t}=r.element;if(this.ct===void 0){this.ct=new Set;for(let i in e)this.ct.add(i);return this.render(e)}this.ct.forEach(i=>{e[i]==null&&(this.ct.delete(i),i.includes("-")?t.removeProperty(i):t[i]="")});for(let i in e){let s=e[i];s!=null&&(this.ct.add(i),i.includes("-")?t.setProperty(i,s):t[i]=s)}return J}});class Ie extends E{constructor(e={}){super(),this.primary=e.primary,this.backgroundColor=e.backgroundColor,this.size=e.size,this.onClick=e.onClick}static get styles(){return $`

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

    `}static get properties(){return{primary:{type:Boolean,reflect:!0},backgroundColor:{type:String,reflect:!0},size:{type:String,reflect:!0},onClick:{type:Function,reflect:!0}}}willUpdate(e){}render(){let e=this.primary?"storybook-button--primary":"storybook-button--secondary";return v`
      <button
           type="button"
            class=${["storybook-button",`storybook-button--${this.size||"medium"}`,e].join(" ")}
            style=${bi({backgroundColor:this.backgroundColor})}
            @click=${this.onClick}
      >
        <slot>Button</slot>
      </button>
    `}}customElements.define("visualscript-button",Ie);class St extends E{constructor(e={}){super(),this.toggle=()=>this.open=!this.open,this.open=e.open,this.header=e.header,this.footer=e.footer}static get styles(){return $`
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

    `}static get properties(){return{open:{type:Boolean,reflect:!0},header:{type:Object,reflect:!0},footer:{type:String,reflect:!0}}}willUpdate(e){}render(){return v`
      <div class="modal-content ${this.open?"open":""}">
        ${this.header?v`<div class="modal-header">
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
        ${this.footer?v`<div class="modal-footer">
          <span>${this.footer}</span>
        </div>`:""}
      </div>
      <visualscript-overlay .open=${this.open}></visualscript-overlay>
    `}}customElements.define("visualscript-modal",St);class kt extends E{static get styles(){return $`

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
    `}static get properties(){return{}}constructor(e={}){super()}render(){return v`

      <slot></slot>
    `}}customElements.define("visualscript-footer",kt);class _t extends E{constructor(e={}){super(),this.open=!1,this.open=e.open??!1}static get styles(){return $`

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

    `}static get properties(){return{open:{type:Boolean,reflect:!0}}}render(){return v`
      <div ?open=${!!this.open}>
        <slot></slot>
      </div>
    `}}customElements.define("visualscript-overlay",_t);var je;((je=window.HTMLSlotElement)===null||je===void 0?void 0:je.prototype.assignedElements)!=null;console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");let yi=At(class extends $t{constructor(r){var e;if(super(r),r.type!==wt.ATTRIBUTE||r.name!=="class"||((e=r.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter(e=>r[e]).join(" ")+" "}update(r,[e]){var t,i;if(this.et===void 0){this.et=new Set,r.strings!==void 0&&(this.st=new Set(r.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(let n in e)e[n]&&!(!((t=this.st)===null||t===void 0)&&t.has(n))&&this.et.add(n);return this.render(e)}let s=r.element.classList;this.et.forEach(n=>{n in e||(s.remove(n),this.et.delete(n))});for(let n in e){let a=!!e[n];a===this.et.has(n)||((i=this.st)===null||i===void 0?void 0:i.has(n))||(a?(s.add(n),this.et.add(n)):(s.remove(n),this.et.delete(n)))}return J}}),Ae={label:{type:String,reflect:!0},persist:{type:Boolean,reflect:!0},value:{type:String,reflect:!0},onChange:{type:Function,reflect:!0}},$e=r=>{r.persist&&r.label&&localStorage.setItem(r.label,String(r.value))},Se=r=>{if(r.value)return r.value;if(r.persist&&r.label)return localStorage.getItem(r.label)};class Ue extends E{constructor(e={}){super(),this.value=e.value??"",this.outline=e.outline??!1,this.disabled=e.disabled??!1,this.label=e.label,this.persist=e.persist,this.value=Se(e)}static get properties(){return Object.assign(Ae,{disabled:{type:Boolean,reflect:!0},outline:{type:Boolean,reflect:!0}})}willUpdate(e){e.has("value")&&$e(this)}static get styles(){return $`

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
`}render(){return v`
            <div class="form-group">
                <input
                class=${yi({outline:this.outline})}
                type="${this.type}"
                placeholder="${this.label}"
                .value=${this.value!="null"&&this.value!="undefined"?this.value:""}
                ?disabled="${this.disabled}"

                @change=${e=>{this.value=e.target.value}}
                />
                <label>${this.label}</label>
            </div>
        `}}customElements.define("visualscript-input",Ue);class Ct extends E{constructor(e={}){super(),this.getModal=()=>this.shadowRoot.querySelector("visualscript-modal"),e.items&&(this.items=e.items),window.onkeydown=t=>{switch(t.code){case"Enter":this.modal.open=!1;break;case"ArrowUp":console.log("Up!");break;case"ArrowDown":console.log("Down!");break;case"Escape":this.modal.open=!1;break}}}static get styles(){return $`

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

    `}static get properties(){return{placeholder:{type:String},items:{type:Object},value:{type:String,reflect:!0}}}render(){let e=new RegExp(this.value,"i");return v`
        <visualscript-button @click=${()=>{this.modal=this.getModal(),this.modal.toggle()}}>Search</visualscript-button>
        <visualscript-modal 
          .header=${v`<visualscript-input label="Search" @input=${t=>{this.value=t.composedPath()[0].value}}></visualscript-input>`}
          .footer=${v`<div id=commands>Enter to select. Up and Down Arrows to navigate. Esc to close.</div>`}
        >
        <div>${this.items.map(t=>{let i=!1;if(this.value?(t.tags&&t.tags.forEach(s=>{s.match(e)&&(i=!0)}),t.name.match(e)&&(i=!0)):i=!0,i)return v`<div><h3>${t.name}</h3><small>${t.tags??"No Tags"}</small></div>`})}</div>
        </visualscript-modal>
      `}}customElements.define("visualscript-search",Ct);class De extends E{constructor(e={}){super(),this.persist=!1,this.optionChecked="",this.optionHoveredIndex=-1,this.options=[],this.onChange=()=>{},this.add=t=>{this.options=[...this.options,t],this.render()},this.openSelectCustom=()=>{if(this.elements.elSelectCustom.classList.add("isActive"),this.elements.elSelectCustom.setAttribute("aria-hidden","false"),this.optionChecked){let t=this.elements.customOptsList.findIndex(i=>i.getAttribute("data-value")===this.optionChecked);this.updateCustomSelectHovered(t)}document.addEventListener("keydown",this.supportKeyboardNavigation)},this.closeSelectCustom=()=>{this.elements.elSelectCustom.classList.remove("isActive"),this.elements.elSelectCustom.setAttribute("aria-hidden","true"),this.updateCustomSelectHovered(-1),document.removeEventListener("keydown",this.supportKeyboardNavigation)},this.updateCustomSelectHovered=t=>{let i=this.elements.elSelectCustomOpts.children[this.optionHoveredIndex],s=this.elements.elSelectCustomOpts.children[t];i&&i.classList.remove("isHover"),s&&s.classList.add("isHover"),this.optionHoveredIndex=t},this.updateCustomSelectChecked=(t,i)=>{if(this.elements){i||(i=this.elements.elSelectCustomOpts.querySelectorAll(`[data-value="${t}"]`)[0]?.textContent);let s=this.optionChecked,n=this.elements.elSelectCustomOpts.querySelector(`[data-value="${s}"`),a=this.elements.elSelectCustomOpts.querySelector(`[data-value="${t}"`);n&&n.classList.remove("isActive"),a&&a.classList.add("isActive");let o=this.elements.elSelectCustom.children[0].children[0];o.textContent=i,this.optionChecked=t}},this.watchClickOutside=t=>{!this.contains(t.target)&&this.closeSelectCustom()},this.supportKeyboardNavigation=t=>{if(t.keyCode===40&&this.optionHoveredIndex<this.optionsCount-1&&(this.optionHoveredIndex,t.preventDefault(),this.updateCustomSelectHovered(this.optionHoveredIndex+1)),t.keyCode===38&&this.optionHoveredIndex>0&&(t.preventDefault(),this.updateCustomSelectHovered(this.optionHoveredIndex-1)),t.keyCode===13||t.keyCode===32){t.preventDefault();let i=this.elements.elSelectCustomOpts.children[this.optionHoveredIndex],s=i&&i.getAttribute("data-value");s&&(this.elements.elSelectNative.value=s,this.updateCustomSelectChecked(s,i.textContent)),this.closeSelectCustom()}t.keyCode===27&&this.closeSelectCustom()},this.options=e.options??[],e.onChange&&(this.onChange=e.onChange),e.label&&(this.label=e.label),e.persist&&(this.persist=e.persist),this.value=Se(e)}static get styles(){return $`

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
    `}static get properties(){return Object.assign({options:{type:Array,reflect:!0}},Ae)}willUpdate(e){if(e.has("value")&&$e(this),e.has("options")){let t=this.options[0]?.value??this.options[0];this.value=this.value??t}}updated(e){let t=this.shadowRoot.querySelectorAll(".js-selectNative")[0],i=this.shadowRoot.querySelectorAll(".js-selectCustom")[0],s=i.children[1],n=Array.from(s.children);this.optionsCount=n.length,this.elements={elSelectNative:t,elSelectCustom:i,elSelectCustomOpts:s,customOptsList:n},this.value&&this.updateCustomSelectChecked(this.value)}render(){return v`
      <div id=container>
      <select class="selectNative js-selectNative" aria-labelledby="${this.label}Label" 
      @change=${e=>{let t=e.target.value,i=this.elements.elSelectCustomOpts.querySelectorAll(`[data-value="${t}"]`)[0];this.updateCustomSelectChecked(t,i.textContent),this.value=e.target.value,this.onChange(e)}}>
      ${this.options.length===0?v`<slot></slot>`:this.options.map((e,t)=>(typeof e!="object"&&(e={value:e,text:e}),v`<option 
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
        ${this.options.map((e,t)=>(typeof e!="object"&&(e={value:e,text:e}),v` <div 
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
    `}}customElements.define("visualscript-select",De);class Be extends E{constructor(e={}){super(),this.onChange=()=>{},e.accept&&(this.accept=e.accept),e.onChange&&(this.onChange=e.onChange)}static get styles(){return $`

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
    
    `}static get properties(){return{accept:{type:String,reflect:!0},onChange:{type:Function,reflect:!0}}}render(){return v`
      <label for="fileupload" id="buttonlabel">
        <button aria-controls="filename" tabindex="0" @click=${()=>{let e=this.shadowRoot.querySelector("input[type=file]");e&&e.click()}}>Choose File</button>
      </label>
      <input type="file" id="fileupload" accept="${this.accept??""}" @change=${e=>{let t=e.target.files[0],i=this.shadowRoot.querySelector("input[type=text]");var s=t.name;i.value=s,i.placeholder=s,i.focus(),this.onChange(e)}}>
      <label for="filename" class="hide">
        uploaded file
      </label>
      <input type="text" id="filename" autocomplete="off" readonly placeholder="no file chosen">  
    `}}customElements.define("visualscript-file",Be);class Ne extends E{constructor(e={}){super(),this.persist=!1,this.onChange=()=>{},e.onChange&&(this.onChange=e.onChange),e.label&&(this.label=e.label),e.persist&&(this.persist=e.persist),this.value=Se(e)}static get styles(){return $`

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

    `}static get properties(){return Ae}willUpdate(e){e.has("value")&&$e(this)}render(){return v`
      <button class="switch" role="switch" aria-pressed="${String(this.value)}" aria-labelledby=${this.label} @click=${e=>{let t=e.target.getAttribute("aria-pressed")==="true";this.value=!t,e.target.setAttribute("aria-pressed",String(this.value)),this.onChange(e)}}>
        <div class="slider round"><div></div></div>
    </button>
    `}}customElements.define("visualscript-switch",Ne);class He extends E{constructor(e={}){super(),this.persist=!1,this.onChange=()=>{},this.onInput=()=>{},e.onChange&&(this.onChange=e.onChange),e.label&&(this.label=e.label),e.persist&&(this.persist=e.persist),this.value=Se(e)}static get styles(){return $`

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

    `}static get properties(){return Ae}willUpdate(e){e.has("value")&&$e(this)}render(){return v`
      <div class="wrapper">
        <input type="range" min="0" max="100" id="${this.label}" @change=${e=>{this.value=e.target.value,this.onChange(e)}} @input=${e=>{this.onInput(e)}}/>
        <output for="${this.label}">${this.value}</output>
        <label class="visually-hidden" for="${this.label}">${this.label}</label>
      </div>
    `}}customElements.define("visualscript-range",He);class Et extends E{constructor(e={target:{},header:"Object"}){super(),this.history=[],this.getActions=(t,i)=>{let s;return typeof i[t]=="object"&&(s=v`<visualscript-button primary=true size="small" @click="${()=>{this.history.push({parent:i,key:this.header}),this.target=i[t],this.header=t,this.mode=Array.isArray(i[t])?"plot":"view"}}">${Array.isArray(i[t])?v`Plot`:v`View`}</visualscript-button>`),v`
      <div class="actions">
            ${s}
      </div>
      `},this.getElement=(t,i)=>v`
        <div class="attribute separate">
        <div>
          <span class="name">${t}</span><br>
          <span class="value">${typeof i[t]=="object"?Object.keys(i[t]).length?i[t].constructor.name:v`Empty ${i[t].constructor.name}`:i[t]}</span>
        </div>
          ${this.getActions(t,i)}
        </div>`,this.target=e.target??{},this.header=e.header??"Object",this.mode=e.mode??"view"}static get styles(){return $`

    
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

    `}static get properties(){return{target:{type:Object,reflect:!0},header:{type:String,reflect:!0},mode:{type:String,reflect:!0}}}willUpdate(e){e.has("target")}render(){return v`
      <div>
        <div class="header separate">
          <span>${this.header}</span>
          ${this.history.length>0?v`<visualscript-button size="extra-small" @click="${()=>{let e=this.history.pop();this.header=e.key,this.target=e.parent}}">Go Back</visualscript-button>`:""}
        </div>
        <div class="container">
              ${this.mode==="view"?Object.keys(this.target)?.map(e=>this.getElement(e,this.target)):Object.keys(this.target)?.map(e=>this.getElement(e,this.target))}
        </div>
      </div>
    `}}customElements.define("visualscript-object-editor",Et);var Lt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Ft={exports:{}};(function(r){var e=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};var t=function(i){var s=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,n=0,a={},o={manual:i.Prism&&i.Prism.manual,disableWorkerMessageHandler:i.Prism&&i.Prism.disableWorkerMessageHandler,util:{encode:function c(l){return l instanceof d?new d(l.type,c(l.content),l.alias):Array.isArray(l)?l.map(c):l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(c){return Object.prototype.toString.call(c).slice(8,-1)},objId:function(c){return c.__id||Object.defineProperty(c,"__id",{value:++n}),c.__id},clone:function c(l,h){h=h||{};var p,g;switch(o.util.type(l)){case"Object":if(g=o.util.objId(l),h[g])return h[g];p={},h[g]=p;for(var w in l)l.hasOwnProperty(w)&&(p[w]=c(l[w],h));return p;case"Array":return g=o.util.objId(l),h[g]?h[g]:(p=[],h[g]=p,l.forEach(function(C,A){p[A]=c(C,h)}),p);default:return l}},getLanguage:function(c){for(;c;){var l=s.exec(c.className);if(l)return l[1].toLowerCase();c=c.parentElement}return"none"},setLanguage:function(c,l){c.className=c.className.replace(RegExp(s,"gi"),""),c.classList.add("language-"+l)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document&&1<2)return document.currentScript;try{throw new Error}catch(p){var c=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(p.stack)||[])[1];if(c){var l=document.getElementsByTagName("script");for(var h in l)if(l[h].src==c)return l[h]}return null}},isActive:function(c,l,h){for(var p="no-"+l;c;){var g=c.classList;if(g.contains(l))return!0;if(g.contains(p))return!1;c=c.parentElement}return!!h}},languages:{plain:a,plaintext:a,text:a,txt:a,extend:function(c,l){var h=o.util.clone(o.languages[c]);for(var p in l)h[p]=l[p];return h},insertBefore:function(c,l,h,p){p=p||o.languages;var g=p[c],w={};for(var C in g)if(g.hasOwnProperty(C)){if(C==l)for(var A in h)h.hasOwnProperty(A)&&(w[A]=h[A]);h.hasOwnProperty(C)||(w[C]=g[C])}var M=p[c];return p[c]=w,o.languages.DFS(o.languages,function(B,K){K===M&&B!=c&&(this[B]=w)}),w},DFS:function c(l,h,p,g){g=g||{};var w=o.util.objId;for(var C in l)if(l.hasOwnProperty(C)){h.call(l,C,l[C],p||C);var A=l[C],M=o.util.type(A);M==="Object"&&!g[w(A)]?(g[w(A)]=!0,c(A,h,null,g)):M==="Array"&&!g[w(A)]&&(g[w(A)]=!0,c(A,h,C,g))}}},plugins:{},highlightAll:function(c,l){o.highlightAllUnder(document,c,l)},highlightAllUnder:function(c,l,h){var p={callback:h,container:c,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};o.hooks.run("before-highlightall",p),p.elements=Array.prototype.slice.apply(p.container.querySelectorAll(p.selector)),o.hooks.run("before-all-elements-highlight",p);for(var g=0,w;w=p.elements[g++];)o.highlightElement(w,l===!0,p.callback)},highlightElement:function(c,l,h){var p=o.util.getLanguage(c),g=o.languages[p];o.util.setLanguage(c,p);var w=c.parentElement;w&&w.nodeName.toLowerCase()==="pre"&&o.util.setLanguage(w,p);var C=c.textContent,A={element:c,language:p,grammar:g,code:C};function M(K){A.highlightedCode=K,o.hooks.run("before-insert",A),A.element.innerHTML=A.highlightedCode,o.hooks.run("after-highlight",A),o.hooks.run("complete",A),h&&h.call(A.element)}if(o.hooks.run("before-sanity-check",A),w=A.element.parentElement,w&&w.nodeName.toLowerCase()==="pre"&&!w.hasAttribute("tabindex")&&w.setAttribute("tabindex","0"),!A.code){o.hooks.run("complete",A),h&&h.call(A.element);return}if(o.hooks.run("before-highlight",A),!A.grammar){M(o.util.encode(A.code));return}if(l&&i.Worker){var B=new Worker(o.filename);B.onmessage=function(K){M(K.data)},B.postMessage(JSON.stringify({language:A.language,code:A.code,immediateClose:!0}))}else M(o.highlight(A.code,A.grammar,A.language))},highlight:function(c,l,h){var p={code:c,grammar:l,language:h};if(o.hooks.run("before-tokenize",p),!p.grammar)throw new Error('The language "'+p.language+'" has no grammar.');return p.tokens=o.tokenize(p.code,p.grammar),o.hooks.run("after-tokenize",p),d.stringify(o.util.encode(p.tokens),p.language)},tokenize:function(c,l){var h=l.rest;if(h){for(var p in h)l[p]=h[p];delete l.rest}var g=new m;return x(g,g.head,c),b(c,g,l,g.head,0),R(g)},hooks:{all:{},add:function(c,l){var h=o.hooks.all;h[c]=h[c]||[],h[c].push(l)},run:function(c,l){var h=o.hooks.all[c];if(!(!h||!h.length))for(var p=0,g;g=h[p++];)g(l)}},Token:d};i.Prism=o;function d(c,l,h,p){this.type=c,this.content=l,this.alias=h,this.length=(p||"").length|0}d.stringify=function c(l,h){if(typeof l=="string")return l;if(Array.isArray(l)){var p="";return l.forEach(function(M){p+=c(M,h)}),p}var g={type:l.type,content:c(l.content,h),tag:"span",classes:["token",l.type],attributes:{},language:h},w=l.alias;w&&(Array.isArray(w)?Array.prototype.push.apply(g.classes,w):g.classes.push(w)),o.hooks.run("wrap",g);var C="";for(var A in g.attributes)C+=" "+A+'="'+(g.attributes[A]||"").replace(/"/g,"&quot;")+'"';return"<"+g.tag+' class="'+g.classes.join(" ")+'"'+C+">"+g.content+"</"+g.tag+">"};function u(c,l,h,p){c.lastIndex=l;var g=c.exec(h);if(g&&p&&g[1]){var w=g[1].length;g.index+=w,g[0]=g[0].slice(w)}return g}function b(c,l,h,p,g,w){for(var C in h)if(!(!h.hasOwnProperty(C)||!h[C])){var A=h[C];A=Array.isArray(A)?A:[A];for(var M=0;M<A.length;++M){if(w&&w.cause==C+","+M)return;var B=A[M],K=B.inside,Nt=!!B.lookbehind,Ht=!!B.greedy,wi=B.alias;if(Ht&&!B.pattern.global){var Ai=B.pattern.toString().match(/[imsuy]*$/)[0];B.pattern=RegExp(B.pattern.source,Ai+"g")}for(var Yt=B.pattern||B,N=p.next,W=g;N!==l.tail&&!(w&&W>=w.reach);W+=N.value.length,N=N.next){var oe=N.value;if(l.length>c.length)return;if(!(oe instanceof d)){var _e=1,G;if(Ht){if(G=u(Yt,W,c,Nt),!G||G.index>=c.length)break;var Ce=G.index,$i=G.index+G[0].length,Q=W;for(Q+=N.value.length;Ce>=Q;)N=N.next,Q+=N.value.length;if(Q-=N.value.length,W=Q,N.value instanceof d)continue;for(var fe=N;fe!==l.tail&&(Q<$i||typeof fe.value=="string");fe=fe.next)_e++,Q+=fe.value.length;_e--,oe=c.slice(W,Q),G.index-=W}else if(G=u(Yt,0,oe,Nt),!G)continue;var Ce=G.index,Ee=G[0],Ve=oe.slice(0,Ce),qt=oe.slice(Ce+Ee.length),Ze=W+oe.length;w&&Ze>w.reach&&(w.reach=Ze);var Le=N.prev;Ve&&(Le=x(l,Le,Ve),W+=Ve.length),P(l,Le,_e);var Si=new d(C,K?o.tokenize(Ee,K):Ee,wi,Ee);if(N=x(l,Le,Si),qt&&x(l,N,qt),_e>1){var Je={cause:C+","+M,reach:Ze};b(c,l,h,N.prev,W,Je),w&&Je.reach>w.reach&&(w.reach=Je.reach)}}}}}}function m(){var c={value:null,prev:null,next:null},l={value:null,prev:c,next:null};c.next=l,this.head=c,this.tail=l,this.length=0}function x(c,l,h){var p=l.next,g={value:h,prev:l,next:p};return l.next=g,p.prev=g,c.length++,g}function P(c,l,h){for(var p=l.next,g=0;g<h&&p!==c.tail;g++)p=p.next;l.next=p,p.prev=l,c.length-=g}function R(c){for(var l=[],h=c.head.next;h!==c.tail;)l.push(h.value),h=h.next;return l}if(!i.document)return i.addEventListener&&(o.disableWorkerMessageHandler||i.addEventListener("message",function(c){var l=JSON.parse(c.data),h=l.language,p=l.code,g=l.immediateClose;i.postMessage(o.highlight(p,o.languages[h],h)),g&&i.close()},!1)),o;var _=o.util.currentScript();_&&(o.filename=_.src,_.hasAttribute("data-manual")&&(o.manual=!0));function F(){o.manual||o.highlightAll()}if(!o.manual){var T=document.readyState;T==="loading"||T==="interactive"&&_&&_.defer?document.addEventListener("DOMContentLoaded",F):window.requestAnimationFrame?window.requestAnimationFrame(F):window.setTimeout(F,16)}return o}(e);r.exports&&(r.exports=t),typeof Lt<"u"&&(Lt.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(i){i.type==="entity"&&(i.attributes.title=i.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(s,n){var a={};a["language-"+n]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[n]},a.cdata=/^<!\[CDATA\[|\]\]>$/i;var o={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:a}};o["language-"+n]={pattern:/[\s\S]+/,inside:t.languages[n]};var d={};d[s]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return s}),"i"),lookbehind:!0,greedy:!0,inside:o},t.languages.insertBefore("markup","cdata",d)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(i,s){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+i+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[s,"language-"+s],inside:t.languages[s]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,function(i){var s=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;i.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+s.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+s.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+s.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:s,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},i.languages.css.atrule.inside.rest=i.languages.css;var n=i.languages.markup;n&&(n.tag.addInlined("style","css"),n.tag.addAttribute("style","css"))}(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var i="Loading\u2026",s=function(_,F){return"\u2716 Error "+_+" while fetching file: "+F},n="\u2716 Error: File does not exist or is empty",a={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},o="data-src-status",d="loading",u="loaded",b="failed",m="pre[data-src]:not(["+o+'="'+u+'"]):not(['+o+'="'+d+'"])';function x(_,F,T){var c=new XMLHttpRequest;c.open("GET",_,!0),c.onreadystatechange=function(){c.readyState==4&&(c.status<400&&c.responseText?F(c.responseText):c.status>=400?T(s(c.status,c.statusText)):T(n))},c.send(null)}function P(_){var F=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(_||"");if(F){var T=Number(F[1]),c=F[2],l=F[3];return c?l?[T,Number(l)]:[T,void 0]:[T,T]}}t.hooks.add("before-highlightall",function(_){_.selector+=", "+m}),t.hooks.add("before-sanity-check",function(_){var F=_.element;if(F.matches(m)){_.code="",F.setAttribute(o,d);var T=F.appendChild(document.createElement("CODE"));T.textContent=i;var c=F.getAttribute("data-src"),l=_.language;if(l==="none"){var h=(/\.(\w+)$/.exec(c)||[,"none"])[1];l=a[h]||h}t.util.setLanguage(T,l),t.util.setLanguage(F,l);var p=t.plugins.autoloader;p&&p.loadLanguages(l),x(c,function(g){F.setAttribute(o,u);var w=P(F.getAttribute("data-range"));if(w){var C=g.split(/\r\n?|\n/g),A=w[0],M=w[1]==null?C.length:w[1];A<0&&(A+=C.length),A=Math.max(0,Math.min(A-1,C.length)),M<0&&(M+=C.length),M=Math.max(0,Math.min(M,C.length)),g=C.slice(A,M).join(`
`),F.hasAttribute("data-start")||F.setAttribute("data-start",String(A+1))}T.textContent=g,t.highlightElement(T)},function(g){F.setAttribute(o,b),T.textContent=g})}}),t.plugins.fileHighlight={highlight:function(F){for(var T=(F||document).querySelectorAll(m),c=0,l;l=T[c++];)t.highlightElement(l)}};var R=!1;t.fileHighlight=function(){R||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),R=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(Ft);var xi=Ft.exports;class Pt extends E{constructor(e={instance:{},header:"Object"}){super(),this.history=[],this.getControls=()=>v`
      <div class="actions">
            ${["Save","Reset","Close"].map((i,s)=>v`<visualscript-button  size="small" @click="${()=>{console.log("Clicked",i,s)}}">${i}</visualscript-button>`)}
      </div>
      `,this.text=t=>{let i=this.shadowRoot.getElementById("highlight");if(i){let s=i.querySelector("code"),n=t.replace(new RegExp("&","g"),"&amp").replace(new RegExp("<","g"),"&lt;");s.innerHTML=n,xi.highlightElement(s)}},this.scroll=t=>{let i=this.shadowRoot.getElementById("highlight");i&&(i.scrollTop=t.scrollTop,i.scrollTop<t.scrollTop&&(t.scrollTop=i.scrollTop),i.scrollLeft=t.scrollLeft)},this.instance=e.instance??{},this.header=e.header??"Object",this.mode=e.mode??"view"}static get styles(){return $`

    
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
  

    `}static get properties(){return{instance:{type:Object,reflect:!0},header:{type:String,reflect:!0},mode:{type:String,reflect:!0}}}willUpdate(e){e.has("instance")}render(){let e="javascript";return v`
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
    `}}customElements.define("visualscript-code-editor",Pt);class Tt extends E{constructor(e={graph:{},header:"Object"}){super(),this.history=[],this.getActions=(t,i)=>{let s;return typeof i[t]=="object"&&(s=v`<visualscript-button primary=true size="small" @click="${()=>{this.history.push({parent:i,key:this.header}),this.graph=i[t],this.header=t,this.mode=Array.isArray(i[t])?"plot":"view"}}">${Array.isArray(i[t])?v`Plot`:v`View`}</visualscript-button>`),v`
      <div class="actions">
            ${s}
      </div>
      `},this.getElement=(t,i)=>v`
        <div class="attribute separate">
        <div>
          <span class="name">${t}</span><br>
          <span class="value">${typeof i[t]=="object"?Object.keys(i[t]).length?i[t].constructor.name:v`Empty ${i[t].constructor.name}`:i[t]}</span>
        </div>
          ${this.getActions(t,i)}
        </div>`,this.graph=e.graph??{},this.header=e.header??"Object",this.mode=e.mode??"view"}static get styles(){return $`

    
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

    `}static get properties(){return{graph:{type:Object,reflect:!0},header:{type:String,reflect:!0},mode:{type:String,reflect:!0}}}willUpdate(e){e.has("graph")}render(){return v`
      <div>
        <div class="header separate">
          <span>${this.header}</span>
          ${this.history.length>0?v`<visualscript-button size="extra-small" @click="${()=>{let e=this.history.pop();this.header=e.key,this.graph=e.parent}}">Go Back</visualscript-button>`:""}
        </div>
        <div class="container">
              ${this.mode==="view"?Object.keys(this.graph)?.map(e=>this.getElement(e,this.graph)):Object.keys(this.graph)?.map(e=>this.getElement(e,this.graph))}
        </div>
      </div>
    `}}customElements.define("visualscript-graph-editor",Tt);class zt extends E{static get styles(){return $`
    :host {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    :host * {
      
      box-sizing: border-box;
      
    }
    `}static get properties(){return{}}constructor(e={target:{},header:"Object"}){super()}render(){return v`

      <slot></slot>
    `}}customElements.define("visualscript-device-editor",zt);class Mt extends E{static get styles(){return $`
    :host {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    :host * {
      
      box-sizing: border-box;
      
    }
    `}static get properties(){return{}}constructor(e={target:{},header:"Object"}){super()}render(){return v`

      <slot></slot>
    `}}customElements.define("visualscript-session-editor",Mt);class Ye extends E{constructor(e={}){super(),this.apps=new Map,this.open=e.open??!0,this.closeHandler=e.closeHandler??(()=>{}),this.toggle=typeof e.toggle=="string"?document.getElementById(e.toggle):e.toggle}static get styles(){return $`
    
    :host {
      width: 100%;
      height: 100%;
    }


    :host([global]) slot {
      position: absolute;
      top: 0;
      left; 0;
      opacity: 0;
      pointer-events: none;
    }

    :host([open]) #close {
      display: block;
    }

    :host * {
      
      box-sizing: border-box;
      
    }

    :host, slot {
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
      :host, slot {
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
    `}static get properties(){return{open:{type:Boolean,reflect:!0},closeHandler:{type:Function,reflect:!0},global:{type:Boolean,reflect:!0}}}render(){if(this.global?this.classList.add("global"):this.classList.remove("global"),this.global){let i=document.querySelectorAll("visualscript-app");for(var e=0;e<i.length;e++){let s=i[e];this.apps.has(s.name)||this.apps.set(s.name,s)}}this.open?this.classList.add("open"):(this.classList.remove("open"),this.dispatchEvent(new CustomEvent("close"))),this.main=this.querySelector("visualscript-main"),this.footer=this.querySelector("visualscript-footer"),this.nav=this.querySelector("visualscript-nav"),this.sidebar=this.querySelector("visualscript-sidebar");let t=()=>{this.open=!0,this.apps.values().next().value.toggle.shadowRoot.querySelector("button").click()};return this.toggle&&(this.toggle.onclick=t),v`
      ${this.global&&!this.toggle?v`<div id="dashboard-toggle" @click=${t}>Edit</div>`:""}
      ${this.global?v`<visualscript-button id='close' secondary size="small" @click=${()=>this.open=!1}>Close</visualscript-button>`:""}
      <slot>
      </slot>
    `}}customElements.define("visualscript-dashboard",Ye);let Ot={name:{type:String,reflect:!0}};class qe extends E{constructor(e){super(),this.to=e,this.render()}static get styles(){return $`

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
    `}static get properties(){return Ot}render(){return v`
      <button class="${this.selected?"selected":""}"  @click=${e=>{this.to.on(e),this.to.dashboard.main.shadowRoot.querySelector("visualscript-tab-bar")?(this.to.toggle.shadowRoot.querySelector("button").classList.add("selected"),this.to.style.display==="none"&&this.to.dashboard.main.tabs.forEach(s=>{s!=this.to?(s.toggle.shadowRoot.querySelector("button").classList.remove("selected"),s.style.display="none",s.off(e)):s.style.display=""})):console.warn("No TabBar instance in the global Main");let i=this.to.dashboard;if(i){let s=i.querySelector("visualscript-sidebar");if(s){for(let n=0;n<s.children.length;n++)s.removeChild(s.children[n]);s.insertAdjacentElement("beforeend",this.to.controlPanel),s.render()}}}}>${this.to.name??"Tab"} <span>${this.to.type}</span></button>
    `}}customElements.define("visualscript-tab-toggle",qe);class Ge extends E{constructor(e={}){super(),this.label="Control",this.type="button",this.persist=!1,this.options=[],this.onChange=()=>{},this.willUpdate=t=>{t.forEach((i,s)=>{this.element&&(this.element[s]=this[s])})},e.label&&(this.label=e.label),e.type&&(this.type=e.type),e.park&&(this.park=e.park),e.persist&&(this.persist=e.persist),e.options&&(this.options=e.options),e.value&&(this.value=e.value),e.onChange&&(this.onChange=e.onChange),e.accept&&(this.accept=e.accept),e.onClick&&(this.onClick=e.onClick),e.primary&&(this.primary=e.primary),e.backgroundColor&&(this.backgroundColor=e.backgroundColor),e.size&&(this.size=e.size)}static get styles(){return $`

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

    `}static get properties(){return{label:{type:String,reflect:!0},type:{type:String,reflect:!0},persist:{type:Boolean,reflect:!0},park:{type:Boolean,reflect:!0},value:{type:Object,reflect:!0},options:{type:Object,reflect:!0},onChange:{type:Object,reflect:!0},accept:{type:String,reflect:!0},primary:{type:Boolean,reflect:!0},backgroundColor:{type:String,reflect:!0},size:{type:String,reflect:!0},onClick:{type:Object,reflect:!0}}}render(){return this.type==="select"?this.element=new De(this):this.type==="file"?this.element=new Be(this):this.type==="switch"?this.element=new Ne(this):this.type==="range"?this.element=new He(this):["input","text","number"].includes(this.type)?this.element=new Ue(this):this.element=new Ie(this),v`<div><h5>${this.label}</h5>${this.element}</div><slot></slot>`}updated(e){let i=this.shadowRoot.querySelector("slot").assignedNodes();this.type==="button"&&i.length&&i.forEach(s=>this.element.appendChild(s))}}customElements.define("visualscript-control",Ge);let Xe={name:{type:String,reflect:!0},controls:{type:Array,reflect:!0},on:{type:Function,reflect:!0},off:{type:Function,reflect:!0}};class ke extends E{constructor(e={}){super(),this.controls=[],this.on=()=>{},this.off=()=>{},this.type="tab",this.addControl=i=>{this.controlPanel.appendChild(i)},this.updated=()=>{this.querySelectorAll("visualscript-control").forEach(s=>{this.type==="app"?s.park=!0:s.park||this.addControl(s)})},e.name&&(this.name=e.name),e.controls&&(this.controls=e.controls),e.on&&(this.on=e.on),e.off&&(this.off=e.off);let t=document.body.querySelectorAll("visualscript-dashboard");this.dashboard=Array.from(t).find(i=>i.parentNode===document.body)??new Ye,this.dashboard.global=!0,this.dashboard.open=!1,this.toggle=new qe(this),this.dashboard.addEventListener("close",i=>{this.off(i)})}static get styles(){return $`

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
    `}static get properties(){return Xe}willUpdate(e){e.has("controls")&&(this.controlPanel=document.createElement("div"),this.controls.forEach(t=>{this.addControl(new Ge(t))}))}render(){return v`
      <slot></slot>
    `}}customElements.define("visualscript-tab",ke);class Rt extends ke{constructor(e={}){let t=Object.assign({on:i=>{this.dashboard.main.appendChild(this),e.on instanceof Function&&e.on(i)},off:i=>{this.parent.appendChild(this),e.off instanceof Function&&e.off(i)}},e);t.name=e.name,super(t),this.name=e.name,this.type="app",this.parent=this.parentNode}static get properties(){return Object.assign({},Xe)}render(){return parent||(this.parent=this.parentNode),v`
        <slot></slot>
      `}}customElements.define("visualscript-app",Rt);let It={};class jt extends E{static get styles(){return $`

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
    `}static get properties(){return It}constructor(e={}){super()}render(){return v`
      <slot></slot>
    `}}customElements.define("visualscript-tab-bar",jt);class Ut extends E{constructor(e={target:{},header:"Object"}){super(),this.tabs=new Map,this.getTabs=()=>{let t=[];if(this.parentNode?.global){let s=document.querySelectorAll("visualscript-app");for(var i=0;i<s.length;i++)t.includes(s[i])||t.push(s[i])}for(var i=0;i<this.children.length;i++){let n=this.children[i];n instanceof ke&&t.push(n)}return t.forEach(s=>this.tabs.set(s.name,s)),t}}static get styles(){return $`

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
    `}static get properties(){return{tabs:{type:Object}}}render(){let t=this.getTabs().map((i,s)=>(s!==0&&(i.style.display="none"),i.toggle));return v`
      <visualscript-tab-bar style="${t.length<1?"display: none;":""}">${t}</visualscript-tab-bar>
      <slot></slot>
    `}}customElements.define("visualscript-main",Ut);class Dt extends E{constructor(e={}){super(),this.things=[],this.search=!1,this.load=(t,i)=>(t.style.display="none",v`<div id=tile @click=${()=>{console.log("clicked!")}}>
        <div>
          <h3>${t.name}</h3>
          <p>Item #${i}.</p>
        <div>
      </div>`),this.getThings=()=>{this.things=[];for(var t=0;t<this.children.length;t++){let i=this.children[t];i.name&&this.things.push(i)}return this.things},e.search&&(this.search=e.search)}static get styles(){return $`

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
    `}static get properties(){return{}}render(){return this.getThings(),v`
      <visualscript-search .items=${this.things}></visualscript-search>
      <div id=things>
      ${this.things.map(this.load)}
      </div>
      <section>
        <slot></slot>
      </section>
    `}}customElements.define("visualscript-gallery",Dt);let We=600;class Bt extends E{constructor(e={}){super(),this.closed=e.closed}static get styles(){return $`

    
    :host {

      --collapse-width: ${We}px;
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

    :host(.selected) > #main {
        width: 0px;
        overflow: hidden;
    }

    :host(.selected) > #toggle {
      width: var(--final-toggle-width);
    }

    #toggle:hover { 
      background: var(--blue-spiral)
    }


    #toggle {
      height: 100%;
      width: 10px;
      display: block;
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

    /* FLIP SIDEBAR SELECTED MEANING */
    @media only screen and (max-width: ${We}px) {

      :host > #main {
          width: 0px;
          overflow: hidden;
      }

      :host(.selected) > #main {
        width: auto;
        overflow: auto;
      }


      :host(.selected) > #toggle {
        width: 10px;
      }
      

      :host > #toggle {
        width: var(--final-toggle-width);
      }

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

    `}static get properties(){return{closed:{type:Boolean,reflect:!0}}}render(){return this.closed&&window.innerWidth>We&&this.classList.add("selected"),v`
        ${this.children?.length?v`<button id=toggle @click=${()=>{this.classList.toggle("selected")}}></button>`:""}
        <div id=main>
        ${this.children?.length?v`<h4 id=header>Controls</h4>`:""}
          <div id=controls>
            <slot></slot>
          </div>
        </div>
      `}}customElements.define("visualscript-sidebar",Bt),y.App=Rt,y.Button=Ie,y.CodeEditor=Pt,y.Control=Ge,y.Dashboard=Ye,y.DeviceEditor=zt,y.File=Be,y.Footer=kt,y.Gallery=Dt,y.GraphEditor=Tt,y.Input=Ue,y.Loader=xt,y.Main=Ut,y.Modal=St,y.Nav=yt,y.ObjectEditor=Et,y.Overlay=_t,y.Range=He,y.Search=Ct,y.Select=De,y.SessionEditor=Mt,y.Sidebar=Bt,y.Switch=Ne,y.Tab=ke,y.TabBar=jt,y.TabBarPropsLit=It,y.TabPropsLit=Xe,y.TabToggle=qe,y.TabTogglePropsLit=Ot,y.streams=vi,Object.defineProperty(y,"__esModule",{value:!0})});var me=class{get in(){return this.nodes[0]}constructor(f){this.context=null,this.info=f,this.nodes=[],this.analyser=null,this.out=null,this.canListen=!1,this.analyses={},this.integrations={}}analyse=()=>{for(let f in this.analyses)this.analyses[f].output=this.analyses[f].function();for(let f in this.integrations)this.integrations[f].output=this.integrations[f].function()};initializeContext=()=>{if(!this.context){if(setInterval(this.analyse,50),this.context=new(window.AudioContext||window.webkitAudioContext),this.info.minFreq){let f=this.context.createBiquadFilter();this.nodes.push(f),f.type="highpass",f.frequency.value=this.info.minFreq}if(this.info.maxFreq){let f=this.context.createBiquadFilter();this.nodes.push(f),f.type="lowpass",f.frequency.value=this.info.maxFreq,this.nodes[this.nodes.length-1].connect(f)}this.analyser=this.createAnalyser(),this.nodes[this.nodes.length-1].connect(this.analyser),this.out=this.context.createGain(),this.out.gain.value=1,this.out.connect(this.context.destination)}};createAnalyser=(f=this.context)=>{let S=f.createAnalyser();return S.smoothingTimeConstant=this.info.smoothingTimeConstant,S.fftSize=this.info.fftSize,S.minDecibels=this.info.minDecibels,S.maxDecibels=this.info.maxDecibels,S};cloneAudioBuffer=f=>{let S=new AudioBuffer({length:f.length,numberOfChannels:f.numberOfChannels,sampleRate:f.sampleRate});for(let k=0;k<S.numberOfChannels;++k){let L=f.getChannelData(k);S.copyToChannel(L,k)}return S};fft=function(f,S,k){let L=new OfflineAudioContext(1,f.length,this.context.sampleRate),z=L.createScriptProcessor(1024,1,1);z.connect(L.destination);let $=this.createAnalyser(L),O=L.createBufferSource();O.connect($);let H=[];z.onaudioprocess=function(D){let j=new Uint8Array($.frequencyBinCount);$.getByteFrequencyData(j),typeof S=="function"&&S(j),H.push(j)},$.connect(z),O.buffer=f,O.onended=function(D){typeof k=="function"&&k(H)},O.start(),L.startRendering().catch(D=>console.log("Rendering failed: "+D))};addSource=(f,S=()=>{})=>{f.connect(this.in);let k=f.channelCount??f.buffer?.numberOfChannels;if(k>1){var L=this.context.createChannelSplitter(k);this.analyser.connect(L);var z=this.context.createChannelMerger(k);for(let U=0;U<k;U++){let V=S();V.container.insertAdjacentHTML("afterbegin",`<h3>${U==0?"Left":"Right"} Channel </h3>`);let q=this.context.createGain();q.gain.setValueAtTime(1,this.context.currentTime);let X=this.createAnalyser();L.connect(X,U),X.connect(q),q.connect(z,0,U),this.addAnalysis(X,"fft",V.spectrogram,this.info.onData)}let $=(U,V)=>U.map((q,X)=>Math.abs(q-V[X])),O=S();O.container.insertAdjacentHTML("afterbegin","<h3>Additive</h3>");let H=(U,V)=>U.map((q,X)=>q+V[X]);this.integrate("additive",[0,1],U=>H(U[0].frequencies,U[1].frequencies),O.spectrogram,"data");let D=S();D.container.insertAdjacentHTML("afterbegin","<h3>Difference</h3>"),this.integrate("difference",[0,1],U=>$(U[0].frequencies,U[1].frequencies),D.spectrogram,"data");let j=this.context.createGain();z.connect(j),j.connect(this.out),this.canListen?j.gain.value=1:j.gain.value=0}else{let $=S(),O=this.context.createGain();this.analyser.connect(O),O.connect(this.out),this.canListen?O.gain.value=1:O.gain.value=0,this.addAnalysis(this.analyser,"fft",$.spectrogram)}video&&(video.onended=()=>{f.disconnect()}),f.start instanceof Function&&f.start()};addAnalysis=(f,S,k,L=()=>{})=>{let z=Object.keys(this.analyses).length,$=()=>{};switch(S){case"fft":let O=new Uint8Array(f.frequencyBinCount);$=()=>{f.getByteFrequencyData(O);let D=Array.from(O);k.updateData(D);let j={frequencies:D};return L(j,z),j};break;case"raw":let H=new Uint8Array(1);$=()=>{f.getByteTimeDomainData(H);let D=Array.from(H);k.updateData([D]);let j={timeseries:D};return L(j,z),j};break}this.analyses[z]={function:$,output:null}};integrate=(f,S,k=$=>{},L,z)=>{this.integrations[f]={function:()=>{let $=k(S.map(O=>this.analyses[O].output));L[z]=$},output:null}};listen=(f=!this.canListen)=>{this.canListen=f}};var Ni=document.getElementById("app"),Hi=document.getElementById("data"),ki=document.getElementById("start"),le=document.getElementById("in"),Ke=document.getElementById("out"),te=document.getElementById("video"),_i=document.getElementById("files"),Li=document.getElementById("main"),Gt=document.getElementById("videos"),Ci=document.getElementById("analyses"),Ei=document.getElementById("design"),Li=document.getElementById("volume"),Fi=document.getElementById("colorscale");Fi.options=visualscript.streams.data.InteractiveSpectrogram.colorscales;var Fe=new visualscript.streams.data.InteractiveSpectrogram({Plotly});Ei.insertAdjacentElement("beforeend",Fe);colorscale.value=Fe.colorscale;colorscale.onChange=y=>{Fe.colorscale=y.target.value};var et=document.querySelector("visualscript-overlay"),ve=document.createElement("div");et.insertAdjacentElement("beforeend",ve);ve.style=`
  width: 100%;
  height: 100%;
  display: flex;
  align-items:center;
  justify-content: center;
  font-size:170%;
  font-weight: bold;
  font-family: sans-serif;
`;var Pi=Math.pow(2,11),Ti=7e3,zi=0,Mi={smoothingTimeConstant:.2,fftSize:Pi,minDecibels:-127,maxDecibels:0,minFreq:Ti,maxFreq:zi,onData:(y,f)=>{if(f===0){let S=0;for(let L of y.frequencies)S+=L;let k=S/y.frequencies.length;volume.volume=k/(Y.info.maxDecibels-Y.info.minDecibels)}}},Y=new me(Mi);navigator.mediaDevices.enumerateDevices().then(Oi);var Qe={};function Oi(y){for(var f=0;f!==y.length;++f){var S=y[f],k=document.createElement("option");k.value=S.deviceId,S.kind==="audioinput"?(k.text=S.label||"Microphone "+(le.options.length+1),le.options=[...le.options,k]):S.kind==="audiooutput"?(k.text=S.label||"Speaker "+(Ke.options.length+1),Ke.options=[...Ke.options,k]):S.kind==="videoinput"&&(k.text=S.label||"Camera "+(te.options.length+1),te.options=[...te.options,k])}}var Xt=(y,f={})=>{let S=document.createElement("div");return S.classList.add("container"),Ci.insertAdjacentElement("beforeend",S),f.video&&(f.stream?(f.video.srcObject=f.stream,f.video.controls=!0,f.video.muted=!0):f.video.controls=!0,f.video.autoplay=!0),Qe[y]={container:S,video:f.video,stream:f.stream,spectrogram:new visualscript.streams.data.Spectrogram},S.insertAdjacentElement("beforeend",Qe[y].spectrogram),Qe[y]},be=0;_i.onChange=async y=>{Y.initializeContext(),be=0;for(let f of y.target.files){let S=f.type.split("/")[0],k,L;S==="video"?(L=document.createElement("video"),L.src=URL.createObjectURL(f),k=Y.context.createMediaElementSource(L)):k=await Ri(f),L&&Gt.insertAdjacentElement("beforeend",L),Y.addSource(k,()=>{let z=Xt(be,{video:L});return be++,z})}};ki.onClick=()=>{Y.initializeContext(),Y.listen(!1),console.log(le.element.value,te.element.value,te.element);let y={audio:{},video:{}};te.element.value&&(y.video.deviceId=te.element.value),le.element.value&&(y.audio.deviceId=le.element.value),navigator.mediaDevices.getUserMedia(y).then(f=>{let S=document.createElement("video"),k=Y.context.createMediaStreamSource(f);Gt.insertAdjacentElement("beforeend",S),Y.addSource(k,()=>{let L=Xt(be,{video:S,stream:f});return be++,L})})};var Ri=y=>new Promise((f,S)=>{let k=new FileReader;k.onload=z=>{ve.innerHTML="Decoding audio data from file...",et.open=!0,Y.context.decodeAudioData(z.target.result,$=>{ve.innerHTML="Audio decoded! Analysing audio data...",Y.fft($,null,O=>{Fe.data=O.slice(0,5e3),ve.innerHTML="Analysis complete!",et.open=!1;let H=Y.context.createBufferSource();H.buffer=$,f(H)})})};function L(z){console.log(`${z.type}: ${z.loaded} bytes transferred
`),z.type}k.addEventListener("error",L),k.readAsArrayBuffer(y)});})();
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
