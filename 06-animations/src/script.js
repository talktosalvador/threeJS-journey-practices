import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

/* Canvas */
const canvas = document.querySelector("canvas.webgl");

/* Scene */
const scene = new THREE.Scene();

/* Object */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/* Sizes */
const sizes = {
  width: 800,
  height: 600,
};

/* Camera */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/* Renderer */
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

/* Animate */
// let time = Date.now()
// const clock = new THREE.Clock()

gsap.to(mesh.position, { duration: 1, delay: 0, x: 2 });
const tick = () => {
  /* Time */
  // const currentTime = Date.now()
  // const deltaTime = currentTime - time
  // time = currentTime
  // console.log(deltaTime)
  // const elapsedTime = clock.getElapsedTime()
  // console.log(elapsedTime)

  /* Update an object(s) */
  // mesh.scale.y -= .01
  // mesh.rotation.x += .01

  // mesh.rotation.y += .01 * deltaTime

  // mesh.rotation.z = elapsedTime

  // mesh.position.x = Math.cos(elapsedTime)
  // mesh.position.y = Math.cos(elapsedTime)
  // mesh.position.z = Math.cos(elapsedTime)

  // camera.position.x = Math.cos(elapsedTime)
  // camera.position.y = Math.sin(elapsedTime)
  // camera.lookAt(mesh.position)

  /* Renderer */
  renderer.render(scene, camera);

  /* Call this function again on the next frame */
  window.requestAnimationFrame(tick);
};

tick();
