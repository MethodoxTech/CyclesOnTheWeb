import { LightTreeNodeType } from './layout.js';
export { LightTreeNodeType };
export interface Cone {
    ax: number;
    ay: number;
    az: number;
    thetaO: number;
    thetaE: number;
}
export interface Measure {
    bmin: [number, number, number];
    bmax: [number, number, number];
    cone: Cone;
    energy: number;
}
/** An emitter: a lamp (id = ~lamp index) or an emissive triangle (id = triangle index in BVH order). */
export interface TreeEmitter {
    id: number;
    centroid: [number, number, number];
    measure: Measure;
    /** Set when the emitter is placed in a leaf. */
    bitTrail: number;
    distant: boolean;
}
export interface FlatNode {
    measure: Measure;
    type: number;
    /** Leaves: number of emitters and the first one; inner nodes: -1 and the two children. */
    numEmitters: number;
    child0: number;
    child1: number;
}
export interface FlatLightTree {
    nodes: FlatNode[];
    /** Emitters in tree order: each leaf's emitters are contiguous. */
    emitters: TreeEmitter[];
}
export declare function emptyCone(): Cone;
export declare function emptyMeasure(): Measure;
/** merge(OrientationBounds, OrientationBounds). */
export declare function mergeCones(ca: Cone, cb: Cone): Cone;
/** LightTreeMeasure::add, in place. */
export declare function addMeasure(m: Measure, o: Measure): void;
/**
 * Builds the tree over local emitters (lamps that are not distant, and emissive triangles) and distant ones (suns and the background), as LightTree::build: the root's left child is the tree over local emitters and its right child one leaf holding every distant light. maxLightsInLeaf is Cycles' 8.
 */
export declare function buildLightTree(local: TreeEmitter[], distant: TreeEmitter[], maxLightsInLeaf?: number): FlatLightTree | null;
