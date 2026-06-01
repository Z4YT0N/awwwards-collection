import React from 'react'  
import Nav from './components/Nav'
import LandingPage from './components/LandingPage'
import Marquee from './components/Marquee'
import About from './components/About'
import Playfull from './components/Playfull'
import Featured from './components/Featured'
import Cards from './components/Cards'
import Footer from './components/Footer'
import StartProject from './components/StartProject'
import LocomotiveScroll from 'locomotive-scroll';

function App() {
  const locomotiveScroll = new LocomotiveScroll();

  return (
    <>
      <div className='w-full overflow-hidden'>
        <Nav />
        <LandingPage />
        <Marquee />
        <About />
        <Playfull />
        <Featured />
        <Cards />
        <StartProject />
        <Footer />
      </div>
    
    </>
  )
}

export default App