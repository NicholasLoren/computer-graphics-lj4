import * as THREE from 'three'
import { OrbitControls } from 'https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js'

/**
 * Scene object.
 * @type {THREE.Scene}
 */
let scene

/**
 * Renderer object.
 * @type {THREE.WebGLRenderer}
 */
let renderer

/**
 * Camera object.
 * @type {THREE.PerspectiveCamera}
 */
let camera

/**
 * Polygon object.
 * @type {THREE.Mesh}
 */
let polygon

/**
 * Light object.
 * @type {THREE.PointLight}
 */
let light

/**
 * Ambient light object.
 * @type {THREE.AmbientLight}
 */
let ambientLight

/**
 * Directional light object.
 * @type {THREE.DirectionalLight}
 */
let directionalLight

/**
 * Controls object.
 * @type {OrbitControls}
 */
let controls

init()
animate()

/**
 * Initializes the scene, camera, renderer, and polygon.
 */
function init() {
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer({ antialias: true })
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 5

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x111111, 1)
  document.body.appendChild(renderer.domElement)

  // Adding a light source
  light = new THREE.PointLight(0xffffff)
  light.position.set(10, 10, 10)
  scene.add(light)

  directionalLight = new THREE.DirectionalLight(0xffffff)
  directionalLight.position.set(0, 0, 1)
  scene.add(directionalLight)

  // Add ambient light
  ambientLight = new THREE.AmbientLight(0xffffff)
  scene.add(ambientLight)

  // Create controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.autoRotate = true

  // Load textures
  const textureLoader = new THREE.TextureLoader()
  const textures = [
    textureLoader.load('/assets/texture-5.jpg'),
    textureLoader.load('/assets/texture-4.jpg'),
    textureLoader.load('/assets/texture-5.jpg'),
    textureLoader.load('/assets/texture-2.jpg'),
    textureLoader.load('/assets/texture-6.jpg'),
    textureLoader.load('/assets/texture-6.png'),
  ]

  // Creating a simple geometry (cube as an example)
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2)
  const materials = textures.map(
    (texture) => new THREE.MeshPhongMaterial({ map: texture })
  )

  // Adding a polygon (cube) with multiple materials
  polygon = new THREE.Mesh(geometry, materials)
  scene.add(polygon)

  renderer.render(scene, camera)
}

/**
 * Animates the polygon.
 */
function animate() {
  requestAnimationFrame(animate)
  polygon.rotation.x += 0.001
  polygon.rotation.y += 0.001
  polygon.rotation.z += 0.001

  // Update controls
  controls.update()

  renderer.render(scene, camera)
}
