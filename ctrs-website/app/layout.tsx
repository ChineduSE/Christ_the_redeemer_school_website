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

export const metadata: Metadata = {
  title: "Christ The Redeemer's Schools | Education For God's Glory",
  description:
    "A premier Christian school in Benin City offering quality education from Crèche to Secondary School. Raising spiritually grounded, academically excellent, and socially competent young people.",
  keywords:
    'CTRS, Christ The Redeemer Schools, Benin City school, Christian school Nigeria, primary school Benin, secondary school Benin, Edo State school',
  openGraph: {
    title: "Christ The Redeemer's Schools",
    description:
      "Education For God's Glory — from Crèche to Secondary School in Benin City, Edo State.",
    images: ['/images/campus/campus-exterior-building-full-frontage.jpeg'],
    type: 'website',
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
