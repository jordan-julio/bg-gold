'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import { cormorantGaramond } from '@/lib/fonts'
import { useLanguage } from '@/context/LanguageContext'

export default function Home() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const partnerStores = [
    {
      name: 'Toko Emas Merak',
      address: 'Royal Plaza LT. UG-A30, Jl. A Yani Frontage Barat No.16-18, Wonokromo, Surabaya',
      img: '/bagongReal/3.jpg',
      color: 'from-amber-400 to-orange-500'
    },
    {
      name: 'Toko Emas Sinar Agung',
      address: 'Royal Plaza LT. UG-A30, Jl. A Yani Frontage Barat No.16-18, Wonokromo, Surabaya',
      img: '/bagongReal/2.jpg',
      color: 'from-yellow-400 to-amber-500'
    },
    {
      name: 'Toko Emas Bintang Mas',
      address: 'Royal Plaza LT. UG-A30, Jl. A Yani Frontage Barat No.16-18, Wonokromo, Surabaya',
      img: '/bagongReal/1.jpg',
      color: 'from-orange-400 to-red-500'
    },
  ]

  useEffect(() => {
    function onLoad() {
      setLoading(false)
      window.removeEventListener('load', onLoad)
    }
    if (document.readyState === 'complete') {
      setLoading(false)
    } else {
      window.addEventListener('load', onLoad)
    }

    // Mouse move effect
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
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
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden">
      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a1812] via-[#2e0f10] to-[#3a1812]">
          {/* Animated Gradient Orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#ecca76] to-amber-300 rounded-full mix-blend-screen opacity-10 blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-amber-500 to-[#ecca76] rounded-full mix-blend-screen opacity-10 blur-3xl animate-float-delayed"></div>
          
          {/* Interactive Mouse Follower */}
          <div 
            className="absolute w-64 h-64 bg-gradient-to-r from-[#ecca76] to-transparent rounded-full mix-blend-overlay opacity-20 blur-2xl pointer-events-none transition-transform duration-1000 ease-out"
            style={{
              transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`
            }}
          />
          
          {/* Decorative Patterns */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(236,202,118,0.1) 35px, rgba(236,202,118,0.1) 70px)`,
            }}></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ecca76] via-[#ffd700] to-[#ecca76] animate-gradient-x mb-6 leading-tight">
            {t('howtoshop.hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
            {t('howtoshop.hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s' }}>
            <Link href="/how-to-shop" className="group relative overflow-hidden">
              <span className="relative z-10 px-10 py-4 bg-gradient-to-r from-[#ecca76] to-[#ffd700] text-[#3a1812] rounded-full font-semibold shadow-2xl flex items-center gap-2 transition-all duration-300 group-hover:text-white">
                {t('howtoshop.hero.button.howtoshop')}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#3a1812] to-[#2e0f10] rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>
            
            <Link href="/products" className="group relative">
              <span className="px-10 py-4 border-2 border-[#ecca76] text-[#ecca76] rounded-full font-semibold backdrop-blur-md bg-white/5 shadow-xl flex items-center gap-2 transition-all duration-300 group-hover:bg-[#ecca76] group-hover:text-[#3a1812] group-hover:border-transparent">
                {t('howtoshop.hero.button.products')}
                <svg className="w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#ecca76] rounded-full relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-[#ecca76] rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Features Section with Modern Cards */}
      <section className="py-24 px-6 md:px-12 relative bg-gradient-to-br from-[#f5e6d3] via-[#faf8f6] to-[#e8dcc6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            
            {/* Shop Online Card */}
            <div className="group relative animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-orange-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 h-full flex flex-col border border-white/20 overflow-hidden group-hover:transform group-hover:scale-[1.02] transition-all duration-300">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-400 to-orange-400 rounded-full opacity-10 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-400 to-orange-400 rounded-2xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{t('howtoshop.card.online.title')}</h2>
                </div>
                
                <p className="flex-1 text-gray-600 mb-8 leading-relaxed">
                  {t('howtoshop.card.online.description')}
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <Link href="https://www.tokopedia.com/bggold" className="group/btn relative overflow-hidden rounded-xl">
                    <span className="relative z-10 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-center font-medium shadow-lg flex items-center justify-center gap-2 transition-all duration-300 group-hover/btn:shadow-2xl">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                      </svg>
                      Tokopedia
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 rounded-xl transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                  </Link>
                  
                  <Link href="https://shopee.co.id/bggold" className="group/btn relative overflow-hidden rounded-xl">
                    <span className="relative z-10 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-center font-medium shadow-lg flex items-center justify-center gap-2 transition-all duration-300 group-hover/btn:shadow-2xl">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                      </svg>
                      Shopee
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-xl transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Showroom Card */}
            <div className="group relative animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ecca76] to-amber-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 h-full flex flex-col border border-white/20 overflow-hidden group-hover:transform group-hover:scale-[1.02] transition-all duration-300">
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-[#ecca76] to-amber-400 rounded-full opacity-10 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#ecca76] to-amber-400 rounded-2xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{t('howtoshop.card.showroom.title')}</h2>
                </div>
                
                <div className="space-y-4 flex-1">
                  {['Royal Plaza Showroom', 'PS. ATOM Showroom'].map((loc, i) => (
                    <div key={i} className="group/card relative overflow-hidden">
                      <div className="relative p-5 bg-gradient-to-br from-[#fef7ec] to-[#fff8f0] rounded-2xl border border-[#ecca76]/20 transition-all duration-300 group-hover/card:shadow-lg group-hover/card:border-[#ecca76]/40">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ecca76]/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                        <h3 className="relative font-semibold text-gray-800 mb-1">{loc}</h3>
                        <p className="relative text-sm text-[#ecca76] font-medium mb-2">
                          <svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          10:00–{i === 0 ? '21:00' : '16:00'} {t('howtoshop.everyday')}
                        </p>
                        <p className="relative text-sm text-gray-600">
                          {i === 0
                            ? 'Royal Plaza LT. G – BLOK C Unit 12, 15, 22, 26'
                            : 'Pasar Atum Mall LT. 1 – BLOK A No. 59–60'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link href="/contact" className="group/link mt-6 inline-flex items-center gap-2 text-[#ecca76] font-semibold hover:text-amber-600 transition-colors">
                  <span className="underline underline-offset-4">{t('howtoshop.liatpetakontak')}</span>
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Partner Stores Card */}
            <div className="group relative animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 h-full flex flex-col border border-white/20 overflow-hidden group-hover:transform group-hover:scale-[1.02] transition-all duration-300">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{t('howtoshop.card.partner.title')}</h2>
                </div>
                
                <div className="space-y-4">
                  {partnerStores.map((store, idx) => (
                    <div key={idx} className="group/partner relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover/partner:opacity-10 transition-opacity duration-300 ${store.color}"></div>
                      <div className="relative flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-2xl">
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-lg group-hover/partner:shadow-2xl transition-shadow duration-300">
                          <div className="absolute inset-0 bg-gradient-to-br ${store.color} opacity-20"></div>
                          <Image
                            src={store.img}
                            alt={store.name}
                            fill
                            className="object-cover group-hover/partner:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 mb-1 truncate">{store.name}</h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{store.address}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover/partner:text-[#ecca76] transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(180deg); }
          50% { transform: translateY(-30px) rotate(360deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 4s ease infinite;
        }
        
        .animate-fade-in-up {
          transform: translateY(20px);
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}