import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

/**
 * Base
 */

// Debug
const gui = new dat.GUI();
gui.width = 500;
gui.close();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("10.png");

/**
 * Galaxy
 */
const parameters = {};
parameters.count = 10000;
parameters.size = 0.01;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;
parameters.randomness = 0.25;
parameters.randomnessPower = 2.5;
parameters.insideColor = "#ffffff";
parameters.outsideColor = "#ff0000";

let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
  /**
   * Geometry
   */
  // Destroy old galaxy
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i += 1) {
    const i3 = i * 3;

    const radius = Math.random() * parameters.radius;

    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameters.radius);

    const spinAngle = radius * parameters.spin;

    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  /**
   * Material
   */
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  /**
   * Material
   */
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
  });
  // particlesMaterial.color = new THREE.Color('red')
  // particlesMaterial.map = particleTexture
  particlesMaterial.transparent = true;
  particlesMaterial.alphaMap = particleTexture;
  // particlesMaterial.alphaTest = 0.001
  // particlesMaterial.depthTest = false
  particlesMaterial.depthWrite = false;
  particlesMaterial.blending = THREE.AdditiveBlending;
  particlesMaterial.vertexColors = true;

  /**
   * Points
   */
  points = new THREE.Points(geometry, particlesMaterial);
  scene.add(points);
};
generateGalaxy();

// gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
gui
  .add(parameters, "count")
  .min(100)
  .max(50000)
  .step(10)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "size")
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "branches")
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "spin")
  .min(-5)
  .max(5)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;

  sizes.height = window.innerHeight;
  // Update camera
  camera.aspect = sizes.width / sizes.height;

  camera.updateProjectionMatrix();
  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
/**
 * Animate
 */
const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
