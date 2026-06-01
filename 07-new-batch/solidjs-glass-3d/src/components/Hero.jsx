import { onMount } from 'solid-js'
import { gsap } from 'gsap'

export default function Hero(props) {
  let heroRef
  let headingRef
  let subheadingRef
  let ctaRef
  let decorRef
  let scrollIndicatorRef
  
  onMount(() => {
    // Wait for load signal
    const initAnimations = () => {
      const tl = gsap.timeline({ delay: 0.3 })
      
      tl.fromTo(
        headingRef.querySelectorAll('.word'),
        { 
          y: 100, 
          opacity: 0,
          rotateX: -90
        },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out'
        }
      )
      .fromTo(
        subheadingRef,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        ctaRef.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        decorRef,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)' },
        '-=0.8'
      )
      .fromTo(
        scrollIndicatorRef,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
    }
    
    if (props.isLoaded()) {
      initAnimations()
    } else {
      const unsubscribe = setInterval(() => {
        if (props.isLoaded()) {
          clearInterval(unsubscribe)
          initAnimations()
        }
      }, 100)
    }
    
    // Parallax effect on mouse move
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      
      gsap.to(decorRef, {
        x: x * 2,
        y: y * 2,
        duration: 1,
        ease: 'power2.out'
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => window.removeEventListener('mousemove', handleMouseMove)
  })
  
  // Split text into words for animation
  const splitText = (text) => {
    return text.split(' ').map((word, i) => (
      <span class="word inline-block mr-[0.3em]" style={{ perspective: '1000px' }}>
        {word}
      </span>
    ))
  }
  
  return (
    <section
      ref={heroRef}
      id="hero"
      class="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden"
    >
      {/* Content Container */}
      <div class="max-w-6xl mx-auto text-center relative z-10">
        {/* Decorative Element */}
        <div
          ref={decorRef}
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-30"
        >
          <svg viewBox="0 0 400 400" class="w-full h-full animate-pulse-slow">
            <defs>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#8B5CF6" />
                <stop offset="50%" stop-color="#06B6D4" />
                <stop offset="100%" stop-color="#10B981" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="150" fill="none" stroke="url(#heroGradient)" stroke-width="0.5" opacity="0.5" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="url(#heroGradient)" stroke-width="0.5" opacity="0.4" />
            <circle cx="200" cy="200" r="90" fill="none" stroke="url(#heroGradient)" stroke-width="0.5" opacity="0.3" />
            <polygon points="200,50 350,200 200,350 50,200" fill="none" stroke="url(#heroGradient)" stroke-width="1" />
          </svg>
        </div>
        
        {/* Badge */}
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-100 border border-glass-200 backdrop-blur-md mb-8">
          <span class="w-2 h-2 rounded-full bg-prism-cyan animate-pulse" />
          <span class="text-sm text-white/80">Next-Gen 3D Experience</span>
        </div>
        
        {/* Main Heading */}
        <h1
          ref={headingRef}
          class="section-heading text-5xl md:text-7xl lg:text-8xl mb-6 perspective-1000"
        >
          {splitText('Dimensional')}
          <br />
          <span class="text-gradient">
            {splitText('Glass Experience')}
          </span>
        </h1>
        
        {/* Subheading */}
        <p
          ref={subheadingRef}
          class="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Immerse yourself in a world where 3D glass panels dance with light, 
          creating prismatic reflections that respond to your every move. 
          The future of web design is here.
        </p>
        
        {/* CTA Buttons */}
        <div ref={ctaRef} class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button class="magnetic-button group">
            <span class="relative z-10 flex items-center gap-2">
              Explore Now
              <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
          
          <button class="px-8 py-4 rounded-xl border border-glass-200 bg-glass-50 backdrop-blur-md text-white font-semibold hover:bg-glass-100 transition-all duration-300 hover:scale-105">
            Watch Demo
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator - FIXED: Now positioned at viewport bottom */}
      <div 
        ref={scrollIndicatorRef}
        class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div class="flex flex-col items-center gap-2 animate-float">
          <span class="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
          <div class="w-6 h-10 rounded-full border border-glass-200 flex justify-center pt-2">
            <div class="w-1 h-2 rounded-full bg-gradient-to-b from-prism-violet to-prism-cyan animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
