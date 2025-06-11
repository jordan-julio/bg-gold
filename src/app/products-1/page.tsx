'use client'
import CircularProductCarousel from '@/components/products/Carousel3D'
import React from 'react'

export default function AboutUs() {
  return (
    <div className="bg-white pt-28 cursor-none font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Experience Our Products in 3D
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Immerse yourself in our interactive 3D showcase and explore our products from every angle
            </p>
          </div>
        </div>
      </section>

      {/* 3D Carousel Section */}
      <section className="bg-white">
        <div className="size-full">
          <div className="">
            <CircularProductCarousel />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Our 3D Models</h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              We combine cutting-edge technology with artistic excellence to deliver the highest quality 3D experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                  <path d="M12 8v8"/>
                  <path d="M8 12h8"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">High Detail</h3>
              <p className="text-gray-500">
                Our models feature intricate details that bring virtual objects to life with stunning realism.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                  <path d="M19 12a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Optimized Performance</h3>
              <p className="text-gray-500">
                Enjoy smooth, responsive interactions with models optimized for web-based 3D viewing.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <path d="M12 22.08V12"/>
                  <path d="M12 12L3.5 6.5"/>
                  <path d="M12 12l8.5-5.5"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Elements</h3>
              <p className="text-gray-500">
                Explore every angle with our fully interactive 3D models that respond to your movements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to experience our 3D models?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            Contact us today to learn how our 3D models can enhance your projects and bring your ideas to life.
          </p>
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition">
            Get Started
          </button>
        </div>
      </section>
    </div>
  )
}