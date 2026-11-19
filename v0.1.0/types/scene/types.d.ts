export type Vec3 = readonly [number, number, number];
export type Color = readonly [number, number, number];
/** A triangle mesh in object space. Without `indices`, every three positions form a triangle. */
export interface MeshGeometry {
    positions: Float32Array | number[];
    normals?: Float32Array | number[];
    uvs?: Float32Array | number[];
    indices?: Uint32Array | Uint16Array | number[];
    /** Ranges of the index (or vertex) stream that use a different entry of the instance's material list, as three.js BufferGeometry groups do. */
    groups?: {
        start: number;
        count: number;
        materialIndex: number;
    }[];
}
export interface MeshInstance {
    name?: string;
    geometry: MeshGeometry;
    /** Object-to-world matrix, column-major. Identity when omitted. */
    matrix?: ArrayLike<number>;
    /** Index into Scene.materials, or one index per geometry group. */
    material: number | number[];
    /** Whether camera rays see the object (Cycles' camera ray visibility). Default true. */
    visibleToCamera?: boolean;
    /** Whether the object blocks shadow rays. Default true. */
    castShadow?: boolean;
}
export type Wrap = 'repeat' | 'clamp' | 'mirror';
/** An image. 8-bit data is RGBA, row 0 at the top; float data is RGBA linear. */
export interface Texture {
    width: number;
    height: number;
    data: Uint8Array | Uint8ClampedArray | Float32Array;
    /** How 8-bit data is encoded. Float data is always linear. Default 'srgb'. */
    colorSpace?: 'srgb' | 'linear';
    wrapS?: Wrap;
    wrapT?: Wrap;
    /** Default 'linear' (bilinear). */
    filter?: 'linear' | 'nearest';
    /** Set when the image rows are stored bottom-up (row 0 at v = 0). Default false. */
    flipY?: boolean;
}
/** A reference from a material slot to an image, with an optional UV transform (a 3x3 affine matrix, row-major [a, b, c, d, e, f] meaning u' = a u + b v + c, v' = d u + e v + f), as three.js Texture.matrix. */
export interface TextureRef {
    texture: number;
    transform?: readonly [number, number, number, number, number, number];
}
/**
 * Cycles' Principled BSDF (Blender 4.x). Parameters not set take Cycles' defaults.
 *
 * Texture slots follow glTF so that three.js and glTF materials map directly: `metallicRoughnessTexture` reads roughness from G and metallic from B, and both multiply the scalar values; `baseColorTexture` alpha multiplies `alpha`.
 */
export interface PrincipledMaterial {
    type: 'principled';
    name?: string;
    baseColor?: Color;
    baseColorTexture?: TextureRef;
    metallic?: number;
    roughness?: number;
    metallicRoughnessTexture?: TextureRef;
    ior?: number;
    transmission?: number;
    transmissionTexture?: TextureRef;
    specularIorLevel?: number;
    specularTint?: Color;
    emissionColor?: Color;
    emissionStrength?: number;
    emissionTexture?: TextureRef;
    normalTexture?: TextureRef;
    normalScale?: number;
    alpha?: number;
    alphaTexture?: TextureRef;
}
export interface DiffuseMaterial {
    type: 'diffuse';
    name?: string;
    color?: Color;
    colorTexture?: TextureRef;
}
/** Cycles' Glossy BSDF with the multiscatter GGX distribution: a conductor-like reflection tinted by `color`. */
export interface GlossyMaterial {
    type: 'glossy';
    name?: string;
    color?: Color;
    roughness?: number;
}
/** Cycles' Glass BSDF (GGX). */
export interface GlassMaterial {
    type: 'glass';
    name?: string;
    color?: Color;
    roughness?: number;
    ior?: number;
}
export interface EmissionMaterial {
    type: 'emission';
    name?: string;
    color?: Color;
    strength?: number;
}
export interface TransparentMaterial {
    type: 'transparent';
    name?: string;
    color?: Color;
}
export type Material = PrincipledMaterial | DiffuseMaterial | GlossyMaterial | GlassMaterial | EmissionMaterial | TransparentMaterial;
interface LightBase {
    name?: string;
    color?: Color;
    /** Cycles light strength: watts for point, spot and area lights; W/m^2 (irradiance) for the sun. */
    strength: number;
    /** Whether camera rays see the light's surface. Default true. */
    visibleToCamera?: boolean;
    /** Whether the light takes part in MIS with BSDF sampling. Default true. */
    useMis?: boolean;
    castShadow?: boolean;
    /** Cycles' Light.normalize: whether point, spot and area strength is divided by the light's surface area (a power, Blender's default) or not (a radiant exitance, radiance = strength / pi). Default true. */
    normalize?: boolean;
}
/** A point light; with a radius it is a sphere light, as Cycles' point lights are. */
export interface PointLight extends LightBase {
    type: 'point';
    position: Vec3;
    radius?: number;
}
export interface SpotLight extends LightBase {
    type: 'spot';
    position: Vec3;
    /** Direction the spot points along. */
    direction: Vec3;
    /** Full cone angle in radians (Cycles spot_size). Default pi/4. */
    angle?: number;
    /** Edge softness in [0, 1] (Cycles spot_smooth). */
    blend?: number;
    radius?: number;
}
export interface SunLight extends LightBase {
    type: 'sun';
    /** Direction the light travels (from the sun towards the scene). */
    direction: Vec3;
    /** Angular diameter in radians. */
    angle?: number;
}
/** A one-sided rectangle or ellipse emitting along `normal`. */
export interface AreaLight extends LightBase {
    type: 'area';
    position: Vec3;
    /** Direction the light emits towards. */
    normal: Vec3;
    /** Direction of the light's local U axis (width). Made orthogonal to the normal. */
    tangent: Vec3;
    width: number;
    height: number;
    shape?: 'rectangle' | 'ellipse';
}
export type Light = PointLight | SpotLight | SunLight | AreaLight;
export interface PerspectiveCamera {
    type?: 'perspective';
    position: Vec3;
    /** A point the camera looks at; alternatively give `matrix`. */
    target?: Vec3;
    up?: Vec3;
    /** Camera-to-world matrix (column-major, camera looking down -Z), as three.js Camera.matrixWorld. Overrides position/target. */
    matrix?: ArrayLike<number>;
    /** Vertical field of view in radians. */
    fov: number;
    /** Thin-lens aperture radius in metres. 0 is a pinhole. */
    apertureRadius?: number;
    focusDistance?: number;
}
export interface World {
    color?: Color;
    strength?: number;
    /** Equirectangular environment image, mapped as three.js maps equirectangular textures. */
    map?: number;
    /** Rotation of the environment about +Y, radians. */
    rotation?: number;
    /** Whether camera rays see the background. Default true. */
    visibleToCamera?: boolean;
}
export interface SceneDescription {
    meshes: MeshInstance[];
    materials: Material[];
    textures?: Texture[];
    lights?: Light[];
    camera: PerspectiveCamera;
    world?: World;
}
export interface RenderSettings {
    width: number;
    height: number;
    /** Samples per pixel to render in total. */
    samples: number;
    seed?: number;
    /** Cycles' bounce limits; defaults follow Blender's (total 12, diffuse 4, glossy 4, transmission 12, transparent 8). */
    maxBounces?: number;
    maxDiffuseBounces?: number;
    maxGlossyBounces?: number;
    maxTransmissionBounces?: number;
    maxTransparentBounces?: number;
    /** Bounces before Russian roulette starts (Cycles min_bounce). Default 0, as Cycles. */
    minBounces?: number;
    /** Per-sample clamps, 0 disables. Cycles defaults: direct 0, indirect 10. */
    clampDirect?: number;
    clampIndirect?: number;
    filter?: 'box' | 'gaussian' | 'blackman-harris';
    /** Pixel filter width in pixels. Default 1.5 (Blackman-Harris), as Blender. */
    filterWidth?: number;
    /** Resolution of the background importance map; 0 picks it from the environment image. */
    backgroundMapResolution?: number;
}
export {};
