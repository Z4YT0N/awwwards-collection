"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TextGenerateEffect, FlipWords } from "@/components/text/text-generate";
import { CharacterReveal } from "@/components/text/text-reveal";
import { GradientText } from "@/components/text/gradient-text";
import { Spotlight, Spotlights } from "@/components/backgrounds/spotlight";
import { GridBackground, GridBeams } from "@/components/backgrounds/grid";
import { GradientBlob } from "@/components/backgrounds/gradient-blur";
import { Meteors } from "@/components/backgrounds/meteors";
import { MagneticButton, OutlineDrawButton } from "@/components/effects/magnetic-button";

// Hero variant 1: Spotlight hero
interface SpotlightHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  className?: string;
}

export function SpotlightHero({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  className,
}: SpotlightHeroProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black/[0.96] antialiased",
        className
      )}
    >
      <Spotlights />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {subtitle && (
          <motion.p
            className="text-purple-400 font-medium mb-4 uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
          <TextGenerateEffect words={title} />
        </h1>

        {description && (
          <motion.p
            className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {description}
          </motion.p>
        )}

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {primaryCTA && (
            <MagneticButton className="bg-white text-black hover:bg-zinc-100">
              {primaryCTA.text}
            </MagneticButton>
          )}
          {secondaryCTA && (
            <OutlineDrawButton>
              {secondaryCTA.text}
            </OutlineDrawButton>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Hero variant 2: Gradient mesh hero
interface GradientHeroProps {
  title: string;
  highlightWords?: string[];
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function GradientHero({
  title,
  highlightWords = [],
  description,
  className,
  children,
}: GradientHeroProps) {
  // Split title and highlight specific words
  const renderTitle = () => {
    const words = title.split(" ");
    return words.map((word, i) => {
      const isHighlighted = highlightWords.includes(word);
      return (
        <span key={i}>
          {isHighlighted ? (
            <GradientText
              gradient="from-purple-400 via-pink-400 to-red-400"
              animate
            >
              {word}
            </GradientText>
          ) : (
            word
          )}{" "}
        </span>
      );
    });
  };

  return (
    <div
      className={cn(
        "relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black",
        className
      )}
    >
      {/* Gradient blobs */}
      <GradientBlob
        colors={["#7C3AED", "#EC4899"]}
        className="top-0 left-1/4"
        size="xl"
        blur={150}
      />
      <GradientBlob
        colors={["#06B6D4", "#3B82F6"]}
        className="bottom-0 right-1/4"
        size="xl"
        blur={150}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {renderTitle()}
        </motion.h1>

        {description && (
          <motion.p
            className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {description}
          </motion.p>
        )}

        {children}
      </div>
    </div>
  );
}

// Hero variant 3: Animated words hero
interface AnimatedWordsHeroProps {
  staticText: string;
  animatedWords: string[];
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedWordsHero({
  staticText,
  animatedWords,
  description,
  className,
  children,
}: AnimatedWordsHeroProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950",
        className
      )}
    >
      <Meteors number={30} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8">
          {staticText}{" "}
          <FlipWords
            words={animatedWords}
            className="text-purple-400"
            duration={3000}
          />
        </h1>

        {description && (
          <motion.p
            className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {description}
          </motion.p>
        )}

        {children}
      </div>
    </div>
  );
}

// Hero variant 4: Split hero
interface SplitHeroProps {
  title: string;
  description?: string;
  media?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
}

export function SplitHero({
  title,
  description,
  media,
  className,
  children,
  reverse = false,
}: SplitHeroProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full flex items-center overflow-hidden bg-black",
        className
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
          reverse && "lg:flex-row-reverse"
        )}
      >
        {/* Content */}
        <motion.div
          className={cn("space-y-8", reverse && "lg:order-2")}
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            <CharacterReveal text={title} staggerDelay={0.03} />
          </h1>

          {description && (
            <motion.p
              className="text-lg text-zinc-400 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {description}
            </motion.p>
          )}

          {children}
        </motion.div>

        {/* Media */}
        <motion.div
          className={cn(
            "relative aspect-square lg:aspect-auto lg:h-[600px]",
            reverse && "lg:order-1"
          )}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {media}
        </motion.div>
      </div>
    </div>
  );
}

// Hero variant 5: Minimal hero
interface MinimalHeroProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export function MinimalHero({ title, className, children }: MinimalHeroProps) {
  return (
    <GridBeams
      className={cn(
        "min-h-screen flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {title}
        </motion.h1>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {children}
        </motion.div>
      </div>
    </GridBeams>
  );
}
