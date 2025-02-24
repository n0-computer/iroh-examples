var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { l as j, __tla as __tla_0 } from "./index-dw3IOSXq.js";
let K;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const Y = "" + new URL("chat_browser_bg-CJHxUcb7.wasm", import.meta.url).href, Z = async (e = {}, n) => {
    let t;
    if (n.startsWith("data:")) {
      const _ = n.replace(/^data:.*?base64,/, "");
      let r;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") r = Buffer.from(_, "base64");
      else if (typeof atob == "function") {
        const s = atob(_);
        r = new Uint8Array(s.length);
        for (let a = 0; a < s.length; a++) r[a] = s.charCodeAt(a);
      } else throw new Error("Cannot decode base64-encoded data URL");
      t = await WebAssembly.instantiate(r, e);
    } else {
      const _ = await fetch(n), r = _.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && r.startsWith("application/wasm")) t = await WebAssembly.instantiateStreaming(_, e);
      else {
        const s = await _.arrayBuffer();
        t = await WebAssembly.instantiate(s, e);
      }
    }
    return t.instance.exports;
  };
  let o;
  function ee(e) {
    o = e;
  }
  let w = 0, A = null;
  function R() {
    return (A === null || A.byteLength === 0) && (A = new Uint8Array(o.memory.buffer)), A;
  }
  const ne = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
  let C = new ne("utf-8");
  const te = typeof C.encodeInto == "function" ? function(e, n) {
    return C.encodeInto(e, n);
  } : function(e, n) {
    const t = C.encode(e);
    return n.set(t), {
      read: e.length,
      written: t.length
    };
  };
  function p(e, n, t) {
    if (t === void 0) {
      const i = C.encode(e), g = n(i.length, 1) >>> 0;
      return R().subarray(g, g + i.length).set(i), w = i.length, g;
    }
    let _ = e.length, r = n(_, 1) >>> 0;
    const s = R();
    let a = 0;
    for (; a < _; a++) {
      const i = e.charCodeAt(a);
      if (i > 127) break;
      s[r + a] = i;
    }
    if (a !== _) {
      a !== 0 && (e = e.slice(a)), r = t(r, _, _ = a + e.length * 3, 1) >>> 0;
      const i = R().subarray(r + a, r + _), g = te(e, i);
      a += g.written, r = t(r, _, a, 1) >>> 0;
    }
    return w = a, r;
  }
  let I = null;
  function b() {
    return (I === null || I.buffer.detached === true || I.buffer.detached === void 0 && I.buffer !== o.memory.buffer) && (I = new DataView(o.memory.buffer)), I;
  }
  const _e = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
  let H = new _e("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  H.decode();
  function f(e, n) {
    return e = e >>> 0, H.decode(R().subarray(e, e + n));
  }
  function x(e) {
    const n = o.__wbindgen_export_3();
    return o.__wbindgen_export_4.set(n, e), n;
  }
  function u(e, n) {
    try {
      return e.apply(this, n);
    } catch (t) {
      const _ = x(t);
      o.__wbindgen_export_2(_);
    }
  }
  function l(e) {
    return e == null;
  }
  function S(e, n) {
    e = e >>> 0;
    const t = b(), _ = [];
    for (let r = e; r < e + 4 * n; r += 4) _.push(o.__wbindgen_export_4.get(t.getUint32(r, true)));
    return o.__wbindgen_export_5(e, n), _;
  }
  function re(e, n) {
    return e = e >>> 0, R().subarray(e / 1, e / 1 + n);
  }
  const W = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => {
    o.__wbindgen_export_7.get(e.dtor)(e.a, e.b);
  });
  function T(e, n, t, _) {
    const r = {
      a: e,
      b: n,
      cnt: 1,
      dtor: t
    }, s = (...a) => {
      r.cnt++;
      const i = r.a;
      r.a = 0;
      try {
        return _(i, r.b, ...a);
      } finally {
        --r.cnt === 0 ? (o.__wbindgen_export_7.get(r.dtor)(i, r.b), W.unregister(r)) : r.a = i;
      }
    };
    return s.original = r, W.register(s, r, r), s;
  }
  function q(e) {
    const n = typeof e;
    if (n == "number" || n == "boolean" || e == null) return `${e}`;
    if (n == "string") return `"${e}"`;
    if (n == "symbol") {
      const r = e.description;
      return r == null ? "Symbol" : `Symbol(${r})`;
    }
    if (n == "function") {
      const r = e.name;
      return typeof r == "string" && r.length > 0 ? `Function(${r})` : "Function";
    }
    if (Array.isArray(e)) {
      const r = e.length;
      let s = "[";
      r > 0 && (s += q(e[0]));
      for (let a = 1; a < r; a++) s += ", " + q(e[a]);
      return s += "]", s;
    }
    const t = /\[object ([^\]]+)\]/.exec(toString.call(e));
    let _;
    if (t && t.length > 1) _ = t[1];
    else return toString.call(e);
    if (_ == "Object") try {
      return "Object(" + JSON.stringify(e) + ")";
    } catch {
      return "Object";
    }
    return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : _;
  }
  function U(e) {
    const n = o.__wbindgen_export_4.get(e);
    return o.__wbindgen_export_8(e), n;
  }
  function O(e, n, t) {
    o.closure855_externref_shim(e, n, t);
  }
  function oe(e, n) {
    o.__wbindgen_export_10(e, n);
  }
  function ce(e, n, t) {
    o.closure2790_externref_shim(e, n, t);
  }
  function se(e, n, t, _) {
    o.closure2895_externref_shim(e, n, t, _);
  }
  const ie = [
    "blob",
    "arraybuffer"
  ], ae = [
    "omit",
    "same-origin",
    "include"
  ], be = [
    "same-origin",
    "no-cors",
    "cors",
    "navigate"
  ], D = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channel_free(e >>> 0, 1));
  class E {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(E.prototype);
      return t.__wbg_ptr = n, D.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, D.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_channel_free(n, 0);
    }
    get sender() {
      const n = o.channel_sender(this.__wbg_ptr);
      return z.__wrap(n);
    }
    get receiver() {
      return o.channel_receiver(this.__wbg_ptr);
    }
    ticket(n) {
      let t, _;
      try {
        const y = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_ticket(y, this.__wbg_ptr, n);
        var r = b().getInt32(y + 4 * 0, true), s = b().getInt32(y + 4 * 1, true), a = b().getInt32(y + 4 * 2, true), i = b().getInt32(y + 4 * 3, true), g = r, v = s;
        if (i) throw g = 0, v = 0, U(a);
        return t = g, _ = v, f(g, v);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export_6(t, _, 1);
      }
    }
    id() {
      let n, t;
      try {
        const s = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_id(s, this.__wbg_ptr);
        var _ = b().getInt32(s + 4 * 0, true), r = b().getInt32(s + 4 * 1, true);
        return n = _, t = r, f(_, r);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export_6(n, t, 1);
      }
    }
    neighbors() {
      try {
        const r = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_neighbors(r, this.__wbg_ptr);
        var n = b().getInt32(r + 4 * 0, true), t = b().getInt32(r + 4 * 1, true), _ = S(n, t).slice();
        return o.__wbindgen_export_6(n, t * 4, 4), _;
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  const P = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channelsender_free(e >>> 0, 1));
  class z {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(z.prototype);
      return t.__wbg_ptr = n, P.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, P.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_channelsender_free(n, 0);
    }
    broadcast(n) {
      const t = p(n, o.__wbindgen_export_0, o.__wbindgen_export_1), _ = w;
      return o.channelsender_broadcast(this.__wbg_ptr, t, _);
    }
  }
  const $ = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_chatnode_free(e >>> 0, 1));
  class L {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(L.prototype);
      return t.__wbg_ptr = n, $.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, $.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_chatnode_free(n, 0);
    }
    static spawn() {
      return o.chatnode_spawn();
    }
    node_id() {
      let n, t;
      try {
        const s = o.__wbindgen_add_to_stack_pointer(-16);
        o.chatnode_node_id(s, this.__wbg_ptr);
        var _ = b().getInt32(s + 4 * 0, true), r = b().getInt32(s + 4 * 1, true);
        return n = _, t = r, f(_, r);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export_6(n, t, 1);
      }
    }
    remote_info() {
      try {
        const r = o.__wbindgen_add_to_stack_pointer(-16);
        o.chatnode_remote_info(r, this.__wbg_ptr);
        var n = b().getInt32(r + 4 * 0, true), t = b().getInt32(r + 4 * 1, true), _ = S(n, t).slice();
        return o.__wbindgen_export_6(n, t * 4, 4), _;
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    create(n) {
      try {
        const s = o.__wbindgen_add_to_stack_pointer(-16), a = p(n, o.__wbindgen_export_0, o.__wbindgen_export_1), i = w;
        o.chatnode_create(s, this.__wbg_ptr, a, i);
        var t = b().getInt32(s + 4 * 0, true), _ = b().getInt32(s + 4 * 1, true), r = b().getInt32(s + 4 * 2, true);
        if (r) throw U(_);
        return E.__wrap(t);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    join(n, t) {
      try {
        const a = o.__wbindgen_add_to_stack_pointer(-16), i = p(n, o.__wbindgen_export_0, o.__wbindgen_export_1), g = w, v = p(t, o.__wbindgen_export_0, o.__wbindgen_export_1), y = w;
        o.chatnode_join(a, this.__wbg_ptr, i, g, v, y);
        var _ = b().getInt32(a + 4 * 0, true), r = b().getInt32(a + 4 * 1, true), s = b().getInt32(a + 4 * 2, true);
        if (s) throw U(r);
        return E.__wrap(_);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingbytesource_free(e >>> 0, 1));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingsink_free(e >>> 0, 1));
  const V = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_intounderlyingsource_free(e >>> 0, 1));
  class N {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(N.prototype);
      return t.__wbg_ptr = n, V.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, V.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_intounderlyingsource_free(n, 0);
    }
    pull(n) {
      return o.intounderlyingsource_pull(this.__wbg_ptr, n);
    }
    cancel() {
      const n = this.__destroy_into_raw();
      o.intounderlyingsource_cancel(n);
    }
  }
  function ue(e, n) {
    const t = String(n), _ = p(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = w;
    b().setInt32(e + 4 * 1, r, true), b().setInt32(e + 4 * 0, _, true);
  }
  function de(e) {
    e.abort();
  }
  function fe() {
    return u(function(e, n, t, _, r) {
      e.append(f(n, t), f(_, r));
    }, arguments);
  }
  function ge() {
    return u(function(e) {
      return e.arrayBuffer();
    }, arguments);
  }
  function we(e) {
    const n = e.body;
    return l(n) ? 0 : x(n);
  }
  function le(e) {
    return e.buffer;
  }
  function he(e) {
    return e.buffer;
  }
  function pe(e) {
    const n = e.byobRequest;
    return l(n) ? 0 : x(n);
  }
  function ye(e) {
    return e.byteLength;
  }
  function me(e) {
    return e.byteOffset;
  }
  function xe() {
    return u(function(e, n) {
      return e.call(n);
    }, arguments);
  }
  function ve() {
    return u(function(e, n, t) {
      return e.call(n, t);
    }, arguments);
  }
  function ke(e) {
    return e.cancel();
  }
  function Ie(e, n) {
    return e.catch(n);
  }
  function Se(e) {
    return L.__wrap(e);
  }
  function Te() {
    return u(function(e, n) {
      e.clearTimeout(n);
    }, arguments);
  }
  function Re() {
    return u(function(e) {
      e.close();
    }, arguments);
  }
  function Fe() {
    return u(function(e) {
      e.close();
    }, arguments);
  }
  function je() {
    return u(function(e) {
      e.close();
    }, arguments);
  }
  function Ae() {
    return u(function(e, n, t, _) {
      e.close(n, f(t, _));
    }, arguments);
  }
  function Ce(e) {
    return e.code;
  }
  function Ee(e) {
    return e.crypto;
  }
  function Oe(e) {
    return e.data;
  }
  function Le(e, n) {
    var t = S(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.debug(...t);
  }
  function Me(e) {
    return e.done;
  }
  function qe() {
    return u(function(e, n) {
      e.enqueue(n);
    }, arguments);
  }
  function Ue(e, n) {
    let t, _;
    try {
      t = e, _ = n, console.error(f(e, n));
    } finally {
      o.__wbindgen_export_6(t, _, 1);
    }
  }
  function ze(e, n) {
    var t = S(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.error(...t);
  }
  function Ne(e) {
    return fetch(e);
  }
  function Be(e, n) {
    return e.fetch(n);
  }
  function We() {
    return u(function(e, n) {
      e.getRandomValues(n);
    }, arguments);
  }
  function De() {
    return u(function(e) {
      return e.getReader();
    }, arguments);
  }
  function Pe(e) {
    return e.getTime();
  }
  function $e() {
    return u(function(e, n) {
      return Reflect.get(e, n);
    }, arguments);
  }
  function Ve(e) {
    const n = e.done;
    return l(n) ? 16777215 : n ? 1 : 0;
  }
  function Ge(e) {
    return e.value;
  }
  function He(e, n) {
    return e[n];
  }
  function Je() {
    return u(function(e, n) {
      return Reflect.has(e, n);
    }, arguments);
  }
  function Ke(e) {
    return e.headers;
  }
  function Qe(e) {
    let n;
    try {
      n = e instanceof ArrayBuffer;
    } catch {
      n = false;
    }
    return n;
  }
  function Xe(e) {
    let n;
    try {
      n = e instanceof Blob;
    } catch {
      n = false;
    }
    return n;
  }
  function Ye(e) {
    let n;
    try {
      n = e instanceof Response;
    } catch {
      n = false;
    }
    return n;
  }
  function Ze(e) {
    let n;
    try {
      n = e instanceof Uint8Array;
    } catch {
      n = false;
    }
    return n;
  }
  function en() {
    return Symbol.iterator;
  }
  function nn(e) {
    return e.length;
  }
  function tn(e, n) {
    var t = S(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.log(...t);
  }
  function _n(e) {
    return e.msCrypto;
  }
  function rn() {
    return /* @__PURE__ */ new Date();
  }
  function on() {
    return u(function() {
      return new Headers();
    }, arguments);
  }
  function cn(e, n) {
    try {
      var t = {
        a: e,
        b: n
      }, _ = (s, a) => {
        const i = t.a;
        t.a = 0;
        try {
          return se(i, t.b, s, a);
        } finally {
          t.a = i;
        }
      };
      return new Promise(_);
    } finally {
      t.a = t.b = 0;
    }
  }
  function sn() {
    return new Object();
  }
  function an() {
    return /* @__PURE__ */ new Map();
  }
  function bn() {
    return new Array();
  }
  function un() {
    return new Error();
  }
  function dn() {
    return u(function(e, n) {
      return new WebSocket(f(e, n));
    }, arguments);
  }
  function fn(e) {
    return new Uint8Array(e);
  }
  function gn(e, n) {
    return new Error(f(e, n));
  }
  function wn() {
    return u(function() {
      return new AbortController();
    }, arguments);
  }
  function ln(e, n) {
    return new Function(f(e, n));
  }
  function hn(e, n, t) {
    return new Uint8Array(e, n >>> 0, t >>> 0);
  }
  function pn(e, n) {
    return new ReadableStream(N.__wrap(e), n);
  }
  function yn(e) {
    return new Uint8Array(e >>> 0);
  }
  function mn() {
    return u(function(e, n, t) {
      return new Request(f(e, n), t);
    }, arguments);
  }
  function xn(e) {
    return e.next;
  }
  function vn() {
    return u(function(e) {
      return e.next();
    }, arguments);
  }
  function kn(e) {
    return e.node;
  }
  function In(e) {
    return e.now();
  }
  function Sn() {
    return Date.now();
  }
  function Tn(e) {
    return e.now();
  }
  function Rn(e) {
    return e.performance;
  }
  function Fn(e) {
    return e.process;
  }
  function jn(e) {
    queueMicrotask(e);
  }
  function An(e) {
    return e.queueMicrotask;
  }
  function Cn() {
    return u(function(e, n) {
      e.randomFillSync(n);
    }, arguments);
  }
  function En(e) {
    return e.read();
  }
  function On(e) {
    return e.readyState;
  }
  function Ln(e, n) {
    const t = n.reason, _ = p(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = w;
    b().setInt32(e + 4 * 1, r, true), b().setInt32(e + 4 * 0, _, true);
  }
  function Mn(e) {
    e.releaseLock();
  }
  function qn() {
    return u(function() {
      return module.require;
    }, arguments);
  }
  function Un(e) {
    return Promise.resolve(e);
  }
  function zn() {
    return u(function(e, n) {
      e.respond(n >>> 0);
    }, arguments);
  }
  function Nn() {
    return u(function(e, n, t) {
      e.send(f(n, t));
    }, arguments);
  }
  function Bn() {
    return u(function(e, n, t) {
      e.send(re(n, t));
    }, arguments);
  }
  function Wn() {
    return u(function(e, n, t) {
      return e.setTimeout(n, t);
    }, arguments);
  }
  function Dn(e, n, t) {
    e[n >>> 0] = t;
  }
  function Pn(e, n, t) {
    e[n] = t;
  }
  function $n(e, n, t) {
    e.set(n, t >>> 0);
  }
  function Vn(e, n, t) {
    return e.set(n, t);
  }
  function Gn(e, n) {
    e.binaryType = ie[n];
  }
  function Hn(e, n) {
    e.body = n;
  }
  function Jn(e, n) {
    e.credentials = ae[n];
  }
  function Kn(e, n) {
    e.headers = n;
  }
  function Qn(e, n) {
    e.highWaterMark = n;
  }
  function Xn(e, n, t) {
    e.method = f(n, t);
  }
  function Yn(e, n) {
    e.mode = be[n];
  }
  function Zn(e, n) {
    e.onclose = n;
  }
  function et(e, n) {
    e.onerror = n;
  }
  function nt(e, n) {
    e.onmessage = n;
  }
  function tt(e, n) {
    e.onopen = n;
  }
  function _t(e, n) {
    e.signal = n;
  }
  function rt(e) {
    return e.signal;
  }
  function ot(e, n) {
    const t = n.stack, _ = p(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = w;
    b().setInt32(e + 4 * 1, r, true), b().setInt32(e + 4 * 0, _, true);
  }
  function ct() {
    const e = typeof global > "u" ? null : global;
    return l(e) ? 0 : x(e);
  }
  function st() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return l(e) ? 0 : x(e);
  }
  function it() {
    const e = typeof self > "u" ? null : self;
    return l(e) ? 0 : x(e);
  }
  function at() {
    const e = typeof window > "u" ? null : window;
    return l(e) ? 0 : x(e);
  }
  function bt(e) {
    return e.status;
  }
  function ut() {
    return u(function(e) {
      return JSON.stringify(e);
    }, arguments);
  }
  function dt(e, n, t) {
    return e.subarray(n >>> 0, t >>> 0);
  }
  function ft(e, n) {
    return e.then(n);
  }
  function gt(e, n, t) {
    return e.then(n, t);
  }
  function wt(e, n) {
    const t = n.url, _ = p(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = w;
    b().setInt32(e + 4 * 1, r, true), b().setInt32(e + 4 * 0, _, true);
  }
  function lt(e) {
    return e.value;
  }
  function ht(e) {
    return e.versions;
  }
  function pt(e) {
    const n = e.view;
    return l(n) ? 0 : x(n);
  }
  function yt(e, n) {
    var t = S(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.warn(...t);
  }
  function mt(e) {
    return +e;
  }
  function xt(e) {
    return BigInt.asUintN(64, e);
  }
  function vt(e) {
    const n = e;
    return typeof n == "boolean" ? n ? 1 : 0 : 2;
  }
  function kt(e) {
    const n = e.original;
    return n.cnt-- == 1 ? (n.a = 0, true) : false;
  }
  function It(e, n, t) {
    return T(e, n, 2781, oe);
  }
  function St(e, n, t) {
    return T(e, n, 2791, ce);
  }
  function Tt(e, n, t) {
    return T(e, n, 856, O);
  }
  function Rt(e, n, t) {
    return T(e, n, 856, O);
  }
  function Ft(e, n, t) {
    return T(e, n, 856, O);
  }
  function jt(e, n, t) {
    return T(e, n, 856, O);
  }
  function At(e, n) {
    const t = q(n), _ = p(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = w;
    b().setInt32(e + 4 * 1, r, true), b().setInt32(e + 4 * 0, _, true);
  }
  function Ct(e, n) {
    return new Error(f(e, n));
  }
  function Et(e, n) {
    return e in n;
  }
  function Ot() {
    const e = o.__wbindgen_export_4, n = e.grow(4);
    e.set(0, void 0), e.set(n + 0, void 0), e.set(n + 1, null), e.set(n + 2, true), e.set(n + 3, false);
  }
  function Lt(e) {
    return typeof e == "function";
  }
  function Mt(e) {
    const n = e;
    return typeof n == "object" && n !== null;
  }
  function qt(e) {
    return typeof e == "string";
  }
  function Ut(e) {
    return e === void 0;
  }
  function zt(e, n) {
    return e == n;
  }
  function Nt() {
    return o.memory;
  }
  function Bt(e, n) {
    const t = n, _ = typeof t == "number" ? t : void 0;
    b().setFloat64(e + 8 * 1, l(_) ? 0 : _, true), b().setInt32(e + 4 * 0, !l(_), true);
  }
  function Wt(e) {
    return e;
  }
  function Dt(e, n) {
    const t = n, _ = typeof t == "string" ? t : void 0;
    var r = l(_) ? 0 : p(_, o.__wbindgen_export_0, o.__wbindgen_export_1), s = w;
    b().setInt32(e + 4 * 1, s, true), b().setInt32(e + 4 * 0, r, true);
  }
  function Pt(e, n) {
    return f(e, n);
  }
  function $t(e, n) {
    throw new Error(f(e, n));
  }
  URL = globalThis.URL;
  const c = await Z({
    "./chat_browser_bg.js": {
      __wbindgen_error_new: Ct,
      __wbindgen_string_new: Pt,
      __wbindgen_is_undefined: Ut,
      __wbindgen_in: Et,
      __wbindgen_boolean_get: vt,
      __wbindgen_is_object: Mt,
      __wbindgen_as_number: mt,
      __wbg_chatnode_new: Se,
      __wbindgen_jsval_loose_eq: zt,
      __wbindgen_number_get: Bt,
      __wbindgen_string_get: Dt,
      __wbg_String_8f0eb39a4a4c2f66: ue,
      __wbindgen_number_new: Wt,
      __wbindgen_bigint_from_u64: xt,
      __wbg_getwithrefkey_1dc361bd10053bfe: He,
      __wbg_set_3f1d0b984ed272ed: Pn,
      __wbg_new_8a6f238a6ece86ea: un,
      __wbg_stack_0ed75d68575b0f3c: ot,
      __wbg_error_7534b8e9a36f1ab4: Ue,
      __wbindgen_cb_drop: kt,
      __wbg_debug_55137df391ebfd29: Le,
      __wbg_error_91947ba14c44e1c9: ze,
      __wbg_log_e51ef223c244b133: tn,
      __wbg_warn_479b8bbb8337357b: yt,
      __wbg_fetch_4465c2b10f21a927: Ne,
      __wbg_getReader_48e00749fe3f6089: De,
      __wbg_newwithintounderlyingsource_b47f6a6a596a7f24: pn,
      __wbindgen_is_string: qt,
      __wbg_signal_aaf9ad74119f20a4: rt,
      __wbg_new_e25e5aab09ff45db: wn,
      __wbg_abort_775ef1d17fc65868: de,
      __wbg_instanceof_Blob_ca721ef3bdab15d1: Xe,
      __wbg_code_f4ec1e6e2e1b0417: Ce,
      __wbg_reason_49f1cede8bcf23dd: Ln,
      __wbg_new_018dcc2d6c8c2f6a: on,
      __wbg_append_8c7dd8d641a5f01b: fe,
      __wbg_data_432d9c3df2630942: Oe,
      __wbg_now_d18023d54d4e5500: Tn,
      __wbg_sethighwatermark_793c99c89830c8e9: Qn,
      __wbg_byobRequest_77d9adf63337edfb: pe,
      __wbg_close_5ce03e29be453811: je,
      __wbg_view_fd8a56e8983f448d: pt,
      __wbg_respond_1f279fa9f8edcb1c: zn,
      __wbg_close_304cc1fef3466669: Fe,
      __wbg_enqueue_bb16ba72f537dc9e: qe,
      __wbg_read_a2434af1186cb56c: En,
      __wbg_releaseLock_091899af97991d2e: Mn,
      __wbg_cancel_8a308660caa6cadf: ke,
      __wbg_getdone_d47073731acd3e74: Ve,
      __wbg_getvalue_009dcd63692bee1f: Ge,
      __wbg_newwithstrandinit_06c535e0a867c635: mn,
      __wbg_setbody_5923b78a95eedf29: Hn,
      __wbg_setcredentials_c3a22f1cd105a2c6: Jn,
      __wbg_setheaders_834c0bdb6a8949ad: Kn,
      __wbg_setmethod_3c5280fe5d890842: Xn,
      __wbg_setmode_5dc300b865044b65: Yn,
      __wbg_setsignal_75b21ef3a81de905: _t,
      __wbg_instanceof_Response_f2cc20d9f7dfd644: Ye,
      __wbg_url_ae10c34ca209681d: wt,
      __wbg_status_f6360336ca686bf0: bt,
      __wbg_headers_9cb51cfd2ac780a4: Ke,
      __wbg_body_0b8fd1fe671660df: we,
      __wbg_arrayBuffer_d1b44c4390db422f: ge,
      __wbg_readyState_7ef6e63c349899ed: On,
      __wbg_setonopen_2da654e1f39745d5: tt,
      __wbg_setonerror_8639efe354b947cd: et,
      __wbg_setonclose_14fc475a49d488fc: Zn,
      __wbg_setonmessage_6eccab530a8fb4c7: nt,
      __wbg_setbinaryType_92fa1ffd873b327c: Gn,
      __wbg_new_92c54fc74574ef55: dn,
      __wbg_close_2893b7d056a0627d: Re,
      __wbg_close_e1253d480ed93ce3: Ae,
      __wbg_send_0293179ba074ffb4: Nn,
      __wbg_send_fc0c204e8a1757f4: Bn,
      __wbg_fetch_509096533071c657: Be,
      __wbg_setTimeout_592d289a39056aa2: Wn,
      __wbg_clearTimeout_710cb18754e44d88: Te,
      __wbg_queueMicrotask_97d92b4fcc8a61c5: jn,
      __wbg_queueMicrotask_d3219def82552485: An,
      __wbindgen_is_function: Lt,
      __wbg_performance_7a3ffd0b17f663ad: Rn,
      __wbg_now_2c95c9de01293173: In,
      __wbg_crypto_ed58b8e10a292839: Ee,
      __wbg_process_5c1d670bc53614b8: Fn,
      __wbg_versions_c71aa1626a93e0a1: ht,
      __wbg_node_02999533c4ea02e3: kn,
      __wbg_require_79b1e9274cde3c87: qn,
      __wbg_msCrypto_0a36e2ec3a343d26: _n,
      __wbg_randomFillSync_ab2cfe79ebbf2740: Cn,
      __wbg_getRandomValues_bcb4912f16000dc4: We,
      __wbg_new_78feb108b6472713: bn,
      __wbg_newnoargs_105ed471475aaf50: ln,
      __wbg_new_5e0be73521bc8c17: an,
      __wbg_next_25feadfc0913fea9: xn,
      __wbg_value_cd1ffa7b1ab794f1: lt,
      __wbg_iterator_9a24c88df860dc65: en,
      __wbg_new_405e22f390576ce2: sn,
      __wbg_set_37837023f3d740e8: Dn,
      __wbg_instanceof_ArrayBuffer_e14585432e3737fc: Qe,
      __wbg_new_c68d7209be747379: gn,
      __wbg_call_672a4d21634d4a24: xe,
      __wbg_call_7cccdd69e0791ae2: ve,
      __wbg_set_8fc6bf8a5b1071d1: Vn,
      __wbg_next_6574e1a8a62d1055: vn,
      __wbg_done_769e5ede4b31c67b: Me,
      __wbg_getTime_46267b1c24877e30: Pe,
      __wbg_new0_f788a2397c7ca929: rn,
      __wbg_now_807e54c39636c349: Sn,
      __wbg_get_67b2ba62fc30de12: $e,
      __wbg_has_a5ea9117f258a0ec: Je,
      __wbg_buffer_609cc3eee51ed158: he,
      __wbg_stringify_f7ed6987935b4a24: ut,
      __wbg_new_23a2665fac83c611: cn,
      __wbg_resolve_4851785c9c5f573d: Un,
      __wbg_catch_a6e601879b2610e9: Ie,
      __wbg_then_44b73946d2fb3e7d: ft,
      __wbg_then_48b406749878a531: gt,
      __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0: st,
      __wbg_static_accessor_SELF_37c5d418e4bf5819: it,
      __wbg_static_accessor_WINDOW_5de37043a91a9c40: at,
      __wbg_static_accessor_GLOBAL_88a902d13a557d07: ct,
      __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a: hn,
      __wbg_new_a12002a7f91c75be: fn,
      __wbg_instanceof_Uint8Array_17156bcf118086a9: Ze,
      __wbg_newwithlength_a381634e90c276d4: yn,
      __wbg_buffer_09165b52af8c5237: le,
      __wbg_subarray_aa9065fa9dc5df96: dt,
      __wbg_length_a446193dc22c12f8: nn,
      __wbg_byteLength_e674b853d9c77e1d: ye,
      __wbg_byteOffset_fd862df290ef848d: me,
      __wbg_set_65595bdd868b3009: $n,
      __wbindgen_debug_string: At,
      __wbindgen_throw: $t,
      __wbindgen_memory: Nt,
      __wbindgen_closure_wrapper3882: Tt,
      __wbindgen_closure_wrapper3884: Rt,
      __wbindgen_closure_wrapper3886: Ft,
      __wbindgen_closure_wrapper3888: jt,
      __wbindgen_closure_wrapper14859: It,
      __wbindgen_closure_wrapper14914: St,
      __wbindgen_init_externref_table: Ot
    }
  }, Y), Vt = c.memory, Gt = c.start, Ht = c.__wbg_chatnode_free, Jt = c.chatnode_spawn, Kt = c.chatnode_node_id, Qt = c.chatnode_remote_info, Xt = c.chatnode_create, Yt = c.chatnode_join, Zt = c.__wbg_channel_free, e_ = c.channel_sender, n_ = c.channel_receiver, t_ = c.channel_ticket, __ = c.channel_id, r_ = c.channel_neighbors, o_ = c.__wbg_channelsender_free, c_ = c.channelsender_broadcast, s_ = c.__wbg_intounderlyingbytesource_free, i_ = c.intounderlyingbytesource_type, a_ = c.intounderlyingbytesource_autoAllocateChunkSize, b_ = c.intounderlyingbytesource_start, u_ = c.intounderlyingbytesource_pull, d_ = c.intounderlyingbytesource_cancel, f_ = c.__wbg_intounderlyingsource_free, g_ = c.intounderlyingsource_pull, w_ = c.intounderlyingsource_cancel, l_ = c.__wbg_intounderlyingsink_free, h_ = c.intounderlyingsink_write, p_ = c.intounderlyingsink_close, y_ = c.intounderlyingsink_abort, m_ = c.ring_core_0_17_11__bn_mul_mont, x_ = c.__wbindgen_export_0, v_ = c.__wbindgen_export_1, k_ = c.__wbindgen_export_2, I_ = c.__wbindgen_export_3, S_ = c.__wbindgen_export_4, T_ = c.__wbindgen_export_5, R_ = c.__wbindgen_export_6, F_ = c.__wbindgen_export_7, j_ = c.__wbindgen_add_to_stack_pointer, A_ = c.__wbindgen_export_8, C_ = c.closure855_externref_shim, E_ = c.__wbindgen_export_10, O_ = c.closure2790_externref_shim, L_ = c.closure2895_externref_shim, J = c.__wbindgen_start, M_ = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wbg_channel_free: Zt,
    __wbg_channelsender_free: o_,
    __wbg_chatnode_free: Ht,
    __wbg_intounderlyingbytesource_free: s_,
    __wbg_intounderlyingsink_free: l_,
    __wbg_intounderlyingsource_free: f_,
    __wbindgen_add_to_stack_pointer: j_,
    __wbindgen_export_0: x_,
    __wbindgen_export_1: v_,
    __wbindgen_export_10: E_,
    __wbindgen_export_2: k_,
    __wbindgen_export_3: I_,
    __wbindgen_export_4: S_,
    __wbindgen_export_5: T_,
    __wbindgen_export_6: R_,
    __wbindgen_export_7: F_,
    __wbindgen_export_8: A_,
    __wbindgen_start: J,
    channel_id: __,
    channel_neighbors: r_,
    channel_receiver: n_,
    channel_sender: e_,
    channel_ticket: t_,
    channelsender_broadcast: c_,
    chatnode_create: Xt,
    chatnode_join: Yt,
    chatnode_node_id: Kt,
    chatnode_remote_info: Qt,
    chatnode_spawn: Jt,
    closure2790_externref_shim: O_,
    closure2895_externref_shim: L_,
    closure855_externref_shim: C_,
    intounderlyingbytesource_autoAllocateChunkSize: a_,
    intounderlyingbytesource_cancel: d_,
    intounderlyingbytesource_pull: u_,
    intounderlyingbytesource_start: b_,
    intounderlyingbytesource_type: i_,
    intounderlyingsink_abort: y_,
    intounderlyingsink_close: p_,
    intounderlyingsink_write: h_,
    intounderlyingsource_cancel: w_,
    intounderlyingsource_pull: g_,
    memory: Vt,
    ring_core_0_17_11__bn_mul_mont: m_,
    start: Gt
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  ee(M_);
  J();
  K = class {
    constructor(n) {
      __publicField(this, "chatNode");
      __publicField(this, "channels", /* @__PURE__ */ new Map());
      this.chatNode = n;
    }
    static async create() {
      j.info("Spawning iroh node");
      const n = await L.spawn();
      return j.info(`Iroh node spawned. our node id: ${n.node_id()}`), new K(n);
    }
    async createChannel(n) {
      const t = this.chatNode.create(n);
      return this.joinInner(t, n);
    }
    async joinChannel(n, t) {
      const _ = this.chatNode.join(n, t);
      return this.joinInner(_, t);
    }
    joinInner(n, t) {
      const _ = n.id();
      j.info(`joining channel ${_}`);
      const r = _.substring(5, 13);
      let s, a = new Promise((k) => {
        s = k;
      });
      const i = {
        label: r,
        messages: [],
        channel: n,
        subscribers: [],
        peers: /* @__PURE__ */ new Map(),
        nextId: 0,
        neighbors: 0,
        neighborSubscribers: [],
        onClose: s
      }, g = this.chatNode.node_id();
      i.peers.set(g, {
        id: g,
        name: t,
        lastSeen: /* @__PURE__ */ new Date(),
        status: "online"
      }), this.channels.set(_, i);
      const v = async () => {
        const k = n.receiver.getReader();
        for (; ; ) {
          const { done: h, value: F } = await k.read();
          if (h) break;
          const d = F;
          if (console.log("chat event", d), d.type === "messageReceived") {
            const m = {
              id: d.from,
              name: d.nickname,
              lastSeen: new Date(d.sentTimestamp / 1e3),
              status: "online"
            };
            i.peers.set(d.from, m);
            const B = {
              id: G(i),
              sender: d.from,
              content: d.text
            };
            i.messages.push(B);
            const Q = M(i, B);
            for (const X of i.subscribers) X(Q);
          } else if (d.type === "presence") {
            const m = {
              id: d.from,
              name: d.nickname,
              lastSeen: new Date(d.sentTimestamp / 1e3),
              status: "online"
            };
            i.peers.set(d.from, m);
          } else if (d.type === "joined") {
            j.info(`joined channel ${_}`), i.neighbors += d.neighbors.length;
            for (const m of i.neighborSubscribers) m(i.neighbors);
          } else if (d.type === "neighborUp") {
            i.neighbors += 1;
            for (const m of i.neighborSubscribers) m(i.neighbors);
          } else if (d.type === "neighborDown") {
            i.neighbors -= 1;
            for (const m of i.neighborSubscribers) m(i.neighbors);
          }
        }
      }, y = async () => {
        for (; ; ) {
          const k = /* @__PURE__ */ new Date();
          for (const h of i.peers.values()) {
            if (h.id === g) {
              h.lastSeen = k;
              continue;
            }
            const F = (k.getTime() - h.lastSeen.getTime()) / 1e3;
            F > 20 ? h.status = "offline" : F > 10 ? h.status = "away" : h.status = "online";
          }
          await new Promise((h) => setTimeout(h, 1e3));
        }
      };
      return Promise.race([
        a,
        v(),
        y()
      ]), {
        id: _,
        name: r
      };
    }
    getTicket(n, t) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return _.channel.ticket(t);
    }
    async closeChannel(n) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      t.onClose(), this.channels.delete(n);
    }
    async sendMessage(n, t) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      await _.channel.sender.broadcast(t);
      const s = {
        sender: this.chatNode.node_id(),
        id: G(_),
        content: t
      };
      _.messages.push(s);
      const a = M(_, s);
      for (const i of _.subscribers) i(a);
    }
    async getMessages(n) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return t.messages.map((r) => M(t, r));
    }
    async getPeers(n) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return Array.from(t.peers.values());
    }
    subscribeToMessages(n, t) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return _.subscribers.push(t), () => {
        _.subscribers = _.subscribers.filter((r) => r != t);
      };
    }
    subscribeToNeighbors(n, t) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return t(_.neighbors), _.neighborSubscribers.push(t), () => {
        _.neighborSubscribers = _.neighborSubscribers.filter((r) => r != t);
      };
    }
    subscribeToPeers(n, t) {
      const _ = setInterval(async () => {
        const r = await this.getPeers(n);
        t(r);
      }, 1e3);
      return () => {
        clearInterval(_);
      };
    }
  };
  function q_(e, n) {
    const t = e.peers.get(n);
    return t && t.name ? t.name : n.substring(0, 8);
  }
  function M(e, n) {
    return {
      ...n,
      nickname: q_(e, n.sender)
    };
  }
  function G(e) {
    const n = "" + e.nextId;
    return e.nextId = e.nextId + 1, n;
  }
});
export {
  K as IrohAPI,
  __tla
};
