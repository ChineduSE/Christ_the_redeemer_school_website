'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const slides = [
  {
    src: '/images/students/secondary/secondary-students-raising-hands-happy.jpeg',
    pos: 'center center',
    mobilePos: 'center top',
  },
  {
    src: '/images/students/secondary/secondary-students-raising-hands-group.jpeg',
    pos: 'center center',
    mobilePos: 'center top',
  },
  {
    src: '/images/students/secondary/secondary-large-group-photo-blazers.jpeg',
    pos: 'center 30%',
    mobilePos: 'center top',
  },
  {
    src: '/images/library/library-secondary-students-smiling-reading.jpeg',
    pos: 'center center',
    mobilePos: 'center 25%',
  },
  {
    src: '/images/campus/campus-exterior-building-full-frontage.jpeg',
    pos: 'center center',
    mobilePos: 'center center',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [next, paused])

  const activeSlide = slides[current]
  const objectPosition = isMobile ? activeSlide.mobilePos : activeSlide.pos

  return (
    <section id="home" className="relative w-full h-screen min-h-[580px] overflow-hidden bg-black">

      {/* Slides */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={activeSlide.src}
            alt="Christ The Redeemer's Schools"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ctrs-green/25 to-transparent z-10" />

      {/* Amber top accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-ctrs-amber z-20" />

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-5 sm:px-6">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-5 sm:mb-7"
        >
          <span className="font-raleway text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.5em] uppercase font-semibold px-4 sm:px-5 py-2 border border-ctrs-amber/60 text-ctrs-amber rounded-full inline-block">
            Benin City, Edo State, Nigeria
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-playfair text-4xl sm:text-5xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.1] mb-5 sm:mb-7 max-w-4xl"
        >
          Education For{' '}
          <span className="italic text-ctrs-amber">God&apos;s Glory</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="font-opensans text-base sm:text-lg lg:text-xl text-white/80 max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
        >
          Raising spiritually grounded, academically excellent, and socially competent young people
          — from Crèche to Secondary School.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <a
            href="#admissions"
            className="w-full sm:w-auto font-raleway font-bold text-base px-9 py-4 bg-ctrs-amber text-white rounded-lg hover:bg-ctrs-amber/90 transition-all duration-300 shadow-xl hover:-translate-y-0.5 text-center"
          >
            Apply Now
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto font-raleway font-semibold text-base px-9 py-4 border-2 border-white/70 text-white rounded-lg hover:bg-white hover:text-ctrs-green transition-all duration-300 text-center"
          >
            Explore School
          </a>
        </motion.div>
      </div>

      {/* Slide indicators — larger tap targets on mobile */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setPaused(true) }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? 'w-8 bg-ctrs-amber' : 'w-3 bg-white/40 hover:bg-white/70'
            }`}
            style={{ minWidth: '12px', minHeight: '24px', padding: '8px 4px', boxSizing: 'content-box' }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors"
      >
        <span className="font-raleway text-[10px] tracking-widest uppercase">Discover</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.a>
    </section>
  )
}
