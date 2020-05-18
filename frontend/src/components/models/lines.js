import * as THREE from 'three'

const renderLines = (lines) => {
  const width = window.innerWidth,
        height = window.innerHeight

  const scene = new THREE.Scene()


  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  const renderElement = document.body.appendChild(renderer.domElement)


  let X = [],
      Y = [],
      Z = []

  const createLine = (line) => {
    const material = new THREE.LineBasicMaterial({ color: Math.random()*0xFFFFFF<<0 }) // blue line

    const points = []

    line.forEach(coord => {
      X.push(coord[0])
      Y.push(coord[1])
      Z.push(coord[2])
      points.push(new THREE.Vector3(...coord))
    })

    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    const lineToRender = new THREE.Line(geometry, material)

    scene.add(lineToRender)
  }

  lines.forEach(line => createLine(line))

  const fovDegrees = 100,
        aspectRatio = width / height
  const camera = new THREE.PerspectiveCamera(
    fovDegrees, aspectRatio, 1, 500
  )

  console.log('X max & min:', Math.max(...X), ',', Math.min(...X))
  console.log('Y max & min:', Math.max(...Y), ',', Math.min(...Y))
  console.log('Z max & min:', Math.max(...Z), ',', Math.min(...Z))

  camera.position.set(0, 0, 0)

  const averageX = X.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / X.length
  const averageY = Y.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / Y.length
  const averageZ = Z.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / Z.length

  camera.lookAt(averageX, averageY, averageZ)

  renderer.render(scene, camera)
  return renderElement
}

export default renderLines
