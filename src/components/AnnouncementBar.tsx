'use client';

import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Event data structure
interface Event {
  id: number;
  city: string;
  venue: string;
  dateEn: string;
  dateId: string;
}

// Define events with dates in both languages
const events: Event[] = [
  { id: 2, city: 'Bandung',  venue: 'Paris van Java',            dateEn: 'March 10 – March 16', dateId: '10 Maret – 16 Maret' },
  { id: 3, city: 'Cirebon',  venue: 'Toko Mas Merak',            dateEn: 'March 17 – March 23', dateId: '17 Maret – 23 Maret' },
  { id: 1, city: 'Surabaya', venue: 'Tunjungan Plaza (Project X)', dateEn: 'March 21 – March 23', dateId: '21 Maret – 23 Maret' },
  { id: 4, city: 'Surabaya', venue: 'Galaxy Mall (Kepo Market)',  dateEn: 'April 18 – April 20', dateId: '18 April – 20 April' },
  { id: 6, city: 'Bandung',  venue: 'Pameran APEPI',             dateEn: 'June 5 – July 7', dateId: '5 Juni – 7 Juli' },
  { id: 5, city: 'Surabaya', venue: 'Atrium Royal',              dateEn: 'June 30 – July 6', dateId: '30 Juni – 6 Juli' }
];

export default function AnnouncementBar() {
  const { language, t } = useLanguage();
  const [idx, setIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Create slides based on current language
  const slides = events.map(e => ({
    text: `${e.city} @ ${e.venue}: ${language === 'en' ? e.dateEn : e.dateId}`,
    key: e.id
  }));

  // advance every 4s
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIdx(i => (i + 1) % slides.length);
    }, 4000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length]);

  // Reset index when language changes to avoid out-of-bounds issues
  useEffect(() => {
    setIdx(0);
  }, [language]);

  const prev = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIdx(i => (i - 1 + slides.length) % slides.length);
  };
  
  const next = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIdx(i => (i + 1) % slides.length);
  };

  return (
    <div className="sticky top-0 z-50 relative">
      {/* Frosted background */}
      <div className="absolute inset-0 bg-yellow-100/25 backdrop-blur-lg shadow-lg shadow-black/20 pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto flex items-center justify-between py-2 px-4">
        <button 
          onClick={prev} 
          className="p-1 hover:opacity-75"
          aria-label={t('announcements.previous')}
        >
          <ArrowLeftOutlined fontSize="small" />
        </button>

        <div className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(${-idx * 100}%)` }}
          >
            {slides.map((slide) => (
              <span
                key={slide.key}
                className="
                  flex-shrink-0 w-full text-center
                  uppercase text-sm tracking-wide
                  text-white font-semibold drop-shadow-lg
                "
              >
                {slide.text}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={next} 
          className="p-1 hover:opacity-75"
          aria-label={t('announcements.next')}
        >
          <ArrowRightOutlined fontSize="small" />
        </button>
      </div>
    </div>
  );
}