import type { PerspectiveCamera, RenderSettings, SceneDescription } from '../scene/types.js';
import type { Film } from '../render/local.js';
import { type RenderProgress, type Renderer } from '../render/renderer.js';
/**
 * Whether scene buffers can be shared with workers instead of copied to each: SharedArrayBuffer exists in Node, and in browsers only on cross-origin isolated pages (COOP same-origin and COEP require-corp).
 */
export declare function canShareMemory(): boolean;
export interface CpuRendererOptions {
    workers?: number;
    /** URL of cycles-worker.js; defaults to the file next to this bundle. */
    workerUrl?: URL | string;
    tileSize?: number;
    /** Share the scene buffers with the workers through SharedArrayBuffer when the page allows it (default), or always copy them. */
    shareMemory?: boolean;
}
/** How the last scene reached the workers: one shared copy, or a copy per worker; and how many bytes were copied to get it there. */
export interface SceneTransfer {
    mode: 'shared' | 'copied';
    bytesCopied: number;
}
export declare class CpuRenderer implements Renderer {
    readonly backend: 'cpu';
    info: string;
    fallbackReason?: string;
    film: Film;
    private workers;
    private compiled;
    private desc;
    private settings;
    private camera;
    private generation;
    private stopped;
    private tileSize;
    private pending;
    private nextId;
    private error;
    private shareMemory;
    private sceneAcks;
    sceneTransfer: SceneTransfer;
    private constructor();
    static create(opts?: CpuRendererOptions): Promise<CpuRenderer>;
    private pendingResolve;
    setScene(scene: SceneDescription, settings: RenderSettings): Promise<void>;
    setCamera(camera: PerspectiveCamera): void;
    private adaptive;
    private allConverged;
    private resetFilm;
    stop(): void;
    render(onProgress?: (p: RenderProgress, film: Film) => void): Promise<RenderProgress>;
    dispose(): void;
}
