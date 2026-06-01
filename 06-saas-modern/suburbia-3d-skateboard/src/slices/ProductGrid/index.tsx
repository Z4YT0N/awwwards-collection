import type { Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'
import type { JSX } from 'react'

import { Bounded } from '@/components/Bounded'
import { Heading } from '@/components/Heading'
import { SlideIn } from '@/components/SlideIn'
import { isFilled } from '@prismicio/client'
import { PrismicRichText, PrismicText } from '@prismicio/react'
import { SkateboardProduct } from './SkateboardProduct'

/** Props for `ProductGrid`. */
export type ProductGridProps = SliceComponentProps<Content.ProductGridSlice>

/** Component for "ProductGrid" Slices. */
export default function ProductGrid({ slice }: ProductGridProps): JSX.Element {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-gray"
    >

      <SlideIn>
        <Heading className="text-center ~mb-4/6" as="h2">
          <PrismicText field={slice.primary.heading} />
        </Heading>
      </SlideIn>

      <SlideIn>
        <div className="text-center ~mb-6/10">
          <PrismicRichText field={slice.primary.body} />
        </div>
      </SlideIn>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {slice.primary.product.map(
          ({ skateboard }) =>
            isFilled.contentRelationship(skateboard) && (
              <SkateboardProduct key={skateboard.id} id={skateboard.id} />
            ),
        )}
      </div>
    </Bounded>
  )
}
