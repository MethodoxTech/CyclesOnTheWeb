import type { PerspectiveCamera, RenderSettings, SceneDescription } from '../scene/types.js';
import type { Film } from '../render/local.js';
import { type RenderProgress, type Renderer } from '../render/renderer.js';
export interface CpuRendererOptions {
    workers?: number;
    /** URL of cycles-worker.js; defaults to the file next to this bundle. */
    workerUrl?: URL | string;
    tileSize?: number;
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
    private constructor();
    static create(opts?: CpuRendererOptions): Promise<CpuRenderer>;
    private pendingResolve;
    setScene(scene: SceneDescription, settings: RenderSettings): Promise<void>;
    setCamera(camera: PerspectiveCamera): void;
    private resetFilm;
    stop(): void;
    render(onProgress?: (p: RenderProgress, film: Film) => void): Promise<RenderProgress>;
    dispose(): void;
}
