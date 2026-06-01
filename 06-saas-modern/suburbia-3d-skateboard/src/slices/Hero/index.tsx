import type { JSX } from 'react'
import { Bounded } from '@/components/Bounded'

import { ButtonLink } from '@/components/ButtonLink'
import { Heading } from '@/components/Heading'
import { TallLogo, WideLogo } from '@/components/icons/client'
import { asImageSrc, type Content } from '@prismicio/client'
import { PrismicRichText, PrismicText, type SliceComponentProps } from '@prismicio/react'
import { InteractiveSkateboard } from './InteractiveSkateboard'

const DEFAULT_DECK_TEXTURE = '/skateboard/Deck.webp'
const DEFAULT_WHEEL_TEXTURE = '/skateboard/SkateWheel1.png'

/** Props for `Hero` */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/** Component for "Hero" Slices. */
export default function Hero({ slice }: HeroProps): JSX.Element {
  const {
    skateboard_deck_texture,
    skateboard_wheel_texture,
    skateboard_truck_color,
    skateboard_bolt_color,
  } = slice.primary

  const state = {
    deckTextureURL: asImageSrc(skateboard_deck_texture) || DEFAULT_DECK_TEXTURE, // 甲板纹理
    wheelTextureURL: asImageSrc(skateboard_wheel_texture) || DEFAULT_WHEEL_TEXTURE, // 滑轮
    truckColor: skateboard_truck_color || '#6F6E6A',
    boltColor: skateboard_bolt_color || '#6F6E6A',
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      id={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-brand-pink relative h-dvh overflow-hidden text-zinc-800 bg-texture"
    >

      {/* 背景文字 Logo [Suburbia Skate] */}
      <div className="absolute inset-0 flex items-center pt-20">
        <WideLogo className="hidden lg:block" />
        <TallLogo className="lg:hidden" />
      </div>

      {/* Tailwind 任意值: https://v3.tailwindcss.com/docs/grid-template-rows#arbitrary-values */}
      <div className="absolute inset-0 mx-auto mt-24 grid max-w-6xl grid-rows-[1fr,auto] place-items-end px-6 ~py-10/16">
        <Heading className="relative max-w-2xl place-self-start">
          <PrismicText field={slice.primary.heading} />
        </Heading>
        <div className="flex relative w-full flex-col items-center justify-between ~gap-2/4 lg:flex-row">
          <div className="max-w-[45ch] font-semibold ~text-lg/xl">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <ButtonLink
            field={slice.primary.button}
            icon="skateboard"
            size="lg"
            className="z-20 mt-2 block"
          >
            {slice.primary.button.text}
          </ButtonLink>
        </div>
      </div>
      <InteractiveSkateboard {...state} />
    </Bounded>
  )
}
