var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
let ym, Ft;
let __tla = (async () => {
  function xv(n, i) {
    for (var l = 0; l < i.length; l++) {
      const s = i[l];
      if (typeof s != "string" && !Array.isArray(s)) {
        for (const c in s) if (c !== "default" && !(c in n)) {
          const d = Object.getOwnPropertyDescriptor(s, c);
          d && Object.defineProperty(n, c, d.get ? d : {
            enumerable: true,
            get: () => s[c]
          });
        }
      }
    }
    return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, {
      value: "Module"
    }));
  }
  (function() {
    const i = document.createElement("link").relList;
    if (i && i.supports && i.supports("modulepreload")) return;
    for (const c of document.querySelectorAll('link[rel="modulepreload"]')) s(c);
    new MutationObserver((c) => {
      for (const d of c) if (d.type === "childList") for (const f of d.addedNodes) f.tagName === "LINK" && f.rel === "modulepreload" && s(f);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function l(c) {
      const d = {};
      return c.integrity && (d.integrity = c.integrity), c.referrerPolicy && (d.referrerPolicy = c.referrerPolicy), c.crossOrigin === "use-credentials" ? d.credentials = "include" : c.crossOrigin === "anonymous" ? d.credentials = "omit" : d.credentials = "same-origin", d;
    }
    function s(c) {
      if (c.ep) return;
      c.ep = true;
      const d = l(c);
      fetch(c.href, d);
    }
  })();
  function Zf(n) {
    return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
  }
  var as = {
    exports: {}
  }, xo = {}, ss = {
    exports: {}
  }, pe = {};
  var af;
  function Sv() {
    if (af) return pe;
    af = 1;
    var n = Symbol.for("react.element"), i = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), f = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), k = Symbol.iterator;
    function S(N) {
      return N === null || typeof N != "object" ? null : (N = k && N[k] || N["@@iterator"], typeof N == "function" ? N : null);
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
    }, M = Object.assign, b = {};
    function T(N, B, se) {
      this.props = N, this.context = B, this.refs = b, this.updater = se || P;
    }
    T.prototype.isReactComponent = {}, T.prototype.setState = function(N, B) {
      if (typeof N != "object" && typeof N != "function" && N != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, N, B, "setState");
    }, T.prototype.forceUpdate = function(N) {
      this.updater.enqueueForceUpdate(this, N, "forceUpdate");
    };
    function j() {
    }
    j.prototype = T.prototype;
    function I(N, B, se) {
      this.props = N, this.context = B, this.refs = b, this.updater = se || P;
    }
    var W = I.prototype = new j();
    W.constructor = I, M(W, T.prototype), W.isPureReactComponent = true;
    var O = Array.isArray, _ = Object.prototype.hasOwnProperty, $ = {
      current: null
    }, U = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    function Z(N, B, se) {
      var de, he = {}, ge = null, ye = null;
      if (B != null) for (de in B.ref !== void 0 && (ye = B.ref), B.key !== void 0 && (ge = "" + B.key), B) _.call(B, de) && !U.hasOwnProperty(de) && (he[de] = B[de]);
      var we = arguments.length - 2;
      if (we === 1) he.children = se;
      else if (1 < we) {
        for (var Ce = Array(we), qe = 0; qe < we; qe++) Ce[qe] = arguments[qe + 2];
        he.children = Ce;
      }
      if (N && N.defaultProps) for (de in we = N.defaultProps, we) he[de] === void 0 && (he[de] = we[de]);
      return {
        $$typeof: n,
        type: N,
        key: ge,
        ref: ye,
        props: he,
        _owner: $.current
      };
    }
    function J(N, B) {
      return {
        $$typeof: n,
        type: N.type,
        key: B,
        ref: N.ref,
        props: N.props,
        _owner: N._owner
      };
    }
    function oe(N) {
      return typeof N == "object" && N !== null && N.$$typeof === n;
    }
    function ae(N) {
      var B = {
        "=": "=0",
        ":": "=2"
      };
      return "$" + N.replace(/[=:]/g, function(se) {
        return B[se];
      });
    }
    var te = /\/+/g;
    function me(N, B) {
      return typeof N == "object" && N !== null && N.key != null ? ae("" + N.key) : B.toString(36);
    }
    function fe(N, B, se, de, he) {
      var ge = typeof N;
      (ge === "undefined" || ge === "boolean") && (N = null);
      var ye = false;
      if (N === null) ye = true;
      else switch (ge) {
        case "string":
        case "number":
          ye = true;
          break;
        case "object":
          switch (N.$$typeof) {
            case n:
            case i:
              ye = true;
          }
      }
      if (ye) return ye = N, he = he(ye), N = de === "" ? "." + me(ye, 0) : de, O(he) ? (se = "", N != null && (se = N.replace(te, "$&/") + "/"), fe(he, B, se, "", function(qe) {
        return qe;
      })) : he != null && (oe(he) && (he = J(he, se + (!he.key || ye && ye.key === he.key ? "" : ("" + he.key).replace(te, "$&/") + "/") + N)), B.push(he)), 1;
      if (ye = 0, de = de === "" ? "." : de + ":", O(N)) for (var we = 0; we < N.length; we++) {
        ge = N[we];
        var Ce = de + me(ge, we);
        ye += fe(ge, B, se, Ce, he);
      }
      else if (Ce = S(N), typeof Ce == "function") for (N = Ce.call(N), we = 0; !(ge = N.next()).done; ) ge = ge.value, Ce = de + me(ge, we++), ye += fe(ge, B, se, Ce, he);
      else if (ge === "object") throw B = String(N), Error("Objects are not valid as a React child (found: " + (B === "[object Object]" ? "object with keys {" + Object.keys(N).join(", ") + "}" : B) + "). If you meant to render a collection of children, use an array instead.");
      return ye;
    }
    function ke(N, B, se) {
      if (N == null) return N;
      var de = [], he = 0;
      return fe(N, de, "", "", function(ge) {
        return B.call(se, ge, he++);
      }), de;
    }
    function ce(N) {
      if (N._status === -1) {
        var B = N._result;
        B = B(), B.then(function(se) {
          (N._status === 0 || N._status === -1) && (N._status = 1, N._result = se);
        }, function(se) {
          (N._status === 0 || N._status === -1) && (N._status = 2, N._result = se);
        }), N._status === -1 && (N._status = 0, N._result = B);
      }
      if (N._status === 1) return N._result.default;
      throw N._result;
    }
    var le = {
      current: null
    }, L = {
      transition: null
    }, K = {
      ReactCurrentDispatcher: le,
      ReactCurrentBatchConfig: L,
      ReactCurrentOwner: $
    };
    function G() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    return pe.Children = {
      map: ke,
      forEach: function(N, B, se) {
        ke(N, function() {
          B.apply(this, arguments);
        }, se);
      },
      count: function(N) {
        var B = 0;
        return ke(N, function() {
          B++;
        }), B;
      },
      toArray: function(N) {
        return ke(N, function(B) {
          return B;
        }) || [];
      },
      only: function(N) {
        if (!oe(N)) throw Error("React.Children.only expected to receive a single React element child.");
        return N;
      }
    }, pe.Component = T, pe.Fragment = l, pe.Profiler = c, pe.PureComponent = I, pe.StrictMode = s, pe.Suspense = v, pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = K, pe.act = G, pe.cloneElement = function(N, B, se) {
      if (N == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + N + ".");
      var de = M({}, N.props), he = N.key, ge = N.ref, ye = N._owner;
      if (B != null) {
        if (B.ref !== void 0 && (ge = B.ref, ye = $.current), B.key !== void 0 && (he = "" + B.key), N.type && N.type.defaultProps) var we = N.type.defaultProps;
        for (Ce in B) _.call(B, Ce) && !U.hasOwnProperty(Ce) && (de[Ce] = B[Ce] === void 0 && we !== void 0 ? we[Ce] : B[Ce]);
      }
      var Ce = arguments.length - 2;
      if (Ce === 1) de.children = se;
      else if (1 < Ce) {
        we = Array(Ce);
        for (var qe = 0; qe < Ce; qe++) we[qe] = arguments[qe + 2];
        de.children = we;
      }
      return {
        $$typeof: n,
        type: N.type,
        key: he,
        ref: ge,
        props: de,
        _owner: ye
      };
    }, pe.createContext = function(N) {
      return N = {
        $$typeof: f,
        _currentValue: N,
        _currentValue2: N,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
      }, N.Provider = {
        $$typeof: d,
        _context: N
      }, N.Consumer = N;
    }, pe.createElement = Z, pe.createFactory = function(N) {
      var B = Z.bind(null, N);
      return B.type = N, B;
    }, pe.createRef = function() {
      return {
        current: null
      };
    }, pe.forwardRef = function(N) {
      return {
        $$typeof: p,
        render: N
      };
    }, pe.isValidElement = oe, pe.lazy = function(N) {
      return {
        $$typeof: x,
        _payload: {
          _status: -1,
          _result: N
        },
        _init: ce
      };
    }, pe.memo = function(N, B) {
      return {
        $$typeof: y,
        type: N,
        compare: B === void 0 ? null : B
      };
    }, pe.startTransition = function(N) {
      var B = L.transition;
      L.transition = {};
      try {
        N();
      } finally {
        L.transition = B;
      }
    }, pe.unstable_act = G, pe.useCallback = function(N, B) {
      return le.current.useCallback(N, B);
    }, pe.useContext = function(N) {
      return le.current.useContext(N);
    }, pe.useDebugValue = function() {
    }, pe.useDeferredValue = function(N) {
      return le.current.useDeferredValue(N);
    }, pe.useEffect = function(N, B) {
      return le.current.useEffect(N, B);
    }, pe.useId = function() {
      return le.current.useId();
    }, pe.useImperativeHandle = function(N, B, se) {
      return le.current.useImperativeHandle(N, B, se);
    }, pe.useInsertionEffect = function(N, B) {
      return le.current.useInsertionEffect(N, B);
    }, pe.useLayoutEffect = function(N, B) {
      return le.current.useLayoutEffect(N, B);
    }, pe.useMemo = function(N, B) {
      return le.current.useMemo(N, B);
    }, pe.useReducer = function(N, B, se) {
      return le.current.useReducer(N, B, se);
    }, pe.useRef = function(N) {
      return le.current.useRef(N);
    }, pe.useState = function(N) {
      return le.current.useState(N);
    }, pe.useSyncExternalStore = function(N, B, se) {
      return le.current.useSyncExternalStore(N, B, se);
    }, pe.useTransition = function() {
      return le.current.useTransition();
    }, pe.version = "18.3.1", pe;
  }
  var sf;
  function As() {
    return sf || (sf = 1, ss.exports = Sv()), ss.exports;
  }
  var uf;
  function kv() {
    if (uf) return xo;
    uf = 1;
    var n = As(), i = Symbol.for("react.element"), l = Symbol.for("react.fragment"), s = Object.prototype.hasOwnProperty, c = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    function f(p, v, y) {
      var x, k = {}, S = null, P = null;
      y !== void 0 && (S = "" + y), v.key !== void 0 && (S = "" + v.key), v.ref !== void 0 && (P = v.ref);
      for (x in v) s.call(v, x) && !d.hasOwnProperty(x) && (k[x] = v[x]);
      if (p && p.defaultProps) for (x in v = p.defaultProps, v) k[x] === void 0 && (k[x] = v[x]);
      return {
        $$typeof: i,
        type: p,
        key: S,
        ref: P,
        props: k,
        _owner: c.current
      };
    }
    return xo.Fragment = l, xo.jsx = f, xo.jsxs = f, xo;
  }
  var cf;
  function Cv() {
    return cf || (cf = 1, as.exports = kv()), as.exports;
  }
  var g = Cv(), h = As();
  const Pv = Zf(h), bv = xv({
    __proto__: null,
    default: Pv
  }, [
    h
  ]);
  var Ii = {}, us = {
    exports: {}
  }, lt = {}, cs = {
    exports: {}
  }, ds = {};
  var df;
  function Ev() {
    return df || (df = 1, function(n) {
      function i(L, K) {
        var G = L.length;
        L.push(K);
        e: for (; 0 < G; ) {
          var N = G - 1 >>> 1, B = L[N];
          if (0 < c(B, K)) L[N] = K, L[G] = B, G = N;
          else break e;
        }
      }
      function l(L) {
        return L.length === 0 ? null : L[0];
      }
      function s(L) {
        if (L.length === 0) return null;
        var K = L[0], G = L.pop();
        if (G !== K) {
          L[0] = G;
          e: for (var N = 0, B = L.length, se = B >>> 1; N < se; ) {
            var de = 2 * (N + 1) - 1, he = L[de], ge = de + 1, ye = L[ge];
            if (0 > c(he, G)) ge < B && 0 > c(ye, he) ? (L[N] = ye, L[ge] = G, N = ge) : (L[N] = he, L[de] = G, N = de);
            else if (ge < B && 0 > c(ye, G)) L[N] = ye, L[ge] = G, N = ge;
            else break e;
          }
        }
        return K;
      }
      function c(L, K) {
        var G = L.sortIndex - K.sortIndex;
        return G !== 0 ? G : L.id - K.id;
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
      var v = [], y = [], x = 1, k = null, S = 3, P = false, M = false, b = false, T = typeof setTimeout == "function" ? setTimeout : null, j = typeof clearTimeout == "function" ? clearTimeout : null, I = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function W(L) {
        for (var K = l(y); K !== null; ) {
          if (K.callback === null) s(y);
          else if (K.startTime <= L) s(y), K.sortIndex = K.expirationTime, i(v, K);
          else break;
          K = l(y);
        }
      }
      function O(L) {
        if (b = false, W(L), !M) if (l(v) !== null) M = true, ce(_);
        else {
          var K = l(y);
          K !== null && le(O, K.startTime - L);
        }
      }
      function _(L, K) {
        M = false, b && (b = false, j(Z), Z = -1), P = true;
        var G = S;
        try {
          for (W(K), k = l(v); k !== null && (!(k.expirationTime > K) || L && !ae()); ) {
            var N = k.callback;
            if (typeof N == "function") {
              k.callback = null, S = k.priorityLevel;
              var B = N(k.expirationTime <= K);
              K = n.unstable_now(), typeof B == "function" ? k.callback = B : k === l(v) && s(v), W(K);
            } else s(v);
            k = l(v);
          }
          if (k !== null) var se = true;
          else {
            var de = l(y);
            de !== null && le(O, de.startTime - K), se = false;
          }
          return se;
        } finally {
          k = null, S = G, P = false;
        }
      }
      var $ = false, U = null, Z = -1, J = 5, oe = -1;
      function ae() {
        return !(n.unstable_now() - oe < J);
      }
      function te() {
        if (U !== null) {
          var L = n.unstable_now();
          oe = L;
          var K = true;
          try {
            K = U(true, L);
          } finally {
            K ? me() : ($ = false, U = null);
          }
        } else $ = false;
      }
      var me;
      if (typeof I == "function") me = function() {
        I(te);
      };
      else if (typeof MessageChannel < "u") {
        var fe = new MessageChannel(), ke = fe.port2;
        fe.port1.onmessage = te, me = function() {
          ke.postMessage(null);
        };
      } else me = function() {
        T(te, 0);
      };
      function ce(L) {
        U = L, $ || ($ = true, me());
      }
      function le(L, K) {
        Z = T(function() {
          L(n.unstable_now());
        }, K);
      }
      n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(L) {
        L.callback = null;
      }, n.unstable_continueExecution = function() {
        M || P || (M = true, ce(_));
      }, n.unstable_forceFrameRate = function(L) {
        0 > L || 125 < L ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : J = 0 < L ? Math.floor(1e3 / L) : 5;
      }, n.unstable_getCurrentPriorityLevel = function() {
        return S;
      }, n.unstable_getFirstCallbackNode = function() {
        return l(v);
      }, n.unstable_next = function(L) {
        switch (S) {
          case 1:
          case 2:
          case 3:
            var K = 3;
            break;
          default:
            K = S;
        }
        var G = S;
        S = K;
        try {
          return L();
        } finally {
          S = G;
        }
      }, n.unstable_pauseExecution = function() {
      }, n.unstable_requestPaint = function() {
      }, n.unstable_runWithPriority = function(L, K) {
        switch (L) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            L = 3;
        }
        var G = S;
        S = L;
        try {
          return K();
        } finally {
          S = G;
        }
      }, n.unstable_scheduleCallback = function(L, K, G) {
        var N = n.unstable_now();
        switch (typeof G == "object" && G !== null ? (G = G.delay, G = typeof G == "number" && 0 < G ? N + G : N) : G = N, L) {
          case 1:
            var B = -1;
            break;
          case 2:
            B = 250;
            break;
          case 5:
            B = 1073741823;
            break;
          case 4:
            B = 1e4;
            break;
          default:
            B = 5e3;
        }
        return B = G + B, L = {
          id: x++,
          callback: K,
          priorityLevel: L,
          startTime: G,
          expirationTime: B,
          sortIndex: -1
        }, G > N ? (L.sortIndex = G, i(y, L), l(v) === null && L === l(y) && (b ? (j(Z), Z = -1) : b = true, le(O, G - N))) : (L.sortIndex = B, i(v, L), M || P || (M = true, ce(_))), L;
      }, n.unstable_shouldYield = ae, n.unstable_wrapCallback = function(L) {
        var K = S;
        return function() {
          var G = S;
          S = K;
          try {
            return L.apply(this, arguments);
          } finally {
            S = G;
          }
        };
      };
    }(ds)), ds;
  }
  var ff;
  function Nv() {
    return ff || (ff = 1, cs.exports = Ev()), cs.exports;
  }
  var pf;
  function Rv() {
    if (pf) return lt;
    pf = 1;
    var n = As(), i = Nv();
    function l(e) {
      for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++) t += "&args[]=" + encodeURIComponent(arguments[r]);
      return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var s = /* @__PURE__ */ new Set(), c = {};
    function d(e, t) {
      f(e, t), f(e + "Capture", t);
    }
    function f(e, t) {
      for (c[e] = t, e = 0; e < t.length; e++) s.add(t[e]);
    }
    var p = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), v = Object.prototype.hasOwnProperty, y = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, x = {}, k = {};
    function S(e) {
      return v.call(k, e) ? true : v.call(x, e) ? false : y.test(e) ? k[e] = true : (x[e] = true, false);
    }
    function P(e, t, r, o) {
      if (r !== null && r.type === 0) return false;
      switch (typeof t) {
        case "function":
        case "symbol":
          return true;
        case "boolean":
          return o ? false : r !== null ? !r.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
        default:
          return false;
      }
    }
    function M(e, t, r, o) {
      if (t === null || typeof t > "u" || P(e, t, r, o)) return true;
      if (o) return false;
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
    function b(e, t, r, o, a, u, m) {
      this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = a, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = u, this.removeEmptyString = m;
    }
    var T = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
      T[e] = new b(e, 0, false, e, null, false, false);
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
      T[t] = new b(t, 1, false, e[1], null, false, false);
    }), [
      "contentEditable",
      "draggable",
      "spellCheck",
      "value"
    ].forEach(function(e) {
      T[e] = new b(e, 2, false, e.toLowerCase(), null, false, false);
    }), [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha"
    ].forEach(function(e) {
      T[e] = new b(e, 2, false, e, null, false, false);
    }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
      T[e] = new b(e, 3, false, e.toLowerCase(), null, false, false);
    }), [
      "checked",
      "multiple",
      "muted",
      "selected"
    ].forEach(function(e) {
      T[e] = new b(e, 3, true, e, null, false, false);
    }), [
      "capture",
      "download"
    ].forEach(function(e) {
      T[e] = new b(e, 4, false, e, null, false, false);
    }), [
      "cols",
      "rows",
      "size",
      "span"
    ].forEach(function(e) {
      T[e] = new b(e, 6, false, e, null, false, false);
    }), [
      "rowSpan",
      "start"
    ].forEach(function(e) {
      T[e] = new b(e, 5, false, e.toLowerCase(), null, false, false);
    });
    var j = /[\-:]([a-z])/g;
    function I(e) {
      return e[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
      var t = e.replace(j, I);
      T[t] = new b(t, 1, false, e, null, false, false);
    }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
      var t = e.replace(j, I);
      T[t] = new b(t, 1, false, e, "http://www.w3.org/1999/xlink", false, false);
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
    ].forEach(function(e) {
      var t = e.replace(j, I);
      T[t] = new b(t, 1, false, e, "http://www.w3.org/XML/1998/namespace", false, false);
    }), [
      "tabIndex",
      "crossOrigin"
    ].forEach(function(e) {
      T[e] = new b(e, 1, false, e.toLowerCase(), null, false, false);
    }), T.xlinkHref = new b("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false), [
      "src",
      "href",
      "action",
      "formAction"
    ].forEach(function(e) {
      T[e] = new b(e, 1, false, e.toLowerCase(), null, true, true);
    });
    function W(e, t, r, o) {
      var a = T.hasOwnProperty(t) ? T[t] : null;
      (a !== null ? a.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (M(t, r, a, o) && (r = null), o || a === null ? S(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r)) : a.mustUseProperty ? e[a.propertyName] = r === null ? a.type === 3 ? false : "" : r : (t = a.attributeName, o = a.attributeNamespace, r === null ? e.removeAttribute(t) : (a = a.type, r = a === 3 || a === 4 && r === true ? "" : "" + r, o ? e.setAttributeNS(o, t, r) : e.setAttribute(t, r))));
    }
    var O = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, _ = Symbol.for("react.element"), $ = Symbol.for("react.portal"), U = Symbol.for("react.fragment"), Z = Symbol.for("react.strict_mode"), J = Symbol.for("react.profiler"), oe = Symbol.for("react.provider"), ae = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), me = Symbol.for("react.suspense"), fe = Symbol.for("react.suspense_list"), ke = Symbol.for("react.memo"), ce = Symbol.for("react.lazy"), le = Symbol.for("react.offscreen"), L = Symbol.iterator;
    function K(e) {
      return e === null || typeof e != "object" ? null : (e = L && e[L] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var G = Object.assign, N;
    function B(e) {
      if (N === void 0) try {
        throw Error();
      } catch (r) {
        var t = r.stack.trim().match(/\n( *(at )?)/);
        N = t && t[1] || "";
      }
      return `
` + N + e;
    }
    var se = false;
    function de(e, t) {
      if (!e || se) return "";
      se = true;
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
          } catch (D) {
            var o = D;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (D) {
            o = D;
          }
          e.call(t.prototype);
        }
        else {
          try {
            throw Error();
          } catch (D) {
            o = D;
          }
          e();
        }
      } catch (D) {
        if (D && o && typeof D.stack == "string") {
          for (var a = D.stack.split(`
`), u = o.stack.split(`
`), m = a.length - 1, w = u.length - 1; 1 <= m && 0 <= w && a[m] !== u[w]; ) w--;
          for (; 1 <= m && 0 <= w; m--, w--) if (a[m] !== u[w]) {
            if (m !== 1 || w !== 1) do
              if (m--, w--, 0 > w || a[m] !== u[w]) {
                var C = `
` + a[m].replace(" at new ", " at ");
                return e.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", e.displayName)), C;
              }
            while (1 <= m && 0 <= w);
            break;
          }
        }
      } finally {
        se = false, Error.prepareStackTrace = r;
      }
      return (e = e ? e.displayName || e.name : "") ? B(e) : "";
    }
    function he(e) {
      switch (e.tag) {
        case 5:
          return B(e.type);
        case 16:
          return B("Lazy");
        case 13:
          return B("Suspense");
        case 19:
          return B("SuspenseList");
        case 0:
        case 2:
        case 15:
          return e = de(e.type, false), e;
        case 11:
          return e = de(e.type.render, false), e;
        case 1:
          return e = de(e.type, true), e;
        default:
          return "";
      }
    }
    function ge(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case U:
          return "Fragment";
        case $:
          return "Portal";
        case J:
          return "Profiler";
        case Z:
          return "StrictMode";
        case me:
          return "Suspense";
        case fe:
          return "SuspenseList";
      }
      if (typeof e == "object") switch (e.$$typeof) {
        case ae:
          return (e.displayName || "Context") + ".Consumer";
        case oe:
          return (e._context.displayName || "Context") + ".Provider";
        case te:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ke:
          return t = e.displayName || null, t !== null ? t : ge(e.type) || "Memo";
        case ce:
          t = e._payload, e = e._init;
          try {
            return ge(e(t));
          } catch {
          }
      }
      return null;
    }
    function ye(e) {
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
          return ge(t);
        case 8:
          return t === Z ? "StrictMode" : "Mode";
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
    function we(e) {
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
    function Ce(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function qe(e) {
      var t = Ce(e) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
      if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
        var a = r.get, u = r.set;
        return Object.defineProperty(e, t, {
          configurable: true,
          get: function() {
            return a.call(this);
          },
          set: function(m) {
            o = "" + m, u.call(this, m);
          }
        }), Object.defineProperty(e, t, {
          enumerable: r.enumerable
        }), {
          getValue: function() {
            return o;
          },
          setValue: function(m) {
            o = "" + m;
          },
          stopTracking: function() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }
    function Vr(e) {
      e._valueTracker || (e._valueTracker = qe(e));
    }
    function Mo(e) {
      if (!e) return false;
      var t = e._valueTracker;
      if (!t) return true;
      var r = t.getValue(), o = "";
      return e && (o = Ce(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== r ? (t.setValue(e), true) : false;
    }
    function $t(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function ml(e, t) {
      var r = t.checked;
      return G({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: r ?? e._wrapperState.initialChecked
      });
    }
    function pu(e, t) {
      var r = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
      r = we(t.value != null ? t.value : r), e._wrapperState = {
        initialChecked: o,
        initialValue: r,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
      };
    }
    function mu(e, t) {
      t = t.checked, t != null && W(e, "checked", t, false);
    }
    function hl(e, t) {
      mu(e, t);
      var r = we(t.value), o = t.type;
      if (r != null) o === "number" ? (r === 0 && e.value === "" || e.value != r) && (e.value = "" + r) : e.value !== "" + r && (e.value = "" + r);
      else if (o === "submit" || o === "reset") {
        e.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? gl(e, t.type, r) : t.hasOwnProperty("defaultValue") && gl(e, t.type, we(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
    }
    function hu(e, t, r) {
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var o = t.type;
        if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
        t = "" + e._wrapperState.initialValue, r || t === e.value || (e.value = t), e.defaultValue = t;
      }
      r = e.name, r !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, r !== "" && (e.name = r);
    }
    function gl(e, t, r) {
      (t !== "number" || $t(e.ownerDocument) !== e) && (r == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
    }
    var On = Array.isArray;
    function Gr(e, t, r, o) {
      if (e = e.options, t) {
        t = {};
        for (var a = 0; a < r.length; a++) t["$" + r[a]] = true;
        for (r = 0; r < e.length; r++) a = t.hasOwnProperty("$" + e[r].value), e[r].selected !== a && (e[r].selected = a), a && o && (e[r].defaultSelected = true);
      } else {
        for (r = "" + we(r), t = null, a = 0; a < e.length; a++) {
          if (e[a].value === r) {
            e[a].selected = true, o && (e[a].defaultSelected = true);
            return;
          }
          t !== null || e[a].disabled || (t = e[a]);
        }
        t !== null && (t.selected = true);
      }
    }
    function vl(e, t) {
      if (t.dangerouslySetInnerHTML != null) throw Error(l(91));
      return G({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
      });
    }
    function gu(e, t) {
      var r = t.value;
      if (r == null) {
        if (r = t.children, t = t.defaultValue, r != null) {
          if (t != null) throw Error(l(92));
          if (On(r)) {
            if (1 < r.length) throw Error(l(93));
            r = r[0];
          }
          t = r;
        }
        t == null && (t = ""), r = t;
      }
      e._wrapperState = {
        initialValue: we(r)
      };
    }
    function vu(e, t) {
      var r = we(t.value), o = we(t.defaultValue);
      r != null && (r = "" + r, r !== e.value && (e.value = r), t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)), o != null && (e.defaultValue = "" + o);
    }
    function yu(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
    }
    function wu(e) {
      switch (e) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function yl(e, t) {
      return e == null || e === "http://www.w3.org/1999/xhtml" ? wu(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
    }
    var Do, xu = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, o, a) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, r, o, a);
        });
      } : e;
    }(function(e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
      else {
        for (Do = Do || document.createElement("div"), Do.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Do.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
    function jn(e, t) {
      if (t) {
        var r = e.firstChild;
        if (r && r === e.lastChild && r.nodeType === 3) {
          r.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var Ln = {
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
    Object.keys(Ln).forEach(function(e) {
      Ph.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1), Ln[t] = Ln[e];
      });
    });
    function Su(e, t, r) {
      return t == null || typeof t == "boolean" || t === "" ? "" : r || typeof t != "number" || t === 0 || Ln.hasOwnProperty(e) && Ln[e] ? ("" + t).trim() : t + "px";
    }
    function ku(e, t) {
      e = e.style;
      for (var r in t) if (t.hasOwnProperty(r)) {
        var o = r.indexOf("--") === 0, a = Su(r, t[r], o);
        r === "float" && (r = "cssFloat"), o ? e.setProperty(r, a) : e[r] = a;
      }
    }
    var bh = G({
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
    function wl(e, t) {
      if (t) {
        if (bh[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(l(137, e));
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null) throw Error(l(60));
          if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(l(61));
        }
        if (t.style != null && typeof t.style != "object") throw Error(l(62));
      }
    }
    function xl(e, t) {
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
    var Sl = null;
    function kl(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    var Cl = null, Kr = null, Qr = null;
    function Cu(e) {
      if (e = oo(e)) {
        if (typeof Cl != "function") throw Error(l(280));
        var t = e.stateNode;
        t && (t = ti(t), Cl(e.stateNode, e.type, t));
      }
    }
    function Pu(e) {
      Kr ? Qr ? Qr.push(e) : Qr = [
        e
      ] : Kr = e;
    }
    function bu() {
      if (Kr) {
        var e = Kr, t = Qr;
        if (Qr = Kr = null, Cu(e), t) for (e = 0; e < t.length; e++) Cu(t[e]);
      }
    }
    function Eu(e, t) {
      return e(t);
    }
    function Nu() {
    }
    var Pl = false;
    function Ru(e, t, r) {
      if (Pl) return e(t, r);
      Pl = true;
      try {
        return Eu(e, t, r);
      } finally {
        Pl = false, (Kr !== null || Qr !== null) && (Nu(), bu());
      }
    }
    function Bn(e, t) {
      var r = e.stateNode;
      if (r === null) return null;
      var o = ti(r);
      if (o === null) return null;
      r = o[t];
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
          (o = !o.disabled) || (e = e.type, o = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !o;
          break e;
        default:
          e = false;
      }
      if (e) return null;
      if (r && typeof r != "function") throw Error(l(231, t, typeof r));
      return r;
    }
    var bl = false;
    if (p) try {
      var zn = {};
      Object.defineProperty(zn, "passive", {
        get: function() {
          bl = true;
        }
      }), window.addEventListener("test", zn, zn), window.removeEventListener("test", zn, zn);
    } catch {
      bl = false;
    }
    function Eh(e, t, r, o, a, u, m, w, C) {
      var D = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(r, D);
      } catch (F) {
        this.onError(F);
      }
    }
    var Fn = false, _o = null, Oo = false, El = null, Nh = {
      onError: function(e) {
        Fn = true, _o = e;
      }
    };
    function Rh(e, t, r, o, a, u, m, w, C) {
      Fn = false, _o = null, Eh.apply(Nh, arguments);
    }
    function Th(e, t, r, o, a, u, m, w, C) {
      if (Rh.apply(this, arguments), Fn) {
        if (Fn) {
          var D = _o;
          Fn = false, _o = null;
        } else throw Error(l(198));
        Oo || (Oo = true, El = D);
      }
    }
    function Ar(e) {
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
    function Tu(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function Au(e) {
      if (Ar(e) !== e) throw Error(l(188));
    }
    function Ah(e) {
      var t = e.alternate;
      if (!t) {
        if (t = Ar(e), t === null) throw Error(l(188));
        return t !== e ? null : e;
      }
      for (var r = e, o = t; ; ) {
        var a = r.return;
        if (a === null) break;
        var u = a.alternate;
        if (u === null) {
          if (o = a.return, o !== null) {
            r = o;
            continue;
          }
          break;
        }
        if (a.child === u.child) {
          for (u = a.child; u; ) {
            if (u === r) return Au(a), e;
            if (u === o) return Au(a), t;
            u = u.sibling;
          }
          throw Error(l(188));
        }
        if (r.return !== o.return) r = a, o = u;
        else {
          for (var m = false, w = a.child; w; ) {
            if (w === r) {
              m = true, r = a, o = u;
              break;
            }
            if (w === o) {
              m = true, o = a, r = u;
              break;
            }
            w = w.sibling;
          }
          if (!m) {
            for (w = u.child; w; ) {
              if (w === r) {
                m = true, r = u, o = a;
                break;
              }
              if (w === o) {
                m = true, o = u, r = a;
                break;
              }
              w = w.sibling;
            }
            if (!m) throw Error(l(189));
          }
        }
        if (r.alternate !== o) throw Error(l(190));
      }
      if (r.tag !== 3) throw Error(l(188));
      return r.stateNode.current === r ? e : t;
    }
    function Mu(e) {
      return e = Ah(e), e !== null ? Du(e) : null;
    }
    function Du(e) {
      if (e.tag === 5 || e.tag === 6) return e;
      for (e = e.child; e !== null; ) {
        var t = Du(e);
        if (t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var _u = i.unstable_scheduleCallback, Ou = i.unstable_cancelCallback, Mh = i.unstable_shouldYield, Dh = i.unstable_requestPaint, _e = i.unstable_now, _h = i.unstable_getCurrentPriorityLevel, Nl = i.unstable_ImmediatePriority, ju = i.unstable_UserBlockingPriority, jo = i.unstable_NormalPriority, Oh = i.unstable_LowPriority, Lu = i.unstable_IdlePriority, Lo = null, Dt = null;
    function jh(e) {
      if (Dt && typeof Dt.onCommitFiberRoot == "function") try {
        Dt.onCommitFiberRoot(Lo, e, void 0, (e.current.flags & 128) === 128);
      } catch {
      }
    }
    var St = Math.clz32 ? Math.clz32 : zh, Lh = Math.log, Bh = Math.LN2;
    function zh(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (Lh(e) / Bh | 0) | 0;
    }
    var Bo = 64, zo = 4194304;
    function In(e) {
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
    function Fo(e, t) {
      var r = e.pendingLanes;
      if (r === 0) return 0;
      var o = 0, a = e.suspendedLanes, u = e.pingedLanes, m = r & 268435455;
      if (m !== 0) {
        var w = m & ~a;
        w !== 0 ? o = In(w) : (u &= m, u !== 0 && (o = In(u)));
      } else m = r & ~a, m !== 0 ? o = In(m) : u !== 0 && (o = In(u));
      if (o === 0) return 0;
      if (t !== 0 && t !== o && !(t & a) && (a = o & -o, u = t & -t, a >= u || a === 16 && (u & 4194240) !== 0)) return t;
      if (o & 4 && (o |= r & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) r = 31 - St(t), a = 1 << r, o |= e[r], t &= ~a;
      return o;
    }
    function Fh(e, t) {
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
    function Ih(e, t) {
      for (var r = e.suspendedLanes, o = e.pingedLanes, a = e.expirationTimes, u = e.pendingLanes; 0 < u; ) {
        var m = 31 - St(u), w = 1 << m, C = a[m];
        C === -1 ? (!(w & r) || w & o) && (a[m] = Fh(w, t)) : C <= t && (e.expiredLanes |= w), u &= ~w;
      }
    }
    function Rl(e) {
      return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
    }
    function Bu() {
      var e = Bo;
      return Bo <<= 1, !(Bo & 4194240) && (Bo = 64), e;
    }
    function Tl(e) {
      for (var t = [], r = 0; 31 > r; r++) t.push(e);
      return t;
    }
    function Wn(e, t, r) {
      e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - St(t), e[t] = r;
    }
    function Wh(e, t) {
      var r = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
      var o = e.eventTimes;
      for (e = e.expirationTimes; 0 < r; ) {
        var a = 31 - St(r), u = 1 << a;
        t[a] = 0, o[a] = -1, e[a] = -1, r &= ~u;
      }
    }
    function Al(e, t) {
      var r = e.entangledLanes |= t;
      for (e = e.entanglements; r; ) {
        var o = 31 - St(r), a = 1 << o;
        a & t | e[o] & t && (e[o] |= t), r &= ~a;
      }
    }
    var Se = 0;
    function zu(e) {
      return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
    }
    var Fu, Ml, Iu, Wu, Hu, Dl = false, Io = [], rr = null, nr = null, or = null, Hn = /* @__PURE__ */ new Map(), $n = /* @__PURE__ */ new Map(), ir = [], Hh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function $u(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          rr = null;
          break;
        case "dragenter":
        case "dragleave":
          nr = null;
          break;
        case "mouseover":
        case "mouseout":
          or = null;
          break;
        case "pointerover":
        case "pointerout":
          Hn.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          $n.delete(t.pointerId);
      }
    }
    function Un(e, t, r, o, a, u) {
      return e === null || e.nativeEvent !== u ? (e = {
        blockedOn: t,
        domEventName: r,
        eventSystemFlags: o,
        nativeEvent: u,
        targetContainers: [
          a
        ]
      }, t !== null && (t = oo(t), t !== null && Ml(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
    }
    function $h(e, t, r, o, a) {
      switch (t) {
        case "focusin":
          return rr = Un(rr, e, t, r, o, a), true;
        case "dragenter":
          return nr = Un(nr, e, t, r, o, a), true;
        case "mouseover":
          return or = Un(or, e, t, r, o, a), true;
        case "pointerover":
          var u = a.pointerId;
          return Hn.set(u, Un(Hn.get(u) || null, e, t, r, o, a)), true;
        case "gotpointercapture":
          return u = a.pointerId, $n.set(u, Un($n.get(u) || null, e, t, r, o, a)), true;
      }
      return false;
    }
    function Uu(e) {
      var t = Mr(e.target);
      if (t !== null) {
        var r = Ar(t);
        if (r !== null) {
          if (t = r.tag, t === 13) {
            if (t = Tu(r), t !== null) {
              e.blockedOn = t, Hu(e.priority, function() {
                Iu(r);
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
    function Wo(e) {
      if (e.blockedOn !== null) return false;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var r = Ol(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (r === null) {
          r = e.nativeEvent;
          var o = new r.constructor(r.type, r);
          Sl = o, r.target.dispatchEvent(o), Sl = null;
        } else return t = oo(r), t !== null && Ml(t), e.blockedOn = r, false;
        t.shift();
      }
      return true;
    }
    function Vu(e, t, r) {
      Wo(e) && r.delete(t);
    }
    function Uh() {
      Dl = false, rr !== null && Wo(rr) && (rr = null), nr !== null && Wo(nr) && (nr = null), or !== null && Wo(or) && (or = null), Hn.forEach(Vu), $n.forEach(Vu);
    }
    function Vn(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Dl || (Dl = true, i.unstable_scheduleCallback(i.unstable_NormalPriority, Uh)));
    }
    function Gn(e) {
      function t(a) {
        return Vn(a, e);
      }
      if (0 < Io.length) {
        Vn(Io[0], e);
        for (var r = 1; r < Io.length; r++) {
          var o = Io[r];
          o.blockedOn === e && (o.blockedOn = null);
        }
      }
      for (rr !== null && Vn(rr, e), nr !== null && Vn(nr, e), or !== null && Vn(or, e), Hn.forEach(t), $n.forEach(t), r = 0; r < ir.length; r++) o = ir[r], o.blockedOn === e && (o.blockedOn = null);
      for (; 0 < ir.length && (r = ir[0], r.blockedOn === null); ) Uu(r), r.blockedOn === null && ir.shift();
    }
    var Yr = O.ReactCurrentBatchConfig, Ho = true;
    function Vh(e, t, r, o) {
      var a = Se, u = Yr.transition;
      Yr.transition = null;
      try {
        Se = 1, _l(e, t, r, o);
      } finally {
        Se = a, Yr.transition = u;
      }
    }
    function Gh(e, t, r, o) {
      var a = Se, u = Yr.transition;
      Yr.transition = null;
      try {
        Se = 4, _l(e, t, r, o);
      } finally {
        Se = a, Yr.transition = u;
      }
    }
    function _l(e, t, r, o) {
      if (Ho) {
        var a = Ol(e, t, r, o);
        if (a === null) ql(e, t, o, $o, r), $u(e, o);
        else if ($h(a, e, t, r, o)) o.stopPropagation();
        else if ($u(e, o), t & 4 && -1 < Hh.indexOf(e)) {
          for (; a !== null; ) {
            var u = oo(a);
            if (u !== null && Fu(u), u = Ol(e, t, r, o), u === null && ql(e, t, o, $o, r), u === a) break;
            a = u;
          }
          a !== null && o.stopPropagation();
        } else ql(e, t, o, null, r);
      }
    }
    var $o = null;
    function Ol(e, t, r, o) {
      if ($o = null, e = kl(o), e = Mr(e), e !== null) if (t = Ar(e), t === null) e = null;
      else if (r = t.tag, r === 13) {
        if (e = Tu(t), e !== null) return e;
        e = null;
      } else if (r === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
      return $o = e, null;
    }
    function Gu(e) {
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
          switch (_h()) {
            case Nl:
              return 1;
            case ju:
              return 4;
            case jo:
            case Oh:
              return 16;
            case Lu:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var lr = null, jl = null, Uo = null;
    function Ku() {
      if (Uo) return Uo;
      var e, t = jl, r = t.length, o, a = "value" in lr ? lr.value : lr.textContent, u = a.length;
      for (e = 0; e < r && t[e] === a[e]; e++) ;
      var m = r - e;
      for (o = 1; o <= m && t[r - o] === a[u - o]; o++) ;
      return Uo = a.slice(e, 1 < o ? 1 - o : void 0);
    }
    function Vo(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function Go() {
      return true;
    }
    function Qu() {
      return false;
    }
    function at(e) {
      function t(r, o, a, u, m) {
        this._reactName = r, this._targetInst = a, this.type = o, this.nativeEvent = u, this.target = m, this.currentTarget = null;
        for (var w in e) e.hasOwnProperty(w) && (r = e[w], this[w] = r ? r(u) : u[w]);
        return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === false) ? Go : Qu, this.isPropagationStopped = Qu, this;
      }
      return G(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = true;
          var r = this.nativeEvent;
          r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = false), this.isDefaultPrevented = Go);
        },
        stopPropagation: function() {
          var r = this.nativeEvent;
          r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = true), this.isPropagationStopped = Go);
        },
        persist: function() {
        },
        isPersistent: Go
      }), t;
    }
    var Xr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Ll = at(Xr), Kn = G({}, Xr, {
      view: 0,
      detail: 0
    }), Kh = at(Kn), Bl, zl, Qn, Ko = G({}, Kn, {
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
      getModifierState: Il,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== Qn && (Qn && e.type === "mousemove" ? (Bl = e.screenX - Qn.screenX, zl = e.screenY - Qn.screenY) : zl = Bl = 0, Qn = e), Bl);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : zl;
      }
    }), Yu = at(Ko), Qh = G({}, Ko, {
      dataTransfer: 0
    }), Yh = at(Qh), Xh = G({}, Kn, {
      relatedTarget: 0
    }), Fl = at(Xh), qh = G({}, Xr, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Jh = at(qh), Zh = G({}, Xr, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), eg = at(Zh), tg = G({}, Xr, {
      data: 0
    }), Xu = at(tg), rg = {
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
    }, ng = {
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
    }, og = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function ig(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = og[e]) ? !!t[e] : false;
    }
    function Il() {
      return ig;
    }
    var lg = G({}, Kn, {
      key: function(e) {
        if (e.key) {
          var t = rg[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = Vo(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ng[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Il,
      charCode: function(e) {
        return e.type === "keypress" ? Vo(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Vo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), ag = at(lg), sg = G({}, Ko, {
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
    }), qu = at(sg), ug = G({}, Kn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Il
    }), cg = at(ug), dg = G({}, Xr, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), fg = at(dg), pg = G({}, Ko, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), mg = at(pg), hg = [
      9,
      13,
      27,
      32
    ], Wl = p && "CompositionEvent" in window, Yn = null;
    p && "documentMode" in document && (Yn = document.documentMode);
    var gg = p && "TextEvent" in window && !Yn, Ju = p && (!Wl || Yn && 8 < Yn && 11 >= Yn), Zu = " ", ec = false;
    function tc(e, t) {
      switch (e) {
        case "keyup":
          return hg.indexOf(t.keyCode) !== -1;
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
    function rc(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    var qr = false;
    function vg(e, t) {
      switch (e) {
        case "compositionend":
          return rc(t);
        case "keypress":
          return t.which !== 32 ? null : (ec = true, Zu);
        case "textInput":
          return e = t.data, e === Zu && ec ? null : e;
        default:
          return null;
      }
    }
    function yg(e, t) {
      if (qr) return e === "compositionend" || !Wl && tc(e, t) ? (e = Ku(), Uo = jl = lr = null, qr = false, e) : null;
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
          return Ju && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var wg = {
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
    function nc(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!wg[e.type] : t === "textarea";
    }
    function oc(e, t, r, o) {
      Pu(o), t = Jo(t, "onChange"), 0 < t.length && (r = new Ll("onChange", "change", null, r, o), e.push({
        event: r,
        listeners: t
      }));
    }
    var Xn = null, qn = null;
    function xg(e) {
      kc(e, 0);
    }
    function Qo(e) {
      var t = rn(e);
      if (Mo(t)) return e;
    }
    function Sg(e, t) {
      if (e === "change") return t;
    }
    var ic = false;
    if (p) {
      var Hl;
      if (p) {
        var $l = "oninput" in document;
        if (!$l) {
          var lc = document.createElement("div");
          lc.setAttribute("oninput", "return;"), $l = typeof lc.oninput == "function";
        }
        Hl = $l;
      } else Hl = false;
      ic = Hl && (!document.documentMode || 9 < document.documentMode);
    }
    function ac() {
      Xn && (Xn.detachEvent("onpropertychange", sc), qn = Xn = null);
    }
    function sc(e) {
      if (e.propertyName === "value" && Qo(qn)) {
        var t = [];
        oc(t, qn, e, kl(e)), Ru(xg, t);
      }
    }
    function kg(e, t, r) {
      e === "focusin" ? (ac(), Xn = t, qn = r, Xn.attachEvent("onpropertychange", sc)) : e === "focusout" && ac();
    }
    function Cg(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown") return Qo(qn);
    }
    function Pg(e, t) {
      if (e === "click") return Qo(t);
    }
    function bg(e, t) {
      if (e === "input" || e === "change") return Qo(t);
    }
    function Eg(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var kt = typeof Object.is == "function" ? Object.is : Eg;
    function Jn(e, t) {
      if (kt(e, t)) return true;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null) return false;
      var r = Object.keys(e), o = Object.keys(t);
      if (r.length !== o.length) return false;
      for (o = 0; o < r.length; o++) {
        var a = r[o];
        if (!v.call(t, a) || !kt(e[a], t[a])) return false;
      }
      return true;
    }
    function uc(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function cc(e, t) {
      var r = uc(e);
      e = 0;
      for (var o; r; ) {
        if (r.nodeType === 3) {
          if (o = e + r.textContent.length, e <= t && o >= t) return {
            node: r,
            offset: t - e
          };
          e = o;
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
        r = uc(r);
      }
    }
    function dc(e, t) {
      return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? dc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
    }
    function fc() {
      for (var e = window, t = $t(); t instanceof e.HTMLIFrameElement; ) {
        try {
          var r = typeof t.contentWindow.location.href == "string";
        } catch {
          r = false;
        }
        if (r) e = t.contentWindow;
        else break;
        t = $t(e.document);
      }
      return t;
    }
    function Ul(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function Ng(e) {
      var t = fc(), r = e.focusedElem, o = e.selectionRange;
      if (t !== r && r && r.ownerDocument && dc(r.ownerDocument.documentElement, r)) {
        if (o !== null && Ul(r)) {
          if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in r) r.selectionStart = t, r.selectionEnd = Math.min(e, r.value.length);
          else if (e = (t = r.ownerDocument || document) && t.defaultView || window, e.getSelection) {
            e = e.getSelection();
            var a = r.textContent.length, u = Math.min(o.start, a);
            o = o.end === void 0 ? u : Math.min(o.end, a), !e.extend && u > o && (a = o, o = u, u = a), a = cc(r, u);
            var m = cc(r, o);
            a && m && (e.rangeCount !== 1 || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== m.node || e.focusOffset !== m.offset) && (t = t.createRange(), t.setStart(a.node, a.offset), e.removeAllRanges(), u > o ? (e.addRange(t), e.extend(m.node, m.offset)) : (t.setEnd(m.node, m.offset), e.addRange(t)));
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
    var Rg = p && "documentMode" in document && 11 >= document.documentMode, Jr = null, Vl = null, Zn = null, Gl = false;
    function pc(e, t, r) {
      var o = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
      Gl || Jr == null || Jr !== $t(o) || (o = Jr, "selectionStart" in o && Ul(o) ? o = {
        start: o.selectionStart,
        end: o.selectionEnd
      } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
        anchorNode: o.anchorNode,
        anchorOffset: o.anchorOffset,
        focusNode: o.focusNode,
        focusOffset: o.focusOffset
      }), Zn && Jn(Zn, o) || (Zn = o, o = Jo(Vl, "onSelect"), 0 < o.length && (t = new Ll("onSelect", "select", null, t, r), e.push({
        event: t,
        listeners: o
      }), t.target = Jr)));
    }
    function Yo(e, t) {
      var r = {};
      return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
    }
    var Zr = {
      animationend: Yo("Animation", "AnimationEnd"),
      animationiteration: Yo("Animation", "AnimationIteration"),
      animationstart: Yo("Animation", "AnimationStart"),
      transitionend: Yo("Transition", "TransitionEnd")
    }, Kl = {}, mc = {};
    p && (mc = document.createElement("div").style, "AnimationEvent" in window || (delete Zr.animationend.animation, delete Zr.animationiteration.animation, delete Zr.animationstart.animation), "TransitionEvent" in window || delete Zr.transitionend.transition);
    function Xo(e) {
      if (Kl[e]) return Kl[e];
      if (!Zr[e]) return e;
      var t = Zr[e], r;
      for (r in t) if (t.hasOwnProperty(r) && r in mc) return Kl[e] = t[r];
      return e;
    }
    var hc = Xo("animationend"), gc = Xo("animationiteration"), vc = Xo("animationstart"), yc = Xo("transitionend"), wc = /* @__PURE__ */ new Map(), xc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    function ar(e, t) {
      wc.set(e, t), d(t, [
        e
      ]);
    }
    for (var Ql = 0; Ql < xc.length; Ql++) {
      var Yl = xc[Ql], Tg = Yl.toLowerCase(), Ag = Yl[0].toUpperCase() + Yl.slice(1);
      ar(Tg, "on" + Ag);
    }
    ar(hc, "onAnimationEnd"), ar(gc, "onAnimationIteration"), ar(vc, "onAnimationStart"), ar("dblclick", "onDoubleClick"), ar("focusin", "onFocus"), ar("focusout", "onBlur"), ar(yc, "onTransitionEnd"), f("onMouseEnter", [
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
    var eo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Mg = new Set("cancel close invalid load scroll toggle".split(" ").concat(eo));
    function Sc(e, t, r) {
      var o = e.type || "unknown-event";
      e.currentTarget = r, Th(o, t, void 0, e), e.currentTarget = null;
    }
    function kc(e, t) {
      t = (t & 4) !== 0;
      for (var r = 0; r < e.length; r++) {
        var o = e[r], a = o.event;
        o = o.listeners;
        e: {
          var u = void 0;
          if (t) for (var m = o.length - 1; 0 <= m; m--) {
            var w = o[m], C = w.instance, D = w.currentTarget;
            if (w = w.listener, C !== u && a.isPropagationStopped()) break e;
            Sc(a, w, D), u = C;
          }
          else for (m = 0; m < o.length; m++) {
            if (w = o[m], C = w.instance, D = w.currentTarget, w = w.listener, C !== u && a.isPropagationStopped()) break e;
            Sc(a, w, D), u = C;
          }
        }
      }
      if (Oo) throw e = El, Oo = false, El = null, e;
    }
    function be(e, t) {
      var r = t[na];
      r === void 0 && (r = t[na] = /* @__PURE__ */ new Set());
      var o = e + "__bubble";
      r.has(o) || (Cc(t, e, 2, false), r.add(o));
    }
    function Xl(e, t, r) {
      var o = 0;
      t && (o |= 4), Cc(r, e, o, t);
    }
    var qo = "_reactListening" + Math.random().toString(36).slice(2);
    function to(e) {
      if (!e[qo]) {
        e[qo] = true, s.forEach(function(r) {
          r !== "selectionchange" && (Mg.has(r) || Xl(r, false, e), Xl(r, true, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[qo] || (t[qo] = true, Xl("selectionchange", false, t));
      }
    }
    function Cc(e, t, r, o) {
      switch (Gu(t)) {
        case 1:
          var a = Vh;
          break;
        case 4:
          a = Gh;
          break;
        default:
          a = _l;
      }
      r = a.bind(null, t, r, e), a = void 0, !bl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = true), o ? a !== void 0 ? e.addEventListener(t, r, {
        capture: true,
        passive: a
      }) : e.addEventListener(t, r, true) : a !== void 0 ? e.addEventListener(t, r, {
        passive: a
      }) : e.addEventListener(t, r, false);
    }
    function ql(e, t, r, o, a) {
      var u = o;
      if (!(t & 1) && !(t & 2) && o !== null) e: for (; ; ) {
        if (o === null) return;
        var m = o.tag;
        if (m === 3 || m === 4) {
          var w = o.stateNode.containerInfo;
          if (w === a || w.nodeType === 8 && w.parentNode === a) break;
          if (m === 4) for (m = o.return; m !== null; ) {
            var C = m.tag;
            if ((C === 3 || C === 4) && (C = m.stateNode.containerInfo, C === a || C.nodeType === 8 && C.parentNode === a)) return;
            m = m.return;
          }
          for (; w !== null; ) {
            if (m = Mr(w), m === null) return;
            if (C = m.tag, C === 5 || C === 6) {
              o = u = m;
              continue e;
            }
            w = w.parentNode;
          }
        }
        o = o.return;
      }
      Ru(function() {
        var D = u, F = kl(r), H = [];
        e: {
          var z = wc.get(e);
          if (z !== void 0) {
            var Q = Ll, X = e;
            switch (e) {
              case "keypress":
                if (Vo(r) === 0) break e;
              case "keydown":
              case "keyup":
                Q = ag;
                break;
              case "focusin":
                X = "focus", Q = Fl;
                break;
              case "focusout":
                X = "blur", Q = Fl;
                break;
              case "beforeblur":
              case "afterblur":
                Q = Fl;
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
                Q = Yu;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                Q = Yh;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                Q = cg;
                break;
              case hc:
              case gc:
              case vc:
                Q = Jh;
                break;
              case yc:
                Q = fg;
                break;
              case "scroll":
                Q = Kh;
                break;
              case "wheel":
                Q = mg;
                break;
              case "copy":
              case "cut":
              case "paste":
                Q = eg;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                Q = qu;
            }
            var q = (t & 4) !== 0, Oe = !q && e === "scroll", R = q ? z !== null ? z + "Capture" : null : z;
            q = [];
            for (var E = D, A; E !== null; ) {
              A = E;
              var V = A.stateNode;
              if (A.tag === 5 && V !== null && (A = V, R !== null && (V = Bn(E, R), V != null && q.push(ro(E, V, A)))), Oe) break;
              E = E.return;
            }
            0 < q.length && (z = new Q(z, X, null, r, F), H.push({
              event: z,
              listeners: q
            }));
          }
        }
        if (!(t & 7)) {
          e: {
            if (z = e === "mouseover" || e === "pointerover", Q = e === "mouseout" || e === "pointerout", z && r !== Sl && (X = r.relatedTarget || r.fromElement) && (Mr(X) || X[Ut])) break e;
            if ((Q || z) && (z = F.window === F ? F : (z = F.ownerDocument) ? z.defaultView || z.parentWindow : window, Q ? (X = r.relatedTarget || r.toElement, Q = D, X = X ? Mr(X) : null, X !== null && (Oe = Ar(X), X !== Oe || X.tag !== 5 && X.tag !== 6) && (X = null)) : (Q = null, X = D), Q !== X)) {
              if (q = Yu, V = "onMouseLeave", R = "onMouseEnter", E = "mouse", (e === "pointerout" || e === "pointerover") && (q = qu, V = "onPointerLeave", R = "onPointerEnter", E = "pointer"), Oe = Q == null ? z : rn(Q), A = X == null ? z : rn(X), z = new q(V, E + "leave", Q, r, F), z.target = Oe, z.relatedTarget = A, V = null, Mr(F) === D && (q = new q(R, E + "enter", X, r, F), q.target = A, q.relatedTarget = Oe, V = q), Oe = V, Q && X) t: {
                for (q = Q, R = X, E = 0, A = q; A; A = en(A)) E++;
                for (A = 0, V = R; V; V = en(V)) A++;
                for (; 0 < E - A; ) q = en(q), E--;
                for (; 0 < A - E; ) R = en(R), A--;
                for (; E--; ) {
                  if (q === R || R !== null && q === R.alternate) break t;
                  q = en(q), R = en(R);
                }
                q = null;
              }
              else q = null;
              Q !== null && Pc(H, z, Q, q, false), X !== null && Oe !== null && Pc(H, Oe, X, q, true);
            }
          }
          e: {
            if (z = D ? rn(D) : window, Q = z.nodeName && z.nodeName.toLowerCase(), Q === "select" || Q === "input" && z.type === "file") var ee = Sg;
            else if (nc(z)) if (ic) ee = bg;
            else {
              ee = Cg;
              var re = kg;
            }
            else (Q = z.nodeName) && Q.toLowerCase() === "input" && (z.type === "checkbox" || z.type === "radio") && (ee = Pg);
            if (ee && (ee = ee(e, D))) {
              oc(H, ee, r, F);
              break e;
            }
            re && re(e, z, D), e === "focusout" && (re = z._wrapperState) && re.controlled && z.type === "number" && gl(z, "number", z.value);
          }
          switch (re = D ? rn(D) : window, e) {
            case "focusin":
              (nc(re) || re.contentEditable === "true") && (Jr = re, Vl = D, Zn = null);
              break;
            case "focusout":
              Zn = Vl = Jr = null;
              break;
            case "mousedown":
              Gl = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Gl = false, pc(H, r, F);
              break;
            case "selectionchange":
              if (Rg) break;
            case "keydown":
            case "keyup":
              pc(H, r, F);
          }
          var ne;
          if (Wl) e: {
            switch (e) {
              case "compositionstart":
                var ie = "onCompositionStart";
                break e;
              case "compositionend":
                ie = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ie = "onCompositionUpdate";
                break e;
            }
            ie = void 0;
          }
          else qr ? tc(e, r) && (ie = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (ie = "onCompositionStart");
          ie && (Ju && r.locale !== "ko" && (qr || ie !== "onCompositionStart" ? ie === "onCompositionEnd" && qr && (ne = Ku()) : (lr = F, jl = "value" in lr ? lr.value : lr.textContent, qr = true)), re = Jo(D, ie), 0 < re.length && (ie = new Xu(ie, e, null, r, F), H.push({
            event: ie,
            listeners: re
          }), ne ? ie.data = ne : (ne = rc(r), ne !== null && (ie.data = ne)))), (ne = gg ? vg(e, r) : yg(e, r)) && (D = Jo(D, "onBeforeInput"), 0 < D.length && (F = new Xu("onBeforeInput", "beforeinput", null, r, F), H.push({
            event: F,
            listeners: D
          }), F.data = ne));
        }
        kc(H, t);
      });
    }
    function ro(e, t, r) {
      return {
        instance: e,
        listener: t,
        currentTarget: r
      };
    }
    function Jo(e, t) {
      for (var r = t + "Capture", o = []; e !== null; ) {
        var a = e, u = a.stateNode;
        a.tag === 5 && u !== null && (a = u, u = Bn(e, r), u != null && o.unshift(ro(e, u, a)), u = Bn(e, t), u != null && o.push(ro(e, u, a))), e = e.return;
      }
      return o;
    }
    function en(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5);
      return e || null;
    }
    function Pc(e, t, r, o, a) {
      for (var u = t._reactName, m = []; r !== null && r !== o; ) {
        var w = r, C = w.alternate, D = w.stateNode;
        if (C !== null && C === o) break;
        w.tag === 5 && D !== null && (w = D, a ? (C = Bn(r, u), C != null && m.unshift(ro(r, C, w))) : a || (C = Bn(r, u), C != null && m.push(ro(r, C, w)))), r = r.return;
      }
      m.length !== 0 && e.push({
        event: t,
        listeners: m
      });
    }
    var Dg = /\r\n?/g, _g = /\u0000|\uFFFD/g;
    function bc(e) {
      return (typeof e == "string" ? e : "" + e).replace(Dg, `
`).replace(_g, "");
    }
    function Zo(e, t, r) {
      if (t = bc(t), bc(e) !== t && r) throw Error(l(425));
    }
    function ei() {
    }
    var Jl = null, Zl = null;
    function ea(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    var ta = typeof setTimeout == "function" ? setTimeout : void 0, Og = typeof clearTimeout == "function" ? clearTimeout : void 0, Ec = typeof Promise == "function" ? Promise : void 0, jg = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ec < "u" ? function(e) {
      return Ec.resolve(null).then(e).catch(Lg);
    } : ta;
    function Lg(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function ra(e, t) {
      var r = t, o = 0;
      do {
        var a = r.nextSibling;
        if (e.removeChild(r), a && a.nodeType === 8) if (r = a.data, r === "/$") {
          if (o === 0) {
            e.removeChild(a), Gn(t);
            return;
          }
          o--;
        } else r !== "$" && r !== "$?" && r !== "$!" || o++;
        r = a;
      } while (r);
      Gn(t);
    }
    function sr(e) {
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
    function Nc(e) {
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
    var tn = Math.random().toString(36).slice(2), _t = "__reactFiber$" + tn, no = "__reactProps$" + tn, Ut = "__reactContainer$" + tn, na = "__reactEvents$" + tn, Bg = "__reactListeners$" + tn, zg = "__reactHandles$" + tn;
    function Mr(e) {
      var t = e[_t];
      if (t) return t;
      for (var r = e.parentNode; r; ) {
        if (t = r[Ut] || r[_t]) {
          if (r = t.alternate, t.child !== null || r !== null && r.child !== null) for (e = Nc(e); e !== null; ) {
            if (r = e[_t]) return r;
            e = Nc(e);
          }
          return t;
        }
        e = r, r = e.parentNode;
      }
      return null;
    }
    function oo(e) {
      return e = e[_t] || e[Ut], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
    }
    function rn(e) {
      if (e.tag === 5 || e.tag === 6) return e.stateNode;
      throw Error(l(33));
    }
    function ti(e) {
      return e[no] || null;
    }
    var oa = [], nn = -1;
    function ur(e) {
      return {
        current: e
      };
    }
    function Ee(e) {
      0 > nn || (e.current = oa[nn], oa[nn] = null, nn--);
    }
    function Pe(e, t) {
      nn++, oa[nn] = e.current, e.current = t;
    }
    var cr = {}, Ke = ur(cr), tt = ur(false), Dr = cr;
    function on(e, t) {
      var r = e.type.contextTypes;
      if (!r) return cr;
      var o = e.stateNode;
      if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
      var a = {}, u;
      for (u in r) a[u] = t[u];
      return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = a), a;
    }
    function rt(e) {
      return e = e.childContextTypes, e != null;
    }
    function ri() {
      Ee(tt), Ee(Ke);
    }
    function Rc(e, t, r) {
      if (Ke.current !== cr) throw Error(l(168));
      Pe(Ke, t), Pe(tt, r);
    }
    function Tc(e, t, r) {
      var o = e.stateNode;
      if (t = t.childContextTypes, typeof o.getChildContext != "function") return r;
      o = o.getChildContext();
      for (var a in o) if (!(a in t)) throw Error(l(108, ye(e) || "Unknown", a));
      return G({}, r, o);
    }
    function ni(e) {
      return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || cr, Dr = Ke.current, Pe(Ke, e), Pe(tt, tt.current), true;
    }
    function Ac(e, t, r) {
      var o = e.stateNode;
      if (!o) throw Error(l(169));
      r ? (e = Tc(e, t, Dr), o.__reactInternalMemoizedMergedChildContext = e, Ee(tt), Ee(Ke), Pe(Ke, e)) : Ee(tt), Pe(tt, r);
    }
    var Vt = null, oi = false, ia = false;
    function Mc(e) {
      Vt === null ? Vt = [
        e
      ] : Vt.push(e);
    }
    function Fg(e) {
      oi = true, Mc(e);
    }
    function dr() {
      if (!ia && Vt !== null) {
        ia = true;
        var e = 0, t = Se;
        try {
          var r = Vt;
          for (Se = 1; e < r.length; e++) {
            var o = r[e];
            do
              o = o(true);
            while (o !== null);
          }
          Vt = null, oi = false;
        } catch (a) {
          throw Vt !== null && (Vt = Vt.slice(e + 1)), _u(Nl, dr), a;
        } finally {
          Se = t, ia = false;
        }
      }
      return null;
    }
    var ln = [], an = 0, ii = null, li = 0, pt = [], mt = 0, _r = null, Gt = 1, Kt = "";
    function Or(e, t) {
      ln[an++] = li, ln[an++] = ii, ii = e, li = t;
    }
    function Dc(e, t, r) {
      pt[mt++] = Gt, pt[mt++] = Kt, pt[mt++] = _r, _r = e;
      var o = Gt;
      e = Kt;
      var a = 32 - St(o) - 1;
      o &= ~(1 << a), r += 1;
      var u = 32 - St(t) + a;
      if (30 < u) {
        var m = a - a % 5;
        u = (o & (1 << m) - 1).toString(32), o >>= m, a -= m, Gt = 1 << 32 - St(t) + a | r << a | o, Kt = u + e;
      } else Gt = 1 << u | r << a | o, Kt = e;
    }
    function la(e) {
      e.return !== null && (Or(e, 1), Dc(e, 1, 0));
    }
    function aa(e) {
      for (; e === ii; ) ii = ln[--an], ln[an] = null, li = ln[--an], ln[an] = null;
      for (; e === _r; ) _r = pt[--mt], pt[mt] = null, Kt = pt[--mt], pt[mt] = null, Gt = pt[--mt], pt[mt] = null;
    }
    var st = null, ut = null, Re = false, Ct = null;
    function _c(e, t) {
      var r = yt(5, null, null, 0);
      r.elementType = "DELETED", r.stateNode = t, r.return = e, t = e.deletions, t === null ? (e.deletions = [
        r
      ], e.flags |= 16) : t.push(r);
    }
    function Oc(e, t) {
      switch (e.tag) {
        case 5:
          var r = e.type;
          return t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, st = e, ut = sr(t.firstChild), true) : false;
        case 6:
          return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, st = e, ut = null, true) : false;
        case 13:
          return t = t.nodeType !== 8 ? null : t, t !== null ? (r = _r !== null ? {
            id: Gt,
            overflow: Kt
          } : null, e.memoizedState = {
            dehydrated: t,
            treeContext: r,
            retryLane: 1073741824
          }, r = yt(18, null, null, 0), r.stateNode = t, r.return = e, e.child = r, st = e, ut = null, true) : false;
        default:
          return false;
      }
    }
    function sa(e) {
      return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
    }
    function ua(e) {
      if (Re) {
        var t = ut;
        if (t) {
          var r = t;
          if (!Oc(e, t)) {
            if (sa(e)) throw Error(l(418));
            t = sr(r.nextSibling);
            var o = st;
            t && Oc(e, t) ? _c(o, r) : (e.flags = e.flags & -4097 | 2, Re = false, st = e);
          }
        } else {
          if (sa(e)) throw Error(l(418));
          e.flags = e.flags & -4097 | 2, Re = false, st = e;
        }
      }
    }
    function jc(e) {
      for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
      st = e;
    }
    function ai(e) {
      if (e !== st) return false;
      if (!Re) return jc(e), Re = true, false;
      var t;
      if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ea(e.type, e.memoizedProps)), t && (t = ut)) {
        if (sa(e)) throw Lc(), Error(l(418));
        for (; t; ) _c(e, t), t = sr(t.nextSibling);
      }
      if (jc(e), e.tag === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
        e: {
          for (e = e.nextSibling, t = 0; e; ) {
            if (e.nodeType === 8) {
              var r = e.data;
              if (r === "/$") {
                if (t === 0) {
                  ut = sr(e.nextSibling);
                  break e;
                }
                t--;
              } else r !== "$" && r !== "$!" && r !== "$?" || t++;
            }
            e = e.nextSibling;
          }
          ut = null;
        }
      } else ut = st ? sr(e.stateNode.nextSibling) : null;
      return true;
    }
    function Lc() {
      for (var e = ut; e; ) e = sr(e.nextSibling);
    }
    function sn() {
      ut = st = null, Re = false;
    }
    function ca(e) {
      Ct === null ? Ct = [
        e
      ] : Ct.push(e);
    }
    var Ig = O.ReactCurrentBatchConfig;
    function io(e, t, r) {
      if (e = r.ref, e !== null && typeof e != "function" && typeof e != "object") {
        if (r._owner) {
          if (r = r._owner, r) {
            if (r.tag !== 1) throw Error(l(309));
            var o = r.stateNode;
          }
          if (!o) throw Error(l(147, e));
          var a = o, u = "" + e;
          return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === u ? t.ref : (t = function(m) {
            var w = a.refs;
            m === null ? delete w[u] : w[u] = m;
          }, t._stringRef = u, t);
        }
        if (typeof e != "string") throw Error(l(284));
        if (!r._owner) throw Error(l(290, e));
      }
      return e;
    }
    function si(e, t) {
      throw e = Object.prototype.toString.call(t), Error(l(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
    }
    function Bc(e) {
      var t = e._init;
      return t(e._payload);
    }
    function zc(e) {
      function t(R, E) {
        if (e) {
          var A = R.deletions;
          A === null ? (R.deletions = [
            E
          ], R.flags |= 16) : A.push(E);
        }
      }
      function r(R, E) {
        if (!e) return null;
        for (; E !== null; ) t(R, E), E = E.sibling;
        return null;
      }
      function o(R, E) {
        for (R = /* @__PURE__ */ new Map(); E !== null; ) E.key !== null ? R.set(E.key, E) : R.set(E.index, E), E = E.sibling;
        return R;
      }
      function a(R, E) {
        return R = wr(R, E), R.index = 0, R.sibling = null, R;
      }
      function u(R, E, A) {
        return R.index = A, e ? (A = R.alternate, A !== null ? (A = A.index, A < E ? (R.flags |= 2, E) : A) : (R.flags |= 2, E)) : (R.flags |= 1048576, E);
      }
      function m(R) {
        return e && R.alternate === null && (R.flags |= 2), R;
      }
      function w(R, E, A, V) {
        return E === null || E.tag !== 6 ? (E = ts(A, R.mode, V), E.return = R, E) : (E = a(E, A), E.return = R, E);
      }
      function C(R, E, A, V) {
        var ee = A.type;
        return ee === U ? F(R, E, A.props.children, V, A.key) : E !== null && (E.elementType === ee || typeof ee == "object" && ee !== null && ee.$$typeof === ce && Bc(ee) === E.type) ? (V = a(E, A.props), V.ref = io(R, E, A), V.return = R, V) : (V = Di(A.type, A.key, A.props, null, R.mode, V), V.ref = io(R, E, A), V.return = R, V);
      }
      function D(R, E, A, V) {
        return E === null || E.tag !== 4 || E.stateNode.containerInfo !== A.containerInfo || E.stateNode.implementation !== A.implementation ? (E = rs(A, R.mode, V), E.return = R, E) : (E = a(E, A.children || []), E.return = R, E);
      }
      function F(R, E, A, V, ee) {
        return E === null || E.tag !== 7 ? (E = Hr(A, R.mode, V, ee), E.return = R, E) : (E = a(E, A), E.return = R, E);
      }
      function H(R, E, A) {
        if (typeof E == "string" && E !== "" || typeof E == "number") return E = ts("" + E, R.mode, A), E.return = R, E;
        if (typeof E == "object" && E !== null) {
          switch (E.$$typeof) {
            case _:
              return A = Di(E.type, E.key, E.props, null, R.mode, A), A.ref = io(R, null, E), A.return = R, A;
            case $:
              return E = rs(E, R.mode, A), E.return = R, E;
            case ce:
              var V = E._init;
              return H(R, V(E._payload), A);
          }
          if (On(E) || K(E)) return E = Hr(E, R.mode, A, null), E.return = R, E;
          si(R, E);
        }
        return null;
      }
      function z(R, E, A, V) {
        var ee = E !== null ? E.key : null;
        if (typeof A == "string" && A !== "" || typeof A == "number") return ee !== null ? null : w(R, E, "" + A, V);
        if (typeof A == "object" && A !== null) {
          switch (A.$$typeof) {
            case _:
              return A.key === ee ? C(R, E, A, V) : null;
            case $:
              return A.key === ee ? D(R, E, A, V) : null;
            case ce:
              return ee = A._init, z(R, E, ee(A._payload), V);
          }
          if (On(A) || K(A)) return ee !== null ? null : F(R, E, A, V, null);
          si(R, A);
        }
        return null;
      }
      function Q(R, E, A, V, ee) {
        if (typeof V == "string" && V !== "" || typeof V == "number") return R = R.get(A) || null, w(E, R, "" + V, ee);
        if (typeof V == "object" && V !== null) {
          switch (V.$$typeof) {
            case _:
              return R = R.get(V.key === null ? A : V.key) || null, C(E, R, V, ee);
            case $:
              return R = R.get(V.key === null ? A : V.key) || null, D(E, R, V, ee);
            case ce:
              var re = V._init;
              return Q(R, E, A, re(V._payload), ee);
          }
          if (On(V) || K(V)) return R = R.get(A) || null, F(E, R, V, ee, null);
          si(E, V);
        }
        return null;
      }
      function X(R, E, A, V) {
        for (var ee = null, re = null, ne = E, ie = E = 0, Ue = null; ne !== null && ie < A.length; ie++) {
          ne.index > ie ? (Ue = ne, ne = null) : Ue = ne.sibling;
          var xe = z(R, ne, A[ie], V);
          if (xe === null) {
            ne === null && (ne = Ue);
            break;
          }
          e && ne && xe.alternate === null && t(R, ne), E = u(xe, E, ie), re === null ? ee = xe : re.sibling = xe, re = xe, ne = Ue;
        }
        if (ie === A.length) return r(R, ne), Re && Or(R, ie), ee;
        if (ne === null) {
          for (; ie < A.length; ie++) ne = H(R, A[ie], V), ne !== null && (E = u(ne, E, ie), re === null ? ee = ne : re.sibling = ne, re = ne);
          return Re && Or(R, ie), ee;
        }
        for (ne = o(R, ne); ie < A.length; ie++) Ue = Q(ne, R, ie, A[ie], V), Ue !== null && (e && Ue.alternate !== null && ne.delete(Ue.key === null ? ie : Ue.key), E = u(Ue, E, ie), re === null ? ee = Ue : re.sibling = Ue, re = Ue);
        return e && ne.forEach(function(xr) {
          return t(R, xr);
        }), Re && Or(R, ie), ee;
      }
      function q(R, E, A, V) {
        var ee = K(A);
        if (typeof ee != "function") throw Error(l(150));
        if (A = ee.call(A), A == null) throw Error(l(151));
        for (var re = ee = null, ne = E, ie = E = 0, Ue = null, xe = A.next(); ne !== null && !xe.done; ie++, xe = A.next()) {
          ne.index > ie ? (Ue = ne, ne = null) : Ue = ne.sibling;
          var xr = z(R, ne, xe.value, V);
          if (xr === null) {
            ne === null && (ne = Ue);
            break;
          }
          e && ne && xr.alternate === null && t(R, ne), E = u(xr, E, ie), re === null ? ee = xr : re.sibling = xr, re = xr, ne = Ue;
        }
        if (xe.done) return r(R, ne), Re && Or(R, ie), ee;
        if (ne === null) {
          for (; !xe.done; ie++, xe = A.next()) xe = H(R, xe.value, V), xe !== null && (E = u(xe, E, ie), re === null ? ee = xe : re.sibling = xe, re = xe);
          return Re && Or(R, ie), ee;
        }
        for (ne = o(R, ne); !xe.done; ie++, xe = A.next()) xe = Q(ne, R, ie, xe.value, V), xe !== null && (e && xe.alternate !== null && ne.delete(xe.key === null ? ie : xe.key), E = u(xe, E, ie), re === null ? ee = xe : re.sibling = xe, re = xe);
        return e && ne.forEach(function(wv) {
          return t(R, wv);
        }), Re && Or(R, ie), ee;
      }
      function Oe(R, E, A, V) {
        if (typeof A == "object" && A !== null && A.type === U && A.key === null && (A = A.props.children), typeof A == "object" && A !== null) {
          switch (A.$$typeof) {
            case _:
              e: {
                for (var ee = A.key, re = E; re !== null; ) {
                  if (re.key === ee) {
                    if (ee = A.type, ee === U) {
                      if (re.tag === 7) {
                        r(R, re.sibling), E = a(re, A.props.children), E.return = R, R = E;
                        break e;
                      }
                    } else if (re.elementType === ee || typeof ee == "object" && ee !== null && ee.$$typeof === ce && Bc(ee) === re.type) {
                      r(R, re.sibling), E = a(re, A.props), E.ref = io(R, re, A), E.return = R, R = E;
                      break e;
                    }
                    r(R, re);
                    break;
                  } else t(R, re);
                  re = re.sibling;
                }
                A.type === U ? (E = Hr(A.props.children, R.mode, V, A.key), E.return = R, R = E) : (V = Di(A.type, A.key, A.props, null, R.mode, V), V.ref = io(R, E, A), V.return = R, R = V);
              }
              return m(R);
            case $:
              e: {
                for (re = A.key; E !== null; ) {
                  if (E.key === re) if (E.tag === 4 && E.stateNode.containerInfo === A.containerInfo && E.stateNode.implementation === A.implementation) {
                    r(R, E.sibling), E = a(E, A.children || []), E.return = R, R = E;
                    break e;
                  } else {
                    r(R, E);
                    break;
                  }
                  else t(R, E);
                  E = E.sibling;
                }
                E = rs(A, R.mode, V), E.return = R, R = E;
              }
              return m(R);
            case ce:
              return re = A._init, Oe(R, E, re(A._payload), V);
          }
          if (On(A)) return X(R, E, A, V);
          if (K(A)) return q(R, E, A, V);
          si(R, A);
        }
        return typeof A == "string" && A !== "" || typeof A == "number" ? (A = "" + A, E !== null && E.tag === 6 ? (r(R, E.sibling), E = a(E, A), E.return = R, R = E) : (r(R, E), E = ts(A, R.mode, V), E.return = R, R = E), m(R)) : r(R, E);
      }
      return Oe;
    }
    var un = zc(true), Fc = zc(false), ui = ur(null), ci = null, cn = null, da = null;
    function fa() {
      da = cn = ci = null;
    }
    function pa(e) {
      var t = ui.current;
      Ee(ui), e._currentValue = t;
    }
    function ma(e, t, r) {
      for (; e !== null; ) {
        var o = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === r) break;
        e = e.return;
      }
    }
    function dn(e, t) {
      ci = e, da = cn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (nt = true), e.firstContext = null);
    }
    function ht(e) {
      var t = e._currentValue;
      if (da !== e) if (e = {
        context: e,
        memoizedValue: t,
        next: null
      }, cn === null) {
        if (ci === null) throw Error(l(308));
        cn = e, ci.dependencies = {
          lanes: 0,
          firstContext: e
        };
      } else cn = cn.next = e;
      return t;
    }
    var jr = null;
    function ha(e) {
      jr === null ? jr = [
        e
      ] : jr.push(e);
    }
    function Ic(e, t, r, o) {
      var a = t.interleaved;
      return a === null ? (r.next = r, ha(t)) : (r.next = a.next, a.next = r), t.interleaved = r, Qt(e, o);
    }
    function Qt(e, t) {
      e.lanes |= t;
      var r = e.alternate;
      for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; ) e.childLanes |= t, r = e.alternate, r !== null && (r.childLanes |= t), r = e, e = e.return;
      return r.tag === 3 ? r.stateNode : null;
    }
    var fr = false;
    function ga(e) {
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
    function Wc(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
      });
    }
    function Yt(e, t) {
      return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
      };
    }
    function pr(e, t, r) {
      var o = e.updateQueue;
      if (o === null) return null;
      if (o = o.shared, ve & 2) {
        var a = o.pending;
        return a === null ? t.next = t : (t.next = a.next, a.next = t), o.pending = t, Qt(e, r);
      }
      return a = o.interleaved, a === null ? (t.next = t, ha(o)) : (t.next = a.next, a.next = t), o.interleaved = t, Qt(e, r);
    }
    function di(e, t, r) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194240) !== 0)) {
        var o = t.lanes;
        o &= e.pendingLanes, r |= o, t.lanes = r, Al(e, r);
      }
    }
    function Hc(e, t) {
      var r = e.updateQueue, o = e.alternate;
      if (o !== null && (o = o.updateQueue, r === o)) {
        var a = null, u = null;
        if (r = r.firstBaseUpdate, r !== null) {
          do {
            var m = {
              eventTime: r.eventTime,
              lane: r.lane,
              tag: r.tag,
              payload: r.payload,
              callback: r.callback,
              next: null
            };
            u === null ? a = u = m : u = u.next = m, r = r.next;
          } while (r !== null);
          u === null ? a = u = t : u = u.next = t;
        } else a = u = t;
        r = {
          baseState: o.baseState,
          firstBaseUpdate: a,
          lastBaseUpdate: u,
          shared: o.shared,
          effects: o.effects
        }, e.updateQueue = r;
        return;
      }
      e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t;
    }
    function fi(e, t, r, o) {
      var a = e.updateQueue;
      fr = false;
      var u = a.firstBaseUpdate, m = a.lastBaseUpdate, w = a.shared.pending;
      if (w !== null) {
        a.shared.pending = null;
        var C = w, D = C.next;
        C.next = null, m === null ? u = D : m.next = D, m = C;
        var F = e.alternate;
        F !== null && (F = F.updateQueue, w = F.lastBaseUpdate, w !== m && (w === null ? F.firstBaseUpdate = D : w.next = D, F.lastBaseUpdate = C));
      }
      if (u !== null) {
        var H = a.baseState;
        m = 0, F = D = C = null, w = u;
        do {
          var z = w.lane, Q = w.eventTime;
          if ((o & z) === z) {
            F !== null && (F = F.next = {
              eventTime: Q,
              lane: 0,
              tag: w.tag,
              payload: w.payload,
              callback: w.callback,
              next: null
            });
            e: {
              var X = e, q = w;
              switch (z = t, Q = r, q.tag) {
                case 1:
                  if (X = q.payload, typeof X == "function") {
                    H = X.call(Q, H, z);
                    break e;
                  }
                  H = X;
                  break e;
                case 3:
                  X.flags = X.flags & -65537 | 128;
                case 0:
                  if (X = q.payload, z = typeof X == "function" ? X.call(Q, H, z) : X, z == null) break e;
                  H = G({}, H, z);
                  break e;
                case 2:
                  fr = true;
              }
            }
            w.callback !== null && w.lane !== 0 && (e.flags |= 64, z = a.effects, z === null ? a.effects = [
              w
            ] : z.push(w));
          } else Q = {
            eventTime: Q,
            lane: z,
            tag: w.tag,
            payload: w.payload,
            callback: w.callback,
            next: null
          }, F === null ? (D = F = Q, C = H) : F = F.next = Q, m |= z;
          if (w = w.next, w === null) {
            if (w = a.shared.pending, w === null) break;
            z = w, w = z.next, z.next = null, a.lastBaseUpdate = z, a.shared.pending = null;
          }
        } while (true);
        if (F === null && (C = H), a.baseState = C, a.firstBaseUpdate = D, a.lastBaseUpdate = F, t = a.shared.interleaved, t !== null) {
          a = t;
          do
            m |= a.lane, a = a.next;
          while (a !== t);
        } else u === null && (a.shared.lanes = 0);
        zr |= m, e.lanes = m, e.memoizedState = H;
      }
    }
    function $c(e, t, r) {
      if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
        var o = e[t], a = o.callback;
        if (a !== null) {
          if (o.callback = null, o = r, typeof a != "function") throw Error(l(191, a));
          a.call(o);
        }
      }
    }
    var lo = {}, Ot = ur(lo), ao = ur(lo), so = ur(lo);
    function Lr(e) {
      if (e === lo) throw Error(l(174));
      return e;
    }
    function va(e, t) {
      switch (Pe(so, t), Pe(ao, e), Pe(Ot, lo), e = t.nodeType, e) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : yl(null, "");
          break;
        default:
          e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = yl(t, e);
      }
      Ee(Ot), Pe(Ot, t);
    }
    function fn() {
      Ee(Ot), Ee(ao), Ee(so);
    }
    function Uc(e) {
      Lr(so.current);
      var t = Lr(Ot.current), r = yl(t, e.type);
      t !== r && (Pe(ao, e), Pe(Ot, r));
    }
    function ya(e) {
      ao.current === e && (Ee(Ot), Ee(ao));
    }
    var Te = ur(0);
    function pi(e) {
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
    var wa = [];
    function xa() {
      for (var e = 0; e < wa.length; e++) wa[e]._workInProgressVersionPrimary = null;
      wa.length = 0;
    }
    var mi = O.ReactCurrentDispatcher, Sa = O.ReactCurrentBatchConfig, Br = 0, Ae = null, Fe = null, He = null, hi = false, uo = false, co = 0, Wg = 0;
    function Qe() {
      throw Error(l(321));
    }
    function ka(e, t) {
      if (t === null) return false;
      for (var r = 0; r < t.length && r < e.length; r++) if (!kt(e[r], t[r])) return false;
      return true;
    }
    function Ca(e, t, r, o, a, u) {
      if (Br = u, Ae = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, mi.current = e === null || e.memoizedState === null ? Vg : Gg, e = r(o, a), uo) {
        u = 0;
        do {
          if (uo = false, co = 0, 25 <= u) throw Error(l(301));
          u += 1, He = Fe = null, t.updateQueue = null, mi.current = Kg, e = r(o, a);
        } while (uo);
      }
      if (mi.current = yi, t = Fe !== null && Fe.next !== null, Br = 0, He = Fe = Ae = null, hi = false, t) throw Error(l(300));
      return e;
    }
    function Pa() {
      var e = co !== 0;
      return co = 0, e;
    }
    function jt() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return He === null ? Ae.memoizedState = He = e : He = He.next = e, He;
    }
    function gt() {
      if (Fe === null) {
        var e = Ae.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = Fe.next;
      var t = He === null ? Ae.memoizedState : He.next;
      if (t !== null) He = t, Fe = e;
      else {
        if (e === null) throw Error(l(310));
        Fe = e, e = {
          memoizedState: Fe.memoizedState,
          baseState: Fe.baseState,
          baseQueue: Fe.baseQueue,
          queue: Fe.queue,
          next: null
        }, He === null ? Ae.memoizedState = He = e : He = He.next = e;
      }
      return He;
    }
    function fo(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function ba(e) {
      var t = gt(), r = t.queue;
      if (r === null) throw Error(l(311));
      r.lastRenderedReducer = e;
      var o = Fe, a = o.baseQueue, u = r.pending;
      if (u !== null) {
        if (a !== null) {
          var m = a.next;
          a.next = u.next, u.next = m;
        }
        o.baseQueue = a = u, r.pending = null;
      }
      if (a !== null) {
        u = a.next, o = o.baseState;
        var w = m = null, C = null, D = u;
        do {
          var F = D.lane;
          if ((Br & F) === F) C !== null && (C = C.next = {
            lane: 0,
            action: D.action,
            hasEagerState: D.hasEagerState,
            eagerState: D.eagerState,
            next: null
          }), o = D.hasEagerState ? D.eagerState : e(o, D.action);
          else {
            var H = {
              lane: F,
              action: D.action,
              hasEagerState: D.hasEagerState,
              eagerState: D.eagerState,
              next: null
            };
            C === null ? (w = C = H, m = o) : C = C.next = H, Ae.lanes |= F, zr |= F;
          }
          D = D.next;
        } while (D !== null && D !== u);
        C === null ? m = o : C.next = w, kt(o, t.memoizedState) || (nt = true), t.memoizedState = o, t.baseState = m, t.baseQueue = C, r.lastRenderedState = o;
      }
      if (e = r.interleaved, e !== null) {
        a = e;
        do
          u = a.lane, Ae.lanes |= u, zr |= u, a = a.next;
        while (a !== e);
      } else a === null && (r.lanes = 0);
      return [
        t.memoizedState,
        r.dispatch
      ];
    }
    function Ea(e) {
      var t = gt(), r = t.queue;
      if (r === null) throw Error(l(311));
      r.lastRenderedReducer = e;
      var o = r.dispatch, a = r.pending, u = t.memoizedState;
      if (a !== null) {
        r.pending = null;
        var m = a = a.next;
        do
          u = e(u, m.action), m = m.next;
        while (m !== a);
        kt(u, t.memoizedState) || (nt = true), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), r.lastRenderedState = u;
      }
      return [
        u,
        o
      ];
    }
    function Vc() {
    }
    function Gc(e, t) {
      var r = Ae, o = gt(), a = t(), u = !kt(o.memoizedState, a);
      if (u && (o.memoizedState = a, nt = true), o = o.queue, Na(Yc.bind(null, r, o, e), [
        e
      ]), o.getSnapshot !== t || u || He !== null && He.memoizedState.tag & 1) {
        if (r.flags |= 2048, po(9, Qc.bind(null, r, o, a, t), void 0, null), $e === null) throw Error(l(349));
        Br & 30 || Kc(r, t, a);
      }
      return a;
    }
    function Kc(e, t, r) {
      e.flags |= 16384, e = {
        getSnapshot: t,
        value: r
      }, t = Ae.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
      }, Ae.updateQueue = t, t.stores = [
        e
      ]) : (r = t.stores, r === null ? t.stores = [
        e
      ] : r.push(e));
    }
    function Qc(e, t, r, o) {
      t.value = r, t.getSnapshot = o, Xc(t) && qc(e);
    }
    function Yc(e, t, r) {
      return r(function() {
        Xc(t) && qc(e);
      });
    }
    function Xc(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var r = t();
        return !kt(e, r);
      } catch {
        return true;
      }
    }
    function qc(e) {
      var t = Qt(e, 1);
      t !== null && Nt(t, e, 1, -1);
    }
    function Jc(e) {
      var t = jt();
      return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: fo,
        lastRenderedState: e
      }, t.queue = e, e = e.dispatch = Ug.bind(null, Ae, e), [
        t.memoizedState,
        e
      ];
    }
    function po(e, t, r, o) {
      return e = {
        tag: e,
        create: t,
        destroy: r,
        deps: o,
        next: null
      }, t = Ae.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
      }, Ae.updateQueue = t, t.lastEffect = e.next = e) : (r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (o = r.next, r.next = e, e.next = o, t.lastEffect = e)), e;
    }
    function Zc() {
      return gt().memoizedState;
    }
    function gi(e, t, r, o) {
      var a = jt();
      Ae.flags |= e, a.memoizedState = po(1 | t, r, void 0, o === void 0 ? null : o);
    }
    function vi(e, t, r, o) {
      var a = gt();
      o = o === void 0 ? null : o;
      var u = void 0;
      if (Fe !== null) {
        var m = Fe.memoizedState;
        if (u = m.destroy, o !== null && ka(o, m.deps)) {
          a.memoizedState = po(t, r, u, o);
          return;
        }
      }
      Ae.flags |= e, a.memoizedState = po(1 | t, r, u, o);
    }
    function ed(e, t) {
      return gi(8390656, 8, e, t);
    }
    function Na(e, t) {
      return vi(2048, 8, e, t);
    }
    function td(e, t) {
      return vi(4, 2, e, t);
    }
    function rd(e, t) {
      return vi(4, 4, e, t);
    }
    function nd(e, t) {
      if (typeof t == "function") return e = e(), t(e), function() {
        t(null);
      };
      if (t != null) return e = e(), t.current = e, function() {
        t.current = null;
      };
    }
    function od(e, t, r) {
      return r = r != null ? r.concat([
        e
      ]) : null, vi(4, 4, nd.bind(null, t, e), r);
    }
    function Ra() {
    }
    function id(e, t) {
      var r = gt();
      t = t === void 0 ? null : t;
      var o = r.memoizedState;
      return o !== null && t !== null && ka(t, o[1]) ? o[0] : (r.memoizedState = [
        e,
        t
      ], e);
    }
    function ld(e, t) {
      var r = gt();
      t = t === void 0 ? null : t;
      var o = r.memoizedState;
      return o !== null && t !== null && ka(t, o[1]) ? o[0] : (e = e(), r.memoizedState = [
        e,
        t
      ], e);
    }
    function ad(e, t, r) {
      return Br & 21 ? (kt(r, t) || (r = Bu(), Ae.lanes |= r, zr |= r, e.baseState = true), t) : (e.baseState && (e.baseState = false, nt = true), e.memoizedState = r);
    }
    function Hg(e, t) {
      var r = Se;
      Se = r !== 0 && 4 > r ? r : 4, e(true);
      var o = Sa.transition;
      Sa.transition = {};
      try {
        e(false), t();
      } finally {
        Se = r, Sa.transition = o;
      }
    }
    function sd() {
      return gt().memoizedState;
    }
    function $g(e, t, r) {
      var o = vr(e);
      if (r = {
        lane: o,
        action: r,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, ud(e)) cd(t, r);
      else if (r = Ic(e, t, r, o), r !== null) {
        var a = Ze();
        Nt(r, e, o, a), dd(r, t, o);
      }
    }
    function Ug(e, t, r) {
      var o = vr(e), a = {
        lane: o,
        action: r,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      if (ud(e)) cd(t, a);
      else {
        var u = e.alternate;
        if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null)) try {
          var m = t.lastRenderedState, w = u(m, r);
          if (a.hasEagerState = true, a.eagerState = w, kt(w, m)) {
            var C = t.interleaved;
            C === null ? (a.next = a, ha(t)) : (a.next = C.next, C.next = a), t.interleaved = a;
            return;
          }
        } catch {
        } finally {
        }
        r = Ic(e, t, a, o), r !== null && (a = Ze(), Nt(r, e, o, a), dd(r, t, o));
      }
    }
    function ud(e) {
      var t = e.alternate;
      return e === Ae || t !== null && t === Ae;
    }
    function cd(e, t) {
      uo = hi = true;
      var r = e.pending;
      r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
    }
    function dd(e, t, r) {
      if (r & 4194240) {
        var o = t.lanes;
        o &= e.pendingLanes, r |= o, t.lanes = r, Al(e, r);
      }
    }
    var yi = {
      readContext: ht,
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
    }, Vg = {
      readContext: ht,
      useCallback: function(e, t) {
        return jt().memoizedState = [
          e,
          t === void 0 ? null : t
        ], e;
      },
      useContext: ht,
      useEffect: ed,
      useImperativeHandle: function(e, t, r) {
        return r = r != null ? r.concat([
          e
        ]) : null, gi(4194308, 4, nd.bind(null, t, e), r);
      },
      useLayoutEffect: function(e, t) {
        return gi(4194308, 4, e, t);
      },
      useInsertionEffect: function(e, t) {
        return gi(4, 2, e, t);
      },
      useMemo: function(e, t) {
        var r = jt();
        return t = t === void 0 ? null : t, e = e(), r.memoizedState = [
          e,
          t
        ], e;
      },
      useReducer: function(e, t, r) {
        var o = jt();
        return t = r !== void 0 ? r(t) : t, o.memoizedState = o.baseState = t, e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t
        }, o.queue = e, e = e.dispatch = $g.bind(null, Ae, e), [
          o.memoizedState,
          e
        ];
      },
      useRef: function(e) {
        var t = jt();
        return e = {
          current: e
        }, t.memoizedState = e;
      },
      useState: Jc,
      useDebugValue: Ra,
      useDeferredValue: function(e) {
        return jt().memoizedState = e;
      },
      useTransition: function() {
        var e = Jc(false), t = e[0];
        return e = Hg.bind(null, e[1]), jt().memoizedState = e, [
          t,
          e
        ];
      },
      useMutableSource: function() {
      },
      useSyncExternalStore: function(e, t, r) {
        var o = Ae, a = jt();
        if (Re) {
          if (r === void 0) throw Error(l(407));
          r = r();
        } else {
          if (r = t(), $e === null) throw Error(l(349));
          Br & 30 || Kc(o, t, r);
        }
        a.memoizedState = r;
        var u = {
          value: r,
          getSnapshot: t
        };
        return a.queue = u, ed(Yc.bind(null, o, u, e), [
          e
        ]), o.flags |= 2048, po(9, Qc.bind(null, o, u, r, t), void 0, null), r;
      },
      useId: function() {
        var e = jt(), t = $e.identifierPrefix;
        if (Re) {
          var r = Kt, o = Gt;
          r = (o & ~(1 << 32 - St(o) - 1)).toString(32) + r, t = ":" + t + "R" + r, r = co++, 0 < r && (t += "H" + r.toString(32)), t += ":";
        } else r = Wg++, t = ":" + t + "r" + r.toString(32) + ":";
        return e.memoizedState = t;
      },
      unstable_isNewReconciler: false
    }, Gg = {
      readContext: ht,
      useCallback: id,
      useContext: ht,
      useEffect: Na,
      useImperativeHandle: od,
      useInsertionEffect: td,
      useLayoutEffect: rd,
      useMemo: ld,
      useReducer: ba,
      useRef: Zc,
      useState: function() {
        return ba(fo);
      },
      useDebugValue: Ra,
      useDeferredValue: function(e) {
        var t = gt();
        return ad(t, Fe.memoizedState, e);
      },
      useTransition: function() {
        var e = ba(fo)[0], t = gt().memoizedState;
        return [
          e,
          t
        ];
      },
      useMutableSource: Vc,
      useSyncExternalStore: Gc,
      useId: sd,
      unstable_isNewReconciler: false
    }, Kg = {
      readContext: ht,
      useCallback: id,
      useContext: ht,
      useEffect: Na,
      useImperativeHandle: od,
      useInsertionEffect: td,
      useLayoutEffect: rd,
      useMemo: ld,
      useReducer: Ea,
      useRef: Zc,
      useState: function() {
        return Ea(fo);
      },
      useDebugValue: Ra,
      useDeferredValue: function(e) {
        var t = gt();
        return Fe === null ? t.memoizedState = e : ad(t, Fe.memoizedState, e);
      },
      useTransition: function() {
        var e = Ea(fo)[0], t = gt().memoizedState;
        return [
          e,
          t
        ];
      },
      useMutableSource: Vc,
      useSyncExternalStore: Gc,
      useId: sd,
      unstable_isNewReconciler: false
    };
    function Pt(e, t) {
      if (e && e.defaultProps) {
        t = G({}, t), e = e.defaultProps;
        for (var r in e) t[r] === void 0 && (t[r] = e[r]);
        return t;
      }
      return t;
    }
    function Ta(e, t, r, o) {
      t = e.memoizedState, r = r(o, t), r = r == null ? t : G({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
    }
    var wi = {
      isMounted: function(e) {
        return (e = e._reactInternals) ? Ar(e) === e : false;
      },
      enqueueSetState: function(e, t, r) {
        e = e._reactInternals;
        var o = Ze(), a = vr(e), u = Yt(o, a);
        u.payload = t, r != null && (u.callback = r), t = pr(e, u, a), t !== null && (Nt(t, e, a, o), di(t, e, a));
      },
      enqueueReplaceState: function(e, t, r) {
        e = e._reactInternals;
        var o = Ze(), a = vr(e), u = Yt(o, a);
        u.tag = 1, u.payload = t, r != null && (u.callback = r), t = pr(e, u, a), t !== null && (Nt(t, e, a, o), di(t, e, a));
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var r = Ze(), o = vr(e), a = Yt(r, o);
        a.tag = 2, t != null && (a.callback = t), t = pr(e, a, o), t !== null && (Nt(t, e, o, r), di(t, e, o));
      }
    };
    function fd(e, t, r, o, a, u, m) {
      return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, u, m) : t.prototype && t.prototype.isPureReactComponent ? !Jn(r, o) || !Jn(a, u) : true;
    }
    function pd(e, t, r) {
      var o = false, a = cr, u = t.contextType;
      return typeof u == "object" && u !== null ? u = ht(u) : (a = rt(t) ? Dr : Ke.current, o = t.contextTypes, u = (o = o != null) ? on(e, a) : cr), t = new t(r, u), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = wi, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = a, e.__reactInternalMemoizedMaskedChildContext = u), t;
    }
    function md(e, t, r, o) {
      e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, o), t.state !== e && wi.enqueueReplaceState(t, t.state, null);
    }
    function Aa(e, t, r, o) {
      var a = e.stateNode;
      a.props = r, a.state = e.memoizedState, a.refs = {}, ga(e);
      var u = t.contextType;
      typeof u == "object" && u !== null ? a.context = ht(u) : (u = rt(t) ? Dr : Ke.current, a.context = on(e, u)), a.state = e.memoizedState, u = t.getDerivedStateFromProps, typeof u == "function" && (Ta(e, t, u, r), a.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (t = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), t !== a.state && wi.enqueueReplaceState(a, a.state, null), fi(e, r, a, o), a.state = e.memoizedState), typeof a.componentDidMount == "function" && (e.flags |= 4194308);
    }
    function pn(e, t) {
      try {
        var r = "", o = t;
        do
          r += he(o), o = o.return;
        while (o);
        var a = r;
      } catch (u) {
        a = `
Error generating stack: ` + u.message + `
` + u.stack;
      }
      return {
        value: e,
        source: t,
        stack: a,
        digest: null
      };
    }
    function Ma(e, t, r) {
      return {
        value: e,
        source: null,
        stack: r ?? null,
        digest: t ?? null
      };
    }
    function Da(e, t) {
      try {
        console.error(t.value);
      } catch (r) {
        setTimeout(function() {
          throw r;
        });
      }
    }
    var Qg = typeof WeakMap == "function" ? WeakMap : Map;
    function hd(e, t, r) {
      r = Yt(-1, r), r.tag = 3, r.payload = {
        element: null
      };
      var o = t.value;
      return r.callback = function() {
        Ei || (Ei = true, Ka = o), Da(e, t);
      }, r;
    }
    function gd(e, t, r) {
      r = Yt(-1, r), r.tag = 3;
      var o = e.type.getDerivedStateFromError;
      if (typeof o == "function") {
        var a = t.value;
        r.payload = function() {
          return o(a);
        }, r.callback = function() {
          Da(e, t);
        };
      }
      var u = e.stateNode;
      return u !== null && typeof u.componentDidCatch == "function" && (r.callback = function() {
        Da(e, t), typeof o != "function" && (hr === null ? hr = /* @__PURE__ */ new Set([
          this
        ]) : hr.add(this));
        var m = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: m !== null ? m : ""
        });
      }), r;
    }
    function vd(e, t, r) {
      var o = e.pingCache;
      if (o === null) {
        o = e.pingCache = new Qg();
        var a = /* @__PURE__ */ new Set();
        o.set(t, a);
      } else a = o.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), o.set(t, a));
      a.has(r) || (a.add(r), e = sv.bind(null, e, t, r), t.then(e, e));
    }
    function yd(e) {
      do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : true), t) return e;
        e = e.return;
      } while (e !== null);
      return null;
    }
    function wd(e, t, r, o, a) {
      return e.mode & 1 ? (e.flags |= 65536, e.lanes = a, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (t = Yt(-1, 1), t.tag = 2, pr(r, t, 1))), r.lanes |= 1), e);
    }
    var Yg = O.ReactCurrentOwner, nt = false;
    function Je(e, t, r, o) {
      t.child = e === null ? Fc(t, null, r, o) : un(t, e.child, r, o);
    }
    function xd(e, t, r, o, a) {
      r = r.render;
      var u = t.ref;
      return dn(t, a), o = Ca(e, t, r, o, u, a), r = Pa(), e !== null && !nt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, Xt(e, t, a)) : (Re && r && la(t), t.flags |= 1, Je(e, t, o, a), t.child);
    }
    function Sd(e, t, r, o, a) {
      if (e === null) {
        var u = r.type;
        return typeof u == "function" && !es(u) && u.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (t.tag = 15, t.type = u, kd(e, t, u, o, a)) : (e = Di(r.type, null, o, t, t.mode, a), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (u = e.child, !(e.lanes & a)) {
        var m = u.memoizedProps;
        if (r = r.compare, r = r !== null ? r : Jn, r(m, o) && e.ref === t.ref) return Xt(e, t, a);
      }
      return t.flags |= 1, e = wr(u, o), e.ref = t.ref, e.return = t, t.child = e;
    }
    function kd(e, t, r, o, a) {
      if (e !== null) {
        var u = e.memoizedProps;
        if (Jn(u, o) && e.ref === t.ref) if (nt = false, t.pendingProps = o = u, (e.lanes & a) !== 0) e.flags & 131072 && (nt = true);
        else return t.lanes = e.lanes, Xt(e, t, a);
      }
      return _a(e, t, r, o, a);
    }
    function Cd(e, t, r) {
      var o = t.pendingProps, a = o.children, u = e !== null ? e.memoizedState : null;
      if (o.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      }, Pe(hn, ct), ct |= r;
      else {
        if (!(r & 1073741824)) return e = u !== null ? u.baseLanes | r : r, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
          baseLanes: e,
          cachePool: null,
          transitions: null
        }, t.updateQueue = null, Pe(hn, ct), ct |= e, null;
        t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null
        }, o = u !== null ? u.baseLanes : r, Pe(hn, ct), ct |= o;
      }
      else u !== null ? (o = u.baseLanes | r, t.memoizedState = null) : o = r, Pe(hn, ct), ct |= o;
      return Je(e, t, a, r), t.child;
    }
    function Pd(e, t) {
      var r = t.ref;
      (e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= 512, t.flags |= 2097152);
    }
    function _a(e, t, r, o, a) {
      var u = rt(r) ? Dr : Ke.current;
      return u = on(t, u), dn(t, a), r = Ca(e, t, r, o, u, a), o = Pa(), e !== null && !nt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, Xt(e, t, a)) : (Re && o && la(t), t.flags |= 1, Je(e, t, r, a), t.child);
    }
    function bd(e, t, r, o, a) {
      if (rt(r)) {
        var u = true;
        ni(t);
      } else u = false;
      if (dn(t, a), t.stateNode === null) Si(e, t), pd(t, r, o), Aa(t, r, o, a), o = true;
      else if (e === null) {
        var m = t.stateNode, w = t.memoizedProps;
        m.props = w;
        var C = m.context, D = r.contextType;
        typeof D == "object" && D !== null ? D = ht(D) : (D = rt(r) ? Dr : Ke.current, D = on(t, D));
        var F = r.getDerivedStateFromProps, H = typeof F == "function" || typeof m.getSnapshotBeforeUpdate == "function";
        H || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (w !== o || C !== D) && md(t, m, o, D), fr = false;
        var z = t.memoizedState;
        m.state = z, fi(t, o, m, a), C = t.memoizedState, w !== o || z !== C || tt.current || fr ? (typeof F == "function" && (Ta(t, r, F, o), C = t.memoizedState), (w = fr || fd(t, r, w, o, z, C, D)) ? (H || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = C), m.props = o, m.state = C, m.context = D, o = w) : (typeof m.componentDidMount == "function" && (t.flags |= 4194308), o = false);
      } else {
        m = t.stateNode, Wc(e, t), w = t.memoizedProps, D = t.type === t.elementType ? w : Pt(t.type, w), m.props = D, H = t.pendingProps, z = m.context, C = r.contextType, typeof C == "object" && C !== null ? C = ht(C) : (C = rt(r) ? Dr : Ke.current, C = on(t, C));
        var Q = r.getDerivedStateFromProps;
        (F = typeof Q == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (w !== H || z !== C) && md(t, m, o, C), fr = false, z = t.memoizedState, m.state = z, fi(t, o, m, a);
        var X = t.memoizedState;
        w !== H || z !== X || tt.current || fr ? (typeof Q == "function" && (Ta(t, r, Q, o), X = t.memoizedState), (D = fr || fd(t, r, D, o, z, X, C) || false) ? (F || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(o, X, C), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(o, X, C)), typeof m.componentDidUpdate == "function" && (t.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || w === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || w === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = X), m.props = o, m.state = X, m.context = C, o = D) : (typeof m.componentDidUpdate != "function" || w === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || w === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), o = false);
      }
      return Oa(e, t, r, o, u, a);
    }
    function Oa(e, t, r, o, a, u) {
      Pd(e, t);
      var m = (t.flags & 128) !== 0;
      if (!o && !m) return a && Ac(t, r, false), Xt(e, t, u);
      o = t.stateNode, Yg.current = t;
      var w = m && typeof r.getDerivedStateFromError != "function" ? null : o.render();
      return t.flags |= 1, e !== null && m ? (t.child = un(t, e.child, null, u), t.child = un(t, null, w, u)) : Je(e, t, w, u), t.memoizedState = o.state, a && Ac(t, r, true), t.child;
    }
    function Ed(e) {
      var t = e.stateNode;
      t.pendingContext ? Rc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Rc(e, t.context, false), va(e, t.containerInfo);
    }
    function Nd(e, t, r, o, a) {
      return sn(), ca(a), t.flags |= 256, Je(e, t, r, o), t.child;
    }
    var ja = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0
    };
    function La(e) {
      return {
        baseLanes: e,
        cachePool: null,
        transitions: null
      };
    }
    function Rd(e, t, r) {
      var o = t.pendingProps, a = Te.current, u = false, m = (t.flags & 128) !== 0, w;
      if ((w = m) || (w = e !== null && e.memoizedState === null ? false : (a & 2) !== 0), w ? (u = true, t.flags &= -129) : (e === null || e.memoizedState !== null) && (a |= 1), Pe(Te, a & 1), e === null) return ua(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (m = o.children, e = o.fallback, u ? (o = t.mode, u = t.child, m = {
        mode: "hidden",
        children: m
      }, !(o & 1) && u !== null ? (u.childLanes = 0, u.pendingProps = m) : u = _i(m, o, 0, null), e = Hr(e, o, r, null), u.return = t, e.return = t, u.sibling = e, t.child = u, t.child.memoizedState = La(r), t.memoizedState = ja, e) : Ba(t, m));
      if (a = e.memoizedState, a !== null && (w = a.dehydrated, w !== null)) return Xg(e, t, m, o, w, a, r);
      if (u) {
        u = o.fallback, m = t.mode, a = e.child, w = a.sibling;
        var C = {
          mode: "hidden",
          children: o.children
        };
        return !(m & 1) && t.child !== a ? (o = t.child, o.childLanes = 0, o.pendingProps = C, t.deletions = null) : (o = wr(a, C), o.subtreeFlags = a.subtreeFlags & 14680064), w !== null ? u = wr(w, u) : (u = Hr(u, m, r, null), u.flags |= 2), u.return = t, o.return = t, o.sibling = u, t.child = o, o = u, u = t.child, m = e.child.memoizedState, m = m === null ? La(r) : {
          baseLanes: m.baseLanes | r,
          cachePool: null,
          transitions: m.transitions
        }, u.memoizedState = m, u.childLanes = e.childLanes & ~r, t.memoizedState = ja, o;
      }
      return u = e.child, e = u.sibling, o = wr(u, {
        mode: "visible",
        children: o.children
      }), !(t.mode & 1) && (o.lanes = r), o.return = t, o.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [
        e
      ], t.flags |= 16) : r.push(e)), t.child = o, t.memoizedState = null, o;
    }
    function Ba(e, t) {
      return t = _i({
        mode: "visible",
        children: t
      }, e.mode, 0, null), t.return = e, e.child = t;
    }
    function xi(e, t, r, o) {
      return o !== null && ca(o), un(t, e.child, null, r), e = Ba(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
    }
    function Xg(e, t, r, o, a, u, m) {
      if (r) return t.flags & 256 ? (t.flags &= -257, o = Ma(Error(l(422))), xi(e, t, m, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (u = o.fallback, a = t.mode, o = _i({
        mode: "visible",
        children: o.children
      }, a, 0, null), u = Hr(u, a, m, null), u.flags |= 2, o.return = t, u.return = t, o.sibling = u, t.child = o, t.mode & 1 && un(t, e.child, null, m), t.child.memoizedState = La(m), t.memoizedState = ja, u);
      if (!(t.mode & 1)) return xi(e, t, m, null);
      if (a.data === "$!") {
        if (o = a.nextSibling && a.nextSibling.dataset, o) var w = o.dgst;
        return o = w, u = Error(l(419)), o = Ma(u, o, void 0), xi(e, t, m, o);
      }
      if (w = (m & e.childLanes) !== 0, nt || w) {
        if (o = $e, o !== null) {
          switch (m & -m) {
            case 4:
              a = 2;
              break;
            case 16:
              a = 8;
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
              a = 32;
              break;
            case 536870912:
              a = 268435456;
              break;
            default:
              a = 0;
          }
          a = a & (o.suspendedLanes | m) ? 0 : a, a !== 0 && a !== u.retryLane && (u.retryLane = a, Qt(e, a), Nt(o, e, a, -1));
        }
        return Za(), o = Ma(Error(l(421))), xi(e, t, m, o);
      }
      return a.data === "$?" ? (t.flags |= 128, t.child = e.child, t = uv.bind(null, e), a._reactRetry = t, null) : (e = u.treeContext, ut = sr(a.nextSibling), st = t, Re = true, Ct = null, e !== null && (pt[mt++] = Gt, pt[mt++] = Kt, pt[mt++] = _r, Gt = e.id, Kt = e.overflow, _r = t), t = Ba(t, o.children), t.flags |= 4096, t);
    }
    function Td(e, t, r) {
      e.lanes |= t;
      var o = e.alternate;
      o !== null && (o.lanes |= t), ma(e.return, t, r);
    }
    function za(e, t, r, o, a) {
      var u = e.memoizedState;
      u === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: o,
        tail: r,
        tailMode: a
      } : (u.isBackwards = t, u.rendering = null, u.renderingStartTime = 0, u.last = o, u.tail = r, u.tailMode = a);
    }
    function Ad(e, t, r) {
      var o = t.pendingProps, a = o.revealOrder, u = o.tail;
      if (Je(e, t, o.children, r), o = Te.current, o & 2) o = o & 1 | 2, t.flags |= 128;
      else {
        if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Td(e, r, t);
          else if (e.tag === 19) Td(e, r, t);
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
        o &= 1;
      }
      if (Pe(Te, o), !(t.mode & 1)) t.memoizedState = null;
      else switch (a) {
        case "forwards":
          for (r = t.child, a = null; r !== null; ) e = r.alternate, e !== null && pi(e) === null && (a = r), r = r.sibling;
          r = a, r === null ? (a = t.child, t.child = null) : (a = r.sibling, r.sibling = null), za(t, false, a, r, u);
          break;
        case "backwards":
          for (r = null, a = t.child, t.child = null; a !== null; ) {
            if (e = a.alternate, e !== null && pi(e) === null) {
              t.child = a;
              break;
            }
            e = a.sibling, a.sibling = r, r = a, a = e;
          }
          za(t, true, r, null, u);
          break;
        case "together":
          za(t, false, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function Si(e, t) {
      !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
    }
    function Xt(e, t, r) {
      if (e !== null && (t.dependencies = e.dependencies), zr |= t.lanes, !(r & t.childLanes)) return null;
      if (e !== null && t.child !== e.child) throw Error(l(153));
      if (t.child !== null) {
        for (e = t.child, r = wr(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null; ) e = e.sibling, r = r.sibling = wr(e, e.pendingProps), r.return = t;
        r.sibling = null;
      }
      return t.child;
    }
    function qg(e, t, r) {
      switch (t.tag) {
        case 3:
          Ed(t), sn();
          break;
        case 5:
          Uc(t);
          break;
        case 1:
          rt(t.type) && ni(t);
          break;
        case 4:
          va(t, t.stateNode.containerInfo);
          break;
        case 10:
          var o = t.type._context, a = t.memoizedProps.value;
          Pe(ui, o._currentValue), o._currentValue = a;
          break;
        case 13:
          if (o = t.memoizedState, o !== null) return o.dehydrated !== null ? (Pe(Te, Te.current & 1), t.flags |= 128, null) : r & t.child.childLanes ? Rd(e, t, r) : (Pe(Te, Te.current & 1), e = Xt(e, t, r), e !== null ? e.sibling : null);
          Pe(Te, Te.current & 1);
          break;
        case 19:
          if (o = (r & t.childLanes) !== 0, e.flags & 128) {
            if (o) return Ad(e, t, r);
            t.flags |= 128;
          }
          if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), Pe(Te, Te.current), o) break;
          return null;
        case 22:
        case 23:
          return t.lanes = 0, Cd(e, t, r);
      }
      return Xt(e, t, r);
    }
    var Md, Fa, Dd, _d;
    Md = function(e, t) {
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
    }, Fa = function() {
    }, Dd = function(e, t, r, o) {
      var a = e.memoizedProps;
      if (a !== o) {
        e = t.stateNode, Lr(Ot.current);
        var u = null;
        switch (r) {
          case "input":
            a = ml(e, a), o = ml(e, o), u = [];
            break;
          case "select":
            a = G({}, a, {
              value: void 0
            }), o = G({}, o, {
              value: void 0
            }), u = [];
            break;
          case "textarea":
            a = vl(e, a), o = vl(e, o), u = [];
            break;
          default:
            typeof a.onClick != "function" && typeof o.onClick == "function" && (e.onclick = ei);
        }
        wl(r, o);
        var m;
        r = null;
        for (D in a) if (!o.hasOwnProperty(D) && a.hasOwnProperty(D) && a[D] != null) if (D === "style") {
          var w = a[D];
          for (m in w) w.hasOwnProperty(m) && (r || (r = {}), r[m] = "");
        } else D !== "dangerouslySetInnerHTML" && D !== "children" && D !== "suppressContentEditableWarning" && D !== "suppressHydrationWarning" && D !== "autoFocus" && (c.hasOwnProperty(D) ? u || (u = []) : (u = u || []).push(D, null));
        for (D in o) {
          var C = o[D];
          if (w = a == null ? void 0 : a[D], o.hasOwnProperty(D) && C !== w && (C != null || w != null)) if (D === "style") if (w) {
            for (m in w) !w.hasOwnProperty(m) || C && C.hasOwnProperty(m) || (r || (r = {}), r[m] = "");
            for (m in C) C.hasOwnProperty(m) && w[m] !== C[m] && (r || (r = {}), r[m] = C[m]);
          } else r || (u || (u = []), u.push(D, r)), r = C;
          else D === "dangerouslySetInnerHTML" ? (C = C ? C.__html : void 0, w = w ? w.__html : void 0, C != null && w !== C && (u = u || []).push(D, C)) : D === "children" ? typeof C != "string" && typeof C != "number" || (u = u || []).push(D, "" + C) : D !== "suppressContentEditableWarning" && D !== "suppressHydrationWarning" && (c.hasOwnProperty(D) ? (C != null && D === "onScroll" && be("scroll", e), u || w === C || (u = [])) : (u = u || []).push(D, C));
        }
        r && (u = u || []).push("style", r);
        var D = u;
        (t.updateQueue = D) && (t.flags |= 4);
      }
    }, _d = function(e, t, r, o) {
      r !== o && (t.flags |= 4);
    };
    function mo(e, t) {
      if (!Re) switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var r = null; t !== null; ) t.alternate !== null && (r = t), t = t.sibling;
          r === null ? e.tail = null : r.sibling = null;
          break;
        case "collapsed":
          r = e.tail;
          for (var o = null; r !== null; ) r.alternate !== null && (o = r), r = r.sibling;
          o === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : o.sibling = null;
      }
    }
    function Ye(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, r = 0, o = 0;
      if (t) for (var a = e.child; a !== null; ) r |= a.lanes | a.childLanes, o |= a.subtreeFlags & 14680064, o |= a.flags & 14680064, a.return = e, a = a.sibling;
      else for (a = e.child; a !== null; ) r |= a.lanes | a.childLanes, o |= a.subtreeFlags, o |= a.flags, a.return = e, a = a.sibling;
      return e.subtreeFlags |= o, e.childLanes = r, t;
    }
    function Jg(e, t, r) {
      var o = t.pendingProps;
      switch (aa(t), t.tag) {
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
          return rt(t.type) && ri(), Ye(t), null;
        case 3:
          return o = t.stateNode, fn(), Ee(tt), Ee(Ke), xa(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (ai(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ct !== null && (Xa(Ct), Ct = null))), Fa(e, t), Ye(t), null;
        case 5:
          ya(t);
          var a = Lr(so.current);
          if (r = t.type, e !== null && t.stateNode != null) Dd(e, t, r, o, a), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
          else {
            if (!o) {
              if (t.stateNode === null) throw Error(l(166));
              return Ye(t), null;
            }
            if (e = Lr(Ot.current), ai(t)) {
              o = t.stateNode, r = t.type;
              var u = t.memoizedProps;
              switch (o[_t] = t, o[no] = u, e = (t.mode & 1) !== 0, r) {
                case "dialog":
                  be("cancel", o), be("close", o);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  be("load", o);
                  break;
                case "video":
                case "audio":
                  for (a = 0; a < eo.length; a++) be(eo[a], o);
                  break;
                case "source":
                  be("error", o);
                  break;
                case "img":
                case "image":
                case "link":
                  be("error", o), be("load", o);
                  break;
                case "details":
                  be("toggle", o);
                  break;
                case "input":
                  pu(o, u), be("invalid", o);
                  break;
                case "select":
                  o._wrapperState = {
                    wasMultiple: !!u.multiple
                  }, be("invalid", o);
                  break;
                case "textarea":
                  gu(o, u), be("invalid", o);
              }
              wl(r, u), a = null;
              for (var m in u) if (u.hasOwnProperty(m)) {
                var w = u[m];
                m === "children" ? typeof w == "string" ? o.textContent !== w && (u.suppressHydrationWarning !== true && Zo(o.textContent, w, e), a = [
                  "children",
                  w
                ]) : typeof w == "number" && o.textContent !== "" + w && (u.suppressHydrationWarning !== true && Zo(o.textContent, w, e), a = [
                  "children",
                  "" + w
                ]) : c.hasOwnProperty(m) && w != null && m === "onScroll" && be("scroll", o);
              }
              switch (r) {
                case "input":
                  Vr(o), hu(o, u, true);
                  break;
                case "textarea":
                  Vr(o), yu(o);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  typeof u.onClick == "function" && (o.onclick = ei);
              }
              o = a, t.updateQueue = o, o !== null && (t.flags |= 4);
            } else {
              m = a.nodeType === 9 ? a : a.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = wu(r)), e === "http://www.w3.org/1999/xhtml" ? r === "script" ? (e = m.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = m.createElement(r, {
                is: o.is
              }) : (e = m.createElement(r), r === "select" && (m = e, o.multiple ? m.multiple = true : o.size && (m.size = o.size))) : e = m.createElementNS(e, r), e[_t] = t, e[no] = o, Md(e, t, false, false), t.stateNode = e;
              e: {
                switch (m = xl(r, o), r) {
                  case "dialog":
                    be("cancel", e), be("close", e), a = o;
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    be("load", e), a = o;
                    break;
                  case "video":
                  case "audio":
                    for (a = 0; a < eo.length; a++) be(eo[a], e);
                    a = o;
                    break;
                  case "source":
                    be("error", e), a = o;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    be("error", e), be("load", e), a = o;
                    break;
                  case "details":
                    be("toggle", e), a = o;
                    break;
                  case "input":
                    pu(e, o), a = ml(e, o), be("invalid", e);
                    break;
                  case "option":
                    a = o;
                    break;
                  case "select":
                    e._wrapperState = {
                      wasMultiple: !!o.multiple
                    }, a = G({}, o, {
                      value: void 0
                    }), be("invalid", e);
                    break;
                  case "textarea":
                    gu(e, o), a = vl(e, o), be("invalid", e);
                    break;
                  default:
                    a = o;
                }
                wl(r, a), w = a;
                for (u in w) if (w.hasOwnProperty(u)) {
                  var C = w[u];
                  u === "style" ? ku(e, C) : u === "dangerouslySetInnerHTML" ? (C = C ? C.__html : void 0, C != null && xu(e, C)) : u === "children" ? typeof C == "string" ? (r !== "textarea" || C !== "") && jn(e, C) : typeof C == "number" && jn(e, "" + C) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (c.hasOwnProperty(u) ? C != null && u === "onScroll" && be("scroll", e) : C != null && W(e, u, C, m));
                }
                switch (r) {
                  case "input":
                    Vr(e), hu(e, o, false);
                    break;
                  case "textarea":
                    Vr(e), yu(e);
                    break;
                  case "option":
                    o.value != null && e.setAttribute("value", "" + we(o.value));
                    break;
                  case "select":
                    e.multiple = !!o.multiple, u = o.value, u != null ? Gr(e, !!o.multiple, u, false) : o.defaultValue != null && Gr(e, !!o.multiple, o.defaultValue, true);
                    break;
                  default:
                    typeof a.onClick == "function" && (e.onclick = ei);
                }
                switch (r) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    o = !!o.autoFocus;
                    break e;
                  case "img":
                    o = true;
                    break e;
                  default:
                    o = false;
                }
              }
              o && (t.flags |= 4);
            }
            t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
          }
          return Ye(t), null;
        case 6:
          if (e && t.stateNode != null) _d(e, t, e.memoizedProps, o);
          else {
            if (typeof o != "string" && t.stateNode === null) throw Error(l(166));
            if (r = Lr(so.current), Lr(Ot.current), ai(t)) {
              if (o = t.stateNode, r = t.memoizedProps, o[_t] = t, (u = o.nodeValue !== r) && (e = st, e !== null)) switch (e.tag) {
                case 3:
                  Zo(o.nodeValue, r, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== true && Zo(o.nodeValue, r, (e.mode & 1) !== 0);
              }
              u && (t.flags |= 4);
            } else o = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(o), o[_t] = t, t.stateNode = o;
          }
          return Ye(t), null;
        case 13:
          if (Ee(Te), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (Re && ut !== null && t.mode & 1 && !(t.flags & 128)) Lc(), sn(), t.flags |= 98560, u = false;
            else if (u = ai(t), o !== null && o.dehydrated !== null) {
              if (e === null) {
                if (!u) throw Error(l(318));
                if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(l(317));
                u[_t] = t;
              } else sn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
              Ye(t), u = false;
            } else Ct !== null && (Xa(Ct), Ct = null), u = true;
            if (!u) return t.flags & 65536 ? t : null;
          }
          return t.flags & 128 ? (t.lanes = r, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, t.mode & 1 && (e === null || Te.current & 1 ? Ie === 0 && (Ie = 3) : Za())), t.updateQueue !== null && (t.flags |= 4), Ye(t), null);
        case 4:
          return fn(), Fa(e, t), e === null && to(t.stateNode.containerInfo), Ye(t), null;
        case 10:
          return pa(t.type._context), Ye(t), null;
        case 17:
          return rt(t.type) && ri(), Ye(t), null;
        case 19:
          if (Ee(Te), u = t.memoizedState, u === null) return Ye(t), null;
          if (o = (t.flags & 128) !== 0, m = u.rendering, m === null) if (o) mo(u, false);
          else {
            if (Ie !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
              if (m = pi(e), m !== null) {
                for (t.flags |= 128, mo(u, false), o = m.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = r, r = t.child; r !== null; ) u = r, e = o, u.flags &= 14680066, m = u.alternate, m === null ? (u.childLanes = 0, u.lanes = e, u.child = null, u.subtreeFlags = 0, u.memoizedProps = null, u.memoizedState = null, u.updateQueue = null, u.dependencies = null, u.stateNode = null) : (u.childLanes = m.childLanes, u.lanes = m.lanes, u.child = m.child, u.subtreeFlags = 0, u.deletions = null, u.memoizedProps = m.memoizedProps, u.memoizedState = m.memoizedState, u.updateQueue = m.updateQueue, u.type = m.type, e = m.dependencies, u.dependencies = e === null ? null : {
                  lanes: e.lanes,
                  firstContext: e.firstContext
                }), r = r.sibling;
                return Pe(Te, Te.current & 1 | 2), t.child;
              }
              e = e.sibling;
            }
            u.tail !== null && _e() > gn && (t.flags |= 128, o = true, mo(u, false), t.lanes = 4194304);
          }
          else {
            if (!o) if (e = pi(m), e !== null) {
              if (t.flags |= 128, o = true, r = e.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), mo(u, true), u.tail === null && u.tailMode === "hidden" && !m.alternate && !Re) return Ye(t), null;
            } else 2 * _e() - u.renderingStartTime > gn && r !== 1073741824 && (t.flags |= 128, o = true, mo(u, false), t.lanes = 4194304);
            u.isBackwards ? (m.sibling = t.child, t.child = m) : (r = u.last, r !== null ? r.sibling = m : t.child = m, u.last = m);
          }
          return u.tail !== null ? (t = u.tail, u.rendering = t, u.tail = t.sibling, u.renderingStartTime = _e(), t.sibling = null, r = Te.current, Pe(Te, o ? r & 1 | 2 : r & 1), t) : (Ye(t), null);
        case 22:
        case 23:
          return Ja(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && t.mode & 1 ? ct & 1073741824 && (Ye(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ye(t), null;
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(l(156, t.tag));
    }
    function Zg(e, t) {
      switch (aa(t), t.tag) {
        case 1:
          return rt(t.type) && ri(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
          return fn(), Ee(tt), Ee(Ke), xa(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
        case 5:
          return ya(t), null;
        case 13:
          if (Ee(Te), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null) throw Error(l(340));
            sn();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
          return Ee(Te), null;
        case 4:
          return fn(), null;
        case 10:
          return pa(t.type._context), null;
        case 22:
        case 23:
          return Ja(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var ki = false, Xe = false, ev = typeof WeakSet == "function" ? WeakSet : Set, Y = null;
    function mn(e, t) {
      var r = e.ref;
      if (r !== null) if (typeof r == "function") try {
        r(null);
      } catch (o) {
        De(e, t, o);
      }
      else r.current = null;
    }
    function Ia(e, t, r) {
      try {
        r();
      } catch (o) {
        De(e, t, o);
      }
    }
    var Od = false;
    function tv(e, t) {
      if (Jl = Ho, e = fc(), Ul(e)) {
        if ("selectionStart" in e) var r = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
        else e: {
          r = (r = e.ownerDocument) && r.defaultView || window;
          var o = r.getSelection && r.getSelection();
          if (o && o.rangeCount !== 0) {
            r = o.anchorNode;
            var a = o.anchorOffset, u = o.focusNode;
            o = o.focusOffset;
            try {
              r.nodeType, u.nodeType;
            } catch {
              r = null;
              break e;
            }
            var m = 0, w = -1, C = -1, D = 0, F = 0, H = e, z = null;
            t: for (; ; ) {
              for (var Q; H !== r || a !== 0 && H.nodeType !== 3 || (w = m + a), H !== u || o !== 0 && H.nodeType !== 3 || (C = m + o), H.nodeType === 3 && (m += H.nodeValue.length), (Q = H.firstChild) !== null; ) z = H, H = Q;
              for (; ; ) {
                if (H === e) break t;
                if (z === r && ++D === a && (w = m), z === u && ++F === o && (C = m), (Q = H.nextSibling) !== null) break;
                H = z, z = H.parentNode;
              }
              H = Q;
            }
            r = w === -1 || C === -1 ? null : {
              start: w,
              end: C
            };
          } else r = null;
        }
        r = r || {
          start: 0,
          end: 0
        };
      } else r = null;
      for (Zl = {
        focusedElem: e,
        selectionRange: r
      }, Ho = false, Y = t; Y !== null; ) if (t = Y, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Y = e;
      else for (; Y !== null; ) {
        t = Y;
        try {
          var X = t.alternate;
          if (t.flags & 1024) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              break;
            case 1:
              if (X !== null) {
                var q = X.memoizedProps, Oe = X.memoizedState, R = t.stateNode, E = R.getSnapshotBeforeUpdate(t.elementType === t.type ? q : Pt(t.type, q), Oe);
                R.__reactInternalSnapshotBeforeUpdate = E;
              }
              break;
            case 3:
              var A = t.stateNode.containerInfo;
              A.nodeType === 1 ? A.textContent = "" : A.nodeType === 9 && A.documentElement && A.removeChild(A.documentElement);
              break;
            case 5:
            case 6:
            case 4:
            case 17:
              break;
            default:
              throw Error(l(163));
          }
        } catch (V) {
          De(t, t.return, V);
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, Y = e;
          break;
        }
        Y = t.return;
      }
      return X = Od, Od = false, X;
    }
    function ho(e, t, r) {
      var o = t.updateQueue;
      if (o = o !== null ? o.lastEffect : null, o !== null) {
        var a = o = o.next;
        do {
          if ((a.tag & e) === e) {
            var u = a.destroy;
            a.destroy = void 0, u !== void 0 && Ia(t, r, u);
          }
          a = a.next;
        } while (a !== o);
      }
    }
    function Ci(e, t) {
      if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
        var r = t = t.next;
        do {
          if ((r.tag & e) === e) {
            var o = r.create;
            r.destroy = o();
          }
          r = r.next;
        } while (r !== t);
      }
    }
    function Wa(e) {
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
    function jd(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, jd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[_t], delete t[no], delete t[na], delete t[Bg], delete t[zg])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    function Ld(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function Bd(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || Ld(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Ha(e, t, r) {
      var o = e.tag;
      if (o === 5 || o === 6) e = e.stateNode, t ? r.nodeType === 8 ? r.parentNode.insertBefore(e, t) : r.insertBefore(e, t) : (r.nodeType === 8 ? (t = r.parentNode, t.insertBefore(e, r)) : (t = r, t.appendChild(e)), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = ei));
      else if (o !== 4 && (e = e.child, e !== null)) for (Ha(e, t, r), e = e.sibling; e !== null; ) Ha(e, t, r), e = e.sibling;
    }
    function $a(e, t, r) {
      var o = e.tag;
      if (o === 5 || o === 6) e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
      else if (o !== 4 && (e = e.child, e !== null)) for ($a(e, t, r), e = e.sibling; e !== null; ) $a(e, t, r), e = e.sibling;
    }
    var Ve = null, bt = false;
    function mr(e, t, r) {
      for (r = r.child; r !== null; ) zd(e, t, r), r = r.sibling;
    }
    function zd(e, t, r) {
      if (Dt && typeof Dt.onCommitFiberUnmount == "function") try {
        Dt.onCommitFiberUnmount(Lo, r);
      } catch {
      }
      switch (r.tag) {
        case 5:
          Xe || mn(r, t);
        case 6:
          var o = Ve, a = bt;
          Ve = null, mr(e, t, r), Ve = o, bt = a, Ve !== null && (bt ? (e = Ve, r = r.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r)) : Ve.removeChild(r.stateNode));
          break;
        case 18:
          Ve !== null && (bt ? (e = Ve, r = r.stateNode, e.nodeType === 8 ? ra(e.parentNode, r) : e.nodeType === 1 && ra(e, r), Gn(e)) : ra(Ve, r.stateNode));
          break;
        case 4:
          o = Ve, a = bt, Ve = r.stateNode.containerInfo, bt = true, mr(e, t, r), Ve = o, bt = a;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (!Xe && (o = r.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
            a = o = o.next;
            do {
              var u = a, m = u.destroy;
              u = u.tag, m !== void 0 && (u & 2 || u & 4) && Ia(r, t, m), a = a.next;
            } while (a !== o);
          }
          mr(e, t, r);
          break;
        case 1:
          if (!Xe && (mn(r, t), o = r.stateNode, typeof o.componentWillUnmount == "function")) try {
            o.props = r.memoizedProps, o.state = r.memoizedState, o.componentWillUnmount();
          } catch (w) {
            De(r, t, w);
          }
          mr(e, t, r);
          break;
        case 21:
          mr(e, t, r);
          break;
        case 22:
          r.mode & 1 ? (Xe = (o = Xe) || r.memoizedState !== null, mr(e, t, r), Xe = o) : mr(e, t, r);
          break;
        default:
          mr(e, t, r);
      }
    }
    function Fd(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var r = e.stateNode;
        r === null && (r = e.stateNode = new ev()), t.forEach(function(o) {
          var a = cv.bind(null, e, o);
          r.has(o) || (r.add(o), o.then(a, a));
        });
      }
    }
    function Et(e, t) {
      var r = t.deletions;
      if (r !== null) for (var o = 0; o < r.length; o++) {
        var a = r[o];
        try {
          var u = e, m = t, w = m;
          e: for (; w !== null; ) {
            switch (w.tag) {
              case 5:
                Ve = w.stateNode, bt = false;
                break e;
              case 3:
                Ve = w.stateNode.containerInfo, bt = true;
                break e;
              case 4:
                Ve = w.stateNode.containerInfo, bt = true;
                break e;
            }
            w = w.return;
          }
          if (Ve === null) throw Error(l(160));
          zd(u, m, a), Ve = null, bt = false;
          var C = a.alternate;
          C !== null && (C.return = null), a.return = null;
        } catch (D) {
          De(a, t, D);
        }
      }
      if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Id(t, e), t = t.sibling;
    }
    function Id(e, t) {
      var r = e.alternate, o = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if (Et(t, e), Lt(e), o & 4) {
            try {
              ho(3, e, e.return), Ci(3, e);
            } catch (q) {
              De(e, e.return, q);
            }
            try {
              ho(5, e, e.return);
            } catch (q) {
              De(e, e.return, q);
            }
          }
          break;
        case 1:
          Et(t, e), Lt(e), o & 512 && r !== null && mn(r, r.return);
          break;
        case 5:
          if (Et(t, e), Lt(e), o & 512 && r !== null && mn(r, r.return), e.flags & 32) {
            var a = e.stateNode;
            try {
              jn(a, "");
            } catch (q) {
              De(e, e.return, q);
            }
          }
          if (o & 4 && (a = e.stateNode, a != null)) {
            var u = e.memoizedProps, m = r !== null ? r.memoizedProps : u, w = e.type, C = e.updateQueue;
            if (e.updateQueue = null, C !== null) try {
              w === "input" && u.type === "radio" && u.name != null && mu(a, u), xl(w, m);
              var D = xl(w, u);
              for (m = 0; m < C.length; m += 2) {
                var F = C[m], H = C[m + 1];
                F === "style" ? ku(a, H) : F === "dangerouslySetInnerHTML" ? xu(a, H) : F === "children" ? jn(a, H) : W(a, F, H, D);
              }
              switch (w) {
                case "input":
                  hl(a, u);
                  break;
                case "textarea":
                  vu(a, u);
                  break;
                case "select":
                  var z = a._wrapperState.wasMultiple;
                  a._wrapperState.wasMultiple = !!u.multiple;
                  var Q = u.value;
                  Q != null ? Gr(a, !!u.multiple, Q, false) : z !== !!u.multiple && (u.defaultValue != null ? Gr(a, !!u.multiple, u.defaultValue, true) : Gr(a, !!u.multiple, u.multiple ? [] : "", false));
              }
              a[no] = u;
            } catch (q) {
              De(e, e.return, q);
            }
          }
          break;
        case 6:
          if (Et(t, e), Lt(e), o & 4) {
            if (e.stateNode === null) throw Error(l(162));
            a = e.stateNode, u = e.memoizedProps;
            try {
              a.nodeValue = u;
            } catch (q) {
              De(e, e.return, q);
            }
          }
          break;
        case 3:
          if (Et(t, e), Lt(e), o & 4 && r !== null && r.memoizedState.isDehydrated) try {
            Gn(t.containerInfo);
          } catch (q) {
            De(e, e.return, q);
          }
          break;
        case 4:
          Et(t, e), Lt(e);
          break;
        case 13:
          Et(t, e), Lt(e), a = e.child, a.flags & 8192 && (u = a.memoizedState !== null, a.stateNode.isHidden = u, !u || a.alternate !== null && a.alternate.memoizedState !== null || (Ga = _e())), o & 4 && Fd(e);
          break;
        case 22:
          if (F = r !== null && r.memoizedState !== null, e.mode & 1 ? (Xe = (D = Xe) || F, Et(t, e), Xe = D) : Et(t, e), Lt(e), o & 8192) {
            if (D = e.memoizedState !== null, (e.stateNode.isHidden = D) && !F && e.mode & 1) for (Y = e, F = e.child; F !== null; ) {
              for (H = Y = F; Y !== null; ) {
                switch (z = Y, Q = z.child, z.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    ho(4, z, z.return);
                    break;
                  case 1:
                    mn(z, z.return);
                    var X = z.stateNode;
                    if (typeof X.componentWillUnmount == "function") {
                      o = z, r = z.return;
                      try {
                        t = o, X.props = t.memoizedProps, X.state = t.memoizedState, X.componentWillUnmount();
                      } catch (q) {
                        De(o, r, q);
                      }
                    }
                    break;
                  case 5:
                    mn(z, z.return);
                    break;
                  case 22:
                    if (z.memoizedState !== null) {
                      $d(H);
                      continue;
                    }
                }
                Q !== null ? (Q.return = z, Y = Q) : $d(H);
              }
              F = F.sibling;
            }
            e: for (F = null, H = e; ; ) {
              if (H.tag === 5) {
                if (F === null) {
                  F = H;
                  try {
                    a = H.stateNode, D ? (u = a.style, typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : u.display = "none") : (w = H.stateNode, C = H.memoizedProps.style, m = C != null && C.hasOwnProperty("display") ? C.display : null, w.style.display = Su("display", m));
                  } catch (q) {
                    De(e, e.return, q);
                  }
                }
              } else if (H.tag === 6) {
                if (F === null) try {
                  H.stateNode.nodeValue = D ? "" : H.memoizedProps;
                } catch (q) {
                  De(e, e.return, q);
                }
              } else if ((H.tag !== 22 && H.tag !== 23 || H.memoizedState === null || H === e) && H.child !== null) {
                H.child.return = H, H = H.child;
                continue;
              }
              if (H === e) break e;
              for (; H.sibling === null; ) {
                if (H.return === null || H.return === e) break e;
                F === H && (F = null), H = H.return;
              }
              F === H && (F = null), H.sibling.return = H.return, H = H.sibling;
            }
          }
          break;
        case 19:
          Et(t, e), Lt(e), o & 4 && Fd(e);
          break;
        case 21:
          break;
        default:
          Et(t, e), Lt(e);
      }
    }
    function Lt(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          e: {
            for (var r = e.return; r !== null; ) {
              if (Ld(r)) {
                var o = r;
                break e;
              }
              r = r.return;
            }
            throw Error(l(160));
          }
          switch (o.tag) {
            case 5:
              var a = o.stateNode;
              o.flags & 32 && (jn(a, ""), o.flags &= -33);
              var u = Bd(e);
              $a(e, u, a);
              break;
            case 3:
            case 4:
              var m = o.stateNode.containerInfo, w = Bd(e);
              Ha(e, w, m);
              break;
            default:
              throw Error(l(161));
          }
        } catch (C) {
          De(e, e.return, C);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function rv(e, t, r) {
      Y = e, Wd(e);
    }
    function Wd(e, t, r) {
      for (var o = (e.mode & 1) !== 0; Y !== null; ) {
        var a = Y, u = a.child;
        if (a.tag === 22 && o) {
          var m = a.memoizedState !== null || ki;
          if (!m) {
            var w = a.alternate, C = w !== null && w.memoizedState !== null || Xe;
            w = ki;
            var D = Xe;
            if (ki = m, (Xe = C) && !D) for (Y = a; Y !== null; ) m = Y, C = m.child, m.tag === 22 && m.memoizedState !== null ? Ud(a) : C !== null ? (C.return = m, Y = C) : Ud(a);
            for (; u !== null; ) Y = u, Wd(u), u = u.sibling;
            Y = a, ki = w, Xe = D;
          }
          Hd(e);
        } else a.subtreeFlags & 8772 && u !== null ? (u.return = a, Y = u) : Hd(e);
      }
    }
    function Hd(e) {
      for (; Y !== null; ) {
        var t = Y;
        if (t.flags & 8772) {
          var r = t.alternate;
          try {
            if (t.flags & 8772) switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Xe || Ci(5, t);
                break;
              case 1:
                var o = t.stateNode;
                if (t.flags & 4 && !Xe) if (r === null) o.componentDidMount();
                else {
                  var a = t.elementType === t.type ? r.memoizedProps : Pt(t.type, r.memoizedProps);
                  o.componentDidUpdate(a, r.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
                }
                var u = t.updateQueue;
                u !== null && $c(t, u, o);
                break;
              case 3:
                var m = t.updateQueue;
                if (m !== null) {
                  if (r = null, t.child !== null) switch (t.child.tag) {
                    case 5:
                      r = t.child.stateNode;
                      break;
                    case 1:
                      r = t.child.stateNode;
                  }
                  $c(t, m, r);
                }
                break;
              case 5:
                var w = t.stateNode;
                if (r === null && t.flags & 4) {
                  r = w;
                  var C = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      C.autoFocus && r.focus();
                      break;
                    case "img":
                      C.src && (r.src = C.src);
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
                  var D = t.alternate;
                  if (D !== null) {
                    var F = D.memoizedState;
                    if (F !== null) {
                      var H = F.dehydrated;
                      H !== null && Gn(H);
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
            Xe || t.flags & 512 && Wa(t);
          } catch (z) {
            De(t, t.return, z);
          }
        }
        if (t === e) {
          Y = null;
          break;
        }
        if (r = t.sibling, r !== null) {
          r.return = t.return, Y = r;
          break;
        }
        Y = t.return;
      }
    }
    function $d(e) {
      for (; Y !== null; ) {
        var t = Y;
        if (t === e) {
          Y = null;
          break;
        }
        var r = t.sibling;
        if (r !== null) {
          r.return = t.return, Y = r;
          break;
        }
        Y = t.return;
      }
    }
    function Ud(e) {
      for (; Y !== null; ) {
        var t = Y;
        try {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              var r = t.return;
              try {
                Ci(4, t);
              } catch (C) {
                De(t, r, C);
              }
              break;
            case 1:
              var o = t.stateNode;
              if (typeof o.componentDidMount == "function") {
                var a = t.return;
                try {
                  o.componentDidMount();
                } catch (C) {
                  De(t, a, C);
                }
              }
              var u = t.return;
              try {
                Wa(t);
              } catch (C) {
                De(t, u, C);
              }
              break;
            case 5:
              var m = t.return;
              try {
                Wa(t);
              } catch (C) {
                De(t, m, C);
              }
          }
        } catch (C) {
          De(t, t.return, C);
        }
        if (t === e) {
          Y = null;
          break;
        }
        var w = t.sibling;
        if (w !== null) {
          w.return = t.return, Y = w;
          break;
        }
        Y = t.return;
      }
    }
    var nv = Math.ceil, Pi = O.ReactCurrentDispatcher, Ua = O.ReactCurrentOwner, vt = O.ReactCurrentBatchConfig, ve = 0, $e = null, Le = null, Ge = 0, ct = 0, hn = ur(0), Ie = 0, go = null, zr = 0, bi = 0, Va = 0, vo = null, ot = null, Ga = 0, gn = 1 / 0, qt = null, Ei = false, Ka = null, hr = null, Ni = false, gr = null, Ri = 0, yo = 0, Qa = null, Ti = -1, Ai = 0;
    function Ze() {
      return ve & 6 ? _e() : Ti !== -1 ? Ti : Ti = _e();
    }
    function vr(e) {
      return e.mode & 1 ? ve & 2 && Ge !== 0 ? Ge & -Ge : Ig.transition !== null ? (Ai === 0 && (Ai = Bu()), Ai) : (e = Se, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Gu(e.type)), e) : 1;
    }
    function Nt(e, t, r, o) {
      if (50 < yo) throw yo = 0, Qa = null, Error(l(185));
      Wn(e, r, o), (!(ve & 2) || e !== $e) && (e === $e && (!(ve & 2) && (bi |= r), Ie === 4 && yr(e, Ge)), it(e, o), r === 1 && ve === 0 && !(t.mode & 1) && (gn = _e() + 500, oi && dr()));
    }
    function it(e, t) {
      var r = e.callbackNode;
      Ih(e, t);
      var o = Fo(e, e === $e ? Ge : 0);
      if (o === 0) r !== null && Ou(r), e.callbackNode = null, e.callbackPriority = 0;
      else if (t = o & -o, e.callbackPriority !== t) {
        if (r != null && Ou(r), t === 1) e.tag === 0 ? Fg(Gd.bind(null, e)) : Mc(Gd.bind(null, e)), jg(function() {
          !(ve & 6) && dr();
        }), r = null;
        else {
          switch (zu(o)) {
            case 1:
              r = Nl;
              break;
            case 4:
              r = ju;
              break;
            case 16:
              r = jo;
              break;
            case 536870912:
              r = Lu;
              break;
            default:
              r = jo;
          }
          r = ef(r, Vd.bind(null, e));
        }
        e.callbackPriority = t, e.callbackNode = r;
      }
    }
    function Vd(e, t) {
      if (Ti = -1, Ai = 0, ve & 6) throw Error(l(327));
      var r = e.callbackNode;
      if (vn() && e.callbackNode !== r) return null;
      var o = Fo(e, e === $e ? Ge : 0);
      if (o === 0) return null;
      if (o & 30 || o & e.expiredLanes || t) t = Mi(e, o);
      else {
        t = o;
        var a = ve;
        ve |= 2;
        var u = Qd();
        ($e !== e || Ge !== t) && (qt = null, gn = _e() + 500, Ir(e, t));
        do
          try {
            lv();
            break;
          } catch (w) {
            Kd(e, w);
          }
        while (true);
        fa(), Pi.current = u, ve = a, Le !== null ? t = 0 : ($e = null, Ge = 0, t = Ie);
      }
      if (t !== 0) {
        if (t === 2 && (a = Rl(e), a !== 0 && (o = a, t = Ya(e, a))), t === 1) throw r = go, Ir(e, 0), yr(e, o), it(e, _e()), r;
        if (t === 6) yr(e, o);
        else {
          if (a = e.current.alternate, !(o & 30) && !ov(a) && (t = Mi(e, o), t === 2 && (u = Rl(e), u !== 0 && (o = u, t = Ya(e, u))), t === 1)) throw r = go, Ir(e, 0), yr(e, o), it(e, _e()), r;
          switch (e.finishedWork = a, e.finishedLanes = o, t) {
            case 0:
            case 1:
              throw Error(l(345));
            case 2:
              Wr(e, ot, qt);
              break;
            case 3:
              if (yr(e, o), (o & 130023424) === o && (t = Ga + 500 - _e(), 10 < t)) {
                if (Fo(e, 0) !== 0) break;
                if (a = e.suspendedLanes, (a & o) !== o) {
                  Ze(), e.pingedLanes |= e.suspendedLanes & a;
                  break;
                }
                e.timeoutHandle = ta(Wr.bind(null, e, ot, qt), t);
                break;
              }
              Wr(e, ot, qt);
              break;
            case 4:
              if (yr(e, o), (o & 4194240) === o) break;
              for (t = e.eventTimes, a = -1; 0 < o; ) {
                var m = 31 - St(o);
                u = 1 << m, m = t[m], m > a && (a = m), o &= ~u;
              }
              if (o = a, o = _e() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * nv(o / 1960)) - o, 10 < o) {
                e.timeoutHandle = ta(Wr.bind(null, e, ot, qt), o);
                break;
              }
              Wr(e, ot, qt);
              break;
            case 5:
              Wr(e, ot, qt);
              break;
            default:
              throw Error(l(329));
          }
        }
      }
      return it(e, _e()), e.callbackNode === r ? Vd.bind(null, e) : null;
    }
    function Ya(e, t) {
      var r = vo;
      return e.current.memoizedState.isDehydrated && (Ir(e, t).flags |= 256), e = Mi(e, t), e !== 2 && (t = ot, ot = r, t !== null && Xa(t)), e;
    }
    function Xa(e) {
      ot === null ? ot = e : ot.push.apply(ot, e);
    }
    function ov(e) {
      for (var t = e; ; ) {
        if (t.flags & 16384) {
          var r = t.updateQueue;
          if (r !== null && (r = r.stores, r !== null)) for (var o = 0; o < r.length; o++) {
            var a = r[o], u = a.getSnapshot;
            a = a.value;
            try {
              if (!kt(u(), a)) return false;
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
    function yr(e, t) {
      for (t &= ~Va, t &= ~bi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
        var r = 31 - St(t), o = 1 << r;
        e[r] = -1, t &= ~o;
      }
    }
    function Gd(e) {
      if (ve & 6) throw Error(l(327));
      vn();
      var t = Fo(e, 0);
      if (!(t & 1)) return it(e, _e()), null;
      var r = Mi(e, t);
      if (e.tag !== 0 && r === 2) {
        var o = Rl(e);
        o !== 0 && (t = o, r = Ya(e, o));
      }
      if (r === 1) throw r = go, Ir(e, 0), yr(e, t), it(e, _e()), r;
      if (r === 6) throw Error(l(345));
      return e.finishedWork = e.current.alternate, e.finishedLanes = t, Wr(e, ot, qt), it(e, _e()), null;
    }
    function qa(e, t) {
      var r = ve;
      ve |= 1;
      try {
        return e(t);
      } finally {
        ve = r, ve === 0 && (gn = _e() + 500, oi && dr());
      }
    }
    function Fr(e) {
      gr !== null && gr.tag === 0 && !(ve & 6) && vn();
      var t = ve;
      ve |= 1;
      var r = vt.transition, o = Se;
      try {
        if (vt.transition = null, Se = 1, e) return e();
      } finally {
        Se = o, vt.transition = r, ve = t, !(ve & 6) && dr();
      }
    }
    function Ja() {
      ct = hn.current, Ee(hn);
    }
    function Ir(e, t) {
      e.finishedWork = null, e.finishedLanes = 0;
      var r = e.timeoutHandle;
      if (r !== -1 && (e.timeoutHandle = -1, Og(r)), Le !== null) for (r = Le.return; r !== null; ) {
        var o = r;
        switch (aa(o), o.tag) {
          case 1:
            o = o.type.childContextTypes, o != null && ri();
            break;
          case 3:
            fn(), Ee(tt), Ee(Ke), xa();
            break;
          case 5:
            ya(o);
            break;
          case 4:
            fn();
            break;
          case 13:
            Ee(Te);
            break;
          case 19:
            Ee(Te);
            break;
          case 10:
            pa(o.type._context);
            break;
          case 22:
          case 23:
            Ja();
        }
        r = r.return;
      }
      if ($e = e, Le = e = wr(e.current, null), Ge = ct = t, Ie = 0, go = null, Va = bi = zr = 0, ot = vo = null, jr !== null) {
        for (t = 0; t < jr.length; t++) if (r = jr[t], o = r.interleaved, o !== null) {
          r.interleaved = null;
          var a = o.next, u = r.pending;
          if (u !== null) {
            var m = u.next;
            u.next = a, o.next = m;
          }
          r.pending = o;
        }
        jr = null;
      }
      return e;
    }
    function Kd(e, t) {
      do {
        var r = Le;
        try {
          if (fa(), mi.current = yi, hi) {
            for (var o = Ae.memoizedState; o !== null; ) {
              var a = o.queue;
              a !== null && (a.pending = null), o = o.next;
            }
            hi = false;
          }
          if (Br = 0, He = Fe = Ae = null, uo = false, co = 0, Ua.current = null, r === null || r.return === null) {
            Ie = 1, go = t, Le = null;
            break;
          }
          e: {
            var u = e, m = r.return, w = r, C = t;
            if (t = Ge, w.flags |= 32768, C !== null && typeof C == "object" && typeof C.then == "function") {
              var D = C, F = w, H = F.tag;
              if (!(F.mode & 1) && (H === 0 || H === 11 || H === 15)) {
                var z = F.alternate;
                z ? (F.updateQueue = z.updateQueue, F.memoizedState = z.memoizedState, F.lanes = z.lanes) : (F.updateQueue = null, F.memoizedState = null);
              }
              var Q = yd(m);
              if (Q !== null) {
                Q.flags &= -257, wd(Q, m, w, u, t), Q.mode & 1 && vd(u, D, t), t = Q, C = D;
                var X = t.updateQueue;
                if (X === null) {
                  var q = /* @__PURE__ */ new Set();
                  q.add(C), t.updateQueue = q;
                } else X.add(C);
                break e;
              } else {
                if (!(t & 1)) {
                  vd(u, D, t), Za();
                  break e;
                }
                C = Error(l(426));
              }
            } else if (Re && w.mode & 1) {
              var Oe = yd(m);
              if (Oe !== null) {
                !(Oe.flags & 65536) && (Oe.flags |= 256), wd(Oe, m, w, u, t), ca(pn(C, w));
                break e;
              }
            }
            u = C = pn(C, w), Ie !== 4 && (Ie = 2), vo === null ? vo = [
              u
            ] : vo.push(u), u = m;
            do {
              switch (u.tag) {
                case 3:
                  u.flags |= 65536, t &= -t, u.lanes |= t;
                  var R = hd(u, C, t);
                  Hc(u, R);
                  break e;
                case 1:
                  w = C;
                  var E = u.type, A = u.stateNode;
                  if (!(u.flags & 128) && (typeof E.getDerivedStateFromError == "function" || A !== null && typeof A.componentDidCatch == "function" && (hr === null || !hr.has(A)))) {
                    u.flags |= 65536, t &= -t, u.lanes |= t;
                    var V = gd(u, w, t);
                    Hc(u, V);
                    break e;
                  }
              }
              u = u.return;
            } while (u !== null);
          }
          Xd(r);
        } catch (ee) {
          t = ee, Le === r && r !== null && (Le = r = r.return);
          continue;
        }
        break;
      } while (true);
    }
    function Qd() {
      var e = Pi.current;
      return Pi.current = yi, e === null ? yi : e;
    }
    function Za() {
      (Ie === 0 || Ie === 3 || Ie === 2) && (Ie = 4), $e === null || !(zr & 268435455) && !(bi & 268435455) || yr($e, Ge);
    }
    function Mi(e, t) {
      var r = ve;
      ve |= 2;
      var o = Qd();
      ($e !== e || Ge !== t) && (qt = null, Ir(e, t));
      do
        try {
          iv();
          break;
        } catch (a) {
          Kd(e, a);
        }
      while (true);
      if (fa(), ve = r, Pi.current = o, Le !== null) throw Error(l(261));
      return $e = null, Ge = 0, Ie;
    }
    function iv() {
      for (; Le !== null; ) Yd(Le);
    }
    function lv() {
      for (; Le !== null && !Mh(); ) Yd(Le);
    }
    function Yd(e) {
      var t = Zd(e.alternate, e, ct);
      e.memoizedProps = e.pendingProps, t === null ? Xd(e) : Le = t, Ua.current = null;
    }
    function Xd(e) {
      var t = e;
      do {
        var r = t.alternate;
        if (e = t.return, t.flags & 32768) {
          if (r = Zg(r, t), r !== null) {
            r.flags &= 32767, Le = r;
            return;
          }
          if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
          else {
            Ie = 6, Le = null;
            return;
          }
        } else if (r = Jg(r, t, ct), r !== null) {
          Le = r;
          return;
        }
        if (t = t.sibling, t !== null) {
          Le = t;
          return;
        }
        Le = t = e;
      } while (t !== null);
      Ie === 0 && (Ie = 5);
    }
    function Wr(e, t, r) {
      var o = Se, a = vt.transition;
      try {
        vt.transition = null, Se = 1, av(e, t, r, o);
      } finally {
        vt.transition = a, Se = o;
      }
      return null;
    }
    function av(e, t, r, o) {
      do
        vn();
      while (gr !== null);
      if (ve & 6) throw Error(l(327));
      r = e.finishedWork;
      var a = e.finishedLanes;
      if (r === null) return null;
      if (e.finishedWork = null, e.finishedLanes = 0, r === e.current) throw Error(l(177));
      e.callbackNode = null, e.callbackPriority = 0;
      var u = r.lanes | r.childLanes;
      if (Wh(e, u), e === $e && (Le = $e = null, Ge = 0), !(r.subtreeFlags & 2064) && !(r.flags & 2064) || Ni || (Ni = true, ef(jo, function() {
        return vn(), null;
      })), u = (r.flags & 15990) !== 0, r.subtreeFlags & 15990 || u) {
        u = vt.transition, vt.transition = null;
        var m = Se;
        Se = 1;
        var w = ve;
        ve |= 4, Ua.current = null, tv(e, r), Id(r, e), Ng(Zl), Ho = !!Jl, Zl = Jl = null, e.current = r, rv(r), Dh(), ve = w, Se = m, vt.transition = u;
      } else e.current = r;
      if (Ni && (Ni = false, gr = e, Ri = a), u = e.pendingLanes, u === 0 && (hr = null), jh(r.stateNode), it(e, _e()), t !== null) for (o = e.onRecoverableError, r = 0; r < t.length; r++) a = t[r], o(a.value, {
        componentStack: a.stack,
        digest: a.digest
      });
      if (Ei) throw Ei = false, e = Ka, Ka = null, e;
      return Ri & 1 && e.tag !== 0 && vn(), u = e.pendingLanes, u & 1 ? e === Qa ? yo++ : (yo = 0, Qa = e) : yo = 0, dr(), null;
    }
    function vn() {
      if (gr !== null) {
        var e = zu(Ri), t = vt.transition, r = Se;
        try {
          if (vt.transition = null, Se = 16 > e ? 16 : e, gr === null) var o = false;
          else {
            if (e = gr, gr = null, Ri = 0, ve & 6) throw Error(l(331));
            var a = ve;
            for (ve |= 4, Y = e.current; Y !== null; ) {
              var u = Y, m = u.child;
              if (Y.flags & 16) {
                var w = u.deletions;
                if (w !== null) {
                  for (var C = 0; C < w.length; C++) {
                    var D = w[C];
                    for (Y = D; Y !== null; ) {
                      var F = Y;
                      switch (F.tag) {
                        case 0:
                        case 11:
                        case 15:
                          ho(8, F, u);
                      }
                      var H = F.child;
                      if (H !== null) H.return = F, Y = H;
                      else for (; Y !== null; ) {
                        F = Y;
                        var z = F.sibling, Q = F.return;
                        if (jd(F), F === D) {
                          Y = null;
                          break;
                        }
                        if (z !== null) {
                          z.return = Q, Y = z;
                          break;
                        }
                        Y = Q;
                      }
                    }
                  }
                  var X = u.alternate;
                  if (X !== null) {
                    var q = X.child;
                    if (q !== null) {
                      X.child = null;
                      do {
                        var Oe = q.sibling;
                        q.sibling = null, q = Oe;
                      } while (q !== null);
                    }
                  }
                  Y = u;
                }
              }
              if (u.subtreeFlags & 2064 && m !== null) m.return = u, Y = m;
              else e: for (; Y !== null; ) {
                if (u = Y, u.flags & 2048) switch (u.tag) {
                  case 0:
                  case 11:
                  case 15:
                    ho(9, u, u.return);
                }
                var R = u.sibling;
                if (R !== null) {
                  R.return = u.return, Y = R;
                  break e;
                }
                Y = u.return;
              }
            }
            var E = e.current;
            for (Y = E; Y !== null; ) {
              m = Y;
              var A = m.child;
              if (m.subtreeFlags & 2064 && A !== null) A.return = m, Y = A;
              else e: for (m = E; Y !== null; ) {
                if (w = Y, w.flags & 2048) try {
                  switch (w.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ci(9, w);
                  }
                } catch (ee) {
                  De(w, w.return, ee);
                }
                if (w === m) {
                  Y = null;
                  break e;
                }
                var V = w.sibling;
                if (V !== null) {
                  V.return = w.return, Y = V;
                  break e;
                }
                Y = w.return;
              }
            }
            if (ve = a, dr(), Dt && typeof Dt.onPostCommitFiberRoot == "function") try {
              Dt.onPostCommitFiberRoot(Lo, e);
            } catch {
            }
            o = true;
          }
          return o;
        } finally {
          Se = r, vt.transition = t;
        }
      }
      return false;
    }
    function qd(e, t, r) {
      t = pn(r, t), t = hd(e, t, 1), e = pr(e, t, 1), t = Ze(), e !== null && (Wn(e, 1, t), it(e, t));
    }
    function De(e, t, r) {
      if (e.tag === 3) qd(e, e, r);
      else for (; t !== null; ) {
        if (t.tag === 3) {
          qd(t, e, r);
          break;
        } else if (t.tag === 1) {
          var o = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (hr === null || !hr.has(o))) {
            e = pn(r, e), e = gd(t, e, 1), t = pr(t, e, 1), e = Ze(), t !== null && (Wn(t, 1, e), it(t, e));
            break;
          }
        }
        t = t.return;
      }
    }
    function sv(e, t, r) {
      var o = e.pingCache;
      o !== null && o.delete(t), t = Ze(), e.pingedLanes |= e.suspendedLanes & r, $e === e && (Ge & r) === r && (Ie === 4 || Ie === 3 && (Ge & 130023424) === Ge && 500 > _e() - Ga ? Ir(e, 0) : Va |= r), it(e, t);
    }
    function Jd(e, t) {
      t === 0 && (e.mode & 1 ? (t = zo, zo <<= 1, !(zo & 130023424) && (zo = 4194304)) : t = 1);
      var r = Ze();
      e = Qt(e, t), e !== null && (Wn(e, t, r), it(e, r));
    }
    function uv(e) {
      var t = e.memoizedState, r = 0;
      t !== null && (r = t.retryLane), Jd(e, r);
    }
    function cv(e, t) {
      var r = 0;
      switch (e.tag) {
        case 13:
          var o = e.stateNode, a = e.memoizedState;
          a !== null && (r = a.retryLane);
          break;
        case 19:
          o = e.stateNode;
          break;
        default:
          throw Error(l(314));
      }
      o !== null && o.delete(t), Jd(e, r);
    }
    var Zd;
    Zd = function(e, t, r) {
      if (e !== null) if (e.memoizedProps !== t.pendingProps || tt.current) nt = true;
      else {
        if (!(e.lanes & r) && !(t.flags & 128)) return nt = false, qg(e, t, r);
        nt = !!(e.flags & 131072);
      }
      else nt = false, Re && t.flags & 1048576 && Dc(t, li, t.index);
      switch (t.lanes = 0, t.tag) {
        case 2:
          var o = t.type;
          Si(e, t), e = t.pendingProps;
          var a = on(t, Ke.current);
          dn(t, r), a = Ca(null, t, o, e, a, r);
          var u = Pa();
          return t.flags |= 1, typeof a == "object" && a !== null && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, rt(o) ? (u = true, ni(t)) : u = false, t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, ga(t), a.updater = wi, t.stateNode = a, a._reactInternals = t, Aa(t, o, e, r), t = Oa(null, t, o, true, u, r)) : (t.tag = 0, Re && u && la(t), Je(null, t, a, r), t = t.child), t;
        case 16:
          o = t.elementType;
          e: {
            switch (Si(e, t), e = t.pendingProps, a = o._init, o = a(o._payload), t.type = o, a = t.tag = fv(o), e = Pt(o, e), a) {
              case 0:
                t = _a(null, t, o, e, r);
                break e;
              case 1:
                t = bd(null, t, o, e, r);
                break e;
              case 11:
                t = xd(null, t, o, e, r);
                break e;
              case 14:
                t = Sd(null, t, o, Pt(o.type, e), r);
                break e;
            }
            throw Error(l(306, o, ""));
          }
          return t;
        case 0:
          return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : Pt(o, a), _a(e, t, o, a, r);
        case 1:
          return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : Pt(o, a), bd(e, t, o, a, r);
        case 3:
          e: {
            if (Ed(t), e === null) throw Error(l(387));
            o = t.pendingProps, u = t.memoizedState, a = u.element, Wc(e, t), fi(t, o, null, r);
            var m = t.memoizedState;
            if (o = m.element, u.isDehydrated) if (u = {
              element: o,
              isDehydrated: false,
              cache: m.cache,
              pendingSuspenseBoundaries: m.pendingSuspenseBoundaries,
              transitions: m.transitions
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              a = pn(Error(l(423)), t), t = Nd(e, t, o, r, a);
              break e;
            } else if (o !== a) {
              a = pn(Error(l(424)), t), t = Nd(e, t, o, r, a);
              break e;
            } else for (ut = sr(t.stateNode.containerInfo.firstChild), st = t, Re = true, Ct = null, r = Fc(t, null, o, r), t.child = r; r; ) r.flags = r.flags & -3 | 4096, r = r.sibling;
            else {
              if (sn(), o === a) {
                t = Xt(e, t, r);
                break e;
              }
              Je(e, t, o, r);
            }
            t = t.child;
          }
          return t;
        case 5:
          return Uc(t), e === null && ua(t), o = t.type, a = t.pendingProps, u = e !== null ? e.memoizedProps : null, m = a.children, ea(o, a) ? m = null : u !== null && ea(o, u) && (t.flags |= 32), Pd(e, t), Je(e, t, m, r), t.child;
        case 6:
          return e === null && ua(t), null;
        case 13:
          return Rd(e, t, r);
        case 4:
          return va(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = un(t, null, o, r) : Je(e, t, o, r), t.child;
        case 11:
          return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : Pt(o, a), xd(e, t, o, a, r);
        case 7:
          return Je(e, t, t.pendingProps, r), t.child;
        case 8:
          return Je(e, t, t.pendingProps.children, r), t.child;
        case 12:
          return Je(e, t, t.pendingProps.children, r), t.child;
        case 10:
          e: {
            if (o = t.type._context, a = t.pendingProps, u = t.memoizedProps, m = a.value, Pe(ui, o._currentValue), o._currentValue = m, u !== null) if (kt(u.value, m)) {
              if (u.children === a.children && !tt.current) {
                t = Xt(e, t, r);
                break e;
              }
            } else for (u = t.child, u !== null && (u.return = t); u !== null; ) {
              var w = u.dependencies;
              if (w !== null) {
                m = u.child;
                for (var C = w.firstContext; C !== null; ) {
                  if (C.context === o) {
                    if (u.tag === 1) {
                      C = Yt(-1, r & -r), C.tag = 2;
                      var D = u.updateQueue;
                      if (D !== null) {
                        D = D.shared;
                        var F = D.pending;
                        F === null ? C.next = C : (C.next = F.next, F.next = C), D.pending = C;
                      }
                    }
                    u.lanes |= r, C = u.alternate, C !== null && (C.lanes |= r), ma(u.return, r, t), w.lanes |= r;
                    break;
                  }
                  C = C.next;
                }
              } else if (u.tag === 10) m = u.type === t.type ? null : u.child;
              else if (u.tag === 18) {
                if (m = u.return, m === null) throw Error(l(341));
                m.lanes |= r, w = m.alternate, w !== null && (w.lanes |= r), ma(m, r, t), m = u.sibling;
              } else m = u.child;
              if (m !== null) m.return = u;
              else for (m = u; m !== null; ) {
                if (m === t) {
                  m = null;
                  break;
                }
                if (u = m.sibling, u !== null) {
                  u.return = m.return, m = u;
                  break;
                }
                m = m.return;
              }
              u = m;
            }
            Je(e, t, a.children, r), t = t.child;
          }
          return t;
        case 9:
          return a = t.type, o = t.pendingProps.children, dn(t, r), a = ht(a), o = o(a), t.flags |= 1, Je(e, t, o, r), t.child;
        case 14:
          return o = t.type, a = Pt(o, t.pendingProps), a = Pt(o.type, a), Sd(e, t, o, a, r);
        case 15:
          return kd(e, t, t.type, t.pendingProps, r);
        case 17:
          return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : Pt(o, a), Si(e, t), t.tag = 1, rt(o) ? (e = true, ni(t)) : e = false, dn(t, r), pd(t, o, a), Aa(t, o, a, r), Oa(null, t, o, true, e, r);
        case 19:
          return Ad(e, t, r);
        case 22:
          return Cd(e, t, r);
      }
      throw Error(l(156, t.tag));
    };
    function ef(e, t) {
      return _u(e, t);
    }
    function dv(e, t, r, o) {
      this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function yt(e, t, r, o) {
      return new dv(e, t, r, o);
    }
    function es(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function fv(e) {
      if (typeof e == "function") return es(e) ? 1 : 0;
      if (e != null) {
        if (e = e.$$typeof, e === te) return 11;
        if (e === ke) return 14;
      }
      return 2;
    }
    function wr(e, t) {
      var r = e.alternate;
      return r === null ? (r = yt(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 14680064, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r;
    }
    function Di(e, t, r, o, a, u) {
      var m = 2;
      if (o = e, typeof e == "function") es(e) && (m = 1);
      else if (typeof e == "string") m = 5;
      else e: switch (e) {
        case U:
          return Hr(r.children, a, u, t);
        case Z:
          m = 8, a |= 8;
          break;
        case J:
          return e = yt(12, r, t, a | 2), e.elementType = J, e.lanes = u, e;
        case me:
          return e = yt(13, r, t, a), e.elementType = me, e.lanes = u, e;
        case fe:
          return e = yt(19, r, t, a), e.elementType = fe, e.lanes = u, e;
        case le:
          return _i(r, a, u, t);
        default:
          if (typeof e == "object" && e !== null) switch (e.$$typeof) {
            case oe:
              m = 10;
              break e;
            case ae:
              m = 9;
              break e;
            case te:
              m = 11;
              break e;
            case ke:
              m = 14;
              break e;
            case ce:
              m = 16, o = null;
              break e;
          }
          throw Error(l(130, e == null ? e : typeof e, ""));
      }
      return t = yt(m, r, t, a), t.elementType = e, t.type = o, t.lanes = u, t;
    }
    function Hr(e, t, r, o) {
      return e = yt(7, e, o, t), e.lanes = r, e;
    }
    function _i(e, t, r, o) {
      return e = yt(22, e, o, t), e.elementType = le, e.lanes = r, e.stateNode = {
        isHidden: false
      }, e;
    }
    function ts(e, t, r) {
      return e = yt(6, e, null, t), e.lanes = r, e;
    }
    function rs(e, t, r) {
      return t = yt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = r, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    function pv(e, t, r, o, a) {
      this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Tl(0), this.expirationTimes = Tl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Tl(0), this.identifierPrefix = o, this.onRecoverableError = a, this.mutableSourceEagerHydrationData = null;
    }
    function ns(e, t, r, o, a, u, m, w, C) {
      return e = new pv(e, t, r, w, C), t === 1 ? (t = 1, u === true && (t |= 8)) : t = 0, u = yt(3, null, null, t), e.current = u, u.stateNode = e, u.memoizedState = {
        element: o,
        isDehydrated: r,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
      }, ga(u), e;
    }
    function mv(e, t, r) {
      var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: $,
        key: o == null ? null : "" + o,
        children: e,
        containerInfo: t,
        implementation: r
      };
    }
    function tf(e) {
      if (!e) return cr;
      e = e._reactInternals;
      e: {
        if (Ar(e) !== e || e.tag !== 1) throw Error(l(170));
        var t = e;
        do {
          switch (t.tag) {
            case 3:
              t = t.stateNode.context;
              break e;
            case 1:
              if (rt(t.type)) {
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
        if (rt(r)) return Tc(e, r, t);
      }
      return t;
    }
    function rf(e, t, r, o, a, u, m, w, C) {
      return e = ns(r, o, true, e, a, u, m, w, C), e.context = tf(null), r = e.current, o = Ze(), a = vr(r), u = Yt(o, a), u.callback = t ?? null, pr(r, u, a), e.current.lanes = a, Wn(e, a, o), it(e, o), e;
    }
    function Oi(e, t, r, o) {
      var a = t.current, u = Ze(), m = vr(a);
      return r = tf(r), t.context === null ? t.context = r : t.pendingContext = r, t = Yt(u, m), t.payload = {
        element: e
      }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = pr(a, t, m), e !== null && (Nt(e, a, m, u), di(e, a, m)), m;
    }
    function ji(e) {
      if (e = e.current, !e.child) return null;
      switch (e.child.tag) {
        case 5:
          return e.child.stateNode;
        default:
          return e.child.stateNode;
      }
    }
    function nf(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var r = e.retryLane;
        e.retryLane = r !== 0 && r < t ? r : t;
      }
    }
    function os(e, t) {
      nf(e, t), (e = e.alternate) && nf(e, t);
    }
    function hv() {
      return null;
    }
    var of = typeof reportError == "function" ? reportError : function(e) {
      console.error(e);
    };
    function is(e) {
      this._internalRoot = e;
    }
    Li.prototype.render = is.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error(l(409));
      Oi(e, t, null, null);
    }, Li.prototype.unmount = is.prototype.unmount = function() {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Fr(function() {
          Oi(null, e, null, null);
        }), t[Ut] = null;
      }
    };
    function Li(e) {
      this._internalRoot = e;
    }
    Li.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = Wu();
        e = {
          blockedOn: null,
          target: e,
          priority: t
        };
        for (var r = 0; r < ir.length && t !== 0 && t < ir[r].priority; r++) ;
        ir.splice(r, 0, e), r === 0 && Uu(e);
      }
    };
    function ls(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
    }
    function Bi(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
    }
    function lf() {
    }
    function gv(e, t, r, o, a) {
      if (a) {
        if (typeof o == "function") {
          var u = o;
          o = function() {
            var D = ji(m);
            u.call(D);
          };
        }
        var m = rf(t, o, e, 0, null, false, false, "", lf);
        return e._reactRootContainer = m, e[Ut] = m.current, to(e.nodeType === 8 ? e.parentNode : e), Fr(), m;
      }
      for (; a = e.lastChild; ) e.removeChild(a);
      if (typeof o == "function") {
        var w = o;
        o = function() {
          var D = ji(C);
          w.call(D);
        };
      }
      var C = ns(e, 0, false, null, null, false, false, "", lf);
      return e._reactRootContainer = C, e[Ut] = C.current, to(e.nodeType === 8 ? e.parentNode : e), Fr(function() {
        Oi(t, C, r, o);
      }), C;
    }
    function zi(e, t, r, o, a) {
      var u = r._reactRootContainer;
      if (u) {
        var m = u;
        if (typeof a == "function") {
          var w = a;
          a = function() {
            var C = ji(m);
            w.call(C);
          };
        }
        Oi(t, m, e, a);
      } else m = gv(r, t, e, a, o);
      return ji(m);
    }
    Fu = function(e) {
      switch (e.tag) {
        case 3:
          var t = e.stateNode;
          if (t.current.memoizedState.isDehydrated) {
            var r = In(t.pendingLanes);
            r !== 0 && (Al(t, r | 1), it(t, _e()), !(ve & 6) && (gn = _e() + 500, dr()));
          }
          break;
        case 13:
          Fr(function() {
            var o = Qt(e, 1);
            if (o !== null) {
              var a = Ze();
              Nt(o, e, 1, a);
            }
          }), os(e, 1);
      }
    }, Ml = function(e) {
      if (e.tag === 13) {
        var t = Qt(e, 134217728);
        if (t !== null) {
          var r = Ze();
          Nt(t, e, 134217728, r);
        }
        os(e, 134217728);
      }
    }, Iu = function(e) {
      if (e.tag === 13) {
        var t = vr(e), r = Qt(e, t);
        if (r !== null) {
          var o = Ze();
          Nt(r, e, t, o);
        }
        os(e, t);
      }
    }, Wu = function() {
      return Se;
    }, Hu = function(e, t) {
      var r = Se;
      try {
        return Se = e, t();
      } finally {
        Se = r;
      }
    }, Cl = function(e, t, r) {
      switch (t) {
        case "input":
          if (hl(e, r), t = r.name, r.type === "radio" && t != null) {
            for (r = e; r.parentNode; ) r = r.parentNode;
            for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < r.length; t++) {
              var o = r[t];
              if (o !== e && o.form === e.form) {
                var a = ti(o);
                if (!a) throw Error(l(90));
                Mo(o), hl(o, a);
              }
            }
          }
          break;
        case "textarea":
          vu(e, r);
          break;
        case "select":
          t = r.value, t != null && Gr(e, !!r.multiple, t, false);
      }
    }, Eu = qa, Nu = Fr;
    var vv = {
      usingClientEntryPoint: false,
      Events: [
        oo,
        rn,
        ti,
        Pu,
        bu,
        qa
      ]
    }, wo = {
      findFiberByHostInstance: Mr,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom"
    }, yv = {
      bundleType: wo.bundleType,
      version: wo.version,
      rendererPackageName: wo.rendererPackageName,
      rendererConfig: wo.rendererConfig,
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
        return e = Mu(e), e === null ? null : e.stateNode;
      },
      findFiberByHostInstance: wo.findFiberByHostInstance || hv,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var Fi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!Fi.isDisabled && Fi.supportsFiber) try {
        Lo = Fi.inject(yv), Dt = Fi;
      } catch {
      }
    }
    return lt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vv, lt.createPortal = function(e, t) {
      var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!ls(t)) throw Error(l(200));
      return mv(e, t, null, r);
    }, lt.createRoot = function(e, t) {
      if (!ls(e)) throw Error(l(299));
      var r = false, o = "", a = of;
      return t != null && (t.unstable_strictMode === true && (r = true), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (a = t.onRecoverableError)), t = ns(e, 1, false, null, null, r, false, o, a), e[Ut] = t.current, to(e.nodeType === 8 ? e.parentNode : e), new is(t);
    }, lt.findDOMNode = function(e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0) throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
      return e = Mu(t), e = e === null ? null : e.stateNode, e;
    }, lt.flushSync = function(e) {
      return Fr(e);
    }, lt.hydrate = function(e, t, r) {
      if (!Bi(t)) throw Error(l(200));
      return zi(null, e, t, true, r);
    }, lt.hydrateRoot = function(e, t, r) {
      if (!ls(e)) throw Error(l(405));
      var o = r != null && r.hydratedSources || null, a = false, u = "", m = of;
      if (r != null && (r.unstable_strictMode === true && (a = true), r.identifierPrefix !== void 0 && (u = r.identifierPrefix), r.onRecoverableError !== void 0 && (m = r.onRecoverableError)), t = rf(t, null, e, 1, r ?? null, a, false, u, m), e[Ut] = t.current, to(e), o) for (e = 0; e < o.length; e++) r = o[e], a = r._getVersion, a = a(r._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [
        r,
        a
      ] : t.mutableSourceEagerHydrationData.push(r, a);
      return new Li(t);
    }, lt.render = function(e, t, r) {
      if (!Bi(t)) throw Error(l(200));
      return zi(null, e, t, false, r);
    }, lt.unmountComponentAtNode = function(e) {
      if (!Bi(e)) throw Error(l(40));
      return e._reactRootContainer ? (Fr(function() {
        zi(null, null, e, false, function() {
          e._reactRootContainer = null, e[Ut] = null;
        });
      }), true) : false;
    }, lt.unstable_batchedUpdates = qa, lt.unstable_renderSubtreeIntoContainer = function(e, t, r, o) {
      if (!Bi(r)) throw Error(l(200));
      if (e == null || e._reactInternals === void 0) throw Error(l(38));
      return zi(e, t, r, false, o);
    }, lt.version = "18.3.1-next-f1338f8080-20240426", lt;
  }
  var mf;
  function ep() {
    if (mf) return us.exports;
    mf = 1;
    function n() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
    }
    return n(), us.exports = Rv(), us.exports;
  }
  var hf;
  function Tv() {
    if (hf) return Ii;
    hf = 1;
    var n = ep();
    return Ii.createRoot = n.createRoot, Ii.hydrateRoot = n.hydrateRoot, Ii;
  }
  var Av = Tv();
  function gf(n, i) {
    if (typeof n == "function") return n(i);
    n != null && (n.current = i);
  }
  function tp(...n) {
    return (i) => {
      let l = false;
      const s = n.map((c) => {
        const d = gf(c, i);
        return !l && typeof d == "function" && (l = true), d;
      });
      if (l) return () => {
        for (let c = 0; c < s.length; c++) {
          const d = s[c];
          typeof d == "function" ? d() : gf(n[c], null);
        }
      };
    };
  }
  function ze(...n) {
    return h.useCallback(tp(...n), n);
  }
  var Ro = h.forwardRef((n, i) => {
    const { children: l, ...s } = n, c = h.Children.toArray(l), d = c.find(Mv);
    if (d) {
      const f = d.props.children, p = c.map((v) => v === d ? h.Children.count(f) > 1 ? h.Children.only(null) : h.isValidElement(f) ? f.props.children : null : v);
      return g.jsx(ks, {
        ...s,
        ref: i,
        children: h.isValidElement(f) ? h.cloneElement(f, void 0, p) : null
      });
    }
    return g.jsx(ks, {
      ...s,
      ref: i,
      children: l
    });
  });
  Ro.displayName = "Slot";
  var ks = h.forwardRef((n, i) => {
    const { children: l, ...s } = n;
    if (h.isValidElement(l)) {
      const c = _v(l), d = Dv(s, l.props);
      return l.type !== h.Fragment && (d.ref = i ? tp(i, c) : c), h.cloneElement(l, d);
    }
    return h.Children.count(l) > 1 ? h.Children.only(null) : null;
  });
  ks.displayName = "SlotClone";
  var rp = ({ children: n }) => g.jsx(g.Fragment, {
    children: n
  });
  function Mv(n) {
    return h.isValidElement(n) && n.type === rp;
  }
  function Dv(n, i) {
    const l = {
      ...i
    };
    for (const s in i) {
      const c = n[s], d = i[s];
      /^on[A-Z]/.test(s) ? c && d ? l[s] = (...p) => {
        d(...p), c(...p);
      } : c && (l[s] = c) : s === "style" ? l[s] = {
        ...c,
        ...d
      } : s === "className" && (l[s] = [
        c,
        d
      ].filter(Boolean).join(" "));
    }
    return {
      ...n,
      ...l
    };
  }
  function _v(n) {
    var _a, _b;
    let i = (_a = Object.getOwnPropertyDescriptor(n.props, "ref")) == null ? void 0 : _a.get, l = i && "isReactWarning" in i && i.isReactWarning;
    return l ? n.ref : (i = (_b = Object.getOwnPropertyDescriptor(n, "ref")) == null ? void 0 : _b.get, l = i && "isReactWarning" in i && i.isReactWarning, l ? n.props.ref : n.props.ref || n.ref);
  }
  function np(n) {
    var i, l, s = "";
    if (typeof n == "string" || typeof n == "number") s += n;
    else if (typeof n == "object") if (Array.isArray(n)) {
      var c = n.length;
      for (i = 0; i < c; i++) n[i] && (l = np(n[i])) && (s && (s += " "), s += l);
    } else for (l in n) n[l] && (s && (s += " "), s += l);
    return s;
  }
  function al() {
    for (var n, i, l = 0, s = "", c = arguments.length; l < c; l++) (n = arguments[l]) && (i = np(n)) && (s && (s += " "), s += i);
    return s;
  }
  const vf = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n, yf = al, Ov = (n, i) => (l) => {
    var s;
    if ((i == null ? void 0 : i.variants) == null) return yf(n, l == null ? void 0 : l.class, l == null ? void 0 : l.className);
    const { variants: c, defaultVariants: d } = i, f = Object.keys(c).map((y) => {
      const x = l == null ? void 0 : l[y], k = d == null ? void 0 : d[y];
      if (x === null) return null;
      const S = vf(x) || vf(k);
      return c[y][S];
    }), p = l && Object.entries(l).reduce((y, x) => {
      let [k, S] = x;
      return S === void 0 || (y[k] = S), y;
    }, {}), v = i == null || (s = i.compoundVariants) === null || s === void 0 ? void 0 : s.reduce((y, x) => {
      let { class: k, className: S, ...P } = x;
      return Object.entries(P).every((M) => {
        let [b, T] = M;
        return Array.isArray(T) ? T.includes({
          ...d,
          ...p
        }[b]) : {
          ...d,
          ...p
        }[b] === T;
      }) ? [
        ...y,
        k,
        S
      ] : y;
    }, []);
    return yf(n, f, v, l == null ? void 0 : l.class, l == null ? void 0 : l.className);
  }, Ms = "-", jv = (n) => {
    const i = Bv(n), { conflictingClassGroups: l, conflictingClassGroupModifiers: s } = n;
    return {
      getClassGroupId: (f) => {
        const p = f.split(Ms);
        return p[0] === "" && p.length !== 1 && p.shift(), op(p, i) || Lv(f);
      },
      getConflictingClassGroupIds: (f, p) => {
        const v = l[f] || [];
        return p && s[f] ? [
          ...v,
          ...s[f]
        ] : v;
      }
    };
  }, op = (n, i) => {
    var _a;
    if (n.length === 0) return i.classGroupId;
    const l = n[0], s = i.nextPart.get(l), c = s ? op(n.slice(1), s) : void 0;
    if (c) return c;
    if (i.validators.length === 0) return;
    const d = n.join(Ms);
    return (_a = i.validators.find(({ validator: f }) => f(d))) == null ? void 0 : _a.classGroupId;
  }, wf = /^\[(.+)\]$/, Lv = (n) => {
    if (wf.test(n)) {
      const i = wf.exec(n)[1], l = i == null ? void 0 : i.substring(0, i.indexOf(":"));
      if (l) return "arbitrary.." + l;
    }
  }, Bv = (n) => {
    const { theme: i, prefix: l } = n, s = {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    };
    return Fv(Object.entries(n.classGroups), l).forEach(([d, f]) => {
      Cs(f, s, d, i);
    }), s;
  }, Cs = (n, i, l, s) => {
    n.forEach((c) => {
      if (typeof c == "string") {
        const d = c === "" ? i : xf(i, c);
        d.classGroupId = l;
        return;
      }
      if (typeof c == "function") {
        if (zv(c)) {
          Cs(c(s), i, l, s);
          return;
        }
        i.validators.push({
          validator: c,
          classGroupId: l
        });
        return;
      }
      Object.entries(c).forEach(([d, f]) => {
        Cs(f, xf(i, d), l, s);
      });
    });
  }, xf = (n, i) => {
    let l = n;
    return i.split(Ms).forEach((s) => {
      l.nextPart.has(s) || l.nextPart.set(s, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      }), l = l.nextPart.get(s);
    }), l;
  }, zv = (n) => n.isThemeGetter, Fv = (n, i) => i ? n.map(([l, s]) => {
    const c = s.map((d) => typeof d == "string" ? i + d : typeof d == "object" ? Object.fromEntries(Object.entries(d).map(([f, p]) => [
      i + f,
      p
    ])) : d);
    return [
      l,
      c
    ];
  }) : n, Iv = (n) => {
    if (n < 1) return {
      get: () => {
      },
      set: () => {
      }
    };
    let i = 0, l = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
    const c = (d, f) => {
      l.set(d, f), i++, i > n && (i = 0, s = l, l = /* @__PURE__ */ new Map());
    };
    return {
      get(d) {
        let f = l.get(d);
        if (f !== void 0) return f;
        if ((f = s.get(d)) !== void 0) return c(d, f), f;
      },
      set(d, f) {
        l.has(d) ? l.set(d, f) : c(d, f);
      }
    };
  }, ip = "!", Wv = (n) => {
    const { separator: i, experimentalParseClassName: l } = n, s = i.length === 1, c = i[0], d = i.length, f = (p) => {
      const v = [];
      let y = 0, x = 0, k;
      for (let T = 0; T < p.length; T++) {
        let j = p[T];
        if (y === 0) {
          if (j === c && (s || p.slice(T, T + d) === i)) {
            v.push(p.slice(x, T)), x = T + d;
            continue;
          }
          if (j === "/") {
            k = T;
            continue;
          }
        }
        j === "[" ? y++ : j === "]" && y--;
      }
      const S = v.length === 0 ? p : p.substring(x), P = S.startsWith(ip), M = P ? S.substring(1) : S, b = k && k > x ? k - x : void 0;
      return {
        modifiers: v,
        hasImportantModifier: P,
        baseClassName: M,
        maybePostfixModifierPosition: b
      };
    };
    return l ? (p) => l({
      className: p,
      parseClassName: f
    }) : f;
  }, Hv = (n) => {
    if (n.length <= 1) return n;
    const i = [];
    let l = [];
    return n.forEach((s) => {
      s[0] === "[" ? (i.push(...l.sort(), s), l = []) : l.push(s);
    }), i.push(...l.sort()), i;
  }, $v = (n) => ({
    cache: Iv(n.cacheSize),
    parseClassName: Wv(n),
    ...jv(n)
  }), Uv = /\s+/, Vv = (n, i) => {
    const { parseClassName: l, getClassGroupId: s, getConflictingClassGroupIds: c } = i, d = [], f = n.trim().split(Uv);
    let p = "";
    for (let v = f.length - 1; v >= 0; v -= 1) {
      const y = f[v], { modifiers: x, hasImportantModifier: k, baseClassName: S, maybePostfixModifierPosition: P } = l(y);
      let M = !!P, b = s(M ? S.substring(0, P) : S);
      if (!b) {
        if (!M) {
          p = y + (p.length > 0 ? " " + p : p);
          continue;
        }
        if (b = s(S), !b) {
          p = y + (p.length > 0 ? " " + p : p);
          continue;
        }
        M = false;
      }
      const T = Hv(x).join(":"), j = k ? T + ip : T, I = j + b;
      if (d.includes(I)) continue;
      d.push(I);
      const W = c(b, M);
      for (let O = 0; O < W.length; ++O) {
        const _ = W[O];
        d.push(j + _);
      }
      p = y + (p.length > 0 ? " " + p : p);
    }
    return p;
  };
  function Gv() {
    let n = 0, i, l, s = "";
    for (; n < arguments.length; ) (i = arguments[n++]) && (l = lp(i)) && (s && (s += " "), s += l);
    return s;
  }
  const lp = (n) => {
    if (typeof n == "string") return n;
    let i, l = "";
    for (let s = 0; s < n.length; s++) n[s] && (i = lp(n[s])) && (l && (l += " "), l += i);
    return l;
  };
  function Kv(n, ...i) {
    let l, s, c, d = f;
    function f(v) {
      const y = i.reduce((x, k) => k(x), n());
      return l = $v(y), s = l.cache.get, c = l.cache.set, d = p, p(v);
    }
    function p(v) {
      const y = s(v);
      if (y) return y;
      const x = Vv(v, l);
      return c(v, x), x;
    }
    return function() {
      return d(Gv.apply(null, arguments));
    };
  }
  const Ne = (n) => {
    const i = (l) => l[n] || [];
    return i.isThemeGetter = true, i;
  }, ap = /^\[(?:([a-z-]+):)?(.+)\]$/i, Qv = /^\d+\/\d+$/, Yv = /* @__PURE__ */ new Set([
    "px",
    "full",
    "screen"
  ]), Xv = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, qv = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Jv = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Zv = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ey = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Jt = (n) => Sn(n) || Yv.has(n) || Qv.test(n), Sr = (n) => An(n, "length", sy), Sn = (n) => !!n && !Number.isNaN(Number(n)), fs = (n) => An(n, "number", Sn), So = (n) => !!n && Number.isInteger(Number(n)), ty = (n) => n.endsWith("%") && Sn(n.slice(0, -1)), ue = (n) => ap.test(n), kr = (n) => Xv.test(n), ry = /* @__PURE__ */ new Set([
    "length",
    "size",
    "percentage"
  ]), ny = (n) => An(n, ry, sp), oy = (n) => An(n, "position", sp), iy = /* @__PURE__ */ new Set([
    "image",
    "url"
  ]), ly = (n) => An(n, iy, cy), ay = (n) => An(n, "", uy), ko = () => true, An = (n, i, l) => {
    const s = ap.exec(n);
    return s ? s[1] ? typeof i == "string" ? s[1] === i : i.has(s[1]) : l(s[2]) : false;
  }, sy = (n) => qv.test(n) && !Jv.test(n), sp = () => false, uy = (n) => Zv.test(n), cy = (n) => ey.test(n), dy = () => {
    const n = Ne("colors"), i = Ne("spacing"), l = Ne("blur"), s = Ne("brightness"), c = Ne("borderColor"), d = Ne("borderRadius"), f = Ne("borderSpacing"), p = Ne("borderWidth"), v = Ne("contrast"), y = Ne("grayscale"), x = Ne("hueRotate"), k = Ne("invert"), S = Ne("gap"), P = Ne("gradientColorStops"), M = Ne("gradientColorStopPositions"), b = Ne("inset"), T = Ne("margin"), j = Ne("opacity"), I = Ne("padding"), W = Ne("saturate"), O = Ne("scale"), _ = Ne("sepia"), $ = Ne("skew"), U = Ne("space"), Z = Ne("translate"), J = () => [
      "auto",
      "contain",
      "none"
    ], oe = () => [
      "auto",
      "hidden",
      "clip",
      "visible",
      "scroll"
    ], ae = () => [
      "auto",
      ue,
      i
    ], te = () => [
      ue,
      i
    ], me = () => [
      "",
      Jt,
      Sr
    ], fe = () => [
      "auto",
      Sn,
      ue
    ], ke = () => [
      "bottom",
      "center",
      "left",
      "left-bottom",
      "left-top",
      "right",
      "right-bottom",
      "right-top",
      "top"
    ], ce = () => [
      "solid",
      "dashed",
      "dotted",
      "double",
      "none"
    ], le = () => [
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
    ], L = () => [
      "start",
      "end",
      "center",
      "between",
      "around",
      "evenly",
      "stretch"
    ], K = () => [
      "",
      "0",
      ue
    ], G = () => [
      "auto",
      "avoid",
      "all",
      "avoid-page",
      "page",
      "left",
      "right",
      "column"
    ], N = () => [
      Sn,
      ue
    ];
    return {
      cacheSize: 500,
      separator: ":",
      theme: {
        colors: [
          ko
        ],
        spacing: [
          Jt,
          Sr
        ],
        blur: [
          "none",
          "",
          kr,
          ue
        ],
        brightness: N(),
        borderColor: [
          n
        ],
        borderRadius: [
          "none",
          "",
          "full",
          kr,
          ue
        ],
        borderSpacing: te(),
        borderWidth: me(),
        contrast: N(),
        grayscale: K(),
        hueRotate: N(),
        invert: K(),
        gap: te(),
        gradientColorStops: [
          n
        ],
        gradientColorStopPositions: [
          ty,
          Sr
        ],
        inset: ae(),
        margin: ae(),
        opacity: N(),
        padding: te(),
        saturate: N(),
        scale: N(),
        sepia: K(),
        skew: N(),
        space: te(),
        translate: te()
      },
      classGroups: {
        aspect: [
          {
            aspect: [
              "auto",
              "square",
              "video",
              ue
            ]
          }
        ],
        container: [
          "container"
        ],
        columns: [
          {
            columns: [
              kr
            ]
          }
        ],
        "break-after": [
          {
            "break-after": G()
          }
        ],
        "break-before": [
          {
            "break-before": G()
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
              ...ke(),
              ue
            ]
          }
        ],
        overflow: [
          {
            overflow: oe()
          }
        ],
        "overflow-x": [
          {
            "overflow-x": oe()
          }
        ],
        "overflow-y": [
          {
            "overflow-y": oe()
          }
        ],
        overscroll: [
          {
            overscroll: J()
          }
        ],
        "overscroll-x": [
          {
            "overscroll-x": J()
          }
        ],
        "overscroll-y": [
          {
            "overscroll-y": J()
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
              b
            ]
          }
        ],
        "inset-x": [
          {
            "inset-x": [
              b
            ]
          }
        ],
        "inset-y": [
          {
            "inset-y": [
              b
            ]
          }
        ],
        start: [
          {
            start: [
              b
            ]
          }
        ],
        end: [
          {
            end: [
              b
            ]
          }
        ],
        top: [
          {
            top: [
              b
            ]
          }
        ],
        right: [
          {
            right: [
              b
            ]
          }
        ],
        bottom: [
          {
            bottom: [
              b
            ]
          }
        ],
        left: [
          {
            left: [
              b
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
              So,
              ue
            ]
          }
        ],
        basis: [
          {
            basis: ae()
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
              ue
            ]
          }
        ],
        grow: [
          {
            grow: K()
          }
        ],
        shrink: [
          {
            shrink: K()
          }
        ],
        order: [
          {
            order: [
              "first",
              "last",
              "none",
              So,
              ue
            ]
          }
        ],
        "grid-cols": [
          {
            "grid-cols": [
              ko
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
                  So,
                  ue
                ]
              },
              ue
            ]
          }
        ],
        "col-start": [
          {
            "col-start": fe()
          }
        ],
        "col-end": [
          {
            "col-end": fe()
          }
        ],
        "grid-rows": [
          {
            "grid-rows": [
              ko
            ]
          }
        ],
        "row-start-end": [
          {
            row: [
              "auto",
              {
                span: [
                  So,
                  ue
                ]
              },
              ue
            ]
          }
        ],
        "row-start": [
          {
            "row-start": fe()
          }
        ],
        "row-end": [
          {
            "row-end": fe()
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
              ue
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
              ue
            ]
          }
        ],
        gap: [
          {
            gap: [
              S
            ]
          }
        ],
        "gap-x": [
          {
            "gap-x": [
              S
            ]
          }
        ],
        "gap-y": [
          {
            "gap-y": [
              S
            ]
          }
        ],
        "justify-content": [
          {
            justify: [
              "normal",
              ...L()
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
              ...L(),
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
              ...L(),
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
              I
            ]
          }
        ],
        px: [
          {
            px: [
              I
            ]
          }
        ],
        py: [
          {
            py: [
              I
            ]
          }
        ],
        ps: [
          {
            ps: [
              I
            ]
          }
        ],
        pe: [
          {
            pe: [
              I
            ]
          }
        ],
        pt: [
          {
            pt: [
              I
            ]
          }
        ],
        pr: [
          {
            pr: [
              I
            ]
          }
        ],
        pb: [
          {
            pb: [
              I
            ]
          }
        ],
        pl: [
          {
            pl: [
              I
            ]
          }
        ],
        m: [
          {
            m: [
              T
            ]
          }
        ],
        mx: [
          {
            mx: [
              T
            ]
          }
        ],
        my: [
          {
            my: [
              T
            ]
          }
        ],
        ms: [
          {
            ms: [
              T
            ]
          }
        ],
        me: [
          {
            me: [
              T
            ]
          }
        ],
        mt: [
          {
            mt: [
              T
            ]
          }
        ],
        mr: [
          {
            mr: [
              T
            ]
          }
        ],
        mb: [
          {
            mb: [
              T
            ]
          }
        ],
        ml: [
          {
            ml: [
              T
            ]
          }
        ],
        "space-x": [
          {
            "space-x": [
              U
            ]
          }
        ],
        "space-x-reverse": [
          "space-x-reverse"
        ],
        "space-y": [
          {
            "space-y": [
              U
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
              ue,
              i
            ]
          }
        ],
        "min-w": [
          {
            "min-w": [
              ue,
              i,
              "min",
              "max",
              "fit"
            ]
          }
        ],
        "max-w": [
          {
            "max-w": [
              ue,
              i,
              "none",
              "full",
              "min",
              "max",
              "fit",
              "prose",
              {
                screen: [
                  kr
                ]
              },
              kr
            ]
          }
        ],
        h: [
          {
            h: [
              ue,
              i,
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
              ue,
              i,
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
              ue,
              i,
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
              ue,
              i,
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
              kr,
              Sr
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
              fs
            ]
          }
        ],
        "font-family": [
          {
            font: [
              ko
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
              ue
            ]
          }
        ],
        "line-clamp": [
          {
            "line-clamp": [
              "none",
              Sn,
              fs
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
              Jt,
              ue
            ]
          }
        ],
        "list-image": [
          {
            "list-image": [
              "none",
              ue
            ]
          }
        ],
        "list-style-type": [
          {
            list: [
              "none",
              "disc",
              "decimal",
              ue
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
              j
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
              j
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
              ...ce(),
              "wavy"
            ]
          }
        ],
        "text-decoration-thickness": [
          {
            decoration: [
              "auto",
              "from-font",
              Jt,
              Sr
            ]
          }
        ],
        "underline-offset": [
          {
            "underline-offset": [
              "auto",
              Jt,
              ue
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
            indent: te()
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
              ue
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
              ue
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
              j
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
              ...ke(),
              oy
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
              ny
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
              ly
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
              j
            ]
          }
        ],
        "border-style": [
          {
            border: [
              ...ce(),
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
              j
            ]
          }
        ],
        "divide-style": [
          {
            divide: ce()
          }
        ],
        "border-color": [
          {
            border: [
              c
            ]
          }
        ],
        "border-color-x": [
          {
            "border-x": [
              c
            ]
          }
        ],
        "border-color-y": [
          {
            "border-y": [
              c
            ]
          }
        ],
        "border-color-s": [
          {
            "border-s": [
              c
            ]
          }
        ],
        "border-color-e": [
          {
            "border-e": [
              c
            ]
          }
        ],
        "border-color-t": [
          {
            "border-t": [
              c
            ]
          }
        ],
        "border-color-r": [
          {
            "border-r": [
              c
            ]
          }
        ],
        "border-color-b": [
          {
            "border-b": [
              c
            ]
          }
        ],
        "border-color-l": [
          {
            "border-l": [
              c
            ]
          }
        ],
        "divide-color": [
          {
            divide: [
              c
            ]
          }
        ],
        "outline-style": [
          {
            outline: [
              "",
              ...ce()
            ]
          }
        ],
        "outline-offset": [
          {
            "outline-offset": [
              Jt,
              ue
            ]
          }
        ],
        "outline-w": [
          {
            outline: [
              Jt,
              Sr
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
            ring: me()
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
              j
            ]
          }
        ],
        "ring-offset-w": [
          {
            "ring-offset": [
              Jt,
              Sr
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
              kr,
              ay
            ]
          }
        ],
        "shadow-color": [
          {
            shadow: [
              ko
            ]
          }
        ],
        opacity: [
          {
            opacity: [
              j
            ]
          }
        ],
        "mix-blend": [
          {
            "mix-blend": [
              ...le(),
              "plus-lighter",
              "plus-darker"
            ]
          }
        ],
        "bg-blend": [
          {
            "bg-blend": le()
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
              s
            ]
          }
        ],
        contrast: [
          {
            contrast: [
              v
            ]
          }
        ],
        "drop-shadow": [
          {
            "drop-shadow": [
              "",
              "none",
              kr,
              ue
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
              x
            ]
          }
        ],
        invert: [
          {
            invert: [
              k
            ]
          }
        ],
        saturate: [
          {
            saturate: [
              W
            ]
          }
        ],
        sepia: [
          {
            sepia: [
              _
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
              s
            ]
          }
        ],
        "backdrop-contrast": [
          {
            "backdrop-contrast": [
              v
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
              x
            ]
          }
        ],
        "backdrop-invert": [
          {
            "backdrop-invert": [
              k
            ]
          }
        ],
        "backdrop-opacity": [
          {
            "backdrop-opacity": [
              j
            ]
          }
        ],
        "backdrop-saturate": [
          {
            "backdrop-saturate": [
              W
            ]
          }
        ],
        "backdrop-sepia": [
          {
            "backdrop-sepia": [
              _
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
              ue
            ]
          }
        ],
        duration: [
          {
            duration: N()
          }
        ],
        ease: [
          {
            ease: [
              "linear",
              "in",
              "out",
              "in-out",
              ue
            ]
          }
        ],
        delay: [
          {
            delay: N()
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
              ue
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
              So,
              ue
            ]
          }
        ],
        "translate-x": [
          {
            "translate-x": [
              Z
            ]
          }
        ],
        "translate-y": [
          {
            "translate-y": [
              Z
            ]
          }
        ],
        "skew-x": [
          {
            "skew-x": [
              $
            ]
          }
        ],
        "skew-y": [
          {
            "skew-y": [
              $
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
              ue
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
              ue
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
            "scroll-m": te()
          }
        ],
        "scroll-mx": [
          {
            "scroll-mx": te()
          }
        ],
        "scroll-my": [
          {
            "scroll-my": te()
          }
        ],
        "scroll-ms": [
          {
            "scroll-ms": te()
          }
        ],
        "scroll-me": [
          {
            "scroll-me": te()
          }
        ],
        "scroll-mt": [
          {
            "scroll-mt": te()
          }
        ],
        "scroll-mr": [
          {
            "scroll-mr": te()
          }
        ],
        "scroll-mb": [
          {
            "scroll-mb": te()
          }
        ],
        "scroll-ml": [
          {
            "scroll-ml": te()
          }
        ],
        "scroll-p": [
          {
            "scroll-p": te()
          }
        ],
        "scroll-px": [
          {
            "scroll-px": te()
          }
        ],
        "scroll-py": [
          {
            "scroll-py": te()
          }
        ],
        "scroll-ps": [
          {
            "scroll-ps": te()
          }
        ],
        "scroll-pe": [
          {
            "scroll-pe": te()
          }
        ],
        "scroll-pt": [
          {
            "scroll-pt": te()
          }
        ],
        "scroll-pr": [
          {
            "scroll-pr": te()
          }
        ],
        "scroll-pb": [
          {
            "scroll-pb": te()
          }
        ],
        "scroll-pl": [
          {
            "scroll-pl": te()
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
              ue
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
              Jt,
              Sr,
              fs
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
  }, fy = Kv(dy);
  function Be(...n) {
    return fy(al(n));
  }
  const Ds = Ov("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
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
  }), We = h.forwardRef(({ className: n, variant: i, size: l, asChild: s = false, ...c }, d) => {
    const f = s ? Ro : "button";
    return g.jsx(f, {
      className: Be(Ds({
        variant: i,
        size: l,
        className: n
      })),
      ref: d,
      ...c
    });
  });
  We.displayName = "Button";
  const En = h.forwardRef(({ className: n, type: i, ...l }, s) => g.jsx("input", {
    type: i,
    className: Be("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", n),
    ref: s,
    ...l
  }));
  En.displayName = "Input";
  function py({ onJoin: n, onCreate: i, name: l, onSetName: s }) {
    const [c, d] = h.useState(() => {
      const y = new URL(document.location.toString()).searchParams.get("ticket");
      return (y == null ? void 0 : y.startsWith("chat")) ? y : "";
    }), f = (v) => {
      v.preventDefault(), c.trim() && n(c.trim());
    }, p = (v) => {
      v.preventDefault(), i();
    };
    return g.jsx("div", {
      className: "flex flex-col items-center justify-center flex-grow p-4",
      children: g.jsxs("div", {
        className: "w-full max-w-md space-y-4",
        children: [
          g.jsxs("div", {
            children: [
              g.jsx("h2", {
                className: "text-lg font-semibold mb-2",
                children: "Your name"
              }),
              g.jsx("div", {
                className: "flex space-x-2",
                children: g.jsx(En, {
                  value: l,
                  onChange: (v) => s(v.target.value),
                  placeholder: "Enter your name"
                })
              })
            ]
          }),
          l.length && g.jsxs(g.Fragment, {
            children: [
              g.jsxs("form", {
                onSubmit: f,
                children: [
                  g.jsx("h2", {
                    className: "text-lg font-semibold mb-2",
                    children: "Join Channel"
                  }),
                  g.jsxs("div", {
                    className: "flex space-x-2",
                    children: [
                      g.jsx(En, {
                        value: c,
                        onChange: (v) => d(v.target.value),
                        placeholder: "Enter ticket"
                      }),
                      g.jsx(We, {
                        type: "submit",
                        children: "Join"
                      })
                    ]
                  })
                ]
              }),
              g.jsxs("form", {
                onSubmit: p,
                children: [
                  g.jsx("h2", {
                    className: "text-lg font-semibold mb-2",
                    children: "Create Channel"
                  }),
                  g.jsx("div", {
                    className: "flex space-x-2",
                    children: g.jsx(We, {
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
  function Wi(n) {
    const i = new Date(n);
    if (!Number.isNaN(i.valueOf())) return i;
    const l = String(n).match(/\d+/g);
    if (l == null || l.length <= 2) return i;
    {
      const [s, c, ...d] = l.map((v) => parseInt(v)), f = [
        s,
        c - 1,
        ...d
      ];
      return new Date(Date.UTC(...f));
    }
  }
  function Sf(n, i, l) {
    const s = n !== 1 ? i + "s" : i;
    return n + " " + s + " " + l;
  }
  function Ps() {
    return Ps = Object.assign ? Object.assign.bind() : function(n) {
      for (var i = 1; i < arguments.length; i++) {
        var l = arguments[i];
        for (var s in l) Object.prototype.hasOwnProperty.call(l, s) && (n[s] = l[s]);
      }
      return n;
    }, Ps.apply(this, arguments);
  }
  const Co = 60, Po = Co * 60, kn = Po * 24, Hi = kn * 7, kf = kn * 30, Cf = kn * 365, my = () => Date.now();
  function hy({ date: n, formatter: i = Sf, component: l = "time", live: s = true, minPeriod: c = 0, maxPeriod: d = Hi, title: f, now: p = my, ...v }) {
    const [y, x] = h.useState(p());
    h.useEffect(() => {
      if (!s) return;
      const _ = (() => {
        const $ = Wi(n).valueOf();
        if (!$) return console.warn("[react-timeago] Invalid Date provided"), 0;
        const U = Math.round(Math.abs(y - $) / 1e3), Z = U < Co ? 1e3 : U < Po ? 1e3 * Co : U < kn ? 1e3 * Po : 1e3 * Hi, J = Math.min(Math.max(Z, c * 1e3), d * 1e3);
        return J ? setTimeout(() => {
          x(p());
        }, J) : 0;
      })();
      return () => {
        _ && clearTimeout(_);
      };
    }, [
      n,
      s,
      d,
      c,
      p,
      y
    ]);
    const k = l, S = Wi(n).valueOf();
    if (!S) return null;
    const P = Math.round(Math.abs(y - S) / 1e3), M = S < y ? "ago" : "from now", [b, T] = P < Co ? [
      Math.round(P),
      "second"
    ] : P < Po ? [
      Math.round(P / Co),
      "minute"
    ] : P < kn ? [
      Math.round(P / Po),
      "hour"
    ] : P < Hi ? [
      Math.round(P / kn),
      "day"
    ] : P < kf ? [
      Math.round(P / Hi),
      "week"
    ] : P < Cf ? [
      Math.round(P / kf),
      "month"
    ] : [
      Math.round(P / Cf),
      "year"
    ], j = typeof f > "u" ? typeof n == "string" ? n : Wi(n).toISOString().substr(0, 16).replace("T", " ") : f, I = k === "time" ? {
      ...v,
      dateTime: Wi(n).toISOString()
    } : v, W = Sf.bind(null, b, T, M);
    return h.createElement(k, Ps({}, I, {
      title: j
    }), i(b, T, M, S, W, p));
  }
  var _s = ep();
  const gy = Zf(_s);
  var vy = [
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
  ], je = vy.reduce((n, i) => {
    const l = h.forwardRef((s, c) => {
      const { asChild: d, ...f } = s, p = d ? Ro : i;
      return typeof window < "u" && (window[Symbol.for("radix-ui")] = true), g.jsx(p, {
        ...f,
        ref: c
      });
    });
    return l.displayName = `Primitive.${i}`, {
      ...n,
      [i]: l
    };
  }, {});
  function yy(n, i) {
    n && _s.flushSync(() => n.dispatchEvent(i));
  }
  var br = (globalThis == null ? void 0 : globalThis.document) ? h.useLayoutEffect : () => {
  };
  function wy(n, i) {
    return h.useReducer((l, s) => i[l][s] ?? l, n);
  }
  var At = (n) => {
    const { present: i, children: l } = n, s = xy(i), c = typeof l == "function" ? l({
      present: s.isPresent
    }) : h.Children.only(l), d = ze(s.ref, Sy(c));
    return typeof l == "function" || s.isPresent ? h.cloneElement(c, {
      ref: d
    }) : null;
  };
  At.displayName = "Presence";
  function xy(n) {
    const [i, l] = h.useState(), s = h.useRef({}), c = h.useRef(n), d = h.useRef("none"), f = n ? "mounted" : "unmounted", [p, v] = wy(f, {
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
    return h.useEffect(() => {
      const y = $i(s.current);
      d.current = p === "mounted" ? y : "none";
    }, [
      p
    ]), br(() => {
      const y = s.current, x = c.current;
      if (x !== n) {
        const S = d.current, P = $i(y);
        n ? v("MOUNT") : P === "none" || (y == null ? void 0 : y.display) === "none" ? v("UNMOUNT") : v(x && S !== P ? "ANIMATION_OUT" : "UNMOUNT"), c.current = n;
      }
    }, [
      n,
      v
    ]), br(() => {
      if (i) {
        let y;
        const x = i.ownerDocument.defaultView ?? window, k = (P) => {
          const b = $i(s.current).includes(P.animationName);
          if (P.target === i && b && (v("ANIMATION_END"), !c.current)) {
            const T = i.style.animationFillMode;
            i.style.animationFillMode = "forwards", y = x.setTimeout(() => {
              i.style.animationFillMode === "forwards" && (i.style.animationFillMode = T);
            });
          }
        }, S = (P) => {
          P.target === i && (d.current = $i(s.current));
        };
        return i.addEventListener("animationstart", S), i.addEventListener("animationcancel", k), i.addEventListener("animationend", k), () => {
          x.clearTimeout(y), i.removeEventListener("animationstart", S), i.removeEventListener("animationcancel", k), i.removeEventListener("animationend", k);
        };
      } else v("ANIMATION_END");
    }, [
      i,
      v
    ]), {
      isPresent: [
        "mounted",
        "unmountSuspended"
      ].includes(p),
      ref: h.useCallback((y) => {
        y && (s.current = getComputedStyle(y)), l(y);
      }, [])
    };
  }
  function $i(n) {
    return (n == null ? void 0 : n.animationName) || "none";
  }
  function Sy(n) {
    var _a, _b;
    let i = (_a = Object.getOwnPropertyDescriptor(n.props, "ref")) == null ? void 0 : _a.get, l = i && "isReactWarning" in i && i.isReactWarning;
    return l ? n.ref : (i = (_b = Object.getOwnPropertyDescriptor(n, "ref")) == null ? void 0 : _b.get, l = i && "isReactWarning" in i && i.isReactWarning, l ? n.props.ref : n.props.ref || n.ref);
  }
  function ky(n, i) {
    const l = h.createContext(i), s = (d) => {
      const { children: f, ...p } = d, v = h.useMemo(() => p, Object.values(p));
      return g.jsx(l.Provider, {
        value: v,
        children: f
      });
    };
    s.displayName = n + "Provider";
    function c(d) {
      const f = h.useContext(l);
      if (f) return f;
      if (i !== void 0) return i;
      throw new Error(`\`${d}\` must be used within \`${n}\``);
    }
    return [
      s,
      c
    ];
  }
  function Mn(n, i = []) {
    let l = [];
    function s(d, f) {
      const p = h.createContext(f), v = l.length;
      l = [
        ...l,
        f
      ];
      const y = (k) => {
        var _a;
        const { scope: S, children: P, ...M } = k, b = ((_a = S == null ? void 0 : S[n]) == null ? void 0 : _a[v]) || p, T = h.useMemo(() => M, Object.values(M));
        return g.jsx(b.Provider, {
          value: T,
          children: P
        });
      };
      y.displayName = d + "Provider";
      function x(k, S) {
        var _a;
        const P = ((_a = S == null ? void 0 : S[n]) == null ? void 0 : _a[v]) || p, M = h.useContext(P);
        if (M) return M;
        if (f !== void 0) return f;
        throw new Error(`\`${k}\` must be used within \`${d}\``);
      }
      return [
        y,
        x
      ];
    }
    const c = () => {
      const d = l.map((f) => h.createContext(f));
      return function(p) {
        const v = (p == null ? void 0 : p[n]) || d;
        return h.useMemo(() => ({
          [`__scope${n}`]: {
            ...p,
            [n]: v
          }
        }), [
          p,
          v
        ]);
      };
    };
    return c.scopeName = n, [
      s,
      Cy(c, ...i)
    ];
  }
  function Cy(...n) {
    const i = n[0];
    if (n.length === 1) return i;
    const l = () => {
      const s = n.map((c) => ({
        useScope: c(),
        scopeName: c.scopeName
      }));
      return function(d) {
        const f = s.reduce((p, { useScope: v, scopeName: y }) => {
          const k = v(d)[`__scope${y}`];
          return {
            ...p,
            ...k
          };
        }, {});
        return h.useMemo(() => ({
          [`__scope${i.scopeName}`]: f
        }), [
          f
        ]);
      };
    };
    return l.scopeName = i.scopeName, l;
  }
  function et(n) {
    const i = h.useRef(n);
    return h.useEffect(() => {
      i.current = n;
    }), h.useMemo(() => (...l) => {
      var _a;
      return (_a = i.current) == null ? void 0 : _a.call(i, ...l);
    }, []);
  }
  var Py = h.createContext(void 0);
  function by(n) {
    const i = h.useContext(Py);
    return n || i || "ltr";
  }
  function Ey(n, [i, l]) {
    return Math.min(l, Math.max(i, n));
  }
  function Me(n, i, { checkForDefaultPrevented: l = true } = {}) {
    return function(c) {
      if (n == null ? void 0 : n(c), l === false || !c.defaultPrevented) return i == null ? void 0 : i(c);
    };
  }
  function Ny(n, i) {
    return h.useReducer((l, s) => i[l][s] ?? l, n);
  }
  var Os = "ScrollArea", [up, FS] = Mn(Os), [Ry, wt] = up(Os), cp = h.forwardRef((n, i) => {
    const { __scopeScrollArea: l, type: s = "hover", dir: c, scrollHideDelay: d = 600, ...f } = n, [p, v] = h.useState(null), [y, x] = h.useState(null), [k, S] = h.useState(null), [P, M] = h.useState(null), [b, T] = h.useState(null), [j, I] = h.useState(0), [W, O] = h.useState(0), [_, $] = h.useState(false), [U, Z] = h.useState(false), J = ze(i, (ae) => v(ae)), oe = by(c);
    return g.jsx(Ry, {
      scope: l,
      type: s,
      dir: oe,
      scrollHideDelay: d,
      scrollArea: p,
      viewport: y,
      onViewportChange: x,
      content: k,
      onContentChange: S,
      scrollbarX: P,
      onScrollbarXChange: M,
      scrollbarXEnabled: _,
      onScrollbarXEnabledChange: $,
      scrollbarY: b,
      onScrollbarYChange: T,
      scrollbarYEnabled: U,
      onScrollbarYEnabledChange: Z,
      onCornerWidthChange: I,
      onCornerHeightChange: O,
      children: g.jsx(je.div, {
        dir: oe,
        ...f,
        ref: J,
        style: {
          position: "relative",
          "--radix-scroll-area-corner-width": j + "px",
          "--radix-scroll-area-corner-height": W + "px",
          ...n.style
        }
      })
    });
  });
  cp.displayName = Os;
  var dp = "ScrollAreaViewport", fp = h.forwardRef((n, i) => {
    const { __scopeScrollArea: l, children: s, nonce: c, ...d } = n, f = wt(dp, l), p = h.useRef(null), v = ze(i, p, f.onViewportChange);
    return g.jsxs(g.Fragment, {
      children: [
        g.jsx("style", {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: c
        }),
        g.jsx(je.div, {
          "data-radix-scroll-area-viewport": "",
          ...d,
          ref: v,
          style: {
            overflowX: f.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: f.scrollbarYEnabled ? "scroll" : "hidden",
            ...n.style
          },
          children: g.jsx("div", {
            ref: f.onContentChange,
            style: {
              minWidth: "100%",
              display: "table"
            },
            children: s
          })
        })
      ]
    });
  });
  fp.displayName = dp;
  var Wt = "ScrollAreaScrollbar", js = h.forwardRef((n, i) => {
    const { forceMount: l, ...s } = n, c = wt(Wt, n.__scopeScrollArea), { onScrollbarXEnabledChange: d, onScrollbarYEnabledChange: f } = c, p = n.orientation === "horizontal";
    return h.useEffect(() => (p ? d(true) : f(true), () => {
      p ? d(false) : f(false);
    }), [
      p,
      d,
      f
    ]), c.type === "hover" ? g.jsx(Ty, {
      ...s,
      ref: i,
      forceMount: l
    }) : c.type === "scroll" ? g.jsx(Ay, {
      ...s,
      ref: i,
      forceMount: l
    }) : c.type === "auto" ? g.jsx(pp, {
      ...s,
      ref: i,
      forceMount: l
    }) : c.type === "always" ? g.jsx(Ls, {
      ...s,
      ref: i
    }) : null;
  });
  js.displayName = Wt;
  var Ty = h.forwardRef((n, i) => {
    const { forceMount: l, ...s } = n, c = wt(Wt, n.__scopeScrollArea), [d, f] = h.useState(false);
    return h.useEffect(() => {
      const p = c.scrollArea;
      let v = 0;
      if (p) {
        const y = () => {
          window.clearTimeout(v), f(true);
        }, x = () => {
          v = window.setTimeout(() => f(false), c.scrollHideDelay);
        };
        return p.addEventListener("pointerenter", y), p.addEventListener("pointerleave", x), () => {
          window.clearTimeout(v), p.removeEventListener("pointerenter", y), p.removeEventListener("pointerleave", x);
        };
      }
    }, [
      c.scrollArea,
      c.scrollHideDelay
    ]), g.jsx(At, {
      present: l || d,
      children: g.jsx(pp, {
        "data-state": d ? "visible" : "hidden",
        ...s,
        ref: i
      })
    });
  }), Ay = h.forwardRef((n, i) => {
    const { forceMount: l, ...s } = n, c = wt(Wt, n.__scopeScrollArea), d = n.orientation === "horizontal", f = ul(() => v("SCROLL_END"), 100), [p, v] = Ny("hidden", {
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
    return h.useEffect(() => {
      if (p === "idle") {
        const y = window.setTimeout(() => v("HIDE"), c.scrollHideDelay);
        return () => window.clearTimeout(y);
      }
    }, [
      p,
      c.scrollHideDelay,
      v
    ]), h.useEffect(() => {
      const y = c.viewport, x = d ? "scrollLeft" : "scrollTop";
      if (y) {
        let k = y[x];
        const S = () => {
          const P = y[x];
          k !== P && (v("SCROLL"), f()), k = P;
        };
        return y.addEventListener("scroll", S), () => y.removeEventListener("scroll", S);
      }
    }, [
      c.viewport,
      d,
      v,
      f
    ]), g.jsx(At, {
      present: l || p !== "hidden",
      children: g.jsx(Ls, {
        "data-state": p === "hidden" ? "hidden" : "visible",
        ...s,
        ref: i,
        onPointerEnter: Me(n.onPointerEnter, () => v("POINTER_ENTER")),
        onPointerLeave: Me(n.onPointerLeave, () => v("POINTER_LEAVE"))
      })
    });
  }), pp = h.forwardRef((n, i) => {
    const l = wt(Wt, n.__scopeScrollArea), { forceMount: s, ...c } = n, [d, f] = h.useState(false), p = n.orientation === "horizontal", v = ul(() => {
      if (l.viewport) {
        const y = l.viewport.offsetWidth < l.viewport.scrollWidth, x = l.viewport.offsetHeight < l.viewport.scrollHeight;
        f(p ? y : x);
      }
    }, 10);
    return Nn(l.viewport, v), Nn(l.content, v), g.jsx(At, {
      present: s || d,
      children: g.jsx(Ls, {
        "data-state": d ? "visible" : "hidden",
        ...c,
        ref: i
      })
    });
  }), Ls = h.forwardRef((n, i) => {
    const { orientation: l = "vertical", ...s } = n, c = wt(Wt, n.__scopeScrollArea), d = h.useRef(null), f = h.useRef(0), [p, v] = h.useState({
      content: 0,
      viewport: 0,
      scrollbar: {
        size: 0,
        paddingStart: 0,
        paddingEnd: 0
      }
    }), y = yp(p.viewport, p.content), x = {
      ...s,
      sizes: p,
      onSizesChange: v,
      hasThumb: y > 0 && y < 1,
      onThumbChange: (S) => d.current = S,
      onThumbPointerUp: () => f.current = 0,
      onThumbPointerDown: (S) => f.current = S
    };
    function k(S, P) {
      return Ly(S, f.current, p, P);
    }
    return l === "horizontal" ? g.jsx(My, {
      ...x,
      ref: i,
      onThumbPositionChange: () => {
        if (c.viewport && d.current) {
          const S = c.viewport.scrollLeft, P = Pf(S, p, c.dir);
          d.current.style.transform = `translate3d(${P}px, 0, 0)`;
        }
      },
      onWheelScroll: (S) => {
        c.viewport && (c.viewport.scrollLeft = S);
      },
      onDragScroll: (S) => {
        c.viewport && (c.viewport.scrollLeft = k(S, c.dir));
      }
    }) : l === "vertical" ? g.jsx(Dy, {
      ...x,
      ref: i,
      onThumbPositionChange: () => {
        if (c.viewport && d.current) {
          const S = c.viewport.scrollTop, P = Pf(S, p);
          d.current.style.transform = `translate3d(0, ${P}px, 0)`;
        }
      },
      onWheelScroll: (S) => {
        c.viewport && (c.viewport.scrollTop = S);
      },
      onDragScroll: (S) => {
        c.viewport && (c.viewport.scrollTop = k(S));
      }
    }) : null;
  }), My = h.forwardRef((n, i) => {
    const { sizes: l, onSizesChange: s, ...c } = n, d = wt(Wt, n.__scopeScrollArea), [f, p] = h.useState(), v = h.useRef(null), y = ze(i, v, d.onScrollbarXChange);
    return h.useEffect(() => {
      v.current && p(getComputedStyle(v.current));
    }, [
      v
    ]), g.jsx(hp, {
      "data-orientation": "horizontal",
      ...c,
      ref: y,
      sizes: l,
      style: {
        bottom: 0,
        left: d.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: d.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": sl(l) + "px",
        ...n.style
      },
      onThumbPointerDown: (x) => n.onThumbPointerDown(x.x),
      onDragScroll: (x) => n.onDragScroll(x.x),
      onWheelScroll: (x, k) => {
        if (d.viewport) {
          const S = d.viewport.scrollLeft + x.deltaX;
          n.onWheelScroll(S), xp(S, k) && x.preventDefault();
        }
      },
      onResize: () => {
        v.current && d.viewport && f && s({
          content: d.viewport.scrollWidth,
          viewport: d.viewport.offsetWidth,
          scrollbar: {
            size: v.current.clientWidth,
            paddingStart: tl(f.paddingLeft),
            paddingEnd: tl(f.paddingRight)
          }
        });
      }
    });
  }), Dy = h.forwardRef((n, i) => {
    const { sizes: l, onSizesChange: s, ...c } = n, d = wt(Wt, n.__scopeScrollArea), [f, p] = h.useState(), v = h.useRef(null), y = ze(i, v, d.onScrollbarYChange);
    return h.useEffect(() => {
      v.current && p(getComputedStyle(v.current));
    }, [
      v
    ]), g.jsx(hp, {
      "data-orientation": "vertical",
      ...c,
      ref: y,
      sizes: l,
      style: {
        top: 0,
        right: d.dir === "ltr" ? 0 : void 0,
        left: d.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": sl(l) + "px",
        ...n.style
      },
      onThumbPointerDown: (x) => n.onThumbPointerDown(x.y),
      onDragScroll: (x) => n.onDragScroll(x.y),
      onWheelScroll: (x, k) => {
        if (d.viewport) {
          const S = d.viewport.scrollTop + x.deltaY;
          n.onWheelScroll(S), xp(S, k) && x.preventDefault();
        }
      },
      onResize: () => {
        v.current && d.viewport && f && s({
          content: d.viewport.scrollHeight,
          viewport: d.viewport.offsetHeight,
          scrollbar: {
            size: v.current.clientHeight,
            paddingStart: tl(f.paddingTop),
            paddingEnd: tl(f.paddingBottom)
          }
        });
      }
    });
  }), [_y, mp] = up(Wt), hp = h.forwardRef((n, i) => {
    const { __scopeScrollArea: l, sizes: s, hasThumb: c, onThumbChange: d, onThumbPointerUp: f, onThumbPointerDown: p, onThumbPositionChange: v, onDragScroll: y, onWheelScroll: x, onResize: k, ...S } = n, P = wt(Wt, l), [M, b] = h.useState(null), T = ze(i, (J) => b(J)), j = h.useRef(null), I = h.useRef(""), W = P.viewport, O = s.content - s.viewport, _ = et(x), $ = et(v), U = ul(k, 10);
    function Z(J) {
      if (j.current) {
        const oe = J.clientX - j.current.left, ae = J.clientY - j.current.top;
        y({
          x: oe,
          y: ae
        });
      }
    }
    return h.useEffect(() => {
      const J = (oe) => {
        const ae = oe.target;
        (M == null ? void 0 : M.contains(ae)) && _(oe, O);
      };
      return document.addEventListener("wheel", J, {
        passive: false
      }), () => document.removeEventListener("wheel", J, {
        passive: false
      });
    }, [
      W,
      M,
      O,
      _
    ]), h.useEffect($, [
      s,
      $
    ]), Nn(M, U), Nn(P.content, U), g.jsx(_y, {
      scope: l,
      scrollbar: M,
      hasThumb: c,
      onThumbChange: et(d),
      onThumbPointerUp: et(f),
      onThumbPositionChange: $,
      onThumbPointerDown: et(p),
      children: g.jsx(je.div, {
        ...S,
        ref: T,
        style: {
          position: "absolute",
          ...S.style
        },
        onPointerDown: Me(n.onPointerDown, (J) => {
          J.button === 0 && (J.target.setPointerCapture(J.pointerId), j.current = M.getBoundingClientRect(), I.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", P.viewport && (P.viewport.style.scrollBehavior = "auto"), Z(J));
        }),
        onPointerMove: Me(n.onPointerMove, Z),
        onPointerUp: Me(n.onPointerUp, (J) => {
          const oe = J.target;
          oe.hasPointerCapture(J.pointerId) && oe.releasePointerCapture(J.pointerId), document.body.style.webkitUserSelect = I.current, P.viewport && (P.viewport.style.scrollBehavior = ""), j.current = null;
        })
      })
    });
  }), el = "ScrollAreaThumb", gp = h.forwardRef((n, i) => {
    const { forceMount: l, ...s } = n, c = mp(el, n.__scopeScrollArea);
    return g.jsx(At, {
      present: l || c.hasThumb,
      children: g.jsx(Oy, {
        ref: i,
        ...s
      })
    });
  }), Oy = h.forwardRef((n, i) => {
    const { __scopeScrollArea: l, style: s, ...c } = n, d = wt(el, l), f = mp(el, l), { onThumbPositionChange: p } = f, v = ze(i, (k) => f.onThumbChange(k)), y = h.useRef(void 0), x = ul(() => {
      y.current && (y.current(), y.current = void 0);
    }, 100);
    return h.useEffect(() => {
      const k = d.viewport;
      if (k) {
        const S = () => {
          if (x(), !y.current) {
            const P = By(k, p);
            y.current = P, p();
          }
        };
        return p(), k.addEventListener("scroll", S), () => k.removeEventListener("scroll", S);
      }
    }, [
      d.viewport,
      x,
      p
    ]), g.jsx(je.div, {
      "data-state": f.hasThumb ? "visible" : "hidden",
      ...c,
      ref: v,
      style: {
        width: "var(--radix-scroll-area-thumb-width)",
        height: "var(--radix-scroll-area-thumb-height)",
        ...s
      },
      onPointerDownCapture: Me(n.onPointerDownCapture, (k) => {
        const P = k.target.getBoundingClientRect(), M = k.clientX - P.left, b = k.clientY - P.top;
        f.onThumbPointerDown({
          x: M,
          y: b
        });
      }),
      onPointerUp: Me(n.onPointerUp, f.onThumbPointerUp)
    });
  });
  gp.displayName = el;
  var Bs = "ScrollAreaCorner", vp = h.forwardRef((n, i) => {
    const l = wt(Bs, n.__scopeScrollArea), s = !!(l.scrollbarX && l.scrollbarY);
    return l.type !== "scroll" && s ? g.jsx(jy, {
      ...n,
      ref: i
    }) : null;
  });
  vp.displayName = Bs;
  var jy = h.forwardRef((n, i) => {
    const { __scopeScrollArea: l, ...s } = n, c = wt(Bs, l), [d, f] = h.useState(0), [p, v] = h.useState(0), y = !!(d && p);
    return Nn(c.scrollbarX, () => {
      var _a;
      const x = ((_a = c.scrollbarX) == null ? void 0 : _a.offsetHeight) || 0;
      c.onCornerHeightChange(x), v(x);
    }), Nn(c.scrollbarY, () => {
      var _a;
      const x = ((_a = c.scrollbarY) == null ? void 0 : _a.offsetWidth) || 0;
      c.onCornerWidthChange(x), f(x);
    }), y ? g.jsx(je.div, {
      ...s,
      ref: i,
      style: {
        width: d,
        height: p,
        position: "absolute",
        right: c.dir === "ltr" ? 0 : void 0,
        left: c.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...n.style
      }
    }) : null;
  });
  function tl(n) {
    return n ? parseInt(n, 10) : 0;
  }
  function yp(n, i) {
    const l = n / i;
    return isNaN(l) ? 0 : l;
  }
  function sl(n) {
    const i = yp(n.viewport, n.content), l = n.scrollbar.paddingStart + n.scrollbar.paddingEnd, s = (n.scrollbar.size - l) * i;
    return Math.max(s, 18);
  }
  function Ly(n, i, l, s = "ltr") {
    const c = sl(l), d = c / 2, f = i || d, p = c - f, v = l.scrollbar.paddingStart + f, y = l.scrollbar.size - l.scrollbar.paddingEnd - p, x = l.content - l.viewport, k = s === "ltr" ? [
      0,
      x
    ] : [
      x * -1,
      0
    ];
    return wp([
      v,
      y
    ], k)(n);
  }
  function Pf(n, i, l = "ltr") {
    const s = sl(i), c = i.scrollbar.paddingStart + i.scrollbar.paddingEnd, d = i.scrollbar.size - c, f = i.content - i.viewport, p = d - s, v = l === "ltr" ? [
      0,
      f
    ] : [
      f * -1,
      0
    ], y = Ey(n, v);
    return wp([
      0,
      f
    ], [
      0,
      p
    ])(y);
  }
  function wp(n, i) {
    return (l) => {
      if (n[0] === n[1] || i[0] === i[1]) return i[0];
      const s = (i[1] - i[0]) / (n[1] - n[0]);
      return i[0] + s * (l - n[0]);
    };
  }
  function xp(n, i) {
    return n > 0 && n < i;
  }
  var By = (n, i = () => {
  }) => {
    let l = {
      left: n.scrollLeft,
      top: n.scrollTop
    }, s = 0;
    return function c() {
      const d = {
        left: n.scrollLeft,
        top: n.scrollTop
      }, f = l.left !== d.left, p = l.top !== d.top;
      (f || p) && i(), l = d, s = window.requestAnimationFrame(c);
    }(), () => window.cancelAnimationFrame(s);
  };
  function ul(n, i) {
    const l = et(n), s = h.useRef(0);
    return h.useEffect(() => () => window.clearTimeout(s.current), []), h.useCallback(() => {
      window.clearTimeout(s.current), s.current = window.setTimeout(l, i);
    }, [
      l,
      i
    ]);
  }
  function Nn(n, i) {
    const l = et(i);
    br(() => {
      let s = 0;
      if (n) {
        const c = new ResizeObserver(() => {
          cancelAnimationFrame(s), s = window.requestAnimationFrame(l);
        });
        return c.observe(n), () => {
          window.cancelAnimationFrame(s), c.unobserve(n);
        };
      }
    }, [
      n,
      l
    ]);
  }
  var Sp = cp, zy = fp, Fy = vp;
  const bo = h.forwardRef(({ className: n, children: i, ...l }, s) => g.jsxs(Sp, {
    ref: s,
    className: Be("relative overflow-hidden", n),
    ...l,
    children: [
      g.jsx(zy, {
        className: "h-full w-full rounded-[inherit]",
        children: i
      }),
      g.jsx(kp, {}),
      g.jsx(Fy, {})
    ]
  }));
  bo.displayName = Sp.displayName;
  const kp = h.forwardRef(({ className: n, orientation: i = "vertical", ...l }, s) => g.jsx(js, {
    ref: s,
    orientation: i,
    className: Be("flex touch-none select-none transition-colors", i === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", i === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", n),
    ...l,
    children: g.jsx(gp, {
      className: "relative flex-1 rounded-full bg-border"
    })
  }));
  kp.displayName = js.displayName;
  function Iy(n, i = globalThis == null ? void 0 : globalThis.document) {
    const l = et(n);
    h.useEffect(() => {
      const s = (c) => {
        c.key === "Escape" && l(c);
      };
      return i.addEventListener("keydown", s, {
        capture: true
      }), () => i.removeEventListener("keydown", s, {
        capture: true
      });
    }, [
      l,
      i
    ]);
  }
  var Wy = "DismissableLayer", bs = "dismissableLayer.update", Hy = "dismissableLayer.pointerDownOutside", $y = "dismissableLayer.focusOutside", bf, Cp = h.createContext({
    layers: /* @__PURE__ */ new Set(),
    layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
    branches: /* @__PURE__ */ new Set()
  }), zs = h.forwardRef((n, i) => {
    const { disableOutsidePointerEvents: l = false, onEscapeKeyDown: s, onPointerDownOutside: c, onFocusOutside: d, onInteractOutside: f, onDismiss: p, ...v } = n, y = h.useContext(Cp), [x, k] = h.useState(null), S = (x == null ? void 0 : x.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, P] = h.useState({}), M = ze(i, (U) => k(U)), b = Array.from(y.layers), [T] = [
      ...y.layersWithOutsidePointerEventsDisabled
    ].slice(-1), j = b.indexOf(T), I = x ? b.indexOf(x) : -1, W = y.layersWithOutsidePointerEventsDisabled.size > 0, O = I >= j, _ = Gy((U) => {
      const Z = U.target, J = [
        ...y.branches
      ].some((oe) => oe.contains(Z));
      !O || J || (c == null ? void 0 : c(U), f == null ? void 0 : f(U), U.defaultPrevented || (p == null ? void 0 : p()));
    }, S), $ = Ky((U) => {
      const Z = U.target;
      [
        ...y.branches
      ].some((oe) => oe.contains(Z)) || (d == null ? void 0 : d(U), f == null ? void 0 : f(U), U.defaultPrevented || (p == null ? void 0 : p()));
    }, S);
    return Iy((U) => {
      I === y.layers.size - 1 && (s == null ? void 0 : s(U), !U.defaultPrevented && p && (U.preventDefault(), p()));
    }, S), h.useEffect(() => {
      if (x) return l && (y.layersWithOutsidePointerEventsDisabled.size === 0 && (bf = S.body.style.pointerEvents, S.body.style.pointerEvents = "none"), y.layersWithOutsidePointerEventsDisabled.add(x)), y.layers.add(x), Ef(), () => {
        l && y.layersWithOutsidePointerEventsDisabled.size === 1 && (S.body.style.pointerEvents = bf);
      };
    }, [
      x,
      S,
      l,
      y
    ]), h.useEffect(() => () => {
      x && (y.layers.delete(x), y.layersWithOutsidePointerEventsDisabled.delete(x), Ef());
    }, [
      x,
      y
    ]), h.useEffect(() => {
      const U = () => P({});
      return document.addEventListener(bs, U), () => document.removeEventListener(bs, U);
    }, []), g.jsx(je.div, {
      ...v,
      ref: M,
      style: {
        pointerEvents: W ? O ? "auto" : "none" : void 0,
        ...n.style
      },
      onFocusCapture: Me(n.onFocusCapture, $.onFocusCapture),
      onBlurCapture: Me(n.onBlurCapture, $.onBlurCapture),
      onPointerDownCapture: Me(n.onPointerDownCapture, _.onPointerDownCapture)
    });
  });
  zs.displayName = Wy;
  var Uy = "DismissableLayerBranch", Vy = h.forwardRef((n, i) => {
    const l = h.useContext(Cp), s = h.useRef(null), c = ze(i, s);
    return h.useEffect(() => {
      const d = s.current;
      if (d) return l.branches.add(d), () => {
        l.branches.delete(d);
      };
    }, [
      l.branches
    ]), g.jsx(je.div, {
      ...n,
      ref: c
    });
  });
  Vy.displayName = Uy;
  function Gy(n, i = globalThis == null ? void 0 : globalThis.document) {
    const l = et(n), s = h.useRef(false), c = h.useRef(() => {
    });
    return h.useEffect(() => {
      const d = (p) => {
        if (p.target && !s.current) {
          let v = function() {
            Pp(Hy, l, y, {
              discrete: true
            });
          };
          const y = {
            originalEvent: p
          };
          p.pointerType === "touch" ? (i.removeEventListener("click", c.current), c.current = v, i.addEventListener("click", c.current, {
            once: true
          })) : v();
        } else i.removeEventListener("click", c.current);
        s.current = false;
      }, f = window.setTimeout(() => {
        i.addEventListener("pointerdown", d);
      }, 0);
      return () => {
        window.clearTimeout(f), i.removeEventListener("pointerdown", d), i.removeEventListener("click", c.current);
      };
    }, [
      i,
      l
    ]), {
      onPointerDownCapture: () => s.current = true
    };
  }
  function Ky(n, i = globalThis == null ? void 0 : globalThis.document) {
    const l = et(n), s = h.useRef(false);
    return h.useEffect(() => {
      const c = (d) => {
        d.target && !s.current && Pp($y, l, {
          originalEvent: d
        }, {
          discrete: false
        });
      };
      return i.addEventListener("focusin", c), () => i.removeEventListener("focusin", c);
    }, [
      i,
      l
    ]), {
      onFocusCapture: () => s.current = true,
      onBlurCapture: () => s.current = false
    };
  }
  function Ef() {
    const n = new CustomEvent(bs);
    document.dispatchEvent(n);
  }
  function Pp(n, i, l, { discrete: s }) {
    const c = l.originalEvent.target, d = new CustomEvent(n, {
      bubbles: false,
      cancelable: true,
      detail: l
    });
    i && c.addEventListener(n, i, {
      once: true
    }), s ? yy(c, d) : c.dispatchEvent(d);
  }
  var ps = 0;
  function bp() {
    h.useEffect(() => {
      const n = document.querySelectorAll("[data-radix-focus-guard]");
      return document.body.insertAdjacentElement("afterbegin", n[0] ?? Nf()), document.body.insertAdjacentElement("beforeend", n[1] ?? Nf()), ps++, () => {
        ps === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((i) => i.remove()), ps--;
      };
    }, []);
  }
  function Nf() {
    const n = document.createElement("span");
    return n.setAttribute("data-radix-focus-guard", ""), n.tabIndex = 0, n.style.outline = "none", n.style.opacity = "0", n.style.position = "fixed", n.style.pointerEvents = "none", n;
  }
  var ms = "focusScope.autoFocusOnMount", hs = "focusScope.autoFocusOnUnmount", Rf = {
    bubbles: false,
    cancelable: true
  }, Qy = "FocusScope", Fs = h.forwardRef((n, i) => {
    const { loop: l = false, trapped: s = false, onMountAutoFocus: c, onUnmountAutoFocus: d, ...f } = n, [p, v] = h.useState(null), y = et(c), x = et(d), k = h.useRef(null), S = ze(i, (b) => v(b)), P = h.useRef({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    }).current;
    h.useEffect(() => {
      if (s) {
        let b = function(W) {
          if (P.paused || !p) return;
          const O = W.target;
          p.contains(O) ? k.current = O : Cr(k.current, {
            select: true
          });
        }, T = function(W) {
          if (P.paused || !p) return;
          const O = W.relatedTarget;
          O !== null && (p.contains(O) || Cr(k.current, {
            select: true
          }));
        }, j = function(W) {
          if (document.activeElement === document.body) for (const _ of W) _.removedNodes.length > 0 && Cr(p);
        };
        document.addEventListener("focusin", b), document.addEventListener("focusout", T);
        const I = new MutationObserver(j);
        return p && I.observe(p, {
          childList: true,
          subtree: true
        }), () => {
          document.removeEventListener("focusin", b), document.removeEventListener("focusout", T), I.disconnect();
        };
      }
    }, [
      s,
      p,
      P.paused
    ]), h.useEffect(() => {
      if (p) {
        Af.add(P);
        const b = document.activeElement;
        if (!p.contains(b)) {
          const j = new CustomEvent(ms, Rf);
          p.addEventListener(ms, y), p.dispatchEvent(j), j.defaultPrevented || (Yy(ew(Ep(p)), {
            select: true
          }), document.activeElement === b && Cr(p));
        }
        return () => {
          p.removeEventListener(ms, y), setTimeout(() => {
            const j = new CustomEvent(hs, Rf);
            p.addEventListener(hs, x), p.dispatchEvent(j), j.defaultPrevented || Cr(b ?? document.body, {
              select: true
            }), p.removeEventListener(hs, x), Af.remove(P);
          }, 0);
        };
      }
    }, [
      p,
      y,
      x,
      P
    ]);
    const M = h.useCallback((b) => {
      if (!l && !s || P.paused) return;
      const T = b.key === "Tab" && !b.altKey && !b.ctrlKey && !b.metaKey, j = document.activeElement;
      if (T && j) {
        const I = b.currentTarget, [W, O] = Xy(I);
        W && O ? !b.shiftKey && j === O ? (b.preventDefault(), l && Cr(W, {
          select: true
        })) : b.shiftKey && j === W && (b.preventDefault(), l && Cr(O, {
          select: true
        })) : j === I && b.preventDefault();
      }
    }, [
      l,
      s,
      P.paused
    ]);
    return g.jsx(je.div, {
      tabIndex: -1,
      ...f,
      ref: S,
      onKeyDown: M
    });
  });
  Fs.displayName = Qy;
  function Yy(n, { select: i = false } = {}) {
    const l = document.activeElement;
    for (const s of n) if (Cr(s, {
      select: i
    }), document.activeElement !== l) return;
  }
  function Xy(n) {
    const i = Ep(n), l = Tf(i, n), s = Tf(i.reverse(), n);
    return [
      l,
      s
    ];
  }
  function Ep(n) {
    const i = [], l = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (s) => {
        const c = s.tagName === "INPUT" && s.type === "hidden";
        return s.disabled || s.hidden || c ? NodeFilter.FILTER_SKIP : s.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    for (; l.nextNode(); ) i.push(l.currentNode);
    return i;
  }
  function Tf(n, i) {
    for (const l of n) if (!qy(l, {
      upTo: i
    })) return l;
  }
  function qy(n, { upTo: i }) {
    if (getComputedStyle(n).visibility === "hidden") return true;
    for (; n; ) {
      if (i !== void 0 && n === i) return false;
      if (getComputedStyle(n).display === "none") return true;
      n = n.parentElement;
    }
    return false;
  }
  function Jy(n) {
    return n instanceof HTMLInputElement && "select" in n;
  }
  function Cr(n, { select: i = false } = {}) {
    if (n && n.focus) {
      const l = document.activeElement;
      n.focus({
        preventScroll: true
      }), n !== l && Jy(n) && i && n.select();
    }
  }
  var Af = Zy();
  function Zy() {
    let n = [];
    return {
      add(i) {
        const l = n[0];
        i !== l && (l == null ? void 0 : l.pause()), n = Mf(n, i), n.unshift(i);
      },
      remove(i) {
        var _a;
        n = Mf(n, i), (_a = n[0]) == null ? void 0 : _a.resume();
      }
    };
  }
  function Mf(n, i) {
    const l = [
      ...n
    ], s = l.indexOf(i);
    return s !== -1 && l.splice(s, 1), l;
  }
  function ew(n) {
    return n.filter((i) => i.tagName !== "A");
  }
  var tw = bv.useId || (() => {
  }), rw = 0;
  function Yi(n) {
    const [i, l] = h.useState(tw());
    return br(() => {
      l((s) => s ?? String(rw++));
    }, [
      n
    ]), n || (i ? `radix-${i}` : "");
  }
  const nw = [
    "top",
    "right",
    "bottom",
    "left"
  ], Er = Math.min, dt = Math.max, rl = Math.round, Ui = Math.floor, zt = (n) => ({
    x: n,
    y: n
  }), ow = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  }, iw = {
    start: "end",
    end: "start"
  };
  function Es(n, i, l) {
    return dt(n, Er(i, l));
  }
  function Zt(n, i) {
    return typeof n == "function" ? n(i) : n;
  }
  function er(n) {
    return n.split("-")[0];
  }
  function Dn(n) {
    return n.split("-")[1];
  }
  function Is(n) {
    return n === "x" ? "y" : "x";
  }
  function Ws(n) {
    return n === "y" ? "height" : "width";
  }
  function Nr(n) {
    return [
      "top",
      "bottom"
    ].includes(er(n)) ? "y" : "x";
  }
  function Hs(n) {
    return Is(Nr(n));
  }
  function lw(n, i, l) {
    l === void 0 && (l = false);
    const s = Dn(n), c = Hs(n), d = Ws(c);
    let f = c === "x" ? s === (l ? "end" : "start") ? "right" : "left" : s === "start" ? "bottom" : "top";
    return i.reference[d] > i.floating[d] && (f = nl(f)), [
      f,
      nl(f)
    ];
  }
  function aw(n) {
    const i = nl(n);
    return [
      Ns(n),
      i,
      Ns(i)
    ];
  }
  function Ns(n) {
    return n.replace(/start|end/g, (i) => iw[i]);
  }
  function sw(n, i, l) {
    const s = [
      "left",
      "right"
    ], c = [
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
        return l ? i ? c : s : i ? s : c;
      case "left":
      case "right":
        return i ? d : f;
      default:
        return [];
    }
  }
  function uw(n, i, l, s) {
    const c = Dn(n);
    let d = sw(er(n), l === "start", s);
    return c && (d = d.map((f) => f + "-" + c), i && (d = d.concat(d.map(Ns)))), d;
  }
  function nl(n) {
    return n.replace(/left|right|bottom|top/g, (i) => ow[i]);
  }
  function cw(n) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...n
    };
  }
  function Np(n) {
    return typeof n != "number" ? cw(n) : {
      top: n,
      right: n,
      bottom: n,
      left: n
    };
  }
  function ol(n) {
    const { x: i, y: l, width: s, height: c } = n;
    return {
      width: s,
      height: c,
      top: l,
      left: i,
      right: i + s,
      bottom: l + c,
      x: i,
      y: l
    };
  }
  function Df(n, i, l) {
    let { reference: s, floating: c } = n;
    const d = Nr(i), f = Hs(i), p = Ws(f), v = er(i), y = d === "y", x = s.x + s.width / 2 - c.width / 2, k = s.y + s.height / 2 - c.height / 2, S = s[p] / 2 - c[p] / 2;
    let P;
    switch (v) {
      case "top":
        P = {
          x,
          y: s.y - c.height
        };
        break;
      case "bottom":
        P = {
          x,
          y: s.y + s.height
        };
        break;
      case "right":
        P = {
          x: s.x + s.width,
          y: k
        };
        break;
      case "left":
        P = {
          x: s.x - c.width,
          y: k
        };
        break;
      default:
        P = {
          x: s.x,
          y: s.y
        };
    }
    switch (Dn(i)) {
      case "start":
        P[f] -= S * (l && y ? -1 : 1);
        break;
      case "end":
        P[f] += S * (l && y ? -1 : 1);
        break;
    }
    return P;
  }
  const dw = async (n, i, l) => {
    const { placement: s = "bottom", strategy: c = "absolute", middleware: d = [], platform: f } = l, p = d.filter(Boolean), v = await (f.isRTL == null ? void 0 : f.isRTL(i));
    let y = await f.getElementRects({
      reference: n,
      floating: i,
      strategy: c
    }), { x, y: k } = Df(y, s, v), S = s, P = {}, M = 0;
    for (let b = 0; b < p.length; b++) {
      const { name: T, fn: j } = p[b], { x: I, y: W, data: O, reset: _ } = await j({
        x,
        y: k,
        initialPlacement: s,
        placement: S,
        strategy: c,
        middlewareData: P,
        rects: y,
        platform: f,
        elements: {
          reference: n,
          floating: i
        }
      });
      x = I ?? x, k = W ?? k, P = {
        ...P,
        [T]: {
          ...P[T],
          ...O
        }
      }, _ && M <= 50 && (M++, typeof _ == "object" && (_.placement && (S = _.placement), _.rects && (y = _.rects === true ? await f.getElementRects({
        reference: n,
        floating: i,
        strategy: c
      }) : _.rects), { x, y: k } = Df(y, S, v)), b = -1);
    }
    return {
      x,
      y: k,
      placement: S,
      strategy: c,
      middlewareData: P
    };
  };
  async function Eo(n, i) {
    var l;
    i === void 0 && (i = {});
    const { x: s, y: c, platform: d, rects: f, elements: p, strategy: v } = n, { boundary: y = "clippingAncestors", rootBoundary: x = "viewport", elementContext: k = "floating", altBoundary: S = false, padding: P = 0 } = Zt(i, n), M = Np(P), T = p[S ? k === "floating" ? "reference" : "floating" : k], j = ol(await d.getClippingRect({
      element: (l = await (d.isElement == null ? void 0 : d.isElement(T))) == null || l ? T : T.contextElement || await (d.getDocumentElement == null ? void 0 : d.getDocumentElement(p.floating)),
      boundary: y,
      rootBoundary: x,
      strategy: v
    })), I = k === "floating" ? {
      x: s,
      y: c,
      width: f.floating.width,
      height: f.floating.height
    } : f.reference, W = await (d.getOffsetParent == null ? void 0 : d.getOffsetParent(p.floating)), O = await (d.isElement == null ? void 0 : d.isElement(W)) ? await (d.getScale == null ? void 0 : d.getScale(W)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    }, _ = ol(d.convertOffsetParentRelativeRectToViewportRelativeRect ? await d.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements: p,
      rect: I,
      offsetParent: W,
      strategy: v
    }) : I);
    return {
      top: (j.top - _.top + M.top) / O.y,
      bottom: (_.bottom - j.bottom + M.bottom) / O.y,
      left: (j.left - _.left + M.left) / O.x,
      right: (_.right - j.right + M.right) / O.x
    };
  }
  const fw = (n) => ({
    name: "arrow",
    options: n,
    async fn(i) {
      const { x: l, y: s, placement: c, rects: d, platform: f, elements: p, middlewareData: v } = i, { element: y, padding: x = 0 } = Zt(n, i) || {};
      if (y == null) return {};
      const k = Np(x), S = {
        x: l,
        y: s
      }, P = Hs(c), M = Ws(P), b = await f.getDimensions(y), T = P === "y", j = T ? "top" : "left", I = T ? "bottom" : "right", W = T ? "clientHeight" : "clientWidth", O = d.reference[M] + d.reference[P] - S[P] - d.floating[M], _ = S[P] - d.reference[P], $ = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(y));
      let U = $ ? $[W] : 0;
      (!U || !await (f.isElement == null ? void 0 : f.isElement($))) && (U = p.floating[W] || d.floating[M]);
      const Z = O / 2 - _ / 2, J = U / 2 - b[M] / 2 - 1, oe = Er(k[j], J), ae = Er(k[I], J), te = oe, me = U - b[M] - ae, fe = U / 2 - b[M] / 2 + Z, ke = Es(te, fe, me), ce = !v.arrow && Dn(c) != null && fe !== ke && d.reference[M] / 2 - (fe < te ? oe : ae) - b[M] / 2 < 0, le = ce ? fe < te ? fe - te : fe - me : 0;
      return {
        [P]: S[P] + le,
        data: {
          [P]: ke,
          centerOffset: fe - ke - le,
          ...ce && {
            alignmentOffset: le
          }
        },
        reset: ce
      };
    }
  }), pw = function(n) {
    return n === void 0 && (n = {}), {
      name: "flip",
      options: n,
      async fn(i) {
        var l, s;
        const { placement: c, middlewareData: d, rects: f, initialPlacement: p, platform: v, elements: y } = i, { mainAxis: x = true, crossAxis: k = true, fallbackPlacements: S, fallbackStrategy: P = "bestFit", fallbackAxisSideDirection: M = "none", flipAlignment: b = true, ...T } = Zt(n, i);
        if ((l = d.arrow) != null && l.alignmentOffset) return {};
        const j = er(c), I = Nr(p), W = er(p) === p, O = await (v.isRTL == null ? void 0 : v.isRTL(y.floating)), _ = S || (W || !b ? [
          nl(p)
        ] : aw(p)), $ = M !== "none";
        !S && $ && _.push(...uw(p, b, M, O));
        const U = [
          p,
          ..._
        ], Z = await Eo(i, T), J = [];
        let oe = ((s = d.flip) == null ? void 0 : s.overflows) || [];
        if (x && J.push(Z[j]), k) {
          const fe = lw(c, f, O);
          J.push(Z[fe[0]], Z[fe[1]]);
        }
        if (oe = [
          ...oe,
          {
            placement: c,
            overflows: J
          }
        ], !J.every((fe) => fe <= 0)) {
          var ae, te;
          const fe = (((ae = d.flip) == null ? void 0 : ae.index) || 0) + 1, ke = U[fe];
          if (ke) return {
            data: {
              index: fe,
              overflows: oe
            },
            reset: {
              placement: ke
            }
          };
          let ce = (te = oe.filter((le) => le.overflows[0] <= 0).sort((le, L) => le.overflows[1] - L.overflows[1])[0]) == null ? void 0 : te.placement;
          if (!ce) switch (P) {
            case "bestFit": {
              var me;
              const le = (me = oe.filter((L) => {
                if ($) {
                  const K = Nr(L.placement);
                  return K === I || K === "y";
                }
                return true;
              }).map((L) => [
                L.placement,
                L.overflows.filter((K) => K > 0).reduce((K, G) => K + G, 0)
              ]).sort((L, K) => L[1] - K[1])[0]) == null ? void 0 : me[0];
              le && (ce = le);
              break;
            }
            case "initialPlacement":
              ce = p;
              break;
          }
          if (c !== ce) return {
            reset: {
              placement: ce
            }
          };
        }
        return {};
      }
    };
  };
  function _f(n, i) {
    return {
      top: n.top - i.height,
      right: n.right - i.width,
      bottom: n.bottom - i.height,
      left: n.left - i.width
    };
  }
  function Of(n) {
    return nw.some((i) => n[i] >= 0);
  }
  const mw = function(n) {
    return n === void 0 && (n = {}), {
      name: "hide",
      options: n,
      async fn(i) {
        const { rects: l } = i, { strategy: s = "referenceHidden", ...c } = Zt(n, i);
        switch (s) {
          case "referenceHidden": {
            const d = await Eo(i, {
              ...c,
              elementContext: "reference"
            }), f = _f(d, l.reference);
            return {
              data: {
                referenceHiddenOffsets: f,
                referenceHidden: Of(f)
              }
            };
          }
          case "escaped": {
            const d = await Eo(i, {
              ...c,
              altBoundary: true
            }), f = _f(d, l.floating);
            return {
              data: {
                escapedOffsets: f,
                escaped: Of(f)
              }
            };
          }
          default:
            return {};
        }
      }
    };
  };
  async function hw(n, i) {
    const { placement: l, platform: s, elements: c } = n, d = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), f = er(l), p = Dn(l), v = Nr(l) === "y", y = [
      "left",
      "top"
    ].includes(f) ? -1 : 1, x = d && v ? -1 : 1, k = Zt(i, n);
    let { mainAxis: S, crossAxis: P, alignmentAxis: M } = typeof k == "number" ? {
      mainAxis: k,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: k.mainAxis || 0,
      crossAxis: k.crossAxis || 0,
      alignmentAxis: k.alignmentAxis
    };
    return p && typeof M == "number" && (P = p === "end" ? M * -1 : M), v ? {
      x: P * x,
      y: S * y
    } : {
      x: S * y,
      y: P * x
    };
  }
  const gw = function(n) {
    return n === void 0 && (n = 0), {
      name: "offset",
      options: n,
      async fn(i) {
        var l, s;
        const { x: c, y: d, placement: f, middlewareData: p } = i, v = await hw(i, n);
        return f === ((l = p.offset) == null ? void 0 : l.placement) && (s = p.arrow) != null && s.alignmentOffset ? {} : {
          x: c + v.x,
          y: d + v.y,
          data: {
            ...v,
            placement: f
          }
        };
      }
    };
  }, vw = function(n) {
    return n === void 0 && (n = {}), {
      name: "shift",
      options: n,
      async fn(i) {
        const { x: l, y: s, placement: c } = i, { mainAxis: d = true, crossAxis: f = false, limiter: p = {
          fn: (T) => {
            let { x: j, y: I } = T;
            return {
              x: j,
              y: I
            };
          }
        }, ...v } = Zt(n, i), y = {
          x: l,
          y: s
        }, x = await Eo(i, v), k = Nr(er(c)), S = Is(k);
        let P = y[S], M = y[k];
        if (d) {
          const T = S === "y" ? "top" : "left", j = S === "y" ? "bottom" : "right", I = P + x[T], W = P - x[j];
          P = Es(I, P, W);
        }
        if (f) {
          const T = k === "y" ? "top" : "left", j = k === "y" ? "bottom" : "right", I = M + x[T], W = M - x[j];
          M = Es(I, M, W);
        }
        const b = p.fn({
          ...i,
          [S]: P,
          [k]: M
        });
        return {
          ...b,
          data: {
            x: b.x - l,
            y: b.y - s,
            enabled: {
              [S]: d,
              [k]: f
            }
          }
        };
      }
    };
  }, yw = function(n) {
    return n === void 0 && (n = {}), {
      options: n,
      fn(i) {
        const { x: l, y: s, placement: c, rects: d, middlewareData: f } = i, { offset: p = 0, mainAxis: v = true, crossAxis: y = true } = Zt(n, i), x = {
          x: l,
          y: s
        }, k = Nr(c), S = Is(k);
        let P = x[S], M = x[k];
        const b = Zt(p, i), T = typeof b == "number" ? {
          mainAxis: b,
          crossAxis: 0
        } : {
          mainAxis: 0,
          crossAxis: 0,
          ...b
        };
        if (v) {
          const W = S === "y" ? "height" : "width", O = d.reference[S] - d.floating[W] + T.mainAxis, _ = d.reference[S] + d.reference[W] - T.mainAxis;
          P < O ? P = O : P > _ && (P = _);
        }
        if (y) {
          var j, I;
          const W = S === "y" ? "width" : "height", O = [
            "top",
            "left"
          ].includes(er(c)), _ = d.reference[k] - d.floating[W] + (O && ((j = f.offset) == null ? void 0 : j[k]) || 0) + (O ? 0 : T.crossAxis), $ = d.reference[k] + d.reference[W] + (O ? 0 : ((I = f.offset) == null ? void 0 : I[k]) || 0) - (O ? T.crossAxis : 0);
          M < _ ? M = _ : M > $ && (M = $);
        }
        return {
          [S]: P,
          [k]: M
        };
      }
    };
  }, ww = function(n) {
    return n === void 0 && (n = {}), {
      name: "size",
      options: n,
      async fn(i) {
        var l, s;
        const { placement: c, rects: d, platform: f, elements: p } = i, { apply: v = () => {
        }, ...y } = Zt(n, i), x = await Eo(i, y), k = er(c), S = Dn(c), P = Nr(c) === "y", { width: M, height: b } = d.floating;
        let T, j;
        k === "top" || k === "bottom" ? (T = k, j = S === (await (f.isRTL == null ? void 0 : f.isRTL(p.floating)) ? "start" : "end") ? "left" : "right") : (j = k, T = S === "end" ? "top" : "bottom");
        const I = b - x.top - x.bottom, W = M - x.left - x.right, O = Er(b - x[T], I), _ = Er(M - x[j], W), $ = !i.middlewareData.shift;
        let U = O, Z = _;
        if ((l = i.middlewareData.shift) != null && l.enabled.x && (Z = W), (s = i.middlewareData.shift) != null && s.enabled.y && (U = I), $ && !S) {
          const oe = dt(x.left, 0), ae = dt(x.right, 0), te = dt(x.top, 0), me = dt(x.bottom, 0);
          P ? Z = M - 2 * (oe !== 0 || ae !== 0 ? oe + ae : dt(x.left, x.right)) : U = b - 2 * (te !== 0 || me !== 0 ? te + me : dt(x.top, x.bottom));
        }
        await v({
          ...i,
          availableWidth: Z,
          availableHeight: U
        });
        const J = await f.getDimensions(p.floating);
        return M !== J.width || b !== J.height ? {
          reset: {
            rects: true
          }
        } : {};
      }
    };
  };
  function cl() {
    return typeof window < "u";
  }
  function _n(n) {
    return Rp(n) ? (n.nodeName || "").toLowerCase() : "#document";
  }
  function ft(n) {
    var i;
    return (n == null || (i = n.ownerDocument) == null ? void 0 : i.defaultView) || window;
  }
  function Ht(n) {
    var i;
    return (i = (Rp(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : i.documentElement;
  }
  function Rp(n) {
    return cl() ? n instanceof Node || n instanceof ft(n).Node : false;
  }
  function Rt(n) {
    return cl() ? n instanceof Element || n instanceof ft(n).Element : false;
  }
  function It(n) {
    return cl() ? n instanceof HTMLElement || n instanceof ft(n).HTMLElement : false;
  }
  function jf(n) {
    return !cl() || typeof ShadowRoot > "u" ? false : n instanceof ShadowRoot || n instanceof ft(n).ShadowRoot;
  }
  function To(n) {
    const { overflow: i, overflowX: l, overflowY: s, display: c } = Tt(n);
    return /auto|scroll|overlay|hidden|clip/.test(i + s + l) && ![
      "inline",
      "contents"
    ].includes(c);
  }
  function xw(n) {
    return [
      "table",
      "td",
      "th"
    ].includes(_n(n));
  }
  function dl(n) {
    return [
      ":popover-open",
      ":modal"
    ].some((i) => {
      try {
        return n.matches(i);
      } catch {
        return false;
      }
    });
  }
  function $s(n) {
    const i = Us(), l = Rt(n) ? Tt(n) : n;
    return [
      "transform",
      "translate",
      "scale",
      "rotate",
      "perspective"
    ].some((s) => l[s] ? l[s] !== "none" : false) || (l.containerType ? l.containerType !== "normal" : false) || !i && (l.backdropFilter ? l.backdropFilter !== "none" : false) || !i && (l.filter ? l.filter !== "none" : false) || [
      "transform",
      "translate",
      "scale",
      "rotate",
      "perspective",
      "filter"
    ].some((s) => (l.willChange || "").includes(s)) || [
      "paint",
      "layout",
      "strict",
      "content"
    ].some((s) => (l.contain || "").includes(s));
  }
  function Sw(n) {
    let i = Rr(n);
    for (; It(i) && !Rn(i); ) {
      if ($s(i)) return i;
      if (dl(i)) return null;
      i = Rr(i);
    }
    return null;
  }
  function Us() {
    return typeof CSS > "u" || !CSS.supports ? false : CSS.supports("-webkit-backdrop-filter", "none");
  }
  function Rn(n) {
    return [
      "html",
      "body",
      "#document"
    ].includes(_n(n));
  }
  function Tt(n) {
    return ft(n).getComputedStyle(n);
  }
  function fl(n) {
    return Rt(n) ? {
      scrollLeft: n.scrollLeft,
      scrollTop: n.scrollTop
    } : {
      scrollLeft: n.scrollX,
      scrollTop: n.scrollY
    };
  }
  function Rr(n) {
    if (_n(n) === "html") return n;
    const i = n.assignedSlot || n.parentNode || jf(n) && n.host || Ht(n);
    return jf(i) ? i.host : i;
  }
  function Tp(n) {
    const i = Rr(n);
    return Rn(i) ? n.ownerDocument ? n.ownerDocument.body : n.body : It(i) && To(i) ? i : Tp(i);
  }
  function No(n, i, l) {
    var s;
    i === void 0 && (i = []), l === void 0 && (l = true);
    const c = Tp(n), d = c === ((s = n.ownerDocument) == null ? void 0 : s.body), f = ft(c);
    if (d) {
      const p = Rs(f);
      return i.concat(f, f.visualViewport || [], To(c) ? c : [], p && l ? No(p) : []);
    }
    return i.concat(c, No(c, [], l));
  }
  function Rs(n) {
    return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
  }
  function Ap(n) {
    const i = Tt(n);
    let l = parseFloat(i.width) || 0, s = parseFloat(i.height) || 0;
    const c = It(n), d = c ? n.offsetWidth : l, f = c ? n.offsetHeight : s, p = rl(l) !== d || rl(s) !== f;
    return p && (l = d, s = f), {
      width: l,
      height: s,
      $: p
    };
  }
  function Vs(n) {
    return Rt(n) ? n : n.contextElement;
  }
  function Cn(n) {
    const i = Vs(n);
    if (!It(i)) return zt(1);
    const l = i.getBoundingClientRect(), { width: s, height: c, $: d } = Ap(i);
    let f = (d ? rl(l.width) : l.width) / s, p = (d ? rl(l.height) : l.height) / c;
    return (!f || !Number.isFinite(f)) && (f = 1), (!p || !Number.isFinite(p)) && (p = 1), {
      x: f,
      y: p
    };
  }
  const kw = zt(0);
  function Mp(n) {
    const i = ft(n);
    return !Us() || !i.visualViewport ? kw : {
      x: i.visualViewport.offsetLeft,
      y: i.visualViewport.offsetTop
    };
  }
  function Cw(n, i, l) {
    return i === void 0 && (i = false), !l || i && l !== ft(n) ? false : i;
  }
  function $r(n, i, l, s) {
    i === void 0 && (i = false), l === void 0 && (l = false);
    const c = n.getBoundingClientRect(), d = Vs(n);
    let f = zt(1);
    i && (s ? Rt(s) && (f = Cn(s)) : f = Cn(n));
    const p = Cw(d, l, s) ? Mp(d) : zt(0);
    let v = (c.left + p.x) / f.x, y = (c.top + p.y) / f.y, x = c.width / f.x, k = c.height / f.y;
    if (d) {
      const S = ft(d), P = s && Rt(s) ? ft(s) : s;
      let M = S, b = Rs(M);
      for (; b && s && P !== M; ) {
        const T = Cn(b), j = b.getBoundingClientRect(), I = Tt(b), W = j.left + (b.clientLeft + parseFloat(I.paddingLeft)) * T.x, O = j.top + (b.clientTop + parseFloat(I.paddingTop)) * T.y;
        v *= T.x, y *= T.y, x *= T.x, k *= T.y, v += W, y += O, M = ft(b), b = Rs(M);
      }
    }
    return ol({
      width: x,
      height: k,
      x: v,
      y
    });
  }
  function Gs(n, i) {
    const l = fl(n).scrollLeft;
    return i ? i.left + l : $r(Ht(n)).left + l;
  }
  function Dp(n, i, l) {
    l === void 0 && (l = false);
    const s = n.getBoundingClientRect(), c = s.left + i.scrollLeft - (l ? 0 : Gs(n, s)), d = s.top + i.scrollTop;
    return {
      x: c,
      y: d
    };
  }
  function Pw(n) {
    let { elements: i, rect: l, offsetParent: s, strategy: c } = n;
    const d = c === "fixed", f = Ht(s), p = i ? dl(i.floating) : false;
    if (s === f || p && d) return l;
    let v = {
      scrollLeft: 0,
      scrollTop: 0
    }, y = zt(1);
    const x = zt(0), k = It(s);
    if ((k || !k && !d) && ((_n(s) !== "body" || To(f)) && (v = fl(s)), It(s))) {
      const P = $r(s);
      y = Cn(s), x.x = P.x + s.clientLeft, x.y = P.y + s.clientTop;
    }
    const S = f && !k && !d ? Dp(f, v, true) : zt(0);
    return {
      width: l.width * y.x,
      height: l.height * y.y,
      x: l.x * y.x - v.scrollLeft * y.x + x.x + S.x,
      y: l.y * y.y - v.scrollTop * y.y + x.y + S.y
    };
  }
  function bw(n) {
    return Array.from(n.getClientRects());
  }
  function Ew(n) {
    const i = Ht(n), l = fl(n), s = n.ownerDocument.body, c = dt(i.scrollWidth, i.clientWidth, s.scrollWidth, s.clientWidth), d = dt(i.scrollHeight, i.clientHeight, s.scrollHeight, s.clientHeight);
    let f = -l.scrollLeft + Gs(n);
    const p = -l.scrollTop;
    return Tt(s).direction === "rtl" && (f += dt(i.clientWidth, s.clientWidth) - c), {
      width: c,
      height: d,
      x: f,
      y: p
    };
  }
  function Nw(n, i) {
    const l = ft(n), s = Ht(n), c = l.visualViewport;
    let d = s.clientWidth, f = s.clientHeight, p = 0, v = 0;
    if (c) {
      d = c.width, f = c.height;
      const y = Us();
      (!y || y && i === "fixed") && (p = c.offsetLeft, v = c.offsetTop);
    }
    return {
      width: d,
      height: f,
      x: p,
      y: v
    };
  }
  function Rw(n, i) {
    const l = $r(n, true, i === "fixed"), s = l.top + n.clientTop, c = l.left + n.clientLeft, d = It(n) ? Cn(n) : zt(1), f = n.clientWidth * d.x, p = n.clientHeight * d.y, v = c * d.x, y = s * d.y;
    return {
      width: f,
      height: p,
      x: v,
      y
    };
  }
  function Lf(n, i, l) {
    let s;
    if (i === "viewport") s = Nw(n, l);
    else if (i === "document") s = Ew(Ht(n));
    else if (Rt(i)) s = Rw(i, l);
    else {
      const c = Mp(n);
      s = {
        x: i.x - c.x,
        y: i.y - c.y,
        width: i.width,
        height: i.height
      };
    }
    return ol(s);
  }
  function _p(n, i) {
    const l = Rr(n);
    return l === i || !Rt(l) || Rn(l) ? false : Tt(l).position === "fixed" || _p(l, i);
  }
  function Tw(n, i) {
    const l = i.get(n);
    if (l) return l;
    let s = No(n, [], false).filter((p) => Rt(p) && _n(p) !== "body"), c = null;
    const d = Tt(n).position === "fixed";
    let f = d ? Rr(n) : n;
    for (; Rt(f) && !Rn(f); ) {
      const p = Tt(f), v = $s(f);
      !v && p.position === "fixed" && (c = null), (d ? !v && !c : !v && p.position === "static" && !!c && [
        "absolute",
        "fixed"
      ].includes(c.position) || To(f) && !v && _p(n, f)) ? s = s.filter((x) => x !== f) : c = p, f = Rr(f);
    }
    return i.set(n, s), s;
  }
  function Aw(n) {
    let { element: i, boundary: l, rootBoundary: s, strategy: c } = n;
    const f = [
      ...l === "clippingAncestors" ? dl(i) ? [] : Tw(i, this._c) : [].concat(l),
      s
    ], p = f[0], v = f.reduce((y, x) => {
      const k = Lf(i, x, c);
      return y.top = dt(k.top, y.top), y.right = Er(k.right, y.right), y.bottom = Er(k.bottom, y.bottom), y.left = dt(k.left, y.left), y;
    }, Lf(i, p, c));
    return {
      width: v.right - v.left,
      height: v.bottom - v.top,
      x: v.left,
      y: v.top
    };
  }
  function Mw(n) {
    const { width: i, height: l } = Ap(n);
    return {
      width: i,
      height: l
    };
  }
  function Dw(n, i, l) {
    const s = It(i), c = Ht(i), d = l === "fixed", f = $r(n, true, d, i);
    let p = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const v = zt(0);
    if (s || !s && !d) if ((_n(i) !== "body" || To(c)) && (p = fl(i)), s) {
      const S = $r(i, true, d, i);
      v.x = S.x + i.clientLeft, v.y = S.y + i.clientTop;
    } else c && (v.x = Gs(c));
    const y = c && !s && !d ? Dp(c, p) : zt(0), x = f.left + p.scrollLeft - v.x - y.x, k = f.top + p.scrollTop - v.y - y.y;
    return {
      x,
      y: k,
      width: f.width,
      height: f.height
    };
  }
  function gs(n) {
    return Tt(n).position === "static";
  }
  function Bf(n, i) {
    if (!It(n) || Tt(n).position === "fixed") return null;
    if (i) return i(n);
    let l = n.offsetParent;
    return Ht(n) === l && (l = l.ownerDocument.body), l;
  }
  function Op(n, i) {
    const l = ft(n);
    if (dl(n)) return l;
    if (!It(n)) {
      let c = Rr(n);
      for (; c && !Rn(c); ) {
        if (Rt(c) && !gs(c)) return c;
        c = Rr(c);
      }
      return l;
    }
    let s = Bf(n, i);
    for (; s && xw(s) && gs(s); ) s = Bf(s, i);
    return s && Rn(s) && gs(s) && !$s(s) ? l : s || Sw(n) || l;
  }
  const _w = async function(n) {
    const i = this.getOffsetParent || Op, l = this.getDimensions, s = await l(n.floating);
    return {
      reference: Dw(n.reference, await i(n.floating), n.strategy),
      floating: {
        x: 0,
        y: 0,
        width: s.width,
        height: s.height
      }
    };
  };
  function Ow(n) {
    return Tt(n).direction === "rtl";
  }
  const jw = {
    convertOffsetParentRelativeRectToViewportRelativeRect: Pw,
    getDocumentElement: Ht,
    getClippingRect: Aw,
    getOffsetParent: Op,
    getElementRects: _w,
    getClientRects: bw,
    getDimensions: Mw,
    getScale: Cn,
    isElement: Rt,
    isRTL: Ow
  };
  function jp(n, i) {
    return n.x === i.x && n.y === i.y && n.width === i.width && n.height === i.height;
  }
  function Lw(n, i) {
    let l = null, s;
    const c = Ht(n);
    function d() {
      var p;
      clearTimeout(s), (p = l) == null || p.disconnect(), l = null;
    }
    function f(p, v) {
      p === void 0 && (p = false), v === void 0 && (v = 1), d();
      const y = n.getBoundingClientRect(), { left: x, top: k, width: S, height: P } = y;
      if (p || i(), !S || !P) return;
      const M = Ui(k), b = Ui(c.clientWidth - (x + S)), T = Ui(c.clientHeight - (k + P)), j = Ui(x), W = {
        rootMargin: -M + "px " + -b + "px " + -T + "px " + -j + "px",
        threshold: dt(0, Er(1, v)) || 1
      };
      let O = true;
      function _($) {
        const U = $[0].intersectionRatio;
        if (U !== v) {
          if (!O) return f();
          U ? f(false, U) : s = setTimeout(() => {
            f(false, 1e-7);
          }, 1e3);
        }
        U === 1 && !jp(y, n.getBoundingClientRect()) && f(), O = false;
      }
      try {
        l = new IntersectionObserver(_, {
          ...W,
          root: c.ownerDocument
        });
      } catch {
        l = new IntersectionObserver(_, W);
      }
      l.observe(n);
    }
    return f(true), d;
  }
  function Bw(n, i, l, s) {
    s === void 0 && (s = {});
    const { ancestorScroll: c = true, ancestorResize: d = true, elementResize: f = typeof ResizeObserver == "function", layoutShift: p = typeof IntersectionObserver == "function", animationFrame: v = false } = s, y = Vs(n), x = c || d ? [
      ...y ? No(y) : [],
      ...No(i)
    ] : [];
    x.forEach((j) => {
      c && j.addEventListener("scroll", l, {
        passive: true
      }), d && j.addEventListener("resize", l);
    });
    const k = y && p ? Lw(y, l) : null;
    let S = -1, P = null;
    f && (P = new ResizeObserver((j) => {
      let [I] = j;
      I && I.target === y && P && (P.unobserve(i), cancelAnimationFrame(S), S = requestAnimationFrame(() => {
        var W;
        (W = P) == null || W.observe(i);
      })), l();
    }), y && !v && P.observe(y), P.observe(i));
    let M, b = v ? $r(n) : null;
    v && T();
    function T() {
      const j = $r(n);
      b && !jp(b, j) && l(), b = j, M = requestAnimationFrame(T);
    }
    return l(), () => {
      var j;
      x.forEach((I) => {
        c && I.removeEventListener("scroll", l), d && I.removeEventListener("resize", l);
      }), k == null ? void 0 : k(), (j = P) == null || j.disconnect(), P = null, v && cancelAnimationFrame(M);
    };
  }
  const zw = gw, Fw = vw, Iw = pw, Ww = ww, Hw = mw, zf = fw, $w = yw, Uw = (n, i, l) => {
    const s = /* @__PURE__ */ new Map(), c = {
      platform: jw,
      ...l
    }, d = {
      ...c.platform,
      _c: s
    };
    return dw(n, i, {
      ...c,
      platform: d
    });
  };
  var Xi = typeof document < "u" ? h.useLayoutEffect : h.useEffect;
  function il(n, i) {
    if (n === i) return true;
    if (typeof n != typeof i) return false;
    if (typeof n == "function" && n.toString() === i.toString()) return true;
    let l, s, c;
    if (n && i && typeof n == "object") {
      if (Array.isArray(n)) {
        if (l = n.length, l !== i.length) return false;
        for (s = l; s-- !== 0; ) if (!il(n[s], i[s])) return false;
        return true;
      }
      if (c = Object.keys(n), l = c.length, l !== Object.keys(i).length) return false;
      for (s = l; s-- !== 0; ) if (!{}.hasOwnProperty.call(i, c[s])) return false;
      for (s = l; s-- !== 0; ) {
        const d = c[s];
        if (!(d === "_owner" && n.$$typeof) && !il(n[d], i[d])) return false;
      }
      return true;
    }
    return n !== n && i !== i;
  }
  function Lp(n) {
    return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
  }
  function Ff(n, i) {
    const l = Lp(n);
    return Math.round(i * l) / l;
  }
  function vs(n) {
    const i = h.useRef(n);
    return Xi(() => {
      i.current = n;
    }), i;
  }
  function Vw(n) {
    n === void 0 && (n = {});
    const { placement: i = "bottom", strategy: l = "absolute", middleware: s = [], platform: c, elements: { reference: d, floating: f } = {}, transform: p = true, whileElementsMounted: v, open: y } = n, [x, k] = h.useState({
      x: 0,
      y: 0,
      strategy: l,
      placement: i,
      middlewareData: {},
      isPositioned: false
    }), [S, P] = h.useState(s);
    il(S, s) || P(s);
    const [M, b] = h.useState(null), [T, j] = h.useState(null), I = h.useCallback((L) => {
      L !== $.current && ($.current = L, b(L));
    }, []), W = h.useCallback((L) => {
      L !== U.current && (U.current = L, j(L));
    }, []), O = d || M, _ = f || T, $ = h.useRef(null), U = h.useRef(null), Z = h.useRef(x), J = v != null, oe = vs(v), ae = vs(c), te = vs(y), me = h.useCallback(() => {
      if (!$.current || !U.current) return;
      const L = {
        placement: i,
        strategy: l,
        middleware: S
      };
      ae.current && (L.platform = ae.current), Uw($.current, U.current, L).then((K) => {
        const G = {
          ...K,
          isPositioned: te.current !== false
        };
        fe.current && !il(Z.current, G) && (Z.current = G, _s.flushSync(() => {
          k(G);
        }));
      });
    }, [
      S,
      i,
      l,
      ae,
      te
    ]);
    Xi(() => {
      y === false && Z.current.isPositioned && (Z.current.isPositioned = false, k((L) => ({
        ...L,
        isPositioned: false
      })));
    }, [
      y
    ]);
    const fe = h.useRef(false);
    Xi(() => (fe.current = true, () => {
      fe.current = false;
    }), []), Xi(() => {
      if (O && ($.current = O), _ && (U.current = _), O && _) {
        if (oe.current) return oe.current(O, _, me);
        me();
      }
    }, [
      O,
      _,
      me,
      oe,
      J
    ]);
    const ke = h.useMemo(() => ({
      reference: $,
      floating: U,
      setReference: I,
      setFloating: W
    }), [
      I,
      W
    ]), ce = h.useMemo(() => ({
      reference: O,
      floating: _
    }), [
      O,
      _
    ]), le = h.useMemo(() => {
      const L = {
        position: l,
        left: 0,
        top: 0
      };
      if (!ce.floating) return L;
      const K = Ff(ce.floating, x.x), G = Ff(ce.floating, x.y);
      return p ? {
        ...L,
        transform: "translate(" + K + "px, " + G + "px)",
        ...Lp(ce.floating) >= 1.5 && {
          willChange: "transform"
        }
      } : {
        position: l,
        left: K,
        top: G
      };
    }, [
      l,
      p,
      ce.floating,
      x.x,
      x.y
    ]);
    return h.useMemo(() => ({
      ...x,
      update: me,
      refs: ke,
      elements: ce,
      floatingStyles: le
    }), [
      x,
      me,
      ke,
      ce,
      le
    ]);
  }
  const Gw = (n) => {
    function i(l) {
      return {}.hasOwnProperty.call(l, "current");
    }
    return {
      name: "arrow",
      options: n,
      fn(l) {
        const { element: s, padding: c } = typeof n == "function" ? n(l) : n;
        return s && i(s) ? s.current != null ? zf({
          element: s.current,
          padding: c
        }).fn(l) : {} : s ? zf({
          element: s,
          padding: c
        }).fn(l) : {};
      }
    };
  }, Kw = (n, i) => ({
    ...zw(n),
    options: [
      n,
      i
    ]
  }), Qw = (n, i) => ({
    ...Fw(n),
    options: [
      n,
      i
    ]
  }), Yw = (n, i) => ({
    ...$w(n),
    options: [
      n,
      i
    ]
  }), Xw = (n, i) => ({
    ...Iw(n),
    options: [
      n,
      i
    ]
  }), qw = (n, i) => ({
    ...Ww(n),
    options: [
      n,
      i
    ]
  }), Jw = (n, i) => ({
    ...Hw(n),
    options: [
      n,
      i
    ]
  }), Zw = (n, i) => ({
    ...Gw(n),
    options: [
      n,
      i
    ]
  });
  var e0 = "Arrow", Bp = h.forwardRef((n, i) => {
    const { children: l, width: s = 10, height: c = 5, ...d } = n;
    return g.jsx(je.svg, {
      ...d,
      ref: i,
      width: s,
      height: c,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: n.asChild ? l : g.jsx("polygon", {
        points: "0,0 30,0 15,10"
      })
    });
  });
  Bp.displayName = e0;
  var t0 = Bp;
  function zp(n) {
    const [i, l] = h.useState(void 0);
    return br(() => {
      if (n) {
        l({
          width: n.offsetWidth,
          height: n.offsetHeight
        });
        const s = new ResizeObserver((c) => {
          if (!Array.isArray(c) || !c.length) return;
          const d = c[0];
          let f, p;
          if ("borderBoxSize" in d) {
            const v = d.borderBoxSize, y = Array.isArray(v) ? v[0] : v;
            f = y.inlineSize, p = y.blockSize;
          } else f = n.offsetWidth, p = n.offsetHeight;
          l({
            width: f,
            height: p
          });
        });
        return s.observe(n, {
          box: "border-box"
        }), () => s.unobserve(n);
      } else l(void 0);
    }, [
      n
    ]), i;
  }
  var Ks = "Popper", [Fp, Ip] = Mn(Ks), [r0, Wp] = Fp(Ks), Hp = (n) => {
    const { __scopePopper: i, children: l } = n, [s, c] = h.useState(null);
    return g.jsx(r0, {
      scope: i,
      anchor: s,
      onAnchorChange: c,
      children: l
    });
  };
  Hp.displayName = Ks;
  var $p = "PopperAnchor", Up = h.forwardRef((n, i) => {
    const { __scopePopper: l, virtualRef: s, ...c } = n, d = Wp($p, l), f = h.useRef(null), p = ze(i, f);
    return h.useEffect(() => {
      d.onAnchorChange((s == null ? void 0 : s.current) || f.current);
    }), s ? null : g.jsx(je.div, {
      ...c,
      ref: p
    });
  });
  Up.displayName = $p;
  var Qs = "PopperContent", [n0, o0] = Fp(Qs), Vp = h.forwardRef((n, i) => {
    var _a, _b, _c, _d, _e, _f2;
    const { __scopePopper: l, side: s = "bottom", sideOffset: c = 0, align: d = "center", alignOffset: f = 0, arrowPadding: p = 0, avoidCollisions: v = true, collisionBoundary: y = [], collisionPadding: x = 0, sticky: k = "partial", hideWhenDetached: S = false, updatePositionStrategy: P = "optimized", onPlaced: M, ...b } = n, T = Wp(Qs, l), [j, I] = h.useState(null), W = ze(i, (ye) => I(ye)), [O, _] = h.useState(null), $ = zp(O), U = ($ == null ? void 0 : $.width) ?? 0, Z = ($ == null ? void 0 : $.height) ?? 0, J = s + (d !== "center" ? "-" + d : ""), oe = typeof x == "number" ? x : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...x
    }, ae = Array.isArray(y) ? y : [
      y
    ], te = ae.length > 0, me = {
      padding: oe,
      boundary: ae.filter(l0),
      altBoundary: te
    }, { refs: fe, floatingStyles: ke, placement: ce, isPositioned: le, middlewareData: L } = Vw({
      strategy: "fixed",
      placement: J,
      whileElementsMounted: (...ye) => Bw(...ye, {
        animationFrame: P === "always"
      }),
      elements: {
        reference: T.anchor
      },
      middleware: [
        Kw({
          mainAxis: c + Z,
          alignmentAxis: f
        }),
        v && Qw({
          mainAxis: true,
          crossAxis: false,
          limiter: k === "partial" ? Yw() : void 0,
          ...me
        }),
        v && Xw({
          ...me
        }),
        qw({
          ...me,
          apply: ({ elements: ye, rects: we, availableWidth: Ce, availableHeight: qe }) => {
            const { width: Vr, height: Mo } = we.reference, $t = ye.floating.style;
            $t.setProperty("--radix-popper-available-width", `${Ce}px`), $t.setProperty("--radix-popper-available-height", `${qe}px`), $t.setProperty("--radix-popper-anchor-width", `${Vr}px`), $t.setProperty("--radix-popper-anchor-height", `${Mo}px`);
          }
        }),
        O && Zw({
          element: O,
          padding: p
        }),
        a0({
          arrowWidth: U,
          arrowHeight: Z
        }),
        S && Jw({
          strategy: "referenceHidden",
          ...me
        })
      ]
    }), [K, G] = Qp(ce), N = et(M);
    br(() => {
      le && (N == null ? void 0 : N());
    }, [
      le,
      N
    ]);
    const B = (_a = L.arrow) == null ? void 0 : _a.x, se = (_b = L.arrow) == null ? void 0 : _b.y, de = ((_c = L.arrow) == null ? void 0 : _c.centerOffset) !== 0, [he, ge] = h.useState();
    return br(() => {
      j && ge(window.getComputedStyle(j).zIndex);
    }, [
      j
    ]), g.jsx("div", {
      ref: fe.setFloating,
      "data-radix-popper-content-wrapper": "",
      style: {
        ...ke,
        transform: le ? ke.transform : "translate(0, -200%)",
        minWidth: "max-content",
        zIndex: he,
        "--radix-popper-transform-origin": [
          (_d = L.transformOrigin) == null ? void 0 : _d.x,
          (_e = L.transformOrigin) == null ? void 0 : _e.y
        ].join(" "),
        ...((_f2 = L.hide) == null ? void 0 : _f2.referenceHidden) && {
          visibility: "hidden",
          pointerEvents: "none"
        }
      },
      dir: n.dir,
      children: g.jsx(n0, {
        scope: l,
        placedSide: K,
        onArrowChange: _,
        arrowX: B,
        arrowY: se,
        shouldHideArrow: de,
        children: g.jsx(je.div, {
          "data-side": K,
          "data-align": G,
          ...b,
          ref: W,
          style: {
            ...b.style,
            animation: le ? void 0 : "none"
          }
        })
      })
    });
  });
  Vp.displayName = Qs;
  var Gp = "PopperArrow", i0 = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }, Kp = h.forwardRef(function(i, l) {
    const { __scopePopper: s, ...c } = i, d = o0(Gp, s), f = i0[d.placedSide];
    return g.jsx("span", {
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
      children: g.jsx(t0, {
        ...c,
        ref: l,
        style: {
          ...c.style,
          display: "block"
        }
      })
    });
  });
  Kp.displayName = Gp;
  function l0(n) {
    return n !== null;
  }
  var a0 = (n) => ({
    name: "transformOrigin",
    options: n,
    fn(i) {
      var _a, _b, _c;
      const { placement: l, rects: s, middlewareData: c } = i, f = ((_a = c.arrow) == null ? void 0 : _a.centerOffset) !== 0, p = f ? 0 : n.arrowWidth, v = f ? 0 : n.arrowHeight, [y, x] = Qp(l), k = {
        start: "0%",
        center: "50%",
        end: "100%"
      }[x], S = (((_b = c.arrow) == null ? void 0 : _b.x) ?? 0) + p / 2, P = (((_c = c.arrow) == null ? void 0 : _c.y) ?? 0) + v / 2;
      let M = "", b = "";
      return y === "bottom" ? (M = f ? k : `${S}px`, b = `${-v}px`) : y === "top" ? (M = f ? k : `${S}px`, b = `${s.floating.height + v}px`) : y === "right" ? (M = `${-v}px`, b = f ? k : `${P}px`) : y === "left" && (M = `${s.floating.width + v}px`, b = f ? k : `${P}px`), {
        data: {
          x: M,
          y: b
        }
      };
    }
  });
  function Qp(n) {
    const [i, l = "center"] = n.split("-");
    return [
      i,
      l
    ];
  }
  var s0 = Hp, Yp = Up, u0 = Vp, c0 = Kp, d0 = "Portal", Ys = h.forwardRef((n, i) => {
    var _a;
    const { container: l, ...s } = n, [c, d] = h.useState(false);
    br(() => d(true), []);
    const f = l || c && ((_a = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a.body);
    return f ? gy.createPortal(g.jsx(je.div, {
      ...s,
      ref: i
    }), f) : null;
  });
  Ys.displayName = d0;
  function Xs({ prop: n, defaultProp: i, onChange: l = () => {
  } }) {
    const [s, c] = f0({
      defaultProp: i,
      onChange: l
    }), d = n !== void 0, f = d ? n : s, p = et(l), v = h.useCallback((y) => {
      if (d) {
        const k = typeof y == "function" ? y(n) : y;
        k !== n && p(k);
      } else c(y);
    }, [
      d,
      n,
      c,
      p
    ]);
    return [
      f,
      v
    ];
  }
  function f0({ defaultProp: n, onChange: i }) {
    const l = h.useState(n), [s] = l, c = h.useRef(s), d = et(i);
    return h.useEffect(() => {
      c.current !== s && (d(s), c.current = s);
    }, [
      s,
      c,
      d
    ]), l;
  }
  var p0 = function(n) {
    if (typeof document > "u") return null;
    var i = Array.isArray(n) ? n[0] : n;
    return i.ownerDocument.body;
  }, yn = /* @__PURE__ */ new WeakMap(), Vi = /* @__PURE__ */ new WeakMap(), Gi = {}, ys = 0, Xp = function(n) {
    return n && (n.host || Xp(n.parentNode));
  }, m0 = function(n, i) {
    return i.map(function(l) {
      if (n.contains(l)) return l;
      var s = Xp(l);
      return s && n.contains(s) ? s : (console.error("aria-hidden", l, "in not contained inside", n, ". Doing nothing"), null);
    }).filter(function(l) {
      return !!l;
    });
  }, h0 = function(n, i, l, s) {
    var c = m0(i, Array.isArray(n) ? n : [
      n
    ]);
    Gi[l] || (Gi[l] = /* @__PURE__ */ new WeakMap());
    var d = Gi[l], f = [], p = /* @__PURE__ */ new Set(), v = new Set(c), y = function(k) {
      !k || p.has(k) || (p.add(k), y(k.parentNode));
    };
    c.forEach(y);
    var x = function(k) {
      !k || v.has(k) || Array.prototype.forEach.call(k.children, function(S) {
        if (p.has(S)) x(S);
        else try {
          var P = S.getAttribute(s), M = P !== null && P !== "false", b = (yn.get(S) || 0) + 1, T = (d.get(S) || 0) + 1;
          yn.set(S, b), d.set(S, T), f.push(S), b === 1 && M && Vi.set(S, true), T === 1 && S.setAttribute(l, "true"), M || S.setAttribute(s, "true");
        } catch (j) {
          console.error("aria-hidden: cannot operate on ", S, j);
        }
      });
    };
    return x(i), p.clear(), ys++, function() {
      f.forEach(function(k) {
        var S = yn.get(k) - 1, P = d.get(k) - 1;
        yn.set(k, S), d.set(k, P), S || (Vi.has(k) || k.removeAttribute(s), Vi.delete(k)), P || k.removeAttribute(l);
      }), ys--, ys || (yn = /* @__PURE__ */ new WeakMap(), yn = /* @__PURE__ */ new WeakMap(), Vi = /* @__PURE__ */ new WeakMap(), Gi = {});
    };
  }, qp = function(n, i, l) {
    l === void 0 && (l = "data-aria-hidden");
    var s = Array.from(Array.isArray(n) ? n : [
      n
    ]), c = p0(n);
    return c ? (s.push.apply(s, Array.from(c.querySelectorAll("[aria-live]"))), h0(s, c, l, "aria-hidden")) : function() {
      return null;
    };
  }, Bt = function() {
    return Bt = Object.assign || function(i) {
      for (var l, s = 1, c = arguments.length; s < c; s++) {
        l = arguments[s];
        for (var d in l) Object.prototype.hasOwnProperty.call(l, d) && (i[d] = l[d]);
      }
      return i;
    }, Bt.apply(this, arguments);
  };
  function Jp(n, i) {
    var l = {};
    for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && i.indexOf(s) < 0 && (l[s] = n[s]);
    if (n != null && typeof Object.getOwnPropertySymbols == "function") for (var c = 0, s = Object.getOwnPropertySymbols(n); c < s.length; c++) i.indexOf(s[c]) < 0 && Object.prototype.propertyIsEnumerable.call(n, s[c]) && (l[s[c]] = n[s[c]]);
    return l;
  }
  function g0(n, i, l) {
    if (l || arguments.length === 2) for (var s = 0, c = i.length, d; s < c; s++) (d || !(s in i)) && (d || (d = Array.prototype.slice.call(i, 0, s)), d[s] = i[s]);
    return n.concat(d || Array.prototype.slice.call(i));
  }
  var qi = "right-scroll-bar-position", Ji = "width-before-scroll-bar", v0 = "with-scroll-bars-hidden", y0 = "--removed-body-scroll-bar-size";
  function ws(n, i) {
    return typeof n == "function" ? n(i) : n && (n.current = i), n;
  }
  function w0(n, i) {
    var l = h.useState(function() {
      return {
        value: n,
        callback: i,
        facade: {
          get current() {
            return l.value;
          },
          set current(s) {
            var c = l.value;
            c !== s && (l.value = s, l.callback(s, c));
          }
        }
      };
    })[0];
    return l.callback = i, l.facade;
  }
  var x0 = typeof window < "u" ? h.useLayoutEffect : h.useEffect, If = /* @__PURE__ */ new WeakMap();
  function S0(n, i) {
    var l = w0(null, function(s) {
      return n.forEach(function(c) {
        return ws(c, s);
      });
    });
    return x0(function() {
      var s = If.get(l);
      if (s) {
        var c = new Set(s), d = new Set(n), f = l.current;
        c.forEach(function(p) {
          d.has(p) || ws(p, null);
        }), d.forEach(function(p) {
          c.has(p) || ws(p, f);
        });
      }
      If.set(l, n);
    }, [
      n
    ]), l;
  }
  function k0(n) {
    return n;
  }
  function C0(n, i) {
    i === void 0 && (i = k0);
    var l = [], s = false, c = {
      read: function() {
        if (s) throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
        return l.length ? l[l.length - 1] : n;
      },
      useMedium: function(d) {
        var f = i(d, s);
        return l.push(f), function() {
          l = l.filter(function(p) {
            return p !== f;
          });
        };
      },
      assignSyncMedium: function(d) {
        for (s = true; l.length; ) {
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
        s = true;
        var f = [];
        if (l.length) {
          var p = l;
          l = [], p.forEach(d), f = l;
        }
        var v = function() {
          var x = f;
          f = [], x.forEach(d);
        }, y = function() {
          return Promise.resolve().then(v);
        };
        y(), l = {
          push: function(x) {
            f.push(x), y();
          },
          filter: function(x) {
            return f = f.filter(x), l;
          }
        };
      }
    };
    return c;
  }
  function P0(n) {
    n === void 0 && (n = {});
    var i = C0(null);
    return i.options = Bt({
      async: true,
      ssr: false
    }, n), i;
  }
  var Zp = function(n) {
    var i = n.sideCar, l = Jp(n, [
      "sideCar"
    ]);
    if (!i) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
    var s = i.read();
    if (!s) throw new Error("Sidecar medium not found");
    return h.createElement(s, Bt({}, l));
  };
  Zp.isSideCarExport = true;
  function b0(n, i) {
    return n.useMedium(i), Zp;
  }
  var em = P0(), xs = function() {
  }, pl = h.forwardRef(function(n, i) {
    var l = h.useRef(null), s = h.useState({
      onScrollCapture: xs,
      onWheelCapture: xs,
      onTouchMoveCapture: xs
    }), c = s[0], d = s[1], f = n.forwardProps, p = n.children, v = n.className, y = n.removeScrollBar, x = n.enabled, k = n.shards, S = n.sideCar, P = n.noIsolation, M = n.inert, b = n.allowPinchZoom, T = n.as, j = T === void 0 ? "div" : T, I = n.gapMode, W = Jp(n, [
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
    ]), O = S, _ = S0([
      l,
      i
    ]), $ = Bt(Bt({}, W), c);
    return h.createElement(h.Fragment, null, x && h.createElement(O, {
      sideCar: em,
      removeScrollBar: y,
      shards: k,
      noIsolation: P,
      inert: M,
      setCallbacks: d,
      allowPinchZoom: !!b,
      lockRef: l,
      gapMode: I
    }), f ? h.cloneElement(h.Children.only(p), Bt(Bt({}, $), {
      ref: _
    })) : h.createElement(j, Bt({}, $, {
      className: v,
      ref: _
    }), p));
  });
  pl.defaultProps = {
    enabled: true,
    removeScrollBar: true,
    inert: false
  };
  pl.classNames = {
    fullWidth: Ji,
    zeroRight: qi
  };
  var E0 = function() {
    if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
  };
  function N0() {
    if (!document) return null;
    var n = document.createElement("style");
    n.type = "text/css";
    var i = E0();
    return i && n.setAttribute("nonce", i), n;
  }
  function R0(n, i) {
    n.styleSheet ? n.styleSheet.cssText = i : n.appendChild(document.createTextNode(i));
  }
  function T0(n) {
    var i = document.head || document.getElementsByTagName("head")[0];
    i.appendChild(n);
  }
  var A0 = function() {
    var n = 0, i = null;
    return {
      add: function(l) {
        n == 0 && (i = N0()) && (R0(i, l), T0(i)), n++;
      },
      remove: function() {
        n--, !n && i && (i.parentNode && i.parentNode.removeChild(i), i = null);
      }
    };
  }, M0 = function() {
    var n = A0();
    return function(i, l) {
      h.useEffect(function() {
        return n.add(i), function() {
          n.remove();
        };
      }, [
        i && l
      ]);
    };
  }, tm = function() {
    var n = M0(), i = function(l) {
      var s = l.styles, c = l.dynamic;
      return n(s, c), null;
    };
    return i;
  }, D0 = {
    left: 0,
    top: 0,
    right: 0,
    gap: 0
  }, Ss = function(n) {
    return parseInt(n || "", 10) || 0;
  }, _0 = function(n) {
    var i = window.getComputedStyle(document.body), l = i[n === "padding" ? "paddingLeft" : "marginLeft"], s = i[n === "padding" ? "paddingTop" : "marginTop"], c = i[n === "padding" ? "paddingRight" : "marginRight"];
    return [
      Ss(l),
      Ss(s),
      Ss(c)
    ];
  }, O0 = function(n) {
    if (n === void 0 && (n = "margin"), typeof window > "u") return D0;
    var i = _0(n), l = document.documentElement.clientWidth, s = window.innerWidth;
    return {
      left: i[0],
      top: i[1],
      right: i[2],
      gap: Math.max(0, s - l + i[2] - i[0])
    };
  }, j0 = tm(), Pn = "data-scroll-locked", L0 = function(n, i, l, s) {
    var c = n.left, d = n.top, f = n.right, p = n.gap;
    return l === void 0 && (l = "margin"), `
  .`.concat(v0, ` {
   overflow: hidden `).concat(s, `;
   padding-right: `).concat(p, "px ").concat(s, `;
  }
  body[`).concat(Pn, `] {
    overflow: hidden `).concat(s, `;
    overscroll-behavior: contain;
    `).concat([
      i && "position: relative ".concat(s, ";"),
      l === "margin" && `
    padding-left: `.concat(c, `px;
    padding-top: `).concat(d, `px;
    padding-right: `).concat(f, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(p, "px ").concat(s, `;
    `),
      l === "padding" && "padding-right: ".concat(p, "px ").concat(s, ";")
    ].filter(Boolean).join(""), `
  }
  
  .`).concat(qi, ` {
    right: `).concat(p, "px ").concat(s, `;
  }
  
  .`).concat(Ji, ` {
    margin-right: `).concat(p, "px ").concat(s, `;
  }
  
  .`).concat(qi, " .").concat(qi, ` {
    right: 0 `).concat(s, `;
  }
  
  .`).concat(Ji, " .").concat(Ji, ` {
    margin-right: 0 `).concat(s, `;
  }
  
  body[`).concat(Pn, `] {
    `).concat(y0, ": ").concat(p, `px;
  }
`);
  }, Wf = function() {
    var n = parseInt(document.body.getAttribute(Pn) || "0", 10);
    return isFinite(n) ? n : 0;
  }, B0 = function() {
    h.useEffect(function() {
      return document.body.setAttribute(Pn, (Wf() + 1).toString()), function() {
        var n = Wf() - 1;
        n <= 0 ? document.body.removeAttribute(Pn) : document.body.setAttribute(Pn, n.toString());
      };
    }, []);
  }, z0 = function(n) {
    var i = n.noRelative, l = n.noImportant, s = n.gapMode, c = s === void 0 ? "margin" : s;
    B0();
    var d = h.useMemo(function() {
      return O0(c);
    }, [
      c
    ]);
    return h.createElement(j0, {
      styles: L0(d, !i, c, l ? "" : "!important")
    });
  }, Ts = false;
  if (typeof window < "u") try {
    var Ki = Object.defineProperty({}, "passive", {
      get: function() {
        return Ts = true, true;
      }
    });
    window.addEventListener("test", Ki, Ki), window.removeEventListener("test", Ki, Ki);
  } catch {
    Ts = false;
  }
  var wn = Ts ? {
    passive: false
  } : false, F0 = function(n) {
    return n.tagName === "TEXTAREA";
  }, rm = function(n, i) {
    if (!(n instanceof Element)) return false;
    var l = window.getComputedStyle(n);
    return l[i] !== "hidden" && !(l.overflowY === l.overflowX && !F0(n) && l[i] === "visible");
  }, I0 = function(n) {
    return rm(n, "overflowY");
  }, W0 = function(n) {
    return rm(n, "overflowX");
  }, Hf = function(n, i) {
    var l = i.ownerDocument, s = i;
    do {
      typeof ShadowRoot < "u" && s instanceof ShadowRoot && (s = s.host);
      var c = nm(n, s);
      if (c) {
        var d = om(n, s), f = d[1], p = d[2];
        if (f > p) return true;
      }
      s = s.parentNode;
    } while (s && s !== l.body);
    return false;
  }, H0 = function(n) {
    var i = n.scrollTop, l = n.scrollHeight, s = n.clientHeight;
    return [
      i,
      l,
      s
    ];
  }, $0 = function(n) {
    var i = n.scrollLeft, l = n.scrollWidth, s = n.clientWidth;
    return [
      i,
      l,
      s
    ];
  }, nm = function(n, i) {
    return n === "v" ? I0(i) : W0(i);
  }, om = function(n, i) {
    return n === "v" ? H0(i) : $0(i);
  }, U0 = function(n, i) {
    return n === "h" && i === "rtl" ? -1 : 1;
  }, V0 = function(n, i, l, s, c) {
    var d = U0(n, window.getComputedStyle(i).direction), f = d * s, p = l.target, v = i.contains(p), y = false, x = f > 0, k = 0, S = 0;
    do {
      var P = om(n, p), M = P[0], b = P[1], T = P[2], j = b - T - d * M;
      (M || j) && nm(n, p) && (k += j, S += M), p instanceof ShadowRoot ? p = p.host : p = p.parentNode;
    } while (!v && p !== document.body || v && (i.contains(p) || i === p));
    return (x && Math.abs(k) < 1 || !x && Math.abs(S) < 1) && (y = true), y;
  }, Qi = function(n) {
    return "changedTouches" in n ? [
      n.changedTouches[0].clientX,
      n.changedTouches[0].clientY
    ] : [
      0,
      0
    ];
  }, $f = function(n) {
    return [
      n.deltaX,
      n.deltaY
    ];
  }, Uf = function(n) {
    return n && "current" in n ? n.current : n;
  }, G0 = function(n, i) {
    return n[0] === i[0] && n[1] === i[1];
  }, K0 = function(n) {
    return `
  .block-interactivity-`.concat(n, ` {pointer-events: none;}
  .allow-interactivity-`).concat(n, ` {pointer-events: all;}
`);
  }, Q0 = 0, xn = [];
  function Y0(n) {
    var i = h.useRef([]), l = h.useRef([
      0,
      0
    ]), s = h.useRef(), c = h.useState(Q0++)[0], d = h.useState(tm)[0], f = h.useRef(n);
    h.useEffect(function() {
      f.current = n;
    }, [
      n
    ]), h.useEffect(function() {
      if (n.inert) {
        document.body.classList.add("block-interactivity-".concat(c));
        var b = g0([
          n.lockRef.current
        ], (n.shards || []).map(Uf), true).filter(Boolean);
        return b.forEach(function(T) {
          return T.classList.add("allow-interactivity-".concat(c));
        }), function() {
          document.body.classList.remove("block-interactivity-".concat(c)), b.forEach(function(T) {
            return T.classList.remove("allow-interactivity-".concat(c));
          });
        };
      }
    }, [
      n.inert,
      n.lockRef.current,
      n.shards
    ]);
    var p = h.useCallback(function(b, T) {
      if ("touches" in b && b.touches.length === 2 || b.type === "wheel" && b.ctrlKey) return !f.current.allowPinchZoom;
      var j = Qi(b), I = l.current, W = "deltaX" in b ? b.deltaX : I[0] - j[0], O = "deltaY" in b ? b.deltaY : I[1] - j[1], _, $ = b.target, U = Math.abs(W) > Math.abs(O) ? "h" : "v";
      if ("touches" in b && U === "h" && $.type === "range") return false;
      var Z = Hf(U, $);
      if (!Z) return true;
      if (Z ? _ = U : (_ = U === "v" ? "h" : "v", Z = Hf(U, $)), !Z) return false;
      if (!s.current && "changedTouches" in b && (W || O) && (s.current = _), !_) return true;
      var J = s.current || _;
      return V0(J, T, b, J === "h" ? W : O);
    }, []), v = h.useCallback(function(b) {
      var T = b;
      if (!(!xn.length || xn[xn.length - 1] !== d)) {
        var j = "deltaY" in T ? $f(T) : Qi(T), I = i.current.filter(function(_) {
          return _.name === T.type && (_.target === T.target || T.target === _.shadowParent) && G0(_.delta, j);
        })[0];
        if (I && I.should) {
          T.cancelable && T.preventDefault();
          return;
        }
        if (!I) {
          var W = (f.current.shards || []).map(Uf).filter(Boolean).filter(function(_) {
            return _.contains(T.target);
          }), O = W.length > 0 ? p(T, W[0]) : !f.current.noIsolation;
          O && T.cancelable && T.preventDefault();
        }
      }
    }, []), y = h.useCallback(function(b, T, j, I) {
      var W = {
        name: b,
        delta: T,
        target: j,
        should: I,
        shadowParent: X0(j)
      };
      i.current.push(W), setTimeout(function() {
        i.current = i.current.filter(function(O) {
          return O !== W;
        });
      }, 1);
    }, []), x = h.useCallback(function(b) {
      l.current = Qi(b), s.current = void 0;
    }, []), k = h.useCallback(function(b) {
      y(b.type, $f(b), b.target, p(b, n.lockRef.current));
    }, []), S = h.useCallback(function(b) {
      y(b.type, Qi(b), b.target, p(b, n.lockRef.current));
    }, []);
    h.useEffect(function() {
      return xn.push(d), n.setCallbacks({
        onScrollCapture: k,
        onWheelCapture: k,
        onTouchMoveCapture: S
      }), document.addEventListener("wheel", v, wn), document.addEventListener("touchmove", v, wn), document.addEventListener("touchstart", x, wn), function() {
        xn = xn.filter(function(b) {
          return b !== d;
        }), document.removeEventListener("wheel", v, wn), document.removeEventListener("touchmove", v, wn), document.removeEventListener("touchstart", x, wn);
      };
    }, []);
    var P = n.removeScrollBar, M = n.inert;
    return h.createElement(h.Fragment, null, M ? h.createElement(d, {
      styles: K0(c)
    }) : null, P ? h.createElement(z0, {
      gapMode: n.gapMode
    }) : null);
  }
  function X0(n) {
    for (var i = null; n !== null; ) n instanceof ShadowRoot && (i = n.host, n = n.host), n = n.parentNode;
    return i;
  }
  const q0 = b0(em, Y0);
  var qs = h.forwardRef(function(n, i) {
    return h.createElement(pl, Bt({}, n, {
      ref: i,
      sideCar: q0
    }));
  });
  qs.classNames = pl.classNames;
  var Js = "Popover", [im, IS] = Mn(Js, [
    Ip
  ]), Ao = Ip(), [J0, Tr] = im(Js), lm = (n) => {
    const { __scopePopover: i, children: l, open: s, defaultOpen: c, onOpenChange: d, modal: f = false } = n, p = Ao(i), v = h.useRef(null), [y, x] = h.useState(false), [k = false, S] = Xs({
      prop: s,
      defaultProp: c,
      onChange: d
    });
    return g.jsx(s0, {
      ...p,
      children: g.jsx(J0, {
        scope: i,
        contentId: Yi(),
        triggerRef: v,
        open: k,
        onOpenChange: S,
        onOpenToggle: h.useCallback(() => S((P) => !P), [
          S
        ]),
        hasCustomAnchor: y,
        onCustomAnchorAdd: h.useCallback(() => x(true), []),
        onCustomAnchorRemove: h.useCallback(() => x(false), []),
        modal: f,
        children: l
      })
    });
  };
  lm.displayName = Js;
  var am = "PopoverAnchor", Z0 = h.forwardRef((n, i) => {
    const { __scopePopover: l, ...s } = n, c = Tr(am, l), d = Ao(l), { onCustomAnchorAdd: f, onCustomAnchorRemove: p } = c;
    return h.useEffect(() => (f(), () => p()), [
      f,
      p
    ]), g.jsx(Yp, {
      ...d,
      ...s,
      ref: i
    });
  });
  Z0.displayName = am;
  var sm = "PopoverTrigger", um = h.forwardRef((n, i) => {
    const { __scopePopover: l, ...s } = n, c = Tr(sm, l), d = Ao(l), f = ze(i, c.triggerRef), p = g.jsx(je.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": c.open,
      "aria-controls": c.contentId,
      "data-state": mm(c.open),
      ...s,
      ref: f,
      onClick: Me(n.onClick, c.onOpenToggle)
    });
    return c.hasCustomAnchor ? p : g.jsx(Yp, {
      asChild: true,
      ...d,
      children: p
    });
  });
  um.displayName = sm;
  var Zs = "PopoverPortal", [ex, tx] = im(Zs, {
    forceMount: void 0
  }), cm = (n) => {
    const { __scopePopover: i, forceMount: l, children: s, container: c } = n, d = Tr(Zs, i);
    return g.jsx(ex, {
      scope: i,
      forceMount: l,
      children: g.jsx(At, {
        present: l || d.open,
        children: g.jsx(Ys, {
          asChild: true,
          container: c,
          children: s
        })
      })
    });
  };
  cm.displayName = Zs;
  var Tn = "PopoverContent", dm = h.forwardRef((n, i) => {
    const l = tx(Tn, n.__scopePopover), { forceMount: s = l.forceMount, ...c } = n, d = Tr(Tn, n.__scopePopover);
    return g.jsx(At, {
      present: s || d.open,
      children: d.modal ? g.jsx(rx, {
        ...c,
        ref: i
      }) : g.jsx(nx, {
        ...c,
        ref: i
      })
    });
  });
  dm.displayName = Tn;
  var rx = h.forwardRef((n, i) => {
    const l = Tr(Tn, n.__scopePopover), s = h.useRef(null), c = ze(i, s), d = h.useRef(false);
    return h.useEffect(() => {
      const f = s.current;
      if (f) return qp(f);
    }, []), g.jsx(qs, {
      as: Ro,
      allowPinchZoom: true,
      children: g.jsx(fm, {
        ...n,
        ref: c,
        trapFocus: l.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: Me(n.onCloseAutoFocus, (f) => {
          var _a;
          f.preventDefault(), d.current || ((_a = l.triggerRef.current) == null ? void 0 : _a.focus());
        }),
        onPointerDownOutside: Me(n.onPointerDownOutside, (f) => {
          const p = f.detail.originalEvent, v = p.button === 0 && p.ctrlKey === true, y = p.button === 2 || v;
          d.current = y;
        }, {
          checkForDefaultPrevented: false
        }),
        onFocusOutside: Me(n.onFocusOutside, (f) => f.preventDefault(), {
          checkForDefaultPrevented: false
        })
      })
    });
  }), nx = h.forwardRef((n, i) => {
    const l = Tr(Tn, n.__scopePopover), s = h.useRef(false), c = h.useRef(false);
    return g.jsx(fm, {
      ...n,
      ref: i,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      onCloseAutoFocus: (d) => {
        var _a, _b;
        (_a = n.onCloseAutoFocus) == null ? void 0 : _a.call(n, d), d.defaultPrevented || (s.current || ((_b = l.triggerRef.current) == null ? void 0 : _b.focus()), d.preventDefault()), s.current = false, c.current = false;
      },
      onInteractOutside: (d) => {
        var _a, _b;
        (_a = n.onInteractOutside) == null ? void 0 : _a.call(n, d), d.defaultPrevented || (s.current = true, d.detail.originalEvent.type === "pointerdown" && (c.current = true));
        const f = d.target;
        ((_b = l.triggerRef.current) == null ? void 0 : _b.contains(f)) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && c.current && d.preventDefault();
      }
    });
  }), fm = h.forwardRef((n, i) => {
    const { __scopePopover: l, trapFocus: s, onOpenAutoFocus: c, onCloseAutoFocus: d, disableOutsidePointerEvents: f, onEscapeKeyDown: p, onPointerDownOutside: v, onFocusOutside: y, onInteractOutside: x, ...k } = n, S = Tr(Tn, l), P = Ao(l);
    return bp(), g.jsx(Fs, {
      asChild: true,
      loop: true,
      trapped: s,
      onMountAutoFocus: c,
      onUnmountAutoFocus: d,
      children: g.jsx(zs, {
        asChild: true,
        disableOutsidePointerEvents: f,
        onInteractOutside: x,
        onEscapeKeyDown: p,
        onPointerDownOutside: v,
        onFocusOutside: y,
        onDismiss: () => S.onOpenChange(false),
        children: g.jsx(u0, {
          "data-state": mm(S.open),
          role: "dialog",
          id: S.contentId,
          ...P,
          ...k,
          ref: i,
          style: {
            ...k.style,
            "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
            "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
            "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
          }
        })
      })
    });
  }), pm = "PopoverClose", ox = h.forwardRef((n, i) => {
    const { __scopePopover: l, ...s } = n, c = Tr(pm, l);
    return g.jsx(je.button, {
      type: "button",
      ...s,
      ref: i,
      onClick: Me(n.onClick, () => c.onOpenChange(false))
    });
  });
  ox.displayName = pm;
  var ix = "PopoverArrow", lx = h.forwardRef((n, i) => {
    const { __scopePopover: l, ...s } = n, c = Ao(l);
    return g.jsx(c0, {
      ...c,
      ...s,
      ref: i
    });
  });
  lx.displayName = ix;
  function mm(n) {
    return n ? "open" : "closed";
  }
  var ax = lm, sx = um, ux = cm, hm = dm;
  const cx = ax, dx = sx, gm = h.forwardRef(({ className: n, align: i = "center", sideOffset: l = 4, ...s }, c) => g.jsx(ux, {
    children: g.jsx(hm, {
      ref: c,
      align: i,
      sideOffset: l,
      className: Be("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", n),
      ...s
    })
  }));
  gm.displayName = hm.displayName;
  const fx = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), vm = (...n) => n.filter((i, l, s) => !!i && i.trim() !== "" && s.indexOf(i) === l).join(" ").trim();
  var px = {
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
  const mx = h.forwardRef(({ color: n = "currentColor", size: i = 24, strokeWidth: l = 2, absoluteStrokeWidth: s, className: c = "", children: d, iconNode: f, ...p }, v) => h.createElement("svg", {
    ref: v,
    ...px,
    width: i,
    height: i,
    stroke: n,
    strokeWidth: s ? Number(l) * 24 / Number(i) : l,
    className: vm("lucide", c),
    ...p
  }, [
    ...f.map(([y, x]) => h.createElement(y, x)),
    ...Array.isArray(d) ? d : [
      d
    ]
  ]));
  const xt = (n, i) => {
    const l = h.forwardRef(({ className: s, ...c }, d) => h.createElement(mx, {
      ref: d,
      iconNode: i,
      className: vm(`lucide-${fx(n)}`, s),
      ...c
    }));
    return l.displayName = `${n}`, l;
  };
  const hx = xt("ArrowDown", [
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
  const gx = xt("Check", [
    [
      "path",
      {
        d: "M20 6 9 17l-5-5",
        key: "1gmf2c"
      }
    ]
  ]);
  const vx = xt("ChevronLeft", [
    [
      "path",
      {
        d: "m15 18-6-6 6-6",
        key: "1wnfg3"
      }
    ]
  ]);
  const yx = xt("ChevronRight", [
    [
      "path",
      {
        d: "m9 18 6-6-6-6",
        key: "mthhwq"
      }
    ]
  ]);
  const wx = xt("CirclePlus", [
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
  const Vf = xt("Copy", [
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
  const xx = xt("FileText", [
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
  const Sx = xt("Hash", [
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
  const kx = xt("Moon", [
    [
      "path",
      {
        d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
        key: "a7tn18"
      }
    ]
  ]);
  const Cx = xt("Sun", [
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
  const Px = xt("UserPlus", [
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
  const bx = xt("X", [
    [
      "path",
      {
        d: "M18 6 6 18",
        key: "1bl5f8"
      }
    ],
    [
      "path",
      {
        d: "m6 6 12 12",
        key: "d8bk6v"
      }
    ]
  ]), Ex = "modulepreload", Nx = function(n, i) {
    return new URL(n, i).href;
  }, Gf = {}, Rx = function(i, l, s) {
    let c = Promise.resolve();
    if (l && l.length > 0) {
      const f = document.getElementsByTagName("link"), p = document.querySelector("meta[property=csp-nonce]"), v = (p == null ? void 0 : p.nonce) || (p == null ? void 0 : p.getAttribute("nonce"));
      c = Promise.allSettled(l.map((y) => {
        if (y = Nx(y, s), y in Gf) return;
        Gf[y] = true;
        const x = y.endsWith(".css"), k = x ? '[rel="stylesheet"]' : "";
        if (!!s) for (let M = f.length - 1; M >= 0; M--) {
          const b = f[M];
          if (b.href === y && (!x || b.rel === "stylesheet")) return;
        }
        else if (document.querySelector(`link[href="${y}"]${k}`)) return;
        const P = document.createElement("link");
        if (P.rel = x ? "stylesheet" : Ex, x || (P.as = "script"), P.crossOrigin = "", P.href = y, v && P.setAttribute("nonce", v), document.head.appendChild(P), x) return new Promise((M, b) => {
          P.addEventListener("load", M), P.addEventListener("error", () => b(new Error(`Unable to preload CSS for ${y}`)));
        });
      }));
    }
    function d(f) {
      const p = new Event("vite:preloadError", {
        cancelable: true
      });
      if (p.payload = f, window.dispatchEvent(p), !p.defaultPrevented) throw f;
    }
    return c.then((f) => {
      for (const p of f || []) p.status === "rejected" && d(p.reason);
      return i().catch(d);
    });
  };
  class Tx {
    constructor() {
      __publicField(this, "logs", []);
      __publicField(this, "subscribers", /* @__PURE__ */ new Set());
    }
    error(i, l) {
      console.error(i, l), this.log(`${i} ${l || ""}`, "error");
    }
    info(i) {
      this.log(i);
    }
    log(i, l = "info") {
      const s = {
        timestamp: /* @__PURE__ */ new Date(),
        level: l,
        message: i
      };
      this.logs.push(s), this.notifySubscribers(s);
    }
    get() {
      return this.logs;
    }
    subscribe(i) {
      return this.subscribers.add(i), () => {
        this.subscribers.delete(i);
      };
    }
    notifySubscribers(i) {
      this.subscribers.forEach((l) => l(i));
    }
  }
  let Ax;
  Ft = new Tx();
  Ax = Dx();
  async function Mx() {
    return await Ax;
  }
  async function Dx() {
    try {
      Ft.info("Importing WASM module");
      const { IrohAPI: n } = await Rx(async () => {
        const { IrohAPI: i } = await import("./iroh-lvhzu6H2.js").then(async (m) => {
          await m.__tla;
          return m;
        });
        return {
          IrohAPI: i
        };
      }, [], import.meta.url);
      return await n.create();
    } catch (n) {
      throw Ft.error("Failed to import or launch iroh", n), n;
    }
  }
  let eu, wm, xm, _x, Mt, Sm;
  ym = ((n) => (n[n.Myself = 0] = "Myself", n[n.RemoteNode = 1] = "RemoteNode", n))(ym || {});
  eu = "Dialog";
  [wm, xm] = Mn(eu);
  [_x, Mt] = wm(eu);
  Sm = (n) => {
    const { __scopeDialog: i, children: l, open: s, defaultOpen: c, onOpenChange: d, modal: f = true } = n, p = h.useRef(null), v = h.useRef(null), [y = false, x] = Xs({
      prop: s,
      defaultProp: c,
      onChange: d
    });
    return g.jsx(_x, {
      scope: i,
      triggerRef: p,
      contentRef: v,
      contentId: Yi(),
      titleId: Yi(),
      descriptionId: Yi(),
      open: y,
      onOpenChange: x,
      onOpenToggle: h.useCallback(() => x((k) => !k), [
        x
      ]),
      modal: f,
      children: l
    });
  };
  Sm.displayName = eu;
  var km = "DialogTrigger", Cm = h.forwardRef((n, i) => {
    const { __scopeDialog: l, ...s } = n, c = Mt(km, l), d = ze(i, c.triggerRef);
    return g.jsx(je.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": c.open,
      "aria-controls": c.contentId,
      "data-state": nu(c.open),
      ...s,
      ref: d,
      onClick: Me(n.onClick, c.onOpenToggle)
    });
  });
  Cm.displayName = km;
  var tu = "DialogPortal", [Ox, Pm] = wm(tu, {
    forceMount: void 0
  }), bm = (n) => {
    const { __scopeDialog: i, forceMount: l, children: s, container: c } = n, d = Mt(tu, i);
    return g.jsx(Ox, {
      scope: i,
      forceMount: l,
      children: h.Children.map(s, (f) => g.jsx(At, {
        present: l || d.open,
        children: g.jsx(Ys, {
          asChild: true,
          container: c,
          children: f
        })
      }))
    });
  };
  bm.displayName = tu;
  var ll = "DialogOverlay", Em = h.forwardRef((n, i) => {
    const l = Pm(ll, n.__scopeDialog), { forceMount: s = l.forceMount, ...c } = n, d = Mt(ll, n.__scopeDialog);
    return d.modal ? g.jsx(At, {
      present: s || d.open,
      children: g.jsx(jx, {
        ...c,
        ref: i
      })
    }) : null;
  });
  Em.displayName = ll;
  var jx = h.forwardRef((n, i) => {
    const { __scopeDialog: l, ...s } = n, c = Mt(ll, l);
    return g.jsx(qs, {
      as: Ro,
      allowPinchZoom: true,
      shards: [
        c.contentRef
      ],
      children: g.jsx(je.div, {
        "data-state": nu(c.open),
        ...s,
        ref: i,
        style: {
          pointerEvents: "auto",
          ...s.style
        }
      })
    });
  }), Ur = "DialogContent", Nm = h.forwardRef((n, i) => {
    const l = Pm(Ur, n.__scopeDialog), { forceMount: s = l.forceMount, ...c } = n, d = Mt(Ur, n.__scopeDialog);
    return g.jsx(At, {
      present: s || d.open,
      children: d.modal ? g.jsx(Lx, {
        ...c,
        ref: i
      }) : g.jsx(Bx, {
        ...c,
        ref: i
      })
    });
  });
  Nm.displayName = Ur;
  var Lx = h.forwardRef((n, i) => {
    const l = Mt(Ur, n.__scopeDialog), s = h.useRef(null), c = ze(i, l.contentRef, s);
    return h.useEffect(() => {
      const d = s.current;
      if (d) return qp(d);
    }, []), g.jsx(Rm, {
      ...n,
      ref: c,
      trapFocus: l.open,
      disableOutsidePointerEvents: true,
      onCloseAutoFocus: Me(n.onCloseAutoFocus, (d) => {
        var _a;
        d.preventDefault(), (_a = l.triggerRef.current) == null ? void 0 : _a.focus();
      }),
      onPointerDownOutside: Me(n.onPointerDownOutside, (d) => {
        const f = d.detail.originalEvent, p = f.button === 0 && f.ctrlKey === true;
        (f.button === 2 || p) && d.preventDefault();
      }),
      onFocusOutside: Me(n.onFocusOutside, (d) => d.preventDefault())
    });
  }), Bx = h.forwardRef((n, i) => {
    const l = Mt(Ur, n.__scopeDialog), s = h.useRef(false), c = h.useRef(false);
    return g.jsx(Rm, {
      ...n,
      ref: i,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      onCloseAutoFocus: (d) => {
        var _a, _b;
        (_a = n.onCloseAutoFocus) == null ? void 0 : _a.call(n, d), d.defaultPrevented || (s.current || ((_b = l.triggerRef.current) == null ? void 0 : _b.focus()), d.preventDefault()), s.current = false, c.current = false;
      },
      onInteractOutside: (d) => {
        var _a, _b;
        (_a = n.onInteractOutside) == null ? void 0 : _a.call(n, d), d.defaultPrevented || (s.current = true, d.detail.originalEvent.type === "pointerdown" && (c.current = true));
        const f = d.target;
        ((_b = l.triggerRef.current) == null ? void 0 : _b.contains(f)) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && c.current && d.preventDefault();
      }
    });
  }), Rm = h.forwardRef((n, i) => {
    const { __scopeDialog: l, trapFocus: s, onOpenAutoFocus: c, onCloseAutoFocus: d, ...f } = n, p = Mt(Ur, l), v = h.useRef(null), y = ze(i, v);
    return bp(), g.jsxs(g.Fragment, {
      children: [
        g.jsx(Fs, {
          asChild: true,
          loop: true,
          trapped: s,
          onMountAutoFocus: c,
          onUnmountAutoFocus: d,
          children: g.jsx(zs, {
            role: "dialog",
            id: p.contentId,
            "aria-describedby": p.descriptionId,
            "aria-labelledby": p.titleId,
            "data-state": nu(p.open),
            ...f,
            ref: y,
            onDismiss: () => p.onOpenChange(false)
          })
        }),
        g.jsxs(g.Fragment, {
          children: [
            g.jsx(Fx, {
              titleId: p.titleId
            }),
            g.jsx(Wx, {
              contentRef: v,
              descriptionId: p.descriptionId
            })
          ]
        })
      ]
    });
  }), ru = "DialogTitle", Tm = h.forwardRef((n, i) => {
    const { __scopeDialog: l, ...s } = n, c = Mt(ru, l);
    return g.jsx(je.h2, {
      id: c.titleId,
      ...s,
      ref: i
    });
  });
  Tm.displayName = ru;
  var Am = "DialogDescription", Mm = h.forwardRef((n, i) => {
    const { __scopeDialog: l, ...s } = n, c = Mt(Am, l);
    return g.jsx(je.p, {
      id: c.descriptionId,
      ...s,
      ref: i
    });
  });
  Mm.displayName = Am;
  var Dm = "DialogClose", _m = h.forwardRef((n, i) => {
    const { __scopeDialog: l, ...s } = n, c = Mt(Dm, l);
    return g.jsx(je.button, {
      type: "button",
      ...s,
      ref: i,
      onClick: Me(n.onClick, () => c.onOpenChange(false))
    });
  });
  _m.displayName = Dm;
  function nu(n) {
    return n ? "open" : "closed";
  }
  var Om = "DialogTitleWarning", [zx, jm] = ky(Om, {
    contentName: Ur,
    titleName: ru,
    docsSlug: "dialog"
  }), Fx = ({ titleId: n }) => {
    const i = jm(Om), l = `\`${i.contentName}\` requires a \`${i.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${i.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${i.docsSlug}`;
    return h.useEffect(() => {
      n && (document.getElementById(n) || console.error(l));
    }, [
      l,
      n
    ]), null;
  }, Ix = "DialogDescriptionWarning", Wx = ({ contentRef: n, descriptionId: i }) => {
    const s = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${jm(Ix).contentName}}.`;
    return h.useEffect(() => {
      var _a;
      const c = (_a = n.current) == null ? void 0 : _a.getAttribute("aria-describedby");
      i && c && (document.getElementById(i) || console.warn(s));
    }, [
      s,
      n,
      i
    ]), null;
  }, Lm = Sm, Bm = Cm, zm = bm, ou = Em, iu = Nm, lu = Tm, au = Mm, su = _m, Fm = "AlertDialog", [Hx, WS] = Mn(Fm, [
    xm
  ]), tr = xm(), Im = (n) => {
    const { __scopeAlertDialog: i, ...l } = n, s = tr(i);
    return g.jsx(Lm, {
      ...s,
      ...l,
      modal: true
    });
  };
  Im.displayName = Fm;
  var $x = "AlertDialogTrigger", Wm = h.forwardRef((n, i) => {
    const { __scopeAlertDialog: l, ...s } = n, c = tr(l);
    return g.jsx(Bm, {
      ...c,
      ...s,
      ref: i
    });
  });
  Wm.displayName = $x;
  var Ux = "AlertDialogPortal", Hm = (n) => {
    const { __scopeAlertDialog: i, ...l } = n, s = tr(i);
    return g.jsx(zm, {
      ...s,
      ...l
    });
  };
  Hm.displayName = Ux;
  var Vx = "AlertDialogOverlay", $m = h.forwardRef((n, i) => {
    const { __scopeAlertDialog: l, ...s } = n, c = tr(l);
    return g.jsx(ou, {
      ...c,
      ...s,
      ref: i
    });
  });
  $m.displayName = Vx;
  var bn = "AlertDialogContent", [Gx, Kx] = Hx(bn), Um = h.forwardRef((n, i) => {
    const { __scopeAlertDialog: l, children: s, ...c } = n, d = tr(l), f = h.useRef(null), p = ze(i, f), v = h.useRef(null);
    return g.jsx(zx, {
      contentName: bn,
      titleName: Vm,
      docsSlug: "alert-dialog",
      children: g.jsx(Gx, {
        scope: l,
        cancelRef: v,
        children: g.jsxs(iu, {
          role: "alertdialog",
          ...d,
          ...c,
          ref: p,
          onOpenAutoFocus: Me(c.onOpenAutoFocus, (y) => {
            var _a;
            y.preventDefault(), (_a = v.current) == null ? void 0 : _a.focus({
              preventScroll: true
            });
          }),
          onPointerDownOutside: (y) => y.preventDefault(),
          onInteractOutside: (y) => y.preventDefault(),
          children: [
            g.jsx(rp, {
              children: s
            }),
            g.jsx(Yx, {
              contentRef: f
            })
          ]
        })
      })
    });
  });
  Um.displayName = bn;
  var Vm = "AlertDialogTitle", Gm = h.forwardRef((n, i) => {
    const { __scopeAlertDialog: l, ...s } = n, c = tr(l);
    return g.jsx(lu, {
      ...c,
      ...s,
      ref: i
    });
  });
  Gm.displayName = Vm;
  var Km = "AlertDialogDescription", Qm = h.forwardRef((n, i) => {
    const { __scopeAlertDialog: l, ...s } = n, c = tr(l);
    return g.jsx(au, {
      ...c,
      ...s,
      ref: i
    });
  });
  Qm.displayName = Km;
  var Qx = "AlertDialogAction", Ym = h.forwardRef((n, i) => {
    const { __scopeAlertDialog: l, ...s } = n, c = tr(l);
    return g.jsx(su, {
      ...c,
      ...s,
      ref: i
    });
  });
  Ym.displayName = Qx;
  var Xm = "AlertDialogCancel", qm = h.forwardRef((n, i) => {
    const { __scopeAlertDialog: l, ...s } = n, { cancelRef: c } = Kx(Xm, l), d = tr(l), f = ze(i, c);
    return g.jsx(su, {
      ...d,
      ...s,
      ref: f
    });
  });
  qm.displayName = Xm;
  var Yx = ({ contentRef: n }) => {
    const i = `\`${bn}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${bn}\` by passing a \`${Km}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${bn}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
    return h.useEffect(() => {
      var _a;
      document.getElementById((_a = n.current) == null ? void 0 : _a.getAttribute("aria-describedby")) || console.warn(i);
    }, [
      i,
      n
    ]), null;
  }, Xx = Im, qx = Wm, Jx = Hm, Jm = $m, Zm = Um, eh = Ym, th = qm, rh = Gm, nh = Qm;
  const Zx = Xx, eS = qx, tS = Jx, oh = h.forwardRef(({ className: n, ...i }, l) => g.jsx(Jm, {
    className: Be("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", n),
    ...i,
    ref: l
  }));
  oh.displayName = Jm.displayName;
  const ih = h.forwardRef(({ className: n, ...i }, l) => g.jsxs(tS, {
    children: [
      g.jsx(oh, {}),
      g.jsx(Zm, {
        ref: l,
        className: Be("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", n),
        ...i
      })
    ]
  }));
  ih.displayName = Zm.displayName;
  const lh = ({ className: n, ...i }) => g.jsx("div", {
    className: Be("flex flex-col space-y-2 text-center sm:text-left", n),
    ...i
  });
  lh.displayName = "AlertDialogHeader";
  const ah = ({ className: n, ...i }) => g.jsx("div", {
    className: Be("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", n),
    ...i
  });
  ah.displayName = "AlertDialogFooter";
  const sh = h.forwardRef(({ className: n, ...i }, l) => g.jsx(rh, {
    ref: l,
    className: Be("text-lg font-semibold", n),
    ...i
  }));
  sh.displayName = rh.displayName;
  const uh = h.forwardRef(({ className: n, ...i }, l) => g.jsx(nh, {
    ref: l,
    className: Be("text-sm text-muted-foreground", n),
    ...i
  }));
  uh.displayName = nh.displayName;
  const ch = h.forwardRef(({ className: n, ...i }, l) => g.jsx(eh, {
    ref: l,
    className: Be(Ds(), n),
    ...i
  }));
  ch.displayName = eh.displayName;
  const dh = h.forwardRef(({ className: n, ...i }, l) => g.jsx(th, {
    ref: l,
    className: Be(Ds({
      variant: "outline"
    }), "mt-2 sm:mt-0", n),
    ...i
  }));
  dh.displayName = th.displayName;
  function rS({ onConfirm: n }) {
    return g.jsxs(Zx, {
      children: [
        g.jsx(eS, {
          asChild: true,
          children: g.jsx(We, {
            size: "sm",
            variant: "destructive",
            children: "Leave channel"
          })
        }),
        g.jsxs(ih, {
          children: [
            g.jsxs(lh, {
              children: [
                g.jsx(sh, {
                  children: "Are you sure?"
                }),
                g.jsxs(uh, {
                  children: [
                    "If you want to rejoin the channel, make sure to save a ticket first by clicking the ",
                    g.jsx("em", {
                      children: "Invite"
                    }),
                    " button."
                  ]
                })
              ]
            }),
            g.jsxs(ah, {
              children: [
                g.jsx(dh, {
                  children: "Cancel"
                }),
                g.jsx(ch, {
                  onClick: n,
                  children: "Leave channel"
                })
              ]
            })
          ]
        })
      ]
    });
  }
  const fh = Lm, nS = Bm, oS = zm, ph = h.forwardRef(({ className: n, ...i }, l) => g.jsx(ou, {
    ref: l,
    className: Be("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", n),
    ...i
  }));
  ph.displayName = ou.displayName;
  const uu = h.forwardRef(({ className: n, children: i, ...l }, s) => g.jsxs(oS, {
    children: [
      g.jsx(ph, {}),
      g.jsxs(iu, {
        ref: s,
        className: Be("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", n),
        ...l,
        children: [
          i,
          g.jsxs(su, {
            className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
            children: [
              g.jsx(bx, {
                className: "h-4 w-4"
              }),
              g.jsx("span", {
                className: "sr-only",
                children: "Close"
              })
            ]
          })
        ]
      })
    ]
  }));
  uu.displayName = iu.displayName;
  const mh = ({ className: n, ...i }) => g.jsx("div", {
    className: Be("flex flex-col space-y-1.5 text-center sm:text-left", n),
    ...i
  });
  mh.displayName = "DialogHeader";
  const cu = h.forwardRef(({ className: n, ...i }, l) => g.jsx(lu, {
    ref: l,
    className: Be("text-lg font-semibold leading-none tracking-tight", n),
    ...i
  }));
  cu.displayName = lu.displayName;
  const iS = h.forwardRef(({ className: n, ...i }, l) => g.jsx(au, {
    ref: l,
    className: Be("text-sm text-muted-foreground", n),
    ...i
  }));
  iS.displayName = au.displayName;
  function lS({ api: n, channel: i }) {
    const [l, s] = h.useState(n.getMyself(i)), [c, d] = h.useState(l.name), [f, p] = h.useState(false);
    h.useEffect(() => n.subscribeToPeers(i, () => {
      s(n.getMyself(i));
    }), [
      n,
      i
    ]);
    const v = (y) => {
      y.preventDefault(), c.trim() && (n.setNickname(i, c), p(false));
    };
    return g.jsxs(fh, {
      open: f,
      onOpenChange: p,
      children: [
        g.jsx(nS, {
          asChild: true,
          children: g.jsx(We, {
            variant: "secondary",
            size: "sm",
            children: "Change nickname"
          })
        }),
        g.jsxs(uu, {
          className: "sm:max-w-[425px]",
          children: [
            g.jsx(mh, {
              children: g.jsx(cu, {
                children: "Change nickname"
              })
            }),
            g.jsxs("form", {
              onSubmit: v,
              className: "flex space-x-2",
              children: [
                g.jsx(En, {
                  value: c,
                  onChange: (y) => d(y.target.value),
                  placeholder: "Enter your nickname"
                }),
                g.jsx(We, {
                  size: "sm",
                  type: "submit",
                  children: "Save"
                })
              ]
            })
          ]
        })
      ]
    });
  }
  function aS({ api: n, channel: i, onClose: l }) {
    const [s, c] = h.useState([]), [d, f] = h.useState(""), [p, v] = h.useState([]), [y, x] = h.useState(0), [k, S] = h.useState(false), [P, M] = h.useState(true), b = h.useRef(null), T = h.useRef(null), j = h.useCallback(() => {
      b.current && b.current.scrollIntoView({
        behavior: "smooth"
      }), S(false), M(true);
    }, []);
    h.useEffect(() => n.subscribeToNeighbors(i, x), [
      i
    ]), h.useEffect(() => (v([
      ...n.getPeers(i)
    ]), n.subscribeToPeers(i, () => v([
      ...n.getPeers(i)
    ]))), [
      i
    ]), h.useEffect(() => (c(n.getMessages(i)), j(), n.subscribeToMessages(i, ($) => {
      c((U) => {
        if (!U.some((Z) => Z.id === $.id)) {
          const Z = [
            ...U,
            $
          ];
          return P ? setTimeout(j, 0) : S(true), Z;
        }
        return U;
      }), Ft.info(`New message received: ${$.content}`);
    })), [
      i,
      P,
      j
    ]);
    const I = async (_) => {
      if (_.preventDefault(), d.trim()) try {
        await n.sendMessage(i, d.trim()), f(""), Ft.info(`Message sent in channel ${i}: ${d.trim()}`);
      } catch ($) {
        Ft.error("Failed to send message", $);
      }
    }, W = [
      ...p
    ].sort((_, $) => {
      const U = {
        online: 0,
        away: 1,
        offline: 2
      };
      return U[_.status] - U[$.status];
    }), O = h.useCallback(() => {
      if (T.current) {
        const { scrollTop: _, scrollHeight: $, clientHeight: U } = T.current, Z = _ + U >= $ - 10;
        M(Z), S(!Z);
      }
    }, []);
    return h.useEffect(() => {
      P && j();
    }, [
      P,
      j
    ]), h.useEffect(() => {
      const _ = T.current;
      if (_) return _.addEventListener("scroll", O), () => _.removeEventListener("scroll", O);
    }, [
      O
    ]), g.jsxs("div", {
      className: "flex flex-grow overflow-hidden",
      children: [
        g.jsxs("div", {
          className: "flex-grow flex flex-col p-4 relative",
          children: [
            g.jsxs(bo, {
              className: "flex-grow mb-4 border rounded-md p-4",
              ref: T,
              onScroll: O,
              children: [
                s.map((_) => g.jsxs("div", {
                  className: "mb-2",
                  children: [
                    g.jsxs("span", {
                      className: "font-bold",
                      children: [
                        _.nickname || _.sender.substring(0, 8),
                        ": "
                      ]
                    }),
                    _.content
                  ]
                }, _.id)),
                g.jsx("div", {
                  ref: b
                })
              ]
            }),
            k && g.jsx(We, {
              className: "absolute bottom-20 right-4 rounded-full p-2",
              onClick: j,
              size: "icon",
              children: g.jsx(hx, {
                className: "h-4 w-4"
              })
            }),
            g.jsxs("form", {
              onSubmit: I,
              className: "flex space-x-2",
              children: [
                g.jsx(En, {
                  value: d,
                  onChange: (_) => f(_.target.value),
                  placeholder: "Type your message...",
                  className: "flex-grow"
                }),
                g.jsx(We, {
                  type: "submit",
                  children: "Send"
                })
              ]
            })
          ]
        }),
        g.jsxs("div", {
          className: "w-1/4 p-4 border-l flex flex-col",
          children: [
            g.jsxs("div", {
              className: "mb-4",
              children: [
                g.jsx("h2", {
                  className: "font-bold mb-2",
                  children: "Status"
                }),
                y > 0 && g.jsxs("p", {
                  children: [
                    "Connected ",
                    g.jsxs("span", {
                      className: "text-sm",
                      children: [
                        "(",
                        y,
                        " neighbors)"
                      ]
                    })
                  ]
                }),
                y === 0 && g.jsx("p", {
                  children: "Waiting for peers"
                })
              ]
            }),
            g.jsxs("div", {
              className: "mb-4 flex space-x-2",
              children: [
                g.jsx(lS, {
                  api: n,
                  channel: i
                }),
                g.jsx(rS, {
                  onConfirm: l
                })
              ]
            }),
            g.jsx("h2", {
              className: "font-bold mb-2",
              children: "Peers"
            }),
            g.jsx("div", {
              className: "flex-grow",
              children: g.jsx(bo, {
                className: "h-full",
                children: W.map((_) => g.jsx(sS, {
                  peer: _
                }, _.id))
              })
            })
          ]
        })
      ]
    });
  }
  function sS({ peer: n }) {
    const i = n.role == ym.Myself, l = i ? g.jsx(uS, {
      peer: n
    }) : g.jsx(cS, {
      peer: n
    });
    return g.jsxs(cx, {
      children: [
        g.jsx(dx, {
          asChild: true,
          children: g.jsxs("div", {
            className: "flex items-center mb-2 cursor-pointer",
            children: [
              g.jsx("div", {
                className: `w-2 h-2 rounded-full mr-2 ${fS(n.status)}`
              }),
              g.jsx("span", {
                className: al(i && "italic"),
                children: n.name
              })
            ]
          })
        }),
        g.jsx(gm, {
          className: "w-80 bg-secondary",
          children: l
        })
      ]
    });
  }
  function uS({ peer: n }) {
    return g.jsxs("div", {
      className: "space-y-2",
      children: [
        "This is us :)",
        g.jsxs("div", {
          children: [
            g.jsx("strong", {
              children: "Node ID:"
            }),
            g.jsx(hh, {
              nodeId: n.id
            })
          ]
        })
      ]
    });
  }
  function cS({ peer: n }) {
    return g.jsxs("div", {
      className: "space-y-2",
      children: [
        g.jsxs("p", {
          children: [
            g.jsx("strong", {
              children: "Last seen:"
            }),
            " ",
            g.jsx(hy, {
              date: n.lastSeen
            })
          ]
        }),
        g.jsxs("div", {
          children: [
            g.jsx("strong", {
              children: "Node ID:"
            }),
            g.jsx(hh, {
              nodeId: n.id
            })
          ]
        })
      ]
    });
  }
  function hh({ nodeId: n }) {
    return g.jsxs(g.Fragment, {
      children: [
        g.jsxs("span", {
          className: "ml-2 font-mono",
          children: [
            n.substring(0, 8),
            "\u2026"
          ]
        }),
        g.jsx(We, {
          size: "sm",
          onClick: () => dS(n),
          className: "ml-2 inline",
          variant: "outline",
          children: "Copy"
        })
      ]
    });
  }
  function dS(n) {
    navigator.clipboard.writeText(n);
  }
  function fS(n) {
    switch (n) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  }
  var pS = (n, i, l, s, c, d, f, p) => {
    let v = document.documentElement, y = [
      "light",
      "dark"
    ];
    function x(P) {
      (Array.isArray(n) ? n : [
        n
      ]).forEach((M) => {
        let b = M === "class", T = b && d ? c.map((j) => d[j] || j) : c;
        b ? (v.classList.remove(...T), v.classList.add(P)) : v.setAttribute(M, P);
      }), k(P);
    }
    function k(P) {
      p && y.includes(P) && (v.style.colorScheme = P);
    }
    function S() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    if (s) x(s);
    else try {
      let P = localStorage.getItem(i) || l, M = f && P === "system" ? S() : P;
      x(M);
    } catch {
    }
  }, Kf = [
    "light",
    "dark"
  ], gh = "(prefers-color-scheme: dark)", mS = typeof window > "u", du = h.createContext(void 0), hS = {
    setTheme: (n) => {
    },
    themes: []
  }, gS = () => {
    var n;
    return (n = h.useContext(du)) != null ? n : hS;
  }, vS = (n) => h.useContext(du) ? h.createElement(h.Fragment, null, n.children) : h.createElement(wS, {
    ...n
  }), yS = [
    "light",
    "dark"
  ], wS = ({ forcedTheme: n, disableTransitionOnChange: i = false, enableSystem: l = true, enableColorScheme: s = true, storageKey: c = "theme", themes: d = yS, defaultTheme: f = l ? "system" : "light", attribute: p = "data-theme", value: v, children: y, nonce: x, scriptProps: k }) => {
    let [S, P] = h.useState(() => Qf(c, f)), [M, b] = h.useState(() => Qf(c)), T = v ? Object.values(v) : d, j = h.useCallback((_) => {
      let $ = _;
      if (!$) return;
      _ === "system" && l && ($ = Yf());
      let U = v ? v[$] : $, Z = i ? SS(x) : null, J = document.documentElement, oe = (ae) => {
        ae === "class" ? (J.classList.remove(...T), U && J.classList.add(U)) : ae.startsWith("data-") && (U ? J.setAttribute(ae, U) : J.removeAttribute(ae));
      };
      if (Array.isArray(p) ? p.forEach(oe) : oe(p), s) {
        let ae = Kf.includes(f) ? f : null, te = Kf.includes($) ? $ : ae;
        J.style.colorScheme = te;
      }
      Z == null ? void 0 : Z();
    }, [
      x
    ]), I = h.useCallback((_) => {
      let $ = typeof _ == "function" ? _(S) : _;
      P($);
      try {
        localStorage.setItem(c, $);
      } catch {
      }
    }, [
      S
    ]), W = h.useCallback((_) => {
      let $ = Yf(_);
      b($), S === "system" && l && !n && j("system");
    }, [
      S,
      n
    ]);
    h.useEffect(() => {
      let _ = window.matchMedia(gh);
      return _.addListener(W), W(_), () => _.removeListener(W);
    }, [
      W
    ]), h.useEffect(() => {
      let _ = ($) => {
        $.key === c && ($.newValue ? P($.newValue) : I(f));
      };
      return window.addEventListener("storage", _), () => window.removeEventListener("storage", _);
    }, [
      I
    ]), h.useEffect(() => {
      j(n ?? S);
    }, [
      n,
      S
    ]);
    let O = h.useMemo(() => ({
      theme: S,
      setTheme: I,
      forcedTheme: n,
      resolvedTheme: S === "system" ? M : S,
      themes: l ? [
        ...d,
        "system"
      ] : d,
      systemTheme: l ? M : void 0
    }), [
      S,
      I,
      n,
      M,
      l,
      d
    ]);
    return h.createElement(du.Provider, {
      value: O
    }, h.createElement(xS, {
      forcedTheme: n,
      storageKey: c,
      attribute: p,
      enableSystem: l,
      enableColorScheme: s,
      defaultTheme: f,
      value: v,
      themes: d,
      nonce: x,
      scriptProps: k
    }), y);
  }, xS = h.memo(({ forcedTheme: n, storageKey: i, attribute: l, enableSystem: s, enableColorScheme: c, defaultTheme: d, value: f, themes: p, nonce: v, scriptProps: y }) => {
    let x = JSON.stringify([
      l,
      i,
      d,
      n,
      p,
      f,
      s,
      c
    ]).slice(1, -1);
    return h.createElement("script", {
      ...y,
      suppressHydrationWarning: true,
      nonce: typeof window > "u" ? v : "",
      dangerouslySetInnerHTML: {
        __html: `(${pS.toString()})(${x})`
      }
    });
  }), Qf = (n, i) => {
    if (mS) return;
    let l;
    try {
      l = localStorage.getItem(n) || void 0;
    } catch {
    }
    return l || i;
  }, SS = (n) => {
    let i = document.createElement("style");
    return n && i.setAttribute("nonce", n), i.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")), document.head.appendChild(i), () => {
      window.getComputedStyle(document.body), setTimeout(() => {
        document.head.removeChild(i);
      }, 1);
    };
  }, Yf = (n) => (n || (n = window.matchMedia(gh)), n.matches ? "dark" : "light");
  function vh({ onLogsClick: n, onInviteClick: i, title: l }) {
    return g.jsxs("header", {
      className: "bg-background text-foreground p-4 flex justify-between items-center",
      children: [
        g.jsx("div", {
          className: "flex items-center",
          children: l && g.jsx("h1", {
            className: "text-xl font-bold mr-4",
            children: l
          })
        }),
        g.jsxs("div", {
          className: "flex items-center space-x-2",
          children: [
            i && g.jsxs(We, {
              onClick: i,
              variant: "default",
              children: [
                g.jsx(Px, {
                  className: "w-4 h-4 mr-2"
                }),
                "Invite"
              ]
            }),
            g.jsxs(We, {
              onClick: n,
              variant: "secondary",
              children: [
                g.jsx(xx, {
                  className: "w-4 h-4 mr-2"
                }),
                "Logs"
              ]
            }),
            g.jsx(kS, {})
          ]
        })
      ]
    });
  }
  function kS() {
    const { theme: n, setTheme: i } = gS(), [l, s] = h.useState(false);
    return h.useEffect(() => s(true), []), l ? g.jsxs(We, {
      variant: "ghost",
      size: "icon",
      onClick: () => i(n === "light" ? "dark" : "light"),
      children: [
        n === "light" ? g.jsx(kx, {
          className: "h-5 w-5"
        }) : g.jsx(Cx, {
          className: "h-5 w-5"
        }),
        g.jsx("span", {
          className: "sr-only",
          children: "Toggle theme"
        })
      ]
    }) : null;
  }
  function yh({ onClose: n }) {
    const i = CS(), l = (c) => c.toTimeString().split(" ")[0] + "." + c.getMilliseconds().toString().padStart(3, "0").slice(0, 2), s = (c) => {
      switch (c) {
        case "error":
          return "text-red-500";
        case "warn":
          return "text-yellow-500";
        default:
          return "text-foreground";
      }
    };
    return g.jsx("div", {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center",
      children: g.jsxs("div", {
        className: "bg-background text-foreground p-4 rounded-lg w-full max-w-2xl h-[80vh] flex flex-col",
        children: [
          g.jsx("h2", {
            className: "text-lg font-semibold mb-2",
            children: "Log View"
          }),
          g.jsx(bo, {
            className: "flex-grow mb-4 font-mono",
            children: g.jsx("div", {
              className: "space-y-1",
              children: i.map((c, d) => g.jsxs("div", {
                className: `${s(c.level)}`,
                children: [
                  g.jsx("span", {
                    className: "text-muted-foreground",
                    children: l(c.timestamp)
                  }),
                  " ",
                  c.message
                ]
              }, d))
            })
          }),
          g.jsx(We, {
            onClick: n,
            children: "Close"
          })
        ]
      })
    });
  }
  function CS() {
    const [n, i] = h.useState([
      ...Ft.get()
    ]);
    return h.useEffect(() => {
      const l = Ft.subscribe((s) => {
        i((c) => [
          ...c,
          s
        ]);
      });
      return () => l();
    }, []), n;
  }
  function PS({ channels: n, activeChannel: i, onChannelSelect: l, onNewChannel: s }) {
    const [c, d] = h.useState(false);
    return g.jsxs("div", {
      className: `bg-secondary h-full flex flex-col transition-all duration-300 ${c ? "w-12" : "w-64"}`,
      children: [
        g.jsxs("div", {
          className: "p-4 flex justify-between items-center",
          children: [
            !c && g.jsx("h2", {
              className: "text-lg font-semibold",
              children: "Channels"
            }),
            g.jsx(We, {
              variant: "ghost",
              size: "icon",
              onClick: () => d(!c),
              children: c ? g.jsx(yx, {
                className: "h-5 w-5"
              }) : g.jsx(vx, {
                className: "h-5 w-5"
              })
            })
          ]
        }),
        g.jsx(bo, {
          className: "flex-grow",
          children: n.map((f) => {
            const p = al(f.id === i && "bg-primary/10", c ? "px-2" : "px-4");
            return g.jsxs(We, {
              variant: "ghost",
              className: `w-full justify-start px-4 py-2 hover:bg-primary/20 rounded-none ${p}`,
              onClick: () => l(f.id),
              children: [
                g.jsx(Sx, {
                  className: "h-4 w-4 mr-2"
                }),
                !c && f.name
              ]
            }, f.id);
          })
        }),
        g.jsxs(We, {
          variant: "default",
          onClick: s,
          className: "m-4",
          children: [
            g.jsx(wx, {
              className: "h-5 w-5"
            }),
            "Add channel"
          ]
        })
      ]
    });
  }
  function bS(n) {
    const i = h.useRef({
      value: n,
      previous: n
    });
    return h.useMemo(() => (i.current.value !== n && (i.current.previous = i.current.value, i.current.value = n), i.current.previous), [
      n
    ]);
  }
  var fu = "Checkbox", [ES, HS] = Mn(fu), [NS, RS] = ES(fu), wh = h.forwardRef((n, i) => {
    const { __scopeCheckbox: l, name: s, checked: c, defaultChecked: d, required: f, disabled: p, value: v = "on", onCheckedChange: y, form: x, ...k } = n, [S, P] = h.useState(null), M = ze(i, (O) => P(O)), b = h.useRef(false), T = S ? x || !!S.closest("form") : true, [j = false, I] = Xs({
      prop: c,
      defaultProp: d,
      onChange: y
    }), W = h.useRef(j);
    return h.useEffect(() => {
      const O = S == null ? void 0 : S.form;
      if (O) {
        const _ = () => I(W.current);
        return O.addEventListener("reset", _), () => O.removeEventListener("reset", _);
      }
    }, [
      S,
      I
    ]), g.jsxs(NS, {
      scope: l,
      state: j,
      disabled: p,
      children: [
        g.jsx(je.button, {
          type: "button",
          role: "checkbox",
          "aria-checked": Pr(j) ? "mixed" : j,
          "aria-required": f,
          "data-state": kh(j),
          "data-disabled": p ? "" : void 0,
          disabled: p,
          value: v,
          ...k,
          ref: M,
          onKeyDown: Me(n.onKeyDown, (O) => {
            O.key === "Enter" && O.preventDefault();
          }),
          onClick: Me(n.onClick, (O) => {
            I((_) => Pr(_) ? true : !_), T && (b.current = O.isPropagationStopped(), b.current || O.stopPropagation());
          })
        }),
        T && g.jsx(TS, {
          control: S,
          bubbles: !b.current,
          name: s,
          value: v,
          checked: j,
          required: f,
          disabled: p,
          form: x,
          style: {
            transform: "translateX(-100%)"
          },
          defaultChecked: Pr(d) ? false : d
        })
      ]
    });
  });
  wh.displayName = fu;
  var xh = "CheckboxIndicator", Sh = h.forwardRef((n, i) => {
    const { __scopeCheckbox: l, forceMount: s, ...c } = n, d = RS(xh, l);
    return g.jsx(At, {
      present: s || Pr(d.state) || d.state === true,
      children: g.jsx(je.span, {
        "data-state": kh(d.state),
        "data-disabled": d.disabled ? "" : void 0,
        ...c,
        ref: i,
        style: {
          pointerEvents: "none",
          ...n.style
        }
      })
    });
  });
  Sh.displayName = xh;
  var TS = (n) => {
    const { control: i, checked: l, bubbles: s = true, defaultChecked: c, ...d } = n, f = h.useRef(null), p = bS(l), v = zp(i);
    h.useEffect(() => {
      const x = f.current, k = window.HTMLInputElement.prototype, P = Object.getOwnPropertyDescriptor(k, "checked").set;
      if (p !== l && P) {
        const M = new Event("click", {
          bubbles: s
        });
        x.indeterminate = Pr(l), P.call(x, Pr(l) ? false : l), x.dispatchEvent(M);
      }
    }, [
      p,
      l,
      s
    ]);
    const y = h.useRef(Pr(l) ? false : l);
    return g.jsx("input", {
      type: "checkbox",
      "aria-hidden": true,
      defaultChecked: c ?? y.current,
      ...d,
      tabIndex: -1,
      ref: f,
      style: {
        ...n.style,
        ...v,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0
      }
    });
  };
  function Pr(n) {
    return n === "indeterminate";
  }
  function kh(n) {
    return Pr(n) ? "indeterminate" : n ? "checked" : "unchecked";
  }
  var Ch = wh, AS = Sh;
  const Zi = h.forwardRef(({ className: n, ...i }, l) => g.jsx(Ch, {
    ref: l,
    className: Be("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", n),
    ...i,
    children: g.jsx(AS, {
      className: Be("flex items-center justify-center text-current"),
      children: g.jsx(gx, {
        className: "h-4 w-4"
      })
    })
  }));
  Zi.displayName = Ch.displayName;
  function Xf(n) {
    const i = new URL(document.location.toString());
    return i.searchParams.set("ticket", n), i.toString();
  }
  function MS({ open: n, onOpenChange: i, channel: l, getTicket: s }) {
    const [c, d] = h.useState({
      includeMyself: true,
      includeBootstrap: true,
      includeNeighbors: false
    }), f = h.useMemo(() => s(c), [
      c,
      l
    ]), p = h.useRef(null);
    function v(x) {
      navigator.clipboard.writeText(x);
    }
    const y = `cargo run -- join ${f}`;
    return g.jsxs(fh, {
      open: n,
      onOpenChange: i,
      children: [
        g.jsx(cu, {
          children: "Invite to channel"
        }),
        g.jsxs(uu, {
          children: [
            g.jsxs("div", {
              className: "mb-4",
              children: [
                g.jsx("p", {
                  className: "font-semibold mb-2",
                  children: "Ticket"
                }),
                g.jsxs("div", {
                  className: "flex items-center",
                  children: [
                    g.jsxs("span", {
                      className: "mr-2 font-mono",
                      children: [
                        f.substring(0, 16),
                        "..."
                      ]
                    }),
                    g.jsxs(We, {
                      variant: "outline",
                      size: "sm",
                      onClick: () => v(f),
                      children: [
                        g.jsx(Vf, {
                          className: "w-4 h-4 mr-2"
                        }),
                        "Copy"
                      ]
                    })
                  ]
                })
              ]
            }),
            g.jsxs("div", {
              className: "mb-4",
              children: [
                g.jsx("p", {
                  className: "font-semibold mb-2",
                  children: "Join link"
                }),
                g.jsxs("a", {
                  href: Xf(f),
                  className: "text-blue-500 hover:underline",
                  target: "_blank",
                  children: [
                    Xf(f.substring(0, 16)),
                    "..."
                  ]
                })
              ]
            }),
            g.jsxs("div", {
              className: "mb-4",
              children: [
                g.jsx("p", {
                  className: "font-semibold mb-2",
                  children: "Join from the command line"
                }),
                g.jsx(En, {
                  ref: p,
                  value: y,
                  readOnly: true,
                  className: "mb-2",
                  onClick: () => {
                    var _a;
                    return (_a = p.current) == null ? void 0 : _a.select();
                  }
                }),
                g.jsxs(We, {
                  variant: "outline",
                  size: "sm",
                  onClick: () => v(y),
                  children: [
                    g.jsx(Vf, {
                      className: "w-4 h-4 mr-2"
                    }),
                    "Copy to Clipboard"
                  ]
                })
              ]
            }),
            g.jsxs("div", {
              className: "mb-4",
              children: [
                g.jsx("h3", {
                  className: "font-semibold mb-2",
                  children: "Configure ticket"
                }),
                g.jsxs("div", {
                  className: "space-y-2",
                  children: [
                    g.jsxs("div", {
                      className: "flex items-center",
                      children: [
                        g.jsx(Zi, {
                          id: "include-myself",
                          checked: c.includeMyself,
                          onCheckedChange: (x) => d({
                            ...c,
                            includeMyself: !!x
                          })
                        }),
                        g.jsx("label", {
                          htmlFor: "include-myself",
                          className: "ml-2",
                          children: "Include myself"
                        })
                      ]
                    }),
                    g.jsxs("div", {
                      className: "flex items-center",
                      children: [
                        g.jsx(Zi, {
                          id: "include-bootstrap",
                          checked: c.includeBootstrap,
                          onCheckedChange: (x) => d({
                            ...c,
                            includeBootstrap: !!x
                          })
                        }),
                        g.jsx("label", {
                          htmlFor: "include-bootstrap",
                          className: "ml-2",
                          children: "Include my bootstrap"
                        })
                      ]
                    }),
                    g.jsxs("div", {
                      className: "flex items-center",
                      children: [
                        g.jsx(Zi, {
                          id: "include-neighbors",
                          checked: c.includeNeighbors,
                          onCheckedChange: (x) => d({
                            ...c,
                            includeNeighbors: !!x
                          })
                        }),
                        g.jsx("label", {
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
            g.jsx("div", {
              className: "flex justify-end",
              children: g.jsx(We, {
                onClick: (x) => i(false),
                children: "Close"
              })
            })
          ]
        })
      ]
    });
  }
  const qf = [
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
  ], DS = [
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
  ], _S = [
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
  ], Jf = (n) => Math.floor(Math.random() * n);
  function OS({ the: n = false, titleize: i = false, separator: l } = {}) {
    const s = n ? "the " : "", c = DS.concat(_S);
    let d = `${qf[Jf(qf.length)]} ${c[Jf(c.length)]}`.toLowerCase();
    return i && (d = d.replace(/(?:^|\s|-)\S/g, (f) => f.toUpperCase())), typeof l == "string" ? d = d.split(" ").join(l) : l || (d = d.split(" ").join("")), s + d;
  }
  function jS() {
    const [n, i] = h.useState(null), [l, s] = h.useState(null);
    return h.useEffect(() => {
      Mx().then(i).catch((c) => s(c.toString()));
    }, []), g.jsx(vS, {
      attribute: "class",
      defaultTheme: "system",
      enableSystem: true,
      children: g.jsxs("div", {
        className: "flex h-screen",
        children: [
          !n && g.jsxs(BS, {
            children: [
              !l && g.jsxs("div", {
                className: "text-center",
                children: [
                  "Spawning Iroh\u2026",
                  g.jsx("br", {}),
                  g.jsx(LS, {})
                ]
              }),
              l && g.jsx("div", {
                children: l
              })
            ]
          }),
          n && g.jsx(zS, {
            api: n
          })
        ]
      })
    });
  }
  function LS() {
    return g.jsxs("svg", {
      className: "inline-block h-5 w-5 animate-spin",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      children: [
        g.jsx("circle", {
          className: "opacity-25",
          cx: "12",
          cy: "12",
          r: "10",
          stroke: "currentColor",
          strokeWidth: "4"
        }),
        g.jsx("path", {
          className: "opacity-75",
          fill: "currentColor",
          d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        })
      ]
    });
  }
  function BS({ children: n }) {
    const [i, l] = h.useState(false);
    return g.jsxs("div", {
      className: "flex flex-col flex-grow",
      children: [
        g.jsx(vh, {
          onLogsClick: () => l(!i)
        }),
        i && g.jsx(yh, {
          onClose: () => l(false)
        }),
        g.jsx("div", {
          className: "flex items-center justify-center",
          children: n
        })
      ]
    });
  }
  function zS({ api: n }) {
    var _a, _b;
    const [i, l] = h.useState("home"), [s, c] = h.useState([]), [d, f] = h.useState(null), [p, v] = h.useState(false), [y, x] = h.useState(OS()), [k, S] = h.useState(false), [P, M] = h.useState(false), b = async (O) => {
      try {
        const _ = await n.joinChannel(O, y);
        c(($) => [
          ...$,
          _
        ]), f(_.id), l("chat");
      } catch (_) {
        Ft.error("Failed to join channel", _);
      }
    }, T = async () => {
      try {
        const O = await n.createChannel(y);
        c((_) => [
          ..._,
          O
        ]), f(O.id), l("chat");
      } catch (O) {
        Ft.error("Failed to create channel", O);
      }
    }, j = async (O) => {
      try {
        await n.closeChannel(O), c((_) => _.filter(($) => $.id !== O)), d === O && (f(s.length > 1 ? s[0].id : null), s.length === 1 && l("home"));
      } catch (_) {
        Ft.error("Failed to close channel", _);
      }
    }, I = () => {
      l("home"), M(true);
    };
    let W;
    return d && (W = "#" + ((_a = s.find((O) => O.id === d)) == null ? void 0 : _a.name)), g.jsxs(g.Fragment, {
      children: [
        (i === "chat" || P) && g.jsx(PS, {
          channels: s,
          activeChannel: d,
          onChannelSelect: (O) => {
            f(O), l("chat");
          },
          onNewChannel: I
        }),
        g.jsxs("div", {
          className: "flex flex-col flex-grow",
          children: [
            g.jsx(vh, {
              onLogsClick: () => v(!p),
              title: W,
              onInviteClick: d ? () => S(true) : void 0
            }),
            i === "home" && g.jsx(py, {
              name: y,
              onSetName: x,
              onJoin: (O) => {
                b(O), M(false);
              },
              onCreate: () => {
                T(), M(false);
              }
            }),
            i === "chat" && d && g.jsx(aS, {
              api: n,
              channel: d,
              onClose: () => j(d)
            }),
            p && g.jsx(yh, {
              onClose: () => v(false)
            }),
            k && d && g.jsx(MS, {
              open: k,
              onOpenChange: (O) => {
                console.log("openchange", O), S(O);
              },
              channel: ((_b = s.find((O) => O.id === d)) == null ? void 0 : _b.name) || "",
              getTicket: (O) => n.getTicket(d, O)
            })
          ]
        })
      ]
    });
  }
  Av.createRoot(document.getElementById("root")).render(g.jsx(h.StrictMode, {
    children: g.jsx(jS, {})
  }));
})();
export {
  ym as P,
  __tla,
  Ft as l
};
