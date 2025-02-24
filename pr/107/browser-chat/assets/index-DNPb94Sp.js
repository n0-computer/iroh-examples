var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(async () => {
  function Sg(n, o) {
    for (var l = 0; l < o.length; l++) {
      const a = o[l];
      if (typeof a != "string" && !Array.isArray(a)) {
        for (const u in a) if (u !== "default" && !(u in n)) {
          const d = Object.getOwnPropertyDescriptor(a, u);
          d && Object.defineProperty(n, u, d.get ? d : {
            enumerable: true,
            get: () => a[u]
          });
        }
      }
    }
    return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, {
      value: "Module"
    }));
  }
  (function() {
    const o = document.createElement("link").relList;
    if (o && o.supports && o.supports("modulepreload")) return;
    for (const u of document.querySelectorAll('link[rel="modulepreload"]')) a(u);
    new MutationObserver((u) => {
      for (const d of u) if (d.type === "childList") for (const f of d.addedNodes) f.tagName === "LINK" && f.rel === "modulepreload" && a(f);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function l(u) {
      const d = {};
      return u.integrity && (d.integrity = u.integrity), u.referrerPolicy && (d.referrerPolicy = u.referrerPolicy), u.crossOrigin === "use-credentials" ? d.credentials = "include" : u.crossOrigin === "anonymous" ? d.credentials = "omit" : d.credentials = "same-origin", d;
    }
    function a(u) {
      if (u.ep) return;
      u.ep = true;
      const d = l(u);
      fetch(u.href, d);
    }
  })();
  function qf(n) {
    return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
  }
  var ha = {
    exports: {}
  }, Po = {}, ma = {
    exports: {}
  }, me = {};
  var tf;
  function xg() {
    if (tf) return me;
    tf = 1;
    var n = Symbol.for("react.element"), o = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), f = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), b = Symbol.iterator;
    function w(E) {
      return E === null || typeof E != "object" ? null : (E = b && E[b] || E["@@iterator"], typeof E == "function" ? E : null);
    }
    var P = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    }, M = Object.assign, k = {};
    function R(E, F, ce) {
      this.props = E, this.context = F, this.refs = k, this.updater = ce || P;
    }
    R.prototype.isReactComponent = {}, R.prototype.setState = function(E, F) {
      if (typeof E != "object" && typeof E != "function" && E != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, E, F, "setState");
    }, R.prototype.forceUpdate = function(E) {
      this.updater.enqueueForceUpdate(this, E, "forceUpdate");
    };
    function L() {
    }
    L.prototype = R.prototype;
    function W(E, F, ce) {
      this.props = E, this.context = F, this.refs = k, this.updater = ce || P;
    }
    var H = W.prototype = new L();
    H.constructor = W, M(H, R.prototype), H.isPureReactComponent = true;
    var O = Array.isArray, j = Object.prototype.hasOwnProperty, B = {
      current: null
    }, V = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    function K(E, F, ce) {
      var pe, ye = {}, ve = null, be = null;
      if (F != null) for (pe in F.ref !== void 0 && (be = F.ref), F.key !== void 0 && (ve = "" + F.key), F) j.call(F, pe) && !V.hasOwnProperty(pe) && (ye[pe] = F[pe]);
      var Se = arguments.length - 2;
      if (Se === 1) ye.children = ce;
      else if (1 < Se) {
        for (var Pe = Array(Se), et = 0; et < Se; et++) Pe[et] = arguments[et + 2];
        ye.children = Pe;
      }
      if (E && E.defaultProps) for (pe in Se = E.defaultProps, Se) ye[pe] === void 0 && (ye[pe] = Se[pe]);
      return {
        $$typeof: n,
        type: E,
        key: ve,
        ref: be,
        props: ye,
        _owner: B.current
      };
    }
    function Y(E, F) {
      return {
        $$typeof: n,
        type: E.type,
        key: F,
        ref: E.ref,
        props: E.props,
        _owner: E._owner
      };
    }
    function X(E) {
      return typeof E == "object" && E !== null && E.$$typeof === n;
    }
    function le(E) {
      var F = {
        "=": "=0",
        ":": "=2"
      };
      return "$" + E.replace(/[=:]/g, function(ce) {
        return F[ce];
      });
    }
    var re = /\/+/g;
    function ge(E, F) {
      return typeof E == "object" && E !== null && E.key != null ? le("" + E.key) : F.toString(36);
    }
    function he(E, F, ce, pe, ye) {
      var ve = typeof E;
      (ve === "undefined" || ve === "boolean") && (E = null);
      var be = false;
      if (E === null) be = true;
      else switch (ve) {
        case "string":
        case "number":
          be = true;
          break;
        case "object":
          switch (E.$$typeof) {
            case n:
            case o:
              be = true;
          }
      }
      if (be) return be = E, ye = ye(be), E = pe === "" ? "." + ge(be, 0) : pe, O(ye) ? (ce = "", E != null && (ce = E.replace(re, "$&/") + "/"), he(ye, F, ce, "", function(et) {
        return et;
      })) : ye != null && (X(ye) && (ye = Y(ye, ce + (!ye.key || be && be.key === ye.key ? "" : ("" + ye.key).replace(re, "$&/") + "/") + E)), F.push(ye)), 1;
      if (be = 0, pe = pe === "" ? "." : pe + ":", O(E)) for (var Se = 0; Se < E.length; Se++) {
        ve = E[Se];
        var Pe = pe + ge(ve, Se);
        be += he(ve, F, ce, Pe, ye);
      }
      else if (Pe = w(E), typeof Pe == "function") for (E = Pe.call(E), Se = 0; !(ve = E.next()).done; ) ve = ve.value, Pe = pe + ge(ve, Se++), be += he(ve, F, ce, Pe, ye);
      else if (ve === "object") throw F = String(E), Error("Objects are not valid as a React child (found: " + (F === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : F) + "). If you meant to render a collection of children, use an array instead.");
      return be;
    }
    function Ce(E, F, ce) {
      if (E == null) return E;
      var pe = [], ye = 0;
      return he(E, pe, "", "", function(ve) {
        return F.call(ce, ve, ye++);
      }), pe;
    }
    function fe(E) {
      if (E._status === -1) {
        var F = E._result;
        F = F(), F.then(function(ce) {
          (E._status === 0 || E._status === -1) && (E._status = 1, E._result = ce);
        }, function(ce) {
          (E._status === 0 || E._status === -1) && (E._status = 2, E._result = ce);
        }), E._status === -1 && (E._status = 0, E._result = F);
      }
      if (E._status === 1) return E._result.default;
      throw E._result;
    }
    var ue = {
      current: null
    }, D = {
      transition: null
    }, q = {
      ReactCurrentDispatcher: ue,
      ReactCurrentBatchConfig: D,
      ReactCurrentOwner: B
    };
    function Q() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    return me.Children = {
      map: Ce,
      forEach: function(E, F, ce) {
        Ce(E, function() {
          F.apply(this, arguments);
        }, ce);
      },
      count: function(E) {
        var F = 0;
        return Ce(E, function() {
          F++;
        }), F;
      },
      toArray: function(E) {
        return Ce(E, function(F) {
          return F;
        }) || [];
      },
      only: function(E) {
        if (!X(E)) throw Error("React.Children.only expected to receive a single React element child.");
        return E;
      }
    }, me.Component = R, me.Fragment = l, me.Profiler = u, me.PureComponent = W, me.StrictMode = a, me.Suspense = g, me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = q, me.act = Q, me.cloneElement = function(E, F, ce) {
      if (E == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + E + ".");
      var pe = M({}, E.props), ye = E.key, ve = E.ref, be = E._owner;
      if (F != null) {
        if (F.ref !== void 0 && (ve = F.ref, be = B.current), F.key !== void 0 && (ye = "" + F.key), E.type && E.type.defaultProps) var Se = E.type.defaultProps;
        for (Pe in F) j.call(F, Pe) && !V.hasOwnProperty(Pe) && (pe[Pe] = F[Pe] === void 0 && Se !== void 0 ? Se[Pe] : F[Pe]);
      }
      var Pe = arguments.length - 2;
      if (Pe === 1) pe.children = ce;
      else if (1 < Pe) {
        Se = Array(Pe);
        for (var et = 0; et < Pe; et++) Se[et] = arguments[et + 2];
        pe.children = Se;
      }
      return {
        $$typeof: n,
        type: E.type,
        key: ye,
        ref: ve,
        props: pe,
        _owner: be
      };
    }, me.createContext = function(E) {
      return E = {
        $$typeof: f,
        _currentValue: E,
        _currentValue2: E,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
      }, E.Provider = {
        $$typeof: d,
        _context: E
      }, E.Consumer = E;
    }, me.createElement = K, me.createFactory = function(E) {
      var F = K.bind(null, E);
      return F.type = E, F;
    }, me.createRef = function() {
      return {
        current: null
      };
    }, me.forwardRef = function(E) {
      return {
        $$typeof: p,
        render: E
      };
    }, me.isValidElement = X, me.lazy = function(E) {
      return {
        $$typeof: _,
        _payload: {
          _status: -1,
          _result: E
        },
        _init: fe
      };
    }, me.memo = function(E, F) {
      return {
        $$typeof: y,
        type: E,
        compare: F === void 0 ? null : F
      };
    }, me.startTransition = function(E) {
      var F = D.transition;
      D.transition = {};
      try {
        E();
      } finally {
        D.transition = F;
      }
    }, me.unstable_act = Q, me.useCallback = function(E, F) {
      return ue.current.useCallback(E, F);
    }, me.useContext = function(E) {
      return ue.current.useContext(E);
    }, me.useDebugValue = function() {
    }, me.useDeferredValue = function(E) {
      return ue.current.useDeferredValue(E);
    }, me.useEffect = function(E, F) {
      return ue.current.useEffect(E, F);
    }, me.useId = function() {
      return ue.current.useId();
    }, me.useImperativeHandle = function(E, F, ce) {
      return ue.current.useImperativeHandle(E, F, ce);
    }, me.useInsertionEffect = function(E, F) {
      return ue.current.useInsertionEffect(E, F);
    }, me.useLayoutEffect = function(E, F) {
      return ue.current.useLayoutEffect(E, F);
    }, me.useMemo = function(E, F) {
      return ue.current.useMemo(E, F);
    }, me.useReducer = function(E, F, ce) {
      return ue.current.useReducer(E, F, ce);
    }, me.useRef = function(E) {
      return ue.current.useRef(E);
    }, me.useState = function(E) {
      return ue.current.useState(E);
    }, me.useSyncExternalStore = function(E, F, ce) {
      return ue.current.useSyncExternalStore(E, F, ce);
    }, me.useTransition = function() {
      return ue.current.useTransition();
    }, me.version = "18.3.1", me;
  }
  var nf;
  function za() {
    return nf || (nf = 1, ma.exports = xg()), ma.exports;
  }
  var rf;
  function kg() {
    if (rf) return Po;
    rf = 1;
    var n = za(), o = Symbol.for("react.element"), l = Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, u = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    function f(p, g, y) {
      var _, b = {}, w = null, P = null;
      y !== void 0 && (w = "" + y), g.key !== void 0 && (w = "" + g.key), g.ref !== void 0 && (P = g.ref);
      for (_ in g) a.call(g, _) && !d.hasOwnProperty(_) && (b[_] = g[_]);
      if (p && p.defaultProps) for (_ in g = p.defaultProps, g) b[_] === void 0 && (b[_] = g[_]);
      return {
        $$typeof: o,
        type: p,
        key: w,
        ref: P,
        props: b,
        _owner: u.current
      };
    }
    return Po.Fragment = l, Po.jsx = f, Po.jsxs = f, Po;
  }
  var of;
  function Cg() {
    return of || (of = 1, ha.exports = kg()), ha.exports;
  }
  var x = Cg(), m = za();
  const Pg = qf(m), Eg = Sg({
    __proto__: null,
    default: Pg
  }, [
    m
  ]);
  var $i = {}, ga = {
    exports: {}
  }, ct = {}, ya = {
    exports: {}
  }, va = {};
  var lf;
  function Tg() {
    return lf || (lf = 1, function(n) {
      function o(D, q) {
        var Q = D.length;
        D.push(q);
        e: for (; 0 < Q; ) {
          var E = Q - 1 >>> 1, F = D[E];
          if (0 < u(F, q)) D[E] = q, D[Q] = F, Q = E;
          else break e;
        }
      }
      function l(D) {
        return D.length === 0 ? null : D[0];
      }
      function a(D) {
        if (D.length === 0) return null;
        var q = D[0], Q = D.pop();
        if (Q !== q) {
          D[0] = Q;
          e: for (var E = 0, F = D.length, ce = F >>> 1; E < ce; ) {
            var pe = 2 * (E + 1) - 1, ye = D[pe], ve = pe + 1, be = D[ve];
            if (0 > u(ye, Q)) ve < F && 0 > u(be, ye) ? (D[E] = be, D[ve] = Q, E = ve) : (D[E] = ye, D[pe] = Q, E = pe);
            else if (ve < F && 0 > u(be, Q)) D[E] = be, D[ve] = Q, E = ve;
            else break e;
          }
        }
        return q;
      }
      function u(D, q) {
        var Q = D.sortIndex - q.sortIndex;
        return Q !== 0 ? Q : D.id - q.id;
      }
      if (typeof performance == "object" && typeof performance.now == "function") {
        var d = performance;
        n.unstable_now = function() {
          return d.now();
        };
      } else {
        var f = Date, p = f.now();
        n.unstable_now = function() {
          return f.now() - p;
        };
      }
      var g = [], y = [], _ = 1, b = null, w = 3, P = false, M = false, k = false, R = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, W = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function H(D) {
        for (var q = l(y); q !== null; ) {
          if (q.callback === null) a(y);
          else if (q.startTime <= D) a(y), q.sortIndex = q.expirationTime, o(g, q);
          else break;
          q = l(y);
        }
      }
      function O(D) {
        if (k = false, H(D), !M) if (l(g) !== null) M = true, fe(j);
        else {
          var q = l(y);
          q !== null && ue(O, q.startTime - D);
        }
      }
      function j(D, q) {
        M = false, k && (k = false, L(K), K = -1), P = true;
        var Q = w;
        try {
          for (H(q), b = l(g); b !== null && (!(b.expirationTime > q) || D && !le()); ) {
            var E = b.callback;
            if (typeof E == "function") {
              b.callback = null, w = b.priorityLevel;
              var F = E(b.expirationTime <= q);
              q = n.unstable_now(), typeof F == "function" ? b.callback = F : b === l(g) && a(g), H(q);
            } else a(g);
            b = l(g);
          }
          if (b !== null) var ce = true;
          else {
            var pe = l(y);
            pe !== null && ue(O, pe.startTime - q), ce = false;
          }
          return ce;
        } finally {
          b = null, w = Q, P = false;
        }
      }
      var B = false, V = null, K = -1, Y = 5, X = -1;
      function le() {
        return !(n.unstable_now() - X < Y);
      }
      function re() {
        if (V !== null) {
          var D = n.unstable_now();
          X = D;
          var q = true;
          try {
            q = V(true, D);
          } finally {
            q ? ge() : (B = false, V = null);
          }
        } else B = false;
      }
      var ge;
      if (typeof W == "function") ge = function() {
        W(re);
      };
      else if (typeof MessageChannel < "u") {
        var he = new MessageChannel(), Ce = he.port2;
        he.port1.onmessage = re, ge = function() {
          Ce.postMessage(null);
        };
      } else ge = function() {
        R(re, 0);
      };
      function fe(D) {
        V = D, B || (B = true, ge());
      }
      function ue(D, q) {
        K = R(function() {
          D(n.unstable_now());
        }, q);
      }
      n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(D) {
        D.callback = null;
      }, n.unstable_continueExecution = function() {
        M || P || (M = true, fe(j));
      }, n.unstable_forceFrameRate = function(D) {
        0 > D || 125 < D ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Y = 0 < D ? Math.floor(1e3 / D) : 5;
      }, n.unstable_getCurrentPriorityLevel = function() {
        return w;
      }, n.unstable_getFirstCallbackNode = function() {
        return l(g);
      }, n.unstable_next = function(D) {
        switch (w) {
          case 1:
          case 2:
          case 3:
            var q = 3;
            break;
          default:
            q = w;
        }
        var Q = w;
        w = q;
        try {
          return D();
        } finally {
          w = Q;
        }
      }, n.unstable_pauseExecution = function() {
      }, n.unstable_requestPaint = function() {
      }, n.unstable_runWithPriority = function(D, q) {
        switch (D) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            D = 3;
        }
        var Q = w;
        w = D;
        try {
          return q();
        } finally {
          w = Q;
        }
      }, n.unstable_scheduleCallback = function(D, q, Q) {
        var E = n.unstable_now();
        switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? E + Q : E) : Q = E, D) {
          case 1:
            var F = -1;
            break;
          case 2:
            F = 250;
            break;
          case 5:
            F = 1073741823;
            break;
          case 4:
            F = 1e4;
            break;
          default:
            F = 5e3;
        }
        return F = Q + F, D = {
          id: _++,
          callback: q,
          priorityLevel: D,
          startTime: Q,
          expirationTime: F,
          sortIndex: -1
        }, Q > E ? (D.sortIndex = Q, o(y, D), l(g) === null && D === l(y) && (k ? (L(K), K = -1) : k = true, ue(O, Q - E))) : (D.sortIndex = F, o(g, D), M || P || (M = true, fe(j))), D;
      }, n.unstable_shouldYield = le, n.unstable_wrapCallback = function(D) {
        var q = w;
        return function() {
          var Q = w;
          w = q;
          try {
            return D.apply(this, arguments);
          } finally {
            w = Q;
          }
        };
      };
    }(va)), va;
  }
  var sf;
  function Rg() {
    return sf || (sf = 1, ya.exports = Tg()), ya.exports;
  }
  var af;
  function Mg() {
    if (af) return ct;
    af = 1;
    var n = za(), o = Rg();
    function l(e) {
      for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++) t += "&args[]=" + encodeURIComponent(arguments[r]);
      return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var a = /* @__PURE__ */ new Set(), u = {};
    function d(e, t) {
      f(e, t), f(e + "Capture", t);
    }
    function f(e, t) {
      for (u[e] = t, e = 0; e < t.length; e++) a.add(t[e]);
    }
    var p = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), g = Object.prototype.hasOwnProperty, y = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, _ = {}, b = {};
    function w(e) {
      return g.call(b, e) ? true : g.call(_, e) ? false : y.test(e) ? b[e] = true : (_[e] = true, false);
    }
    function P(e, t, r, i) {
      if (r !== null && r.type === 0) return false;
      switch (typeof t) {
        case "function":
        case "symbol":
          return true;
        case "boolean":
          return i ? false : r !== null ? !r.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
        default:
          return false;
      }
    }
    function M(e, t, r, i) {
      if (t === null || typeof t > "u" || P(e, t, r, i)) return true;
      if (i) return false;
      if (r !== null) switch (r.type) {
        case 3:
          return !t;
        case 4:
          return t === false;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
      return false;
    }
    function k(e, t, r, i, s, c, h) {
      this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = i, this.attributeNamespace = s, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = c, this.removeEmptyString = h;
    }
    var R = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
      R[e] = new k(e, 0, false, e, null, false, false);
    }), [
      [
        "acceptCharset",
        "accept-charset"
      ],
      [
        "className",
        "class"
      ],
      [
        "htmlFor",
        "for"
      ],
      [
        "httpEquiv",
        "http-equiv"
      ]
    ].forEach(function(e) {
      var t = e[0];
      R[t] = new k(t, 1, false, e[1], null, false, false);
    }), [
      "contentEditable",
      "draggable",
      "spellCheck",
      "value"
    ].forEach(function(e) {
      R[e] = new k(e, 2, false, e.toLowerCase(), null, false, false);
    }), [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha"
    ].forEach(function(e) {
      R[e] = new k(e, 2, false, e, null, false, false);
    }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
      R[e] = new k(e, 3, false, e.toLowerCase(), null, false, false);
    }), [
      "checked",
      "multiple",
      "muted",
      "selected"
    ].forEach(function(e) {
      R[e] = new k(e, 3, true, e, null, false, false);
    }), [
      "capture",
      "download"
    ].forEach(function(e) {
      R[e] = new k(e, 4, false, e, null, false, false);
    }), [
      "cols",
      "rows",
      "size",
      "span"
    ].forEach(function(e) {
      R[e] = new k(e, 6, false, e, null, false, false);
    }), [
      "rowSpan",
      "start"
    ].forEach(function(e) {
      R[e] = new k(e, 5, false, e.toLowerCase(), null, false, false);
    });
    var L = /[\-:]([a-z])/g;
    function W(e) {
      return e[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
      var t = e.replace(L, W);
      R[t] = new k(t, 1, false, e, null, false, false);
    }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
      var t = e.replace(L, W);
      R[t] = new k(t, 1, false, e, "http://www.w3.org/1999/xlink", false, false);
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
    ].forEach(function(e) {
      var t = e.replace(L, W);
      R[t] = new k(t, 1, false, e, "http://www.w3.org/XML/1998/namespace", false, false);
    }), [
      "tabIndex",
      "crossOrigin"
    ].forEach(function(e) {
      R[e] = new k(e, 1, false, e.toLowerCase(), null, false, false);
    }), R.xlinkHref = new k("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false), [
      "src",
      "href",
      "action",
      "formAction"
    ].forEach(function(e) {
      R[e] = new k(e, 1, false, e.toLowerCase(), null, true, true);
    });
    function H(e, t, r, i) {
      var s = R.hasOwnProperty(t) ? R[t] : null;
      (s !== null ? s.type !== 0 : i || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (M(t, r, s, i) && (r = null), i || s === null ? w(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r)) : s.mustUseProperty ? e[s.propertyName] = r === null ? s.type === 3 ? false : "" : r : (t = s.attributeName, i = s.attributeNamespace, r === null ? e.removeAttribute(t) : (s = s.type, r = s === 3 || s === 4 && r === true ? "" : "" + r, i ? e.setAttributeNS(i, t, r) : e.setAttribute(t, r))));
    }
    var O = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, j = Symbol.for("react.element"), B = Symbol.for("react.portal"), V = Symbol.for("react.fragment"), K = Symbol.for("react.strict_mode"), Y = Symbol.for("react.profiler"), X = Symbol.for("react.provider"), le = Symbol.for("react.context"), re = Symbol.for("react.forward_ref"), ge = Symbol.for("react.suspense"), he = Symbol.for("react.suspense_list"), Ce = Symbol.for("react.memo"), fe = Symbol.for("react.lazy"), ue = Symbol.for("react.offscreen"), D = Symbol.iterator;
    function q(e) {
      return e === null || typeof e != "object" ? null : (e = D && e[D] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var Q = Object.assign, E;
    function F(e) {
      if (E === void 0) try {
        throw Error();
      } catch (r) {
        var t = r.stack.trim().match(/\n( *(at )?)/);
        E = t && t[1] || "";
      }
      return `
` + E + e;
    }
    var ce = false;
    function pe(e, t) {
      if (!e || ce) return "";
      ce = true;
      var r = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (t) if (t = function() {
          throw Error();
        }, Object.defineProperty(t.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(t, []);
          } catch (A) {
            var i = A;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (A) {
            i = A;
          }
          e.call(t.prototype);
        }
        else {
          try {
            throw Error();
          } catch (A) {
            i = A;
          }
          e();
        }
      } catch (A) {
        if (A && i && typeof A.stack == "string") {
          for (var s = A.stack.split(`
`), c = i.stack.split(`
`), h = s.length - 1, v = c.length - 1; 1 <= h && 0 <= v && s[h] !== c[v]; ) v--;
          for (; 1 <= h && 0 <= v; h--, v--) if (s[h] !== c[v]) {
            if (h !== 1 || v !== 1) do
              if (h--, v--, 0 > v || s[h] !== c[v]) {
                var S = `
` + s[h].replace(" at new ", " at ");
                return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), S;
              }
            while (1 <= h && 0 <= v);
            break;
          }
        }
      } finally {
        ce = false, Error.prepareStackTrace = r;
      }
      return (e = e ? e.displayName || e.name : "") ? F(e) : "";
    }
    function ye(e) {
      switch (e.tag) {
        case 5:
          return F(e.type);
        case 16:
          return F("Lazy");
        case 13:
          return F("Suspense");
        case 19:
          return F("SuspenseList");
        case 0:
        case 2:
        case 15:
          return e = pe(e.type, false), e;
        case 11:
          return e = pe(e.type.render, false), e;
        case 1:
          return e = pe(e.type, true), e;
        default:
          return "";
      }
    }
    function ve(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case V:
          return "Fragment";
        case B:
          return "Portal";
        case Y:
          return "Profiler";
        case K:
          return "StrictMode";
        case ge:
          return "Suspense";
        case he:
          return "SuspenseList";
      }
      if (typeof e == "object") switch (e.$$typeof) {
        case le:
          return (e.displayName || "Context") + ".Consumer";
        case X:
          return (e._context.displayName || "Context") + ".Provider";
        case re:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Ce:
          return t = e.displayName || null, t !== null ? t : ve(e.type) || "Memo";
        case fe:
          t = e._payload, e = e._init;
          try {
            return ve(e(t));
          } catch {
          }
      }
      return null;
    }
    function be(e) {
      var t = e.type;
      switch (e.tag) {
        case 24:
          return "Cache";
        case 9:
          return (t.displayName || "Context") + ".Consumer";
        case 10:
          return (t._context.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
          return "Fragment";
        case 5:
          return t;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return ve(t);
        case 8:
          return t === K ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
          if (typeof t == "function") return t.displayName || t.name || null;
          if (typeof t == "string") return t;
      }
      return null;
    }
    function Se(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return e;
        default:
          return "";
      }
    }
    function Pe(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function et(e) {
      var t = Pe(e) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), i = "" + e[t];
      if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
        var s = r.get, c = r.set;
        return Object.defineProperty(e, t, {
          configurable: true,
          get: function() {
            return s.call(this);
          },
          set: function(h) {
            i = "" + h, c.call(this, h);
          }
        }), Object.defineProperty(e, t, {
          enumerable: r.enumerable
        }), {
          getValue: function() {
            return i;
          },
          setValue: function(h) {
            i = "" + h;
          },
          stopTracking: function() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }
    function Zn(e) {
      e._valueTracker || (e._valueTracker = et(e));
    }
    function Do(e) {
      if (!e) return false;
      var t = e._valueTracker;
      if (!t) return true;
      var r = t.getValue(), i = "";
      return e && (i = Pe(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== r ? (t.setValue(e), true) : false;
    }
    function Yt(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function bl(e, t) {
      var r = t.checked;
      return Q({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: r ?? e._wrapperState.initialChecked
      });
    }
    function au(e, t) {
      var r = t.defaultValue == null ? "" : t.defaultValue, i = t.checked != null ? t.checked : t.defaultChecked;
      r = Se(t.value != null ? t.value : r), e._wrapperState = {
        initialChecked: i,
        initialValue: r,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
      };
    }
    function uu(e, t) {
      t = t.checked, t != null && H(e, "checked", t, false);
    }
    function Sl(e, t) {
      uu(e, t);
      var r = Se(t.value), i = t.type;
      if (r != null) i === "number" ? (r === 0 && e.value === "" || e.value != r) && (e.value = "" + r) : e.value !== "" + r && (e.value = "" + r);
      else if (i === "submit" || i === "reset") {
        e.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? xl(e, t.type, r) : t.hasOwnProperty("defaultValue") && xl(e, t.type, Se(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
    }
    function cu(e, t, r) {
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var i = t.type;
        if (!(i !== "submit" && i !== "reset" || t.value !== void 0 && t.value !== null)) return;
        t = "" + e._wrapperState.initialValue, r || t === e.value || (e.value = t), e.defaultValue = t;
      }
      r = e.name, r !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, r !== "" && (e.name = r);
    }
    function xl(e, t, r) {
      (t !== "number" || Yt(e.ownerDocument) !== e) && (r == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
    }
    var Ir = Array.isArray;
    function er(e, t, r, i) {
      if (e = e.options, t) {
        t = {};
        for (var s = 0; s < r.length; s++) t["$" + r[s]] = true;
        for (r = 0; r < e.length; r++) s = t.hasOwnProperty("$" + e[r].value), e[r].selected !== s && (e[r].selected = s), s && i && (e[r].defaultSelected = true);
      } else {
        for (r = "" + Se(r), t = null, s = 0; s < e.length; s++) {
          if (e[s].value === r) {
            e[s].selected = true, i && (e[s].defaultSelected = true);
            return;
          }
          t !== null || e[s].disabled || (t = e[s]);
        }
        t !== null && (t.selected = true);
      }
    }
    function kl(e, t) {
      if (t.dangerouslySetInnerHTML != null) throw Error(l(91));
      return Q({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
      });
    }
    function du(e, t) {
      var r = t.value;
      if (r == null) {
        if (r = t.children, t = t.defaultValue, r != null) {
          if (t != null) throw Error(l(92));
          if (Ir(r)) {
            if (1 < r.length) throw Error(l(93));
            r = r[0];
          }
          t = r;
        }
        t == null && (t = ""), r = t;
      }
      e._wrapperState = {
        initialValue: Se(r)
      };
    }
    function fu(e, t) {
      var r = Se(t.value), i = Se(t.defaultValue);
      r != null && (r = "" + r, r !== e.value && (e.value = r), t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)), i != null && (e.defaultValue = "" + i);
    }
    function pu(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
    }
    function hu(e) {
      switch (e) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function Cl(e, t) {
      return e == null || e === "http://www.w3.org/1999/xhtml" ? hu(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
    }
    var Bo, mu = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, i, s) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, r, i, s);
        });
      } : e;
    }(function(e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
      else {
        for (Bo = Bo || document.createElement("div"), Bo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Bo.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
    function Wr(e, t) {
      if (t) {
        var r = e.firstChild;
        if (r && r === e.lastChild && r.nodeType === 3) {
          r.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var Hr = {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    }, Ph = [
      "Webkit",
      "ms",
      "Moz",
      "O"
    ];
    Object.keys(Hr).forEach(function(e) {
      Ph.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1), Hr[t] = Hr[e];
      });
    });
    function gu(e, t, r) {
      return t == null || typeof t == "boolean" || t === "" ? "" : r || typeof t != "number" || t === 0 || Hr.hasOwnProperty(e) && Hr[e] ? ("" + t).trim() : t + "px";
    }
    function yu(e, t) {
      e = e.style;
      for (var r in t) if (t.hasOwnProperty(r)) {
        var i = r.indexOf("--") === 0, s = gu(r, t[r], i);
        r === "float" && (r = "cssFloat"), i ? e.setProperty(r, s) : e[r] = s;
      }
    }
    var Eh = Q({
      menuitem: true
    }, {
      area: true,
      base: true,
      br: true,
      col: true,
      embed: true,
      hr: true,
      img: true,
      input: true,
      keygen: true,
      link: true,
      meta: true,
      param: true,
      source: true,
      track: true,
      wbr: true
    });
    function Pl(e, t) {
      if (t) {
        if (Eh[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(l(137, e));
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null) throw Error(l(60));
          if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(l(61));
        }
        if (t.style != null && typeof t.style != "object") throw Error(l(62));
      }
    }
    function El(e, t) {
      if (e.indexOf("-") === -1) return typeof t.is == "string";
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return false;
        default:
          return true;
      }
    }
    var Tl = null;
    function Rl(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    var Ml = null, tr = null, nr = null;
    function vu(e) {
      if (e = co(e)) {
        if (typeof Ml != "function") throw Error(l(280));
        var t = e.stateNode;
        t && (t = li(t), Ml(e.stateNode, e.type, t));
      }
    }
    function _u(e) {
      tr ? nr ? nr.push(e) : nr = [
        e
      ] : tr = e;
    }
    function wu() {
      if (tr) {
        var e = tr, t = nr;
        if (nr = tr = null, vu(e), t) for (e = 0; e < t.length; e++) vu(t[e]);
      }
    }
    function bu(e, t) {
      return e(t);
    }
    function Su() {
    }
    var Nl = false;
    function xu(e, t, r) {
      if (Nl) return e(t, r);
      Nl = true;
      try {
        return bu(e, t, r);
      } finally {
        Nl = false, (tr !== null || nr !== null) && (Su(), wu());
      }
    }
    function Ur(e, t) {
      var r = e.stateNode;
      if (r === null) return null;
      var i = li(r);
      if (i === null) return null;
      r = i[t];
      e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
          break e;
        default:
          e = false;
      }
      if (e) return null;
      if (r && typeof r != "function") throw Error(l(231, t, typeof r));
      return r;
    }
    var Al = false;
    if (p) try {
      var Vr = {};
      Object.defineProperty(Vr, "passive", {
        get: function() {
          Al = true;
        }
      }), window.addEventListener("test", Vr, Vr), window.removeEventListener("test", Vr, Vr);
    } catch {
      Al = false;
    }
    function Th(e, t, r, i, s, c, h, v, S) {
      var A = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(r, A);
      } catch (I) {
        this.onError(I);
      }
    }
    var $r = false, Fo = null, zo = false, Ll = null, Rh = {
      onError: function(e) {
        $r = true, Fo = e;
      }
    };
    function Mh(e, t, r, i, s, c, h, v, S) {
      $r = false, Fo = null, Th.apply(Rh, arguments);
    }
    function Nh(e, t, r, i, s, c, h, v, S) {
      if (Mh.apply(this, arguments), $r) {
        if ($r) {
          var A = Fo;
          $r = false, Fo = null;
        } else throw Error(l(198));
        zo || (zo = true, Ll = A);
      }
    }
    function Fn(e) {
      var t = e, r = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do
          t = e, t.flags & 4098 && (r = t.return), e = t.return;
        while (e);
      }
      return t.tag === 3 ? r : null;
    }
    function ku(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function Cu(e) {
      if (Fn(e) !== e) throw Error(l(188));
    }
    function Ah(e) {
      var t = e.alternate;
      if (!t) {
        if (t = Fn(e), t === null) throw Error(l(188));
        return t !== e ? null : e;
      }
      for (var r = e, i = t; ; ) {
        var s = r.return;
        if (s === null) break;
        var c = s.alternate;
        if (c === null) {
          if (i = s.return, i !== null) {
            r = i;
            continue;
          }
          break;
        }
        if (s.child === c.child) {
          for (c = s.child; c; ) {
            if (c === r) return Cu(s), e;
            if (c === i) return Cu(s), t;
            c = c.sibling;
          }
          throw Error(l(188));
        }
        if (r.return !== i.return) r = s, i = c;
        else {
          for (var h = false, v = s.child; v; ) {
            if (v === r) {
              h = true, r = s, i = c;
              break;
            }
            if (v === i) {
              h = true, i = s, r = c;
              break;
            }
            v = v.sibling;
          }
          if (!h) {
            for (v = c.child; v; ) {
              if (v === r) {
                h = true, r = c, i = s;
                break;
              }
              if (v === i) {
                h = true, i = c, r = s;
                break;
              }
              v = v.sibling;
            }
            if (!h) throw Error(l(189));
          }
        }
        if (r.alternate !== i) throw Error(l(190));
      }
      if (r.tag !== 3) throw Error(l(188));
      return r.stateNode.current === r ? e : t;
    }
    function Pu(e) {
      return e = Ah(e), e !== null ? Eu(e) : null;
    }
    function Eu(e) {
      if (e.tag === 5 || e.tag === 6) return e;
      for (e = e.child; e !== null; ) {
        var t = Eu(e);
        if (t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var Tu = o.unstable_scheduleCallback, Ru = o.unstable_cancelCallback, Lh = o.unstable_shouldYield, Oh = o.unstable_requestPaint, De = o.unstable_now, jh = o.unstable_getCurrentPriorityLevel, Ol = o.unstable_ImmediatePriority, Mu = o.unstable_UserBlockingPriority, Io = o.unstable_NormalPriority, Dh = o.unstable_LowPriority, Nu = o.unstable_IdlePriority, Wo = null, Bt = null;
    function Bh(e) {
      if (Bt && typeof Bt.onCommitFiberRoot == "function") try {
        Bt.onCommitFiberRoot(Wo, e, void 0, (e.current.flags & 128) === 128);
      } catch {
      }
    }
    var Ct = Math.clz32 ? Math.clz32 : Ih, Fh = Math.log, zh = Math.LN2;
    function Ih(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (Fh(e) / zh | 0) | 0;
    }
    var Ho = 64, Uo = 4194304;
    function Gr(e) {
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return e & 130023424;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 1073741824;
        default:
          return e;
      }
    }
    function Vo(e, t) {
      var r = e.pendingLanes;
      if (r === 0) return 0;
      var i = 0, s = e.suspendedLanes, c = e.pingedLanes, h = r & 268435455;
      if (h !== 0) {
        var v = h & ~s;
        v !== 0 ? i = Gr(v) : (c &= h, c !== 0 && (i = Gr(c)));
      } else h = r & ~s, h !== 0 ? i = Gr(h) : c !== 0 && (i = Gr(c));
      if (i === 0) return 0;
      if (t !== 0 && t !== i && !(t & s) && (s = i & -i, c = t & -t, s >= c || s === 16 && (c & 4194240) !== 0)) return t;
      if (i & 4 && (i |= r & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= i; 0 < t; ) r = 31 - Ct(t), s = 1 << r, i |= e[r], t &= ~s;
      return i;
    }
    function Wh(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
          return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function Hh(e, t) {
      for (var r = e.suspendedLanes, i = e.pingedLanes, s = e.expirationTimes, c = e.pendingLanes; 0 < c; ) {
        var h = 31 - Ct(c), v = 1 << h, S = s[h];
        S === -1 ? (!(v & r) || v & i) && (s[h] = Wh(v, t)) : S <= t && (e.expiredLanes |= v), c &= ~v;
      }
    }
    function jl(e) {
      return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
    }
    function Au() {
      var e = Ho;
      return Ho <<= 1, !(Ho & 4194240) && (Ho = 64), e;
    }
    function Dl(e) {
      for (var t = [], r = 0; 31 > r; r++) t.push(e);
      return t;
    }
    function Kr(e, t, r) {
      e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ct(t), e[t] = r;
    }
    function Uh(e, t) {
      var r = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
      var i = e.eventTimes;
      for (e = e.expirationTimes; 0 < r; ) {
        var s = 31 - Ct(r), c = 1 << s;
        t[s] = 0, i[s] = -1, e[s] = -1, r &= ~c;
      }
    }
    function Bl(e, t) {
      var r = e.entangledLanes |= t;
      for (e = e.entanglements; r; ) {
        var i = 31 - Ct(r), s = 1 << i;
        s & t | e[i] & t && (e[i] |= t), r &= ~s;
      }
    }
    var ke = 0;
    function Lu(e) {
      return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
    }
    var Ou, Fl, ju, Du, Bu, zl = false, $o = [], an = null, un = null, cn = null, Qr = /* @__PURE__ */ new Map(), Yr = /* @__PURE__ */ new Map(), dn = [], Vh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function Fu(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          an = null;
          break;
        case "dragenter":
        case "dragleave":
          un = null;
          break;
        case "mouseover":
        case "mouseout":
          cn = null;
          break;
        case "pointerover":
        case "pointerout":
          Qr.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Yr.delete(t.pointerId);
      }
    }
    function qr(e, t, r, i, s, c) {
      return e === null || e.nativeEvent !== c ? (e = {
        blockedOn: t,
        domEventName: r,
        eventSystemFlags: i,
        nativeEvent: c,
        targetContainers: [
          s
        ]
      }, t !== null && (t = co(t), t !== null && Fl(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
    }
    function $h(e, t, r, i, s) {
      switch (t) {
        case "focusin":
          return an = qr(an, e, t, r, i, s), true;
        case "dragenter":
          return un = qr(un, e, t, r, i, s), true;
        case "mouseover":
          return cn = qr(cn, e, t, r, i, s), true;
        case "pointerover":
          var c = s.pointerId;
          return Qr.set(c, qr(Qr.get(c) || null, e, t, r, i, s)), true;
        case "gotpointercapture":
          return c = s.pointerId, Yr.set(c, qr(Yr.get(c) || null, e, t, r, i, s)), true;
      }
      return false;
    }
    function zu(e) {
      var t = zn(e.target);
      if (t !== null) {
        var r = Fn(t);
        if (r !== null) {
          if (t = r.tag, t === 13) {
            if (t = ku(r), t !== null) {
              e.blockedOn = t, Bu(e.priority, function() {
                ju(r);
              });
              return;
            }
          } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
            e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function Go(e) {
      if (e.blockedOn !== null) return false;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var r = Wl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (r === null) {
          r = e.nativeEvent;
          var i = new r.constructor(r.type, r);
          Tl = i, r.target.dispatchEvent(i), Tl = null;
        } else return t = co(r), t !== null && Fl(t), e.blockedOn = r, false;
        t.shift();
      }
      return true;
    }
    function Iu(e, t, r) {
      Go(e) && r.delete(t);
    }
    function Gh() {
      zl = false, an !== null && Go(an) && (an = null), un !== null && Go(un) && (un = null), cn !== null && Go(cn) && (cn = null), Qr.forEach(Iu), Yr.forEach(Iu);
    }
    function Xr(e, t) {
      e.blockedOn === t && (e.blockedOn = null, zl || (zl = true, o.unstable_scheduleCallback(o.unstable_NormalPriority, Gh)));
    }
    function Jr(e) {
      function t(s) {
        return Xr(s, e);
      }
      if (0 < $o.length) {
        Xr($o[0], e);
        for (var r = 1; r < $o.length; r++) {
          var i = $o[r];
          i.blockedOn === e && (i.blockedOn = null);
        }
      }
      for (an !== null && Xr(an, e), un !== null && Xr(un, e), cn !== null && Xr(cn, e), Qr.forEach(t), Yr.forEach(t), r = 0; r < dn.length; r++) i = dn[r], i.blockedOn === e && (i.blockedOn = null);
      for (; 0 < dn.length && (r = dn[0], r.blockedOn === null); ) zu(r), r.blockedOn === null && dn.shift();
    }
    var rr = O.ReactCurrentBatchConfig, Ko = true;
    function Kh(e, t, r, i) {
      var s = ke, c = rr.transition;
      rr.transition = null;
      try {
        ke = 1, Il(e, t, r, i);
      } finally {
        ke = s, rr.transition = c;
      }
    }
    function Qh(e, t, r, i) {
      var s = ke, c = rr.transition;
      rr.transition = null;
      try {
        ke = 4, Il(e, t, r, i);
      } finally {
        ke = s, rr.transition = c;
      }
    }
    function Il(e, t, r, i) {
      if (Ko) {
        var s = Wl(e, t, r, i);
        if (s === null) os(e, t, i, Qo, r), Fu(e, i);
        else if ($h(s, e, t, r, i)) i.stopPropagation();
        else if (Fu(e, i), t & 4 && -1 < Vh.indexOf(e)) {
          for (; s !== null; ) {
            var c = co(s);
            if (c !== null && Ou(c), c = Wl(e, t, r, i), c === null && os(e, t, i, Qo, r), c === s) break;
            s = c;
          }
          s !== null && i.stopPropagation();
        } else os(e, t, i, null, r);
      }
    }
    var Qo = null;
    function Wl(e, t, r, i) {
      if (Qo = null, e = Rl(i), e = zn(e), e !== null) if (t = Fn(e), t === null) e = null;
      else if (r = t.tag, r === 13) {
        if (e = ku(t), e !== null) return e;
        e = null;
      } else if (r === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
      return Qo = e, null;
    }
    function Wu(e) {
      switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 4;
        case "message":
          switch (jh()) {
            case Ol:
              return 1;
            case Mu:
              return 4;
            case Io:
            case Dh:
              return 16;
            case Nu:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var fn = null, Hl = null, Yo = null;
    function Hu() {
      if (Yo) return Yo;
      var e, t = Hl, r = t.length, i, s = "value" in fn ? fn.value : fn.textContent, c = s.length;
      for (e = 0; e < r && t[e] === s[e]; e++) ;
      var h = r - e;
      for (i = 1; i <= h && t[r - i] === s[c - i]; i++) ;
      return Yo = s.slice(e, 1 < i ? 1 - i : void 0);
    }
    function qo(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function Xo() {
      return true;
    }
    function Uu() {
      return false;
    }
    function dt(e) {
      function t(r, i, s, c, h) {
        this._reactName = r, this._targetInst = s, this.type = i, this.nativeEvent = c, this.target = h, this.currentTarget = null;
        for (var v in e) e.hasOwnProperty(v) && (r = e[v], this[v] = r ? r(c) : c[v]);
        return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === false) ? Xo : Uu, this.isPropagationStopped = Uu, this;
      }
      return Q(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = true;
          var r = this.nativeEvent;
          r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = false), this.isDefaultPrevented = Xo);
        },
        stopPropagation: function() {
          var r = this.nativeEvent;
          r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = true), this.isPropagationStopped = Xo);
        },
        persist: function() {
        },
        isPersistent: Xo
      }), t;
    }
    var or = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Ul = dt(or), Zr = Q({}, or, {
      view: 0,
      detail: 0
    }), Yh = dt(Zr), Vl, $l, eo, Jo = Q({}, Zr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Kl,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== eo && (eo && e.type === "mousemove" ? (Vl = e.screenX - eo.screenX, $l = e.screenY - eo.screenY) : $l = Vl = 0, eo = e), Vl);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : $l;
      }
    }), Vu = dt(Jo), qh = Q({}, Jo, {
      dataTransfer: 0
    }), Xh = dt(qh), Jh = Q({}, Zr, {
      relatedTarget: 0
    }), Gl = dt(Jh), Zh = Q({}, or, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), em = dt(Zh), tm = Q({}, or, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), nm = dt(tm), rm = Q({}, or, {
      data: 0
    }), $u = dt(rm), om = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, im = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    }, lm = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function sm(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = lm[e]) ? !!t[e] : false;
    }
    function Kl() {
      return sm;
    }
    var am = Q({}, Zr, {
      key: function(e) {
        if (e.key) {
          var t = om[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = qo(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? im[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Kl,
      charCode: function(e) {
        return e.type === "keypress" ? qo(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? qo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), um = dt(am), cm = Q({}, Jo, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), Gu = dt(cm), dm = Q({}, Zr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Kl
    }), fm = dt(dm), pm = Q({}, or, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), hm = dt(pm), mm = Q({}, Jo, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), gm = dt(mm), ym = [
      9,
      13,
      27,
      32
    ], Ql = p && "CompositionEvent" in window, to = null;
    p && "documentMode" in document && (to = document.documentMode);
    var vm = p && "TextEvent" in window && !to, Ku = p && (!Ql || to && 8 < to && 11 >= to), Qu = " ", Yu = false;
    function qu(e, t) {
      switch (e) {
        case "keyup":
          return ym.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function Xu(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    var ir = false;
    function _m(e, t) {
      switch (e) {
        case "compositionend":
          return Xu(t);
        case "keypress":
          return t.which !== 32 ? null : (Yu = true, Qu);
        case "textInput":
          return e = t.data, e === Qu && Yu ? null : e;
        default:
          return null;
      }
    }
    function wm(e, t) {
      if (ir) return e === "compositionend" || !Ql && qu(e, t) ? (e = Hu(), Yo = Hl = fn = null, ir = false, e) : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return Ku && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var bm = {
      color: true,
      date: true,
      datetime: true,
      "datetime-local": true,
      email: true,
      month: true,
      number: true,
      password: true,
      range: true,
      search: true,
      tel: true,
      text: true,
      time: true,
      url: true,
      week: true
    };
    function Ju(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!bm[e.type] : t === "textarea";
    }
    function Zu(e, t, r, i) {
      _u(i), t = ri(t, "onChange"), 0 < t.length && (r = new Ul("onChange", "change", null, r, i), e.push({
        event: r,
        listeners: t
      }));
    }
    var no = null, ro = null;
    function Sm(e) {
      yc(e, 0);
    }
    function Zo(e) {
      var t = cr(e);
      if (Do(t)) return e;
    }
    function xm(e, t) {
      if (e === "change") return t;
    }
    var ec = false;
    if (p) {
      var Yl;
      if (p) {
        var ql = "oninput" in document;
        if (!ql) {
          var tc = document.createElement("div");
          tc.setAttribute("oninput", "return;"), ql = typeof tc.oninput == "function";
        }
        Yl = ql;
      } else Yl = false;
      ec = Yl && (!document.documentMode || 9 < document.documentMode);
    }
    function nc() {
      no && (no.detachEvent("onpropertychange", rc), ro = no = null);
    }
    function rc(e) {
      if (e.propertyName === "value" && Zo(ro)) {
        var t = [];
        Zu(t, ro, e, Rl(e)), xu(Sm, t);
      }
    }
    function km(e, t, r) {
      e === "focusin" ? (nc(), no = t, ro = r, no.attachEvent("onpropertychange", rc)) : e === "focusout" && nc();
    }
    function Cm(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown") return Zo(ro);
    }
    function Pm(e, t) {
      if (e === "click") return Zo(t);
    }
    function Em(e, t) {
      if (e === "input" || e === "change") return Zo(t);
    }
    function Tm(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Pt = typeof Object.is == "function" ? Object.is : Tm;
    function oo(e, t) {
      if (Pt(e, t)) return true;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null) return false;
      var r = Object.keys(e), i = Object.keys(t);
      if (r.length !== i.length) return false;
      for (i = 0; i < r.length; i++) {
        var s = r[i];
        if (!g.call(t, s) || !Pt(e[s], t[s])) return false;
      }
      return true;
    }
    function oc(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function ic(e, t) {
      var r = oc(e);
      e = 0;
      for (var i; r; ) {
        if (r.nodeType === 3) {
          if (i = e + r.textContent.length, e <= t && i >= t) return {
            node: r,
            offset: t - e
          };
          e = i;
        }
        e: {
          for (; r; ) {
            if (r.nextSibling) {
              r = r.nextSibling;
              break e;
            }
            r = r.parentNode;
          }
          r = void 0;
        }
        r = oc(r);
      }
    }
    function lc(e, t) {
      return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? lc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
    }
    function sc() {
      for (var e = window, t = Yt(); t instanceof e.HTMLIFrameElement; ) {
        try {
          var r = typeof t.contentWindow.location.href == "string";
        } catch {
          r = false;
        }
        if (r) e = t.contentWindow;
        else break;
        t = Yt(e.document);
      }
      return t;
    }
    function Xl(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function Rm(e) {
      var t = sc(), r = e.focusedElem, i = e.selectionRange;
      if (t !== r && r && r.ownerDocument && lc(r.ownerDocument.documentElement, r)) {
        if (i !== null && Xl(r)) {
          if (t = i.start, e = i.end, e === void 0 && (e = t), "selectionStart" in r) r.selectionStart = t, r.selectionEnd = Math.min(e, r.value.length);
          else if (e = (t = r.ownerDocument || document) && t.defaultView || window, e.getSelection) {
            e = e.getSelection();
            var s = r.textContent.length, c = Math.min(i.start, s);
            i = i.end === void 0 ? c : Math.min(i.end, s), !e.extend && c > i && (s = i, i = c, c = s), s = ic(r, c);
            var h = ic(r, i);
            s && h && (e.rangeCount !== 1 || e.anchorNode !== s.node || e.anchorOffset !== s.offset || e.focusNode !== h.node || e.focusOffset !== h.offset) && (t = t.createRange(), t.setStart(s.node, s.offset), e.removeAllRanges(), c > i ? (e.addRange(t), e.extend(h.node, h.offset)) : (t.setEnd(h.node, h.offset), e.addRange(t)));
          }
        }
        for (t = [], e = r; e = e.parentNode; ) e.nodeType === 1 && t.push({
          element: e,
          left: e.scrollLeft,
          top: e.scrollTop
        });
        for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++) e = t[r], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
      }
    }
    var Mm = p && "documentMode" in document && 11 >= document.documentMode, lr = null, Jl = null, io = null, Zl = false;
    function ac(e, t, r) {
      var i = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
      Zl || lr == null || lr !== Yt(i) || (i = lr, "selectionStart" in i && Xl(i) ? i = {
        start: i.selectionStart,
        end: i.selectionEnd
      } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
        anchorNode: i.anchorNode,
        anchorOffset: i.anchorOffset,
        focusNode: i.focusNode,
        focusOffset: i.focusOffset
      }), io && oo(io, i) || (io = i, i = ri(Jl, "onSelect"), 0 < i.length && (t = new Ul("onSelect", "select", null, t, r), e.push({
        event: t,
        listeners: i
      }), t.target = lr)));
    }
    function ei(e, t) {
      var r = {};
      return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
    }
    var sr = {
      animationend: ei("Animation", "AnimationEnd"),
      animationiteration: ei("Animation", "AnimationIteration"),
      animationstart: ei("Animation", "AnimationStart"),
      transitionend: ei("Transition", "TransitionEnd")
    }, es = {}, uc = {};
    p && (uc = document.createElement("div").style, "AnimationEvent" in window || (delete sr.animationend.animation, delete sr.animationiteration.animation, delete sr.animationstart.animation), "TransitionEvent" in window || delete sr.transitionend.transition);
    function ti(e) {
      if (es[e]) return es[e];
      if (!sr[e]) return e;
      var t = sr[e], r;
      for (r in t) if (t.hasOwnProperty(r) && r in uc) return es[e] = t[r];
      return e;
    }
    var cc = ti("animationend"), dc = ti("animationiteration"), fc = ti("animationstart"), pc = ti("transitionend"), hc = /* @__PURE__ */ new Map(), mc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    function pn(e, t) {
      hc.set(e, t), d(t, [
        e
      ]);
    }
    for (var ts = 0; ts < mc.length; ts++) {
      var ns = mc[ts], Nm = ns.toLowerCase(), Am = ns[0].toUpperCase() + ns.slice(1);
      pn(Nm, "on" + Am);
    }
    pn(cc, "onAnimationEnd"), pn(dc, "onAnimationIteration"), pn(fc, "onAnimationStart"), pn("dblclick", "onDoubleClick"), pn("focusin", "onFocus"), pn("focusout", "onBlur"), pn(pc, "onTransitionEnd"), f("onMouseEnter", [
      "mouseout",
      "mouseover"
    ]), f("onMouseLeave", [
      "mouseout",
      "mouseover"
    ]), f("onPointerEnter", [
      "pointerout",
      "pointerover"
    ]), f("onPointerLeave", [
      "pointerout",
      "pointerover"
    ]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var lo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Lm = new Set("cancel close invalid load scroll toggle".split(" ").concat(lo));
    function gc(e, t, r) {
      var i = e.type || "unknown-event";
      e.currentTarget = r, Nh(i, t, void 0, e), e.currentTarget = null;
    }
    function yc(e, t) {
      t = (t & 4) !== 0;
      for (var r = 0; r < e.length; r++) {
        var i = e[r], s = i.event;
        i = i.listeners;
        e: {
          var c = void 0;
          if (t) for (var h = i.length - 1; 0 <= h; h--) {
            var v = i[h], S = v.instance, A = v.currentTarget;
            if (v = v.listener, S !== c && s.isPropagationStopped()) break e;
            gc(s, v, A), c = S;
          }
          else for (h = 0; h < i.length; h++) {
            if (v = i[h], S = v.instance, A = v.currentTarget, v = v.listener, S !== c && s.isPropagationStopped()) break e;
            gc(s, v, A), c = S;
          }
        }
      }
      if (zo) throw e = Ll, zo = false, Ll = null, e;
    }
    function Re(e, t) {
      var r = t[cs];
      r === void 0 && (r = t[cs] = /* @__PURE__ */ new Set());
      var i = e + "__bubble";
      r.has(i) || (vc(t, e, 2, false), r.add(i));
    }
    function rs(e, t, r) {
      var i = 0;
      t && (i |= 4), vc(r, e, i, t);
    }
    var ni = "_reactListening" + Math.random().toString(36).slice(2);
    function so(e) {
      if (!e[ni]) {
        e[ni] = true, a.forEach(function(r) {
          r !== "selectionchange" && (Lm.has(r) || rs(r, false, e), rs(r, true, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[ni] || (t[ni] = true, rs("selectionchange", false, t));
      }
    }
    function vc(e, t, r, i) {
      switch (Wu(t)) {
        case 1:
          var s = Kh;
          break;
        case 4:
          s = Qh;
          break;
        default:
          s = Il;
      }
      r = s.bind(null, t, r, e), s = void 0, !Al || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = true), i ? s !== void 0 ? e.addEventListener(t, r, {
        capture: true,
        passive: s
      }) : e.addEventListener(t, r, true) : s !== void 0 ? e.addEventListener(t, r, {
        passive: s
      }) : e.addEventListener(t, r, false);
    }
    function os(e, t, r, i, s) {
      var c = i;
      if (!(t & 1) && !(t & 2) && i !== null) e: for (; ; ) {
        if (i === null) return;
        var h = i.tag;
        if (h === 3 || h === 4) {
          var v = i.stateNode.containerInfo;
          if (v === s || v.nodeType === 8 && v.parentNode === s) break;
          if (h === 4) for (h = i.return; h !== null; ) {
            var S = h.tag;
            if ((S === 3 || S === 4) && (S = h.stateNode.containerInfo, S === s || S.nodeType === 8 && S.parentNode === s)) return;
            h = h.return;
          }
          for (; v !== null; ) {
            if (h = zn(v), h === null) return;
            if (S = h.tag, S === 5 || S === 6) {
              i = c = h;
              continue e;
            }
            v = v.parentNode;
          }
        }
        i = i.return;
      }
      xu(function() {
        var A = c, I = Rl(r), U = [];
        e: {
          var z = hc.get(e);
          if (z !== void 0) {
            var J = Ul, ee = e;
            switch (e) {
              case "keypress":
                if (qo(r) === 0) break e;
              case "keydown":
              case "keyup":
                J = um;
                break;
              case "focusin":
                ee = "focus", J = Gl;
                break;
              case "focusout":
                ee = "blur", J = Gl;
                break;
              case "beforeblur":
              case "afterblur":
                J = Gl;
                break;
              case "click":
                if (r.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                J = Vu;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                J = Xh;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                J = fm;
                break;
              case cc:
              case dc:
              case fc:
                J = em;
                break;
              case pc:
                J = hm;
                break;
              case "scroll":
                J = Yh;
                break;
              case "wheel":
                J = gm;
                break;
              case "copy":
              case "cut":
              case "paste":
                J = nm;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                J = Gu;
            }
            var te = (t & 4) !== 0, Be = !te && e === "scroll", T = te ? z !== null ? z + "Capture" : null : z;
            te = [];
            for (var C = A, N; C !== null; ) {
              N = C;
              var $ = N.stateNode;
              if (N.tag === 5 && $ !== null && (N = $, T !== null && ($ = Ur(C, T), $ != null && te.push(ao(C, $, N)))), Be) break;
              C = C.return;
            }
            0 < te.length && (z = new J(z, ee, null, r, I), U.push({
              event: z,
              listeners: te
            }));
          }
        }
        if (!(t & 7)) {
          e: {
            if (z = e === "mouseover" || e === "pointerover", J = e === "mouseout" || e === "pointerout", z && r !== Tl && (ee = r.relatedTarget || r.fromElement) && (zn(ee) || ee[qt])) break e;
            if ((J || z) && (z = I.window === I ? I : (z = I.ownerDocument) ? z.defaultView || z.parentWindow : window, J ? (ee = r.relatedTarget || r.toElement, J = A, ee = ee ? zn(ee) : null, ee !== null && (Be = Fn(ee), ee !== Be || ee.tag !== 5 && ee.tag !== 6) && (ee = null)) : (J = null, ee = A), J !== ee)) {
              if (te = Vu, $ = "onMouseLeave", T = "onMouseEnter", C = "mouse", (e === "pointerout" || e === "pointerover") && (te = Gu, $ = "onPointerLeave", T = "onPointerEnter", C = "pointer"), Be = J == null ? z : cr(J), N = ee == null ? z : cr(ee), z = new te($, C + "leave", J, r, I), z.target = Be, z.relatedTarget = N, $ = null, zn(I) === A && (te = new te(T, C + "enter", ee, r, I), te.target = N, te.relatedTarget = Be, $ = te), Be = $, J && ee) t: {
                for (te = J, T = ee, C = 0, N = te; N; N = ar(N)) C++;
                for (N = 0, $ = T; $; $ = ar($)) N++;
                for (; 0 < C - N; ) te = ar(te), C--;
                for (; 0 < N - C; ) T = ar(T), N--;
                for (; C--; ) {
                  if (te === T || T !== null && te === T.alternate) break t;
                  te = ar(te), T = ar(T);
                }
                te = null;
              }
              else te = null;
              J !== null && _c(U, z, J, te, false), ee !== null && Be !== null && _c(U, Be, ee, te, true);
            }
          }
          e: {
            if (z = A ? cr(A) : window, J = z.nodeName && z.nodeName.toLowerCase(), J === "select" || J === "input" && z.type === "file") var ne = xm;
            else if (Ju(z)) if (ec) ne = Em;
            else {
              ne = Cm;
              var oe = km;
            }
            else (J = z.nodeName) && J.toLowerCase() === "input" && (z.type === "checkbox" || z.type === "radio") && (ne = Pm);
            if (ne && (ne = ne(e, A))) {
              Zu(U, ne, r, I);
              break e;
            }
            oe && oe(e, z, A), e === "focusout" && (oe = z._wrapperState) && oe.controlled && z.type === "number" && xl(z, "number", z.value);
          }
          switch (oe = A ? cr(A) : window, e) {
            case "focusin":
              (Ju(oe) || oe.contentEditable === "true") && (lr = oe, Jl = A, io = null);
              break;
            case "focusout":
              io = Jl = lr = null;
              break;
            case "mousedown":
              Zl = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Zl = false, ac(U, r, I);
              break;
            case "selectionchange":
              if (Mm) break;
            case "keydown":
            case "keyup":
              ac(U, r, I);
          }
          var ie;
          if (Ql) e: {
            switch (e) {
              case "compositionstart":
                var se = "onCompositionStart";
                break e;
              case "compositionend":
                se = "onCompositionEnd";
                break e;
              case "compositionupdate":
                se = "onCompositionUpdate";
                break e;
            }
            se = void 0;
          }
          else ir ? qu(e, r) && (se = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (se = "onCompositionStart");
          se && (Ku && r.locale !== "ko" && (ir || se !== "onCompositionStart" ? se === "onCompositionEnd" && ir && (ie = Hu()) : (fn = I, Hl = "value" in fn ? fn.value : fn.textContent, ir = true)), oe = ri(A, se), 0 < oe.length && (se = new $u(se, e, null, r, I), U.push({
            event: se,
            listeners: oe
          }), ie ? se.data = ie : (ie = Xu(r), ie !== null && (se.data = ie)))), (ie = vm ? _m(e, r) : wm(e, r)) && (A = ri(A, "onBeforeInput"), 0 < A.length && (I = new $u("onBeforeInput", "beforeinput", null, r, I), U.push({
            event: I,
            listeners: A
          }), I.data = ie));
        }
        yc(U, t);
      });
    }
    function ao(e, t, r) {
      return {
        instance: e,
        listener: t,
        currentTarget: r
      };
    }
    function ri(e, t) {
      for (var r = t + "Capture", i = []; e !== null; ) {
        var s = e, c = s.stateNode;
        s.tag === 5 && c !== null && (s = c, c = Ur(e, r), c != null && i.unshift(ao(e, c, s)), c = Ur(e, t), c != null && i.push(ao(e, c, s))), e = e.return;
      }
      return i;
    }
    function ar(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5);
      return e || null;
    }
    function _c(e, t, r, i, s) {
      for (var c = t._reactName, h = []; r !== null && r !== i; ) {
        var v = r, S = v.alternate, A = v.stateNode;
        if (S !== null && S === i) break;
        v.tag === 5 && A !== null && (v = A, s ? (S = Ur(r, c), S != null && h.unshift(ao(r, S, v))) : s || (S = Ur(r, c), S != null && h.push(ao(r, S, v)))), r = r.return;
      }
      h.length !== 0 && e.push({
        event: t,
        listeners: h
      });
    }
    var Om = /\r\n?/g, jm = /\u0000|\uFFFD/g;
    function wc(e) {
      return (typeof e == "string" ? e : "" + e).replace(Om, `
`).replace(jm, "");
    }
    function oi(e, t, r) {
      if (t = wc(t), wc(e) !== t && r) throw Error(l(425));
    }
    function ii() {
    }
    var is = null, ls = null;
    function ss(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    var as = typeof setTimeout == "function" ? setTimeout : void 0, Dm = typeof clearTimeout == "function" ? clearTimeout : void 0, bc = typeof Promise == "function" ? Promise : void 0, Bm = typeof queueMicrotask == "function" ? queueMicrotask : typeof bc < "u" ? function(e) {
      return bc.resolve(null).then(e).catch(Fm);
    } : as;
    function Fm(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function us(e, t) {
      var r = t, i = 0;
      do {
        var s = r.nextSibling;
        if (e.removeChild(r), s && s.nodeType === 8) if (r = s.data, r === "/$") {
          if (i === 0) {
            e.removeChild(s), Jr(t);
            return;
          }
          i--;
        } else r !== "$" && r !== "$?" && r !== "$!" || i++;
        r = s;
      } while (r);
      Jr(t);
    }
    function hn(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
          if (t === "/$") return null;
        }
      }
      return e;
    }
    function Sc(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var r = e.data;
          if (r === "$" || r === "$!" || r === "$?") {
            if (t === 0) return e;
            t--;
          } else r === "/$" && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    var ur = Math.random().toString(36).slice(2), Ft = "__reactFiber$" + ur, uo = "__reactProps$" + ur, qt = "__reactContainer$" + ur, cs = "__reactEvents$" + ur, zm = "__reactListeners$" + ur, Im = "__reactHandles$" + ur;
    function zn(e) {
      var t = e[Ft];
      if (t) return t;
      for (var r = e.parentNode; r; ) {
        if (t = r[qt] || r[Ft]) {
          if (r = t.alternate, t.child !== null || r !== null && r.child !== null) for (e = Sc(e); e !== null; ) {
            if (r = e[Ft]) return r;
            e = Sc(e);
          }
          return t;
        }
        e = r, r = e.parentNode;
      }
      return null;
    }
    function co(e) {
      return e = e[Ft] || e[qt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
    }
    function cr(e) {
      if (e.tag === 5 || e.tag === 6) return e.stateNode;
      throw Error(l(33));
    }
    function li(e) {
      return e[uo] || null;
    }
    var ds = [], dr = -1;
    function mn(e) {
      return {
        current: e
      };
    }
    function Me(e) {
      0 > dr || (e.current = ds[dr], ds[dr] = null, dr--);
    }
    function Ee(e, t) {
      dr++, ds[dr] = e.current, e.current = t;
    }
    var gn = {}, Ke = mn(gn), it = mn(false), In = gn;
    function fr(e, t) {
      var r = e.type.contextTypes;
      if (!r) return gn;
      var i = e.stateNode;
      if (i && i.__reactInternalMemoizedUnmaskedChildContext === t) return i.__reactInternalMemoizedMaskedChildContext;
      var s = {}, c;
      for (c in r) s[c] = t[c];
      return i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = s), s;
    }
    function lt(e) {
      return e = e.childContextTypes, e != null;
    }
    function si() {
      Me(it), Me(Ke);
    }
    function xc(e, t, r) {
      if (Ke.current !== gn) throw Error(l(168));
      Ee(Ke, t), Ee(it, r);
    }
    function kc(e, t, r) {
      var i = e.stateNode;
      if (t = t.childContextTypes, typeof i.getChildContext != "function") return r;
      i = i.getChildContext();
      for (var s in i) if (!(s in t)) throw Error(l(108, be(e) || "Unknown", s));
      return Q({}, r, i);
    }
    function ai(e) {
      return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || gn, In = Ke.current, Ee(Ke, e), Ee(it, it.current), true;
    }
    function Cc(e, t, r) {
      var i = e.stateNode;
      if (!i) throw Error(l(169));
      r ? (e = kc(e, t, In), i.__reactInternalMemoizedMergedChildContext = e, Me(it), Me(Ke), Ee(Ke, e)) : Me(it), Ee(it, r);
    }
    var Xt = null, ui = false, fs = false;
    function Pc(e) {
      Xt === null ? Xt = [
        e
      ] : Xt.push(e);
    }
    function Wm(e) {
      ui = true, Pc(e);
    }
    function yn() {
      if (!fs && Xt !== null) {
        fs = true;
        var e = 0, t = ke;
        try {
          var r = Xt;
          for (ke = 1; e < r.length; e++) {
            var i = r[e];
            do
              i = i(true);
            while (i !== null);
          }
          Xt = null, ui = false;
        } catch (s) {
          throw Xt !== null && (Xt = Xt.slice(e + 1)), Tu(Ol, yn), s;
        } finally {
          ke = t, fs = false;
        }
      }
      return null;
    }
    var pr = [], hr = 0, ci = null, di = 0, yt = [], vt = 0, Wn = null, Jt = 1, Zt = "";
    function Hn(e, t) {
      pr[hr++] = di, pr[hr++] = ci, ci = e, di = t;
    }
    function Ec(e, t, r) {
      yt[vt++] = Jt, yt[vt++] = Zt, yt[vt++] = Wn, Wn = e;
      var i = Jt;
      e = Zt;
      var s = 32 - Ct(i) - 1;
      i &= ~(1 << s), r += 1;
      var c = 32 - Ct(t) + s;
      if (30 < c) {
        var h = s - s % 5;
        c = (i & (1 << h) - 1).toString(32), i >>= h, s -= h, Jt = 1 << 32 - Ct(t) + s | r << s | i, Zt = c + e;
      } else Jt = 1 << c | r << s | i, Zt = e;
    }
    function ps(e) {
      e.return !== null && (Hn(e, 1), Ec(e, 1, 0));
    }
    function hs(e) {
      for (; e === ci; ) ci = pr[--hr], pr[hr] = null, di = pr[--hr], pr[hr] = null;
      for (; e === Wn; ) Wn = yt[--vt], yt[vt] = null, Zt = yt[--vt], yt[vt] = null, Jt = yt[--vt], yt[vt] = null;
    }
    var ft = null, pt = null, Ae = false, Et = null;
    function Tc(e, t) {
      var r = St(5, null, null, 0);
      r.elementType = "DELETED", r.stateNode = t, r.return = e, t = e.deletions, t === null ? (e.deletions = [
        r
      ], e.flags |= 16) : t.push(r);
    }
    function Rc(e, t) {
      switch (e.tag) {
        case 5:
          var r = e.type;
          return t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ft = e, pt = hn(t.firstChild), true) : false;
        case 6:
          return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ft = e, pt = null, true) : false;
        case 13:
          return t = t.nodeType !== 8 ? null : t, t !== null ? (r = Wn !== null ? {
            id: Jt,
            overflow: Zt
          } : null, e.memoizedState = {
            dehydrated: t,
            treeContext: r,
            retryLane: 1073741824
          }, r = St(18, null, null, 0), r.stateNode = t, r.return = e, e.child = r, ft = e, pt = null, true) : false;
        default:
          return false;
      }
    }
    function ms(e) {
      return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
    }
    function gs(e) {
      if (Ae) {
        var t = pt;
        if (t) {
          var r = t;
          if (!Rc(e, t)) {
            if (ms(e)) throw Error(l(418));
            t = hn(r.nextSibling);
            var i = ft;
            t && Rc(e, t) ? Tc(i, r) : (e.flags = e.flags & -4097 | 2, Ae = false, ft = e);
          }
        } else {
          if (ms(e)) throw Error(l(418));
          e.flags = e.flags & -4097 | 2, Ae = false, ft = e;
        }
      }
    }
    function Mc(e) {
      for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
      ft = e;
    }
    function fi(e) {
      if (e !== ft) return false;
      if (!Ae) return Mc(e), Ae = true, false;
      var t;
      if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ss(e.type, e.memoizedProps)), t && (t = pt)) {
        if (ms(e)) throw Nc(), Error(l(418));
        for (; t; ) Tc(e, t), t = hn(t.nextSibling);
      }
      if (Mc(e), e.tag === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
        e: {
          for (e = e.nextSibling, t = 0; e; ) {
            if (e.nodeType === 8) {
              var r = e.data;
              if (r === "/$") {
                if (t === 0) {
                  pt = hn(e.nextSibling);
                  break e;
                }
                t--;
              } else r !== "$" && r !== "$!" && r !== "$?" || t++;
            }
            e = e.nextSibling;
          }
          pt = null;
        }
      } else pt = ft ? hn(e.stateNode.nextSibling) : null;
      return true;
    }
    function Nc() {
      for (var e = pt; e; ) e = hn(e.nextSibling);
    }
    function mr() {
      pt = ft = null, Ae = false;
    }
    function ys(e) {
      Et === null ? Et = [
        e
      ] : Et.push(e);
    }
    var Hm = O.ReactCurrentBatchConfig;
    function fo(e, t, r) {
      if (e = r.ref, e !== null && typeof e != "function" && typeof e != "object") {
        if (r._owner) {
          if (r = r._owner, r) {
            if (r.tag !== 1) throw Error(l(309));
            var i = r.stateNode;
          }
          if (!i) throw Error(l(147, e));
          var s = i, c = "" + e;
          return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === c ? t.ref : (t = function(h) {
            var v = s.refs;
            h === null ? delete v[c] : v[c] = h;
          }, t._stringRef = c, t);
        }
        if (typeof e != "string") throw Error(l(284));
        if (!r._owner) throw Error(l(290, e));
      }
      return e;
    }
    function pi(e, t) {
      throw e = Object.prototype.toString.call(t), Error(l(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
    }
    function Ac(e) {
      var t = e._init;
      return t(e._payload);
    }
    function Lc(e) {
      function t(T, C) {
        if (e) {
          var N = T.deletions;
          N === null ? (T.deletions = [
            C
          ], T.flags |= 16) : N.push(C);
        }
      }
      function r(T, C) {
        if (!e) return null;
        for (; C !== null; ) t(T, C), C = C.sibling;
        return null;
      }
      function i(T, C) {
        for (T = /* @__PURE__ */ new Map(); C !== null; ) C.key !== null ? T.set(C.key, C) : T.set(C.index, C), C = C.sibling;
        return T;
      }
      function s(T, C) {
        return T = Cn(T, C), T.index = 0, T.sibling = null, T;
      }
      function c(T, C, N) {
        return T.index = N, e ? (N = T.alternate, N !== null ? (N = N.index, N < C ? (T.flags |= 2, C) : N) : (T.flags |= 2, C)) : (T.flags |= 1048576, C);
      }
      function h(T) {
        return e && T.alternate === null && (T.flags |= 2), T;
      }
      function v(T, C, N, $) {
        return C === null || C.tag !== 6 ? (C = aa(N, T.mode, $), C.return = T, C) : (C = s(C, N), C.return = T, C);
      }
      function S(T, C, N, $) {
        var ne = N.type;
        return ne === V ? I(T, C, N.props.children, $, N.key) : C !== null && (C.elementType === ne || typeof ne == "object" && ne !== null && ne.$$typeof === fe && Ac(ne) === C.type) ? ($ = s(C, N.props), $.ref = fo(T, C, N), $.return = T, $) : ($ = Bi(N.type, N.key, N.props, null, T.mode, $), $.ref = fo(T, C, N), $.return = T, $);
      }
      function A(T, C, N, $) {
        return C === null || C.tag !== 4 || C.stateNode.containerInfo !== N.containerInfo || C.stateNode.implementation !== N.implementation ? (C = ua(N, T.mode, $), C.return = T, C) : (C = s(C, N.children || []), C.return = T, C);
      }
      function I(T, C, N, $, ne) {
        return C === null || C.tag !== 7 ? (C = qn(N, T.mode, $, ne), C.return = T, C) : (C = s(C, N), C.return = T, C);
      }
      function U(T, C, N) {
        if (typeof C == "string" && C !== "" || typeof C == "number") return C = aa("" + C, T.mode, N), C.return = T, C;
        if (typeof C == "object" && C !== null) {
          switch (C.$$typeof) {
            case j:
              return N = Bi(C.type, C.key, C.props, null, T.mode, N), N.ref = fo(T, null, C), N.return = T, N;
            case B:
              return C = ua(C, T.mode, N), C.return = T, C;
            case fe:
              var $ = C._init;
              return U(T, $(C._payload), N);
          }
          if (Ir(C) || q(C)) return C = qn(C, T.mode, N, null), C.return = T, C;
          pi(T, C);
        }
        return null;
      }
      function z(T, C, N, $) {
        var ne = C !== null ? C.key : null;
        if (typeof N == "string" && N !== "" || typeof N == "number") return ne !== null ? null : v(T, C, "" + N, $);
        if (typeof N == "object" && N !== null) {
          switch (N.$$typeof) {
            case j:
              return N.key === ne ? S(T, C, N, $) : null;
            case B:
              return N.key === ne ? A(T, C, N, $) : null;
            case fe:
              return ne = N._init, z(T, C, ne(N._payload), $);
          }
          if (Ir(N) || q(N)) return ne !== null ? null : I(T, C, N, $, null);
          pi(T, N);
        }
        return null;
      }
      function J(T, C, N, $, ne) {
        if (typeof $ == "string" && $ !== "" || typeof $ == "number") return T = T.get(N) || null, v(C, T, "" + $, ne);
        if (typeof $ == "object" && $ !== null) {
          switch ($.$$typeof) {
            case j:
              return T = T.get($.key === null ? N : $.key) || null, S(C, T, $, ne);
            case B:
              return T = T.get($.key === null ? N : $.key) || null, A(C, T, $, ne);
            case fe:
              var oe = $._init;
              return J(T, C, N, oe($._payload), ne);
          }
          if (Ir($) || q($)) return T = T.get(N) || null, I(C, T, $, ne, null);
          pi(C, $);
        }
        return null;
      }
      function ee(T, C, N, $) {
        for (var ne = null, oe = null, ie = C, se = C = 0, Ue = null; ie !== null && se < N.length; se++) {
          ie.index > se ? (Ue = ie, ie = null) : Ue = ie.sibling;
          var xe = z(T, ie, N[se], $);
          if (xe === null) {
            ie === null && (ie = Ue);
            break;
          }
          e && ie && xe.alternate === null && t(T, ie), C = c(xe, C, se), oe === null ? ne = xe : oe.sibling = xe, oe = xe, ie = Ue;
        }
        if (se === N.length) return r(T, ie), Ae && Hn(T, se), ne;
        if (ie === null) {
          for (; se < N.length; se++) ie = U(T, N[se], $), ie !== null && (C = c(ie, C, se), oe === null ? ne = ie : oe.sibling = ie, oe = ie);
          return Ae && Hn(T, se), ne;
        }
        for (ie = i(T, ie); se < N.length; se++) Ue = J(ie, T, se, N[se], $), Ue !== null && (e && Ue.alternate !== null && ie.delete(Ue.key === null ? se : Ue.key), C = c(Ue, C, se), oe === null ? ne = Ue : oe.sibling = Ue, oe = Ue);
        return e && ie.forEach(function(Pn) {
          return t(T, Pn);
        }), Ae && Hn(T, se), ne;
      }
      function te(T, C, N, $) {
        var ne = q(N);
        if (typeof ne != "function") throw Error(l(150));
        if (N = ne.call(N), N == null) throw Error(l(151));
        for (var oe = ne = null, ie = C, se = C = 0, Ue = null, xe = N.next(); ie !== null && !xe.done; se++, xe = N.next()) {
          ie.index > se ? (Ue = ie, ie = null) : Ue = ie.sibling;
          var Pn = z(T, ie, xe.value, $);
          if (Pn === null) {
            ie === null && (ie = Ue);
            break;
          }
          e && ie && Pn.alternate === null && t(T, ie), C = c(Pn, C, se), oe === null ? ne = Pn : oe.sibling = Pn, oe = Pn, ie = Ue;
        }
        if (xe.done) return r(T, ie), Ae && Hn(T, se), ne;
        if (ie === null) {
          for (; !xe.done; se++, xe = N.next()) xe = U(T, xe.value, $), xe !== null && (C = c(xe, C, se), oe === null ? ne = xe : oe.sibling = xe, oe = xe);
          return Ae && Hn(T, se), ne;
        }
        for (ie = i(T, ie); !xe.done; se++, xe = N.next()) xe = J(ie, T, se, xe.value, $), xe !== null && (e && xe.alternate !== null && ie.delete(xe.key === null ? se : xe.key), C = c(xe, C, se), oe === null ? ne = xe : oe.sibling = xe, oe = xe);
        return e && ie.forEach(function(bg) {
          return t(T, bg);
        }), Ae && Hn(T, se), ne;
      }
      function Be(T, C, N, $) {
        if (typeof N == "object" && N !== null && N.type === V && N.key === null && (N = N.props.children), typeof N == "object" && N !== null) {
          switch (N.$$typeof) {
            case j:
              e: {
                for (var ne = N.key, oe = C; oe !== null; ) {
                  if (oe.key === ne) {
                    if (ne = N.type, ne === V) {
                      if (oe.tag === 7) {
                        r(T, oe.sibling), C = s(oe, N.props.children), C.return = T, T = C;
                        break e;
                      }
                    } else if (oe.elementType === ne || typeof ne == "object" && ne !== null && ne.$$typeof === fe && Ac(ne) === oe.type) {
                      r(T, oe.sibling), C = s(oe, N.props), C.ref = fo(T, oe, N), C.return = T, T = C;
                      break e;
                    }
                    r(T, oe);
                    break;
                  } else t(T, oe);
                  oe = oe.sibling;
                }
                N.type === V ? (C = qn(N.props.children, T.mode, $, N.key), C.return = T, T = C) : ($ = Bi(N.type, N.key, N.props, null, T.mode, $), $.ref = fo(T, C, N), $.return = T, T = $);
              }
              return h(T);
            case B:
              e: {
                for (oe = N.key; C !== null; ) {
                  if (C.key === oe) if (C.tag === 4 && C.stateNode.containerInfo === N.containerInfo && C.stateNode.implementation === N.implementation) {
                    r(T, C.sibling), C = s(C, N.children || []), C.return = T, T = C;
                    break e;
                  } else {
                    r(T, C);
                    break;
                  }
                  else t(T, C);
                  C = C.sibling;
                }
                C = ua(N, T.mode, $), C.return = T, T = C;
              }
              return h(T);
            case fe:
              return oe = N._init, Be(T, C, oe(N._payload), $);
          }
          if (Ir(N)) return ee(T, C, N, $);
          if (q(N)) return te(T, C, N, $);
          pi(T, N);
        }
        return typeof N == "string" && N !== "" || typeof N == "number" ? (N = "" + N, C !== null && C.tag === 6 ? (r(T, C.sibling), C = s(C, N), C.return = T, T = C) : (r(T, C), C = aa(N, T.mode, $), C.return = T, T = C), h(T)) : r(T, C);
      }
      return Be;
    }
    var gr = Lc(true), Oc = Lc(false), hi = mn(null), mi = null, yr = null, vs = null;
    function _s() {
      vs = yr = mi = null;
    }
    function ws(e) {
      var t = hi.current;
      Me(hi), e._currentValue = t;
    }
    function bs(e, t, r) {
      for (; e !== null; ) {
        var i = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === r) break;
        e = e.return;
      }
    }
    function vr(e, t) {
      mi = e, vs = yr = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (st = true), e.firstContext = null);
    }
    function _t(e) {
      var t = e._currentValue;
      if (vs !== e) if (e = {
        context: e,
        memoizedValue: t,
        next: null
      }, yr === null) {
        if (mi === null) throw Error(l(308));
        yr = e, mi.dependencies = {
          lanes: 0,
          firstContext: e
        };
      } else yr = yr.next = e;
      return t;
    }
    var Un = null;
    function Ss(e) {
      Un === null ? Un = [
        e
      ] : Un.push(e);
    }
    function jc(e, t, r, i) {
      var s = t.interleaved;
      return s === null ? (r.next = r, Ss(t)) : (r.next = s.next, s.next = r), t.interleaved = r, en(e, i);
    }
    function en(e, t) {
      e.lanes |= t;
      var r = e.alternate;
      for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; ) e.childLanes |= t, r = e.alternate, r !== null && (r.childLanes |= t), r = e, e = e.return;
      return r.tag === 3 ? r.stateNode : null;
    }
    var vn = false;
    function xs(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: 0
        },
        effects: null
      };
    }
    function Dc(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
      });
    }
    function tn(e, t) {
      return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
      };
    }
    function _n(e, t, r) {
      var i = e.updateQueue;
      if (i === null) return null;
      if (i = i.shared, _e & 2) {
        var s = i.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), i.pending = t, en(e, r);
      }
      return s = i.interleaved, s === null ? (t.next = t, Ss(i)) : (t.next = s.next, s.next = t), i.interleaved = t, en(e, r);
    }
    function gi(e, t, r) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194240) !== 0)) {
        var i = t.lanes;
        i &= e.pendingLanes, r |= i, t.lanes = r, Bl(e, r);
      }
    }
    function Bc(e, t) {
      var r = e.updateQueue, i = e.alternate;
      if (i !== null && (i = i.updateQueue, r === i)) {
        var s = null, c = null;
        if (r = r.firstBaseUpdate, r !== null) {
          do {
            var h = {
              eventTime: r.eventTime,
              lane: r.lane,
              tag: r.tag,
              payload: r.payload,
              callback: r.callback,
              next: null
            };
            c === null ? s = c = h : c = c.next = h, r = r.next;
          } while (r !== null);
          c === null ? s = c = t : c = c.next = t;
        } else s = c = t;
        r = {
          baseState: i.baseState,
          firstBaseUpdate: s,
          lastBaseUpdate: c,
          shared: i.shared,
          effects: i.effects
        }, e.updateQueue = r;
        return;
      }
      e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t;
    }
    function yi(e, t, r, i) {
      var s = e.updateQueue;
      vn = false;
      var c = s.firstBaseUpdate, h = s.lastBaseUpdate, v = s.shared.pending;
      if (v !== null) {
        s.shared.pending = null;
        var S = v, A = S.next;
        S.next = null, h === null ? c = A : h.next = A, h = S;
        var I = e.alternate;
        I !== null && (I = I.updateQueue, v = I.lastBaseUpdate, v !== h && (v === null ? I.firstBaseUpdate = A : v.next = A, I.lastBaseUpdate = S));
      }
      if (c !== null) {
        var U = s.baseState;
        h = 0, I = A = S = null, v = c;
        do {
          var z = v.lane, J = v.eventTime;
          if ((i & z) === z) {
            I !== null && (I = I.next = {
              eventTime: J,
              lane: 0,
              tag: v.tag,
              payload: v.payload,
              callback: v.callback,
              next: null
            });
            e: {
              var ee = e, te = v;
              switch (z = t, J = r, te.tag) {
                case 1:
                  if (ee = te.payload, typeof ee == "function") {
                    U = ee.call(J, U, z);
                    break e;
                  }
                  U = ee;
                  break e;
                case 3:
                  ee.flags = ee.flags & -65537 | 128;
                case 0:
                  if (ee = te.payload, z = typeof ee == "function" ? ee.call(J, U, z) : ee, z == null) break e;
                  U = Q({}, U, z);
                  break e;
                case 2:
                  vn = true;
              }
            }
            v.callback !== null && v.lane !== 0 && (e.flags |= 64, z = s.effects, z === null ? s.effects = [
              v
            ] : z.push(v));
          } else J = {
            eventTime: J,
            lane: z,
            tag: v.tag,
            payload: v.payload,
            callback: v.callback,
            next: null
          }, I === null ? (A = I = J, S = U) : I = I.next = J, h |= z;
          if (v = v.next, v === null) {
            if (v = s.shared.pending, v === null) break;
            z = v, v = z.next, z.next = null, s.lastBaseUpdate = z, s.shared.pending = null;
          }
        } while (true);
        if (I === null && (S = U), s.baseState = S, s.firstBaseUpdate = A, s.lastBaseUpdate = I, t = s.shared.interleaved, t !== null) {
          s = t;
          do
            h |= s.lane, s = s.next;
          while (s !== t);
        } else c === null && (s.shared.lanes = 0);
        Gn |= h, e.lanes = h, e.memoizedState = U;
      }
    }
    function Fc(e, t, r) {
      if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
        var i = e[t], s = i.callback;
        if (s !== null) {
          if (i.callback = null, i = r, typeof s != "function") throw Error(l(191, s));
          s.call(i);
        }
      }
    }
    var po = {}, zt = mn(po), ho = mn(po), mo = mn(po);
    function Vn(e) {
      if (e === po) throw Error(l(174));
      return e;
    }
    function ks(e, t) {
      switch (Ee(mo, t), Ee(ho, e), Ee(zt, po), e = t.nodeType, e) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : Cl(null, "");
          break;
        default:
          e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Cl(t, e);
      }
      Me(zt), Ee(zt, t);
    }
    function _r() {
      Me(zt), Me(ho), Me(mo);
    }
    function zc(e) {
      Vn(mo.current);
      var t = Vn(zt.current), r = Cl(t, e.type);
      t !== r && (Ee(ho, e), Ee(zt, r));
    }
    function Cs(e) {
      ho.current === e && (Me(zt), Me(ho));
    }
    var Le = mn(0);
    function vi(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var r = t.memoizedState;
          if (r !== null && (r = r.dehydrated, r === null || r.data === "$?" || r.data === "$!")) return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
          if (t.flags & 128) return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var Ps = [];
    function Es() {
      for (var e = 0; e < Ps.length; e++) Ps[e]._workInProgressVersionPrimary = null;
      Ps.length = 0;
    }
    var _i = O.ReactCurrentDispatcher, Ts = O.ReactCurrentBatchConfig, $n = 0, Oe = null, ze = null, We = null, wi = false, go = false, yo = 0, Um = 0;
    function Qe() {
      throw Error(l(321));
    }
    function Rs(e, t) {
      if (t === null) return false;
      for (var r = 0; r < t.length && r < e.length; r++) if (!Pt(e[r], t[r])) return false;
      return true;
    }
    function Ms(e, t, r, i, s, c) {
      if ($n = c, Oe = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, _i.current = e === null || e.memoizedState === null ? Km : Qm, e = r(i, s), go) {
        c = 0;
        do {
          if (go = false, yo = 0, 25 <= c) throw Error(l(301));
          c += 1, We = ze = null, t.updateQueue = null, _i.current = Ym, e = r(i, s);
        } while (go);
      }
      if (_i.current = xi, t = ze !== null && ze.next !== null, $n = 0, We = ze = Oe = null, wi = false, t) throw Error(l(300));
      return e;
    }
    function Ns() {
      var e = yo !== 0;
      return yo = 0, e;
    }
    function It() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return We === null ? Oe.memoizedState = We = e : We = We.next = e, We;
    }
    function wt() {
      if (ze === null) {
        var e = Oe.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = ze.next;
      var t = We === null ? Oe.memoizedState : We.next;
      if (t !== null) We = t, ze = e;
      else {
        if (e === null) throw Error(l(310));
        ze = e, e = {
          memoizedState: ze.memoizedState,
          baseState: ze.baseState,
          baseQueue: ze.baseQueue,
          queue: ze.queue,
          next: null
        }, We === null ? Oe.memoizedState = We = e : We = We.next = e;
      }
      return We;
    }
    function vo(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function As(e) {
      var t = wt(), r = t.queue;
      if (r === null) throw Error(l(311));
      r.lastRenderedReducer = e;
      var i = ze, s = i.baseQueue, c = r.pending;
      if (c !== null) {
        if (s !== null) {
          var h = s.next;
          s.next = c.next, c.next = h;
        }
        i.baseQueue = s = c, r.pending = null;
      }
      if (s !== null) {
        c = s.next, i = i.baseState;
        var v = h = null, S = null, A = c;
        do {
          var I = A.lane;
          if (($n & I) === I) S !== null && (S = S.next = {
            lane: 0,
            action: A.action,
            hasEagerState: A.hasEagerState,
            eagerState: A.eagerState,
            next: null
          }), i = A.hasEagerState ? A.eagerState : e(i, A.action);
          else {
            var U = {
              lane: I,
              action: A.action,
              hasEagerState: A.hasEagerState,
              eagerState: A.eagerState,
              next: null
            };
            S === null ? (v = S = U, h = i) : S = S.next = U, Oe.lanes |= I, Gn |= I;
          }
          A = A.next;
        } while (A !== null && A !== c);
        S === null ? h = i : S.next = v, Pt(i, t.memoizedState) || (st = true), t.memoizedState = i, t.baseState = h, t.baseQueue = S, r.lastRenderedState = i;
      }
      if (e = r.interleaved, e !== null) {
        s = e;
        do
          c = s.lane, Oe.lanes |= c, Gn |= c, s = s.next;
        while (s !== e);
      } else s === null && (r.lanes = 0);
      return [
        t.memoizedState,
        r.dispatch
      ];
    }
    function Ls(e) {
      var t = wt(), r = t.queue;
      if (r === null) throw Error(l(311));
      r.lastRenderedReducer = e;
      var i = r.dispatch, s = r.pending, c = t.memoizedState;
      if (s !== null) {
        r.pending = null;
        var h = s = s.next;
        do
          c = e(c, h.action), h = h.next;
        while (h !== s);
        Pt(c, t.memoizedState) || (st = true), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), r.lastRenderedState = c;
      }
      return [
        c,
        i
      ];
    }
    function Ic() {
    }
    function Wc(e, t) {
      var r = Oe, i = wt(), s = t(), c = !Pt(i.memoizedState, s);
      if (c && (i.memoizedState = s, st = true), i = i.queue, Os(Vc.bind(null, r, i, e), [
        e
      ]), i.getSnapshot !== t || c || We !== null && We.memoizedState.tag & 1) {
        if (r.flags |= 2048, _o(9, Uc.bind(null, r, i, s, t), void 0, null), He === null) throw Error(l(349));
        $n & 30 || Hc(r, t, s);
      }
      return s;
    }
    function Hc(e, t, r) {
      e.flags |= 16384, e = {
        getSnapshot: t,
        value: r
      }, t = Oe.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
      }, Oe.updateQueue = t, t.stores = [
        e
      ]) : (r = t.stores, r === null ? t.stores = [
        e
      ] : r.push(e));
    }
    function Uc(e, t, r, i) {
      t.value = r, t.getSnapshot = i, $c(t) && Gc(e);
    }
    function Vc(e, t, r) {
      return r(function() {
        $c(t) && Gc(e);
      });
    }
    function $c(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var r = t();
        return !Pt(e, r);
      } catch {
        return true;
      }
    }
    function Gc(e) {
      var t = en(e, 1);
      t !== null && Nt(t, e, 1, -1);
    }
    function Kc(e) {
      var t = It();
      return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: vo,
        lastRenderedState: e
      }, t.queue = e, e = e.dispatch = Gm.bind(null, Oe, e), [
        t.memoizedState,
        e
      ];
    }
    function _o(e, t, r, i) {
      return e = {
        tag: e,
        create: t,
        destroy: r,
        deps: i,
        next: null
      }, t = Oe.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
      }, Oe.updateQueue = t, t.lastEffect = e.next = e) : (r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (i = r.next, r.next = e, e.next = i, t.lastEffect = e)), e;
    }
    function Qc() {
      return wt().memoizedState;
    }
    function bi(e, t, r, i) {
      var s = It();
      Oe.flags |= e, s.memoizedState = _o(1 | t, r, void 0, i === void 0 ? null : i);
    }
    function Si(e, t, r, i) {
      var s = wt();
      i = i === void 0 ? null : i;
      var c = void 0;
      if (ze !== null) {
        var h = ze.memoizedState;
        if (c = h.destroy, i !== null && Rs(i, h.deps)) {
          s.memoizedState = _o(t, r, c, i);
          return;
        }
      }
      Oe.flags |= e, s.memoizedState = _o(1 | t, r, c, i);
    }
    function Yc(e, t) {
      return bi(8390656, 8, e, t);
    }
    function Os(e, t) {
      return Si(2048, 8, e, t);
    }
    function qc(e, t) {
      return Si(4, 2, e, t);
    }
    function Xc(e, t) {
      return Si(4, 4, e, t);
    }
    function Jc(e, t) {
      if (typeof t == "function") return e = e(), t(e), function() {
        t(null);
      };
      if (t != null) return e = e(), t.current = e, function() {
        t.current = null;
      };
    }
    function Zc(e, t, r) {
      return r = r != null ? r.concat([
        e
      ]) : null, Si(4, 4, Jc.bind(null, t, e), r);
    }
    function js() {
    }
    function ed(e, t) {
      var r = wt();
      t = t === void 0 ? null : t;
      var i = r.memoizedState;
      return i !== null && t !== null && Rs(t, i[1]) ? i[0] : (r.memoizedState = [
        e,
        t
      ], e);
    }
    function td(e, t) {
      var r = wt();
      t = t === void 0 ? null : t;
      var i = r.memoizedState;
      return i !== null && t !== null && Rs(t, i[1]) ? i[0] : (e = e(), r.memoizedState = [
        e,
        t
      ], e);
    }
    function nd(e, t, r) {
      return $n & 21 ? (Pt(r, t) || (r = Au(), Oe.lanes |= r, Gn |= r, e.baseState = true), t) : (e.baseState && (e.baseState = false, st = true), e.memoizedState = r);
    }
    function Vm(e, t) {
      var r = ke;
      ke = r !== 0 && 4 > r ? r : 4, e(true);
      var i = Ts.transition;
      Ts.transition = {};
      try {
        e(false), t();
      } finally {
        ke = r, Ts.transition = i;
      }
    }
    function rd() {
      return wt().memoizedState;
    }
    function $m(e, t, r) {
      var i = xn(e);
      if (r = {
        lane: i,
        action: r,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, od(e)) id(t, r);
      else if (r = jc(e, t, r, i), r !== null) {
        var s = nt();
        Nt(r, e, i, s), ld(r, t, i);
      }
    }
    function Gm(e, t, r) {
      var i = xn(e), s = {
        lane: i,
        action: r,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      if (od(e)) id(t, s);
      else {
        var c = e.alternate;
        if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null)) try {
          var h = t.lastRenderedState, v = c(h, r);
          if (s.hasEagerState = true, s.eagerState = v, Pt(v, h)) {
            var S = t.interleaved;
            S === null ? (s.next = s, Ss(t)) : (s.next = S.next, S.next = s), t.interleaved = s;
            return;
          }
        } catch {
        } finally {
        }
        r = jc(e, t, s, i), r !== null && (s = nt(), Nt(r, e, i, s), ld(r, t, i));
      }
    }
    function od(e) {
      var t = e.alternate;
      return e === Oe || t !== null && t === Oe;
    }
    function id(e, t) {
      go = wi = true;
      var r = e.pending;
      r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
    }
    function ld(e, t, r) {
      if (r & 4194240) {
        var i = t.lanes;
        i &= e.pendingLanes, r |= i, t.lanes = r, Bl(e, r);
      }
    }
    var xi = {
      readContext: _t,
      useCallback: Qe,
      useContext: Qe,
      useEffect: Qe,
      useImperativeHandle: Qe,
      useInsertionEffect: Qe,
      useLayoutEffect: Qe,
      useMemo: Qe,
      useReducer: Qe,
      useRef: Qe,
      useState: Qe,
      useDebugValue: Qe,
      useDeferredValue: Qe,
      useTransition: Qe,
      useMutableSource: Qe,
      useSyncExternalStore: Qe,
      useId: Qe,
      unstable_isNewReconciler: false
    }, Km = {
      readContext: _t,
      useCallback: function(e, t) {
        return It().memoizedState = [
          e,
          t === void 0 ? null : t
        ], e;
      },
      useContext: _t,
      useEffect: Yc,
      useImperativeHandle: function(e, t, r) {
        return r = r != null ? r.concat([
          e
        ]) : null, bi(4194308, 4, Jc.bind(null, t, e), r);
      },
      useLayoutEffect: function(e, t) {
        return bi(4194308, 4, e, t);
      },
      useInsertionEffect: function(e, t) {
        return bi(4, 2, e, t);
      },
      useMemo: function(e, t) {
        var r = It();
        return t = t === void 0 ? null : t, e = e(), r.memoizedState = [
          e,
          t
        ], e;
      },
      useReducer: function(e, t, r) {
        var i = It();
        return t = r !== void 0 ? r(t) : t, i.memoizedState = i.baseState = t, e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t
        }, i.queue = e, e = e.dispatch = $m.bind(null, Oe, e), [
          i.memoizedState,
          e
        ];
      },
      useRef: function(e) {
        var t = It();
        return e = {
          current: e
        }, t.memoizedState = e;
      },
      useState: Kc,
      useDebugValue: js,
      useDeferredValue: function(e) {
        return It().memoizedState = e;
      },
      useTransition: function() {
        var e = Kc(false), t = e[0];
        return e = Vm.bind(null, e[1]), It().memoizedState = e, [
          t,
          e
        ];
      },
      useMutableSource: function() {
      },
      useSyncExternalStore: function(e, t, r) {
        var i = Oe, s = It();
        if (Ae) {
          if (r === void 0) throw Error(l(407));
          r = r();
        } else {
          if (r = t(), He === null) throw Error(l(349));
          $n & 30 || Hc(i, t, r);
        }
        s.memoizedState = r;
        var c = {
          value: r,
          getSnapshot: t
        };
        return s.queue = c, Yc(Vc.bind(null, i, c, e), [
          e
        ]), i.flags |= 2048, _o(9, Uc.bind(null, i, c, r, t), void 0, null), r;
      },
      useId: function() {
        var e = It(), t = He.identifierPrefix;
        if (Ae) {
          var r = Zt, i = Jt;
          r = (i & ~(1 << 32 - Ct(i) - 1)).toString(32) + r, t = ":" + t + "R" + r, r = yo++, 0 < r && (t += "H" + r.toString(32)), t += ":";
        } else r = Um++, t = ":" + t + "r" + r.toString(32) + ":";
        return e.memoizedState = t;
      },
      unstable_isNewReconciler: false
    }, Qm = {
      readContext: _t,
      useCallback: ed,
      useContext: _t,
      useEffect: Os,
      useImperativeHandle: Zc,
      useInsertionEffect: qc,
      useLayoutEffect: Xc,
      useMemo: td,
      useReducer: As,
      useRef: Qc,
      useState: function() {
        return As(vo);
      },
      useDebugValue: js,
      useDeferredValue: function(e) {
        var t = wt();
        return nd(t, ze.memoizedState, e);
      },
      useTransition: function() {
        var e = As(vo)[0], t = wt().memoizedState;
        return [
          e,
          t
        ];
      },
      useMutableSource: Ic,
      useSyncExternalStore: Wc,
      useId: rd,
      unstable_isNewReconciler: false
    }, Ym = {
      readContext: _t,
      useCallback: ed,
      useContext: _t,
      useEffect: Os,
      useImperativeHandle: Zc,
      useInsertionEffect: qc,
      useLayoutEffect: Xc,
      useMemo: td,
      useReducer: Ls,
      useRef: Qc,
      useState: function() {
        return Ls(vo);
      },
      useDebugValue: js,
      useDeferredValue: function(e) {
        var t = wt();
        return ze === null ? t.memoizedState = e : nd(t, ze.memoizedState, e);
      },
      useTransition: function() {
        var e = Ls(vo)[0], t = wt().memoizedState;
        return [
          e,
          t
        ];
      },
      useMutableSource: Ic,
      useSyncExternalStore: Wc,
      useId: rd,
      unstable_isNewReconciler: false
    };
    function Tt(e, t) {
      if (e && e.defaultProps) {
        t = Q({}, t), e = e.defaultProps;
        for (var r in e) t[r] === void 0 && (t[r] = e[r]);
        return t;
      }
      return t;
    }
    function Ds(e, t, r, i) {
      t = e.memoizedState, r = r(i, t), r = r == null ? t : Q({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
    }
    var ki = {
      isMounted: function(e) {
        return (e = e._reactInternals) ? Fn(e) === e : false;
      },
      enqueueSetState: function(e, t, r) {
        e = e._reactInternals;
        var i = nt(), s = xn(e), c = tn(i, s);
        c.payload = t, r != null && (c.callback = r), t = _n(e, c, s), t !== null && (Nt(t, e, s, i), gi(t, e, s));
      },
      enqueueReplaceState: function(e, t, r) {
        e = e._reactInternals;
        var i = nt(), s = xn(e), c = tn(i, s);
        c.tag = 1, c.payload = t, r != null && (c.callback = r), t = _n(e, c, s), t !== null && (Nt(t, e, s, i), gi(t, e, s));
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var r = nt(), i = xn(e), s = tn(r, i);
        s.tag = 2, t != null && (s.callback = t), t = _n(e, s, i), t !== null && (Nt(t, e, i, r), gi(t, e, i));
      }
    };
    function sd(e, t, r, i, s, c, h) {
      return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, c, h) : t.prototype && t.prototype.isPureReactComponent ? !oo(r, i) || !oo(s, c) : true;
    }
    function ad(e, t, r) {
      var i = false, s = gn, c = t.contextType;
      return typeof c == "object" && c !== null ? c = _t(c) : (s = lt(t) ? In : Ke.current, i = t.contextTypes, c = (i = i != null) ? fr(e, s) : gn), t = new t(r, c), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ki, e.stateNode = t, t._reactInternals = e, i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = s, e.__reactInternalMemoizedMaskedChildContext = c), t;
    }
    function ud(e, t, r, i) {
      e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, i), t.state !== e && ki.enqueueReplaceState(t, t.state, null);
    }
    function Bs(e, t, r, i) {
      var s = e.stateNode;
      s.props = r, s.state = e.memoizedState, s.refs = {}, xs(e);
      var c = t.contextType;
      typeof c == "object" && c !== null ? s.context = _t(c) : (c = lt(t) ? In : Ke.current, s.context = fr(e, c)), s.state = e.memoizedState, c = t.getDerivedStateFromProps, typeof c == "function" && (Ds(e, t, c, r), s.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (t = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), t !== s.state && ki.enqueueReplaceState(s, s.state, null), yi(e, r, s, i), s.state = e.memoizedState), typeof s.componentDidMount == "function" && (e.flags |= 4194308);
    }
    function wr(e, t) {
      try {
        var r = "", i = t;
        do
          r += ye(i), i = i.return;
        while (i);
        var s = r;
      } catch (c) {
        s = `
Error generating stack: ` + c.message + `
` + c.stack;
      }
      return {
        value: e,
        source: t,
        stack: s,
        digest: null
      };
    }
    function Fs(e, t, r) {
      return {
        value: e,
        source: null,
        stack: r ?? null,
        digest: t ?? null
      };
    }
    function zs(e, t) {
      try {
        console.error(t.value);
      } catch (r) {
        setTimeout(function() {
          throw r;
        });
      }
    }
    var qm = typeof WeakMap == "function" ? WeakMap : Map;
    function cd(e, t, r) {
      r = tn(-1, r), r.tag = 3, r.payload = {
        element: null
      };
      var i = t.value;
      return r.callback = function() {
        Ni || (Ni = true, ea = i), zs(e, t);
      }, r;
    }
    function dd(e, t, r) {
      r = tn(-1, r), r.tag = 3;
      var i = e.type.getDerivedStateFromError;
      if (typeof i == "function") {
        var s = t.value;
        r.payload = function() {
          return i(s);
        }, r.callback = function() {
          zs(e, t);
        };
      }
      var c = e.stateNode;
      return c !== null && typeof c.componentDidCatch == "function" && (r.callback = function() {
        zs(e, t), typeof i != "function" && (bn === null ? bn = /* @__PURE__ */ new Set([
          this
        ]) : bn.add(this));
        var h = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: h !== null ? h : ""
        });
      }), r;
    }
    function fd(e, t, r) {
      var i = e.pingCache;
      if (i === null) {
        i = e.pingCache = new qm();
        var s = /* @__PURE__ */ new Set();
        i.set(t, s);
      } else s = i.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), i.set(t, s));
      s.has(r) || (s.add(r), e = cg.bind(null, e, t, r), t.then(e, e));
    }
    function pd(e) {
      do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : true), t) return e;
        e = e.return;
      } while (e !== null);
      return null;
    }
    function hd(e, t, r, i, s) {
      return e.mode & 1 ? (e.flags |= 65536, e.lanes = s, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (t = tn(-1, 1), t.tag = 2, _n(r, t, 1))), r.lanes |= 1), e);
    }
    var Xm = O.ReactCurrentOwner, st = false;
    function tt(e, t, r, i) {
      t.child = e === null ? Oc(t, null, r, i) : gr(t, e.child, r, i);
    }
    function md(e, t, r, i, s) {
      r = r.render;
      var c = t.ref;
      return vr(t, s), i = Ms(e, t, r, i, c, s), r = Ns(), e !== null && !st ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~s, nn(e, t, s)) : (Ae && r && ps(t), t.flags |= 1, tt(e, t, i, s), t.child);
    }
    function gd(e, t, r, i, s) {
      if (e === null) {
        var c = r.type;
        return typeof c == "function" && !sa(c) && c.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (t.tag = 15, t.type = c, yd(e, t, c, i, s)) : (e = Bi(r.type, null, i, t, t.mode, s), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (c = e.child, !(e.lanes & s)) {
        var h = c.memoizedProps;
        if (r = r.compare, r = r !== null ? r : oo, r(h, i) && e.ref === t.ref) return nn(e, t, s);
      }
      return t.flags |= 1, e = Cn(c, i), e.ref = t.ref, e.return = t, t.child = e;
    }
    function yd(e, t, r, i, s) {
      if (e !== null) {
        var c = e.memoizedProps;
        if (oo(c, i) && e.ref === t.ref) if (st = false, t.pendingProps = i = c, (e.lanes & s) !== 0) e.flags & 131072 && (st = true);
        else return t.lanes = e.lanes, nn(e, t, s);
      }
      return Is(e, t, r, i, s);
    }
    function vd(e, t, r) {
      var i = t.pendingProps, s = i.children, c = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      }, Ee(Sr, ht), ht |= r;
      else {
        if (!(r & 1073741824)) return e = c !== null ? c.baseLanes | r : r, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
          baseLanes: e,
          cachePool: null,
          transitions: null
        }, t.updateQueue = null, Ee(Sr, ht), ht |= e, null;
        t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null
        }, i = c !== null ? c.baseLanes : r, Ee(Sr, ht), ht |= i;
      }
      else c !== null ? (i = c.baseLanes | r, t.memoizedState = null) : i = r, Ee(Sr, ht), ht |= i;
      return tt(e, t, s, r), t.child;
    }
    function _d(e, t) {
      var r = t.ref;
      (e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= 512, t.flags |= 2097152);
    }
    function Is(e, t, r, i, s) {
      var c = lt(r) ? In : Ke.current;
      return c = fr(t, c), vr(t, s), r = Ms(e, t, r, i, c, s), i = Ns(), e !== null && !st ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~s, nn(e, t, s)) : (Ae && i && ps(t), t.flags |= 1, tt(e, t, r, s), t.child);
    }
    function wd(e, t, r, i, s) {
      if (lt(r)) {
        var c = true;
        ai(t);
      } else c = false;
      if (vr(t, s), t.stateNode === null) Pi(e, t), ad(t, r, i), Bs(t, r, i, s), i = true;
      else if (e === null) {
        var h = t.stateNode, v = t.memoizedProps;
        h.props = v;
        var S = h.context, A = r.contextType;
        typeof A == "object" && A !== null ? A = _t(A) : (A = lt(r) ? In : Ke.current, A = fr(t, A));
        var I = r.getDerivedStateFromProps, U = typeof I == "function" || typeof h.getSnapshotBeforeUpdate == "function";
        U || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (v !== i || S !== A) && ud(t, h, i, A), vn = false;
        var z = t.memoizedState;
        h.state = z, yi(t, i, h, s), S = t.memoizedState, v !== i || z !== S || it.current || vn ? (typeof I == "function" && (Ds(t, r, I, i), S = t.memoizedState), (v = vn || sd(t, r, v, i, z, S, A)) ? (U || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = S), h.props = i, h.state = S, h.context = A, i = v) : (typeof h.componentDidMount == "function" && (t.flags |= 4194308), i = false);
      } else {
        h = t.stateNode, Dc(e, t), v = t.memoizedProps, A = t.type === t.elementType ? v : Tt(t.type, v), h.props = A, U = t.pendingProps, z = h.context, S = r.contextType, typeof S == "object" && S !== null ? S = _t(S) : (S = lt(r) ? In : Ke.current, S = fr(t, S));
        var J = r.getDerivedStateFromProps;
        (I = typeof J == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (v !== U || z !== S) && ud(t, h, i, S), vn = false, z = t.memoizedState, h.state = z, yi(t, i, h, s);
        var ee = t.memoizedState;
        v !== U || z !== ee || it.current || vn ? (typeof J == "function" && (Ds(t, r, J, i), ee = t.memoizedState), (A = vn || sd(t, r, A, i, z, ee, S) || false) ? (I || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(i, ee, S), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(i, ee, S)), typeof h.componentDidUpdate == "function" && (t.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || v === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || v === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = ee), h.props = i, h.state = ee, h.context = S, i = A) : (typeof h.componentDidUpdate != "function" || v === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || v === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), i = false);
      }
      return Ws(e, t, r, i, c, s);
    }
    function Ws(e, t, r, i, s, c) {
      _d(e, t);
      var h = (t.flags & 128) !== 0;
      if (!i && !h) return s && Cc(t, r, false), nn(e, t, c);
      i = t.stateNode, Xm.current = t;
      var v = h && typeof r.getDerivedStateFromError != "function" ? null : i.render();
      return t.flags |= 1, e !== null && h ? (t.child = gr(t, e.child, null, c), t.child = gr(t, null, v, c)) : tt(e, t, v, c), t.memoizedState = i.state, s && Cc(t, r, true), t.child;
    }
    function bd(e) {
      var t = e.stateNode;
      t.pendingContext ? xc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && xc(e, t.context, false), ks(e, t.containerInfo);
    }
    function Sd(e, t, r, i, s) {
      return mr(), ys(s), t.flags |= 256, tt(e, t, r, i), t.child;
    }
    var Hs = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0
    };
    function Us(e) {
      return {
        baseLanes: e,
        cachePool: null,
        transitions: null
      };
    }
    function xd(e, t, r) {
      var i = t.pendingProps, s = Le.current, c = false, h = (t.flags & 128) !== 0, v;
      if ((v = h) || (v = e !== null && e.memoizedState === null ? false : (s & 2) !== 0), v ? (c = true, t.flags &= -129) : (e === null || e.memoizedState !== null) && (s |= 1), Ee(Le, s & 1), e === null) return gs(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (h = i.children, e = i.fallback, c ? (i = t.mode, c = t.child, h = {
        mode: "hidden",
        children: h
      }, !(i & 1) && c !== null ? (c.childLanes = 0, c.pendingProps = h) : c = Fi(h, i, 0, null), e = qn(e, i, r, null), c.return = t, e.return = t, c.sibling = e, t.child = c, t.child.memoizedState = Us(r), t.memoizedState = Hs, e) : Vs(t, h));
      if (s = e.memoizedState, s !== null && (v = s.dehydrated, v !== null)) return Jm(e, t, h, i, v, s, r);
      if (c) {
        c = i.fallback, h = t.mode, s = e.child, v = s.sibling;
        var S = {
          mode: "hidden",
          children: i.children
        };
        return !(h & 1) && t.child !== s ? (i = t.child, i.childLanes = 0, i.pendingProps = S, t.deletions = null) : (i = Cn(s, S), i.subtreeFlags = s.subtreeFlags & 14680064), v !== null ? c = Cn(v, c) : (c = qn(c, h, r, null), c.flags |= 2), c.return = t, i.return = t, i.sibling = c, t.child = i, i = c, c = t.child, h = e.child.memoizedState, h = h === null ? Us(r) : {
          baseLanes: h.baseLanes | r,
          cachePool: null,
          transitions: h.transitions
        }, c.memoizedState = h, c.childLanes = e.childLanes & ~r, t.memoizedState = Hs, i;
      }
      return c = e.child, e = c.sibling, i = Cn(c, {
        mode: "visible",
        children: i.children
      }), !(t.mode & 1) && (i.lanes = r), i.return = t, i.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [
        e
      ], t.flags |= 16) : r.push(e)), t.child = i, t.memoizedState = null, i;
    }
    function Vs(e, t) {
      return t = Fi({
        mode: "visible",
        children: t
      }, e.mode, 0, null), t.return = e, e.child = t;
    }
    function Ci(e, t, r, i) {
      return i !== null && ys(i), gr(t, e.child, null, r), e = Vs(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
    }
    function Jm(e, t, r, i, s, c, h) {
      if (r) return t.flags & 256 ? (t.flags &= -257, i = Fs(Error(l(422))), Ci(e, t, h, i)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (c = i.fallback, s = t.mode, i = Fi({
        mode: "visible",
        children: i.children
      }, s, 0, null), c = qn(c, s, h, null), c.flags |= 2, i.return = t, c.return = t, i.sibling = c, t.child = i, t.mode & 1 && gr(t, e.child, null, h), t.child.memoizedState = Us(h), t.memoizedState = Hs, c);
      if (!(t.mode & 1)) return Ci(e, t, h, null);
      if (s.data === "$!") {
        if (i = s.nextSibling && s.nextSibling.dataset, i) var v = i.dgst;
        return i = v, c = Error(l(419)), i = Fs(c, i, void 0), Ci(e, t, h, i);
      }
      if (v = (h & e.childLanes) !== 0, st || v) {
        if (i = He, i !== null) {
          switch (h & -h) {
            case 4:
              s = 2;
              break;
            case 16:
              s = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              s = 32;
              break;
            case 536870912:
              s = 268435456;
              break;
            default:
              s = 0;
          }
          s = s & (i.suspendedLanes | h) ? 0 : s, s !== 0 && s !== c.retryLane && (c.retryLane = s, en(e, s), Nt(i, e, s, -1));
        }
        return la(), i = Fs(Error(l(421))), Ci(e, t, h, i);
      }
      return s.data === "$?" ? (t.flags |= 128, t.child = e.child, t = dg.bind(null, e), s._reactRetry = t, null) : (e = c.treeContext, pt = hn(s.nextSibling), ft = t, Ae = true, Et = null, e !== null && (yt[vt++] = Jt, yt[vt++] = Zt, yt[vt++] = Wn, Jt = e.id, Zt = e.overflow, Wn = t), t = Vs(t, i.children), t.flags |= 4096, t);
    }
    function kd(e, t, r) {
      e.lanes |= t;
      var i = e.alternate;
      i !== null && (i.lanes |= t), bs(e.return, t, r);
    }
    function $s(e, t, r, i, s) {
      var c = e.memoizedState;
      c === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: r,
        tailMode: s
      } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = i, c.tail = r, c.tailMode = s);
    }
    function Cd(e, t, r) {
      var i = t.pendingProps, s = i.revealOrder, c = i.tail;
      if (tt(e, t, i.children, r), i = Le.current, i & 2) i = i & 1 | 2, t.flags |= 128;
      else {
        if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && kd(e, r, t);
          else if (e.tag === 19) kd(e, r, t);
          else if (e.child !== null) {
            e.child.return = e, e = e.child;
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          e.sibling.return = e.return, e = e.sibling;
        }
        i &= 1;
      }
      if (Ee(Le, i), !(t.mode & 1)) t.memoizedState = null;
      else switch (s) {
        case "forwards":
          for (r = t.child, s = null; r !== null; ) e = r.alternate, e !== null && vi(e) === null && (s = r), r = r.sibling;
          r = s, r === null ? (s = t.child, t.child = null) : (s = r.sibling, r.sibling = null), $s(t, false, s, r, c);
          break;
        case "backwards":
          for (r = null, s = t.child, t.child = null; s !== null; ) {
            if (e = s.alternate, e !== null && vi(e) === null) {
              t.child = s;
              break;
            }
            e = s.sibling, s.sibling = r, r = s, s = e;
          }
          $s(t, true, r, null, c);
          break;
        case "together":
          $s(t, false, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function Pi(e, t) {
      !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
    }
    function nn(e, t, r) {
      if (e !== null && (t.dependencies = e.dependencies), Gn |= t.lanes, !(r & t.childLanes)) return null;
      if (e !== null && t.child !== e.child) throw Error(l(153));
      if (t.child !== null) {
        for (e = t.child, r = Cn(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null; ) e = e.sibling, r = r.sibling = Cn(e, e.pendingProps), r.return = t;
        r.sibling = null;
      }
      return t.child;
    }
    function Zm(e, t, r) {
      switch (t.tag) {
        case 3:
          bd(t), mr();
          break;
        case 5:
          zc(t);
          break;
        case 1:
          lt(t.type) && ai(t);
          break;
        case 4:
          ks(t, t.stateNode.containerInfo);
          break;
        case 10:
          var i = t.type._context, s = t.memoizedProps.value;
          Ee(hi, i._currentValue), i._currentValue = s;
          break;
        case 13:
          if (i = t.memoizedState, i !== null) return i.dehydrated !== null ? (Ee(Le, Le.current & 1), t.flags |= 128, null) : r & t.child.childLanes ? xd(e, t, r) : (Ee(Le, Le.current & 1), e = nn(e, t, r), e !== null ? e.sibling : null);
          Ee(Le, Le.current & 1);
          break;
        case 19:
          if (i = (r & t.childLanes) !== 0, e.flags & 128) {
            if (i) return Cd(e, t, r);
            t.flags |= 128;
          }
          if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), Ee(Le, Le.current), i) break;
          return null;
        case 22:
        case 23:
          return t.lanes = 0, vd(e, t, r);
      }
      return nn(e, t, r);
    }
    var Pd, Gs, Ed, Td;
    Pd = function(e, t) {
      for (var r = t.child; r !== null; ) {
        if (r.tag === 5 || r.tag === 6) e.appendChild(r.stateNode);
        else if (r.tag !== 4 && r.child !== null) {
          r.child.return = r, r = r.child;
          continue;
        }
        if (r === t) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === t) return;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }, Gs = function() {
    }, Ed = function(e, t, r, i) {
      var s = e.memoizedProps;
      if (s !== i) {
        e = t.stateNode, Vn(zt.current);
        var c = null;
        switch (r) {
          case "input":
            s = bl(e, s), i = bl(e, i), c = [];
            break;
          case "select":
            s = Q({}, s, {
              value: void 0
            }), i = Q({}, i, {
              value: void 0
            }), c = [];
            break;
          case "textarea":
            s = kl(e, s), i = kl(e, i), c = [];
            break;
          default:
            typeof s.onClick != "function" && typeof i.onClick == "function" && (e.onclick = ii);
        }
        Pl(r, i);
        var h;
        r = null;
        for (A in s) if (!i.hasOwnProperty(A) && s.hasOwnProperty(A) && s[A] != null) if (A === "style") {
          var v = s[A];
          for (h in v) v.hasOwnProperty(h) && (r || (r = {}), r[h] = "");
        } else A !== "dangerouslySetInnerHTML" && A !== "children" && A !== "suppressContentEditableWarning" && A !== "suppressHydrationWarning" && A !== "autoFocus" && (u.hasOwnProperty(A) ? c || (c = []) : (c = c || []).push(A, null));
        for (A in i) {
          var S = i[A];
          if (v = s == null ? void 0 : s[A], i.hasOwnProperty(A) && S !== v && (S != null || v != null)) if (A === "style") if (v) {
            for (h in v) !v.hasOwnProperty(h) || S && S.hasOwnProperty(h) || (r || (r = {}), r[h] = "");
            for (h in S) S.hasOwnProperty(h) && v[h] !== S[h] && (r || (r = {}), r[h] = S[h]);
          } else r || (c || (c = []), c.push(A, r)), r = S;
          else A === "dangerouslySetInnerHTML" ? (S = S ? S.__html : void 0, v = v ? v.__html : void 0, S != null && v !== S && (c = c || []).push(A, S)) : A === "children" ? typeof S != "string" && typeof S != "number" || (c = c || []).push(A, "" + S) : A !== "suppressContentEditableWarning" && A !== "suppressHydrationWarning" && (u.hasOwnProperty(A) ? (S != null && A === "onScroll" && Re("scroll", e), c || v === S || (c = [])) : (c = c || []).push(A, S));
        }
        r && (c = c || []).push("style", r);
        var A = c;
        (t.updateQueue = A) && (t.flags |= 4);
      }
    }, Td = function(e, t, r, i) {
      r !== i && (t.flags |= 4);
    };
    function wo(e, t) {
      if (!Ae) switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var r = null; t !== null; ) t.alternate !== null && (r = t), t = t.sibling;
          r === null ? e.tail = null : r.sibling = null;
          break;
        case "collapsed":
          r = e.tail;
          for (var i = null; r !== null; ) r.alternate !== null && (i = r), r = r.sibling;
          i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
      }
    }
    function Ye(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, r = 0, i = 0;
      if (t) for (var s = e.child; s !== null; ) r |= s.lanes | s.childLanes, i |= s.subtreeFlags & 14680064, i |= s.flags & 14680064, s.return = e, s = s.sibling;
      else for (s = e.child; s !== null; ) r |= s.lanes | s.childLanes, i |= s.subtreeFlags, i |= s.flags, s.return = e, s = s.sibling;
      return e.subtreeFlags |= i, e.childLanes = r, t;
    }
    function eg(e, t, r) {
      var i = t.pendingProps;
      switch (hs(t), t.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return Ye(t), null;
        case 1:
          return lt(t.type) && si(), Ye(t), null;
        case 3:
          return i = t.stateNode, _r(), Me(it), Me(Ke), Es(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (fi(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Et !== null && (ra(Et), Et = null))), Gs(e, t), Ye(t), null;
        case 5:
          Cs(t);
          var s = Vn(mo.current);
          if (r = t.type, e !== null && t.stateNode != null) Ed(e, t, r, i, s), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
          else {
            if (!i) {
              if (t.stateNode === null) throw Error(l(166));
              return Ye(t), null;
            }
            if (e = Vn(zt.current), fi(t)) {
              i = t.stateNode, r = t.type;
              var c = t.memoizedProps;
              switch (i[Ft] = t, i[uo] = c, e = (t.mode & 1) !== 0, r) {
                case "dialog":
                  Re("cancel", i), Re("close", i);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Re("load", i);
                  break;
                case "video":
                case "audio":
                  for (s = 0; s < lo.length; s++) Re(lo[s], i);
                  break;
                case "source":
                  Re("error", i);
                  break;
                case "img":
                case "image":
                case "link":
                  Re("error", i), Re("load", i);
                  break;
                case "details":
                  Re("toggle", i);
                  break;
                case "input":
                  au(i, c), Re("invalid", i);
                  break;
                case "select":
                  i._wrapperState = {
                    wasMultiple: !!c.multiple
                  }, Re("invalid", i);
                  break;
                case "textarea":
                  du(i, c), Re("invalid", i);
              }
              Pl(r, c), s = null;
              for (var h in c) if (c.hasOwnProperty(h)) {
                var v = c[h];
                h === "children" ? typeof v == "string" ? i.textContent !== v && (c.suppressHydrationWarning !== true && oi(i.textContent, v, e), s = [
                  "children",
                  v
                ]) : typeof v == "number" && i.textContent !== "" + v && (c.suppressHydrationWarning !== true && oi(i.textContent, v, e), s = [
                  "children",
                  "" + v
                ]) : u.hasOwnProperty(h) && v != null && h === "onScroll" && Re("scroll", i);
              }
              switch (r) {
                case "input":
                  Zn(i), cu(i, c, true);
                  break;
                case "textarea":
                  Zn(i), pu(i);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  typeof c.onClick == "function" && (i.onclick = ii);
              }
              i = s, t.updateQueue = i, i !== null && (t.flags |= 4);
            } else {
              h = s.nodeType === 9 ? s : s.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = hu(r)), e === "http://www.w3.org/1999/xhtml" ? r === "script" ? (e = h.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof i.is == "string" ? e = h.createElement(r, {
                is: i.is
              }) : (e = h.createElement(r), r === "select" && (h = e, i.multiple ? h.multiple = true : i.size && (h.size = i.size))) : e = h.createElementNS(e, r), e[Ft] = t, e[uo] = i, Pd(e, t, false, false), t.stateNode = e;
              e: {
                switch (h = El(r, i), r) {
                  case "dialog":
                    Re("cancel", e), Re("close", e), s = i;
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    Re("load", e), s = i;
                    break;
                  case "video":
                  case "audio":
                    for (s = 0; s < lo.length; s++) Re(lo[s], e);
                    s = i;
                    break;
                  case "source":
                    Re("error", e), s = i;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    Re("error", e), Re("load", e), s = i;
                    break;
                  case "details":
                    Re("toggle", e), s = i;
                    break;
                  case "input":
                    au(e, i), s = bl(e, i), Re("invalid", e);
                    break;
                  case "option":
                    s = i;
                    break;
                  case "select":
                    e._wrapperState = {
                      wasMultiple: !!i.multiple
                    }, s = Q({}, i, {
                      value: void 0
                    }), Re("invalid", e);
                    break;
                  case "textarea":
                    du(e, i), s = kl(e, i), Re("invalid", e);
                    break;
                  default:
                    s = i;
                }
                Pl(r, s), v = s;
                for (c in v) if (v.hasOwnProperty(c)) {
                  var S = v[c];
                  c === "style" ? yu(e, S) : c === "dangerouslySetInnerHTML" ? (S = S ? S.__html : void 0, S != null && mu(e, S)) : c === "children" ? typeof S == "string" ? (r !== "textarea" || S !== "") && Wr(e, S) : typeof S == "number" && Wr(e, "" + S) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (u.hasOwnProperty(c) ? S != null && c === "onScroll" && Re("scroll", e) : S != null && H(e, c, S, h));
                }
                switch (r) {
                  case "input":
                    Zn(e), cu(e, i, false);
                    break;
                  case "textarea":
                    Zn(e), pu(e);
                    break;
                  case "option":
                    i.value != null && e.setAttribute("value", "" + Se(i.value));
                    break;
                  case "select":
                    e.multiple = !!i.multiple, c = i.value, c != null ? er(e, !!i.multiple, c, false) : i.defaultValue != null && er(e, !!i.multiple, i.defaultValue, true);
                    break;
                  default:
                    typeof s.onClick == "function" && (e.onclick = ii);
                }
                switch (r) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    i = !!i.autoFocus;
                    break e;
                  case "img":
                    i = true;
                    break e;
                  default:
                    i = false;
                }
              }
              i && (t.flags |= 4);
            }
            t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
          }
          return Ye(t), null;
        case 6:
          if (e && t.stateNode != null) Td(e, t, e.memoizedProps, i);
          else {
            if (typeof i != "string" && t.stateNode === null) throw Error(l(166));
            if (r = Vn(mo.current), Vn(zt.current), fi(t)) {
              if (i = t.stateNode, r = t.memoizedProps, i[Ft] = t, (c = i.nodeValue !== r) && (e = ft, e !== null)) switch (e.tag) {
                case 3:
                  oi(i.nodeValue, r, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== true && oi(i.nodeValue, r, (e.mode & 1) !== 0);
              }
              c && (t.flags |= 4);
            } else i = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(i), i[Ft] = t, t.stateNode = i;
          }
          return Ye(t), null;
        case 13:
          if (Me(Le), i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (Ae && pt !== null && t.mode & 1 && !(t.flags & 128)) Nc(), mr(), t.flags |= 98560, c = false;
            else if (c = fi(t), i !== null && i.dehydrated !== null) {
              if (e === null) {
                if (!c) throw Error(l(318));
                if (c = t.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(l(317));
                c[Ft] = t;
              } else mr(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
              Ye(t), c = false;
            } else Et !== null && (ra(Et), Et = null), c = true;
            if (!c) return t.flags & 65536 ? t : null;
          }
          return t.flags & 128 ? (t.lanes = r, t) : (i = i !== null, i !== (e !== null && e.memoizedState !== null) && i && (t.child.flags |= 8192, t.mode & 1 && (e === null || Le.current & 1 ? Ie === 0 && (Ie = 3) : la())), t.updateQueue !== null && (t.flags |= 4), Ye(t), null);
        case 4:
          return _r(), Gs(e, t), e === null && so(t.stateNode.containerInfo), Ye(t), null;
        case 10:
          return ws(t.type._context), Ye(t), null;
        case 17:
          return lt(t.type) && si(), Ye(t), null;
        case 19:
          if (Me(Le), c = t.memoizedState, c === null) return Ye(t), null;
          if (i = (t.flags & 128) !== 0, h = c.rendering, h === null) if (i) wo(c, false);
          else {
            if (Ie !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
              if (h = vi(e), h !== null) {
                for (t.flags |= 128, wo(c, false), i = h.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), t.subtreeFlags = 0, i = r, r = t.child; r !== null; ) c = r, e = i, c.flags &= 14680066, h = c.alternate, h === null ? (c.childLanes = 0, c.lanes = e, c.child = null, c.subtreeFlags = 0, c.memoizedProps = null, c.memoizedState = null, c.updateQueue = null, c.dependencies = null, c.stateNode = null) : (c.childLanes = h.childLanes, c.lanes = h.lanes, c.child = h.child, c.subtreeFlags = 0, c.deletions = null, c.memoizedProps = h.memoizedProps, c.memoizedState = h.memoizedState, c.updateQueue = h.updateQueue, c.type = h.type, e = h.dependencies, c.dependencies = e === null ? null : {
                  lanes: e.lanes,
                  firstContext: e.firstContext
                }), r = r.sibling;
                return Ee(Le, Le.current & 1 | 2), t.child;
              }
              e = e.sibling;
            }
            c.tail !== null && De() > xr && (t.flags |= 128, i = true, wo(c, false), t.lanes = 4194304);
          }
          else {
            if (!i) if (e = vi(h), e !== null) {
              if (t.flags |= 128, i = true, r = e.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), wo(c, true), c.tail === null && c.tailMode === "hidden" && !h.alternate && !Ae) return Ye(t), null;
            } else 2 * De() - c.renderingStartTime > xr && r !== 1073741824 && (t.flags |= 128, i = true, wo(c, false), t.lanes = 4194304);
            c.isBackwards ? (h.sibling = t.child, t.child = h) : (r = c.last, r !== null ? r.sibling = h : t.child = h, c.last = h);
          }
          return c.tail !== null ? (t = c.tail, c.rendering = t, c.tail = t.sibling, c.renderingStartTime = De(), t.sibling = null, r = Le.current, Ee(Le, i ? r & 1 | 2 : r & 1), t) : (Ye(t), null);
        case 22:
        case 23:
          return ia(), i = t.memoizedState !== null, e !== null && e.memoizedState !== null !== i && (t.flags |= 8192), i && t.mode & 1 ? ht & 1073741824 && (Ye(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ye(t), null;
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(l(156, t.tag));
    }
    function tg(e, t) {
      switch (hs(t), t.tag) {
        case 1:
          return lt(t.type) && si(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
          return _r(), Me(it), Me(Ke), Es(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
        case 5:
          return Cs(t), null;
        case 13:
          if (Me(Le), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null) throw Error(l(340));
            mr();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
          return Me(Le), null;
        case 4:
          return _r(), null;
        case 10:
          return ws(t.type._context), null;
        case 22:
        case 23:
          return ia(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var Ei = false, qe = false, ng = typeof WeakSet == "function" ? WeakSet : Set, Z = null;
    function br(e, t) {
      var r = e.ref;
      if (r !== null) if (typeof r == "function") try {
        r(null);
      } catch (i) {
        je(e, t, i);
      }
      else r.current = null;
    }
    function Ks(e, t, r) {
      try {
        r();
      } catch (i) {
        je(e, t, i);
      }
    }
    var Rd = false;
    function rg(e, t) {
      if (is = Ko, e = sc(), Xl(e)) {
        if ("selectionStart" in e) var r = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
        else e: {
          r = (r = e.ownerDocument) && r.defaultView || window;
          var i = r.getSelection && r.getSelection();
          if (i && i.rangeCount !== 0) {
            r = i.anchorNode;
            var s = i.anchorOffset, c = i.focusNode;
            i = i.focusOffset;
            try {
              r.nodeType, c.nodeType;
            } catch {
              r = null;
              break e;
            }
            var h = 0, v = -1, S = -1, A = 0, I = 0, U = e, z = null;
            t: for (; ; ) {
              for (var J; U !== r || s !== 0 && U.nodeType !== 3 || (v = h + s), U !== c || i !== 0 && U.nodeType !== 3 || (S = h + i), U.nodeType === 3 && (h += U.nodeValue.length), (J = U.firstChild) !== null; ) z = U, U = J;
              for (; ; ) {
                if (U === e) break t;
                if (z === r && ++A === s && (v = h), z === c && ++I === i && (S = h), (J = U.nextSibling) !== null) break;
                U = z, z = U.parentNode;
              }
              U = J;
            }
            r = v === -1 || S === -1 ? null : {
              start: v,
              end: S
            };
          } else r = null;
        }
        r = r || {
          start: 0,
          end: 0
        };
      } else r = null;
      for (ls = {
        focusedElem: e,
        selectionRange: r
      }, Ko = false, Z = t; Z !== null; ) if (t = Z, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Z = e;
      else for (; Z !== null; ) {
        t = Z;
        try {
          var ee = t.alternate;
          if (t.flags & 1024) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              break;
            case 1:
              if (ee !== null) {
                var te = ee.memoizedProps, Be = ee.memoizedState, T = t.stateNode, C = T.getSnapshotBeforeUpdate(t.elementType === t.type ? te : Tt(t.type, te), Be);
                T.__reactInternalSnapshotBeforeUpdate = C;
              }
              break;
            case 3:
              var N = t.stateNode.containerInfo;
              N.nodeType === 1 ? N.textContent = "" : N.nodeType === 9 && N.documentElement && N.removeChild(N.documentElement);
              break;
            case 5:
            case 6:
            case 4:
            case 17:
              break;
            default:
              throw Error(l(163));
          }
        } catch ($) {
          je(t, t.return, $);
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, Z = e;
          break;
        }
        Z = t.return;
      }
      return ee = Rd, Rd = false, ee;
    }
    function bo(e, t, r) {
      var i = t.updateQueue;
      if (i = i !== null ? i.lastEffect : null, i !== null) {
        var s = i = i.next;
        do {
          if ((s.tag & e) === e) {
            var c = s.destroy;
            s.destroy = void 0, c !== void 0 && Ks(t, r, c);
          }
          s = s.next;
        } while (s !== i);
      }
    }
    function Ti(e, t) {
      if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
        var r = t = t.next;
        do {
          if ((r.tag & e) === e) {
            var i = r.create;
            r.destroy = i();
          }
          r = r.next;
        } while (r !== t);
      }
    }
    function Qs(e) {
      var t = e.ref;
      if (t !== null) {
        var r = e.stateNode;
        switch (e.tag) {
          case 5:
            e = r;
            break;
          default:
            e = r;
        }
        typeof t == "function" ? t(e) : t.current = e;
      }
    }
    function Md(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, Md(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ft], delete t[uo], delete t[cs], delete t[zm], delete t[Im])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    function Nd(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function Ad(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || Nd(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Ys(e, t, r) {
      var i = e.tag;
      if (i === 5 || i === 6) e = e.stateNode, t ? r.nodeType === 8 ? r.parentNode.insertBefore(e, t) : r.insertBefore(e, t) : (r.nodeType === 8 ? (t = r.parentNode, t.insertBefore(e, r)) : (t = r, t.appendChild(e)), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = ii));
      else if (i !== 4 && (e = e.child, e !== null)) for (Ys(e, t, r), e = e.sibling; e !== null; ) Ys(e, t, r), e = e.sibling;
    }
    function qs(e, t, r) {
      var i = e.tag;
      if (i === 5 || i === 6) e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
      else if (i !== 4 && (e = e.child, e !== null)) for (qs(e, t, r), e = e.sibling; e !== null; ) qs(e, t, r), e = e.sibling;
    }
    var Ve = null, Rt = false;
    function wn(e, t, r) {
      for (r = r.child; r !== null; ) Ld(e, t, r), r = r.sibling;
    }
    function Ld(e, t, r) {
      if (Bt && typeof Bt.onCommitFiberUnmount == "function") try {
        Bt.onCommitFiberUnmount(Wo, r);
      } catch {
      }
      switch (r.tag) {
        case 5:
          qe || br(r, t);
        case 6:
          var i = Ve, s = Rt;
          Ve = null, wn(e, t, r), Ve = i, Rt = s, Ve !== null && (Rt ? (e = Ve, r = r.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r)) : Ve.removeChild(r.stateNode));
          break;
        case 18:
          Ve !== null && (Rt ? (e = Ve, r = r.stateNode, e.nodeType === 8 ? us(e.parentNode, r) : e.nodeType === 1 && us(e, r), Jr(e)) : us(Ve, r.stateNode));
          break;
        case 4:
          i = Ve, s = Rt, Ve = r.stateNode.containerInfo, Rt = true, wn(e, t, r), Ve = i, Rt = s;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (!qe && (i = r.updateQueue, i !== null && (i = i.lastEffect, i !== null))) {
            s = i = i.next;
            do {
              var c = s, h = c.destroy;
              c = c.tag, h !== void 0 && (c & 2 || c & 4) && Ks(r, t, h), s = s.next;
            } while (s !== i);
          }
          wn(e, t, r);
          break;
        case 1:
          if (!qe && (br(r, t), i = r.stateNode, typeof i.componentWillUnmount == "function")) try {
            i.props = r.memoizedProps, i.state = r.memoizedState, i.componentWillUnmount();
          } catch (v) {
            je(r, t, v);
          }
          wn(e, t, r);
          break;
        case 21:
          wn(e, t, r);
          break;
        case 22:
          r.mode & 1 ? (qe = (i = qe) || r.memoizedState !== null, wn(e, t, r), qe = i) : wn(e, t, r);
          break;
        default:
          wn(e, t, r);
      }
    }
    function Od(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var r = e.stateNode;
        r === null && (r = e.stateNode = new ng()), t.forEach(function(i) {
          var s = fg.bind(null, e, i);
          r.has(i) || (r.add(i), i.then(s, s));
        });
      }
    }
    function Mt(e, t) {
      var r = t.deletions;
      if (r !== null) for (var i = 0; i < r.length; i++) {
        var s = r[i];
        try {
          var c = e, h = t, v = h;
          e: for (; v !== null; ) {
            switch (v.tag) {
              case 5:
                Ve = v.stateNode, Rt = false;
                break e;
              case 3:
                Ve = v.stateNode.containerInfo, Rt = true;
                break e;
              case 4:
                Ve = v.stateNode.containerInfo, Rt = true;
                break e;
            }
            v = v.return;
          }
          if (Ve === null) throw Error(l(160));
          Ld(c, h, s), Ve = null, Rt = false;
          var S = s.alternate;
          S !== null && (S.return = null), s.return = null;
        } catch (A) {
          je(s, t, A);
        }
      }
      if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) jd(t, e), t = t.sibling;
    }
    function jd(e, t) {
      var r = e.alternate, i = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if (Mt(t, e), Wt(e), i & 4) {
            try {
              bo(3, e, e.return), Ti(3, e);
            } catch (te) {
              je(e, e.return, te);
            }
            try {
              bo(5, e, e.return);
            } catch (te) {
              je(e, e.return, te);
            }
          }
          break;
        case 1:
          Mt(t, e), Wt(e), i & 512 && r !== null && br(r, r.return);
          break;
        case 5:
          if (Mt(t, e), Wt(e), i & 512 && r !== null && br(r, r.return), e.flags & 32) {
            var s = e.stateNode;
            try {
              Wr(s, "");
            } catch (te) {
              je(e, e.return, te);
            }
          }
          if (i & 4 && (s = e.stateNode, s != null)) {
            var c = e.memoizedProps, h = r !== null ? r.memoizedProps : c, v = e.type, S = e.updateQueue;
            if (e.updateQueue = null, S !== null) try {
              v === "input" && c.type === "radio" && c.name != null && uu(s, c), El(v, h);
              var A = El(v, c);
              for (h = 0; h < S.length; h += 2) {
                var I = S[h], U = S[h + 1];
                I === "style" ? yu(s, U) : I === "dangerouslySetInnerHTML" ? mu(s, U) : I === "children" ? Wr(s, U) : H(s, I, U, A);
              }
              switch (v) {
                case "input":
                  Sl(s, c);
                  break;
                case "textarea":
                  fu(s, c);
                  break;
                case "select":
                  var z = s._wrapperState.wasMultiple;
                  s._wrapperState.wasMultiple = !!c.multiple;
                  var J = c.value;
                  J != null ? er(s, !!c.multiple, J, false) : z !== !!c.multiple && (c.defaultValue != null ? er(s, !!c.multiple, c.defaultValue, true) : er(s, !!c.multiple, c.multiple ? [] : "", false));
              }
              s[uo] = c;
            } catch (te) {
              je(e, e.return, te);
            }
          }
          break;
        case 6:
          if (Mt(t, e), Wt(e), i & 4) {
            if (e.stateNode === null) throw Error(l(162));
            s = e.stateNode, c = e.memoizedProps;
            try {
              s.nodeValue = c;
            } catch (te) {
              je(e, e.return, te);
            }
          }
          break;
        case 3:
          if (Mt(t, e), Wt(e), i & 4 && r !== null && r.memoizedState.isDehydrated) try {
            Jr(t.containerInfo);
          } catch (te) {
            je(e, e.return, te);
          }
          break;
        case 4:
          Mt(t, e), Wt(e);
          break;
        case 13:
          Mt(t, e), Wt(e), s = e.child, s.flags & 8192 && (c = s.memoizedState !== null, s.stateNode.isHidden = c, !c || s.alternate !== null && s.alternate.memoizedState !== null || (Zs = De())), i & 4 && Od(e);
          break;
        case 22:
          if (I = r !== null && r.memoizedState !== null, e.mode & 1 ? (qe = (A = qe) || I, Mt(t, e), qe = A) : Mt(t, e), Wt(e), i & 8192) {
            if (A = e.memoizedState !== null, (e.stateNode.isHidden = A) && !I && e.mode & 1) for (Z = e, I = e.child; I !== null; ) {
              for (U = Z = I; Z !== null; ) {
                switch (z = Z, J = z.child, z.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    bo(4, z, z.return);
                    break;
                  case 1:
                    br(z, z.return);
                    var ee = z.stateNode;
                    if (typeof ee.componentWillUnmount == "function") {
                      i = z, r = z.return;
                      try {
                        t = i, ee.props = t.memoizedProps, ee.state = t.memoizedState, ee.componentWillUnmount();
                      } catch (te) {
                        je(i, r, te);
                      }
                    }
                    break;
                  case 5:
                    br(z, z.return);
                    break;
                  case 22:
                    if (z.memoizedState !== null) {
                      Fd(U);
                      continue;
                    }
                }
                J !== null ? (J.return = z, Z = J) : Fd(U);
              }
              I = I.sibling;
            }
            e: for (I = null, U = e; ; ) {
              if (U.tag === 5) {
                if (I === null) {
                  I = U;
                  try {
                    s = U.stateNode, A ? (c = s.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none") : (v = U.stateNode, S = U.memoizedProps.style, h = S != null && S.hasOwnProperty("display") ? S.display : null, v.style.display = gu("display", h));
                  } catch (te) {
                    je(e, e.return, te);
                  }
                }
              } else if (U.tag === 6) {
                if (I === null) try {
                  U.stateNode.nodeValue = A ? "" : U.memoizedProps;
                } catch (te) {
                  je(e, e.return, te);
                }
              } else if ((U.tag !== 22 && U.tag !== 23 || U.memoizedState === null || U === e) && U.child !== null) {
                U.child.return = U, U = U.child;
                continue;
              }
              if (U === e) break e;
              for (; U.sibling === null; ) {
                if (U.return === null || U.return === e) break e;
                I === U && (I = null), U = U.return;
              }
              I === U && (I = null), U.sibling.return = U.return, U = U.sibling;
            }
          }
          break;
        case 19:
          Mt(t, e), Wt(e), i & 4 && Od(e);
          break;
        case 21:
          break;
        default:
          Mt(t, e), Wt(e);
      }
    }
    function Wt(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          e: {
            for (var r = e.return; r !== null; ) {
              if (Nd(r)) {
                var i = r;
                break e;
              }
              r = r.return;
            }
            throw Error(l(160));
          }
          switch (i.tag) {
            case 5:
              var s = i.stateNode;
              i.flags & 32 && (Wr(s, ""), i.flags &= -33);
              var c = Ad(e);
              qs(e, c, s);
              break;
            case 3:
            case 4:
              var h = i.stateNode.containerInfo, v = Ad(e);
              Ys(e, v, h);
              break;
            default:
              throw Error(l(161));
          }
        } catch (S) {
          je(e, e.return, S);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function og(e, t, r) {
      Z = e, Dd(e);
    }
    function Dd(e, t, r) {
      for (var i = (e.mode & 1) !== 0; Z !== null; ) {
        var s = Z, c = s.child;
        if (s.tag === 22 && i) {
          var h = s.memoizedState !== null || Ei;
          if (!h) {
            var v = s.alternate, S = v !== null && v.memoizedState !== null || qe;
            v = Ei;
            var A = qe;
            if (Ei = h, (qe = S) && !A) for (Z = s; Z !== null; ) h = Z, S = h.child, h.tag === 22 && h.memoizedState !== null ? zd(s) : S !== null ? (S.return = h, Z = S) : zd(s);
            for (; c !== null; ) Z = c, Dd(c), c = c.sibling;
            Z = s, Ei = v, qe = A;
          }
          Bd(e);
        } else s.subtreeFlags & 8772 && c !== null ? (c.return = s, Z = c) : Bd(e);
      }
    }
    function Bd(e) {
      for (; Z !== null; ) {
        var t = Z;
        if (t.flags & 8772) {
          var r = t.alternate;
          try {
            if (t.flags & 8772) switch (t.tag) {
              case 0:
              case 11:
              case 15:
                qe || Ti(5, t);
                break;
              case 1:
                var i = t.stateNode;
                if (t.flags & 4 && !qe) if (r === null) i.componentDidMount();
                else {
                  var s = t.elementType === t.type ? r.memoizedProps : Tt(t.type, r.memoizedProps);
                  i.componentDidUpdate(s, r.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
                }
                var c = t.updateQueue;
                c !== null && Fc(t, c, i);
                break;
              case 3:
                var h = t.updateQueue;
                if (h !== null) {
                  if (r = null, t.child !== null) switch (t.child.tag) {
                    case 5:
                      r = t.child.stateNode;
                      break;
                    case 1:
                      r = t.child.stateNode;
                  }
                  Fc(t, h, r);
                }
                break;
              case 5:
                var v = t.stateNode;
                if (r === null && t.flags & 4) {
                  r = v;
                  var S = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      S.autoFocus && r.focus();
                      break;
                    case "img":
                      S.src && (r.src = S.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var A = t.alternate;
                  if (A !== null) {
                    var I = A.memoizedState;
                    if (I !== null) {
                      var U = I.dehydrated;
                      U !== null && Jr(U);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(l(163));
            }
            qe || t.flags & 512 && Qs(t);
          } catch (z) {
            je(t, t.return, z);
          }
        }
        if (t === e) {
          Z = null;
          break;
        }
        if (r = t.sibling, r !== null) {
          r.return = t.return, Z = r;
          break;
        }
        Z = t.return;
      }
    }
    function Fd(e) {
      for (; Z !== null; ) {
        var t = Z;
        if (t === e) {
          Z = null;
          break;
        }
        var r = t.sibling;
        if (r !== null) {
          r.return = t.return, Z = r;
          break;
        }
        Z = t.return;
      }
    }
    function zd(e) {
      for (; Z !== null; ) {
        var t = Z;
        try {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              var r = t.return;
              try {
                Ti(4, t);
              } catch (S) {
                je(t, r, S);
              }
              break;
            case 1:
              var i = t.stateNode;
              if (typeof i.componentDidMount == "function") {
                var s = t.return;
                try {
                  i.componentDidMount();
                } catch (S) {
                  je(t, s, S);
                }
              }
              var c = t.return;
              try {
                Qs(t);
              } catch (S) {
                je(t, c, S);
              }
              break;
            case 5:
              var h = t.return;
              try {
                Qs(t);
              } catch (S) {
                je(t, h, S);
              }
          }
        } catch (S) {
          je(t, t.return, S);
        }
        if (t === e) {
          Z = null;
          break;
        }
        var v = t.sibling;
        if (v !== null) {
          v.return = t.return, Z = v;
          break;
        }
        Z = t.return;
      }
    }
    var ig = Math.ceil, Ri = O.ReactCurrentDispatcher, Xs = O.ReactCurrentOwner, bt = O.ReactCurrentBatchConfig, _e = 0, He = null, Fe = null, $e = 0, ht = 0, Sr = mn(0), Ie = 0, So = null, Gn = 0, Mi = 0, Js = 0, xo = null, at = null, Zs = 0, xr = 1 / 0, rn = null, Ni = false, ea = null, bn = null, Ai = false, Sn = null, Li = 0, ko = 0, ta = null, Oi = -1, ji = 0;
    function nt() {
      return _e & 6 ? De() : Oi !== -1 ? Oi : Oi = De();
    }
    function xn(e) {
      return e.mode & 1 ? _e & 2 && $e !== 0 ? $e & -$e : Hm.transition !== null ? (ji === 0 && (ji = Au()), ji) : (e = ke, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Wu(e.type)), e) : 1;
    }
    function Nt(e, t, r, i) {
      if (50 < ko) throw ko = 0, ta = null, Error(l(185));
      Kr(e, r, i), (!(_e & 2) || e !== He) && (e === He && (!(_e & 2) && (Mi |= r), Ie === 4 && kn(e, $e)), ut(e, i), r === 1 && _e === 0 && !(t.mode & 1) && (xr = De() + 500, ui && yn()));
    }
    function ut(e, t) {
      var r = e.callbackNode;
      Hh(e, t);
      var i = Vo(e, e === He ? $e : 0);
      if (i === 0) r !== null && Ru(r), e.callbackNode = null, e.callbackPriority = 0;
      else if (t = i & -i, e.callbackPriority !== t) {
        if (r != null && Ru(r), t === 1) e.tag === 0 ? Wm(Wd.bind(null, e)) : Pc(Wd.bind(null, e)), Bm(function() {
          !(_e & 6) && yn();
        }), r = null;
        else {
          switch (Lu(i)) {
            case 1:
              r = Ol;
              break;
            case 4:
              r = Mu;
              break;
            case 16:
              r = Io;
              break;
            case 536870912:
              r = Nu;
              break;
            default:
              r = Io;
          }
          r = Yd(r, Id.bind(null, e));
        }
        e.callbackPriority = t, e.callbackNode = r;
      }
    }
    function Id(e, t) {
      if (Oi = -1, ji = 0, _e & 6) throw Error(l(327));
      var r = e.callbackNode;
      if (kr() && e.callbackNode !== r) return null;
      var i = Vo(e, e === He ? $e : 0);
      if (i === 0) return null;
      if (i & 30 || i & e.expiredLanes || t) t = Di(e, i);
      else {
        t = i;
        var s = _e;
        _e |= 2;
        var c = Ud();
        (He !== e || $e !== t) && (rn = null, xr = De() + 500, Qn(e, t));
        do
          try {
            ag();
            break;
          } catch (v) {
            Hd(e, v);
          }
        while (true);
        _s(), Ri.current = c, _e = s, Fe !== null ? t = 0 : (He = null, $e = 0, t = Ie);
      }
      if (t !== 0) {
        if (t === 2 && (s = jl(e), s !== 0 && (i = s, t = na(e, s))), t === 1) throw r = So, Qn(e, 0), kn(e, i), ut(e, De()), r;
        if (t === 6) kn(e, i);
        else {
          if (s = e.current.alternate, !(i & 30) && !lg(s) && (t = Di(e, i), t === 2 && (c = jl(e), c !== 0 && (i = c, t = na(e, c))), t === 1)) throw r = So, Qn(e, 0), kn(e, i), ut(e, De()), r;
          switch (e.finishedWork = s, e.finishedLanes = i, t) {
            case 0:
            case 1:
              throw Error(l(345));
            case 2:
              Yn(e, at, rn);
              break;
            case 3:
              if (kn(e, i), (i & 130023424) === i && (t = Zs + 500 - De(), 10 < t)) {
                if (Vo(e, 0) !== 0) break;
                if (s = e.suspendedLanes, (s & i) !== i) {
                  nt(), e.pingedLanes |= e.suspendedLanes & s;
                  break;
                }
                e.timeoutHandle = as(Yn.bind(null, e, at, rn), t);
                break;
              }
              Yn(e, at, rn);
              break;
            case 4:
              if (kn(e, i), (i & 4194240) === i) break;
              for (t = e.eventTimes, s = -1; 0 < i; ) {
                var h = 31 - Ct(i);
                c = 1 << h, h = t[h], h > s && (s = h), i &= ~c;
              }
              if (i = s, i = De() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * ig(i / 1960)) - i, 10 < i) {
                e.timeoutHandle = as(Yn.bind(null, e, at, rn), i);
                break;
              }
              Yn(e, at, rn);
              break;
            case 5:
              Yn(e, at, rn);
              break;
            default:
              throw Error(l(329));
          }
        }
      }
      return ut(e, De()), e.callbackNode === r ? Id.bind(null, e) : null;
    }
    function na(e, t) {
      var r = xo;
      return e.current.memoizedState.isDehydrated && (Qn(e, t).flags |= 256), e = Di(e, t), e !== 2 && (t = at, at = r, t !== null && ra(t)), e;
    }
    function ra(e) {
      at === null ? at = e : at.push.apply(at, e);
    }
    function lg(e) {
      for (var t = e; ; ) {
        if (t.flags & 16384) {
          var r = t.updateQueue;
          if (r !== null && (r = r.stores, r !== null)) for (var i = 0; i < r.length; i++) {
            var s = r[i], c = s.getSnapshot;
            s = s.value;
            try {
              if (!Pt(c(), s)) return false;
            } catch {
              return false;
            }
          }
        }
        if (r = t.child, t.subtreeFlags & 16384 && r !== null) r.return = t, t = r;
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return true;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      }
      return true;
    }
    function kn(e, t) {
      for (t &= ~Js, t &= ~Mi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
        var r = 31 - Ct(t), i = 1 << r;
        e[r] = -1, t &= ~i;
      }
    }
    function Wd(e) {
      if (_e & 6) throw Error(l(327));
      kr();
      var t = Vo(e, 0);
      if (!(t & 1)) return ut(e, De()), null;
      var r = Di(e, t);
      if (e.tag !== 0 && r === 2) {
        var i = jl(e);
        i !== 0 && (t = i, r = na(e, i));
      }
      if (r === 1) throw r = So, Qn(e, 0), kn(e, t), ut(e, De()), r;
      if (r === 6) throw Error(l(345));
      return e.finishedWork = e.current.alternate, e.finishedLanes = t, Yn(e, at, rn), ut(e, De()), null;
    }
    function oa(e, t) {
      var r = _e;
      _e |= 1;
      try {
        return e(t);
      } finally {
        _e = r, _e === 0 && (xr = De() + 500, ui && yn());
      }
    }
    function Kn(e) {
      Sn !== null && Sn.tag === 0 && !(_e & 6) && kr();
      var t = _e;
      _e |= 1;
      var r = bt.transition, i = ke;
      try {
        if (bt.transition = null, ke = 1, e) return e();
      } finally {
        ke = i, bt.transition = r, _e = t, !(_e & 6) && yn();
      }
    }
    function ia() {
      ht = Sr.current, Me(Sr);
    }
    function Qn(e, t) {
      e.finishedWork = null, e.finishedLanes = 0;
      var r = e.timeoutHandle;
      if (r !== -1 && (e.timeoutHandle = -1, Dm(r)), Fe !== null) for (r = Fe.return; r !== null; ) {
        var i = r;
        switch (hs(i), i.tag) {
          case 1:
            i = i.type.childContextTypes, i != null && si();
            break;
          case 3:
            _r(), Me(it), Me(Ke), Es();
            break;
          case 5:
            Cs(i);
            break;
          case 4:
            _r();
            break;
          case 13:
            Me(Le);
            break;
          case 19:
            Me(Le);
            break;
          case 10:
            ws(i.type._context);
            break;
          case 22:
          case 23:
            ia();
        }
        r = r.return;
      }
      if (He = e, Fe = e = Cn(e.current, null), $e = ht = t, Ie = 0, So = null, Js = Mi = Gn = 0, at = xo = null, Un !== null) {
        for (t = 0; t < Un.length; t++) if (r = Un[t], i = r.interleaved, i !== null) {
          r.interleaved = null;
          var s = i.next, c = r.pending;
          if (c !== null) {
            var h = c.next;
            c.next = s, i.next = h;
          }
          r.pending = i;
        }
        Un = null;
      }
      return e;
    }
    function Hd(e, t) {
      do {
        var r = Fe;
        try {
          if (_s(), _i.current = xi, wi) {
            for (var i = Oe.memoizedState; i !== null; ) {
              var s = i.queue;
              s !== null && (s.pending = null), i = i.next;
            }
            wi = false;
          }
          if ($n = 0, We = ze = Oe = null, go = false, yo = 0, Xs.current = null, r === null || r.return === null) {
            Ie = 1, So = t, Fe = null;
            break;
          }
          e: {
            var c = e, h = r.return, v = r, S = t;
            if (t = $e, v.flags |= 32768, S !== null && typeof S == "object" && typeof S.then == "function") {
              var A = S, I = v, U = I.tag;
              if (!(I.mode & 1) && (U === 0 || U === 11 || U === 15)) {
                var z = I.alternate;
                z ? (I.updateQueue = z.updateQueue, I.memoizedState = z.memoizedState, I.lanes = z.lanes) : (I.updateQueue = null, I.memoizedState = null);
              }
              var J = pd(h);
              if (J !== null) {
                J.flags &= -257, hd(J, h, v, c, t), J.mode & 1 && fd(c, A, t), t = J, S = A;
                var ee = t.updateQueue;
                if (ee === null) {
                  var te = /* @__PURE__ */ new Set();
                  te.add(S), t.updateQueue = te;
                } else ee.add(S);
                break e;
              } else {
                if (!(t & 1)) {
                  fd(c, A, t), la();
                  break e;
                }
                S = Error(l(426));
              }
            } else if (Ae && v.mode & 1) {
              var Be = pd(h);
              if (Be !== null) {
                !(Be.flags & 65536) && (Be.flags |= 256), hd(Be, h, v, c, t), ys(wr(S, v));
                break e;
              }
            }
            c = S = wr(S, v), Ie !== 4 && (Ie = 2), xo === null ? xo = [
              c
            ] : xo.push(c), c = h;
            do {
              switch (c.tag) {
                case 3:
                  c.flags |= 65536, t &= -t, c.lanes |= t;
                  var T = cd(c, S, t);
                  Bc(c, T);
                  break e;
                case 1:
                  v = S;
                  var C = c.type, N = c.stateNode;
                  if (!(c.flags & 128) && (typeof C.getDerivedStateFromError == "function" || N !== null && typeof N.componentDidCatch == "function" && (bn === null || !bn.has(N)))) {
                    c.flags |= 65536, t &= -t, c.lanes |= t;
                    var $ = dd(c, v, t);
                    Bc(c, $);
                    break e;
                  }
              }
              c = c.return;
            } while (c !== null);
          }
          $d(r);
        } catch (ne) {
          t = ne, Fe === r && r !== null && (Fe = r = r.return);
          continue;
        }
        break;
      } while (true);
    }
    function Ud() {
      var e = Ri.current;
      return Ri.current = xi, e === null ? xi : e;
    }
    function la() {
      (Ie === 0 || Ie === 3 || Ie === 2) && (Ie = 4), He === null || !(Gn & 268435455) && !(Mi & 268435455) || kn(He, $e);
    }
    function Di(e, t) {
      var r = _e;
      _e |= 2;
      var i = Ud();
      (He !== e || $e !== t) && (rn = null, Qn(e, t));
      do
        try {
          sg();
          break;
        } catch (s) {
          Hd(e, s);
        }
      while (true);
      if (_s(), _e = r, Ri.current = i, Fe !== null) throw Error(l(261));
      return He = null, $e = 0, Ie;
    }
    function sg() {
      for (; Fe !== null; ) Vd(Fe);
    }
    function ag() {
      for (; Fe !== null && !Lh(); ) Vd(Fe);
    }
    function Vd(e) {
      var t = Qd(e.alternate, e, ht);
      e.memoizedProps = e.pendingProps, t === null ? $d(e) : Fe = t, Xs.current = null;
    }
    function $d(e) {
      var t = e;
      do {
        var r = t.alternate;
        if (e = t.return, t.flags & 32768) {
          if (r = tg(r, t), r !== null) {
            r.flags &= 32767, Fe = r;
            return;
          }
          if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
          else {
            Ie = 6, Fe = null;
            return;
          }
        } else if (r = eg(r, t, ht), r !== null) {
          Fe = r;
          return;
        }
        if (t = t.sibling, t !== null) {
          Fe = t;
          return;
        }
        Fe = t = e;
      } while (t !== null);
      Ie === 0 && (Ie = 5);
    }
    function Yn(e, t, r) {
      var i = ke, s = bt.transition;
      try {
        bt.transition = null, ke = 1, ug(e, t, r, i);
      } finally {
        bt.transition = s, ke = i;
      }
      return null;
    }
    function ug(e, t, r, i) {
      do
        kr();
      while (Sn !== null);
      if (_e & 6) throw Error(l(327));
      r = e.finishedWork;
      var s = e.finishedLanes;
      if (r === null) return null;
      if (e.finishedWork = null, e.finishedLanes = 0, r === e.current) throw Error(l(177));
      e.callbackNode = null, e.callbackPriority = 0;
      var c = r.lanes | r.childLanes;
      if (Uh(e, c), e === He && (Fe = He = null, $e = 0), !(r.subtreeFlags & 2064) && !(r.flags & 2064) || Ai || (Ai = true, Yd(Io, function() {
        return kr(), null;
      })), c = (r.flags & 15990) !== 0, r.subtreeFlags & 15990 || c) {
        c = bt.transition, bt.transition = null;
        var h = ke;
        ke = 1;
        var v = _e;
        _e |= 4, Xs.current = null, rg(e, r), jd(r, e), Rm(ls), Ko = !!is, ls = is = null, e.current = r, og(r), Oh(), _e = v, ke = h, bt.transition = c;
      } else e.current = r;
      if (Ai && (Ai = false, Sn = e, Li = s), c = e.pendingLanes, c === 0 && (bn = null), Bh(r.stateNode), ut(e, De()), t !== null) for (i = e.onRecoverableError, r = 0; r < t.length; r++) s = t[r], i(s.value, {
        componentStack: s.stack,
        digest: s.digest
      });
      if (Ni) throw Ni = false, e = ea, ea = null, e;
      return Li & 1 && e.tag !== 0 && kr(), c = e.pendingLanes, c & 1 ? e === ta ? ko++ : (ko = 0, ta = e) : ko = 0, yn(), null;
    }
    function kr() {
      if (Sn !== null) {
        var e = Lu(Li), t = bt.transition, r = ke;
        try {
          if (bt.transition = null, ke = 16 > e ? 16 : e, Sn === null) var i = false;
          else {
            if (e = Sn, Sn = null, Li = 0, _e & 6) throw Error(l(331));
            var s = _e;
            for (_e |= 4, Z = e.current; Z !== null; ) {
              var c = Z, h = c.child;
              if (Z.flags & 16) {
                var v = c.deletions;
                if (v !== null) {
                  for (var S = 0; S < v.length; S++) {
                    var A = v[S];
                    for (Z = A; Z !== null; ) {
                      var I = Z;
                      switch (I.tag) {
                        case 0:
                        case 11:
                        case 15:
                          bo(8, I, c);
                      }
                      var U = I.child;
                      if (U !== null) U.return = I, Z = U;
                      else for (; Z !== null; ) {
                        I = Z;
                        var z = I.sibling, J = I.return;
                        if (Md(I), I === A) {
                          Z = null;
                          break;
                        }
                        if (z !== null) {
                          z.return = J, Z = z;
                          break;
                        }
                        Z = J;
                      }
                    }
                  }
                  var ee = c.alternate;
                  if (ee !== null) {
                    var te = ee.child;
                    if (te !== null) {
                      ee.child = null;
                      do {
                        var Be = te.sibling;
                        te.sibling = null, te = Be;
                      } while (te !== null);
                    }
                  }
                  Z = c;
                }
              }
              if (c.subtreeFlags & 2064 && h !== null) h.return = c, Z = h;
              else e: for (; Z !== null; ) {
                if (c = Z, c.flags & 2048) switch (c.tag) {
                  case 0:
                  case 11:
                  case 15:
                    bo(9, c, c.return);
                }
                var T = c.sibling;
                if (T !== null) {
                  T.return = c.return, Z = T;
                  break e;
                }
                Z = c.return;
              }
            }
            var C = e.current;
            for (Z = C; Z !== null; ) {
              h = Z;
              var N = h.child;
              if (h.subtreeFlags & 2064 && N !== null) N.return = h, Z = N;
              else e: for (h = C; Z !== null; ) {
                if (v = Z, v.flags & 2048) try {
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ti(9, v);
                  }
                } catch (ne) {
                  je(v, v.return, ne);
                }
                if (v === h) {
                  Z = null;
                  break e;
                }
                var $ = v.sibling;
                if ($ !== null) {
                  $.return = v.return, Z = $;
                  break e;
                }
                Z = v.return;
              }
            }
            if (_e = s, yn(), Bt && typeof Bt.onPostCommitFiberRoot == "function") try {
              Bt.onPostCommitFiberRoot(Wo, e);
            } catch {
            }
            i = true;
          }
          return i;
        } finally {
          ke = r, bt.transition = t;
        }
      }
      return false;
    }
    function Gd(e, t, r) {
      t = wr(r, t), t = cd(e, t, 1), e = _n(e, t, 1), t = nt(), e !== null && (Kr(e, 1, t), ut(e, t));
    }
    function je(e, t, r) {
      if (e.tag === 3) Gd(e, e, r);
      else for (; t !== null; ) {
        if (t.tag === 3) {
          Gd(t, e, r);
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (bn === null || !bn.has(i))) {
            e = wr(r, e), e = dd(t, e, 1), t = _n(t, e, 1), e = nt(), t !== null && (Kr(t, 1, e), ut(t, e));
            break;
          }
        }
        t = t.return;
      }
    }
    function cg(e, t, r) {
      var i = e.pingCache;
      i !== null && i.delete(t), t = nt(), e.pingedLanes |= e.suspendedLanes & r, He === e && ($e & r) === r && (Ie === 4 || Ie === 3 && ($e & 130023424) === $e && 500 > De() - Zs ? Qn(e, 0) : Js |= r), ut(e, t);
    }
    function Kd(e, t) {
      t === 0 && (e.mode & 1 ? (t = Uo, Uo <<= 1, !(Uo & 130023424) && (Uo = 4194304)) : t = 1);
      var r = nt();
      e = en(e, t), e !== null && (Kr(e, t, r), ut(e, r));
    }
    function dg(e) {
      var t = e.memoizedState, r = 0;
      t !== null && (r = t.retryLane), Kd(e, r);
    }
    function fg(e, t) {
      var r = 0;
      switch (e.tag) {
        case 13:
          var i = e.stateNode, s = e.memoizedState;
          s !== null && (r = s.retryLane);
          break;
        case 19:
          i = e.stateNode;
          break;
        default:
          throw Error(l(314));
      }
      i !== null && i.delete(t), Kd(e, r);
    }
    var Qd;
    Qd = function(e, t, r) {
      if (e !== null) if (e.memoizedProps !== t.pendingProps || it.current) st = true;
      else {
        if (!(e.lanes & r) && !(t.flags & 128)) return st = false, Zm(e, t, r);
        st = !!(e.flags & 131072);
      }
      else st = false, Ae && t.flags & 1048576 && Ec(t, di, t.index);
      switch (t.lanes = 0, t.tag) {
        case 2:
          var i = t.type;
          Pi(e, t), e = t.pendingProps;
          var s = fr(t, Ke.current);
          vr(t, r), s = Ms(null, t, i, e, s, r);
          var c = Ns();
          return t.flags |= 1, typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, lt(i) ? (c = true, ai(t)) : c = false, t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, xs(t), s.updater = ki, t.stateNode = s, s._reactInternals = t, Bs(t, i, e, r), t = Ws(null, t, i, true, c, r)) : (t.tag = 0, Ae && c && ps(t), tt(null, t, s, r), t = t.child), t;
        case 16:
          i = t.elementType;
          e: {
            switch (Pi(e, t), e = t.pendingProps, s = i._init, i = s(i._payload), t.type = i, s = t.tag = hg(i), e = Tt(i, e), s) {
              case 0:
                t = Is(null, t, i, e, r);
                break e;
              case 1:
                t = wd(null, t, i, e, r);
                break e;
              case 11:
                t = md(null, t, i, e, r);
                break e;
              case 14:
                t = gd(null, t, i, Tt(i.type, e), r);
                break e;
            }
            throw Error(l(306, i, ""));
          }
          return t;
        case 0:
          return i = t.type, s = t.pendingProps, s = t.elementType === i ? s : Tt(i, s), Is(e, t, i, s, r);
        case 1:
          return i = t.type, s = t.pendingProps, s = t.elementType === i ? s : Tt(i, s), wd(e, t, i, s, r);
        case 3:
          e: {
            if (bd(t), e === null) throw Error(l(387));
            i = t.pendingProps, c = t.memoizedState, s = c.element, Dc(e, t), yi(t, i, null, r);
            var h = t.memoizedState;
            if (i = h.element, c.isDehydrated) if (c = {
              element: i,
              isDehydrated: false,
              cache: h.cache,
              pendingSuspenseBoundaries: h.pendingSuspenseBoundaries,
              transitions: h.transitions
            }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
              s = wr(Error(l(423)), t), t = Sd(e, t, i, r, s);
              break e;
            } else if (i !== s) {
              s = wr(Error(l(424)), t), t = Sd(e, t, i, r, s);
              break e;
            } else for (pt = hn(t.stateNode.containerInfo.firstChild), ft = t, Ae = true, Et = null, r = Oc(t, null, i, r), t.child = r; r; ) r.flags = r.flags & -3 | 4096, r = r.sibling;
            else {
              if (mr(), i === s) {
                t = nn(e, t, r);
                break e;
              }
              tt(e, t, i, r);
            }
            t = t.child;
          }
          return t;
        case 5:
          return zc(t), e === null && gs(t), i = t.type, s = t.pendingProps, c = e !== null ? e.memoizedProps : null, h = s.children, ss(i, s) ? h = null : c !== null && ss(i, c) && (t.flags |= 32), _d(e, t), tt(e, t, h, r), t.child;
        case 6:
          return e === null && gs(t), null;
        case 13:
          return xd(e, t, r);
        case 4:
          return ks(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = gr(t, null, i, r) : tt(e, t, i, r), t.child;
        case 11:
          return i = t.type, s = t.pendingProps, s = t.elementType === i ? s : Tt(i, s), md(e, t, i, s, r);
        case 7:
          return tt(e, t, t.pendingProps, r), t.child;
        case 8:
          return tt(e, t, t.pendingProps.children, r), t.child;
        case 12:
          return tt(e, t, t.pendingProps.children, r), t.child;
        case 10:
          e: {
            if (i = t.type._context, s = t.pendingProps, c = t.memoizedProps, h = s.value, Ee(hi, i._currentValue), i._currentValue = h, c !== null) if (Pt(c.value, h)) {
              if (c.children === s.children && !it.current) {
                t = nn(e, t, r);
                break e;
              }
            } else for (c = t.child, c !== null && (c.return = t); c !== null; ) {
              var v = c.dependencies;
              if (v !== null) {
                h = c.child;
                for (var S = v.firstContext; S !== null; ) {
                  if (S.context === i) {
                    if (c.tag === 1) {
                      S = tn(-1, r & -r), S.tag = 2;
                      var A = c.updateQueue;
                      if (A !== null) {
                        A = A.shared;
                        var I = A.pending;
                        I === null ? S.next = S : (S.next = I.next, I.next = S), A.pending = S;
                      }
                    }
                    c.lanes |= r, S = c.alternate, S !== null && (S.lanes |= r), bs(c.return, r, t), v.lanes |= r;
                    break;
                  }
                  S = S.next;
                }
              } else if (c.tag === 10) h = c.type === t.type ? null : c.child;
              else if (c.tag === 18) {
                if (h = c.return, h === null) throw Error(l(341));
                h.lanes |= r, v = h.alternate, v !== null && (v.lanes |= r), bs(h, r, t), h = c.sibling;
              } else h = c.child;
              if (h !== null) h.return = c;
              else for (h = c; h !== null; ) {
                if (h === t) {
                  h = null;
                  break;
                }
                if (c = h.sibling, c !== null) {
                  c.return = h.return, h = c;
                  break;
                }
                h = h.return;
              }
              c = h;
            }
            tt(e, t, s.children, r), t = t.child;
          }
          return t;
        case 9:
          return s = t.type, i = t.pendingProps.children, vr(t, r), s = _t(s), i = i(s), t.flags |= 1, tt(e, t, i, r), t.child;
        case 14:
          return i = t.type, s = Tt(i, t.pendingProps), s = Tt(i.type, s), gd(e, t, i, s, r);
        case 15:
          return yd(e, t, t.type, t.pendingProps, r);
        case 17:
          return i = t.type, s = t.pendingProps, s = t.elementType === i ? s : Tt(i, s), Pi(e, t), t.tag = 1, lt(i) ? (e = true, ai(t)) : e = false, vr(t, r), ad(t, i, s), Bs(t, i, s, r), Ws(null, t, i, true, e, r);
        case 19:
          return Cd(e, t, r);
        case 22:
          return vd(e, t, r);
      }
      throw Error(l(156, t.tag));
    };
    function Yd(e, t) {
      return Tu(e, t);
    }
    function pg(e, t, r, i) {
      this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function St(e, t, r, i) {
      return new pg(e, t, r, i);
    }
    function sa(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function hg(e) {
      if (typeof e == "function") return sa(e) ? 1 : 0;
      if (e != null) {
        if (e = e.$$typeof, e === re) return 11;
        if (e === Ce) return 14;
      }
      return 2;
    }
    function Cn(e, t) {
      var r = e.alternate;
      return r === null ? (r = St(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 14680064, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r;
    }
    function Bi(e, t, r, i, s, c) {
      var h = 2;
      if (i = e, typeof e == "function") sa(e) && (h = 1);
      else if (typeof e == "string") h = 5;
      else e: switch (e) {
        case V:
          return qn(r.children, s, c, t);
        case K:
          h = 8, s |= 8;
          break;
        case Y:
          return e = St(12, r, t, s | 2), e.elementType = Y, e.lanes = c, e;
        case ge:
          return e = St(13, r, t, s), e.elementType = ge, e.lanes = c, e;
        case he:
          return e = St(19, r, t, s), e.elementType = he, e.lanes = c, e;
        case ue:
          return Fi(r, s, c, t);
        default:
          if (typeof e == "object" && e !== null) switch (e.$$typeof) {
            case X:
              h = 10;
              break e;
            case le:
              h = 9;
              break e;
            case re:
              h = 11;
              break e;
            case Ce:
              h = 14;
              break e;
            case fe:
              h = 16, i = null;
              break e;
          }
          throw Error(l(130, e == null ? e : typeof e, ""));
      }
      return t = St(h, r, t, s), t.elementType = e, t.type = i, t.lanes = c, t;
    }
    function qn(e, t, r, i) {
      return e = St(7, e, i, t), e.lanes = r, e;
    }
    function Fi(e, t, r, i) {
      return e = St(22, e, i, t), e.elementType = ue, e.lanes = r, e.stateNode = {
        isHidden: false
      }, e;
    }
    function aa(e, t, r) {
      return e = St(6, e, null, t), e.lanes = r, e;
    }
    function ua(e, t, r) {
      return t = St(4, e.children !== null ? e.children : [], e.key, t), t.lanes = r, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    function mg(e, t, r, i, s) {
      this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Dl(0), this.expirationTimes = Dl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Dl(0), this.identifierPrefix = i, this.onRecoverableError = s, this.mutableSourceEagerHydrationData = null;
    }
    function ca(e, t, r, i, s, c, h, v, S) {
      return e = new mg(e, t, r, v, S), t === 1 ? (t = 1, c === true && (t |= 8)) : t = 0, c = St(3, null, null, t), e.current = c, c.stateNode = e, c.memoizedState = {
        element: i,
        isDehydrated: r,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
      }, xs(c), e;
    }
    function gg(e, t, r) {
      var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: B,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: r
      };
    }
    function qd(e) {
      if (!e) return gn;
      e = e._reactInternals;
      e: {
        if (Fn(e) !== e || e.tag !== 1) throw Error(l(170));
        var t = e;
        do {
          switch (t.tag) {
            case 3:
              t = t.stateNode.context;
              break e;
            case 1:
              if (lt(t.type)) {
                t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                break e;
              }
          }
          t = t.return;
        } while (t !== null);
        throw Error(l(171));
      }
      if (e.tag === 1) {
        var r = e.type;
        if (lt(r)) return kc(e, r, t);
      }
      return t;
    }
    function Xd(e, t, r, i, s, c, h, v, S) {
      return e = ca(r, i, true, e, s, c, h, v, S), e.context = qd(null), r = e.current, i = nt(), s = xn(r), c = tn(i, s), c.callback = t ?? null, _n(r, c, s), e.current.lanes = s, Kr(e, s, i), ut(e, i), e;
    }
    function zi(e, t, r, i) {
      var s = t.current, c = nt(), h = xn(s);
      return r = qd(r), t.context === null ? t.context = r : t.pendingContext = r, t = tn(c, h), t.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (t.callback = i), e = _n(s, t, h), e !== null && (Nt(e, s, h, c), gi(e, s, h)), h;
    }
    function Ii(e) {
      if (e = e.current, !e.child) return null;
      switch (e.child.tag) {
        case 5:
          return e.child.stateNode;
        default:
          return e.child.stateNode;
      }
    }
    function Jd(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var r = e.retryLane;
        e.retryLane = r !== 0 && r < t ? r : t;
      }
    }
    function da(e, t) {
      Jd(e, t), (e = e.alternate) && Jd(e, t);
    }
    function yg() {
      return null;
    }
    var Zd = typeof reportError == "function" ? reportError : function(e) {
      console.error(e);
    };
    function fa(e) {
      this._internalRoot = e;
    }
    Wi.prototype.render = fa.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error(l(409));
      zi(e, t, null, null);
    }, Wi.prototype.unmount = fa.prototype.unmount = function() {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Kn(function() {
          zi(null, e, null, null);
        }), t[qt] = null;
      }
    };
    function Wi(e) {
      this._internalRoot = e;
    }
    Wi.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = Du();
        e = {
          blockedOn: null,
          target: e,
          priority: t
        };
        for (var r = 0; r < dn.length && t !== 0 && t < dn[r].priority; r++) ;
        dn.splice(r, 0, e), r === 0 && zu(e);
      }
    };
    function pa(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
    }
    function Hi(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
    }
    function ef() {
    }
    function vg(e, t, r, i, s) {
      if (s) {
        if (typeof i == "function") {
          var c = i;
          i = function() {
            var A = Ii(h);
            c.call(A);
          };
        }
        var h = Xd(t, i, e, 0, null, false, false, "", ef);
        return e._reactRootContainer = h, e[qt] = h.current, so(e.nodeType === 8 ? e.parentNode : e), Kn(), h;
      }
      for (; s = e.lastChild; ) e.removeChild(s);
      if (typeof i == "function") {
        var v = i;
        i = function() {
          var A = Ii(S);
          v.call(A);
        };
      }
      var S = ca(e, 0, false, null, null, false, false, "", ef);
      return e._reactRootContainer = S, e[qt] = S.current, so(e.nodeType === 8 ? e.parentNode : e), Kn(function() {
        zi(t, S, r, i);
      }), S;
    }
    function Ui(e, t, r, i, s) {
      var c = r._reactRootContainer;
      if (c) {
        var h = c;
        if (typeof s == "function") {
          var v = s;
          s = function() {
            var S = Ii(h);
            v.call(S);
          };
        }
        zi(t, h, e, s);
      } else h = vg(r, t, e, s, i);
      return Ii(h);
    }
    Ou = function(e) {
      switch (e.tag) {
        case 3:
          var t = e.stateNode;
          if (t.current.memoizedState.isDehydrated) {
            var r = Gr(t.pendingLanes);
            r !== 0 && (Bl(t, r | 1), ut(t, De()), !(_e & 6) && (xr = De() + 500, yn()));
          }
          break;
        case 13:
          Kn(function() {
            var i = en(e, 1);
            if (i !== null) {
              var s = nt();
              Nt(i, e, 1, s);
            }
          }), da(e, 1);
      }
    }, Fl = function(e) {
      if (e.tag === 13) {
        var t = en(e, 134217728);
        if (t !== null) {
          var r = nt();
          Nt(t, e, 134217728, r);
        }
        da(e, 134217728);
      }
    }, ju = function(e) {
      if (e.tag === 13) {
        var t = xn(e), r = en(e, t);
        if (r !== null) {
          var i = nt();
          Nt(r, e, t, i);
        }
        da(e, t);
      }
    }, Du = function() {
      return ke;
    }, Bu = function(e, t) {
      var r = ke;
      try {
        return ke = e, t();
      } finally {
        ke = r;
      }
    }, Ml = function(e, t, r) {
      switch (t) {
        case "input":
          if (Sl(e, r), t = r.name, r.type === "radio" && t != null) {
            for (r = e; r.parentNode; ) r = r.parentNode;
            for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < r.length; t++) {
              var i = r[t];
              if (i !== e && i.form === e.form) {
                var s = li(i);
                if (!s) throw Error(l(90));
                Do(i), Sl(i, s);
              }
            }
          }
          break;
        case "textarea":
          fu(e, r);
          break;
        case "select":
          t = r.value, t != null && er(e, !!r.multiple, t, false);
      }
    }, bu = oa, Su = Kn;
    var _g = {
      usingClientEntryPoint: false,
      Events: [
        co,
        cr,
        li,
        _u,
        wu,
        oa
      ]
    }, Co = {
      findFiberByHostInstance: zn,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom"
    }, wg = {
      bundleType: Co.bundleType,
      version: Co.version,
      rendererPackageName: Co.rendererPackageName,
      rendererConfig: Co.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: O.ReactCurrentDispatcher,
      findHostInstanceByFiber: function(e) {
        return e = Pu(e), e === null ? null : e.stateNode;
      },
      findFiberByHostInstance: Co.findFiberByHostInstance || yg,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var Vi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!Vi.isDisabled && Vi.supportsFiber) try {
        Wo = Vi.inject(wg), Bt = Vi;
      } catch {
      }
    }
    return ct.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = _g, ct.createPortal = function(e, t) {
      var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!pa(t)) throw Error(l(200));
      return gg(e, t, null, r);
    }, ct.createRoot = function(e, t) {
      if (!pa(e)) throw Error(l(299));
      var r = false, i = "", s = Zd;
      return t != null && (t.unstable_strictMode === true && (r = true), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError)), t = ca(e, 1, false, null, null, r, false, i, s), e[qt] = t.current, so(e.nodeType === 8 ? e.parentNode : e), new fa(t);
    }, ct.findDOMNode = function(e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0) throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
      return e = Pu(t), e = e === null ? null : e.stateNode, e;
    }, ct.flushSync = function(e) {
      return Kn(e);
    }, ct.hydrate = function(e, t, r) {
      if (!Hi(t)) throw Error(l(200));
      return Ui(null, e, t, true, r);
    }, ct.hydrateRoot = function(e, t, r) {
      if (!pa(e)) throw Error(l(405));
      var i = r != null && r.hydratedSources || null, s = false, c = "", h = Zd;
      if (r != null && (r.unstable_strictMode === true && (s = true), r.identifierPrefix !== void 0 && (c = r.identifierPrefix), r.onRecoverableError !== void 0 && (h = r.onRecoverableError)), t = Xd(t, null, e, 1, r ?? null, s, false, c, h), e[qt] = t.current, so(e), i) for (e = 0; e < i.length; e++) r = i[e], s = r._getVersion, s = s(r._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [
        r,
        s
      ] : t.mutableSourceEagerHydrationData.push(r, s);
      return new Wi(t);
    }, ct.render = function(e, t, r) {
      if (!Hi(t)) throw Error(l(200));
      return Ui(null, e, t, false, r);
    }, ct.unmountComponentAtNode = function(e) {
      if (!Hi(e)) throw Error(l(40));
      return e._reactRootContainer ? (Kn(function() {
        Ui(null, null, e, false, function() {
          e._reactRootContainer = null, e[qt] = null;
        });
      }), true) : false;
    }, ct.unstable_batchedUpdates = oa, ct.unstable_renderSubtreeIntoContainer = function(e, t, r, i) {
      if (!Hi(r)) throw Error(l(200));
      if (e == null || e._reactInternals === void 0) throw Error(l(38));
      return Ui(e, t, r, false, i);
    }, ct.version = "18.3.1-next-f1338f8080-20240426", ct;
  }
  var uf;
  function Xf() {
    if (uf) return ga.exports;
    uf = 1;
    function n() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
    }
    return n(), ga.exports = Mg(), ga.exports;
  }
  var cf;
  function Ng() {
    if (cf) return $i;
    cf = 1;
    var n = Xf();
    return $i.createRoot = n.createRoot, $i.hydrateRoot = n.hydrateRoot, $i;
  }
  var Ag = Ng();
  function df(n, o) {
    if (typeof n == "function") return n(o);
    n != null && (n.current = o);
  }
  function Jf(...n) {
    return (o) => {
      let l = false;
      const a = n.map((u) => {
        const d = df(u, o);
        return !l && typeof d == "function" && (l = true), d;
      });
      if (l) return () => {
        for (let u = 0; u < a.length; u++) {
          const d = a[u];
          typeof d == "function" ? d() : df(n[u], null);
        }
      };
    };
  }
  function ot(...n) {
    return m.useCallback(Jf(...n), n);
  }
  var dl = m.forwardRef((n, o) => {
    const { children: l, ...a } = n, u = m.Children.toArray(l), d = u.find(Og);
    if (d) {
      const f = d.props.children, p = u.map((g) => g === d ? m.Children.count(f) > 1 ? m.Children.only(null) : m.isValidElement(f) ? f.props.children : null : g);
      return x.jsx(Ma, {
        ...a,
        ref: o,
        children: m.isValidElement(f) ? m.cloneElement(f, void 0, p) : null
      });
    }
    return x.jsx(Ma, {
      ...a,
      ref: o,
      children: l
    });
  });
  dl.displayName = "Slot";
  var Ma = m.forwardRef((n, o) => {
    const { children: l, ...a } = n;
    if (m.isValidElement(l)) {
      const u = Dg(l), d = jg(a, l.props);
      return l.type !== m.Fragment && (d.ref = o ? Jf(o, u) : u), m.cloneElement(l, d);
    }
    return m.Children.count(l) > 1 ? m.Children.only(null) : null;
  });
  Ma.displayName = "SlotClone";
  var Lg = ({ children: n }) => x.jsx(x.Fragment, {
    children: n
  });
  function Og(n) {
    return m.isValidElement(n) && n.type === Lg;
  }
  function jg(n, o) {
    const l = {
      ...o
    };
    for (const a in o) {
      const u = n[a], d = o[a];
      /^on[A-Z]/.test(a) ? u && d ? l[a] = (...p) => {
        d(...p), u(...p);
      } : u && (l[a] = u) : a === "style" ? l[a] = {
        ...u,
        ...d
      } : a === "className" && (l[a] = [
        u,
        d
      ].filter(Boolean).join(" "));
    }
    return {
      ...n,
      ...l
    };
  }
  function Dg(n) {
    var _a2, _b2;
    let o = (_a2 = Object.getOwnPropertyDescriptor(n.props, "ref")) == null ? void 0 : _a2.get, l = o && "isReactWarning" in o && o.isReactWarning;
    return l ? n.ref : (o = (_b2 = Object.getOwnPropertyDescriptor(n, "ref")) == null ? void 0 : _b2.get, l = o && "isReactWarning" in o && o.isReactWarning, l ? n.props.ref : n.props.ref || n.ref);
  }
  function Zf(n) {
    var o, l, a = "";
    if (typeof n == "string" || typeof n == "number") a += n;
    else if (typeof n == "object") if (Array.isArray(n)) {
      var u = n.length;
      for (o = 0; o < u; o++) n[o] && (l = Zf(n[o])) && (a && (a += " "), a += l);
    } else for (l in n) n[l] && (a && (a += " "), a += l);
    return a;
  }
  function ep() {
    for (var n, o, l = 0, a = "", u = arguments.length; l < u; l++) (n = arguments[l]) && (o = Zf(n)) && (a && (a += " "), a += o);
    return a;
  }
  const ff = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n, pf = ep, Bg = (n, o) => (l) => {
    var a;
    if ((o == null ? void 0 : o.variants) == null) return pf(n, l == null ? void 0 : l.class, l == null ? void 0 : l.className);
    const { variants: u, defaultVariants: d } = o, f = Object.keys(u).map((y) => {
      const _ = l == null ? void 0 : l[y], b = d == null ? void 0 : d[y];
      if (_ === null) return null;
      const w = ff(_) || ff(b);
      return u[y][w];
    }), p = l && Object.entries(l).reduce((y, _) => {
      let [b, w] = _;
      return w === void 0 || (y[b] = w), y;
    }, {}), g = o == null || (a = o.compoundVariants) === null || a === void 0 ? void 0 : a.reduce((y, _) => {
      let { class: b, className: w, ...P } = _;
      return Object.entries(P).every((M) => {
        let [k, R] = M;
        return Array.isArray(R) ? R.includes({
          ...d,
          ...p
        }[k]) : {
          ...d,
          ...p
        }[k] === R;
      }) ? [
        ...y,
        b,
        w
      ] : y;
    }, []);
    return pf(n, f, g, l == null ? void 0 : l.class, l == null ? void 0 : l.className);
  }, Ia = "-", Fg = (n) => {
    const o = Ig(n), { conflictingClassGroups: l, conflictingClassGroupModifiers: a } = n;
    return {
      getClassGroupId: (f) => {
        const p = f.split(Ia);
        return p[0] === "" && p.length !== 1 && p.shift(), tp(p, o) || zg(f);
      },
      getConflictingClassGroupIds: (f, p) => {
        const g = l[f] || [];
        return p && a[f] ? [
          ...g,
          ...a[f]
        ] : g;
      }
    };
  }, tp = (n, o) => {
    var _a2;
    if (n.length === 0) return o.classGroupId;
    const l = n[0], a = o.nextPart.get(l), u = a ? tp(n.slice(1), a) : void 0;
    if (u) return u;
    if (o.validators.length === 0) return;
    const d = n.join(Ia);
    return (_a2 = o.validators.find(({ validator: f }) => f(d))) == null ? void 0 : _a2.classGroupId;
  }, hf = /^\[(.+)\]$/, zg = (n) => {
    if (hf.test(n)) {
      const o = hf.exec(n)[1], l = o == null ? void 0 : o.substring(0, o.indexOf(":"));
      if (l) return "arbitrary.." + l;
    }
  }, Ig = (n) => {
    const { theme: o, prefix: l } = n, a = {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    };
    return Hg(Object.entries(n.classGroups), l).forEach(([d, f]) => {
      Na(f, a, d, o);
    }), a;
  }, Na = (n, o, l, a) => {
    n.forEach((u) => {
      if (typeof u == "string") {
        const d = u === "" ? o : mf(o, u);
        d.classGroupId = l;
        return;
      }
      if (typeof u == "function") {
        if (Wg(u)) {
          Na(u(a), o, l, a);
          return;
        }
        o.validators.push({
          validator: u,
          classGroupId: l
        });
        return;
      }
      Object.entries(u).forEach(([d, f]) => {
        Na(f, mf(o, d), l, a);
      });
    });
  }, mf = (n, o) => {
    let l = n;
    return o.split(Ia).forEach((a) => {
      l.nextPart.has(a) || l.nextPart.set(a, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      }), l = l.nextPart.get(a);
    }), l;
  }, Wg = (n) => n.isThemeGetter, Hg = (n, o) => o ? n.map(([l, a]) => {
    const u = a.map((d) => typeof d == "string" ? o + d : typeof d == "object" ? Object.fromEntries(Object.entries(d).map(([f, p]) => [
      o + f,
      p
    ])) : d);
    return [
      l,
      u
    ];
  }) : n, Ug = (n) => {
    if (n < 1) return {
      get: () => {
      },
      set: () => {
      }
    };
    let o = 0, l = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
    const u = (d, f) => {
      l.set(d, f), o++, o > n && (o = 0, a = l, l = /* @__PURE__ */ new Map());
    };
    return {
      get(d) {
        let f = l.get(d);
        if (f !== void 0) return f;
        if ((f = a.get(d)) !== void 0) return u(d, f), f;
      },
      set(d, f) {
        l.has(d) ? l.set(d, f) : u(d, f);
      }
    };
  }, np = "!", Vg = (n) => {
    const { separator: o, experimentalParseClassName: l } = n, a = o.length === 1, u = o[0], d = o.length, f = (p) => {
      const g = [];
      let y = 0, _ = 0, b;
      for (let R = 0; R < p.length; R++) {
        let L = p[R];
        if (y === 0) {
          if (L === u && (a || p.slice(R, R + d) === o)) {
            g.push(p.slice(_, R)), _ = R + d;
            continue;
          }
          if (L === "/") {
            b = R;
            continue;
          }
        }
        L === "[" ? y++ : L === "]" && y--;
      }
      const w = g.length === 0 ? p : p.substring(_), P = w.startsWith(np), M = P ? w.substring(1) : w, k = b && b > _ ? b - _ : void 0;
      return {
        modifiers: g,
        hasImportantModifier: P,
        baseClassName: M,
        maybePostfixModifierPosition: k
      };
    };
    return l ? (p) => l({
      className: p,
      parseClassName: f
    }) : f;
  }, $g = (n) => {
    if (n.length <= 1) return n;
    const o = [];
    let l = [];
    return n.forEach((a) => {
      a[0] === "[" ? (o.push(...l.sort(), a), l = []) : l.push(a);
    }), o.push(...l.sort()), o;
  }, Gg = (n) => ({
    cache: Ug(n.cacheSize),
    parseClassName: Vg(n),
    ...Fg(n)
  }), Kg = /\s+/, Qg = (n, o) => {
    const { parseClassName: l, getClassGroupId: a, getConflictingClassGroupIds: u } = o, d = [], f = n.trim().split(Kg);
    let p = "";
    for (let g = f.length - 1; g >= 0; g -= 1) {
      const y = f[g], { modifiers: _, hasImportantModifier: b, baseClassName: w, maybePostfixModifierPosition: P } = l(y);
      let M = !!P, k = a(M ? w.substring(0, P) : w);
      if (!k) {
        if (!M) {
          p = y + (p.length > 0 ? " " + p : p);
          continue;
        }
        if (k = a(w), !k) {
          p = y + (p.length > 0 ? " " + p : p);
          continue;
        }
        M = false;
      }
      const R = $g(_).join(":"), L = b ? R + np : R, W = L + k;
      if (d.includes(W)) continue;
      d.push(W);
      const H = u(k, M);
      for (let O = 0; O < H.length; ++O) {
        const j = H[O];
        d.push(L + j);
      }
      p = y + (p.length > 0 ? " " + p : p);
    }
    return p;
  };
  function Yg() {
    let n = 0, o, l, a = "";
    for (; n < arguments.length; ) (o = arguments[n++]) && (l = rp(o)) && (a && (a += " "), a += l);
    return a;
  }
  const rp = (n) => {
    if (typeof n == "string") return n;
    let o, l = "";
    for (let a = 0; a < n.length; a++) n[a] && (o = rp(n[a])) && (l && (l += " "), l += o);
    return l;
  };
  function qg(n, ...o) {
    let l, a, u, d = f;
    function f(g) {
      const y = o.reduce((_, b) => b(_), n());
      return l = Gg(y), a = l.cache.get, u = l.cache.set, d = p, p(g);
    }
    function p(g) {
      const y = a(g);
      if (y) return y;
      const _ = Qg(g, l);
      return u(g, _), _;
    }
    return function() {
      return d(Yg.apply(null, arguments));
    };
  }
  const Ne = (n) => {
    const o = (l) => l[n] || [];
    return o.isThemeGetter = true, o;
  }, op = /^\[(?:([a-z-]+):)?(.+)\]$/i, Xg = /^\d+\/\d+$/, Jg = /* @__PURE__ */ new Set([
    "px",
    "full",
    "screen"
  ]), Zg = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ey = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ty = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, ny = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ry = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, on = (n) => Rr(n) || Jg.has(n) || Xg.test(n), En = (n) => jr(n, "length", dy), Rr = (n) => !!n && !Number.isNaN(Number(n)), _a = (n) => jr(n, "number", Rr), Eo = (n) => !!n && Number.isInteger(Number(n)), oy = (n) => n.endsWith("%") && Rr(n.slice(0, -1)), de = (n) => op.test(n), Tn = (n) => Zg.test(n), iy = /* @__PURE__ */ new Set([
    "length",
    "size",
    "percentage"
  ]), ly = (n) => jr(n, iy, ip), sy = (n) => jr(n, "position", ip), ay = /* @__PURE__ */ new Set([
    "image",
    "url"
  ]), uy = (n) => jr(n, ay, py), cy = (n) => jr(n, "", fy), To = () => true, jr = (n, o, l) => {
    const a = op.exec(n);
    return a ? a[1] ? typeof o == "string" ? a[1] === o : o.has(a[1]) : l(a[2]) : false;
  }, dy = (n) => ey.test(n) && !ty.test(n), ip = () => false, fy = (n) => ny.test(n), py = (n) => ry.test(n), hy = () => {
    const n = Ne("colors"), o = Ne("spacing"), l = Ne("blur"), a = Ne("brightness"), u = Ne("borderColor"), d = Ne("borderRadius"), f = Ne("borderSpacing"), p = Ne("borderWidth"), g = Ne("contrast"), y = Ne("grayscale"), _ = Ne("hueRotate"), b = Ne("invert"), w = Ne("gap"), P = Ne("gradientColorStops"), M = Ne("gradientColorStopPositions"), k = Ne("inset"), R = Ne("margin"), L = Ne("opacity"), W = Ne("padding"), H = Ne("saturate"), O = Ne("scale"), j = Ne("sepia"), B = Ne("skew"), V = Ne("space"), K = Ne("translate"), Y = () => [
      "auto",
      "contain",
      "none"
    ], X = () => [
      "auto",
      "hidden",
      "clip",
      "visible",
      "scroll"
    ], le = () => [
      "auto",
      de,
      o
    ], re = () => [
      de,
      o
    ], ge = () => [
      "",
      on,
      En
    ], he = () => [
      "auto",
      Rr,
      de
    ], Ce = () => [
      "bottom",
      "center",
      "left",
      "left-bottom",
      "left-top",
      "right",
      "right-bottom",
      "right-top",
      "top"
    ], fe = () => [
      "solid",
      "dashed",
      "dotted",
      "double",
      "none"
    ], ue = () => [
      "normal",
      "multiply",
      "screen",
      "overlay",
      "darken",
      "lighten",
      "color-dodge",
      "color-burn",
      "hard-light",
      "soft-light",
      "difference",
      "exclusion",
      "hue",
      "saturation",
      "color",
      "luminosity"
    ], D = () => [
      "start",
      "end",
      "center",
      "between",
      "around",
      "evenly",
      "stretch"
    ], q = () => [
      "",
      "0",
      de
    ], Q = () => [
      "auto",
      "avoid",
      "all",
      "avoid-page",
      "page",
      "left",
      "right",
      "column"
    ], E = () => [
      Rr,
      de
    ];
    return {
      cacheSize: 500,
      separator: ":",
      theme: {
        colors: [
          To
        ],
        spacing: [
          on,
          En
        ],
        blur: [
          "none",
          "",
          Tn,
          de
        ],
        brightness: E(),
        borderColor: [
          n
        ],
        borderRadius: [
          "none",
          "",
          "full",
          Tn,
          de
        ],
        borderSpacing: re(),
        borderWidth: ge(),
        contrast: E(),
        grayscale: q(),
        hueRotate: E(),
        invert: q(),
        gap: re(),
        gradientColorStops: [
          n
        ],
        gradientColorStopPositions: [
          oy,
          En
        ],
        inset: le(),
        margin: le(),
        opacity: E(),
        padding: re(),
        saturate: E(),
        scale: E(),
        sepia: q(),
        skew: E(),
        space: re(),
        translate: re()
      },
      classGroups: {
        aspect: [
          {
            aspect: [
              "auto",
              "square",
              "video",
              de
            ]
          }
        ],
        container: [
          "container"
        ],
        columns: [
          {
            columns: [
              Tn
            ]
          }
        ],
        "break-after": [
          {
            "break-after": Q()
          }
        ],
        "break-before": [
          {
            "break-before": Q()
          }
        ],
        "break-inside": [
          {
            "break-inside": [
              "auto",
              "avoid",
              "avoid-page",
              "avoid-column"
            ]
          }
        ],
        "box-decoration": [
          {
            "box-decoration": [
              "slice",
              "clone"
            ]
          }
        ],
        box: [
          {
            box: [
              "border",
              "content"
            ]
          }
        ],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden"
        ],
        float: [
          {
            float: [
              "right",
              "left",
              "none",
              "start",
              "end"
            ]
          }
        ],
        clear: [
          {
            clear: [
              "left",
              "right",
              "both",
              "none",
              "start",
              "end"
            ]
          }
        ],
        isolation: [
          "isolate",
          "isolation-auto"
        ],
        "object-fit": [
          {
            object: [
              "contain",
              "cover",
              "fill",
              "none",
              "scale-down"
            ]
          }
        ],
        "object-position": [
          {
            object: [
              ...Ce(),
              de
            ]
          }
        ],
        overflow: [
          {
            overflow: X()
          }
        ],
        "overflow-x": [
          {
            "overflow-x": X()
          }
        ],
        "overflow-y": [
          {
            "overflow-y": X()
          }
        ],
        overscroll: [
          {
            overscroll: Y()
          }
        ],
        "overscroll-x": [
          {
            "overscroll-x": Y()
          }
        ],
        "overscroll-y": [
          {
            "overscroll-y": Y()
          }
        ],
        position: [
          "static",
          "fixed",
          "absolute",
          "relative",
          "sticky"
        ],
        inset: [
          {
            inset: [
              k
            ]
          }
        ],
        "inset-x": [
          {
            "inset-x": [
              k
            ]
          }
        ],
        "inset-y": [
          {
            "inset-y": [
              k
            ]
          }
        ],
        start: [
          {
            start: [
              k
            ]
          }
        ],
        end: [
          {
            end: [
              k
            ]
          }
        ],
        top: [
          {
            top: [
              k
            ]
          }
        ],
        right: [
          {
            right: [
              k
            ]
          }
        ],
        bottom: [
          {
            bottom: [
              k
            ]
          }
        ],
        left: [
          {
            left: [
              k
            ]
          }
        ],
        visibility: [
          "visible",
          "invisible",
          "collapse"
        ],
        z: [
          {
            z: [
              "auto",
              Eo,
              de
            ]
          }
        ],
        basis: [
          {
            basis: le()
          }
        ],
        "flex-direction": [
          {
            flex: [
              "row",
              "row-reverse",
              "col",
              "col-reverse"
            ]
          }
        ],
        "flex-wrap": [
          {
            flex: [
              "wrap",
              "wrap-reverse",
              "nowrap"
            ]
          }
        ],
        flex: [
          {
            flex: [
              "1",
              "auto",
              "initial",
              "none",
              de
            ]
          }
        ],
        grow: [
          {
            grow: q()
          }
        ],
        shrink: [
          {
            shrink: q()
          }
        ],
        order: [
          {
            order: [
              "first",
              "last",
              "none",
              Eo,
              de
            ]
          }
        ],
        "grid-cols": [
          {
            "grid-cols": [
              To
            ]
          }
        ],
        "col-start-end": [
          {
            col: [
              "auto",
              {
                span: [
                  "full",
                  Eo,
                  de
                ]
              },
              de
            ]
          }
        ],
        "col-start": [
          {
            "col-start": he()
          }
        ],
        "col-end": [
          {
            "col-end": he()
          }
        ],
        "grid-rows": [
          {
            "grid-rows": [
              To
            ]
          }
        ],
        "row-start-end": [
          {
            row: [
              "auto",
              {
                span: [
                  Eo,
                  de
                ]
              },
              de
            ]
          }
        ],
        "row-start": [
          {
            "row-start": he()
          }
        ],
        "row-end": [
          {
            "row-end": he()
          }
        ],
        "grid-flow": [
          {
            "grid-flow": [
              "row",
              "col",
              "dense",
              "row-dense",
              "col-dense"
            ]
          }
        ],
        "auto-cols": [
          {
            "auto-cols": [
              "auto",
              "min",
              "max",
              "fr",
              de
            ]
          }
        ],
        "auto-rows": [
          {
            "auto-rows": [
              "auto",
              "min",
              "max",
              "fr",
              de
            ]
          }
        ],
        gap: [
          {
            gap: [
              w
            ]
          }
        ],
        "gap-x": [
          {
            "gap-x": [
              w
            ]
          }
        ],
        "gap-y": [
          {
            "gap-y": [
              w
            ]
          }
        ],
        "justify-content": [
          {
            justify: [
              "normal",
              ...D()
            ]
          }
        ],
        "justify-items": [
          {
            "justify-items": [
              "start",
              "end",
              "center",
              "stretch"
            ]
          }
        ],
        "justify-self": [
          {
            "justify-self": [
              "auto",
              "start",
              "end",
              "center",
              "stretch"
            ]
          }
        ],
        "align-content": [
          {
            content: [
              "normal",
              ...D(),
              "baseline"
            ]
          }
        ],
        "align-items": [
          {
            items: [
              "start",
              "end",
              "center",
              "baseline",
              "stretch"
            ]
          }
        ],
        "align-self": [
          {
            self: [
              "auto",
              "start",
              "end",
              "center",
              "stretch",
              "baseline"
            ]
          }
        ],
        "place-content": [
          {
            "place-content": [
              ...D(),
              "baseline"
            ]
          }
        ],
        "place-items": [
          {
            "place-items": [
              "start",
              "end",
              "center",
              "baseline",
              "stretch"
            ]
          }
        ],
        "place-self": [
          {
            "place-self": [
              "auto",
              "start",
              "end",
              "center",
              "stretch"
            ]
          }
        ],
        p: [
          {
            p: [
              W
            ]
          }
        ],
        px: [
          {
            px: [
              W
            ]
          }
        ],
        py: [
          {
            py: [
              W
            ]
          }
        ],
        ps: [
          {
            ps: [
              W
            ]
          }
        ],
        pe: [
          {
            pe: [
              W
            ]
          }
        ],
        pt: [
          {
            pt: [
              W
            ]
          }
        ],
        pr: [
          {
            pr: [
              W
            ]
          }
        ],
        pb: [
          {
            pb: [
              W
            ]
          }
        ],
        pl: [
          {
            pl: [
              W
            ]
          }
        ],
        m: [
          {
            m: [
              R
            ]
          }
        ],
        mx: [
          {
            mx: [
              R
            ]
          }
        ],
        my: [
          {
            my: [
              R
            ]
          }
        ],
        ms: [
          {
            ms: [
              R
            ]
          }
        ],
        me: [
          {
            me: [
              R
            ]
          }
        ],
        mt: [
          {
            mt: [
              R
            ]
          }
        ],
        mr: [
          {
            mr: [
              R
            ]
          }
        ],
        mb: [
          {
            mb: [
              R
            ]
          }
        ],
        ml: [
          {
            ml: [
              R
            ]
          }
        ],
        "space-x": [
          {
            "space-x": [
              V
            ]
          }
        ],
        "space-x-reverse": [
          "space-x-reverse"
        ],
        "space-y": [
          {
            "space-y": [
              V
            ]
          }
        ],
        "space-y-reverse": [
          "space-y-reverse"
        ],
        w: [
          {
            w: [
              "auto",
              "min",
              "max",
              "fit",
              "svw",
              "lvw",
              "dvw",
              de,
              o
            ]
          }
        ],
        "min-w": [
          {
            "min-w": [
              de,
              o,
              "min",
              "max",
              "fit"
            ]
          }
        ],
        "max-w": [
          {
            "max-w": [
              de,
              o,
              "none",
              "full",
              "min",
              "max",
              "fit",
              "prose",
              {
                screen: [
                  Tn
                ]
              },
              Tn
            ]
          }
        ],
        h: [
          {
            h: [
              de,
              o,
              "auto",
              "min",
              "max",
              "fit",
              "svh",
              "lvh",
              "dvh"
            ]
          }
        ],
        "min-h": [
          {
            "min-h": [
              de,
              o,
              "min",
              "max",
              "fit",
              "svh",
              "lvh",
              "dvh"
            ]
          }
        ],
        "max-h": [
          {
            "max-h": [
              de,
              o,
              "min",
              "max",
              "fit",
              "svh",
              "lvh",
              "dvh"
            ]
          }
        ],
        size: [
          {
            size: [
              de,
              o,
              "auto",
              "min",
              "max",
              "fit"
            ]
          }
        ],
        "font-size": [
          {
            text: [
              "base",
              Tn,
              En
            ]
          }
        ],
        "font-smoothing": [
          "antialiased",
          "subpixel-antialiased"
        ],
        "font-style": [
          "italic",
          "not-italic"
        ],
        "font-weight": [
          {
            font: [
              "thin",
              "extralight",
              "light",
              "normal",
              "medium",
              "semibold",
              "bold",
              "extrabold",
              "black",
              _a
            ]
          }
        ],
        "font-family": [
          {
            font: [
              To
            ]
          }
        ],
        "fvn-normal": [
          "normal-nums"
        ],
        "fvn-ordinal": [
          "ordinal"
        ],
        "fvn-slashed-zero": [
          "slashed-zero"
        ],
        "fvn-figure": [
          "lining-nums",
          "oldstyle-nums"
        ],
        "fvn-spacing": [
          "proportional-nums",
          "tabular-nums"
        ],
        "fvn-fraction": [
          "diagonal-fractions",
          "stacked-fractions"
        ],
        tracking: [
          {
            tracking: [
              "tighter",
              "tight",
              "normal",
              "wide",
              "wider",
              "widest",
              de
            ]
          }
        ],
        "line-clamp": [
          {
            "line-clamp": [
              "none",
              Rr,
              _a
            ]
          }
        ],
        leading: [
          {
            leading: [
              "none",
              "tight",
              "snug",
              "normal",
              "relaxed",
              "loose",
              on,
              de
            ]
          }
        ],
        "list-image": [
          {
            "list-image": [
              "none",
              de
            ]
          }
        ],
        "list-style-type": [
          {
            list: [
              "none",
              "disc",
              "decimal",
              de
            ]
          }
        ],
        "list-style-position": [
          {
            list: [
              "inside",
              "outside"
            ]
          }
        ],
        "placeholder-color": [
          {
            placeholder: [
              n
            ]
          }
        ],
        "placeholder-opacity": [
          {
            "placeholder-opacity": [
              L
            ]
          }
        ],
        "text-alignment": [
          {
            text: [
              "left",
              "center",
              "right",
              "justify",
              "start",
              "end"
            ]
          }
        ],
        "text-color": [
          {
            text: [
              n
            ]
          }
        ],
        "text-opacity": [
          {
            "text-opacity": [
              L
            ]
          }
        ],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline"
        ],
        "text-decoration-style": [
          {
            decoration: [
              ...fe(),
              "wavy"
            ]
          }
        ],
        "text-decoration-thickness": [
          {
            decoration: [
              "auto",
              "from-font",
              on,
              En
            ]
          }
        ],
        "underline-offset": [
          {
            "underline-offset": [
              "auto",
              on,
              de
            ]
          }
        ],
        "text-decoration-color": [
          {
            decoration: [
              n
            ]
          }
        ],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case"
        ],
        "text-overflow": [
          "truncate",
          "text-ellipsis",
          "text-clip"
        ],
        "text-wrap": [
          {
            text: [
              "wrap",
              "nowrap",
              "balance",
              "pretty"
            ]
          }
        ],
        indent: [
          {
            indent: re()
          }
        ],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              de
            ]
          }
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces"
            ]
          }
        ],
        break: [
          {
            break: [
              "normal",
              "words",
              "all",
              "keep"
            ]
          }
        ],
        hyphens: [
          {
            hyphens: [
              "none",
              "manual",
              "auto"
            ]
          }
        ],
        content: [
          {
            content: [
              "none",
              de
            ]
          }
        ],
        "bg-attachment": [
          {
            bg: [
              "fixed",
              "local",
              "scroll"
            ]
          }
        ],
        "bg-clip": [
          {
            "bg-clip": [
              "border",
              "padding",
              "content",
              "text"
            ]
          }
        ],
        "bg-opacity": [
          {
            "bg-opacity": [
              L
            ]
          }
        ],
        "bg-origin": [
          {
            "bg-origin": [
              "border",
              "padding",
              "content"
            ]
          }
        ],
        "bg-position": [
          {
            bg: [
              ...Ce(),
              sy
            ]
          }
        ],
        "bg-repeat": [
          {
            bg: [
              "no-repeat",
              {
                repeat: [
                  "",
                  "x",
                  "y",
                  "round",
                  "space"
                ]
              }
            ]
          }
        ],
        "bg-size": [
          {
            bg: [
              "auto",
              "cover",
              "contain",
              ly
            ]
          }
        ],
        "bg-image": [
          {
            bg: [
              "none",
              {
                "gradient-to": [
                  "t",
                  "tr",
                  "r",
                  "br",
                  "b",
                  "bl",
                  "l",
                  "tl"
                ]
              },
              uy
            ]
          }
        ],
        "bg-color": [
          {
            bg: [
              n
            ]
          }
        ],
        "gradient-from-pos": [
          {
            from: [
              M
            ]
          }
        ],
        "gradient-via-pos": [
          {
            via: [
              M
            ]
          }
        ],
        "gradient-to-pos": [
          {
            to: [
              M
            ]
          }
        ],
        "gradient-from": [
          {
            from: [
              P
            ]
          }
        ],
        "gradient-via": [
          {
            via: [
              P
            ]
          }
        ],
        "gradient-to": [
          {
            to: [
              P
            ]
          }
        ],
        rounded: [
          {
            rounded: [
              d
            ]
          }
        ],
        "rounded-s": [
          {
            "rounded-s": [
              d
            ]
          }
        ],
        "rounded-e": [
          {
            "rounded-e": [
              d
            ]
          }
        ],
        "rounded-t": [
          {
            "rounded-t": [
              d
            ]
          }
        ],
        "rounded-r": [
          {
            "rounded-r": [
              d
            ]
          }
        ],
        "rounded-b": [
          {
            "rounded-b": [
              d
            ]
          }
        ],
        "rounded-l": [
          {
            "rounded-l": [
              d
            ]
          }
        ],
        "rounded-ss": [
          {
            "rounded-ss": [
              d
            ]
          }
        ],
        "rounded-se": [
          {
            "rounded-se": [
              d
            ]
          }
        ],
        "rounded-ee": [
          {
            "rounded-ee": [
              d
            ]
          }
        ],
        "rounded-es": [
          {
            "rounded-es": [
              d
            ]
          }
        ],
        "rounded-tl": [
          {
            "rounded-tl": [
              d
            ]
          }
        ],
        "rounded-tr": [
          {
            "rounded-tr": [
              d
            ]
          }
        ],
        "rounded-br": [
          {
            "rounded-br": [
              d
            ]
          }
        ],
        "rounded-bl": [
          {
            "rounded-bl": [
              d
            ]
          }
        ],
        "border-w": [
          {
            border: [
              p
            ]
          }
        ],
        "border-w-x": [
          {
            "border-x": [
              p
            ]
          }
        ],
        "border-w-y": [
          {
            "border-y": [
              p
            ]
          }
        ],
        "border-w-s": [
          {
            "border-s": [
              p
            ]
          }
        ],
        "border-w-e": [
          {
            "border-e": [
              p
            ]
          }
        ],
        "border-w-t": [
          {
            "border-t": [
              p
            ]
          }
        ],
        "border-w-r": [
          {
            "border-r": [
              p
            ]
          }
        ],
        "border-w-b": [
          {
            "border-b": [
              p
            ]
          }
        ],
        "border-w-l": [
          {
            "border-l": [
              p
            ]
          }
        ],
        "border-opacity": [
          {
            "border-opacity": [
              L
            ]
          }
        ],
        "border-style": [
          {
            border: [
              ...fe(),
              "hidden"
            ]
          }
        ],
        "divide-x": [
          {
            "divide-x": [
              p
            ]
          }
        ],
        "divide-x-reverse": [
          "divide-x-reverse"
        ],
        "divide-y": [
          {
            "divide-y": [
              p
            ]
          }
        ],
        "divide-y-reverse": [
          "divide-y-reverse"
        ],
        "divide-opacity": [
          {
            "divide-opacity": [
              L
            ]
          }
        ],
        "divide-style": [
          {
            divide: fe()
          }
        ],
        "border-color": [
          {
            border: [
              u
            ]
          }
        ],
        "border-color-x": [
          {
            "border-x": [
              u
            ]
          }
        ],
        "border-color-y": [
          {
            "border-y": [
              u
            ]
          }
        ],
        "border-color-s": [
          {
            "border-s": [
              u
            ]
          }
        ],
        "border-color-e": [
          {
            "border-e": [
              u
            ]
          }
        ],
        "border-color-t": [
          {
            "border-t": [
              u
            ]
          }
        ],
        "border-color-r": [
          {
            "border-r": [
              u
            ]
          }
        ],
        "border-color-b": [
          {
            "border-b": [
              u
            ]
          }
        ],
        "border-color-l": [
          {
            "border-l": [
              u
            ]
          }
        ],
        "divide-color": [
          {
            divide: [
              u
            ]
          }
        ],
        "outline-style": [
          {
            outline: [
              "",
              ...fe()
            ]
          }
        ],
        "outline-offset": [
          {
            "outline-offset": [
              on,
              de
            ]
          }
        ],
        "outline-w": [
          {
            outline: [
              on,
              En
            ]
          }
        ],
        "outline-color": [
          {
            outline: [
              n
            ]
          }
        ],
        "ring-w": [
          {
            ring: ge()
          }
        ],
        "ring-w-inset": [
          "ring-inset"
        ],
        "ring-color": [
          {
            ring: [
              n
            ]
          }
        ],
        "ring-opacity": [
          {
            "ring-opacity": [
              L
            ]
          }
        ],
        "ring-offset-w": [
          {
            "ring-offset": [
              on,
              En
            ]
          }
        ],
        "ring-offset-color": [
          {
            "ring-offset": [
              n
            ]
          }
        ],
        shadow: [
          {
            shadow: [
              "",
              "inner",
              "none",
              Tn,
              cy
            ]
          }
        ],
        "shadow-color": [
          {
            shadow: [
              To
            ]
          }
        ],
        opacity: [
          {
            opacity: [
              L
            ]
          }
        ],
        "mix-blend": [
          {
            "mix-blend": [
              ...ue(),
              "plus-lighter",
              "plus-darker"
            ]
          }
        ],
        "bg-blend": [
          {
            "bg-blend": ue()
          }
        ],
        filter: [
          {
            filter: [
              "",
              "none"
            ]
          }
        ],
        blur: [
          {
            blur: [
              l
            ]
          }
        ],
        brightness: [
          {
            brightness: [
              a
            ]
          }
        ],
        contrast: [
          {
            contrast: [
              g
            ]
          }
        ],
        "drop-shadow": [
          {
            "drop-shadow": [
              "",
              "none",
              Tn,
              de
            ]
          }
        ],
        grayscale: [
          {
            grayscale: [
              y
            ]
          }
        ],
        "hue-rotate": [
          {
            "hue-rotate": [
              _
            ]
          }
        ],
        invert: [
          {
            invert: [
              b
            ]
          }
        ],
        saturate: [
          {
            saturate: [
              H
            ]
          }
        ],
        sepia: [
          {
            sepia: [
              j
            ]
          }
        ],
        "backdrop-filter": [
          {
            "backdrop-filter": [
              "",
              "none"
            ]
          }
        ],
        "backdrop-blur": [
          {
            "backdrop-blur": [
              l
            ]
          }
        ],
        "backdrop-brightness": [
          {
            "backdrop-brightness": [
              a
            ]
          }
        ],
        "backdrop-contrast": [
          {
            "backdrop-contrast": [
              g
            ]
          }
        ],
        "backdrop-grayscale": [
          {
            "backdrop-grayscale": [
              y
            ]
          }
        ],
        "backdrop-hue-rotate": [
          {
            "backdrop-hue-rotate": [
              _
            ]
          }
        ],
        "backdrop-invert": [
          {
            "backdrop-invert": [
              b
            ]
          }
        ],
        "backdrop-opacity": [
          {
            "backdrop-opacity": [
              L
            ]
          }
        ],
        "backdrop-saturate": [
          {
            "backdrop-saturate": [
              H
            ]
          }
        ],
        "backdrop-sepia": [
          {
            "backdrop-sepia": [
              j
            ]
          }
        ],
        "border-collapse": [
          {
            border: [
              "collapse",
              "separate"
            ]
          }
        ],
        "border-spacing": [
          {
            "border-spacing": [
              f
            ]
          }
        ],
        "border-spacing-x": [
          {
            "border-spacing-x": [
              f
            ]
          }
        ],
        "border-spacing-y": [
          {
            "border-spacing-y": [
              f
            ]
          }
        ],
        "table-layout": [
          {
            table: [
              "auto",
              "fixed"
            ]
          }
        ],
        caption: [
          {
            caption: [
              "top",
              "bottom"
            ]
          }
        ],
        transition: [
          {
            transition: [
              "none",
              "all",
              "",
              "colors",
              "opacity",
              "shadow",
              "transform",
              de
            ]
          }
        ],
        duration: [
          {
            duration: E()
          }
        ],
        ease: [
          {
            ease: [
              "linear",
              "in",
              "out",
              "in-out",
              de
            ]
          }
        ],
        delay: [
          {
            delay: E()
          }
        ],
        animate: [
          {
            animate: [
              "none",
              "spin",
              "ping",
              "pulse",
              "bounce",
              de
            ]
          }
        ],
        transform: [
          {
            transform: [
              "",
              "gpu",
              "none"
            ]
          }
        ],
        scale: [
          {
            scale: [
              O
            ]
          }
        ],
        "scale-x": [
          {
            "scale-x": [
              O
            ]
          }
        ],
        "scale-y": [
          {
            "scale-y": [
              O
            ]
          }
        ],
        rotate: [
          {
            rotate: [
              Eo,
              de
            ]
          }
        ],
        "translate-x": [
          {
            "translate-x": [
              K
            ]
          }
        ],
        "translate-y": [
          {
            "translate-y": [
              K
            ]
          }
        ],
        "skew-x": [
          {
            "skew-x": [
              B
            ]
          }
        ],
        "skew-y": [
          {
            "skew-y": [
              B
            ]
          }
        ],
        "transform-origin": [
          {
            origin: [
              "center",
              "top",
              "top-right",
              "right",
              "bottom-right",
              "bottom",
              "bottom-left",
              "left",
              "top-left",
              de
            ]
          }
        ],
        accent: [
          {
            accent: [
              "auto",
              n
            ]
          }
        ],
        appearance: [
          {
            appearance: [
              "none",
              "auto"
            ]
          }
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              de
            ]
          }
        ],
        "caret-color": [
          {
            caret: [
              n
            ]
          }
        ],
        "pointer-events": [
          {
            "pointer-events": [
              "none",
              "auto"
            ]
          }
        ],
        resize: [
          {
            resize: [
              "none",
              "y",
              "x",
              ""
            ]
          }
        ],
        "scroll-behavior": [
          {
            scroll: [
              "auto",
              "smooth"
            ]
          }
        ],
        "scroll-m": [
          {
            "scroll-m": re()
          }
        ],
        "scroll-mx": [
          {
            "scroll-mx": re()
          }
        ],
        "scroll-my": [
          {
            "scroll-my": re()
          }
        ],
        "scroll-ms": [
          {
            "scroll-ms": re()
          }
        ],
        "scroll-me": [
          {
            "scroll-me": re()
          }
        ],
        "scroll-mt": [
          {
            "scroll-mt": re()
          }
        ],
        "scroll-mr": [
          {
            "scroll-mr": re()
          }
        ],
        "scroll-mb": [
          {
            "scroll-mb": re()
          }
        ],
        "scroll-ml": [
          {
            "scroll-ml": re()
          }
        ],
        "scroll-p": [
          {
            "scroll-p": re()
          }
        ],
        "scroll-px": [
          {
            "scroll-px": re()
          }
        ],
        "scroll-py": [
          {
            "scroll-py": re()
          }
        ],
        "scroll-ps": [
          {
            "scroll-ps": re()
          }
        ],
        "scroll-pe": [
          {
            "scroll-pe": re()
          }
        ],
        "scroll-pt": [
          {
            "scroll-pt": re()
          }
        ],
        "scroll-pr": [
          {
            "scroll-pr": re()
          }
        ],
        "scroll-pb": [
          {
            "scroll-pb": re()
          }
        ],
        "scroll-pl": [
          {
            "scroll-pl": re()
          }
        ],
        "snap-align": [
          {
            snap: [
              "start",
              "end",
              "center",
              "align-none"
            ]
          }
        ],
        "snap-stop": [
          {
            snap: [
              "normal",
              "always"
            ]
          }
        ],
        "snap-type": [
          {
            snap: [
              "none",
              "x",
              "y",
              "both"
            ]
          }
        ],
        "snap-strictness": [
          {
            snap: [
              "mandatory",
              "proximity"
            ]
          }
        ],
        touch: [
          {
            touch: [
              "auto",
              "none",
              "manipulation"
            ]
          }
        ],
        "touch-x": [
          {
            "touch-pan": [
              "x",
              "left",
              "right"
            ]
          }
        ],
        "touch-y": [
          {
            "touch-pan": [
              "y",
              "up",
              "down"
            ]
          }
        ],
        "touch-pz": [
          "touch-pinch-zoom"
        ],
        select: [
          {
            select: [
              "none",
              "text",
              "all",
              "auto"
            ]
          }
        ],
        "will-change": [
          {
            "will-change": [
              "auto",
              "scroll",
              "contents",
              "transform",
              de
            ]
          }
        ],
        fill: [
          {
            fill: [
              n,
              "none"
            ]
          }
        ],
        "stroke-w": [
          {
            stroke: [
              on,
              En,
              _a
            ]
          }
        ],
        stroke: [
          {
            stroke: [
              n,
              "none"
            ]
          }
        ],
        sr: [
          "sr-only",
          "not-sr-only"
        ],
        "forced-color-adjust": [
          {
            "forced-color-adjust": [
              "auto",
              "none"
            ]
          }
        ]
      },
      conflictingClassGroups: {
        overflow: [
          "overflow-x",
          "overflow-y"
        ],
        overscroll: [
          "overscroll-x",
          "overscroll-y"
        ],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left"
        ],
        "inset-x": [
          "right",
          "left"
        ],
        "inset-y": [
          "top",
          "bottom"
        ],
        flex: [
          "basis",
          "grow",
          "shrink"
        ],
        gap: [
          "gap-x",
          "gap-y"
        ],
        p: [
          "px",
          "py",
          "ps",
          "pe",
          "pt",
          "pr",
          "pb",
          "pl"
        ],
        px: [
          "pr",
          "pl"
        ],
        py: [
          "pt",
          "pb"
        ],
        m: [
          "mx",
          "my",
          "ms",
          "me",
          "mt",
          "mr",
          "mb",
          "ml"
        ],
        mx: [
          "mr",
          "ml"
        ],
        my: [
          "mt",
          "mb"
        ],
        size: [
          "w",
          "h"
        ],
        "font-size": [
          "leading"
        ],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction"
        ],
        "fvn-ordinal": [
          "fvn-normal"
        ],
        "fvn-slashed-zero": [
          "fvn-normal"
        ],
        "fvn-figure": [
          "fvn-normal"
        ],
        "fvn-spacing": [
          "fvn-normal"
        ],
        "fvn-fraction": [
          "fvn-normal"
        ],
        "line-clamp": [
          "display",
          "overflow"
        ],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl"
        ],
        "rounded-s": [
          "rounded-ss",
          "rounded-es"
        ],
        "rounded-e": [
          "rounded-se",
          "rounded-ee"
        ],
        "rounded-t": [
          "rounded-tl",
          "rounded-tr"
        ],
        "rounded-r": [
          "rounded-tr",
          "rounded-br"
        ],
        "rounded-b": [
          "rounded-br",
          "rounded-bl"
        ],
        "rounded-l": [
          "rounded-tl",
          "rounded-bl"
        ],
        "border-spacing": [
          "border-spacing-x",
          "border-spacing-y"
        ],
        "border-w": [
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l"
        ],
        "border-w-x": [
          "border-w-r",
          "border-w-l"
        ],
        "border-w-y": [
          "border-w-t",
          "border-w-b"
        ],
        "border-color": [
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l"
        ],
        "border-color-x": [
          "border-color-r",
          "border-color-l"
        ],
        "border-color-y": [
          "border-color-t",
          "border-color-b"
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml"
        ],
        "scroll-mx": [
          "scroll-mr",
          "scroll-ml"
        ],
        "scroll-my": [
          "scroll-mt",
          "scroll-mb"
        ],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl"
        ],
        "scroll-px": [
          "scroll-pr",
          "scroll-pl"
        ],
        "scroll-py": [
          "scroll-pt",
          "scroll-pb"
        ],
        touch: [
          "touch-x",
          "touch-y",
          "touch-pz"
        ],
        "touch-x": [
          "touch"
        ],
        "touch-y": [
          "touch"
        ],
        "touch-pz": [
          "touch"
        ]
      },
      conflictingClassGroupModifiers: {
        "font-size": [
          "leading"
        ]
      }
    };
  }, my = qg(hy);
  function Xn(...n) {
    return my(ep(n));
  }
  const gy = Bg("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }), Xe = m.forwardRef(({ className: n, variant: o, size: l, asChild: a = false, ...u }, d) => {
    const f = a ? dl : "button";
    return x.jsx(f, {
      className: Xn(gy({
        variant: o,
        size: l,
        className: n
      })),
      ref: d,
      ...u
    });
  });
  Xe.displayName = "Button";
  const Mo = m.forwardRef(({ className: n, type: o, ...l }, a) => x.jsx("input", {
    type: o,
    className: Xn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", n),
    ref: a,
    ...l
  }));
  Mo.displayName = "Input";
  function yy({ onJoin: n, onCreate: o, name: l, onSetName: a }) {
    const [u, d] = m.useState(() => {
      const y = new URL(document.location.toString()).searchParams.get("ticket");
      return (y == null ? void 0 : y.startsWith("chat")) ? y : "";
    }), f = (g) => {
      g.preventDefault(), u.trim() && n(u.trim());
    }, p = (g) => {
      g.preventDefault(), o();
    };
    return x.jsx("div", {
      className: "flex flex-col items-center justify-center flex-grow p-4",
      children: x.jsxs("div", {
        className: "w-full max-w-md space-y-4",
        children: [
          x.jsxs("div", {
            children: [
              x.jsx("h2", {
                className: "text-lg font-semibold mb-2",
                children: "Your name"
              }),
              x.jsx("div", {
                className: "flex space-x-2",
                children: x.jsx(Mo, {
                  value: l,
                  onChange: (g) => a(g.target.value),
                  placeholder: "Enter your name"
                })
              })
            ]
          }),
          l.length && x.jsxs(x.Fragment, {
            children: [
              x.jsxs("form", {
                onSubmit: f,
                children: [
                  x.jsx("h2", {
                    className: "text-lg font-semibold mb-2",
                    children: "Join Channel"
                  }),
                  x.jsxs("div", {
                    className: "flex space-x-2",
                    children: [
                      x.jsx(Mo, {
                        value: u,
                        onChange: (g) => d(g.target.value),
                        placeholder: "Enter ticket"
                      }),
                      x.jsx(Xe, {
                        type: "submit",
                        children: "Join"
                      })
                    ]
                  })
                ]
              }),
              x.jsxs("form", {
                onSubmit: p,
                children: [
                  x.jsx("h2", {
                    className: "text-lg font-semibold mb-2",
                    children: "Create Channel"
                  }),
                  x.jsx("div", {
                    className: "flex space-x-2",
                    children: x.jsx(Xe, {
                      type: "submit",
                      children: "Create"
                    })
                  })
                ]
              })
            ]
          })
        ]
      })
    });
  }
  var Wa = Xf();
  const vy = qf(Wa);
  var _y = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "span",
    "svg",
    "ul"
  ], Ze = _y.reduce((n, o) => {
    const l = m.forwardRef((a, u) => {
      const { asChild: d, ...f } = a, p = d ? dl : o;
      return typeof window < "u" && (window[Symbol.for("radix-ui")] = true), x.jsx(p, {
        ...f,
        ref: u
      });
    });
    return l.displayName = `Primitive.${o}`, {
      ...n,
      [o]: l
    };
  }, {});
  function wy(n, o) {
    n && Wa.flushSync(() => n.dispatchEvent(o));
  }
  var Nn = (globalThis == null ? void 0 : globalThis.document) ? m.useLayoutEffect : () => {
  };
  function by(n, o) {
    return m.useReducer((l, a) => o[l][a] ?? l, n);
  }
  var jn = (n) => {
    const { present: o, children: l } = n, a = Sy(o), u = typeof l == "function" ? l({
      present: a.isPresent
    }) : m.Children.only(l), d = ot(a.ref, xy(u));
    return typeof l == "function" || a.isPresent ? m.cloneElement(u, {
      ref: d
    }) : null;
  };
  jn.displayName = "Presence";
  function Sy(n) {
    const [o, l] = m.useState(), a = m.useRef({}), u = m.useRef(n), d = m.useRef("none"), f = n ? "mounted" : "unmounted", [p, g] = by(f, {
      mounted: {
        UNMOUNT: "unmounted",
        ANIMATION_OUT: "unmountSuspended"
      },
      unmountSuspended: {
        MOUNT: "mounted",
        ANIMATION_END: "unmounted"
      },
      unmounted: {
        MOUNT: "mounted"
      }
    });
    return m.useEffect(() => {
      const y = Gi(a.current);
      d.current = p === "mounted" ? y : "none";
    }, [
      p
    ]), Nn(() => {
      const y = a.current, _ = u.current;
      if (_ !== n) {
        const w = d.current, P = Gi(y);
        n ? g("MOUNT") : P === "none" || (y == null ? void 0 : y.display) === "none" ? g("UNMOUNT") : g(_ && w !== P ? "ANIMATION_OUT" : "UNMOUNT"), u.current = n;
      }
    }, [
      n,
      g
    ]), Nn(() => {
      if (o) {
        let y;
        const _ = o.ownerDocument.defaultView ?? window, b = (P) => {
          const k = Gi(a.current).includes(P.animationName);
          if (P.target === o && k && (g("ANIMATION_END"), !u.current)) {
            const R = o.style.animationFillMode;
            o.style.animationFillMode = "forwards", y = _.setTimeout(() => {
              o.style.animationFillMode === "forwards" && (o.style.animationFillMode = R);
            });
          }
        }, w = (P) => {
          P.target === o && (d.current = Gi(a.current));
        };
        return o.addEventListener("animationstart", w), o.addEventListener("animationcancel", b), o.addEventListener("animationend", b), () => {
          _.clearTimeout(y), o.removeEventListener("animationstart", w), o.removeEventListener("animationcancel", b), o.removeEventListener("animationend", b);
        };
      } else g("ANIMATION_END");
    }, [
      o,
      g
    ]), {
      isPresent: [
        "mounted",
        "unmountSuspended"
      ].includes(p),
      ref: m.useCallback((y) => {
        y && (a.current = getComputedStyle(y)), l(y);
      }, [])
    };
  }
  function Gi(n) {
    return (n == null ? void 0 : n.animationName) || "none";
  }
  function xy(n) {
    var _a2, _b2;
    let o = (_a2 = Object.getOwnPropertyDescriptor(n.props, "ref")) == null ? void 0 : _a2.get, l = o && "isReactWarning" in o && o.isReactWarning;
    return l ? n.ref : (o = (_b2 = Object.getOwnPropertyDescriptor(n, "ref")) == null ? void 0 : _b2.get, l = o && "isReactWarning" in o && o.isReactWarning, l ? n.props.ref : n.props.ref || n.ref);
  }
  function fl(n, o = []) {
    let l = [];
    function a(d, f) {
      const p = m.createContext(f), g = l.length;
      l = [
        ...l,
        f
      ];
      const y = (b) => {
        var _a2;
        const { scope: w, children: P, ...M } = b, k = ((_a2 = w == null ? void 0 : w[n]) == null ? void 0 : _a2[g]) || p, R = m.useMemo(() => M, Object.values(M));
        return x.jsx(k.Provider, {
          value: R,
          children: P
        });
      };
      y.displayName = d + "Provider";
      function _(b, w) {
        var _a2;
        const P = ((_a2 = w == null ? void 0 : w[n]) == null ? void 0 : _a2[g]) || p, M = m.useContext(P);
        if (M) return M;
        if (f !== void 0) return f;
        throw new Error(`\`${b}\` must be used within \`${d}\``);
      }
      return [
        y,
        _
      ];
    }
    const u = () => {
      const d = l.map((f) => m.createContext(f));
      return function(p) {
        const g = (p == null ? void 0 : p[n]) || d;
        return m.useMemo(() => ({
          [`__scope${n}`]: {
            ...p,
            [n]: g
          }
        }), [
          p,
          g
        ]);
      };
    };
    return u.scopeName = n, [
      a,
      ky(u, ...o)
    ];
  }
  function ky(...n) {
    const o = n[0];
    if (n.length === 1) return o;
    const l = () => {
      const a = n.map((u) => ({
        useScope: u(),
        scopeName: u.scopeName
      }));
      return function(d) {
        const f = a.reduce((p, { useScope: g, scopeName: y }) => {
          const b = g(d)[`__scope${y}`];
          return {
            ...p,
            ...b
          };
        }, {});
        return m.useMemo(() => ({
          [`__scope${o.scopeName}`]: f
        }), [
          f
        ]);
      };
    };
    return l.scopeName = o.scopeName, l;
  }
  function rt(n) {
    const o = m.useRef(n);
    return m.useEffect(() => {
      o.current = n;
    }), m.useMemo(() => (...l) => {
      var _a2;
      return (_a2 = o.current) == null ? void 0 : _a2.call(o, ...l);
    }, []);
  }
  var Cy = m.createContext(void 0);
  function Py(n) {
    const o = m.useContext(Cy);
    return n || o || "ltr";
  }
  function Ey(n, [o, l]) {
    return Math.min(l, Math.max(o, n));
  }
  function Ge(n, o, { checkForDefaultPrevented: l = true } = {}) {
    return function(u) {
      if (n == null ? void 0 : n(u), l === false || !u.defaultPrevented) return o == null ? void 0 : o(u);
    };
  }
  function Ty(n, o) {
    return m.useReducer((l, a) => o[l][a] ?? l, n);
  }
  var Ha = "ScrollArea", [lp, zS] = fl(Ha), [Ry, kt] = lp(Ha), sp = m.forwardRef((n, o) => {
    const { __scopeScrollArea: l, type: a = "hover", dir: u, scrollHideDelay: d = 600, ...f } = n, [p, g] = m.useState(null), [y, _] = m.useState(null), [b, w] = m.useState(null), [P, M] = m.useState(null), [k, R] = m.useState(null), [L, W] = m.useState(0), [H, O] = m.useState(0), [j, B] = m.useState(false), [V, K] = m.useState(false), Y = ot(o, (le) => g(le)), X = Py(u);
    return x.jsx(Ry, {
      scope: l,
      type: a,
      dir: X,
      scrollHideDelay: d,
      scrollArea: p,
      viewport: y,
      onViewportChange: _,
      content: b,
      onContentChange: w,
      scrollbarX: P,
      onScrollbarXChange: M,
      scrollbarXEnabled: j,
      onScrollbarXEnabledChange: B,
      scrollbarY: k,
      onScrollbarYChange: R,
      scrollbarYEnabled: V,
      onScrollbarYEnabledChange: K,
      onCornerWidthChange: W,
      onCornerHeightChange: O,
      children: x.jsx(Ze.div, {
        dir: X,
        ...f,
        ref: Y,
        style: {
          position: "relative",
          "--radix-scroll-area-corner-width": L + "px",
          "--radix-scroll-area-corner-height": H + "px",
          ...n.style
        }
      })
    });
  });
  sp.displayName = Ha;
  var ap = "ScrollAreaViewport", up = m.forwardRef((n, o) => {
    const { __scopeScrollArea: l, children: a, nonce: u, ...d } = n, f = kt(ap, l), p = m.useRef(null), g = ot(o, p, f.onViewportChange);
    return x.jsxs(x.Fragment, {
      children: [
        x.jsx("style", {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: u
        }),
        x.jsx(Ze.div, {
          "data-radix-scroll-area-viewport": "",
          ...d,
          ref: g,
          style: {
            overflowX: f.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: f.scrollbarYEnabled ? "scroll" : "hidden",
            ...n.style
          },
          children: x.jsx("div", {
            ref: f.onContentChange,
            style: {
              minWidth: "100%",
              display: "table"
            },
            children: a
          })
        })
      ]
    });
  });
  up.displayName = ap;
  var Kt = "ScrollAreaScrollbar", Ua = m.forwardRef((n, o) => {
    const { forceMount: l, ...a } = n, u = kt(Kt, n.__scopeScrollArea), { onScrollbarXEnabledChange: d, onScrollbarYEnabledChange: f } = u, p = n.orientation === "horizontal";
    return m.useEffect(() => (p ? d(true) : f(true), () => {
      p ? d(false) : f(false);
    }), [
      p,
      d,
      f
    ]), u.type === "hover" ? x.jsx(My, {
      ...a,
      ref: o,
      forceMount: l
    }) : u.type === "scroll" ? x.jsx(Ny, {
      ...a,
      ref: o,
      forceMount: l
    }) : u.type === "auto" ? x.jsx(cp, {
      ...a,
      ref: o,
      forceMount: l
    }) : u.type === "always" ? x.jsx(Va, {
      ...a,
      ref: o
    }) : null;
  });
  Ua.displayName = Kt;
  var My = m.forwardRef((n, o) => {
    const { forceMount: l, ...a } = n, u = kt(Kt, n.__scopeScrollArea), [d, f] = m.useState(false);
    return m.useEffect(() => {
      const p = u.scrollArea;
      let g = 0;
      if (p) {
        const y = () => {
          window.clearTimeout(g), f(true);
        }, _ = () => {
          g = window.setTimeout(() => f(false), u.scrollHideDelay);
        };
        return p.addEventListener("pointerenter", y), p.addEventListener("pointerleave", _), () => {
          window.clearTimeout(g), p.removeEventListener("pointerenter", y), p.removeEventListener("pointerleave", _);
        };
      }
    }, [
      u.scrollArea,
      u.scrollHideDelay
    ]), x.jsx(jn, {
      present: l || d,
      children: x.jsx(cp, {
        "data-state": d ? "visible" : "hidden",
        ...a,
        ref: o
      })
    });
  }), Ny = m.forwardRef((n, o) => {
    const { forceMount: l, ...a } = n, u = kt(Kt, n.__scopeScrollArea), d = n.orientation === "horizontal", f = hl(() => g("SCROLL_END"), 100), [p, g] = Ty("hidden", {
      hidden: {
        SCROLL: "scrolling"
      },
      scrolling: {
        SCROLL_END: "idle",
        POINTER_ENTER: "interacting"
      },
      interacting: {
        SCROLL: "interacting",
        POINTER_LEAVE: "idle"
      },
      idle: {
        HIDE: "hidden",
        SCROLL: "scrolling",
        POINTER_ENTER: "interacting"
      }
    });
    return m.useEffect(() => {
      if (p === "idle") {
        const y = window.setTimeout(() => g("HIDE"), u.scrollHideDelay);
        return () => window.clearTimeout(y);
      }
    }, [
      p,
      u.scrollHideDelay,
      g
    ]), m.useEffect(() => {
      const y = u.viewport, _ = d ? "scrollLeft" : "scrollTop";
      if (y) {
        let b = y[_];
        const w = () => {
          const P = y[_];
          b !== P && (g("SCROLL"), f()), b = P;
        };
        return y.addEventListener("scroll", w), () => y.removeEventListener("scroll", w);
      }
    }, [
      u.viewport,
      d,
      g,
      f
    ]), x.jsx(jn, {
      present: l || p !== "hidden",
      children: x.jsx(Va, {
        "data-state": p === "hidden" ? "hidden" : "visible",
        ...a,
        ref: o,
        onPointerEnter: Ge(n.onPointerEnter, () => g("POINTER_ENTER")),
        onPointerLeave: Ge(n.onPointerLeave, () => g("POINTER_LEAVE"))
      })
    });
  }), cp = m.forwardRef((n, o) => {
    const l = kt(Kt, n.__scopeScrollArea), { forceMount: a, ...u } = n, [d, f] = m.useState(false), p = n.orientation === "horizontal", g = hl(() => {
      if (l.viewport) {
        const y = l.viewport.offsetWidth < l.viewport.scrollWidth, _ = l.viewport.offsetHeight < l.viewport.scrollHeight;
        f(p ? y : _);
      }
    }, 10);
    return Ar(l.viewport, g), Ar(l.content, g), x.jsx(jn, {
      present: a || d,
      children: x.jsx(Va, {
        "data-state": d ? "visible" : "hidden",
        ...u,
        ref: o
      })
    });
  }), Va = m.forwardRef((n, o) => {
    const { orientation: l = "vertical", ...a } = n, u = kt(Kt, n.__scopeScrollArea), d = m.useRef(null), f = m.useRef(0), [p, g] = m.useState({
      content: 0,
      viewport: 0,
      scrollbar: {
        size: 0,
        paddingStart: 0,
        paddingEnd: 0
      }
    }), y = mp(p.viewport, p.content), _ = {
      ...a,
      sizes: p,
      onSizesChange: g,
      hasThumb: y > 0 && y < 1,
      onThumbChange: (w) => d.current = w,
      onThumbPointerUp: () => f.current = 0,
      onThumbPointerDown: (w) => f.current = w
    };
    function b(w, P) {
      return By(w, f.current, p, P);
    }
    return l === "horizontal" ? x.jsx(Ay, {
      ..._,
      ref: o,
      onThumbPositionChange: () => {
        if (u.viewport && d.current) {
          const w = u.viewport.scrollLeft, P = gf(w, p, u.dir);
          d.current.style.transform = `translate3d(${P}px, 0, 0)`;
        }
      },
      onWheelScroll: (w) => {
        u.viewport && (u.viewport.scrollLeft = w);
      },
      onDragScroll: (w) => {
        u.viewport && (u.viewport.scrollLeft = b(w, u.dir));
      }
    }) : l === "vertical" ? x.jsx(Ly, {
      ..._,
      ref: o,
      onThumbPositionChange: () => {
        if (u.viewport && d.current) {
          const w = u.viewport.scrollTop, P = gf(w, p);
          d.current.style.transform = `translate3d(0, ${P}px, 0)`;
        }
      },
      onWheelScroll: (w) => {
        u.viewport && (u.viewport.scrollTop = w);
      },
      onDragScroll: (w) => {
        u.viewport && (u.viewport.scrollTop = b(w));
      }
    }) : null;
  }), Ay = m.forwardRef((n, o) => {
    const { sizes: l, onSizesChange: a, ...u } = n, d = kt(Kt, n.__scopeScrollArea), [f, p] = m.useState(), g = m.useRef(null), y = ot(o, g, d.onScrollbarXChange);
    return m.useEffect(() => {
      g.current && p(getComputedStyle(g.current));
    }, [
      g
    ]), x.jsx(fp, {
      "data-orientation": "horizontal",
      ...u,
      ref: y,
      sizes: l,
      style: {
        bottom: 0,
        left: d.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: d.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": pl(l) + "px",
        ...n.style
      },
      onThumbPointerDown: (_) => n.onThumbPointerDown(_.x),
      onDragScroll: (_) => n.onDragScroll(_.x),
      onWheelScroll: (_, b) => {
        if (d.viewport) {
          const w = d.viewport.scrollLeft + _.deltaX;
          n.onWheelScroll(w), yp(w, b) && _.preventDefault();
        }
      },
      onResize: () => {
        g.current && d.viewport && f && a({
          content: d.viewport.scrollWidth,
          viewport: d.viewport.offsetWidth,
          scrollbar: {
            size: g.current.clientWidth,
            paddingStart: il(f.paddingLeft),
            paddingEnd: il(f.paddingRight)
          }
        });
      }
    });
  }), Ly = m.forwardRef((n, o) => {
    const { sizes: l, onSizesChange: a, ...u } = n, d = kt(Kt, n.__scopeScrollArea), [f, p] = m.useState(), g = m.useRef(null), y = ot(o, g, d.onScrollbarYChange);
    return m.useEffect(() => {
      g.current && p(getComputedStyle(g.current));
    }, [
      g
    ]), x.jsx(fp, {
      "data-orientation": "vertical",
      ...u,
      ref: y,
      sizes: l,
      style: {
        top: 0,
        right: d.dir === "ltr" ? 0 : void 0,
        left: d.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": pl(l) + "px",
        ...n.style
      },
      onThumbPointerDown: (_) => n.onThumbPointerDown(_.y),
      onDragScroll: (_) => n.onDragScroll(_.y),
      onWheelScroll: (_, b) => {
        if (d.viewport) {
          const w = d.viewport.scrollTop + _.deltaY;
          n.onWheelScroll(w), yp(w, b) && _.preventDefault();
        }
      },
      onResize: () => {
        g.current && d.viewport && f && a({
          content: d.viewport.scrollHeight,
          viewport: d.viewport.offsetHeight,
          scrollbar: {
            size: g.current.clientHeight,
            paddingStart: il(f.paddingTop),
            paddingEnd: il(f.paddingBottom)
          }
        });
      }
    });
  }), [Oy, dp] = lp(Kt), fp = m.forwardRef((n, o) => {
    const { __scopeScrollArea: l, sizes: a, hasThumb: u, onThumbChange: d, onThumbPointerUp: f, onThumbPointerDown: p, onThumbPositionChange: g, onDragScroll: y, onWheelScroll: _, onResize: b, ...w } = n, P = kt(Kt, l), [M, k] = m.useState(null), R = ot(o, (Y) => k(Y)), L = m.useRef(null), W = m.useRef(""), H = P.viewport, O = a.content - a.viewport, j = rt(_), B = rt(g), V = hl(b, 10);
    function K(Y) {
      if (L.current) {
        const X = Y.clientX - L.current.left, le = Y.clientY - L.current.top;
        y({
          x: X,
          y: le
        });
      }
    }
    return m.useEffect(() => {
      const Y = (X) => {
        const le = X.target;
        (M == null ? void 0 : M.contains(le)) && j(X, O);
      };
      return document.addEventListener("wheel", Y, {
        passive: false
      }), () => document.removeEventListener("wheel", Y, {
        passive: false
      });
    }, [
      H,
      M,
      O,
      j
    ]), m.useEffect(B, [
      a,
      B
    ]), Ar(M, V), Ar(P.content, V), x.jsx(Oy, {
      scope: l,
      scrollbar: M,
      hasThumb: u,
      onThumbChange: rt(d),
      onThumbPointerUp: rt(f),
      onThumbPositionChange: B,
      onThumbPointerDown: rt(p),
      children: x.jsx(Ze.div, {
        ...w,
        ref: R,
        style: {
          position: "absolute",
          ...w.style
        },
        onPointerDown: Ge(n.onPointerDown, (Y) => {
          Y.button === 0 && (Y.target.setPointerCapture(Y.pointerId), L.current = M.getBoundingClientRect(), W.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", P.viewport && (P.viewport.style.scrollBehavior = "auto"), K(Y));
        }),
        onPointerMove: Ge(n.onPointerMove, K),
        onPointerUp: Ge(n.onPointerUp, (Y) => {
          const X = Y.target;
          X.hasPointerCapture(Y.pointerId) && X.releasePointerCapture(Y.pointerId), document.body.style.webkitUserSelect = W.current, P.viewport && (P.viewport.style.scrollBehavior = ""), L.current = null;
        })
      })
    });
  }), ol = "ScrollAreaThumb", pp = m.forwardRef((n, o) => {
    const { forceMount: l, ...a } = n, u = dp(ol, n.__scopeScrollArea);
    return x.jsx(jn, {
      present: l || u.hasThumb,
      children: x.jsx(jy, {
        ref: o,
        ...a
      })
    });
  }), jy = m.forwardRef((n, o) => {
    const { __scopeScrollArea: l, style: a, ...u } = n, d = kt(ol, l), f = dp(ol, l), { onThumbPositionChange: p } = f, g = ot(o, (b) => f.onThumbChange(b)), y = m.useRef(void 0), _ = hl(() => {
      y.current && (y.current(), y.current = void 0);
    }, 100);
    return m.useEffect(() => {
      const b = d.viewport;
      if (b) {
        const w = () => {
          if (_(), !y.current) {
            const P = Fy(b, p);
            y.current = P, p();
          }
        };
        return p(), b.addEventListener("scroll", w), () => b.removeEventListener("scroll", w);
      }
    }, [
      d.viewport,
      _,
      p
    ]), x.jsx(Ze.div, {
      "data-state": f.hasThumb ? "visible" : "hidden",
      ...u,
      ref: g,
      style: {
        width: "var(--radix-scroll-area-thumb-width)",
        height: "var(--radix-scroll-area-thumb-height)",
        ...a
      },
      onPointerDownCapture: Ge(n.onPointerDownCapture, (b) => {
        const P = b.target.getBoundingClientRect(), M = b.clientX - P.left, k = b.clientY - P.top;
        f.onThumbPointerDown({
          x: M,
          y: k
        });
      }),
      onPointerUp: Ge(n.onPointerUp, f.onThumbPointerUp)
    });
  });
  pp.displayName = ol;
  var $a = "ScrollAreaCorner", hp = m.forwardRef((n, o) => {
    const l = kt($a, n.__scopeScrollArea), a = !!(l.scrollbarX && l.scrollbarY);
    return l.type !== "scroll" && a ? x.jsx(Dy, {
      ...n,
      ref: o
    }) : null;
  });
  hp.displayName = $a;
  var Dy = m.forwardRef((n, o) => {
    const { __scopeScrollArea: l, ...a } = n, u = kt($a, l), [d, f] = m.useState(0), [p, g] = m.useState(0), y = !!(d && p);
    return Ar(u.scrollbarX, () => {
      var _a2;
      const _ = ((_a2 = u.scrollbarX) == null ? void 0 : _a2.offsetHeight) || 0;
      u.onCornerHeightChange(_), g(_);
    }), Ar(u.scrollbarY, () => {
      var _a2;
      const _ = ((_a2 = u.scrollbarY) == null ? void 0 : _a2.offsetWidth) || 0;
      u.onCornerWidthChange(_), f(_);
    }), y ? x.jsx(Ze.div, {
      ...a,
      ref: o,
      style: {
        width: d,
        height: p,
        position: "absolute",
        right: u.dir === "ltr" ? 0 : void 0,
        left: u.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...n.style
      }
    }) : null;
  });
  function il(n) {
    return n ? parseInt(n, 10) : 0;
  }
  function mp(n, o) {
    const l = n / o;
    return isNaN(l) ? 0 : l;
  }
  function pl(n) {
    const o = mp(n.viewport, n.content), l = n.scrollbar.paddingStart + n.scrollbar.paddingEnd, a = (n.scrollbar.size - l) * o;
    return Math.max(a, 18);
  }
  function By(n, o, l, a = "ltr") {
    const u = pl(l), d = u / 2, f = o || d, p = u - f, g = l.scrollbar.paddingStart + f, y = l.scrollbar.size - l.scrollbar.paddingEnd - p, _ = l.content - l.viewport, b = a === "ltr" ? [
      0,
      _
    ] : [
      _ * -1,
      0
    ];
    return gp([
      g,
      y
    ], b)(n);
  }
  function gf(n, o, l = "ltr") {
    const a = pl(o), u = o.scrollbar.paddingStart + o.scrollbar.paddingEnd, d = o.scrollbar.size - u, f = o.content - o.viewport, p = d - a, g = l === "ltr" ? [
      0,
      f
    ] : [
      f * -1,
      0
    ], y = Ey(n, g);
    return gp([
      0,
      f
    ], [
      0,
      p
    ])(y);
  }
  function gp(n, o) {
    return (l) => {
      if (n[0] === n[1] || o[0] === o[1]) return o[0];
      const a = (o[1] - o[0]) / (n[1] - n[0]);
      return o[0] + a * (l - n[0]);
    };
  }
  function yp(n, o) {
    return n > 0 && n < o;
  }
  var Fy = (n, o = () => {
  }) => {
    let l = {
      left: n.scrollLeft,
      top: n.scrollTop
    }, a = 0;
    return function u() {
      const d = {
        left: n.scrollLeft,
        top: n.scrollTop
      }, f = l.left !== d.left, p = l.top !== d.top;
      (f || p) && o(), l = d, a = window.requestAnimationFrame(u);
    }(), () => window.cancelAnimationFrame(a);
  };
  function hl(n, o) {
    const l = rt(n), a = m.useRef(0);
    return m.useEffect(() => () => window.clearTimeout(a.current), []), m.useCallback(() => {
      window.clearTimeout(a.current), a.current = window.setTimeout(l, o);
    }, [
      l,
      o
    ]);
  }
  function Ar(n, o) {
    const l = rt(o);
    Nn(() => {
      let a = 0;
      if (n) {
        const u = new ResizeObserver(() => {
          cancelAnimationFrame(a), a = window.requestAnimationFrame(l);
        });
        return u.observe(n), () => {
          window.cancelAnimationFrame(a), u.unobserve(n);
        };
      }
    }, [
      n,
      l
    ]);
  }
  var vp = sp, zy = up, Iy = hp;
  const No = m.forwardRef(({ className: n, children: o, ...l }, a) => x.jsxs(vp, {
    ref: a,
    className: Xn("relative overflow-hidden", n),
    ...l,
    children: [
      x.jsx(zy, {
        className: "h-full w-full rounded-[inherit]",
        children: o
      }),
      x.jsx(_p, {}),
      x.jsx(Iy, {})
    ]
  }));
  No.displayName = vp.displayName;
  const _p = m.forwardRef(({ className: n, orientation: o = "vertical", ...l }, a) => x.jsx(Ua, {
    ref: a,
    orientation: o,
    className: Xn("flex touch-none select-none transition-colors", o === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", o === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", n),
    ...l,
    children: x.jsx(pp, {
      className: "relative flex-1 rounded-full bg-border"
    })
  }));
  _p.displayName = Ua.displayName;
  function Wy(n, o = globalThis == null ? void 0 : globalThis.document) {
    const l = rt(n);
    m.useEffect(() => {
      const a = (u) => {
        u.key === "Escape" && l(u);
      };
      return o.addEventListener("keydown", a, {
        capture: true
      }), () => o.removeEventListener("keydown", a, {
        capture: true
      });
    }, [
      l,
      o
    ]);
  }
  var Hy = "DismissableLayer", Aa = "dismissableLayer.update", Uy = "dismissableLayer.pointerDownOutside", Vy = "dismissableLayer.focusOutside", yf, wp = m.createContext({
    layers: /* @__PURE__ */ new Set(),
    layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
    branches: /* @__PURE__ */ new Set()
  }), bp = m.forwardRef((n, o) => {
    const { disableOutsidePointerEvents: l = false, onEscapeKeyDown: a, onPointerDownOutside: u, onFocusOutside: d, onInteractOutside: f, onDismiss: p, ...g } = n, y = m.useContext(wp), [_, b] = m.useState(null), w = (_ == null ? void 0 : _.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, P] = m.useState({}), M = ot(o, (V) => b(V)), k = Array.from(y.layers), [R] = [
      ...y.layersWithOutsidePointerEventsDisabled
    ].slice(-1), L = k.indexOf(R), W = _ ? k.indexOf(_) : -1, H = y.layersWithOutsidePointerEventsDisabled.size > 0, O = W >= L, j = Ky((V) => {
      const K = V.target, Y = [
        ...y.branches
      ].some((X) => X.contains(K));
      !O || Y || (u == null ? void 0 : u(V), f == null ? void 0 : f(V), V.defaultPrevented || (p == null ? void 0 : p()));
    }, w), B = Qy((V) => {
      const K = V.target;
      [
        ...y.branches
      ].some((X) => X.contains(K)) || (d == null ? void 0 : d(V), f == null ? void 0 : f(V), V.defaultPrevented || (p == null ? void 0 : p()));
    }, w);
    return Wy((V) => {
      W === y.layers.size - 1 && (a == null ? void 0 : a(V), !V.defaultPrevented && p && (V.preventDefault(), p()));
    }, w), m.useEffect(() => {
      if (_) return l && (y.layersWithOutsidePointerEventsDisabled.size === 0 && (yf = w.body.style.pointerEvents, w.body.style.pointerEvents = "none"), y.layersWithOutsidePointerEventsDisabled.add(_)), y.layers.add(_), vf(), () => {
        l && y.layersWithOutsidePointerEventsDisabled.size === 1 && (w.body.style.pointerEvents = yf);
      };
    }, [
      _,
      w,
      l,
      y
    ]), m.useEffect(() => () => {
      _ && (y.layers.delete(_), y.layersWithOutsidePointerEventsDisabled.delete(_), vf());
    }, [
      _,
      y
    ]), m.useEffect(() => {
      const V = () => P({});
      return document.addEventListener(Aa, V), () => document.removeEventListener(Aa, V);
    }, []), x.jsx(Ze.div, {
      ...g,
      ref: M,
      style: {
        pointerEvents: H ? O ? "auto" : "none" : void 0,
        ...n.style
      },
      onFocusCapture: Ge(n.onFocusCapture, B.onFocusCapture),
      onBlurCapture: Ge(n.onBlurCapture, B.onBlurCapture),
      onPointerDownCapture: Ge(n.onPointerDownCapture, j.onPointerDownCapture)
    });
  });
  bp.displayName = Hy;
  var $y = "DismissableLayerBranch", Gy = m.forwardRef((n, o) => {
    const l = m.useContext(wp), a = m.useRef(null), u = ot(o, a);
    return m.useEffect(() => {
      const d = a.current;
      if (d) return l.branches.add(d), () => {
        l.branches.delete(d);
      };
    }, [
      l.branches
    ]), x.jsx(Ze.div, {
      ...n,
      ref: u
    });
  });
  Gy.displayName = $y;
  function Ky(n, o = globalThis == null ? void 0 : globalThis.document) {
    const l = rt(n), a = m.useRef(false), u = m.useRef(() => {
    });
    return m.useEffect(() => {
      const d = (p) => {
        if (p.target && !a.current) {
          let g = function() {
            Sp(Uy, l, y, {
              discrete: true
            });
          };
          const y = {
            originalEvent: p
          };
          p.pointerType === "touch" ? (o.removeEventListener("click", u.current), u.current = g, o.addEventListener("click", u.current, {
            once: true
          })) : g();
        } else o.removeEventListener("click", u.current);
        a.current = false;
      }, f = window.setTimeout(() => {
        o.addEventListener("pointerdown", d);
      }, 0);
      return () => {
        window.clearTimeout(f), o.removeEventListener("pointerdown", d), o.removeEventListener("click", u.current);
      };
    }, [
      o,
      l
    ]), {
      onPointerDownCapture: () => a.current = true
    };
  }
  function Qy(n, o = globalThis == null ? void 0 : globalThis.document) {
    const l = rt(n), a = m.useRef(false);
    return m.useEffect(() => {
      const u = (d) => {
        d.target && !a.current && Sp(Vy, l, {
          originalEvent: d
        }, {
          discrete: false
        });
      };
      return o.addEventListener("focusin", u), () => o.removeEventListener("focusin", u);
    }, [
      o,
      l
    ]), {
      onFocusCapture: () => a.current = true,
      onBlurCapture: () => a.current = false
    };
  }
  function vf() {
    const n = new CustomEvent(Aa);
    document.dispatchEvent(n);
  }
  function Sp(n, o, l, { discrete: a }) {
    const u = l.originalEvent.target, d = new CustomEvent(n, {
      bubbles: false,
      cancelable: true,
      detail: l
    });
    o && u.addEventListener(n, o, {
      once: true
    }), a ? wy(u, d) : u.dispatchEvent(d);
  }
  var wa = 0;
  function Yy() {
    m.useEffect(() => {
      const n = document.querySelectorAll("[data-radix-focus-guard]");
      return document.body.insertAdjacentElement("afterbegin", n[0] ?? _f()), document.body.insertAdjacentElement("beforeend", n[1] ?? _f()), wa++, () => {
        wa === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((o) => o.remove()), wa--;
      };
    }, []);
  }
  function _f() {
    const n = document.createElement("span");
    return n.setAttribute("data-radix-focus-guard", ""), n.tabIndex = 0, n.style.outline = "none", n.style.opacity = "0", n.style.position = "fixed", n.style.pointerEvents = "none", n;
  }
  var ba = "focusScope.autoFocusOnMount", Sa = "focusScope.autoFocusOnUnmount", wf = {
    bubbles: false,
    cancelable: true
  }, qy = "FocusScope", xp = m.forwardRef((n, o) => {
    const { loop: l = false, trapped: a = false, onMountAutoFocus: u, onUnmountAutoFocus: d, ...f } = n, [p, g] = m.useState(null), y = rt(u), _ = rt(d), b = m.useRef(null), w = ot(o, (k) => g(k)), P = m.useRef({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    }).current;
    m.useEffect(() => {
      if (a) {
        let k = function(H) {
          if (P.paused || !p) return;
          const O = H.target;
          p.contains(O) ? b.current = O : Rn(b.current, {
            select: true
          });
        }, R = function(H) {
          if (P.paused || !p) return;
          const O = H.relatedTarget;
          O !== null && (p.contains(O) || Rn(b.current, {
            select: true
          }));
        }, L = function(H) {
          if (document.activeElement === document.body) for (const j of H) j.removedNodes.length > 0 && Rn(p);
        };
        document.addEventListener("focusin", k), document.addEventListener("focusout", R);
        const W = new MutationObserver(L);
        return p && W.observe(p, {
          childList: true,
          subtree: true
        }), () => {
          document.removeEventListener("focusin", k), document.removeEventListener("focusout", R), W.disconnect();
        };
      }
    }, [
      a,
      p,
      P.paused
    ]), m.useEffect(() => {
      if (p) {
        Sf.add(P);
        const k = document.activeElement;
        if (!p.contains(k)) {
          const L = new CustomEvent(ba, wf);
          p.addEventListener(ba, y), p.dispatchEvent(L), L.defaultPrevented || (Xy(nv(kp(p)), {
            select: true
          }), document.activeElement === k && Rn(p));
        }
        return () => {
          p.removeEventListener(ba, y), setTimeout(() => {
            const L = new CustomEvent(Sa, wf);
            p.addEventListener(Sa, _), p.dispatchEvent(L), L.defaultPrevented || Rn(k ?? document.body, {
              select: true
            }), p.removeEventListener(Sa, _), Sf.remove(P);
          }, 0);
        };
      }
    }, [
      p,
      y,
      _,
      P
    ]);
    const M = m.useCallback((k) => {
      if (!l && !a || P.paused) return;
      const R = k.key === "Tab" && !k.altKey && !k.ctrlKey && !k.metaKey, L = document.activeElement;
      if (R && L) {
        const W = k.currentTarget, [H, O] = Jy(W);
        H && O ? !k.shiftKey && L === O ? (k.preventDefault(), l && Rn(H, {
          select: true
        })) : k.shiftKey && L === H && (k.preventDefault(), l && Rn(O, {
          select: true
        })) : L === W && k.preventDefault();
      }
    }, [
      l,
      a,
      P.paused
    ]);
    return x.jsx(Ze.div, {
      tabIndex: -1,
      ...f,
      ref: w,
      onKeyDown: M
    });
  });
  xp.displayName = qy;
  function Xy(n, { select: o = false } = {}) {
    const l = document.activeElement;
    for (const a of n) if (Rn(a, {
      select: o
    }), document.activeElement !== l) return;
  }
  function Jy(n) {
    const o = kp(n), l = bf(o, n), a = bf(o.reverse(), n);
    return [
      l,
      a
    ];
  }
  function kp(n) {
    const o = [], l = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (a) => {
        const u = a.tagName === "INPUT" && a.type === "hidden";
        return a.disabled || a.hidden || u ? NodeFilter.FILTER_SKIP : a.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    for (; l.nextNode(); ) o.push(l.currentNode);
    return o;
  }
  function bf(n, o) {
    for (const l of n) if (!Zy(l, {
      upTo: o
    })) return l;
  }
  function Zy(n, { upTo: o }) {
    if (getComputedStyle(n).visibility === "hidden") return true;
    for (; n; ) {
      if (o !== void 0 && n === o) return false;
      if (getComputedStyle(n).display === "none") return true;
      n = n.parentElement;
    }
    return false;
  }
  function ev(n) {
    return n instanceof HTMLInputElement && "select" in n;
  }
  function Rn(n, { select: o = false } = {}) {
    if (n && n.focus) {
      const l = document.activeElement;
      n.focus({
        preventScroll: true
      }), n !== l && ev(n) && o && n.select();
    }
  }
  var Sf = tv();
  function tv() {
    let n = [];
    return {
      add(o) {
        const l = n[0];
        o !== l && (l == null ? void 0 : l.pause()), n = xf(n, o), n.unshift(o);
      },
      remove(o) {
        var _a2;
        n = xf(n, o), (_a2 = n[0]) == null ? void 0 : _a2.resume();
      }
    };
  }
  function xf(n, o) {
    const l = [
      ...n
    ], a = l.indexOf(o);
    return a !== -1 && l.splice(a, 1), l;
  }
  function nv(n) {
    return n.filter((o) => o.tagName !== "A");
  }
  var rv = Eg.useId || (() => {
  }), ov = 0;
  function iv(n) {
    const [o, l] = m.useState(rv());
    return Nn(() => {
      l((a) => a ?? String(ov++));
    }, [
      n
    ]), n || (o ? `radix-${o}` : "");
  }
  const lv = [
    "top",
    "right",
    "bottom",
    "left"
  ], An = Math.min, mt = Math.max, ll = Math.round, Ki = Math.floor, Vt = (n) => ({
    x: n,
    y: n
  }), sv = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  }, av = {
    start: "end",
    end: "start"
  };
  function La(n, o, l) {
    return mt(n, An(o, l));
  }
  function ln(n, o) {
    return typeof n == "function" ? n(o) : n;
  }
  function sn(n) {
    return n.split("-")[0];
  }
  function Dr(n) {
    return n.split("-")[1];
  }
  function Ga(n) {
    return n === "x" ? "y" : "x";
  }
  function Ka(n) {
    return n === "y" ? "height" : "width";
  }
  function Ln(n) {
    return [
      "top",
      "bottom"
    ].includes(sn(n)) ? "y" : "x";
  }
  function Qa(n) {
    return Ga(Ln(n));
  }
  function uv(n, o, l) {
    l === void 0 && (l = false);
    const a = Dr(n), u = Qa(n), d = Ka(u);
    let f = u === "x" ? a === (l ? "end" : "start") ? "right" : "left" : a === "start" ? "bottom" : "top";
    return o.reference[d] > o.floating[d] && (f = sl(f)), [
      f,
      sl(f)
    ];
  }
  function cv(n) {
    const o = sl(n);
    return [
      Oa(n),
      o,
      Oa(o)
    ];
  }
  function Oa(n) {
    return n.replace(/start|end/g, (o) => av[o]);
  }
  function dv(n, o, l) {
    const a = [
      "left",
      "right"
    ], u = [
      "right",
      "left"
    ], d = [
      "top",
      "bottom"
    ], f = [
      "bottom",
      "top"
    ];
    switch (n) {
      case "top":
      case "bottom":
        return l ? o ? u : a : o ? a : u;
      case "left":
      case "right":
        return o ? d : f;
      default:
        return [];
    }
  }
  function fv(n, o, l, a) {
    const u = Dr(n);
    let d = dv(sn(n), l === "start", a);
    return u && (d = d.map((f) => f + "-" + u), o && (d = d.concat(d.map(Oa)))), d;
  }
  function sl(n) {
    return n.replace(/left|right|bottom|top/g, (o) => sv[o]);
  }
  function pv(n) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...n
    };
  }
  function Cp(n) {
    return typeof n != "number" ? pv(n) : {
      top: n,
      right: n,
      bottom: n,
      left: n
    };
  }
  function al(n) {
    const { x: o, y: l, width: a, height: u } = n;
    return {
      width: a,
      height: u,
      top: l,
      left: o,
      right: o + a,
      bottom: l + u,
      x: o,
      y: l
    };
  }
  function kf(n, o, l) {
    let { reference: a, floating: u } = n;
    const d = Ln(o), f = Qa(o), p = Ka(f), g = sn(o), y = d === "y", _ = a.x + a.width / 2 - u.width / 2, b = a.y + a.height / 2 - u.height / 2, w = a[p] / 2 - u[p] / 2;
    let P;
    switch (g) {
      case "top":
        P = {
          x: _,
          y: a.y - u.height
        };
        break;
      case "bottom":
        P = {
          x: _,
          y: a.y + a.height
        };
        break;
      case "right":
        P = {
          x: a.x + a.width,
          y: b
        };
        break;
      case "left":
        P = {
          x: a.x - u.width,
          y: b
        };
        break;
      default:
        P = {
          x: a.x,
          y: a.y
        };
    }
    switch (Dr(o)) {
      case "start":
        P[f] -= w * (l && y ? -1 : 1);
        break;
      case "end":
        P[f] += w * (l && y ? -1 : 1);
        break;
    }
    return P;
  }
  const hv = async (n, o, l) => {
    const { placement: a = "bottom", strategy: u = "absolute", middleware: d = [], platform: f } = l, p = d.filter(Boolean), g = await (f.isRTL == null ? void 0 : f.isRTL(o));
    let y = await f.getElementRects({
      reference: n,
      floating: o,
      strategy: u
    }), { x: _, y: b } = kf(y, a, g), w = a, P = {}, M = 0;
    for (let k = 0; k < p.length; k++) {
      const { name: R, fn: L } = p[k], { x: W, y: H, data: O, reset: j } = await L({
        x: _,
        y: b,
        initialPlacement: a,
        placement: w,
        strategy: u,
        middlewareData: P,
        rects: y,
        platform: f,
        elements: {
          reference: n,
          floating: o
        }
      });
      _ = W ?? _, b = H ?? b, P = {
        ...P,
        [R]: {
          ...P[R],
          ...O
        }
      }, j && M <= 50 && (M++, typeof j == "object" && (j.placement && (w = j.placement), j.rects && (y = j.rects === true ? await f.getElementRects({
        reference: n,
        floating: o,
        strategy: u
      }) : j.rects), { x: _, y: b } = kf(y, w, g)), k = -1);
    }
    return {
      x: _,
      y: b,
      placement: w,
      strategy: u,
      middlewareData: P
    };
  };
  async function Ao(n, o) {
    var l;
    o === void 0 && (o = {});
    const { x: a, y: u, platform: d, rects: f, elements: p, strategy: g } = n, { boundary: y = "clippingAncestors", rootBoundary: _ = "viewport", elementContext: b = "floating", altBoundary: w = false, padding: P = 0 } = ln(o, n), M = Cp(P), R = p[w ? b === "floating" ? "reference" : "floating" : b], L = al(await d.getClippingRect({
      element: (l = await (d.isElement == null ? void 0 : d.isElement(R))) == null || l ? R : R.contextElement || await (d.getDocumentElement == null ? void 0 : d.getDocumentElement(p.floating)),
      boundary: y,
      rootBoundary: _,
      strategy: g
    })), W = b === "floating" ? {
      x: a,
      y: u,
      width: f.floating.width,
      height: f.floating.height
    } : f.reference, H = await (d.getOffsetParent == null ? void 0 : d.getOffsetParent(p.floating)), O = await (d.isElement == null ? void 0 : d.isElement(H)) ? await (d.getScale == null ? void 0 : d.getScale(H)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    }, j = al(d.convertOffsetParentRelativeRectToViewportRelativeRect ? await d.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements: p,
      rect: W,
      offsetParent: H,
      strategy: g
    }) : W);
    return {
      top: (L.top - j.top + M.top) / O.y,
      bottom: (j.bottom - L.bottom + M.bottom) / O.y,
      left: (L.left - j.left + M.left) / O.x,
      right: (j.right - L.right + M.right) / O.x
    };
  }
  const mv = (n) => ({
    name: "arrow",
    options: n,
    async fn(o) {
      const { x: l, y: a, placement: u, rects: d, platform: f, elements: p, middlewareData: g } = o, { element: y, padding: _ = 0 } = ln(n, o) || {};
      if (y == null) return {};
      const b = Cp(_), w = {
        x: l,
        y: a
      }, P = Qa(u), M = Ka(P), k = await f.getDimensions(y), R = P === "y", L = R ? "top" : "left", W = R ? "bottom" : "right", H = R ? "clientHeight" : "clientWidth", O = d.reference[M] + d.reference[P] - w[P] - d.floating[M], j = w[P] - d.reference[P], B = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(y));
      let V = B ? B[H] : 0;
      (!V || !await (f.isElement == null ? void 0 : f.isElement(B))) && (V = p.floating[H] || d.floating[M]);
      const K = O / 2 - j / 2, Y = V / 2 - k[M] / 2 - 1, X = An(b[L], Y), le = An(b[W], Y), re = X, ge = V - k[M] - le, he = V / 2 - k[M] / 2 + K, Ce = La(re, he, ge), fe = !g.arrow && Dr(u) != null && he !== Ce && d.reference[M] / 2 - (he < re ? X : le) - k[M] / 2 < 0, ue = fe ? he < re ? he - re : he - ge : 0;
      return {
        [P]: w[P] + ue,
        data: {
          [P]: Ce,
          centerOffset: he - Ce - ue,
          ...fe && {
            alignmentOffset: ue
          }
        },
        reset: fe
      };
    }
  }), gv = function(n) {
    return n === void 0 && (n = {}), {
      name: "flip",
      options: n,
      async fn(o) {
        var l, a;
        const { placement: u, middlewareData: d, rects: f, initialPlacement: p, platform: g, elements: y } = o, { mainAxis: _ = true, crossAxis: b = true, fallbackPlacements: w, fallbackStrategy: P = "bestFit", fallbackAxisSideDirection: M = "none", flipAlignment: k = true, ...R } = ln(n, o);
        if ((l = d.arrow) != null && l.alignmentOffset) return {};
        const L = sn(u), W = Ln(p), H = sn(p) === p, O = await (g.isRTL == null ? void 0 : g.isRTL(y.floating)), j = w || (H || !k ? [
          sl(p)
        ] : cv(p)), B = M !== "none";
        !w && B && j.push(...fv(p, k, M, O));
        const V = [
          p,
          ...j
        ], K = await Ao(o, R), Y = [];
        let X = ((a = d.flip) == null ? void 0 : a.overflows) || [];
        if (_ && Y.push(K[L]), b) {
          const he = uv(u, f, O);
          Y.push(K[he[0]], K[he[1]]);
        }
        if (X = [
          ...X,
          {
            placement: u,
            overflows: Y
          }
        ], !Y.every((he) => he <= 0)) {
          var le, re;
          const he = (((le = d.flip) == null ? void 0 : le.index) || 0) + 1, Ce = V[he];
          if (Ce) return {
            data: {
              index: he,
              overflows: X
            },
            reset: {
              placement: Ce
            }
          };
          let fe = (re = X.filter((ue) => ue.overflows[0] <= 0).sort((ue, D) => ue.overflows[1] - D.overflows[1])[0]) == null ? void 0 : re.placement;
          if (!fe) switch (P) {
            case "bestFit": {
              var ge;
              const ue = (ge = X.filter((D) => {
                if (B) {
                  const q = Ln(D.placement);
                  return q === W || q === "y";
                }
                return true;
              }).map((D) => [
                D.placement,
                D.overflows.filter((q) => q > 0).reduce((q, Q) => q + Q, 0)
              ]).sort((D, q) => D[1] - q[1])[0]) == null ? void 0 : ge[0];
              ue && (fe = ue);
              break;
            }
            case "initialPlacement":
              fe = p;
              break;
          }
          if (u !== fe) return {
            reset: {
              placement: fe
            }
          };
        }
        return {};
      }
    };
  };
  function Cf(n, o) {
    return {
      top: n.top - o.height,
      right: n.right - o.width,
      bottom: n.bottom - o.height,
      left: n.left - o.width
    };
  }
  function Pf(n) {
    return lv.some((o) => n[o] >= 0);
  }
  const yv = function(n) {
    return n === void 0 && (n = {}), {
      name: "hide",
      options: n,
      async fn(o) {
        const { rects: l } = o, { strategy: a = "referenceHidden", ...u } = ln(n, o);
        switch (a) {
          case "referenceHidden": {
            const d = await Ao(o, {
              ...u,
              elementContext: "reference"
            }), f = Cf(d, l.reference);
            return {
              data: {
                referenceHiddenOffsets: f,
                referenceHidden: Pf(f)
              }
            };
          }
          case "escaped": {
            const d = await Ao(o, {
              ...u,
              altBoundary: true
            }), f = Cf(d, l.floating);
            return {
              data: {
                escapedOffsets: f,
                escaped: Pf(f)
              }
            };
          }
          default:
            return {};
        }
      }
    };
  };
  async function vv(n, o) {
    const { placement: l, platform: a, elements: u } = n, d = await (a.isRTL == null ? void 0 : a.isRTL(u.floating)), f = sn(l), p = Dr(l), g = Ln(l) === "y", y = [
      "left",
      "top"
    ].includes(f) ? -1 : 1, _ = d && g ? -1 : 1, b = ln(o, n);
    let { mainAxis: w, crossAxis: P, alignmentAxis: M } = typeof b == "number" ? {
      mainAxis: b,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: b.mainAxis || 0,
      crossAxis: b.crossAxis || 0,
      alignmentAxis: b.alignmentAxis
    };
    return p && typeof M == "number" && (P = p === "end" ? M * -1 : M), g ? {
      x: P * _,
      y: w * y
    } : {
      x: w * y,
      y: P * _
    };
  }
  const _v = function(n) {
    return n === void 0 && (n = 0), {
      name: "offset",
      options: n,
      async fn(o) {
        var l, a;
        const { x: u, y: d, placement: f, middlewareData: p } = o, g = await vv(o, n);
        return f === ((l = p.offset) == null ? void 0 : l.placement) && (a = p.arrow) != null && a.alignmentOffset ? {} : {
          x: u + g.x,
          y: d + g.y,
          data: {
            ...g,
            placement: f
          }
        };
      }
    };
  }, wv = function(n) {
    return n === void 0 && (n = {}), {
      name: "shift",
      options: n,
      async fn(o) {
        const { x: l, y: a, placement: u } = o, { mainAxis: d = true, crossAxis: f = false, limiter: p = {
          fn: (R) => {
            let { x: L, y: W } = R;
            return {
              x: L,
              y: W
            };
          }
        }, ...g } = ln(n, o), y = {
          x: l,
          y: a
        }, _ = await Ao(o, g), b = Ln(sn(u)), w = Ga(b);
        let P = y[w], M = y[b];
        if (d) {
          const R = w === "y" ? "top" : "left", L = w === "y" ? "bottom" : "right", W = P + _[R], H = P - _[L];
          P = La(W, P, H);
        }
        if (f) {
          const R = b === "y" ? "top" : "left", L = b === "y" ? "bottom" : "right", W = M + _[R], H = M - _[L];
          M = La(W, M, H);
        }
        const k = p.fn({
          ...o,
          [w]: P,
          [b]: M
        });
        return {
          ...k,
          data: {
            x: k.x - l,
            y: k.y - a,
            enabled: {
              [w]: d,
              [b]: f
            }
          }
        };
      }
    };
  }, bv = function(n) {
    return n === void 0 && (n = {}), {
      options: n,
      fn(o) {
        const { x: l, y: a, placement: u, rects: d, middlewareData: f } = o, { offset: p = 0, mainAxis: g = true, crossAxis: y = true } = ln(n, o), _ = {
          x: l,
          y: a
        }, b = Ln(u), w = Ga(b);
        let P = _[w], M = _[b];
        const k = ln(p, o), R = typeof k == "number" ? {
          mainAxis: k,
          crossAxis: 0
        } : {
          mainAxis: 0,
          crossAxis: 0,
          ...k
        };
        if (g) {
          const H = w === "y" ? "height" : "width", O = d.reference[w] - d.floating[H] + R.mainAxis, j = d.reference[w] + d.reference[H] - R.mainAxis;
          P < O ? P = O : P > j && (P = j);
        }
        if (y) {
          var L, W;
          const H = w === "y" ? "width" : "height", O = [
            "top",
            "left"
          ].includes(sn(u)), j = d.reference[b] - d.floating[H] + (O && ((L = f.offset) == null ? void 0 : L[b]) || 0) + (O ? 0 : R.crossAxis), B = d.reference[b] + d.reference[H] + (O ? 0 : ((W = f.offset) == null ? void 0 : W[b]) || 0) - (O ? R.crossAxis : 0);
          M < j ? M = j : M > B && (M = B);
        }
        return {
          [w]: P,
          [b]: M
        };
      }
    };
  }, Sv = function(n) {
    return n === void 0 && (n = {}), {
      name: "size",
      options: n,
      async fn(o) {
        var l, a;
        const { placement: u, rects: d, platform: f, elements: p } = o, { apply: g = () => {
        }, ...y } = ln(n, o), _ = await Ao(o, y), b = sn(u), w = Dr(u), P = Ln(u) === "y", { width: M, height: k } = d.floating;
        let R, L;
        b === "top" || b === "bottom" ? (R = b, L = w === (await (f.isRTL == null ? void 0 : f.isRTL(p.floating)) ? "start" : "end") ? "left" : "right") : (L = b, R = w === "end" ? "top" : "bottom");
        const W = k - _.top - _.bottom, H = M - _.left - _.right, O = An(k - _[R], W), j = An(M - _[L], H), B = !o.middlewareData.shift;
        let V = O, K = j;
        if ((l = o.middlewareData.shift) != null && l.enabled.x && (K = H), (a = o.middlewareData.shift) != null && a.enabled.y && (V = W), B && !w) {
          const X = mt(_.left, 0), le = mt(_.right, 0), re = mt(_.top, 0), ge = mt(_.bottom, 0);
          P ? K = M - 2 * (X !== 0 || le !== 0 ? X + le : mt(_.left, _.right)) : V = k - 2 * (re !== 0 || ge !== 0 ? re + ge : mt(_.top, _.bottom));
        }
        await g({
          ...o,
          availableWidth: K,
          availableHeight: V
        });
        const Y = await f.getDimensions(p.floating);
        return M !== Y.width || k !== Y.height ? {
          reset: {
            rects: true
          }
        } : {};
      }
    };
  };
  function ml() {
    return typeof window < "u";
  }
  function Br(n) {
    return Pp(n) ? (n.nodeName || "").toLowerCase() : "#document";
  }
  function gt(n) {
    var o;
    return (n == null || (o = n.ownerDocument) == null ? void 0 : o.defaultView) || window;
  }
  function Qt(n) {
    var o;
    return (o = (Pp(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : o.documentElement;
  }
  function Pp(n) {
    return ml() ? n instanceof Node || n instanceof gt(n).Node : false;
  }
  function Lt(n) {
    return ml() ? n instanceof Element || n instanceof gt(n).Element : false;
  }
  function Gt(n) {
    return ml() ? n instanceof HTMLElement || n instanceof gt(n).HTMLElement : false;
  }
  function Ef(n) {
    return !ml() || typeof ShadowRoot > "u" ? false : n instanceof ShadowRoot || n instanceof gt(n).ShadowRoot;
  }
  function Oo(n) {
    const { overflow: o, overflowX: l, overflowY: a, display: u } = Ot(n);
    return /auto|scroll|overlay|hidden|clip/.test(o + a + l) && ![
      "inline",
      "contents"
    ].includes(u);
  }
  function xv(n) {
    return [
      "table",
      "td",
      "th"
    ].includes(Br(n));
  }
  function gl(n) {
    return [
      ":popover-open",
      ":modal"
    ].some((o) => {
      try {
        return n.matches(o);
      } catch {
        return false;
      }
    });
  }
  function Ya(n) {
    const o = qa(), l = Lt(n) ? Ot(n) : n;
    return [
      "transform",
      "translate",
      "scale",
      "rotate",
      "perspective"
    ].some((a) => l[a] ? l[a] !== "none" : false) || (l.containerType ? l.containerType !== "normal" : false) || !o && (l.backdropFilter ? l.backdropFilter !== "none" : false) || !o && (l.filter ? l.filter !== "none" : false) || [
      "transform",
      "translate",
      "scale",
      "rotate",
      "perspective",
      "filter"
    ].some((a) => (l.willChange || "").includes(a)) || [
      "paint",
      "layout",
      "strict",
      "content"
    ].some((a) => (l.contain || "").includes(a));
  }
  function kv(n) {
    let o = On(n);
    for (; Gt(o) && !Lr(o); ) {
      if (Ya(o)) return o;
      if (gl(o)) return null;
      o = On(o);
    }
    return null;
  }
  function qa() {
    return typeof CSS > "u" || !CSS.supports ? false : CSS.supports("-webkit-backdrop-filter", "none");
  }
  function Lr(n) {
    return [
      "html",
      "body",
      "#document"
    ].includes(Br(n));
  }
  function Ot(n) {
    return gt(n).getComputedStyle(n);
  }
  function yl(n) {
    return Lt(n) ? {
      scrollLeft: n.scrollLeft,
      scrollTop: n.scrollTop
    } : {
      scrollLeft: n.scrollX,
      scrollTop: n.scrollY
    };
  }
  function On(n) {
    if (Br(n) === "html") return n;
    const o = n.assignedSlot || n.parentNode || Ef(n) && n.host || Qt(n);
    return Ef(o) ? o.host : o;
  }
  function Ep(n) {
    const o = On(n);
    return Lr(o) ? n.ownerDocument ? n.ownerDocument.body : n.body : Gt(o) && Oo(o) ? o : Ep(o);
  }
  function Lo(n, o, l) {
    var a;
    o === void 0 && (o = []), l === void 0 && (l = true);
    const u = Ep(n), d = u === ((a = n.ownerDocument) == null ? void 0 : a.body), f = gt(u);
    if (d) {
      const p = ja(f);
      return o.concat(f, f.visualViewport || [], Oo(u) ? u : [], p && l ? Lo(p) : []);
    }
    return o.concat(u, Lo(u, [], l));
  }
  function ja(n) {
    return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
  }
  function Tp(n) {
    const o = Ot(n);
    let l = parseFloat(o.width) || 0, a = parseFloat(o.height) || 0;
    const u = Gt(n), d = u ? n.offsetWidth : l, f = u ? n.offsetHeight : a, p = ll(l) !== d || ll(a) !== f;
    return p && (l = d, a = f), {
      width: l,
      height: a,
      $: p
    };
  }
  function Xa(n) {
    return Lt(n) ? n : n.contextElement;
  }
  function Mr(n) {
    const o = Xa(n);
    if (!Gt(o)) return Vt(1);
    const l = o.getBoundingClientRect(), { width: a, height: u, $: d } = Tp(o);
    let f = (d ? ll(l.width) : l.width) / a, p = (d ? ll(l.height) : l.height) / u;
    return (!f || !Number.isFinite(f)) && (f = 1), (!p || !Number.isFinite(p)) && (p = 1), {
      x: f,
      y: p
    };
  }
  const Cv = Vt(0);
  function Rp(n) {
    const o = gt(n);
    return !qa() || !o.visualViewport ? Cv : {
      x: o.visualViewport.offsetLeft,
      y: o.visualViewport.offsetTop
    };
  }
  function Pv(n, o, l) {
    return o === void 0 && (o = false), !l || o && l !== gt(n) ? false : o;
  }
  function Jn(n, o, l, a) {
    o === void 0 && (o = false), l === void 0 && (l = false);
    const u = n.getBoundingClientRect(), d = Xa(n);
    let f = Vt(1);
    o && (a ? Lt(a) && (f = Mr(a)) : f = Mr(n));
    const p = Pv(d, l, a) ? Rp(d) : Vt(0);
    let g = (u.left + p.x) / f.x, y = (u.top + p.y) / f.y, _ = u.width / f.x, b = u.height / f.y;
    if (d) {
      const w = gt(d), P = a && Lt(a) ? gt(a) : a;
      let M = w, k = ja(M);
      for (; k && a && P !== M; ) {
        const R = Mr(k), L = k.getBoundingClientRect(), W = Ot(k), H = L.left + (k.clientLeft + parseFloat(W.paddingLeft)) * R.x, O = L.top + (k.clientTop + parseFloat(W.paddingTop)) * R.y;
        g *= R.x, y *= R.y, _ *= R.x, b *= R.y, g += H, y += O, M = gt(k), k = ja(M);
      }
    }
    return al({
      width: _,
      height: b,
      x: g,
      y
    });
  }
  function Ja(n, o) {
    const l = yl(n).scrollLeft;
    return o ? o.left + l : Jn(Qt(n)).left + l;
  }
  function Mp(n, o, l) {
    l === void 0 && (l = false);
    const a = n.getBoundingClientRect(), u = a.left + o.scrollLeft - (l ? 0 : Ja(n, a)), d = a.top + o.scrollTop;
    return {
      x: u,
      y: d
    };
  }
  function Ev(n) {
    let { elements: o, rect: l, offsetParent: a, strategy: u } = n;
    const d = u === "fixed", f = Qt(a), p = o ? gl(o.floating) : false;
    if (a === f || p && d) return l;
    let g = {
      scrollLeft: 0,
      scrollTop: 0
    }, y = Vt(1);
    const _ = Vt(0), b = Gt(a);
    if ((b || !b && !d) && ((Br(a) !== "body" || Oo(f)) && (g = yl(a)), Gt(a))) {
      const P = Jn(a);
      y = Mr(a), _.x = P.x + a.clientLeft, _.y = P.y + a.clientTop;
    }
    const w = f && !b && !d ? Mp(f, g, true) : Vt(0);
    return {
      width: l.width * y.x,
      height: l.height * y.y,
      x: l.x * y.x - g.scrollLeft * y.x + _.x + w.x,
      y: l.y * y.y - g.scrollTop * y.y + _.y + w.y
    };
  }
  function Tv(n) {
    return Array.from(n.getClientRects());
  }
  function Rv(n) {
    const o = Qt(n), l = yl(n), a = n.ownerDocument.body, u = mt(o.scrollWidth, o.clientWidth, a.scrollWidth, a.clientWidth), d = mt(o.scrollHeight, o.clientHeight, a.scrollHeight, a.clientHeight);
    let f = -l.scrollLeft + Ja(n);
    const p = -l.scrollTop;
    return Ot(a).direction === "rtl" && (f += mt(o.clientWidth, a.clientWidth) - u), {
      width: u,
      height: d,
      x: f,
      y: p
    };
  }
  function Mv(n, o) {
    const l = gt(n), a = Qt(n), u = l.visualViewport;
    let d = a.clientWidth, f = a.clientHeight, p = 0, g = 0;
    if (u) {
      d = u.width, f = u.height;
      const y = qa();
      (!y || y && o === "fixed") && (p = u.offsetLeft, g = u.offsetTop);
    }
    return {
      width: d,
      height: f,
      x: p,
      y: g
    };
  }
  function Nv(n, o) {
    const l = Jn(n, true, o === "fixed"), a = l.top + n.clientTop, u = l.left + n.clientLeft, d = Gt(n) ? Mr(n) : Vt(1), f = n.clientWidth * d.x, p = n.clientHeight * d.y, g = u * d.x, y = a * d.y;
    return {
      width: f,
      height: p,
      x: g,
      y
    };
  }
  function Tf(n, o, l) {
    let a;
    if (o === "viewport") a = Mv(n, l);
    else if (o === "document") a = Rv(Qt(n));
    else if (Lt(o)) a = Nv(o, l);
    else {
      const u = Rp(n);
      a = {
        x: o.x - u.x,
        y: o.y - u.y,
        width: o.width,
        height: o.height
      };
    }
    return al(a);
  }
  function Np(n, o) {
    const l = On(n);
    return l === o || !Lt(l) || Lr(l) ? false : Ot(l).position === "fixed" || Np(l, o);
  }
  function Av(n, o) {
    const l = o.get(n);
    if (l) return l;
    let a = Lo(n, [], false).filter((p) => Lt(p) && Br(p) !== "body"), u = null;
    const d = Ot(n).position === "fixed";
    let f = d ? On(n) : n;
    for (; Lt(f) && !Lr(f); ) {
      const p = Ot(f), g = Ya(f);
      !g && p.position === "fixed" && (u = null), (d ? !g && !u : !g && p.position === "static" && !!u && [
        "absolute",
        "fixed"
      ].includes(u.position) || Oo(f) && !g && Np(n, f)) ? a = a.filter((_) => _ !== f) : u = p, f = On(f);
    }
    return o.set(n, a), a;
  }
  function Lv(n) {
    let { element: o, boundary: l, rootBoundary: a, strategy: u } = n;
    const f = [
      ...l === "clippingAncestors" ? gl(o) ? [] : Av(o, this._c) : [].concat(l),
      a
    ], p = f[0], g = f.reduce((y, _) => {
      const b = Tf(o, _, u);
      return y.top = mt(b.top, y.top), y.right = An(b.right, y.right), y.bottom = An(b.bottom, y.bottom), y.left = mt(b.left, y.left), y;
    }, Tf(o, p, u));
    return {
      width: g.right - g.left,
      height: g.bottom - g.top,
      x: g.left,
      y: g.top
    };
  }
  function Ov(n) {
    const { width: o, height: l } = Tp(n);
    return {
      width: o,
      height: l
    };
  }
  function jv(n, o, l) {
    const a = Gt(o), u = Qt(o), d = l === "fixed", f = Jn(n, true, d, o);
    let p = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const g = Vt(0);
    if (a || !a && !d) if ((Br(o) !== "body" || Oo(u)) && (p = yl(o)), a) {
      const w = Jn(o, true, d, o);
      g.x = w.x + o.clientLeft, g.y = w.y + o.clientTop;
    } else u && (g.x = Ja(u));
    const y = u && !a && !d ? Mp(u, p) : Vt(0), _ = f.left + p.scrollLeft - g.x - y.x, b = f.top + p.scrollTop - g.y - y.y;
    return {
      x: _,
      y: b,
      width: f.width,
      height: f.height
    };
  }
  function xa(n) {
    return Ot(n).position === "static";
  }
  function Rf(n, o) {
    if (!Gt(n) || Ot(n).position === "fixed") return null;
    if (o) return o(n);
    let l = n.offsetParent;
    return Qt(n) === l && (l = l.ownerDocument.body), l;
  }
  function Ap(n, o) {
    const l = gt(n);
    if (gl(n)) return l;
    if (!Gt(n)) {
      let u = On(n);
      for (; u && !Lr(u); ) {
        if (Lt(u) && !xa(u)) return u;
        u = On(u);
      }
      return l;
    }
    let a = Rf(n, o);
    for (; a && xv(a) && xa(a); ) a = Rf(a, o);
    return a && Lr(a) && xa(a) && !Ya(a) ? l : a || kv(n) || l;
  }
  const Dv = async function(n) {
    const o = this.getOffsetParent || Ap, l = this.getDimensions, a = await l(n.floating);
    return {
      reference: jv(n.reference, await o(n.floating), n.strategy),
      floating: {
        x: 0,
        y: 0,
        width: a.width,
        height: a.height
      }
    };
  };
  function Bv(n) {
    return Ot(n).direction === "rtl";
  }
  const Fv = {
    convertOffsetParentRelativeRectToViewportRelativeRect: Ev,
    getDocumentElement: Qt,
    getClippingRect: Lv,
    getOffsetParent: Ap,
    getElementRects: Dv,
    getClientRects: Tv,
    getDimensions: Ov,
    getScale: Mr,
    isElement: Lt,
    isRTL: Bv
  };
  function Lp(n, o) {
    return n.x === o.x && n.y === o.y && n.width === o.width && n.height === o.height;
  }
  function zv(n, o) {
    let l = null, a;
    const u = Qt(n);
    function d() {
      var p;
      clearTimeout(a), (p = l) == null || p.disconnect(), l = null;
    }
    function f(p, g) {
      p === void 0 && (p = false), g === void 0 && (g = 1), d();
      const y = n.getBoundingClientRect(), { left: _, top: b, width: w, height: P } = y;
      if (p || o(), !w || !P) return;
      const M = Ki(b), k = Ki(u.clientWidth - (_ + w)), R = Ki(u.clientHeight - (b + P)), L = Ki(_), H = {
        rootMargin: -M + "px " + -k + "px " + -R + "px " + -L + "px",
        threshold: mt(0, An(1, g)) || 1
      };
      let O = true;
      function j(B) {
        const V = B[0].intersectionRatio;
        if (V !== g) {
          if (!O) return f();
          V ? f(false, V) : a = setTimeout(() => {
            f(false, 1e-7);
          }, 1e3);
        }
        V === 1 && !Lp(y, n.getBoundingClientRect()) && f(), O = false;
      }
      try {
        l = new IntersectionObserver(j, {
          ...H,
          root: u.ownerDocument
        });
      } catch {
        l = new IntersectionObserver(j, H);
      }
      l.observe(n);
    }
    return f(true), d;
  }
  function Iv(n, o, l, a) {
    a === void 0 && (a = {});
    const { ancestorScroll: u = true, ancestorResize: d = true, elementResize: f = typeof ResizeObserver == "function", layoutShift: p = typeof IntersectionObserver == "function", animationFrame: g = false } = a, y = Xa(n), _ = u || d ? [
      ...y ? Lo(y) : [],
      ...Lo(o)
    ] : [];
    _.forEach((L) => {
      u && L.addEventListener("scroll", l, {
        passive: true
      }), d && L.addEventListener("resize", l);
    });
    const b = y && p ? zv(y, l) : null;
    let w = -1, P = null;
    f && (P = new ResizeObserver((L) => {
      let [W] = L;
      W && W.target === y && P && (P.unobserve(o), cancelAnimationFrame(w), w = requestAnimationFrame(() => {
        var H;
        (H = P) == null || H.observe(o);
      })), l();
    }), y && !g && P.observe(y), P.observe(o));
    let M, k = g ? Jn(n) : null;
    g && R();
    function R() {
      const L = Jn(n);
      k && !Lp(k, L) && l(), k = L, M = requestAnimationFrame(R);
    }
    return l(), () => {
      var L;
      _.forEach((W) => {
        u && W.removeEventListener("scroll", l), d && W.removeEventListener("resize", l);
      }), b == null ? void 0 : b(), (L = P) == null || L.disconnect(), P = null, g && cancelAnimationFrame(M);
    };
  }
  const Wv = _v, Hv = wv, Uv = gv, Vv = Sv, $v = yv, Mf = mv, Gv = bv, Kv = (n, o, l) => {
    const a = /* @__PURE__ */ new Map(), u = {
      platform: Fv,
      ...l
    }, d = {
      ...u.platform,
      _c: a
    };
    return hv(n, o, {
      ...u,
      platform: d
    });
  };
  var Zi = typeof document < "u" ? m.useLayoutEffect : m.useEffect;
  function ul(n, o) {
    if (n === o) return true;
    if (typeof n != typeof o) return false;
    if (typeof n == "function" && n.toString() === o.toString()) return true;
    let l, a, u;
    if (n && o && typeof n == "object") {
      if (Array.isArray(n)) {
        if (l = n.length, l !== o.length) return false;
        for (a = l; a-- !== 0; ) if (!ul(n[a], o[a])) return false;
        return true;
      }
      if (u = Object.keys(n), l = u.length, l !== Object.keys(o).length) return false;
      for (a = l; a-- !== 0; ) if (!{}.hasOwnProperty.call(o, u[a])) return false;
      for (a = l; a-- !== 0; ) {
        const d = u[a];
        if (!(d === "_owner" && n.$$typeof) && !ul(n[d], o[d])) return false;
      }
      return true;
    }
    return n !== n && o !== o;
  }
  function Op(n) {
    return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
  }
  function Nf(n, o) {
    const l = Op(n);
    return Math.round(o * l) / l;
  }
  function ka(n) {
    const o = m.useRef(n);
    return Zi(() => {
      o.current = n;
    }), o;
  }
  function Qv(n) {
    n === void 0 && (n = {});
    const { placement: o = "bottom", strategy: l = "absolute", middleware: a = [], platform: u, elements: { reference: d, floating: f } = {}, transform: p = true, whileElementsMounted: g, open: y } = n, [_, b] = m.useState({
      x: 0,
      y: 0,
      strategy: l,
      placement: o,
      middlewareData: {},
      isPositioned: false
    }), [w, P] = m.useState(a);
    ul(w, a) || P(a);
    const [M, k] = m.useState(null), [R, L] = m.useState(null), W = m.useCallback((D) => {
      D !== B.current && (B.current = D, k(D));
    }, []), H = m.useCallback((D) => {
      D !== V.current && (V.current = D, L(D));
    }, []), O = d || M, j = f || R, B = m.useRef(null), V = m.useRef(null), K = m.useRef(_), Y = g != null, X = ka(g), le = ka(u), re = ka(y), ge = m.useCallback(() => {
      if (!B.current || !V.current) return;
      const D = {
        placement: o,
        strategy: l,
        middleware: w
      };
      le.current && (D.platform = le.current), Kv(B.current, V.current, D).then((q) => {
        const Q = {
          ...q,
          isPositioned: re.current !== false
        };
        he.current && !ul(K.current, Q) && (K.current = Q, Wa.flushSync(() => {
          b(Q);
        }));
      });
    }, [
      w,
      o,
      l,
      le,
      re
    ]);
    Zi(() => {
      y === false && K.current.isPositioned && (K.current.isPositioned = false, b((D) => ({
        ...D,
        isPositioned: false
      })));
    }, [
      y
    ]);
    const he = m.useRef(false);
    Zi(() => (he.current = true, () => {
      he.current = false;
    }), []), Zi(() => {
      if (O && (B.current = O), j && (V.current = j), O && j) {
        if (X.current) return X.current(O, j, ge);
        ge();
      }
    }, [
      O,
      j,
      ge,
      X,
      Y
    ]);
    const Ce = m.useMemo(() => ({
      reference: B,
      floating: V,
      setReference: W,
      setFloating: H
    }), [
      W,
      H
    ]), fe = m.useMemo(() => ({
      reference: O,
      floating: j
    }), [
      O,
      j
    ]), ue = m.useMemo(() => {
      const D = {
        position: l,
        left: 0,
        top: 0
      };
      if (!fe.floating) return D;
      const q = Nf(fe.floating, _.x), Q = Nf(fe.floating, _.y);
      return p ? {
        ...D,
        transform: "translate(" + q + "px, " + Q + "px)",
        ...Op(fe.floating) >= 1.5 && {
          willChange: "transform"
        }
      } : {
        position: l,
        left: q,
        top: Q
      };
    }, [
      l,
      p,
      fe.floating,
      _.x,
      _.y
    ]);
    return m.useMemo(() => ({
      ..._,
      update: ge,
      refs: Ce,
      elements: fe,
      floatingStyles: ue
    }), [
      _,
      ge,
      Ce,
      fe,
      ue
    ]);
  }
  const Yv = (n) => {
    function o(l) {
      return {}.hasOwnProperty.call(l, "current");
    }
    return {
      name: "arrow",
      options: n,
      fn(l) {
        const { element: a, padding: u } = typeof n == "function" ? n(l) : n;
        return a && o(a) ? a.current != null ? Mf({
          element: a.current,
          padding: u
        }).fn(l) : {} : a ? Mf({
          element: a,
          padding: u
        }).fn(l) : {};
      }
    };
  }, qv = (n, o) => ({
    ...Wv(n),
    options: [
      n,
      o
    ]
  }), Xv = (n, o) => ({
    ...Hv(n),
    options: [
      n,
      o
    ]
  }), Jv = (n, o) => ({
    ...Gv(n),
    options: [
      n,
      o
    ]
  }), Zv = (n, o) => ({
    ...Uv(n),
    options: [
      n,
      o
    ]
  }), e_ = (n, o) => ({
    ...Vv(n),
    options: [
      n,
      o
    ]
  }), t_ = (n, o) => ({
    ...$v(n),
    options: [
      n,
      o
    ]
  }), n_ = (n, o) => ({
    ...Yv(n),
    options: [
      n,
      o
    ]
  });
  var r_ = "Arrow", jp = m.forwardRef((n, o) => {
    const { children: l, width: a = 10, height: u = 5, ...d } = n;
    return x.jsx(Ze.svg, {
      ...d,
      ref: o,
      width: a,
      height: u,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: n.asChild ? l : x.jsx("polygon", {
        points: "0,0 30,0 15,10"
      })
    });
  });
  jp.displayName = r_;
  var o_ = jp;
  function Dp(n) {
    const [o, l] = m.useState(void 0);
    return Nn(() => {
      if (n) {
        l({
          width: n.offsetWidth,
          height: n.offsetHeight
        });
        const a = new ResizeObserver((u) => {
          if (!Array.isArray(u) || !u.length) return;
          const d = u[0];
          let f, p;
          if ("borderBoxSize" in d) {
            const g = d.borderBoxSize, y = Array.isArray(g) ? g[0] : g;
            f = y.inlineSize, p = y.blockSize;
          } else f = n.offsetWidth, p = n.offsetHeight;
          l({
            width: f,
            height: p
          });
        });
        return a.observe(n, {
          box: "border-box"
        }), () => a.unobserve(n);
      } else l(void 0);
    }, [
      n
    ]), o;
  }
  var Za = "Popper", [Bp, Fp] = fl(Za), [i_, zp] = Bp(Za), Ip = (n) => {
    const { __scopePopper: o, children: l } = n, [a, u] = m.useState(null);
    return x.jsx(i_, {
      scope: o,
      anchor: a,
      onAnchorChange: u,
      children: l
    });
  };
  Ip.displayName = Za;
  var Wp = "PopperAnchor", Hp = m.forwardRef((n, o) => {
    const { __scopePopper: l, virtualRef: a, ...u } = n, d = zp(Wp, l), f = m.useRef(null), p = ot(o, f);
    return m.useEffect(() => {
      d.onAnchorChange((a == null ? void 0 : a.current) || f.current);
    }), a ? null : x.jsx(Ze.div, {
      ...u,
      ref: p
    });
  });
  Hp.displayName = Wp;
  var eu = "PopperContent", [l_, s_] = Bp(eu), Up = m.forwardRef((n, o) => {
    var _a2, _b2, _c, _d, _e, _f2;
    const { __scopePopper: l, side: a = "bottom", sideOffset: u = 0, align: d = "center", alignOffset: f = 0, arrowPadding: p = 0, avoidCollisions: g = true, collisionBoundary: y = [], collisionPadding: _ = 0, sticky: b = "partial", hideWhenDetached: w = false, updatePositionStrategy: P = "optimized", onPlaced: M, ...k } = n, R = zp(eu, l), [L, W] = m.useState(null), H = ot(o, (be) => W(be)), [O, j] = m.useState(null), B = Dp(O), V = (B == null ? void 0 : B.width) ?? 0, K = (B == null ? void 0 : B.height) ?? 0, Y = a + (d !== "center" ? "-" + d : ""), X = typeof _ == "number" ? _ : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ..._
    }, le = Array.isArray(y) ? y : [
      y
    ], re = le.length > 0, ge = {
      padding: X,
      boundary: le.filter(u_),
      altBoundary: re
    }, { refs: he, floatingStyles: Ce, placement: fe, isPositioned: ue, middlewareData: D } = Qv({
      strategy: "fixed",
      placement: Y,
      whileElementsMounted: (...be) => Iv(...be, {
        animationFrame: P === "always"
      }),
      elements: {
        reference: R.anchor
      },
      middleware: [
        qv({
          mainAxis: u + K,
          alignmentAxis: f
        }),
        g && Xv({
          mainAxis: true,
          crossAxis: false,
          limiter: b === "partial" ? Jv() : void 0,
          ...ge
        }),
        g && Zv({
          ...ge
        }),
        e_({
          ...ge,
          apply: ({ elements: be, rects: Se, availableWidth: Pe, availableHeight: et }) => {
            const { width: Zn, height: Do } = Se.reference, Yt = be.floating.style;
            Yt.setProperty("--radix-popper-available-width", `${Pe}px`), Yt.setProperty("--radix-popper-available-height", `${et}px`), Yt.setProperty("--radix-popper-anchor-width", `${Zn}px`), Yt.setProperty("--radix-popper-anchor-height", `${Do}px`);
          }
        }),
        O && n_({
          element: O,
          padding: p
        }),
        c_({
          arrowWidth: V,
          arrowHeight: K
        }),
        w && t_({
          strategy: "referenceHidden",
          ...ge
        })
      ]
    }), [q, Q] = Gp(fe), E = rt(M);
    Nn(() => {
      ue && (E == null ? void 0 : E());
    }, [
      ue,
      E
    ]);
    const F = (_a2 = D.arrow) == null ? void 0 : _a2.x, ce = (_b2 = D.arrow) == null ? void 0 : _b2.y, pe = ((_c = D.arrow) == null ? void 0 : _c.centerOffset) !== 0, [ye, ve] = m.useState();
    return Nn(() => {
      L && ve(window.getComputedStyle(L).zIndex);
    }, [
      L
    ]), x.jsx("div", {
      ref: he.setFloating,
      "data-radix-popper-content-wrapper": "",
      style: {
        ...Ce,
        transform: ue ? Ce.transform : "translate(0, -200%)",
        minWidth: "max-content",
        zIndex: ye,
        "--radix-popper-transform-origin": [
          (_d = D.transformOrigin) == null ? void 0 : _d.x,
          (_e = D.transformOrigin) == null ? void 0 : _e.y
        ].join(" "),
        ...((_f2 = D.hide) == null ? void 0 : _f2.referenceHidden) && {
          visibility: "hidden",
          pointerEvents: "none"
        }
      },
      dir: n.dir,
      children: x.jsx(l_, {
        scope: l,
        placedSide: q,
        onArrowChange: j,
        arrowX: F,
        arrowY: ce,
        shouldHideArrow: pe,
        children: x.jsx(Ze.div, {
          "data-side": q,
          "data-align": Q,
          ...k,
          ref: H,
          style: {
            ...k.style,
            animation: ue ? void 0 : "none"
          }
        })
      })
    });
  });
  Up.displayName = eu;
  var Vp = "PopperArrow", a_ = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }, $p = m.forwardRef(function(o, l) {
    const { __scopePopper: a, ...u } = o, d = s_(Vp, a), f = a_[d.placedSide];
    return x.jsx("span", {
      ref: d.onArrowChange,
      style: {
        position: "absolute",
        left: d.arrowX,
        top: d.arrowY,
        [f]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0"
        }[d.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)"
        }[d.placedSide],
        visibility: d.shouldHideArrow ? "hidden" : void 0
      },
      children: x.jsx(o_, {
        ...u,
        ref: l,
        style: {
          ...u.style,
          display: "block"
        }
      })
    });
  });
  $p.displayName = Vp;
  function u_(n) {
    return n !== null;
  }
  var c_ = (n) => ({
    name: "transformOrigin",
    options: n,
    fn(o) {
      var _a2, _b2, _c;
      const { placement: l, rects: a, middlewareData: u } = o, f = ((_a2 = u.arrow) == null ? void 0 : _a2.centerOffset) !== 0, p = f ? 0 : n.arrowWidth, g = f ? 0 : n.arrowHeight, [y, _] = Gp(l), b = {
        start: "0%",
        center: "50%",
        end: "100%"
      }[_], w = (((_b2 = u.arrow) == null ? void 0 : _b2.x) ?? 0) + p / 2, P = (((_c = u.arrow) == null ? void 0 : _c.y) ?? 0) + g / 2;
      let M = "", k = "";
      return y === "bottom" ? (M = f ? b : `${w}px`, k = `${-g}px`) : y === "top" ? (M = f ? b : `${w}px`, k = `${a.floating.height + g}px`) : y === "right" ? (M = `${-g}px`, k = f ? b : `${P}px`) : y === "left" && (M = `${a.floating.width + g}px`, k = f ? b : `${P}px`), {
        data: {
          x: M,
          y: k
        }
      };
    }
  });
  function Gp(n) {
    const [o, l = "center"] = n.split("-");
    return [
      o,
      l
    ];
  }
  var d_ = Ip, Kp = Hp, f_ = Up, p_ = $p, h_ = "Portal", Qp = m.forwardRef((n, o) => {
    var _a2;
    const { container: l, ...a } = n, [u, d] = m.useState(false);
    Nn(() => d(true), []);
    const f = l || u && ((_a2 = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a2.body);
    return f ? vy.createPortal(x.jsx(Ze.div, {
      ...a,
      ref: o
    }), f) : null;
  });
  Qp.displayName = h_;
  function Yp({ prop: n, defaultProp: o, onChange: l = () => {
  } }) {
    const [a, u] = m_({
      defaultProp: o,
      onChange: l
    }), d = n !== void 0, f = d ? n : a, p = rt(l), g = m.useCallback((y) => {
      if (d) {
        const b = typeof y == "function" ? y(n) : y;
        b !== n && p(b);
      } else u(y);
    }, [
      d,
      n,
      u,
      p
    ]);
    return [
      f,
      g
    ];
  }
  function m_({ defaultProp: n, onChange: o }) {
    const l = m.useState(n), [a] = l, u = m.useRef(a), d = rt(o);
    return m.useEffect(() => {
      u.current !== a && (d(a), u.current = a);
    }, [
      a,
      u,
      d
    ]), l;
  }
  var g_ = function(n) {
    if (typeof document > "u") return null;
    var o = Array.isArray(n) ? n[0] : n;
    return o.ownerDocument.body;
  }, Cr = /* @__PURE__ */ new WeakMap(), Qi = /* @__PURE__ */ new WeakMap(), Yi = {}, Ca = 0, qp = function(n) {
    return n && (n.host || qp(n.parentNode));
  }, y_ = function(n, o) {
    return o.map(function(l) {
      if (n.contains(l)) return l;
      var a = qp(l);
      return a && n.contains(a) ? a : (console.error("aria-hidden", l, "in not contained inside", n, ". Doing nothing"), null);
    }).filter(function(l) {
      return !!l;
    });
  }, v_ = function(n, o, l, a) {
    var u = y_(o, Array.isArray(n) ? n : [
      n
    ]);
    Yi[l] || (Yi[l] = /* @__PURE__ */ new WeakMap());
    var d = Yi[l], f = [], p = /* @__PURE__ */ new Set(), g = new Set(u), y = function(b) {
      !b || p.has(b) || (p.add(b), y(b.parentNode));
    };
    u.forEach(y);
    var _ = function(b) {
      !b || g.has(b) || Array.prototype.forEach.call(b.children, function(w) {
        if (p.has(w)) _(w);
        else try {
          var P = w.getAttribute(a), M = P !== null && P !== "false", k = (Cr.get(w) || 0) + 1, R = (d.get(w) || 0) + 1;
          Cr.set(w, k), d.set(w, R), f.push(w), k === 1 && M && Qi.set(w, true), R === 1 && w.setAttribute(l, "true"), M || w.setAttribute(a, "true");
        } catch (L) {
          console.error("aria-hidden: cannot operate on ", w, L);
        }
      });
    };
    return _(o), p.clear(), Ca++, function() {
      f.forEach(function(b) {
        var w = Cr.get(b) - 1, P = d.get(b) - 1;
        Cr.set(b, w), d.set(b, P), w || (Qi.has(b) || b.removeAttribute(a), Qi.delete(b)), P || b.removeAttribute(l);
      }), Ca--, Ca || (Cr = /* @__PURE__ */ new WeakMap(), Cr = /* @__PURE__ */ new WeakMap(), Qi = /* @__PURE__ */ new WeakMap(), Yi = {});
    };
  }, __ = function(n, o, l) {
    l === void 0 && (l = "data-aria-hidden");
    var a = Array.from(Array.isArray(n) ? n : [
      n
    ]), u = g_(n);
    return u ? (a.push.apply(a, Array.from(u.querySelectorAll("[aria-live]"))), v_(a, u, l, "aria-hidden")) : function() {
      return null;
    };
  }, Ht = function() {
    return Ht = Object.assign || function(o) {
      for (var l, a = 1, u = arguments.length; a < u; a++) {
        l = arguments[a];
        for (var d in l) Object.prototype.hasOwnProperty.call(l, d) && (o[d] = l[d]);
      }
      return o;
    }, Ht.apply(this, arguments);
  };
  function Xp(n, o) {
    var l = {};
    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && o.indexOf(a) < 0 && (l[a] = n[a]);
    if (n != null && typeof Object.getOwnPropertySymbols == "function") for (var u = 0, a = Object.getOwnPropertySymbols(n); u < a.length; u++) o.indexOf(a[u]) < 0 && Object.prototype.propertyIsEnumerable.call(n, a[u]) && (l[a[u]] = n[a[u]]);
    return l;
  }
  function w_(n, o, l) {
    if (l || arguments.length === 2) for (var a = 0, u = o.length, d; a < u; a++) (d || !(a in o)) && (d || (d = Array.prototype.slice.call(o, 0, a)), d[a] = o[a]);
    return n.concat(d || Array.prototype.slice.call(o));
  }
  var el = "right-scroll-bar-position", tl = "width-before-scroll-bar", b_ = "with-scroll-bars-hidden", S_ = "--removed-body-scroll-bar-size";
  function Pa(n, o) {
    return typeof n == "function" ? n(o) : n && (n.current = o), n;
  }
  function x_(n, o) {
    var l = m.useState(function() {
      return {
        value: n,
        callback: o,
        facade: {
          get current() {
            return l.value;
          },
          set current(a) {
            var u = l.value;
            u !== a && (l.value = a, l.callback(a, u));
          }
        }
      };
    })[0];
    return l.callback = o, l.facade;
  }
  var k_ = typeof window < "u" ? m.useLayoutEffect : m.useEffect, Af = /* @__PURE__ */ new WeakMap();
  function C_(n, o) {
    var l = x_(null, function(a) {
      return n.forEach(function(u) {
        return Pa(u, a);
      });
    });
    return k_(function() {
      var a = Af.get(l);
      if (a) {
        var u = new Set(a), d = new Set(n), f = l.current;
        u.forEach(function(p) {
          d.has(p) || Pa(p, null);
        }), d.forEach(function(p) {
          u.has(p) || Pa(p, f);
        });
      }
      Af.set(l, n);
    }, [
      n
    ]), l;
  }
  function P_(n) {
    return n;
  }
  function E_(n, o) {
    o === void 0 && (o = P_);
    var l = [], a = false, u = {
      read: function() {
        if (a) throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
        return l.length ? l[l.length - 1] : n;
      },
      useMedium: function(d) {
        var f = o(d, a);
        return l.push(f), function() {
          l = l.filter(function(p) {
            return p !== f;
          });
        };
      },
      assignSyncMedium: function(d) {
        for (a = true; l.length; ) {
          var f = l;
          l = [], f.forEach(d);
        }
        l = {
          push: function(p) {
            return d(p);
          },
          filter: function() {
            return l;
          }
        };
      },
      assignMedium: function(d) {
        a = true;
        var f = [];
        if (l.length) {
          var p = l;
          l = [], p.forEach(d), f = l;
        }
        var g = function() {
          var _ = f;
          f = [], _.forEach(d);
        }, y = function() {
          return Promise.resolve().then(g);
        };
        y(), l = {
          push: function(_) {
            f.push(_), y();
          },
          filter: function(_) {
            return f = f.filter(_), l;
          }
        };
      }
    };
    return u;
  }
  function T_(n) {
    n === void 0 && (n = {});
    var o = E_(null);
    return o.options = Ht({
      async: true,
      ssr: false
    }, n), o;
  }
  var Jp = function(n) {
    var o = n.sideCar, l = Xp(n, [
      "sideCar"
    ]);
    if (!o) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
    var a = o.read();
    if (!a) throw new Error("Sidecar medium not found");
    return m.createElement(a, Ht({}, l));
  };
  Jp.isSideCarExport = true;
  function R_(n, o) {
    return n.useMedium(o), Jp;
  }
  var Zp = T_(), Ea = function() {
  }, vl = m.forwardRef(function(n, o) {
    var l = m.useRef(null), a = m.useState({
      onScrollCapture: Ea,
      onWheelCapture: Ea,
      onTouchMoveCapture: Ea
    }), u = a[0], d = a[1], f = n.forwardProps, p = n.children, g = n.className, y = n.removeScrollBar, _ = n.enabled, b = n.shards, w = n.sideCar, P = n.noIsolation, M = n.inert, k = n.allowPinchZoom, R = n.as, L = R === void 0 ? "div" : R, W = n.gapMode, H = Xp(n, [
      "forwardProps",
      "children",
      "className",
      "removeScrollBar",
      "enabled",
      "shards",
      "sideCar",
      "noIsolation",
      "inert",
      "allowPinchZoom",
      "as",
      "gapMode"
    ]), O = w, j = C_([
      l,
      o
    ]), B = Ht(Ht({}, H), u);
    return m.createElement(m.Fragment, null, _ && m.createElement(O, {
      sideCar: Zp,
      removeScrollBar: y,
      shards: b,
      noIsolation: P,
      inert: M,
      setCallbacks: d,
      allowPinchZoom: !!k,
      lockRef: l,
      gapMode: W
    }), f ? m.cloneElement(m.Children.only(p), Ht(Ht({}, B), {
      ref: j
    })) : m.createElement(L, Ht({}, B, {
      className: g,
      ref: j
    }), p));
  });
  vl.defaultProps = {
    enabled: true,
    removeScrollBar: true,
    inert: false
  };
  vl.classNames = {
    fullWidth: tl,
    zeroRight: el
  };
  var M_ = function() {
    if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
  };
  function N_() {
    if (!document) return null;
    var n = document.createElement("style");
    n.type = "text/css";
    var o = M_();
    return o && n.setAttribute("nonce", o), n;
  }
  function A_(n, o) {
    n.styleSheet ? n.styleSheet.cssText = o : n.appendChild(document.createTextNode(o));
  }
  function L_(n) {
    var o = document.head || document.getElementsByTagName("head")[0];
    o.appendChild(n);
  }
  var O_ = function() {
    var n = 0, o = null;
    return {
      add: function(l) {
        n == 0 && (o = N_()) && (A_(o, l), L_(o)), n++;
      },
      remove: function() {
        n--, !n && o && (o.parentNode && o.parentNode.removeChild(o), o = null);
      }
    };
  }, j_ = function() {
    var n = O_();
    return function(o, l) {
      m.useEffect(function() {
        return n.add(o), function() {
          n.remove();
        };
      }, [
        o && l
      ]);
    };
  }, eh = function() {
    var n = j_(), o = function(l) {
      var a = l.styles, u = l.dynamic;
      return n(a, u), null;
    };
    return o;
  }, D_ = {
    left: 0,
    top: 0,
    right: 0,
    gap: 0
  }, Ta = function(n) {
    return parseInt(n || "", 10) || 0;
  }, B_ = function(n) {
    var o = window.getComputedStyle(document.body), l = o[n === "padding" ? "paddingLeft" : "marginLeft"], a = o[n === "padding" ? "paddingTop" : "marginTop"], u = o[n === "padding" ? "paddingRight" : "marginRight"];
    return [
      Ta(l),
      Ta(a),
      Ta(u)
    ];
  }, F_ = function(n) {
    if (n === void 0 && (n = "margin"), typeof window > "u") return D_;
    var o = B_(n), l = document.documentElement.clientWidth, a = window.innerWidth;
    return {
      left: o[0],
      top: o[1],
      right: o[2],
      gap: Math.max(0, a - l + o[2] - o[0])
    };
  }, z_ = eh(), Nr = "data-scroll-locked", I_ = function(n, o, l, a) {
    var u = n.left, d = n.top, f = n.right, p = n.gap;
    return l === void 0 && (l = "margin"), `
  .`.concat(b_, ` {
   overflow: hidden `).concat(a, `;
   padding-right: `).concat(p, "px ").concat(a, `;
  }
  body[`).concat(Nr, `] {
    overflow: hidden `).concat(a, `;
    overscroll-behavior: contain;
    `).concat([
      o && "position: relative ".concat(a, ";"),
      l === "margin" && `
    padding-left: `.concat(u, `px;
    padding-top: `).concat(d, `px;
    padding-right: `).concat(f, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(p, "px ").concat(a, `;
    `),
      l === "padding" && "padding-right: ".concat(p, "px ").concat(a, ";")
    ].filter(Boolean).join(""), `
  }
  
  .`).concat(el, ` {
    right: `).concat(p, "px ").concat(a, `;
  }
  
  .`).concat(tl, ` {
    margin-right: `).concat(p, "px ").concat(a, `;
  }
  
  .`).concat(el, " .").concat(el, ` {
    right: 0 `).concat(a, `;
  }
  
  .`).concat(tl, " .").concat(tl, ` {
    margin-right: 0 `).concat(a, `;
  }
  
  body[`).concat(Nr, `] {
    `).concat(S_, ": ").concat(p, `px;
  }
`);
  }, Lf = function() {
    var n = parseInt(document.body.getAttribute(Nr) || "0", 10);
    return isFinite(n) ? n : 0;
  }, W_ = function() {
    m.useEffect(function() {
      return document.body.setAttribute(Nr, (Lf() + 1).toString()), function() {
        var n = Lf() - 1;
        n <= 0 ? document.body.removeAttribute(Nr) : document.body.setAttribute(Nr, n.toString());
      };
    }, []);
  }, H_ = function(n) {
    var o = n.noRelative, l = n.noImportant, a = n.gapMode, u = a === void 0 ? "margin" : a;
    W_();
    var d = m.useMemo(function() {
      return F_(u);
    }, [
      u
    ]);
    return m.createElement(z_, {
      styles: I_(d, !o, u, l ? "" : "!important")
    });
  }, Da = false;
  if (typeof window < "u") try {
    var qi = Object.defineProperty({}, "passive", {
      get: function() {
        return Da = true, true;
      }
    });
    window.addEventListener("test", qi, qi), window.removeEventListener("test", qi, qi);
  } catch {
    Da = false;
  }
  var Pr = Da ? {
    passive: false
  } : false, U_ = function(n) {
    return n.tagName === "TEXTAREA";
  }, th = function(n, o) {
    if (!(n instanceof Element)) return false;
    var l = window.getComputedStyle(n);
    return l[o] !== "hidden" && !(l.overflowY === l.overflowX && !U_(n) && l[o] === "visible");
  }, V_ = function(n) {
    return th(n, "overflowY");
  }, $_ = function(n) {
    return th(n, "overflowX");
  }, Of = function(n, o) {
    var l = o.ownerDocument, a = o;
    do {
      typeof ShadowRoot < "u" && a instanceof ShadowRoot && (a = a.host);
      var u = nh(n, a);
      if (u) {
        var d = rh(n, a), f = d[1], p = d[2];
        if (f > p) return true;
      }
      a = a.parentNode;
    } while (a && a !== l.body);
    return false;
  }, G_ = function(n) {
    var o = n.scrollTop, l = n.scrollHeight, a = n.clientHeight;
    return [
      o,
      l,
      a
    ];
  }, K_ = function(n) {
    var o = n.scrollLeft, l = n.scrollWidth, a = n.clientWidth;
    return [
      o,
      l,
      a
    ];
  }, nh = function(n, o) {
    return n === "v" ? V_(o) : $_(o);
  }, rh = function(n, o) {
    return n === "v" ? G_(o) : K_(o);
  }, Q_ = function(n, o) {
    return n === "h" && o === "rtl" ? -1 : 1;
  }, Y_ = function(n, o, l, a, u) {
    var d = Q_(n, window.getComputedStyle(o).direction), f = d * a, p = l.target, g = o.contains(p), y = false, _ = f > 0, b = 0, w = 0;
    do {
      var P = rh(n, p), M = P[0], k = P[1], R = P[2], L = k - R - d * M;
      (M || L) && nh(n, p) && (b += L, w += M), p instanceof ShadowRoot ? p = p.host : p = p.parentNode;
    } while (!g && p !== document.body || g && (o.contains(p) || o === p));
    return (_ && Math.abs(b) < 1 || !_ && Math.abs(w) < 1) && (y = true), y;
  }, Xi = function(n) {
    return "changedTouches" in n ? [
      n.changedTouches[0].clientX,
      n.changedTouches[0].clientY
    ] : [
      0,
      0
    ];
  }, jf = function(n) {
    return [
      n.deltaX,
      n.deltaY
    ];
  }, Df = function(n) {
    return n && "current" in n ? n.current : n;
  }, q_ = function(n, o) {
    return n[0] === o[0] && n[1] === o[1];
  }, X_ = function(n) {
    return `
  .block-interactivity-`.concat(n, ` {pointer-events: none;}
  .allow-interactivity-`).concat(n, ` {pointer-events: all;}
`);
  }, J_ = 0, Er = [];
  function Z_(n) {
    var o = m.useRef([]), l = m.useRef([
      0,
      0
    ]), a = m.useRef(), u = m.useState(J_++)[0], d = m.useState(eh)[0], f = m.useRef(n);
    m.useEffect(function() {
      f.current = n;
    }, [
      n
    ]), m.useEffect(function() {
      if (n.inert) {
        document.body.classList.add("block-interactivity-".concat(u));
        var k = w_([
          n.lockRef.current
        ], (n.shards || []).map(Df), true).filter(Boolean);
        return k.forEach(function(R) {
          return R.classList.add("allow-interactivity-".concat(u));
        }), function() {
          document.body.classList.remove("block-interactivity-".concat(u)), k.forEach(function(R) {
            return R.classList.remove("allow-interactivity-".concat(u));
          });
        };
      }
    }, [
      n.inert,
      n.lockRef.current,
      n.shards
    ]);
    var p = m.useCallback(function(k, R) {
      if ("touches" in k && k.touches.length === 2 || k.type === "wheel" && k.ctrlKey) return !f.current.allowPinchZoom;
      var L = Xi(k), W = l.current, H = "deltaX" in k ? k.deltaX : W[0] - L[0], O = "deltaY" in k ? k.deltaY : W[1] - L[1], j, B = k.target, V = Math.abs(H) > Math.abs(O) ? "h" : "v";
      if ("touches" in k && V === "h" && B.type === "range") return false;
      var K = Of(V, B);
      if (!K) return true;
      if (K ? j = V : (j = V === "v" ? "h" : "v", K = Of(V, B)), !K) return false;
      if (!a.current && "changedTouches" in k && (H || O) && (a.current = j), !j) return true;
      var Y = a.current || j;
      return Y_(Y, R, k, Y === "h" ? H : O);
    }, []), g = m.useCallback(function(k) {
      var R = k;
      if (!(!Er.length || Er[Er.length - 1] !== d)) {
        var L = "deltaY" in R ? jf(R) : Xi(R), W = o.current.filter(function(j) {
          return j.name === R.type && (j.target === R.target || R.target === j.shadowParent) && q_(j.delta, L);
        })[0];
        if (W && W.should) {
          R.cancelable && R.preventDefault();
          return;
        }
        if (!W) {
          var H = (f.current.shards || []).map(Df).filter(Boolean).filter(function(j) {
            return j.contains(R.target);
          }), O = H.length > 0 ? p(R, H[0]) : !f.current.noIsolation;
          O && R.cancelable && R.preventDefault();
        }
      }
    }, []), y = m.useCallback(function(k, R, L, W) {
      var H = {
        name: k,
        delta: R,
        target: L,
        should: W,
        shadowParent: ew(L)
      };
      o.current.push(H), setTimeout(function() {
        o.current = o.current.filter(function(O) {
          return O !== H;
        });
      }, 1);
    }, []), _ = m.useCallback(function(k) {
      l.current = Xi(k), a.current = void 0;
    }, []), b = m.useCallback(function(k) {
      y(k.type, jf(k), k.target, p(k, n.lockRef.current));
    }, []), w = m.useCallback(function(k) {
      y(k.type, Xi(k), k.target, p(k, n.lockRef.current));
    }, []);
    m.useEffect(function() {
      return Er.push(d), n.setCallbacks({
        onScrollCapture: b,
        onWheelCapture: b,
        onTouchMoveCapture: w
      }), document.addEventListener("wheel", g, Pr), document.addEventListener("touchmove", g, Pr), document.addEventListener("touchstart", _, Pr), function() {
        Er = Er.filter(function(k) {
          return k !== d;
        }), document.removeEventListener("wheel", g, Pr), document.removeEventListener("touchmove", g, Pr), document.removeEventListener("touchstart", _, Pr);
      };
    }, []);
    var P = n.removeScrollBar, M = n.inert;
    return m.createElement(m.Fragment, null, M ? m.createElement(d, {
      styles: X_(u)
    }) : null, P ? m.createElement(H_, {
      gapMode: n.gapMode
    }) : null);
  }
  function ew(n) {
    for (var o = null; n !== null; ) n instanceof ShadowRoot && (o = n.host, n = n.host), n = n.parentNode;
    return o;
  }
  const tw = R_(Zp, Z_);
  var oh = m.forwardRef(function(n, o) {
    return m.createElement(vl, Ht({}, n, {
      ref: o,
      sideCar: tw
    }));
  });
  oh.classNames = vl.classNames;
  var tu = "Popover", [ih, IS] = fl(tu, [
    Fp
  ]), jo = Fp(), [nw, Dn] = ih(tu), lh = (n) => {
    const { __scopePopover: o, children: l, open: a, defaultOpen: u, onOpenChange: d, modal: f = false } = n, p = jo(o), g = m.useRef(null), [y, _] = m.useState(false), [b = false, w] = Yp({
      prop: a,
      defaultProp: u,
      onChange: d
    });
    return x.jsx(d_, {
      ...p,
      children: x.jsx(nw, {
        scope: o,
        contentId: iv(),
        triggerRef: g,
        open: b,
        onOpenChange: w,
        onOpenToggle: m.useCallback(() => w((P) => !P), [
          w
        ]),
        hasCustomAnchor: y,
        onCustomAnchorAdd: m.useCallback(() => _(true), []),
        onCustomAnchorRemove: m.useCallback(() => _(false), []),
        modal: f,
        children: l
      })
    });
  };
  lh.displayName = tu;
  var sh = "PopoverAnchor", rw = m.forwardRef((n, o) => {
    const { __scopePopover: l, ...a } = n, u = Dn(sh, l), d = jo(l), { onCustomAnchorAdd: f, onCustomAnchorRemove: p } = u;
    return m.useEffect(() => (f(), () => p()), [
      f,
      p
    ]), x.jsx(Kp, {
      ...d,
      ...a,
      ref: o
    });
  });
  rw.displayName = sh;
  var ah = "PopoverTrigger", uh = m.forwardRef((n, o) => {
    const { __scopePopover: l, ...a } = n, u = Dn(ah, l), d = jo(l), f = ot(o, u.triggerRef), p = x.jsx(Ze.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": u.open,
      "aria-controls": u.contentId,
      "data-state": hh(u.open),
      ...a,
      ref: f,
      onClick: Ge(n.onClick, u.onOpenToggle)
    });
    return u.hasCustomAnchor ? p : x.jsx(Kp, {
      asChild: true,
      ...d,
      children: p
    });
  });
  uh.displayName = ah;
  var nu = "PopoverPortal", [ow, iw] = ih(nu, {
    forceMount: void 0
  }), ch = (n) => {
    const { __scopePopover: o, forceMount: l, children: a, container: u } = n, d = Dn(nu, o);
    return x.jsx(ow, {
      scope: o,
      forceMount: l,
      children: x.jsx(jn, {
        present: l || d.open,
        children: x.jsx(Qp, {
          asChild: true,
          container: u,
          children: a
        })
      })
    });
  };
  ch.displayName = nu;
  var Or = "PopoverContent", dh = m.forwardRef((n, o) => {
    const l = iw(Or, n.__scopePopover), { forceMount: a = l.forceMount, ...u } = n, d = Dn(Or, n.__scopePopover);
    return x.jsx(jn, {
      present: a || d.open,
      children: d.modal ? x.jsx(lw, {
        ...u,
        ref: o
      }) : x.jsx(sw, {
        ...u,
        ref: o
      })
    });
  });
  dh.displayName = Or;
  var lw = m.forwardRef((n, o) => {
    const l = Dn(Or, n.__scopePopover), a = m.useRef(null), u = ot(o, a), d = m.useRef(false);
    return m.useEffect(() => {
      const f = a.current;
      if (f) return __(f);
    }, []), x.jsx(oh, {
      as: dl,
      allowPinchZoom: true,
      children: x.jsx(fh, {
        ...n,
        ref: u,
        trapFocus: l.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: Ge(n.onCloseAutoFocus, (f) => {
          var _a2;
          f.preventDefault(), d.current || ((_a2 = l.triggerRef.current) == null ? void 0 : _a2.focus());
        }),
        onPointerDownOutside: Ge(n.onPointerDownOutside, (f) => {
          const p = f.detail.originalEvent, g = p.button === 0 && p.ctrlKey === true, y = p.button === 2 || g;
          d.current = y;
        }, {
          checkForDefaultPrevented: false
        }),
        onFocusOutside: Ge(n.onFocusOutside, (f) => f.preventDefault(), {
          checkForDefaultPrevented: false
        })
      })
    });
  }), sw = m.forwardRef((n, o) => {
    const l = Dn(Or, n.__scopePopover), a = m.useRef(false), u = m.useRef(false);
    return x.jsx(fh, {
      ...n,
      ref: o,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      onCloseAutoFocus: (d) => {
        var _a2, _b2;
        (_a2 = n.onCloseAutoFocus) == null ? void 0 : _a2.call(n, d), d.defaultPrevented || (a.current || ((_b2 = l.triggerRef.current) == null ? void 0 : _b2.focus()), d.preventDefault()), a.current = false, u.current = false;
      },
      onInteractOutside: (d) => {
        var _a2, _b2;
        (_a2 = n.onInteractOutside) == null ? void 0 : _a2.call(n, d), d.defaultPrevented || (a.current = true, d.detail.originalEvent.type === "pointerdown" && (u.current = true));
        const f = d.target;
        ((_b2 = l.triggerRef.current) == null ? void 0 : _b2.contains(f)) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && u.current && d.preventDefault();
      }
    });
  }), fh = m.forwardRef((n, o) => {
    const { __scopePopover: l, trapFocus: a, onOpenAutoFocus: u, onCloseAutoFocus: d, disableOutsidePointerEvents: f, onEscapeKeyDown: p, onPointerDownOutside: g, onFocusOutside: y, onInteractOutside: _, ...b } = n, w = Dn(Or, l), P = jo(l);
    return Yy(), x.jsx(xp, {
      asChild: true,
      loop: true,
      trapped: a,
      onMountAutoFocus: u,
      onUnmountAutoFocus: d,
      children: x.jsx(bp, {
        asChild: true,
        disableOutsidePointerEvents: f,
        onInteractOutside: _,
        onEscapeKeyDown: p,
        onPointerDownOutside: g,
        onFocusOutside: y,
        onDismiss: () => w.onOpenChange(false),
        children: x.jsx(f_, {
          "data-state": hh(w.open),
          role: "dialog",
          id: w.contentId,
          ...P,
          ...b,
          ref: o,
          style: {
            ...b.style,
            "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
            "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
            "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
          }
        })
      })
    });
  }), ph = "PopoverClose", aw = m.forwardRef((n, o) => {
    const { __scopePopover: l, ...a } = n, u = Dn(ph, l);
    return x.jsx(Ze.button, {
      type: "button",
      ...a,
      ref: o,
      onClick: Ge(n.onClick, () => u.onOpenChange(false))
    });
  });
  aw.displayName = ph;
  var uw = "PopoverArrow", cw = m.forwardRef((n, o) => {
    const { __scopePopover: l, ...a } = n, u = jo(l);
    return x.jsx(p_, {
      ...u,
      ...a,
      ref: o
    });
  });
  cw.displayName = uw;
  function hh(n) {
    return n ? "open" : "closed";
  }
  var dw = lh, fw = uh, pw = ch, mh = dh;
  const hw = dw, mw = fw, gh = m.forwardRef(({ className: n, align: o = "center", sideOffset: l = 4, ...a }, u) => x.jsx(pw, {
    children: x.jsx(mh, {
      ref: u,
      align: o,
      sideOffset: l,
      className: Xn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", n),
      ...a
    })
  }));
  gh.displayName = mh.displayName;
  const gw = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), yh = (...n) => n.filter((o, l, a) => !!o && o.trim() !== "" && a.indexOf(o) === l).join(" ").trim();
  var yw = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  const vw = m.forwardRef(({ color: n = "currentColor", size: o = 24, strokeWidth: l = 2, absoluteStrokeWidth: a, className: u = "", children: d, iconNode: f, ...p }, g) => m.createElement("svg", {
    ref: g,
    ...yw,
    width: o,
    height: o,
    stroke: n,
    strokeWidth: a ? Number(l) * 24 / Number(o) : l,
    className: yh("lucide", u),
    ...p
  }, [
    ...f.map(([y, _]) => m.createElement(y, _)),
    ...Array.isArray(d) ? d : [
      d
    ]
  ]));
  const Dt = (n, o) => {
    const l = m.forwardRef(({ className: a, ...u }, d) => m.createElement(vw, {
      ref: d,
      iconNode: o,
      className: yh(`lucide-${gw(n)}`, a),
      ...u
    }));
    return l.displayName = `${n}`, l;
  };
  const _w = Dt("ArrowDown", [
    [
      "path",
      {
        d: "M12 5v14",
        key: "s699le"
      }
    ],
    [
      "path",
      {
        d: "m19 12-7 7-7-7",
        key: "1idqje"
      }
    ]
  ]);
  const ww = Dt("Check", [
    [
      "path",
      {
        d: "M20 6 9 17l-5-5",
        key: "1gmf2c"
      }
    ]
  ]);
  const bw = Dt("ChevronLeft", [
    [
      "path",
      {
        d: "m15 18-6-6 6-6",
        key: "1wnfg3"
      }
    ]
  ]);
  const Sw = Dt("ChevronRight", [
    [
      "path",
      {
        d: "m9 18 6-6-6-6",
        key: "mthhwq"
      }
    ]
  ]);
  const xw = Dt("CirclePlus", [
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
      }
    ],
    [
      "path",
      {
        d: "M8 12h8",
        key: "1wcyev"
      }
    ],
    [
      "path",
      {
        d: "M12 8v8",
        key: "napkw2"
      }
    ]
  ]);
  const Bf = Dt("Copy", [
    [
      "rect",
      {
        width: "14",
        height: "14",
        x: "8",
        y: "8",
        rx: "2",
        ry: "2",
        key: "17jyea"
      }
    ],
    [
      "path",
      {
        d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
        key: "zix9uf"
      }
    ]
  ]);
  const kw = Dt("FileText", [
    [
      "path",
      {
        d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
        key: "1rqfz7"
      }
    ],
    [
      "path",
      {
        d: "M14 2v4a2 2 0 0 0 2 2h4",
        key: "tnqrlb"
      }
    ],
    [
      "path",
      {
        d: "M10 9H8",
        key: "b1mrlr"
      }
    ],
    [
      "path",
      {
        d: "M16 13H8",
        key: "t4e002"
      }
    ],
    [
      "path",
      {
        d: "M16 17H8",
        key: "z1uh3a"
      }
    ]
  ]);
  const Cw = Dt("Hash", [
    [
      "line",
      {
        x1: "4",
        x2: "20",
        y1: "9",
        y2: "9",
        key: "4lhtct"
      }
    ],
    [
      "line",
      {
        x1: "4",
        x2: "20",
        y1: "15",
        y2: "15",
        key: "vyu0kd"
      }
    ],
    [
      "line",
      {
        x1: "10",
        x2: "8",
        y1: "3",
        y2: "21",
        key: "1ggp8o"
      }
    ],
    [
      "line",
      {
        x1: "16",
        x2: "14",
        y1: "3",
        y2: "21",
        key: "weycgp"
      }
    ]
  ]);
  const Pw = Dt("Moon", [
    [
      "path",
      {
        d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
        key: "a7tn18"
      }
    ]
  ]);
  const Ew = Dt("Sun", [
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "4",
        key: "4exip2"
      }
    ],
    [
      "path",
      {
        d: "M12 2v2",
        key: "tus03m"
      }
    ],
    [
      "path",
      {
        d: "M12 20v2",
        key: "1lh1kg"
      }
    ],
    [
      "path",
      {
        d: "m4.93 4.93 1.41 1.41",
        key: "149t6j"
      }
    ],
    [
      "path",
      {
        d: "m17.66 17.66 1.41 1.41",
        key: "ptbguv"
      }
    ],
    [
      "path",
      {
        d: "M2 12h2",
        key: "1t8f8n"
      }
    ],
    [
      "path",
      {
        d: "M20 12h2",
        key: "1q8mjw"
      }
    ],
    [
      "path",
      {
        d: "m6.34 17.66-1.41 1.41",
        key: "1m8zz5"
      }
    ],
    [
      "path",
      {
        d: "m19.07 4.93-1.41 1.41",
        key: "1shlcs"
      }
    ]
  ]);
  const Tw = Dt("UserPlus", [
    [
      "path",
      {
        d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
        key: "1yyitq"
      }
    ],
    [
      "circle",
      {
        cx: "9",
        cy: "7",
        r: "4",
        key: "nufk8"
      }
    ],
    [
      "line",
      {
        x1: "19",
        x2: "19",
        y1: "8",
        y2: "14",
        key: "1bvyxn"
      }
    ],
    [
      "line",
      {
        x1: "22",
        x2: "16",
        y1: "11",
        y2: "11",
        key: "1shjgl"
      }
    ]
  ]);
  class Rw {
    constructor() {
      __publicField(this, "logs", []);
      __publicField(this, "subscribers", /* @__PURE__ */ new Set());
    }
    error(o) {
      console.error(o), this.info(String(o), "error");
    }
    info(o, l = "info") {
      const a = {
        timestamp: /* @__PURE__ */ new Date(),
        level: l,
        message: o
      };
      this.logs.push(a), this.notifySubscribers(a);
    }
    getLogs() {
      return this.logs;
    }
    subscribe(o) {
      return this.subscribers.add(o), () => {
        this.subscribers.delete(o);
      };
    }
    notifySubscribers(o) {
      this.subscribers.forEach((l) => l(o));
    }
  }
  const Ut = new Rw(), Mw = "" + new URL("chat_browser_bg-CJHxUcb7.wasm", import.meta.url).href, Nw = async (n = {}, o) => {
    let l;
    if (o.startsWith("data:")) {
      const a = o.replace(/^data:.*?base64,/, "");
      let u;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") u = Buffer.from(a, "base64");
      else if (typeof atob == "function") {
        const d = atob(a);
        u = new Uint8Array(d.length);
        for (let f = 0; f < d.length; f++) u[f] = d.charCodeAt(f);
      } else throw new Error("Cannot decode base64-encoded data URL");
      l = await WebAssembly.instantiate(u, n);
    } else {
      const a = await fetch(o), u = a.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && u.startsWith("application/wasm")) l = await WebAssembly.instantiateStreaming(a, n);
      else {
        const d = await a.arrayBuffer();
        l = await WebAssembly.instantiate(d, n);
      }
    }
    return l.instance.exports;
  };
  let G;
  function Aw(n) {
    G = n;
  }
  let xt = 0, Ji = null;
  function Ro() {
    return (Ji === null || Ji.byteLength === 0) && (Ji = new Uint8Array(G.memory.buffer)), Ji;
  }
  const Lw = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
  let nl = new Lw("utf-8");
  const Ow = typeof nl.encodeInto == "function" ? function(n, o) {
    return nl.encodeInto(n, o);
  } : function(n, o) {
    const l = nl.encode(n);
    return o.set(l), {
      read: n.length,
      written: l.length
    };
  };
  function $t(n, o, l) {
    if (l === void 0) {
      const p = nl.encode(n), g = o(p.length, 1) >>> 0;
      return Ro().subarray(g, g + p.length).set(p), xt = p.length, g;
    }
    let a = n.length, u = o(a, 1) >>> 0;
    const d = Ro();
    let f = 0;
    for (; f < a; f++) {
      const p = n.charCodeAt(f);
      if (p > 127) break;
      d[u + f] = p;
    }
    if (f !== a) {
      f !== 0 && (n = n.slice(f)), u = l(u, a, a = f + n.length * 3, 1) >>> 0;
      const p = Ro().subarray(u + f, u + a), g = Ow(n, p);
      f += g.written, u = l(u, a, f, 1) >>> 0;
    }
    return xt = f, u;
  }
  let Tr = null;
  function we() {
    return (Tr === null || Tr.buffer.detached === true || Tr.buffer.detached === void 0 && Tr.buffer !== G.memory.buffer) && (Tr = new DataView(G.memory.buffer)), Tr;
  }
  const jw = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
  let vh = new jw("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  vh.decode();
  function Je(n, o) {
    return n = n >>> 0, vh.decode(Ro().subarray(n, n + o));
  }
  function Bn(n) {
    const o = G.__wbindgen_export_3();
    return G.__wbindgen_export_4.set(o, n), o;
  }
  function Te(n, o) {
    try {
      return n.apply(this, o);
    } catch (l) {
      const a = Bn(l);
      G.__wbindgen_export_2(a);
    }
  }
  function jt(n) {
    return n == null;
  }
  function Fr(n, o) {
    n = n >>> 0;
    const l = we(), a = [];
    for (let u = n; u < n + 4 * o; u += 4) a.push(G.__wbindgen_export_4.get(l.getUint32(u, true)));
    return G.__wbindgen_export_5(n, o), a;
  }
  function Dw(n, o) {
    return n = n >>> 0, Ro().subarray(n / 1, n / 1 + o);
  }
  const Ff = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((n) => {
    G.__wbindgen_export_7.get(n.dtor)(n.a, n.b);
  });
  function zr(n, o, l, a) {
    const u = {
      a: n,
      b: o,
      cnt: 1,
      dtor: l
    }, d = (...f) => {
      u.cnt++;
      const p = u.a;
      u.a = 0;
      try {
        return a(p, u.b, ...f);
      } finally {
        --u.cnt === 0 ? (G.__wbindgen_export_7.get(u.dtor)(p, u.b), Ff.unregister(u)) : u.a = p;
      }
    };
    return d.original = u, Ff.register(d, u, u), d;
  }
  function Ba(n) {
    const o = typeof n;
    if (o == "number" || o == "boolean" || n == null) return `${n}`;
    if (o == "string") return `"${n}"`;
    if (o == "symbol") {
      const u = n.description;
      return u == null ? "Symbol" : `Symbol(${u})`;
    }
    if (o == "function") {
      const u = n.name;
      return typeof u == "string" && u.length > 0 ? `Function(${u})` : "Function";
    }
    if (Array.isArray(n)) {
      const u = n.length;
      let d = "[";
      u > 0 && (d += Ba(n[0]));
      for (let f = 1; f < u; f++) d += ", " + Ba(n[f]);
      return d += "]", d;
    }
    const l = /\[object ([^\]]+)\]/.exec(toString.call(n));
    let a;
    if (l && l.length > 1) a = l[1];
    else return toString.call(n);
    if (a == "Object") try {
      return "Object(" + JSON.stringify(n) + ")";
    } catch {
      return "Object";
    }
    return n instanceof Error ? `${n.name}: ${n.message}
${n.stack}` : a;
  }
  function Fa(n) {
    const o = G.__wbindgen_export_4.get(n);
    return G.__wbindgen_export_8(n), o;
  }
  function _l(n, o, l) {
    G.closure855_externref_shim(n, o, l);
  }
  function Bw(n, o) {
    G.__wbindgen_export_10(n, o);
  }
  function Fw(n, o, l) {
    G.closure2790_externref_shim(n, o, l);
  }
  function zw(n, o, l, a) {
    G.closure2895_externref_shim(n, o, l, a);
  }
  const Iw = [
    "blob",
    "arraybuffer"
  ], Ww = [
    "omit",
    "same-origin",
    "include"
  ], Hw = [
    "same-origin",
    "no-cors",
    "cors",
    "navigate"
  ], zf = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((n) => G.__wbg_channel_free(n >>> 0, 1));
  class cl {
    static __wrap(o) {
      o = o >>> 0;
      const l = Object.create(cl.prototype);
      return l.__wbg_ptr = o, zf.register(l, l.__wbg_ptr, l), l;
    }
    __destroy_into_raw() {
      const o = this.__wbg_ptr;
      return this.__wbg_ptr = 0, zf.unregister(this), o;
    }
    free() {
      const o = this.__destroy_into_raw();
      G.__wbg_channel_free(o, 0);
    }
    get sender() {
      const o = G.channel_sender(this.__wbg_ptr);
      return ru.__wrap(o);
    }
    get receiver() {
      return G.channel_receiver(this.__wbg_ptr);
    }
    ticket(o) {
      let l, a;
      try {
        const _ = G.__wbindgen_add_to_stack_pointer(-16);
        G.channel_ticket(_, this.__wbg_ptr, o);
        var u = we().getInt32(_ + 4 * 0, true), d = we().getInt32(_ + 4 * 1, true), f = we().getInt32(_ + 4 * 2, true), p = we().getInt32(_ + 4 * 3, true), g = u, y = d;
        if (p) throw g = 0, y = 0, Fa(f);
        return l = g, a = y, Je(g, y);
      } finally {
        G.__wbindgen_add_to_stack_pointer(16), G.__wbindgen_export_6(l, a, 1);
      }
    }
    id() {
      let o, l;
      try {
        const d = G.__wbindgen_add_to_stack_pointer(-16);
        G.channel_id(d, this.__wbg_ptr);
        var a = we().getInt32(d + 4 * 0, true), u = we().getInt32(d + 4 * 1, true);
        return o = a, l = u, Je(a, u);
      } finally {
        G.__wbindgen_add_to_stack_pointer(16), G.__wbindgen_export_6(o, l, 1);
      }
    }
    neighbors() {
      try {
        const u = G.__wbindgen_add_to_stack_pointer(-16);
        G.channel_neighbors(u, this.__wbg_ptr);
        var o = we().getInt32(u + 4 * 0, true), l = we().getInt32(u + 4 * 1, true), a = Fr(o, l).slice();
        return G.__wbindgen_export_6(o, l * 4, 4), a;
      } finally {
        G.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  const If = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((n) => G.__wbg_channelsender_free(n >>> 0, 1));
  class ru {
    static __wrap(o) {
      o = o >>> 0;
      const l = Object.create(ru.prototype);
      return l.__wbg_ptr = o, If.register(l, l.__wbg_ptr, l), l;
    }
    __destroy_into_raw() {
      const o = this.__wbg_ptr;
      return this.__wbg_ptr = 0, If.unregister(this), o;
    }
    free() {
      const o = this.__destroy_into_raw();
      G.__wbg_channelsender_free(o, 0);
    }
    broadcast(o) {
      const l = $t(o, G.__wbindgen_export_0, G.__wbindgen_export_1), a = xt;
      return G.channelsender_broadcast(this.__wbg_ptr, l, a);
    }
  }
  const Wf = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((n) => G.__wbg_chatnode_free(n >>> 0, 1));
  class wl {
    static __wrap(o) {
      o = o >>> 0;
      const l = Object.create(wl.prototype);
      return l.__wbg_ptr = o, Wf.register(l, l.__wbg_ptr, l), l;
    }
    __destroy_into_raw() {
      const o = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Wf.unregister(this), o;
    }
    free() {
      const o = this.__destroy_into_raw();
      G.__wbg_chatnode_free(o, 0);
    }
    static spawn() {
      return G.chatnode_spawn();
    }
    node_id() {
      let o, l;
      try {
        const d = G.__wbindgen_add_to_stack_pointer(-16);
        G.chatnode_node_id(d, this.__wbg_ptr);
        var a = we().getInt32(d + 4 * 0, true), u = we().getInt32(d + 4 * 1, true);
        return o = a, l = u, Je(a, u);
      } finally {
        G.__wbindgen_add_to_stack_pointer(16), G.__wbindgen_export_6(o, l, 1);
      }
    }
    remote_info() {
      try {
        const u = G.__wbindgen_add_to_stack_pointer(-16);
        G.chatnode_remote_info(u, this.__wbg_ptr);
        var o = we().getInt32(u + 4 * 0, true), l = we().getInt32(u + 4 * 1, true), a = Fr(o, l).slice();
        return G.__wbindgen_export_6(o, l * 4, 4), a;
      } finally {
        G.__wbindgen_add_to_stack_pointer(16);
      }
    }
    create(o) {
      try {
        const d = G.__wbindgen_add_to_stack_pointer(-16), f = $t(o, G.__wbindgen_export_0, G.__wbindgen_export_1), p = xt;
        G.chatnode_create(d, this.__wbg_ptr, f, p);
        var l = we().getInt32(d + 4 * 0, true), a = we().getInt32(d + 4 * 1, true), u = we().getInt32(d + 4 * 2, true);
        if (u) throw Fa(a);
        return cl.__wrap(l);
      } finally {
        G.__wbindgen_add_to_stack_pointer(16);
      }
    }
    join(o, l) {
      try {
        const f = G.__wbindgen_add_to_stack_pointer(-16), p = $t(o, G.__wbindgen_export_0, G.__wbindgen_export_1), g = xt, y = $t(l, G.__wbindgen_export_0, G.__wbindgen_export_1), _ = xt;
        G.chatnode_join(f, this.__wbg_ptr, p, g, y, _);
        var a = we().getInt32(f + 4 * 0, true), u = we().getInt32(f + 4 * 1, true), d = we().getInt32(f + 4 * 2, true);
        if (d) throw Fa(u);
        return cl.__wrap(a);
      } finally {
        G.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((n) => G.__wbg_intounderlyingbytesource_free(n >>> 0, 1));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((n) => G.__wbg_intounderlyingsink_free(n >>> 0, 1));
  const Hf = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((n) => G.__wbg_intounderlyingsource_free(n >>> 0, 1));
  class ou {
    static __wrap(o) {
      o = o >>> 0;
      const l = Object.create(ou.prototype);
      return l.__wbg_ptr = o, Hf.register(l, l.__wbg_ptr, l), l;
    }
    __destroy_into_raw() {
      const o = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Hf.unregister(this), o;
    }
    free() {
      const o = this.__destroy_into_raw();
      G.__wbg_intounderlyingsource_free(o, 0);
    }
    pull(o) {
      return G.intounderlyingsource_pull(this.__wbg_ptr, o);
    }
    cancel() {
      const o = this.__destroy_into_raw();
      G.intounderlyingsource_cancel(o);
    }
  }
  function Uw(n, o) {
    const l = String(o), a = $t(l, G.__wbindgen_export_0, G.__wbindgen_export_1), u = xt;
    we().setInt32(n + 4 * 1, u, true), we().setInt32(n + 4 * 0, a, true);
  }
  function Vw(n) {
    n.abort();
  }
  function $w() {
    return Te(function(n, o, l, a, u) {
      n.append(Je(o, l), Je(a, u));
    }, arguments);
  }
  function Gw() {
    return Te(function(n) {
      return n.arrayBuffer();
    }, arguments);
  }
  function Kw(n) {
    const o = n.body;
    return jt(o) ? 0 : Bn(o);
  }
  function Qw(n) {
    return n.buffer;
  }
  function Yw(n) {
    return n.buffer;
  }
  function qw(n) {
    const o = n.byobRequest;
    return jt(o) ? 0 : Bn(o);
  }
  function Xw(n) {
    return n.byteLength;
  }
  function Jw(n) {
    return n.byteOffset;
  }
  function Zw() {
    return Te(function(n, o) {
      return n.call(o);
    }, arguments);
  }
  function e0() {
    return Te(function(n, o, l) {
      return n.call(o, l);
    }, arguments);
  }
  function t0(n) {
    return n.cancel();
  }
  function n0(n, o) {
    return n.catch(o);
  }
  function r0(n) {
    return wl.__wrap(n);
  }
  function o0() {
    return Te(function(n, o) {
      n.clearTimeout(o);
    }, arguments);
  }
  function i0() {
    return Te(function(n) {
      n.close();
    }, arguments);
  }
  function l0() {
    return Te(function(n) {
      n.close();
    }, arguments);
  }
  function s0() {
    return Te(function(n) {
      n.close();
    }, arguments);
  }
  function a0() {
    return Te(function(n, o, l, a) {
      n.close(o, Je(l, a));
    }, arguments);
  }
  function u0(n) {
    return n.code;
  }
  function c0(n) {
    return n.crypto;
  }
  function d0(n) {
    return n.data;
  }
  function f0(n, o) {
    var l = Fr(n, o).slice();
    G.__wbindgen_export_6(n, o * 4, 4), console.debug(...l);
  }
  function p0(n) {
    return n.done;
  }
  function h0() {
    return Te(function(n, o) {
      n.enqueue(o);
    }, arguments);
  }
  function m0(n, o) {
    let l, a;
    try {
      l = n, a = o, console.error(Je(n, o));
    } finally {
      G.__wbindgen_export_6(l, a, 1);
    }
  }
  function g0(n, o) {
    var l = Fr(n, o).slice();
    G.__wbindgen_export_6(n, o * 4, 4), console.error(...l);
  }
  function y0(n) {
    return fetch(n);
  }
  function v0(n, o) {
    return n.fetch(o);
  }
  function _0() {
    return Te(function(n, o) {
      n.getRandomValues(o);
    }, arguments);
  }
  function w0() {
    return Te(function(n) {
      return n.getReader();
    }, arguments);
  }
  function b0(n) {
    return n.getTime();
  }
  function S0() {
    return Te(function(n, o) {
      return Reflect.get(n, o);
    }, arguments);
  }
  function x0(n) {
    const o = n.done;
    return jt(o) ? 16777215 : o ? 1 : 0;
  }
  function k0(n) {
    return n.value;
  }
  function C0(n, o) {
    return n[o];
  }
  function P0() {
    return Te(function(n, o) {
      return Reflect.has(n, o);
    }, arguments);
  }
  function E0(n) {
    return n.headers;
  }
  function T0(n) {
    let o;
    try {
      o = n instanceof ArrayBuffer;
    } catch {
      o = false;
    }
    return o;
  }
  function R0(n) {
    let o;
    try {
      o = n instanceof Blob;
    } catch {
      o = false;
    }
    return o;
  }
  function M0(n) {
    let o;
    try {
      o = n instanceof Response;
    } catch {
      o = false;
    }
    return o;
  }
  function N0(n) {
    let o;
    try {
      o = n instanceof Uint8Array;
    } catch {
      o = false;
    }
    return o;
  }
  function A0() {
    return Symbol.iterator;
  }
  function L0(n) {
    return n.length;
  }
  function O0(n, o) {
    var l = Fr(n, o).slice();
    G.__wbindgen_export_6(n, o * 4, 4), console.log(...l);
  }
  function j0(n) {
    return n.msCrypto;
  }
  function D0() {
    return /* @__PURE__ */ new Date();
  }
  function B0() {
    return Te(function() {
      return new Headers();
    }, arguments);
  }
  function F0(n, o) {
    try {
      var l = {
        a: n,
        b: o
      }, a = (d, f) => {
        const p = l.a;
        l.a = 0;
        try {
          return zw(p, l.b, d, f);
        } finally {
          l.a = p;
        }
      };
      return new Promise(a);
    } finally {
      l.a = l.b = 0;
    }
  }
  function z0() {
    return new Object();
  }
  function I0() {
    return /* @__PURE__ */ new Map();
  }
  function W0() {
    return new Array();
  }
  function H0() {
    return new Error();
  }
  function U0() {
    return Te(function(n, o) {
      return new WebSocket(Je(n, o));
    }, arguments);
  }
  function V0(n) {
    return new Uint8Array(n);
  }
  function $0(n, o) {
    return new Error(Je(n, o));
  }
  function G0() {
    return Te(function() {
      return new AbortController();
    }, arguments);
  }
  function K0(n, o) {
    return new Function(Je(n, o));
  }
  function Q0(n, o, l) {
    return new Uint8Array(n, o >>> 0, l >>> 0);
  }
  function Y0(n, o) {
    return new ReadableStream(ou.__wrap(n), o);
  }
  function q0(n) {
    return new Uint8Array(n >>> 0);
  }
  function X0() {
    return Te(function(n, o, l) {
      return new Request(Je(n, o), l);
    }, arguments);
  }
  function J0(n) {
    return n.next;
  }
  function Z0() {
    return Te(function(n) {
      return n.next();
    }, arguments);
  }
  function eb(n) {
    return n.node;
  }
  function tb(n) {
    return n.now();
  }
  function nb() {
    return Date.now();
  }
  function rb(n) {
    return n.now();
  }
  function ob(n) {
    return n.performance;
  }
  function ib(n) {
    return n.process;
  }
  function lb(n) {
    queueMicrotask(n);
  }
  function sb(n) {
    return n.queueMicrotask;
  }
  function ab() {
    return Te(function(n, o) {
      n.randomFillSync(o);
    }, arguments);
  }
  function ub(n) {
    return n.read();
  }
  function cb(n) {
    return n.readyState;
  }
  function db(n, o) {
    const l = o.reason, a = $t(l, G.__wbindgen_export_0, G.__wbindgen_export_1), u = xt;
    we().setInt32(n + 4 * 1, u, true), we().setInt32(n + 4 * 0, a, true);
  }
  function fb(n) {
    n.releaseLock();
  }
  function pb() {
    return Te(function() {
      return module.require;
    }, arguments);
  }
  function hb(n) {
    return Promise.resolve(n);
  }
  function mb() {
    return Te(function(n, o) {
      n.respond(o >>> 0);
    }, arguments);
  }
  function gb() {
    return Te(function(n, o, l) {
      n.send(Je(o, l));
    }, arguments);
  }
  function yb() {
    return Te(function(n, o, l) {
      n.send(Dw(o, l));
    }, arguments);
  }
  function vb() {
    return Te(function(n, o, l) {
      return n.setTimeout(o, l);
    }, arguments);
  }
  function _b(n, o, l) {
    n[o >>> 0] = l;
  }
  function wb(n, o, l) {
    n[o] = l;
  }
  function bb(n, o, l) {
    n.set(o, l >>> 0);
  }
  function Sb(n, o, l) {
    return n.set(o, l);
  }
  function xb(n, o) {
    n.binaryType = Iw[o];
  }
  function kb(n, o) {
    n.body = o;
  }
  function Cb(n, o) {
    n.credentials = Ww[o];
  }
  function Pb(n, o) {
    n.headers = o;
  }
  function Eb(n, o) {
    n.highWaterMark = o;
  }
  function Tb(n, o, l) {
    n.method = Je(o, l);
  }
  function Rb(n, o) {
    n.mode = Hw[o];
  }
  function Mb(n, o) {
    n.onclose = o;
  }
  function Nb(n, o) {
    n.onerror = o;
  }
  function Ab(n, o) {
    n.onmessage = o;
  }
  function Lb(n, o) {
    n.onopen = o;
  }
  function Ob(n, o) {
    n.signal = o;
  }
  function jb(n) {
    return n.signal;
  }
  function Db(n, o) {
    const l = o.stack, a = $t(l, G.__wbindgen_export_0, G.__wbindgen_export_1), u = xt;
    we().setInt32(n + 4 * 1, u, true), we().setInt32(n + 4 * 0, a, true);
  }
  function Bb() {
    const n = typeof global > "u" ? null : global;
    return jt(n) ? 0 : Bn(n);
  }
  function Fb() {
    const n = typeof globalThis > "u" ? null : globalThis;
    return jt(n) ? 0 : Bn(n);
  }
  function zb() {
    const n = typeof self > "u" ? null : self;
    return jt(n) ? 0 : Bn(n);
  }
  function Ib() {
    const n = typeof window > "u" ? null : window;
    return jt(n) ? 0 : Bn(n);
  }
  function Wb(n) {
    return n.status;
  }
  function Hb() {
    return Te(function(n) {
      return JSON.stringify(n);
    }, arguments);
  }
  function Ub(n, o, l) {
    return n.subarray(o >>> 0, l >>> 0);
  }
  function Vb(n, o) {
    return n.then(o);
  }
  function $b(n, o, l) {
    return n.then(o, l);
  }
  function Gb(n, o) {
    const l = o.url, a = $t(l, G.__wbindgen_export_0, G.__wbindgen_export_1), u = xt;
    we().setInt32(n + 4 * 1, u, true), we().setInt32(n + 4 * 0, a, true);
  }
  function Kb(n) {
    return n.value;
  }
  function Qb(n) {
    return n.versions;
  }
  function Yb(n) {
    const o = n.view;
    return jt(o) ? 0 : Bn(o);
  }
  function qb(n, o) {
    var l = Fr(n, o).slice();
    G.__wbindgen_export_6(n, o * 4, 4), console.warn(...l);
  }
  function Xb(n) {
    return +n;
  }
  function Jb(n) {
    return BigInt.asUintN(64, n);
  }
  function Zb(n) {
    const o = n;
    return typeof o == "boolean" ? o ? 1 : 0 : 2;
  }
  function e1(n) {
    const o = n.original;
    return o.cnt-- == 1 ? (o.a = 0, true) : false;
  }
  function t1(n, o, l) {
    return zr(n, o, 2781, Bw);
  }
  function n1(n, o, l) {
    return zr(n, o, 2791, Fw);
  }
  function r1(n, o, l) {
    return zr(n, o, 856, _l);
  }
  function o1(n, o, l) {
    return zr(n, o, 856, _l);
  }
  function i1(n, o, l) {
    return zr(n, o, 856, _l);
  }
  function l1(n, o, l) {
    return zr(n, o, 856, _l);
  }
  function s1(n, o) {
    const l = Ba(o), a = $t(l, G.__wbindgen_export_0, G.__wbindgen_export_1), u = xt;
    we().setInt32(n + 4 * 1, u, true), we().setInt32(n + 4 * 0, a, true);
  }
  function a1(n, o) {
    return new Error(Je(n, o));
  }
  function u1(n, o) {
    return n in o;
  }
  function c1() {
    const n = G.__wbindgen_export_4, o = n.grow(4);
    n.set(0, void 0), n.set(o + 0, void 0), n.set(o + 1, null), n.set(o + 2, true), n.set(o + 3, false);
  }
  function d1(n) {
    return typeof n == "function";
  }
  function f1(n) {
    const o = n;
    return typeof o == "object" && o !== null;
  }
  function p1(n) {
    return typeof n == "string";
  }
  function h1(n) {
    return n === void 0;
  }
  function m1(n, o) {
    return n == o;
  }
  function g1() {
    return G.memory;
  }
  function y1(n, o) {
    const l = o, a = typeof l == "number" ? l : void 0;
    we().setFloat64(n + 8 * 1, jt(a) ? 0 : a, true), we().setInt32(n + 4 * 0, !jt(a), true);
  }
  function v1(n) {
    return n;
  }
  function _1(n, o) {
    const l = o, a = typeof l == "string" ? l : void 0;
    var u = jt(a) ? 0 : $t(a, G.__wbindgen_export_0, G.__wbindgen_export_1), d = xt;
    we().setInt32(n + 4 * 1, d, true), we().setInt32(n + 4 * 0, u, true);
  }
  function w1(n, o) {
    return Je(n, o);
  }
  function b1(n, o) {
    throw new Error(Je(n, o));
  }
  URL = globalThis.URL;
  const ae = await Nw({
    "./chat_browser_bg.js": {
      __wbindgen_error_new: a1,
      __wbindgen_string_new: w1,
      __wbindgen_is_undefined: h1,
      __wbindgen_in: u1,
      __wbindgen_boolean_get: Zb,
      __wbindgen_is_object: f1,
      __wbindgen_as_number: Xb,
      __wbg_chatnode_new: r0,
      __wbindgen_jsval_loose_eq: m1,
      __wbindgen_number_get: y1,
      __wbindgen_string_get: _1,
      __wbg_String_8f0eb39a4a4c2f66: Uw,
      __wbindgen_number_new: v1,
      __wbindgen_bigint_from_u64: Jb,
      __wbg_getwithrefkey_1dc361bd10053bfe: C0,
      __wbg_set_3f1d0b984ed272ed: wb,
      __wbg_new_8a6f238a6ece86ea: H0,
      __wbg_stack_0ed75d68575b0f3c: Db,
      __wbg_error_7534b8e9a36f1ab4: m0,
      __wbindgen_cb_drop: e1,
      __wbg_debug_55137df391ebfd29: f0,
      __wbg_error_91947ba14c44e1c9: g0,
      __wbg_log_e51ef223c244b133: O0,
      __wbg_warn_479b8bbb8337357b: qb,
      __wbg_fetch_4465c2b10f21a927: y0,
      __wbg_getReader_48e00749fe3f6089: w0,
      __wbg_newwithintounderlyingsource_b47f6a6a596a7f24: Y0,
      __wbindgen_is_string: p1,
      __wbg_signal_aaf9ad74119f20a4: jb,
      __wbg_new_e25e5aab09ff45db: G0,
      __wbg_abort_775ef1d17fc65868: Vw,
      __wbg_instanceof_Blob_ca721ef3bdab15d1: R0,
      __wbg_code_f4ec1e6e2e1b0417: u0,
      __wbg_reason_49f1cede8bcf23dd: db,
      __wbg_new_018dcc2d6c8c2f6a: B0,
      __wbg_append_8c7dd8d641a5f01b: $w,
      __wbg_data_432d9c3df2630942: d0,
      __wbg_now_d18023d54d4e5500: rb,
      __wbg_sethighwatermark_793c99c89830c8e9: Eb,
      __wbg_byobRequest_77d9adf63337edfb: qw,
      __wbg_close_5ce03e29be453811: s0,
      __wbg_view_fd8a56e8983f448d: Yb,
      __wbg_respond_1f279fa9f8edcb1c: mb,
      __wbg_close_304cc1fef3466669: l0,
      __wbg_enqueue_bb16ba72f537dc9e: h0,
      __wbg_read_a2434af1186cb56c: ub,
      __wbg_releaseLock_091899af97991d2e: fb,
      __wbg_cancel_8a308660caa6cadf: t0,
      __wbg_getdone_d47073731acd3e74: x0,
      __wbg_getvalue_009dcd63692bee1f: k0,
      __wbg_newwithstrandinit_06c535e0a867c635: X0,
      __wbg_setbody_5923b78a95eedf29: kb,
      __wbg_setcredentials_c3a22f1cd105a2c6: Cb,
      __wbg_setheaders_834c0bdb6a8949ad: Pb,
      __wbg_setmethod_3c5280fe5d890842: Tb,
      __wbg_setmode_5dc300b865044b65: Rb,
      __wbg_setsignal_75b21ef3a81de905: Ob,
      __wbg_instanceof_Response_f2cc20d9f7dfd644: M0,
      __wbg_url_ae10c34ca209681d: Gb,
      __wbg_status_f6360336ca686bf0: Wb,
      __wbg_headers_9cb51cfd2ac780a4: E0,
      __wbg_body_0b8fd1fe671660df: Kw,
      __wbg_arrayBuffer_d1b44c4390db422f: Gw,
      __wbg_readyState_7ef6e63c349899ed: cb,
      __wbg_setonopen_2da654e1f39745d5: Lb,
      __wbg_setonerror_8639efe354b947cd: Nb,
      __wbg_setonclose_14fc475a49d488fc: Mb,
      __wbg_setonmessage_6eccab530a8fb4c7: Ab,
      __wbg_setbinaryType_92fa1ffd873b327c: xb,
      __wbg_new_92c54fc74574ef55: U0,
      __wbg_close_2893b7d056a0627d: i0,
      __wbg_close_e1253d480ed93ce3: a0,
      __wbg_send_0293179ba074ffb4: gb,
      __wbg_send_fc0c204e8a1757f4: yb,
      __wbg_fetch_509096533071c657: v0,
      __wbg_setTimeout_592d289a39056aa2: vb,
      __wbg_clearTimeout_710cb18754e44d88: o0,
      __wbg_queueMicrotask_97d92b4fcc8a61c5: lb,
      __wbg_queueMicrotask_d3219def82552485: sb,
      __wbindgen_is_function: d1,
      __wbg_performance_7a3ffd0b17f663ad: ob,
      __wbg_now_2c95c9de01293173: tb,
      __wbg_crypto_ed58b8e10a292839: c0,
      __wbg_process_5c1d670bc53614b8: ib,
      __wbg_versions_c71aa1626a93e0a1: Qb,
      __wbg_node_02999533c4ea02e3: eb,
      __wbg_require_79b1e9274cde3c87: pb,
      __wbg_msCrypto_0a36e2ec3a343d26: j0,
      __wbg_randomFillSync_ab2cfe79ebbf2740: ab,
      __wbg_getRandomValues_bcb4912f16000dc4: _0,
      __wbg_new_78feb108b6472713: W0,
      __wbg_newnoargs_105ed471475aaf50: K0,
      __wbg_new_5e0be73521bc8c17: I0,
      __wbg_next_25feadfc0913fea9: J0,
      __wbg_value_cd1ffa7b1ab794f1: Kb,
      __wbg_iterator_9a24c88df860dc65: A0,
      __wbg_new_405e22f390576ce2: z0,
      __wbg_set_37837023f3d740e8: _b,
      __wbg_instanceof_ArrayBuffer_e14585432e3737fc: T0,
      __wbg_new_c68d7209be747379: $0,
      __wbg_call_672a4d21634d4a24: Zw,
      __wbg_call_7cccdd69e0791ae2: e0,
      __wbg_set_8fc6bf8a5b1071d1: Sb,
      __wbg_next_6574e1a8a62d1055: Z0,
      __wbg_done_769e5ede4b31c67b: p0,
      __wbg_getTime_46267b1c24877e30: b0,
      __wbg_new0_f788a2397c7ca929: D0,
      __wbg_now_807e54c39636c349: nb,
      __wbg_get_67b2ba62fc30de12: S0,
      __wbg_has_a5ea9117f258a0ec: P0,
      __wbg_buffer_609cc3eee51ed158: Yw,
      __wbg_stringify_f7ed6987935b4a24: Hb,
      __wbg_new_23a2665fac83c611: F0,
      __wbg_resolve_4851785c9c5f573d: hb,
      __wbg_catch_a6e601879b2610e9: n0,
      __wbg_then_44b73946d2fb3e7d: Vb,
      __wbg_then_48b406749878a531: $b,
      __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0: Fb,
      __wbg_static_accessor_SELF_37c5d418e4bf5819: zb,
      __wbg_static_accessor_WINDOW_5de37043a91a9c40: Ib,
      __wbg_static_accessor_GLOBAL_88a902d13a557d07: Bb,
      __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a: Q0,
      __wbg_new_a12002a7f91c75be: V0,
      __wbg_instanceof_Uint8Array_17156bcf118086a9: N0,
      __wbg_newwithlength_a381634e90c276d4: q0,
      __wbg_buffer_09165b52af8c5237: Qw,
      __wbg_subarray_aa9065fa9dc5df96: Ub,
      __wbg_length_a446193dc22c12f8: L0,
      __wbg_byteLength_e674b853d9c77e1d: Xw,
      __wbg_byteOffset_fd862df290ef848d: Jw,
      __wbg_set_65595bdd868b3009: bb,
      __wbindgen_debug_string: s1,
      __wbindgen_throw: b1,
      __wbindgen_memory: g1,
      __wbindgen_closure_wrapper3882: r1,
      __wbindgen_closure_wrapper3884: o1,
      __wbindgen_closure_wrapper3886: i1,
      __wbindgen_closure_wrapper3888: l1,
      __wbindgen_closure_wrapper14859: t1,
      __wbindgen_closure_wrapper14914: n1,
      __wbindgen_init_externref_table: c1
    }
  }, Mw), S1 = ae.memory, x1 = ae.start, k1 = ae.__wbg_chatnode_free, C1 = ae.chatnode_spawn, P1 = ae.chatnode_node_id, E1 = ae.chatnode_remote_info, T1 = ae.chatnode_create, R1 = ae.chatnode_join, M1 = ae.__wbg_channel_free, N1 = ae.channel_sender, A1 = ae.channel_receiver, L1 = ae.channel_ticket, O1 = ae.channel_id, j1 = ae.channel_neighbors, D1 = ae.__wbg_channelsender_free, B1 = ae.channelsender_broadcast, F1 = ae.__wbg_intounderlyingbytesource_free, z1 = ae.intounderlyingbytesource_type, I1 = ae.intounderlyingbytesource_autoAllocateChunkSize, W1 = ae.intounderlyingbytesource_start, H1 = ae.intounderlyingbytesource_pull, U1 = ae.intounderlyingbytesource_cancel, V1 = ae.__wbg_intounderlyingsource_free, $1 = ae.intounderlyingsource_pull, G1 = ae.intounderlyingsource_cancel, K1 = ae.__wbg_intounderlyingsink_free, Q1 = ae.intounderlyingsink_write, Y1 = ae.intounderlyingsink_close, q1 = ae.intounderlyingsink_abort, X1 = ae.ring_core_0_17_11__bn_mul_mont, J1 = ae.__wbindgen_export_0, Z1 = ae.__wbindgen_export_1, eS = ae.__wbindgen_export_2, tS = ae.__wbindgen_export_3, nS = ae.__wbindgen_export_4, rS = ae.__wbindgen_export_5, oS = ae.__wbindgen_export_6, iS = ae.__wbindgen_export_7, lS = ae.__wbindgen_add_to_stack_pointer, sS = ae.__wbindgen_export_8, aS = ae.closure855_externref_shim, uS = ae.__wbindgen_export_10, cS = ae.closure2790_externref_shim, dS = ae.closure2895_externref_shim, _h = ae.__wbindgen_start, fS = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wbg_channel_free: M1,
    __wbg_channelsender_free: D1,
    __wbg_chatnode_free: k1,
    __wbg_intounderlyingbytesource_free: F1,
    __wbg_intounderlyingsink_free: K1,
    __wbg_intounderlyingsource_free: V1,
    __wbindgen_add_to_stack_pointer: lS,
    __wbindgen_export_0: J1,
    __wbindgen_export_1: Z1,
    __wbindgen_export_10: uS,
    __wbindgen_export_2: eS,
    __wbindgen_export_3: tS,
    __wbindgen_export_4: nS,
    __wbindgen_export_5: rS,
    __wbindgen_export_6: oS,
    __wbindgen_export_7: iS,
    __wbindgen_export_8: sS,
    __wbindgen_start: _h,
    channel_id: O1,
    channel_neighbors: j1,
    channel_receiver: A1,
    channel_sender: N1,
    channel_ticket: L1,
    channelsender_broadcast: B1,
    chatnode_create: T1,
    chatnode_join: R1,
    chatnode_node_id: P1,
    chatnode_remote_info: E1,
    chatnode_spawn: C1,
    closure2790_externref_shim: cS,
    closure2895_externref_shim: dS,
    closure855_externref_shim: aS,
    intounderlyingbytesource_autoAllocateChunkSize: I1,
    intounderlyingbytesource_cancel: U1,
    intounderlyingbytesource_pull: H1,
    intounderlyingbytesource_start: W1,
    intounderlyingbytesource_type: z1,
    intounderlyingsink_abort: q1,
    intounderlyingsink_close: Y1,
    intounderlyingsink_write: Q1,
    intounderlyingsource_cancel: G1,
    intounderlyingsource_pull: $1,
    memory: S1,
    ring_core_0_17_11__bn_mul_mont: X1,
    start: x1
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  Aw(fS);
  _h();
  class iu {
    constructor(o) {
      __publicField(this, "chatNode");
      __publicField(this, "channels", /* @__PURE__ */ new Map());
      this.chatNode = o;
    }
    static async create() {
      Ut.info("spawning iroh node");
      const o = await wl.spawn();
      return Ut.info(`node spawned. node id: ${o.node_id()}`), new iu(o);
    }
    async createChannel(o) {
      const l = this.chatNode.create(o);
      return this.joinInner(l, o);
    }
    async joinChannel(o, l) {
      const a = this.chatNode.join(o, l);
      return this.joinInner(a, l);
    }
    joinInner(o, l) {
      const a = o.id();
      Ut.info(`joining channel ${a}`);
      const u = a.substring(5, 13);
      let d, f = new Promise((b) => {
        d = b;
      });
      const p = {
        label: u,
        messages: [],
        channel: o,
        subscribers: [],
        peers: /* @__PURE__ */ new Map(),
        nextId: 0,
        neighbors: 0,
        neighborSubscribers: [],
        onClose: d
      }, g = this.chatNode.node_id();
      p.peers.set(g, {
        id: g,
        name: l,
        lastSeen: /* @__PURE__ */ new Date(),
        status: "online"
      }), this.channels.set(a, p);
      const y = async () => {
        const b = o.receiver.getReader();
        for (; ; ) {
          const { done: w, value: P } = await b.read();
          if (w) break;
          const M = P;
          if (console.log("chat event", M), M.type === "messageReceived") {
            const k = {
              id: M.from,
              name: M.nickname,
              lastSeen: new Date(M.sentTimestamp / 1e3),
              status: "online"
            };
            p.peers.set(M.from, k);
            const R = {
              id: Uf(p),
              sender: M.from,
              content: M.text
            };
            p.messages.push(R);
            const L = Ra(p, R);
            for (const W of p.subscribers) W(L);
          } else if (M.type === "presence") {
            const k = {
              id: M.from,
              name: M.nickname,
              lastSeen: new Date(M.sentTimestamp / 1e3),
              status: "online"
            };
            p.peers.set(M.from, k);
          } else M.type === "joined" ? (Ut.info(`joined channel ${a}`), p.neighbors += M.neighbors.length) : M.type === "neighborUp" ? p.neighbors += 1 : M.type === "neighborDown" && (p.neighbors -= 1);
        }
      }, _ = async () => {
        for (; ; ) {
          const b = /* @__PURE__ */ new Date();
          for (const w of p.peers.values()) {
            if (w.id === g) {
              w.lastSeen = b;
              continue;
            }
            const P = (b.getTime() - w.lastSeen.getTime()) / 1e3;
            P > 20 ? w.status = "offline" : P > 10 ? w.status = "away" : w.status = "online";
          }
          await new Promise((w) => setTimeout(w, 1e3));
        }
      };
      return Promise.race([
        f,
        y(),
        _()
      ]), {
        id: a,
        name: u
      };
    }
    getTicket(o, l) {
      const a = this.channels.get(o);
      if (!a) throw new Error("Channel not found");
      return a.channel.ticket(l);
    }
    async closeChannel(o) {
      const l = this.channels.get(o);
      if (!l) throw new Error("Channel not found");
      l.onClose(), this.channels.delete(o);
    }
    async sendMessage(o, l) {
      const a = this.channels.get(o);
      if (!a) throw new Error("Channel not found");
      await a.channel.sender.broadcast(l);
      const d = {
        sender: this.chatNode.node_id(),
        id: Uf(a),
        content: l
      };
      a.messages.push(d);
      const f = Ra(a, d);
      for (const p of a.subscribers) p(f);
    }
    async getMessages(o) {
      const l = this.channels.get(o);
      if (!l) throw new Error("Channel not found");
      return l.messages.map((u) => Ra(l, u));
    }
    async getPeers(o) {
      const l = this.channels.get(o);
      if (!l) throw new Error("Channel not found");
      return Array.from(l.peers.values());
    }
    subscribeToMessages(o, l) {
      const a = this.channels.get(o);
      if (!a) throw new Error("Channel not found");
      return a.subscribers.push(l), () => {
        a.subscribers = a.subscribers.filter((u) => u != l);
      };
    }
    subscribeToNeighbors(o, l) {
      const a = this.channels.get(o);
      if (!a) throw new Error("Channel not found");
      return l(a.neighbors), a.neighborSubscribers.push(l), () => {
        a.neighborSubscribers = a.neighborSubscribers.filter((u) => u != l);
      };
    }
    subscribeToPeers(o, l) {
      const a = setInterval(async () => {
        const u = await this.getPeers(o);
        l(u);
      }, 1e3);
      return () => {
        clearInterval(a);
      };
    }
  }
  function pS(n, o) {
    const l = n.peers.get(o);
    return l && l.name ? l.name : o.substring(0, 8);
  }
  function Ra(n, o) {
    return {
      ...o,
      nickname: pS(n, o.sender)
    };
  }
  function Uf(n) {
    const o = "" + n.nextId;
    return n.nextId = n.nextId + 1, o;
  }
  const At = await iu.create();
  function hS({ channel: n, onClose: o }) {
    const [l, a] = m.useState([]), [u, d] = m.useState(""), [f, p] = m.useState([]), [g, y] = m.useState(0), [_, b] = m.useState(false), [w, P] = m.useState(true), M = m.useRef(null), k = m.useRef(null), R = m.useCallback(() => {
      M.current && M.current.scrollIntoView({
        behavior: "smooth"
      }), b(false), P(true);
    }, []);
    m.useEffect(() => At.subscribeToNeighbors(n, y), [
      n
    ]), m.useEffect(() => {
      const B = async () => {
        try {
          const X = await At.getMessages(n);
          a(X), R();
        } catch (X) {
          Ut.info(`Failed to fetch messages: ${X}`, "error");
        }
      }, V = async () => {
        try {
          const X = await At.getPeers(n);
          p(X);
        } catch (X) {
          Ut.info(`Failed to fetch peers: ${X}`, "error");
        }
      };
      B(), V();
      const K = At.subscribeToMessages(n, (X) => {
        a((le) => {
          if (!le.some((re) => re.id === X.id)) {
            const re = [
              ...le,
              X
            ];
            return w ? setTimeout(R, 0) : b(true), re;
          }
          return le;
        }), Ut.info(`New message received: ${X.content}`, "info");
      }), Y = At.subscribeToPeers(n, (X) => {
        p(X);
      });
      return () => {
        K(), Y();
      };
    }, [
      n,
      w,
      R
    ]);
    const L = async (B) => {
      if (B.preventDefault(), u.trim()) try {
        await At.sendMessage(n, u.trim()), d(""), Ut.info(`Message sent in channel ${n}: ${u.trim()}`, "info");
      } catch (V) {
        Ut.info(`Failed to send message: ${V}`, "error");
      }
    }, W = (B) => {
      navigator.clipboard.writeText(B);
    }, H = (B) => {
      switch (B) {
        case "online":
          return "bg-green-500";
        case "away":
          return "bg-yellow-500";
        case "offline":
          return "bg-red-500";
        default:
          return "bg-gray-500";
      }
    }, O = [
      ...f
    ].sort((B, V) => {
      const K = {
        online: 0,
        away: 1,
        offline: 2
      };
      return K[B.status] - K[V.status];
    }), j = m.useCallback(() => {
      if (k.current) {
        const { scrollTop: B, scrollHeight: V, clientHeight: K } = k.current, Y = B + K >= V - 10;
        P(Y), b(!Y);
      }
    }, []);
    return m.useEffect(() => {
      w && R();
    }, [
      w,
      R
    ]), m.useEffect(() => {
      const B = k.current;
      if (B) return B.addEventListener("scroll", j), () => B.removeEventListener("scroll", j);
    }, [
      j
    ]), x.jsxs("div", {
      className: "flex flex-grow overflow-hidden",
      children: [
        x.jsxs("div", {
          className: "flex-grow flex flex-col p-4 relative",
          children: [
            x.jsxs(No, {
              className: "flex-grow mb-4 border rounded-md p-4",
              ref: k,
              onScroll: j,
              children: [
                l.map((B) => x.jsxs("div", {
                  className: "mb-2",
                  children: [
                    x.jsxs("span", {
                      className: "font-bold",
                      children: [
                        B.nickname || B.sender.substring(0, 8),
                        ": "
                      ]
                    }),
                    B.content
                  ]
                }, B.id)),
                x.jsx("div", {
                  ref: M
                })
              ]
            }),
            _ && x.jsx(Xe, {
              className: "absolute bottom-20 right-4 rounded-full p-2",
              onClick: R,
              size: "icon",
              children: x.jsx(_w, {
                className: "h-4 w-4"
              })
            }),
            x.jsxs("form", {
              onSubmit: L,
              className: "flex space-x-2",
              children: [
                x.jsx(Mo, {
                  value: u,
                  onChange: (B) => d(B.target.value),
                  placeholder: "Type your message...",
                  className: "flex-grow"
                }),
                x.jsx(Xe, {
                  type: "submit",
                  children: "Send"
                })
              ]
            })
          ]
        }),
        x.jsxs("div", {
          className: "w-1/4 p-4 border-l",
          children: [
            x.jsxs("div", {
              className: "mb-4",
              children: [
                x.jsx("h2", {
                  className: "font-bold mb-2",
                  children: "Status"
                }),
                !!g && x.jsxs("p", {
                  children: [
                    "Connected (",
                    g,
                    " neighbors)"
                  ]
                }),
                !g && x.jsx("p", {
                  children: "Waiting for peers"
                })
              ]
            }),
            x.jsx("h2", {
              className: "font-bold mb-2",
              children: "Peers"
            }),
            x.jsx(No, {
              className: "h-[calc(100%-6rem)]",
              children: O.map((B) => x.jsxs(hw, {
                children: [
                  x.jsx(mw, {
                    asChild: true,
                    children: x.jsxs("div", {
                      className: "flex items-center mb-2 cursor-pointer",
                      children: [
                        x.jsx("div", {
                          className: `w-2 h-2 rounded-full mr-2 ${H(B.status)}`
                        }),
                        x.jsx("span", {
                          children: B.name
                        })
                      ]
                    })
                  }),
                  x.jsx(gh, {
                    className: "w-60",
                    children: x.jsxs("div", {
                      className: "space-y-2",
                      children: [
                        x.jsxs("p", {
                          children: [
                            x.jsx("strong", {
                              children: "Last seen:"
                            }),
                            " ",
                            B.lastSeen.toLocaleString()
                          ]
                        }),
                        x.jsxs("div", {
                          children: [
                            x.jsx("strong", {
                              children: "Node ID:"
                            }),
                            x.jsxs("span", {
                              className: "ml-2",
                              children: [
                                B.id.substring(0, 8),
                                "..."
                              ]
                            }),
                            x.jsx(Xe, {
                              size: "sm",
                              onClick: () => W(B.id),
                              className: "ml-2",
                              children: "Copy"
                            })
                          ]
                        })
                      ]
                    })
                  })
                ]
              }, B.id))
            })
          ]
        })
      ]
    });
  }
  function mS({ onMenuClick: n, onInviteClick: o, themeToggle: l, channel: a }) {
    return x.jsxs("header", {
      className: "bg-background text-foreground p-4 flex justify-between items-center",
      children: [
        x.jsx("div", {
          className: "flex items-center",
          children: a && x.jsxs("h1", {
            className: "text-xl font-bold mr-4",
            children: [
              "#",
              a
            ]
          })
        }),
        x.jsxs("div", {
          className: "flex items-center space-x-2",
          children: [
            l,
            a && x.jsxs(Xe, {
              onClick: o,
              variant: "default",
              children: [
                x.jsx(Tw, {
                  className: "w-4 h-4 mr-2"
                }),
                "Invite"
              ]
            }),
            x.jsxs(Xe, {
              onClick: n,
              variant: "secondary",
              children: [
                x.jsx(kw, {
                  className: "w-4 h-4 mr-2"
                }),
                "Logs"
              ]
            })
          ]
        })
      ]
    });
  }
  function gS({ logs: n, onClose: o }) {
    const l = (u) => u.toTimeString().split(" ")[0] + "." + u.getMilliseconds().toString().padStart(3, "0").slice(0, 2), a = (u) => {
      switch (u) {
        case "error":
          return "text-red-500";
        case "warn":
          return "text-yellow-500";
        default:
          return "text-foreground";
      }
    };
    return x.jsx("div", {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center",
      children: x.jsxs("div", {
        className: "bg-background text-foreground p-4 rounded-lg w-full max-w-2xl h-[80vh] flex flex-col",
        children: [
          x.jsx("h2", {
            className: "text-lg font-semibold mb-2",
            children: "Log View"
          }),
          x.jsx(No, {
            className: "flex-grow mb-4 font-mono",
            children: x.jsx("div", {
              className: "space-y-1",
              children: n.map((u, d) => x.jsxs("div", {
                className: `${a(u.level)}`,
                children: [
                  x.jsx("span", {
                    className: "text-muted-foreground",
                    children: l(u.timestamp)
                  }),
                  " ",
                  u.message
                ]
              }, d))
            })
          }),
          x.jsx(Xe, {
            onClick: o,
            children: "Close"
          })
        ]
      })
    });
  }
  function yS({ channels: n, activeChannel: o, onChannelSelect: l, onNewChannel: a }) {
    const [u, d] = m.useState(false);
    return x.jsxs("div", {
      className: `bg-secondary h-full flex flex-col transition-all duration-300 ${u ? "w-12" : "w-64"}`,
      children: [
        x.jsxs("div", {
          className: "p-4 flex justify-between items-center",
          children: [
            !u && x.jsx("h2", {
              className: "text-lg font-semibold",
              children: "Channels"
            }),
            x.jsx(Xe, {
              variant: "ghost",
              size: "icon",
              onClick: () => d(!u),
              children: u ? x.jsx(Sw, {
                className: "h-5 w-5"
              }) : x.jsx(bw, {
                className: "h-5 w-5"
              })
            })
          ]
        }),
        x.jsx(No, {
          className: "flex-grow",
          children: n.map((f) => x.jsxs(Xe, {
            variant: f.id === o ? "secondary" : "ghost",
            className: `w-full justify-start px-4 py-2 ${u ? "px-2" : "px-4"}`,
            onClick: () => l(f.id),
            children: [
              x.jsx(Cw, {
                className: "h-4 w-4 mr-2"
              }),
              !u && f.name
            ]
          }, f.id))
        }),
        x.jsx(Xe, {
          variant: "ghost",
          size: "icon",
          onClick: a,
          className: "m-4",
          children: x.jsx(xw, {
            className: "h-5 w-5"
          })
        })
      ]
    });
  }
  var vS = (n, o, l, a, u, d, f, p) => {
    let g = document.documentElement, y = [
      "light",
      "dark"
    ];
    function _(P) {
      (Array.isArray(n) ? n : [
        n
      ]).forEach((M) => {
        let k = M === "class", R = k && d ? u.map((L) => d[L] || L) : u;
        k ? (g.classList.remove(...R), g.classList.add(P)) : g.setAttribute(M, P);
      }), b(P);
    }
    function b(P) {
      p && y.includes(P) && (g.style.colorScheme = P);
    }
    function w() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    if (a) _(a);
    else try {
      let P = localStorage.getItem(o) || l, M = f && P === "system" ? w() : P;
      _(M);
    } catch {
    }
  }, Vf = [
    "light",
    "dark"
  ], wh = "(prefers-color-scheme: dark)", _S = typeof window > "u", lu = m.createContext(void 0), wS = {
    setTheme: (n) => {
    },
    themes: []
  }, bS = () => {
    var n;
    return (n = m.useContext(lu)) != null ? n : wS;
  }, SS = (n) => m.useContext(lu) ? m.createElement(m.Fragment, null, n.children) : m.createElement(kS, {
    ...n
  }), xS = [
    "light",
    "dark"
  ], kS = ({ forcedTheme: n, disableTransitionOnChange: o = false, enableSystem: l = true, enableColorScheme: a = true, storageKey: u = "theme", themes: d = xS, defaultTheme: f = l ? "system" : "light", attribute: p = "data-theme", value: g, children: y, nonce: _, scriptProps: b }) => {
    let [w, P] = m.useState(() => $f(u, f)), [M, k] = m.useState(() => $f(u)), R = g ? Object.values(g) : d, L = m.useCallback((j) => {
      let B = j;
      if (!B) return;
      j === "system" && l && (B = Gf());
      let V = g ? g[B] : B, K = o ? PS(_) : null, Y = document.documentElement, X = (le) => {
        le === "class" ? (Y.classList.remove(...R), V && Y.classList.add(V)) : le.startsWith("data-") && (V ? Y.setAttribute(le, V) : Y.removeAttribute(le));
      };
      if (Array.isArray(p) ? p.forEach(X) : X(p), a) {
        let le = Vf.includes(f) ? f : null, re = Vf.includes(B) ? B : le;
        Y.style.colorScheme = re;
      }
      K == null ? void 0 : K();
    }, [
      _
    ]), W = m.useCallback((j) => {
      let B = typeof j == "function" ? j(w) : j;
      P(B);
      try {
        localStorage.setItem(u, B);
      } catch {
      }
    }, [
      w
    ]), H = m.useCallback((j) => {
      let B = Gf(j);
      k(B), w === "system" && l && !n && L("system");
    }, [
      w,
      n
    ]);
    m.useEffect(() => {
      let j = window.matchMedia(wh);
      return j.addListener(H), H(j), () => j.removeListener(H);
    }, [
      H
    ]), m.useEffect(() => {
      let j = (B) => {
        B.key === u && (B.newValue ? P(B.newValue) : W(f));
      };
      return window.addEventListener("storage", j), () => window.removeEventListener("storage", j);
    }, [
      W
    ]), m.useEffect(() => {
      L(n ?? w);
    }, [
      n,
      w
    ]);
    let O = m.useMemo(() => ({
      theme: w,
      setTheme: W,
      forcedTheme: n,
      resolvedTheme: w === "system" ? M : w,
      themes: l ? [
        ...d,
        "system"
      ] : d,
      systemTheme: l ? M : void 0
    }), [
      w,
      W,
      n,
      M,
      l,
      d
    ]);
    return m.createElement(lu.Provider, {
      value: O
    }, m.createElement(CS, {
      forcedTheme: n,
      storageKey: u,
      attribute: p,
      enableSystem: l,
      enableColorScheme: a,
      defaultTheme: f,
      value: g,
      themes: d,
      nonce: _,
      scriptProps: b
    }), y);
  }, CS = m.memo(({ forcedTheme: n, storageKey: o, attribute: l, enableSystem: a, enableColorScheme: u, defaultTheme: d, value: f, themes: p, nonce: g, scriptProps: y }) => {
    let _ = JSON.stringify([
      l,
      o,
      d,
      n,
      p,
      f,
      a,
      u
    ]).slice(1, -1);
    return m.createElement("script", {
      ...y,
      suppressHydrationWarning: true,
      nonce: typeof window > "u" ? g : "",
      dangerouslySetInnerHTML: {
        __html: `(${vS.toString()})(${_})`
      }
    });
  }), $f = (n, o) => {
    if (_S) return;
    let l;
    try {
      l = localStorage.getItem(n) || void 0;
    } catch {
    }
    return l || o;
  }, PS = (n) => {
    let o = document.createElement("style");
    return n && o.setAttribute("nonce", n), o.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")), document.head.appendChild(o), () => {
      window.getComputedStyle(document.body), setTimeout(() => {
        document.head.removeChild(o);
      }, 1);
    };
  }, Gf = (n) => (n || (n = window.matchMedia(wh)), n.matches ? "dark" : "light");
  function ES(n) {
    const o = m.useRef({
      value: n,
      previous: n
    });
    return m.useMemo(() => (o.current.value !== n && (o.current.previous = o.current.value, o.current.value = n), o.current.previous), [
      n
    ]);
  }
  var su = "Checkbox", [TS, WS] = fl(su), [RS, MS] = TS(su), bh = m.forwardRef((n, o) => {
    const { __scopeCheckbox: l, name: a, checked: u, defaultChecked: d, required: f, disabled: p, value: g = "on", onCheckedChange: y, form: _, ...b } = n, [w, P] = m.useState(null), M = ot(o, (O) => P(O)), k = m.useRef(false), R = w ? _ || !!w.closest("form") : true, [L = false, W] = Yp({
      prop: u,
      defaultProp: d,
      onChange: y
    }), H = m.useRef(L);
    return m.useEffect(() => {
      const O = w == null ? void 0 : w.form;
      if (O) {
        const j = () => W(H.current);
        return O.addEventListener("reset", j), () => O.removeEventListener("reset", j);
      }
    }, [
      w,
      W
    ]), x.jsxs(RS, {
      scope: l,
      state: L,
      disabled: p,
      children: [
        x.jsx(Ze.button, {
          type: "button",
          role: "checkbox",
          "aria-checked": Mn(L) ? "mixed" : L,
          "aria-required": f,
          "data-state": kh(L),
          "data-disabled": p ? "" : void 0,
          disabled: p,
          value: g,
          ...b,
          ref: M,
          onKeyDown: Ge(n.onKeyDown, (O) => {
            O.key === "Enter" && O.preventDefault();
          }),
          onClick: Ge(n.onClick, (O) => {
            W((j) => Mn(j) ? true : !j), R && (k.current = O.isPropagationStopped(), k.current || O.stopPropagation());
          })
        }),
        R && x.jsx(NS, {
          control: w,
          bubbles: !k.current,
          name: a,
          value: g,
          checked: L,
          required: f,
          disabled: p,
          form: _,
          style: {
            transform: "translateX(-100%)"
          },
          defaultChecked: Mn(d) ? false : d
        })
      ]
    });
  });
  bh.displayName = su;
  var Sh = "CheckboxIndicator", xh = m.forwardRef((n, o) => {
    const { __scopeCheckbox: l, forceMount: a, ...u } = n, d = MS(Sh, l);
    return x.jsx(jn, {
      present: a || Mn(d.state) || d.state === true,
      children: x.jsx(Ze.span, {
        "data-state": kh(d.state),
        "data-disabled": d.disabled ? "" : void 0,
        ...u,
        ref: o,
        style: {
          pointerEvents: "none",
          ...n.style
        }
      })
    });
  });
  xh.displayName = Sh;
  var NS = (n) => {
    const { control: o, checked: l, bubbles: a = true, defaultChecked: u, ...d } = n, f = m.useRef(null), p = ES(l), g = Dp(o);
    m.useEffect(() => {
      const _ = f.current, b = window.HTMLInputElement.prototype, P = Object.getOwnPropertyDescriptor(b, "checked").set;
      if (p !== l && P) {
        const M = new Event("click", {
          bubbles: a
        });
        _.indeterminate = Mn(l), P.call(_, Mn(l) ? false : l), _.dispatchEvent(M);
      }
    }, [
      p,
      l,
      a
    ]);
    const y = m.useRef(Mn(l) ? false : l);
    return x.jsx("input", {
      type: "checkbox",
      "aria-hidden": true,
      defaultChecked: u ?? y.current,
      ...d,
      tabIndex: -1,
      ref: f,
      style: {
        ...n.style,
        ...g,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0
      }
    });
  };
  function Mn(n) {
    return n === "indeterminate";
  }
  function kh(n) {
    return Mn(n) ? "indeterminate" : n ? "checked" : "unchecked";
  }
  var Ch = bh, AS = xh;
  const rl = m.forwardRef(({ className: n, ...o }, l) => x.jsx(Ch, {
    ref: l,
    className: Xn("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", n),
    ...o,
    children: x.jsx(AS, {
      className: Xn("flex items-center justify-center text-current"),
      children: x.jsx(ww, {
        className: "h-4 w-4"
      })
    })
  }));
  rl.displayName = Ch.displayName;
  function Kf(n) {
    const o = new URL(document.location.toString());
    return o.searchParams.set("ticket", n), o.toString();
  }
  function LS({ onClose: n, channel: o, getTicket: l }) {
    const [a, u] = m.useState({
      includeMyself: true,
      includeBootstrap: true,
      includeNeighbors: false
    }), d = m.useMemo(() => l(a), [
      a,
      o
    ]), f = m.useRef(null);
    function p(y) {
      navigator.clipboard.writeText(y);
    }
    const g = `cargo run -- join ${d}`;
    return x.jsx("div", {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
      children: x.jsxs("div", {
        className: "bg-background text-foreground p-6 rounded-lg w-full max-w-md shadow-lg border-2 border-primary/10",
        children: [
          x.jsx("h2", {
            className: "text-xl font-semibold mb-4",
            children: "Invite to Channel"
          }),
          x.jsxs("div", {
            className: "mb-4",
            children: [
              x.jsx("p", {
                className: "font-semibold mb-2",
                children: "Ticket:"
              }),
              x.jsxs("div", {
                className: "flex items-center",
                children: [
                  x.jsxs("span", {
                    className: "mr-2",
                    children: [
                      d.substring(0, 8),
                      "..."
                    ]
                  }),
                  x.jsxs(Xe, {
                    variant: "outline",
                    size: "sm",
                    onClick: () => p(d),
                    children: [
                      x.jsx(Bf, {
                        className: "w-4 h-4 mr-2"
                      }),
                      "Copy"
                    ]
                  })
                ]
              })
            ]
          }),
          x.jsxs("div", {
            className: "mb-4",
            children: [
              x.jsx("p", {
                className: "font-semibold mb-2",
                children: "Join Link:"
              }),
              x.jsxs("a", {
                href: Kf(d),
                className: "text-blue-500 hover:underline",
                target: "_blank",
                children: [
                  Kf(d.substring(0, 8)),
                  "..."
                ]
              })
            ]
          }),
          x.jsxs("div", {
            className: "mb-4",
            children: [
              x.jsx("p", {
                className: "font-semibold mb-2",
                children: "Join from CLI:"
              }),
              x.jsx(Mo, {
                ref: f,
                value: g,
                readOnly: true,
                className: "mb-2",
                onClick: () => {
                  var _a2;
                  return (_a2 = f.current) == null ? void 0 : _a2.select();
                }
              }),
              x.jsxs(Xe, {
                variant: "outline",
                size: "sm",
                onClick: () => p(g),
                children: [
                  x.jsx(Bf, {
                    className: "w-4 h-4 mr-2"
                  }),
                  "Copy to Clipboard"
                ]
              })
            ]
          }),
          x.jsxs("div", {
            className: "mb-4",
            children: [
              x.jsx("h3", {
                className: "font-semibold mb-2",
                children: "Configure Ticket:"
              }),
              x.jsxs("div", {
                className: "space-y-2",
                children: [
                  x.jsxs("div", {
                    className: "flex items-center",
                    children: [
                      x.jsx(rl, {
                        id: "include-myself",
                        checked: a.includeMyself,
                        onCheckedChange: (y) => u({
                          ...a,
                          includeMyself: !!y
                        })
                      }),
                      x.jsx("label", {
                        htmlFor: "include-myself",
                        className: "ml-2",
                        children: "Include myself"
                      })
                    ]
                  }),
                  x.jsxs("div", {
                    className: "flex items-center",
                    children: [
                      x.jsx(rl, {
                        id: "include-bootstrap",
                        checked: a.includeBootstrap,
                        onCheckedChange: (y) => u({
                          ...a,
                          includeBootstrap: !!y
                        })
                      }),
                      x.jsx("label", {
                        htmlFor: "include-bootstrap",
                        className: "ml-2",
                        children: "Include my bootstrap"
                      })
                    ]
                  }),
                  x.jsxs("div", {
                    className: "flex items-center",
                    children: [
                      x.jsx(rl, {
                        id: "include-neighbors",
                        checked: a.includeNeighbors,
                        onCheckedChange: (y) => u({
                          ...a,
                          includeNeighbors: !!y
                        })
                      }),
                      x.jsx("label", {
                        htmlFor: "include-neighbors",
                        className: "ml-2",
                        children: "Include my current neighbors"
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          x.jsx("div", {
            className: "flex justify-end",
            children: x.jsx(Xe, {
              onClick: n,
              children: "Close"
            })
          })
        ]
      })
    });
  }
  const Qf = [
    "aback",
    "abaft",
    "abandoned",
    "abashed",
    "aberrant",
    "abhorren",
    "abiding",
    "abject",
    "ablaze",
    "able",
    "abnormal",
    "aboard",
    "aboriginal",
    "abortive",
    "abounding",
    "abrasive",
    "abrupt",
    "absent",
    "absorbed",
    "absorbing",
    "abstracted",
    "absurd",
    "abundant",
    "abusive",
    "acceptable",
    "accessible",
    "accidental",
    "accurate",
    "acid",
    "acidic",
    "acoustic",
    "acrid",
    "actually",
    "ad hoc",
    "adamant",
    "adaptable",
    "addicted",
    "adhesive",
    "adjoining",
    "adorable",
    "adventurous",
    "afraid",
    "aggressive",
    "agonizing",
    "agreeable",
    "ahead",
    "ajar",
    "alcoholic",
    "alert",
    "alike",
    "alive",
    "alleged",
    "alluring",
    "aloof",
    "amazing",
    "ambiguous",
    "ambitious",
    "amuck",
    "amused",
    "amusing",
    "ancient",
    "angry",
    "animated",
    "annoyed",
    "annoying",
    "anxious",
    "apathetic",
    "aquatic",
    "aromatic",
    "arrogant",
    "ashamed",
    "aspiring",
    "assorted",
    "astonishing",
    "attractive",
    "auspicious",
    "automatic",
    "available",
    "average",
    "awake",
    "aware",
    "awesome",
    "awful",
    "axiomatic",
    "bad",
    "barbarous",
    "bashful",
    "bawdy",
    "beautiful",
    "befitting",
    "belligerent",
    "beneficial",
    "bent",
    "berserk",
    "best",
    "better",
    "bewildered",
    "big",
    "billowy",
    "bite-sized",
    "bitter",
    "bizarre",
    "black",
    "black-and-white",
    "bloody",
    "blue",
    "blue-eye",
    "blushing",
    "boiling",
    "boorish",
    "bored",
    "boring",
    "bouncy",
    "boundless",
    "brainy",
    "brash",
    "brave",
    "brawny",
    "breakable",
    "breezy",
    "brief",
    "bright",
    "broad",
    "broken",
    "brown",
    "bumpy",
    "burly",
    "bustling",
    "busy",
    "cagey",
    "calculating",
    "callous",
    "calm",
    "capable",
    "capricious",
    "careful",
    "careless",
    "caring",
    "cautious",
    "ceaseless",
    "certain",
    "changeable",
    "charming",
    "cheap",
    "cheerful",
    "chemical",
    "chief",
    "childlike",
    "chilly",
    "chivalrous",
    "chubby",
    "chunky",
    "clammy",
    "classy",
    "clean",
    "clear",
    "clever",
    "cloistered",
    "cloudy",
    "closed",
    "clumsy",
    "cluttered",
    "coherent",
    "cold",
    "colorful",
    "colossal",
    "combative",
    "comfortable",
    "common",
    "complete",
    "complex",
    "concerned",
    "condemned",
    "confused",
    "conscious",
    "cooing",
    "cool",
    "cooperative",
    "coordinated",
    "courageous",
    "cowardly",
    "crabby",
    "craven",
    "crazy",
    "creepy",
    "crooked",
    "crowded",
    "cruel",
    "cuddly",
    "cultured",
    "cumbersome",
    "curious",
    "curly",
    "curved",
    "curvy",
    "cut",
    "cute",
    "cynical",
    "daffy",
    "daily",
    "damaged",
    "damaging",
    "damp",
    "dangerous",
    "dapper",
    "dark",
    "dashing",
    "dazzling",
    "dead",
    "deadpan",
    "deafening",
    "dear",
    "debonair",
    "decisive",
    "decorous",
    "deep",
    "deeply",
    "defeated",
    "defective",
    "defiant",
    "delicate",
    "delicious",
    "delightful",
    "demonic",
    "delirious",
    "dependent",
    "depressed",
    "deranged",
    "descriptive",
    "deserted",
    "detailed",
    "determined",
    "devilish",
    "didactic",
    "different",
    "difficult",
    "diligent",
    "direful",
    "dirty",
    "disagreeable",
    "disastrous",
    "discreet",
    "disgusted",
    "disgusting",
    "disillusioned",
    "dispensable",
    "distinct",
    "disturbed",
    "divergent",
    "dizzy",
    "domineering",
    "doubtful",
    "drab",
    "draconian",
    "dramatic",
    "dreary",
    "drunk",
    "dry",
    "dull",
    "dusty",
    "dynamic",
    "dysfunctional",
    "eager",
    "early",
    "earsplitting",
    "earthy",
    "easy",
    "eatable",
    "economic",
    "educated",
    "efficacious",
    "efficient",
    "eight",
    "elastic",
    "elated",
    "elderly",
    "electric",
    "elegant",
    "elfin",
    "elite",
    "embarrassed",
    "eminent",
    "empty",
    "enchanted",
    "enchanting",
    "encouraging",
    "endurable",
    "energetic",
    "enormous",
    "entertaining",
    "enthusiastic",
    "envious",
    "equable",
    "equal",
    "erect",
    "erratic",
    "ethereal",
    "evanescent",
    "evasive",
    "even",
    "excellent",
    "excited",
    "exciting",
    "exclusive",
    "exotic",
    "expensive",
    "extra-large",
    "extra-small",
    "exuberant",
    "exultant",
    "fabulous",
    "faded",
    "faint",
    "fair",
    "faithful",
    "fallacious",
    "false",
    "familiar",
    "famous",
    "fanatical",
    "fancy",
    "fantastic",
    "far",
    "far-flung",
    "fascinated",
    "fast",
    "fat",
    "faulty",
    "fearful",
    "fearless",
    "feeble",
    "feigned",
    "female",
    "fertile",
    "festive",
    "few",
    "fierce",
    "filthy",
    "fine",
    "finicky",
    "first",
    "five",
    "fixed",
    "flagrant",
    "flaky",
    "flashy",
    "flat",
    "flawless",
    "flimsy",
    "flippant",
    "flowery",
    "fluffy",
    "fluttering",
    "foamy",
    "foolish",
    "foregoing",
    "forgetful",
    "fortunate",
    "four",
    "frail",
    "fragile",
    "frantic",
    "free",
    "freezing",
    "frequent",
    "fresh",
    "fretful",
    "friendly",
    "frightened",
    "frightening",
    "full",
    "fumbling",
    "functional",
    "funny",
    "furry",
    "furtive",
    "future",
    "futuristic",
    "fuzzy",
    "gabby",
    "gainful",
    "gamy",
    "gaping",
    "garrulous",
    "gaudy",
    "general",
    "gentle",
    "giant",
    "giddy",
    "gifted",
    "gigantic",
    "glamorous",
    "gleaming",
    "glib",
    "glistening",
    "glorious",
    "glossy",
    "godly",
    "good",
    "goofy",
    "gorgeous",
    "graceful",
    "grandiose",
    "grateful",
    "gratis",
    "gray",
    "greasy",
    "great",
    "greedy",
    "green",
    "grey",
    "grieving",
    "groovy",
    "grotesque",
    "grouchy",
    "grubby",
    "gruesome",
    "grumpy",
    "guarded",
    "guiltless",
    "gullible",
    "gusty",
    "guttural",
    "habitual",
    "half",
    "hallowed",
    "halting",
    "handsome",
    "handsomely",
    "handy",
    "hanging",
    "hapless",
    "happy",
    "hard",
    "hard-to-find",
    "harmonious",
    "harsh",
    "hateful",
    "heady",
    "healthy",
    "heartbreaking",
    "heavenly",
    "heavy",
    "hellish",
    "helpful",
    "helpless",
    "hesitant",
    "hideous",
    "high",
    "highfalutin",
    "high-pitched",
    "hilarious",
    "hissing",
    "historical",
    "holistic",
    "hollow",
    "homeless",
    "homely",
    "honorable",
    "horrible",
    "hospitable",
    "hot",
    "huge",
    "hulking",
    "humdrum",
    "humorous",
    "hungry",
    "hurried",
    "hurt",
    "hushed",
    "husky",
    "hypnotic",
    "hysterical",
    "icky",
    "icy",
    "idiotic",
    "ignorant",
    "ill",
    "illegal",
    "ill-fated",
    "ill-informed",
    "illustrious",
    "imaginary",
    "immense",
    "imminent",
    "impartial",
    "imperfect",
    "impolite",
    "important",
    "imported",
    "impossible",
    "incandescent",
    "incompetent",
    "inconclusive",
    "industrious",
    "incredible",
    "inexpensive",
    "infamous",
    "innate",
    "innocent",
    "inquisitive",
    "insidious",
    "instinctive",
    "intelligent",
    "interesting",
    "internal",
    "invincible",
    "irate",
    "irritating",
    "itchy",
    "aded",
    "jagged",
    "jazzy",
    "jealous",
    "jittery",
    "jobless",
    "jolly",
    "joyous",
    "judicious",
    "juicy",
    "jumbled",
    "jumpy",
    "juvenile",
    "kaput",
    "keen",
    "kind",
    "kindhearted",
    "kindly",
    "knotty",
    "knowing",
    "knowledgeable",
    "known",
    "labored",
    "lackadaisical",
    "lacking",
    "lame",
    "lamentable",
    "languid",
    "large",
    "last",
    "late",
    "laughable",
    "lavish",
    "lazy",
    "lean",
    "learned",
    "left",
    "legal",
    "lethal",
    "level",
    "lewd",
    "light",
    "like",
    "likeable",
    "limping",
    "literate",
    "little",
    "lively",
    "lively",
    "living",
    "lonely",
    "long",
    "longing",
    "long-term",
    "loose",
    "lopsided",
    "loud",
    "loutish",
    "lovely",
    "loving",
    "low",
    "lowly",
    "lucky",
    "ludicrous",
    "lumpy",
    "lush",
    "luxuriant",
    "lying",
    "lyrical",
    "macabre",
    "macho",
    "maddening",
    "madly",
    "magenta",
    "magical",
    "magnificent",
    "majestic",
    "makeshift",
    "male",
    "malicious",
    "mammoth",
    "maniacal",
    "many",
    "marked",
    "massive",
    "married",
    "marvelous",
    "material",
    "materialistic",
    "mature",
    "mean",
    "measly",
    "meaty",
    "medical",
    "meek",
    "mellow",
    "melodic",
    "melted",
    "merciful",
    "mere",
    "messy",
    "mighty",
    "military",
    "milky",
    "mindless",
    "miniature",
    "minor",
    "miscreant",
    "misty",
    "mixed",
    "moaning",
    "modern",
    "moldy",
    "momentous",
    "motionless",
    "mountainous",
    "muddled",
    "mundane",
    "murky",
    "mushy",
    "mute",
    "mysterious",
    "naive",
    "nappy",
    "narrow",
    "nasty",
    "natural",
    "naughty",
    "nauseating",
    "near",
    "neat",
    "nebulous",
    "necessary",
    "needless",
    "needy",
    "neighborly",
    "nervous",
    "new",
    "next",
    "nice",
    "nifty",
    "nimble",
    "nine",
    "nippy",
    "noiseless",
    "noisy",
    "nonchalant",
    "nondescript",
    "nonstop",
    "normal",
    "nostalgic",
    "nosy",
    "noxious",
    "null",
    "numberless",
    "numerous",
    "nutritious",
    "nutty",
    "oafish",
    "obedient",
    "obeisant",
    "obese",
    "obnoxious",
    "obscene",
    "obsequious",
    "observant",
    "obsolete",
    "obtainable",
    "oceanic",
    "odd",
    "offbeat",
    "old",
    "old-fashioned",
    "omniscient",
    "one",
    "onerous",
    "open",
    "opposite",
    "optimal",
    "orange",
    "ordinary",
    "organic",
    "ossified",
    "outgoing",
    "outrageous",
    "outstanding",
    "oval",
    "overconfident",
    "overjoyed",
    "overrated",
    "overt",
    "overwrought",
    "painful",
    "painstaking",
    "pale",
    "paltry",
    "panicky",
    "panoramic",
    "parallel",
    "parched",
    "parsimonious",
    "past",
    "pastoral",
    "pathetic",
    "peaceful",
    "penitent",
    "perfect",
    "periodic",
    "permissible",
    "perpetual",
    "petite",
    "phobic",
    "physical",
    "picayune",
    "pink",
    "piquant",
    "placid",
    "plain",
    "plant",
    "plastic",
    "plausible",
    "pleasant",
    "plucky",
    "pointless",
    "poised",
    "polite",
    "political",
    "poor",
    "possessive",
    "possible",
    "powerful",
    "precious",
    "premium",
    "present",
    "pretty",
    "previous",
    "pricey",
    "prickly",
    "private",
    "probable",
    "productive",
    "profuse",
    "protective",
    "proud",
    "psychedelic",
    "psychotic",
    "public",
    "puffy",
    "pumped",
    "puny",
    "purple",
    "purring",
    "pushy",
    "puzzled",
    "puzzling",
    "quack",
    "quaint",
    "quarrelsome",
    "questionable",
    "quick",
    "quickest",
    "quiet",
    "quirky",
    "quixotic",
    "quizzical",
    "rabid",
    "racial",
    "ragged",
    "rainy",
    "rambunctious",
    "rampant",
    "rapid",
    "rare",
    "raspy",
    "ratty",
    "ready",
    "real",
    "rebel",
    "receptive",
    "recondite",
    "red",
    "redundant",
    "reflective",
    "regular",
    "relieved",
    "remarkable",
    "reminiscent",
    "repulsive",
    "resolute",
    "resonant",
    "responsible",
    "rhetorical",
    "rich",
    "right",
    "righteous",
    "rightful",
    "rigid",
    "ripe",
    "ritzy",
    "roasted",
    "robust",
    "romantic",
    "roomy",
    "rotten",
    "rough",
    "round",
    "royal",
    "ruddy",
    "rude",
    "rural",
    "rustic",
    "ruthless",
    "sable",
    "sad",
    "safe",
    "salty",
    "same",
    "sassy",
    "satisfying",
    "savory",
    "scandalous",
    "scarce",
    "scared",
    "scary",
    "scattered",
    "scientific",
    "scintillating",
    "scrawny",
    "screeching",
    "second",
    "second-hand",
    "secret",
    "secretive",
    "sedate",
    "seemly",
    "selective",
    "selfish",
    "separate",
    "serious",
    "shaggy",
    "shaky",
    "shallow",
    "sharp",
    "shiny",
    "shivering",
    "shocking",
    "short",
    "shrill",
    "shut",
    "shy",
    "sick",
    "silent",
    "silent",
    "silky",
    "silly",
    "simple",
    "simplistic",
    "sincere",
    "six",
    "skillful",
    "skinny",
    "sleepy",
    "slim",
    "slimy",
    "slippery",
    "sloppy",
    "slow",
    "small",
    "smart",
    "smelly",
    "smiling",
    "smoggy",
    "smooth",
    "sneaky",
    "snobbish",
    "snotty",
    "soft",
    "soggy",
    "solid",
    "somber",
    "sophisticated",
    "sordid",
    "sore",
    "sour",
    "sparkling",
    "special",
    "spectacular",
    "spicy",
    "spiffy",
    "spiky",
    "spiritual",
    "spiteful",
    "splendid",
    "spooky",
    "spotless",
    "spotted",
    "spotty",
    "spurious",
    "squalid",
    "square",
    "squealing",
    "squeamish",
    "staking",
    "stale",
    "standing",
    "statuesque",
    "steadfast",
    "steady",
    "steep",
    "stereotyped",
    "sticky",
    "stiff",
    "stimulating",
    "stingy",
    "stormy",
    "straight",
    "strange",
    "striped",
    "strong",
    "stupendous",
    "stupid",
    "sturdy",
    "subdued",
    "subsequent",
    "substantial",
    "successful",
    "succinct",
    "sudden",
    "sulky",
    "super",
    "superb",
    "superficial",
    "supreme",
    "swanky",
    "sweet",
    "sweltering",
    "swift",
    "symptomatic",
    "synonymous",
    "taboo",
    "tacit",
    "tacky",
    "talented",
    "tall",
    "tame",
    "tan",
    "tangible",
    "tangy",
    "tart",
    "tasteful",
    "tasteless",
    "tasty",
    "tawdry",
    "tearful",
    "tedious",
    "teeny",
    "teeny-tiny",
    "telling",
    "temporary",
    "ten",
    "tender",
    "tense",
    "tense",
    "tenuous",
    "terrible",
    "terrific",
    "tested",
    "testy",
    "thankful",
    "therapeutic",
    "thick",
    "thin",
    "thinkable",
    "third",
    "thirsty",
    "thirsty",
    "thoughtful",
    "thoughtless",
    "threatening",
    "three",
    "thundering",
    "tidy",
    "tight",
    "tightfisted",
    "tiny",
    "tired",
    "tiresome",
    "toothsome",
    "torpid",
    "tough",
    "towering",
    "tranquil",
    "trashy",
    "tremendous",
    "tricky",
    "trite",
    "troubled",
    "truculent",
    "true",
    "truthful",
    "two",
    "typical",
    "ubiquitous",
    "ugliest",
    "ugly",
    "ultra",
    "unable",
    "unaccountable",
    "unadvised",
    "unarmed",
    "unbecoming",
    "unbiased",
    "uncovered",
    "understood",
    "undesirable",
    "unequal",
    "unequaled",
    "uneven",
    "unhealthy",
    "uninterested",
    "unique",
    "unkempt",
    "unknown",
    "unnatural",
    "unruly",
    "unsightly",
    "unsuitable",
    "untidy",
    "unused",
    "unusual",
    "unwieldy",
    "unwritten",
    "upbeat",
    "uppity",
    "upset",
    "uptight",
    "used",
    "useful",
    "useless",
    "utopian",
    "utter",
    "uttermost",
    "vacuous",
    "vagabond",
    "vague",
    "valuable",
    "various",
    "vast",
    "vengeful",
    "venomous",
    "verdant",
    "versed",
    "victorious",
    "vigorous",
    "violent",
    "violet",
    "vivacious",
    "voiceless",
    "volatile",
    "voracious",
    "vulgar",
    "wacky",
    "waggish",
    "waiting",
    "wakeful",
    "wandering",
    "wanting",
    "warlike",
    "warm",
    "wary",
    "wasteful",
    "watery",
    "weak",
    "wealthy",
    "weary",
    "well-groomed",
    "well-made",
    "well-off",
    "well-to-do",
    "wet",
    "whimsical",
    "whispering",
    "white",
    "whole",
    "wholesale",
    "wicked",
    "wide",
    "wide-eyed",
    "wiggly",
    "wild",
    "willing",
    "windy",
    "wiry",
    "wise",
    "wistful",
    "witty",
    "woebegone",
    "womanly",
    "wonderful",
    "wooden",
    "woozy",
    "workable",
    "worried",
    "worthless",
    "wrathful",
    "wretched",
    "wrong",
    "wry",
    "xenophobic",
    "yellow",
    "yielding",
    "young",
    "youthful",
    "yummy",
    "zany",
    "zealous",
    "zesty",
    "zippy",
    "zonked"
  ], OS = [
    "Alligator",
    "Anchovy",
    "Angler",
    "Anole",
    "Armadillo",
    "Badger",
    "Barracuda",
    "Bass",
    "Bat",
    "Bear",
    "Beaver",
    "Betta",
    "Bison",
    "Blackbird",
    "Bluebird",
    "Bobcat",
    "Bobolink",
    "Bufflehead",
    "Bunting",
    "Carp",
    "Catbird",
    "Catfish",
    "Chameleon",
    "Cheetah",
    "Chickadee",
    "Chipmunk",
    "Chub",
    "Cod",
    "Coot",
    "Cormorant",
    "Cottonmouth",
    "Coyote",
    "Crane",
    "Creeper",
    "Croaker",
    "Crocodile",
    "Crow",
    "Cuckoo",
    "Dog",
    "Dogfish",
    "Dolphin",
    "Dove",
    "Dragon",
    "Duck",
    "Eagle",
    "Eel",
    "Elephant",
    "Elk",
    "Emu",
    "Finch",
    "Flounder",
    "Flycatcher",
    "Fox",
    "Gecko",
    "Gnatcatcher",
    "Goatfish",
    "Goose",
    "Gopher",
    "Gorilla",
    "Grouper",
    "Guppy",
    "Hagfish",
    "Halibut",
    "Harrier",
    "Hawk",
    "Heron",
    "Herring",
    "Houndshark",
    "Hummingbird",
    "Ibis",
    "Iguana",
    "Jackrabbit",
    "Jay",
    "Kangaroo",
    "Kingfisher",
    "Kinglet",
    "Kite",
    "Lamprey",
    "Lark",
    "Lemur",
    "Lion",
    "Loon",
    "Mackerel",
    "Magpie",
    "Mallard",
    "Manatee",
    "Marmot",
    "Merganser",
    "Minnow",
    "Monitor",
    "Monkey",
    "Mouse",
    "Mudskipper",
    "Mullet",
    "Muskrat",
    "Nighthawk",
    "Opah",
    "Opossum",
    "Oriole",
    "Osprey",
    "Owl",
    "Pelican",
    "Pheasant",
    "Phoebe",
    "Pickerel",
    "Pintail",
    "Porcupine",
    "Prairie Dog",
    "Pronghorn",
    "Pupfish",
    "Raccoon",
    "Rat",
    "Rattlesnake",
    "Ray",
    "Roach",
    "Robin",
    "Salmon",
    "Sandpiper",
    "Sapsucker",
    "Scat",
    "Seal",
    "Sea Lion",
    "Shad",
    "Shark",
    "Sheep",
    "Shiner",
    "Shrew",
    "Skate",
    "Skink",
    "Skunk",
    "Snipe",
    "Snoek",
    "Sparrow",
    "Spookfish",
    "Squirrel",
    "Stargazer",
    "Starling",
    "Stoat",
    "Stonecat",
    "Sucker",
    "Swampfish",
    "Sweeper",
    "Swift",
    "Tapetail",
    "Tarpon",
    "Teal",
    "Tegu",
    "Tench",
    "Tetra",
    "Thrasher",
    "Thrush",
    "Tiger",
    "Toadfish",
    "Tortoise",
    "Trout",
    "Tuna",
    "Turtle",
    "Unicorn",
    "Viper",
    "Vireo",
    "Vole",
    "Vulture",
    "Wahoo",
    "Walrus",
    "Warbler",
    "Waxwing",
    "Weasel",
    "Weever",
    "Whale",
    "Whiff",
    "Wigeon",
    "Willet",
    "Wobbegong",
    "Wood-pewee",
    "Woodpecker",
    "Wren",
    "Yellowtail",
    "Zander",
    "Zebra",
    "Zingel"
  ], jS = [
    "Abbot",
    "Acater",
    "Accipitary",
    "Accomptant",
    "Accoucheur",
    "Accountant",
    "Accoutre",
    "Accoutrement Maker",
    "Ackerman",
    "Actor",
    "Actuary",
    "Administrator",
    "Adventurer",
    "Archaeologist",
    "Agent",
    "Agriculturist",
    "Airman",
    "Alabasterer",
    "Alchemist",
    "Ale Conner",
    "Ale Draper",
    "Ale Taster",
    "Ale Tunner",
    "Alewife",
    "Alienist",
    "All Spice",
    "Almoner",
    "Almsman",
    "Alnager",
    "Amanuensis",
    "Amber Cutter",
    "Anaesthetist",
    "Anchor Smith",
    "Anchorite",
    "Anchorman",
    "Animal Trainer",
    "Animator",
    "Ankle Beater",
    "Annatto Maker",
    "Anthropologist",
    "Antigropelos Maker",
    "Antiquarian",
    "Anvil Smith",
    "Apiariana",
    "Apothecary",
    "Apprentice",
    "Apronman",
    "Aquavita Seller",
    "Arbalestier",
    "Arbiter",
    "Archaeologist",
    "Archbishop",
    "Archer",
    "Archiator",
    "Architect",
    "Archivist",
    "Argolet",
    "Arkwright",
    "Armiger",
    "Armorer",
    "Army Reservist",
    "Army Scout",
    "Arpenteur",
    "Art Deco Designer",
    "Artificer",
    "Artisan",
    "Artist",
    "Ashman",
    "Assay Master",
    "Assayer",
    "Astrobiologist",
    "Astrologer",
    "Astronaut",
    "Astronomer",
    "Athletic Trainer",
    "Attendent",
    "Auger Maker",
    "Aulnager",
    "Aurifaber",
    "Aurifex",
    "Author",
    "Automobile Salesman",
    "Automotive Mechanic",
    "Avenator",
    "Aviation Pioneer",
    "Avowry",
    "Axle Tree Turner",
    "Babysitter",
    "Backmaker",
    "Backster",
    "Badger",
    "Badgy Fiddler",
    "Bagger",
    "Bagman",
    "Bagniokeeper",
    "Bailiff",
    "Bairman",
    "Baker",
    "Balancemaker",
    "Balancer",
    "Baler",
    "Ballad Monger",
    "Ballast Heaver",
    "Baller Up",
    "Band Filer",
    "Bandit",
    "Bandito",
    "Bandster",
    "Bang Beggar",
    "Bank Robber",
    "Bank Teller",
    "Banker",
    "Banks Man",
    "Banqueter",
    "Barber",
    "Bard",
    "Bargeman",
    "Barkeeper",
    "Barker",
    "Barkman",
    "Barm Brewer",
    "Barrel Filer",
    "Barrister",
    "Bartender",
    "Bartoner",
    "Baseball Player",
    "Basil Worker",
    "Basketmaker",
    "Basketman",
    "Bassoonist",
    "Bath Attendent",
    "Bather",
    "Batman",
    "Bawd",
    "Baxter",
    "Bayweaver",
    "Beadle",
    "Beamster",
    "Bear-Ward",
    "Bearleader",
    "Beauty Queen",
    "Beaver",
    "Bedder",
    "Bedman",
    "Bedweaver",
    "Beekeeper",
    "Beer Seller",
    "Beerbrewer",
    "Beeskepmaker",
    "Beggar",
    "Beguine",
    "Bell Founder",
    "Bell Hanger",
    "Bell Ringer",
    "Bellfounder",
    "Bellhop",
    "Bellmaker",
    "Bellman",
    "Bellowfarmer",
    "Bellows Maker",
    "Belly Builder",
    "Bender",
    "Berner",
    "Besom Maker",
    "Bibliothecary",
    "Bid-Stand",
    "Biddy",
    "Bill Poster",
    "Billier",
    "Binder",
    "Biologist",
    "Bird Boy",
    "Bird Catcher",
    "Birds Nest Seller",
    "Bishop",
    "Black Borderer",
    "Blacking Maker",
    "Blacksmith-Armorer",
    "Blacksmith",
    "Bladesmith",
    "Bleacher",
    "Blemmere",
    "Block Maker",
    "Block Printer",
    "Blockcutter",
    "Bloodletter",
    "Bloomer",
    "Blower",
    "Bluestocking",
    "Bluffer",
    "Boarding Officer",
    "Boardwright",
    "Boatman",
    "Boatswain",
    "Boatwright",
    "Bobber",
    "Bocher",
    "Bodger",
    "Bodyguard",
    "Bodyservant",
    "Boilermaker",
    "Bolter",
    "Bondager",
    "Bondman",
    "Bone Button Turner",
    "Bone Lace Maker",
    "Bone Picker",
    "Bonecarver",
    "Bonesetter",
    "Boniface",
    "Book Guilder",
    "Bookbinder",
    "Bookkeeper",
    "Bookprinter",
    "Bookseller",
    "Boonmaster",
    "Boot Closer",
    "Boot-Catcher",
    "Bootbinder",
    "Boothaler",
    "Boothman",
    "Bootlegger",
    "Borlera",
    "Botanist",
    "Botcher",
    "Bottelier",
    "Bottle Boy",
    "Bouncer",
    "Bounty Hunter",
    "Bowler",
    "Bowlman",
    "Bowman",
    "Bowyer",
    "Brabener",
    "Brachygrapher",
    "Brakesman",
    "Brasiator",
    "Brass Cutter",
    "Brass Finisher",
    "Brass Founder",
    "Brayer",
    "Brazier",
    "Breechesmaker",
    "Brewer",
    "Brewster",
    "Brickburner",
    "Bricker",
    "Bricklayer",
    "Brickmaker",
    "Brickman",
    "Bridgeman",
    "Brightsmith",
    "Broderer",
    "Brogger",
    "Broiderer",
    "Bronzefounder",
    "Broom Dasher",
    "Broom Squire",
    "Broom-Dasher",
    "Browderer",
    "Brownsmith",
    "Brushbinder",
    "Buck Washer",
    "Bucklesmith",
    "Buffoon",
    "Builder",
    "Bullwhacker",
    "Bumboat Man",
    "Bunter",
    "Burglar",
    "Burgomaster",
    "Burler",
    "Burmaiden",
    "Buryeman",
    "Busheler",
    "Business",
    "Businessman",
    "Busker",
    "Buss Maker",
    "Butcher",
    "Butler",
    "Butner",
    "Button Burni",
    "Buttonmaker",
    "Cab Driver",
    "Cabbie",
    "Cabinetmaker",
    "Cad",
    "Caddy Butche",
    "Cadger",
    "Cainer",
    "Calciner",
    "Calculator",
    "Calender",
    "Calligrapher",
    "Cambist",
    "Cambric Maker",
    "Cameraman",
    "Camerist",
    "Camp Cook",
    "Camp Counsellor",
    "Camp Follower",
    "Campaner",
    "Canadian Mountie",
    "Canaller",
    "Candler",
    "Candy Man",
    "Caner",
    "Cannoneer",
    "Cannonsmith",
    "Canon",
    "Canter",
    "Canting Caller",
    "Cantor",
    "Canvaser",
    "Canvasser",
    "Cape Merchant",
    "Caper",
    "Captain Of The Guard",
    "Captain",
    "Car Designer",
    "Carder",
    "Cardinal",
    "Cardiolog",
    "Cardmaker",
    "Carman",
    "Carnifex",
    "Carpenter-Joiner",
    "Carpenter",
    "Carriage Driver",
    "Cart Wheeler",
    "Carter",
    "Carter",
    "Cartier",
    "Cartographer",
    "Cartoonist",
    "Cartwright",
    "Cartwright",
    "Carver",
    "Cashier",
    "Castor",
    "Castrator",
    "Catchpole",
    "Cathar Perfect",
    "Cattle Baron",
    "Caulker",
    "Cavalry Officer",
    "Ceiler",
    "Cellarer",
    "Cellarman",
    "Cellist",
    "Ceo",
    "Cfo",
    "Chafferer",
    "Chainmaker",
    "Chaise Maker",
    "Chaloner",
    "Chamberlain",
    "Chambermaid",
    "Chambermaster",
    "Chancellor",
    "Chandler",
    "Chantry Priest",
    "Chanty Man",
    "Chapeler",
    "Chaplain",
    "Chapman",
    "Charcoal Burner",
    "Charcoalburner",
    "Charlatan",
    "Charwoman",
    "Chaser",
    "Chauffeur",
    "Cheese Monger",
    "Cheesemaker",
    "Chef",
    "Chemical Technologist",
    "Chemist",
    "Chicken Butcher",
    "Chief Of Police",
    "Chiffonier",
    "Chimney Sweep",
    "Chinese Launderer",
    "Chirurgeon",
    "Chronologist",
    "Church Usher",
    "Cio",
    "Circuit Judge",
    "Circuit Preacher",
    "Circus Performer",
    "Civil Servant",
    "Claim Jumper",
    "Clarinetist",
    "Clark",
    "Cleaner",
    "Clerk",
    "Clicker",
    "Clockmaker",
    "Clod-Hopper",
    "Clogger",
    "Clothier",
    "Clouter",
    "Clower",
    "Cmo",
    "Coach",
    "Coachmaker",
    "Coachman",
    "Coal Heaver",
    "Coalman",
    "Coaly",
    "Coast Guard",
    "Cobbler",
    "Cobbler",
    "Cockfeeder",
    "Codman",
    "Cogmen",
    "Coillor",
    "Coiner",
    "Coistsell",
    "Collar Maker",
    "College Co-Ed",
    "Collier",
    "Colporteur",
    "Columnist",
    "Combmaker",
    "Comedian",
    "Company Secretary",
    "Compasssmith",
    "Composer",
    "Computer Programmer",
    "Con Man",
    "Concierge",
    "Conductor",
    "Coney Catcher",
    "Confectioner",
    "Confectionery",
    "Conman",
    "Connor",
    "Constable",
    "Construction Engineer",
    "Construction Worker",
    "Consul",
    "Consultant",
    "Contract Killer",
    "Contractor",
    "Cook",
    "Cooper",
    "Copeman",
    "Coper",
    "Coppersmith",
    "Copyist",
    "Corder",
    "Cordwainer",
    "Cork Cutter",
    "Corn Cutter",
    "Coroner",
    "Correctional Officer",
    "Corrector",
    "Corsetier",
    "Cosmetologist",
    "Cosmonaut",
    "Costermonger",
    "Costermonger",
    "Costume Designer",
    "Cotyler",
    "Couper",
    "Couranteer",
    "Courier",
    "Court Jester",
    "Court Reporter",
    "Court Wizard",
    "Courtesan",
    "Courtier",
    "Cowboy",
    "Cowgirl",
    "Cowherd",
    "Cowper",
    "Cowpoke",
    "Cpa",
    "Cracker Boy",
    "Craftiman",
    "Craftsman",
    "Craftswoman",
    "Cramer",
    "Crate Man",
    "Criminal",
    "Crimpet Maker",
    "Critic",
    "Crocker",
    "Crofter",
    "Crookmaker",
    "Cropper",
    "Crossbowman",
    "Crowner",
    "Cryptographer",
    "Cryptozoologist",
    "Crystallographer",
    "Cto",
    "Curate",
    "Curator",
    "Curer",
    "Currier",
    "Custodian",
    "Customs Officer",
    "Cutler",
    "Cutpurse",
    "Dairymaid",
    "Dairyman",
    "Damster",
    "Dancer",
    "Dapifer",
    "Day Laborer",
    "Dean",
    "Decoyman",
    "Deep Cover Agent",
    "Delver",
    "Delver",
    "Dentist",
    "Deputy",
    "Dermatologist",
    "Designer",
    "Detective",
    "Diamantaire",
    "Dictator",
    "Dietician",
    "Diker",
    "Dilettante",
    "Diplomat",
    "Director",
    "Disc Jockey",
    "Dish Thrower",
    "Dish Turner",
    "Disher",
    "Dispatcher",
    "Distiller",
    "Ditcher",
    "Diver",
    "Diver",
    "Dock Labourer",
    "Dock Master",
    "Docker",
    "Doctor",
    "Dog Breaker",
    "Dog Leech",
    "Dog Trainer",
    "Dog Walker",
    "Domainer",
    "Domesman",
    "Domestic Worker",
    "Dominatrix",
    "Door-Keeper",
    "Doorman",
    "Dowser",
    "Draftsman",
    "Drainer",
    "Dramatist",
    "Dramaturg",
    "Draper",
    "Drawer",
    "Drayman",
    "Dresser",
    "Dressmaker",
    "Drill Instructor",
    "Driver",
    "Drover",
    "Drummer",
    "Drycooper",
    "Drysalter",
    "Drywaller",
    "Dude Ranch Cowboy",
    "Duffer",
    "Dung Carter",
    "Dustman",
    "Dyer",
    "Earer",
    "Ecologist",
    "Economist",
    "Editor",
    "Educationalist",
    "Educator",
    "Eggler",
    "Egyptologist",
    "Electrical Engineer",
    "Electrician",
    "Elevator Mechanic",
    "Elymaker",
    "Embalmer",
    "Embosser",
    "Embroiderer",
    "Emperor",
    "Empresario",
    "Emptor",
    "Engine Driver",
    "Engineer",
    "Engraver",
    "Entomologist",
    "Entrepreneur",
    "Enumerator",
    "Eremite",
    "Ergonomist",
    "Escort",
    "Essence Peddler",
    "Estimator",
    "Etcher",
    "Ethnologist",
    "Ethologist",
    "Evangelist",
    "Exchequer",
    "Exciseman",
    "Executioner",
    "Executive",
    "Exobiologist",
    "Exotic Dancer",
    "Explorer",
    "Expressman",
    "Exterminator",
    "Extra",
    "Eyer",
    "Fabricshearer",
    "Factor",
    "Factory Worker",
    "Fagetter",
    "Falconer",
    "Famulus",
    "Fanner",
    "Farmer",
    "Farrier",
    "Fashion Designer",
    "Fashioner",
    "Father",
    "Fbi Agent",
    "Fbi Special Agent",
    "Feather-Beater",
    "Feather-Dresser",
    "Featherman",
    "Feller",
    "Fellmonger",
    "Felter",
    "Feltmaker",
    "Fence",
    "Ferrer",
    "Ferryman",
    "Fewterer",
    "Fewtrer",
    "Fiddler",
    "Fighter Pilot",
    "Film Director",
    "Film Producer",
    "Financial Adviser",
    "Financial Manager",
    "Financier",
    "Fire Marshal",
    "Fire Safety Officer",
    "Firefighter",
    "First Mate",
    "Fish Fag",
    "Fisherman",
    "Fishmonger",
    "Fitter",
    "Flavorist",
    "Flax Dresser",
    "Flesher",
    "Fleshmonger",
    "Fletcher",
    "Flight Attendant",
    "Flight Instructor",
    "Floater",
    "Floor Manager",
    "Florist",
    "Fluffer",
    "Flusherman",
    "Flutist",
    "Flying Stationer",
    "Fogger",
    "Food Critic",
    "Fool",
    "Foot-Boy",
    "Foot-Maiden",
    "Footballer",
    "Footman",
    "Footpad",
    "Foreman",
    "Forensic Pathologist",
    "Forestaller",
    "Forester",
    "Forger",
    "Former Film Star",
    "Fortune Teller",
    "Forty Niner",
    "Fossetmaker",
    "Foundryman",
    "Fowler",
    "Frame Spinner",
    "Freibauer",
    "Fresco Painter",
    "Friar",
    "Fringemaker",
    "Fripperer",
    "Friseur",
    "Fruiterer",
    "Fruitestere",
    "Fruitier",
    "Fueller",
    "Fulker",
    "Fuller",
    "Furbisher",
    "Furner",
    "Furniture Maker",
    "Furrier",
    "Fustian Weaver",
    "G-Man",
    "Gaffer",
    "Gambler",
    "Game Designer",
    "Gamekeeper",
    "Gangrel",
    "Gangster",
    "Ganneker",
    "Gaoler",
    "Garcion",
    "Gardener",
    "Gastroenterologist",
    "Gater",
    "Gatward",
    "Gaunter",
    "Gelder",
    "Gemcutter",
    "Genealogist",
    "General",
    "Geographer",
    "Geologist",
    "Geometer",
    "Geophysicist",
    "Gilder",
    "Gillie",
    "Ginour",
    "Girdler",
    "Glass Seller",
    "Glassblower",
    "Glasspainter",
    "Glazier",
    "Glover",
    "Goatherd",
    "Goldbeater",
    "Goldsmith",
    "Gong Farmer",
    "Goose Herd",
    "Goose Herder",
    "Government Agent",
    "Governor",
    "Grace Wife",
    "Graffer",
    "Grainer",
    "Grammarian",
    "Granger",
    "Graphic Artist",
    "Graphic Designer",
    "Gravedigger",
    "Graver",
    "Graverobber",
    "Grazier",
    "Greengrocer",
    "Greensmith",
    "Grenadier",
    "Grinder",
    "Grocer",
    "Groom",
    "Guardian Ad Litem",
    "Guardsman",
    "Guide",
    "Guild Master",
    "Guitarist",
    "Gummer",
    "Gumshoe Detective",
    "Gun Moll",
    "Gunner",
    "Gunslinger",
    "Gunsmith",
    "Gunstocker",
    "Gynecologist",
    "Haberdasher",
    "Hacker",
    "Hackner",
    "Hackney Man",
    "Hairdresser",
    "Hairweaver",
    "Halberdier",
    "Hand Woman",
    "Handyman",
    "Harberdasher",
    "Harbourmaster",
    "Harlot",
    "Harness Maker",
    "Harper",
    "Harpist",
    "Hatcheler",
    "Hatmaker",
    "Hatter",
    "Hawker",
    "Hay Merchant",
    "Haymonger",
    "Hayward",
    "Headmaster",
    "Headmistress",
    "Hedger",
    "Heelmaker",
    "Henchman",
    "Herald",
    "Herbalist",
    "Herder",
    "Hermit",
    "Herpetologist",
    "Hetheleder",
    "Hewer",
    "Higger",
    "Highwayman",
    "Hind",
    "Hired Gun",
    "Historian",
    "Historiographer",
    "Hit Man",
    "Hobbler",
    "Hobo",
    "Hod",
    "Hodman",
    "Hoggard",
    "Homoeopath",
    "Hooper",
    "Horner",
    "Horner",
    "Horse Coper",
    "Horse Courser",
    "Horse Leech",
    "Horse Trainer",
    "Horse-Capper",
    "Horseleech",
    "Hosier",
    "Hosteler",
    "Hostler",
    "Hotel Manager",
    "House Joiner",
    "Housewife",
    "Housewright",
    "Hoyman",
    "Huckster",
    "Hunter Trapper",
    "Hunter",
    "Huntsman",
    "Hurdle Maker",
    "Husbandman",
    "Iceman",
    "Icthyologist",
    "Illuminator",
    "Illusionist",
    "Illustrator",
    "Importer",
    "Indian Chief",
    "Industrial Engineer",
    "Industrialist",
    "Infirmarian",
    "Inker",
    "Innholder",
    "Innkeeper",
    "Instructor",
    "Intelligencer",
    "Intendant",
    "Interfactor",
    "Interior Designer",
    "Interpreter",
    "Interrogator",
    "Intrepid Merchant",
    "Inventor",
    "Investigator",
    "Investment Banker",
    "Investment Broker",
    "Iron Smith",
    "Ironmaster",
    "Ironmonger",
    "Ironworker",
    "Ivorist",
    "Ivory Worker",
    "Jack",
    "Jacksmith",
    "Jagger",
    "Jailer",
    "Jakes-Farmer",
    "Janitor",
    "Jazz Musician",
    "Jester",
    "Jeweler",
    "Jewler",
    "Jobber",
    "Jobmaster",
    "Jockey",
    "Joiner",
    "Joiner",
    "Jongleur",
    "Journalist",
    "Journeyman",
    "Jouster",
    "Judge",
    "Juggler",
    "Jurist",
    "Karate Master",
    "Kedger",
    "Keelman",
    "Kempster",
    "Kiddier",
    "Kinesiologist",
    "King",
    "Knacker",
    "Knapper",
    "Kneller",
    "Knifeman",
    "Knifesmith",
    "Knight",
    "Knockknobbler",
    "Knoller",
    "Laborer",
    "Lacemaker",
    "Laceman",
    "Lacewoman",
    "Lady",
    "Lagger",
    "Lampwright",
    "Lancier",
    "Land Waiter",
    "Landed Gentry",
    "Landlady",
    "Landlord",
    "Lands Jobber",
    "Landsman",
    "Lanternmaker",
    "Lapidary",
    "Laster",
    "Latoner",
    "Lattener",
    "Launderer",
    "Laundress",
    "Lavendar",
    "Law Enforcement Agent",
    "Lawyer",
    "Leadworker",
    "Leather Dresser",
    "Leatherer",
    "Lecturer",
    "Leech",
    "Legerdemainist",
    "Leightonward",
    "Lensgrinder",
    "Level Designer",
    "Librarian",
    "Librettist",
    "Lifeguard",
    "Lighter Man",
    "Lighterman",
    "Lighthouse Keeper",
    "Lighting Technician",
    "Limner",
    "Lineman",
    "Linen-Armorer",
    "Linen-Draper",
    "Linener",
    "Linenspinner",
    "Liner",
    "Linguist",
    "Link Boy",
    "Link Man",
    "Linkerman",
    "Lister",
    "Litster",
    "Loan Officer",
    "Lobbyist",
    "Loblolly Boy",
    "Lock Keeper",
    "Locksmith",
    "Lodesman",
    "Longshoreman",
    "Loresman",
    "Lorimer",
    "Lumberjack",
    "Lungs",
    "Lutemaker",
    "Lutenist",
    "Luthier",
    "Lyricist",
    "Machinist",
    "Maderer",
    "Magistrate",
    "Magnate",
    "Maid",
    "Maidservant",
    "Mail Carrier",
    "Mailer",
    "Mailmaker",
    "Mailman",
    "Make-Up Artist",
    "Malemaker",
    "Malemaker",
    "Malender",
    "Malster",
    "Management Consultant",
    "Management",
    "Manager",
    "Manciple",
    "Mangle Keeper",
    "Manicurist",
    "Mantuamaker",
    "Manufacturer",
    "Mapmaker",
    "Mapper",
    "Marine Biologist",
    "Marine",
    "Mariner",
    "Market Gardener",
    "Marler",
    "Marleywoman",
    "Marshal",
    "Martial Artist",
    "Mason",
    "Massage Therapist",
    "Masseur",
    "Masseuse",
    "Master Builder",
    "Master Mariner",
    "Master Of Ceremony",
    "Master Of Hounds",
    "Master Of The Revels",
    "Master Of The Rolls",
    "Master",
    "Matador",
    "Matchet Forger",
    "Mathematician",
    "Meader",
    "Mealman",
    "Meat Butcher",
    "Mechanic",
    "Mechanician",
    "Mediator",
    "Medic",
    "Medical Biller",
    "Medicine Man",
    "Medicine Peddler",
    "Medicine",
    "Meistersinger",
    "Melder",
    "Menage-Man",
    "Mercator",
    "Mercenary",
    "Mercer",
    "Merchant Taylor",
    "Merchant",
    "Mesmerist",
    "Messenger",
    "Metalman",
    "Meterer",
    "Metropolitan Bishop",
    "Midshipman",
    "Midwife",
    "Military Officer",
    "Militia",
    "Milkmaid",
    "Milkman",
    "Miller",
    "Milleress",
    "Milliner",
    "Millwright",
    "Miner",
    "Miniaturist",
    "Minister",
    "Minnesinger",
    "Minstrel",
    "Minter",
    "Mintmaster",
    "Mirrorer",
    "Missionary",
    "Mixer",
    "Model",
    "Modeller",
    "Molecatcher",
    "Money-Schrivener",
    "Moneychanger",
    "Moneyer",
    "Moneylender",
    "Monk Or Nun",
    "Mortgage Broker",
    "Moulder",
    "Mountaineer",
    "Mudlark",
    "Muffin Man",
    "Muleskinner",
    "Muleteer",
    "Multurer",
    "Mummer",
    "Muralist",
    "Music Teacher",
    "Musician",
    "Musiker",
    "Musketeer",
    "Mustarder",
    "Nailmaker",
    "Nakerer",
    "Nanny",
    "Napier",
    "Natural Philosopher",
    "Navigator",
    "Necessary Woman",
    "Necker",
    "Nedeller",
    "N?gociant",
    "Negotiator",
    "Netmaker",
    "Netter",
    "Newscaster",
    "Night Auditor",
    "Night Magistrate",
    "Night Soilman",
    "Nightwalker",
    "Nimgimmer",
    "Nob-Thatcher",
    "Noble",
    "Nobleman",
    "Notary",
    "Novelist",
    "Numerologist",
    "Numismatist",
    "Nun",
    "Nurse",
    "Nursemaid",
    "Oboist",
    "Obstetrician",
    "Occupational Therapist",
    "Occupier",
    "Odontologist",
    "Oil Merchant",
    "Oilmaker",
    "Oilman",
    "Old-Clothes Dealer",
    "Olitor",
    "Oncologist",
    "Operator",
    "Ophthalmologist",
    "Optician",
    "Optometrist",
    "Oracle",
    "Orderly",
    "Ordinary Keeper",
    "Ordinary Seaman",
    "Orfever",
    "Organizer",
    "Ornithologist",
    "Ostiary",
    "Ostler",
    "Ostreger",
    "Otorhinolaryngologist",
    "Out-Crier",
    "Outlaw",
    "Owler",
    "Oynter",
    "Oyster Raker",
    "Oysterer",
    "Packer",
    "Packman",
    "Painter",
    "Paintress",
    "Paleontologist",
    "Paling Man",
    "Palmer",
    "Pan Smith",
    "Panter",
    "Paperer",
    "Papermaker",
    "Paralegal",
    "Paramedic",
    "Parapsychologist",
    "Parchmenter",
    "Pardoner",
    "Parish Priest",
    "Park Ranger",
    "Parker",
    "Parole Officer",
    "Passage Keeper",
    "Pasteler",
    "Pastor",
    "Pastrycook",
    "Patent Attorney",
    "Patent Examiner",
    "Pathologist",
    "Pattenmaker",
    "Paver",
    "Pavior",
    "Pavyler",
    "Pawnbroker",
    "Peager",
    "Peasant",
    "Pedaile",
    "Peddler",
    "Pediatrician",
    "Pedologist",
    "Pelterer",
    "Perchemear",
    "Percussionist",
    "Peregrinator",
    "Perfumer",
    "Perfumer",
    "Periwig Maker",
    "Personal Trainer",
    "Peruker",
    "Perukier",
    "Pessoner",
    "Peterman",
    "Pettifogger",
    "Petty Chapman",
    "Pew Opener",
    "Pewterer",
    "Pharmacist",
    "Pharmaopoeist",
    "Philanthropist",
    "Philologist",
    "Philosopher",
    "Photographer",
    "Photojournalist",
    "Physical Therapist",
    "Physician Assistant",
    "Physician",
    "Physicist",
    "Physiognomist",
    "Physiotherapist",
    "Pianist",
    "Piano Tuner",
    "Picaroon",
    "Pickpocket",
    "Pie Seller",
    "Piece Broker",
    "Pigmaker",
    "Pigman",
    "Pikelet Maker",
    "Pikeman",
    "Pikeman",
    "Piker",
    "Pilgrim",
    "Pill Box Lidder",
    "Piller",
    "Pilot",
    "Pinder",
    "Piner",
    "Pinkertons Agent",
    "Pinmaker",
    "Pinner Up",
    "Pinner",
    "Pioneer",
    "Piper",
    "Pirate",
    "Pissprophet",
    "Pitman",
    "Plain Worker",
    "Plaiter",
    "Planker",
    "Plasterer",
    "Plattner",
    "Player",
    "Playwright",
    "Plough Jogger",
    "Plowman",
    "Plowright",
    "Plumassier",
    "Plumber",
    "Plumbum Man",
    "Plumer",
    "Poacher",
    "Podiatrist",
    "Poet",
    "Pointer",
    "Pointer",
    "Poleman",
    "Poleturner",
    "Police Detective",
    "Police Inspector",
    "Police Officer",
    "Police",
    "Politician",
    "Ponderator",
    "Pony Express Rider",
    "Pope",
    "Pornstar",
    "Portable Soup Maker",
    "Porter",
    "Post Rider",
    "Postillion",
    "Pot Boy",
    "Pot Mender",
    "Potato Badger",
    "Potboy",
    "Potter Carrier",
    "Potter",
    "Pouch Maker",
    "Poulter",
    "Poynter",
    "Presenter",
    "President",
    "Press Officer",
    "Prestidigitator",
    "Pricker",
    "Priest",
    "Primate",
    "Prince",
    "Princess",
    "Principal",
    "Printer",
    "Private Detective",
    "Privycleaner",
    "Probation Officer",
    "Proctologist",
    "Procurator",
    "Professional Athelete",
    "Professional Dominant",
    "Professor",
    "Programmer",
    "Project Manager",
    "Proofreader",
    "Prophet",
    "Prospector",
    "Prostitute",
    "Psychiatrist",
    "Psychodramatist",
    "Psychologist",
    "Public Relations Officer",
    "Public Speaker",
    "Publican",
    "Publisher",
    "Pugger",
    "Pulleymaker",
    "Pumbum",
    "Pumpmaker",
    "Purse Maker",
    "Purser",
    "Pursuivant",
    "Quack",
    "Quarrier",
    "Quarryman",
    "Quartermaster",
    "Quiller",
    "Quilter",
    "Quister",
    "Radio Journalist",
    "Radio Personality",
    "Radiographer",
    "Radiologist",
    "Rag And Bone Man",
    "Rag Cutter",
    "Rag Gatherer",
    "Rag Man",
    "Ragpicker",
    "Railroad Baron",
    "Railroad Brakeman",
    "Railroad Conductor",
    "Railroad Engineer",
    "Railroad Laborer",
    "Railroad Stoker",
    "Raker",
    "Ranch Hand",
    "Rancher",
    "Rat Catcher",
    "Ratoner",
    "Rattlewatch",
    "Real Estate Broker",
    "Real Estate Developer",
    "Real Estate Investor",
    "Reaper",
    "Receptionist",
    "Record Producer",
    "Rectifier",
    "Redsmith",
    "Reedmaker",
    "Reeve",
    "Referee",
    "Refuse Collector",
    "Registrar",
    "Religion",
    "Reporter",
    "Research Assistant",
    "Researcher",
    "Respiratory Therapist",
    "Restaurateur",
    "Retail Clerk",
    "Retailer",
    "Revenuer",
    "Rigger",
    "Ripper",
    "Riverboat Pilot",
    "Riverman",
    "Riveter",
    "Rodeo Rider",
    "Rodman",
    "Roofer",
    "Ropemaker",
    "Roper",
    "Rover",
    "Rugmaker",
    "Rugman",
    "Rugweaver",
    "Runner",
    "Rustler",
    "Sacristan",
    "Saddle Tree Maker",
    "Saddler",
    "Sage",
    "Sailmaker",
    "Sailor",
    "Saloon Girl",
    "Saloon Owner",
    "Saloonist",
    "Saltboiler",
    "Salter",
    "Sandesman",
    "Sanitation Worker",
    "Sapper",
    "Sartor",
    "Saucier",
    "Sawbones",
    "Sawyer",
    "Saxophonist",
    "Say Weaver",
    "Sayer",
    "Scabbard Maker",
    "Scavelman",
    "School Superintendent",
    "Schoolmarm",
    "Schoolmaster",
    "Schrimpschonger",
    "Scientist",
    "Scout",
    "Screenwriter",
    "Scribe",
    "Scribe",
    "Scrimer",
    "Scripture Reader",
    "Scrivener",
    "Scrutineer",
    "Scullery Maid",
    "Scullion",
    "Sculptor",
    "Scythesmith",
    "Sea Captain",
    "Sealer",
    "Seamstress",
    "Searcher",
    "Second Mate",
    "Secret Service Agent",
    "Secretary General",
    "Secretary",
    "Security Guard",
    "Seedsman",
    "Semi Lorer",
    "Sempstress",
    "Senator",
    "Seneschal",
    "Seo",
    "Serf",
    "Sergeant-At-Arms",
    "Sergeant",
    "Servant",
    "Sewster",
    "Sex Worker",
    "Sexologist",
    "Sexton",
    "Shanty-Man",
    "Sharecropper",
    "Shearer",
    "Sheargrinder",
    "Shearman",
    "Sheath Maker",
    "Sheepman",
    "Sheepshearer",
    "Shepherd",
    "Shepster",
    "Sheriff",
    "Shill",
    "Shingler",
    "Ship Master",
    "Ship Provisioner",
    "Shipchandler",
    "Shipwright",
    "Shoe-Finder",
    "Shoe-Wiper",
    "Shoemaker",
    "Shoesmith",
    "Shop Assistant",
    "Shop Keeper",
    "Shoresman",
    "Shrager",
    "Shrieve",
    "Shrimper",
    "Siege Engineer",
    "Siever",
    "Silk Throwster",
    "Silk-Carder",
    "Silk-Dresser",
    "Silk-Dyer",
    "Silk-Maker",
    "Silk-Mercer",
    "Silk-Snatcher",
    "Silkmaid",
    "Silversmith",
    "Singer",
    "Skald",
    "Skepper",
    "Skinker",
    "Skinner",
    "Slater",
    "Sleeper",
    "Sleuth",
    "Slop Seller",
    "Smelter",
    "Smith",
    "Smuggler",
    "Snake Oil Salesman",
    "Snobber",
    "Snobscat",
    "Snow Warden",
    "Snuffer Maker",
    "Soapboiler",
    "Social Bandit",
    "Social Worker",
    "Socialite",
    "Software Engineer",
    "Soil Scientist",
    "Sojourner Clothier",
    "Soldier",
    "Solicitor",
    "Sommelier",
    "Sonographer",
    "Sortor",
    "Sound Engineer",
    "Souter",
    "Spallier",
    "Speakeasy Employee",
    "Spearman",
    "Special Agent",
    "Spectaclesmaker",
    "Speech Therapist",
    "Sperviter",
    "Spice Merchant",
    "Spicer",
    "Spinner",
    "Spinster",
    "Splitter",
    "Spooner",
    "Sportsman",
    "Spurrer",
    "Spurrier",
    "Spy",
    "Squire",
    "Stablehand",
    "Stabler",
    "Stainer",
    "Stampman",
    "Stapler",
    "Starship Captain",
    "Stationary Tender",
    "Stationer",
    "Statistician",
    "Stay Maker",
    "Steersman",
    "Stenographer",
    "Step Boy",
    "Stevedore",
    "Steward",
    "Stewsman",
    "Stillroom",
    "Stitcher",
    "Stockinger",
    "Stoker",
    "Stone Cutter",
    "Stone Picker",
    "Stone Worker",
    "Stonecarver",
    "Stonecutter",
    "Stonemason",
    "Stoner",
    "Stonewarden",
    "Storyteller",
    "Straw Joiner",
    "Streaker",
    "Street Artist",
    "Street Cleaner",
    "Street Musician",
    "Street Sweeper",
    "Street Vendor",
    "Strikebreaker",
    "Stringer",
    "Stripper",
    "Structural Engineer",
    "Student",
    "Stuffgownsman",
    "Stunt Double",
    "Stunt Performer",
    "Sucksmith",
    "Summoner",
    "Supervisor",
    "Surgeon",
    "Surveyor",
    "Sutler",
    "Swain",
    "Swamper",
    "Sweep",
    "Swimmer",
    "Swineherd",
    "Switchboard Operator",
    "Sword Cutler",
    "Swordsmith",
    "System Administrator",
    "Systems Analyst",
    "Tabler",
    "Tailor",
    "Tallow Chandler",
    "Tallowchandler",
    "Tally-Clerk",
    "Tallyman",
    "Tankard Bearer",
    "Tanner",
    "Taper Weaver",
    "Tapester",
    "Tapestrymaker",
    "Tapicer",
    "Tapiser",
    "Tapper",
    "Tapster",
    "Tasseler",
    "Tavern Keeper",
    "Taverner",
    "Tawer",
    "Tax Collector",
    "Tax Lawyer",
    "Taxicab Driver",
    "Taxidermist",
    "Taxonomist",
    "Tea Lady",
    "Teacher",
    "Teamster",
    "Technical Writer",
    "Technician",
    "Technologist",
    "Telegraph Operator",
    "Telegraphist",
    "Telephone Operator",
    "Tennis Player",
    "Tenter",
    "Test Developer",
    "Test Pilot",
    "Thacker",
    "Thatcher",
    "Barber",
    "Theatre Director",
    "Theologian",
    "Theologist",
    "Therapist",
    "Thimbler",
    "Thimblerigger",
    "Thonger",
    "Threadmaker",
    "Thresher",
    "Throwster",
    "Tickney Man",
    "Tide Gauger",
    "Tide Waiter",
    "Tiemaker",
    "Tile Maker",
    "Tile-Burner",
    "Tile-Theeker",
    "Tiler",
    "Tiller",
    "Tillerman",
    "Tillman",
    "Tiltmaker",
    "Time Police",
    "Timekeeper",
    "Times Ironer",
    "Tinctor",
    "Tinker",
    "Tinner",
    "Tinsmith",
    "Tinter",
    "Tipper",
    "Tippler",
    "Tipstaff",
    "Tirewoman",
    "Tobacco Spinner",
    "Toll Keeper",
    "Toller",
    "Tollgate Keeper",
    "Tonsor",
    "Tool And Die Maker",
    "Tool Helver",
    "Toolmaker",
    "Topman",
    "Topsman",
    "Town Crier",
    "Town Marshal",
    "Trademark Attorney",
    "Trader",
    "Tradesman",
    "Trainer",
    "Tramper",
    "Trampler",
    "Tranqueter",
    "Transit Planner",
    "Translator",
    "Tranter",
    "Trapper",
    "Traunter",
    "Treasurer",
    "Treen Maker",
    "Treenail Maker",
    "Trenchermaker",
    "Trencherman",
    "Trobairitz",
    "Troubadour",
    "Truchman",
    "Truck Driver",
    "Trugger",
    "Tubber",
    "Tubedrawer",
    "Tumbler",
    "Tunist",
    "Turner",
    "Turnkey",
    "Tutor",
    "Tyler",
    "Typefounder",
    "Typist",
    "Ufologist",
    "Undercover Agent",
    "Undertaker",
    "Underwriter",
    "Unemployed",
    "Unguentary",
    "Upholder",
    "Upholsterer",
    "Upright Worker",
    "Urchin",
    "Urologist",
    "Us Marshal",
    "Userer",
    "Usher",
    "Vaginarius",
    "Valet",
    "Vaquero",
    "Vatman",
    "Verge Maker",
    "Verger",
    "Verrier",
    "Verser",
    "Veterinarian",
    "Vibraphonist",
    "Vicar",
    "Victualler",
    "Video Editor",
    "Video Game Developer",
    "Viking",
    "Vintager",
    "Vintner",
    "Violinist",
    "Violist",
    "Virginal Player",
    "Vulcan",
    "Waferer",
    "Waferer",
    "Wagoner",
    "Wainwright",
    "Waiter",
    "Waitman",
    "Waitress",
    "Wakeman",
    "Walker",
    "Waller",
    "Wantcatcher",
    "Warden",
    "Warder",
    "Warper",
    "Warrener",
    "Washman",
    "Watch Finisher",
    "Watchmaker",
    "Watchman",
    "Water Baliff",
    "Water Carrier",
    "Water Gilder",
    "Water Leader",
    "Waterman",
    "Waterseller",
    "Wattle Hurdle Maker",
    "Wattler",
    "Waxchandler",
    "Way Man",
    "Way-Maker",
    "Weaponsmith",
    "Weatherman",
    "Weatherspy",
    "Weaver",
    "Web Designer",
    "Web Developer",
    "Webber",
    "Webster",
    "Wedding Planner",
    "Weeder",
    "Weeper",
    "Weigher",
    "Weirkeeper",
    "Welder",
    "Wellmaster",
    "Wellsinker",
    "Wellwright",
    "Western Union Man",
    "Wet Glover",
    "Wet Nurse",
    "Wetter",
    "Whacker",
    "Whaler",
    "Wharfinger",
    "Wheeler",
    "Wheelwright",
    "Wherryman",
    "Whipcord Maker",
    "Whipper In",
    "Whit Cooper",
    "White Limer",
    "Whitear",
    "Whitener",
    "Whitening Roll Maker",
    "Whiter Tawer",
    "Whitesmith",
    "Whitewing",
    "Whittawer",
    "Wigmaker",
    "Wild West Outlaw",
    "Willow Plaiter",
    "Winder",
    "Windster",
    "Wine Seller",
    "Winemaker",
    "Wiredrawer",
    "Witch",
    "Wizard",
    "Wood Cutter",
    "Wood Reeve",
    "Wood Seller",
    "Woodbreaker",
    "Woodcarver",
    "Woodcutter",
    "Woodmonger",
    "Woodranger",
    "Woodturner",
    "Woodward",
    "Wool Driver",
    "Wool Grower",
    "Wool Sorter",
    "Wool Stapler",
    "Wool Winder",
    "Woolcomber",
    "Woolman",
    "Woolsted Man",
    "Working Cowboy",
    "Worsted Manufacturer",
    "Wrangler",
    "Wright",
    "Writer",
    "Xenobiologist",
    "Xylophonist",
    "Yardman",
    "Yatman",
    "Yearman",
    "Yeoman",
    "Yodeler",
    "Zookeeper",
    "Zoologist"
  ], Yf = (n) => Math.floor(Math.random() * n);
  function DS({ the: n = false, titleize: o = false, separator: l } = {}) {
    const a = n ? "the " : "", u = OS.concat(jS);
    let d = `${Qf[Yf(Qf.length)]} ${u[Yf(u.length)]}`.toLowerCase();
    return o && (d = d.replace(/(?:^|\s|-)\S/g, (f) => f.toUpperCase())), typeof l == "string" ? d = d.split(" ").join(l) : l || (d = d.split(" ").join("")), a + d;
  }
  function BS() {
    const { theme: n, setTheme: o } = bS(), [l, a] = m.useState(false);
    return m.useEffect(() => a(true), []), l ? x.jsxs(Xe, {
      variant: "ghost",
      size: "icon",
      onClick: () => o(n === "light" ? "dark" : "light"),
      children: [
        n === "light" ? x.jsx(Pw, {
          className: "h-5 w-5"
        }) : x.jsx(Ew, {
          className: "h-5 w-5"
        }),
        x.jsx("span", {
          className: "sr-only",
          children: "Toggle theme"
        })
      ]
    }) : null;
  }
  function FS() {
    var _a2, _b2;
    const [n, o] = m.useState("home"), [l, a] = m.useState([]), [u, d] = m.useState(null), [f, p] = m.useState(false), [g, y] = m.useState(0), [_, b] = m.useState(false), [w, P] = m.useState(DS()), [M, k] = m.useState([]), [R, L] = m.useState(false), [W, H] = m.useState(false);
    m.useEffect(() => {
      const K = Ut.subscribe((Y) => {
        k((X) => [
          ...X,
          Y
        ]);
      });
      return () => K();
    }, []);
    const O = async (K) => {
      try {
        const Y = await At.joinChannel(K, w);
        a((le) => [
          ...le,
          Y
        ]), d(Y.id), o("chat"), p(true);
        const X = await At.getPeers(Y.id);
        y(X.length);
      } catch (Y) {
        console.error(`Failed to join channel: ${Y}`);
      }
    }, j = async () => {
      try {
        const K = await At.createChannel(w);
        a((Y) => [
          ...Y,
          K
        ]), d(K.id), o("chat"), p(true), y(0);
      } catch (K) {
        console.error(`Failed to create channel: ${K}`);
      }
    }, B = async (K) => {
      try {
        await At.closeChannel(K), a((Y) => Y.filter((X) => X.id !== K)), u === K && (d(l.length > 1 ? l[0].id : null), l.length === 1 && (o("home"), p(false)));
      } catch (Y) {
        console.error(`Failed to close channel: ${Y}`);
      }
    }, V = () => {
      o("home"), H(true);
    };
    return x.jsx(SS, {
      attribute: "class",
      defaultTheme: "system",
      enableSystem: true,
      children: x.jsxs("div", {
        className: "flex h-screen",
        children: [
          (n === "chat" || W) && x.jsx(yS, {
            channels: l,
            activeChannel: u,
            onChannelSelect: (K) => {
              d(K), o("chat");
            },
            onNewChannel: V
          }),
          x.jsxs("div", {
            className: "flex flex-col flex-grow",
            children: [
              x.jsx(mS, {
                isConnected: f,
                neighbors: g,
                onMenuClick: () => b(!_),
                themeToggle: x.jsx(BS, {}),
                channel: u && ((_a2 = l.find((K) => K.id === u)) == null ? void 0 : _a2.name) || null,
                onInviteClick: () => L(true)
              }),
              n === "home" && x.jsx(yy, {
                name: w,
                onSetName: P,
                onJoin: (K) => {
                  O(K), H(false);
                },
                onCreate: () => {
                  j(), H(false);
                }
              }),
              n === "chat" && u && x.jsx(hS, {
                channel: u,
                onClose: () => B(u)
              }),
              _ && x.jsx(gS, {
                logs: M,
                onClose: () => b(false)
              }),
              R && u && x.jsx(LS, {
                onClose: () => L(false),
                channel: ((_b2 = l.find((K) => K.id === u)) == null ? void 0 : _b2.name) || "",
                getTicket: (K) => At.getTicket(u, K)
              })
            ]
          })
        ]
      })
    });
  }
  Ag.createRoot(document.getElementById("root")).render(x.jsx(m.StrictMode, {
    children: x.jsx(FS, {})
  }));
})();
