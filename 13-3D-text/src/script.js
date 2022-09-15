import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const matcapTexture = textureLoader.load("./textures/matcaps/3.png");

/**
 * Fonts
 * */
const fontLoader = new THREE.FontLoader();
fontLoader.load("./fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new THREE.TextGeometry("slvdrvlc", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelSegments: 5,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelEnabled: true,
    bevelOffset: 0,
  });
  textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //     - textGeometry.boundingBox.max.x * 0.5,
  //     - textGeometry.boundingBox.max.y * 0.5,
  //     - textGeometry.boundingBox.max.z * 0.5
  // )
  textGeometry.center();

  // const textMaterial = new THREE.MeshBasicMaterial()
  // textMaterial.wireframe = true

  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

  const text = new THREE.Mesh(textGeometry, material);

  scene.add(text);

  // const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
  const donutGeometry = new THREE.SphereGeometry(0.5, 32, 32);

  for (let i = 0; i < 100; i += 1) {
    const donut = new THREE.Mesh(donutGeometry, material);
    const scale = Math.random() * 0.5 + 0.1;
    donut.scale.set(scale, scale, scale);
    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
    scene.add(donut);
  }
});

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
//
// scene.add(cube)

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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
