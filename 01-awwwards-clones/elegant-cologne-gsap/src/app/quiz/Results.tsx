'use client';

import ButtonLink from '@/components/ButtonLink';
import FadeIn from '@/components/FadeIn';
import { formatPrice } from '@/lib/formatters';
import { useGSAP } from '@gsap/react';
import { asText, Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicText } from '@prismicio/react';
import gsap from 'gsap';
import { HiStar } from 'react-icons/hi2';
import { FragranceType, Vote, Winner } from './types';

gsap.registerPlugin(useGSAP);

type ResultsProps = {
  votes: Vote;
  fragrances: Content.FragranceDocument[];
  onRetakeQuiz: () => void;
};

function determineWinners(votes: Vote, fragrances: Content.FragranceDocument[]): Winner[] {
  const maxVotes = Math.max(votes.Terra, votes.Ignis, votes.Aqua);

  const winningTypes: FragranceType[] = [];

  if (votes.Terra === maxVotes) winningTypes.push('Terra');
  if (votes.Aqua === maxVotes) winningTypes.push('Aqua');
  if (votes.Ignis === maxVotes) winningTypes.push('Ignis');

  return winningTypes.slice(0, 2).map(fragranceType => {
    const fragrance = fragrances.find(f =>
      asText(f.data.title)?.toLowerCase().includes(fragranceType.toLowerCase())
    );

    return {
      fragranceType,
      title: asText(fragrance?.data.title) || fragranceType,
      uid: fragrance?.uid,
    };
  });
}

export function Results({ fragrances, onRetakeQuiz, votes }: ResultsProps) {
  const winners = determineWinners(votes, fragrances);

  useGSAP(() => {
    gsap.set('.bottle-image', {
      filter: 'brightness(0) blur(10px)',
      // opacity: 1,
    });

    const tl = gsap.timeline();
    tl.to(
      '.result-item',
      { opacity: 1, y: 0, duration: 1, stagger: 0.5, ease: 'power2.inOut' },
      '-=0.4'
    ).to(
      '.bottle-image',
      { duration: 1.7, filter: 'brightness(1) blur(0px)', ease: 'sine.in' },
      '-=0.8'
    );
  }, []);

  function handleRetakeQuiz() {
    gsap.to('.results-container', {
      opacity: 0,
      y: -20,
      ease: 'power2.in',
      onComplete: onRetakeQuiz,
    });
  }

  return (
    <FadeIn
      className="results-container mx-auto py-10 text-center translate-y-5 opacity-0"
      vars={{ duration: 0.8 }}
    >
      <div className="mb-10">
        <p className="mb-3 tracking-widest uppercase">Results</p>
        <h2 className="font-display mb-6 text-5xl md:text-6xl">Your Personalized Recommendation</h2>
        <p className="mb-12 text-lg text-gray-300">
          A unique selection of fragrances that are most suited to you and your personal taste
        </p>
      </div>

      <div className="flex justify-center gap-10">
        {winners.map((winner, index) => {
          const fragrance = fragrances.find(f => asText(f.data.title) === winner.title);

          if (!fragrance) {
            return null;
          }
          const formattedPrice = formatPrice(fragrance.data.price);

          return (
            <div
              key={index}
              className="result-item group max-w-md translate-y-5 text-left opacity-0"
            >
              <div className="grid mt-40 mb-6 bg-neutral-200/10 transition-colors duration-700 group-hover:bg-neutral-200/20">
                <PrismicNextImage
                  field={fragrance.data.bottle_image}
                  className="bottle-image -mt-40 max-w-96 -rotate-12 opacity-100 blur-md transition-all duration-700 group-hover:scale-110 group-hover:rotate-0 group-hover:brightness-125"
                  priority
                  imgixParams={{ width: 450, height: 450, dpr: 2 }}
                />

                <div className="mt-6 p-6">
                  <div className="mb-2 flex items-center">
                    <span className="inline-flex items-center gap-1 text-white">
                      <HiStar />
                      <span>4.8</span>
                    </span>
                    <span className="ml-3 text-gray-400">(120 Reviews)</span>
                  </div>
                  <h3 className="font-display mb-2 text-3xl">
                    <PrismicText field={fragrance.data.title} /> Eau De Parfum
                  </h3>
                  <p className="mb-8 text-lg font-semibold">{formattedPrice}</p>
                  <div className="mb-6">
                    <ButtonLink document={fragrance} className="w-full">View Details</ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleRetakeQuiz}
        className="mt-12 inline-block border border-white px-12 py-4 font-extrabold tracking-wider text-white uppercase"
      >
        Retake Quiz
      </button>
    </FadeIn>
  );
}
