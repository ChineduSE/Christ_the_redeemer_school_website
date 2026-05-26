'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'

const posts = [
  {
    slug: 'new-academic-session-2025-2026',
    category: 'Announcement',
    date: 'May 15, 2026',
    title: 'Admissions Now Open for the 2025/2026 Academic Session',
    excerpt:
      'Christ The Redeemer\'s Schools is pleased to announce that admissions are now open across all divisions — from Crèche to Secondary School. Limited spaces are available. Early applications are encouraged.',
    image: '/images/campus/campus-exterior-front-name-flag.jpeg',
    imgPos: 'object-cover object-center',
  },
  {
    slug: 'students-excel-inter-school-science',
    category: 'Achievement',
    date: 'April 28, 2026',
    title: 'CTRS Students Shine at the Edo State Inter-School Science Challenge',
    excerpt:
      'Our Secondary School science team represented Christ The Redeemer\'s Schools with distinction, clinching first place in the Biology category and second overall at this year\'s Edo State Inter-School Science Challenge.',
    image: '/images/science-lab/science-lab-interior-marble-benches-wide.jpeg',
    imgPos: 'object-cover object-center',
  },
  {
    slug: 'annual-speech-prize-giving-day-2026',
    category: 'Event',
    date: 'April 10, 2026',
    title: 'Annual Speech & Prize Giving Day — Date Announced',
    excerpt:
      'We are excited to announce the date for this year\'s Annual Speech and Prize Giving Day. Parents, guardians, and well-wishers are warmly invited to celebrate our students\' outstanding academic and character achievements.',
    image: '/images/students/secondary/secondary-large-group-photo-blazers.jpeg',
    imgPos: 'object-cover object-[center_30%]',
  },
]

const categoryColors: Record<string, string> = {
  Announcement: 'bg-ctrs-green text-white',
  Achievement: 'bg-ctrs-amber text-white',
  Event: 'bg-ctrs-emerald text-white',
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function Announcements() {
  return (
    <section className="bg-white py-16 sm:py-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <span className="section-label">News &amp; Announcements</span>
          <div className="amber-line mx-auto mt-3 mb-5" />
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-ctrs-green">
            Stay in the Know
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-ctrs-green/10 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden flex-shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`${post.imgPos} transition-transform duration-500 group-hover:scale-105`}
                />
                {/* Category badge */}
                <span
                  className={`absolute top-3 left-3 z-10 font-raleway font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full ${categoryColors[post.category]}`}
                >
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                {/* Date */}
                <div className="flex items-center gap-1.5 mb-3">
                  <Calendar size={12} className="text-ctrs-amber flex-shrink-0" />
                  <span className="font-raleway text-[11px] text-ctrs-dark/45 tracking-wide">
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-playfair font-bold text-lg text-ctrs-green leading-snug mb-3 group-hover:text-ctrs-amber transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="font-opensans text-sm text-ctrs-dark/60 leading-relaxed flex-1 mb-5">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <a
                  href={`/news/${post.slug}`}
                  className="inline-flex items-center gap-1.5 font-raleway font-bold text-sm text-ctrs-green hover:text-ctrs-amber transition-colors duration-200 self-start"
                >
                  Read More
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all */}
        <div className="mt-12 text-center">
          <a
            href="/news"
            className="inline-flex items-center gap-2 font-raleway font-semibold text-sm px-8 py-3 border-2 border-ctrs-green text-ctrs-green rounded-lg hover:bg-ctrs-green hover:text-white transition-all duration-300"
          >
            View All News &amp; Announcements
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-px bg-ctrs-amber/20 w-full mt-16 sm:mt-20" />
    </section>
  )
}
