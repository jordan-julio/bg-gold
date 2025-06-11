'use client'

import React, { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import Image from 'next/image'
import Loader from '@/components/Loader'
import { useLanguage } from '@/context/LanguageContext'
import { cormorantGaramond } from '@/lib/fonts'

export default function ProductShowcaseContent() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [activeGold, setActiveGold] = useState(0);

  const goldTypes = [
    { title: t('product.types.yellow.title'), subtitle: t('product.types.yellow.subtitle'), img: '/bagongReal/17.jpg' },
    { title: t('product.types.rose.title'), subtitle: t('product.types.rose.subtitle'), img: '/bagongReal/30.jpg' },
    { title: t('product.types.white.title'), subtitle: t('product.types.white.subtitle'), img: '/bagongReal/3.jpg' },
    { title: t('product.types.black.title'), subtitle: t('product.types.black.subtitle'), img: '/bagongReal/4.jpg' }
  ]

  const collections = [
    { title: t('product.collections.bgClassic.title'), img: '/bagongReal/14.jpg', description: t('product.collections.bgClassic.description') },
    { title: t('product.collections.bgSignature.title'), img: '/bagongReal/4.jpg', description: t('product.collections.bgSignature.description') },
    { title: t('product.collections.bgDaily.title'), img: '/bagongReal/3.jpg', description: t('product.collections.bgDaily.description') }
  ]

  useEffect(() => {
    const urls = [
      ...goldTypes.map(g => g.img),
      ...collections.map(c => c.img),
    ]

    let loadedCount = 0
    const total = urls.length

    const onLoad = () => {
      loadedCount++
      if (loadedCount >= total) {
        clearTimeout(timer)
        // small delay for smooth transition
        setTimeout(() => setLoading(false), 500)
      }
    }

    urls.forEach(src => {
      const img = new window.Image()
      img.src = src
      img.onload  = onLoad
      img.onerror = onLoad
    })

    // fallback after 5s
    const timer = setTimeout(() => setLoading(false), 5000)
    return () => clearTimeout(timer)
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
    <div className={`${cormorantGaramond.className} bg-[#3a1812] relative`}>
      {/* Main Hero Section */}
      <ParallaxProvider>
      <div className="relative min-h-screen">
        {/* Base Background */}
        <div className="absolute inset-0 bg-[#3a1812]" />
        
        {/* Parallax Golden Section */}
        <Parallax speed={-10} className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-full h-full bg-gradient-to-br from-[#9d8858]/30 via-[#ecca76]/20 to-transparent"
            style={{
              clipPath: 'polygon(45% 0%, 100% 0%, 100% 85%, 35% 100%)',
              height: '120%',
              width: '100%'
            }}
          />
        </Parallax>
        
        {/* Secondary parallax layer */}
        <Parallax speed={-5} className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-full h-full bg-gradient-to-br from-white/5 via-transparent to-transparent"
            style={{
              clipPath: 'polygon(47% 0%, 100% 0%, 100% 83%, 37% 100%)',
              height: '110%',
              width: '100%'
            }}
          />
        </Parallax>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center gap-12 py-20">
            {/* Brand Section - Left */}
            <Parallax speed={5} className="text-center lg:text-left">
              <div className="mb-12">
                {/* Logo */}
                <h1 className={`${cormorantGaramond.className} text-7xl sm:text-8xl lg:text-9xl font-semibold text-white mb-6 leading-none tracking-tight`}>
                  B<span className="text-[#ecca76]">G</span>
                </h1>
                
                <div className="w-32 h-1 bg-gradient-to-r from-[#ecca76] to-[#9d8858] mx-auto lg:mx-0 rounded-full mb-6"></div>
                
                <p className="text-2xl lg:text-3xl text-white/90 font-light tracking-wider">
                  {t('product.hero.logoText')}
                </p>
              </div>
              
              <div className="space-y-3 text-white/80 text-lg lg:text-xl max-w-md mx-auto lg:mx-0">
                <p>{t('product.hero.subtitle')}</p>
              </div>
              
              {/* Mobile CTA */}
              <div className="mt-12 lg:hidden">
                <button className="px-8 py-4 bg-[#ecca76] text-[#3a1812] rounded-full font-medium hover:bg-[#9d8858] hover:text-white transition-all duration-300">
                  {t('product.hero.ctaExplore')}
                </button>
              </div>
            </Parallax>

            {/* Gold Types - Right */}
            <div className="space-y-8 pt-18">
              <Parallax speed={3}>
                <div className="text-center lg:text-left mb-8">
                  <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-4">
                    {t('product.types.title')} <span className="text-[#ecca76]">{t('product.types.expression')}</span>
                  </h2>
                  <p className="text-lg text-white/75 max-w-lg mx-auto lg:mx-0">
                    {t('product.types.description')}
                  </p>
                </div>
              </Parallax>
              
              {/* Gold Grid - Fixed choppy animations */}
              <div className="grid grid-cols-2 gap-4 lg:gap-6 max-w-2xl mx-auto">
                {goldTypes.map((gold, index) => (
                  <Parallax speed={index % 2 === 0 ? 2 : -2} key={index}>
                    <div
                      className="group relative cursor-pointer"
                      onMouseEnter={() => setActiveGold(index)}
                    >
                      <div className="aspect-[4/5] relative overflow-hidden rounded-2xl shadow-xl transform transition-transform duration-300 will-change-transform hover:scale-[1.02]">
                        <Image
                          src={gold.img}
                          alt={gold.title}
                          fill
                          className="object-cover"
                          priority
                        />
                        
                        {/* Simplified overlay - no transform on overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-300 ${
                          activeGold === index 
                            ? 'from-[#ecca76]/80 via-[#ecca76]/40 to-transparent' 
                            : 'from-[#3a1812]/70 to-transparent'
                        }`} />
                        
                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                          <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2">
                            {gold.title}
                          </h3>
                          <p className={`text-sm lg:text-base transition-opacity duration-300 ${
                            activeGold === index ? 'text-white/90 opacity-100' : 'text-white/80 opacity-0'
                          }`}>
                            {gold.subtitle}
                          </p>
                        </div>

                        {/* Number indicator */}
                        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/80 text-sm font-semibold">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  </Parallax>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </ParallaxProvider>

      <div className="relative h-24 bg-[#3a1812] overflow-hidden">
        <div
          className="absolute inset-0 bg-white"
          style={{
            clipPath: 'polygon(0 40%, 100% 0%, 100% 105%, 0 105%)'
          }}
        />
      </div>


      {/* Collections Section with Parallax (when installed) */}
      <div className="relative bg-white py-20 lg:py-32">
        {/* Subtle background elements */}
        <div className="absolute top-20 left-20 w-48 h-48 bg-[#ecca76]/3 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-[#3a1812]/3 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            {/* Title Section */}
            <div className="sticky top-36 self-start pl-6">
              <h2 className="text-6xl lg:text-7xl font-bold text-[#3a1812] mb-8">
                {t('product.collections.title')}<br/>
                <span className="text-[#3a1812]">{t('product.collections.title2')}</span>
              </h2>
              <p className="text-[#3a1812]/70 text-lg lg:text-xl leading-relaxed mb-8">
                {t('product.collections.description')}
              </p>
              <div className="hidden lg:block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ecca76]/20 to-transparent"></div>
              </div>
            </div>

            {/* Collections Grid - Optimized animations */}
            <div className="lg:col-span-2 space-y-12">
              {collections.map((collection, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-xl transition-all duration-300 hover:shadow-2xl"
                  style={{
                    marginLeft: index % 2 === 1 ? '0' : 'auto',
                    marginRight: index % 2 === 1 ? 'auto' : '0',
                    maxWidth: '90%'
                  }}
                >
                  <div className="aspect-[16/10] relative">
                    <Image
                      src={collection.img}
                      alt={collection.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3a1812]/80 via-[#3a1812]/50 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex items-end p-8 lg:p-10">
                      <div className="text-white max-w-lg">
                        <h3 className={`${cormorantGaramond.className} text-3xl lg:text-4xl font-semibold mb-3`}>
                          {collection.title}
                        </h3>
                        <p className="text-white/90 mb-6 text-base lg:text-lg">
                          {collection.description}
                        </p>
                        <div className="flex items-center text-sm lg:text-base font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                          <span>{t('product.collections.ctaExplore')}</span>
                          <svg className="w-5 h-5 ml-3 transform transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Number */}
                    <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-semibold text-xl">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wave Transition */}
      <div className="relative h-24 bg-white">
        <div 
          className="absolute inset-0 bg-[#3a1812]"
          style={{
            clipPath: 'polygon(0 20%, 100% 0%, 100% 100%, 0% 100%)'
          }}
        />
      </div>

      {/* Bottom CTA */}
      <div className="relative bg-[#3a1812] py-20 lg:py-32">
        {/* Subtle decorative elements */}
        <div className="absolute top-20 right-32 w-40 h-40 rounded-full bg-[#ecca76]/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#ecca76]/2 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
                {t('product.cta.title')}
                <br />
                <span className="text-[#ecca76]">{t('product.cta.title2')}</span>
              </h2>
              
              <p className="text-lg lg:text-xl text-white/80 mb-12 leading-relaxed max-w-md">
                {t('product.cta.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-[#ecca76] text-[#3a1812] font-semibold rounded-full hover:bg-[#9d8858] hover:text-white transition-all duration-300 transform hover:scale-105">
                {t('product.cta.button.shop')}
                </button>
                
                <button className="px-8 py-4 border-2 border-[#ecca76] text-[#ecca76] font-semibold rounded-full hover:bg-[#ecca76] hover:text-[#3a1812] transition-all duration-300 transform hover:scale-105">
                  {t('product.cta.button.book')}
                </button>
              </div>
            </div>
            
            <div className="relative flex justify-center">
              <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-[#ecca76]/10 to-[#ecca76]/5 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-8 bg-gradient-to-br from-[#ecca76]/15 to-[#ecca76]/10 rounded-full"></div>
                <div className="absolute inset-16 bg-[#ecca76]/10 rounded-full"></div>
                
                <div className="text-center text-white relative z-10">
                  <div className="text-6xl lg:text-7xl font-bold mb-4 text-[#ecca76]">
                    BG
                  </div>
                  <p className="text-sm tracking-wider uppercase font-medium">Craft. Luxury. Legacy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-delayed {
          opacity: 0;
          animation: fade-in 0.8s ease-out 0.3s forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out 0.5s forwards;
          transform-origin: left center;
        }
      `}</style>
    </div>
  )
}