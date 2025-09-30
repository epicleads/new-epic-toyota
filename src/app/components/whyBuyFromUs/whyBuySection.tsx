"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, MapPin, Award, HeartHandshake, ChevronLeft, ChevronRight } from "lucide-react";

export default function WhyBuySection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  const usps = [
    {
      title: "Extended Warranty",
      description:
        "Drive worry-free with Toyota's industry-leading extended warranty options for lasting peace of mind.",
      icon: ShieldCheck,
    },
    {
      title: "Multiple Outlets",
      description:
        "With 6+ outlets across Hyderabad, Epic Toyota is always nearby for sales, service, and support.",
      icon: MapPin,
    },
    {
      title: "Raam Group Trust",
      description:
        "Backed by decades of Raam Group excellence, delivering unmatched credibility and customer-first values.",
      icon: Award,
    },
    {
      title: "Toyota Protect",
      description:
        "Comprehensive insurance and protection plans designed exclusively for Toyota owners.",
      icon: HeartHandshake,
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % usps.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [mounted, usps.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % usps.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + usps.length) % usps.length);
  };

  if (!mounted) {
    return (
      <section className="w-full bg-white py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse bg-gray-200 h-12 w-96 mx-auto rounded-lg mb-4"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-64 mx-auto rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-16 md:py-20 relative overflow-hidden font-manrope">
      {/* Toyota-inspired background elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-20 w-32 h-32 border border-red-600 rounded-full"></div>
        <div className="absolute top-32 right-24 w-20 h-20 border border-red-500 rotate-45"></div>
        <div className="absolute bottom-24 left-1/4 w-24 h-24 border border-red-600 rounded-lg rotate-12"></div>
        <div className="absolute bottom-16 right-16 w-28 h-28 border border-red-500"></div>
      </div>

      {/* Subtle accent lines - Toyota style */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading - Toyota OEM Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block relative mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-2 tracking-tight font-manrope">
              WHY CHOOSE <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">EPIC TOYOTA</span>
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-red-400 to-red-500 rounded-full"></div>
          </div>
          <p className="text-lg md:text-xl text-black max-w-3xl mx-auto leading-relaxed font-manrope">
            Beyond exceptional vehicles, we deliver unmatched trust, convenience, and 
            premium Toyota care that exceeds every expectation
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {usps.map((usp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-6 lg:p-8 text-center border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon Container - Toyota style */}
              <div className="relative z-10 mb-6">
                <div className="flex justify-center items-center w-16 h-16 mx-auto bg-gradient-to-br from-red-600/10 to-red-500/5 text-red-600 rounded-xl border border-red-200 group-hover:scale-110 group-hover:border-red-300 transition-all duration-300 shadow-sm">
                  <usp.icon className="w-7 h-7" />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-black mb-4 group-hover:text-red-600 transition-colors duration-300 font-manrope">
                  {usp.title}
                </h3>
                <p className="text-black text-sm leading-relaxed group-hover:text-red-600 transition-colors duration-300 font-manrope">
                  {usp.description}
                </p>
              </div>

              {/* Toyota-inspired corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <div className="w-full h-full border-t-2 border-r-2 border-red-600"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden mb-16">
          <div className="relative">
            {/* Slider Container */}
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-white rounded-2xl p-6 sm:p-8 text-center border border-gray-200 shadow-lg min-h-[280px] flex flex-col justify-center relative overflow-hidden"
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent"></div>
                  
                  {/* Icon Container */}
                  <div className="relative z-10 mb-6">
                    <div className="flex justify-center items-center w-20 h-20 mx-auto bg-gradient-to-br from-red-600/10 to-red-500/5 text-red-600 rounded-2xl border border-red-200 shadow-sm">
                      {(() => {
                        const IconComponent = usps[currentSlide].icon;
                        return <IconComponent className="w-8 h-8" />;
                      })()}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-black mb-4 font-manrope">
                      {usps[currentSlide].title}
                    </h3>
                    <p className="text-black leading-relaxed font-manrope text-base">
                      {usps[currentSlide].description}
                    </p>
                  </div>

                  {/* Toyota corner accent */}
                  <div className="absolute top-4 right-4 w-10 h-10 opacity-10">
                    <div className="w-full h-full border-t-2 border-r-2 border-red-600"></div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center hover:border-red-300 hover:bg-red-50 transition-all duration-300 shadow-md z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-red-600 transition-colors" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center hover:border-red-300 hover:bg-red-50 transition-all duration-300 shadow-md z-20"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 hover:text-red-600 transition-colors" />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {usps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-red-600 to-red-500 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400 w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}