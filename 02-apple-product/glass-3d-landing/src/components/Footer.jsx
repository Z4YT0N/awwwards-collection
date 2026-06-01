import { onMount } from 'solid-js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  let footerRef
  
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/smart-developer1791', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
    { name: 'Twitter', href: '#', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
    { name: 'LinkedIn', href: '#', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' }
  ]
  
  onMount(() => {
    gsap.fromTo(
      footerRef,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef,
          start: 'top 95%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })
  
  return (
    <footer ref={footerRef} class="relative py-16 px-6 border-t border-glass-100">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div class="flex flex-col items-center md:items-start gap-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8">
                <svg viewBox="0 0 40 40" class="w-full h-full">
                  <defs>
                    <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#8B5CF6" />
                      <stop offset="50%" stop-color="#06B6D4" />
                      <stop offset="100%" stop-color="#10B981" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="20,2 38,12 38,28 20,38 2,28 2,12"
                    fill="url(#footerLogoGradient)"
                  />
                  <polygon
                    points="20,8 32,15 32,25 20,32 8,25 8,15"
                    fill="rgba(255,255,255,0.2)"
                  />
                </svg>
              </div>
              <span class="text-lg font-display font-bold text-gradient">
                DimensionalGlass
              </span>
            </div>
            
            <p class="text-sm text-white/40">
              © {new Date().getFullYear()} Dimensional Glass. All rights reserved.
            </p>
          </div>
          
          {/* Social Links */}
          <div class="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-xl bg-glass-50 border border-glass-200 flex items-center justify-center hover:bg-glass-100 hover:border-prism-cyan transition-all duration-300 hover:scale-110 group"
                title={link.name}
              >
                <svg
                  class="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={link.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        
        {/* Bottom Tagline */}
        <div class="mt-12 pt-8 border-t border-glass-50 text-center">
          <p class="text-sm text-white/30">
            Refracted through prismatic code • Forged with Solid.js, Three.js & endless ☕
          </p>
        </div>
      </div>
    </footer>
  )
}
