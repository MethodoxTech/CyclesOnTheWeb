import { type Float3, safeSqrt } from '../util/math.js';
import { BsdfEvalResult, Closure } from './closure/bsdf.js';
import type { KernelGlobals } from './globals.js';
import type { Hit, Ray } from './bvh.js';
export declare class ShaderData {
    P: Float3;
    N: Float3;
    Ng: Float3;
    wi: Float3;
    u: number;
    v: number;
    prim: number;
    object: number;
    shader: number;
    triFlags: number;
    runtimeFlag: number;
    rayLength: number;
    /** Texture coordinates. */
    tu: number;
    tv: number;
    numClosure: number;
    closures: Closure[];
    /** Accumulated emission (Cycles closure_emission_background). */
    er: number;
    eg: number;
    eb: number;
    /** Accumulated transparency (Cycles closure_transparent_extinction). */
    tr: number;
    tg: number;
    tb: number;
    /** Shading normal before any normal map, used by the shadow terminator offset. */
    Nsmooth: Float3;
}
declare const _vN: Float3;
/** Cycles shader_setup_from_ray for a triangle hit. */
export declare function shaderSetupFromRay(kg: KernelGlobals, sd: ShaderData, ray: Ray, hit: Hit): void;
/**
 * Evaluate the surface shader of sd into closures, emission and transparency (Cycles surface_shader_eval with the SVM program replaced by the fixed-function record).
 */
export declare function evalSurfaceShader(kg: KernelGlobals, sd: ShaderData): void;
/** Emission seen from direction wi (Cycles surface_shader_emission: two-sided, constant over the hemisphere). */
export declare function surfaceShaderEmission(sd: ShaderData, out: Float64Array): void;
/** Transparency of the shading point for shadow rays (Cycles surface_shader_transparency). */
export declare function shaderTransparency(sd: ShaderData, out: Float64Array): void;
/** Whether the shader of a triangle can be transparent to shadow rays (so occlusion needs shader evaluation). */
export declare function shaderHasTransparency(kg: KernelGlobals, shader: number): boolean;
export { BsdfEvalResult, safeSqrt, _vN };
