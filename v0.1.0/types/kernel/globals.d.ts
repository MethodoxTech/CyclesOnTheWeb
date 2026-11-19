export interface SceneBuffers {
    /** Scene words (header, BVH, triangles, shaders, lights, tables), see src/scene/layout.ts. */
    scene: Uint32Array;
    /** Texture texels, see TexFlags. */
    texels: Uint32Array;
}
export declare class KernelGlobals {
    readonly u32: Uint32Array;
    readonly f32: Float32Array;
    readonly i32: Int32Array;
    readonly texels: Uint32Array;
    readonly nodes: number;
    readonly numTris: number;
    readonly triVerts: number;
    readonly triInfo: number;
    readonly vertNormals: number;
    readonly vertUVs: number;
    readonly shaders: number;
    readonly numShaders: number;
    readonly textures: number;
    readonly numLights: number;
    readonly lights: number;
    readonly numDistribution: number;
    readonly distribution: number;
    readonly pdfTriangles: number;
    readonly pdfLights: number;
    readonly backgroundLight: number;
    readonly bgResX: number;
    readonly bgResY: number;
    readonly bgMarginal: number;
    readonly bgConditional: number;
    readonly filterTable: number;
    readonly worldShader: number;
    readonly flags: number;
    readonly numHittableLights: number;
    readonly hittableLights: number;
    readonly tGgxE: number;
    readonly tGgxEavg: number;
    readonly tGgxGlassE: number;
    readonly tGgxGlassEavg: number;
    readonly tGgxGlassInvE: number;
    readonly tGgxGlassInvEavg: number;
    readonly tGenSchlickIorS: number;
    readonly tGenSchlickS: number;
    readonly sceneRadius: number;
    constructor(buffers: SceneBuffers);
}
