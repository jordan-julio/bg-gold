// components/StorySection.tsx
'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const foundingYear = 2003
  const currentYear = new Date().getFullYear()
  const yearsInBusiness = currentYear - foundingYear

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!sectionRef.current) return

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.fade-up'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: 'power4.out',
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-gray-900 py-20 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: Text */}
        <div className="flex-1 space-y-6">
          <h2 className="fade-up text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-800">
            Our Story
          </h2>
          <div className="fade-up w-24 h-1 bg-[#9d8858] rounded" />
          <p className="fade-up text-lg leading-relaxed">
            PT Bagong Sejahtera Abadi (BG Gold) has been crafting exquisite
            gold jewelry since 2003.  Nestled in Surabaya, we combine time-honored
            techniques with forward-looking design to deliver pieces that become
            lifelong treasures.
          </p>
          <p className="fade-up text-lg leading-relaxed">
            Quality is our cornerstone: every link, stone, and setting
            undergoes rigorous inspection by our master craftsmen.  With over
            <strong> {yearsInBusiness} years </strong> of passion and precision,
            BG Gold remains the benchmark in Indonesian fine jewelry.
          </p>
        </div>

        {/* Right: Stat + CTA */}
        <div className="flex-1 flex flex-col items-center md:items-end space-y-8">
          <div className="fade-up text-center md:text-right">
            <div className="text-6xl md:text-7xl font-bold text-[#9d8858] leading-none">
              {yearsInBusiness}+
            </div>
            <div className="mt-2 text-lg font-medium text-gray-700">
              Years of Excellence
            </div>
          </div>
          <button
            className="fade-up inline-flex items-center gap-2 px-8 py-3 bg-[#9d8858] hover:bg-amber-400 text-white font-medium rounded-full transition-shadow shadow-lg"
            onClick={() => window.location.href = '/about'}
          >
            Discover More
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
                d="M5 12h14m-7-7l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
