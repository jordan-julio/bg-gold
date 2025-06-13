'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Loader from '@/components/Loader'
import Footer from '@/components/Footer'
import { cormorantGaramond } from '@/lib/fonts'
import { useLanguage } from '@/context/LanguageContext'

export default function CareersPage() {
    const { t } = useLanguage(); 
  const [isLoading, setIsLoading] = useState(true)
  const [activePosition, setActivePosition] = useState<string | null>(null)

  const positions = [
    {
      id: 'accounting',
      title: t('careers.job.accounting.title'),
      department: t('careers.job.accounting.department'),
      type: t('careers.job.accounting.type'),
      location: t('careers.job.accounting.location'),
      description: t('careers.job.accounting.description'),
      requirements: [
        t('careers.job.accounting.req1'),
        t('careers.job.accounting.req2'),
        t('careers.job.accounting.req3'),
        t('careers.job.accounting.req4'),
        t('careers.job.accounting.req5'),
        t('careers.job.accounting.req6'),
        t('careers.job.accounting.req7'),
        t('careers.job.accounting.req8'),
      ],
      benefits: [
        t('careers.benefits.salary'),
        t('careers.benefits.health'),
        t('careers.benefits.bonus'),
        t('careers.benefits.development'),
        t('careers.benefits.advancement'),
        t('careers.benefits.environment'),
      ],
      mailto: 'mailto:careers@bggold.com?subject=Application%20-%20Accounting%20Staff',
    },
    {
      id: 'ppic',
      title: t('careers.job.ppic.title'),
      department: t('careers.job.ppic.department'),
      type: t('careers.job.ppic.type'),
      location: t('careers.job.ppic.location'),
      description: t('careers.job.ppic.description'),
      requirements: [
        t('careers.job.ppic.req1'),
        t('careers.job.ppic.req2'),
        t('careers.job.ppic.req3'),
        t('careers.job.ppic.req4'),
        t('careers.job.ppic.req5'),
        t('careers.job.ppic.req6'),
        t('careers.job.ppic.req7'),
      ],
      benefits: [
        t('careers.benefits.compensation'),
        t('careers.benefits.wellness'),
        t('careers.benefits.incentives'),
        t('careers.benefits.training'),
        t('careers.benefits.teambuilding'),
        t('careers.benefits.culture')
      ],
      mailto: 'mailto:careers@bggold.com?subject=Application%20-%20PPIC%20Staff',
    },
  ]

  const companyValues = [
    {
      title: t('careers.values.excellence.title'),
      description: t('careers.values.excellence.description'),
      icon: '✨'
    },
    {
      title: t('careers.values.growth.title'),
      description: t('careers.values.growth.description'),
      icon: '📈'
    },
    {
      title: t('careers.values.collaborative.title'),
      description: t('careers.values.collaborative.description'),
      icon: '🤝'
    },
    {
      title: t('careers.values.innovation.title'),
      description: t('careers.values.innovation.description'),
      icon: '💡'
    }
  ]

  useEffect(() => {
    // Loading state
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
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
      <section className="relative bg-gradient-to-br from-[#3a1812] via-[#2e0f10] to-[#3a1812] text-white overflow-hidden pt-24">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#ecca76] rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#ecca76] rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-[#ecca76] via-[#ffd700] to-[#ecca76] bg-clip-text text-transparent">
              {t('careers.hero.title1')}
            </span>
            <br />
            <span className="text-white">{t('careers.hero.title2')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 animate-fade-in-delayed leading-relaxed">
            {t('careers.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delayed-2">
            <a href="#positions" className="px-8 py-4 bg-[#ecca76] text-[#3a1812] rounded-full font-semibold hover:bg-[#ffd700] transform hover:scale-105 transition-all duration-300 shadow-lg">
                {t('careers.hero.cta.positions')}
            </a>
            <a href="#values" className="px-8 py-4 border-2 border-[#ecca76] text-[#ecca76] rounded-full font-semibold hover:bg-[#ecca76] hover:text-[#3a1812] transform hover:scale-105 transition-all duration-300">
                {t('careers.hero.cta.whyjoin')}
            </a>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section id="values" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3a1812] mb-4">{t('careers.values.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('careers.values.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, idx) => (
              <div 
                key={idx}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[#3a1812] mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-[#3a1812] to-[#2e0f10] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold text-[#ecca76] mb-2">25+</div>
              <div className="text-gray-300">{t('careers.stats.years')}</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl md:text-5xl font-bold text-[#ecca76] mb-2">200+</div>
              <div className="text-gray-300">{t('careers.stats.team')}</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl md:text-5xl font-bold text-[#ecca76] mb-2">4</div>
              <div className="text-gray-300">{t('careers.stats.locations')}</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl md:text-5xl font-bold text-[#ecca76] mb-2">1000+</div>
              <div className="text-gray-300">{t('careers.stats.customers')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-24 px-6 bg-[#faf8f6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3a1812] mb-4">{t('careers.positions.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('careers.positions.description')}
            </p>
          </div>

          <div className="space-y-8">
            {positions.map((position, idx) => (
              <div
                key={position.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Position Header */}
                <div className="bg-gradient-to-r from-[#3a1812] to-[#2e0f10] p-8 text-white">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {position.department}
                        </span>
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {position.type}
                        </span>
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {position.location}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setActivePosition(activePosition === position.id ? null : position.id)}
                      className="mt-4 md:mt-0 px-6 py-3 bg-[#ecca76] text-[#3a1812] rounded-full font-semibold hover:bg-[#ffd700] transition-all duration-300 flex items-center gap-2"
                    >
                      {activePosition === position.id ? t('careers.positions.hideDetails') : t('careers.positions.viewDetails')}
                      <svg 
                        className={`w-4 h-4 transform transition-transform ${activePosition === position.id ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Position Details - Collapsible */}
                <div className={`transition-all duration-500 ${activePosition === position.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <div className="p-8 space-y-8">
                    {/* Description */}
                    <div>
                      <p className="text-gray-700 text-lg leading-relaxed">{position.description}</p>
                    </div>

                    {/* Requirements & Benefits Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Requirements */}
                      <div>
                        <h4 className="text-xl font-bold text-[#3a1812] mb-4 flex items-center gap-2">
                          <span className="w-8 h-8 bg-[#ecca76] rounded-full flex items-center justify-center text-white text-sm">✓</span>
                            {t('careers.positions.requirements')}
                        </h4>
                        <ul className="space-y-3">
                          {position.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600">
                              <span className="text-[#ecca76] mt-1">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="text-xl font-bold text-[#3a1812] mb-4 flex items-center gap-2">
                          <span className="w-8 h-8 bg-[#ecca76] rounded-full flex items-center justify-center text-white text-sm">★</span>
                          {t('careers.positions.benefits')}
                        </h4>
                        <ul className="space-y-3">
                          {position.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600">
                              <span className="text-[#ecca76] mt-1">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="pt-6 border-t border-gray-200">
                      <Link href={position.mailto} className="inline-block">
                        <button className="px-8 py-4 bg-gradient-to-r from-[#ecca76] to-[#ffd700] text-[#3a1812] rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
                          {t('careers.positions.apply')}
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3a1812] mb-4">{t('careers.testimonials.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('careers.testimonials.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: t('careers.testimonials.quote1'),
                author: t('careers.testimonials.author1'),
                role: t('careers.testimonials.role1'),
                years: t('careers.testimonials.years1')
              },
              {
                quote: t('careers.testimonials.quote2'),
                author: t('careers.testimonials.author2'),
                role: t('careers.testimonials.role2'),
                years: t('careers.testimonials.years2')
              },
              {
                quote: t('careers.testimonials.quote3'),
                author: t('careers.testimonials.author3'),
                role: t('careers.testimonials.role3'),
                years: t('careers.testimonials.years3')
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-[#faf8f6] rounded-2xl p-8 relative">
                <svg className="absolute top-4 left-4 w-8 h-8 text-[#ecca76] opacity-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-700 italic mb-6 relative z-10">&quot;{testimonial.quote}&quot;</p>
                <div className="relative z-10">
                  <p className="font-bold text-[#3a1812]">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-[#ecca76]">{testimonial.years}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-[#3a1812] to-[#2e0f10] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('careers.cta.title')}
          </h2>
          <p className="text-xl mb-12 text-gray-300">
            {t('careers.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:careers@bggold.com" className="px-8 py-4 bg-[#ecca76] text-[#3a1812] rounded-full font-semibold hover:bg-[#ffd700] transform hover:scale-105 transition-all duration-300 shadow-lg">
                {t('careers.cta.apply')}
            </Link>
            <Link href="/contact" className="px-8 py-4 border-2 border-[#ecca76] text-[#ecca76] rounded-full font-semibold hover:bg-[#ecca76] hover:text-[#3a1812] transform hover:scale-105 transition-all duration-300">
                {t('careers.cta.contact')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.8s ease forwards;
        }
        
        .animate-fade-in-delayed {
          opacity: 0;
          animation: fade-in 0.8s ease 0.3s forwards;
        }
        
        .animate-fade-in-delayed-2 {
          opacity: 0;
          animation: fade-in 0.8s ease 0.6s forwards;
        }
      `}</style>
    </div>
  )
}