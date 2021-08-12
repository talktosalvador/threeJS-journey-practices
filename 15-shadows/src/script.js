import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

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
 * Lights
 */
/* Ambient light */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

/* Directional light */
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
directionalLight.position.set(2, 2, -1)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001)

/* Spot light */
const spotLight = new THREE.SpotLight(0xffffff, 0.1, 10, Math.PI * 0.3)
spotLight.position.set(0, 2, 2)
scene.add(spotLight)
scene.add(spotLight.target)

/* Point light */
const pointLight = new THREE.PointLight(0xffffff, 0.3)
pointLight.position.set(-1, 1, 0)
scene.add(pointLight)


/**
 * Shadows
 * */
/* DirectionalLight */
directionalLight.castShadow = true

/* render size */
// directionalLight.shadow.mapSize.width = 1024
// directionalLight.shadow.mapSize.height = 1024

/* near far */
directionalLight.shadow.camera.near = 3
directionalLight.shadow.camera.far = 5

/* amplitude */
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2

/* blur */
// directionalLight.shadow.radius = 50

scene.add(directionalLight)

/* SpotLight */
spotLight.castShadow = true

/* render size */
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024

/* fov */
spotLight.shadow.camera.fov = 30

/* near far */
spotLight.shadow.camera.near = 2
spotLight.shadow.camera.far = 5

/* Point light */
pointLight.castShadow = true

/* render size */
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024

/* near far */
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5


/**
 * Helpers
 * */
/* directionalLight */
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)
directionalLightCameraHelper.visible = false

/* spotLight */
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
scene.add(spotLightCameraHelper)
spotLightCameraHelper.visible = false

/* Point light */
const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
scene.add(pointLightCameraHelper)
pointLightCameraHelper.visible = false

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
// const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg')
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
// material.map = mapTexture
material.roughness = 0.7
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 32, 32),
    material
)

sphere.castShadow = true

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(5, 5),
    material
    // new THREE.MeshBasicMaterial({
    //     map:bakedShadow
    // })
)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.5
// gui.add(plane.position,'y').min(-1).max(0).step(0.01)
plane.receiveShadow = true

const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow,
    })
)
sphereShadow.rotation.x = -Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01

scene.add(sphere, sphereShadow, plane)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

/* shadows */
renderer.shadowMap.enabled = false
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update the sphere
    sphere.position.x = Math.cos(elapsedTime) * 1.5
    sphere.position.z = Math.sin(elapsedTime) * 1.5
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

    // Update the shadow
    sphereShadow.position.x = sphere.position.x
    sphereShadow.position.z = sphere.position.z
    sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3

    /* Update objects */
    // sphere.rotation.y = 0.5 * elapsedTime
    // plane.rotation.y = 0.5 * elapsedTime

    // sphere.rotation.x = .5 * elapsedTime
    // plane.rotation.x = .5 * elapsedTime

    // sphere.rotation.z = 0.5 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()