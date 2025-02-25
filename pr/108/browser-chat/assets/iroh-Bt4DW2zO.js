var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { l as R, P as q, __tla as __tla_0 } from "./index-BcMQiwHc.js";
let X;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const ee = "" + new URL("chat_browser_bg-DdcHJE_y.wasm", import.meta.url).href, ne = async (e = {}, n) => {
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
  function te(e) {
    o = e;
  }
  let l = 0, A = null;
  function F() {
    return (A === null || A.byteLength === 0) && (A = new Uint8Array(o.memory.buffer)), A;
  }
  const _e = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
  let E = new _e("utf-8");
  const re = typeof E.encodeInto == "function" ? function(e, n) {
    return E.encodeInto(e, n);
  } : function(e, n) {
    const t = E.encode(e);
    return n.set(t), {
      read: e.length,
      written: t.length
    };
  };
  function h(e, n, t) {
    if (t === void 0) {
      const b = E.encode(e), w = n(b.length, 1) >>> 0;
      return F().subarray(w, w + b.length).set(b), l = b.length, w;
    }
    let _ = e.length, r = n(_, 1) >>> 0;
    const s = F();
    let i = 0;
    for (; i < _; i++) {
      const b = e.charCodeAt(i);
      if (b > 127) break;
      s[r + i] = b;
    }
    if (i !== _) {
      i !== 0 && (e = e.slice(i)), r = t(r, _, _ = i + e.length * 3, 1) >>> 0;
      const b = F().subarray(r + i, r + _), w = re(e, b);
      i += w.written, r = t(r, _, i, 1) >>> 0;
    }
    return l = i, r;
  }
  let v = null;
  function a() {
    return (v === null || v.buffer.detached === true || v.buffer.detached === void 0 && v.buffer !== o.memory.buffer) && (v = new DataView(o.memory.buffer)), v;
  }
  const oe = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
  let K = new oe("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  K.decode();
  function g(e, n) {
    return e = e >>> 0, K.decode(F().subarray(e, e + n));
  }
  function k(e) {
    const n = o.__wbindgen_export_3();
    return o.__wbindgen_export_4.set(n, e), n;
  }
  function d(e, n) {
    try {
      return e.apply(this, n);
    } catch (t) {
      const _ = k(t);
      o.__wbindgen_export_2(_);
    }
  }
  function p(e) {
    return e == null;
  }
  function I(e, n) {
    e = e >>> 0;
    const t = a(), _ = [];
    for (let r = e; r < e + 4 * n; r += 4) _.push(o.__wbindgen_export_4.get(t.getUint32(r, true)));
    return o.__wbindgen_export_5(e, n), _;
  }
  function ce(e, n) {
    return e = e >>> 0, F().subarray(e / 1, e / 1 + n);
  }
  const $ = typeof FinalizationRegistry > "u" ? {
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
    }, s = (...i) => {
      r.cnt++;
      const b = r.a;
      r.a = 0;
      try {
        return _(b, r.b, ...i);
      } finally {
        --r.cnt === 0 ? (o.__wbindgen_export_7.get(r.dtor)(b, r.b), $.unregister(r)) : r.a = b;
      }
    };
    return s.original = r, $.register(s, r, r), s;
  }
  function U(e) {
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
      r > 0 && (s += U(e[0]));
      for (let i = 1; i < r; i++) s += ", " + U(e[i]);
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
  function B(e) {
    const n = o.__wbindgen_export_4.get(e);
    return o.__wbindgen_export_8(e), n;
  }
  function O(e, n, t) {
    o.closure850_externref_shim(e, n, t);
  }
  function se(e, n) {
    o.__wbindgen_export_10(e, n);
  }
  function ie(e, n, t) {
    o.closure2784_externref_shim(e, n, t);
  }
  function ae(e, n, t, _) {
    o.closure2889_externref_shim(e, n, t, _);
  }
  const be = [
    "blob",
    "arraybuffer"
  ], ue = [
    "omit",
    "same-origin",
    "include"
  ], de = [
    "same-origin",
    "no-cors",
    "cors",
    "navigate"
  ], P = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channel_free(e >>> 0, 1));
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
        const m = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_ticket(m, this.__wbg_ptr, n);
        var r = a().getInt32(m + 4 * 0, true), s = a().getInt32(m + 4 * 1, true), i = a().getInt32(m + 4 * 2, true), b = a().getInt32(m + 4 * 3, true), w = r, u = s;
        if (b) throw w = 0, u = 0, B(i);
        return t = w, _ = u, g(w, u);
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
        return n = _, t = r, g(_, r);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export_6(n, t, 1);
      }
    }
    neighbors() {
      try {
        const r = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_neighbors(r, this.__wbg_ptr);
        var n = a().getInt32(r + 4 * 0, true), t = a().getInt32(r + 4 * 1, true), _ = I(n, t).slice();
        return o.__wbindgen_export_6(n, t * 4, 4), _;
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  const V = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channelsender_free(e >>> 0, 1));
  class W {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(W.prototype);
      return t.__wbg_ptr = n, V.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, V.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_channelsender_free(n, 0);
    }
    broadcast(n) {
      const t = h(n, o.__wbindgen_export_0, o.__wbindgen_export_1), _ = l;
      return o.channelsender_broadcast(this.__wbg_ptr, t, _);
    }
    set_nickame(n) {
      const t = h(n, o.__wbindgen_export_0, o.__wbindgen_export_1), _ = l;
      o.channelsender_set_nickame(this.__wbg_ptr, t, _);
    }
  }
  const G = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_chatnode_free(e >>> 0, 1));
  class L {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(L.prototype);
      return t.__wbg_ptr = n, G.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, G.unregister(this), n;
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
        return n = _, t = r, g(_, r);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export_6(n, t, 1);
      }
    }
    remote_info() {
      try {
        const r = o.__wbindgen_add_to_stack_pointer(-16);
        o.chatnode_remote_info(r, this.__wbg_ptr);
        var n = a().getInt32(r + 4 * 0, true), t = a().getInt32(r + 4 * 1, true), _ = I(n, t).slice();
        return o.__wbindgen_export_6(n, t * 4, 4), _;
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    create(n) {
      try {
        const s = o.__wbindgen_add_to_stack_pointer(-16), i = h(n, o.__wbindgen_export_0, o.__wbindgen_export_1), b = l;
        o.chatnode_create(s, this.__wbg_ptr, i, b);
        var t = a().getInt32(s + 4 * 0, true), _ = a().getInt32(s + 4 * 1, true), r = a().getInt32(s + 4 * 2, true);
        if (r) throw B(_);
        return M.__wrap(t);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    join(n, t) {
      try {
        const i = o.__wbindgen_add_to_stack_pointer(-16), b = h(n, o.__wbindgen_export_0, o.__wbindgen_export_1), w = l, u = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), m = l;
        o.chatnode_join(i, this.__wbg_ptr, b, w, u, m);
        var _ = a().getInt32(i + 4 * 0, true), r = a().getInt32(i + 4 * 1, true), s = a().getInt32(i + 4 * 2, true);
        if (s) throw B(r);
        return M.__wrap(_);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingbytesource_free(e >>> 0, 1));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingsink_free(e >>> 0, 1));
  const H = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_intounderlyingsource_free(e >>> 0, 1));
  class D {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(D.prototype);
      return t.__wbg_ptr = n, H.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, H.unregister(this), n;
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
  function fe(e, n) {
    const t = String(n), _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function ge(e) {
    e.abort();
  }
  function we() {
    return d(function(e, n, t, _, r) {
      e.append(g(n, t), g(_, r));
    }, arguments);
  }
  function le() {
    return d(function(e) {
      return e.arrayBuffer();
    }, arguments);
  }
  function he(e) {
    const n = e.body;
    return p(n) ? 0 : k(n);
  }
  function pe(e) {
    return e.buffer;
  }
  function ye(e) {
    return e.buffer;
  }
  function me(e) {
    const n = e.byobRequest;
    return p(n) ? 0 : k(n);
  }
  function xe(e) {
    return e.byteLength;
  }
  function ke(e) {
    return e.byteOffset;
  }
  function Se() {
    return d(function(e, n) {
      return e.call(n);
    }, arguments);
  }
  function ve() {
    return d(function(e, n, t) {
      return e.call(n, t);
    }, arguments);
  }
  function Ie(e) {
    return e.cancel();
  }
  function Te(e, n) {
    return e.catch(n);
  }
  function Re(e) {
    return L.__wrap(e);
  }
  function Fe() {
    return d(function(e, n) {
      e.clearTimeout(n);
    }, arguments);
  }
  function je() {
    return d(function(e) {
      e.close();
    }, arguments);
  }
  function Ce() {
    return d(function(e) {
      e.close();
    }, arguments);
  }
  function Ae() {
    return d(function(e) {
      e.close();
    }, arguments);
  }
  function Ee() {
    return d(function(e, n, t, _) {
      e.close(n, g(t, _));
    }, arguments);
  }
  function Me(e) {
    return e.code;
  }
  function Oe(e) {
    return e.crypto;
  }
  function Le(e) {
    return e.data;
  }
  function Ne(e, n) {
    var t = I(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.debug(...t);
  }
  function qe(e) {
    return e.done;
  }
  function ze() {
    return d(function(e, n) {
      e.enqueue(n);
    }, arguments);
  }
  function Ue(e, n) {
    let t, _;
    try {
      t = e, _ = n, console.error(g(e, n));
    } finally {
      o.__wbindgen_export_6(t, _, 1);
    }
  }
  function Be(e, n) {
    var t = I(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.error(...t);
  }
  function We(e) {
    return fetch(e);
  }
  function De(e, n) {
    return e.fetch(n);
  }
  function $e() {
    return d(function(e, n) {
      e.getRandomValues(n);
    }, arguments);
  }
  function Pe() {
    return d(function(e) {
      return e.getReader();
    }, arguments);
  }
  function Ve(e) {
    return e.getTime();
  }
  function Ge() {
    return d(function(e, n) {
      return Reflect.get(e, n);
    }, arguments);
  }
  function He(e) {
    const n = e.done;
    return p(n) ? 16777215 : n ? 1 : 0;
  }
  function Je(e) {
    return e.value;
  }
  function Ke(e, n) {
    return e[n];
  }
  function Qe() {
    return d(function(e, n) {
      return Reflect.has(e, n);
    }, arguments);
  }
  function Xe(e) {
    return e.headers;
  }
  function Ye(e) {
    let n;
    try {
      n = e instanceof ArrayBuffer;
    } catch {
      n = false;
    }
    return n;
  }
  function Ze(e) {
    let n;
    try {
      n = e instanceof Blob;
    } catch {
      n = false;
    }
    return n;
  }
  function en(e) {
    let n;
    try {
      n = e instanceof Response;
    } catch {
      n = false;
    }
    return n;
  }
  function nn(e) {
    let n;
    try {
      n = e instanceof Uint8Array;
    } catch {
      n = false;
    }
    return n;
  }
  function tn() {
    return Symbol.iterator;
  }
  function _n(e) {
    return e.length;
  }
  function rn(e, n) {
    var t = I(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.log(...t);
  }
  function on(e) {
    return e.msCrypto;
  }
  function cn() {
    return /* @__PURE__ */ new Date();
  }
  function sn() {
    return d(function() {
      return new Headers();
    }, arguments);
  }
  function an(e, n) {
    try {
      var t = {
        a: e,
        b: n
      }, _ = (s, i) => {
        const b = t.a;
        t.a = 0;
        try {
          return ae(b, t.b, s, i);
        } finally {
          t.a = b;
        }
      };
      return new Promise(_);
    } finally {
      t.a = t.b = 0;
    }
  }
  function bn() {
    return new Object();
  }
  function un() {
    return /* @__PURE__ */ new Map();
  }
  function dn() {
    return new Array();
  }
  function fn() {
    return new Error();
  }
  function gn() {
    return d(function(e, n) {
      return new WebSocket(g(e, n));
    }, arguments);
  }
  function wn(e) {
    return new Uint8Array(e);
  }
  function ln(e, n) {
    return new Error(g(e, n));
  }
  function hn() {
    return d(function() {
      return new AbortController();
    }, arguments);
  }
  function pn(e, n) {
    return new Function(g(e, n));
  }
  function yn(e, n, t) {
    return new Uint8Array(e, n >>> 0, t >>> 0);
  }
  function mn(e, n) {
    return new ReadableStream(D.__wrap(e), n);
  }
  function xn(e) {
    return new Uint8Array(e >>> 0);
  }
  function kn() {
    return d(function(e, n, t) {
      return new Request(g(e, n), t);
    }, arguments);
  }
  function Sn(e) {
    return e.next;
  }
  function vn() {
    return d(function(e) {
      return e.next();
    }, arguments);
  }
  function In(e) {
    return e.node;
  }
  function Tn(e) {
    return e.now();
  }
  function Rn() {
    return Date.now();
  }
  function Fn(e) {
    return e.now();
  }
  function jn(e) {
    return e.performance;
  }
  function Cn(e) {
    return e.process;
  }
  function An(e) {
    queueMicrotask(e);
  }
  function En(e) {
    return e.queueMicrotask;
  }
  function Mn() {
    return d(function(e, n) {
      e.randomFillSync(n);
    }, arguments);
  }
  function On(e) {
    return e.read();
  }
  function Ln(e) {
    return e.readyState;
  }
  function Nn(e, n) {
    const t = n.reason, _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function qn(e) {
    e.releaseLock();
  }
  function zn() {
    return d(function() {
      return module.require;
    }, arguments);
  }
  function Un(e) {
    return Promise.resolve(e);
  }
  function Bn() {
    return d(function(e, n) {
      e.respond(n >>> 0);
    }, arguments);
  }
  function Wn() {
    return d(function(e, n, t) {
      e.send(g(n, t));
    }, arguments);
  }
  function Dn() {
    return d(function(e, n, t) {
      e.send(ce(n, t));
    }, arguments);
  }
  function $n() {
    return d(function(e, n, t) {
      return e.setTimeout(n, t);
    }, arguments);
  }
  function Pn(e, n, t) {
    e[n >>> 0] = t;
  }
  function Vn(e, n, t) {
    e[n] = t;
  }
  function Gn(e, n, t) {
    e.set(n, t >>> 0);
  }
  function Hn(e, n, t) {
    return e.set(n, t);
  }
  function Jn(e, n) {
    e.binaryType = be[n];
  }
  function Kn(e, n) {
    e.body = n;
  }
  function Qn(e, n) {
    e.credentials = ue[n];
  }
  function Xn(e, n) {
    e.headers = n;
  }
  function Yn(e, n) {
    e.highWaterMark = n;
  }
  function Zn(e, n, t) {
    e.method = g(n, t);
  }
  function et(e, n) {
    e.mode = de[n];
  }
  function nt(e, n) {
    e.onclose = n;
  }
  function tt(e, n) {
    e.onerror = n;
  }
  function _t(e, n) {
    e.onmessage = n;
  }
  function rt(e, n) {
    e.onopen = n;
  }
  function ot(e, n) {
    e.signal = n;
  }
  function ct(e) {
    return e.signal;
  }
  function st(e, n) {
    const t = n.stack, _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function it() {
    const e = typeof global > "u" ? null : global;
    return p(e) ? 0 : k(e);
  }
  function at() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return p(e) ? 0 : k(e);
  }
  function bt() {
    const e = typeof self > "u" ? null : self;
    return p(e) ? 0 : k(e);
  }
  function ut() {
    const e = typeof window > "u" ? null : window;
    return p(e) ? 0 : k(e);
  }
  function dt(e) {
    return e.status;
  }
  function ft() {
    return d(function(e) {
      return JSON.stringify(e);
    }, arguments);
  }
  function gt(e, n, t) {
    return e.subarray(n >>> 0, t >>> 0);
  }
  function wt(e, n) {
    return e.then(n);
  }
  function lt(e, n, t) {
    return e.then(n, t);
  }
  function ht(e, n) {
    const t = n.url, _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function pt(e) {
    return e.value;
  }
  function yt(e) {
    return e.versions;
  }
  function mt(e) {
    const n = e.view;
    return p(n) ? 0 : k(n);
  }
  function xt(e, n) {
    var t = I(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.warn(...t);
  }
  function kt(e) {
    return +e;
  }
  function St(e) {
    return BigInt.asUintN(64, e);
  }
  function vt(e) {
    const n = e;
    return typeof n == "boolean" ? n ? 1 : 0 : 2;
  }
  function It(e) {
    const n = e.original;
    return n.cnt-- == 1 ? (n.a = 0, true) : false;
  }
  function Tt(e, n, t) {
    return T(e, n, 2775, se);
  }
  function Rt(e, n, t) {
    return T(e, n, 2785, ie);
  }
  function Ft(e, n, t) {
    return T(e, n, 851, O);
  }
  function jt(e, n, t) {
    return T(e, n, 851, O);
  }
  function Ct(e, n, t) {
    return T(e, n, 851, O);
  }
  function At(e, n, t) {
    return T(e, n, 851, O);
  }
  function Et(e, n) {
    const t = U(n), _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function Mt(e, n) {
    return new Error(g(e, n));
  }
  function Ot(e, n) {
    return e in n;
  }
  function Lt() {
    const e = o.__wbindgen_export_4, n = e.grow(4);
    e.set(0, void 0), e.set(n + 0, void 0), e.set(n + 1, null), e.set(n + 2, true), e.set(n + 3, false);
  }
  function Nt(e) {
    return typeof e == "function";
  }
  function qt(e) {
    const n = e;
    return typeof n == "object" && n !== null;
  }
  function zt(e) {
    return typeof e == "string";
  }
  function Ut(e) {
    return e === void 0;
  }
  function Bt(e, n) {
    return e == n;
  }
  function Wt() {
    return o.memory;
  }
  function Dt(e, n) {
    const t = n, _ = typeof t == "number" ? t : void 0;
    a().setFloat64(e + 8 * 1, p(_) ? 0 : _, true), a().setInt32(e + 4 * 0, !p(_), true);
  }
  function $t(e) {
    return e;
  }
  function Pt(e, n) {
    const t = n, _ = typeof t == "string" ? t : void 0;
    var r = p(_) ? 0 : h(_, o.__wbindgen_export_0, o.__wbindgen_export_1), s = l;
    a().setInt32(e + 4 * 1, s, true), a().setInt32(e + 4 * 0, r, true);
  }
  function Vt(e, n) {
    return g(e, n);
  }
  function Gt(e, n) {
    throw new Error(g(e, n));
  }
  URL = globalThis.URL;
  const c = await ne({
    "./chat_browser_bg.js": {
      __wbindgen_error_new: Mt,
      __wbindgen_string_new: Vt,
      __wbindgen_is_undefined: Ut,
      __wbindgen_in: Ot,
      __wbindgen_boolean_get: vt,
      __wbindgen_is_object: qt,
      __wbindgen_as_number: kt,
      __wbg_chatnode_new: Re,
      __wbindgen_jsval_loose_eq: Bt,
      __wbindgen_number_get: Dt,
      __wbindgen_string_get: Pt,
      __wbg_String_8f0eb39a4a4c2f66: fe,
      __wbindgen_number_new: $t,
      __wbindgen_bigint_from_u64: St,
      __wbg_getwithrefkey_1dc361bd10053bfe: Ke,
      __wbg_set_3f1d0b984ed272ed: Vn,
      __wbg_new_8a6f238a6ece86ea: fn,
      __wbg_stack_0ed75d68575b0f3c: st,
      __wbg_error_7534b8e9a36f1ab4: Ue,
      __wbindgen_cb_drop: It,
      __wbg_debug_55137df391ebfd29: Ne,
      __wbg_error_91947ba14c44e1c9: Be,
      __wbg_log_e51ef223c244b133: rn,
      __wbg_warn_479b8bbb8337357b: xt,
      __wbg_fetch_4465c2b10f21a927: We,
      __wbg_getReader_48e00749fe3f6089: Pe,
      __wbg_newwithintounderlyingsource_b47f6a6a596a7f24: mn,
      __wbindgen_is_string: zt,
      __wbg_signal_aaf9ad74119f20a4: ct,
      __wbg_new_e25e5aab09ff45db: hn,
      __wbg_abort_775ef1d17fc65868: ge,
      __wbg_instanceof_Blob_ca721ef3bdab15d1: Ze,
      __wbg_code_f4ec1e6e2e1b0417: Me,
      __wbg_reason_49f1cede8bcf23dd: Nn,
      __wbg_new_018dcc2d6c8c2f6a: sn,
      __wbg_append_8c7dd8d641a5f01b: we,
      __wbg_data_432d9c3df2630942: Le,
      __wbg_now_d18023d54d4e5500: Fn,
      __wbg_sethighwatermark_793c99c89830c8e9: Yn,
      __wbg_byobRequest_77d9adf63337edfb: me,
      __wbg_close_5ce03e29be453811: Ae,
      __wbg_view_fd8a56e8983f448d: mt,
      __wbg_respond_1f279fa9f8edcb1c: Bn,
      __wbg_close_304cc1fef3466669: Ce,
      __wbg_enqueue_bb16ba72f537dc9e: ze,
      __wbg_read_a2434af1186cb56c: On,
      __wbg_releaseLock_091899af97991d2e: qn,
      __wbg_cancel_8a308660caa6cadf: Ie,
      __wbg_getdone_d47073731acd3e74: He,
      __wbg_getvalue_009dcd63692bee1f: Je,
      __wbg_newwithstrandinit_06c535e0a867c635: kn,
      __wbg_setbody_5923b78a95eedf29: Kn,
      __wbg_setcredentials_c3a22f1cd105a2c6: Qn,
      __wbg_setheaders_834c0bdb6a8949ad: Xn,
      __wbg_setmethod_3c5280fe5d890842: Zn,
      __wbg_setmode_5dc300b865044b65: et,
      __wbg_setsignal_75b21ef3a81de905: ot,
      __wbg_instanceof_Response_f2cc20d9f7dfd644: en,
      __wbg_url_ae10c34ca209681d: ht,
      __wbg_status_f6360336ca686bf0: dt,
      __wbg_headers_9cb51cfd2ac780a4: Xe,
      __wbg_body_0b8fd1fe671660df: he,
      __wbg_arrayBuffer_d1b44c4390db422f: le,
      __wbg_readyState_7ef6e63c349899ed: Ln,
      __wbg_setonopen_2da654e1f39745d5: rt,
      __wbg_setonerror_8639efe354b947cd: tt,
      __wbg_setonclose_14fc475a49d488fc: nt,
      __wbg_setonmessage_6eccab530a8fb4c7: _t,
      __wbg_setbinaryType_92fa1ffd873b327c: Jn,
      __wbg_new_92c54fc74574ef55: gn,
      __wbg_close_2893b7d056a0627d: je,
      __wbg_close_e1253d480ed93ce3: Ee,
      __wbg_send_0293179ba074ffb4: Wn,
      __wbg_send_fc0c204e8a1757f4: Dn,
      __wbg_fetch_509096533071c657: De,
      __wbg_setTimeout_592d289a39056aa2: $n,
      __wbg_clearTimeout_710cb18754e44d88: Fe,
      __wbg_queueMicrotask_97d92b4fcc8a61c5: An,
      __wbg_queueMicrotask_d3219def82552485: En,
      __wbindgen_is_function: Nt,
      __wbg_performance_7a3ffd0b17f663ad: jn,
      __wbg_now_2c95c9de01293173: Tn,
      __wbg_crypto_ed58b8e10a292839: Oe,
      __wbg_process_5c1d670bc53614b8: Cn,
      __wbg_versions_c71aa1626a93e0a1: yt,
      __wbg_node_02999533c4ea02e3: In,
      __wbg_require_79b1e9274cde3c87: zn,
      __wbg_msCrypto_0a36e2ec3a343d26: on,
      __wbg_randomFillSync_ab2cfe79ebbf2740: Mn,
      __wbg_getRandomValues_bcb4912f16000dc4: $e,
      __wbg_new_78feb108b6472713: dn,
      __wbg_newnoargs_105ed471475aaf50: pn,
      __wbg_new_5e0be73521bc8c17: un,
      __wbg_next_25feadfc0913fea9: Sn,
      __wbg_value_cd1ffa7b1ab794f1: pt,
      __wbg_iterator_9a24c88df860dc65: tn,
      __wbg_new_405e22f390576ce2: bn,
      __wbg_set_37837023f3d740e8: Pn,
      __wbg_instanceof_ArrayBuffer_e14585432e3737fc: Ye,
      __wbg_new_c68d7209be747379: ln,
      __wbg_call_672a4d21634d4a24: Se,
      __wbg_call_7cccdd69e0791ae2: ve,
      __wbg_set_8fc6bf8a5b1071d1: Hn,
      __wbg_next_6574e1a8a62d1055: vn,
      __wbg_done_769e5ede4b31c67b: qe,
      __wbg_getTime_46267b1c24877e30: Ve,
      __wbg_new0_f788a2397c7ca929: cn,
      __wbg_now_807e54c39636c349: Rn,
      __wbg_get_67b2ba62fc30de12: Ge,
      __wbg_has_a5ea9117f258a0ec: Qe,
      __wbg_buffer_609cc3eee51ed158: ye,
      __wbg_stringify_f7ed6987935b4a24: ft,
      __wbg_new_23a2665fac83c611: an,
      __wbg_resolve_4851785c9c5f573d: Un,
      __wbg_catch_a6e601879b2610e9: Te,
      __wbg_then_44b73946d2fb3e7d: wt,
      __wbg_then_48b406749878a531: lt,
      __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0: at,
      __wbg_static_accessor_SELF_37c5d418e4bf5819: bt,
      __wbg_static_accessor_WINDOW_5de37043a91a9c40: ut,
      __wbg_static_accessor_GLOBAL_88a902d13a557d07: it,
      __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a: yn,
      __wbg_new_a12002a7f91c75be: wn,
      __wbg_instanceof_Uint8Array_17156bcf118086a9: nn,
      __wbg_newwithlength_a381634e90c276d4: xn,
      __wbg_buffer_09165b52af8c5237: pe,
      __wbg_subarray_aa9065fa9dc5df96: gt,
      __wbg_length_a446193dc22c12f8: _n,
      __wbg_byteLength_e674b853d9c77e1d: xe,
      __wbg_byteOffset_fd862df290ef848d: ke,
      __wbg_set_65595bdd868b3009: Gn,
      __wbindgen_debug_string: Et,
      __wbindgen_throw: Gt,
      __wbindgen_memory: Wt,
      __wbindgen_closure_wrapper3891: Ft,
      __wbindgen_closure_wrapper3893: jt,
      __wbindgen_closure_wrapper3895: Ct,
      __wbindgen_closure_wrapper3897: At,
      __wbindgen_closure_wrapper14872: Tt,
      __wbindgen_closure_wrapper14927: Rt,
      __wbindgen_init_externref_table: Lt
    }
  }, ee), Ht = c.memory, Jt = c.start, Kt = c.__wbg_chatnode_free, Qt = c.chatnode_spawn, Xt = c.chatnode_node_id, Yt = c.chatnode_remote_info, Zt = c.chatnode_create, e_ = c.chatnode_join, n_ = c.__wbg_channel_free, t_ = c.channel_sender, __ = c.channel_receiver, r_ = c.channel_ticket, o_ = c.channel_id, c_ = c.channel_neighbors, s_ = c.__wbg_channelsender_free, i_ = c.channelsender_broadcast, a_ = c.channelsender_set_nickame, b_ = c.__wbg_intounderlyingbytesource_free, u_ = c.intounderlyingbytesource_type, d_ = c.intounderlyingbytesource_autoAllocateChunkSize, f_ = c.intounderlyingbytesource_start, g_ = c.intounderlyingbytesource_pull, w_ = c.intounderlyingbytesource_cancel, l_ = c.__wbg_intounderlyingsource_free, h_ = c.intounderlyingsource_pull, p_ = c.intounderlyingsource_cancel, y_ = c.__wbg_intounderlyingsink_free, m_ = c.intounderlyingsink_write, x_ = c.intounderlyingsink_close, k_ = c.intounderlyingsink_abort, S_ = c.ring_core_0_17_11__bn_mul_mont, v_ = c.__wbindgen_export_0, I_ = c.__wbindgen_export_1, T_ = c.__wbindgen_export_2, R_ = c.__wbindgen_export_3, F_ = c.__wbindgen_export_4, j_ = c.__wbindgen_export_5, C_ = c.__wbindgen_export_6, A_ = c.__wbindgen_export_7, E_ = c.__wbindgen_add_to_stack_pointer, M_ = c.__wbindgen_export_8, O_ = c.closure850_externref_shim, L_ = c.__wbindgen_export_10, N_ = c.closure2784_externref_shim, q_ = c.closure2889_externref_shim, Q = c.__wbindgen_start, z_ = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wbg_channel_free: n_,
    __wbg_channelsender_free: s_,
    __wbg_chatnode_free: Kt,
    __wbg_intounderlyingbytesource_free: b_,
    __wbg_intounderlyingsink_free: y_,
    __wbg_intounderlyingsource_free: l_,
    __wbindgen_add_to_stack_pointer: E_,
    __wbindgen_export_0: v_,
    __wbindgen_export_1: I_,
    __wbindgen_export_10: L_,
    __wbindgen_export_2: T_,
    __wbindgen_export_3: R_,
    __wbindgen_export_4: F_,
    __wbindgen_export_5: j_,
    __wbindgen_export_6: C_,
    __wbindgen_export_7: A_,
    __wbindgen_export_8: M_,
    __wbindgen_start: Q,
    channel_id: o_,
    channel_neighbors: c_,
    channel_receiver: __,
    channel_sender: t_,
    channel_ticket: r_,
    channelsender_broadcast: i_,
    channelsender_set_nickame: a_,
    chatnode_create: Zt,
    chatnode_join: e_,
    chatnode_node_id: Xt,
    chatnode_remote_info: Yt,
    chatnode_spawn: Qt,
    closure2784_externref_shim: N_,
    closure2889_externref_shim: q_,
    closure850_externref_shim: O_,
    intounderlyingbytesource_autoAllocateChunkSize: d_,
    intounderlyingbytesource_cancel: w_,
    intounderlyingbytesource_pull: g_,
    intounderlyingbytesource_start: f_,
    intounderlyingbytesource_type: u_,
    intounderlyingsink_abort: k_,
    intounderlyingsink_close: x_,
    intounderlyingsink_write: m_,
    intounderlyingsource_cancel: p_,
    intounderlyingsource_pull: h_,
    memory: Ht,
    ring_core_0_17_11__bn_mul_mont: S_,
    start: Jt
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  te(z_);
  Q();
  X = class {
    constructor(n) {
      __publicField(this, "chatNode");
      __publicField(this, "channels", /* @__PURE__ */ new Map());
      this.chatNode = n;
    }
    static async create() {
      R.info("Spawning iroh node");
      const n = await L.spawn();
      return R.info(`Iroh node spawned. our node id: ${n.node_id()}`), new X(n);
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
      R.info(`joining channel ${_}`);
      const r = _.substring(5, 13);
      let s, i = new Promise((S) => {
        s = S;
      });
      const b = this.chatNode.node_id(), w = {
        id: b,
        name: t,
        lastSeen: /* @__PURE__ */ new Date(),
        status: "online",
        role: q.Myself
      }, u = {
        label: r,
        messages: [],
        channel: n,
        subscribers: [],
        peers: /* @__PURE__ */ new Map(),
        nextId: 0,
        neighbors: 0,
        neighborSubscribers: [],
        peerSubscribers: [],
        myself: w,
        onClose: s
      };
      u.peers.set(b, w), this.channels.set(_, u);
      const m = async () => {
        const S = n.receiver.getReader();
        for (; ; ) {
          const { done: y, value: j } = await S.read();
          if (y) break;
          const f = j;
          if (console.debug("channel event", _.substring(0, 8), f), f.type === "messageReceived") {
            const x = {
              id: f.from,
              name: f.nickname,
              lastSeen: new Date(f.sentTimestamp / 1e3),
              status: "online",
              role: q.RemoteNode
            };
            u.peers.set(f.from, x);
            const C = {
              id: J(u),
              sender: f.from,
              content: f.text
            };
            u.messages.push(C);
            const Z = z(u, C);
            for (const N of u.subscribers) N(Z);
            for (const N of u.peerSubscribers) N();
          } else if (f.type === "presence") {
            const x = {
              id: f.from,
              name: f.nickname,
              lastSeen: new Date(f.sentTimestamp / 1e3),
              status: "online",
              role: q.RemoteNode
            };
            u.peers.set(f.from, x);
            for (const C of u.peerSubscribers) C();
          } else if (f.type === "joined") {
            R.info(`joined channel ${_}`), u.neighbors += f.neighbors.length;
            for (const x of u.neighborSubscribers) x(u.neighbors);
          } else if (f.type === "neighborUp") {
            u.neighbors += 1;
            for (const x of u.neighborSubscribers) x(u.neighbors);
          } else if (f.type === "neighborDown") {
            u.neighbors -= 1;
            for (const x of u.neighborSubscribers) x(u.neighbors);
          }
        }
      }, Y = async () => {
        for (; ; ) {
          const S = /* @__PURE__ */ new Date();
          for (const y of u.peers.values()) {
            if (y.id === b) {
              y.lastSeen = S;
              continue;
            }
            const j = (S.getTime() - y.lastSeen.getTime()) / 1e3;
            j > 20 ? y.status = "offline" : j > 10 ? y.status = "away" : y.status = "online";
          }
          await new Promise((y) => setTimeout(y, 1e3));
        }
      };
      return Promise.race([
        i,
        m(),
        Y()
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
        id: J(_),
        content: t
      };
      _.messages.push(s);
      const i = z(_, s);
      for (const b of _.subscribers) b(i);
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
      return t.messages.map((r) => z(t, r));
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
  function U_(e, n) {
    const t = e.peers.get(n);
    return t && t.name ? t.name : n.substring(0, 8);
  }
  function z(e, n) {
    return {
      ...n,
      nickname: U_(e, n.sender)
    };
  }
  function J(e) {
    const n = "" + e.nextId;
    return e.nextId = e.nextId + 1, n;
  }
});
export {
  X as IrohAPI,
  __tla
};
