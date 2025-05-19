'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import KeyboardDoubleArrowDownSharpIcon from '@mui/icons-material/KeyboardDoubleArrowDownSharp'
import { useLanguage } from '@/context/LanguageContext'

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const logoRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Logo animation
    tl.fromTo(
      logoRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )

    // Nav links animation
    tl.fromTo(
      navRef.current?.querySelectorAll('.nav-link') || [],
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
      '-=0.5'
    )

    // Text fade-in
    tl.fromTo(
      textRef.current?.querySelectorAll('.fade-in') || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8 },
      '-=0.4'
    )

    // CTA buttons fade-in with scale
    tl.fromTo(
      ctaRef.current?.querySelectorAll('.cta-button') || [],
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.2, duration: 0.7 },
      '-=0.3'
    )

    // Setup hover animations for nav links
    const navLinks = navRef.current?.querySelectorAll('.nav-link') || []
    navLinks.forEach(link => {
      const underline = link.querySelector('.nav-underline')

      link.addEventListener('mouseenter', () => {
        gsap.to(underline, { width: '100%', duration: 0.3, ease: 'power1.out' })
      })

      link.addEventListener('mouseleave', () => {
        gsap.to(underline, { width: '0%', duration: 0.3, ease: 'power1.out' })
      })
    })

    // Setup hover animations for CTA buttons
    const ctaButtons = ctaRef.current?.querySelectorAll('.cta-button') || []
    ctaButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.05, duration: 0.3, ease: 'power1.out' })
      })

      button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3, ease: 'power1.out' })
      })
    })

    return () => {
      // Cleanup event listeners
      navLinks.forEach(link => {
        link.removeEventListener('mouseenter', () => {})
        link.removeEventListener('mouseleave', () => {})
      })

      ctaButtons.forEach(button => {
        button.removeEventListener('mouseenter', () => {})
        button.removeEventListener('mouseleave', () => {})
      })
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col">
      {/* Background GIF */}
      <Image
        src="/test.gif"
        alt="Premium Gold Jewelry"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover object-center"
        unoptimized
      />
      {/* Theme overlay */}
      <div className="absolute inset-0 bg-[#3a1812]/40" />
      {/* Hero Content */}
      <div
        ref={textRef}
        className="flex-1 flex flex-col items-start justify-center relative z-10 max-w-3xl px-8 md:px-12 lg:px-24"
      >
        <h1 className="fade-in font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#e3e3e3] leading-tight">
          {t('hero.title')}
        </h1>
        <p className="fade-in mt-4 text-lg md:text-xl text-gray-200 max-w-md">
          {t('hero.subtitle')}
        </p>
        {/* Brand Tagline */}
        <p className="fade-in mt-2 text-sm uppercase text-yellow-400 tracking-wider">{t('hero.tagline')}</p>

        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-6">
          <Link
            href="/discover"
            className="cta-button relative overflow-hidden group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-[#e3e3e3] font-medium rounded-full shadow-lg transform transition-all"
          >
            <span className="relative z-10">{t('hero.discover')}</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Link>

          <Link
            href="/contact"
            className="cta-button relative overflow-hidden group flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white/80 text-[#e3e3e3] font-medium rounded-full shadow-lg backdrop-blur-sm transform transition-all"
          >
            <span className="relative z-10">{t('hero.contact')}</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Link>
        </div>
      </div>

      {/* Centered Scroll Indicator */}
      <div className="absolute left-1/2 bottom-1 transform -translate-x-1/2 flex flex-col items-center text-[#e3e3e3]/70 text-xs uppercase tracking-widest">
        <span className="mb-2">{t('hero.scroll')}</span>
        <KeyboardDoubleArrowDownSharpIcon className="w-6 h-6 animate-bounce" />
      </div>
    </section>
  )
}

export default HeroSection;