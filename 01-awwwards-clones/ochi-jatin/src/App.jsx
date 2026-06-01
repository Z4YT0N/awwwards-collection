import React from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Mraquee from './components/Mraquee'
import About from './components/About'
import Eyes from './components/Eyes'
import Features from './components/Features'
import Cards from './components/Cards'
import Footer from './components/Footer'
import LocomotiveScroll from 'locomotive-scroll';



function App() {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className='w-full min-h-screen text-white bg-zinc-900'>
      <Navbar/>
      <LandingPage/>
      <Mraquee/>
      <About/>
      <Eyes/>
      <Features/>
      <Cards/>
      <Footer/>
      
    </div>
  )
}

export default App
