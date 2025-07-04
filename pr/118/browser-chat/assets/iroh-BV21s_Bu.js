var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { l as R, P as O, __tla as __tla_0 } from "./index-DENAWlq5.js";
let K;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const Z = "" + new URL("chat_browser_bg-QrhVNG_a.wasm", import.meta.url).href, ee = async (e = {}, n) => {
    let t;
    if (n.startsWith("data:")) {
      const _ = n.replace(/^data:.*?base64,/, "");
      let r;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") r = Buffer.from(_, "base64");
      else if (typeof atob == "function") {
        const s = atob(_);
        r = new Uint8Array(s.length);
        for (let i = 0; i < s.length; i++) r[i] = s.charCodeAt(i);
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
  function ne(e) {
    o = e;
  }
  let w = 0, E = null;
  function C() {
    return (E === null || E.byteLength === 0) && (E = new Uint8Array(o.memory.buffer)), E;
  }
  const te = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
  let A = new te("utf-8");
  const _e = typeof A.encodeInto == "function" ? function(e, n) {
    return A.encodeInto(e, n);
  } : function(e, n) {
    const t = A.encode(e);
    return n.set(t), {
      read: e.length,
      written: t.length
    };
  };
  function h(e, n, t) {
    if (t === void 0) {
      const u = A.encode(e), l = n(u.length, 1) >>> 0;
      return C().subarray(l, l + u.length).set(u), w = u.length, l;
    }
    let _ = e.length, r = n(_, 1) >>> 0;
    const s = C();
    let i = 0;
    for (; i < _; i++) {
      const u = e.charCodeAt(i);
      if (u > 127) break;
      s[r + i] = u;
    }
    if (i !== _) {
      i !== 0 && (e = e.slice(i)), r = t(r, _, _ = i + e.length * 3, 1) >>> 0;
      const u = C().subarray(r + i, r + _), l = _e(e, u);
      i += l.written, r = t(r, _, i, 1) >>> 0;
    }
    return w = i, r;
  }
  let k = null;
  function a() {
    return (k === null || k.buffer.detached === true || k.buffer.detached === void 0 && k.buffer !== o.memory.buffer) && (k = new DataView(o.memory.buffer)), k;
  }
  const re = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
  let H = new re("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  H.decode();
  function f(e, n) {
    return e = e >>> 0, H.decode(C().subarray(e, e + n));
  }
  function x(e) {
    const n = o.__wbindgen_export_3();
    return o.__wbindgen_export_4.set(n, e), n;
  }
  function b(e, n) {
    try {
      return e.apply(this, n);
    } catch (t) {
      const _ = x(t);
      o.__wbindgen_export_2(_);
    }
  }
  function p(e) {
    return e == null;
  }
  function T(e, n) {
    e = e >>> 0;
    const t = a(), _ = [];
    for (let r = e; r < e + 4 * n; r += 4) _.push(o.__wbindgen_export_4.get(t.getUint32(r, true)));
    return o.__wbindgen_export_5(e, n), _;
  }
  function J(e, n) {
    return e = e >>> 0, C().subarray(e / 1, e / 1 + n);
  }
  const L = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => {
    o.__wbindgen_export_7.get(e.dtor)(e.a, e.b);
  });
  function I(e, n, t, _) {
    const r = {
      a: e,
      b: n,
      cnt: 1,
      dtor: t
    }, s = (...i) => {
      r.cnt++;
      const u = r.a;
      r.a = 0;
      try {
        return _(u, r.b, ...i);
      } finally {
        --r.cnt === 0 ? (o.__wbindgen_export_7.get(r.dtor)(u, r.b), L.unregister(r)) : r.a = u;
      }
    };
    return s.original = r, L.register(s, r, r), s;
  }
  function oe(e, n, t, _) {
    const r = {
      a: e,
      b: n,
      cnt: 1,
      dtor: t
    }, s = (...i) => {
      r.cnt++;
      try {
        return _(r.a, r.b, ...i);
      } finally {
        --r.cnt === 0 && (o.__wbindgen_export_7.get(r.dtor)(r.a, r.b), r.a = 0, L.unregister(r));
      }
    };
    return s.original = r, L.register(s, r, r), s;
  }
  function z(e) {
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
      r > 0 && (s += z(e[0]));
      for (let i = 1; i < r; i++) s += ", " + z(e[i]);
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
  function ce(e) {
    const n = o.__wbindgen_export_4.get(e);
    return o.__wbindgen_export_8(e), n;
  }
  function se(e, n, t) {
    o.closure711_externref_shim(e, n, t);
  }
  function ie(e, n) {
    o.__wbindgen_export_10(e, n);
  }
  function ae(e, n) {
    o.__wbindgen_export_11(e, n);
  }
  function be(e, n, t) {
    o.closure1607_externref_shim(e, n, t);
  }
  function ue(e, n) {
    o.__wbindgen_export_13(e, n);
  }
  function de(e, n) {
    o.__wbindgen_export_14(e, n);
  }
  function fe(e, n, t) {
    o.closure2607_externref_shim(e, n, t);
  }
  function ge(e, n, t, _) {
    o.closure2920_externref_shim(e, n, t, _);
  }
  const we = [
    "blob",
    "arraybuffer"
  ], le = [
    "omit",
    "same-origin",
    "include"
  ], he = [
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
  class U {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(U.prototype);
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
      return W.__wrap(n);
    }
    get receiver() {
      return o.channel_receiver(this.__wbg_ptr);
    }
    ticket(n) {
      let t, _;
      try {
        const v = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_ticket(v, this.__wbg_ptr, n);
        var r = a().getInt32(v + 4 * 0, true), s = a().getInt32(v + 4 * 1, true), i = a().getInt32(v + 4 * 2, true), u = a().getInt32(v + 4 * 3, true), l = r, d = s;
        if (u) throw l = 0, d = 0, ce(i);
        return t = l, _ = d, f(l, d);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export_6(t, _, 1);
      }
    }
    id() {
      let n, t;
      try {
        const s = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_id(s, this.__wbg_ptr);
        var _ = a().getInt32(s + 4 * 0, true), r = a().getInt32(s + 4 * 1, true);
        return n = _, t = r, f(_, r);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export_6(n, t, 1);
      }
    }
    neighbors() {
      try {
        const r = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_neighbors(r, this.__wbg_ptr);
        var n = a().getInt32(r + 4 * 0, true), t = a().getInt32(r + 4 * 1, true), _ = T(n, t).slice();
        return o.__wbindgen_export_6(n, t * 4, 4), _;
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  const $ = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channelsender_free(e >>> 0, 1));
  class W {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(W.prototype);
      return t.__wbg_ptr = n, $.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, $.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_channelsender_free(n, 0);
    }
    broadcast(n) {
      const t = h(n, o.__wbindgen_export_0, o.__wbindgen_export_1), _ = w;
      return o.channelsender_broadcast(this.__wbg_ptr, t, _);
    }
    set_nickame(n) {
      const t = h(n, o.__wbindgen_export_0, o.__wbindgen_export_1), _ = w;
      o.channelsender_set_nickame(this.__wbg_ptr, t, _);
    }
  }
  const P = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_chatnode_free(e >>> 0, 1));
  class M {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(M.prototype);
      return t.__wbg_ptr = n, P.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, P.unregister(this), n;
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
        var _ = a().getInt32(s + 4 * 0, true), r = a().getInt32(s + 4 * 1, true);
        return n = _, t = r, f(_, r);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export_6(n, t, 1);
      }
    }
    remote_info() {
      try {
        const r = o.__wbindgen_add_to_stack_pointer(-16);
        o.chatnode_remote_info(r, this.__wbg_ptr);
        var n = a().getInt32(r + 4 * 0, true), t = a().getInt32(r + 4 * 1, true), _ = T(n, t).slice();
        return o.__wbindgen_export_6(n, t * 4, 4), _;
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    create(n) {
      const t = h(n, o.__wbindgen_export_0, o.__wbindgen_export_1), _ = w;
      return o.chatnode_create(this.__wbg_ptr, t, _);
    }
    join(n, t) {
      const _ = h(n, o.__wbindgen_export_0, o.__wbindgen_export_1), r = w, s = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), i = w;
      return o.chatnode_join(this.__wbg_ptr, _, r, s, i);
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
  class B {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(B.prototype);
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
  function pe(e, n) {
    const t = String(n), _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = w;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function ye(e, n) {
    e.abort(n);
  }
  function me(e) {
    e.abort();
  }
  function xe() {
    return b(function(e, n, t, _) {
      e.addEventListener(f(n, t), _);
    }, arguments);
  }
  function ve() {
    return b(function(e, n, t, _, r) {
      e.append(f(n, t), f(_, r));
    }, arguments);
  }
  function Se() {
    return b(function(e) {
      return e.arrayBuffer();
    }, arguments);
  }
  function ke(e) {
    const n = e.body;
    return p(n) ? 0 : x(n);
  }
  function Te(e) {
    return e.buffer;
  }
  function Ie(e) {
    return e.buffer;
  }
  function Re(e) {
    const n = e.byobRequest;
    return p(n) ? 0 : x(n);
  }
  function Ce(e) {
    return e.byteLength;
  }
  function Fe(e) {
    return e.byteOffset;
  }
  function je() {
    return b(function(e, n) {
      return e.call(n);
    }, arguments);
  }
  function Ee() {
    return b(function(e, n, t) {
      return e.call(n, t);
    }, arguments);
  }
  function Ae(e) {
    return e.cancel();
  }
  function Le(e, n) {
    return e.catch(n);
  }
  function Me(e) {
    return U.__wrap(e);
  }
  function Ne(e) {
    return M.__wrap(e);
  }
  function Oe() {
    return b(function(e, n) {
      e.clearTimeout(n);
    }, arguments);
  }
  function qe(e) {
    return clearTimeout(e);
  }
  function ze() {
    return b(function(e) {
      e.close();
    }, arguments);
  }
  function Ue() {
    return b(function(e) {
      e.close();
    }, arguments);
  }
  function We() {
    return b(function(e) {
      e.close();
    }, arguments);
  }
  function Be(e) {
    return e.code;
  }
  function De(e) {
    return e.code;
  }
  function $e(e) {
    return e.crypto;
  }
  function Pe(e) {
    return e.data;
  }
  function Ve(e, n) {
    var t = T(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.debug(...t);
  }
  function Ge(e) {
    return e.done;
  }
  function He() {
    return b(function(e, n) {
      e.enqueue(n);
    }, arguments);
  }
  function Je(e, n) {
    let t, _;
    try {
      t = e, _ = n, console.error(f(e, n));
    } finally {
      o.__wbindgen_export_6(t, _, 1);
    }
  }
  function Qe(e, n) {
    var t = T(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.error(...t);
  }
  function Ke(e, n) {
    return e.fetch(n);
  }
  function Xe(e) {
    return fetch(e);
  }
  function Ye() {
    return b(function(e, n) {
      globalThis.crypto.getRandomValues(J(e, n));
    }, arguments);
  }
  function Ze() {
    return b(function(e, n) {
      e.getRandomValues(n);
    }, arguments);
  }
  function en() {
    return b(function(e) {
      return e.getReader();
    }, arguments);
  }
  function nn() {
    return b(function(e, n) {
      return Reflect.get(e, n);
    }, arguments);
  }
  function tn(e) {
    const n = e.done;
    return p(n) ? 16777215 : n ? 1 : 0;
  }
  function _n(e) {
    return e.value;
  }
  function rn(e, n) {
    return e[n];
  }
  function on() {
    return b(function(e, n) {
      return Reflect.has(e, n);
    }, arguments);
  }
  function cn(e) {
    return e.headers;
  }
  function sn(e) {
    let n;
    try {
      n = e instanceof ArrayBuffer;
    } catch {
      n = false;
    }
    return n;
  }
  function an(e) {
    let n;
    try {
      n = e instanceof Blob;
    } catch {
      n = false;
    }
    return n;
  }
  function bn(e) {
    let n;
    try {
      n = e instanceof Response;
    } catch {
      n = false;
    }
    return n;
  }
  function un(e) {
    let n;
    try {
      n = e instanceof Uint8Array;
    } catch {
      n = false;
    }
    return n;
  }
  function dn() {
    return Symbol.iterator;
  }
  function fn(e) {
    return e.length;
  }
  function gn(e, n) {
    var t = T(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.log(...t);
  }
  function wn(e) {
    return e.msCrypto;
  }
  function ln() {
    return b(function() {
      return new Headers();
    }, arguments);
  }
  function hn(e, n) {
    try {
      var t = {
        a: e,
        b: n
      }, _ = (s, i) => {
        const u = t.a;
        t.a = 0;
        try {
          return ge(u, t.b, s, i);
        } finally {
          t.a = u;
        }
      };
      return new Promise(_);
    } finally {
      t.a = t.b = 0;
    }
  }
  function pn() {
    return new Object();
  }
  function yn() {
    return /* @__PURE__ */ new Map();
  }
  function mn() {
    return new Array();
  }
  function xn() {
    return new Error();
  }
  function vn() {
    return b(function(e, n) {
      return new WebSocket(f(e, n));
    }, arguments);
  }
  function Sn(e) {
    return new Uint8Array(e);
  }
  function kn(e, n) {
    return new Error(f(e, n));
  }
  function Tn() {
    return b(function() {
      return new AbortController();
    }, arguments);
  }
  function In(e, n) {
    return new Function(f(e, n));
  }
  function Rn(e, n, t) {
    return new Uint8Array(e, n >>> 0, t >>> 0);
  }
  function Cn(e, n) {
    return new ReadableStream(B.__wrap(e), n);
  }
  function Fn(e) {
    return new Uint8Array(e >>> 0);
  }
  function jn() {
    return b(function(e, n, t) {
      return new Request(f(e, n), t);
    }, arguments);
  }
  function En() {
    return b(function(e, n, t) {
      return new WebSocket(f(e, n), t);
    }, arguments);
  }
  function An(e) {
    return e.next;
  }
  function Ln() {
    return b(function(e) {
      return e.next();
    }, arguments);
  }
  function Mn(e) {
    return e.node;
  }
  function Nn(e) {
    return e.now();
  }
  function On() {
    return Date.now();
  }
  function qn(e) {
    return e.performance;
  }
  function zn(e) {
    return e.process;
  }
  function Un(e, n) {
    return e.push(n);
  }
  function Wn(e) {
    queueMicrotask(e);
  }
  function Bn(e) {
    return e.queueMicrotask;
  }
  function Dn() {
    return b(function(e, n) {
      e.randomFillSync(n);
    }, arguments);
  }
  function $n(e) {
    return e.read();
  }
  function Pn(e) {
    return e.readyState;
  }
  function Vn(e, n) {
    const t = n.reason, _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = w;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function Gn(e) {
    e.releaseLock();
  }
  function Hn() {
    return b(function(e, n, t, _) {
      e.removeEventListener(f(n, t), _);
    }, arguments);
  }
  function Jn() {
    return b(function() {
      return module.require;
    }, arguments);
  }
  function Qn(e) {
    return Promise.resolve(e);
  }
  function Kn() {
    return b(function(e, n) {
      e.respond(n >>> 0);
    }, arguments);
  }
  function Xn() {
    return b(function(e, n, t) {
      e.send(f(n, t));
    }, arguments);
  }
  function Yn() {
    return b(function(e, n, t) {
      e.send(J(n, t));
    }, arguments);
  }
  function Zn(e, n) {
    return setTimeout(e, n);
  }
  function et() {
    return b(function(e, n, t) {
      return e.setTimeout(n, t);
    }, arguments);
  }
  function nt(e, n, t) {
    e[n >>> 0] = t;
  }
  function tt(e, n, t) {
    e[n] = t;
  }
  function _t(e, n, t) {
    e.set(n, t >>> 0);
  }
  function rt(e, n, t) {
    return e.set(n, t);
  }
  function ot(e, n) {
    e.binaryType = we[n];
  }
  function ct(e, n) {
    e.body = n;
  }
  function st(e, n) {
    e.credentials = le[n];
  }
  function it(e, n) {
    e.handleEvent = n;
  }
  function at(e, n) {
    e.headers = n;
  }
  function bt(e, n) {
    e.highWaterMark = n;
  }
  function ut(e, n, t) {
    e.method = f(n, t);
  }
  function dt(e, n) {
    e.mode = he[n];
  }
  function ft(e, n) {
    e.onclose = n;
  }
  function gt(e, n) {
    e.onerror = n;
  }
  function wt(e, n) {
    e.onmessage = n;
  }
  function lt(e, n) {
    e.onopen = n;
  }
  function ht(e, n) {
    e.signal = n;
  }
  function pt(e) {
    return e.signal;
  }
  function yt(e, n) {
    const t = n.stack, _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = w;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function mt() {
    const e = typeof global > "u" ? null : global;
    return p(e) ? 0 : x(e);
  }
  function xt() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return p(e) ? 0 : x(e);
  }
  function vt() {
    const e = typeof self > "u" ? null : self;
    return p(e) ? 0 : x(e);
  }
  function St() {
    const e = typeof window > "u" ? null : window;
    return p(e) ? 0 : x(e);
  }
  function kt(e) {
    return e.status;
  }
  function Tt() {
    return b(function(e) {
      return JSON.stringify(e);
    }, arguments);
  }
  function It(e, n, t) {
    return e.subarray(n >>> 0, t >>> 0);
  }
  function Rt(e, n) {
    return e.then(n);
  }
  function Ct(e, n, t) {
    return e.then(n, t);
  }
  function Ft(e, n) {
    const t = n.url, _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = w;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function jt(e, n) {
    const t = n.url, _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = w;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function Et(e) {
    return e.value;
  }
  function At(e) {
    return e.versions;
  }
  function Lt(e) {
    const n = e.view;
    return p(n) ? 0 : x(n);
  }
  function Mt(e, n) {
    var t = T(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.warn(...t);
  }
  function Nt(e) {
    return e.wasClean;
  }
  function Ot(e) {
    return +e;
  }
  function qt(e) {
    return BigInt.asUintN(64, e);
  }
  function zt(e) {
    const n = e;
    return typeof n == "boolean" ? n ? 1 : 0 : 2;
  }
  function Ut(e) {
    const n = e.original;
    return n.cnt-- == 1 ? (n.a = 0, true) : false;
  }
  function Wt(e, n, t) {
    return I(e, n, 2599, de);
  }
  function Bt(e, n, t) {
    return I(e, n, 2608, fe);
  }
  function Dt(e, n, t) {
    return I(e, n, 712, se);
  }
  function $t(e, n, t) {
    return I(e, n, 1494, ie);
  }
  function Pt(e, n, t) {
    return oe(e, n, 1506, ae);
  }
  function Vt(e, n, t) {
    return I(e, n, 1608, be);
  }
  function Gt(e, n, t) {
    return I(e, n, 1688, ue);
  }
  function Ht(e, n) {
    const t = z(n), _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = w;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function Jt(e, n) {
    return new Error(f(e, n));
  }
  function Qt(e, n) {
    return e in n;
  }
  function Kt() {
    const e = o.__wbindgen_export_4, n = e.grow(4);
    e.set(0, void 0), e.set(n + 0, void 0), e.set(n + 1, null), e.set(n + 2, true), e.set(n + 3, false);
  }
  function Xt(e) {
    return typeof e == "function";
  }
  function Yt(e) {
    const n = e;
    return typeof n == "object" && n !== null;
  }
  function Zt(e) {
    return typeof e == "string";
  }
  function e_(e) {
    return e === void 0;
  }
  function n_(e, n) {
    return e == n;
  }
  function t_() {
    return o.memory;
  }
  function __(e, n) {
    const t = n, _ = typeof t == "number" ? t : void 0;
    a().setFloat64(e + 8 * 1, p(_) ? 0 : _, true), a().setInt32(e + 4 * 0, !p(_), true);
  }
  function r_(e) {
    return e;
  }
  function o_(e, n) {
    const t = n, _ = typeof t == "string" ? t : void 0;
    var r = p(_) ? 0 : h(_, o.__wbindgen_export_0, o.__wbindgen_export_1), s = w;
    a().setInt32(e + 4 * 1, s, true), a().setInt32(e + 4 * 0, r, true);
  }
  function c_(e, n) {
    return f(e, n);
  }
  function s_(e, n) {
    throw new Error(f(e, n));
  }
  URL = globalThis.URL;
  const c = await ee({
    "./chat_browser_bg.js": {
      __wbindgen_error_new: Jt,
      __wbindgen_string_new: c_,
      __wbindgen_is_undefined: e_,
      __wbindgen_in: Qt,
      __wbindgen_boolean_get: zt,
      __wbindgen_is_object: Yt,
      __wbindgen_as_number: Ot,
      __wbg_chatnode_new: Ne,
      __wbg_channel_new: Me,
      __wbindgen_jsval_loose_eq: n_,
      __wbindgen_number_get: __,
      __wbindgen_string_get: o_,
      __wbg_String_8f0eb39a4a4c2f66: pe,
      __wbindgen_number_new: r_,
      __wbindgen_bigint_from_u64: qt,
      __wbg_getwithrefkey_1dc361bd10053bfe: rn,
      __wbg_set_3f1d0b984ed272ed: tt,
      __wbg_new_8a6f238a6ece86ea: xn,
      __wbg_stack_0ed75d68575b0f3c: yt,
      __wbg_error_7534b8e9a36f1ab4: Je,
      __wbindgen_cb_drop: Ut,
      __wbindgen_is_string: Zt,
      __wbg_debug_55137df391ebfd29: Ve,
      __wbg_error_91947ba14c44e1c9: Qe,
      __wbg_log_e51ef223c244b133: gn,
      __wbg_warn_479b8bbb8337357b: Mt,
      __wbg_getRandomValues_3c9c0d586e575a16: Ye,
      __wbg_fetch_d36a73832f0a45e8: Xe,
      __wbg_setTimeout_2e707715f8cc9497: Zn,
      __wbg_clearTimeout_86721db0036bea98: qe,
      __wbg_getReader_48e00749fe3f6089: en,
      __wbg_newwithintounderlyingsource_b47f6a6a596a7f24: Cn,
      __wbg_signal_aaf9ad74119f20a4: pt,
      __wbg_new_e25e5aab09ff45db: Tn,
      __wbg_abort_775ef1d17fc65868: me,
      __wbg_abort_410ec47a64ac6117: ye,
      __wbg_instanceof_Blob_ca721ef3bdab15d1: an,
      __wbg_wasClean_605b4fd66d44354a: Nt,
      __wbg_code_f4ec1e6e2e1b0417: De,
      __wbg_reason_49f1cede8bcf23dd: Vn,
      __wbg_code_cfd8f6868bdaed9b: Be,
      __wbg_sethandleevent_8454ae22cde5c602: it,
      __wbg_addEventListener_834c7f05e9c3b98b: xe,
      __wbg_removeEventListener_709135c542708608: Hn,
      __wbg_new_018dcc2d6c8c2f6a: ln,
      __wbg_append_8c7dd8d641a5f01b: ve,
      __wbg_data_432d9c3df2630942: Pe,
      __wbg_sethighwatermark_793c99c89830c8e9: bt,
      __wbg_byobRequest_77d9adf63337edfb: Re,
      __wbg_close_5ce03e29be453811: We,
      __wbg_view_fd8a56e8983f448d: Lt,
      __wbg_respond_1f279fa9f8edcb1c: Kn,
      __wbg_close_304cc1fef3466669: Ue,
      __wbg_enqueue_bb16ba72f537dc9e: He,
      __wbg_read_a2434af1186cb56c: $n,
      __wbg_releaseLock_091899af97991d2e: Gn,
      __wbg_cancel_8a308660caa6cadf: Ae,
      __wbg_getdone_d47073731acd3e74: tn,
      __wbg_getvalue_009dcd63692bee1f: _n,
      __wbg_newwithstrandinit_06c535e0a867c635: jn,
      __wbg_setbody_5923b78a95eedf29: ct,
      __wbg_setcredentials_c3a22f1cd105a2c6: st,
      __wbg_setheaders_834c0bdb6a8949ad: at,
      __wbg_setmethod_3c5280fe5d890842: ut,
      __wbg_setmode_5dc300b865044b65: dt,
      __wbg_setsignal_75b21ef3a81de905: ht,
      __wbg_instanceof_Response_f2cc20d9f7dfd644: bn,
      __wbg_url_ae10c34ca209681d: Ft,
      __wbg_status_f6360336ca686bf0: kt,
      __wbg_headers_9cb51cfd2ac780a4: cn,
      __wbg_body_0b8fd1fe671660df: ke,
      __wbg_arrayBuffer_d1b44c4390db422f: Se,
      __wbg_url_ce9ab75bf9627ae4: jt,
      __wbg_readyState_7ef6e63c349899ed: Pn,
      __wbg_setonopen_2da654e1f39745d5: lt,
      __wbg_setonerror_8639efe354b947cd: gt,
      __wbg_setonclose_14fc475a49d488fc: ft,
      __wbg_setonmessage_6eccab530a8fb4c7: wt,
      __wbg_setbinaryType_92fa1ffd873b327c: ot,
      __wbg_new_92c54fc74574ef55: vn,
      __wbg_newwithstrsequence_6e9d6479e1cf978d: En,
      __wbg_close_2893b7d056a0627d: ze,
      __wbg_send_0293179ba074ffb4: Xn,
      __wbg_send_fc0c204e8a1757f4: Yn,
      __wbg_fetch_509096533071c657: Ke,
      __wbg_setTimeout_4eb823e8b72fbe79: et,
      __wbg_clearTimeout_15dfc3d1dcb635c6: Oe,
      __wbg_queueMicrotask_97d92b4fcc8a61c5: Wn,
      __wbg_queueMicrotask_d3219def82552485: Bn,
      __wbindgen_is_function: Xt,
      __wbg_performance_7a3ffd0b17f663ad: qn,
      __wbg_now_2c95c9de01293173: Nn,
      __wbg_crypto_ed58b8e10a292839: $e,
      __wbg_process_5c1d670bc53614b8: zn,
      __wbg_versions_c71aa1626a93e0a1: At,
      __wbg_node_02999533c4ea02e3: Mn,
      __wbg_require_79b1e9274cde3c87: Jn,
      __wbg_msCrypto_0a36e2ec3a343d26: wn,
      __wbg_randomFillSync_ab2cfe79ebbf2740: Dn,
      __wbg_getRandomValues_bcb4912f16000dc4: Ze,
      __wbg_new_78feb108b6472713: mn,
      __wbg_newnoargs_105ed471475aaf50: In,
      __wbg_new_5e0be73521bc8c17: yn,
      __wbg_next_25feadfc0913fea9: An,
      __wbg_value_cd1ffa7b1ab794f1: Et,
      __wbg_iterator_9a24c88df860dc65: dn,
      __wbg_new_405e22f390576ce2: pn,
      __wbg_set_37837023f3d740e8: nt,
      __wbg_push_737cfc8c1432c2c6: Un,
      __wbg_instanceof_ArrayBuffer_e14585432e3737fc: sn,
      __wbg_new_c68d7209be747379: kn,
      __wbg_call_672a4d21634d4a24: je,
      __wbg_call_7cccdd69e0791ae2: Ee,
      __wbg_set_8fc6bf8a5b1071d1: rt,
      __wbg_next_6574e1a8a62d1055: Ln,
      __wbg_done_769e5ede4b31c67b: Ge,
      __wbg_now_807e54c39636c349: On,
      __wbg_get_67b2ba62fc30de12: nn,
      __wbg_has_a5ea9117f258a0ec: on,
      __wbg_buffer_609cc3eee51ed158: Ie,
      __wbg_stringify_f7ed6987935b4a24: Tt,
      __wbg_new_23a2665fac83c611: hn,
      __wbg_resolve_4851785c9c5f573d: Qn,
      __wbg_catch_a6e601879b2610e9: Le,
      __wbg_then_44b73946d2fb3e7d: Rt,
      __wbg_then_48b406749878a531: Ct,
      __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0: xt,
      __wbg_static_accessor_SELF_37c5d418e4bf5819: vt,
      __wbg_static_accessor_WINDOW_5de37043a91a9c40: St,
      __wbg_static_accessor_GLOBAL_88a902d13a557d07: mt,
      __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a: Rn,
      __wbg_new_a12002a7f91c75be: Sn,
      __wbg_instanceof_Uint8Array_17156bcf118086a9: un,
      __wbg_newwithlength_a381634e90c276d4: Fn,
      __wbg_buffer_09165b52af8c5237: Te,
      __wbg_subarray_aa9065fa9dc5df96: It,
      __wbg_length_a446193dc22c12f8: fn,
      __wbg_byteLength_e674b853d9c77e1d: Ce,
      __wbg_byteOffset_fd862df290ef848d: Fe,
      __wbg_set_65595bdd868b3009: _t,
      __wbindgen_debug_string: Ht,
      __wbindgen_throw: s_,
      __wbindgen_memory: t_,
      __wbindgen_closure_wrapper3529: Dt,
      __wbindgen_closure_wrapper6406: $t,
      __wbindgen_closure_wrapper6533: Pt,
      __wbindgen_closure_wrapper7015: Vt,
      __wbindgen_closure_wrapper7807: Gt,
      __wbindgen_closure_wrapper13538: Wt,
      __wbindgen_closure_wrapper13595: Bt,
      __wbindgen_init_externref_table: Kt
    }
  }, Z), i_ = c.memory, a_ = c.start, b_ = c.__wbg_chatnode_free, u_ = c.chatnode_spawn, d_ = c.chatnode_node_id, f_ = c.chatnode_remote_info, g_ = c.chatnode_create, w_ = c.chatnode_join, l_ = c.__wbg_channel_free, h_ = c.channel_sender, p_ = c.channel_receiver, y_ = c.channel_ticket, m_ = c.channel_id, x_ = c.channel_neighbors, v_ = c.__wbg_channelsender_free, S_ = c.channelsender_broadcast, k_ = c.channelsender_set_nickame, T_ = c.__wbg_intounderlyingbytesource_free, I_ = c.intounderlyingbytesource_type, R_ = c.intounderlyingbytesource_autoAllocateChunkSize, C_ = c.intounderlyingbytesource_start, F_ = c.intounderlyingbytesource_pull, j_ = c.intounderlyingbytesource_cancel, E_ = c.__wbg_intounderlyingsource_free, A_ = c.intounderlyingsource_pull, L_ = c.intounderlyingsource_cancel, M_ = c.__wbg_intounderlyingsink_free, N_ = c.intounderlyingsink_write, O_ = c.intounderlyingsink_close, q_ = c.intounderlyingsink_abort, z_ = c.ring_core_0_17_11__bn_mul_mont, U_ = c.__wbindgen_export_0, W_ = c.__wbindgen_export_1, B_ = c.__wbindgen_export_2, D_ = c.__wbindgen_export_3, $_ = c.__wbindgen_export_4, P_ = c.__wbindgen_export_5, V_ = c.__wbindgen_export_6, G_ = c.__wbindgen_export_7, H_ = c.__wbindgen_add_to_stack_pointer, J_ = c.__wbindgen_export_8, Q_ = c.closure711_externref_shim, K_ = c.__wbindgen_export_10, X_ = c.__wbindgen_export_11, Y_ = c.closure1607_externref_shim, Z_ = c.__wbindgen_export_13, er = c.__wbindgen_export_14, nr = c.closure2607_externref_shim, tr = c.closure2920_externref_shim, Q = c.__wbindgen_start, _r = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wbg_channel_free: l_,
    __wbg_channelsender_free: v_,
    __wbg_chatnode_free: b_,
    __wbg_intounderlyingbytesource_free: T_,
    __wbg_intounderlyingsink_free: M_,
    __wbg_intounderlyingsource_free: E_,
    __wbindgen_add_to_stack_pointer: H_,
    __wbindgen_export_0: U_,
    __wbindgen_export_1: W_,
    __wbindgen_export_10: K_,
    __wbindgen_export_11: X_,
    __wbindgen_export_13: Z_,
    __wbindgen_export_14: er,
    __wbindgen_export_2: B_,
    __wbindgen_export_3: D_,
    __wbindgen_export_4: $_,
    __wbindgen_export_5: P_,
    __wbindgen_export_6: V_,
    __wbindgen_export_7: G_,
    __wbindgen_export_8: J_,
    __wbindgen_start: Q,
    channel_id: m_,
    channel_neighbors: x_,
    channel_receiver: p_,
    channel_sender: h_,
    channel_ticket: y_,
    channelsender_broadcast: S_,
    channelsender_set_nickame: k_,
    chatnode_create: g_,
    chatnode_join: w_,
    chatnode_node_id: d_,
    chatnode_remote_info: f_,
    chatnode_spawn: u_,
    closure1607_externref_shim: Y_,
    closure2607_externref_shim: nr,
    closure2920_externref_shim: tr,
    closure711_externref_shim: Q_,
    intounderlyingbytesource_autoAllocateChunkSize: R_,
    intounderlyingbytesource_cancel: j_,
    intounderlyingbytesource_pull: F_,
    intounderlyingbytesource_start: C_,
    intounderlyingbytesource_type: I_,
    intounderlyingsink_abort: q_,
    intounderlyingsink_close: O_,
    intounderlyingsink_write: N_,
    intounderlyingsource_cancel: L_,
    intounderlyingsource_pull: A_,
    memory: i_,
    ring_core_0_17_11__bn_mul_mont: z_,
    start: a_
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  ne(_r);
  Q();
  K = class {
    constructor(n) {
      __publicField(this, "chatNode");
      __publicField(this, "channels", /* @__PURE__ */ new Map());
      this.chatNode = n;
    }
    static async create() {
      R.info("Spawning iroh node");
      const n = await M.spawn();
      return R.info(`Iroh node spawned. our node id: ${n.node_id()}`), new K(n);
    }
    async createChannel(n) {
      const t = await this.chatNode.create(n);
      return this.joinInner(t, n);
    }
    async joinChannel(n, t) {
      const _ = await this.chatNode.join(n, t);
      return this.joinInner(_, t);
    }
    joinInner(n, t) {
      const _ = n.id();
      R.info(`joining channel ${_}`);
      const r = _.substring(5, 13);
      let s, i = new Promise((S) => {
        s = S;
      });
      const u = this.chatNode.node_id(), l = {
        id: u,
        name: t,
        lastSeen: /* @__PURE__ */ new Date(),
        status: "online",
        role: O.Myself
      }, d = {
        label: r,
        messages: [],
        channel: n,
        subscribers: [],
        peers: /* @__PURE__ */ new Map(),
        nextId: 0,
        neighbors: 0,
        neighborSubscribers: [],
        peerSubscribers: [],
        myself: l,
        onClose: s
      };
      d.peers.set(u, l), this.channels.set(_, d);
      const v = async () => {
        const S = n.receiver.getReader();
        for (; ; ) {
          const { done: y, value: F } = await S.read();
          if (y) break;
          const g = F;
          if (console.debug("channel event", _.substring(0, 8), g), g.type === "messageReceived") {
            const m = {
              id: g.from,
              name: g.nickname,
              lastSeen: new Date(g.sentTimestamp / 1e3),
              status: "online",
              role: O.RemoteNode
            };
            d.peers.set(g.from, m);
            const j = {
              id: G(d),
              sender: g.from,
              content: g.text
            };
            d.messages.push(j);
            const Y = q(d, j);
            for (const N of d.subscribers) N(Y);
            for (const N of d.peerSubscribers) N();
          } else if (g.type === "presence") {
            const m = {
              id: g.from,
              name: g.nickname,
              lastSeen: new Date(g.sentTimestamp / 1e3),
              status: "online",
              role: O.RemoteNode
            };
            d.peers.set(g.from, m);
            for (const j of d.peerSubscribers) j();
          } else if (g.type === "joined") {
            R.info(`joined channel ${_}`), d.neighbors += g.neighbors.length;
            for (const m of d.neighborSubscribers) m(d.neighbors);
          } else if (g.type === "neighborUp") {
            d.neighbors += 1;
            for (const m of d.neighborSubscribers) m(d.neighbors);
          } else if (g.type === "neighborDown") {
            d.neighbors -= 1;
            for (const m of d.neighborSubscribers) m(d.neighbors);
          }
        }
      }, X = async () => {
        for (; ; ) {
          const S = /* @__PURE__ */ new Date();
          for (const y of d.peers.values()) {
            if (y.id === u) {
              y.lastSeen = S;
              continue;
            }
            const F = (S.getTime() - y.lastSeen.getTime()) / 1e3;
            F > 20 ? y.status = "offline" : F > 10 ? y.status = "away" : y.status = "online";
          }
          await new Promise((y) => setTimeout(y, 1e3));
        }
      };
      return Promise.race([
        i,
        v(),
        X()
      ]), {
        id: _,
        name: r
      };
    }
    getMyself(n) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return {
        ...t.myself
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
      const i = q(_, s);
      for (const u of _.subscribers) u(i);
    }
    setNickname(n, t) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      console.log("state", _), R.info(`changing nickname from ${_.myself.name} to ${t}`), _.myself.name = t, _.channel.sender.set_nickame(t);
      for (const r of _.peerSubscribers) r();
    }
    getMessages(n) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return t.messages.map((r) => q(t, r));
    }
    getPeers(n) {
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
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return _.peerSubscribers.push(t), () => {
        _.peerSubscribers = _.peerSubscribers.filter((r) => r != t);
      };
    }
  };
  function rr(e, n) {
    const t = e.peers.get(n);
    return t && t.name ? t.name : n.substring(0, 8);
  }
  function q(e, n) {
    return {
      ...n,
      nickname: rr(e, n.sender)
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
