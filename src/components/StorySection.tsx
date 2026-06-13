'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STORY_BLOCKS = [
  {
    category: 'Craftsmanship',
    title: 'Artisanal Tempering & Shaping',
    text: 'Every single piece of our chocolate undergoes a careful tempering process, monitored at exact temperatures to ensure a flawless gloss and a crisp, satisfying snap. We sculpt and paint each batch by hand, creating edible masterpieces.',
    image: '/sellers/pull_me_up_cake.png',
  },
  {
    category: 'Premium Ingredients',
    title: 'Single-Origin Criollo Beans',
    text: 'We source our cocoa beans directly from family-owned estates in Madagascar and Ecuador. Selecting exclusively Criollo and Trinitario varieties, we bring out complex notes of red berries, oak, and wild honey in every bar.',
    image: '/sellers/belgian_brownie.png',
  },
  {
    category: 'Handmade Desserts',
    title: 'Pastries Crafted with Passion',
    text: 'Our master pastry chefs prepare each dessert fresh every morning. Combining classical French baking techniques with contemporary presentation, we create textures that delight and flavors that tell a story.',
    image: '/sellers/red_velvet_pastry.png',
  },
  {
    category: 'Coffee Sourcing',
    title: 'Ethically Sourced Micro-Lots',
    text: 'Our coffee represents the dedication of micro-lot farmers across the global coffee belt. Roasted locally in small batches, our beans retain their natural brightness and distinct origin characteristics.',
    image: '/sellers/menu_coffee.png',
  }
];

function StoryRow({ block, index }: { block: typeof STORY_BLOCKS[0]; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !imgRef.current || !rowRef.current) return;

    let ctx = gsap.context(() => {
      // Parallax effect: translate Y offset from -40px to 40px tied to scroll progress
      gsap.fromTo(imgRef.current,
        { y: -45 },
        {
          y: 45,
          ease: 'none',
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.2
          }
        }
      );
    }, rowRef);

    return () => ctx.revert();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={rowRef}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 py-20 border-b border-[#C69C6D]/20 last:border-0`}
    >
      {/* Image Container with Parallax clipping */}
      <div 
        ref={imgWrapperRef} 
        className="w-full lg:w-1/2 aspect-video lg:aspect-[4/3] relative rounded-2xl overflow-hidden bg-[#4A2C2A]/5"
      >
        <div 
          ref={imgRef} 
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <Image
            src={block.image}
            alt={block.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover scale-105"
          />
        </div>
        {/* Soft elegant shadow overlay */}
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Editorial Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-2">
        <span className="font-poppins text-xs font-semibold text-[#C69C6D] uppercase tracking-[0.3em] mb-3">
          {block.category}
        </span>
        <h3 className="font-cormorant italic text-3xl md:text-4xl font-light text-[#2B1810] mb-6 leading-tight">
          {block.title}
        </h3>
        <p className="font-poppins text-sm font-light text-[#2B1810]/75 tracking-wide leading-relaxed max-w-xl">
          {block.text}
        </p>
      </div>
    </div>
  );
}

export default function StorySection() {
  return (
    <section 
      id="story-section" 
      className="bg-[#FFF8F0] text-[#2B1810] py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1200px' }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-20">
          <span className="font-cormorant italic text-[#C69C6D] text-xl tracking-widest block mb-4">
            Our Philosophy
          </span>
          <h2 className="font-playfair text-4xl md:text-6xl font-bold tracking-wide leading-tight text-[#2B1810]">
            The Art Of Chocolate & Story of Brewing
          </h2>
          <div className="w-24 h-[1px] bg-[#C69C6D] mt-8" />
        </div>

        {/* Story Blocks */}
        <div className="flex flex-col">
          {STORY_BLOCKS.map((block, idx) => (
            <StoryRow key={idx} block={block} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
