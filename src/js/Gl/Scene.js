import gsap from 'gsap'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {state} from '@/state'
import {resize} from '@/utils/Resize'

import Figure from './Figure'
import {raf} from '../utils/RAF'

export default class Scene {
  constructor($selector, $imgs = []) {

    this.$container = document.querySelector($selector)
    this.$imgs = $imgs

    this.sizes = {
      w: window.innerWidth,
      h: window.innerHeight
    }

    this.time = 0

    this.figures = []
    this.fVisibility = []

    this.init()
    this.bounds()
    raf.on(this.animate)
    resize.on(this.resize)
  }

  bounds() {
    ['animate', 'resize'].forEach(fn => {
      this[fn] = this[fn].bind(this)
    })
  }

  init() {

    this.scene = new THREE.Scene()

    this.setupCamera()

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })

    this.renderer.setSize(this.sizes.w, this.sizes.h)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0xd3d3d3, 0)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableZoom = false

    this.$container.appendChild(this.renderer.domElement)

    this.$imgs.forEach(img => {
      const figureIns = new Figure(this.scene, img)
      this.figures.push(figureIns)
      this.fVisibility.push(figureIns.mesh.material.uniforms.uVisibility)
    })
  }

  setupCamera() {

    this.perspective = 800
    this.formula = 2 * Math.atan(this.sizes.h / 2 / this.perspective)
    this.fov = (180 * this.formula) / Math.PI
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.sizes.w / this.sizes.h,
      0.01,
      1000,
    )

    this.camera.position.set(0, 0, this.perspective)

    this.camera.lookAt(0, 0, 0)

  }


  resize() {
    this.sizes = {...this.sizes, w: window.innerWidth, h: window.innerHeight}

    this.setupCamera()

    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.sizes.w, this.sizes.h)
    this.renderer.setPixelRatio(window.devicePixelRatio)

    this.figures.forEach(figure => figure.resize())
  }

  updatePos(pos) {
    this.figures.forEach(figure => {
      figure.getSizes(pos)
      figure.resize()
    })
  }

  animate() {
    this.time++
    this.figures.forEach(figure => {
      figure.update()
    })
    this.updatePos(state.scrolled)
    this.renderer.render(this.scene, this.camera)
  }

  show() {
    gsap.to(this.fVisibility, {
      duration: 1,
      value: 1,
      ease: 'expo.out',
      stagger: 0.016
    })
  }
  hide() {
    gsap.to(this.fVisibility, {
      duration: 1,
      value: 0,
      ease: 'expo.in',
      stagger: 0.01,
    })
  }

  destroy() {
    this.figures.forEach(figure => {
      figure.destroy()
    })

    raf.off(this.animate)
    resize.off(this.resize)
    this.$container.removeChild(this.renderer.domElement)
  }
}
