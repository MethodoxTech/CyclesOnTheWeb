import { type SceneBuffers } from '../kernel/globals.js';
import { Integrator } from '../kernel/integrator.js';
import { type CompiledScene } from '../scene/compile.js';
import type { RenderSettings, SceneDescription } from '../scene/types.js';
export interface Film {
    width: number;
    height: number;
    /** Sum of linear RGBA over all samples, row 0 at the top. */
    sum: Float32Array;
    samples: number;
}
/** Linear RGBA per pixel averaged over the samples taken. */
export declare function filmToLinear(film: Film): Float32Array;
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
