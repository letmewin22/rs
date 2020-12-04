import * as THREE from 'three'
import gsap from 'gsap'

import vertex from './shader/vertex.glsl'
import fragment from './shader/fragment.glsl'
import {state} from '@/state'

export default class Figure {
  constructor(scene, $img) {
    this.scene = scene
    this.$img = $img
    this.$btn = document.querySelector('.js-case-btn')

    this.mouse = new THREE.Vector2(0, 0)

    this.time = 0

    this.bounds()

    this.$img.addEventListener('mouseenter', this.mouseEnter)
    this.$img.addEventListener('mouseleave', this.mouseLeave)
    this.$img.addEventListener('mouseenter', this.hoverOn)
    this.$img.addEventListener('mouseleave', this.hoverOff)
    this.$btn && this.$btn.addEventListener('mouseenter', this.mouseEnter)
    this.$btn && this.$btn.addEventListener('mouseleave', this.mouseLeave)
    this.$img.addEventListener('mousemove', this.mouseMove, false)

    this.loader = new THREE.TextureLoader()
    this.createMesh()
  }

  bounds() {
    ['mouseEnter', 'mouseLeave', 'mouseMove', 'hoverOn', 'hoverOff'].forEach(
      fn => {
        this[fn] = this[fn].bind(this)
      }
    )
  }

  createMesh() {
    this.image = this.loader.load(this.$img.getAttribute('data-bg'))
    this.$img.classList.add('js-hidden')

    this.sizes = new THREE.Vector2(0, 0)
    this.offset = new THREE.Vector2(0, 0)

    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 80, 80)

    const uniforms = {
      uTexture: {type: 't', value: this.image},
      uTime: {value: 0},
      uDistortion: {value: 0},
      uTransition: {value: 0},
      uCenter: {value: 0},
      uVisibility: {value: 0},
      uScreenWidth: {value: window.innerWidth},
      uMouse: {value: new THREE.Vector2(0, 0)},
      uRate: {value: new THREE.Vector2(1, 1)},
      uHover: {value: 0},
    }

    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable',
      },
      uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.getSizes()

    this.mesh.material.uniforms.uRate.y = this.sizes.y / this.sizes.x
    this.mesh.material.uniforms.uRate.x = this.sizes.x / this.sizes.y

    this.mesh.position.set(this.offset.x, this.offset.y, 0)
    this.mesh.scale.set(this.sizes.x, this.sizes.y, this.sizes.x / 2)
    this.scene.add(this.mesh)
  }

  getSizes(pos = 0) {
    const {width, height, top, left} = this.$img.getBoundingClientRect()
    const ww = window.innerWidth
    const wh = window.innerHeight

    this.sizes.set(width, height)
    this.offset.set(left - ww / 2 + width / 2, pos + wh / 2 - top - height / 2)
    const x = ((left - ww / 2) / (ww / 2)) * 0.5
    this.mesh.material.uniforms.uCenter.value = ww > 1024 ? x : 0
  }

  update() {
    this.time++
    const m = this.mesh.material.uniforms
    m.uTime.value = this.time
    m.uScreenWidth.value = window.innerWidth
  }

  resize() {
    this.getSizes()
    this.mesh.position.set(this.offset.x, this.offset.y, 0)
    this.mesh.scale.set(this.sizes.x, this.sizes.y, this.sizes.x / 2)
  }

  mouseEnter() {
    gsap.to(this.mesh.material.uniforms.uDistortion, {
      duration: 1.5,
      value: 1,
    })
  }

  mouseLeave() {
    if (!state.glTransition) {
      gsap.to(this.mesh.material.uniforms.uDistortion, {
        duration: 1.5,
        value: 0,
      })
    }
  }

  hoverOn() {
    this.mesh.material.uniforms.uHover.value = 1
  }

  hoverOff() {
    this.mesh.material.uniforms.uHover.value = 0
  }

  removeHover() {
    this.$img.removeEventListener('mouseenter', this.mouseEnter)
    this.$img.removeEventListener('mouseleave', this.mouseLeave)
    this.$btn && this.$btn.removeEventListener('mouseenter', this.mouseEnter)
    this.$btn && this.$btn.removeEventListener('mouseleave', this.mouseLeave)
  }

  mouseMove(e) {
    this.mouse.x = e.offsetX / this.sizes.x
    this.mouse.y = e.offsetY / this.sizes.y
    this.material.uniforms.uMouse.value = this.mouse
  }

  destroy() {
    this.removeHover()
    this.$img.removeEventListener('mouseenter', this.hoverOn)
    this.$img.removeEventListener('mouseleave', this.hoverOff)
    this.$img.removeEventListener('mousemove', this.mouseMove)

    this.scene.remove(this.mesh)

    this.geometry.dispose()
    this.material.dispose()
    this.image.dispose()
  }
}
