'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroCanvasProps {
  onLoaded: () => void;
}

export default function HeroCanvas({ onLoaded }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const frameCount = 40;
  const getFrameUrl = (i: number) =>
    `/sequence/frame_${i.toString().padStart(4, '0')}.jpg`;

  /* ── 1. Preload all frames ───────────────────────────────────────── */
  useEffect(() => {
    let loaded = 0;
    const arr: HTMLImageElement[] = [];

    const onDone = () => {
      loaded++;
      if (loaded === 10) onLoaded();
      if (loaded === frameCount) setImagesLoaded(true);
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = onDone;
      img.onerror = onDone;
      img.src = getFrameUrl(i);
      arr.push(img);
    }
    imagesRef.current = arr;
  }, [onLoaded]);

  /* ── 2. GSAP scroll-scrub ───────────────────────────────────────── */
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* Cover-fit draw */
    const drawFrame = (frameIndex: number) => {
      const img = imagesRef.current[Math.round(frameIndex)];
      if (!img?.complete || !img.naturalWidth) return;

      const ir = img.naturalWidth / img.naturalHeight;
      const cr = canvas.width / canvas.height;
      let dw = canvas.width, dh = canvas.height, ox = 0, oy = 0;

      if (ir > cr) { dw = canvas.height * ir; ox = (canvas.width - dw) / 2; }
      else { dh = canvas.width / ir; oy = (canvas.height - dh) / 2; }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, ox, oy, dw, dh);
    };

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(frameObj.frame);
    };

    const frameObj = { frame: 0 };
    window.addEventListener('resize', setSize);
    setSize();
    drawFrame(0); // show first frame immediately, no blank canvas

    const ctx2 = gsap.context(() => {
      /* ── Frame scrub across full 500vh ── */
      gsap.to(frameObj, {
        frame: frameCount - 1,
        ease: 'none',
        onUpdate: () => drawFrame(frameObj.frame),
        scrollTrigger: {
          scroller: document.body,          // matches scrollerProxy target
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,                         // 1 s lag = smooth but responsive
        },
      });

      /* ── Overlay fades out first 20% of scroll ── */
      gsap.to(overlayRef.current, {
        opacity: 0,
        y: -50,
        ease: 'power2.inOut',
        scrollTrigger: {
          scroller: document.body,
          trigger: containerRef.current,
          start: 'top top',
          end: '20% top',
          scrub: true,
        },
      });

      /* ── Background goes dark chocolate 35-65% ── */
      gsap.to(containerRef.current, {
        backgroundColor: '#1a0a00',
        ease: 'none',
        scrollTrigger: {
          scroller: document.body,
          trigger: containerRef.current,
          start: '35% top',
          end: '65% top',
          scrub: true,
        },
      });
    }, containerRef);

    // Refresh after setup so positions are recalculated with Lenis in place
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('resize', setSize);
      ctx2.revert();
    };
  }, [imagesLoaded]);

  return (
    /* Tall scroll track – NO overflow-hidden, so sticky works correctly */
    <div
      ref={containerRef}
      style={{ height: '500vh', backgroundColor: '#F5E8D3' }}
      className="relative w-full"
    >
      {/* Sticky panel – stays in viewport while parent scrolls */}
      <div className="sticky top-0 w-full h-screen">

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: 'contents', display: 'block' }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none z-10" />

        {/* Overlay text – fades out on first scroll */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 select-none pointer-events-none"
        >
          <h2 className="font-playfair text-[#FFF8F0] text-7xl md:text-9xl font-bold tracking-[0.2em] mb-4">
            COCOA
          </h2>
          <p className="font-cormorant italic text-[#C69C6D] text-2xl md:text-3xl tracking-widest mb-10 max-w-xl">
            Luxury Coffee & Artisan Desserts
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 pointer-events-auto">
            <button
              onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 border border-[#C69C6D] bg-transparent text-[#FFF8F0] font-poppins text-sm tracking-wider uppercase rounded-full hover:bg-[#C69C6D] hover:text-[#2B1810] active:scale-95 transition-all duration-300 w-52 sm:w-auto font-medium"
            >
              Explore Menu
            </button>
            <button
              onClick={() => document.getElementById('delivery-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 border border-[#C69C6D] bg-[#C69C6D] text-[#2B1810] font-poppins text-sm tracking-wider uppercase rounded-full hover:bg-transparent hover:text-[#FFF8F0] active:scale-95 transition-all duration-300 w-52 sm:w-auto font-medium"
            >
              Order Online
            </button>
            <button
              onClick={() => document.getElementById('location-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 border border-[#C69C6D] bg-transparent text-[#FFF8F0] font-poppins text-sm tracking-wider uppercase rounded-full hover:bg-[#C69C6D] hover:text-[#2B1810] active:scale-95 transition-all duration-300 w-52 sm:w-auto font-medium"
            >
              Book A Table
            </button>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#FFF8F0]/80">
            <span className="font-poppins text-[10px] uppercase tracking-[0.3em] font-light">Scroll to Brew</span>
            <ArrowDown className="w-5 h-5 animate-bounce text-[#C69C6D]" />
          </div>
        </div>
      </div>
    </div>
  );
}
