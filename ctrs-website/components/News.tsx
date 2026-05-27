'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Calendar, ArrowRight, FileText } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Announcement, AnnouncementCategory, CalendarEvent, CalendarEventType } from '@/types'

const CAT_COLORS: Record<AnnouncementCategory, string> = {
  Announcement: 'bg-ctrs-green text-white',
  Achievement: 'bg-ctrs-amber text-white',
  Event: 'bg-ctrs-emerald text-white',
}
const EV_COLORS: Record<CalendarEventType, string> = {
  Calendar: 'text-blue-500',
  Event: 'text-ctrs-amber',
  Special: 'text-purple-500',
}

export default function News() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [articles, setArticles] = useState<Announcement[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]

    supabase
      .from('announcements')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })
      .limit(4)
      .then(({ data }) => { if (data) setArticles(data as Announcement[]) })

    supabase
      .from('calendar_events')
      .select('*')
      .gte('event_date', today)
      .order('event_date', { ascending: true })
      .limit(5)
      .then(({ data }) => { if (data) setEvents(data as CalendarEvent[]) })
  }, [])

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
                key={article.id}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1 ${i === 0 ? 'sm:col-span-2' : ''}`}
              >
                <div className="relative overflow-hidden" style={{ height: i === 0 ? '220px' : '180px' }}>
                  {article.image_url ? (
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-ctrs-green/10 to-ctrs-amber/10 flex items-center justify-center">
                      <FileText size={30} className="text-ctrs-green/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className={`absolute top-4 left-4 font-raleway font-semibold text-[11px] text-white px-3 py-1.5 rounded-full ${CAT_COLORS[article.category]}`}>
                    {article.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-ctrs-dark/40 mb-2.5">
                    <Calendar size={11} />
                    <span className="font-raleway text-[11px]">
                      {new Date(article.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="font-playfair font-bold text-ctrs-dark text-[17px] leading-snug mb-2 group-hover:text-ctrs-green transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-opensans text-sm text-ctrs-dark/55 leading-relaxed mb-4 line-clamp-2">
                    {article.excerpt || article.body.slice(0, 130)}
                  </p>
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center gap-2 font-raleway font-semibold text-[13px] text-ctrs-green hover:text-ctrs-amber transition-colors group/link"
                  >
                    Read More{' '}
                    <ArrowRight size={13} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}

            {articles.length === 0 && (
              <div className="sm:col-span-2 bg-white rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
                <FileText size={28} className="text-ctrs-dark/15 mb-3" />
                <p className="font-opensans text-ctrs-dark/35 text-sm">No news published yet.</p>
              </div>
            )}
          </div>

          {/* Events sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-md p-6 lg:sticky lg:top-[86px]">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-1 h-6 bg-ctrs-amber rounded-full" />
                <h3 className="font-playfair text-xl font-bold text-ctrs-dark">Upcoming Events</h3>
              </div>

              {events.length === 0 ? (
                <p className="font-opensans text-sm text-ctrs-dark/35 text-center py-4">No upcoming events.</p>
              ) : (
                <div className="space-y-4">
                  {events.map((ev) => {
                    const d = new Date(ev.event_date + 'T00:00:00')
                    return (
                      <div key={ev.id} className="flex gap-4 items-start group/ev">
                        <div className="flex-shrink-0 w-12 h-12 bg-ctrs-cream rounded-xl flex flex-col items-center justify-center border border-ctrs-green/15 group-hover/ev:bg-ctrs-green group-hover/ev:border-ctrs-green transition-all duration-300">
                          <span className="font-playfair font-bold text-sm text-ctrs-green group-hover/ev:text-white transition-colors leading-none">
                            {d.getDate()}
                          </span>
                          <span className="font-raleway text-[9px] text-ctrs-dark/40 group-hover/ev:text-white/70 transition-colors uppercase tracking-wide">
                            {d.toLocaleDateString('en-GB', { month: 'short' })}
                          </span>
                        </div>
                        <div>
                          <p className="font-raleway font-semibold text-sm text-ctrs-dark group-hover/ev:text-ctrs-green transition-colors leading-snug">
                            {ev.title}
                          </p>
                          <p className={`font-opensans text-[11px] mt-0.5 ${EV_COLORS[ev.event_type]}`}>{ev.event_type}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              <div className="mt-7 pt-5 border-t border-gray-100 text-center">
                <Link href="/calendar" className="font-raleway font-semibold text-sm text-ctrs-green hover:text-ctrs-amber transition-colors">
                  View Full Calendar →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
