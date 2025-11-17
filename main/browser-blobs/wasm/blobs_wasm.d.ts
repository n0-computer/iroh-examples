/* tslint:disable */
/* eslint-disable */
export function start(): void;
/**
 * The `ReadableStreamType` enum.
 *
 * *This API requires the following crate features to be activated: `ReadableStreamType`*
 */
type ReadableStreamType = "bytes";
export class BlobsNode {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  endpoint_id(): string;
  complete_size(hash: string): Promise<bigint>;
  get(hash: string): Promise<Uint8Array>;
  static spawn(): Promise<BlobsNode>;
  import(data: Uint8Array): Promise<string>;
  download(ticket: string): Promise<string>;
}
export class IntoUnderlyingByteSource {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  pull(controller: ReadableByteStreamController): Promise<any>;
  start(controller: ReadableByteStreamController): void;
  cancel(): void;
  readonly autoAllocateChunkSize: number;
  readonly type: ReadableStreamType;
}
export class IntoUnderlyingSink {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  abort(reason: any): Promise<any>;
  close(): Promise<any>;
  write(chunk: any): Promise<any>;
}
export class IntoUnderlyingSource {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  pull(controller: ReadableStreamDefaultController): Promise<any>;
  cancel(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_blobsnode_free: (a: number, b: number) => void;
  readonly blobsnode_complete_size: (a: number, b: number, c: number) => any;
  readonly blobsnode_download: (a: number, b: number, c: number) => any;
  readonly blobsnode_endpoint_id: (a: number) => [number, number];
  readonly blobsnode_get: (a: number, b: number, c: number) => any;
  readonly blobsnode_import: (a: number, b: any) => any;
  readonly blobsnode_spawn: () => any;
  readonly start: () => void;
  readonly __wbg_intounderlyingsource_free: (a: number, b: number) => void;
  readonly intounderlyingsource_cancel: (a: number) => void;
  readonly intounderlyingsource_pull: (a: number, b: any) => any;
  readonly __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
  readonly __wbg_intounderlyingsink_free: (a: number, b: number) => void;
  readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
  readonly intounderlyingbytesource_cancel: (a: number) => void;
  readonly intounderlyingbytesource_pull: (a: number, b: any) => any;
  readonly intounderlyingbytesource_start: (a: number, b: any) => void;
  readonly intounderlyingbytesource_type: (a: number) => number;
  readonly intounderlyingsink_abort: (a: number, b: any) => any;
  readonly intounderlyingsink_close: (a: number) => any;
  readonly intounderlyingsink_write: (a: number, b: any) => any;
  readonly ring_core_0_17_14__bn_mul_mont: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h515622588655e8ac: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen__closure__destroy__hd2ce859e74370ac9: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h84e77fe59aff539f: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen__closure__destroy__h602cb35f0402a19c: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures_____invoke__hfc68c92a2f1e90e7: (a: number, b: number) => void;
  readonly wasm_bindgen__closure__destroy__hd4c2439e15638195: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h354babe9fa2a5540: (a: number, b: number) => void;
  readonly wasm_bindgen__closure__destroy__hcc814b107b496071: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h7d839b67dd20f7c9: (a: number, b: number) => void;
  readonly wasm_bindgen__closure__destroy__h0d2796f6747c0223: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h7134ad860473df55: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen__closure__destroy__h47c4304c7f5d4704: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h400498881dd64829: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
