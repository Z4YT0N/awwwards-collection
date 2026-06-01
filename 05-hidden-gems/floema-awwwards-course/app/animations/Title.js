import GSAP from 'gsap'
import Animation from 'classes/Animation'
import { split, calculate } from 'utils/text'
import { each } from 'lodash'

export default class Title extends Animation {
  constructor({ element, elements}) {
    super({
      element,
      elements
    })

    split({ element: this.element, append: true})
    split({ element: this.element, append: true})

    this.elementLinesSpans = this.element.querySelectorAll('span span')

  }

  animateIn()
  {
    return new Promise(resolve => {
      this.timelineIn = GSAP.timeline({
        delay: 0.5
      })

      this.timelineIn.set(this.element, {
        autoAlpha: 1,
        duration: 1
      })

      each(this.elementLines, (line, index) => {
        this.timelineIn.fromTo(line, {
          y: '100%'
        }, {
          delay: index * 0.2,
          duration: 1.5,
          ease: 'expo.out',
          y: '0%'
        }, 0)
      })

      this.timelineIn.call(_ => {
        resolve()
      })
    })
  }

  animateOut()
  {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }

  onResize()
  {
    this.elementLines = calculate(this.elementLinesSpans)
  }
}
