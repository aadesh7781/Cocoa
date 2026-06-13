'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/LoadingScreen';
import HeroCanvas from '@/components/HeroCanvas';
import BestSellers from '@/components/BestSellers';
import InteractiveMenu from '@/components/InteractiveMenu';
import StorySection from '@/components/StorySection';
import OrderCTA from '@/components/OrderCTA';
import BottomNav from '@/components/BottomNav';

// Dynamically import client-heavy, non-critical modules below the fold for maximum Lighthouse score
const BackgroundParticles = dynamic(() => import('@/components/BackgroundParticles'), { ssr: false });
const Reviews = dynamic(() => import('@/components/Reviews'), { ssr: false });
const Location = dynamic(() => import('@/components/Location'), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showParticles, setShowParticles] = useState(false);
  const [heroPreloaded, setHeroPreloaded] = useState(false);

  // Defer R3F Particle setup until the Hero section is visible and interactive
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowParticles(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleHeroPreloadComplete = () => {
    setHeroPreloaded(true);
  };

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  // Structured Local Business Schema (JSON-LD) for Local SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    'name': 'COCOA',
    'image': '/sellers/pull_me_up_cake.png',
    '@id': 'https://cocoa-stories.vercel.app',
    'url': 'https://cocoa-stories.vercel.app',
    'telephone': '+919876543210',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '80 Feet Rd, Hal 2nd Stage, Indiranagar',
      'addressLocality': 'Bengaluru',
      'addressRegion': 'Karnataka',
      'postalCode': '560038',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 12.9764509,
      'longitude': 77.6387063
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        'opens': '08:00',
        'closes': '22:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Friday', 'Saturday', 'Sunday'],
        'opens': '08:00',
        'closes': '23:30'
      }
    ],
    'menu': 'https://cocoa-stories.vercel.app#menu-section'
  };

  return (
    <>
      {/* Local SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Premium Loader Screen */}
      <LoadingScreen onComplete={handleLoadingComplete} />

      {/* Main Container */}
      <main className={`flex flex-col min-h-screen ${loading ? 'overflow-hidden max-h-screen' : ''}`}>
        
        {/* Hero Section Sequence (GSAP Scroll Scrub) */}
        <HeroCanvas onLoaded={handleHeroPreloadComplete} />

        {/* Dynamic Background Particle Canvas (Deferred) */}
        {showParticles && <BackgroundParticles />}

        {/* Best Sellers Grid Section */}
        <BestSellers />

        {/* Interactive Menu List (Framer Motion sliding highlights) */}
        <InteractiveMenu />

        {/* Parallax Editorial Story Rows */}
        <StorySection />

        {/* Customer Testimonials Carousel */}
        <Reviews />

        {/* Contact info, Maps & Hours Grid */}
        <Location />

        {/* Swiggy/Zomato Online Delivery CTAs */}
        <OrderCTA />

        {/* Mobile Sticky Navigation Menu */}
        <BottomNav />

        {/* Editorial Footer */}
        <footer className="bg-[#2B1810] text-[#FFF8F0]/60 text-center py-12 px-6 border-t border-[#C69C6D]/15 font-poppins text-xs tracking-widest uppercase pb-24 md:pb-12 z-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[#FFF8F0] font-playfair font-bold text-lg tracking-widest">COCOA</span>
            <p>© {new Date().getFullYear()} COCOA Cafe. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#C69C6D] transition-colors duration-300">Privacy</a>
              <a href="#" className="hover:text-[#C69C6D] transition-colors duration-300">Terms</a>
              <a href="#" className="hover:text-[#C69C6D] transition-colors duration-300">Contact</a>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
