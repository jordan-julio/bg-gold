// components/ScrollingMarquee.tsx
'use client'

import React from 'react'

export default function ScrollingMarquee() {
  const phrase = 'BG Gold • Be Bold Be Gold • #BeBoldBeGold'

  // We'll still repeat 12× (adjust as needed), but render each as its own span
  const copies = Array.from({ length: 12 })

  return (
    <div className="overflow-hidden bg-[#9d8858] w-full">
      <div className="ticker whitespace-nowrap px-8 py-4 text-2xl font-bold">
        {copies.map((_, i) => (
          <span
            key={i}
            className="inline-block mx-[10px]"
          >
            {phrase}
          </span>
        ))}
      </div>

      <style jsx>{`
        .ticker {
          display: inline-block;
          color: #e3e3e3;
          animation: scroll-left 35s linear infinite;
        }
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
