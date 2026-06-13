'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const BEST_SELLERS = [
  {
    id: 'pull-me-up-cake',
    name: 'Pull Me Up Cake',
    price: '$18.00',
    image: '/sellers/pull_me_up_cake.png',
    description: 'Decadent chocolate cake enveloped in a rich cascading ganache.'
  },
  {
    id: 'belgian-brownie',
    name: 'Belgian Brownie',
    price: '$8.50',
    image: '/sellers/belgian_brownie.png',
    description: 'Intensely fudgy brownie crafted with single-origin Belgian chocolate.'
  },
  {
    id: 'classic-cappuccino',
    name: 'Classic Cappuccino',
    price: '$6.00',
    image: '/sellers/classic_cappuccino.png',
    description: 'Perfect espresso pull with velvety steamed milk and rosetta art.'
  },
  {
    id: 'hazelnut-latte',
    name: 'Hazelnut Latte',
    price: '$6.50',
    image: '/sellers/hazelnut_latte.png',
    description: 'Creamy latte infused with roasted hazelnut syrup and cocoa dusting.'
  },
  {
    id: 'red-velvet-pastry',
    name: 'Red Velvet Pastry',
    price: '$9.00',
    image: '/sellers/red_velvet_pastry.png',
    description: 'Crimson cocoa layers stacked with smooth, rich cream cheese frosting.'
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const // premium cubic-bezier ease out
    }
  }
};

export default function BestSellers() {
  return (
    <section 
      id="best-sellers-section" 
      className="relative bg-[#2B1810] text-[#FFF8F0] py-24 px-6 md:px-12 overflow-hidden z-20"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}
    >
      {/* Background Gold Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#C69C6D]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#FFF8F0]/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="font-cormorant italic text-[#C69C6D] text-lg md:text-xl tracking-widest block mb-2"
          >
            Curated Classics
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl font-bold tracking-wide text-[#FFF8F0] mb-4"
          >
            Our Best Sellers
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[1px] bg-[#C69C6D] mx-auto mt-6"
          />
        </div>

        {/* Staggered Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-150px' }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 justify-center"
        >
          {BEST_SELLERS.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              className="group relative flex flex-col justify-between backdrop-blur-md bg-white/5 border border-[#C69C6D]/20 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:border-[#C69C6D]/40 hover:shadow-[0_15px_30px_rgba(198,156,109,0.25)]"
            >
              <div>
                {/* 4:5 Aspect Ratio Image container */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden mb-5 bg-[#4A2C2A]/20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority={item.id === 'pull-me-up-cake'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B1810]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Name */}
                <h3 className="font-playfair text-xl font-medium tracking-wide text-[#FFF8F0] mb-2 group-hover:text-[#C69C6D] transition-colors duration-300">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="font-poppins text-xs font-light text-[#FFF8F0]/70 tracking-wide leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between border-t border-[#FFF8F0]/10 pt-4 mt-auto">
                <span className="font-inter font-medium text-sm text-[#C69C6D] tracking-wider">
                  {item.price}
                </span>
                <span className="font-poppins text-[10px] uppercase tracking-[0.2em] font-medium text-[#FFF8F0]/50 group-hover:text-[#FFF8F0] transition-colors duration-300 cursor-pointer">
                  Order Now
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
