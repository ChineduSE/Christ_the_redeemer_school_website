'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

const contactInfo = [
  {
    Icon: MapPin,
    label: 'Address',
    lines: ['9, Adesuwa Street, Off Airport Road,', 'Benin City, Edo State, Nigeria'],
    href: 'https://maps.google.com/?q=9+Adesuwa+Street+Airport+Road+Benin+City',
  },
  {
    Icon: Phone,
    label: 'Phone',
    lines: ['07079401167', '09010360811'],
    href: 'tel:07079401167',
  },
  {
    Icon: Mail,
    label: 'Email',
    lines: ['info@ctrs.edu.ng'],
    href: 'mailto:info@ctrs.edu.ng',
  },
  {
    Icon: Clock,
    label: 'Office Hours',
    lines: ['Mon – Fri: 7:30am – 4:00pm', 'Saturday: 8:00am – 12:00pm'],
    href: null,
  },
]

const subjects = [
  'Admissions Enquiry',
  'Academic Information',
  'Facilities & Campus Tours',
  'Fees & Financial Information',
  'General Enquiry',
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const input =
    'w-full px-4 py-3 border border-gray-200 rounded-lg font-opensans text-sm text-ctrs-dark placeholder-ctrs-dark/30 focus:outline-none focus:border-ctrs-green focus:ring-2 focus:ring-ctrs-green/10 transition-all bg-white'

  return (
    <section id="contact" ref={ref} className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label">Get In Touch</span>
          <div className="amber-line mx-auto mt-3 mb-5" />
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-ctrs-green mb-4">
            Contact Us
          </h2>
          <p className="font-opensans text-ctrs-dark/55 max-w-xl mx-auto leading-relaxed">
            We&apos;d love to hear from you. Our team is ready to answer any questions about
            admissions, programmes, or anything else.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <h3 className="font-playfair text-2xl font-bold text-ctrs-dark">School Information</h3>

            <div className="space-y-5">
              {contactInfo.map(({ Icon, label, lines, href }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 bg-ctrs-cream rounded-lg flex items-center justify-center flex-shrink-0 border border-ctrs-green/15 shadow-sm">
                    <Icon size={17} className="text-ctrs-green" />
                  </div>
                  <div>
                    <p className="font-raleway font-semibold text-xs uppercase tracking-wider text-ctrs-dark/50 mb-1">
                      {label}
                    </p>
                    {lines.map((line, j) =>
                      href && j === 0 ? (
                        <a
                          key={j}
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="font-opensans text-sm text-ctrs-dark/70 hover:text-ctrs-green transition-colors block"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={j} className="font-opensans text-sm text-ctrs-dark/70">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-ctrs-cream aspect-video flex flex-col items-center justify-center gap-2 text-ctrs-dark/40">
              <MapPin size={28} className="text-ctrs-green/50" />
              <p className="font-raleway text-sm text-center">9, Adesuwa Street</p>
              <p className="font-raleway text-xs text-center">Off Airport Road, Benin City</p>
              <a
                href="https://maps.google.com/?q=9+Adesuwa+Street+Airport+Road+Benin+City+Edo+State+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 font-raleway text-xs font-semibold text-ctrs-green hover:text-ctrs-amber transition-colors"
              >
                Open in Google Maps →
              </a>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-16 bg-ctrs-green rounded-full flex items-center justify-center mb-5 shadow-lg">
                  <CheckCircle className="text-white" size={30} />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-ctrs-dark mb-2">
                  Message Sent!
                </h3>
                <p className="font-opensans text-ctrs-dark/55 max-w-sm mx-auto mb-7">
                  Thank you for reaching out. Our admissions team will respond within one working day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                  className="font-raleway font-semibold text-sm text-ctrs-green hover:text-ctrs-amber transition-colors"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-raleway font-semibold text-[11px] uppercase tracking-wider text-ctrs-dark/50 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={input}
                    />
                  </div>
                  <div>
                    <label className="block font-raleway font-semibold text-[11px] uppercase tracking-wider text-ctrs-dark/50 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={input}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-raleway font-semibold text-[11px] uppercase tracking-wider text-ctrs-dark/50 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 08012345678"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={input}
                    />
                  </div>
                  <div>
                    <label className="block font-raleway font-semibold text-[11px] uppercase tracking-wider text-ctrs-dark/50 mb-2">
                      Subject *
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className={input}
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-raleway font-semibold text-[11px] uppercase tracking-wider text-ctrs-dark/50 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us how we can help…"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${input} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-raleway font-bold text-base py-4 bg-ctrs-green text-white rounded-xl hover:bg-ctrs-green/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Send size={17} /> Send Message
                </button>

                <p className="font-opensans text-[11px] text-ctrs-dark/35 text-center">
                  Your information is used only to respond to your enquiry. We respect your privacy.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
