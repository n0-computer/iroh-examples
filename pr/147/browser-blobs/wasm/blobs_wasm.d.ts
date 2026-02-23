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
    readonly wasm_bindgen__closure__destroy__hd3a9bb98e0b50058: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__he9a7a811b172d63e: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__ha071cb228bf0a101: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__h4fc4d32b8bf38386: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__hefbc5bc76a0388bc: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__h788e1e5e966a3471: (a: number, b: number) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h6c48c2f11434e0ba: (a: number, b: number, c: any, d: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h7144c514e40f03d0: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h4bbee9be6a9bf555: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__hecf30ba54fa53b31: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h1dae589765e137be: (a: number, b: number) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h63e45b1af0ed2e4a: (a: number, b: number) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h7fb2534e8b479b80: (a: number, b: number) => void;
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
