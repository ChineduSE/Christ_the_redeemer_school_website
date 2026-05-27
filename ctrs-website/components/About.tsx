'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const pillars = [
  'Spiritually Grounded',
  'Academically Excellent',
  'Physically Healthy',
  'Socially Competent',
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="bg-ctrs-cream py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label">Our Story</span>
          <div className="amber-line mx-auto mt-3 mb-5" />
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-ctrs-green">
            Welcome to CTRS
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Photo card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative px-3 pb-3 sm:px-0 sm:pb-0"
          >
            {/* Offset shadow card — hidden on mobile to prevent overflow */}
            <div className="hidden sm:block absolute -top-5 -left-5 w-full h-full bg-ctrs-green/15 rounded-2xl" />
            <div className="hidden sm:block absolute -bottom-5 -right-5 w-28 h-28 bg-ctrs-amber/25 rounded-xl" />

            {/* Director photo */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] z-10">
              <Image
                src="/images/director/director-portrait-formal.jpeg"
                alt="Pst. Osagie and Proff. Idia Ize-Iyamu — Directors, CTRS"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Bottom gradient + name plate */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-16 pb-5 px-5 text-center">
                <p className="font-playfair font-bold text-white text-base leading-snug">
                  Pst. Osagie &amp; Proff. Idia Ize-Iyamu
                </p>
                <p className="font-raleway text-[11px] text-ctrs-amber tracking-wider uppercase mt-1">
                  Directors, Christ The Redeemer&apos;s Schools
                </p>
              </div>
            </div>

            {/* Crest badge — hidden on small mobile screens */}
            <div className="hidden xs:flex absolute top-6 right-6 z-20 bg-white rounded-xl p-3 shadow-xl items-center gap-2.5">
              <div className="relative w-10 h-10">
                <Image src="/images/logo_ctrs.png" alt="CTRS Crest" fill className="object-contain" />
              </div>
              <div>
                <p className="font-raleway font-bold text-[10px] text-ctrs-green uppercase tracking-widest">C.T.R.S</p>
                <p className="font-opensans text-[9px] text-ctrs-dark/50">Est. Benin City</p>
              </div>
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            <span className="section-label">A Message From Our Directors</span>
            <div className="amber-line mt-3 mb-6" />

            <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-ctrs-dark leading-snug mb-7">
              Building Character,{' '}
              <span className="text-ctrs-green italic">Inspiring Minds</span>
            </h3>

            {/* Pull quote */}
            <div className="border-l-4 border-ctrs-amber pl-6 py-4 pr-4 bg-white/70 rounded-r-xl mb-7 shadow-sm">
              <svg className="w-7 h-7 text-ctrs-amber/40 mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
              <p className="font-playfair italic text-lg text-ctrs-dark/80 leading-relaxed">
                Welcome to Christ The Redeemer&apos;s Schools. For over two decades, we have been committed to
                raising children of character who are spiritually rooted, academically excellent, and
                prepared for the world ahead.
              </p>
              <p className="font-raleway font-semibold text-ctrs-green text-sm mt-3">
                — Pst. Osagie &amp; Proff. Idia Ize-Iyamu, Directors, CTRS
              </p>
            </div>

            <p className="font-opensans text-ctrs-dark/65 leading-relaxed mb-8 text-base">
              Our motto —{' '}
              <em className="text-ctrs-green font-semibold not-italic">Education For God&apos;s Glory</em>{' '}
              — is not just words; it is the lens through which every lesson, every interaction, and every
              achievement is measured. From Crèche through to Secondary School, every child is seen,
              valued, and challenged to reach their full God-given potential.
            </p>

            {/* Four pillars */}
            <div className="grid grid-cols-2 gap-3 mb-9">
              {pillars.map((p) => (
                <div key={p} className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-ctrs-amber flex-shrink-0" />
                  <span className="font-raleway font-medium text-sm text-ctrs-dark">{p}</span>
                </div>
              ))}
            </div>

            <a
              href="#academics"
              className="inline-flex items-center gap-2 font-raleway font-bold text-sm text-ctrs-green hover:text-ctrs-amber transition-colors group"
            >
              Explore Our Divisions
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
