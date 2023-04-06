import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { gl } from '../core/WebGL'
import { volumetricLight } from './VolumetricLight'
import { fxaa } from './FXAA'

class Effects {
  private composer!: EffectComposer

  constructor() {
    this.init()
  }

  private init() {
    this.composer = new EffectComposer(gl.renderer)
    this.composer.setPixelRatio(window.devicePixelRatio)
    this.composer.addPass(new RenderPass(gl.scene, gl.camera))

    this.composer.addPass(fxaa.pass)
    this.composer.addPass(volumetricLight.pass)
  }

  resize() {
    const { width, height } = gl.size
    fxaa.resize(width, height)
    this.composer.setSize(width, height)
  }

  render() {
    this.composer.render()
  }
}

export const effects = new Effects()
