import { onMount, onCleanup, createSignal } from 'solid-js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DimensionalGlassBackground from './components/DimensionalGlassBackground'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cursor from './components/Cursor'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [isLoaded, setIsLoaded] = createSignal(false)
  const [mousePosition, setMousePosition] = createSignal({ x: 0, y: 0 })
  
  let appRef
  
  onMount(() => {
    // Initial loading animation
    const tl = gsap.timeline({
      onComplete: () => setIsLoaded(true)
    })
    
    tl.fromTo(
      appRef,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    )
    
    // Mouse tracking
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    // Smooth scroll setup
    gsap.config({ nullTargetWarn: false })
    
    onCleanup(() => {
      window.removeEventListener('mousemove', handleMouseMove)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    })
  })
  
  return (
    <div ref={appRef} class="relative min-h-screen overflow-hidden">
      {/* 3D Glass Background */}
      <DimensionalGlassBackground mousePosition={mousePosition} />
      
      {/* Custom Cursor */}
      <Cursor mousePosition={mousePosition} />
      
      {/* Content Layer */}
      <div class="relative z-10">
        <Header />
        <main>
          <Hero isLoaded={isLoaded} />
          <Features />
          <Contact />
        </main>
        <Footer />
      </div>
      
      {/* Prismatic Overlay */}
      <div 
        class="fixed inset-0 pointer-events-none z-20 opacity-30 mix-blend-overlay"
        style={{
          background: `
            radial-gradient(ellipse at ${50 + mousePosition().x * 10}% ${50 - mousePosition().y * 10}%, 
              rgba(139, 92, 246, 0.15) 0%, 
              transparent 50%
            )
          `
        }}
      />
    </div>
  )
}
