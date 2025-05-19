'use client';

import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { useMemo } from 'react';
import Image from 'next/image';

export default function RandomParallaxGallery({
  speed = 10,
}) {
  const images = useMemo(
    () => [
      '/bagongReal/16.jpg','/bagongReal/17.jpg','/bagongReal/4.jpg','/bagongReal/26.jpg',
      '/bagongReal/6.jpg','/bagongReal/5.jpg','/bagongReal/23.jpg','/bagongReal/8.jpg',
      '/bagongReal/25.jpg','/bagongReal/1.jpg', '/bagongReal/2.jpg', '/bagongReal/24.jpg',
      '/bagongReal/10.jpg', '/bagongReal/13.jpg','/bagongReal/11.jpg','/bagongReal/9.jpg',
    ],
    []
  );

  return (
    <ParallaxProvider>
      <div className="flex flex-wrap w-full bg-white overflow-hidden" style={{ minHeight: '600px' }}>
        {images.map((src, idx) => {
          const isOdd = idx % 2 !== 0;
          const translateY: [string, string] = isOdd ? ['-20%', '20%'] : ['-20%', '20%'];
          const colSpeed = isOdd ? speed : speed;
          
          return (
            <div key={idx} className="w-1/2 sm:w-1/4 p-0 m-0 overflow-hidden" style={{ fontSize: 0 }}>
              <Parallax
                translateY={translateY}
                speed={colSpeed}
                scale={[1, 1]}
                className="w-full h-full"
              >
                <div className="w-full h-full overflow-hidden">
                  <Image
                    src={src}
                    alt={`Jewelry item ${idx+1}`}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full transform transition-transform duration-700 ease-out hover:scale-110"
                    priority={idx < 4}
                  />
                </div>
              </Parallax>
            </div>
          );
        })}
      </div>
    </ParallaxProvider>
  );
}