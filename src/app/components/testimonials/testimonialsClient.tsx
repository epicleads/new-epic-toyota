"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReviewsStructuredData from "../seo/ReviewsStructuredData";

export default function TestimonialsSection() {
  const [currentImageSlide, setCurrentImageSlide] = useState(0);
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [translateX] = useState(0);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastFrameTime = useRef<number>(0);
  const frameCount = useRef<number>(0);
  const fpsRef = useRef<number>(60);

  const deliveryImages = [
    "/assets/customerPic1.webp",
    "/assets/customerPic2.webp",
    "/assets/customerPic3.webp",
    "/assets/customerPic4.webp",
    "/assets/CustomerPic5.webp",
    "/assets/customerPic6.webp",
    "/assets/customerPic7.webp",
  ];

  const reviews = [
    {
      name: "Customer Review",
      review:
        "We recently purchased a new car and had a wonderful experience. The atmosphere at the showroom was welcoming, and the hospitality from the team made us feel very comfortable. A special thanks to Nithya, who explained every detail clearly and patiently. She made the entire process smooth and stress-free with her professionalism and friendly approach.",
      rating: 5,
    },
    {
      name: "Customer Review", 
      review:
        "Recently I took delivery of my car from EPIC TOYOTA and I must say the experience was excellent. The staff was very professional, polite, and guided me through all the formalities smoothly. The delivery process was well organized, and the car was handed over in perfect condition with all features explained in detail.",
      rating: 5,
    },
    {
      name: "Customer Review",
      review:
        "I recently purchased my Innova Crysta from Epic Toyota, Vyasarpadi, and the experience was excellent. The staff were friendly, explained every detail clearly, and made the process smooth and hassle-free. The delivery was on time, and the car was handed over in perfect condition. Special thanks to the team for their professional service.",
      rating: 5,
    },
  ];

  // Create duplicated array for seamless infinite scroll
  const duplicatedImages = useMemo(() => [...deliveryImages, ...deliveryImages], [deliveryImages]);

  // Detect mobile device
  useEffect(() => {
    setMounted(true);
    let resizeTimeout: NodeJS.Timeout;
    const checkMobile = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Memoized calculations for performance
  const cardDimensions = useMemo(() => {
    const cardWidth = isMobile ? 280 : 350;
    const gap = 24;
    const totalCardWidth = cardWidth + gap;
    const totalWidth = deliveryImages.length * totalCardWidth;
    const speed = isMobile ? 60 : 40;

    return { cardWidth, gap, totalCardWidth, totalWidth, speed };
  }, [isMobile, deliveryImages.length]);

  // High-performance animation loop
  const animate = useCallback((currentTime: number) => {
    if (isPaused || isManualScrolling) {
      startTimeRef.current = currentTime - (translateX / cardDimensions.speed) * 1000;
      if (!isPaused && !isManualScrolling) {
        animationRef.current = requestAnimationFrame(animate);
      }
      return;
    }

    frameCount.current++;
    if (currentTime - lastFrameTime.current >= 1000) {
      fpsRef.current = frameCount.current;
      frameCount.current = 0;
      lastFrameTime.current = currentTime;
    }

    if (fpsRef.current < 30 && frameCount.current % 2 === 0) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const elapsed = (currentTime - startTimeRef.current) / 1000;
    const newTranslateX = (elapsed * cardDimensions.speed) % cardDimensions.totalWidth;

    if (scrollRef.current) {
      scrollRef.current.style.transform = `translateX(-${newTranslateX}px)`;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, isManualScrolling, cardDimensions, translateX]);

  // Animation effect
  useEffect(() => {
    if (!scrollRef.current || isPaused || isManualScrolling || !mounted) return;

    if (startTimeRef.current === 0) {
      startTimeRef.current = performance.now();
      lastFrameTime.current = performance.now();
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isManualScrolling, animate, mounted]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartTime(Date.now());
    setTouchStartX(e.touches[0].clientX);
    setIsPaused(true);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchDuration = Date.now() - touchStartTime;
    const swipeDistance = touchStartX - touchEndX;
    const minSwipeDistance = 30;
    const maxSwipeTime = 300;

    if (Math.abs(swipeDistance) > minSwipeDistance && touchDuration < maxSwipeTime) {
      setTimeout(() => {
        setIsPaused(false);
      }, isMobile ? 200 : 400);
    } else {
      setTimeout(() => {
        setIsPaused(false);
      }, isMobile ? 800 : 1200);
    }
  }, [touchStartTime, touchStartX, isMobile]);

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsPaused(true);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsPaused(false);
    }
  }, [isMobile]);

  // Auto-slide reviews (keep existing functionality)
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setCurrentReviewSlide((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [mounted, reviews.length]);

  const nextImageSlide = () => {
    setCurrentImageSlide((prev) => (prev + 1) % deliveryImages.length);
  };

  const prevImageSlide = () => {
    setCurrentImageSlide((prev) => (prev - 1 + deliveryImages.length) % deliveryImages.length);
  };

  const nextReviewSlide = () => {
    setCurrentReviewSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevReviewSlide = () => {
    setCurrentReviewSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
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
    <>
      <ReviewsStructuredData reviews={reviews} />
      <section 
        className="w-full bg-white text-black py-16 md:py-20 relative overflow-hidden font-manrope"
        itemScope
        itemType="https://schema.org/Organization"
        id="testimonials"
      >
        {/* Toyota-inspired background elements */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-20 left-20 w-32 h-32 border border-red-600 rounded-full"></div>
          <div className="absolute top-40 right-32 w-20 h-20 border border-red-500 rotate-12"></div>
          <div className="absolute bottom-40 left-1/3 w-28 h-28 border border-red-600 rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-red-500"></div>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-2 tracking-tight font-manrope">
                EPIC TOYOTA CUSTOMER <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">TESTIMONIALS</span>
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full"></div>
             </div>
          </motion.div>

          {/* Delivery Images Gallery - Auto-Sliding Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-red-600 text-center mb-8 font-manrope">
              Epic Toyota Chennai Car Deliveries - Happy Customers in Mount Road & Vyasarpadi
            </h3>

            {/* Mobile Swipe Instruction */}
            {isMobile && (
              <p className="text-sm text-gray-500 mb-4 text-center flex items-center justify-center gap-2">
                <span>👈</span>
                <span>Images slide automatically</span>
                <span>👉</span>
              </p>
            )}

            {/* Auto-Scrolling Image Carousel */}
            <div className="relative overflow-hidden mb-8">
              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

              {/* Scrolling Container */}
              <div
                className="relative overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  ref={scrollRef}
                  className="flex gap-6 pb-4 cursor-pointer select-none"
                  style={{
                    touchAction: 'pan-x',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {duplicatedImages.map((img, idx) => (
                    <motion.div
                      key={`delivery-${idx}`}
                      className="flex-shrink-0 group"
                      style={{
                        width: isMobile ? '280px' : '350px',
                        height: '300px',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden'
                      }}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-300">
                        <Image
                          src={img}
                          alt={`Toyota Car Delivery Chennai - Epic Toyota Customer ${(idx % deliveryImages.length) + 1} - Mount Road Vyasarpadi Showroom`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 280px, 350px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                        {/* Delivery Badge */}
                        <div className="absolute bottom-4 left-4 bg-red-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium font-manrope">
                          ✓ Delivered
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instagram CTA */}
            <div className="text-center">
              <a
                href="https://instagram.com" // replace with real Epic Toyota Insta link
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-red-600 hover:to-red-500 text-black hover:text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-300 border border-gray-200 hover:border-red-600 shadow-sm hover:shadow-lg font-manrope"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                View More on Instagram
              </a>
            </div>
          </motion.div>

          {/* Customer Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-red-600 text-center mb-8 font-manrope">
              Toyota Chennai Customer Reviews - Real Feedback from Epic Toyota Buyers
            </h3>

            {/* Desktop Grid */}
            <div className="hidden md:grid gap-6 lg:gap-8 md:grid-cols-3 mb-12">
              {reviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 relative"
                >
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 leading-relaxed mb-4 italic font-manrope">
                    &ldquo;{review.review}&rdquo;
                  </p>

                  {/* Customer Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center border border-red-200">
                      <span className="text-red-600 font-bold text-lg font-manrope">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-black font-semibold font-manrope">{review.name}</h4>
                      <p className="text-gray-600 text-sm font-manrope">Verified Customer</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Slider for Reviews */}
            <div className="md:hidden mb-12">
              <div className="relative">
                <div className="overflow-hidden rounded-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentReviewSlide}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg min-h-[200px] flex flex-col justify-center relative"
                    >
                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-4 justify-center">
                        {[...Array(reviews[currentReviewSlide].rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-red-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-700 leading-relaxed mb-4 italic font-manrope text-center">
                        &ldquo;{reviews[currentReviewSlide].review}&rdquo;
                      </p>

                      {/* Customer Name */}
                      <div className="flex items-center gap-3 justify-center">
                        <div className="w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center border border-red-200">
                          <span className="text-red-600 font-bold text-lg font-manrope">
                            {reviews[currentReviewSlide].name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-black font-semibold font-manrope">{reviews[currentReviewSlide].name}</h4>
                          <p className="text-gray-600 text-sm font-manrope">Verified Customer</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevReviewSlide}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center hover:border-red-300 hover:bg-red-50 transition-all duration-300 shadow-md z-20"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-red-600 transition-colors" />
                </button>
                
                <button
                  onClick={nextReviewSlide}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center hover:border-red-300 hover:bg-red-50 transition-all duration-300 shadow-md z-20"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 hover:text-red-600 transition-colors" />
                </button>

                {/* Slide Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReviewSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentReviewSlide 
                          ? 'bg-gradient-to-r from-red-600 to-red-500 w-8' 
                          : 'bg-gray-300 hover:bg-gray-400 w-2'
                      }`}
                      aria-label={`Go to review ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Google Reviews CTA */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-sm">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-xl font-bold text-black font-manrope">4.9/5</span>
                  <span className="text-gray-600 font-manrope">on Google Reviews</span>
                </div>
                
                <a
                  href="https://www.google.com/maps/place/Epic+Toyota" // replace with real Google reviews link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:shadow-lg hover:shadow-red-600/25 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-300 font-manrope"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Read More Reviews
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* High-performance CSS optimizations */}
      <style jsx>{`
        .flex-shrink-0 {
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform;
        }

        /* Optimize image rendering */
        .relative img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          transform: translateZ(0);
        }

        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          .flex-shrink-0 {
            contain: layout style paint;
          }
        }

        /* High DPI display optimizations */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .relative img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
        }
      `}</style>
    </>
  );
}