// pages/about-us.tsx (or app/about-us/page.tsx)
'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from '@/components/Loader'
import Footer from '@/components/Footer'
// import { useLanguage } from '@/context/LanguageContext'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutUs() {
  // const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const aboutSectionRef = useRef<HTMLElement | null>(null)
  const visionSectionRef = useRef<HTMLElement | null>(null)
  const missionSectionRef = useRef<HTMLElement | null>(null)
  const timelineRef = useRef<HTMLElement | null>(null)
  
  useEffect(() => {
    // Preload critical images
    const imagesToPreload = [
      '/bagongReal/19.jpg',
      '/bagongReal/23.jpg',
      '/bagongReal/22.jpg'
    ]
    
    let loadedImages = 0
    const totalImages = imagesToPreload.length
    
    const imageLoaded = () => {
      loadedImages++
      if (loadedImages === totalImages) {
        // All images are loaded, now we can hide the loader
        setTimeout(() => setLoading(false), 500) // Small delay for smoother transition
      }
    }
    
    // Start preloading all critical images
    imagesToPreload.forEach(src => {
      const img = document.createElement('img');
      img.onload = imageLoaded
      img.onerror = imageLoaded // Count errors as loaded to prevent hanging
      img.src = src
    })
    
    // Set a maximum wait time of 5 seconds, then show content regardless
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 5000)
    
    // Set up scroll animations (will execute after loading is complete)
    const setupAnimations = () => {
      // Simple fade-in animations
      const sections = [aboutSectionRef, visionSectionRef, missionSectionRef]
      
      sections.forEach(section => {
        if (section.current) {
          gsap.fromTo(
            section.current.querySelectorAll('.animate-in'),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.2,
              duration: 0.8,
              scrollTrigger: {
                trigger: section.current,
                start: "top 75%",
              }
            }
          )
        }
      })
      
      // Timeline animation
      if (timelineRef.current) {
        const timelineItems = timelineRef.current.querySelectorAll('.timeline-item')
        
        gsap.fromTo(
          timelineItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.3,
            duration: 0.8,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
            }
          }
        )
      }
    }
    
    // Setup animations if already loaded, or after loading completes
    if (!loading) {
      setupAnimations()
    } else {
      const checkLoading = setInterval(() => {
        if (!loading) {
          setupAnimations()
          clearInterval(checkLoading)
        }
      }, 100)
    }
    
    // Cleanup
    return () => {
      clearTimeout(timeout)
    }
  }, [loading])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#edca89] flex items-center justify-center z-50">
        <Loader type="circle" duration="2s" />
        <Loader type="triangle" duration="2s" />
        <Loader type="rect" duration='2s' />
      </div>
    )
  }

  // Timeline milestones
  const milestones = [
    { year: 2003, title: "Pendirian", description: "PT Bagong Sejahtera Abadi (BG Gold) didirikan di Surabaya" },
    { year: 2009, title: "Pertumbuhan", description: "Ekspansi produksi dan pembukaan showroom pertama" },
    { year: 2013, title: "Inovasi", description: "Pengenalan koleksi desain kontemporer" },
    { year: 2018, title: "Pencapaian", description: "Merayakan 15 tahun dengan pelanggan ke-50.000" },
    { year: 2023, title: "Saat Ini", description: "20+ tahun dedikasi dalam keunggulan perhiasan" }
  ]

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bagongReal/19.jpg"
            alt="Kerajinan perhiasan emas"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 drop-shadow-lg">
            Tentang BG Gold
          </h1>
          <div className="w-28 h-1 bg-[#edca89] mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Menghadirkan keindahan perhiasan berkualitas tinggi dengan warisan keahlian Indonesia sejak 2003
          </p>
        </div>
      </section>
      
      {/* About Section */}
      <section 
        ref={aboutSectionRef}
        className="py-20 px-6 md:px-12 lg:px-24 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <h2 className="animate-in text-3xl md:text-4xl font-serif font-bold text-[#3a1812] mb-6">
                Sekilas Tentang Kami
              </h2>
              <div className="animate-in w-28 h-1 bg-[#9d8858] mb-8"></div>
              <div className="animate-in space-y-6">
                <p className="text-lg leading-relaxed text-[#3a1812]">
                  BG GOLD Indonesia adalah pabrik perhiasan terkemuka yang berkomitmen untuk menghasilkan produk perhiasan berkualitas tinggi dengan desain yang elegan dan inovatif. Berdiri sejak 2003, kami telah berkembang menjadi salah satu produsen perhiasan terbaik di Indonesia dengan reputasi yang kuat dalam industri perhiasan lokal maupun internasional.
                </p>
                <p className="text-lg leading-relaxed text-[#3a1812]">
                  Kami mengutamakan kualitas, ketelitian, dan keindahan dalam setiap produk yang kami buat. Dengan pengalaman lebih dari 20 tahun, BG GOLD Indonesia memiliki tim yang terampil dan berdedikasi untuk menghasilkan perhiasan yang tidak hanya mempesona, tetapi juga tahan lama dan bernilai tinggi.
                </p>
              </div>
              <div className="animate-in mt-8 flex items-baseline space-x-3">
                <div className="text-6xl font-bold text-[#9d8858] leading-none">
                  22+
                </div>
                <div className="text-lg font-medium text-[#3a1812]">Tahun Pengalaman</div>
              </div>
            </div>
            
            <div className="lg:col-span-2 animate-in">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-[4/5]">
                  <Image
                    src="/bagongReal/23.jpg"
                    alt="Proses pembuatan perhiasan"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black to-transparent pt-16 pb-6 px-6">
                  <div className="text-white font-light text-sm italic">
                    &quot;Setiap perhiasan dibuat dengan dedikasi penuh oleh tangan-tangan terampil pengrajin kami.&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section 
        ref={timelineRef}
        className="py-20 bg-gradient-to-b from-amber-50 to-white"
      >
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3a1812] text-center mb-6">
            Perjalanan Kami
          </h2>
          <div className="w-28 h-1 bg-[#9d8858] mx-auto mb-16"></div>
          
          <div className="relative pb-12">
            {/* Timeline center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#9d8858]/20 transform md:-translate-x-1/2"></div>
            
            {/* Timeline items */}
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.year}
                className="timeline-item relative mb-12 last:mb-0 ml-12 md:ml-0 md:grid md:grid-cols-2 md:gap-8"
              >
                {/* Year circle */}
                <div className="absolute left-[-35px] md:left-1/2 top-0 transform md:-translate-x-1/2 w-[70px] h-[70px] rounded-full bg-[#9d8858] text-white flex flex-col items-center justify-center z-10 shadow-lg">
                  <span className="text-sm">Tahun</span>
                  <span className="text-xl font-bold">{milestone.year}</span>
                </div>
                
                {/* Content - alternating sides */}
                <div className={`
                  md:col-span-1 bg-white shadow-md p-6 rounded-lg
                  ${index % 2 === 0 ? 'border-r-4 border-[#9d8858] md:text-right md:mr-12' : 'border-l-4 border-[#9d8858] md:ml-12 md:col-start-2'}
                `}>
                  <h3 className="text-xl font-bold text-[#3a1812] mb-2">{milestone.title}</h3>
                  <p className="text-[#3a1812]/80">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Vision Section */}
      <section 
        ref={visionSectionRef} 
        className="py-20 px-6 md:px-12 lg:px-24 bg-[#3a1812] text-white"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="animate-in text-3xl md:text-4xl font-serif font-bold mb-6">
              Visi Perusahaan
            </h2>
            <div className="animate-in w-28 h-1 bg-[#edca89] mx-auto mb-8"></div>
          </div>
          
          <div className="animate-in flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/bagongReal/22.jpg"
                  alt="Tampilan perhiasan BG Gold"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/2 md:pl-6">
              <p className="text-xl md:text-2xl leading-relaxed italic font-serif">
                &quot;Menjadi pemimpin dalam industri perhiasan, memberikan nilai tambah melalui produk yang inovatif, dan terus berkembang untuk memenuhi kebutuhan pasar global dengan standar kualitas terbaik.&quot;
              </p>
              <div className="mt-8 w-24 h-0.5 bg-[#edca89]"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section 
        ref={missionSectionRef}
        className="py-20 px-6 md:px-12 lg:px-24 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="animate-in text-3xl md:text-4xl font-serif font-bold text-[#3a1812] text-center mb-6">
            Misi Perusahaan
          </h2>
          <div className="animate-in w-28 h-1 bg-[#9d8858] mx-auto mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Kualitas Terbaik",
                description: "Menghasilkan perhiasan dengan kualitas terbaik yang memenuhi harapan dan kebutuhan pelanggan.",
                icon: "✦"
              },
              {
                title: "Desain Inovatif",
                description: "Mengedepankan desain yang inovatif dan unik dengan menggunakan bahan baku berkualitas tinggi.",
                icon: "✦"
              },
              {
                title: "Integritas & Kepercayaan",
                description: "Berkomitmen untuk menjaga integritas, kepercayaan, dan kepuasan pelanggan melalui layanan yang profesional dan ramah.",
                icon: "✦"
              },
              {
                title: "Tanggung Jawab Sosial",
                description: "Menjadi perusahaan yang bertanggung jawab secara sosial dan lingkungan.",
                icon: "✦"
              }
            ].map((mission, index) => (
                <div 
                key={mission.title}
                className="animate-in flex bg-amber-50 p-6 rounded-lg hover:shadow-none transition-shadow duration-500"
                style={{ 
                  animationDelay: `${index * 100}ms`, 
                  boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px"
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'none'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.18) 0px 2px 4px'}
              >
                <div className="text-xl md:text-2xl font-serif text-[#9d8858] mr-4">
                  {mission.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#3a1812] mb-2">{mission.title}</h3>
                  <p className="text-[#3a1812]/80 leading-relaxed">{mission.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Image Gallery Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3a1812] text-center mb-6">
            Keunggulan Produk Kami
          </h2>
          <div className="w-28 h-1 bg-[#9d8858] mx-auto mb-16"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              "/bagongReal/1.jpg",
              "/bagongReal/2.jpg",
              "/bagongReal/3.jpg",
            ].map((src, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg shadow-md">
                <div className="aspect-square">
                  <Image
                    src={src}
                    alt={`Produk BG Gold ${index + 1}`}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#3a1812] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Hubungi Kami
          </h2>
          <div className="w-28 h-1 bg-[#edca89] mx-auto mb-8"></div>
          <p className="text-lg md:text-xl leading-relaxed mb-12 mx-auto max-w-2xl">
            Tertarik untuk mengetahui lebih lanjut tentang produk kami atau ingin bekerja sama? Jangan ragu untuk menghubungi tim kami.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="/products" 
              className="px-8 py-4 bg-[#9d8858] text-white rounded-md font-medium hover:bg-[#8a754a] transition-colors"
            >
              Lihat Koleksi Kami
            </a>
            <a 
              href="/contact" 
              className="px-8 py-4 bg-transparent border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}