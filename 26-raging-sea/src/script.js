import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {BackSide, DoubleSide, FrontSide} from "three";
import testVertexShader from './shaders/water/vertex.glsl'
import testFragmentShader from './shaders/water/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({width: 340})
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Load background texture
const loader = new THREE.TextureLoader();
loader.load('sky.jpg' , function(texture)
{
    scene.background = texture;
});

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneBufferGeometry(20, 5, 512, 512)

// Colors
debugObject.depthColor = '#186691'
debugObject.surfaceColor = '#9bd8ff'

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    transparent: true,
    // wireframe: true,
    uniforms: {
        uAlpha: {value: 1.0},
        uBigWavesElevation: {value: 0.2},
        uBigWavesFrequency: { value: new THREE.Vector2(1, 0.5) },
        uBigWavesSpeed: { value: new THREE.Vector2(1.0, 1.0) },
        uTime: {value: 0},
        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
        uColorOffset: { value: 0.08 },
        uColorMultiplier: { value: 5 },
        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3.0 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallIterations: { value: 4.0 },
    },

})

gui.add(waterMaterial.uniforms.uAlpha,'value').min(0).max(1).step(0.01).name('Alpha')
gui.add(waterMaterial.uniforms.uBigWavesElevation,'value').min(0).max(1).step(0.01).name('WavesElevation')
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value,'x').min(0).max(10).step(0.01).name('WavesFrequencyX')
gui.add(waterMaterial.uniforms.uBigWavesSpeed.value,'x').min(0).max(10).step(0.01).name('uBigWavesSpeedX')
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value,'y').min(0).max(10).step(0.01).name('WavesFrequencyY')
gui.add(waterMaterial.uniforms.uBigWavesSpeed.value,'y').min(0).max(10).step(0.01).name('uBigWavesSpeedY')
gui.add(waterMaterial, 'side', {
    double: DoubleSide,
    front: FrontSide,
    back: BackSide,
}).onFinishChange(() => {
    waterMaterial.side = Number(waterMaterial.side)
})
gui.add(waterMaterial, 'wireframe')
gui.add(waterMaterial, 'transparent')
gui.addColor(debugObject, 'depthColor').onChange(() => { waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor) })
gui.addColor(debugObject, 'surfaceColor').onChange(() => { waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor) })
gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')
gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
gui.add(waterMaterial.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = -Math.PI * 0.5
scene.add(water)

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
camera.position.set(0.0, 1, 3.0)
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
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Water
    waterMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()