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
        backdropFilter: 'blur(15px) saturate(160%)',
        WebkitBackdropFilter: 'blur(15px) saturate(160%)',
        background: `
          linear-gradient(135deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.04) 50%,
            rgba(255, 255, 255, 0.02) 100%
          )
        `,
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: `
          0 4px 20px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.15)
        `,
        willChange: 'transform, opacity',
        transform: 'translateZ(0)'
      }}
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Mesh */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(220, 38, 28, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.06) 0%, transparent 50%)
            `
          }}
        />

        {/* Dynamic Mouse Follower with Neon Trail */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 50,
            width: 400,
            height: 100,
            background: `
              radial-gradient(ellipse, 
                rgba(220, 38, 28, 0.15) 0%, 
                rgba(220, 38, 28, 0.08) 30%, 
                rgba(59, 130, 246, 0.05) 60%, 
                transparent 80%
              )
            `,
            filter: 'blur(25px)',
            mixBlendMode: 'multiply'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Neon Particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${30 + Math.sin(Date.now() / 1000 + i) * 20}%`,
              width: `${2 + Math.sin(i) * 2}px`,
              height: `${2 + Math.sin(i) * 2}px`,
              background: i % 3 === 0 
                ? 'radial-gradient(circle, rgba(220, 38, 28, 0.8) 0%, transparent 70%)'
                : i % 3 === 1
                ? 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%)',
              boxShadow: i % 3 === 0
                ? '0 0 10px rgba(220, 38, 28, 0.5)'
                : i % 3 === 1
                ? '0 0 8px rgba(59, 130, 246, 0.4)'
                : '0 0 6px rgba(168, 85, 247, 0.3)',
              filter: 'blur(0.5px)'
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}

        {/* Premium Neon Border */}
        <div 
          className="absolute bottom-0 left-0 w-full h-px"
          style={{
            background: `
              linear-gradient(90deg, 
                transparent 0%, 
                rgba(220, 38, 28, 0.6) 20%, 
                rgba(220, 38, 28, 0.8) 50%, 
                rgba(220, 38, 28, 0.6) 80%, 
                transparent 100%
              )
            `,
            boxShadow: '0 0 10px rgba(220, 38, 28, 0.4)'
          }}
        />

        {/* Animated Light Beams */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          animate={{
            background: [
              'linear-gradient(45deg, transparent 0%, rgba(220, 38, 28, 0.1) 50%, transparent 100%)',
              'linear-gradient(45deg, transparent 20%, rgba(59, 130, 246, 0.08) 70%, transparent 100%)',
              'linear-gradient(45deg, transparent 0%, rgba(220, 38, 28, 0.1) 50%, transparent 100%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header Content with Perfect Alignment */}
      <div className="relative z-10 flex items-center justify-between w-full px-6 lg:px-8 py-4">
        
        {/* Logo - Left Aligned */}
        <motion.div
          className="flex items-center relative group flex-shrink-0"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
          }}
        >
          {/* Logo Neon Glow */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(220, 38, 28, 0.3) 0%, transparent 70%)',
              filter: 'blur(20px)'
            }}
          />

          <motion.div
            className="relative"
            whileHover={{
              rotateY: 5,
              rotateX: 2,
              transition: { duration: 0.3 }
            }}
          >
            <Image
              src="/assets/toyota-models/newlogo.png"
              alt="Epic Toyota Logo"
              width={140}
              height={70}
              className="object-contain relative z-10 cursor-pointer transition-all duration-500 hover:drop-shadow-lg"
              onClick={() => scrollToSection('#hero')}
              style={{
                filter: 'brightness(1.05) contrast(1.1) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
              }}
            />
          </motion.div>

          {/* Dynamic Brand Signature */}
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 opacity-0 group-hover:opacity-100 transition-all duration-700"
            style={{
              width: '60px',
              background: 'linear-gradient(90deg, transparent, rgba(220, 38, 28, 0.8), transparent)',
              boxShadow: '0 0 8px rgba(220, 38, 28, 0.5)'
            }}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
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
                        : 'text-gray-800 group-hover:text-gray-900'
                      }
                    `}
                    style={{
                      textShadow: isNavItemActive(item.sectionId)
                        ? '0 0 10px rgba(220, 38, 28, 0.3)'
                        : 'none'
                    }}
                  >
                    {item.title}
                  </span>
                </div>

                {/* Active/Hover Bottom Accent */}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(220, 38, 28, 0.8), transparent)',
                    boxShadow: '0 0 8px rgba(220, 38, 28, 0.5)'
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

        {/* Book Test Drive - Right Aligned */}
        <motion.div
          className="hidden lg:flex flex-shrink-0"
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
            className="relative overflow-hidden px-8 py-3 rounded-2xl font-bold text-sm tracking-wide transition-all duration-500 group"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(220, 38, 28, 0.9) 0%, 
                  rgba(220, 38, 28, 1) 50%, 
                  rgba(185, 28, 28, 1) 100%
                )
              `,
              color: 'white',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: `
                0 8px 25px rgba(220, 38, 28, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                0 0 30px rgba(220, 38, 28, 0.2)
              `,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Animated Shimmer */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                transform: 'skewX(-12deg)'
              }}
            />

            {/* Pulsing Glow */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"
              style={{
                background: 'rgba(220, 38, 28, 0.3)',
                filter: 'blur(20px)',
                transform: 'scale(1.2)'
              }}
              animate={{
                scale: [1.2, 1.4, 1.2],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <span className="relative z-10 whitespace-nowrap">Book Test Drive</span>
          </button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden p-3 relative group transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 }
          }}
          whileTap={{
            scale: 0.9,
            transition: { duration: 0.1 }
          }}
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.1) 0%, 
                rgba(255, 255, 255, 0.05) 100%
              )
            `,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px'
          }}
        >
          {/* Button Neon Glow */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"
            style={{
              background: 'radial-gradient(circle, rgba(220, 38, 28, 0.2) 0%, transparent 70%)',
              filter: 'blur(15px)'
            }}
          />

          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-red-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800 group-hover:text-red-600 transition-colors duration-300" />
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden text-white border-t border-white/20"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(0, 0, 0, 0.95) 0%, 
                  rgba(0, 0, 0, 0.9) 100%
                )
              `,
              backdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
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
                    className={`block w-full text-left px-6 py-4 text-sm font-medium rounded-xl transition-all duration-300 group ${
                      isNavItemActive(item.sectionId) ? 'bg-red-600/20 border-red-400/30' : ''
                    }`}
                    style={{
                      background: isNavItemActive(item.sectionId)
                        ? 'linear-gradient(135deg, rgba(220, 38, 28, 0.15) 0%, rgba(220, 38, 28, 0.08) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                      border: isNavItemActive(item.sectionId)
                        ? '1px solid rgba(220, 38, 28, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(5px)'
                    }}
                  >
                    <span className={`transition-colors duration-300 ${
                      isNavItemActive(item.sectionId)
                        ? 'text-red-400 font-bold'
                        : 'group-hover:text-red-400'
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
                className="pt-6 border-t border-white/20"
              >
                <button
                  onClick={() => {
                    console.log('Mobile button clicked!');
                    setShowLeadForm(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-6 py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300"
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        rgba(220, 38, 28, 0.9) 0%, 
                        rgba(220, 38, 28, 1) 100%
                      )
                    `,
                    boxShadow: '0 8px 25px rgba(220, 38, 28, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
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