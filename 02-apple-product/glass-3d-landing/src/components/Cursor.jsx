import { onMount, onCleanup, createSignal } from 'solid-js'
import { gsap } from 'gsap'

export default function Cursor(props) {
  let cursorRef
  let cursorDotRef
  
  const [isHovering, setIsHovering] = createSignal(false)
  const [isPointer, setIsPointer] = createSignal(false)
  
  onMount(() => {
    // Check for touch device
    if ('ontouchstart' in window) {
      cursorRef.style.display = 'none'
      cursorDotRef.style.display = 'none'
      return
    }
    
    const handleMouseMove = (e) => {
      gsap.to(cursorRef, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out'
      })
      
      gsap.to(cursorDotRef, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      })
    }
    
    const handleMouseEnter = (e) => {
      const target = e.target
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true)
        setIsPointer(true)
      }
    }
    
    const handleMouseLeave = () => {
      setIsHovering(false)
      setIsPointer(false)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)
    
    onCleanup(() => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
    })
  })
  
  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        class={`fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 pointer-events-none z-[9999] rounded-full border transition-all duration-300 ${
          isHovering()
            ? 'w-16 h-16 -ml-8 -mt-8 border-prism-cyan bg-prism-cyan/10'
            : 'border-white/30'
        }`}
        style={{ 'mix-blend-mode': 'difference' }}
      />
      
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        class={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 pointer-events-none z-[9999] rounded-full bg-white transition-all duration-200 ${
          isHovering() ? 'scale-0' : 'scale-100'
        }`}
        style={{ 'mix-blend-mode': 'difference' }}
      />
    </>
  )
}
