import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import gsap from 'gsap'

import CaseStudies from './pages/caseStudies'
import Approach from './pages/approach'
import Services from './pages/services'
import About from './pages/about'
import Header from './components/header'
import Home from './pages/home'
import Navigation from './components/navigation'

import './styles/App.scss'

const routes = [
  {
    path: '/',
    name: 'Home',
    Component: Home,
  },
  {
    path: '/case-studies',
    name: 'Case Studies',
    Component: CaseStudies,
  },
  {
    path: '/approach',
    name: 'Approach',
    Component: Approach,
  },
  {
    path: '/services',
    name: 'Services',
    Component: Services,
  },
  {
    path: '/abou-us',
    name: 'About us',
    Component: About,
  },
]

function debounce(fn, ms) {
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  }
}

function App() {
  gsap.to('body', 0, { css: { visibility: 'visible' } })

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  useEffect(() => {
    let vh = dimensions.height * 0.01
    document.documentElement.style.setProperty('vh', `${vh}px`)

    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }, 1000)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [dimensions])
  return (
    <>
      <Header dimensions={dimensions} />
      <div className="App">
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path} component={Component}>
            <Component />
          </Route>
        ))}
      </div>
      <Navigation />
    </>
  )
}

export default App
