import type { PerspectiveCamera, RenderSettings, SceneDescription } from '../scene/types.js';
import type { Film } from '../render/local.js';
import { type RenderProgress, type Renderer } from '../render/renderer.js';
export type WebGpuProbe = {
    ok: true;
    device: GPUDevice;
    info: string;
} | {
    ok: false;
    reason: string;
};
/** The complete WGSL module. */
export declare function kernelSource(): string;
export declare function probeWebGpu(): Promise<WebGpuProbe>;
export declare class GpuRenderer implements Renderer {
    readonly backend: 'gpu';
    readonly info: string;
    fallbackReason?: string;
    film: Film;
    private device;
    private pipelines;
    private layout;
    private compiled;
    private desc;
    private settings;
    private camera;
    private buffers;
    private bindGroup;
    private prepGroup;
    private maxPaths;
    private generation;
    private stopped;
    private lost;
    private gpuError;
    private constructor();
    static create(device: GPUDevice, info: string): Promise<GpuRenderer>;
    setScene(scene: SceneDescription, settings: RenderSettings): Promise<void>;
    setCamera(camera: PerspectiveCamera): void;
    private adaptive;
    private allConverged;
    /** Film floats per pixel on the GPU: RGBA alone, or RGBA and the extra passes (P.FILM_STRIDE). */
    private filmStride;
    private resetFilm;
    stop(): void;
    /** Waves per sample: every non-transparent bounce, every transparent bounce (passing through a lamp or a shadow catcher counts as one) and the final hit. */
    private waves;
    private encodeSamples;
    render(onProgress?: (p: RenderProgress, film: Film) => void): Promise<RenderProgress>;
    private destroyBuffers;
    dispose(): void;
}
