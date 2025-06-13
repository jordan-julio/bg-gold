'use client'

import React, { useEffect, useState } from 'react'
import { cormorantGaramond } from '@/lib/fonts'
import Footer from '@/components/Footer'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import Image from 'next/image'
import Loader from '@/components/Loader'
import { useLanguage } from '@/context/LanguageContext'

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
      <div className="fixed inset-0 bg-gradient-to-br from-[#3a1812] via-[#2a1008] to-[#1a0804] flex items-center justify-center z-50 flex-col">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ecca76] to-[#d4af37] blur-3xl opacity-20 rounded-full"></div>
          <h1 className={`${cormorantGaramond.className} relative text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold text-white mb-6 leading-none tracking-tight`}>
            B<span className="text-[#ecca76] drop-shadow-lg">G</span>
          </h1>
        </div>
        <div className='flex flex-row space-x-2'>
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
        
        {/* Parallax Golden Section - Disabled on mobile for performance */}
        <Parallax speed={-10} className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-full h-full bg-gradient-to-br from-[#9d8858]/30 via-[#ecca76]/20 to-transparent"
            style={{
              clipPath: 'polygon(45% 0%, 100% 0%, 100% 85%, 35% 100%)',
              height: '120%',
              width: '100%'
            }}
          />
        </Parallax>
        
        {/* Mobile-only static background */}
        <div className="block md:hidden absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-full h-full bg-gradient-to-br from-[#9d8858]/20 via-[#ecca76]/15 to-transparent"
            style={{
              clipPath: 'polygon(45% 0%, 100% 0%, 100% 85%, 35% 100%)',
              height: '100%',
              width: '100%'
            }}
          />
        </div>
        
        {/* Secondary parallax layer - Desktop only */}
        <Parallax speed={-5} className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
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
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center gap-8 lg:gap-12 pt-32 pb-12 sm:pt-36 sm:pb-16 lg:pt-24 lg:pb-20">
            {/* Brand Section - Left - Hidden on mobile, only show on lg+ */}
            <Parallax speed={5} className="hidden lg:block text-center lg:text-left order-1 lg:order-1">
              <div className="mb-8 lg:mb-12">
                {/* Logo */}
                <h1 className={`${cormorantGaramond.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold text-white mb-4 lg:mb-6 leading-none tracking-tight`}>
                  B<span className="text-[#ecca76]">G</span>
                </h1>
                
                <div className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-[#ecca76] to-[#9d8858] mx-auto lg:mx-0 rounded-full mb-4 lg:mb-6"></div>
                
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light tracking-wider px-4 sm:px-0">
                  {t('product.hero.logoText')}
                </p>
              </div>
              
              <div className="space-y-3 text-white/80 text-base sm:text-lg lg:text-xl max-w-md mx-auto lg:mx-0 px-4 sm:px-0">
                <p>{t('product.hero.subtitle')}</p>
              </div>
            </Parallax>
            
            {/* Mobile-only simplified brand section */}
            <div className="block hidden text-center order-1 lg:order-1">
              <div className="mb-6">
                {/* Smaller logo for mobile */}
                <h1 className={`${cormorantGaramond.className} text-4xl sm:text-5xl font-semibold text-white mb-3 leading-none tracking-tight`}>
                  B<span className="text-[#ecca76]">G</span>
                </h1>
                
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#ecca76] to-[#9d8858] mx-auto rounded-full mb-3"></div>
                
                <p className="text-base sm:text-lg text-white/90 font-light tracking-wider px-4">
                  {t('product.hero.logoText')}
                </p>
              </div>
              
              <div className="text-white/80 text-sm sm:text-base max-w-sm mx-auto px-4 mb-6">
                <p>{t('product.hero.subtitle')}</p>
              </div>
              
              {/* Mobile CTA */}
              <div className="mb-8">
                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-[#ecca76] text-[#3a1812] rounded-full font-medium hover:bg-[#9d8858] hover:text-white transition-all duration-300 text-sm sm:text-base">
                  {t('product.hero.ctaExplore')}
                </button>
              </div>
            </div>

            {/* Gold Types - Right */}
            <div className="space-y-4 lg:space-y-8 order-2 lg:order-2 lg:pt-18">
              <Parallax speed={3} className="hidden lg:block">
                <div className="text-center lg:text-left mb-8">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4">
                    {t('product.types.title')} <span className="text-[#ecca76]">{t('product.types.expression')}</span>
                  </h2>
                  <p className="text-base sm:text-lg text-white/75 max-w-lg mx-auto lg:mx-0">
                    {t('product.types.description')}
                  </p>
                </div>
              </Parallax>
              
              {/* Mobile-only header (no parallax) */}
              <div className="block lg:hidden text-center mb-4 px-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                  {t('product.types.title')} <span className="text-[#ecca76]">{t('product.types.expression')}</span>
                </h2>
                <p className="text-xs sm:text-sm text-white/75">
                  {t('product.types.description')}
                </p>
              </div>
              
              {/* Gold Grid - Responsive */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-2xl mx-auto px-4 sm:px-0">
                {goldTypes.map((gold, index) => (
                  <div key={index} className="hidden lg:block">
                    <Parallax speed={index % 2 === 0 ? 2 : -2}>
                      <div
                        className="group relative cursor-pointer"
                        onMouseEnter={() => setActiveGold(index)}
                      >
                        <div className="aspect-[4/5] relative overflow-hidden rounded-xl lg:rounded-2xl shadow-xl transform transition-transform duration-300 will-change-transform hover:scale-[1.02]">
                          <Image
                            src={gold.img}
                            alt={gold.title}
                            fill
                            className="object-cover"
                            priority
                          />
                          
                          <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-300 ${
                            activeGold === index 
                              ? 'from-[#ecca76]/80 via-[#ecca76]/40 to-transparent' 
                              : 'from-[#3a1812]/70 to-transparent'
                          }`} />
                          
                          <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-2">
                              {gold.title}
                            </h3>
                            <p className={`text-xs sm:text-sm lg:text-base transition-opacity duration-300 ${
                              activeGold === index ? 'text-white/90 opacity-100' : 'text-white/80 opacity-0'
                            }`}>
                              {gold.subtitle}
                            </p>
                          </div>

                          <div className="absolute top-3 left-3 lg:top-4 lg:left-4 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/80 text-xs lg:text-sm font-semibold">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    </Parallax>
                  </div>
                ))}
                
                {/* Mobile-only gold grid (no parallax) */}
                {goldTypes.map((gold, index) => (
                  <div
                    key={`mobile-${index}`}
                    className="block lg:hidden group relative cursor-pointer"
                    onTouchStart={() => setActiveGold(index)}
                    onClick={() => setActiveGold(index)}
                  >
                    <div className="aspect-[4/5] relative overflow-hidden rounded-xl shadow-xl">
                      <Image
                        src={gold.img}
                        alt={gold.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      
                      <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-300 ${
                        activeGold === index 
                          ? 'from-[#ecca76]/80 via-[#ecca76]/40 to-transparent' 
                          : 'from-[#3a1812]/70 to-transparent'
                      }`} />
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                        <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                          {gold.title}
                        </h3>
                        <p className={`text-xs transition-opacity duration-300 ${
                          activeGold === index ? 'text-white/90 opacity-100' : 'text-white/80 opacity-0'
                        }`}>
                          {gold.subtitle}
                        </p>
                      </div>

                      <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/80 text-xs font-semibold">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </ParallaxProvider>

      {/* Wave transition - Responsive height */}
      <div className="relative h-12 sm:h-16 lg:h-24 bg-[#3a1812] overflow-hidden">
        <div
          className="absolute inset-0 bg-white"
          style={{
            clipPath: 'polygon(0 40%, 100% 0%, 100% 105%, 0 105%)'
          }}
        />
      </div>

      {/* Collections Section */}
      <div className="relative bg-white py-12 sm:py-16 lg:py-20 xl:py-32">
        {/* Background elements - Hidden on small screens */}
        <div className="hidden lg:block absolute top-20 left-20 w-48 h-48 bg-[#ecca76]/3 rounded-full blur-3xl pointer-events-none" />
        <div className="hidden lg:block absolute bottom-32 right-20 w-80 h-80 bg-[#3a1812]/3 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 items-start">
            {/* Title Section */}
            <div className="lg:sticky lg:top-36 self-start text-center lg:text-left mb-8 lg:mb-0">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#3a1812] mb-4 lg:mb-8 leading-tight">
                {t('product.collections.title')}<br/>
                <span className="text-[#3a1812]">{t('product.collections.title2')}</span>
              </h2>
              <p className="text-[#3a1812]/70 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0">
                {t('product.collections.description')}
              </p>
              <div className="hidden xl:block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ecca76]/20 to-transparent"></div>
              </div>
            </div>

            {/* Collections Grid */}
            <div className="lg:col-span-2 space-y-8 lg:space-y-12">
              {collections.map((collection, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl lg:rounded-2xl cursor-pointer shadow-xl transition-all duration-300 hover:shadow-2xl mx-auto"
                  style={{
                    marginLeft: index % 2 === 1 && window.innerWidth >= 1024 ? '0' : 'auto',
                    marginRight: index % 2 === 1 && window.innerWidth >= 1024 ? 'auto' : '0',
                    maxWidth: window.innerWidth >= 1024 ? '90%' : '100%'
                  }}
                >
                  <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] relative">
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
                    <div className="absolute inset-0 flex items-end p-4 sm:p-6 lg:p-8 xl:p-10">
                      <div className="text-white max-w-lg">
                        <h3 className={`${cormorantGaramond.className} text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-2 lg:mb-3`}>
                          {collection.title}
                        </h3>
                        <p className="text-white/90 mb-4 lg:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed">
                          {collection.description}
                        </p>
                        <div className="flex items-center text-xs sm:text-sm lg:text-base font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                          <span>{t('product.collections.ctaExplore')}</span>
                          <svg className="w-4 h-4 lg:w-5 lg:h-5 ml-2 lg:ml-3 transform transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Number */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-semibold text-sm sm:text-base lg:text-xl">
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
      <div className="relative h-12 sm:h-16 lg:h-24 bg-white">
        <div 
          className="absolute inset-0 bg-[#3a1812]"
          style={{
            clipPath: 'polygon(0 20%, 100% 0%, 100% 100%, 0% 100%)'
          }}
        />
      </div>

      {/* Bottom CTA */}
      <div className="relative bg-[#3a1812] py-12 sm:py-16 lg:py-20 xl:py-32">
        {/* Decorative elements - Hidden on mobile */}
        <div className="hidden lg:block absolute top-20 right-32 w-40 h-40 rounded-full bg-[#ecca76]/3 blur-3xl pointer-events-none" />
        <div className="hidden lg:block absolute bottom-20 left-20 w-64 h-64 bg-[#ecca76]/2 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 lg:mb-8 leading-tight">
                {t('product.cta.title')}
                <br />
                <span className="text-[#ecca76]">{t('product.cta.title2')}</span>
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-8 lg:mb-12 leading-relaxed max-w-md mx-auto lg:mx-0">
                {t('product.cta.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-[#ecca76] text-[#3a1812] font-semibold rounded-full hover:bg-[#9d8858] hover:text-white transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                {t('product.cta.button.shop')}
                </button>
                
                <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#ecca76] text-[#ecca76] font-semibold rounded-full hover:bg-[#ecca76] hover:text-[#3a1812] transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                  {t('product.cta.button.book')}
                </button>
              </div>
            </div>
            
            <div className="relative flex justify-center mt-8 lg:mt-0">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-[#ecca76]/10 to-[#ecca76]/5 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-6 sm:inset-8 bg-gradient-to-br from-[#ecca76]/15 to-[#ecca76]/10 rounded-full"></div>
                <div className="absolute inset-12 sm:inset-16 bg-[#ecca76]/10 rounded-full"></div>
                
                <div className="text-center text-white relative z-10">
                  <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 lg:mb-4 text-[#ecca76]">
                    BG
                  </div>
                  <p className="text-xs sm:text-sm tracking-wider uppercase font-medium">Craft. Luxury. Legacy.</p>
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

        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  )
}