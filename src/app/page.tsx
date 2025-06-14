// pages/index.tsx (or app/page.tsx)
'use client'
import React, { useState, useEffect } from 'react'
import Loader from '@/components/Loader'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import ScrollingMarquee from '@/components/ScrollingMarquee'
import UpcomingEvents from '@/components/UpcomingEventsSection'
//import FeaturedGrid from '@/components/CustomCarousel'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'
import RandomParallaxGallery from '@/components/RandomParallaxGallery'
import GoldNewsletter from '@/components/NewsletterSection'
import { cormorantGaramond } from '@/lib/fonts'

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
    <div className="grid items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start w-full max-w-screen overflow-x-hidden">
        <ParallaxProvider>
          <Parallax className='w-full' speed={-15}>
            <HeroSection />
          </Parallax>
          <AboutSection />
          <RandomParallaxGallery />
          <ScrollingMarquee />
          <UpcomingEvents />
          <GoldNewsletter />
          <Footer />
        </ParallaxProvider>
      </main>
    </div>
  )
}
