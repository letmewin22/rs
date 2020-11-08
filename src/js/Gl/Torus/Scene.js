import * as THREE from 'three'
import gsap from 'gsap'
import {raf} from '@/utils/RAF'
import {resize} from '@/utils/Resize'
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {Figure} from './Figure'

export default class Scene {
  constructor($selector) {
    this.$container = document.querySelector($selector)
    this.time = 0
    this.figure = null
    this.visibility = {value: 0}

    this.sizes = {
      w: window.innerWidth,
      h: window.innerHeight,
    }

    this.mouse = {
      destX: 0,
      destY: 0,
    }

    this.bind()

    this.init()

    window.addEventListener('mousemove', this.onMousemove)
  }

  bind() {
    ['resize', 'onMousemove', 'animate'].forEach(fn => {
      this[fn] = this[fn].bind(this)
    })
  }

  init() {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.sizes.w / this.sizes.h,
      0.01,
      1000,
    )
    this.camera.position.z = 1

    this.camera.lookAt(this.scene.position)

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })

    this.renderer.setSize(this.sizes.w, this.sizes.h)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0xd3d3d3, 0)

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.light = new THREE.DirectionalLight('#ffe6ae', 5)
    this.light.position.set(7.5, 5, 10)

    this.scene.add(this.light)

    this.light.shadow.mapSize = new THREE.Vector2(5, 10)
    this.light.shadow.needsUpdate = true

    this.figure = new Figure(this.scene, {
      mouse: this.mouse,
      visibility: this.visibility
    })

    this.$container.appendChild(this.renderer.domElement)

    resize.on(this.resize)
    raf.on(this.animate)
    this.show()
  }

  resize() {
    this.sizes = {...this.sizes, w: window.innerWidth, h: window.innerHeight}

    this.camera.aspect = this.sizes.w / this.sizes.h
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.sizes.w, this.sizes.h)
    this.renderer.setPixelRatio(window.devicePixelRatio)

    this.figure.resize()
  }

  animate() {
    this.time++
    this.scene.rotation.x += (this.mouse.destY - this.scene.rotation.x) * 0.025
    this.scene.rotation.y += (this.mouse.destX - this.scene.rotation.y) * 0.025
    this.figure.animate()
    this.renderer.render(this.scene, this.camera)
  }

  onMousemove(e) {
    const x = (e.clientX - this.sizes.w / 2) / (this.sizes.w / 2)
    const y = (e.clientY - this.sizes.h / 2) / (this.sizes.h / 2)
    this.mouse.destX = -x * 0.5
    this.mouse.destY = -y * 0.5
  }

  show() {
    this.figure.group.rotation.y = -10
    this.figure.group.scale.y = 0
    this.figure.group.scale.x = 0
    gsap.to(this.visibility, {
      duration: 1,
      delay: 0.1,
      value: 1,
      ease: 'expo.out',
      stagger: 0.016,
    })
    gsap.to(this.figure.group.rotation, {
      duration: 2,
      delay: 0.1,
      y: 0,
      ease: 'sine.out',
      stagger: 0.016,
    })
    gsap.to(this.figure.group.scale, {
      duration: 2,
      delay: 0.1,
      y: 1,
      x: 1,
      ease: 'sine.out',
      stagger: 0.016,
    })
  }
  hide() {
    gsap.to(this.visibility, {
      duration: 1,
      value: 0,
      ease: 'expo.in',
      stagger: 0.01,
    })
  }

  destroy() {
    this.figure.destroy()
    this.scene.remove(this.light)
    raf.off(this.animate)
    resize.off(this.resize)
    this.$container.removeChild(this.renderer.domElement)
    window.removeEventListener('mousemove', this.onMousemove)
  }
}
