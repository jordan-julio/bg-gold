// components/NewsletterSection.tsx
'use client'

import React, { useState } from 'react'

export interface NewsletterSectionProps {
  /** Heading text */
  title?: string
  /** Sub-heading or description text */
  description?: string
}

export default function NewsletterSection({
  title = 'Latest from BG Gold',
  description = 'Masukkan email untuk berlangganan informasi terbaru dari BG Gold.',
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // TODO: actually post to your newsletter endpoint
    setSubmitted(true)
    setEmail('')
    window.setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section
      className="relative w-full bg-cover bg-center py-20"
      //style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-[#3a1812]/60" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-white text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold">
          {title}
        </h2>
        <p className="text-lg md:text-xl">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Email"
                required
                className="
                  w-full 
                  border-b border-white/50 
                  bg-transparent 
                  py-3 
                  px-2 
                  placeholder-white/60 
                  focus:outline-none 
                  focus:border-white 
                  transition-all
                "
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="
                inline-flex 
                items-center 
                gap-2 
                px-6 
                py-3 
                border 
                border-white 
                rounded-full 
                font-medium 
                transition 
                duration-300 
                hover:bg-white 
                hover:text-black
                disabled:opacity-50
              "
              disabled={!email}
            >
              Subscribe
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
          {submitted && (
            <p className="mt-4 text-green-300 animate-fade-in">
              Terima kasih! Email Anda telah diterima.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
