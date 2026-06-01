import GSAP from 'gsap'
import Animation from 'classes/Animation'
import { split, calculate } from 'utils/text'
// import { each } from 'lodash'

export default class Paragraph extends Animation {
  constructor({ element, elements}) {
    super({
      element,
      elements
    })

    this.elementLinesSpans = split({
      append: true,
      element: this.element
    })
  }

  animateIn()
  {
    this.timelineIn = GSAP.timeline({
      delay: 0.5
    })

    this.timelineIn.to(this.element, {
      autoAlpha: 1,
      duration: 1
    })

    // each(this.elementLines, (line, index) => {
    //   this.timelineIn.fromTo(line, {
    //     autoAlpha: 0,
    //     y: '100%'
    //   }, {
    //     autoAlpha: 1,
    //     delay: index * 0.2,
    //     duration: 1.5,
    //     ease: 'expo.out',
    //     y: '0%'
    //   }, 0)
    // })
  }

  animateOut()
  {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }

  // onResize()
  // {
  //   this.elementLines = calculate(this.elementLinesSpans)
  // }
}
