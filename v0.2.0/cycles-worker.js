/*! Cycles on the Web v0.2.0 | Apache-2.0 | A port of Blender's Cycles (Copyright Blender Foundation, Apache-2.0) | https://github.com/Methodox-Technologies/DivookaFrontendComponents_CyclesOnTheWeb */

// src/scene/layout.ts
var H = {
  MAGIC: 0,
  VERSION: 1,
  NUM_NODES: 2,
  NODES: 3,
  NUM_TRIS: 4,
  TRI_VERTS: 5,
  TRI_INFO: 6,
  NUM_VERTS: 7,
  VERT_NORMALS: 8,
  VERT_UVS: 9,
  NUM_SHADERS: 10,
  SHADERS: 11,
  NUM_TEXTURES: 12,
  TEXTURES: 13,
  NUM_LIGHTS: 14,
  LIGHTS: 15,
  NUM_DISTRIBUTION: 16,
  DISTRIBUTION: 17,
  /** f32: Cycles' distribution_pdf_triangles. */
  PDF_TRIANGLES: 18,
  /** f32: Cycles' distribution_pdf_lights. */
  PDF_LIGHTS: 19,
  /** Index of the background light in the light list, or NONE. */
  BACKGROUND_LIGHT: 20,
  BG_RES_X: 21,
  BG_RES_Y: 22,
  BG_MARGINAL: 23,
  BG_CONDITIONAL: 24,
  FILTER_TABLE: 25,
  /** The world shader record index. */
  WORLD_SHADER: 26,
  /** Bit flags, see SceneFlags. */
  FLAGS: 27,
  TABLE_GGX_E: 28,
  TABLE_GGX_EAVG: 29,
  TABLE_GGX_GLASS_E: 30,
  TABLE_GGX_GLASS_EAVG: 31,
  TABLE_GGX_GLASS_INV_E: 32,
  TABLE_GGX_GLASS_INV_EAVG: 33,
  TABLE_GGX_GEN_SCHLICK_IOR_S: 34,
  TABLE_GGX_GEN_SCHLICK_S: 35,
  TABLE_SHEEN_LTC: 36,
  /** Cycles' light tree (when SceneFlags.USE_LIGHT_TREE): node count, node records and emitter records. */
  NUM_LIGHT_TREE_NODES: 37,
  LIGHT_TREE_NODES: 38,
  LIGHT_TREE_EMITTERS: 39,
  /** f32 world-space scene bounds, used for the scene radius of distant lights. */
  BOUNDS_MIN: 40,
  BOUNDS_MAX: 43,
  /** Number of lights that can be hit by rays (area, sphere, sun with angle), listed first-light-index-last in LIGHT_HITTABLE. */
  NUM_HITTABLE_LIGHTS: 46,
  HITTABLE_LIGHTS: 47,
  SIZE: 64
};
var NONE = 4294967295;
var SceneFlags = {
  USE_DIRECT_LIGHT: 1,
  BACKGROUND_MIS: 2,
  /** Lights are picked with the light tree rather than the flat distribution. */
  USE_LIGHT_TREE: 4
};
var NODE_SIZE = 8;
var TRI_VERTS_SIZE = 12;
var TRI_INFO_SIZE = 8;
var TI = { V0: 0, V1: 1, V2: 2, SHADER: 3, OBJECT: 4, FLAGS: 5, EMITTER: 6, PAD1: 7 };
var TriFlags = {
  SMOOTH: 1,
  HAS_UV: 2,
  CAMERA_INVISIBLE: 4,
  SHADOW_INVISIBLE: 8,
  EMISSIVE: 16
};
var SHADER_SIZE = 48;
var SH = {
  TYPE: 0,
  FLAGS: 1,
  BASE_COLOR: 2,
  // 3 floats
  BASE_COLOR_TEX: 5,
  METALLIC: 6,
  ROUGHNESS: 7,
  METALLIC_ROUGHNESS_TEX: 8,
  IOR: 9,
  TRANSMISSION: 10,
  TRANSMISSION_TEX: 11,
  SPECULAR_IOR_LEVEL: 12,
  SPECULAR_TINT: 13,
  // 3 floats
  EMISSION: 16,
  // 3 floats, colour already multiplied by strength
  EMISSION_TEX: 19,
  NORMAL_TEX: 20,
  NORMAL_SCALE: 21,
  ALPHA: 22,
  ALPHA_TEX: 23,
  /** For the world shader: environment texture and rotation. */
  ENV_TEX: 24,
  ENV_ROTATION: 25,
  /** Cycles' SD_MIS_FRONT/BACK-like flags for emission. */
  RESERVED: 26,
  // Principled coat (Cycles' coat_* sockets). The weight texture scales the weight by its R channel and the roughness texture the roughness by G, as glTF's clearcoat textures do.
  COAT_WEIGHT: 27,
  COAT_ROUGHNESS: 28,
  COAT_IOR: 29,
  COAT_TINT: 30,
  // 3 floats
  COAT_WEIGHT_TEX: 33,
  COAT_ROUGHNESS_TEX: 34,
  COAT_NORMAL_TEX: 35,
  COAT_NORMAL_SCALE: 36,
  // Principled sheen. The tint texture multiplies the tint (RGB), the roughness texture the roughness (A), as glTF's sheen textures do.
  SHEEN_WEIGHT: 37,
  SHEEN_TINT: 38,
  // 3 floats
  SHEEN_TINT_TEX: 41,
  SHEEN_ROUGHNESS: 42,
  SHEEN_ROUGHNESS_TEX: 43,
  // Principled anisotropy: Cycles' anisotropic in [0, 1] and anisotropic_rotation in turns (multiples of 2 pi) about the normal, from the UV tangent.
  ANISOTROPIC: 44,
  ANISOTROPIC_ROTATION: 45
};
var ShaderType = {
  PRINCIPLED: 0,
  DIFFUSE: 1,
  GLOSSY: 2,
  GLASS: 3,
  EMISSION: 4,
  TRANSPARENT: 5,
  BACKGROUND: 6
};
var ShaderFlags = {
  /** Has any emission (Cycles SD_HAS_EMISSION). */
  HAS_EMISSION: 1,
  /** Emission is sampled by NEE (Cycles' emission sampling != NONE), so forward hits need MIS. */
  USE_MIS: 2,
  HAS_ALPHA: 4,
  /** Emission does not depend on textures, so it can be evaluated from the record alone. */
  CONSTANT_EMISSION: 8,
  /** The coat (and sheen) normal is the interpolated normal before the base normal map, as three.js shades clearcoat without a clearcoat normal map; otherwise it is the base normal, Cycles' default. */
  COAT_GEOMETRY_NORMAL: 16
};
var TEX_SIZE = 12;
var TX = { OFFSET: 0, WIDTH: 1, HEIGHT: 2, FLAGS: 3, M: 4 };
var TexFlags = {
  /** RGBA half floats in two words per texel; otherwise RGBA8 in one word. */
  HALF: 1,
  SRGB: 2,
  NEAREST: 4,
  FLIP_Y: 8,
  /** Wrap mode for S in bits 8-9 and T in bits 10-11: 0 repeat, 1 clamp, 2 mirror. */
  WRAP_S_SHIFT: 8,
  WRAP_T_SHIFT: 10
};
var LIGHT_SIZE = 32;
var LT = {
  TYPE: 0,
  FLAGS: 1,
  /** Position (point, spot, area) or direction of travel (sun). */
  CO: 4,
  RADIUS: 7,
  STRENGTH: 8,
  // rgb
  EVAL_FAC: 11,
  // Spot
  SPOT_DIR: 12,
  COS_HALF_SPOT_ANGLE: 15,
  SPOT_SMOOTH: 16,
  COS_HALF_LARGER_SPREAD: 17,
  // Area
  AXIS_U: 12,
  LEN_U: 15,
  AXIS_V: 16,
  LEN_V: 19,
  AREA_DIR: 20,
  INVAREA: 23,
  // Sun
  SUN_ANGLE: 12,
  SUN_ONE_MINUS_COSANGLE: 13,
  SUN_PDF: 14,
  /** Index of the light's emitter in the light tree, or NONE. */
  TREE_EMITTER: 24
};
var LightType = {
  POINT: 0,
  SPOT: 1,
  SUN: 2,
  AREA: 3,
  BACKGROUND: 4
};
var LightFlags = {
  USE_MIS: 1,
  CAMERA_VISIBLE: 2,
  CAST_SHADOW: 4,
  IS_SPHERE: 8
};
var LIGHT_TREE_NODE_SIZE = 16;
var LTN = { BMIN: 0, ENERGY: 3, BMAX: 4, TYPE: 7, AXIS: 8, THETA_O: 11, THETA_E: 12, NUM_EMITTERS: 13, CHILD0: 14, CHILD1: 15 };
var LightTreeNodeType = { INNER: 2, LEAF: 4, DISTANT: 8 };
var LIGHT_TREE_EMITTER_SIZE = 8;
var LTE = { ENERGY: 0, THETA_O: 1, THETA_E: 2, ID: 3, BIT_TRAIL: 4 };
var DIST_SIZE = 2;
var FILTER_TABLE_SIZE = 1024;
var P = {
  WIDTH: 0,
  HEIGHT: 1,
  SAMPLE_START: 2,
  SAMPLE_COUNT: 3,
  SEED: 4,
  SOBOL_MASK: 5,
  MAX_BOUNCE: 6,
  MAX_DIFFUSE: 7,
  MAX_GLOSSY: 8,
  MAX_TRANSMISSION: 9,
  MAX_TRANSPARENT: 10,
  MIN_BOUNCE: 11,
  /** f32 */
  CLAMP_DIRECT: 12,
  CLAMP_INDIRECT: 13,
  /** Camera-to-world 3x4, rows (f32 x 12). */
  CAM_TO_WORLD: 16,
  /** tan(fov_y / 2) and aspect (f32). */
  CAM_TAN_HALF_FOV: 28,
  CAM_ASPECT: 29,
  CAM_APERTURE: 30,
  CAM_FOCUS: 31,
  /** Tile origin and size for the current dispatch. */
  TILE_X: 32,
  TILE_Y: 33,
  TILE_W: 34,
  TILE_H: 35,
  /** Background visible to camera (1/0). */
  BG_CAMERA_VISIBLE: 36,
  /** f32: Cycles' kernel filter_glossy, 1 / Filter Glossy, or 0 when glossy filtering is off. */
  FILTER_GLOSSY: 37,
  /** 1 when the albedo and normal denoising features are written. */
  DENOISING_FEATURES: 38,
  /** GPU film floats per pixel: 4 (RGBA) or 16 (RGBA then the extra passes in the CPU's EXT layout, with the converged flag at EXT.FLAG). */
  FILM_STRIDE: 39,
  /** 1 when adaptive sampling may skip converged pixels. */
  ADAPTIVE: 40
};

// src/kernel/globals.ts
var KernelGlobals = class {
  u32;
  f32;
  i32;
  texels;
  nodes;
  numTris;
  triVerts;
  triInfo;
  vertNormals;
  vertUVs;
  shaders;
  numShaders;
  textures;
  numLights;
  lights;
  numDistribution;
  distribution;
  pdfTriangles;
  pdfLights;
  /** Cycles' light tree, when the scene was compiled with it. */
  useLightTree;
  lightTreeNodes;
  lightTreeEmitters;
  backgroundLight;
  bgResX;
  bgResY;
  bgMarginal;
  bgConditional;
  filterTable;
  worldShader;
  flags;
  numHittableLights;
  hittableLights;
  tGgxE;
  tGgxEavg;
  tGgxGlassE;
  tGgxGlassEavg;
  tGgxGlassInvE;
  tGgxGlassInvEavg;
  tGenSchlickIorS;
  tGenSchlickS;
  tSheenLtc;
  sceneRadius;
  constructor(buffers2) {
    const s = buffers2.scene;
    this.u32 = s;
    this.f32 = new Float32Array(s.buffer, s.byteOffset, s.length);
    this.i32 = new Int32Array(s.buffer, s.byteOffset, s.length);
    this.texels = buffers2.texels;
    this.nodes = s[H.NODES];
    this.numTris = s[H.NUM_TRIS];
    this.triVerts = s[H.TRI_VERTS];
    this.triInfo = s[H.TRI_INFO];
    this.vertNormals = s[H.VERT_NORMALS];
    this.vertUVs = s[H.VERT_UVS];
    this.shaders = s[H.SHADERS];
    this.numShaders = s[H.NUM_SHADERS];
    this.textures = s[H.TEXTURES];
    this.numLights = s[H.NUM_LIGHTS];
    this.lights = s[H.LIGHTS];
    this.numDistribution = s[H.NUM_DISTRIBUTION];
    this.distribution = s[H.DISTRIBUTION];
    this.pdfTriangles = this.f32[H.PDF_TRIANGLES];
    this.pdfLights = this.f32[H.PDF_LIGHTS];
    this.useLightTree = (s[H.FLAGS] & SceneFlags.USE_LIGHT_TREE) !== 0 && s[H.NUM_LIGHT_TREE_NODES] > 0;
    this.lightTreeNodes = s[H.LIGHT_TREE_NODES];
    this.lightTreeEmitters = s[H.LIGHT_TREE_EMITTERS];
    this.backgroundLight = s[H.BACKGROUND_LIGHT] === NONE ? -1 : s[H.BACKGROUND_LIGHT];
    this.bgResX = s[H.BG_RES_X];
    this.bgResY = s[H.BG_RES_Y];
    this.bgMarginal = s[H.BG_MARGINAL];
    this.bgConditional = s[H.BG_CONDITIONAL];
    this.filterTable = s[H.FILTER_TABLE];
    this.worldShader = s[H.WORLD_SHADER];
    this.flags = s[H.FLAGS];
    this.numHittableLights = s[H.NUM_HITTABLE_LIGHTS];
    this.hittableLights = s[H.HITTABLE_LIGHTS];
    this.tGgxE = s[H.TABLE_GGX_E];
    this.tGgxEavg = s[H.TABLE_GGX_EAVG];
    this.tGgxGlassE = s[H.TABLE_GGX_GLASS_E];
    this.tGgxGlassEavg = s[H.TABLE_GGX_GLASS_EAVG];
    this.tGgxGlassInvE = s[H.TABLE_GGX_GLASS_INV_E];
    this.tGgxGlassInvEavg = s[H.TABLE_GGX_GLASS_INV_EAVG];
    this.tGenSchlickIorS = s[H.TABLE_GGX_GEN_SCHLICK_IOR_S];
    this.tGenSchlickS = s[H.TABLE_GGX_GEN_SCHLICK_S];
    this.tSheenLtc = s[H.TABLE_SHEEN_LTC];
    const f = this.f32;
    const dx = f[H.BOUNDS_MAX] - f[H.BOUNDS_MIN];
    const dy = f[H.BOUNDS_MAX + 1] - f[H.BOUNDS_MIN + 1];
    const dz = f[H.BOUNDS_MAX + 2] - f[H.BOUNDS_MIN + 2];
    this.sceneRadius = Number.isFinite(dx) && dx >= 0 ? 0.5 * Math.sqrt(dx * dx + dy * dy + dz * dz) : 1;
  }
};

// src/kernel/light_tree.ts
var FLT_MAX = 340282347e30;
var M_SQRT2 = Math.SQRT2;
function sinFromCos(c) {
  return Math.sqrt(Math.max(1 - c * c, 0));
}
function cosFromSin(s) {
  return Math.sqrt(Math.max(1 - s * s, 0));
}
function smoothstep01(x) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return (3 - 2 * x) * x * x;
}
var ptcX = 0;
var ptcY = 0;
var ptcZ = 0;
var cosThetaU = 0;
var distMax = 0;
var distMin = 0;
var coneAx = 0;
var coneAy = 0;
var coneAz = 0;
var coneThetaO = 0;
var coneThetaE = 0;
var impMax = 0;
var impMin = 0;
function importance(N, hasTransmission, energy) {
  impMax = 0;
  impMin = 0;
  const sinThetaU = sinFromCos(cosThetaU);
  const dotPN = ptcX * N.x + ptcY * N.y + ptcZ * N.z;
  const cosThetaI = hasTransmission ? Math.abs(dotPN) : dotPN;
  const sinThetaI = sinFromCos(cosThetaI);
  const cosMinIncidence = cosThetaI >= cosThetaU ? 1 : cosThetaI * cosThetaU + sinThetaI * sinThetaU;
  if (!hasTransmission && cosMinIncidence < 0) return;
  const cosMaxIncidence = Math.max(cosThetaI * cosThetaU - sinThetaI * sinThetaU, 0);
  let cosTheta, sinTheta;
  if (coneAx === -ptcX && coneAy === -ptcY && coneAz === -ptcZ) {
    cosTheta = 1;
    sinTheta = 0;
  } else {
    cosTheta = -(coneAx * ptcX + coneAy * ptcY + coneAz * ptcZ);
    sinTheta = sinFromCos(cosTheta);
  }
  const cosThetaMinusThetaU = cosTheta * cosThetaU + sinTheta * sinThetaU;
  const cosThetaO = Math.cos(coneThetaO);
  const sinThetaO = Math.sin(coneThetaO);
  let cosMinOutgoing;
  if (cosTheta >= cosThetaU || cosThetaMinusThetaU >= cosThetaO) {
    cosMinOutgoing = 1;
  } else if (coneThetaO + coneThetaE > Math.PI || cosThetaMinusThetaU > Math.cos(coneThetaO + coneThetaE)) {
    const sinThetaMinusThetaU = sinFromCos(cosThetaMinusThetaU);
    cosMinOutgoing = cosThetaMinusThetaU * cosThetaO + sinThetaMinusThetaU * sinThetaO;
  } else {
    return;
  }
  impMax = Math.abs(cosMinIncidence * energy * cosMinOutgoing / (distMin * distMin));
  const cosThetaPlusThetaU = cosTheta * cosThetaU - sinTheta * sinThetaU;
  if (coneThetaE - coneThetaO < 0 || cosTheta < 0 || cosThetaU < 0 || cosThetaPlusThetaU < Math.cos(coneThetaE - coneThetaO)) {
    impMin = 0;
  } else {
    const sinThetaPlusThetaU = sinFromCos(cosThetaPlusThetaU);
    const cosMaxOutgoing = cosThetaPlusThetaU * cosThetaO - sinThetaPlusThetaU * sinThetaO;
    impMin = Math.abs(cosMaxIncidence * energy * cosMaxOutgoing / (distMax * distMax));
  }
}
function nodeImportance(kg, P2, N, hasTransmission, n) {
  const f = kg.f32;
  const b = kg.lightTreeNodes + n * LIGHT_TREE_NODE_SIZE;
  coneAx = f[b + LTN.AXIS];
  coneAy = f[b + LTN.AXIS + 1];
  coneAz = f[b + LTN.AXIS + 2];
  coneThetaO = f[b + LTN.THETA_O];
  coneThetaE = f[b + LTN.THETA_E];
  let distance;
  if (kg.u32[b + LTN.TYPE] === LightTreeNodeType.DISTANT) {
    ptcX = -coneAx;
    ptcY = -coneAy;
    ptcZ = -coneAz;
    cosThetaU = Math.cos(coneThetaO + coneThetaE);
    distance = 1;
  } else {
    const minX = f[b + LTN.BMIN], minY = f[b + LTN.BMIN + 1], minZ = f[b + LTN.BMIN + 2];
    const maxX = f[b + LTN.BMAX], maxY = f[b + LTN.BMAX + 1], maxZ = f[b + LTN.BMAX + 2];
    const cx = 0.5 * (minX + maxX), cy = 0.5 * (minY + maxY), cz = 0.5 * (minZ + maxZ);
    const ex = maxX - cx, ey = maxY - cy, ez = maxZ - cz;
    const visible = hasTransmission || N.x * (cx - P2.x) + N.y * (cy - P2.y) + N.z * (cz - P2.z) + (Math.abs(N.x) * Math.abs(ex) + Math.abs(N.y) * Math.abs(ey) + Math.abs(N.z) * Math.abs(ez)) > 0;
    if (!visible) {
      impMax = impMin = 0;
      return;
    }
    let dx = cx - P2.x, dy = cy - P2.y, dz = cz - P2.z;
    distance = Math.hypot(dx, dy, dz);
    if (distance > 0) {
      dx /= distance;
      dy /= distance;
      dz /= distance;
    } else {
      dx = dy = dz = 0;
    }
    ptcX = dx;
    ptcY = dy;
    ptcZ = dz;
    const d2 = distance * distance;
    const r2 = ex * ex + ey * ey + ez * ez;
    cosThetaU = d2 <= r2 ? -1 : Math.sqrt(Math.max(1 - r2 / d2, 0));
    distance = Math.max(0.5 * Math.sqrt(r2), distance);
  }
  distMax = distMin = distance;
  importance(N, hasTransmission, f[b + LTN.ENERGY]);
}
function emitterImportance(kg, P2, N, hasTransmission, e) {
  const f = kg.f32;
  const u = kg.u32;
  const b = kg.lightTreeEmitters + e * LIGHT_TREE_EMITTER_SIZE;
  coneThetaO = f[b + LTE.THETA_O];
  coneThetaE = f[b + LTE.THETA_E];
  let energy = f[b + LTE.ENERGY];
  const id = kg.i32[b + LTE.ID];
  let visible;
  if (id >= 0) {
    const t = kg.triVerts + id * TRI_VERTS_SIZE;
    const ax = f[t], ay = f[t + 1], az = f[t + 2];
    const bx = f[t + 4], by = f[t + 5], bz = f[t + 6];
    const qx = f[t + 8], qy = f[t + 9], qz = f[t + 10];
    const cx = (ax + bx + qx) / 3, cy = (ay + by + qy) / 3, cz = (az + bz + qz) / 3;
    let dx = ax - bx, dy = ay - by, dz = az - bz;
    const dl = Math.hypot(dx, dy, dz);
    if (dl > 0) {
      dx /= dl;
      dy /= dl;
      dz /= dl;
    } else {
      dx = dy = dz = 0;
    }
    coneAx = dx;
    coneAy = dy;
    coneAz = dz;
    let px = cx - P2.x, py = cy - P2.y, pz = cz - P2.z;
    const minDistance = Math.hypot(px, py, pz);
    if (minDistance > 0) {
      px /= minDistance;
      py /= minDistance;
      pz /= minDistance;
    } else {
      px = py = pz = 0;
    }
    ptcX = px;
    ptcY = py;
    ptcZ = pz;
    distMax = distMin = minDistance;
    cosThetaU = FLT_MAX;
    let aboveSurface = false;
    for (let i = 0; i < 3; i++) {
      const vx = f[t + i * 4] - P2.x, vy = f[t + i * 4 + 1] - P2.y, vz = f[t + i * 4 + 2] - P2.z;
      const vl = Math.hypot(vx, vy, vz);
      const inv = vl > 0 ? 1 / vl : 0;
      cosThetaU = Math.min(cosThetaU, (px * vx + py * vy + pz * vz) * inv);
      aboveSurface = aboveSurface || (vx * N.x + vy * N.y + vz * N.z) * inv > 0;
      distMax = Math.max(distMax, vl);
    }
    const frontFacing = coneThetaO !== 0 || coneAx * px + coneAy * py + coneAz * pz < 0;
    visible = frontFacing && aboveSurface;
  } else {
    const L = kg.lights + ~id * LIGHT_SIZE;
    const type = u[L + LT.TYPE];
    const cx = f[L + LT.CO], cy = f[L + LT.CO + 1], cz = f[L + LT.CO + 2];
    if (type === LightType.POINT || type === LightType.SPOT) {
      let px = cx - P2.x, py = cy - P2.y, pz = cz - P2.z;
      const minDistance = Math.hypot(px, py, pz);
      if (minDistance > 0) {
        px /= minDistance;
        py /= minDistance;
        pz /= minDistance;
      } else {
        px = py = pz = 0;
      }
      ptcX = px;
      ptcY = py;
      ptcZ = pz;
      distMax = distMin = minDistance;
      const radius = f[L + LT.RADIUS];
      const isSphere = (u[L + LT.FLAGS] & LightFlags.IS_SPHERE) !== 0;
      if (type === LightType.POINT) {
        coneAx = -px;
        coneAy = -py;
        coneAz = -pz;
        if (isSphere) {
          if (minDistance > radius) {
            cosThetaU = cosFromSin(radius / minDistance);
            distMax = minDistance / cosThetaU;
          } else {
            cosThetaU = -1;
            distMax = distMin = radius / M_SQRT2;
          }
        } else {
          const hyp = Math.sqrt(radius * radius + minDistance * minDistance);
          cosThetaU = minDistance / hyp;
          distMax = hyp;
        }
        coneThetaO = 0;
      } else {
        coneAx = f[L + LT.SPOT_DIR];
        coneAy = f[L + LT.SPOT_DIR + 1];
        coneAz = f[L + LT.SPOT_DIR + 2];
        if (isSphere) {
          cosThetaU = minDistance > radius ? cosFromSin(radius / minDistance) : -1;
          if (minDistance > radius) {
            distMax = minDistance / cosThetaU;
            distMin = minDistance;
          } else {
            distMax = distMin = radius / M_SQRT2;
          }
        } else {
          const hyp = Math.sqrt(radius * radius + minDistance * minDistance);
          cosThetaU = minDistance / hyp;
          distMax = hyp;
        }
        const cosMinOutgoing = Math.cos(Math.max(0, Math.acos(Math.min(Math.max(-(coneAx * px + coneAy * py + coneAz * pz), -1), 1)) - Math.acos(Math.min(Math.max(cosThetaU, -1), 1))));
        energy *= smoothstep01((cosMinOutgoing - Math.cos(coneThetaE)) * f[L + LT.SPOT_SMOOTH]);
      }
      visible = true;
    } else if (type === LightType.AREA) {
      coneAx = f[L + LT.AREA_DIR];
      coneAy = f[L + LT.AREA_DIR + 1];
      coneAz = f[L + LT.AREA_DIR + 2];
      let px = cx - P2.x, py = cy - P2.y, pz = cz - P2.z;
      const minDistance = Math.hypot(px, py, pz);
      if (minDistance > 0) {
        px /= minDistance;
        py /= minDistance;
        pz /= minDistance;
      } else {
        px = py = pz = 0;
      }
      ptcX = px;
      ptcY = py;
      ptcZ = pz;
      distMax = distMin = minDistance;
      cosThetaU = FLT_MAX;
      const lu = f[L + LT.LEN_U], lv = f[L + LT.LEN_V];
      const eux = f[L + LT.AXIS_U] * lu, euy = f[L + LT.AXIS_U + 1] * lu, euz = f[L + LT.AXIS_U + 2] * lu;
      const evx = f[L + LT.AXIS_V] * lv, evy = f[L + LT.AXIS_V + 1] * lv, evz = f[L + LT.AXIS_V + 2] * lv;
      for (let i = 0; i < 4; i++) {
        const su = (i & 1) - 0.5;
        const sv = 0.5 * ((i & 2) - 1);
        const vx = su * eux + sv * evx + cx - P2.x, vy = su * euy + sv * evy + cy - P2.y, vz = su * euz + sv * evz + cz - P2.z;
        const vl = Math.hypot(vx, vy, vz);
        const inv = vl > 0 ? 1 / vl : 0;
        cosThetaU = Math.min(cosThetaU, (px * vx + py * vy + pz * vz) * inv);
        distMax = Math.max(distMax, vl);
      }
      const frontFacing = coneAx * px + coneAy * py + coneAz * pz < 0;
      const above = N.x * (cx - P2.x) + N.y * (cy - P2.y) + N.z * (cz - P2.z) + Math.abs(N.x * eux + N.y * euy + N.z * euz) + Math.abs(N.x * evx + N.y * evy + N.z * evz) > 0;
      visible = frontFacing && above;
    } else if (type === LightType.SUN) {
      coneAx = cx;
      coneAy = cy;
      coneAz = cz;
      cosThetaU = Math.cos(coneThetaE);
      distMax = 1 / cosThetaU;
      distMin = 1;
      ptcX = -cx;
      ptcY = -cy;
      ptcZ = -cz;
      visible = true;
    } else if (type === LightType.BACKGROUND) {
      coneAx = 0;
      coneAy = 0;
      coneAz = -1;
      cosThetaU = -1;
      distMax = distMin = 1;
      ptcX = 0;
      ptcY = 0;
      ptcZ = -1;
      visible = true;
    } else {
      impMax = impMin = 0;
      return;
    }
  }
  if (!(visible || hasTransmission)) {
    impMax = impMin = 0;
    return;
  }
  importance(N, hasTransmission, energy);
}
function childImportance(kg, P2, N, hasTransmission, n) {
  const b = kg.lightTreeNodes + n * LIGHT_TREE_NODE_SIZE;
  const num = kg.i32[b + LTN.NUM_EMITTERS];
  if (num === 1) emitterImportance(kg, P2, N, hasTransmission, kg.u32[b + LTN.CHILD0]);
  else if (num !== 0) nodeImportance(kg, P2, N, hasTransmission, n);
  else impMax = impMin = 0;
}
var leftProbability = 0;
function getLeftProbability(kg, P2, N, hasTransmission, left, right) {
  childImportance(kg, P2, N, hasTransmission, left);
  const maxL = impMax, minL = impMin;
  childImportance(kg, P2, N, hasTransmission, right);
  const maxR = impMax, minR = impMin;
  const totalMax = maxL + maxR;
  if (totalMax === 0) return false;
  const totalMin = minL + minR;
  const pMax = maxL / totalMax;
  const pMin = totalMin > 0 ? minL / totalMin : 0.5 * ((maxL > 0 ? 1 : 0) + (maxR === 0 ? 1 : 0));
  leftProbability = 0.5 * (pMax + pMin);
  return true;
}
var resSelected = -1;
var resWeight = 0;
var resTotal = 0;
var resRand = 0;
function sampleReservoir(index, weight) {
  if (!(weight > 0)) return;
  resTotal += weight;
  if (resSelected === -1) {
    resSelected = index;
    resWeight = weight;
    return;
  }
  const thresh = weight / resTotal;
  if (resRand <= thresh) {
    resSelected = index;
    resWeight = weight;
    resRand = resRand / thresh;
  } else {
    resRand = (resRand - thresh) / (1 - thresh);
  }
  resRand = Math.min(Math.max(resRand, 0), 1);
}
var treeSample = { emitter: -1, pdf: 0 };
function lightTreeSample(kg, rand, P2, N, hasTransmission) {
  const f = kg.f32;
  const u = kg.u32;
  const i32 = kg.i32;
  let pdfLeaf = 1;
  let node = 0;
  let r = rand;
  for (; ; ) {
    const b = kg.lightTreeNodes + node * LIGHT_TREE_NODE_SIZE;
    if (u[b + LTN.TYPE] >= LightTreeNodeType.LEAF) {
      const num = i32[b + LTN.NUM_EMITTERS];
      const first = u[b + LTN.CHILD0];
      const sampleMax = r > 0.5;
      if (num > 1) r = r * 2 - (sampleMax ? 1 : 0);
      const selImp = [0, 0];
      const totImp = [0, 0];
      resSelected = -1;
      resWeight = 0;
      resTotal = 0;
      resRand = r;
      let hasImportance = 0;
      const a = sampleMax ? 0 : 1;
      for (let i = 0; i < num; i++) {
        const e = first + i;
        emitterImportance(kg, P2, N, hasTransmission, e);
        const imp0 = impMax, imp1 = impMin;
        const w2 = a === 0 ? imp0 : imp1;
        sampleReservoir(e, w2);
        if (resSelected === e) selImp[1 - a] = a === 0 ? imp1 : imp0;
        totImp[1 - a] += a === 0 ? imp1 : imp0;
        if (imp0 > 0) hasImportance |= 1 << i;
      }
      selImp[a] = resWeight;
      totImp[a] = resTotal;
      r = resRand;
      if (!hasImportance) return false;
      let selected = resSelected;
      if (totImp[1] === 0) {
        if (sampleMax) {
          selImp[1] = 1;
          let c = 0;
          for (let i = 0; i < num; i++) if (hasImportance & 1 << i) c++;
          totImp[1] = c;
        } else {
          resSelected = -1;
          resWeight = 0;
          resTotal = 0;
          resRand = r;
          let bits = hasImportance;
          for (let i = 0; i < num; i++) {
            sampleReservoir(first + i, bits & 1);
            bits >>>= 1;
          }
          selected = resSelected;
          selImp[1] = resWeight;
          totImp[1] = resTotal;
          emitterImportance(kg, P2, N, hasTransmission, selected);
          selImp[0] = impMax;
        }
      }
      treeSample.emitter = selected;
      treeSample.pdf = pdfLeaf * 0.5 * (selImp[0] / totImp[0] + selImp[1] / totImp[1]);
      void f;
      return true;
    }
    const left = u[b + LTN.CHILD0];
    const right = u[b + LTN.CHILD1];
    if (!getLeftProbability(kg, P2, N, hasTransmission, left, right)) return false;
    const lp = leftProbability;
    let goRight = false;
    const w = 1 - lp;
    if (w > 0) {
      const total = lp + w;
      const thresh = w / total;
      if (r <= thresh) {
        goRight = true;
        r = r / thresh;
      } else {
        r = (r - thresh) / (1 - thresh);
      }
      r = Math.min(Math.max(r, 0), 1);
    }
    node = goRight ? right : left;
    pdfLeaf *= goRight ? 1 - lp : lp;
  }
}
function lightTreePdf(kg, P2, N, hasTransmission, target) {
  const u = kg.u32;
  const i32 = kg.i32;
  let bitTrail = u[kg.lightTreeEmitters + target * LIGHT_TREE_EMITTER_SIZE + LTE.BIT_TRAIL];
  let pdf = 1;
  let node = 0;
  for (; ; ) {
    const b = kg.lightTreeNodes + node * LIGHT_TREE_NODE_SIZE;
    if (u[b + LTN.TYPE] >= LightTreeNodeType.LEAF) {
      const num = i32[b + LTN.NUM_EMITTERS];
      const first = u[b + LTN.CHILD0];
      let tMax = 0, tMin = 0, totMax = 0, totMin = 0, numHas = 0;
      for (let i = 0; i < num; i++) {
        const e = first + i;
        emitterImportance(kg, P2, N, hasTransmission, e);
        if (impMax > 0) numHas++;
        if (e === target) {
          tMax = impMax;
          tMin = impMin;
        }
        totMax += impMax;
        totMin += impMin;
      }
      if (!(tMax > 0)) return 0;
      return pdf * 0.5 * (tMax / totMax + (totMin > 0 ? tMin / totMin : 1 / numHas));
    }
    const left = u[b + LTN.CHILD0];
    const right = u[b + LTN.CHILD1];
    if (!getLeftProbability(kg, P2, N, hasTransmission, left, right)) return 0;
    const goLeft = (bitTrail & 1) === 0;
    bitTrail >>>= 1;
    node = goLeft ? left : right;
    pdf *= goLeft ? leftProbability : 1 - leftProbability;
    if (pdf === 0) return 0;
  }
}

// src/util/math.ts
var M_2PI = 2 * Math.PI;
var M_1_PI = 1 / Math.PI;
var M_1_2PI = 1 / (2 * Math.PI);
var M_1_4PI = 1 / (4 * Math.PI);
var M_PI_2 = Math.PI / 2;
var M_PI_4 = Math.PI / 4;
function f3(x = 0, y = 0, z = 0) {
  return { x, y, z };
}
function set3(o, x, y, z) {
  o.x = x;
  o.y = y;
  o.z = z;
  return o;
}
function cross3(o, a, b) {
  const x = a.y * b.z - a.z * b.y;
  const y = a.z * b.x - a.x * b.z;
  const z = a.x * b.y - a.y * b.x;
  o.x = x;
  o.y = y;
  o.z = z;
  return o;
}
function normalize3(o, a) {
  const l = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
  const inv = l > 0 ? 1 / l : 0;
  o.x = a.x * inv;
  o.y = a.y * inv;
  o.z = a.z * inv;
  return o;
}
function clamp(x, lo, hi) {
  return x < lo ? lo : x > hi ? hi : x;
}
function saturate(x) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}
function mix(a, b, t) {
  return a + (b - a) * t;
}
function sqr(x) {
  return x * x;
}
function safeSqrt(x) {
  return Math.sqrt(Math.max(x, 0));
}
function safeAsin(x) {
  return Math.asin(clamp(x, -1, 1));
}
function inverseLerp(a, b, x) {
  return (x - a) / (b - a);
}
function sinFromCos2(c) {
  return safeSqrt(1 - c * c);
}
function makeOrthonormals(N, a, b) {
  if (N.x !== N.y || N.x !== N.z) set3(a, N.z - N.y, N.x - N.z, N.y - N.x);
  else set3(a, N.z - N.y, N.x + N.z, -N.y - N.x);
  normalize3(a, a);
  cross3(b, N, a);
}
function makeOrthonormalsTangent(N, T, a, b) {
  cross3(b, N, T);
  normalize3(b, b);
  cross3(a, b, N);
}

// src/kernel/bvh.ts
var FLT_EPSILON = 11920929e-14;
function makeRay() {
  return { Px: 0, Py: 0, Pz: 0, Dx: 0, Dy: 0, Dz: 1, tmin: 0, tmax: Infinity, selfPrim: -1 };
}
function makeHit() {
  return { t: Infinity, u: 0, v: 0, prim: -1 };
}
function rayTriangleIntersect(Px, Py, Pz, Dx, Dy, Dz, tmin, tmax, ax, ay, az, bx, by, bz, cx, cy, cz, out) {
  const v0x = ax - Px, v0y = ay - Py, v0z = az - Pz;
  const v1x = bx - Px, v1y = by - Py, v1z = bz - Pz;
  const v2x = cx - Px, v2y = cy - Py, v2z = cz - Pz;
  const e0x = v2x - v0x, e0y = v2y - v0y, e0z = v2z - v0z;
  const e1x = v0x - v1x, e1y = v0y - v1y, e1z = v0z - v1z;
  const e2x = v1x - v2x, e2y = v1y - v2y, e2z = v1z - v2z;
  let sx = v2x + v0x, sy = v2y + v0y, sz = v2z + v0z;
  const U = (e0y * sz - e0z * sy) * Dx + (e0z * sx - e0x * sz) * Dy + (e0x * sy - e0y * sx) * Dz;
  sx = v0x + v1x;
  sy = v0y + v1y;
  sz = v0z + v1z;
  const V = (e1y * sz - e1z * sy) * Dx + (e1z * sx - e1x * sz) * Dy + (e1x * sy - e1y * sx) * Dz;
  sx = v1x + v2x;
  sy = v1y + v2y;
  sz = v1z + v2z;
  const W = (e2y * sz - e2z * sy) * Dx + (e2z * sx - e2x * sz) * Dy + (e2x * sy - e2y * sx) * Dz;
  const UVW = U + V + W;
  const eps = FLT_EPSILON * Math.abs(UVW);
  const minUVW = Math.min(U, V, W);
  const maxUVW = Math.max(U, V, W);
  if (!(minUVW >= -eps || maxUVW <= eps)) return false;
  const ngx = 2 * (e1y * e0z - e1z * e0y);
  const ngy = 2 * (e1z * e0x - e1x * e0z);
  const ngz = 2 * (e1x * e0y - e1y * e0x);
  const den = ngx * Dx + ngy * Dy + ngz * Dz;
  if (den === 0) return false;
  const T = v0x * ngx + v0y * ngy + v0z * ngz;
  const t = T / den;
  if (!(t >= tmin && t <= tmax)) return false;
  const rcp = Math.abs(UVW) < 1e-18 ? 0 : 1 / UVW;
  out[0] = Math.min(U * rcp, 1);
  out[1] = Math.min(V * rcp, 1);
  out[2] = t;
  return true;
}
var _uvt = new Float64Array(3);
var _stack = new Int32Array(128);
var _stackT = new Float64Array(128);
var traversalStats = { rays: 0, nodes: 0, tris: 0 };
function nodeEntry(f, o, Px, Py, Pz, idx, idy, idz, tmin, tmax) {
  let t0 = (f[o] - Px) * idx, t1 = (f[o + 4] - Px) * idx;
  let lo = t0 < t1 ? t0 : t1, hi = t0 < t1 ? t1 : t0;
  t0 = (f[o + 1] - Py) * idy;
  t1 = (f[o + 5] - Py) * idy;
  lo = Math.max(lo, t0 < t1 ? t0 : t1);
  hi = Math.min(hi, t0 < t1 ? t1 : t0);
  t0 = (f[o + 2] - Pz) * idz;
  t1 = (f[o + 6] - Pz) * idz;
  lo = Math.max(lo, t0 < t1 ? t0 : t1, tmin);
  hi = Math.min(hi, t0 < t1 ? t1 : t0, tmax);
  if (lo > hi) return Infinity;
  return lo === lo ? lo : -Infinity;
}
function intersectClosest(kg, ray, hit, ignoreFlags) {
  const f = kg.f32;
  const u = kg.u32;
  const nodes = kg.nodes;
  const tv = kg.triVerts;
  const ti = kg.triInfo;
  hit.prim = -1;
  hit.t = ray.tmax;
  if (kg.numTris === 0) return false;
  traversalStats.rays++;
  const Px = ray.Px, Py = ray.Py, Pz = ray.Pz;
  const Dx = ray.Dx, Dy = ray.Dy, Dz = ray.Dz;
  const idx = 1 / Dx, idy = 1 / Dy, idz = 1 / Dz;
  const tmin = ray.tmin;
  const self = ray.selfPrim;
  traversalStats.nodes++;
  if (nodeEntry(f, nodes, Px, Py, Pz, idx, idy, idz, tmin, hit.t) === Infinity) return false;
  let sp = 0;
  let node = 0;
  for (; ; ) {
    const o = nodes + node * NODE_SIZE;
    const count = u[o + 7];
    if (count > 0) {
      const first = u[o + 3];
      for (let k = first; k < first + count; k++) {
        if (k === self) continue;
        if (ignoreFlags && u[ti + k * TRI_INFO_SIZE + TI.FLAGS] & ignoreFlags) continue;
        const b = tv + k * TRI_VERTS_SIZE;
        traversalStats.tris++;
        if (rayTriangleIntersect(Px, Py, Pz, Dx, Dy, Dz, tmin, hit.t, f[b], f[b + 1], f[b + 2], f[b + 4], f[b + 5], f[b + 6], f[b + 8], f[b + 9], f[b + 10], _uvt) && (hit.prim < 0 || _uvt[2] < hit.t || k < hit.prim)) {
          hit.u = _uvt[0];
          hit.v = _uvt[1];
          hit.t = _uvt[2];
          hit.prim = k;
        }
      }
    } else {
      const left = node + 1;
      const right = u[o + 3];
      traversalStats.nodes += 2;
      const tl = nodeEntry(f, nodes + left * NODE_SIZE, Px, Py, Pz, idx, idy, idz, tmin, hit.t);
      const tr = nodeEntry(f, nodes + right * NODE_SIZE, Px, Py, Pz, idx, idy, idz, tmin, hit.t);
      if (tl !== Infinity) {
        if (tr !== Infinity) {
          if (tl <= tr) {
            _stack[sp] = right;
            _stackT[sp++] = tr;
            node = left;
          } else {
            _stack[sp] = left;
            _stackT[sp++] = tl;
            node = right;
          }
        } else node = left;
        continue;
      }
      if (tr !== Infinity) {
        node = right;
        continue;
      }
    }
    let found = false;
    while (sp > 0) {
      sp--;
      if (_stackT[sp] <= hit.t) {
        node = _stack[sp];
        found = true;
        break;
      }
    }
    if (!found) break;
  }
  return hit.prim >= 0;
}
var IGNORE_FOR_CAMERA = TriFlags.CAMERA_INVISIBLE;
var IGNORE_FOR_SHADOW = TriFlags.SHADOW_INVISIBLE;

// src/kernel/sample/mapping.ts
function sampleUniformDisk(rx, ry, out, o = 0) {
  const a = 2 * rx - 1;
  const b = 2 * ry - 1;
  if (a === 0 && b === 0) {
    out[o] = 0;
    out[o + 1] = 0;
    return;
  }
  let r;
  let phi;
  if (a * a > b * b) {
    r = a;
    phi = M_PI_4 * (b / a);
  } else {
    r = b;
    phi = M_PI_2 - M_PI_4 * (a / b);
  }
  out[o] = r * Math.cos(phi);
  out[o + 1] = r * Math.sin(phi);
}
var _disk = new Float64Array(2);
var _T = f3();
var _B = f3();
function sampleCosHemisphere(N, rx, ry, wo) {
  sampleUniformDisk(rx, ry, _disk);
  const dx = _disk[0];
  const dy = _disk[1];
  const cosTheta = safeSqrt(1 - dx * dx - dy * dy);
  makeOrthonormals(N, _T, _B);
  wo.x = dx * _T.x + dy * _B.x + cosTheta * N.x;
  wo.y = dx * _T.y + dy * _B.y + cosTheta * N.y;
  wo.z = dx * _T.z + dy * _B.z + cosTheta * N.z;
  return cosTheta * M_1_PI;
}
function sampleUniformCone(N, oneMinusCosAngle, rx, ry, wo, ret) {
  if (oneMinusCosAngle > 0) {
    sampleUniformDisk(rx, ry, _disk);
    const r2 = _disk[0] * _disk[0] + _disk[1] * _disk[1];
    const cosTheta = 1 - r2 * oneMinusCosAngle;
    const s = safeSqrt(oneMinusCosAngle * (2 - oneMinusCosAngle * r2));
    const x = _disk[0] * s;
    const y = _disk[1] * s;
    makeOrthonormals(N, _T, _B);
    wo.x = x * _T.x + y * _B.x + cosTheta * N.x;
    wo.y = x * _T.y + y * _B.y + cosTheta * N.y;
    wo.z = x * _T.z + y * _B.z + cosTheta * N.z;
    ret[0] = 1 / (M_2PI * oneMinusCosAngle);
    ret[1] = cosTheta;
  } else {
    wo.x = N.x;
    wo.y = N.y;
    wo.z = N.z;
    ret[0] = 1;
    ret[1] = 1;
  }
}
function sampleUniformSphere(rx, ry, wo) {
  const z = 1 - 2 * rx;
  const r = sinFromCos2(z);
  const phi = M_2PI * ry;
  wo.x = r * Math.cos(phi);
  wo.y = r * Math.sin(phi);
  wo.z = z;
}
function powerHeuristic(a, b) {
  return a * a / (a * a + b * b);
}

// src/kernel/tables.ts
function lookupTableRead(t, x, offset, size) {
  x = (x < 0 ? 0 : x > 1 ? 1 : x) * (size - 1);
  const index = Math.min(Math.trunc(x), size - 1);
  const nindex = Math.min(index + 1, size - 1);
  const f = x - index;
  const d0 = t[index + offset];
  if (f === 0) return d0;
  return (1 - f) * d0 + f * t[nindex + offset];
}
function lookupTableRead2D(t, x, y, offset, xsize, ysize) {
  y = (y < 0 ? 0 : y > 1 ? 1 : y) * (ysize - 1);
  const index = Math.min(Math.trunc(y), ysize - 1);
  const nindex = Math.min(index + 1, ysize - 1);
  const f = y - index;
  const d0 = lookupTableRead(t, x, offset + xsize * index, xsize);
  if (f === 0) return d0;
  return (1 - f) * d0 + f * lookupTableRead(t, x, offset + xsize * nindex, xsize);
}
function lookupTableRead3D(t, x, y, z, offset, xsize, ysize, zsize) {
  z = (z < 0 ? 0 : z > 1 ? 1 : z) * (zsize - 1);
  const index = Math.min(Math.trunc(z), zsize - 1);
  const nindex = Math.min(index + 1, zsize - 1);
  const f = z - index;
  const d0 = lookupTableRead2D(t, x, y, offset + xsize * ysize * index, xsize, ysize);
  if (f === 0) return d0;
  return (1 - f) * d0 + f * lookupTableRead2D(t, x, y, offset + xsize * ysize * nindex, xsize, ysize);
}

// src/kernel/closure/bsdf.ts
var CLOSURE_NONE = 0;
var CLOSURE_BSDF_DIFFUSE = 1;
var CLOSURE_BSDF_MICROFACET_GGX = 2;
var CLOSURE_BSDF_MICROFACET_GGX_REFRACTION = 3;
var CLOSURE_BSDF_MICROFACET_GGX_GLASS = 4;
var CLOSURE_BSDF_TRANSPARENT = 5;
var CLOSURE_BSDF_SHEEN = 6;
function closureIsBsdf(type) {
  return type >= CLOSURE_BSDF_DIFFUSE && type <= CLOSURE_BSDF_SHEEN;
}
function closureIsMicrofacet(type) {
  return type >= CLOSURE_BSDF_MICROFACET_GGX && type <= CLOSURE_BSDF_MICROFACET_GGX_GLASS;
}
function closureIsGlass(type) {
  return type === CLOSURE_BSDF_MICROFACET_GGX_GLASS;
}
function closureIsRefraction(type) {
  return type === CLOSURE_BSDF_MICROFACET_GGX_REFRACTION;
}
var LABEL_NONE = 0;
var LABEL_TRANSMIT = 1;
var LABEL_REFLECT = 2;
var LABEL_DIFFUSE = 4;
var LABEL_GLOSSY = 8;
var LABEL_SINGULAR = 16;
var LABEL_TRANSPARENT = 32;
var FRESNEL_NONE = 0;
var FRESNEL_DIELECTRIC = 1;
var FRESNEL_GENERALIZED_SCHLICK = 4;
var FRESNEL_F82_TINT = 5;
var SR_BSDF = 1;
var SR_BSDF_HAS_EVAL = 2;
var SR_BSDF_HAS_TRANSMISSION = 4;
var SR_EMISSION = 8;
var SR_TRANSPARENT = 16;
var SR_BACKFACING = 32;
var CLOSURE_WEIGHT_CUTOFF = 1e-5;
var MAX_CLOSURE = 8;
var Closure = class {
  type = CLOSURE_NONE;
  wr = 0;
  wg = 0;
  wb = 0;
  sampleWeight = 0;
  N = f3();
  /** GGX alpha_x (along T); for sheen, the LTC transformA. */
  alpha = 0;
  /** GGX alpha_y; for sheen, the LTC transformB. Equal to alpha for isotropic GGX. */
  alphaY = 0;
  /** Tangent of anisotropic GGX (Cycles MicrofacetBsdf::T), or the sheen frame's T. */
  T = f3();
  ior = 1;
  energyScale = 1;
  fresnelType = FRESNEL_NONE;
  // Generalized Schlick / F82
  f0r = 0;
  f0g = 0;
  f0b = 0;
  f90r = 1;
  f90g = 1;
  f90b = 1;
  exponent = -1;
  tintRr = 1;
  tintRg = 1;
  tintRb = 1;
  tintTr = 0;
  tintTg = 0;
  tintTb = 0;
  br = 0;
  bg = 0;
  bb = 0;
};
var BsdfEvalResult = class {
  r = 0;
  g = 0;
  b = 0;
  pdf = 0;
};
function F0FromIor(ior) {
  return sqr((ior - 1) / (ior + 1));
}
function iorFromF0(f0) {
  const s = Math.sqrt(Math.min(Math.max(f0, 0), 0.99));
  return (1 + s) / (1 - s);
}
var _cosThetaT = 0;
function fresnelDielectric(cosThetaI, eta) {
  const etaCosThetaTSq = eta * eta - (1 - cosThetaI * cosThetaI);
  if (etaCosThetaTSq <= 0) {
    _cosThetaT = 0;
    return 1;
  }
  cosThetaI = Math.abs(cosThetaI);
  const cosThetaT = -safeSqrt(etaCosThetaTSq) / eta;
  _cosThetaT = cosThetaT;
  const rs = (cosThetaI + eta * cosThetaT) / (cosThetaI - eta * cosThetaT);
  const rp = (cosThetaT + eta * cosThetaI) / (eta * cosThetaI - cosThetaT);
  return 0.5 * (rs * rs + rp * rp);
}
function fresnelDielectricFss(eta) {
  if (eta < 1) return 0.997118 + eta * (0.1014 - eta * (0.965241 + eta * 0.130607));
  return (eta - 1) / (4.08567 + 1.00071 * eta);
}
function fresnelF82(cosi, F0, B) {
  const s = saturate(1 - cosi);
  const s5 = sqr(sqr(s)) * s;
  const fs = mix(F0, 1, s5);
  return Math.min(Math.max(fs - B * cosi * s5 * s, 0), 1);
}
function fresnelF82TintB(F0, tint) {
  const f = 6 / 7;
  const f5 = sqr(sqr(f)) * f;
  const fs = mix(F0, 1, f5);
  return fs * (7 / (f5 * f)) * (1 - tint);
}
function fresnelF82Fss(F0, B) {
  return mix(F0, 1, 1 / 21) - B * (1 / 126);
}
var _R = f3();
var _X = f3();
function ensureValidSpecularReflection(Ng, I, N, out) {
  const dNI = N.x * I.x + N.y * I.y + N.z * I.z;
  _R.x = 2 * dNI * N.x - I.x;
  _R.y = 2 * dNI * N.y - I.y;
  _R.z = 2 * dNI * N.z - I.z;
  const Iz = I.x * Ng.x + I.y * Ng.y + I.z * Ng.z;
  const threshold = Math.min(0.9 * Iz, 0.01);
  if (_R.x * Ng.x + _R.y * Ng.y + _R.z * Ng.z >= threshold) {
    out.x = N.x;
    out.y = N.y;
    out.z = N.z;
    return out;
  }
  const dNNg = N.x * Ng.x + N.y * Ng.y + N.z * Ng.z;
  _X.x = N.x - dNNg * Ng.x;
  _X.y = N.y - dNNg * Ng.y;
  _X.z = N.z - dNNg * Ng.z;
  const l = Math.hypot(_X.x, _X.y, _X.z);
  if (l > 0) {
    _X.x /= l;
    _X.y /= l;
    _X.z /= l;
  } else {
    _X.x = N.x;
    _X.y = N.y;
    _X.z = N.z;
  }
  const Ix = I.x * _X.x + I.y * _X.y + I.z * _X.z;
  const a = sqr(Ix) + sqr(Iz);
  const b = 2 * (a + Iz * threshold);
  const c = sqr(threshold + Iz);
  const Nz2 = Ix < 0 ? 0.25 * (b + safeSqrt(sqr(b) - 4 * a * c)) / a : 0.25 * (b - safeSqrt(sqr(b) - 4 * a * c)) / a;
  const Nx = safeSqrt(1 - Nz2);
  const Nz = safeSqrt(Nz2);
  out.x = Nx * _X.x + Nz * Ng.x;
  out.y = Nx * _X.y + Nz * Ng.y;
  out.z = Nx * _X.z + Nz * Ng.z;
  return out;
}
var fRr = 0;
var fRg = 0;
var fRb = 0;
var fTr = 0;
var fTg = 0;
var fTb = 0;
var fCosT = 0;
function microfacetFresnel(c, cosThetaI) {
  const hasReflection = !closureIsRefraction(c.type);
  const hasTransmission = closureIsGlass(c.type) || !hasReflection;
  let rr = hasReflection ? 1 : 0, rg = rr, rb = rr;
  let tr = hasTransmission ? 1 : 0, tg = tr, tb = tr;
  fCosT = 0;
  if (c.fresnelType === FRESNEL_F82_TINT) {
    if (!hasReflection) {
      fRr = fRg = fRb = fTr = fTg = fTb = 0;
      return;
    }
    rr = fresnelF82(cosThetaI, c.f0r, c.br);
    rg = fresnelF82(cosThetaI, c.f0g, c.bg);
    rb = fresnelF82(cosThetaI, c.f0b, c.bb);
  } else if (c.fresnelType === FRESNEL_GENERALIZED_SCHLICK) {
    let Fr, Fg, Fb;
    let TIR = false;
    if (c.exponent < 0) {
      const Freal = fresnelDielectric(cosThetaI, c.ior);
      fCosT = _cosThetaT;
      const F0real = F0FromIor(c.ior);
      const s = saturate(inverseLerp(F0real, 1, Freal));
      Fr = mix(c.f0r, c.f90r, s);
      Fg = mix(c.f0g, c.f90g, s);
      Fb = mix(c.f0b, c.f90b, s);
    } else {
      const cosTSq = 1 - (1 - sqr(cosThetaI)) / sqr(c.ior);
      if (cosTSq <= 0) {
        TIR = true;
        Fr = Fg = Fb = 1;
      } else {
        const cosT = Math.sqrt(cosTSq);
        fCosT = cosT;
        const angle = c.ior < 1 ? cosT : cosThetaI;
        const s = Math.pow(1 - angle, c.exponent);
        Fr = mix(c.f0r, c.f90r, s);
        Fg = mix(c.f0g, c.f90g, s);
        Fb = mix(c.f0b, c.f90b, s);
      }
    }
    if (TIR) {
      fRr = rr * c.tintRr;
      fRg = rg * c.tintRg;
      fRb = rb * c.tintRb;
      fTr = fTg = fTb = 0;
      return;
    }
    const tRr = c.tintRr * Fr, tRg = c.tintRg * Fg, tRb = c.tintRb * Fb;
    const tTr = c.tintTr * (1 - Fr), tTg = c.tintTg * (1 - Fg), tTb = c.tintTb * (1 - Fb);
    rr *= tRr;
    rg *= tRg;
    rb *= tRb;
    tr *= tTr;
    tg *= tTg;
    tb *= tTb;
  } else if (c.fresnelType === FRESNEL_NONE) {
    if (hasTransmission && fresnelDielectric(cosThetaI, c.ior) === 1) {
      tr = tg = tb = 0;
    }
    fCosT = _cosThetaT;
  } else {
    const F = fresnelDielectric(cosThetaI, c.ior);
    fCosT = _cosThetaT;
    rr *= F;
    rg *= F;
    rb *= F;
    tr *= 1 - F;
    tg *= 1 - F;
    tb *= 1 - F;
  }
  fRr = rr;
  fRg = rg;
  fRb = rb;
  fTr = tr;
  fTg = tg;
  fTb = tb;
}
function ggxLambda(alpha2, cosN) {
  const sqrAlphaTanN = alpha2 * Math.max(1 / sqr(cosN) - 1, 0);
  return 0.5 * (Math.sqrt(1 + sqrAlphaTanN) - 1);
}
function ggxD(alpha2, cosNH) {
  const cosNH2 = Math.min(sqr(cosNH), 1);
  const one = 1 - cosNH2;
  return alpha2 / (Math.PI * sqr(one + alpha2 * cosNH2));
}
function alphaIsAlmostSpecular(ax, ay) {
  return ax * ay <= 2e-10;
}
function ggxAnisoD(ax, ay, hx, hy, hz) {
  hx /= ax;
  hy /= ay;
  const len2 = hx * hx + hy * hy + hz * hz;
  return M_1_PI / (ax * ay * sqr(len2));
}
function ggxAnisoLambda(ax, ay, vx, vy, vz) {
  const sqrAlphaTanN = (sqr(ax * vx) + sqr(ay * vy)) / sqr(vz);
  return 0.5 * (Math.sqrt(1 + sqrAlphaTanN) - 1);
}
var _disk2 = new Float64Array(2);
var _lH = f3();
function ggxSampleVndf(wix, wiy, wiz, ax, ay, rx, ry) {
  let sx = ax * wix, sy = ay * wiy, sz = wiz;
  const sl = Math.hypot(sx, sy, sz);
  sx /= sl;
  sy /= sl;
  sz /= sl;
  const lensq = sx * sx + sy * sy;
  let T1x, T1y, T1z, T2x, T2y, T2z;
  if (lensq > 1e-7) {
    const inv = 1 / Math.sqrt(lensq);
    T1x = -sy * inv;
    T1y = sx * inv;
    T1z = 0;
    T2x = sy * T1z - sz * T1y;
    T2y = sz * T1x - sx * T1z;
    T2z = sx * T1y - sy * T1x;
  } else {
    T1x = 1;
    T1y = 0;
    T1z = 0;
    T2x = 0;
    T2y = 1;
    T2z = 0;
  }
  sampleUniformDisk(rx, ry, _disk2);
  const tx = _disk2[0];
  let ty = _disk2[1];
  ty = mix(safeSqrt(1 - sqr(tx)), ty, 0.5 * (1 + sz));
  const tz = safeSqrt(1 - tx * tx - ty * ty);
  const hx = tx * T1x + ty * T2x + tz * sx;
  const hy = tx * T1y + ty * T2y + tz * sy;
  const hz = tx * T1z + ty * T2z + tz * sz;
  let ux = ax * hx, uy = ay * hy;
  const uz = Math.max(0, hz);
  const ul = Math.hypot(ux, uy, uz);
  ux /= ul;
  uy /= ul;
  _lH.x = ux;
  _lH.y = uy;
  _lH.z = uz / ul;
}
function aToRoughIndex(c) {
  return c.alpha === c.alphaY ? Math.sqrt(c.alpha) : Math.sqrt(Math.sqrt(c.alpha * c.alphaY));
}
function iorToZIndex(ior) {
  return Math.sqrt(Math.abs((ior - 1) / (ior + 1)));
}
function muToYIndex(mu) {
  return safeSqrt(mu);
}
function microfacetGgxPreserveEnergy(kg, c, wi, Fssr, Fssg, Fssb) {
  const t = kg.f32;
  const mu = wi.x * c.N.x + wi.y * c.N.y + wi.z * c.N.z;
  const y = muToYIndex(mu);
  const rough = aToRoughIndex(c);
  let E;
  let Eavg;
  if (c.type === CLOSURE_BSDF_MICROFACET_GGX) {
    E = lookupTableRead2D(t, rough, y, kg.tGgxE, 32, 32);
    Eavg = lookupTableRead(t, rough, kg.tGgxEavg, 32);
  } else if (c.type === CLOSURE_BSDF_MICROFACET_GGX_GLASS) {
    let ofs = kg.tGgxGlassE;
    let avg = kg.tGgxGlassEavg;
    let ior = c.ior;
    if (ior < 1) {
      ior = 1 / ior;
      ofs = kg.tGgxGlassInvE;
      avg = kg.tGgxGlassInvEavg;
    }
    const z = iorToZIndex(ior);
    E = lookupTableRead3D(t, rough, y, z, ofs, 32, 32, 32);
    Eavg = lookupTableRead2D(t, rough, z, avg, 32, 32);
  } else {
    E = 1;
    Eavg = 1;
  }
  const missing = (1 - E) / E;
  c.energyScale = 1 + missing;
  if (!(Fssr === 1 && Fssg === 1 && Fssb === 1)) {
    const fms = (F) => F * Eavg / (1 - F * (1 - Eavg));
    const dr = (1 + fms(Fssr) * missing) / c.energyScale;
    const dg = (1 + fms(Fssg) * missing) / c.energyScale;
    const db = (1 + fms(Fssb) * missing) / c.energyScale;
    c.wr *= dr;
    c.wg *= dg;
    c.wb *= db;
    c.sampleWeight *= (dr + dg + db) / 3;
  }
}
function microfacetEstimateAlbedo(kg, wi, c, evalReflection, evalTransmission, out) {
  const t = kg.f32;
  const cosNI = wi.x * c.N.x + wi.y * c.N.y + wi.z * c.N.z;
  let rr = evalReflection ? 1 : 0, rg = rr, rb = rr;
  let tr = evalTransmission ? 1 : 0, tg = tr, tb = tr;
  if (c.fresnelType === FRESNEL_GENERALIZED_SCHLICK) {
    const rough = aToRoughIndex(c);
    let s;
    if (c.exponent < 0) {
      const z = iorToZIndex(c.ior);
      const y = muToYIndex(cosNI);
      s = lookupTableRead3D(t, rough, y, z, kg.tGenSchlickIorS, 32, 32, 32);
    } else {
      const z = 1 / (0.2 * c.exponent + 1);
      const y = muToYIndex(cosNI);
      s = lookupTableRead3D(t, rough, y, z, kg.tGenSchlickS, 32, 32, 32);
    }
    const Fr = mix(c.f0r, c.f90r, s), Fg = mix(c.f0g, c.f90g, s), Fb = mix(c.f0b, c.f90b, s);
    rr *= c.tintRr * Fr;
    rg *= c.tintRg * Fg;
    rb *= c.tintRb * Fb;
    tr *= c.tintTr * (1 - Fr);
    tg *= c.tintTg * (1 - Fg);
    tb *= c.tintTb * (1 - Fb);
    out[0] = rr + tr;
    out[1] = rg + tg;
    out[2] = rb + tb;
    return;
  }
  if (c.fresnelType === FRESNEL_F82_TINT) {
    const rough = aToRoughIndex(c);
    const y = muToYIndex(cosNI);
    const s = lookupTableRead3D(t, rough, y, 0.5, kg.tGenSchlickS, 32, 32, 32);
    const e = evalReflection ? 1 : 0;
    out[0] = mix(c.f0r, 1, s) * e;
    out[1] = mix(c.f0g, 1, s) * e;
    out[2] = mix(c.f0b, 1, s) * e;
    return;
  }
  if (c.fresnelType === FRESNEL_DIELECTRIC && c.ior > 1) {
    const rough = aToRoughIndex(c);
    const z = iorToZIndex(c.ior);
    const y = muToYIndex(cosNI);
    const s = lookupTableRead3D(t, rough, y, z, kg.tGenSchlickIorS, 32, 32, 32);
    const F = mix(F0FromIor(c.ior), 1, s);
    rr *= F;
    rg *= F;
    rb *= F;
    tr *= 1 - F;
    tg *= 1 - F;
    tb *= 1 - F;
    if (closureIsGlass(c.type)) {
      out[0] = rr + tr;
      out[1] = rg + tg;
      out[2] = rb + tb;
    } else {
      out[0] = rr;
      out[1] = rg;
      out[2] = rb;
    }
    return;
  }
  microfacetFresnel(c, cosNI);
  out[0] = rr * fRr + tr * fTr;
  out[1] = rg * fRg + tg * fTg;
  out[2] = rb * fRb + tb * fTb;
}
var _alb = new Float64Array(3);
function setupGgx(c) {
  c.alpha = saturate(c.alpha);
  c.alphaY = saturate(c.alphaY);
  c.fresnelType = FRESNEL_NONE;
  c.energyScale = 1;
  c.type = CLOSURE_BSDF_MICROFACET_GGX;
  return SR_BSDF | (alphaIsAlmostSpecular(c.alpha, c.alphaY) ? 0 : SR_BSDF_HAS_EVAL);
}
function setupGgxGlass(c) {
  c.alpha = saturate(c.alpha);
  c.alphaY = saturate(c.alphaY);
  c.fresnelType = FRESNEL_DIELECTRIC;
  c.energyScale = 1;
  c.type = CLOSURE_BSDF_MICROFACET_GGX_GLASS;
  return SR_BSDF | SR_BSDF_HAS_TRANSMISSION | (alphaIsAlmostSpecular(c.alpha, c.alphaY) ? 0 : SR_BSDF_HAS_EVAL);
}
function setupFresnelDielectric(kg, c, wi) {
  c.fresnelType = FRESNEL_DIELECTRIC;
  microfacetEstimateAlbedo(kg, wi, c, true, true, _alb);
  c.sampleWeight *= (_alb[0] + _alb[1] + _alb[2]) / 3;
  const Fss = fresnelDielectricFss(c.ior);
  microfacetGgxPreserveEnergy(kg, c, wi, Fss, Fss, Fss);
}
function microfacetAlbedo(kg, wi, c, evalReflection, evalTransmission, out) {
  microfacetEstimateAlbedo(kg, wi, c, evalReflection, evalTransmission, out);
}
var SHEEN_RES = 32;
function setupSheen(kg, c, wi, roughness) {
  c.type = CLOSURE_BSDF_SHEEN;
  const r = Math.min(Math.max(roughness, 1e-3), 1);
  const N = c.N;
  let bx = N.y * wi.z - N.z * wi.y, by = N.z * wi.x - N.x * wi.z, bz = N.x * wi.y - N.y * wi.x;
  const bl = Math.hypot(bx, by, bz);
  if (bl > 0) {
    bx /= bl;
    by /= bl;
    bz /= bl;
  } else {
    bx = by = bz = 0;
  }
  if (bx * bx + by * by + bz * bz < 0.99) {
    makeOrthonormals(N, c.T, _B2);
  } else {
    c.T.x = by * N.z - bz * N.y;
    c.T.y = bz * N.x - bx * N.z;
    c.T.z = bx * N.y - by * N.x;
  }
  const cosNI = N.x * wi.x + N.y * wi.y + N.z * wi.z;
  const t = kg.f32;
  const ofs = kg.tSheenLtc;
  const a = lookupTableRead2D(t, cosNI, r, ofs, SHEEN_RES, SHEEN_RES);
  const b = lookupTableRead2D(t, cosNI, r, ofs + SHEEN_RES * SHEEN_RES, SHEEN_RES, SHEEN_RES);
  const albedo = lookupTableRead2D(t, cosNI, r, ofs + 2 * SHEEN_RES * SHEEN_RES, SHEEN_RES, SHEEN_RES);
  if (Math.abs(a) < 1e-5 || albedo < 1e-5) {
    c.type = CLOSURE_NONE;
    c.sampleWeight = 0;
    return 0;
  }
  c.alpha = a;
  c.alphaY = b;
  c.wr *= albedo;
  c.wg *= albedo;
  c.wb *= albedo;
  c.sampleWeight *= albedo;
  return Math.max(c.wr, c.wg, c.wb);
}
var _Bs = f3();
function sheenEval(c, wo, res) {
  const N = c.N, T = c.T;
  _Bs.x = N.y * T.z - N.z * T.y;
  _Bs.y = N.z * T.x - N.x * T.z;
  _Bs.z = N.x * T.y - N.y * T.x;
  const a = c.alpha, b = c.alphaY;
  const lx = wo.x * T.x + wo.y * T.y + wo.z * T.z;
  const ly = wo.x * _Bs.x + wo.y * _Bs.y + wo.z * _Bs.z;
  const lz = wo.x * N.x + wo.y * N.y + wo.z * N.z;
  const lenSqr = sqr(a * lx + b * lz) + sqr(a * ly) + sqr(lz);
  const val = M_1_PI * Math.max(lz, 0) * sqr(a / lenSqr);
  res.r = res.g = res.b = val;
  res.pdf = val;
}
function sheenSample(c, Ng, rx, ry, res, wo) {
  const N = c.N, T = c.T;
  _Bs.x = N.y * T.z - N.z * T.y;
  _Bs.y = N.z * T.x - N.x * T.z;
  _Bs.z = N.x * T.y - N.y * T.x;
  const a = c.alpha, b = c.alphaY;
  sampleUniformDisk(rx, ry, _disk2);
  const dx = _disk2[0], dy = _disk2[1];
  const diskZ = safeSqrt(1 - dx * dx - dy * dy);
  let lx = dx - diskZ * b, ly = dy, lz = diskZ * a;
  const ll = Math.hypot(lx, ly, lz);
  lx /= ll;
  ly /= ll;
  lz /= ll;
  wo.x = lx * T.x + ly * _Bs.x + lz * N.x;
  wo.y = lx * T.y + ly * _Bs.y + lz * N.y;
  wo.z = lx * T.z + ly * _Bs.z + lz * N.z;
  if (Ng.x * wo.x + Ng.y * wo.y + Ng.z * wo.z <= 0) {
    res.r = res.g = res.b = 0;
    res.pdf = 0;
    return LABEL_REFLECT | LABEL_DIFFUSE;
  }
  const lenSqr = sqr(a * lx + b * lz) + sqr(a * ly) + sqr(lz);
  const val = M_1_PI * lz * sqr(a / lenSqr);
  res.r = res.g = res.b = val;
  res.pdf = val;
  return LABEL_REFLECT | LABEL_DIFFUSE;
}
function setupFresnelGeneralizedSchlick(kg, c, wi, preserveEnergy) {
  c.f0r = saturate(c.f0r);
  c.f0g = saturate(c.f0g);
  c.f0b = saturate(c.f0b);
  c.fresnelType = FRESNEL_GENERALIZED_SCHLICK;
  microfacetEstimateAlbedo(kg, wi, c, true, true, _alb);
  c.sampleWeight *= (_alb[0] + _alb[1] + _alb[2]) / 3;
  if (preserveEnergy) {
    let Fr, Fg, Fb;
    if (c.tintTr === 0 && c.tintTg === 0 && c.tintTb === 0) {
      let s;
      if (c.exponent < 0) {
        const F0 = F0FromIor(c.ior);
        const Fss = fresnelDielectricFss(c.ior);
        s = saturate(inverseLerp(F0, 1, Fss));
      } else {
        s = 2 / ((c.exponent + 3) * c.exponent + 2);
      }
      Fr = c.tintRr * mix(c.f0r, c.f90r, s);
      Fg = c.tintRg * mix(c.f0g, c.f90g, s);
      Fb = c.tintRb * mix(c.f0b, c.f90b, s);
    } else {
      Fr = c.tintTr;
      Fg = c.tintTg;
      Fb = c.tintTb;
    }
    microfacetGgxPreserveEnergy(kg, c, wi, Fr, Fg, Fb);
  }
}
function setupFresnelF82Tint(kg, c, wi, tr, tg, tb, preserveEnergy) {
  if (tr === 1 && tg === 1 && tb === 1) {
    c.br = c.bg = c.bb = 0;
  } else {
    c.br = fresnelF82TintB(c.f0r, tr);
    c.bg = fresnelF82TintB(c.f0g, tg);
    c.bb = fresnelF82TintB(c.f0b, tb);
  }
  c.fresnelType = FRESNEL_F82_TINT;
  microfacetEstimateAlbedo(kg, wi, c, true, true, _alb);
  c.sampleWeight *= (_alb[0] + _alb[1] + _alb[2]) / 3;
  if (preserveEnergy) {
    microfacetGgxPreserveEnergy(kg, c, wi, fresnelF82Fss(c.f0r, c.br), fresnelF82Fss(c.f0g, c.bg), fresnelF82Fss(c.f0b, c.bb));
  }
}
function setupFresnelConstant(kg, c, wi, r, g, b) {
  microfacetGgxPreserveEnergy(kg, c, wi, r, g, b);
}
function closureLayerAlbedo(kg, wi, c, out) {
  let m = 1;
  if (closureIsMicrofacet(c.type)) {
    microfacetEstimateAlbedo(kg, wi, c, true, false, _alb);
    m = Math.max(_alb[0], _alb[1], _alb[2]);
  }
  out[0] = c.wr * m;
  out[1] = c.wg * m;
  out[2] = c.wb * m;
}
var _T2 = f3();
var _B2 = f3();
function microfacetEval(c, wi, wo, res) {
  const hasReflection = !closureIsRefraction(c.type);
  const hasTransmission = closureIsGlass(c.type) || !hasReflection;
  const N = c.N;
  const cosNI = N.x * wi.x + N.y * wi.y + N.z * wi.z;
  const cosNO = N.x * wo.x + N.y * wo.y + N.z * wo.z;
  const isTransmission = cosNO < 0;
  res.r = res.g = res.b = 0;
  res.pdf = 0;
  if (cosNI <= 0 || alphaIsAlmostSpecular(c.alpha, c.alphaY) || isTransmission && !hasTransmission || !isTransmission && !hasReflection) return;
  let Hx, Hy, Hz;
  if (isTransmission) {
    Hx = -(c.ior * wo.x + wi.x);
    Hy = -(c.ior * wo.y + wi.y);
    Hz = -(c.ior * wo.z + wi.z);
  } else {
    Hx = wi.x + wo.x;
    Hy = wi.y + wo.y;
    Hz = wi.z + wo.z;
  }
  const lenH = Math.hypot(Hx, Hy, Hz);
  const invLenH = lenH !== 0 ? 1 / lenH : 0;
  Hx *= invLenH;
  Hy *= invLenH;
  Hz *= invLenH;
  const cosHI = Hx * wi.x + Hy * wi.y + Hz * wi.z;
  microfacetFresnel(c, cosHI);
  if (fRr === 0 && fRg === 0 && fRb === 0 && fTr === 0 && fTg === 0 && fTb === 0) return;
  const cosNH = N.x * Hx + N.y * Hy + N.z * Hz;
  let D, lambdaI, lambdaO;
  if (c.alpha === c.alphaY) {
    const alpha2 = c.alpha * c.alphaY;
    D = ggxD(alpha2, cosNH);
    lambdaI = ggxLambda(alpha2, cosNI);
    lambdaO = ggxLambda(alpha2, cosNO);
  } else {
    makeOrthonormalsTangent(N, c.T, _T2, _B2);
    D = ggxAnisoD(c.alpha, c.alphaY, _T2.x * Hx + _T2.y * Hy + _T2.z * Hz, _B2.x * Hx + _B2.y * Hy + _B2.z * Hz, cosNH);
    lambdaI = ggxAnisoLambda(c.alpha, c.alphaY, _T2.x * wi.x + _T2.y * wi.y + _T2.z * wi.z, _B2.x * wi.x + _B2.y * wi.y + _B2.z * wi.z, cosNI);
    lambdaO = ggxAnisoLambda(c.alpha, c.alphaY, _T2.x * wo.x + _T2.y * wo.y + _T2.z * wo.z, _B2.x * wo.x + _B2.y * wo.y + _B2.z * wo.z, cosNO);
  }
  const cosHO = Hx * wo.x + Hy * wo.y + Hz * wo.z;
  const common = D / cosNI * (isTransmission ? sqr(c.ior * invLenH) * Math.abs(cosHI * cosHO) : 0.25);
  const avgR = (fRr + fRg + fRb) / 3;
  const avgSum = (fRr + fRg + fRb + fTr + fTg + fTb) / 3;
  const pdfReflect = avgR / avgSum;
  const lobePdf = isTransmission ? 1 - pdfReflect : pdfReflect;
  res.pdf = common * lobePdf / (1 + lambdaI);
  const f = common / (1 + lambdaO + lambdaI);
  if (isTransmission) {
    res.r = fTr * f;
    res.g = fTg * f;
    res.b = fTb * f;
  } else {
    res.r = fRr * f;
    res.g = fRg * f;
    res.b = fRb * f;
  }
}
function microfacetSample(c, Ng, wi, rx, ry, rz, res, wo) {
  const N = c.N;
  const cosNI = N.x * wi.x + N.y * wi.y + N.z * wi.z;
  if (cosNI <= 0) return LABEL_NONE;
  const mEta = c.ior;
  const mInvEta = c.ior !== 0 ? 1 / c.ior : 0;
  const ax = c.alpha, ay = c.alphaY;
  const iso = ax === ay;
  let singular = alphaIsAlmostSpecular(ax, ay);
  let Hx, Hy, Hz;
  let localHx = 0, localHy = 0, localHz = 1, lix = 0, liy = 0;
  if (singular) {
    Hx = N.x;
    Hy = N.y;
    Hz = N.z;
  } else {
    if (iso) makeOrthonormals(N, _T2, _B2);
    else makeOrthonormalsTangent(N, c.T, _T2, _B2);
    lix = _T2.x * wi.x + _T2.y * wi.y + _T2.z * wi.z;
    liy = _B2.x * wi.x + _B2.y * wi.y + _B2.z * wi.z;
    ggxSampleVndf(lix, liy, cosNI, ax, ay, rx, ry);
    localHx = _lH.x;
    localHy = _lH.y;
    localHz = _lH.z;
    Hx = _lH.x * _T2.x + _lH.y * _B2.x + _lH.z * N.x;
    Hy = _lH.x * _T2.y + _lH.y * _B2.y + _lH.z * N.y;
    Hz = _lH.x * _T2.z + _lH.y * _B2.z + _lH.z * N.z;
  }
  const cosHI = Hx * wi.x + Hy * wi.y + Hz * wi.z;
  microfacetFresnel(c, cosHI);
  const cosHO = fCosT;
  if (fRr === 0 && fRg === 0 && fRb === 0 && fTr === 0 && fTg === 0 && fTb === 0) return LABEL_NONE;
  const avgR = (fRr + fRg + fRb) / 3;
  const avgSum = (fRr + fRg + fRb + fTr + fTg + fTb) / 3;
  const pdfReflect = avgR / avgSum;
  const doRefract = rz >= pdfReflect;
  if (doRefract) {
    const k = mInvEta * cosHI + cosHO;
    wo.x = k * Hx - mInvEta * wi.x;
    wo.y = k * Hy - mInvEta * wi.y;
    wo.z = k * Hz - mInvEta * wi.z;
  } else {
    wo.x = 2 * cosHI * Hx - wi.x;
    wo.y = 2 * cosHI * Hy - wi.y;
    wo.z = 2 * cosHI * Hz - wi.z;
  }
  const cosNO = N.x * wo.x + N.y * wo.y + N.z * wo.z;
  const cosNgO = Ng.x * wo.x + Ng.y * wo.y + Ng.z * wo.z;
  if (cosNgO < 0 !== doRefract || cosNO < 0 !== doRefract) return LABEL_NONE;
  let er, eg, eb, pdf;
  if (doRefract) {
    er = fTr;
    eg = fTg;
    eb = fTb;
    pdf = 1 - pdfReflect;
    singular = singular || Math.abs(mEta - 1) < 1e-4;
  } else {
    er = fRr;
    eg = fRg;
    eb = fRb;
    pdf = pdfReflect;
  }
  if (singular) {
    pdf *= 1e6;
    er *= 1e6;
    eg *= 1e6;
    eb *= 1e6;
  } else {
    let D, lambdaO, lambdaI;
    if (iso) {
      const alpha2 = ax * ay;
      D = ggxD(alpha2, localHz);
      lambdaO = ggxLambda(alpha2, cosNO);
      lambdaI = ggxLambda(alpha2, cosNI);
    } else {
      D = ggxAnisoD(ax, ay, localHx, localHy, localHz);
      lambdaO = ggxAnisoLambda(ax, ay, _T2.x * wo.x + _T2.y * wo.y + _T2.z * wo.z, _B2.x * wo.x + _B2.y * wo.y + _B2.z * wo.z, cosNO);
      lambdaI = ggxAnisoLambda(ax, ay, lix, liy, cosNI);
    }
    const common = D / cosNI * (doRefract ? Math.abs(cosHI * cosHO) / sqr(cosHO + cosHI * mInvEta) : 0.25);
    pdf *= common / (1 + lambdaI);
    const f = common / (1 + lambdaI + lambdaO);
    er *= f;
    eg *= f;
    eb *= f;
  }
  const s = c.energyScale;
  res.r = er * s;
  res.g = eg * s;
  res.b = eb * s;
  res.pdf = pdf;
  return (doRefract ? LABEL_TRANSMIT : LABEL_REFLECT) | (singular ? LABEL_SINGULAR : LABEL_GLOSSY);
}
function bsdfEval(c, wi, wo, res) {
  switch (c.type) {
    case CLOSURE_BSDF_DIFFUSE: {
      const cosNO = Math.max(c.N.x * wo.x + c.N.y * wo.y + c.N.z * wo.z, 0) * M_1_PI;
      res.r = res.g = res.b = cosNO;
      res.pdf = cosNO;
      return;
    }
    case CLOSURE_BSDF_MICROFACET_GGX:
    case CLOSURE_BSDF_MICROFACET_GGX_REFRACTION:
    case CLOSURE_BSDF_MICROFACET_GGX_GLASS: {
      microfacetEval(c, wi, wo, res);
      const s = c.energyScale;
      res.r *= s;
      res.g *= s;
      res.b *= s;
      return;
    }
    case CLOSURE_BSDF_SHEEN:
      sheenEval(c, wo, res);
      return;
    default:
      res.r = res.g = res.b = 0;
      res.pdf = 0;
  }
}
function bsdfSample(c, Ng, wi, rx, ry, rz, res, wo) {
  res.r = res.g = res.b = 0;
  res.pdf = 0;
  switch (c.type) {
    case CLOSURE_BSDF_DIFFUSE: {
      const pdf = sampleCosHemisphere(c.N, rx, ry, wo);
      if (Ng.x * wo.x + Ng.y * wo.y + Ng.z * wo.z > 0) {
        res.r = res.g = res.b = pdf;
        res.pdf = pdf;
      }
      return LABEL_REFLECT | LABEL_DIFFUSE;
    }
    case CLOSURE_BSDF_MICROFACET_GGX:
    case CLOSURE_BSDF_MICROFACET_GGX_REFRACTION:
    case CLOSURE_BSDF_MICROFACET_GGX_GLASS:
      return microfacetSample(c, Ng, wi, rx, ry, rz, res, wo);
    case CLOSURE_BSDF_SHEEN:
      return sheenSample(c, Ng, rx, ry, res, wo);
    case CLOSURE_BSDF_TRANSPARENT: {
      wo.x = -wi.x;
      wo.y = -wi.y;
      wo.z = -wi.z;
      res.pdf = 1;
      res.r = res.g = res.b = 1;
      return LABEL_TRANSMIT | LABEL_TRANSPARENT;
    }
  }
  return LABEL_NONE;
}
function bsdfBlur(c, roughness) {
  if (closureIsMicrofacet(c.type)) {
    c.alpha = Math.max(roughness, c.alpha);
    c.alphaY = Math.max(roughness, c.alphaY);
  }
}
function bsdfRoughnessSquared(c) {
  if (closureIsMicrofacet(c.type)) return c.alpha * c.alphaY;
  return 1;
}

// src/kernel/texture.ts
var SRGB_TO_LINEAR = new Float32Array(256);
for (let i = 0; i < 256; i++) {
  const c = i / 255;
  SRGB_TO_LINEAR[i] = c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
var LINEAR_8 = new Float32Array(256);
for (let i = 0; i < 256; i++) LINEAR_8[i] = i / 255;
var HALF_TO_FLOAT = null;
function halfTable() {
  if (HALF_TO_FLOAT) return HALF_TO_FLOAT;
  const t = new Float32Array(65536);
  for (let h = 0; h < 65536; h++) {
    const sign = h & 32768 ? -1 : 1;
    const exp = h >> 10 & 31;
    const mant = h & 1023;
    t[h] = exp === 0 ? sign * mant * 2 ** -24 : exp === 31 ? mant ? NaN : sign * Infinity : sign * (1 + mant / 1024) * 2 ** (exp - 15);
  }
  HALF_TO_FLOAT = t;
  return t;
}
function wrap(i, n, mode) {
  if (mode === 0) {
    i %= n;
    return i < 0 ? i + n : i;
  }
  if (mode === 1) return i < 0 ? 0 : i >= n ? n - 1 : i;
  const period = 2 * n;
  let m = i % period;
  if (m < 0) m += period;
  return m < n ? m : period - 1 - m;
}
function fetchTexel(kg, offset, width, flags, x, y, out, o, w) {
  const t = kg.texels;
  if (flags & TexFlags.HALF) {
    const h = halfTable();
    const base = offset + (y * width + x) * 2;
    const a = t[base];
    const b = t[base + 1];
    out[o] += w * h[a & 65535];
    out[o + 1] += w * h[a >>> 16];
    out[o + 2] += w * h[b & 65535];
    out[o + 3] += w * h[b >>> 16];
  } else {
    const p = t[offset + y * width + x];
    const lut = flags & TexFlags.SRGB ? SRGB_TO_LINEAR : LINEAR_8;
    out[o] += w * lut[p & 255];
    out[o + 1] += w * lut[p >>> 8 & 255];
    out[o + 2] += w * lut[p >>> 16 & 255];
    out[o + 3] += w * LINEAR_8[p >>> 24];
  }
}
function textureLookup(kg, tex, u, v, out, o = 0) {
  const d = kg.textures + tex * TEX_SIZE;
  const U = kg.u32;
  const F = kg.f32;
  const offset = U[d + TX.OFFSET];
  const width = U[d + TX.WIDTH];
  const height = U[d + TX.HEIGHT];
  const flags = U[d + TX.FLAGS];
  const m = d + TX.M;
  const tu = F[m] * u + F[m + 1] * v + F[m + 2];
  const tv = F[m + 3] * u + F[m + 4] * v + F[m + 5];
  const wrapS = flags >>> TexFlags.WRAP_S_SHIFT & 3;
  const wrapT = flags >>> TexFlags.WRAP_T_SHIFT & 3;
  const fy = flags & TexFlags.FLIP_Y ? tv : 1 - tv;
  out[o] = out[o + 1] = out[o + 2] = out[o + 3] = 0;
  const x = tu * width - 0.5;
  const y = fy * height - 0.5;
  if (flags & TexFlags.NEAREST) {
    const ix = wrap(Math.floor(x + 0.5), width, wrapS);
    const iy = wrap(Math.floor(y + 0.5), height, wrapT);
    fetchTexel(kg, offset, width, flags, ix, iy, out, o, 1);
    return;
  }
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const ax = x - x0;
  const ay = y - y0;
  const ix0 = wrap(x0, width, wrapS);
  const ix1 = wrap(x0 + 1, width, wrapS);
  const iy0 = wrap(y0, height, wrapT);
  const iy1 = wrap(y0 + 1, height, wrapT);
  fetchTexel(kg, offset, width, flags, ix0, iy0, out, o, (1 - ax) * (1 - ay));
  fetchTexel(kg, offset, width, flags, ix1, iy0, out, o, ax * (1 - ay));
  fetchTexel(kg, offset, width, flags, ix0, iy1, out, o, (1 - ax) * ay);
  fetchTexel(kg, offset, width, flags, ix1, iy1, out, o, ax * ay);
}
function directionToEquirect(dx, dy, dz, rotation, out, o = 0) {
  let x = dx;
  let z = dz;
  if (rotation !== 0) {
    const c = Math.cos(rotation);
    const s = Math.sin(rotation);
    x = c * dx + s * dz;
    z = -s * dx + c * dz;
  }
  const len = Math.sqrt(x * x + dy * dy + z * z);
  out[o] = Math.atan2(z, x) * (0.5 / Math.PI) + 0.5;
  out[o + 1] = Math.asin(Math.max(-1, Math.min(1, dy / (len || 1)))) / Math.PI + 0.5;
}
function equirectToDirection(u, v, rotation, out, o = 0) {
  const phi = (u - 0.5) * 2 * Math.PI;
  const lat = (v - 0.5) * Math.PI;
  const r = Math.cos(lat);
  let x = r * Math.cos(phi);
  const y = Math.sin(lat);
  let z = r * Math.sin(phi);
  if (rotation !== 0) {
    const c = Math.cos(rotation);
    const s = Math.sin(rotation);
    const rx = c * x - s * z;
    const rz = s * x + c * z;
    x = rx;
    z = rz;
  }
  out[o] = x;
  out[o + 1] = y;
  out[o + 2] = z;
}

// src/kernel/light.ts
var LIGHT_TRIANGLE = 5;
var LightSample = class {
  P = f3();
  Ng = f3();
  D = f3();
  t = 0;
  pdf = 0;
  evalFac = 0;
  /** Emitted radiance before eval_fac (light strength, or the background/emission shader value). */
  er = 0;
  eg = 0;
  eb = 0;
  type = 0;
  /** Light index for lamps, triangle index for mesh lights. */
  lamp = -1;
  prim = -1;
  castShadow = true;
};
var _cone = new Float64Array(2);
var _tmp = f3();
var _tmp2 = f3();
var _uvt2 = new Float64Array(3);
var _rgba = new Float64Array(4);
var _uv = new Float64Array(2);
var _dir = new Float64Array(3);
function sinSqrToOneMinusCos(sSq) {
  return sSq > 4e-4 ? 1 - safeSqrt(1 - sSq) : 0.5 * sSq;
}
function smoothstep012(x) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return (3 - 2 * x) * x * x;
}
function raySphereIntersect(Px, Py, Pz, Dx, Dy, Dz, tmin, tmax, cx, cy, cz, r) {
  const dx = cx - Px, dy = cy - Py, dz = cz - Pz;
  const dSq = dx * dx + dy * dy + dz * dz;
  const rSq = r * r;
  const dCosTheta = dx * Dx + dy * Dy + dz * Dz;
  const hSq = dSq - dCosTheta * dCosTheta;
  if (dSq > rSq && (dCosTheta < 0 || hSq > rSq)) return -1;
  const tOffset = Math.sqrt(Math.max(rSq - hSq, 0));
  const t = dCosTheta - (dSq < rSq ? -tOffset : tOffset);
  if (t > tmin && t < tmax) return t;
  return -1;
}
function backgroundEval(kg, Dx, Dy, Dz, out) {
  const sh = kg.shaders + kg.worldShader * SHADER_SIZE;
  const f = kg.f32;
  let r = f[sh + SH.EMISSION], g = f[sh + SH.EMISSION + 1], b = f[sh + SH.EMISSION + 2];
  const tex = kg.u32[sh + SH.ENV_TEX];
  if (tex !== NONE) {
    directionToEquirect(Dx, Dy, Dz, f[sh + SH.ENV_ROTATION], _uv);
    textureLookup(kg, tex, _uv[0], _uv[1], _rgba);
    r *= _rgba[0];
    g *= _rgba[1];
    b *= _rgba[2];
  }
  out[0] = r;
  out[1] = g;
  out[2] = b;
}
function shaderBackgroundEval(kg, D, out) {
  backgroundEval(kg, D.x, D.y, D.z, out);
}
function backgroundMapSample(kg, rx, ry, D) {
  const f = kg.f32;
  const resX = kg.bgResX;
  const resY = kg.bgResY;
  const cdfWidth = resX + 1;
  const marg = kg.bgMarginal;
  const cond = kg.bgConditional;
  let first = 0;
  let count = resY;
  while (count > 0) {
    const step = count >> 1;
    const middle = first + step;
    if (f[marg + middle * 2 + 1] < ry) {
      first = middle + 1;
      count -= step + 1;
    } else count = step;
  }
  const indexV = Math.max(0, first - 1);
  const cdfVx = f[marg + indexV * 2], cdfVy = f[marg + indexV * 2 + 1];
  const cdfNextVy = f[marg + (indexV + 1) * 2 + 1];
  const cdfLastVx = f[marg + resY * 2];
  const dv = inverseLerp(cdfVy, cdfNextVy, ry);
  const v = (indexV + dv) / resY;
  first = 0;
  count = resX;
  const row = cond + indexV * cdfWidth * 2;
  while (count > 0) {
    const step = count >> 1;
    const middle = first + step;
    if (f[row + middle * 2 + 1] < rx) {
      first = middle + 1;
      count -= step + 1;
    } else count = step;
  }
  const indexU = Math.max(0, first - 1);
  const cdfUx = f[row + indexU * 2], cdfUy = f[row + indexU * 2 + 1];
  const cdfNextUy = f[row + (indexU + 1) * 2 + 1];
  const cdfLastUx = f[row + resX * 2];
  const du = inverseLerp(cdfUy, cdfNextUy, rx);
  const u = (indexU + du) / resX;
  const sinTheta = Math.sin(Math.PI * v);
  const denom = 2 * Math.PI * Math.PI * sinTheta * cdfLastUx * cdfLastVx;
  const pdf = sinTheta === 0 || denom === 0 ? 0 : cdfUx * cdfVx / denom;
  const sh = kg.shaders + kg.worldShader * SHADER_SIZE;
  equirectToDirection(u, 1 - v, kg.f32[sh + SH.ENV_ROTATION], _dir);
  D.x = _dir[0];
  D.y = _dir[1];
  D.z = _dir[2];
  return pdf;
}
function backgroundLightPdf(kg, Dx, Dy, Dz) {
  const f = kg.f32;
  const resX = kg.bgResX;
  const resY = kg.bgResY;
  if (resX === 0) return 1 / (4 * Math.PI);
  const sh = kg.shaders + kg.worldShader * SHADER_SIZE;
  directionToEquirect(Dx, Dy, Dz, f[sh + SH.ENV_ROTATION], _uv);
  const u = _uv[0];
  const v = 1 - _uv[1];
  const sinTheta = Math.sin(v * Math.PI);
  if (sinTheta === 0) return 0;
  const cdfWidth = resX + 1;
  const indexU = clamp(Math.trunc(u * resX), 0, resX - 1);
  const indexV = clamp(Math.trunc(v * resY), 0, resY - 1);
  const row = kg.bgConditional + indexV * cdfWidth * 2;
  const cdfLastUx = f[row + resX * 2];
  const cdfLastVx = f[kg.bgMarginal + resY * 2];
  const denom = 2 * Math.PI * Math.PI * sinTheta * cdfLastUx * cdfLastVx;
  if (denom === 0) return 0;
  return f[row + indexU * 2] * f[kg.bgMarginal + indexV * 2] / denom;
}
function areaLightRectSample(Px, Py, Pz, ls, ux, uy, uz, lenU, vx, vy, vz, lenV, rx, ry, sampleCoord) {
  let zx = uy * vz - uz * vy, zy = uz * vx - ux * vz, zz = ux * vy - uy * vx;
  const dirx = ls.P.x - Px, diry = ls.P.y - Py, dirz = ls.P.z - Pz;
  let z0 = dirx * zx + diry * zy + dirz * zz;
  if (z0 > 0) {
    zx = -zx;
    zy = -zy;
    zz = -zz;
    z0 = -z0;
  }
  const xc = dirx * ux + diry * uy + dirz * uz;
  const yc = dirx * vx + diry * vy + dirz * vz;
  const x0 = xc - 0.5 * lenU;
  const x1 = xc + 0.5 * lenU;
  const y0 = yc - 0.5 * lenV;
  const y1 = yc + 0.5 * lenV;
  let n0 = -y0, n1 = x1, n2 = y1, n3 = -x0;
  n0 /= Math.sqrt(n0 * n0 + z0 * z0);
  n1 /= Math.sqrt(n1 * n1 + z0 * z0);
  n2 /= Math.sqrt(n2 * n2 + z0 * z0);
  n3 /= Math.sqrt(n3 * n3 + z0 * z0);
  const g0 = safeAsin(-n0 * n1);
  const g1 = safeAsin(-n1 * n2);
  const g2 = safeAsin(-n2 * n3);
  const g3 = safeAsin(-n3 * n0);
  const S = -(g0 + g1 + g2 + g3);
  if (sampleCoord) {
    const b0 = n0;
    const b1 = n2;
    const b0sq = b0 * b0;
    const au = rx * S + g2 + g3;
    const sau = Math.sin(au);
    const fu = sau !== 0 ? (Math.cos(au) * b0 + b1) / sau : 0;
    let cu = (fu >= 0 ? 1 : -1) / Math.sqrt(fu * fu + b0sq);
    cu = clamp(cu, -1, 1);
    let xu = -(cu * z0) / Math.max(Math.sqrt(1 - cu * cu), 1e-7);
    xu = clamp(xu, x0, x1);
    const d2 = sqr(xu) + sqr(z0);
    const h0 = y0 / Math.sqrt(d2 + sqr(y0));
    const h1 = y1 / Math.sqrt(d2 + sqr(y1));
    const hv = h0 + ry * (h1 - h0);
    const hv2 = hv * hv;
    const yv = hv2 < 1 - 1e-6 ? hv * Math.sqrt(d2 / (1 - hv2)) : y1;
    ls.P.x = Px + xu * ux + yv * vx + z0 * zx;
    ls.P.y = Py + xu * uy + yv * vy + z0 * zy;
    ls.P.z = Pz + xu * uz + yv * vz + z0 * zz;
  }
  if (S < 1e-5 || Math.min(n0 * n0, n1 * n1, n2 * n2, n3 * n3) > 0.99999) {
    const t = Math.hypot(dirx, diry, dirz);
    const den = z0 * lenU * lenV;
    return den !== 0 ? -t * t * t / den : 0;
  }
  return 1 / S;
}
function ellipseSample(ls, ux, uy, uz, hu, vx, vy, vz, hv, rx, ry) {
  const a = 2 * rx - 1;
  const b = 2 * ry - 1;
  let dx = 0, dy = 0;
  if (a !== 0 || b !== 0) {
    let r, phi;
    if (a * a > b * b) {
      r = a;
      phi = Math.PI / 4 * (b / a);
    } else {
      r = b;
      phi = Math.PI / 2 - Math.PI / 4 * (a / b);
    }
    dx = r * Math.cos(phi);
    dy = r * Math.sin(phi);
  }
  ls.P.x += ux * hu * dx + vx * hv * dy;
  ls.P.y += uy * hu * dx + vy * hv * dy;
  ls.P.z += uz * hu * dx + vz * hv * dy;
}
function lightSampleFromPosition(kg, rx, ry, rz, P2, N, hasTransmission, ls) {
  if (kg.numDistribution === 0) return false;
  if (kg.useLightTree) {
    if (!lightTreeSample(kg, rz, P2, N, hasTransmission)) return false;
    const id = kg.i32[kg.lightTreeEmitters + treeSample.emitter * LIGHT_TREE_EMITTER_SIZE + LTE.ID];
    const selection = treeSample.pdf;
    if (id >= 0) {
      if (!triangleLightSample(kg, id, rx, ry, P2, ls)) return false;
    } else if (!lampSample(kg, ~id, rx, ry, P2, N, hasTransmission, ls)) return false;
    ls.pdf *= selection;
    return ls.pdf > 0;
  }
  const f = kg.f32;
  const u = kg.u32;
  let first = 0;
  let len = kg.numDistribution + 1;
  const dist = kg.distribution;
  do {
    const half = len >> 1;
    const middle = first + half;
    if (rz < f[dist + middle * DIST_SIZE]) len = half;
    else {
      first = middle + 1;
      len = len - half - 1;
    }
  } while (len > 0);
  const index = clamp(first - 1, 0, kg.numDistribution - 1);
  const prim = kg.i32[dist + index * DIST_SIZE + 1];
  if (prim >= 0) {
    return triangleLightSample(kg, prim, rx, ry, P2, ls);
  }
  const lamp = ~prim;
  if (!lampSample(kg, lamp, rx, ry, P2, N, hasTransmission, ls)) return false;
  ls.pdf *= kg.pdfLights;
  void u;
  return ls.pdf > 0;
}
function lampSample(kg, lamp, rx, ry, P2, N, hasTransmission, ls) {
  const f = kg.f32;
  const u = kg.u32;
  const L = kg.lights + lamp * LIGHT_SIZE;
  const type = u[L + LT.TYPE];
  const flags = u[L + LT.FLAGS];
  ls.type = type;
  ls.lamp = lamp;
  ls.prim = -1;
  ls.castShadow = (flags & LightFlags.CAST_SHADOW) !== 0;
  ls.er = f[L + LT.STRENGTH];
  ls.eg = f[L + LT.STRENGTH + 1];
  ls.eb = f[L + LT.STRENGTH + 2];
  if (type === LightType.SUN) {
    _tmp.x = f[L + LT.CO];
    _tmp.y = f[L + LT.CO + 1];
    _tmp.z = f[L + LT.CO + 2];
    sampleUniformCone(_tmp, f[L + LT.SUN_ONE_MINUS_COSANGLE], rx, ry, ls.Ng, _cone);
    ls.pdf = _cone[0];
    ls.P.x = ls.Ng.x;
    ls.P.y = ls.Ng.y;
    ls.P.z = ls.Ng.z;
    ls.D.x = -ls.Ng.x;
    ls.D.y = -ls.Ng.y;
    ls.D.z = -ls.Ng.z;
    ls.t = Infinity;
    ls.evalFac = f[L + LT.EVAL_FAC];
    return true;
  }
  if (type === LightType.BACKGROUND) {
    const pdf = backgroundMapSample(kg, rx, ry, ls.D);
    ls.pdf = pdf;
    ls.P.x = -ls.D.x;
    ls.P.y = -ls.D.y;
    ls.P.z = -ls.D.z;
    ls.Ng.x = ls.P.x;
    ls.Ng.y = ls.P.y;
    ls.Ng.z = ls.P.z;
    ls.t = Infinity;
    ls.evalFac = 1;
    backgroundEval(kg, ls.D.x, ls.D.y, ls.D.z, _rgba);
    ls.er = _rgba[0];
    ls.eg = _rgba[1];
    ls.eb = _rgba[2];
    return pdf > 0;
  }
  if (type === LightType.POINT || type === LightType.SPOT) {
    const cx = f[L + LT.CO], cy = f[L + LT.CO + 1], cz = f[L + LT.CO + 2];
    const radius = f[L + LT.RADIUS];
    const rSq = radius * radius;
    let lnx = P2.x - cx, lny = P2.y - cy, lnz = P2.z - cz;
    const dSq = lnx * lnx + lny * lny + lnz * lnz;
    const d = Math.sqrt(dSq);
    lnx /= d;
    lny /= d;
    lnz /= d;
    ls.evalFac = f[L + LT.EVAL_FAC];
    if (flags & LightFlags.IS_SPHERE) {
      let cosTheta;
      let tSet = false;
      if (dSq > rSq) {
        const oneMinusCos = sinSqrToOneMinusCos(rSq / dSq);
        let sampled = false;
        if (type === LightType.SPOT) {
          const oneMinusSpread = 1 - f[L + LT.COS_HALF_LARGER_SPREAD];
          if (!(oneMinusCos < oneMinusSpread)) {
            _tmp.x = -f[L + LT.SPOT_DIR];
            _tmp.y = -f[L + LT.SPOT_DIR + 1];
            _tmp.z = -f[L + LT.SPOT_DIR + 2];
            sampleUniformCone(_tmp, oneMinusSpread, rx, ry, ls.D, _cone);
            ls.pdf = _cone[0];
            const t2 = raySphereIntersect(P2.x, P2.y, P2.z, ls.D.x, ls.D.y, ls.D.z, 0, Infinity, cx, cy, cz, radius);
            if (t2 < 0) return false;
            ls.t = t2;
            ls.P.x = P2.x + ls.D.x * t2;
            ls.P.y = P2.y + ls.D.y * t2;
            ls.P.z = P2.z + ls.D.z * t2;
            tSet = true;
            sampled = true;
          }
        }
        if (!sampled) {
          _tmp.x = -lnx;
          _tmp.y = -lny;
          _tmp.z = -lnz;
          sampleUniformCone(_tmp, oneMinusCos, rx, ry, ls.D, _cone);
          ls.pdf = _cone[0];
        }
        cosTheta = _cone[1];
      } else {
        if (hasTransmission) {
          sampleUniformSphere(rx, ry, ls.D);
          ls.pdf = M_1_2PI * 0.5;
        } else {
          ls.pdf = sampleCosHemisphere(N, rx, ry, ls.D);
        }
        cosTheta = -(ls.D.x * lnx + ls.D.y * lny + ls.D.z * lnz);
      }
      if (type === LightType.SPOT && dSq > rSq) {
        const localZ = -(ls.D.x * f[L + LT.SPOT_DIR] + ls.D.y * f[L + LT.SPOT_DIR + 1] + ls.D.z * f[L + LT.SPOT_DIR + 2]);
        ls.evalFac *= smoothstep012((localZ - f[L + LT.COS_HALF_SPOT_ANGLE]) * f[L + LT.SPOT_SMOOTH]);
        if (ls.evalFac === 0) return false;
      }
      if (!tSet) {
        const sgn = dSq - rSq >= 0 ? 1 : -1;
        ls.t = d * cosTheta - sgn * safeSqrt(rSq - dSq + dSq * cosTheta * cosTheta);
        ls.P.x = P2.x + ls.D.x * ls.t;
        ls.P.y = P2.y + ls.D.y * ls.t;
        ls.P.z = P2.z + ls.D.z * ls.t;
      }
      let ngx = ls.P.x - cx, ngy = ls.P.y - cy, ngz = ls.P.z - cz;
      const ngl = Math.hypot(ngx, ngy, ngz) || 1;
      ngx /= ngl;
      ngy /= ngl;
      ngz /= ngl;
      ls.Ng.x = ngx;
      ls.Ng.y = ngy;
      ls.Ng.z = ngz;
      ls.P.x = cx + ngx * radius;
      ls.P.y = cy + ngy * radius;
      ls.P.z = cz + ngz * radius;
      return true;
    }
    ls.P.x = cx;
    ls.P.y = cy;
    ls.P.z = cz;
    let dx = cx - P2.x, dy = cy - P2.y, dz = cz - P2.z;
    const t = Math.hypot(dx, dy, dz);
    dx /= t;
    dy /= t;
    dz /= t;
    ls.D.x = dx;
    ls.D.y = dy;
    ls.D.z = dz;
    ls.t = t;
    ls.Ng.x = -dx;
    ls.Ng.y = -dy;
    ls.Ng.z = -dz;
    if (type === LightType.SPOT) {
      const localZ = -(dx * f[L + LT.SPOT_DIR] + dy * f[L + LT.SPOT_DIR + 1] + dz * f[L + LT.SPOT_DIR + 2]);
      ls.evalFac *= smoothstep012((localZ - f[L + LT.COS_HALF_SPOT_ANGLE]) * f[L + LT.SPOT_SMOOTH]);
      if (ls.evalFac === 0) return false;
    }
    ls.pdf = t * t;
    return true;
  }
  if (type === LightType.AREA) {
    const cx = f[L + LT.CO], cy = f[L + LT.CO + 1], cz = f[L + LT.CO + 2];
    const nx = f[L + LT.AREA_DIR], ny = f[L + LT.AREA_DIR + 1], nz = f[L + LT.AREA_DIR + 2];
    ls.P.x = cx;
    ls.P.y = cy;
    ls.P.z = cz;
    ls.Ng.x = nx;
    ls.Ng.y = ny;
    ls.Ng.z = nz;
    if ((cx - P2.x) * nx + (cy - P2.y) * ny + (cz - P2.z) * nz > 0) return false;
    const ux = f[L + LT.AXIS_U], uy = f[L + LT.AXIS_U + 1], uz = f[L + LT.AXIS_U + 2];
    const vx = f[L + LT.AXIS_V], vy = f[L + LT.AXIS_V + 1], vz = f[L + LT.AXIS_V + 2];
    const lenU = f[L + LT.LEN_U], lenV = f[L + LT.LEN_V];
    const invareaSigned = f[L + LT.INVAREA];
    if (invareaSigned > 0) {
      ls.pdf = areaLightRectSample(P2.x, P2.y, P2.z, ls, ux, uy, uz, lenU, vx, vy, vz, lenV, rx, ry, true);
    } else {
      ellipseSample(ls, ux, uy, uz, lenU * 0.5, vx, vy, vz, lenV * 0.5, rx, ry);
      ls.pdf = 4 / Math.PI / (lenU * lenV);
    }
    let dx = ls.P.x - P2.x, dy = ls.P.y - P2.y, dz = ls.P.z - P2.z;
    const t = Math.hypot(dx, dy, dz);
    if (t > 0) {
      dx /= t;
      dy /= t;
      dz /= t;
    }
    ls.D.x = dx;
    ls.D.y = dy;
    ls.D.z = dz;
    ls.t = t;
    ls.evalFac = f[L + LT.EVAL_FAC];
    if (invareaSigned < 0) {
      const cosPi = -(nx * dx + ny * dy + nz * dz);
      if (cosPi <= 0) return false;
      ls.pdf *= t * t / cosPi;
    }
    return ls.evalFac > 0 && ls.pdf > 0;
  }
  return false;
}
function triangleLightSample(kg, prim, rx, ry, P2, ls) {
  const f = kg.f32;
  const b = kg.triVerts + prim * TRI_VERTS_SIZE;
  const v0x = f[b], v0y = f[b + 1], v0z = f[b + 2];
  const v1x = f[b + 4], v1y = f[b + 5], v1z = f[b + 6];
  const v2x = f[b + 8], v2y = f[b + 9], v2z = f[b + 10];
  const e0x = v1x - v0x, e0y = v1y - v0y, e0z = v1z - v0z;
  const e1x = v2x - v0x, e1y = v2y - v0y, e1z = v2z - v0z;
  const e2x = v2x - v1x, e2y = v2y - v1y, e2z = v2z - v1z;
  const longestEdgeSq = Math.max(e0x * e0x + e0y * e0y + e0z * e0z, e1x * e1x + e1y * e1y + e1z * e1z, e2x * e2x + e2y * e2y + e2z * e2z);
  const N0x = e0y * e1z - e0z * e1y, N0y = e0z * e1x - e0x * e1z, N0z = e0x * e1y - e0y * e1x;
  const nn = N0x * N0x + N0y * N0y + N0z * N0z;
  const distanceToPlane = (N0x * (v0x - P2.x) + N0y * (v0y - P2.y) + N0z * (v0z - P2.z)) / nn;
  const Nl = Math.sqrt(nn);
  ls.Ng.x = N0x / Nl;
  ls.Ng.y = N0y / Nl;
  ls.Ng.z = N0z / Nl;
  const area = 0.5 * Nl;
  ls.evalFac = 1;
  ls.type = LIGHT_TRIANGLE;
  ls.prim = prim;
  ls.lamp = -1;
  ls.castShadow = true;
  if (longestEdgeSq > distanceToPlane * distanceToPlane) {
    let Ax = v0x - P2.x, Ay = v0y - P2.y, Az = v0z - P2.z;
    let l = Math.hypot(Ax, Ay, Az) || 1;
    Ax /= l;
    Ay /= l;
    Az /= l;
    let Bx = v1x - P2.x, By = v1y - P2.y, Bz = v1z - P2.z;
    l = Math.hypot(Bx, By, Bz) || 1;
    Bx /= l;
    By /= l;
    Bz /= l;
    let Cx = v2x - P2.x, Cy = v2y - P2.y, Cz = v2z - P2.z;
    l = Math.hypot(Cx, Cy, Cz) || 1;
    Cx /= l;
    Cy /= l;
    Cz /= l;
    const cosA = Bx * Cx + By * Cy + Bz * Cz;
    const cosB = Ax * Cx + Ay * Cy + Az * Cz;
    const cosC = Ax * Bx + Ay * By + Az * Bz;
    const bcx = By * Cz - Bz * Cy, bcy = Bz * Cx - Bx * Cz, bcz = Bx * Cy - By * Cx;
    const mixed = Math.abs(Ax * bcx + Ay * bcy + Az * bcz);
    const solidAngle = 2 * Math.atan2(mixed, 1 + cosA + cosB + cosC);
    let abx = Ay * Bz - Az * By, aby = Az * Bx - Ax * Bz, abz = Ax * By - Ay * Bx;
    l = Math.hypot(abx, aby, abz) || 1;
    abx /= l;
    aby /= l;
    abz /= l;
    let acx = Ay * Cz - Az * Cy, acy = Az * Cx - Ax * Cz, acz = Ax * Cy - Ay * Cx;
    l = Math.hypot(acx, acy, acz) || 1;
    acx /= l;
    acy /= l;
    acz /= l;
    const cosAlpha = abx * acx + aby * acy + abz * acz;
    const sinAlpha = safeSqrt(1 - cosAlpha * cosAlpha);
    const alpha = Math.acos(clamp(cosAlpha, -1, 1));
    const Ahat = rx * solidAngle;
    const sinPhi = Math.sin(Ahat - alpha);
    const cosPhi = Math.cos(Ahat - alpha);
    const uu = cosPhi - cosAlpha;
    const vv = sinPhi + sinAlpha * cosC;
    const num = (vv * cosPhi - uu * sinPhi) * cosAlpha - vv;
    const den = (vv * sinPhi + uu * cosPhi) * sinAlpha;
    const q = den === 0 ? 1 : num / den;
    let Ux = Cx - cosB * Ax, Uy = Cy - cosB * Ay, Uz = Cz - cosB * Az;
    l = Math.hypot(Ux, Uy, Uz);
    if (l > 0) {
      Ux /= l;
      Uy /= l;
      Uz /= l;
    } else {
      Ux = Uy = Uz = 0;
    }
    const sq = safeSqrt(1 - q * q);
    let C_x = q * Ax + sq * Ux, C_y = q * Ay + sq * Uy, C_z = q * Az + sq * Uz;
    l = Math.hypot(C_x, C_y, C_z) || 1;
    C_x /= l;
    C_y /= l;
    C_z /= l;
    const z = 1 - ry * (1 - (C_x * Bx + C_y * By + C_z * Bz));
    const dcb = C_x * Bx + C_y * By + C_z * Bz;
    let wx = C_x - dcb * Bx, wy = C_y - dcb * By, wz = C_z - dcb * Bz;
    l = Math.hypot(wx, wy, wz);
    if (l > 0) {
      wx /= l;
      wy /= l;
      wz /= l;
    } else {
      wx = wy = wz = 0;
    }
    const sz = safeSqrt(1 - z * z);
    ls.D.x = z * Bx + sz * wx;
    ls.D.y = z * By + sz * wy;
    ls.D.z = z * Bz + sz * wz;
    if (!rayTriangleIntersect(P2.x, P2.y, P2.z, ls.D.x, ls.D.y, ls.D.z, 0, 34e37, v0x, v0y, v0z, v1x, v1y, v1z, v2x, v2y, v2z, _uvt2)) return false;
    ls.t = _uvt2[2];
    ls.P.x = P2.x + ls.D.x * ls.t;
    ls.P.y = P2.y + ls.D.y * ls.t;
    ls.P.z = P2.z + ls.D.z * ls.t;
    if (solidAngle === 0) return false;
    ls.pdf = 1 / solidAngle;
  } else {
    if (area === 0) return false;
    let u = rx;
    let v = ry;
    if (v > u) {
      u *= 0.5;
      v -= u;
    } else {
      v *= 0.5;
      u -= v;
    }
    const t = 1 - u - v;
    ls.P.x = t * v0x + u * v1x + v * v2x;
    ls.P.y = t * v0y + u * v1y + v * v2y;
    ls.P.z = t * v0z + u * v1z + v * v2z;
    let dx = ls.P.x - P2.x, dy = ls.P.y - P2.y, dz = ls.P.z - P2.z;
    const len = Math.hypot(dx, dy, dz);
    dx /= len;
    dy /= len;
    dz /= len;
    ls.D.x = dx;
    ls.D.y = dy;
    ls.D.z = dz;
    ls.t = len;
    const cosPi = Math.abs(ls.Ng.x * dx + ls.Ng.y * dy + ls.Ng.z * dz);
    if (cosPi === 0) return false;
    ls.pdf = len * len / cosPi / area;
  }
  if (!kg.useLightTree) ls.pdf *= area * kg.pdfTriangles;
  const shader = kg.u32[kg.triInfo + prim * TRI_INFO_SIZE + TI.SHADER];
  const sh = kg.shaders + shader * SHADER_SIZE;
  ls.er = f[sh + SH.EMISSION];
  ls.eg = f[sh + SH.EMISSION + 1];
  ls.eb = f[sh + SH.EMISSION + 2];
  return ls.pdf > 0;
}
function triangleLightPdf(kg, prim, Ng, wi, P2, t) {
  const f = kg.f32;
  const b = kg.triVerts + prim * TRI_VERTS_SIZE;
  const v0x = f[b], v0y = f[b + 1], v0z = f[b + 2];
  const v1x = f[b + 4], v1y = f[b + 5], v1z = f[b + 6];
  const v2x = f[b + 8], v2y = f[b + 9], v2z = f[b + 10];
  const e0x = v1x - v0x, e0y = v1y - v0y, e0z = v1z - v0z;
  const e1x = v2x - v0x, e1y = v2y - v0y, e1z = v2z - v0z;
  const e2x = v2x - v1x, e2y = v2y - v1y, e2z = v2z - v1z;
  const longestEdgeSq = Math.max(e0x * e0x + e0y * e0y + e0z * e0z, e1x * e1x + e1y * e1y + e1z * e1z, e2x * e2x + e2y * e2y + e2z * e2z);
  const Nx = e0y * e1z - e0z * e1y, Ny = e0z * e1x - e0x * e1z, Nz = e0x * e1y - e0y * e1x;
  const nn = Nx * Nx + Ny * Ny + Nz * Nz;
  const distanceToPlane = Math.abs(Nx * wi.x * t + Ny * wi.y * t + Nz * wi.z * t) / nn;
  const area = 0.5 * Math.sqrt(nn);
  let pdf;
  if (longestEdgeSq > distanceToPlane * distanceToPlane) {
    const Px = P2.x + wi.x * t, Py = P2.y + wi.y * t, Pz = P2.z + wi.z * t;
    let Ax = v0x - Px, Ay = v0y - Py, Az = v0z - Pz;
    let l = Math.hypot(Ax, Ay, Az) || 1;
    Ax /= l;
    Ay /= l;
    Az /= l;
    let Bx = v1x - Px, By = v1y - Py, Bz = v1z - Pz;
    l = Math.hypot(Bx, By, Bz) || 1;
    Bx /= l;
    By /= l;
    Bz /= l;
    let Cx = v2x - Px, Cy = v2y - Py, Cz = v2z - Pz;
    l = Math.hypot(Cx, Cy, Cz) || 1;
    Cx /= l;
    Cy /= l;
    Cz /= l;
    const bcx = By * Cz - Bz * Cy, bcy = Bz * Cx - Bx * Cz, bcz = Bx * Cy - By * Cx;
    const solidAngle = 2 * Math.atan2(Math.abs(Ax * bcx + Ay * bcy + Az * bcz), 1 + (Bx * Cx + By * Cy + Bz * Cz) + (Ax * Cx + Ay * Cy + Az * Cz) + (Ax * Bx + Ay * By + Az * Bz));
    if (solidAngle === 0) return 0;
    pdf = 1 / solidAngle;
  } else {
    if (area === 0) return 0;
    const cosPi = Math.abs(Ng.x * wi.x + Ng.y * wi.y + Ng.z * wi.z);
    if (cosPi === 0) return 0;
    pdf = t * t / cosPi / area;
  }
  return kg.useLightTree ? pdf : pdf * area * kg.pdfTriangles;
}
var LightHit = class {
  t = Infinity;
  lamp = -1;
};
function lightsIntersect(kg, Px, Py, Pz, Dx, Dy, Dz, tmin, tmax, cameraRay, hit) {
  const f = kg.f32;
  const u = kg.u32;
  hit.lamp = -1;
  hit.t = tmax;
  for (let i = 0; i < kg.numHittableLights; i++) {
    const lamp = u[kg.hittableLights + i];
    const L = kg.lights + lamp * LIGHT_SIZE;
    const type = u[L + LT.TYPE];
    const flags = u[L + LT.FLAGS];
    if (cameraRay && !(flags & LightFlags.CAMERA_VISIBLE)) continue;
    if (!(flags & LightFlags.USE_MIS) && !cameraRay) continue;
    if (type === LightType.POINT || type === LightType.SPOT) {
      const t = raySphereIntersect(Px, Py, Pz, Dx, Dy, Dz, tmin, hit.t, f[L + LT.CO], f[L + LT.CO + 1], f[L + LT.CO + 2], f[L + LT.RADIUS]);
      if (t > 0) {
        hit.t = t;
        hit.lamp = lamp;
      }
    } else if (type === LightType.AREA) {
      const nx = f[L + LT.AREA_DIR], ny = f[L + LT.AREA_DIR + 1], nz = f[L + LT.AREA_DIR + 2];
      const dn = Dx * nx + Dy * ny + Dz * nz;
      if (dn >= 0) continue;
      const cx = f[L + LT.CO], cy = f[L + LT.CO + 1], cz = f[L + LT.CO + 2];
      const t = ((cx - Px) * nx + (cy - Py) * ny + (cz - Pz) * nz) / dn;
      if (!(t > tmin && t < hit.t)) continue;
      const hx = Px + Dx * t - cx, hy = Py + Dy * t - cy, hz = Pz + Dz * t - cz;
      const uu = (hx * f[L + LT.AXIS_U] + hy * f[L + LT.AXIS_U + 1] + hz * f[L + LT.AXIS_U + 2]) / f[L + LT.LEN_U];
      const vv = (hx * f[L + LT.AXIS_V] + hy * f[L + LT.AXIS_V + 1] + hz * f[L + LT.AXIS_V + 2]) / f[L + LT.LEN_V];
      const ellipse = f[L + LT.INVAREA] < 0;
      const inside = ellipse ? uu * uu + vv * vv <= 0.25 : Math.abs(uu) <= 0.5 && Math.abs(vv) <= 0.5;
      if (inside) {
        hit.t = t;
        hit.lamp = lamp;
      }
    }
  }
  return hit.lamp >= 0;
}
function lampEvalFromIntersection(kg, lamp, Px, Py, Pz, Dx, Dy, Dz, t, N, hadTransmission, out) {
  const f = kg.f32;
  const u = kg.u32;
  const L = kg.lights + lamp * LIGHT_SIZE;
  const type = u[L + LT.TYPE];
  let evalFac = f[L + LT.EVAL_FAC];
  let pdf = 0;
  if (type === LightType.POINT || type === LightType.SPOT) {
    const cx = f[L + LT.CO], cy = f[L + LT.CO + 1], cz = f[L + LT.CO + 2];
    const r = f[L + LT.RADIUS];
    const dSq = (Px - cx) ** 2 + (Py - cy) ** 2 + (Pz - cz) ** 2;
    const rSq = r * r;
    if (dSq > rSq) pdf = M_1_2PI / sinSqrToOneMinusCos(rSq / dSq);
    else pdf = hadTransmission ? M_1_2PI * 0.5 : Math.max(N.x * Dx + N.y * Dy + N.z * Dz, 0) / Math.PI;
    if (type === LightType.SPOT && dSq > rSq) {
      const hx = Px + Dx * t - cx, hy = Py + Dy * t - cy, hz = Pz + Dz * t - cz;
      void hx;
      void hy;
      void hz;
      const localZ = -(Dx * f[L + LT.SPOT_DIR] + Dy * f[L + LT.SPOT_DIR + 1] + Dz * f[L + LT.SPOT_DIR + 2]);
      evalFac *= smoothstep012((localZ - f[L + LT.COS_HALF_SPOT_ANGLE]) * f[L + LT.SPOT_SMOOTH]);
    }
  } else if (type === LightType.AREA) {
    const invareaSigned = f[L + LT.INVAREA];
    const nx = f[L + LT.AREA_DIR], ny = f[L + LT.AREA_DIR + 1], nz = f[L + LT.AREA_DIR + 2];
    if (invareaSigned > 0) {
      const ls = _lsScratch;
      ls.P.x = f[L + LT.CO];
      ls.P.y = f[L + LT.CO + 1];
      ls.P.z = f[L + LT.CO + 2];
      pdf = areaLightRectSample(Px, Py, Pz, ls, f[L + LT.AXIS_U], f[L + LT.AXIS_U + 1], f[L + LT.AXIS_U + 2], f[L + LT.LEN_U], f[L + LT.AXIS_V], f[L + LT.AXIS_V + 1], f[L + LT.AXIS_V + 2], f[L + LT.LEN_V], 0, 0, false);
    } else {
      const cosPi = -(nx * Dx + ny * Dy + nz * Dz);
      pdf = cosPi > 0 ? 4 / Math.PI / (f[L + LT.LEN_U] * f[L + LT.LEN_V]) * (t * t / cosPi) : 0;
    }
  } else if (type === LightType.SUN) {
    const angle = f[L + LT.SUN_ANGLE];
    if (angle === 0) return 0;
    const c = -(Dx * f[L + LT.CO] + Dy * f[L + LT.CO + 1] + Dz * f[L + LT.CO + 2]);
    if (Math.acos(clamp(c, -1, 1)) > angle) {
      out[0] = out[1] = out[2] = 0;
      return 0;
    }
    pdf = f[L + LT.SUN_PDF];
  }
  out[0] = f[L + LT.STRENGTH] * evalFac;
  out[1] = f[L + LT.STRENGTH + 1] * evalFac;
  out[2] = f[L + LT.STRENGTH + 2] * evalFac;
  return pdf;
}
var _lsScratch = new LightSample();

// src/util/hash.ts
function uintToFloatExcl(n) {
  return Math.fround((n >>> 0) * (1 / 4294967808));
}
function hashHpUint(i) {
  i >>>= 0;
  i ^= i >>> 16;
  i = Math.imul(i, 569420461);
  i ^= i >>> 15;
  i = Math.imul(i, 3545902487);
  i ^= i >>> 15;
  return (i ^ 3875421163) >>> 0;
}
function hashIqnt2d(x, y) {
  const qx = Math.imul(1103515245, (x >>> 1 ^ y) >>> 0);
  const qy = Math.imul(1103515245, (y >>> 1 ^ x) >>> 0);
  return Math.imul(1103515245, (qx ^ qy >>> 3) >>> 0) >>> 0;
}

// src/kernel/sample/sobol_burley.ts
var SOBOL_BURLEY_TABLE = new Uint32Array([
  // dimension 0
  1,
  2,
  4,
  8,
  16,
  32,
  64,
  128,
  256,
  512,
  1024,
  2048,
  4096,
  8192,
  16384,
  32768,
  65536,
  131072,
  262144,
  524288,
  1048576,
  2097152,
  4194304,
  8388608,
  16777216,
  33554432,
  67108864,
  134217728,
  268435456,
  536870912,
  1073741824,
  2147483648,
  // dimension 1
  1,
  3,
  5,
  15,
  17,
  51,
  85,
  255,
  257,
  771,
  1285,
  3855,
  4369,
  13107,
  21845,
  65535,
  65537,
  196611,
  327685,
  983055,
  1114129,
  3342387,
  5570645,
  16711935,
  16843009,
  50529027,
  84215045,
  252645135,
  286331153,
  858993459,
  1431655765,
  4294967295,
  // dimension 2
  1,
  3,
  6,
  9,
  23,
  58,
  113,
  163,
  278,
  825,
  1655,
  2474,
  5633,
  14595,
  30470,
  43529,
  65815,
  197434,
  394865,
  592291,
  1512982,
  3815737,
  7436151,
  10726058,
  18284545,
  54132739,
  108068870,
  161677321,
  370540567,
  960036922,
  2004287601,
  2863268003,
  // dimension 3
  1,
  3,
  4,
  10,
  31,
  46,
  69,
  201,
  283,
  676,
  1946,
  2919,
  4126,
  12333,
  16449,
  41155,
  127236,
  189066,
  284639,
  826286,
  1155333,
  2781833,
  7989211,
  11983780,
  16777498,
  50332327,
  67110814,
  167775085,
  520097793,
  771764227,
  1157644292,
  3372261386
]);
function reverseIntegerBits(x) {
  x >>>= 0;
  x = (x & 1431655765) << 1 | x >>> 1 & 1431655765;
  x = (x & 858993459) << 2 | x >>> 2 & 858993459;
  x = (x & 252645135) << 4 | x >>> 4 & 252645135;
  x = (x & 16711935) << 8 | x >>> 8 & 16711935;
  return (x << 16 | x >>> 16) >>> 0;
}
function reversedBitOwen(n, seed) {
  n >>>= 0;
  n = (n ^ Math.imul(n, 1025551850)) >>> 0;
  n = n + seed >>> 0;
  n = Math.imul(n, (seed >>> 16 | 1) >>> 0) >>> 0;
  n = (n ^ Math.imul(n, 89287766)) >>> 0;
  n = (n ^ Math.imul(n, 1403136100)) >>> 0;
  return n;
}
function sobolBurley(revBitIndex, dimension, scrambleSeed) {
  let result = 0;
  revBitIndex >>>= 0;
  if (dimension === 0) {
    result = reverseIntegerBits(revBitIndex);
  } else {
    let i = 0;
    const base = dimension * 32;
    while (revBitIndex !== 0) {
      const j = Math.clz32(revBitIndex);
      result = (result ^ SOBOL_BURLEY_TABLE[base + i + j]) >>> 0;
      i += j + 1;
      revBitIndex = revBitIndex << j >>> 0;
      revBitIndex = revBitIndex << 1 >>> 0;
    }
  }
  result = reverseIntegerBits(reversedBitOwen(result, scrambleSeed));
  return uintToFloatExcl(result);
}
function sobolBurleySample1D(index, dimension, seed, mask) {
  seed = (seed ^ hashHpUint(dimension)) >>> 0;
  index = reversedBitOwen(reverseIntegerBits(index), (seed ^ 3220790270) >>> 0);
  index = (index & mask) >>> 0;
  return sobolBurley(index, 0, (seed ^ 1667004349) >>> 0);
}
function sobolBurleySample2D(index, dimensionSet, seed, mask, out, o = 0) {
  seed = (seed ^ hashHpUint(dimensionSet)) >>> 0;
  index = reversedBitOwen(reverseIntegerBits(index), (seed ^ 4172147098) >>> 0);
  index = (index & mask) >>> 0;
  out[o] = sobolBurley(index, 0, (seed ^ 3769282422) >>> 0);
  out[o + 1] = sobolBurley(index, 1, (seed ^ 2492878158) >>> 0);
}
function sobolBurleySample3D(index, dimensionSet, seed, mask, out, o = 0) {
  seed = (seed ^ hashHpUint(dimensionSet)) >>> 0;
  index = reversedBitOwen(reverseIntegerBits(index), (seed ^ 3399952044) >>> 0);
  index = (index & mask) >>> 0;
  out[o] = sobolBurley(index, 0, (seed ^ 2658722705) >>> 0);
  out[o + 1] = sobolBurley(index, 1, (seed ^ 1740845633) >>> 0);
  out[o + 2] = sobolBurley(index, 2, (seed ^ 2026083781) >>> 0);
}

// src/kernel/sample/pattern.ts
var PRNG_FILTER = 0;
var PRNG_LENS_TIME = 1;
var PRNG_TERMINATE = 0;
var PRNG_LIGHT = 1;
var PRNG_SURFACE_BSDF = 3;
var PRNG_BOUNCE_NUM = 16;
function pathRngPixelInit(x, y, seed) {
  return (hashIqnt2d(x, y) ^ seed) >>> 0;
}
var PathRng = class {
  /** Sequence-length mask; see sobolIndexMask. */
  mask = 4294967295;
  rng1D(s, dimension) {
    return sobolBurleySample1D(s.sample, s.rngOffset + dimension, s.rngPixel, this.mask);
  }
  rng2D(s, dimension, out, o = 0) {
    sobolBurleySample2D(s.sample, s.rngOffset + dimension, s.rngPixel, this.mask, out, o);
  }
  rng3D(s, dimension, out, o = 0) {
    sobolBurleySample3D(s.sample, s.rngOffset + dimension, s.rngPixel, this.mask, out, o);
  }
};

// src/kernel/shader.ts
var ShaderData = class {
  P = f3();
  N = f3();
  Ng = f3();
  wi = f3();
  u = 0;
  v = 0;
  prim = -1;
  object = -1;
  shader = 0;
  triFlags = 0;
  runtimeFlag = 0;
  rayLength = 0;
  /** Texture coordinates. */
  tu = 0;
  tv = 0;
  numClosure = 0;
  closures = Array.from({ length: MAX_CLOSURE }, () => new Closure());
  /** Accumulated emission (Cycles closure_emission_background). */
  er = 0;
  eg = 0;
  eb = 0;
  /** Accumulated transparency (Cycles closure_transparent_extinction). */
  tr = 0;
  tg = 0;
  tb = 0;
  /** Shading normal before any normal map, used by the shadow terminator offset. */
  Nsmooth = f3();
};
var _rgba2 = new Float64Array(4);
var _alb2 = new Float64Array(3);
var _vN = f3();
var _T3 = f3();
var _Bt = f3();
function shaderSetupFromRay(kg, sd, ray, hit) {
  const f = kg.f32;
  const u32 = kg.u32;
  const prim = hit.prim;
  const tb = kg.triVerts + prim * TRI_VERTS_SIZE;
  const ti = kg.triInfo + prim * TRI_INFO_SIZE;
  sd.prim = prim;
  sd.u = hit.u;
  sd.v = hit.v;
  sd.shader = u32[ti + TI.SHADER];
  sd.object = u32[ti + TI.OBJECT];
  sd.triFlags = u32[ti + TI.FLAGS];
  sd.runtimeFlag = 0;
  sd.rayLength = hit.t;
  const w = 1 - hit.u - hit.v;
  const v0x = f[tb], v0y = f[tb + 1], v0z = f[tb + 2];
  const v1x = f[tb + 4], v1y = f[tb + 5], v1z = f[tb + 6];
  const v2x = f[tb + 8], v2y = f[tb + 9], v2z = f[tb + 10];
  sd.P.x = w * v0x + hit.u * v1x + hit.v * v2x;
  sd.P.y = w * v0y + hit.u * v1y + hit.v * v2y;
  sd.P.z = w * v0z + hit.u * v1z + hit.v * v2z;
  const e1x = v1x - v0x, e1y = v1y - v0y, e1z = v1z - v0z;
  const e2x = v2x - v0x, e2y = v2y - v0y, e2z = v2z - v0z;
  let ngx = e1y * e2z - e1z * e2y, ngy = e1z * e2x - e1x * e2z, ngz = e1x * e2y - e1y * e2x;
  const ngl = Math.hypot(ngx, ngy, ngz) || 1;
  ngx /= ngl;
  ngy /= ngl;
  ngz /= ngl;
  sd.Ng.x = ngx;
  sd.Ng.y = ngy;
  sd.Ng.z = ngz;
  const i0 = u32[ti + TI.V0], i1 = u32[ti + TI.V1], i2 = u32[ti + TI.V2];
  if (sd.triFlags & TriFlags.SMOOTH) {
    const vn = kg.vertNormals;
    let nx = w * f[vn + i0 * 4] + hit.u * f[vn + i1 * 4] + hit.v * f[vn + i2 * 4];
    let ny = w * f[vn + i0 * 4 + 1] + hit.u * f[vn + i1 * 4 + 1] + hit.v * f[vn + i2 * 4 + 1];
    let nz = w * f[vn + i0 * 4 + 2] + hit.u * f[vn + i1 * 4 + 2] + hit.v * f[vn + i2 * 4 + 2];
    const nl = Math.hypot(nx, ny, nz);
    if (nl > 0) {
      nx /= nl;
      ny /= nl;
      nz /= nl;
    } else {
      nx = ngx;
      ny = ngy;
      nz = ngz;
    }
    sd.N.x = nx;
    sd.N.y = ny;
    sd.N.z = nz;
  } else {
    sd.N.x = ngx;
    sd.N.y = ngy;
    sd.N.z = ngz;
  }
  if (sd.triFlags & TriFlags.HAS_UV) {
    const uv = kg.vertUVs;
    sd.tu = w * f[uv + i0 * 2] + hit.u * f[uv + i1 * 2] + hit.v * f[uv + i2 * 2];
    sd.tv = w * f[uv + i0 * 2 + 1] + hit.u * f[uv + i1 * 2 + 1] + hit.v * f[uv + i2 * 2 + 1];
  } else {
    sd.tu = 0;
    sd.tv = 0;
  }
  sd.wi.x = -ray.Dx;
  sd.wi.y = -ray.Dy;
  sd.wi.z = -ray.Dz;
  if (sd.Ng.x * sd.wi.x + sd.Ng.y * sd.wi.y + sd.Ng.z * sd.wi.z < 0) {
    sd.runtimeFlag |= SR_BACKFACING;
    sd.Ng.x = -sd.Ng.x;
    sd.Ng.y = -sd.Ng.y;
    sd.Ng.z = -sd.Ng.z;
    sd.N.x = -sd.N.x;
    sd.N.y = -sd.N.y;
    sd.N.z = -sd.N.z;
  }
  sd.Nsmooth.x = sd.N.x;
  sd.Nsmooth.y = sd.N.y;
  sd.Nsmooth.z = sd.N.z;
}
function bsdfAlloc(sd, wr, wg, wb) {
  wr = Math.max(wr, 0);
  wg = Math.max(wg, 0);
  wb = Math.max(wb, 0);
  const sampleWeight = Math.abs((wr + wg + wb) / 3);
  if (!(sampleWeight >= CLOSURE_WEIGHT_CUTOFF)) return null;
  if (sd.numClosure >= MAX_CLOSURE) return null;
  const c = sd.closures[sd.numClosure++];
  c.type = CLOSURE_NONE;
  c.wr = wr;
  c.wg = wg;
  c.wb = wb;
  c.sampleWeight = sampleWeight;
  c.energyScale = 1;
  c.ior = 1;
  c.alpha = c.alphaY = 0;
  c.T.x = c.T.y = c.T.z = 0;
  c.f0r = c.f0g = c.f0b = 0;
  c.f90r = c.f90g = c.f90b = 1;
  c.exponent = -1;
  c.tintRr = c.tintRg = c.tintRb = 1;
  c.tintTr = c.tintTg = c.tintTb = 0;
  c.br = c.bg = c.bb = 0;
  return c;
}
function diffuseSetup(sd, N, wr, wg, wb) {
  const c = bsdfAlloc(sd, wr, wg, wb);
  if (!c) return;
  c.N.x = N.x;
  c.N.y = N.y;
  c.N.z = N.z;
  c.type = CLOSURE_BSDF_DIFFUSE;
  sd.runtimeFlag |= SR_BSDF | SR_BSDF_HAS_EVAL;
}
function transparentSetup(sd, wr, wg, wb) {
  const sampleWeight = Math.abs((wr + wg + wb) / 3);
  if (!(sampleWeight >= CLOSURE_WEIGHT_CUTOFF)) return;
  sd.tr += wr;
  sd.tg += wg;
  sd.tb += wb;
  if (sd.runtimeFlag & SR_TRANSPARENT) {
    for (let i = 0; i < sd.numClosure; i++) {
      const c2 = sd.closures[i];
      if (c2.type === CLOSURE_BSDF_TRANSPARENT) {
        c2.wr += wr;
        c2.wg += wg;
        c2.wb += wb;
        c2.sampleWeight += sampleWeight;
        return;
      }
    }
    return;
  }
  sd.runtimeFlag |= SR_BSDF | SR_TRANSPARENT;
  if (sd.numClosure >= MAX_CLOSURE) return;
  const c = sd.closures[sd.numClosure++];
  c.type = CLOSURE_BSDF_TRANSPARENT;
  c.wr = wr;
  c.wg = wg;
  c.wb = wb;
  c.sampleWeight = sampleWeight;
  c.N.x = sd.N.x;
  c.N.y = sd.N.y;
  c.N.z = sd.N.z;
}
function emissionSetup(sd, r, g, b) {
  if (sd.runtimeFlag & SR_EMISSION) {
    sd.er += r;
    sd.eg += g;
    sd.eb += b;
  } else {
    sd.runtimeFlag |= SR_EMISSION;
    sd.er = r;
    sd.eg = g;
    sd.eb = b;
  }
}
function validReflectionN(sd, N, out) {
  if (N.x === sd.Ng.x && N.y === sd.Ng.y && N.z === sd.Ng.z) {
    out.x = N.x;
    out.y = N.y;
    out.z = N.z;
    return out;
  }
  return ensureValidSpecularReflection(sd.Ng, sd.wi, N, out);
}
function uvTangentFrame(kg, sd, N, T, B) {
  if (!(sd.triFlags & TriFlags.HAS_UV)) return false;
  const f = kg.f32;
  const u32 = kg.u32;
  const prim = sd.prim;
  const ti = kg.triInfo + prim * TRI_INFO_SIZE;
  const tb = kg.triVerts + prim * TRI_VERTS_SIZE;
  const uv = kg.vertUVs;
  const i0 = u32[ti + TI.V0], i1 = u32[ti + TI.V1], i2 = u32[ti + TI.V2];
  const du1 = f[uv + i1 * 2] - f[uv + i0 * 2], dv1 = f[uv + i1 * 2 + 1] - f[uv + i0 * 2 + 1];
  const du2 = f[uv + i2 * 2] - f[uv + i0 * 2], dv2 = f[uv + i2 * 2 + 1] - f[uv + i0 * 2 + 1];
  const det = du1 * dv2 - du2 * dv1;
  if (det === 0) return false;
  const r = 1 / det;
  const p1x = f[tb + 4] - f[tb], p1y = f[tb + 5] - f[tb + 1], p1z = f[tb + 6] - f[tb + 2];
  const p2x = f[tb + 8] - f[tb], p2y = f[tb + 9] - f[tb + 1], p2z = f[tb + 10] - f[tb + 2];
  let tx = (p1x * dv2 - p2x * dv1) * r, ty = (p1y * dv2 - p2y * dv1) * r, tz = (p1z * dv2 - p2z * dv1) * r;
  const bx = (p2x * du1 - p1x * du2) * r, by = (p2y * du1 - p1y * du2) * r, bz = (p2z * du1 - p1z * du2) * r;
  const dTN = tx * N.x + ty * N.y + tz * N.z;
  tx -= dTN * N.x;
  ty -= dTN * N.y;
  tz -= dTN * N.z;
  const tl = Math.hypot(tx, ty, tz);
  if (tl === 0) return false;
  T.x = tx / tl;
  T.y = ty / tl;
  T.z = tz / tl;
  B.x = N.y * T.z - N.z * T.y;
  B.y = N.z * T.x - N.x * T.z;
  B.z = N.x * T.y - N.y * T.x;
  if (B.x * bx + B.y * by + B.z * bz < 0) {
    B.x = -B.x;
    B.y = -B.y;
    B.z = -B.z;
  }
  return true;
}
function normalMap(kg, sd, tex, scale, base, out) {
  if (!uvTangentFrame(kg, sd, base, _T3, _Bt)) return false;
  textureLookup(kg, tex, sd.tu, sd.tv, _rgba2);
  const mx = (_rgba2[0] * 2 - 1) * scale;
  const my = (_rgba2[1] * 2 - 1) * scale;
  const mz = _rgba2[2] * 2 - 1;
  let nx = mx * _T3.x + my * _Bt.x + mz * base.x;
  let ny = mx * _T3.y + my * _Bt.y + mz * base.y;
  let nz = mx * _T3.z + my * _Bt.z + mz * base.z;
  const nl = Math.hypot(nx, ny, nz);
  if (nl === 0) return false;
  out.x = nx / nl;
  out.y = ny / nl;
  out.z = nz / nl;
  return true;
}
function rotateAroundAxis(p, axis, angle) {
  const c = Math.cos(angle), s = Math.sin(angle), k = 1 - c;
  const ax = axis.x, ay = axis.y, az = axis.z;
  const px = p.x, py = p.y, pz = p.z;
  p.x = (c + k * ax * ax) * px + (k * ax * ay - az * s) * py + (k * ax * az + ay * s) * pz;
  p.y = (k * ax * ay + az * s) * px + (c + k * ay * ay) * py + (k * ay * az - ax * s) * pz;
  p.z = (k * ax * az - ay * s) * px + (k * ay * az + ax * s) * py + (c + k * az * az) * pz;
}
var _coatN = f3();
var _sheenN = f3();
var _tan = f3();
var _tanB = f3();
var _Nr = f3();
function evalSurfaceShader(kg, sd) {
  const f = kg.f32;
  const u32 = kg.u32;
  const sh = kg.shaders + sd.shader * SHADER_SIZE;
  sd.numClosure = 0;
  sd.er = sd.eg = sd.eb = 0;
  sd.tr = sd.tg = sd.tb = 0;
  const type = u32[sh + SH.TYPE];
  const backfacing = (sd.runtimeFlag & SR_BACKFACING) !== 0;
  switch (type) {
    case ShaderType.PRINCIPLED: {
      let br = f[sh + SH.BASE_COLOR], bg = f[sh + SH.BASE_COLOR + 1], bb = f[sh + SH.BASE_COLOR + 2];
      let alpha = f[sh + SH.ALPHA];
      const bct = u32[sh + SH.BASE_COLOR_TEX];
      if (bct !== NONE) {
        textureLookup(kg, bct, sd.tu, sd.tv, _rgba2);
        br *= _rgba2[0];
        bg *= _rgba2[1];
        bb *= _rgba2[2];
        alpha *= _rgba2[3];
      }
      const at = u32[sh + SH.ALPHA_TEX];
      if (at !== NONE) {
        textureLookup(kg, at, sd.tu, sd.tv, _rgba2);
        alpha *= _rgba2[3];
      }
      let metallic = f[sh + SH.METALLIC];
      let roughness = f[sh + SH.ROUGHNESS];
      const mrt = u32[sh + SH.METALLIC_ROUGHNESS_TEX];
      if (mrt !== NONE) {
        textureLookup(kg, mrt, sd.tu, sd.tv, _rgba2);
        roughness *= _rgba2[1];
        metallic *= _rgba2[2];
      }
      let transmission = f[sh + SH.TRANSMISSION];
      const tt = u32[sh + SH.TRANSMISSION_TEX];
      if (tt !== NONE) {
        textureLookup(kg, tt, sd.tu, sd.tv, _rgba2);
        transmission *= _rgba2[0];
      }
      const nt = u32[sh + SH.NORMAL_TEX];
      if (nt !== NONE) normalMap(kg, sd, nt, f[sh + SH.NORMAL_SCALE], sd.Nsmooth, sd.N);
      const N = sd.N;
      let wr = 1, wg = 1, wb = 1;
      alpha = Math.min(Math.max(alpha, 0), 1);
      if (alpha < 1) {
        transparentSetup(sd, 1 - alpha, 1 - alpha, 1 - alpha);
        wr *= alpha;
        wg *= alpha;
        wb *= alpha;
      }
      let coatWeight = Math.max(f[sh + SH.COAT_WEIGHT], 0);
      const sheenWeight = Math.max(f[sh + SH.SHEEN_WEIGHT], 0);
      if (coatWeight > 0) {
        const cwt = u32[sh + SH.COAT_WEIGHT_TEX];
        if (cwt !== NONE) {
          textureLookup(kg, cwt, sd.tu, sd.tv, _rgba2);
          coatWeight *= _rgba2[0];
        }
      }
      if (sheenWeight > CLOSURE_WEIGHT_CUTOFF || coatWeight > CLOSURE_WEIGHT_CUTOFF) {
        const cnt = u32[sh + SH.COAT_NORMAL_TEX];
        const geometric = (u32[sh + SH.FLAGS] & ShaderFlags.COAT_GEOMETRY_NORMAL) !== 0;
        const cbase = geometric ? sd.Nsmooth : N;
        _coatN.x = cbase.x;
        _coatN.y = cbase.y;
        _coatN.z = cbase.z;
        if (cnt !== NONE) normalMap(kg, sd, cnt, f[sh + SH.COAT_NORMAL_SCALE], sd.Nsmooth, _coatN);
      }
      if (sheenWeight > CLOSURE_WEIGHT_CUTOFF) {
        let tr = Math.max(f[sh + SH.SHEEN_TINT], 0), tg = Math.max(f[sh + SH.SHEEN_TINT + 1], 0), tbl = Math.max(f[sh + SH.SHEEN_TINT + 2], 0);
        const stt = u32[sh + SH.SHEEN_TINT_TEX];
        if (stt !== NONE) {
          textureLookup(kg, stt, sd.tu, sd.tv, _rgba2);
          tr *= _rgba2[0];
          tg *= _rgba2[1];
          tbl *= _rgba2[2];
        }
        let sheenRough = f[sh + SH.SHEEN_ROUGHNESS];
        const srt = u32[sh + SH.SHEEN_ROUGHNESS_TEX];
        if (srt !== NONE) {
          textureLookup(kg, srt, sd.tu, sd.tv, _rgba2);
          sheenRough *= _rgba2[3];
        }
        sheenRough = Math.min(Math.max(sheenRough, 0), 1);
        const m = Math.min(Math.max(coatWeight, 0), 1);
        let snx = N.x + (_coatN.x - N.x) * m, sny = N.y + (_coatN.y - N.y) * m, snz = N.z + (_coatN.z - N.z) * m;
        const snl = Math.hypot(snx, sny, snz);
        if (snl > 0) {
          snx /= snl;
          sny /= snl;
          snz /= snl;
        } else {
          snx = sny = snz = 0;
        }
        _sheenN.x = snx;
        _sheenN.y = sny;
        _sheenN.z = snz;
        const c = bsdfAlloc(sd, sheenWeight * tr * wr, sheenWeight * tg * wg, sheenWeight * tbl * wb);
        if (c) {
          c.N.x = snx;
          c.N.y = sny;
          c.N.z = snz;
          const albedo = setupSheen(kg, c, sd.wi, sheenRough);
          if (c.type !== CLOSURE_NONE) sd.runtimeFlag |= SR_BSDF | SR_BSDF_HAS_EVAL;
          wr = Math.min(Math.max(wr - albedo, 0), wr);
          wg = Math.min(Math.max(wg - albedo, 0), wg);
          wb = Math.min(Math.max(wb - albedo, 0), wb);
        }
      }
      if (coatWeight > CLOSURE_WEIGHT_CUTOFF) {
        let ctr = Math.max(f[sh + SH.COAT_TINT], 0), ctg = Math.max(f[sh + SH.COAT_TINT + 1], 0), ctb = Math.max(f[sh + SH.COAT_TINT + 2], 0);
        const coatIor = Math.max(f[sh + SH.COAT_IOR], 1);
        let coatRough = f[sh + SH.COAT_ROUGHNESS];
        const crt = u32[sh + SH.COAT_ROUGHNESS_TEX];
        if (crt !== NONE) {
          textureLookup(kg, crt, sd.tu, sd.tv, _rgba2);
          coatRough *= _rgba2[1];
        }
        coatRough = Math.min(Math.max(coatRough, 0), 1);
        const cN = validReflectionN(sd, _coatN, _Nr);
        if (!(ctr === 1 && ctg === 1 && ctb === 1)) {
          const cosNI = sd.wi.x * cN.x + sd.wi.y * cN.y + sd.wi.z * cN.z;
          const depth = coatIor / Math.sqrt(coatIor * coatIor - (1 - cosNI * cosNI));
          ctr = Math.pow(ctr, depth);
          ctg = Math.pow(ctg, depth);
          ctb = Math.pow(ctb, depth);
        }
        const cwr = coatWeight * wr, cwg = coatWeight * wg, cwb = coatWeight * wb;
        _alb2[0] = _alb2[1] = _alb2[2] = 0;
        const c = bsdfAlloc(sd, cwr, cwg, cwb);
        if (c) {
          c.N.x = cN.x;
          c.N.y = cN.y;
          c.N.z = cN.z;
          c.ior = coatIor;
          c.alpha = c.alphaY = coatRough * coatRough;
          sd.runtimeFlag |= setupGgx(c);
          setupFresnelDielectric(kg, c, sd.wi);
          microfacetAlbedo(kg, sd.wi, c, true, false, _alb2);
        }
        const lr = (1 - ctr * (1 - _alb2[0])) * cwr, lg = (1 - ctg * (1 - _alb2[1])) * cwg, lb = (1 - ctb * (1 - _alb2[2])) * cwb;
        wr = Math.min(Math.max(wr - lr, 0), wr);
        wg = Math.min(Math.max(wg - lg, 0), wg);
        wb = Math.min(Math.max(wb - lb, 0), wb);
      }
      let emr = f[sh + SH.EMISSION], emg = f[sh + SH.EMISSION + 1], emb = f[sh + SH.EMISSION + 2];
      const et = u32[sh + SH.EMISSION_TEX];
      if (et !== NONE && (emr > 0 || emg > 0 || emb > 0)) {
        textureLookup(kg, et, sd.tu, sd.tv, _rgba2);
        emr *= _rgba2[0];
        emg *= _rgba2[1];
        emb *= _rgba2[2];
      }
      if (emr !== 0 || emg !== 0 || emb !== 0) emissionSetup(sd, emr * wr, emg * wg, emb * wb);
      br = Math.max(br, 0);
      bg = Math.max(bg, 0);
      bb = Math.max(bb, 0);
      const cbr = Math.min(br, 1), cbg = Math.min(bg, 1), cbb = Math.min(bb, 1);
      const ior = Math.max(f[sh + SH.IOR], 1e-5);
      roughness = Math.min(Math.max(roughness, 0), 1);
      const alphaR = roughness * roughness;
      const str = Math.max(f[sh + SH.SPECULAR_TINT], 0), stg = Math.max(f[sh + SH.SPECULAR_TINT + 1], 0), stb = Math.max(f[sh + SH.SPECULAR_TINT + 2], 0);
      const vN = validReflectionN(sd, N, _Nr);
      const anisotropic = Math.min(Math.max(f[sh + SH.ANISOTROPIC], 0), 1);
      let alphaX = alphaR, alphaY = alphaR;
      _tan.x = _tan.y = _tan.z = 0;
      if (anisotropic > 0 && uvTangentFrame(kg, sd, sd.Nsmooth, _tan, _tanB)) {
        const aspect = Math.sqrt(1 - anisotropic * 0.9);
        alphaX /= aspect;
        alphaY *= aspect;
        const rot = f[sh + SH.ANISOTROPIC_ROTATION];
        if (rot !== 0) rotateAroundAxis(_tan, N, rot * M_2PI);
      }
      metallic = Math.min(Math.max(metallic, 0), 1);
      if (metallic > CLOSURE_WEIGHT_CUTOFF) {
        const c = bsdfAlloc(sd, metallic * wr, metallic * wg, metallic * wb);
        if (c) {
          c.N.x = vN.x;
          c.N.y = vN.y;
          c.N.z = vN.z;
          c.ior = 1;
          c.alpha = alphaX;
          c.alphaY = alphaY;
          c.T.x = _tan.x;
          c.T.y = _tan.y;
          c.T.z = _tan.z;
          c.f0r = cbr;
          c.f0g = cbg;
          c.f0b = cbb;
          sd.runtimeFlag |= setupGgx(c);
          setupFresnelF82Tint(kg, c, sd.wi, Math.min(str, 1), Math.min(stg, 1), Math.min(stb, 1), true);
        }
        wr *= 1 - metallic;
        wg *= 1 - metallic;
        wb *= 1 - metallic;
      }
      transmission = Math.min(Math.max(transmission, 0), 1);
      if (transmission > CLOSURE_WEIGHT_CUTOFF) {
        const c = bsdfAlloc(sd, transmission * wr, transmission * wg, transmission * wb);
        if (c) {
          c.N.x = vN.x;
          c.N.y = vN.y;
          c.N.z = vN.z;
          c.alpha = alphaX;
          c.alphaY = alphaY;
          c.T.x = _tan.x;
          c.T.y = _tan.y;
          c.T.z = _tan.z;
          c.ior = backfacing ? 1 / ior : ior;
          c.tintRr = c.tintRg = c.tintRb = 1;
          c.tintTr = Math.sqrt(cbr);
          c.tintTg = Math.sqrt(cbg);
          c.tintTb = Math.sqrt(cbb);
          const F0 = F0FromIor(ior);
          c.f0r = F0 * str;
          c.f0g = F0 * stg;
          c.f0b = F0 * stb;
          c.f90r = c.f90g = c.f90b = 1;
          c.exponent = -ior;
          sd.runtimeFlag |= setupGgxGlass(c);
          setupFresnelGeneralizedSchlick(kg, c, sd.wi, true);
        }
        wr *= 1 - transmission;
        wg *= 1 - transmission;
        wb *= 1 - transmission;
      }
      const level = Math.max(f[sh + SH.SPECULAR_IOR_LEVEL], 0);
      let eta = ior;
      let f0 = F0FromIor(eta);
      if (level !== 0.5) {
        f0 *= 2 * level;
        eta = iorFromF0(f0);
        if (ior < 1) eta = 1 / eta;
      }
      if (eta !== 1) {
        const c = bsdfAlloc(sd, wr, wg, wb);
        if (c) {
          c.N.x = vN.x;
          c.N.y = vN.y;
          c.N.z = vN.z;
          c.ior = eta;
          c.alpha = alphaX;
          c.alphaY = alphaY;
          c.T.x = _tan.x;
          c.T.y = _tan.y;
          c.T.z = _tan.z;
          c.f0r = f0 * str;
          c.f0g = f0 * stg;
          c.f0b = f0 * stb;
          c.f90r = c.f90g = c.f90b = 1;
          c.exponent = -eta;
          c.tintRr = c.tintRg = c.tintRb = 1;
          c.tintTr = c.tintTg = c.tintTb = 0;
          sd.runtimeFlag |= setupGgx(c);
          setupFresnelGeneralizedSchlick(kg, c, sd.wi, true);
          closureLayerAlbedo(kg, sd.wi, c, _alb2);
          wr = Math.min(Math.max(wr - _alb2[0], 0), wr);
          wg = Math.min(Math.max(wg - _alb2[1], 0), wg);
          wb = Math.min(Math.max(wb - _alb2[2], 0), wb);
        }
      }
      diffuseSetup(sd, N, br * wr, bg * wg, bb * wb);
      break;
    }
    case ShaderType.DIFFUSE: {
      let r = f[sh + SH.BASE_COLOR], g = f[sh + SH.BASE_COLOR + 1], b = f[sh + SH.BASE_COLOR + 2];
      const t = u32[sh + SH.BASE_COLOR_TEX];
      if (t !== NONE) {
        textureLookup(kg, t, sd.tu, sd.tv, _rgba2);
        r *= _rgba2[0];
        g *= _rgba2[1];
        b *= _rgba2[2];
      }
      diffuseSetup(sd, sd.N, r, g, b);
      break;
    }
    case ShaderType.GLOSSY: {
      const r = f[sh + SH.BASE_COLOR], g = f[sh + SH.BASE_COLOR + 1], b = f[sh + SH.BASE_COLOR + 2];
      const c = bsdfAlloc(sd, r, g, b);
      if (c) {
        const rough = Math.min(Math.max(f[sh + SH.ROUGHNESS], 0), 1);
        const vN = validReflectionN(sd, sd.N, _Nr);
        c.N.x = vN.x;
        c.N.y = vN.y;
        c.N.z = vN.z;
        c.ior = 1;
        c.alpha = c.alphaY = rough * rough;
        sd.runtimeFlag |= setupGgx(c);
        setupFresnelConstant(kg, c, sd.wi, Math.max(r, 0), Math.max(g, 0), Math.max(b, 0));
      }
      break;
    }
    case ShaderType.GLASS: {
      const c = bsdfAlloc(sd, 1, 1, 1);
      if (c) {
        const vN = validReflectionN(sd, sd.N, _Nr);
        c.N.x = vN.x;
        c.N.y = vN.y;
        c.N.z = vN.z;
        const rough = Math.min(Math.max(f[sh + SH.ROUGHNESS], 0), 1);
        c.alpha = c.alphaY = rough * rough;
        const ior = Math.max(f[sh + SH.IOR], 1e-5);
        c.ior = backfacing ? 1 / ior : ior;
        const F0 = F0FromIor(ior);
        c.f0r = c.f0g = c.f0b = F0;
        c.f90r = c.f90g = c.f90b = 1;
        c.exponent = -ior;
        const r = Math.max(f[sh + SH.BASE_COLOR], 0), g = Math.max(f[sh + SH.BASE_COLOR + 1], 0), b = Math.max(f[sh + SH.BASE_COLOR + 2], 0);
        c.tintRr = r;
        c.tintRg = g;
        c.tintRb = b;
        c.tintTr = r;
        c.tintTg = g;
        c.tintTb = b;
        sd.runtimeFlag |= setupGgxGlass(c);
        setupFresnelGeneralizedSchlick(kg, c, sd.wi, true);
      }
      break;
    }
    case ShaderType.EMISSION:
      emissionSetup(sd, f[sh + SH.EMISSION], f[sh + SH.EMISSION + 1], f[sh + SH.EMISSION + 2]);
      break;
    case ShaderType.TRANSPARENT:
      transparentSetup(sd, f[sh + SH.BASE_COLOR], f[sh + SH.BASE_COLOR + 1], f[sh + SH.BASE_COLOR + 2]);
      break;
  }
}
function surfaceShaderEmission(sd, out) {
  if (sd.runtimeFlag & SR_EMISSION) {
    const cosNI = Math.abs(sd.Ng.x * sd.wi.x + sd.Ng.y * sd.wi.y + sd.Ng.z * sd.wi.z);
    const k = cosNI > 0 ? 1 : 0;
    out[0] = sd.er * k;
    out[1] = sd.eg * k;
    out[2] = sd.eb * k;
  } else {
    out[0] = out[1] = out[2] = 0;
  }
}
function shaderTransparency(sd, out) {
  if (sd.runtimeFlag & SR_TRANSPARENT) {
    out[0] = sd.tr;
    out[1] = sd.tg;
    out[2] = sd.tb;
  } else {
    out[0] = out[1] = out[2] = 0;
  }
}
function shaderHasTransparency(kg, shader) {
  const sh = kg.shaders + shader * SHADER_SIZE;
  const t = kg.u32[sh + SH.TYPE];
  if (t === ShaderType.TRANSPARENT) return true;
  if (t === ShaderType.PRINCIPLED) return (kg.u32[sh + SH.FLAGS] & 4) !== 0;
  return false;
}

// src/kernel/integrator.ts
var PATH_RAY_CAMERA = 1 << 0;
var PATH_RAY_REFLECT = 1 << 1;
var PATH_RAY_TRANSMIT = 1 << 2;
var PATH_RAY_DIFFUSE = 1 << 3;
var PATH_RAY_GLOSSY = 1 << 4;
var PATH_RAY_SINGULAR = 1 << 5;
var PATH_RAY_TRANSPARENT = 1 << 6;
var PATH_RAY_MIS_SKIP = 1 << 7;
var PATH_RAY_MIS_HAD_TRANSMISSION = 1 << 8;
var PATH_RAY_TERMINATE_ON_NEXT_SURFACE = 1 << 9;
var PATH_RAY_TERMINATE_AFTER_TRANSPARENT = 1 << 10;
var PATH_RAY_TRANSPARENT_BACKGROUND = 1 << 11;
var PATH_RAY_DIFFUSE_ANCESTOR = 1 << 12;
var PATH_RAY_DENOISING_FEATURES = 1 << 13;
var EXT_STRIDE = 12;
var EXT = { AUX: 0, COUNT: 3, ALBEDO: 4, FLAG: 7, NORMAL: 8 };
function sampleIsClassA(sample) {
  let v = (sample & 2863311530) >>> 0;
  v = v - (v >>> 1 & 1431655765);
  v = (v & 858993459) + (v >>> 2 & 858993459);
  return ((v + (v >>> 4) & 252645135) * 16843009 >>> 24) % 2 === 1;
}
function smoothstep(e0, e1, x) {
  const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1);
  return t * t * (3 - 2 * t);
}
var PATH_RAY_TERMINATE = PATH_RAY_TERMINATE_ON_NEXT_SURFACE | PATH_RAY_TERMINATE_AFTER_TRANSPARENT;
function readParams(params) {
  const f = new Float32Array(params.buffer, params.byteOffset, params.length);
  const cam = new Float64Array(12);
  for (let i = 0; i < 12; i++) cam[i] = f[P.CAM_TO_WORLD + i];
  const clamp2 = (v) => v > 0 ? v : Infinity;
  return {
    width: params[P.WIDTH],
    height: params[P.HEIGHT],
    seed: params[P.SEED],
    sobolMask: params[P.SOBOL_MASK],
    maxBounce: params[P.MAX_BOUNCE],
    maxDiffuse: params[P.MAX_DIFFUSE],
    maxGlossy: params[P.MAX_GLOSSY],
    maxTransmission: params[P.MAX_TRANSMISSION],
    maxTransparent: params[P.MAX_TRANSPARENT],
    minBounce: params[P.MIN_BOUNCE],
    clampDirect: clamp2(f[P.CLAMP_DIRECT]),
    clampIndirect: clamp2(f[P.CLAMP_INDIRECT]),
    filterGlossy: f[P.FILTER_GLOSSY],
    denoisingFeatures: params[P.DENOISING_FEATURES] !== 0,
    camToWorld: cam,
    tanHalfFov: f[P.CAM_TAN_HALF_FOV],
    aspect: f[P.CAM_ASPECT],
    aperture: f[P.CAM_APERTURE],
    focusDistance: f[P.CAM_FOCUS],
    backgroundCameraVisible: params[P.BG_CAMERA_VISIBLE] !== 0
  };
}
var PathState = class {
  rngPixel = 0;
  rngOffset = 0;
  sample = 0;
  flag = 0;
  bounce = 0;
  diffuseBounce = 0;
  glossyBounce = 0;
  transmissionBounce = 0;
  transparentBounce = 0;
  tr = 1;
  tg = 1;
  tb = 1;
  misRayPdf = 0;
  minRayPdf = Infinity;
  misOriginN = f3();
  continuationProbability = 1;
  /** Whether the path is still a camera ray (Cycles PATH_RAY_VISIBILITY_CAMERA). */
  cameraVisible = true;
};
var _f32 = new Float32Array(1);
var _i32 = new Int32Array(_f32.buffer);
function offsetComponent(p, n) {
  if (Math.abs(p) < 1 / 32) return p + n / 65536;
  _f32[0] = p;
  const ofi = Math.trunc(256 * n);
  _i32[0] += p < 0 ? -ofi : ofi;
  return _f32[0];
}
var Integrator = class {
  kg;
  p;
  rng = new PathRng();
  state = new PathState();
  ray = makeRay();
  hit = makeHit();
  shadowRay = makeRay();
  shadowHit = makeHit();
  sd = new ShaderData();
  shadowSd = new ShaderData();
  ls = new LightSample();
  lightHit = new LightHit();
  evalRes = new BsdfEvalResult();
  r2 = new Float64Array(2);
  r3 = new Float64Array(3);
  rgb = new Float64Array(3);
  rgb2 = new Float64Array(3);
  wo = f3();
  /** Denoising features of the current sample (albedo and camera-space normal) and the feature throughput of the path. */
  featAlbedo = new Float64Array(3);
  featNormal = new Float64Array(3);
  featT = new Float64Array(3);
  albTmp = new Float64Array(3);
  /** Origin of the current ray, for light tree pdfs. */
  rayP = f3();
  tmpV = f3();
  /** Radiance of the current sample. */
  Lr = 0;
  Lg = 0;
  Lb = 0;
  alpha = 0;
  // BsdfEval accumulator for MIS over closures.
  er = 0;
  eg = 0;
  eb = 0;
  constructor(kg, params) {
    this.kg = kg;
    this.p = params;
    this.rng.mask = params.sobolMask;
  }
  /**
   * Render samples [sampleStart, sampleStart + sampleCount) for the pixels of a tile and add them into `out` (RGBA per pixel, tile-local, row-major).
   */
  /**
   * Renders samples [sampleStart, sampleStart + sampleCount) of a tile, adding linear RGBA sums into out. With ext (EXT_STRIDE floats per pixel) it also adds the adaptive sampling aux buffer (twice the class A samples, as film_write_adaptive_buffer), the number of samples taken, and, when denoising features are on, the albedo and normal passes. Pixels whose converged flag is set are skipped, as film_need_sample_pixel skips them.
   */
  renderTile(x0, y0, w, h, sampleStart, sampleCount, out, ext, converged) {
    const rgba = new Float64Array(4);
    for (let ty = 0; ty < h; ty++) {
      for (let tx = 0; tx < w; tx++) {
        const i = ty * w + tx;
        if (converged && converged[i]) continue;
        let r = 0, g = 0, b = 0, a = 0;
        let ar = 0, ag = 0, ab = 0;
        let alr = 0, alg = 0, alb = 0, nx = 0, ny = 0, nz = 0;
        for (let s = sampleStart; s < sampleStart + sampleCount; s++) {
          this.tracePixelSample(x0 + tx, y0 + ty, s, rgba);
          r += rgba[0];
          g += rgba[1];
          b += rgba[2];
          a += rgba[3];
          if (ext) {
            if (sampleIsClassA(s)) {
              ar += 2 * rgba[0];
              ag += 2 * rgba[1];
              ab += 2 * rgba[2];
            }
            alr += this.featAlbedo[0];
            alg += this.featAlbedo[1];
            alb += this.featAlbedo[2];
            nx += this.featNormal[0];
            ny += this.featNormal[1];
            nz += this.featNormal[2];
          }
        }
        const o = i * 4;
        out[o] += r;
        out[o + 1] += g;
        out[o + 2] += b;
        out[o + 3] += a;
        if (ext) {
          const e = i * EXT_STRIDE;
          ext[e + EXT.AUX] += ar;
          ext[e + EXT.AUX + 1] += ag;
          ext[e + EXT.AUX + 2] += ab;
          ext[e + EXT.COUNT] += sampleCount;
          ext[e + EXT.ALBEDO] += alr;
          ext[e + EXT.ALBEDO + 1] += alg;
          ext[e + EXT.ALBEDO + 2] += alb;
          ext[e + EXT.NORMAL] += nx;
          ext[e + EXT.NORMAL + 1] += ny;
          ext[e + EXT.NORMAL + 2] += nz;
        }
      }
    }
  }
  /** film_write_denoising_features_surface with Cycles' default options (follow reflections, albedo roughness weighting). */
  writeDenoisingFeatures() {
    const st = this.state;
    const sd = this.sd;
    const kg = this.kg;
    let nx = 0, ny = 0, nz = 0;
    let dr = 0, dg = 0, db = 0;
    let sr = 0, sg = 0, sb = 0;
    let tr = 0, tg = 0, tb = 0;
    let sumWeight = 0, sumNonSpecular = 0;
    const alb = this.albTmp;
    for (let i = 0; i < sd.numClosure; i++) {
      const c = sd.closures[i];
      if (!closureIsBsdf(c.type)) continue;
      if (c.type === CLOSURE_BSDF_TRANSPARENT) {
        tr += c.wr;
        tg += c.wg;
        tb += c.wb;
        continue;
      }
      if (closureIsMicrofacet(c.type)) microfacetAlbedo(kg, sd.wi, c, true, true, alb);
      else alb[0] = alb[1] = alb[2] = 1;
      const ar = c.wr * alb[0], ag = c.wg * alb[1], ab = c.wb * alb[2];
      const w = (ar + ag + ab) / 3;
      nx += c.N.x * w;
      ny += c.N.y * w;
      nz += c.N.z * w;
      const roughness = Math.sqrt(bsdfRoughnessSquared(c));
      const dw = smoothstep(0, 0.15, roughness);
      dr += ar * dw;
      dg += ag * dw;
      db += ab * dw;
      sr += ar * (1 - dw);
      sg += ag * (1 - dw);
      sb += ab * (1 - dw);
      sumWeight += w;
      sumNonSpecular += w * dw;
    }
    const totalWeight = sumWeight + (tr + tg + tb) / 3;
    let featureWeight = 0;
    if (sumWeight > 0) {
      nx /= sumWeight;
      ny /= sumWeight;
      nz /= sumWeight;
      featureWeight = smoothstep(0, 0.5, sumNonSpecular / sumWeight);
    }
    const deferred = 1 - featureWeight;
    const ft = this.featT;
    if (featureWeight > 0) {
      const m = this.p.camToWorld;
      const opaque = totalWeight > 0 ? sumWeight / totalWeight : 1;
      const k = opaque * featureWeight * ((ft[0] + ft[1] + ft[2]) / 3);
      const cx = (m[0] * nx + m[4] * ny + m[8] * nz) * k;
      const cy = (m[1] * nx + m[5] * ny + m[9] * nz) * k;
      const cz = (m[2] * nx + m[6] * ny + m[10] * nz) * k;
      if (Number.isFinite(cx + cy + cz)) {
        this.featNormal[0] += cx;
        this.featNormal[1] += cy;
        this.featNormal[2] += cz;
      }
      const ar = dr * featureWeight * ft[0], ag = dg * featureWeight * ft[1], ab = db * featureWeight * ft[2];
      if (Number.isFinite(ar + ag + ab)) {
        this.featAlbedo[0] += ar;
        this.featAlbedo[1] += ag;
        this.featAlbedo[2] += ab;
      }
    }
    const qr = sr * deferred + tr, qg = sg * deferred + tg, qb = sb * deferred + tb;
    if (Math.max(Math.abs(qr), Math.abs(qg), Math.abs(qb)) > 1e-4) {
      ft[0] *= qr;
      ft[1] *= qg;
      ft[2] *= qb;
    } else {
      st.flag &= ~PATH_RAY_DENOISING_FEATURES;
    }
  }
  /** Trace one camera sample through pixel (x, y), y = 0 at the top. Writes linear RGBA. */
  tracePixelSample(x, y, sample, out) {
    const kg = this.kg;
    const st = this.state;
    const ray = this.ray;
    this.Lr = this.Lg = this.Lb = 0;
    this.alpha = 0;
    st.rngPixel = pathRngPixelInit(x, y, this.p.seed);
    st.sample = sample;
    st.rngOffset = 0;
    this.rng.rng2D(st, PRNG_FILTER, this.r2);
    const fx = lookupTableRead(kg.f32, this.r2[0], kg.filterTable, FILTER_TABLE_SIZE);
    const fy = lookupTableRead(kg.f32, this.r2[1], kg.filterTable, FILTER_TABLE_SIZE);
    this.cameraRay(x + fx, y + fy, st, ray);
    st.rngOffset = PRNG_BOUNCE_NUM;
    st.flag = PATH_RAY_CAMERA | PATH_RAY_MIS_SKIP | PATH_RAY_TRANSPARENT_BACKGROUND | (this.p.denoisingFeatures ? PATH_RAY_DENOISING_FEATURES : 0);
    st.cameraVisible = true;
    this.featAlbedo[0] = this.featAlbedo[1] = this.featAlbedo[2] = 0;
    this.featNormal[0] = this.featNormal[1] = this.featNormal[2] = 0;
    this.featT[0] = this.featT[1] = this.featT[2] = 1;
    st.bounce = st.diffuseBounce = st.glossyBounce = st.transmissionBounce = st.transparentBounce = 0;
    st.tr = st.tg = st.tb = 1;
    st.misRayPdf = 0;
    st.minRayPdf = Infinity;
    st.continuationProbability = 1;
    for (let guard = 0; guard < 1024; guard++) {
      const ignore = st.cameraVisible ? IGNORE_FOR_CAMERA : 0;
      const hitSurface = intersectClosest(kg, ray, this.hit, ignore);
      const tSurface = hitSurface ? this.hit.t : ray.tmax;
      if (kg.numHittableLights > 0 && lightsIntersect(kg, ray.Px, ray.Py, ray.Pz, ray.Dx, ray.Dy, ray.Dz, ray.tmin, tSurface, st.cameraVisible, this.lightHit)) {
        this.shadeLight(this.lightHit.lamp, this.lightHit.t);
        st.transparentBounce++;
        if (st.transparentBounce >= this.p.maxTransparent) break;
        ray.tmin = nextFloatUp(this.lightHit.t);
        continue;
      }
      if (!hitSurface) {
        this.shadeBackground();
        break;
      }
      const shader = kg.u32[kg.triInfo + this.hit.prim * TRI_INFO_SIZE + TI.SHADER];
      const shaderFlags = kg.u32[kg.shaders + shader * SHADER_SIZE + SH.FLAGS];
      st.continuationProbability = this.continuationProbability();
      if (st.continuationProbability !== 1) {
        const terminate = this.rng.rng1D(st, PRNG_TERMINATE);
        if (st.continuationProbability === 0 || terminate >= st.continuationProbability) {
          if (shaderFlags & ShaderFlags.HAS_EMISSION) st.flag |= PATH_RAY_TERMINATE_ON_NEXT_SURFACE;
          else break;
        }
      }
      if (!this.shadeSurface()) break;
    }
    out[0] = Number.isFinite(this.Lr) ? this.Lr : 0;
    out[1] = Number.isFinite(this.Lg) ? this.Lg : 0;
    out[2] = Number.isFinite(this.Lb) ? this.Lb : 0;
    out[3] = this.alpha;
  }
  /** Perspective camera ray through raster position (rx, ry) in pixels (Cycles camera_sample_perspective). */
  cameraRay(rx, ry, st, ray) {
    const p = this.p;
    const sx = rx / p.width * 2 - 1;
    const sy = 1 - ry / p.height * 2;
    let dx = sx * p.tanHalfFov * p.aspect;
    let dy = sy * p.tanHalfFov;
    let dz = -1;
    let px = 0, py = 0, pz = 0;
    if (p.aperture > 0) {
      this.rng.rng2D(st, PRNG_LENS_TIME, this.r2);
      sampleUniformDisk(this.r2[0], this.r2[1], this.r2);
      const lx = this.r2[0] * p.aperture;
      const ly = this.r2[1] * p.aperture;
      const ft = p.focusDistance / -dz;
      const fxp = dx * ft, fyp = dy * ft, fzp = dz * ft;
      px = lx;
      py = ly;
      pz = 0;
      dx = fxp - px;
      dy = fyp - py;
      dz = fzp - pz;
    }
    const m = p.camToWorld;
    let wx = m[0] * dx + m[1] * dy + m[2] * dz;
    let wy = m[4] * dx + m[5] * dy + m[6] * dz;
    let wz = m[8] * dx + m[9] * dy + m[10] * dz;
    const l = Math.hypot(wx, wy, wz);
    wx /= l;
    wy /= l;
    wz /= l;
    ray.Px = m[0] * px + m[1] * py + m[2] * pz + m[3];
    ray.Py = m[4] * px + m[5] * py + m[6] * pz + m[7];
    ray.Pz = m[8] * px + m[9] * py + m[10] * pz + m[11];
    ray.Dx = wx;
    ray.Dy = wy;
    ray.Dz = wz;
    ray.tmin = 0;
    ray.tmax = Infinity;
    ray.selfPrim = -1;
  }
  /** Cycles path_state_continuation_probability. */
  continuationProbability() {
    const st = this.state;
    if (st.flag & PATH_RAY_TRANSPARENT) {
      if (st.transparentBounce <= 0) return 1;
    } else if (st.bounce <= this.p.minBounce) return 1;
    return Math.min(Math.sqrt(Math.max(Math.abs(st.tr), Math.abs(st.tg), Math.abs(st.tb))), 1);
  }
  /** Add a light contribution with Cycles' sample clamping (film_clamp_light). */
  filmWrite(r, g, b, bounce, direct = false) {
    if (!direct && this.state.flag & PATH_RAY_DENOISING_FEATURES) {
      const ft = this.featT;
      if (Number.isFinite(r + g + b)) {
        this.featAlbedo[0] += ft[0] * r;
        this.featAlbedo[1] += ft[1] * g;
        this.featAlbedo[2] += ft[2] * b;
      }
    }
    if (!Number.isFinite(r)) r = 0;
    if (!Number.isFinite(g)) g = 0;
    if (!Number.isFinite(b)) b = 0;
    const limit = bounce > 0 ? this.p.clampIndirect : this.p.clampDirect;
    const sum = Math.abs(r) + Math.abs(g) + Math.abs(b);
    if (sum > limit) {
      const k = limit / sum;
      r *= k;
      g *= k;
      b *= k;
    }
    this.Lr += r;
    this.Lg += g;
    this.Lb += b;
  }
  /** The probability of having picked lamp `lamp` by next-event estimation from the previous path vertex (the current ray's origin): the light tree's pdf there, or the flat distribution's share. */
  lampSelectionPdf(lamp) {
    const kg = this.kg;
    if (!kg.useLightTree) return kg.pdfLights;
    const st = this.state;
    const ray = this.ray;
    const e = kg.u32[kg.lights + lamp * LIGHT_SIZE + LT.TREE_EMITTER];
    if (e === NONE) return 0;
    this.rayP.x = ray.Px;
    this.rayP.y = ray.Py;
    this.rayP.z = ray.Pz;
    return lightTreePdf(kg, this.rayP, st.misOriginN, (st.flag & PATH_RAY_MIS_HAD_TRANSMISSION) !== 0, e);
  }
  shadeLight(lamp, t) {
    const kg = this.kg;
    const st = this.state;
    const ray = this.ray;
    const pdf = lampEvalFromIntersection(kg, lamp, ray.Px, ray.Py, ray.Pz, ray.Dx, ray.Dy, ray.Dz, t, st.misOriginN, (st.flag & PATH_RAY_MIS_HAD_TRANSMISSION) !== 0, this.rgb);
    if (this.rgb[0] === 0 && this.rgb[1] === 0 && this.rgb[2] === 0) return;
    let mis = 1;
    if (!(st.flag & PATH_RAY_MIS_SKIP)) mis = powerHeuristic(st.misRayPdf, pdf * this.lampSelectionPdf(lamp));
    this.filmWrite(st.tr * this.rgb[0] * mis, st.tg * this.rgb[1] * mis, st.tb * this.rgb[2] * mis, st.bounce);
    if (st.cameraVisible) this.alpha = 1;
  }
  /** Cycles integrator_shade_background: distant lights with an angle, then the world. */
  shadeBackground() {
    const kg = this.kg;
    const st = this.state;
    const ray = this.ray;
    if (!(st.flag & PATH_RAY_MIS_SKIP) || st.cameraVisible) {
      for (let i = 0; i < kg.numHittableLights; i++) {
        const lamp = kg.u32[kg.hittableLights + i];
        const L = kg.lights + lamp * LIGHT_SIZE;
        if (kg.u32[L + LT.TYPE] !== LightType.SUN) continue;
        const flags = kg.u32[L + LT.FLAGS];
        if (st.cameraVisible ? !(flags & LightFlags.CAMERA_VISIBLE) : !(flags & LightFlags.USE_MIS)) continue;
        const pdf = lampEvalFromIntersection(kg, lamp, ray.Px, ray.Py, ray.Pz, ray.Dx, ray.Dy, ray.Dz, Infinity, st.misOriginN, false, this.rgb);
        if (pdf === 0) continue;
        let mis2 = 1;
        if (!(st.flag & PATH_RAY_MIS_SKIP)) mis2 = powerHeuristic(st.misRayPdf, pdf * this.lampSelectionPdf(lamp));
        this.filmWrite(st.tr * this.rgb[0] * mis2, st.tg * this.rgb[1] * mis2, st.tb * this.rgb[2] * mis2, st.bounce);
      }
    }
    if (st.flag & PATH_RAY_TRANSPARENT_BACKGROUND && !this.p.backgroundCameraVisible) return;
    this.tmpV.x = ray.Dx;
    this.tmpV.y = ray.Dy;
    this.tmpV.z = ray.Dz;
    shaderBackgroundEval(kg, this.tmpV, this.rgb);
    if (this.rgb[0] === 0 && this.rgb[1] === 0 && this.rgb[2] === 0) {
      if (st.flag & PATH_RAY_TRANSPARENT_BACKGROUND) this.alpha = 1;
      return;
    }
    let mis = 1;
    if (kg.backgroundLight >= 0 && kg.flags & SceneFlags.BACKGROUND_MIS && !(st.flag & PATH_RAY_MIS_SKIP)) {
      const pdf = backgroundLightPdf(kg, ray.Dx, ray.Dy, ray.Dz) * this.lampSelectionPdf(kg.backgroundLight);
      mis = powerHeuristic(st.misRayPdf, pdf);
    }
    this.filmWrite(st.tr * this.rgb[0] * mis, st.tg * this.rgb[1] * mis, st.tb * this.rgb[2] * mis, st.bounce);
    if (st.flag & PATH_RAY_TRANSPARENT_BACKGROUND) this.alpha = 1;
  }
  /** Returns false when the path ends. */
  shadeSurface() {
    const kg = this.kg;
    const st = this.state;
    const sd = this.sd;
    const ray = this.ray;
    shaderSetupFromRay(kg, sd, ray, this.hit);
    if (st.flag & PATH_RAY_TERMINATE) {
      evalSurfaceShader(kg, sd);
      let keep = 0;
      for (let i = 0; i < sd.numClosure; i++) {
        if (sd.closures[i].type !== CLOSURE_BSDF_TRANSPARENT) continue;
        if (i !== keep) {
          const t = sd.closures[keep];
          sd.closures[keep] = sd.closures[i];
          sd.closures[i] = t;
        }
        keep++;
      }
      sd.numClosure = keep;
      if (!keep) sd.runtimeFlag &= ~(SR_BSDF | SR_BSDF_HAS_EVAL);
      else sd.runtimeFlag &= ~SR_BSDF_HAS_EVAL;
    } else {
      evalSurfaceShader(kg, sd);
    }
    if (this.p.filterGlossy > 0) {
      const blurPdf = this.p.filterGlossy * st.minRayPdf;
      if (blurPdf < 1) {
        const blurRoughness = Math.sqrt(1 - blurPdf) * 0.5;
        for (let i = 0; i < sd.numClosure; i++) bsdfBlur(sd.closures[i], blurRoughness);
        if (!(blurRoughness * blurRoughness <= 2e-10)) sd.runtimeFlag |= SR_BSDF_HAS_EVAL;
      }
    }
    if (st.cameraVisible && !(sd.runtimeFlag & 16)) this.alpha = 1;
    else if (st.cameraVisible) {
      const t = (sd.tr + sd.tg + sd.tb) / 3;
      this.alpha = 1 - (1 - this.alpha) * Math.min(Math.max(t, 0), 1);
    }
    if (sd.runtimeFlag & SR_EMISSION) {
      surfaceShaderEmission(sd, this.rgb);
      const shaderFlags = kg.u32[kg.shaders + sd.shader * SHADER_SIZE + SH.FLAGS];
      let mis = 1;
      if (!(st.flag & PATH_RAY_MIS_SKIP) && shaderFlags & ShaderFlags.USE_MIS) {
        let lightPdf = triangleLightPdf(kg, sd.prim, sd.Ng, sd.wi, sd.P, sd.rayLength);
        if (kg.useLightTree) {
          const e = kg.u32[kg.triInfo + sd.prim * TRI_INFO_SIZE + TI.EMITTER];
          this.rayP.x = ray.Px;
          this.rayP.y = ray.Py;
          this.rayP.z = ray.Pz;
          lightPdf = e === NONE ? 0 : lightPdf * lightTreePdf(kg, this.rayP, st.misOriginN, (st.flag & PATH_RAY_MIS_HAD_TRANSMISSION) !== 0, e);
        }
        mis = powerHeuristic(st.misRayPdf, lightPdf);
      }
      this.filmWrite(st.tr * this.rgb[0] * mis, st.tg * this.rgb[1] * mis, st.tb * this.rgb[2] * mis, st.bounce);
    }
    const cp = st.flag & PATH_RAY_TERMINATE_ON_NEXT_SURFACE ? 0 : st.continuationProbability;
    if (cp === 0) return false;
    if (cp !== 1) {
      st.tr /= cp;
      st.tg /= cp;
      st.tb /= cp;
    }
    if (st.flag & PATH_RAY_DENOISING_FEATURES) this.writeDenoisingFeatures();
    if (kg.flags & SceneFlags.USE_DIRECT_LIGHT && sd.runtimeFlag & SR_BSDF_HAS_EVAL) this.directLight();
    return this.bsdfBounce();
  }
  /** One-sample MIS evaluation over all closures (Cycles _surface_shader_bsdf_eval_mis). Accumulates eval in er/eg/eb and returns the combined pdf. */
  evalMis(wo, skip, sumPdf, sumSampleWeight) {
    const sd = this.sd;
    const res = this.evalRes;
    for (let i = 0; i < sd.numClosure; i++) {
      if (i === skip) continue;
      const c = sd.closures[i];
      if (!closureIsBsdf(c.type)) continue;
      bsdfEval(c, sd.wi, wo, res);
      if (res.pdf !== 0) {
        this.er += res.r * c.wr;
        this.eg += res.g * c.wg;
        this.eb += res.b * c.wb;
        sumPdf += res.pdf * c.sampleWeight;
      }
      sumSampleWeight += c.sampleWeight;
    }
    return sumSampleWeight > 0 ? sumPdf / sumSampleWeight : 0;
  }
  directLight() {
    const kg = this.kg;
    const st = this.state;
    const sd = this.sd;
    const ls = this.ls;
    this.rng.rng3D(st, PRNG_LIGHT, this.r3);
    const hasTransmission = (sd.runtimeFlag & SR_BSDF_HAS_TRANSMISSION) !== 0;
    if (!lightSampleFromPosition(kg, this.r3[0], this.r3[1], this.r3[2], sd.P, sd.N, hasTransmission, ls)) return;
    const isTransmission = ls.D.x * sd.N.x + ls.D.y * sd.N.y + ls.D.z * sd.N.z < 0;
    if (ls.prim >= 0 && ls.prim === sd.prim) {
      const s = isTransmission ? -1 : 1;
      if ((ls.D.x * sd.Ng.x + ls.D.y * sd.Ng.y + ls.D.z * sd.Ng.z) * s > 0) return;
    }
    let lr = ls.er, lg = ls.eg, lb = ls.eb;
    if (ls.prim >= 0) {
      const sh = kg.shaders + kg.u32[kg.triInfo + ls.prim * TRI_INFO_SIZE + TI.SHADER] * SHADER_SIZE;
      if (!(kg.u32[sh + SH.FLAGS] & ShaderFlags.CONSTANT_EMISSION)) {
        this.evalEmissionAt(ls, this.rgb2);
        lr = this.rgb2[0];
        lg = this.rgb2[1];
        lb = this.rgb2[2];
      }
    }
    this.er = this.eg = this.eb = 0;
    const lightUsesMis = ls.prim >= 0 || (kg.u32[kg.lights + ls.lamp * LIGHT_SIZE + LT.FLAGS] & LightFlags.USE_MIS) !== 0;
    let bsdfPdf = this.evalMis(ls.D, -1, 0, 0);
    if (!lightUsesMis) bsdfPdf = 0;
    const mis = powerHeuristic(ls.pdf, bsdfPdf);
    const k = ls.evalFac / ls.pdf * mis;
    const cr = this.er * lr * k, cg = this.eg * lg * k, cb = this.eb * lb * k;
    if (cr === 0 && cg === 0 && cb === 0) return;
    const sray = this.shadowRay;
    const skipSelf = this.shadowRayOffset(ls.D, this.tmpV);
    let Px = this.tmpV.x, Py = this.tmpV.y, Pz = this.tmpV.z;
    sray.tmin = 0;
    if (ls.t === Infinity) {
      sray.Dx = ls.D.x;
      sray.Dy = ls.D.y;
      sray.Dz = ls.D.z;
      sray.tmax = Infinity;
    } else {
      let dx = ls.P.x - Px, dy = ls.P.y - Py, dz = ls.P.z - Pz;
      const l = Math.hypot(dx, dy, dz);
      if (l > 0) {
        dx /= l;
        dy /= l;
        dz /= l;
      }
      sray.Dx = dx;
      sray.Dy = dy;
      sray.Dz = dz;
      sray.tmax = l;
    }
    if (skipSelf) {
      this.integrateSurfaceRayOffset(Px, Py, Pz, sray.Dx, sray.Dy, sray.Dz, this.tmpV);
      Px = this.tmpV.x;
      Py = this.tmpV.y;
      Pz = this.tmpV.z;
    }
    sray.Px = Px;
    sray.Py = Py;
    sray.Pz = Pz;
    sray.selfPrim = skipSelf ? sd.prim : -1;
    let tr = st.tr * cr, tg = st.tg * cg, tb = st.tb * cb;
    if (ls.castShadow) {
      const vis = this.traceShadow(sray, ls.prim, this.rgb);
      if (!vis) return;
      tr *= this.rgb[0];
      tg *= this.rgb[1];
      tb *= this.rgb[2];
    }
    this.filmWrite(tr, tg, tb, st.bounce, true);
  }
  /** Emission of a textured mesh light at the sampled point. */
  evalEmissionAt(ls, out) {
    const kg = this.kg;
    const sd = this.shadowSd;
    const r = this.shadowRay;
    r.Px = ls.P.x - ls.D.x;
    r.Py = ls.P.y - ls.D.y;
    r.Pz = ls.P.z - ls.D.z;
    r.Dx = ls.D.x;
    r.Dy = ls.D.y;
    r.Dz = ls.D.z;
    const f = kg.f32;
    const b = kg.triVerts + ls.prim * TRI_VERTS_SIZE;
    const e1x = f[b + 4] - f[b], e1y = f[b + 5] - f[b + 1], e1z = f[b + 6] - f[b + 2];
    const e2x = f[b + 8] - f[b], e2y = f[b + 9] - f[b + 1], e2z = f[b + 10] - f[b + 2];
    const px = ls.P.x - f[b], py = ls.P.y - f[b + 1], pz = ls.P.z - f[b + 2];
    const d00 = e1x * e1x + e1y * e1y + e1z * e1z, d01 = e1x * e2x + e1y * e2y + e1z * e2z, d11 = e2x * e2x + e2y * e2y + e2z * e2z;
    const d20 = px * e1x + py * e1y + pz * e1z, d21 = px * e2x + py * e2y + pz * e2z;
    const den = d00 * d11 - d01 * d01 || 1;
    const hit = this.shadowHit;
    hit.u = (d11 * d20 - d01 * d21) / den;
    hit.v = (d00 * d21 - d01 * d20) / den;
    hit.t = 1;
    hit.prim = ls.prim;
    shaderSetupFromRay(kg, sd, r, hit);
    evalSurfaceShader(kg, sd);
    surfaceShaderEmission(sd, out);
  }
  /**
   * Shadow ray through transparent surfaces (Cycles intersect_shadow + shade_shadow): returns false when blocked, otherwise the transmitted throughput in out.
   */
  traceShadow(sray, lightPrim, out) {
    const kg = this.kg;
    const hit = this.shadowHit;
    out[0] = out[1] = out[2] = 1;
    let transparentBounces = this.state.transparentBounce;
    for (let guard = 0; guard < 256; guard++) {
      if (!intersectClosest(kg, sray, hit, IGNORE_FOR_SHADOW)) return true;
      if (hit.prim === lightPrim) {
        sray.tmin = nextFloatUp(hit.t);
        continue;
      }
      const shader = kg.u32[kg.triInfo + hit.prim * TRI_INFO_SIZE + TI.SHADER];
      if (!shaderHasTransparency(kg, shader)) return false;
      transparentBounces++;
      if (transparentBounces >= this.p.maxTransparent) return false;
      const sd = this.shadowSd;
      shaderSetupFromRay(kg, sd, sray, hit);
      evalSurfaceShader(kg, sd);
      shaderTransparency(sd, this.rgb2);
      out[0] *= this.rgb2[0];
      out[1] *= this.rgb2[1];
      out[2] *= this.rgb2[2];
      if (out[0] === 0 && out[1] === 0 && out[2] === 0) return false;
      sray.selfPrim = hit.prim;
      sray.tmin = hit.t;
    }
    return false;
  }
  bsdfBounce() {
    const kg = this.kg;
    const st = this.state;
    const sd = this.sd;
    const ray = this.ray;
    if (!(sd.runtimeFlag & SR_BSDF) || sd.numClosure === 0) return false;
    this.rng.rng3D(st, PRNG_SURFACE_BSDF, this.r3);
    let sampled = 0;
    let rz = this.r3[2];
    if (sd.numClosure > 1) {
      let sum = 0;
      for (let i = 0; i < sd.numClosure; i++) sum += sd.closures[i].sampleWeight;
      const r = rz * sum;
      let partial = 0;
      for (let i = 0; i < sd.numClosure; i++) {
        const next = partial + sd.closures[i].sampleWeight;
        if (r < next) {
          sampled = i;
          rz = (r - partial) / sd.closures[i].sampleWeight;
          break;
        }
        partial = next;
      }
    }
    const c = sd.closures[sampled];
    const res = this.evalRes;
    const wo = this.wo;
    const label = bsdfSample(c, sd.Ng, sd.wi, this.r3[0], this.r3[1], rz, res, wo);
    if (res.pdf === 0) return false;
    this.er = res.r * c.wr;
    this.eg = res.g * c.wg;
    this.eb = res.b * c.wb;
    let pdf = res.pdf;
    if (sd.numClosure > 1) pdf = this.evalMis(wo, sampled, res.pdf * c.sampleWeight, c.sampleWeight);
    if (pdf === 0 || this.er === 0 && this.eg === 0 && this.eb === 0) return false;
    if (label === LABEL_NONE) return false;
    const wl = Math.hypot(wo.x, wo.y, wo.z);
    const dx = wo.x / wl, dy = wo.y / wl, dz = wo.z / wl;
    this.integrateSurfaceRayOffset(sd.P.x, sd.P.y, sd.P.z, dx, dy, dz, this.tmpV);
    ray.Px = this.tmpV.x;
    ray.Py = this.tmpV.y;
    ray.Pz = this.tmpV.z;
    ray.Dx = dx;
    ray.Dy = dy;
    ray.Dz = dz;
    ray.tmin = 0;
    ray.tmax = Infinity;
    ray.selfPrim = sd.prim;
    st.tr *= this.er / pdf;
    st.tg *= this.eg / pdf;
    st.tb *= this.eb / pdf;
    if (!(label & LABEL_TRANSPARENT)) {
      st.misRayPdf = pdf;
      st.misOriginN.x = sd.N.x;
      st.misOriginN.y = sd.N.y;
      st.misOriginN.z = sd.N.z;
      st.minRayPdf = Math.min(pdf, st.minRayPdf);
    }
    this.pathStateNext(label, sd.runtimeFlag);
    return true;
  }
  /** Cycles path_state_next. */
  pathStateNext(label, runtimeFlag) {
    const st = this.state;
    const p = this.p;
    let flag = st.flag;
    if (label & LABEL_TRANSPARENT) {
      st.transparentBounce++;
      flag |= PATH_RAY_TRANSPARENT;
      if (st.transparentBounce >= p.maxTransparent) flag |= PATH_RAY_TERMINATE_ON_NEXT_SURFACE;
      st.flag = flag;
      st.rngOffset += PRNG_BOUNCE_NUM;
      return;
    }
    const bounce = st.bounce + 1;
    if (bounce >= p.maxBounce) flag |= PATH_RAY_TERMINATE_AFTER_TRANSPARENT;
    flag &= ~(PATH_RAY_REFLECT | PATH_RAY_SINGULAR | PATH_RAY_TRANSPARENT | PATH_RAY_MIS_SKIP | PATH_RAY_MIS_HAD_TRANSMISSION | PATH_RAY_CAMERA);
    st.cameraVisible = false;
    if (label & LABEL_REFLECT) {
      flag |= PATH_RAY_REFLECT;
      flag &= ~PATH_RAY_TRANSPARENT_BACKGROUND;
      if (label & LABEL_DIFFUSE) {
        st.diffuseBounce++;
        if (st.diffuseBounce >= p.maxDiffuse) flag |= PATH_RAY_TERMINATE_AFTER_TRANSPARENT;
      } else {
        st.glossyBounce++;
        if (st.glossyBounce >= p.maxGlossy) flag |= PATH_RAY_TERMINATE_AFTER_TRANSPARENT;
      }
    } else {
      flag &= ~PATH_RAY_TRANSPARENT_BACKGROUND;
      st.transmissionBounce++;
      if (st.transmissionBounce >= p.maxTransmission) flag |= PATH_RAY_TERMINATE_AFTER_TRANSPARENT;
    }
    if (label & LABEL_DIFFUSE) flag |= PATH_RAY_DIFFUSE | PATH_RAY_DIFFUSE_ANCESTOR;
    else if (label & LABEL_GLOSSY) flag |= PATH_RAY_GLOSSY;
    else if (label & LABEL_SINGULAR) flag |= PATH_RAY_GLOSSY | PATH_RAY_SINGULAR | PATH_RAY_MIS_SKIP;
    if (runtimeFlag & SR_BSDF_HAS_TRANSMISSION) flag |= PATH_RAY_MIS_HAD_TRANSMISSION;
    if (label & LABEL_TRANSMIT) flag |= PATH_RAY_TRANSMIT;
    st.flag = flag;
    st.bounce = bounce;
    st.rngOffset += PRNG_BOUNCE_NUM;
  }
  /** Cycles integrate_surface_ray_offset: keep P unless the ray could hit a neighbouring triangle, then nudge along Ng. */
  integrateSurfaceRayOffset(Px, Py, Pz, Dx, Dy, Dz, out) {
    const kg = this.kg;
    const sd = this.sd;
    const f = kg.f32;
    const b = kg.triVerts + sd.prim * TRI_VERTS_SIZE;
    const v0x = f[b] - Px, v0y = f[b + 1] - Py, v0z = f[b + 2] - Pz;
    const v1x = f[b + 4] - Px, v1y = f[b + 5] - Py, v1z = f[b + 6] - Pz;
    const v2x = f[b + 8] - Px, v2y = f[b + 9] - Py, v2z = f[b + 10] - Pz;
    const e0x = v2x - v0x, e0y = v2y - v0y, e0z = v2z - v0z;
    const e1x = v0x - v1x, e1y = v0y - v1y, e1z = v0z - v1z;
    const e2x = v1x - v2x, e2y = v1y - v2y, e2z = v1z - v2z;
    let sx = v2x + v0x, sy = v2y + v0y, sz = v2z + v0z;
    const U = (sy * e0z - sz * e0y) * Dx + (sz * e0x - sx * e0z) * Dy + (sx * e0y - sy * e0x) * Dz;
    sx = v0x + v1x;
    sy = v0y + v1y;
    sz = v0z + v1z;
    const V = (sy * e1z - sz * e1y) * Dx + (sz * e1x - sx * e1z) * Dy + (sx * e1y - sy * e1x) * Dz;
    sx = v1x + v2x;
    sy = v1y + v2y;
    sz = v1z + v2z;
    const W = (sy * e2z - sz * e2y) * Dx + (sz * e2x - sx * e2z) * Dy + (sx * e2y - sy * e2x) * Dz;
    const eps = 11920929e-14 * Math.abs(U + V + W);
    const minUVW = Math.min(U, V, W);
    const maxUVW = Math.max(U, V, W);
    if (minUVW >= eps || maxUVW <= -eps) {
      out.x = Px;
      out.y = Py;
      out.z = Pz;
      return;
    }
    out.x = offsetComponent(Px, sd.Ng.x);
    out.y = offsetComponent(Py, sd.Ng.y);
    out.z = offsetComponent(Pz, sd.Ng.z);
  }
  /**
   * Cycles shadow_ray_offset: lift the shadow ray origin off low-poly smooth surfaces (shadow terminator geometry offset 0.1, the object default). Returns whether the ray should skip its own triangle.
   */
  shadowRayOffset(L, out) {
    const kg = this.kg;
    const sd = this.sd;
    out.x = sd.P.x;
    out.y = sd.P.y;
    out.z = sd.P.z;
    if (!(sd.triFlags & TriFlags.SMOOTH)) return true;
    const offsetCutoff = 0.1;
    let NL = sd.N.x * L.x + sd.N.y * L.y + sd.N.z * L.z;
    const transmit = NL < 0;
    if (NL < 0) NL = -NL;
    const s = transmit ? -1 : 1;
    const Ngx = sd.Ng.x * s, Ngy = sd.Ng.y * s, Ngz = sd.Ng.z * s;
    const NgL = Ngx * L.x + Ngy * L.y + Ngz * L.z;
    const amount = NL < offsetCutoff ? Math.min(Math.max(2 - (NgL + NL) / offsetCutoff, 0), 1) : Math.min(Math.max(1 - NgL / offsetCutoff, 0), 1);
    if (!(amount > 0)) return true;
    const f = kg.f32;
    const ti = kg.triInfo + sd.prim * TRI_INFO_SIZE;
    const tb = kg.triVerts + sd.prim * TRI_VERTS_SIZE;
    const vn = kg.vertNormals;
    const i0 = kg.u32[ti + TI.V0], i1 = kg.u32[ti + TI.V1], i2 = kg.u32[ti + TI.V2];
    const V0x = f[tb], V0y = f[tb + 1], V0z = f[tb + 2];
    const V1x = f[tb + 4], V1y = f[tb + 5], V1z = f[tb + 6];
    const V2x = f[tb + 8], V2y = f[tb + 9], V2z = f[tb + 10];
    const N0x = f[vn + i0 * 4], N0y = f[vn + i0 * 4 + 1], N0z = f[vn + i0 * 4 + 2];
    const N1x = f[vn + i1 * 4], N1y = f[vn + i1 * 4 + 1], N1z = f[vn + i1 * 4 + 2];
    const N2x = f[vn + i2 * 4], N2y = f[vn + i2 * 4 + 1], N2z = f[vn + i2 * 4 + 2];
    const u = 1 - sd.u - sd.v;
    const v = sd.u;
    const w = sd.v;
    const Px = V0x * u + V1x * v + V2x * w, Py = V0y * u + V1y * v + V2y * w, Pz = V0z * u + V1z * v + V2z * w;
    const nx = N0x * u + N1x * v + N2x * w, ny = N0y * u + N1y * v + N2y * w, nz = N0z * u + N1z * v + N2z * w;
    const dot = (ax, ay, az, bx, by, bz) => ax * bx + ay * by + az * bz;
    const a = dot(N2x - N0x, N2y - N0y, N2z - N0z, V0x - V2x, V0y - V2y, V0z - V2z);
    const bq = dot(N2x - N1x, N2y - N1y, N2z - N1z, V1x - V2x, V1y - V2y, V1z - V2z);
    const c = dot(N1x - N0x, N1y - N0y, N1z - N0z, V1x - V0x, V1y - V0y, V1z - V0z);
    let h = a * u * (u - 1) + (a + bq + c) * u * v + bq * v * (v - 1);
    if (dot(nx, ny, nz, Ngx, Ngy, Ngz) > 0) {
      let h0 = Math.max(dot(V1x - V0x, V1y - V0y, V1z - V0z, N0x, N0y, N0z), dot(V2x - V0x, V2y - V0y, V2z - V0z, N0x, N0y, N0z), 0);
      let h1 = Math.max(dot(V0x - V1x, V0y - V1y, V0z - V1z, N1x, N1y, N1z), dot(V2x - V1x, V2y - V1y, V2z - V1z, N1x, N1y, N1z), 0);
      let h2 = Math.max(dot(V0x - V2x, V0y - V2y, V0z - V2z, N2x, N2y, N2z), dot(V1x - V2x, V1y - V2y, V1z - V2z, N2x, N2y, N2z), 0);
      h0 = Math.max(dot(V0x - Px, V0y - Py, V0z - Pz, N0x, N0y, N0z) + h0, 0);
      h1 = Math.max(dot(V1x - Px, V1y - Py, V1z - Pz, N1x, N1y, N1z) + h1, 0);
      h2 = Math.max(dot(V2x - Px, V2y - Py, V2z - Pz, N2x, N2y, N2z) + h2, 0);
      h = Math.max(Math.min(h0, h1, h2), h * 0.5);
    } else {
      let h0 = Math.max(dot(V0x - V1x, V0y - V1y, V0z - V1z, N0x, N0y, N0z), dot(V0x - V2x, V0y - V2y, V0z - V2z, N0x, N0y, N0z), 0);
      let h1 = Math.max(dot(V1x - V0x, V1y - V0y, V1z - V0z, N1x, N1y, N1z), dot(V1x - V2x, V1y - V2y, V1z - V2z, N1x, N1y, N1z), 0);
      let h2 = Math.max(dot(V2x - V0x, V2y - V0y, V2z - V0z, N2x, N2y, N2z), dot(V2x - V1x, V2y - V1y, V2z - V1z, N2x, N2y, N2z), 0);
      h0 = Math.max(dot(Px - V0x, Py - V0y, Pz - V0z, N0x, N0y, N0z) + h0, 0);
      h1 = Math.max(dot(Px - V1x, Py - V1y, Pz - V1z, N1x, N1y, N1z) + h1, 0);
      h2 = Math.max(dot(Px - V2x, Py - V2y, Pz - V2z, N2x, N2y, N2z) + h2, 0);
      h = Math.min(-Math.min(h0, h1, h2), h * 0.5);
    }
    out.x += nx * h * amount;
    out.y += ny * h * amount;
    out.z += nz * h * amount;
    return NgL > 0;
  }
};
function nextFloatUp(t) {
  if (!Number.isFinite(t) || t <= 0) return t;
  _f32[0] = t;
  _i32[0] += _f32[0] <= t ? 1 : 0;
  if (_f32[0] <= t) _i32[0] += 1;
  return _f32[0];
}

// src/cpu/worker.ts
var buffers = null;
var integrator = null;
var generation = -1;
function handle(port, msg) {
  try {
    if (msg.type === "scene") {
      buffers = { scene: msg.scene, texels: msg.texels };
      integrator = null;
      port.post({ type: "scene", shared: typeof SharedArrayBuffer !== "undefined" && msg.scene.buffer instanceof SharedArrayBuffer });
      return;
    }
    if (msg.type === "params") {
      if (!buffers) throw new Error("params before scene");
      integrator = new Integrator(new KernelGlobals(buffers), readParams(msg.params));
      generation = msg.generation;
      return;
    }
    if (msg.type === "tile") {
      if (!integrator || msg.generation !== generation) return;
      const t0 = performance.now();
      const data = new Float32Array(msg.w * msg.h * 4);
      const ext = msg.ext ? new Float32Array(msg.w * msg.h * EXT_STRIDE) : void 0;
      integrator.renderTile(msg.x, msg.y, msg.w, msg.h, msg.sampleStart, msg.sampleCount, data, ext, msg.converged);
      port.post({ type: "tile", id: msg.id, generation: msg.generation, data, ext, ms: performance.now() - t0 }, ext ? [data.buffer, ext.buffer] : [data.buffer]);
    }
  } catch (e) {
    port.post({ type: "error", message: e instanceof Error ? `${e.message}
${e.stack}` : String(e) });
  }
}
async function main() {
  const g = globalThis;
  if (typeof g.WorkerGlobalScope !== "undefined" && g.postMessage && g.addEventListener) {
    const port2 = {
      post: (m, t) => g.postMessage(m, t ?? []),
      on: (h) => g.addEventListener("message", (e) => h(e.data))
    };
    port2.on((m) => handle(port2, m));
    port2.post({ type: "ready" });
    return;
  }
  const wt = await import(
    /* @vite-ignore */
    "node:worker_threads"
  );
  const parentPort = wt.parentPort;
  if (!parentPort) return;
  const port = {
    post: (m, t) => parentPort.postMessage(m, t ?? []),
    on: (h) => parentPort.on("message", (m) => h(m))
  };
  port.on((m) => handle(port, m));
  port.post({ type: "ready" });
}
void main();
