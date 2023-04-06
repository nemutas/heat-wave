import * as THREE from 'three'
import { gl } from './core/WebGL'
import fragmentShader from './shader/fs.glsl'
import vertexShader from './shader/vs.glsl'
import { controls } from './utils/OrbitControls'
import { effects } from './effects/Effects'
import { gui } from './utils/gui'

export class TCanvas {
  constructor(private container: HTMLElement) {
    this.init()
    this.createObjects()
    gl.requestAnimationFrame(this.anime)
  }

  private init() {
    gl.setup(this.container)
    gl.scene.background = new THREE.Color('#000')
    gl.camera.position.set(-0.17, 0.162, 0.444)
    gl.camera.lookAt(gl.scene.position)

    controls.primitive.enabled = false
    gui.add(controls.primitive, 'enabled').name('enabled controls')
  }

  private createObjects() {
    const geometry = new THREE.PlaneGeometry(1, 1, 200, 200)
    geometry.rotateX(-Math.PI / 2)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#f50') },
      },
      vertexShader,
      fragmentShader,
      // wireframe: true,
      side: THREE.DoubleSide,
      transparent: true,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = 'plane'

    gl.scene.add(mesh)
  }

  // ----------------------------------
  // animation
  private anime = () => {
    const plane = gl.getMesh<THREE.ShaderMaterial>('plane')
    plane.material.uniforms.uTime.value += gl.time.delta

    controls.update()
    // gl.render()
    effects.render()
  }

  // ----------------------------------
  // dispose
  dispose() {
    gl.dispose()
  }
}
