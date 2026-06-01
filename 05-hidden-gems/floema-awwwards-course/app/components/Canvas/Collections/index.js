import { Plane, Transform } from 'ogl'
import GSAP from 'gsap'
import Media from './Media'
import Prefix from 'prefix'

import { each, map } from 'lodash'

export default class Collections {
  constructor({ gl, scene, sizes, transition })
  {
    this.id = 'collections'

    this.gl = gl
    this.sizes = sizes
    this.scene = scene
    this.transition = transition

    this.transformPrefix = Prefix('transform')

    this.group = new Transform()
    this.group.setParent(scene)

    this.galleryElement = document.querySelector('.collections__gallery')
    this.galleryWrapperElement = document.querySelector('.collections__gallery__wrapper')

    this.titlesElement = document.querySelector('.collections__titles')

    this.collectionsElements = document.querySelectorAll('.collections__article')
    this.collectionsElementActive = 'collections__article--active'

    this.mediasElements = document.querySelectorAll('.collections__gallery__media')

    this.scroll = {
      current: 0,
      target: 0,
      start: 0,
      velocity: 0.5,
      lerp: 0.1
    }

    this.createGeometry()
    this.createGallery()
    this.onResize({
      sizes: this.sizes
    })

    this.show()
  }

  createGeometry()
  {
    this.geometry = new Plane(this.gl)
  }

  createGallery()
  {
    this.medias = map(this.mediasElements, (element, index) => {
      return new Media({
        element,
        index,
        gl: this.gl,
        geometry: this.geometry,
        scene: this.group,
        sizes: this.sizes
      })
    })
  }


  /**
   * Animations
   */
  show()
  {
    if (this.transition) {
      const { src } = this.transition.mesh.program.uniforms.tMap.value.image
      const texture = window.TEXTURES[src]
      const media = this.medias.find(media => media.texture === texture)
      const scroll = -media.bounds.left - media.bounds.width / 2 + window.innerWidth / 2

      this.update()

      this.transition.animate({
        position: {x: 0, y: media.mesh.position.y, z: 0},
        rotation: media.mesh.rotation,
        scale: media.mesh.scale
      }, _ => {
        this.media.opacity.multiplier = 1

        each(this.medias, item => {
          if (media !== item) {
            item.show()
          }
        })


        this.scroll.current = this.scroll.target = this.scroll.last = this.scroll.start = scroll
      })
    } else {
      each(this.medias, media => media.show())
    }
  }

  hide()
  {
    each(this.medias, media => media.hide())
  }

  /**
   * Events
   */
  onResize(event)
  {
    this.sizes = event.sizes

    this.bounds = this.galleryWrapperElement.getBoundingClientRect()

    this.scroll.last = this.scroll.target = 0
    this.scroll.limit = this.bounds.width

    each(this.medias, media => media.onResize(event, this.scroll))

    this.scroll.limit = this.bounds.width - this.medias[0].element.clientWidth
  }

  onTouchDown({x, y})
  {
    this.scroll.last = this.scroll.current
  }

  onTouchMove({x, y})
  {
    this.scroll.target = this.scroll.last - x.distance
  }

  onTouchUp({x, y})
  {


  }

  onWheel({ pixelX, pixelY })
  {
    this.scroll.target -= pixelY
  }

  /**
   *  Changed
   */
  onChange (index) {
    this.index = index

    const selectedCollection = parseInt(this.mediasElements[this.index].getAttribute('data-index'))

    map(this.collectionsElements, (element, elementIndex) => {
      if (elementIndex === selectedCollection) {
        element.classList.add(this.collectionsElementActive)
      } else {
        element.classList.remove(this.collectionsElementActive)
      }
    })

    this.titlesElement.style[this.transformPrefix] = `translateY(-${25 * selectedCollection}%) translate(-50%, -50%) rotate(90deg)`

    this.media = this.medias[this.index]
  }


  /**
   * Update
   */
  update()
  {
    this.scroll.target = GSAP.utils.clamp(-this.scroll.limit, 0, this.scroll.target)

    this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, this.scroll.lerp)

    this.galleryElement.style[this.transformPrefix] = `translateX(${this.scroll.current}px)`

    if (this.scroll.last > this.scroll.current) {
      this.scroll.direction = 'left'
    } else if (this.scroll.last < this.scroll.current) {
      this.scroll.direction = 'right'
    }

    this.scroll.last = this.scroll.current

    const index = Math.floor(Math.abs((this.scroll.current - (this.medias[0].bounds.width / 2)) / this.scroll.limit) * (this.medias.length - 1))

    if (this.index !== index) {
      this.onChange(index)
    }

    each(this.medias, (media, index) => {
      media.update(this.scroll.current, this.index)
    })
  }


  /**
   * Destroy
   */
   destroy()
   {
     this.scene.removeChild(this.group)
   }
}
