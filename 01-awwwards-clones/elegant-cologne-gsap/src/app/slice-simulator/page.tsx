import { SliceZone } from '@prismicio/react';
import {
  getSlices,
  SliceSimulator,
  SliceSimulatorParams
} from '@slicemachine/adapter-next/simulator';

import { components } from '../../slices';

export default async function SliceSimulatorPage({ searchParams }: SliceSimulatorParams) {
  const { state } = await searchParams;
  const slices = getSlices(state);

  return (
    <SliceSimulator background="#222222">
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  );
}
