export declare const GGX_E_RES = 32;
export declare const GGX_GLASS_E_RES = 32;
export declare const GGX_GEN_SCHLICK_RES = 32;
export declare const SHEEN_RES = 32;
export interface BsdfTables {
    data: Float32Array;
    ggx_E: number;
    ggx_Eavg: number;
    ggx_glass_E: number;
    ggx_glass_Eavg: number;
    ggx_glass_inv_E: number;
    ggx_glass_inv_Eavg: number;
    ggx_gen_schlick_ior_s: number;
    ggx_gen_schlick_s: number;
    sheen_ltc: number;
}
/** The decoded tables, built once per realm. */
export declare function bsdfTables(): BsdfTables;
/** Linear interpolation into a 1D table (Cycles lookup_table_read). */
export declare function lookupTableRead(t: ArrayLike<number>, x: number, offset: number, size: number): number;
export declare function lookupTableRead2D(t: ArrayLike<number>, x: number, y: number, offset: number, xsize: number, ysize: number): number;
export declare function lookupTableRead3D(t: ArrayLike<number>, x: number, y: number, z: number, offset: number, xsize: number, ysize: number, zsize: number): number;
