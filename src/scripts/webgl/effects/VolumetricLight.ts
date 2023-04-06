import * as THREE from 'three'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import fragmentShader from '../shader/volumetricLightFrag.glsl'
import vertexShader from '../shader/volumetricLightVert.glsl'
import { gui } from '../utils/gui'

class VolumetricLight {
  public pass: ShaderPass

  constructor() {
    this.pass = this.createPass()
    this.setGui()
  }

  private createPass() {
    const shader: THREE.Shader = {
      uniforms: {
        tDiffuse: { value: null },
        lightPosition: { value: new THREE.Vector2(0.5, 0.5) },
        exposure: { value: 1 },
        decay: { value: 0.93 },
        density: { value: 0.5 },
        weight: { value: 0.1 },
        samples: { value: 100 },
      },
      vertexShader,
      fragmentShader,
    }

    return new ShaderPass(shader)
  }

  private setGui() {
    const uniforms = this.pass.material.uniforms
    const f = gui.addFolder('effects')
    f.add(this.pass, 'enabled')
    f.add(uniforms.exposure, 'value', 0, 2, 0.01).name('exposure')
    f.add(uniforms.decay, 'value', 0, 1, 0.01).name('decay')
    f.add(uniforms.density, 'value', 0, 1, 0.01).name('density')
    f.add(uniforms.weight, 'value', 0, 1, 0.01).name('weight')
    f.add(uniforms.samples, 'value', 0, 100, 1).name('samples')
  }
}

export const volumetricLight = new VolumetricLight()
