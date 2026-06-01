import { onMount, createSignal } from 'solid-js'
import { gsap } from 'gsap'

export default function Header() {
  const [isScrolled, setIsScrolled] = createSignal(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = createSignal(false)
  
  let headerRef
  let logoRef
  let navItemsRef = []
  
  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'Contact', href: '#contact' }
  ]
  
  onMount(() => {
    // Animate header on load
    gsap.fromTo(
      headerRef,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    )
    
    gsap.fromTo(
      logoRef,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.7 }
    )
    
    navItemsRef.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.9 + i * 0.1 }
      )
    })
    
    // Scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => window.removeEventListener('scroll', handleScroll)
  })
  
  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      // Use native smooth scrolling instead of GSAP ScrollToPlugin
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80
      
      // Animate with GSAP using a proxy object
      const scrollObj = { y: window.pageYOffset }
      gsap.to(scrollObj, {
        y: offsetTop,
        duration: 1.2,
        ease: 'power3.inOut',
        onUpdate: () => {
          window.scrollTo(0, scrollObj.y)
        }
      })
    }
    setIsMobileMenuOpen(false)
  }
  
  return (
    <header
      ref={headerRef}
      class={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled() 
          ? 'py-3 backdrop-blur-xl bg-glass-50 border-b border-glass-100' 
          : 'py-6'
      }`}
    >
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between">
          {/* Logo */}
          <a
            ref={logoRef}
            href="#hero"
            class="flex items-center gap-3 group"
            onClick={(e) => handleNavClick(e, '#hero')}
          >
            <div class="relative w-10 h-10">
              <svg viewBox="0 0 40 40" class="w-full h-full">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#8B5CF6" />
                    <stop offset="50%" stop-color="#06B6D4" />
                    <stop offset="100%" stop-color="#10B981" />
                  </linearGradient>
                </defs>
                <polygon
                  points="20,2 38,12 38,28 20,38 2,28 2,12"
                  fill="url(#logoGradient)"
                  class="transition-all duration-300 group-hover:opacity-80"
                />
                <polygon
                  points="20,8 32,15 32,25 20,32 8,25 8,15"
                  fill="rgba(255,255,255,0.2)"
                />
              </svg>
              <div class="absolute inset-0 bg-prism-violet/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span class="text-xl font-display font-bold text-gradient">
              DimensionalGlass
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <nav class="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <a
                ref={(el) => navItemsRef[i] = el}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                class="relative text-white/70 hover:text-white transition-colors duration-300 font-medium group"
              >
                {item.label}
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-prism-violet to-prism-cyan group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            
            <button class="magnetic-button text-sm">
              Get Started
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            class="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen())}
          >
            <div class="w-6 flex flex-col gap-1.5">
              <span
                class={`w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen() ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                class={`w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen() ? 'opacity-0' : ''
                }`}
              />
              <span
                class={`w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen() ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div
          class={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen() ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <nav class="glass-panel p-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                class="text-white/80 hover:text-white transition-colors py-2 border-b border-glass-100 last:border-0"
              >
                {item.label}
              </a>
            ))}
            <button class="magnetic-button mt-2">
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
