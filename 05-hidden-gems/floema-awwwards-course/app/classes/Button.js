import GSAP from 'gsap'
import Component from 'classes/Component'

export default class Button extends Component {
  constructor({element})
  {
    super({ element })

    this.path = element.querySelector('path:last-child')
    this.pathLenght = this.path.getTotalLength()

    this.timeline = GSAP.timeline({ paused: true })

    this.timeline.fromTo(this.path, {
      strokeDashoffset: this.pathLenght,
      strokeDasharray: `${this.pathLenght} ${this.pathLenght}`
    }, {
      strokeDashoffset: 0,
      strokeDasharray: `${this.pathLenght} ${this.pathLenght}`
    })
  }

  onMouseEnter()
  {
    this.timeline.play()
  }

  onMouseLeave()
  {
    this.timeline.reverse()
  }

  addEventListeners()
  {
    this.onMouseEnterEvent = this.onMouseEnter.bind(this)
    this.onMouseLeaveEvent = this.onMouseLeave.bind(this)

    this.element.addEventListener('mouseenter', this.onMouseEnterEvent)
    this.element.addEventListener('mouseleave', this.onMouseLeaveEvent)
  }

  removeEventListeners()
  {
    this.element.removeEventListener('mouseenter', this.onMouseEnterEvent)
    this.element.removeEventListener('mouseleave', this.onMouseLeaveEvent)
  }
}
