'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    src: '/images/library/library-secondary-student-portrait-holding-book.jpeg',
    imgCls: 'object-cover object-[center_20%]',
    alt: 'Secondary student in CTRS uniform holding a book in the library',
  },
  {
    src: '/images/students/creche/creche-toddlers-playing-colorful-blocks-table.jpeg',
    imgCls: 'object-cover object-center',
    alt: 'Crèche toddlers playing with colourful blocks at the table',
  },
  {
    src: '/images/students/secondary/secondary-large-group-photo-blazers.jpeg',
    imgCls: 'object-cover object-[center_30%]',
    alt: 'Secondary students in blazers — school group photo',
  },
  {
    src: '/images/library/library-secondary-students-smiling-reading.jpeg',
    imgCls: 'object-cover object-center',
    alt: 'Students smiling and reading in the school library',
  },
  {
    src: '/images/campus/school-building.JPG',
    imgCls: 'object-cover object-center',
    alt: "Christ The Redeemer's Schools — school building",
  },
]

const pillars = ['Crèche to Secondary', 'Benin City, Edo State', 'Excellence in Character']

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 5500)
    return () => clearInterval(id)
  }, [next, paused])

  return (
    <section
      id="home"
      className="relative w-full h-[440px] sm:h-[540px] md:h-[620px] lg:h-[720px] overflow-hidden bg-ctrs-dark"
    >
      {/* Slides — with gentle Ken Burns scale */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].src}
            alt={slides[current].alt}
            fill
            priority
            sizes="100vw"
            className={slides[current].imgCls}
          />
        </motion.div>
      </AnimatePresence>

      {/* Layered overlays — image breathes but text stays legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 z-10" />

      {/* Left accent bar */}
      <div className="absolute left-0 inset-y-0 w-[3px] bg-gradient-to-b from-transparent via-ctrs-amber to-transparent z-30 opacity-60" />

      {/* Main content — vertically centred */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="px-8 sm:px-14 lg:px-20 w-full">
          <div className="max-w-[290px] xs:max-w-xs sm:max-w-md lg:max-w-xl">

            {/* Location eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-2.5 mb-4 sm:mb-5"
            >
              <span className="block w-6 h-px bg-ctrs-amber" />
              <span className="font-raleway text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-white/55 font-semibold">
                Benin City · Edo State
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-playfair text-[1.85rem] sm:text-[2.6rem] lg:text-[3.2rem] font-bold text-white leading-[1.12] mb-3 sm:mb-4"
            >
              Christ The{' '}
              <span className="relative whitespace-nowrap">
                Redeemer&apos;s
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.85, ease: 'easeOut' }}
                  style={{ originX: 0 }}
                  className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] bg-ctrs-amber rounded-full opacity-75 block"
                />
              </span>
              {' '}Schools
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="font-raleway text-[10.5px] sm:text-xs lg:text-sm tracking-[0.22em] uppercase font-bold text-ctrs-amber mb-5 sm:mb-6"
            >
              Education For God&apos;s Glory
            </motion.p>

            {/* Subtext — concise, breathing room, no typewriter */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.65 }}
              className="font-opensans text-[13px] sm:text-[14.5px] lg:text-[15.5px] text-white leading-[1.7] mb-7 sm:mb-9 max-w-[260px] sm:max-w-xs lg:max-w-sm"
            >
              Raising young people of character — spiritually rooted, academically excellent, and ready for the world ahead.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.82 }}
              className="flex flex-wrap gap-2.5 sm:gap-3"
            >
              <a
                href="#admissions"
                className="font-raleway font-bold text-[11.5px] sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 bg-ctrs-amber text-white rounded-lg hover:brightness-110 transition-all duration-300 shadow-lg shadow-black/30"
              >
                Apply Now
              </a>
              <a
                href="#about"
                className="font-raleway font-semibold text-[11.5px] sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 border border-white/40 text-white/85 rounded-lg hover:bg-white/10 hover:border-white/65 transition-all duration-300"
              >
                Explore School
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pillars strip — bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.05 }}
        className="absolute bottom-0 inset-x-0 z-20 hidden sm:flex items-center justify-center gap-0 bg-black/30 backdrop-blur-sm border-t border-white/8"
      >
        {pillars.map((item, i) => (
          <span
            key={i}
            className="flex items-center font-raleway text-[10px] lg:text-[11px] tracking-[0.18em] uppercase text-white/50 px-6 lg:px-8 py-3"
          >
            {i > 0 && <span className="w-px h-3 bg-white/20 mr-6 lg:mr-8 flex-shrink-0" />}
            <span className="w-1 h-1 rounded-full bg-ctrs-amber mr-2.5 flex-shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>

      {/* Slide indicators — aligned with content left */}
      <div className="absolute bottom-[52px] sm:bottom-14 left-8 sm:left-14 lg:left-20 z-20 flex items-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setPaused(true) }}
            className={`h-[2.5px] rounded-full transition-all duration-500 ${
              i === current ? 'w-7 bg-ctrs-amber' : 'w-2 bg-white/30 hover:bg-white/55'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* CTRS crest — top right, watermark style */}
      <div className="absolute top-5 right-6 z-20 opacity-25 pointer-events-none hidden lg:block">
        <div className="relative w-11 h-11">
          <Image src="/images/logo_ctrs.png" alt="" fill className="object-contain" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
