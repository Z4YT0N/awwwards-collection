import type {
  SliceSimulatorParams,
} from '@slicemachine/adapter-next/simulator'
import { components } from '@/slices'
import { SliceZone } from '@prismicio/react'

import {
  getSlices,
  SliceSimulator,
} from '@slicemachine/adapter-next/simulator'

export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams) {
  const { state } = await searchParams
  const slices = getSlices(state)

  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  )
}
