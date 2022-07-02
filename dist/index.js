(() => {
  // app/visualscript/index.esm.js
  var t$3 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var e$4 = Symbol();
  var n$6 = /* @__PURE__ */ new Map();
  var s$4 = class {
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
  };
  var o$5 = (t2) => new s$4(typeof t2 == "string" ? t2 : t2 + "", e$4);
  var r$4 = (t2, ...n2) => {
    const o2 = t2.length === 1 ? t2[0] : n2.reduce((e2, n3, s2) => e2 + ((t3) => {
      if (t3._$cssResult$ === true)
        return t3.cssText;
      if (typeof t3 == "number")
        return t3;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(n3) + t2[s2 + 1], t2[0]);
    return new s$4(o2, e$4);
  };
  var i$4 = (e2, n2) => {
    t$3 ? e2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((t2) => {
      const n3 = document.createElement("style"), s2 = window.litNonce;
      s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t2.cssText, e2.appendChild(n3);
    });
  };
  var S$1 = t$3 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
    let e2 = "";
    for (const n2 of t3.cssRules)
      e2 += n2.cssText;
    return o$5(e2);
  })(t2) : t2;
  var s$3;
  var e$3 = window.trustedTypes;
  var r$3 = e$3 ? e$3.emptyScript : "";
  var h$3 = window.reactiveElementPolyfillSupport;
  var o$4 = {
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
  };
  var n$5 = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2);
  var l$3 = {
    attribute: true,
    type: String,
    converter: o$4,
    reflect: false,
    hasChanged: n$5
  };
  var a$1 = class extends HTMLElement {
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
  };
  a$1.finalized = true, a$1.elementProperties = /* @__PURE__ */ new Map(), a$1.elementStyles = [], a$1.shadowRootOptions = {
    mode: "open"
  }, h$3 == null || h$3({
    ReactiveElement: a$1
  }), ((s$3 = globalThis.reactiveElementVersions) !== null && s$3 !== void 0 ? s$3 : globalThis.reactiveElementVersions = []).push("1.3.1");
  var t$2;
  var i$3 = globalThis.trustedTypes;
  var s$2 = i$3 ? i$3.createPolicy("lit-html", {
    createHTML: (t2) => t2
  }) : void 0;
  var e$2 = `lit$${(Math.random() + "").slice(9)}$`;
  var o$3 = "?" + e$2;
  var n$4 = `<${o$3}>`;
  var l$2 = document;
  var h$2 = (t2 = "") => l$2.createComment(t2);
  var r$2 = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function";
  var d$1 = Array.isArray;
  var u = (t2) => {
    var i2;
    return d$1(t2) || typeof ((i2 = t2) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
  };
  var c$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var a = />/g;
  var f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
  var _ = /'/g;
  var m = /"/g;
  var g = /^(?:script|style|textarea|title)$/i;
  var p = (t2) => (i2, ...s2) => ({
    _$litType$: t2,
    strings: i2,
    values: s2
  });
  var $ = p(1);
  var b = Symbol.for("lit-noChange");
  var w = Symbol.for("lit-nothing");
  var T = /* @__PURE__ */ new WeakMap();
  var x = (t2, i2, s2) => {
    var e2, o2;
    const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
    let l2 = n2._$litPart$;
    if (l2 === void 0) {
      const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
      n2._$litPart$ = l2 = new N(i2.insertBefore(h$2(), t3), t3, void 0, s2 != null ? s2 : {});
    }
    return l2._$AI(t2), l2;
  };
  var A = l$2.createTreeWalker(l$2, 129, null, false);
  var C = (t2, i2) => {
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
  var E = class {
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
  };
  function P(t2, i2, s2 = t2, e2) {
    var o2, n2, l2, h2;
    if (i2 === b)
      return i2;
    let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
    const u2 = r$2(i2) ? void 0 : i2._$litDirective$;
    return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = P(t2, d2._$AS(t2, i2.values), d2, e2)), i2;
  }
  var V = class {
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
  };
  var N = class {
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
  };
  var S = class {
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
  };
  var M = class extends S {
    constructor() {
      super(...arguments), this.type = 3;
    }
    C(t2) {
      this.element[this.name] = t2 === w ? void 0 : t2;
    }
  };
  var k = i$3 ? i$3.emptyScript : "";
  var H = class extends S {
    constructor() {
      super(...arguments), this.type = 4;
    }
    C(t2) {
      t2 && t2 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
    }
  };
  var I = class extends S {
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
  };
  var L = class {
    constructor(t2, i2, s2) {
      this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t2) {
      P(this, t2);
    }
  };
  var z = window.litHtmlPolyfillSupport;
  z == null || z(E, N), ((t$2 = globalThis.litHtmlVersions) !== null && t$2 !== void 0 ? t$2 : globalThis.litHtmlVersions = []).push("2.2.1");
  var l$1;
  var o$2;
  var s$1 = class extends a$1 {
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
  };
  s$1.finalized = true, s$1._$litElement$ = true, (l$1 = globalThis.litElementHydrateSupport) === null || l$1 === void 0 || l$1.call(globalThis, {
    LitElement: s$1
  });
  var n$3 = globalThis.litElementPolyfillSupport;
  n$3 == null || n$3({
    LitElement: s$1
  });
  ((o$2 = globalThis.litElementVersions) !== null && o$2 !== void 0 ? o$2 : globalThis.litElementVersions = []).push("3.2.0");
  var Volume = class extends s$1 {
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
  };
  customElements.define("visualscript-audio-volume", Volume);
  var index$3 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    Volume
  });
  var Player = class extends s$1 {
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
  };
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
  var ColorRGBA = class {
    constructor(r2, g2, b2, a2) {
      this.r = r2;
      this.g = g2;
      this.b = b2;
      this.a = a2;
    }
  };
  var WebglBase = class {
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
  };
  var WebglLine = class extends WebglBase {
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
  };
  var WebglPlot = class {
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
  };
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
  var TimeSeries$1 = class extends s$1 {
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
  };
  customElements.define("visualscript-timeseries-stream", TimeSeries$1);
  var Spectrogram$1 = class extends s$1 {
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
  };
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
  var Nav = class extends s$1 {
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
  };
  customElements.define("visualscript-nav", Nav);
  var Loader = class extends s$1 {
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
  };
  customElements.define("visualscript-loader", Loader);
  var t$1 = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6
  };
  var e$1 = (t2) => (...e2) => ({
    _$litDirective$: t2,
    values: e2
  });
  var i$2 = class {
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
  };
  var i$1 = e$1(class extends i$2 {
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
  var Button = class extends s$1 {
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
  };
  customElements.define("visualscript-button", Button);
  var Modal = class extends s$1 {
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
 <div class="modal-header">
     <span>${this.header}</span>
     <visualscript-button secondary size="extra-small" @click="${this.toggle}">Close</visualscript-button>
   </div>
   <div class="modal-body">
     <slot>No content</slot>
   </div>
   ${this.footer ? $`<div class="modal-footer">
     <span>${this.footer}</span>
   </div>` : ""}
 </div>
 <visualscript-overlay .open=${this.open}></visualscript-overlay>
`;
    }
  };
  customElements.define("visualscript-modal", Modal);
  var Footer = class extends s$1 {
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
  };
  customElements.define("visualscript-footer", Footer);
  var Overlay = class extends s$1 {
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
  };
  customElements.define("visualscript-overlay", Overlay);
  var n$2;
  ((n$2 = window.HTMLSlotElement) === null || n$2 === void 0 ? void 0 : n$2.prototype.assignedElements) != null ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);
  console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");
  var o$1 = e$1(class extends i$2 {
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
  var PersistableProps = {
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
  var setPersistent = (o2) => {
    if (o2.persist && o2.label)
      localStorage.setItem(o2.label, String(o2.value));
  };
  var getPersistent = (props) => {
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
  var Input = class extends s$1 {
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
  };
  customElements.define("visualscript-input", Input);
  var Search = class extends s$1 {
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
  };
  customElements.define("visualscript-search", Search);
  var Select = class extends s$1 {
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
  };
  customElements.define("visualscript-select", Select);
  var File = class extends s$1 {
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
  };
  customElements.define("visualscript-file", File);
  var Switch = class extends s$1 {
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
  };
  customElements.define("visualscript-switch", Switch);
  var Range = class extends s$1 {
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
  };
  customElements.define("visualscript-range", Range);
  var t = (o2) => o2 === null || typeof o2 != "object" && typeof o2 != "function";
  var r$1 = (o2) => o2.strings === void 0;
  var e = (i2, t2) => {
    var s2, o2;
    const n2 = i2._$AN;
    if (n2 === void 0)
      return false;
    for (const i3 of n2)
      (o2 = (s2 = i3)._$AO) === null || o2 === void 0 || o2.call(s2, t2, false), e(i3, t2);
    return true;
  };
  var o = (i2) => {
    let t2, s2;
    do {
      if ((t2 = i2._$AM) === void 0)
        break;
      s2 = t2._$AN, s2.delete(i2), i2 = t2;
    } while ((s2 == null ? void 0 : s2.size) === 0);
  };
  var n$1 = (i2) => {
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
  var l = (i2) => {
    var t2, e2, o2, n2;
    i2.type == t$1.CHILD && ((t2 = (o2 = i2)._$AP) !== null && t2 !== void 0 || (o2._$AP = h$1), (e2 = (n2 = i2)._$AQ) !== null && e2 !== void 0 || (n2._$AQ = r));
  };
  var d = class extends i$2 {
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
  };
  var s = class {
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
  };
  var i = class {
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
  };
  var n = (t$12) => !t(t$12) && typeof t$12.then == "function";
  var h = class extends d {
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
  };
  var c = e$1(h);
  var colorscales$1 = ["Hot", "Cold", "YlGnBu", "YlOrRd", "RdBu", "Portland", "Picnic", "Jet", "Greys", "Greens", "Electric", "Earth", "Bluered", "Blackbody"];
  var TimeSeries = class extends s$1 {
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
  };
  TimeSeries.colorscales = colorscales$1;
  customElements.define("visualscript-timeseries", TimeSeries);
  var colorscales = ["Hot", "Cold", "YlGnBu", "YlOrRd", "RdBu", "Portland", "Picnic", "Jet", "Greys", "Greens", "Electric", "Earth", "Bluered", "Blackbody"];
  var Spectrogram = class extends s$1 {
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
  };
  Spectrogram.colorscales = colorscales;
  customElements.define("visualscript-spectrogram", Spectrogram);
  var ObjectEditor = class extends s$1 {
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
 position: relative;
}

img {
 max-height: 100px;
}

.header {
 padding: 5px 10px;
 font-size: 70%;
 text-align: right;
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
   background-color: rgb(40, 40, 40);
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
     <div class="header">
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
  };
  customElements.define("visualscript-object-editor", ObjectEditor);
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var prism = { exports: {} };
  (function(module) {
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
    if (module.exports) {
      module.exports = Prism2;
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
  var CodeEditor = class extends s$1 {
    constructor(props = {}) {
      super();
      this.textArea = document.createElement("textarea");
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
 overflow: scroll;
 background: rgb(205,205,205);

}

:host * {
 box-sizing: border-box;
 
}

:host > * {
 overflow: hidden;
}

#editorContainer {
 position: relative;
  width: 100%; 
  height: 100%;
}

h3 {
 margin: 0;
}

#actions {
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
 background: transparent;
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

@media (prefers-color-scheme: dark) {

#editorContainer {
 background-color: rgb(20, 20, 20);
}

#editor {
 caret-color: white;
}
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
 <div id='editorContainer'>
   ${this.textArea}"
     <pre id="highlight" aria-hidden="true">
       <code class="language-${language}"></code>
   </pre>
</div>
`;
    }
  };
  customElements.define("visualscript-code-editor", CodeEditor);
  var GraphEdge = class extends s$1 {
    constructor(props = {}) {
      super();
      this.svgInfo = {
        size: 500,
        radius: 5
      };
      this.link = (info2) => {
        if (this.toResolve) {
          const port = info2[this.toResolve.type];
          if (port) {
            const res = this.resolveIO(port, this.toResolve.type, this.toResolve.callback);
            if (res) {
              this.toResolve.callback(true);
              this.toResolve = null;
            } else
              return false;
          }
        } else
          return false;
      };
      this.getOtherType = (type) => {
        return type === "input" ? "output" : "input";
      };
      this.updated = async () => {
        this.element = this.shadowRoot.querySelector("svg");
        if (!this.workspace)
          this.workspace = this.parentNode.parentNode.host;
        const vb = this.element.getAttribute("viewBox").split(" ").map((v2) => +v2);
        this.box = {
          xMin: vb[0],
          xMax: vb[0] + vb[2] - 1,
          yMin: vb[1],
          yMax: vb[1] + vb[3] - 1
        };
        const node = {
          p1: null,
          p2: null,
          c1: null,
          c2: null,
          c3: null,
          l1: null,
          l2: null,
          curve: null
        };
        "p1,p2,c1,c2,c3,l1,l2,curve".split(",").map((s2) => {
          node[s2] = this.element.getElementsByClassName(s2)[0];
        });
        this.node = node;
        const res = await this.init().catch((e2) => this.resolveReady.reject(e2));
        if (res)
          this.resolveReady.resolve(true);
      };
      this.getEdgeName = ({ input, output } = {
        input: this.input,
        output: this.output
      }) => {
        return `${output.node.id}-${output.tag}_${input.node.id}-${input.tag}`;
      };
      this.resolveIO = (el, typeNeeded, callback, origin) => {
        let hasType = this.getOtherType(typeNeeded);
        if (el instanceof GraphPort) {
          const expectedID = this[hasType].edges.has(this.getEdgeName({ [hasType]: this[hasType], [typeNeeded]: el }));
          if (expectedID) {
            callback("Edge already exists...");
            return false;
          } else if (this[hasType].shadowRoot.contains(el)) {
            callback("Cannot connect to self...");
            return false;
          } else {
            this[typeNeeded] = el;
            callback(true);
            return true;
          }
        } else {
          if (!this.firstUp && origin === "up") {
            this.firstUp = false;
            callback("Edge not completed...");
            return false;
          }
        }
      };
      this.mouseAsTarget = (type, upCallback) => {
        let label = type === "output" ? "p1" : "p2";
        let otherType = this.getOtherType(type);
        let onMouseMove = (e2) => {
          this.resize();
          let dims = this[otherType].shadowRoot.querySelector(`.${type}`).getBoundingClientRect();
          let svgO = this.svgPoint(this.element, dims.left + dims.width / 2, dims.top + dims.height / 2);
          let svgP = this.svgPoint(this.element, e2.clientX, e2.clientY);
          if (isNaN(svgP.x))
            svgP.x = svgO.x;
          if (isNaN(svgP.y))
            svgP.y = svgO.y;
          this.updateElement(this.node[label], {
            cx: svgP.x,
            cy: svgP.y
          });
          let points = type === "output" ? [svgP, svgO] : [svgO, svgP];
          this.updateControlPoints(...points);
          this.drawCurve();
        };
        this.workspace.element.addEventListener("mousemove", onMouseMove);
        this.workspace.element.dispatchEvent(new Event("mousemove"));
        this.toResolve = {
          type,
          callback: (res) => {
            upCallback(res);
            this.workspace.element.removeEventListener("mouseup", onMouseUp);
            this.workspace.element.removeEventListener("mousemove", onMouseMove);
          }
        };
        let onMouseUp = (e2) => {
          if (this.firstUp == void 0)
            this.firstUp = true;
          else
            this.firstUp = false;
          this.resolveIO(e2.target, type, this.toResolve.callback, "up");
        };
        this.workspace.element.addEventListener("mouseup", onMouseUp);
      };
      this.init = async () => {
        return new Promise(async (resolve, reject) => {
          let res = await this.insert();
          let match, compatible, outputType, targetType;
          if (res === true) {
            let coerceType = (t2) => {
              if (t2 === "float")
                return "number";
              else if (t2 === "int")
                return "number";
              else
                return t2;
            };
            outputType = coerceType(this.output.output.getAttribute("data-visualscript-type"));
            targetType = coerceType(this.input.input.getAttribute("data-visualscript-type"));
            let checkCompatibility = (output, input) => {
              return output == input || (output === void 0 || input === void 0) || input instanceof Object && output instanceof Object;
            };
            compatible = checkCompatibility(outputType, targetType);
          }
          if (res === true && match == null && compatible)
            resolve(true);
          else {
            reject(res);
          }
        });
      };
      this.insert = () => {
        return new Promise(async (resolve) => {
          const workspace = this.workspace ?? this.output?.node?.workspace ?? this.input?.node?.workspace;
          const types = ["input", "output"];
          types.forEach((t2) => {
            if (this[t2] == null) {
              workspace.editing = this;
              this.mouseAsTarget(t2, (res) => {
                workspace.editing = null;
                resolve(res);
              });
            }
          });
          this.drawCurve();
          if (this.output && this.input)
            resolve(true);
        });
      };
      this._activate = async () => {
        console.log("_activate function not added again...");
        this.addReactivity();
      };
      this.dragHandler = (event) => {
        event.preventDefault();
        const target = event.target;
        const type = event.type;
        const svgP = this.svgPoint(this.element, event.clientX, event.clientY);
        if (!this.drag && type === "pointerdown" && target.classList.contains("control")) {
          this.drag = {
            node: target,
            start: this.getControlPoint(target),
            cursor: svgP
          };
          this.drag.node.classList.add("drag");
        }
        if (this.drag && type === "pointermove") {
          this.updateElement(this.drag.node, {
            cx: Math.max(this.box.xMin, Math.min(this.drag.start.x + svgP.x - this.drag.cursor.x, this.box.xMax)),
            cy: Math.max(this.box.yMin, Math.min(this.drag.start.y + svgP.y - this.drag.cursor.y, this.box.yMax))
          });
          this.drawCurve();
        }
        if (this.drag && type === "pointerup") {
          this.drag.node.classList.remove("drag");
          this.drag = null;
        }
      };
      this.svgPoint = (svg, x2, y) => {
        var pt = new DOMPoint(x2, y);
        pt.x = x2;
        pt.y = y;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
      };
      this.updateElement = (element, attr) => {
        for (let a2 in attr) {
          let v2 = attr[a2];
          element.setAttribute(a2, isNaN(v2) ? v2 : Math.round(v2));
        }
      };
      this.getControlPoint = (circle) => {
        return {
          x: Math.round(+circle.getAttribute("cx")),
          y: Math.round(+circle.getAttribute("cy"))
        };
      };
      this.updateControlPoints = (p1, p2) => {
        let curveMag = 0.5 * Math.abs(p2.y - p1.y);
        this.updateElement(this.node["c1"], {
          cx: p1.x + curveMag,
          cy: p1.y
        });
        this.updateElement(this.node["c2"], {
          cx: p2.x - curveMag,
          cy: p2.y
        });
        this.updateElement(this.node["c3"], {
          cx: (p1.x + p2.x) / 2,
          cy: (p1.y + p2.y) / 2
        });
      };
      this.drawCurve = () => {
        const p1 = this.getControlPoint(this.node.p1), p2 = this.getControlPoint(this.node.p2), c1 = this.getControlPoint(this.node.c1);
        this.getControlPoint(this.node.c2);
        const c3 = this.getControlPoint(this.node.c3);
        const d2 = `M${p1.x},${p1.y} Q${c1.x},${c1.y} ${c3.x},${c3.y} T${p2.x},${p2.y}` + (this.node.curve.classList.contains("fill") ? " Z" : "");
        this.updateElement(this.node.curve, { d: d2 });
      };
      this.addReactivity = () => {
        this.node["curve"].addEventListener("mouseover", () => {
          this._onMouseOverEdge();
        });
        this.node["curve"].addEventListener("mouseout", () => {
          this._onMouseOutEdge();
        });
        this.node["curve"].addEventListener("click", () => {
          this._onClickEdge();
        });
      };
      this._onMouseOverEdge = () => {
        this.node["curve"].style.opacity = `0.3`;
      };
      this._onMouseOutEdge = () => {
        this.node["curve"].style.opacity = `1`;
      };
      this._onClickEdge = () => {
        this.deinit();
      };
      this.deinit = () => {
        if (this.output)
          this.output.deleteEdge(this.id);
        if (this.input)
          this.input.deleteEdge(this.id);
        this.remove();
      };
      this.resize = () => {
        let arr = [
          { type: "output", node: "p1" },
          { type: "input", node: "p2" }
        ];
        let svgPorts = arr.map((o2) => {
          let port = this[o2.type];
          if (port) {
            let portDim = port.shadowRoot.querySelector(`.${o2.type}`).getBoundingClientRect();
            let svgPort = this.svgPoint(this.element, portDim.left + portDim.width / 2, portDim.top + portDim.height / 2);
            this.updateElement(this.node[o2.node], {
              cx: svgPort.x,
              cy: svgPort.y
            });
            return svgPort;
          }
        });
        svgPorts = svgPorts.filter((s2) => s2 != void 0);
        if (svgPorts.length > 1)
          this.updateControlPoints(...svgPorts);
        this.drawCurve();
      };
      this.output = props.output;
      this.input = props.input;
      this.workspace = props.workspace;
      this.ready = new Promise((resolve, reject) => {
        this.resolveReady = {
          resolve: (arg) => {
            this.id = this.getEdgeName();
            this.output.setEdge(this);
            this.input.setEdge(this);
            resolve(arg);
          },
          reject
        };
      });
    }
    static get styles() {
      return r$4`

:host {
   --grid-color: rgb(210, 210, 210);
}

:host{
   display: block;
   height: 100%;
   width: 100%;
   position: absolute;
   background: transparent;
   pointer-events: none;
   box-sizing: border-box;
   /* z-index: 1; */
}

:host(.editing) svg {
 pointer-events: none;
}
 
:host svg {
   pointer-events: none;
   display: block;
   height: 100%;
   width: 100%;
   position: relative;
   background: transparent;
   touch-action: none;
   /* z-index: 1; */
}

 :host path {
   pointer-events: all;
   stroke-width: 2;
   stroke: rgb(60, 60, 60);
   stroke-linecap: round;
   fill: none;
   transition: stroke 0.5s;
   transition: stroke-width 0.5s;
   cursor: pointer;
 }

 :host path.updated {
   /* stroke: rgb(255, 105, 97); */
   stroke-width: 3;
   stroke: rgb(129, 218, 250);
}
 
 :host .control {
   stroke-width: 3;
   stroke: transparent;
   fill: transparent;
   /* fill: #c00;
   cursor: move; */
 }
 
 /* :host .control:hover, #mysvg .control.drag
 {
   fill: #c00;
   cursor: move;
 }
  */
 :host line
 {
   /* stroke-width: 2;
   stroke: #999;
   stroke-linecap: round;
   stroke-dasharray: 5,5; */
   stroke: transparent;
   fill: transparent;
 }  

 @media (prefers-color-scheme: dark) { 

   :host {
       --grid-color: rgb(45, 45, 45);
   }

   :host path {
     stroke: white;
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
      return $`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.svgInfo.size} ${this.svgInfo.size}">
     <circle cx="0" cy="0" r="${this.svgInfo.radius}" class="p1 control" />
     <circle cx="0" cy="0" r="${this.svgInfo.radius}" class="p2 control" />

     <circle cx="0" cy="0" r="${this.svgInfo.radius}" class="c1 control" />
     <circle cx="0" cy="0" r="${this.svgInfo.radius}" class="c2 control" />
     <circle cx="0" cy="0" r="${this.svgInfo.radius}" class="c3 control" />

     <line x1="0" y1="0" x2="0" y2="0" class="l1"/>
     <line x1="0" y1="0" x2="0" y2="0" class="l2"/>

     <path d="M0,0 Q0,0 0,0" class="curve" @click=${this.deinit}/>
</svg>`;
    }
  };
  customElements.define("visualscript-graph-edge", GraphEdge);
  var GraphPort = class extends s$1 {
    constructor(props = {}) {
      super();
      this.output = document.createElement("div");
      this.input = document.createElement("div");
      this.resolving = false;
      this.edges = /* @__PURE__ */ new Map();
      this.setEdge = (edge) => {
        this.edges.set(edge.id, edge);
        this.node.setEdge(edge);
      };
      this.deleteEdge = (id) => {
        this.edges.delete(id);
        this.node.deleteEdge(id);
      };
      this.resolveEdge = async (ev) => {
        if (!this.resolving) {
          this.resolving = true;
          const type = ev.path[0].classList.contains("input") ? "input" : "output";
          if (this.node.workspace)
            await this.node.workspace.resolveEdge({ [type]: this });
          this.resolving = false;
        }
      };
      this.onmousedown = this.resolveEdge;
      this.onmouseup = (ev) => {
        if (this.node.workspace.editing instanceof GraphEdge)
          this.resolveEdge(ev);
      };
      this.node = props.node;
      this.tag = props.tag;
      this.output.classList.add("port");
      this.output.classList.add("output");
      this.input.classList.add("port");
      this.input.classList.add("input");
    }
    static get styles() {
      return r$4`

:host * {
 box-sizing: border-box;
}

:host {
   display: block;
   pointer-events: none;
   --grid-color: rgb(210, 210, 210);
}

:host > div {
   width: 100%;
   display: flex; 
   align-items: center;
   justify-content: space-between;
   color: white;
   font-size:7px;
}

.input {
 transform: translateX(-50%);
 left: 0;
}

.output {
 transform: translateX(50%);
 right: 0;
}

.port {
 pointer-events: all;
 width: 10px;
 height: 10px;
 background: gray;
 cursor: pointer;
 border-radius: 10px;
 z-index: -1;
}

 @media (prefers-color-scheme: dark) { 

   :host {
       --grid-color: rgb(45, 45, 45);
   }
   
 }

`;
    }
    static get properties() {
      return {
        tag: {
          type: String,
          reflect: true
        },
        keys: {
          type: Object,
          reflect: true
        }
      };
    }
    updated(changedProperties) {
      this.element = this.shadowRoot.querySelector("div");
      if (!this.node)
        this.node = this.parentNode.parentNode.parentNode.host;
    }
    render() {
      return $`
   <div>
     ${this.input}
     ${this.tag}
     ${this.output}
   </div>
 `;
    }
  };
  customElements.define("visualscript-graph-port", GraphPort);
  var GraphNode = class extends s$1 {
    constructor(props = {}) {
      super();
      this.edges = /* @__PURE__ */ new Map();
      this.ports = /* @__PURE__ */ new Map();
      this.willUpdate = (updatedProps) => {
        if (updatedProps.has("x") || updatedProps.has("y")) {
          this.info.x = this.x;
          this.info.y = this.y;
        }
      };
      this.setEdge = (edge) => this.edges.set(edge.id, edge);
      this.deleteEdge = (id) => this.edges.delete(id);
      this.addPort = (info2) => {
        const port = new GraphPort(Object.assign({ node: this }, info2));
        this.ports.set(port.tag, port);
      };
      this.workspace = props.workspace;
      this.info = props.info ?? {};
      this.id = `${this.info.tag}${Math.round(1e4 * Math.random())}`;
      this.info.x = this.x = props.x ?? this.info.x ?? 0;
      this.info.y = this.y = props.y ?? this.info.y ?? 0;
      if (this.info) {
        this.info.arguments.forEach((value, tag) => {
          this.addPort({
            tag,
            value
          });
        });
      }
    }
    static get styles() {
      return r$4`

:host {
 position: absolute;
 box-sizing: border-box;
 top: 10px;
 left: 10px;
 user-select: none;
 z-index: 1;
}

:host {
   --grid-color: rgb(210, 210, 210);
}

:host > div {
   width: 50px;
   background: rgb(60,60,60);
   cursor: move;
}

#header {
 color: white;
 font-size: 8px;
 background: black;
 padding: 5px;
 font-weight: 800;
}

#ports visualscript-graph-port{
 padding: 2px 0px;
}

@media (prefers-color-scheme: dark) { 

 :host {
     --grid-color: rgb(45, 45, 45);
 }
 
}

`;
    }
    static get properties() {
      return {
        x: {
          type: Number,
          reflect: true
        },
        y: {
          type: Number,
          reflect: true
        },
        keys: {
          type: Object,
          reflect: true
        }
      };
    }
    updated(changedProperties) {
      this.element = this.shadowRoot.querySelector("div");
      if (!this.workspace)
        this.workspace = this.parentNode.parentNode.host;
    }
    render() {
      return $`

   <style>

   :host {
     transform: scale(${1}) translate(${this.x}px, ${this.y}px);
   }


   </style>
   <div>
     <div id="header">
       ${this.info.tag}
     </div>
     <div id="ports">
         ${Array.from(this.ports.values())}
     </div>
   </div>
 `;
    }
  };
  customElements.define("visualscript-graph-node", GraphNode);
  var dragElement = (workspace, dragItem, onMove, onDown, onUp) => {
    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var defaultScale = 1;
    dragItem.shadowRoot.addEventListener("mousedown", dragStart, false);
    window.addEventListener("mouseup", dragEnd, false);
    window.addEventListener("mousemove", drag, false);
    function dragStart(e2) {
      if (e2.type === "touchstart") {
        initialX = e2.touches[0].clientX - workspace.context.scale * defaultScale * dragItem.x;
        initialY = e2.touches[0].clientY - workspace.context.scale * defaultScale * dragItem.y;
      } else {
        initialX = e2.clientX - workspace.context.scale * defaultScale * dragItem.x;
        initialY = e2.clientY - workspace.context.scale * defaultScale * dragItem.y;
      }
      if (dragItem.shadowRoot.contains(e2.target)) {
        if (!(e2.target instanceof GraphPort))
          active = true;
        onDown();
      }
    }
    function dragEnd() {
      initialX = currentX;
      initialY = currentY;
      active = false;
      onUp();
    }
    function drag(e2) {
      if (active) {
        e2.preventDefault();
        if (e2.type === "touchmove") {
          currentX = (e2.touches[0].clientX - initialX) / (workspace.context.scale * defaultScale);
          currentY = (e2.touches[0].clientY - initialY) / (workspace.context.scale * defaultScale);
        } else {
          currentX = (e2.clientX - initialX) / (workspace.context.scale * defaultScale);
          currentY = (e2.clientY - initialY) / (workspace.context.scale * defaultScale);
        }
        dragItem.x = currentX;
        dragItem.y = currentY;
        onMove();
      }
    }
  };
  var GraphWorkspace = class extends s$1 {
    constructor(props = {}) {
      super();
      this.updateCount = 0;
      this.context = {
        scale: 1
      };
      this.editing = null;
      this.mouseDown = false;
      this.translation = { x: 0, y: 0 };
      this.nodes = /* @__PURE__ */ new Map();
      this.edges = /* @__PURE__ */ new Map();
      this.set = async (graph) => {
        this.graph = graph;
        this.triggerUpdate();
      };
      this.resize = (nodes = Array.from(this.nodes.values())) => {
        nodes.forEach((node) => node.edges.forEach((e2) => e2.resize()));
      };
      this.triggerUpdate = () => {
        this.updateCount = this.updateCount + 1;
      };
      this.resolveEdge = async (info2, rerender = true) => {
        if (!(this.editing instanceof GraphEdge)) {
          const tempId = `${Math.round(1e4 * Math.random())}`;
          const edge = new GraphEdge(Object.assign({ workspace: this }, info2));
          this.editing = edge;
          this.edges.set(tempId, edge);
          if (rerender)
            this.triggerUpdate();
          const res = await edge.ready.catch((e2) => console.error(e2));
          if (res) {
            this.edges.delete(tempId);
            this.edges.set(edge.id, edge);
            edge.resize();
          }
          this.editing = null;
          return edge;
        } else
          this.editing.link(info2);
      };
      this.autolayout = () => {
        let count2 = 0;
        let rowLen = 5;
        let offset = 20;
        this.nodes.forEach((n2) => {
          n2.x = offset + 100 * (count2 % rowLen);
          n2.y = offset + 150 * Math.floor(count2 / rowLen);
          count2++;
        });
      };
      this.createUIFromGraph = () => {
        let nodes = "";
        let hasMoved = false;
        if (this.graph) {
          this.graph.nodes.forEach((n2) => {
            let gN = this.nodes.get(n2.tag);
            if (!gN) {
              gN = new GraphNode({
                info: n2,
                workspace: this
              });
              this.nodes.set(gN.info.tag, gN);
            }
            hasMoved = gN.x !== 0 && gN.y !== 0;
            return gN;
          });
          const nodeArr = Array.from(this.nodes.values());
          const createEdges = async () => {
            for (let i2 = 0; i2 < nodeArr.length; i2++) {
              let n2 = nodeArr[i2];
              if (n2.info.children) {
                for (let j = 0; j < n2.info.children.length; j++) {
                  const node = n2.info.children[j];
                  const gNParent = this.nodes.get(n2.info.tag);
                  const output = gNParent.ports.get(gNParent.info.arguments.keys().next().value);
                  const gNChild = this.nodes.get(node.tag);
                  const input = gNChild.ports.get(gNChild.info.arguments.keys().next().value);
                  await this.resolveEdge({
                    input,
                    output
                  });
                }
              }
            }
          };
          createEdges();
          if (!hasMoved)
            this.autolayout();
        }
        return nodes;
      };
      this._scale = (e2) => {
        this.context.scale += 0.01 * -e2.deltaY;
        if (this.context.scale < 0.1)
          this.context.scale = 0.1;
        if (this.context.scale > 3)
          this.context.scale = 3;
        this._transform();
      };
      this._transform = () => {
        this.element.style["transform"] = `translate(${this.translation.x}px, ${this.translation.y}px) scale(${this.context.scale * 100}%)`;
      };
      this._pan = (e2) => {
        if (!this.editing) {
          if (e2.target.parentNode) {
            let rectParent = e2.target.parentNode.getBoundingClientRect();
            let curXParent = (e2.clientX - rectParent.left) / rectParent.width;
            let curYParent = (e2.clientY - rectParent.top) / rectParent.height;
            if (this.mouseDown) {
              let tX = (curXParent - this.relXParent) * rectParent.width;
              let tY = (curYParent - this.relYParent) * rectParent.height;
              if (!isNaN(tX) && isFinite(tX))
                this.translation.x += tX;
              if (!isNaN(tY) && isFinite(tY))
                this.translation.y += tY;
              this._transform();
            }
            this.relXParent = curXParent;
            this.relYParent = curYParent;
          }
        }
      };
      if (props?.graph)
        this.set(props.graph);
      window.addEventListener("resize", () => {
        this.resize();
      });
    }
    static get styles() {
      return r$4`

:host * {
 box-sizing: border-box;
}

:host {
   overflow: hidden;
   --grid-color: rgb(210, 210, 210);
}

:host #grid {
   position: relative;
   background-image:
   repeating-linear-gradient(var(--grid-color) 0 1px, transparent 1px 100%),
   repeating-linear-gradient(90deg, var(--grid-color) 0 1px, transparent 1px 100%);
   background-size: 20px 20px;
   width: 100%;
   height: 100%;
}

:host #grid:active:hover {
 cursor: move;
}


 @media (prefers-color-scheme: dark) { 
   :host {
       --grid-color: rgb(45, 45, 45);
   }
 }

`;
    }
    static get properties() {
      return {
        updateCount: {
          type: Number,
          reflect: true
        }
      };
    }
    updated() {
      this.element = this.shadowRoot.querySelector("div");
      this.addEventListener("mousedown", (e2) => {
        this.mouseDown = true;
      });
      window.addEventListener("mouseup", (e2) => {
        this.mouseDown = false;
      });
      this.addEventListener("wheel", this._scale);
      this.addEventListener("mousemove", this._pan);
      this.nodes.forEach((node) => {
        dragElement(this, node, () => {
          this.resize([node]);
        }, () => {
          if (!this.editing)
            this.editing = node;
        }, () => {
          if (this.editing instanceof GraphNode)
            this.editing = null;
        });
      });
    }
    render() {
      this.createUIFromGraph();
      return $`
   <div id=grid>
       ${Array.from(this.nodes.values())}
       ${Array.from(this.edges.values())}
   </div>
 `;
    }
  };
  customElements.define("visualscript-graph-workspace", GraphWorkspace);
  var GraphEditor = class extends s$1 {
    constructor(props = {}) {
      super();
      this.history = [];
      this.set = async (graph) => {
        this.graph = graph;
        this.workspace.set(this.graph);
        this.keys = Object.keys(this.graph);
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
      this.workspace = new GraphWorkspace(props);
      if (props?.graph)
        this.set(props.graph);
    }
    static get styles() {
      return r$4`

:host * {
 box-sizing: border-box;
}

img {
 max-height: 100px;
}

.container {
 width: 100%;
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
   background-color: rgb(40, 40, 40);
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
     ${this.workspace}
   </div>
 `;
    }
  };
  customElements.define("visualscript-graph-editor", GraphEditor);
  var DeviceEditor = class extends s$1 {
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
  };
  customElements.define("visualscript-device-editor", DeviceEditor);
  var SessionEditor = class extends s$1 {
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
  };
  customElements.define("visualscript-session-editor", SessionEditor);
  var slotGrid = r$4`

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
  var Dashboard = class extends s$1 {
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
  };
  customElements.define("visualscript-dashboard", Dashboard);
  var TabTogglePropsList = {
    selected: {
      type: Boolean,
      reflect: true
    },
    grow: {
      type: Boolean,
      reflect: true
    }
  };
  var TabToggle = class extends s$1 {
    constructor(props) {
      super();
      this.grow = false;
      this.select = (toggles) => {
        if (this.to.on instanceof Function)
          this.to.on(this);
        if (!toggles) {
          let parent2 = this.parentNode;
          let bar = !(parent2 instanceof HTMLElement) ? parent2.host : parent2;
          toggles = bar.querySelectorAll("visualscript-tab-toggle");
          if (toggles.length === 0)
            toggles = bar.shadowRoot.querySelectorAll("visualscript-tab-toggle");
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
      this.to = props.tab;
      if (props.grow)
        this.grow = props.grow;
      if (props.selected)
        this.selected = props.selected;
    }
    static get styles() {
      return r$4`

:host {
 user-select: none;
}

:host([grow]) {
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

 :host([selected]) button {
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
 
   :host([selected]) button {
     background: rgb(60,60,60);
   }

 }
`;
    }
    static get properties() {
      return TabTogglePropsList;
    }
    render() {
      return $`
 <button @click=${() => this.select()}>${this.to.name ?? `Tab`}</button>
`;
    }
  };
  customElements.define("visualscript-tab-toggle", TabToggle);
  var Control = class extends s$1 {
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
 font-size: 0.75em
}

#control {
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


#control > * {
 padding: 10px;
}

span { 
 flex-grow: 1;
}

@media (prefers-color-scheme: dark) {
 #control {
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
      return $`
 <div id=control>
   <div>
     <h5>${this.label}</h5>
     <slot></slot>
   </div>
   ${this.element}
 </div>`;
    }
    updated(changedProperties) {
      const slot = this.shadowRoot.querySelector("slot");
      const nodes = slot.assignedNodes();
      if (this.type === "button" && nodes.length) {
        nodes.forEach((el) => this.element.appendChild(el.cloneNode()));
        slot.style.display = "none";
      }
    }
  };
  customElements.define("visualscript-control", Control);
  var tabStyle = r$4`

:host {
width: 100%;
height: 100%;
box-sizing: border-box;
background: inherit;
display: block;
overflow: hidden;
}

slot {
overflow: scroll;
}

:host * {
box-sizing: border-box;
}

:host([type="dropdown"]) {
position: absolute;
top: 0;
left: 0: 
background: red;
}

`;
  var TabPropsLit = {
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
    type: {
      type: String,
      reflect: true
    },
    off: {
      type: Function,
      reflect: true
    }
  };
  var Tab = class extends s$1 {
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
      this.toggle = new TabToggle({
        tab: this
      });
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
  };
  customElements.define("visualscript-tab", Tab);
  var App = class extends Tab {
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
  };
  customElements.define("visualscript-app", App);
  var TabBarPropsList = {
    tabs: {
      type: Object
    }
  };
  var TabBar = class extends s$1 {
    constructor(props = {}) {
      super();
      this.tabs = [];
    }
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
 z-index: 2;
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
      return TabBarPropsList;
    }
    render() {
      return $`
 ${this.tabs.map((t2) => t2.toggle)}
 <slot></slot>
`;
    }
  };
  customElements.define("visualscript-tab-bar", TabBar);
  var Main = class extends s$1 {
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
  };
  customElements.define("visualscript-main", Main);
  var Gallery = class extends s$1 {
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
  };
  customElements.define("visualscript-gallery", Gallery);
  var TabContainer = class extends s$1 {
    constructor(props = {}) {
      super();
      this.minTabs = 0;
      this.tabs = /* @__PURE__ */ new Map();
      this.bar = new TabBar();
      this.reset = () => {
        this.tabs.forEach((t2) => this.removeTab(t2));
        this.activeTab = 0;
        this.updateTabs();
      };
      this.addTab = (tab, switchTo = false) => {
        this.insertAdjacentElement("beforeend", tab);
        if (switchTo)
          this.activeTab = this.tabs.size;
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
      if (props.minTabs)
        this.minTabs = props.minTabs;
      this.reset();
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

#notabs {
 width: 100%;
 height: 100%;
 display: flex; 
 align-items: center;
 justify-content: center;
 font-size: 80%;
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
        if (i2 !== this.activeTab)
          t2.style.display = "none";
        return t2.toggle;
      });
      const selectedToggle = toggles[this.activeTab];
      if (selectedToggle)
        selectedToggle.select(toggles);
      this.bar.tabs = tabs;
      toggles.forEach((t2) => t2.grow = true);
      this.bar.style.height = toggles.length < this.minTabs ? "0px" : "";
      return $`
 ${this.bar}
 <slot><div id="notabs">No Tabs Open</div></slot>
`;
    }
  };
  customElements.define("visualscript-tab-container", TabContainer);
  var collapseThreshold = 600;
  var Sidebar = class extends s$1 {
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
  };
  customElements.define("visualscript-sidebar", Sidebar);
  var SidebarHeader = class extends s$1 {
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
  };
  customElements.define("visualscript-sidebar-header", SidebarHeader);
  function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }
  var _templateObject;
  var _templateObject2;
  var _templateObject3;
  var _templateObject4;
  var addBox = $(_templateObject || (_templateObject = _taggedTemplateLiteral(['<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>'])));
  var folder = $(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(['<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>'])));
  var openfolder = $(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(['<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>'])));
  var file = $(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(['<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/><path d="M20.41,8.41l-4.83-4.83C15.21,3.21,14.7,3,14.17,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9.83 C21,9.3,20.79,8.79,20.41,8.41z M7,7h7v2H7V7z M17,17H7v-2h10V17z M17,13H7v-2h10V13z"/></g></svg>'])));
  var icons = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    addBox,
    folder,
    openfolder,
    file
  });
  var Icon = class extends s$1 {
    constructor(props = {}) {
      super();
      this.type = props.type ?? "folder";
    }
    static get styles() {
      return r$4`

:host {
 display: block;
 width: 30px;
 height: 30px;
 box-sizing: border-box;
}

svg {
 width: 100%;
 height: 100%;
 fill: black;
}

@media (prefers-color-scheme: dark) {

 svg {
   fill: rgb(210, 210, 210);
 }
}

`;
    }
    static get properties() {
      return {
        type: {
          type: String,
          reflect: true
        }
      };
    }
    render() {
      return $`
  ${icons[this.type]}
`;
    }
  };
  customElements.define("visualscript-icon", Icon);
  var TreeItem = class extends s$1 {
    constructor(props) {
      super();
      this.type = "folder";
      this.removeLast = () => {
        if (this.li)
          this.li.classList.remove("last");
        window.removeEventListener("click", this.removeLast);
      };
      this.key = props.key;
      this.value = props.value;
      this.parent = props.parent;
      this.onClick = props.onClick;
      if (props.type)
        this.type = props.type;
    }
    static get styles() {
      return r$4`

:host * {
 box-sizing: border-box;
}

li {
   width: 100%;
}

li > div > div {
   display: flex;
   font-size: 12px;
   padding: 6px;
   flex-grow: 1;
   align-items: center;
   flex-wrap: wrap;
   user-select: none;
}

li.last > div { background: #b6e3ff;}

li.last > div:hover { background: #b6e3ff; }

li > div:hover {
   background: rgb(240,240,240);
   cursor: pointer;
}

visualscript-icon {
 padding: 0px 7px;
}

@media (prefers-color-scheme: dark) {

 li > div:hover{ background-color: rgb(70, 70, 70) }

 li.last > div { background: #0091ea;}

   li.last > div:hover { background: #0091ea; }


}

`;
    }
    static get properties() {
      return {
        type: {
          type: String,
          reflect: true
        },
        key: {
          type: String,
          reflect: true
        },
        open: {
          type: Boolean,
          reflect: true
        }
      };
    }
    render() {
      const icon = new Icon({ type: this.type });
      const leftPad = 8 * (this.parent.depth ?? 0);
      return $`
   <li>
   <div @click=${() => {
        this.li = this.shadowRoot.querySelector("li");
        this.li.classList.add("last");
        window.addEventListener("mousedown", this.removeLast);
        if (this.type === "file") {
          if (this.onClick instanceof Function)
            this.onClick(this.key, this.value);
        } else {
          if (this.type === "folder") {
            this.type = "openfolder";
            this.open = true;
          } else {
            this.type = "folder";
            this.open = false;
          }
        }
      }}>
       <div style="padding-left: ${leftPad}px">
        ${icon}
       <span class="name">${this.key}</span>
       </div>
     </div>
     ${this.open ? new Tree({ target: this.value, depth: this.parent.depth + 1, onClick: this.onClick }) : ""}
   </li>
 `;
    }
  };
  customElements.define("visualscript-tree-item", TreeItem);
  var Tree = class extends s$1 {
    constructor(props = { target: {} }) {
      super();
      this.depth = 0;
      this.set = async (target = {}) => {
        this.target = target;
        this.keys = Object.keys(this.target);
      };
      this.getElement = async (key, o2) => {
        const value = o2[key];
        let type = value.constructor.name === "Object" ? "folder" : "file";
        const treeItem = new TreeItem({
          key,
          type,
          value,
          parent: this,
          onClick: this.onClick
        });
        return treeItem;
      };
      if (props.depth)
        this.depth = props.depth;
      if (props.onClick)
        this.onClick = props.onClick;
      this.set(props.target);
    }
    static get styles() {
      return r$4`

:host * {
 box-sizing: border-box;
}

:host > * {
 background: white;
 height: 100%;
 width: 100%;
}

ul {
   list-style-type: none;
   padding: 0;
   margin: 0;
   font-size: 90%;
}

.container {
 width: 100%;
 align-items: center;
 justify-content: center;
 position: relative;
 overflow: scroll;
 height: 100%;
}

.info {
 display: flex;
 align-items: center;
}

.name {
 padding-right: 10px;
}

.value {
 font-size: 80%;
}

@media (prefers-color-scheme: dark) {
 :host > * {
   background-color: rgb(40, 40, 40);
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
        depth: {
          type: Number,
          reflect: true
        },
        onClick: {
          type: Function,
          reflect: true
        }
      };
    }
    render() {
      const content = this.keys?.map((key) => this.getElement(key, this.target));
      return c(Promise.all(content).then((data2) => {
        return $`
     <ul class="container">
           ${data2}
     </ul>
 `;
      }), $`<span>Loading...</span>`);
    }
  };
  customElements.define("visualscript-tree", Tree);

  // app/transformations.js
  var arrayAdd = (arr1, arr2) => {
    return arr1.map((v2, i2) => {
      return v2 + arr2[i2];
    });
  };
  var arrayDifference = (arr1, arr2) => {
    return arr1.map((v2, i2) => {
      const diff = Math.abs(v2 - arr2[i2]);
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
        const x2 = col * colSize;
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
          const b2 = 0;
          const g2 = 0;
          const r2 = 255 * relVal;
          context.fillStyle = `rgb(${r2}, ${g2}, ${b2})`;
        }
        context.fillRect(x2, y, colSize, rowSize);
      }
    }
  }

  // app/alphabetize/visualize.js
  var visualize = (o2, callback) => {
    if (o2.worker.changed) {
      const sorted = new Map([...o2.worker.alphabet.entries()].sort((a2, b2) => b2[1] - a2[1]));
      let i2 = 0;
      const maxToVisualize = 200;
      if (sorted.length > maxToVisualize)
        console.warn(`Only visualizing ${maxToVisualize}/${sorted.length} patterns`);
      sorted.forEach((count2, identifier) => {
        if (i2 < maxToVisualize) {
          o2.createContainer(i2);
          const boxInfo = o2.worker.alphabetData.get(identifier);
          heatmap(o2.containers[i2], o2.worker.frequencies, o2.worker.duration, boxInfo);
          o2.containers[i2].count.innerHTML = `${count2}`;
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
          boxInfo.times.forEach((o3) => {
            const li = document.createElement("li");
            li.innerHTML = `${o3.t.toFixed(4)}s`;
            list.appendChild(li);
          });
          o2.containers[i2].readout.appendChild(freq);
          o2.containers[i2].readout.appendChild(header);
          o2.containers[i2].readout.appendChild(document.createElement("br"));
          o2.containers[i2].readout.appendChild(document.createElement("br"));
          o2.containers[i2].readout.appendChild(list);
          i2++;
          if (callback instanceof Function)
            callback((i2 + 1) / sorted.size);
        }
      });
    }
  };
  var visualize_default = visualize;

  // app/alphabetize/info.js
  var alphabetDiv = document.getElementById("alphabet");
  var info = {
    secondsPerBin: void 0,
    worker: {},
    updateLabels: () => {
      inputs.forEach(({ el, variable, label }) => {
        if (label)
          el.innerHTML = label(info.worker[variable]);
      });
    },
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
  var minFrequencyInput = document.getElementById("minFreq");
  var shuffleSwitch = document.getElementById("shuffle");
  var inputs = [
    { el: durationRange, variable: "duration", label: (val) => {
      if (info.secondsPerBin) {
        return `<span>${(info.secondsPerBin * val).toFixed(3)}s</span>`;
      } else
        return "<span>In Bins</span>";
    } },
    { el: freqWindowRange, variable: "freqWindow" },
    { el: fftRange, variable: "maximumFFTs", allowUndefined: true },
    { el: euclideanDistanceInput, variable: "distanceMax" },
    { el: maximumFrequencyInput, variable: "maxFreq", allowUndefined: true },
    { el: minFrequencyInput, variable: "minFreq", allowUndefined: true },
    { el: shuffleSwitch, variable: "shuffle" }
  ];
  inputs.forEach(({ el, variable, allowUndefined, label }) => {
    let immediate = true;
    let input = el.shadowRoot.querySelector("visualscript-input");
    if (input)
      input = input.shadowRoot.querySelector("input");
    let val = parseInt(el.value ?? input?.value);
    if (isNaN(val))
      val = void 0;
    info.worker[variable] = val;
    if (label)
      el.innerHTML = label(val);
    if (!info.worker[variable]) {
      setTimeout(() => {
        let input2 = el.shadowRoot.querySelector("visualscript-input");
        if (input2)
          input2 = input2.shadowRoot.querySelector("input");
        let val2 = parseInt(input2?.value);
        if (isNaN(val2))
          val2 = void 0;
        info.worker[variable] = val2;
        if (label)
          el.innerHTML = label(val2);
        immediate = false;
      }, 100);
    }
    el.onInput = (ev) => {
      let val2 = parseInt(ev.target.value);
      if (isNaN(val2))
        val2 = void 0;
      if (!immediate || (allowUndefined || val2 != void 0))
        info.worker[variable] = val2;
      if (label)
        el.innerHTML = label(val2);
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
  var url = URL.createObjectURL(new Blob([String('(()=>{var E=(t,e)=>Math.sqrt(t*t+e*e),A=t=>t.reduce((e,a)=>e+a,0)/t.length,y=(t,e,a="euclidean")=>A(t.map((r,m)=>A(r.map((c,n)=>E(c,e[m][n])))));var M=(t,e)=>W(t,e,(a,r)=>(a+r)/2),W=(t,e,a)=>t.map((r,m)=>r.map((c,n)=>a(c,e[m][n])));function _(t){let e=t.length,a;for(;e!=0;)a=Math.floor(Math.random()*e),e--,[t[e],t[a]]=[t[a],t[e]];return t}var D=_;onmessage=async function(t){let[e,...a]=t.data,r;e==="process"?r=await k(...a):console.error("Unrecognized message in worker",e),postMessage(["done",r])};async function k(t,e){e.startTime||(e.startTime=Date.now()),e.changed=!1;let a=t.length,r=0;!!t[0].frequencies[0]?.length||t.forEach(p=>p.frequencies=[p.frequencies]);let c=t[0].frequencies;e.frequencies=c[0].length;let n=[];c.forEach((p,u)=>{e.history[0].length===e.duration&&(n.push(Object.assign({},e.history)),e.history=e.history.map(g=>[])),t.map(g=>g.frequencies[u]).forEach((g,f)=>{e.history[f]||(e.history[f]=[]),e.history[f].push(g)})}),e.shuffle&&(n=D(n));let T=n.forEach(async(p,u)=>{let g=performance.now(),z=Array.from({length:Math.ceil(e.frequencies/e.freqWindow)},(v,o)=>o*e.freqWindow).forEach(async v=>{let o=v,q=v+e.freqWindow;e.patterns[o]||(e.patterns[o]=[]);let w=e.patterns[o];if(q<e.frequencies){let i=[];for(let s=0;s<a;s++){let l=p[s].map(d=>Array.from(d).slice(o,q));i.push(l)}let b=(Date.now()-e.startTime)/1e3,h=!1;if(w.forEach(s=>{let l=s.average,d=y(i[0],l[0]),x=y(i[1],l[1]);(d+x)/2<e.distanceMax&&(h?h.push(s):h=[s])}),!h){let s={id:Math.floor(1e5*Math.random()),times:[{t:b,i:u}],bin:v,average:i};h=[s],w.push(s)}else h.forEach(s=>{s.times.push({t:b,i:u,original:i}),s.average[0]=M(s.average[0],i[0]),s.average[1]=M(s.average[1],i[1])});h.forEach(s=>{let l=s.times.length,d=!0,x=!0;l>1&&(d||x)&&(e.alphabet.has(s.id)||r++,e.alphabet.set(s.id,l),e.alphabetData.set(s.id,{average:s.average,start:o,end:q,times:s.times,bin:s.bin}),e.changed=!0)})}}),I=performance.now(),P=(u+1)/n.length;postMessage(["progress",P,I-g,r])});return console.log("outer promises",T),e}})();\n')], { type: "text/javascript" }));
  var worker_default = url;

  // app/alphabetize/process.js
  var worker = new Worker(worker_default);
  var resolver = null;
  var workerCallback = null;
  worker.onmessage = function(e2) {
    const [msg, ...data2] = e2.data;
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
      for (let k2 in this.analyses) {
        this.analyses[k2].output = this.analyses[k2].function();
      }
      for (let k2 in this.integrations) {
        this.integrations[k2].output = this.integrations[k2].function();
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
        nodes: [(i2, nodes) => {
          const processor = ctx.createScriptProcessor(1024, 1, 1);
          this.fftData[i2] = [];
          processor.onaudioprocess = (e2) => {
            const data2 = new Uint8Array(nodes.analyser.frequencyBinCount);
            nodes.analyser.getByteFrequencyData(data2);
            if (typeof callback == "function")
              callback(data2);
            this.fftData[i2].push(data2);
          };
          return processor;
        }]
      });
      const source = ctx.createBufferSource();
      source.connect(splitInfo.input);
      splitInfo.output.connect(ctx.destination);
      source.buffer = buff;
      source.onended = (e2) => {
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
      for (let i2 = 0; i2 < channels; i2++) {
        const gainNode = context.createGain();
        gainNode.gain.setValueAtTime(1, context.currentTime);
        const analyser = this.createAnalyser(context);
        splitter.connect(analyser, i2);
        const nodes = {
          analyser,
          gainNode
        };
        let upstream = analyser;
        if (options.nodes)
          options.nodes.forEach((f2, j) => {
            const node = f2(i2, nodes);
            upstream.connect(node);
            upstream = node;
            nodes[`custom${j}`] = node;
          });
        upstream.connect(gainNode);
        gainNode.connect(merger, 0, i2);
        if (onChannel instanceof Function)
          onChannel(i2, nodes);
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
        const splitInfo = this.split(channels, (i2, nodes) => {
          const o2 = addDisplay2();
          o2.container.insertAdjacentHTML("afterbegin", `<h3>${i2 == 0 ? "Left" : "Right"} Channel </h3>`);
          this.addAnalysis(nodes.analyser, "fft", o2.spectrogram, this.info.onData);
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
        const o2 = addDisplay2();
        const thisGain = this.context.createGain();
        this.analyser.connect(thisGain);
        thisGain.connect(this.out);
        if (this.canListen)
          thisGain.gain.value = 1;
        else
          thisGain.gain.value = 0;
        this.addAnalysis(this.analyser, "fft", o2.spectrogram);
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
          const o2 = await integrator(iArr.map((i2) => this.analyses[i2].output));
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
  var transformFFTData = (o2, transformation2) => {
    if (o2[0] && o2[1]) {
      if (transformation2 instanceof Function) {
        return o2[0].map((arr, i2) => {
          return transformation2(arr, o2[1][i2]);
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
            features = plottedData.map((arr) => arr.map((v2) => v2 < thresh ? 0 : v2));
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
  var spectrogram = new Spectrogram({
    Plotly
  });
  if (colorscale) {
    colorscale.options = Spectrogram.colorscales;
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
    onData: (o2, i2) => {
      let volumeSum = 0;
      for (const volume2 of o2.frequencies)
        volumeSum += volume2;
      const averageVolume = volumeSum / o2.frequencies.length;
      const volumeVal = averageVolume / (audio.info.maxDecibels - audio.info.minDecibels);
      if (volume)
        volume.volume = volumeVal;
    }
  };
  var audio = new AudioManager(audioInfo);

  // app/ripThroughFile.js
  var fileFFTs = {};
  var binToFreq = (bin, hzPerBin) => bin * hzPerBin;
  var freqToBin = (freq, hzPerBin) => Math.ceil(freq / hzPerBin);
  var getFileFFT = (file2) => {
    const type = file2.type.split("/")[0];
    if (fileFFTs[file2.name])
      return fileFFTs[file2.name];
    else {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (ev) => {
          overlay.open = true;
          overlayDiv.innerHTML = `<h3>Decoding audio data from ${type} file...</h3>`;
          audio.context.decodeAudioData(ev.target.result, (data2) => {
            overlayDiv.innerHTML = "<h3>Getting FFTs...</h3>";
            audio.fft(data2, null, async (o2) => {
              fileFFTs[file2.name] = {
                ffts: o2,
                data: data2
              };
              resolve(fileFFTs[file2.name]);
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
        reader.readAsArrayBuffer(file2);
      });
    }
  };
  var ripThroughFile = async (file2) => {
    const type = file2.type.split("/")[0];
    const fftInfo = await getFileFFT(file2);
    overlay.open = true;
    let info2 = init_default();
    const hzPerBin = audio.context.sampleRate / (2 * audio.analyser.frequencyBinCount);
    const fftWindowWidth = audio.analyser.fftSize;
    info2.secondsPerBin = fftWindowWidth / fftInfo.data.sampleRate;
    info2.updateLabels();
    const maxFreqBin = freqToBin(info2.worker.maxFreq, hzPerBin);
    const minFreqBin = freqToBin(info2.worker.minFreq, hzPerBin);
    const ffts = Object.assign({}, fftInfo.ffts);
    const len = ffts[0].length - 1;
    let filePct = 0;
    let fileLength = 0;
    let maxFFTs = info2.worker.maximumFFTs ?? len;
    for (let key in ffts) {
      filePct = maxFFTs / len;
      fileLength = len * fftWindowWidth / fftInfo.data.sampleRate;
      ffts[key] = ffts[key].slice(0, maxFFTs);
      if (maxFreqBin)
        ffts[key] = ffts[key].map((arr) => arr.slice(0, maxFreqBin));
      if (minFreqBin)
        ffts[key] = ffts[key].map((arr) => arr.slice(minFreqBin));
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
                        <small>${maxFFTs} FFTs | ${(fileLength * filePct).toFixed(1)}s of the file</small>
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
        const performanceAverage = performanceArr.reduce((a2, b2) => a2 + b2, 0) / performanceArr.length;
        setOverlay(ratio, performanceAverage, patterns);
      }
    });
    const toc = Date.now();
    console.log(`Got Alphabet in ${((toc - tic) / 1e3).toFixed(2)}s`, info2.worker);
    console.log("info.worker.alphabetData", info2.worker.alphabetData);
    info2.worker.alphabetData.forEach((o2) => {
      o2.times = o2.times.map((obj) => {
        obj.t = obj.i * info2.secondsPerBin * info2.worker.duration;
        return obj;
      });
      const firstFreq = binToFreq(o2.bin, hzPerBin);
      o2.frequencies = [firstFreq, binToFreq(o2.bin + info2.worker.freqWindow + 1, hzPerBin)];
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
      for (var i2 = 0; i2 !== deviceInfos.length; ++i2) {
        var deviceInfo = deviceInfos[i2];
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
    let o2;
    if (type === "stream") {
      o2 = spawnStreamDisplay(count, input);
      count++;
    }
    return o2;
  };
  var spawnStreamDisplay = (count2, o2 = {}) => {
    const container = document.createElement("div");
    container.classList.add("container");
    analysesDiv.insertAdjacentElement("beforeend", container);
    if (o2.video) {
      if (o2.stream) {
        o2.video.srcObject = o2.stream;
        o2.video.controls = true;
        o2.video.muted = true;
      } else {
        o2.video.controls = true;
      }
      o2.video.autoplay = true;
    }
    sourceRegistry[count2] = {
      container,
      video: o2.video,
      stream: o2.stream,
      spectrogram: new index.data.Spectrogram()
    };
    container.insertAdjacentElement("beforeend", sourceRegistry[count2].spectrogram);
    return sourceRegistry[count2];
  };
  var count = 0;
  var files = [];
  runAnalysis.onclick = async (ev) => {
    audio.initializeContext();
    count = 0;
    for (let file2 of files) {
      const type = file2.type.split("/")[0];
      let source, video2;
      if (type === "video") {
        video2 = document.createElement("video");
        video2.src = URL.createObjectURL(file2);
        source = audio.context.createMediaElementSource(video2);
        ripThroughFile_default(file2);
      } else {
        source = await ripThroughFile_default(file2);
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
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
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
