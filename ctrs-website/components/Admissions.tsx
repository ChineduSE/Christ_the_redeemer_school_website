'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, FileText, Upload, PenLine, Check, Phone } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'Contact Us to Enquire',
    body: 'Reach out by phone or visit the school office to express interest, get an overview of available divisions, and ask any initial questions.',
    Icon: MessageCircle,
  },
  {
    num: '02',
    title: 'Collect Application Form',
    body: 'Obtain the official CTRS application form from the school office. The form covers personal details, division of interest, and parental information.',
    Icon: FileText,
  },
  {
    num: '03',
    title: 'Submit Required Documents',
    body: 'Return the completed form with all supporting documents. Our admissions team will review and confirm receipt within a few working days.',
    Icon: Upload,
  },
  {
    num: '04',
    title: 'Sit Entrance Assessment',
    body: 'Eligible applicants are invited for an age-appropriate entrance assessment and, where applicable, a brief interview with school leadership.',
    Icon: PenLine,
  },
]

const documents = [
  'Completed application form',
  'Recent passport photograph (2 copies)',
  'Birth certificate or age declaration',
  'Last school report (if applicable)',
  'Previous school leaving certificate',
  'Immunisation record (Crèche / Pre-School)',
]

const divisions = ['Crèche', 'Pre-School', 'Nursery', 'Kindergarten', 'Primary', 'Secondary']

export default function Admissions() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="admissions" ref={ref} className="bg-ctrs-green py-24 sm:py-32 relative overflow-hidden">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      {/* Decorative blobs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-ctrs-emerald/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-ctrs-amber/15 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-raleway text-[11px] tracking-[0.45em] uppercase font-semibold text-ctrs-amber">
            Join Our Community
          </span>
          <div className="amber-line mx-auto mt-3 mb-5" />
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4">
            Admissions
          </h2>
          <p className="font-opensans text-white/65 max-w-2xl mx-auto text-lg leading-relaxed">
            We welcome applications for all divisions — from Crèche through to Secondary School.
            Here&apos;s how to begin your child&apos;s journey at CTRS.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Steps timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-playfair text-2xl font-bold text-white mb-9">
              Application Process
            </h3>

            <div className="space-y-8 relative">
              {/* Connector line — centred on the 56px (w-14) circle */}
              <div className="absolute left-[27px] top-16 bottom-16 w-px bg-white/10" />

              {steps.map((step, i) => {
                const Icon = step.Icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                    className="flex gap-5 relative"
                  >
                    {/* Circle */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-ctrs-amber flex items-center justify-center shadow-lg z-10">
                      <span className="font-playfair font-bold text-white text-base leading-none">
                        {step.num}
                      </span>
                    </div>
                    <div className="pt-1.5">
                      <h4 className="font-raleway font-bold text-white text-base mb-1.5">
                        {step.title}
                      </h4>
                      <p className="font-opensans text-white/55 text-sm leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Docs + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="space-y-6"
          >
            {/* Documents checklist */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="font-playfair text-xl font-bold text-white mb-5">
                Required Documents
              </h3>
              <ul className="space-y-3">
                {documents.map((doc) => (
                  <li key={doc} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-ctrs-amber bg-ctrs-amber/10 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-ctrs-amber" />
                    </div>
                    <span className="font-opensans text-white/75 text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accepting divisions */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <p className="font-raleway font-semibold text-ctrs-amber text-xs uppercase tracking-widest mb-4">
                Accepting Applications For
              </p>
              <div className="flex flex-wrap gap-2">
                {divisions.map((d) => (
                  <span
                    key={d}
                    className="font-raleway text-sm text-white bg-white/10 border border-white/15 px-4 py-1.5 rounded-full"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="flex-1 font-raleway font-bold text-sm text-center py-4 bg-ctrs-amber text-white rounded-xl hover:bg-ctrs-amber/90 transition-all duration-300 shadow-lg hover:-translate-y-0.5"
              >
                Start Your Application
              </a>
              <a
                href="tel:07079401167"
                className="flex-1 font-raleway font-bold text-sm text-center py-4 border-2 border-white/25 text-white rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone size={15} /> Call Us Now
              </a>
            </div>
            <p className="font-opensans text-white/35 text-xs text-center">
              Admissions team available Mon – Fri, 7:30am – 4:00pm. Walk-ins welcome.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
