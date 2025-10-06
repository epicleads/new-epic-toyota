"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import LeadForm from "./LeadForm";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement | null>(null);

  // Navigation items for single page sections
  const navItems = [
    { title: "Models", href: "#models", sectionId: "models" },
    { title: "Our Locations", href: "#locations", sectionId: "locations" },
    { title: "Our Services", href: "#services", sectionId: "services" },
    { title: "About Us", href: "#about", sectionId: "about" },
    { title: "Contact Us", href: "#contact", sectionId: "contact" }
  ];

  // Function to check if nav item is active
  const isNavItemActive = (sectionId: string) => {
    return activeSection === sectionId;
  };

  // Smooth scroll to section
  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }, []);

  // Mouse tracking for premium effects
  const handleMouseMove = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  // Enhanced scroll handling with section detection
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Always show header when at top
    if (currentScrollY < 50) {
      setIsHeaderVisible(true);
    } else if (currentScrollY > 100) {
      // Hide/show based on scroll direction
      if (currentScrollY < lastScrollY.current) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsHeaderVisible(false);
      }
    }

    // Detect active section
    const sections = ['hero', 'offers', 'about', 'services', 'testimonials', 'models', 'why-choose', 'locations', 'contact'];
    const offset = 100; // Offset for header height

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= offset) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }

    setScrollY(currentScrollY);
    lastScrollY.current = currentScrollY;
  }, []);

  // Book Test Drive handler
  const handleTestDriveClick = useCallback(() => {
    // Open lead form modal
    console.log('Book Test Drive clicked, opening modal');
    setShowLeadForm(true);
  }, []);

  // Setup effects
  useEffect(() => {
    setMounted(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Note: Header height tracking removed since we're using overlay approach

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  if (!mounted) return null;

  return (
    <>
    <motion.header
      ref={headerRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isHeaderVisible ? 0 : -100,
        opacity: isHeaderVisible ? 1 : 0
      }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className="fixed top-0 left-0 w-full z-[10000] epic-header"
      style={{
        background: 'rgba(255, 255, 255, 0.98)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.06)',
        willChange: 'transform, opacity',
        transform: 'translateZ(0)'
      }}
    >
      {/* Subtle Accent Line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-0 w-full h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(220, 38, 28, 0.3) 50%, transparent 100%)'
          }}
        />
      </div>

      {/* Header Content with Perfect Alignment */}
      <div className="relative z-10 flex items-center justify-between w-full px-0 lg:px-8 py-2.5">

        {/* Logo - Left Aligned */}
        <motion.div
          className="flex items-center relative group flex-shrink-0"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
          }}
        >
          <Image
            src="/assets/toyota-models/newlogo.png"
            alt="Epic Toyota Logo"
            width={200}
            height={33}
            className="object-contain relative z-10 cursor-pointer transition-all duration-300 hidden lg:block"
            onClick={() => scrollToSection('#hero')}
          />
          <Image
            src="/assets/toyota-models/newlogo.png"
            alt="Epic Toyota Logo"
            width={140}
            height={23}
            className="object-contain relative z-10 cursor-pointer transition-all duration-300 lg:hidden"
            onClick={() => scrollToSection('#hero')}
          />
        </motion.div>

        {/* Navigation - Perfectly Centered */}
        <nav className="hidden lg:flex flex-1 items-center justify-center">
          <div className="flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.title}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredItem(item.title)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => scrollToSection(item.href)}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="relative z-10">
                  <span
                    className={`
                      font-semibold text-sm tracking-wide transition-all duration-300 whitespace-nowrap px-4 py-2
                      ${isNavItemActive(item.sectionId)
                        ? 'text-red-600 font-bold'
                        : hoveredItem === item.title
                        ? 'text-red-500'
                        : 'text-gray-700 group-hover:text-gray-900'
                      }
                    `}
                  >
                    {item.title}
                  </span>
                </div>

                {/* Active/Hover Bottom Accent */}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] rounded-full"
                  style={{
                    background: 'rgba(220, 38, 28, 1)'
                  }}
                  initial={{ width: '0%' }}
                  animate={{
                    width: isNavItemActive(item.sectionId) || hoveredItem === item.title ? '80%' : '0%'
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Book Test Drive & Mobile Menu - Right Aligned */}
        <div className="flex items-center gap-2 pr-4 lg:pr-0">
          {/* Book Test Drive Button */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <button
              onClick={() => {
                console.log('Button clicked!');
                setShowLeadForm(true);
              }}
              className="relative overflow-hidden px-8 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-300 group hidden lg:block"
              style={{
                background: 'rgba(220, 38, 28, 1)',
                color: 'white',
                boxShadow: '0 4px 12px rgba(220, 38, 28, 0.25)'
              }}
            >
              <span className="relative z-10 whitespace-nowrap">Book Test Drive</span>
            </button>
            <button
              onClick={() => {
                console.log('Button clicked!');
                setShowLeadForm(true);
              }}
              className="relative overflow-hidden px-4 py-2 rounded-full font-bold text-xs tracking-wide transition-all duration-300 group lg:hidden"
              style={{
                background: 'rgba(220, 38, 28, 1)',
                color: 'white',
                boxShadow: '0 4px 12px rgba(220, 38, 28, 0.25)'
              }}
            >
              <span className="relative z-10 whitespace-nowrap">Book Test Drive</span>
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 relative group transition-all duration-300 rounded-lg border border-gray-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            style={{
              background: 'rgba(249, 250, 251, 1)'
            }}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-red-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 group-hover:text-red-600 transition-colors duration-300" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden border-t border-gray-200"
            style={{
              background: 'rgba(255, 255, 255, 0.98)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}
          >
            <div className="px-6 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <button
                    onClick={() => {
                      scrollToSection(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-6 py-4 text-sm font-medium rounded-lg transition-all duration-300 group ${
                      isNavItemActive(item.sectionId) ? 'bg-red-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className={`transition-colors duration-300 ${
                      isNavItemActive(item.sectionId)
                        ? 'text-red-600 font-bold'
                        : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      {item.title}
                    </span>
                  </button>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="pt-6 border-t border-gray-200"
              >
                <button
                  onClick={() => {
                    console.log('Mobile button clicked!');
                    setShowLeadForm(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-6 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 text-white"
                  style={{
                    background: 'rgba(220, 38, 28, 1)',
                    boxShadow: '0 4px 12px rgba(220, 38, 28, 0.25)'
                  }}
                >
                  Book Test Drive
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>

    {/* Lead Form Modal - Render via portal to avoid ancestor transforms clipping */}
    {mounted && showLeadForm && typeof document !== 'undefined'
      ? createPortal(
          (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[20000] flex items-center justify-center p-4"
                style={{
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(8px)'
                }}
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

                  <LeadForm 
                    buttonLabel="Book Test Drive" 
                    onSuccess={() => setShowLeadForm(false)}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          ),
          document.body
        )
      : null}
    </>
  );
};

export default Header;