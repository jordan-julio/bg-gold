// app/page.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import Loader from '@/components/Loader'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { cormorantGaramond } from '@/lib/fonts'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [showLocations, setShowLocations] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  const contactMethods = [
    {
      icon: '💎',
      label: 'Visit Our Showrooms',
      detail: 'Experience luxury in person',
      action: () => setShowLocations(true),
      bg: 'bg-gradient-to-br from-[#ecca76] to-[#3a1812]'
    },
    {
      icon: '📱',
      label: 'WhatsApp',
      detail: '+62 813 3333 8888',
      action: () => window.open('https://wa.me/6281333338888', '_blank'),
      bg: 'bg-gradient-to-br from-green-500 to-green-700'
    },
    {
      icon: '📧',
      label: 'Email Us',
      detail: 'info@bggold.co.id',
      action: () => window.location.href = 'mailto:info@bggold.co.id',
      bg: 'bg-gradient-to-br from-blue-500 to-blue-700'
    },
    {
      icon: '📞',
      label: 'Call Us',
      detail: '+62 31 5912988',
      action: () => window.location.href = 'tel:+62315912988',
      bg: 'bg-gradient-to-br from-purple-500 to-purple-700'
    }
  ]

  const locations = [
    {
      name: 'Royal Plaza Showroom',
      address: 'LT. G, BLOK C Units 12,15,22,26',
      hours: '10:00 - 21:00 daily',
      map: 'https://maps.google.com/?q=Royal+Plaza+Surabaya'
    },
    {
      name: 'Pasar Atom Showroom',
      address: 'LT.1, BLOK A No.59-60',
      hours: '10:00 - 16:00 daily',
      map: 'https://maps.google.com/?q=Pasar+Atom+Mall+Surabaya'
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    await new Promise(r => setTimeout(r, 1000))
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  if (loading) {
      return (
        <div className="fixed inset-0 bg-[#3a1812] flex items-center justify-center z-50 flex-col ">
            <div>
            <h1 className={`${cormorantGaramond.className} text-7xl sm:text-8xl lg:text-9xl font-semibold text-white mb-6 leading-none tracking-tight`}>
                  B<span className="text-[#ecca76]">G</span>
                </h1>
                </div>
            <div className='flex flex-row'>
          <Loader type="circle" duration="2s" />
          <Loader type="triangle" duration="2s" />
          <Loader type="rect" duration='2s' />
          </div>
        </div>
      )
    }

  return (
    <div className="pt-28 flex flex-col min-h-screen bg-[#3a1812] text-white">
      {/* Hero */}
      <header className="py-20 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold">
          Get in Touch
        </h1>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Connect with our luxury jewelry experts for personalized service and exquisite craftsmanship.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-[#ecca76] text-[#3a1812] rounded-full font-semibold hover:opacity-90 transition">
            Send a Message
          </button>
          <button onClick={() => setShowLocations(true)}
                  className="px-6 py-3 border border-[#ecca76] rounded-full hover:bg-[#3a1812]/50 transition">
            View Showrooms
          </button>
        </div>
      </header>

      {/* Contact Methods */}
      <section className="py-16 px-6 bg-[#1a0a08]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((m, i) => (
            <div key={i} onClick={m.action}
                 className={`cursor-pointer p-6 rounded-xl ${m.bg} text-white hover:shadow-lg transition`}>
              <div className="text-3xl mb-3">{m.icon}</div>
              <h3 className="font-semibold text-lg">{m.label}</h3>
              <p className="text-sm mt-1 text-gray-200">{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form & Info */}
      <section ref={formRef} className="flex-1 py-16 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-[#1a0a08] p-8 rounded-2xl">
            {submitted ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4 text-[#ecca76]">🎉</div>
                <h2 className="text-2xl font-semibold">Thank you!</h2>
                <p className="mt-2 text-gray-300">We will be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm mb-1">Name</label>
                  <input name="name" required value={formData.name} onChange={handleChange}
                         className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:border-[#ecca76] transition" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input name="email" type="email" required value={formData.email} onChange={handleChange}
                         className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:border-[#ecca76] transition" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Message</label>
                  <textarea name="message" rows={5} required value={formData.message} onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:border-[#ecca76] transition resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-3 bg-[#ecca76] text-[#3a1812] rounded-lg font-semibold hover:opacity-90 transition">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Quick Info */}
          <div className="space-y-6">
            <div className="bg-[#1a0a08] p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 text-[#ecca76]">Office Information</h3>
              <p><strong>Address:</strong> Jl. Tidar No.23, Surabaya 60252</p>
              <p><strong>Hours:</strong> Mon-Sat 10:00-21:00; Sun 10:00-20:00</p>
            </div>
            <div className="bg-[#1a0a08] p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 text-[#ecca76]">Social Media</h3>
              <div className="flex space-x-4">
                <Link href="https://instagram.com/bggold" className="hover:text-[#ecca76]">📸 Instagram</Link>
                <Link href="https://facebook.com/bggold" className="hover:text-[#ecca76]">👥 Facebook</Link>
                <Link href="https://tiktok.com/@bggold" className="hover:text-[#ecca76]">🎵 TikTok</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showrooms Modal */}
      {showLocations && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6" onClick={() => setShowLocations(false)}>
          <div className="bg-[#0a0a0a] p-8 rounded-2xl max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-semibold text-[#ecca76] mb-4">Our Showrooms</h2>
            {locations.map((loc, i) => (
              <div key={i} className="mb-6">
                <p className="font-semibold text-white">{loc.name}</p>
                <p className="text-gray-400 text-sm">{loc.address}</p>
                <p className="text-gray-400 text-sm mb-2">{loc.hours}</p>
                <Link href={loc.map} className="text-[#ecca76] hover:underline" passHref>
                    View on Map ↗
                </Link>
              </div>
            ))}
            <button onClick={() => setShowLocations(false)} className="mt-4 w-full py-2 bg-[#3a1812] rounded-lg hover:opacity-90 transition">
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
