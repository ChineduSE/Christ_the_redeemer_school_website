import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowLeft, ArrowRight, FileText } from 'lucide-react'
import type { Announcement, AnnouncementCategory } from '@/types'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const CAT_COLORS: Record<AnnouncementCategory, string> = {
  Announcement: 'bg-ctrs-green text-white',
  Achievement: 'bg-ctrs-amber text-white',
  Event: 'bg-ctrs-emerald text-white',
}

export const metadata = {
  title: "News & Announcements | Christ The Redeemer's Schools",
  description: 'Stay up to date with the latest news, achievements, and events from CTRS.',
}

export default async function NewsPage() {
  const { data: posts } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true })

  const announcements = (posts ?? []) as Announcement[]

  return (
    <>
      <Navbar />
      <main>
        {/* Hero banner */}
        <div className="bg-ctrs-green pt-28 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-1.5 font-raleway text-white/50 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <span className="section-label text-ctrs-amber">News &amp; Announcements</span>
            <div className="amber-line mt-3 mb-5" />
            <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white leading-tight">
              Stay in the Know
            </h1>
            <p className="font-opensans text-white/60 text-base mt-4 max-w-lg">
              The latest updates, achievements, and events from Christ The Redeemer&apos;s Schools.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-ctrs-cream py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {announcements.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-playfair text-2xl text-ctrs-dark/30">No announcements yet.</p>
                <p className="font-opensans text-ctrs-dark/30 mt-2 text-sm">Check back soon.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {announcements.map((post) => (
                  <article key={post.id} className="group bg-white rounded-2xl overflow-hidden border border-ctrs-green/8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
                    <div className="relative w-full flex-shrink-0">
                      {post.image_url ? (
                        <>
                          <Image
                            src={post.image_url}
                            alt={post.title}
                            width={0}
                            height={0}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                            className="transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className={`absolute top-3 left-3 z-10 font-raleway font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full ${CAT_COLORS[post.category]}`}>
                            {post.category}
                          </span>
                        </>
                      ) : (
                        <div className="w-full py-10 bg-gradient-to-br from-ctrs-green/10 to-ctrs-amber/10 flex flex-col items-center justify-center gap-2">
                          <FileText size={36} className="text-ctrs-green/20" />
                          <span className={`font-raleway font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full ${CAT_COLORS[post.category]}`}>
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <Calendar size={11} className="text-ctrs-amber flex-shrink-0" />
                        <span className="font-raleway text-[11px] text-ctrs-dark/40">
                          {new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <h2 className="font-playfair font-bold text-ctrs-green text-base leading-snug mb-2.5 group-hover:text-ctrs-amber transition-colors flex-1">
                        {post.title}
                      </h2>
                      <p className="font-opensans text-sm text-ctrs-dark/55 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt || post.body.slice(0, 150)}
                      </p>
                      <Link href={`/news/${post.slug}`} className="inline-flex items-center gap-1.5 font-raleway font-bold text-sm text-ctrs-green hover:text-ctrs-amber transition-colors self-start">
                        Read More <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
