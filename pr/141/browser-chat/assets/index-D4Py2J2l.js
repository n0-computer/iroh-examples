var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
let Vm, an;
let __tla = (async () => {
  function Iv(n, o) {
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
  function Ep(n) {
    return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
  }
  var Hs = {
    exports: {}
  }, Xo = {}, $s = {
    exports: {}
  }, ke = {};
  var Nf;
  function Wv() {
    if (Nf) return ke;
    Nf = 1;
    var n = Symbol.for("react.element"), o = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), f = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), S = Symbol.iterator;
    function x(T) {
      return T === null || typeof T != "object" ? null : (T = S && T[S] || T["@@iterator"], typeof T == "function" ? T : null);
    }
    var b = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    }, A = Object.assign, k = {};
    function P(T, I, fe) {
      this.props = T, this.context = I, this.refs = k, this.updater = fe || b;
    }
    P.prototype.isReactComponent = {}, P.prototype.setState = function(T, I) {
      if (typeof T != "object" && typeof T != "function" && T != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, T, I, "setState");
    }, P.prototype.forceUpdate = function(T) {
      this.updater.enqueueForceUpdate(this, T, "forceUpdate");
    };
    function N() {
    }
    N.prototype = P.prototype;
    function L(T, I, fe) {
      this.props = T, this.context = I, this.refs = k, this.updater = fe || b;
    }
    var z = L.prototype = new N();
    z.constructor = L, A(z, P.prototype), z.isPureReactComponent = true;
    var O = Array.isArray, F = Object.prototype.hasOwnProperty, G = {
      current: null
    }, _ = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    function Y(T, I, fe) {
      var me, we = {}, xe = null, Se = null;
      if (I != null) for (me in I.ref !== void 0 && (Se = I.ref), I.key !== void 0 && (xe = "" + I.key), I) F.call(I, me) && !_.hasOwnProperty(me) && (we[me] = I[me]);
      var Ce = arguments.length - 2;
      if (Ce === 1) we.children = fe;
      else if (1 < Ce) {
        for (var Te = Array(Ce), Ke = 0; Ke < Ce; Ke++) Te[Ke] = arguments[Ke + 2];
        we.children = Te;
      }
      if (T && T.defaultProps) for (me in Ce = T.defaultProps, Ce) we[me] === void 0 && (we[me] = Ce[me]);
      return {
        $$typeof: n,
        type: T,
        key: xe,
        ref: Se,
        props: we,
        _owner: G.current
      };
    }
    function U(T, I) {
      return {
        $$typeof: n,
        type: T.type,
        key: I,
        ref: T.ref,
        props: T.props,
        _owner: T._owner
      };
    }
    function ee(T) {
      return typeof T == "object" && T !== null && T.$$typeof === n;
    }
    function le(T) {
      var I = {
        "=": "=0",
        ":": "=2"
      };
      return "$" + T.replace(/[=:]/g, function(fe) {
        return I[fe];
      });
    }
    var Z = /\/+/g;
    function Q(T, I) {
      return typeof T == "object" && T !== null && T.key != null ? le("" + T.key) : I.toString(36);
    }
    function ae(T, I, fe, me, we) {
      var xe = typeof T;
      (xe === "undefined" || xe === "boolean") && (T = null);
      var Se = false;
      if (T === null) Se = true;
      else switch (xe) {
        case "string":
        case "number":
          Se = true;
          break;
        case "object":
          switch (T.$$typeof) {
            case n:
            case o:
              Se = true;
          }
      }
      if (Se) return Se = T, we = we(Se), T = me === "" ? "." + Q(Se, 0) : me, O(we) ? (fe = "", T != null && (fe = T.replace(Z, "$&/") + "/"), ae(we, I, fe, "", function(Ke) {
        return Ke;
      })) : we != null && (ee(we) && (we = U(we, fe + (!we.key || Se && Se.key === we.key ? "" : ("" + we.key).replace(Z, "$&/") + "/") + T)), I.push(we)), 1;
      if (Se = 0, me = me === "" ? "." : me + ":", O(T)) for (var Ce = 0; Ce < T.length; Ce++) {
        xe = T[Ce];
        var Te = me + Q(xe, Ce);
        Se += ae(xe, I, fe, Te, we);
      }
      else if (Te = x(T), typeof Te == "function") for (T = Te.call(T), Ce = 0; !(xe = T.next()).done; ) xe = xe.value, Te = me + Q(xe, Ce++), Se += ae(xe, I, fe, Te, we);
      else if (xe === "object") throw I = String(T), Error("Objects are not valid as a React child (found: " + (I === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : I) + "). If you meant to render a collection of children, use an array instead.");
      return Se;
    }
    function ge(T, I, fe) {
      if (T == null) return T;
      var me = [], we = 0;
      return ae(T, me, "", "", function(xe) {
        return I.call(fe, xe, we++);
      }), me;
    }
    function se(T) {
      if (T._status === -1) {
        var I = T._result;
        I = I(), I.then(function(fe) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = fe);
        }, function(fe) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = fe);
        }), T._status === -1 && (T._status = 0, T._result = I);
      }
      if (T._status === 1) return T._result.default;
      throw T._result;
    }
    var oe = {
      current: null
    }, B = {
      transition: null
    }, X = {
      ReactCurrentDispatcher: oe,
      ReactCurrentBatchConfig: B,
      ReactCurrentOwner: G
    };
    function K() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    return ke.Children = {
      map: ge,
      forEach: function(T, I, fe) {
        ge(T, function() {
          I.apply(this, arguments);
        }, fe);
      },
      count: function(T) {
        var I = 0;
        return ge(T, function() {
          I++;
        }), I;
      },
      toArray: function(T) {
        return ge(T, function(I) {
          return I;
        }) || [];
      },
      only: function(T) {
        if (!ee(T)) throw Error("React.Children.only expected to receive a single React element child.");
        return T;
      }
    }, ke.Component = P, ke.Fragment = l, ke.Profiler = u, ke.PureComponent = L, ke.StrictMode = a, ke.Suspense = v, ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = X, ke.act = K, ke.cloneElement = function(T, I, fe) {
      if (T == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + T + ".");
      var me = A({}, T.props), we = T.key, xe = T.ref, Se = T._owner;
      if (I != null) {
        if (I.ref !== void 0 && (xe = I.ref, Se = G.current), I.key !== void 0 && (we = "" + I.key), T.type && T.type.defaultProps) var Ce = T.type.defaultProps;
        for (Te in I) F.call(I, Te) && !_.hasOwnProperty(Te) && (me[Te] = I[Te] === void 0 && Ce !== void 0 ? Ce[Te] : I[Te]);
      }
      var Te = arguments.length - 2;
      if (Te === 1) me.children = fe;
      else if (1 < Te) {
        Ce = Array(Te);
        for (var Ke = 0; Ke < Te; Ke++) Ce[Ke] = arguments[Ke + 2];
        me.children = Ce;
      }
      return {
        $$typeof: n,
        type: T.type,
        key: we,
        ref: xe,
        props: me,
        _owner: Se
      };
    }, ke.createContext = function(T) {
      return T = {
        $$typeof: f,
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
    }, ke.createElement = Y, ke.createFactory = function(T) {
      var I = Y.bind(null, T);
      return I.type = T, I;
    }, ke.createRef = function() {
      return {
        current: null
      };
    }, ke.forwardRef = function(T) {
      return {
        $$typeof: p,
        render: T
      };
    }, ke.isValidElement = ee, ke.lazy = function(T) {
      return {
        $$typeof: w,
        _payload: {
          _status: -1,
          _result: T
        },
        _init: se
      };
    }, ke.memo = function(T, I) {
      return {
        $$typeof: y,
        type: T,
        compare: I === void 0 ? null : I
      };
    }, ke.startTransition = function(T) {
      var I = B.transition;
      B.transition = {};
      try {
        T();
      } finally {
        B.transition = I;
      }
    }, ke.unstable_act = K, ke.useCallback = function(T, I) {
      return oe.current.useCallback(T, I);
    }, ke.useContext = function(T) {
      return oe.current.useContext(T);
    }, ke.useDebugValue = function() {
    }, ke.useDeferredValue = function(T) {
      return oe.current.useDeferredValue(T);
    }, ke.useEffect = function(T, I) {
      return oe.current.useEffect(T, I);
    }, ke.useId = function() {
      return oe.current.useId();
    }, ke.useImperativeHandle = function(T, I, fe) {
      return oe.current.useImperativeHandle(T, I, fe);
    }, ke.useInsertionEffect = function(T, I) {
      return oe.current.useInsertionEffect(T, I);
    }, ke.useLayoutEffect = function(T, I) {
      return oe.current.useLayoutEffect(T, I);
    }, ke.useMemo = function(T, I) {
      return oe.current.useMemo(T, I);
    }, ke.useReducer = function(T, I, fe) {
      return oe.current.useReducer(T, I, fe);
    }, ke.useRef = function(T) {
      return oe.current.useRef(T);
    }, ke.useState = function(T) {
      return oe.current.useState(T);
    }, ke.useSyncExternalStore = function(T, I, fe) {
      return oe.current.useSyncExternalStore(T, I, fe);
    }, ke.useTransition = function() {
      return oe.current.useTransition();
    }, ke.version = "18.3.1", ke;
  }
  var Mf;
  function yu() {
    return Mf || (Mf = 1, $s.exports = Wv()), $s.exports;
  }
  var Af;
  function Hv() {
    if (Af) return Xo;
    Af = 1;
    var n = yu(), o = Symbol.for("react.element"), l = Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, u = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    function f(p, v, y) {
      var w, S = {}, x = null, b = null;
      y !== void 0 && (x = "" + y), v.key !== void 0 && (x = "" + v.key), v.ref !== void 0 && (b = v.ref);
      for (w in v) a.call(v, w) && !d.hasOwnProperty(w) && (S[w] = v[w]);
      if (p && p.defaultProps) for (w in v = p.defaultProps, v) S[w] === void 0 && (S[w] = v[w]);
      return {
        $$typeof: o,
        type: p,
        key: x,
        ref: b,
        props: S,
        _owner: u.current
      };
    }
    return Xo.Fragment = l, Xo.jsx = f, Xo.jsxs = f, Xo;
  }
  var Df;
  function $v() {
    return Df || (Df = 1, Hs.exports = Hv()), Hs.exports;
  }
  var h = $v(), g = yu();
  const J = Ep(g), Uv = Iv({
    __proto__: null,
    default: J
  }, [
    g
  ]);
  var bl = {}, Us = {
    exports: {}
  }, xt = {}, Vs = {
    exports: {}
  }, Gs = {};
  var Of;
  function Vv() {
    return Of || (Of = 1, function(n) {
      function o(B, X) {
        var K = B.length;
        B.push(X);
        e: for (; 0 < K; ) {
          var T = K - 1 >>> 1, I = B[T];
          if (0 < u(I, X)) B[T] = X, B[K] = I, K = T;
          else break e;
        }
      }
      function l(B) {
        return B.length === 0 ? null : B[0];
      }
      function a(B) {
        if (B.length === 0) return null;
        var X = B[0], K = B.pop();
        if (K !== X) {
          B[0] = K;
          e: for (var T = 0, I = B.length, fe = I >>> 1; T < fe; ) {
            var me = 2 * (T + 1) - 1, we = B[me], xe = me + 1, Se = B[xe];
            if (0 > u(we, K)) xe < I && 0 > u(Se, we) ? (B[T] = Se, B[xe] = K, T = xe) : (B[T] = we, B[me] = K, T = me);
            else if (xe < I && 0 > u(Se, K)) B[T] = Se, B[xe] = K, T = xe;
            else break e;
          }
        }
        return X;
      }
      function u(B, X) {
        var K = B.sortIndex - X.sortIndex;
        return K !== 0 ? K : B.id - X.id;
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
      var v = [], y = [], w = 1, S = null, x = 3, b = false, A = false, k = false, P = typeof setTimeout == "function" ? setTimeout : null, N = typeof clearTimeout == "function" ? clearTimeout : null, L = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function z(B) {
        for (var X = l(y); X !== null; ) {
          if (X.callback === null) a(y);
          else if (X.startTime <= B) a(y), X.sortIndex = X.expirationTime, o(v, X);
          else break;
          X = l(y);
        }
      }
      function O(B) {
        if (k = false, z(B), !A) if (l(v) !== null) A = true, se(F);
        else {
          var X = l(y);
          X !== null && oe(O, X.startTime - B);
        }
      }
      function F(B, X) {
        A = false, k && (k = false, N(Y), Y = -1), b = true;
        var K = x;
        try {
          for (z(X), S = l(v); S !== null && (!(S.expirationTime > X) || B && !le()); ) {
            var T = S.callback;
            if (typeof T == "function") {
              S.callback = null, x = S.priorityLevel;
              var I = T(S.expirationTime <= X);
              X = n.unstable_now(), typeof I == "function" ? S.callback = I : S === l(v) && a(v), z(X);
            } else a(v);
            S = l(v);
          }
          if (S !== null) var fe = true;
          else {
            var me = l(y);
            me !== null && oe(O, me.startTime - X), fe = false;
          }
          return fe;
        } finally {
          S = null, x = K, b = false;
        }
      }
      var G = false, _ = null, Y = -1, U = 5, ee = -1;
      function le() {
        return !(n.unstable_now() - ee < U);
      }
      function Z() {
        if (_ !== null) {
          var B = n.unstable_now();
          ee = B;
          var X = true;
          try {
            X = _(true, B);
          } finally {
            X ? Q() : (G = false, _ = null);
          }
        } else G = false;
      }
      var Q;
      if (typeof L == "function") Q = function() {
        L(Z);
      };
      else if (typeof MessageChannel < "u") {
        var ae = new MessageChannel(), ge = ae.port2;
        ae.port1.onmessage = Z, Q = function() {
          ge.postMessage(null);
        };
      } else Q = function() {
        P(Z, 0);
      };
      function se(B) {
        _ = B, G || (G = true, Q());
      }
      function oe(B, X) {
        Y = P(function() {
          B(n.unstable_now());
        }, X);
      }
      n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(B) {
        B.callback = null;
      }, n.unstable_continueExecution = function() {
        A || b || (A = true, se(F));
      }, n.unstable_forceFrameRate = function(B) {
        0 > B || 125 < B ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : U = 0 < B ? Math.floor(1e3 / B) : 5;
      }, n.unstable_getCurrentPriorityLevel = function() {
        return x;
      }, n.unstable_getFirstCallbackNode = function() {
        return l(v);
      }, n.unstable_next = function(B) {
        switch (x) {
          case 1:
          case 2:
          case 3:
            var X = 3;
            break;
          default:
            X = x;
        }
        var K = x;
        x = X;
        try {
          return B();
        } finally {
          x = K;
        }
      }, n.unstable_pauseExecution = function() {
      }, n.unstable_requestPaint = function() {
      }, n.unstable_runWithPriority = function(B, X) {
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
        var K = x;
        x = B;
        try {
          return X();
        } finally {
          x = K;
        }
      }, n.unstable_scheduleCallback = function(B, X, K) {
        var T = n.unstable_now();
        switch (typeof K == "object" && K !== null ? (K = K.delay, K = typeof K == "number" && 0 < K ? T + K : T) : K = T, B) {
          case 1:
            var I = -1;
            break;
          case 2:
            I = 250;
            break;
          case 5:
            I = 1073741823;
            break;
          case 4:
            I = 1e4;
            break;
          default:
            I = 5e3;
        }
        return I = K + I, B = {
          id: w++,
          callback: X,
          priorityLevel: B,
          startTime: K,
          expirationTime: I,
          sortIndex: -1
        }, K > T ? (B.sortIndex = K, o(y, B), l(v) === null && B === l(y) && (k ? (N(Y), Y = -1) : k = true, oe(O, K - T))) : (B.sortIndex = I, o(v, B), A || b || (A = true, se(F))), B;
      }, n.unstable_shouldYield = le, n.unstable_wrapCallback = function(B) {
        var X = x;
        return function() {
          var K = x;
          x = X;
          try {
            return B.apply(this, arguments);
          } finally {
            x = K;
          }
        };
      };
    }(Gs)), Gs;
  }
  var jf;
  function Gv() {
    return jf || (jf = 1, Vs.exports = Vv()), Vs.exports;
  }
  var _f;
  function Kv() {
    if (_f) return xt;
    _f = 1;
    var n = yu(), o = Gv();
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
    var p = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), v = Object.prototype.hasOwnProperty, y = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, w = {}, S = {};
    function x(e) {
      return v.call(S, e) ? true : v.call(w, e) ? false : y.test(e) ? S[e] = true : (w[e] = true, false);
    }
    function b(e, t, r, i) {
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
    function A(e, t, r, i) {
      if (t === null || typeof t > "u" || b(e, t, r, i)) return true;
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
    function k(e, t, r, i, s, c, m) {
      this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = i, this.attributeNamespace = s, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = c, this.removeEmptyString = m;
    }
    var P = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
      P[e] = new k(e, 0, false, e, null, false, false);
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
      P[t] = new k(t, 1, false, e[1], null, false, false);
    }), [
      "contentEditable",
      "draggable",
      "spellCheck",
      "value"
    ].forEach(function(e) {
      P[e] = new k(e, 2, false, e.toLowerCase(), null, false, false);
    }), [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha"
    ].forEach(function(e) {
      P[e] = new k(e, 2, false, e, null, false, false);
    }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
      P[e] = new k(e, 3, false, e.toLowerCase(), null, false, false);
    }), [
      "checked",
      "multiple",
      "muted",
      "selected"
    ].forEach(function(e) {
      P[e] = new k(e, 3, true, e, null, false, false);
    }), [
      "capture",
      "download"
    ].forEach(function(e) {
      P[e] = new k(e, 4, false, e, null, false, false);
    }), [
      "cols",
      "rows",
      "size",
      "span"
    ].forEach(function(e) {
      P[e] = new k(e, 6, false, e, null, false, false);
    }), [
      "rowSpan",
      "start"
    ].forEach(function(e) {
      P[e] = new k(e, 5, false, e.toLowerCase(), null, false, false);
    });
    var N = /[\-:]([a-z])/g;
    function L(e) {
      return e[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
      var t = e.replace(N, L);
      P[t] = new k(t, 1, false, e, null, false, false);
    }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
      var t = e.replace(N, L);
      P[t] = new k(t, 1, false, e, "http://www.w3.org/1999/xlink", false, false);
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
    ].forEach(function(e) {
      var t = e.replace(N, L);
      P[t] = new k(t, 1, false, e, "http://www.w3.org/XML/1998/namespace", false, false);
    }), [
      "tabIndex",
      "crossOrigin"
    ].forEach(function(e) {
      P[e] = new k(e, 1, false, e.toLowerCase(), null, false, false);
    }), P.xlinkHref = new k("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false), [
      "src",
      "href",
      "action",
      "formAction"
    ].forEach(function(e) {
      P[e] = new k(e, 1, false, e.toLowerCase(), null, true, true);
    });
    function z(e, t, r, i) {
      var s = P.hasOwnProperty(t) ? P[t] : null;
      (s !== null ? s.type !== 0 : i || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (A(t, r, s, i) && (r = null), i || s === null ? x(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r)) : s.mustUseProperty ? e[s.propertyName] = r === null ? s.type === 3 ? false : "" : r : (t = s.attributeName, i = s.attributeNamespace, r === null ? e.removeAttribute(t) : (s = s.type, r = s === 3 || s === 4 && r === true ? "" : "" + r, i ? e.setAttributeNS(i, t, r) : e.setAttribute(t, r))));
    }
    var O = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, F = Symbol.for("react.element"), G = Symbol.for("react.portal"), _ = Symbol.for("react.fragment"), Y = Symbol.for("react.strict_mode"), U = Symbol.for("react.profiler"), ee = Symbol.for("react.provider"), le = Symbol.for("react.context"), Z = Symbol.for("react.forward_ref"), Q = Symbol.for("react.suspense"), ae = Symbol.for("react.suspense_list"), ge = Symbol.for("react.memo"), se = Symbol.for("react.lazy"), oe = Symbol.for("react.offscreen"), B = Symbol.iterator;
    function X(e) {
      return e === null || typeof e != "object" ? null : (e = B && e[B] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var K = Object.assign, T;
    function I(e) {
      if (T === void 0) try {
        throw Error();
      } catch (r) {
        var t = r.stack.trim().match(/\n( *(at )?)/);
        T = t && t[1] || "";
      }
      return `
` + T + e;
    }
    var fe = false;
    function me(e, t) {
      if (!e || fe) return "";
      fe = true;
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
          } catch (j) {
            var i = j;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (j) {
            i = j;
          }
          e.call(t.prototype);
        }
        else {
          try {
            throw Error();
          } catch (j) {
            i = j;
          }
          e();
        }
      } catch (j) {
        if (j && i && typeof j.stack == "string") {
          for (var s = j.stack.split(`
`), c = i.stack.split(`
`), m = s.length - 1, C = c.length - 1; 1 <= m && 0 <= C && s[m] !== c[C]; ) C--;
          for (; 1 <= m && 0 <= C; m--, C--) if (s[m] !== c[C]) {
            if (m !== 1 || C !== 1) do
              if (m--, C--, 0 > C || s[m] !== c[C]) {
                var E = `
` + s[m].replace(" at new ", " at ");
                return e.displayName && E.includes("<anonymous>") && (E = E.replace("<anonymous>", e.displayName)), E;
              }
            while (1 <= m && 0 <= C);
            break;
          }
        }
      } finally {
        fe = false, Error.prepareStackTrace = r;
      }
      return (e = e ? e.displayName || e.name : "") ? I(e) : "";
    }
    function we(e) {
      switch (e.tag) {
        case 5:
          return I(e.type);
        case 16:
          return I("Lazy");
        case 13:
          return I("Suspense");
        case 19:
          return I("SuspenseList");
        case 0:
        case 2:
        case 15:
          return e = me(e.type, false), e;
        case 11:
          return e = me(e.type.render, false), e;
        case 1:
          return e = me(e.type, true), e;
        default:
          return "";
      }
    }
    function xe(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case _:
          return "Fragment";
        case G:
          return "Portal";
        case U:
          return "Profiler";
        case Y:
          return "StrictMode";
        case Q:
          return "Suspense";
        case ae:
          return "SuspenseList";
      }
      if (typeof e == "object") switch (e.$$typeof) {
        case le:
          return (e.displayName || "Context") + ".Consumer";
        case ee:
          return (e._context.displayName || "Context") + ".Provider";
        case Z:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ge:
          return t = e.displayName || null, t !== null ? t : xe(e.type) || "Memo";
        case se:
          t = e._payload, e = e._init;
          try {
            return xe(e(t));
          } catch {
          }
      }
      return null;
    }
    function Se(e) {
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
          return xe(t);
        case 8:
          return t === Y ? "StrictMode" : "Mode";
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
    function Ce(e) {
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
    function Te(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Ke(e) {
      var t = Te(e) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), i = "" + e[t];
      if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
        var s = r.get, c = r.set;
        return Object.defineProperty(e, t, {
          configurable: true,
          get: function() {
            return s.call(this);
          },
          set: function(m) {
            i = "" + m, c.call(this, m);
          }
        }), Object.defineProperty(e, t, {
          enumerable: r.enumerable
        }), {
          getValue: function() {
            return i;
          },
          setValue: function(m) {
            i = "" + m;
          },
          stopTracking: function() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }
    function Ct(e) {
      e._valueTracker || (e._valueTracker = Ke(e));
    }
    function nr(e) {
      if (!e) return false;
      var t = e._valueTracker;
      if (!t) return true;
      var r = t.getValue(), i = "";
      return e && (i = Te(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== r ? (t.setValue(e), true) : false;
    }
    function Nt(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function he(e, t) {
      var r = t.checked;
      return K({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: r ?? e._wrapperState.initialChecked
      });
    }
    function io(e, t) {
      var r = t.defaultValue == null ? "" : t.defaultValue, i = t.checked != null ? t.checked : t.defaultChecked;
      r = Ce(t.value != null ? t.value : r), e._wrapperState = {
        initialChecked: i,
        initialValue: r,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
      };
    }
    function lo(e, t) {
      t = t.checked, t != null && z(e, "checked", t, false);
    }
    function rr(e, t) {
      lo(e, t);
      var r = Ce(t.value), i = t.type;
      if (r != null) i === "number" ? (r === 0 && e.value === "" || e.value != r) && (e.value = "" + r) : e.value !== "" + r && (e.value = "" + r);
      else if (i === "submit" || i === "reset") {
        e.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? ao(e, t.type, r) : t.hasOwnProperty("defaultValue") && ao(e, t.type, Ce(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
    }
    function fi(e, t, r) {
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var i = t.type;
        if (!(i !== "submit" && i !== "reset" || t.value !== void 0 && t.value !== null)) return;
        t = "" + e._wrapperState.initialValue, r || t === e.value || (e.value = t), e.defaultValue = t;
      }
      r = e.name, r !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, r !== "" && (e.name = r);
    }
    function ao(e, t, r) {
      (t !== "number" || Nt(e.ownerDocument) !== e) && (r == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
    }
    var Mt = Array.isArray;
    function dn(e, t, r, i) {
      if (e = e.options, t) {
        t = {};
        for (var s = 0; s < r.length; s++) t["$" + r[s]] = true;
        for (r = 0; r < e.length; r++) s = t.hasOwnProperty("$" + e[r].value), e[r].selected !== s && (e[r].selected = s), s && i && (e[r].defaultSelected = true);
      } else {
        for (r = "" + Ce(r), t = null, s = 0; s < e.length; s++) {
          if (e[s].value === r) {
            e[s].selected = true, i && (e[s].defaultSelected = true);
            return;
          }
          t !== null || e[s].disabled || (t = e[s]);
        }
        t !== null && (t.selected = true);
      }
    }
    function so(e, t) {
      if (t.dangerouslySetInnerHTML != null) throw Error(l(91));
      return K({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
      });
    }
    function bn(e, t) {
      var r = t.value;
      if (r == null) {
        if (r = t.children, t = t.defaultValue, r != null) {
          if (t != null) throw Error(l(92));
          if (Mt(r)) {
            if (1 < r.length) throw Error(l(93));
            r = r[0];
          }
          t = r;
        }
        t == null && (t = ""), r = t;
      }
      e._wrapperState = {
        initialValue: Ce(r)
      };
    }
    function pi(e, t) {
      var r = Ce(t.value), i = Ce(t.defaultValue);
      r != null && (r = "" + r, r !== e.value && (e.value = r), t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)), i != null && (e.defaultValue = "" + i);
    }
    function uo(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
    }
    function mi(e) {
      switch (e) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function co(e, t) {
      return e == null || e === "http://www.w3.org/1999/xhtml" ? mi(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
    }
    var fn, hi = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, i, s) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, r, i, s);
        });
      } : e;
    }(function(e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
      else {
        for (fn = fn || document.createElement("div"), fn.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = fn.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
    function En(e, t) {
      if (t) {
        var r = e.firstChild;
        if (r && r === e.lastChild && r.nodeType === 3) {
          r.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var or = {
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
    }, ir = [
      "Webkit",
      "ms",
      "Moz",
      "O"
    ];
    Object.keys(or).forEach(function(e) {
      ir.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1), or[t] = or[e];
      });
    });
    function fo(e, t, r) {
      return t == null || typeof t == "boolean" || t === "" ? "" : r || typeof t != "number" || t === 0 || or.hasOwnProperty(e) && or[e] ? ("" + t).trim() : t + "px";
    }
    function gi(e, t) {
      e = e.style;
      for (var r in t) if (t.hasOwnProperty(r)) {
        var i = r.indexOf("--") === 0, s = fo(r, t[r], i);
        r === "float" && (r = "cssFloat"), i ? e.setProperty(r, s) : e[r] = s;
      }
    }
    var la = K({
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
    function po(e, t) {
      if (t) {
        if (la[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(l(137, e));
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null) throw Error(l(60));
          if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(l(61));
        }
        if (t.style != null && typeof t.style != "object") throw Error(l(62));
      }
    }
    function mo(e, t) {
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
    var ho = null;
    function de(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    var be = null, Ee = null, ye = null;
    function je(e) {
      if (e = _o(e)) {
        if (typeof be != "function") throw Error(l(280));
        var t = e.stateNode;
        t && (t = Fi(t), be(e.stateNode, e.type, t));
      }
    }
    function rt(e) {
      Ee ? ye ? ye.push(e) : ye = [
        e
      ] : Ee = e;
    }
    function Je() {
      if (Ee) {
        var e = Ee, t = ye;
        if (ye = Ee = null, je(e), t) for (e = 0; e < t.length; e++) je(t[e]);
      }
    }
    function zt(e, t) {
      return e(t);
    }
    function mt() {
    }
    var Ft = false;
    function It(e, t, r) {
      if (Ft) return e(t, r);
      Ft = true;
      try {
        return zt(e, t, r);
      } finally {
        Ft = false, (Ee !== null || ye !== null) && (mt(), Je());
      }
    }
    function lt(e, t) {
      var r = e.stateNode;
      if (r === null) return null;
      var i = Fi(r);
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
    var Pn = false;
    if (p) try {
      var Rn = {};
      Object.defineProperty(Rn, "passive", {
        get: function() {
          Pn = true;
        }
      }), window.addEventListener("test", Rn, Rn), window.removeEventListener("test", Rn, Rn);
    } catch {
      Pn = false;
    }
    function Gh(e, t, r, i, s, c, m, C, E) {
      var j = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(r, j);
      } catch (H) {
        this.onError(H);
      }
    }
    var go = false, vi = null, yi = false, aa = null, Kh = {
      onError: function(e) {
        go = true, vi = e;
      }
    };
    function Yh(e, t, r, i, s, c, m, C, E) {
      go = false, vi = null, Gh.apply(Kh, arguments);
    }
    function Qh(e, t, r, i, s, c, m, C, E) {
      if (Yh.apply(this, arguments), go) {
        if (go) {
          var j = vi;
          go = false, vi = null;
        } else throw Error(l(198));
        yi || (yi = true, aa = j);
      }
    }
    function lr(e) {
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
    function qu(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function Ju(e) {
      if (lr(e) !== e) throw Error(l(188));
    }
    function Xh(e) {
      var t = e.alternate;
      if (!t) {
        if (t = lr(e), t === null) throw Error(l(188));
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
            if (c === r) return Ju(s), e;
            if (c === i) return Ju(s), t;
            c = c.sibling;
          }
          throw Error(l(188));
        }
        if (r.return !== i.return) r = s, i = c;
        else {
          for (var m = false, C = s.child; C; ) {
            if (C === r) {
              m = true, r = s, i = c;
              break;
            }
            if (C === i) {
              m = true, i = s, r = c;
              break;
            }
            C = C.sibling;
          }
          if (!m) {
            for (C = c.child; C; ) {
              if (C === r) {
                m = true, r = c, i = s;
                break;
              }
              if (C === i) {
                m = true, i = c, r = s;
                break;
              }
              C = C.sibling;
            }
            if (!m) throw Error(l(189));
          }
        }
        if (r.alternate !== i) throw Error(l(190));
      }
      if (r.tag !== 3) throw Error(l(188));
      return r.stateNode.current === r ? e : t;
    }
    function Zu(e) {
      return e = Xh(e), e !== null ? ec(e) : null;
    }
    function ec(e) {
      if (e.tag === 5 || e.tag === 6) return e;
      for (e = e.child; e !== null; ) {
        var t = ec(e);
        if (t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var tc = o.unstable_scheduleCallback, nc = o.unstable_cancelCallback, qh = o.unstable_shouldYield, Jh = o.unstable_requestPaint, He = o.unstable_now, Zh = o.unstable_getCurrentPriorityLevel, sa = o.unstable_ImmediatePriority, rc = o.unstable_UserBlockingPriority, wi = o.unstable_NormalPriority, eg = o.unstable_LowPriority, oc = o.unstable_IdlePriority, xi = null, Zt = null;
    function tg(e) {
      if (Zt && typeof Zt.onCommitFiberRoot == "function") try {
        Zt.onCommitFiberRoot(xi, e, void 0, (e.current.flags & 128) === 128);
      } catch {
      }
    }
    var Wt = Math.clz32 ? Math.clz32 : og, ng = Math.log, rg = Math.LN2;
    function og(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (ng(e) / rg | 0) | 0;
    }
    var Si = 64, Ci = 4194304;
    function vo(e) {
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
    function ki(e, t) {
      var r = e.pendingLanes;
      if (r === 0) return 0;
      var i = 0, s = e.suspendedLanes, c = e.pingedLanes, m = r & 268435455;
      if (m !== 0) {
        var C = m & ~s;
        C !== 0 ? i = vo(C) : (c &= m, c !== 0 && (i = vo(c)));
      } else m = r & ~s, m !== 0 ? i = vo(m) : c !== 0 && (i = vo(c));
      if (i === 0) return 0;
      if (t !== 0 && t !== i && !(t & s) && (s = i & -i, c = t & -t, s >= c || s === 16 && (c & 4194240) !== 0)) return t;
      if (i & 4 && (i |= r & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= i; 0 < t; ) r = 31 - Wt(t), s = 1 << r, i |= e[r], t &= ~s;
      return i;
    }
    function ig(e, t) {
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
    function lg(e, t) {
      for (var r = e.suspendedLanes, i = e.pingedLanes, s = e.expirationTimes, c = e.pendingLanes; 0 < c; ) {
        var m = 31 - Wt(c), C = 1 << m, E = s[m];
        E === -1 ? (!(C & r) || C & i) && (s[m] = ig(C, t)) : E <= t && (e.expiredLanes |= C), c &= ~C;
      }
    }
    function ua(e) {
      return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
    }
    function ic() {
      var e = Si;
      return Si <<= 1, !(Si & 4194240) && (Si = 64), e;
    }
    function ca(e) {
      for (var t = [], r = 0; 31 > r; r++) t.push(e);
      return t;
    }
    function yo(e, t, r) {
      e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Wt(t), e[t] = r;
    }
    function ag(e, t) {
      var r = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
      var i = e.eventTimes;
      for (e = e.expirationTimes; 0 < r; ) {
        var s = 31 - Wt(r), c = 1 << s;
        t[s] = 0, i[s] = -1, e[s] = -1, r &= ~c;
      }
    }
    function da(e, t) {
      var r = e.entangledLanes |= t;
      for (e = e.entanglements; r; ) {
        var i = 31 - Wt(r), s = 1 << i;
        s & t | e[i] & t && (e[i] |= t), r &= ~s;
      }
    }
    var Ne = 0;
    function lc(e) {
      return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
    }
    var ac, fa, sc, uc, cc, pa = false, bi = [], Tn = null, Nn = null, Mn = null, wo = /* @__PURE__ */ new Map(), xo = /* @__PURE__ */ new Map(), An = [], sg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function dc(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Tn = null;
          break;
        case "dragenter":
        case "dragleave":
          Nn = null;
          break;
        case "mouseover":
        case "mouseout":
          Mn = null;
          break;
        case "pointerover":
        case "pointerout":
          wo.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          xo.delete(t.pointerId);
      }
    }
    function So(e, t, r, i, s, c) {
      return e === null || e.nativeEvent !== c ? (e = {
        blockedOn: t,
        domEventName: r,
        eventSystemFlags: i,
        nativeEvent: c,
        targetContainers: [
          s
        ]
      }, t !== null && (t = _o(t), t !== null && fa(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
    }
    function ug(e, t, r, i, s) {
      switch (t) {
        case "focusin":
          return Tn = So(Tn, e, t, r, i, s), true;
        case "dragenter":
          return Nn = So(Nn, e, t, r, i, s), true;
        case "mouseover":
          return Mn = So(Mn, e, t, r, i, s), true;
        case "pointerover":
          var c = s.pointerId;
          return wo.set(c, So(wo.get(c) || null, e, t, r, i, s)), true;
        case "gotpointercapture":
          return c = s.pointerId, xo.set(c, So(xo.get(c) || null, e, t, r, i, s)), true;
      }
      return false;
    }
    function fc(e) {
      var t = ar(e.target);
      if (t !== null) {
        var r = lr(t);
        if (r !== null) {
          if (t = r.tag, t === 13) {
            if (t = qu(r), t !== null) {
              e.blockedOn = t, cc(e.priority, function() {
                sc(r);
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
    function Ei(e) {
      if (e.blockedOn !== null) return false;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var r = ha(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (r === null) {
          r = e.nativeEvent;
          var i = new r.constructor(r.type, r);
          ho = i, r.target.dispatchEvent(i), ho = null;
        } else return t = _o(r), t !== null && fa(t), e.blockedOn = r, false;
        t.shift();
      }
      return true;
    }
    function pc(e, t, r) {
      Ei(e) && r.delete(t);
    }
    function cg() {
      pa = false, Tn !== null && Ei(Tn) && (Tn = null), Nn !== null && Ei(Nn) && (Nn = null), Mn !== null && Ei(Mn) && (Mn = null), wo.forEach(pc), xo.forEach(pc);
    }
    function Co(e, t) {
      e.blockedOn === t && (e.blockedOn = null, pa || (pa = true, o.unstable_scheduleCallback(o.unstable_NormalPriority, cg)));
    }
    function ko(e) {
      function t(s) {
        return Co(s, e);
      }
      if (0 < bi.length) {
        Co(bi[0], e);
        for (var r = 1; r < bi.length; r++) {
          var i = bi[r];
          i.blockedOn === e && (i.blockedOn = null);
        }
      }
      for (Tn !== null && Co(Tn, e), Nn !== null && Co(Nn, e), Mn !== null && Co(Mn, e), wo.forEach(t), xo.forEach(t), r = 0; r < An.length; r++) i = An[r], i.blockedOn === e && (i.blockedOn = null);
      for (; 0 < An.length && (r = An[0], r.blockedOn === null); ) fc(r), r.blockedOn === null && An.shift();
    }
    var kr = O.ReactCurrentBatchConfig, Pi = true;
    function dg(e, t, r, i) {
      var s = Ne, c = kr.transition;
      kr.transition = null;
      try {
        Ne = 1, ma(e, t, r, i);
      } finally {
        Ne = s, kr.transition = c;
      }
    }
    function fg(e, t, r, i) {
      var s = Ne, c = kr.transition;
      kr.transition = null;
      try {
        Ne = 4, ma(e, t, r, i);
      } finally {
        Ne = s, kr.transition = c;
      }
    }
    function ma(e, t, r, i) {
      if (Pi) {
        var s = ha(e, t, r, i);
        if (s === null) Da(e, t, i, Ri, r), dc(e, i);
        else if (ug(s, e, t, r, i)) i.stopPropagation();
        else if (dc(e, i), t & 4 && -1 < sg.indexOf(e)) {
          for (; s !== null; ) {
            var c = _o(s);
            if (c !== null && ac(c), c = ha(e, t, r, i), c === null && Da(e, t, i, Ri, r), c === s) break;
            s = c;
          }
          s !== null && i.stopPropagation();
        } else Da(e, t, i, null, r);
      }
    }
    var Ri = null;
    function ha(e, t, r, i) {
      if (Ri = null, e = de(i), e = ar(e), e !== null) if (t = lr(e), t === null) e = null;
      else if (r = t.tag, r === 13) {
        if (e = qu(t), e !== null) return e;
        e = null;
      } else if (r === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
      return Ri = e, null;
    }
    function mc(e) {
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
          switch (Zh()) {
            case sa:
              return 1;
            case rc:
              return 4;
            case wi:
            case eg:
              return 16;
            case oc:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var Dn = null, ga = null, Ti = null;
    function hc() {
      if (Ti) return Ti;
      var e, t = ga, r = t.length, i, s = "value" in Dn ? Dn.value : Dn.textContent, c = s.length;
      for (e = 0; e < r && t[e] === s[e]; e++) ;
      var m = r - e;
      for (i = 1; i <= m && t[r - i] === s[c - i]; i++) ;
      return Ti = s.slice(e, 1 < i ? 1 - i : void 0);
    }
    function Ni(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function Mi() {
      return true;
    }
    function gc() {
      return false;
    }
    function kt(e) {
      function t(r, i, s, c, m) {
        this._reactName = r, this._targetInst = s, this.type = i, this.nativeEvent = c, this.target = m, this.currentTarget = null;
        for (var C in e) e.hasOwnProperty(C) && (r = e[C], this[C] = r ? r(c) : c[C]);
        return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === false) ? Mi : gc, this.isPropagationStopped = gc, this;
      }
      return K(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = true;
          var r = this.nativeEvent;
          r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = false), this.isDefaultPrevented = Mi);
        },
        stopPropagation: function() {
          var r = this.nativeEvent;
          r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = true), this.isPropagationStopped = Mi);
        },
        persist: function() {
        },
        isPersistent: Mi
      }), t;
    }
    var br = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, va = kt(br), bo = K({}, br, {
      view: 0,
      detail: 0
    }), pg = kt(bo), ya, wa, Eo, Ai = K({}, bo, {
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
      getModifierState: Sa,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== Eo && (Eo && e.type === "mousemove" ? (ya = e.screenX - Eo.screenX, wa = e.screenY - Eo.screenY) : wa = ya = 0, Eo = e), ya);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : wa;
      }
    }), vc = kt(Ai), mg = K({}, Ai, {
      dataTransfer: 0
    }), hg = kt(mg), gg = K({}, bo, {
      relatedTarget: 0
    }), xa = kt(gg), vg = K({}, br, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), yg = kt(vg), wg = K({}, br, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), xg = kt(wg), Sg = K({}, br, {
      data: 0
    }), yc = kt(Sg), Cg = {
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
    }, kg = {
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
    }, bg = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Eg(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = bg[e]) ? !!t[e] : false;
    }
    function Sa() {
      return Eg;
    }
    var Pg = K({}, bo, {
      key: function(e) {
        if (e.key) {
          var t = Cg[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = Ni(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? kg[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Sa,
      charCode: function(e) {
        return e.type === "keypress" ? Ni(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Ni(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Rg = kt(Pg), Tg = K({}, Ai, {
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
    }), wc = kt(Tg), Ng = K({}, bo, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Sa
    }), Mg = kt(Ng), Ag = K({}, br, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Dg = kt(Ag), Og = K({}, Ai, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), jg = kt(Og), _g = [
      9,
      13,
      27,
      32
    ], Ca = p && "CompositionEvent" in window, Po = null;
    p && "documentMode" in document && (Po = document.documentMode);
    var Lg = p && "TextEvent" in window && !Po, xc = p && (!Ca || Po && 8 < Po && 11 >= Po), Sc = " ", Cc = false;
    function kc(e, t) {
      switch (e) {
        case "keyup":
          return _g.indexOf(t.keyCode) !== -1;
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
    function bc(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    var Er = false;
    function Bg(e, t) {
      switch (e) {
        case "compositionend":
          return bc(t);
        case "keypress":
          return t.which !== 32 ? null : (Cc = true, Sc);
        case "textInput":
          return e = t.data, e === Sc && Cc ? null : e;
        default:
          return null;
      }
    }
    function zg(e, t) {
      if (Er) return e === "compositionend" || !Ca && kc(e, t) ? (e = hc(), Ti = ga = Dn = null, Er = false, e) : null;
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
          return xc && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var Fg = {
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
    function Ec(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!Fg[e.type] : t === "textarea";
    }
    function Pc(e, t, r, i) {
      rt(i), t = Li(t, "onChange"), 0 < t.length && (r = new va("onChange", "change", null, r, i), e.push({
        event: r,
        listeners: t
      }));
    }
    var Ro = null, To = null;
    function Ig(e) {
      Uc(e, 0);
    }
    function Di(e) {
      var t = Mr(e);
      if (nr(t)) return e;
    }
    function Wg(e, t) {
      if (e === "change") return t;
    }
    var Rc = false;
    if (p) {
      var ka;
      if (p) {
        var ba = "oninput" in document;
        if (!ba) {
          var Tc = document.createElement("div");
          Tc.setAttribute("oninput", "return;"), ba = typeof Tc.oninput == "function";
        }
        ka = ba;
      } else ka = false;
      Rc = ka && (!document.documentMode || 9 < document.documentMode);
    }
    function Nc() {
      Ro && (Ro.detachEvent("onpropertychange", Mc), To = Ro = null);
    }
    function Mc(e) {
      if (e.propertyName === "value" && Di(To)) {
        var t = [];
        Pc(t, To, e, de(e)), It(Ig, t);
      }
    }
    function Hg(e, t, r) {
      e === "focusin" ? (Nc(), Ro = t, To = r, Ro.attachEvent("onpropertychange", Mc)) : e === "focusout" && Nc();
    }
    function $g(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown") return Di(To);
    }
    function Ug(e, t) {
      if (e === "click") return Di(t);
    }
    function Vg(e, t) {
      if (e === "input" || e === "change") return Di(t);
    }
    function Gg(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Ht = typeof Object.is == "function" ? Object.is : Gg;
    function No(e, t) {
      if (Ht(e, t)) return true;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null) return false;
      var r = Object.keys(e), i = Object.keys(t);
      if (r.length !== i.length) return false;
      for (i = 0; i < r.length; i++) {
        var s = r[i];
        if (!v.call(t, s) || !Ht(e[s], t[s])) return false;
      }
      return true;
    }
    function Ac(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Dc(e, t) {
      var r = Ac(e);
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
        r = Ac(r);
      }
    }
    function Oc(e, t) {
      return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? Oc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
    }
    function jc() {
      for (var e = window, t = Nt(); t instanceof e.HTMLIFrameElement; ) {
        try {
          var r = typeof t.contentWindow.location.href == "string";
        } catch {
          r = false;
        }
        if (r) e = t.contentWindow;
        else break;
        t = Nt(e.document);
      }
      return t;
    }
    function Ea(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function Kg(e) {
      var t = jc(), r = e.focusedElem, i = e.selectionRange;
      if (t !== r && r && r.ownerDocument && Oc(r.ownerDocument.documentElement, r)) {
        if (i !== null && Ea(r)) {
          if (t = i.start, e = i.end, e === void 0 && (e = t), "selectionStart" in r) r.selectionStart = t, r.selectionEnd = Math.min(e, r.value.length);
          else if (e = (t = r.ownerDocument || document) && t.defaultView || window, e.getSelection) {
            e = e.getSelection();
            var s = r.textContent.length, c = Math.min(i.start, s);
            i = i.end === void 0 ? c : Math.min(i.end, s), !e.extend && c > i && (s = i, i = c, c = s), s = Dc(r, c);
            var m = Dc(r, i);
            s && m && (e.rangeCount !== 1 || e.anchorNode !== s.node || e.anchorOffset !== s.offset || e.focusNode !== m.node || e.focusOffset !== m.offset) && (t = t.createRange(), t.setStart(s.node, s.offset), e.removeAllRanges(), c > i ? (e.addRange(t), e.extend(m.node, m.offset)) : (t.setEnd(m.node, m.offset), e.addRange(t)));
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
    var Yg = p && "documentMode" in document && 11 >= document.documentMode, Pr = null, Pa = null, Mo = null, Ra = false;
    function _c(e, t, r) {
      var i = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
      Ra || Pr == null || Pr !== Nt(i) || (i = Pr, "selectionStart" in i && Ea(i) ? i = {
        start: i.selectionStart,
        end: i.selectionEnd
      } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
        anchorNode: i.anchorNode,
        anchorOffset: i.anchorOffset,
        focusNode: i.focusNode,
        focusOffset: i.focusOffset
      }), Mo && No(Mo, i) || (Mo = i, i = Li(Pa, "onSelect"), 0 < i.length && (t = new va("onSelect", "select", null, t, r), e.push({
        event: t,
        listeners: i
      }), t.target = Pr)));
    }
    function Oi(e, t) {
      var r = {};
      return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
    }
    var Rr = {
      animationend: Oi("Animation", "AnimationEnd"),
      animationiteration: Oi("Animation", "AnimationIteration"),
      animationstart: Oi("Animation", "AnimationStart"),
      transitionend: Oi("Transition", "TransitionEnd")
    }, Ta = {}, Lc = {};
    p && (Lc = document.createElement("div").style, "AnimationEvent" in window || (delete Rr.animationend.animation, delete Rr.animationiteration.animation, delete Rr.animationstart.animation), "TransitionEvent" in window || delete Rr.transitionend.transition);
    function ji(e) {
      if (Ta[e]) return Ta[e];
      if (!Rr[e]) return e;
      var t = Rr[e], r;
      for (r in t) if (t.hasOwnProperty(r) && r in Lc) return Ta[e] = t[r];
      return e;
    }
    var Bc = ji("animationend"), zc = ji("animationiteration"), Fc = ji("animationstart"), Ic = ji("transitionend"), Wc = /* @__PURE__ */ new Map(), Hc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    function On(e, t) {
      Wc.set(e, t), d(t, [
        e
      ]);
    }
    for (var Na = 0; Na < Hc.length; Na++) {
      var Ma = Hc[Na], Qg = Ma.toLowerCase(), Xg = Ma[0].toUpperCase() + Ma.slice(1);
      On(Qg, "on" + Xg);
    }
    On(Bc, "onAnimationEnd"), On(zc, "onAnimationIteration"), On(Fc, "onAnimationStart"), On("dblclick", "onDoubleClick"), On("focusin", "onFocus"), On("focusout", "onBlur"), On(Ic, "onTransitionEnd"), f("onMouseEnter", [
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
    var Ao = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), qg = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ao));
    function $c(e, t, r) {
      var i = e.type || "unknown-event";
      e.currentTarget = r, Qh(i, t, void 0, e), e.currentTarget = null;
    }
    function Uc(e, t) {
      t = (t & 4) !== 0;
      for (var r = 0; r < e.length; r++) {
        var i = e[r], s = i.event;
        i = i.listeners;
        e: {
          var c = void 0;
          if (t) for (var m = i.length - 1; 0 <= m; m--) {
            var C = i[m], E = C.instance, j = C.currentTarget;
            if (C = C.listener, E !== c && s.isPropagationStopped()) break e;
            $c(s, C, j), c = E;
          }
          else for (m = 0; m < i.length; m++) {
            if (C = i[m], E = C.instance, j = C.currentTarget, C = C.listener, E !== c && s.isPropagationStopped()) break e;
            $c(s, C, j), c = E;
          }
        }
      }
      if (yi) throw e = aa, yi = false, aa = null, e;
    }
    function Ae(e, t) {
      var r = t[za];
      r === void 0 && (r = t[za] = /* @__PURE__ */ new Set());
      var i = e + "__bubble";
      r.has(i) || (Vc(t, e, 2, false), r.add(i));
    }
    function Aa(e, t, r) {
      var i = 0;
      t && (i |= 4), Vc(r, e, i, t);
    }
    var _i = "_reactListening" + Math.random().toString(36).slice(2);
    function Do(e) {
      if (!e[_i]) {
        e[_i] = true, a.forEach(function(r) {
          r !== "selectionchange" && (qg.has(r) || Aa(r, false, e), Aa(r, true, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[_i] || (t[_i] = true, Aa("selectionchange", false, t));
      }
    }
    function Vc(e, t, r, i) {
      switch (mc(t)) {
        case 1:
          var s = dg;
          break;
        case 4:
          s = fg;
          break;
        default:
          s = ma;
      }
      r = s.bind(null, t, r, e), s = void 0, !Pn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = true), i ? s !== void 0 ? e.addEventListener(t, r, {
        capture: true,
        passive: s
      }) : e.addEventListener(t, r, true) : s !== void 0 ? e.addEventListener(t, r, {
        passive: s
      }) : e.addEventListener(t, r, false);
    }
    function Da(e, t, r, i, s) {
      var c = i;
      if (!(t & 1) && !(t & 2) && i !== null) e: for (; ; ) {
        if (i === null) return;
        var m = i.tag;
        if (m === 3 || m === 4) {
          var C = i.stateNode.containerInfo;
          if (C === s || C.nodeType === 8 && C.parentNode === s) break;
          if (m === 4) for (m = i.return; m !== null; ) {
            var E = m.tag;
            if ((E === 3 || E === 4) && (E = m.stateNode.containerInfo, E === s || E.nodeType === 8 && E.parentNode === s)) return;
            m = m.return;
          }
          for (; C !== null; ) {
            if (m = ar(C), m === null) return;
            if (E = m.tag, E === 5 || E === 6) {
              i = c = m;
              continue e;
            }
            C = C.parentNode;
          }
        }
        i = i.return;
      }
      It(function() {
        var j = c, H = de(r), $ = [];
        e: {
          var W = Wc.get(e);
          if (W !== void 0) {
            var q = va, ne = e;
            switch (e) {
              case "keypress":
                if (Ni(r) === 0) break e;
              case "keydown":
              case "keyup":
                q = Rg;
                break;
              case "focusin":
                ne = "focus", q = xa;
                break;
              case "focusout":
                ne = "blur", q = xa;
                break;
              case "beforeblur":
              case "afterblur":
                q = xa;
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
                q = vc;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                q = hg;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                q = Mg;
                break;
              case Bc:
              case zc:
              case Fc:
                q = yg;
                break;
              case Ic:
                q = Dg;
                break;
              case "scroll":
                q = pg;
                break;
              case "wheel":
                q = jg;
                break;
              case "copy":
              case "cut":
              case "paste":
                q = xg;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                q = wc;
            }
            var re = (t & 4) !== 0, $e = !re && e === "scroll", M = re ? W !== null ? W + "Capture" : null : W;
            re = [];
            for (var R = j, D; R !== null; ) {
              D = R;
              var V = D.stateNode;
              if (D.tag === 5 && V !== null && (D = V, M !== null && (V = lt(R, M), V != null && re.push(Oo(R, V, D)))), $e) break;
              R = R.return;
            }
            0 < re.length && (W = new q(W, ne, null, r, H), $.push({
              event: W,
              listeners: re
            }));
          }
        }
        if (!(t & 7)) {
          e: {
            if (W = e === "mouseover" || e === "pointerover", q = e === "mouseout" || e === "pointerout", W && r !== ho && (ne = r.relatedTarget || r.fromElement) && (ar(ne) || ne[pn])) break e;
            if ((q || W) && (W = H.window === H ? H : (W = H.ownerDocument) ? W.defaultView || W.parentWindow : window, q ? (ne = r.relatedTarget || r.toElement, q = j, ne = ne ? ar(ne) : null, ne !== null && ($e = lr(ne), ne !== $e || ne.tag !== 5 && ne.tag !== 6) && (ne = null)) : (q = null, ne = j), q !== ne)) {
              if (re = vc, V = "onMouseLeave", M = "onMouseEnter", R = "mouse", (e === "pointerout" || e === "pointerover") && (re = wc, V = "onPointerLeave", M = "onPointerEnter", R = "pointer"), $e = q == null ? W : Mr(q), D = ne == null ? W : Mr(ne), W = new re(V, R + "leave", q, r, H), W.target = $e, W.relatedTarget = D, V = null, ar(H) === j && (re = new re(M, R + "enter", ne, r, H), re.target = D, re.relatedTarget = $e, V = re), $e = V, q && ne) t: {
                for (re = q, M = ne, R = 0, D = re; D; D = Tr(D)) R++;
                for (D = 0, V = M; V; V = Tr(V)) D++;
                for (; 0 < R - D; ) re = Tr(re), R--;
                for (; 0 < D - R; ) M = Tr(M), D--;
                for (; R--; ) {
                  if (re === M || M !== null && re === M.alternate) break t;
                  re = Tr(re), M = Tr(M);
                }
                re = null;
              }
              else re = null;
              q !== null && Gc($, W, q, re, false), ne !== null && $e !== null && Gc($, $e, ne, re, true);
            }
          }
          e: {
            if (W = j ? Mr(j) : window, q = W.nodeName && W.nodeName.toLowerCase(), q === "select" || q === "input" && W.type === "file") var ie = Wg;
            else if (Ec(W)) if (Rc) ie = Vg;
            else {
              ie = $g;
              var ue = Hg;
            }
            else (q = W.nodeName) && q.toLowerCase() === "input" && (W.type === "checkbox" || W.type === "radio") && (ie = Ug);
            if (ie && (ie = ie(e, j))) {
              Pc($, ie, r, H);
              break e;
            }
            ue && ue(e, W, j), e === "focusout" && (ue = W._wrapperState) && ue.controlled && W.type === "number" && ao(W, "number", W.value);
          }
          switch (ue = j ? Mr(j) : window, e) {
            case "focusin":
              (Ec(ue) || ue.contentEditable === "true") && (Pr = ue, Pa = j, Mo = null);
              break;
            case "focusout":
              Mo = Pa = Pr = null;
              break;
            case "mousedown":
              Ra = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Ra = false, _c($, r, H);
              break;
            case "selectionchange":
              if (Yg) break;
            case "keydown":
            case "keyup":
              _c($, r, H);
          }
          var ce;
          if (Ca) e: {
            switch (e) {
              case "compositionstart":
                var pe = "onCompositionStart";
                break e;
              case "compositionend":
                pe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                pe = "onCompositionUpdate";
                break e;
            }
            pe = void 0;
          }
          else Er ? kc(e, r) && (pe = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (pe = "onCompositionStart");
          pe && (xc && r.locale !== "ko" && (Er || pe !== "onCompositionStart" ? pe === "onCompositionEnd" && Er && (ce = hc()) : (Dn = H, ga = "value" in Dn ? Dn.value : Dn.textContent, Er = true)), ue = Li(j, pe), 0 < ue.length && (pe = new yc(pe, e, null, r, H), $.push({
            event: pe,
            listeners: ue
          }), ce ? pe.data = ce : (ce = bc(r), ce !== null && (pe.data = ce)))), (ce = Lg ? Bg(e, r) : zg(e, r)) && (j = Li(j, "onBeforeInput"), 0 < j.length && (H = new yc("onBeforeInput", "beforeinput", null, r, H), $.push({
            event: H,
            listeners: j
          }), H.data = ce));
        }
        Uc($, t);
      });
    }
    function Oo(e, t, r) {
      return {
        instance: e,
        listener: t,
        currentTarget: r
      };
    }
    function Li(e, t) {
      for (var r = t + "Capture", i = []; e !== null; ) {
        var s = e, c = s.stateNode;
        s.tag === 5 && c !== null && (s = c, c = lt(e, r), c != null && i.unshift(Oo(e, c, s)), c = lt(e, t), c != null && i.push(Oo(e, c, s))), e = e.return;
      }
      return i;
    }
    function Tr(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5);
      return e || null;
    }
    function Gc(e, t, r, i, s) {
      for (var c = t._reactName, m = []; r !== null && r !== i; ) {
        var C = r, E = C.alternate, j = C.stateNode;
        if (E !== null && E === i) break;
        C.tag === 5 && j !== null && (C = j, s ? (E = lt(r, c), E != null && m.unshift(Oo(r, E, C))) : s || (E = lt(r, c), E != null && m.push(Oo(r, E, C)))), r = r.return;
      }
      m.length !== 0 && e.push({
        event: t,
        listeners: m
      });
    }
    var Jg = /\r\n?/g, Zg = /\u0000|\uFFFD/g;
    function Kc(e) {
      return (typeof e == "string" ? e : "" + e).replace(Jg, `
`).replace(Zg, "");
    }
    function Bi(e, t, r) {
      if (t = Kc(t), Kc(e) !== t && r) throw Error(l(425));
    }
    function zi() {
    }
    var Oa = null, ja = null;
    function _a(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    var La = typeof setTimeout == "function" ? setTimeout : void 0, ev = typeof clearTimeout == "function" ? clearTimeout : void 0, Yc = typeof Promise == "function" ? Promise : void 0, tv = typeof queueMicrotask == "function" ? queueMicrotask : typeof Yc < "u" ? function(e) {
      return Yc.resolve(null).then(e).catch(nv);
    } : La;
    function nv(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function Ba(e, t) {
      var r = t, i = 0;
      do {
        var s = r.nextSibling;
        if (e.removeChild(r), s && s.nodeType === 8) if (r = s.data, r === "/$") {
          if (i === 0) {
            e.removeChild(s), ko(t);
            return;
          }
          i--;
        } else r !== "$" && r !== "$?" && r !== "$!" || i++;
        r = s;
      } while (r);
      ko(t);
    }
    function jn(e) {
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
    function Qc(e) {
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
    var Nr = Math.random().toString(36).slice(2), en = "__reactFiber$" + Nr, jo = "__reactProps$" + Nr, pn = "__reactContainer$" + Nr, za = "__reactEvents$" + Nr, rv = "__reactListeners$" + Nr, ov = "__reactHandles$" + Nr;
    function ar(e) {
      var t = e[en];
      if (t) return t;
      for (var r = e.parentNode; r; ) {
        if (t = r[pn] || r[en]) {
          if (r = t.alternate, t.child !== null || r !== null && r.child !== null) for (e = Qc(e); e !== null; ) {
            if (r = e[en]) return r;
            e = Qc(e);
          }
          return t;
        }
        e = r, r = e.parentNode;
      }
      return null;
    }
    function _o(e) {
      return e = e[en] || e[pn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
    }
    function Mr(e) {
      if (e.tag === 5 || e.tag === 6) return e.stateNode;
      throw Error(l(33));
    }
    function Fi(e) {
      return e[jo] || null;
    }
    var Fa = [], Ar = -1;
    function _n(e) {
      return {
        current: e
      };
    }
    function De(e) {
      0 > Ar || (e.current = Fa[Ar], Fa[Ar] = null, Ar--);
    }
    function Me(e, t) {
      Ar++, Fa[Ar] = e.current, e.current = t;
    }
    var Ln = {}, at = _n(Ln), ht = _n(false), sr = Ln;
    function Dr(e, t) {
      var r = e.type.contextTypes;
      if (!r) return Ln;
      var i = e.stateNode;
      if (i && i.__reactInternalMemoizedUnmaskedChildContext === t) return i.__reactInternalMemoizedMaskedChildContext;
      var s = {}, c;
      for (c in r) s[c] = t[c];
      return i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = s), s;
    }
    function gt(e) {
      return e = e.childContextTypes, e != null;
    }
    function Ii() {
      De(ht), De(at);
    }
    function Xc(e, t, r) {
      if (at.current !== Ln) throw Error(l(168));
      Me(at, t), Me(ht, r);
    }
    function qc(e, t, r) {
      var i = e.stateNode;
      if (t = t.childContextTypes, typeof i.getChildContext != "function") return r;
      i = i.getChildContext();
      for (var s in i) if (!(s in t)) throw Error(l(108, Se(e) || "Unknown", s));
      return K({}, r, i);
    }
    function Wi(e) {
      return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Ln, sr = at.current, Me(at, e), Me(ht, ht.current), true;
    }
    function Jc(e, t, r) {
      var i = e.stateNode;
      if (!i) throw Error(l(169));
      r ? (e = qc(e, t, sr), i.__reactInternalMemoizedMergedChildContext = e, De(ht), De(at), Me(at, e)) : De(ht), Me(ht, r);
    }
    var mn = null, Hi = false, Ia = false;
    function Zc(e) {
      mn === null ? mn = [
        e
      ] : mn.push(e);
    }
    function iv(e) {
      Hi = true, Zc(e);
    }
    function Bn() {
      if (!Ia && mn !== null) {
        Ia = true;
        var e = 0, t = Ne;
        try {
          var r = mn;
          for (Ne = 1; e < r.length; e++) {
            var i = r[e];
            do
              i = i(true);
            while (i !== null);
          }
          mn = null, Hi = false;
        } catch (s) {
          throw mn !== null && (mn = mn.slice(e + 1)), tc(sa, Bn), s;
        } finally {
          Ne = t, Ia = false;
        }
      }
      return null;
    }
    var Or = [], jr = 0, $i = null, Ui = 0, At = [], Dt = 0, ur = null, hn = 1, gn = "";
    function cr(e, t) {
      Or[jr++] = Ui, Or[jr++] = $i, $i = e, Ui = t;
    }
    function ed(e, t, r) {
      At[Dt++] = hn, At[Dt++] = gn, At[Dt++] = ur, ur = e;
      var i = hn;
      e = gn;
      var s = 32 - Wt(i) - 1;
      i &= ~(1 << s), r += 1;
      var c = 32 - Wt(t) + s;
      if (30 < c) {
        var m = s - s % 5;
        c = (i & (1 << m) - 1).toString(32), i >>= m, s -= m, hn = 1 << 32 - Wt(t) + s | r << s | i, gn = c + e;
      } else hn = 1 << c | r << s | i, gn = e;
    }
    function Wa(e) {
      e.return !== null && (cr(e, 1), ed(e, 1, 0));
    }
    function Ha(e) {
      for (; e === $i; ) $i = Or[--jr], Or[jr] = null, Ui = Or[--jr], Or[jr] = null;
      for (; e === ur; ) ur = At[--Dt], At[Dt] = null, gn = At[--Dt], At[Dt] = null, hn = At[--Dt], At[Dt] = null;
    }
    var bt = null, Et = null, _e = false, $t = null;
    function td(e, t) {
      var r = Lt(5, null, null, 0);
      r.elementType = "DELETED", r.stateNode = t, r.return = e, t = e.deletions, t === null ? (e.deletions = [
        r
      ], e.flags |= 16) : t.push(r);
    }
    function nd(e, t) {
      switch (e.tag) {
        case 5:
          var r = e.type;
          return t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, bt = e, Et = jn(t.firstChild), true) : false;
        case 6:
          return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, bt = e, Et = null, true) : false;
        case 13:
          return t = t.nodeType !== 8 ? null : t, t !== null ? (r = ur !== null ? {
            id: hn,
            overflow: gn
          } : null, e.memoizedState = {
            dehydrated: t,
            treeContext: r,
            retryLane: 1073741824
          }, r = Lt(18, null, null, 0), r.stateNode = t, r.return = e, e.child = r, bt = e, Et = null, true) : false;
        default:
          return false;
      }
    }
    function $a(e) {
      return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
    }
    function Ua(e) {
      if (_e) {
        var t = Et;
        if (t) {
          var r = t;
          if (!nd(e, t)) {
            if ($a(e)) throw Error(l(418));
            t = jn(r.nextSibling);
            var i = bt;
            t && nd(e, t) ? td(i, r) : (e.flags = e.flags & -4097 | 2, _e = false, bt = e);
          }
        } else {
          if ($a(e)) throw Error(l(418));
          e.flags = e.flags & -4097 | 2, _e = false, bt = e;
        }
      }
    }
    function rd(e) {
      for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
      bt = e;
    }
    function Vi(e) {
      if (e !== bt) return false;
      if (!_e) return rd(e), _e = true, false;
      var t;
      if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !_a(e.type, e.memoizedProps)), t && (t = Et)) {
        if ($a(e)) throw od(), Error(l(418));
        for (; t; ) td(e, t), t = jn(t.nextSibling);
      }
      if (rd(e), e.tag === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
        e: {
          for (e = e.nextSibling, t = 0; e; ) {
            if (e.nodeType === 8) {
              var r = e.data;
              if (r === "/$") {
                if (t === 0) {
                  Et = jn(e.nextSibling);
                  break e;
                }
                t--;
              } else r !== "$" && r !== "$!" && r !== "$?" || t++;
            }
            e = e.nextSibling;
          }
          Et = null;
        }
      } else Et = bt ? jn(e.stateNode.nextSibling) : null;
      return true;
    }
    function od() {
      for (var e = Et; e; ) e = jn(e.nextSibling);
    }
    function _r() {
      Et = bt = null, _e = false;
    }
    function Va(e) {
      $t === null ? $t = [
        e
      ] : $t.push(e);
    }
    var lv = O.ReactCurrentBatchConfig;
    function Lo(e, t, r) {
      if (e = r.ref, e !== null && typeof e != "function" && typeof e != "object") {
        if (r._owner) {
          if (r = r._owner, r) {
            if (r.tag !== 1) throw Error(l(309));
            var i = r.stateNode;
          }
          if (!i) throw Error(l(147, e));
          var s = i, c = "" + e;
          return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === c ? t.ref : (t = function(m) {
            var C = s.refs;
            m === null ? delete C[c] : C[c] = m;
          }, t._stringRef = c, t);
        }
        if (typeof e != "string") throw Error(l(284));
        if (!r._owner) throw Error(l(290, e));
      }
      return e;
    }
    function Gi(e, t) {
      throw e = Object.prototype.toString.call(t), Error(l(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
    }
    function id(e) {
      var t = e._init;
      return t(e._payload);
    }
    function ld(e) {
      function t(M, R) {
        if (e) {
          var D = M.deletions;
          D === null ? (M.deletions = [
            R
          ], M.flags |= 16) : D.push(R);
        }
      }
      function r(M, R) {
        if (!e) return null;
        for (; R !== null; ) t(M, R), R = R.sibling;
        return null;
      }
      function i(M, R) {
        for (M = /* @__PURE__ */ new Map(); R !== null; ) R.key !== null ? M.set(R.key, R) : M.set(R.index, R), R = R.sibling;
        return M;
      }
      function s(M, R) {
        return M = Vn(M, R), M.index = 0, M.sibling = null, M;
      }
      function c(M, R, D) {
        return M.index = D, e ? (D = M.alternate, D !== null ? (D = D.index, D < R ? (M.flags |= 2, R) : D) : (M.flags |= 2, R)) : (M.flags |= 1048576, R);
      }
      function m(M) {
        return e && M.alternate === null && (M.flags |= 2), M;
      }
      function C(M, R, D, V) {
        return R === null || R.tag !== 6 ? (R = Ls(D, M.mode, V), R.return = M, R) : (R = s(R, D), R.return = M, R);
      }
      function E(M, R, D, V) {
        var ie = D.type;
        return ie === _ ? H(M, R, D.props.children, V, D.key) : R !== null && (R.elementType === ie || typeof ie == "object" && ie !== null && ie.$$typeof === se && id(ie) === R.type) ? (V = s(R, D.props), V.ref = Lo(M, R, D), V.return = M, V) : (V = gl(D.type, D.key, D.props, null, M.mode, V), V.ref = Lo(M, R, D), V.return = M, V);
      }
      function j(M, R, D, V) {
        return R === null || R.tag !== 4 || R.stateNode.containerInfo !== D.containerInfo || R.stateNode.implementation !== D.implementation ? (R = Bs(D, M.mode, V), R.return = M, R) : (R = s(R, D.children || []), R.return = M, R);
      }
      function H(M, R, D, V, ie) {
        return R === null || R.tag !== 7 ? (R = yr(D, M.mode, V, ie), R.return = M, R) : (R = s(R, D), R.return = M, R);
      }
      function $(M, R, D) {
        if (typeof R == "string" && R !== "" || typeof R == "number") return R = Ls("" + R, M.mode, D), R.return = M, R;
        if (typeof R == "object" && R !== null) {
          switch (R.$$typeof) {
            case F:
              return D = gl(R.type, R.key, R.props, null, M.mode, D), D.ref = Lo(M, null, R), D.return = M, D;
            case G:
              return R = Bs(R, M.mode, D), R.return = M, R;
            case se:
              var V = R._init;
              return $(M, V(R._payload), D);
          }
          if (Mt(R) || X(R)) return R = yr(R, M.mode, D, null), R.return = M, R;
          Gi(M, R);
        }
        return null;
      }
      function W(M, R, D, V) {
        var ie = R !== null ? R.key : null;
        if (typeof D == "string" && D !== "" || typeof D == "number") return ie !== null ? null : C(M, R, "" + D, V);
        if (typeof D == "object" && D !== null) {
          switch (D.$$typeof) {
            case F:
              return D.key === ie ? E(M, R, D, V) : null;
            case G:
              return D.key === ie ? j(M, R, D, V) : null;
            case se:
              return ie = D._init, W(M, R, ie(D._payload), V);
          }
          if (Mt(D) || X(D)) return ie !== null ? null : H(M, R, D, V, null);
          Gi(M, D);
        }
        return null;
      }
      function q(M, R, D, V, ie) {
        if (typeof V == "string" && V !== "" || typeof V == "number") return M = M.get(D) || null, C(R, M, "" + V, ie);
        if (typeof V == "object" && V !== null) {
          switch (V.$$typeof) {
            case F:
              return M = M.get(V.key === null ? D : V.key) || null, E(R, M, V, ie);
            case G:
              return M = M.get(V.key === null ? D : V.key) || null, j(R, M, V, ie);
            case se:
              var ue = V._init;
              return q(M, R, D, ue(V._payload), ie);
          }
          if (Mt(V) || X(V)) return M = M.get(D) || null, H(R, M, V, ie, null);
          Gi(R, V);
        }
        return null;
      }
      function ne(M, R, D, V) {
        for (var ie = null, ue = null, ce = R, pe = R = 0, tt = null; ce !== null && pe < D.length; pe++) {
          ce.index > pe ? (tt = ce, ce = null) : tt = ce.sibling;
          var Re = W(M, ce, D[pe], V);
          if (Re === null) {
            ce === null && (ce = tt);
            break;
          }
          e && ce && Re.alternate === null && t(M, ce), R = c(Re, R, pe), ue === null ? ie = Re : ue.sibling = Re, ue = Re, ce = tt;
        }
        if (pe === D.length) return r(M, ce), _e && cr(M, pe), ie;
        if (ce === null) {
          for (; pe < D.length; pe++) ce = $(M, D[pe], V), ce !== null && (R = c(ce, R, pe), ue === null ? ie = ce : ue.sibling = ce, ue = ce);
          return _e && cr(M, pe), ie;
        }
        for (ce = i(M, ce); pe < D.length; pe++) tt = q(ce, M, pe, D[pe], V), tt !== null && (e && tt.alternate !== null && ce.delete(tt.key === null ? pe : tt.key), R = c(tt, R, pe), ue === null ? ie = tt : ue.sibling = tt, ue = tt);
        return e && ce.forEach(function(Gn) {
          return t(M, Gn);
        }), _e && cr(M, pe), ie;
      }
      function re(M, R, D, V) {
        var ie = X(D);
        if (typeof ie != "function") throw Error(l(150));
        if (D = ie.call(D), D == null) throw Error(l(151));
        for (var ue = ie = null, ce = R, pe = R = 0, tt = null, Re = D.next(); ce !== null && !Re.done; pe++, Re = D.next()) {
          ce.index > pe ? (tt = ce, ce = null) : tt = ce.sibling;
          var Gn = W(M, ce, Re.value, V);
          if (Gn === null) {
            ce === null && (ce = tt);
            break;
          }
          e && ce && Gn.alternate === null && t(M, ce), R = c(Gn, R, pe), ue === null ? ie = Gn : ue.sibling = Gn, ue = Gn, ce = tt;
        }
        if (Re.done) return r(M, ce), _e && cr(M, pe), ie;
        if (ce === null) {
          for (; !Re.done; pe++, Re = D.next()) Re = $(M, Re.value, V), Re !== null && (R = c(Re, R, pe), ue === null ? ie = Re : ue.sibling = Re, ue = Re);
          return _e && cr(M, pe), ie;
        }
        for (ce = i(M, ce); !Re.done; pe++, Re = D.next()) Re = q(ce, M, pe, Re.value, V), Re !== null && (e && Re.alternate !== null && ce.delete(Re.key === null ? pe : Re.key), R = c(Re, R, pe), ue === null ? ie = Re : ue.sibling = Re, ue = Re);
        return e && ce.forEach(function(Fv) {
          return t(M, Fv);
        }), _e && cr(M, pe), ie;
      }
      function $e(M, R, D, V) {
        if (typeof D == "object" && D !== null && D.type === _ && D.key === null && (D = D.props.children), typeof D == "object" && D !== null) {
          switch (D.$$typeof) {
            case F:
              e: {
                for (var ie = D.key, ue = R; ue !== null; ) {
                  if (ue.key === ie) {
                    if (ie = D.type, ie === _) {
                      if (ue.tag === 7) {
                        r(M, ue.sibling), R = s(ue, D.props.children), R.return = M, M = R;
                        break e;
                      }
                    } else if (ue.elementType === ie || typeof ie == "object" && ie !== null && ie.$$typeof === se && id(ie) === ue.type) {
                      r(M, ue.sibling), R = s(ue, D.props), R.ref = Lo(M, ue, D), R.return = M, M = R;
                      break e;
                    }
                    r(M, ue);
                    break;
                  } else t(M, ue);
                  ue = ue.sibling;
                }
                D.type === _ ? (R = yr(D.props.children, M.mode, V, D.key), R.return = M, M = R) : (V = gl(D.type, D.key, D.props, null, M.mode, V), V.ref = Lo(M, R, D), V.return = M, M = V);
              }
              return m(M);
            case G:
              e: {
                for (ue = D.key; R !== null; ) {
                  if (R.key === ue) if (R.tag === 4 && R.stateNode.containerInfo === D.containerInfo && R.stateNode.implementation === D.implementation) {
                    r(M, R.sibling), R = s(R, D.children || []), R.return = M, M = R;
                    break e;
                  } else {
                    r(M, R);
                    break;
                  }
                  else t(M, R);
                  R = R.sibling;
                }
                R = Bs(D, M.mode, V), R.return = M, M = R;
              }
              return m(M);
            case se:
              return ue = D._init, $e(M, R, ue(D._payload), V);
          }
          if (Mt(D)) return ne(M, R, D, V);
          if (X(D)) return re(M, R, D, V);
          Gi(M, D);
        }
        return typeof D == "string" && D !== "" || typeof D == "number" ? (D = "" + D, R !== null && R.tag === 6 ? (r(M, R.sibling), R = s(R, D), R.return = M, M = R) : (r(M, R), R = Ls(D, M.mode, V), R.return = M, M = R), m(M)) : r(M, R);
      }
      return $e;
    }
    var Lr = ld(true), ad = ld(false), Ki = _n(null), Yi = null, Br = null, Ga = null;
    function Ka() {
      Ga = Br = Yi = null;
    }
    function Ya(e) {
      var t = Ki.current;
      De(Ki), e._currentValue = t;
    }
    function Qa(e, t, r) {
      for (; e !== null; ) {
        var i = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === r) break;
        e = e.return;
      }
    }
    function zr(e, t) {
      Yi = e, Ga = Br = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (vt = true), e.firstContext = null);
    }
    function Ot(e) {
      var t = e._currentValue;
      if (Ga !== e) if (e = {
        context: e,
        memoizedValue: t,
        next: null
      }, Br === null) {
        if (Yi === null) throw Error(l(308));
        Br = e, Yi.dependencies = {
          lanes: 0,
          firstContext: e
        };
      } else Br = Br.next = e;
      return t;
    }
    var dr = null;
    function Xa(e) {
      dr === null ? dr = [
        e
      ] : dr.push(e);
    }
    function sd(e, t, r, i) {
      var s = t.interleaved;
      return s === null ? (r.next = r, Xa(t)) : (r.next = s.next, s.next = r), t.interleaved = r, vn(e, i);
    }
    function vn(e, t) {
      e.lanes |= t;
      var r = e.alternate;
      for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; ) e.childLanes |= t, r = e.alternate, r !== null && (r.childLanes |= t), r = e, e = e.return;
      return r.tag === 3 ? r.stateNode : null;
    }
    var zn = false;
    function qa(e) {
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
    function ud(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
      });
    }
    function yn(e, t) {
      return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
      };
    }
    function Fn(e, t, r) {
      var i = e.updateQueue;
      if (i === null) return null;
      if (i = i.shared, Pe & 2) {
        var s = i.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), i.pending = t, vn(e, r);
      }
      return s = i.interleaved, s === null ? (t.next = t, Xa(i)) : (t.next = s.next, s.next = t), i.interleaved = t, vn(e, r);
    }
    function Qi(e, t, r) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194240) !== 0)) {
        var i = t.lanes;
        i &= e.pendingLanes, r |= i, t.lanes = r, da(e, r);
      }
    }
    function cd(e, t) {
      var r = e.updateQueue, i = e.alternate;
      if (i !== null && (i = i.updateQueue, r === i)) {
        var s = null, c = null;
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
            c === null ? s = c = m : c = c.next = m, r = r.next;
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
    function Xi(e, t, r, i) {
      var s = e.updateQueue;
      zn = false;
      var c = s.firstBaseUpdate, m = s.lastBaseUpdate, C = s.shared.pending;
      if (C !== null) {
        s.shared.pending = null;
        var E = C, j = E.next;
        E.next = null, m === null ? c = j : m.next = j, m = E;
        var H = e.alternate;
        H !== null && (H = H.updateQueue, C = H.lastBaseUpdate, C !== m && (C === null ? H.firstBaseUpdate = j : C.next = j, H.lastBaseUpdate = E));
      }
      if (c !== null) {
        var $ = s.baseState;
        m = 0, H = j = E = null, C = c;
        do {
          var W = C.lane, q = C.eventTime;
          if ((i & W) === W) {
            H !== null && (H = H.next = {
              eventTime: q,
              lane: 0,
              tag: C.tag,
              payload: C.payload,
              callback: C.callback,
              next: null
            });
            e: {
              var ne = e, re = C;
              switch (W = t, q = r, re.tag) {
                case 1:
                  if (ne = re.payload, typeof ne == "function") {
                    $ = ne.call(q, $, W);
                    break e;
                  }
                  $ = ne;
                  break e;
                case 3:
                  ne.flags = ne.flags & -65537 | 128;
                case 0:
                  if (ne = re.payload, W = typeof ne == "function" ? ne.call(q, $, W) : ne, W == null) break e;
                  $ = K({}, $, W);
                  break e;
                case 2:
                  zn = true;
              }
            }
            C.callback !== null && C.lane !== 0 && (e.flags |= 64, W = s.effects, W === null ? s.effects = [
              C
            ] : W.push(C));
          } else q = {
            eventTime: q,
            lane: W,
            tag: C.tag,
            payload: C.payload,
            callback: C.callback,
            next: null
          }, H === null ? (j = H = q, E = $) : H = H.next = q, m |= W;
          if (C = C.next, C === null) {
            if (C = s.shared.pending, C === null) break;
            W = C, C = W.next, W.next = null, s.lastBaseUpdate = W, s.shared.pending = null;
          }
        } while (true);
        if (H === null && (E = $), s.baseState = E, s.firstBaseUpdate = j, s.lastBaseUpdate = H, t = s.shared.interleaved, t !== null) {
          s = t;
          do
            m |= s.lane, s = s.next;
          while (s !== t);
        } else c === null && (s.shared.lanes = 0);
        mr |= m, e.lanes = m, e.memoizedState = $;
      }
    }
    function dd(e, t, r) {
      if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
        var i = e[t], s = i.callback;
        if (s !== null) {
          if (i.callback = null, i = r, typeof s != "function") throw Error(l(191, s));
          s.call(i);
        }
      }
    }
    var Bo = {}, tn = _n(Bo), zo = _n(Bo), Fo = _n(Bo);
    function fr(e) {
      if (e === Bo) throw Error(l(174));
      return e;
    }
    function Ja(e, t) {
      switch (Me(Fo, t), Me(zo, e), Me(tn, Bo), e = t.nodeType, e) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : co(null, "");
          break;
        default:
          e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = co(t, e);
      }
      De(tn), Me(tn, t);
    }
    function Fr() {
      De(tn), De(zo), De(Fo);
    }
    function fd(e) {
      fr(Fo.current);
      var t = fr(tn.current), r = co(t, e.type);
      t !== r && (Me(zo, e), Me(tn, r));
    }
    function Za(e) {
      zo.current === e && (De(tn), De(zo));
    }
    var Le = _n(0);
    function qi(e) {
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
    var es = [];
    function ts() {
      for (var e = 0; e < es.length; e++) es[e]._workInProgressVersionPrimary = null;
      es.length = 0;
    }
    var Ji = O.ReactCurrentDispatcher, ns = O.ReactCurrentBatchConfig, pr = 0, Be = null, Ye = null, Ze = null, Zi = false, Io = false, Wo = 0, av = 0;
    function st() {
      throw Error(l(321));
    }
    function rs(e, t) {
      if (t === null) return false;
      for (var r = 0; r < t.length && r < e.length; r++) if (!Ht(e[r], t[r])) return false;
      return true;
    }
    function os(e, t, r, i, s, c) {
      if (pr = c, Be = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ji.current = e === null || e.memoizedState === null ? dv : fv, e = r(i, s), Io) {
        c = 0;
        do {
          if (Io = false, Wo = 0, 25 <= c) throw Error(l(301));
          c += 1, Ze = Ye = null, t.updateQueue = null, Ji.current = pv, e = r(i, s);
        } while (Io);
      }
      if (Ji.current = nl, t = Ye !== null && Ye.next !== null, pr = 0, Ze = Ye = Be = null, Zi = false, t) throw Error(l(300));
      return e;
    }
    function is() {
      var e = Wo !== 0;
      return Wo = 0, e;
    }
    function nn() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return Ze === null ? Be.memoizedState = Ze = e : Ze = Ze.next = e, Ze;
    }
    function jt() {
      if (Ye === null) {
        var e = Be.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = Ye.next;
      var t = Ze === null ? Be.memoizedState : Ze.next;
      if (t !== null) Ze = t, Ye = e;
      else {
        if (e === null) throw Error(l(310));
        Ye = e, e = {
          memoizedState: Ye.memoizedState,
          baseState: Ye.baseState,
          baseQueue: Ye.baseQueue,
          queue: Ye.queue,
          next: null
        }, Ze === null ? Be.memoizedState = Ze = e : Ze = Ze.next = e;
      }
      return Ze;
    }
    function Ho(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function ls(e) {
      var t = jt(), r = t.queue;
      if (r === null) throw Error(l(311));
      r.lastRenderedReducer = e;
      var i = Ye, s = i.baseQueue, c = r.pending;
      if (c !== null) {
        if (s !== null) {
          var m = s.next;
          s.next = c.next, c.next = m;
        }
        i.baseQueue = s = c, r.pending = null;
      }
      if (s !== null) {
        c = s.next, i = i.baseState;
        var C = m = null, E = null, j = c;
        do {
          var H = j.lane;
          if ((pr & H) === H) E !== null && (E = E.next = {
            lane: 0,
            action: j.action,
            hasEagerState: j.hasEagerState,
            eagerState: j.eagerState,
            next: null
          }), i = j.hasEagerState ? j.eagerState : e(i, j.action);
          else {
            var $ = {
              lane: H,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null
            };
            E === null ? (C = E = $, m = i) : E = E.next = $, Be.lanes |= H, mr |= H;
          }
          j = j.next;
        } while (j !== null && j !== c);
        E === null ? m = i : E.next = C, Ht(i, t.memoizedState) || (vt = true), t.memoizedState = i, t.baseState = m, t.baseQueue = E, r.lastRenderedState = i;
      }
      if (e = r.interleaved, e !== null) {
        s = e;
        do
          c = s.lane, Be.lanes |= c, mr |= c, s = s.next;
        while (s !== e);
      } else s === null && (r.lanes = 0);
      return [
        t.memoizedState,
        r.dispatch
      ];
    }
    function as(e) {
      var t = jt(), r = t.queue;
      if (r === null) throw Error(l(311));
      r.lastRenderedReducer = e;
      var i = r.dispatch, s = r.pending, c = t.memoizedState;
      if (s !== null) {
        r.pending = null;
        var m = s = s.next;
        do
          c = e(c, m.action), m = m.next;
        while (m !== s);
        Ht(c, t.memoizedState) || (vt = true), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), r.lastRenderedState = c;
      }
      return [
        c,
        i
      ];
    }
    function pd() {
    }
    function md(e, t) {
      var r = Be, i = jt(), s = t(), c = !Ht(i.memoizedState, s);
      if (c && (i.memoizedState = s, vt = true), i = i.queue, ss(vd.bind(null, r, i, e), [
        e
      ]), i.getSnapshot !== t || c || Ze !== null && Ze.memoizedState.tag & 1) {
        if (r.flags |= 2048, $o(9, gd.bind(null, r, i, s, t), void 0, null), et === null) throw Error(l(349));
        pr & 30 || hd(r, t, s);
      }
      return s;
    }
    function hd(e, t, r) {
      e.flags |= 16384, e = {
        getSnapshot: t,
        value: r
      }, t = Be.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
      }, Be.updateQueue = t, t.stores = [
        e
      ]) : (r = t.stores, r === null ? t.stores = [
        e
      ] : r.push(e));
    }
    function gd(e, t, r, i) {
      t.value = r, t.getSnapshot = i, yd(t) && wd(e);
    }
    function vd(e, t, r) {
      return r(function() {
        yd(t) && wd(e);
      });
    }
    function yd(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var r = t();
        return !Ht(e, r);
      } catch {
        return true;
      }
    }
    function wd(e) {
      var t = vn(e, 1);
      t !== null && Kt(t, e, 1, -1);
    }
    function xd(e) {
      var t = nn();
      return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ho,
        lastRenderedState: e
      }, t.queue = e, e = e.dispatch = cv.bind(null, Be, e), [
        t.memoizedState,
        e
      ];
    }
    function $o(e, t, r, i) {
      return e = {
        tag: e,
        create: t,
        destroy: r,
        deps: i,
        next: null
      }, t = Be.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
      }, Be.updateQueue = t, t.lastEffect = e.next = e) : (r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (i = r.next, r.next = e, e.next = i, t.lastEffect = e)), e;
    }
    function Sd() {
      return jt().memoizedState;
    }
    function el(e, t, r, i) {
      var s = nn();
      Be.flags |= e, s.memoizedState = $o(1 | t, r, void 0, i === void 0 ? null : i);
    }
    function tl(e, t, r, i) {
      var s = jt();
      i = i === void 0 ? null : i;
      var c = void 0;
      if (Ye !== null) {
        var m = Ye.memoizedState;
        if (c = m.destroy, i !== null && rs(i, m.deps)) {
          s.memoizedState = $o(t, r, c, i);
          return;
        }
      }
      Be.flags |= e, s.memoizedState = $o(1 | t, r, c, i);
    }
    function Cd(e, t) {
      return el(8390656, 8, e, t);
    }
    function ss(e, t) {
      return tl(2048, 8, e, t);
    }
    function kd(e, t) {
      return tl(4, 2, e, t);
    }
    function bd(e, t) {
      return tl(4, 4, e, t);
    }
    function Ed(e, t) {
      if (typeof t == "function") return e = e(), t(e), function() {
        t(null);
      };
      if (t != null) return e = e(), t.current = e, function() {
        t.current = null;
      };
    }
    function Pd(e, t, r) {
      return r = r != null ? r.concat([
        e
      ]) : null, tl(4, 4, Ed.bind(null, t, e), r);
    }
    function us() {
    }
    function Rd(e, t) {
      var r = jt();
      t = t === void 0 ? null : t;
      var i = r.memoizedState;
      return i !== null && t !== null && rs(t, i[1]) ? i[0] : (r.memoizedState = [
        e,
        t
      ], e);
    }
    function Td(e, t) {
      var r = jt();
      t = t === void 0 ? null : t;
      var i = r.memoizedState;
      return i !== null && t !== null && rs(t, i[1]) ? i[0] : (e = e(), r.memoizedState = [
        e,
        t
      ], e);
    }
    function Nd(e, t, r) {
      return pr & 21 ? (Ht(r, t) || (r = ic(), Be.lanes |= r, mr |= r, e.baseState = true), t) : (e.baseState && (e.baseState = false, vt = true), e.memoizedState = r);
    }
    function sv(e, t) {
      var r = Ne;
      Ne = r !== 0 && 4 > r ? r : 4, e(true);
      var i = ns.transition;
      ns.transition = {};
      try {
        e(false), t();
      } finally {
        Ne = r, ns.transition = i;
      }
    }
    function Md() {
      return jt().memoizedState;
    }
    function uv(e, t, r) {
      var i = $n(e);
      if (r = {
        lane: i,
        action: r,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, Ad(e)) Dd(t, r);
      else if (r = sd(e, t, r, i), r !== null) {
        var s = ft();
        Kt(r, e, i, s), Od(r, t, i);
      }
    }
    function cv(e, t, r) {
      var i = $n(e), s = {
        lane: i,
        action: r,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      if (Ad(e)) Dd(t, s);
      else {
        var c = e.alternate;
        if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null)) try {
          var m = t.lastRenderedState, C = c(m, r);
          if (s.hasEagerState = true, s.eagerState = C, Ht(C, m)) {
            var E = t.interleaved;
            E === null ? (s.next = s, Xa(t)) : (s.next = E.next, E.next = s), t.interleaved = s;
            return;
          }
        } catch {
        } finally {
        }
        r = sd(e, t, s, i), r !== null && (s = ft(), Kt(r, e, i, s), Od(r, t, i));
      }
    }
    function Ad(e) {
      var t = e.alternate;
      return e === Be || t !== null && t === Be;
    }
    function Dd(e, t) {
      Io = Zi = true;
      var r = e.pending;
      r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
    }
    function Od(e, t, r) {
      if (r & 4194240) {
        var i = t.lanes;
        i &= e.pendingLanes, r |= i, t.lanes = r, da(e, r);
      }
    }
    var nl = {
      readContext: Ot,
      useCallback: st,
      useContext: st,
      useEffect: st,
      useImperativeHandle: st,
      useInsertionEffect: st,
      useLayoutEffect: st,
      useMemo: st,
      useReducer: st,
      useRef: st,
      useState: st,
      useDebugValue: st,
      useDeferredValue: st,
      useTransition: st,
      useMutableSource: st,
      useSyncExternalStore: st,
      useId: st,
      unstable_isNewReconciler: false
    }, dv = {
      readContext: Ot,
      useCallback: function(e, t) {
        return nn().memoizedState = [
          e,
          t === void 0 ? null : t
        ], e;
      },
      useContext: Ot,
      useEffect: Cd,
      useImperativeHandle: function(e, t, r) {
        return r = r != null ? r.concat([
          e
        ]) : null, el(4194308, 4, Ed.bind(null, t, e), r);
      },
      useLayoutEffect: function(e, t) {
        return el(4194308, 4, e, t);
      },
      useInsertionEffect: function(e, t) {
        return el(4, 2, e, t);
      },
      useMemo: function(e, t) {
        var r = nn();
        return t = t === void 0 ? null : t, e = e(), r.memoizedState = [
          e,
          t
        ], e;
      },
      useReducer: function(e, t, r) {
        var i = nn();
        return t = r !== void 0 ? r(t) : t, i.memoizedState = i.baseState = t, e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t
        }, i.queue = e, e = e.dispatch = uv.bind(null, Be, e), [
          i.memoizedState,
          e
        ];
      },
      useRef: function(e) {
        var t = nn();
        return e = {
          current: e
        }, t.memoizedState = e;
      },
      useState: xd,
      useDebugValue: us,
      useDeferredValue: function(e) {
        return nn().memoizedState = e;
      },
      useTransition: function() {
        var e = xd(false), t = e[0];
        return e = sv.bind(null, e[1]), nn().memoizedState = e, [
          t,
          e
        ];
      },
      useMutableSource: function() {
      },
      useSyncExternalStore: function(e, t, r) {
        var i = Be, s = nn();
        if (_e) {
          if (r === void 0) throw Error(l(407));
          r = r();
        } else {
          if (r = t(), et === null) throw Error(l(349));
          pr & 30 || hd(i, t, r);
        }
        s.memoizedState = r;
        var c = {
          value: r,
          getSnapshot: t
        };
        return s.queue = c, Cd(vd.bind(null, i, c, e), [
          e
        ]), i.flags |= 2048, $o(9, gd.bind(null, i, c, r, t), void 0, null), r;
      },
      useId: function() {
        var e = nn(), t = et.identifierPrefix;
        if (_e) {
          var r = gn, i = hn;
          r = (i & ~(1 << 32 - Wt(i) - 1)).toString(32) + r, t = ":" + t + "R" + r, r = Wo++, 0 < r && (t += "H" + r.toString(32)), t += ":";
        } else r = av++, t = ":" + t + "r" + r.toString(32) + ":";
        return e.memoizedState = t;
      },
      unstable_isNewReconciler: false
    }, fv = {
      readContext: Ot,
      useCallback: Rd,
      useContext: Ot,
      useEffect: ss,
      useImperativeHandle: Pd,
      useInsertionEffect: kd,
      useLayoutEffect: bd,
      useMemo: Td,
      useReducer: ls,
      useRef: Sd,
      useState: function() {
        return ls(Ho);
      },
      useDebugValue: us,
      useDeferredValue: function(e) {
        var t = jt();
        return Nd(t, Ye.memoizedState, e);
      },
      useTransition: function() {
        var e = ls(Ho)[0], t = jt().memoizedState;
        return [
          e,
          t
        ];
      },
      useMutableSource: pd,
      useSyncExternalStore: md,
      useId: Md,
      unstable_isNewReconciler: false
    }, pv = {
      readContext: Ot,
      useCallback: Rd,
      useContext: Ot,
      useEffect: ss,
      useImperativeHandle: Pd,
      useInsertionEffect: kd,
      useLayoutEffect: bd,
      useMemo: Td,
      useReducer: as,
      useRef: Sd,
      useState: function() {
        return as(Ho);
      },
      useDebugValue: us,
      useDeferredValue: function(e) {
        var t = jt();
        return Ye === null ? t.memoizedState = e : Nd(t, Ye.memoizedState, e);
      },
      useTransition: function() {
        var e = as(Ho)[0], t = jt().memoizedState;
        return [
          e,
          t
        ];
      },
      useMutableSource: pd,
      useSyncExternalStore: md,
      useId: Md,
      unstable_isNewReconciler: false
    };
    function Ut(e, t) {
      if (e && e.defaultProps) {
        t = K({}, t), e = e.defaultProps;
        for (var r in e) t[r] === void 0 && (t[r] = e[r]);
        return t;
      }
      return t;
    }
    function cs(e, t, r, i) {
      t = e.memoizedState, r = r(i, t), r = r == null ? t : K({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
    }
    var rl = {
      isMounted: function(e) {
        return (e = e._reactInternals) ? lr(e) === e : false;
      },
      enqueueSetState: function(e, t, r) {
        e = e._reactInternals;
        var i = ft(), s = $n(e), c = yn(i, s);
        c.payload = t, r != null && (c.callback = r), t = Fn(e, c, s), t !== null && (Kt(t, e, s, i), Qi(t, e, s));
      },
      enqueueReplaceState: function(e, t, r) {
        e = e._reactInternals;
        var i = ft(), s = $n(e), c = yn(i, s);
        c.tag = 1, c.payload = t, r != null && (c.callback = r), t = Fn(e, c, s), t !== null && (Kt(t, e, s, i), Qi(t, e, s));
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var r = ft(), i = $n(e), s = yn(r, i);
        s.tag = 2, t != null && (s.callback = t), t = Fn(e, s, i), t !== null && (Kt(t, e, i, r), Qi(t, e, i));
      }
    };
    function jd(e, t, r, i, s, c, m) {
      return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, c, m) : t.prototype && t.prototype.isPureReactComponent ? !No(r, i) || !No(s, c) : true;
    }
    function _d(e, t, r) {
      var i = false, s = Ln, c = t.contextType;
      return typeof c == "object" && c !== null ? c = Ot(c) : (s = gt(t) ? sr : at.current, i = t.contextTypes, c = (i = i != null) ? Dr(e, s) : Ln), t = new t(r, c), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = rl, e.stateNode = t, t._reactInternals = e, i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = s, e.__reactInternalMemoizedMaskedChildContext = c), t;
    }
    function Ld(e, t, r, i) {
      e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, i), t.state !== e && rl.enqueueReplaceState(t, t.state, null);
    }
    function ds(e, t, r, i) {
      var s = e.stateNode;
      s.props = r, s.state = e.memoizedState, s.refs = {}, qa(e);
      var c = t.contextType;
      typeof c == "object" && c !== null ? s.context = Ot(c) : (c = gt(t) ? sr : at.current, s.context = Dr(e, c)), s.state = e.memoizedState, c = t.getDerivedStateFromProps, typeof c == "function" && (cs(e, t, c, r), s.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (t = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), t !== s.state && rl.enqueueReplaceState(s, s.state, null), Xi(e, r, s, i), s.state = e.memoizedState), typeof s.componentDidMount == "function" && (e.flags |= 4194308);
    }
    function Ir(e, t) {
      try {
        var r = "", i = t;
        do
          r += we(i), i = i.return;
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
    function fs(e, t, r) {
      return {
        value: e,
        source: null,
        stack: r ?? null,
        digest: t ?? null
      };
    }
    function ps(e, t) {
      try {
        console.error(t.value);
      } catch (r) {
        setTimeout(function() {
          throw r;
        });
      }
    }
    var mv = typeof WeakMap == "function" ? WeakMap : Map;
    function Bd(e, t, r) {
      r = yn(-1, r), r.tag = 3, r.payload = {
        element: null
      };
      var i = t.value;
      return r.callback = function() {
        cl || (cl = true, Ts = i), ps(e, t);
      }, r;
    }
    function zd(e, t, r) {
      r = yn(-1, r), r.tag = 3;
      var i = e.type.getDerivedStateFromError;
      if (typeof i == "function") {
        var s = t.value;
        r.payload = function() {
          return i(s);
        }, r.callback = function() {
          ps(e, t);
        };
      }
      var c = e.stateNode;
      return c !== null && typeof c.componentDidCatch == "function" && (r.callback = function() {
        ps(e, t), typeof i != "function" && (Wn === null ? Wn = /* @__PURE__ */ new Set([
          this
        ]) : Wn.add(this));
        var m = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: m !== null ? m : ""
        });
      }), r;
    }
    function Fd(e, t, r) {
      var i = e.pingCache;
      if (i === null) {
        i = e.pingCache = new mv();
        var s = /* @__PURE__ */ new Set();
        i.set(t, s);
      } else s = i.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), i.set(t, s));
      s.has(r) || (s.add(r), e = Tv.bind(null, e, t, r), t.then(e, e));
    }
    function Id(e) {
      do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : true), t) return e;
        e = e.return;
      } while (e !== null);
      return null;
    }
    function Wd(e, t, r, i, s) {
      return e.mode & 1 ? (e.flags |= 65536, e.lanes = s, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (t = yn(-1, 1), t.tag = 2, Fn(r, t, 1))), r.lanes |= 1), e);
    }
    var hv = O.ReactCurrentOwner, vt = false;
    function dt(e, t, r, i) {
      t.child = e === null ? ad(t, null, r, i) : Lr(t, e.child, r, i);
    }
    function Hd(e, t, r, i, s) {
      r = r.render;
      var c = t.ref;
      return zr(t, s), i = os(e, t, r, i, c, s), r = is(), e !== null && !vt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~s, wn(e, t, s)) : (_e && r && Wa(t), t.flags |= 1, dt(e, t, i, s), t.child);
    }
    function $d(e, t, r, i, s) {
      if (e === null) {
        var c = r.type;
        return typeof c == "function" && !_s(c) && c.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (t.tag = 15, t.type = c, Ud(e, t, c, i, s)) : (e = gl(r.type, null, i, t, t.mode, s), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (c = e.child, !(e.lanes & s)) {
        var m = c.memoizedProps;
        if (r = r.compare, r = r !== null ? r : No, r(m, i) && e.ref === t.ref) return wn(e, t, s);
      }
      return t.flags |= 1, e = Vn(c, i), e.ref = t.ref, e.return = t, t.child = e;
    }
    function Ud(e, t, r, i, s) {
      if (e !== null) {
        var c = e.memoizedProps;
        if (No(c, i) && e.ref === t.ref) if (vt = false, t.pendingProps = i = c, (e.lanes & s) !== 0) e.flags & 131072 && (vt = true);
        else return t.lanes = e.lanes, wn(e, t, s);
      }
      return ms(e, t, r, i, s);
    }
    function Vd(e, t, r) {
      var i = t.pendingProps, s = i.children, c = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      }, Me(Hr, Pt), Pt |= r;
      else {
        if (!(r & 1073741824)) return e = c !== null ? c.baseLanes | r : r, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
          baseLanes: e,
          cachePool: null,
          transitions: null
        }, t.updateQueue = null, Me(Hr, Pt), Pt |= e, null;
        t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null
        }, i = c !== null ? c.baseLanes : r, Me(Hr, Pt), Pt |= i;
      }
      else c !== null ? (i = c.baseLanes | r, t.memoizedState = null) : i = r, Me(Hr, Pt), Pt |= i;
      return dt(e, t, s, r), t.child;
    }
    function Gd(e, t) {
      var r = t.ref;
      (e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= 512, t.flags |= 2097152);
    }
    function ms(e, t, r, i, s) {
      var c = gt(r) ? sr : at.current;
      return c = Dr(t, c), zr(t, s), r = os(e, t, r, i, c, s), i = is(), e !== null && !vt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~s, wn(e, t, s)) : (_e && i && Wa(t), t.flags |= 1, dt(e, t, r, s), t.child);
    }
    function Kd(e, t, r, i, s) {
      if (gt(r)) {
        var c = true;
        Wi(t);
      } else c = false;
      if (zr(t, s), t.stateNode === null) il(e, t), _d(t, r, i), ds(t, r, i, s), i = true;
      else if (e === null) {
        var m = t.stateNode, C = t.memoizedProps;
        m.props = C;
        var E = m.context, j = r.contextType;
        typeof j == "object" && j !== null ? j = Ot(j) : (j = gt(r) ? sr : at.current, j = Dr(t, j));
        var H = r.getDerivedStateFromProps, $ = typeof H == "function" || typeof m.getSnapshotBeforeUpdate == "function";
        $ || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (C !== i || E !== j) && Ld(t, m, i, j), zn = false;
        var W = t.memoizedState;
        m.state = W, Xi(t, i, m, s), E = t.memoizedState, C !== i || W !== E || ht.current || zn ? (typeof H == "function" && (cs(t, r, H, i), E = t.memoizedState), (C = zn || jd(t, r, C, i, W, E, j)) ? ($ || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = E), m.props = i, m.state = E, m.context = j, i = C) : (typeof m.componentDidMount == "function" && (t.flags |= 4194308), i = false);
      } else {
        m = t.stateNode, ud(e, t), C = t.memoizedProps, j = t.type === t.elementType ? C : Ut(t.type, C), m.props = j, $ = t.pendingProps, W = m.context, E = r.contextType, typeof E == "object" && E !== null ? E = Ot(E) : (E = gt(r) ? sr : at.current, E = Dr(t, E));
        var q = r.getDerivedStateFromProps;
        (H = typeof q == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (C !== $ || W !== E) && Ld(t, m, i, E), zn = false, W = t.memoizedState, m.state = W, Xi(t, i, m, s);
        var ne = t.memoizedState;
        C !== $ || W !== ne || ht.current || zn ? (typeof q == "function" && (cs(t, r, q, i), ne = t.memoizedState), (j = zn || jd(t, r, j, i, W, ne, E) || false) ? (H || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(i, ne, E), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(i, ne, E)), typeof m.componentDidUpdate == "function" && (t.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || C === e.memoizedProps && W === e.memoizedState || (t.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || C === e.memoizedProps && W === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = ne), m.props = i, m.state = ne, m.context = E, i = j) : (typeof m.componentDidUpdate != "function" || C === e.memoizedProps && W === e.memoizedState || (t.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || C === e.memoizedProps && W === e.memoizedState || (t.flags |= 1024), i = false);
      }
      return hs(e, t, r, i, c, s);
    }
    function hs(e, t, r, i, s, c) {
      Gd(e, t);
      var m = (t.flags & 128) !== 0;
      if (!i && !m) return s && Jc(t, r, false), wn(e, t, c);
      i = t.stateNode, hv.current = t;
      var C = m && typeof r.getDerivedStateFromError != "function" ? null : i.render();
      return t.flags |= 1, e !== null && m ? (t.child = Lr(t, e.child, null, c), t.child = Lr(t, null, C, c)) : dt(e, t, C, c), t.memoizedState = i.state, s && Jc(t, r, true), t.child;
    }
    function Yd(e) {
      var t = e.stateNode;
      t.pendingContext ? Xc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Xc(e, t.context, false), Ja(e, t.containerInfo);
    }
    function Qd(e, t, r, i, s) {
      return _r(), Va(s), t.flags |= 256, dt(e, t, r, i), t.child;
    }
    var gs = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0
    };
    function vs(e) {
      return {
        baseLanes: e,
        cachePool: null,
        transitions: null
      };
    }
    function Xd(e, t, r) {
      var i = t.pendingProps, s = Le.current, c = false, m = (t.flags & 128) !== 0, C;
      if ((C = m) || (C = e !== null && e.memoizedState === null ? false : (s & 2) !== 0), C ? (c = true, t.flags &= -129) : (e === null || e.memoizedState !== null) && (s |= 1), Me(Le, s & 1), e === null) return Ua(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (m = i.children, e = i.fallback, c ? (i = t.mode, c = t.child, m = {
        mode: "hidden",
        children: m
      }, !(i & 1) && c !== null ? (c.childLanes = 0, c.pendingProps = m) : c = vl(m, i, 0, null), e = yr(e, i, r, null), c.return = t, e.return = t, c.sibling = e, t.child = c, t.child.memoizedState = vs(r), t.memoizedState = gs, e) : ys(t, m));
      if (s = e.memoizedState, s !== null && (C = s.dehydrated, C !== null)) return gv(e, t, m, i, C, s, r);
      if (c) {
        c = i.fallback, m = t.mode, s = e.child, C = s.sibling;
        var E = {
          mode: "hidden",
          children: i.children
        };
        return !(m & 1) && t.child !== s ? (i = t.child, i.childLanes = 0, i.pendingProps = E, t.deletions = null) : (i = Vn(s, E), i.subtreeFlags = s.subtreeFlags & 14680064), C !== null ? c = Vn(C, c) : (c = yr(c, m, r, null), c.flags |= 2), c.return = t, i.return = t, i.sibling = c, t.child = i, i = c, c = t.child, m = e.child.memoizedState, m = m === null ? vs(r) : {
          baseLanes: m.baseLanes | r,
          cachePool: null,
          transitions: m.transitions
        }, c.memoizedState = m, c.childLanes = e.childLanes & ~r, t.memoizedState = gs, i;
      }
      return c = e.child, e = c.sibling, i = Vn(c, {
        mode: "visible",
        children: i.children
      }), !(t.mode & 1) && (i.lanes = r), i.return = t, i.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [
        e
      ], t.flags |= 16) : r.push(e)), t.child = i, t.memoizedState = null, i;
    }
    function ys(e, t) {
      return t = vl({
        mode: "visible",
        children: t
      }, e.mode, 0, null), t.return = e, e.child = t;
    }
    function ol(e, t, r, i) {
      return i !== null && Va(i), Lr(t, e.child, null, r), e = ys(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
    }
    function gv(e, t, r, i, s, c, m) {
      if (r) return t.flags & 256 ? (t.flags &= -257, i = fs(Error(l(422))), ol(e, t, m, i)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (c = i.fallback, s = t.mode, i = vl({
        mode: "visible",
        children: i.children
      }, s, 0, null), c = yr(c, s, m, null), c.flags |= 2, i.return = t, c.return = t, i.sibling = c, t.child = i, t.mode & 1 && Lr(t, e.child, null, m), t.child.memoizedState = vs(m), t.memoizedState = gs, c);
      if (!(t.mode & 1)) return ol(e, t, m, null);
      if (s.data === "$!") {
        if (i = s.nextSibling && s.nextSibling.dataset, i) var C = i.dgst;
        return i = C, c = Error(l(419)), i = fs(c, i, void 0), ol(e, t, m, i);
      }
      if (C = (m & e.childLanes) !== 0, vt || C) {
        if (i = et, i !== null) {
          switch (m & -m) {
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
          s = s & (i.suspendedLanes | m) ? 0 : s, s !== 0 && s !== c.retryLane && (c.retryLane = s, vn(e, s), Kt(i, e, s, -1));
        }
        return js(), i = fs(Error(l(421))), ol(e, t, m, i);
      }
      return s.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Nv.bind(null, e), s._reactRetry = t, null) : (e = c.treeContext, Et = jn(s.nextSibling), bt = t, _e = true, $t = null, e !== null && (At[Dt++] = hn, At[Dt++] = gn, At[Dt++] = ur, hn = e.id, gn = e.overflow, ur = t), t = ys(t, i.children), t.flags |= 4096, t);
    }
    function qd(e, t, r) {
      e.lanes |= t;
      var i = e.alternate;
      i !== null && (i.lanes |= t), Qa(e.return, t, r);
    }
    function ws(e, t, r, i, s) {
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
    function Jd(e, t, r) {
      var i = t.pendingProps, s = i.revealOrder, c = i.tail;
      if (dt(e, t, i.children, r), i = Le.current, i & 2) i = i & 1 | 2, t.flags |= 128;
      else {
        if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && qd(e, r, t);
          else if (e.tag === 19) qd(e, r, t);
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
      if (Me(Le, i), !(t.mode & 1)) t.memoizedState = null;
      else switch (s) {
        case "forwards":
          for (r = t.child, s = null; r !== null; ) e = r.alternate, e !== null && qi(e) === null && (s = r), r = r.sibling;
          r = s, r === null ? (s = t.child, t.child = null) : (s = r.sibling, r.sibling = null), ws(t, false, s, r, c);
          break;
        case "backwards":
          for (r = null, s = t.child, t.child = null; s !== null; ) {
            if (e = s.alternate, e !== null && qi(e) === null) {
              t.child = s;
              break;
            }
            e = s.sibling, s.sibling = r, r = s, s = e;
          }
          ws(t, true, r, null, c);
          break;
        case "together":
          ws(t, false, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function il(e, t) {
      !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
    }
    function wn(e, t, r) {
      if (e !== null && (t.dependencies = e.dependencies), mr |= t.lanes, !(r & t.childLanes)) return null;
      if (e !== null && t.child !== e.child) throw Error(l(153));
      if (t.child !== null) {
        for (e = t.child, r = Vn(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null; ) e = e.sibling, r = r.sibling = Vn(e, e.pendingProps), r.return = t;
        r.sibling = null;
      }
      return t.child;
    }
    function vv(e, t, r) {
      switch (t.tag) {
        case 3:
          Yd(t), _r();
          break;
        case 5:
          fd(t);
          break;
        case 1:
          gt(t.type) && Wi(t);
          break;
        case 4:
          Ja(t, t.stateNode.containerInfo);
          break;
        case 10:
          var i = t.type._context, s = t.memoizedProps.value;
          Me(Ki, i._currentValue), i._currentValue = s;
          break;
        case 13:
          if (i = t.memoizedState, i !== null) return i.dehydrated !== null ? (Me(Le, Le.current & 1), t.flags |= 128, null) : r & t.child.childLanes ? Xd(e, t, r) : (Me(Le, Le.current & 1), e = wn(e, t, r), e !== null ? e.sibling : null);
          Me(Le, Le.current & 1);
          break;
        case 19:
          if (i = (r & t.childLanes) !== 0, e.flags & 128) {
            if (i) return Jd(e, t, r);
            t.flags |= 128;
          }
          if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), Me(Le, Le.current), i) break;
          return null;
        case 22:
        case 23:
          return t.lanes = 0, Vd(e, t, r);
      }
      return wn(e, t, r);
    }
    var Zd, xs, ef, tf;
    Zd = function(e, t) {
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
    }, xs = function() {
    }, ef = function(e, t, r, i) {
      var s = e.memoizedProps;
      if (s !== i) {
        e = t.stateNode, fr(tn.current);
        var c = null;
        switch (r) {
          case "input":
            s = he(e, s), i = he(e, i), c = [];
            break;
          case "select":
            s = K({}, s, {
              value: void 0
            }), i = K({}, i, {
              value: void 0
            }), c = [];
            break;
          case "textarea":
            s = so(e, s), i = so(e, i), c = [];
            break;
          default:
            typeof s.onClick != "function" && typeof i.onClick == "function" && (e.onclick = zi);
        }
        po(r, i);
        var m;
        r = null;
        for (j in s) if (!i.hasOwnProperty(j) && s.hasOwnProperty(j) && s[j] != null) if (j === "style") {
          var C = s[j];
          for (m in C) C.hasOwnProperty(m) && (r || (r = {}), r[m] = "");
        } else j !== "dangerouslySetInnerHTML" && j !== "children" && j !== "suppressContentEditableWarning" && j !== "suppressHydrationWarning" && j !== "autoFocus" && (u.hasOwnProperty(j) ? c || (c = []) : (c = c || []).push(j, null));
        for (j in i) {
          var E = i[j];
          if (C = s == null ? void 0 : s[j], i.hasOwnProperty(j) && E !== C && (E != null || C != null)) if (j === "style") if (C) {
            for (m in C) !C.hasOwnProperty(m) || E && E.hasOwnProperty(m) || (r || (r = {}), r[m] = "");
            for (m in E) E.hasOwnProperty(m) && C[m] !== E[m] && (r || (r = {}), r[m] = E[m]);
          } else r || (c || (c = []), c.push(j, r)), r = E;
          else j === "dangerouslySetInnerHTML" ? (E = E ? E.__html : void 0, C = C ? C.__html : void 0, E != null && C !== E && (c = c || []).push(j, E)) : j === "children" ? typeof E != "string" && typeof E != "number" || (c = c || []).push(j, "" + E) : j !== "suppressContentEditableWarning" && j !== "suppressHydrationWarning" && (u.hasOwnProperty(j) ? (E != null && j === "onScroll" && Ae("scroll", e), c || C === E || (c = [])) : (c = c || []).push(j, E));
        }
        r && (c = c || []).push("style", r);
        var j = c;
        (t.updateQueue = j) && (t.flags |= 4);
      }
    }, tf = function(e, t, r, i) {
      r !== i && (t.flags |= 4);
    };
    function Uo(e, t) {
      if (!_e) switch (e.tailMode) {
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
    function ut(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, r = 0, i = 0;
      if (t) for (var s = e.child; s !== null; ) r |= s.lanes | s.childLanes, i |= s.subtreeFlags & 14680064, i |= s.flags & 14680064, s.return = e, s = s.sibling;
      else for (s = e.child; s !== null; ) r |= s.lanes | s.childLanes, i |= s.subtreeFlags, i |= s.flags, s.return = e, s = s.sibling;
      return e.subtreeFlags |= i, e.childLanes = r, t;
    }
    function yv(e, t, r) {
      var i = t.pendingProps;
      switch (Ha(t), t.tag) {
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
          return ut(t), null;
        case 1:
          return gt(t.type) && Ii(), ut(t), null;
        case 3:
          return i = t.stateNode, Fr(), De(ht), De(at), ts(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Vi(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, $t !== null && (As($t), $t = null))), xs(e, t), ut(t), null;
        case 5:
          Za(t);
          var s = fr(Fo.current);
          if (r = t.type, e !== null && t.stateNode != null) ef(e, t, r, i, s), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
          else {
            if (!i) {
              if (t.stateNode === null) throw Error(l(166));
              return ut(t), null;
            }
            if (e = fr(tn.current), Vi(t)) {
              i = t.stateNode, r = t.type;
              var c = t.memoizedProps;
              switch (i[en] = t, i[jo] = c, e = (t.mode & 1) !== 0, r) {
                case "dialog":
                  Ae("cancel", i), Ae("close", i);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Ae("load", i);
                  break;
                case "video":
                case "audio":
                  for (s = 0; s < Ao.length; s++) Ae(Ao[s], i);
                  break;
                case "source":
                  Ae("error", i);
                  break;
                case "img":
                case "image":
                case "link":
                  Ae("error", i), Ae("load", i);
                  break;
                case "details":
                  Ae("toggle", i);
                  break;
                case "input":
                  io(i, c), Ae("invalid", i);
                  break;
                case "select":
                  i._wrapperState = {
                    wasMultiple: !!c.multiple
                  }, Ae("invalid", i);
                  break;
                case "textarea":
                  bn(i, c), Ae("invalid", i);
              }
              po(r, c), s = null;
              for (var m in c) if (c.hasOwnProperty(m)) {
                var C = c[m];
                m === "children" ? typeof C == "string" ? i.textContent !== C && (c.suppressHydrationWarning !== true && Bi(i.textContent, C, e), s = [
                  "children",
                  C
                ]) : typeof C == "number" && i.textContent !== "" + C && (c.suppressHydrationWarning !== true && Bi(i.textContent, C, e), s = [
                  "children",
                  "" + C
                ]) : u.hasOwnProperty(m) && C != null && m === "onScroll" && Ae("scroll", i);
              }
              switch (r) {
                case "input":
                  Ct(i), fi(i, c, true);
                  break;
                case "textarea":
                  Ct(i), uo(i);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  typeof c.onClick == "function" && (i.onclick = zi);
              }
              i = s, t.updateQueue = i, i !== null && (t.flags |= 4);
            } else {
              m = s.nodeType === 9 ? s : s.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = mi(r)), e === "http://www.w3.org/1999/xhtml" ? r === "script" ? (e = m.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof i.is == "string" ? e = m.createElement(r, {
                is: i.is
              }) : (e = m.createElement(r), r === "select" && (m = e, i.multiple ? m.multiple = true : i.size && (m.size = i.size))) : e = m.createElementNS(e, r), e[en] = t, e[jo] = i, Zd(e, t, false, false), t.stateNode = e;
              e: {
                switch (m = mo(r, i), r) {
                  case "dialog":
                    Ae("cancel", e), Ae("close", e), s = i;
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    Ae("load", e), s = i;
                    break;
                  case "video":
                  case "audio":
                    for (s = 0; s < Ao.length; s++) Ae(Ao[s], e);
                    s = i;
                    break;
                  case "source":
                    Ae("error", e), s = i;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    Ae("error", e), Ae("load", e), s = i;
                    break;
                  case "details":
                    Ae("toggle", e), s = i;
                    break;
                  case "input":
                    io(e, i), s = he(e, i), Ae("invalid", e);
                    break;
                  case "option":
                    s = i;
                    break;
                  case "select":
                    e._wrapperState = {
                      wasMultiple: !!i.multiple
                    }, s = K({}, i, {
                      value: void 0
                    }), Ae("invalid", e);
                    break;
                  case "textarea":
                    bn(e, i), s = so(e, i), Ae("invalid", e);
                    break;
                  default:
                    s = i;
                }
                po(r, s), C = s;
                for (c in C) if (C.hasOwnProperty(c)) {
                  var E = C[c];
                  c === "style" ? gi(e, E) : c === "dangerouslySetInnerHTML" ? (E = E ? E.__html : void 0, E != null && hi(e, E)) : c === "children" ? typeof E == "string" ? (r !== "textarea" || E !== "") && En(e, E) : typeof E == "number" && En(e, "" + E) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (u.hasOwnProperty(c) ? E != null && c === "onScroll" && Ae("scroll", e) : E != null && z(e, c, E, m));
                }
                switch (r) {
                  case "input":
                    Ct(e), fi(e, i, false);
                    break;
                  case "textarea":
                    Ct(e), uo(e);
                    break;
                  case "option":
                    i.value != null && e.setAttribute("value", "" + Ce(i.value));
                    break;
                  case "select":
                    e.multiple = !!i.multiple, c = i.value, c != null ? dn(e, !!i.multiple, c, false) : i.defaultValue != null && dn(e, !!i.multiple, i.defaultValue, true);
                    break;
                  default:
                    typeof s.onClick == "function" && (e.onclick = zi);
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
          return ut(t), null;
        case 6:
          if (e && t.stateNode != null) tf(e, t, e.memoizedProps, i);
          else {
            if (typeof i != "string" && t.stateNode === null) throw Error(l(166));
            if (r = fr(Fo.current), fr(tn.current), Vi(t)) {
              if (i = t.stateNode, r = t.memoizedProps, i[en] = t, (c = i.nodeValue !== r) && (e = bt, e !== null)) switch (e.tag) {
                case 3:
                  Bi(i.nodeValue, r, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== true && Bi(i.nodeValue, r, (e.mode & 1) !== 0);
              }
              c && (t.flags |= 4);
            } else i = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(i), i[en] = t, t.stateNode = i;
          }
          return ut(t), null;
        case 13:
          if (De(Le), i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (_e && Et !== null && t.mode & 1 && !(t.flags & 128)) od(), _r(), t.flags |= 98560, c = false;
            else if (c = Vi(t), i !== null && i.dehydrated !== null) {
              if (e === null) {
                if (!c) throw Error(l(318));
                if (c = t.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(l(317));
                c[en] = t;
              } else _r(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
              ut(t), c = false;
            } else $t !== null && (As($t), $t = null), c = true;
            if (!c) return t.flags & 65536 ? t : null;
          }
          return t.flags & 128 ? (t.lanes = r, t) : (i = i !== null, i !== (e !== null && e.memoizedState !== null) && i && (t.child.flags |= 8192, t.mode & 1 && (e === null || Le.current & 1 ? Qe === 0 && (Qe = 3) : js())), t.updateQueue !== null && (t.flags |= 4), ut(t), null);
        case 4:
          return Fr(), xs(e, t), e === null && Do(t.stateNode.containerInfo), ut(t), null;
        case 10:
          return Ya(t.type._context), ut(t), null;
        case 17:
          return gt(t.type) && Ii(), ut(t), null;
        case 19:
          if (De(Le), c = t.memoizedState, c === null) return ut(t), null;
          if (i = (t.flags & 128) !== 0, m = c.rendering, m === null) if (i) Uo(c, false);
          else {
            if (Qe !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
              if (m = qi(e), m !== null) {
                for (t.flags |= 128, Uo(c, false), i = m.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), t.subtreeFlags = 0, i = r, r = t.child; r !== null; ) c = r, e = i, c.flags &= 14680066, m = c.alternate, m === null ? (c.childLanes = 0, c.lanes = e, c.child = null, c.subtreeFlags = 0, c.memoizedProps = null, c.memoizedState = null, c.updateQueue = null, c.dependencies = null, c.stateNode = null) : (c.childLanes = m.childLanes, c.lanes = m.lanes, c.child = m.child, c.subtreeFlags = 0, c.deletions = null, c.memoizedProps = m.memoizedProps, c.memoizedState = m.memoizedState, c.updateQueue = m.updateQueue, c.type = m.type, e = m.dependencies, c.dependencies = e === null ? null : {
                  lanes: e.lanes,
                  firstContext: e.firstContext
                }), r = r.sibling;
                return Me(Le, Le.current & 1 | 2), t.child;
              }
              e = e.sibling;
            }
            c.tail !== null && He() > $r && (t.flags |= 128, i = true, Uo(c, false), t.lanes = 4194304);
          }
          else {
            if (!i) if (e = qi(m), e !== null) {
              if (t.flags |= 128, i = true, r = e.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), Uo(c, true), c.tail === null && c.tailMode === "hidden" && !m.alternate && !_e) return ut(t), null;
            } else 2 * He() - c.renderingStartTime > $r && r !== 1073741824 && (t.flags |= 128, i = true, Uo(c, false), t.lanes = 4194304);
            c.isBackwards ? (m.sibling = t.child, t.child = m) : (r = c.last, r !== null ? r.sibling = m : t.child = m, c.last = m);
          }
          return c.tail !== null ? (t = c.tail, c.rendering = t, c.tail = t.sibling, c.renderingStartTime = He(), t.sibling = null, r = Le.current, Me(Le, i ? r & 1 | 2 : r & 1), t) : (ut(t), null);
        case 22:
        case 23:
          return Os(), i = t.memoizedState !== null, e !== null && e.memoizedState !== null !== i && (t.flags |= 8192), i && t.mode & 1 ? Pt & 1073741824 && (ut(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ut(t), null;
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(l(156, t.tag));
    }
    function wv(e, t) {
      switch (Ha(t), t.tag) {
        case 1:
          return gt(t.type) && Ii(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
          return Fr(), De(ht), De(at), ts(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
        case 5:
          return Za(t), null;
        case 13:
          if (De(Le), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null) throw Error(l(340));
            _r();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
          return De(Le), null;
        case 4:
          return Fr(), null;
        case 10:
          return Ya(t.type._context), null;
        case 22:
        case 23:
          return Os(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var ll = false, ct = false, xv = typeof WeakSet == "function" ? WeakSet : Set, te = null;
    function Wr(e, t) {
      var r = e.ref;
      if (r !== null) if (typeof r == "function") try {
        r(null);
      } catch (i) {
        Ie(e, t, i);
      }
      else r.current = null;
    }
    function Ss(e, t, r) {
      try {
        r();
      } catch (i) {
        Ie(e, t, i);
      }
    }
    var nf = false;
    function Sv(e, t) {
      if (Oa = Pi, e = jc(), Ea(e)) {
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
            var m = 0, C = -1, E = -1, j = 0, H = 0, $ = e, W = null;
            t: for (; ; ) {
              for (var q; $ !== r || s !== 0 && $.nodeType !== 3 || (C = m + s), $ !== c || i !== 0 && $.nodeType !== 3 || (E = m + i), $.nodeType === 3 && (m += $.nodeValue.length), (q = $.firstChild) !== null; ) W = $, $ = q;
              for (; ; ) {
                if ($ === e) break t;
                if (W === r && ++j === s && (C = m), W === c && ++H === i && (E = m), (q = $.nextSibling) !== null) break;
                $ = W, W = $.parentNode;
              }
              $ = q;
            }
            r = C === -1 || E === -1 ? null : {
              start: C,
              end: E
            };
          } else r = null;
        }
        r = r || {
          start: 0,
          end: 0
        };
      } else r = null;
      for (ja = {
        focusedElem: e,
        selectionRange: r
      }, Pi = false, te = t; te !== null; ) if (t = te, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, te = e;
      else for (; te !== null; ) {
        t = te;
        try {
          var ne = t.alternate;
          if (t.flags & 1024) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              break;
            case 1:
              if (ne !== null) {
                var re = ne.memoizedProps, $e = ne.memoizedState, M = t.stateNode, R = M.getSnapshotBeforeUpdate(t.elementType === t.type ? re : Ut(t.type, re), $e);
                M.__reactInternalSnapshotBeforeUpdate = R;
              }
              break;
            case 3:
              var D = t.stateNode.containerInfo;
              D.nodeType === 1 ? D.textContent = "" : D.nodeType === 9 && D.documentElement && D.removeChild(D.documentElement);
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
          Ie(t, t.return, V);
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, te = e;
          break;
        }
        te = t.return;
      }
      return ne = nf, nf = false, ne;
    }
    function Vo(e, t, r) {
      var i = t.updateQueue;
      if (i = i !== null ? i.lastEffect : null, i !== null) {
        var s = i = i.next;
        do {
          if ((s.tag & e) === e) {
            var c = s.destroy;
            s.destroy = void 0, c !== void 0 && Ss(t, r, c);
          }
          s = s.next;
        } while (s !== i);
      }
    }
    function al(e, t) {
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
    function Cs(e) {
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
    function rf(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, rf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[en], delete t[jo], delete t[za], delete t[rv], delete t[ov])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    function of(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function lf(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || of(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function ks(e, t, r) {
      var i = e.tag;
      if (i === 5 || i === 6) e = e.stateNode, t ? r.nodeType === 8 ? r.parentNode.insertBefore(e, t) : r.insertBefore(e, t) : (r.nodeType === 8 ? (t = r.parentNode, t.insertBefore(e, r)) : (t = r, t.appendChild(e)), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = zi));
      else if (i !== 4 && (e = e.child, e !== null)) for (ks(e, t, r), e = e.sibling; e !== null; ) ks(e, t, r), e = e.sibling;
    }
    function bs(e, t, r) {
      var i = e.tag;
      if (i === 5 || i === 6) e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
      else if (i !== 4 && (e = e.child, e !== null)) for (bs(e, t, r), e = e.sibling; e !== null; ) bs(e, t, r), e = e.sibling;
    }
    var ot = null, Vt = false;
    function In(e, t, r) {
      for (r = r.child; r !== null; ) af(e, t, r), r = r.sibling;
    }
    function af(e, t, r) {
      if (Zt && typeof Zt.onCommitFiberUnmount == "function") try {
        Zt.onCommitFiberUnmount(xi, r);
      } catch {
      }
      switch (r.tag) {
        case 5:
          ct || Wr(r, t);
        case 6:
          var i = ot, s = Vt;
          ot = null, In(e, t, r), ot = i, Vt = s, ot !== null && (Vt ? (e = ot, r = r.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r)) : ot.removeChild(r.stateNode));
          break;
        case 18:
          ot !== null && (Vt ? (e = ot, r = r.stateNode, e.nodeType === 8 ? Ba(e.parentNode, r) : e.nodeType === 1 && Ba(e, r), ko(e)) : Ba(ot, r.stateNode));
          break;
        case 4:
          i = ot, s = Vt, ot = r.stateNode.containerInfo, Vt = true, In(e, t, r), ot = i, Vt = s;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (!ct && (i = r.updateQueue, i !== null && (i = i.lastEffect, i !== null))) {
            s = i = i.next;
            do {
              var c = s, m = c.destroy;
              c = c.tag, m !== void 0 && (c & 2 || c & 4) && Ss(r, t, m), s = s.next;
            } while (s !== i);
          }
          In(e, t, r);
          break;
        case 1:
          if (!ct && (Wr(r, t), i = r.stateNode, typeof i.componentWillUnmount == "function")) try {
            i.props = r.memoizedProps, i.state = r.memoizedState, i.componentWillUnmount();
          } catch (C) {
            Ie(r, t, C);
          }
          In(e, t, r);
          break;
        case 21:
          In(e, t, r);
          break;
        case 22:
          r.mode & 1 ? (ct = (i = ct) || r.memoizedState !== null, In(e, t, r), ct = i) : In(e, t, r);
          break;
        default:
          In(e, t, r);
      }
    }
    function sf(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var r = e.stateNode;
        r === null && (r = e.stateNode = new xv()), t.forEach(function(i) {
          var s = Mv.bind(null, e, i);
          r.has(i) || (r.add(i), i.then(s, s));
        });
      }
    }
    function Gt(e, t) {
      var r = t.deletions;
      if (r !== null) for (var i = 0; i < r.length; i++) {
        var s = r[i];
        try {
          var c = e, m = t, C = m;
          e: for (; C !== null; ) {
            switch (C.tag) {
              case 5:
                ot = C.stateNode, Vt = false;
                break e;
              case 3:
                ot = C.stateNode.containerInfo, Vt = true;
                break e;
              case 4:
                ot = C.stateNode.containerInfo, Vt = true;
                break e;
            }
            C = C.return;
          }
          if (ot === null) throw Error(l(160));
          af(c, m, s), ot = null, Vt = false;
          var E = s.alternate;
          E !== null && (E.return = null), s.return = null;
        } catch (j) {
          Ie(s, t, j);
        }
      }
      if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) uf(t, e), t = t.sibling;
    }
    function uf(e, t) {
      var r = e.alternate, i = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if (Gt(t, e), rn(e), i & 4) {
            try {
              Vo(3, e, e.return), al(3, e);
            } catch (re) {
              Ie(e, e.return, re);
            }
            try {
              Vo(5, e, e.return);
            } catch (re) {
              Ie(e, e.return, re);
            }
          }
          break;
        case 1:
          Gt(t, e), rn(e), i & 512 && r !== null && Wr(r, r.return);
          break;
        case 5:
          if (Gt(t, e), rn(e), i & 512 && r !== null && Wr(r, r.return), e.flags & 32) {
            var s = e.stateNode;
            try {
              En(s, "");
            } catch (re) {
              Ie(e, e.return, re);
            }
          }
          if (i & 4 && (s = e.stateNode, s != null)) {
            var c = e.memoizedProps, m = r !== null ? r.memoizedProps : c, C = e.type, E = e.updateQueue;
            if (e.updateQueue = null, E !== null) try {
              C === "input" && c.type === "radio" && c.name != null && lo(s, c), mo(C, m);
              var j = mo(C, c);
              for (m = 0; m < E.length; m += 2) {
                var H = E[m], $ = E[m + 1];
                H === "style" ? gi(s, $) : H === "dangerouslySetInnerHTML" ? hi(s, $) : H === "children" ? En(s, $) : z(s, H, $, j);
              }
              switch (C) {
                case "input":
                  rr(s, c);
                  break;
                case "textarea":
                  pi(s, c);
                  break;
                case "select":
                  var W = s._wrapperState.wasMultiple;
                  s._wrapperState.wasMultiple = !!c.multiple;
                  var q = c.value;
                  q != null ? dn(s, !!c.multiple, q, false) : W !== !!c.multiple && (c.defaultValue != null ? dn(s, !!c.multiple, c.defaultValue, true) : dn(s, !!c.multiple, c.multiple ? [] : "", false));
              }
              s[jo] = c;
            } catch (re) {
              Ie(e, e.return, re);
            }
          }
          break;
        case 6:
          if (Gt(t, e), rn(e), i & 4) {
            if (e.stateNode === null) throw Error(l(162));
            s = e.stateNode, c = e.memoizedProps;
            try {
              s.nodeValue = c;
            } catch (re) {
              Ie(e, e.return, re);
            }
          }
          break;
        case 3:
          if (Gt(t, e), rn(e), i & 4 && r !== null && r.memoizedState.isDehydrated) try {
            ko(t.containerInfo);
          } catch (re) {
            Ie(e, e.return, re);
          }
          break;
        case 4:
          Gt(t, e), rn(e);
          break;
        case 13:
          Gt(t, e), rn(e), s = e.child, s.flags & 8192 && (c = s.memoizedState !== null, s.stateNode.isHidden = c, !c || s.alternate !== null && s.alternate.memoizedState !== null || (Rs = He())), i & 4 && sf(e);
          break;
        case 22:
          if (H = r !== null && r.memoizedState !== null, e.mode & 1 ? (ct = (j = ct) || H, Gt(t, e), ct = j) : Gt(t, e), rn(e), i & 8192) {
            if (j = e.memoizedState !== null, (e.stateNode.isHidden = j) && !H && e.mode & 1) for (te = e, H = e.child; H !== null; ) {
              for ($ = te = H; te !== null; ) {
                switch (W = te, q = W.child, W.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Vo(4, W, W.return);
                    break;
                  case 1:
                    Wr(W, W.return);
                    var ne = W.stateNode;
                    if (typeof ne.componentWillUnmount == "function") {
                      i = W, r = W.return;
                      try {
                        t = i, ne.props = t.memoizedProps, ne.state = t.memoizedState, ne.componentWillUnmount();
                      } catch (re) {
                        Ie(i, r, re);
                      }
                    }
                    break;
                  case 5:
                    Wr(W, W.return);
                    break;
                  case 22:
                    if (W.memoizedState !== null) {
                      ff($);
                      continue;
                    }
                }
                q !== null ? (q.return = W, te = q) : ff($);
              }
              H = H.sibling;
            }
            e: for (H = null, $ = e; ; ) {
              if ($.tag === 5) {
                if (H === null) {
                  H = $;
                  try {
                    s = $.stateNode, j ? (c = s.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none") : (C = $.stateNode, E = $.memoizedProps.style, m = E != null && E.hasOwnProperty("display") ? E.display : null, C.style.display = fo("display", m));
                  } catch (re) {
                    Ie(e, e.return, re);
                  }
                }
              } else if ($.tag === 6) {
                if (H === null) try {
                  $.stateNode.nodeValue = j ? "" : $.memoizedProps;
                } catch (re) {
                  Ie(e, e.return, re);
                }
              } else if (($.tag !== 22 && $.tag !== 23 || $.memoizedState === null || $ === e) && $.child !== null) {
                $.child.return = $, $ = $.child;
                continue;
              }
              if ($ === e) break e;
              for (; $.sibling === null; ) {
                if ($.return === null || $.return === e) break e;
                H === $ && (H = null), $ = $.return;
              }
              H === $ && (H = null), $.sibling.return = $.return, $ = $.sibling;
            }
          }
          break;
        case 19:
          Gt(t, e), rn(e), i & 4 && sf(e);
          break;
        case 21:
          break;
        default:
          Gt(t, e), rn(e);
      }
    }
    function rn(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          e: {
            for (var r = e.return; r !== null; ) {
              if (of(r)) {
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
              i.flags & 32 && (En(s, ""), i.flags &= -33);
              var c = lf(e);
              bs(e, c, s);
              break;
            case 3:
            case 4:
              var m = i.stateNode.containerInfo, C = lf(e);
              ks(e, C, m);
              break;
            default:
              throw Error(l(161));
          }
        } catch (E) {
          Ie(e, e.return, E);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function Cv(e, t, r) {
      te = e, cf(e);
    }
    function cf(e, t, r) {
      for (var i = (e.mode & 1) !== 0; te !== null; ) {
        var s = te, c = s.child;
        if (s.tag === 22 && i) {
          var m = s.memoizedState !== null || ll;
          if (!m) {
            var C = s.alternate, E = C !== null && C.memoizedState !== null || ct;
            C = ll;
            var j = ct;
            if (ll = m, (ct = E) && !j) for (te = s; te !== null; ) m = te, E = m.child, m.tag === 22 && m.memoizedState !== null ? pf(s) : E !== null ? (E.return = m, te = E) : pf(s);
            for (; c !== null; ) te = c, cf(c), c = c.sibling;
            te = s, ll = C, ct = j;
          }
          df(e);
        } else s.subtreeFlags & 8772 && c !== null ? (c.return = s, te = c) : df(e);
      }
    }
    function df(e) {
      for (; te !== null; ) {
        var t = te;
        if (t.flags & 8772) {
          var r = t.alternate;
          try {
            if (t.flags & 8772) switch (t.tag) {
              case 0:
              case 11:
              case 15:
                ct || al(5, t);
                break;
              case 1:
                var i = t.stateNode;
                if (t.flags & 4 && !ct) if (r === null) i.componentDidMount();
                else {
                  var s = t.elementType === t.type ? r.memoizedProps : Ut(t.type, r.memoizedProps);
                  i.componentDidUpdate(s, r.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
                }
                var c = t.updateQueue;
                c !== null && dd(t, c, i);
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
                  dd(t, m, r);
                }
                break;
              case 5:
                var C = t.stateNode;
                if (r === null && t.flags & 4) {
                  r = C;
                  var E = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      E.autoFocus && r.focus();
                      break;
                    case "img":
                      E.src && (r.src = E.src);
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
                  var j = t.alternate;
                  if (j !== null) {
                    var H = j.memoizedState;
                    if (H !== null) {
                      var $ = H.dehydrated;
                      $ !== null && ko($);
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
            ct || t.flags & 512 && Cs(t);
          } catch (W) {
            Ie(t, t.return, W);
          }
        }
        if (t === e) {
          te = null;
          break;
        }
        if (r = t.sibling, r !== null) {
          r.return = t.return, te = r;
          break;
        }
        te = t.return;
      }
    }
    function ff(e) {
      for (; te !== null; ) {
        var t = te;
        if (t === e) {
          te = null;
          break;
        }
        var r = t.sibling;
        if (r !== null) {
          r.return = t.return, te = r;
          break;
        }
        te = t.return;
      }
    }
    function pf(e) {
      for (; te !== null; ) {
        var t = te;
        try {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              var r = t.return;
              try {
                al(4, t);
              } catch (E) {
                Ie(t, r, E);
              }
              break;
            case 1:
              var i = t.stateNode;
              if (typeof i.componentDidMount == "function") {
                var s = t.return;
                try {
                  i.componentDidMount();
                } catch (E) {
                  Ie(t, s, E);
                }
              }
              var c = t.return;
              try {
                Cs(t);
              } catch (E) {
                Ie(t, c, E);
              }
              break;
            case 5:
              var m = t.return;
              try {
                Cs(t);
              } catch (E) {
                Ie(t, m, E);
              }
          }
        } catch (E) {
          Ie(t, t.return, E);
        }
        if (t === e) {
          te = null;
          break;
        }
        var C = t.sibling;
        if (C !== null) {
          C.return = t.return, te = C;
          break;
        }
        te = t.return;
      }
    }
    var kv = Math.ceil, sl = O.ReactCurrentDispatcher, Es = O.ReactCurrentOwner, _t = O.ReactCurrentBatchConfig, Pe = 0, et = null, Ue = null, it = 0, Pt = 0, Hr = _n(0), Qe = 0, Go = null, mr = 0, ul = 0, Ps = 0, Ko = null, yt = null, Rs = 0, $r = 1 / 0, xn = null, cl = false, Ts = null, Wn = null, dl = false, Hn = null, fl = 0, Yo = 0, Ns = null, pl = -1, ml = 0;
    function ft() {
      return Pe & 6 ? He() : pl !== -1 ? pl : pl = He();
    }
    function $n(e) {
      return e.mode & 1 ? Pe & 2 && it !== 0 ? it & -it : lv.transition !== null ? (ml === 0 && (ml = ic()), ml) : (e = Ne, e !== 0 || (e = window.event, e = e === void 0 ? 16 : mc(e.type)), e) : 1;
    }
    function Kt(e, t, r, i) {
      if (50 < Yo) throw Yo = 0, Ns = null, Error(l(185));
      yo(e, r, i), (!(Pe & 2) || e !== et) && (e === et && (!(Pe & 2) && (ul |= r), Qe === 4 && Un(e, it)), wt(e, i), r === 1 && Pe === 0 && !(t.mode & 1) && ($r = He() + 500, Hi && Bn()));
    }
    function wt(e, t) {
      var r = e.callbackNode;
      lg(e, t);
      var i = ki(e, e === et ? it : 0);
      if (i === 0) r !== null && nc(r), e.callbackNode = null, e.callbackPriority = 0;
      else if (t = i & -i, e.callbackPriority !== t) {
        if (r != null && nc(r), t === 1) e.tag === 0 ? iv(hf.bind(null, e)) : Zc(hf.bind(null, e)), tv(function() {
          !(Pe & 6) && Bn();
        }), r = null;
        else {
          switch (lc(i)) {
            case 1:
              r = sa;
              break;
            case 4:
              r = rc;
              break;
            case 16:
              r = wi;
              break;
            case 536870912:
              r = oc;
              break;
            default:
              r = wi;
          }
          r = kf(r, mf.bind(null, e));
        }
        e.callbackPriority = t, e.callbackNode = r;
      }
    }
    function mf(e, t) {
      if (pl = -1, ml = 0, Pe & 6) throw Error(l(327));
      var r = e.callbackNode;
      if (Ur() && e.callbackNode !== r) return null;
      var i = ki(e, e === et ? it : 0);
      if (i === 0) return null;
      if (i & 30 || i & e.expiredLanes || t) t = hl(e, i);
      else {
        t = i;
        var s = Pe;
        Pe |= 2;
        var c = vf();
        (et !== e || it !== t) && (xn = null, $r = He() + 500, gr(e, t));
        do
          try {
            Pv();
            break;
          } catch (C) {
            gf(e, C);
          }
        while (true);
        Ka(), sl.current = c, Pe = s, Ue !== null ? t = 0 : (et = null, it = 0, t = Qe);
      }
      if (t !== 0) {
        if (t === 2 && (s = ua(e), s !== 0 && (i = s, t = Ms(e, s))), t === 1) throw r = Go, gr(e, 0), Un(e, i), wt(e, He()), r;
        if (t === 6) Un(e, i);
        else {
          if (s = e.current.alternate, !(i & 30) && !bv(s) && (t = hl(e, i), t === 2 && (c = ua(e), c !== 0 && (i = c, t = Ms(e, c))), t === 1)) throw r = Go, gr(e, 0), Un(e, i), wt(e, He()), r;
          switch (e.finishedWork = s, e.finishedLanes = i, t) {
            case 0:
            case 1:
              throw Error(l(345));
            case 2:
              vr(e, yt, xn);
              break;
            case 3:
              if (Un(e, i), (i & 130023424) === i && (t = Rs + 500 - He(), 10 < t)) {
                if (ki(e, 0) !== 0) break;
                if (s = e.suspendedLanes, (s & i) !== i) {
                  ft(), e.pingedLanes |= e.suspendedLanes & s;
                  break;
                }
                e.timeoutHandle = La(vr.bind(null, e, yt, xn), t);
                break;
              }
              vr(e, yt, xn);
              break;
            case 4:
              if (Un(e, i), (i & 4194240) === i) break;
              for (t = e.eventTimes, s = -1; 0 < i; ) {
                var m = 31 - Wt(i);
                c = 1 << m, m = t[m], m > s && (s = m), i &= ~c;
              }
              if (i = s, i = He() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * kv(i / 1960)) - i, 10 < i) {
                e.timeoutHandle = La(vr.bind(null, e, yt, xn), i);
                break;
              }
              vr(e, yt, xn);
              break;
            case 5:
              vr(e, yt, xn);
              break;
            default:
              throw Error(l(329));
          }
        }
      }
      return wt(e, He()), e.callbackNode === r ? mf.bind(null, e) : null;
    }
    function Ms(e, t) {
      var r = Ko;
      return e.current.memoizedState.isDehydrated && (gr(e, t).flags |= 256), e = hl(e, t), e !== 2 && (t = yt, yt = r, t !== null && As(t)), e;
    }
    function As(e) {
      yt === null ? yt = e : yt.push.apply(yt, e);
    }
    function bv(e) {
      for (var t = e; ; ) {
        if (t.flags & 16384) {
          var r = t.updateQueue;
          if (r !== null && (r = r.stores, r !== null)) for (var i = 0; i < r.length; i++) {
            var s = r[i], c = s.getSnapshot;
            s = s.value;
            try {
              if (!Ht(c(), s)) return false;
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
    function Un(e, t) {
      for (t &= ~Ps, t &= ~ul, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
        var r = 31 - Wt(t), i = 1 << r;
        e[r] = -1, t &= ~i;
      }
    }
    function hf(e) {
      if (Pe & 6) throw Error(l(327));
      Ur();
      var t = ki(e, 0);
      if (!(t & 1)) return wt(e, He()), null;
      var r = hl(e, t);
      if (e.tag !== 0 && r === 2) {
        var i = ua(e);
        i !== 0 && (t = i, r = Ms(e, i));
      }
      if (r === 1) throw r = Go, gr(e, 0), Un(e, t), wt(e, He()), r;
      if (r === 6) throw Error(l(345));
      return e.finishedWork = e.current.alternate, e.finishedLanes = t, vr(e, yt, xn), wt(e, He()), null;
    }
    function Ds(e, t) {
      var r = Pe;
      Pe |= 1;
      try {
        return e(t);
      } finally {
        Pe = r, Pe === 0 && ($r = He() + 500, Hi && Bn());
      }
    }
    function hr(e) {
      Hn !== null && Hn.tag === 0 && !(Pe & 6) && Ur();
      var t = Pe;
      Pe |= 1;
      var r = _t.transition, i = Ne;
      try {
        if (_t.transition = null, Ne = 1, e) return e();
      } finally {
        Ne = i, _t.transition = r, Pe = t, !(Pe & 6) && Bn();
      }
    }
    function Os() {
      Pt = Hr.current, De(Hr);
    }
    function gr(e, t) {
      e.finishedWork = null, e.finishedLanes = 0;
      var r = e.timeoutHandle;
      if (r !== -1 && (e.timeoutHandle = -1, ev(r)), Ue !== null) for (r = Ue.return; r !== null; ) {
        var i = r;
        switch (Ha(i), i.tag) {
          case 1:
            i = i.type.childContextTypes, i != null && Ii();
            break;
          case 3:
            Fr(), De(ht), De(at), ts();
            break;
          case 5:
            Za(i);
            break;
          case 4:
            Fr();
            break;
          case 13:
            De(Le);
            break;
          case 19:
            De(Le);
            break;
          case 10:
            Ya(i.type._context);
            break;
          case 22:
          case 23:
            Os();
        }
        r = r.return;
      }
      if (et = e, Ue = e = Vn(e.current, null), it = Pt = t, Qe = 0, Go = null, Ps = ul = mr = 0, yt = Ko = null, dr !== null) {
        for (t = 0; t < dr.length; t++) if (r = dr[t], i = r.interleaved, i !== null) {
          r.interleaved = null;
          var s = i.next, c = r.pending;
          if (c !== null) {
            var m = c.next;
            c.next = s, i.next = m;
          }
          r.pending = i;
        }
        dr = null;
      }
      return e;
    }
    function gf(e, t) {
      do {
        var r = Ue;
        try {
          if (Ka(), Ji.current = nl, Zi) {
            for (var i = Be.memoizedState; i !== null; ) {
              var s = i.queue;
              s !== null && (s.pending = null), i = i.next;
            }
            Zi = false;
          }
          if (pr = 0, Ze = Ye = Be = null, Io = false, Wo = 0, Es.current = null, r === null || r.return === null) {
            Qe = 1, Go = t, Ue = null;
            break;
          }
          e: {
            var c = e, m = r.return, C = r, E = t;
            if (t = it, C.flags |= 32768, E !== null && typeof E == "object" && typeof E.then == "function") {
              var j = E, H = C, $ = H.tag;
              if (!(H.mode & 1) && ($ === 0 || $ === 11 || $ === 15)) {
                var W = H.alternate;
                W ? (H.updateQueue = W.updateQueue, H.memoizedState = W.memoizedState, H.lanes = W.lanes) : (H.updateQueue = null, H.memoizedState = null);
              }
              var q = Id(m);
              if (q !== null) {
                q.flags &= -257, Wd(q, m, C, c, t), q.mode & 1 && Fd(c, j, t), t = q, E = j;
                var ne = t.updateQueue;
                if (ne === null) {
                  var re = /* @__PURE__ */ new Set();
                  re.add(E), t.updateQueue = re;
                } else ne.add(E);
                break e;
              } else {
                if (!(t & 1)) {
                  Fd(c, j, t), js();
                  break e;
                }
                E = Error(l(426));
              }
            } else if (_e && C.mode & 1) {
              var $e = Id(m);
              if ($e !== null) {
                !($e.flags & 65536) && ($e.flags |= 256), Wd($e, m, C, c, t), Va(Ir(E, C));
                break e;
              }
            }
            c = E = Ir(E, C), Qe !== 4 && (Qe = 2), Ko === null ? Ko = [
              c
            ] : Ko.push(c), c = m;
            do {
              switch (c.tag) {
                case 3:
                  c.flags |= 65536, t &= -t, c.lanes |= t;
                  var M = Bd(c, E, t);
                  cd(c, M);
                  break e;
                case 1:
                  C = E;
                  var R = c.type, D = c.stateNode;
                  if (!(c.flags & 128) && (typeof R.getDerivedStateFromError == "function" || D !== null && typeof D.componentDidCatch == "function" && (Wn === null || !Wn.has(D)))) {
                    c.flags |= 65536, t &= -t, c.lanes |= t;
                    var V = zd(c, C, t);
                    cd(c, V);
                    break e;
                  }
              }
              c = c.return;
            } while (c !== null);
          }
          wf(r);
        } catch (ie) {
          t = ie, Ue === r && r !== null && (Ue = r = r.return);
          continue;
        }
        break;
      } while (true);
    }
    function vf() {
      var e = sl.current;
      return sl.current = nl, e === null ? nl : e;
    }
    function js() {
      (Qe === 0 || Qe === 3 || Qe === 2) && (Qe = 4), et === null || !(mr & 268435455) && !(ul & 268435455) || Un(et, it);
    }
    function hl(e, t) {
      var r = Pe;
      Pe |= 2;
      var i = vf();
      (et !== e || it !== t) && (xn = null, gr(e, t));
      do
        try {
          Ev();
          break;
        } catch (s) {
          gf(e, s);
        }
      while (true);
      if (Ka(), Pe = r, sl.current = i, Ue !== null) throw Error(l(261));
      return et = null, it = 0, Qe;
    }
    function Ev() {
      for (; Ue !== null; ) yf(Ue);
    }
    function Pv() {
      for (; Ue !== null && !qh(); ) yf(Ue);
    }
    function yf(e) {
      var t = Cf(e.alternate, e, Pt);
      e.memoizedProps = e.pendingProps, t === null ? wf(e) : Ue = t, Es.current = null;
    }
    function wf(e) {
      var t = e;
      do {
        var r = t.alternate;
        if (e = t.return, t.flags & 32768) {
          if (r = wv(r, t), r !== null) {
            r.flags &= 32767, Ue = r;
            return;
          }
          if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
          else {
            Qe = 6, Ue = null;
            return;
          }
        } else if (r = yv(r, t, Pt), r !== null) {
          Ue = r;
          return;
        }
        if (t = t.sibling, t !== null) {
          Ue = t;
          return;
        }
        Ue = t = e;
      } while (t !== null);
      Qe === 0 && (Qe = 5);
    }
    function vr(e, t, r) {
      var i = Ne, s = _t.transition;
      try {
        _t.transition = null, Ne = 1, Rv(e, t, r, i);
      } finally {
        _t.transition = s, Ne = i;
      }
      return null;
    }
    function Rv(e, t, r, i) {
      do
        Ur();
      while (Hn !== null);
      if (Pe & 6) throw Error(l(327));
      r = e.finishedWork;
      var s = e.finishedLanes;
      if (r === null) return null;
      if (e.finishedWork = null, e.finishedLanes = 0, r === e.current) throw Error(l(177));
      e.callbackNode = null, e.callbackPriority = 0;
      var c = r.lanes | r.childLanes;
      if (ag(e, c), e === et && (Ue = et = null, it = 0), !(r.subtreeFlags & 2064) && !(r.flags & 2064) || dl || (dl = true, kf(wi, function() {
        return Ur(), null;
      })), c = (r.flags & 15990) !== 0, r.subtreeFlags & 15990 || c) {
        c = _t.transition, _t.transition = null;
        var m = Ne;
        Ne = 1;
        var C = Pe;
        Pe |= 4, Es.current = null, Sv(e, r), uf(r, e), Kg(ja), Pi = !!Oa, ja = Oa = null, e.current = r, Cv(r), Jh(), Pe = C, Ne = m, _t.transition = c;
      } else e.current = r;
      if (dl && (dl = false, Hn = e, fl = s), c = e.pendingLanes, c === 0 && (Wn = null), tg(r.stateNode), wt(e, He()), t !== null) for (i = e.onRecoverableError, r = 0; r < t.length; r++) s = t[r], i(s.value, {
        componentStack: s.stack,
        digest: s.digest
      });
      if (cl) throw cl = false, e = Ts, Ts = null, e;
      return fl & 1 && e.tag !== 0 && Ur(), c = e.pendingLanes, c & 1 ? e === Ns ? Yo++ : (Yo = 0, Ns = e) : Yo = 0, Bn(), null;
    }
    function Ur() {
      if (Hn !== null) {
        var e = lc(fl), t = _t.transition, r = Ne;
        try {
          if (_t.transition = null, Ne = 16 > e ? 16 : e, Hn === null) var i = false;
          else {
            if (e = Hn, Hn = null, fl = 0, Pe & 6) throw Error(l(331));
            var s = Pe;
            for (Pe |= 4, te = e.current; te !== null; ) {
              var c = te, m = c.child;
              if (te.flags & 16) {
                var C = c.deletions;
                if (C !== null) {
                  for (var E = 0; E < C.length; E++) {
                    var j = C[E];
                    for (te = j; te !== null; ) {
                      var H = te;
                      switch (H.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Vo(8, H, c);
                      }
                      var $ = H.child;
                      if ($ !== null) $.return = H, te = $;
                      else for (; te !== null; ) {
                        H = te;
                        var W = H.sibling, q = H.return;
                        if (rf(H), H === j) {
                          te = null;
                          break;
                        }
                        if (W !== null) {
                          W.return = q, te = W;
                          break;
                        }
                        te = q;
                      }
                    }
                  }
                  var ne = c.alternate;
                  if (ne !== null) {
                    var re = ne.child;
                    if (re !== null) {
                      ne.child = null;
                      do {
                        var $e = re.sibling;
                        re.sibling = null, re = $e;
                      } while (re !== null);
                    }
                  }
                  te = c;
                }
              }
              if (c.subtreeFlags & 2064 && m !== null) m.return = c, te = m;
              else e: for (; te !== null; ) {
                if (c = te, c.flags & 2048) switch (c.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Vo(9, c, c.return);
                }
                var M = c.sibling;
                if (M !== null) {
                  M.return = c.return, te = M;
                  break e;
                }
                te = c.return;
              }
            }
            var R = e.current;
            for (te = R; te !== null; ) {
              m = te;
              var D = m.child;
              if (m.subtreeFlags & 2064 && D !== null) D.return = m, te = D;
              else e: for (m = R; te !== null; ) {
                if (C = te, C.flags & 2048) try {
                  switch (C.tag) {
                    case 0:
                    case 11:
                    case 15:
                      al(9, C);
                  }
                } catch (ie) {
                  Ie(C, C.return, ie);
                }
                if (C === m) {
                  te = null;
                  break e;
                }
                var V = C.sibling;
                if (V !== null) {
                  V.return = C.return, te = V;
                  break e;
                }
                te = C.return;
              }
            }
            if (Pe = s, Bn(), Zt && typeof Zt.onPostCommitFiberRoot == "function") try {
              Zt.onPostCommitFiberRoot(xi, e);
            } catch {
            }
            i = true;
          }
          return i;
        } finally {
          Ne = r, _t.transition = t;
        }
      }
      return false;
    }
    function xf(e, t, r) {
      t = Ir(r, t), t = Bd(e, t, 1), e = Fn(e, t, 1), t = ft(), e !== null && (yo(e, 1, t), wt(e, t));
    }
    function Ie(e, t, r) {
      if (e.tag === 3) xf(e, e, r);
      else for (; t !== null; ) {
        if (t.tag === 3) {
          xf(t, e, r);
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (Wn === null || !Wn.has(i))) {
            e = Ir(r, e), e = zd(t, e, 1), t = Fn(t, e, 1), e = ft(), t !== null && (yo(t, 1, e), wt(t, e));
            break;
          }
        }
        t = t.return;
      }
    }
    function Tv(e, t, r) {
      var i = e.pingCache;
      i !== null && i.delete(t), t = ft(), e.pingedLanes |= e.suspendedLanes & r, et === e && (it & r) === r && (Qe === 4 || Qe === 3 && (it & 130023424) === it && 500 > He() - Rs ? gr(e, 0) : Ps |= r), wt(e, t);
    }
    function Sf(e, t) {
      t === 0 && (e.mode & 1 ? (t = Ci, Ci <<= 1, !(Ci & 130023424) && (Ci = 4194304)) : t = 1);
      var r = ft();
      e = vn(e, t), e !== null && (yo(e, t, r), wt(e, r));
    }
    function Nv(e) {
      var t = e.memoizedState, r = 0;
      t !== null && (r = t.retryLane), Sf(e, r);
    }
    function Mv(e, t) {
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
      i !== null && i.delete(t), Sf(e, r);
    }
    var Cf;
    Cf = function(e, t, r) {
      if (e !== null) if (e.memoizedProps !== t.pendingProps || ht.current) vt = true;
      else {
        if (!(e.lanes & r) && !(t.flags & 128)) return vt = false, vv(e, t, r);
        vt = !!(e.flags & 131072);
      }
      else vt = false, _e && t.flags & 1048576 && ed(t, Ui, t.index);
      switch (t.lanes = 0, t.tag) {
        case 2:
          var i = t.type;
          il(e, t), e = t.pendingProps;
          var s = Dr(t, at.current);
          zr(t, r), s = os(null, t, i, e, s, r);
          var c = is();
          return t.flags |= 1, typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, gt(i) ? (c = true, Wi(t)) : c = false, t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, qa(t), s.updater = rl, t.stateNode = s, s._reactInternals = t, ds(t, i, e, r), t = hs(null, t, i, true, c, r)) : (t.tag = 0, _e && c && Wa(t), dt(null, t, s, r), t = t.child), t;
        case 16:
          i = t.elementType;
          e: {
            switch (il(e, t), e = t.pendingProps, s = i._init, i = s(i._payload), t.type = i, s = t.tag = Dv(i), e = Ut(i, e), s) {
              case 0:
                t = ms(null, t, i, e, r);
                break e;
              case 1:
                t = Kd(null, t, i, e, r);
                break e;
              case 11:
                t = Hd(null, t, i, e, r);
                break e;
              case 14:
                t = $d(null, t, i, Ut(i.type, e), r);
                break e;
            }
            throw Error(l(306, i, ""));
          }
          return t;
        case 0:
          return i = t.type, s = t.pendingProps, s = t.elementType === i ? s : Ut(i, s), ms(e, t, i, s, r);
        case 1:
          return i = t.type, s = t.pendingProps, s = t.elementType === i ? s : Ut(i, s), Kd(e, t, i, s, r);
        case 3:
          e: {
            if (Yd(t), e === null) throw Error(l(387));
            i = t.pendingProps, c = t.memoizedState, s = c.element, ud(e, t), Xi(t, i, null, r);
            var m = t.memoizedState;
            if (i = m.element, c.isDehydrated) if (c = {
              element: i,
              isDehydrated: false,
              cache: m.cache,
              pendingSuspenseBoundaries: m.pendingSuspenseBoundaries,
              transitions: m.transitions
            }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
              s = Ir(Error(l(423)), t), t = Qd(e, t, i, r, s);
              break e;
            } else if (i !== s) {
              s = Ir(Error(l(424)), t), t = Qd(e, t, i, r, s);
              break e;
            } else for (Et = jn(t.stateNode.containerInfo.firstChild), bt = t, _e = true, $t = null, r = ad(t, null, i, r), t.child = r; r; ) r.flags = r.flags & -3 | 4096, r = r.sibling;
            else {
              if (_r(), i === s) {
                t = wn(e, t, r);
                break e;
              }
              dt(e, t, i, r);
            }
            t = t.child;
          }
          return t;
        case 5:
          return fd(t), e === null && Ua(t), i = t.type, s = t.pendingProps, c = e !== null ? e.memoizedProps : null, m = s.children, _a(i, s) ? m = null : c !== null && _a(i, c) && (t.flags |= 32), Gd(e, t), dt(e, t, m, r), t.child;
        case 6:
          return e === null && Ua(t), null;
        case 13:
          return Xd(e, t, r);
        case 4:
          return Ja(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = Lr(t, null, i, r) : dt(e, t, i, r), t.child;
        case 11:
          return i = t.type, s = t.pendingProps, s = t.elementType === i ? s : Ut(i, s), Hd(e, t, i, s, r);
        case 7:
          return dt(e, t, t.pendingProps, r), t.child;
        case 8:
          return dt(e, t, t.pendingProps.children, r), t.child;
        case 12:
          return dt(e, t, t.pendingProps.children, r), t.child;
        case 10:
          e: {
            if (i = t.type._context, s = t.pendingProps, c = t.memoizedProps, m = s.value, Me(Ki, i._currentValue), i._currentValue = m, c !== null) if (Ht(c.value, m)) {
              if (c.children === s.children && !ht.current) {
                t = wn(e, t, r);
                break e;
              }
            } else for (c = t.child, c !== null && (c.return = t); c !== null; ) {
              var C = c.dependencies;
              if (C !== null) {
                m = c.child;
                for (var E = C.firstContext; E !== null; ) {
                  if (E.context === i) {
                    if (c.tag === 1) {
                      E = yn(-1, r & -r), E.tag = 2;
                      var j = c.updateQueue;
                      if (j !== null) {
                        j = j.shared;
                        var H = j.pending;
                        H === null ? E.next = E : (E.next = H.next, H.next = E), j.pending = E;
                      }
                    }
                    c.lanes |= r, E = c.alternate, E !== null && (E.lanes |= r), Qa(c.return, r, t), C.lanes |= r;
                    break;
                  }
                  E = E.next;
                }
              } else if (c.tag === 10) m = c.type === t.type ? null : c.child;
              else if (c.tag === 18) {
                if (m = c.return, m === null) throw Error(l(341));
                m.lanes |= r, C = m.alternate, C !== null && (C.lanes |= r), Qa(m, r, t), m = c.sibling;
              } else m = c.child;
              if (m !== null) m.return = c;
              else for (m = c; m !== null; ) {
                if (m === t) {
                  m = null;
                  break;
                }
                if (c = m.sibling, c !== null) {
                  c.return = m.return, m = c;
                  break;
                }
                m = m.return;
              }
              c = m;
            }
            dt(e, t, s.children, r), t = t.child;
          }
          return t;
        case 9:
          return s = t.type, i = t.pendingProps.children, zr(t, r), s = Ot(s), i = i(s), t.flags |= 1, dt(e, t, i, r), t.child;
        case 14:
          return i = t.type, s = Ut(i, t.pendingProps), s = Ut(i.type, s), $d(e, t, i, s, r);
        case 15:
          return Ud(e, t, t.type, t.pendingProps, r);
        case 17:
          return i = t.type, s = t.pendingProps, s = t.elementType === i ? s : Ut(i, s), il(e, t), t.tag = 1, gt(i) ? (e = true, Wi(t)) : e = false, zr(t, r), _d(t, i, s), ds(t, i, s, r), hs(null, t, i, true, e, r);
        case 19:
          return Jd(e, t, r);
        case 22:
          return Vd(e, t, r);
      }
      throw Error(l(156, t.tag));
    };
    function kf(e, t) {
      return tc(e, t);
    }
    function Av(e, t, r, i) {
      this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function Lt(e, t, r, i) {
      return new Av(e, t, r, i);
    }
    function _s(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function Dv(e) {
      if (typeof e == "function") return _s(e) ? 1 : 0;
      if (e != null) {
        if (e = e.$$typeof, e === Z) return 11;
        if (e === ge) return 14;
      }
      return 2;
    }
    function Vn(e, t) {
      var r = e.alternate;
      return r === null ? (r = Lt(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 14680064, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r;
    }
    function gl(e, t, r, i, s, c) {
      var m = 2;
      if (i = e, typeof e == "function") _s(e) && (m = 1);
      else if (typeof e == "string") m = 5;
      else e: switch (e) {
        case _:
          return yr(r.children, s, c, t);
        case Y:
          m = 8, s |= 8;
          break;
        case U:
          return e = Lt(12, r, t, s | 2), e.elementType = U, e.lanes = c, e;
        case Q:
          return e = Lt(13, r, t, s), e.elementType = Q, e.lanes = c, e;
        case ae:
          return e = Lt(19, r, t, s), e.elementType = ae, e.lanes = c, e;
        case oe:
          return vl(r, s, c, t);
        default:
          if (typeof e == "object" && e !== null) switch (e.$$typeof) {
            case ee:
              m = 10;
              break e;
            case le:
              m = 9;
              break e;
            case Z:
              m = 11;
              break e;
            case ge:
              m = 14;
              break e;
            case se:
              m = 16, i = null;
              break e;
          }
          throw Error(l(130, e == null ? e : typeof e, ""));
      }
      return t = Lt(m, r, t, s), t.elementType = e, t.type = i, t.lanes = c, t;
    }
    function yr(e, t, r, i) {
      return e = Lt(7, e, i, t), e.lanes = r, e;
    }
    function vl(e, t, r, i) {
      return e = Lt(22, e, i, t), e.elementType = oe, e.lanes = r, e.stateNode = {
        isHidden: false
      }, e;
    }
    function Ls(e, t, r) {
      return e = Lt(6, e, null, t), e.lanes = r, e;
    }
    function Bs(e, t, r) {
      return t = Lt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = r, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    function Ov(e, t, r, i, s) {
      this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ca(0), this.expirationTimes = ca(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ca(0), this.identifierPrefix = i, this.onRecoverableError = s, this.mutableSourceEagerHydrationData = null;
    }
    function zs(e, t, r, i, s, c, m, C, E) {
      return e = new Ov(e, t, r, C, E), t === 1 ? (t = 1, c === true && (t |= 8)) : t = 0, c = Lt(3, null, null, t), e.current = c, c.stateNode = e, c.memoizedState = {
        element: i,
        isDehydrated: r,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
      }, qa(c), e;
    }
    function jv(e, t, r) {
      var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: G,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: r
      };
    }
    function bf(e) {
      if (!e) return Ln;
      e = e._reactInternals;
      e: {
        if (lr(e) !== e || e.tag !== 1) throw Error(l(170));
        var t = e;
        do {
          switch (t.tag) {
            case 3:
              t = t.stateNode.context;
              break e;
            case 1:
              if (gt(t.type)) {
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
        if (gt(r)) return qc(e, r, t);
      }
      return t;
    }
    function Ef(e, t, r, i, s, c, m, C, E) {
      return e = zs(r, i, true, e, s, c, m, C, E), e.context = bf(null), r = e.current, i = ft(), s = $n(r), c = yn(i, s), c.callback = t ?? null, Fn(r, c, s), e.current.lanes = s, yo(e, s, i), wt(e, i), e;
    }
    function yl(e, t, r, i) {
      var s = t.current, c = ft(), m = $n(s);
      return r = bf(r), t.context === null ? t.context = r : t.pendingContext = r, t = yn(c, m), t.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (t.callback = i), e = Fn(s, t, m), e !== null && (Kt(e, s, m, c), Qi(e, s, m)), m;
    }
    function wl(e) {
      if (e = e.current, !e.child) return null;
      switch (e.child.tag) {
        case 5:
          return e.child.stateNode;
        default:
          return e.child.stateNode;
      }
    }
    function Pf(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var r = e.retryLane;
        e.retryLane = r !== 0 && r < t ? r : t;
      }
    }
    function Fs(e, t) {
      Pf(e, t), (e = e.alternate) && Pf(e, t);
    }
    function _v() {
      return null;
    }
    var Rf = typeof reportError == "function" ? reportError : function(e) {
      console.error(e);
    };
    function Is(e) {
      this._internalRoot = e;
    }
    xl.prototype.render = Is.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error(l(409));
      yl(e, t, null, null);
    }, xl.prototype.unmount = Is.prototype.unmount = function() {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        hr(function() {
          yl(null, e, null, null);
        }), t[pn] = null;
      }
    };
    function xl(e) {
      this._internalRoot = e;
    }
    xl.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = uc();
        e = {
          blockedOn: null,
          target: e,
          priority: t
        };
        for (var r = 0; r < An.length && t !== 0 && t < An[r].priority; r++) ;
        An.splice(r, 0, e), r === 0 && fc(e);
      }
    };
    function Ws(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
    }
    function Sl(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
    }
    function Tf() {
    }
    function Lv(e, t, r, i, s) {
      if (s) {
        if (typeof i == "function") {
          var c = i;
          i = function() {
            var j = wl(m);
            c.call(j);
          };
        }
        var m = Ef(t, i, e, 0, null, false, false, "", Tf);
        return e._reactRootContainer = m, e[pn] = m.current, Do(e.nodeType === 8 ? e.parentNode : e), hr(), m;
      }
      for (; s = e.lastChild; ) e.removeChild(s);
      if (typeof i == "function") {
        var C = i;
        i = function() {
          var j = wl(E);
          C.call(j);
        };
      }
      var E = zs(e, 0, false, null, null, false, false, "", Tf);
      return e._reactRootContainer = E, e[pn] = E.current, Do(e.nodeType === 8 ? e.parentNode : e), hr(function() {
        yl(t, E, r, i);
      }), E;
    }
    function Cl(e, t, r, i, s) {
      var c = r._reactRootContainer;
      if (c) {
        var m = c;
        if (typeof s == "function") {
          var C = s;
          s = function() {
            var E = wl(m);
            C.call(E);
          };
        }
        yl(t, m, e, s);
      } else m = Lv(r, t, e, s, i);
      return wl(m);
    }
    ac = function(e) {
      switch (e.tag) {
        case 3:
          var t = e.stateNode;
          if (t.current.memoizedState.isDehydrated) {
            var r = vo(t.pendingLanes);
            r !== 0 && (da(t, r | 1), wt(t, He()), !(Pe & 6) && ($r = He() + 500, Bn()));
          }
          break;
        case 13:
          hr(function() {
            var i = vn(e, 1);
            if (i !== null) {
              var s = ft();
              Kt(i, e, 1, s);
            }
          }), Fs(e, 1);
      }
    }, fa = function(e) {
      if (e.tag === 13) {
        var t = vn(e, 134217728);
        if (t !== null) {
          var r = ft();
          Kt(t, e, 134217728, r);
        }
        Fs(e, 134217728);
      }
    }, sc = function(e) {
      if (e.tag === 13) {
        var t = $n(e), r = vn(e, t);
        if (r !== null) {
          var i = ft();
          Kt(r, e, t, i);
        }
        Fs(e, t);
      }
    }, uc = function() {
      return Ne;
    }, cc = function(e, t) {
      var r = Ne;
      try {
        return Ne = e, t();
      } finally {
        Ne = r;
      }
    }, be = function(e, t, r) {
      switch (t) {
        case "input":
          if (rr(e, r), t = r.name, r.type === "radio" && t != null) {
            for (r = e; r.parentNode; ) r = r.parentNode;
            for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < r.length; t++) {
              var i = r[t];
              if (i !== e && i.form === e.form) {
                var s = Fi(i);
                if (!s) throw Error(l(90));
                nr(i), rr(i, s);
              }
            }
          }
          break;
        case "textarea":
          pi(e, r);
          break;
        case "select":
          t = r.value, t != null && dn(e, !!r.multiple, t, false);
      }
    }, zt = Ds, mt = hr;
    var Bv = {
      usingClientEntryPoint: false,
      Events: [
        _o,
        Mr,
        Fi,
        rt,
        Je,
        Ds
      ]
    }, Qo = {
      findFiberByHostInstance: ar,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom"
    }, zv = {
      bundleType: Qo.bundleType,
      version: Qo.version,
      rendererPackageName: Qo.rendererPackageName,
      rendererConfig: Qo.rendererConfig,
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
        return e = Zu(e), e === null ? null : e.stateNode;
      },
      findFiberByHostInstance: Qo.findFiberByHostInstance || _v,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var kl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!kl.isDisabled && kl.supportsFiber) try {
        xi = kl.inject(zv), Zt = kl;
      } catch {
      }
    }
    return xt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bv, xt.createPortal = function(e, t) {
      var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Ws(t)) throw Error(l(200));
      return jv(e, t, null, r);
    }, xt.createRoot = function(e, t) {
      if (!Ws(e)) throw Error(l(299));
      var r = false, i = "", s = Rf;
      return t != null && (t.unstable_strictMode === true && (r = true), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError)), t = zs(e, 1, false, null, null, r, false, i, s), e[pn] = t.current, Do(e.nodeType === 8 ? e.parentNode : e), new Is(t);
    }, xt.findDOMNode = function(e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0) throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
      return e = Zu(t), e = e === null ? null : e.stateNode, e;
    }, xt.flushSync = function(e) {
      return hr(e);
    }, xt.hydrate = function(e, t, r) {
      if (!Sl(t)) throw Error(l(200));
      return Cl(null, e, t, true, r);
    }, xt.hydrateRoot = function(e, t, r) {
      if (!Ws(e)) throw Error(l(405));
      var i = r != null && r.hydratedSources || null, s = false, c = "", m = Rf;
      if (r != null && (r.unstable_strictMode === true && (s = true), r.identifierPrefix !== void 0 && (c = r.identifierPrefix), r.onRecoverableError !== void 0 && (m = r.onRecoverableError)), t = Ef(t, null, e, 1, r ?? null, s, false, c, m), e[pn] = t.current, Do(e), i) for (e = 0; e < i.length; e++) r = i[e], s = r._getVersion, s = s(r._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [
        r,
        s
      ] : t.mutableSourceEagerHydrationData.push(r, s);
      return new xl(t);
    }, xt.render = function(e, t, r) {
      if (!Sl(t)) throw Error(l(200));
      return Cl(null, e, t, false, r);
    }, xt.unmountComponentAtNode = function(e) {
      if (!Sl(e)) throw Error(l(40));
      return e._reactRootContainer ? (hr(function() {
        Cl(null, null, e, false, function() {
          e._reactRootContainer = null, e[pn] = null;
        });
      }), true) : false;
    }, xt.unstable_batchedUpdates = Ds, xt.unstable_renderSubtreeIntoContainer = function(e, t, r, i) {
      if (!Sl(r)) throw Error(l(200));
      if (e == null || e._reactInternals === void 0) throw Error(l(38));
      return Cl(e, t, r, false, i);
    }, xt.version = "18.3.1-next-f1338f8080-20240426", xt;
  }
  var Lf;
  function Pp() {
    if (Lf) return Us.exports;
    Lf = 1;
    function n() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
    }
    return n(), Us.exports = Kv(), Us.exports;
  }
  var Bf;
  function Yv() {
    if (Bf) return bl;
    Bf = 1;
    var n = Pp();
    return bl.createRoot = n.createRoot, bl.hydrateRoot = n.hydrateRoot, bl;
  }
  var Qv = Yv();
  function zf(n, o) {
    if (typeof n == "function") return n(o);
    n != null && (n.current = o);
  }
  function Rp(...n) {
    return (o) => {
      let l = false;
      const a = n.map((u) => {
        const d = zf(u, o);
        return !l && typeof d == "function" && (l = true), d;
      });
      if (l) return () => {
        for (let u = 0; u < a.length; u++) {
          const d = a[u];
          typeof d == "function" ? d() : zf(n[u], null);
        }
      };
    };
  }
  function nt(...n) {
    return g.useCallback(Rp(...n), n);
  }
  var ii = g.forwardRef((n, o) => {
    const { children: l, ...a } = n, u = g.Children.toArray(l), d = u.find(qv);
    if (d) {
      const f = d.props.children, p = u.map((v) => v === d ? g.Children.count(f) > 1 ? g.Children.only(null) : g.isValidElement(f) ? f.props.children : null : v);
      return h.jsx(su, {
        ...a,
        ref: o,
        children: g.isValidElement(f) ? g.cloneElement(f, void 0, p) : null
      });
    }
    return h.jsx(su, {
      ...a,
      ref: o,
      children: l
    });
  });
  ii.displayName = "Slot";
  var su = g.forwardRef((n, o) => {
    const { children: l, ...a } = n;
    if (g.isValidElement(l)) {
      const u = Zv(l), d = Jv(a, l.props);
      return l.type !== g.Fragment && (d.ref = o ? Rp(o, u) : u), g.cloneElement(l, d);
    }
    return g.Children.count(l) > 1 ? g.Children.only(null) : null;
  });
  su.displayName = "SlotClone";
  var Xv = ({ children: n }) => h.jsx(h.Fragment, {
    children: n
  });
  function qv(n) {
    return g.isValidElement(n) && n.type === Xv;
  }
  function Jv(n, o) {
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
  function Zv(n) {
    var _a, _b;
    let o = (_a = Object.getOwnPropertyDescriptor(n.props, "ref")) == null ? void 0 : _a.get, l = o && "isReactWarning" in o && o.isReactWarning;
    return l ? n.ref : (o = (_b = Object.getOwnPropertyDescriptor(n, "ref")) == null ? void 0 : _b.get, l = o && "isReactWarning" in o && o.isReactWarning, l ? n.props.ref : n.props.ref || n.ref);
  }
  function Tp(n) {
    var o, l, a = "";
    if (typeof n == "string" || typeof n == "number") a += n;
    else if (typeof n == "object") if (Array.isArray(n)) {
      var u = n.length;
      for (o = 0; o < u; o++) n[o] && (l = Tp(n[o])) && (a && (a += " "), a += l);
    } else for (l in n) n[l] && (a && (a += " "), a += l);
    return a;
  }
  function Cr() {
    for (var n, o, l = 0, a = "", u = arguments.length; l < u; l++) (n = arguments[l]) && (o = Tp(n)) && (a && (a += " "), a += o);
    return a;
  }
  const Ff = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n, If = Cr, Np = (n, o) => (l) => {
    var a;
    if ((o == null ? void 0 : o.variants) == null) return If(n, l == null ? void 0 : l.class, l == null ? void 0 : l.className);
    const { variants: u, defaultVariants: d } = o, f = Object.keys(u).map((y) => {
      const w = l == null ? void 0 : l[y], S = d == null ? void 0 : d[y];
      if (w === null) return null;
      const x = Ff(w) || Ff(S);
      return u[y][x];
    }), p = l && Object.entries(l).reduce((y, w) => {
      let [S, x] = w;
      return x === void 0 || (y[S] = x), y;
    }, {}), v = o == null || (a = o.compoundVariants) === null || a === void 0 ? void 0 : a.reduce((y, w) => {
      let { class: S, className: x, ...b } = w;
      return Object.entries(b).every((A) => {
        let [k, P] = A;
        return Array.isArray(P) ? P.includes({
          ...d,
          ...p
        }[k]) : {
          ...d,
          ...p
        }[k] === P;
      }) ? [
        ...y,
        S,
        x
      ] : y;
    }, []);
    return If(n, f, v, l == null ? void 0 : l.class, l == null ? void 0 : l.className);
  }, wu = "-", ey = (n) => {
    const o = ny(n), { conflictingClassGroups: l, conflictingClassGroupModifiers: a } = n;
    return {
      getClassGroupId: (f) => {
        const p = f.split(wu);
        return p[0] === "" && p.length !== 1 && p.shift(), Mp(p, o) || ty(f);
      },
      getConflictingClassGroupIds: (f, p) => {
        const v = l[f] || [];
        return p && a[f] ? [
          ...v,
          ...a[f]
        ] : v;
      }
    };
  }, Mp = (n, o) => {
    var _a;
    if (n.length === 0) return o.classGroupId;
    const l = n[0], a = o.nextPart.get(l), u = a ? Mp(n.slice(1), a) : void 0;
    if (u) return u;
    if (o.validators.length === 0) return;
    const d = n.join(wu);
    return (_a = o.validators.find(({ validator: f }) => f(d))) == null ? void 0 : _a.classGroupId;
  }, Wf = /^\[(.+)\]$/, ty = (n) => {
    if (Wf.test(n)) {
      const o = Wf.exec(n)[1], l = o == null ? void 0 : o.substring(0, o.indexOf(":"));
      if (l) return "arbitrary.." + l;
    }
  }, ny = (n) => {
    const { theme: o, prefix: l } = n, a = {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    };
    return oy(Object.entries(n.classGroups), l).forEach(([d, f]) => {
      uu(f, a, d, o);
    }), a;
  }, uu = (n, o, l, a) => {
    n.forEach((u) => {
      if (typeof u == "string") {
        const d = u === "" ? o : Hf(o, u);
        d.classGroupId = l;
        return;
      }
      if (typeof u == "function") {
        if (ry(u)) {
          uu(u(a), o, l, a);
          return;
        }
        o.validators.push({
          validator: u,
          classGroupId: l
        });
        return;
      }
      Object.entries(u).forEach(([d, f]) => {
        uu(f, Hf(o, d), l, a);
      });
    });
  }, Hf = (n, o) => {
    let l = n;
    return o.split(wu).forEach((a) => {
      l.nextPart.has(a) || l.nextPart.set(a, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      }), l = l.nextPart.get(a);
    }), l;
  }, ry = (n) => n.isThemeGetter, oy = (n, o) => o ? n.map(([l, a]) => {
    const u = a.map((d) => typeof d == "string" ? o + d : typeof d == "object" ? Object.fromEntries(Object.entries(d).map(([f, p]) => [
      o + f,
      p
    ])) : d);
    return [
      l,
      u
    ];
  }) : n, iy = (n) => {
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
  }, Ap = "!", ly = (n) => {
    const { separator: o, experimentalParseClassName: l } = n, a = o.length === 1, u = o[0], d = o.length, f = (p) => {
      const v = [];
      let y = 0, w = 0, S;
      for (let P = 0; P < p.length; P++) {
        let N = p[P];
        if (y === 0) {
          if (N === u && (a || p.slice(P, P + d) === o)) {
            v.push(p.slice(w, P)), w = P + d;
            continue;
          }
          if (N === "/") {
            S = P;
            continue;
          }
        }
        N === "[" ? y++ : N === "]" && y--;
      }
      const x = v.length === 0 ? p : p.substring(w), b = x.startsWith(Ap), A = b ? x.substring(1) : x, k = S && S > w ? S - w : void 0;
      return {
        modifiers: v,
        hasImportantModifier: b,
        baseClassName: A,
        maybePostfixModifierPosition: k
      };
    };
    return l ? (p) => l({
      className: p,
      parseClassName: f
    }) : f;
  }, ay = (n) => {
    if (n.length <= 1) return n;
    const o = [];
    let l = [];
    return n.forEach((a) => {
      a[0] === "[" ? (o.push(...l.sort(), a), l = []) : l.push(a);
    }), o.push(...l.sort()), o;
  }, sy = (n) => ({
    cache: iy(n.cacheSize),
    parseClassName: ly(n),
    ...ey(n)
  }), uy = /\s+/, cy = (n, o) => {
    const { parseClassName: l, getClassGroupId: a, getConflictingClassGroupIds: u } = o, d = [], f = n.trim().split(uy);
    let p = "";
    for (let v = f.length - 1; v >= 0; v -= 1) {
      const y = f[v], { modifiers: w, hasImportantModifier: S, baseClassName: x, maybePostfixModifierPosition: b } = l(y);
      let A = !!b, k = a(A ? x.substring(0, b) : x);
      if (!k) {
        if (!A) {
          p = y + (p.length > 0 ? " " + p : p);
          continue;
        }
        if (k = a(x), !k) {
          p = y + (p.length > 0 ? " " + p : p);
          continue;
        }
        A = false;
      }
      const P = ay(w).join(":"), N = S ? P + Ap : P, L = N + k;
      if (d.includes(L)) continue;
      d.push(L);
      const z = u(k, A);
      for (let O = 0; O < z.length; ++O) {
        const F = z[O];
        d.push(N + F);
      }
      p = y + (p.length > 0 ? " " + p : p);
    }
    return p;
  };
  function dy() {
    let n = 0, o, l, a = "";
    for (; n < arguments.length; ) (o = arguments[n++]) && (l = Dp(o)) && (a && (a += " "), a += l);
    return a;
  }
  const Dp = (n) => {
    if (typeof n == "string") return n;
    let o, l = "";
    for (let a = 0; a < n.length; a++) n[a] && (o = Dp(n[a])) && (l && (l += " "), l += o);
    return l;
  };
  function fy(n, ...o) {
    let l, a, u, d = f;
    function f(v) {
      const y = o.reduce((w, S) => S(w), n());
      return l = sy(y), a = l.cache.get, u = l.cache.set, d = p, p(v);
    }
    function p(v) {
      const y = a(v);
      if (y) return y;
      const w = cy(v, l);
      return u(v, w), w;
    }
    return function() {
      return d(dy.apply(null, arguments));
    };
  }
  const Oe = (n) => {
    const o = (l) => l[n] || [];
    return o.isThemeGetter = true, o;
  }, Op = /^\[(?:([a-z-]+):)?(.+)\]$/i, py = /^\d+\/\d+$/, my = /* @__PURE__ */ new Set([
    "px",
    "full",
    "screen"
  ]), hy = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, gy = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, vy = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, yy = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, wy = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Sn = (n) => Yr(n) || my.has(n) || py.test(n), Kn = (n) => no(n, "length", Ry), Yr = (n) => !!n && !Number.isNaN(Number(n)), Ks = (n) => no(n, "number", Yr), qo = (n) => !!n && Number.isInteger(Number(n)), xy = (n) => n.endsWith("%") && Yr(n.slice(0, -1)), ve = (n) => Op.test(n), Yn = (n) => hy.test(n), Sy = /* @__PURE__ */ new Set([
    "length",
    "size",
    "percentage"
  ]), Cy = (n) => no(n, Sy, jp), ky = (n) => no(n, "position", jp), by = /* @__PURE__ */ new Set([
    "image",
    "url"
  ]), Ey = (n) => no(n, by, Ny), Py = (n) => no(n, "", Ty), Jo = () => true, no = (n, o, l) => {
    const a = Op.exec(n);
    return a ? a[1] ? typeof o == "string" ? a[1] === o : o.has(a[1]) : l(a[2]) : false;
  }, Ry = (n) => gy.test(n) && !vy.test(n), jp = () => false, Ty = (n) => yy.test(n), Ny = (n) => wy.test(n), My = () => {
    const n = Oe("colors"), o = Oe("spacing"), l = Oe("blur"), a = Oe("brightness"), u = Oe("borderColor"), d = Oe("borderRadius"), f = Oe("borderSpacing"), p = Oe("borderWidth"), v = Oe("contrast"), y = Oe("grayscale"), w = Oe("hueRotate"), S = Oe("invert"), x = Oe("gap"), b = Oe("gradientColorStops"), A = Oe("gradientColorStopPositions"), k = Oe("inset"), P = Oe("margin"), N = Oe("opacity"), L = Oe("padding"), z = Oe("saturate"), O = Oe("scale"), F = Oe("sepia"), G = Oe("skew"), _ = Oe("space"), Y = Oe("translate"), U = () => [
      "auto",
      "contain",
      "none"
    ], ee = () => [
      "auto",
      "hidden",
      "clip",
      "visible",
      "scroll"
    ], le = () => [
      "auto",
      ve,
      o
    ], Z = () => [
      ve,
      o
    ], Q = () => [
      "",
      Sn,
      Kn
    ], ae = () => [
      "auto",
      Yr,
      ve
    ], ge = () => [
      "bottom",
      "center",
      "left",
      "left-bottom",
      "left-top",
      "right",
      "right-bottom",
      "right-top",
      "top"
    ], se = () => [
      "solid",
      "dashed",
      "dotted",
      "double",
      "none"
    ], oe = () => [
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
    ], X = () => [
      "",
      "0",
      ve
    ], K = () => [
      "auto",
      "avoid",
      "all",
      "avoid-page",
      "page",
      "left",
      "right",
      "column"
    ], T = () => [
      Yr,
      ve
    ];
    return {
      cacheSize: 500,
      separator: ":",
      theme: {
        colors: [
          Jo
        ],
        spacing: [
          Sn,
          Kn
        ],
        blur: [
          "none",
          "",
          Yn,
          ve
        ],
        brightness: T(),
        borderColor: [
          n
        ],
        borderRadius: [
          "none",
          "",
          "full",
          Yn,
          ve
        ],
        borderSpacing: Z(),
        borderWidth: Q(),
        contrast: T(),
        grayscale: X(),
        hueRotate: T(),
        invert: X(),
        gap: Z(),
        gradientColorStops: [
          n
        ],
        gradientColorStopPositions: [
          xy,
          Kn
        ],
        inset: le(),
        margin: le(),
        opacity: T(),
        padding: Z(),
        saturate: T(),
        scale: T(),
        sepia: X(),
        skew: T(),
        space: Z(),
        translate: Z()
      },
      classGroups: {
        aspect: [
          {
            aspect: [
              "auto",
              "square",
              "video",
              ve
            ]
          }
        ],
        container: [
          "container"
        ],
        columns: [
          {
            columns: [
              Yn
            ]
          }
        ],
        "break-after": [
          {
            "break-after": K()
          }
        ],
        "break-before": [
          {
            "break-before": K()
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
              ...ge(),
              ve
            ]
          }
        ],
        overflow: [
          {
            overflow: ee()
          }
        ],
        "overflow-x": [
          {
            "overflow-x": ee()
          }
        ],
        "overflow-y": [
          {
            "overflow-y": ee()
          }
        ],
        overscroll: [
          {
            overscroll: U()
          }
        ],
        "overscroll-x": [
          {
            "overscroll-x": U()
          }
        ],
        "overscroll-y": [
          {
            "overscroll-y": U()
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
              qo,
              ve
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
              ve
            ]
          }
        ],
        grow: [
          {
            grow: X()
          }
        ],
        shrink: [
          {
            shrink: X()
          }
        ],
        order: [
          {
            order: [
              "first",
              "last",
              "none",
              qo,
              ve
            ]
          }
        ],
        "grid-cols": [
          {
            "grid-cols": [
              Jo
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
                  qo,
                  ve
                ]
              },
              ve
            ]
          }
        ],
        "col-start": [
          {
            "col-start": ae()
          }
        ],
        "col-end": [
          {
            "col-end": ae()
          }
        ],
        "grid-rows": [
          {
            "grid-rows": [
              Jo
            ]
          }
        ],
        "row-start-end": [
          {
            row: [
              "auto",
              {
                span: [
                  qo,
                  ve
                ]
              },
              ve
            ]
          }
        ],
        "row-start": [
          {
            "row-start": ae()
          }
        ],
        "row-end": [
          {
            "row-end": ae()
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
              ve
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
              ve
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
              L
            ]
          }
        ],
        px: [
          {
            px: [
              L
            ]
          }
        ],
        py: [
          {
            py: [
              L
            ]
          }
        ],
        ps: [
          {
            ps: [
              L
            ]
          }
        ],
        pe: [
          {
            pe: [
              L
            ]
          }
        ],
        pt: [
          {
            pt: [
              L
            ]
          }
        ],
        pr: [
          {
            pr: [
              L
            ]
          }
        ],
        pb: [
          {
            pb: [
              L
            ]
          }
        ],
        pl: [
          {
            pl: [
              L
            ]
          }
        ],
        m: [
          {
            m: [
              P
            ]
          }
        ],
        mx: [
          {
            mx: [
              P
            ]
          }
        ],
        my: [
          {
            my: [
              P
            ]
          }
        ],
        ms: [
          {
            ms: [
              P
            ]
          }
        ],
        me: [
          {
            me: [
              P
            ]
          }
        ],
        mt: [
          {
            mt: [
              P
            ]
          }
        ],
        mr: [
          {
            mr: [
              P
            ]
          }
        ],
        mb: [
          {
            mb: [
              P
            ]
          }
        ],
        ml: [
          {
            ml: [
              P
            ]
          }
        ],
        "space-x": [
          {
            "space-x": [
              _
            ]
          }
        ],
        "space-x-reverse": [
          "space-x-reverse"
        ],
        "space-y": [
          {
            "space-y": [
              _
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
              ve,
              o
            ]
          }
        ],
        "min-w": [
          {
            "min-w": [
              ve,
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
              ve,
              o,
              "none",
              "full",
              "min",
              "max",
              "fit",
              "prose",
              {
                screen: [
                  Yn
                ]
              },
              Yn
            ]
          }
        ],
        h: [
          {
            h: [
              ve,
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
              ve,
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
              ve,
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
              ve,
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
              Yn,
              Kn
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
              Ks
            ]
          }
        ],
        "font-family": [
          {
            font: [
              Jo
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
              ve
            ]
          }
        ],
        "line-clamp": [
          {
            "line-clamp": [
              "none",
              Yr,
              Ks
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
              Sn,
              ve
            ]
          }
        ],
        "list-image": [
          {
            "list-image": [
              "none",
              ve
            ]
          }
        ],
        "list-style-type": [
          {
            list: [
              "none",
              "disc",
              "decimal",
              ve
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
              N
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
              N
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
              ...se(),
              "wavy"
            ]
          }
        ],
        "text-decoration-thickness": [
          {
            decoration: [
              "auto",
              "from-font",
              Sn,
              Kn
            ]
          }
        ],
        "underline-offset": [
          {
            "underline-offset": [
              "auto",
              Sn,
              ve
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
            indent: Z()
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
              ve
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
              ve
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
              N
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
              ...ge(),
              ky
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
              Cy
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
              Ey
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
              b
            ]
          }
        ],
        "gradient-via": [
          {
            via: [
              b
            ]
          }
        ],
        "gradient-to": [
          {
            to: [
              b
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
              N
            ]
          }
        ],
        "border-style": [
          {
            border: [
              ...se(),
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
              N
            ]
          }
        ],
        "divide-style": [
          {
            divide: se()
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
              ...se()
            ]
          }
        ],
        "outline-offset": [
          {
            "outline-offset": [
              Sn,
              ve
            ]
          }
        ],
        "outline-w": [
          {
            outline: [
              Sn,
              Kn
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
            ring: Q()
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
              N
            ]
          }
        ],
        "ring-offset-w": [
          {
            "ring-offset": [
              Sn,
              Kn
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
              Yn,
              Py
            ]
          }
        ],
        "shadow-color": [
          {
            shadow: [
              Jo
            ]
          }
        ],
        opacity: [
          {
            opacity: [
              N
            ]
          }
        ],
        "mix-blend": [
          {
            "mix-blend": [
              ...oe(),
              "plus-lighter",
              "plus-darker"
            ]
          }
        ],
        "bg-blend": [
          {
            "bg-blend": oe()
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
              v
            ]
          }
        ],
        "drop-shadow": [
          {
            "drop-shadow": [
              "",
              "none",
              Yn,
              ve
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
              w
            ]
          }
        ],
        invert: [
          {
            invert: [
              S
            ]
          }
        ],
        saturate: [
          {
            saturate: [
              z
            ]
          }
        ],
        sepia: [
          {
            sepia: [
              F
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
              w
            ]
          }
        ],
        "backdrop-invert": [
          {
            "backdrop-invert": [
              S
            ]
          }
        ],
        "backdrop-opacity": [
          {
            "backdrop-opacity": [
              N
            ]
          }
        ],
        "backdrop-saturate": [
          {
            "backdrop-saturate": [
              z
            ]
          }
        ],
        "backdrop-sepia": [
          {
            "backdrop-sepia": [
              F
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
              ve
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
              ve
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
              ve
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
              qo,
              ve
            ]
          }
        ],
        "translate-x": [
          {
            "translate-x": [
              Y
            ]
          }
        ],
        "translate-y": [
          {
            "translate-y": [
              Y
            ]
          }
        ],
        "skew-x": [
          {
            "skew-x": [
              G
            ]
          }
        ],
        "skew-y": [
          {
            "skew-y": [
              G
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
              ve
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
              ve
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
            "scroll-m": Z()
          }
        ],
        "scroll-mx": [
          {
            "scroll-mx": Z()
          }
        ],
        "scroll-my": [
          {
            "scroll-my": Z()
          }
        ],
        "scroll-ms": [
          {
            "scroll-ms": Z()
          }
        ],
        "scroll-me": [
          {
            "scroll-me": Z()
          }
        ],
        "scroll-mt": [
          {
            "scroll-mt": Z()
          }
        ],
        "scroll-mr": [
          {
            "scroll-mr": Z()
          }
        ],
        "scroll-mb": [
          {
            "scroll-mb": Z()
          }
        ],
        "scroll-ml": [
          {
            "scroll-ml": Z()
          }
        ],
        "scroll-p": [
          {
            "scroll-p": Z()
          }
        ],
        "scroll-px": [
          {
            "scroll-px": Z()
          }
        ],
        "scroll-py": [
          {
            "scroll-py": Z()
          }
        ],
        "scroll-ps": [
          {
            "scroll-ps": Z()
          }
        ],
        "scroll-pe": [
          {
            "scroll-pe": Z()
          }
        ],
        "scroll-pt": [
          {
            "scroll-pt": Z()
          }
        ],
        "scroll-pr": [
          {
            "scroll-pr": Z()
          }
        ],
        "scroll-pb": [
          {
            "scroll-pb": Z()
          }
        ],
        "scroll-pl": [
          {
            "scroll-pl": Z()
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
              ve
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
              Sn,
              Kn,
              Ks
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
  }, Ay = fy(My);
  function qe(...n) {
    return Ay(Cr(n));
  }
  const Dy = Np("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
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
  }), Ge = g.forwardRef(({ className: n, variant: o, size: l, asChild: a = false, ...u }, d) => {
    const f = a ? ii : "button";
    return h.jsx(f, {
      className: qe(Dy({
        variant: o,
        size: l,
        className: n
      })),
      ref: d,
      ...u
    });
  });
  Ge.displayName = "Button";
  const Jr = g.forwardRef(({ className: n, type: o, ...l }, a) => h.jsx("input", {
    type: o,
    className: qe("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", n),
    ref: a,
    ...l
  }));
  Jr.displayName = "Input";
  const $f = [
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
  ], Oy = [
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
  ], jy = [
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
  ], Uf = (n) => Math.floor(Math.random() * n);
  function _y({ the: n = false, titleize: o = false, separator: l } = {}) {
    const a = n ? "the " : "", u = Oy.concat(jy);
    let d = `${$f[Uf($f.length)]} ${u[Uf(u.length)]}`.toLowerCase();
    return o && (d = d.replace(/(?:^|\s|-)\S/g, (f) => f.toUpperCase())), typeof l == "string" ? d = d.split(" ").join(l) : l || (d = d.split(" ").join("")), a + d;
  }
  function Ly({ onJoin: n, onCreate: o }) {
    const [l, a] = g.useState(() => {
      const y = new URL(document.location.toString()).searchParams.get("ticket");
      return (y == null ? void 0 : y.startsWith("chat")) ? y : "";
    }), [u, d] = g.useState(_y()), f = (v) => {
      v.preventDefault(), l.trim() && n(l.trim(), u);
    }, p = (v) => {
      v.preventDefault(), o(u);
    };
    return h.jsx("div", {
      className: "flex flex-col items-center justify-center flex-grow p-4",
      children: h.jsxs("div", {
        className: "w-full max-w-md space-y-4",
        children: [
          h.jsxs("div", {
            children: [
              h.jsx("h2", {
                className: "text-lg font-semibold mb-2",
                children: "Your name"
              }),
              h.jsx("div", {
                className: "flex space-x-2",
                children: h.jsx(Jr, {
                  value: u,
                  onChange: (v) => d(v.target.value),
                  placeholder: "Enter your name"
                })
              })
            ]
          }),
          h.jsxs("form", {
            onSubmit: f,
            children: [
              h.jsx("h2", {
                className: "text-lg font-semibold mb-2",
                children: "Join Channel"
              }),
              h.jsxs("div", {
                className: "flex space-x-2",
                children: [
                  h.jsx(Jr, {
                    value: l,
                    onChange: (v) => a(v.target.value),
                    placeholder: "Enter ticket"
                  }),
                  h.jsx(Ge, {
                    type: "submit",
                    disabled: !u.length || !l.length,
                    children: "Join"
                  })
                ]
              })
            ]
          }),
          h.jsxs("form", {
            onSubmit: p,
            children: [
              h.jsx("h2", {
                className: "text-lg font-semibold mb-2",
                children: "Create Channel"
              }),
              h.jsx("div", {
                className: "flex space-x-2",
                children: h.jsx(Ge, {
                  type: "submit",
                  disabled: !u.length,
                  children: "Create"
                })
              })
            ]
          })
        ]
      })
    });
  }
  function El(n) {
    const o = new Date(n);
    if (!Number.isNaN(o.valueOf())) return o;
    const l = String(n).match(/\d+/g);
    if (l == null || l.length <= 2) return o;
    {
      const [a, u, ...d] = l.map((v) => parseInt(v)), f = [
        a,
        u - 1,
        ...d
      ];
      return new Date(Date.UTC(...f));
    }
  }
  function Vf(n, o, l) {
    const a = n !== 1 ? o + "s" : o;
    return n + " " + a + " " + l;
  }
  function cu() {
    return cu = Object.assign ? Object.assign.bind() : function(n) {
      for (var o = 1; o < arguments.length; o++) {
        var l = arguments[o];
        for (var a in l) Object.prototype.hasOwnProperty.call(l, a) && (n[a] = l[a]);
      }
      return n;
    }, cu.apply(this, arguments);
  }
  const ti = 60, ni = ti * 60, Qr = ni * 24, Pl = Qr * 7, Gf = Qr * 30, Kf = Qr * 365, By = () => Date.now();
  function zy({ date: n, formatter: o = Vf, component: l = "time", live: a = true, minPeriod: u = 0, maxPeriod: d = Pl, title: f, now: p = By, ...v }) {
    const [y, w] = g.useState(p());
    g.useEffect(() => {
      if (!a) return;
      const F = (() => {
        const G = El(n).valueOf();
        if (!G) return console.warn("[react-timeago] Invalid Date provided"), 0;
        const _ = Math.round(Math.abs(y - G) / 1e3), Y = _ < ti ? 1e3 : _ < ni ? 1e3 * ti : _ < Qr ? 1e3 * ni : 1e3 * Pl, U = Math.min(Math.max(Y, u * 1e3), d * 1e3);
        return U ? setTimeout(() => {
          w(p());
        }, U) : 0;
      })();
      return () => {
        F && clearTimeout(F);
      };
    }, [
      n,
      a,
      d,
      u,
      p,
      y
    ]);
    const S = l, x = El(n).valueOf();
    if (!x) return null;
    const b = Math.round(Math.abs(y - x) / 1e3), A = x < y ? "ago" : "from now", [k, P] = b < ti ? [
      Math.round(b),
      "second"
    ] : b < ni ? [
      Math.round(b / ti),
      "minute"
    ] : b < Qr ? [
      Math.round(b / ni),
      "hour"
    ] : b < Pl ? [
      Math.round(b / Qr),
      "day"
    ] : b < Gf ? [
      Math.round(b / Pl),
      "week"
    ] : b < Kf ? [
      Math.round(b / Gf),
      "month"
    ] : [
      Math.round(b / Kf),
      "year"
    ], N = typeof f > "u" ? typeof n == "string" ? n : El(n).toISOString().substr(0, 16).replace("T", " ") : f, L = S === "time" ? {
      ...v,
      dateTime: El(n).toISOString()
    } : v, z = Vf.bind(null, k, P, A);
    return g.createElement(S, cu({}, L, {
      title: N
    }), o(k, P, A, x, z, p));
  }
  var xu = Pp();
  const Fy = Ep(xu);
  var Iy = [
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
  ], We = Iy.reduce((n, o) => {
    const l = g.forwardRef((a, u) => {
      const { asChild: d, ...f } = a, p = d ? ii : o;
      return typeof window < "u" && (window[Symbol.for("radix-ui")] = true), h.jsx(p, {
        ...f,
        ref: u
      });
    });
    return l.displayName = `Primitive.${o}`, {
      ...n,
      [o]: l
    };
  }, {});
  function Wy(n, o) {
    n && xu.flushSync(() => n.dispatchEvent(o));
  }
  var qn = (globalThis == null ? void 0 : globalThis.document) ? g.useLayoutEffect : () => {
  };
  function Hy(n, o) {
    return g.useReducer((l, a) => o[l][a] ?? l, n);
  }
  var Xt = (n) => {
    const { present: o, children: l } = n, a = $y(o), u = typeof l == "function" ? l({
      present: a.isPresent
    }) : g.Children.only(l), d = nt(a.ref, Uy(u));
    return typeof l == "function" || a.isPresent ? g.cloneElement(u, {
      ref: d
    }) : null;
  };
  Xt.displayName = "Presence";
  function $y(n) {
    const [o, l] = g.useState(), a = g.useRef({}), u = g.useRef(n), d = g.useRef("none"), f = n ? "mounted" : "unmounted", [p, v] = Hy(f, {
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
    return g.useEffect(() => {
      const y = Rl(a.current);
      d.current = p === "mounted" ? y : "none";
    }, [
      p
    ]), qn(() => {
      const y = a.current, w = u.current;
      if (w !== n) {
        const x = d.current, b = Rl(y);
        n ? v("MOUNT") : b === "none" || (y == null ? void 0 : y.display) === "none" ? v("UNMOUNT") : v(w && x !== b ? "ANIMATION_OUT" : "UNMOUNT"), u.current = n;
      }
    }, [
      n,
      v
    ]), qn(() => {
      if (o) {
        let y;
        const w = o.ownerDocument.defaultView ?? window, S = (b) => {
          const k = Rl(a.current).includes(b.animationName);
          if (b.target === o && k && (v("ANIMATION_END"), !u.current)) {
            const P = o.style.animationFillMode;
            o.style.animationFillMode = "forwards", y = w.setTimeout(() => {
              o.style.animationFillMode === "forwards" && (o.style.animationFillMode = P);
            });
          }
        }, x = (b) => {
          b.target === o && (d.current = Rl(a.current));
        };
        return o.addEventListener("animationstart", x), o.addEventListener("animationcancel", S), o.addEventListener("animationend", S), () => {
          w.clearTimeout(y), o.removeEventListener("animationstart", x), o.removeEventListener("animationcancel", S), o.removeEventListener("animationend", S);
        };
      } else v("ANIMATION_END");
    }, [
      o,
      v
    ]), {
      isPresent: [
        "mounted",
        "unmountSuspended"
      ].includes(p),
      ref: g.useCallback((y) => {
        y && (a.current = getComputedStyle(y)), l(y);
      }, [])
    };
  }
  function Rl(n) {
    return (n == null ? void 0 : n.animationName) || "none";
  }
  function Uy(n) {
    var _a, _b;
    let o = (_a = Object.getOwnPropertyDescriptor(n.props, "ref")) == null ? void 0 : _a.get, l = o && "isReactWarning" in o && o.isReactWarning;
    return l ? n.ref : (o = (_b = Object.getOwnPropertyDescriptor(n, "ref")) == null ? void 0 : _b.get, l = o && "isReactWarning" in o && o.isReactWarning, l ? n.props.ref : n.props.ref || n.ref);
  }
  function Vy(n, o) {
    const l = g.createContext(o), a = (d) => {
      const { children: f, ...p } = d, v = g.useMemo(() => p, Object.values(p));
      return h.jsx(l.Provider, {
        value: v,
        children: f
      });
    };
    a.displayName = n + "Provider";
    function u(d) {
      const f = g.useContext(l);
      if (f) return f;
      if (o !== void 0) return o;
      throw new Error(`\`${d}\` must be used within \`${n}\``);
    }
    return [
      a,
      u
    ];
  }
  function li(n, o = []) {
    let l = [];
    function a(d, f) {
      const p = g.createContext(f), v = l.length;
      l = [
        ...l,
        f
      ];
      const y = (S) => {
        var _a;
        const { scope: x, children: b, ...A } = S, k = ((_a = x == null ? void 0 : x[n]) == null ? void 0 : _a[v]) || p, P = g.useMemo(() => A, Object.values(A));
        return h.jsx(k.Provider, {
          value: P,
          children: b
        });
      };
      y.displayName = d + "Provider";
      function w(S, x) {
        var _a;
        const b = ((_a = x == null ? void 0 : x[n]) == null ? void 0 : _a[v]) || p, A = g.useContext(b);
        if (A) return A;
        if (f !== void 0) return f;
        throw new Error(`\`${S}\` must be used within \`${d}\``);
      }
      return [
        y,
        w
      ];
    }
    const u = () => {
      const d = l.map((f) => g.createContext(f));
      return function(p) {
        const v = (p == null ? void 0 : p[n]) || d;
        return g.useMemo(() => ({
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
    return u.scopeName = n, [
      a,
      Gy(u, ...o)
    ];
  }
  function Gy(...n) {
    const o = n[0];
    if (n.length === 1) return o;
    const l = () => {
      const a = n.map((u) => ({
        useScope: u(),
        scopeName: u.scopeName
      }));
      return function(d) {
        const f = a.reduce((p, { useScope: v, scopeName: y }) => {
          const S = v(d)[`__scope${y}`];
          return {
            ...p,
            ...S
          };
        }, {});
        return g.useMemo(() => ({
          [`__scope${o.scopeName}`]: f
        }), [
          f
        ]);
      };
    };
    return l.scopeName = o.scopeName, l;
  }
  function pt(n) {
    const o = g.useRef(n);
    return g.useEffect(() => {
      o.current = n;
    }), g.useMemo(() => (...l) => {
      var _a;
      return (_a = o.current) == null ? void 0 : _a.call(o, ...l);
    }, []);
  }
  var Ky = g.createContext(void 0);
  function Yy(n) {
    const o = g.useContext(Ky);
    return n || o || "ltr";
  }
  function Qy(n, [o, l]) {
    return Math.min(l, Math.max(o, n));
  }
  function Fe(n, o, { checkForDefaultPrevented: l = true } = {}) {
    return function(u) {
      if (n == null ? void 0 : n(u), l === false || !u.defaultPrevented) return o == null ? void 0 : o(u);
    };
  }
  function Xy(n, o) {
    return g.useReducer((l, a) => o[l][a] ?? l, n);
  }
  var Su = "ScrollArea", [_p, MC] = li(Su), [qy, Bt] = _p(Su), Lp = g.forwardRef((n, o) => {
    const { __scopeScrollArea: l, type: a = "hover", dir: u, scrollHideDelay: d = 600, ...f } = n, [p, v] = g.useState(null), [y, w] = g.useState(null), [S, x] = g.useState(null), [b, A] = g.useState(null), [k, P] = g.useState(null), [N, L] = g.useState(0), [z, O] = g.useState(0), [F, G] = g.useState(false), [_, Y] = g.useState(false), U = nt(o, (le) => v(le)), ee = Yy(u);
    return h.jsx(qy, {
      scope: l,
      type: a,
      dir: ee,
      scrollHideDelay: d,
      scrollArea: p,
      viewport: y,
      onViewportChange: w,
      content: S,
      onContentChange: x,
      scrollbarX: b,
      onScrollbarXChange: A,
      scrollbarXEnabled: F,
      onScrollbarXEnabledChange: G,
      scrollbarY: k,
      onScrollbarYChange: P,
      scrollbarYEnabled: _,
      onScrollbarYEnabledChange: Y,
      onCornerWidthChange: L,
      onCornerHeightChange: O,
      children: h.jsx(We.div, {
        dir: ee,
        ...f,
        ref: U,
        style: {
          position: "relative",
          "--radix-scroll-area-corner-width": N + "px",
          "--radix-scroll-area-corner-height": z + "px",
          ...n.style
        }
      })
    });
  });
  Lp.displayName = Su;
  var Bp = "ScrollAreaViewport", zp = g.forwardRef((n, o) => {
    const { __scopeScrollArea: l, children: a, nonce: u, ...d } = n, f = Bt(Bp, l), p = g.useRef(null), v = nt(o, p, f.onViewportChange);
    return h.jsxs(h.Fragment, {
      children: [
        h.jsx("style", {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: u
        }),
        h.jsx(We.div, {
          "data-radix-scroll-area-viewport": "",
          ...d,
          ref: v,
          style: {
            overflowX: f.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: f.scrollbarYEnabled ? "scroll" : "hidden",
            ...n.style
          },
          children: h.jsx("div", {
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
  zp.displayName = Bp;
  var un = "ScrollAreaScrollbar", Cu = g.forwardRef((n, o) => {
    const { forceMount: l, ...a } = n, u = Bt(un, n.__scopeScrollArea), { onScrollbarXEnabledChange: d, onScrollbarYEnabledChange: f } = u, p = n.orientation === "horizontal";
    return g.useEffect(() => (p ? d(true) : f(true), () => {
      p ? d(false) : f(false);
    }), [
      p,
      d,
      f
    ]), u.type === "hover" ? h.jsx(Jy, {
      ...a,
      ref: o,
      forceMount: l
    }) : u.type === "scroll" ? h.jsx(Zy, {
      ...a,
      ref: o,
      forceMount: l
    }) : u.type === "auto" ? h.jsx(Fp, {
      ...a,
      ref: o,
      forceMount: l
    }) : u.type === "always" ? h.jsx(ku, {
      ...a,
      ref: o
    }) : null;
  });
  Cu.displayName = un;
  var Jy = g.forwardRef((n, o) => {
    const { forceMount: l, ...a } = n, u = Bt(un, n.__scopeScrollArea), [d, f] = g.useState(false);
    return g.useEffect(() => {
      const p = u.scrollArea;
      let v = 0;
      if (p) {
        const y = () => {
          window.clearTimeout(v), f(true);
        }, w = () => {
          v = window.setTimeout(() => f(false), u.scrollHideDelay);
        };
        return p.addEventListener("pointerenter", y), p.addEventListener("pointerleave", w), () => {
          window.clearTimeout(v), p.removeEventListener("pointerenter", y), p.removeEventListener("pointerleave", w);
        };
      }
    }, [
      u.scrollArea,
      u.scrollHideDelay
    ]), h.jsx(Xt, {
      present: l || d,
      children: h.jsx(Fp, {
        "data-state": d ? "visible" : "hidden",
        ...a,
        ref: o
      })
    });
  }), Zy = g.forwardRef((n, o) => {
    const { forceMount: l, ...a } = n, u = Bt(un, n.__scopeScrollArea), d = n.orientation === "horizontal", f = Ql(() => v("SCROLL_END"), 100), [p, v] = Xy("hidden", {
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
    return g.useEffect(() => {
      if (p === "idle") {
        const y = window.setTimeout(() => v("HIDE"), u.scrollHideDelay);
        return () => window.clearTimeout(y);
      }
    }, [
      p,
      u.scrollHideDelay,
      v
    ]), g.useEffect(() => {
      const y = u.viewport, w = d ? "scrollLeft" : "scrollTop";
      if (y) {
        let S = y[w];
        const x = () => {
          const b = y[w];
          S !== b && (v("SCROLL"), f()), S = b;
        };
        return y.addEventListener("scroll", x), () => y.removeEventListener("scroll", x);
      }
    }, [
      u.viewport,
      d,
      v,
      f
    ]), h.jsx(Xt, {
      present: l || p !== "hidden",
      children: h.jsx(ku, {
        "data-state": p === "hidden" ? "hidden" : "visible",
        ...a,
        ref: o,
        onPointerEnter: Fe(n.onPointerEnter, () => v("POINTER_ENTER")),
        onPointerLeave: Fe(n.onPointerLeave, () => v("POINTER_LEAVE"))
      })
    });
  }), Fp = g.forwardRef((n, o) => {
    const l = Bt(un, n.__scopeScrollArea), { forceMount: a, ...u } = n, [d, f] = g.useState(false), p = n.orientation === "horizontal", v = Ql(() => {
      if (l.viewport) {
        const y = l.viewport.offsetWidth < l.viewport.scrollWidth, w = l.viewport.offsetHeight < l.viewport.scrollHeight;
        f(p ? y : w);
      }
    }, 10);
    return Zr(l.viewport, v), Zr(l.content, v), h.jsx(Xt, {
      present: a || d,
      children: h.jsx(ku, {
        "data-state": d ? "visible" : "hidden",
        ...u,
        ref: o
      })
    });
  }), ku = g.forwardRef((n, o) => {
    const { orientation: l = "vertical", ...a } = n, u = Bt(un, n.__scopeScrollArea), d = g.useRef(null), f = g.useRef(0), [p, v] = g.useState({
      content: 0,
      viewport: 0,
      scrollbar: {
        size: 0,
        paddingStart: 0,
        paddingEnd: 0
      }
    }), y = Up(p.viewport, p.content), w = {
      ...a,
      sizes: p,
      onSizesChange: v,
      hasThumb: y > 0 && y < 1,
      onThumbChange: (x) => d.current = x,
      onThumbPointerUp: () => f.current = 0,
      onThumbPointerDown: (x) => f.current = x
    };
    function S(x, b) {
      return iw(x, f.current, p, b);
    }
    return l === "horizontal" ? h.jsx(ew, {
      ...w,
      ref: o,
      onThumbPositionChange: () => {
        if (u.viewport && d.current) {
          const x = u.viewport.scrollLeft, b = Yf(x, p, u.dir);
          d.current.style.transform = `translate3d(${b}px, 0, 0)`;
        }
      },
      onWheelScroll: (x) => {
        u.viewport && (u.viewport.scrollLeft = x);
      },
      onDragScroll: (x) => {
        u.viewport && (u.viewport.scrollLeft = S(x, u.dir));
      }
    }) : l === "vertical" ? h.jsx(tw, {
      ...w,
      ref: o,
      onThumbPositionChange: () => {
        if (u.viewport && d.current) {
          const x = u.viewport.scrollTop, b = Yf(x, p);
          d.current.style.transform = `translate3d(0, ${b}px, 0)`;
        }
      },
      onWheelScroll: (x) => {
        u.viewport && (u.viewport.scrollTop = x);
      },
      onDragScroll: (x) => {
        u.viewport && (u.viewport.scrollTop = S(x));
      }
    }) : null;
  }), ew = g.forwardRef((n, o) => {
    const { sizes: l, onSizesChange: a, ...u } = n, d = Bt(un, n.__scopeScrollArea), [f, p] = g.useState(), v = g.useRef(null), y = nt(o, v, d.onScrollbarXChange);
    return g.useEffect(() => {
      v.current && p(getComputedStyle(v.current));
    }, [
      v
    ]), h.jsx(Wp, {
      "data-orientation": "horizontal",
      ...u,
      ref: y,
      sizes: l,
      style: {
        bottom: 0,
        left: d.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: d.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": Yl(l) + "px",
        ...n.style
      },
      onThumbPointerDown: (w) => n.onThumbPointerDown(w.x),
      onDragScroll: (w) => n.onDragScroll(w.x),
      onWheelScroll: (w, S) => {
        if (d.viewport) {
          const x = d.viewport.scrollLeft + w.deltaX;
          n.onWheelScroll(x), Gp(x, S) && w.preventDefault();
        }
      },
      onResize: () => {
        v.current && d.viewport && f && a({
          content: d.viewport.scrollWidth,
          viewport: d.viewport.offsetWidth,
          scrollbar: {
            size: v.current.clientWidth,
            paddingStart: Hl(f.paddingLeft),
            paddingEnd: Hl(f.paddingRight)
          }
        });
      }
    });
  }), tw = g.forwardRef((n, o) => {
    const { sizes: l, onSizesChange: a, ...u } = n, d = Bt(un, n.__scopeScrollArea), [f, p] = g.useState(), v = g.useRef(null), y = nt(o, v, d.onScrollbarYChange);
    return g.useEffect(() => {
      v.current && p(getComputedStyle(v.current));
    }, [
      v
    ]), h.jsx(Wp, {
      "data-orientation": "vertical",
      ...u,
      ref: y,
      sizes: l,
      style: {
        top: 0,
        right: d.dir === "ltr" ? 0 : void 0,
        left: d.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": Yl(l) + "px",
        ...n.style
      },
      onThumbPointerDown: (w) => n.onThumbPointerDown(w.y),
      onDragScroll: (w) => n.onDragScroll(w.y),
      onWheelScroll: (w, S) => {
        if (d.viewport) {
          const x = d.viewport.scrollTop + w.deltaY;
          n.onWheelScroll(x), Gp(x, S) && w.preventDefault();
        }
      },
      onResize: () => {
        v.current && d.viewport && f && a({
          content: d.viewport.scrollHeight,
          viewport: d.viewport.offsetHeight,
          scrollbar: {
            size: v.current.clientHeight,
            paddingStart: Hl(f.paddingTop),
            paddingEnd: Hl(f.paddingBottom)
          }
        });
      }
    });
  }), [nw, Ip] = _p(un), Wp = g.forwardRef((n, o) => {
    const { __scopeScrollArea: l, sizes: a, hasThumb: u, onThumbChange: d, onThumbPointerUp: f, onThumbPointerDown: p, onThumbPositionChange: v, onDragScroll: y, onWheelScroll: w, onResize: S, ...x } = n, b = Bt(un, l), [A, k] = g.useState(null), P = nt(o, (U) => k(U)), N = g.useRef(null), L = g.useRef(""), z = b.viewport, O = a.content - a.viewport, F = pt(w), G = pt(v), _ = Ql(S, 10);
    function Y(U) {
      if (N.current) {
        const ee = U.clientX - N.current.left, le = U.clientY - N.current.top;
        y({
          x: ee,
          y: le
        });
      }
    }
    return g.useEffect(() => {
      const U = (ee) => {
        const le = ee.target;
        (A == null ? void 0 : A.contains(le)) && F(ee, O);
      };
      return document.addEventListener("wheel", U, {
        passive: false
      }), () => document.removeEventListener("wheel", U, {
        passive: false
      });
    }, [
      z,
      A,
      O,
      F
    ]), g.useEffect(G, [
      a,
      G
    ]), Zr(A, _), Zr(b.content, _), h.jsx(nw, {
      scope: l,
      scrollbar: A,
      hasThumb: u,
      onThumbChange: pt(d),
      onThumbPointerUp: pt(f),
      onThumbPositionChange: G,
      onThumbPointerDown: pt(p),
      children: h.jsx(We.div, {
        ...x,
        ref: P,
        style: {
          position: "absolute",
          ...x.style
        },
        onPointerDown: Fe(n.onPointerDown, (U) => {
          U.button === 0 && (U.target.setPointerCapture(U.pointerId), N.current = A.getBoundingClientRect(), L.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", b.viewport && (b.viewport.style.scrollBehavior = "auto"), Y(U));
        }),
        onPointerMove: Fe(n.onPointerMove, Y),
        onPointerUp: Fe(n.onPointerUp, (U) => {
          const ee = U.target;
          ee.hasPointerCapture(U.pointerId) && ee.releasePointerCapture(U.pointerId), document.body.style.webkitUserSelect = L.current, b.viewport && (b.viewport.style.scrollBehavior = ""), N.current = null;
        })
      })
    });
  }), Wl = "ScrollAreaThumb", Hp = g.forwardRef((n, o) => {
    const { forceMount: l, ...a } = n, u = Ip(Wl, n.__scopeScrollArea);
    return h.jsx(Xt, {
      present: l || u.hasThumb,
      children: h.jsx(rw, {
        ref: o,
        ...a
      })
    });
  }), rw = g.forwardRef((n, o) => {
    const { __scopeScrollArea: l, style: a, ...u } = n, d = Bt(Wl, l), f = Ip(Wl, l), { onThumbPositionChange: p } = f, v = nt(o, (S) => f.onThumbChange(S)), y = g.useRef(void 0), w = Ql(() => {
      y.current && (y.current(), y.current = void 0);
    }, 100);
    return g.useEffect(() => {
      const S = d.viewport;
      if (S) {
        const x = () => {
          if (w(), !y.current) {
            const b = lw(S, p);
            y.current = b, p();
          }
        };
        return p(), S.addEventListener("scroll", x), () => S.removeEventListener("scroll", x);
      }
    }, [
      d.viewport,
      w,
      p
    ]), h.jsx(We.div, {
      "data-state": f.hasThumb ? "visible" : "hidden",
      ...u,
      ref: v,
      style: {
        width: "var(--radix-scroll-area-thumb-width)",
        height: "var(--radix-scroll-area-thumb-height)",
        ...a
      },
      onPointerDownCapture: Fe(n.onPointerDownCapture, (S) => {
        const b = S.target.getBoundingClientRect(), A = S.clientX - b.left, k = S.clientY - b.top;
        f.onThumbPointerDown({
          x: A,
          y: k
        });
      }),
      onPointerUp: Fe(n.onPointerUp, f.onThumbPointerUp)
    });
  });
  Hp.displayName = Wl;
  var bu = "ScrollAreaCorner", $p = g.forwardRef((n, o) => {
    const l = Bt(bu, n.__scopeScrollArea), a = !!(l.scrollbarX && l.scrollbarY);
    return l.type !== "scroll" && a ? h.jsx(ow, {
      ...n,
      ref: o
    }) : null;
  });
  $p.displayName = bu;
  var ow = g.forwardRef((n, o) => {
    const { __scopeScrollArea: l, ...a } = n, u = Bt(bu, l), [d, f] = g.useState(0), [p, v] = g.useState(0), y = !!(d && p);
    return Zr(u.scrollbarX, () => {
      var _a;
      const w = ((_a = u.scrollbarX) == null ? void 0 : _a.offsetHeight) || 0;
      u.onCornerHeightChange(w), v(w);
    }), Zr(u.scrollbarY, () => {
      var _a;
      const w = ((_a = u.scrollbarY) == null ? void 0 : _a.offsetWidth) || 0;
      u.onCornerWidthChange(w), f(w);
    }), y ? h.jsx(We.div, {
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
  function Hl(n) {
    return n ? parseInt(n, 10) : 0;
  }
  function Up(n, o) {
    const l = n / o;
    return isNaN(l) ? 0 : l;
  }
  function Yl(n) {
    const o = Up(n.viewport, n.content), l = n.scrollbar.paddingStart + n.scrollbar.paddingEnd, a = (n.scrollbar.size - l) * o;
    return Math.max(a, 18);
  }
  function iw(n, o, l, a = "ltr") {
    const u = Yl(l), d = u / 2, f = o || d, p = u - f, v = l.scrollbar.paddingStart + f, y = l.scrollbar.size - l.scrollbar.paddingEnd - p, w = l.content - l.viewport, S = a === "ltr" ? [
      0,
      w
    ] : [
      w * -1,
      0
    ];
    return Vp([
      v,
      y
    ], S)(n);
  }
  function Yf(n, o, l = "ltr") {
    const a = Yl(o), u = o.scrollbar.paddingStart + o.scrollbar.paddingEnd, d = o.scrollbar.size - u, f = o.content - o.viewport, p = d - a, v = l === "ltr" ? [
      0,
      f
    ] : [
      f * -1,
      0
    ], y = Qy(n, v);
    return Vp([
      0,
      f
    ], [
      0,
      p
    ])(y);
  }
  function Vp(n, o) {
    return (l) => {
      if (n[0] === n[1] || o[0] === o[1]) return o[0];
      const a = (o[1] - o[0]) / (n[1] - n[0]);
      return o[0] + a * (l - n[0]);
    };
  }
  function Gp(n, o) {
    return n > 0 && n < o;
  }
  var lw = (n, o = () => {
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
  function Ql(n, o) {
    const l = pt(n), a = g.useRef(0);
    return g.useEffect(() => () => window.clearTimeout(a.current), []), g.useCallback(() => {
      window.clearTimeout(a.current), a.current = window.setTimeout(l, o);
    }, [
      l,
      o
    ]);
  }
  function Zr(n, o) {
    const l = pt(o);
    qn(() => {
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
  var Kp = Lp, aw = zp, sw = $p;
  const ai = g.forwardRef(({ className: n, children: o, ...l }, a) => h.jsxs(Kp, {
    ref: a,
    className: qe("relative overflow-hidden", n),
    ...l,
    children: [
      h.jsx(aw, {
        className: "h-full w-full rounded-[inherit]",
        children: o
      }),
      h.jsx(Yp, {}),
      h.jsx(sw, {})
    ]
  }));
  ai.displayName = Kp.displayName;
  const Yp = g.forwardRef(({ className: n, orientation: o = "vertical", ...l }, a) => h.jsx(Cu, {
    ref: a,
    orientation: o,
    className: qe("flex touch-none select-none transition-colors", o === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", o === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", n),
    ...l,
    children: h.jsx(Hp, {
      className: "relative flex-1 rounded-full bg-border"
    })
  }));
  Yp.displayName = Cu.displayName;
  function uw(n, o = globalThis == null ? void 0 : globalThis.document) {
    const l = pt(n);
    g.useEffect(() => {
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
  var cw = "DismissableLayer", du = "dismissableLayer.update", dw = "dismissableLayer.pointerDownOutside", fw = "dismissableLayer.focusOutside", Qf, Qp = g.createContext({
    layers: /* @__PURE__ */ new Set(),
    layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
    branches: /* @__PURE__ */ new Set()
  }), Eu = g.forwardRef((n, o) => {
    const { disableOutsidePointerEvents: l = false, onEscapeKeyDown: a, onPointerDownOutside: u, onFocusOutside: d, onInteractOutside: f, onDismiss: p, ...v } = n, y = g.useContext(Qp), [w, S] = g.useState(null), x = (w == null ? void 0 : w.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, b] = g.useState({}), A = nt(o, (_) => S(_)), k = Array.from(y.layers), [P] = [
      ...y.layersWithOutsidePointerEventsDisabled
    ].slice(-1), N = k.indexOf(P), L = w ? k.indexOf(w) : -1, z = y.layersWithOutsidePointerEventsDisabled.size > 0, O = L >= N, F = hw((_) => {
      const Y = _.target, U = [
        ...y.branches
      ].some((ee) => ee.contains(Y));
      !O || U || (u == null ? void 0 : u(_), f == null ? void 0 : f(_), _.defaultPrevented || (p == null ? void 0 : p()));
    }, x), G = gw((_) => {
      const Y = _.target;
      [
        ...y.branches
      ].some((ee) => ee.contains(Y)) || (d == null ? void 0 : d(_), f == null ? void 0 : f(_), _.defaultPrevented || (p == null ? void 0 : p()));
    }, x);
    return uw((_) => {
      L === y.layers.size - 1 && (a == null ? void 0 : a(_), !_.defaultPrevented && p && (_.preventDefault(), p()));
    }, x), g.useEffect(() => {
      if (w) return l && (y.layersWithOutsidePointerEventsDisabled.size === 0 && (Qf = x.body.style.pointerEvents, x.body.style.pointerEvents = "none"), y.layersWithOutsidePointerEventsDisabled.add(w)), y.layers.add(w), Xf(), () => {
        l && y.layersWithOutsidePointerEventsDisabled.size === 1 && (x.body.style.pointerEvents = Qf);
      };
    }, [
      w,
      x,
      l,
      y
    ]), g.useEffect(() => () => {
      w && (y.layers.delete(w), y.layersWithOutsidePointerEventsDisabled.delete(w), Xf());
    }, [
      w,
      y
    ]), g.useEffect(() => {
      const _ = () => b({});
      return document.addEventListener(du, _), () => document.removeEventListener(du, _);
    }, []), h.jsx(We.div, {
      ...v,
      ref: A,
      style: {
        pointerEvents: z ? O ? "auto" : "none" : void 0,
        ...n.style
      },
      onFocusCapture: Fe(n.onFocusCapture, G.onFocusCapture),
      onBlurCapture: Fe(n.onBlurCapture, G.onBlurCapture),
      onPointerDownCapture: Fe(n.onPointerDownCapture, F.onPointerDownCapture)
    });
  });
  Eu.displayName = cw;
  var pw = "DismissableLayerBranch", mw = g.forwardRef((n, o) => {
    const l = g.useContext(Qp), a = g.useRef(null), u = nt(o, a);
    return g.useEffect(() => {
      const d = a.current;
      if (d) return l.branches.add(d), () => {
        l.branches.delete(d);
      };
    }, [
      l.branches
    ]), h.jsx(We.div, {
      ...n,
      ref: u
    });
  });
  mw.displayName = pw;
  function hw(n, o = globalThis == null ? void 0 : globalThis.document) {
    const l = pt(n), a = g.useRef(false), u = g.useRef(() => {
    });
    return g.useEffect(() => {
      const d = (p) => {
        if (p.target && !a.current) {
          let v = function() {
            Xp(dw, l, y, {
              discrete: true
            });
          };
          const y = {
            originalEvent: p
          };
          p.pointerType === "touch" ? (o.removeEventListener("click", u.current), u.current = v, o.addEventListener("click", u.current, {
            once: true
          })) : v();
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
  function gw(n, o = globalThis == null ? void 0 : globalThis.document) {
    const l = pt(n), a = g.useRef(false);
    return g.useEffect(() => {
      const u = (d) => {
        d.target && !a.current && Xp(fw, l, {
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
  function Xf() {
    const n = new CustomEvent(du);
    document.dispatchEvent(n);
  }
  function Xp(n, o, l, { discrete: a }) {
    const u = l.originalEvent.target, d = new CustomEvent(n, {
      bubbles: false,
      cancelable: true,
      detail: l
    });
    o && u.addEventListener(n, o, {
      once: true
    }), a ? Wy(u, d) : u.dispatchEvent(d);
  }
  var Ys = 0;
  function qp() {
    g.useEffect(() => {
      const n = document.querySelectorAll("[data-radix-focus-guard]");
      return document.body.insertAdjacentElement("afterbegin", n[0] ?? qf()), document.body.insertAdjacentElement("beforeend", n[1] ?? qf()), Ys++, () => {
        Ys === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((o) => o.remove()), Ys--;
      };
    }, []);
  }
  function qf() {
    const n = document.createElement("span");
    return n.setAttribute("data-radix-focus-guard", ""), n.tabIndex = 0, n.style.outline = "none", n.style.opacity = "0", n.style.position = "fixed", n.style.pointerEvents = "none", n;
  }
  var Qs = "focusScope.autoFocusOnMount", Xs = "focusScope.autoFocusOnUnmount", Jf = {
    bubbles: false,
    cancelable: true
  }, vw = "FocusScope", Pu = g.forwardRef((n, o) => {
    const { loop: l = false, trapped: a = false, onMountAutoFocus: u, onUnmountAutoFocus: d, ...f } = n, [p, v] = g.useState(null), y = pt(u), w = pt(d), S = g.useRef(null), x = nt(o, (k) => v(k)), b = g.useRef({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    }).current;
    g.useEffect(() => {
      if (a) {
        let k = function(z) {
          if (b.paused || !p) return;
          const O = z.target;
          p.contains(O) ? S.current = O : Qn(S.current, {
            select: true
          });
        }, P = function(z) {
          if (b.paused || !p) return;
          const O = z.relatedTarget;
          O !== null && (p.contains(O) || Qn(S.current, {
            select: true
          }));
        }, N = function(z) {
          if (document.activeElement === document.body) for (const F of z) F.removedNodes.length > 0 && Qn(p);
        };
        document.addEventListener("focusin", k), document.addEventListener("focusout", P);
        const L = new MutationObserver(N);
        return p && L.observe(p, {
          childList: true,
          subtree: true
        }), () => {
          document.removeEventListener("focusin", k), document.removeEventListener("focusout", P), L.disconnect();
        };
      }
    }, [
      a,
      p,
      b.paused
    ]), g.useEffect(() => {
      if (p) {
        ep.add(b);
        const k = document.activeElement;
        if (!p.contains(k)) {
          const N = new CustomEvent(Qs, Jf);
          p.addEventListener(Qs, y), p.dispatchEvent(N), N.defaultPrevented || (yw(kw(Jp(p)), {
            select: true
          }), document.activeElement === k && Qn(p));
        }
        return () => {
          p.removeEventListener(Qs, y), setTimeout(() => {
            const N = new CustomEvent(Xs, Jf);
            p.addEventListener(Xs, w), p.dispatchEvent(N), N.defaultPrevented || Qn(k ?? document.body, {
              select: true
            }), p.removeEventListener(Xs, w), ep.remove(b);
          }, 0);
        };
      }
    }, [
      p,
      y,
      w,
      b
    ]);
    const A = g.useCallback((k) => {
      if (!l && !a || b.paused) return;
      const P = k.key === "Tab" && !k.altKey && !k.ctrlKey && !k.metaKey, N = document.activeElement;
      if (P && N) {
        const L = k.currentTarget, [z, O] = ww(L);
        z && O ? !k.shiftKey && N === O ? (k.preventDefault(), l && Qn(z, {
          select: true
        })) : k.shiftKey && N === z && (k.preventDefault(), l && Qn(O, {
          select: true
        })) : N === L && k.preventDefault();
      }
    }, [
      l,
      a,
      b.paused
    ]);
    return h.jsx(We.div, {
      tabIndex: -1,
      ...f,
      ref: x,
      onKeyDown: A
    });
  });
  Pu.displayName = vw;
  function yw(n, { select: o = false } = {}) {
    const l = document.activeElement;
    for (const a of n) if (Qn(a, {
      select: o
    }), document.activeElement !== l) return;
  }
  function ww(n) {
    const o = Jp(n), l = Zf(o, n), a = Zf(o.reverse(), n);
    return [
      l,
      a
    ];
  }
  function Jp(n) {
    const o = [], l = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (a) => {
        const u = a.tagName === "INPUT" && a.type === "hidden";
        return a.disabled || a.hidden || u ? NodeFilter.FILTER_SKIP : a.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    for (; l.nextNode(); ) o.push(l.currentNode);
    return o;
  }
  function Zf(n, o) {
    for (const l of n) if (!xw(l, {
      upTo: o
    })) return l;
  }
  function xw(n, { upTo: o }) {
    if (getComputedStyle(n).visibility === "hidden") return true;
    for (; n; ) {
      if (o !== void 0 && n === o) return false;
      if (getComputedStyle(n).display === "none") return true;
      n = n.parentElement;
    }
    return false;
  }
  function Sw(n) {
    return n instanceof HTMLInputElement && "select" in n;
  }
  function Qn(n, { select: o = false } = {}) {
    if (n && n.focus) {
      const l = document.activeElement;
      n.focus({
        preventScroll: true
      }), n !== l && Sw(n) && o && n.select();
    }
  }
  var ep = Cw();
  function Cw() {
    let n = [];
    return {
      add(o) {
        const l = n[0];
        o !== l && (l == null ? void 0 : l.pause()), n = tp(n, o), n.unshift(o);
      },
      remove(o) {
        var _a;
        n = tp(n, o), (_a = n[0]) == null ? void 0 : _a.resume();
      }
    };
  }
  function tp(n, o) {
    const l = [
      ...n
    ], a = l.indexOf(o);
    return a !== -1 && l.splice(a, 1), l;
  }
  function kw(n) {
    return n.filter((o) => o.tagName !== "A");
  }
  var bw = Uv.useId || (() => {
  }), Ew = 0;
  function Ll(n) {
    const [o, l] = g.useState(bw());
    return qn(() => {
      l((a) => a ?? String(Ew++));
    }, [
      n
    ]), n || (o ? `radix-${o}` : "");
  }
  const Pw = [
    "top",
    "right",
    "bottom",
    "left"
  ], Jn = Math.min, Rt = Math.max, $l = Math.round, Tl = Math.floor, ln = (n) => ({
    x: n,
    y: n
  }), Rw = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  }, Tw = {
    start: "end",
    end: "start"
  };
  function fu(n, o, l) {
    return Rt(n, Jn(o, l));
  }
  function Cn(n, o) {
    return typeof n == "function" ? n(o) : n;
  }
  function kn(n) {
    return n.split("-")[0];
  }
  function ro(n) {
    return n.split("-")[1];
  }
  function Ru(n) {
    return n === "x" ? "y" : "x";
  }
  function Tu(n) {
    return n === "y" ? "height" : "width";
  }
  function Zn(n) {
    return [
      "top",
      "bottom"
    ].includes(kn(n)) ? "y" : "x";
  }
  function Nu(n) {
    return Ru(Zn(n));
  }
  function Nw(n, o, l) {
    l === void 0 && (l = false);
    const a = ro(n), u = Nu(n), d = Tu(u);
    let f = u === "x" ? a === (l ? "end" : "start") ? "right" : "left" : a === "start" ? "bottom" : "top";
    return o.reference[d] > o.floating[d] && (f = Ul(f)), [
      f,
      Ul(f)
    ];
  }
  function Mw(n) {
    const o = Ul(n);
    return [
      pu(n),
      o,
      pu(o)
    ];
  }
  function pu(n) {
    return n.replace(/start|end/g, (o) => Tw[o]);
  }
  function Aw(n, o, l) {
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
  function Dw(n, o, l, a) {
    const u = ro(n);
    let d = Aw(kn(n), l === "start", a);
    return u && (d = d.map((f) => f + "-" + u), o && (d = d.concat(d.map(pu)))), d;
  }
  function Ul(n) {
    return n.replace(/left|right|bottom|top/g, (o) => Rw[o]);
  }
  function Ow(n) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...n
    };
  }
  function Zp(n) {
    return typeof n != "number" ? Ow(n) : {
      top: n,
      right: n,
      bottom: n,
      left: n
    };
  }
  function Vl(n) {
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
  function np(n, o, l) {
    let { reference: a, floating: u } = n;
    const d = Zn(o), f = Nu(o), p = Tu(f), v = kn(o), y = d === "y", w = a.x + a.width / 2 - u.width / 2, S = a.y + a.height / 2 - u.height / 2, x = a[p] / 2 - u[p] / 2;
    let b;
    switch (v) {
      case "top":
        b = {
          x: w,
          y: a.y - u.height
        };
        break;
      case "bottom":
        b = {
          x: w,
          y: a.y + a.height
        };
        break;
      case "right":
        b = {
          x: a.x + a.width,
          y: S
        };
        break;
      case "left":
        b = {
          x: a.x - u.width,
          y: S
        };
        break;
      default:
        b = {
          x: a.x,
          y: a.y
        };
    }
    switch (ro(o)) {
      case "start":
        b[f] -= x * (l && y ? -1 : 1);
        break;
      case "end":
        b[f] += x * (l && y ? -1 : 1);
        break;
    }
    return b;
  }
  const jw = async (n, o, l) => {
    const { placement: a = "bottom", strategy: u = "absolute", middleware: d = [], platform: f } = l, p = d.filter(Boolean), v = await (f.isRTL == null ? void 0 : f.isRTL(o));
    let y = await f.getElementRects({
      reference: n,
      floating: o,
      strategy: u
    }), { x: w, y: S } = np(y, a, v), x = a, b = {}, A = 0;
    for (let k = 0; k < p.length; k++) {
      const { name: P, fn: N } = p[k], { x: L, y: z, data: O, reset: F } = await N({
        x: w,
        y: S,
        initialPlacement: a,
        placement: x,
        strategy: u,
        middlewareData: b,
        rects: y,
        platform: f,
        elements: {
          reference: n,
          floating: o
        }
      });
      w = L ?? w, S = z ?? S, b = {
        ...b,
        [P]: {
          ...b[P],
          ...O
        }
      }, F && A <= 50 && (A++, typeof F == "object" && (F.placement && (x = F.placement), F.rects && (y = F.rects === true ? await f.getElementRects({
        reference: n,
        floating: o,
        strategy: u
      }) : F.rects), { x: w, y: S } = np(y, x, v)), k = -1);
    }
    return {
      x: w,
      y: S,
      placement: x,
      strategy: u,
      middlewareData: b
    };
  };
  async function ri(n, o) {
    var l;
    o === void 0 && (o = {});
    const { x: a, y: u, platform: d, rects: f, elements: p, strategy: v } = n, { boundary: y = "clippingAncestors", rootBoundary: w = "viewport", elementContext: S = "floating", altBoundary: x = false, padding: b = 0 } = Cn(o, n), A = Zp(b), P = p[x ? S === "floating" ? "reference" : "floating" : S], N = Vl(await d.getClippingRect({
      element: (l = await (d.isElement == null ? void 0 : d.isElement(P))) == null || l ? P : P.contextElement || await (d.getDocumentElement == null ? void 0 : d.getDocumentElement(p.floating)),
      boundary: y,
      rootBoundary: w,
      strategy: v
    })), L = S === "floating" ? {
      x: a,
      y: u,
      width: f.floating.width,
      height: f.floating.height
    } : f.reference, z = await (d.getOffsetParent == null ? void 0 : d.getOffsetParent(p.floating)), O = await (d.isElement == null ? void 0 : d.isElement(z)) ? await (d.getScale == null ? void 0 : d.getScale(z)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    }, F = Vl(d.convertOffsetParentRelativeRectToViewportRelativeRect ? await d.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements: p,
      rect: L,
      offsetParent: z,
      strategy: v
    }) : L);
    return {
      top: (N.top - F.top + A.top) / O.y,
      bottom: (F.bottom - N.bottom + A.bottom) / O.y,
      left: (N.left - F.left + A.left) / O.x,
      right: (F.right - N.right + A.right) / O.x
    };
  }
  const _w = (n) => ({
    name: "arrow",
    options: n,
    async fn(o) {
      const { x: l, y: a, placement: u, rects: d, platform: f, elements: p, middlewareData: v } = o, { element: y, padding: w = 0 } = Cn(n, o) || {};
      if (y == null) return {};
      const S = Zp(w), x = {
        x: l,
        y: a
      }, b = Nu(u), A = Tu(b), k = await f.getDimensions(y), P = b === "y", N = P ? "top" : "left", L = P ? "bottom" : "right", z = P ? "clientHeight" : "clientWidth", O = d.reference[A] + d.reference[b] - x[b] - d.floating[A], F = x[b] - d.reference[b], G = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(y));
      let _ = G ? G[z] : 0;
      (!_ || !await (f.isElement == null ? void 0 : f.isElement(G))) && (_ = p.floating[z] || d.floating[A]);
      const Y = O / 2 - F / 2, U = _ / 2 - k[A] / 2 - 1, ee = Jn(S[N], U), le = Jn(S[L], U), Z = ee, Q = _ - k[A] - le, ae = _ / 2 - k[A] / 2 + Y, ge = fu(Z, ae, Q), se = !v.arrow && ro(u) != null && ae !== ge && d.reference[A] / 2 - (ae < Z ? ee : le) - k[A] / 2 < 0, oe = se ? ae < Z ? ae - Z : ae - Q : 0;
      return {
        [b]: x[b] + oe,
        data: {
          [b]: ge,
          centerOffset: ae - ge - oe,
          ...se && {
            alignmentOffset: oe
          }
        },
        reset: se
      };
    }
  }), Lw = function(n) {
    return n === void 0 && (n = {}), {
      name: "flip",
      options: n,
      async fn(o) {
        var l, a;
        const { placement: u, middlewareData: d, rects: f, initialPlacement: p, platform: v, elements: y } = o, { mainAxis: w = true, crossAxis: S = true, fallbackPlacements: x, fallbackStrategy: b = "bestFit", fallbackAxisSideDirection: A = "none", flipAlignment: k = true, ...P } = Cn(n, o);
        if ((l = d.arrow) != null && l.alignmentOffset) return {};
        const N = kn(u), L = Zn(p), z = kn(p) === p, O = await (v.isRTL == null ? void 0 : v.isRTL(y.floating)), F = x || (z || !k ? [
          Ul(p)
        ] : Mw(p)), G = A !== "none";
        !x && G && F.push(...Dw(p, k, A, O));
        const _ = [
          p,
          ...F
        ], Y = await ri(o, P), U = [];
        let ee = ((a = d.flip) == null ? void 0 : a.overflows) || [];
        if (w && U.push(Y[N]), S) {
          const ae = Nw(u, f, O);
          U.push(Y[ae[0]], Y[ae[1]]);
        }
        if (ee = [
          ...ee,
          {
            placement: u,
            overflows: U
          }
        ], !U.every((ae) => ae <= 0)) {
          var le, Z;
          const ae = (((le = d.flip) == null ? void 0 : le.index) || 0) + 1, ge = _[ae];
          if (ge) return {
            data: {
              index: ae,
              overflows: ee
            },
            reset: {
              placement: ge
            }
          };
          let se = (Z = ee.filter((oe) => oe.overflows[0] <= 0).sort((oe, B) => oe.overflows[1] - B.overflows[1])[0]) == null ? void 0 : Z.placement;
          if (!se) switch (b) {
            case "bestFit": {
              var Q;
              const oe = (Q = ee.filter((B) => {
                if (G) {
                  const X = Zn(B.placement);
                  return X === L || X === "y";
                }
                return true;
              }).map((B) => [
                B.placement,
                B.overflows.filter((X) => X > 0).reduce((X, K) => X + K, 0)
              ]).sort((B, X) => B[1] - X[1])[0]) == null ? void 0 : Q[0];
              oe && (se = oe);
              break;
            }
            case "initialPlacement":
              se = p;
              break;
          }
          if (u !== se) return {
            reset: {
              placement: se
            }
          };
        }
        return {};
      }
    };
  };
  function rp(n, o) {
    return {
      top: n.top - o.height,
      right: n.right - o.width,
      bottom: n.bottom - o.height,
      left: n.left - o.width
    };
  }
  function op(n) {
    return Pw.some((o) => n[o] >= 0);
  }
  const Bw = function(n) {
    return n === void 0 && (n = {}), {
      name: "hide",
      options: n,
      async fn(o) {
        const { rects: l } = o, { strategy: a = "referenceHidden", ...u } = Cn(n, o);
        switch (a) {
          case "referenceHidden": {
            const d = await ri(o, {
              ...u,
              elementContext: "reference"
            }), f = rp(d, l.reference);
            return {
              data: {
                referenceHiddenOffsets: f,
                referenceHidden: op(f)
              }
            };
          }
          case "escaped": {
            const d = await ri(o, {
              ...u,
              altBoundary: true
            }), f = rp(d, l.floating);
            return {
              data: {
                escapedOffsets: f,
                escaped: op(f)
              }
            };
          }
          default:
            return {};
        }
      }
    };
  };
  async function zw(n, o) {
    const { placement: l, platform: a, elements: u } = n, d = await (a.isRTL == null ? void 0 : a.isRTL(u.floating)), f = kn(l), p = ro(l), v = Zn(l) === "y", y = [
      "left",
      "top"
    ].includes(f) ? -1 : 1, w = d && v ? -1 : 1, S = Cn(o, n);
    let { mainAxis: x, crossAxis: b, alignmentAxis: A } = typeof S == "number" ? {
      mainAxis: S,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: S.mainAxis || 0,
      crossAxis: S.crossAxis || 0,
      alignmentAxis: S.alignmentAxis
    };
    return p && typeof A == "number" && (b = p === "end" ? A * -1 : A), v ? {
      x: b * w,
      y: x * y
    } : {
      x: x * y,
      y: b * w
    };
  }
  const Fw = function(n) {
    return n === void 0 && (n = 0), {
      name: "offset",
      options: n,
      async fn(o) {
        var l, a;
        const { x: u, y: d, placement: f, middlewareData: p } = o, v = await zw(o, n);
        return f === ((l = p.offset) == null ? void 0 : l.placement) && (a = p.arrow) != null && a.alignmentOffset ? {} : {
          x: u + v.x,
          y: d + v.y,
          data: {
            ...v,
            placement: f
          }
        };
      }
    };
  }, Iw = function(n) {
    return n === void 0 && (n = {}), {
      name: "shift",
      options: n,
      async fn(o) {
        const { x: l, y: a, placement: u } = o, { mainAxis: d = true, crossAxis: f = false, limiter: p = {
          fn: (P) => {
            let { x: N, y: L } = P;
            return {
              x: N,
              y: L
            };
          }
        }, ...v } = Cn(n, o), y = {
          x: l,
          y: a
        }, w = await ri(o, v), S = Zn(kn(u)), x = Ru(S);
        let b = y[x], A = y[S];
        if (d) {
          const P = x === "y" ? "top" : "left", N = x === "y" ? "bottom" : "right", L = b + w[P], z = b - w[N];
          b = fu(L, b, z);
        }
        if (f) {
          const P = S === "y" ? "top" : "left", N = S === "y" ? "bottom" : "right", L = A + w[P], z = A - w[N];
          A = fu(L, A, z);
        }
        const k = p.fn({
          ...o,
          [x]: b,
          [S]: A
        });
        return {
          ...k,
          data: {
            x: k.x - l,
            y: k.y - a,
            enabled: {
              [x]: d,
              [S]: f
            }
          }
        };
      }
    };
  }, Ww = function(n) {
    return n === void 0 && (n = {}), {
      options: n,
      fn(o) {
        const { x: l, y: a, placement: u, rects: d, middlewareData: f } = o, { offset: p = 0, mainAxis: v = true, crossAxis: y = true } = Cn(n, o), w = {
          x: l,
          y: a
        }, S = Zn(u), x = Ru(S);
        let b = w[x], A = w[S];
        const k = Cn(p, o), P = typeof k == "number" ? {
          mainAxis: k,
          crossAxis: 0
        } : {
          mainAxis: 0,
          crossAxis: 0,
          ...k
        };
        if (v) {
          const z = x === "y" ? "height" : "width", O = d.reference[x] - d.floating[z] + P.mainAxis, F = d.reference[x] + d.reference[z] - P.mainAxis;
          b < O ? b = O : b > F && (b = F);
        }
        if (y) {
          var N, L;
          const z = x === "y" ? "width" : "height", O = [
            "top",
            "left"
          ].includes(kn(u)), F = d.reference[S] - d.floating[z] + (O && ((N = f.offset) == null ? void 0 : N[S]) || 0) + (O ? 0 : P.crossAxis), G = d.reference[S] + d.reference[z] + (O ? 0 : ((L = f.offset) == null ? void 0 : L[S]) || 0) - (O ? P.crossAxis : 0);
          A < F ? A = F : A > G && (A = G);
        }
        return {
          [x]: b,
          [S]: A
        };
      }
    };
  }, Hw = function(n) {
    return n === void 0 && (n = {}), {
      name: "size",
      options: n,
      async fn(o) {
        var l, a;
        const { placement: u, rects: d, platform: f, elements: p } = o, { apply: v = () => {
        }, ...y } = Cn(n, o), w = await ri(o, y), S = kn(u), x = ro(u), b = Zn(u) === "y", { width: A, height: k } = d.floating;
        let P, N;
        S === "top" || S === "bottom" ? (P = S, N = x === (await (f.isRTL == null ? void 0 : f.isRTL(p.floating)) ? "start" : "end") ? "left" : "right") : (N = S, P = x === "end" ? "top" : "bottom");
        const L = k - w.top - w.bottom, z = A - w.left - w.right, O = Jn(k - w[P], L), F = Jn(A - w[N], z), G = !o.middlewareData.shift;
        let _ = O, Y = F;
        if ((l = o.middlewareData.shift) != null && l.enabled.x && (Y = z), (a = o.middlewareData.shift) != null && a.enabled.y && (_ = L), G && !x) {
          const ee = Rt(w.left, 0), le = Rt(w.right, 0), Z = Rt(w.top, 0), Q = Rt(w.bottom, 0);
          b ? Y = A - 2 * (ee !== 0 || le !== 0 ? ee + le : Rt(w.left, w.right)) : _ = k - 2 * (Z !== 0 || Q !== 0 ? Z + Q : Rt(w.top, w.bottom));
        }
        await v({
          ...o,
          availableWidth: Y,
          availableHeight: _
        });
        const U = await f.getDimensions(p.floating);
        return A !== U.width || k !== U.height ? {
          reset: {
            rects: true
          }
        } : {};
      }
    };
  };
  function Xl() {
    return typeof window < "u";
  }
  function oo(n) {
    return em(n) ? (n.nodeName || "").toLowerCase() : "#document";
  }
  function Tt(n) {
    var o;
    return (n == null || (o = n.ownerDocument) == null ? void 0 : o.defaultView) || window;
  }
  function cn(n) {
    var o;
    return (o = (em(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : o.documentElement;
  }
  function em(n) {
    return Xl() ? n instanceof Node || n instanceof Tt(n).Node : false;
  }
  function Yt(n) {
    return Xl() ? n instanceof Element || n instanceof Tt(n).Element : false;
  }
  function sn(n) {
    return Xl() ? n instanceof HTMLElement || n instanceof Tt(n).HTMLElement : false;
  }
  function ip(n) {
    return !Xl() || typeof ShadowRoot > "u" ? false : n instanceof ShadowRoot || n instanceof Tt(n).ShadowRoot;
  }
  function si(n) {
    const { overflow: o, overflowX: l, overflowY: a, display: u } = Qt(n);
    return /auto|scroll|overlay|hidden|clip/.test(o + a + l) && ![
      "inline",
      "contents"
    ].includes(u);
  }
  function $w(n) {
    return [
      "table",
      "td",
      "th"
    ].includes(oo(n));
  }
  function ql(n) {
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
  function Mu(n) {
    const o = Au(), l = Yt(n) ? Qt(n) : n;
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
  function Uw(n) {
    let o = er(n);
    for (; sn(o) && !eo(o); ) {
      if (Mu(o)) return o;
      if (ql(o)) return null;
      o = er(o);
    }
    return null;
  }
  function Au() {
    return typeof CSS > "u" || !CSS.supports ? false : CSS.supports("-webkit-backdrop-filter", "none");
  }
  function eo(n) {
    return [
      "html",
      "body",
      "#document"
    ].includes(oo(n));
  }
  function Qt(n) {
    return Tt(n).getComputedStyle(n);
  }
  function Jl(n) {
    return Yt(n) ? {
      scrollLeft: n.scrollLeft,
      scrollTop: n.scrollTop
    } : {
      scrollLeft: n.scrollX,
      scrollTop: n.scrollY
    };
  }
  function er(n) {
    if (oo(n) === "html") return n;
    const o = n.assignedSlot || n.parentNode || ip(n) && n.host || cn(n);
    return ip(o) ? o.host : o;
  }
  function tm(n) {
    const o = er(n);
    return eo(o) ? n.ownerDocument ? n.ownerDocument.body : n.body : sn(o) && si(o) ? o : tm(o);
  }
  function oi(n, o, l) {
    var a;
    o === void 0 && (o = []), l === void 0 && (l = true);
    const u = tm(n), d = u === ((a = n.ownerDocument) == null ? void 0 : a.body), f = Tt(u);
    if (d) {
      const p = mu(f);
      return o.concat(f, f.visualViewport || [], si(u) ? u : [], p && l ? oi(p) : []);
    }
    return o.concat(u, oi(u, [], l));
  }
  function mu(n) {
    return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
  }
  function nm(n) {
    const o = Qt(n);
    let l = parseFloat(o.width) || 0, a = parseFloat(o.height) || 0;
    const u = sn(n), d = u ? n.offsetWidth : l, f = u ? n.offsetHeight : a, p = $l(l) !== d || $l(a) !== f;
    return p && (l = d, a = f), {
      width: l,
      height: a,
      $: p
    };
  }
  function Du(n) {
    return Yt(n) ? n : n.contextElement;
  }
  function Xr(n) {
    const o = Du(n);
    if (!sn(o)) return ln(1);
    const l = o.getBoundingClientRect(), { width: a, height: u, $: d } = nm(o);
    let f = (d ? $l(l.width) : l.width) / a, p = (d ? $l(l.height) : l.height) / u;
    return (!f || !Number.isFinite(f)) && (f = 1), (!p || !Number.isFinite(p)) && (p = 1), {
      x: f,
      y: p
    };
  }
  const Vw = ln(0);
  function rm(n) {
    const o = Tt(n);
    return !Au() || !o.visualViewport ? Vw : {
      x: o.visualViewport.offsetLeft,
      y: o.visualViewport.offsetTop
    };
  }
  function Gw(n, o, l) {
    return o === void 0 && (o = false), !l || o && l !== Tt(n) ? false : o;
  }
  function wr(n, o, l, a) {
    o === void 0 && (o = false), l === void 0 && (l = false);
    const u = n.getBoundingClientRect(), d = Du(n);
    let f = ln(1);
    o && (a ? Yt(a) && (f = Xr(a)) : f = Xr(n));
    const p = Gw(d, l, a) ? rm(d) : ln(0);
    let v = (u.left + p.x) / f.x, y = (u.top + p.y) / f.y, w = u.width / f.x, S = u.height / f.y;
    if (d) {
      const x = Tt(d), b = a && Yt(a) ? Tt(a) : a;
      let A = x, k = mu(A);
      for (; k && a && b !== A; ) {
        const P = Xr(k), N = k.getBoundingClientRect(), L = Qt(k), z = N.left + (k.clientLeft + parseFloat(L.paddingLeft)) * P.x, O = N.top + (k.clientTop + parseFloat(L.paddingTop)) * P.y;
        v *= P.x, y *= P.y, w *= P.x, S *= P.y, v += z, y += O, A = Tt(k), k = mu(A);
      }
    }
    return Vl({
      width: w,
      height: S,
      x: v,
      y
    });
  }
  function Ou(n, o) {
    const l = Jl(n).scrollLeft;
    return o ? o.left + l : wr(cn(n)).left + l;
  }
  function om(n, o, l) {
    l === void 0 && (l = false);
    const a = n.getBoundingClientRect(), u = a.left + o.scrollLeft - (l ? 0 : Ou(n, a)), d = a.top + o.scrollTop;
    return {
      x: u,
      y: d
    };
  }
  function Kw(n) {
    let { elements: o, rect: l, offsetParent: a, strategy: u } = n;
    const d = u === "fixed", f = cn(a), p = o ? ql(o.floating) : false;
    if (a === f || p && d) return l;
    let v = {
      scrollLeft: 0,
      scrollTop: 0
    }, y = ln(1);
    const w = ln(0), S = sn(a);
    if ((S || !S && !d) && ((oo(a) !== "body" || si(f)) && (v = Jl(a)), sn(a))) {
      const b = wr(a);
      y = Xr(a), w.x = b.x + a.clientLeft, w.y = b.y + a.clientTop;
    }
    const x = f && !S && !d ? om(f, v, true) : ln(0);
    return {
      width: l.width * y.x,
      height: l.height * y.y,
      x: l.x * y.x - v.scrollLeft * y.x + w.x + x.x,
      y: l.y * y.y - v.scrollTop * y.y + w.y + x.y
    };
  }
  function Yw(n) {
    return Array.from(n.getClientRects());
  }
  function Qw(n) {
    const o = cn(n), l = Jl(n), a = n.ownerDocument.body, u = Rt(o.scrollWidth, o.clientWidth, a.scrollWidth, a.clientWidth), d = Rt(o.scrollHeight, o.clientHeight, a.scrollHeight, a.clientHeight);
    let f = -l.scrollLeft + Ou(n);
    const p = -l.scrollTop;
    return Qt(a).direction === "rtl" && (f += Rt(o.clientWidth, a.clientWidth) - u), {
      width: u,
      height: d,
      x: f,
      y: p
    };
  }
  function Xw(n, o) {
    const l = Tt(n), a = cn(n), u = l.visualViewport;
    let d = a.clientWidth, f = a.clientHeight, p = 0, v = 0;
    if (u) {
      d = u.width, f = u.height;
      const y = Au();
      (!y || y && o === "fixed") && (p = u.offsetLeft, v = u.offsetTop);
    }
    return {
      width: d,
      height: f,
      x: p,
      y: v
    };
  }
  function qw(n, o) {
    const l = wr(n, true, o === "fixed"), a = l.top + n.clientTop, u = l.left + n.clientLeft, d = sn(n) ? Xr(n) : ln(1), f = n.clientWidth * d.x, p = n.clientHeight * d.y, v = u * d.x, y = a * d.y;
    return {
      width: f,
      height: p,
      x: v,
      y
    };
  }
  function lp(n, o, l) {
    let a;
    if (o === "viewport") a = Xw(n, l);
    else if (o === "document") a = Qw(cn(n));
    else if (Yt(o)) a = qw(o, l);
    else {
      const u = rm(n);
      a = {
        x: o.x - u.x,
        y: o.y - u.y,
        width: o.width,
        height: o.height
      };
    }
    return Vl(a);
  }
  function im(n, o) {
    const l = er(n);
    return l === o || !Yt(l) || eo(l) ? false : Qt(l).position === "fixed" || im(l, o);
  }
  function Jw(n, o) {
    const l = o.get(n);
    if (l) return l;
    let a = oi(n, [], false).filter((p) => Yt(p) && oo(p) !== "body"), u = null;
    const d = Qt(n).position === "fixed";
    let f = d ? er(n) : n;
    for (; Yt(f) && !eo(f); ) {
      const p = Qt(f), v = Mu(f);
      !v && p.position === "fixed" && (u = null), (d ? !v && !u : !v && p.position === "static" && !!u && [
        "absolute",
        "fixed"
      ].includes(u.position) || si(f) && !v && im(n, f)) ? a = a.filter((w) => w !== f) : u = p, f = er(f);
    }
    return o.set(n, a), a;
  }
  function Zw(n) {
    let { element: o, boundary: l, rootBoundary: a, strategy: u } = n;
    const f = [
      ...l === "clippingAncestors" ? ql(o) ? [] : Jw(o, this._c) : [].concat(l),
      a
    ], p = f[0], v = f.reduce((y, w) => {
      const S = lp(o, w, u);
      return y.top = Rt(S.top, y.top), y.right = Jn(S.right, y.right), y.bottom = Jn(S.bottom, y.bottom), y.left = Rt(S.left, y.left), y;
    }, lp(o, p, u));
    return {
      width: v.right - v.left,
      height: v.bottom - v.top,
      x: v.left,
      y: v.top
    };
  }
  function e0(n) {
    const { width: o, height: l } = nm(n);
    return {
      width: o,
      height: l
    };
  }
  function t0(n, o, l) {
    const a = sn(o), u = cn(o), d = l === "fixed", f = wr(n, true, d, o);
    let p = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const v = ln(0);
    if (a || !a && !d) if ((oo(o) !== "body" || si(u)) && (p = Jl(o)), a) {
      const x = wr(o, true, d, o);
      v.x = x.x + o.clientLeft, v.y = x.y + o.clientTop;
    } else u && (v.x = Ou(u));
    const y = u && !a && !d ? om(u, p) : ln(0), w = f.left + p.scrollLeft - v.x - y.x, S = f.top + p.scrollTop - v.y - y.y;
    return {
      x: w,
      y: S,
      width: f.width,
      height: f.height
    };
  }
  function qs(n) {
    return Qt(n).position === "static";
  }
  function ap(n, o) {
    if (!sn(n) || Qt(n).position === "fixed") return null;
    if (o) return o(n);
    let l = n.offsetParent;
    return cn(n) === l && (l = l.ownerDocument.body), l;
  }
  function lm(n, o) {
    const l = Tt(n);
    if (ql(n)) return l;
    if (!sn(n)) {
      let u = er(n);
      for (; u && !eo(u); ) {
        if (Yt(u) && !qs(u)) return u;
        u = er(u);
      }
      return l;
    }
    let a = ap(n, o);
    for (; a && $w(a) && qs(a); ) a = ap(a, o);
    return a && eo(a) && qs(a) && !Mu(a) ? l : a || Uw(n) || l;
  }
  const n0 = async function(n) {
    const o = this.getOffsetParent || lm, l = this.getDimensions, a = await l(n.floating);
    return {
      reference: t0(n.reference, await o(n.floating), n.strategy),
      floating: {
        x: 0,
        y: 0,
        width: a.width,
        height: a.height
      }
    };
  };
  function r0(n) {
    return Qt(n).direction === "rtl";
  }
  const o0 = {
    convertOffsetParentRelativeRectToViewportRelativeRect: Kw,
    getDocumentElement: cn,
    getClippingRect: Zw,
    getOffsetParent: lm,
    getElementRects: n0,
    getClientRects: Yw,
    getDimensions: e0,
    getScale: Xr,
    isElement: Yt,
    isRTL: r0
  };
  function am(n, o) {
    return n.x === o.x && n.y === o.y && n.width === o.width && n.height === o.height;
  }
  function i0(n, o) {
    let l = null, a;
    const u = cn(n);
    function d() {
      var p;
      clearTimeout(a), (p = l) == null || p.disconnect(), l = null;
    }
    function f(p, v) {
      p === void 0 && (p = false), v === void 0 && (v = 1), d();
      const y = n.getBoundingClientRect(), { left: w, top: S, width: x, height: b } = y;
      if (p || o(), !x || !b) return;
      const A = Tl(S), k = Tl(u.clientWidth - (w + x)), P = Tl(u.clientHeight - (S + b)), N = Tl(w), z = {
        rootMargin: -A + "px " + -k + "px " + -P + "px " + -N + "px",
        threshold: Rt(0, Jn(1, v)) || 1
      };
      let O = true;
      function F(G) {
        const _ = G[0].intersectionRatio;
        if (_ !== v) {
          if (!O) return f();
          _ ? f(false, _) : a = setTimeout(() => {
            f(false, 1e-7);
          }, 1e3);
        }
        _ === 1 && !am(y, n.getBoundingClientRect()) && f(), O = false;
      }
      try {
        l = new IntersectionObserver(F, {
          ...z,
          root: u.ownerDocument
        });
      } catch {
        l = new IntersectionObserver(F, z);
      }
      l.observe(n);
    }
    return f(true), d;
  }
  function l0(n, o, l, a) {
    a === void 0 && (a = {});
    const { ancestorScroll: u = true, ancestorResize: d = true, elementResize: f = typeof ResizeObserver == "function", layoutShift: p = typeof IntersectionObserver == "function", animationFrame: v = false } = a, y = Du(n), w = u || d ? [
      ...y ? oi(y) : [],
      ...oi(o)
    ] : [];
    w.forEach((N) => {
      u && N.addEventListener("scroll", l, {
        passive: true
      }), d && N.addEventListener("resize", l);
    });
    const S = y && p ? i0(y, l) : null;
    let x = -1, b = null;
    f && (b = new ResizeObserver((N) => {
      let [L] = N;
      L && L.target === y && b && (b.unobserve(o), cancelAnimationFrame(x), x = requestAnimationFrame(() => {
        var z;
        (z = b) == null || z.observe(o);
      })), l();
    }), y && !v && b.observe(y), b.observe(o));
    let A, k = v ? wr(n) : null;
    v && P();
    function P() {
      const N = wr(n);
      k && !am(k, N) && l(), k = N, A = requestAnimationFrame(P);
    }
    return l(), () => {
      var N;
      w.forEach((L) => {
        u && L.removeEventListener("scroll", l), d && L.removeEventListener("resize", l);
      }), S == null ? void 0 : S(), (N = b) == null || N.disconnect(), b = null, v && cancelAnimationFrame(A);
    };
  }
  const a0 = Fw, s0 = Iw, u0 = Lw, c0 = Hw, d0 = Bw, sp = _w, f0 = Ww, p0 = (n, o, l) => {
    const a = /* @__PURE__ */ new Map(), u = {
      platform: o0,
      ...l
    }, d = {
      ...u.platform,
      _c: a
    };
    return jw(n, o, {
      ...u,
      platform: d
    });
  };
  var Bl = typeof document < "u" ? g.useLayoutEffect : g.useEffect;
  function Gl(n, o) {
    if (n === o) return true;
    if (typeof n != typeof o) return false;
    if (typeof n == "function" && n.toString() === o.toString()) return true;
    let l, a, u;
    if (n && o && typeof n == "object") {
      if (Array.isArray(n)) {
        if (l = n.length, l !== o.length) return false;
        for (a = l; a-- !== 0; ) if (!Gl(n[a], o[a])) return false;
        return true;
      }
      if (u = Object.keys(n), l = u.length, l !== Object.keys(o).length) return false;
      for (a = l; a-- !== 0; ) if (!{}.hasOwnProperty.call(o, u[a])) return false;
      for (a = l; a-- !== 0; ) {
        const d = u[a];
        if (!(d === "_owner" && n.$$typeof) && !Gl(n[d], o[d])) return false;
      }
      return true;
    }
    return n !== n && o !== o;
  }
  function sm(n) {
    return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
  }
  function up(n, o) {
    const l = sm(n);
    return Math.round(o * l) / l;
  }
  function Js(n) {
    const o = g.useRef(n);
    return Bl(() => {
      o.current = n;
    }), o;
  }
  function m0(n) {
    n === void 0 && (n = {});
    const { placement: o = "bottom", strategy: l = "absolute", middleware: a = [], platform: u, elements: { reference: d, floating: f } = {}, transform: p = true, whileElementsMounted: v, open: y } = n, [w, S] = g.useState({
      x: 0,
      y: 0,
      strategy: l,
      placement: o,
      middlewareData: {},
      isPositioned: false
    }), [x, b] = g.useState(a);
    Gl(x, a) || b(a);
    const [A, k] = g.useState(null), [P, N] = g.useState(null), L = g.useCallback((B) => {
      B !== G.current && (G.current = B, k(B));
    }, []), z = g.useCallback((B) => {
      B !== _.current && (_.current = B, N(B));
    }, []), O = d || A, F = f || P, G = g.useRef(null), _ = g.useRef(null), Y = g.useRef(w), U = v != null, ee = Js(v), le = Js(u), Z = Js(y), Q = g.useCallback(() => {
      if (!G.current || !_.current) return;
      const B = {
        placement: o,
        strategy: l,
        middleware: x
      };
      le.current && (B.platform = le.current), p0(G.current, _.current, B).then((X) => {
        const K = {
          ...X,
          isPositioned: Z.current !== false
        };
        ae.current && !Gl(Y.current, K) && (Y.current = K, xu.flushSync(() => {
          S(K);
        }));
      });
    }, [
      x,
      o,
      l,
      le,
      Z
    ]);
    Bl(() => {
      y === false && Y.current.isPositioned && (Y.current.isPositioned = false, S((B) => ({
        ...B,
        isPositioned: false
      })));
    }, [
      y
    ]);
    const ae = g.useRef(false);
    Bl(() => (ae.current = true, () => {
      ae.current = false;
    }), []), Bl(() => {
      if (O && (G.current = O), F && (_.current = F), O && F) {
        if (ee.current) return ee.current(O, F, Q);
        Q();
      }
    }, [
      O,
      F,
      Q,
      ee,
      U
    ]);
    const ge = g.useMemo(() => ({
      reference: G,
      floating: _,
      setReference: L,
      setFloating: z
    }), [
      L,
      z
    ]), se = g.useMemo(() => ({
      reference: O,
      floating: F
    }), [
      O,
      F
    ]), oe = g.useMemo(() => {
      const B = {
        position: l,
        left: 0,
        top: 0
      };
      if (!se.floating) return B;
      const X = up(se.floating, w.x), K = up(se.floating, w.y);
      return p ? {
        ...B,
        transform: "translate(" + X + "px, " + K + "px)",
        ...sm(se.floating) >= 1.5 && {
          willChange: "transform"
        }
      } : {
        position: l,
        left: X,
        top: K
      };
    }, [
      l,
      p,
      se.floating,
      w.x,
      w.y
    ]);
    return g.useMemo(() => ({
      ...w,
      update: Q,
      refs: ge,
      elements: se,
      floatingStyles: oe
    }), [
      w,
      Q,
      ge,
      se,
      oe
    ]);
  }
  const h0 = (n) => {
    function o(l) {
      return {}.hasOwnProperty.call(l, "current");
    }
    return {
      name: "arrow",
      options: n,
      fn(l) {
        const { element: a, padding: u } = typeof n == "function" ? n(l) : n;
        return a && o(a) ? a.current != null ? sp({
          element: a.current,
          padding: u
        }).fn(l) : {} : a ? sp({
          element: a,
          padding: u
        }).fn(l) : {};
      }
    };
  }, g0 = (n, o) => ({
    ...a0(n),
    options: [
      n,
      o
    ]
  }), v0 = (n, o) => ({
    ...s0(n),
    options: [
      n,
      o
    ]
  }), y0 = (n, o) => ({
    ...f0(n),
    options: [
      n,
      o
    ]
  }), w0 = (n, o) => ({
    ...u0(n),
    options: [
      n,
      o
    ]
  }), x0 = (n, o) => ({
    ...c0(n),
    options: [
      n,
      o
    ]
  }), S0 = (n, o) => ({
    ...d0(n),
    options: [
      n,
      o
    ]
  }), C0 = (n, o) => ({
    ...h0(n),
    options: [
      n,
      o
    ]
  });
  var k0 = "Arrow", um = g.forwardRef((n, o) => {
    const { children: l, width: a = 10, height: u = 5, ...d } = n;
    return h.jsx(We.svg, {
      ...d,
      ref: o,
      width: a,
      height: u,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: n.asChild ? l : h.jsx("polygon", {
        points: "0,0 30,0 15,10"
      })
    });
  });
  um.displayName = k0;
  var b0 = um;
  function cm(n) {
    const [o, l] = g.useState(void 0);
    return qn(() => {
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
            const v = d.borderBoxSize, y = Array.isArray(v) ? v[0] : v;
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
  var ju = "Popper", [dm, fm] = li(ju), [E0, pm] = dm(ju), mm = (n) => {
    const { __scopePopper: o, children: l } = n, [a, u] = g.useState(null);
    return h.jsx(E0, {
      scope: o,
      anchor: a,
      onAnchorChange: u,
      children: l
    });
  };
  mm.displayName = ju;
  var hm = "PopperAnchor", gm = g.forwardRef((n, o) => {
    const { __scopePopper: l, virtualRef: a, ...u } = n, d = pm(hm, l), f = g.useRef(null), p = nt(o, f);
    return g.useEffect(() => {
      d.onAnchorChange((a == null ? void 0 : a.current) || f.current);
    }), a ? null : h.jsx(We.div, {
      ...u,
      ref: p
    });
  });
  gm.displayName = hm;
  var _u = "PopperContent", [P0, R0] = dm(_u), vm = g.forwardRef((n, o) => {
    var _a, _b, _c, _d, _e, _f2;
    const { __scopePopper: l, side: a = "bottom", sideOffset: u = 0, align: d = "center", alignOffset: f = 0, arrowPadding: p = 0, avoidCollisions: v = true, collisionBoundary: y = [], collisionPadding: w = 0, sticky: S = "partial", hideWhenDetached: x = false, updatePositionStrategy: b = "optimized", onPlaced: A, ...k } = n, P = pm(_u, l), [N, L] = g.useState(null), z = nt(o, (Se) => L(Se)), [O, F] = g.useState(null), G = cm(O), _ = (G == null ? void 0 : G.width) ?? 0, Y = (G == null ? void 0 : G.height) ?? 0, U = a + (d !== "center" ? "-" + d : ""), ee = typeof w == "number" ? w : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...w
    }, le = Array.isArray(y) ? y : [
      y
    ], Z = le.length > 0, Q = {
      padding: ee,
      boundary: le.filter(N0),
      altBoundary: Z
    }, { refs: ae, floatingStyles: ge, placement: se, isPositioned: oe, middlewareData: B } = m0({
      strategy: "fixed",
      placement: U,
      whileElementsMounted: (...Se) => l0(...Se, {
        animationFrame: b === "always"
      }),
      elements: {
        reference: P.anchor
      },
      middleware: [
        g0({
          mainAxis: u + Y,
          alignmentAxis: f
        }),
        v && v0({
          mainAxis: true,
          crossAxis: false,
          limiter: S === "partial" ? y0() : void 0,
          ...Q
        }),
        v && w0({
          ...Q
        }),
        x0({
          ...Q,
          apply: ({ elements: Se, rects: Ce, availableWidth: Te, availableHeight: Ke }) => {
            const { width: Ct, height: nr } = Ce.reference, Nt = Se.floating.style;
            Nt.setProperty("--radix-popper-available-width", `${Te}px`), Nt.setProperty("--radix-popper-available-height", `${Ke}px`), Nt.setProperty("--radix-popper-anchor-width", `${Ct}px`), Nt.setProperty("--radix-popper-anchor-height", `${nr}px`);
          }
        }),
        O && C0({
          element: O,
          padding: p
        }),
        M0({
          arrowWidth: _,
          arrowHeight: Y
        }),
        x && S0({
          strategy: "referenceHidden",
          ...Q
        })
      ]
    }), [X, K] = xm(se), T = pt(A);
    qn(() => {
      oe && (T == null ? void 0 : T());
    }, [
      oe,
      T
    ]);
    const I = (_a = B.arrow) == null ? void 0 : _a.x, fe = (_b = B.arrow) == null ? void 0 : _b.y, me = ((_c = B.arrow) == null ? void 0 : _c.centerOffset) !== 0, [we, xe] = g.useState();
    return qn(() => {
      N && xe(window.getComputedStyle(N).zIndex);
    }, [
      N
    ]), h.jsx("div", {
      ref: ae.setFloating,
      "data-radix-popper-content-wrapper": "",
      style: {
        ...ge,
        transform: oe ? ge.transform : "translate(0, -200%)",
        minWidth: "max-content",
        zIndex: we,
        "--radix-popper-transform-origin": [
          (_d = B.transformOrigin) == null ? void 0 : _d.x,
          (_e = B.transformOrigin) == null ? void 0 : _e.y
        ].join(" "),
        ...((_f2 = B.hide) == null ? void 0 : _f2.referenceHidden) && {
          visibility: "hidden",
          pointerEvents: "none"
        }
      },
      dir: n.dir,
      children: h.jsx(P0, {
        scope: l,
        placedSide: X,
        onArrowChange: F,
        arrowX: I,
        arrowY: fe,
        shouldHideArrow: me,
        children: h.jsx(We.div, {
          "data-side": X,
          "data-align": K,
          ...k,
          ref: z,
          style: {
            ...k.style,
            animation: oe ? void 0 : "none"
          }
        })
      })
    });
  });
  vm.displayName = _u;
  var ym = "PopperArrow", T0 = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }, wm = g.forwardRef(function(o, l) {
    const { __scopePopper: a, ...u } = o, d = R0(ym, a), f = T0[d.placedSide];
    return h.jsx("span", {
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
      children: h.jsx(b0, {
        ...u,
        ref: l,
        style: {
          ...u.style,
          display: "block"
        }
      })
    });
  });
  wm.displayName = ym;
  function N0(n) {
    return n !== null;
  }
  var M0 = (n) => ({
    name: "transformOrigin",
    options: n,
    fn(o) {
      var _a, _b, _c;
      const { placement: l, rects: a, middlewareData: u } = o, f = ((_a = u.arrow) == null ? void 0 : _a.centerOffset) !== 0, p = f ? 0 : n.arrowWidth, v = f ? 0 : n.arrowHeight, [y, w] = xm(l), S = {
        start: "0%",
        center: "50%",
        end: "100%"
      }[w], x = (((_b = u.arrow) == null ? void 0 : _b.x) ?? 0) + p / 2, b = (((_c = u.arrow) == null ? void 0 : _c.y) ?? 0) + v / 2;
      let A = "", k = "";
      return y === "bottom" ? (A = f ? S : `${x}px`, k = `${-v}px`) : y === "top" ? (A = f ? S : `${x}px`, k = `${a.floating.height + v}px`) : y === "right" ? (A = `${-v}px`, k = f ? S : `${b}px`) : y === "left" && (A = `${a.floating.width + v}px`, k = f ? S : `${b}px`), {
        data: {
          x: A,
          y: k
        }
      };
    }
  });
  function xm(n) {
    const [o, l = "center"] = n.split("-");
    return [
      o,
      l
    ];
  }
  var A0 = mm, Sm = gm, D0 = vm, O0 = wm, j0 = "Portal", Lu = g.forwardRef((n, o) => {
    var _a;
    const { container: l, ...a } = n, [u, d] = g.useState(false);
    qn(() => d(true), []);
    const f = l || u && ((_a = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a.body);
    return f ? Fy.createPortal(h.jsx(We.div, {
      ...a,
      ref: o
    }), f) : null;
  });
  Lu.displayName = j0;
  function Zl({ prop: n, defaultProp: o, onChange: l = () => {
  } }) {
    const [a, u] = _0({
      defaultProp: o,
      onChange: l
    }), d = n !== void 0, f = d ? n : a, p = pt(l), v = g.useCallback((y) => {
      if (d) {
        const S = typeof y == "function" ? y(n) : y;
        S !== n && p(S);
      } else u(y);
    }, [
      d,
      n,
      u,
      p
    ]);
    return [
      f,
      v
    ];
  }
  function _0({ defaultProp: n, onChange: o }) {
    const l = g.useState(n), [a] = l, u = g.useRef(a), d = pt(o);
    return g.useEffect(() => {
      u.current !== a && (d(a), u.current = a);
    }, [
      a,
      u,
      d
    ]), l;
  }
  var L0 = function(n) {
    if (typeof document > "u") return null;
    var o = Array.isArray(n) ? n[0] : n;
    return o.ownerDocument.body;
  }, Vr = /* @__PURE__ */ new WeakMap(), Nl = /* @__PURE__ */ new WeakMap(), Ml = {}, Zs = 0, Cm = function(n) {
    return n && (n.host || Cm(n.parentNode));
  }, B0 = function(n, o) {
    return o.map(function(l) {
      if (n.contains(l)) return l;
      var a = Cm(l);
      return a && n.contains(a) ? a : (console.error("aria-hidden", l, "in not contained inside", n, ". Doing nothing"), null);
    }).filter(function(l) {
      return !!l;
    });
  }, z0 = function(n, o, l, a) {
    var u = B0(o, Array.isArray(n) ? n : [
      n
    ]);
    Ml[l] || (Ml[l] = /* @__PURE__ */ new WeakMap());
    var d = Ml[l], f = [], p = /* @__PURE__ */ new Set(), v = new Set(u), y = function(S) {
      !S || p.has(S) || (p.add(S), y(S.parentNode));
    };
    u.forEach(y);
    var w = function(S) {
      !S || v.has(S) || Array.prototype.forEach.call(S.children, function(x) {
        if (p.has(x)) w(x);
        else try {
          var b = x.getAttribute(a), A = b !== null && b !== "false", k = (Vr.get(x) || 0) + 1, P = (d.get(x) || 0) + 1;
          Vr.set(x, k), d.set(x, P), f.push(x), k === 1 && A && Nl.set(x, true), P === 1 && x.setAttribute(l, "true"), A || x.setAttribute(a, "true");
        } catch (N) {
          console.error("aria-hidden: cannot operate on ", x, N);
        }
      });
    };
    return w(o), p.clear(), Zs++, function() {
      f.forEach(function(S) {
        var x = Vr.get(S) - 1, b = d.get(S) - 1;
        Vr.set(S, x), d.set(S, b), x || (Nl.has(S) || S.removeAttribute(a), Nl.delete(S)), b || S.removeAttribute(l);
      }), Zs--, Zs || (Vr = /* @__PURE__ */ new WeakMap(), Vr = /* @__PURE__ */ new WeakMap(), Nl = /* @__PURE__ */ new WeakMap(), Ml = {});
    };
  }, km = function(n, o, l) {
    l === void 0 && (l = "data-aria-hidden");
    var a = Array.from(Array.isArray(n) ? n : [
      n
    ]), u = L0(n);
    return u ? (a.push.apply(a, Array.from(u.querySelectorAll("[aria-live]"))), z0(a, u, l, "aria-hidden")) : function() {
      return null;
    };
  }, on = function() {
    return on = Object.assign || function(o) {
      for (var l, a = 1, u = arguments.length; a < u; a++) {
        l = arguments[a];
        for (var d in l) Object.prototype.hasOwnProperty.call(l, d) && (o[d] = l[d]);
      }
      return o;
    }, on.apply(this, arguments);
  };
  function bm(n, o) {
    var l = {};
    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && o.indexOf(a) < 0 && (l[a] = n[a]);
    if (n != null && typeof Object.getOwnPropertySymbols == "function") for (var u = 0, a = Object.getOwnPropertySymbols(n); u < a.length; u++) o.indexOf(a[u]) < 0 && Object.prototype.propertyIsEnumerable.call(n, a[u]) && (l[a[u]] = n[a[u]]);
    return l;
  }
  function F0(n, o, l) {
    if (l || arguments.length === 2) for (var a = 0, u = o.length, d; a < u; a++) (d || !(a in o)) && (d || (d = Array.prototype.slice.call(o, 0, a)), d[a] = o[a]);
    return n.concat(d || Array.prototype.slice.call(o));
  }
  var zl = "right-scroll-bar-position", Fl = "width-before-scroll-bar", I0 = "with-scroll-bars-hidden", W0 = "--removed-body-scroll-bar-size";
  function eu(n, o) {
    return typeof n == "function" ? n(o) : n && (n.current = o), n;
  }
  function H0(n, o) {
    var l = g.useState(function() {
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
  var $0 = typeof window < "u" ? g.useLayoutEffect : g.useEffect, cp = /* @__PURE__ */ new WeakMap();
  function U0(n, o) {
    var l = H0(null, function(a) {
      return n.forEach(function(u) {
        return eu(u, a);
      });
    });
    return $0(function() {
      var a = cp.get(l);
      if (a) {
        var u = new Set(a), d = new Set(n), f = l.current;
        u.forEach(function(p) {
          d.has(p) || eu(p, null);
        }), d.forEach(function(p) {
          u.has(p) || eu(p, f);
        });
      }
      cp.set(l, n);
    }, [
      n
    ]), l;
  }
  function V0(n) {
    return n;
  }
  function G0(n, o) {
    o === void 0 && (o = V0);
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
        var v = function() {
          var w = f;
          f = [], w.forEach(d);
        }, y = function() {
          return Promise.resolve().then(v);
        };
        y(), l = {
          push: function(w) {
            f.push(w), y();
          },
          filter: function(w) {
            return f = f.filter(w), l;
          }
        };
      }
    };
    return u;
  }
  function K0(n) {
    n === void 0 && (n = {});
    var o = G0(null);
    return o.options = on({
      async: true,
      ssr: false
    }, n), o;
  }
  var Em = function(n) {
    var o = n.sideCar, l = bm(n, [
      "sideCar"
    ]);
    if (!o) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
    var a = o.read();
    if (!a) throw new Error("Sidecar medium not found");
    return g.createElement(a, on({}, l));
  };
  Em.isSideCarExport = true;
  function Y0(n, o) {
    return n.useMedium(o), Em;
  }
  var Pm = K0(), tu = function() {
  }, ea = g.forwardRef(function(n, o) {
    var l = g.useRef(null), a = g.useState({
      onScrollCapture: tu,
      onWheelCapture: tu,
      onTouchMoveCapture: tu
    }), u = a[0], d = a[1], f = n.forwardProps, p = n.children, v = n.className, y = n.removeScrollBar, w = n.enabled, S = n.shards, x = n.sideCar, b = n.noIsolation, A = n.inert, k = n.allowPinchZoom, P = n.as, N = P === void 0 ? "div" : P, L = n.gapMode, z = bm(n, [
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
    ]), O = x, F = U0([
      l,
      o
    ]), G = on(on({}, z), u);
    return g.createElement(g.Fragment, null, w && g.createElement(O, {
      sideCar: Pm,
      removeScrollBar: y,
      shards: S,
      noIsolation: b,
      inert: A,
      setCallbacks: d,
      allowPinchZoom: !!k,
      lockRef: l,
      gapMode: L
    }), f ? g.cloneElement(g.Children.only(p), on(on({}, G), {
      ref: F
    })) : g.createElement(N, on({}, G, {
      className: v,
      ref: F
    }), p));
  });
  ea.defaultProps = {
    enabled: true,
    removeScrollBar: true,
    inert: false
  };
  ea.classNames = {
    fullWidth: Fl,
    zeroRight: zl
  };
  var Q0 = function() {
    if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
  };
  function X0() {
    if (!document) return null;
    var n = document.createElement("style");
    n.type = "text/css";
    var o = Q0();
    return o && n.setAttribute("nonce", o), n;
  }
  function q0(n, o) {
    n.styleSheet ? n.styleSheet.cssText = o : n.appendChild(document.createTextNode(o));
  }
  function J0(n) {
    var o = document.head || document.getElementsByTagName("head")[0];
    o.appendChild(n);
  }
  var Z0 = function() {
    var n = 0, o = null;
    return {
      add: function(l) {
        n == 0 && (o = X0()) && (q0(o, l), J0(o)), n++;
      },
      remove: function() {
        n--, !n && o && (o.parentNode && o.parentNode.removeChild(o), o = null);
      }
    };
  }, ex = function() {
    var n = Z0();
    return function(o, l) {
      g.useEffect(function() {
        return n.add(o), function() {
          n.remove();
        };
      }, [
        o && l
      ]);
    };
  }, Rm = function() {
    var n = ex(), o = function(l) {
      var a = l.styles, u = l.dynamic;
      return n(a, u), null;
    };
    return o;
  }, tx = {
    left: 0,
    top: 0,
    right: 0,
    gap: 0
  }, nu = function(n) {
    return parseInt(n || "", 10) || 0;
  }, nx = function(n) {
    var o = window.getComputedStyle(document.body), l = o[n === "padding" ? "paddingLeft" : "marginLeft"], a = o[n === "padding" ? "paddingTop" : "marginTop"], u = o[n === "padding" ? "paddingRight" : "marginRight"];
    return [
      nu(l),
      nu(a),
      nu(u)
    ];
  }, rx = function(n) {
    if (n === void 0 && (n = "margin"), typeof window > "u") return tx;
    var o = nx(n), l = document.documentElement.clientWidth, a = window.innerWidth;
    return {
      left: o[0],
      top: o[1],
      right: o[2],
      gap: Math.max(0, a - l + o[2] - o[0])
    };
  }, ox = Rm(), qr = "data-scroll-locked", ix = function(n, o, l, a) {
    var u = n.left, d = n.top, f = n.right, p = n.gap;
    return l === void 0 && (l = "margin"), `
  .`.concat(I0, ` {
   overflow: hidden `).concat(a, `;
   padding-right: `).concat(p, "px ").concat(a, `;
  }
  body[`).concat(qr, `] {
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
  
  .`).concat(zl, ` {
    right: `).concat(p, "px ").concat(a, `;
  }
  
  .`).concat(Fl, ` {
    margin-right: `).concat(p, "px ").concat(a, `;
  }
  
  .`).concat(zl, " .").concat(zl, ` {
    right: 0 `).concat(a, `;
  }
  
  .`).concat(Fl, " .").concat(Fl, ` {
    margin-right: 0 `).concat(a, `;
  }
  
  body[`).concat(qr, `] {
    `).concat(W0, ": ").concat(p, `px;
  }
`);
  }, dp = function() {
    var n = parseInt(document.body.getAttribute(qr) || "0", 10);
    return isFinite(n) ? n : 0;
  }, lx = function() {
    g.useEffect(function() {
      return document.body.setAttribute(qr, (dp() + 1).toString()), function() {
        var n = dp() - 1;
        n <= 0 ? document.body.removeAttribute(qr) : document.body.setAttribute(qr, n.toString());
      };
    }, []);
  }, ax = function(n) {
    var o = n.noRelative, l = n.noImportant, a = n.gapMode, u = a === void 0 ? "margin" : a;
    lx();
    var d = g.useMemo(function() {
      return rx(u);
    }, [
      u
    ]);
    return g.createElement(ox, {
      styles: ix(d, !o, u, l ? "" : "!important")
    });
  }, hu = false;
  if (typeof window < "u") try {
    var Al = Object.defineProperty({}, "passive", {
      get: function() {
        return hu = true, true;
      }
    });
    window.addEventListener("test", Al, Al), window.removeEventListener("test", Al, Al);
  } catch {
    hu = false;
  }
  var Gr = hu ? {
    passive: false
  } : false, sx = function(n) {
    return n.tagName === "TEXTAREA";
  }, Tm = function(n, o) {
    if (!(n instanceof Element)) return false;
    var l = window.getComputedStyle(n);
    return l[o] !== "hidden" && !(l.overflowY === l.overflowX && !sx(n) && l[o] === "visible");
  }, ux = function(n) {
    return Tm(n, "overflowY");
  }, cx = function(n) {
    return Tm(n, "overflowX");
  }, fp = function(n, o) {
    var l = o.ownerDocument, a = o;
    do {
      typeof ShadowRoot < "u" && a instanceof ShadowRoot && (a = a.host);
      var u = Nm(n, a);
      if (u) {
        var d = Mm(n, a), f = d[1], p = d[2];
        if (f > p) return true;
      }
      a = a.parentNode;
    } while (a && a !== l.body);
    return false;
  }, dx = function(n) {
    var o = n.scrollTop, l = n.scrollHeight, a = n.clientHeight;
    return [
      o,
      l,
      a
    ];
  }, fx = function(n) {
    var o = n.scrollLeft, l = n.scrollWidth, a = n.clientWidth;
    return [
      o,
      l,
      a
    ];
  }, Nm = function(n, o) {
    return n === "v" ? ux(o) : cx(o);
  }, Mm = function(n, o) {
    return n === "v" ? dx(o) : fx(o);
  }, px = function(n, o) {
    return n === "h" && o === "rtl" ? -1 : 1;
  }, mx = function(n, o, l, a, u) {
    var d = px(n, window.getComputedStyle(o).direction), f = d * a, p = l.target, v = o.contains(p), y = false, w = f > 0, S = 0, x = 0;
    do {
      var b = Mm(n, p), A = b[0], k = b[1], P = b[2], N = k - P - d * A;
      (A || N) && Nm(n, p) && (S += N, x += A), p instanceof ShadowRoot ? p = p.host : p = p.parentNode;
    } while (!v && p !== document.body || v && (o.contains(p) || o === p));
    return (w && Math.abs(S) < 1 || !w && Math.abs(x) < 1) && (y = true), y;
  }, Dl = function(n) {
    return "changedTouches" in n ? [
      n.changedTouches[0].clientX,
      n.changedTouches[0].clientY
    ] : [
      0,
      0
    ];
  }, pp = function(n) {
    return [
      n.deltaX,
      n.deltaY
    ];
  }, mp = function(n) {
    return n && "current" in n ? n.current : n;
  }, hx = function(n, o) {
    return n[0] === o[0] && n[1] === o[1];
  }, gx = function(n) {
    return `
  .block-interactivity-`.concat(n, ` {pointer-events: none;}
  .allow-interactivity-`).concat(n, ` {pointer-events: all;}
`);
  }, vx = 0, Kr = [];
  function yx(n) {
    var o = g.useRef([]), l = g.useRef([
      0,
      0
    ]), a = g.useRef(), u = g.useState(vx++)[0], d = g.useState(Rm)[0], f = g.useRef(n);
    g.useEffect(function() {
      f.current = n;
    }, [
      n
    ]), g.useEffect(function() {
      if (n.inert) {
        document.body.classList.add("block-interactivity-".concat(u));
        var k = F0([
          n.lockRef.current
        ], (n.shards || []).map(mp), true).filter(Boolean);
        return k.forEach(function(P) {
          return P.classList.add("allow-interactivity-".concat(u));
        }), function() {
          document.body.classList.remove("block-interactivity-".concat(u)), k.forEach(function(P) {
            return P.classList.remove("allow-interactivity-".concat(u));
          });
        };
      }
    }, [
      n.inert,
      n.lockRef.current,
      n.shards
    ]);
    var p = g.useCallback(function(k, P) {
      if ("touches" in k && k.touches.length === 2 || k.type === "wheel" && k.ctrlKey) return !f.current.allowPinchZoom;
      var N = Dl(k), L = l.current, z = "deltaX" in k ? k.deltaX : L[0] - N[0], O = "deltaY" in k ? k.deltaY : L[1] - N[1], F, G = k.target, _ = Math.abs(z) > Math.abs(O) ? "h" : "v";
      if ("touches" in k && _ === "h" && G.type === "range") return false;
      var Y = fp(_, G);
      if (!Y) return true;
      if (Y ? F = _ : (F = _ === "v" ? "h" : "v", Y = fp(_, G)), !Y) return false;
      if (!a.current && "changedTouches" in k && (z || O) && (a.current = F), !F) return true;
      var U = a.current || F;
      return mx(U, P, k, U === "h" ? z : O);
    }, []), v = g.useCallback(function(k) {
      var P = k;
      if (!(!Kr.length || Kr[Kr.length - 1] !== d)) {
        var N = "deltaY" in P ? pp(P) : Dl(P), L = o.current.filter(function(F) {
          return F.name === P.type && (F.target === P.target || P.target === F.shadowParent) && hx(F.delta, N);
        })[0];
        if (L && L.should) {
          P.cancelable && P.preventDefault();
          return;
        }
        if (!L) {
          var z = (f.current.shards || []).map(mp).filter(Boolean).filter(function(F) {
            return F.contains(P.target);
          }), O = z.length > 0 ? p(P, z[0]) : !f.current.noIsolation;
          O && P.cancelable && P.preventDefault();
        }
      }
    }, []), y = g.useCallback(function(k, P, N, L) {
      var z = {
        name: k,
        delta: P,
        target: N,
        should: L,
        shadowParent: wx(N)
      };
      o.current.push(z), setTimeout(function() {
        o.current = o.current.filter(function(O) {
          return O !== z;
        });
      }, 1);
    }, []), w = g.useCallback(function(k) {
      l.current = Dl(k), a.current = void 0;
    }, []), S = g.useCallback(function(k) {
      y(k.type, pp(k), k.target, p(k, n.lockRef.current));
    }, []), x = g.useCallback(function(k) {
      y(k.type, Dl(k), k.target, p(k, n.lockRef.current));
    }, []);
    g.useEffect(function() {
      return Kr.push(d), n.setCallbacks({
        onScrollCapture: S,
        onWheelCapture: S,
        onTouchMoveCapture: x
      }), document.addEventListener("wheel", v, Gr), document.addEventListener("touchmove", v, Gr), document.addEventListener("touchstart", w, Gr), function() {
        Kr = Kr.filter(function(k) {
          return k !== d;
        }), document.removeEventListener("wheel", v, Gr), document.removeEventListener("touchmove", v, Gr), document.removeEventListener("touchstart", w, Gr);
      };
    }, []);
    var b = n.removeScrollBar, A = n.inert;
    return g.createElement(g.Fragment, null, A ? g.createElement(d, {
      styles: gx(u)
    }) : null, b ? g.createElement(ax, {
      gapMode: n.gapMode
    }) : null);
  }
  function wx(n) {
    for (var o = null; n !== null; ) n instanceof ShadowRoot && (o = n.host, n = n.host), n = n.parentNode;
    return o;
  }
  const xx = Y0(Pm, yx);
  var Bu = g.forwardRef(function(n, o) {
    return g.createElement(ea, on({}, n, {
      ref: o,
      sideCar: xx
    }));
  });
  Bu.classNames = ea.classNames;
  var zu = "Popover", [Am, AC] = li(zu, [
    fm
  ]), ui = fm(), [Sx, tr] = Am(zu), Dm = (n) => {
    const { __scopePopover: o, children: l, open: a, defaultOpen: u, onOpenChange: d, modal: f = false } = n, p = ui(o), v = g.useRef(null), [y, w] = g.useState(false), [S = false, x] = Zl({
      prop: a,
      defaultProp: u,
      onChange: d
    });
    return h.jsx(A0, {
      ...p,
      children: h.jsx(Sx, {
        scope: o,
        contentId: Ll(),
        triggerRef: v,
        open: S,
        onOpenChange: x,
        onOpenToggle: g.useCallback(() => x((b) => !b), [
          x
        ]),
        hasCustomAnchor: y,
        onCustomAnchorAdd: g.useCallback(() => w(true), []),
        onCustomAnchorRemove: g.useCallback(() => w(false), []),
        modal: f,
        children: l
      })
    });
  };
  Dm.displayName = zu;
  var Om = "PopoverAnchor", Cx = g.forwardRef((n, o) => {
    const { __scopePopover: l, ...a } = n, u = tr(Om, l), d = ui(l), { onCustomAnchorAdd: f, onCustomAnchorRemove: p } = u;
    return g.useEffect(() => (f(), () => p()), [
      f,
      p
    ]), h.jsx(Sm, {
      ...d,
      ...a,
      ref: o
    });
  });
  Cx.displayName = Om;
  var jm = "PopoverTrigger", _m = g.forwardRef((n, o) => {
    const { __scopePopover: l, ...a } = n, u = tr(jm, l), d = ui(l), f = nt(o, u.triggerRef), p = h.jsx(We.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": u.open,
      "aria-controls": u.contentId,
      "data-state": Im(u.open),
      ...a,
      ref: f,
      onClick: Fe(n.onClick, u.onOpenToggle)
    });
    return u.hasCustomAnchor ? p : h.jsx(Sm, {
      asChild: true,
      ...d,
      children: p
    });
  });
  _m.displayName = jm;
  var Fu = "PopoverPortal", [kx, bx] = Am(Fu, {
    forceMount: void 0
  }), Lm = (n) => {
    const { __scopePopover: o, forceMount: l, children: a, container: u } = n, d = tr(Fu, o);
    return h.jsx(kx, {
      scope: o,
      forceMount: l,
      children: h.jsx(Xt, {
        present: l || d.open,
        children: h.jsx(Lu, {
          asChild: true,
          container: u,
          children: a
        })
      })
    });
  };
  Lm.displayName = Fu;
  var to = "PopoverContent", Bm = g.forwardRef((n, o) => {
    const l = bx(to, n.__scopePopover), { forceMount: a = l.forceMount, ...u } = n, d = tr(to, n.__scopePopover);
    return h.jsx(Xt, {
      present: a || d.open,
      children: d.modal ? h.jsx(Ex, {
        ...u,
        ref: o
      }) : h.jsx(Px, {
        ...u,
        ref: o
      })
    });
  });
  Bm.displayName = to;
  var Ex = g.forwardRef((n, o) => {
    const l = tr(to, n.__scopePopover), a = g.useRef(null), u = nt(o, a), d = g.useRef(false);
    return g.useEffect(() => {
      const f = a.current;
      if (f) return km(f);
    }, []), h.jsx(Bu, {
      as: ii,
      allowPinchZoom: true,
      children: h.jsx(zm, {
        ...n,
        ref: u,
        trapFocus: l.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: Fe(n.onCloseAutoFocus, (f) => {
          var _a;
          f.preventDefault(), d.current || ((_a = l.triggerRef.current) == null ? void 0 : _a.focus());
        }),
        onPointerDownOutside: Fe(n.onPointerDownOutside, (f) => {
          const p = f.detail.originalEvent, v = p.button === 0 && p.ctrlKey === true, y = p.button === 2 || v;
          d.current = y;
        }, {
          checkForDefaultPrevented: false
        }),
        onFocusOutside: Fe(n.onFocusOutside, (f) => f.preventDefault(), {
          checkForDefaultPrevented: false
        })
      })
    });
  }), Px = g.forwardRef((n, o) => {
    const l = tr(to, n.__scopePopover), a = g.useRef(false), u = g.useRef(false);
    return h.jsx(zm, {
      ...n,
      ref: o,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      onCloseAutoFocus: (d) => {
        var _a, _b;
        (_a = n.onCloseAutoFocus) == null ? void 0 : _a.call(n, d), d.defaultPrevented || (a.current || ((_b = l.triggerRef.current) == null ? void 0 : _b.focus()), d.preventDefault()), a.current = false, u.current = false;
      },
      onInteractOutside: (d) => {
        var _a, _b;
        (_a = n.onInteractOutside) == null ? void 0 : _a.call(n, d), d.defaultPrevented || (a.current = true, d.detail.originalEvent.type === "pointerdown" && (u.current = true));
        const f = d.target;
        ((_b = l.triggerRef.current) == null ? void 0 : _b.contains(f)) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && u.current && d.preventDefault();
      }
    });
  }), zm = g.forwardRef((n, o) => {
    const { __scopePopover: l, trapFocus: a, onOpenAutoFocus: u, onCloseAutoFocus: d, disableOutsidePointerEvents: f, onEscapeKeyDown: p, onPointerDownOutside: v, onFocusOutside: y, onInteractOutside: w, ...S } = n, x = tr(to, l), b = ui(l);
    return qp(), h.jsx(Pu, {
      asChild: true,
      loop: true,
      trapped: a,
      onMountAutoFocus: u,
      onUnmountAutoFocus: d,
      children: h.jsx(Eu, {
        asChild: true,
        disableOutsidePointerEvents: f,
        onInteractOutside: w,
        onEscapeKeyDown: p,
        onPointerDownOutside: v,
        onFocusOutside: y,
        onDismiss: () => x.onOpenChange(false),
        children: h.jsx(D0, {
          "data-state": Im(x.open),
          role: "dialog",
          id: x.contentId,
          ...b,
          ...S,
          ref: o,
          style: {
            ...S.style,
            "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
            "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
            "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
          }
        })
      })
    });
  }), Fm = "PopoverClose", Rx = g.forwardRef((n, o) => {
    const { __scopePopover: l, ...a } = n, u = tr(Fm, l);
    return h.jsx(We.button, {
      type: "button",
      ...a,
      ref: o,
      onClick: Fe(n.onClick, () => u.onOpenChange(false))
    });
  });
  Rx.displayName = Fm;
  var Tx = "PopoverArrow", Nx = g.forwardRef((n, o) => {
    const { __scopePopover: l, ...a } = n, u = ui(l);
    return h.jsx(O0, {
      ...u,
      ...a,
      ref: o
    });
  });
  Nx.displayName = Tx;
  function Im(n) {
    return n ? "open" : "closed";
  }
  var Mx = Dm, Ax = _m, Dx = Lm, Wm = Bm;
  const Ox = Mx, jx = Ax, Hm = g.forwardRef(({ className: n, align: o = "center", sideOffset: l = 4, ...a }, u) => h.jsx(Dx, {
    children: h.jsx(Wm, {
      ref: u,
      align: o,
      sideOffset: l,
      className: qe("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", n),
      ...a
    })
  }));
  Hm.displayName = Wm.displayName;
  const _x = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), $m = (...n) => n.filter((o, l, a) => !!o && o.trim() !== "" && a.indexOf(o) === l).join(" ").trim();
  var Lx = {
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
  const Bx = g.forwardRef(({ color: n = "currentColor", size: o = 24, strokeWidth: l = 2, absoluteStrokeWidth: a, className: u = "", children: d, iconNode: f, ...p }, v) => g.createElement("svg", {
    ref: v,
    ...Lx,
    width: o,
    height: o,
    stroke: n,
    strokeWidth: a ? Number(l) * 24 / Number(o) : l,
    className: $m("lucide", u),
    ...p
  }, [
    ...f.map(([y, w]) => g.createElement(y, w)),
    ...Array.isArray(d) ? d : [
      d
    ]
  ]));
  const St = (n, o) => {
    const l = g.forwardRef(({ className: a, ...u }, d) => g.createElement(Bx, {
      ref: d,
      iconNode: o,
      className: $m(`lucide-${_x(n)}`, a),
      ...u
    }));
    return l.displayName = `${n}`, l;
  };
  const zx = St("ArrowDown", [
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
  const Fx = St("Check", [
    [
      "path",
      {
        d: "M20 6 9 17l-5-5",
        key: "1gmf2c"
      }
    ]
  ]);
  const Um = St("ChevronLeft", [
    [
      "path",
      {
        d: "m15 18-6-6 6-6",
        key: "1wnfg3"
      }
    ]
  ]);
  const Ix = St("ChevronRight", [
    [
      "path",
      {
        d: "m9 18 6-6-6-6",
        key: "mthhwq"
      }
    ]
  ]);
  const Wx = St("CirclePlus", [
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
  const ru = St("Copy", [
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
  const Hx = St("FileText", [
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
  const $x = St("Hash", [
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
  const Ux = St("Moon", [
    [
      "path",
      {
        d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
        key: "a7tn18"
      }
    ]
  ]);
  const Vx = St("Settings", [
    [
      "path",
      {
        d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
        key: "1qme2f"
      }
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "3",
        key: "1v7zrd"
      }
    ]
  ]);
  const Gx = St("Share2", [
    [
      "circle",
      {
        cx: "18",
        cy: "5",
        r: "3",
        key: "gq8acd"
      }
    ],
    [
      "circle",
      {
        cx: "6",
        cy: "12",
        r: "3",
        key: "w7nqdw"
      }
    ],
    [
      "circle",
      {
        cx: "18",
        cy: "19",
        r: "3",
        key: "1xt0gg"
      }
    ],
    [
      "line",
      {
        x1: "8.59",
        x2: "15.42",
        y1: "13.51",
        y2: "17.49",
        key: "47mynk"
      }
    ],
    [
      "line",
      {
        x1: "15.41",
        x2: "8.59",
        y1: "6.51",
        y2: "10.49",
        key: "1n3mei"
      }
    ]
  ]);
  const Kx = St("Sun", [
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
  const Yx = St("UserPlus", [
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
  const Qx = St("X", [
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
  ]), Xx = "modulepreload", qx = function(n, o) {
    return new URL(n, o).href;
  }, hp = {}, Jx = function(o, l, a) {
    let u = Promise.resolve();
    if (l && l.length > 0) {
      const f = document.getElementsByTagName("link"), p = document.querySelector("meta[property=csp-nonce]"), v = (p == null ? void 0 : p.nonce) || (p == null ? void 0 : p.getAttribute("nonce"));
      u = Promise.allSettled(l.map((y) => {
        if (y = qx(y, a), y in hp) return;
        hp[y] = true;
        const w = y.endsWith(".css"), S = w ? '[rel="stylesheet"]' : "";
        if (!!a) for (let A = f.length - 1; A >= 0; A--) {
          const k = f[A];
          if (k.href === y && (!w || k.rel === "stylesheet")) return;
        }
        else if (document.querySelector(`link[href="${y}"]${S}`)) return;
        const b = document.createElement("link");
        if (b.rel = w ? "stylesheet" : Xx, w || (b.as = "script"), b.crossOrigin = "", b.href = y, v && b.setAttribute("nonce", v), document.head.appendChild(b), w) return new Promise((A, k) => {
          b.addEventListener("load", A), b.addEventListener("error", () => k(new Error(`Unable to preload CSS for ${y}`)));
        });
      }));
    }
    function d(f) {
      const p = new Event("vite:preloadError", {
        cancelable: true
      });
      if (p.payload = f, window.dispatchEvent(p), !p.defaultPrevented) throw f;
    }
    return u.then((f) => {
      for (const p of f || []) p.status === "rejected" && d(p.reason);
      return o().catch(d);
    });
  };
  class Zx {
    constructor() {
      __publicField(this, "logs", []);
      __publicField(this, "subscribers", /* @__PURE__ */ new Set());
    }
    error(o, l) {
      console.error(o, l), this.log(`${o} ${l || ""}`, "error");
    }
    info(o) {
      this.log(o);
    }
    log(o, l = "info") {
      const a = {
        timestamp: /* @__PURE__ */ new Date(),
        level: l,
        message: o
      };
      this.logs.push(a), this.notifySubscribers(a);
    }
    get() {
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
  let eS;
  an = new Zx();
  eS = nS();
  async function tS() {
    return await eS;
  }
  async function nS() {
    try {
      an.info("Importing WASM module");
      const { IrohAPI: n } = await Jx(async () => {
        const { IrohAPI: o } = await import("./iroh-UdClqhlc.js").then(async (m) => {
          await m.__tla;
          return m;
        });
        return {
          IrohAPI: o
        };
      }, [], import.meta.url);
      return await n.create();
    } catch (n) {
      throw an.error("Failed to import or launch iroh", n), n;
    }
  }
  Vm = ((n) => (n[n.Myself = 0] = "Myself", n[n.RemoteNode = 1] = "RemoteNode", n))(Vm || {});
  function rS(n) {
    const [o, l] = g.useState(false);
    return g.useEffect(() => {
      function a(d) {
        l(d.matches);
      }
      const u = matchMedia(n);
      return u.addEventListener("change", a), l(u.matches), () => u.removeEventListener("change", a);
    }, [
      n
    ]), o;
  }
  function ci() {
    return rS("(min-width: 768px)");
  }
  var Iu = "Dialog", [Gm, DC] = li(Iu), [oS, qt] = Gm(Iu), Km = (n) => {
    const { __scopeDialog: o, children: l, open: a, defaultOpen: u, onOpenChange: d, modal: f = true } = n, p = g.useRef(null), v = g.useRef(null), [y = false, w] = Zl({
      prop: a,
      defaultProp: u,
      onChange: d
    });
    return h.jsx(oS, {
      scope: o,
      triggerRef: p,
      contentRef: v,
      contentId: Ll(),
      titleId: Ll(),
      descriptionId: Ll(),
      open: y,
      onOpenChange: w,
      onOpenToggle: g.useCallback(() => w((S) => !S), [
        w
      ]),
      modal: f,
      children: l
    });
  };
  Km.displayName = Iu;
  var Ym = "DialogTrigger", Qm = g.forwardRef((n, o) => {
    const { __scopeDialog: l, ...a } = n, u = qt(Ym, l), d = nt(o, u.triggerRef);
    return h.jsx(We.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": u.open,
      "aria-controls": u.contentId,
      "data-state": $u(u.open),
      ...a,
      ref: d,
      onClick: Fe(n.onClick, u.onOpenToggle)
    });
  });
  Qm.displayName = Ym;
  var Wu = "DialogPortal", [iS, Xm] = Gm(Wu, {
    forceMount: void 0
  }), qm = (n) => {
    const { __scopeDialog: o, forceMount: l, children: a, container: u } = n, d = qt(Wu, o);
    return h.jsx(iS, {
      scope: o,
      forceMount: l,
      children: g.Children.map(a, (f) => h.jsx(Xt, {
        present: l || d.open,
        children: h.jsx(Lu, {
          asChild: true,
          container: u,
          children: f
        })
      }))
    });
  };
  qm.displayName = Wu;
  var Kl = "DialogOverlay", Jm = g.forwardRef((n, o) => {
    const l = Xm(Kl, n.__scopeDialog), { forceMount: a = l.forceMount, ...u } = n, d = qt(Kl, n.__scopeDialog);
    return d.modal ? h.jsx(Xt, {
      present: a || d.open,
      children: h.jsx(lS, {
        ...u,
        ref: o
      })
    }) : null;
  });
  Jm.displayName = Kl;
  var lS = g.forwardRef((n, o) => {
    const { __scopeDialog: l, ...a } = n, u = qt(Kl, l);
    return h.jsx(Bu, {
      as: ii,
      allowPinchZoom: true,
      shards: [
        u.contentRef
      ],
      children: h.jsx(We.div, {
        "data-state": $u(u.open),
        ...a,
        ref: o,
        style: {
          pointerEvents: "auto",
          ...a.style
        }
      })
    });
  }), xr = "DialogContent", Zm = g.forwardRef((n, o) => {
    const l = Xm(xr, n.__scopeDialog), { forceMount: a = l.forceMount, ...u } = n, d = qt(xr, n.__scopeDialog);
    return h.jsx(Xt, {
      present: a || d.open,
      children: d.modal ? h.jsx(aS, {
        ...u,
        ref: o
      }) : h.jsx(sS, {
        ...u,
        ref: o
      })
    });
  });
  Zm.displayName = xr;
  var aS = g.forwardRef((n, o) => {
    const l = qt(xr, n.__scopeDialog), a = g.useRef(null), u = nt(o, l.contentRef, a);
    return g.useEffect(() => {
      const d = a.current;
      if (d) return km(d);
    }, []), h.jsx(eh, {
      ...n,
      ref: u,
      trapFocus: l.open,
      disableOutsidePointerEvents: true,
      onCloseAutoFocus: Fe(n.onCloseAutoFocus, (d) => {
        var _a;
        d.preventDefault(), (_a = l.triggerRef.current) == null ? void 0 : _a.focus();
      }),
      onPointerDownOutside: Fe(n.onPointerDownOutside, (d) => {
        const f = d.detail.originalEvent, p = f.button === 0 && f.ctrlKey === true;
        (f.button === 2 || p) && d.preventDefault();
      }),
      onFocusOutside: Fe(n.onFocusOutside, (d) => d.preventDefault())
    });
  }), sS = g.forwardRef((n, o) => {
    const l = qt(xr, n.__scopeDialog), a = g.useRef(false), u = g.useRef(false);
    return h.jsx(eh, {
      ...n,
      ref: o,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      onCloseAutoFocus: (d) => {
        var _a, _b;
        (_a = n.onCloseAutoFocus) == null ? void 0 : _a.call(n, d), d.defaultPrevented || (a.current || ((_b = l.triggerRef.current) == null ? void 0 : _b.focus()), d.preventDefault()), a.current = false, u.current = false;
      },
      onInteractOutside: (d) => {
        var _a, _b;
        (_a = n.onInteractOutside) == null ? void 0 : _a.call(n, d), d.defaultPrevented || (a.current = true, d.detail.originalEvent.type === "pointerdown" && (u.current = true));
        const f = d.target;
        ((_b = l.triggerRef.current) == null ? void 0 : _b.contains(f)) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && u.current && d.preventDefault();
      }
    });
  }), eh = g.forwardRef((n, o) => {
    const { __scopeDialog: l, trapFocus: a, onOpenAutoFocus: u, onCloseAutoFocus: d, ...f } = n, p = qt(xr, l), v = g.useRef(null), y = nt(o, v);
    return qp(), h.jsxs(h.Fragment, {
      children: [
        h.jsx(Pu, {
          asChild: true,
          loop: true,
          trapped: a,
          onMountAutoFocus: u,
          onUnmountAutoFocus: d,
          children: h.jsx(Eu, {
            role: "dialog",
            id: p.contentId,
            "aria-describedby": p.descriptionId,
            "aria-labelledby": p.titleId,
            "data-state": $u(p.open),
            ...f,
            ref: y,
            onDismiss: () => p.onOpenChange(false)
          })
        }),
        h.jsxs(h.Fragment, {
          children: [
            h.jsx(uS, {
              titleId: p.titleId
            }),
            h.jsx(dS, {
              contentRef: v,
              descriptionId: p.descriptionId
            })
          ]
        })
      ]
    });
  }), Hu = "DialogTitle", th = g.forwardRef((n, o) => {
    const { __scopeDialog: l, ...a } = n, u = qt(Hu, l);
    return h.jsx(We.h2, {
      id: u.titleId,
      ...a,
      ref: o
    });
  });
  th.displayName = Hu;
  var nh = "DialogDescription", rh = g.forwardRef((n, o) => {
    const { __scopeDialog: l, ...a } = n, u = qt(nh, l);
    return h.jsx(We.p, {
      id: u.descriptionId,
      ...a,
      ref: o
    });
  });
  rh.displayName = nh;
  var oh = "DialogClose", ih = g.forwardRef((n, o) => {
    const { __scopeDialog: l, ...a } = n, u = qt(oh, l);
    return h.jsx(We.button, {
      type: "button",
      ...a,
      ref: o,
      onClick: Fe(n.onClick, () => u.onOpenChange(false))
    });
  });
  ih.displayName = oh;
  function $u(n) {
    return n ? "open" : "closed";
  }
  var lh = "DialogTitleWarning", [OC, ah] = Vy(lh, {
    contentName: xr,
    titleName: Hu,
    docsSlug: "dialog"
  }), uS = ({ titleId: n }) => {
    const o = ah(lh), l = `\`${o.contentName}\` requires a \`${o.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${o.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${o.docsSlug}`;
    return g.useEffect(() => {
      n && (document.getElementById(n) || console.error(l));
    }, [
      l,
      n
    ]), null;
  }, cS = "DialogDescriptionWarning", dS = ({ contentRef: n, descriptionId: o }) => {
    const a = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${ah(cS).contentName}}.`;
    return g.useEffect(() => {
      var _a;
      const u = (_a = n.current) == null ? void 0 : _a.getAttribute("aria-describedby");
      o && u && (document.getElementById(o) || console.warn(a));
    }, [
      a,
      n,
      o
    ]), null;
  }, sh = Km, uh = Qm, ch = qm, Uu = Jm, Vu = Zm, Gu = th, Ku = rh, dh = ih;
  const fS = sh, pS = uh, mS = ch, fh = g.forwardRef(({ className: n, ...o }, l) => h.jsx(Uu, {
    ref: l,
    className: qe("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", n),
    ...o
  }));
  fh.displayName = Uu.displayName;
  const ph = g.forwardRef(({ className: n, children: o, ...l }, a) => h.jsxs(mS, {
    children: [
      h.jsx(fh, {}),
      h.jsxs(Vu, {
        ref: a,
        className: qe("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", n),
        ...l,
        children: [
          o,
          h.jsxs(dh, {
            className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
            children: [
              h.jsx(Qx, {
                className: "h-4 w-4"
              }),
              h.jsx("span", {
                className: "sr-only",
                children: "Close"
              })
            ]
          })
        ]
      })
    ]
  }));
  ph.displayName = Vu.displayName;
  const mh = ({ className: n, ...o }) => h.jsx("div", {
    className: qe("flex flex-col space-y-1.5 text-center sm:text-left", n),
    ...o
  });
  mh.displayName = "DialogHeader";
  const hh = g.forwardRef(({ className: n, ...o }, l) => h.jsx(Gu, {
    ref: l,
    className: qe("text-lg font-semibold leading-none tracking-tight", n),
    ...o
  }));
  hh.displayName = Gu.displayName;
  const gh = g.forwardRef(({ className: n, ...o }, l) => h.jsx(Ku, {
    ref: l,
    className: qe("text-sm text-muted-foreground", n),
    ...o
  }));
  gh.displayName = Ku.displayName;
  function hS(n) {
    if (typeof document > "u") return;
    let o = document.head || document.getElementsByTagName("head")[0], l = document.createElement("style");
    l.type = "text/css", o.appendChild(l), l.styleSheet ? l.styleSheet.cssText = n : l.appendChild(document.createTextNode(n));
  }
  const vh = J.createContext({
    drawerRef: {
      current: null
    },
    overlayRef: {
      current: null
    },
    onPress: () => {
    },
    onRelease: () => {
    },
    onDrag: () => {
    },
    onNestedDrag: () => {
    },
    onNestedOpenChange: () => {
    },
    onNestedRelease: () => {
    },
    openProp: void 0,
    dismissible: false,
    isOpen: false,
    isDragging: false,
    keyboardIsOpen: {
      current: false
    },
    snapPointsOffset: null,
    snapPoints: null,
    handleOnly: false,
    modal: false,
    shouldFade: false,
    activeSnapPoint: null,
    onOpenChange: () => {
    },
    setActiveSnapPoint: () => {
    },
    closeDrawer: () => {
    },
    direction: "bottom",
    shouldAnimate: {
      current: true
    },
    shouldScaleBackground: false,
    setBackgroundColorOnScale: true,
    noBodyStyles: false,
    container: null,
    autoFocus: false
  }), di = () => {
    const n = J.useContext(vh);
    if (!n) throw new Error("useDrawerContext must be used within a Drawer.Root");
    return n;
  };
  hS(`[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32, .72, 0, 1);animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--initial-transform,100%),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--initial-transform,100%),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-animate=false]{animation:none!important}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32, .72, 0, 1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true])::after{content:'';position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]::after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]::after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]::after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]::after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not(
[data-state=closed]
){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:active,[data-vaul-handle]:hover{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover:hover) and (pointer:fine){[data-vaul-drawer]{user-select:none}}@media (pointer:fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{from{transform:translate3d(0,var(--initial-transform,100%),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToBottom{to{transform:translate3d(0,var(--initial-transform,100%),0)}}@keyframes slideFromTop{from{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToTop{to{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}}@keyframes slideFromLeft{from{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToLeft{to{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}}@keyframes slideFromRight{from{transform:translate3d(var(--initial-transform,100%),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToRight{to{transform:translate3d(var(--initial-transform,100%),0,0)}}`);
  function gS() {
    const n = navigator.userAgent;
    return typeof window < "u" && (/Firefox/.test(n) && /Mobile/.test(n) || /FxiOS/.test(n));
  }
  function vS() {
    return Yu(/^Mac/);
  }
  function yS() {
    return Yu(/^iPhone/);
  }
  function gp() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }
  function wS() {
    return Yu(/^iPad/) || vS() && navigator.maxTouchPoints > 1;
  }
  function yh() {
    return yS() || wS();
  }
  function Yu(n) {
    return typeof window < "u" && window.navigator != null ? n.test(window.navigator.platform) : void 0;
  }
  const xS = 24, SS = typeof window < "u" ? g.useLayoutEffect : g.useEffect;
  function vp(...n) {
    return (...o) => {
      for (let l of n) typeof l == "function" && l(...o);
    };
  }
  const ou = typeof document < "u" && window.visualViewport;
  function yp(n) {
    let o = window.getComputedStyle(n);
    return /(auto|scroll)/.test(o.overflow + o.overflowX + o.overflowY);
  }
  function wh(n) {
    for (yp(n) && (n = n.parentElement); n && !yp(n); ) n = n.parentElement;
    return n || document.scrollingElement || document.documentElement;
  }
  const CS = /* @__PURE__ */ new Set([
    "checkbox",
    "radio",
    "range",
    "color",
    "file",
    "image",
    "button",
    "submit",
    "reset"
  ]);
  let Ol = 0, iu;
  function kS(n = {}) {
    let { isDisabled: o } = n;
    SS(() => {
      if (!o) return Ol++, Ol === 1 && yh() && (iu = bS()), () => {
        Ol--, Ol === 0 && (iu == null ? void 0 : iu());
      };
    }, [
      o
    ]);
  }
  function bS() {
    let n, o = 0, l = (S) => {
      n = wh(S.target), !(n === document.documentElement && n === document.body) && (o = S.changedTouches[0].pageY);
    }, a = (S) => {
      if (!n || n === document.documentElement || n === document.body) {
        S.preventDefault();
        return;
      }
      let x = S.changedTouches[0].pageY, b = n.scrollTop, A = n.scrollHeight - n.clientHeight;
      A !== 0 && ((b <= 0 && x > o || b >= A && x < o) && S.preventDefault(), o = x);
    }, u = (S) => {
      let x = S.target;
      gu(x) && x !== document.activeElement && (S.preventDefault(), x.style.transform = "translateY(-2000px)", x.focus(), requestAnimationFrame(() => {
        x.style.transform = "";
      }));
    }, d = (S) => {
      let x = S.target;
      gu(x) && (x.style.transform = "translateY(-2000px)", requestAnimationFrame(() => {
        x.style.transform = "", ou && (ou.height < window.innerHeight ? requestAnimationFrame(() => {
          wp(x);
        }) : ou.addEventListener("resize", () => wp(x), {
          once: true
        }));
      }));
    }, f = () => {
      window.scrollTo(0, 0);
    }, p = window.pageXOffset, v = window.pageYOffset, y = vp(ES(document.documentElement, "paddingRight", `${window.innerWidth - document.documentElement.clientWidth}px`));
    window.scrollTo(0, 0);
    let w = vp(Zo(document, "touchstart", l, {
      passive: false,
      capture: true
    }), Zo(document, "touchmove", a, {
      passive: false,
      capture: true
    }), Zo(document, "touchend", u, {
      passive: false,
      capture: true
    }), Zo(document, "focus", d, true), Zo(window, "scroll", f));
    return () => {
      y(), w(), window.scrollTo(p, v);
    };
  }
  function ES(n, o, l) {
    let a = n.style[o];
    return n.style[o] = l, () => {
      n.style[o] = a;
    };
  }
  function Zo(n, o, l, a) {
    return n.addEventListener(o, l, a), () => {
      n.removeEventListener(o, l, a);
    };
  }
  function wp(n) {
    let o = document.scrollingElement || document.documentElement;
    for (; n && n !== o; ) {
      let l = wh(n);
      if (l !== document.documentElement && l !== document.body && l !== n) {
        let a = l.getBoundingClientRect().top, u = n.getBoundingClientRect().top, d = n.getBoundingClientRect().bottom;
        const f = l.getBoundingClientRect().bottom + xS;
        d > f && (l.scrollTop += u - a);
      }
      n = l.parentElement;
    }
  }
  function gu(n) {
    return n instanceof HTMLInputElement && !CS.has(n.type) || n instanceof HTMLTextAreaElement || n instanceof HTMLElement && n.isContentEditable;
  }
  function PS(n, o) {
    typeof n == "function" ? n(o) : n != null && (n.current = o);
  }
  function RS(...n) {
    return (o) => n.forEach((l) => PS(l, o));
  }
  function xh(...n) {
    return g.useCallback(RS(...n), n);
  }
  const Sh = /* @__PURE__ */ new WeakMap();
  function Xe(n, o, l = false) {
    if (!n || !(n instanceof HTMLElement)) return;
    let a = {};
    Object.entries(o).forEach(([u, d]) => {
      if (u.startsWith("--")) {
        n.style.setProperty(u, d);
        return;
      }
      a[u] = n.style[u], n.style[u] = d;
    }), !l && Sh.set(n, a);
  }
  function TS(n, o) {
    if (!n || !(n instanceof HTMLElement)) return;
    let l = Sh.get(n);
    l && (n.style[o] = l[o]);
  }
  const Ve = (n) => {
    switch (n) {
      case "top":
      case "bottom":
        return true;
      case "left":
      case "right":
        return false;
      default:
        return n;
    }
  };
  function jl(n, o) {
    if (!n) return null;
    const l = window.getComputedStyle(n), a = l.transform || l.webkitTransform || l.mozTransform;
    let u = a.match(/^matrix3d\((.+)\)$/);
    return u ? parseFloat(u[1].split(", ")[Ve(o) ? 13 : 12]) : (u = a.match(/^matrix\((.+)\)$/), u ? parseFloat(u[1].split(", ")[Ve(o) ? 5 : 4]) : null);
  }
  function NS(n) {
    return 8 * (Math.log(n + 1) - 2);
  }
  function lu(n, o) {
    if (!n) return () => {
    };
    const l = n.style.cssText;
    return Object.assign(n.style, o), () => {
      n.style.cssText = l;
    };
  }
  function MS(...n) {
    return (...o) => {
      for (const l of n) typeof l == "function" && l(...o);
    };
  }
  const ze = {
    DURATION: 0.5,
    EASE: [
      0.32,
      0.72,
      0,
      1
    ]
  }, Ch = 0.4, AS = 0.25, DS = 100, kh = 8, _l = 16, vu = 26, au = "vaul-dragging";
  function bh(n) {
    const o = J.useRef(n);
    return J.useEffect(() => {
      o.current = n;
    }), J.useMemo(() => (...l) => o.current == null ? void 0 : o.current.call(o, ...l), []);
  }
  function OS({ defaultProp: n, onChange: o }) {
    const l = J.useState(n), [a] = l, u = J.useRef(a), d = bh(o);
    return J.useEffect(() => {
      u.current !== a && (d(a), u.current = a);
    }, [
      a,
      u,
      d
    ]), l;
  }
  function Eh({ prop: n, defaultProp: o, onChange: l = () => {
  } }) {
    const [a, u] = OS({
      defaultProp: o,
      onChange: l
    }), d = n !== void 0, f = d ? n : a, p = bh(l), v = J.useCallback((y) => {
      if (d) {
        const S = typeof y == "function" ? y(n) : y;
        S !== n && p(S);
      } else u(y);
    }, [
      d,
      n,
      u,
      p
    ]);
    return [
      f,
      v
    ];
  }
  function jS({ activeSnapPointProp: n, setActiveSnapPointProp: o, snapPoints: l, drawerRef: a, overlayRef: u, fadeFromIndex: d, onSnapPointChange: f, direction: p = "bottom", container: v, snapToSequentialPoint: y }) {
    const [w, S] = Eh({
      prop: n,
      defaultProp: l == null ? void 0 : l[0],
      onChange: o
    }), [x, b] = J.useState(typeof window < "u" ? {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    } : void 0);
    J.useEffect(() => {
      function _() {
        b({
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight
        });
      }
      return window.addEventListener("resize", _), () => window.removeEventListener("resize", _);
    }, []);
    const A = J.useMemo(() => w === (l == null ? void 0 : l[l.length - 1]) || null, [
      l,
      w
    ]), k = J.useMemo(() => {
      var _;
      return (_ = l == null ? void 0 : l.findIndex((Y) => Y === w)) != null ? _ : null;
    }, [
      l,
      w
    ]), P = l && l.length > 0 && (d || d === 0) && !Number.isNaN(d) && l[d] === w || !l, N = J.useMemo(() => {
      const _ = v ? {
        width: v.getBoundingClientRect().width,
        height: v.getBoundingClientRect().height
      } : typeof window < "u" ? {
        width: window.innerWidth,
        height: window.innerHeight
      } : {
        width: 0,
        height: 0
      };
      var Y;
      return (Y = l == null ? void 0 : l.map((U) => {
        const ee = typeof U == "string";
        let le = 0;
        if (ee && (le = parseInt(U, 10)), Ve(p)) {
          const Q = ee ? le : x ? U * _.height : 0;
          return x ? p === "bottom" ? _.height - Q : -_.height + Q : Q;
        }
        const Z = ee ? le : x ? U * _.width : 0;
        return x ? p === "right" ? _.width - Z : -_.width + Z : Z;
      })) != null ? Y : [];
    }, [
      l,
      x,
      v
    ]), L = J.useMemo(() => k !== null ? N == null ? void 0 : N[k] : null, [
      N,
      k
    ]), z = J.useCallback((_) => {
      var Y;
      const U = (Y = N == null ? void 0 : N.findIndex((ee) => ee === _)) != null ? Y : null;
      f(U), Xe(a.current, {
        transition: `transform ${ze.DURATION}s cubic-bezier(${ze.EASE.join(",")})`,
        transform: Ve(p) ? `translate3d(0, ${_}px, 0)` : `translate3d(${_}px, 0, 0)`
      }), N && U !== N.length - 1 && d !== void 0 && U !== d && U < d ? Xe(u.current, {
        transition: `opacity ${ze.DURATION}s cubic-bezier(${ze.EASE.join(",")})`,
        opacity: "0"
      }) : Xe(u.current, {
        transition: `opacity ${ze.DURATION}s cubic-bezier(${ze.EASE.join(",")})`,
        opacity: "1"
      }), S(l == null ? void 0 : l[Math.max(U, 0)]);
    }, [
      a.current,
      l,
      N,
      d,
      u,
      S
    ]);
    J.useEffect(() => {
      if (w || n) {
        var _;
        const Y = (_ = l == null ? void 0 : l.findIndex((U) => U === n || U === w)) != null ? _ : -1;
        N && Y !== -1 && typeof N[Y] == "number" && z(N[Y]);
      }
    }, [
      w,
      n,
      l,
      N,
      z
    ]);
    function O({ draggedDistance: _, closeDrawer: Y, velocity: U, dismissible: ee }) {
      if (d === void 0) return;
      const le = p === "bottom" || p === "right" ? (L ?? 0) - _ : (L ?? 0) + _, Z = k === d - 1, Q = k === 0, ae = _ > 0;
      if (Z && Xe(u.current, {
        transition: `opacity ${ze.DURATION}s cubic-bezier(${ze.EASE.join(",")})`
      }), !y && U > 2 && !ae) {
        ee ? Y() : z(N[0]);
        return;
      }
      if (!y && U > 2 && ae && N && l) {
        z(N[l.length - 1]);
        return;
      }
      const ge = N == null ? void 0 : N.reduce((oe, B) => typeof oe != "number" || typeof B != "number" ? oe : Math.abs(B - le) < Math.abs(oe - le) ? B : oe), se = Ve(p) ? window.innerHeight : window.innerWidth;
      if (U > Ch && Math.abs(_) < se * 0.4) {
        const oe = ae ? 1 : -1;
        if (oe > 0 && A && l) {
          z(N[l.length - 1]);
          return;
        }
        if (Q && oe < 0 && ee && Y(), k === null) return;
        z(N[k + oe]);
        return;
      }
      z(ge);
    }
    function F({ draggedDistance: _ }) {
      if (L === null) return;
      const Y = p === "bottom" || p === "right" ? L - _ : L + _;
      (p === "bottom" || p === "right") && Y < N[N.length - 1] || (p === "top" || p === "left") && Y > N[N.length - 1] || Xe(a.current, {
        transform: Ve(p) ? `translate3d(0, ${Y}px, 0)` : `translate3d(${Y}px, 0, 0)`
      });
    }
    function G(_, Y) {
      if (!l || typeof k != "number" || !N || d === void 0) return null;
      const U = k === d - 1;
      if (k >= d && Y) return 0;
      if (U && !Y) return 1;
      if (!P && !U) return null;
      const le = U ? k + 1 : k - 1, Z = U ? N[le] - N[le - 1] : N[le + 1] - N[le], Q = _ / Math.abs(Z);
      return U ? 1 - Q : Q;
    }
    return {
      isLastSnapPoint: A,
      activeSnapPoint: w,
      shouldFade: P,
      getPercentageDragged: G,
      setActiveSnapPoint: S,
      activeSnapPointIndex: k,
      onRelease: O,
      onDrag: F,
      snapPointsOffset: N
    };
  }
  const _S = () => () => {
  };
  function LS() {
    const { direction: n, isOpen: o, shouldScaleBackground: l, setBackgroundColorOnScale: a, noBodyStyles: u } = di(), d = J.useRef(null), f = g.useMemo(() => document.body.style.backgroundColor, []);
    function p() {
      return (window.innerWidth - vu) / window.innerWidth;
    }
    J.useEffect(() => {
      if (o && l) {
        d.current && clearTimeout(d.current);
        const v = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]");
        if (!v) return;
        MS(a && !u ? lu(document.body, {
          background: "black"
        }) : _S, lu(v, {
          transformOrigin: Ve(n) ? "top" : "left",
          transitionProperty: "transform, border-radius",
          transitionDuration: `${ze.DURATION}s`,
          transitionTimingFunction: `cubic-bezier(${ze.EASE.join(",")})`
        }));
        const y = lu(v, {
          borderRadius: `${kh}px`,
          overflow: "hidden",
          ...Ve(n) ? {
            transform: `scale(${p()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`
          } : {
            transform: `scale(${p()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`
          }
        });
        return () => {
          y(), d.current = window.setTimeout(() => {
            f ? document.body.style.background = f : document.body.style.removeProperty("background");
          }, ze.DURATION * 1e3);
        };
      }
    }, [
      o,
      l,
      f
    ]);
  }
  let ei = null;
  function BS({ isOpen: n, modal: o, nested: l, hasBeenOpened: a, preventScrollRestoration: u, noBodyStyles: d }) {
    const [f, p] = J.useState(() => typeof window < "u" ? window.location.href : ""), v = J.useRef(0), y = J.useCallback(() => {
      if (gp() && ei === null && n && !d) {
        ei = {
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left,
          height: document.body.style.height,
          right: "unset"
        };
        const { scrollX: S, innerHeight: x } = window;
        document.body.style.setProperty("position", "fixed", "important"), Object.assign(document.body.style, {
          top: `${-v.current}px`,
          left: `${-S}px`,
          right: "0px",
          height: "auto"
        }), window.setTimeout(() => window.requestAnimationFrame(() => {
          const b = x - window.innerHeight;
          b && v.current >= x && (document.body.style.top = `${-(v.current + b)}px`);
        }), 300);
      }
    }, [
      n
    ]), w = J.useCallback(() => {
      if (gp() && ei !== null && !d) {
        const S = -parseInt(document.body.style.top, 10), x = -parseInt(document.body.style.left, 10);
        Object.assign(document.body.style, ei), window.requestAnimationFrame(() => {
          if (u && f !== window.location.href) {
            p(window.location.href);
            return;
          }
          window.scrollTo(x, S);
        }), ei = null;
      }
    }, [
      f
    ]);
    return J.useEffect(() => {
      function S() {
        v.current = window.scrollY;
      }
      return S(), window.addEventListener("scroll", S), () => {
        window.removeEventListener("scroll", S);
      };
    }, []), J.useEffect(() => {
      if (o) return () => {
        typeof document > "u" || document.querySelector("[data-vaul-drawer]") || w();
      };
    }, [
      o,
      w
    ]), J.useEffect(() => {
      l || !a || (n ? (!window.matchMedia("(display-mode: standalone)").matches && y(), o || window.setTimeout(() => {
        w();
      }, 500)) : w());
    }, [
      n,
      a,
      f,
      o,
      l,
      y,
      w
    ]), {
      restorePositionSetting: w
    };
  }
  function zS({ open: n, onOpenChange: o, children: l, onDrag: a, onRelease: u, snapPoints: d, shouldScaleBackground: f = false, setBackgroundColorOnScale: p = true, closeThreshold: v = AS, scrollLockTimeout: y = DS, dismissible: w = true, handleOnly: S = false, fadeFromIndex: x = d && d.length - 1, activeSnapPoint: b, setActiveSnapPoint: A, fixed: k, modal: P = true, onClose: N, nested: L, noBodyStyles: z = false, direction: O = "bottom", defaultOpen: F = false, disablePreventScroll: G = true, snapToSequentialPoint: _ = false, preventScrollRestoration: Y = false, repositionInputs: U = true, onAnimationEnd: ee, container: le, autoFocus: Z = false }) {
    var Q, ae;
    const [ge = false, se] = Eh({
      defaultProp: F,
      prop: n,
      onChange: (de) => {
        o == null ? void 0 : o(de), !de && !L && co(), setTimeout(() => {
          ee == null ? void 0 : ee(de);
        }, ze.DURATION * 1e3), de && !P && typeof window < "u" && window.requestAnimationFrame(() => {
          document.body.style.pointerEvents = "auto";
        }), de || (document.body.style.pointerEvents = "auto");
      }
    }), [oe, B] = J.useState(false), [X, K] = J.useState(false), [T, I] = J.useState(false), fe = J.useRef(null), me = J.useRef(null), we = J.useRef(null), xe = J.useRef(null), Se = J.useRef(null), Ce = J.useRef(false), Te = J.useRef(null), Ke = J.useRef(0), Ct = J.useRef(false), nr = J.useRef(!F), Nt = J.useRef(0), he = J.useRef(null), io = J.useRef(((Q = he.current) == null ? void 0 : Q.getBoundingClientRect().height) || 0), lo = J.useRef(((ae = he.current) == null ? void 0 : ae.getBoundingClientRect().width) || 0), rr = J.useRef(0), fi = J.useCallback((de) => {
      d && de === bn.length - 1 && (me.current = /* @__PURE__ */ new Date());
    }, []), { activeSnapPoint: ao, activeSnapPointIndex: Mt, setActiveSnapPoint: dn, onRelease: so, snapPointsOffset: bn, onDrag: pi, shouldFade: uo, getPercentageDragged: mi } = jS({
      snapPoints: d,
      activeSnapPointProp: b,
      setActiveSnapPointProp: A,
      drawerRef: he,
      fadeFromIndex: x,
      overlayRef: fe,
      onSnapPointChange: fi,
      direction: O,
      container: le,
      snapToSequentialPoint: _
    });
    kS({
      isDisabled: !ge || X || !P || T || !oe || !U || !G
    });
    const { restorePositionSetting: co } = BS({
      isOpen: ge,
      modal: P,
      nested: L ?? false,
      hasBeenOpened: oe,
      preventScrollRestoration: Y,
      noBodyStyles: z
    });
    function fn() {
      return (window.innerWidth - vu) / window.innerWidth;
    }
    function hi(de) {
      var be, Ee;
      !w && !d || he.current && !he.current.contains(de.target) || (io.current = ((be = he.current) == null ? void 0 : be.getBoundingClientRect().height) || 0, lo.current = ((Ee = he.current) == null ? void 0 : Ee.getBoundingClientRect().width) || 0, K(true), we.current = /* @__PURE__ */ new Date(), yh() && window.addEventListener("touchend", () => Ce.current = false, {
        once: true
      }), de.target.setPointerCapture(de.pointerId), Ke.current = Ve(O) ? de.pageY : de.pageX);
    }
    function En(de, be) {
      var Ee;
      let ye = de;
      const je = (Ee = window.getSelection()) == null ? void 0 : Ee.toString(), rt = he.current ? jl(he.current, O) : null, Je = /* @__PURE__ */ new Date();
      if (ye.tagName === "SELECT" || ye.hasAttribute("data-vaul-no-drag") || ye.closest("[data-vaul-no-drag]")) return false;
      if (O === "right" || O === "left") return true;
      if (me.current && Je.getTime() - me.current.getTime() < 500) return false;
      if (rt !== null && (O === "bottom" ? rt > 0 : rt < 0)) return true;
      if (je && je.length > 0) return false;
      if (Se.current && Je.getTime() - Se.current.getTime() < y && rt === 0 || be) return Se.current = Je, false;
      for (; ye; ) {
        if (ye.scrollHeight > ye.clientHeight) {
          if (ye.scrollTop !== 0) return Se.current = /* @__PURE__ */ new Date(), false;
          if (ye.getAttribute("role") === "dialog") return true;
        }
        ye = ye.parentNode;
      }
      return true;
    }
    function or(de) {
      if (he.current && X) {
        const be = O === "bottom" || O === "right" ? 1 : -1, Ee = (Ke.current - (Ve(O) ? de.pageY : de.pageX)) * be, ye = Ee > 0, je = d && !w && !ye;
        if (je && Mt === 0) return;
        const rt = Math.abs(Ee), Je = document.querySelector("[data-vaul-drawer-wrapper]"), zt = O === "bottom" || O === "top" ? io.current : lo.current;
        let mt = rt / zt;
        const Ft = mi(rt, ye);
        if (Ft !== null && (mt = Ft), je && mt >= 1 || !Ce.current && !En(de.target, ye)) return;
        if (he.current.classList.add(au), Ce.current = true, Xe(he.current, {
          transition: "none"
        }), Xe(fe.current, {
          transition: "none"
        }), d && pi({
          draggedDistance: Ee
        }), ye && !d) {
          const lt = NS(Ee), Pn = Math.min(lt * -1, 0) * be;
          Xe(he.current, {
            transform: Ve(O) ? `translate3d(0, ${Pn}px, 0)` : `translate3d(${Pn}px, 0, 0)`
          });
          return;
        }
        const It = 1 - mt;
        if ((uo || x && Mt === x - 1) && (a == null ? void 0 : a(de, mt), Xe(fe.current, {
          opacity: `${It}`,
          transition: "none"
        }, true)), Je && fe.current && f) {
          const lt = Math.min(fn() + mt * (1 - fn()), 1), Pn = 8 - mt * 8, Rn = Math.max(0, 14 - mt * 14);
          Xe(Je, {
            borderRadius: `${Pn}px`,
            transform: Ve(O) ? `scale(${lt}) translate3d(0, ${Rn}px, 0)` : `scale(${lt}) translate3d(${Rn}px, 0, 0)`,
            transition: "none"
          }, true);
        }
        if (!d) {
          const lt = rt * be;
          Xe(he.current, {
            transform: Ve(O) ? `translate3d(0, ${lt}px, 0)` : `translate3d(${lt}px, 0, 0)`
          });
        }
      }
    }
    J.useEffect(() => {
      window.requestAnimationFrame(() => {
        nr.current = true;
      });
    }, []), J.useEffect(() => {
      var de;
      function be() {
        if (!he.current || !U) return;
        const Ee = document.activeElement;
        if (gu(Ee) || Ct.current) {
          var ye;
          const je = ((ye = window.visualViewport) == null ? void 0 : ye.height) || 0, rt = window.innerHeight;
          let Je = rt - je;
          const zt = he.current.getBoundingClientRect().height || 0, mt = zt > rt * 0.8;
          rr.current || (rr.current = zt);
          const Ft = he.current.getBoundingClientRect().top;
          if (Math.abs(Nt.current - Je) > 60 && (Ct.current = !Ct.current), d && d.length > 0 && bn && Mt) {
            const It = bn[Mt] || 0;
            Je += It;
          }
          if (Nt.current = Je, zt > je || Ct.current) {
            const It = he.current.getBoundingClientRect().height;
            let lt = It;
            It > je && (lt = je - (mt ? Ft : vu)), k ? he.current.style.height = `${It - Math.max(Je, 0)}px` : he.current.style.height = `${Math.max(lt, je - Ft)}px`;
          } else gS() || (he.current.style.height = `${rr.current}px`);
          d && d.length > 0 && !Ct.current ? he.current.style.bottom = "0px" : he.current.style.bottom = `${Math.max(Je, 0)}px`;
        }
      }
      return (de = window.visualViewport) == null || de.addEventListener("resize", be), () => {
        var Ee;
        return (Ee = window.visualViewport) == null ? void 0 : Ee.removeEventListener("resize", be);
      };
    }, [
      Mt,
      d,
      bn
    ]);
    function ir(de) {
      gi(), N == null ? void 0 : N(), de || se(false), setTimeout(() => {
        d && dn(d[0]);
      }, ze.DURATION * 1e3);
    }
    function fo() {
      if (!he.current) return;
      const de = document.querySelector("[data-vaul-drawer-wrapper]"), be = jl(he.current, O);
      Xe(he.current, {
        transform: "translate3d(0, 0, 0)",
        transition: `transform ${ze.DURATION}s cubic-bezier(${ze.EASE.join(",")})`
      }), Xe(fe.current, {
        transition: `opacity ${ze.DURATION}s cubic-bezier(${ze.EASE.join(",")})`,
        opacity: "1"
      }), f && be && be > 0 && ge && Xe(de, {
        borderRadius: `${kh}px`,
        overflow: "hidden",
        ...Ve(O) ? {
          transform: `scale(${fn()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
          transformOrigin: "top"
        } : {
          transform: `scale(${fn()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
          transformOrigin: "left"
        },
        transitionProperty: "transform, border-radius",
        transitionDuration: `${ze.DURATION}s`,
        transitionTimingFunction: `cubic-bezier(${ze.EASE.join(",")})`
      }, true);
    }
    function gi() {
      !X || !he.current || (he.current.classList.remove(au), Ce.current = false, K(false), xe.current = /* @__PURE__ */ new Date());
    }
    function la(de) {
      if (!X || !he.current) return;
      he.current.classList.remove(au), Ce.current = false, K(false), xe.current = /* @__PURE__ */ new Date();
      const be = jl(he.current, O);
      if (!de || !En(de.target, false) || !be || Number.isNaN(be) || we.current === null) return;
      const Ee = xe.current.getTime() - we.current.getTime(), ye = Ke.current - (Ve(O) ? de.pageY : de.pageX), je = Math.abs(ye) / Ee;
      if (je > 0.05 && (I(true), setTimeout(() => {
        I(false);
      }, 200)), d) {
        so({
          draggedDistance: ye * (O === "bottom" || O === "right" ? 1 : -1),
          closeDrawer: ir,
          velocity: je,
          dismissible: w
        }), u == null ? void 0 : u(de, true);
        return;
      }
      if (O === "bottom" || O === "right" ? ye > 0 : ye < 0) {
        fo(), u == null ? void 0 : u(de, true);
        return;
      }
      if (je > Ch) {
        ir(), u == null ? void 0 : u(de, false);
        return;
      }
      var rt;
      const Je = Math.min((rt = he.current.getBoundingClientRect().height) != null ? rt : 0, window.innerHeight);
      var zt;
      const mt = Math.min((zt = he.current.getBoundingClientRect().width) != null ? zt : 0, window.innerWidth), Ft = O === "left" || O === "right";
      if (Math.abs(be) >= (Ft ? mt : Je) * v) {
        ir(), u == null ? void 0 : u(de, false);
        return;
      }
      u == null ? void 0 : u(de, true), fo();
    }
    J.useEffect(() => (ge && (Xe(document.documentElement, {
      scrollBehavior: "auto"
    }), me.current = /* @__PURE__ */ new Date()), () => {
      TS(document.documentElement, "scrollBehavior");
    }), [
      ge
    ]);
    function po(de) {
      const be = de ? (window.innerWidth - _l) / window.innerWidth : 1, Ee = de ? -16 : 0;
      Te.current && window.clearTimeout(Te.current), Xe(he.current, {
        transition: `transform ${ze.DURATION}s cubic-bezier(${ze.EASE.join(",")})`,
        transform: Ve(O) ? `scale(${be}) translate3d(0, ${Ee}px, 0)` : `scale(${be}) translate3d(${Ee}px, 0, 0)`
      }), !de && he.current && (Te.current = setTimeout(() => {
        const ye = jl(he.current, O);
        Xe(he.current, {
          transition: "none",
          transform: Ve(O) ? `translate3d(0, ${ye}px, 0)` : `translate3d(${ye}px, 0, 0)`
        });
      }, 500));
    }
    function mo(de, be) {
      if (be < 0) return;
      const Ee = (window.innerWidth - _l) / window.innerWidth, ye = Ee + be * (1 - Ee), je = -16 + be * _l;
      Xe(he.current, {
        transform: Ve(O) ? `scale(${ye}) translate3d(0, ${je}px, 0)` : `scale(${ye}) translate3d(${je}px, 0, 0)`,
        transition: "none"
      });
    }
    function ho(de, be) {
      const Ee = Ve(O) ? window.innerHeight : window.innerWidth, ye = be ? (Ee - _l) / Ee : 1, je = be ? -16 : 0;
      be && Xe(he.current, {
        transition: `transform ${ze.DURATION}s cubic-bezier(${ze.EASE.join(",")})`,
        transform: Ve(O) ? `scale(${ye}) translate3d(0, ${je}px, 0)` : `scale(${ye}) translate3d(${je}px, 0, 0)`
      });
    }
    return J.useEffect(() => {
      P || window.requestAnimationFrame(() => {
        document.body.style.pointerEvents = "auto";
      });
    }, [
      P
    ]), J.createElement(sh, {
      defaultOpen: F,
      onOpenChange: (de) => {
        !w && !de || (de ? B(true) : ir(true), se(de));
      },
      open: ge
    }, J.createElement(vh.Provider, {
      value: {
        activeSnapPoint: ao,
        snapPoints: d,
        setActiveSnapPoint: dn,
        drawerRef: he,
        overlayRef: fe,
        onOpenChange: o,
        onPress: hi,
        onRelease: la,
        onDrag: or,
        dismissible: w,
        shouldAnimate: nr,
        handleOnly: S,
        isOpen: ge,
        isDragging: X,
        shouldFade: uo,
        closeDrawer: ir,
        onNestedDrag: mo,
        onNestedOpenChange: po,
        onNestedRelease: ho,
        keyboardIsOpen: Ct,
        modal: P,
        snapPointsOffset: bn,
        activeSnapPointIndex: Mt,
        direction: O,
        shouldScaleBackground: f,
        setBackgroundColorOnScale: p,
        noBodyStyles: z,
        container: le,
        autoFocus: Z
      }
    }, l));
  }
  const Ph = J.forwardRef(function({ ...n }, o) {
    const { overlayRef: l, snapPoints: a, onRelease: u, shouldFade: d, isOpen: f, modal: p, shouldAnimate: v } = di(), y = xh(o, l), w = a && a.length > 0;
    if (!p) return null;
    const S = J.useCallback((x) => u(x), [
      u
    ]);
    return J.createElement(Uu, {
      onMouseUp: S,
      ref: y,
      "data-vaul-overlay": "",
      "data-vaul-snap-points": f && w ? "true" : "false",
      "data-vaul-snap-points-overlay": f && d ? "true" : "false",
      "data-vaul-animate": (v == null ? void 0 : v.current) ? "true" : "false",
      ...n
    });
  });
  Ph.displayName = "Drawer.Overlay";
  const Rh = J.forwardRef(function({ onPointerDownOutside: n, style: o, onOpenAutoFocus: l, ...a }, u) {
    const { drawerRef: d, onPress: f, onRelease: p, onDrag: v, keyboardIsOpen: y, snapPointsOffset: w, activeSnapPointIndex: S, modal: x, isOpen: b, direction: A, snapPoints: k, container: P, handleOnly: N, shouldAnimate: L, autoFocus: z } = di(), [O, F] = J.useState(false), G = xh(u, d), _ = J.useRef(null), Y = J.useRef(null), U = J.useRef(false), ee = k && k.length > 0;
    LS();
    const le = (Q, ae, ge = 0) => {
      if (U.current) return true;
      const se = Math.abs(Q.y), oe = Math.abs(Q.x), B = oe > se, X = [
        "bottom",
        "right"
      ].includes(ae) ? 1 : -1;
      if (ae === "left" || ae === "right") {
        if (!(Q.x * X < 0) && oe >= 0 && oe <= ge) return B;
      } else if (!(Q.y * X < 0) && se >= 0 && se <= ge) return !B;
      return U.current = true, true;
    };
    J.useEffect(() => {
      ee && window.requestAnimationFrame(() => {
        F(true);
      });
    }, []);
    function Z(Q) {
      _.current = null, U.current = false, p(Q);
    }
    return J.createElement(Vu, {
      "data-vaul-drawer-direction": A,
      "data-vaul-drawer": "",
      "data-vaul-delayed-snap-points": O ? "true" : "false",
      "data-vaul-snap-points": b && ee ? "true" : "false",
      "data-vaul-custom-container": P ? "true" : "false",
      "data-vaul-animate": (L == null ? void 0 : L.current) ? "true" : "false",
      ...a,
      ref: G,
      style: w && w.length > 0 ? {
        "--snap-point-height": `${w[S ?? 0]}px`,
        ...o
      } : o,
      onPointerDown: (Q) => {
        N || (a.onPointerDown == null || a.onPointerDown.call(a, Q), _.current = {
          x: Q.pageX,
          y: Q.pageY
        }, f(Q));
      },
      onOpenAutoFocus: (Q) => {
        l == null ? void 0 : l(Q), z || Q.preventDefault();
      },
      onPointerDownOutside: (Q) => {
        if (n == null ? void 0 : n(Q), !x || Q.defaultPrevented) {
          Q.preventDefault();
          return;
        }
        y.current && (y.current = false);
      },
      onFocusOutside: (Q) => {
        if (!x) {
          Q.preventDefault();
          return;
        }
      },
      onPointerMove: (Q) => {
        if (Y.current = Q, N || (a.onPointerMove == null || a.onPointerMove.call(a, Q), !_.current)) return;
        const ae = Q.pageY - _.current.y, ge = Q.pageX - _.current.x, se = Q.pointerType === "touch" ? 10 : 2;
        le({
          x: ge,
          y: ae
        }, A, se) ? v(Q) : (Math.abs(ge) > se || Math.abs(ae) > se) && (_.current = null);
      },
      onPointerUp: (Q) => {
        a.onPointerUp == null || a.onPointerUp.call(a, Q), _.current = null, U.current = false, p(Q);
      },
      onPointerOut: (Q) => {
        a.onPointerOut == null || a.onPointerOut.call(a, Q), Z(Y.current);
      },
      onContextMenu: (Q) => {
        a.onContextMenu == null || a.onContextMenu.call(a, Q), Y.current && Z(Y.current);
      }
    });
  });
  Rh.displayName = "Drawer.Content";
  const FS = 250, IS = 120, WS = J.forwardRef(function({ preventCycle: n = false, children: o, ...l }, a) {
    const { closeDrawer: u, isDragging: d, snapPoints: f, activeSnapPoint: p, setActiveSnapPoint: v, dismissible: y, handleOnly: w, isOpen: S, onPress: x, onDrag: b } = di(), A = J.useRef(null), k = J.useRef(false);
    function P() {
      if (k.current) {
        z();
        return;
      }
      window.setTimeout(() => {
        N();
      }, IS);
    }
    function N() {
      if (d || n || k.current) {
        z();
        return;
      }
      if (z(), !f || f.length === 0) {
        y || u();
        return;
      }
      if (p === f[f.length - 1] && y) {
        u();
        return;
      }
      const F = f.findIndex((_) => _ === p);
      if (F === -1) return;
      const G = f[F + 1];
      v(G);
    }
    function L() {
      A.current = window.setTimeout(() => {
        k.current = true;
      }, FS);
    }
    function z() {
      A.current && window.clearTimeout(A.current), k.current = false;
    }
    return J.createElement("div", {
      onClick: P,
      onPointerCancel: z,
      onPointerDown: (O) => {
        w && x(O), L();
      },
      onPointerMove: (O) => {
        w && b(O);
      },
      ref: a,
      "data-vaul-drawer-visible": S ? "true" : "false",
      "data-vaul-handle": "",
      "aria-hidden": "true",
      ...l
    }, J.createElement("span", {
      "data-vaul-handle-hitarea": "",
      "aria-hidden": "true"
    }, o));
  });
  WS.displayName = "Drawer.Handle";
  function HS(n) {
    const o = di(), { container: l = o.container, ...a } = n;
    return J.createElement(ch, {
      container: l,
      ...a
    });
  }
  const Jt = {
    Root: zS,
    Content: Rh,
    Overlay: Ph,
    Trigger: uh,
    Portal: HS,
    Close: dh,
    Title: Gu,
    Description: Ku
  }, Th = ({ shouldScaleBackground: n = true, ...o }) => h.jsx(Jt.Root, {
    shouldScaleBackground: n,
    ...o
  });
  Th.displayName = "Drawer";
  const $S = Jt.Trigger, US = Jt.Portal, VS = Jt.Close, Nh = g.forwardRef(({ className: n, ...o }, l) => h.jsx(Jt.Overlay, {
    ref: l,
    className: qe("fixed inset-0 z-50 bg-black/80", n),
    ...o
  }));
  Nh.displayName = Jt.Overlay.displayName;
  const Mh = g.forwardRef(({ className: n, children: o, ...l }, a) => h.jsxs(US, {
    children: [
      h.jsx(Nh, {}),
      h.jsxs(Jt.Content, {
        ref: a,
        className: qe("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background", n),
        ...l,
        children: [
          h.jsx("div", {
            className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"
          }),
          o
        ]
      })
    ]
  }));
  Mh.displayName = "DrawerContent";
  const Ah = ({ className: n, ...o }) => h.jsx("div", {
    className: qe("grid gap-1.5 p-4 text-center sm:text-left", n),
    ...o
  });
  Ah.displayName = "DrawerHeader";
  const Dh = ({ className: n, ...o }) => h.jsx("div", {
    className: qe("mt-auto flex flex-col gap-2 p-4", n),
    ...o
  });
  Dh.displayName = "DrawerFooter";
  const Oh = g.forwardRef(({ className: n, ...o }, l) => h.jsx(Jt.Title, {
    ref: l,
    className: qe("text-lg font-semibold leading-none tracking-tight", n),
    ...o
  }));
  Oh.displayName = Jt.Title.displayName;
  const jh = g.forwardRef(({ className: n, ...o }, l) => h.jsx(Jt.Description, {
    ref: l,
    className: qe("text-sm text-muted-foreground", n),
    ...o
  }));
  jh.displayName = Jt.Description.displayName;
  const Sr = g.createContext({
    isDesktop: true
  });
  function ta({ children: n, ...o }) {
    const l = ci();
    return l ? h.jsx(Sr.Provider, {
      value: {
        isDesktop: l
      },
      children: h.jsx(fS, {
        modal: true,
        ...o,
        children: n
      })
    }) : h.jsx(Sr.Provider, {
      value: {
        isDesktop: l
      },
      children: h.jsx(Th, {
        ...o,
        children: n
      })
    });
  }
  function na({ children: n }) {
    const { isDesktop: o } = g.useContext(Sr);
    return o ? h.jsx(pS, {
      asChild: true,
      children: n
    }) : h.jsx($S, {
      asChild: true,
      children: n
    });
  }
  function ra({ children: n, ...o }) {
    const { isDesktop: l } = g.useContext(Sr);
    return l ? h.jsx(ph, {
      ...o,
      children: n
    }) : h.jsxs(Mh, {
      ...o,
      children: [
        n,
        h.jsx(Dh, {
          className: "pt-2",
          children: h.jsx(VS, {
            asChild: true,
            children: h.jsx("button", {
              className: "btn btn-outline",
              children: "Cancel"
            })
          })
        })
      ]
    });
  }
  function oa({ children: n, ...o }) {
    const { isDesktop: l } = g.useContext(Sr);
    return l ? h.jsx(mh, {
      ...o,
      children: n
    }) : h.jsx(Ah, {
      ...o,
      children: n
    });
  }
  function ia({ children: n, ...o }) {
    const { isDesktop: l } = g.useContext(Sr);
    return l ? h.jsx(hh, {
      ...o,
      children: n
    }) : h.jsx(Oh, {
      ...o,
      children: n
    });
  }
  function GS({ children: n, ...o }) {
    const { isDesktop: l } = g.useContext(Sr);
    return l ? h.jsx(gh, {
      ...o,
      children: n
    }) : h.jsx(jh, {
      ...o,
      children: n
    });
  }
  function KS({ onConfirm: n }) {
    return h.jsxs(ta, {
      children: [
        h.jsx(na, {
          children: h.jsx(Ge, {
            size: "sm",
            variant: "destructive",
            children: "Leave channel"
          })
        }),
        h.jsxs(ra, {
          children: [
            h.jsxs(oa, {
              children: [
                h.jsx(ia, {
                  children: "Are you sure?"
                }),
                h.jsxs(GS, {
                  children: [
                    "If you want to rejoin the channel, make sure to save a ticket first by clicking the ",
                    h.jsx("em", {
                      children: "Invite"
                    }),
                    " button."
                  ]
                })
              ]
            }),
            h.jsx(Ge, {
              onClick: n,
              children: "Leave channel"
            })
          ]
        })
      ]
    });
  }
  function YS({ api: n, channel: o }) {
    const [l, a] = g.useState(n.getMyself(o)), [u, d] = g.useState(l.name), [f, p] = g.useState(false);
    g.useEffect(() => n.subscribeToPeers(o, () => {
      a(n.getMyself(o));
    }), [
      n,
      o
    ]);
    const v = (y) => {
      y.preventDefault(), u.trim() && (n.setNickname(o, u), p(false));
    };
    return h.jsxs(ta, {
      open: f,
      onOpenChange: p,
      children: [
        h.jsx(na, {
          children: h.jsx(Ge, {
            variant: "secondary",
            size: "sm",
            children: "Change nickname"
          })
        }),
        h.jsxs(ra, {
          className: "sm:max-w-[425px]",
          children: [
            h.jsx(oa, {
              children: h.jsx(ia, {
                children: "Change nickname"
              })
            }),
            h.jsxs("form", {
              onSubmit: v,
              className: "flex space-x-2",
              children: [
                h.jsx(Jr, {
                  value: u,
                  onChange: (y) => d(y.target.value),
                  placeholder: "Enter your nickname"
                }),
                h.jsx(Ge, {
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
  var QS = "Toggle", _h = g.forwardRef((n, o) => {
    const { pressed: l, defaultPressed: a = false, onPressedChange: u, ...d } = n, [f = false, p] = Zl({
      prop: l,
      onChange: u,
      defaultProp: a
    });
    return h.jsx(We.button, {
      type: "button",
      "aria-pressed": f,
      "data-state": f ? "on" : "off",
      "data-disabled": n.disabled ? "" : void 0,
      ...d,
      ref: o,
      onClick: Fe(n.onClick, () => {
        n.disabled || p(!f);
      })
    });
  });
  _h.displayName = QS;
  var Lh = _h;
  const XS = Np("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2", {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-10 px-3 min-w-10",
        sm: "h-9 px-2.5 min-w-9",
        lg: "h-11 px-5 min-w-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }), Bh = g.forwardRef(({ className: n, variant: o, size: l, ...a }, u) => h.jsx(Lh, {
    ref: u,
    className: qe(XS({
      variant: o,
      size: l,
      className: n
    })),
    ...a
  }));
  Bh.displayName = Lh.displayName;
  function qS(n) {
    const o = g.useRef({
      value: n,
      previous: n
    });
    return g.useMemo(() => (o.current.value !== n && (o.current.previous = o.current.value, o.current.value = n), o.current.previous), [
      n
    ]);
  }
  var Qu = "Checkbox", [JS, jC] = li(Qu), [ZS, eC] = JS(Qu), zh = g.forwardRef((n, o) => {
    const { __scopeCheckbox: l, name: a, checked: u, defaultChecked: d, required: f, disabled: p, value: v = "on", onCheckedChange: y, form: w, ...S } = n, [x, b] = g.useState(null), A = nt(o, (O) => b(O)), k = g.useRef(false), P = x ? w || !!x.closest("form") : true, [N = false, L] = Zl({
      prop: u,
      defaultProp: d,
      onChange: y
    }), z = g.useRef(N);
    return g.useEffect(() => {
      const O = x == null ? void 0 : x.form;
      if (O) {
        const F = () => L(z.current);
        return O.addEventListener("reset", F), () => O.removeEventListener("reset", F);
      }
    }, [
      x,
      L
    ]), h.jsxs(ZS, {
      scope: l,
      state: N,
      disabled: p,
      children: [
        h.jsx(We.button, {
          type: "button",
          role: "checkbox",
          "aria-checked": Xn(N) ? "mixed" : N,
          "aria-required": f,
          "data-state": Wh(N),
          "data-disabled": p ? "" : void 0,
          disabled: p,
          value: v,
          ...S,
          ref: A,
          onKeyDown: Fe(n.onKeyDown, (O) => {
            O.key === "Enter" && O.preventDefault();
          }),
          onClick: Fe(n.onClick, (O) => {
            L((F) => Xn(F) ? true : !F), P && (k.current = O.isPropagationStopped(), k.current || O.stopPropagation());
          })
        }),
        P && h.jsx(tC, {
          control: x,
          bubbles: !k.current,
          name: a,
          value: v,
          checked: N,
          required: f,
          disabled: p,
          form: w,
          style: {
            transform: "translateX(-100%)"
          },
          defaultChecked: Xn(d) ? false : d
        })
      ]
    });
  });
  zh.displayName = Qu;
  var Fh = "CheckboxIndicator", Ih = g.forwardRef((n, o) => {
    const { __scopeCheckbox: l, forceMount: a, ...u } = n, d = eC(Fh, l);
    return h.jsx(Xt, {
      present: a || Xn(d.state) || d.state === true,
      children: h.jsx(We.span, {
        "data-state": Wh(d.state),
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
  Ih.displayName = Fh;
  var tC = (n) => {
    const { control: o, checked: l, bubbles: a = true, defaultChecked: u, ...d } = n, f = g.useRef(null), p = qS(l), v = cm(o);
    g.useEffect(() => {
      const w = f.current, S = window.HTMLInputElement.prototype, b = Object.getOwnPropertyDescriptor(S, "checked").set;
      if (p !== l && b) {
        const A = new Event("click", {
          bubbles: a
        });
        w.indeterminate = Xn(l), b.call(w, Xn(l) ? false : l), w.dispatchEvent(A);
      }
    }, [
      p,
      l,
      a
    ]);
    const y = g.useRef(Xn(l) ? false : l);
    return h.jsx("input", {
      type: "checkbox",
      "aria-hidden": true,
      defaultChecked: u ?? y.current,
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
  function Xn(n) {
    return n === "indeterminate";
  }
  function Wh(n) {
    return Xn(n) ? "indeterminate" : n ? "checked" : "unchecked";
  }
  var Hh = zh, nC = Ih;
  const Il = g.forwardRef(({ className: n, ...o }, l) => h.jsx(Hh, {
    ref: l,
    className: qe("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", n),
    ...o,
    children: h.jsx(nC, {
      className: qe("flex items-center justify-center text-current"),
      children: h.jsx(Fx, {
        className: "h-4 w-4"
      })
    })
  }));
  Il.displayName = Hh.displayName;
  function xp(n) {
    const o = new URL(document.location.toString());
    return o.searchParams.set("ticket", n), o.toString();
  }
  function rC({ channel: n, getTicket: o }) {
    const [l, a] = g.useState(false), u = ci(), d = Cr(u ? "w-2xl max-w-3xl" : "max-w-[100vw]", "max-h-[80vh]");
    return h.jsxs(ta, {
      open: l,
      onOpenChange: a,
      children: [
        h.jsx(na, {
          children: h.jsxs(Ge, {
            variant: "default",
            children: [
              h.jsx(Gx, {}),
              "Invite peers"
            ]
          })
        }),
        h.jsx(ra, {
          className: d,
          children: h.jsxs("div", {
            className: "",
            children: [
              h.jsx(oa, {
                children: h.jsx(ia, {
                  children: "Invite peers"
                })
              }),
              h.jsx("div", {
                className: "grow-0 mt-2 max-h-[60vh] max-w-2xl overflow-auto",
                children: h.jsx(oC, {
                  channel: n,
                  getTicket: o
                })
              })
            ]
          })
        })
      ]
    });
  }
  function oC({ channel: n, getTicket: o }) {
    const [l, a] = g.useState({
      includeMyself: true,
      includeBootstrap: true,
      includeNeighbors: false
    }), u = g.useMemo(() => o(l), [
      l,
      n
    ]), d = g.useRef(null);
    function f(w) {
      navigator.clipboard.writeText(w);
    }
    const p = `cargo run -- join ${u}`, v = xp(u), y = xp(u.substring(0, 16));
    return h.jsxs(h.Fragment, {
      children: [
        h.jsxs("div", {
          className: "mb-4",
          children: [
            h.jsx("p", {
              className: "font-semibold mb-2",
              children: "Ticket"
            }),
            h.jsxs("div", {
              className: "flex items-center",
              children: [
                h.jsxs("span", {
                  className: "mr-2 font-mono",
                  children: [
                    u.substring(0, 16),
                    "..."
                  ]
                }),
                h.jsxs(Ge, {
                  variant: "outline",
                  size: "sm",
                  onClick: () => f(u),
                  children: [
                    h.jsx(ru, {
                      className: "w-4 h-4 mr-2"
                    }),
                    "Copy"
                  ]
                })
              ]
            })
          ]
        }),
        h.jsxs("div", {
          className: "mb-4",
          children: [
            h.jsx("p", {
              className: "font-semibold mb-2",
              children: "Join link"
            }),
            h.jsxs("div", {
              className: "flex items-center space-x-2",
              children: [
                h.jsxs("a", {
                  href: v,
                  className: "text-blue-500 hover:underline",
                  target: "_blank",
                  children: [
                    y,
                    "\u2026"
                  ]
                }),
                h.jsxs(Ge, {
                  variant: "outline",
                  size: "sm",
                  onClick: () => f(v),
                  children: [
                    h.jsx(ru, {
                      className: "w-4 h-4 mr-2"
                    }),
                    "Copy"
                  ]
                })
              ]
            })
          ]
        }),
        h.jsxs("div", {
          className: "mb-4",
          children: [
            h.jsx("p", {
              className: "font-semibold mb-2",
              children: "Join from the command line"
            }),
            h.jsx(Jr, {
              ref: d,
              value: p,
              readOnly: true,
              className: "mb-2",
              onClick: () => {
                var _a;
                return (_a = d.current) == null ? void 0 : _a.select();
              }
            }),
            h.jsxs(Ge, {
              variant: "outline",
              size: "sm",
              onClick: () => f(p),
              children: [
                h.jsx(ru, {
                  className: "w-4 h-4 mr-2"
                }),
                "Copy to Clipboard"
              ]
            })
          ]
        }),
        h.jsxs("div", {
          className: "mb-4",
          children: [
            h.jsx("h3", {
              className: "font-semibold mb-2",
              children: "Configure ticket"
            }),
            h.jsxs("div", {
              className: "space-y-2",
              children: [
                h.jsxs("div", {
                  className: "flex items-center",
                  children: [
                    h.jsx(Il, {
                      id: "include-myself",
                      checked: l.includeMyself,
                      onCheckedChange: (w) => a({
                        ...l,
                        includeMyself: !!w
                      })
                    }),
                    h.jsx("label", {
                      htmlFor: "include-myself",
                      className: "ml-2",
                      children: "Include myself"
                    })
                  ]
                }),
                h.jsxs("div", {
                  className: "flex items-center",
                  children: [
                    h.jsx(Il, {
                      id: "include-bootstrap",
                      checked: l.includeBootstrap,
                      onCheckedChange: (w) => a({
                        ...l,
                        includeBootstrap: !!w
                      })
                    }),
                    h.jsx("label", {
                      htmlFor: "include-bootstrap",
                      className: "ml-2",
                      children: "Include my bootstrap"
                    })
                  ]
                }),
                h.jsxs("div", {
                  className: "flex items-center",
                  children: [
                    h.jsx(Il, {
                      id: "include-neighbors",
                      checked: l.includeNeighbors,
                      onCheckedChange: (w) => a({
                        ...l,
                        includeNeighbors: !!w
                      })
                    }),
                    h.jsx("label", {
                      htmlFor: "include-neighbors",
                      className: "ml-2",
                      children: "Include my current neighbors"
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
  }
  function iC({ api: n, channel: o, onClose: l }) {
    const a = ci(), [u, d] = g.useState(false), f = Cr("flex flex-grow overflow-hidden");
    let p;
    return a || (p = h.jsxs(Bh, {
      pressed: u,
      onPressedChange: d,
      title: "peers and settings",
      children: [
        !u && h.jsx(Vx, {}),
        u && h.jsx(Um, {})
      ]
    })), h.jsxs("div", {
      className: f,
      children: [
        (a || !u) && h.jsx(lC, {
          api: n,
          channel: o,
          extraButtons: p
        }),
        a && h.jsx("div", {
          className: "w-md",
          children: h.jsx(Sp, {
            api: n,
            channel: o,
            onClose: l
          })
        }),
        u && h.jsx(Sp, {
          api: n,
          channel: o,
          onClose: l,
          extraButtons: p
        })
      ]
    });
  }
  function lC({ api: n, channel: o, extraButtons: l }) {
    const [a, u] = g.useState([]), [d, f] = g.useState(""), [p, v] = g.useState(false), [y, w] = g.useState(true), S = g.useRef(null), x = g.useRef(null), b = g.useCallback(() => {
      S.current && S.current.scrollIntoView({
        behavior: "smooth"
      }), v(false), w(true);
    }, []);
    g.useEffect(() => (u(n.getMessages(o)), b(), n.subscribeToMessages(o, (N) => {
      u((L) => {
        if (!L.some((z) => z.id === N.id)) {
          const z = [
            ...L,
            N
          ];
          return y ? setTimeout(b, 0) : v(true), z;
        }
        return L;
      }), an.info(`New message received: ${N.content}`);
    })), [
      o,
      y,
      b
    ]);
    const A = async (P) => {
      if (P.preventDefault(), d.trim()) try {
        await n.sendMessage(o, d.trim()), f(""), an.info(`Message sent in channel ${o}: ${d.trim()}`);
      } catch (N) {
        an.error("Failed to send message", N);
      }
    }, k = g.useCallback(() => {
      if (x.current) {
        const { scrollTop: P, scrollHeight: N, clientHeight: L } = x.current, z = P + L >= N - 10;
        w(z), v(!z);
      }
    }, []);
    return g.useEffect(() => {
      y && b();
    }, [
      y,
      b
    ]), g.useEffect(() => {
      const P = x.current;
      if (P) return P.addEventListener("scroll", k), () => P.removeEventListener("scroll", k);
    }, [
      k
    ]), h.jsxs("div", {
      className: "flex-grow flex flex-col p-4 relative",
      children: [
        h.jsxs(ai, {
          className: "flex-grow mb-4 border rounded-md p-4",
          ref: x,
          onScroll: k,
          children: [
            a.map((P) => h.jsxs("div", {
              className: "mb-2",
              children: [
                h.jsxs("span", {
                  className: "font-bold",
                  children: [
                    P.nickname || P.sender.substring(0, 8),
                    ": "
                  ]
                }),
                P.content
              ]
            }, P.id)),
            h.jsx("div", {
              ref: S
            })
          ]
        }),
        p && h.jsx(Ge, {
          className: "absolute bottom-20 right-4 rounded-full p-2",
          onClick: b,
          size: "icon",
          children: h.jsx(zx, {
            className: "h-4 w-4"
          })
        }),
        h.jsxs("form", {
          onSubmit: A,
          className: "flex space-x-2",
          children: [
            h.jsx(Jr, {
              value: d,
              onChange: (P) => f(P.target.value),
              placeholder: "Type your message...",
              className: "flex-grow"
            }),
            h.jsx(Ge, {
              type: "submit",
              children: "Send"
            }),
            l
          ]
        })
      ]
    });
  }
  function Sp({ api: n, channel: o, onClose: l, extraButtons: a }) {
    const [u, d] = g.useState([]), [f, p] = g.useState(0);
    g.useEffect(() => n.subscribeToNeighbors(o, p), [
      o
    ]), g.useEffect(() => (d([
      ...n.getPeers(o)
    ]), n.subscribeToPeers(o, () => d([
      ...n.getPeers(o)
    ]))), [
      o
    ]);
    const v = [
      ...u
    ].sort((y, w) => {
      const S = {
        online: 0,
        away: 1,
        offline: 2
      };
      return S[y.status] - S[w.status];
    });
    return h.jsxs("div", {
      className: "p-4 border-l flex flex-col",
      children: [
        h.jsx("div", {
          children: a
        }),
        h.jsxs("div", {
          className: "mb-4",
          children: [
            h.jsx("h2", {
              className: "font-bold mb-2",
              children: "Status"
            }),
            f > 0 && h.jsxs("p", {
              children: [
                "Connected ",
                h.jsxs("span", {
                  className: "text-sm",
                  children: [
                    "(",
                    f,
                    " neighbors)"
                  ]
                })
              ]
            }),
            f === 0 && h.jsx("p", {
              children: "Waiting for peers"
            })
          ]
        }),
        h.jsx("div", {
          className: "mb-4 flex space-x-2",
          children: h.jsx(rC, {
            channel: o,
            getTicket: (y) => n.getTicket(o, y)
          })
        }),
        h.jsxs("div", {
          className: "mb-4 flex space-x-2",
          children: [
            h.jsx(YS, {
              api: n,
              channel: o
            }),
            h.jsx(KS, {
              onConfirm: l
            })
          ]
        }),
        h.jsx("h2", {
          className: "font-bold mb-2",
          children: "Peers"
        }),
        h.jsx("div", {
          className: "flex-grow",
          children: h.jsx(ai, {
            className: "h-full",
            children: v.map((y) => h.jsx(aC, {
              peer: y
            }, y.id))
          })
        })
      ]
    });
  }
  function aC({ peer: n }) {
    const o = n.role == Vm.Myself, l = o ? h.jsx(sC, {
      peer: n
    }) : h.jsx(uC, {
      peer: n
    });
    return h.jsxs(Ox, {
      children: [
        h.jsx(jx, {
          asChild: true,
          children: h.jsxs("div", {
            className: "flex items-center mb-2 cursor-pointer",
            children: [
              h.jsx("div", {
                className: `w-2 h-2 rounded-full mr-2 ${dC(n.status)}`
              }),
              h.jsx("span", {
                className: Cr(o && "italic"),
                children: n.name
              })
            ]
          })
        }),
        h.jsx(Hm, {
          className: "w-80 bg-secondary",
          children: l
        })
      ]
    });
  }
  function sC({ peer: n }) {
    return h.jsxs("div", {
      className: "space-y-2",
      children: [
        "This is us :)",
        h.jsxs("div", {
          children: [
            h.jsx("strong", {
              children: "Endpoint ID:"
            }),
            h.jsx($h, {
              endpointId: n.id
            })
          ]
        })
      ]
    });
  }
  function uC({ peer: n }) {
    return h.jsxs("div", {
      className: "space-y-2",
      children: [
        h.jsxs("p", {
          children: [
            h.jsx("strong", {
              children: "Last seen:"
            }),
            " ",
            h.jsx(zy, {
              date: n.lastSeen
            })
          ]
        }),
        h.jsxs("div", {
          children: [
            h.jsx("strong", {
              children: "Endpoint ID:"
            }),
            h.jsx($h, {
              endpointId: n.id
            })
          ]
        })
      ]
    });
  }
  function $h({ endpointId: n }) {
    return h.jsxs(h.Fragment, {
      children: [
        h.jsxs("span", {
          className: "ml-2 font-mono",
          children: [
            n.substring(0, 8),
            "\u2026"
          ]
        }),
        h.jsx(Ge, {
          size: "sm",
          onClick: () => cC(n),
          className: "ml-2 inline",
          variant: "outline",
          children: "Copy"
        })
      ]
    });
  }
  function cC(n) {
    navigator.clipboard.writeText(n);
  }
  function dC(n) {
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
  var fC = (n, o, l, a, u, d, f, p) => {
    let v = document.documentElement, y = [
      "light",
      "dark"
    ];
    function w(b) {
      (Array.isArray(n) ? n : [
        n
      ]).forEach((A) => {
        let k = A === "class", P = k && d ? u.map((N) => d[N] || N) : u;
        k ? (v.classList.remove(...P), v.classList.add(b)) : v.setAttribute(A, b);
      }), S(b);
    }
    function S(b) {
      p && y.includes(b) && (v.style.colorScheme = b);
    }
    function x() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    if (a) w(a);
    else try {
      let b = localStorage.getItem(o) || l, A = f && b === "system" ? x() : b;
      w(A);
    } catch {
    }
  }, Cp = [
    "light",
    "dark"
  ], Uh = "(prefers-color-scheme: dark)", pC = typeof window > "u", Xu = g.createContext(void 0), mC = {
    setTheme: (n) => {
    },
    themes: []
  }, hC = () => {
    var n;
    return (n = g.useContext(Xu)) != null ? n : mC;
  }, gC = (n) => g.useContext(Xu) ? g.createElement(g.Fragment, null, n.children) : g.createElement(yC, {
    ...n
  }), vC = [
    "light",
    "dark"
  ], yC = ({ forcedTheme: n, disableTransitionOnChange: o = false, enableSystem: l = true, enableColorScheme: a = true, storageKey: u = "theme", themes: d = vC, defaultTheme: f = l ? "system" : "light", attribute: p = "data-theme", value: v, children: y, nonce: w, scriptProps: S }) => {
    let [x, b] = g.useState(() => kp(u, f)), [A, k] = g.useState(() => kp(u)), P = v ? Object.values(v) : d, N = g.useCallback((F) => {
      let G = F;
      if (!G) return;
      F === "system" && l && (G = bp());
      let _ = v ? v[G] : G, Y = o ? xC(w) : null, U = document.documentElement, ee = (le) => {
        le === "class" ? (U.classList.remove(...P), _ && U.classList.add(_)) : le.startsWith("data-") && (_ ? U.setAttribute(le, _) : U.removeAttribute(le));
      };
      if (Array.isArray(p) ? p.forEach(ee) : ee(p), a) {
        let le = Cp.includes(f) ? f : null, Z = Cp.includes(G) ? G : le;
        U.style.colorScheme = Z;
      }
      Y == null ? void 0 : Y();
    }, [
      w
    ]), L = g.useCallback((F) => {
      let G = typeof F == "function" ? F(x) : F;
      b(G);
      try {
        localStorage.setItem(u, G);
      } catch {
      }
    }, [
      x
    ]), z = g.useCallback((F) => {
      let G = bp(F);
      k(G), x === "system" && l && !n && N("system");
    }, [
      x,
      n
    ]);
    g.useEffect(() => {
      let F = window.matchMedia(Uh);
      return F.addListener(z), z(F), () => F.removeListener(z);
    }, [
      z
    ]), g.useEffect(() => {
      let F = (G) => {
        G.key === u && (G.newValue ? b(G.newValue) : L(f));
      };
      return window.addEventListener("storage", F), () => window.removeEventListener("storage", F);
    }, [
      L
    ]), g.useEffect(() => {
      N(n ?? x);
    }, [
      n,
      x
    ]);
    let O = g.useMemo(() => ({
      theme: x,
      setTheme: L,
      forcedTheme: n,
      resolvedTheme: x === "system" ? A : x,
      themes: l ? [
        ...d,
        "system"
      ] : d,
      systemTheme: l ? A : void 0
    }), [
      x,
      L,
      n,
      A,
      l,
      d
    ]);
    return g.createElement(Xu.Provider, {
      value: O
    }, g.createElement(wC, {
      forcedTheme: n,
      storageKey: u,
      attribute: p,
      enableSystem: l,
      enableColorScheme: a,
      defaultTheme: f,
      value: v,
      themes: d,
      nonce: w,
      scriptProps: S
    }), y);
  }, wC = g.memo(({ forcedTheme: n, storageKey: o, attribute: l, enableSystem: a, enableColorScheme: u, defaultTheme: d, value: f, themes: p, nonce: v, scriptProps: y }) => {
    let w = JSON.stringify([
      l,
      o,
      d,
      n,
      p,
      f,
      a,
      u
    ]).slice(1, -1);
    return g.createElement("script", {
      ...y,
      suppressHydrationWarning: true,
      nonce: typeof window > "u" ? v : "",
      dangerouslySetInnerHTML: {
        __html: `(${fC.toString()})(${w})`
      }
    });
  }), kp = (n, o) => {
    if (pC) return;
    let l;
    try {
      l = localStorage.getItem(n) || void 0;
    } catch {
    }
    return l || o;
  }, xC = (n) => {
    let o = document.createElement("style");
    return n && o.setAttribute("nonce", n), o.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")), document.head.appendChild(o), () => {
      window.getComputedStyle(document.body), setTimeout(() => {
        document.head.removeChild(o);
      }, 1);
    };
  }, bp = (n) => (n || (n = window.matchMedia(Uh)), n.matches ? "dark" : "light");
  function SC() {
    const [n, o] = g.useState(false), l = ci(), a = Cr(l ? "w-2xl max-w-3xl" : "max-w-[100vw]", "max-h-[80vh]");
    return h.jsxs(ta, {
      open: n,
      onOpenChange: o,
      children: [
        h.jsx(na, {
          children: h.jsxs(Ge, {
            variant: "secondary",
            children: [
              h.jsx(Hx, {
                className: "w-4 h-4 mr-2"
              }),
              "Logs"
            ]
          })
        }),
        h.jsx(ra, {
          className: a,
          children: h.jsxs("div", {
            className: "",
            children: [
              h.jsx(oa, {
                children: h.jsx(ia, {
                  children: "Logs"
                })
              }),
              h.jsx("div", {
                className: "grow-0 mt-2 max-h-[60vh] max-w-2xl overflow-auto",
                children: h.jsx(CC, {})
              })
            ]
          })
        })
      ]
    });
  }
  function CC() {
    const n = kC(), o = (a) => a.toTimeString().split(" ")[0] + "." + a.getMilliseconds().toString().padStart(3, "0").slice(0, 2), l = (a) => {
      switch (a) {
        case "error":
          return "text-red-500";
        case "warn":
          return "text-yellow-500";
        default:
          return "text-foreground";
      }
    };
    return h.jsx("div", {
      className: "max-w-3xl overflow-hidden flex flex-col relative",
      children: h.jsx(ai, {
        className: "flex-grow mb-4 font-mono overflow-auto",
        children: h.jsx("div", {
          className: "space-y-1",
          children: n.map((a, u) => h.jsxs("div", {
            className: `${l(a.level)}`,
            children: [
              h.jsx("span", {
                className: "text-muted-foreground",
                children: o(a.timestamp)
              }),
              " ",
              a.message
            ]
          }, u))
        })
      })
    });
  }
  function kC() {
    const [n, o] = g.useState([
      ...an.get()
    ]);
    return g.useEffect(() => {
      const l = an.subscribe((a) => {
        o((u) => [
          ...u,
          a
        ]);
      });
      return () => l();
    }, []), n;
  }
  function Vh({ onInviteClick: n, title: o }) {
    return h.jsxs("header", {
      className: "bg-background text-foreground p-4 flex justify-between items-center",
      children: [
        h.jsx("div", {
          className: "flex items-center",
          children: o && h.jsx("h1", {
            className: "text-xl font-bold mr-4",
            children: o
          })
        }),
        h.jsxs("div", {
          className: "flex items-center space-x-2",
          children: [
            n && h.jsxs(Ge, {
              onClick: n,
              variant: "default",
              children: [
                h.jsx(Yx, {
                  className: "w-4 h-4 mr-2"
                }),
                "Invite"
              ]
            }),
            h.jsx(SC, {}),
            h.jsx(bC, {})
          ]
        })
      ]
    });
  }
  function bC() {
    const { theme: n, setTheme: o } = hC(), [l, a] = g.useState(false);
    return g.useEffect(() => a(true), []), l ? h.jsxs(Ge, {
      variant: "ghost",
      size: "icon",
      onClick: () => o(n === "light" ? "dark" : "light"),
      children: [
        n === "light" ? h.jsx(Ux, {
          className: "h-5 w-5"
        }) : h.jsx(Kx, {
          className: "h-5 w-5"
        }),
        h.jsx("span", {
          className: "sr-only",
          children: "Toggle theme"
        })
      ]
    }) : null;
  }
  function EC({ channels: n, activeChannel: o, onChannelSelect: l, onNewChannel: a }) {
    const [u, d] = g.useState(false);
    return h.jsxs("div", {
      className: `bg-secondary h-full flex flex-col transition-all duration-300 ${u ? "w-12" : "w-64"}`,
      children: [
        h.jsxs("div", {
          className: "p-4 flex justify-between items-center",
          children: [
            !u && h.jsx("h2", {
              className: "text-lg font-semibold",
              children: "Channels"
            }),
            h.jsx(Ge, {
              variant: "ghost",
              size: "icon",
              onClick: () => d(!u),
              children: u ? h.jsx(Ix, {
                className: "h-5 w-5"
              }) : h.jsx(Um, {
                className: "h-5 w-5"
              })
            })
          ]
        }),
        h.jsx(ai, {
          className: "flex-grow",
          children: n.map((f) => {
            const p = Cr(f.id === o && "bg-primary/10", u ? "px-2" : "px-4");
            return h.jsxs(Ge, {
              variant: "ghost",
              className: `w-full justify-start px-4 py-2 hover:bg-primary/20 rounded-none ${p}`,
              onClick: () => l(f.id),
              children: [
                h.jsx($x, {
                  className: "h-4 w-4 mr-2"
                }),
                !u && f.name
              ]
            }, f.id);
          })
        }),
        h.jsxs(Ge, {
          variant: "default",
          onClick: a,
          className: "m-4",
          children: [
            h.jsx(Wx, {
              className: "h-5 w-5"
            }),
            "Add channel"
          ]
        })
      ]
    });
  }
  function PC() {
    const [n, o] = g.useState(null), [l, a] = g.useState(null);
    return g.useEffect(() => {
      tS().then(o).catch((u) => a(u.toString()));
    }, []), h.jsx(gC, {
      attribute: "class",
      defaultTheme: "system",
      enableSystem: true,
      children: h.jsxs("div", {
        className: "flex h-screen",
        children: [
          !n && h.jsxs(TC, {
            children: [
              !l && h.jsxs("div", {
                className: "text-center",
                children: [
                  "Spawning Iroh\u2026",
                  h.jsx("br", {}),
                  h.jsx(RC, {})
                ]
              }),
              l && h.jsx("div", {
                children: l
              })
            ]
          }),
          n && h.jsx(NC, {
            api: n
          })
        ]
      })
    });
  }
  function RC() {
    return h.jsxs("svg", {
      className: "inline-block h-5 w-5 animate-spin",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      children: [
        h.jsx("circle", {
          className: "opacity-25",
          cx: "12",
          cy: "12",
          r: "10",
          stroke: "currentColor",
          strokeWidth: "4"
        }),
        h.jsx("path", {
          className: "opacity-75",
          fill: "currentColor",
          d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        })
      ]
    });
  }
  function TC({ children: n }) {
    return h.jsxs("div", {
      className: "flex flex-col flex-grow",
      children: [
        h.jsx(Vh, {}),
        h.jsx("div", {
          className: "flex items-center justify-center",
          children: n
        })
      ]
    });
  }
  function NC({ api: n }) {
    var _a;
    const [o, l] = g.useState("home"), [a, u] = g.useState([]), [d, f] = g.useState(null), [p, v] = g.useState(false), y = async (k, P) => {
      try {
        const N = await n.joinChannel(k, P);
        u((L) => [
          ...L,
          N
        ]), l("chat"), f(N.id), v(true);
      } catch (N) {
        an.error("Failed to join channel", N);
      }
    }, w = async (k) => {
      try {
        const P = await n.createChannel(k);
        u((N) => [
          ...N,
          P
        ]), f(P.id), l("chat"), v(true);
      } catch (P) {
        an.error("Failed to create channel", P);
      }
    }, S = async (k) => {
      try {
        await n.closeChannel(k), u((P) => P.filter((N) => N.id !== k)), d === k && (f(a.length > 1 ? a[0].id : null), a.length === 1 && l("home"));
      } catch (P) {
        an.error("Failed to close channel", P);
      }
    }, x = () => {
      l("home"), v(true);
    }, b = ci();
    let A;
    return d && (A = "#" + ((_a = a.find((k) => k.id === d)) == null ? void 0 : _a.name)), h.jsxs(h.Fragment, {
      children: [
        b && p && h.jsx(EC, {
          channels: a,
          activeChannel: d,
          onChannelSelect: (k) => {
            f(k), l("chat");
          },
          onNewChannel: x
        }),
        h.jsxs("div", {
          className: "flex flex-col flex-grow",
          children: [
            h.jsx(Vh, {
              title: A
            }),
            o === "home" && h.jsx(Ly, {
              onJoin: y,
              onCreate: w
            }),
            o === "chat" && d && h.jsx(iC, {
              api: n,
              channel: d,
              onClose: () => S(d)
            })
          ]
        })
      ]
    });
  }
  Qv.createRoot(document.getElementById("root")).render(h.jsx(g.StrictMode, {
    children: h.jsx(PC, {})
  }));
})();
export {
  Vm as P,
  __tla,
  an as l
};
