var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { l as C, P as V, __tla as __tla_0 } from "./index-D95R9eXA.js";
let ne;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const re = "" + new URL("chat_browser_bg-Cd3OK2xO.wasm", import.meta.url).href, ce = async (e = {}, n) => {
    let _;
    if (n.startsWith("data:")) {
      const t = n.replace(/^data:.*?base64,/, "");
      let c;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") c = Buffer.from(t, "base64");
      else if (typeof atob == "function") {
        const a = atob(t);
        c = new Uint8Array(a.length);
        for (let b = 0; b < a.length; b++) c[b] = a.charCodeAt(b);
      } else throw new Error("Cannot decode base64-encoded data URL");
      _ = await WebAssembly.instantiate(c, e);
    } else {
      const t = await fetch(n), c = t.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && c.startsWith("application/wasm")) _ = await WebAssembly.instantiateStreaming(t, e);
      else {
        const a = await t.arrayBuffer();
        _ = await WebAssembly.instantiate(a, e);
      }
    }
    return _.instance.exports;
  };
  class M {
    static __wrap(n) {
      const _ = Object.create(M.prototype);
      return _.__wbg_ptr = n, K.register(_, _.__wbg_ptr, _), _;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, K.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_channel_free(n, 0);
    }
    id() {
      let n, _;
      try {
        const a = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_id(a, this.__wbg_ptr);
        var t = u().getInt32(a + 4 * 0, true), c = u().getInt32(a + 4 * 1, true);
        return n = t, _ = c, h(t, c);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export4(n, _, 1);
      }
    }
    neighbors() {
      try {
        const c = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_neighbors(c, this.__wbg_ptr);
        var n = u().getInt32(c + 4 * 0, true), _ = u().getInt32(c + 4 * 1, true), t = N(n, _).slice();
        return o.__wbindgen_export4(n, _ * 4, 4), t;
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get receiver() {
      const n = o.channel_receiver(this.__wbg_ptr);
      return w(n);
    }
    get sender() {
      const n = o.channel_sender(this.__wbg_ptr);
      return q.__wrap(n);
    }
    ticket(n) {
      let _, t;
      try {
        const I = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_ticket(I, this.__wbg_ptr, s(n));
        var c = u().getInt32(I + 4 * 0, true), a = u().getInt32(I + 4 * 1, true), b = u().getInt32(I + 4 * 2, true), g = u().getInt32(I + 4 * 3, true), y = c, f = a;
        if (g) throw y = 0, f = 0, w(b);
        return _ = y, t = f, h(y, f);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export4(_, t, 1);
      }
    }
  }
  Symbol.dispose && (M.prototype[Symbol.dispose] = M.prototype.free);
  class q {
    static __wrap(n) {
      const _ = Object.create(q.prototype);
      return _.__wbg_ptr = n, X.register(_, _.__wbg_ptr, _), _;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, X.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_channelsender_free(n, 0);
    }
    broadcast(n) {
      const _ = m(n, o.__wbindgen_export, o.__wbindgen_export2), t = p, c = o.channelsender_broadcast(this.__wbg_ptr, _, t);
      return w(c);
    }
    set_nickame(n) {
      const _ = m(n, o.__wbindgen_export, o.__wbindgen_export2), t = p;
      o.channelsender_set_nickame(this.__wbg_ptr, _, t);
    }
  }
  Symbol.dispose && (q.prototype[Symbol.dispose] = q.prototype.free);
  class A {
    static __wrap(n) {
      const _ = Object.create(A.prototype);
      return _.__wbg_ptr = n, Y.register(_, _.__wbg_ptr, _), _;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Y.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_chatnode_free(n, 0);
    }
    create(n) {
      const _ = m(n, o.__wbindgen_export, o.__wbindgen_export2), t = p, c = o.chatnode_create(this.__wbg_ptr, _, t);
      return w(c);
    }
    endpoint_id() {
      let n, _;
      try {
        const a = o.__wbindgen_add_to_stack_pointer(-16);
        o.chatnode_endpoint_id(a, this.__wbg_ptr);
        var t = u().getInt32(a + 4 * 0, true), c = u().getInt32(a + 4 * 1, true);
        return n = t, _ = c, h(t, c);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export4(n, _, 1);
      }
    }
    join(n, _) {
      const t = m(n, o.__wbindgen_export, o.__wbindgen_export2), c = p, a = m(_, o.__wbindgen_export, o.__wbindgen_export2), b = p, g = o.chatnode_join(this.__wbg_ptr, t, c, a, b);
      return w(g);
    }
    static spawn() {
      const n = o.chatnode_spawn();
      return w(n);
    }
  }
  Symbol.dispose && (A.prototype[Symbol.dispose] = A.prototype.free);
  class B {
    static __wrap(n) {
      const _ = Object.create(B.prototype);
      return _.__wbg_ptr = n, Q.register(_, _.__wbg_ptr, _), _;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Q.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_intounderlyingsource_free(n, 0);
    }
    cancel() {
      const n = this.__destroy_into_raw();
      o.intounderlyingsource_cancel(n);
    }
    pull(n) {
      const _ = o.intounderlyingsource_pull(this.__wbg_ptr, s(n));
      return w(_);
    }
  }
  Symbol.dispose && (B.prototype[Symbol.dispose] = B.prototype.free);
  function oe(e, n) {
    const _ = Error(h(e, n));
    return s(_);
  }
  function se(e, n) {
    const _ = String(r(n)), t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    u().setInt32(e + 4 * 1, c, true), u().setInt32(e + 4 * 0, t, true);
  }
  function ie(e) {
    const n = r(e), _ = typeof n == "boolean" ? n : void 0;
    return x(_) ? 16777215 : _ ? 1 : 0;
  }
  function ae(e, n) {
    const _ = J(r(n)), t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    u().setInt32(e + 4 * 1, c, true), u().setInt32(e + 4 * 0, t, true);
  }
  function be(e, n) {
    return r(e) in r(n);
  }
  function ue(e) {
    return typeof r(e) == "function";
  }
  function de(e) {
    const n = r(e);
    return typeof n == "object" && n !== null;
  }
  function fe(e) {
    return typeof r(e) == "string";
  }
  function ge(e) {
    return r(e) === void 0;
  }
  function we(e, n) {
    return r(e) == r(n);
  }
  function le(e, n) {
    const _ = r(n), t = typeof _ == "number" ? _ : void 0;
    u().setFloat64(e + 8 * 1, x(t) ? 0 : t, true), u().setInt32(e + 4 * 0, !x(t), true);
  }
  function he(e, n) {
    const _ = r(n), t = typeof _ == "string" ? _ : void 0;
    var c = x(t) ? 0 : m(t, o.__wbindgen_export, o.__wbindgen_export2), a = p;
    u().setInt32(e + 4 * 1, a, true), u().setInt32(e + 4 * 0, c, true);
  }
  function pe(e, n) {
    throw new Error(h(e, n));
  }
  function me(e) {
    r(e)._wbg_cb_unref();
  }
  function ye(e) {
    r(e).abort();
  }
  function xe(e, n) {
    r(e).abort(r(n));
  }
  function Se() {
    return d(function(e, n, _, t) {
      r(e).addEventListener(h(n, _), r(t));
    }, arguments);
  }
  function ve() {
    return d(function(e, n, _, t, c) {
      r(e).append(h(n, _), h(t, c));
    }, arguments);
  }
  function ke() {
    return d(function(e) {
      const n = r(e).arrayBuffer();
      return s(n);
    }, arguments);
  }
  function Ie(e) {
    const n = r(e).body;
    return x(n) ? 0 : s(n);
  }
  function Re(e) {
    const n = r(e).buffer;
    return s(n);
  }
  function Te(e) {
    const n = r(e).byobRequest;
    return x(n) ? 0 : s(n);
  }
  function je(e) {
    return r(e).byteLength;
  }
  function Ae(e) {
    return r(e).byteOffset;
  }
  function Fe() {
    return d(function(e, n, _) {
      const t = r(e).call(r(n), r(_));
      return s(t);
    }, arguments);
  }
  function Ce(e) {
    const n = r(e).cancel();
    return s(n);
  }
  function Ee(e, n) {
    const _ = r(e).catch(r(n));
    return s(_);
  }
  function Oe(e) {
    const n = M.__wrap(e);
    return s(n);
  }
  function Le(e) {
    const n = A.__wrap(e);
    return s(n);
  }
  function Me(e) {
    const n = clearTimeout(w(e));
    return s(n);
  }
  function qe() {
    return d(function(e, n) {
      r(e).clearTimeout(w(n));
    }, arguments);
  }
  function Be() {
    return d(function(e) {
      r(e).close();
    }, arguments);
  }
  function Ne() {
    return d(function(e) {
      r(e).close();
    }, arguments);
  }
  function Ue() {
    return d(function(e) {
      r(e).close();
    }, arguments);
  }
  function $e(e) {
    return r(e).code;
  }
  function ze(e) {
    return r(e).code;
  }
  function We(e) {
    const n = r(e).crypto;
    return s(n);
  }
  function De(e) {
    const n = r(e).data;
    return s(n);
  }
  function Pe(e, n) {
    var _ = N(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.debug(..._);
  }
  function Ve(e) {
    return r(e).done;
  }
  function Ge() {
    return d(function(e, n) {
      r(e).enqueue(r(n));
    }, arguments);
  }
  function He(e) {
    const n = r(e).entries();
    return s(n);
  }
  function Je(e, n) {
    var _ = N(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.error(..._);
  }
  function Ke(e, n) {
    let _, t;
    try {
      _ = e, t = n, console.error(h(e, n));
    } finally {
      o.__wbindgen_export4(_, t, 1);
    }
  }
  function Xe(e) {
    const n = fetch(r(e));
    return s(n);
  }
  function Ye(e, n) {
    const _ = r(e).fetch(r(n));
    return s(_);
  }
  function Qe() {
    return d(function(e, n) {
      globalThis.crypto.getRandomValues(F(e, n));
    }, arguments);
  }
  function Ze() {
    return d(function(e, n) {
      r(e).getRandomValues(r(n));
    }, arguments);
  }
  function en() {
    return d(function(e) {
      const n = r(e).getReader();
      return s(n);
    }, arguments);
  }
  function nn(e, n) {
    const _ = r(e)[n >>> 0];
    return s(_);
  }
  function _n() {
    return d(function(e, n) {
      const _ = Reflect.get(r(e), r(n));
      return s(_);
    }, arguments);
  }
  function tn(e) {
    const n = r(e).done;
    return x(n) ? 16777215 : n ? 1 : 0;
  }
  function rn(e) {
    const n = r(e).value;
    return s(n);
  }
  function cn(e, n) {
    const _ = r(e)[r(n)];
    return s(_);
  }
  function on() {
    return d(function(e, n) {
      return Reflect.has(r(e), r(n));
    }, arguments);
  }
  function sn(e) {
    const n = r(e).headers;
    return s(n);
  }
  function an(e) {
    let n;
    try {
      n = r(e) instanceof ArrayBuffer;
    } catch {
      n = false;
    }
    return n;
  }
  function bn(e) {
    let n;
    try {
      n = r(e) instanceof Blob;
    } catch {
      n = false;
    }
    return n;
  }
  function un(e) {
    let n;
    try {
      n = r(e) instanceof Response;
    } catch {
      n = false;
    }
    return n;
  }
  function dn(e) {
    let n;
    try {
      n = r(e) instanceof Uint8Array;
    } catch {
      n = false;
    }
    return n;
  }
  function fn(e) {
    return Array.isArray(r(e));
  }
  function gn(e) {
    return r(e).length;
  }
  function wn(e, n) {
    var _ = N(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.log(..._);
  }
  function ln(e, n) {
    const _ = r(n).message, t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    u().setInt32(e + 4 * 1, c, true), u().setInt32(e + 4 * 0, t, true);
  }
  function hn(e) {
    const n = r(e).msCrypto;
    return s(n);
  }
  function pn() {
    return d(function() {
      const e = new AbortController();
      return s(e);
    }, arguments);
  }
  function mn() {
    const e = new Error();
    return s(e);
  }
  function yn(e, n) {
    const _ = new Error(h(e, n));
    return s(_);
  }
  function xn(e) {
    const n = new Uint8Array(r(e));
    return s(n);
  }
  function Sn() {
    const e = new Object();
    return s(e);
  }
  function vn() {
    return d(function(e, n) {
      const _ = new WebSocket(h(e, n));
      return s(_);
    }, arguments);
  }
  function kn() {
    const e = new Array();
    return s(e);
  }
  function In() {
    return d(function() {
      const e = new Headers();
      return s(e);
    }, arguments);
  }
  function Rn(e, n) {
    const _ = new Uint8Array(F(e, n));
    return s(_);
  }
  function Tn(e, n) {
    try {
      var _ = {
        a: e,
        b: n
      }, t = (a, b) => {
        const g = _.a;
        _.a = 0;
        try {
          return ct(g, _.b, a, b);
        } finally {
          _.a = g;
        }
      };
      const c = new Promise(t);
      return s(c);
    } finally {
      _.a = 0;
    }
  }
  function jn(e, n, _) {
    const t = new Uint8Array(r(e), n >>> 0, _ >>> 0);
    return s(t);
  }
  function An(e, n) {
    const _ = new ReadableStream(B.__wrap(e), w(n));
    return s(_);
  }
  function Fn(e) {
    const n = new Uint8Array(e >>> 0);
    return s(n);
  }
  function Cn() {
    return d(function(e, n, _) {
      const t = new Request(h(e, n), r(_));
      return s(t);
    }, arguments);
  }
  function En() {
    return d(function(e, n, _) {
      const t = new WebSocket(h(e, n), r(_));
      return s(t);
    }, arguments);
  }
  function On() {
    return d(function(e) {
      const n = r(e).next();
      return s(n);
    }, arguments);
  }
  function Ln(e) {
    const n = r(e).node;
    return s(n);
  }
  function Mn() {
    return Date.now();
  }
  function qn(e) {
    return r(e).now();
  }
  function Bn(e) {
    const n = r(e).performance;
    return s(n);
  }
  function Nn(e) {
    const n = r(e).process;
    return s(n);
  }
  function Un(e, n) {
    const _ = r(n).protocol, t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    u().setInt32(e + 4 * 1, c, true), u().setInt32(e + 4 * 0, t, true);
  }
  function $n(e, n, _) {
    Uint8Array.prototype.set.call(F(e, n), r(_));
  }
  function zn(e, n) {
    return r(e).push(r(n));
  }
  function Wn(e) {
    queueMicrotask(r(e));
  }
  function Dn(e) {
    const n = r(e).queueMicrotask;
    return s(n);
  }
  function Pn() {
    return d(function(e, n) {
      r(e).randomFillSync(w(n));
    }, arguments);
  }
  function Vn(e) {
    const n = r(e).read();
    return s(n);
  }
  function Gn(e) {
    return r(e).readyState;
  }
  function Hn(e, n) {
    const _ = r(n).reason, t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    u().setInt32(e + 4 * 1, c, true), u().setInt32(e + 4 * 0, t, true);
  }
  function Jn(e) {
    r(e).releaseLock();
  }
  function Kn() {
    return d(function(e, n, _, t) {
      r(e).removeEventListener(h(n, _), r(t));
    }, arguments);
  }
  function Xn() {
    return d(function() {
      const e = module.require;
      return s(e);
    }, arguments);
  }
  function Yn(e) {
    const n = Promise.resolve(r(e));
    return s(n);
  }
  function Qn() {
    return d(function(e, n) {
      r(e).respond(n >>> 0);
    }, arguments);
  }
  function Zn() {
    return d(function(e, n, _) {
      r(e).send(h(n, _));
    }, arguments);
  }
  function e_() {
    return d(function(e, n, _) {
      r(e).send(F(n, _));
    }, arguments);
  }
  function n_(e, n) {
    const _ = setTimeout(r(e), n);
    return s(_);
  }
  function __() {
    return d(function(e, n, _) {
      const t = r(e).setTimeout(w(n), _);
      return s(t);
    }, arguments);
  }
  function t_(e, n, _) {
    r(e).set(F(n, _));
  }
  function r_(e, n, _) {
    r(e)[w(n)] = w(_);
  }
  function c_(e, n) {
    r(e).binaryType = ot[n];
  }
  function o_(e, n) {
    r(e).body = r(n);
  }
  function s_(e, n) {
    r(e).cache = st[n];
  }
  function i_(e, n) {
    r(e).credentials = it[n];
  }
  function a_(e, n, _) {
    r(e)[n >>> 0] = w(_);
  }
  function b_(e, n) {
    r(e).handleEvent = r(n);
  }
  function u_(e, n) {
    r(e).headers = r(n);
  }
  function d_(e, n) {
    r(e).highWaterMark = n;
  }
  function f_(e, n, _) {
    r(e).method = h(n, _);
  }
  function g_(e, n) {
    r(e).mode = at[n];
  }
  function w_(e, n) {
    r(e).onclose = r(n);
  }
  function l_(e, n) {
    r(e).onerror = r(n);
  }
  function h_(e, n) {
    r(e).onmessage = r(n);
  }
  function p_(e, n) {
    r(e).onopen = r(n);
  }
  function m_(e, n) {
    r(e).signal = r(n);
  }
  function y_(e) {
    const n = r(e).signal;
    return s(n);
  }
  function x_(e, n) {
    const _ = r(n).stack, t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    u().setInt32(e + 4 * 1, c, true), u().setInt32(e + 4 * 0, t, true);
  }
  function S_() {
    const e = typeof global > "u" ? null : global;
    return x(e) ? 0 : s(e);
  }
  function v_() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return x(e) ? 0 : s(e);
  }
  function k_() {
    const e = typeof self > "u" ? null : self;
    return x(e) ? 0 : s(e);
  }
  function I_() {
    const e = typeof window > "u" ? null : window;
    return x(e) ? 0 : s(e);
  }
  function R_(e) {
    return r(e).status;
  }
  function T_(e, n, _) {
    const t = r(e).subarray(n >>> 0, _ >>> 0);
    return s(t);
  }
  function j_(e, n, _) {
    const t = r(e).then(r(n), r(_));
    return s(t);
  }
  function A_(e, n) {
    const _ = r(e).then(r(n));
    return s(_);
  }
  function F_(e, n) {
    const _ = r(n).url, t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    u().setInt32(e + 4 * 1, c, true), u().setInt32(e + 4 * 0, t, true);
  }
  function C_(e, n) {
    const _ = r(n).url, t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    u().setInt32(e + 4 * 1, c, true), u().setInt32(e + 4 * 0, t, true);
  }
  function E_(e) {
    const n = r(e).value;
    return s(n);
  }
  function O_(e) {
    const n = r(e).versions;
    return s(n);
  }
  function L_(e) {
    const n = r(e).view;
    return x(n) ? 0 : s(n);
  }
  function M_(e, n) {
    var _ = N(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.warn(..._);
  }
  function q_(e) {
    return r(e).wasClean;
  }
  function B_(e, n) {
    const _ = R(e, n, nt);
    return s(_);
  }
  function N_(e, n) {
    const _ = R(e, n, rt);
    return s(_);
  }
  function U_(e, n) {
    const _ = R(e, n, _t);
    return s(_);
  }
  function $_(e, n) {
    const _ = R(e, n, tt);
    return s(_);
  }
  function z_(e, n) {
    const _ = R(e, n, Y_);
    return s(_);
  }
  function W_(e, n) {
    const _ = R(e, n, Q_);
    return s(_);
  }
  function D_(e, n) {
    const _ = ut(e, n, Z_);
    return s(_);
  }
  function P_(e, n) {
    const _ = R(e, n, et);
    return s(_);
  }
  function V_(e) {
    return s(e);
  }
  function G_(e, n) {
    const _ = F(e, n);
    return s(_);
  }
  function H_(e, n) {
    const _ = h(e, n);
    return s(_);
  }
  function J_(e) {
    const n = BigInt.asUintN(64, e);
    return s(n);
  }
  function K_(e) {
    const n = r(e);
    return s(n);
  }
  function X_(e) {
    w(e);
  }
  function Y_(e, n) {
    o.__wasm_bindgen_func_elem_7529(e, n);
  }
  function Q_(e, n) {
    o.__wasm_bindgen_func_elem_8662(e, n);
  }
  function Z_(e, n) {
    o.__wasm_bindgen_func_elem_8715(e, n);
  }
  function et(e, n) {
    o.__wasm_bindgen_func_elem_16630(e, n);
  }
  function nt(e, n, _) {
    o.__wasm_bindgen_func_elem_7747(e, n, s(_));
  }
  function _t(e, n, _) {
    o.__wasm_bindgen_func_elem_4305(e, n, s(_));
  }
  function tt(e, n, _) {
    o.__wasm_bindgen_func_elem_9408(e, n, s(_));
  }
  function rt(e, n, _) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.__wasm_bindgen_func_elem_16761(a, e, n, s(_));
      var t = u().getInt32(a + 4 * 0, true), c = u().getInt32(a + 4 * 1, true);
      if (c) throw w(t);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function ct(e, n, _, t) {
    o.__wasm_bindgen_func_elem_16768(e, n, s(_), s(t));
  }
  const ot = [
    "blob",
    "arraybuffer"
  ], st = [
    "default",
    "no-store",
    "reload",
    "no-cache",
    "force-cache",
    "only-if-cached"
  ], it = [
    "omit",
    "same-origin",
    "include"
  ], at = [
    "same-origin",
    "no-cors",
    "cors",
    "navigate"
  ], K = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channel_free(e, 1)), X = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channelsender_free(e, 1)), Y = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_chatnode_free(e, 1));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingbytesource_free(e, 1));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingsink_free(e, 1));
  const Q = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_intounderlyingsource_free(e, 1));
  function s(e) {
    O === k.length && k.push(k.length + 1);
    const n = O;
    return O = k[n], k[n] = e, n;
  }
  const D = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbindgen_export5(e.a, e.b));
  function J(e) {
    const n = typeof e;
    if (n == "number" || n == "boolean" || e == null) return `${e}`;
    if (n == "string") return `"${e}"`;
    if (n == "symbol") {
      const c = e.description;
      return c == null ? "Symbol" : `Symbol(${c})`;
    }
    if (n == "function") {
      const c = e.name;
      return typeof c == "string" && c.length > 0 ? `Function(${c})` : "Function";
    }
    if (Array.isArray(e)) {
      const c = e.length;
      let a = "[";
      c > 0 && (a += J(e[0]));
      for (let b = 1; b < c; b++) a += ", " + J(e[b]);
      return a += "]", a;
    }
    const _ = /\[object ([^\]]+)\]/.exec(toString.call(e));
    let t;
    if (_ && _.length > 1) t = _[1];
    else return toString.call(e);
    if (t == "Object") try {
      return "Object(" + JSON.stringify(e) + ")";
    } catch {
      return "Object";
    }
    return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : t;
  }
  function bt(e) {
    e < 1028 || (k[e] = O, O = e);
  }
  function N(e, n) {
    e = e >>> 0;
    const _ = u(), t = [];
    for (let c = e; c < e + 4 * n; c += 4) t.push(w(_.getUint32(c, true)));
    return t;
  }
  function F(e, n) {
    return e = e >>> 0, E().subarray(e / 1, e / 1 + n);
  }
  let j = null;
  function u() {
    return (j === null || j.buffer.detached === true || j.buffer.detached === void 0 && j.buffer !== o.memory.buffer) && (j = new DataView(o.memory.buffer)), j;
  }
  function h(e, n) {
    return ft(e >>> 0, n);
  }
  let z = null;
  function E() {
    return (z === null || z.byteLength === 0) && (z = new Uint8Array(o.memory.buffer)), z;
  }
  function r(e) {
    return k[e];
  }
  function d(e, n) {
    try {
      return e.apply(this, n);
    } catch (_) {
      o.__wbindgen_export3(s(_));
    }
  }
  let k = new Array(1024).fill(void 0);
  k.push(void 0, null, true, false);
  let O = k.length;
  function x(e) {
    return e == null;
  }
  function ut(e, n, _) {
    const t = {
      a: e,
      b: n,
      cnt: 1
    }, c = (...a) => {
      t.cnt++;
      try {
        return _(t.a, t.b, ...a);
      } finally {
        c._wbg_cb_unref();
      }
    };
    return c._wbg_cb_unref = () => {
      --t.cnt === 0 && (o.__wbindgen_export5(t.a, t.b), t.a = 0, D.unregister(t));
    }, D.register(c, t, t), c;
  }
  function R(e, n, _) {
    const t = {
      a: e,
      b: n,
      cnt: 1
    }, c = (...a) => {
      t.cnt++;
      const b = t.a;
      t.a = 0;
      try {
        return _(b, t.b, ...a);
      } finally {
        t.a = b, c._wbg_cb_unref();
      }
    };
    return c._wbg_cb_unref = () => {
      --t.cnt === 0 && (o.__wbindgen_export5(t.a, t.b), t.a = 0, D.unregister(t));
    }, D.register(c, t, t), c;
  }
  function m(e, n, _) {
    if (_ === void 0) {
      const g = L.encode(e), y = n(g.length, 1) >>> 0;
      return E().subarray(y, y + g.length).set(g), p = g.length, y;
    }
    let t = e.length, c = n(t, 1) >>> 0;
    const a = E();
    let b = 0;
    for (; b < t; b++) {
      const g = e.charCodeAt(b);
      if (g > 127) break;
      a[c + b] = g;
    }
    if (b !== t) {
      b !== 0 && (e = e.slice(b)), c = _(c, t, t = b + e.length * 3, 1) >>> 0;
      const g = E().subarray(c + b, c + t), y = L.encodeInto(e, g);
      b += y.written, c = _(c, t, b, 1) >>> 0;
    }
    return p = b, c;
  }
  function w(e) {
    const n = r(e);
    return bt(e), n;
  }
  let W = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  W.decode();
  const dt = 2146435072;
  let G = 0;
  function ft(e, n) {
    return G += n, G >= dt && (W = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), W.decode(), G = n), W.decode(E().subarray(e, e + n));
  }
  const L = new TextEncoder();
  "encodeInto" in L || (L.encodeInto = function(e, n) {
    const _ = L.encode(e);
    return n.set(_), {
      read: e.length,
      written: _.length
    };
  });
  let p = 0, o;
  function gt(e) {
    o = e;
  }
  URL = globalThis.URL;
  const i = await ce({
    "./chat_browser_bg.js": {
      __wbg_channel_new: Oe,
      __wbg_chatnode_new: Le,
      __wbindgen_object_clone_ref: K_,
      __wbindgen_object_drop_ref: X_,
      __wbg_set_dca99999bba88a9a: a_,
      __wbg_get_with_ref_key_6412cf3094599694: cn,
      __wbg_set_6be42768c690e380: r_,
      __wbg_get_2b48c7d0d006a781: nn,
      __wbg_String_8564e559799eccda: se,
      __wbg_new_227d7c05414eb861: mn,
      __wbg_stack_3b0d974bbf31e44f: x_,
      __wbg_error_a6fa202b58aa1cd3: Ke,
      __wbg_log_7a0760e115750083: wn,
      __wbg_warn_3a37cdd7216f1479: M_,
      __wbg_debug_eaef3b49d572d680: Pe,
      __wbg_error_71b0e71161a5f3a0: Je,
      __wbg_push_a6822215aa43e71c: zn,
      __wbg_next_eb8ca7351fa27906: On,
      __wbg_done_60cf307fcc680536: Ve,
      __wbg_value_f3625092ee4b37f4: E_,
      __wbg_setTimeout_3a808dd861dd3c12: n_,
      __wbg_clearTimeout_333bba87532ab9d3: Me,
      __wbg_fetch_074561c3e313c86f: Xe,
      __wbg_getReader_9facd4f899beac89: en,
      __wbg_new_with_into_underlying_source_fd904252f385f59c: An,
      __wbg_then_18f476d590e58992: j_,
      __wbg_catch_17ae9c6dfb88ad8a: Ee,
      __wbg_call_9c758de292015997: Fe,
      __wbg_new_typed_bf31d18f92484486: Tn,
      __wbg_new_e436d06bc8e77460: In,
      __wbg_append_e1746995edcb0170: ve,
      __wbg_entries_18ec04521d5991e6: He,
      __wbg_new_with_str_and_init_bcd02b79a793d27f: Cn,
      __wbg_instanceof_Response_cb984bd66d7bd408: un,
      __wbg_arrayBuffer_05927079aabe6d46: ke,
      __wbg_url_6808f1c468f2d0cd: F_,
      __wbg_body_61a0827da5b6d2bc: Ie,
      __wbg_status_00549d55b78d949e: R_,
      __wbg_headers_0feb63d2d374b44a: sn,
      __wbg_set_onopen_db452f4233e99d7d: p_,
      __wbg_readyState_490503c1fa8f8dd6: Gn,
      __wbg_set_onclose_13787fb31ae8aefd: w_,
      __wbg_set_onerror_5a45265839edf1b1: l_,
      __wbg_send_35647f35f8bdac5d: Zn,
      __wbg_set_onmessage_9c6b4cb14e244b7f: h_,
      __wbg_set_binaryType_41994c453b95bdd2: c_,
      __wbg_send_4a773f523104d75e: e_,
      __wbg_new_with_str_sequence_9ed2327430efed8d: En,
      __wbg_new_d7e476b433a26bea: vn,
      __wbg_url_8b9d120d9dc02d8f: C_,
      __wbg_close_9acc00cbca310439: Ue,
      __wbg_protocol_563b94a4dcfb4d0d: Un,
      __wbg_code_27a1f220ebdc7c36: $e,
      __wbg_reason_4624d424a130e5b2: Hn,
      __wbg_wasClean_9636ab9b65f5dbb9: q_,
      __wbg_addEventListener_b8b20954e04ea19f: Se,
      __wbg_removeEventListener_2da8e9960f90ab27: Kn,
      __wbg_set_method_7a6811dec7a4feff: f_,
      __wbg_set_signal_d9da62b3f215c821: m_,
      __wbg_set_headers_7c1e39ece7826bec: u_,
      __wbg_set_credentials_fa9c491a27c4bdf0: i_,
      __wbg_set_body_36614c7e61546809: o_,
      __wbg_set_mode_c90e3667002857d4: g_,
      __wbg_set_cache_488ea16c11cbf20d: s_,
      __wbg_code_dcc2ccc631d1fc5c: ze,
      __wbg_message_60b50f96f056eb26: ln,
      __wbg_data_bd354b70c783c66e: De,
      __wbg_set_handle_event_ae2ef577ff53b168: b_,
      __wbg_abort_b29d719932441c95: xe,
      __wbg_new_0d09705104e164af: pn,
      __wbg_abort_2ec46222bf378517: ye,
      __wbg_signal_e03304a84df9ed09: y_,
      __wbg_set_high_water_mark_cf5739ae16ac842f: d_,
      __wbg_fetch_344c8d3849002659: Ye,
      __wbg_get_done_ea9eb315d4ec1e81: tn,
      __wbg_get_value_c68fe2e1a76c69ca: rn,
      __wbg_respond_33b6f330b6d299fd: Qn,
      __wbg_view_d523e3b92648b62c: L_,
      __wbg_releaseLock_cd76770b7f82a961: Jn,
      __wbg_read_282e152a24fd0856: Vn,
      __wbg_cancel_3dedc1c2245a59d4: Ce,
      __wbg_byobRequest_2c89fb4ab478fa09: Te,
      __wbg_close_4859304bbf0f8208: Be,
      __wbg_enqueue_09035479e2081625: Ge,
      __wbg_close_6f12196fe155e8d2: Ne,
      __wbg_instanceof_Blob_f6321ce92d2740fd: bn,
      __wbg_crypto_38df2bab126b63dc: We,
      __wbg_process_44c7a14e11e9f69e: Nn,
      __wbg_versions_276b2795b1c6a219: O_,
      __wbg_node_84ea875411254db1: Ln,
      __wbg_require_b4edbdcf3e2a1ef0: Xn,
      __wbg_msCrypto_bd5a034af96bcba6: hn,
      __wbg_getRandomValues_c44a50d8cfdaebeb: Ze,
      __wbg_randomFillSync_6c25eac9869eb53c: Pn,
      __wbg_setTimeout_6613a51400c1bf9f: __,
      __wbg_clearTimeout_47a40e3be01ed7a3: qe,
      __wbg_performance_3fcf6e32a7e1ed0a: Bn,
      __wbg_now_e7c6795a7f81e10f: qn,
      __wbg_byteLength_2c6dc3b4b85d3547: je,
      __wbg_byteOffset_349aa9bf0a183eca: Ae,
      __wbg_new_from_slice_18fa1f71286d66b8: Rn,
      __wbg_new_with_length_36a4998e27b014c5: Fn,
      __wbg_new_with_byte_offset_and_length_d836f26d916dd9ad: jn,
      __wbg_new_578aeef4b6b94378: xn,
      __wbg_buffer_d370c8cae5692933: Re,
      __wbg_length_4a591ecaa01354d9: gn,
      __wbg_prototypesetcall_3249fc62a0fafa30: $n,
      __wbg_subarray_4aa221f6a4f5ab22: T_,
      __wbg_set_29c99a8aac1c01e5: t_,
      __wbg_then_ac7b025999b52837: A_,
      __wbg_instanceof_Uint8Array_86f30649f63ef9c2: dn,
      __wbg_instanceof_ArrayBuffer_8f49811467741499: an,
      __wbg_now_190933fa139cc119: Mn,
      __wbg_new_d90091b82fdf5b91: kn,
      __wbg_isArray_67c2c9c4313f4448: fn,
      __wbg_new_50bb5ebeecef71a8: yn,
      __wbg_new_ce1ab61c1c2b300d: Sn,
      __wbg_static_accessor_GLOBAL_THIS_a1a35cec07001a8a: v_,
      __wbg_static_accessor_SELF_4c59f6c7ea29a144: k_,
      __wbg_static_accessor_GLOBAL_9d53f2689e622ca1: S_,
      __wbg_static_accessor_WINDOW_e70ae9f2eb052253: I_,
      __wbg_resolve_25a7e548d5881dca: Yn,
      __wbg_get_de6a0f7d4d18a304: _n,
      __wbg_has_73740b27f436fed3: on,
      __wbg_queueMicrotask_35c611f4a14830b2: Wn,
      __wbg_queueMicrotask_404ed0a58e0b63cc: Dn,
      __wbg_getRandomValues_76dfc69825c9c552: Qe,
      __wbg___wbindgen_in_70a403a56e771704: be,
      __wbg___wbindgen_throw_1506f2235d1bdba0: pe,
      __wbg_Error_ef53bc310eb298a0: oe,
      __wbg___wbindgen_is_object_56732c2bc353f41d: de,
      __wbg___wbindgen_is_string_c236cabd84a4d769: fe,
      __wbg___wbindgen_number_get_9bb1761122181af2: le,
      __wbg___wbindgen_string_get_72bdf95d3ae505b1: he,
      __wbg___wbindgen_boolean_get_1a45e2c38d4d41b9: ie,
      __wbg___wbindgen_is_function_754e9f305ff6029e: ue,
      __wbg___wbindgen_is_undefined_67b456be8673d3d7: ge,
      __wbg___wbindgen_jsval_loose_eq_2c56564c75129511: we,
      __wbg__wbg_cb_unref_61db23ac97f16c31: me,
      __wbg___wbindgen_debug_string_0accd80f45e5faa2: ae,
      __wbindgen_cast_0000000000000001: B_,
      __wbindgen_cast_0000000000000002: N_,
      __wbindgen_cast_0000000000000003: U_,
      __wbindgen_cast_0000000000000004: $_,
      __wbindgen_cast_0000000000000005: z_,
      __wbindgen_cast_0000000000000006: W_,
      __wbindgen_cast_0000000000000007: D_,
      __wbindgen_cast_0000000000000008: P_,
      __wbindgen_cast_0000000000000009: V_,
      __wbindgen_cast_000000000000000a: G_,
      __wbindgen_cast_000000000000000b: H_,
      __wbindgen_cast_000000000000000c: J_
    }
  }, re), wt = i.memory, lt = i.__wbg_channel_free, ht = i.__wbg_channelsender_free, pt = i.__wbg_chatnode_free, mt = i.channel_id, yt = i.channel_neighbors, xt = i.channel_receiver, St = i.channel_sender, vt = i.channel_ticket, kt = i.channelsender_broadcast, It = i.channelsender_set_nickame, Rt = i.chatnode_create, Tt = i.chatnode_endpoint_id, jt = i.chatnode_join, At = i.chatnode_spawn, Ft = i.start, Ct = i.__wbg_intounderlyingbytesource_free, Et = i.__wbg_intounderlyingsink_free, Ot = i.__wbg_intounderlyingsource_free, Lt = i.intounderlyingbytesource_autoAllocateChunkSize, Mt = i.intounderlyingbytesource_cancel, qt = i.intounderlyingbytesource_pull, Bt = i.intounderlyingbytesource_start, Nt = i.intounderlyingbytesource_type, Ut = i.intounderlyingsink_abort, $t = i.intounderlyingsink_close, zt = i.intounderlyingsink_write, Wt = i.intounderlyingsource_cancel, Dt = i.intounderlyingsource_pull, Pt = i.ring_core_0_17_14__bn_mul_mont, Vt = i.__wasm_bindgen_func_elem_16761, Gt = i.__wasm_bindgen_func_elem_16768, Ht = i.__wasm_bindgen_func_elem_7747, Jt = i.__wasm_bindgen_func_elem_4305, Kt = i.__wasm_bindgen_func_elem_9408, Xt = i.__wasm_bindgen_func_elem_7529, Yt = i.__wasm_bindgen_func_elem_8662, Qt = i.__wasm_bindgen_func_elem_8715, Zt = i.__wasm_bindgen_func_elem_16630, er = i.__wbindgen_export, nr = i.__wbindgen_export2, _r = i.__wbindgen_export3, tr = i.__wbindgen_export4, rr = i.__wbindgen_export5, cr = i.__wbindgen_add_to_stack_pointer, ee = i.__wbindgen_start, or = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wasm_bindgen_func_elem_16630: Zt,
    __wasm_bindgen_func_elem_16761: Vt,
    __wasm_bindgen_func_elem_16768: Gt,
    __wasm_bindgen_func_elem_4305: Jt,
    __wasm_bindgen_func_elem_7529: Xt,
    __wasm_bindgen_func_elem_7747: Ht,
    __wasm_bindgen_func_elem_8662: Yt,
    __wasm_bindgen_func_elem_8715: Qt,
    __wasm_bindgen_func_elem_9408: Kt,
    __wbg_channel_free: lt,
    __wbg_channelsender_free: ht,
    __wbg_chatnode_free: pt,
    __wbg_intounderlyingbytesource_free: Ct,
    __wbg_intounderlyingsink_free: Et,
    __wbg_intounderlyingsource_free: Ot,
    __wbindgen_add_to_stack_pointer: cr,
    __wbindgen_export: er,
    __wbindgen_export2: nr,
    __wbindgen_export3: _r,
    __wbindgen_export4: tr,
    __wbindgen_export5: rr,
    __wbindgen_start: ee,
    channel_id: mt,
    channel_neighbors: yt,
    channel_receiver: xt,
    channel_sender: St,
    channel_ticket: vt,
    channelsender_broadcast: kt,
    channelsender_set_nickame: It,
    chatnode_create: Rt,
    chatnode_endpoint_id: Tt,
    chatnode_join: jt,
    chatnode_spawn: At,
    intounderlyingbytesource_autoAllocateChunkSize: Lt,
    intounderlyingbytesource_cancel: Mt,
    intounderlyingbytesource_pull: qt,
    intounderlyingbytesource_start: Bt,
    intounderlyingbytesource_type: Nt,
    intounderlyingsink_abort: Ut,
    intounderlyingsink_close: $t,
    intounderlyingsink_write: zt,
    intounderlyingsource_cancel: Wt,
    intounderlyingsource_pull: Dt,
    memory: wt,
    ring_core_0_17_14__bn_mul_mont: Pt,
    start: Ft
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  gt(or);
  ee();
  ne = class {
    constructor(n) {
      __publicField(this, "chatNode");
      __publicField(this, "channels", /* @__PURE__ */ new Map());
      this.chatNode = n;
    }
    static async create() {
      C.info("Spawning iroh node");
      const n = await A.spawn();
      return C.info(`Iroh node spawned. our endpoint id: ${n.endpoint_id()}`), new ne(n);
    }
    async createChannel(n) {
      const _ = await this.chatNode.create(n);
      return this.joinInner(_, n);
    }
    async joinChannel(n, _) {
      const t = await this.chatNode.join(n, _);
      return this.joinInner(t, _);
    }
    joinInner(n, _) {
      const t = n.id();
      C.info(`joining channel ${t}`);
      const c = t.substring(5, 13);
      let a, b = new Promise((T) => {
        a = T;
      });
      const g = this.chatNode.endpoint_id(), y = {
        id: g,
        name: _,
        lastSeen: /* @__PURE__ */ new Date(),
        status: "online",
        role: V.Myself
      }, f = {
        label: c,
        messages: [],
        channel: n,
        subscribers: [],
        peers: /* @__PURE__ */ new Map(),
        nextId: 0,
        neighbors: 0,
        neighborSubscribers: [],
        peerSubscribers: [],
        myself: y,
        onClose: a
      };
      f.peers.set(g, y), this.channels.set(t, f);
      const I = async () => {
        const T = n.receiver.getReader();
        for (; ; ) {
          const { done: S, value: U } = await T.read();
          if (S) break;
          const l = U;
          if (console.debug("channel event", t.substring(0, 8), l), l.type === "messageReceived") {
            const v = {
              id: l.from,
              name: l.nickname,
              lastSeen: new Date(l.sentTimestamp / 1e3),
              status: "online",
              role: V.RemoteNode
            };
            f.peers.set(l.from, v);
            const $ = {
              id: Z(f),
              sender: l.from,
              content: l.text
            };
            f.messages.push($);
            const te = H(f, $);
            for (const P of f.subscribers) P(te);
            for (const P of f.peerSubscribers) P();
          } else if (l.type === "presence") {
            const v = {
              id: l.from,
              name: l.nickname,
              lastSeen: new Date(l.sentTimestamp / 1e3),
              status: "online",
              role: V.RemoteNode
            };
            f.peers.set(l.from, v);
            for (const $ of f.peerSubscribers) $();
          } else if (l.type === "joined") {
            C.info(`joined channel ${t}`), f.neighbors += l.neighbors.length;
            for (const v of f.neighborSubscribers) v(f.neighbors);
          } else if (l.type === "neighborUp") {
            f.neighbors += 1;
            for (const v of f.neighborSubscribers) v(f.neighbors);
          } else if (l.type === "neighborDown") {
            f.neighbors -= 1;
            for (const v of f.neighborSubscribers) v(f.neighbors);
          }
        }
      }, _e = async () => {
        for (; ; ) {
          const T = /* @__PURE__ */ new Date();
          for (const S of f.peers.values()) {
            if (S.id === g) {
              S.lastSeen = T;
              continue;
            }
            const U = (T.getTime() - S.lastSeen.getTime()) / 1e3;
            U > 20 ? S.status = "offline" : U > 10 ? S.status = "away" : S.status = "online";
          }
          await new Promise((S) => setTimeout(S, 1e3));
        }
      };
      return Promise.race([
        b,
        I(),
        _e()
      ]), {
        id: t,
        name: c
      };
    }
    getMyself(n) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return {
        ..._.myself
      };
    }
    getTicket(n, _) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return t.channel.ticket(_);
    }
    async closeChannel(n) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      _.onClose(), this.channels.delete(n);
    }
    async sendMessage(n, _) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      await t.channel.sender.broadcast(_);
      const a = {
        sender: this.chatNode.endpoint_id(),
        id: Z(t),
        content: _
      };
      t.messages.push(a);
      const b = H(t, a);
      for (const g of t.subscribers) g(b);
    }
    setNickname(n, _) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      console.log("state", t), C.info(`changing nickname from ${t.myself.name} to ${_}`), t.myself.name = _, t.channel.sender.set_nickame(_);
      for (const c of t.peerSubscribers) c();
    }
    getMessages(n) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return _.messages.map((c) => H(_, c));
    }
    getPeers(n) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return Array.from(_.peers.values());
    }
    subscribeToMessages(n, _) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return t.subscribers.push(_), () => {
        t.subscribers = t.subscribers.filter((c) => c != _);
      };
    }
    subscribeToNeighbors(n, _) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return _(t.neighbors), t.neighborSubscribers.push(_), () => {
        t.neighborSubscribers = t.neighborSubscribers.filter((c) => c != _);
      };
    }
    subscribeToPeers(n, _) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return t.peerSubscribers.push(_), () => {
        t.peerSubscribers = t.peerSubscribers.filter((c) => c != _);
      };
    }
  };
  function sr(e, n) {
    const _ = e.peers.get(n);
    return _ && _.name ? _.name : n.substring(0, 8);
  }
  function H(e, n) {
    return {
      ...n,
      nickname: sr(e, n.sender)
    };
  }
  function Z(e) {
    const n = "" + e.nextId;
    return e.nextId = e.nextId + 1, n;
  }
});
export {
  ne as IrohAPI,
  __tla
};
