import Image from 'next/image'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

const links: Record<string, string[]> = {
  School: ['About Us', 'Vision & Mission', "Director's Message", 'CRSM Overview'],
  Academics: ['Crèche & Pre-School', 'Nursery & Kindergarten', 'Primary School', 'Secondary School'],
  Facilities: ['Library', 'Science Laboratory', 'Computer Lab', 'Playground', 'Transport'],
  Connect: ['Admissions', 'Gallery', 'News & Events', 'Contact Us', 'Parent Portal'],
}

const social = [
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Twitter, label: 'Twitter / X' },
  { Icon: Youtube, label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-ctrs-dark text-white">
      {/* Top amber accent */}
      <div className="h-1 bg-ctrs-amber" />

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <a href="#home" className="flex items-center gap-3 mb-5">
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image src="/images/logo_ctrs.png" alt="CTRS Logo" fill className="object-contain" />
              </div>
              <div>
                <p className="font-raleway font-bold text-[10px] text-white/80 uppercase tracking-widest leading-tight">
                  Christ The Redeemer&apos;s
                </p>
                <p className="font-raleway font-light text-[10px] text-white/60 uppercase tracking-[0.3em]">
                  Schools
                </p>
              </div>
            </a>

            <p className="font-playfair italic text-ctrs-amber text-sm mb-4">
              &ldquo;Education For God&apos;s Glory&rdquo;
            </p>
            <p className="font-opensans text-white/40 text-xs leading-relaxed mb-1">
              9, Adesuwa Street, Off Airport Road,
            </p>
            <p className="font-opensans text-white/40 text-xs mb-4">
              Benin City, Edo State, Nigeria
            </p>
            <p className="font-opensans text-white/40 text-xs">07079401167</p>
            <p className="font-opensans text-white/40 text-xs mb-6">09010360811</p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {social.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-ctrs-amber hover:border-ctrs-amber hover:scale-110 transition-all duration-300"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="font-raleway font-bold text-[10px] uppercase tracking-[0.35em] text-ctrs-amber mb-5">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-opensans text-[13px] text-white/45 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/8 mx-4 sm:mx-8" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-opensans text-[11px] text-white/25">
            © {new Date().getFullYear()} Christ The Redeemer&apos;s Schools. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-ctrs-amber" />
            <p className="font-raleway text-[11px] text-white/25">
              Managed by Christ The Redeemer&apos;s Schools Management (CRSM)
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
