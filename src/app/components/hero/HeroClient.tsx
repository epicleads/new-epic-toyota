'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import LeadForm from '../LeadForm';

interface BannerData {
  desktop_image: string;
  mobile_image: string;
  cta_text: string;
  cta_link: string;
  title?: string;
  subtitle?: string;
  isFromBackend: boolean;
}

interface HeroClientProps {
  bannerData: BannerData;
}

export default function HeroClient({ bannerData }: HeroClientProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showLeadForm, setShowLeadForm] = useState(false);


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentImage = isMobile ? bannerData.mobile_image : bannerData.desktop_image;

  return (
    <section className="relative h-screen overflow-hidden bg-white pt-16">
     

      {/* Rest of your component remains the same... */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(220, 38, 38, 0.3) 0%, 
            rgba(0, 0, 0, 0.8) 50%, 
            rgba(0, 0, 0, 1) 100%)`,
        }}
      />

      {/* Hero Banner Image */}
      <div className="absolute inset-0">
        <Image
          src={currentImage}
          alt={bannerData.cta_text}
          fill
          className={`object-cover transition-all duration-700 ${
            isLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => console.error('Image failed to load:', currentImage, e)}
          priority
          sizes="100vw"
        />
        
        {/* Premium Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      </div>

     

      {/* Main Content - Only show title/subtitle if they exist */}
      {(bannerData.title || bannerData.subtitle) && (
        <div className="relative z-20 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            {/* Main Heading - Only show if title exists */}
            {bannerData.title && (
              <h1 className={`text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 transition-all duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  {bannerData.title}
                </span>
                {bannerData.isFromBackend && bannerData.subtitle && (
                  <span className="block text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent mt-2">
                    {bannerData.subtitle}
                  </span>
                )}
              </h1>
            )}

            {/* Subtitle - Only show if subtitle exists and not from backend */}
            {!bannerData.isFromBackend && bannerData.subtitle && (
              <p className={`text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 transition-all duration-1000 delay-300 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                {bannerData.subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* CTA Button - Positioned at bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className={`transition-all duration-1000 delay-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <button
            type="button"
            onClick={() => setShowLeadForm(true)}
            className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-base rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/20 border border-red-500/30 whitespace-nowrap"
          >
            <span className="mr-2">{bannerData.cta_text}</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

     

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>

      {/* Lead Form Modal via portal */}
      {showLeadForm && typeof document !== 'undefined'
        ? createPortal(
            (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-[20000] flex items-center justify-center p-4"
                  style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }}
                  onClick={() => setShowLeadForm(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative max-w-lg w-full"
                  >
                    <button
                      onClick={() => setShowLeadForm(false)}
                      className="absolute -top-4 -right-4 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-all duration-200 shadow-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <LeadForm buttonLabel="Book Test Drive" onSuccess={() => setShowLeadForm(false)} />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            ),
            document.body
          )
        : null}
    </section>
  );
}