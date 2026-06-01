import type { Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'
import type { JSX } from 'react'

import { Bounded } from '@/components/Bounded'
import { Heading } from '@/components/Heading'
import { SlideIn } from '@/components/SlideIn'
import { createClient } from '@/prismicio'

import { PrismicText } from '@prismicio/react'
import { Fragment } from 'react'
import { Skater } from './Skater'

/** Props for `TeamGrid`. */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>

/** Component for "TeamGrid" Slices. */
export default async function TeamGrid({ slice }: TeamGridProps): Promise<JSX.Element> {
  const client = createClient()
  const skaters = await client.getAllByType('skater')
  return (
    <Bounded
      id={slice.slice_type}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy"
    >
      <SlideIn>
        <Heading as="h2" size="lg" className="mb-8 text-center text-white">
          <PrismicText field={slice.primary.heading} />
        </Heading>
      </SlideIn>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {skaters.map((skater, index) => (
          <Fragment key={index}>
            {skater.data.first_name && (
              <SlideIn>
                <Skater index={index} skater={skater} />
              </SlideIn>
            )}
          </Fragment>
        ))}
      </div>
    </Bounded>
  )
}
