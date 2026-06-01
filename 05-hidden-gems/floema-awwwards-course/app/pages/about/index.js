import Page from 'classes/Page'

export default class About extends Page {
  constructor()
  {
    super({
      id: 'about',
      element: '.about',
      elements: {
        navigaton: document.querySelector('.navigation'),
        wrapper: '.about__wrapper',
        title: '.about__title'
      }
    })
  }
}
