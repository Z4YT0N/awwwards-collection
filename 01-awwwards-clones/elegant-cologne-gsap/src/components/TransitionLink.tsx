import { asLink, LinkField, PrismicDocument } from '@prismicio/client';
import { Link } from 'next-view-transitions';
import { ReactNode } from 'react';

export type TransitionLinkProps =
  & {
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
    tabIndex?: number;
  }
  & (
    // dprint-ignore
    | {field: LinkField | null; document?:never; href?: never}
    | {field?: never; document: PrismicDocument | null; href?: never}
    | {field?: never; document?: never; href: string}
  );

function TransitionLink(
  { field, document: doc, href, children, className, onClick, tabIndex }: TransitionLinkProps
) {
  const url = href ?? asLink(field ?? doc);

  if (!url) {
    console.warn('TransitionLink: No URL Found');
    return null;
  }

  return (
    <Link href={url} className={className} onClick={onClick} tabIndex={tabIndex}>
      {field?.text ?? children}
    </Link>
  );
}

export default TransitionLink;
