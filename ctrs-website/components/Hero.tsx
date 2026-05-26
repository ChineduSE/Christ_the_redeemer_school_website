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
    src: '/images/campus/campus-exterior-building-full-frontage.jpeg',
    imgCls: 'object-cover object-center',
    alt: 'Christ The Redeemer\'s Schools — campus exterior',
  },
]

const SUBTEXT = 'Raising spiritually grounded, academically excellent, and socially competent young people — from Crèche to Secondary School in Benin City, Edo State.'

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [typed, setTyped] = useState('')
  const [typingDone, setTypingDone] = useState(false)

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [next, paused])

  useEffect(() => {
    setTyped('')
    setTypingDone(false)
    let i = 0
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++
        setTyped(SUBTEXT.slice(0, i))
        if (i >= SUBTEXT.length) {
          clearInterval(id)
          setTypingDone(true)
        }
      }, 36)
      return () => clearInterval(id)
    }, 900)
    return () => clearTimeout(start)
  }, [])

  return (
    <section id="home" className="relative w-full h-[360px] sm:h-[460px] md:h-[540px] lg:h-[640px] overflow-hidden bg-black">

      {/* Slides */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
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

      {/* Left-to-right dark gradient — gives text a clean backdrop */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10 z-10" />

      {/* Extra bottom gradient on mobile so text at bottom stays readable */}
      <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-black/70 to-transparent z-10 sm:hidden" />

      {/* Text + CTA overlay */}
      <div className="absolute bottom-14 left-0 right-0 sm:inset-0 z-20 px-5 sm:px-10 lg:px-16 sm:flex sm:flex-col sm:justify-center">
        <div className="max-w-[85%] xs:max-w-[300px] sm:max-w-sm lg:max-w-xl">

          {/* Headline — school name */}
          <h1 className="font-playfair text-[1.6rem] sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2 sm:mb-3">
            Christ The Redeemer&apos;s Schools
          </h1>

          {/* Tagline — smaller, amber */}
          <p className="font-raleway text-[11px] sm:text-sm lg:text-base tracking-[0.08em] uppercase font-semibold text-ctrs-amber mb-3 sm:mb-4">
            Education For God&apos;s Glory
          </p>

          {/* Subtext — typewriter */}
          <p className="font-opensans text-[11.5px] sm:text-sm lg:text-[15px] text-white/80 leading-relaxed mb-4 sm:mb-6 lg:mb-8 min-h-[8em] sm:min-h-[4em]">
            {typed}
            {!typingDone && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                className="inline-block w-[1.5px] h-[1em] bg-white/70 align-middle ml-[1px] translate-y-[-1px]"
              />
            )}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <a
              href="#admissions"
              className="font-raleway font-bold text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-2.5 bg-ctrs-amber text-white rounded-lg hover:bg-ctrs-amber/90 transition-all duration-300 shadow-lg"
            >
              Apply Now
            </a>
            <a
              href="#about"
              className="font-raleway font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-2.5 border-2 border-white/70 text-white rounded-lg hover:bg-white hover:text-ctrs-green transition-all duration-300"
            >
              Explore School
            </a>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setPaused(true) }}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current ? 'w-8 bg-ctrs-amber' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
