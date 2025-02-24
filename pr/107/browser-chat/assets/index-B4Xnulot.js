var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
let yt;
let __tla = (async () => {
  function Gh(n, i) {
    for (var l = 0; l < i.length; l++) {
      const a = i[l];
      if (typeof a != "string" && !Array.isArray(a)) {
        for (const c in a) if (c !== "default" && !(c in n)) {
          const d = Object.getOwnPropertyDescriptor(a, c);
          d && Object.defineProperty(n, c, d.get ? d : {
            enumerable: true,
            get: () => a[c]
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
    for (const c of document.querySelectorAll('link[rel="modulepreload"]')) a(c);
    new MutationObserver((c) => {
      for (const d of c) if (d.type === "childList") for (const p of d.addedNodes) p.tagName === "LINK" && p.rel === "modulepreload" && a(p);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function l(c) {
      const d = {};
      return c.integrity && (d.integrity = c.integrity), c.referrerPolicy && (d.referrerPolicy = c.referrerPolicy), c.crossOrigin === "use-credentials" ? d.credentials = "include" : c.crossOrigin === "anonymous" ? d.credentials = "omit" : d.credentials = "same-origin", d;
    }
    function a(c) {
      if (c.ep) return;
      c.ep = true;
      const d = l(c);
      fetch(c.href, d);
    }
  })();
  function xf(n) {
    return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
  }
  var Ys = {
    exports: {}
  }, po = {}, Xs = {
    exports: {}
  }, me = {};
  var Ad;
  function Kh() {
    if (Ad) return me;
    Ad = 1;
    var n = Symbol.for("react.element"), i = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), p = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), v = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), C = Symbol.iterator;
    function x(T) {
      return T === null || typeof T != "object" ? null : (T = C && T[C] || T["@@iterator"], typeof T == "function" ? T : null);
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
    }, A = Object.assign, b = {};
    function M(T, z, ae) {
      this.props = T, this.context = z, this.refs = b, this.updater = ae || P;
    }
    M.prototype.isReactComponent = {}, M.prototype.setState = function(T, z) {
      if (typeof T != "object" && typeof T != "function" && T != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, T, z, "setState");
    }, M.prototype.forceUpdate = function(T) {
      this.updater.enqueueForceUpdate(this, T, "forceUpdate");
    };
    function _() {
    }
    _.prototype = M.prototype;
    function W(T, z, ae) {
      this.props = T, this.context = z, this.refs = b, this.updater = ae || P;
    }
    var U = W.prototype = new _();
    U.constructor = W, A(U, M.prototype), U.isPureReactComponent = true;
    var O = Array.isArray, j = Object.prototype.hasOwnProperty, $ = {
      current: null
    }, D = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    function ee(T, z, ae) {
      var fe, he = {}, ge = null, ye = null;
      if (z != null) for (fe in z.ref !== void 0 && (ye = z.ref), z.key !== void 0 && (ge = "" + z.key), z) j.call(z, fe) && !D.hasOwnProperty(fe) && (he[fe] = z[fe]);
      var we = arguments.length - 2;
      if (we === 1) he.children = ae;
      else if (1 < we) {
        for (var Ce = Array(we), Ye = 0; Ye < we; Ye++) Ce[Ye] = arguments[Ye + 2];
        he.children = Ce;
      }
      if (T && T.defaultProps) for (fe in we = T.defaultProps, we) he[fe] === void 0 && (he[fe] = we[fe]);
      return {
        $$typeof: n,
        type: T,
        key: ge,
        ref: ye,
        props: he,
        _owner: $.current
      };
    }
    function X(T, z) {
      return {
        $$typeof: n,
        type: T.type,
        key: z,
        ref: T.ref,
        props: T.props,
        _owner: T._owner
      };
    }
    function re(T) {
      return typeof T == "object" && T !== null && T.$$typeof === n;
    }
    function ne(T) {
      var z = {
        "=": "=0",
        ":": "=2"
      };
      return "$" + T.replace(/[=:]/g, function(ae) {
        return z[ae];
      });
    }
    var te = /\/+/g;
    function ce(T, z) {
      return typeof T == "object" && T !== null && T.key != null ? ne("" + T.key) : z.toString(36);
    }
    function pe(T, z, ae, fe, he) {
      var ge = typeof T;
      (ge === "undefined" || ge === "boolean") && (T = null);
      var ye = false;
      if (T === null) ye = true;
      else switch (ge) {
        case "string":
        case "number":
          ye = true;
          break;
        case "object":
          switch (T.$$typeof) {
            case n:
            case i:
              ye = true;
          }
      }
      if (ye) return ye = T, he = he(ye), T = fe === "" ? "." + ce(ye, 0) : fe, O(he) ? (ae = "", T != null && (ae = T.replace(te, "$&/") + "/"), pe(he, z, ae, "", function(Ye) {
        return Ye;
      })) : he != null && (re(he) && (he = X(he, ae + (!he.key || ye && ye.key === he.key ? "" : ("" + he.key).replace(te, "$&/") + "/") + T)), z.push(he)), 1;
      if (ye = 0, fe = fe === "" ? "." : fe + ":", O(T)) for (var we = 0; we < T.length; we++) {
        ge = T[we];
        var Ce = fe + ce(ge, we);
        ye += pe(ge, z, ae, Ce, he);
      }
      else if (Ce = x(T), typeof Ce == "function") for (T = Ce.call(T), we = 0; !(ge = T.next()).done; ) ge = ge.value, Ce = fe + ce(ge, we++), ye += pe(ge, z, ae, Ce, he);
      else if (ge === "object") throw z = String(T), Error("Objects are not valid as a React child (found: " + (z === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : z) + "). If you meant to render a collection of children, use an array instead.");
      return ye;
    }
    function ke(T, z, ae) {
      if (T == null) return T;
      var fe = [], he = 0;
      return pe(T, fe, "", "", function(ge) {
        return z.call(ae, ge, he++);
      }), fe;
    }
    function de(T) {
      if (T._status === -1) {
        var z = T._result;
        z = z(), z.then(function(ae) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = ae);
        }, function(ae) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = ae);
        }), T._status === -1 && (T._status = 0, T._result = z);
      }
      if (T._status === 1) return T._result.default;
      throw T._result;
    }
    var se = {
      current: null
    }, B = {
      transition: null
    }, K = {
      ReactCurrentDispatcher: se,
      ReactCurrentBatchConfig: B,
      ReactCurrentOwner: $
    };
    function G() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    return me.Children = {
      map: ke,
      forEach: function(T, z, ae) {
        ke(T, function() {
          z.apply(this, arguments);
        }, ae);
      },
      count: function(T) {
        var z = 0;
        return ke(T, function() {
          z++;
        }), z;
      },
      toArray: function(T) {
        return ke(T, function(z) {
          return z;
        }) || [];
      },
      only: function(T) {
        if (!re(T)) throw Error("React.Children.only expected to receive a single React element child.");
        return T;
      }
    }, me.Component = M, me.Fragment = l, me.Profiler = c, me.PureComponent = W, me.StrictMode = a, me.Suspense = g, me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = K, me.act = G, me.cloneElement = function(T, z, ae) {
      if (T == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + T + ".");
      var fe = A({}, T.props), he = T.key, ge = T.ref, ye = T._owner;
      if (z != null) {
        if (z.ref !== void 0 && (ge = z.ref, ye = $.current), z.key !== void 0 && (he = "" + z.key), T.type && T.type.defaultProps) var we = T.type.defaultProps;
        for (Ce in z) j.call(z, Ce) && !D.hasOwnProperty(Ce) && (fe[Ce] = z[Ce] === void 0 && we !== void 0 ? we[Ce] : z[Ce]);
      }
      var Ce = arguments.length - 2;
      if (Ce === 1) fe.children = ae;
      else if (1 < Ce) {
        we = Array(Ce);
        for (var Ye = 0; Ye < Ce; Ye++) we[Ye] = arguments[Ye + 2];
        fe.children = we;
      }
      return {
        $$typeof: n,
        type: T.type,
        key: he,
        ref: ge,
        props: fe,
        _owner: ye
      };
    }, me.createContext = function(T) {
      return T = {
        $$typeof: p,
        _currentValue: T,
        _currentValue2: T,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
      }, T.Provider = {
        $$typeof: d,
        _context: T
      }, T.Consumer = T;
    }, me.createElement = ee, me.createFactory = function(T) {
      var z = ee.bind(null, T);
      return z.type = T, z;
    }, me.createRef = function() {
      return {
        current: null
      };
    }, me.forwardRef = function(T) {
      return {
        $$typeof: m,
        render: T
      };
    }, me.isValidElement = re, me.lazy = function(T) {
      return {
        $$typeof: w,
        _payload: {
          _status: -1,
          _result: T
        },
        _init: de
      };
    }, me.memo = function(T, z) {
      return {
        $$typeof: v,
        type: T,
        compare: z === void 0 ? null : z
      };
    }, me.startTransition = function(T) {
      var z = B.transition;
      B.transition = {};
      try {
        T();
      } finally {
        B.transition = z;
      }
    }, me.unstable_act = G, me.useCallback = function(T, z) {
      return se.current.useCallback(T, z);
    }, me.useContext = function(T) {
      return se.current.useContext(T);
    }, me.useDebugValue = function() {
    }, me.useDeferredValue = function(T) {
      return se.current.useDeferredValue(T);
    }, me.useEffect = function(T, z) {
      return se.current.useEffect(T, z);
    }, me.useId = function() {
      return se.current.useId();
    }, me.useImperativeHandle = function(T, z, ae) {
      return se.current.useImperativeHandle(T, z, ae);
    }, me.useInsertionEffect = function(T, z) {
      return se.current.useInsertionEffect(T, z);
    }, me.useLayoutEffect = function(T, z) {
      return se.current.useLayoutEffect(T, z);
    }, me.useMemo = function(T, z) {
      return se.current.useMemo(T, z);
    }, me.useReducer = function(T, z, ae) {
      return se.current.useReducer(T, z, ae);
    }, me.useRef = function(T) {
      return se.current.useRef(T);
    }, me.useState = function(T) {
      return se.current.useState(T);
    }, me.useSyncExternalStore = function(T, z, ae) {
      return se.current.useSyncExternalStore(T, z, ae);
    }, me.useTransition = function() {
      return se.current.useTransition();
    }, me.version = "18.3.1", me;
  }
  var Ld;
  function va() {
    return Ld || (Ld = 1, Xs.exports = Kh()), Xs.exports;
  }
  var _d;
  function Qh() {
    if (_d) return po;
    _d = 1;
    var n = va(), i = Symbol.for("react.element"), l = Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, c = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    function p(m, g, v) {
      var w, C = {}, x = null, P = null;
      v !== void 0 && (x = "" + v), g.key !== void 0 && (x = "" + g.key), g.ref !== void 0 && (P = g.ref);
      for (w in g) a.call(g, w) && !d.hasOwnProperty(w) && (C[w] = g[w]);
      if (m && m.defaultProps) for (w in g = m.defaultProps, g) C[w] === void 0 && (C[w] = g[w]);
      return {
        $$typeof: i,
        type: m,
        key: x,
        ref: P,
        props: C,
        _owner: c.current
      };
    }
    return po.Fragment = l, po.jsx = p, po.jsxs = p, po;
  }
  var Od;
  function Yh() {
    return Od || (Od = 1, Ys.exports = Qh()), Ys.exports;
  }
  var S = Yh(), h = va();
  const Xh = xf(h), qh = Gh({
    __proto__: null,
    default: Xh
  }, [
    h
  ]);
  var Ai = {}, qs = {
    exports: {}
  }, it = {}, Js = {
    exports: {}
  }, Zs = {};
  var jd;
  function Jh() {
    return jd || (jd = 1, function(n) {
      function i(B, K) {
        var G = B.length;
        B.push(K);
        e: for (; 0 < G; ) {
          var T = G - 1 >>> 1, z = B[T];
          if (0 < c(z, K)) B[T] = K, B[G] = z, G = T;
          else break e;
        }
      }
      function l(B) {
        return B.length === 0 ? null : B[0];
      }
      function a(B) {
        if (B.length === 0) return null;
        var K = B[0], G = B.pop();
        if (G !== K) {
          B[0] = G;
          e: for (var T = 0, z = B.length, ae = z >>> 1; T < ae; ) {
            var fe = 2 * (T + 1) - 1, he = B[fe], ge = fe + 1, ye = B[ge];
            if (0 > c(he, G)) ge < z && 0 > c(ye, he) ? (B[T] = ye, B[ge] = G, T = ge) : (B[T] = he, B[fe] = G, T = fe);
            else if (ge < z && 0 > c(ye, G)) B[T] = ye, B[ge] = G, T = ge;
            else break e;
          }
        }
        return K;
      }
      function c(B, K) {
        var G = B.sortIndex - K.sortIndex;
        return G !== 0 ? G : B.id - K.id;
      }
      if (typeof performance == "object" && typeof performance.now == "function") {
        var d = performance;
        n.unstable_now = function() {
          return d.now();
        };
      } else {
        var p = Date, m = p.now();
        n.unstable_now = function() {
          return p.now() - m;
        };
      }
      var g = [], v = [], w = 1, C = null, x = 3, P = false, A = false, b = false, M = typeof setTimeout == "function" ? setTimeout : null, _ = typeof clearTimeout == "function" ? clearTimeout : null, W = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function U(B) {
        for (var K = l(v); K !== null; ) {
          if (K.callback === null) a(v);
          else if (K.startTime <= B) a(v), K.sortIndex = K.expirationTime, i(g, K);
          else break;
          K = l(v);
        }
      }
      function O(B) {
        if (b = false, U(B), !A) if (l(g) !== null) A = true, de(j);
        else {
          var K = l(v);
          K !== null && se(O, K.startTime - B);
        }
      }
      function j(B, K) {
        A = false, b && (b = false, _(ee), ee = -1), P = true;
        var G = x;
        try {
          for (U(K), C = l(g); C !== null && (!(C.expirationTime > K) || B && !ne()); ) {
            var T = C.callback;
            if (typeof T == "function") {
              C.callback = null, x = C.priorityLevel;
              var z = T(C.expirationTime <= K);
              K = n.unstable_now(), typeof z == "function" ? C.callback = z : C === l(g) && a(g), U(K);
            } else a(g);
            C = l(g);
          }
          if (C !== null) var ae = true;
          else {
            var fe = l(v);
            fe !== null && se(O, fe.startTime - K), ae = false;
          }
          return ae;
        } finally {
          C = null, x = G, P = false;
        }
      }
      var $ = false, D = null, ee = -1, X = 5, re = -1;
      function ne() {
        return !(n.unstable_now() - re < X);
      }
      function te() {
        if (D !== null) {
          var B = n.unstable_now();
          re = B;
          var K = true;
          try {
            K = D(true, B);
          } finally {
            K ? ce() : ($ = false, D = null);
          }
        } else $ = false;
      }
      var ce;
      if (typeof W == "function") ce = function() {
        W(te);
      };
      else if (typeof MessageChannel < "u") {
        var pe = new MessageChannel(), ke = pe.port2;
        pe.port1.onmessage = te, ce = function() {
          ke.postMessage(null);
        };
      } else ce = function() {
        M(te, 0);
      };
      function de(B) {
        D = B, $ || ($ = true, ce());
      }
      function se(B, K) {
        ee = M(function() {
          B(n.unstable_now());
        }, K);
      }
      n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(B) {
        B.callback = null;
      }, n.unstable_continueExecution = function() {
        A || P || (A = true, de(j));
      }, n.unstable_forceFrameRate = function(B) {
        0 > B || 125 < B ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : X = 0 < B ? Math.floor(1e3 / B) : 5;
      }, n.unstable_getCurrentPriorityLevel = function() {
        return x;
      }, n.unstable_getFirstCallbackNode = function() {
        return l(g);
      }, n.unstable_next = function(B) {
        switch (x) {
          case 1:
          case 2:
          case 3:
            var K = 3;
            break;
          default:
            K = x;
        }
        var G = x;
        x = K;
        try {
          return B();
        } finally {
          x = G;
        }
      }, n.unstable_pauseExecution = function() {
      }, n.unstable_requestPaint = function() {
      }, n.unstable_runWithPriority = function(B, K) {
        switch (B) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            B = 3;
        }
        var G = x;
        x = B;
        try {
          return K();
        } finally {
          x = G;
        }
      }, n.unstable_scheduleCallback = function(B, K, G) {
        var T = n.unstable_now();
        switch (typeof G == "object" && G !== null ? (G = G.delay, G = typeof G == "number" && 0 < G ? T + G : T) : G = T, B) {
          case 1:
            var z = -1;
            break;
          case 2:
            z = 250;
            break;
          case 5:
            z = 1073741823;
            break;
          case 4:
            z = 1e4;
            break;
          default:
            z = 5e3;
        }
        return z = G + z, B = {
          id: w++,
          callback: K,
          priorityLevel: B,
          startTime: G,
          expirationTime: z,
          sortIndex: -1
        }, G > T ? (B.sortIndex = G, i(v, B), l(g) === null && B === l(v) && (b ? (_(ee), ee = -1) : b = true, se(O, G - T))) : (B.sortIndex = z, i(g, B), A || P || (A = true, de(j))), B;
      }, n.unstable_shouldYield = ne, n.unstable_wrapCallback = function(B) {
        var K = x;
        return function() {
          var G = x;
          x = K;
          try {
            return B.apply(this, arguments);
          } finally {
            x = G;
          }
        };
      };
    }(Zs)), Zs;
  }
  var Dd;
  function Zh() {
    return Dd || (Dd = 1, Js.exports = Jh()), Js.exports;
  }
  var Bd;
  function eg() {
    if (Bd) return it;
    Bd = 1;
    var n = va(), i = Zh();
    function l(e) {
      for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++) t += "&args[]=" + encodeURIComponent(arguments[r]);
      return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var a = /* @__PURE__ */ new Set(), c = {};
    function d(e, t) {
      p(e, t), p(e + "Capture", t);
    }
    function p(e, t) {
      for (c[e] = t, e = 0; e < t.length; e++) a.add(t[e]);
    }
    var m = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), g = Object.prototype.hasOwnProperty, v = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, w = {}, C = {};
    function x(e) {
      return g.call(C, e) ? true : g.call(w, e) ? false : v.test(e) ? C[e] = true : (w[e] = true, false);
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
    function A(e, t, r, o) {
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
    function b(e, t, r, o, s, u, f) {
      this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = s, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = u, this.removeEmptyString = f;
    }
    var M = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
      M[e] = new b(e, 0, false, e, null, false, false);
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
      M[t] = new b(t, 1, false, e[1], null, false, false);
    }), [
      "contentEditable",
      "draggable",
      "spellCheck",
      "value"
    ].forEach(function(e) {
      M[e] = new b(e, 2, false, e.toLowerCase(), null, false, false);
    }), [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha"
    ].forEach(function(e) {
      M[e] = new b(e, 2, false, e, null, false, false);
    }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
      M[e] = new b(e, 3, false, e.toLowerCase(), null, false, false);
    }), [
      "checked",
      "multiple",
      "muted",
      "selected"
    ].forEach(function(e) {
      M[e] = new b(e, 3, true, e, null, false, false);
    }), [
      "capture",
      "download"
    ].forEach(function(e) {
      M[e] = new b(e, 4, false, e, null, false, false);
    }), [
      "cols",
      "rows",
      "size",
      "span"
    ].forEach(function(e) {
      M[e] = new b(e, 6, false, e, null, false, false);
    }), [
      "rowSpan",
      "start"
    ].forEach(function(e) {
      M[e] = new b(e, 5, false, e.toLowerCase(), null, false, false);
    });
    var _ = /[\-:]([a-z])/g;
    function W(e) {
      return e[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
      var t = e.replace(_, W);
      M[t] = new b(t, 1, false, e, null, false, false);
    }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
      var t = e.replace(_, W);
      M[t] = new b(t, 1, false, e, "http://www.w3.org/1999/xlink", false, false);
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
    ].forEach(function(e) {
      var t = e.replace(_, W);
      M[t] = new b(t, 1, false, e, "http://www.w3.org/XML/1998/namespace", false, false);
    }), [
      "tabIndex",
      "crossOrigin"
    ].forEach(function(e) {
      M[e] = new b(e, 1, false, e.toLowerCase(), null, false, false);
    }), M.xlinkHref = new b("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false), [
      "src",
      "href",
      "action",
      "formAction"
    ].forEach(function(e) {
      M[e] = new b(e, 1, false, e.toLowerCase(), null, true, true);
    });
    function U(e, t, r, o) {
      var s = M.hasOwnProperty(t) ? M[t] : null;
      (s !== null ? s.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (A(t, r, s, o) && (r = null), o || s === null ? x(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r)) : s.mustUseProperty ? e[s.propertyName] = r === null ? s.type === 3 ? false : "" : r : (t = s.attributeName, o = s.attributeNamespace, r === null ? e.removeAttribute(t) : (s = s.type, r = s === 3 || s === 4 && r === true ? "" : "" + r, o ? e.setAttributeNS(o, t, r) : e.setAttribute(t, r))));
    }
    var O = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, j = Symbol.for("react.element"), $ = Symbol.for("react.portal"), D = Symbol.for("react.fragment"), ee = Symbol.for("react.strict_mode"), X = Symbol.for("react.profiler"), re = Symbol.for("react.provider"), ne = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), ce = Symbol.for("react.suspense"), pe = Symbol.for("react.suspense_list"), ke = Symbol.for("react.memo"), de = Symbol.for("react.lazy"), se = Symbol.for("react.offscreen"), B = Symbol.iterator;
    function K(e) {
      return e === null || typeof e != "object" ? null : (e = B && e[B] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var G = Object.assign, T;
    function z(e) {
      if (T === void 0) try {
        throw Error();
      } catch (r) {
        var t = r.stack.trim().match(/\n( *(at )?)/);
        T = t && t[1] || "";
      }
      return `
` + T + e;
    }
    var ae = false;
    function fe(e, t) {
      if (!e || ae) return "";
      ae = true;
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
          } catch (L) {
            var o = L;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (L) {
            o = L;
          }
          e.call(t.prototype);
        }
        else {
          try {
            throw Error();
          } catch (L) {
            o = L;
          }
          e();
        }
      } catch (L) {
        if (L && o && typeof L.stack == "string") {
          for (var s = L.stack.split(`
`), u = o.stack.split(`
`), f = s.length - 1, y = u.length - 1; 1 <= f && 0 <= y && s[f] !== u[y]; ) y--;
          for (; 1 <= f && 0 <= y; f--, y--) if (s[f] !== u[y]) {
            if (f !== 1 || y !== 1) do
              if (f--, y--, 0 > y || s[f] !== u[y]) {
                var k = `
` + s[f].replace(" at new ", " at ");
                return e.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", e.displayName)), k;
              }
            while (1 <= f && 0 <= y);
            break;
          }
        }
      } finally {
        ae = false, Error.prepareStackTrace = r;
      }
      return (e = e ? e.displayName || e.name : "") ? z(e) : "";
    }
    function he(e) {
      switch (e.tag) {
        case 5:
          return z(e.type);
        case 16:
          return z("Lazy");
        case 13:
          return z("Suspense");
        case 19:
          return z("SuspenseList");
        case 0:
        case 2:
        case 15:
          return e = fe(e.type, false), e;
        case 11:
          return e = fe(e.type.render, false), e;
        case 1:
          return e = fe(e.type, true), e;
        default:
          return "";
      }
    }
    function ge(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case D:
          return "Fragment";
        case $:
          return "Portal";
        case X:
          return "Profiler";
        case ee:
          return "StrictMode";
        case ce:
          return "Suspense";
        case pe:
          return "SuspenseList";
      }
      if (typeof e == "object") switch (e.$$typeof) {
        case ne:
          return (e.displayName || "Context") + ".Consumer";
        case re:
          return (e._context.displayName || "Context") + ".Provider";
        case te:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ke:
          return t = e.displayName || null, t !== null ? t : ge(e.type) || "Memo";
        case de:
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
          return t === ee ? "StrictMode" : "Mode";
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
    function Ye(e) {
      var t = Ce(e) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
      if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
        var s = r.get, u = r.set;
        return Object.defineProperty(e, t, {
          configurable: true,
          get: function() {
            return s.call(this);
          },
          set: function(f) {
            o = "" + f, u.call(this, f);
          }
        }), Object.defineProperty(e, t, {
          enumerable: r.enumerable
        }), {
          getValue: function() {
            return o;
          },
          setValue: function(f) {
            o = "" + f;
          },
          stopTracking: function() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }
    function Hr(e) {
      e._valueTracker || (e._valueTracker = Ye(e));
    }
    function ko(e) {
      if (!e) return false;
      var t = e._valueTracker;
      if (!t) return true;
      var r = t.getValue(), o = "";
      return e && (o = Ce(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== r ? (t.setValue(e), true) : false;
    }
    function It(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function rl(e, t) {
      var r = t.checked;
      return G({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: r ?? e._wrapperState.initialChecked
      });
    }
    function za(e, t) {
      var r = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
      r = we(t.value != null ? t.value : r), e._wrapperState = {
        initialChecked: o,
        initialValue: r,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
      };
    }
    function Fa(e, t) {
      t = t.checked, t != null && U(e, "checked", t, false);
    }
    function nl(e, t) {
      Fa(e, t);
      var r = we(t.value), o = t.type;
      if (r != null) o === "number" ? (r === 0 && e.value === "" || e.value != r) && (e.value = "" + r) : e.value !== "" + r && (e.value = "" + r);
      else if (o === "submit" || o === "reset") {
        e.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? ol(e, t.type, r) : t.hasOwnProperty("defaultValue") && ol(e, t.type, we(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
    }
    function Ia(e, t, r) {
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var o = t.type;
        if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
        t = "" + e._wrapperState.initialValue, r || t === e.value || (e.value = t), e.defaultValue = t;
      }
      r = e.name, r !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, r !== "" && (e.name = r);
    }
    function ol(e, t, r) {
      (t !== "number" || It(e.ownerDocument) !== e) && (r == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
    }
    var Tn = Array.isArray;
    function Ur(e, t, r, o) {
      if (e = e.options, t) {
        t = {};
        for (var s = 0; s < r.length; s++) t["$" + r[s]] = true;
        for (r = 0; r < e.length; r++) s = t.hasOwnProperty("$" + e[r].value), e[r].selected !== s && (e[r].selected = s), s && o && (e[r].defaultSelected = true);
      } else {
        for (r = "" + we(r), t = null, s = 0; s < e.length; s++) {
          if (e[s].value === r) {
            e[s].selected = true, o && (e[s].defaultSelected = true);
            return;
          }
          t !== null || e[s].disabled || (t = e[s]);
        }
        t !== null && (t.selected = true);
      }
    }
    function il(e, t) {
      if (t.dangerouslySetInnerHTML != null) throw Error(l(91));
      return G({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
      });
    }
    function Wa(e, t) {
      var r = t.value;
      if (r == null) {
        if (r = t.children, t = t.defaultValue, r != null) {
          if (t != null) throw Error(l(92));
          if (Tn(r)) {
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
    function Ha(e, t) {
      var r = we(t.value), o = we(t.defaultValue);
      r != null && (r = "" + r, r !== e.value && (e.value = r), t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)), o != null && (e.defaultValue = "" + o);
    }
    function Ua(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
    }
    function Va(e) {
      switch (e) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function ll(e, t) {
      return e == null || e === "http://www.w3.org/1999/xhtml" ? Va(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
    }
    var Co, $a = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, o, s) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, r, o, s);
        });
      } : e;
    }(function(e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
      else {
        for (Co = Co || document.createElement("div"), Co.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Co.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
    function Rn(e, t) {
      if (t) {
        var r = e.firstChild;
        if (r && r === e.lastChild && r.nodeType === 3) {
          r.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var Mn = {
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
    }, Xp = [
      "Webkit",
      "ms",
      "Moz",
      "O"
    ];
    Object.keys(Mn).forEach(function(e) {
      Xp.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1), Mn[t] = Mn[e];
      });
    });
    function Ga(e, t, r) {
      return t == null || typeof t == "boolean" || t === "" ? "" : r || typeof t != "number" || t === 0 || Mn.hasOwnProperty(e) && Mn[e] ? ("" + t).trim() : t + "px";
    }
    function Ka(e, t) {
      e = e.style;
      for (var r in t) if (t.hasOwnProperty(r)) {
        var o = r.indexOf("--") === 0, s = Ga(r, t[r], o);
        r === "float" && (r = "cssFloat"), o ? e.setProperty(r, s) : e[r] = s;
      }
    }
    var qp = G({
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
    function sl(e, t) {
      if (t) {
        if (qp[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(l(137, e));
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null) throw Error(l(60));
          if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(l(61));
        }
        if (t.style != null && typeof t.style != "object") throw Error(l(62));
      }
    }
    function al(e, t) {
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
    var ul = null;
    function cl(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    var dl = null, Vr = null, $r = null;
    function Qa(e) {
      if (e = qn(e)) {
        if (typeof dl != "function") throw Error(l(280));
        var t = e.stateNode;
        t && (t = Go(t), dl(e.stateNode, e.type, t));
      }
    }
    function Ya(e) {
      Vr ? $r ? $r.push(e) : $r = [
        e
      ] : Vr = e;
    }
    function Xa() {
      if (Vr) {
        var e = Vr, t = $r;
        if ($r = Vr = null, Qa(e), t) for (e = 0; e < t.length; e++) Qa(t[e]);
      }
    }
    function qa(e, t) {
      return e(t);
    }
    function Ja() {
    }
    var fl = false;
    function Za(e, t, r) {
      if (fl) return e(t, r);
      fl = true;
      try {
        return qa(e, t, r);
      } finally {
        fl = false, (Vr !== null || $r !== null) && (Ja(), Xa());
      }
    }
    function Nn(e, t) {
      var r = e.stateNode;
      if (r === null) return null;
      var o = Go(r);
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
    var pl = false;
    if (m) try {
      var An = {};
      Object.defineProperty(An, "passive", {
        get: function() {
          pl = true;
        }
      }), window.addEventListener("test", An, An), window.removeEventListener("test", An, An);
    } catch {
      pl = false;
    }
    function Jp(e, t, r, o, s, u, f, y, k) {
      var L = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(r, L);
      } catch (I) {
        this.onError(I);
      }
    }
    var Ln = false, Po = null, bo = false, ml = null, Zp = {
      onError: function(e) {
        Ln = true, Po = e;
      }
    };
    function em(e, t, r, o, s, u, f, y, k) {
      Ln = false, Po = null, Jp.apply(Zp, arguments);
    }
    function tm(e, t, r, o, s, u, f, y, k) {
      if (em.apply(this, arguments), Ln) {
        if (Ln) {
          var L = Po;
          Ln = false, Po = null;
        } else throw Error(l(198));
        bo || (bo = true, ml = L);
      }
    }
    function Tr(e) {
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
    function eu(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function tu(e) {
      if (Tr(e) !== e) throw Error(l(188));
    }
    function rm(e) {
      var t = e.alternate;
      if (!t) {
        if (t = Tr(e), t === null) throw Error(l(188));
        return t !== e ? null : e;
      }
      for (var r = e, o = t; ; ) {
        var s = r.return;
        if (s === null) break;
        var u = s.alternate;
        if (u === null) {
          if (o = s.return, o !== null) {
            r = o;
            continue;
          }
          break;
        }
        if (s.child === u.child) {
          for (u = s.child; u; ) {
            if (u === r) return tu(s), e;
            if (u === o) return tu(s), t;
            u = u.sibling;
          }
          throw Error(l(188));
        }
        if (r.return !== o.return) r = s, o = u;
        else {
          for (var f = false, y = s.child; y; ) {
            if (y === r) {
              f = true, r = s, o = u;
              break;
            }
            if (y === o) {
              f = true, o = s, r = u;
              break;
            }
            y = y.sibling;
          }
          if (!f) {
            for (y = u.child; y; ) {
              if (y === r) {
                f = true, r = u, o = s;
                break;
              }
              if (y === o) {
                f = true, o = u, r = s;
                break;
              }
              y = y.sibling;
            }
            if (!f) throw Error(l(189));
          }
        }
        if (r.alternate !== o) throw Error(l(190));
      }
      if (r.tag !== 3) throw Error(l(188));
      return r.stateNode.current === r ? e : t;
    }
    function ru(e) {
      return e = rm(e), e !== null ? nu(e) : null;
    }
    function nu(e) {
      if (e.tag === 5 || e.tag === 6) return e;
      for (e = e.child; e !== null; ) {
        var t = nu(e);
        if (t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var ou = i.unstable_scheduleCallback, iu = i.unstable_cancelCallback, nm = i.unstable_shouldYield, om = i.unstable_requestPaint, Le = i.unstable_now, im = i.unstable_getCurrentPriorityLevel, hl = i.unstable_ImmediatePriority, lu = i.unstable_UserBlockingPriority, Eo = i.unstable_NormalPriority, lm = i.unstable_LowPriority, su = i.unstable_IdlePriority, To = null, Nt = null;
    function sm(e) {
      if (Nt && typeof Nt.onCommitFiberRoot == "function") try {
        Nt.onCommitFiberRoot(To, e, void 0, (e.current.flags & 128) === 128);
      } catch {
      }
    }
    var St = Math.clz32 ? Math.clz32 : cm, am = Math.log, um = Math.LN2;
    function cm(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (am(e) / um | 0) | 0;
    }
    var Ro = 64, Mo = 4194304;
    function _n(e) {
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
    function No(e, t) {
      var r = e.pendingLanes;
      if (r === 0) return 0;
      var o = 0, s = e.suspendedLanes, u = e.pingedLanes, f = r & 268435455;
      if (f !== 0) {
        var y = f & ~s;
        y !== 0 ? o = _n(y) : (u &= f, u !== 0 && (o = _n(u)));
      } else f = r & ~s, f !== 0 ? o = _n(f) : u !== 0 && (o = _n(u));
      if (o === 0) return 0;
      if (t !== 0 && t !== o && !(t & s) && (s = o & -o, u = t & -t, s >= u || s === 16 && (u & 4194240) !== 0)) return t;
      if (o & 4 && (o |= r & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) r = 31 - St(t), s = 1 << r, o |= e[r], t &= ~s;
      return o;
    }
    function dm(e, t) {
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
    function fm(e, t) {
      for (var r = e.suspendedLanes, o = e.pingedLanes, s = e.expirationTimes, u = e.pendingLanes; 0 < u; ) {
        var f = 31 - St(u), y = 1 << f, k = s[f];
        k === -1 ? (!(y & r) || y & o) && (s[f] = dm(y, t)) : k <= t && (e.expiredLanes |= y), u &= ~y;
      }
    }
    function gl(e) {
      return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
    }
    function au() {
      var e = Ro;
      return Ro <<= 1, !(Ro & 4194240) && (Ro = 64), e;
    }
    function vl(e) {
      for (var t = [], r = 0; 31 > r; r++) t.push(e);
      return t;
    }
    function On(e, t, r) {
      e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - St(t), e[t] = r;
    }
    function pm(e, t) {
      var r = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
      var o = e.eventTimes;
      for (e = e.expirationTimes; 0 < r; ) {
        var s = 31 - St(r), u = 1 << s;
        t[s] = 0, o[s] = -1, e[s] = -1, r &= ~u;
      }
    }
    function yl(e, t) {
      var r = e.entangledLanes |= t;
      for (e = e.entanglements; r; ) {
        var o = 31 - St(r), s = 1 << o;
        s & t | e[o] & t && (e[o] |= t), r &= ~s;
      }
    }
    var xe = 0;
    function uu(e) {
      return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
    }
    var cu, wl, du, fu, pu, Sl = false, Ao = [], Jt = null, Zt = null, er = null, jn = /* @__PURE__ */ new Map(), Dn = /* @__PURE__ */ new Map(), tr = [], mm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function mu(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Jt = null;
          break;
        case "dragenter":
        case "dragleave":
          Zt = null;
          break;
        case "mouseover":
        case "mouseout":
          er = null;
          break;
        case "pointerover":
        case "pointerout":
          jn.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Dn.delete(t.pointerId);
      }
    }
    function Bn(e, t, r, o, s, u) {
      return e === null || e.nativeEvent !== u ? (e = {
        blockedOn: t,
        domEventName: r,
        eventSystemFlags: o,
        nativeEvent: u,
        targetContainers: [
          s
        ]
      }, t !== null && (t = qn(t), t !== null && wl(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
    }
    function hm(e, t, r, o, s) {
      switch (t) {
        case "focusin":
          return Jt = Bn(Jt, e, t, r, o, s), true;
        case "dragenter":
          return Zt = Bn(Zt, e, t, r, o, s), true;
        case "mouseover":
          return er = Bn(er, e, t, r, o, s), true;
        case "pointerover":
          var u = s.pointerId;
          return jn.set(u, Bn(jn.get(u) || null, e, t, r, o, s)), true;
        case "gotpointercapture":
          return u = s.pointerId, Dn.set(u, Bn(Dn.get(u) || null, e, t, r, o, s)), true;
      }
      return false;
    }
    function hu(e) {
      var t = Rr(e.target);
      if (t !== null) {
        var r = Tr(t);
        if (r !== null) {
          if (t = r.tag, t === 13) {
            if (t = eu(r), t !== null) {
              e.blockedOn = t, pu(e.priority, function() {
                du(r);
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
    function Lo(e) {
      if (e.blockedOn !== null) return false;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var r = kl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (r === null) {
          r = e.nativeEvent;
          var o = new r.constructor(r.type, r);
          ul = o, r.target.dispatchEvent(o), ul = null;
        } else return t = qn(r), t !== null && wl(t), e.blockedOn = r, false;
        t.shift();
      }
      return true;
    }
    function gu(e, t, r) {
      Lo(e) && r.delete(t);
    }
    function gm() {
      Sl = false, Jt !== null && Lo(Jt) && (Jt = null), Zt !== null && Lo(Zt) && (Zt = null), er !== null && Lo(er) && (er = null), jn.forEach(gu), Dn.forEach(gu);
    }
    function zn(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Sl || (Sl = true, i.unstable_scheduleCallback(i.unstable_NormalPriority, gm)));
    }
    function Fn(e) {
      function t(s) {
        return zn(s, e);
      }
      if (0 < Ao.length) {
        zn(Ao[0], e);
        for (var r = 1; r < Ao.length; r++) {
          var o = Ao[r];
          o.blockedOn === e && (o.blockedOn = null);
        }
      }
      for (Jt !== null && zn(Jt, e), Zt !== null && zn(Zt, e), er !== null && zn(er, e), jn.forEach(t), Dn.forEach(t), r = 0; r < tr.length; r++) o = tr[r], o.blockedOn === e && (o.blockedOn = null);
      for (; 0 < tr.length && (r = tr[0], r.blockedOn === null); ) hu(r), r.blockedOn === null && tr.shift();
    }
    var Gr = O.ReactCurrentBatchConfig, _o = true;
    function vm(e, t, r, o) {
      var s = xe, u = Gr.transition;
      Gr.transition = null;
      try {
        xe = 1, xl(e, t, r, o);
      } finally {
        xe = s, Gr.transition = u;
      }
    }
    function ym(e, t, r, o) {
      var s = xe, u = Gr.transition;
      Gr.transition = null;
      try {
        xe = 4, xl(e, t, r, o);
      } finally {
        xe = s, Gr.transition = u;
      }
    }
    function xl(e, t, r, o) {
      if (_o) {
        var s = kl(e, t, r, o);
        if (s === null) Fl(e, t, o, Oo, r), mu(e, o);
        else if (hm(s, e, t, r, o)) o.stopPropagation();
        else if (mu(e, o), t & 4 && -1 < mm.indexOf(e)) {
          for (; s !== null; ) {
            var u = qn(s);
            if (u !== null && cu(u), u = kl(e, t, r, o), u === null && Fl(e, t, o, Oo, r), u === s) break;
            s = u;
          }
          s !== null && o.stopPropagation();
        } else Fl(e, t, o, null, r);
      }
    }
    var Oo = null;
    function kl(e, t, r, o) {
      if (Oo = null, e = cl(o), e = Rr(e), e !== null) if (t = Tr(e), t === null) e = null;
      else if (r = t.tag, r === 13) {
        if (e = eu(t), e !== null) return e;
        e = null;
      } else if (r === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
      return Oo = e, null;
    }
    function vu(e) {
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
          switch (im()) {
            case hl:
              return 1;
            case lu:
              return 4;
            case Eo:
            case lm:
              return 16;
            case su:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var rr = null, Cl = null, jo = null;
    function yu() {
      if (jo) return jo;
      var e, t = Cl, r = t.length, o, s = "value" in rr ? rr.value : rr.textContent, u = s.length;
      for (e = 0; e < r && t[e] === s[e]; e++) ;
      var f = r - e;
      for (o = 1; o <= f && t[r - o] === s[u - o]; o++) ;
      return jo = s.slice(e, 1 < o ? 1 - o : void 0);
    }
    function Do(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function Bo() {
      return true;
    }
    function wu() {
      return false;
    }
    function lt(e) {
      function t(r, o, s, u, f) {
        this._reactName = r, this._targetInst = s, this.type = o, this.nativeEvent = u, this.target = f, this.currentTarget = null;
        for (var y in e) e.hasOwnProperty(y) && (r = e[y], this[y] = r ? r(u) : u[y]);
        return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === false) ? Bo : wu, this.isPropagationStopped = wu, this;
      }
      return G(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = true;
          var r = this.nativeEvent;
          r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = false), this.isDefaultPrevented = Bo);
        },
        stopPropagation: function() {
          var r = this.nativeEvent;
          r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = true), this.isPropagationStopped = Bo);
        },
        persist: function() {
        },
        isPersistent: Bo
      }), t;
    }
    var Kr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Pl = lt(Kr), In = G({}, Kr, {
      view: 0,
      detail: 0
    }), wm = lt(In), bl, El, Wn, zo = G({}, In, {
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
      getModifierState: Rl,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== Wn && (Wn && e.type === "mousemove" ? (bl = e.screenX - Wn.screenX, El = e.screenY - Wn.screenY) : El = bl = 0, Wn = e), bl);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : El;
      }
    }), Su = lt(zo), Sm = G({}, zo, {
      dataTransfer: 0
    }), xm = lt(Sm), km = G({}, In, {
      relatedTarget: 0
    }), Tl = lt(km), Cm = G({}, Kr, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Pm = lt(Cm), bm = G({}, Kr, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Em = lt(bm), Tm = G({}, Kr, {
      data: 0
    }), xu = lt(Tm), Rm = {
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
    }, Mm = {
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
    }, Nm = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Am(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = Nm[e]) ? !!t[e] : false;
    }
    function Rl() {
      return Am;
    }
    var Lm = G({}, In, {
      key: function(e) {
        if (e.key) {
          var t = Rm[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = Do(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Mm[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Rl,
      charCode: function(e) {
        return e.type === "keypress" ? Do(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Do(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), _m = lt(Lm), Om = G({}, zo, {
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
    }), ku = lt(Om), jm = G({}, In, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Rl
    }), Dm = lt(jm), Bm = G({}, Kr, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), zm = lt(Bm), Fm = G({}, zo, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), Im = lt(Fm), Wm = [
      9,
      13,
      27,
      32
    ], Ml = m && "CompositionEvent" in window, Hn = null;
    m && "documentMode" in document && (Hn = document.documentMode);
    var Hm = m && "TextEvent" in window && !Hn, Cu = m && (!Ml || Hn && 8 < Hn && 11 >= Hn), Pu = " ", bu = false;
    function Eu(e, t) {
      switch (e) {
        case "keyup":
          return Wm.indexOf(t.keyCode) !== -1;
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
    function Tu(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    var Qr = false;
    function Um(e, t) {
      switch (e) {
        case "compositionend":
          return Tu(t);
        case "keypress":
          return t.which !== 32 ? null : (bu = true, Pu);
        case "textInput":
          return e = t.data, e === Pu && bu ? null : e;
        default:
          return null;
      }
    }
    function Vm(e, t) {
      if (Qr) return e === "compositionend" || !Ml && Eu(e, t) ? (e = yu(), jo = Cl = rr = null, Qr = false, e) : null;
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
          return Cu && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var $m = {
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
    function Ru(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!$m[e.type] : t === "textarea";
    }
    function Mu(e, t, r, o) {
      Ya(o), t = Uo(t, "onChange"), 0 < t.length && (r = new Pl("onChange", "change", null, r, o), e.push({
        event: r,
        listeners: t
      }));
    }
    var Un = null, Vn = null;
    function Gm(e) {
      Ku(e, 0);
    }
    function Fo(e) {
      var t = Zr(e);
      if (ko(t)) return e;
    }
    function Km(e, t) {
      if (e === "change") return t;
    }
    var Nu = false;
    if (m) {
      var Nl;
      if (m) {
        var Al = "oninput" in document;
        if (!Al) {
          var Au = document.createElement("div");
          Au.setAttribute("oninput", "return;"), Al = typeof Au.oninput == "function";
        }
        Nl = Al;
      } else Nl = false;
      Nu = Nl && (!document.documentMode || 9 < document.documentMode);
    }
    function Lu() {
      Un && (Un.detachEvent("onpropertychange", _u), Vn = Un = null);
    }
    function _u(e) {
      if (e.propertyName === "value" && Fo(Vn)) {
        var t = [];
        Mu(t, Vn, e, cl(e)), Za(Gm, t);
      }
    }
    function Qm(e, t, r) {
      e === "focusin" ? (Lu(), Un = t, Vn = r, Un.attachEvent("onpropertychange", _u)) : e === "focusout" && Lu();
    }
    function Ym(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown") return Fo(Vn);
    }
    function Xm(e, t) {
      if (e === "click") return Fo(t);
    }
    function qm(e, t) {
      if (e === "input" || e === "change") return Fo(t);
    }
    function Jm(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var xt = typeof Object.is == "function" ? Object.is : Jm;
    function $n(e, t) {
      if (xt(e, t)) return true;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null) return false;
      var r = Object.keys(e), o = Object.keys(t);
      if (r.length !== o.length) return false;
      for (o = 0; o < r.length; o++) {
        var s = r[o];
        if (!g.call(t, s) || !xt(e[s], t[s])) return false;
      }
      return true;
    }
    function Ou(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function ju(e, t) {
      var r = Ou(e);
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
        r = Ou(r);
      }
    }
    function Du(e, t) {
      return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? Du(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
    }
    function Bu() {
      for (var e = window, t = It(); t instanceof e.HTMLIFrameElement; ) {
        try {
          var r = typeof t.contentWindow.location.href == "string";
        } catch {
          r = false;
        }
        if (r) e = t.contentWindow;
        else break;
        t = It(e.document);
      }
      return t;
    }
    function Ll(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function Zm(e) {
      var t = Bu(), r = e.focusedElem, o = e.selectionRange;
      if (t !== r && r && r.ownerDocument && Du(r.ownerDocument.documentElement, r)) {
        if (o !== null && Ll(r)) {
          if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in r) r.selectionStart = t, r.selectionEnd = Math.min(e, r.value.length);
          else if (e = (t = r.ownerDocument || document) && t.defaultView || window, e.getSelection) {
            e = e.getSelection();
            var s = r.textContent.length, u = Math.min(o.start, s);
            o = o.end === void 0 ? u : Math.min(o.end, s), !e.extend && u > o && (s = o, o = u, u = s), s = ju(r, u);
            var f = ju(r, o);
            s && f && (e.rangeCount !== 1 || e.anchorNode !== s.node || e.anchorOffset !== s.offset || e.focusNode !== f.node || e.focusOffset !== f.offset) && (t = t.createRange(), t.setStart(s.node, s.offset), e.removeAllRanges(), u > o ? (e.addRange(t), e.extend(f.node, f.offset)) : (t.setEnd(f.node, f.offset), e.addRange(t)));
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
    var eh = m && "documentMode" in document && 11 >= document.documentMode, Yr = null, _l = null, Gn = null, Ol = false;
    function zu(e, t, r) {
      var o = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
      Ol || Yr == null || Yr !== It(o) || (o = Yr, "selectionStart" in o && Ll(o) ? o = {
        start: o.selectionStart,
        end: o.selectionEnd
      } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
        anchorNode: o.anchorNode,
        anchorOffset: o.anchorOffset,
        focusNode: o.focusNode,
        focusOffset: o.focusOffset
      }), Gn && $n(Gn, o) || (Gn = o, o = Uo(_l, "onSelect"), 0 < o.length && (t = new Pl("onSelect", "select", null, t, r), e.push({
        event: t,
        listeners: o
      }), t.target = Yr)));
    }
    function Io(e, t) {
      var r = {};
      return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
    }
    var Xr = {
      animationend: Io("Animation", "AnimationEnd"),
      animationiteration: Io("Animation", "AnimationIteration"),
      animationstart: Io("Animation", "AnimationStart"),
      transitionend: Io("Transition", "TransitionEnd")
    }, jl = {}, Fu = {};
    m && (Fu = document.createElement("div").style, "AnimationEvent" in window || (delete Xr.animationend.animation, delete Xr.animationiteration.animation, delete Xr.animationstart.animation), "TransitionEvent" in window || delete Xr.transitionend.transition);
    function Wo(e) {
      if (jl[e]) return jl[e];
      if (!Xr[e]) return e;
      var t = Xr[e], r;
      for (r in t) if (t.hasOwnProperty(r) && r in Fu) return jl[e] = t[r];
      return e;
    }
    var Iu = Wo("animationend"), Wu = Wo("animationiteration"), Hu = Wo("animationstart"), Uu = Wo("transitionend"), Vu = /* @__PURE__ */ new Map(), $u = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    function nr(e, t) {
      Vu.set(e, t), d(t, [
        e
      ]);
    }
    for (var Dl = 0; Dl < $u.length; Dl++) {
      var Bl = $u[Dl], th = Bl.toLowerCase(), rh = Bl[0].toUpperCase() + Bl.slice(1);
      nr(th, "on" + rh);
    }
    nr(Iu, "onAnimationEnd"), nr(Wu, "onAnimationIteration"), nr(Hu, "onAnimationStart"), nr("dblclick", "onDoubleClick"), nr("focusin", "onFocus"), nr("focusout", "onBlur"), nr(Uu, "onTransitionEnd"), p("onMouseEnter", [
      "mouseout",
      "mouseover"
    ]), p("onMouseLeave", [
      "mouseout",
      "mouseover"
    ]), p("onPointerEnter", [
      "pointerout",
      "pointerover"
    ]), p("onPointerLeave", [
      "pointerout",
      "pointerover"
    ]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Kn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), nh = new Set("cancel close invalid load scroll toggle".split(" ").concat(Kn));
    function Gu(e, t, r) {
      var o = e.type || "unknown-event";
      e.currentTarget = r, tm(o, t, void 0, e), e.currentTarget = null;
    }
    function Ku(e, t) {
      t = (t & 4) !== 0;
      for (var r = 0; r < e.length; r++) {
        var o = e[r], s = o.event;
        o = o.listeners;
        e: {
          var u = void 0;
          if (t) for (var f = o.length - 1; 0 <= f; f--) {
            var y = o[f], k = y.instance, L = y.currentTarget;
            if (y = y.listener, k !== u && s.isPropagationStopped()) break e;
            Gu(s, y, L), u = k;
          }
          else for (f = 0; f < o.length; f++) {
            if (y = o[f], k = y.instance, L = y.currentTarget, y = y.listener, k !== u && s.isPropagationStopped()) break e;
            Gu(s, y, L), u = k;
          }
        }
      }
      if (bo) throw e = ml, bo = false, ml = null, e;
    }
    function be(e, t) {
      var r = t[$l];
      r === void 0 && (r = t[$l] = /* @__PURE__ */ new Set());
      var o = e + "__bubble";
      r.has(o) || (Qu(t, e, 2, false), r.add(o));
    }
    function zl(e, t, r) {
      var o = 0;
      t && (o |= 4), Qu(r, e, o, t);
    }
    var Ho = "_reactListening" + Math.random().toString(36).slice(2);
    function Qn(e) {
      if (!e[Ho]) {
        e[Ho] = true, a.forEach(function(r) {
          r !== "selectionchange" && (nh.has(r) || zl(r, false, e), zl(r, true, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Ho] || (t[Ho] = true, zl("selectionchange", false, t));
      }
    }
    function Qu(e, t, r, o) {
      switch (vu(t)) {
        case 1:
          var s = vm;
          break;
        case 4:
          s = ym;
          break;
        default:
          s = xl;
      }
      r = s.bind(null, t, r, e), s = void 0, !pl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = true), o ? s !== void 0 ? e.addEventListener(t, r, {
        capture: true,
        passive: s
      }) : e.addEventListener(t, r, true) : s !== void 0 ? e.addEventListener(t, r, {
        passive: s
      }) : e.addEventListener(t, r, false);
    }
    function Fl(e, t, r, o, s) {
      var u = o;
      if (!(t & 1) && !(t & 2) && o !== null) e: for (; ; ) {
        if (o === null) return;
        var f = o.tag;
        if (f === 3 || f === 4) {
          var y = o.stateNode.containerInfo;
          if (y === s || y.nodeType === 8 && y.parentNode === s) break;
          if (f === 4) for (f = o.return; f !== null; ) {
            var k = f.tag;
            if ((k === 3 || k === 4) && (k = f.stateNode.containerInfo, k === s || k.nodeType === 8 && k.parentNode === s)) return;
            f = f.return;
          }
          for (; y !== null; ) {
            if (f = Rr(y), f === null) return;
            if (k = f.tag, k === 5 || k === 6) {
              o = u = f;
              continue e;
            }
            y = y.parentNode;
          }
        }
        o = o.return;
      }
      Za(function() {
        var L = u, I = cl(r), H = [];
        e: {
          var F = Vu.get(e);
          if (F !== void 0) {
            var Q = Pl, q = e;
            switch (e) {
              case "keypress":
                if (Do(r) === 0) break e;
              case "keydown":
              case "keyup":
                Q = _m;
                break;
              case "focusin":
                q = "focus", Q = Tl;
                break;
              case "focusout":
                q = "blur", Q = Tl;
                break;
              case "beforeblur":
              case "afterblur":
                Q = Tl;
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
                Q = Su;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                Q = xm;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                Q = Dm;
                break;
              case Iu:
              case Wu:
              case Hu:
                Q = Pm;
                break;
              case Uu:
                Q = zm;
                break;
              case "scroll":
                Q = wm;
                break;
              case "wheel":
                Q = Im;
                break;
              case "copy":
              case "cut":
              case "paste":
                Q = Em;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                Q = ku;
            }
            var J = (t & 4) !== 0, _e = !J && e === "scroll", R = J ? F !== null ? F + "Capture" : null : F;
            J = [];
            for (var E = L, N; E !== null; ) {
              N = E;
              var V = N.stateNode;
              if (N.tag === 5 && V !== null && (N = V, R !== null && (V = Nn(E, R), V != null && J.push(Yn(E, V, N)))), _e) break;
              E = E.return;
            }
            0 < J.length && (F = new Q(F, q, null, r, I), H.push({
              event: F,
              listeners: J
            }));
          }
        }
        if (!(t & 7)) {
          e: {
            if (F = e === "mouseover" || e === "pointerover", Q = e === "mouseout" || e === "pointerout", F && r !== ul && (q = r.relatedTarget || r.fromElement) && (Rr(q) || q[Wt])) break e;
            if ((Q || F) && (F = I.window === I ? I : (F = I.ownerDocument) ? F.defaultView || F.parentWindow : window, Q ? (q = r.relatedTarget || r.toElement, Q = L, q = q ? Rr(q) : null, q !== null && (_e = Tr(q), q !== _e || q.tag !== 5 && q.tag !== 6) && (q = null)) : (Q = null, q = L), Q !== q)) {
              if (J = Su, V = "onMouseLeave", R = "onMouseEnter", E = "mouse", (e === "pointerout" || e === "pointerover") && (J = ku, V = "onPointerLeave", R = "onPointerEnter", E = "pointer"), _e = Q == null ? F : Zr(Q), N = q == null ? F : Zr(q), F = new J(V, E + "leave", Q, r, I), F.target = _e, F.relatedTarget = N, V = null, Rr(I) === L && (J = new J(R, E + "enter", q, r, I), J.target = N, J.relatedTarget = _e, V = J), _e = V, Q && q) t: {
                for (J = Q, R = q, E = 0, N = J; N; N = qr(N)) E++;
                for (N = 0, V = R; V; V = qr(V)) N++;
                for (; 0 < E - N; ) J = qr(J), E--;
                for (; 0 < N - E; ) R = qr(R), N--;
                for (; E--; ) {
                  if (J === R || R !== null && J === R.alternate) break t;
                  J = qr(J), R = qr(R);
                }
                J = null;
              }
              else J = null;
              Q !== null && Yu(H, F, Q, J, false), q !== null && _e !== null && Yu(H, _e, q, J, true);
            }
          }
          e: {
            if (F = L ? Zr(L) : window, Q = F.nodeName && F.nodeName.toLowerCase(), Q === "select" || Q === "input" && F.type === "file") var Z = Km;
            else if (Ru(F)) if (Nu) Z = qm;
            else {
              Z = Ym;
              var oe = Qm;
            }
            else (Q = F.nodeName) && Q.toLowerCase() === "input" && (F.type === "checkbox" || F.type === "radio") && (Z = Xm);
            if (Z && (Z = Z(e, L))) {
              Mu(H, Z, r, I);
              break e;
            }
            oe && oe(e, F, L), e === "focusout" && (oe = F._wrapperState) && oe.controlled && F.type === "number" && ol(F, "number", F.value);
          }
          switch (oe = L ? Zr(L) : window, e) {
            case "focusin":
              (Ru(oe) || oe.contentEditable === "true") && (Yr = oe, _l = L, Gn = null);
              break;
            case "focusout":
              Gn = _l = Yr = null;
              break;
            case "mousedown":
              Ol = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Ol = false, zu(H, r, I);
              break;
            case "selectionchange":
              if (eh) break;
            case "keydown":
            case "keyup":
              zu(H, r, I);
          }
          var ie;
          if (Ml) e: {
            switch (e) {
              case "compositionstart":
                var le = "onCompositionStart";
                break e;
              case "compositionend":
                le = "onCompositionEnd";
                break e;
              case "compositionupdate":
                le = "onCompositionUpdate";
                break e;
            }
            le = void 0;
          }
          else Qr ? Eu(e, r) && (le = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (le = "onCompositionStart");
          le && (Cu && r.locale !== "ko" && (Qr || le !== "onCompositionStart" ? le === "onCompositionEnd" && Qr && (ie = yu()) : (rr = I, Cl = "value" in rr ? rr.value : rr.textContent, Qr = true)), oe = Uo(L, le), 0 < oe.length && (le = new xu(le, e, null, r, I), H.push({
            event: le,
            listeners: oe
          }), ie ? le.data = ie : (ie = Tu(r), ie !== null && (le.data = ie)))), (ie = Hm ? Um(e, r) : Vm(e, r)) && (L = Uo(L, "onBeforeInput"), 0 < L.length && (I = new xu("onBeforeInput", "beforeinput", null, r, I), H.push({
            event: I,
            listeners: L
          }), I.data = ie));
        }
        Ku(H, t);
      });
    }
    function Yn(e, t, r) {
      return {
        instance: e,
        listener: t,
        currentTarget: r
      };
    }
    function Uo(e, t) {
      for (var r = t + "Capture", o = []; e !== null; ) {
        var s = e, u = s.stateNode;
        s.tag === 5 && u !== null && (s = u, u = Nn(e, r), u != null && o.unshift(Yn(e, u, s)), u = Nn(e, t), u != null && o.push(Yn(e, u, s))), e = e.return;
      }
      return o;
    }
    function qr(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5);
      return e || null;
    }
    function Yu(e, t, r, o, s) {
      for (var u = t._reactName, f = []; r !== null && r !== o; ) {
        var y = r, k = y.alternate, L = y.stateNode;
        if (k !== null && k === o) break;
        y.tag === 5 && L !== null && (y = L, s ? (k = Nn(r, u), k != null && f.unshift(Yn(r, k, y))) : s || (k = Nn(r, u), k != null && f.push(Yn(r, k, y)))), r = r.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    var oh = /\r\n?/g, ih = /\u0000|\uFFFD/g;
    function Xu(e) {
      return (typeof e == "string" ? e : "" + e).replace(oh, `
`).replace(ih, "");
    }
    function Vo(e, t, r) {
      if (t = Xu(t), Xu(e) !== t && r) throw Error(l(425));
    }
    function $o() {
    }
    var Il = null, Wl = null;
    function Hl(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    var Ul = typeof setTimeout == "function" ? setTimeout : void 0, lh = typeof clearTimeout == "function" ? clearTimeout : void 0, qu = typeof Promise == "function" ? Promise : void 0, sh = typeof queueMicrotask == "function" ? queueMicrotask : typeof qu < "u" ? function(e) {
      return qu.resolve(null).then(e).catch(ah);
    } : Ul;
    function ah(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function Vl(e, t) {
      var r = t, o = 0;
      do {
        var s = r.nextSibling;
        if (e.removeChild(r), s && s.nodeType === 8) if (r = s.data, r === "/$") {
          if (o === 0) {
            e.removeChild(s), Fn(t);
            return;
          }
          o--;
        } else r !== "$" && r !== "$?" && r !== "$!" || o++;
        r = s;
      } while (r);
      Fn(t);
    }
    function or(e) {
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
    function Ju(e) {
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
    var Jr = Math.random().toString(36).slice(2), At = "__reactFiber$" + Jr, Xn = "__reactProps$" + Jr, Wt = "__reactContainer$" + Jr, $l = "__reactEvents$" + Jr, uh = "__reactListeners$" + Jr, ch = "__reactHandles$" + Jr;
    function Rr(e) {
      var t = e[At];
      if (t) return t;
      for (var r = e.parentNode; r; ) {
        if (t = r[Wt] || r[At]) {
          if (r = t.alternate, t.child !== null || r !== null && r.child !== null) for (e = Ju(e); e !== null; ) {
            if (r = e[At]) return r;
            e = Ju(e);
          }
          return t;
        }
        e = r, r = e.parentNode;
      }
      return null;
    }
    function qn(e) {
      return e = e[At] || e[Wt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
    }
    function Zr(e) {
      if (e.tag === 5 || e.tag === 6) return e.stateNode;
      throw Error(l(33));
    }
    function Go(e) {
      return e[Xn] || null;
    }
    var Gl = [], en = -1;
    function ir(e) {
      return {
        current: e
      };
    }
    function Ee(e) {
      0 > en || (e.current = Gl[en], Gl[en] = null, en--);
    }
    function Pe(e, t) {
      en++, Gl[en] = e.current, e.current = t;
    }
    var lr = {}, Ve = ir(lr), et = ir(false), Mr = lr;
    function tn(e, t) {
      var r = e.type.contextTypes;
      if (!r) return lr;
      var o = e.stateNode;
      if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
      var s = {}, u;
      for (u in r) s[u] = t[u];
      return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = s), s;
    }
    function tt(e) {
      return e = e.childContextTypes, e != null;
    }
    function Ko() {
      Ee(et), Ee(Ve);
    }
    function Zu(e, t, r) {
      if (Ve.current !== lr) throw Error(l(168));
      Pe(Ve, t), Pe(et, r);
    }
    function ec(e, t, r) {
      var o = e.stateNode;
      if (t = t.childContextTypes, typeof o.getChildContext != "function") return r;
      o = o.getChildContext();
      for (var s in o) if (!(s in t)) throw Error(l(108, ye(e) || "Unknown", s));
      return G({}, r, o);
    }
    function Qo(e) {
      return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || lr, Mr = Ve.current, Pe(Ve, e), Pe(et, et.current), true;
    }
    function tc(e, t, r) {
      var o = e.stateNode;
      if (!o) throw Error(l(169));
      r ? (e = ec(e, t, Mr), o.__reactInternalMemoizedMergedChildContext = e, Ee(et), Ee(Ve), Pe(Ve, e)) : Ee(et), Pe(et, r);
    }
    var Ht = null, Yo = false, Kl = false;
    function rc(e) {
      Ht === null ? Ht = [
        e
      ] : Ht.push(e);
    }
    function dh(e) {
      Yo = true, rc(e);
    }
    function sr() {
      if (!Kl && Ht !== null) {
        Kl = true;
        var e = 0, t = xe;
        try {
          var r = Ht;
          for (xe = 1; e < r.length; e++) {
            var o = r[e];
            do
              o = o(true);
            while (o !== null);
          }
          Ht = null, Yo = false;
        } catch (s) {
          throw Ht !== null && (Ht = Ht.slice(e + 1)), ou(hl, sr), s;
        } finally {
          xe = t, Kl = false;
        }
      }
      return null;
    }
    var rn = [], nn = 0, Xo = null, qo = 0, ft = [], pt = 0, Nr = null, Ut = 1, Vt = "";
    function Ar(e, t) {
      rn[nn++] = qo, rn[nn++] = Xo, Xo = e, qo = t;
    }
    function nc(e, t, r) {
      ft[pt++] = Ut, ft[pt++] = Vt, ft[pt++] = Nr, Nr = e;
      var o = Ut;
      e = Vt;
      var s = 32 - St(o) - 1;
      o &= ~(1 << s), r += 1;
      var u = 32 - St(t) + s;
      if (30 < u) {
        var f = s - s % 5;
        u = (o & (1 << f) - 1).toString(32), o >>= f, s -= f, Ut = 1 << 32 - St(t) + s | r << s | o, Vt = u + e;
      } else Ut = 1 << u | r << s | o, Vt = e;
    }
    function Ql(e) {
      e.return !== null && (Ar(e, 1), nc(e, 1, 0));
    }
    function Yl(e) {
      for (; e === Xo; ) Xo = rn[--nn], rn[nn] = null, qo = rn[--nn], rn[nn] = null;
      for (; e === Nr; ) Nr = ft[--pt], ft[pt] = null, Vt = ft[--pt], ft[pt] = null, Ut = ft[--pt], ft[pt] = null;
    }
    var st = null, at = null, Re = false, kt = null;
    function oc(e, t) {
      var r = vt(5, null, null, 0);
      r.elementType = "DELETED", r.stateNode = t, r.return = e, t = e.deletions, t === null ? (e.deletions = [
        r
      ], e.flags |= 16) : t.push(r);
    }
    function ic(e, t) {
      switch (e.tag) {
        case 5:
          var r = e.type;
          return t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, st = e, at = or(t.firstChild), true) : false;
        case 6:
          return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, st = e, at = null, true) : false;
        case 13:
          return t = t.nodeType !== 8 ? null : t, t !== null ? (r = Nr !== null ? {
            id: Ut,
            overflow: Vt
          } : null, e.memoizedState = {
            dehydrated: t,
            treeContext: r,
            retryLane: 1073741824
          }, r = vt(18, null, null, 0), r.stateNode = t, r.return = e, e.child = r, st = e, at = null, true) : false;
        default:
          return false;
      }
    }
    function Xl(e) {
      return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
    }
    function ql(e) {
      if (Re) {
        var t = at;
        if (t) {
          var r = t;
          if (!ic(e, t)) {
            if (Xl(e)) throw Error(l(418));
            t = or(r.nextSibling);
            var o = st;
            t && ic(e, t) ? oc(o, r) : (e.flags = e.flags & -4097 | 2, Re = false, st = e);
          }
        } else {
          if (Xl(e)) throw Error(l(418));
          e.flags = e.flags & -4097 | 2, Re = false, st = e;
        }
      }
    }
    function lc(e) {
      for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
      st = e;
    }
    function Jo(e) {
      if (e !== st) return false;
      if (!Re) return lc(e), Re = true, false;
      var t;
      if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Hl(e.type, e.memoizedProps)), t && (t = at)) {
        if (Xl(e)) throw sc(), Error(l(418));
        for (; t; ) oc(e, t), t = or(t.nextSibling);
      }
      if (lc(e), e.tag === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
        e: {
          for (e = e.nextSibling, t = 0; e; ) {
            if (e.nodeType === 8) {
              var r = e.data;
              if (r === "/$") {
                if (t === 0) {
                  at = or(e.nextSibling);
                  break e;
                }
                t--;
              } else r !== "$" && r !== "$!" && r !== "$?" || t++;
            }
            e = e.nextSibling;
          }
          at = null;
        }
      } else at = st ? or(e.stateNode.nextSibling) : null;
      return true;
    }
    function sc() {
      for (var e = at; e; ) e = or(e.nextSibling);
    }
    function on() {
      at = st = null, Re = false;
    }
    function Jl(e) {
      kt === null ? kt = [
        e
      ] : kt.push(e);
    }
    var fh = O.ReactCurrentBatchConfig;
    function Jn(e, t, r) {
      if (e = r.ref, e !== null && typeof e != "function" && typeof e != "object") {
        if (r._owner) {
          if (r = r._owner, r) {
            if (r.tag !== 1) throw Error(l(309));
            var o = r.stateNode;
          }
          if (!o) throw Error(l(147, e));
          var s = o, u = "" + e;
          return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === u ? t.ref : (t = function(f) {
            var y = s.refs;
            f === null ? delete y[u] : y[u] = f;
          }, t._stringRef = u, t);
        }
        if (typeof e != "string") throw Error(l(284));
        if (!r._owner) throw Error(l(290, e));
      }
      return e;
    }
    function Zo(e, t) {
      throw e = Object.prototype.toString.call(t), Error(l(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
    }
    function ac(e) {
      var t = e._init;
      return t(e._payload);
    }
    function uc(e) {
      function t(R, E) {
        if (e) {
          var N = R.deletions;
          N === null ? (R.deletions = [
            E
          ], R.flags |= 16) : N.push(E);
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
      function s(R, E) {
        return R = hr(R, E), R.index = 0, R.sibling = null, R;
      }
      function u(R, E, N) {
        return R.index = N, e ? (N = R.alternate, N !== null ? (N = N.index, N < E ? (R.flags |= 2, E) : N) : (R.flags |= 2, E)) : (R.flags |= 1048576, E);
      }
      function f(R) {
        return e && R.alternate === null && (R.flags |= 2), R;
      }
      function y(R, E, N, V) {
        return E === null || E.tag !== 6 ? (E = Us(N, R.mode, V), E.return = R, E) : (E = s(E, N), E.return = R, E);
      }
      function k(R, E, N, V) {
        var Z = N.type;
        return Z === D ? I(R, E, N.props.children, V, N.key) : E !== null && (E.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === de && ac(Z) === E.type) ? (V = s(E, N.props), V.ref = Jn(R, E, N), V.return = R, V) : (V = Ci(N.type, N.key, N.props, null, R.mode, V), V.ref = Jn(R, E, N), V.return = R, V);
      }
      function L(R, E, N, V) {
        return E === null || E.tag !== 4 || E.stateNode.containerInfo !== N.containerInfo || E.stateNode.implementation !== N.implementation ? (E = Vs(N, R.mode, V), E.return = R, E) : (E = s(E, N.children || []), E.return = R, E);
      }
      function I(R, E, N, V, Z) {
        return E === null || E.tag !== 7 ? (E = Fr(N, R.mode, V, Z), E.return = R, E) : (E = s(E, N), E.return = R, E);
      }
      function H(R, E, N) {
        if (typeof E == "string" && E !== "" || typeof E == "number") return E = Us("" + E, R.mode, N), E.return = R, E;
        if (typeof E == "object" && E !== null) {
          switch (E.$$typeof) {
            case j:
              return N = Ci(E.type, E.key, E.props, null, R.mode, N), N.ref = Jn(R, null, E), N.return = R, N;
            case $:
              return E = Vs(E, R.mode, N), E.return = R, E;
            case de:
              var V = E._init;
              return H(R, V(E._payload), N);
          }
          if (Tn(E) || K(E)) return E = Fr(E, R.mode, N, null), E.return = R, E;
          Zo(R, E);
        }
        return null;
      }
      function F(R, E, N, V) {
        var Z = E !== null ? E.key : null;
        if (typeof N == "string" && N !== "" || typeof N == "number") return Z !== null ? null : y(R, E, "" + N, V);
        if (typeof N == "object" && N !== null) {
          switch (N.$$typeof) {
            case j:
              return N.key === Z ? k(R, E, N, V) : null;
            case $:
              return N.key === Z ? L(R, E, N, V) : null;
            case de:
              return Z = N._init, F(R, E, Z(N._payload), V);
          }
          if (Tn(N) || K(N)) return Z !== null ? null : I(R, E, N, V, null);
          Zo(R, N);
        }
        return null;
      }
      function Q(R, E, N, V, Z) {
        if (typeof V == "string" && V !== "" || typeof V == "number") return R = R.get(N) || null, y(E, R, "" + V, Z);
        if (typeof V == "object" && V !== null) {
          switch (V.$$typeof) {
            case j:
              return R = R.get(V.key === null ? N : V.key) || null, k(E, R, V, Z);
            case $:
              return R = R.get(V.key === null ? N : V.key) || null, L(E, R, V, Z);
            case de:
              var oe = V._init;
              return Q(R, E, N, oe(V._payload), Z);
          }
          if (Tn(V) || K(V)) return R = R.get(N) || null, I(E, R, V, Z, null);
          Zo(E, V);
        }
        return null;
      }
      function q(R, E, N, V) {
        for (var Z = null, oe = null, ie = E, le = E = 0, Fe = null; ie !== null && le < N.length; le++) {
          ie.index > le ? (Fe = ie, ie = null) : Fe = ie.sibling;
          var Se = F(R, ie, N[le], V);
          if (Se === null) {
            ie === null && (ie = Fe);
            break;
          }
          e && ie && Se.alternate === null && t(R, ie), E = u(Se, E, le), oe === null ? Z = Se : oe.sibling = Se, oe = Se, ie = Fe;
        }
        if (le === N.length) return r(R, ie), Re && Ar(R, le), Z;
        if (ie === null) {
          for (; le < N.length; le++) ie = H(R, N[le], V), ie !== null && (E = u(ie, E, le), oe === null ? Z = ie : oe.sibling = ie, oe = ie);
          return Re && Ar(R, le), Z;
        }
        for (ie = o(R, ie); le < N.length; le++) Fe = Q(ie, R, le, N[le], V), Fe !== null && (e && Fe.alternate !== null && ie.delete(Fe.key === null ? le : Fe.key), E = u(Fe, E, le), oe === null ? Z = Fe : oe.sibling = Fe, oe = Fe);
        return e && ie.forEach(function(gr) {
          return t(R, gr);
        }), Re && Ar(R, le), Z;
      }
      function J(R, E, N, V) {
        var Z = K(N);
        if (typeof Z != "function") throw Error(l(150));
        if (N = Z.call(N), N == null) throw Error(l(151));
        for (var oe = Z = null, ie = E, le = E = 0, Fe = null, Se = N.next(); ie !== null && !Se.done; le++, Se = N.next()) {
          ie.index > le ? (Fe = ie, ie = null) : Fe = ie.sibling;
          var gr = F(R, ie, Se.value, V);
          if (gr === null) {
            ie === null && (ie = Fe);
            break;
          }
          e && ie && gr.alternate === null && t(R, ie), E = u(gr, E, le), oe === null ? Z = gr : oe.sibling = gr, oe = gr, ie = Fe;
        }
        if (Se.done) return r(R, ie), Re && Ar(R, le), Z;
        if (ie === null) {
          for (; !Se.done; le++, Se = N.next()) Se = H(R, Se.value, V), Se !== null && (E = u(Se, E, le), oe === null ? Z = Se : oe.sibling = Se, oe = Se);
          return Re && Ar(R, le), Z;
        }
        for (ie = o(R, ie); !Se.done; le++, Se = N.next()) Se = Q(ie, R, le, Se.value, V), Se !== null && (e && Se.alternate !== null && ie.delete(Se.key === null ? le : Se.key), E = u(Se, E, le), oe === null ? Z = Se : oe.sibling = Se, oe = Se);
        return e && ie.forEach(function($h) {
          return t(R, $h);
        }), Re && Ar(R, le), Z;
      }
      function _e(R, E, N, V) {
        if (typeof N == "object" && N !== null && N.type === D && N.key === null && (N = N.props.children), typeof N == "object" && N !== null) {
          switch (N.$$typeof) {
            case j:
              e: {
                for (var Z = N.key, oe = E; oe !== null; ) {
                  if (oe.key === Z) {
                    if (Z = N.type, Z === D) {
                      if (oe.tag === 7) {
                        r(R, oe.sibling), E = s(oe, N.props.children), E.return = R, R = E;
                        break e;
                      }
                    } else if (oe.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === de && ac(Z) === oe.type) {
                      r(R, oe.sibling), E = s(oe, N.props), E.ref = Jn(R, oe, N), E.return = R, R = E;
                      break e;
                    }
                    r(R, oe);
                    break;
                  } else t(R, oe);
                  oe = oe.sibling;
                }
                N.type === D ? (E = Fr(N.props.children, R.mode, V, N.key), E.return = R, R = E) : (V = Ci(N.type, N.key, N.props, null, R.mode, V), V.ref = Jn(R, E, N), V.return = R, R = V);
              }
              return f(R);
            case $:
              e: {
                for (oe = N.key; E !== null; ) {
                  if (E.key === oe) if (E.tag === 4 && E.stateNode.containerInfo === N.containerInfo && E.stateNode.implementation === N.implementation) {
                    r(R, E.sibling), E = s(E, N.children || []), E.return = R, R = E;
                    break e;
                  } else {
                    r(R, E);
                    break;
                  }
                  else t(R, E);
                  E = E.sibling;
                }
                E = Vs(N, R.mode, V), E.return = R, R = E;
              }
              return f(R);
            case de:
              return oe = N._init, _e(R, E, oe(N._payload), V);
          }
          if (Tn(N)) return q(R, E, N, V);
          if (K(N)) return J(R, E, N, V);
          Zo(R, N);
        }
        return typeof N == "string" && N !== "" || typeof N == "number" ? (N = "" + N, E !== null && E.tag === 6 ? (r(R, E.sibling), E = s(E, N), E.return = R, R = E) : (r(R, E), E = Us(N, R.mode, V), E.return = R, R = E), f(R)) : r(R, E);
      }
      return _e;
    }
    var ln = uc(true), cc = uc(false), ei = ir(null), ti = null, sn = null, Zl = null;
    function es() {
      Zl = sn = ti = null;
    }
    function ts(e) {
      var t = ei.current;
      Ee(ei), e._currentValue = t;
    }
    function rs(e, t, r) {
      for (; e !== null; ) {
        var o = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === r) break;
        e = e.return;
      }
    }
    function an(e, t) {
      ti = e, Zl = sn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (rt = true), e.firstContext = null);
    }
    function mt(e) {
      var t = e._currentValue;
      if (Zl !== e) if (e = {
        context: e,
        memoizedValue: t,
        next: null
      }, sn === null) {
        if (ti === null) throw Error(l(308));
        sn = e, ti.dependencies = {
          lanes: 0,
          firstContext: e
        };
      } else sn = sn.next = e;
      return t;
    }
    var Lr = null;
    function ns(e) {
      Lr === null ? Lr = [
        e
      ] : Lr.push(e);
    }
    function dc(e, t, r, o) {
      var s = t.interleaved;
      return s === null ? (r.next = r, ns(t)) : (r.next = s.next, s.next = r), t.interleaved = r, $t(e, o);
    }
    function $t(e, t) {
      e.lanes |= t;
      var r = e.alternate;
      for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; ) e.childLanes |= t, r = e.alternate, r !== null && (r.childLanes |= t), r = e, e = e.return;
      return r.tag === 3 ? r.stateNode : null;
    }
    var ar = false;
    function os(e) {
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
    function fc(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
      });
    }
    function Gt(e, t) {
      return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
      };
    }
    function ur(e, t, r) {
      var o = e.updateQueue;
      if (o === null) return null;
      if (o = o.shared, ve & 2) {
        var s = o.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), o.pending = t, $t(e, r);
      }
      return s = o.interleaved, s === null ? (t.next = t, ns(o)) : (t.next = s.next, s.next = t), o.interleaved = t, $t(e, r);
    }
    function ri(e, t, r) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194240) !== 0)) {
        var o = t.lanes;
        o &= e.pendingLanes, r |= o, t.lanes = r, yl(e, r);
      }
    }
    function pc(e, t) {
      var r = e.updateQueue, o = e.alternate;
      if (o !== null && (o = o.updateQueue, r === o)) {
        var s = null, u = null;
        if (r = r.firstBaseUpdate, r !== null) {
          do {
            var f = {
              eventTime: r.eventTime,
              lane: r.lane,
              tag: r.tag,
              payload: r.payload,
              callback: r.callback,
              next: null
            };
            u === null ? s = u = f : u = u.next = f, r = r.next;
          } while (r !== null);
          u === null ? s = u = t : u = u.next = t;
        } else s = u = t;
        r = {
          baseState: o.baseState,
          firstBaseUpdate: s,
          lastBaseUpdate: u,
          shared: o.shared,
          effects: o.effects
        }, e.updateQueue = r;
        return;
      }
      e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t;
    }
    function ni(e, t, r, o) {
      var s = e.updateQueue;
      ar = false;
      var u = s.firstBaseUpdate, f = s.lastBaseUpdate, y = s.shared.pending;
      if (y !== null) {
        s.shared.pending = null;
        var k = y, L = k.next;
        k.next = null, f === null ? u = L : f.next = L, f = k;
        var I = e.alternate;
        I !== null && (I = I.updateQueue, y = I.lastBaseUpdate, y !== f && (y === null ? I.firstBaseUpdate = L : y.next = L, I.lastBaseUpdate = k));
      }
      if (u !== null) {
        var H = s.baseState;
        f = 0, I = L = k = null, y = u;
        do {
          var F = y.lane, Q = y.eventTime;
          if ((o & F) === F) {
            I !== null && (I = I.next = {
              eventTime: Q,
              lane: 0,
              tag: y.tag,
              payload: y.payload,
              callback: y.callback,
              next: null
            });
            e: {
              var q = e, J = y;
              switch (F = t, Q = r, J.tag) {
                case 1:
                  if (q = J.payload, typeof q == "function") {
                    H = q.call(Q, H, F);
                    break e;
                  }
                  H = q;
                  break e;
                case 3:
                  q.flags = q.flags & -65537 | 128;
                case 0:
                  if (q = J.payload, F = typeof q == "function" ? q.call(Q, H, F) : q, F == null) break e;
                  H = G({}, H, F);
                  break e;
                case 2:
                  ar = true;
              }
            }
            y.callback !== null && y.lane !== 0 && (e.flags |= 64, F = s.effects, F === null ? s.effects = [
              y
            ] : F.push(y));
          } else Q = {
            eventTime: Q,
            lane: F,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null
          }, I === null ? (L = I = Q, k = H) : I = I.next = Q, f |= F;
          if (y = y.next, y === null) {
            if (y = s.shared.pending, y === null) break;
            F = y, y = F.next, F.next = null, s.lastBaseUpdate = F, s.shared.pending = null;
          }
        } while (true);
        if (I === null && (k = H), s.baseState = k, s.firstBaseUpdate = L, s.lastBaseUpdate = I, t = s.shared.interleaved, t !== null) {
          s = t;
          do
            f |= s.lane, s = s.next;
          while (s !== t);
        } else u === null && (s.shared.lanes = 0);
        jr |= f, e.lanes = f, e.memoizedState = H;
      }
    }
    function mc(e, t, r) {
      if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
        var o = e[t], s = o.callback;
        if (s !== null) {
          if (o.callback = null, o = r, typeof s != "function") throw Error(l(191, s));
          s.call(o);
        }
      }
    }
    var Zn = {}, Lt = ir(Zn), eo = ir(Zn), to = ir(Zn);
    function _r(e) {
      if (e === Zn) throw Error(l(174));
      return e;
    }
    function is(e, t) {
      switch (Pe(to, t), Pe(eo, e), Pe(Lt, Zn), e = t.nodeType, e) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : ll(null, "");
          break;
        default:
          e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ll(t, e);
      }
      Ee(Lt), Pe(Lt, t);
    }
    function un() {
      Ee(Lt), Ee(eo), Ee(to);
    }
    function hc(e) {
      _r(to.current);
      var t = _r(Lt.current), r = ll(t, e.type);
      t !== r && (Pe(eo, e), Pe(Lt, r));
    }
    function ls(e) {
      eo.current === e && (Ee(Lt), Ee(eo));
    }
    var Me = ir(0);
    function oi(e) {
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
    var ss = [];
    function as() {
      for (var e = 0; e < ss.length; e++) ss[e]._workInProgressVersionPrimary = null;
      ss.length = 0;
    }
    var ii = O.ReactCurrentDispatcher, us = O.ReactCurrentBatchConfig, Or = 0, Ne = null, je = null, Be = null, li = false, ro = false, no = 0, ph = 0;
    function $e() {
      throw Error(l(321));
    }
    function cs(e, t) {
      if (t === null) return false;
      for (var r = 0; r < t.length && r < e.length; r++) if (!xt(e[r], t[r])) return false;
      return true;
    }
    function ds(e, t, r, o, s, u) {
      if (Or = u, Ne = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ii.current = e === null || e.memoizedState === null ? vh : yh, e = r(o, s), ro) {
        u = 0;
        do {
          if (ro = false, no = 0, 25 <= u) throw Error(l(301));
          u += 1, Be = je = null, t.updateQueue = null, ii.current = wh, e = r(o, s);
        } while (ro);
      }
      if (ii.current = ui, t = je !== null && je.next !== null, Or = 0, Be = je = Ne = null, li = false, t) throw Error(l(300));
      return e;
    }
    function fs() {
      var e = no !== 0;
      return no = 0, e;
    }
    function _t() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return Be === null ? Ne.memoizedState = Be = e : Be = Be.next = e, Be;
    }
    function ht() {
      if (je === null) {
        var e = Ne.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = je.next;
      var t = Be === null ? Ne.memoizedState : Be.next;
      if (t !== null) Be = t, je = e;
      else {
        if (e === null) throw Error(l(310));
        je = e, e = {
          memoizedState: je.memoizedState,
          baseState: je.baseState,
          baseQueue: je.baseQueue,
          queue: je.queue,
          next: null
        }, Be === null ? Ne.memoizedState = Be = e : Be = Be.next = e;
      }
      return Be;
    }
    function oo(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function ps(e) {
      var t = ht(), r = t.queue;
      if (r === null) throw Error(l(311));
      r.lastRenderedReducer = e;
      var o = je, s = o.baseQueue, u = r.pending;
      if (u !== null) {
        if (s !== null) {
          var f = s.next;
          s.next = u.next, u.next = f;
        }
        o.baseQueue = s = u, r.pending = null;
      }
      if (s !== null) {
        u = s.next, o = o.baseState;
        var y = f = null, k = null, L = u;
        do {
          var I = L.lane;
          if ((Or & I) === I) k !== null && (k = k.next = {
            lane: 0,
            action: L.action,
            hasEagerState: L.hasEagerState,
            eagerState: L.eagerState,
            next: null
          }), o = L.hasEagerState ? L.eagerState : e(o, L.action);
          else {
            var H = {
              lane: I,
              action: L.action,
              hasEagerState: L.hasEagerState,
              eagerState: L.eagerState,
              next: null
            };
            k === null ? (y = k = H, f = o) : k = k.next = H, Ne.lanes |= I, jr |= I;
          }
          L = L.next;
        } while (L !== null && L !== u);
        k === null ? f = o : k.next = y, xt(o, t.memoizedState) || (rt = true), t.memoizedState = o, t.baseState = f, t.baseQueue = k, r.lastRenderedState = o;
      }
      if (e = r.interleaved, e !== null) {
        s = e;
        do
          u = s.lane, Ne.lanes |= u, jr |= u, s = s.next;
        while (s !== e);
      } else s === null && (r.lanes = 0);
      return [
        t.memoizedState,
        r.dispatch
      ];
    }
    function ms(e) {
      var t = ht(), r = t.queue;
      if (r === null) throw Error(l(311));
      r.lastRenderedReducer = e;
      var o = r.dispatch, s = r.pending, u = t.memoizedState;
      if (s !== null) {
        r.pending = null;
        var f = s = s.next;
        do
          u = e(u, f.action), f = f.next;
        while (f !== s);
        xt(u, t.memoizedState) || (rt = true), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), r.lastRenderedState = u;
      }
      return [
        u,
        o
      ];
    }
    function gc() {
    }
    function vc(e, t) {
      var r = Ne, o = ht(), s = t(), u = !xt(o.memoizedState, s);
      if (u && (o.memoizedState = s, rt = true), o = o.queue, hs(Sc.bind(null, r, o, e), [
        e
      ]), o.getSnapshot !== t || u || Be !== null && Be.memoizedState.tag & 1) {
        if (r.flags |= 2048, io(9, wc.bind(null, r, o, s, t), void 0, null), ze === null) throw Error(l(349));
        Or & 30 || yc(r, t, s);
      }
      return s;
    }
    function yc(e, t, r) {
      e.flags |= 16384, e = {
        getSnapshot: t,
        value: r
      }, t = Ne.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
      }, Ne.updateQueue = t, t.stores = [
        e
      ]) : (r = t.stores, r === null ? t.stores = [
        e
      ] : r.push(e));
    }
    function wc(e, t, r, o) {
      t.value = r, t.getSnapshot = o, xc(t) && kc(e);
    }
    function Sc(e, t, r) {
      return r(function() {
        xc(t) && kc(e);
      });
    }
    function xc(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var r = t();
        return !xt(e, r);
      } catch {
        return true;
      }
    }
    function kc(e) {
      var t = $t(e, 1);
      t !== null && Et(t, e, 1, -1);
    }
    function Cc(e) {
      var t = _t();
      return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: oo,
        lastRenderedState: e
      }, t.queue = e, e = e.dispatch = gh.bind(null, Ne, e), [
        t.memoizedState,
        e
      ];
    }
    function io(e, t, r, o) {
      return e = {
        tag: e,
        create: t,
        destroy: r,
        deps: o,
        next: null
      }, t = Ne.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
      }, Ne.updateQueue = t, t.lastEffect = e.next = e) : (r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (o = r.next, r.next = e, e.next = o, t.lastEffect = e)), e;
    }
    function Pc() {
      return ht().memoizedState;
    }
    function si(e, t, r, o) {
      var s = _t();
      Ne.flags |= e, s.memoizedState = io(1 | t, r, void 0, o === void 0 ? null : o);
    }
    function ai(e, t, r, o) {
      var s = ht();
      o = o === void 0 ? null : o;
      var u = void 0;
      if (je !== null) {
        var f = je.memoizedState;
        if (u = f.destroy, o !== null && cs(o, f.deps)) {
          s.memoizedState = io(t, r, u, o);
          return;
        }
      }
      Ne.flags |= e, s.memoizedState = io(1 | t, r, u, o);
    }
    function bc(e, t) {
      return si(8390656, 8, e, t);
    }
    function hs(e, t) {
      return ai(2048, 8, e, t);
    }
    function Ec(e, t) {
      return ai(4, 2, e, t);
    }
    function Tc(e, t) {
      return ai(4, 4, e, t);
    }
    function Rc(e, t) {
      if (typeof t == "function") return e = e(), t(e), function() {
        t(null);
      };
      if (t != null) return e = e(), t.current = e, function() {
        t.current = null;
      };
    }
    function Mc(e, t, r) {
      return r = r != null ? r.concat([
        e
      ]) : null, ai(4, 4, Rc.bind(null, t, e), r);
    }
    function gs() {
    }
    function Nc(e, t) {
      var r = ht();
      t = t === void 0 ? null : t;
      var o = r.memoizedState;
      return o !== null && t !== null && cs(t, o[1]) ? o[0] : (r.memoizedState = [
        e,
        t
      ], e);
    }
    function Ac(e, t) {
      var r = ht();
      t = t === void 0 ? null : t;
      var o = r.memoizedState;
      return o !== null && t !== null && cs(t, o[1]) ? o[0] : (e = e(), r.memoizedState = [
        e,
        t
      ], e);
    }
    function Lc(e, t, r) {
      return Or & 21 ? (xt(r, t) || (r = au(), Ne.lanes |= r, jr |= r, e.baseState = true), t) : (e.baseState && (e.baseState = false, rt = true), e.memoizedState = r);
    }
    function mh(e, t) {
      var r = xe;
      xe = r !== 0 && 4 > r ? r : 4, e(true);
      var o = us.transition;
      us.transition = {};
      try {
        e(false), t();
      } finally {
        xe = r, us.transition = o;
      }
    }
    function _c() {
      return ht().memoizedState;
    }
    function hh(e, t, r) {
      var o = pr(e);
      if (r = {
        lane: o,
        action: r,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, Oc(e)) jc(t, r);
      else if (r = dc(e, t, r, o), r !== null) {
        var s = qe();
        Et(r, e, o, s), Dc(r, t, o);
      }
    }
    function gh(e, t, r) {
      var o = pr(e), s = {
        lane: o,
        action: r,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      if (Oc(e)) jc(t, s);
      else {
        var u = e.alternate;
        if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null)) try {
          var f = t.lastRenderedState, y = u(f, r);
          if (s.hasEagerState = true, s.eagerState = y, xt(y, f)) {
            var k = t.interleaved;
            k === null ? (s.next = s, ns(t)) : (s.next = k.next, k.next = s), t.interleaved = s;
            return;
          }
        } catch {
        } finally {
        }
        r = dc(e, t, s, o), r !== null && (s = qe(), Et(r, e, o, s), Dc(r, t, o));
      }
    }
    function Oc(e) {
      var t = e.alternate;
      return e === Ne || t !== null && t === Ne;
    }
    function jc(e, t) {
      ro = li = true;
      var r = e.pending;
      r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
    }
    function Dc(e, t, r) {
      if (r & 4194240) {
        var o = t.lanes;
        o &= e.pendingLanes, r |= o, t.lanes = r, yl(e, r);
      }
    }
    var ui = {
      readContext: mt,
      useCallback: $e,
      useContext: $e,
      useEffect: $e,
      useImperativeHandle: $e,
      useInsertionEffect: $e,
      useLayoutEffect: $e,
      useMemo: $e,
      useReducer: $e,
      useRef: $e,
      useState: $e,
      useDebugValue: $e,
      useDeferredValue: $e,
      useTransition: $e,
      useMutableSource: $e,
      useSyncExternalStore: $e,
      useId: $e,
      unstable_isNewReconciler: false
    }, vh = {
      readContext: mt,
      useCallback: function(e, t) {
        return _t().memoizedState = [
          e,
          t === void 0 ? null : t
        ], e;
      },
      useContext: mt,
      useEffect: bc,
      useImperativeHandle: function(e, t, r) {
        return r = r != null ? r.concat([
          e
        ]) : null, si(4194308, 4, Rc.bind(null, t, e), r);
      },
      useLayoutEffect: function(e, t) {
        return si(4194308, 4, e, t);
      },
      useInsertionEffect: function(e, t) {
        return si(4, 2, e, t);
      },
      useMemo: function(e, t) {
        var r = _t();
        return t = t === void 0 ? null : t, e = e(), r.memoizedState = [
          e,
          t
        ], e;
      },
      useReducer: function(e, t, r) {
        var o = _t();
        return t = r !== void 0 ? r(t) : t, o.memoizedState = o.baseState = t, e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t
        }, o.queue = e, e = e.dispatch = hh.bind(null, Ne, e), [
          o.memoizedState,
          e
        ];
      },
      useRef: function(e) {
        var t = _t();
        return e = {
          current: e
        }, t.memoizedState = e;
      },
      useState: Cc,
      useDebugValue: gs,
      useDeferredValue: function(e) {
        return _t().memoizedState = e;
      },
      useTransition: function() {
        var e = Cc(false), t = e[0];
        return e = mh.bind(null, e[1]), _t().memoizedState = e, [
          t,
          e
        ];
      },
      useMutableSource: function() {
      },
      useSyncExternalStore: function(e, t, r) {
        var o = Ne, s = _t();
        if (Re) {
          if (r === void 0) throw Error(l(407));
          r = r();
        } else {
          if (r = t(), ze === null) throw Error(l(349));
          Or & 30 || yc(o, t, r);
        }
        s.memoizedState = r;
        var u = {
          value: r,
          getSnapshot: t
        };
        return s.queue = u, bc(Sc.bind(null, o, u, e), [
          e
        ]), o.flags |= 2048, io(9, wc.bind(null, o, u, r, t), void 0, null), r;
      },
      useId: function() {
        var e = _t(), t = ze.identifierPrefix;
        if (Re) {
          var r = Vt, o = Ut;
          r = (o & ~(1 << 32 - St(o) - 1)).toString(32) + r, t = ":" + t + "R" + r, r = no++, 0 < r && (t += "H" + r.toString(32)), t += ":";
        } else r = ph++, t = ":" + t + "r" + r.toString(32) + ":";
        return e.memoizedState = t;
      },
      unstable_isNewReconciler: false
    }, yh = {
      readContext: mt,
      useCallback: Nc,
      useContext: mt,
      useEffect: hs,
      useImperativeHandle: Mc,
      useInsertionEffect: Ec,
      useLayoutEffect: Tc,
      useMemo: Ac,
      useReducer: ps,
      useRef: Pc,
      useState: function() {
        return ps(oo);
      },
      useDebugValue: gs,
      useDeferredValue: function(e) {
        var t = ht();
        return Lc(t, je.memoizedState, e);
      },
      useTransition: function() {
        var e = ps(oo)[0], t = ht().memoizedState;
        return [
          e,
          t
        ];
      },
      useMutableSource: gc,
      useSyncExternalStore: vc,
      useId: _c,
      unstable_isNewReconciler: false
    }, wh = {
      readContext: mt,
      useCallback: Nc,
      useContext: mt,
      useEffect: hs,
      useImperativeHandle: Mc,
      useInsertionEffect: Ec,
      useLayoutEffect: Tc,
      useMemo: Ac,
      useReducer: ms,
      useRef: Pc,
      useState: function() {
        return ms(oo);
      },
      useDebugValue: gs,
      useDeferredValue: function(e) {
        var t = ht();
        return je === null ? t.memoizedState = e : Lc(t, je.memoizedState, e);
      },
      useTransition: function() {
        var e = ms(oo)[0], t = ht().memoizedState;
        return [
          e,
          t
        ];
      },
      useMutableSource: gc,
      useSyncExternalStore: vc,
      useId: _c,
      unstable_isNewReconciler: false
    };
    function Ct(e, t) {
      if (e && e.defaultProps) {
        t = G({}, t), e = e.defaultProps;
        for (var r in e) t[r] === void 0 && (t[r] = e[r]);
        return t;
      }
      return t;
    }
    function vs(e, t, r, o) {
      t = e.memoizedState, r = r(o, t), r = r == null ? t : G({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
    }
    var ci = {
      isMounted: function(e) {
        return (e = e._reactInternals) ? Tr(e) === e : false;
      },
      enqueueSetState: function(e, t, r) {
        e = e._reactInternals;
        var o = qe(), s = pr(e), u = Gt(o, s);
        u.payload = t, r != null && (u.callback = r), t = ur(e, u, s), t !== null && (Et(t, e, s, o), ri(t, e, s));
      },
      enqueueReplaceState: function(e, t, r) {
        e = e._reactInternals;
        var o = qe(), s = pr(e), u = Gt(o, s);
        u.tag = 1, u.payload = t, r != null && (u.callback = r), t = ur(e, u, s), t !== null && (Et(t, e, s, o), ri(t, e, s));
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var r = qe(), o = pr(e), s = Gt(r, o);
        s.tag = 2, t != null && (s.callback = t), t = ur(e, s, o), t !== null && (Et(t, e, o, r), ri(t, e, o));
      }
    };
    function Bc(e, t, r, o, s, u, f) {
      return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, u, f) : t.prototype && t.prototype.isPureReactComponent ? !$n(r, o) || !$n(s, u) : true;
    }
    function zc(e, t, r) {
      var o = false, s = lr, u = t.contextType;
      return typeof u == "object" && u !== null ? u = mt(u) : (s = tt(t) ? Mr : Ve.current, o = t.contextTypes, u = (o = o != null) ? tn(e, s) : lr), t = new t(r, u), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ci, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = s, e.__reactInternalMemoizedMaskedChildContext = u), t;
    }
    function Fc(e, t, r, o) {
      e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, o), t.state !== e && ci.enqueueReplaceState(t, t.state, null);
    }
    function ys(e, t, r, o) {
      var s = e.stateNode;
      s.props = r, s.state = e.memoizedState, s.refs = {}, os(e);
      var u = t.contextType;
      typeof u == "object" && u !== null ? s.context = mt(u) : (u = tt(t) ? Mr : Ve.current, s.context = tn(e, u)), s.state = e.memoizedState, u = t.getDerivedStateFromProps, typeof u == "function" && (vs(e, t, u, r), s.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (t = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), t !== s.state && ci.enqueueReplaceState(s, s.state, null), ni(e, r, s, o), s.state = e.memoizedState), typeof s.componentDidMount == "function" && (e.flags |= 4194308);
    }
    function cn(e, t) {
      try {
        var r = "", o = t;
        do
          r += he(o), o = o.return;
        while (o);
        var s = r;
      } catch (u) {
        s = `
Error generating stack: ` + u.message + `
` + u.stack;
      }
      return {
        value: e,
        source: t,
        stack: s,
        digest: null
      };
    }
    function ws(e, t, r) {
      return {
        value: e,
        source: null,
        stack: r ?? null,
        digest: t ?? null
      };
    }
    function Ss(e, t) {
      try {
        console.error(t.value);
      } catch (r) {
        setTimeout(function() {
          throw r;
        });
      }
    }
    var Sh = typeof WeakMap == "function" ? WeakMap : Map;
    function Ic(e, t, r) {
      r = Gt(-1, r), r.tag = 3, r.payload = {
        element: null
      };
      var o = t.value;
      return r.callback = function() {
        vi || (vi = true, js = o), Ss(e, t);
      }, r;
    }
    function Wc(e, t, r) {
      r = Gt(-1, r), r.tag = 3;
      var o = e.type.getDerivedStateFromError;
      if (typeof o == "function") {
        var s = t.value;
        r.payload = function() {
          return o(s);
        }, r.callback = function() {
          Ss(e, t);
        };
      }
      var u = e.stateNode;
      return u !== null && typeof u.componentDidCatch == "function" && (r.callback = function() {
        Ss(e, t), typeof o != "function" && (dr === null ? dr = /* @__PURE__ */ new Set([
          this
        ]) : dr.add(this));
        var f = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: f !== null ? f : ""
        });
      }), r;
    }
    function Hc(e, t, r) {
      var o = e.pingCache;
      if (o === null) {
        o = e.pingCache = new Sh();
        var s = /* @__PURE__ */ new Set();
        o.set(t, s);
      } else s = o.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), o.set(t, s));
      s.has(r) || (s.add(r), e = Oh.bind(null, e, t, r), t.then(e, e));
    }
    function Uc(e) {
      do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : true), t) return e;
        e = e.return;
      } while (e !== null);
      return null;
    }
    function Vc(e, t, r, o, s) {
      return e.mode & 1 ? (e.flags |= 65536, e.lanes = s, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (t = Gt(-1, 1), t.tag = 2, ur(r, t, 1))), r.lanes |= 1), e);
    }
    var xh = O.ReactCurrentOwner, rt = false;
    function Xe(e, t, r, o) {
      t.child = e === null ? cc(t, null, r, o) : ln(t, e.child, r, o);
    }
    function $c(e, t, r, o, s) {
      r = r.render;
      var u = t.ref;
      return an(t, s), o = ds(e, t, r, o, u, s), r = fs(), e !== null && !rt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~s, Kt(e, t, s)) : (Re && r && Ql(t), t.flags |= 1, Xe(e, t, o, s), t.child);
    }
    function Gc(e, t, r, o, s) {
      if (e === null) {
        var u = r.type;
        return typeof u == "function" && !Hs(u) && u.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (t.tag = 15, t.type = u, Kc(e, t, u, o, s)) : (e = Ci(r.type, null, o, t, t.mode, s), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (u = e.child, !(e.lanes & s)) {
        var f = u.memoizedProps;
        if (r = r.compare, r = r !== null ? r : $n, r(f, o) && e.ref === t.ref) return Kt(e, t, s);
      }
      return t.flags |= 1, e = hr(u, o), e.ref = t.ref, e.return = t, t.child = e;
    }
    function Kc(e, t, r, o, s) {
      if (e !== null) {
        var u = e.memoizedProps;
        if ($n(u, o) && e.ref === t.ref) if (rt = false, t.pendingProps = o = u, (e.lanes & s) !== 0) e.flags & 131072 && (rt = true);
        else return t.lanes = e.lanes, Kt(e, t, s);
      }
      return xs(e, t, r, o, s);
    }
    function Qc(e, t, r) {
      var o = t.pendingProps, s = o.children, u = e !== null ? e.memoizedState : null;
      if (o.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      }, Pe(fn, ut), ut |= r;
      else {
        if (!(r & 1073741824)) return e = u !== null ? u.baseLanes | r : r, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
          baseLanes: e,
          cachePool: null,
          transitions: null
        }, t.updateQueue = null, Pe(fn, ut), ut |= e, null;
        t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null
        }, o = u !== null ? u.baseLanes : r, Pe(fn, ut), ut |= o;
      }
      else u !== null ? (o = u.baseLanes | r, t.memoizedState = null) : o = r, Pe(fn, ut), ut |= o;
      return Xe(e, t, s, r), t.child;
    }
    function Yc(e, t) {
      var r = t.ref;
      (e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= 512, t.flags |= 2097152);
    }
    function xs(e, t, r, o, s) {
      var u = tt(r) ? Mr : Ve.current;
      return u = tn(t, u), an(t, s), r = ds(e, t, r, o, u, s), o = fs(), e !== null && !rt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~s, Kt(e, t, s)) : (Re && o && Ql(t), t.flags |= 1, Xe(e, t, r, s), t.child);
    }
    function Xc(e, t, r, o, s) {
      if (tt(r)) {
        var u = true;
        Qo(t);
      } else u = false;
      if (an(t, s), t.stateNode === null) fi(e, t), zc(t, r, o), ys(t, r, o, s), o = true;
      else if (e === null) {
        var f = t.stateNode, y = t.memoizedProps;
        f.props = y;
        var k = f.context, L = r.contextType;
        typeof L == "object" && L !== null ? L = mt(L) : (L = tt(r) ? Mr : Ve.current, L = tn(t, L));
        var I = r.getDerivedStateFromProps, H = typeof I == "function" || typeof f.getSnapshotBeforeUpdate == "function";
        H || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (y !== o || k !== L) && Fc(t, f, o, L), ar = false;
        var F = t.memoizedState;
        f.state = F, ni(t, o, f, s), k = t.memoizedState, y !== o || F !== k || et.current || ar ? (typeof I == "function" && (vs(t, r, I, o), k = t.memoizedState), (y = ar || Bc(t, r, y, o, F, k, L)) ? (H || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = k), f.props = o, f.state = k, f.context = L, o = y) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), o = false);
      } else {
        f = t.stateNode, fc(e, t), y = t.memoizedProps, L = t.type === t.elementType ? y : Ct(t.type, y), f.props = L, H = t.pendingProps, F = f.context, k = r.contextType, typeof k == "object" && k !== null ? k = mt(k) : (k = tt(r) ? Mr : Ve.current, k = tn(t, k));
        var Q = r.getDerivedStateFromProps;
        (I = typeof Q == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (y !== H || F !== k) && Fc(t, f, o, k), ar = false, F = t.memoizedState, f.state = F, ni(t, o, f, s);
        var q = t.memoizedState;
        y !== H || F !== q || et.current || ar ? (typeof Q == "function" && (vs(t, r, Q, o), q = t.memoizedState), (L = ar || Bc(t, r, L, o, F, q, k) || false) ? (I || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(o, q, k), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(o, q, k)), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && F === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && F === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = q), f.props = o, f.state = q, f.context = k, o = L) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && F === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && F === e.memoizedState || (t.flags |= 1024), o = false);
      }
      return ks(e, t, r, o, u, s);
    }
    function ks(e, t, r, o, s, u) {
      Yc(e, t);
      var f = (t.flags & 128) !== 0;
      if (!o && !f) return s && tc(t, r, false), Kt(e, t, u);
      o = t.stateNode, xh.current = t;
      var y = f && typeof r.getDerivedStateFromError != "function" ? null : o.render();
      return t.flags |= 1, e !== null && f ? (t.child = ln(t, e.child, null, u), t.child = ln(t, null, y, u)) : Xe(e, t, y, u), t.memoizedState = o.state, s && tc(t, r, true), t.child;
    }
    function qc(e) {
      var t = e.stateNode;
      t.pendingContext ? Zu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Zu(e, t.context, false), is(e, t.containerInfo);
    }
    function Jc(e, t, r, o, s) {
      return on(), Jl(s), t.flags |= 256, Xe(e, t, r, o), t.child;
    }
    var Cs = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0
    };
    function Ps(e) {
      return {
        baseLanes: e,
        cachePool: null,
        transitions: null
      };
    }
    function Zc(e, t, r) {
      var o = t.pendingProps, s = Me.current, u = false, f = (t.flags & 128) !== 0, y;
      if ((y = f) || (y = e !== null && e.memoizedState === null ? false : (s & 2) !== 0), y ? (u = true, t.flags &= -129) : (e === null || e.memoizedState !== null) && (s |= 1), Pe(Me, s & 1), e === null) return ql(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (f = o.children, e = o.fallback, u ? (o = t.mode, u = t.child, f = {
        mode: "hidden",
        children: f
      }, !(o & 1) && u !== null ? (u.childLanes = 0, u.pendingProps = f) : u = Pi(f, o, 0, null), e = Fr(e, o, r, null), u.return = t, e.return = t, u.sibling = e, t.child = u, t.child.memoizedState = Ps(r), t.memoizedState = Cs, e) : bs(t, f));
      if (s = e.memoizedState, s !== null && (y = s.dehydrated, y !== null)) return kh(e, t, f, o, y, s, r);
      if (u) {
        u = o.fallback, f = t.mode, s = e.child, y = s.sibling;
        var k = {
          mode: "hidden",
          children: o.children
        };
        return !(f & 1) && t.child !== s ? (o = t.child, o.childLanes = 0, o.pendingProps = k, t.deletions = null) : (o = hr(s, k), o.subtreeFlags = s.subtreeFlags & 14680064), y !== null ? u = hr(y, u) : (u = Fr(u, f, r, null), u.flags |= 2), u.return = t, o.return = t, o.sibling = u, t.child = o, o = u, u = t.child, f = e.child.memoizedState, f = f === null ? Ps(r) : {
          baseLanes: f.baseLanes | r,
          cachePool: null,
          transitions: f.transitions
        }, u.memoizedState = f, u.childLanes = e.childLanes & ~r, t.memoizedState = Cs, o;
      }
      return u = e.child, e = u.sibling, o = hr(u, {
        mode: "visible",
        children: o.children
      }), !(t.mode & 1) && (o.lanes = r), o.return = t, o.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [
        e
      ], t.flags |= 16) : r.push(e)), t.child = o, t.memoizedState = null, o;
    }
    function bs(e, t) {
      return t = Pi({
        mode: "visible",
        children: t
      }, e.mode, 0, null), t.return = e, e.child = t;
    }
    function di(e, t, r, o) {
      return o !== null && Jl(o), ln(t, e.child, null, r), e = bs(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
    }
    function kh(e, t, r, o, s, u, f) {
      if (r) return t.flags & 256 ? (t.flags &= -257, o = ws(Error(l(422))), di(e, t, f, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (u = o.fallback, s = t.mode, o = Pi({
        mode: "visible",
        children: o.children
      }, s, 0, null), u = Fr(u, s, f, null), u.flags |= 2, o.return = t, u.return = t, o.sibling = u, t.child = o, t.mode & 1 && ln(t, e.child, null, f), t.child.memoizedState = Ps(f), t.memoizedState = Cs, u);
      if (!(t.mode & 1)) return di(e, t, f, null);
      if (s.data === "$!") {
        if (o = s.nextSibling && s.nextSibling.dataset, o) var y = o.dgst;
        return o = y, u = Error(l(419)), o = ws(u, o, void 0), di(e, t, f, o);
      }
      if (y = (f & e.childLanes) !== 0, rt || y) {
        if (o = ze, o !== null) {
          switch (f & -f) {
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
          s = s & (o.suspendedLanes | f) ? 0 : s, s !== 0 && s !== u.retryLane && (u.retryLane = s, $t(e, s), Et(o, e, s, -1));
        }
        return Ws(), o = ws(Error(l(421))), di(e, t, f, o);
      }
      return s.data === "$?" ? (t.flags |= 128, t.child = e.child, t = jh.bind(null, e), s._reactRetry = t, null) : (e = u.treeContext, at = or(s.nextSibling), st = t, Re = true, kt = null, e !== null && (ft[pt++] = Ut, ft[pt++] = Vt, ft[pt++] = Nr, Ut = e.id, Vt = e.overflow, Nr = t), t = bs(t, o.children), t.flags |= 4096, t);
    }
    function ed(e, t, r) {
      e.lanes |= t;
      var o = e.alternate;
      o !== null && (o.lanes |= t), rs(e.return, t, r);
    }
    function Es(e, t, r, o, s) {
      var u = e.memoizedState;
      u === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: o,
        tail: r,
        tailMode: s
      } : (u.isBackwards = t, u.rendering = null, u.renderingStartTime = 0, u.last = o, u.tail = r, u.tailMode = s);
    }
    function td(e, t, r) {
      var o = t.pendingProps, s = o.revealOrder, u = o.tail;
      if (Xe(e, t, o.children, r), o = Me.current, o & 2) o = o & 1 | 2, t.flags |= 128;
      else {
        if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && ed(e, r, t);
          else if (e.tag === 19) ed(e, r, t);
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
      if (Pe(Me, o), !(t.mode & 1)) t.memoizedState = null;
      else switch (s) {
        case "forwards":
          for (r = t.child, s = null; r !== null; ) e = r.alternate, e !== null && oi(e) === null && (s = r), r = r.sibling;
          r = s, r === null ? (s = t.child, t.child = null) : (s = r.sibling, r.sibling = null), Es(t, false, s, r, u);
          break;
        case "backwards":
          for (r = null, s = t.child, t.child = null; s !== null; ) {
            if (e = s.alternate, e !== null && oi(e) === null) {
              t.child = s;
              break;
            }
            e = s.sibling, s.sibling = r, r = s, s = e;
          }
          Es(t, true, r, null, u);
          break;
        case "together":
          Es(t, false, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function fi(e, t) {
      !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
    }
    function Kt(e, t, r) {
      if (e !== null && (t.dependencies = e.dependencies), jr |= t.lanes, !(r & t.childLanes)) return null;
      if (e !== null && t.child !== e.child) throw Error(l(153));
      if (t.child !== null) {
        for (e = t.child, r = hr(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null; ) e = e.sibling, r = r.sibling = hr(e, e.pendingProps), r.return = t;
        r.sibling = null;
      }
      return t.child;
    }
    function Ch(e, t, r) {
      switch (t.tag) {
        case 3:
          qc(t), on();
          break;
        case 5:
          hc(t);
          break;
        case 1:
          tt(t.type) && Qo(t);
          break;
        case 4:
          is(t, t.stateNode.containerInfo);
          break;
        case 10:
          var o = t.type._context, s = t.memoizedProps.value;
          Pe(ei, o._currentValue), o._currentValue = s;
          break;
        case 13:
          if (o = t.memoizedState, o !== null) return o.dehydrated !== null ? (Pe(Me, Me.current & 1), t.flags |= 128, null) : r & t.child.childLanes ? Zc(e, t, r) : (Pe(Me, Me.current & 1), e = Kt(e, t, r), e !== null ? e.sibling : null);
          Pe(Me, Me.current & 1);
          break;
        case 19:
          if (o = (r & t.childLanes) !== 0, e.flags & 128) {
            if (o) return td(e, t, r);
            t.flags |= 128;
          }
          if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), Pe(Me, Me.current), o) break;
          return null;
        case 22:
        case 23:
          return t.lanes = 0, Qc(e, t, r);
      }
      return Kt(e, t, r);
    }
    var rd, Ts, nd, od;
    rd = function(e, t) {
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
    }, Ts = function() {
    }, nd = function(e, t, r, o) {
      var s = e.memoizedProps;
      if (s !== o) {
        e = t.stateNode, _r(Lt.current);
        var u = null;
        switch (r) {
          case "input":
            s = rl(e, s), o = rl(e, o), u = [];
            break;
          case "select":
            s = G({}, s, {
              value: void 0
            }), o = G({}, o, {
              value: void 0
            }), u = [];
            break;
          case "textarea":
            s = il(e, s), o = il(e, o), u = [];
            break;
          default:
            typeof s.onClick != "function" && typeof o.onClick == "function" && (e.onclick = $o);
        }
        sl(r, o);
        var f;
        r = null;
        for (L in s) if (!o.hasOwnProperty(L) && s.hasOwnProperty(L) && s[L] != null) if (L === "style") {
          var y = s[L];
          for (f in y) y.hasOwnProperty(f) && (r || (r = {}), r[f] = "");
        } else L !== "dangerouslySetInnerHTML" && L !== "children" && L !== "suppressContentEditableWarning" && L !== "suppressHydrationWarning" && L !== "autoFocus" && (c.hasOwnProperty(L) ? u || (u = []) : (u = u || []).push(L, null));
        for (L in o) {
          var k = o[L];
          if (y = s == null ? void 0 : s[L], o.hasOwnProperty(L) && k !== y && (k != null || y != null)) if (L === "style") if (y) {
            for (f in y) !y.hasOwnProperty(f) || k && k.hasOwnProperty(f) || (r || (r = {}), r[f] = "");
            for (f in k) k.hasOwnProperty(f) && y[f] !== k[f] && (r || (r = {}), r[f] = k[f]);
          } else r || (u || (u = []), u.push(L, r)), r = k;
          else L === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0, y = y ? y.__html : void 0, k != null && y !== k && (u = u || []).push(L, k)) : L === "children" ? typeof k != "string" && typeof k != "number" || (u = u || []).push(L, "" + k) : L !== "suppressContentEditableWarning" && L !== "suppressHydrationWarning" && (c.hasOwnProperty(L) ? (k != null && L === "onScroll" && be("scroll", e), u || y === k || (u = [])) : (u = u || []).push(L, k));
        }
        r && (u = u || []).push("style", r);
        var L = u;
        (t.updateQueue = L) && (t.flags |= 4);
      }
    }, od = function(e, t, r, o) {
      r !== o && (t.flags |= 4);
    };
    function lo(e, t) {
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
    function Ge(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, r = 0, o = 0;
      if (t) for (var s = e.child; s !== null; ) r |= s.lanes | s.childLanes, o |= s.subtreeFlags & 14680064, o |= s.flags & 14680064, s.return = e, s = s.sibling;
      else for (s = e.child; s !== null; ) r |= s.lanes | s.childLanes, o |= s.subtreeFlags, o |= s.flags, s.return = e, s = s.sibling;
      return e.subtreeFlags |= o, e.childLanes = r, t;
    }
    function Ph(e, t, r) {
      var o = t.pendingProps;
      switch (Yl(t), t.tag) {
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
          return Ge(t), null;
        case 1:
          return tt(t.type) && Ko(), Ge(t), null;
        case 3:
          return o = t.stateNode, un(), Ee(et), Ee(Ve), as(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (Jo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, kt !== null && (zs(kt), kt = null))), Ts(e, t), Ge(t), null;
        case 5:
          ls(t);
          var s = _r(to.current);
          if (r = t.type, e !== null && t.stateNode != null) nd(e, t, r, o, s), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
          else {
            if (!o) {
              if (t.stateNode === null) throw Error(l(166));
              return Ge(t), null;
            }
            if (e = _r(Lt.current), Jo(t)) {
              o = t.stateNode, r = t.type;
              var u = t.memoizedProps;
              switch (o[At] = t, o[Xn] = u, e = (t.mode & 1) !== 0, r) {
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
                  for (s = 0; s < Kn.length; s++) be(Kn[s], o);
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
                  za(o, u), be("invalid", o);
                  break;
                case "select":
                  o._wrapperState = {
                    wasMultiple: !!u.multiple
                  }, be("invalid", o);
                  break;
                case "textarea":
                  Wa(o, u), be("invalid", o);
              }
              sl(r, u), s = null;
              for (var f in u) if (u.hasOwnProperty(f)) {
                var y = u[f];
                f === "children" ? typeof y == "string" ? o.textContent !== y && (u.suppressHydrationWarning !== true && Vo(o.textContent, y, e), s = [
                  "children",
                  y
                ]) : typeof y == "number" && o.textContent !== "" + y && (u.suppressHydrationWarning !== true && Vo(o.textContent, y, e), s = [
                  "children",
                  "" + y
                ]) : c.hasOwnProperty(f) && y != null && f === "onScroll" && be("scroll", o);
              }
              switch (r) {
                case "input":
                  Hr(o), Ia(o, u, true);
                  break;
                case "textarea":
                  Hr(o), Ua(o);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  typeof u.onClick == "function" && (o.onclick = $o);
              }
              o = s, t.updateQueue = o, o !== null && (t.flags |= 4);
            } else {
              f = s.nodeType === 9 ? s : s.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Va(r)), e === "http://www.w3.org/1999/xhtml" ? r === "script" ? (e = f.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = f.createElement(r, {
                is: o.is
              }) : (e = f.createElement(r), r === "select" && (f = e, o.multiple ? f.multiple = true : o.size && (f.size = o.size))) : e = f.createElementNS(e, r), e[At] = t, e[Xn] = o, rd(e, t, false, false), t.stateNode = e;
              e: {
                switch (f = al(r, o), r) {
                  case "dialog":
                    be("cancel", e), be("close", e), s = o;
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    be("load", e), s = o;
                    break;
                  case "video":
                  case "audio":
                    for (s = 0; s < Kn.length; s++) be(Kn[s], e);
                    s = o;
                    break;
                  case "source":
                    be("error", e), s = o;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    be("error", e), be("load", e), s = o;
                    break;
                  case "details":
                    be("toggle", e), s = o;
                    break;
                  case "input":
                    za(e, o), s = rl(e, o), be("invalid", e);
                    break;
                  case "option":
                    s = o;
                    break;
                  case "select":
                    e._wrapperState = {
                      wasMultiple: !!o.multiple
                    }, s = G({}, o, {
                      value: void 0
                    }), be("invalid", e);
                    break;
                  case "textarea":
                    Wa(e, o), s = il(e, o), be("invalid", e);
                    break;
                  default:
                    s = o;
                }
                sl(r, s), y = s;
                for (u in y) if (y.hasOwnProperty(u)) {
                  var k = y[u];
                  u === "style" ? Ka(e, k) : u === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0, k != null && $a(e, k)) : u === "children" ? typeof k == "string" ? (r !== "textarea" || k !== "") && Rn(e, k) : typeof k == "number" && Rn(e, "" + k) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (c.hasOwnProperty(u) ? k != null && u === "onScroll" && be("scroll", e) : k != null && U(e, u, k, f));
                }
                switch (r) {
                  case "input":
                    Hr(e), Ia(e, o, false);
                    break;
                  case "textarea":
                    Hr(e), Ua(e);
                    break;
                  case "option":
                    o.value != null && e.setAttribute("value", "" + we(o.value));
                    break;
                  case "select":
                    e.multiple = !!o.multiple, u = o.value, u != null ? Ur(e, !!o.multiple, u, false) : o.defaultValue != null && Ur(e, !!o.multiple, o.defaultValue, true);
                    break;
                  default:
                    typeof s.onClick == "function" && (e.onclick = $o);
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
          return Ge(t), null;
        case 6:
          if (e && t.stateNode != null) od(e, t, e.memoizedProps, o);
          else {
            if (typeof o != "string" && t.stateNode === null) throw Error(l(166));
            if (r = _r(to.current), _r(Lt.current), Jo(t)) {
              if (o = t.stateNode, r = t.memoizedProps, o[At] = t, (u = o.nodeValue !== r) && (e = st, e !== null)) switch (e.tag) {
                case 3:
                  Vo(o.nodeValue, r, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== true && Vo(o.nodeValue, r, (e.mode & 1) !== 0);
              }
              u && (t.flags |= 4);
            } else o = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(o), o[At] = t, t.stateNode = o;
          }
          return Ge(t), null;
        case 13:
          if (Ee(Me), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (Re && at !== null && t.mode & 1 && !(t.flags & 128)) sc(), on(), t.flags |= 98560, u = false;
            else if (u = Jo(t), o !== null && o.dehydrated !== null) {
              if (e === null) {
                if (!u) throw Error(l(318));
                if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(l(317));
                u[At] = t;
              } else on(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
              Ge(t), u = false;
            } else kt !== null && (zs(kt), kt = null), u = true;
            if (!u) return t.flags & 65536 ? t : null;
          }
          return t.flags & 128 ? (t.lanes = r, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, t.mode & 1 && (e === null || Me.current & 1 ? De === 0 && (De = 3) : Ws())), t.updateQueue !== null && (t.flags |= 4), Ge(t), null);
        case 4:
          return un(), Ts(e, t), e === null && Qn(t.stateNode.containerInfo), Ge(t), null;
        case 10:
          return ts(t.type._context), Ge(t), null;
        case 17:
          return tt(t.type) && Ko(), Ge(t), null;
        case 19:
          if (Ee(Me), u = t.memoizedState, u === null) return Ge(t), null;
          if (o = (t.flags & 128) !== 0, f = u.rendering, f === null) if (o) lo(u, false);
          else {
            if (De !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
              if (f = oi(e), f !== null) {
                for (t.flags |= 128, lo(u, false), o = f.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = r, r = t.child; r !== null; ) u = r, e = o, u.flags &= 14680066, f = u.alternate, f === null ? (u.childLanes = 0, u.lanes = e, u.child = null, u.subtreeFlags = 0, u.memoizedProps = null, u.memoizedState = null, u.updateQueue = null, u.dependencies = null, u.stateNode = null) : (u.childLanes = f.childLanes, u.lanes = f.lanes, u.child = f.child, u.subtreeFlags = 0, u.deletions = null, u.memoizedProps = f.memoizedProps, u.memoizedState = f.memoizedState, u.updateQueue = f.updateQueue, u.type = f.type, e = f.dependencies, u.dependencies = e === null ? null : {
                  lanes: e.lanes,
                  firstContext: e.firstContext
                }), r = r.sibling;
                return Pe(Me, Me.current & 1 | 2), t.child;
              }
              e = e.sibling;
            }
            u.tail !== null && Le() > pn && (t.flags |= 128, o = true, lo(u, false), t.lanes = 4194304);
          }
          else {
            if (!o) if (e = oi(f), e !== null) {
              if (t.flags |= 128, o = true, r = e.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), lo(u, true), u.tail === null && u.tailMode === "hidden" && !f.alternate && !Re) return Ge(t), null;
            } else 2 * Le() - u.renderingStartTime > pn && r !== 1073741824 && (t.flags |= 128, o = true, lo(u, false), t.lanes = 4194304);
            u.isBackwards ? (f.sibling = t.child, t.child = f) : (r = u.last, r !== null ? r.sibling = f : t.child = f, u.last = f);
          }
          return u.tail !== null ? (t = u.tail, u.rendering = t, u.tail = t.sibling, u.renderingStartTime = Le(), t.sibling = null, r = Me.current, Pe(Me, o ? r & 1 | 2 : r & 1), t) : (Ge(t), null);
        case 22:
        case 23:
          return Is(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && t.mode & 1 ? ut & 1073741824 && (Ge(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ge(t), null;
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(l(156, t.tag));
    }
    function bh(e, t) {
      switch (Yl(t), t.tag) {
        case 1:
          return tt(t.type) && Ko(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
          return un(), Ee(et), Ee(Ve), as(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
        case 5:
          return ls(t), null;
        case 13:
          if (Ee(Me), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null) throw Error(l(340));
            on();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
          return Ee(Me), null;
        case 4:
          return un(), null;
        case 10:
          return ts(t.type._context), null;
        case 22:
        case 23:
          return Is(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var pi = false, Ke = false, Eh = typeof WeakSet == "function" ? WeakSet : Set, Y = null;
    function dn(e, t) {
      var r = e.ref;
      if (r !== null) if (typeof r == "function") try {
        r(null);
      } catch (o) {
        Ae(e, t, o);
      }
      else r.current = null;
    }
    function Rs(e, t, r) {
      try {
        r();
      } catch (o) {
        Ae(e, t, o);
      }
    }
    var id = false;
    function Th(e, t) {
      if (Il = _o, e = Bu(), Ll(e)) {
        if ("selectionStart" in e) var r = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
        else e: {
          r = (r = e.ownerDocument) && r.defaultView || window;
          var o = r.getSelection && r.getSelection();
          if (o && o.rangeCount !== 0) {
            r = o.anchorNode;
            var s = o.anchorOffset, u = o.focusNode;
            o = o.focusOffset;
            try {
              r.nodeType, u.nodeType;
            } catch {
              r = null;
              break e;
            }
            var f = 0, y = -1, k = -1, L = 0, I = 0, H = e, F = null;
            t: for (; ; ) {
              for (var Q; H !== r || s !== 0 && H.nodeType !== 3 || (y = f + s), H !== u || o !== 0 && H.nodeType !== 3 || (k = f + o), H.nodeType === 3 && (f += H.nodeValue.length), (Q = H.firstChild) !== null; ) F = H, H = Q;
              for (; ; ) {
                if (H === e) break t;
                if (F === r && ++L === s && (y = f), F === u && ++I === o && (k = f), (Q = H.nextSibling) !== null) break;
                H = F, F = H.parentNode;
              }
              H = Q;
            }
            r = y === -1 || k === -1 ? null : {
              start: y,
              end: k
            };
          } else r = null;
        }
        r = r || {
          start: 0,
          end: 0
        };
      } else r = null;
      for (Wl = {
        focusedElem: e,
        selectionRange: r
      }, _o = false, Y = t; Y !== null; ) if (t = Y, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Y = e;
      else for (; Y !== null; ) {
        t = Y;
        try {
          var q = t.alternate;
          if (t.flags & 1024) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              break;
            case 1:
              if (q !== null) {
                var J = q.memoizedProps, _e = q.memoizedState, R = t.stateNode, E = R.getSnapshotBeforeUpdate(t.elementType === t.type ? J : Ct(t.type, J), _e);
                R.__reactInternalSnapshotBeforeUpdate = E;
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
        } catch (V) {
          Ae(t, t.return, V);
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, Y = e;
          break;
        }
        Y = t.return;
      }
      return q = id, id = false, q;
    }
    function so(e, t, r) {
      var o = t.updateQueue;
      if (o = o !== null ? o.lastEffect : null, o !== null) {
        var s = o = o.next;
        do {
          if ((s.tag & e) === e) {
            var u = s.destroy;
            s.destroy = void 0, u !== void 0 && Rs(t, r, u);
          }
          s = s.next;
        } while (s !== o);
      }
    }
    function mi(e, t) {
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
    function Ms(e) {
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
    function ld(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, ld(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[At], delete t[Xn], delete t[$l], delete t[uh], delete t[ch])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    function sd(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function ad(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || sd(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Ns(e, t, r) {
      var o = e.tag;
      if (o === 5 || o === 6) e = e.stateNode, t ? r.nodeType === 8 ? r.parentNode.insertBefore(e, t) : r.insertBefore(e, t) : (r.nodeType === 8 ? (t = r.parentNode, t.insertBefore(e, r)) : (t = r, t.appendChild(e)), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = $o));
      else if (o !== 4 && (e = e.child, e !== null)) for (Ns(e, t, r), e = e.sibling; e !== null; ) Ns(e, t, r), e = e.sibling;
    }
    function As(e, t, r) {
      var o = e.tag;
      if (o === 5 || o === 6) e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
      else if (o !== 4 && (e = e.child, e !== null)) for (As(e, t, r), e = e.sibling; e !== null; ) As(e, t, r), e = e.sibling;
    }
    var Ie = null, Pt = false;
    function cr(e, t, r) {
      for (r = r.child; r !== null; ) ud(e, t, r), r = r.sibling;
    }
    function ud(e, t, r) {
      if (Nt && typeof Nt.onCommitFiberUnmount == "function") try {
        Nt.onCommitFiberUnmount(To, r);
      } catch {
      }
      switch (r.tag) {
        case 5:
          Ke || dn(r, t);
        case 6:
          var o = Ie, s = Pt;
          Ie = null, cr(e, t, r), Ie = o, Pt = s, Ie !== null && (Pt ? (e = Ie, r = r.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r)) : Ie.removeChild(r.stateNode));
          break;
        case 18:
          Ie !== null && (Pt ? (e = Ie, r = r.stateNode, e.nodeType === 8 ? Vl(e.parentNode, r) : e.nodeType === 1 && Vl(e, r), Fn(e)) : Vl(Ie, r.stateNode));
          break;
        case 4:
          o = Ie, s = Pt, Ie = r.stateNode.containerInfo, Pt = true, cr(e, t, r), Ie = o, Pt = s;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (!Ke && (o = r.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
            s = o = o.next;
            do {
              var u = s, f = u.destroy;
              u = u.tag, f !== void 0 && (u & 2 || u & 4) && Rs(r, t, f), s = s.next;
            } while (s !== o);
          }
          cr(e, t, r);
          break;
        case 1:
          if (!Ke && (dn(r, t), o = r.stateNode, typeof o.componentWillUnmount == "function")) try {
            o.props = r.memoizedProps, o.state = r.memoizedState, o.componentWillUnmount();
          } catch (y) {
            Ae(r, t, y);
          }
          cr(e, t, r);
          break;
        case 21:
          cr(e, t, r);
          break;
        case 22:
          r.mode & 1 ? (Ke = (o = Ke) || r.memoizedState !== null, cr(e, t, r), Ke = o) : cr(e, t, r);
          break;
        default:
          cr(e, t, r);
      }
    }
    function cd(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var r = e.stateNode;
        r === null && (r = e.stateNode = new Eh()), t.forEach(function(o) {
          var s = Dh.bind(null, e, o);
          r.has(o) || (r.add(o), o.then(s, s));
        });
      }
    }
    function bt(e, t) {
      var r = t.deletions;
      if (r !== null) for (var o = 0; o < r.length; o++) {
        var s = r[o];
        try {
          var u = e, f = t, y = f;
          e: for (; y !== null; ) {
            switch (y.tag) {
              case 5:
                Ie = y.stateNode, Pt = false;
                break e;
              case 3:
                Ie = y.stateNode.containerInfo, Pt = true;
                break e;
              case 4:
                Ie = y.stateNode.containerInfo, Pt = true;
                break e;
            }
            y = y.return;
          }
          if (Ie === null) throw Error(l(160));
          ud(u, f, s), Ie = null, Pt = false;
          var k = s.alternate;
          k !== null && (k.return = null), s.return = null;
        } catch (L) {
          Ae(s, t, L);
        }
      }
      if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) dd(t, e), t = t.sibling;
    }
    function dd(e, t) {
      var r = e.alternate, o = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if (bt(t, e), Ot(e), o & 4) {
            try {
              so(3, e, e.return), mi(3, e);
            } catch (J) {
              Ae(e, e.return, J);
            }
            try {
              so(5, e, e.return);
            } catch (J) {
              Ae(e, e.return, J);
            }
          }
          break;
        case 1:
          bt(t, e), Ot(e), o & 512 && r !== null && dn(r, r.return);
          break;
        case 5:
          if (bt(t, e), Ot(e), o & 512 && r !== null && dn(r, r.return), e.flags & 32) {
            var s = e.stateNode;
            try {
              Rn(s, "");
            } catch (J) {
              Ae(e, e.return, J);
            }
          }
          if (o & 4 && (s = e.stateNode, s != null)) {
            var u = e.memoizedProps, f = r !== null ? r.memoizedProps : u, y = e.type, k = e.updateQueue;
            if (e.updateQueue = null, k !== null) try {
              y === "input" && u.type === "radio" && u.name != null && Fa(s, u), al(y, f);
              var L = al(y, u);
              for (f = 0; f < k.length; f += 2) {
                var I = k[f], H = k[f + 1];
                I === "style" ? Ka(s, H) : I === "dangerouslySetInnerHTML" ? $a(s, H) : I === "children" ? Rn(s, H) : U(s, I, H, L);
              }
              switch (y) {
                case "input":
                  nl(s, u);
                  break;
                case "textarea":
                  Ha(s, u);
                  break;
                case "select":
                  var F = s._wrapperState.wasMultiple;
                  s._wrapperState.wasMultiple = !!u.multiple;
                  var Q = u.value;
                  Q != null ? Ur(s, !!u.multiple, Q, false) : F !== !!u.multiple && (u.defaultValue != null ? Ur(s, !!u.multiple, u.defaultValue, true) : Ur(s, !!u.multiple, u.multiple ? [] : "", false));
              }
              s[Xn] = u;
            } catch (J) {
              Ae(e, e.return, J);
            }
          }
          break;
        case 6:
          if (bt(t, e), Ot(e), o & 4) {
            if (e.stateNode === null) throw Error(l(162));
            s = e.stateNode, u = e.memoizedProps;
            try {
              s.nodeValue = u;
            } catch (J) {
              Ae(e, e.return, J);
            }
          }
          break;
        case 3:
          if (bt(t, e), Ot(e), o & 4 && r !== null && r.memoizedState.isDehydrated) try {
            Fn(t.containerInfo);
          } catch (J) {
            Ae(e, e.return, J);
          }
          break;
        case 4:
          bt(t, e), Ot(e);
          break;
        case 13:
          bt(t, e), Ot(e), s = e.child, s.flags & 8192 && (u = s.memoizedState !== null, s.stateNode.isHidden = u, !u || s.alternate !== null && s.alternate.memoizedState !== null || (Os = Le())), o & 4 && cd(e);
          break;
        case 22:
          if (I = r !== null && r.memoizedState !== null, e.mode & 1 ? (Ke = (L = Ke) || I, bt(t, e), Ke = L) : bt(t, e), Ot(e), o & 8192) {
            if (L = e.memoizedState !== null, (e.stateNode.isHidden = L) && !I && e.mode & 1) for (Y = e, I = e.child; I !== null; ) {
              for (H = Y = I; Y !== null; ) {
                switch (F = Y, Q = F.child, F.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    so(4, F, F.return);
                    break;
                  case 1:
                    dn(F, F.return);
                    var q = F.stateNode;
                    if (typeof q.componentWillUnmount == "function") {
                      o = F, r = F.return;
                      try {
                        t = o, q.props = t.memoizedProps, q.state = t.memoizedState, q.componentWillUnmount();
                      } catch (J) {
                        Ae(o, r, J);
                      }
                    }
                    break;
                  case 5:
                    dn(F, F.return);
                    break;
                  case 22:
                    if (F.memoizedState !== null) {
                      md(H);
                      continue;
                    }
                }
                Q !== null ? (Q.return = F, Y = Q) : md(H);
              }
              I = I.sibling;
            }
            e: for (I = null, H = e; ; ) {
              if (H.tag === 5) {
                if (I === null) {
                  I = H;
                  try {
                    s = H.stateNode, L ? (u = s.style, typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : u.display = "none") : (y = H.stateNode, k = H.memoizedProps.style, f = k != null && k.hasOwnProperty("display") ? k.display : null, y.style.display = Ga("display", f));
                  } catch (J) {
                    Ae(e, e.return, J);
                  }
                }
              } else if (H.tag === 6) {
                if (I === null) try {
                  H.stateNode.nodeValue = L ? "" : H.memoizedProps;
                } catch (J) {
                  Ae(e, e.return, J);
                }
              } else if ((H.tag !== 22 && H.tag !== 23 || H.memoizedState === null || H === e) && H.child !== null) {
                H.child.return = H, H = H.child;
                continue;
              }
              if (H === e) break e;
              for (; H.sibling === null; ) {
                if (H.return === null || H.return === e) break e;
                I === H && (I = null), H = H.return;
              }
              I === H && (I = null), H.sibling.return = H.return, H = H.sibling;
            }
          }
          break;
        case 19:
          bt(t, e), Ot(e), o & 4 && cd(e);
          break;
        case 21:
          break;
        default:
          bt(t, e), Ot(e);
      }
    }
    function Ot(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          e: {
            for (var r = e.return; r !== null; ) {
              if (sd(r)) {
                var o = r;
                break e;
              }
              r = r.return;
            }
            throw Error(l(160));
          }
          switch (o.tag) {
            case 5:
              var s = o.stateNode;
              o.flags & 32 && (Rn(s, ""), o.flags &= -33);
              var u = ad(e);
              As(e, u, s);
              break;
            case 3:
            case 4:
              var f = o.stateNode.containerInfo, y = ad(e);
              Ns(e, y, f);
              break;
            default:
              throw Error(l(161));
          }
        } catch (k) {
          Ae(e, e.return, k);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function Rh(e, t, r) {
      Y = e, fd(e);
    }
    function fd(e, t, r) {
      for (var o = (e.mode & 1) !== 0; Y !== null; ) {
        var s = Y, u = s.child;
        if (s.tag === 22 && o) {
          var f = s.memoizedState !== null || pi;
          if (!f) {
            var y = s.alternate, k = y !== null && y.memoizedState !== null || Ke;
            y = pi;
            var L = Ke;
            if (pi = f, (Ke = k) && !L) for (Y = s; Y !== null; ) f = Y, k = f.child, f.tag === 22 && f.memoizedState !== null ? hd(s) : k !== null ? (k.return = f, Y = k) : hd(s);
            for (; u !== null; ) Y = u, fd(u), u = u.sibling;
            Y = s, pi = y, Ke = L;
          }
          pd(e);
        } else s.subtreeFlags & 8772 && u !== null ? (u.return = s, Y = u) : pd(e);
      }
    }
    function pd(e) {
      for (; Y !== null; ) {
        var t = Y;
        if (t.flags & 8772) {
          var r = t.alternate;
          try {
            if (t.flags & 8772) switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Ke || mi(5, t);
                break;
              case 1:
                var o = t.stateNode;
                if (t.flags & 4 && !Ke) if (r === null) o.componentDidMount();
                else {
                  var s = t.elementType === t.type ? r.memoizedProps : Ct(t.type, r.memoizedProps);
                  o.componentDidUpdate(s, r.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
                }
                var u = t.updateQueue;
                u !== null && mc(t, u, o);
                break;
              case 3:
                var f = t.updateQueue;
                if (f !== null) {
                  if (r = null, t.child !== null) switch (t.child.tag) {
                    case 5:
                      r = t.child.stateNode;
                      break;
                    case 1:
                      r = t.child.stateNode;
                  }
                  mc(t, f, r);
                }
                break;
              case 5:
                var y = t.stateNode;
                if (r === null && t.flags & 4) {
                  r = y;
                  var k = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      k.autoFocus && r.focus();
                      break;
                    case "img":
                      k.src && (r.src = k.src);
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
                  var L = t.alternate;
                  if (L !== null) {
                    var I = L.memoizedState;
                    if (I !== null) {
                      var H = I.dehydrated;
                      H !== null && Fn(H);
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
            Ke || t.flags & 512 && Ms(t);
          } catch (F) {
            Ae(t, t.return, F);
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
    function md(e) {
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
    function hd(e) {
      for (; Y !== null; ) {
        var t = Y;
        try {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              var r = t.return;
              try {
                mi(4, t);
              } catch (k) {
                Ae(t, r, k);
              }
              break;
            case 1:
              var o = t.stateNode;
              if (typeof o.componentDidMount == "function") {
                var s = t.return;
                try {
                  o.componentDidMount();
                } catch (k) {
                  Ae(t, s, k);
                }
              }
              var u = t.return;
              try {
                Ms(t);
              } catch (k) {
                Ae(t, u, k);
              }
              break;
            case 5:
              var f = t.return;
              try {
                Ms(t);
              } catch (k) {
                Ae(t, f, k);
              }
          }
        } catch (k) {
          Ae(t, t.return, k);
        }
        if (t === e) {
          Y = null;
          break;
        }
        var y = t.sibling;
        if (y !== null) {
          y.return = t.return, Y = y;
          break;
        }
        Y = t.return;
      }
    }
    var Mh = Math.ceil, hi = O.ReactCurrentDispatcher, Ls = O.ReactCurrentOwner, gt = O.ReactCurrentBatchConfig, ve = 0, ze = null, Oe = null, We = 0, ut = 0, fn = ir(0), De = 0, ao = null, jr = 0, gi = 0, _s = 0, uo = null, nt = null, Os = 0, pn = 1 / 0, Qt = null, vi = false, js = null, dr = null, yi = false, fr = null, wi = 0, co = 0, Ds = null, Si = -1, xi = 0;
    function qe() {
      return ve & 6 ? Le() : Si !== -1 ? Si : Si = Le();
    }
    function pr(e) {
      return e.mode & 1 ? ve & 2 && We !== 0 ? We & -We : fh.transition !== null ? (xi === 0 && (xi = au()), xi) : (e = xe, e !== 0 || (e = window.event, e = e === void 0 ? 16 : vu(e.type)), e) : 1;
    }
    function Et(e, t, r, o) {
      if (50 < co) throw co = 0, Ds = null, Error(l(185));
      On(e, r, o), (!(ve & 2) || e !== ze) && (e === ze && (!(ve & 2) && (gi |= r), De === 4 && mr(e, We)), ot(e, o), r === 1 && ve === 0 && !(t.mode & 1) && (pn = Le() + 500, Yo && sr()));
    }
    function ot(e, t) {
      var r = e.callbackNode;
      fm(e, t);
      var o = No(e, e === ze ? We : 0);
      if (o === 0) r !== null && iu(r), e.callbackNode = null, e.callbackPriority = 0;
      else if (t = o & -o, e.callbackPriority !== t) {
        if (r != null && iu(r), t === 1) e.tag === 0 ? dh(vd.bind(null, e)) : rc(vd.bind(null, e)), sh(function() {
          !(ve & 6) && sr();
        }), r = null;
        else {
          switch (uu(o)) {
            case 1:
              r = hl;
              break;
            case 4:
              r = lu;
              break;
            case 16:
              r = Eo;
              break;
            case 536870912:
              r = su;
              break;
            default:
              r = Eo;
          }
          r = bd(r, gd.bind(null, e));
        }
        e.callbackPriority = t, e.callbackNode = r;
      }
    }
    function gd(e, t) {
      if (Si = -1, xi = 0, ve & 6) throw Error(l(327));
      var r = e.callbackNode;
      if (mn() && e.callbackNode !== r) return null;
      var o = No(e, e === ze ? We : 0);
      if (o === 0) return null;
      if (o & 30 || o & e.expiredLanes || t) t = ki(e, o);
      else {
        t = o;
        var s = ve;
        ve |= 2;
        var u = wd();
        (ze !== e || We !== t) && (Qt = null, pn = Le() + 500, Br(e, t));
        do
          try {
            Lh();
            break;
          } catch (y) {
            yd(e, y);
          }
        while (true);
        es(), hi.current = u, ve = s, Oe !== null ? t = 0 : (ze = null, We = 0, t = De);
      }
      if (t !== 0) {
        if (t === 2 && (s = gl(e), s !== 0 && (o = s, t = Bs(e, s))), t === 1) throw r = ao, Br(e, 0), mr(e, o), ot(e, Le()), r;
        if (t === 6) mr(e, o);
        else {
          if (s = e.current.alternate, !(o & 30) && !Nh(s) && (t = ki(e, o), t === 2 && (u = gl(e), u !== 0 && (o = u, t = Bs(e, u))), t === 1)) throw r = ao, Br(e, 0), mr(e, o), ot(e, Le()), r;
          switch (e.finishedWork = s, e.finishedLanes = o, t) {
            case 0:
            case 1:
              throw Error(l(345));
            case 2:
              zr(e, nt, Qt);
              break;
            case 3:
              if (mr(e, o), (o & 130023424) === o && (t = Os + 500 - Le(), 10 < t)) {
                if (No(e, 0) !== 0) break;
                if (s = e.suspendedLanes, (s & o) !== o) {
                  qe(), e.pingedLanes |= e.suspendedLanes & s;
                  break;
                }
                e.timeoutHandle = Ul(zr.bind(null, e, nt, Qt), t);
                break;
              }
              zr(e, nt, Qt);
              break;
            case 4:
              if (mr(e, o), (o & 4194240) === o) break;
              for (t = e.eventTimes, s = -1; 0 < o; ) {
                var f = 31 - St(o);
                u = 1 << f, f = t[f], f > s && (s = f), o &= ~u;
              }
              if (o = s, o = Le() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * Mh(o / 1960)) - o, 10 < o) {
                e.timeoutHandle = Ul(zr.bind(null, e, nt, Qt), o);
                break;
              }
              zr(e, nt, Qt);
              break;
            case 5:
              zr(e, nt, Qt);
              break;
            default:
              throw Error(l(329));
          }
        }
      }
      return ot(e, Le()), e.callbackNode === r ? gd.bind(null, e) : null;
    }
    function Bs(e, t) {
      var r = uo;
      return e.current.memoizedState.isDehydrated && (Br(e, t).flags |= 256), e = ki(e, t), e !== 2 && (t = nt, nt = r, t !== null && zs(t)), e;
    }
    function zs(e) {
      nt === null ? nt = e : nt.push.apply(nt, e);
    }
    function Nh(e) {
      for (var t = e; ; ) {
        if (t.flags & 16384) {
          var r = t.updateQueue;
          if (r !== null && (r = r.stores, r !== null)) for (var o = 0; o < r.length; o++) {
            var s = r[o], u = s.getSnapshot;
            s = s.value;
            try {
              if (!xt(u(), s)) return false;
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
    function mr(e, t) {
      for (t &= ~_s, t &= ~gi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
        var r = 31 - St(t), o = 1 << r;
        e[r] = -1, t &= ~o;
      }
    }
    function vd(e) {
      if (ve & 6) throw Error(l(327));
      mn();
      var t = No(e, 0);
      if (!(t & 1)) return ot(e, Le()), null;
      var r = ki(e, t);
      if (e.tag !== 0 && r === 2) {
        var o = gl(e);
        o !== 0 && (t = o, r = Bs(e, o));
      }
      if (r === 1) throw r = ao, Br(e, 0), mr(e, t), ot(e, Le()), r;
      if (r === 6) throw Error(l(345));
      return e.finishedWork = e.current.alternate, e.finishedLanes = t, zr(e, nt, Qt), ot(e, Le()), null;
    }
    function Fs(e, t) {
      var r = ve;
      ve |= 1;
      try {
        return e(t);
      } finally {
        ve = r, ve === 0 && (pn = Le() + 500, Yo && sr());
      }
    }
    function Dr(e) {
      fr !== null && fr.tag === 0 && !(ve & 6) && mn();
      var t = ve;
      ve |= 1;
      var r = gt.transition, o = xe;
      try {
        if (gt.transition = null, xe = 1, e) return e();
      } finally {
        xe = o, gt.transition = r, ve = t, !(ve & 6) && sr();
      }
    }
    function Is() {
      ut = fn.current, Ee(fn);
    }
    function Br(e, t) {
      e.finishedWork = null, e.finishedLanes = 0;
      var r = e.timeoutHandle;
      if (r !== -1 && (e.timeoutHandle = -1, lh(r)), Oe !== null) for (r = Oe.return; r !== null; ) {
        var o = r;
        switch (Yl(o), o.tag) {
          case 1:
            o = o.type.childContextTypes, o != null && Ko();
            break;
          case 3:
            un(), Ee(et), Ee(Ve), as();
            break;
          case 5:
            ls(o);
            break;
          case 4:
            un();
            break;
          case 13:
            Ee(Me);
            break;
          case 19:
            Ee(Me);
            break;
          case 10:
            ts(o.type._context);
            break;
          case 22:
          case 23:
            Is();
        }
        r = r.return;
      }
      if (ze = e, Oe = e = hr(e.current, null), We = ut = t, De = 0, ao = null, _s = gi = jr = 0, nt = uo = null, Lr !== null) {
        for (t = 0; t < Lr.length; t++) if (r = Lr[t], o = r.interleaved, o !== null) {
          r.interleaved = null;
          var s = o.next, u = r.pending;
          if (u !== null) {
            var f = u.next;
            u.next = s, o.next = f;
          }
          r.pending = o;
        }
        Lr = null;
      }
      return e;
    }
    function yd(e, t) {
      do {
        var r = Oe;
        try {
          if (es(), ii.current = ui, li) {
            for (var o = Ne.memoizedState; o !== null; ) {
              var s = o.queue;
              s !== null && (s.pending = null), o = o.next;
            }
            li = false;
          }
          if (Or = 0, Be = je = Ne = null, ro = false, no = 0, Ls.current = null, r === null || r.return === null) {
            De = 1, ao = t, Oe = null;
            break;
          }
          e: {
            var u = e, f = r.return, y = r, k = t;
            if (t = We, y.flags |= 32768, k !== null && typeof k == "object" && typeof k.then == "function") {
              var L = k, I = y, H = I.tag;
              if (!(I.mode & 1) && (H === 0 || H === 11 || H === 15)) {
                var F = I.alternate;
                F ? (I.updateQueue = F.updateQueue, I.memoizedState = F.memoizedState, I.lanes = F.lanes) : (I.updateQueue = null, I.memoizedState = null);
              }
              var Q = Uc(f);
              if (Q !== null) {
                Q.flags &= -257, Vc(Q, f, y, u, t), Q.mode & 1 && Hc(u, L, t), t = Q, k = L;
                var q = t.updateQueue;
                if (q === null) {
                  var J = /* @__PURE__ */ new Set();
                  J.add(k), t.updateQueue = J;
                } else q.add(k);
                break e;
              } else {
                if (!(t & 1)) {
                  Hc(u, L, t), Ws();
                  break e;
                }
                k = Error(l(426));
              }
            } else if (Re && y.mode & 1) {
              var _e = Uc(f);
              if (_e !== null) {
                !(_e.flags & 65536) && (_e.flags |= 256), Vc(_e, f, y, u, t), Jl(cn(k, y));
                break e;
              }
            }
            u = k = cn(k, y), De !== 4 && (De = 2), uo === null ? uo = [
              u
            ] : uo.push(u), u = f;
            do {
              switch (u.tag) {
                case 3:
                  u.flags |= 65536, t &= -t, u.lanes |= t;
                  var R = Ic(u, k, t);
                  pc(u, R);
                  break e;
                case 1:
                  y = k;
                  var E = u.type, N = u.stateNode;
                  if (!(u.flags & 128) && (typeof E.getDerivedStateFromError == "function" || N !== null && typeof N.componentDidCatch == "function" && (dr === null || !dr.has(N)))) {
                    u.flags |= 65536, t &= -t, u.lanes |= t;
                    var V = Wc(u, y, t);
                    pc(u, V);
                    break e;
                  }
              }
              u = u.return;
            } while (u !== null);
          }
          xd(r);
        } catch (Z) {
          t = Z, Oe === r && r !== null && (Oe = r = r.return);
          continue;
        }
        break;
      } while (true);
    }
    function wd() {
      var e = hi.current;
      return hi.current = ui, e === null ? ui : e;
    }
    function Ws() {
      (De === 0 || De === 3 || De === 2) && (De = 4), ze === null || !(jr & 268435455) && !(gi & 268435455) || mr(ze, We);
    }
    function ki(e, t) {
      var r = ve;
      ve |= 2;
      var o = wd();
      (ze !== e || We !== t) && (Qt = null, Br(e, t));
      do
        try {
          Ah();
          break;
        } catch (s) {
          yd(e, s);
        }
      while (true);
      if (es(), ve = r, hi.current = o, Oe !== null) throw Error(l(261));
      return ze = null, We = 0, De;
    }
    function Ah() {
      for (; Oe !== null; ) Sd(Oe);
    }
    function Lh() {
      for (; Oe !== null && !nm(); ) Sd(Oe);
    }
    function Sd(e) {
      var t = Pd(e.alternate, e, ut);
      e.memoizedProps = e.pendingProps, t === null ? xd(e) : Oe = t, Ls.current = null;
    }
    function xd(e) {
      var t = e;
      do {
        var r = t.alternate;
        if (e = t.return, t.flags & 32768) {
          if (r = bh(r, t), r !== null) {
            r.flags &= 32767, Oe = r;
            return;
          }
          if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
          else {
            De = 6, Oe = null;
            return;
          }
        } else if (r = Ph(r, t, ut), r !== null) {
          Oe = r;
          return;
        }
        if (t = t.sibling, t !== null) {
          Oe = t;
          return;
        }
        Oe = t = e;
      } while (t !== null);
      De === 0 && (De = 5);
    }
    function zr(e, t, r) {
      var o = xe, s = gt.transition;
      try {
        gt.transition = null, xe = 1, _h(e, t, r, o);
      } finally {
        gt.transition = s, xe = o;
      }
      return null;
    }
    function _h(e, t, r, o) {
      do
        mn();
      while (fr !== null);
      if (ve & 6) throw Error(l(327));
      r = e.finishedWork;
      var s = e.finishedLanes;
      if (r === null) return null;
      if (e.finishedWork = null, e.finishedLanes = 0, r === e.current) throw Error(l(177));
      e.callbackNode = null, e.callbackPriority = 0;
      var u = r.lanes | r.childLanes;
      if (pm(e, u), e === ze && (Oe = ze = null, We = 0), !(r.subtreeFlags & 2064) && !(r.flags & 2064) || yi || (yi = true, bd(Eo, function() {
        return mn(), null;
      })), u = (r.flags & 15990) !== 0, r.subtreeFlags & 15990 || u) {
        u = gt.transition, gt.transition = null;
        var f = xe;
        xe = 1;
        var y = ve;
        ve |= 4, Ls.current = null, Th(e, r), dd(r, e), Zm(Wl), _o = !!Il, Wl = Il = null, e.current = r, Rh(r), om(), ve = y, xe = f, gt.transition = u;
      } else e.current = r;
      if (yi && (yi = false, fr = e, wi = s), u = e.pendingLanes, u === 0 && (dr = null), sm(r.stateNode), ot(e, Le()), t !== null) for (o = e.onRecoverableError, r = 0; r < t.length; r++) s = t[r], o(s.value, {
        componentStack: s.stack,
        digest: s.digest
      });
      if (vi) throw vi = false, e = js, js = null, e;
      return wi & 1 && e.tag !== 0 && mn(), u = e.pendingLanes, u & 1 ? e === Ds ? co++ : (co = 0, Ds = e) : co = 0, sr(), null;
    }
    function mn() {
      if (fr !== null) {
        var e = uu(wi), t = gt.transition, r = xe;
        try {
          if (gt.transition = null, xe = 16 > e ? 16 : e, fr === null) var o = false;
          else {
            if (e = fr, fr = null, wi = 0, ve & 6) throw Error(l(331));
            var s = ve;
            for (ve |= 4, Y = e.current; Y !== null; ) {
              var u = Y, f = u.child;
              if (Y.flags & 16) {
                var y = u.deletions;
                if (y !== null) {
                  for (var k = 0; k < y.length; k++) {
                    var L = y[k];
                    for (Y = L; Y !== null; ) {
                      var I = Y;
                      switch (I.tag) {
                        case 0:
                        case 11:
                        case 15:
                          so(8, I, u);
                      }
                      var H = I.child;
                      if (H !== null) H.return = I, Y = H;
                      else for (; Y !== null; ) {
                        I = Y;
                        var F = I.sibling, Q = I.return;
                        if (ld(I), I === L) {
                          Y = null;
                          break;
                        }
                        if (F !== null) {
                          F.return = Q, Y = F;
                          break;
                        }
                        Y = Q;
                      }
                    }
                  }
                  var q = u.alternate;
                  if (q !== null) {
                    var J = q.child;
                    if (J !== null) {
                      q.child = null;
                      do {
                        var _e = J.sibling;
                        J.sibling = null, J = _e;
                      } while (J !== null);
                    }
                  }
                  Y = u;
                }
              }
              if (u.subtreeFlags & 2064 && f !== null) f.return = u, Y = f;
              else e: for (; Y !== null; ) {
                if (u = Y, u.flags & 2048) switch (u.tag) {
                  case 0:
                  case 11:
                  case 15:
                    so(9, u, u.return);
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
              f = Y;
              var N = f.child;
              if (f.subtreeFlags & 2064 && N !== null) N.return = f, Y = N;
              else e: for (f = E; Y !== null; ) {
                if (y = Y, y.flags & 2048) try {
                  switch (y.tag) {
                    case 0:
                    case 11:
                    case 15:
                      mi(9, y);
                  }
                } catch (Z) {
                  Ae(y, y.return, Z);
                }
                if (y === f) {
                  Y = null;
                  break e;
                }
                var V = y.sibling;
                if (V !== null) {
                  V.return = y.return, Y = V;
                  break e;
                }
                Y = y.return;
              }
            }
            if (ve = s, sr(), Nt && typeof Nt.onPostCommitFiberRoot == "function") try {
              Nt.onPostCommitFiberRoot(To, e);
            } catch {
            }
            o = true;
          }
          return o;
        } finally {
          xe = r, gt.transition = t;
        }
      }
      return false;
    }
    function kd(e, t, r) {
      t = cn(r, t), t = Ic(e, t, 1), e = ur(e, t, 1), t = qe(), e !== null && (On(e, 1, t), ot(e, t));
    }
    function Ae(e, t, r) {
      if (e.tag === 3) kd(e, e, r);
      else for (; t !== null; ) {
        if (t.tag === 3) {
          kd(t, e, r);
          break;
        } else if (t.tag === 1) {
          var o = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (dr === null || !dr.has(o))) {
            e = cn(r, e), e = Wc(t, e, 1), t = ur(t, e, 1), e = qe(), t !== null && (On(t, 1, e), ot(t, e));
            break;
          }
        }
        t = t.return;
      }
    }
    function Oh(e, t, r) {
      var o = e.pingCache;
      o !== null && o.delete(t), t = qe(), e.pingedLanes |= e.suspendedLanes & r, ze === e && (We & r) === r && (De === 4 || De === 3 && (We & 130023424) === We && 500 > Le() - Os ? Br(e, 0) : _s |= r), ot(e, t);
    }
    function Cd(e, t) {
      t === 0 && (e.mode & 1 ? (t = Mo, Mo <<= 1, !(Mo & 130023424) && (Mo = 4194304)) : t = 1);
      var r = qe();
      e = $t(e, t), e !== null && (On(e, t, r), ot(e, r));
    }
    function jh(e) {
      var t = e.memoizedState, r = 0;
      t !== null && (r = t.retryLane), Cd(e, r);
    }
    function Dh(e, t) {
      var r = 0;
      switch (e.tag) {
        case 13:
          var o = e.stateNode, s = e.memoizedState;
          s !== null && (r = s.retryLane);
          break;
        case 19:
          o = e.stateNode;
          break;
        default:
          throw Error(l(314));
      }
      o !== null && o.delete(t), Cd(e, r);
    }
    var Pd;
    Pd = function(e, t, r) {
      if (e !== null) if (e.memoizedProps !== t.pendingProps || et.current) rt = true;
      else {
        if (!(e.lanes & r) && !(t.flags & 128)) return rt = false, Ch(e, t, r);
        rt = !!(e.flags & 131072);
      }
      else rt = false, Re && t.flags & 1048576 && nc(t, qo, t.index);
      switch (t.lanes = 0, t.tag) {
        case 2:
          var o = t.type;
          fi(e, t), e = t.pendingProps;
          var s = tn(t, Ve.current);
          an(t, r), s = ds(null, t, o, e, s, r);
          var u = fs();
          return t.flags |= 1, typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, tt(o) ? (u = true, Qo(t)) : u = false, t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, os(t), s.updater = ci, t.stateNode = s, s._reactInternals = t, ys(t, o, e, r), t = ks(null, t, o, true, u, r)) : (t.tag = 0, Re && u && Ql(t), Xe(null, t, s, r), t = t.child), t;
        case 16:
          o = t.elementType;
          e: {
            switch (fi(e, t), e = t.pendingProps, s = o._init, o = s(o._payload), t.type = o, s = t.tag = zh(o), e = Ct(o, e), s) {
              case 0:
                t = xs(null, t, o, e, r);
                break e;
              case 1:
                t = Xc(null, t, o, e, r);
                break e;
              case 11:
                t = $c(null, t, o, e, r);
                break e;
              case 14:
                t = Gc(null, t, o, Ct(o.type, e), r);
                break e;
            }
            throw Error(l(306, o, ""));
          }
          return t;
        case 0:
          return o = t.type, s = t.pendingProps, s = t.elementType === o ? s : Ct(o, s), xs(e, t, o, s, r);
        case 1:
          return o = t.type, s = t.pendingProps, s = t.elementType === o ? s : Ct(o, s), Xc(e, t, o, s, r);
        case 3:
          e: {
            if (qc(t), e === null) throw Error(l(387));
            o = t.pendingProps, u = t.memoizedState, s = u.element, fc(e, t), ni(t, o, null, r);
            var f = t.memoizedState;
            if (o = f.element, u.isDehydrated) if (u = {
              element: o,
              isDehydrated: false,
              cache: f.cache,
              pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
              transitions: f.transitions
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              s = cn(Error(l(423)), t), t = Jc(e, t, o, r, s);
              break e;
            } else if (o !== s) {
              s = cn(Error(l(424)), t), t = Jc(e, t, o, r, s);
              break e;
            } else for (at = or(t.stateNode.containerInfo.firstChild), st = t, Re = true, kt = null, r = cc(t, null, o, r), t.child = r; r; ) r.flags = r.flags & -3 | 4096, r = r.sibling;
            else {
              if (on(), o === s) {
                t = Kt(e, t, r);
                break e;
              }
              Xe(e, t, o, r);
            }
            t = t.child;
          }
          return t;
        case 5:
          return hc(t), e === null && ql(t), o = t.type, s = t.pendingProps, u = e !== null ? e.memoizedProps : null, f = s.children, Hl(o, s) ? f = null : u !== null && Hl(o, u) && (t.flags |= 32), Yc(e, t), Xe(e, t, f, r), t.child;
        case 6:
          return e === null && ql(t), null;
        case 13:
          return Zc(e, t, r);
        case 4:
          return is(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = ln(t, null, o, r) : Xe(e, t, o, r), t.child;
        case 11:
          return o = t.type, s = t.pendingProps, s = t.elementType === o ? s : Ct(o, s), $c(e, t, o, s, r);
        case 7:
          return Xe(e, t, t.pendingProps, r), t.child;
        case 8:
          return Xe(e, t, t.pendingProps.children, r), t.child;
        case 12:
          return Xe(e, t, t.pendingProps.children, r), t.child;
        case 10:
          e: {
            if (o = t.type._context, s = t.pendingProps, u = t.memoizedProps, f = s.value, Pe(ei, o._currentValue), o._currentValue = f, u !== null) if (xt(u.value, f)) {
              if (u.children === s.children && !et.current) {
                t = Kt(e, t, r);
                break e;
              }
            } else for (u = t.child, u !== null && (u.return = t); u !== null; ) {
              var y = u.dependencies;
              if (y !== null) {
                f = u.child;
                for (var k = y.firstContext; k !== null; ) {
                  if (k.context === o) {
                    if (u.tag === 1) {
                      k = Gt(-1, r & -r), k.tag = 2;
                      var L = u.updateQueue;
                      if (L !== null) {
                        L = L.shared;
                        var I = L.pending;
                        I === null ? k.next = k : (k.next = I.next, I.next = k), L.pending = k;
                      }
                    }
                    u.lanes |= r, k = u.alternate, k !== null && (k.lanes |= r), rs(u.return, r, t), y.lanes |= r;
                    break;
                  }
                  k = k.next;
                }
              } else if (u.tag === 10) f = u.type === t.type ? null : u.child;
              else if (u.tag === 18) {
                if (f = u.return, f === null) throw Error(l(341));
                f.lanes |= r, y = f.alternate, y !== null && (y.lanes |= r), rs(f, r, t), f = u.sibling;
              } else f = u.child;
              if (f !== null) f.return = u;
              else for (f = u; f !== null; ) {
                if (f === t) {
                  f = null;
                  break;
                }
                if (u = f.sibling, u !== null) {
                  u.return = f.return, f = u;
                  break;
                }
                f = f.return;
              }
              u = f;
            }
            Xe(e, t, s.children, r), t = t.child;
          }
          return t;
        case 9:
          return s = t.type, o = t.pendingProps.children, an(t, r), s = mt(s), o = o(s), t.flags |= 1, Xe(e, t, o, r), t.child;
        case 14:
          return o = t.type, s = Ct(o, t.pendingProps), s = Ct(o.type, s), Gc(e, t, o, s, r);
        case 15:
          return Kc(e, t, t.type, t.pendingProps, r);
        case 17:
          return o = t.type, s = t.pendingProps, s = t.elementType === o ? s : Ct(o, s), fi(e, t), t.tag = 1, tt(o) ? (e = true, Qo(t)) : e = false, an(t, r), zc(t, o, s), ys(t, o, s, r), ks(null, t, o, true, e, r);
        case 19:
          return td(e, t, r);
        case 22:
          return Qc(e, t, r);
      }
      throw Error(l(156, t.tag));
    };
    function bd(e, t) {
      return ou(e, t);
    }
    function Bh(e, t, r, o) {
      this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function vt(e, t, r, o) {
      return new Bh(e, t, r, o);
    }
    function Hs(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function zh(e) {
      if (typeof e == "function") return Hs(e) ? 1 : 0;
      if (e != null) {
        if (e = e.$$typeof, e === te) return 11;
        if (e === ke) return 14;
      }
      return 2;
    }
    function hr(e, t) {
      var r = e.alternate;
      return r === null ? (r = vt(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 14680064, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r;
    }
    function Ci(e, t, r, o, s, u) {
      var f = 2;
      if (o = e, typeof e == "function") Hs(e) && (f = 1);
      else if (typeof e == "string") f = 5;
      else e: switch (e) {
        case D:
          return Fr(r.children, s, u, t);
        case ee:
          f = 8, s |= 8;
          break;
        case X:
          return e = vt(12, r, t, s | 2), e.elementType = X, e.lanes = u, e;
        case ce:
          return e = vt(13, r, t, s), e.elementType = ce, e.lanes = u, e;
        case pe:
          return e = vt(19, r, t, s), e.elementType = pe, e.lanes = u, e;
        case se:
          return Pi(r, s, u, t);
        default:
          if (typeof e == "object" && e !== null) switch (e.$$typeof) {
            case re:
              f = 10;
              break e;
            case ne:
              f = 9;
              break e;
            case te:
              f = 11;
              break e;
            case ke:
              f = 14;
              break e;
            case de:
              f = 16, o = null;
              break e;
          }
          throw Error(l(130, e == null ? e : typeof e, ""));
      }
      return t = vt(f, r, t, s), t.elementType = e, t.type = o, t.lanes = u, t;
    }
    function Fr(e, t, r, o) {
      return e = vt(7, e, o, t), e.lanes = r, e;
    }
    function Pi(e, t, r, o) {
      return e = vt(22, e, o, t), e.elementType = se, e.lanes = r, e.stateNode = {
        isHidden: false
      }, e;
    }
    function Us(e, t, r) {
      return e = vt(6, e, null, t), e.lanes = r, e;
    }
    function Vs(e, t, r) {
      return t = vt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = r, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    function Fh(e, t, r, o, s) {
      this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = vl(0), this.expirationTimes = vl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = vl(0), this.identifierPrefix = o, this.onRecoverableError = s, this.mutableSourceEagerHydrationData = null;
    }
    function $s(e, t, r, o, s, u, f, y, k) {
      return e = new Fh(e, t, r, y, k), t === 1 ? (t = 1, u === true && (t |= 8)) : t = 0, u = vt(3, null, null, t), e.current = u, u.stateNode = e, u.memoizedState = {
        element: o,
        isDehydrated: r,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
      }, os(u), e;
    }
    function Ih(e, t, r) {
      var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: $,
        key: o == null ? null : "" + o,
        children: e,
        containerInfo: t,
        implementation: r
      };
    }
    function Ed(e) {
      if (!e) return lr;
      e = e._reactInternals;
      e: {
        if (Tr(e) !== e || e.tag !== 1) throw Error(l(170));
        var t = e;
        do {
          switch (t.tag) {
            case 3:
              t = t.stateNode.context;
              break e;
            case 1:
              if (tt(t.type)) {
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
        if (tt(r)) return ec(e, r, t);
      }
      return t;
    }
    function Td(e, t, r, o, s, u, f, y, k) {
      return e = $s(r, o, true, e, s, u, f, y, k), e.context = Ed(null), r = e.current, o = qe(), s = pr(r), u = Gt(o, s), u.callback = t ?? null, ur(r, u, s), e.current.lanes = s, On(e, s, o), ot(e, o), e;
    }
    function bi(e, t, r, o) {
      var s = t.current, u = qe(), f = pr(s);
      return r = Ed(r), t.context === null ? t.context = r : t.pendingContext = r, t = Gt(u, f), t.payload = {
        element: e
      }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = ur(s, t, f), e !== null && (Et(e, s, f, u), ri(e, s, f)), f;
    }
    function Ei(e) {
      if (e = e.current, !e.child) return null;
      switch (e.child.tag) {
        case 5:
          return e.child.stateNode;
        default:
          return e.child.stateNode;
      }
    }
    function Rd(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var r = e.retryLane;
        e.retryLane = r !== 0 && r < t ? r : t;
      }
    }
    function Gs(e, t) {
      Rd(e, t), (e = e.alternate) && Rd(e, t);
    }
    function Wh() {
      return null;
    }
    var Md = typeof reportError == "function" ? reportError : function(e) {
      console.error(e);
    };
    function Ks(e) {
      this._internalRoot = e;
    }
    Ti.prototype.render = Ks.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error(l(409));
      bi(e, t, null, null);
    }, Ti.prototype.unmount = Ks.prototype.unmount = function() {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Dr(function() {
          bi(null, e, null, null);
        }), t[Wt] = null;
      }
    };
    function Ti(e) {
      this._internalRoot = e;
    }
    Ti.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = fu();
        e = {
          blockedOn: null,
          target: e,
          priority: t
        };
        for (var r = 0; r < tr.length && t !== 0 && t < tr[r].priority; r++) ;
        tr.splice(r, 0, e), r === 0 && hu(e);
      }
    };
    function Qs(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
    }
    function Ri(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
    }
    function Nd() {
    }
    function Hh(e, t, r, o, s) {
      if (s) {
        if (typeof o == "function") {
          var u = o;
          o = function() {
            var L = Ei(f);
            u.call(L);
          };
        }
        var f = Td(t, o, e, 0, null, false, false, "", Nd);
        return e._reactRootContainer = f, e[Wt] = f.current, Qn(e.nodeType === 8 ? e.parentNode : e), Dr(), f;
      }
      for (; s = e.lastChild; ) e.removeChild(s);
      if (typeof o == "function") {
        var y = o;
        o = function() {
          var L = Ei(k);
          y.call(L);
        };
      }
      var k = $s(e, 0, false, null, null, false, false, "", Nd);
      return e._reactRootContainer = k, e[Wt] = k.current, Qn(e.nodeType === 8 ? e.parentNode : e), Dr(function() {
        bi(t, k, r, o);
      }), k;
    }
    function Mi(e, t, r, o, s) {
      var u = r._reactRootContainer;
      if (u) {
        var f = u;
        if (typeof s == "function") {
          var y = s;
          s = function() {
            var k = Ei(f);
            y.call(k);
          };
        }
        bi(t, f, e, s);
      } else f = Hh(r, t, e, s, o);
      return Ei(f);
    }
    cu = function(e) {
      switch (e.tag) {
        case 3:
          var t = e.stateNode;
          if (t.current.memoizedState.isDehydrated) {
            var r = _n(t.pendingLanes);
            r !== 0 && (yl(t, r | 1), ot(t, Le()), !(ve & 6) && (pn = Le() + 500, sr()));
          }
          break;
        case 13:
          Dr(function() {
            var o = $t(e, 1);
            if (o !== null) {
              var s = qe();
              Et(o, e, 1, s);
            }
          }), Gs(e, 1);
      }
    }, wl = function(e) {
      if (e.tag === 13) {
        var t = $t(e, 134217728);
        if (t !== null) {
          var r = qe();
          Et(t, e, 134217728, r);
        }
        Gs(e, 134217728);
      }
    }, du = function(e) {
      if (e.tag === 13) {
        var t = pr(e), r = $t(e, t);
        if (r !== null) {
          var o = qe();
          Et(r, e, t, o);
        }
        Gs(e, t);
      }
    }, fu = function() {
      return xe;
    }, pu = function(e, t) {
      var r = xe;
      try {
        return xe = e, t();
      } finally {
        xe = r;
      }
    }, dl = function(e, t, r) {
      switch (t) {
        case "input":
          if (nl(e, r), t = r.name, r.type === "radio" && t != null) {
            for (r = e; r.parentNode; ) r = r.parentNode;
            for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < r.length; t++) {
              var o = r[t];
              if (o !== e && o.form === e.form) {
                var s = Go(o);
                if (!s) throw Error(l(90));
                ko(o), nl(o, s);
              }
            }
          }
          break;
        case "textarea":
          Ha(e, r);
          break;
        case "select":
          t = r.value, t != null && Ur(e, !!r.multiple, t, false);
      }
    }, qa = Fs, Ja = Dr;
    var Uh = {
      usingClientEntryPoint: false,
      Events: [
        qn,
        Zr,
        Go,
        Ya,
        Xa,
        Fs
      ]
    }, fo = {
      findFiberByHostInstance: Rr,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom"
    }, Vh = {
      bundleType: fo.bundleType,
      version: fo.version,
      rendererPackageName: fo.rendererPackageName,
      rendererConfig: fo.rendererConfig,
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
        return e = ru(e), e === null ? null : e.stateNode;
      },
      findFiberByHostInstance: fo.findFiberByHostInstance || Wh,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var Ni = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!Ni.isDisabled && Ni.supportsFiber) try {
        To = Ni.inject(Vh), Nt = Ni;
      } catch {
      }
    }
    return it.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Uh, it.createPortal = function(e, t) {
      var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Qs(t)) throw Error(l(200));
      return Ih(e, t, null, r);
    }, it.createRoot = function(e, t) {
      if (!Qs(e)) throw Error(l(299));
      var r = false, o = "", s = Md;
      return t != null && (t.unstable_strictMode === true && (r = true), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError)), t = $s(e, 1, false, null, null, r, false, o, s), e[Wt] = t.current, Qn(e.nodeType === 8 ? e.parentNode : e), new Ks(t);
    }, it.findDOMNode = function(e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0) throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
      return e = ru(t), e = e === null ? null : e.stateNode, e;
    }, it.flushSync = function(e) {
      return Dr(e);
    }, it.hydrate = function(e, t, r) {
      if (!Ri(t)) throw Error(l(200));
      return Mi(null, e, t, true, r);
    }, it.hydrateRoot = function(e, t, r) {
      if (!Qs(e)) throw Error(l(405));
      var o = r != null && r.hydratedSources || null, s = false, u = "", f = Md;
      if (r != null && (r.unstable_strictMode === true && (s = true), r.identifierPrefix !== void 0 && (u = r.identifierPrefix), r.onRecoverableError !== void 0 && (f = r.onRecoverableError)), t = Td(t, null, e, 1, r ?? null, s, false, u, f), e[Wt] = t.current, Qn(e), o) for (e = 0; e < o.length; e++) r = o[e], s = r._getVersion, s = s(r._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [
        r,
        s
      ] : t.mutableSourceEagerHydrationData.push(r, s);
      return new Ti(t);
    }, it.render = function(e, t, r) {
      if (!Ri(t)) throw Error(l(200));
      return Mi(null, e, t, false, r);
    }, it.unmountComponentAtNode = function(e) {
      if (!Ri(e)) throw Error(l(40));
      return e._reactRootContainer ? (Dr(function() {
        Mi(null, null, e, false, function() {
          e._reactRootContainer = null, e[Wt] = null;
        });
      }), true) : false;
    }, it.unstable_batchedUpdates = Fs, it.unstable_renderSubtreeIntoContainer = function(e, t, r, o) {
      if (!Ri(r)) throw Error(l(200));
      if (e == null || e._reactInternals === void 0) throw Error(l(38));
      return Mi(e, t, r, false, o);
    }, it.version = "18.3.1-next-f1338f8080-20240426", it;
  }
  var zd;
  function kf() {
    if (zd) return qs.exports;
    zd = 1;
    function n() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
    }
    return n(), qs.exports = eg(), qs.exports;
  }
  var Fd;
  function tg() {
    if (Fd) return Ai;
    Fd = 1;
    var n = kf();
    return Ai.createRoot = n.createRoot, Ai.hydrateRoot = n.hydrateRoot, Ai;
  }
  var rg = tg();
  function Id(n, i) {
    if (typeof n == "function") return n(i);
    n != null && (n.current = i);
  }
  function Cf(...n) {
    return (i) => {
      let l = false;
      const a = n.map((c) => {
        const d = Id(c, i);
        return !l && typeof d == "function" && (l = true), d;
      });
      if (l) return () => {
        for (let c = 0; c < a.length; c++) {
          const d = a[c];
          typeof d == "function" ? d() : Id(n[c], null);
        }
      };
    };
  }
  function Ze(...n) {
    return h.useCallback(Cf(...n), n);
  }
  var Qi = h.forwardRef((n, i) => {
    const { children: l, ...a } = n, c = h.Children.toArray(l), d = c.find(og);
    if (d) {
      const p = d.props.children, m = c.map((g) => g === d ? h.Children.count(p) > 1 ? h.Children.only(null) : h.isValidElement(p) ? p.props.children : null : g);
      return S.jsx(ca, {
        ...a,
        ref: i,
        children: h.isValidElement(p) ? h.cloneElement(p, void 0, m) : null
      });
    }
    return S.jsx(ca, {
      ...a,
      ref: i,
      children: l
    });
  });
  Qi.displayName = "Slot";
  var ca = h.forwardRef((n, i) => {
    const { children: l, ...a } = n;
    if (h.isValidElement(l)) {
      const c = lg(l), d = ig(a, l.props);
      return l.type !== h.Fragment && (d.ref = i ? Cf(i, c) : c), h.cloneElement(l, d);
    }
    return h.Children.count(l) > 1 ? h.Children.only(null) : null;
  });
  ca.displayName = "SlotClone";
  var ng = ({ children: n }) => S.jsx(S.Fragment, {
    children: n
  });
  function og(n) {
    return h.isValidElement(n) && n.type === ng;
  }
  function ig(n, i) {
    const l = {
      ...i
    };
    for (const a in i) {
      const c = n[a], d = i[a];
      /^on[A-Z]/.test(a) ? c && d ? l[a] = (...m) => {
        d(...m), c(...m);
      } : c && (l[a] = c) : a === "style" ? l[a] = {
        ...c,
        ...d
      } : a === "className" && (l[a] = [
        c,
        d
      ].filter(Boolean).join(" "));
    }
    return {
      ...n,
      ...l
    };
  }
  function lg(n) {
    var _a2, _b;
    let i = (_a2 = Object.getOwnPropertyDescriptor(n.props, "ref")) == null ? void 0 : _a2.get, l = i && "isReactWarning" in i && i.isReactWarning;
    return l ? n.ref : (i = (_b = Object.getOwnPropertyDescriptor(n, "ref")) == null ? void 0 : _b.get, l = i && "isReactWarning" in i && i.isReactWarning, l ? n.props.ref : n.props.ref || n.ref);
  }
  function Pf(n) {
    var i, l, a = "";
    if (typeof n == "string" || typeof n == "number") a += n;
    else if (typeof n == "object") if (Array.isArray(n)) {
      var c = n.length;
      for (i = 0; i < c; i++) n[i] && (l = Pf(n[i])) && (a && (a += " "), a += l);
    } else for (l in n) n[l] && (a && (a += " "), a += l);
    return a;
  }
  function ya() {
    for (var n, i, l = 0, a = "", c = arguments.length; l < c; l++) (n = arguments[l]) && (i = Pf(n)) && (a && (a += " "), a += i);
    return a;
  }
  const Wd = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n, Hd = ya, sg = (n, i) => (l) => {
    var a;
    if ((i == null ? void 0 : i.variants) == null) return Hd(n, l == null ? void 0 : l.class, l == null ? void 0 : l.className);
    const { variants: c, defaultVariants: d } = i, p = Object.keys(c).map((v) => {
      const w = l == null ? void 0 : l[v], C = d == null ? void 0 : d[v];
      if (w === null) return null;
      const x = Wd(w) || Wd(C);
      return c[v][x];
    }), m = l && Object.entries(l).reduce((v, w) => {
      let [C, x] = w;
      return x === void 0 || (v[C] = x), v;
    }, {}), g = i == null || (a = i.compoundVariants) === null || a === void 0 ? void 0 : a.reduce((v, w) => {
      let { class: C, className: x, ...P } = w;
      return Object.entries(P).every((A) => {
        let [b, M] = A;
        return Array.isArray(M) ? M.includes({
          ...d,
          ...m
        }[b]) : {
          ...d,
          ...m
        }[b] === M;
      }) ? [
        ...v,
        C,
        x
      ] : v;
    }, []);
    return Hd(n, p, g, l == null ? void 0 : l.class, l == null ? void 0 : l.className);
  }, wa = "-", ag = (n) => {
    const i = cg(n), { conflictingClassGroups: l, conflictingClassGroupModifiers: a } = n;
    return {
      getClassGroupId: (p) => {
        const m = p.split(wa);
        return m[0] === "" && m.length !== 1 && m.shift(), bf(m, i) || ug(p);
      },
      getConflictingClassGroupIds: (p, m) => {
        const g = l[p] || [];
        return m && a[p] ? [
          ...g,
          ...a[p]
        ] : g;
      }
    };
  }, bf = (n, i) => {
    var _a2;
    if (n.length === 0) return i.classGroupId;
    const l = n[0], a = i.nextPart.get(l), c = a ? bf(n.slice(1), a) : void 0;
    if (c) return c;
    if (i.validators.length === 0) return;
    const d = n.join(wa);
    return (_a2 = i.validators.find(({ validator: p }) => p(d))) == null ? void 0 : _a2.classGroupId;
  }, Ud = /^\[(.+)\]$/, ug = (n) => {
    if (Ud.test(n)) {
      const i = Ud.exec(n)[1], l = i == null ? void 0 : i.substring(0, i.indexOf(":"));
      if (l) return "arbitrary.." + l;
    }
  }, cg = (n) => {
    const { theme: i, prefix: l } = n, a = {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    };
    return fg(Object.entries(n.classGroups), l).forEach(([d, p]) => {
      da(p, a, d, i);
    }), a;
  }, da = (n, i, l, a) => {
    n.forEach((c) => {
      if (typeof c == "string") {
        const d = c === "" ? i : Vd(i, c);
        d.classGroupId = l;
        return;
      }
      if (typeof c == "function") {
        if (dg(c)) {
          da(c(a), i, l, a);
          return;
        }
        i.validators.push({
          validator: c,
          classGroupId: l
        });
        return;
      }
      Object.entries(c).forEach(([d, p]) => {
        da(p, Vd(i, d), l, a);
      });
    });
  }, Vd = (n, i) => {
    let l = n;
    return i.split(wa).forEach((a) => {
      l.nextPart.has(a) || l.nextPart.set(a, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      }), l = l.nextPart.get(a);
    }), l;
  }, dg = (n) => n.isThemeGetter, fg = (n, i) => i ? n.map(([l, a]) => {
    const c = a.map((d) => typeof d == "string" ? i + d : typeof d == "object" ? Object.fromEntries(Object.entries(d).map(([p, m]) => [
      i + p,
      m
    ])) : d);
    return [
      l,
      c
    ];
  }) : n, pg = (n) => {
    if (n < 1) return {
      get: () => {
      },
      set: () => {
      }
    };
    let i = 0, l = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
    const c = (d, p) => {
      l.set(d, p), i++, i > n && (i = 0, a = l, l = /* @__PURE__ */ new Map());
    };
    return {
      get(d) {
        let p = l.get(d);
        if (p !== void 0) return p;
        if ((p = a.get(d)) !== void 0) return c(d, p), p;
      },
      set(d, p) {
        l.has(d) ? l.set(d, p) : c(d, p);
      }
    };
  }, Ef = "!", mg = (n) => {
    const { separator: i, experimentalParseClassName: l } = n, a = i.length === 1, c = i[0], d = i.length, p = (m) => {
      const g = [];
      let v = 0, w = 0, C;
      for (let M = 0; M < m.length; M++) {
        let _ = m[M];
        if (v === 0) {
          if (_ === c && (a || m.slice(M, M + d) === i)) {
            g.push(m.slice(w, M)), w = M + d;
            continue;
          }
          if (_ === "/") {
            C = M;
            continue;
          }
        }
        _ === "[" ? v++ : _ === "]" && v--;
      }
      const x = g.length === 0 ? m : m.substring(w), P = x.startsWith(Ef), A = P ? x.substring(1) : x, b = C && C > w ? C - w : void 0;
      return {
        modifiers: g,
        hasImportantModifier: P,
        baseClassName: A,
        maybePostfixModifierPosition: b
      };
    };
    return l ? (m) => l({
      className: m,
      parseClassName: p
    }) : p;
  }, hg = (n) => {
    if (n.length <= 1) return n;
    const i = [];
    let l = [];
    return n.forEach((a) => {
      a[0] === "[" ? (i.push(...l.sort(), a), l = []) : l.push(a);
    }), i.push(...l.sort()), i;
  }, gg = (n) => ({
    cache: pg(n.cacheSize),
    parseClassName: mg(n),
    ...ag(n)
  }), vg = /\s+/, yg = (n, i) => {
    const { parseClassName: l, getClassGroupId: a, getConflictingClassGroupIds: c } = i, d = [], p = n.trim().split(vg);
    let m = "";
    for (let g = p.length - 1; g >= 0; g -= 1) {
      const v = p[g], { modifiers: w, hasImportantModifier: C, baseClassName: x, maybePostfixModifierPosition: P } = l(v);
      let A = !!P, b = a(A ? x.substring(0, P) : x);
      if (!b) {
        if (!A) {
          m = v + (m.length > 0 ? " " + m : m);
          continue;
        }
        if (b = a(x), !b) {
          m = v + (m.length > 0 ? " " + m : m);
          continue;
        }
        A = false;
      }
      const M = hg(w).join(":"), _ = C ? M + Ef : M, W = _ + b;
      if (d.includes(W)) continue;
      d.push(W);
      const U = c(b, A);
      for (let O = 0; O < U.length; ++O) {
        const j = U[O];
        d.push(_ + j);
      }
      m = v + (m.length > 0 ? " " + m : m);
    }
    return m;
  };
  function wg() {
    let n = 0, i, l, a = "";
    for (; n < arguments.length; ) (i = arguments[n++]) && (l = Tf(i)) && (a && (a += " "), a += l);
    return a;
  }
  const Tf = (n) => {
    if (typeof n == "string") return n;
    let i, l = "";
    for (let a = 0; a < n.length; a++) n[a] && (i = Tf(n[a])) && (l && (l += " "), l += i);
    return l;
  };
  function Sg(n, ...i) {
    let l, a, c, d = p;
    function p(g) {
      const v = i.reduce((w, C) => C(w), n());
      return l = gg(v), a = l.cache.get, c = l.cache.set, d = m, m(g);
    }
    function m(g) {
      const v = a(g);
      if (v) return v;
      const w = yg(g, l);
      return c(g, w), w;
    }
    return function() {
      return d(wg.apply(null, arguments));
    };
  }
  const Te = (n) => {
    const i = (l) => l[n] || [];
    return i.isThemeGetter = true, i;
  }, Rf = /^\[(?:([a-z-]+):)?(.+)\]$/i, xg = /^\d+\/\d+$/, kg = /* @__PURE__ */ new Set([
    "px",
    "full",
    "screen"
  ]), Cg = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Pg = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, bg = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Eg = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Tg = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Yt = (n) => yn(n) || kg.has(n) || xg.test(n), vr = (n) => Pn(n, "length", jg), yn = (n) => !!n && !Number.isNaN(Number(n)), ea = (n) => Pn(n, "number", yn), mo = (n) => !!n && Number.isInteger(Number(n)), Rg = (n) => n.endsWith("%") && yn(n.slice(0, -1)), ue = (n) => Rf.test(n), yr = (n) => Cg.test(n), Mg = /* @__PURE__ */ new Set([
    "length",
    "size",
    "percentage"
  ]), Ng = (n) => Pn(n, Mg, Mf), Ag = (n) => Pn(n, "position", Mf), Lg = /* @__PURE__ */ new Set([
    "image",
    "url"
  ]), _g = (n) => Pn(n, Lg, Bg), Og = (n) => Pn(n, "", Dg), ho = () => true, Pn = (n, i, l) => {
    const a = Rf.exec(n);
    return a ? a[1] ? typeof i == "string" ? a[1] === i : i.has(a[1]) : l(a[2]) : false;
  }, jg = (n) => Pg.test(n) && !bg.test(n), Mf = () => false, Dg = (n) => Eg.test(n), Bg = (n) => Tg.test(n), zg = () => {
    const n = Te("colors"), i = Te("spacing"), l = Te("blur"), a = Te("brightness"), c = Te("borderColor"), d = Te("borderRadius"), p = Te("borderSpacing"), m = Te("borderWidth"), g = Te("contrast"), v = Te("grayscale"), w = Te("hueRotate"), C = Te("invert"), x = Te("gap"), P = Te("gradientColorStops"), A = Te("gradientColorStopPositions"), b = Te("inset"), M = Te("margin"), _ = Te("opacity"), W = Te("padding"), U = Te("saturate"), O = Te("scale"), j = Te("sepia"), $ = Te("skew"), D = Te("space"), ee = Te("translate"), X = () => [
      "auto",
      "contain",
      "none"
    ], re = () => [
      "auto",
      "hidden",
      "clip",
      "visible",
      "scroll"
    ], ne = () => [
      "auto",
      ue,
      i
    ], te = () => [
      ue,
      i
    ], ce = () => [
      "",
      Yt,
      vr
    ], pe = () => [
      "auto",
      yn,
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
    ], de = () => [
      "solid",
      "dashed",
      "dotted",
      "double",
      "none"
    ], se = () => [
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
    ], B = () => [
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
    ], T = () => [
      yn,
      ue
    ];
    return {
      cacheSize: 500,
      separator: ":",
      theme: {
        colors: [
          ho
        ],
        spacing: [
          Yt,
          vr
        ],
        blur: [
          "none",
          "",
          yr,
          ue
        ],
        brightness: T(),
        borderColor: [
          n
        ],
        borderRadius: [
          "none",
          "",
          "full",
          yr,
          ue
        ],
        borderSpacing: te(),
        borderWidth: ce(),
        contrast: T(),
        grayscale: K(),
        hueRotate: T(),
        invert: K(),
        gap: te(),
        gradientColorStops: [
          n
        ],
        gradientColorStopPositions: [
          Rg,
          vr
        ],
        inset: ne(),
        margin: ne(),
        opacity: T(),
        padding: te(),
        saturate: T(),
        scale: T(),
        sepia: K(),
        skew: T(),
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
              yr
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
            overflow: re()
          }
        ],
        "overflow-x": [
          {
            "overflow-x": re()
          }
        ],
        "overflow-y": [
          {
            "overflow-y": re()
          }
        ],
        overscroll: [
          {
            overscroll: X()
          }
        ],
        "overscroll-x": [
          {
            "overscroll-x": X()
          }
        ],
        "overscroll-y": [
          {
            "overscroll-y": X()
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
              mo,
              ue
            ]
          }
        ],
        basis: [
          {
            basis: ne()
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
              mo,
              ue
            ]
          }
        ],
        "grid-cols": [
          {
            "grid-cols": [
              ho
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
                  mo,
                  ue
                ]
              },
              ue
            ]
          }
        ],
        "col-start": [
          {
            "col-start": pe()
          }
        ],
        "col-end": [
          {
            "col-end": pe()
          }
        ],
        "grid-rows": [
          {
            "grid-rows": [
              ho
            ]
          }
        ],
        "row-start-end": [
          {
            row: [
              "auto",
              {
                span: [
                  mo,
                  ue
                ]
              },
              ue
            ]
          }
        ],
        "row-start": [
          {
            "row-start": pe()
          }
        ],
        "row-end": [
          {
            "row-end": pe()
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
              x
            ]
          }
        ],
        "gap-x": [
          {
            "gap-x": [
              x
            ]
          }
        ],
        "gap-y": [
          {
            "gap-y": [
              x
            ]
          }
        ],
        "justify-content": [
          {
            justify: [
              "normal",
              ...B()
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
              ...B(),
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
              ...B(),
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
              M
            ]
          }
        ],
        mx: [
          {
            mx: [
              M
            ]
          }
        ],
        my: [
          {
            my: [
              M
            ]
          }
        ],
        ms: [
          {
            ms: [
              M
            ]
          }
        ],
        me: [
          {
            me: [
              M
            ]
          }
        ],
        mt: [
          {
            mt: [
              M
            ]
          }
        ],
        mr: [
          {
            mr: [
              M
            ]
          }
        ],
        mb: [
          {
            mb: [
              M
            ]
          }
        ],
        ml: [
          {
            ml: [
              M
            ]
          }
        ],
        "space-x": [
          {
            "space-x": [
              D
            ]
          }
        ],
        "space-x-reverse": [
          "space-x-reverse"
        ],
        "space-y": [
          {
            "space-y": [
              D
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
                  yr
                ]
              },
              yr
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
              yr,
              vr
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
              ea
            ]
          }
        ],
        "font-family": [
          {
            font: [
              ho
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
              yn,
              ea
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
              Yt,
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
              _
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
              _
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
              ...de(),
              "wavy"
            ]
          }
        ],
        "text-decoration-thickness": [
          {
            decoration: [
              "auto",
              "from-font",
              Yt,
              vr
            ]
          }
        ],
        "underline-offset": [
          {
            "underline-offset": [
              "auto",
              Yt,
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
              _
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
              Ag
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
              Ng
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
              _g
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
              A
            ]
          }
        ],
        "gradient-via-pos": [
          {
            via: [
              A
            ]
          }
        ],
        "gradient-to-pos": [
          {
            to: [
              A
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
              m
            ]
          }
        ],
        "border-w-x": [
          {
            "border-x": [
              m
            ]
          }
        ],
        "border-w-y": [
          {
            "border-y": [
              m
            ]
          }
        ],
        "border-w-s": [
          {
            "border-s": [
              m
            ]
          }
        ],
        "border-w-e": [
          {
            "border-e": [
              m
            ]
          }
        ],
        "border-w-t": [
          {
            "border-t": [
              m
            ]
          }
        ],
        "border-w-r": [
          {
            "border-r": [
              m
            ]
          }
        ],
        "border-w-b": [
          {
            "border-b": [
              m
            ]
          }
        ],
        "border-w-l": [
          {
            "border-l": [
              m
            ]
          }
        ],
        "border-opacity": [
          {
            "border-opacity": [
              _
            ]
          }
        ],
        "border-style": [
          {
            border: [
              ...de(),
              "hidden"
            ]
          }
        ],
        "divide-x": [
          {
            "divide-x": [
              m
            ]
          }
        ],
        "divide-x-reverse": [
          "divide-x-reverse"
        ],
        "divide-y": [
          {
            "divide-y": [
              m
            ]
          }
        ],
        "divide-y-reverse": [
          "divide-y-reverse"
        ],
        "divide-opacity": [
          {
            "divide-opacity": [
              _
            ]
          }
        ],
        "divide-style": [
          {
            divide: de()
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
              ...de()
            ]
          }
        ],
        "outline-offset": [
          {
            "outline-offset": [
              Yt,
              ue
            ]
          }
        ],
        "outline-w": [
          {
            outline: [
              Yt,
              vr
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
            ring: ce()
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
              _
            ]
          }
        ],
        "ring-offset-w": [
          {
            "ring-offset": [
              Yt,
              vr
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
              yr,
              Og
            ]
          }
        ],
        "shadow-color": [
          {
            shadow: [
              ho
            ]
          }
        ],
        opacity: [
          {
            opacity: [
              _
            ]
          }
        ],
        "mix-blend": [
          {
            "mix-blend": [
              ...se(),
              "plus-lighter",
              "plus-darker"
            ]
          }
        ],
        "bg-blend": [
          {
            "bg-blend": se()
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
              yr,
              ue
            ]
          }
        ],
        grayscale: [
          {
            grayscale: [
              v
            ]
          }
        ],
        "hue-rotate": [
          {
            "hue-rotate": [
              w
            ]
          }
        ],
        invert: [
          {
            invert: [
              C
            ]
          }
        ],
        saturate: [
          {
            saturate: [
              U
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
              v
            ]
          }
        ],
        "backdrop-hue-rotate": [
          {
            "backdrop-hue-rotate": [
              w
            ]
          }
        ],
        "backdrop-invert": [
          {
            "backdrop-invert": [
              C
            ]
          }
        ],
        "backdrop-opacity": [
          {
            "backdrop-opacity": [
              _
            ]
          }
        ],
        "backdrop-saturate": [
          {
            "backdrop-saturate": [
              U
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
              p
            ]
          }
        ],
        "border-spacing-x": [
          {
            "border-spacing-x": [
              p
            ]
          }
        ],
        "border-spacing-y": [
          {
            "border-spacing-y": [
              p
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
            duration: T()
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
            delay: T()
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
              mo,
              ue
            ]
          }
        ],
        "translate-x": [
          {
            "translate-x": [
              ee
            ]
          }
        ],
        "translate-y": [
          {
            "translate-y": [
              ee
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
              Yt,
              vr,
              ea
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
  }, Fg = Sg(zg);
  function Ir(...n) {
    return Fg(ya(n));
  }
  const Ig = sg("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
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
  }), He = h.forwardRef(({ className: n, variant: i, size: l, asChild: a = false, ...c }, d) => {
    const p = a ? Qi : "button";
    return S.jsx(p, {
      className: Ir(Ig({
        variant: i,
        size: l,
        className: n
      })),
      ref: d,
      ...c
    });
  });
  He.displayName = "Button";
  const go = h.forwardRef(({ className: n, type: i, ...l }, a) => S.jsx("input", {
    type: i,
    className: Ir("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", n),
    ref: a,
    ...l
  }));
  go.displayName = "Input";
  function Wg({ onJoin: n, onCreate: i, name: l, onSetName: a }) {
    const [c, d] = h.useState(() => {
      const v = new URL(document.location.toString()).searchParams.get("ticket");
      return (v == null ? void 0 : v.startsWith("chat")) ? v : "";
    }), p = (g) => {
      g.preventDefault(), c.trim() && n(c.trim());
    }, m = (g) => {
      g.preventDefault(), i();
    };
    return S.jsx("div", {
      className: "flex flex-col items-center justify-center flex-grow p-4",
      children: S.jsxs("div", {
        className: "w-full max-w-md space-y-4",
        children: [
          S.jsxs("div", {
            children: [
              S.jsx("h2", {
                className: "text-lg font-semibold mb-2",
                children: "Your name"
              }),
              S.jsx("div", {
                className: "flex space-x-2",
                children: S.jsx(go, {
                  value: l,
                  onChange: (g) => a(g.target.value),
                  placeholder: "Enter your name"
                })
              })
            ]
          }),
          l.length && S.jsxs(S.Fragment, {
            children: [
              S.jsxs("form", {
                onSubmit: p,
                children: [
                  S.jsx("h2", {
                    className: "text-lg font-semibold mb-2",
                    children: "Join Channel"
                  }),
                  S.jsxs("div", {
                    className: "flex space-x-2",
                    children: [
                      S.jsx(go, {
                        value: c,
                        onChange: (g) => d(g.target.value),
                        placeholder: "Enter ticket"
                      }),
                      S.jsx(He, {
                        type: "submit",
                        children: "Join"
                      })
                    ]
                  })
                ]
              }),
              S.jsxs("form", {
                onSubmit: m,
                children: [
                  S.jsx("h2", {
                    className: "text-lg font-semibold mb-2",
                    children: "Create Channel"
                  }),
                  S.jsx("div", {
                    className: "flex space-x-2",
                    children: S.jsx(He, {
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
  var Sa = kf();
  const Hg = xf(Sa);
  var Ug = [
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
  ], Qe = Ug.reduce((n, i) => {
    const l = h.forwardRef((a, c) => {
      const { asChild: d, ...p } = a, m = d ? Qi : i;
      return typeof window < "u" && (window[Symbol.for("radix-ui")] = true), S.jsx(m, {
        ...p,
        ref: c
      });
    });
    return l.displayName = `Primitive.${i}`, {
      ...n,
      [i]: l
    };
  }, {});
  function Vg(n, i) {
    n && Sa.flushSync(() => n.dispatchEvent(i));
  }
  var xr = (globalThis == null ? void 0 : globalThis.document) ? h.useLayoutEffect : () => {
  };
  function $g(n, i) {
    return h.useReducer((l, a) => i[l][a] ?? l, n);
  }
  var br = (n) => {
    const { present: i, children: l } = n, a = Gg(i), c = typeof l == "function" ? l({
      present: a.isPresent
    }) : h.Children.only(l), d = Ze(a.ref, Kg(c));
    return typeof l == "function" || a.isPresent ? h.cloneElement(c, {
      ref: d
    }) : null;
  };
  br.displayName = "Presence";
  function Gg(n) {
    const [i, l] = h.useState(), a = h.useRef({}), c = h.useRef(n), d = h.useRef("none"), p = n ? "mounted" : "unmounted", [m, g] = $g(p, {
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
      const v = Li(a.current);
      d.current = m === "mounted" ? v : "none";
    }, [
      m
    ]), xr(() => {
      const v = a.current, w = c.current;
      if (w !== n) {
        const x = d.current, P = Li(v);
        n ? g("MOUNT") : P === "none" || (v == null ? void 0 : v.display) === "none" ? g("UNMOUNT") : g(w && x !== P ? "ANIMATION_OUT" : "UNMOUNT"), c.current = n;
      }
    }, [
      n,
      g
    ]), xr(() => {
      if (i) {
        let v;
        const w = i.ownerDocument.defaultView ?? window, C = (P) => {
          const b = Li(a.current).includes(P.animationName);
          if (P.target === i && b && (g("ANIMATION_END"), !c.current)) {
            const M = i.style.animationFillMode;
            i.style.animationFillMode = "forwards", v = w.setTimeout(() => {
              i.style.animationFillMode === "forwards" && (i.style.animationFillMode = M);
            });
          }
        }, x = (P) => {
          P.target === i && (d.current = Li(a.current));
        };
        return i.addEventListener("animationstart", x), i.addEventListener("animationcancel", C), i.addEventListener("animationend", C), () => {
          w.clearTimeout(v), i.removeEventListener("animationstart", x), i.removeEventListener("animationcancel", C), i.removeEventListener("animationend", C);
        };
      } else g("ANIMATION_END");
    }, [
      i,
      g
    ]), {
      isPresent: [
        "mounted",
        "unmountSuspended"
      ].includes(m),
      ref: h.useCallback((v) => {
        v && (a.current = getComputedStyle(v)), l(v);
      }, [])
    };
  }
  function Li(n) {
    return (n == null ? void 0 : n.animationName) || "none";
  }
  function Kg(n) {
    var _a2, _b;
    let i = (_a2 = Object.getOwnPropertyDescriptor(n.props, "ref")) == null ? void 0 : _a2.get, l = i && "isReactWarning" in i && i.isReactWarning;
    return l ? n.ref : (i = (_b = Object.getOwnPropertyDescriptor(n, "ref")) == null ? void 0 : _b.get, l = i && "isReactWarning" in i && i.isReactWarning, l ? n.props.ref : n.props.ref || n.ref);
  }
  function Yi(n, i = []) {
    let l = [];
    function a(d, p) {
      const m = h.createContext(p), g = l.length;
      l = [
        ...l,
        p
      ];
      const v = (C) => {
        var _a2;
        const { scope: x, children: P, ...A } = C, b = ((_a2 = x == null ? void 0 : x[n]) == null ? void 0 : _a2[g]) || m, M = h.useMemo(() => A, Object.values(A));
        return S.jsx(b.Provider, {
          value: M,
          children: P
        });
      };
      v.displayName = d + "Provider";
      function w(C, x) {
        var _a2;
        const P = ((_a2 = x == null ? void 0 : x[n]) == null ? void 0 : _a2[g]) || m, A = h.useContext(P);
        if (A) return A;
        if (p !== void 0) return p;
        throw new Error(`\`${C}\` must be used within \`${d}\``);
      }
      return [
        v,
        w
      ];
    }
    const c = () => {
      const d = l.map((p) => h.createContext(p));
      return function(m) {
        const g = (m == null ? void 0 : m[n]) || d;
        return h.useMemo(() => ({
          [`__scope${n}`]: {
            ...m,
            [n]: g
          }
        }), [
          m,
          g
        ]);
      };
    };
    return c.scopeName = n, [
      a,
      Qg(c, ...i)
    ];
  }
  function Qg(...n) {
    const i = n[0];
    if (n.length === 1) return i;
    const l = () => {
      const a = n.map((c) => ({
        useScope: c(),
        scopeName: c.scopeName
      }));
      return function(d) {
        const p = a.reduce((m, { useScope: g, scopeName: v }) => {
          const C = g(d)[`__scope${v}`];
          return {
            ...m,
            ...C
          };
        }, {});
        return h.useMemo(() => ({
          [`__scope${i.scopeName}`]: p
        }), [
          p
        ]);
      };
    };
    return l.scopeName = i.scopeName, l;
  }
  function Je(n) {
    const i = h.useRef(n);
    return h.useEffect(() => {
      i.current = n;
    }), h.useMemo(() => (...l) => {
      var _a2;
      return (_a2 = i.current) == null ? void 0 : _a2.call(i, ...l);
    }, []);
  }
  var Yg = h.createContext(void 0);
  function Xg(n) {
    const i = h.useContext(Yg);
    return n || i || "ltr";
  }
  function qg(n, [i, l]) {
    return Math.min(l, Math.max(i, n));
  }
  function Ue(n, i, { checkForDefaultPrevented: l = true } = {}) {
    return function(c) {
      if (n == null ? void 0 : n(c), l === false || !c.defaultPrevented) return i == null ? void 0 : i(c);
    };
  }
  function Jg(n, i) {
    return h.useReducer((l, a) => i[l][a] ?? l, n);
  }
  var xa = "ScrollArea", [Nf, _0] = Yi(xa), [Zg, wt] = Nf(xa), Af = h.forwardRef((n, i) => {
    const { __scopeScrollArea: l, type: a = "hover", dir: c, scrollHideDelay: d = 600, ...p } = n, [m, g] = h.useState(null), [v, w] = h.useState(null), [C, x] = h.useState(null), [P, A] = h.useState(null), [b, M] = h.useState(null), [_, W] = h.useState(0), [U, O] = h.useState(0), [j, $] = h.useState(false), [D, ee] = h.useState(false), X = Ze(i, (ne) => g(ne)), re = Xg(c);
    return S.jsx(Zg, {
      scope: l,
      type: a,
      dir: re,
      scrollHideDelay: d,
      scrollArea: m,
      viewport: v,
      onViewportChange: w,
      content: C,
      onContentChange: x,
      scrollbarX: P,
      onScrollbarXChange: A,
      scrollbarXEnabled: j,
      onScrollbarXEnabledChange: $,
      scrollbarY: b,
      onScrollbarYChange: M,
      scrollbarYEnabled: D,
      onScrollbarYEnabledChange: ee,
      onCornerWidthChange: W,
      onCornerHeightChange: O,
      children: S.jsx(Qe.div, {
        dir: re,
        ...p,
        ref: X,
        style: {
          position: "relative",
          "--radix-scroll-area-corner-width": _ + "px",
          "--radix-scroll-area-corner-height": U + "px",
          ...n.style
        }
      })
    });
  });
  Af.displayName = xa;
  var Lf = "ScrollAreaViewport", _f = h.forwardRef((n, i) => {
    const { __scopeScrollArea: l, children: a, nonce: c, ...d } = n, p = wt(Lf, l), m = h.useRef(null), g = Ze(i, m, p.onViewportChange);
    return S.jsxs(S.Fragment, {
      children: [
        S.jsx("style", {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: c
        }),
        S.jsx(Qe.div, {
          "data-radix-scroll-area-viewport": "",
          ...d,
          ref: g,
          style: {
            overflowX: p.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: p.scrollbarYEnabled ? "scroll" : "hidden",
            ...n.style
          },
          children: S.jsx("div", {
            ref: p.onContentChange,
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
  _f.displayName = Lf;
  var zt = "ScrollAreaScrollbar", ka = h.forwardRef((n, i) => {
    const { forceMount: l, ...a } = n, c = wt(zt, n.__scopeScrollArea), { onScrollbarXEnabledChange: d, onScrollbarYEnabledChange: p } = c, m = n.orientation === "horizontal";
    return h.useEffect(() => (m ? d(true) : p(true), () => {
      m ? d(false) : p(false);
    }), [
      m,
      d,
      p
    ]), c.type === "hover" ? S.jsx(ev, {
      ...a,
      ref: i,
      forceMount: l
    }) : c.type === "scroll" ? S.jsx(tv, {
      ...a,
      ref: i,
      forceMount: l
    }) : c.type === "auto" ? S.jsx(Of, {
      ...a,
      ref: i,
      forceMount: l
    }) : c.type === "always" ? S.jsx(Ca, {
      ...a,
      ref: i
    }) : null;
  });
  ka.displayName = zt;
  var ev = h.forwardRef((n, i) => {
    const { forceMount: l, ...a } = n, c = wt(zt, n.__scopeScrollArea), [d, p] = h.useState(false);
    return h.useEffect(() => {
      const m = c.scrollArea;
      let g = 0;
      if (m) {
        const v = () => {
          window.clearTimeout(g), p(true);
        }, w = () => {
          g = window.setTimeout(() => p(false), c.scrollHideDelay);
        };
        return m.addEventListener("pointerenter", v), m.addEventListener("pointerleave", w), () => {
          window.clearTimeout(g), m.removeEventListener("pointerenter", v), m.removeEventListener("pointerleave", w);
        };
      }
    }, [
      c.scrollArea,
      c.scrollHideDelay
    ]), S.jsx(br, {
      present: l || d,
      children: S.jsx(Of, {
        "data-state": d ? "visible" : "hidden",
        ...a,
        ref: i
      })
    });
  }), tv = h.forwardRef((n, i) => {
    const { forceMount: l, ...a } = n, c = wt(zt, n.__scopeScrollArea), d = n.orientation === "horizontal", p = qi(() => g("SCROLL_END"), 100), [m, g] = Jg("hidden", {
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
      if (m === "idle") {
        const v = window.setTimeout(() => g("HIDE"), c.scrollHideDelay);
        return () => window.clearTimeout(v);
      }
    }, [
      m,
      c.scrollHideDelay,
      g
    ]), h.useEffect(() => {
      const v = c.viewport, w = d ? "scrollLeft" : "scrollTop";
      if (v) {
        let C = v[w];
        const x = () => {
          const P = v[w];
          C !== P && (g("SCROLL"), p()), C = P;
        };
        return v.addEventListener("scroll", x), () => v.removeEventListener("scroll", x);
      }
    }, [
      c.viewport,
      d,
      g,
      p
    ]), S.jsx(br, {
      present: l || m !== "hidden",
      children: S.jsx(Ca, {
        "data-state": m === "hidden" ? "hidden" : "visible",
        ...a,
        ref: i,
        onPointerEnter: Ue(n.onPointerEnter, () => g("POINTER_ENTER")),
        onPointerLeave: Ue(n.onPointerLeave, () => g("POINTER_LEAVE"))
      })
    });
  }), Of = h.forwardRef((n, i) => {
    const l = wt(zt, n.__scopeScrollArea), { forceMount: a, ...c } = n, [d, p] = h.useState(false), m = n.orientation === "horizontal", g = qi(() => {
      if (l.viewport) {
        const v = l.viewport.offsetWidth < l.viewport.scrollWidth, w = l.viewport.offsetHeight < l.viewport.scrollHeight;
        p(m ? v : w);
      }
    }, 10);
    return xn(l.viewport, g), xn(l.content, g), S.jsx(br, {
      present: a || d,
      children: S.jsx(Ca, {
        "data-state": d ? "visible" : "hidden",
        ...c,
        ref: i
      })
    });
  }), Ca = h.forwardRef((n, i) => {
    const { orientation: l = "vertical", ...a } = n, c = wt(zt, n.__scopeScrollArea), d = h.useRef(null), p = h.useRef(0), [m, g] = h.useState({
      content: 0,
      viewport: 0,
      scrollbar: {
        size: 0,
        paddingStart: 0,
        paddingEnd: 0
      }
    }), v = Ff(m.viewport, m.content), w = {
      ...a,
      sizes: m,
      onSizesChange: g,
      hasThumb: v > 0 && v < 1,
      onThumbChange: (x) => d.current = x,
      onThumbPointerUp: () => p.current = 0,
      onThumbPointerDown: (x) => p.current = x
    };
    function C(x, P) {
      return sv(x, p.current, m, P);
    }
    return l === "horizontal" ? S.jsx(rv, {
      ...w,
      ref: i,
      onThumbPositionChange: () => {
        if (c.viewport && d.current) {
          const x = c.viewport.scrollLeft, P = $d(x, m, c.dir);
          d.current.style.transform = `translate3d(${P}px, 0, 0)`;
        }
      },
      onWheelScroll: (x) => {
        c.viewport && (c.viewport.scrollLeft = x);
      },
      onDragScroll: (x) => {
        c.viewport && (c.viewport.scrollLeft = C(x, c.dir));
      }
    }) : l === "vertical" ? S.jsx(nv, {
      ...w,
      ref: i,
      onThumbPositionChange: () => {
        if (c.viewport && d.current) {
          const x = c.viewport.scrollTop, P = $d(x, m);
          d.current.style.transform = `translate3d(0, ${P}px, 0)`;
        }
      },
      onWheelScroll: (x) => {
        c.viewport && (c.viewport.scrollTop = x);
      },
      onDragScroll: (x) => {
        c.viewport && (c.viewport.scrollTop = C(x));
      }
    }) : null;
  }), rv = h.forwardRef((n, i) => {
    const { sizes: l, onSizesChange: a, ...c } = n, d = wt(zt, n.__scopeScrollArea), [p, m] = h.useState(), g = h.useRef(null), v = Ze(i, g, d.onScrollbarXChange);
    return h.useEffect(() => {
      g.current && m(getComputedStyle(g.current));
    }, [
      g
    ]), S.jsx(Df, {
      "data-orientation": "horizontal",
      ...c,
      ref: v,
      sizes: l,
      style: {
        bottom: 0,
        left: d.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: d.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": Xi(l) + "px",
        ...n.style
      },
      onThumbPointerDown: (w) => n.onThumbPointerDown(w.x),
      onDragScroll: (w) => n.onDragScroll(w.x),
      onWheelScroll: (w, C) => {
        if (d.viewport) {
          const x = d.viewport.scrollLeft + w.deltaX;
          n.onWheelScroll(x), Wf(x, C) && w.preventDefault();
        }
      },
      onResize: () => {
        g.current && d.viewport && p && a({
          content: d.viewport.scrollWidth,
          viewport: d.viewport.offsetWidth,
          scrollbar: {
            size: g.current.clientWidth,
            paddingStart: Ui(p.paddingLeft),
            paddingEnd: Ui(p.paddingRight)
          }
        });
      }
    });
  }), nv = h.forwardRef((n, i) => {
    const { sizes: l, onSizesChange: a, ...c } = n, d = wt(zt, n.__scopeScrollArea), [p, m] = h.useState(), g = h.useRef(null), v = Ze(i, g, d.onScrollbarYChange);
    return h.useEffect(() => {
      g.current && m(getComputedStyle(g.current));
    }, [
      g
    ]), S.jsx(Df, {
      "data-orientation": "vertical",
      ...c,
      ref: v,
      sizes: l,
      style: {
        top: 0,
        right: d.dir === "ltr" ? 0 : void 0,
        left: d.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": Xi(l) + "px",
        ...n.style
      },
      onThumbPointerDown: (w) => n.onThumbPointerDown(w.y),
      onDragScroll: (w) => n.onDragScroll(w.y),
      onWheelScroll: (w, C) => {
        if (d.viewport) {
          const x = d.viewport.scrollTop + w.deltaY;
          n.onWheelScroll(x), Wf(x, C) && w.preventDefault();
        }
      },
      onResize: () => {
        g.current && d.viewport && p && a({
          content: d.viewport.scrollHeight,
          viewport: d.viewport.offsetHeight,
          scrollbar: {
            size: g.current.clientHeight,
            paddingStart: Ui(p.paddingTop),
            paddingEnd: Ui(p.paddingBottom)
          }
        });
      }
    });
  }), [ov, jf] = Nf(zt), Df = h.forwardRef((n, i) => {
    const { __scopeScrollArea: l, sizes: a, hasThumb: c, onThumbChange: d, onThumbPointerUp: p, onThumbPointerDown: m, onThumbPositionChange: g, onDragScroll: v, onWheelScroll: w, onResize: C, ...x } = n, P = wt(zt, l), [A, b] = h.useState(null), M = Ze(i, (X) => b(X)), _ = h.useRef(null), W = h.useRef(""), U = P.viewport, O = a.content - a.viewport, j = Je(w), $ = Je(g), D = qi(C, 10);
    function ee(X) {
      if (_.current) {
        const re = X.clientX - _.current.left, ne = X.clientY - _.current.top;
        v({
          x: re,
          y: ne
        });
      }
    }
    return h.useEffect(() => {
      const X = (re) => {
        const ne = re.target;
        (A == null ? void 0 : A.contains(ne)) && j(re, O);
      };
      return document.addEventListener("wheel", X, {
        passive: false
      }), () => document.removeEventListener("wheel", X, {
        passive: false
      });
    }, [
      U,
      A,
      O,
      j
    ]), h.useEffect($, [
      a,
      $
    ]), xn(A, D), xn(P.content, D), S.jsx(ov, {
      scope: l,
      scrollbar: A,
      hasThumb: c,
      onThumbChange: Je(d),
      onThumbPointerUp: Je(p),
      onThumbPositionChange: $,
      onThumbPointerDown: Je(m),
      children: S.jsx(Qe.div, {
        ...x,
        ref: M,
        style: {
          position: "absolute",
          ...x.style
        },
        onPointerDown: Ue(n.onPointerDown, (X) => {
          X.button === 0 && (X.target.setPointerCapture(X.pointerId), _.current = A.getBoundingClientRect(), W.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", P.viewport && (P.viewport.style.scrollBehavior = "auto"), ee(X));
        }),
        onPointerMove: Ue(n.onPointerMove, ee),
        onPointerUp: Ue(n.onPointerUp, (X) => {
          const re = X.target;
          re.hasPointerCapture(X.pointerId) && re.releasePointerCapture(X.pointerId), document.body.style.webkitUserSelect = W.current, P.viewport && (P.viewport.style.scrollBehavior = ""), _.current = null;
        })
      })
    });
  }), Hi = "ScrollAreaThumb", Bf = h.forwardRef((n, i) => {
    const { forceMount: l, ...a } = n, c = jf(Hi, n.__scopeScrollArea);
    return S.jsx(br, {
      present: l || c.hasThumb,
      children: S.jsx(iv, {
        ref: i,
        ...a
      })
    });
  }), iv = h.forwardRef((n, i) => {
    const { __scopeScrollArea: l, style: a, ...c } = n, d = wt(Hi, l), p = jf(Hi, l), { onThumbPositionChange: m } = p, g = Ze(i, (C) => p.onThumbChange(C)), v = h.useRef(void 0), w = qi(() => {
      v.current && (v.current(), v.current = void 0);
    }, 100);
    return h.useEffect(() => {
      const C = d.viewport;
      if (C) {
        const x = () => {
          if (w(), !v.current) {
            const P = av(C, m);
            v.current = P, m();
          }
        };
        return m(), C.addEventListener("scroll", x), () => C.removeEventListener("scroll", x);
      }
    }, [
      d.viewport,
      w,
      m
    ]), S.jsx(Qe.div, {
      "data-state": p.hasThumb ? "visible" : "hidden",
      ...c,
      ref: g,
      style: {
        width: "var(--radix-scroll-area-thumb-width)",
        height: "var(--radix-scroll-area-thumb-height)",
        ...a
      },
      onPointerDownCapture: Ue(n.onPointerDownCapture, (C) => {
        const P = C.target.getBoundingClientRect(), A = C.clientX - P.left, b = C.clientY - P.top;
        p.onThumbPointerDown({
          x: A,
          y: b
        });
      }),
      onPointerUp: Ue(n.onPointerUp, p.onThumbPointerUp)
    });
  });
  Bf.displayName = Hi;
  var Pa = "ScrollAreaCorner", zf = h.forwardRef((n, i) => {
    const l = wt(Pa, n.__scopeScrollArea), a = !!(l.scrollbarX && l.scrollbarY);
    return l.type !== "scroll" && a ? S.jsx(lv, {
      ...n,
      ref: i
    }) : null;
  });
  zf.displayName = Pa;
  var lv = h.forwardRef((n, i) => {
    const { __scopeScrollArea: l, ...a } = n, c = wt(Pa, l), [d, p] = h.useState(0), [m, g] = h.useState(0), v = !!(d && m);
    return xn(c.scrollbarX, () => {
      var _a2;
      const w = ((_a2 = c.scrollbarX) == null ? void 0 : _a2.offsetHeight) || 0;
      c.onCornerHeightChange(w), g(w);
    }), xn(c.scrollbarY, () => {
      var _a2;
      const w = ((_a2 = c.scrollbarY) == null ? void 0 : _a2.offsetWidth) || 0;
      c.onCornerWidthChange(w), p(w);
    }), v ? S.jsx(Qe.div, {
      ...a,
      ref: i,
      style: {
        width: d,
        height: m,
        position: "absolute",
        right: c.dir === "ltr" ? 0 : void 0,
        left: c.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...n.style
      }
    }) : null;
  });
  function Ui(n) {
    return n ? parseInt(n, 10) : 0;
  }
  function Ff(n, i) {
    const l = n / i;
    return isNaN(l) ? 0 : l;
  }
  function Xi(n) {
    const i = Ff(n.viewport, n.content), l = n.scrollbar.paddingStart + n.scrollbar.paddingEnd, a = (n.scrollbar.size - l) * i;
    return Math.max(a, 18);
  }
  function sv(n, i, l, a = "ltr") {
    const c = Xi(l), d = c / 2, p = i || d, m = c - p, g = l.scrollbar.paddingStart + p, v = l.scrollbar.size - l.scrollbar.paddingEnd - m, w = l.content - l.viewport, C = a === "ltr" ? [
      0,
      w
    ] : [
      w * -1,
      0
    ];
    return If([
      g,
      v
    ], C)(n);
  }
  function $d(n, i, l = "ltr") {
    const a = Xi(i), c = i.scrollbar.paddingStart + i.scrollbar.paddingEnd, d = i.scrollbar.size - c, p = i.content - i.viewport, m = d - a, g = l === "ltr" ? [
      0,
      p
    ] : [
      p * -1,
      0
    ], v = qg(n, g);
    return If([
      0,
      p
    ], [
      0,
      m
    ])(v);
  }
  function If(n, i) {
    return (l) => {
      if (n[0] === n[1] || i[0] === i[1]) return i[0];
      const a = (i[1] - i[0]) / (n[1] - n[0]);
      return i[0] + a * (l - n[0]);
    };
  }
  function Wf(n, i) {
    return n > 0 && n < i;
  }
  var av = (n, i = () => {
  }) => {
    let l = {
      left: n.scrollLeft,
      top: n.scrollTop
    }, a = 0;
    return function c() {
      const d = {
        left: n.scrollLeft,
        top: n.scrollTop
      }, p = l.left !== d.left, m = l.top !== d.top;
      (p || m) && i(), l = d, a = window.requestAnimationFrame(c);
    }(), () => window.cancelAnimationFrame(a);
  };
  function qi(n, i) {
    const l = Je(n), a = h.useRef(0);
    return h.useEffect(() => () => window.clearTimeout(a.current), []), h.useCallback(() => {
      window.clearTimeout(a.current), a.current = window.setTimeout(l, i);
    }, [
      l,
      i
    ]);
  }
  function xn(n, i) {
    const l = Je(i);
    xr(() => {
      let a = 0;
      if (n) {
        const c = new ResizeObserver(() => {
          cancelAnimationFrame(a), a = window.requestAnimationFrame(l);
        });
        return c.observe(n), () => {
          window.cancelAnimationFrame(a), c.unobserve(n);
        };
      }
    }, [
      n,
      l
    ]);
  }
  var Hf = Af, uv = _f, cv = zf;
  const vo = h.forwardRef(({ className: n, children: i, ...l }, a) => S.jsxs(Hf, {
    ref: a,
    className: Ir("relative overflow-hidden", n),
    ...l,
    children: [
      S.jsx(uv, {
        className: "h-full w-full rounded-[inherit]",
        children: i
      }),
      S.jsx(Uf, {}),
      S.jsx(cv, {})
    ]
  }));
  vo.displayName = Hf.displayName;
  const Uf = h.forwardRef(({ className: n, orientation: i = "vertical", ...l }, a) => S.jsx(ka, {
    ref: a,
    orientation: i,
    className: Ir("flex touch-none select-none transition-colors", i === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", i === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", n),
    ...l,
    children: S.jsx(Bf, {
      className: "relative flex-1 rounded-full bg-border"
    })
  }));
  Uf.displayName = ka.displayName;
  function dv(n, i = globalThis == null ? void 0 : globalThis.document) {
    const l = Je(n);
    h.useEffect(() => {
      const a = (c) => {
        c.key === "Escape" && l(c);
      };
      return i.addEventListener("keydown", a, {
        capture: true
      }), () => i.removeEventListener("keydown", a, {
        capture: true
      });
    }, [
      l,
      i
    ]);
  }
  var fv = "DismissableLayer", fa = "dismissableLayer.update", pv = "dismissableLayer.pointerDownOutside", mv = "dismissableLayer.focusOutside", Gd, Vf = h.createContext({
    layers: /* @__PURE__ */ new Set(),
    layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
    branches: /* @__PURE__ */ new Set()
  }), $f = h.forwardRef((n, i) => {
    const { disableOutsidePointerEvents: l = false, onEscapeKeyDown: a, onPointerDownOutside: c, onFocusOutside: d, onInteractOutside: p, onDismiss: m, ...g } = n, v = h.useContext(Vf), [w, C] = h.useState(null), x = (w == null ? void 0 : w.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, P] = h.useState({}), A = Ze(i, (D) => C(D)), b = Array.from(v.layers), [M] = [
      ...v.layersWithOutsidePointerEventsDisabled
    ].slice(-1), _ = b.indexOf(M), W = w ? b.indexOf(w) : -1, U = v.layersWithOutsidePointerEventsDisabled.size > 0, O = W >= _, j = vv((D) => {
      const ee = D.target, X = [
        ...v.branches
      ].some((re) => re.contains(ee));
      !O || X || (c == null ? void 0 : c(D), p == null ? void 0 : p(D), D.defaultPrevented || (m == null ? void 0 : m()));
    }, x), $ = yv((D) => {
      const ee = D.target;
      [
        ...v.branches
      ].some((re) => re.contains(ee)) || (d == null ? void 0 : d(D), p == null ? void 0 : p(D), D.defaultPrevented || (m == null ? void 0 : m()));
    }, x);
    return dv((D) => {
      W === v.layers.size - 1 && (a == null ? void 0 : a(D), !D.defaultPrevented && m && (D.preventDefault(), m()));
    }, x), h.useEffect(() => {
      if (w) return l && (v.layersWithOutsidePointerEventsDisabled.size === 0 && (Gd = x.body.style.pointerEvents, x.body.style.pointerEvents = "none"), v.layersWithOutsidePointerEventsDisabled.add(w)), v.layers.add(w), Kd(), () => {
        l && v.layersWithOutsidePointerEventsDisabled.size === 1 && (x.body.style.pointerEvents = Gd);
      };
    }, [
      w,
      x,
      l,
      v
    ]), h.useEffect(() => () => {
      w && (v.layers.delete(w), v.layersWithOutsidePointerEventsDisabled.delete(w), Kd());
    }, [
      w,
      v
    ]), h.useEffect(() => {
      const D = () => P({});
      return document.addEventListener(fa, D), () => document.removeEventListener(fa, D);
    }, []), S.jsx(Qe.div, {
      ...g,
      ref: A,
      style: {
        pointerEvents: U ? O ? "auto" : "none" : void 0,
        ...n.style
      },
      onFocusCapture: Ue(n.onFocusCapture, $.onFocusCapture),
      onBlurCapture: Ue(n.onBlurCapture, $.onBlurCapture),
      onPointerDownCapture: Ue(n.onPointerDownCapture, j.onPointerDownCapture)
    });
  });
  $f.displayName = fv;
  var hv = "DismissableLayerBranch", gv = h.forwardRef((n, i) => {
    const l = h.useContext(Vf), a = h.useRef(null), c = Ze(i, a);
    return h.useEffect(() => {
      const d = a.current;
      if (d) return l.branches.add(d), () => {
        l.branches.delete(d);
      };
    }, [
      l.branches
    ]), S.jsx(Qe.div, {
      ...n,
      ref: c
    });
  });
  gv.displayName = hv;
  function vv(n, i = globalThis == null ? void 0 : globalThis.document) {
    const l = Je(n), a = h.useRef(false), c = h.useRef(() => {
    });
    return h.useEffect(() => {
      const d = (m) => {
        if (m.target && !a.current) {
          let g = function() {
            Gf(pv, l, v, {
              discrete: true
            });
          };
          const v = {
            originalEvent: m
          };
          m.pointerType === "touch" ? (i.removeEventListener("click", c.current), c.current = g, i.addEventListener("click", c.current, {
            once: true
          })) : g();
        } else i.removeEventListener("click", c.current);
        a.current = false;
      }, p = window.setTimeout(() => {
        i.addEventListener("pointerdown", d);
      }, 0);
      return () => {
        window.clearTimeout(p), i.removeEventListener("pointerdown", d), i.removeEventListener("click", c.current);
      };
    }, [
      i,
      l
    ]), {
      onPointerDownCapture: () => a.current = true
    };
  }
  function yv(n, i = globalThis == null ? void 0 : globalThis.document) {
    const l = Je(n), a = h.useRef(false);
    return h.useEffect(() => {
      const c = (d) => {
        d.target && !a.current && Gf(mv, l, {
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
      onFocusCapture: () => a.current = true,
      onBlurCapture: () => a.current = false
    };
  }
  function Kd() {
    const n = new CustomEvent(fa);
    document.dispatchEvent(n);
  }
  function Gf(n, i, l, { discrete: a }) {
    const c = l.originalEvent.target, d = new CustomEvent(n, {
      bubbles: false,
      cancelable: true,
      detail: l
    });
    i && c.addEventListener(n, i, {
      once: true
    }), a ? Vg(c, d) : c.dispatchEvent(d);
  }
  var ta = 0;
  function wv() {
    h.useEffect(() => {
      const n = document.querySelectorAll("[data-radix-focus-guard]");
      return document.body.insertAdjacentElement("afterbegin", n[0] ?? Qd()), document.body.insertAdjacentElement("beforeend", n[1] ?? Qd()), ta++, () => {
        ta === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((i) => i.remove()), ta--;
      };
    }, []);
  }
  function Qd() {
    const n = document.createElement("span");
    return n.setAttribute("data-radix-focus-guard", ""), n.tabIndex = 0, n.style.outline = "none", n.style.opacity = "0", n.style.position = "fixed", n.style.pointerEvents = "none", n;
  }
  var ra = "focusScope.autoFocusOnMount", na = "focusScope.autoFocusOnUnmount", Yd = {
    bubbles: false,
    cancelable: true
  }, Sv = "FocusScope", Kf = h.forwardRef((n, i) => {
    const { loop: l = false, trapped: a = false, onMountAutoFocus: c, onUnmountAutoFocus: d, ...p } = n, [m, g] = h.useState(null), v = Je(c), w = Je(d), C = h.useRef(null), x = Ze(i, (b) => g(b)), P = h.useRef({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    }).current;
    h.useEffect(() => {
      if (a) {
        let b = function(U) {
          if (P.paused || !m) return;
          const O = U.target;
          m.contains(O) ? C.current = O : wr(C.current, {
            select: true
          });
        }, M = function(U) {
          if (P.paused || !m) return;
          const O = U.relatedTarget;
          O !== null && (m.contains(O) || wr(C.current, {
            select: true
          }));
        }, _ = function(U) {
          if (document.activeElement === document.body) for (const j of U) j.removedNodes.length > 0 && wr(m);
        };
        document.addEventListener("focusin", b), document.addEventListener("focusout", M);
        const W = new MutationObserver(_);
        return m && W.observe(m, {
          childList: true,
          subtree: true
        }), () => {
          document.removeEventListener("focusin", b), document.removeEventListener("focusout", M), W.disconnect();
        };
      }
    }, [
      a,
      m,
      P.paused
    ]), h.useEffect(() => {
      if (m) {
        qd.add(P);
        const b = document.activeElement;
        if (!m.contains(b)) {
          const _ = new CustomEvent(ra, Yd);
          m.addEventListener(ra, v), m.dispatchEvent(_), _.defaultPrevented || (xv(Ev(Qf(m)), {
            select: true
          }), document.activeElement === b && wr(m));
        }
        return () => {
          m.removeEventListener(ra, v), setTimeout(() => {
            const _ = new CustomEvent(na, Yd);
            m.addEventListener(na, w), m.dispatchEvent(_), _.defaultPrevented || wr(b ?? document.body, {
              select: true
            }), m.removeEventListener(na, w), qd.remove(P);
          }, 0);
        };
      }
    }, [
      m,
      v,
      w,
      P
    ]);
    const A = h.useCallback((b) => {
      if (!l && !a || P.paused) return;
      const M = b.key === "Tab" && !b.altKey && !b.ctrlKey && !b.metaKey, _ = document.activeElement;
      if (M && _) {
        const W = b.currentTarget, [U, O] = kv(W);
        U && O ? !b.shiftKey && _ === O ? (b.preventDefault(), l && wr(U, {
          select: true
        })) : b.shiftKey && _ === U && (b.preventDefault(), l && wr(O, {
          select: true
        })) : _ === W && b.preventDefault();
      }
    }, [
      l,
      a,
      P.paused
    ]);
    return S.jsx(Qe.div, {
      tabIndex: -1,
      ...p,
      ref: x,
      onKeyDown: A
    });
  });
  Kf.displayName = Sv;
  function xv(n, { select: i = false } = {}) {
    const l = document.activeElement;
    for (const a of n) if (wr(a, {
      select: i
    }), document.activeElement !== l) return;
  }
  function kv(n) {
    const i = Qf(n), l = Xd(i, n), a = Xd(i.reverse(), n);
    return [
      l,
      a
    ];
  }
  function Qf(n) {
    const i = [], l = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (a) => {
        const c = a.tagName === "INPUT" && a.type === "hidden";
        return a.disabled || a.hidden || c ? NodeFilter.FILTER_SKIP : a.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    for (; l.nextNode(); ) i.push(l.currentNode);
    return i;
  }
  function Xd(n, i) {
    for (const l of n) if (!Cv(l, {
      upTo: i
    })) return l;
  }
  function Cv(n, { upTo: i }) {
    if (getComputedStyle(n).visibility === "hidden") return true;
    for (; n; ) {
      if (i !== void 0 && n === i) return false;
      if (getComputedStyle(n).display === "none") return true;
      n = n.parentElement;
    }
    return false;
  }
  function Pv(n) {
    return n instanceof HTMLInputElement && "select" in n;
  }
  function wr(n, { select: i = false } = {}) {
    if (n && n.focus) {
      const l = document.activeElement;
      n.focus({
        preventScroll: true
      }), n !== l && Pv(n) && i && n.select();
    }
  }
  var qd = bv();
  function bv() {
    let n = [];
    return {
      add(i) {
        const l = n[0];
        i !== l && (l == null ? void 0 : l.pause()), n = Jd(n, i), n.unshift(i);
      },
      remove(i) {
        var _a2;
        n = Jd(n, i), (_a2 = n[0]) == null ? void 0 : _a2.resume();
      }
    };
  }
  function Jd(n, i) {
    const l = [
      ...n
    ], a = l.indexOf(i);
    return a !== -1 && l.splice(a, 1), l;
  }
  function Ev(n) {
    return n.filter((i) => i.tagName !== "A");
  }
  var Tv = qh.useId || (() => {
  }), Rv = 0;
  function Mv(n) {
    const [i, l] = h.useState(Tv());
    return xr(() => {
      l((a) => a ?? String(Rv++));
    }, [
      n
    ]), n || (i ? `radix-${i}` : "");
  }
  const Nv = [
    "top",
    "right",
    "bottom",
    "left"
  ], kr = Math.min, ct = Math.max, Vi = Math.round, _i = Math.floor, Dt = (n) => ({
    x: n,
    y: n
  }), Av = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  }, Lv = {
    start: "end",
    end: "start"
  };
  function pa(n, i, l) {
    return ct(n, kr(i, l));
  }
  function Xt(n, i) {
    return typeof n == "function" ? n(i) : n;
  }
  function qt(n) {
    return n.split("-")[0];
  }
  function bn(n) {
    return n.split("-")[1];
  }
  function ba(n) {
    return n === "x" ? "y" : "x";
  }
  function Ea(n) {
    return n === "y" ? "height" : "width";
  }
  function Cr(n) {
    return [
      "top",
      "bottom"
    ].includes(qt(n)) ? "y" : "x";
  }
  function Ta(n) {
    return ba(Cr(n));
  }
  function _v(n, i, l) {
    l === void 0 && (l = false);
    const a = bn(n), c = Ta(n), d = Ea(c);
    let p = c === "x" ? a === (l ? "end" : "start") ? "right" : "left" : a === "start" ? "bottom" : "top";
    return i.reference[d] > i.floating[d] && (p = $i(p)), [
      p,
      $i(p)
    ];
  }
  function Ov(n) {
    const i = $i(n);
    return [
      ma(n),
      i,
      ma(i)
    ];
  }
  function ma(n) {
    return n.replace(/start|end/g, (i) => Lv[i]);
  }
  function jv(n, i, l) {
    const a = [
      "left",
      "right"
    ], c = [
      "right",
      "left"
    ], d = [
      "top",
      "bottom"
    ], p = [
      "bottom",
      "top"
    ];
    switch (n) {
      case "top":
      case "bottom":
        return l ? i ? c : a : i ? a : c;
      case "left":
      case "right":
        return i ? d : p;
      default:
        return [];
    }
  }
  function Dv(n, i, l, a) {
    const c = bn(n);
    let d = jv(qt(n), l === "start", a);
    return c && (d = d.map((p) => p + "-" + c), i && (d = d.concat(d.map(ma)))), d;
  }
  function $i(n) {
    return n.replace(/left|right|bottom|top/g, (i) => Av[i]);
  }
  function Bv(n) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...n
    };
  }
  function Yf(n) {
    return typeof n != "number" ? Bv(n) : {
      top: n,
      right: n,
      bottom: n,
      left: n
    };
  }
  function Gi(n) {
    const { x: i, y: l, width: a, height: c } = n;
    return {
      width: a,
      height: c,
      top: l,
      left: i,
      right: i + a,
      bottom: l + c,
      x: i,
      y: l
    };
  }
  function Zd(n, i, l) {
    let { reference: a, floating: c } = n;
    const d = Cr(i), p = Ta(i), m = Ea(p), g = qt(i), v = d === "y", w = a.x + a.width / 2 - c.width / 2, C = a.y + a.height / 2 - c.height / 2, x = a[m] / 2 - c[m] / 2;
    let P;
    switch (g) {
      case "top":
        P = {
          x: w,
          y: a.y - c.height
        };
        break;
      case "bottom":
        P = {
          x: w,
          y: a.y + a.height
        };
        break;
      case "right":
        P = {
          x: a.x + a.width,
          y: C
        };
        break;
      case "left":
        P = {
          x: a.x - c.width,
          y: C
        };
        break;
      default:
        P = {
          x: a.x,
          y: a.y
        };
    }
    switch (bn(i)) {
      case "start":
        P[p] -= x * (l && v ? -1 : 1);
        break;
      case "end":
        P[p] += x * (l && v ? -1 : 1);
        break;
    }
    return P;
  }
  const zv = async (n, i, l) => {
    const { placement: a = "bottom", strategy: c = "absolute", middleware: d = [], platform: p } = l, m = d.filter(Boolean), g = await (p.isRTL == null ? void 0 : p.isRTL(i));
    let v = await p.getElementRects({
      reference: n,
      floating: i,
      strategy: c
    }), { x: w, y: C } = Zd(v, a, g), x = a, P = {}, A = 0;
    for (let b = 0; b < m.length; b++) {
      const { name: M, fn: _ } = m[b], { x: W, y: U, data: O, reset: j } = await _({
        x: w,
        y: C,
        initialPlacement: a,
        placement: x,
        strategy: c,
        middlewareData: P,
        rects: v,
        platform: p,
        elements: {
          reference: n,
          floating: i
        }
      });
      w = W ?? w, C = U ?? C, P = {
        ...P,
        [M]: {
          ...P[M],
          ...O
        }
      }, j && A <= 50 && (A++, typeof j == "object" && (j.placement && (x = j.placement), j.rects && (v = j.rects === true ? await p.getElementRects({
        reference: n,
        floating: i,
        strategy: c
      }) : j.rects), { x: w, y: C } = Zd(v, x, g)), b = -1);
    }
    return {
      x: w,
      y: C,
      placement: x,
      strategy: c,
      middlewareData: P
    };
  };
  async function yo(n, i) {
    var l;
    i === void 0 && (i = {});
    const { x: a, y: c, platform: d, rects: p, elements: m, strategy: g } = n, { boundary: v = "clippingAncestors", rootBoundary: w = "viewport", elementContext: C = "floating", altBoundary: x = false, padding: P = 0 } = Xt(i, n), A = Yf(P), M = m[x ? C === "floating" ? "reference" : "floating" : C], _ = Gi(await d.getClippingRect({
      element: (l = await (d.isElement == null ? void 0 : d.isElement(M))) == null || l ? M : M.contextElement || await (d.getDocumentElement == null ? void 0 : d.getDocumentElement(m.floating)),
      boundary: v,
      rootBoundary: w,
      strategy: g
    })), W = C === "floating" ? {
      x: a,
      y: c,
      width: p.floating.width,
      height: p.floating.height
    } : p.reference, U = await (d.getOffsetParent == null ? void 0 : d.getOffsetParent(m.floating)), O = await (d.isElement == null ? void 0 : d.isElement(U)) ? await (d.getScale == null ? void 0 : d.getScale(U)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    }, j = Gi(d.convertOffsetParentRelativeRectToViewportRelativeRect ? await d.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements: m,
      rect: W,
      offsetParent: U,
      strategy: g
    }) : W);
    return {
      top: (_.top - j.top + A.top) / O.y,
      bottom: (j.bottom - _.bottom + A.bottom) / O.y,
      left: (_.left - j.left + A.left) / O.x,
      right: (j.right - _.right + A.right) / O.x
    };
  }
  const Fv = (n) => ({
    name: "arrow",
    options: n,
    async fn(i) {
      const { x: l, y: a, placement: c, rects: d, platform: p, elements: m, middlewareData: g } = i, { element: v, padding: w = 0 } = Xt(n, i) || {};
      if (v == null) return {};
      const C = Yf(w), x = {
        x: l,
        y: a
      }, P = Ta(c), A = Ea(P), b = await p.getDimensions(v), M = P === "y", _ = M ? "top" : "left", W = M ? "bottom" : "right", U = M ? "clientHeight" : "clientWidth", O = d.reference[A] + d.reference[P] - x[P] - d.floating[A], j = x[P] - d.reference[P], $ = await (p.getOffsetParent == null ? void 0 : p.getOffsetParent(v));
      let D = $ ? $[U] : 0;
      (!D || !await (p.isElement == null ? void 0 : p.isElement($))) && (D = m.floating[U] || d.floating[A]);
      const ee = O / 2 - j / 2, X = D / 2 - b[A] / 2 - 1, re = kr(C[_], X), ne = kr(C[W], X), te = re, ce = D - b[A] - ne, pe = D / 2 - b[A] / 2 + ee, ke = pa(te, pe, ce), de = !g.arrow && bn(c) != null && pe !== ke && d.reference[A] / 2 - (pe < te ? re : ne) - b[A] / 2 < 0, se = de ? pe < te ? pe - te : pe - ce : 0;
      return {
        [P]: x[P] + se,
        data: {
          [P]: ke,
          centerOffset: pe - ke - se,
          ...de && {
            alignmentOffset: se
          }
        },
        reset: de
      };
    }
  }), Iv = function(n) {
    return n === void 0 && (n = {}), {
      name: "flip",
      options: n,
      async fn(i) {
        var l, a;
        const { placement: c, middlewareData: d, rects: p, initialPlacement: m, platform: g, elements: v } = i, { mainAxis: w = true, crossAxis: C = true, fallbackPlacements: x, fallbackStrategy: P = "bestFit", fallbackAxisSideDirection: A = "none", flipAlignment: b = true, ...M } = Xt(n, i);
        if ((l = d.arrow) != null && l.alignmentOffset) return {};
        const _ = qt(c), W = Cr(m), U = qt(m) === m, O = await (g.isRTL == null ? void 0 : g.isRTL(v.floating)), j = x || (U || !b ? [
          $i(m)
        ] : Ov(m)), $ = A !== "none";
        !x && $ && j.push(...Dv(m, b, A, O));
        const D = [
          m,
          ...j
        ], ee = await yo(i, M), X = [];
        let re = ((a = d.flip) == null ? void 0 : a.overflows) || [];
        if (w && X.push(ee[_]), C) {
          const pe = _v(c, p, O);
          X.push(ee[pe[0]], ee[pe[1]]);
        }
        if (re = [
          ...re,
          {
            placement: c,
            overflows: X
          }
        ], !X.every((pe) => pe <= 0)) {
          var ne, te;
          const pe = (((ne = d.flip) == null ? void 0 : ne.index) || 0) + 1, ke = D[pe];
          if (ke) return {
            data: {
              index: pe,
              overflows: re
            },
            reset: {
              placement: ke
            }
          };
          let de = (te = re.filter((se) => se.overflows[0] <= 0).sort((se, B) => se.overflows[1] - B.overflows[1])[0]) == null ? void 0 : te.placement;
          if (!de) switch (P) {
            case "bestFit": {
              var ce;
              const se = (ce = re.filter((B) => {
                if ($) {
                  const K = Cr(B.placement);
                  return K === W || K === "y";
                }
                return true;
              }).map((B) => [
                B.placement,
                B.overflows.filter((K) => K > 0).reduce((K, G) => K + G, 0)
              ]).sort((B, K) => B[1] - K[1])[0]) == null ? void 0 : ce[0];
              se && (de = se);
              break;
            }
            case "initialPlacement":
              de = m;
              break;
          }
          if (c !== de) return {
            reset: {
              placement: de
            }
          };
        }
        return {};
      }
    };
  };
  function ef(n, i) {
    return {
      top: n.top - i.height,
      right: n.right - i.width,
      bottom: n.bottom - i.height,
      left: n.left - i.width
    };
  }
  function tf(n) {
    return Nv.some((i) => n[i] >= 0);
  }
  const Wv = function(n) {
    return n === void 0 && (n = {}), {
      name: "hide",
      options: n,
      async fn(i) {
        const { rects: l } = i, { strategy: a = "referenceHidden", ...c } = Xt(n, i);
        switch (a) {
          case "referenceHidden": {
            const d = await yo(i, {
              ...c,
              elementContext: "reference"
            }), p = ef(d, l.reference);
            return {
              data: {
                referenceHiddenOffsets: p,
                referenceHidden: tf(p)
              }
            };
          }
          case "escaped": {
            const d = await yo(i, {
              ...c,
              altBoundary: true
            }), p = ef(d, l.floating);
            return {
              data: {
                escapedOffsets: p,
                escaped: tf(p)
              }
            };
          }
          default:
            return {};
        }
      }
    };
  };
  async function Hv(n, i) {
    const { placement: l, platform: a, elements: c } = n, d = await (a.isRTL == null ? void 0 : a.isRTL(c.floating)), p = qt(l), m = bn(l), g = Cr(l) === "y", v = [
      "left",
      "top"
    ].includes(p) ? -1 : 1, w = d && g ? -1 : 1, C = Xt(i, n);
    let { mainAxis: x, crossAxis: P, alignmentAxis: A } = typeof C == "number" ? {
      mainAxis: C,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: C.mainAxis || 0,
      crossAxis: C.crossAxis || 0,
      alignmentAxis: C.alignmentAxis
    };
    return m && typeof A == "number" && (P = m === "end" ? A * -1 : A), g ? {
      x: P * w,
      y: x * v
    } : {
      x: x * v,
      y: P * w
    };
  }
  const Uv = function(n) {
    return n === void 0 && (n = 0), {
      name: "offset",
      options: n,
      async fn(i) {
        var l, a;
        const { x: c, y: d, placement: p, middlewareData: m } = i, g = await Hv(i, n);
        return p === ((l = m.offset) == null ? void 0 : l.placement) && (a = m.arrow) != null && a.alignmentOffset ? {} : {
          x: c + g.x,
          y: d + g.y,
          data: {
            ...g,
            placement: p
          }
        };
      }
    };
  }, Vv = function(n) {
    return n === void 0 && (n = {}), {
      name: "shift",
      options: n,
      async fn(i) {
        const { x: l, y: a, placement: c } = i, { mainAxis: d = true, crossAxis: p = false, limiter: m = {
          fn: (M) => {
            let { x: _, y: W } = M;
            return {
              x: _,
              y: W
            };
          }
        }, ...g } = Xt(n, i), v = {
          x: l,
          y: a
        }, w = await yo(i, g), C = Cr(qt(c)), x = ba(C);
        let P = v[x], A = v[C];
        if (d) {
          const M = x === "y" ? "top" : "left", _ = x === "y" ? "bottom" : "right", W = P + w[M], U = P - w[_];
          P = pa(W, P, U);
        }
        if (p) {
          const M = C === "y" ? "top" : "left", _ = C === "y" ? "bottom" : "right", W = A + w[M], U = A - w[_];
          A = pa(W, A, U);
        }
        const b = m.fn({
          ...i,
          [x]: P,
          [C]: A
        });
        return {
          ...b,
          data: {
            x: b.x - l,
            y: b.y - a,
            enabled: {
              [x]: d,
              [C]: p
            }
          }
        };
      }
    };
  }, $v = function(n) {
    return n === void 0 && (n = {}), {
      options: n,
      fn(i) {
        const { x: l, y: a, placement: c, rects: d, middlewareData: p } = i, { offset: m = 0, mainAxis: g = true, crossAxis: v = true } = Xt(n, i), w = {
          x: l,
          y: a
        }, C = Cr(c), x = ba(C);
        let P = w[x], A = w[C];
        const b = Xt(m, i), M = typeof b == "number" ? {
          mainAxis: b,
          crossAxis: 0
        } : {
          mainAxis: 0,
          crossAxis: 0,
          ...b
        };
        if (g) {
          const U = x === "y" ? "height" : "width", O = d.reference[x] - d.floating[U] + M.mainAxis, j = d.reference[x] + d.reference[U] - M.mainAxis;
          P < O ? P = O : P > j && (P = j);
        }
        if (v) {
          var _, W;
          const U = x === "y" ? "width" : "height", O = [
            "top",
            "left"
          ].includes(qt(c)), j = d.reference[C] - d.floating[U] + (O && ((_ = p.offset) == null ? void 0 : _[C]) || 0) + (O ? 0 : M.crossAxis), $ = d.reference[C] + d.reference[U] + (O ? 0 : ((W = p.offset) == null ? void 0 : W[C]) || 0) - (O ? M.crossAxis : 0);
          A < j ? A = j : A > $ && (A = $);
        }
        return {
          [x]: P,
          [C]: A
        };
      }
    };
  }, Gv = function(n) {
    return n === void 0 && (n = {}), {
      name: "size",
      options: n,
      async fn(i) {
        var l, a;
        const { placement: c, rects: d, platform: p, elements: m } = i, { apply: g = () => {
        }, ...v } = Xt(n, i), w = await yo(i, v), C = qt(c), x = bn(c), P = Cr(c) === "y", { width: A, height: b } = d.floating;
        let M, _;
        C === "top" || C === "bottom" ? (M = C, _ = x === (await (p.isRTL == null ? void 0 : p.isRTL(m.floating)) ? "start" : "end") ? "left" : "right") : (_ = C, M = x === "end" ? "top" : "bottom");
        const W = b - w.top - w.bottom, U = A - w.left - w.right, O = kr(b - w[M], W), j = kr(A - w[_], U), $ = !i.middlewareData.shift;
        let D = O, ee = j;
        if ((l = i.middlewareData.shift) != null && l.enabled.x && (ee = U), (a = i.middlewareData.shift) != null && a.enabled.y && (D = W), $ && !x) {
          const re = ct(w.left, 0), ne = ct(w.right, 0), te = ct(w.top, 0), ce = ct(w.bottom, 0);
          P ? ee = A - 2 * (re !== 0 || ne !== 0 ? re + ne : ct(w.left, w.right)) : D = b - 2 * (te !== 0 || ce !== 0 ? te + ce : ct(w.top, w.bottom));
        }
        await g({
          ...i,
          availableWidth: ee,
          availableHeight: D
        });
        const X = await p.getDimensions(m.floating);
        return A !== X.width || b !== X.height ? {
          reset: {
            rects: true
          }
        } : {};
      }
    };
  };
  function Ji() {
    return typeof window < "u";
  }
  function En(n) {
    return Xf(n) ? (n.nodeName || "").toLowerCase() : "#document";
  }
  function dt(n) {
    var i;
    return (n == null || (i = n.ownerDocument) == null ? void 0 : i.defaultView) || window;
  }
  function Ft(n) {
    var i;
    return (i = (Xf(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : i.documentElement;
  }
  function Xf(n) {
    return Ji() ? n instanceof Node || n instanceof dt(n).Node : false;
  }
  function Tt(n) {
    return Ji() ? n instanceof Element || n instanceof dt(n).Element : false;
  }
  function Bt(n) {
    return Ji() ? n instanceof HTMLElement || n instanceof dt(n).HTMLElement : false;
  }
  function rf(n) {
    return !Ji() || typeof ShadowRoot > "u" ? false : n instanceof ShadowRoot || n instanceof dt(n).ShadowRoot;
  }
  function So(n) {
    const { overflow: i, overflowX: l, overflowY: a, display: c } = Rt(n);
    return /auto|scroll|overlay|hidden|clip/.test(i + a + l) && ![
      "inline",
      "contents"
    ].includes(c);
  }
  function Kv(n) {
    return [
      "table",
      "td",
      "th"
    ].includes(En(n));
  }
  function Zi(n) {
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
  function Ra(n) {
    const i = Ma(), l = Tt(n) ? Rt(n) : n;
    return [
      "transform",
      "translate",
      "scale",
      "rotate",
      "perspective"
    ].some((a) => l[a] ? l[a] !== "none" : false) || (l.containerType ? l.containerType !== "normal" : false) || !i && (l.backdropFilter ? l.backdropFilter !== "none" : false) || !i && (l.filter ? l.filter !== "none" : false) || [
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
  function Qv(n) {
    let i = Pr(n);
    for (; Bt(i) && !kn(i); ) {
      if (Ra(i)) return i;
      if (Zi(i)) return null;
      i = Pr(i);
    }
    return null;
  }
  function Ma() {
    return typeof CSS > "u" || !CSS.supports ? false : CSS.supports("-webkit-backdrop-filter", "none");
  }
  function kn(n) {
    return [
      "html",
      "body",
      "#document"
    ].includes(En(n));
  }
  function Rt(n) {
    return dt(n).getComputedStyle(n);
  }
  function el(n) {
    return Tt(n) ? {
      scrollLeft: n.scrollLeft,
      scrollTop: n.scrollTop
    } : {
      scrollLeft: n.scrollX,
      scrollTop: n.scrollY
    };
  }
  function Pr(n) {
    if (En(n) === "html") return n;
    const i = n.assignedSlot || n.parentNode || rf(n) && n.host || Ft(n);
    return rf(i) ? i.host : i;
  }
  function qf(n) {
    const i = Pr(n);
    return kn(i) ? n.ownerDocument ? n.ownerDocument.body : n.body : Bt(i) && So(i) ? i : qf(i);
  }
  function wo(n, i, l) {
    var a;
    i === void 0 && (i = []), l === void 0 && (l = true);
    const c = qf(n), d = c === ((a = n.ownerDocument) == null ? void 0 : a.body), p = dt(c);
    if (d) {
      const m = ha(p);
      return i.concat(p, p.visualViewport || [], So(c) ? c : [], m && l ? wo(m) : []);
    }
    return i.concat(c, wo(c, [], l));
  }
  function ha(n) {
    return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
  }
  function Jf(n) {
    const i = Rt(n);
    let l = parseFloat(i.width) || 0, a = parseFloat(i.height) || 0;
    const c = Bt(n), d = c ? n.offsetWidth : l, p = c ? n.offsetHeight : a, m = Vi(l) !== d || Vi(a) !== p;
    return m && (l = d, a = p), {
      width: l,
      height: a,
      $: m
    };
  }
  function Na(n) {
    return Tt(n) ? n : n.contextElement;
  }
  function wn(n) {
    const i = Na(n);
    if (!Bt(i)) return Dt(1);
    const l = i.getBoundingClientRect(), { width: a, height: c, $: d } = Jf(i);
    let p = (d ? Vi(l.width) : l.width) / a, m = (d ? Vi(l.height) : l.height) / c;
    return (!p || !Number.isFinite(p)) && (p = 1), (!m || !Number.isFinite(m)) && (m = 1), {
      x: p,
      y: m
    };
  }
  const Yv = Dt(0);
  function Zf(n) {
    const i = dt(n);
    return !Ma() || !i.visualViewport ? Yv : {
      x: i.visualViewport.offsetLeft,
      y: i.visualViewport.offsetTop
    };
  }
  function Xv(n, i, l) {
    return i === void 0 && (i = false), !l || i && l !== dt(n) ? false : i;
  }
  function Wr(n, i, l, a) {
    i === void 0 && (i = false), l === void 0 && (l = false);
    const c = n.getBoundingClientRect(), d = Na(n);
    let p = Dt(1);
    i && (a ? Tt(a) && (p = wn(a)) : p = wn(n));
    const m = Xv(d, l, a) ? Zf(d) : Dt(0);
    let g = (c.left + m.x) / p.x, v = (c.top + m.y) / p.y, w = c.width / p.x, C = c.height / p.y;
    if (d) {
      const x = dt(d), P = a && Tt(a) ? dt(a) : a;
      let A = x, b = ha(A);
      for (; b && a && P !== A; ) {
        const M = wn(b), _ = b.getBoundingClientRect(), W = Rt(b), U = _.left + (b.clientLeft + parseFloat(W.paddingLeft)) * M.x, O = _.top + (b.clientTop + parseFloat(W.paddingTop)) * M.y;
        g *= M.x, v *= M.y, w *= M.x, C *= M.y, g += U, v += O, A = dt(b), b = ha(A);
      }
    }
    return Gi({
      width: w,
      height: C,
      x: g,
      y: v
    });
  }
  function Aa(n, i) {
    const l = el(n).scrollLeft;
    return i ? i.left + l : Wr(Ft(n)).left + l;
  }
  function ep(n, i, l) {
    l === void 0 && (l = false);
    const a = n.getBoundingClientRect(), c = a.left + i.scrollLeft - (l ? 0 : Aa(n, a)), d = a.top + i.scrollTop;
    return {
      x: c,
      y: d
    };
  }
  function qv(n) {
    let { elements: i, rect: l, offsetParent: a, strategy: c } = n;
    const d = c === "fixed", p = Ft(a), m = i ? Zi(i.floating) : false;
    if (a === p || m && d) return l;
    let g = {
      scrollLeft: 0,
      scrollTop: 0
    }, v = Dt(1);
    const w = Dt(0), C = Bt(a);
    if ((C || !C && !d) && ((En(a) !== "body" || So(p)) && (g = el(a)), Bt(a))) {
      const P = Wr(a);
      v = wn(a), w.x = P.x + a.clientLeft, w.y = P.y + a.clientTop;
    }
    const x = p && !C && !d ? ep(p, g, true) : Dt(0);
    return {
      width: l.width * v.x,
      height: l.height * v.y,
      x: l.x * v.x - g.scrollLeft * v.x + w.x + x.x,
      y: l.y * v.y - g.scrollTop * v.y + w.y + x.y
    };
  }
  function Jv(n) {
    return Array.from(n.getClientRects());
  }
  function Zv(n) {
    const i = Ft(n), l = el(n), a = n.ownerDocument.body, c = ct(i.scrollWidth, i.clientWidth, a.scrollWidth, a.clientWidth), d = ct(i.scrollHeight, i.clientHeight, a.scrollHeight, a.clientHeight);
    let p = -l.scrollLeft + Aa(n);
    const m = -l.scrollTop;
    return Rt(a).direction === "rtl" && (p += ct(i.clientWidth, a.clientWidth) - c), {
      width: c,
      height: d,
      x: p,
      y: m
    };
  }
  function ey(n, i) {
    const l = dt(n), a = Ft(n), c = l.visualViewport;
    let d = a.clientWidth, p = a.clientHeight, m = 0, g = 0;
    if (c) {
      d = c.width, p = c.height;
      const v = Ma();
      (!v || v && i === "fixed") && (m = c.offsetLeft, g = c.offsetTop);
    }
    return {
      width: d,
      height: p,
      x: m,
      y: g
    };
  }
  function ty(n, i) {
    const l = Wr(n, true, i === "fixed"), a = l.top + n.clientTop, c = l.left + n.clientLeft, d = Bt(n) ? wn(n) : Dt(1), p = n.clientWidth * d.x, m = n.clientHeight * d.y, g = c * d.x, v = a * d.y;
    return {
      width: p,
      height: m,
      x: g,
      y: v
    };
  }
  function nf(n, i, l) {
    let a;
    if (i === "viewport") a = ey(n, l);
    else if (i === "document") a = Zv(Ft(n));
    else if (Tt(i)) a = ty(i, l);
    else {
      const c = Zf(n);
      a = {
        x: i.x - c.x,
        y: i.y - c.y,
        width: i.width,
        height: i.height
      };
    }
    return Gi(a);
  }
  function tp(n, i) {
    const l = Pr(n);
    return l === i || !Tt(l) || kn(l) ? false : Rt(l).position === "fixed" || tp(l, i);
  }
  function ry(n, i) {
    const l = i.get(n);
    if (l) return l;
    let a = wo(n, [], false).filter((m) => Tt(m) && En(m) !== "body"), c = null;
    const d = Rt(n).position === "fixed";
    let p = d ? Pr(n) : n;
    for (; Tt(p) && !kn(p); ) {
      const m = Rt(p), g = Ra(p);
      !g && m.position === "fixed" && (c = null), (d ? !g && !c : !g && m.position === "static" && !!c && [
        "absolute",
        "fixed"
      ].includes(c.position) || So(p) && !g && tp(n, p)) ? a = a.filter((w) => w !== p) : c = m, p = Pr(p);
    }
    return i.set(n, a), a;
  }
  function ny(n) {
    let { element: i, boundary: l, rootBoundary: a, strategy: c } = n;
    const p = [
      ...l === "clippingAncestors" ? Zi(i) ? [] : ry(i, this._c) : [].concat(l),
      a
    ], m = p[0], g = p.reduce((v, w) => {
      const C = nf(i, w, c);
      return v.top = ct(C.top, v.top), v.right = kr(C.right, v.right), v.bottom = kr(C.bottom, v.bottom), v.left = ct(C.left, v.left), v;
    }, nf(i, m, c));
    return {
      width: g.right - g.left,
      height: g.bottom - g.top,
      x: g.left,
      y: g.top
    };
  }
  function oy(n) {
    const { width: i, height: l } = Jf(n);
    return {
      width: i,
      height: l
    };
  }
  function iy(n, i, l) {
    const a = Bt(i), c = Ft(i), d = l === "fixed", p = Wr(n, true, d, i);
    let m = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const g = Dt(0);
    if (a || !a && !d) if ((En(i) !== "body" || So(c)) && (m = el(i)), a) {
      const x = Wr(i, true, d, i);
      g.x = x.x + i.clientLeft, g.y = x.y + i.clientTop;
    } else c && (g.x = Aa(c));
    const v = c && !a && !d ? ep(c, m) : Dt(0), w = p.left + m.scrollLeft - g.x - v.x, C = p.top + m.scrollTop - g.y - v.y;
    return {
      x: w,
      y: C,
      width: p.width,
      height: p.height
    };
  }
  function oa(n) {
    return Rt(n).position === "static";
  }
  function of(n, i) {
    if (!Bt(n) || Rt(n).position === "fixed") return null;
    if (i) return i(n);
    let l = n.offsetParent;
    return Ft(n) === l && (l = l.ownerDocument.body), l;
  }
  function rp(n, i) {
    const l = dt(n);
    if (Zi(n)) return l;
    if (!Bt(n)) {
      let c = Pr(n);
      for (; c && !kn(c); ) {
        if (Tt(c) && !oa(c)) return c;
        c = Pr(c);
      }
      return l;
    }
    let a = of(n, i);
    for (; a && Kv(a) && oa(a); ) a = of(a, i);
    return a && kn(a) && oa(a) && !Ra(a) ? l : a || Qv(n) || l;
  }
  const ly = async function(n) {
    const i = this.getOffsetParent || rp, l = this.getDimensions, a = await l(n.floating);
    return {
      reference: iy(n.reference, await i(n.floating), n.strategy),
      floating: {
        x: 0,
        y: 0,
        width: a.width,
        height: a.height
      }
    };
  };
  function sy(n) {
    return Rt(n).direction === "rtl";
  }
  const ay = {
    convertOffsetParentRelativeRectToViewportRelativeRect: qv,
    getDocumentElement: Ft,
    getClippingRect: ny,
    getOffsetParent: rp,
    getElementRects: ly,
    getClientRects: Jv,
    getDimensions: oy,
    getScale: wn,
    isElement: Tt,
    isRTL: sy
  };
  function np(n, i) {
    return n.x === i.x && n.y === i.y && n.width === i.width && n.height === i.height;
  }
  function uy(n, i) {
    let l = null, a;
    const c = Ft(n);
    function d() {
      var m;
      clearTimeout(a), (m = l) == null || m.disconnect(), l = null;
    }
    function p(m, g) {
      m === void 0 && (m = false), g === void 0 && (g = 1), d();
      const v = n.getBoundingClientRect(), { left: w, top: C, width: x, height: P } = v;
      if (m || i(), !x || !P) return;
      const A = _i(C), b = _i(c.clientWidth - (w + x)), M = _i(c.clientHeight - (C + P)), _ = _i(w), U = {
        rootMargin: -A + "px " + -b + "px " + -M + "px " + -_ + "px",
        threshold: ct(0, kr(1, g)) || 1
      };
      let O = true;
      function j($) {
        const D = $[0].intersectionRatio;
        if (D !== g) {
          if (!O) return p();
          D ? p(false, D) : a = setTimeout(() => {
            p(false, 1e-7);
          }, 1e3);
        }
        D === 1 && !np(v, n.getBoundingClientRect()) && p(), O = false;
      }
      try {
        l = new IntersectionObserver(j, {
          ...U,
          root: c.ownerDocument
        });
      } catch {
        l = new IntersectionObserver(j, U);
      }
      l.observe(n);
    }
    return p(true), d;
  }
  function cy(n, i, l, a) {
    a === void 0 && (a = {});
    const { ancestorScroll: c = true, ancestorResize: d = true, elementResize: p = typeof ResizeObserver == "function", layoutShift: m = typeof IntersectionObserver == "function", animationFrame: g = false } = a, v = Na(n), w = c || d ? [
      ...v ? wo(v) : [],
      ...wo(i)
    ] : [];
    w.forEach((_) => {
      c && _.addEventListener("scroll", l, {
        passive: true
      }), d && _.addEventListener("resize", l);
    });
    const C = v && m ? uy(v, l) : null;
    let x = -1, P = null;
    p && (P = new ResizeObserver((_) => {
      let [W] = _;
      W && W.target === v && P && (P.unobserve(i), cancelAnimationFrame(x), x = requestAnimationFrame(() => {
        var U;
        (U = P) == null || U.observe(i);
      })), l();
    }), v && !g && P.observe(v), P.observe(i));
    let A, b = g ? Wr(n) : null;
    g && M();
    function M() {
      const _ = Wr(n);
      b && !np(b, _) && l(), b = _, A = requestAnimationFrame(M);
    }
    return l(), () => {
      var _;
      w.forEach((W) => {
        c && W.removeEventListener("scroll", l), d && W.removeEventListener("resize", l);
      }), C == null ? void 0 : C(), (_ = P) == null || _.disconnect(), P = null, g && cancelAnimationFrame(A);
    };
  }
  const dy = Uv, fy = Vv, py = Iv, my = Gv, hy = Wv, lf = Fv, gy = $v, vy = (n, i, l) => {
    const a = /* @__PURE__ */ new Map(), c = {
      platform: ay,
      ...l
    }, d = {
      ...c.platform,
      _c: a
    };
    return zv(n, i, {
      ...c,
      platform: d
    });
  };
  var zi = typeof document < "u" ? h.useLayoutEffect : h.useEffect;
  function Ki(n, i) {
    if (n === i) return true;
    if (typeof n != typeof i) return false;
    if (typeof n == "function" && n.toString() === i.toString()) return true;
    let l, a, c;
    if (n && i && typeof n == "object") {
      if (Array.isArray(n)) {
        if (l = n.length, l !== i.length) return false;
        for (a = l; a-- !== 0; ) if (!Ki(n[a], i[a])) return false;
        return true;
      }
      if (c = Object.keys(n), l = c.length, l !== Object.keys(i).length) return false;
      for (a = l; a-- !== 0; ) if (!{}.hasOwnProperty.call(i, c[a])) return false;
      for (a = l; a-- !== 0; ) {
        const d = c[a];
        if (!(d === "_owner" && n.$$typeof) && !Ki(n[d], i[d])) return false;
      }
      return true;
    }
    return n !== n && i !== i;
  }
  function op(n) {
    return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
  }
  function sf(n, i) {
    const l = op(n);
    return Math.round(i * l) / l;
  }
  function ia(n) {
    const i = h.useRef(n);
    return zi(() => {
      i.current = n;
    }), i;
  }
  function yy(n) {
    n === void 0 && (n = {});
    const { placement: i = "bottom", strategy: l = "absolute", middleware: a = [], platform: c, elements: { reference: d, floating: p } = {}, transform: m = true, whileElementsMounted: g, open: v } = n, [w, C] = h.useState({
      x: 0,
      y: 0,
      strategy: l,
      placement: i,
      middlewareData: {},
      isPositioned: false
    }), [x, P] = h.useState(a);
    Ki(x, a) || P(a);
    const [A, b] = h.useState(null), [M, _] = h.useState(null), W = h.useCallback((B) => {
      B !== $.current && ($.current = B, b(B));
    }, []), U = h.useCallback((B) => {
      B !== D.current && (D.current = B, _(B));
    }, []), O = d || A, j = p || M, $ = h.useRef(null), D = h.useRef(null), ee = h.useRef(w), X = g != null, re = ia(g), ne = ia(c), te = ia(v), ce = h.useCallback(() => {
      if (!$.current || !D.current) return;
      const B = {
        placement: i,
        strategy: l,
        middleware: x
      };
      ne.current && (B.platform = ne.current), vy($.current, D.current, B).then((K) => {
        const G = {
          ...K,
          isPositioned: te.current !== false
        };
        pe.current && !Ki(ee.current, G) && (ee.current = G, Sa.flushSync(() => {
          C(G);
        }));
      });
    }, [
      x,
      i,
      l,
      ne,
      te
    ]);
    zi(() => {
      v === false && ee.current.isPositioned && (ee.current.isPositioned = false, C((B) => ({
        ...B,
        isPositioned: false
      })));
    }, [
      v
    ]);
    const pe = h.useRef(false);
    zi(() => (pe.current = true, () => {
      pe.current = false;
    }), []), zi(() => {
      if (O && ($.current = O), j && (D.current = j), O && j) {
        if (re.current) return re.current(O, j, ce);
        ce();
      }
    }, [
      O,
      j,
      ce,
      re,
      X
    ]);
    const ke = h.useMemo(() => ({
      reference: $,
      floating: D,
      setReference: W,
      setFloating: U
    }), [
      W,
      U
    ]), de = h.useMemo(() => ({
      reference: O,
      floating: j
    }), [
      O,
      j
    ]), se = h.useMemo(() => {
      const B = {
        position: l,
        left: 0,
        top: 0
      };
      if (!de.floating) return B;
      const K = sf(de.floating, w.x), G = sf(de.floating, w.y);
      return m ? {
        ...B,
        transform: "translate(" + K + "px, " + G + "px)",
        ...op(de.floating) >= 1.5 && {
          willChange: "transform"
        }
      } : {
        position: l,
        left: K,
        top: G
      };
    }, [
      l,
      m,
      de.floating,
      w.x,
      w.y
    ]);
    return h.useMemo(() => ({
      ...w,
      update: ce,
      refs: ke,
      elements: de,
      floatingStyles: se
    }), [
      w,
      ce,
      ke,
      de,
      se
    ]);
  }
  const wy = (n) => {
    function i(l) {
      return {}.hasOwnProperty.call(l, "current");
    }
    return {
      name: "arrow",
      options: n,
      fn(l) {
        const { element: a, padding: c } = typeof n == "function" ? n(l) : n;
        return a && i(a) ? a.current != null ? lf({
          element: a.current,
          padding: c
        }).fn(l) : {} : a ? lf({
          element: a,
          padding: c
        }).fn(l) : {};
      }
    };
  }, Sy = (n, i) => ({
    ...dy(n),
    options: [
      n,
      i
    ]
  }), xy = (n, i) => ({
    ...fy(n),
    options: [
      n,
      i
    ]
  }), ky = (n, i) => ({
    ...gy(n),
    options: [
      n,
      i
    ]
  }), Cy = (n, i) => ({
    ...py(n),
    options: [
      n,
      i
    ]
  }), Py = (n, i) => ({
    ...my(n),
    options: [
      n,
      i
    ]
  }), by = (n, i) => ({
    ...hy(n),
    options: [
      n,
      i
    ]
  }), Ey = (n, i) => ({
    ...wy(n),
    options: [
      n,
      i
    ]
  });
  var Ty = "Arrow", ip = h.forwardRef((n, i) => {
    const { children: l, width: a = 10, height: c = 5, ...d } = n;
    return S.jsx(Qe.svg, {
      ...d,
      ref: i,
      width: a,
      height: c,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: n.asChild ? l : S.jsx("polygon", {
        points: "0,0 30,0 15,10"
      })
    });
  });
  ip.displayName = Ty;
  var Ry = ip;
  function lp(n) {
    const [i, l] = h.useState(void 0);
    return xr(() => {
      if (n) {
        l({
          width: n.offsetWidth,
          height: n.offsetHeight
        });
        const a = new ResizeObserver((c) => {
          if (!Array.isArray(c) || !c.length) return;
          const d = c[0];
          let p, m;
          if ("borderBoxSize" in d) {
            const g = d.borderBoxSize, v = Array.isArray(g) ? g[0] : g;
            p = v.inlineSize, m = v.blockSize;
          } else p = n.offsetWidth, m = n.offsetHeight;
          l({
            width: p,
            height: m
          });
        });
        return a.observe(n, {
          box: "border-box"
        }), () => a.unobserve(n);
      } else l(void 0);
    }, [
      n
    ]), i;
  }
  var La = "Popper", [sp, ap] = Yi(La), [My, up] = sp(La), cp = (n) => {
    const { __scopePopper: i, children: l } = n, [a, c] = h.useState(null);
    return S.jsx(My, {
      scope: i,
      anchor: a,
      onAnchorChange: c,
      children: l
    });
  };
  cp.displayName = La;
  var dp = "PopperAnchor", fp = h.forwardRef((n, i) => {
    const { __scopePopper: l, virtualRef: a, ...c } = n, d = up(dp, l), p = h.useRef(null), m = Ze(i, p);
    return h.useEffect(() => {
      d.onAnchorChange((a == null ? void 0 : a.current) || p.current);
    }), a ? null : S.jsx(Qe.div, {
      ...c,
      ref: m
    });
  });
  fp.displayName = dp;
  var _a = "PopperContent", [Ny, Ay] = sp(_a), pp = h.forwardRef((n, i) => {
    var _a2, _b, _c, _d2, _e, _f2;
    const { __scopePopper: l, side: a = "bottom", sideOffset: c = 0, align: d = "center", alignOffset: p = 0, arrowPadding: m = 0, avoidCollisions: g = true, collisionBoundary: v = [], collisionPadding: w = 0, sticky: C = "partial", hideWhenDetached: x = false, updatePositionStrategy: P = "optimized", onPlaced: A, ...b } = n, M = up(_a, l), [_, W] = h.useState(null), U = Ze(i, (ye) => W(ye)), [O, j] = h.useState(null), $ = lp(O), D = ($ == null ? void 0 : $.width) ?? 0, ee = ($ == null ? void 0 : $.height) ?? 0, X = a + (d !== "center" ? "-" + d : ""), re = typeof w == "number" ? w : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...w
    }, ne = Array.isArray(v) ? v : [
      v
    ], te = ne.length > 0, ce = {
      padding: re,
      boundary: ne.filter(_y),
      altBoundary: te
    }, { refs: pe, floatingStyles: ke, placement: de, isPositioned: se, middlewareData: B } = yy({
      strategy: "fixed",
      placement: X,
      whileElementsMounted: (...ye) => cy(...ye, {
        animationFrame: P === "always"
      }),
      elements: {
        reference: M.anchor
      },
      middleware: [
        Sy({
          mainAxis: c + ee,
          alignmentAxis: p
        }),
        g && xy({
          mainAxis: true,
          crossAxis: false,
          limiter: C === "partial" ? ky() : void 0,
          ...ce
        }),
        g && Cy({
          ...ce
        }),
        Py({
          ...ce,
          apply: ({ elements: ye, rects: we, availableWidth: Ce, availableHeight: Ye }) => {
            const { width: Hr, height: ko } = we.reference, It = ye.floating.style;
            It.setProperty("--radix-popper-available-width", `${Ce}px`), It.setProperty("--radix-popper-available-height", `${Ye}px`), It.setProperty("--radix-popper-anchor-width", `${Hr}px`), It.setProperty("--radix-popper-anchor-height", `${ko}px`);
          }
        }),
        O && Ey({
          element: O,
          padding: m
        }),
        Oy({
          arrowWidth: D,
          arrowHeight: ee
        }),
        x && by({
          strategy: "referenceHidden",
          ...ce
        })
      ]
    }), [K, G] = gp(de), T = Je(A);
    xr(() => {
      se && (T == null ? void 0 : T());
    }, [
      se,
      T
    ]);
    const z = (_a2 = B.arrow) == null ? void 0 : _a2.x, ae = (_b = B.arrow) == null ? void 0 : _b.y, fe = ((_c = B.arrow) == null ? void 0 : _c.centerOffset) !== 0, [he, ge] = h.useState();
    return xr(() => {
      _ && ge(window.getComputedStyle(_).zIndex);
    }, [
      _
    ]), S.jsx("div", {
      ref: pe.setFloating,
      "data-radix-popper-content-wrapper": "",
      style: {
        ...ke,
        transform: se ? ke.transform : "translate(0, -200%)",
        minWidth: "max-content",
        zIndex: he,
        "--radix-popper-transform-origin": [
          (_d2 = B.transformOrigin) == null ? void 0 : _d2.x,
          (_e = B.transformOrigin) == null ? void 0 : _e.y
        ].join(" "),
        ...((_f2 = B.hide) == null ? void 0 : _f2.referenceHidden) && {
          visibility: "hidden",
          pointerEvents: "none"
        }
      },
      dir: n.dir,
      children: S.jsx(Ny, {
        scope: l,
        placedSide: K,
        onArrowChange: j,
        arrowX: z,
        arrowY: ae,
        shouldHideArrow: fe,
        children: S.jsx(Qe.div, {
          "data-side": K,
          "data-align": G,
          ...b,
          ref: U,
          style: {
            ...b.style,
            animation: se ? void 0 : "none"
          }
        })
      })
    });
  });
  pp.displayName = _a;
  var mp = "PopperArrow", Ly = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }, hp = h.forwardRef(function(i, l) {
    const { __scopePopper: a, ...c } = i, d = Ay(mp, a), p = Ly[d.placedSide];
    return S.jsx("span", {
      ref: d.onArrowChange,
      style: {
        position: "absolute",
        left: d.arrowX,
        top: d.arrowY,
        [p]: 0,
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
      children: S.jsx(Ry, {
        ...c,
        ref: l,
        style: {
          ...c.style,
          display: "block"
        }
      })
    });
  });
  hp.displayName = mp;
  function _y(n) {
    return n !== null;
  }
  var Oy = (n) => ({
    name: "transformOrigin",
    options: n,
    fn(i) {
      var _a2, _b, _c;
      const { placement: l, rects: a, middlewareData: c } = i, p = ((_a2 = c.arrow) == null ? void 0 : _a2.centerOffset) !== 0, m = p ? 0 : n.arrowWidth, g = p ? 0 : n.arrowHeight, [v, w] = gp(l), C = {
        start: "0%",
        center: "50%",
        end: "100%"
      }[w], x = (((_b = c.arrow) == null ? void 0 : _b.x) ?? 0) + m / 2, P = (((_c = c.arrow) == null ? void 0 : _c.y) ?? 0) + g / 2;
      let A = "", b = "";
      return v === "bottom" ? (A = p ? C : `${x}px`, b = `${-g}px`) : v === "top" ? (A = p ? C : `${x}px`, b = `${a.floating.height + g}px`) : v === "right" ? (A = `${-g}px`, b = p ? C : `${P}px`) : v === "left" && (A = `${a.floating.width + g}px`, b = p ? C : `${P}px`), {
        data: {
          x: A,
          y: b
        }
      };
    }
  });
  function gp(n) {
    const [i, l = "center"] = n.split("-");
    return [
      i,
      l
    ];
  }
  var jy = cp, vp = fp, Dy = pp, By = hp, zy = "Portal", yp = h.forwardRef((n, i) => {
    var _a2;
    const { container: l, ...a } = n, [c, d] = h.useState(false);
    xr(() => d(true), []);
    const p = l || c && ((_a2 = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a2.body);
    return p ? Hg.createPortal(S.jsx(Qe.div, {
      ...a,
      ref: i
    }), p) : null;
  });
  yp.displayName = zy;
  function wp({ prop: n, defaultProp: i, onChange: l = () => {
  } }) {
    const [a, c] = Fy({
      defaultProp: i,
      onChange: l
    }), d = n !== void 0, p = d ? n : a, m = Je(l), g = h.useCallback((v) => {
      if (d) {
        const C = typeof v == "function" ? v(n) : v;
        C !== n && m(C);
      } else c(v);
    }, [
      d,
      n,
      c,
      m
    ]);
    return [
      p,
      g
    ];
  }
  function Fy({ defaultProp: n, onChange: i }) {
    const l = h.useState(n), [a] = l, c = h.useRef(a), d = Je(i);
    return h.useEffect(() => {
      c.current !== a && (d(a), c.current = a);
    }, [
      a,
      c,
      d
    ]), l;
  }
  var Iy = function(n) {
    if (typeof document > "u") return null;
    var i = Array.isArray(n) ? n[0] : n;
    return i.ownerDocument.body;
  }, hn = /* @__PURE__ */ new WeakMap(), Oi = /* @__PURE__ */ new WeakMap(), ji = {}, la = 0, Sp = function(n) {
    return n && (n.host || Sp(n.parentNode));
  }, Wy = function(n, i) {
    return i.map(function(l) {
      if (n.contains(l)) return l;
      var a = Sp(l);
      return a && n.contains(a) ? a : (console.error("aria-hidden", l, "in not contained inside", n, ". Doing nothing"), null);
    }).filter(function(l) {
      return !!l;
    });
  }, Hy = function(n, i, l, a) {
    var c = Wy(i, Array.isArray(n) ? n : [
      n
    ]);
    ji[l] || (ji[l] = /* @__PURE__ */ new WeakMap());
    var d = ji[l], p = [], m = /* @__PURE__ */ new Set(), g = new Set(c), v = function(C) {
      !C || m.has(C) || (m.add(C), v(C.parentNode));
    };
    c.forEach(v);
    var w = function(C) {
      !C || g.has(C) || Array.prototype.forEach.call(C.children, function(x) {
        if (m.has(x)) w(x);
        else try {
          var P = x.getAttribute(a), A = P !== null && P !== "false", b = (hn.get(x) || 0) + 1, M = (d.get(x) || 0) + 1;
          hn.set(x, b), d.set(x, M), p.push(x), b === 1 && A && Oi.set(x, true), M === 1 && x.setAttribute(l, "true"), A || x.setAttribute(a, "true");
        } catch (_) {
          console.error("aria-hidden: cannot operate on ", x, _);
        }
      });
    };
    return w(i), m.clear(), la++, function() {
      p.forEach(function(C) {
        var x = hn.get(C) - 1, P = d.get(C) - 1;
        hn.set(C, x), d.set(C, P), x || (Oi.has(C) || C.removeAttribute(a), Oi.delete(C)), P || C.removeAttribute(l);
      }), la--, la || (hn = /* @__PURE__ */ new WeakMap(), hn = /* @__PURE__ */ new WeakMap(), Oi = /* @__PURE__ */ new WeakMap(), ji = {});
    };
  }, Uy = function(n, i, l) {
    l === void 0 && (l = "data-aria-hidden");
    var a = Array.from(Array.isArray(n) ? n : [
      n
    ]), c = Iy(n);
    return c ? (a.push.apply(a, Array.from(c.querySelectorAll("[aria-live]"))), Hy(a, c, l, "aria-hidden")) : function() {
      return null;
    };
  }, jt = function() {
    return jt = Object.assign || function(i) {
      for (var l, a = 1, c = arguments.length; a < c; a++) {
        l = arguments[a];
        for (var d in l) Object.prototype.hasOwnProperty.call(l, d) && (i[d] = l[d]);
      }
      return i;
    }, jt.apply(this, arguments);
  };
  function xp(n, i) {
    var l = {};
    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && i.indexOf(a) < 0 && (l[a] = n[a]);
    if (n != null && typeof Object.getOwnPropertySymbols == "function") for (var c = 0, a = Object.getOwnPropertySymbols(n); c < a.length; c++) i.indexOf(a[c]) < 0 && Object.prototype.propertyIsEnumerable.call(n, a[c]) && (l[a[c]] = n[a[c]]);
    return l;
  }
  function Vy(n, i, l) {
    if (l || arguments.length === 2) for (var a = 0, c = i.length, d; a < c; a++) (d || !(a in i)) && (d || (d = Array.prototype.slice.call(i, 0, a)), d[a] = i[a]);
    return n.concat(d || Array.prototype.slice.call(i));
  }
  var Fi = "right-scroll-bar-position", Ii = "width-before-scroll-bar", $y = "with-scroll-bars-hidden", Gy = "--removed-body-scroll-bar-size";
  function sa(n, i) {
    return typeof n == "function" ? n(i) : n && (n.current = i), n;
  }
  function Ky(n, i) {
    var l = h.useState(function() {
      return {
        value: n,
        callback: i,
        facade: {
          get current() {
            return l.value;
          },
          set current(a) {
            var c = l.value;
            c !== a && (l.value = a, l.callback(a, c));
          }
        }
      };
    })[0];
    return l.callback = i, l.facade;
  }
  var Qy = typeof window < "u" ? h.useLayoutEffect : h.useEffect, af = /* @__PURE__ */ new WeakMap();
  function Yy(n, i) {
    var l = Ky(null, function(a) {
      return n.forEach(function(c) {
        return sa(c, a);
      });
    });
    return Qy(function() {
      var a = af.get(l);
      if (a) {
        var c = new Set(a), d = new Set(n), p = l.current;
        c.forEach(function(m) {
          d.has(m) || sa(m, null);
        }), d.forEach(function(m) {
          c.has(m) || sa(m, p);
        });
      }
      af.set(l, n);
    }, [
      n
    ]), l;
  }
  function Xy(n) {
    return n;
  }
  function qy(n, i) {
    i === void 0 && (i = Xy);
    var l = [], a = false, c = {
      read: function() {
        if (a) throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
        return l.length ? l[l.length - 1] : n;
      },
      useMedium: function(d) {
        var p = i(d, a);
        return l.push(p), function() {
          l = l.filter(function(m) {
            return m !== p;
          });
        };
      },
      assignSyncMedium: function(d) {
        for (a = true; l.length; ) {
          var p = l;
          l = [], p.forEach(d);
        }
        l = {
          push: function(m) {
            return d(m);
          },
          filter: function() {
            return l;
          }
        };
      },
      assignMedium: function(d) {
        a = true;
        var p = [];
        if (l.length) {
          var m = l;
          l = [], m.forEach(d), p = l;
        }
        var g = function() {
          var w = p;
          p = [], w.forEach(d);
        }, v = function() {
          return Promise.resolve().then(g);
        };
        v(), l = {
          push: function(w) {
            p.push(w), v();
          },
          filter: function(w) {
            return p = p.filter(w), l;
          }
        };
      }
    };
    return c;
  }
  function Jy(n) {
    n === void 0 && (n = {});
    var i = qy(null);
    return i.options = jt({
      async: true,
      ssr: false
    }, n), i;
  }
  var kp = function(n) {
    var i = n.sideCar, l = xp(n, [
      "sideCar"
    ]);
    if (!i) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
    var a = i.read();
    if (!a) throw new Error("Sidecar medium not found");
    return h.createElement(a, jt({}, l));
  };
  kp.isSideCarExport = true;
  function Zy(n, i) {
    return n.useMedium(i), kp;
  }
  var Cp = Jy(), aa = function() {
  }, tl = h.forwardRef(function(n, i) {
    var l = h.useRef(null), a = h.useState({
      onScrollCapture: aa,
      onWheelCapture: aa,
      onTouchMoveCapture: aa
    }), c = a[0], d = a[1], p = n.forwardProps, m = n.children, g = n.className, v = n.removeScrollBar, w = n.enabled, C = n.shards, x = n.sideCar, P = n.noIsolation, A = n.inert, b = n.allowPinchZoom, M = n.as, _ = M === void 0 ? "div" : M, W = n.gapMode, U = xp(n, [
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
    ]), O = x, j = Yy([
      l,
      i
    ]), $ = jt(jt({}, U), c);
    return h.createElement(h.Fragment, null, w && h.createElement(O, {
      sideCar: Cp,
      removeScrollBar: v,
      shards: C,
      noIsolation: P,
      inert: A,
      setCallbacks: d,
      allowPinchZoom: !!b,
      lockRef: l,
      gapMode: W
    }), p ? h.cloneElement(h.Children.only(m), jt(jt({}, $), {
      ref: j
    })) : h.createElement(_, jt({}, $, {
      className: g,
      ref: j
    }), m));
  });
  tl.defaultProps = {
    enabled: true,
    removeScrollBar: true,
    inert: false
  };
  tl.classNames = {
    fullWidth: Ii,
    zeroRight: Fi
  };
  var ew = function() {
    if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
  };
  function tw() {
    if (!document) return null;
    var n = document.createElement("style");
    n.type = "text/css";
    var i = ew();
    return i && n.setAttribute("nonce", i), n;
  }
  function rw(n, i) {
    n.styleSheet ? n.styleSheet.cssText = i : n.appendChild(document.createTextNode(i));
  }
  function nw(n) {
    var i = document.head || document.getElementsByTagName("head")[0];
    i.appendChild(n);
  }
  var ow = function() {
    var n = 0, i = null;
    return {
      add: function(l) {
        n == 0 && (i = tw()) && (rw(i, l), nw(i)), n++;
      },
      remove: function() {
        n--, !n && i && (i.parentNode && i.parentNode.removeChild(i), i = null);
      }
    };
  }, iw = function() {
    var n = ow();
    return function(i, l) {
      h.useEffect(function() {
        return n.add(i), function() {
          n.remove();
        };
      }, [
        i && l
      ]);
    };
  }, Pp = function() {
    var n = iw(), i = function(l) {
      var a = l.styles, c = l.dynamic;
      return n(a, c), null;
    };
    return i;
  }, lw = {
    left: 0,
    top: 0,
    right: 0,
    gap: 0
  }, ua = function(n) {
    return parseInt(n || "", 10) || 0;
  }, sw = function(n) {
    var i = window.getComputedStyle(document.body), l = i[n === "padding" ? "paddingLeft" : "marginLeft"], a = i[n === "padding" ? "paddingTop" : "marginTop"], c = i[n === "padding" ? "paddingRight" : "marginRight"];
    return [
      ua(l),
      ua(a),
      ua(c)
    ];
  }, aw = function(n) {
    if (n === void 0 && (n = "margin"), typeof window > "u") return lw;
    var i = sw(n), l = document.documentElement.clientWidth, a = window.innerWidth;
    return {
      left: i[0],
      top: i[1],
      right: i[2],
      gap: Math.max(0, a - l + i[2] - i[0])
    };
  }, uw = Pp(), Sn = "data-scroll-locked", cw = function(n, i, l, a) {
    var c = n.left, d = n.top, p = n.right, m = n.gap;
    return l === void 0 && (l = "margin"), `
  .`.concat($y, ` {
   overflow: hidden `).concat(a, `;
   padding-right: `).concat(m, "px ").concat(a, `;
  }
  body[`).concat(Sn, `] {
    overflow: hidden `).concat(a, `;
    overscroll-behavior: contain;
    `).concat([
      i && "position: relative ".concat(a, ";"),
      l === "margin" && `
    padding-left: `.concat(c, `px;
    padding-top: `).concat(d, `px;
    padding-right: `).concat(p, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(m, "px ").concat(a, `;
    `),
      l === "padding" && "padding-right: ".concat(m, "px ").concat(a, ";")
    ].filter(Boolean).join(""), `
  }
  
  .`).concat(Fi, ` {
    right: `).concat(m, "px ").concat(a, `;
  }
  
  .`).concat(Ii, ` {
    margin-right: `).concat(m, "px ").concat(a, `;
  }
  
  .`).concat(Fi, " .").concat(Fi, ` {
    right: 0 `).concat(a, `;
  }
  
  .`).concat(Ii, " .").concat(Ii, ` {
    margin-right: 0 `).concat(a, `;
  }
  
  body[`).concat(Sn, `] {
    `).concat(Gy, ": ").concat(m, `px;
  }
`);
  }, uf = function() {
    var n = parseInt(document.body.getAttribute(Sn) || "0", 10);
    return isFinite(n) ? n : 0;
  }, dw = function() {
    h.useEffect(function() {
      return document.body.setAttribute(Sn, (uf() + 1).toString()), function() {
        var n = uf() - 1;
        n <= 0 ? document.body.removeAttribute(Sn) : document.body.setAttribute(Sn, n.toString());
      };
    }, []);
  }, fw = function(n) {
    var i = n.noRelative, l = n.noImportant, a = n.gapMode, c = a === void 0 ? "margin" : a;
    dw();
    var d = h.useMemo(function() {
      return aw(c);
    }, [
      c
    ]);
    return h.createElement(uw, {
      styles: cw(d, !i, c, l ? "" : "!important")
    });
  }, ga = false;
  if (typeof window < "u") try {
    var Di = Object.defineProperty({}, "passive", {
      get: function() {
        return ga = true, true;
      }
    });
    window.addEventListener("test", Di, Di), window.removeEventListener("test", Di, Di);
  } catch {
    ga = false;
  }
  var gn = ga ? {
    passive: false
  } : false, pw = function(n) {
    return n.tagName === "TEXTAREA";
  }, bp = function(n, i) {
    if (!(n instanceof Element)) return false;
    var l = window.getComputedStyle(n);
    return l[i] !== "hidden" && !(l.overflowY === l.overflowX && !pw(n) && l[i] === "visible");
  }, mw = function(n) {
    return bp(n, "overflowY");
  }, hw = function(n) {
    return bp(n, "overflowX");
  }, cf = function(n, i) {
    var l = i.ownerDocument, a = i;
    do {
      typeof ShadowRoot < "u" && a instanceof ShadowRoot && (a = a.host);
      var c = Ep(n, a);
      if (c) {
        var d = Tp(n, a), p = d[1], m = d[2];
        if (p > m) return true;
      }
      a = a.parentNode;
    } while (a && a !== l.body);
    return false;
  }, gw = function(n) {
    var i = n.scrollTop, l = n.scrollHeight, a = n.clientHeight;
    return [
      i,
      l,
      a
    ];
  }, vw = function(n) {
    var i = n.scrollLeft, l = n.scrollWidth, a = n.clientWidth;
    return [
      i,
      l,
      a
    ];
  }, Ep = function(n, i) {
    return n === "v" ? mw(i) : hw(i);
  }, Tp = function(n, i) {
    return n === "v" ? gw(i) : vw(i);
  }, yw = function(n, i) {
    return n === "h" && i === "rtl" ? -1 : 1;
  }, ww = function(n, i, l, a, c) {
    var d = yw(n, window.getComputedStyle(i).direction), p = d * a, m = l.target, g = i.contains(m), v = false, w = p > 0, C = 0, x = 0;
    do {
      var P = Tp(n, m), A = P[0], b = P[1], M = P[2], _ = b - M - d * A;
      (A || _) && Ep(n, m) && (C += _, x += A), m instanceof ShadowRoot ? m = m.host : m = m.parentNode;
    } while (!g && m !== document.body || g && (i.contains(m) || i === m));
    return (w && Math.abs(C) < 1 || !w && Math.abs(x) < 1) && (v = true), v;
  }, Bi = function(n) {
    return "changedTouches" in n ? [
      n.changedTouches[0].clientX,
      n.changedTouches[0].clientY
    ] : [
      0,
      0
    ];
  }, df = function(n) {
    return [
      n.deltaX,
      n.deltaY
    ];
  }, ff = function(n) {
    return n && "current" in n ? n.current : n;
  }, Sw = function(n, i) {
    return n[0] === i[0] && n[1] === i[1];
  }, xw = function(n) {
    return `
  .block-interactivity-`.concat(n, ` {pointer-events: none;}
  .allow-interactivity-`).concat(n, ` {pointer-events: all;}
`);
  }, kw = 0, vn = [];
  function Cw(n) {
    var i = h.useRef([]), l = h.useRef([
      0,
      0
    ]), a = h.useRef(), c = h.useState(kw++)[0], d = h.useState(Pp)[0], p = h.useRef(n);
    h.useEffect(function() {
      p.current = n;
    }, [
      n
    ]), h.useEffect(function() {
      if (n.inert) {
        document.body.classList.add("block-interactivity-".concat(c));
        var b = Vy([
          n.lockRef.current
        ], (n.shards || []).map(ff), true).filter(Boolean);
        return b.forEach(function(M) {
          return M.classList.add("allow-interactivity-".concat(c));
        }), function() {
          document.body.classList.remove("block-interactivity-".concat(c)), b.forEach(function(M) {
            return M.classList.remove("allow-interactivity-".concat(c));
          });
        };
      }
    }, [
      n.inert,
      n.lockRef.current,
      n.shards
    ]);
    var m = h.useCallback(function(b, M) {
      if ("touches" in b && b.touches.length === 2 || b.type === "wheel" && b.ctrlKey) return !p.current.allowPinchZoom;
      var _ = Bi(b), W = l.current, U = "deltaX" in b ? b.deltaX : W[0] - _[0], O = "deltaY" in b ? b.deltaY : W[1] - _[1], j, $ = b.target, D = Math.abs(U) > Math.abs(O) ? "h" : "v";
      if ("touches" in b && D === "h" && $.type === "range") return false;
      var ee = cf(D, $);
      if (!ee) return true;
      if (ee ? j = D : (j = D === "v" ? "h" : "v", ee = cf(D, $)), !ee) return false;
      if (!a.current && "changedTouches" in b && (U || O) && (a.current = j), !j) return true;
      var X = a.current || j;
      return ww(X, M, b, X === "h" ? U : O);
    }, []), g = h.useCallback(function(b) {
      var M = b;
      if (!(!vn.length || vn[vn.length - 1] !== d)) {
        var _ = "deltaY" in M ? df(M) : Bi(M), W = i.current.filter(function(j) {
          return j.name === M.type && (j.target === M.target || M.target === j.shadowParent) && Sw(j.delta, _);
        })[0];
        if (W && W.should) {
          M.cancelable && M.preventDefault();
          return;
        }
        if (!W) {
          var U = (p.current.shards || []).map(ff).filter(Boolean).filter(function(j) {
            return j.contains(M.target);
          }), O = U.length > 0 ? m(M, U[0]) : !p.current.noIsolation;
          O && M.cancelable && M.preventDefault();
        }
      }
    }, []), v = h.useCallback(function(b, M, _, W) {
      var U = {
        name: b,
        delta: M,
        target: _,
        should: W,
        shadowParent: Pw(_)
      };
      i.current.push(U), setTimeout(function() {
        i.current = i.current.filter(function(O) {
          return O !== U;
        });
      }, 1);
    }, []), w = h.useCallback(function(b) {
      l.current = Bi(b), a.current = void 0;
    }, []), C = h.useCallback(function(b) {
      v(b.type, df(b), b.target, m(b, n.lockRef.current));
    }, []), x = h.useCallback(function(b) {
      v(b.type, Bi(b), b.target, m(b, n.lockRef.current));
    }, []);
    h.useEffect(function() {
      return vn.push(d), n.setCallbacks({
        onScrollCapture: C,
        onWheelCapture: C,
        onTouchMoveCapture: x
      }), document.addEventListener("wheel", g, gn), document.addEventListener("touchmove", g, gn), document.addEventListener("touchstart", w, gn), function() {
        vn = vn.filter(function(b) {
          return b !== d;
        }), document.removeEventListener("wheel", g, gn), document.removeEventListener("touchmove", g, gn), document.removeEventListener("touchstart", w, gn);
      };
    }, []);
    var P = n.removeScrollBar, A = n.inert;
    return h.createElement(h.Fragment, null, A ? h.createElement(d, {
      styles: xw(c)
    }) : null, P ? h.createElement(fw, {
      gapMode: n.gapMode
    }) : null);
  }
  function Pw(n) {
    for (var i = null; n !== null; ) n instanceof ShadowRoot && (i = n.host, n = n.host), n = n.parentNode;
    return i;
  }
  const bw = Zy(Cp, Cw);
  var Rp = h.forwardRef(function(n, i) {
    return h.createElement(tl, jt({}, n, {
      ref: i,
      sideCar: bw
    }));
  });
  Rp.classNames = tl.classNames;
  var Oa = "Popover", [Mp, O0] = Yi(Oa, [
    ap
  ]), xo = ap(), [Ew, Er] = Mp(Oa), Np = (n) => {
    const { __scopePopover: i, children: l, open: a, defaultOpen: c, onOpenChange: d, modal: p = false } = n, m = xo(i), g = h.useRef(null), [v, w] = h.useState(false), [C = false, x] = wp({
      prop: a,
      defaultProp: c,
      onChange: d
    });
    return S.jsx(jy, {
      ...m,
      children: S.jsx(Ew, {
        scope: i,
        contentId: Mv(),
        triggerRef: g,
        open: C,
        onOpenChange: x,
        onOpenToggle: h.useCallback(() => x((P) => !P), [
          x
        ]),
        hasCustomAnchor: v,
        onCustomAnchorAdd: h.useCallback(() => w(true), []),
        onCustomAnchorRemove: h.useCallback(() => w(false), []),
        modal: p,
        children: l
      })
    });
  };
  Np.displayName = Oa;
  var Ap = "PopoverAnchor", Tw = h.forwardRef((n, i) => {
    const { __scopePopover: l, ...a } = n, c = Er(Ap, l), d = xo(l), { onCustomAnchorAdd: p, onCustomAnchorRemove: m } = c;
    return h.useEffect(() => (p(), () => m()), [
      p,
      m
    ]), S.jsx(vp, {
      ...d,
      ...a,
      ref: i
    });
  });
  Tw.displayName = Ap;
  var Lp = "PopoverTrigger", _p = h.forwardRef((n, i) => {
    const { __scopePopover: l, ...a } = n, c = Er(Lp, l), d = xo(l), p = Ze(i, c.triggerRef), m = S.jsx(Qe.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": c.open,
      "aria-controls": c.contentId,
      "data-state": zp(c.open),
      ...a,
      ref: p,
      onClick: Ue(n.onClick, c.onOpenToggle)
    });
    return c.hasCustomAnchor ? m : S.jsx(vp, {
      asChild: true,
      ...d,
      children: m
    });
  });
  _p.displayName = Lp;
  var ja = "PopoverPortal", [Rw, Mw] = Mp(ja, {
    forceMount: void 0
  }), Op = (n) => {
    const { __scopePopover: i, forceMount: l, children: a, container: c } = n, d = Er(ja, i);
    return S.jsx(Rw, {
      scope: i,
      forceMount: l,
      children: S.jsx(br, {
        present: l || d.open,
        children: S.jsx(yp, {
          asChild: true,
          container: c,
          children: a
        })
      })
    });
  };
  Op.displayName = ja;
  var Cn = "PopoverContent", jp = h.forwardRef((n, i) => {
    const l = Mw(Cn, n.__scopePopover), { forceMount: a = l.forceMount, ...c } = n, d = Er(Cn, n.__scopePopover);
    return S.jsx(br, {
      present: a || d.open,
      children: d.modal ? S.jsx(Nw, {
        ...c,
        ref: i
      }) : S.jsx(Aw, {
        ...c,
        ref: i
      })
    });
  });
  jp.displayName = Cn;
  var Nw = h.forwardRef((n, i) => {
    const l = Er(Cn, n.__scopePopover), a = h.useRef(null), c = Ze(i, a), d = h.useRef(false);
    return h.useEffect(() => {
      const p = a.current;
      if (p) return Uy(p);
    }, []), S.jsx(Rp, {
      as: Qi,
      allowPinchZoom: true,
      children: S.jsx(Dp, {
        ...n,
        ref: c,
        trapFocus: l.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: Ue(n.onCloseAutoFocus, (p) => {
          var _a2;
          p.preventDefault(), d.current || ((_a2 = l.triggerRef.current) == null ? void 0 : _a2.focus());
        }),
        onPointerDownOutside: Ue(n.onPointerDownOutside, (p) => {
          const m = p.detail.originalEvent, g = m.button === 0 && m.ctrlKey === true, v = m.button === 2 || g;
          d.current = v;
        }, {
          checkForDefaultPrevented: false
        }),
        onFocusOutside: Ue(n.onFocusOutside, (p) => p.preventDefault(), {
          checkForDefaultPrevented: false
        })
      })
    });
  }), Aw = h.forwardRef((n, i) => {
    const l = Er(Cn, n.__scopePopover), a = h.useRef(false), c = h.useRef(false);
    return S.jsx(Dp, {
      ...n,
      ref: i,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      onCloseAutoFocus: (d) => {
        var _a2, _b;
        (_a2 = n.onCloseAutoFocus) == null ? void 0 : _a2.call(n, d), d.defaultPrevented || (a.current || ((_b = l.triggerRef.current) == null ? void 0 : _b.focus()), d.preventDefault()), a.current = false, c.current = false;
      },
      onInteractOutside: (d) => {
        var _a2, _b;
        (_a2 = n.onInteractOutside) == null ? void 0 : _a2.call(n, d), d.defaultPrevented || (a.current = true, d.detail.originalEvent.type === "pointerdown" && (c.current = true));
        const p = d.target;
        ((_b = l.triggerRef.current) == null ? void 0 : _b.contains(p)) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && c.current && d.preventDefault();
      }
    });
  }), Dp = h.forwardRef((n, i) => {
    const { __scopePopover: l, trapFocus: a, onOpenAutoFocus: c, onCloseAutoFocus: d, disableOutsidePointerEvents: p, onEscapeKeyDown: m, onPointerDownOutside: g, onFocusOutside: v, onInteractOutside: w, ...C } = n, x = Er(Cn, l), P = xo(l);
    return wv(), S.jsx(Kf, {
      asChild: true,
      loop: true,
      trapped: a,
      onMountAutoFocus: c,
      onUnmountAutoFocus: d,
      children: S.jsx($f, {
        asChild: true,
        disableOutsidePointerEvents: p,
        onInteractOutside: w,
        onEscapeKeyDown: m,
        onPointerDownOutside: g,
        onFocusOutside: v,
        onDismiss: () => x.onOpenChange(false),
        children: S.jsx(Dy, {
          "data-state": zp(x.open),
          role: "dialog",
          id: x.contentId,
          ...P,
          ...C,
          ref: i,
          style: {
            ...C.style,
            "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
            "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
            "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
          }
        })
      })
    });
  }), Bp = "PopoverClose", Lw = h.forwardRef((n, i) => {
    const { __scopePopover: l, ...a } = n, c = Er(Bp, l);
    return S.jsx(Qe.button, {
      type: "button",
      ...a,
      ref: i,
      onClick: Ue(n.onClick, () => c.onOpenChange(false))
    });
  });
  Lw.displayName = Bp;
  var _w = "PopoverArrow", Ow = h.forwardRef((n, i) => {
    const { __scopePopover: l, ...a } = n, c = xo(l);
    return S.jsx(By, {
      ...c,
      ...a,
      ref: i
    });
  });
  Ow.displayName = _w;
  function zp(n) {
    return n ? "open" : "closed";
  }
  var jw = Np, Dw = _p, Bw = Op, Fp = jp;
  const zw = jw, Fw = Dw, Ip = h.forwardRef(({ className: n, align: i = "center", sideOffset: l = 4, ...a }, c) => S.jsx(Bw, {
    children: S.jsx(Fp, {
      ref: c,
      align: i,
      sideOffset: l,
      className: Ir("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", n),
      ...a
    })
  }));
  Ip.displayName = Fp.displayName;
  const Iw = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Wp = (...n) => n.filter((i, l, a) => !!i && i.trim() !== "" && a.indexOf(i) === l).join(" ").trim();
  var Ww = {
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
  const Hw = h.forwardRef(({ color: n = "currentColor", size: i = 24, strokeWidth: l = 2, absoluteStrokeWidth: a, className: c = "", children: d, iconNode: p, ...m }, g) => h.createElement("svg", {
    ref: g,
    ...Ww,
    width: i,
    height: i,
    stroke: n,
    strokeWidth: a ? Number(l) * 24 / Number(i) : l,
    className: Wp("lucide", c),
    ...m
  }, [
    ...p.map(([v, w]) => h.createElement(v, w)),
    ...Array.isArray(d) ? d : [
      d
    ]
  ]));
  const Mt = (n, i) => {
    const l = h.forwardRef(({ className: a, ...c }, d) => h.createElement(Hw, {
      ref: d,
      iconNode: i,
      className: Wp(`lucide-${Iw(n)}`, a),
      ...c
    }));
    return l.displayName = `${n}`, l;
  };
  const Uw = Mt("ArrowDown", [
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
  const Vw = Mt("Check", [
    [
      "path",
      {
        d: "M20 6 9 17l-5-5",
        key: "1gmf2c"
      }
    ]
  ]);
  const $w = Mt("ChevronLeft", [
    [
      "path",
      {
        d: "m15 18-6-6 6-6",
        key: "1wnfg3"
      }
    ]
  ]);
  const Gw = Mt("ChevronRight", [
    [
      "path",
      {
        d: "m9 18 6-6-6-6",
        key: "mthhwq"
      }
    ]
  ]);
  const Kw = Mt("CirclePlus", [
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
  const pf = Mt("Copy", [
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
  const Qw = Mt("FileText", [
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
  const Yw = Mt("Hash", [
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
  const Xw = Mt("Moon", [
    [
      "path",
      {
        d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
        key: "a7tn18"
      }
    ]
  ]);
  const qw = Mt("Sun", [
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
  const Jw = Mt("UserPlus", [
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
  class Zw {
    constructor() {
      __publicField(this, "logs", []);
      __publicField(this, "subscribers", /* @__PURE__ */ new Set());
    }
    error(i, l) {
      console.error(i, l), this.log(`${i} ${l}`, "error");
    }
    info(i) {
      this.log(i);
    }
    log(i, l = "info") {
      const a = {
        timestamp: /* @__PURE__ */ new Date(),
        level: l,
        message: i
      };
      this.logs.push(a), this.notifySubscribers(a);
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
  yt = new Zw();
  function e0({ api: n, channel: i, onClose: l }) {
    const [a, c] = h.useState([]), [d, p] = h.useState(""), [m, g] = h.useState([]), [v, w] = h.useState(0), [C, x] = h.useState(false), [P, A] = h.useState(true), b = h.useRef(null), M = h.useRef(null), _ = h.useCallback(() => {
      b.current && b.current.scrollIntoView({
        behavior: "smooth"
      }), x(false), A(true);
    }, []);
    h.useEffect(() => n.subscribeToNeighbors(i, w), [
      i
    ]), h.useEffect(() => {
      const D = async () => {
        try {
          const ne = await n.getMessages(i);
          c(ne), _();
        } catch (ne) {
          yt.error("Failed to fetch messages", ne);
        }
      }, ee = async () => {
        try {
          const ne = await n.getPeers(i);
          g(ne);
        } catch (ne) {
          yt.error("Failed to fetch peers", ne);
        }
      };
      D(), ee();
      const X = n.subscribeToMessages(i, (ne) => {
        c((te) => {
          if (!te.some((ce) => ce.id === ne.id)) {
            const ce = [
              ...te,
              ne
            ];
            return P ? setTimeout(_, 0) : x(true), ce;
          }
          return te;
        }), yt.info(`New message received: ${ne.content}`);
      }), re = n.subscribeToPeers(i, (ne) => {
        g(ne);
      });
      return () => {
        X(), re();
      };
    }, [
      i,
      P,
      _
    ]);
    const W = async (D) => {
      if (D.preventDefault(), d.trim()) try {
        await n.sendMessage(i, d.trim()), p(""), yt.info(`Message sent in channel ${i}: ${d.trim()}`);
      } catch (ee) {
        yt.error("Failed to send message", ee);
      }
    }, U = (D) => {
      navigator.clipboard.writeText(D);
    }, O = (D) => {
      switch (D) {
        case "online":
          return "bg-green-500";
        case "away":
          return "bg-yellow-500";
        case "offline":
          return "bg-red-500";
        default:
          return "bg-gray-500";
      }
    }, j = [
      ...m
    ].sort((D, ee) => {
      const X = {
        online: 0,
        away: 1,
        offline: 2
      };
      return X[D.status] - X[ee.status];
    }), $ = h.useCallback(() => {
      if (M.current) {
        const { scrollTop: D, scrollHeight: ee, clientHeight: X } = M.current, re = D + X >= ee - 10;
        A(re), x(!re);
      }
    }, []);
    return h.useEffect(() => {
      P && _();
    }, [
      P,
      _
    ]), h.useEffect(() => {
      const D = M.current;
      if (D) return D.addEventListener("scroll", $), () => D.removeEventListener("scroll", $);
    }, [
      $
    ]), S.jsxs("div", {
      className: "flex flex-grow overflow-hidden",
      children: [
        S.jsxs("div", {
          className: "flex-grow flex flex-col p-4 relative",
          children: [
            S.jsxs(vo, {
              className: "flex-grow mb-4 border rounded-md p-4",
              ref: M,
              onScroll: $,
              children: [
                a.map((D) => S.jsxs("div", {
                  className: "mb-2",
                  children: [
                    S.jsxs("span", {
                      className: "font-bold",
                      children: [
                        D.nickname || D.sender.substring(0, 8),
                        ": "
                      ]
                    }),
                    D.content
                  ]
                }, D.id)),
                S.jsx("div", {
                  ref: b
                })
              ]
            }),
            C && S.jsx(He, {
              className: "absolute bottom-20 right-4 rounded-full p-2",
              onClick: _,
              size: "icon",
              children: S.jsx(Uw, {
                className: "h-4 w-4"
              })
            }),
            S.jsxs("form", {
              onSubmit: W,
              className: "flex space-x-2",
              children: [
                S.jsx(go, {
                  value: d,
                  onChange: (D) => p(D.target.value),
                  placeholder: "Type your message...",
                  className: "flex-grow"
                }),
                S.jsx(He, {
                  type: "submit",
                  children: "Send"
                })
              ]
            })
          ]
        }),
        S.jsxs("div", {
          className: "w-1/4 p-4 border-l flex flex-col",
          children: [
            S.jsxs("div", {
              className: "mb-4",
              children: [
                S.jsx("h2", {
                  className: "font-bold mb-2",
                  children: "Status"
                }),
                v > 0 && S.jsxs("p", {
                  children: [
                    "Connected (",
                    v,
                    " neighbors)"
                  ]
                }),
                v === 0 && S.jsx("p", {
                  children: "Waiting for peers"
                })
              ]
            }),
            S.jsx("div", {
              className: "mb-4",
              children: S.jsx(He, {
                onClick: (D) => l(),
                children: "Leave channel"
              })
            }),
            S.jsx("h2", {
              className: "font-bold mb-2",
              children: "Peers"
            }),
            S.jsx("div", {
              className: "flex-grow",
              children: S.jsx(vo, {
                className: "h-full",
                children: j.map((D) => S.jsxs(zw, {
                  children: [
                    S.jsx(Fw, {
                      asChild: true,
                      children: S.jsxs("div", {
                        className: "flex items-center mb-2 cursor-pointer",
                        children: [
                          S.jsx("div", {
                            className: `w-2 h-2 rounded-full mr-2 ${O(D.status)}`
                          }),
                          S.jsx("span", {
                            children: D.name
                          })
                        ]
                      })
                    }),
                    S.jsx(Ip, {
                      className: "w-60",
                      children: S.jsxs("div", {
                        className: "space-y-2",
                        children: [
                          S.jsxs("p", {
                            children: [
                              S.jsx("strong", {
                                children: "Last seen:"
                              }),
                              " ",
                              D.lastSeen.toLocaleString()
                            ]
                          }),
                          S.jsxs("div", {
                            children: [
                              S.jsx("strong", {
                                children: "Node ID:"
                              }),
                              S.jsxs("span", {
                                className: "ml-2",
                                children: [
                                  D.id.substring(0, 8),
                                  "..."
                                ]
                              }),
                              S.jsx(He, {
                                size: "sm",
                                onClick: () => U(D.id),
                                className: "ml-2",
                                children: "Copy"
                              })
                            ]
                          })
                        ]
                      })
                    })
                  ]
                }, D.id))
              })
            })
          ]
        })
      ]
    });
  }
  var t0 = (n, i, l, a, c, d, p, m) => {
    let g = document.documentElement, v = [
      "light",
      "dark"
    ];
    function w(P) {
      (Array.isArray(n) ? n : [
        n
      ]).forEach((A) => {
        let b = A === "class", M = b && d ? c.map((_) => d[_] || _) : c;
        b ? (g.classList.remove(...M), g.classList.add(P)) : g.setAttribute(A, P);
      }), C(P);
    }
    function C(P) {
      m && v.includes(P) && (g.style.colorScheme = P);
    }
    function x() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    if (a) w(a);
    else try {
      let P = localStorage.getItem(i) || l, A = p && P === "system" ? x() : P;
      w(A);
    } catch {
    }
  }, mf = [
    "light",
    "dark"
  ], Hp = "(prefers-color-scheme: dark)", r0 = typeof window > "u", Da = h.createContext(void 0), n0 = {
    setTheme: (n) => {
    },
    themes: []
  }, o0 = () => {
    var n;
    return (n = h.useContext(Da)) != null ? n : n0;
  }, i0 = (n) => h.useContext(Da) ? h.createElement(h.Fragment, null, n.children) : h.createElement(s0, {
    ...n
  }), l0 = [
    "light",
    "dark"
  ], s0 = ({ forcedTheme: n, disableTransitionOnChange: i = false, enableSystem: l = true, enableColorScheme: a = true, storageKey: c = "theme", themes: d = l0, defaultTheme: p = l ? "system" : "light", attribute: m = "data-theme", value: g, children: v, nonce: w, scriptProps: C }) => {
    let [x, P] = h.useState(() => hf(c, p)), [A, b] = h.useState(() => hf(c)), M = g ? Object.values(g) : d, _ = h.useCallback((j) => {
      let $ = j;
      if (!$) return;
      j === "system" && l && ($ = gf());
      let D = g ? g[$] : $, ee = i ? u0(w) : null, X = document.documentElement, re = (ne) => {
        ne === "class" ? (X.classList.remove(...M), D && X.classList.add(D)) : ne.startsWith("data-") && (D ? X.setAttribute(ne, D) : X.removeAttribute(ne));
      };
      if (Array.isArray(m) ? m.forEach(re) : re(m), a) {
        let ne = mf.includes(p) ? p : null, te = mf.includes($) ? $ : ne;
        X.style.colorScheme = te;
      }
      ee == null ? void 0 : ee();
    }, [
      w
    ]), W = h.useCallback((j) => {
      let $ = typeof j == "function" ? j(x) : j;
      P($);
      try {
        localStorage.setItem(c, $);
      } catch {
      }
    }, [
      x
    ]), U = h.useCallback((j) => {
      let $ = gf(j);
      b($), x === "system" && l && !n && _("system");
    }, [
      x,
      n
    ]);
    h.useEffect(() => {
      let j = window.matchMedia(Hp);
      return j.addListener(U), U(j), () => j.removeListener(U);
    }, [
      U
    ]), h.useEffect(() => {
      let j = ($) => {
        $.key === c && ($.newValue ? P($.newValue) : W(p));
      };
      return window.addEventListener("storage", j), () => window.removeEventListener("storage", j);
    }, [
      W
    ]), h.useEffect(() => {
      _(n ?? x);
    }, [
      n,
      x
    ]);
    let O = h.useMemo(() => ({
      theme: x,
      setTheme: W,
      forcedTheme: n,
      resolvedTheme: x === "system" ? A : x,
      themes: l ? [
        ...d,
        "system"
      ] : d,
      systemTheme: l ? A : void 0
    }), [
      x,
      W,
      n,
      A,
      l,
      d
    ]);
    return h.createElement(Da.Provider, {
      value: O
    }, h.createElement(a0, {
      forcedTheme: n,
      storageKey: c,
      attribute: m,
      enableSystem: l,
      enableColorScheme: a,
      defaultTheme: p,
      value: g,
      themes: d,
      nonce: w,
      scriptProps: C
    }), v);
  }, a0 = h.memo(({ forcedTheme: n, storageKey: i, attribute: l, enableSystem: a, enableColorScheme: c, defaultTheme: d, value: p, themes: m, nonce: g, scriptProps: v }) => {
    let w = JSON.stringify([
      l,
      i,
      d,
      n,
      m,
      p,
      a,
      c
    ]).slice(1, -1);
    return h.createElement("script", {
      ...v,
      suppressHydrationWarning: true,
      nonce: typeof window > "u" ? g : "",
      dangerouslySetInnerHTML: {
        __html: `(${t0.toString()})(${w})`
      }
    });
  }), hf = (n, i) => {
    if (r0) return;
    let l;
    try {
      l = localStorage.getItem(n) || void 0;
    } catch {
    }
    return l || i;
  }, u0 = (n) => {
    let i = document.createElement("style");
    return n && i.setAttribute("nonce", n), i.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")), document.head.appendChild(i), () => {
      window.getComputedStyle(document.body), setTimeout(() => {
        document.head.removeChild(i);
      }, 1);
    };
  }, gf = (n) => (n || (n = window.matchMedia(Hp)), n.matches ? "dark" : "light");
  function Up({ onLogsClick: n, onInviteClick: i, title: l }) {
    return S.jsxs("header", {
      className: "bg-background text-foreground p-4 flex justify-between items-center",
      children: [
        S.jsx("div", {
          className: "flex items-center",
          children: l && S.jsx("h1", {
            className: "text-xl font-bold mr-4",
            children: l
          })
        }),
        S.jsxs("div", {
          className: "flex items-center space-x-2",
          children: [
            i && S.jsxs(He, {
              onClick: i,
              variant: "default",
              children: [
                S.jsx(Jw, {
                  className: "w-4 h-4 mr-2"
                }),
                "Invite"
              ]
            }),
            S.jsxs(He, {
              onClick: n,
              variant: "secondary",
              children: [
                S.jsx(Qw, {
                  className: "w-4 h-4 mr-2"
                }),
                "Logs"
              ]
            }),
            S.jsx(c0, {})
          ]
        })
      ]
    });
  }
  function c0() {
    const { theme: n, setTheme: i } = o0(), [l, a] = h.useState(false);
    return h.useEffect(() => a(true), []), l ? S.jsxs(He, {
      variant: "ghost",
      size: "icon",
      onClick: () => i(n === "light" ? "dark" : "light"),
      children: [
        n === "light" ? S.jsx(Xw, {
          className: "h-5 w-5"
        }) : S.jsx(qw, {
          className: "h-5 w-5"
        }),
        S.jsx("span", {
          className: "sr-only",
          children: "Toggle theme"
        })
      ]
    }) : null;
  }
  function Vp({ onClose: n }) {
    const i = d0(), l = (c) => c.toTimeString().split(" ")[0] + "." + c.getMilliseconds().toString().padStart(3, "0").slice(0, 2), a = (c) => {
      switch (c) {
        case "error":
          return "text-red-500";
        case "warn":
          return "text-yellow-500";
        default:
          return "text-foreground";
      }
    };
    return S.jsx("div", {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center",
      children: S.jsxs("div", {
        className: "bg-background text-foreground p-4 rounded-lg w-full max-w-2xl h-[80vh] flex flex-col",
        children: [
          S.jsx("h2", {
            className: "text-lg font-semibold mb-2",
            children: "Log View"
          }),
          S.jsx(vo, {
            className: "flex-grow mb-4 font-mono",
            children: S.jsx("div", {
              className: "space-y-1",
              children: i.map((c, d) => S.jsxs("div", {
                className: `${a(c.level)}`,
                children: [
                  S.jsx("span", {
                    className: "text-muted-foreground",
                    children: l(c.timestamp)
                  }),
                  " ",
                  c.message
                ]
              }, d))
            })
          }),
          S.jsx(He, {
            onClick: n,
            children: "Close"
          })
        ]
      })
    });
  }
  function d0() {
    const [n, i] = h.useState([
      ...yt.get()
    ]);
    return h.useEffect(() => {
      const l = yt.subscribe((a) => {
        i((c) => [
          ...c,
          a
        ]);
      });
      return () => l();
    }, []), n;
  }
  function f0({ channels: n, activeChannel: i, onChannelSelect: l, onNewChannel: a }) {
    const [c, d] = h.useState(false);
    return S.jsxs("div", {
      className: `bg-secondary h-full flex flex-col transition-all duration-300 ${c ? "w-12" : "w-64"}`,
      children: [
        S.jsxs("div", {
          className: "p-4 flex justify-between items-center",
          children: [
            !c && S.jsx("h2", {
              className: "text-lg font-semibold",
              children: "Channels"
            }),
            S.jsx(He, {
              variant: "ghost",
              size: "icon",
              onClick: () => d(!c),
              children: c ? S.jsx(Gw, {
                className: "h-5 w-5"
              }) : S.jsx($w, {
                className: "h-5 w-5"
              })
            })
          ]
        }),
        S.jsx(vo, {
          className: "flex-grow",
          children: n.map((p) => {
            const m = ya(p.id === i && "bg-primary/10", c ? "px-2" : "px-4");
            return S.jsxs(He, {
              variant: "ghost",
              className: `w-full justify-start px-4 py-2 hover:bg-primary/20 rounded-none ${m}`,
              onClick: () => l(p.id),
              children: [
                S.jsx(Yw, {
                  className: "h-4 w-4 mr-2"
                }),
                !c && p.name
              ]
            }, p.id);
          })
        }),
        S.jsxs(He, {
          variant: "default",
          onClick: a,
          className: "m-4",
          children: [
            S.jsx(Kw, {
              className: "h-5 w-5"
            }),
            "Add channel"
          ]
        })
      ]
    });
  }
  function p0(n) {
    const i = h.useRef({
      value: n,
      previous: n
    });
    return h.useMemo(() => (i.current.value !== n && (i.current.previous = i.current.value, i.current.value = n), i.current.previous), [
      n
    ]);
  }
  var Ba = "Checkbox", [m0, j0] = Yi(Ba), [h0, g0] = m0(Ba), $p = h.forwardRef((n, i) => {
    const { __scopeCheckbox: l, name: a, checked: c, defaultChecked: d, required: p, disabled: m, value: g = "on", onCheckedChange: v, form: w, ...C } = n, [x, P] = h.useState(null), A = Ze(i, (O) => P(O)), b = h.useRef(false), M = x ? w || !!x.closest("form") : true, [_ = false, W] = wp({
      prop: c,
      defaultProp: d,
      onChange: v
    }), U = h.useRef(_);
    return h.useEffect(() => {
      const O = x == null ? void 0 : x.form;
      if (O) {
        const j = () => W(U.current);
        return O.addEventListener("reset", j), () => O.removeEventListener("reset", j);
      }
    }, [
      x,
      W
    ]), S.jsxs(h0, {
      scope: l,
      state: _,
      disabled: m,
      children: [
        S.jsx(Qe.button, {
          type: "button",
          role: "checkbox",
          "aria-checked": Sr(_) ? "mixed" : _,
          "aria-required": p,
          "data-state": Qp(_),
          "data-disabled": m ? "" : void 0,
          disabled: m,
          value: g,
          ...C,
          ref: A,
          onKeyDown: Ue(n.onKeyDown, (O) => {
            O.key === "Enter" && O.preventDefault();
          }),
          onClick: Ue(n.onClick, (O) => {
            W((j) => Sr(j) ? true : !j), M && (b.current = O.isPropagationStopped(), b.current || O.stopPropagation());
          })
        }),
        M && S.jsx(v0, {
          control: x,
          bubbles: !b.current,
          name: a,
          value: g,
          checked: _,
          required: p,
          disabled: m,
          form: w,
          style: {
            transform: "translateX(-100%)"
          },
          defaultChecked: Sr(d) ? false : d
        })
      ]
    });
  });
  $p.displayName = Ba;
  var Gp = "CheckboxIndicator", Kp = h.forwardRef((n, i) => {
    const { __scopeCheckbox: l, forceMount: a, ...c } = n, d = g0(Gp, l);
    return S.jsx(br, {
      present: a || Sr(d.state) || d.state === true,
      children: S.jsx(Qe.span, {
        "data-state": Qp(d.state),
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
  Kp.displayName = Gp;
  var v0 = (n) => {
    const { control: i, checked: l, bubbles: a = true, defaultChecked: c, ...d } = n, p = h.useRef(null), m = p0(l), g = lp(i);
    h.useEffect(() => {
      const w = p.current, C = window.HTMLInputElement.prototype, P = Object.getOwnPropertyDescriptor(C, "checked").set;
      if (m !== l && P) {
        const A = new Event("click", {
          bubbles: a
        });
        w.indeterminate = Sr(l), P.call(w, Sr(l) ? false : l), w.dispatchEvent(A);
      }
    }, [
      m,
      l,
      a
    ]);
    const v = h.useRef(Sr(l) ? false : l);
    return S.jsx("input", {
      type: "checkbox",
      "aria-hidden": true,
      defaultChecked: c ?? v.current,
      ...d,
      tabIndex: -1,
      ref: p,
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
  function Sr(n) {
    return n === "indeterminate";
  }
  function Qp(n) {
    return Sr(n) ? "indeterminate" : n ? "checked" : "unchecked";
  }
  var Yp = $p, y0 = Kp;
  const Wi = h.forwardRef(({ className: n, ...i }, l) => S.jsx(Yp, {
    ref: l,
    className: Ir("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", n),
    ...i,
    children: S.jsx(y0, {
      className: Ir("flex items-center justify-center text-current"),
      children: S.jsx(Vw, {
        className: "h-4 w-4"
      })
    })
  }));
  Wi.displayName = Yp.displayName;
  function vf(n) {
    const i = new URL(document.location.toString());
    return i.searchParams.set("ticket", n), i.toString();
  }
  function w0({ onClose: n, channel: i, getTicket: l }) {
    const [a, c] = h.useState({
      includeMyself: true,
      includeBootstrap: true,
      includeNeighbors: false
    }), d = h.useMemo(() => l(a), [
      a,
      i
    ]), p = h.useRef(null);
    function m(v) {
      navigator.clipboard.writeText(v);
    }
    const g = `cargo run -- join ${d}`;
    return S.jsx("div", {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
      children: S.jsxs("div", {
        className: "bg-background text-foreground p-6 rounded-lg w-full max-w-md shadow-lg border-2 border-primary/10",
        children: [
          S.jsx("h2", {
            className: "text-xl font-semibold mb-4",
            children: "Invite to Channel"
          }),
          S.jsxs("div", {
            className: "mb-4",
            children: [
              S.jsx("p", {
                className: "font-semibold mb-2",
                children: "Ticket:"
              }),
              S.jsxs("div", {
                className: "flex items-center",
                children: [
                  S.jsxs("span", {
                    className: "mr-2",
                    children: [
                      d.substring(0, 8),
                      "..."
                    ]
                  }),
                  S.jsxs(He, {
                    variant: "outline",
                    size: "sm",
                    onClick: () => m(d),
                    children: [
                      S.jsx(pf, {
                        className: "w-4 h-4 mr-2"
                      }),
                      "Copy"
                    ]
                  })
                ]
              })
            ]
          }),
          S.jsxs("div", {
            className: "mb-4",
            children: [
              S.jsx("p", {
                className: "font-semibold mb-2",
                children: "Join Link:"
              }),
              S.jsxs("a", {
                href: vf(d),
                className: "text-blue-500 hover:underline",
                target: "_blank",
                children: [
                  vf(d.substring(0, 8)),
                  "..."
                ]
              })
            ]
          }),
          S.jsxs("div", {
            className: "mb-4",
            children: [
              S.jsx("p", {
                className: "font-semibold mb-2",
                children: "Join from CLI:"
              }),
              S.jsx(go, {
                ref: p,
                value: g,
                readOnly: true,
                className: "mb-2",
                onClick: () => {
                  var _a2;
                  return (_a2 = p.current) == null ? void 0 : _a2.select();
                }
              }),
              S.jsxs(He, {
                variant: "outline",
                size: "sm",
                onClick: () => m(g),
                children: [
                  S.jsx(pf, {
                    className: "w-4 h-4 mr-2"
                  }),
                  "Copy to Clipboard"
                ]
              })
            ]
          }),
          S.jsxs("div", {
            className: "mb-4",
            children: [
              S.jsx("h3", {
                className: "font-semibold mb-2",
                children: "Configure Ticket:"
              }),
              S.jsxs("div", {
                className: "space-y-2",
                children: [
                  S.jsxs("div", {
                    className: "flex items-center",
                    children: [
                      S.jsx(Wi, {
                        id: "include-myself",
                        checked: a.includeMyself,
                        onCheckedChange: (v) => c({
                          ...a,
                          includeMyself: !!v
                        })
                      }),
                      S.jsx("label", {
                        htmlFor: "include-myself",
                        className: "ml-2",
                        children: "Include myself"
                      })
                    ]
                  }),
                  S.jsxs("div", {
                    className: "flex items-center",
                    children: [
                      S.jsx(Wi, {
                        id: "include-bootstrap",
                        checked: a.includeBootstrap,
                        onCheckedChange: (v) => c({
                          ...a,
                          includeBootstrap: !!v
                        })
                      }),
                      S.jsx("label", {
                        htmlFor: "include-bootstrap",
                        className: "ml-2",
                        children: "Include my bootstrap"
                      })
                    ]
                  }),
                  S.jsxs("div", {
                    className: "flex items-center",
                    children: [
                      S.jsx(Wi, {
                        id: "include-neighbors",
                        checked: a.includeNeighbors,
                        onCheckedChange: (v) => c({
                          ...a,
                          includeNeighbors: !!v
                        })
                      }),
                      S.jsx("label", {
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
          S.jsx("div", {
            className: "flex justify-end",
            children: S.jsx(He, {
              onClick: n,
              children: "Close"
            })
          })
        ]
      })
    });
  }
  const S0 = "modulepreload", x0 = function(n, i) {
    return new URL(n, i).href;
  }, yf = {}, k0 = function(i, l, a) {
    let c = Promise.resolve();
    if (l && l.length > 0) {
      const p = document.getElementsByTagName("link"), m = document.querySelector("meta[property=csp-nonce]"), g = (m == null ? void 0 : m.nonce) || (m == null ? void 0 : m.getAttribute("nonce"));
      c = Promise.allSettled(l.map((v) => {
        if (v = x0(v, a), v in yf) return;
        yf[v] = true;
        const w = v.endsWith(".css"), C = w ? '[rel="stylesheet"]' : "";
        if (!!a) for (let A = p.length - 1; A >= 0; A--) {
          const b = p[A];
          if (b.href === v && (!w || b.rel === "stylesheet")) return;
        }
        else if (document.querySelector(`link[href="${v}"]${C}`)) return;
        const P = document.createElement("link");
        if (P.rel = w ? "stylesheet" : S0, w || (P.as = "script"), P.crossOrigin = "", P.href = v, g && P.setAttribute("nonce", g), document.head.appendChild(P), w) return new Promise((A, b) => {
          P.addEventListener("load", A), P.addEventListener("error", () => b(new Error(`Unable to preload CSS for ${v}`)));
        });
      }));
    }
    function d(p) {
      const m = new Event("vite:preloadError", {
        cancelable: true
      });
      if (m.payload = p, window.dispatchEvent(m), !m.defaultPrevented) throw p;
    }
    return c.then((p) => {
      for (const m of p || []) m.status === "rejected" && d(m.reason);
      return i().catch(d);
    });
  }, C0 = b0();
  async function P0() {
    return await C0;
  }
  async function b0() {
    try {
      yt.info("Importing WASM module");
      const { IrohAPI: n } = await k0(async () => {
        const { IrohAPI: i } = await import("./iroh-DV7HvjDq.js").then(async (m) => {
          await m.__tla;
          return m;
        });
        return {
          IrohAPI: i
        };
      }, [], import.meta.url);
      return await n.create();
    } catch (n) {
      throw yt.error("Failed to import or launch iroh", n), n;
    }
  }
  const wf = [
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
  ], E0 = [
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
  ], T0 = [
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
  ], Sf = (n) => Math.floor(Math.random() * n);
  function R0({ the: n = false, titleize: i = false, separator: l } = {}) {
    const a = n ? "the " : "", c = E0.concat(T0);
    let d = `${wf[Sf(wf.length)]} ${c[Sf(c.length)]}`.toLowerCase();
    return i && (d = d.replace(/(?:^|\s|-)\S/g, (p) => p.toUpperCase())), typeof l == "string" ? d = d.split(" ").join(l) : l || (d = d.split(" ").join("")), a + d;
  }
  function M0() {
    const [n, i] = h.useState(null), [l, a] = h.useState(null);
    return h.useEffect(() => {
      P0().then(i).catch((c) => a(c.toString()));
    }, []), S.jsx(i0, {
      attribute: "class",
      defaultTheme: "system",
      enableSystem: true,
      children: S.jsxs("div", {
        className: "flex h-screen",
        children: [
          !n && S.jsxs(A0, {
            children: [
              !l && S.jsxs("div", {
                className: "text-center",
                children: [
                  "Spawning Iroh\u2026",
                  S.jsx("br", {}),
                  S.jsx(N0, {})
                ]
              }),
              l && S.jsx("div", {
                children: l
              })
            ]
          }),
          n && S.jsx(L0, {
            api: n
          })
        ]
      })
    });
  }
  function N0() {
    return S.jsxs("svg", {
      className: "inline-block h-5 w-5 animate-spin",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      children: [
        S.jsx("circle", {
          className: "opacity-25",
          cx: "12",
          cy: "12",
          r: "10",
          stroke: "currentColor",
          strokeWidth: "4"
        }),
        S.jsx("path", {
          className: "opacity-75",
          fill: "currentColor",
          d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        })
      ]
    });
  }
  function A0({ children: n }) {
    const [i, l] = h.useState(false);
    return S.jsxs("div", {
      className: "flex flex-col flex-grow",
      children: [
        S.jsx(Up, {
          onLogsClick: () => l(!i)
        }),
        i && S.jsx(Vp, {
          onClose: () => l(false)
        }),
        S.jsx("div", {
          className: "flex items-center justify-center",
          children: n
        })
      ]
    });
  }
  function L0({ api: n }) {
    var _a2, _b;
    const [i, l] = h.useState("home"), [a, c] = h.useState([]), [d, p] = h.useState(null), [m, g] = h.useState(false), [v, w] = h.useState(R0()), [C, x] = h.useState(false), [P, A] = h.useState(false), b = async (O) => {
      try {
        const j = await n.joinChannel(O, v);
        c(($) => [
          ...$,
          j
        ]), p(j.id), l("chat");
      } catch (j) {
        yt.error("Failed to join channel", j);
      }
    }, M = async () => {
      try {
        const O = await n.createChannel(v);
        c((j) => [
          ...j,
          O
        ]), p(O.id), l("chat");
      } catch (O) {
        yt.error("Failed to create channel", O);
      }
    }, _ = async (O) => {
      try {
        await n.closeChannel(O), c((j) => j.filter(($) => $.id !== O)), d === O && (p(a.length > 1 ? a[0].id : null), a.length === 1 && l("home"));
      } catch (j) {
        yt.error("Failed to close channel", j);
      }
    }, W = () => {
      l("home"), A(true);
    };
    let U;
    return d && (U = "#" + ((_a2 = a.find((O) => O.id === d)) == null ? void 0 : _a2.name)), S.jsxs(S.Fragment, {
      children: [
        (i === "chat" || P) && S.jsx(f0, {
          channels: a,
          activeChannel: d,
          onChannelSelect: (O) => {
            p(O), l("chat");
          },
          onNewChannel: W
        }),
        S.jsxs("div", {
          className: "flex flex-col flex-grow",
          children: [
            S.jsx(Up, {
              onLogsClick: () => g(!m),
              title: U,
              onInviteClick: d ? () => x(true) : void 0
            }),
            i === "home" && S.jsx(Wg, {
              name: v,
              onSetName: w,
              onJoin: (O) => {
                b(O), A(false);
              },
              onCreate: () => {
                M(), A(false);
              }
            }),
            i === "chat" && d && S.jsx(e0, {
              api: n,
              channel: d,
              onClose: () => _(d)
            }),
            m && S.jsx(Vp, {
              onClose: () => g(false)
            }),
            C && d && S.jsx(w0, {
              onClose: () => x(false),
              channel: ((_b = a.find((O) => O.id === d)) == null ? void 0 : _b.name) || "",
              getTicket: (O) => n.getTicket(d, O)
            })
          ]
        })
      ]
    });
  }
  rg.createRoot(document.getElementById("root")).render(S.jsx(h.StrictMode, {
    children: S.jsx(M0, {})
  }));
})();
export {
  __tla,
  yt as l
};
