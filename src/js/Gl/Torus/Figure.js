import * as THREE from 'three'
import * as dat from 'dat.gui'

export class Figure {
  constructor(scene, opts) {
    this.scene = scene
    this.opts = opts
    this.result = 0
    this.time = 0
    this.clamp = (num, a, b) => {
      return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))
    }
    this.init()
  }

  init() {
    // this.datGui()
    this.createMesh()
  }

  createMesh() {
    this.geometry = new THREE.TorusGeometry(0.3, 0.045, 70, 70)

    this.material = new THREE.MeshStandardMaterial({
      color: 0x2963ff,
      metalness: 1,
      flatShading: false,
      roughness: 1,
      depthTest: true,
      depthWrite: true,
      transparent: true,
      opacity: this.opts.visibility.value
    })

    this.material.needsUpdate = true

    this.mesh1 = new THREE.Mesh(this.geometry, this.material)
    this.mesh2 = new THREE.Mesh(this.geometry, this.material)

    this.mesh2.position.x = 0.51
    this.mesh2.rotation.x = 1.07
    this.scene.position.x = -0.225

    // this.scene.add(this.mesh1)
    // this.scene.add(this.mesh2)

    this.group = new THREE.Group()
    this.group.add( this.mesh1 )
    this.group.add( this.mesh2 )

    this.scene.add( this.group )
  }

  datGui() {
    this.settings = {
      color: 3036343,
      // roughness: 0.24,
      // metalness: 0.77,
      roughness: 1,
      metalness: 1,
      flatShading: false,
    }

    this.gui = new dat.GUI()

    this.gui.addColor(this.settings, 'color').onChange(() => {
      this.material.color = new THREE.Color(this.settings.color)
    })
    this.gui
      .add(this.settings, 'roughness', 0, 1, 0.01)
      .onChange(() => (this.material.roughness = this.settings.roughness))
    this.gui
      .add(this.settings, 'metalness', 0, 1, 0.01)
      .onChange(() => (this.material.metalness = this.settings.metalness))
    this.gui.add(this.settings, 'flatShading').onChange(() => {
      this.material.flatShading = this.settings.flatShading
      this.material.needsUpdate = true
    })
  }

  animate() {
    this.time++
    this.material.opacity = this.opts.visibility.value
    this.group.position.y = 0 - 0.2*(1-this.opts.visibility.value)
    this.result += (this.opts.mouse.destX - this.scene.rotation.x) * 0.001
    this.result = this.clamp(this.result, 0.45, 0.48)
    // this.group.rotation.y = this.time / 5000
    this.mesh1.scale.x = 1 + (this.opts.mouse.destX - this.mesh1.scale.x) * 0.04
    this.mesh1.scale.y = 1 + (this.opts.mouse.destX - this.mesh1.scale.y) * 0.04

    this.mesh2.position.x = this.result
    this.mesh2.scale.x =
      1 + (this.opts.mouse.destX - this.mesh2.scale.x) * 0.025
    this.mesh2.scale.y =
      1 + (this.opts.mouse.destX - this.mesh2.scale.y) * 0.025
  }

  destroy() {
    this.scene.remove(this.mesh1)
    this.scene.remove(this.mesh2)
    this.geometry.dispose()
    this.material.dispose()
    // this.gui.destroy()
  }
}
