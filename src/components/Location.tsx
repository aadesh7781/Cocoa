'use client';

import { Phone, MapPin, Clock, Car } from 'lucide-react';

export default function Location() {
  return (
    <section 
      id="location-section" 
      className="relative w-full h-[600px] md:h-[650px] bg-[#FFF8F0] overflow-hidden"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 650px' }}
    >
      {/* Map Background with Dark/Luxury Filter */}
      <div className="absolute inset-0 w-full h-full z-0 select-none">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9268393566113!2d77.63870631534433!3d12.976450918305086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a75f1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1655180000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ 
            border: 0, 
            filter: 'grayscale(1) invert(0.92) contrast(1.1) brightness(0.85) hue-rotate(15deg)' 
          }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="COCOA Indiranagar Map"
        />
      </div>

      {/* Floating Info Overlay Panel */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-start px-6 md:px-16 pointer-events-none z-10">
        <div className="w-full max-w-md backdrop-blur-lg bg-[#2B1810]/90 border border-[#C69C6D]/30 rounded-3xl p-8 md:p-10 shadow-2xl text-[#FFF8F0] pointer-events-auto flex flex-col gap-6">
          
          <div>
            <span className="font-cormorant italic text-[#C69C6D] text-lg tracking-wider block mb-1">
              Visit Our Atelier
            </span>
            <h3 className="font-playfair text-3xl font-bold tracking-wide text-[#FFF8F0]">
              COCOA — Indiranagar
            </h3>
            <div className="h-[1px] bg-[#C69C6D]/30 w-12 mt-4" />
          </div>

          {/* Address */}
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-[#C69C6D] mt-1 flex-shrink-0" />
            <div>
              <p className="font-poppins text-xs font-semibold uppercase tracking-wider text-[#C69C6D] mb-1">Address</p>
              <p className="font-poppins text-sm font-light text-[#FFF8F0]/80 leading-relaxed">
                80 Feet Rd, Hal 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038
              </p>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="flex items-start gap-4">
            <Clock className="w-5 h-5 text-[#C69C6D] mt-1 flex-shrink-0" />
            <div className="w-full">
              <p className="font-poppins text-xs font-semibold uppercase tracking-wider text-[#C69C6D] mb-1">Opening Hours</p>
              <table className="w-full font-poppins text-xs font-light text-[#FFF8F0]/80">
                <tbody>
                  <tr className="border-b border-[#FFF8F0]/10 py-1 block">
                    <td className="w-32 font-medium">Mon - Thu</td>
                    <td>8:00 AM - 10:00 PM</td>
                  </tr>
                  <tr className="py-1 block">
                    <td className="w-32 font-medium">Fri - Sun</td>
                    <td>8:00 AM - 11:30 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-[#C69C6D] mt-1 flex-shrink-0" />
            <div>
              <p className="font-poppins text-xs font-semibold uppercase tracking-wider text-[#C69C6D] mb-0.5">Contact</p>
              <a 
                href="tel:+919876543210" 
                className="font-poppins text-sm text-[#FFF8F0] hover:text-[#C69C6D] transition-colors duration-300 font-medium"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* Parking Details */}
          <div className="flex items-start gap-4">
            <Car className="w-5 h-5 text-[#C69C6D] mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-poppins text-xs font-light text-[#FFF8F0]/80 leading-relaxed">
                Complimentary Valet Parking available on weekends.
              </p>
            </div>
          </div>

          {/* Get Directions Button */}
          <a
            href="https://maps.google.com/?q=80+Feet+Rd,+HAL+2nd+Stage,+Indiranagar,+Bengaluru,+Karnataka+560038"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block w-full text-center py-4 bg-[#C69C6D] hover:bg-[#FFF8F0] text-[#2B1810] font-poppins text-xs uppercase tracking-[0.2em] font-semibold rounded-full active:scale-98 transition-all duration-300 shadow-lg"
          >
            Get Directions
          </a>

        </div>
      </div>
    </section>
  );
}
