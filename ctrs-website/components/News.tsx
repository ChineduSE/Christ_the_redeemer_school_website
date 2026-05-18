'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'

const articles = [
  {
    title: 'CTRS Students Excel at Edo State Mathematics Olympiad',
    excerpt:
      'Our Secondary School team brought home top honours, with two students placing in the top five overall — a remarkable achievement reflecting months of dedicated preparation.',
    date: 'May 12, 2026',
    category: 'Academic Achievement',
    image: '/images/students/secondary/secondary-class-teacher-writing-board.jpeg',
    featured: true,
  },
  {
    title: 'Computer Lab Expansion: 30 New Workstations Installed',
    excerpt:
      'CTRS has completed a major ICT upgrade, adding 30 new HP workstations and a second smartboard to serve our growing student body.',
    date: 'April 28, 2026',
    category: 'Facilities',
    image: '/images/computer-lab/computer-lab-new-computers-plastic-wrap.jpeg',
    featured: false,
  },
  {
    title: 'Annual Prize Giving Day — Celebrating Excellence Across All Divisions',
    excerpt:
      'This year\'s Prize Giving Day was a spectacular celebration of achievement, character, and co-curricular excellence from Crèche to Secondary.',
    date: 'March 15, 2026',
    category: 'Events',
    image: '/images/students/secondary/secondary-group-photo-blazers-1.jpeg',
    featured: false,
  },
]

const events = [
  { date: 'May 26', month: 'May', day: '26', title: 'Mid-Term Break Begins', type: 'Calendar' },
  { date: 'Jun 2', month: 'Jun', day: '2', title: 'Resumption — Third Term Continues', type: 'Calendar' },
  { date: 'Jun 14', month: 'Jun', day: '14', title: 'Sports Day — All Divisions', type: 'Event' },
  { date: 'Jul 11', month: 'Jul', day: '11', title: 'Third Term Examinations Begin', type: 'Calendar' },
  { date: 'Jul 25', month: 'Jul', day: '25', title: 'Prize Giving & Closing Ceremony', type: 'Special' },
]

export default function News() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="news" ref={ref} className="bg-ctrs-cream py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label">Latest Updates</span>
          <div className="amber-line mx-auto mt-3 mb-5" />
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-ctrs-green">
            News &amp; Events
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Articles — 2 col span */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5 content-start">
            {articles.map((article, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1 ${article.featured ? 'sm:col-span-2' : ''}`}
              >
                <div className="relative overflow-hidden" style={{ height: article.featured ? '220px' : '180px' }}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-4 left-4 font-raleway font-semibold text-[11px] text-white bg-ctrs-green px-3 py-1.5 rounded-full">
                    {article.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-ctrs-dark/40 mb-2.5">
                    <Calendar size={11} />
                    <span className="font-raleway text-[11px]">{article.date}</span>
                  </div>
                  <h3 className="font-playfair font-bold text-ctrs-dark text-[17px] leading-snug mb-2 group-hover:text-ctrs-green transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-opensans text-sm text-ctrs-dark/55 leading-relaxed mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 font-raleway font-semibold text-[13px] text-ctrs-green hover:text-ctrs-amber transition-colors group/link"
                  >
                    Read More{' '}
                    <ArrowRight size={13} className="transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Events sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-md p-6 lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-1 h-6 bg-ctrs-amber rounded-full" />
                <h3 className="font-playfair text-xl font-bold text-ctrs-dark">Upcoming Events</h3>
              </div>

              <div className="space-y-4">
                {events.map((ev, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-start group/ev cursor-pointer"
                  >
                    {/* Date tile */}
                    <div className="flex-shrink-0 w-12 h-12 bg-ctrs-cream rounded-xl flex flex-col items-center justify-center border border-ctrs-green/15 group-hover/ev:bg-ctrs-green group-hover/ev:border-ctrs-green transition-all duration-300">
                      <span className="font-playfair font-bold text-sm text-ctrs-green group-hover/ev:text-white transition-colors leading-none">
                        {ev.day}
                      </span>
                      <span className="font-raleway text-[9px] text-ctrs-dark/40 group-hover/ev:text-white/70 transition-colors uppercase tracking-wide">
                        {ev.month}
                      </span>
                    </div>
                    <div>
                      <p className="font-raleway font-semibold text-sm text-ctrs-dark group-hover/ev:text-ctrs-green transition-colors leading-snug">
                        {ev.title}
                      </p>
                      <p className="font-opensans text-[11px] text-ctrs-dark/40 mt-0.5">{ev.type}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 pt-5 border-t border-gray-100 text-center">
                <a href="#" className="font-raleway font-semibold text-sm text-ctrs-green hover:text-ctrs-amber transition-colors">
                  View Full Calendar →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
