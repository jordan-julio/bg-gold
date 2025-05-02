// pages/index.tsx (or app/page.tsx)
'use client'
import React, { useState, useEffect } from 'react'
import Loader from '@/components/Loader'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import ScrollingMarquee from '@/components/ScrollingMarquee'
import UpcomingEvents from '@/components/UpcomingEventsSection'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    function onLoad() {
      setLoading(false)
      window.removeEventListener('load', onLoad)
    }
    // if the page is already loaded (fast refresh, HMR, etc)
    if (document.readyState === 'complete') {
      setLoading(false)
    } else {
      window.addEventListener('load', onLoad)
    }
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#edca89] flex items-center justify-center z-50">
        <Loader type="circle" duration="2s" />
        <Loader type="triangle" duration="2s" />
        <Loader type="rect" duration='2s' />
      </div>
    )
  }

  return (
    <div className="grid items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start w-full max-w-screen overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <ScrollingMarquee />
        <UpcomingEvents />
        <Footer />
      </main>
    </div>
  )
}
