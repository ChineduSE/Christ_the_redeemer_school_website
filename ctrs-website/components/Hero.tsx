'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    src: '/images/students/secondary/secondary-students-raising-hands-happy.jpeg',
    imgCls: 'object-cover object-center',
    alt: 'Secondary students enthusiastically raising hands in class',
  },
  {
    src: '/images/students/secondary/secondary-students-raising-hands-group.jpeg',
    imgCls: 'object-cover object-center',
    alt: 'Group of secondary students raising hands',
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

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [next, paused])

  return (
    <section id="home" className="relative w-full h-[280px] sm:h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden bg-black">

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

      {/* Bottom gradient — covers CTA + dots area */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/65 to-transparent z-10" />

      {/* CTAs — float above the slide dots */}
      <div className="absolute bottom-11 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 whitespace-nowrap">
        <a
          href="#admissions"
          className="font-raleway font-bold text-sm px-6 py-2.5 bg-ctrs-amber text-white rounded-lg hover:bg-ctrs-amber/90 transition-all duration-300 shadow-lg"
        >
          Apply Now
        </a>
        <a
          href="#about"
          className="font-raleway font-semibold text-sm px-6 py-2.5 border-2 border-white/70 text-white rounded-lg hover:bg-white hover:text-ctrs-green transition-all duration-300"
        >
          Explore School
        </a>
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
