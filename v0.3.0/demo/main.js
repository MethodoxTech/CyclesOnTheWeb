// Demo: a three.js lookdev scene, previewed with three.js and path traced with Cycles on the Web through renderThreeScene, which watches the camera and the scene: orbit the preview and the path tracer restarts from the new view.
//
// The library is loaded from ../cycles.js in a release folder (demo/ sits next to the bundles), or from ../dist/cycles.js in the repository.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const lib = await import('../cycles.js').catch(() => import('../dist/cycles.js'));
const { renderThreeScene } = lib;

const W = 640;
const H = 480;
const $ = (id) => document.getElementById(id);
const status = (s) => ($('status').textContent = s);

// ---- The scene, built with ordinary three.js objects.
function proceduralSky(width = 256, height = 128) {
  const data = new Float32Array(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const v = 1 - (y + 0.5) / height;
      const u = (x + 0.5) / width;
      const up = Math.max(0, v - 0.5) * 2;
      let r = 0.25 + 0.35 * up, g = 0.3 + 0.4 * up, b = 0.4 + 0.7 * up;
      if (v < 0.5) { r = 0.16; g = 0.14; b = 0.12; }
      const du = Math.min(Math.abs(u - 0.3), 1 - Math.abs(u - 0.3));
      const dv = v - 0.8;
      const blob = 60 * Math.exp(-(du * du + dv * dv) / 0.0008);
      const o = (y * width + x) * 4;
      data[o] = r + blob; data[o + 1] = g + blob * 0.92; data[o + 2] = b + blob * 0.8; data[o + 3] = 1;
    }
  }
  const t = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.FloatType);
  t.mapping = THREE.EquirectangularReflectionMapping;
  t.flipY = true;
  t.magFilter = THREE.LinearFilter;
  t.needsUpdate = true;
  return t;
}

const scene = new THREE.Scene();
const sky = proceduralSky();
scene.environment = sky;
scene.background = sky;
const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x9a9a9a, roughness: 0.8 }));
scene.add(ground);
const materials = [
  // Car paint: a rough red base under a smooth clearcoat.
  new THREE.MeshPhysicalMaterial({ color: new THREE.Color(0.75, 0.08, 0.06), roughness: 0.45, clearcoat: 1, clearcoatRoughness: 0.03 }),
  // Brushed gold: anisotropic metal.
  new THREE.MeshPhysicalMaterial({ color: new THREE.Color(0.95, 0.75, 0.35), metalness: 1, roughness: 0.3, anisotropy: 0.8 }),
  new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 1, roughness: 0.05, ior: 1.45 }),
  // Velvet: a dark base with a bright sheen.
  new THREE.MeshPhysicalMaterial({ color: new THREE.Color(0.05, 0.06, 0.2), roughness: 0.9, sheen: 1, sheenColor: new THREE.Color(0.6, 0.65, 1), sheenRoughness: 0.35 }),
];
materials.forEach((m, i) => {
  const s = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 32), m);
  s.position.set(-1.65 + i * 1.1, 0.5, 0);
  scene.add(s);
});
const sun = new THREE.DirectionalLight(0xffffff, 2.0);
sun.position.set(2, 4, 2.5);
scene.add(sun, sun.target);

const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
camera.position.set(0, 1.6, 4.4);

// ---- three.js preview.
const preview = $('preview');
const gl = new THREE.WebGLRenderer({ canvas: preview, antialias: true });
gl.setSize(W, H, false);
gl.toneMapping = THREE.NoToneMapping;
const controls = new OrbitControls(camera, preview);
controls.target.set(0, 0.45, 0);
controls.update();

// ---- Path tracer: one call. It converts the scene, renders progressively into the canvas, and restarts when the camera or a material changes.
const trace = $('trace');
trace.width = W;
trace.height = H;
let handle = null;

function start() {
  handle?.dispose();
  handle = renderThreeScene({
    canvas: trace,
    scene,
    camera,
    samples: Math.max(1, Number($('samples').value) | 0),
    resolutionScale: Number($('scale').value),
    renderer: { backend: $('backend').value },
    onWarnings: (w) => w.length && console.info('Cycles on the Web:', w.join('; ')),
    onProgress: (p) => {
      $('traceCaption').textContent = `Cycles, ${p.backend}${p.fallbackReason ? ' (GPU unavailable: ' + p.fallbackReason + ')' : ''}`;
      status(`${p.samples} / ${p.totalSamples} spp, ${(p.elapsedMs / 1000).toFixed(1)} s`);
    },
    onError: (e) => status(`Error: ${e instanceof Error ? e.message : e}`),
  });
}

controls.addEventListener('change', () => gl.render(scene, camera));
$('backend').addEventListener('change', start);
$('samples').addEventListener('change', start);
$('scale').addEventListener('change', start);

gl.render(scene, camera);
status('Starting');
start();
