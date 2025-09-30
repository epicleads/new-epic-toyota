"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ContactForm from "../contactForm";

export default function ServicesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const services = [
    {
      title: "Book a Test Drive",
      description:
        "Experience Toyota's performance firsthand with a personalized test drive. Feel the quality, comfort, and innovation before you decide.",
      image: "/assets/toyota-models/testDrive.png",
    },
    {
      title: "Buy New Car",
      description:
        "Explore the latest Toyota lineup with transparent pricing, exclusive offers, and expert consultation tailored to your needs.",
      image: "/assets/toyota-models/toyota-newCar.png",
    },
    {
      title: "Book a Service",
      description:
        "Keep your Toyota running like new with our state-of-the-art service centers, certified technicians, and genuine Toyota parts.",
      image: "/assets/toyota-models/toyota-service.png",
    },
    {
      title: "Utrust",
      description:
        "Upgrade your Toyota effortlessly with our hassle-free exchange programs and fair valuation on your existing car.",
      image: "/assets/toyota-models/toyota-utrust.png",
    },
  ];

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto-slide for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, services.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section className="w-full bg-gradient-to-br from-white via-gray-50 to-white text-gray-900 py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
      {/* Premium geometric background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-10 w-32 sm:w-40 h-32 sm:h-40 border-2 border-red-500 rotate-45 rounded-lg"></div>
        <div className="absolute top-40 right-10 sm:right-20 w-20 sm:w-24 h-20 sm:h-24 border border-red-400 rotate-12 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-28 sm:w-32 h-28 sm:h-32 border border-red-500 rotate-45 rounded-lg"></div>
        <div className="absolute bottom-20 right-10 w-24 sm:w-28 h-24 sm:h-28 border border-red-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-red-300/30 rounded-full"></div>
      </div>

      {/* Subtle gradient accent lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent"></div>
      
      {/* Futuristic glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <div className="inline-block relative mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 uppercase tracking-tight">
              OUR <span className="text-red-600">SERVICES</span>
            </h2>
            {/* Futuristic underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-px bg-gradient-to-r from-red-300 to-red-400 rounded-full"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Experience Toyota excellence through our comprehensive range of premium services
            designed for your complete automotive journey
          </p>
        </motion.div>

        {/* Desktop & Tablet Grid View - 4 cards in a row */}
        <div className="hidden sm:grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/50 hover:border-red-300/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-red-500/10 w-full max-w-[320px] flex flex-col"
            >
              {/* Image Section - square aspect ratio for 1080x1080 images */}
              <div className="relative w-full aspect-square overflow-hidden flex items-center justify-center bg-white">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-contain p-2 sm:p-3 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />

                {/* Premium badge */}
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Premium</span>
                </div>
              </div>

              {/* Content - flexible height with minimum space */}
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-3 mt-auto">
                  {/* Contextual CTA per service */}
                  <button
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
                    onClick={() => setShowForm(true)}
                  >
                    {service.title.toLowerCase().includes('test drive') ? 'Book Test Drive'
                      : service.title.toLowerCase().includes('buy') ? 'Buy Now'
                      : service.title.toLowerCase().includes('service') ? 'Book Service'
                      : 'Upgrade Now'}
                  </button>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Optimized Touch-Friendly Cards */}
        <div className="sm:hidden">
          <div className="relative px-2">
            {/* Swipe indicator */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full">
                <span className="text-xs text-gray-600 font-medium">Swipe to explore</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl">
              <motion.div
                className="flex transition-transform duration-500 ease-out touch-pan-x"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                drag="x"
                dragConstraints={{ left: -((services.length - 1) * 100), right: 0 }}
                onDragEnd={(_, info) => {
                  const offset = info.offset.x;
                  const velocity = info.velocity.x;
                  
                  if (offset > 50 || velocity > 500) {
                    prevSlide();
                  } else if (offset < -50 || velocity < -500) {
                    nextSlide();
                  }
                }}
              >
                {services.map((service, idx) => (
                  <motion.div 
                    key={idx} 
                    className="w-full flex-shrink-0 px-2"
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/50 shadow-xl w-full max-w-[400px] mx-auto">
                      {/* Image Section - square aspect ratio */}
                      <div className="relative w-full aspect-square overflow-hidden flex items-center justify-center bg-white">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-contain p-4"
                          sizes="100vw"
                          priority={idx === 0}
                        />

                        {/* Premium badge */}
                        <div className="absolute bottom-4 left-4 px-5 py-2 bg-red-600 rounded-lg shadow-md">
                          <span className="text-sm font-bold text-white uppercase tracking-wide">Premium Service</span>
                        </div>

                        {/* Progress indicator */}
                        <div className="absolute top-4 left-4 text-white bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-xs font-medium">{idx + 1} / {services.length}</span>
                        </div>
                      </div>

                      {/* Content - matching height with image */}
                      <div className="p-6 h-80 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-base flex-1">
                            {service.description}
                          </p>
                        </div>
                        
                        <div className="space-y-4 mt-4">
                          {/* Touch-friendly contextual CTA */}
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg active:shadow-xl"
                            onClick={() => setShowForm(true)}
                          >
                            {service.title.toLowerCase().includes('test drive') ? 'Book Test Drive'
                              : service.title.toLowerCase().includes('buy') ? 'Buy Now'
                              : service.title.toLowerCase().includes('service') ? 'Book Service'
                              : 'Upgrade Now'}
                          </motion.button>

                          {/* Futuristic progress bar */}
                          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                              initial={{ width: "0%" }}
                              animate={{ width: idx === currentSlide ? "100%" : "0%" }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>


            {/* Modern Slide Indicators */}
            <div className="flex justify-center mt-8 gap-3">
              {services.map((_, idx) => (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 ${
                    idx === currentSlide 
                      ? 'w-8 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full' 
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        
      </div>

      {/* Enhanced Contact Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative max-w-lg w-full"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowForm(false)}
              className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl flex items-center justify-center z-10 transition-all duration-300 shadow-lg"
            >
              ✕
            </motion.button>
            <ContactForm buttonLabel="Get Started Today" />
          </motion.div>
        </div>
      )}
    </section>
  );
}