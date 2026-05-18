'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 5, suffix: '', label: 'School Divisions', sub: 'Crèche to Secondary' },
  { value: 25, suffix: '+', label: 'Years of Excellence', sub: 'Proven tradition' },
  { value: 50, suffix: '+', label: 'Qualified Teachers', sub: 'Dedicated educators' },
  { value: 1000, suffix: '+', label: 'Students Enrolled', sub: 'Growing community' },
  { value: 6, suffix: '', label: 'Specialised Facilities', sub: 'Modern learning spaces' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const steps = 60
    const increment = target / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count >= 1000 ? `${Math.floor(count / 1000)},${String(count % 1000).padStart(3, '0')}` : count}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="bg-ctrs-green relative overflow-hidden">
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Amber bottom accent */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-ctrs-amber" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`text-center ${i === 4 ? 'col-span-2 sm:col-span-3 lg:col-span-1' : ''}`}
            >
              {/* Number */}
              <p className="font-playfair text-4xl lg:text-5xl font-bold text-ctrs-amber mb-1 leading-none">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              {/* Label */}
              <p className="font-raleway font-semibold text-white text-xs sm:text-sm uppercase tracking-wider mt-2 mb-1">
                {stat.label}
              </p>
              {/* Sub */}
              <p className="font-opensans text-white/45 text-xs">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
