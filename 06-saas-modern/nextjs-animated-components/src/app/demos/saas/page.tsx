"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TextGenerateEffect, FlipWords } from "@/components/text/text-generate";
import { GradientText, NeonText } from "@/components/text/gradient-text";
import { FadeIn, ScrollProgress, InfiniteScroll } from "@/components/scroll";
import { Spotlights } from "@/components/backgrounds/spotlight";
import { GridBeams } from "@/components/backgrounds/grid";
import { Sparkles } from "@/components/backgrounds/particles";
import { BeamCard, GlowCard, FeatureCard } from "@/components/cards";
import {
  MagneticButton,
  FluidButton,
  ScrambleButton,
  DepthButton,
} from "@/components/effects/magnetic-button";
import {
  StickyHeader,
  AnimatedNavLink,
  TabNav,
} from "@/components/navigation";
import { SlideReveal } from "@/components/transitions";
import { Skeleton, SkeletonText } from "@/components/transitions";

const Globe = dynamic(
  () => import("@/components/three/globe").then((mod) => mod.Globe),
  { ssr: false, loading: () => <Skeleton className="w-full h-full" /> }
);

// Demo data
const features = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "Built on edge infrastructure for sub-100ms response times globally.",
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    description: "SOC 2 Type II certified with end-to-end encryption and SSO.",
  },
  {
    icon: "📊",
    title: "Real-time Analytics",
    description: "Live dashboards and insights that update as your data flows in.",
  },
  {
    icon: "🔄",
    title: "Seamless Integrations",
    description: "Connect with 200+ tools including Slack, Notion, and GitHub.",
  },
  {
    icon: "🤖",
    title: "AI-Powered",
    description: "Intelligent automation that learns and adapts to your workflow.",
  },
  {
    icon: "🌍",
    title: "Global Scale",
    description: "Deployed across 50+ regions for maximum reliability and speed.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for small teams getting started",
    features: ["5 team members", "10GB storage", "Basic analytics", "Email support"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$99",
    description: "For growing teams that need more power",
    features: ["Unlimited members", "100GB storage", "Advanced analytics", "Priority support", "Custom integrations", "API access"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with custom needs",
    features: ["Everything in Pro", "Unlimited storage", "Dedicated support", "Custom contracts", "SLA guarantee", "On-premise option"],
    cta: "Contact Sales",
    popular: false,
  },
];

const logos = [
  "Vercel", "Stripe", "Linear", "Notion", "Figma", "GitHub",
  "Slack", "Discord", "Shopify", "Twilio", "Supabase", "Prisma"
];

const testimonials = [
  {
    quote: "This platform transformed how our team collaborates. We shipped 3x faster within the first month.",
    author: "Sarah Chen",
    role: "CTO at TechCorp",
    avatar: "SC",
  },
  {
    quote: "The AI features are genuinely useful, not just marketing fluff. It's like having an extra team member.",
    author: "Marcus Johnson",
    role: "Lead Developer at StartupXYZ",
    avatar: "MJ",
  },
  {
    quote: "Best developer experience I've encountered. The documentation alone is worth the price.",
    author: "Emily Rodriguez",
    role: "Engineering Manager at ScaleUp",
    avatar: "ER",
  },
];

export default function SaaSDemo() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <main className="relative bg-black text-white overflow-hidden">
      <ScrollProgress />

      {/* Navigation */}
      <StickyHeader className="px-6 py-4 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600" />
            <span className="text-xl font-bold">Nexus</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <AnimatedNavLink href="#features" variant="highlight">Features</AnimatedNavLink>
            <AnimatedNavLink href="#pricing" variant="highlight">Pricing</AnimatedNavLink>
            <AnimatedNavLink href="#testimonials" variant="highlight">Testimonials</AnimatedNavLink>
            <AnimatedNavLink href="#" variant="highlight">Docs</AnimatedNavLink>
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-white transition-colors">Sign In</button>
            <MagneticButton className="bg-white text-black text-sm px-4 py-2">
              Get Started
            </MagneticButton>
          </div>
        </div>
      </StickyHeader>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <Spotlights />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Now with AI-powered workflows
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]">
            <TextGenerateEffect words="The platform for" />
            <br />
            <GradientText gradient="from-cyan-400 via-blue-500 to-purple-500" animate className="mt-2 inline-block">
              modern teams
            </GradientText>
          </h1>

          <motion.p
            className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Ship faster with{" "}
            <FlipWords
              words={["automation", "collaboration", "intelligence", "simplicity"]}
              className="text-white"
            />
            . Trusted by 50,000+ teams worldwide.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <FluidButton className="px-8 py-4 text-lg">
              Start Free Trial
            </FluidButton>
            <ScrambleButton className="px-8 py-4 text-lg border border-zinc-800">
              WATCH DEMO
            </ScrambleButton>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-zinc-500 text-sm"
          >
            <p className="mb-4">Trusted by teams at</p>
            <InfiniteScroll speed="slow" className="py-4">
              {logos.map((logo) => (
                <div
                  key={logo}
                  className="px-8 text-zinc-600 font-medium text-lg hover:text-zinc-400 transition-colors"
                >
                  {logo}
                </div>
              ))}
            </InfiniteScroll>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-20">
            <span className="text-cyan-400 uppercase tracking-wider text-sm mb-4 block">
              Features
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Everything you need to{" "}
              <GradientText gradient="from-cyan-400 to-blue-500">scale</GradientText>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Powerful features that help your team work smarter, not harder.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.1}>
                <GlowCard className="h-full p-8 bg-zinc-950 border border-zinc-900">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-zinc-400">{feature.description}</p>
                </GlowCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Globe Section */}
      <section className="py-32 px-6 relative">
        <GridBeams className="absolute inset-0 opacity-50" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <span className="text-cyan-400 uppercase tracking-wider text-sm mb-4 block">
                Global Infrastructure
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Deployed at the edge, everywhere
              </h2>
              <p className="text-xl text-zinc-400 mb-8">
                Your data is processed at the nearest edge location, ensuring
                lightning-fast response times no matter where your users are.
              </p>
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="text-3xl font-bold text-cyan-400">50+</div>
                  <div className="text-zinc-500">Regions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">&lt;100ms</div>
                  <div className="text-zinc-500">Latency</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">99.99%</div>
                  <div className="text-zinc-500">Uptime</div>
                </div>
              </div>
              <MagneticButton>Learn About Infrastructure</MagneticButton>
            </FadeIn>

            <FadeIn direction="right">
              <div className="h-[500px] relative">
                <Globe variant="dotted" color="#06b6d4" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-cyan-400 uppercase tracking-wider text-sm mb-4 block">
              Pricing
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
              No hidden fees. No surprise charges. Cancel anytime.
            </p>

            <TabNav
              tabs={[
                { id: "monthly", label: "Monthly" },
                { id: "yearly", label: "Yearly (Save 20%)" },
              ]}
              activeTab={billingCycle}
              onChange={setBillingCycle}
              variant="pill"
              className="justify-center"
            />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 0.1}>
                <BeamCard
                  className={cn(
                    "h-full p-8 bg-black border",
                    plan.popular ? "border-cyan-500" : "border-zinc-900"
                  )}
                  beamProps={plan.popular ? { colorFrom: "#06b6d4", colorTo: "#3b82f6" } : undefined}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-500 text-black text-xs font-bold rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-2">
                    {plan.price}
                    {plan.price !== "Custom" && (
                      <span className="text-lg text-zinc-500 font-normal">/mo</span>
                    )}
                  </div>
                  <p className="text-zinc-500 mb-6">{plan.description}</p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-zinc-300">
                        <span className="text-cyan-400">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {plan.popular ? (
                    <FluidButton className="w-full">{plan.cta}</FluidButton>
                  ) : (
                    <DepthButton className="w-full">{plan.cta}</DepthButton>
                  )}
                </BeamCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-cyan-400 uppercase tracking-wider text-sm mb-4 block">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-6xl font-bold">
              Loved by developers
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <FadeIn key={testimonial.author} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 h-full flex flex-col">
                  <p className="text-lg text-zinc-300 mb-6 flex-1">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold">{testimonial.author}</div>
                      <div className="text-zinc-500 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0">
          <Sparkles particleColor="#06b6d4" particleDensity={30} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
              Ready to get started?
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Join 50,000+ teams already using Nexus to ship faster. Start your
              free trial today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <FluidButton className="px-8 py-4 text-lg">
                Start Free Trial
              </FluidButton>
              <MagneticButton className="px-8 py-4 text-lg border border-zinc-800 bg-transparent">
                Talk to Sales
              </MagneticButton>
            </div>
            <p className="text-zinc-600 text-sm mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600" />
                <span className="text-xl font-bold">Nexus</span>
              </div>
              <p className="text-zinc-500 max-w-xs">
                The platform for modern teams. Ship faster with automation, collaboration, and intelligence.
              </p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Resources", links: ["Documentation", "API Reference", "Guides", "Support"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-900">
            <p className="text-zinc-600 text-sm">© 2024 Nexus. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Privacy</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Terms</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
