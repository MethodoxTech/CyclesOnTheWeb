import { type Float3 } from '../util/math.js';
import type { KernelGlobals } from './globals.js';
export declare const LIGHT_TRIANGLE = 5;
export declare class LightSample {
    P: Float3;
    Ng: Float3;
    D: Float3;
    t: number;
    pdf: number;
    evalFac: number;
    /** Emitted radiance before eval_fac (light strength, or the background/emission shader value). */
    er: number;
    eg: number;
    eb: number;
    type: number;
    /** Light index for lamps, triangle index for mesh lights. */
    lamp: number;
    prim: number;
    castShadow: boolean;
}
export declare function shaderBackgroundEval(kg: KernelGlobals, D: Float3, out: Float64Array): void;
/** Cycles background_map_pdf for a world direction. */
export declare function backgroundLightPdf(kg: KernelGlobals, Dx: number, Dy: number, Dz: number): number;
/**
 * Sample a light for NEE from shading point P with normal N (Cycles light_sample_from_position with the flat distribution). Fills ls including selection pdf; returns false when no sample.
 */
export declare function lightSampleFromPosition(kg: KernelGlobals, rx: number, ry: number, rz: number, P: Float3, N: Float3, hasTransmission: boolean, ls: LightSample): boolean;
/** Cycles triangle_light_pdf for a forward hit on an emissive triangle at distance t along direction -wi from the previous vertex. */
export declare function triangleLightPdf(kg: KernelGlobals, prim: number, Ng: Float3, wi: Float3, P: Float3, t: number): number;
export declare class LightHit {
    t: number;
    lamp: number;
}
/** Closest hittable lamp along the ray within (tmin, tmax): area lights and sphere lights (Cycles lights_intersect). */
export declare function lightsIntersect(kg: KernelGlobals, Px: number, Py: number, Pz: number, Dx: number, Dy: number, Dz: number, tmin: number, tmax: number, cameraRay: boolean, hit: LightHit): boolean;
/** Emitted radiance and NEE pdf of a lamp hit by a forward ray (Cycles light_eval_from_intersection). Writes rgb into out and returns the pdf (without selection). */
export declare function lampEvalFromIntersection(kg: KernelGlobals, lamp: number, Px: number, Py: number, Pz: number, Dx: number, Dy: number, Dz: number, t: number, N: Float3, hadTransmission: boolean, out: Float64Array): number;
/** Iterate sun lights with an angle for a ray that escaped (Cycles integrate_distant_lights). */
export declare function numLamps(kg: KernelGlobals): number;
export declare function lampType(kg: KernelGlobals, lamp: number): number;
export declare function lampFlags(kg: KernelGlobals, lamp: number): number;
