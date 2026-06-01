import Link, { LinkProps } from "next/link";
import * as motion from "motion/react-client";
import { CSSProperties } from "react";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import { MotionConfig } from "motion/react";
import cn from "@/utils/cn";
interface StyledLinkProps extends LinkProps {
  children: string;
  className?: string;
  style?: CSSProperties;
  underlineColor?: string;
  arrowFill?: "#2B3530" | "#D1CCBF" | "#FFFFFF";
  active?: boolean;
  href: string;
}
export default function StyledLink({
  children,
  arrowFill = "#D1CCBF",
  underlineColor = "#d0cbbe",
  active = false,
  href,
  className,
  style,
}: StyledLinkProps) {
  return (
    <Link href={href}>
      <motion.div
        initial="initial"
        whileHover="whileHover"
        className={cn(
          "relative flex w-full cursor-pointer items-center justify-between overflow-hidden py-4 pr-4 text-lg [line-height:1.1] md:py-2-5 md:text-xl",
          className,
        )}
        style={style}
      >
        <span>{children}</span>
        <NavigateSVG fill={arrowFill} />
        <MotionConfig
          transition={{
            duration: 0.4,
            ease: "circInOut",
          }}
        >
          <div
            className="absolute inset-x-0 bottom-0 h-px"
            style={{
              backgroundColor: underlineColor,
              opacity: active ? 1 : 0.5,
            }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-px"
            style={{ backgroundColor: underlineColor }}
            variants={{
              initial: {
                x: "100%",
              },
              whileHover: {
                x: ["-100%", "0%"],
              },
            }}
          />
        </MotionConfig>
      </motion.div>
    </Link>
  );
}
