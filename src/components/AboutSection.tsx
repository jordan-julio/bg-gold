// components/AboutSection.tsx
'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

export default function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null)
  const windowsRef = useRef<HTMLDivElement>(null)
  const foundingYear = 2003
  const currentYear = new Date().getFullYear()
  const yearsInBusiness = currentYear - foundingYear

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!sectionRef.current) return

    // Create a ScrollTrigger instance for text animations
    const textTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      onEnter: () => {
        // Animation on enter
        gsap.fromTo(
          sectionRef.current?.querySelectorAll('.fade-up') || [],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power4.out',
            stagger: 0.2,
            duration: 0.8,
          }
        )
      },
      once: true // Only trigger once
    });

    // Create a separate animation for the image windows
    if (windowsRef.current) {
      const windowElements = windowsRef.current.querySelectorAll('.window-frame');
      
      gsap.fromTo(
        windowElements,
        { 
          y: 30, 
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: windowsRef.current,
            start: 'top 90%',
            once: true
          }
        }
      );
    }

    // Cleanup function
    return () => {
      textTrigger.kill(); // Kill the ScrollTrigger instance
    };
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-[#3a1812] py-20 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: Text */}
        <div className="flex-1 space-y-6">
          <h2 className="fade-up text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#3a1812]">
            {t('about.title')}
          </h2>
          <div className="fade-up w-32 h-1 bg-[#9d8858] rounded" />
          <p className="fade-up text-lg leading-relaxed text-[#3a1812]">
            {t('about.paragraph1')}
          </p>
          <p className="fade-up text-lg leading-relaxed text-[#3a1812]">
            {t('about.paragraph2').replace('{years}', yearsInBusiness.toString())}
          </p>
        </div>

        {/* Right: Image Windows + Stat */}
        <div className="flex-1 w-full flex flex-col items-center space-y-8">
          {/* Image Windows - larger on mobile */}
          <div 
            ref={windowsRef}
            className="w-full flex flex-col sm:grid md:grid-cols-3 gap-8 sm:gap-4 mb-10 sm:mb-6"
          >
            {/* Window 1 - Mobile Optimized */}
            <div className="window-frame relative mx-auto w-[80%] sm:w-full">
              {/* Window border/frame effect */}
              <div className="absolute inset-0 rounded-full border-4 border-[#9d8858]/20 pointer-events-none" />
              
              {/* Actual window with inset shadow */}
              <div className="aspect-square sm:aspect-[3/4] rounded-full overflow-hidden" 
                   style={{ 
                     boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset, inset 0px 0px 20px rgba(0,0,0,0.4)"
                   }}>
                <div className="h-full w-full relative">
                  <Image 
                    src="/bagongReal/28.jpg" 
                    alt="Jewelry craftsmanship"
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 768px) 30vw, 20vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              
              {/* Subtle window shine/reflection overlay */}
              <div className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)' 
                   }} />
            </div>
            
            {/* Window 2 - Mobile Optimized */}
            <div className="window-frame relative mx-auto w-[80%] sm:w-full">
              <div className="absolute inset-0 rounded-full border-4 border-[#9d8858]/20 pointer-events-none" />
              <div className="aspect-square sm:aspect-[3/4] rounded-full overflow-hidden" 
                   style={{ 
                     boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset, inset 0px 0px 20px rgba(0,0,0,0.4)"
                   }}>
                <div className="h-full w-full relative">
                  <Image 
                    src="/bagongReal/29.jpg" 
                    alt="Gold jewelry detail"
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 768px) 30vw, 20vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)' 
                   }} />
            </div>
            
            {/* Window 3 - Mobile Optimized */}
            <div className="window-frame relative mx-auto w-[80%] sm:w-full">
              <div className="absolute inset-0 rounded-full border-4 border-[#9d8858]/20 pointer-events-none" />
              <div className="aspect-square sm:aspect-[3/4] rounded-full overflow-hidden" 
                   style={{ 
                     boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset, inset 0px 0px 20px rgba(0,0,0,0.4)"
                   }}>
                <div className="h-full w-full relative">
                  <Image 
                    src="/bagongReal/27.jpg" 
                    alt="Elegant gold pieces"
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 768px) 30vw, 20vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)' 
                   }} />
            </div>
          </div>
          
          {/* Years of Excellence Counter */}
          <div className="fade-up text-center w-full">
            <div className="text-6xl md:text-7xl font-bold text-[#9d8858] leading-none drop-shadow-md">
              {yearsInBusiness}+
            </div>
            <div className="mt-2 text-lg font-medium text-[#3a1812]">
              {t('about.years')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}