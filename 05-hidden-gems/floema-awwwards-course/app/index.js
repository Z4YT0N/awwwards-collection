import { each } from 'lodash'
import NormalizeWheel from 'normalize-wheel'

import Detection from 'classes/Detection'
import Canvas from 'components/Canvas'

import About from 'pages/about'
import Collections from 'pages/collections'
import Detail from 'pages/detail'
import Home from 'pages/home'

import Preloader from 'components/Preloader'
import Navigation from 'components/Navigation'

class App {
  constructor()
  {
    this.createContent()

    this.createCanvas()
    this.createPreloader()
    this.createPages()
    this.createNavigation()

    this.addEventListeners()
    this.addLinkListeners()

    this.onResize()

    this.update()
  }

  createNavigation()
  {
    this.navigation = new Navigation({
      template: this.template
    })
  }

  createPreloader()
  {
    this.preloader = new Preloader({ canvas: this.canvas })
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  createCanvas()
  {
    this.canvas = new Canvas({
      template: this.template
    })
  }

  createContent()
  {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPages()
  {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      detail: new Detail(),
      home: new Home(),
    }

    this.page = this.pages[this.template]
    this.page.create()

    this.onResize()
  }

   /**
   * Events
   */
  onPreloaded()
  {
    this.onResize()
    this.canvas.onPreloaded()
    this.page.show()
  }

  onPopState()
  {
    this.onChange({
      url: window.location.pathname,
      push: false
    })
  }

  async onChange({ url, push = true})
  {
    this.canvas.onChangeStart(this.template, url)
    this.page.hide()

    const request = await window.fetch(url)

    if (request.status === 200) {
      const html = await request.text()
      const div = document.createElement('div')

      if (push) {
        window.history.pushState({}, '', url)
      }

      div.innerHTML = html

      const divContent = div.querySelector('.content')
      this.template = divContent.getAttribute('data-template')

      this.navigation.onChange(this.template)

      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML

      this.canvas.onChangeEnd(this.template)

      this.page = this.pages[this.template]

      this.page.create()
      this.onResize()

      this.page.show()


      this.addLinkListeners()
    } else {
      console.log('Error')
    }
  }

  onResize()
  {
    if (this.canvas && this.canvas.onResize){
      this.canvas.onResize()
    }

    if(this.page && this.page.onResize) {
      this.page.onResize()
    }
  }

  onTouchDown(event)
  {
    if (this.canvas && this.canvas.onTouchDown) {
      this.canvas.onTouchDown(event)
    }
  }

  onTouchMove(event)
  {
    if (this.canvas && this.canvas.onTouchMove) {
      this.canvas.onTouchMove(event)
    }
  }

  onTouchUp(event)
  {
    if (this.canvas && this.canvas.onTouchUp) {
      this.canvas.onTouchUp(event)
    }
  }

  onWheel(event)
  {
    const normalizedWheel = NormalizeWheel(event)

    if (this.page && this.page.onWheel) {
      this.page.onWheel(normalizedWheel)
    }

    if (this.canvas && this.canvas.onWheel) {
      this.canvas.onWheel(normalizedWheel)
    }
  }

  /**
   * Loop
   */
  update()
  {
    if (this.page && this.page.update)
    {
      this.page.update()
    }

    if (this.canvas && this.canvas.update)
    {
      this.canvas.update(this.page.scroll)
    }

    window.requestAnimationFrame(this.update.bind(this))
  }

  /**
   * Listeners
   */
  addEventListeners ()
  {
    window.addEventListener('mousewheel', this.onWheel.bind(this))

    window.addEventListener('mousedown', this.onTouchDown.bind(this))
    window.addEventListener('mousemove', this.onTouchMove.bind(this))
    window.addEventListener('mouseup', this.onTouchUp.bind(this))

    window.addEventListener('touchstart', this.onTouchDown.bind(this))
    window.addEventListener('touchmove', this.onTouchMove.bind(this))
    window.addEventListener('touchup', this.onTouchUp.bind(this))

    window.addEventListener('popstate', this.onPopState.bind(this))
    window.addEventListener('resize', this.onResize.bind(this))
  }

  addLinkListeners ()
  {
    const links = document.querySelectorAll('a')

    each(links, link => {
      link.onclick = event => {
        event.preventDefault()

        const {  href  } = link

        this.onChange({ url: href })
      }
    })
  }
}

new App()
