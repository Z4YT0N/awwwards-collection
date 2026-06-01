"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TextGenerateEffect, FlipWords } from "@/components/text/text-generate";
import { CharacterReveal } from "@/components/text/text-reveal";
import { GradientText } from "@/components/text/gradient-text";
import { FadeIn, ScrollProgress, TextParallax } from "@/components/scroll";
import { GradientBlob } from "@/components/backgrounds/gradient-blur";
import { TiltCard, GlowCard } from "@/components/cards";
import {
  MagneticButton,
  OutlineDrawButton,
  InvertButton,
} from "@/components/effects/magnetic-button";
import {
  Hamburger,
  FullScreenNav,
  StickyHeader,
  AnimatedNavLink,
  MagneticNavItem,
} from "@/components/navigation";
import {
  SlideReveal,
  MaskReveal,
  PageStagger,
  PageStaggerChild,
} from "@/components/transitions";

const FloatingShapes = dynamic(
  () => import("@/components/three/floating-shapes").then((mod) => mod.FloatingShapes),
  { ssr: false }
);

// Demo data
const projects = [
  {
    title: "Lumina Brand",
    category: "Branding",
    year: "2024",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    title: "Nexus Platform",
    category: "Web Design",
    year: "2024",
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    title: "Apex Studios",
    category: "Identity",
    year: "2023",
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    title: "Echo Commerce",
    category: "E-Commerce",
    year: "2023",
    image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
];

const services = [
  { number: "01", title: "Brand Strategy", description: "We craft compelling brand narratives that resonate with your audience and drive business growth." },
  { number: "02", title: "Digital Design", description: "Award-winning interfaces that blend aesthetics with functionality for memorable experiences." },
  { number: "03", title: "Development", description: "Cutting-edge web applications built with modern technologies and best practices." },
  { number: "04", title: "Motion Design", description: "Dynamic animations and interactions that bring your digital presence to life." },
];

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function AgencyDemo() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="relative bg-[#0a0a0a] text-white overflow-hidden">
      <ScrollProgress />

      {/* Navigation */}
      <StickyHeader className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <MagneticNavItem href="/" className="text-2xl font-bold tracking-tighter">
            <GradientText gradient="from-white to-zinc-400">STUDIO</GradientText>
          </MagneticNavItem>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <AnimatedNavLink key={link.href} href={link.href} variant="underline" className="text-sm uppercase tracking-wider">
                {link.label}
              </AnimatedNavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <InvertButton className="hidden md:block text-sm">Start Project</InvertButton>
            <Hamburger
              isOpen={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              variant="rotate"
              className="md:hidden"
            />
          </div>
        </div>
      </StickyHeader>

      <FullScreenNav
        links={navLinks}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        bgColor="#0a0a0a"
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 opacity-30">
          <FloatingShapes preset="minimal" />
        </div>

        <GradientBlob
          colors={["#4f46e5", "#7c3aed"]}
          className="top-1/4 left-1/4"
          size="xl"
          blur={200}
        />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="text-zinc-500 uppercase tracking-[0.3em] text-sm">
              Digital Design Studio
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tighter mb-8">
            <TextGenerateEffect words="We Create Digital Experiences" className="text-white" />
          </h1>

          <motion.p
            className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Award-winning studio crafting{" "}
            <FlipWords
              words={["brands", "websites", "experiences", "stories"]}
              className="text-white"
            />{" "}
            that matter.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <MagneticButton className="px-8 py-4 text-lg">View Our Work</MagneticButton>
            <OutlineDrawButton className="px-8 py-4 text-lg">Get in Touch</OutlineDrawButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 bg-white rounded-full"
              animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Scrolling Text */}
      <TextParallax text="SELECTED WORK" />

      {/* Projects Section */}
      <section id="work" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <FadeIn key={project.title} delay={i * 0.1}>
                <TiltCard className="group cursor-pointer">
                  <div
                    className="aspect-[4/3] rounded-xl mb-6"
                    style={{ background: project.image }}
                  />
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-1 group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-zinc-500">{project.category}</p>
                    </div>
                    <span className="text-zinc-600">{project.year}</span>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-16">
            <OutlineDrawButton className="text-lg">View All Projects</OutlineDrawButton>
          </FadeIn>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-4 block">
              What We Do
            </span>
            <h2 className="text-5xl md:text-7xl font-bold mb-20">
              <CharacterReveal text="Our Services" />
            </h2>
          </FadeIn>

          <div className="space-y-0">
            {services.map((service, i) => (
              <FadeIn key={service.number} delay={i * 0.1}>
                <div className="group border-t border-zinc-800 py-12 cursor-pointer hover:bg-zinc-900/50 transition-colors px-4 -mx-4">
                  <div className="flex items-start gap-8">
                    <span className="text-zinc-600 text-sm font-mono">{service.number}</span>
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-zinc-500 max-w-xl text-lg">
                        {service.description}
                      </p>
                    </div>
                    <motion.div
                      className="text-4xl text-zinc-700 group-hover:text-white transition-colors"
                      whileHover={{ x: 10 }}
                    >
                      →
                    </motion.div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative">
        <GradientBlob
          colors={["#ec4899", "#f97316"]}
          className="top-1/2 right-0 -translate-y-1/2"
          size="xl"
          blur={200}
        />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <span className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-4 block">
                About Us
              </span>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                We believe in the power of{" "}
                <GradientText gradient="from-purple-400 to-pink-400" animate>
                  great design
                </GradientText>
              </h2>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                Founded in 2019, we&apos;ve grown from a small team of dreamers into an
                award-winning studio. We partner with ambitious brands to create
                digital experiences that push boundaries and deliver results.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">150+</div>
                  <div className="text-zinc-500">Projects</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">12</div>
                  <div className="text-zinc-500">Awards</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">98%</div>
                  <div className="text-zinc-500">Happy Clients</div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <MaskReveal maskType="diagonal">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600" />
              </MaskReveal>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 px-6 bg-white text-black">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              Let&apos;s create something{" "}
              <span className="italic font-normal">amazing</span> together
            </h2>
            <p className="text-xl text-zinc-600 mb-12 max-w-2xl mx-auto">
              Have a project in mind? We&apos;d love to hear about it. Drop us a line
              and let&apos;s make it happen.
            </p>
            <MagneticButton className="bg-black text-white hover:bg-zinc-900 px-12 py-6 text-xl">
              Start a Project
            </MagneticButton>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-[#0a0a0a] border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-3xl font-bold tracking-tighter">
              <GradientText gradient="from-white to-zinc-400">STUDIO</GradientText>
            </div>
            <div className="flex items-center gap-8">
              {["Twitter", "Instagram", "Dribbble", "LinkedIn"].map((social) => (
                <AnimatedNavLink key={social} href="#" variant="underline" className="text-zinc-400 hover:text-white">
                  {social}
                </AnimatedNavLink>
              ))}
            </div>
            <p className="text-zinc-600 text-sm">© 2024 Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
