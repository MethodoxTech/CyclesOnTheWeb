import type { MeshGeometry } from './types.js';
/** A UV sphere with smooth normals and UVs. */
export declare function uvSphere(radius?: number, widthSegments?: number, heightSegments?: number): MeshGeometry;
/** An axis-aligned quad in the XZ plane facing +Y, centred at the origin. */
export declare function plane(width?: number, depth?: number): MeshGeometry;
/** A box centred at the origin with outward faces (flat shaded). Faces in the order +X, -X, +Y, -Y, +Z, -Z; `groups` carries one group per face. */
export declare function box(sx?: number, sy?: number, sz?: number, opts?: {
    omit?: ('+x' | '-x' | '+y' | '-y' | '+z' | '-z')[];
    inward?: boolean;
}): MeshGeometry;
/** Column-major TRS matrix: translation, Euler XYZ rotation (radians, applied X then Y then Z as three.js 'XYZ'), scale. */
export declare function trs(t: readonly [number, number, number], r?: readonly [number, number, number], s?: readonly [number, number, number]): number[];
