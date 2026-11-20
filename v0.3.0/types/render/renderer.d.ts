import type { PerspectiveCamera, RenderSettings, SceneDescription } from '../scene/types.js';
import type { Film } from './local.js';
export interface RenderProgress {
    /** Samples per pixel accumulated so far. */
    samples: number;
    totalSamples: number;
    elapsedMs: number;
    done: boolean;
}
export interface Renderer {
    readonly backend: 'cpu' | 'gpu';
    /** Human-readable description of the device, e.g. "cpu: 4 workers". */
    readonly info: string;
    /** Why the GPU was not used, when a GPU was asked for and the CPU answered. */
    readonly fallbackReason?: string;
    /** Compiles and uploads a scene; resets accumulation. */
    setScene(scene: SceneDescription, settings: RenderSettings): Promise<void>;
    /** Moves the camera and restarts accumulation, keeping the scene. */
    setCamera(camera: PerspectiveCamera): void;
    /** Renders progressively until the sample count is reached or stop() is called. */
    render(onProgress?: (p: RenderProgress, film: Film) => void): Promise<RenderProgress>;
    stop(): void;
    /** The accumulated film (sum of samples). */
    readonly film: Film;
    dispose(): void;
}
export interface DisplayOptions {
    exposure?: number;
    /** 'standard' is the sRGB transfer function, matching Blender's Standard view; 'linear' writes linear values clamped to [0, 1]. */
    view?: 'standard' | 'linear';
    /** Composite over this colour where the film is transparent; default: keep alpha. */
    background?: readonly [number, number, number] | null;
}
/** Converts the film into 8-bit RGBA for display (with deterministic ordered dithering). */
export declare function filmToRGBA8(film: Film, opts?: DisplayOptions, out?: Uint8ClampedArray): Uint8ClampedArray;
/** Progressive sample schedule shared by both backends: small passes first for quick feedback, then larger ones. Independent of device and worker count, so results are reproducible. */
export declare function passSchedule(totalSamples: number): number[];
