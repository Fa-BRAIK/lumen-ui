var Vn = ["input", "select", "textarea", "a[href]", "button", "[tabindex]:not(slot)", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"], se = /* @__PURE__ */ Vn.join(","), jn = typeof Element > "u", xt = jn ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, Le = !jn && Element.prototype.getRootNode ? function(t) {
  return t.getRootNode();
} : function(t) {
  return t.ownerDocument;
}, Kn = function(e, n, o) {
  var r = Array.prototype.slice.apply(e.querySelectorAll(se));
  return n && xt.call(e, se) && r.unshift(e), r = r.filter(o), r;
}, Un = function t(e, n, o) {
  for (var r = [], i = Array.from(e); i.length; ) {
    var a = i.shift();
    if (a.tagName === "SLOT") {
      var s = a.assignedElements(), l = s.length ? s : a.children, c = t(l, !0, o);
      o.flatten ? r.push.apply(r, c) : r.push({
        scope: a,
        candidates: c
      });
    } else {
      var u = xt.call(a, se);
      u && o.filter(a) && (n || !e.includes(a)) && r.push(a);
      var d = a.shadowRoot || // check for an undisclosed shadow
      typeof o.getShadowRoot == "function" && o.getShadowRoot(a), f = !o.shadowRootFilter || o.shadowRootFilter(a);
      if (d && f) {
        var m = t(d === !0 ? a.children : d.children, !0, o);
        o.flatten ? r.push.apply(r, m) : r.push({
          scope: a,
          candidates: m
        });
      } else
        i.unshift.apply(i, a.children);
    }
  }
  return r;
}, Gn = function(e, n) {
  return e.tabIndex < 0 && (n || /^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || e.isContentEditable) && isNaN(parseInt(e.getAttribute("tabindex"), 10)) ? 0 : e.tabIndex;
}, Yo = function(e, n) {
  return e.tabIndex === n.tabIndex ? e.documentOrder - n.documentOrder : e.tabIndex - n.tabIndex;
}, Zn = function(e) {
  return e.tagName === "INPUT";
}, Ho = function(e) {
  return Zn(e) && e.type === "hidden";
}, _o = function(e) {
  var n = e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(o) {
    return o.tagName === "SUMMARY";
  });
  return n;
}, Wo = function(e, n) {
  for (var o = 0; o < e.length; o++)
    if (e[o].checked && e[o].form === n)
      return e[o];
}, qo = function(e) {
  if (!e.name)
    return !0;
  var n = e.form || Le(e), o = function(s) {
    return n.querySelectorAll('input[type="radio"][name="' + s + '"]');
  }, r;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    r = o(window.CSS.escape(e.name));
  else
    try {
      r = o(e.name);
    } catch (a) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", a.message), !1;
    }
  var i = Wo(r, e.form);
  return !i || i === e;
}, Bo = function(e) {
  return Zn(e) && e.type === "radio";
}, zo = function(e) {
  return Bo(e) && !qo(e);
}, yn = function(e) {
  var n = e.getBoundingClientRect(), o = n.width, r = n.height;
  return o === 0 && r === 0;
}, Vo = function(e, n) {
  var o = n.displayCheck, r = n.getShadowRoot;
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  var i = xt.call(e, "details>summary:first-of-type"), a = i ? e.parentElement : e;
  if (xt.call(a, "details:not([open]) *"))
    return !0;
  var s = Le(e).host, l = s?.ownerDocument.contains(s) || e.ownerDocument.contains(e);
  if (!o || o === "full") {
    if (typeof r == "function") {
      for (var c = e; e; ) {
        var u = e.parentElement, d = Le(e);
        if (u && !u.shadowRoot && r(u) === !0)
          return yn(e);
        e.assignedSlot ? e = e.assignedSlot : !u && d !== e.ownerDocument ? e = d.host : e = u;
      }
      e = c;
    }
    if (l)
      return !e.getClientRects().length;
  } else if (o === "non-zero-area")
    return yn(e);
  return !1;
}, jo = function(e) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
    for (var n = e.parentElement; n; ) {
      if (n.tagName === "FIELDSET" && n.disabled) {
        for (var o = 0; o < n.children.length; o++) {
          var r = n.children.item(o);
          if (r.tagName === "LEGEND")
            return xt.call(n, "fieldset[disabled] *") ? !0 : !r.contains(e);
        }
        return !0;
      }
      n = n.parentElement;
    }
  return !1;
}, le = function(e, n) {
  return !(n.disabled || Ho(n) || Vo(n, e) || // For a details element with a summary, the summary element gets the focus
  _o(n) || jo(n));
}, Ne = function(e, n) {
  return !(zo(n) || Gn(n) < 0 || !le(e, n));
}, Ko = function(e) {
  var n = parseInt(e.getAttribute("tabindex"), 10);
  return !!(isNaN(n) || n >= 0);
}, Uo = function t(e) {
  var n = [], o = [];
  return e.forEach(function(r, i) {
    var a = !!r.scope, s = a ? r.scope : r, l = Gn(s, a), c = a ? t(r.candidates) : s;
    l === 0 ? a ? n.push.apply(n, c) : n.push(s) : o.push({
      documentOrder: i,
      tabIndex: l,
      item: r,
      isScope: a,
      content: c
    });
  }), o.sort(Yo).reduce(function(r, i) {
    return i.isScope ? r.push.apply(r, i.content) : r.push(i.content), r;
  }, []).concat(n);
}, Go = function(e, n) {
  n = n || {};
  var o;
  return n.getShadowRoot ? o = Un([e], n.includeContainer, {
    filter: Ne.bind(null, n),
    flatten: !1,
    getShadowRoot: n.getShadowRoot,
    shadowRootFilter: Ko
  }) : o = Kn(e, n.includeContainer, Ne.bind(null, n)), Uo(o);
}, Xn = function(e, n) {
  n = n || {};
  var o;
  return n.getShadowRoot ? o = Un([e], n.includeContainer, {
    filter: le.bind(null, n),
    flatten: !0,
    getShadowRoot: n.getShadowRoot
  }) : o = Kn(e, n.includeContainer, le.bind(null, n)), o;
}, te = function(e, n) {
  if (n = n || {}, !e)
    throw new Error("No node provided");
  return xt.call(e, se) === !1 ? !1 : Ne(n, e);
}, Zo = /* @__PURE__ */ Vn.concat("iframe").join(","), ie = function(e, n) {
  if (n = n || {}, !e)
    throw new Error("No node provided");
  return xt.call(e, Zo) === !1 ? !1 : le(n, e);
};
function xn(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    e && (o = o.filter(function(r) {
      return Object.getOwnPropertyDescriptor(t, r).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function wn(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? xn(Object(n), !0).forEach(function(o) {
      Xo(t, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : xn(Object(n)).forEach(function(o) {
      Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return t;
}
function Xo(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
var Dn = /* @__PURE__ */ function() {
  var t = [];
  return {
    activateTrap: function(n) {
      if (t.length > 0) {
        var o = t[t.length - 1];
        o !== n && o.pause();
      }
      var r = t.indexOf(n);
      r === -1 || t.splice(r, 1), t.push(n);
    },
    deactivateTrap: function(n) {
      var o = t.indexOf(n);
      o !== -1 && t.splice(o, 1), t.length > 0 && t[t.length - 1].unpause();
    }
  };
}(), Jo = function(e) {
  return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, Qo = function(e) {
  return e.key === "Escape" || e.key === "Esc" || e.keyCode === 27;
}, tr = function(e) {
  return e.key === "Tab" || e.keyCode === 9;
}, Mn = function(e) {
  return setTimeout(e, 0);
}, En = function(e, n) {
  var o = -1;
  return e.every(function(r, i) {
    return n(r) ? (o = i, !1) : !0;
  }), o;
}, Yt = function(e) {
  for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
    o[r - 1] = arguments[r];
  return typeof e == "function" ? e.apply(void 0, o) : e;
}, ee = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, er = function(e, n) {
  var o = n?.document || document, r = wn({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0
  }, n), i = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   firstTabbableNode: HTMLElement|null,
    //   lastTabbableNode: HTMLElement|null,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: !1,
    paused: !1,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0
  }, a, s = function(y, g, M) {
    return y && y[g] !== void 0 ? y[g] : r[M || g];
  }, l = function(y) {
    return i.containerGroups.findIndex(function(g) {
      var M = g.container, C = g.tabbableNodes;
      return M.contains(y) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      C.find(function(k) {
        return k === y;
      });
    });
  }, c = function(y) {
    var g = r[y];
    if (typeof g == "function") {
      for (var M = arguments.length, C = new Array(M > 1 ? M - 1 : 0), k = 1; k < M; k++)
        C[k - 1] = arguments[k];
      g = g.apply(void 0, C);
    }
    if (g === !0 && (g = void 0), !g) {
      if (g === void 0 || g === !1)
        return g;
      throw new Error("`".concat(y, "` was specified but was not a node, or did not return a node"));
    }
    var N = g;
    if (typeof g == "string" && (N = o.querySelector(g), !N))
      throw new Error("`".concat(y, "` as selector refers to no known node"));
    return N;
  }, u = function() {
    var y = c("initialFocus");
    if (y === !1)
      return !1;
    if (y === void 0)
      if (l(o.activeElement) >= 0)
        y = o.activeElement;
      else {
        var g = i.tabbableGroups[0], M = g && g.firstTabbableNode;
        y = M || c("fallbackFocus");
      }
    if (!y)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return y;
  }, d = function() {
    if (i.containerGroups = i.containers.map(function(y) {
      var g = Go(y, r.tabbableOptions), M = Xn(y, r.tabbableOptions);
      return {
        container: y,
        tabbableNodes: g,
        focusableNodes: M,
        firstTabbableNode: g.length > 0 ? g[0] : null,
        lastTabbableNode: g.length > 0 ? g[g.length - 1] : null,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(k) {
          var N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, $ = M.findIndex(function(R) {
            return R === k;
          });
          if (!($ < 0))
            return N ? M.slice($ + 1).find(function(R) {
              return te(R, r.tabbableOptions);
            }) : M.slice(0, $).reverse().find(function(R) {
              return te(R, r.tabbableOptions);
            });
        }
      };
    }), i.tabbableGroups = i.containerGroups.filter(function(y) {
      return y.tabbableNodes.length > 0;
    }), i.tabbableGroups.length <= 0 && !c("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
  }, f = function T(y) {
    if (y !== !1 && y !== o.activeElement) {
      if (!y || !y.focus) {
        T(u());
        return;
      }
      y.focus({
        preventScroll: !!r.preventScroll
      }), i.mostRecentlyFocusedNode = y, Jo(y) && y.select();
    }
  }, m = function(y) {
    var g = c("setReturnFocus", y);
    return g || (g === !1 ? !1 : y);
  }, h = function(y) {
    var g = ee(y);
    if (!(l(g) >= 0)) {
      if (Yt(r.clickOutsideDeactivates, y)) {
        a.deactivate({
          // if, on deactivation, we should return focus to the node originally-focused
          //  when the trap was activated (or the configured `setReturnFocus` node),
          //  then assume it's also OK to return focus to the outside node that was
          //  just clicked, causing deactivation, as long as that node is focusable;
          //  if it isn't focusable, then return focus to the original node focused
          //  on activation (or the configured `setReturnFocus` node)
          // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
          //  which will result in the outside click setting focus to the node
          //  that was clicked, whether it's focusable or not; by setting
          //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
          //  on activation (or the configured `setReturnFocus` node)
          returnFocus: r.returnFocusOnDeactivate && !ie(g, r.tabbableOptions)
        });
        return;
      }
      Yt(r.allowOutsideClick, y) || y.preventDefault();
    }
  }, v = function(y) {
    var g = ee(y), M = l(g) >= 0;
    M || g instanceof Document ? M && (i.mostRecentlyFocusedNode = g) : (y.stopImmediatePropagation(), f(i.mostRecentlyFocusedNode || u()));
  }, b = function(y) {
    var g = ee(y);
    d();
    var M = null;
    if (i.tabbableGroups.length > 0) {
      var C = l(g), k = C >= 0 ? i.containerGroups[C] : void 0;
      if (C < 0)
        y.shiftKey ? M = i.tabbableGroups[i.tabbableGroups.length - 1].lastTabbableNode : M = i.tabbableGroups[0].firstTabbableNode;
      else if (y.shiftKey) {
        var N = En(i.tabbableGroups, function(Y) {
          var P = Y.firstTabbableNode;
          return g === P;
        });
        if (N < 0 && (k.container === g || ie(g, r.tabbableOptions) && !te(g, r.tabbableOptions) && !k.nextTabbableNode(g, !1)) && (N = C), N >= 0) {
          var $ = N === 0 ? i.tabbableGroups.length - 1 : N - 1, R = i.tabbableGroups[$];
          M = R.lastTabbableNode;
        }
      } else {
        var O = En(i.tabbableGroups, function(Y) {
          var P = Y.lastTabbableNode;
          return g === P;
        });
        if (O < 0 && (k.container === g || ie(g, r.tabbableOptions) && !te(g, r.tabbableOptions) && !k.nextTabbableNode(g)) && (O = C), O >= 0) {
          var W = O === i.tabbableGroups.length - 1 ? 0 : O + 1, B = i.tabbableGroups[W];
          M = B.firstTabbableNode;
        }
      }
    } else
      M = c("fallbackFocus");
    M && (y.preventDefault(), f(M));
  }, p = function(y) {
    if (Qo(y) && Yt(r.escapeDeactivates, y) !== !1) {
      y.preventDefault(), a.deactivate();
      return;
    }
    if (tr(y)) {
      b(y);
      return;
    }
  }, x = function(y) {
    var g = ee(y);
    l(g) >= 0 || Yt(r.clickOutsideDeactivates, y) || Yt(r.allowOutsideClick, y) || (y.preventDefault(), y.stopImmediatePropagation());
  }, D = function() {
    if (i.active)
      return Dn.activateTrap(a), i.delayInitialFocusTimer = r.delayInitialFocus ? Mn(function() {
        f(u());
      }) : f(u()), o.addEventListener("focusin", v, !0), o.addEventListener("mousedown", h, {
        capture: !0,
        passive: !1
      }), o.addEventListener("touchstart", h, {
        capture: !0,
        passive: !1
      }), o.addEventListener("click", x, {
        capture: !0,
        passive: !1
      }), o.addEventListener("keydown", p, {
        capture: !0,
        passive: !1
      }), a;
  }, A = function() {
    if (i.active)
      return o.removeEventListener("focusin", v, !0), o.removeEventListener("mousedown", h, !0), o.removeEventListener("touchstart", h, !0), o.removeEventListener("click", x, !0), o.removeEventListener("keydown", p, !0), a;
  };
  return a = {
    get active() {
      return i.active;
    },
    get paused() {
      return i.paused;
    },
    activate: function(y) {
      if (i.active)
        return this;
      var g = s(y, "onActivate"), M = s(y, "onPostActivate"), C = s(y, "checkCanFocusTrap");
      C || d(), i.active = !0, i.paused = !1, i.nodeFocusedBeforeActivation = o.activeElement, g && g();
      var k = function() {
        C && d(), D(), M && M();
      };
      return C ? (C(i.containers.concat()).then(k, k), this) : (k(), this);
    },
    deactivate: function(y) {
      if (!i.active)
        return this;
      var g = wn({
        onDeactivate: r.onDeactivate,
        onPostDeactivate: r.onPostDeactivate,
        checkCanReturnFocus: r.checkCanReturnFocus
      }, y);
      clearTimeout(i.delayInitialFocusTimer), i.delayInitialFocusTimer = void 0, A(), i.active = !1, i.paused = !1, Dn.deactivateTrap(a);
      var M = s(g, "onDeactivate"), C = s(g, "onPostDeactivate"), k = s(g, "checkCanReturnFocus"), N = s(g, "returnFocus", "returnFocusOnDeactivate");
      M && M();
      var $ = function() {
        Mn(function() {
          N && f(m(i.nodeFocusedBeforeActivation)), C && C();
        });
      };
      return N && k ? (k(m(i.nodeFocusedBeforeActivation)).then($, $), this) : ($(), this);
    },
    pause: function() {
      return i.paused || !i.active ? this : (i.paused = !0, A(), this);
    },
    unpause: function() {
      return !i.paused || !i.active ? this : (i.paused = !1, d(), D(), this);
    },
    updateContainerElements: function(y) {
      var g = [].concat(y).filter(Boolean);
      return i.containers = g.map(function(M) {
        return typeof M == "string" ? o.querySelector(M) : M;
      }), i.active && d(), this;
    }
  }, a.updateContainerElements(e), a;
};
function nr(t) {
  let e, n;
  window.addEventListener("focusin", () => {
    e = n, n = document.activeElement;
  }), t.magic("focus", (o) => {
    let r = o;
    return {
      __noscroll: !1,
      __wrapAround: !1,
      within(i) {
        return r = i, this;
      },
      withoutScrolling() {
        return this.__noscroll = !0, this;
      },
      noscroll() {
        return this.__noscroll = !0, this;
      },
      withWrapAround() {
        return this.__wrapAround = !0, this;
      },
      wrap() {
        return this.withWrapAround();
      },
      focusable(i) {
        return ie(i);
      },
      previouslyFocused() {
        return e;
      },
      lastFocused() {
        return e;
      },
      focused() {
        return n;
      },
      focusables() {
        return Array.isArray(r) ? r : Xn(r, { displayCheck: "none" });
      },
      all() {
        return this.focusables();
      },
      isFirst(i) {
        let a = this.all();
        return a[0] && a[0].isSameNode(i);
      },
      isLast(i) {
        let a = this.all();
        return a.length && a.slice(-1)[0].isSameNode(i);
      },
      getFirst() {
        return this.all()[0];
      },
      getLast() {
        return this.all().slice(-1)[0];
      },
      getNext() {
        let i = this.all(), a = document.activeElement;
        if (i.indexOf(a) !== -1)
          return this.__wrapAround && i.indexOf(a) === i.length - 1 ? i[0] : i[i.indexOf(a) + 1];
      },
      getPrevious() {
        let i = this.all(), a = document.activeElement;
        if (i.indexOf(a) !== -1)
          return this.__wrapAround && i.indexOf(a) === 0 ? i.slice(-1)[0] : i[i.indexOf(a) - 1];
      },
      first() {
        this.focus(this.getFirst());
      },
      last() {
        this.focus(this.getLast());
      },
      next() {
        this.focus(this.getNext());
      },
      previous() {
        this.focus(this.getPrevious());
      },
      prev() {
        return this.previous();
      },
      focus(i) {
        i && setTimeout(() => {
          i.hasAttribute("tabindex") || i.setAttribute("tabindex", "0"), i.focus({ preventScroll: this.__noscroll });
        });
      }
    };
  }), t.directive("trap", t.skipDuringClone(
    (o, { expression: r, modifiers: i }, { effect: a, evaluateLater: s, cleanup: l }) => {
      let c = s(r), u = !1, d = {
        escapeDeactivates: !1,
        allowOutsideClick: !0,
        fallbackFocus: () => o
      };
      if (i.includes("noautofocus"))
        d.initialFocus = !1;
      else {
        let b = o.querySelector("[autofocus]");
        b && (d.initialFocus = b);
      }
      let f = er(o, d), m = () => {
      }, h = () => {
      };
      const v = () => {
        m(), m = () => {
        }, h(), h = () => {
        }, f.deactivate({
          returnFocus: !i.includes("noreturn")
        });
      };
      a(() => c((b) => {
        u !== b && (b && !u && (i.includes("noscroll") && (h = or()), i.includes("inert") && (m = Tn(o)), setTimeout(() => {
          f.activate();
        }, 15)), !b && u && v(), u = !!b);
      })), l(v);
    },
    // When cloning, we only want to add aria-hidden attributes to the
    // DOM and not try to actually trap, as trapping can mess with the
    // live DOM and isn't just isolated to the cloned DOM.
    (o, { expression: r, modifiers: i }, { evaluate: a }) => {
      i.includes("inert") && a(r) && Tn(o);
    }
  ));
}
function Tn(t) {
  let e = [];
  return Jn(t, (n) => {
    let o = n.hasAttribute("aria-hidden");
    n.setAttribute("aria-hidden", "true"), e.push(() => o || n.removeAttribute("aria-hidden"));
  }), () => {
    for (; e.length; )
      e.pop()();
  };
}
function Jn(t, e) {
  t.isSameNode(document.body) || !t.parentNode || Array.from(t.parentNode.children).forEach((n) => {
    n.isSameNode(t) ? Jn(t.parentNode, e) : e(n);
  });
}
function or() {
  let t = document.documentElement.style.overflow, e = document.documentElement.style.paddingRight, n = window.innerWidth - document.documentElement.clientWidth;
  return document.documentElement.style.overflow = "hidden", document.documentElement.style.paddingRight = `${n}px`, () => {
    document.documentElement.style.overflow = t, document.documentElement.style.paddingRight = e;
  };
}
var rr = nr;
/*! Bundled license information:

tabbable/dist/index.esm.js:
  (*!
  * tabbable 5.3.3
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)

focus-trap/dist/focus-trap.esm.js:
  (*!
  * focus-trap 6.9.4
  * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
  *)
*/
function ir(t) {
  t.directive("collapse", e), e.inline = (n, { modifiers: o }) => {
    o.includes("min") && (n._x_doShow = () => {
    }, n._x_doHide = () => {
    });
  };
  function e(n, { modifiers: o }) {
    let r = Sn(o, "duration", 250) / 1e3, i = Sn(o, "min", 0), a = !o.includes("min");
    n._x_isShown || (n.style.height = `${i}px`), !n._x_isShown && a && (n.hidden = !0), n._x_isShown || (n.style.overflow = "hidden");
    let s = (c, u) => {
      let d = t.setStyles(c, u);
      return u.height ? () => {
      } : d;
    }, l = {
      transitionProperty: "height",
      transitionDuration: `${r}s`,
      transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)"
    };
    n._x_transition = {
      in(c = () => {
      }, u = () => {
      }) {
        a && (n.hidden = !1), a && (n.style.display = null);
        let d = n.getBoundingClientRect().height;
        n.style.height = "auto";
        let f = n.getBoundingClientRect().height;
        d === f && (d = i), t.transition(n, t.setStyles, {
          during: l,
          start: { height: d + "px" },
          end: { height: f + "px" }
        }, () => n._x_isShown = !0, () => {
          Math.abs(n.getBoundingClientRect().height - f) < 1 && (n.style.overflow = null);
        });
      },
      out(c = () => {
      }, u = () => {
      }) {
        let d = n.getBoundingClientRect().height;
        t.transition(n, s, {
          during: l,
          start: { height: d + "px" },
          end: { height: i + "px" }
        }, () => n.style.overflow = "hidden", () => {
          n._x_isShown = !1, n.style.height == `${i}px` && a && (n.style.display = "none", n.hidden = !0);
        });
      }
    };
  }
}
function Sn(t, e, n) {
  if (t.indexOf(e) === -1)
    return n;
  const o = t[t.indexOf(e) + 1];
  if (!o)
    return n;
  if (e === "duration") {
    let r = o.match(/([0-9]+)ms/);
    if (r)
      return r[1];
  }
  if (e === "min") {
    let r = o.match(/([0-9]+)px/);
    if (r)
      return r[1];
  }
  return o;
}
var ar = ir;
const ft = Math.min, U = Math.max, ce = Math.round, ne = Math.floor, nt = (t) => ({
  x: t,
  y: t
}), sr = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, lr = {
  start: "end",
  end: "start"
};
function Fe(t, e, n) {
  return U(t, ft(e, n));
}
function Ft(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function mt(t) {
  return t.split("-")[0];
}
function $t(t) {
  return t.split("-")[1];
}
function Qn(t) {
  return t === "x" ? "y" : "x";
}
function Be(t) {
  return t === "y" ? "height" : "width";
}
function lt(t) {
  return ["top", "bottom"].includes(mt(t)) ? "y" : "x";
}
function ze(t) {
  return Qn(lt(t));
}
function cr(t, e, n) {
  n === void 0 && (n = !1);
  const o = $t(t), r = ze(t), i = Be(r);
  let a = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[i] > e.floating[i] && (a = ue(a)), [a, ue(a)];
}
function ur(t) {
  const e = ue(t);
  return [$e(t), e, $e(e)];
}
function $e(t) {
  return t.replace(/start|end/g, (e) => lr[e]);
}
function dr(t, e, n) {
  const o = ["left", "right"], r = ["right", "left"], i = ["top", "bottom"], a = ["bottom", "top"];
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? r : o : e ? o : r;
    case "left":
    case "right":
      return e ? i : a;
    default:
      return [];
  }
}
function fr(t, e, n, o) {
  const r = $t(t);
  let i = dr(mt(t), n === "start", o);
  return r && (i = i.map((a) => a + "-" + r), e && (i = i.concat(i.map($e)))), i;
}
function ue(t) {
  return t.replace(/left|right|bottom|top/g, (e) => sr[e]);
}
function mr(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function to(t) {
  return typeof t != "number" ? mr(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function de(t) {
  const {
    x: e,
    y: n,
    width: o,
    height: r
  } = t;
  return {
    width: o,
    height: r,
    top: n,
    left: e,
    right: e + o,
    bottom: n + r,
    x: e,
    y: n
  };
}
function Cn(t, e, n) {
  let {
    reference: o,
    floating: r
  } = t;
  const i = lt(e), a = ze(e), s = Be(a), l = mt(e), c = i === "y", u = o.x + o.width / 2 - r.width / 2, d = o.y + o.height / 2 - r.height / 2, f = o[s] / 2 - r[s] / 2;
  let m;
  switch (l) {
    case "top":
      m = {
        x: u,
        y: o.y - r.height
      };
      break;
    case "bottom":
      m = {
        x: u,
        y: o.y + o.height
      };
      break;
    case "right":
      m = {
        x: o.x + o.width,
        y: d
      };
      break;
    case "left":
      m = {
        x: o.x - r.width,
        y: d
      };
      break;
    default:
      m = {
        x: o.x,
        y: o.y
      };
  }
  switch ($t(e)) {
    case "start":
      m[a] -= f * (n && c ? -1 : 1);
      break;
    case "end":
      m[a] += f * (n && c ? -1 : 1);
      break;
  }
  return m;
}
const hr = async (t, e, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: i = [],
    platform: a
  } = n, s = i.filter(Boolean), l = await (a.isRTL == null ? void 0 : a.isRTL(e));
  let c = await a.getElementRects({
    reference: t,
    floating: e,
    strategy: r
  }), {
    x: u,
    y: d
  } = Cn(c, o, l), f = o, m = {}, h = 0;
  for (let v = 0; v < s.length; v++) {
    const {
      name: b,
      fn: p
    } = s[v], {
      x,
      y: D,
      data: A,
      reset: T
    } = await p({
      x: u,
      y: d,
      initialPlacement: o,
      placement: f,
      strategy: r,
      middlewareData: m,
      rects: c,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    u = x ?? u, d = D ?? d, m = {
      ...m,
      [b]: {
        ...m[b],
        ...A
      }
    }, T && h <= 50 && (h++, typeof T == "object" && (T.placement && (f = T.placement), T.rects && (c = T.rects === !0 ? await a.getElementRects({
      reference: t,
      floating: e,
      strategy: r
    }) : T.rects), {
      x: u,
      y: d
    } = Cn(c, f, l)), v = -1);
  }
  return {
    x: u,
    y: d,
    placement: f,
    strategy: r,
    middlewareData: m
  };
};
async function Ve(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: o,
    y: r,
    platform: i,
    rects: a,
    elements: s,
    strategy: l
  } = t, {
    boundary: c = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: d = "floating",
    altBoundary: f = !1,
    padding: m = 0
  } = Ft(e, t), h = to(m), b = s[f ? d === "floating" ? "reference" : "floating" : d], p = de(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(b))) == null || n ? b : b.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(s.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: l
  })), x = d === "floating" ? {
    x: o,
    y: r,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, D = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(s.floating)), A = await (i.isElement == null ? void 0 : i.isElement(D)) ? await (i.getScale == null ? void 0 : i.getScale(D)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, T = de(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: s,
    rect: x,
    offsetParent: D,
    strategy: l
  }) : x);
  return {
    top: (p.top - T.top + h.top) / A.y,
    bottom: (T.bottom - p.bottom + h.bottom) / A.y,
    left: (p.left - T.left + h.left) / A.x,
    right: (T.right - p.right + h.right) / A.x
  };
}
const pr = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: n,
      y: o,
      placement: r,
      rects: i,
      platform: a,
      elements: s,
      middlewareData: l
    } = e, {
      element: c,
      padding: u = 0
    } = Ft(t, e) || {};
    if (c == null)
      return {};
    const d = to(u), f = {
      x: n,
      y: o
    }, m = ze(r), h = Be(m), v = await a.getDimensions(c), b = m === "y", p = b ? "top" : "left", x = b ? "bottom" : "right", D = b ? "clientHeight" : "clientWidth", A = i.reference[h] + i.reference[m] - f[m] - i.floating[h], T = f[m] - i.reference[m], y = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let g = y ? y[D] : 0;
    (!g || !await (a.isElement == null ? void 0 : a.isElement(y))) && (g = s.floating[D] || i.floating[h]);
    const M = A / 2 - T / 2, C = g / 2 - v[h] / 2 - 1, k = ft(d[p], C), N = ft(d[x], C), $ = k, R = g - v[h] - N, O = g / 2 - v[h] / 2 + M, W = Fe($, O, R), B = !l.arrow && $t(r) != null && O !== W && i.reference[h] / 2 - (O < $ ? k : N) - v[h] / 2 < 0, Y = B ? O < $ ? O - $ : O - R : 0;
    return {
      [m]: f[m] + Y,
      data: {
        [m]: W,
        centerOffset: O - W - Y,
        ...B && {
          alignmentOffset: Y
        }
      },
      reset: B
    };
  }
}), vr = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, o;
      const {
        placement: r,
        middlewareData: i,
        rects: a,
        initialPlacement: s,
        platform: l,
        elements: c
      } = e, {
        mainAxis: u = !0,
        crossAxis: d = !0,
        fallbackPlacements: f,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: h = "none",
        flipAlignment: v = !0,
        ...b
      } = Ft(t, e);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const p = mt(r), x = lt(s), D = mt(s) === s, A = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), T = f || (D || !v ? [ue(s)] : ur(s)), y = h !== "none";
      !f && y && T.push(...fr(s, v, h, A));
      const g = [s, ...T], M = await Ve(e, b), C = [];
      let k = ((o = i.flip) == null ? void 0 : o.overflows) || [];
      if (u && C.push(M[p]), d) {
        const O = cr(r, a, A);
        C.push(M[O[0]], M[O[1]]);
      }
      if (k = [...k, {
        placement: r,
        overflows: C
      }], !C.every((O) => O <= 0)) {
        var N, $;
        const O = (((N = i.flip) == null ? void 0 : N.index) || 0) + 1, W = g[O];
        if (W && (!(d === "alignment" ? x !== lt(W) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        k.every((P) => P.overflows[0] > 0 && lt(P.placement) === x)))
          return {
            data: {
              index: O,
              overflows: k
            },
            reset: {
              placement: W
            }
          };
        let B = ($ = k.filter((Y) => Y.overflows[0] <= 0).sort((Y, P) => Y.overflows[1] - P.overflows[1])[0]) == null ? void 0 : $.placement;
        if (!B)
          switch (m) {
            case "bestFit": {
              var R;
              const Y = (R = k.filter((P) => {
                if (y) {
                  const z = lt(P.placement);
                  return z === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  z === "y";
                }
                return !0;
              }).map((P) => [P.placement, P.overflows.filter((z) => z > 0).reduce((z, vt) => z + vt, 0)]).sort((P, z) => P[1] - z[1])[0]) == null ? void 0 : R[0];
              Y && (B = Y);
              break;
            }
            case "initialPlacement":
              B = s;
              break;
          }
        if (r !== B)
          return {
            reset: {
              placement: B
            }
          };
      }
      return {};
    }
  };
};
async function gr(t, e) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = t, i = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), a = mt(n), s = $t(n), l = lt(n) === "y", c = ["left", "top"].includes(a) ? -1 : 1, u = i && l ? -1 : 1, d = Ft(e, t);
  let {
    mainAxis: f,
    crossAxis: m,
    alignmentAxis: h
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return s && typeof h == "number" && (m = s === "end" ? h * -1 : h), l ? {
    x: m * u,
    y: f * c
  } : {
    x: f * c,
    y: m * u
  };
}
const br = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, o;
      const {
        x: r,
        y: i,
        placement: a,
        middlewareData: s
      } = e, l = await gr(e, t);
      return a === ((n = s.offset) == null ? void 0 : n.placement) && (o = s.arrow) != null && o.alignmentOffset ? {} : {
        x: r + l.x,
        y: i + l.y,
        data: {
          ...l,
          placement: a
        }
      };
    }
  };
}, yr = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: o,
        placement: r
      } = e, {
        mainAxis: i = !0,
        crossAxis: a = !1,
        limiter: s = {
          fn: (b) => {
            let {
              x: p,
              y: x
            } = b;
            return {
              x: p,
              y: x
            };
          }
        },
        ...l
      } = Ft(t, e), c = {
        x: n,
        y: o
      }, u = await Ve(e, l), d = lt(mt(r)), f = Qn(d);
      let m = c[f], h = c[d];
      if (i) {
        const b = f === "y" ? "top" : "left", p = f === "y" ? "bottom" : "right", x = m + u[b], D = m - u[p];
        m = Fe(x, m, D);
      }
      if (a) {
        const b = d === "y" ? "top" : "left", p = d === "y" ? "bottom" : "right", x = h + u[b], D = h - u[p];
        h = Fe(x, h, D);
      }
      const v = s.fn({
        ...e,
        [f]: m,
        [d]: h
      });
      return {
        ...v,
        data: {
          x: v.x - n,
          y: v.y - o,
          enabled: {
            [f]: i,
            [d]: a
          }
        }
      };
    }
  };
}, xr = function(t) {
  return t === void 0 && (t = {}), {
    name: "size",
    options: t,
    async fn(e) {
      var n, o;
      const {
        placement: r,
        rects: i,
        platform: a,
        elements: s
      } = e, {
        apply: l = () => {
        },
        ...c
      } = Ft(t, e), u = await Ve(e, c), d = mt(r), f = $t(r), m = lt(r) === "y", {
        width: h,
        height: v
      } = i.floating;
      let b, p;
      d === "top" || d === "bottom" ? (b = d, p = f === (await (a.isRTL == null ? void 0 : a.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (p = d, b = f === "end" ? "top" : "bottom");
      const x = v - u.top - u.bottom, D = h - u.left - u.right, A = ft(v - u[b], x), T = ft(h - u[p], D), y = !e.middlewareData.shift;
      let g = A, M = T;
      if ((n = e.middlewareData.shift) != null && n.enabled.x && (M = D), (o = e.middlewareData.shift) != null && o.enabled.y && (g = x), y && !f) {
        const k = U(u.left, 0), N = U(u.right, 0), $ = U(u.top, 0), R = U(u.bottom, 0);
        m ? M = h - 2 * (k !== 0 || N !== 0 ? k + N : U(u.left, u.right)) : g = v - 2 * ($ !== 0 || R !== 0 ? $ + R : U(u.top, u.bottom));
      }
      await l({
        ...e,
        availableWidth: M,
        availableHeight: g
      });
      const C = await a.getDimensions(s.floating);
      return h !== C.width || v !== C.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function ve() {
  return typeof window < "u";
}
function Ot(t) {
  return eo(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function G(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function rt(t) {
  var e;
  return (e = (eo(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function eo(t) {
  return ve() ? t instanceof Node || t instanceof G(t).Node : !1;
}
function J(t) {
  return ve() ? t instanceof Element || t instanceof G(t).Element : !1;
}
function ot(t) {
  return ve() ? t instanceof HTMLElement || t instanceof G(t).HTMLElement : !1;
}
function An(t) {
  return !ve() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof G(t).ShadowRoot;
}
function Zt(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: o,
    display: r
  } = Q(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && !["inline", "contents"].includes(r);
}
function wr(t) {
  return ["table", "td", "th"].includes(Ot(t));
}
function ge(t) {
  return [":popover-open", ":modal"].some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
function je(t) {
  const e = Ke(), n = J(t) ? Q(t) : t;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((o) => (n.willChange || "").includes(o)) || ["paint", "layout", "strict", "content"].some((o) => (n.contain || "").includes(o));
}
function Dr(t) {
  let e = ht(t);
  for (; ot(e) && !kt(e); ) {
    if (je(e))
      return e;
    if (ge(e))
      return null;
    e = ht(e);
  }
  return null;
}
function Ke() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function kt(t) {
  return ["html", "body", "#document"].includes(Ot(t));
}
function Q(t) {
  return G(t).getComputedStyle(t);
}
function be(t) {
  return J(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function ht(t) {
  if (Ot(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    An(t) && t.host || // Fallback.
    rt(t)
  );
  return An(e) ? e.host : e;
}
function no(t) {
  const e = ht(t);
  return kt(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : ot(e) && Zt(e) ? e : no(e);
}
function zt(t, e, n) {
  var o;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const r = no(t), i = r === ((o = t.ownerDocument) == null ? void 0 : o.body), a = G(r);
  if (i) {
    const s = Oe(a);
    return e.concat(a, a.visualViewport || [], Zt(r) ? r : [], s && n ? zt(s) : []);
  }
  return e.concat(r, zt(r, [], n));
}
function Oe(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function oo(t) {
  const e = Q(t);
  let n = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const r = ot(t), i = r ? t.offsetWidth : n, a = r ? t.offsetHeight : o, s = ce(n) !== i || ce(o) !== a;
  return s && (n = i, o = a), {
    width: n,
    height: o,
    $: s
  };
}
function Ue(t) {
  return J(t) ? t : t.contextElement;
}
function At(t) {
  const e = Ue(t);
  if (!ot(e))
    return nt(1);
  const n = e.getBoundingClientRect(), {
    width: o,
    height: r,
    $: i
  } = oo(e);
  let a = (i ? ce(n.width) : n.width) / o, s = (i ? ce(n.height) : n.height) / r;
  return (!a || !Number.isFinite(a)) && (a = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: a,
    y: s
  };
}
const Mr = /* @__PURE__ */ nt(0);
function ro(t) {
  const e = G(t);
  return !Ke() || !e.visualViewport ? Mr : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Er(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== G(t) ? !1 : e;
}
function wt(t, e, n, o) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const r = t.getBoundingClientRect(), i = Ue(t);
  let a = nt(1);
  e && (o ? J(o) && (a = At(o)) : a = At(t));
  const s = Er(i, n, o) ? ro(i) : nt(0);
  let l = (r.left + s.x) / a.x, c = (r.top + s.y) / a.y, u = r.width / a.x, d = r.height / a.y;
  if (i) {
    const f = G(i), m = o && J(o) ? G(o) : o;
    let h = f, v = Oe(h);
    for (; v && o && m !== h; ) {
      const b = At(v), p = v.getBoundingClientRect(), x = Q(v), D = p.left + (v.clientLeft + parseFloat(x.paddingLeft)) * b.x, A = p.top + (v.clientTop + parseFloat(x.paddingTop)) * b.y;
      l *= b.x, c *= b.y, u *= b.x, d *= b.y, l += D, c += A, h = G(v), v = Oe(h);
    }
  }
  return de({
    width: u,
    height: d,
    x: l,
    y: c
  });
}
function Ge(t, e) {
  const n = be(t).scrollLeft;
  return e ? e.left + n : wt(rt(t)).left + n;
}
function io(t, e, n) {
  n === void 0 && (n = !1);
  const o = t.getBoundingClientRect(), r = o.left + e.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    Ge(t, o)
  )), i = o.top + e.scrollTop;
  return {
    x: r,
    y: i
  };
}
function Tr(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: o,
    strategy: r
  } = t;
  const i = r === "fixed", a = rt(o), s = e ? ge(e.floating) : !1;
  if (o === a || s && i)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = nt(1);
  const u = nt(0), d = ot(o);
  if ((d || !d && !i) && ((Ot(o) !== "body" || Zt(a)) && (l = be(o)), ot(o))) {
    const m = wt(o);
    c = At(o), u.x = m.x + o.clientLeft, u.y = m.y + o.clientTop;
  }
  const f = a && !d && !i ? io(a, l, !0) : nt(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - l.scrollLeft * c.x + u.x + f.x,
    y: n.y * c.y - l.scrollTop * c.y + u.y + f.y
  };
}
function Sr(t) {
  return Array.from(t.getClientRects());
}
function Cr(t) {
  const e = rt(t), n = be(t), o = t.ownerDocument.body, r = U(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), i = U(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let a = -n.scrollLeft + Ge(t);
  const s = -n.scrollTop;
  return Q(o).direction === "rtl" && (a += U(e.clientWidth, o.clientWidth) - r), {
    width: r,
    height: i,
    x: a,
    y: s
  };
}
function Ar(t, e) {
  const n = G(t), o = rt(t), r = n.visualViewport;
  let i = o.clientWidth, a = o.clientHeight, s = 0, l = 0;
  if (r) {
    i = r.width, a = r.height;
    const c = Ke();
    (!c || c && e === "fixed") && (s = r.offsetLeft, l = r.offsetTop);
  }
  return {
    width: i,
    height: a,
    x: s,
    y: l
  };
}
function kr(t, e) {
  const n = wt(t, !0, e === "fixed"), o = n.top + t.clientTop, r = n.left + t.clientLeft, i = ot(t) ? At(t) : nt(1), a = t.clientWidth * i.x, s = t.clientHeight * i.y, l = r * i.x, c = o * i.y;
  return {
    width: a,
    height: s,
    x: l,
    y: c
  };
}
function kn(t, e, n) {
  let o;
  if (e === "viewport")
    o = Ar(t, n);
  else if (e === "document")
    o = Cr(rt(t));
  else if (J(e))
    o = kr(e, n);
  else {
    const r = ro(t);
    o = {
      x: e.x - r.x,
      y: e.y - r.y,
      width: e.width,
      height: e.height
    };
  }
  return de(o);
}
function ao(t, e) {
  const n = ht(t);
  return n === e || !J(n) || kt(n) ? !1 : Q(n).position === "fixed" || ao(n, e);
}
function Lr(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let o = zt(t, [], !1).filter((s) => J(s) && Ot(s) !== "body"), r = null;
  const i = Q(t).position === "fixed";
  let a = i ? ht(t) : t;
  for (; J(a) && !kt(a); ) {
    const s = Q(a), l = je(a);
    !l && s.position === "fixed" && (r = null), (i ? !l && !r : !l && s.position === "static" && !!r && ["absolute", "fixed"].includes(r.position) || Zt(a) && !l && ao(t, a)) ? o = o.filter((u) => u !== a) : r = s, a = ht(a);
  }
  return e.set(t, o), o;
}
function Nr(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = t;
  const a = [...n === "clippingAncestors" ? ge(e) ? [] : Lr(e, this._c) : [].concat(n), o], s = a[0], l = a.reduce((c, u) => {
    const d = kn(e, u, r);
    return c.top = U(d.top, c.top), c.right = ft(d.right, c.right), c.bottom = ft(d.bottom, c.bottom), c.left = U(d.left, c.left), c;
  }, kn(e, s, r));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Fr(t) {
  const {
    width: e,
    height: n
  } = oo(t);
  return {
    width: e,
    height: n
  };
}
function $r(t, e, n) {
  const o = ot(e), r = rt(e), i = n === "fixed", a = wt(t, !0, i, e);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = nt(0);
  function c() {
    l.x = Ge(r);
  }
  if (o || !o && !i)
    if ((Ot(e) !== "body" || Zt(r)) && (s = be(e)), o) {
      const m = wt(e, !0, i, e);
      l.x = m.x + e.clientLeft, l.y = m.y + e.clientTop;
    } else r && c();
  i && !o && r && c();
  const u = r && !o && !i ? io(r, s) : nt(0), d = a.left + s.scrollLeft - l.x - u.x, f = a.top + s.scrollTop - l.y - u.y;
  return {
    x: d,
    y: f,
    width: a.width,
    height: a.height
  };
}
function Ce(t) {
  return Q(t).position === "static";
}
function Ln(t, e) {
  if (!ot(t) || Q(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return rt(t) === n && (n = n.ownerDocument.body), n;
}
function so(t, e) {
  const n = G(t);
  if (ge(t))
    return n;
  if (!ot(t)) {
    let r = ht(t);
    for (; r && !kt(r); ) {
      if (J(r) && !Ce(r))
        return r;
      r = ht(r);
    }
    return n;
  }
  let o = Ln(t, e);
  for (; o && wr(o) && Ce(o); )
    o = Ln(o, e);
  return o && kt(o) && Ce(o) && !je(o) ? n : o || Dr(t) || n;
}
const Or = async function(t) {
  const e = this.getOffsetParent || so, n = this.getDimensions, o = await n(t.floating);
  return {
    reference: $r(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function Rr(t) {
  return Q(t).direction === "rtl";
}
const Ir = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Tr,
  getDocumentElement: rt,
  getClippingRect: Nr,
  getOffsetParent: so,
  getElementRects: Or,
  getClientRects: Sr,
  getDimensions: Fr,
  getScale: At,
  isElement: J,
  isRTL: Rr
};
function lo(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Pr(t, e) {
  let n = null, o;
  const r = rt(t);
  function i() {
    var s;
    clearTimeout(o), (s = n) == null || s.disconnect(), n = null;
  }
  function a(s, l) {
    s === void 0 && (s = !1), l === void 0 && (l = 1), i();
    const c = t.getBoundingClientRect(), {
      left: u,
      top: d,
      width: f,
      height: m
    } = c;
    if (s || e(), !f || !m)
      return;
    const h = ne(d), v = ne(r.clientWidth - (u + f)), b = ne(r.clientHeight - (d + m)), p = ne(u), D = {
      rootMargin: -h + "px " + -v + "px " + -b + "px " + -p + "px",
      threshold: U(0, ft(1, l)) || 1
    };
    let A = !0;
    function T(y) {
      const g = y[0].intersectionRatio;
      if (g !== l) {
        if (!A)
          return a();
        g ? a(!1, g) : o = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      g === 1 && !lo(c, t.getBoundingClientRect()) && a(), A = !1;
    }
    try {
      n = new IntersectionObserver(T, {
        ...D,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(T, D);
    }
    n.observe(t);
  }
  return a(!0), i;
}
function Yr(t, e, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: i = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = o, c = Ue(t), u = r || i ? [...c ? zt(c) : [], ...zt(e)] : [];
  u.forEach((p) => {
    r && p.addEventListener("scroll", n, {
      passive: !0
    }), i && p.addEventListener("resize", n);
  });
  const d = c && s ? Pr(c, n) : null;
  let f = -1, m = null;
  a && (m = new ResizeObserver((p) => {
    let [x] = p;
    x && x.target === c && m && (m.unobserve(e), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var D;
      (D = m) == null || D.observe(e);
    })), n();
  }), c && !l && m.observe(c), m.observe(e));
  let h, v = l ? wt(t) : null;
  l && b();
  function b() {
    const p = wt(t);
    v && !lo(v, p) && n(), v = p, h = requestAnimationFrame(b);
  }
  return n(), () => {
    var p;
    u.forEach((x) => {
      r && x.removeEventListener("scroll", n), i && x.removeEventListener("resize", n);
    }), d?.(), (p = m) == null || p.disconnect(), m = null, l && cancelAnimationFrame(h);
  };
}
const Hr = br, _r = yr, Wr = vr, qr = xr, Br = pr, zr = (t, e, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: Ir,
    ...n
  }, i = {
    ...r.platform,
    _c: o
  };
  return hr(t, e, {
    ...r,
    platform: i
  });
};
function Vr(t) {
  const e = (o) => {
    const r = o.cloneNode(!0);
    r.style.visibility = "hidden", r.style.position = "absolute", r.style.display = "block", document.body.appendChild(r);
    const i = r.getBoundingClientRect().width;
    return document.body.removeChild(r), i;
  }, n = (o, r, i) => {
    Object.assign(o.style, {
      left: r + "px",
      top: i + "px",
      position: "absolute"
    });
  };
  t.magic("anchorplus", (o) => {
    if (!o._x_anchor) throw "Alpine: No x-anchor directive found on element using $anchor...";
    return o._x_anchor;
  }), t.interceptClone((o, r) => {
    o && o._x_anchor && !r._x_anchor && (r._x_anchor = o._x_anchor);
  }), t.directive("anchorplus", t.skipDuringClone(
    (o, { expression: r }, { cleanup: i, evaluate: a }) => {
      o._x_anchor = t.reactive({ x: 0, y: 0 });
      const s = a(r), {
        reference: l,
        placement: c,
        sideOffset: u,
        noStyle: d,
        calculateSize: f = void 0,
        arrowEl: m = void 0
      } = s;
      if (!l) throw "Alpine: no element provided to x-anchor...";
      const h = () => {
        let b;
        const p = m ? u + m.clientHeight : u, x = m ? e(m) : 0, D = [
          Wr(),
          qr({
            padding: u,
            apply: ({ availableHeight: A, elements: T }) => {
              if (!f)
                return;
              const y = u + f.additionalSpace || 0, g = f.varName || "--anchor-height";
              T.floating?.style.setProperty(g, `${Math.max(A, Math.floor(window.innerHeight * 0.3)) - y}px`);
            }
          }),
          _r({ padding: 5 }),
          Hr(p)
        ];
        m && D.push(Br({
          element: m
        })), zr(l, o, {
          placement: c,
          middleware: D
        }).then(({ x: A, y: T, middlewareData: y, placement: g }) => {
          if (d || n(o, A, T), JSON.stringify({ x: A, y: T }) !== b) {
            o._x_anchor.x = A, o._x_anchor.y = T;
            const M = g.split("-")[0], C = g.split("-")[1], k = {
              top: "bottom",
              right: "left",
              bottom: "top",
              left: "right"
            }[M], N = {
              start: -x / 2,
              end: x / 2,
              center: 0
            }[C ?? "center"];
            if (y.arrow) {
              const { x: $, y: R } = y.arrow;
              Object.assign(m.style, {
                left: $ != null ? `${$ + N}px` : "",
                top: R != null ? `${R + N}px` : "",
                // Ensure the static side gets unset when
                // flipping to other placements' axes.
                right: "",
                bottom: "",
                [k]: `${-x / 4}px`
              });
            }
          }
          b = JSON.stringify({ x: A, y: T });
        });
      }, v = Yr(l, o, () => h());
      i(() => v());
    },
    // When cloning (or "morphing"), we will graft the style and position data from the live tree...
    (o, { expression: r }, { evaluate: i }) => {
      const a = i(r), { noStyle: s } = a;
      o._x_anchor && (s || n(o, o._x_anchor.x, o._x_anchor.y));
    }
  ));
}
function Ze(t) {
  return typeof t == "number";
}
function Re(t) {
  return typeof t == "string";
}
function ye(t) {
  return typeof t == "boolean";
}
function Nn(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function _(t) {
  return Math.abs(t);
}
function Xe(t) {
  return Math.sign(t);
}
function qt(t, e) {
  return _(t - e);
}
function jr(t, e) {
  if (t === 0 || e === 0 || _(t) <= _(e)) return 0;
  const n = qt(_(t), _(e));
  return _(n / t);
}
function Kr(t) {
  return Math.round(t * 100) / 100;
}
function Vt(t) {
  return jt(t).map(Number);
}
function X(t) {
  return t[Xt(t)];
}
function Xt(t) {
  return Math.max(0, t.length - 1);
}
function Je(t, e) {
  return e === Xt(t);
}
function Fn(t, e = 0) {
  return Array.from(Array(t), (n, o) => e + o);
}
function jt(t) {
  return Object.keys(t);
}
function co(t, e) {
  return [t, e].reduce((n, o) => (jt(o).forEach((r) => {
    const i = n[r], a = o[r], s = Nn(i) && Nn(a);
    n[r] = s ? co(i, a) : a;
  }), n), {});
}
function Ie(t, e) {
  return typeof e.MouseEvent < "u" && t instanceof e.MouseEvent;
}
function Ur(t, e) {
  const n = {
    start: o,
    center: r,
    end: i
  };
  function o() {
    return 0;
  }
  function r(l) {
    return i(l) / 2;
  }
  function i(l) {
    return e - l;
  }
  function a(l, c) {
    return Re(t) ? n[t](l) : t(e, l, c);
  }
  return {
    measure: a
  };
}
function Kt() {
  let t = [];
  function e(r, i, a, s = {
    passive: !0
  }) {
    let l;
    if ("addEventListener" in r)
      r.addEventListener(i, a, s), l = () => r.removeEventListener(i, a, s);
    else {
      const c = r;
      c.addListener(a), l = () => c.removeListener(a);
    }
    return t.push(l), o;
  }
  function n() {
    t = t.filter((r) => r());
  }
  const o = {
    add: e,
    clear: n
  };
  return o;
}
function Gr(t, e, n, o) {
  const r = Kt(), i = 1e3 / 60;
  let a = null, s = 0, l = 0;
  function c() {
    r.add(t, "visibilitychange", () => {
      t.hidden && h();
    });
  }
  function u() {
    m(), r.clear();
  }
  function d(b) {
    if (!l) return;
    a || (a = b, n(), n());
    const p = b - a;
    for (a = b, s += p; s >= i; )
      n(), s -= i;
    const x = s / i;
    o(x), l && (l = e.requestAnimationFrame(d));
  }
  function f() {
    l || (l = e.requestAnimationFrame(d));
  }
  function m() {
    e.cancelAnimationFrame(l), a = null, s = 0, l = 0;
  }
  function h() {
    a = null, s = 0;
  }
  return {
    init: c,
    destroy: u,
    start: f,
    stop: m,
    update: n,
    render: o
  };
}
function Zr(t, e) {
  const n = e === "rtl", o = t === "y", r = o ? "y" : "x", i = o ? "x" : "y", a = !o && n ? -1 : 1, s = u(), l = d();
  function c(h) {
    const {
      height: v,
      width: b
    } = h;
    return o ? v : b;
  }
  function u() {
    return o ? "top" : n ? "right" : "left";
  }
  function d() {
    return o ? "bottom" : n ? "left" : "right";
  }
  function f(h) {
    return h * a;
  }
  return {
    scroll: r,
    cross: i,
    startEdge: s,
    endEdge: l,
    measureSize: c,
    direction: f
  };
}
function Dt(t = 0, e = 0) {
  const n = _(t - e);
  function o(c) {
    return c < t;
  }
  function r(c) {
    return c > e;
  }
  function i(c) {
    return o(c) || r(c);
  }
  function a(c) {
    return i(c) ? o(c) ? t : e : c;
  }
  function s(c) {
    return n ? c - n * Math.ceil((c - e) / n) : c;
  }
  return {
    length: n,
    max: e,
    min: t,
    constrain: a,
    reachedAny: i,
    reachedMax: r,
    reachedMin: o,
    removeOffset: s
  };
}
function uo(t, e, n) {
  const {
    constrain: o
  } = Dt(0, t), r = t + 1;
  let i = a(e);
  function a(f) {
    return n ? _((r + f) % r) : o(f);
  }
  function s() {
    return i;
  }
  function l(f) {
    return i = a(f), d;
  }
  function c(f) {
    return u().set(s() + f);
  }
  function u() {
    return uo(t, s(), n);
  }
  const d = {
    get: s,
    set: l,
    add: c,
    clone: u
  };
  return d;
}
function Xr(t, e, n, o, r, i, a, s, l, c, u, d, f, m, h, v, b, p, x) {
  const {
    cross: D,
    direction: A
  } = t, T = ["INPUT", "SELECT", "TEXTAREA"], y = {
    passive: !1
  }, g = Kt(), M = Kt(), C = Dt(50, 225).constrain(m.measure(20)), k = {
    mouse: 300,
    touch: 400
  }, N = {
    mouse: 500,
    touch: 600
  }, $ = h ? 43 : 25;
  let R = !1, O = 0, W = 0, B = !1, Y = !1, P = !1, z = !1;
  function vt(L) {
    if (!x) return;
    function I(j) {
      (ye(x) || x(L, j)) && It(j);
    }
    const q = e;
    g.add(q, "dragstart", (j) => j.preventDefault(), y).add(q, "touchmove", () => {
    }, y).add(q, "touchend", () => {
    }).add(q, "touchstart", I).add(q, "mousedown", I).add(q, "touchcancel", V).add(q, "contextmenu", V).add(q, "click", at, !0);
  }
  function tt() {
    g.clear(), M.clear();
  }
  function Tt() {
    const L = z ? n : e;
    M.add(L, "touchmove", K, y).add(L, "touchend", V).add(L, "mousemove", K, y).add(L, "mouseup", V);
  }
  function St(L) {
    const I = L.nodeName || "";
    return T.includes(I);
  }
  function it() {
    return (h ? N : k)[z ? "mouse" : "touch"];
  }
  function Rt(L, I) {
    const q = d.add(Xe(L) * -1), j = u.byDistance(L, !h).distance;
    return h || _(L) < C ? j : b && I ? j * 0.5 : u.byIndex(q.get(), 0).distance;
  }
  function It(L) {
    const I = Ie(L, o);
    z = I, P = h && I && !L.buttons && R, R = qt(r.get(), a.get()) >= 2, !(I && L.button !== 0) && (St(L.target) || (B = !0, i.pointerDown(L), c.useFriction(0).useDuration(0), r.set(a), Tt(), O = i.readPoint(L), W = i.readPoint(L, D), f.emit("pointerDown")));
  }
  function K(L) {
    if (!Ie(L, o) && L.touches.length >= 2) return V(L);
    const q = i.readPoint(L), j = i.readPoint(L, D), et = qt(q, O), st = qt(j, W);
    if (!Y && !z && (!L.cancelable || (Y = et > st, !Y)))
      return V(L);
    const gt = i.pointerMove(L);
    et > v && (P = !0), c.useFriction(0.3).useDuration(0.75), s.start(), r.add(A(gt)), L.preventDefault();
  }
  function V(L) {
    const q = u.byDistance(0, !1).index !== d.get(), j = i.pointerUp(L) * it(), et = Rt(A(j), q), st = jr(j, et), gt = $ - 10 * st, ut = p + st / 50;
    Y = !1, B = !1, M.clear(), c.useDuration(gt).useFriction(ut), l.distance(et, !h), z = !1, f.emit("pointerUp");
  }
  function at(L) {
    P && (L.stopPropagation(), L.preventDefault(), P = !1);
  }
  function Z() {
    return B;
  }
  return {
    init: vt,
    destroy: tt,
    pointerDown: Z
  };
}
function Jr(t, e) {
  let o, r;
  function i(d) {
    return d.timeStamp;
  }
  function a(d, f) {
    const h = `client${(f || t.scroll) === "x" ? "X" : "Y"}`;
    return (Ie(d, e) ? d : d.touches[0])[h];
  }
  function s(d) {
    return o = d, r = d, a(d);
  }
  function l(d) {
    const f = a(d) - a(r), m = i(d) - i(o) > 170;
    return r = d, m && (o = d), f;
  }
  function c(d) {
    if (!o || !r) return 0;
    const f = a(r) - a(o), m = i(d) - i(o), h = i(d) - i(r) > 170, v = f / m;
    return m && !h && _(v) > 0.1 ? v : 0;
  }
  return {
    pointerDown: s,
    pointerMove: l,
    pointerUp: c,
    readPoint: a
  };
}
function Qr() {
  function t(n) {
    const {
      offsetTop: o,
      offsetLeft: r,
      offsetWidth: i,
      offsetHeight: a
    } = n;
    return {
      top: o,
      right: r + i,
      bottom: o + a,
      left: r,
      width: i,
      height: a
    };
  }
  return {
    measure: t
  };
}
function ti(t) {
  function e(o) {
    return t * (o / 100);
  }
  return {
    measure: e
  };
}
function ei(t, e, n, o, r, i, a) {
  const s = [t].concat(o);
  let l, c, u = [], d = !1;
  function f(b) {
    return r.measureSize(a.measure(b));
  }
  function m(b) {
    if (!i) return;
    c = f(t), u = o.map(f);
    function p(x) {
      for (const D of x) {
        if (d) return;
        const A = D.target === t, T = o.indexOf(D.target), y = A ? c : u[T], g = f(A ? t : o[T]);
        if (_(g - y) >= 0.5) {
          b.reInit(), e.emit("resize");
          break;
        }
      }
    }
    l = new ResizeObserver((x) => {
      (ye(i) || i(b, x)) && p(x);
    }), n.requestAnimationFrame(() => {
      s.forEach((x) => l.observe(x));
    });
  }
  function h() {
    d = !0, l && l.disconnect();
  }
  return {
    init: m,
    destroy: h
  };
}
function ni(t, e, n, o, r, i) {
  let a = 0, s = 0, l = r, c = i, u = t.get(), d = 0;
  function f() {
    const y = o.get() - t.get(), g = !l;
    let M = 0;
    return g ? (a = 0, n.set(o), t.set(o), M = y) : (n.set(t), a += y / l, a *= c, u += a, t.add(a), M = u - d), s = Xe(M), d = u, T;
  }
  function m() {
    const y = o.get() - e.get();
    return _(y) < 1e-3;
  }
  function h() {
    return l;
  }
  function v() {
    return s;
  }
  function b() {
    return a;
  }
  function p() {
    return D(r);
  }
  function x() {
    return A(i);
  }
  function D(y) {
    return l = y, T;
  }
  function A(y) {
    return c = y, T;
  }
  const T = {
    direction: v,
    duration: h,
    velocity: b,
    seek: f,
    settled: m,
    useBaseFriction: x,
    useBaseDuration: p,
    useFriction: A,
    useDuration: D
  };
  return T;
}
function oi(t, e, n, o, r) {
  const i = r.measure(10), a = r.measure(50), s = Dt(0.1, 0.99);
  let l = !1;
  function c() {
    return !(l || !t.reachedAny(n.get()) || !t.reachedAny(e.get()));
  }
  function u(m) {
    if (!c()) return;
    const h = t.reachedMin(e.get()) ? "min" : "max", v = _(t[h] - e.get()), b = n.get() - e.get(), p = s.constrain(v / a);
    n.subtract(b * p), !m && _(b) < i && (n.set(t.constrain(n.get())), o.useDuration(25).useBaseFriction());
  }
  function d(m) {
    l = !m;
  }
  return {
    shouldConstrain: c,
    constrain: u,
    toggleActive: d
  };
}
function ri(t, e, n, o, r) {
  const i = Dt(-e + t, 0), a = d(), s = u(), l = f();
  function c(h, v) {
    return qt(h, v) <= 1;
  }
  function u() {
    const h = a[0], v = X(a), b = a.lastIndexOf(h), p = a.indexOf(v) + 1;
    return Dt(b, p);
  }
  function d() {
    return n.map((h, v) => {
      const {
        min: b,
        max: p
      } = i, x = i.constrain(h), D = !v, A = Je(n, v);
      return D ? p : A || c(b, x) ? b : c(p, x) ? p : x;
    }).map((h) => parseFloat(h.toFixed(3)));
  }
  function f() {
    if (e <= t + r) return [i.max];
    if (o === "keepSnaps") return a;
    const {
      min: h,
      max: v
    } = s;
    return a.slice(h, v);
  }
  return {
    snapsContained: l,
    scrollContainLimit: s
  };
}
function ii(t, e, n) {
  const o = e[0], r = n ? o - t : X(e);
  return {
    limit: Dt(r, o)
  };
}
function ai(t, e, n, o) {
  const i = e.min + 0.1, a = e.max + 0.1, {
    reachedMin: s,
    reachedMax: l
  } = Dt(i, a);
  function c(f) {
    return f === 1 ? l(n.get()) : f === -1 ? s(n.get()) : !1;
  }
  function u(f) {
    if (!c(f)) return;
    const m = t * (f * -1);
    o.forEach((h) => h.add(m));
  }
  return {
    loop: u
  };
}
function si(t) {
  const {
    max: e,
    length: n
  } = t;
  function o(i) {
    const a = i - e;
    return n ? a / -n : 0;
  }
  return {
    get: o
  };
}
function li(t, e, n, o, r) {
  const {
    startEdge: i,
    endEdge: a
  } = t, {
    groupSlides: s
  } = r, l = d().map(e.measure), c = f(), u = m();
  function d() {
    return s(o).map((v) => X(v)[a] - v[0][i]).map(_);
  }
  function f() {
    return o.map((v) => n[i] - v[i]).map((v) => -_(v));
  }
  function m() {
    return s(c).map((v) => v[0]).map((v, b) => v + l[b]);
  }
  return {
    snaps: c,
    snapsAligned: u
  };
}
function ci(t, e, n, o, r, i) {
  const {
    groupSlides: a
  } = r, {
    min: s,
    max: l
  } = o, c = u();
  function u() {
    const f = a(i), m = !t || e === "keepSnaps";
    return n.length === 1 ? [i] : m ? f : f.slice(s, l).map((h, v, b) => {
      const p = !v, x = Je(b, v);
      if (p) {
        const D = X(b[0]) + 1;
        return Fn(D);
      }
      if (x) {
        const D = Xt(i) - X(b)[0] + 1;
        return Fn(D, X(b)[0]);
      }
      return h;
    });
  }
  return {
    slideRegistry: c
  };
}
function ui(t, e, n, o, r) {
  const {
    reachedAny: i,
    removeOffset: a,
    constrain: s
  } = o;
  function l(h) {
    return h.concat().sort((v, b) => _(v) - _(b))[0];
  }
  function c(h) {
    const v = t ? a(h) : s(h), b = e.map((x, D) => ({
      diff: u(x - v, 0),
      index: D
    })).sort((x, D) => _(x.diff) - _(D.diff)), {
      index: p
    } = b[0];
    return {
      index: p,
      distance: v
    };
  }
  function u(h, v) {
    const b = [h, h + n, h - n];
    if (!t) return h;
    if (!v) return l(b);
    const p = b.filter((x) => Xe(x) === v);
    return p.length ? l(p) : X(b) - n;
  }
  function d(h, v) {
    const b = e[h] - r.get(), p = u(b, v);
    return {
      index: h,
      distance: p
    };
  }
  function f(h, v) {
    const b = r.get() + h, {
      index: p,
      distance: x
    } = c(b), D = !t && i(b);
    if (!v || D) return {
      index: p,
      distance: h
    };
    const A = e[p] - x, T = h + u(A, 0);
    return {
      index: p,
      distance: T
    };
  }
  return {
    byDistance: f,
    byIndex: d,
    shortcut: u
  };
}
function di(t, e, n, o, r, i, a) {
  function s(d) {
    const f = d.distance, m = d.index !== e.get();
    i.add(f), f && (o.duration() ? t.start() : (t.update(), t.render(1), t.update())), m && (n.set(e.get()), e.set(d.index), a.emit("select"));
  }
  function l(d, f) {
    const m = r.byDistance(d, f);
    s(m);
  }
  function c(d, f) {
    const m = e.clone().set(d), h = r.byIndex(m.get(), f);
    s(h);
  }
  return {
    distance: l,
    index: c
  };
}
function fi(t, e, n, o, r, i, a, s) {
  const l = {
    passive: !0,
    capture: !0
  };
  let c = 0;
  function u(m) {
    if (!s) return;
    function h(v) {
      if ((/* @__PURE__ */ new Date()).getTime() - c > 10) return;
      a.emit("slideFocusStart"), t.scrollLeft = 0;
      const x = n.findIndex((D) => D.includes(v));
      Ze(x) && (r.useDuration(0), o.index(x, 0), a.emit("slideFocus"));
    }
    i.add(document, "keydown", d, !1), e.forEach((v, b) => {
      i.add(v, "focus", (p) => {
        (ye(s) || s(m, p)) && h(b);
      }, l);
    });
  }
  function d(m) {
    m.code === "Tab" && (c = (/* @__PURE__ */ new Date()).getTime());
  }
  return {
    init: u
  };
}
function _t(t) {
  let e = t;
  function n() {
    return e;
  }
  function o(l) {
    e = a(l);
  }
  function r(l) {
    e += a(l);
  }
  function i(l) {
    e -= a(l);
  }
  function a(l) {
    return Ze(l) ? l : l.get();
  }
  return {
    get: n,
    set: o,
    add: r,
    subtract: i
  };
}
function fo(t, e) {
  const n = t.scroll === "x" ? a : s, o = e.style;
  let r = null, i = !1;
  function a(f) {
    return `translate3d(${f}px,0px,0px)`;
  }
  function s(f) {
    return `translate3d(0px,${f}px,0px)`;
  }
  function l(f) {
    if (i) return;
    const m = Kr(t.direction(f));
    m !== r && (o.transform = n(m), r = m);
  }
  function c(f) {
    i = !f;
  }
  function u() {
    i || (o.transform = "", e.getAttribute("style") || e.removeAttribute("style"));
  }
  return {
    clear: u,
    to: l,
    toggleActive: c
  };
}
function mi(t, e, n, o, r, i, a, s, l) {
  const u = Vt(r), d = Vt(r).reverse(), f = p().concat(x());
  function m(g, M) {
    return g.reduce((C, k) => C - r[k], M);
  }
  function h(g, M) {
    return g.reduce((C, k) => m(C, M) > 0 ? C.concat([k]) : C, []);
  }
  function v(g) {
    return i.map((M, C) => ({
      start: M - o[C] + 0.5 + g,
      end: M + e - 0.5 + g
    }));
  }
  function b(g, M, C) {
    const k = v(M);
    return g.map((N) => {
      const $ = C ? 0 : -n, R = C ? n : 0, O = C ? "end" : "start", W = k[N][O];
      return {
        index: N,
        loopPoint: W,
        slideLocation: _t(-1),
        translate: fo(t, l[N]),
        target: () => s.get() > W ? $ : R
      };
    });
  }
  function p() {
    const g = a[0], M = h(d, g);
    return b(M, n, !1);
  }
  function x() {
    const g = e - a[0] - 1, M = h(u, g);
    return b(M, -n, !0);
  }
  function D() {
    return f.every(({
      index: g
    }) => {
      const M = u.filter((C) => C !== g);
      return m(M, e) <= 0.1;
    });
  }
  function A() {
    f.forEach((g) => {
      const {
        target: M,
        translate: C,
        slideLocation: k
      } = g, N = M();
      N !== k.get() && (C.to(N), k.set(N));
    });
  }
  function T() {
    f.forEach((g) => g.translate.clear());
  }
  return {
    canLoop: D,
    clear: T,
    loop: A,
    loopPoints: f
  };
}
function hi(t, e, n) {
  let o, r = !1;
  function i(l) {
    if (!n) return;
    function c(u) {
      for (const d of u)
        if (d.type === "childList") {
          l.reInit(), e.emit("slidesChanged");
          break;
        }
    }
    o = new MutationObserver((u) => {
      r || (ye(n) || n(l, u)) && c(u);
    }), o.observe(t, {
      childList: !0
    });
  }
  function a() {
    o && o.disconnect(), r = !0;
  }
  return {
    init: i,
    destroy: a
  };
}
function pi(t, e, n, o) {
  const r = {};
  let i = null, a = null, s, l = !1;
  function c() {
    s = new IntersectionObserver((h) => {
      l || (h.forEach((v) => {
        const b = e.indexOf(v.target);
        r[b] = v;
      }), i = null, a = null, n.emit("slidesInView"));
    }, {
      root: t.parentElement,
      threshold: o
    }), e.forEach((h) => s.observe(h));
  }
  function u() {
    s && s.disconnect(), l = !0;
  }
  function d(h) {
    return jt(r).reduce((v, b) => {
      const p = parseInt(b), {
        isIntersecting: x
      } = r[p];
      return (h && x || !h && !x) && v.push(p), v;
    }, []);
  }
  function f(h = !0) {
    if (h && i) return i;
    if (!h && a) return a;
    const v = d(h);
    return h && (i = v), h || (a = v), v;
  }
  return {
    init: c,
    destroy: u,
    get: f
  };
}
function vi(t, e, n, o, r, i) {
  const {
    measureSize: a,
    startEdge: s,
    endEdge: l
  } = t, c = n[0] && r, u = h(), d = v(), f = n.map(a), m = b();
  function h() {
    if (!c) return 0;
    const x = n[0];
    return _(e[s] - x[s]);
  }
  function v() {
    if (!c) return 0;
    const x = i.getComputedStyle(X(o));
    return parseFloat(x.getPropertyValue(`margin-${l}`));
  }
  function b() {
    return n.map((x, D, A) => {
      const T = !D, y = Je(A, D);
      return T ? f[D] + u : y ? f[D] + d : A[D + 1][s] - x[s];
    }).map(_);
  }
  return {
    slideSizes: f,
    slideSizesWithGaps: m,
    startGap: u,
    endGap: d
  };
}
function gi(t, e, n, o, r, i, a, s, l) {
  const {
    startEdge: c,
    endEdge: u,
    direction: d
  } = t, f = Ze(n);
  function m(p, x) {
    return Vt(p).filter((D) => D % x === 0).map((D) => p.slice(D, D + x));
  }
  function h(p) {
    return p.length ? Vt(p).reduce((x, D, A) => {
      const T = X(x) || 0, y = T === 0, g = D === Xt(p), M = r[c] - i[T][c], C = r[c] - i[D][u], k = !o && y ? d(a) : 0, N = !o && g ? d(s) : 0, $ = _(C - N - (M + k));
      return A && $ > e + l && x.push(D), g && x.push(p.length), x;
    }, []).map((x, D, A) => {
      const T = Math.max(A[D - 1] || 0);
      return p.slice(T, x);
    }) : [];
  }
  function v(p) {
    return f ? m(p, n) : h(p);
  }
  return {
    groupSlides: v
  };
}
function bi(t, e, n, o, r, i, a) {
  const {
    align: s,
    axis: l,
    direction: c,
    startIndex: u,
    loop: d,
    duration: f,
    dragFree: m,
    dragThreshold: h,
    inViewThreshold: v,
    slidesToScroll: b,
    skipSnaps: p,
    containScroll: x,
    watchResize: D,
    watchSlides: A,
    watchDrag: T,
    watchFocus: y
  } = i, g = 2, M = Qr(), C = M.measure(e), k = n.map(M.measure), N = Zr(l, c), $ = N.measureSize(C), R = ti($), O = Ur(s, $), W = !d && !!x, B = d || !!x, {
    slideSizes: Y,
    slideSizesWithGaps: P,
    startGap: z,
    endGap: vt
  } = vi(N, C, k, n, B, r), tt = gi(N, $, b, d, C, k, z, vt, g), {
    snaps: Tt,
    snapsAligned: St
  } = li(N, O, C, k, tt), it = -X(Tt) + X(P), {
    snapsContained: Rt,
    scrollContainLimit: It
  } = ri($, it, St, x, g), K = W ? Rt : St, {
    limit: V
  } = ii(it, K, d), at = uo(Xt(K), u, d), Z = at.clone(), H = Vt(n), L = ({
    dragHandler: Ct,
    scrollBody: Te,
    scrollBounds: Se,
    options: {
      loop: Qt
    }
  }) => {
    Qt || Se.constrain(Ct.pointerDown()), Te.seek();
  }, I = ({
    scrollBody: Ct,
    translate: Te,
    location: Se,
    offsetLocation: Qt,
    previousLocation: Lo,
    scrollLooper: No,
    slideLooper: Fo,
    dragHandler: $o,
    animation: Oo,
    eventHandler: mn,
    scrollBounds: Ro,
    options: {
      loop: hn
    }
  }, pn) => {
    const vn = Ct.settled(), Io = !Ro.shouldConstrain(), gn = hn ? vn : vn && Io, bn = gn && !$o.pointerDown();
    bn && Oo.stop();
    const Po = Se.get() * pn + Lo.get() * (1 - pn);
    Qt.set(Po), hn && (No.loop(Ct.direction()), Fo.loop()), Te.to(Qt.get()), bn && mn.emit("settle"), gn || mn.emit("scroll");
  }, q = Gr(o, r, () => L(Ee), (Ct) => I(Ee, Ct)), j = 0.68, et = K[at.get()], st = _t(et), gt = _t(et), ut = _t(et), bt = _t(et), Pt = ni(st, ut, gt, bt, f, j), De = ui(d, K, it, V, bt), Me = di(q, at, Z, Pt, De, bt, a), un = si(V), dn = Kt(), Ao = pi(e, n, a, v), {
    slideRegistry: fn
  } = ci(W, x, K, It, tt, H), ko = fi(t, n, fn, Me, Pt, dn, a, y), Ee = {
    ownerDocument: o,
    ownerWindow: r,
    eventHandler: a,
    containerRect: C,
    slideRects: k,
    animation: q,
    axis: N,
    dragHandler: Xr(N, t, o, r, bt, Jr(N, r), st, q, Me, Pt, De, at, a, R, m, h, p, j, T),
    eventStore: dn,
    percentOfView: R,
    index: at,
    indexPrevious: Z,
    limit: V,
    location: st,
    offsetLocation: ut,
    previousLocation: gt,
    options: i,
    resizeHandler: ei(e, a, r, n, N, D, M),
    scrollBody: Pt,
    scrollBounds: oi(V, ut, bt, Pt, R),
    scrollLooper: ai(it, V, ut, [st, ut, gt, bt]),
    scrollProgress: un,
    scrollSnapList: K.map(un.get),
    scrollSnaps: K,
    scrollTarget: De,
    scrollTo: Me,
    slideLooper: mi(N, $, it, Y, P, Tt, K, ut, n),
    slideFocus: ko,
    slidesHandler: hi(e, a, A),
    slidesInView: Ao,
    slideIndexes: H,
    slideRegistry: fn,
    slidesToScroll: tt,
    target: bt,
    translate: fo(N, e)
  };
  return Ee;
}
function yi() {
  let t = {}, e;
  function n(c) {
    e = c;
  }
  function o(c) {
    return t[c] || [];
  }
  function r(c) {
    return o(c).forEach((u) => u(e, c)), l;
  }
  function i(c, u) {
    return t[c] = o(c).concat([u]), l;
  }
  function a(c, u) {
    return t[c] = o(c).filter((d) => d !== u), l;
  }
  function s() {
    t = {};
  }
  const l = {
    init: n,
    emit: r,
    off: a,
    on: i,
    clear: s
  };
  return l;
}
const xi = {
  align: "center",
  axis: "x",
  container: null,
  slides: null,
  containScroll: "trimSnaps",
  direction: "ltr",
  slidesToScroll: 1,
  inViewThreshold: 0,
  breakpoints: {},
  dragFree: !1,
  dragThreshold: 10,
  loop: !1,
  skipSnaps: !1,
  duration: 25,
  startIndex: 0,
  active: !0,
  watchDrag: !0,
  watchResize: !0,
  watchSlides: !0,
  watchFocus: !0
};
function wi(t) {
  function e(i, a) {
    return co(i, a || {});
  }
  function n(i) {
    const a = i.breakpoints || {}, s = jt(a).filter((l) => t.matchMedia(l).matches).map((l) => a[l]).reduce((l, c) => e(l, c), {});
    return e(i, s);
  }
  function o(i) {
    return i.map((a) => jt(a.breakpoints || {})).reduce((a, s) => a.concat(s), []).map(t.matchMedia);
  }
  return {
    mergeOptions: e,
    optionsAtMedia: n,
    optionsMediaQueries: o
  };
}
function Di(t) {
  let e = [];
  function n(i, a) {
    return e = a.filter(({
      options: s
    }) => t.optionsAtMedia(s).active !== !1), e.forEach((s) => s.init(i, t)), a.reduce((s, l) => Object.assign(s, {
      [l.name]: l
    }), {});
  }
  function o() {
    e = e.filter((i) => i.destroy());
  }
  return {
    init: n,
    destroy: o
  };
}
function Qe(t, e, n) {
  const o = t.ownerDocument, r = o.defaultView, i = wi(r), a = Di(i), s = Kt(), l = yi(), {
    mergeOptions: c,
    optionsAtMedia: u,
    optionsMediaQueries: d
  } = i, {
    on: f,
    off: m,
    emit: h
  } = l, v = N;
  let b = !1, p, x = c(xi, Qe.globalOptions), D = c(x), A = [], T, y, g;
  function M() {
    const {
      container: H,
      slides: L
    } = D;
    y = (Re(H) ? t.querySelector(H) : H) || t.children[0];
    const q = Re(L) ? y.querySelectorAll(L) : L;
    g = [].slice.call(q || y.children);
  }
  function C(H) {
    const L = bi(t, y, g, o, r, H, l);
    if (H.loop && !L.slideLooper.canLoop()) {
      const I = Object.assign({}, H, {
        loop: !1
      });
      return C(I);
    }
    return L;
  }
  function k(H, L) {
    b || (x = c(x, H), D = u(x), A = L || A, M(), p = C(D), d([x, ...A.map(({
      options: I
    }) => I)]).forEach((I) => s.add(I, "change", N)), D.active && (p.translate.to(p.location.get()), p.animation.init(), p.slidesInView.init(), p.slideFocus.init(Z), p.eventHandler.init(Z), p.resizeHandler.init(Z), p.slidesHandler.init(Z), p.options.loop && p.slideLooper.loop(), y.offsetParent && g.length && p.dragHandler.init(Z), T = a.init(Z, A)));
  }
  function N(H, L) {
    const I = tt();
    $(), k(c({
      startIndex: I
    }, H), L), l.emit("reInit");
  }
  function $() {
    p.dragHandler.destroy(), p.eventStore.clear(), p.translate.clear(), p.slideLooper.clear(), p.resizeHandler.destroy(), p.slidesHandler.destroy(), p.slidesInView.destroy(), p.animation.destroy(), a.destroy(), s.clear();
  }
  function R() {
    b || (b = !0, s.clear(), $(), l.emit("destroy"), l.clear());
  }
  function O(H, L, I) {
    !D.active || b || (p.scrollBody.useBaseFriction().useDuration(L === !0 ? 0 : D.duration), p.scrollTo.index(H, I || 0));
  }
  function W(H) {
    const L = p.index.add(1).get();
    O(L, H, -1);
  }
  function B(H) {
    const L = p.index.add(-1).get();
    O(L, H, 1);
  }
  function Y() {
    return p.index.add(1).get() !== tt();
  }
  function P() {
    return p.index.add(-1).get() !== tt();
  }
  function z() {
    return p.scrollSnapList;
  }
  function vt() {
    return p.scrollProgress.get(p.offsetLocation.get());
  }
  function tt() {
    return p.index.get();
  }
  function Tt() {
    return p.indexPrevious.get();
  }
  function St() {
    return p.slidesInView.get();
  }
  function it() {
    return p.slidesInView.get(!1);
  }
  function Rt() {
    return T;
  }
  function It() {
    return p;
  }
  function K() {
    return t;
  }
  function V() {
    return y;
  }
  function at() {
    return g;
  }
  const Z = {
    canScrollNext: Y,
    canScrollPrev: P,
    containerNode: V,
    internalEngine: It,
    destroy: R,
    off: m,
    on: f,
    emit: h,
    plugins: Rt,
    previousScrollSnap: Tt,
    reInit: v,
    rootNode: K,
    scrollNext: W,
    scrollPrev: B,
    scrollProgress: vt,
    scrollSnapList: z,
    scrollTo: O,
    selectedScrollSnap: tt,
    slideNodes: at,
    slidesInView: St,
    slidesNotInView: it
  };
  return k(e, n), setTimeout(() => l.emit("init"), 0), Z;
}
Qe.globalOptions = void 0;
function Mi(t) {
  t.magic(
    "emblaApi",
    () => (e, n, o = []) => new Qe(e, n, o)
  );
}
/*! name: vanilla-calendar-pro v3.0.4 | url: https://github.com/uvarov-frontend/vanilla-calendar-pro */
var Ei = Object.defineProperty, Ti = Object.defineProperties, Si = Object.getOwnPropertyDescriptors, $n = Object.getOwnPropertySymbols, Ci = Object.prototype.hasOwnProperty, Ai = Object.prototype.propertyIsEnumerable, Pe = (t, e, n) => e in t ? Ei(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, Lt = (t, e) => {
  for (var n in e || (e = {})) Ci.call(e, n) && Pe(t, n, e[n]);
  if ($n) for (var n of $n(e)) Ai.call(e, n) && Pe(t, n, e[n]);
  return t;
}, ki = (t, e) => Ti(t, Si(e)), E = (t, e, n) => (Pe(t, typeof e != "symbol" ? e + "" : e, n), n);
const pt = { notFoundSelector: (t) => `${t} is not found, check the first argument passed to new Calendar.`, notInit: 'The calendar has not been initialized, please initialize it using the "init()" method first.', notLocale: "You specified an incorrect language label or did not specify the required number of values ​​for «locale.weekdays» or «locale.months».", incorrectTime: "The value of the time property can be: false, 12 or 24.", incorrectMonthsCount: "For the «multiple» calendar type, the «displayMonthsCount» parameter can have a value from 2 to 12, and for all others it cannot be greater than 1." }, S = (t, e, n) => {
  t.context[e] = n;
}, Li = (t) => {
  var e, n, o, r, i;
  if (!t.context.isInit) throw new Error(pt.notInit);
  t.inputMode ? ((e = t.context.mainElement.parentElement) == null || e.removeChild(t.context.mainElement), (o = (n = t.context.inputElement) == null ? void 0 : n.replaceWith) == null || o.call(n, t.context.originalElement), S(t, "inputElement", void 0)) : (i = (r = t.context.mainElement).replaceWith) == null || i.call(r, t.context.originalElement), S(t, "mainElement", t.context.originalElement), t.onDestroy && t.onDestroy(t);
}, Ye = (t) => {
  t.context.isShowInInputMode && t.context.currentType && (t.context.mainElement.dataset.vcCalendarHidden = "", S(t, "isShowInInputMode", !1), t.context.cleanupHandlers[0] && (t.context.cleanupHandlers.forEach((e) => e()), S(t, "cleanupHandlers", [])), t.onHide && t.onHide(t));
};
function tn(t) {
  if (!t || !t.getBoundingClientRect) return { top: 0, bottom: 0, left: 0, right: 0 };
  const e = t.getBoundingClientRect(), n = document.documentElement;
  return { bottom: e.bottom, right: e.right, top: e.top + window.scrollY - n.clientTop, left: e.left + window.scrollX - n.clientLeft };
}
function en() {
  return { vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) };
}
function Ni() {
  return { left: window.scrollX || document.documentElement.scrollLeft || 0, top: window.scrollY || document.documentElement.scrollTop || 0 };
}
function Fi(t) {
  const { top: e, left: n } = Ni(), { top: o, left: r } = tn(t), { vh: i, vw: a } = en(), s = o - e, l = r - n;
  return { top: s, bottom: i - (s + t.clientHeight), left: l, right: a - (l + t.clientWidth) };
}
function mo(t, e, n = 5) {
  const o = { top: !0, bottom: !0, left: !0, right: !0 }, r = [];
  if (!e || !t) return { canShow: o, parentPositions: r };
  const { bottom: i, top: a } = Fi(t), { top: s, left: l } = tn(t), { height: c, width: u } = e.getBoundingClientRect(), { vh: d, vw: f } = en(), m = f / 2, h = d / 2;
  return [{ condition: s < h, position: "top" }, { condition: s > h, position: "bottom" }, { condition: l < m, position: "left" }, { condition: l > m, position: "right" }].forEach(({ condition: v, position: b }) => {
    v && r.push(b);
  }), Object.assign(o, { top: c <= a - n, bottom: c <= i - n, left: u <= l, right: u <= f - l }), { canShow: o, parentPositions: r };
}
const $i = (t, e, n, o) => {
  var r;
  const i = o.querySelector(`[data-vc-date="${e}"]`), a = i?.querySelector("[data-vc-date-btn]");
  if (!i || !a || (n?.modifier && a.classList.add(...n.modifier.trim().split(" ")), !n?.html)) return;
  const s = document.createElement("div");
  s.className = t.styles.datePopup, s.dataset.vcDatePopup = "", s.innerHTML = t.sanitizerHTML(n.html), a.ariaExpanded = "true", a.ariaLabel = `${a.ariaLabel}, ${(r = s?.textContent) == null ? void 0 : r.replace(/^\s+|\s+(?=\s)|\s+$/g, "").replace(/&nbsp;/g, " ")}`, i.appendChild(s), requestAnimationFrame(() => {
    if (!s) return;
    const { canShow: l } = mo(i, s), c = l.bottom ? i.offsetHeight : -s.offsetHeight, u = l.left && !l.right ? i.offsetWidth - s.offsetWidth / 2 : !l.left && l.right ? s.offsetWidth / 2 : 0;
    Object.assign(s.style, { left: `${u}px`, top: `${c}px` });
  });
}, Oi = (t, e) => {
  var n;
  t.popups && ((n = Object.entries(t.popups)) == null || n.forEach(([o, r]) => $i(t, o, r, e)));
}, F = (t) => /* @__PURE__ */ new Date(`${t}T00:00:00`), Mt = (t) => `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`, Et = (t) => t.reduce((e, n) => {
  if (n instanceof Date || typeof n == "number") {
    const o = n instanceof Date ? n : new Date(n);
    e.push(o.toISOString().substring(0, 10));
  } else n.match(/^(\d{4}-\d{2}-\d{2})$/g) ? e.push(n) : n.replace(/(\d{4}-\d{2}-\d{2}).*?(\d{4}-\d{2}-\d{2})/g, (o, r, i) => {
    const a = F(r), s = F(i), l = new Date(a.getTime());
    for (; l <= s; l.setDate(l.getDate() + 1)) e.push(Mt(l));
    return o;
  });
  return e;
}, []), dt = (t, e, n, o = "") => {
  e ? t.setAttribute(n, o) : t.getAttribute(n) === o && t.removeAttribute(n);
}, ho = (t, e, n, o, r, i, a) => {
  var s, l, c, u;
  const d = F(t.context.displayDateMin) > F(i) || F(t.context.displayDateMax) < F(i) || ((s = t.context.disableDates) == null ? void 0 : s.includes(i)) || !t.selectionMonthsMode && a !== "current" || !t.selectionYearsMode && F(i).getFullYear() !== e;
  dt(n, d, "data-vc-date-disabled"), o && dt(o, d, "aria-disabled", "true"), o && dt(o, d, "tabindex", "-1"), dt(n, !t.disableToday && t.context.dateToday === i, "data-vc-date-today"), dt(n, !t.disableToday && t.context.dateToday === i, "aria-current", "date"), dt(n, (l = t.selectedWeekends) == null ? void 0 : l.includes(r), "data-vc-date-weekend");
  const f = (c = t.selectedHolidays) != null && c[0] ? Et(t.selectedHolidays) : [];
  if (dt(n, f.includes(i), "data-vc-date-holiday"), (u = t.context.selectedDates) != null && u.includes(i) ? (n.setAttribute("data-vc-date-selected", ""), o && o.setAttribute("aria-selected", "true"), t.context.selectedDates.length > 1 && t.selectionDatesMode === "multiple-ranged" && (t.context.selectedDates[0] === i && t.context.selectedDates[t.context.selectedDates.length - 1] === i ? n.setAttribute("data-vc-date-selected", "first-and-last") : t.context.selectedDates[0] === i ? n.setAttribute("data-vc-date-selected", "first") : t.context.selectedDates[t.context.selectedDates.length - 1] === i && n.setAttribute("data-vc-date-selected", "last"), t.context.selectedDates[0] !== i && t.context.selectedDates[t.context.selectedDates.length - 1] !== i && n.setAttribute("data-vc-date-selected", "middle"))) : n.hasAttribute("data-vc-date-selected") && (n.removeAttribute("data-vc-date-selected"), o && o.removeAttribute("aria-selected")), !t.context.disableDates.includes(i) && t.enableEdgeDatesOnly && t.context.selectedDates.length > 1 && t.selectionDatesMode === "multiple-ranged") {
    const m = F(t.context.selectedDates[0]), h = F(t.context.selectedDates[t.context.selectedDates.length - 1]), v = F(i);
    dt(n, v > m && v < h, "data-vc-date-selected", "middle");
  }
}, Ri = (t, e, n) => (/* @__PURE__ */ new Date(`${t}T00:00:00.000Z`)).toLocaleString(e, n), po = (t, e) => {
  const n = F(t), o = (n.getDay() - e + 7) % 7;
  n.setDate(n.getDate() + 4 - o);
  const r = new Date(n.getFullYear(), 0, 1), i = Math.ceil(((+n - +r) / 864e5 + 1) / 7);
  return { year: n.getFullYear(), week: i };
}, Ii = (t, e, n) => {
  const o = po(n, t.firstWeekday);
  o && (e.dataset.vcDateWeekNumber = String(o.week));
}, Pi = (t, e, n) => {
  var o, r, i, a, s;
  const l = (o = t.disableWeekdays) == null ? void 0 : o.includes(n), c = t.disableAllDates && !!((r = t.context.enableDates) != null && r[0]);
  !l && !c || (i = t.context.enableDates) != null && i.includes(e) || (a = t.context.disableDates) != null && a.includes(e) || (t.context.disableDates.push(e), (s = t.context.disableDates) == null || s.sort((u, d) => +new Date(u) - +new Date(d)));
}, nn = (t, e, n, o, r, i) => {
  const a = F(r).getDay(), s = typeof t.locale == "string" && t.locale.length ? t.locale : "en", l = document.createElement("div");
  let c;
  l.className = t.styles.date, l.dataset.vcDate = r, l.dataset.vcDateMonth = i, l.dataset.vcDateWeekDay = String(a), (i === "current" || t.displayDatesOutside) && (c = document.createElement("button"), c.className = t.styles.dateBtn, c.type = "button", c.role = "gridcell", c.ariaLabel = Ri(r, s, { dateStyle: "long", timeZone: "UTC" }), c.dataset.vcDateBtn = "", c.innerText = String(o), l.appendChild(c)), t.enableWeekNumbers && Ii(t, l, r), Pi(t, r, a), ho(t, e, l, c, a, r, i), n.appendChild(l), t.onCreateDateEls && t.onCreateDateEls(t, l);
}, Yi = (t, e, n, o, r) => {
  for (let i = 1; i <= n; i++) {
    const a = new Date(o, r, i);
    nn(t, o, e, i, Mt(a), "current");
  }
}, Hi = (t, e, n, o, r, i) => {
  const a = i + n, s = 7 * Math.ceil(a / 7) - a, l = r + 1 === 12 ? o + 1 : o, c = r + 1 === 12 ? "01" : r + 2 < 10 ? `0${r + 2}` : r + 2;
  for (let u = 1; u <= s; u++) {
    const d = u < 10 ? `0${u}` : String(u);
    nn(t, o, e, u, `${l}-${c}-${d}`, "next");
  }
}, _i = (t, e, n, o, r) => {
  let i = new Date(n, o, 0).getDate() - (r - 1);
  const a = o === 0 ? n - 1 : n, s = o === 0 ? 12 : o < 10 ? `0${o}` : o;
  for (let l = r; l > 0; l--, i++)
    nn(t, n, e, i, `${a}-${s}-${i}`, "prev");
}, Wi = (t, e, n, o, r) => {
  if (!t.enableWeekNumbers) return;
  o.textContent = "";
  const i = document.createElement("b");
  i.className = t.styles.weekNumbersTitle, i.innerText = "#", i.dataset.vcWeekNumbers = "title", o.appendChild(i);
  const a = document.createElement("div");
  a.className = t.styles.weekNumbersContent, a.dataset.vcWeekNumbers = "content", o.appendChild(a);
  const s = document.createElement("button");
  s.type = "button", s.className = t.styles.weekNumber;
  const l = r.querySelectorAll("[data-vc-date]"), c = Math.ceil((e + n) / 7);
  for (let u = 0; u < c; u++) {
    const d = l[u === 0 ? 6 : 7 * u].dataset.vcDate, f = po(d, t.firstWeekday);
    if (!f) return;
    const m = s.cloneNode(!0);
    m.innerText = String(f.week), m.dataset.vcWeekNumber = String(f.week), m.dataset.vcWeekYear = String(f.year), m.role = "rowheader", m.ariaLabel = `${f.week}`, a.appendChild(m);
  }
}, He = (t) => {
  const e = new Date(t.context.selectedYear, t.context.selectedMonth, 1), n = t.context.mainElement.querySelectorAll('[data-vc="dates"]'), o = t.context.mainElement.querySelectorAll('[data-vc-week="numbers"]');
  n.forEach((r, i) => {
    t.selectionDatesMode || (r.dataset.vcDatesDisabled = ""), r.textContent = "";
    const a = new Date(e);
    a.setMonth(a.getMonth() + i);
    const s = a.getMonth(), l = a.getFullYear(), c = (new Date(l, s, 1).getDay() - t.firstWeekday + 7) % 7, u = new Date(l, s + 1, 0).getDate();
    _i(t, r, l, s, c), Yi(t, r, u, l, s), Hi(t, r, u, l, s, c), Oi(t, r), Wi(t, c, u, o[i], r);
  });
}, qi = (t) => `
  <div class="${t.styles.header}" data-vc="header" role="toolbar" aria-label="${t.labels.navigation}">
    <#ArrowPrev [month] />
    <div class="${t.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [month] />
  </div>
  <div class="${t.styles.wrapper}" data-vc="wrapper">
    <#WeekNumbers />
    <div class="${t.styles.content}" data-vc="content">
      <#Week />
      <#Dates />
      <#DateRangeTooltip />
    </div>
  </div>
  <#ControlTime />
`, Bi = (t) => `
  <div class="${t.styles.header}" data-vc="header" role="toolbar" aria-label="${t.labels.navigation}">
    <div class="${t.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
  </div>
  <div class="${t.styles.wrapper}" data-vc="wrapper">
    <div class="${t.styles.content}" data-vc="content">
      <#Months />
    </div>
  </div>
`, zi = (t) => `
  <div class="${t.styles.controls}" data-vc="controls" role="toolbar" aria-label="${t.labels.navigation}">
    <#ArrowPrev [month] />
    <#ArrowNext [month] />
  </div>
  <div class="${t.styles.grid}" data-vc="grid">
    <#Multiple>
      <div class="${t.styles.column}" data-vc="column" role="region">
        <div class="${t.styles.header}" data-vc="header">
          <div class="${t.styles.headerContent}" data-vc-header="content">
            <#Month />
            <#Year />
          </div>
        </div>
        <div class="${t.styles.wrapper}" data-vc="wrapper">
          <#WeekNumbers />
          <div class="${t.styles.content}" data-vc="content">
            <#Week />
            <#Dates />
          </div>
        </div>
      </div>
    <#/Multiple>
    <#DateRangeTooltip />
  </div>
  <#ControlTime />
`, Vi = (t) => `
  <div class="${t.styles.header}" data-vc="header" role="toolbar" aria-label="${t.labels.navigation}">
    <#ArrowPrev [year] />
    <div class="${t.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [year] />
  </div>
  <div class="${t.styles.wrapper}" data-vc="wrapper">
    <div class="${t.styles.content}" data-vc="content">
      <#Years />
    </div>
  </div>
`, ji = (t, e) => `<button type="button" class="${t.styles.arrowNext}" data-vc-arrow="next" aria-label="${t.labels.arrowNext[e]}"></button>`, Ki = (t, e) => `<button type="button" class="${t.styles.arrowPrev}" data-vc-arrow="prev" aria-label="${t.labels.arrowPrev[e]}"></button>`, Ui = (t) => t.selectionTimeMode ? `<div class="${t.styles.time}" data-vc="time" role="group" aria-label="${t.labels.selectingTime}"></div>` : "", Gi = (t) => t.onCreateDateRangeTooltip ? `<div class="${t.styles.dateRangeTooltip}" data-vc-date-range-tooltip="hidden"></div>` : "", Zi = (t) => `<div class="${t.styles.dates}" data-vc="dates" role="grid" aria-live="assertive" aria-label="${t.labels.dates}" ${t.type === "multiple" ? "aria-multiselectable" : ""}></div>`, Xi = (t) => `<button type="button" class="${t.styles.month}" data-vc="month"></button>`, Ji = (t) => `<div class="${t.styles.months}" data-vc="months" role="grid" aria-live="assertive" aria-label="${t.labels.months}"></div>`, Qi = (t) => `<div class="${t.styles.week}" data-vc="week" role="row" aria-label="${t.labels.week}"></div>`, ta = (t) => t.enableWeekNumbers ? `<div class="${t.styles.weekNumbers}" data-vc-week="numbers" role="row" aria-label="${t.labels.weekNumber}"></div>` : "", ea = (t) => `<button type="button" class="${t.styles.year}" data-vc="year"></button>`, na = (t) => `<div class="${t.styles.years}" data-vc="years" role="grid" aria-live="assertive" aria-label="${t.labels.years}"></div>`, oa = { ArrowNext: ji, ArrowPrev: Ki, ControlTime: Ui, Dates: Zi, DateRangeTooltip: Gi, Month: Xi, Months: Ji, Week: Qi, WeekNumbers: ta, Year: ea, Years: na }, ra = (t) => oa[t], Ae = (t, e) => e.replace(/[\n\t]/g, "").replace(/<#(?!\/?Multiple)(.*?)>/g, (n, o) => {
  const r = (o.match(/\[(.*?)\]/) || [])[1], i = o.replace(/[/\s\n\t]|\[(.*?)\]/g, ""), a = ra(i), s = a ? a(t, r ?? null) : "";
  return t.sanitizerHTML(s);
}).replace(/[\n\t]/g, ""), ia = (t, e) => e.replace(new RegExp("<#Multiple>(.*?)<#\\/Multiple>", "gs"), (n, o) => {
  const r = Array(t.context.displayMonthsCount).fill(o).join("");
  return t.sanitizerHTML(r);
}).replace(/[\n\t]/g, ""), on = (t, e) => {
  const n = { default: qi, month: Bi, year: Vi, multiple: zi };
  if (Object.keys(n).forEach((o) => {
    const r = o;
    t.layouts[r].length || (t.layouts[r] = n[r](t));
  }), t.context.mainElement.className = t.styles.calendar, t.context.mainElement.dataset.vc = "calendar", t.context.mainElement.dataset.vcType = t.context.currentType, t.context.mainElement.role = "application", t.context.mainElement.tabIndex = 0, t.context.mainElement.ariaLabel = t.labels.application, t.context.currentType !== "multiple") {
    if (t.type === "multiple" && e) {
      const o = t.context.mainElement.querySelector('[data-vc="controls"]'), r = t.context.mainElement.querySelector('[data-vc="grid"]'), i = e.closest('[data-vc="column"]');
      return o && t.context.mainElement.removeChild(o), r && (r.dataset.vcGrid = "hidden"), i && (i.dataset.vcColumn = t.context.currentType), void (i && (i.innerHTML = t.sanitizerHTML(Ae(t, t.layouts[t.context.currentType]))));
    }
    t.context.mainElement.innerHTML = t.sanitizerHTML(Ae(t, t.layouts[t.context.currentType]));
  } else t.context.mainElement.innerHTML = t.sanitizerHTML(ia(t, Ae(t, t.layouts[t.context.currentType])));
}, vo = (t, e, n, o) => {
  t.style.visibility = n ? "hidden" : "", e.style.visibility = o ? "hidden" : "";
}, aa = (t, e, n) => {
  const o = F(Mt(new Date(t.context.selectedYear, t.context.selectedMonth, 1))), r = new Date(o.getTime()), i = new Date(o.getTime());
  r.setMonth(r.getMonth() - t.monthsToSwitch), i.setMonth(i.getMonth() + t.monthsToSwitch);
  const a = F(t.context.dateMin), s = F(t.context.dateMax);
  t.selectionYearsMode || (a.setFullYear(o.getFullYear()), s.setFullYear(o.getFullYear()));
  const l = !t.selectionMonthsMode || r.getFullYear() < a.getFullYear() || r.getFullYear() === a.getFullYear() && r.getMonth() < a.getMonth(), c = !t.selectionMonthsMode || i.getFullYear() > s.getFullYear() || i.getFullYear() === s.getFullYear() && i.getMonth() > s.getMonth() - (t.context.displayMonthsCount - 1);
  vo(e, n, l, c);
}, sa = (t, e, n) => {
  const o = F(t.context.dateMin), r = F(t.context.dateMax), i = !!(o.getFullYear() && t.context.displayYear - 7 <= o.getFullYear()), a = !!(r.getFullYear() && t.context.displayYear + 7 >= r.getFullYear());
  vo(e, n, i, a);
}, xe = (t) => {
  if (t.context.currentType === "month") return;
  const e = t.context.mainElement.querySelector('[data-vc-arrow="prev"]'), n = t.context.mainElement.querySelector('[data-vc-arrow="next"]');
  !e || !n || { default: () => aa(t, e, n), year: () => sa(t, e, n) }[t.context.currentType === "multiple" ? "default" : t.context.currentType]();
}, la = (t, e, n, o, r) => {
  const i = new Date(o.setFullYear(t.context.selectedYear, t.context.selectedMonth + n)).getFullYear(), a = new Date(o.setMonth(t.context.selectedMonth + n)).getMonth(), s = t.context.locale.months.long[a], l = e.closest('[data-vc="column"]');
  l && (l.ariaLabel = `${s} ${i}`);
  const c = { month: { id: a, label: s }, year: { id: i, label: i } };
  e.innerText = String(c[r].label), e.dataset[`vc${r.charAt(0).toUpperCase() + r.slice(1)}`] = String(c[r].id), e.ariaLabel = `${t.labels[r]} ${c[r].label}`;
  const u = { month: t.selectionMonthsMode, year: t.selectionYearsMode }, d = u[r] === !1 || u[r] === "only-arrows";
  d && (e.tabIndex = -1), e.disabled = d;
}, Jt = (t) => {
  const e = t.context.mainElement.querySelectorAll('[data-vc="month"]'), n = t.context.mainElement.querySelectorAll('[data-vc="year"]'), o = new Date(t.context.selectedYear, t.context.selectedMonth, 1);
  [e, n].forEach((r) => r?.forEach((i, a) => la(t, i, a, o, i.dataset.vc)));
}, rn = (t, e, n, o, r) => {
  var i;
  const a = { month: "[data-vc-months-month]", year: "[data-vc-years-year]" }, s = { month: { selected: "data-vc-months-month-selected", aria: "aria-selected", value: "vcMonthsMonth", selectedProperty: "selectedMonth" }, year: { selected: "data-vc-years-year-selected", aria: "aria-selected", value: "vcYearsYear", selectedProperty: "selectedYear" } };
  r && ((i = t.context.mainElement.querySelectorAll(a[n])) == null || i.forEach((l) => {
    l.removeAttribute(s[n].selected), l.removeAttribute(s[n].aria);
  }), S(t, s[n].selectedProperty, Number(e.dataset[s[n].value])), Jt(t), n === "year" && xe(t)), o && (e.setAttribute(s[n].selected, ""), e.setAttribute(s[n].aria, "true"));
}, an = (t, e) => {
  var n;
  if (t.type !== "multiple") return { currentValue: null, columnID: 0 };
  const o = t.context.mainElement.querySelectorAll('[data-vc="column"]'), r = Array.from(o).findIndex((i) => i.closest(`[data-vc-column="${e}"]`));
  return { currentValue: r >= 0 ? Number((n = o[r].querySelector(`[data-vc="${e}"]`)) == null ? void 0 : n.getAttribute(`data-vc-${e}`)) : null, columnID: Math.max(r, 0) };
}, ca = (t, e, n, o, r, i, a) => {
  const s = e.cloneNode(!1);
  return s.className = t.styles.monthsMonth, s.innerText = o, s.ariaLabel = r, s.role = "gridcell", s.dataset.vcMonthsMonth = `${a}`, i && (s.ariaDisabled = "true"), i && (s.tabIndex = -1), s.disabled = i, rn(t, s, "month", n === a, !1), s;
}, go = (t, e) => {
  var n, o;
  const r = (n = e?.closest('[data-vc="header"]')) == null ? void 0 : n.querySelector('[data-vc="year"]'), i = r ? Number(r.dataset.vcYear) : t.context.selectedYear, a = e?.dataset.vcMonth ? Number(e.dataset.vcMonth) : t.context.selectedMonth;
  S(t, "currentType", "month"), on(t, e), Jt(t);
  const s = t.context.mainElement.querySelector('[data-vc="months"]');
  if (!t.selectionMonthsMode || !s) return;
  const l = t.monthsToSwitch > 1 ? t.context.locale.months.long.map((u, d) => a - t.monthsToSwitch * d).concat(t.context.locale.months.long.map((u, d) => a + t.monthsToSwitch * d)).filter((u) => u >= 0 && u <= 12) : Array.from(Array(12).keys()), c = document.createElement("button");
  c.type = "button";
  for (let u = 0; u < 12; u++) {
    const d = F(t.context.dateMin), f = F(t.context.dateMax), m = t.context.displayMonthsCount - 1, { columnID: h } = an(t, "month"), v = i <= d.getFullYear() && u < d.getMonth() + h || i >= f.getFullYear() && u > f.getMonth() - m + h || i > f.getFullYear() || u !== a && !l.includes(u), b = ca(t, c, a, t.context.locale.months.short[u], t.context.locale.months.long[u], v, u);
    s.appendChild(b), t.onCreateMonthEls && t.onCreateMonthEls(t, b);
  }
  (o = t.context.mainElement.querySelector("[data-vc-months-month]:not([disabled])")) == null || o.focus();
}, On = (t, e, n, o, r) => `
  <label class="${e}" data-vc-time-input="${t}">
    <input type="text" name="${t}" maxlength="2" aria-label="${n[`input${t.charAt(0).toUpperCase() + t.slice(1)}`]}" value="${o}" ${r ? "disabled" : ""}>
  </label>
`, Rn = (t, e, n, o, r, i, a) => `
  <label class="${e}" data-vc-time-range="${t}">
    <input type="range" name="${t}" min="${o}" max="${r}" step="${i}" aria-label="${n[`range${t.charAt(0).toUpperCase() + t.slice(1)}`]}" value="${a}">
  </label>
`, Bt = (t, e, n, o) => {
  ({ hour: () => S(t, "selectedHours", n), minute: () => S(t, "selectedMinutes", n) })[o](), S(t, "selectedTime", `${t.context.selectedHours}:${t.context.selectedMinutes}${t.context.selectedKeeping ? ` ${t.context.selectedKeeping}` : ""}`), t.onChangeTime && t.onChangeTime(t, e, !1), t.inputMode && t.context.inputElement && t.context.mainElement && t.onChangeToInput && t.onChangeToInput(t, e);
}, fe = (t, e) => {
  var n;
  return ((n = { 0: { AM: "00", PM: "12" }, 1: { AM: "01", PM: "13" }, 2: { AM: "02", PM: "14" }, 3: { AM: "03", PM: "15" }, 4: { AM: "04", PM: "16" }, 5: { AM: "05", PM: "17" }, 6: { AM: "06", PM: "18" }, 7: { AM: "07", PM: "19" }, 8: { AM: "08", PM: "20" }, 9: { AM: "09", PM: "21" }, 10: { AM: "10", PM: "22" }, 11: { AM: "11", PM: "23" }, 12: { AM: "00", PM: "12" } }[Number(t)]) == null ? void 0 : n[e]) || String(t);
}, ua = (t, e, n, o, r) => {
  const i = (a) => {
    const s = t.context.selectedKeeping === "AM" ? "PM" : "AM", l = fe(t.context.selectedHours, s);
    Number(l) <= o && Number(l) >= r ? (S(t, "selectedKeeping", s), n.value = l, Bt(t, a, t.context.selectedHours, "hour"), e.ariaLabel = `${t.labels.btnKeeping} ${t.context.selectedKeeping}`, e.innerText = t.context.selectedKeeping) : t.onChangeTime && t.onChangeTime(t, a, !0);
  };
  return e.addEventListener("click", i), () => {
    e.removeEventListener("click", i);
  };
}, Ut = (t) => ({ 0: "12", 13: "01", 14: "02", 15: "03", 16: "04", 17: "05", 18: "06", 19: "07", 20: "08", 21: "09", 22: "10", 23: "11" })[Number(t)] || String(t), oe = (t, e, n, o) => {
  t.value = n, e.value = o;
}, da = (t, e, n) => {
  e && n && (S(t, "selectedKeeping", n), e.innerText = n);
}, In = (t, e, n, o, r, i, a) => {
  const s = { hour: (c, u, d) => {
    t.selectionTimeMode && { 12: () => {
      if (!t.context.selectedKeeping) return;
      const f = Number(fe(u, t.context.selectedKeeping));
      if (!(f <= i && f >= a)) return oe(n, e, t.context.selectedHours, t.context.selectedHours), void (t.onChangeTime && t.onChangeTime(t, d, !0));
      oe(n, e, Ut(u), fe(u, t.context.selectedKeeping)), c > 12 && da(t, o, "PM"), Bt(t, d, Ut(u), r);
    }, 24: () => {
      if (!(c <= i && c >= a)) return oe(n, e, t.context.selectedHours, t.context.selectedHours), void (t.onChangeTime && t.onChangeTime(t, d, !0));
      oe(n, e, u, u), Bt(t, d, u, r);
    } }[t.selectionTimeMode]();
  }, minute: (c, u, d) => {
    if (!(c <= i && c >= a)) return n.value = t.context.selectedMinutes, void (t.onChangeTime && t.onChangeTime(t, d, !0));
    n.value = u, e.value = u, Bt(t, d, u, r);
  } }, l = (c) => {
    const u = Number(n.value), d = n.value.padStart(2, "0");
    s[r] && s[r](u, d, c);
  };
  return n.addEventListener("change", l), () => {
    n.removeEventListener("change", l);
  };
}, fa = (t, e, n, o, r) => {
  e.value = r, Bt(t, n, r, o);
}, ma = (t, e, n) => {
  e && (S(t, "selectedKeeping", n), e.innerText = n);
}, Pn = (t, e, n, o, r) => {
  const i = (a) => {
    const s = Number(e.value), l = e.value.padStart(2, "0"), c = r === "hour", u = t.selectionTimeMode === 24, d = s > 0 && s < 12;
    c && !u && ma(t, o, s === 0 || d ? "AM" : "PM"), fa(t, n, a, r, !c || u || d ? l : Ut(e.value));
  };
  return e.addEventListener("input", i), () => {
    e.removeEventListener("input", i);
  };
}, Yn = (t) => t.setAttribute("data-vc-input-focus", ""), Hn = (t) => t.removeAttribute("data-vc-input-focus"), ha = (t, e) => {
  const n = e.querySelector('[data-vc-time-range="hour"] input[name="hour"]'), o = e.querySelector('[data-vc-time-range="minute"] input[name="minute"]'), r = e.querySelector('[data-vc-time-input="hour"] input[name="hour"]'), i = e.querySelector('[data-vc-time-input="minute"] input[name="minute"]'), a = e.querySelector('[data-vc-time="keeping"]');
  if (!(n && o && r && i)) return;
  const s = (c) => {
    c.target === n && Yn(r), c.target === o && Yn(i);
  }, l = (c) => {
    c.target === n && Hn(r), c.target === o && Hn(i);
  };
  return e.addEventListener("mouseover", s), e.addEventListener("mouseout", l), In(t, n, r, a, "hour", t.timeMaxHour, t.timeMinHour), In(t, o, i, a, "minute", t.timeMaxMinute, t.timeMinMinute), Pn(t, n, r, a, "hour"), Pn(t, o, i, a, "minute"), a && ua(t, a, n, t.timeMaxHour, t.timeMinHour), () => {
    e.removeEventListener("mouseover", s), e.removeEventListener("mouseout", l);
  };
}, pa = (t) => {
  const e = t.context.mainElement.querySelector('[data-vc="time"]');
  if (!t.selectionTimeMode || !e) return;
  const [n, o] = [t.timeMinHour, t.timeMaxHour], [r, i] = [t.timeMinMinute, t.timeMaxMinute], a = t.context.selectedKeeping ? fe(t.context.selectedHours, t.context.selectedKeeping) : t.context.selectedHours, s = t.timeControls === "range";
  var l;
  e.innerHTML = t.sanitizerHTML(`
    <div class="${t.styles.timeContent}" data-vc-time="content">
      ${On("hour", t.styles.timeHour, t.labels, t.context.selectedHours, s)}
      ${On("minute", t.styles.timeMinute, t.labels, t.context.selectedMinutes, s)}
      ${t.selectionTimeMode === 12 ? (l = t.context.selectedKeeping, `<button type="button" class="${t.styles.timeKeeping}" aria-label="${t.labels.btnKeeping} ${l}" data-vc-time="keeping" ${s ? "disabled" : ""}>${l}</button>`) : ""}
    </div>
    <div class="${t.styles.timeRanges}" data-vc-time="ranges">
      ${Rn("hour", t.styles.timeRange, t.labels, n, o, t.timeStepHour, a)}
      ${Rn("minute", t.styles.timeRange, t.labels, r, i, t.timeStepMinute, t.context.selectedMinutes)}
    </div>
  `), ha(t, e);
}, _n = (t) => {
  const e = t.selectedWeekends ? [...t.selectedWeekends] : [], n = [...t.context.locale.weekdays.long].reduce((r, i, a) => [...r, { id: a, titleShort: t.context.locale.weekdays.short[a], titleLong: i, isWeekend: e.includes(a) }], []), o = [...n.slice(t.firstWeekday), ...n.slice(0, t.firstWeekday)];
  t.context.mainElement.querySelectorAll('[data-vc="week"]').forEach((r) => {
    const i = t.onClickWeekDay ? document.createElement("button") : document.createElement("b");
    t.onClickWeekDay && (i.type = "button"), o.forEach((a) => {
      const s = i.cloneNode(!0);
      s.innerText = a.titleShort, s.className = t.styles.weekDay, s.role = "columnheader", s.ariaLabel = a.titleLong, s.dataset.vcWeekDay = String(a.id), a.isWeekend && (s.dataset.vcWeekDayOff = ""), r.appendChild(s);
    });
  });
}, va = (t, e, n, o, r) => {
  const i = e.cloneNode(!1);
  return i.className = t.styles.yearsYear, i.innerText = String(r), i.ariaLabel = String(r), i.role = "gridcell", i.dataset.vcYearsYear = `${r}`, o && (i.ariaDisabled = "true"), o && (i.tabIndex = -1), i.disabled = o, rn(t, i, "year", n === r, !1), i;
}, sn = (t, e) => {
  var n;
  const o = e?.dataset.vcYear ? Number(e.dataset.vcYear) : t.context.selectedYear;
  S(t, "currentType", "year"), on(t, e), Jt(t), xe(t);
  const r = t.context.mainElement.querySelector('[data-vc="years"]');
  if (!t.selectionYearsMode || !r) return;
  const i = t.type !== "multiple" || t.context.selectedYear === o ? 0 : 1, a = document.createElement("button");
  a.type = "button";
  for (let s = t.context.displayYear - 7; s < t.context.displayYear + 8; s++) {
    const l = s < F(t.context.dateMin).getFullYear() + i || s > F(t.context.dateMax).getFullYear(), c = va(t, a, o, l, s);
    r.appendChild(c), t.onCreateYearEls && t.onCreateYearEls(t, c);
  }
  (n = t.context.mainElement.querySelector("[data-vc-years-year]:not([disabled])")) == null || n.focus();
}, ga = (t, e, n) => {
  new MutationObserver((o) => {
    for (let r = 0; r < o.length; r++)
      if (o[r].attributeName === e) {
        n();
        break;
      }
  }).observe(t, { attributes: !0 });
}, me = { value: !1, set: () => me.value = !0, check: () => me.value }, Nt = (t, e) => t.dataset.vcTheme = e, Wn = (t, e) => {
  if (Nt(t.context.mainElement, e.matches ? "dark" : "light"), t.selectedTheme !== "system" || me.check()) return;
  const n = (o) => {
    const r = document.querySelectorAll('[data-vc="calendar"]');
    r?.forEach((i) => Nt(i, o.matches ? "dark" : "light"));
  };
  e.addEventListener ? e.addEventListener("change", n) : e.addListener(n), me.set();
}, ba = (t, e) => {
  const n = t.themeAttrDetect.length ? document.querySelector(t.themeAttrDetect) : null, o = t.themeAttrDetect.replace(/^.*\[(.+)\]/g, (i, a) => a);
  if (!n || n.getAttribute(o) === "system") return void Wn(t, e);
  const r = n.getAttribute(o);
  r ? (Nt(t.context.mainElement, r), ga(n, o, () => {
    const i = n.getAttribute(o);
    i && Nt(t.context.mainElement, i);
  })) : Wn(t, e);
}, ya = (t) => {
  window.matchMedia("(prefers-color-scheme)").media !== "not all" ? t.selectedTheme === "system" ? ba(t, window.matchMedia("(prefers-color-scheme: dark)")) : Nt(t.context.mainElement, t.selectedTheme) : Nt(t.context.mainElement, "light");
}, he = (t) => t.charAt(0).toUpperCase() + t.slice(1).replace(/\./, ""), xa = (t, e, n) => {
  const o = /* @__PURE__ */ new Date(`1978-01-0${e + 1}T00:00:00.000Z`), r = o.toLocaleString(n, { weekday: "short", timeZone: "UTC" }), i = o.toLocaleString(n, { weekday: "long", timeZone: "UTC" });
  t.context.locale.weekdays.short.push(he(r)), t.context.locale.weekdays.long.push(he(i));
}, wa = (t, e, n) => {
  const o = /* @__PURE__ */ new Date(`1978-${String(e + 1).padStart(2, "0")}-01T00:00:00.000Z`), r = o.toLocaleString(n, { month: "short", timeZone: "UTC" }), i = o.toLocaleString(n, { month: "long", timeZone: "UTC" });
  t.context.locale.months.short.push(he(r)), t.context.locale.months.long.push(he(i));
}, Da = (t) => {
  var e, n, o, r, i, a, s, l;
  if (!(t.context.locale.weekdays.short[6] && t.context.locale.weekdays.long[6] && t.context.locale.months.short[11] && t.context.locale.months.long[11])) if (typeof t.locale == "string") {
    if (typeof t.locale == "string" && !t.locale.length) throw new Error(pt.notLocale);
    Array.from({ length: 7 }, (c, u) => xa(t, u, t.locale)), Array.from({ length: 12 }, (c, u) => wa(t, u, t.locale));
  } else {
    if (!((n = (e = t.locale) == null ? void 0 : e.weekdays) != null && n.short[6] && ((r = (o = t.locale) == null ? void 0 : o.weekdays) != null && r.long[6]) && ((a = (i = t.locale) == null ? void 0 : i.months) != null && a.short[11]) && ((l = (s = t.locale) == null ? void 0 : s.months) != null && l.long[11]))) throw new Error(pt.notLocale);
    S(t, "locale", Lt({}, t.locale));
  }
}, we = (t) => {
  const e = { default: () => {
    _n(t), He(t);
  }, multiple: () => {
    _n(t), He(t);
  }, month: () => go(t), year: () => sn(t) };
  ya(t), Da(t), on(t), Jt(t), xe(t), pa(t), e[t.context.currentType]();
}, bo = (t) => {
  const e = (n) => {
    var o;
    const r = n.target;
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(n.key) || r.localName !== "button") return;
    const i = Array.from(t.context.mainElement.querySelectorAll('[data-vc="calendar"] button')), a = i.indexOf(r);
    if (a === -1) return;
    const s = (l = i[a]).hasAttribute("data-vc-date-btn") ? 7 : l.hasAttribute("data-vc-months-month") ? 4 : l.hasAttribute("data-vc-years-year") ? 5 : 1;
    var l;
    const c = (0, { ArrowUp: () => Math.max(0, a - s), ArrowDown: () => Math.min(i.length - 1, a + s), ArrowLeft: () => Math.max(0, a - 1), ArrowRight: () => Math.min(i.length - 1, a + 1) }[n.key])();
    (o = i[c]) == null || o.focus();
  };
  return t.context.mainElement.addEventListener("keydown", e), () => t.context.mainElement.removeEventListener("keydown", e);
}, _e = (t, e) => {
  const n = F(Mt(new Date(t.context.selectedYear, t.context.selectedMonth, 1)));
  ({ prev: () => n.setMonth(n.getMonth() - t.monthsToSwitch), next: () => n.setMonth(n.getMonth() + t.monthsToSwitch) })[e](), S(t, "selectedMonth", n.getMonth()), S(t, "selectedYear", n.getFullYear()), Jt(t), xe(t), He(t);
}, Ma = (t, e) => {
  const n = e.target.closest("[data-vc-arrow]");
  if (n) {
    if (["default", "multiple"].includes(t.context.currentType)) _e(t, n.dataset.vcArrow);
    else if (t.context.currentType === "year" && t.context.displayYear !== void 0) {
      const o = { prev: -15, next: 15 }[n.dataset.vcArrow];
      S(t, "displayYear", t.context.displayYear + o), sn(t, e.target);
    }
    t.onClickArrow && t.onClickArrow(t, e);
  }
}, We = (t) => t.enableDateToggle === void 0 || (typeof t.enableDateToggle == "function" ? t.enableDateToggle(t) : t.enableDateToggle), qn = (t, e, n) => {
  const o = e.dataset.vcDate, r = e.closest("[data-vc-date][data-vc-date-selected]"), i = We(t);
  if (r && !i) return;
  const a = r ? t.context.selectedDates.filter((s) => s !== o) : n ? [...t.context.selectedDates, o] : [o];
  S(t, "selectedDates", a);
}, ct = (t, e, n) => {
  if (!e) return;
  if (!n) return e.dataset.vcDateRangeTooltip = "hidden", void (e.textContent = "");
  const o = t.context.mainElement.getBoundingClientRect(), r = n.getBoundingClientRect();
  e.style.left = r.left - o.left + r.width / 2 + "px", e.style.top = r.bottom - o.top - r.height + "px", e.dataset.vcDateRangeTooltip = "visible", e.innerHTML = t.sanitizerHTML(t.onCreateDateRangeTooltip(t, n, e, r, o));
}, w = { self: null, lastDateEl: null, isHovering: !1, rangeMin: void 0, rangeMax: void 0, tooltipEl: null, timeoutId: null }, Ea = (t, e, n) => {
  var o, r, i;
  if (!((r = (o = w.self) == null ? void 0 : o.context) != null && r.selectedDates[0])) return;
  const a = Mt(t);
  (i = w.self.context.disableDates) != null && i.includes(a) || (w.self.context.mainElement.querySelectorAll(`[data-vc-date="${a}"]`).forEach((s) => s.dataset.vcDateHover = ""), e.forEach((s) => s.dataset.vcDateHover = "first"), n.forEach((s) => {
    s.dataset.vcDateHover === "first" ? s.dataset.vcDateHover = "first-and-last" : s.dataset.vcDateHover = "last";
  }));
}, Gt = () => {
  var t, e;
  (e = (t = w.self) == null ? void 0 : t.context) != null && e.mainElement && w.self.context.mainElement.querySelectorAll("[data-vc-date-hover]").forEach((n) => n.removeAttribute("data-vc-date-hover"));
}, Ta = (t) => {
  var e, n;
  if (!t.target || !((n = (e = w.self) == null ? void 0 : e.context) != null && n.selectedDates[0])) return;
  if (!t.target.closest('[data-vc="dates"]')) return w.lastDateEl = null, ct(w.self, w.tooltipEl, null), void Gt();
  const o = t.target.closest("[data-vc-date]");
  if (!o || w.lastDateEl === o) return;
  w.lastDateEl = o, ct(w.self, w.tooltipEl, o), Gt();
  const r = o.dataset.vcDate, i = F(w.self.context.selectedDates[0]), a = F(r), s = w.self.context.mainElement.querySelectorAll(`[data-vc-date="${w.self.context.selectedDates[0]}"]`), l = w.self.context.mainElement.querySelectorAll(`[data-vc-date="${r}"]`), [c, u] = i < a ? [s, l] : [l, s], [d, f] = i < a ? [i, a] : [a, i];
  for (let m = new Date(d); m <= f; m.setDate(m.getDate() + 1)) Ea(m, c, u);
}, Sa = (t) => {
  const e = t.target.closest("[data-vc-date-selected]");
  if (!e && w.lastDateEl) return w.lastDateEl = null, void ct(w.self, w.tooltipEl, null);
  e && w.lastDateEl !== e && (w.lastDateEl = e, ct(w.self, w.tooltipEl, e));
}, yo = (t) => (e) => {
  w.isHovering || (w.isHovering = !0, requestAnimationFrame(() => {
    t(e), w.isHovering = !1;
  }));
}, ae = yo(Ta), re = yo(Sa), Wt = (t) => {
  w.self && t.key === "Escape" && (w.lastDateEl = null, S(w.self, "selectedDates", []), w.self.context.mainElement.removeEventListener("mousemove", ae), w.self.context.mainElement.removeEventListener("keydown", Wt), ct(w.self, w.tooltipEl, null), Gt());
}, yt = () => {
  w.timeoutId !== null && clearTimeout(w.timeoutId), w.timeoutId = setTimeout(() => {
    w.lastDateEl = null, ct(w.self, w.tooltipEl, null), Gt();
  }, 50);
}, Ca = () => {
  var t, e, n, o;
  if (!((n = (e = (t = w.self) == null ? void 0 : t.context) == null ? void 0 : e.selectedDates) != null && n[0]) || !((o = w.self.context.disableDates) != null && o[0])) return;
  const r = F(w.self.context.selectedDates[0]), [i, a] = w.self.context.disableDates.map((s) => F(s)).reduce(([s, l], c) => [r >= c ? c : s, r < c && l === null ? c : l], [null, null]);
  i && S(w.self, "displayDateMin", Mt(new Date(i.setDate(i.getDate() + 1)))), a && S(w.self, "displayDateMax", Mt(new Date(a.setDate(a.getDate() - 1)))), w.self.disableDatesPast && !w.self.disableAllDates && F(w.self.context.displayDateMin) < F(w.self.context.dateToday) && S(w.self, "displayDateMin", w.self.context.dateToday);
}, xo = (t, e) => {
  w.self = t, w.lastDateEl = e, Gt(), t.disableDatesGaps && (w.rangeMin = w.rangeMin ? w.rangeMin : t.context.displayDateMin, w.rangeMax = w.rangeMax ? w.rangeMax : t.context.displayDateMax), t.onCreateDateRangeTooltip && (w.tooltipEl = t.context.mainElement.querySelector("[data-vc-date-range-tooltip]"));
  const n = e?.dataset.vcDate;
  if (n) {
    const o = t.context.selectedDates.length === 1 && t.context.selectedDates[0].includes(n), r = o && !We(t) ? [n, n] : o && We(t) ? [] : t.context.selectedDates.length > 1 ? [n] : [...t.context.selectedDates, n];
    S(t, "selectedDates", r), t.context.selectedDates.length > 1 && t.context.selectedDates.sort((i, a) => +new Date(i) - +new Date(a));
  }
  ({ set: () => (t.disableDatesGaps && Ca(), ct(w.self, w.tooltipEl, e), w.self.context.mainElement.removeEventListener("mousemove", re), w.self.context.mainElement.removeEventListener("mouseleave", yt), w.self.context.mainElement.removeEventListener("keydown", Wt), w.self.context.mainElement.addEventListener("mousemove", ae), w.self.context.mainElement.addEventListener("mouseleave", yt), w.self.context.mainElement.addEventListener("keydown", Wt), () => {
    w.self.context.mainElement.removeEventListener("mousemove", ae), w.self.context.mainElement.removeEventListener("mouseleave", yt), w.self.context.mainElement.removeEventListener("keydown", Wt);
  }), reset: () => {
    const [o, r] = [t.context.selectedDates[0], t.context.selectedDates[t.context.selectedDates.length - 1]], i = t.context.selectedDates[0] !== t.context.selectedDates[t.context.selectedDates.length - 1], a = Et([`${o}:${r}`]).filter((l) => !t.context.disableDates.includes(l)), s = i ? t.enableEdgeDatesOnly ? [o, r] : a : [t.context.selectedDates[0], t.context.selectedDates[0]];
    if (S(t, "selectedDates", s), t.disableDatesGaps && (S(t, "displayDateMin", w.rangeMin), S(t, "displayDateMax", w.rangeMax)), w.self.context.mainElement.removeEventListener("mousemove", ae), w.self.context.mainElement.removeEventListener("mouseleave", yt), w.self.context.mainElement.removeEventListener("keydown", Wt), t.onCreateDateRangeTooltip) return t.context.selectedDates[0] || (w.self.context.mainElement.removeEventListener("mousemove", re), w.self.context.mainElement.removeEventListener("mouseleave", yt), ct(w.self, w.tooltipEl, null)), t.context.selectedDates[0] && (w.self.context.mainElement.addEventListener("mousemove", re), w.self.context.mainElement.addEventListener("mouseleave", yt), ct(w.self, w.tooltipEl, e)), () => {
      w.self.context.mainElement.removeEventListener("mousemove", re), w.self.context.mainElement.removeEventListener("mouseleave", yt);
    };
  } })[t.context.selectedDates.length === 1 ? "set" : "reset"]();
}, ke = (t) => {
  t.context.mainElement.querySelectorAll("[data-vc-date]").forEach((e) => {
    const n = e.querySelector("[data-vc-date-btn]"), o = e.dataset.vcDate, r = F(o).getDay();
    ho(t, t.context.selectedYear, e, n, r, o, "current");
  });
}, Aa = (t, e) => {
  var n;
  const o = e.target, r = o.closest("[data-vc-date-btn]");
  if (!t.selectionDatesMode || !["single", "multiple", "multiple-ranged"].includes(t.selectionDatesMode) || !r) return;
  const i = r.closest("[data-vc-date]");
  ({ single: () => qn(t, i, !1), multiple: () => qn(t, i, !0), "multiple-ranged": () => xo(t, i) })[t.selectionDatesMode](), (n = t.context.selectedDates) == null || n.sort((l, c) => +new Date(l) - +new Date(c)), t.onClickDate && t.onClickDate(t, e), t.inputMode && t.context.inputElement && t.context.mainElement && t.onChangeToInput && t.onChangeToInput(t, e);
  const a = o.closest('[data-vc-date-month="prev"]'), s = o.closest('[data-vc-date-month="next"]');
  ({ prev: () => t.enableMonthChangeOnDayClick ? _e(t, "prev") : ke(t), next: () => t.enableMonthChangeOnDayClick ? _e(t, "next") : ke(t), current: () => ke(t) })[a ? "prev" : s ? "next" : "current"]();
}, ka = ["month", "year"], wo = (t, e, n) => {
  const { currentValue: o, columnID: r } = an(t, e);
  return t.context.currentType === "month" && r >= 0 ? n - r : t.context.currentType === "year" && t.context.selectedYear !== o ? n - 1 : n;
}, La = (t, e) => {
  const n = wo(t, "year", Number(e.dataset.vcYearsYear)), o = F(t.context.dateMin), r = F(t.context.dateMax), i = t.context.displayMonthsCount - 1, { columnID: a } = an(t, "year"), s = t.context.selectedMonth < o.getMonth() && n <= o.getFullYear(), l = t.context.selectedMonth > r.getMonth() - i + a && n >= r.getFullYear(), c = n < o.getFullYear(), u = n > r.getFullYear(), d = s || c ? o.getFullYear() : l || u ? r.getFullYear() : n, f = s || c ? o.getMonth() : l || u ? r.getMonth() - i + a : t.context.selectedMonth;
  S(t, "selectedYear", d), S(t, "selectedMonth", f);
}, Na = (t, e) => {
  const n = e.closest('[data-vc-column="month"]').querySelector('[data-vc="year"]'), o = wo(t, "month", Number(e.dataset.vcMonthsMonth)), r = Number(n.dataset.vcYear), i = F(t.context.dateMin), a = F(t.context.dateMax), s = o < i.getMonth() && r <= i.getFullYear(), l = o > a.getMonth() && r >= a.getFullYear();
  S(t, "selectedYear", r), S(t, "selectedMonth", s ? i.getMonth() : l ? a.getMonth() : o);
}, Fa = (t, e, n, o) => {
  var r;
  ({ year: () => {
    if (t.type === "multiple") return La(t, o);
    S(t, "selectedYear", Number(o.dataset.vcYearsYear));
  }, month: () => {
    if (t.type === "multiple") return Na(t, o);
    S(t, "selectedMonth", Number(o.dataset.vcMonthsMonth));
  } })[n](), { year: () => {
    var i;
    return (i = t.onClickYear) == null ? void 0 : i.call(t, t, e);
  }, month: () => {
    var i;
    return (i = t.onClickMonth) == null ? void 0 : i.call(t, t, e);
  } }[n](), t.context.currentType !== t.type ? (S(t, "currentType", t.type), we(t), (r = t.context.mainElement.querySelector(`[data-vc="${n}"]`)) == null || r.focus()) : rn(t, o, n, !0, !0);
}, $a = (t, e, n) => {
  var o;
  const r = e.target, i = r.closest(`[data-vc="${n}"]`), a = { year: () => sn(t, r), month: () => go(t, r) };
  if (i && t.onClickTitle && t.onClickTitle(t, e), i && t.context.currentType !== n) return a[n]();
  const s = r.closest(`[data-vc-${n}s-${n}]`);
  if (s) return Fa(t, e, n, s);
  const l = r.closest('[data-vc="grid"]'), c = r.closest('[data-vc="column"]');
  (t.context.currentType === n && i || t.type === "multiple" && t.context.currentType === n && l && !c) && (S(t, "currentType", t.type), we(t), (o = t.context.mainElement.querySelector(`[data-vc="${n}"]`)) == null || o.focus());
}, Oa = (t, e) => {
  const n = { month: t.selectionMonthsMode, year: t.selectionYearsMode };
  ka.forEach((o) => {
    n[o] && e.target && $a(t, e, o);
  });
}, Ra = (t, e) => {
  if (!t.enableWeekNumbers || !t.onClickWeekNumber) return;
  const n = e.target.closest("[data-vc-week-number]"), o = t.context.mainElement.querySelectorAll("[data-vc-date-week-number]");
  if (!n || !o[0]) return;
  const r = Number(n.innerText), i = Number(n.dataset.vcWeekYear), a = Array.from(o).filter((s) => Number(s.dataset.vcDateWeekNumber) === r);
  t.onClickWeekNumber(t, r, i, a, e);
}, Ia = (t, e) => {
  if (!t.onClickWeekDay) return;
  const n = e.target.closest("[data-vc-week-day]"), o = e.target.closest('[data-vc="column"]'), r = o ? o.querySelectorAll("[data-vc-date-week-day]") : t.context.mainElement.querySelectorAll("[data-vc-date-week-day]");
  if (!n || !r[0]) return;
  const i = Number(n.dataset.vcWeekDay), a = Array.from(r).filter((s) => Number(s.dataset.vcDateWeekDay) === i);
  t.onClickWeekDay(t, i, a, e);
}, Do = (t) => {
  const e = (n) => {
    Ma(t, n), Ia(t, n), Ra(t, n), Aa(t, n), Oa(t, n);
  };
  return t.context.mainElement.addEventListener("click", e), () => t.context.mainElement.removeEventListener("click", e);
}, Pa = (t) => {
  if (t.type === "multiple" && (t.displayMonthsCount <= 1 || t.displayMonthsCount > 12)) throw new Error(pt.incorrectMonthsCount);
  if (t.type !== "multiple" && t.displayMonthsCount > 1) throw new Error(pt.incorrectMonthsCount);
  S(t, "displayMonthsCount", t.displayMonthsCount ? t.displayMonthsCount : t.type === "multiple" ? 2 : 1);
}, Ya = () => {
  const t = /* @__PURE__ */ new Date();
  return new Date(t.getTime() - 6e4 * t.getTimezoneOffset()).toISOString().substring(0, 10);
}, Ht = (t, e) => t === "today" ? Ya() : t instanceof Date || typeof t == "number" || typeof t == "string" ? Et([t])[0] : e, Ha = (t) => {
  var e, n, o;
  const r = Ht(t.dateMin, t.dateMin), i = Ht(t.dateMax, t.dateMax), a = Ht(t.displayDateMin, r), s = Ht(t.displayDateMax, i);
  S(t, "dateToday", Ht(t.dateToday, t.dateToday)), S(t, "displayDateMin", a ? F(r) >= F(a) ? r : a : r), S(t, "displayDateMax", s ? F(i) <= F(s) ? i : s : i);
  const l = t.disableDatesPast && !t.disableAllDates && F(a) < F(t.context.dateToday);
  S(t, "displayDateMin", l || t.disableAllDates ? t.context.dateToday : a), S(t, "displayDateMax", t.disableAllDates ? t.context.dateToday : s), S(t, "disableDates", t.disableDates[0] && !t.disableAllDates ? Et(t.disableDates) : t.disableAllDates ? [t.context.displayDateMin] : []), t.context.disableDates.length > 1 && t.context.disableDates.sort((c, u) => +new Date(c) - +new Date(u)), S(t, "enableDates", t.enableDates[0] ? Et(t.enableDates) : []), (e = t.context.enableDates) != null && e[0] && ((n = t.context.disableDates) != null && n[0]) && S(t, "disableDates", t.context.disableDates.filter((c) => !t.context.enableDates.includes(c))), t.context.enableDates.length > 1 && t.context.enableDates.sort((c, u) => +new Date(c) - +new Date(u)), (o = t.context.enableDates) != null && o[0] && t.disableAllDates && (S(t, "displayDateMin", t.context.enableDates[0]), S(t, "displayDateMax", t.context.enableDates[t.context.enableDates.length - 1])), S(t, "dateMin", t.displayDisabledDates ? r : t.context.displayDateMin), S(t, "dateMax", t.displayDisabledDates ? i : t.context.displayDateMax);
}, _a = (t) => {
  var e;
  S(t, "selectedDates", (e = t.selectedDates) != null && e[0] ? Et(t.selectedDates) : []);
}, Bn = (t, e, n) => {
  S(t, "selectedMonth", e), S(t, "selectedYear", n), S(t, "displayYear", n);
}, Wa = (t) => {
  var e;
  if (t.enableJumpToSelectedDate && ((e = t.selectedDates) != null && e[0]) && t.selectedMonth === void 0 && t.selectedYear === void 0) {
    const r = F(Et(t.selectedDates)[0]);
    return void Bn(t, r.getMonth(), r.getFullYear());
  }
  const n = t.selectedMonth !== void 0 && Number(t.selectedMonth) >= 0 && Number(t.selectedMonth) < 12, o = t.selectedYear !== void 0 && Number(t.selectedYear) >= 0 && Number(t.selectedYear) <= 9999;
  Bn(t, n ? Number(t.selectedMonth) : F(t.context.dateToday).getMonth(), o ? Number(t.selectedYear) : F(t.context.dateToday).getFullYear());
}, qa = (t) => {
  var e, n, o;
  if (!t.selectionTimeMode) return;
  if (![12, 24].includes(t.selectionTimeMode)) throw new Error(pt.incorrectTime);
  const r = t.selectionTimeMode === 12, i = r ? /^(0[1-9]|1[0-2]):([0-5][0-9]) ?(AM|PM)?$/i : /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
  let [a, s, l] = (o = (n = (e = t.selectedTime) == null ? void 0 : e.match(i)) == null ? void 0 : n.slice(1)) != null ? o : [];
  a ? r && !l && (l = "AM") : (a = r ? Ut(String(t.timeMinHour)) : String(t.timeMinHour), s = String(t.timeMinMinute), l = r ? Number(Ut(String(t.timeMinHour))) >= 12 ? "PM" : "AM" : null), S(t, "selectedHours", a.padStart(2, "0")), S(t, "selectedMinutes", s.padStart(2, "0")), S(t, "selectedKeeping", l), S(t, "selectedTime", `${t.context.selectedHours}:${t.context.selectedMinutes}${l ? ` ${l}` : ""}`);
}, Mo = (t) => {
  S(t, "currentType", t.type), Pa(t), Ha(t), Wa(t), _a(t), qa(t);
}, Eo = (t, { year: e, month: n, dates: o, time: r, locale: i }, a = !0) => {
  var s;
  const l = { year: t.selectedYear, month: t.selectedMonth, dates: t.selectedDates, time: t.selectedTime };
  t.selectedYear = e ? l.year : t.context.selectedYear, t.selectedMonth = n ? l.month : t.context.selectedMonth, t.selectedTime = r ? l.time : t.context.selectedTime, t.selectedDates = o === "only-first" && ((s = t.context.selectedDates) != null && s[0]) ? [t.context.selectedDates[0]] : o === !0 ? l.dates : t.context.selectedDates, i && S(t, "locale", { months: { short: [], long: [] }, weekdays: { short: [], long: [] } }), Mo(t), a && we(t), t.selectedYear = l.year, t.selectedMonth = l.month, t.selectedDates = l.dates, t.selectedTime = l.time, t.selectionDatesMode === "multiple-ranged" && o && xo(t, null);
}, Ba = (t) => {
  const e = document.createElement("div");
  return e.className = t.styles.calendar, e.dataset.vc = "calendar", e.dataset.vcInput = "", e.dataset.vcCalendarHidden = "", S(t, "inputModeInit", !0), S(t, "isShowInInputMode", !1), S(t, "mainElement", e), document.body.appendChild(t.context.mainElement), Eo(t, { year: !0, month: !0, dates: !0, time: !0, locale: !0 }), queueMicrotask(() => cn(t)), t.onInit && t.onInit(t), bo(t), Do(t);
}, za = (t) => {
  S(t, "inputElement", t.context.mainElement);
  const e = () => {
    t.context.inputModeInit ? queueMicrotask(() => cn(t)) : Ba(t);
  };
  return t.context.inputElement.addEventListener("click", e), t.context.inputElement.addEventListener("focus", e), () => {
    t.context.inputElement.removeEventListener("click", e), t.context.inputElement.removeEventListener("focus", e);
  };
}, Va = (t) => (S(t, "originalElement", t.context.mainElement.cloneNode(!0)), S(t, "isInit", !0), t.inputMode ? za(t) : (Mo(t), we(t), t.onInit && t.onInit(t), bo(t), Do(t))), To = (t, e) => {
  if (!t.context.isInit) throw new Error(pt.notInit);
  Eo(t, Lt(Lt({}, { year: !0, month: !0, dates: !0, time: !0, locale: !0 }), e), !(t.inputMode && !t.context.inputModeInit)), t.onUpdate && t.onUpdate(t);
}, ln = (t, e) => {
  const n = Object.keys(e);
  for (let o = 0; o < n.length; o++) {
    const r = n[o];
    typeof t[r] != "object" || typeof e[r] != "object" || e[r] instanceof Date || Array.isArray(e[r]) ? e[r] !== void 0 && (t[r] = e[r]) : ln(t[r], e[r]);
  }
}, ja = (t, e, n) => {
  ln(t, e), t.context.isInit && To(t, n);
};
function Ka(t, e) {
  const n = "left";
  if (!e || !t) return n;
  const { canShow: o, parentPositions: r } = mo(t, e), i = o.left && o.right;
  return (i && o.bottom ? "center" : i && o.top ? ["top", "center"] : Array.isArray(r) ? [r[0] === "bottom" ? "top" : "bottom", ...r.slice(1)] : r) || n;
}
const zn = (t, e, n) => {
  if (!t) return;
  const o = n === "auto" ? Ka(t, e) : n, r = { top: -e.offsetHeight, bottom: t.offsetHeight, left: 0, center: t.offsetWidth / 2 - e.offsetWidth / 2, right: t.offsetWidth - e.offsetWidth }, i = Array.isArray(o) ? o[0] : "bottom", a = Array.isArray(o) ? o[1] : o;
  e.dataset.vcPosition = i;
  const { top: s, left: l } = tn(t), c = s + r[i];
  let u = l + r[a];
  const { vw: d } = en();
  if (u + e.clientWidth > d) {
    const f = window.innerWidth - document.body.clientWidth;
    u = d - e.clientWidth - f;
  } else u < 0 && (u = 0);
  Object.assign(e.style, { left: `${u}px`, top: `${c}px` });
}, cn = (t) => {
  if (t.context.isShowInInputMode) return;
  if (!t.context.currentType) return void t.context.mainElement.click();
  S(t, "cleanupHandlers", []), S(t, "isShowInInputMode", !0), zn(t.context.inputElement, t.context.mainElement, t.positionToInput), t.context.mainElement.removeAttribute("data-vc-calendar-hidden");
  const e = () => {
    zn(t.context.inputElement, t.context.mainElement, t.positionToInput);
  };
  window.addEventListener("resize", e), t.context.cleanupHandlers.push(() => window.removeEventListener("resize", e));
  const n = (r) => {
    r.key === "Escape" && Ye(t);
  };
  document.addEventListener("keydown", n), t.context.cleanupHandlers.push(() => document.removeEventListener("keydown", n));
  const o = (r) => {
    r.target === t.context.inputElement || t.context.mainElement.contains(r.target) || Ye(t);
  };
  document.addEventListener("click", o, { capture: !0 }), t.context.cleanupHandlers.push(() => document.removeEventListener("click", o, { capture: !0 })), t.onShow && t.onShow(t);
}, Ua = { application: "Calendar", navigation: "Calendar Navigation", arrowNext: { month: "Next month", year: "Next list of years" }, arrowPrev: { month: "Previous month", year: "Previous list of years" }, month: "Select month, current selected month:", months: "List of months", year: "Select year, current selected year:", years: "List of years", week: "Days of the week", weekNumber: "Numbers of weeks in a year", dates: "Dates in the current month", selectingTime: "Selecting a time ", inputHour: "Hours", inputMinute: "Minutes", rangeHour: "Slider for selecting hours", rangeMinute: "Slider for selecting minutes", btnKeeping: "Switch AM/PM, current position:" }, Ga = { calendar: "vc", controls: "vc-controls", grid: "vc-grid", column: "vc-column", header: "vc-header", headerContent: "vc-header__content", month: "vc-month", year: "vc-year", arrowPrev: "vc-arrow vc-arrow_prev", arrowNext: "vc-arrow vc-arrow_next", wrapper: "vc-wrapper", content: "vc-content", months: "vc-months", monthsMonth: "vc-months__month", years: "vc-years", yearsYear: "vc-years__year", week: "vc-week", weekDay: "vc-week__day", weekNumbers: "vc-week-numbers", weekNumbersTitle: "vc-week-numbers__title", weekNumbersContent: "vc-week-numbers__content", weekNumber: "vc-week-number", dates: "vc-dates", date: "vc-date", dateBtn: "vc-date__btn", datePopup: "vc-date__popup", dateRangeTooltip: "vc-date-range-tooltip", time: "vc-time", timeContent: "vc-time__content", timeHour: "vc-time__hour", timeMinute: "vc-time__minute", timeKeeping: "vc-time__keeping", timeRanges: "vc-time__ranges", timeRange: "vc-time__range" };
class Za {
  constructor() {
    E(this, "type", "default"), E(this, "inputMode", !1), E(this, "positionToInput", "left"), E(this, "firstWeekday", 1), E(this, "monthsToSwitch", 1), E(this, "themeAttrDetect", "html[data-theme]"), E(this, "locale", "en"), E(this, "dateToday", "today"), E(this, "dateMin", "1970-01-01"), E(this, "dateMax", "2470-12-31"), E(this, "displayDateMin"), E(this, "displayDateMax"), E(this, "displayDatesOutside", !0), E(this, "displayDisabledDates", !1), E(this, "displayMonthsCount"), E(this, "disableDates", []), E(this, "disableAllDates", !1), E(this, "disableDatesPast", !1), E(this, "disableDatesGaps", !1), E(this, "disableWeekdays", []), E(this, "disableToday", !1), E(this, "enableDates", []), E(this, "enableEdgeDatesOnly", !0), E(this, "enableDateToggle", !0), E(this, "enableWeekNumbers", !1), E(this, "enableMonthChangeOnDayClick", !0), E(this, "enableJumpToSelectedDate", !1), E(this, "selectionDatesMode", "single"), E(this, "selectionMonthsMode", !0), E(this, "selectionYearsMode", !0), E(this, "selectionTimeMode", !1), E(this, "selectedDates", []), E(this, "selectedMonth"), E(this, "selectedYear"), E(this, "selectedHolidays", []), E(this, "selectedWeekends", [0, 6]), E(this, "selectedTime"), E(this, "selectedTheme", "system"), E(this, "timeMinHour", 0), E(this, "timeMaxHour", 23), E(this, "timeMinMinute", 0), E(this, "timeMaxMinute", 59), E(this, "timeControls", "all"), E(this, "timeStepHour", 1), E(this, "timeStepMinute", 1), E(this, "sanitizerHTML", (e) => e), E(this, "onClickDate"), E(this, "onClickWeekDay"), E(this, "onClickWeekNumber"), E(this, "onClickTitle"), E(this, "onClickMonth"), E(this, "onClickYear"), E(this, "onClickArrow"), E(this, "onChangeTime"), E(this, "onChangeToInput"), E(this, "onCreateDateRangeTooltip"), E(this, "onCreateDateEls"), E(this, "onCreateMonthEls"), E(this, "onCreateYearEls"), E(this, "onInit"), E(this, "onUpdate"), E(this, "onDestroy"), E(this, "onShow"), E(this, "onHide"), E(this, "popups", {}), E(this, "labels", Lt({}, Ua)), E(this, "layouts", { default: "", multiple: "", month: "", year: "" }), E(this, "styles", Lt({}, Ga));
  }
}
const So = class qe extends Za {
  constructor(e, n) {
    var o;
    super(), E(this, "init", () => Va(this)), E(this, "update", (r) => To(this, r)), E(this, "destroy", () => Li(this)), E(this, "show", () => cn(this)), E(this, "hide", () => Ye(this)), E(this, "set", (r, i) => ja(this, r, i)), E(this, "context"), this.context = ki(Lt({}, this.context), { locale: { months: { short: [], long: [] }, weekdays: { short: [], long: [] } } }), S(this, "mainElement", typeof e == "string" ? (o = qe.memoizedElements.get(e)) != null ? o : this.queryAndMemoize(e) : e), n && ln(this, n);
  }
  queryAndMemoize(e) {
    const n = document.querySelector(e);
    if (!n) throw new Error(pt.notFoundSelector(e));
    return qe.memoizedElements.set(e, n), n;
  }
};
E(So, "memoizedElements", /* @__PURE__ */ new Map());
let Xa = So;
/*! name: vanilla-calendar-pro v3.0.4 | url: https://github.com/uvarov-frontend/vanilla-calendar-pro */
const pe = (t) => /* @__PURE__ */ new Date(`${t}T00:00:00`), Co = (t) => `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`, Ja = (t, e) => {
  const n = pe(t), o = (n.getDay() - e + 7) % 7;
  n.setDate(n.getDate() + 4 - o);
  const r = new Date(n.getFullYear(), 0, 1), i = Math.ceil(((+n - +r) / 864e5 + 1) / 7);
  return { year: n.getFullYear(), week: i };
}, Qa = (t) => t.reduce((e, n) => {
  if (n instanceof Date || typeof n == "number") {
    const o = n instanceof Date ? n : new Date(n);
    e.push(o.toISOString().substring(0, 10));
  } else n.match(/^(\d{4}-\d{2}-\d{2})$/g) ? e.push(n) : n.replace(/(\d{4}-\d{2}-\d{2}).*?(\d{4}-\d{2}-\d{2})/g, (o, r, i) => {
    const a = pe(r), s = pe(i), l = new Date(a.getTime());
    for (; l <= s; l.setDate(l.getDate() + 1)) e.push(Co(l));
    return o;
  });
  return e;
}, []), ts = (t) => Qa(t), es = (t) => Co(t), ns = (t) => pe(t), os = (t, e) => Ja(t, e);
function rs(t) {
  t.magic("calendar", () => (e, n = null) => new Xa(e, n)), t.magic("calendarUtils", () => ({
    parseDates: ts,
    getDateString: es,
    getDate: ns,
    getWeekNumber: os
  }));
}
document.addEventListener("alpine:init", () => {
  Alpine.plugin((t) => {
    t.plugin(rr), t.plugin(Vr), t.plugin(ar), t.plugin(Mi), t.plugin(rs);
  });
});
