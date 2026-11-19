export interface BvhBuildResult {
    /** NODE_SIZE words per node, as Uint32 with the float fields written through a Float32 view of the same buffer. */
    nodes: Uint32Array;
    nodeCount: number;
    /** Primitive order: leaf ranges index into this permutation of the input triangles. */
    order: Uint32Array;
}
/**
 * Builds a BVH over triangles given as gathered vertices (9 floats per triangle: v0, v1, v2).
 */
export declare function buildBvh(triVerts: Float32Array | number[], triCount: number): BvhBuildResult;
