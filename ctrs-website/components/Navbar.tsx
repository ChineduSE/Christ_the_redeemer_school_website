'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#academics', label: 'Academics' },
  { href: '#facilities', label: 'Facilities' },
  { href: '#admissions', label: 'Admissions' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#news', label: 'News' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-md shadow-sm py-3 border-b border-gray-100'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-11 h-11">
              <Image
                src="/images/logo_ctrs.png"
                alt="CTRS Logo"
                fill
                className="object-contain drop-shadow-sm"
              />
            </div>
            <div className={`hidden sm:block transition-colors duration-300 ${scrolled ? 'text-ctrs-green' : 'text-white'}`}>
              <p className="font-raleway font-bold text-[11px] leading-tight tracking-widest uppercase">
                Christ The Redeemer&apos;s
              </p>
              <p className="font-raleway font-light text-[10px] tracking-[0.3em] uppercase opacity-80">
                Schools
              </p>
            </div>
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-raleway font-medium text-[13px] px-3 py-2 rounded-md transition-colors duration-300 ${
                  scrolled
                    ? 'text-ctrs-dark hover:text-ctrs-green'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href="#"
              className={`font-raleway font-semibold text-[13px] px-4 py-2 rounded-md border-2 transition-all duration-300 ${
                scrolled
                  ? 'border-ctrs-green text-ctrs-green hover:bg-ctrs-green hover:text-white'
                  : 'border-white/70 text-white hover:bg-white hover:text-ctrs-green'
              }`}
            >
              School Portal
            </a>
            <a
              href="#admissions"
              className="font-raleway font-bold text-[13px] px-5 py-2 rounded-md bg-ctrs-amber text-white hover:bg-ctrs-amber/90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Apply Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors ${
              scrolled ? 'text-ctrs-dark' : 'text-white'
            }`}
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
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 py-4 space-y-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-raleway font-medium text-ctrs-dark hover:text-ctrs-green py-2.5 px-3 rounded-lg hover:bg-ctrs-cream transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 pb-1 flex flex-col gap-2.5">
                <a
                  href="#"
                  className="font-raleway font-semibold text-sm text-center py-2.5 border-2 border-ctrs-green text-ctrs-green rounded-lg hover:bg-ctrs-green hover:text-white transition-all"
                >
                  School Portal
                </a>
                <a
                  href="#admissions"
                  onClick={() => setMenuOpen(false)}
                  className="font-raleway font-bold text-sm text-center py-2.5 bg-ctrs-amber text-white rounded-lg hover:bg-ctrs-amber/90 transition-all shadow-md"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
