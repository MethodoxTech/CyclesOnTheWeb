import { type SceneBuffers } from '../kernel/globals.js';
import { Integrator } from '../kernel/integrator.js';
import { type CompiledScene } from '../scene/compile.js';
import type { RenderSettings, SceneDescription } from '../scene/types.js';
export interface Film {
    width: number;
    height: number;
    /** Sum of linear RGBA over all samples, row 0 at the top. */
    sum: Float32Array;
    /** Samples rendered so far (the most any pixel has; with adaptive sampling converged pixels have fewer, counted in ext). */
    samples: number;
    /** Extra passes, EXT_STRIDE floats per pixel, when adaptive sampling or denoising passes are on: the adaptive aux buffer, the pixel's sample count, the denoising albedo and normal sums. */
    ext?: Float32Array;
    /** Adaptive sampling: 1 for pixels that have converged and receive no more samples. */
    converged?: Uint8Array;
}
/** Linear RGBA per pixel averaged over the samples taken (per pixel when the film counts them). */
export declare function filmToLinear(film: Film): Float32Array;
/** A denoising pass averaged per pixel, three floats per pixel: 'albedo' (linear RGB) or 'normal' (camera space: x right, y up, z towards the viewer). Null when the film has no passes. */
export declare function filmPass(film: Film, pass: 'albedo' | 'normal'): Float32Array | null;
/** Number of samples each pixel received (adaptive sampling), or null when every pixel has film.samples. */
export declare function filmSampleCounts(film: Film): Float32Array | null;
/** Renders a tile into a fresh tile buffer; used by workers. */
export declare function renderTileWith(integrator: Integrator, x: number, y: number, w: number, h: number, sampleStart: number, sampleCount: number): Float32Array;
export declare function createIntegrator(buffers: SceneBuffers, params: Uint32Array): Integrator;
/**
 * Render a whole frame on this thread. Intended for tests and small offline jobs; interactive use goes through the worker renderer.
 */
export declare function renderLocal(scene: SceneDescription | CompiledScene, settingsIn: RenderSettings, opts?: {
    sampleStart?: number;
    backgroundCameraVisible?: boolean;
}): Film;
