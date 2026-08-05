'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const SCHOOL_PORTAL_URL = 'https://christtheredeemer.schoolsfocus.net/signin'

const navLinks = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#academics', label: 'Academics' },
  { href: '/#facilities', label: 'Facilities' },
  { href: '/#admissions', label: 'Admissions' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#news', label: 'News' },
  { href: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-ctrs-green/15 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[70px] gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11">
              <Image
                src="/images/logo_ctrs.png"
                alt="CTRS Logo"
                fill
                className="object-contain drop-shadow-sm"
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-raleway font-bold text-[11px] leading-tight tracking-widest uppercase text-ctrs-green">
                Christ The Redeemer&apos;s
              </p>
              <p className="font-raleway font-light text-[10px] tracking-[0.3em] uppercase text-ctrs-green/55">
                Schools
              </p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-raleway font-medium text-[13px] px-3 py-2 rounded-md text-ctrs-green/75 hover:text-ctrs-green hover:bg-ctrs-green/8 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href={SCHOOL_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-raleway font-semibold text-[13px] px-4 py-2 rounded-md border-2 border-ctrs-green/40 text-ctrs-green hover:bg-ctrs-green hover:text-white transition-all duration-300"
            >
              School Portal
            </a>
            <Link
              href="/#admissions"
              className="font-raleway font-bold text-[13px] px-5 py-2 rounded-md bg-ctrs-amber text-white hover:bg-ctrs-amber/90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-md text-ctrs-green hover:bg-ctrs-green/10 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-ctrs-green border-t border-white/10 overflow-hidden shadow-xl"
          >
            <div className="px-4 py-4 space-y-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-raleway font-medium text-white/80 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 pb-1 flex flex-col gap-2.5">
                <a
                  href={SCHOOL_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="font-raleway font-semibold text-sm text-center py-2.5 border-2 border-white/30 text-white rounded-lg hover:bg-white hover:text-ctrs-green transition-all"
                >
                  School Portal
                </a>
                <Link
                  href="/#admissions"
                  onClick={() => setMenuOpen(false)}
                  className="font-raleway font-bold text-sm text-center py-2.5 bg-ctrs-amber text-white rounded-lg hover:bg-ctrs-amber/90 transition-all shadow-md"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
