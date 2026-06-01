'use client'
import type { ReactNode } from 'react'
import React, { useEffect, useRef } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  duration?: number
}

/** 组件出现在视口时添加渐入动画，离开视口时添加渐出动画 */
export function SlideIn({ children, delay = 0, duration = 0.6 }: Props) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element)
      return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.animation = `slide-in ${duration}s ease ${delay}s forwards`
          observer.unobserve(element)
        }
      },
      { threshold: 0, rootMargin: '-150px' },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [delay, duration])

  return (
    <div ref={elementRef} className="slide-in-hidden">
      {children}
    </div>
  )
}
