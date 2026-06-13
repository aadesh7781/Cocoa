'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type CategoryKey = 'coffee' | 'desserts' | 'snacks' | 'cold-beverages';

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: 'coffee', label: 'Coffee' },
  { key: 'desserts', label: 'Desserts' },
  { key: 'snacks', label: 'Snacks' },
  { key: 'cold-beverages', label: 'Cold Beverages' }
];

const MENU_DATA = {
  coffee: [
    {
      name: 'Pour Over Coffee',
      price: '$6.50',
      description: 'Light-roast Ethiopian Yirgacheffe, meticulously brewed using a ceramic V60 dripper for bright notes of jasmine.',
      image: '/sellers/menu_coffee.png'
    },
    {
      name: 'Hazelnut Latte',
      price: '$6.50',
      description: 'Double shot espresso combined with textured oat milk, flavored with house-made roasted hazelnut syrup.',
      image: '/sellers/hazelnut_latte.png'
    },
    {
      name: 'Classic Cappuccino',
      price: '$6.00',
      description: 'Perfect espresso pull with velvety steamed milk and rosetta art.',
      image: '/sellers/classic_cappuccino.png'
    }
  ],
  desserts: [
    {
      name: 'Pull Me Up Cake',
      price: '$18.00',
      description: 'Decadent chocolate sponge surrounded by a transparent collar, pulled up tableside to release cascading hot ganache.',
      image: '/sellers/pull_me_up_cake.png'
    },
    {
      name: 'Belgian Chocolate Brownie',
      price: '$8.50',
      description: 'Warm fudgy brownie, loaded with 70% dark Belgian chocolate chunks and served with a pinch of sea salt.',
      image: '/sellers/belgian_brownie.png'
    },
    {
      name: 'Red Velvet Pastry',
      price: '$9.00',
      description: 'Light, cocoa-infused red velvet cake layers, layered and frosted with a rich, tangy cream cheese icing.',
      image: '/sellers/red_velvet_pastry.png'
    }
  ],
  snacks: [
    {
      name: 'Truffle Cheese Toastie',
      price: '$12.50',
      description: 'Artisanal sourdough loaded with aged Gruyère, Fontina cheese, and a drizzle of white truffle oil, pressed golden brown.',
      image: '/sellers/pull_me_up_cake.png'
    },
    {
      name: 'Almond Croissant',
      price: '$6.50',
      description: 'Double-baked buttery croissant filled with premium almond frangipane and topped with toasted sliced almonds.',
      image: '/sellers/belgian_brownie.png'
    }
  ],
  'cold-beverages': [
    {
      name: 'Iced Spanish Latte',
      price: '$7.00',
      description: 'Chilled espresso combined with cold whole milk and sweetened condensed milk, served over crushed ice.',
      image: '/sellers/hazelnut_latte.png'
    },
    {
      name: 'Choco Mint Frappé',
      price: '$8.00',
      description: 'Rich dark chocolate flakes blended with fresh garden mint leaves, milk, and ice, topped with cocoa powder.',
      image: '/sellers/classic_cappuccino.png'
    }
  ]
};

export default function InteractiveMenu() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('coffee');

  return (
    <section 
      id="menu-section" 
      className="bg-[#FFF8F0] text-[#2B1810] py-24 px-6 md:px-12 relative"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1000px' }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-cormorant italic text-[#C69C6D] text-lg md:text-xl tracking-widest block mb-2">
            Epicurean Selection
          </span >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold tracking-wide text-[#2B1810]">
            The Interactive Menu
          </h2>
          <div className="h-[1px] bg-[#C69C6D]/40 w-20 mx-auto mt-6" />
        </div>

        {/* Sliding Tabs */}
        <div className="flex justify-center mb-16 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex bg-[#F5E8D3]/40 p-1.5 rounded-full border border-[#C69C6D]/20 gap-1 min-w-[320px] md:min-w-[450px]">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`relative flex-1 py-3 px-4 rounded-full text-center text-xs md:text-sm font-poppins tracking-wider uppercase transition-colors duration-300 select-none cursor-pointer focus:outline-none ${
                    isActive ? 'text-[#FFF8F0] font-medium' : 'text-[#2B1810]/70 hover:text-[#2B1810]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute inset-0 bg-[#4A2C2A] rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area with Crossfade */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            >
              {MENU_DATA[activeCategory].map((item, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col sm:flex-row items-start gap-6 p-6 rounded-2xl hover:bg-[#F5E8D3]/20 transition-all duration-500 border border-transparent hover:border-[#C69C6D]/15"
                >
                  {/* Square Image container */}
                  <div className="relative w-full sm:w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-[#4A2C2A]/5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 128px"
                      className="object-cover"
                    />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 flex flex-col justify-between h-full min-h-[120px]">
                    <div>
                      <div className="flex justify-between items-baseline gap-4 mb-2">
                        <h3 className="font-playfair text-xl font-bold tracking-wide text-[#2B1810]">
                          {item.name}
                        </h3>
                        <span className="font-inter font-medium text-sm text-[#C69C6D] whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                      <p className="font-poppins text-xs font-light text-[#2B1810]/70 tracking-wide leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 cursor-pointer text-[#C69C6D] hover:text-[#4A2C2A] transition-colors duration-300">
                      <span className="font-poppins text-[10px] uppercase tracking-wider font-semibold">
                        Add to Order
                      </span>
                      <svg 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="w-3.5 h-3.5"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
