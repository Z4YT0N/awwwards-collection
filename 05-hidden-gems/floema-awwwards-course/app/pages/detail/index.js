import Page from 'classes/Page'
import Button from 'classes/Button'
import GSAP from 'gsap'

export default class Details extends Page  {
  constructor()
  {
    super({
      id: 'detail',

      element: '.detail',
      elements: {
        navigation: document.querySelector('.navigation'),
        button: '.detail__button'
      }
    })
  }

  create()
  {
    super.create()

    this.button = new Button({
      element: this.elements.button
    })
  }

  show() {
    const timeline = GSAP.timeline({
      delay: 2
    })

    timeline.fromTo(this.element, {
      autoAlpha: 0,
    }, {
      autoAlpha: 1
    })

    super.show(timeline)
  }

  destroy()
  {
    super.destroy()
    this.button.removeEventListeners()
  }
}
