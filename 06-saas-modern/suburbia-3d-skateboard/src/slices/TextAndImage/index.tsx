import type { Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'

import type { JSX } from 'react'
import { Bounded } from '@/components/Bounded'
import { ButtonLink } from '@/components/ButtonLink'
import { Heading } from '@/components/Heading'
import { SlideIn } from '@/components/SlideIn'

import { PrismicRichText, PrismicText } from '@prismicio/react'
import clsx from 'clsx'
import { ParallaxImage } from './ParallaxImage'

/* TODO： 继承 CSSProperties，用于修复 react 中的 style 添加变量属性 TS 类型错误问题 */
declare module 'react' {
  interface CSSProperties {
    '--index'?: number
  }
}

/** Props for `TextAndImage` */
export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>

/** Component for "TextAndImage" Slices. */
export default function TextAndImage({ slice, index }: TextAndImageProps): JSX.Element {
  const theme = slice.primary.theme
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        'sticky top-[calc(var(--index)*2rem)]', // 粘性定位视差滚动效果
        theme === 'Blue' && 'bg-texture bg-brand-blue text-white',
        theme === 'Orange' && 'bg-texture bg-brand-orange text-white',
        theme === 'Navy' && 'bg-texture bg-brand-navy text-white',
        theme === 'Lime' && 'bg-texture bg-brand-lime',
      )}
      style={{ '--index': index }} // 通过索引实现视差递增效果
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
        <div
          className={clsx(
            'flex flex-col items-center gap-8 text-center md:items-start md:text-left',
            slice.variation === 'imageOnLeft' && 'md:order-2',
          )}
        >
          <SlideIn>
            ``
            <Heading size="lg" as="h2">
              <PrismicText field={slice.primary.heading} />
            </Heading>
          </SlideIn>
          <SlideIn>
            <div className="max-w-md text-lg leading-relaxed">
              <PrismicRichText field={slice.primary.body} />
            </div>
          </SlideIn>
          <SlideIn>
            <ButtonLink
              field={slice.primary.button}
              color={theme === 'Lime' ? 'orange' : 'lime'}
            >
              {slice.primary.button.text}
            </ButtonLink>
          </SlideIn>
        </div>

        <ParallaxImage
          foregroundImage={slice.primary.foreground_image}
          backgroundImage={slice.primary.background_image}
        />
      </div>
    </Bounded>
  )
}
