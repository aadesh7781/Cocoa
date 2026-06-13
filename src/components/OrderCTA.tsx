'use client';

export default function OrderCTA() {
  return (
    <section 
      id="delivery-section" 
      className="bg-[#2B1810] text-[#FFF8F0] py-24 px-6 md:px-12 relative overflow-hidden z-20 border-t border-[#C69C6D]/20"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}
    >
      {/* Background soft gold glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#C69C6D]/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Subhead */}
        <span className="font-cormorant italic text-[#C69C6D] text-lg md:text-xl tracking-widest block mb-3 animate-fade-in">
          Indulgence Delivered
        </span>

        {/* Heading */}
        <h2 className="font-playfair text-4xl md:text-6xl font-bold tracking-wide text-[#FFF8F0] mb-6 leading-tight">
          Enjoy COCOA Anywhere
        </h2>

        {/* Description */}
        <p className="font-poppins text-xs md:text-sm font-light text-[#FFF8F0]/70 max-w-lg mx-auto tracking-widest uppercase leading-relaxed mb-12">
          Bring the premium café experience into the comfort of your home. Freshly brewed coffee and handmade desserts, delivered directly to your doorstep.
        </p>

        {/* Buttons Grid */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          
          {/* Swiggy Button */}
          <a
            href="https://www.swiggy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-10 py-4.5 border border-[#C69C6D]/60 hover:border-[#C69C6D] bg-transparent hover:bg-white/5 rounded-full text-[#FFF8F0] font-poppins text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 w-64 sm:w-auto hover:shadow-[0_0_25px_rgba(198,156,109,0.35)] active:scale-95 group cursor-pointer"
          >
            {/* Swiggy Brand Color Accent Icon */}
            <span className="w-2.5 h-2.5 rounded-full bg-[#FC8019] group-hover:scale-125 transition-transform duration-300" />
            <span>Order on Swiggy</span>
          </a>

          {/* Zomato Button */}
          <a
            href="https://www.zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-10 py-4.5 border border-[#C69C6D]/60 hover:border-[#C69C6D] bg-transparent hover:bg-white/5 rounded-full text-[#FFF8F0] font-poppins text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 w-64 sm:w-auto hover:shadow-[0_0_25px_rgba(198,156,109,0.35)] active:scale-95 group cursor-pointer"
          >
            {/* Zomato Brand Color Accent Icon */}
            <span className="w-2.5 h-2.5 rounded-full bg-[#CB202D] group-hover:scale-125 transition-transform duration-300" />
            <span>Order on Zomato</span>
          </a>

        </div>

      </div>
    </section>
  );
}
