import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";

const events = [
  { id: 2, city: 'Bandung',  venue: 'Paris van Java',            date: '10 Maret – 16 Maret' },
  { id: 3, city: 'Cirebon',  venue: 'Toko Mas Merak',            date: '17 Maret – 23 Maret' },
  { id: 1, city: 'Surabaya', venue: 'Tunjungan Plaza (Project X)', date: '21 Maret – 23 Maret' },
  { id: 4, city: 'Surabaya', venue: 'Galaxy Mall (Kepo Market)',  date: '18 April – 20 April' },
  { id: 6, city: 'Bandung',  venue: 'Pameran APEPI',             date: '5 Juni – 7 Juli' },
  { id: 5, city: 'Surabaya', venue: 'Atrium Royal',              date: '30 Juni – 6 Juli' }
];

// Only events now
const slides = events.map(e => ({
  text: `${e.city} @ ${e.venue}: ${e.date}`,
  key: e.id
}));

export default function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>(undefined);

  // advance every 4s
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIdx(i => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const prev = () => {
    clearInterval(intervalRef.current);
    setIdx(i => (i - 1 + slides.length) % slides.length);
  };
  const next = () => {
    clearInterval(intervalRef.current);
    setIdx(i => (i + 1) % slides.length);
  };

  return (
    <div className="sticky top-0 z-50 relative">
      {/* Frosted background */}
      <div className="absolute inset-0 bg-yellow-100/25 backdrop-blur-lg shadow-lg shadow-black/20 pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto flex items-center justify-between py-2 px-4">
        <button onClick={prev} className="p-1 hover:opacity-75">
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

        <button onClick={next} className="p-1 hover:opacity-75">
          <ArrowRightOutlined fontSize="small" />
        </button>
      </div>
    </div>
  );
}
