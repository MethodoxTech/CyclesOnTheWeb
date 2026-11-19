import type { RenderSettings, SceneDescription } from './types.js';
import { type SceneBuffers } from '../kernel/globals.js';
export interface CompiledScene extends SceneBuffers {
    /** Number of triangles, lights and emitters, for diagnostics. */
    stats: {
        triangles: number;
        vertices: number;
        bvhNodes: number;
        lights: number;
        emissiveTriangles: number;
        textures: number;
        sceneWords: number;
        texelWords: number;
    };
}
/** Cycles' filter_table: an inverted CDF of the filter, made symmetric (util_cdf_inverted with make_symmetric). */
export declare function buildFilterTable(type: 'box' | 'gaussian' | 'blackman-harris', width: number): Float32Array;
/**
 * Compiles the scene. `settings` is only consulted for the background importance map resolution.
 */
export declare function compileScene(desc: SceneDescription, settings?: Partial<RenderSettings>): CompiledScene;
