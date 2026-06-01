import { Transform } from 'ogl'
import Media from './Media'
import { map, each } from 'lodash'
import GSAP from 'gsap'

export default class Gallery {
  constructor({
    element,
    index,
    gl,
    geometry,
    scene,
    sizes,
  })
  {
    this.element = element
    this.elementWrapper = this.element.querySelector('.about__gallery__wrapper')
    this.index = index
    this.gl = gl
    this.geometry = geometry
    this.scene = scene
    this.sizes = sizes

    this.group = new Transform()
    this.group.setParent(this.scene)

    this.scroll = {
      current: 0,
      target: 0,
      start: 0,
      velocity: 0.5,
      lerp: 0.1
    }

    this.createMedias()
    this.onResize({
      sizes: this.sizes
    })

  }

  createMedias()
  {
    this.mediasElements = this.element.querySelectorAll('.about__gallery__media')

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
    this.bounds = this.elementWrapper.getBoundingClientRect()

    this.sizes = event.sizes

    this.width = this.bounds.width / window.innerWidth * this.sizes.width,

    this.scroll.current = this.scroll.target = 0

    each(this.medias, media => media.onResize(event, this.scroll.current))
  }

  onTouchDown()
  {
    this.scroll.start = this.scroll.current
  }

  onTouchMove({x})
  {
    this.scroll.target = this.scroll.current - x.distance
  }

  onTouchUp()
  {

  }

  /**
   * Update
   */

  update(scroll)
  {

    const distance = scroll.current - scroll.target
    const y = scroll.current / window.innerHeight

    if (this.scroll.current > this.scroll.target) {
      this.direction = 'left'
      this.scroll.velocity = -0.5
    } else if (this.scroll.current < this.scroll.target) {
      this.direction = 'right'
      this.scroll.velocity = 0.5
    }

    this.scroll.target += this.scroll.velocity
    this.scroll.target += distance * 0.1

    this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, this.scroll.lerp)

    each(this.medias, (media, index) => {
      const scaleX = media.mesh.scale.x / 2 + 0.25

      if (this.direction === 'left') {
        const x = media.mesh.position.x + scaleX

        if(x < -this.sizes.width / 2) {
          media.extra += this.width
        }
      } else if (this.direction === 'right' ) {
        const x = media.mesh.position.x - scaleX

        if (x > this.sizes.width / 2) {
          media.extra -= this.width
        }
      }


      media.update(this.scroll.current)
    })

    this.group.position.y = y * this.sizes.height
  }

  /**
   * Destroy
   */
  destroy()
  {
    this.scene.removeChild(this.group)
  }
}
