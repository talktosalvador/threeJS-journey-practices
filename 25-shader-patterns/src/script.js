import './style.css'
import * as THREE from 'three'
// import THREE from 'three/build/three.min'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Test mesh
 */
// Geometry
// const geometry = new THREE.PlaneBufferGeometry(10, 10, 32, 32)
const geometry = new THREE.SphereBufferGeometry(1, 64, 64)

// Material
const material = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    side: THREE.DoubleSide,
    wireframe: true,
})
gui.add(material, 'wireframe')
gui.add(material, 'transparent')
gui.add(material, 'side', {
    double: THREE.DoubleSide,
    front: THREE.FrontSide,
    back: THREE.BackSide,
}).onFinishChange(() => {
    material.side = Number(material.side)
})

// Mesh
const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.x = -1.5
// mesh.rotation.y = 1.5
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(0.5, -1.0, 4.5)
camera.position.set(0.0, 0.0, 0.1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
// const clock = new THREE.Clock()
const tick = () => {
    // Update an object(s)
    // const elapsedTime = clock.getElapsedTime()
    mesh.rotation.y += 0.01

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()