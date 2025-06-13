'use client'

import React, { useState, useEffect } from 'react'
import { ChevronRight, ShoppingBag, Building2, Users, MapPin, Clock, ExternalLink, Star, Award, Shield } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import Loader from '@/components/Loader';
import { cormorantGaramond } from '@/lib/fonts';
import Footer from '@/components/Footer';

export default function ProfessionalLandingPage() {
    const { t } = useLanguage();
  const [loading, setLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [, setScrollY] = useState(0)

  const partnerStores = [
    {
      name: 'Toko Emas Merak',
      address: 'Royal Plaza LT. UG-A30, Jl. A Yani Frontage Barat No.16-18, Wonokromo, Surabaya',
      img: '/api/placeholder/400/300',
      rating: 4.8,
      verified: true
    },
    {
      name: 'Toko Emas Sinar Agung',
      address: 'Royal Plaza LT. UG-A30, Jl. A Yani Frontage Barat No.16-18, Wonokromo, Surabaya',
      img: '/api/placeholder/400/300',
      rating: 4.9,
      verified: true
    },
    {
      name: 'Toko Emas Bintang Mas',
      address: 'Royal Plaza LT. UG-A30, Jl. A Yani Frontage Barat No.16-18, Wonokromo, Surabaya',
      img: '/api/placeholder/400/300',
      rating: 4.7,
      verified: true
    },
  ]

  const features = [
    { icon: Shield, title: 'Certified Quality', desc: 'All products certified with international standards' },
    { icon: Award, title: 'Trusted Excellence', desc: '25+ years of proven industry leadership' },
    { icon: Star, title: 'Premium Service', desc: 'Personalized consultation and expert guidance' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleScroll = () => setScrollY(window.scrollY)
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (loading) {
      return (
        <div className="fixed inset-0 bg-gradient-to-br from-[#3a1812] via-[#2a1008] to-[#1a0804] flex items-center justify-center z-50 flex-col">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ecca76] to-[#d4af37] blur-3xl opacity-20 rounded-full"></div>
            <h1 className={`${cormorantGaramond.className} relative text-7xl sm:text-8xl lg:text-9xl font-semibold text-white mb-6 leading-none tracking-tight`}>
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
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#3a1812] via-[#2a1008] to-[#1a0804] pt-20 md:pt-24">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Floating Orbs */}
          <div 
            className="absolute w-96 h-96 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-full blur-3xl"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              top: '10%',
              left: '10%'
            }}
          />
          <div 
            className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
            style={{
              transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
              bottom: '10%',
              right: '10%'
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl py-24">
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full text-amber-300 text-sm font-medium mb-8">
              <Shield className="w-4 h-4 mr-2" />
              Certified Premium Quality Since 1998
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              {t('howtoshop.hero.title')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            {t('howtoshop.hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-lg font-semibold shadow-xl transition-all duration-300 flex items-center">
              {t('howtoshop.hero.button.howtoshop')}
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group px-8 py-4 border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 rounded-lg font-semibold transition-all duration-300 flex items-center">
              {t('howtoshop.hero.button.products')}
              <ExternalLink className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-400 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our <span className="text-amber-500">Services</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose from our comprehensive range of professional services designed to meet your needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Digital Commerce Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <ShoppingBag className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">2.5M+</div>
                    <div className="text-sm text-slate-600">Orders Processed</div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {t('howtoshop.card.online.title')}
                </h3>
                
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {t('howtoshop.card.online.description')}
                </p>
                
                <div className="space-y-4">
                  <a href="https://www.tokopedia.com/bggold" className="group/btn flex items-center justify-between p-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <span className="font-semibold">Tokopedia Store</span>
                    </div>
                    <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                  
                  <a href="https://shopee.co.id/bggold" className="group/btn flex items-center justify-between p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <span className="font-semibold">Shopee Store</span>
                    </div>
                    <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Flagship Showrooms Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-amber-100 rounded-xl">
                    <Building2 className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">2</div>
                    <div className="text-sm text-slate-600">Premium Locations</div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {t('howtoshop.card.showroom.title')}
                </h3>
                
                <div className="space-y-4 mb-8">
                  {[
                    { name: 'Royal Plaza Showroom', hours: '10:00–21:00', address: 'Royal Plaza LT. G – BLOK C Unit 12, 15, 22, 26' },
                    { name: 'PS. ATOM Showroom', hours: '10:00–16:00', address: 'Pasar Atum Mall LT. 1 – BLOK A No. 59–60' }
                  ].map((location, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">{location.name}</h4>
                        <div className="flex items-center text-green-600 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                          Open
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-slate-600 mb-2">
                        <Clock className="w-4 h-4 mr-2" />
                        {location.hours} {t('howtoshop.everyday')}
                      </div>
                      <div className="flex items-start text-sm text-slate-600">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{location.address}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full flex items-center justify-center py-3 border-2 border-amber-400 text-amber-600 hover:bg-amber-400 hover:text-white rounded-xl font-semibold transition-all duration-300">
                  {t('howtoshop.liatpetakontak')}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>

            {/* Authorized Partners Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">50+</div>
                    <div className="text-sm text-slate-600">Partner Stores</div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {t('howtoshop.card.partner.title')}
                </h3>
                
                <div className="space-y-4">
                  {partnerStores.map((store, idx) => (
                    <div key={idx} className="group/store p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-300 cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {store.name.split(' ')[2]?.[0] || 'BG'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-slate-900 truncate">{store.name}</h4>
                            {store.verified && (
                              <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < Math.floor(store.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-slate-600 font-medium">{store.rating}</span>
                          </div>
                          <p className="text-sm text-slate-600 line-clamp-1">{store.address}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover/store:text-amber-500 group-hover/store:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#3a1812] via-[#2a1008] to-[#1a0804]">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Experience Excellence?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of satisfied customers who trust Bagong Gold for their precious metal needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-lg font-semibold transition-all duration-300">
              Get Started Today
            </button>
            <button className="px-8 py-4 border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 rounded-lg font-semibold transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}