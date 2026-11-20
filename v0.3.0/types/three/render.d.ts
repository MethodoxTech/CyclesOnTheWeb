import { fromThreeScene, type FromThreeOptions } from './adapter.js';
import { type CreateRendererOptions } from '../render/create.js';
import { type DisplayOptions, type RenderProgress, type Renderer } from '../render/renderer.js';
import { type Denoiser } from '../render/denoise.js';
import type { RenderSettings } from '../scene/types.js';
type Object3DLike = Parameters<typeof fromThreeScene>[0];
type CameraLike = Parameters<typeof fromThreeScene>[1];
interface Context2DLike {
    createImageData(w: number, h: number): {
        data: Uint8ClampedArray;
        width: number;
        height: number;
    };
    putImageData(img: unknown, x: number, y: number): void;
    drawImage?(img: unknown, dx: number, dy: number, dw: number, dh: number): void;
    imageSmoothingEnabled?: boolean;
}
interface CanvasLike {
    width: number;
    height: number;
    getContext(kind: '2d'): Context2DLike | null;
}
export interface ThreeRenderProgress extends RenderProgress {
    /** Which backend renders, 'gpu' or 'cpu', and why WebGPU was not used when it was not. */
    backend: 'cpu' | 'gpu';
    fallbackReason?: string;
    /** True when the canvas shows the denoised image. */
    denoised: boolean;
}
export interface RenderThreeSceneOptions {
    /** The canvas to draw into. It is drawn with a 2D context, so it should not also be a WebGL canvas. */
    canvas: CanvasLike;
    scene: Object3DLike;
    camera: CameraLike;
    /** Samples per pixel to stop at. Default 256. */
    samples?: number;
    /** Render resolution as a fraction of the canvas size (the image is scaled up to fill it). Default 1. */
    resolutionScale?: number;
    /** Any other render settings (bounces, clamping, adaptive sampling, ...). */
    settings?: Partial<RenderSettings>;
    /** Backend and worker options for createRenderer. Default backend 'auto'. */
    renderer?: CreateRendererOptions;
    /** Options for fromThreeScene. */
    fromThree?: FromThreeOptions;
    /** How the film becomes 8-bit pixels. */
    display?: DisplayOptions;
    /** A denoiser run on the finished image (and on the image so far when the render is stopped); turns on the albedo and normal passes it is given. */
    denoise?: Denoiser;
    /** Watch the camera and the scene and restart when they change. Default true. */
    watch?: boolean;
    /** Called after every pass. */
    onProgress?: (p: ThreeRenderProgress) => void;
    /** Called whenever the scene is (re)converted, with the features of the three.js scene that are not rendered. */
    onWarnings?: (warnings: string[]) => void;
    /** Called when rendering fails. Without it the error is rethrown from `done`. */
    onError?: (e: unknown) => void;
}
export interface ThreeRenderHandle {
    /** The renderer, once created. */
    readonly renderer: Renderer | null;
    /** Warnings from the last conversion of the scene. */
    readonly warnings: string[];
    /** Samples in the image on the canvas. */
    readonly samples: number;
    /** Resolves when the current render reaches its sample count (or converges), or when the handle is stopped. */
    readonly done: Promise<void>;
    /** Converts the scene again and restarts, for changes the watcher cannot see. */
    restart(): void;
    /** Stops rendering and watching; the image stays on the canvas. */
    stop(): void;
    /** Stops and frees the renderer (workers or GPU device). */
    dispose(): void;
}
/**
 * Path traces a three.js scene into a canvas: converts it with fromThreeScene, renders progressively on WebGPU or the CPU workers, draws every pass, restarts when the camera or scene changes, and reports samples and warnings. Returns at once with a handle; `handle.done` resolves when the image is finished.
 */
export declare function renderThreeScene(opts: RenderThreeSceneOptions): ThreeRenderHandle;
export {};
