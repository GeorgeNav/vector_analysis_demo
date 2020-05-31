import * as THREE from 'three'

const renderSquareDemo = () => {
  const width = window.innerWidth,
        height = window.innerHeight

  const scene = new THREE.Scene()

  const fovDegrees = 75,
        aspectRatio = width / height
  const camera = new THREE.PerspectiveCamera(
        fovDegrees, aspectRatio, 0.1, 1000
  )
  const renderer = new THREE.WebGLRenderer()

  renderer.setSize(width, height)
      // setMount(renderer.domElement)

  const renderElement = document.body.appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry(5, 5, 5)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
  camera.position.z = 10

  const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.005
      cube.rotation.y += 0.005
      renderer.render(scene, camera)
  }
  animate()

  renderer.render(scene, camera)
  return renderElement
}

export default renderSquareDemo