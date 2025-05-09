// components/UpcomingEventsSection.tsx
'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CalendarMonthOutlined } from '@mui/icons-material'
import { useLanguage } from '@/context/LanguageContext'

// Define types for events
interface Event {
  id: number;
  city: string;
  venue: string;
  dateEn: string;
  dateId: string;
}

// Events data with dates in both languages
const events: Event[] = [
  { id: 2, city: 'Bandung',  venue: 'Paris van Java',            dateEn: 'March 10 – March 16', dateId: '10 Maret – 16 Maret' },
  { id: 3, city: 'Cirebon',  venue: 'Toko Mas Merak',            dateEn: 'March 17 – March 23', dateId: '17 Maret – 23 Maret' },
  { id: 1, city: 'Surabaya', venue: 'Tunjungan Plaza (Project X)', dateEn: 'March 21 – March 23', dateId: '21 Maret – 23 Maret' },
  { id: 4, city: 'Surabaya', venue: 'Galaxy Mall (Kepo Market)',  dateEn: 'April 18 – April 20', dateId: '18 April – 20 April' },
  { id: 6, city: 'Bandung',  venue: 'Pameran APEPI',             dateEn: 'June 5 – July 7', dateId: '5 Juni – 7 Juli' },
  { id: 5, city: 'Surabaya', venue: 'Atrium Royal',              dateEn: 'June 30 – July 6', dateId: '30 Juni – 6 Juli' }
]

export default function UpcomingEventsSection() {
  const { language, t } = useLanguage()
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!container.current) return
    
    // Create a ScrollTrigger instance
    const trigger = ScrollTrigger.create({
      trigger: container.current,
      start: 'top 80%',
      onEnter: () => {
        const cards = container.current?.querySelectorAll<HTMLElement>('.timeline-card') || []
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out'
          }
        )
      },
      once: true // Only trigger once
    })
    
    // Cleanup function
    return () => {
      trigger.kill() // Kill the ScrollTrigger instance
    }
  }, [])

  return (
    <section
      className="relative py-20 w-full overflow-hidden"
      style={{
        backgroundImage: `
          /* 2) light paper-grain or asfalt */
          url('https://www.transparenttextures.com/patterns/asfalt-light.png'),
          linear-gradient(to bottom, #fffdf8, #f7f1e8)
        `,
        backgroundRepeat: 'repeat fixed, repeat, no-repeat',
        backgroundSize:    'auto, auto, cover',
      }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-[#3a1812] mb-12">
          {t('events.title')}
        </h2>

        {/* Grid + central gold line */}
        <div ref={container} className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="hidden md:block absolute inset-y-0 left-1/2 w-[2px] bg-yellow-400 transform -translate-x-1" />

          {events.map((evt, i) => {
            // even i → left column, odd → right column
            const colStart = i % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'
            const justify = i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
            const dotPosition = i % 2 === 0 ? 'md:right-[-6px]' : 'md:left-[-6px]'

            return (
              <div
                key={evt.id}
                className={`timeline-card flex ${justify} ${colStart}`}
              >
                <div className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 max-w-md w-full">
                  {/* the little circle on the timeline */}
                  <span
                    className={`hidden md:block absolute top-1/2 ${dotPosition}
                      w-3 h-3 bg-yellow-400 rounded-full border-2 border-white
                      transform -translate-y-1/2`}
                  />
                  <div className="flex items-center space-x-3 mb-3">
                    <CalendarMonthOutlined className="text-yellow-600 w-6 h-6" />
                    <span className="text-lg font-semibold text-[#3a1812]">{evt.city}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#3a1812] mb-1">{evt.venue}</h3>
                  <p className="text-gray-600">
                    {language === 'en' ? evt.dateEn : evt.dateId}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}