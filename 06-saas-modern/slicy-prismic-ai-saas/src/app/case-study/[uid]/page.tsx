import { PrismicText, SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import Bounded from "@/components/Bounded";
import StarGrid from "@/components/StarGrid";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { asText } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("case_study", params.uid)
    .catch(() => notFound());

  return (
    <Bounded as="article">
      <div className="relative grid text-center place-items-center">
        <StarGrid />
        <h1 className="font-medium text-7xl">
          <PrismicText field={page.data.company} />
          <p className="text-lg text-yellow-500">Case Study</p>
        </h1>
        <p className="max-w-xl mt-8 mb-4 text-lg text-slate-300">
          <PrismicText field={page.data.description} />
        </p>
        <PrismicNextImage
          field={page.data.logo_image}
          className="rounded-lg"
          quality={100}
        />
      </div>
      <div className="mx-auto">
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    </Bounded>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("case_study", params.uid)
    .catch(() => notFound());

  return {
    title: `${page.data.meta_title || asText(page.data.company) + " Case Study"}`,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("case_study");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
