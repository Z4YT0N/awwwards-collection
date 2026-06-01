import * as motion from "motion/react-client";
import { MotionProps } from "motion/react";
import React, { CSSProperties, ReactNode } from "react";
import cn from "@/utils/cn";

interface MaskTextProps extends MotionProps {
  lines: ReactNode[];
  className?: string;
  style?: CSSProperties;
}

export default function MaskText({
  lines,
  className,
  style,
  ...motionProps
}: MaskTextProps) {
  const containerVariants = {
    inView: {
      transition: {
        staggerChildren: 0.1,
        ...(motionProps.transition && typeof motionProps.transition === 'object' ? motionProps.transition : {}),
      },
    },
  };
  const variants = {
    initial: { y: "100%", clipPath: "inset(0% 0% 100% 0%)" },
    inView: {
      y: "0%",
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        ease: [0.24, 0.43, 0.15, 0.97] as const,
        duration: 0.8,
      },
    },
  };
  return (
    <motion.div
      initial="initial"
      whileInView="inView"
      variants={containerVariants}
      viewport={{ once: true }}
      style={{ ...style }}
      className={cn("", className)}
    >
      {lines.map((eachLine, index) => (
        <motion.div key={index + 1} variants={variants}>
          {eachLine}
        </motion.div>
      ))}
    </motion.div>
  );
}
