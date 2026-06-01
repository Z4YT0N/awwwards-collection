import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { PiArrowsClockwise, PiGear } from "react-icons/pi";
import AnimatedContent from "./AnimatedContent";

const icons = {
  gear: <PiGear />,
  cycle: <PiArrowsClockwise />,
};

/**
 * Props for `Showcase`.
 */
export type ShowcaseProps = SliceComponentProps<Content.ShowcaseSlice>;

/**
 * Component for "Showcase" Slices.
 */
const Showcase = ({ slice }: ShowcaseProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      <div className="absolute w-full max-w-xl rounded-full glow -z-10 aspect-square bg-blue-400/20 blur-3xl filter" />
      <AnimatedContent>
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-5xl font-medium text-center text-balance md:text-7xl">
                {children}
              </h2>
            ),
          }}
        />
      </AnimatedContent>
      <div className="grid items-center p-8 mt-16 border to slate-50/5 rounded-xl border-blue-50/20 bg-gradient-to-b from-slate-50/15 backdrop-blur-sm lg:grid-cols-3 lg:py-12">
        <div>
          <div className="p-4 text-3xl rounded-lg w-fit bg-blue-500/35">
            <>{slice.primary.icon && icons[slice.primary.icon]}</>
          </div>
          <div className="mt-6 text-2xl font-normal">
            <PrismicRichText field={slice.primary.subheading} />
          </div>
          <div className="max-w-xl mt-4 prose-invert">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <ButtonLink field={slice.primary.button_link} className="my-6">
            {slice.primary.button_text || "Learn More"}
          </ButtonLink>
        </div>

        <PrismicNextImage
          field={slice.primary.image}
          className={clsx(
            "opacity-90 shadow-2xl lg:col-span-2 lg:pt-0",
            slice.variation === "reverse"
              ? "lg:order-1 lg:translate-x-[15%]"
              : "lg:-order-1 lg:translate-x-[-15%]",
          )}
        />
      </div>
    </Bounded>
  );
};

export default Showcase;
