import TransitionLink from '@/components/TransitionLink';
import Image from 'next/image';
import { ReactNode } from 'react';

export function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-black py-16">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-3 justify-items-center text-center">
          <NavGroup title="Shop">
            <NavLink href="/fragrance/terra">Terra</NavLink>
            <NavLink href="/fragrance/ignis">Ignis</NavLink>
            <NavLink href="/fragrance/aqua">Aqua</NavLink>
          </NavGroup>

          <NavGroup title="About">
            <NavLink href="#">Science</NavLink>
            <NavLink href="#">Our Story</NavLink>
            <NavLink href="#">Côte Royale</NavLink>
          </NavGroup>

          <NavGroup title="Social">
            <NavLink href="#">Instagram</NavLink>
            <NavLink href="#">X (Twitter)</NavLink>
            <NavLink href="#">Facebook</NavLink>
          </NavGroup>
        </div>

        {/* Bottom footer */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-neutral-800 pt-8 md:flex-row">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Côte Royale Inc. All rights reserved
          </p>
          <TransitionLink
            href="/"
            aria-label="Côte Royale Home"
            className="order-first md:order-none"
          >
            <Image src="/logo.svg" alt="CÔTE ROYALE" width={150} height={25} />
          </TransitionLink>
          <ul
            aria-label="Legal"
            className="flex flex-wrap justify-center gap-6 text-sm text-gray-400"
          >
            <li>
              <a href="#" className="hover:text-white">Terms &amp; conditions</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

type NavGroupProps = {
  title: string;
  children?: ReactNode;
};

function NavGroup({ title, children }: NavGroupProps) {
  return (
    <nav aria-labelledby={`${title.toLowerCase()}-heading`}>
      <h3
        id={`${title.toLowerCase()}-heading`}
        className="mb-6 text-xl font-medium"
      >
        {title}
      </h3>
      <ul className="space-y-4" role="list">{children}</ul>
    </nav>
  );
}

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

function NavLink({ href, children }: NavLinkProps) {
  return (
    <li>
      <TransitionLink href={href} className="hover:text-gray-300">{children}</TransitionLink>
    </li>
  );
}
