/* tslint:disable */
/* eslint-disable */
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
    complete_size(hash: string): Promise<bigint>;
    download(ticket: string): Promise<string>;
    endpoint_id(): string;
    get(hash: string): Promise<Uint8Array>;
    import(data: Uint8Array): Promise<string>;
    static spawn(): Promise<BlobsNode>;
}

export class IntoUnderlyingByteSource {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cancel(): void;
    pull(controller: ReadableByteStreamController): Promise<any>;
    start(controller: ReadableByteStreamController): void;
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
    cancel(): void;
    pull(controller: ReadableStreamDefaultController): Promise<any>;
}

export function start(): void;

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
    readonly __wbg_intounderlyingsink_free: (a: number, b: number) => void;
    readonly intounderlyingsink_abort: (a: number, b: any) => any;
    readonly intounderlyingsink_close: (a: number) => any;
    readonly intounderlyingsink_write: (a: number, b: any) => any;
    readonly __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
    readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
    readonly intounderlyingbytesource_cancel: (a: number) => void;
    readonly intounderlyingbytesource_pull: (a: number, b: any) => any;
    readonly intounderlyingbytesource_start: (a: number, b: any) => void;
    readonly intounderlyingbytesource_type: (a: number) => number;
    readonly ring_core_0_17_14__bn_mul_mont: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly wasm_bindgen__closure__destroy__h1b449bd8e350af95: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__h07c9d9a00ee05c90: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__hf0e68b9f1a9e1fe8: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__h9044571d61c1b3e8: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__h122ce4c39af727de: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__h12e8ab036b4be1e9: (a: number, b: number) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h738eab8d00135c20: (a: number, b: number, c: any, d: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h15f3c45775f37e0d: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h35206f2c4bfdc438: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__hebd4f37d08ede1db: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h839cf75c62217a1a: (a: number, b: number) => void;
    readonly wasm_bindgen__convert__closures_____invoke__hb59de10f871839ef: (a: number, b: number) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h38475aa04c8d91fd: (a: number, b: number) => void;
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
