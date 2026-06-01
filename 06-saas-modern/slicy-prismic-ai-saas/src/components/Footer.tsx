import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import WordMark from "./WordMark";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <footer className="border-slay-600 flex flex-col items-center justify-between gap-6 border-t px-8 py-7 md:flex-row">
      <Link href="/">
        <WordMark />
        <span className="sr-only">Glisten.ai Home Page</span>
      </Link>
      <nav aria-label="Footer">
        <ul className="flex gap-6">
          {settings.data.navigation.map((item) => (
            <li key={item.label}>
              <PrismicNextLink
                className="inline-flex min-h-11 items-center"
                field={item.link}
              >
                {item.label}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
