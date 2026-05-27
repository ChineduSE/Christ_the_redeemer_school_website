'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Eye, EyeOff, Lock } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Incorrect password')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F2419] flex items-center justify-center px-4">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, #E07B39 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-16 h-16 mb-4">
            <Image src="/images/logo_ctrs.png" alt="CTRS" fill className="object-contain" />
          </div>
          <h1 className="font-playfair text-white text-2xl font-bold text-center">
            Christ The Redeemer&apos;s Schools
          </h1>
          <p className="font-raleway text-white/40 text-xs tracking-[0.2em] uppercase mt-1">
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-[#0F2419] flex items-center justify-center">
              <Lock size={16} className="text-white" />
            </div>
            <div>
              <p className="font-raleway font-bold text-ctrs-dark text-sm">Secure Access</p>
              <p className="font-opensans text-ctrs-dark/40 text-xs">Enter your admin password</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                required
                className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-lg font-opensans text-sm text-ctrs-dark placeholder-ctrs-dark/30 focus:outline-none focus:border-ctrs-green focus:ring-2 focus:ring-ctrs-green/10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ctrs-dark/30 hover:text-ctrs-dark/60 transition-colors"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <p className="font-opensans text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 bg-ctrs-green text-white font-raleway font-bold text-sm rounded-lg hover:bg-ctrs-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'Verifying…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center font-raleway text-white/20 text-xs mt-6">
          Christ The Redeemer&apos;s Schools · CMS v1.0
        </p>
      </div>
    </div>
  )
}
