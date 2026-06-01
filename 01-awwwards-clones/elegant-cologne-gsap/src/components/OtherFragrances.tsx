import TransitionLink from '@/components/TransitionLink';
import { formatPrice } from '@/lib/formatters';
import { createClient } from '@/prismicio';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicText } from '@prismicio/react';

type OtherFragrancesProps = {
  currentFragranceUid: string;
};

async function OtherFragrances({ currentFragranceUid }: OtherFragrancesProps) {
  const client = createClient();
  const allFragrances = await client.getAllByType('fragrance');
  const otherFragrances = allFragrances.filter((fragrance) =>
    fragrance.uid !== currentFragranceUid
  );

  return (
    <div className="container mx-auto px-4">
      <h2 className="font-display mb-8 text-3xl text-white md:text-4xl">You may also like</h2>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {otherFragrances.map(fragrance => (
          <li key={fragrance.id}>
            <TransitionLink document={fragrance} className="group">
              <div className="relative aspect-square w-full transition-transform duration-500 group-hover:scale-105">
                <PrismicNextImage
                  field={fragrance.data.bottle_image}
                  width={600}
                  height={600}
                  className="h-auto w-full"
                />
              </div>
              <div className="mt-8 space-y-1 text-white">
                <h3 className="font-display text-2xl">
                  <PrismicText field={fragrance.data.title} />
                </h3>
                <p className="text-sm text-neutral-400">Eau de Parfum</p>
                <p className="text-base font-light">{formatPrice(fragrance.data.price)}</p>
              </div>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default OtherFragrances;
