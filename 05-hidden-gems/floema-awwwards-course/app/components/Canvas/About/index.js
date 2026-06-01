import { Plane, Transform } from 'ogl'
import Gallery from './Gallery'

import { each, map } from 'lodash'

export default class About {
  constructor({ gl, scene, sizes })
  {
    this.gl = gl
    this.sizes = sizes
    this.group = new Transform()
    this.group.setParent(scene)


    this.createGeometry()
    this.createGalleries()
    this.onResize({
      sizes: this.sizes
    })

    this.show()
  }

  createGeometry()
  {
    this.geometry = new Plane(this.gl)
  }

  createGalleries()
  {
    this.galleriesElements = document.querySelectorAll('.about__gallery')


    this.galleries = map(this.galleriesElements, (element, index) => {
      return new Gallery({
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
    each(this.galleries, gallery => gallery.show())
  }

  hide()
  {
    each(this.galleries, gallery => gallery.hide())
  }

  /**
   * Events
   */
  onResize(event)
  {
    each(this.galleries, gallery => gallery.onResize(event))
  }

  onTouchDown(event)
  {
    each(this.galleries, gallery => gallery.onTouchDown(event))

  }

  onTouchMove(event)
  {
    each(this.galleries, gallery => gallery.onTouchMove(event))
  }

  onTouchUp(event)
  {
    each(this.galleries, gallery => gallery.onTouchUp(event))
  }

  onWheel({ pixelX, pixelY })
  {

  }

  /**
   * Update
   */
  update(scroll)
  {

    each(this.galleries, (gallery) => {
      gallery.update(scroll)
    })
  }

  /**
   * Destroy
   */
  destroy()
  {
    map(this.galleries, gallery => gallery.destroy())
  }
}
