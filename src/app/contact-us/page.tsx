// app/page.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import Loader from '@/components/Loader'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { cormorantGaramond } from '@/lib/fonts'
import { useLanguage } from '@/context/LanguageContext'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [showLocations, setShowLocations] = useState(false)
  const [, setHoveredCard] = useState<number | null>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage();

  const contactMethods = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: t('contactus.visitShowroomsTitle'),
      subtitle: t('contactus.visitShowroomsSubtitle'),
      description: t('contactus.visitShowroomsDesc'),
      action: () => setShowLocations(true),
      gradient: 'from-amber-400/20 via-amber-500/10 to-transparent',
      border: 'border-amber-400/30'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: t('contactus.whatsappTitle'),
      subtitle: t('contactus.whatsappSubtitle'),
      description: t('contactus.whatsappDesc'),
      action: () => window.open('https://wa.me/6281333338888?text=Hello%2C%20I%27m%20interested%20in%20your%20jewelry%20collection', '_blank'),
      gradient: 'from-emerald-400/20 via-emerald-500/10 to-transparent',
      border: 'border-emerald-400/30'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: t('contactus.emailTitle'),
      subtitle: t('contactus.emailSubtitle'),
      description: t('contactus.emailDesc'),
      action: () => window.location.href = 'mailto:info@bggold.co.id?subject=Jewelry%20Inquiry',
      gradient: 'from-blue-400/20 via-blue-500/10 to-transparent',
      border: 'border-blue-400/30'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: t('contactus.callTitle'),
      subtitle: t('contactus.callSubtitle'),
      description: t('contactus.callDesc'),
      action: () => window.location.href = 'tel:+62315912988',
      gradient: 'from-purple-400/20 via-purple-500/10 to-transparent',
      border: 'border-purple-400/30'
    }
  ]

  const locations = [
    {
      name: t('contactus.royalPlazaName'),
      address: t('contactus.royalPlazaAddress'),
      fullAddress: t('contactus.royalPlazaFullAddress'),
      hours: t('contactus.royalPlazaHours'),
      features: [t('contactus.premiumCollection'), t('contactus.customDesignStudio'),, t('contactus.vipConsultation'),],
      map: 'https://maps.google.com/?q=Royal+Plaza+Surabaya'
    },
    {
      name: t('contactus.pasarAtomName'),
      address: t('contactus.pasarAtomAddress'),
      fullAddress: t('contactus.pasarAtomFullAddress'),
      hours: t('contactus.pasarAtomHours'),
      features: [t('contactus.classicCollection'), t('contactus.repairServices'), t('contactus.goldTrading')],
      map: 'https://maps.google.com/?q=Pasar+Atom+Mall+Surabaya'
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    await new Promise(r => setTimeout(r, 1000))
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

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
    <div className="pt-28 flex flex-col min-h-screen bg-gradient-to-br from-[#3a1812] via-[#2a1008] to-[#1a0804] text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#ecca76] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#d4af37] rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <header className="relative py-24 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-[#ecca76]/10 border border-[#ecca76]/30 rounded-full text-[#ecca76] text-sm font-medium tracking-wide">
              {t('contactus.contactUs')}
            </span>
          </div>
          <h1 className={`${cormorantGaramond.className} text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-[#ecca76] to-white bg-clip-text text-transparent leading-tight`}>
            {t('contactus.heroTitle')}
            <br />
            <span className="text-[#ecca76]">{t('contactus.heroTitleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-300/90 max-w-2xl mx-auto leading-relaxed mb-12">
            {t('contactus.heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-gradient-to-r from-[#ecca76] to-[#d4af37] text-[#3a1812] rounded-full font-semibold hover:shadow-2xl hover:shadow-[#ecca76]/25 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>{t('contactus.startConversation')}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button 
              onClick={() => setShowLocations(true)}
              className="px-8 py-4 border-2 border-[#ecca76]/50 rounded-full hover:bg-[#ecca76]/10 hover:border-[#ecca76] transition-all duration-300 backdrop-blur-sm"
            >
              {t('contactus.visitShowrooms')}
            </button>
          </div>
        </div>
      </header>

      {/* Contact Methods Grid */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`${cormorantGaramond.className} text-4xl md:text-5xl font-bold mb-4`}>
                {t('contactus.multipleWaysTitle')} <span className="text-[#ecca76]">{t('contactus.multipleWaysHighlight')}</span>
            </h2>
            <p className="text-gray-300/80 text-lg max-w-2xl mx-auto">
                {t('contactus.multipleWaysSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={method.action}
                className={`group cursor-pointer relative p-8 rounded-2xl bg-gradient-to-br ${method.gradient} backdrop-blur-sm border ${method.border} hover:border-[#ecca76]/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#ecca76]/10`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-[#ecca76] mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#ecca76] transition-colors duration-300">
                    {method.title}
                  </h3>
                  
                  <p className="text-[#ecca76] font-medium mb-3 text-sm tracking-wide">
                    {method.subtitle}
                  </p>
                  
                  <p className="text-gray-300/80 text-sm leading-relaxed">
                    {method.description}
                  </p>
                  
                  <div className="mt-6 flex items-center text-[#ecca76] opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <span className="text-sm font-medium">{t('contactus.getInTouch')}</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Information */}
      <section ref={formRef} className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-[#1a0a08]/80 to-[#2a1008]/60 backdrop-blur-xl p-10 rounded-3xl border border-[#ecca76]/20 shadow-2xl">
                {submitted ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#ecca76] to-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-[#3a1812]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className={`${cormorantGaramond.className} text-3xl font-bold mb-4`}>{t('contactus.successTitle')}</h2>
                    <p className="text-gray-300/80 text-lg">{t('contactus.successSubtitle')}</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className={`${cormorantGaramond.className} text-3xl font-bold mb-4`}>
                        {t('contactus.sendMessageTitle')} <span className="text-[#ecca76]">{t('contactus.sendMessageHighlight')}</span>
                      </h2>
                      <p className="text-gray-300/80">
                         {t('contactus.sendMessageSubtitle')}
                      </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-3 text-gray-200">{t('contactus.fullName')}</label>
                          <input 
                            name="name" 
                            required 
                            value={formData.name} 
                            onChange={handleChange}
                            placeholder={t('contactus.fullNamePlaceholder')}
                            className="w-full px-6 py-4 bg-[#0a0a0a]/50 border border-gray-600/50 rounded-xl focus:border-[#ecca76] focus:ring-2 focus:ring-[#ecca76]/20 transition-all duration-300 backdrop-blur-sm text-white placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-3 text-gray-200">{t('contactus.emailAddress')}</label>
                          <input 
                            name="email" 
                            type="email" 
                            required 
                            value={formData.email} 
                            onChange={handleChange}
                            placeholder={t('contactus.emailPlaceholder')}
                            className="w-full px-6 py-4 bg-[#0a0a0a]/50 border border-gray-600/50 rounded-xl focus:border-[#ecca76] focus:ring-2 focus:ring-[#ecca76]/20 transition-all duration-300 backdrop-blur-sm text-white placeholder-gray-400"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-3 text-gray-200">{t('contactus.yourMessage')}</label>
                        <textarea 
                          name="message" 
                          rows={6} 
                          required 
                          value={formData.message} 
                          onChange={handleChange}
                          placeholder={t('contactus.messagePlaceholder')}
                          className="w-full px-6 py-4 bg-[#0a0a0a]/50 border border-gray-600/50 rounded-xl focus:border-[#ecca76] focus:ring-2 focus:ring-[#ecca76]/20 transition-all duration-300 backdrop-blur-sm text-white placeholder-gray-400 resize-none"
                        />
                      </div>
                      
                      <button 
                        type="submit" 
                        className="w-full py-4 bg-gradient-to-r from-[#ecca76] to-[#d4af37] text-[#3a1812] rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#ecca76]/25 transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        {t('contactus.sendMessage')}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-8">
              {/* Office Information */}
              <div className="bg-gradient-to-br from-[#1a0a08]/60 to-[#2a1008]/40 backdrop-blur-xl p-8 rounded-3xl border border-[#ecca76]/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#ecca76] to-[#d4af37] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#3a1812]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className={`${cormorantGaramond.className} text-2xl font-bold ml-4`}>
                    {t('contactus.mainOffice')}
                  </h3>
                </div>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-[#ecca76] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-medium">{t('contactus.officeAddress')}</p>
                      <p className="text-sm">{t('contactus.officeCity')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-[#ecca76] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium">{t('contactus.officeSchedule')}</p>
                      <p className="text-sm">{t('contactus.officeScheduleSunday')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-[#1a0a08]/60 to-[#2a1008]/40 backdrop-blur-xl p-8 rounded-3xl border border-[#ecca76]/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#ecca76] to-[#d4af37] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#3a1812]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className={`${cormorantGaramond.className} text-2xl font-bold ml-4`}>
                    {t('contactus.followUs')}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { name: 'Instagram', handle: '@bggold_official', url: 'https://instagram.com/bggold', color: '' },
                    { name: 'Facebook', handle: 'BG Gold Jewelry', url: 'https://facebook.com/bggold', color: '' },
                    { name: 'TikTok', handle: '@bggold', url: 'https://tiktok.com/@bggold', color: '' }
                  ].map((social, index) => (
                    <Link 
                      key={index}
                      href={social.url} 
                      className={`flex items-center justify-between p-4 bg-gradient-to-r ${social.color} bg-opacity-10 border border-white/10 rounded-xl hover:bg-opacity-20 transition-all duration-300 group`}
                    >
                      <div>
                        <p className="font-medium text-white">{social.name}</p>
                        <p className="text-sm text-gray-300">{social.handle}</p>
                      </div>
                      <svg className="w-5 h-5 text-[#ecca76] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showrooms Modal */}
      {showLocations && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-50" onClick={() => setShowLocations(false)}>
          <div className="bg-gradient-to-br from-[#1a0a08] to-[#2a1008] p-8 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#ecca76]/30" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <h2 className={`${cormorantGaramond.className} text-3xl font-bold text-[#ecca76]`}>
                 {t('contactus.premiumShowrooms')}
              </h2>
              <button 
                onClick={() => setShowLocations(false)}
                className="w-10 h-10 bg-[#ecca76]/20 hover:bg-[#ecca76]/30 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-6 h-6 text-[#ecca76]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {locations.map((location, index) => (
                <div key={index} className="bg-[#0a0a0a]/50 p-8 rounded-2xl border border-[#ecca76]/20">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{location.name}</h3>
                      <p className="text-[#ecca76] text-sm font-medium">{location.address}</p>
                      <p className="text-gray-400 text-sm mt-1">{location.fullAddress}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-[#ecca76] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-300">{location.hours}</span>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 mb-2">{t('contactus.availableServices')}</p>
                      <div className="flex flex-wrap gap-2">
                        {location.features.map((feature, idx) => (
                          <span key={idx} className="px-3 py-1 bg-[#ecca76]/20 text-[#ecca76] rounded-full text-xs font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    href={location.map} 
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#ecca76] to-[#d4af37] text-[#3a1812] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#ecca76]/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <span>{t('contactus.viewOnMap')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
            
            {/**
            <div className="mt-8 p-6 bg-[#ecca76]/10 rounded-2xl border border-[#ecca76]/30">
              <h4 className="font-bold text-[#ecca76] mb-2">Book a Private Consultation</h4>
              <p className="text-gray-300 text-sm mb-4">
                Schedule a one-on-one appointment with our jewelry experts for personalized service and exclusive access to our premium collections.
              </p>
              <button 
                onClick={() => {
                  setShowLocations(false);
                  window.open('https://wa.me/6281333338888?text=Hello%2C%20I%27d%20like%20to%20book%20a%20private%20consultation%20at%20your%20showroom', '_blank');
                }}
                className="px-6 py-2 bg-[#ecca76] text-[#3a1812] rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Book Now via WhatsApp
              </button>
            </div>
             */}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}