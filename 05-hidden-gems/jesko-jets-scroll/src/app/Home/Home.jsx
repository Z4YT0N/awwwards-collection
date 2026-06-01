import Hero from '@/components/Hero'
import HeroContent from '@/components/HeroContent'
import React from 'react'

const Home = () => {
    return (
        <div className="">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-black/40 to-transparent" />

            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-black/40 to-transparent" />

            <Hero />
            <HeroContent />
        </div>
    )
}

export default Home