// components/FeaturedGrid.js
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// Dummy product data (12 items)
const dummyProducts = [
  { id: 1, image: '/bagongReal/1.jpg' },
  { id: 2, image: '/bagongReal/2.jpg' },
  { id: 3, image: '/bagongReal/3.jpg' },
  { id: 4, image: '/bagongReal/4.jpg' },
  { id: 5, image: '/bagongReal/5.jpg' },
  { id: 6, image: '/bagongReal/6.jpg' },
  { id: 7, image: '/bagongReal/7.jpg' },
  { id: 8, image: '/bagongReal/8.jpg' },
  { id: 9, image: '/bagongReal/9.jpg' },
  { id: 10, image: '/bagongReal/10.jpg' },
  { id: 11, image: '/bagongReal/11.jpg' },
  { id: 12, image: '/bagongReal/12.jpg' },
];

export default function FeaturedGrid() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<Record<number, boolean>>({});
  const [scrollDir, setScrollDir] = useState('down');
  const lastScrollY = useRef(0);

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollDir(currentY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for visibility toggling
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, dummyProducts.length);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = (entry.target as HTMLElement).dataset.index as string;
          setVisible((prev) => ({ ...prev, [idx]: entry.isIntersecting }));
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px 0px 0px' }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {dummyProducts.map((product, idx) => {
          const isVisible = visible[idx];
          const translateY = isVisible
            ? 'translate-y-0 scale-100'
            : scrollDir === 'down'
            ? 'translate-y-12 scale-95'
            : '-translate-y-12 scale-95';
        
          return (
            <div
              key={product.id}
              data-index={idx}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className={`transform ${translateY} transition-all duration-1000 ease-in-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="group relative aspect-square w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={`Product ${product.id}`}
                  layout="fill"
                  objectFit="cover"
                  className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-110"
                  priority={true}
                />
                <div className="absolute inset-0 bg-transparent bg-opacity-0 group-hover:bg-opacity-20 transition duration-700" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
