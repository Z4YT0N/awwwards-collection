import { Plane, Transform } from 'ogl'
import GSAP from 'gsap'
import Media from './Media'

import { each, map } from 'lodash'

export default class Home {
  constructor({ gl, scene, sizes })
  {
    this.gl = gl
    this.sizes = sizes
    this.scene = scene
    this.group = new Transform()
    this.group.setParent(scene)

    this.galleryElement = document.querySelector('.home__gallery')
    this.mediasElements = document.querySelectorAll('.home__gallery__media')


    this.x = {
      current: 0,
      target: 0,
      lerp: 0.1,
    }

    this.y = {
      current: 0,
      target: 0,
      lerp: 0.1,
    }

    this.scrollCurrent = {
      x: 0,
      y: 0
    }

    this.scroll = {
      x: 0,
      y: 0
    }

    this.speed = {
      target: 0,
      current: 0,
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
    this.geometry = new Plane(this.gl, 256, 256)
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
    each(this.medias, media => media.show())
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
    this.galleryBounds = this.galleryElement.getBoundingClientRect()

    this.sizes = event.sizes

    this.gallerySizes = {
      width: this.galleryBounds.width / window.innerWidth * this.sizes.width,
      height: this.galleryBounds.height / window.innerHeight * this.sizes.height
    }

    this.scroll.x = this.x.target = 0
    this.scroll.y = this.y.target = 0

    each(this.medias, media => media.onResize(event, this.scroll))
  }

  onTouchDown({x, y})
  {
    this.speed.target = 1

    this.scrollCurrent.x = this.scroll.x
    this.scrollCurrent.y = this.scroll.y
  }

  onTouchMove({x, y})
  {
    this.x.target = this.scrollCurrent.x - x.distance
    this.y.target = this.scrollCurrent.y - y.distance
  }

  onTouchUp({x, y})
  {
    this.speed.target = 0
  }

  onWheel({ pixelX, pixelY })
  {
    this.x.target += pixelX
    this.y.target += pixelY
  }

  /**
   * Update
   */
  update()
  {
    const deltaX = this.x.target - this.x.current
    const deltaY = this.y.target - this.y.current

    this.speed.target = Math.sqrt(deltaX * deltaX + deltaY * deltaY) * 0.0025

    this.speed.current = GSAP.utils.interpolate(this.speed.current, this.speed.target, this.speed.lerp)

    this.x.current = GSAP.utils.interpolate(this.x.current, this.x.target, this.x.lerp)
    this.y.current = GSAP.utils.interpolate(this.y.current, this.y.target, this.y.lerp)


    if (this.scroll.x > this.x.current) {
      this.x.direction = 'left'
    } else if (this.scroll.x < this.x.current) {
      this.x.direction = 'right'
    }

    if (this.scroll.y < this.y.current) {
      this.y.direction = 'top'
    } else if (this.scroll.y > this.y.current) {
      this.y.direction = 'bottom'
    }

    this.scroll.x = this.x.current
    this.scroll.y = this.y.current



    each(this.medias, (media, index) => {
      const scaleX = media.mesh.scale.x / 2

      if (this.x.direction === 'left') {
        const x = media.mesh.position.x + scaleX

        if(x < -this.sizes.width / 2) {
          media.extra.x += this.gallerySizes.width
        }
      } else if (this.x.direction === 'right' ) {
        const x = media.mesh.position.x - scaleX

        if (x > this.sizes.width / 2) {
          media.extra.x -= this.gallerySizes.width
        }
      }

      const scaleY = media.mesh.scale.y / 2

      if (this.y.direction === 'top') {
        const y = media.mesh.position.y - scaleY

        if(y < -this.sizes.width / 2) {
          media.extra.y += this.gallerySizes.height
        }
      } else if (this.y.direction === 'bottom' ) {
        const y = media.mesh.position.y + scaleY

        if (y > this.sizes.width / 2) {
          media.extra.y -= this.gallerySizes.height
        }
      }

      media.update(this.scroll, this.speed.current)
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
