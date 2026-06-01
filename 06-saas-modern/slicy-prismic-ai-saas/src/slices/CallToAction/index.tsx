import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import PlainLogo from "./PlainLogo";
import ButtonLink from "@/components/ButtonLink";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative py-32 font-medium text-center md:py-40"
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-sm rounded-full bg-blue-500/50 blur-[160px] filter" />
      <div className="p-4 rounded-lg glass-container bg-gradient-to-b from-slate-800 to-slate-900 md:rounded-xl">
        <PlainLogo />
      </div>

      <div className="max-w-xl mt-8 text-5xl text-balance">
        <PrismicText field={slice.primary.heading} />
      </div>

      <ButtonLink field={slice.primary.button_link} className="mt-6">
        {slice.primary.button_text || "Learn More"}
      </ButtonLink>
    </Bounded>
  );
};

export default CallToAction;
