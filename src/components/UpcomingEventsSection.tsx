// components/UpcomingEvents.jsx
'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { CalendarMonth, Place } from '@mui/icons-material';

const events = [
  {
    city: 'Bandung',
    venue: 'Paris van Java',
    dateRange: 'March 10 – March 16',
    image: '/locations/projectx.png',
    upcoming: false
  },
  {
    city: 'Cirebon',
    venue: 'Toko Mas Merak',
    dateRange: 'March 17 – March 23',
    image: '/locations/projectx.png',
    upcoming: false
  },
  {
    city: 'Surabaya',
    venue: 'Tunjungan Plaza (Project X)',
    dateRange: 'March 21 – March 23',
    image: '/locations/projectx.png',
    upcoming: false
  },
  {
    city: 'Surabaya',
    venue: 'Galaxy Mall (Kepo Market)',
    dateRange: 'April 18 – April 20',
    image: '/locations/kepo.jpg',
    upcoming: true,
    featured: true
  },
  {
    city: 'Bandung',
    venue: 'Pameran APEPI',
    dateRange: 'June 5 – July 7',
    image: '/locations/apepi.webp',
    upcoming: true
  },
  {
    city: 'Surabaya',
    venue: 'Atrium Royal',
    dateRange: 'June 30 – July 6',
    image: '/locations/royal.png',
    upcoming: true
  }
];

export default function UpcomingEvents() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const cards = sectionRef.current?.querySelectorAll('.event-card') || [];
    
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  // Get the featured event if any
  const featuredEvent = events.find(event => event.featured);
  // Get the upcoming events (excluding the featured one)
  const upcomingEvents = events.filter(event => event.upcoming && !event.featured);
  // Get past events
  const pastEvents = events.filter(event => !event.upcoming);
  
  return (
    <section ref={sectionRef} className="py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-amber-50 w-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#3a1812] text-center mb-4">
          Upcoming Events
        </h2>
        <div className="w-32 h-1 bg-[#9d8858] mx-auto mb-12 rounded"></div>
        
        {/* Featured Event (if any) */}
        {featuredEvent && (
          <div className="mb-16 overflow-hidden rounded-2xl shadow-xl bg-white">
            <div className="relative">
              <div className="absolute top-0 left-0 bg-[#9d8858] text-white py-2 px-6 rounded-br-2xl font-medium z-10">
                Featured
              </div>
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto min-h-64">
                  <Image 
                    src={featuredEvent.image || "/placeholders/event-default.jpg"} 
                    alt={featuredEvent.venue}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:hidden"></div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="inline-block px-4 py-1 rounded-full bg-amber-100 text-[#9d8858] font-medium text-sm mb-4">
                    NEXT EVENT
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#3a1812] mb-3">{featuredEvent.venue}</h3>
                  <div className="flex items-center text-[#3a1812]/80 mb-2">
                  <Place fontSize="small" className="mr-2 text-[#9d8858]" />
                    <span>{featuredEvent.city}</span>
                  </div>
                  <div className="flex items-center text-[#3a1812]/80 mb-6">
                  <CalendarMonth fontSize="small" className="mr-2 text-[#9d8858]" />
                    <span>{featuredEvent.dateRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Upcoming Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {upcomingEvents.map((event, idx) => (
            <div key={idx} className="event-card bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02] hover:shadow-xl">
              <div className="relative h-48">
                <Image 
                  src={event.image || "/placeholders/event-default.jpg"} 
                  alt={event.venue}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-[#3a1812]">{event.venue}</h3>
                  <span className="inline-block px-2 py-1 rounded-full bg-amber-100 text-[#9d8858] text-xs font-medium">
                    Upcoming
                  </span>
                </div>
                <div className="flex items-center text-[#3a1812]/80 mb-2 text-sm">
                  <Place fontSize="small" className="mr-2 text-[#9d8858]" />
                  <span>{event.city}</span>
                </div>
                <div className="flex items-center text-[#3a1812]/80 text-sm">
                  <CalendarMonth fontSize='small' className="mr-2 text-[#9d8858]" />
                  <span>{event.dateRange}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Past Events Section (collapsible) */}
        <div className="mt-12">
          <details className="group">
            <summary className="flex items-center justify-center cursor-pointer list-none">
              <span className="text-lg font-medium text-[#3a1812] mr-2">View Past Events</span>
              <span className="transform group-open:rotate-180 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </summary>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastEvents.map((event, idx) => (
                <div key={idx} className="flex bg-white/80 rounded-lg overflow-hidden shadow-sm">
                  <div className="relative w-24 h-24 shrink-0">
                    <Image 
                      src={event.image || "/placeholders/event-default.jpg"} 
                      alt={event.venue}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold text-[#3a1812]">{event.venue}</h3>
                    <div className="flex items-center text-[#3a1812]/80 text-xs mb-1">
                      <Place fontSize="small" className="mr-1 text-[#9d8858]" />
                      <span>{event.city}</span>
                    </div>
                    <div className="flex items-center text-[#3a1812]/80 text-xs">
                      <CalendarMonth fontSize="small" className="mr-1 text-[#9d8858]" />
                      <span>{event.dateRange}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}