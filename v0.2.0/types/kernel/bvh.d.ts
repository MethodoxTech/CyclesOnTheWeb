import type { KernelGlobals } from './globals.js';
export interface Ray {
    Px: number;
    Py: number;
    Pz: number;
    Dx: number;
    Dy: number;
    Dz: number;
    tmin: number;
    tmax: number;
    /** Triangle to skip (Cycles ray.self.prim), or -1. */
    selfPrim: number;
}
export interface Hit {
    t: number;
    u: number;
    v: number;
    /** Triangle index in BVH order, or -1 for a miss. */
    prim: number;
}
export declare function makeRay(): Ray;
export declare function makeHit(): Hit;
/** Writes u, v, t into out[0..2] and returns true on a hit within [tmin, tmax]. */
export declare function rayTriangleIntersect(Px: number, Py: number, Pz: number, Dx: number, Dy: number, Dz: number, tmin: number, tmax: number, ax: number, ay: number, az: number, bx: number, by: number, bz: number, cx: number, cy: number, cz: number, out: Float64Array): boolean;
/** Work counters for closest-hit traversal, counted always (integer increments are noise next to a slab test) so that speed claims can rest on work done rather than on a stopwatch: rays traced, node boxes tested and triangles tested. */
export declare const traversalStats: {
    rays: number;
    nodes: number;
    tris: number;
};
export declare function resetTraversalStats(): void;
/**
 * Closest hit along the ray. `ignoreFlags` is a TriFlags mask of triangles to ignore (camera-invisible for camera rays).
 *
 * Ordered traversal: at an inner node both children are tested, the nearer is visited first and the farther pushed with its entry distance, and a popped node is skipped when the closest hit so far is already nearer than its entry. Ties between triangles at equal t go to the lower index, so the hit is the one an unordered traversal finds.
 */
export declare function intersectClosest(kg: KernelGlobals, ray: Ray, hit: Hit, ignoreFlags: number): boolean;
/** Whether anything blocks the segment (any hit), skipping `ray.selfPrim` and triangles with any of `ignoreFlags`. Writes the blocking primitive and t into `hit`. */
export declare function intersectAny(kg: KernelGlobals, ray: Ray, hit: Hit, ignoreFlags: number): boolean;
export declare const IGNORE_FOR_CAMERA: 4;
export declare const IGNORE_FOR_SHADOW: 8;
