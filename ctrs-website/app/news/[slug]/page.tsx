import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft, Download, FileText } from 'lucide-react'
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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data } = await supabase.from('announcements').select('title, excerpt, body').eq('slug', params.slug).single()
  if (!data) return {}
  return {
    title: `${data.title} | Christ The Redeemer's Schools`,
    description: data.excerpt || data.body.slice(0, 160),
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { data } = await supabase
    .from('announcements')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single()

  if (!data) notFound()
  const post = data as Announcement

  const paragraphs = post.body.split(/\n\n+/).filter(Boolean)

  return (
    <>
      <Navbar />
      <main>
        {/* Top banner */}
        <div className="bg-ctrs-green pt-28 pb-12 px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/news" className="inline-flex items-center gap-1.5 font-raleway text-white/50 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft size={14} /> All Announcements
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className={`font-raleway font-bold text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full ${CAT_COLORS[post.category]}`}>
                {post.category}
              </span>
              <div className="flex items-center gap-1.5 text-white/40">
                <Calendar size={12} />
                <span className="font-raleway text-xs">
                  {new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Article body */}
        <article className="bg-white py-14 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Cover image */}
            {post.image_url && (
              <div className="w-full rounded-2xl overflow-hidden mb-10 shadow-md">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 800px"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  priority
                />
              </div>
            )}

            {/* Excerpt / lead */}
            {post.excerpt && (
              <p className="font-playfair italic text-xl text-ctrs-dark/70 leading-relaxed border-l-4 border-ctrs-amber pl-6 mb-10">
                {post.excerpt}
              </p>
            )}

            {/* Body */}
            <div className="font-opensans text-base text-ctrs-dark/80 leading-relaxed space-y-5">
              {paragraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-line">{p}</p>
              ))}
            </div>

            {/* Document download */}
            {post.document_url && (
              <div className="mt-12 p-5 bg-ctrs-cream rounded-2xl border border-ctrs-green/15 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-ctrs-green/10 flex items-center justify-center flex-shrink-0">
                  <FileText size={20} className="text-ctrs-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-raleway font-semibold text-sm text-ctrs-dark">Attached Document</p>
                  <p className="font-opensans text-xs text-ctrs-dark/45 truncate">{post.document_name}</p>
                </div>
                <a
                  href={post.document_url}
                  download={post.document_name ?? true}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-raleway font-bold text-sm px-4 py-2.5 bg-ctrs-green text-white rounded-lg hover:bg-ctrs-green/90 transition-colors flex-shrink-0"
                >
                  <Download size={14} /> Download
                </a>
              </div>
            )}

            {/* Back link */}
            <div className="mt-14 pt-8 border-t border-gray-100">
              <Link href="/news" className="inline-flex items-center gap-2 font-raleway font-semibold text-sm text-ctrs-green hover:text-ctrs-amber transition-colors">
                <ArrowLeft size={14} /> Back to all announcements
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
