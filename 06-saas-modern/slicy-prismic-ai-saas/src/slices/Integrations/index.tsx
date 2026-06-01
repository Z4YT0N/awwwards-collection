import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import Image from "next/image";
import StarBackground from "./StarBackground";

import AnimatedContent from "./AnimatedContent";
import background from "./background.jpg";

/**
 * Props for `Integrations`.
 */
export type IntegrationsProps = SliceComponentProps<Content.IntegrationsSlice>;

/**
 * Component for "Integrations" Slices.
 */
const Integrations = ({ slice }: IntegrationsProps): JSX.Element => {
  return (
    <Bounded
      className="relative overflow-hidden"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Image
        src={background}
        alt=""
        fill
        className="object-cover"
        quality={90}
      />
      <StarBackground />

      <div className="relative">
        <h2 className="max-w-2xl mx-auto text-5xl font-medium text-center text-balance md:text-7xl">
          <PrismicText field={slice.primary.heading} />
        </h2>

        <div className="max-w-md mx-auto mt-6 text-center text-balance text-slate-300">
          <PrismicRichText field={slice.primary.body} />
        </div>

        <AnimatedContent slice={slice} />
      </div>
    </Bounded>
  );
};

export default Integrations;
