'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Bell } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Announcement, AnnouncementCategory } from '@/types'

const CAT_COLORS: Record<AnnouncementCategory, string> = {
  Announcement: 'bg-ctrs-green text-white',
  Achievement: 'bg-ctrs-amber text-white',
  Event: 'bg-ctrs-emerald text-white',
}

export default function PopupAnnouncement() {
  const [post, setPost] = useState<Announcement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    supabase
      .from('announcements')
      .select('*')
      .eq('is_published', true)
      .eq('is_popup', true)
      .single()
      .then(({ data }) => {
        if (data) {
          setPost(data as Announcement)
          // Small delay so the page loads first
          setTimeout(() => setVisible(true), 800)
        }
      })
  }, [])

  if (!post) return null

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-sm"
            onClick={() => setVisible(false)}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto">
              {/* Image or colour banner */}
              {post.image_url ? (
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    width={0}
                    height={0}
                    sizes="500px"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  <span className={`absolute top-4 left-4 font-raleway font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full ${CAT_COLORS[post.category]}`}>
                    {post.category}
                  </span>
                </div>
              ) : (
                <div className="bg-ctrs-green px-6 pt-6 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                      <Bell size={15} className="text-white" />
                    </div>
                    <span className={`font-raleway font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full ${CAT_COLORS[post.category]}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {!post.image_url && (
                  <div className="w-8 h-[3px] bg-ctrs-amber rounded mb-4" />
                )}
                <h2 className="font-playfair font-bold text-xl text-ctrs-dark leading-snug mb-3">
                  {post.title}
                </h2>
                <p className="font-opensans text-sm text-ctrs-dark/60 leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt || post.body.slice(0, 180)}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setVisible(false)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg font-raleway font-semibold text-sm text-ctrs-dark/60 hover:bg-gray-50 transition-colors"
                  >
                    Dismiss
                  </button>
                  <Link
                    href={`/news/${post.slug}`}
                    onClick={() => setVisible(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-ctrs-amber text-white rounded-lg font-raleway font-bold text-sm hover:brightness-110 transition-all"
                  >
                    Read Full Announcement <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setVisible(false)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-ctrs-dark/50 hover:text-ctrs-dark shadow-sm hover:shadow transition-all"
              >
                <X size={15} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
