import { onMount, createSignal } from 'solid-js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  let sectionRef
  let formRef
  let infoRef
  
  const [formData, setFormData] = createSignal({
    name: '',
    email: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = createSignal(false)
  const [submitted, setSubmitted] = createSignal(false)
  
  onMount(() => {
    gsap.fromTo(
      [infoRef, formRef],
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset after showing success
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  return (
    <section
      ref={sectionRef}
      id="contact"
      class="relative py-32 px-6"
    >
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Info Side */}
          <div ref={infoRef}>
            <span class="inline-block px-4 py-1 rounded-full bg-glass-100 border border-glass-200 text-sm text-prism-emerald mb-4">
              Get in Touch
            </span>
            
            <h2 class="section-heading mb-6">
              Let's Create <br />
              <span class="text-gradient">Something Amazing</span>
            </h2>
            
            <p class="text-lg text-white/60 mb-10 leading-relaxed">
              Ready to bring your vision to life with stunning 3D experiences? 
              Reach out and let's discuss how we can transform your digital presence.
            </p>
            
            {/* Contact Info */}
            <div class="space-y-6">
              <div class="flex items-center gap-4 group">
                <div class="w-12 h-12 rounded-xl bg-glass-100 border border-glass-200 flex items-center justify-center group-hover:border-prism-violet transition-colors duration-300">
                  <svg class="w-5 h-5 text-prism-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-white/40">Email</p>
                  <p class="text-white font-medium">hello@dimensional.glass</p>
                </div>
              </div>
              
              <div class="flex items-center gap-4 group">
                <div class="w-12 h-12 rounded-xl bg-glass-100 border border-glass-200 flex items-center justify-center group-hover:border-prism-cyan transition-colors duration-300">
                  <svg class="w-5 h-5 text-prism-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-white/40">Location</p>
                  <p class="text-white font-medium">The Digital Realm</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form Side */}
          <div ref={formRef}>
            <form
              onSubmit={handleSubmit}
              class="glass-panel prism-border p-8 md:p-10 space-y-6"
            >
              {submitted() ? (
                <div class="py-12 text-center">
                  <div class="w-16 h-16 rounded-full bg-gradient-to-br from-prism-emerald to-prism-cyan mx-auto mb-6 flex items-center justify-center">
                    <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 class="text-2xl font-display font-semibold mb-2">Message Sent!</h3>
                  <p class="text-white/60">We'll get back to you shortly.</p>
                </div>
              ) : (
                <>
                  {/* Name Input */}
                  <div class="relative">
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData().name}
                      onInput={(e) => handleInputChange('name', e.target.value)}
                      class="input-glass peer"
                      placeholder=" "
                    />
                    <label
                      for="name"
                      class="absolute left-4 top-3 text-white/40 transition-all duration-300 pointer-events-none peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-prism-cyan peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:text-xs"
                    >
                      Your Name
                    </label>
                  </div>
                  
                  {/* Email Input */}
                  <div class="relative">
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData().email}
                      onInput={(e) => handleInputChange('email', e.target.value)}
                      class="input-glass peer"
                      placeholder=" "
                    />
                    <label
                      for="email"
                      class="absolute left-4 top-3 text-white/40 transition-all duration-300 pointer-events-none peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-prism-cyan peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:text-xs"
                    >
                      Email Address
                    </label>
                  </div>
                  
                  {/* Message Textarea */}
                  <div class="relative">
                    <textarea
                      id="message"
                      rows="4"
                      required
                      value={formData().message}
                      onInput={(e) => handleInputChange('message', e.target.value)}
                      class="input-glass resize-none peer"
                      placeholder=" "
                    />
                    <label
                      for="message"
                      class="absolute left-4 top-3 text-white/40 transition-all duration-300 pointer-events-none peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-prism-cyan peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:text-xs"
                    >
                      Your Message
                    </label>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting()}
                    class="w-full magnetic-button disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting() ? (
                      <span class="flex items-center justify-center gap-2">
                        <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span class="flex items-center justify-center gap-2">
                        Send Message
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </span>
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
