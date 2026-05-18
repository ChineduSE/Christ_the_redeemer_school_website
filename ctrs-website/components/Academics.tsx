'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const divisions = [
  {
    title: 'Crèche & Pre-School',
    ages: 'Infants – 2 yrs',
    tagline: 'Nurturing first steps',
    body: 'Montessori-inspired learning in a warm, safe environment. Practical life skills, sensory exploration, and care for every little one.',
    image: '/images/students/creche/creche-toddlers-round-table-blocks-group.jpeg',
    pos: 'center center',
    accent: '#1B5E3B',
  },
  {
    title: 'Nursery & Kindergarten',
    ages: '2 – 6 yrs',
    tagline: 'Learning through play',
    body: 'Play-based, structured early learning that builds curiosity, social skills, and a genuine love for discovery.',
    image: '/images/students/kindergarten/kindergarten-class-full-group.jpeg',
    pos: 'center center',
    accent: '#2E8B57',
  },
  {
    title: 'Primary School',
    ages: '6 – 12 yrs',
    tagline: 'A strong foundation',
    body: 'Solid academic grounding paired with character development and national values — preparing children for every stage ahead.',
    image: '/images/students/primary/primary-students-reading-colourful-classroom.jpeg',
    pos: 'center center',
    accent: '#1A7A6E',
  },
  {
    title: 'Secondary School',
    ages: '12 – 18 yrs',
    tagline: 'Ready for the world',
    body: 'Rigorous academics, the blazer tradition, and a culture of excellence — fully preparing students for university and life.',
    image: '/images/students/secondary/secondary-large-group-photo-blazers.jpeg',
    pos: 'center 30%',
    accent: '#E07B39',
  },
]

export default function Academics() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="academics" ref={ref} className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label">Our Divisions</span>
          <div className="amber-line mx-auto mt-3 mb-5" />
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-ctrs-green mb-4">
            A School for Every Stage
          </h2>
          <p className="font-opensans text-ctrs-dark/55 max-w-2xl mx-auto text-lg leading-relaxed">
            From a child&apos;s very first days to their final examinations — CTRS walks with every
            student through each season of growth.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {divisions.map((div, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
            >
              {/* Background image */}
              <Image
                src={div.image}
                alt={div.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ objectPosition: div.pos }}
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Age badge */}
              <div className="absolute top-4 left-4">
                <span
                  className="font-raleway font-semibold text-[11px] text-white px-3 py-1.5 rounded-full backdrop-blur-sm"
                  style={{ backgroundColor: div.accent + 'CC' }}
                >
                  {div.ages}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 inset-x-0 p-5">
                <p className="font-raleway text-[10px] tracking-widest uppercase text-ctrs-amber font-semibold mb-1.5">
                  {div.tagline}
                </p>
                <h3 className="font-playfair text-xl font-bold text-white leading-tight mb-2">
                  {div.title}
                </h3>

                {/* Description - visible on hover */}
                <p className="font-opensans text-sm text-white/70 leading-relaxed mb-4 max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500">
                  {div.body}
                </p>

                <a
                  href="#admissions"
                  className="inline-flex items-center gap-1.5 font-raleway font-semibold text-[13px] text-ctrs-amber group-hover:gap-2.5 transition-all duration-300"
                >
                  Learn More <ArrowRight size={13} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
