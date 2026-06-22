import type { Metadata } from 'next'
import { Playfair_Display, Raleway, Open_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-opensans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

// Set NEXT_PUBLIC_SITE_URL to your live domain so shared-link previews resolve correctly.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://christredeemersschools.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Christ The Redeemer's Schools | Education For God's Glory",
  description:
    "A premier Christian school in Benin City offering quality education from Crèche to Secondary School. Raising spiritually grounded, academically excellent, and socially competent young people.",
  keywords:
    'CTRS, Christ The Redeemer Schools, Benin City school, Christian school Nigeria, primary school Benin, secondary school Benin, Edo State school',
  // Favicon + apple-touch-icon are auto-generated from app/icon.png and app/apple-icon.png
  openGraph: {
    title: "Christ The Redeemer's Schools | Education For God's Glory",
    description:
      "A premier Christian school in Benin City — raising spiritually grounded, academically excellent, and socially competent young people, from Crèche to Secondary School.",
    url: siteUrl,
    siteName: "Christ The Redeemer's Schools",
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Christ The Redeemer's Schools campus, Benin City",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Christ The Redeemer's Schools | Education For God's Glory",
    description:
      "Quality Christian education in Benin City, from Crèche to Secondary School.",
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${raleway.variable} ${openSans.variable}`}
    >
      <body className="font-opensans antialiased">{children}</body>
    </html>
  )
}
