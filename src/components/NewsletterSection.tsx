// components/NewsletterSection.tsx
'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export interface NewsletterSectionProps {
  /** Custom class names */
  className?: string;
}

export default function GoldNewsletter({ className = '' }: NewsletterSectionProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // TODO: Add your submission logic here
    // For now, we'll just simulate a successful submission
    
    setSubmitted(true);
    setEmail('');
    
    // Reset the success message after 4 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className={`relative bg-[url('/images/texture-gold.jpg')] bg-cover bg-center w-full ${className}`}>
      {/* 60% gold-tinted overlay */}
      <div className="absolute inset-0 bg-yellow-900/30 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 text-center text-yellow-50 space-y-6">
        <h2 className="text-4xl md:text-5xl font-serif font-bold">
          {t('newsletter.title')}
        </h2>
        <p className="text-lg md:text-xl">
          {t('newsletter.description')}
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              id="newsletter-email"
              type="email"
              placeholder={t('newsletter.placeholder')}
              required
              className="
                flex-1
                bg-transparent
                border-b border-yellow-300
                py-3 px-2
                placeholder-white-400
                focus:outline-none focus:border-yellow-100
                transition
              "
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-label={t('newsletter.email')}
            />

            <button
              type="submit"
              disabled={!email}
              className="
                inline-flex items-center gap-2
                px-8 py-3
                bg-yellow-500 border border-yellow-400 rounded-full
                font-medium
                transition duration-300
                hover:bg-yellow-400 hover:text-black
                disabled:opacity-50
                text-[#e3e3e3] 
              "
            >
              {t('newsletter.button')}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
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
              {t('newsletter.success')}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}