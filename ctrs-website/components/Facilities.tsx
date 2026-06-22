'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { BookOpen, FlaskConical, Monitor, Utensils, Palette, TreePine, Bus } from 'lucide-react'

const facilities = [
  {
    title: 'Library',
    description:
      'A well-stocked library spanning fiction, non-fiction, dictionaries, history, science, and Christian literature — designed for focused reading and research.',
    image: '/images/library/library-secondary-students-smiling-reading.jpeg',
    Icon: BookOpen,
  },
  {
    title: 'Science Laboratory',
    description:
      'Fully equipped with marble-top benches, glassware, anatomy models, microscopes, and chemical reagents — ready for hands-on scientific discovery.',
    image: '/images/science-lab/science-lab-interior-marble-benches-wide.jpeg',
    Icon: FlaskConical,
  },
  {
    title: 'Computer Laboratory',
    description:
      'A modern, air-conditioned ICT lab with HP desktops, individual cubicles, a smartboard, and high-speed access — preparing students for the digital world.',
    image: '/images/computer-lab/computer-lab-teacher-instructing-smartboard.jpeg',
    Icon: Monitor,
  },
  {
    title: 'Home Economics Lab',
    description:
      'A fully functional kitchen lab for practical Home Economics education, complete with gas cookers, utensils, and purpose-built workspaces.',
    image: '/images/home-economics/home-economics-lab-kitchen-utensils-counter.jpeg',
    Icon: Utensils,
  },
  {
    title: 'Music & Art',
    description:
      'A vibrant creative studio for music and visual arts — with keyboards, percussion, easels, and craft materials where students compose, paint, and perform with confidence.',
    image: '/images/Music-Art/DSC_9340.JPG',
    Icon: Palette,
  },
  {
    title: 'Playground',
    description:
      'A safe, turf-covered outdoor play area with swings, slides, a merry-go-round, a trampoline, and motivational murals celebrating the school motto.',
    image: '/images/playground/playground-full-view-motto-mural.jpeg',
    Icon: TreePine,
  },
  {
    title: 'School Transport',
    description:
      'Safe, fully branded school bus service available for students across all divisions — giving parents peace of mind on every journey.',
    image: '/images/transport/school-bus-branded-exterior.jpeg',
    Icon: Bus,
  },
]

export default function Facilities() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="facilities" ref={ref} className="bg-ctrs-cream py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label">Our Facilities</span>
          <div className="amber-line mx-auto mt-3 mb-5" />
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-ctrs-green mb-4">
            Equipped for Excellence
          </h2>
          <p className="font-opensans text-ctrs-dark/55 max-w-2xl mx-auto text-lg leading-relaxed">
            Seven specialised learning environments — designed to complement classroom education and
            ignite a love for discovery in every child.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, i) => {
            const Icon = facility.Icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Icon chip */}
                  <div className="absolute top-4 left-4 w-9 h-9 bg-ctrs-green rounded-lg flex items-center justify-center shadow-md">
                    <Icon className="text-white" size={17} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-ctrs-dark mb-2.5 group-hover:text-ctrs-green transition-colors duration-300">
                    {facility.title}
                  </h3>
                  <p className="font-opensans text-sm text-ctrs-dark/60 leading-relaxed">
                    {facility.description}
                  </p>
                  {/* Amber underline that expands on hover */}
                  <div className="mt-5 h-[2px] w-0 bg-ctrs-amber group-hover:w-full transition-all duration-500 rounded-full" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
