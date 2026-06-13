'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const REVIEWS = [
  {
    id: 1,
    name: 'Eleanor Vance',
    location: 'New York, NY',
    text: 'The Pull Me Up Cake is an absolute theater of chocolate! Perfect level of sweetness, rich taste, and the hazelnut latte is to die for.',
    avatar: '/sellers/pull_me_up_cake.png',
    rating: 5,
  },
  {
    id: 2,
    name: 'Julian Croft',
    location: 'London, UK',
    text: 'A true masterclass in single-origin chocolate. The atmosphere feels like a luxury lounge, and the service is incredibly editorial.',
    avatar: '/sellers/belgian_brownie.png',
    rating: 5,
  },
  {
    id: 3,
    name: 'Aria Thorne',
    location: 'Paris, France',
    text: "The V60 pour over is incredibly floral and bright. Their Red Velvet pastry is the best I've had outside of France.",
    avatar: '/sellers/red_velvet_pastry.png',
    rating: 5,
  },
  {
    id: 4,
    name: 'Marcus Sterling',
    location: 'Milan, Italy',
    text: "I've visited cafes worldwide, and COCOA stands out in every aspect. The dark chocolate aesthetic and the quality of their espresso are stellar.",
    avatar: '/sellers/classic_cappuccino.png',
    rating: 5,
  }
];

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide effect
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const currentReview = REVIEWS[index];

  return (
    <section 
      id="reviews-section" 
      className="bg-[#2B1810] text-[#FFF8F0] py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C69C6D]/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-cormorant italic text-[#C69C6D] text-lg md:text-xl tracking-widest block mb-2">
            Guest Testimonials
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold tracking-wide text-[#FFF8F0]">
            Stories from Our Guests
          </h2>
          <div className="h-[1px] bg-[#C69C6D]/30 w-16 mx-auto mt-6" />
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex items-center justify-center min-h-[350px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl backdrop-blur-md bg-white/5 border border-[#C69C6D]/20 rounded-3xl p-8 md:p-12 shadow-[0_15px_35px_rgba(0,0,0,0.2)] text-center flex flex-col items-center justify-between"
            >
              {/* Customer Photo */}
              <div className="relative w-20 h-20 rounded-full border-2 border-[#C69C6D] overflow-hidden mb-6 bg-[#4A2C2A]/20">
                <Image
                  src={currentReview.avatar}
                  alt={currentReview.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 text-[#C69C6D]">
                {Array.from({ length: currentReview.rating }).map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 drop-shadow-[0_2px_4px_rgba(198,156,109,0.2)]"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>

              {/* Quote Text */}
              <p className="font-poppins text-sm md:text-base font-light italic leading-relaxed text-[#FFF8F0]/90 mb-8 max-w-xl">
                &ldquo;{currentReview.text}&rdquo;
              </p>

              {/* Author Info */}
              <div>
                <h4 className="font-playfair text-lg font-bold text-[#FFF8F0] tracking-wide mb-1">
                  {currentReview.name}
                </h4>
                <p className="font-poppins text-[11px] uppercase tracking-wider text-[#C69C6D]">
                  {currentReview.location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 lg:-left-20 bg-[#C69C6D]/10 hover:bg-[#C69C6D]/20 border border-[#C69C6D]/20 w-12 h-12 rounded-full flex items-center justify-center text-[#FFF8F0] active:scale-95 transition-all duration-300 hidden md:flex cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-5 h-5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 lg:-right-20 bg-[#C69C6D]/10 hover:bg-[#C69C6D]/20 border border-[#C69C6D]/20 w-12 h-12 rounded-full flex items-center justify-center text-[#FFF8F0] active:scale-95 transition-all duration-300 hidden md:flex cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-5 h-5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Carousel Pagination dots */}
        <div className="flex justify-center gap-3 mt-10">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                index === i ? 'w-8 bg-[#C69C6D]' : 'w-2 bg-[#FFF8F0]/30 hover:bg-[#FFF8F0]/50'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
