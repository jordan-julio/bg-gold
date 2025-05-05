// components/FeaturedGrid.js
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// Dummy product data (12 items)
const dummyProducts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, image: 'https://images.unsplash.com/photo-1615655096345-61a54750068d?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 5, image: 'https://images.unsplash.com/photo-1631982645875-8bd1db34b1a1?q=80&w=2315&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 6, image: 'https://plus.unsplash.com/premium_photo-1709033404514-c3953af680b4?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 7, image: 'https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?q=80&w=2119&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 8, image: 'https://plus.unsplash.com/premium_photo-1709033511355-d2b8d7e86797?q=80&w=3749&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 9, image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 10, image: 'https://images.unsplash.com/photo-1615655096345-61a54750068d?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 11, image: 'https://images.unsplash.com/photo-1631982645875-8bd1db34b1a1?q=80&w=2315&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 12, image: 'https://plus.unsplash.com/premium_photo-1709033404514-c3953af680b4?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
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
