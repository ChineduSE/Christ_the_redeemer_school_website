import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import type { CalendarEvent, CalendarEventType } from '@/types'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const EV_STYLES: Record<CalendarEventType, { pill: string; dot: string }> = {
  Calendar: { pill: 'bg-blue-50 text-blue-600 border-blue-200', dot: 'bg-blue-400' },
  Event:    { pill: 'bg-amber-50 text-amber-600 border-amber-200', dot: 'bg-ctrs-amber' },
  Special:  { pill: 'bg-purple-50 text-purple-600 border-purple-200', dot: 'bg-purple-400' },
}

export const metadata = {
  title: "School Calendar | Christ The Redeemer's Schools",
  description: 'Upcoming events and key dates for the CTRS academic calendar.',
}

export default async function CalendarPage() {
  const { data } = await supabase
    .from('calendar_events')
    .select('*')
    .order('event_date', { ascending: true })

  const events = (data ?? []) as CalendarEvent[]

  // Group by month
  const grouped: Record<string, CalendarEvent[]> = {}
  events.forEach((ev) => {
    const key = new Date(ev.event_date + 'T00:00:00').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(ev)
  })

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-ctrs-green pt-28 pb-14 px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/#news" className="inline-flex items-center gap-1.5 font-raleway text-white/50 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft size={14} /> Back
            </Link>
            <span className="section-label text-ctrs-amber">Academic Calendar</span>
            <div className="amber-line mt-3 mb-5" />
            <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white">
              Upcoming Events
            </h1>
            <p className="font-opensans text-white/55 mt-4 max-w-md">
              Key dates, events, and important milestones for the current academic session.
            </p>
          </div>
        </div>

        <div className="bg-ctrs-cream py-16 px-4">
          <div className="max-w-3xl mx-auto">
            {events.length === 0 ? (
              <div className="text-center py-24">
                <CalendarDays size={40} className="text-ctrs-dark/15 mx-auto mb-4" />
                <p className="font-playfair text-xl text-ctrs-dark/30">No events scheduled yet.</p>
              </div>
            ) : (
              <div className="space-y-10">
                {Object.entries(grouped).map(([month, evs]) => (
                  <div key={month}>
                    <div className="flex items-center gap-4 mb-4">
                      <h2 className="font-playfair text-xl font-bold text-ctrs-dark">{month}</h2>
                      <div className="flex-1 h-px bg-ctrs-green/10" />
                    </div>
                    <div className="space-y-2">
                      {evs.map((ev) => {
                        const d = new Date(ev.event_date + 'T00:00:00')
                        const styles = EV_STYLES[ev.event_type]
                        return (
                          <div key={ev.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="flex-shrink-0 w-14 h-14 bg-ctrs-cream rounded-xl flex flex-col items-center justify-center border border-ctrs-green/15">
                              <span className="font-playfair font-bold text-lg text-ctrs-green leading-none">{d.getDate()}</span>
                              <span className="font-raleway text-[10px] text-ctrs-dark/40 uppercase tracking-wide">
                                {d.toLocaleDateString('en-GB', { month: 'short' })}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${styles.pill}`}>
                                  {ev.event_type}
                                </span>
                                {ev.event_end_date && ev.event_end_date !== ev.event_date && (
                                  <span className="font-opensans text-xs text-ctrs-dark/35">
                                    — {new Date(ev.event_end_date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                  </span>
                                )}
                              </div>
                              <p className="font-raleway font-semibold text-sm text-ctrs-dark">{ev.title}</p>
                              {ev.description && (
                                <p className="font-opensans text-xs text-ctrs-dark/45 mt-0.5">{ev.description}</p>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
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
