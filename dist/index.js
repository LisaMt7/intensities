(() => {
  // app/visualscript/index.js
  (function(global2, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.visualscript = {}));
  })(void 0, function(exports2) {
    "use strict";
    const t$3 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e$4 = Symbol(), n$6 = /* @__PURE__ */ new Map();
    class s$4 {
      constructor(t2, n2) {
        if (this._$cssResult$ = true, n2 !== e$4)
          throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t2;
      }
      get styleSheet() {
        let e2 = n$6.get(this.cssText);
        return t$3 && e2 === void 0 && (n$6.set(this.cssText, e2 = new CSSStyleSheet()), e2.replaceSync(this.cssText)), e2;
      }
      toString() {
        return this.cssText;
      }
    }
    const o$5 = (t2) => new s$4(typeof t2 == "string" ? t2 : t2 + "", e$4), r$4 = (t2, ...n2) => {
      const o2 = t2.length === 1 ? t2[0] : n2.reduce((e2, n3, s2) => e2 + ((t3) => {
        if (t3._$cssResult$ === true)
          return t3.cssText;
        if (typeof t3 == "number")
          return t3;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
      })(n3) + t2[s2 + 1], t2[0]);
      return new s$4(o2, e$4);
    }, i$4 = (e2, n2) => {
      t$3 ? e2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((t2) => {
        const n3 = document.createElement("style"), s2 = window.litNonce;
        s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t2.cssText, e2.appendChild(n3);
      });
    }, S$1 = t$3 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
      let e2 = "";
      for (const n2 of t3.cssRules)
        e2 += n2.cssText;
      return o$5(e2);
    })(t2) : t2;
    var s$3;
    const e$3 = window.trustedTypes, r$3 = e$3 ? e$3.emptyScript : "", h$3 = window.reactiveElementPolyfillSupport, o$4 = {
      toAttribute(t2, i2) {
        switch (i2) {
          case Boolean:
            t2 = t2 ? r$3 : null;
            break;
          case Object:
          case Array:
            t2 = t2 == null ? t2 : JSON.stringify(t2);
        }
        return t2;
      },
      fromAttribute(t2, i2) {
        let s2 = t2;
        switch (i2) {
          case Boolean:
            s2 = t2 !== null;
            break;
          case Number:
            s2 = t2 === null ? null : Number(t2);
            break;
          case Object:
          case Array:
            try {
              s2 = JSON.parse(t2);
            } catch (t3) {
              s2 = null;
            }
        }
        return s2;
      }
    }, n$5 = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2), l$3 = {
      attribute: true,
      type: String,
      converter: o$4,
      reflect: false,
      hasChanged: n$5
    };
    class a$1 extends HTMLElement {
      constructor() {
        super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
      }
      static addInitializer(t2) {
        var i2;
        (i2 = this.l) !== null && i2 !== void 0 || (this.l = []), this.l.push(t2);
      }
      static get observedAttributes() {
        this.finalize();
        const t2 = [];
        return this.elementProperties.forEach((i2, s2) => {
          const e2 = this._$Eh(s2, i2);
          e2 !== void 0 && (this._$Eu.set(e2, s2), t2.push(e2));
        }), t2;
      }
      static createProperty(t2, i2 = l$3) {
        if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
          const s2 = typeof t2 == "symbol" ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s2, i2);
          e2 !== void 0 && Object.defineProperty(this.prototype, t2, e2);
        }
      }
      static getPropertyDescriptor(t2, i2, s2) {
        return {
          get() {
            return this[i2];
          },
          set(e2) {
            const r2 = this[t2];
            this[i2] = e2, this.requestUpdate(t2, r2, s2);
          },
          configurable: true,
          enumerable: true
        };
      }
      static getPropertyOptions(t2) {
        return this.elementProperties.get(t2) || l$3;
      }
      static finalize() {
        if (this.hasOwnProperty("finalized"))
          return false;
        this.finalized = true;
        const t2 = Object.getPrototypeOf(this);
        if (t2.finalize(), this.elementProperties = new Map(t2.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
          const t3 = this.properties, i2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
          for (const s2 of i2)
            this.createProperty(s2, t3[s2]);
        }
        return this.elementStyles = this.finalizeStyles(this.styles), true;
      }
      static finalizeStyles(i2) {
        const s2 = [];
        if (Array.isArray(i2)) {
          const e2 = new Set(i2.flat(1 / 0).reverse());
          for (const i3 of e2)
            s2.unshift(S$1(i3));
        } else
          i2 !== void 0 && s2.push(S$1(i2));
        return s2;
      }
      static _$Eh(t2, i2) {
        const s2 = i2.attribute;
        return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
      }
      o() {
        var t2;
        this._$Ep = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t2 = this.constructor.l) === null || t2 === void 0 || t2.forEach((t3) => t3(this));
      }
      addController(t2) {
        var i2, s2;
        ((i2 = this._$Eg) !== null && i2 !== void 0 ? i2 : this._$Eg = []).push(t2), this.renderRoot !== void 0 && this.isConnected && ((s2 = t2.hostConnected) === null || s2 === void 0 || s2.call(t2));
      }
      removeController(t2) {
        var i2;
        (i2 = this._$Eg) === null || i2 === void 0 || i2.splice(this._$Eg.indexOf(t2) >>> 0, 1);
      }
      _$Em() {
        this.constructor.elementProperties.forEach((t2, i2) => {
          this.hasOwnProperty(i2) && (this._$Et.set(i2, this[i2]), delete this[i2]);
        });
      }
      createRenderRoot() {
        var t2;
        const s2 = (t2 = this.shadowRoot) !== null && t2 !== void 0 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
        return i$4(s2, this.constructor.elementStyles), s2;
      }
      connectedCallback() {
        var t2;
        this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
          var i2;
          return (i2 = t3.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
        });
      }
      enableUpdating(t2) {
      }
      disconnectedCallback() {
        var t2;
        (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
          var i2;
          return (i2 = t3.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
        });
      }
      attributeChangedCallback(t2, i2, s2) {
        this._$AK(t2, s2);
      }
      _$ES(t2, i2, s2 = l$3) {
        var e2, r2;
        const h2 = this.constructor._$Eh(t2, s2);
        if (h2 !== void 0 && s2.reflect === true) {
          const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && r2 !== void 0 ? r2 : o$4.toAttribute)(i2, s2.type);
          this._$Ei = t2, n2 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$Ei = null;
        }
      }
      _$AK(t2, i2) {
        var s2, e2, r2;
        const h2 = this.constructor, n2 = h2._$Eu.get(t2);
        if (n2 !== void 0 && this._$Ei !== n2) {
          const t3 = h2.getPropertyOptions(n2), l2 = t3.converter, a2 = (r2 = (e2 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e2 !== void 0 ? e2 : typeof l2 == "function" ? l2 : null) !== null && r2 !== void 0 ? r2 : o$4.fromAttribute;
          this._$Ei = n2, this[n2] = a2(i2, t3.type), this._$Ei = null;
        }
      }
      requestUpdate(t2, i2, s2) {
        let e2 = true;
        t2 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || n$5)(this[t2], i2) ? (this._$AL.has(t2) || this._$AL.set(t2, i2), s2.reflect === true && this._$Ei !== t2 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t2, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$Ep = this._$E_());
      }
      async _$E_() {
        this.isUpdatePending = true;
        try {
          await this._$Ep;
        } catch (t3) {
          Promise.reject(t3);
        }
        const t2 = this.scheduleUpdate();
        return t2 != null && await t2, !this.isUpdatePending;
      }
      scheduleUpdate() {
        return this.performUpdate();
      }
      performUpdate() {
        var t2;
        if (!this.isUpdatePending)
          return;
        this.hasUpdated, this._$Et && (this._$Et.forEach((t3, i3) => this[i3] = t3), this._$Et = void 0);
        let i2 = false;
        const s2 = this._$AL;
        try {
          i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
            var i3;
            return (i3 = t3.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t3);
          }), this.update(s2)) : this._$EU();
        } catch (t3) {
          throw i2 = false, this._$EU(), t3;
        }
        i2 && this._$AE(s2);
      }
      willUpdate(t2) {
      }
      _$AE(t2) {
        var i2;
        (i2 = this._$Eg) === null || i2 === void 0 || i2.forEach((t3) => {
          var i3;
          return (i3 = t3.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t3);
        }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
      }
      _$EU() {
        this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
      }
      get updateComplete() {
        return this.getUpdateComplete();
      }
      getUpdateComplete() {
        return this._$Ep;
      }
      shouldUpdate(t2) {
        return true;
      }
      update(t2) {
        this._$EC !== void 0 && (this._$EC.forEach((t3, i2) => this._$ES(i2, this[i2], t3)), this._$EC = void 0), this._$EU();
      }
      updated(t2) {
      }
      firstUpdated(t2) {
      }
    }
    a$1.finalized = true, a$1.elementProperties = /* @__PURE__ */ new Map(), a$1.elementStyles = [], a$1.shadowRootOptions = {
      mode: "open"
    }, h$3 == null || h$3({
      ReactiveElement: a$1
    }), ((s$3 = globalThis.reactiveElementVersions) !== null && s$3 !== void 0 ? s$3 : globalThis.reactiveElementVersions = []).push("1.3.1");
    var t$2;
    const i$3 = globalThis.trustedTypes, s$2 = i$3 ? i$3.createPolicy("lit-html", {
      createHTML: (t2) => t2
    }) : void 0, e$2 = `lit$${(Math.random() + "").slice(9)}$`, o$3 = "?" + e$2, n$4 = `<${o$3}>`, l$2 = document, h$2 = (t2 = "") => l$2.createComment(t2), r$2 = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function", d$1 = Array.isArray, u = (t2) => {
      var i2;
      return d$1(t2) || typeof ((i2 = t2) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
    }, c$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a = />/g, f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _ = /'/g, m = /"/g, g = /^(?:script|style|textarea|title)$/i, p = (t2) => (i2, ...s2) => ({
      _$litType$: t2,
      strings: i2,
      values: s2
    }), $ = p(1), b = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), T = /* @__PURE__ */ new WeakMap(), x = (t2, i2, s2) => {
      var e2, o2;
      const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
      let l2 = n2._$litPart$;
      if (l2 === void 0) {
        const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
        n2._$litPart$ = l2 = new N(i2.insertBefore(h$2(), t3), t3, void 0, s2 != null ? s2 : {});
      }
      return l2._$AI(t2), l2;
    }, A = l$2.createTreeWalker(l$2, 129, null, false), C = (t2, i2) => {
      const o2 = t2.length - 1, l2 = [];
      let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c$1;
      for (let i3 = 0; i3 < o2; i3++) {
        const s2 = t2[i3];
        let o3, u3, p2 = -1, $2 = 0;
        for (; $2 < s2.length && (d2.lastIndex = $2, u3 = d2.exec(s2), u3 !== null); )
          $2 = d2.lastIndex, d2 === c$1 ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a : u3[2] !== void 0 ? (g.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = f) : u3[3] !== void 0 && (d2 = f) : d2 === f ? u3[0] === ">" ? (d2 = h2 != null ? h2 : c$1, p2 = -1) : u3[1] === void 0 ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o3 = u3[1], d2 = u3[3] === void 0 ? f : u3[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a ? d2 = c$1 : (d2 = f, h2 = void 0);
        const y = d2 === f && t2[i3 + 1].startsWith("/>") ? " " : "";
        r2 += d2 === c$1 ? s2 + n$4 : p2 >= 0 ? (l2.push(o3), s2.slice(0, p2) + "$lit$" + s2.slice(p2) + e$2 + y) : s2 + e$2 + (p2 === -2 ? (l2.push(void 0), i3) : y);
      }
      const u2 = r2 + (t2[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
      if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
        throw Error("invalid template strings array");
      return [s$2 !== void 0 ? s$2.createHTML(u2) : u2, l2];
    };
    class E {
      constructor({
        strings: t2,
        _$litType$: s2
      }, n2) {
        let l2;
        this.parts = [];
        let r2 = 0, d2 = 0;
        const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = C(t2, s2);
        if (this.el = E.createElement(v2, n2), A.currentNode = this.el.content, s2 === 2) {
          const t3 = this.el.content, i2 = t3.firstChild;
          i2.remove(), t3.append(...i2.childNodes);
        }
        for (; (l2 = A.nextNode()) !== null && c2.length < u2; ) {
          if (l2.nodeType === 1) {
            if (l2.hasAttributes()) {
              const t3 = [];
              for (const i2 of l2.getAttributeNames())
                if (i2.endsWith("$lit$") || i2.startsWith(e$2)) {
                  const s3 = a2[d2++];
                  if (t3.push(i2), s3 !== void 0) {
                    const t4 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$2), i3 = /([.?@])?(.*)/.exec(s3);
                    c2.push({
                      type: 1,
                      index: r2,
                      name: i3[2],
                      strings: t4,
                      ctor: i3[1] === "." ? M : i3[1] === "?" ? H : i3[1] === "@" ? I : S
                    });
                  } else
                    c2.push({
                      type: 6,
                      index: r2
                    });
                }
              for (const i2 of t3)
                l2.removeAttribute(i2);
            }
            if (g.test(l2.tagName)) {
              const t3 = l2.textContent.split(e$2), s3 = t3.length - 1;
              if (s3 > 0) {
                l2.textContent = i$3 ? i$3.emptyScript : "";
                for (let i2 = 0; i2 < s3; i2++)
                  l2.append(t3[i2], h$2()), A.nextNode(), c2.push({
                    type: 2,
                    index: ++r2
                  });
                l2.append(t3[s3], h$2());
              }
            }
          } else if (l2.nodeType === 8)
            if (l2.data === o$3)
              c2.push({
                type: 2,
                index: r2
              });
            else {
              let t3 = -1;
              for (; (t3 = l2.data.indexOf(e$2, t3 + 1)) !== -1; )
                c2.push({
                  type: 7,
                  index: r2
                }), t3 += e$2.length - 1;
            }
          r2++;
        }
      }
      static createElement(t2, i2) {
        const s2 = l$2.createElement("template");
        return s2.innerHTML = t2, s2;
      }
    }
    function P(t2, i2, s2 = t2, e2) {
      var o2, n2, l2, h2;
      if (i2 === b)
        return i2;
      let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
      const u2 = r$2(i2) ? void 0 : i2._$litDirective$;
      return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = P(t2, d2._$AS(t2, i2.values), d2, e2)), i2;
    }
    class V {
      constructor(t2, i2) {
        this.v = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
      }
      get parentNode() {
        return this._$AM.parentNode;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      p(t2) {
        var i2;
        const {
          el: {
            content: s2
          },
          parts: e2
        } = this._$AD, o2 = ((i2 = t2 == null ? void 0 : t2.creationScope) !== null && i2 !== void 0 ? i2 : l$2).importNode(s2, true);
        A.currentNode = o2;
        let n2 = A.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
        for (; d2 !== void 0; ) {
          if (h2 === d2.index) {
            let i3;
            d2.type === 2 ? i3 = new N(n2, n2.nextSibling, this, t2) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t2) : d2.type === 6 && (i3 = new L(n2, this, t2)), this.v.push(i3), d2 = e2[++r2];
          }
          h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A.nextNode(), h2++);
        }
        return o2;
      }
      m(t2) {
        let i2 = 0;
        for (const s2 of this.v)
          s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
      }
    }
    class N {
      constructor(t2, i2, s2, e2) {
        var o2;
        this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
      }
      get _$AU() {
        var t2, i2;
        return (i2 = (t2 = this._$AM) === null || t2 === void 0 ? void 0 : t2._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
      }
      get parentNode() {
        let t2 = this._$AA.parentNode;
        const i2 = this._$AM;
        return i2 !== void 0 && t2.nodeType === 11 && (t2 = i2.parentNode), t2;
      }
      get startNode() {
        return this._$AA;
      }
      get endNode() {
        return this._$AB;
      }
      _$AI(t2, i2 = this) {
        t2 = P(this, t2, i2), r$2(t2) ? t2 === w || t2 == null || t2 === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t2 !== this._$AH && t2 !== b && this.$(t2) : t2._$litType$ !== void 0 ? this.T(t2) : t2.nodeType !== void 0 ? this.k(t2) : u(t2) ? this.S(t2) : this.$(t2);
      }
      A(t2, i2 = this._$AB) {
        return this._$AA.parentNode.insertBefore(t2, i2);
      }
      k(t2) {
        this._$AH !== t2 && (this._$AR(), this._$AH = this.A(t2));
      }
      $(t2) {
        this._$AH !== w && r$2(this._$AH) ? this._$AA.nextSibling.data = t2 : this.k(l$2.createTextNode(t2)), this._$AH = t2;
      }
      T(t2) {
        var i2;
        const {
          values: s2,
          _$litType$: e2
        } = t2, o2 = typeof e2 == "number" ? this._$AC(t2) : (e2.el === void 0 && (e2.el = E.createElement(e2.h, this.options)), e2);
        if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
          this._$AH.m(s2);
        else {
          const t3 = new V(o2, this), i3 = t3.p(this.options);
          t3.m(s2), this.k(i3), this._$AH = t3;
        }
      }
      _$AC(t2) {
        let i2 = T.get(t2.strings);
        return i2 === void 0 && T.set(t2.strings, i2 = new E(t2)), i2;
      }
      S(t2) {
        d$1(this._$AH) || (this._$AH = [], this._$AR());
        const i2 = this._$AH;
        let s2, e2 = 0;
        for (const o2 of t2)
          e2 === i2.length ? i2.push(s2 = new N(this.A(h$2()), this.A(h$2()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
        e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
      }
      _$AR(t2 = this._$AA.nextSibling, i2) {
        var s2;
        for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
          const i3 = t2.nextSibling;
          t2.remove(), t2 = i3;
        }
      }
      setConnected(t2) {
        var i2;
        this._$AM === void 0 && (this._$Cg = t2, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t2));
      }
    }
    class S {
      constructor(t2, i2, s2, e2, o2) {
        this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = w;
      }
      get tagName() {
        return this.element.tagName;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      _$AI(t2, i2 = this, s2, e2) {
        const o2 = this.strings;
        let n2 = false;
        if (o2 === void 0)
          t2 = P(this, t2, i2, 0), n2 = !r$2(t2) || t2 !== this._$AH && t2 !== b, n2 && (this._$AH = t2);
        else {
          const e3 = t2;
          let l2, h2;
          for (t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
            h2 = P(this, e3[s2 + l2], i2, l2), h2 === b && (h2 = this._$AH[l2]), n2 || (n2 = !r$2(h2) || h2 !== this._$AH[l2]), h2 === w ? t2 = w : t2 !== w && (t2 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
        }
        n2 && !e2 && this.C(t2);
      }
      C(t2) {
        t2 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
      }
    }
    class M extends S {
      constructor() {
        super(...arguments), this.type = 3;
      }
      C(t2) {
        this.element[this.name] = t2 === w ? void 0 : t2;
      }
    }
    const k = i$3 ? i$3.emptyScript : "";
    class H extends S {
      constructor() {
        super(...arguments), this.type = 4;
      }
      C(t2) {
        t2 && t2 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
      }
    }
    class I extends S {
      constructor(t2, i2, s2, e2, o2) {
        super(t2, i2, s2, e2, o2), this.type = 5;
      }
      _$AI(t2, i2 = this) {
        var s2;
        if ((t2 = (s2 = P(this, t2, i2, 0)) !== null && s2 !== void 0 ? s2 : w) === b)
          return;
        const e2 = this._$AH, o2 = t2 === w && e2 !== w || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== w && (e2 === w || o2);
        o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
      }
      handleEvent(t2) {
        var i2, s2;
        typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
      }
    }
    class L {
      constructor(t2, i2, s2) {
        this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      _$AI(t2) {
        P(this, t2);
      }
    }
    const z = window.litHtmlPolyfillSupport;
    z == null || z(E, N), ((t$2 = globalThis.litHtmlVersions) !== null && t$2 !== void 0 ? t$2 : globalThis.litHtmlVersions = []).push("2.2.1");
    var l$1, o$2;
    class s$1 extends a$1 {
      constructor() {
        super(...arguments), this.renderOptions = {
          host: this
        }, this._$Dt = void 0;
      }
      createRenderRoot() {
        var t2, e2;
        const i2 = super.createRenderRoot();
        return (t2 = (e2 = this.renderOptions).renderBefore) !== null && t2 !== void 0 || (e2.renderBefore = i2.firstChild), i2;
      }
      update(t2) {
        const i2 = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Dt = x(i2, this.renderRoot, this.renderOptions);
      }
      connectedCallback() {
        var t2;
        super.connectedCallback(), (t2 = this._$Dt) === null || t2 === void 0 || t2.setConnected(true);
      }
      disconnectedCallback() {
        var t2;
        super.disconnectedCallback(), (t2 = this._$Dt) === null || t2 === void 0 || t2.setConnected(false);
      }
      render() {
        return b;
      }
    }
    s$1.finalized = true, s$1._$litElement$ = true, (l$1 = globalThis.litElementHydrateSupport) === null || l$1 === void 0 || l$1.call(globalThis, {
      LitElement: s$1
    });
    const n$3 = globalThis.litElementPolyfillSupport;
    n$3 == null || n$3({
      LitElement: s$1
    });
    ((o$2 = globalThis.litElementVersions) !== null && o$2 !== void 0 ? o$2 : globalThis.litElementVersions = []).push("3.2.0");
    class Volume extends s$1 {
      constructor(props = {}) {
        super();
        this.volume = props.volume ?? 0;
        this.backgroundColor = props.backgroundColor ?? "#69ce2b";
        this.count = props.count ?? 10;
      }
      static get styles() {
        return r$4`

      :host {
        width: 100%;
      }

      #wrapper{
        width: 100%;
      }

      `;
      }
      static get properties() {
        return {
          volume: {
            type: Number
          },
          count: {
            type: Number
          },
          backgroundColor: {
            type: String,
            reflect: true
          }
        };
      }
      willUpdate(changedProps) {
        if (changedProps.has("volume")) {
          if (!this.volume || this.volume < 0)
            this.volume = 0;
          else if (this.volume > 1)
            this.volume = 1;
        }
      }
      render() {
        const numToColor = Math.round(this.count * (this.volume ?? 0));
        return $`
      <style>
        .target{
          width: calc(${100 / this.count}% - 10px);
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
          ${Array.from({ length: this.count }, (_2, i2) => $`<div class=${i2 < numToColor ? "target active" : "target"}></div>`)}
        </div>
    `;
      }
    }
    customElements.define("visualscript-audio-volume", Volume);
    var index$3 = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      Volume
    });
    class Player extends s$1 {
      constructor(props = {}) {
        super();
        this.source = props.source;
        this.autoplay = props.autoplay;
        this.controls = props.controls;
      }
      static get styles() {
        return r$4`

      video {
        width: 100%;
      }

      `;
      }
      static get properties() {
        return {
          source: {
            converter: {
              toAttribute(value) {
                return value;
              },
              fromAttribute(value) {
                return value;
              }
            }
          },
          autoplay: { type: Boolean },
          controls: { type: Boolean }
        };
      }
      willUpdate(_2) {
      }
      render() {
        let video2 = document.createElement("video");
        if (typeof this.source === "object")
          video2.srcObject = this.source;
        else {
          if (this.source) {
            const source = document.createElement("source");
            source.src = this.source;
            video2.insertAdjacentElement("beforeend", source);
          }
        }
        if (this.autoplay)
          video2.autoplay = this.autoplay;
        if (this.controls)
          video2.controls = this.controls;
        return video2;
      }
    }
    customElements.define("visualscript-video-player", Player);
    var index$2 = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      Player
    });
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
        arr2[i2] = arr[i2];
      }
      return arr2;
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr))
        return _arrayLikeToArray(arr);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
        return Array.from(iter);
    }
    function _unsupportedIterableToArray(o2, minLen) {
      if (!o2)
        return;
      if (typeof o2 === "string")
        return _arrayLikeToArray(o2, minLen);
      var n2 = Object.prototype.toString.call(o2).slice(8, -1);
      if (n2 === "Object" && o2.constructor)
        n2 = o2.constructor.name;
      if (n2 === "Map" || n2 === "Set")
        return Array.from(o2);
      if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
        return _arrayLikeToArray(o2, minLen);
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i2 = 0; i2 < props.length; i2++) {
        var descriptor = props[i2];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    class ColorRGBA {
      constructor(r2, g2, b2, a2) {
        this.r = r2;
        this.g = g2;
        this.b = b2;
        this.a = a2;
      }
    }
    class WebglBase {
      constructor() {
        this.scaleX = 1;
        this.scaleY = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.loop = false;
        this._vbuffer = 0;
        this._coord = 0;
        this.visible = true;
        this.intensity = 1;
        this.xy = new Float32Array([]);
        this.numPoints = 0;
        this.color = new ColorRGBA(0, 0, 0, 1);
        this.webglNumPoints = 0;
      }
    }
    class WebglLine extends WebglBase {
      constructor(c2, numPoints) {
        super();
        this.currentIndex = 0;
        this.webglNumPoints = numPoints;
        this.numPoints = numPoints;
        this.color = c2;
        this.xy = new Float32Array(2 * this.webglNumPoints);
      }
      setX(index2, x2) {
        this.xy[index2 * 2] = x2;
      }
      setY(index2, y) {
        this.xy[index2 * 2 + 1] = y;
      }
      getX(index2) {
        return this.xy[index2 * 2];
      }
      getY(index2) {
        return this.xy[index2 * 2 + 1];
      }
      lineSpaceX(start2, stepSize) {
        for (let i2 = 0; i2 < this.numPoints; i2++) {
          this.setX(i2, start2 + stepSize * i2);
        }
      }
      arrangeX() {
        this.lineSpaceX(-1, 2 / this.numPoints);
      }
      constY(c2) {
        for (let i2 = 0; i2 < this.numPoints; i2++) {
          this.setY(i2, c2);
        }
      }
      shiftAdd(data2) {
        const shiftSize = data2.length;
        for (let i2 = 0; i2 < this.numPoints - shiftSize; i2++) {
          this.setY(i2, this.getY(i2 + shiftSize));
        }
        for (let i2 = 0; i2 < shiftSize; i2++) {
          this.setY(i2 + this.numPoints - shiftSize, data2[i2]);
        }
      }
      addArrayY(yArray) {
        if (this.currentIndex + yArray.length <= this.numPoints) {
          for (let i2 = 0; i2 < yArray.length; i2++) {
            this.setY(this.currentIndex, yArray[i2]);
            this.currentIndex++;
          }
        }
      }
      replaceArrayY(yArray) {
        if (yArray.length == this.numPoints) {
          for (let i2 = 0; i2 < this.numPoints; i2++) {
            this.setY(i2, yArray[i2]);
          }
        }
      }
    }
    class WebglPlot {
      constructor(canvas, options) {
        this.debug = false;
        this.addLine = this.addDataLine;
        if (options == void 0) {
          this.webgl = canvas.getContext("webgl", {
            antialias: true,
            transparent: false
          });
        } else {
          this.webgl = canvas.getContext("webgl", {
            antialias: options.antialias,
            transparent: options.transparent,
            desynchronized: options.deSync,
            powerPerformance: options.powerPerformance,
            preserveDrawing: options.preserveDrawing
          });
          this.debug = options.debug == void 0 ? false : options.debug;
        }
        this.log("canvas type is: " + canvas.constructor.name);
        this.log(`[webgl-plot]:width=${canvas.width}, height=${canvas.height}`);
        this._linesData = [];
        this._linesAux = [];
        this._thickLines = [];
        this._surfaces = [];
        this.gScaleX = 1;
        this.gScaleY = 1;
        this.gXYratio = 1;
        this.gOffsetX = 0;
        this.gOffsetY = 0;
        this.gLog10X = false;
        this.gLog10Y = false;
        this.webgl.clear(this.webgl.COLOR_BUFFER_BIT);
        this.webgl.viewport(0, 0, canvas.width, canvas.height);
        this._progLine = this.webgl.createProgram();
        this.initThinLineProgram();
        this.webgl.enable(this.webgl.BLEND);
        this.webgl.blendFunc(this.webgl.SRC_ALPHA, this.webgl.ONE_MINUS_SRC_ALPHA);
      }
      get linesData() {
        return this._linesData;
      }
      get linesAux() {
        return this._linesAux;
      }
      get thickLines() {
        return this._thickLines;
      }
      get surfaces() {
        return this._surfaces;
      }
      _drawLines(lines) {
        const webgl = this.webgl;
        lines.forEach((line) => {
          if (line.visible) {
            webgl.useProgram(this._progLine);
            const uscale = webgl.getUniformLocation(this._progLine, "uscale");
            webgl.uniformMatrix2fv(uscale, false, new Float32Array([line.scaleX * this.gScaleX * (this.gLog10X ? 1 / Math.log(10) : 1), 0, 0, line.scaleY * this.gScaleY * this.gXYratio * (this.gLog10Y ? 1 / Math.log(10) : 1)]));
            const uoffset = webgl.getUniformLocation(this._progLine, "uoffset");
            webgl.uniform2fv(uoffset, new Float32Array([line.offsetX + this.gOffsetX, line.offsetY + this.gOffsetY]));
            const isLog = webgl.getUniformLocation(this._progLine, "is_log");
            webgl.uniform2iv(isLog, new Int32Array([this.gLog10X ? 1 : 0, this.gLog10Y ? 1 : 0]));
            const uColor = webgl.getUniformLocation(this._progLine, "uColor");
            webgl.uniform4fv(uColor, [line.color.r, line.color.g, line.color.b, line.color.a]);
            webgl.bufferData(webgl.ARRAY_BUFFER, line.xy, webgl.STREAM_DRAW);
            webgl.drawArrays(line.loop ? webgl.LINE_LOOP : webgl.LINE_STRIP, 0, line.webglNumPoints);
          }
        });
      }
      _drawSurfaces(squares) {
        const webgl = this.webgl;
        squares.forEach((square) => {
          if (square.visible) {
            webgl.useProgram(this._progLine);
            const uscale = webgl.getUniformLocation(this._progLine, "uscale");
            webgl.uniformMatrix2fv(uscale, false, new Float32Array([square.scaleX * this.gScaleX * (this.gLog10X ? 1 / Math.log(10) : 1), 0, 0, square.scaleY * this.gScaleY * this.gXYratio * (this.gLog10Y ? 1 / Math.log(10) : 1)]));
            const uoffset = webgl.getUniformLocation(this._progLine, "uoffset");
            webgl.uniform2fv(uoffset, new Float32Array([square.offsetX + this.gOffsetX, square.offsetY + this.gOffsetY]));
            const isLog = webgl.getUniformLocation(this._progLine, "is_log");
            webgl.uniform2iv(isLog, new Int32Array([this.gLog10X ? 1 : 0, this.gLog10Y ? 1 : 0]));
            const uColor = webgl.getUniformLocation(this._progLine, "uColor");
            webgl.uniform4fv(uColor, [square.color.r, square.color.g, square.color.b, square.color.a]);
            webgl.bufferData(webgl.ARRAY_BUFFER, square.xy, webgl.STREAM_DRAW);
            webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, square.webglNumPoints);
          }
        });
      }
      _drawTriangles(thickLine) {
        const webgl = this.webgl;
        webgl.bufferData(webgl.ARRAY_BUFFER, thickLine.xy, webgl.STREAM_DRAW);
        webgl.useProgram(this._progLine);
        const uscale = webgl.getUniformLocation(this._progLine, "uscale");
        webgl.uniformMatrix2fv(uscale, false, new Float32Array([thickLine.scaleX * this.gScaleX * (this.gLog10X ? 1 / Math.log(10) : 1), 0, 0, thickLine.scaleY * this.gScaleY * this.gXYratio * (this.gLog10Y ? 1 / Math.log(10) : 1)]));
        const uoffset = webgl.getUniformLocation(this._progLine, "uoffset");
        webgl.uniform2fv(uoffset, new Float32Array([thickLine.offsetX + this.gOffsetX, thickLine.offsetY + this.gOffsetY]));
        const isLog = webgl.getUniformLocation(this._progLine, "is_log");
        webgl.uniform2iv(isLog, new Int32Array([0, 0]));
        const uColor = webgl.getUniformLocation(this._progLine, "uColor");
        webgl.uniform4fv(uColor, [thickLine.color.r, thickLine.color.g, thickLine.color.b, thickLine.color.a]);
        webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, thickLine.xy.length / 2);
      }
      _drawThickLines() {
        this._thickLines.forEach((thickLine) => {
          if (thickLine.visible) {
            const calibFactor = Math.min(this.gScaleX, this.gScaleY);
            thickLine.setActualThickness(thickLine.getThickness() / calibFactor);
            thickLine.convertToTriPoints();
            this._drawTriangles(thickLine);
          }
        });
      }
      update() {
        this.clear();
        this.draw();
      }
      draw() {
        this._drawLines(this.linesData);
        this._drawLines(this.linesAux);
        this._drawThickLines();
        this._drawSurfaces(this.surfaces);
      }
      clear() {
        this.webgl.clear(this.webgl.COLOR_BUFFER_BIT);
      }
      _addLine(line) {
        line._vbuffer = this.webgl.createBuffer();
        this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, line._vbuffer);
        this.webgl.bufferData(this.webgl.ARRAY_BUFFER, line.xy, this.webgl.STREAM_DRAW);
        line._coord = this.webgl.getAttribLocation(this._progLine, "coordinates");
        this.webgl.vertexAttribPointer(line._coord, 2, this.webgl.FLOAT, false, 0, 0);
        this.webgl.enableVertexAttribArray(line._coord);
      }
      addDataLine(line) {
        this._addLine(line);
        this.linesData.push(line);
      }
      addAuxLine(line) {
        this._addLine(line);
        this.linesAux.push(line);
      }
      addThickLine(thickLine) {
        this._addLine(thickLine);
        this._thickLines.push(thickLine);
      }
      addSurface(surface) {
        this._addLine(surface);
        this.surfaces.push(surface);
      }
      initThinLineProgram() {
        const vertCode = `
      attribute vec2 coordinates;
      uniform mat2 uscale;
      uniform vec2 uoffset;
      uniform ivec2 is_log;

      void main(void) {
         float x = (is_log[0]==1) ? log(coordinates.x) : coordinates.x;
         float y = (is_log[1]==1) ? log(coordinates.y) : coordinates.y;
         vec2 line = vec2(x, y);
         gl_Position = vec4(uscale*line + uoffset, 0.0, 1.0);
      }`;
        const vertShader = this.webgl.createShader(this.webgl.VERTEX_SHADER);
        this.webgl.shaderSource(vertShader, vertCode);
        this.webgl.compileShader(vertShader);
        const fragCode = `
         precision mediump float;
         uniform highp vec4 uColor;
         void main(void) {
            gl_FragColor =  uColor;
         }`;
        const fragShader = this.webgl.createShader(this.webgl.FRAGMENT_SHADER);
        this.webgl.shaderSource(fragShader, fragCode);
        this.webgl.compileShader(fragShader);
        this._progLine = this.webgl.createProgram();
        this.webgl.attachShader(this._progLine, vertShader);
        this.webgl.attachShader(this._progLine, fragShader);
        this.webgl.linkProgram(this._progLine);
      }
      popDataLine() {
        this.linesData.pop();
      }
      removeAllLines() {
        this._linesData = [];
        this._linesAux = [];
        this._thickLines = [];
        this._surfaces = [];
      }
      removeDataLines() {
        this._linesData = [];
      }
      removeAuxLines() {
        this._linesAux = [];
      }
      viewport(a2, b2, c2, d2) {
        this.webgl.viewport(a2, b2, c2, d2);
      }
      log(str) {
        if (this.debug) {
          console.log("[webgl-plot]:" + str);
        }
      }
    }
    var WebglLinePlotUtils = /* @__PURE__ */ function() {
      function WebglLinePlotUtils2(canvas) {
        var _this = this;
        var overlay2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        _classCallCheck(this, WebglLinePlotUtils2);
        _defineProperty(this, "updateAllLines", function() {
          var newAmplitudes = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
          var linesSPS = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
          var autoscale = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
          var centerZero = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
          var passed = true;
          var sps = _toConsumableArray(linesSPS);
          newAmplitudes.forEach(function(arr, i2) {
            var _this$linesY$i;
            if (arr.length !== ((_this$linesY$i = _this.linesY[i2]) === null || _this$linesY$i === void 0 ? void 0 : _this$linesY$i.length)) {
              var _this$linesY$i2;
              if (arr.length > ((_this$linesY$i2 = _this.linesY[i2]) === null || _this$linesY$i2 === void 0 ? void 0 : _this$linesY$i2.length)) {
                _this.linesY[i2] = WebglLinePlotUtils2.downsample(arr, _this.linesY[i2].length);
              } else
                _this.linesY[i2] = WebglLinePlotUtils2.upsample(arr, _this.linesY[i2]);
              sps[i2] = Math.ceil(arr.length / _this.nSecGraph);
              if (autoscale) {
                _this.linesY[i2] = _this.autoscale(arr, i2, _this.nLines, centerZero);
              }
              passed = false;
            } else {
              if (autoscale) {
                _this.linesY[i2] = _this.autoscale(arr, i2, _this.nLines, centerZero);
              } else
                _this.linesY[i2] = arr;
            }
          });
          if (!passed) {
            _this.deinitPlot();
            _this.initPlot(newAmplitudes.length, sps);
          }
          if (_this.useOverlay) {
            _this.overlayctx.clearRect(0, 0, _this.overlay.width, _this.overlay.height);
            _this.overlayctx.font = "1em Courier";
            _this.overlayctx.fillStyle = "white";
          }
          _this.linesY.forEach(function(arr, i2) {
            for (var j = 0; j < arr.length; j++) {
              _this.lines[i2].setY(j, arr[j]);
            }
            if (_this.useOverlay) {
              _this.overlayctx.fillText(_this.lineSettings[i2].ymax.toFixed(2), _this.overlay.width - 70, _this.overlay.height * (i2 + 0.1) / _this.lines.length);
              _this.overlayctx.fillText(_this.lineSettings[i2].ymin.toFixed(2), _this.overlay.width - 70, _this.overlay.height * (i2 + 0.9) / _this.lines.length);
            }
          });
        });
        _defineProperty(this, "updateLine", function() {
          var newAmplitudes = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
          var lineSPS = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 500;
          var lineIdx = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
          var autoscale = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
          var centerZero = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
          if (newAmplitudes.length !== lineSPS * _this.nSecGraph) {
            lineSPS = newAmplitudes.length / _this.nSecGraph;
            _this.linesSPS[lineIdx] = lineSPS;
            _this.deinitPlot();
            _this.initPlot(_this.lines.length, _this.linesSPS);
          }
          if (newAmplitudes.length !== _this.linesY[lineIdx].length) {
            if (newAmplitudes.length > _this.linesY[lineIdx].length) {
              _this.linesY[lineIdx] = WebglLinePlotUtils2.downsample(newAmplitudes, _this.linesY[lineIdx].length);
            } else
              _this.linesY[lineIdx] = WebglLinePlotUtils2.upsample(newAmplitudes, _this.linesY[lineIdx]);
            if (autoscale)
              _this.linesY[lineIdx] = _this.autoscale(newAmplitudes, lineIdx, _this.nLines, centerZero);
          } else {
            if (autoscale)
              _this.linesY[lineIdx] = _this.autoscale(newAmplitudes, lineIdx, _this.nLines, centerZero);
            else
              _this.linesY[lineIdx] = newAmplitudes;
          }
          for (var i2 = 0; i2 < _this.linesY[lineIdx].length; i2++) {
            _this.lines[lineIdx].setY(i2, _this.linesY[lineIdx][i2]);
          }
          if (_this.useOverlay) {
            _this.overlayctx.clearRect(0, _this.overlay.height * lineIdx / _this.lines.length, _this.overlay.width, _this.overlay.height * (lineIdx + 1) / _this.lines.length);
            _this.overlayctx.fillText(_this.lineSettings[lineIdx].ymax.toFixed(2), _this.overlay.width - 70, _this.overlay.height * (lineIdx + 0.1) / _this.lines.length);
            _this.overlayctx.fillText(_this.lineSettings[lineIdx].ymin.toFixed(2), _this.overlay.width - 70, _this.overlay.height * (lineIdx + 0.9) / _this.lines.length);
          }
        });
        if (!canvas)
          throw new Error("Supply a canvas to the webgl plot!");
        this.canvas = canvas;
        this.useOverlay = overlay2;
        this.overlay;
        this.overlayctx;
        this.plot = new WebglPlot(canvas);
        if (this.useOverlay) {
          this.overlay = document.createElement("canvas");
          this.overlay.style = this.canvas.style;
          this.overlay.width = this.canvas.width;
          this.overlay.height = this.canvas.height;
          this.overlay.style.position = "absolute";
          this.overlay.style.zIndex = this.canvas.style.zIndex + 1;
          this.overlayctx = this.overlay.getContext("2d");
          this.canvas.parentNode.insertAdjacentElement("afterbegin", this.overlay);
        }
        this.lines = [];
        this.linesY = [];
        this.linesSPS = [];
        this.axes = [];
        this.dividers = [];
        this.colors = [];
        this.lineSettings = [];
        this.axisscalar = 1;
        this.nLines = 0;
        this.nSecGraph = 10;
        this.nMaxPointsPerSec = 512;
        this.animationSpeed = 6.9;
      }
      _createClass(WebglLinePlotUtils2, [{
        key: "autoscale",
        value: function autoscale(array) {
          var lineIdx = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          var nLines = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
          var centerZero = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
          var max = Math.max.apply(Math, _toConsumableArray(array));
          var min = Math.min.apply(Math, _toConsumableArray(array));
          this.lineSettings[lineIdx].ymax = max;
          this.lineSettings[lineIdx].ymin = min;
          var _lines = 1 / nLines;
          var scalar;
          if (centerZero) {
            var absmax = Math.max(Math.abs(min), Math.abs(max));
            scalar = _lines / absmax;
            return array.map(function(y) {
              return y * scalar + (_lines * (lineIdx + 1) * 2 - 1 - _lines);
            });
          } else {
            scalar = _lines / (max - min);
            return array.map(function(y) {
              return 2 * ((y - min) * scalar - 1 / (2 * nLines)) + (_lines * (lineIdx + 1) * 2 - 1 - _lines);
            });
          }
        }
      }, {
        key: "deinitPlot",
        value: function deinitPlot() {
          var _this$plot, _this$plot2;
          (_this$plot = this.plot) === null || _this$plot === void 0 ? void 0 : _this$plot.clear();
          (_this$plot2 = this.plot) === null || _this$plot2 === void 0 ? void 0 : _this$plot2.removeAllLines();
        }
      }, {
        key: "HSLToRGB",
        value: function HSLToRGB(h2, s2, l2) {
          s2 /= 100;
          l2 /= 100;
          var c2 = (1 - Math.abs(2 * l2 - 1)) * s2, x2 = c2 * (1 - Math.abs(h2 / 60 % 2 - 1)), m2 = l2 - c2 / 2, r2 = 0, g2 = 0, b2 = 0;
          if (0 <= h2 && h2 < 60) {
            r2 = c2;
            g2 = x2;
            b2 = 0;
          } else if (60 <= h2 && h2 < 120) {
            r2 = x2;
            g2 = c2;
            b2 = 0;
          } else if (120 <= h2 && h2 < 180) {
            r2 = 0;
            g2 = c2;
            b2 = x2;
          } else if (180 <= h2 && h2 < 240) {
            r2 = 0;
            g2 = x2;
            b2 = c2;
          } else if (240 <= h2 && h2 < 300) {
            r2 = x2;
            g2 = 0;
            b2 = c2;
          } else if (300 <= h2 && h2 < 360) {
            r2 = c2;
            g2 = 0;
            b2 = x2;
          }
          r2 = Math.round((r2 + m2) * 255);
          g2 = Math.round((g2 + m2) * 255);
          b2 = Math.round((b2 + m2) * 255);
          return [r2, g2, b2];
        }
      }, {
        key: "initPlot",
        value: function initPlot() {
          var nLines = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
          var linesSPS = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
          var nSecGraph = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.nSecGraph;
          var nMaxPointsPerSec = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : this.nMaxPointsPerSec;
          this.nSecGraph = nSecGraph;
          this.nMaxPointsPerSec = nMaxPointsPerSec;
          var xaxisColor = new ColorRGBA(1, 1, 1, 0.3);
          var dividerColor = new ColorRGBA(1, 1, 1, 1);
          var axisscalar = 1 / nLines;
          this.nLines = nLines;
          this.lines = [];
          this.linesSPS = linesSPS;
          for (var i2 = 0; i2 < nLines; i2++) {
            var rgb = this.HSLToRGB(360 * (i2 / nLines) % 360, 100, 50);
            var color = new ColorRGBA(rgb[0], rgb[1], rgb[2], 1);
            this.colors.push(color);
            var numX = 10;
            if (linesSPS[i2] > nMaxPointsPerSec)
              numX = nSecGraph * nMaxPointsPerSec;
            else
              numX = linesSPS[i2] * nSecGraph;
            numX = Math.floor(numX);
            var line = new WebglLine(color, numX);
            line.arrangeX();
            this.lines.push(line);
            if (this.linesY.length < this.lines.length) {
              this.linesY.push(new Array(numX));
            }
            this.plot.addDataLine(line);
            var xaxisY = axisscalar * (i2 + 1) * 2 - 1 - axisscalar;
            var xaxis = new WebglLine(xaxisColor, 2);
            xaxis.constY(xaxisY);
            xaxis.arrangeX();
            xaxis.xy[2] = 1;
            this.plot.addAuxLine(xaxis);
            this.axes.push(xaxis);
            if (i2 !== nLines - 1) {
              var dividerY = axisscalar * (i2 + 1) * 2 - 1;
              var divider = new WebglLine(dividerColor, 2);
              divider.constY(dividerY);
              divider.arrangeX();
              divider.xy[2] = 1;
              this.plot.addAuxLine(divider);
              this.dividers.push(divider);
            }
            this.lineSettings[i2] = {
              color,
              sps: linesSPS[i2],
              ymin: -1,
              ymax: 1
            };
          }
          if (this.linesY.length > this.lines.length)
            this.linesY.splice(this.lines.length);
          return true;
        }
      }, {
        key: "update",
        value: function update() {
          this.plot.update();
        }
      }, {
        key: "animate",
        value: function animate() {
          var _this2 = this;
          this.update();
          setTimeout(function() {
            requestAnimationFrame(_this2.animate);
          }, this.animationSpeed);
        }
      }], [{
        key: "absmax",
        value: function absmax(array) {
          return Math.max(Math.abs(Math.min.apply(Math, _toConsumableArray(array))), Math.max.apply(Math, _toConsumableArray(array)));
        }
      }, {
        key: "downsample",
        value: function downsample(array, fitCount) {
          var scalar = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
          if (array.length > fitCount) {
            var output = new Array(fitCount);
            var incr = array.length / fitCount;
            var lastIdx = array.length - 1;
            var last = 0;
            var counter = 0;
            for (var i2 = incr; i2 < array.length; i2 += incr) {
              var rounded = Math.round(i2);
              if (rounded > lastIdx)
                rounded = lastIdx;
              for (var j = last; j < rounded; j++) {
                output[counter] += array[j];
              }
              output[counter] /= (rounded - last) * scalar;
              counter++;
              last = rounded;
            }
            return output;
          } else
            return array;
        }
      }, {
        key: "upsample",
        value: function upsample(array, fitCount) {
          var scalar = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
          var linearInterpolate = function linearInterpolate2(before2, after2, atPoint2) {
            return (before2 + (after2 - before2) * atPoint2) * scalar;
          };
          var newData = new Array(fitCount);
          var springFactor = new Number((array.length - 1) / (fitCount - 1));
          newData[0] = array[0];
          for (var i2 = 1; i2 < fitCount - 1; i2++) {
            var tmp = i2 * springFactor;
            var before = new Number(Math.floor(tmp)).toFixed();
            var after = new Number(Math.ceil(tmp)).toFixed();
            var atPoint = tmp - before;
            newData[i2] = linearInterpolate(array[before], array[after], atPoint);
          }
          newData[fitCount - 1] = array[array.length - 1];
          return newData;
        }
      }, {
        key: "test",
        value: function test(canvasId) {
          var canvas = document.getElementById(canvasId);
          var devicePixelRatio = globalThis.devicePixelRatio || 1;
          canvas.width = canvas.clientWidth * devicePixelRatio;
          canvas.height = canvas.clientHeight * devicePixelRatio;
          var sps = 512;
          var sps2 = 256;
          var nSec = 3;
          var nPointsRenderedPerSec = 512;
          var freq = 1;
          var amp = 0.5;
          var noise = 0.5;
          var line = new Array(sps * nSec);
          var line2 = new Array(sps2 * nSec);
          var plotutil = new WebglLinePlotUtils2(canvas);
          plotutil.initPlot(2, [sps, sps2], nSec, nPointsRenderedPerSec);
          function update() {
            var line3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
            var sps3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 512;
            var sec = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 10;
            var len = sps3 * sec;
            var tincr = sec / len;
            var time = 0;
            for (var i2 = 0; i2 < sps3 * sec; i2++) {
              var ySin = Math.sin(Math.PI * time * freq * Math.PI * 2 + performance.now() * 1e-3);
              var yNoise = Math.random() - 0.5;
              line3[i2] = ySin * amp + yNoise * noise;
              time += tincr;
            }
          }
          var newFrame = function newFrame2() {
            update(line, sps, nSec);
            update(line2, sps2, nSec);
            plotutil.updateAllLines([line, line2], [sps, sps2], true);
            plotutil.update();
            requestAnimationFrame(newFrame2);
          };
          requestAnimationFrame(newFrame);
        }
      }]);
      return WebglLinePlotUtils2;
    }();
    class TimeSeries$1 extends s$1 {
      constructor(props = { seconds: 5, sps: 512 }) {
        super();
        this.data = [];
        this.spss = [];
        this.buffers = [];
        this.updateData = (data2) => {
          this.data = data2;
        };
        this.init = () => {
          const length = this.data.length;
          let nPointsRenderedPerSec = 60;
          this.sps = this.seconds * nPointsRenderedPerSec;
          this.spss = Array.from({ length }, (_2) => this.sps);
          this.buffers = Array.from({ length }, (_2) => []);
          this.util.initPlot(length, this.spss, this.seconds, nPointsRenderedPerSec);
        };
        this.clear = () => {
          this.util.plot.clear();
          this.buffers = [];
          this.data = [];
        };
        this.draw = () => {
          if (this.data.length != this.buffers.length)
            this.init();
          this.data.forEach((data2, i2) => {
            if (this.buffers[i2].length === 0)
              this.buffers[i2] = Array.from({ length: this.spss[i2] }, (_2) => data2);
            else {
              if (!Array.isArray(data2))
                data2 = [data2];
              data2.forEach(() => this.buffers[i2].pop());
              this.buffers[i2].unshift(...data2);
            }
          });
        };
        this.canvas = document.createElement("canvas");
        this.util = new WebglLinePlotUtils(this.canvas, false);
        this.sps = props.sps ?? 512;
        this.seconds = props.seconds ?? 5;
        this.backgroundColor = props.backgroundColor ?? "#69ce2b";
        let newFrame = () => {
          if (this.buffers.length > 0) {
            this.util.updateAllLines(this.buffers, this.spss, true);
            this.util.update();
          }
          requestAnimationFrame(newFrame);
        };
        requestAnimationFrame(newFrame);
      }
      static get styles() {
        return r$4`

      canvas{
        background: black;
        width: 100%;
        height: 100%;
      }

      `;
      }
      static get properties() {
        return {
          data: {
            type: Array,
            reflect: true
          },
          sps: {
            type: Number,
            reflect: true
          },
          seconds: {
            type: Number,
            reflect: true
          },
          backgroundColor: {
            type: String,
            reflect: true
          }
        };
      }
      willUpdate(updatedProps) {
        if (updatedProps.has("data"))
          this.draw();
        if (updatedProps.has("seconds")) {
          if (!this.seconds)
            this.seconds = 1e-3;
          this.init();
        }
      }
      render() {
        return this.canvas;
      }
    }
    customElements.define("visualscript-timeseries-stream", TimeSeries$1);
    class Spectrogram$1 extends s$1 {
      constructor(props = {}) {
        super();
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.reset = false;
        this.offset = true;
        this.colorScale = ["#000000", "#030106", "#06010c", "#090211", "#0c0215", "#0e0318", "#10031b", "#12041f", "#130522", "#140525", "#150628", "#15072c", "#16082f", "#160832", "#160936", "#160939", "#17093d", "#170a40", "#170a44", "#170a48", "#17094b", "#17094f", "#170953", "#170956", "#16085a", "#16085e", "#150762", "#140766", "#140669", "#13066d", "#110571", "#100475", "#0e0479", "#0b037d", "#080281", "#050185", "#020089", "#00008d", "#000090", "#000093", "#000096", "#000099", "#00009c", "#00009f", "#0000a2", "#0000a5", "#0000a8", "#0000ab", "#0000ae", "#0000b2", "#0000b5", "#0000b8", "#0000bb", "#0000be", "#0000c1", "#0000c5", "#0000c8", "#0000cb", "#0000ce", "#0000d1", "#0000d5", "#0000d8", "#0000db", "#0000de", "#0000e2", "#0000e5", "#0000e8", "#0000ec", "#0000ef", "#0000f2", "#0000f5", "#0000f9", "#0000fc", "#0803fe", "#2615f9", "#3520f4", "#3f29ef", "#4830eb", "#4e37e6", "#543ee1", "#5944dc", "#5e49d7", "#614fd2", "#6554cd", "#6759c8", "#6a5ec3", "#6c63be", "#6e68b9", "#6f6db4", "#7072af", "#7177aa", "#717ba5", "#7180a0", "#71859b", "#718996", "#708e91", "#6f928b", "#6e9786", "#6c9b80", "#6aa07b", "#68a475", "#65a96f", "#62ad69", "#5eb163", "#5ab65d", "#55ba56", "#4fbf4f", "#48c347", "#40c73f", "#36cc35", "#34ce32", "#37cf31", "#3ad130", "#3cd230", "#3fd32f", "#41d52f", "#44d62e", "#46d72d", "#48d92c", "#4bda2c", "#4ddc2b", "#4fdd2a", "#51de29", "#53e029", "#55e128", "#58e227", "#5ae426", "#5ce525", "#5ee624", "#60e823", "#62e922", "#64eb20", "#66ec1f", "#67ed1e", "#69ef1d", "#6bf01b", "#6df11a", "#6ff318", "#71f416", "#73f614", "#75f712", "#76f810", "#78fa0d", "#7afb0a", "#7cfd06", "#7efe03", "#80ff00", "#85ff00", "#89ff00", "#8eff00", "#92ff00", "#96ff00", "#9aff00", "#9eff00", "#a2ff00", "#a6ff00", "#aaff00", "#adff00", "#b1ff00", "#b5ff00", "#b8ff00", "#bcff00", "#bfff00", "#c3ff00", "#c6ff00", "#c9ff00", "#cdff00", "#d0ff00", "#d3ff00", "#d6ff00", "#daff00", "#ddff00", "#e0ff00", "#e3ff00", "#e6ff00", "#e9ff00", "#ecff00", "#efff00", "#f3ff00", "#f6ff00", "#f9ff00", "#fcff00", "#ffff00", "#fffb00", "#fff600", "#fff100", "#ffec00", "#ffe700", "#ffe200", "#ffdd00", "#ffd800", "#ffd300", "#ffcd00", "#ffc800", "#ffc300", "#ffbe00", "#ffb900", "#ffb300", "#ffae00", "#ffa900", "#ffa300", "#ff9e00", "#ff9800", "#ff9300", "#ff8d00", "#ff8700", "#ff8100", "#ff7b00", "#ff7500", "#ff6f00", "#ff6800", "#ff6100", "#ff5a00", "#ff5200", "#ff4900", "#ff4000", "#ff3600", "#ff2800", "#ff1500", "#ff0004", "#ff000c", "#ff0013", "#ff0019", "#ff001e", "#ff0023", "#ff0027", "#ff002b", "#ff012f", "#ff0133", "#ff0137", "#ff013b", "#ff023e", "#ff0242", "#ff0246", "#ff0349", "#ff034d", "#ff0450", "#ff0454", "#ff0557", "#ff065b", "#ff065e", "#ff0762", "#ff0865", "#ff0969", "#ff0a6c", "#ff0a70", "#ff0b73", "#ff0c77", "#ff0d7a", "#ff0e7e", "#ff0f81", "#ff1085", "#ff1188", "#ff128c", "#ff138f", "#ff1493"];
        this.data = [];
        this.dynNormalize = true;
        this.init = () => {
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
          this.offscreenctx.fillStyle = "black";
          this.offscreenctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        };
        this.updateData = (data2) => {
          this.data = data2;
        };
        this.onresize = () => {
          const width = this.canvas.parentNode?.clientWidth;
          const height = this.canvas.parentNode?.clientHeight;
          if (width) {
            this.canvas.width = this.canvas.parentNode?.clientWidth;
            this.canvas.style.width = width.toString();
          }
          if (height) {
            this.canvas.height = this.canvas.parentNode?.clientHeight;
            this.canvas.style.height = height.toString();
          }
        };
        this.draw = () => {
          var width = this.canvas.width;
          var height = Math.floor(this.canvas.height);
          var tempCanvasContext = this.offscreenctx;
          var tempCanvas = tempCanvasContext.canvas;
          tempCanvasContext.drawImage(this.canvas, 0, 0, width, height);
          var data2 = [...Array.from(this.data)];
          if (data2.length !== height) {
            var interp = data2;
            data2 = this.interpolateArray(interp, height);
          }
          var offset = 0;
          if (this.offset === true) {
            offset = Math.pow(10, Math.floor(Math.log10(Math.min(...data2))));
          }
          if (this.dynNormalize === true) {
            this.normalizeFactor = 1 / Math.pow(10, Math.floor(Math.log10(Math.max(...data2)) + 0.5));
          }
          for (var i2 = 0; i2 < data2.length; i2++) {
            var value = Math.floor((data2[i2] - offset) * this.normalizeFactor * 255);
            if (value > 255) {
              value = 255;
            } else if (value < 0) {
              value = 0;
            }
            this.ctx.fillStyle = this.colorScale[value];
            this.ctx.fillRect(width - 1, height - i2, 1, 1);
          }
          if (this.reset === false) {
            this.ctx.translate(-1, 0);
            this.ctx.drawImage(tempCanvas, 0, 0, width, height);
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
          } else {
            this.reset = false;
          }
        };
        this.max = props.max ?? 1;
        this.normalizeFactor = props.max ? 1 / props.max : 1;
        this.backgroundColor = props.backgroundColor ?? "#69ce2b";
        window.addEventListener("resize", () => {
          this.onresize();
        });
        this.offscreen = new OffscreenCanvas(this.canvas.width, this.canvas.height);
        this.offscreenctx = this.offscreen.getContext("2d");
        this.init();
        this.data = props.data ?? new Array(this.canvas.height).fill(0);
        this.onresize();
      }
      static get styles() {
        return r$4`

      canvas{
        background: black;
        width: 100%;
        height: 100%;
      }

      `;
      }
      static get properties() {
        return {
          max: {
            type: Number,
            reflect: true
          },
          data: {
            type: Array,
            reflect: true
          },
          backgroundColor: {
            type: String,
            reflect: true
          }
        };
      }
      willUpdate(changedProps) {
        if (changedProps.has("data"))
          this.draw();
      }
      interpolateArray(data2, fitCount) {
        var norm = this.canvas.height / data2.length;
        var linearInterpolate = function(before2, after2, atPoint2) {
          return (before2 + (after2 - before2) * atPoint2) * norm;
        };
        var newData = new Array();
        var springFactor = new Number((data2.length - 1) / (fitCount - 1));
        newData[0] = data2[0];
        for (var i2 = 1; i2 < fitCount - 1; i2++) {
          var tmp = i2 * springFactor;
          var beforeNum = new Number(Math.floor(tmp));
          var before = beforeNum.toFixed();
          var after = new Number(Math.ceil(tmp)).toFixed();
          var atPoint = tmp - beforeNum;
          newData[i2] = linearInterpolate(data2[before], data2[after], atPoint);
        }
        newData[fitCount - 1] = data2[data2.length - 1];
        return newData;
      }
      render() {
        return this.canvas;
      }
    }
    customElements.define("visualscript-spectrogram-stream", Spectrogram$1);
    var index$1 = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      TimeSeries: TimeSeries$1,
      Spectrogram: Spectrogram$1
    });
    var index = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      audio: index$3,
      video: index$2,
      data: index$1
    });
    class Nav extends s$1 {
      constructor(props = { brand: {}, primary: { menu: [], options: [] }, secondary: [] }) {
        super();
        this.stringToFunction = (value) => {
          let regex = new RegExp("(|[a-zA-Z]w*|([a-zA-Z]w*(,s*[a-zA-Z]w*)*))s*=>");
          let func = typeof value === "string" ? value.substring(0, 8) == "function" : false;
          let arrow = typeof value === "string" ? regex.test(value) : false;
          return func || arrow ? (0, eval)("(" + value + ")") : value;
        };
        this.getElement = (o2) => {
          if (o2.onClick)
            o2.onClick = this.stringToFunction(o2.onClick);
          switch (o2.type) {
            case "button":
              const button = document.createElement("visualscript-button");
              button.id = o2.id;
              button.size = "small";
              button.onClick = o2.onClick ?? (() => {
              });
              button.innerHTML = o2.content;
              return button;
            default:
              return $`<a href="${o2.link}" id=${o2.id}  target=${o2.external ? "_blank" : "_self"} class="decorate">${o2.content}</a>`;
          }
        };
        this.primary = props.primary ?? { menu: [], options: [] };
        this.secondary = props.secondary ?? [];
        this.color = props.color ?? "blue";
        this.brand = props.brand ?? { content: "My Brand" };
      }
      static get styles() {
        return r$4`

    
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
      overflow: hidden;
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
      padding:  25px;
      display: flex;
      align-items: center;
    }

    #primary {
      position: sticky; 
      top: 0;
      left: 0;
      max-height: 100px;
      justify-content: space-between;
      font-size: 80%;
    }

    #primary > * > * {
      flex-grow: 1;
      display: flex;
    }

    #primary > * {
      height: 100%;
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
      justify-content: flex-end;
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
      height: 100%;
      padding-right: 15px;
      display: flex;
      align-items: center;
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
    
    nav button:last-child {
      margin-right: 0px;
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

    `;
      }
      static get properties() {
        return {
          primary: {
            type: Object
          },
          secondary: {
            type: Array,
            reflect: true
          },
          brand: {
            type: Object
          },
          color: {
            type: String,
            reflect: true
          }
        };
      }
      willUpdate(changedProps) {
      }
      render() {
        return $`
      <header>
      ${this.secondary.length > 0 ? $`<nav id="secondary">${this.secondary?.map((o2) => this.getElement(o2))}</nav>` : ``}
      <nav id="primary">
      ${$`<div><a class="brand" target=${this.brand.external ? "_blank" : "_self"} href=${this.brand.link}>${this.brand.content ? /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(this.brand.content) ? $`<img src="${this.brand.content}"></img>` : $`<h1>${this.brand.content}</h1><slot></slot>` : $`<h1><slot></slot></h1>`}</a></div>`}
        <div>
          <div id="options">
          ${this.primary.options?.map((o2) => this.getElement(o2))}
          </div>
          <div id="menu">
            ${this.primary.menu?.map((o2) => this.getElement(o2))}
          </div>
        </div>

      </nav>
      </header>
    `;
      }
    }
    customElements.define("visualscript-nav", Nav);
    class Loader extends s$1 {
      constructor(props = {}) {
        super();
        this.progress = props.progress;
        this.color = props.color;
        this.background = props.background ?? "#f3f3f3";
        this.type = props.type ?? "default";
        this.showPercent = props.showPercent ?? true;
        this.text = props.text;
        this.textBackground = props.textBackground;
        this.textColor = props.textColor;
        this.size = props.size ?? "13px";
        if (!this.color) {
          if (this.type === "default")
            this.color = "blue";
          else
            this.color = "#7aff80";
        }
      }
      static get styles() {
        return r$4`
    
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
    `;
      }
      static get properties() {
        return {
          progress: {
            type: Number,
            reflect: true
          },
          text: {
            type: String,
            reflect: true
          },
          type: {
            type: String,
            reflect: true
          },
          color: {
            type: String,
            reflect: true
          },
          background: {
            type: String,
            reflect: true
          },
          textBackground: {
            type: String,
            reflect: true
          },
          textColor: {
            type: String,
            reflect: true
          },
          size: {
            type: String,
            reflect: true
          }
        };
      }
      willUpdate(_2) {
      }
      render() {
        const progress = this.progress ?? 0;
        const text = this.text != void 0 ? this.text : this.showPercent ? `${(progress * 100).toFixed(1)}%` : "";
        switch (this.type) {
          case "linear":
            return $`
            ${text ? $`<div id="linear-text" style="background: ${this.textBackground}; color: ${this.textColor};">${text}</div>` : ""}
            <div id="indicator" style="height:${this.size}; background:${this.background}; opacity:${progress === 1 ? 1 : ""};">
                <div style="width:${progress * 100}%; background: ${this.color}"></div>
              </div>
            `;
          default:
            return $`
            <div class="loader-container" style="height:${this.size}; width:${this.size}; background: ${this.textBackground};">
              ${text ? $`<span style="color: ${this.textColor};">${text}</span>` : ""}
              <div class="loader active" style="border-color: ${this.color};"></div>
            </div>
            `;
        }
      }
    }
    customElements.define("visualscript-loader", Loader);
    const t$1 = {
      ATTRIBUTE: 1,
      CHILD: 2,
      PROPERTY: 3,
      BOOLEAN_ATTRIBUTE: 4,
      EVENT: 5,
      ELEMENT: 6
    }, e$1 = (t2) => (...e2) => ({
      _$litDirective$: t2,
      values: e2
    });
    class i$2 {
      constructor(t2) {
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      _$AT(t2, e2, i2) {
        this._$Ct = t2, this._$AM = e2, this._$Ci = i2;
      }
      _$AS(t2, e2) {
        return this.update(t2, e2);
      }
      update(t2, e2) {
        return this.render(...e2);
      }
    }
    const i$1 = e$1(class extends i$2 {
      constructor(t2) {
        var e2;
        if (super(t2), t2.type !== t$1.ATTRIBUTE || t2.name !== "style" || ((e2 = t2.strings) === null || e2 === void 0 ? void 0 : e2.length) > 2)
          throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
      }
      render(t2) {
        return Object.keys(t2).reduce((e2, r2) => {
          const s2 = t2[r2];
          return s2 == null ? e2 : e2 + `${r2 = r2.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s2};`;
        }, "");
      }
      update(e2, [r2]) {
        const {
          style: s2
        } = e2.element;
        if (this.ct === void 0) {
          this.ct = /* @__PURE__ */ new Set();
          for (const t2 in r2)
            this.ct.add(t2);
          return this.render(r2);
        }
        this.ct.forEach((t2) => {
          r2[t2] == null && (this.ct.delete(t2), t2.includes("-") ? s2.removeProperty(t2) : s2[t2] = "");
        });
        for (const t2 in r2) {
          const e3 = r2[t2];
          e3 != null && (this.ct.add(t2), t2.includes("-") ? s2.setProperty(t2, e3) : s2[t2] = e3);
        }
        return b;
      }
    });
    class Button extends s$1 {
      constructor(props = {}) {
        super();
        this.primary = props.primary;
        this.backgroundColor = props.backgroundColor;
        this.size = props.size;
        this.onClick = props.onClick;
      }
      static get styles() {
        return r$4`

    .storybook-button {
      font-weight: 700;
      border: 0;
      border-radius: 1em;
      cursor: pointer;
      display: inline-block;
      line-height: 1;
      overflow: hidden;
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

    `;
      }
      static get properties() {
        return {
          primary: {
            type: Boolean,
            reflect: true
          },
          backgroundColor: {
            type: String,
            reflect: true
          },
          size: {
            type: String,
            reflect: true
          },
          onClick: {
            type: Function,
            reflect: true
          }
        };
      }
      willUpdate(_2) {
      }
      render() {
        const mode = this.primary ? "storybook-button--primary" : "storybook-button--secondary";
        return $`
      <button
           type="button"
            class=${["storybook-button", `storybook-button--${this.size || "medium"}`, mode].join(" ")}
            style=${i$1({ backgroundColor: this.backgroundColor })}
            @click=${this.onClick}
      >
        <slot>Button</slot>
      </button>
    `;
      }
    }
    customElements.define("visualscript-button", Button);
    class Modal extends s$1 {
      constructor(props = {}) {
        super();
        this.toggle = () => this.open = !this.open;
        this.open = props.open;
        this.header = props.header;
        this.footer = props.footer;
      }
      static get styles() {
        return r$4`
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

    `;
      }
      static get properties() {
        return {
          open: {
            type: Boolean,
            reflect: true
          },
          header: {
            type: Object,
            reflect: true
          },
          footer: {
            type: String,
            reflect: true
          }
        };
      }
      willUpdate(_2) {
      }
      render() {
        return $`
      <div class="modal-content ${this.open ? "open" : ""}">
        ${this.header ? $`<div class="modal-header">
          <span>${this.header}</span>
          <visualscript-button secondary size="extra-small" @click="${this.toggle}">Close</visualscript-button>
        </div>` : ""}
        <div class="modal-body">
          <slot>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fringilla dolor vitae hendrerit feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ultricies arcu nec nibh commodo aliquam at in felis. Mauris lorem dui, porttitor et lectus vel, ornare sodales risus. Sed eu rhoncus ex. Donec tristique nibh lacus, sed dictum lacus lacinia eu. Nunc imperdiet a ante et feugiat. Praesent euismod tortor lacus, et euismod turpis mollis vitae. Etiam sagittis vehicula pulvinar. Aliquam id tincidunt tortor, sed feugiat nulla. Donec sollicitudin tincidunt viverra. Nunc condimentum molestie massa a feugiat. Nam mattis bibendum sodales. Nulla at maximus arcu, quis tempus lacus.

Vestibulum pharetra pretium neque eu faucibus. Morbi aliquam urna non lacinia congue. Donec sed odio interdum, imperdiet tellus in, porttitor erat. Mauris erat velit, facilisis ut luctus sit amet, laoreet vitae ligula. Morbi a mi ultrices, feugiat ante in, convallis enim. Etiam sollicitudin leo purus, ut commodo ex placerat et. Proin ut nulla non risus luctus eleifend eu id orci.

Ut aliquam tristique massa. Nullam a ipsum tincidunt, malesuada ipsum non, suscipit lectus. Suspendisse sit amet risus ut lectus efficitur feugiat in ut urna. Suspendisse odio felis, efficitur eu molestie eu, malesuada nec nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque fermentum sit amet odio id convallis. Donec luctus risus ac pretium ultrices. Quisque congue velit sed hendrerit posuere. Integer dictum felis eu tortor mattis scelerisque. Fusce facilisis justo nec velit vehicula gravida sit amet at erat. Suspendisse sit amet nibh metus. Aenean euismod, tortor a venenatis laoreet, sapien arcu semper turpis, non molestie risus ligula nec velit.

Nulla eget ultrices justo, non posuere dui. Praesent ultrices dui eget erat accumsan varius. Ut ut mi arcu. Integer porttitor, neque vitae fermentum dictum, tellus quam tincidunt mauris, eget tristique turpis mauris nec magna. Phasellus ut tortor eros. Ut vehicula non purus in efficitur. Quisque justo elit, varius id luctus et, pulvinar eget ipsum. Sed tristique et odio eu facilisis.

Phasellus sodales eros at erat elementum, a semper ligula facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi at maximus nunc. In porttitor rutrum rhoncus. Ut dignissim viverra erat in aliquet. Suspendisse potenti. Donec lorem sem, vulputate non diam a, facilisis luctus tortor. In pellentesque ut eros id vulputate. Proin rutrum tincidunt libero, vel dictum libero ullamcorper in. Nam nec ultricies tortor, sit amet pellentesque ante. Sed tellus purus, pharetra vitae purus quis, accumsan vestibulum tellus. Vivamus porttitor urna a odio tincidunt tristique. Integer ut metus finibus, ultricies magna sed, congue eros. Duis velit velit, consectetur at faucibus ac, scelerisque nec diam.
</slot>
        </div>
        ${this.footer ? $`<div class="modal-footer">
          <span>${this.footer}</span>
        </div>` : ""}
      </div>
      <visualscript-overlay .open=${this.open}></visualscript-overlay>
    `;
      }
    }
    customElements.define("visualscript-modal", Modal);
    class Footer extends s$1 {
      static get styles() {
        return r$4`

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
    `;
      }
      static get properties() {
        return {};
      }
      constructor(props = {}) {
        super();
      }
      render() {
        return $`

      <slot></slot>
    `;
      }
    }
    customElements.define("visualscript-footer", Footer);
    class Overlay extends s$1 {
      constructor(props = {}) {
        super();
        this.open = false;
        this.open = props.open ?? false;
      }
      static get styles() {
        return r$4`

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

    `;
      }
      static get properties() {
        return {
          open: {
            type: Boolean,
            reflect: true
          }
        };
      }
      render() {
        return $`
      <div ?open=${this.open ? true : false}>
        <slot></slot>
      </div>
    `;
      }
    }
    customElements.define("visualscript-overlay", Overlay);
    var n$2;
    ((n$2 = window.HTMLSlotElement) === null || n$2 === void 0 ? void 0 : n$2.prototype.assignedElements) != null ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);
    console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");
    const o$1 = e$1(class extends i$2 {
      constructor(t2) {
        var i2;
        if (super(t2), t2.type !== t$1.ATTRIBUTE || t2.name !== "class" || ((i2 = t2.strings) === null || i2 === void 0 ? void 0 : i2.length) > 2)
          throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
      }
      render(t2) {
        return " " + Object.keys(t2).filter((i2) => t2[i2]).join(" ") + " ";
      }
      update(i2, [s2]) {
        var r2, o2;
        if (this.et === void 0) {
          this.et = /* @__PURE__ */ new Set(), i2.strings !== void 0 && (this.st = new Set(i2.strings.join(" ").split(/\s/).filter((t2) => t2 !== "")));
          for (const t2 in s2)
            s2[t2] && !((r2 = this.st) === null || r2 === void 0 ? void 0 : r2.has(t2)) && this.et.add(t2);
          return this.render(s2);
        }
        const e2 = i2.element.classList;
        this.et.forEach((t2) => {
          t2 in s2 || (e2.remove(t2), this.et.delete(t2));
        });
        for (const t2 in s2) {
          const i3 = !!s2[t2];
          i3 === this.et.has(t2) || ((o2 = this.st) === null || o2 === void 0 ? void 0 : o2.has(t2)) || (i3 ? (e2.add(t2), this.et.add(t2)) : (e2.remove(t2), this.et.delete(t2)));
        }
        return b;
      }
    });
    const PersistableProps = {
      label: {
        type: String,
        reflect: true
      },
      persist: {
        type: Boolean,
        reflect: true
      },
      value: {
        type: String,
        reflect: true
      },
      onChange: {
        type: Function,
        reflect: true
      }
    };
    const setPersistent = (o2) => {
      if (o2.persist && o2.label)
        localStorage.setItem(o2.label, String(o2.value));
    };
    const getPersistent = (props) => {
      if (props.value)
        return props.value;
      else if (props.persist && props.label) {
        const val = localStorage.getItem(props.label);
        if (val === "null")
          return null;
        else if (val === "undefined")
          return void 0;
        else
          return val;
      }
    };
    class Input extends s$1 {
      constructor(props = {}) {
        super();
        this.value = props.value ?? "";
        this.outline = props.outline ?? false;
        this.disabled = props.disabled ?? false;
        this.label = props.label;
        this.persist = props.persist;
        this.onChange = props.onChange;
        this.onInput = props.onInput;
        const val = getPersistent(props);
        if (val)
          this.value = val;
      }
      static get properties() {
        return Object.assign(PersistableProps, {
          disabled: { type: Boolean, reflect: true },
          outline: { type: Boolean, reflect: true }
        });
      }
      willUpdate(changedProps) {
        if (changedProps.has("value"))
          setPersistent(this);
      }
      static get styles() {
        return r$4`

        :host {
            width: 100%;
            font-size: 15px;

        }
*{
box-sizing: border-box;
}
.form-group {
position: relative;
margin: 15px 0;
}
input.outline {
border: 1px solid  #333333;
border-radius: 5px;
}
label {
position: absolute;
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
outline: none;
border: none;
border-radius: 0px;
padding: 15px 0.6rem 10px 0.6rem;
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
`;
      }
      render() {
        return $`
            <div class="form-group">
                <input
                class=${o$1({
          outline: this.outline
        })}
                type="${this.type}"
                placeholder="${this.label}"
                .value=${this.value != "null" && this.value != "undefined" ? this.value : ""}
                ?disabled="${this.disabled}"

                @change=${(ev) => {
          this.value = ev.target.value;
          if (this.onChange instanceof Function)
            this.onChange(ev);
        }}

                @input=${(ev) => {
          if (this.onInput instanceof Function)
            this.onInput(ev);
        }}
                />
                <label>${this.label}</label>
            </div>
        `;
      }
    }
    customElements.define("visualscript-input", Input);
    class Search extends s$1 {
      constructor(props = {}) {
        super();
        this.getModal = () => {
          return this.shadowRoot.querySelector("visualscript-modal");
        };
        if (props.items)
          this.items = props.items;
        window.onkeydown = (ev) => {
          switch (ev.code) {
            case "Enter":
              this.modal.open = false;
              break;
            case "ArrowUp":
              console.log("Up!");
              break;
            case "ArrowDown":
              console.log("Down!");
              break;
            case "Escape":
              this.modal.open = false;
              break;
          }
        };
      }
      static get styles() {
        return r$4`

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

    `;
      }
      static get properties() {
        return {
          placeholder: {
            type: String
          },
          items: {
            type: Object
          },
          value: {
            type: String,
            reflect: true
          }
        };
      }
      render() {
        const regex = new RegExp(this.value, "i");
        return $`
        <visualscript-button @click=${() => {
          this.modal = this.getModal();
          this.modal.toggle();
        }}>Search</visualscript-button>
        <visualscript-modal 
          .header=${$`<visualscript-input label="Search" @input=${(ev) => {
          this.value = ev.composedPath()[0].value;
        }}></visualscript-input>`}
          .footer=${$`<div id=commands>Enter to select. Up and Down Arrows to navigate. Esc to close.</div>`}
        >
        <div>${this.items.map((i2) => {
          let matched = false;
          if (this.value) {
            if (i2.tags)
              i2.tags.forEach((v2) => {
                if (v2.match(regex))
                  matched = true;
              });
            if (i2.name.match(regex))
              matched = true;
          } else
            matched = true;
          if (matched)
            return $`<div><h3>${i2.name}</h3><small>${i2.tags ?? "No Tags"}</small></div>`;
        })}</div>
        </visualscript-modal>
      `;
      }
    }
    customElements.define("visualscript-search", Search);
    class Select extends s$1 {
      constructor(props = {}) {
        super();
        this.persist = false;
        this.optionChecked = "";
        this.optionHoveredIndex = -1;
        this.options = [];
        this.onChange = () => {
        };
        this.add = (option) => {
          this.options = [...this.options, option];
        };
        this.openSelectCustom = () => {
          this.elements.elSelectCustom.classList.add("isActive");
          this.elements.elSelectCustom.setAttribute("aria-hidden", "false");
          if (this.optionChecked) {
            const optionCheckedIndex = this.elements.customOptsList.findIndex((el) => el.getAttribute("data-value") === this.optionChecked);
            this.updateCustomSelectHovered(optionCheckedIndex);
          }
          document.addEventListener("keydown", this.supportKeyboardNavigation);
        };
        this.closeSelectCustom = () => {
          this.elements.elSelectCustom.classList.remove("isActive");
          this.elements.elSelectCustom.setAttribute("aria-hidden", "true");
          this.updateCustomSelectHovered(-1);
          document.removeEventListener("keydown", this.supportKeyboardNavigation);
        };
        this.updateCustomSelectHovered = (newIndex) => {
          const prevOption = this.elements.elSelectCustomOpts.children[this.optionHoveredIndex];
          const option = this.elements.elSelectCustomOpts.children[newIndex];
          if (prevOption) {
            prevOption.classList.remove("isHover");
          }
          if (option) {
            option.classList.add("isHover");
          }
          this.optionHoveredIndex = newIndex;
        };
        this.updateCustomSelectChecked = (value, text) => {
          if (this.elements) {
            if (!text)
              text = this.elements.elSelectCustomOpts.querySelectorAll(`[data-value="${value}"]`)[0]?.textContent;
            const prevValue = this.optionChecked;
            const elPrevOption = this.elements.elSelectCustomOpts.querySelector(`[data-value="${prevValue}"`);
            const elOption = this.elements.elSelectCustomOpts.querySelector(`[data-value="${value}"`);
            if (elPrevOption) {
              elPrevOption.classList.remove("isActive");
            }
            if (elOption) {
              elOption.classList.add("isActive");
            }
            const elSelectCustomBox = this.elements.elSelectCustom.children[0].children[0];
            elSelectCustomBox.textContent = text;
            this.optionChecked = value;
          }
        };
        this.watchClickOutside = (e2) => {
          const didClickedOutside = !this.contains(e2.target);
          if (didClickedOutside) {
            this.closeSelectCustom();
          }
        };
        this.supportKeyboardNavigation = (e2) => {
          if (e2.keyCode === 40 && this.optionHoveredIndex < this.optionsCount - 1) {
            this.optionHoveredIndex;
            e2.preventDefault();
            this.updateCustomSelectHovered(this.optionHoveredIndex + 1);
          }
          if (e2.keyCode === 38 && this.optionHoveredIndex > 0) {
            e2.preventDefault();
            this.updateCustomSelectHovered(this.optionHoveredIndex - 1);
          }
          if (e2.keyCode === 13 || e2.keyCode === 32) {
            e2.preventDefault();
            const option = this.elements.elSelectCustomOpts.children[this.optionHoveredIndex];
            const value = option && option.getAttribute("data-value");
            if (value) {
              this.elements.elSelectNative.value = value;
              this.updateCustomSelectChecked(value, option.textContent);
            }
            this.closeSelectCustom();
          }
          if (e2.keyCode === 27) {
            this.closeSelectCustom();
          }
        };
        this.options = props.options ?? [];
        if (props.onChange)
          this.onChange = props.onChange;
        if (props.label)
          this.label = props.label;
        if (props.persist)
          this.persist = props.persist;
        const val = getPersistent(props);
        if (val && this.options.includes(val))
          this.value = val;
      }
      static get styles() {
        return r$4`

    #container { 
      position: relative;
    }

    :host * {
      box-sizing: border-box;
    }

    .selectNative, .selectCustom {
      position: relative;
      width: 100%;
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
      background-position-y: 0.45rem;
      padding: 10px 10px;
    }
    
    .selectCustom-trigger  > div {
      overflow: scroll;
      white-space: nowrap;
    }

    .selectCustom-trigger {
      display: flex;
      align-items: center;
      position: relative;
      padding: 0px 10px;
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

      .selectNative {
        background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
      }

      .selectCustom-options {
        background: rgb(45, 45, 45);
      }
    }
    `;
      }
      static get properties() {
        return Object.assign({
          options: {
            type: Array,
            reflect: true
          }
        }, PersistableProps);
      }
      willUpdate(changedProps) {
        if (changedProps.has("value"))
          setPersistent(this);
        if (changedProps.has("options")) {
          const firstOption = this.options[0]?.value ?? this.options[0];
          this.value = this.value ?? firstOption;
        }
      }
      updated(changedProperties) {
        const elSelectNative = this.shadowRoot.querySelectorAll(".js-selectNative")[0];
        const elSelectCustom = this.shadowRoot.querySelectorAll(".js-selectCustom")[0];
        const elSelectCustomOpts = elSelectCustom.children[1];
        const customOptsList = Array.from(elSelectCustomOpts.children);
        this.optionsCount = customOptsList.length;
        this.elements = {
          elSelectNative,
          elSelectCustom,
          elSelectCustomOpts,
          customOptsList
        };
        if (this.value)
          this.updateCustomSelectChecked(this.value);
      }
      render() {
        return $`
      <div id=container>
      <select class="selectNative js-selectNative" aria-labelledby="${this.label}Label" 
      @change=${(e2) => {
          const value = e2.target.value;
          const elRespectiveCustomOption = this.elements.elSelectCustomOpts.querySelectorAll(`[data-value="${value}"]`)[0];
          this.updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
          this.value = e2.target.value;
          this.onChange(e2);
        }}>
      ${this.options.length === 0 ? $`<slot></slot>` : this.options.map((o2, i2) => {
          if (typeof o2 != "object")
            o2 = { value: o2, text: o2 };
          return $`<option 
          value=${o2.value} 
          ?selected=${o2.value === this.value} 
          >
            ${o2.text}
          </option>`;
        })}
    </select>

    <div class="selectCustom js-selectCustom" aria-hidden="true"}>
      <div class="selectCustom-trigger" @click=${(e2) => {
          const isClosed = !e2.target.parentNode.classList.contains("isActive");
          if (isClosed) {
            this.openSelectCustom();
          } else {
            this.closeSelectCustom();
          }
        }}>
        <div></div>
      </div>
        <div class="selectCustom-options">
        ${this.options.map((o2, i2) => {
          if (typeof o2 != "object")
            o2 = { value: o2, text: o2 };
          return $` <div 
          class="selectCustom-option" 
          data-value=${o2.value}
          @mouseenter=${(e2) => {
            this.updateCustomSelectHovered(i2);
          }}
          @click=${(e2) => {
            const value = e2.target.getAttribute("data-value");
            this.elements.elSelectNative.value = value;
            this.updateCustomSelectChecked(value, e2.target.textContent);
            this.closeSelectCustom();
          }}
          >
            ${o2.text}
          </div>`;
        })}
          </div>
        </div>
      </div>
    </div>
    `;
      }
    }
    customElements.define("visualscript-select", Select);
    class File extends s$1 {
      constructor(props = {}) {
        super();
        this.onChange = () => {
        };
        if (props.accept)
          this.accept = props.accept;
        if (props.onChange)
          this.onChange = props.onChange;
        if (props.webkitdirectory)
          this.webkitdirectory = props.webkitdirectory;
        if (props.directory)
          this.directory = props.directory;
        if (props.multiple)
          this.multiple = props.multiple;
      }
      static get styles() {
        return r$4`

    :host {
      display: flex;
      justify-content: center;
      overflow: hidden;
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
      padding: 10px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border: none;
      overflow: hidden;
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
    
    `;
      }
      static get properties() {
        return {
          accept: {
            type: String,
            reflect: true
          },
          onChange: {
            type: Function,
            reflect: true
          },
          webkitdirectory: {
            type: Boolean,
            reflect: true
          },
          directory: {
            type: Boolean,
            reflect: true
          },
          multiple: {
            type: Boolean,
            reflect: true
          }
        };
      }
      render() {
        const input = document.createElement("input");
        input.type = "file";
        input.id = "fileupload";
        input.accept = this.accept;
        input.webkitdirectory = this.webkitdirectory;
        input.directory = this.directory;
        input.multiple = this.multiple;
        input.onchange = (ev) => {
          const lenFiles = ev.target.files.length;
          const fileUploaded = ev.target.files[0];
          const input2 = this.shadowRoot.querySelector("input[type=text]");
          var filename = lenFiles === 1 ? fileUploaded.name : `${lenFiles} files`;
          input2.value = filename;
          input2.placeholder = filename;
          input2.focus();
          this.onChange(ev);
        };
        return $`
      <label for="fileupload" id="buttonlabel">
        <button aria-controls="filename" tabindex="0" @click=${() => {
          if (input)
            input.click();
        }}>Choose File</button>
      </label>
      ${input}
      <label for="filename" class="hide">
        uploaded file
      </label>
      <input type="text" id="filename" autocomplete="off" readonly placeholder="no file chosen">  
    `;
      }
    }
    customElements.define("visualscript-file", File);
    class Switch extends s$1 {
      constructor(props = {}) {
        super();
        this.persist = false;
        this.onChange = () => {
        };
        if (props.onChange)
          this.onChange = props.onChange;
        if (props.label)
          this.label = props.label;
        if (props.persist)
          this.persist = props.persist;
        const val = getPersistent(props);
        if (val)
          this.value = val;
      }
      static get styles() {
        return r$4`

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

    `;
      }
      static get properties() {
        return PersistableProps;
      }
      willUpdate(changedProps) {
        if (changedProps.has("value"))
          setPersistent(this);
      }
      render() {
        return $`
      <button class="switch" role="switch" aria-pressed="${String(this.value)}" aria-labelledby=${this.label} @click=${(e2) => {
          let pressed = e2.target.getAttribute("aria-pressed") === "true";
          this.value = !pressed;
          e2.target.setAttribute("aria-pressed", String(this.value));
          this.onChange(e2);
        }}>
        <div class="slider round"><div></div></div>
    </button>
    `;
      }
    }
    customElements.define("visualscript-switch", Switch);
    class Range extends s$1 {
      constructor(props = {}) {
        super();
        this.persist = false;
        this.value = 0;
        this.min = 0;
        this.max = 100;
        this.onChange = () => {
        };
        this.onInput = () => {
        };
        if (props.onChange)
          this.onChange = props.onChange;
        if (props.label)
          this.label = props.label;
        if (props.persist)
          this.persist = props.persist;
        if (props.min)
          this.min = props.min;
        if (props.max)
          this.max = props.max;
        const val = getPersistent(props);
        if (val)
          this.value = val;
      }
      static get styles() {
        return r$4`

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

    `;
      }
      static get properties() {
        return Object.assign(PersistableProps, {
          min: {
            type: Number,
            reflect: true
          },
          max: {
            type: Number,
            reflect: true
          }
        });
      }
      willUpdate(changedProps) {
        if (changedProps.has("value"))
          setPersistent(this);
      }
      render() {
        return $`
      <div class="wrapper">
        <input type="range" min="${this.min}" max="${this.max}" id="${this.label}" @change=${(ev) => {
          this.value = ev.target.value;
          this.onChange(ev);
        }} @input=${(ev) => {
          this.onInput(ev);
        }}/>
        <output for="${this.label}">${this.value}</output>
        <label class="visually-hidden" for="${this.label}">${this.label}</label>
      </div>
    `;
      }
    }
    customElements.define("visualscript-range", Range);
    const t = (o2) => o2 === null || typeof o2 != "object" && typeof o2 != "function", r$1 = (o2) => o2.strings === void 0;
    const e = (i2, t2) => {
      var s2, o2;
      const n2 = i2._$AN;
      if (n2 === void 0)
        return false;
      for (const i3 of n2)
        (o2 = (s2 = i3)._$AO) === null || o2 === void 0 || o2.call(s2, t2, false), e(i3, t2);
      return true;
    }, o = (i2) => {
      let t2, s2;
      do {
        if ((t2 = i2._$AM) === void 0)
          break;
        s2 = t2._$AN, s2.delete(i2), i2 = t2;
      } while ((s2 == null ? void 0 : s2.size) === 0);
    }, n$1 = (i2) => {
      for (let t2; t2 = i2._$AM; i2 = t2) {
        let s2 = t2._$AN;
        if (s2 === void 0)
          t2._$AN = s2 = /* @__PURE__ */ new Set();
        else if (s2.has(i2))
          break;
        s2.add(i2), l(t2);
      }
    };
    function r(i2) {
      this._$AN !== void 0 ? (o(this), this._$AM = i2, n$1(this)) : this._$AM = i2;
    }
    function h$1(i2, t2 = false, s2 = 0) {
      const n2 = this._$AH, r2 = this._$AN;
      if (r2 !== void 0 && r2.size !== 0)
        if (t2) {
          if (Array.isArray(n2))
            for (let i3 = s2; i3 < n2.length; i3++)
              e(n2[i3], false), o(n2[i3]);
          else
            n2 != null && (e(n2, false), o(n2));
        } else
          e(this, i2);
    }
    const l = (i2) => {
      var t2, e2, o2, n2;
      i2.type == t$1.CHILD && ((t2 = (o2 = i2)._$AP) !== null && t2 !== void 0 || (o2._$AP = h$1), (e2 = (n2 = i2)._$AQ) !== null && e2 !== void 0 || (n2._$AQ = r));
    };
    class d extends i$2 {
      constructor() {
        super(...arguments), this._$AN = void 0;
      }
      _$AT(i2, t2, s2) {
        super._$AT(i2, t2, s2), n$1(this), this.isConnected = i2._$AU;
      }
      _$AO(i2, t2 = true) {
        var s2, n2;
        i2 !== this.isConnected && (this.isConnected = i2, i2 ? (s2 = this.reconnected) === null || s2 === void 0 || s2.call(this) : (n2 = this.disconnected) === null || n2 === void 0 || n2.call(this)), t2 && (e(this, i2), o(this));
      }
      setValue(t2) {
        if (r$1(this._$Ct))
          this._$Ct._$AI(t2, this);
        else {
          const i2 = [...this._$Ct._$AH];
          i2[this._$Ci] = t2, this._$Ct._$AI(i2, this, 0);
        }
      }
      disconnected() {
      }
      reconnected() {
      }
    }
    class s {
      constructor(t2) {
        this.U = t2;
      }
      disconnect() {
        this.U = void 0;
      }
      reconnect(t2) {
        this.U = t2;
      }
      deref() {
        return this.U;
      }
    }
    class i {
      constructor() {
        this.Y = void 0, this.q = void 0;
      }
      get() {
        return this.Y;
      }
      pause() {
        var t2;
        (t2 = this.Y) !== null && t2 !== void 0 || (this.Y = new Promise((t3) => this.q = t3));
      }
      resume() {
        var t2;
        (t2 = this.q) === null || t2 === void 0 || t2.call(this), this.Y = this.q = void 0;
      }
    }
    const n = (t$12) => !t(t$12) && typeof t$12.then == "function";
    class h extends d {
      constructor() {
        super(...arguments), this._$Cwt = 1073741823, this._$Cyt = [], this._$CG = new s(this), this._$CK = new i();
      }
      render(...s2) {
        var i2;
        return (i2 = s2.find((t2) => !n(t2))) !== null && i2 !== void 0 ? i2 : b;
      }
      update(s2, i2) {
        const r2 = this._$Cyt;
        let e2 = r2.length;
        this._$Cyt = i2;
        const o2 = this._$CG, h2 = this._$CK;
        this.isConnected || this.disconnected();
        for (let t2 = 0; t2 < i2.length && !(t2 > this._$Cwt); t2++) {
          const s3 = i2[t2];
          if (!n(s3))
            return this._$Cwt = t2, s3;
          t2 < e2 && s3 === r2[t2] || (this._$Cwt = 1073741823, e2 = 0, Promise.resolve(s3).then(async (t3) => {
            for (; h2.get(); )
              await h2.get();
            const i3 = o2.deref();
            if (i3 !== void 0) {
              const r3 = i3._$Cyt.indexOf(s3);
              r3 > -1 && r3 < i3._$Cwt && (i3._$Cwt = r3, i3.setValue(t3));
            }
          }));
        }
        return b;
      }
      disconnected() {
        this._$CG.disconnect(), this._$CK.pause();
      }
      reconnected() {
        this._$CG.reconnect(this), this._$CK.resume();
      }
    }
    const c = e$1(h);
    const colorscales$1 = ["Hot", "Cold", "YlGnBu", "YlOrRd", "RdBu", "Portland", "Picnic", "Jet", "Greys", "Greens", "Electric", "Earth", "Bluered", "Blackbody"];
    class TimeSeries extends s$1 {
      constructor(props = {}) {
        super();
        this.colorscale = "Electric";
        this.div = document.createElement("div");
        this.data = [];
        this.plotData = [];
        this.layout = {};
        this.windowSize = 300;
        this.binWidth = 256;
        this.colorscales = colorscales$1;
        this.config = {};
        this.getTraces = () => {
          return this.data.map((o2) => Object.assign({
            type: "scatter",
            mode: "lines"
          }, o2));
        };
        this.getConfig = () => {
          return Object.assign({
            displaylogo: false,
            responsive: true
          }, this.config);
        };
        this.getLayout = () => {
          return Object.assign({}, this.layout);
        };
        this.data = props.data ?? [];
        if (props.layout)
          this.layout = props.layout;
        if (window.Plotly)
          props.Plotly = window.Plotly;
        if (props.colorscale)
          this.colorscale = props.colorscale;
        if (props.onClick)
          this.onClick = props.onClick;
        if (props.onLegendClick)
          this.onLegendClick = props.onLegendClick;
        if (props.config)
          this.config = props.config;
        if (props.Plotly) {
          this.Plotly = props.Plotly;
          this.Plotly.newPlot(this.div, this.getTraces(), this.getLayout(), this.getConfig());
        } else
          console.warn("<visualscript-timeseries->: Plotly instance not provided...");
      }
      static get styles() {
        return r$4`

      :host {
        overflow: hidden;
      }
      
      `;
      }
      createRenderRoot() {
        return this;
      }
      static get properties() {
        return {
          max: {
            type: Number,
            reflect: true
          },
          data: {
            type: Array,
            reflect: true
          },
          layout: {
            type: Object,
            reflect: true
          },
          config: {
            type: Object,
            reflect: true
          },
          colorscale: {
            type: Object,
            reflect: true
          },
          backgroundColor: {
            type: String,
            reflect: true
          },
          onLegendClick: {
            type: Function,
            reflect: true
          },
          onClick: {
            type: Function,
            reflect: true
          }
        };
      }
      transpose(a2) {
        return Object.keys(a2[0]).map(function(c2) {
          return a2.map(function(r2) {
            return r2[c2];
          });
        });
      }
      willUpdate(changedProps) {
        if (changedProps.has("data")) {
          this.Plotly.newPlot(this.div, this.getTraces(), this.getLayout(), this.getConfig());
        }
        if (changedProps.has("onClick")) {
          this.div.on("plotly_click", this.onClick);
        }
        if (changedProps.has("onLegendClick")) {
          this.div.on("plotly_legendclick", this.onLegendClick);
        }
      }
      render() {
        return this.div;
      }
    }
    TimeSeries.colorscales = colorscales$1;
    customElements.define("visualscript-timeseries", TimeSeries);
    const colorscales = ["Hot", "Cold", "YlGnBu", "YlOrRd", "RdBu", "Portland", "Picnic", "Jet", "Greys", "Greens", "Electric", "Earth", "Bluered", "Blackbody"];
    class Spectrogram extends s$1 {
      constructor(props = {}) {
        super();
        this.colorscale = "Electric";
        this.div = document.createElement("div");
        this.data = [];
        this.plotData = [];
        this.layout = {};
        this.windowSize = 300;
        this.binWidth = 256;
        this.config = {};
        this.colorscales = colorscales;
        this.getConfig = () => {
          return Object.assign({
            displaylogo: false,
            responsive: true
          }, this.config);
        };
        this.data = props.data ?? [[]];
        if (props.colorscale)
          this.colorscale = props.colorscale;
        if (props.config)
          this.config = props.config;
        if (window.Plotly)
          props.Plotly = window.Plotly;
        this.plotData = [
          {
            x: [1, 2],
            z: this.transpose(this.data),
            showscale: true,
            colorscale: this.colorscale,
            type: "heatmap"
          }
        ];
        this.layout = {};
        if (props.Plotly) {
          this.Plotly = props.Plotly;
          this.Plotly.newPlot(this.div, this.plotData, this.layout, this.getConfig());
        } else
          console.warn("<-spectrogram>: Plotly instance not provided...");
      }
      static get styles() {
        return r$4`

      `;
      }
      createRenderRoot() {
        return this;
      }
      static get properties() {
        return {
          max: {
            type: Number,
            reflect: true
          },
          data: {
            type: Array,
            reflect: true
          },
          config: {
            type: Object,
            reflect: true
          },
          colorscale: {
            type: Object,
            reflect: true
          },
          backgroundColor: {
            type: String,
            reflect: true
          }
        };
      }
      transpose(a2) {
        return Object.keys(a2[0]).map(function(c2) {
          return a2.map(function(r2) {
            return r2[c2];
          });
        });
      }
      willUpdate(changedProps) {
        if (changedProps.has("colorscale")) {
          if (!Array.isArray(this.colorscale) && !this.colorscales.includes(this.colorscale))
            this.colorscale = "Electric";
          this.Plotly.restyle(this.div, "colorscale", this.colorscale);
        }
        if (changedProps.has("data")) {
          this.plotData[0].z = this.transpose(this.data);
          this.Plotly.newPlot(this.div, this.plotData, this.layout, this.getConfig());
        }
      }
      render() {
        return this.div;
      }
    }
    Spectrogram.colorscales = colorscales;
    customElements.define("visualscript-spectrogram", Spectrogram);
    class ObjectEditor extends s$1 {
      constructor(props = { target: {}, header: "Object" }) {
        super();
        this.history = [];
        this.getMode = (target, plot) => {
          return plot ? "plot" : "view";
        };
        this.set = async (target = {}, plot = false) => {
          if (this.preprocess instanceof Function)
            this.target = await this.preprocess(target);
          else
            this.target = target;
          this.keys = Object.keys(this.target);
          this.mode = this.getMode(this.target, plot);
        };
        this.checkToPlot = (key, o2) => this.plot.length !== 0 && this.plot.reduce((a2, f2) => a2 + f2(key, o2), 0) === this.plot.length;
        this.getActions = async (key, o2) => {
          let actions;
          const val = await Promise.resolve(o2[key]);
          if (typeof val === "object") {
            const mode = this.getMode(val, this.checkToPlot(key, o2));
            actions = $`<visualscript-button primary=true size="small" @click="${async () => {
              this.history.push({ parent: o2, key: this.header });
              await this.set(val, this.checkToPlot(key, o2));
              this.header = key;
            }}">${mode[0].toUpperCase() + mode.slice(1)}</visualscript-button>`;
          }
          return $`
      <div class="actions">
            ${actions}
      </div>
      `;
        };
        this.getElement = async (key, o2) => {
          let display;
          const val = await Promise.resolve(o2[key]);
          if (typeof val === "string" && val.includes("data:image")) {
            display = document.createElement("img");
            display.src = val;
            display.style.height = "100%";
          } else {
            display = new Input();
            display.value = val;
            display.oninput = () => {
              o2[key] = display.value;
            };
          }
          const isObject = typeof val === "object";
          return $`
        <div class="attribute separate">
        <div class="info">
          <span class="name">${key}</span><br>
          <span class="value">${isObject ? Object.keys(val).length ? val.constructor?.name : $`Empty ${val.constructor?.name}` : ""}</span>
        </div>
          ${isObject ? await this.getActions(key, o2) : display}
        </div>`;
        };
        this.set(props.target);
        this.header = props.header ?? "Object";
        this.mode = props.mode ?? "view";
        this.plot = props.plot ?? [];
        this.onPlot = props.onPlot;
        if (props.preprocess)
          this.preprocess = props.preprocess;
        this.timeseries = new TimeSeries({
          data: []
        });
      }
      static get styles() {
        return r$4`

    :host * {
      box-sizing: border-box;
    }

    :host > * {
      background: white;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
      height: 100%;
      width: 100%;
    }

    img {
      max-height: 100px;
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
      width: 100%;
      padding: 10px;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: scroll;
      height: 100%;
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

    .info {
      display: flex;
      align-items: center;
    }

    .name {
      font-weight: 800;
      padding-right: 10px;
    }

    .value {
      font-size: 80%;
    }

    @media (prefers-color-scheme: dark) {
      :host > * {
        background-color: rgb(60, 60, 60);
        box-shadow: 0 1px 5px 0 rgb(255 255 255 / 20%);
      }

      .header {
        border-bottom: 1px solid gray;
      }
    }

    `;
      }
      static get properties() {
        return {
          keys: {
            type: Object,
            reflect: true
          },
          plot: {
            type: Object,
            reflect: true
          },
          header: {
            type: String,
            reflect: true
          },
          mode: {
            type: String,
            reflect: true
          },
          onPlot: {
            type: Function,
            reflect: true
          },
          preprocess: {
            type: Function,
            reflect: true
          }
        };
      }
      render() {
        if (this.mode === "plot") {
          if (this.onPlot instanceof Function)
            this.onPlot(this);
          this.insertAdjacentElement("afterend", this.timeseries);
        } else
          this.timeseries.remove();
        const content = this.mode === "view" ? this.keys?.map((key) => this.getElement(key, this.target)) : [];
        return c(Promise.all(content).then((data2) => {
          return $`
        <div>
          <div class="header separate">
            <span>${this.header}</span>
            ${this.history.length > 0 ? $`<visualscript-button size="extra-small" @click="${() => {
            const historyItem = this.history.pop();
            this.set(historyItem.parent);
            this.header = historyItem.key;
          }}">Go Back</visualscript-button>` : ``}
          </div>
          <div class="container">
                ${data2}
          </div>
        </div>
      `;
        }), $`<span>Loading...</span>`);
      }
    }
    customElements.define("visualscript-object-editor", ObjectEditor);
    var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    var prism = { exports: {} };
    (function(module2) {
      var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
      var Prism2 = function(_self2) {
        var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
        var uniqueId = 0;
        var plainTextGrammar = {};
        var _2 = {
          manual: _self2.Prism && _self2.Prism.manual,
          disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
          util: {
            encode: function encode(tokens) {
              if (tokens instanceof Token) {
                return new Token(tokens.type, encode(tokens.content), tokens.alias);
              } else if (Array.isArray(tokens)) {
                return tokens.map(encode);
              } else {
                return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
              }
            },
            type: function(o2) {
              return Object.prototype.toString.call(o2).slice(8, -1);
            },
            objId: function(obj) {
              if (!obj["__id"]) {
                Object.defineProperty(obj, "__id", {
                  value: ++uniqueId
                });
              }
              return obj["__id"];
            },
            clone: function deepClone(o2, visited) {
              visited = visited || {};
              var clone;
              var id;
              switch (_2.util.type(o2)) {
                case "Object":
                  id = _2.util.objId(o2);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone = {};
                  visited[id] = clone;
                  for (var key in o2) {
                    if (o2.hasOwnProperty(key)) {
                      clone[key] = deepClone(o2[key], visited);
                    }
                  }
                  return clone;
                case "Array":
                  id = _2.util.objId(o2);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone = [];
                  visited[id] = clone;
                  o2.forEach(function(v2, i2) {
                    clone[i2] = deepClone(v2, visited);
                  });
                  return clone;
                default:
                  return o2;
              }
            },
            getLanguage: function(element) {
              while (element) {
                var m2 = lang.exec(element.className);
                if (m2) {
                  return m2[1].toLowerCase();
                }
                element = element.parentElement;
              }
              return "none";
            },
            setLanguage: function(element, language) {
              element.className = element.className.replace(RegExp(lang, "gi"), "");
              element.classList.add("language-" + language);
            },
            currentScript: function() {
              if (typeof document === "undefined") {
                return null;
              }
              if ("currentScript" in document && 1 < 2) {
                return document.currentScript;
              }
              try {
                throw new Error();
              } catch (err) {
                var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
                if (src) {
                  var scripts = document.getElementsByTagName("script");
                  for (var i2 in scripts) {
                    if (scripts[i2].src == src) {
                      return scripts[i2];
                    }
                  }
                }
                return null;
              }
            },
            isActive: function(element, className, defaultActivation) {
              var no = "no-" + className;
              while (element) {
                var classList = element.classList;
                if (classList.contains(className)) {
                  return true;
                }
                if (classList.contains(no)) {
                  return false;
                }
                element = element.parentElement;
              }
              return !!defaultActivation;
            }
          },
          languages: {
            plain: plainTextGrammar,
            plaintext: plainTextGrammar,
            text: plainTextGrammar,
            txt: plainTextGrammar,
            extend: function(id, redef) {
              var lang2 = _2.util.clone(_2.languages[id]);
              for (var key in redef) {
                lang2[key] = redef[key];
              }
              return lang2;
            },
            insertBefore: function(inside, before, insert, root) {
              root = root || _2.languages;
              var grammar = root[inside];
              var ret = {};
              for (var token in grammar) {
                if (grammar.hasOwnProperty(token)) {
                  if (token == before) {
                    for (var newToken in insert) {
                      if (insert.hasOwnProperty(newToken)) {
                        ret[newToken] = insert[newToken];
                      }
                    }
                  }
                  if (!insert.hasOwnProperty(token)) {
                    ret[token] = grammar[token];
                  }
                }
              }
              var old = root[inside];
              root[inside] = ret;
              _2.languages.DFS(_2.languages, function(key, value) {
                if (value === old && key != inside) {
                  this[key] = ret;
                }
              });
              return ret;
            },
            DFS: function DFS(o2, callback, type, visited) {
              visited = visited || {};
              var objId = _2.util.objId;
              for (var i2 in o2) {
                if (o2.hasOwnProperty(i2)) {
                  callback.call(o2, i2, o2[i2], type || i2);
                  var property = o2[i2];
                  var propertyType = _2.util.type(property);
                  if (propertyType === "Object" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, null, visited);
                  } else if (propertyType === "Array" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, i2, visited);
                  }
                }
              }
            }
          },
          plugins: {},
          highlightAll: function(async, callback) {
            _2.highlightAllUnder(document, async, callback);
          },
          highlightAllUnder: function(container, async, callback) {
            var env = {
              callback,
              container,
              selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            _2.hooks.run("before-highlightall", env);
            env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
            _2.hooks.run("before-all-elements-highlight", env);
            for (var i2 = 0, element; element = env.elements[i2++]; ) {
              _2.highlightElement(element, async === true, env.callback);
            }
          },
          highlightElement: function(element, async, callback) {
            var language = _2.util.getLanguage(element);
            var grammar = _2.languages[language];
            _2.util.setLanguage(element, language);
            var parent2 = element.parentElement;
            if (parent2 && parent2.nodeName.toLowerCase() === "pre") {
              _2.util.setLanguage(parent2, language);
            }
            var code = element.textContent;
            var env = {
              element,
              language,
              grammar,
              code
            };
            function insertHighlightedCode(highlightedCode) {
              env.highlightedCode = highlightedCode;
              _2.hooks.run("before-insert", env);
              env.element.innerHTML = env.highlightedCode;
              _2.hooks.run("after-highlight", env);
              _2.hooks.run("complete", env);
              callback && callback.call(env.element);
            }
            _2.hooks.run("before-sanity-check", env);
            parent2 = env.element.parentElement;
            if (parent2 && parent2.nodeName.toLowerCase() === "pre" && !parent2.hasAttribute("tabindex")) {
              parent2.setAttribute("tabindex", "0");
            }
            if (!env.code) {
              _2.hooks.run("complete", env);
              callback && callback.call(env.element);
              return;
            }
            _2.hooks.run("before-highlight", env);
            if (!env.grammar) {
              insertHighlightedCode(_2.util.encode(env.code));
              return;
            }
            if (async && _self2.Worker) {
              var worker2 = new Worker(_2.filename);
              worker2.onmessage = function(evt) {
                insertHighlightedCode(evt.data);
              };
              worker2.postMessage(JSON.stringify({
                language: env.language,
                code: env.code,
                immediateClose: true
              }));
            } else {
              insertHighlightedCode(_2.highlight(env.code, env.grammar, env.language));
            }
          },
          highlight: function(text, grammar, language) {
            var env = {
              code: text,
              grammar,
              language
            };
            _2.hooks.run("before-tokenize", env);
            if (!env.grammar) {
              throw new Error('The language "' + env.language + '" has no grammar.');
            }
            env.tokens = _2.tokenize(env.code, env.grammar);
            _2.hooks.run("after-tokenize", env);
            return Token.stringify(_2.util.encode(env.tokens), env.language);
          },
          tokenize: function(text, grammar) {
            var rest = grammar.rest;
            if (rest) {
              for (var token in rest) {
                grammar[token] = rest[token];
              }
              delete grammar.rest;
            }
            var tokenList = new LinkedList();
            addAfter(tokenList, tokenList.head, text);
            matchGrammar(text, tokenList, grammar, tokenList.head, 0);
            return toArray(tokenList);
          },
          hooks: {
            all: {},
            add: function(name, callback) {
              var hooks = _2.hooks.all;
              hooks[name] = hooks[name] || [];
              hooks[name].push(callback);
            },
            run: function(name, env) {
              var callbacks = _2.hooks.all[name];
              if (!callbacks || !callbacks.length) {
                return;
              }
              for (var i2 = 0, callback; callback = callbacks[i2++]; ) {
                callback(env);
              }
            }
          },
          Token
        };
        _self2.Prism = _2;
        function Token(type, content, alias, matchedStr) {
          this.type = type;
          this.content = content;
          this.alias = alias;
          this.length = (matchedStr || "").length | 0;
        }
        Token.stringify = function stringify(o2, language) {
          if (typeof o2 == "string") {
            return o2;
          }
          if (Array.isArray(o2)) {
            var s2 = "";
            o2.forEach(function(e2) {
              s2 += stringify(e2, language);
            });
            return s2;
          }
          var env = {
            type: o2.type,
            content: stringify(o2.content, language),
            tag: "span",
            classes: ["token", o2.type],
            attributes: {},
            language
          };
          var aliases = o2.alias;
          if (aliases) {
            if (Array.isArray(aliases)) {
              Array.prototype.push.apply(env.classes, aliases);
            } else {
              env.classes.push(aliases);
            }
          }
          _2.hooks.run("wrap", env);
          var attributes = "";
          for (var name in env.attributes) {
            attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
          }
          return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
        };
        function matchPattern(pattern, pos, text, lookbehind) {
          pattern.lastIndex = pos;
          var match = pattern.exec(text);
          if (match && lookbehind && match[1]) {
            var lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
          }
          return match;
        }
        function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
          for (var token in grammar) {
            if (!grammar.hasOwnProperty(token) || !grammar[token]) {
              continue;
            }
            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [patterns];
            for (var j = 0; j < patterns.length; ++j) {
              if (rematch && rematch.cause == token + "," + j) {
                return;
              }
              var patternObj = patterns[j];
              var inside = patternObj.inside;
              var lookbehind = !!patternObj.lookbehind;
              var greedy = !!patternObj.greedy;
              var alias = patternObj.alias;
              if (greedy && !patternObj.pattern.global) {
                var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
              }
              var pattern = patternObj.pattern || patternObj;
              for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
                if (rematch && pos >= rematch.reach) {
                  break;
                }
                var str = currentNode.value;
                if (tokenList.length > text.length) {
                  return;
                }
                if (str instanceof Token) {
                  continue;
                }
                var removeCount = 1;
                var match;
                if (greedy) {
                  match = matchPattern(pattern, pos, text, lookbehind);
                  if (!match || match.index >= text.length) {
                    break;
                  }
                  var from = match.index;
                  var to = match.index + match[0].length;
                  var p2 = pos;
                  p2 += currentNode.value.length;
                  while (from >= p2) {
                    currentNode = currentNode.next;
                    p2 += currentNode.value.length;
                  }
                  p2 -= currentNode.value.length;
                  pos = p2;
                  if (currentNode.value instanceof Token) {
                    continue;
                  }
                  for (var k2 = currentNode; k2 !== tokenList.tail && (p2 < to || typeof k2.value === "string"); k2 = k2.next) {
                    removeCount++;
                    p2 += k2.value.length;
                  }
                  removeCount--;
                  str = text.slice(pos, p2);
                  match.index -= pos;
                } else {
                  match = matchPattern(pattern, 0, str, lookbehind);
                  if (!match) {
                    continue;
                  }
                }
                var from = match.index;
                var matchStr = match[0];
                var before = str.slice(0, from);
                var after = str.slice(from + matchStr.length);
                var reach = pos + str.length;
                if (rematch && reach > rematch.reach) {
                  rematch.reach = reach;
                }
                var removeFrom = currentNode.prev;
                if (before) {
                  removeFrom = addAfter(tokenList, removeFrom, before);
                  pos += before.length;
                }
                removeRange(tokenList, removeFrom, removeCount);
                var wrapped = new Token(token, inside ? _2.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                currentNode = addAfter(tokenList, removeFrom, wrapped);
                if (after) {
                  addAfter(tokenList, currentNode, after);
                }
                if (removeCount > 1) {
                  var nestedRematch = {
                    cause: token + "," + j,
                    reach
                  };
                  matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                  if (rematch && nestedRematch.reach > rematch.reach) {
                    rematch.reach = nestedRematch.reach;
                  }
                }
              }
            }
          }
        }
        function LinkedList() {
          var head = {
            value: null,
            prev: null,
            next: null
          };
          var tail = {
            value: null,
            prev: head,
            next: null
          };
          head.next = tail;
          this.head = head;
          this.tail = tail;
          this.length = 0;
        }
        function addAfter(list, node, value) {
          var next = node.next;
          var newNode = {
            value,
            prev: node,
            next
          };
          node.next = newNode;
          next.prev = newNode;
          list.length++;
          return newNode;
        }
        function removeRange(list, node, count2) {
          var next = node.next;
          for (var i2 = 0; i2 < count2 && next !== list.tail; i2++) {
            next = next.next;
          }
          node.next = next;
          next.prev = node;
          list.length -= i2;
        }
        function toArray(list) {
          var array = [];
          var node = list.head.next;
          while (node !== list.tail) {
            array.push(node.value);
            node = node.next;
          }
          return array;
        }
        if (!_self2.document) {
          if (!_self2.addEventListener) {
            return _2;
          }
          if (!_2.disableWorkerMessageHandler) {
            _self2.addEventListener("message", function(evt) {
              var message = JSON.parse(evt.data);
              var lang2 = message.language;
              var code = message.code;
              var immediateClose = message.immediateClose;
              _self2.postMessage(_2.highlight(code, _2.languages[lang2], lang2));
              if (immediateClose) {
                _self2.close();
              }
            }, false);
          }
          return _2;
        }
        var script = _2.util.currentScript();
        if (script) {
          _2.filename = script.src;
          if (script.hasAttribute("data-manual")) {
            _2.manual = true;
          }
        }
        function highlightAutomaticallyCallback() {
          if (!_2.manual) {
            _2.highlightAll();
          }
        }
        if (!_2.manual) {
          var readyState = document.readyState;
          if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
            document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
          } else {
            if (window.requestAnimationFrame) {
              window.requestAnimationFrame(highlightAutomaticallyCallback);
            } else {
              window.setTimeout(highlightAutomaticallyCallback, 16);
            }
          }
        }
        return _2;
      }(_self);
      if (module2.exports) {
        module2.exports = Prism2;
      }
      if (typeof commonjsGlobal !== "undefined") {
        commonjsGlobal.Prism = Prism2;
      }
      Prism2.languages.markup = {
        "comment": {
          pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
          greedy: true
        },
        "prolog": {
          pattern: /<\?[\s\S]+?\?>/,
          greedy: true
        },
        "doctype": {
          pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
          greedy: true,
          inside: {
            "internal-subset": {
              pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
              lookbehind: true,
              greedy: true,
              inside: null
            },
            "string": {
              pattern: /"[^"]*"|'[^']*'/,
              greedy: true
            },
            "punctuation": /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/i,
            "name": /[^\s<>'"]+/
          }
        },
        "cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          greedy: true
        },
        "tag": {
          pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
          greedy: true,
          inside: {
            "tag": {
              pattern: /^<\/?[^\s>\/]+/,
              inside: {
                "punctuation": /^<\/?/,
                "namespace": /^[^\s>\/:]+:/
              }
            },
            "special-attr": [],
            "attr-value": {
              pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
              inside: {
                "punctuation": [{
                  pattern: /^=/,
                  alias: "attr-equals"
                }, /"|'/]
              }
            },
            "punctuation": /\/?>/,
            "attr-name": {
              pattern: /[^\s>\/]+/,
              inside: {
                "namespace": /^[^\s>\/:]+:/
              }
            }
          }
        },
        "entity": [{
          pattern: /&[\da-z]{1,8};/i,
          alias: "named-entity"
        }, /&#x?[\da-f]{1,8};/i]
      };
      Prism2.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism2.languages.markup["entity"];
      Prism2.languages.markup["doctype"].inside["internal-subset"].inside = Prism2.languages.markup;
      Prism2.hooks.add("wrap", function(env) {
        if (env.type === "entity") {
          env.attributes["title"] = env.content.replace(/&amp;/, "&");
        }
      });
      Object.defineProperty(Prism2.languages.markup.tag, "addInlined", {
        value: function addInlined(tagName, lang) {
          var includedCdataInside = {};
          includedCdataInside["language-" + lang] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: true,
            inside: Prism2.languages[lang]
          };
          includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
          var inside = {
            "included-cdata": {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: includedCdataInside
            }
          };
          inside["language-" + lang] = {
            pattern: /[\s\S]+/,
            inside: Prism2.languages[lang]
          };
          var def = {};
          def[tagName] = {
            pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
              return tagName;
            }), "i"),
            lookbehind: true,
            greedy: true,
            inside
          };
          Prism2.languages.insertBefore("markup", "cdata", def);
        }
      });
      Object.defineProperty(Prism2.languages.markup.tag, "addAttribute", {
        value: function(attrName, lang) {
          Prism2.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp(/(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"),
            lookbehind: true,
            inside: {
              "attr-name": /^[^\s=]+/,
              "attr-value": {
                pattern: /=[\s\S]+/,
                inside: {
                  "value": {
                    pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                    lookbehind: true,
                    alias: [lang, "language-" + lang],
                    inside: Prism2.languages[lang]
                  },
                  "punctuation": [{
                    pattern: /^=/,
                    alias: "attr-equals"
                  }, /"|'/]
                }
              }
            }
          });
        }
      });
      Prism2.languages.html = Prism2.languages.markup;
      Prism2.languages.mathml = Prism2.languages.markup;
      Prism2.languages.svg = Prism2.languages.markup;
      Prism2.languages.xml = Prism2.languages.extend("markup", {});
      Prism2.languages.ssml = Prism2.languages.xml;
      Prism2.languages.atom = Prism2.languages.xml;
      Prism2.languages.rss = Prism2.languages.xml;
      (function(Prism3) {
        var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
        Prism3.languages.css = {
          "comment": /\/\*[\s\S]*?\*\//,
          "atrule": {
            pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
            inside: {
              "rule": /^@[\w-]+/,
              "selector-function-argument": {
                pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                lookbehind: true,
                alias: "selector"
              },
              "keyword": {
                pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                lookbehind: true
              }
            }
          },
          "url": {
            pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
            greedy: true,
            inside: {
              "function": /^url/i,
              "punctuation": /^\(|\)$/,
              "string": {
                pattern: RegExp("^" + string.source + "$"),
                alias: "url"
              }
            }
          },
          "selector": {
            pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
            lookbehind: true
          },
          "string": {
            pattern: string,
            greedy: true
          },
          "property": {
            pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: true
          },
          "important": /!important\b/i,
          "function": {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: true
          },
          "punctuation": /[(){};:,]/
        };
        Prism3.languages.css["atrule"].inside.rest = Prism3.languages.css;
        var markup = Prism3.languages.markup;
        if (markup) {
          markup.tag.addInlined("style", "css");
          markup.tag.addAttribute("style", "css");
        }
      })(Prism2);
      Prism2.languages.clike = {
        "comment": [{
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: true,
          greedy: true
        }, {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }],
        "string": {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        "class-name": {
          pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
          lookbehind: true,
          inside: {
            "punctuation": /[.\\]/
          }
        },
        "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
        "boolean": /\b(?:false|true)\b/,
        "function": /\b\w+(?=\()/,
        "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        "punctuation": /[{}[\];(),.:]/
      };
      Prism2.languages.javascript = Prism2.languages.extend("clike", {
        "class-name": [Prism2.languages.clike["class-name"], {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
          lookbehind: true
        }],
        "keyword": [{
          pattern: /((?:^|\})\s*)catch\b/,
          lookbehind: true
        }, {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: true
        }],
        "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        "number": {
          pattern: RegExp(/(^|[^\w$])/.source + "(?:" + (/NaN|Infinity/.source + "|" + /0[bB][01]+(?:_[01]+)*n?/.source + "|" + /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + /\d+(?:_\d+)*n/.source + "|" + /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source),
          lookbehind: true
        },
        "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
      });
      Prism2.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
      Prism2.languages.insertBefore("javascript", "keyword", {
        "regex": {
          pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
          lookbehind: true,
          greedy: true,
          inside: {
            "regex-source": {
              pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
              lookbehind: true,
              alias: "language-regex",
              inside: Prism2.languages.regex
            },
            "regex-delimiter": /^\/|\/$/,
            "regex-flags": /^[a-z]+$/
          }
        },
        "function-variable": {
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
          alias: "function"
        },
        "parameter": [{
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: true,
          inside: Prism2.languages.javascript
        }, {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: true,
          inside: Prism2.languages.javascript
        }, {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: true,
          inside: Prism2.languages.javascript
        }, {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: true,
          inside: Prism2.languages.javascript
        }],
        "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
      });
      Prism2.languages.insertBefore("javascript", "string", {
        "hashbang": {
          pattern: /^#!.*/,
          greedy: true,
          alias: "comment"
        },
        "template-string": {
          pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
          greedy: true,
          inside: {
            "template-punctuation": {
              pattern: /^`|`$/,
              alias: "string"
            },
            "interpolation": {
              pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
              lookbehind: true,
              inside: {
                "interpolation-punctuation": {
                  pattern: /^\$\{|\}$/,
                  alias: "punctuation"
                },
                rest: Prism2.languages.javascript
              }
            },
            "string": /[\s\S]+/
          }
        },
        "string-property": {
          pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
          lookbehind: true,
          greedy: true,
          alias: "property"
        }
      });
      Prism2.languages.insertBefore("javascript", "operator", {
        "literal-property": {
          pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
          lookbehind: true,
          alias: "property"
        }
      });
      if (Prism2.languages.markup) {
        Prism2.languages.markup.tag.addInlined("script", "javascript");
        Prism2.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript");
      }
      Prism2.languages.js = Prism2.languages.javascript;
      (function() {
        if (typeof Prism2 === "undefined" || typeof document === "undefined") {
          return;
        }
        if (!Element.prototype.matches) {
          Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }
        var LOADING_MESSAGE = "Loading\u2026";
        var FAILURE_MESSAGE = function(status, message) {
          return "\u2716 Error " + status + " while fetching file: " + message;
        };
        var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
        var EXTENSIONS = {
          "js": "javascript",
          "py": "python",
          "rb": "ruby",
          "ps1": "powershell",
          "psm1": "powershell",
          "sh": "bash",
          "bat": "batch",
          "h": "c",
          "tex": "latex"
        };
        var STATUS_ATTR = "data-src-status";
        var STATUS_LOADING = "loading";
        var STATUS_LOADED = "loaded";
        var STATUS_FAILED = "failed";
        var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
        function loadFile(src, success, error) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", src, true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              if (xhr.status < 400 && xhr.responseText) {
                success(xhr.responseText);
              } else {
                if (xhr.status >= 400) {
                  error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
                } else {
                  error(FAILURE_EMPTY_MESSAGE);
                }
              }
            }
          };
          xhr.send(null);
        }
        function parseRange(range) {
          var m2 = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
          if (m2) {
            var start2 = Number(m2[1]);
            var comma = m2[2];
            var end = m2[3];
            if (!comma) {
              return [start2, start2];
            }
            if (!end) {
              return [start2, void 0];
            }
            return [start2, Number(end)];
          }
          return void 0;
        }
        Prism2.hooks.add("before-highlightall", function(env) {
          env.selector += ", " + SELECTOR;
        });
        Prism2.hooks.add("before-sanity-check", function(env) {
          var pre = env.element;
          if (pre.matches(SELECTOR)) {
            env.code = "";
            pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
            var code = pre.appendChild(document.createElement("CODE"));
            code.textContent = LOADING_MESSAGE;
            var src = pre.getAttribute("data-src");
            var language = env.language;
            if (language === "none") {
              var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
              language = EXTENSIONS[extension] || extension;
            }
            Prism2.util.setLanguage(code, language);
            Prism2.util.setLanguage(pre, language);
            var autoloader = Prism2.plugins.autoloader;
            if (autoloader) {
              autoloader.loadLanguages(language);
            }
            loadFile(src, function(text) {
              pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
              var range = parseRange(pre.getAttribute("data-range"));
              if (range) {
                var lines = text.split(/\r\n?|\n/g);
                var start2 = range[0];
                var end = range[1] == null ? lines.length : range[1];
                if (start2 < 0) {
                  start2 += lines.length;
                }
                start2 = Math.max(0, Math.min(start2 - 1, lines.length));
                if (end < 0) {
                  end += lines.length;
                }
                end = Math.max(0, Math.min(end, lines.length));
                text = lines.slice(start2, end).join("\n");
                if (!pre.hasAttribute("data-start")) {
                  pre.setAttribute("data-start", String(start2 + 1));
                }
              }
              code.textContent = text;
              Prism2.highlightElement(code);
            }, function(error) {
              pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
              code.textContent = error;
            });
          }
        });
        Prism2.plugins.fileHighlight = {
          highlight: function highlight(container) {
            var elements = (container || document).querySelectorAll(SELECTOR);
            for (var i2 = 0, element; element = elements[i2++]; ) {
              Prism2.highlightElement(element);
            }
          }
        };
        var logged = false;
        Prism2.fileHighlight = function() {
          if (!logged) {
            console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
            logged = true;
          }
          Prism2.plugins.fileHighlight.highlight.apply(this, arguments);
        };
      })();
    })(prism);
    var Prism = prism.exports;
    class CodeEditor extends s$1 {
      constructor(props = {}) {
        super();
        this.textArea = document.createElement("textarea");
        this.getControls = () => {
          let controls = ["Save"];
          return $`
      <div class="actions">
            ${controls.map((name, i2) => $`<visualscript-button primary size="small" @click="${() => {
            const func = this[`on${name}`];
            if (func)
              func();
          }}">${name}</visualscript-button>`)}
      </div>
      `;
        };
        this.text = (text) => {
          const highlight = this.shadowRoot.getElementById("highlight");
          if (highlight) {
            const el = highlight.querySelector("code");
            let replacedText = text.replace(new RegExp("&", "g"), "&amp").replace(new RegExp("<", "g"), "&lt;");
            el.innerHTML = replacedText;
            Prism.highlightElement(el);
          }
        };
        this.scroll = (element) => {
          const highlight = this.shadowRoot.getElementById("highlight");
          if (highlight) {
            highlight.scrollTop = element.scrollTop;
            if (highlight.scrollTop < element.scrollTop)
              element.scrollTop = highlight.scrollTop;
            highlight.scrollLeft = element.scrollLeft;
          }
        };
        this.value = props.value ?? "";
        if (props.onInput)
          this.onInput = props.onInput;
        if (props.onSave)
          this.onSave = props.onSave;
        if (props.onReset)
          this.onReset = props.onReset;
        if (props.onClose)
          this.onClose = props.onClose;
        this.textArea.id = "editor";
        this.textArea.spellcheck = false;
        this.textArea.oninput = (ev) => {
          this.text(this.textArea.value);
          this.scroll(ev.target);
          if (this.onInput instanceof Function)
            this.onInput(ev);
        };
      }
      static get styles() {
        return r$4`

    
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
  

    `;
      }
      static get properties() {
        return {
          value: {
            type: String,
            reflect: true
          }
        };
      }
      willUpdate(changedProps) {
      }
      render() {
        const language = "javascript";
        this.textArea.placeholder = `Write your ${language} code...`;
        this.textArea.value = this.value;
        return $`
      <div id="controls">
        <h3>${language[0].toUpperCase() + language.slice(1)} Editor</h3>
        ${this.getControls()}
      </div>
      <div id='editorContainer' style="position: relative; width: 100%; height: 100%;">
        ${this.textArea}"
          <pre id="highlight" aria-hidden="true">
            <code class="language-${language}"></code>
        </pre>
    </div>
    `;
      }
    }
    customElements.define("visualscript-code-editor", CodeEditor);
    class GraphEditor extends s$1 {
      constructor(props = { tree: {} }) {
        super();
        this.history = [];
        this.set = async (tree = {}) => {
          this.tree = tree;
          this.keys = Object.keys(this.tree);
        };
        this.getElement = async (key, o2) => {
          let display;
          const val = await Promise.resolve(o2[key]);
          if (typeof val === "string" && val.includes("data:image")) {
            display = document.createElement("img");
            display.src = val;
            display.style.height = "100%";
          } else {
            display = new Input();
            display.value = val;
            display.oninput = () => {
              o2[key] = display.value;
            };
          }
          const isObject = typeof val === "object";
          return $`
        <div class="attribute separate">
        <div class="info">
          <span class="name">${key}</span><br>
          <span class="value">${isObject ? Object.keys(val).length ? val.constructor?.name : $`Empty ${val.constructor?.name}` : ""}</span>
        </div>
          ${key}${o2}
        </div>`;
        };
        this.set(props.tree);
      }
      static get styles() {
        return r$4`

    :host * {
      box-sizing: border-box;
    }

    :host > * {
      background: white;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
      height: 100%;
      width: 100%;
    }

    img {
      max-height: 100px;
    }

    .container {
      width: 100%;
      padding: 10px;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: scroll;
      height: 100%;
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

    .info {
      display: flex;
      align-items: center;
    }

    .name {
      font-weight: 800;
      padding-right: 10px;
    }

    .value {
      font-size: 80%;
    }

    @media (prefers-color-scheme: dark) {
      :host > * {
        background-color: rgb(60, 60, 60);
        box-shadow: 0 1px 5px 0 rgb(255 255 255 / 20%);
      }
    }

    `;
      }
      static get properties() {
        return {
          keys: {
            type: Object,
            reflect: true
          }
        };
      }
      render() {
        return $`
          <div class="container">
                ${this.tree}
          </div>
      `;
      }
    }
    customElements.define("visualscript-graph-editor", GraphEditor);
    class DeviceEditor extends s$1 {
      static get styles() {
        return r$4`
    :host {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    :host * {
      
      box-sizing: border-box;
      
    }
    `;
      }
      static get properties() {
        return {};
      }
      constructor(props = { target: {}, header: "Object" }) {
        super();
      }
      render() {
        return $`

      <slot></slot>
    `;
      }
    }
    customElements.define("visualscript-device-editor", DeviceEditor);
    class SessionEditor extends s$1 {
      static get styles() {
        return r$4`
    :host {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    :host * {
      
      box-sizing: border-box;
      
    }
    `;
      }
      static get properties() {
        return {};
      }
      constructor(props = { target: {}, header: "Object" }) {
        super();
      }
      render() {
        return $`

      <slot></slot>
    `;
      }
    }
    customElements.define("visualscript-session-editor", SessionEditor);
    const slotGrid = r$4`

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

`;
    class Dashboard extends s$1 {
      constructor(props = {}) {
        super();
        this.apps = /* @__PURE__ */ new Map();
        this.open = props.open ?? true;
        this.closeHandler = props.closeHandler ?? (() => {
        });
        if (props.toggletext)
          this.toggletext = props.toggletext;
        this.toggle = typeof props.toggle === "string" ? document.getElementById(props.toggle) : props.toggle;
      }
      static get styles() {
        return r$4`
    
    :host {
      color-scheme: light dark;
      position: relative;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      grid-area: main;
      overflow: hidden;
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

    ${slotGrid}

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
    `;
      }
      static get properties() {
        return {
          toggletext: {
            type: String,
            reflect: true
          },
          toggle: {
            type: Object,
            reflect: true
          },
          open: {
            type: Boolean,
            reflect: true
          },
          closeHandler: {
            type: Function,
            reflect: true
          },
          global: {
            type: Boolean,
            reflect: true
          }
        };
      }
      render() {
        if (this.global)
          this.classList.add("global");
        else
          this.classList.remove("global");
        if (this.global) {
          const apps = document.querySelectorAll("visualscript-app");
          for (var i2 = 0; i2 < apps.length; i2++) {
            const app = apps[i2];
            if (!this.apps.has(app.name))
              this.apps.set(app.name, app);
          }
        }
        if (this.open)
          this.classList.add("open");
        else {
          this.classList.remove("open");
          this.dispatchEvent(new CustomEvent("close"));
        }
        this.main = this.querySelector("visualscript-main");
        this.footer = this.querySelector("visualscript-footer");
        this.nav = this.querySelector("visualscript-nav");
        this.sidebar = this.querySelector("visualscript-sidebar");
        const onClick = () => {
          this.open = true;
          const selectedApp = this.apps.values().next().value;
          selectedApp.toggle.shadowRoot.querySelector("button").click();
        };
        if (this.toggle)
          this.toggle.onclick = onClick;
        return $`
      ${this.global && !this.toggle ? $`<div id="dashboard-toggle" @click=${onClick}>${this.toggletext ?? "Edit"}</div>` : ""}
      ${this.global ? $`<visualscript-button id='close' secondary size="small" @click=${() => this.open = false}>Close</visualscript-button>` : ``}
      <slot>
      </slot>
    `;
      }
    }
    customElements.define("visualscript-dashboard", Dashboard);
    const TabTogglePropsLit = {
      name: {
        type: String,
        reflect: true
      },
      selected: {
        type: Boolean,
        reflect: true
      }
    };
    class TabToggle extends s$1 {
      constructor(tab) {
        super();
        this.select = (toggles) => {
          this.to.on(this);
          if (!toggles) {
            const parent2 = this.parentNode;
            const tabContainer = parent2.getRootNode().host;
            toggles = Array.from(tabContainer.tabs.values()).map((tab2) => tab2.toggle);
          }
          if (toggles) {
            this.selected = true;
            toggles.forEach((t2) => {
              if (t2 != this) {
                t2.selected = false;
                t2.to.style.display = "none";
                t2.to.off(this);
              } else {
                t2.to.style.display = "";
              }
            });
          } else
            console.warn("No TabBar instance in the global Main");
          const dashboard = this.to.dashboard;
          if (dashboard) {
            const sidebar = dashboard.querySelector("visualscript-sidebar");
            if (sidebar) {
              sidebar.content = this.to.controlPanel.children.length ? this.to.controlPanel : "";
            }
          }
        };
        this.to = tab;
      }
      static get styles() {
        return r$4`

    :host {
      flex-grow: 1;
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
    `;
      }
      static get properties() {
        return TabTogglePropsLit;
      }
      render() {
        return $`
      <button class="${this.selected ? "selected" : ""}"  @click=${() => this.select()}>${this.to.name ?? `Tab`}</button>
    `;
      }
    }
    customElements.define("visualscript-tab-toggle", TabToggle);
    class Control extends s$1 {
      constructor(props = {}) {
        super();
        this.label = "Control";
        this.type = "button";
        this.persist = false;
        this.options = [];
        this.onChange = () => {
        };
        this.getElement = () => {
          if (this.type === "select")
            this.element = new Select(this);
          else if (this.type === "file")
            this.element = new File(this);
          else if (this.type === "switch")
            this.element = new Switch(this);
          else if (this.type === "range")
            this.element = new Range(this);
          else if (["input", "text", "number"].includes(this.type))
            this.element = new Input(this);
          else
            this.element = new Button(this);
        };
        this.willUpdate = (changedProps) => {
          changedProps.forEach((v2, k2) => {
            if (this.element)
              this.element[k2] = this[k2];
          });
        };
        if (props.label)
          this.label = props.label;
        if (props.type)
          this.type = props.type;
        if (props.park)
          this.park = props.park;
        if (props.persist)
          this.persist = props.persist;
        if (props.options)
          this.options = props.options;
        if (props.value)
          this.value = props.value;
        if (props.onChange)
          this.onChange = props.onChange;
        if (props.accept)
          this.accept = props.accept;
        if (props.webkitdirectory)
          this.webkitdirectory = props.webkitdirectory;
        if (props.directory)
          this.directory = props.directory;
        if (props.multiple)
          this.multiple = props.multiple;
        if (props.onClick)
          this.onClick = props.onClick;
        if (props.primary)
          this.primary = props.primary;
        if (props.backgroundColor)
          this.backgroundColor = props.backgroundColor;
        if (props.size)
          this.size = props.size;
      }
      static get styles() {
        return r$4`

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
      padding: 0px 5px;
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

    `;
      }
      static get properties() {
        return {
          label: {
            type: String,
            reflect: true
          },
          type: {
            type: String,
            reflect: true
          },
          persist: {
            type: Boolean,
            reflect: true
          },
          park: {
            type: Boolean,
            reflect: true
          },
          value: {
            type: Object,
            reflect: true
          },
          options: {
            type: Object,
            reflect: true
          },
          onChange: {
            type: Object,
            reflect: true
          },
          accept: {
            type: String,
            reflect: true
          },
          webkitdirectory: {
            type: Boolean,
            reflect: true
          },
          directory: {
            type: Boolean,
            reflect: true
          },
          multiple: {
            type: Boolean,
            reflect: true
          },
          primary: {
            type: Boolean,
            reflect: true
          },
          backgroundColor: {
            type: String,
            reflect: true
          },
          size: {
            type: String,
            reflect: true
          },
          onClick: {
            type: Object,
            reflect: true
          }
        };
      }
      render() {
        this.getElement();
        return $`<div><h5>${this.label}</h5>${this.element}</div><slot></slot>`;
      }
      updated(changedProperties) {
        const slot = this.shadowRoot.querySelector("slot");
        const nodes = slot.assignedNodes();
        if (this.type === "button" && nodes.length)
          nodes.forEach((el) => this.element.appendChild(el.cloneNode()));
      }
    }
    customElements.define("visualscript-control", Control);
    const tabStyle = r$4`

:host {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: inherit;
  display: block;
}

slot {
  overflow: scroll;
}

:host * {
  
  box-sizing: border-box;
  
}
`;
    const TabPropsLit = {
      name: {
        type: String,
        reflect: true
      },
      controls: {
        type: Array,
        reflect: true
      },
      on: {
        type: Function,
        reflect: true
      },
      off: {
        type: Function,
        reflect: true
      }
    };
    class Tab extends s$1 {
      constructor(props = {}) {
        super();
        this.controls = [];
        this.on = () => {
        };
        this.off = () => {
        };
        this.type = "tab";
        this.addControl = (instance) => {
          this.controlPanel.appendChild(instance);
        };
        this.updated = () => {
          const controls = this.querySelectorAll("visualscript-control");
          controls.forEach((control) => {
            if (this.type === "app")
              control.park = true;
            else if (!control.park)
              this.addControl(control);
          });
        };
        if (props.name)
          this.name = props.name;
        if (props.controls)
          this.controls = props.controls;
        if (props.on)
          this.on = props.on;
        if (props.off)
          this.off = props.off;
        let dashboards = document.body.querySelectorAll("visualscript-dashboard");
        this.dashboard = Array.from(dashboards).find((o2) => o2.parentNode === document.body) ?? new Dashboard();
        this.dashboard.global = true;
        this.dashboard.open = false;
        this.toggle = new TabToggle(this);
        this.dashboard.addEventListener("close", (ev) => {
          this.off(this.toggle);
        });
      }
      static get styles() {
        return tabStyle;
      }
      static get properties() {
        return TabPropsLit;
      }
      willUpdate(changedProps) {
        if (changedProps.has("controls")) {
          this.controlPanel = document.createElement("div");
          this.controls.forEach((o2) => {
            this.addControl(new Control(o2));
          });
        }
      }
      render() {
        return $`
      <slot></slot>
    `;
      }
    }
    customElements.define("visualscript-tab", Tab);
    class App extends Tab {
      constructor(props = {}) {
        const tabProps = Object.assign({
          on: (target) => {
            this.dashboard.main.appendChild(this);
            if (props.on instanceof Function)
              props.on(target);
          },
          off: (target) => {
            this.style.display = "";
            this.parent.appendChild(this);
            if (props.off instanceof Function)
              props.off(target);
          }
        }, props);
        tabProps.name = props.name;
        super(tabProps);
        this.name = props.name;
        this.type = "app";
        this.parent = this.parentNode;
      }
      static get styles() {
        return r$4`
    :host {
      color-scheme: light dark;
      max-width: 100vw;
      max-height: 100vh;
    }


    slot {
      overflow: hidden !important;
    }

    ${tabStyle}
    ${slotGrid}
    `;
      }
      static get properties() {
        return Object.assign({}, TabPropsLit);
      }
      render() {
        if (!parent)
          this.parent = this.parentNode;
        return $`
        <slot></slot>
      `;
      }
    }
    customElements.define("visualscript-app", App);
    const TabBarPropsLit = {};
    class TabBar extends s$1 {
      static get styles() {
        return r$4`

    :host {
      background: whitesmoke;
      overflow-y: hidden;
      overflow-x: scroll;
      display: flex;
      position: sticky;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 1000;
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
    `;
      }
      static get properties() {
        return TabBarPropsLit;
      }
      constructor(props = {}) {
        super();
      }
      render() {
        return $`
      <slot></slot>
    `;
      }
    }
    customElements.define("visualscript-tab-bar", TabBar);
    class Main extends s$1 {
      constructor(props = { target: {}, header: "Object" }) {
        super();
        this.tabs = /* @__PURE__ */ new Map();
        this.getTabs = () => {
          const tabs = [];
          if (this.parentNode?.global) {
            const apps = document.querySelectorAll("visualscript-app");
            for (var i2 = 0; i2 < apps.length; i2++) {
              if (!tabs.includes(apps[i2]))
                tabs.push(apps[i2]);
            }
          }
          for (var i2 = 0; i2 < this.children.length; i2++) {
            const child = this.children[i2];
            if (child instanceof Tab)
              tabs.push(child);
          }
          tabs.forEach((tab) => this.tabs.set(tab.name, tab));
          return tabs;
        };
      }
      static get styles() {
        return r$4`

    :host {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      grid-area: main;
      overflow: hidden;
      background: inherit;
      color: inherit;
      position: relative;
    }

    :host * {
      box-sizing: border-box;
    }
    `;
      }
      static get properties() {
        return {
          tabs: {
            type: Object
          }
        };
      }
      render() {
        const tabs = this.getTabs();
        const toggles = tabs.map((t2, i2) => {
          if (i2 !== 0)
            t2.style.display = "none";
          return t2.toggle;
        });
        return $`
      <visualscript-tab-bar style="${toggles.length < 1 ? "display: none;" : ""}">${toggles}</visualscript-tab-bar>
      <slot></slot>
    `;
      }
    }
    customElements.define("visualscript-main", Main);
    class Gallery extends s$1 {
      constructor(props = {}) {
        super();
        this.things = [];
        this.search = false;
        this.load = (thing, i2) => {
          thing.style.display = "none";
          return $`<div id=tile @click=${() => {
            console.log("clicked!");
          }}>
        <div>
          <h3>${thing.name}</h3>
          <p>Item #${i2}.</p>
        <div>
      </div>`;
        };
        this.getThings = () => {
          this.things = [];
          for (var i2 = 0; i2 < this.children.length; i2++) {
            const child = this.children[i2];
            if (child.name)
              this.things.push(child);
          }
          return this.things;
        };
        if (props.search)
          this.search = props.search;
      }
      static get styles() {
        return r$4`

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
    `;
      }
      static get properties() {
        return {};
      }
      render() {
        this.getThings();
        return $`
      <visualscript-search .items=${this.things}></visualscript-search>
      <div id=things>
      ${this.things.map(this.load)}
      </div>
      <section>
        <slot></slot>
      </section>
    `;
      }
    }
    customElements.define("visualscript-gallery", Gallery);
    class TabContainer extends s$1 {
      constructor(props = {}) {
        super();
        this.tabs = /* @__PURE__ */ new Map();
        this.tabLabels = [];
        this.addTab = (tab) => {
          this.insertAdjacentElement("beforeend", tab);
          this.tabs.set(tab.name, tab);
          this.updateTabs();
        };
        this.removeTab = (tab) => {
          if (tab instanceof Tab)
            tab = tab.name;
          const tabObj = this.tabs.get(tab);
          tabObj.remove();
          this.updateTabs();
          this.tabs.delete(tab);
        };
        this.updateTabs = () => {
          this.tabLabels = Array.from(this.tabs.values()).map((t2) => t2.name);
        };
        this.getTabs = () => {
          this.tabs = /* @__PURE__ */ new Map();
          for (var i2 = 0; i2 < this.children.length; i2++) {
            const child = this.children[i2];
            if (child instanceof Tab)
              this.tabs.set(child.name, child);
          }
          this.updateTabs();
          return Array.from(this.tabs.values());
        };
      }
      static get styles() {
        return r$4`

    :host {
      box-sizing: border-box;
      grid-area: main;
      overflow: hidden;
      background: inherit;
      color: inherit;
      position: relative;
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-areas:
          "tabs"
          "content";
      grid-template-rows: min-content 1fr;
    }

    :host * {
      box-sizing: border-box;
    }
    `;
      }
      static get properties() {
        return {
          tabLabels: {
            type: Object,
            reflect: true
          },
          tabs: {
            type: Object
          }
        };
      }
      render() {
        const tabs = this.getTabs();
        const toggles = tabs.map((t2, i2) => {
          if (i2 !== 0)
            t2.style.display = "none";
          return t2.toggle;
        });
        const firstToggle = toggles[0];
        if (firstToggle)
          firstToggle.select(toggles);
        return $`
      <visualscript-tab-bar style="${toggles.length < 1 ? "display: none;" : ""}">${toggles}</visualscript-tab-bar>
      <slot></slot>
    `;
      }
    }
    customElements.define("visualscript-tab-container", TabContainer);
    const collapseThreshold = 600;
    class Sidebar extends s$1 {
      constructor(props = {}) {
        super();
        this.content = "";
        this.interacted = false;
        this.closed = props.closed;
        this.classList.add("default");
      }
      static get styles() {
        return r$4`

    
    :host {

      --collapse-width: ${collapseThreshold}px;
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
      overflow: hidden;
      max-width: 50vw;
    }


    :host > * {
      box-sizing: border-box;
    }

    :host([closed]) > #main {
        width: 0px;
        overflow: hidden;
    }

    :host([closed]) > #toggle {
      width: var(--final-toggle-width);
    }

    #main {
      overflow: hidden;
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
      overflow-x: hidden;
      overflow-y: scroll;
      height: 100%;
    }

    @media only screen and (max-width: ${collapseThreshold}px) {
      :host {
        max-width: 100%;
      }

      :host(.default) > #main {
          width: 0px;
          overflow: hidden;
      }

      :host(.default) > #toggle {
        width: var(--final-toggle-width);
      }
    }


    #toggle {
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
    }

    `;
      }
      static get properties() {
        return {
          closed: {
            type: Boolean,
            reflect: true
          },
          content: {
            type: Object,
            reflect: true
          }
        };
      }
      render() {
        const renderToggle = this.content || this.children?.length;
        return $`
        <button id=toggle class="${!!renderToggle ? "" : "hidden"}" @click=${() => {
          const wasDefault = this.classList.contains("default");
          this.classList.remove("default");
          if (window.innerWidth < collapseThreshold) {
            if (!wasDefault)
              this.closed = !this.closed;
          } else
            this.closed = !this.closed;
        }}></button>
        <div id=main>
          <div id=controls>
          ${this.content}
          <slot></slot>
          </div>
        </div>
      `;
      }
    }
    customElements.define("visualscript-sidebar", Sidebar);
    class SidebarHeader extends s$1 {
      static get styles() {
        return r$4`

    :host {
      width: 100%;
    }

    h4 {
      background: rgb(25, 25, 25);
      color: white;
      margin: 0px;
      padding: 10px 25px;
    }

    @media (prefers-color-scheme: dark) {
      h4 {
        color: black;
        background: rgb(60, 60, 60);
      }
    }

    `;
      }
      static get properties() {
        return {};
      }
      constructor(props = {}) {
        super();
      }
      render() {
        return $`
          <h4><slot></slot></h4>
      `;
      }
    }
    customElements.define("visualscript-sidebar-header", SidebarHeader);
    exports2.App = App;
    exports2.Button = Button;
    exports2.CodeEditor = CodeEditor;
    exports2.Control = Control;
    exports2.Dashboard = Dashboard;
    exports2.DeviceEditor = DeviceEditor;
    exports2.File = File;
    exports2.Footer = Footer;
    exports2.Gallery = Gallery;
    exports2.GraphEditor = GraphEditor;
    exports2.Input = Input;
    exports2.Loader = Loader;
    exports2.Main = Main;
    exports2.Modal = Modal;
    exports2.Nav = Nav;
    exports2.ObjectEditor = ObjectEditor;
    exports2.Overlay = Overlay;
    exports2.Range = Range;
    exports2.Search = Search;
    exports2.Select = Select;
    exports2.SessionEditor = SessionEditor;
    exports2.Sidebar = Sidebar;
    exports2.SidebarHeader = SidebarHeader;
    exports2.Spectrogram = Spectrogram;
    exports2.Switch = Switch;
    exports2.Tab = Tab;
    exports2.TabBar = TabBar;
    exports2.TabBarPropsLit = TabBarPropsLit;
    exports2.TabContainer = TabContainer;
    exports2.TabPropsLit = TabPropsLit;
    exports2.TabToggle = TabToggle;
    exports2.TabTogglePropsLit = TabTogglePropsLit;
    exports2.TimeSeries = TimeSeries;
    exports2.slotGrid = slotGrid;
    exports2.streams = index;
    exports2.tabStyle = tabStyle;
    Object.defineProperty(exports2, "__esModule", { value: true });
  });

  // app/transformations.js
  var arrayAdd = (arr1, arr2) => {
    return arr1.map((v, i) => {
      return v + arr2[i];
    });
  };
  var arrayDifference = (arr1, arr2) => {
    return arr1.map((v, i) => {
      const diff = Math.abs(v - arr2[i]);
      return diff;
    });
  };
  var transformations_default = transformations = {
    add: arrayAdd,
    difference: arrayDifference
  };

  // app/alphabetize/heatmap.js
  function heatmap({ canvas, context }, rows, cols, boxInfo) {
    const rowsPerPerson = rows;
    const people = boxInfo.average.length;
    rows = people * rows;
    const max = Math.max(...boxInfo.average.flat(2));
    var bw = canvas.width;
    var bh = canvas.height;
    let colSize = bw / cols;
    let rowSize = bh / rows;
    let lastPerson = 0;
    for (var row = 0; row < rows; row++) {
      for (var col = 0; col < cols; col++) {
        const x = col * colSize;
        const y = row * rowSize;
        let person = Math.floor(row / rowsPerPerson);
        if (person != lastPerson) {
          context.beginPath();
          context.moveTo(0, y);
          context.lineTo(bw, y);
          context.strokeStyle = "white";
          context.stroke();
        }
        lastPerson = person;
        const data2 = boxInfo.average[person];
        const personRow = row % rowsPerPerson;
        if (boxInfo.start > personRow || boxInfo.end <= personRow) {
          context.fillStyle = `rgb(0,0,0)`;
        } else {
          const informativeRow = personRow - boxInfo.start;
          const relVal = data2[col][informativeRow] / max;
          const b = 0;
          const g = 0;
          const r = 255 * relVal;
          context.fillStyle = `rgb(${r}, ${g}, ${b})`;
        }
        context.fillRect(x, y, colSize, rowSize);
      }
    }
  }

  // app/alphabetize/visualize.js
  var visualize = (o, callback) => {
    if (o.worker.changed) {
      const sorted = new Map([...o.worker.alphabet.entries()].sort((a, b) => b[1] - a[1]));
      let i = 0;
      const maxToVisualize = 200;
      if (sorted.length > maxToVisualize)
        console.warn(`Only visualizing ${maxToVisualize}/${sorted.length} patterns`);
      sorted.forEach((count2, identifier) => {
        if (i < maxToVisualize) {
          o.createContainer(i);
          const boxInfo = o.worker.alphabetData.get(identifier);
          heatmap(o.containers[i], o.worker.frequencies, o.worker.duration, boxInfo);
          o.containers[i].count.innerHTML = `${count2}`;
          const freq = document.createElement("p");
          freq.innerHTML = `<b>Bin ${boxInfo.bin}:</b> (${boxInfo.frequencies[0].toFixed(0)} to ${boxInfo.frequencies[1].toFixed(0)} hz)`;
          const header = document.createElement("small");
          header.innerHTML = "<b>Click to Show Times</b>";
          const list = document.createElement("ol");
          header.onclick = () => {
            if (list.style.display === "none") {
              list.style.display = "";
              header.innerHTML = "<b>Click to Hide Times</b>";
            } else {
              list.style.display = "none";
              header.innerHTML = "<b>Click to Show Times</b>";
            }
          };
          list.style.display = "none";
          boxInfo.times.forEach((o2) => {
            const li = document.createElement("li");
            li.innerHTML = `${o2.t.toFixed(4)}s`;
            list.appendChild(li);
          });
          o.containers[i].readout.appendChild(freq);
          o.containers[i].readout.appendChild(header);
          o.containers[i].readout.appendChild(document.createElement("br"));
          o.containers[i].readout.appendChild(document.createElement("br"));
          o.containers[i].readout.appendChild(list);
          i++;
          if (callback instanceof Function)
            callback((i + 1) / sorted.size);
        }
      });
    }
  };
  var visualize_default = visualize;

  // app/alphabetize/info.js
  var alphabetDiv = document.getElementById("alphabet");
  var info = {
    worker: {},
    createContainer: (key) => {
      const container = document.createElement("div");
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;
      const readout = document.createElement("div");
      const count2 = document.createElement("h3");
      container.classList.add("letter");
      container.insertAdjacentElement("beforeend", count2);
      container.insertAdjacentElement("beforeend", canvas);
      container.insertAdjacentElement("beforeend", readout);
      alphabetDiv.insertAdjacentElement("beforeend", container);
      info.containers[key] = {
        container,
        readout,
        count: count2,
        canvas,
        context: canvas.getContext("2d")
      };
      return container;
    },
    containers: {}
  };
  var durationRange = document.getElementById("duration");
  var freqWindowRange = document.getElementById("freqWindow");
  var fftRange = document.getElementById("ffts");
  var euclideanDistanceInput = document.getElementById("distance");
  var maximumFrequencyInput = document.getElementById("maxFreq");
  var inputs = [
    { el: durationRange, variable: "duration" },
    { el: freqWindowRange, variable: "freqWindow" },
    { el: fftRange, variable: "maximumFFTs" },
    { el: euclideanDistanceInput, variable: "distanceMax" },
    { el: maximumFrequencyInput, variable: "maxFreq" }
  ];
  inputs.forEach(({ el, variable }) => {
    let immediate = true;
    let input = el.shadowRoot.querySelector("visualscript-input");
    if (input)
      input = input.shadowRoot.querySelector("input");
    info.worker[variable] = parseInt(el.value ?? input?.value ?? 0);
    if (!info.worker[variable]) {
      setTimeout(() => {
        let input2 = el.shadowRoot.querySelector("visualscript-input");
        if (input2)
          input2 = input2.shadowRoot.querySelector("input");
        info.worker[variable] = parseInt(input2?.value);
        immediate = false;
      }, 100);
    }
    console.log("Variable", info.worker[variable], input);
    el.onInput = (ev) => {
      const val = parseInt(ev.target.value);
      if (!immediate || val != void 0 && !isNaN(val))
        info.worker[variable] = val;
      console.log("Variable", info.worker[variable]);
    };
  });
  var info_default = info;

  // app/alphabetize/init.js
  var init = () => {
    info_default.worker.alphabet = /* @__PURE__ */ new Map();
    info_default.worker.alphabetData = /* @__PURE__ */ new Map();
    info_default.worker.patterns = {};
    info_default.worker.history = [[]];
    info_default.worker.frequencies = 0;
    info_default.worker.n = 0;
    for (let key in info_default.containers)
      info_default.containers[key].container.remove();
    info_default.containers = {};
    return info_default;
  };
  var init_default = init;

  // app/alphabetize/worker.js
  var url = URL.createObjectURL(new Blob([String('(()=>{var E=(s,e)=>Math.sqrt(s*s+e*e),A=s=>s.reduce((e,a)=>e+a,0)/s.length,x=(s,e,a="euclidean")=>A(s.map((r,p)=>A(r.map((c,n)=>E(c,e[p][n])))));var b=(s,e)=>W(s,e,(a,r)=>(a+r)/2),W=(s,e,a)=>s.map((r,p)=>r.map((c,n)=>a(c,e[p][n])));onmessage=async function(s){let[e,...a]=s.data,r;e==="process"?r=await _(...a):console.error("Unrecognized message in worker",e),postMessage(["done",r])};async function _(s,e){e.startTime||(e.startTime=Date.now()),e.changed=!1;let a=s.length,r=0;!!s[0].frequencies[0]?.length||s.forEach(m=>m.frequencies=[m.frequencies]);let c=s[0].frequencies;e.frequencies=c[0].length;let n=[];c.forEach((m,u)=>{e.history[0].length===e.duration&&(n.push(Object.assign({},e.history)),e.history=e.history.map(l=>[])),s.map(l=>l.frequencies[u]).forEach((l,f)=>{e.history[f]||(e.history[f]=[]),e.history[f].push(l)})});let D=n.forEach(async(m,u)=>{let l=performance.now(),k=Array.from({length:Math.ceil(e.frequencies/e.freqWindow)},(y,o)=>o*e.freqWindow).forEach(async y=>{let o=y,v=y+e.freqWindow;e.patterns[o]||(e.patterns[o]=[]);let w=e.patterns[o];if(v<e.frequencies){let i=[];for(let t=0;t<a;t++){let g=m[t].map(d=>Array.from(d).slice(o,v));i.push(g)}let M=(Date.now()-e.startTime)/1e3,h=!1;if(w.forEach(t=>{let g=t.average,d=x(i[0],g[0]),q=x(i[1],g[1]);(d+q)/2<e.distanceMax&&(h?h.push(t):h=[t])}),!h){let t={id:Math.floor(1e5*Math.random()),times:[{t:M,i:u}],bin:y,average:i};h=[t],w.push(t)}else h.forEach(t=>{t.times.push({t:M,i:u,original:i}),t.average[0]=b(t.average[0],i[0]),t.average[1]=b(t.average[1],i[1])});h.forEach(t=>{let g=t.times.length,d=!0,q=!0;g>1&&(d||q)&&(e.alphabet.has(t.id)||r++,e.alphabet.set(t.id,g),e.alphabetData.set(t.id,{average:t.average,start:o,end:v,times:t.times,bin:t.bin}),e.changed=!0)})}}),T=performance.now(),P=(u+1)/n.length;postMessage(["progress",P,T-l,r])});return console.log("outer promises",D),e}})();\n')], { type: "text/javascript" }));
  var worker_default = url;

  // app/alphabetize/process.js
  var worker = new Worker(worker_default);
  var resolver = null;
  var workerCallback = null;
  worker.onmessage = function(e) {
    const [msg, ...data2] = e.data;
    if (msg === "done" && resolver instanceof Function) {
      resolver(data2);
      resolver = null;
      workerCallback = null;
    } else {
      if (workerCallback instanceof Function)
        workerCallback(msg, ...data2);
    }
  };
  var processWithWorker = async (arr, info2, callback) => {
    const workerOutput = await new Promise((resolve, reject) => {
      resolver = resolve;
      workerCallback = callback;
      worker.postMessage(["process", arr, info2.worker]);
    });
    if (workerOutput[0])
      info2.worker = workerOutput[0];
    return info2;
  };
  var process_default = processWithWorker;

  // app/AudioManager.js
  var AudioManager = class {
    get in() {
      return this.nodes[0];
    }
    constructor(info2) {
      this.context = null;
      this.info = info2;
      this.nodes = [];
      this.analyser = null;
      this.out = null;
      this.canListen = false;
      this.fftData = {};
      this.analyses = {};
      this.integrations = {};
    }
    analyse = () => {
      for (let k in this.analyses) {
        this.analyses[k].output = this.analyses[k].function();
      }
      for (let k in this.integrations) {
        this.integrations[k].output = this.integrations[k].function();
      }
    };
    initializeContext = () => {
      if (!this.context) {
        setInterval(this.analyse, 50);
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        if (this.info.minFreq) {
          const highPassNode = this.context.createBiquadFilter();
          this.nodes.push(highPassNode);
          highPassNode.type = "highpass";
          highPassNode.frequency.value = this.info.minFreq;
        }
        if (this.info.maxFreq) {
          const lowPassNode = this.context.createBiquadFilter();
          this.nodes.push(lowPassNode);
          lowPassNode.type = "lowpass";
          lowPassNode.frequency.value = this.info.maxFreq;
          this.nodes[this.nodes.length - 1].connect(lowPassNode);
        }
        this.analyser = this.createAnalyser();
        this.nodes[this.nodes.length - 1].connect(this.analyser);
        this.out = this.context.createGain();
        this.out.gain.value = 1;
        this.out.connect(this.context.destination);
      }
    };
    createAnalyser = (ctx = this.context) => {
      const analyser = ctx.createAnalyser();
      analyser.smoothingTimeConstant = this.info.smoothingTimeConstant;
      analyser.fftSize = this.info.fftSize;
      analyser.minDecibels = this.info.minDecibels;
      analyser.maxDecibels = this.info.maxDecibels;
      return analyser;
    };
    cloneAudioBuffer = (fromAudioBuffer) => {
      const audioBuffer = new AudioBuffer({
        length: fromAudioBuffer.length,
        numberOfChannels: fromAudioBuffer.numberOfChannels,
        sampleRate: fromAudioBuffer.sampleRate
      });
      for (let channelI = 0; channelI < audioBuffer.numberOfChannels; ++channelI) {
        const samples = fromAudioBuffer.getChannelData(channelI);
        audioBuffer.copyToChannel(samples, channelI);
      }
      return audioBuffer;
    };
    fft = function(buff, callback, onend) {
      const ctx = new OfflineAudioContext(1, buff.length, this.context.sampleRate);
      const splitInfo = this.split(buff.numberOfChannels, () => {
      }, {
        context: ctx,
        nodes: [(i, nodes) => {
          const processor = ctx.createScriptProcessor(1024, 1, 1);
          this.fftData[i] = [];
          processor.onaudioprocess = (e) => {
            const data2 = new Uint8Array(nodes.analyser.frequencyBinCount);
            nodes.analyser.getByteFrequencyData(data2);
            if (typeof callback == "function")
              callback(data2);
            this.fftData[i].push(data2);
          };
          return processor;
        }]
      });
      const source = ctx.createBufferSource();
      source.connect(splitInfo.input);
      splitInfo.output.connect(ctx.destination);
      source.buffer = buff;
      source.onended = (e) => {
        if (typeof onend == "function")
          onend(this.fftData);
      };
      source.start();
      ctx.startRendering().catch((err) => console.log("Rendering failed: " + err));
    };
    split = (channels, onChannel, options = {}) => {
      const context = options.context ?? this.context;
      var splitter = context.createChannelSplitter(channels);
      var merger = context.createChannelMerger(channels);
      for (let i = 0; i < channels; i++) {
        const gainNode = context.createGain();
        gainNode.gain.setValueAtTime(1, context.currentTime);
        const analyser = this.createAnalyser(context);
        splitter.connect(analyser, i);
        const nodes = {
          analyser,
          gainNode
        };
        let upstream = analyser;
        if (options.nodes)
          options.nodes.forEach((f, j) => {
            const node = f(i, nodes);
            upstream.connect(node);
            upstream = node;
            nodes[`custom${j}`] = node;
          });
        upstream.connect(gainNode);
        gainNode.connect(merger, 0, i);
        if (onChannel instanceof Function)
          onChannel(i, nodes);
      }
      return {
        output: merger,
        input: splitter
      };
    };
    addSource = (src, addDisplay2 = () => {
    }) => {
      src.connect(this.in);
      const channels = src.channelCount ?? src.buffer?.numberOfChannels;
      if (channels > 1) {
        const splitInfo = this.split(channels, (i, nodes) => {
          const o = addDisplay2();
          o.container.insertAdjacentHTML("afterbegin", `<h3>${i == 0 ? "Left" : "Right"} Channel </h3>`);
          this.addAnalysis(nodes.analyser, "fft", o.spectrogram, this.info.onData);
        });
        this.analyser.connect(splitInfo.input);
        const o4 = init_default(10);
        this.integrate("alphabet", [0, 1], async (arr) => await process_default(arr, o4), visualize_default);
        const thisGain = this.context.createGain();
        splitInfo.output.connect(thisGain);
        thisGain.connect(this.out);
        if (this.canListen)
          thisGain.gain.value = 1;
        else
          thisGain.gain.value = 0;
      } else {
        const o = addDisplay2();
        const thisGain = this.context.createGain();
        this.analyser.connect(thisGain);
        thisGain.connect(this.out);
        if (this.canListen)
          thisGain.gain.value = 1;
        else
          thisGain.gain.value = 0;
        this.addAnalysis(this.analyser, "fft", o.spectrogram);
      }
      if (video) {
        video.onended = () => {
          src.disconnect();
        };
      }
      if (src.start instanceof Function)
        src.start();
    };
    addAnalysis = (analyser, type, outputObj, ondata) => {
      const analysisIndex = Object.keys(this.analyses).length;
      let getData = () => {
      };
      switch (type) {
        case "fft":
          const frequencies = new Uint8Array(analyser.frequencyBinCount);
          getData = () => {
            analyser.getByteFrequencyData(frequencies);
            const freqArr = Array.from(frequencies);
            if (outputObj)
              outputObj.updateData(freqArr);
            const data2 = { frequencies: freqArr };
            if (ondata instanceof Function)
              ondata(data2, analysisIndex);
            return data2;
          };
          break;
        case "raw":
          let raw = new Uint8Array(1);
          getData = () => {
            analyser.getByteTimeDomainData(raw);
            const arr = Array.from(raw);
            outputObj.updateData([arr]);
            const data2 = { timeseries: arr };
            ondata(data2, analysisIndex);
            return data2;
          };
          break;
      }
      this.analyses[analysisIndex] = {
        function: getData,
        output: null
      };
    };
    integrate = (key, iArr, integrator = (arr) => {
    }, after = () => {
    }) => {
      this.integrations[key] = {
        function: async () => {
          const o2 = await integrator(iArr.map((i) => this.analyses[i].output));
          after(o2);
        },
        output: null
      };
    };
    listen = (val = !this.canListen) => {
      this.canListen = val;
    };
  };

  // app/controls.js
  var overlay = document.querySelector("visualscript-overlay");
  var overlayDiv = document.createElement("div");
  overlay.insertAdjacentElement("beforeend", overlayDiv);
  var features = [];
  var designTab = document.getElementById("design");
  var colorscale = document.getElementById("colorscale");
  var transformation = document.getElementById("transformation");
  var threshold = document.getElementById("threshold");
  var dataSelect = document.getElementById("dataSelect");
  var transformFFTData = (o, transformation2) => {
    if (o[0] && o[1]) {
      if (transformation2 instanceof Function) {
        return o[0].map((arr, i) => {
          return transformation2(arr, o[1][i]);
        });
      } else
        console.error("Invalid transformation function provided...");
    } else
      console.warn("No FFT data yet...");
  };
  if (transformation) {
    transformation.options = Object.keys(transformations_default);
    transformation.onChange = (ev) => {
      plotData(void 0, void 0, ev.target.value);
    };
  }
  if (threshold) {
    threshold.onChange = (ev) => {
      plotData(void 0, void 0, void 0, ev.target.value);
    };
  }
  var plotData = (data2 = audio.fftData, which = dataSelect.element.value, how = transformation.element.value, thresh = threshold.element.value) => {
    return new Promise((resolve) => {
      if (audio.fftData[0]) {
        overlayDiv.innerHTML = `Plotting ${data2[0].length} FFT windows...`;
        overlay.open = true;
        setTimeout(() => {
          let plottedData;
          switch (which) {
            case "Right Channel":
              transformation.style.display = "none";
              plottedData = data2[0];
              break;
            case "Left Channel":
              transformation.style.display = "none";
              plottedData = data2[1];
              break;
            case "Combined":
              transformation.style.display = "";
              plottedData = transformFFTData(data2, transformations_default[how]);
          }
          if (plottedData) {
            const min = Math.min(...plottedData.map((arr) => Math.min(...arr)));
            const max = Math.max(...plottedData.map((arr) => Math.max(...arr)));
            threshold.element.min = min;
            threshold.element.max = max;
            features = plottedData.map((arr) => arr.map((v) => v < thresh ? 0 : v));
            spectrogram.data = features;
          } else
            console.warn("Plot not updated because there was no data");
          overlay.open = false;
          resolve(features);
        }, 500);
      }
    });
  };
  if (dataSelect) {
    dataSelect.options = ["Right Channel", "Left Channel", "Combined"];
    dataSelect.onChange = (ev) => {
      plotData(void 0, ev.target.value);
    };
  }
  var spectrogram = new visualscript.Spectrogram({
    Plotly
  });
  if (colorscale) {
    colorscale.options = visualscript.Spectrogram.colorscales;
    designTab.insertAdjacentElement("beforeend", spectrogram);
    colorscale.value = spectrogram.colorscale;
    colorscale.onChange = (ev) => {
      spectrogram.colorscale = ev.target.value;
    };
  }
  var volume = document.getElementById("volume");
  var frequencyBinCount = Math.pow(2, 11);
  var minFreq = 7e3;
  var maxFreq = 0;
  var audioInfo = {
    smoothingTimeConstant: 0.2,
    fftSize: frequencyBinCount,
    minDecibels: -127,
    maxDecibels: 0,
    minFreq,
    maxFreq,
    onData: (o, i) => {
      let volumeSum = 0;
      for (const volume2 of o.frequencies)
        volumeSum += volume2;
      const averageVolume = volumeSum / o.frequencies.length;
      const volumeVal = averageVolume / (audio.info.maxDecibels - audio.info.minDecibels);
      if (volume)
        volume.volume = volumeVal;
    }
  };
  var audio = new AudioManager(audioInfo);

  // app/ripThroughFile.js
  var fileFFTs = {};
  var binToFreq = (bin, hzPerBin) => bin * hzPerBin - hzPerBin / 2;
  var freqToBin = (freq, hzPerBin) => Math.ceil((freq + hzPerBin / 2) / hzPerBin);
  var getFileFFT = (file) => {
    const type = file.type.split("/")[0];
    if (fileFFTs[file.name])
      return fileFFTs[file.name];
    else {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (ev) => {
          overlay.open = true;
          overlayDiv.innerHTML = `<h3>Decoding audio data from ${type} file...</h3>`;
          audio.context.decodeAudioData(ev.target.result, (data2) => {
            overlayDiv.innerHTML = "<h3>Getting FFTs...</h3>";
            audio.fft(data2, null, async (o) => {
              fileFFTs[file.name] = {
                ffts: o,
                data: data2
              };
              resolve(fileFFTs[file.name]);
            });
          });
        };
        function handleEvent(event) {
          console.log(`${event.type}: ${event.loaded} bytes transferred
`, event);
          if (event.type === "error") {
            reject(event);
          }
        }
        reader.addEventListener("error", handleEvent);
        reader.readAsArrayBuffer(file);
      });
    }
  };
  var ripThroughFile = async (file) => {
    const type = file.type.split("/")[0];
    const fftInfo = await getFileFFT(file);
    overlay.open = true;
    let info2 = init_default();
    const hzPerBin = audio.context.sampleRate / (2 * audio.analyser.frequencyBinCount);
    const fftWindowWidth = audio.analyser.fftSize;
    const maxFreqBin = freqToBin(info2.worker.maxFreq, hzPerBin);
    console.log("maxFreqBin", maxFreqBin, info2.worker, info2.worker.maxFreq);
    let filePct = 0;
    let fileLength = 0;
    const ffts = Object.assign({}, fftInfo.ffts);
    for (let key in ffts) {
      const len = ffts[key].length - 1;
      filePct = info2.worker.maximumFFTs / len;
      fileLength = len * fftWindowWidth / fftInfo.data.sampleRate;
      ffts[key] = ffts[key].slice(0, info2.worker.maximumFFTs);
      if (maxFreqBin && !isNaN(maxFreqBin))
        ffts[key] = ffts[key].map((arr) => arr.slice(0, maxFreqBin));
    }
    const arrInput = [];
    const averageOver = 20;
    const performanceArr = [];
    for (let key in fftInfo.ffts)
      arrInput.push({ frequencies: ffts[key] });
    const setOverlay = (ratio = 0, performanceAverage = 0, patterns = 0) => {
      overlayDiv.innerHTML = `
                    <div>
                        <h3>Deriving an alphabet <small>${(100 * ratio).toFixed(2)}%</small></h3>
                        <small>${info2.worker.maximumFFTs} FFTs | First ${(fileLength * filePct).toFixed(1)}s of the file</small>
                        <p><b>Unique Patterns Found:</b> ${patterns}</p>
                        <p><b>Comparison Time per Duration:</b> ${performanceAverage.toFixed(0)}ms</p>
                    </div>
                `;
    };
    setOverlay();
    const tic = Date.now();
    console.log("Passing", arrInput, info2);
    info2 = await process_default(arrInput, info2, (msg, ratio, performance2, patterns) => {
      if (msg === "progress") {
        performanceArr.push(performance2);
        if (performanceArr.length > averageOver)
          performanceArr.shift(performance2);
        const performanceAverage = performanceArr.reduce((a, b) => a + b, 0) / performanceArr.length;
        setOverlay(ratio, performanceAverage, patterns);
      }
    });
    const toc = Date.now();
    console.log(`Got Alphabet in ${((toc - tic) / 1e3).toFixed(2)}s`, info2.worker);
    info2.worker.alphabetData.forEach((o) => {
      o.times = o.times.map((obj) => {
        obj.t = obj.i * fftWindowWidth / fftInfo.data.sampleRate;
        return obj;
      });
      o.frequencies = [binToFreq(o.bin, hzPerBin), binToFreq(o.bin + info2.worker.freqWindow, hzPerBin)];
    });
    visualize_default(info2, (ratio) => {
      overlayDiv.innerHTML = `<h3>Visualizing the alphabet</h3> - ${(100 * ratio).toFixed(2)}%`;
    });
    overlay.open = false;
    if (type === "audio") {
      const source = audio.context.createBufferSource();
      source.buffer = data;
      return source;
    } else
      return;
  };
  var ripThroughFile_default = ripThroughFile;

  // app/index.js
  var showRealtime = false;
  var start = document.getElementById("start");
  var runAnalysis = document.getElementById("runAnalysis");
  var audioInputSelect = document.getElementById("in");
  var audioOutputSelect = document.getElementById("out");
  var videoSelect = document.getElementById("video");
  var fileInput = document.getElementById("files");
  var videos = document.getElementById("videos");
  var analysesDiv = document.getElementById("analyses");
  if (showRealtime) {
    let gotDevices = function(deviceInfos) {
      for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        var option = document.createElement("option");
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === "audioinput") {
          option.text = deviceInfo.label || "Microphone " + (audioInputSelect.options.length + 1);
          audioInputSelect.options = [...audioInputSelect.options, option];
        } else if (deviceInfo.kind === "audiooutput") {
          option.text = deviceInfo.label || "Speaker " + (audioOutputSelect.options.length + 1);
          audioOutputSelect.options = [...audioOutputSelect.options, option];
        } else if (deviceInfo.kind === "videoinput") {
          option.text = deviceInfo.label || "Camera " + (videoSelect.options.length + 1);
          videoSelect.options = [...videoSelect.options, option];
        }
      }
    };
    navigator.mediaDevices.enumerateDevices().then(gotDevices);
    const sourceRegistry2 = {};
  } else {
    audioInputSelect.style.display = "none";
    audioOutputSelect.style.display = "none";
    videoSelect.style.display = "none";
  }
  var addDisplay = (input, type = "stream") => {
    let o;
    if (type === "stream") {
      o = spawnStreamDisplay(count, input);
      count++;
    }
    return o;
  };
  var spawnStreamDisplay = (count2, o = {}) => {
    const container = document.createElement("div");
    container.classList.add("container");
    analysesDiv.insertAdjacentElement("beforeend", container);
    if (o.video) {
      if (o.stream) {
        o.video.srcObject = o.stream;
        o.video.controls = true;
        o.video.muted = true;
      } else {
        o.video.controls = true;
      }
      o.video.autoplay = true;
    }
    sourceRegistry[count2] = {
      container,
      video: o.video,
      stream: o.stream,
      spectrogram: new visualscript.streams.data.Spectrogram()
    };
    container.insertAdjacentElement("beforeend", sourceRegistry[count2].spectrogram);
    return sourceRegistry[count2];
  };
  var count = 0;
  var files = [];
  runAnalysis.onclick = async (ev) => {
    audio.initializeContext();
    count = 0;
    for (let file of files) {
      const type = file.type.split("/")[0];
      let source, video2;
      if (type === "video") {
        video2 = document.createElement("video");
        video2.src = URL.createObjectURL(file);
        source = audio.context.createMediaElementSource(video2);
        ripThroughFile_default(file);
      } else {
        source = await ripThroughFile_default(file);
      }
      if (showRealtime) {
        if (video2)
          videos.insertAdjacentElement("beforeend", video2);
        audio.addSource(source, (type2) => addDisplay({ video: video2 }, type2));
      }
    }
  };
  fileInput.onChange = async (ev) => files = ev.target.files;
  if (start)
    start.onClick = () => {
      start.parentNode.style.display = "none";
      audio.initializeContext();
      audio.listen(false);
      navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: audioInputSelect.element.value } },
        video: { deviceId: { exact: videoSelect.element.value } }
      }).then((stream) => {
        const video2 = document.createElement("video");
        const microphone = audio.context.createMediaStreamSource(stream);
        videos.insertAdjacentElement("beforeend", video2);
        audio.addSource(microphone, (type) => addDisplay({ video: video2, stream }, type));
      });
    };
})();
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
 * Copyright 2020 Google LLC
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
