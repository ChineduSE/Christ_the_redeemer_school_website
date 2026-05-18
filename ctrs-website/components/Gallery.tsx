'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  { src: '/images/students/secondary/secondary-students-raising-hands-happy.jpeg', alt: 'Students enthusiastically raising hands', tall: true },
  { src: '/images/library/library-secondary-students-smiling-reading.jpeg', alt: 'Students smiling in the library', tall: false },
  { src: '/images/students/secondary/secondary-large-group-photo-blazers.jpeg', alt: 'Secondary school group photo', tall: false },
  { src: '/images/students/creche/creche-toddlers-round-table-blocks-group.jpeg', alt: 'Crèche toddlers at the group table', tall: true },
  { src: '/images/computer-lab/computer-lab-teacher-instructing-smartboard.jpeg', alt: 'Teacher instructing on smartboard', tall: false },
  { src: '/images/science-lab/science-lab-interior-marble-benches-wide.jpeg', alt: 'Science laboratory interior', tall: false },
  { src: '/images/campus/campus-exterior-building-full-frontage.jpeg', alt: 'CTRS campus exterior', tall: false },
  { src: '/images/students/kindergarten/kindergarten-class-full-group.jpeg', alt: 'Kindergarten class group', tall: false },
  { src: '/images/library/library-secondary-student-portrait-holding-book.jpeg', alt: 'Student holding book portrait', tall: true },
  { src: '/images/students/secondary/secondary-students-raising-hands-group.jpeg', alt: 'Group of students raising hands', tall: false },
  { src: '/images/playground/playground-full-view-motto-mural.jpeg', alt: 'Playground with school motto mural', tall: false },
  { src: '/images/students/creche/creche-toddler-pouring-water-practical-life.jpeg', alt: 'Montessori practical life activity', tall: false },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const prev = useCallback(() => {
    setLightbox((l) => (l === null ? null : (l - 1 + images.length) % images.length))
  }, [])

  const next = useCallback(() => {
    setLightbox((l) => (l === null ? null : (l + 1) % images.length))
  }, [])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, prev, next])

  return (
    <section id="gallery" ref={ref} className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label">Photo Gallery</span>
          <div className="amber-line mx-auto mt-3 mb-5" />
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-ctrs-green mb-4">
            Life at CTRS
          </h2>
          <p className="font-opensans text-ctrs-dark/55 max-w-xl mx-auto leading-relaxed">
            A glimpse into the vibrant community, learning moments, and beautiful spaces that make
            Christ The Redeemer&apos;s Schools a truly special place.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className="break-inside-avoid mb-4 group relative overflow-hidden rounded-xl cursor-pointer shadow hover:shadow-xl transition-shadow duration-300"
              onClick={() => setLightbox(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={img.tall ? 520 : 300}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ctrs-green/0 group-hover:bg-ctrs-green/50 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md"
                  size={26}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setLightbox(null)}
            >
              <X size={20} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={(e) => { e.stopPropagation(); prev() }}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Next */}
            <button
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={(e) => { e.stopPropagation(); next() }}
            >
              <ChevronRight size={22} />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightbox}
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-4xl max-h-[82vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[lightbox].src}
                  alt={images[lightbox].alt}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[82vh] w-full rounded-lg"
                />
                <p className="text-center font-opensans text-white/50 text-xs mt-3">
                  {lightbox + 1} / {images.length} &mdash; {images[lightbox].alt}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
