export declare const SCENE_MAGIC = 1129923415;
export declare const SCENE_VERSION = 1;
/** Header word indices. Offsets are word offsets into the scene buffer. */
export declare const H: {
    readonly MAGIC: 0;
    readonly VERSION: 1;
    readonly NUM_NODES: 2;
    readonly NODES: 3;
    readonly NUM_TRIS: 4;
    readonly TRI_VERTS: 5;
    readonly TRI_INFO: 6;
    readonly NUM_VERTS: 7;
    readonly VERT_NORMALS: 8;
    readonly VERT_UVS: 9;
    readonly NUM_SHADERS: 10;
    readonly SHADERS: 11;
    readonly NUM_TEXTURES: 12;
    readonly TEXTURES: 13;
    readonly NUM_LIGHTS: 14;
    readonly LIGHTS: 15;
    readonly NUM_DISTRIBUTION: 16;
    readonly DISTRIBUTION: 17;
    /** f32: Cycles' distribution_pdf_triangles. */
    readonly PDF_TRIANGLES: 18;
    /** f32: Cycles' distribution_pdf_lights. */
    readonly PDF_LIGHTS: 19;
    /** Index of the background light in the light list, or NONE. */
    readonly BACKGROUND_LIGHT: 20;
    readonly BG_RES_X: 21;
    readonly BG_RES_Y: 22;
    readonly BG_MARGINAL: 23;
    readonly BG_CONDITIONAL: 24;
    readonly FILTER_TABLE: 25;
    /** The world shader record index. */
    readonly WORLD_SHADER: 26;
    /** Bit flags, see SceneFlags. */
    readonly FLAGS: 27;
    readonly TABLE_GGX_E: 28;
    readonly TABLE_GGX_EAVG: 29;
    readonly TABLE_GGX_GLASS_E: 30;
    readonly TABLE_GGX_GLASS_EAVG: 31;
    readonly TABLE_GGX_GLASS_INV_E: 32;
    readonly TABLE_GGX_GLASS_INV_EAVG: 33;
    readonly TABLE_GGX_GEN_SCHLICK_IOR_S: 34;
    readonly TABLE_GGX_GEN_SCHLICK_S: 35;
    readonly TABLE_SHEEN_LTC: 36;
    /** f32 world-space scene bounds, used for the scene radius of distant lights. */
    readonly BOUNDS_MIN: 40;
    readonly BOUNDS_MAX: 43;
    /** Number of lights that can be hit by rays (area, sphere, sun with angle), listed first-light-index-last in LIGHT_HITTABLE. */
    readonly NUM_HITTABLE_LIGHTS: 46;
    readonly HITTABLE_LIGHTS: 47;
    readonly SIZE: 64;
};
export declare const NONE = 4294967295;
export declare const SceneFlags: {
    readonly USE_DIRECT_LIGHT: 1;
    readonly BACKGROUND_MIS: 2;
};
/** BVH node: min.xyz, left-or-first (u32), max.xyz, count (u32). Leaves have count > 0 and store their first triangle; inner nodes store the right child, the left child follows. */
export declare const NODE_SIZE = 8;
/** Gathered triangle vertices in BVH order: v0.xyzw, v1.xyzw, v2.xyzw (w unused). */
export declare const TRI_VERTS_SIZE = 12;
/** Triangle info: v0, v1, v2 vertex indices, shader, object, flags, emitter distribution index (or NONE), pad. */
export declare const TRI_INFO_SIZE = 8;
export declare const TI: {
    readonly V0: 0;
    readonly V1: 1;
    readonly V2: 2;
    readonly SHADER: 3;
    readonly OBJECT: 4;
    readonly FLAGS: 5;
    readonly PAD0: 6;
    readonly PAD1: 7;
};
export declare const TriFlags: {
    readonly SMOOTH: 1;
    readonly HAS_UV: 2;
    readonly CAMERA_INVISIBLE: 4;
    readonly SHADOW_INVISIBLE: 8;
    readonly EMISSIVE: 16;
};
export declare const VERT_NORMAL_SIZE = 4;
export declare const VERT_UV_SIZE = 2;
/** Shader record. Texture slots hold a texture descriptor index or NONE. */
export declare const SHADER_SIZE = 40;
export declare const SH: {
    readonly TYPE: 0;
    readonly FLAGS: 1;
    readonly BASE_COLOR: 2;
    readonly BASE_COLOR_TEX: 5;
    readonly METALLIC: 6;
    readonly ROUGHNESS: 7;
    readonly METALLIC_ROUGHNESS_TEX: 8;
    readonly IOR: 9;
    readonly TRANSMISSION: 10;
    readonly TRANSMISSION_TEX: 11;
    readonly SPECULAR_IOR_LEVEL: 12;
    readonly SPECULAR_TINT: 13;
    readonly EMISSION: 16;
    readonly EMISSION_TEX: 19;
    readonly NORMAL_TEX: 20;
    readonly NORMAL_SCALE: 21;
    readonly ALPHA: 22;
    readonly ALPHA_TEX: 23;
    /** For the world shader: environment texture and rotation. */
    readonly ENV_TEX: 24;
    readonly ENV_ROTATION: 25;
    /** Cycles' SD_MIS_FRONT/BACK-like flags for emission. */
    readonly RESERVED: 26;
};
export declare const ShaderType: {
    readonly PRINCIPLED: 0;
    readonly DIFFUSE: 1;
    readonly GLOSSY: 2;
    readonly GLASS: 3;
    readonly EMISSION: 4;
    readonly TRANSPARENT: 5;
    readonly BACKGROUND: 6;
};
export declare const ShaderFlags: {
    /** Has any emission (Cycles SD_HAS_EMISSION). */
    readonly HAS_EMISSION: 1;
    /** Emission is sampled by NEE (Cycles' emission sampling != NONE), so forward hits need MIS. */
    readonly USE_MIS: 2;
    readonly HAS_ALPHA: 4;
    /** Emission does not depend on textures, so it can be evaluated from the record alone. */
    readonly CONSTANT_EMISSION: 8;
};
/** Texture descriptor: texel word offset, width, height, flags, then a 2x3 UV transform. */
export declare const TEX_SIZE = 12;
export declare const TX: {
    readonly OFFSET: 0;
    readonly WIDTH: 1;
    readonly HEIGHT: 2;
    readonly FLAGS: 3;
    readonly M: 4;
};
export declare const TexFlags: {
    /** RGBA half floats in two words per texel; otherwise RGBA8 in one word. */
    readonly HALF: 1;
    readonly SRGB: 2;
    readonly NEAREST: 4;
    readonly FLIP_Y: 8;
    /** Wrap mode for S in bits 8-9 and T in bits 10-11: 0 repeat, 1 clamp, 2 mirror. */
    readonly WRAP_S_SHIFT: 8;
    readonly WRAP_T_SHIFT: 10;
};
/** Light record, laid out after Cycles' KernelLight with its unions flattened. */
export declare const LIGHT_SIZE = 32;
export declare const LT: {
    readonly TYPE: 0;
    readonly FLAGS: 1;
    /** Position (point, spot, area) or direction of travel (sun). */
    readonly CO: 4;
    readonly RADIUS: 7;
    readonly STRENGTH: 8;
    readonly EVAL_FAC: 11;
    readonly SPOT_DIR: 12;
    readonly COS_HALF_SPOT_ANGLE: 15;
    readonly SPOT_SMOOTH: 16;
    readonly COS_HALF_LARGER_SPREAD: 17;
    readonly AXIS_U: 12;
    readonly LEN_U: 15;
    readonly AXIS_V: 16;
    readonly LEN_V: 19;
    readonly AREA_DIR: 20;
    readonly INVAREA: 23;
    readonly SUN_ANGLE: 12;
    readonly SUN_ONE_MINUS_COSANGLE: 13;
    readonly SUN_PDF: 14;
};
export declare const LightType: {
    readonly POINT: 0;
    readonly SPOT: 1;
    readonly SUN: 2;
    readonly AREA: 3;
    readonly BACKGROUND: 4;
};
export declare const LightFlags: {
    readonly USE_MIS: 1;
    readonly CAMERA_VISIBLE: 2;
    readonly CAST_SHADOW: 4;
    readonly IS_SPHERE: 8;
};
/** Light distribution entry: cumulative area (f32), prim (i32: triangle index >= 0, or ~light index). Cycles' KernelLightDistribution. */
export declare const DIST_SIZE = 2;
export declare const FILTER_TABLE_SIZE = 1024;
/** Per-frame parameters: camera, integrator settings, sample range. Shared as a uniform buffer on the GPU. */
export declare const PARAMS_SIZE = 64;
export declare const P: {
    readonly WIDTH: 0;
    readonly HEIGHT: 1;
    readonly SAMPLE_START: 2;
    readonly SAMPLE_COUNT: 3;
    readonly SEED: 4;
    readonly SOBOL_MASK: 5;
    readonly MAX_BOUNCE: 6;
    readonly MAX_DIFFUSE: 7;
    readonly MAX_GLOSSY: 8;
    readonly MAX_TRANSMISSION: 9;
    readonly MAX_TRANSPARENT: 10;
    readonly MIN_BOUNCE: 11;
    /** f32 */
    readonly CLAMP_DIRECT: 12;
    readonly CLAMP_INDIRECT: 13;
    /** Camera-to-world 3x4, rows (f32 x 12). */
    readonly CAM_TO_WORLD: 16;
    /** tan(fov_y / 2) and aspect (f32). */
    readonly CAM_TAN_HALF_FOV: 28;
    readonly CAM_ASPECT: 29;
    readonly CAM_APERTURE: 30;
    readonly CAM_FOCUS: 31;
    /** Tile origin and size for the current dispatch. */
    readonly TILE_X: 32;
    readonly TILE_Y: 33;
    readonly TILE_W: 34;
    readonly TILE_H: 35;
    /** Background visible to camera (1/0). */
    readonly BG_CAMERA_VISIBLE: 36;
};
