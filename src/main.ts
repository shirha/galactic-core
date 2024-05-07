import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GUI } from 'dat.gui'

const pts = [[0,8,0],[0,8,1],[0,8,2],[0,8,3],[0,7,4],[0,7,5],[0,6,6],[0,4,7],[0,5,7],[0,0,8],[0,1,8],[0,2,8],[0,3,8],[1,8,0],[1,8,1],[1,8,2],[1,8,3],[1,7,4],[1,7,5],[1,6,6],[1,4,7],[1,5,7],[1,0,8],[1,1,8],[1,2,8],[1,3,8],[2,8,0],[2,8,1],[2,8,2],[2,8,3],[2,7,4],[2,6,5],[2,5,6],[2,4,7],[2,0,8],[2,1,8],[2,2,8],[2,3,8],[3,8,0],[3,8,1],[3,8,2],[3,7,3],[3,7,4],[3,6,5],[3,5,6],[3,3,7],[3,4,7],[3,0,8],[3,1,8],[3,2,8],[4,7,0],[4,7,1],[4,7,2],[4,7,3],[4,6,4],[4,5,5],[4,4,6],[4,0,7],[4,1,7],[4,2,7],[4,3,7],[5,7,0],[5,7,1],[5,6,2],[5,6,3],[5,5,4],[5,4,5],[5,2,6],[5,3,6],[5,0,7],[5,1,7],[6,6,0],[6,6,1],[6,5,2],[6,5,3],[6,4,4],[6,2,5],[6,3,5],[6,0,6],[6,1,6],[7,4,0],[7,5,0],[7,4,1],[7,5,1],[7,4,2],[7,3,3],[7,4,3],[7,0,4],[7,1,4],[7,2,4],[7,3,4],[7,0,5],[7,1,5],[8,0,0],[8,1,0],[8,2,0],[8,3,0],[8,0,1],[8,1,1],[8,2,1],[8,3,1],[8,0,2],[8,1,2],[8,2,2],[8,3,2],[8,0,3],[8,1,3],[8,2,3]]

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(10,10,10)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

new OrbitControls(camera, renderer.domElement)

// Create BufferGeometry and Float32Array to hold the points
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array(pts.flat()); // Flatten the points array
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1 }); // Adjust point size and color as needed

const points = new THREE.Points(geometry, material)
scene.add(points)

// Add x, y, z axes
const xAxisGeometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(8, 0, 0)
])

const yAxisGeometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 8, 0)
])

const zAxisGeometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 8)
])

const axisMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff })

const xAxis = new THREE.Line(xAxisGeometry, axisMaterial)
const yAxis = new THREE.Line(yAxisGeometry, axisMaterial)
const zAxis = new THREE.Line(zAxisGeometry, axisMaterial)

scene.add(xAxis, yAxis, zAxis)

// Add a transparent sphere
const sphereGeometry = new THREE.SphereGeometry(8, 32, 32, Math.PI / 2, Math.PI / 2, 0, Math.PI / 2)
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00, // Yellow color
  transparent: true,
  opacity: 0.5 // 50% transparency
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)

const stats = new Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()

const sphereFolder = gui.addFolder('Sphere')
sphereFolder.add(sphereMaterial, 'opacity', 0, 1).name('Opacity')
sphereFolder.open()

// Define a variable to store the initial y position of the camera
// let initialYPosition = camera.position.y;

// Define a variable to track the camera's vertical movement speed
let verticalSpeed = 0.1;

// Listen for keyboard events
document.addEventListener('keydown', (event) => {
  // Check if the 'ArrowUp' key is pressed
  if (event.code === 'ArrowUp') {
    // Move the camera vertically upwards
    camera.position.y += verticalSpeed;
    // Update the initial y position
    // initialYPosition = camera.position.y;
    console.log(camera.position.y.toFixed(3))
  }

  // Check if the 'ArrowUp' key is pressed
  if (event.code === 'ArrowDown') {
    // Move the camera vertically upwards
    camera.position.y -= verticalSpeed;
    // Update the initial y position
    // initialYPosition = camera.position.y;
    console.log(camera.position.y.toFixed(3))
  }
});

// Listen for mouse wheel events
// document.addEventListener('wheel', (event) => {
//   console.log(
//     camera.position.x.toFixed(3),
//     camera.position.y.toFixed(3),
//     camera.position.z.toFixed(3))
  // // Check if the mouse wheel is scrolled
  // if (event.deltaY !== 0) {
  //   // Zoom in or out based on the direction of the scroll
  //   const zoomAmount = event.deltaY > 0 ? 1.1 : 0.9;
  //   camera.position.multiplyScalar(zoomAmount);
  //   // Restore the initial y position
  //   camera.position.y = initialYPosition; // has issues :(
  // }
// });

function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)

  stats.update()
}

animate()
