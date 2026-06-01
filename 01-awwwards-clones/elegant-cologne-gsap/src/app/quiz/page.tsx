import { asImageSrc } from '@prismicio/client';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Bounded } from '@/components/Bounded';
import { createClient } from '@/prismicio';
import { Quiz } from './Quiz';

export default async function Page() {
  const client = createClient();
  const quiz = await client.getSingle('quiz').catch(() => notFound());
  const fragrances = await client.getAllByType('fragrance');

  return (
    <Bounded className="grid min-h-screen place-items-center bg-[url('/background.avif')] bg-cover bg-center text-gray-50">
      <Quiz quizData={quiz} fragrances={fragrances} />
    </Bounded>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('quiz').catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }],
    },
  };
}
