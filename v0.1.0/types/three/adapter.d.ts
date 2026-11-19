import type { Color, SceneDescription } from '../scene/types.js';
interface V3 {
    x: number;
    y: number;
    z: number;
}
interface ColorLike {
    r: number;
    g: number;
    b: number;
    isColor?: boolean;
}
interface M4 {
    elements: ArrayLike<number>;
}
interface AttributeLike {
    count: number;
    itemSize: number;
    array: ArrayLike<number>;
    normalized?: boolean;
    isInterleavedBufferAttribute?: boolean;
    getX(i: number): number;
    getY(i: number): number;
    getZ(i: number): number;
}
interface GeometryLike {
    attributes: Record<string, AttributeLike | undefined>;
    index: {
        array: ArrayLike<number>;
        count: number;
    } | null;
    groups: {
        start: number;
        count: number;
        materialIndex?: number;
    }[];
    uuid?: string;
}
interface TextureLike {
    uuid: string;
    isTexture?: boolean;
    image: unknown;
    flipY: boolean;
    colorSpace?: string;
    wrapS: number;
    wrapT: number;
    magFilter?: number;
    matrix?: {
        elements: ArrayLike<number>;
    };
    matrixAutoUpdate?: boolean;
    updateMatrix?: () => void;
    mapping?: number;
    type?: number;
    format?: number;
}
interface MaterialLike {
    type: string;
    visible?: boolean;
    color?: ColorLike;
    map?: TextureLike | null;
    metalness?: number;
    roughness?: number;
    metalnessMap?: TextureLike | null;
    roughnessMap?: TextureLike | null;
    emissive?: ColorLike;
    emissiveIntensity?: number;
    emissiveMap?: TextureLike | null;
    normalMap?: TextureLike | null;
    normalScale?: {
        x: number;
        y: number;
    };
    opacity?: number;
    transparent?: boolean;
    alphaTest?: number;
    transmission?: number;
    transmissionMap?: TextureLike | null;
    ior?: number;
    specularIntensity?: number;
    specularColor?: ColorLike;
    clearcoat?: number;
    sheen?: number;
    iridescence?: number;
    name?: string;
}
interface Object3DLike {
    type: string;
    name?: string;
    visible: boolean;
    matrixWorld: M4;
    children: Object3DLike[];
    castShadow?: boolean;
    isMesh?: boolean;
    isInstancedMesh?: boolean;
    isLight?: boolean;
    geometry?: GeometryLike;
    material?: MaterialLike | MaterialLike[];
    count?: number;
    instanceMatrix?: {
        array: ArrayLike<number>;
    };
    intensity?: number;
    color?: ColorLike;
    angle?: number;
    penumbra?: number;
    width?: number;
    height?: number;
    target?: {
        matrixWorld: M4;
    };
    shadow?: {
        radius?: number;
    };
    traverseVisible?(cb: (o: Object3DLike) => void): void;
    updateMatrixWorld?(force?: boolean): void;
}
interface SceneLike extends Object3DLike {
    background?: ColorLike | TextureLike | null;
    environment?: TextureLike | null;
    environmentIntensity?: number;
    backgroundIntensity?: number;
    environmentRotation?: V3;
}
interface CameraLike {
    isPerspectiveCamera?: boolean;
    fov: number;
    zoom?: number;
    matrixWorld: M4;
    updateMatrixWorld?(force?: boolean): void;
}
export interface FromThreeOptions {
    /** Treat MeshBasicMaterial as an emitter of its colour (unlit, as it looks in three.js). Default true. */
    basicAsEmission?: boolean;
    /** Scale applied to every punctual and area light (for scenes authored with legacy light units). Default 1. */
    lightScale?: number;
}
export interface FromThreeResult {
    scene: SceneDescription;
    /** Features of the three.js scene that the port does not render yet, so the caller can tell the user. */
    warnings: string[];
    /** When the three.js background is a plain colour but lighting comes from an environment map, composite the film over this colour (see DisplayOptions.background). */
    backgroundColor?: Color;
}
/**
 * Translates a three.js scene and camera into a SceneDescription.
 */
export declare function fromThreeScene(threeScene: SceneLike, threeCamera: CameraLike, opts?: FromThreeOptions): FromThreeResult;
export {};
