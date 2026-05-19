'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroContent() {
  return (
    <section className="relative bg-ctrs-cream overflow-hidden">

      {/* Watermark crest — very faint, decorative */}
      <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-[340px] h-[340px] opacity-[0.04] pointer-events-none select-none hidden sm:block">
        <Image
          src="/images/logo_ctrs.png"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      {/* Amber accent top border */}
      <div className="h-1 bg-ctrs-amber w-full" />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 py-14 sm:py-20 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="font-raleway text-[11px] tracking-[0.45em] uppercase font-semibold text-ctrs-amber">
            Christ The Redeemer&apos;s Schools
          </span>
        </motion.div>

        {/* Amber divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="amber-line mx-auto mt-3 mb-6"
        />

        {/* Motto */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-ctrs-green leading-[1.1] mb-5"
        >
          Education For{' '}
          <span className="italic text-ctrs-amber">God&apos;s Glory</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-opensans text-base sm:text-lg text-ctrs-dark/65 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Raising spiritually grounded, academically excellent, and socially competent young people
          — from Crèche to Secondary School in Benin City, Edo State.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#admissions"
            className="w-full sm:w-auto font-raleway font-bold text-base px-10 py-4 bg-ctrs-green text-white rounded-lg hover:bg-ctrs-green/90 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center"
          >
            Apply Now
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto font-raleway font-semibold text-base px-10 py-4 border-2 border-ctrs-green text-ctrs-green rounded-lg hover:bg-ctrs-green hover:text-white transition-all duration-300 text-center"
          >
            Explore School
          </a>
        </motion.div>

        {/* Small trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
        >
          {[
            'Crèche to Secondary',
            '25+ Years of Excellence',
            'Benin City, Edo State',
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-2 font-raleway text-xs text-ctrs-dark/45 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-ctrs-amber inline-block" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Amber accent bottom border */}
      <div className="h-px bg-ctrs-amber/20 w-full" />
    </section>
  )
}
