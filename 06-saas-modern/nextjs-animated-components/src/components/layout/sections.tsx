"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerOnScroll, StaggerItem } from "@/components/scroll/scroll-animations";
import { BentoGrid, BentoGridItem, FeatureCard } from "@/components/cards/bento-grid";

// Section wrapper with animation
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative py-24 md:py-32 overflow-hidden", className)}
    >
      {children}
    </section>
  );
}

// Container with max width
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

// Section header
interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  badge,
  title,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <FadeIn
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
          {badge}
        </span>
      )}

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "text-lg text-zinc-400",
            align === "center" && "max-w-2xl mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </FadeIn>
  );
}

// Features section
interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeaturesSectionProps {
  badge?: string;
  title: string;
  description?: string;
  features: Feature[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export function FeaturesSection({
  badge,
  title,
  description,
  features,
  className,
  columns = 3,
}: FeaturesSectionProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <Section className={cn("bg-black", className)}>
      <Container>
        <SectionHeader badge={badge} title={title} description={description} />

        <div className={cn("grid grid-cols-1 gap-6", gridCols[columns])}>
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={i}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

// Bento section (asymmetric grid)
interface BentoItem {
  title: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
}

interface BentoSectionProps {
  badge?: string;
  title: string;
  description?: string;
  items: BentoItem[];
  className?: string;
}

export function BentoSection({
  badge,
  title,
  description,
  items,
  className,
}: BentoSectionProps) {
  return (
    <Section className={cn("bg-zinc-950", className)}>
      <Container>
        <SectionHeader badge={badge} title={title} description={description} />

        <BentoGrid>
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              colSpan={item.colSpan}
              rowSpan={item.rowSpan}
            />
          ))}
        </BentoGrid>
      </Container>
    </Section>
  );
}

// Stats section
interface Stat {
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
  className?: string;
}

export function StatsSection({ stats, className }: StatsSectionProps) {
  return (
    <Section className={cn("bg-zinc-950 border-y border-zinc-800", className)}>
      <Container>
        <StaggerOnScroll className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StaggerItem key={i} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-zinc-400">{stat.label}</div>
            </StaggerItem>
          ))}
        </StaggerOnScroll>
      </Container>
    </Section>
  );
}

// CTA section
interface CTASectionProps {
  title: string;
  description?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  className?: string;
}

export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  className,
}: CTASectionProps) {
  return (
    <Section className={cn("bg-black", className)}>
      <Container>
        <div className="relative rounded-3xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-12 md:p-20 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {title}
              </h2>

              {description && (
                <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-10">
                  {description}
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {primaryCTA && (
                  <motion.a
                    href={primaryCTA.href}
                    className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {primaryCTA.text}
                  </motion.a>
                )}
                {secondaryCTA && (
                  <motion.a
                    href={secondaryCTA.href}
                    className="px-8 py-4 text-white font-semibold rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {secondaryCTA.text}
                  </motion.a>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}

// Footer
interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: React.ReactNode;
  columns?: FooterColumn[];
  bottomText?: string;
  className?: string;
}

export function Footer({
  logo,
  columns = [],
  bottomText,
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-black border-t border-zinc-800 pt-16 pb-8", className)}>
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            {logo}
          </div>

          {/* Link columns */}
          {columns.map((column, i) => (
            <div key={i}>
              <h3 className="font-semibold text-white mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-800 text-center text-zinc-500">
          {bottomText || `© ${new Date().getFullYear()} All rights reserved.`}
        </div>
      </Container>
    </footer>
  );
}
