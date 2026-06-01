import type { Metadata } from 'next'
import { SVGFilters } from '@/components/SVGFilters'
import { createClient } from '@/prismicio'
// TODO 自定义字体
// See: https://nextjs.org/docs/app/building-your-application/optimizing/fonts#local-fonts
import { Bowlby_One_SC, DM_Mono } from 'next/font/google'
import '@/styles/globals.css'

const bowlby = Bowlby_One_SC({
  subsets: ['latin'],
  variable: '--font-bowlby-sc',
  display: 'swap',
  weight: '400',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
  weight: '500',
})

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle('settings')

  return {
    title: settings.data.site_title,
    description: settings.data.meta_description,
    openGraph: {
      images: settings.data.fallback_og_image.url ?? undefined,
    },
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${bowlby.variable} ${dmMono.variable} antialiased font-mono font-medium text-zinc-800`}
      >
        <main>{children}</main>
        <SVGFilters />
      </body>
    </html>
  )
}
