import { onMount, For } from 'solid-js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Features() {
  let sectionRef
  let headingRef
  let cardsRef = []
  
  const features = [
    {
      icon: `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>`,
      title: '3D Glass Panels',
      description: 'Real-time rendered glass surfaces with physically accurate light refraction and prismatic effects.',
      color: 'from-prism-violet to-prism-blue'
    },
    {
      icon: `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>`,
      title: 'Magnetic Cursor',
      description: 'Interactive cursor that creates gravitational pull on nearby elements for an immersive experience.',
      color: 'from-prism-blue to-prism-cyan'
    },
    {
      icon: `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>`,
      title: 'Scroll Animations',
      description: 'Buttery smooth scroll-triggered animations powered by GSAP ScrollTrigger for seamless transitions.',
      color: 'from-prism-cyan to-prism-emerald'
    },
    {
      icon: `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>`,
      title: 'Prismatic Colors',
      description: 'Dynamic color shifting based on view angle, creating rainbow spectral effects like real light dispersion.',
      color: 'from-prism-emerald to-prism-amber'
    },
    {
      icon: `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>`,
      title: 'Responsive Design',
      description: 'Perfectly adapted for all devices with performance optimizations for mobile and reduced motion support.',
      color: 'from-prism-amber to-prism-rose'
    },
    {
      icon: `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>`,
      title: 'Modern Stack',
      description: 'Built with Solid.js for lightning-fast reactivity, Three.js for 3D, and Tailwind CSS for styling.',
      color: 'from-prism-rose to-prism-violet'
    }
  ]
  
  onMount(() => {
    // Heading animation
    gsap.fromTo(
      headingRef.children,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
    
    // Cards animation
    cardsRef.forEach((card, i) => {
      gsap.fromTo(
        card,
        { 
          y: 80, 
          opacity: 0,
          rotateY: -15
        },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
  })
  
  return (
    <section
      ref={sectionRef}
      id="features"
      class="relative py-32 px-6"
    >
      <div class="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headingRef} class="text-center mb-20">
          <span class="inline-block px-4 py-1 rounded-full bg-glass-100 border border-glass-200 text-sm text-prism-cyan mb-4">
            Features
          </span>
          <h2 class="section-heading mb-4">
            Crafted with <span class="text-gradient">Precision</span>
          </h2>
          <p class="text-lg text-white/60 max-w-2xl mx-auto">
            Every detail is meticulously designed to create an unforgettable 
            experience that pushes the boundaries of web technology.
          </p>
        </div>
        
        {/* Feature Cards Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
          <For each={features}>
            {(feature, i) => (
              <div
                ref={(el) => cardsRef[i()] = el}
                class="glass-panel prism-border p-8 group hover:-translate-y-2 transition-all duration-500 preserve-3d"
              >
                {/* Icon */}
                <div class={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <div class="text-white" innerHTML={feature.icon} />
                </div>
                
                {/* Content */}
                <h3 class="text-xl font-display font-semibold mb-3 text-white group-hover:text-prism-cyan transition-colors duration-300">
                  {feature.title}
                </h3>
                <p class="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover Arrow - FIXED: visible colors */}
                <div class="mt-6 flex items-center gap-2 text-white/40 opacity-0 group-hover:opacity-100 group-hover:text-prism-cyan transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                  <span class="text-sm font-medium">Learn more</span>
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  )
}
