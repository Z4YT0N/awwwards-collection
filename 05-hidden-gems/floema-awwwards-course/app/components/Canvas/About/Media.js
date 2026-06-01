import {  Program, Mesh } from 'ogl'
import GSAP from 'gsap'

import vertex from 'shaders/plane-vertex.glsl'
import fragment from 'shaders/plane-fragment.glsl'

export default class Media {
  constructor({ element, index, gl, geometry, scene, sizes })
  {
    this.element = element
    this.index = index

    this.gl = gl
    this.scene = scene
    this.geometry = geometry
    this.sizes = sizes

    this.extra = 0

    this.createTexture()
    this.createProgram()
    this.createMesh()

    this.createBounds({
      sizes: this.sizes
    })
  }

  createTexture()
  {
    const image = this.element.querySelector('.about__gallery__media__image')

    this.texture = window.TEXTURES[image.getAttribute('data-src')]
  }

  createProgram()
  {
    this.program = new Program(this.gl, {
      fragment,
      vertex,
      uniforms: {
        uAlpha: { value: 0 },
        tMap: { value: this.texture }
      }
    })
  }

  createMesh()
  {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    })

    this.mesh.setParent(this.scene)
  }

  createBounds({ sizes })
  {
    this.sizes = sizes

    this.bounds = this.element.getBoundingClientRect()

    this.updateScale()
    this.updateX()
    this.updateY()
  }

    /**
   * Animations
   */
  show()
  {
    GSAP.fromTo(this.program.uniforms.uAlpha, {
      value: 0
    }, {
      value: 1
    })
  }

  hide()
  {
    GSAP.to(this.program.uniforms.uAlpha, {
      value: 0
    })
  }

  /**
   * Events
   */
  onResize({sizes}, scroll)
  {
    this.extra = 0

    this.createBounds({sizes})
    this.updateX(scroll ? scroll.x : 0)
    this.updateY(0)
  }

  /**
   * Loops
   */
   updateRotation()
   {
      this.mesh.rotation.z = GSAP.utils.mapRange(
       -this.sizes.width / 2,
       this.sizes.width / 2,
       Math.PI * 0.125,
       - Math.PI * 0.125,
       this.mesh.position.x
      )
   }

  updateScale () {
    this.width = this.bounds.width / window.innerWidth
    this.height = this.bounds.height / window.innerHeight

    this.mesh.scale.x = this.sizes.width * this.width
    this.mesh.scale.y = this.sizes.height * this.height

    const scale = GSAP.utils.mapRange(0, this.sizes.width / 2, 1.1, 1, Math.abs(this.mesh.position.x))

    this.mesh.scale.x *= scale
    this.mesh.scale.y *= scale
  }

  updateX (x = 0) {
    this.x = (this.bounds.left + x) / window.innerWidth

    this.mesh.position.x = (-this.sizes.width / 2) + (this.mesh.scale.x / 2) + (this.x * this.sizes.width) + this.extra
  }

  updateY (y = 0) {
    this.y = (this.bounds.top + y) / window.innerHeight

    this.mesh.position.y = (this.sizes.height / 2) - (this.mesh.scale.y / 2) - (this.y * this.sizes.height)
    this.mesh.position.y += Math.cos((this.mesh.position.x / this.sizes.width) * Math.PI * 0.5) * 2.5 - 2.5
  }

  update (scroll) {
    this.updateRotation()
    this.updateScale()
    this.updateX(scroll)
    this.updateY(0)
  }
}
