'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Loader,
  Fuel,
  Settings,
  Calculator
} from 'lucide-react';
import EmiCalculator from './EmiCalculator';

interface ToyotaModel {
  id: number;
  name: string;
  variant: string;
  price: string;
  originalPrice?: string;
  savings?: string;
  fuelType: string;
  transmission: string;
  engineCapacity: string;
  horsepower: string;
  torque?: string;
  safetyRating: number;
  colors: string[];
  defaultColor: string;
  features: string[];
  imageUrl: string;
  category: string;
  isNew: boolean;
  description: string;
}

const toyotaModels: ToyotaModel[] = [
  {
    id: 1,
    name: "Glanza",
    variant: "S+ CVT",
    price: "1000000",
    originalPrice: "1099000",
    savings: "99000",
    fuelType: "Petrol",
    transmission: "CVT",
    engineCapacity: "1.2L",
    horsepower: "90 HP",
    torque: "113 Nm",
    safetyRating: 4,
    colors: ["Café White", "Sporty Blue", "Enticing Silver"],
    defaultColor: "Café White",
    features: ["SmartPlay Pro Infotainment", "Apple CarPlay", "Android Auto", "Reverse Parking Camera"],
    imageUrl: "/assets/toyota-models/toyota glanza.png",
    category: "Hatchback",
    isNew: true,
    description: "The stylish and fuel-efficient Toyota Glanza offers premium features at an accessible price point."
  },
  {
    id: 2,
    name: "Taisor",
    variant: "S+ CNG",
    price: "1411000",
    originalPrice: "1522000",
    savings: "111000",
    fuelType: "CNG",
    transmission: "Manual",
    engineCapacity: "1.2L",
    horsepower: "77 HP",
    torque: "98 Nm",
    safetyRating: 4,
    colors: ["Gaming Grey", "Rustic Brown", "Splendid Silver"],
    defaultColor: "Gaming Grey",
    features: ["360° View Camera", "Head-Up Display", "Wireless Charging", "6 Airbags"],
    imageUrl: "/assets/toyota-models/taisor_new.png",
    category: "Compact SUV",
    isNew: true,
    description: "The compact and versatile Toyota Taisor combines SUV styling with exceptional fuel efficiency."
  },
  {
    id: 3,
    name: "Rumion",
    variant: "S+ MT",
    price: "1044000",
    originalPrice: "1092000",
    savings: "48000",
    fuelType: "Petrol",
    transmission: "Manual",
    engineCapacity: "1.5L",
    horsepower: "105 HP",
    torque: "138 Nm",
    safetyRating: 4,
    colors: ["Café White", "Copper Brown", "Rustic Brown"],
    defaultColor: "Café White",
    features: ["7-Seater Configuration", "Rear AC Vents", "Height Adjustable Driver Seat", "Power Steering"],
    imageUrl: "/assets/toyota-models/rumion.png",
    category: "MPV",
    isNew: false,
    description: "The spacious Toyota Rumion offers comfortable 7-seater convenience for growing families."
  },
  {
    id: 4,
    name: "Innova Hycross",
    variant: "ZX(O) Hybrid",
    price: "3134000",
    originalPrice: "3202000",
    savings: "68000",
    fuelType: "Hybrid",
    transmission: "CVT",
    engineCapacity: "2.0L",
    horsepower: "184 HP",
    torque: "188 Nm",
    safetyRating: 5,
    colors: ["Super White", "Avant Garde Bronze", "Blackish Ageha Glass"],
    defaultColor: "Super White",
    features: ["8-Seater Premium", "Panoramic Sunroof", "JBL Audio", "Wireless Charging"],
    imageUrl: "/assets/toyota-models/innovahycross.png",
    category: "Premium MPV",
    isNew: true,
    description: "The revolutionary Toyota Innova Hycross combines hybrid efficiency with premium comfort and space."
  },
  {
    id: 5,
    name: "Innova Crysta",
    variant: "ZX",
    price: "2708000",
    originalPrice: "2889000",
    savings: "181000",
    fuelType: "Diesel",
    transmission: "Automatic",
    engineCapacity: "2.4L",
    horsepower: "150 HP",
    torque: "343 Nm",
    safetyRating: 5,
    colors: ["Super White", "Silver Metallic", "Grey Metallic"],
    defaultColor: "Super White",
    features: ["Captain Seats", "Touchscreen Infotainment", "Dual Zone AC", "Alloy Wheels"],
    imageUrl: "/assets/toyota-models/innova crysta.png",
    category: "MPV",
    isNew: false,
    description: "India's most trusted MPV, the Toyota Innova Crysta delivers unmatched reliability and comfort."
  },
  {
    id: 6,
    name: "Land Cruiser",
    variant: "300 VX",
    price: "23100000",
    originalPrice: "24100000",
    savings: "1000000",
    fuelType: "Petrol",
    transmission: "Automatic",
    engineCapacity: "3.5L",
    horsepower: "415 HP",
    torque: "650 Nm",
    safetyRating: 5,
    colors: ["Super White", "Attitude Black"],
    defaultColor: "Super White",
    features: ["Multi-Terrain Monitor", "Crawl Control", "Premium Leather Interior", "JBL Premium Sound"],
    imageUrl: "/assets/toyota-models/lc.png",
    category: "Premium SUV",
    isNew: true,
    description: "The legendary Toyota Land Cruiser 300 offers unparalleled off-road capability with luxury refinement."
  }
];

const formatPrice = (price: string | number) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
};


const ToyotaFeaturedModels: React.FC = () => {
  const [models] = useState<ToyotaModel[]>(toyotaModels);
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSpecIndex, setCurrentSpecIndex] = useState(0);
  const [, setIsScheduleOpen] = useState(false);
  const [, setScheduleModel] = useState<ToyotaModel | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showEmiCalculator, setShowEmiCalculator] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Track when component mounts on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulate loading for smooth transition
  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [mounted]);

  // Add responsive styles for very small screens - only on client side
  React.useEffect(() => {
    if (typeof window === 'undefined' || !mounted) return; // Ensure client-side only and component is mounted
    
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 520px) {
        .featured-container-responsive {
          padding-left: 8px !important;
          padding-right: 8px !important;
        }
        .featured-grid-responsive {
          gap: 8px !important;
          max-width: 280px !important;
        }
        .featured-bg-responsive {
          width: 200px !important;
          height: 200px !important;
        }
        .featured-title-responsive {
          font-size: 1.875rem !important;
          line-height: 2.25rem !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !isAutoPlaying || isHovered || models.length === 0) return;
    const interval = setInterval(() => {
      setSelectedModel((prev) => (prev + 1) % models.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mounted, isAutoPlaying, isHovered, models]);

  // Auto-cycle spec card for mobile
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrentSpecIndex((prev) => (prev + 1) % 2);
    }, 3000);
    return () => clearInterval(interval);
  }, [mounted]);

  const currentModel = useMemo(() => models[selectedModel], [models, selectedModel]);

  const navigateModel = useCallback((direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    if (direction === 'prev') {
      setSelectedModel(selectedModel > 0 ? selectedModel - 1 : models.length - 1);
    } else {
      setSelectedModel(selectedModel < models.length - 1 ? selectedModel + 1 : 0);
    }
  }, [selectedModel, models.length]);

  // Swipe functions (same as original)
  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (direction === 'left') {
      navigateModel('next');
    } else {
      navigateModel('prev');
    }
  }, [navigateModel]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(null);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.touches[0].clientX);
  }, [isDragging]);

  const onTouchEnd = useCallback(() => {
    if (!isDragging) return;

    if (touchStart && touchEnd) {
      const distance = touchStart - touchEnd;
      const minSwipeDistance = 50;

      if (Math.abs(distance) > minSwipeDistance) {
        if (distance > 0) {
          handleSwipe('left');
        } else {
          handleSwipe('right');
        }
      }
    }

    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  }, [isDragging, touchStart, touchEnd, handleSwipe]);

  // Loading state or not mounted yet to prevent hydration issues
  if (!mounted || loading) {
    return (
      <section className="bg-gradient-to-br from-white via-gray-50 to-white w-full py-12 md:py-16 font-manrope relative overflow-hidden" style={{ minHeight: '600px' }}>
        {/* Loading background effects */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-20 left-20 w-40 h-40 border border-red-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 border border-red-300 rounded-lg rotate-45 animate-pulse"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="h-16 flex items-center justify-center">
              <div className="animate-pulse bg-gray-200 h-12 w-96 rounded-lg"></div>
            </div>
            <div className="h-6 flex items-center justify-center">
              <div className="animate-pulse bg-gray-150 h-4 w-64 rounded"></div>
            </div>
          </div>
          <div className="flex items-center justify-center" style={{ height: '400px' }}>
            <div className="text-center">
              <Loader className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-700 text-lg font-manrope">
                {!mounted ? 'Initializing...' : 'Loading Toyota Models...'}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white w-full py-12 md:py-16 font-manrope relative overflow-hidden">

      <div 
        className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 font-manrope featured-container-responsive"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 md:mb-12 font-manrope will-change-transform"
          style={{ contain: 'layout' }}
        >
          <div className="inline-block relative mb-6">
            <h1 className="font-manrope text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2 tracking-tight featured-title-responsive">
              Featured <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent font-bold">Toyota Models</span>
            </h1>
            {/* Futuristic underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-px bg-gradient-to-r from-red-300 to-red-400 rounded-full"></div>
          </div>
          <p className="font-manrope text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-4">
            Discover the perfect Toyota vehicle for your lifestyle and needs with premium quality and reliability
          </p>
        </motion.div>

        {/* Model Thumbnails - Top Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 relative"
        >
          {/* Desktop View - Horizontal Scroll */}
          <div className="hidden md:flex justify-center gap-4 overflow-x-auto pb-4 pt-2 px-2 sm:px-4">
            {models.map((model, index) => (
              <motion.button
                key={model.id}
                onClick={() => {
                  setSelectedModel(index);
                  setIsAutoPlaying(false);
                }}
                whileHover={{ scale: 1.08, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`relative flex-shrink-0 group transition-all duration-700 ease-out flex flex-col items-center pt-1 pb-0.5 ${
                  index === selectedModel
                    ? 'scale-110 opacity-100'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                <div className="relative w-28 h-20 md:w-36 md:h-24 transition-all duration-700 ease-out" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={model.imageUrl}
                    alt={`${model.name} ${model.variant}`}
                    fill
                    className="object-contain transition-all duration-700 ease-out"
                    sizes="(max-width: 768px) 112px, 144px"
                  />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Mobile View - 3x2 Grid */}
          <div
            className="md:hidden pb-4 pt-2 px-2 sm:px-4 relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ touchAction: 'none' }}
          >
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xs sm:max-w-sm mx-auto">
              {models.map((model, index) => (
                <motion.button
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(index);
                    setIsAutoPlaying(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`relative group transition-all duration-700 ease-out flex flex-col items-center ${
                    index === selectedModel
                      ? 'scale-110 opacity-100'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <div className="relative w-full aspect-square transition-all duration-700 ease-out">
                    <Image
                      src={model.imageUrl}
                      alt={`${model.name} ${model.variant}`}
                      fill
                      className="object-contain transition-all duration-700 ease-out"
                      sizes="(max-width: 768px) 33vw, 25vw"
                    />
                  </div>

                  <div className="mt-2 text-center leading-tight">
                    <div className={`text-xs font-medium font-manrope transition-all duration-500 ${
                      index === selectedModel ? 'text-red-600' : 'text-gray-700'
                    }`}>
                      {model.name}
                    </div>
                    <div className="text-xs text-gray-500 font-manrope">
                      {model.variant}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mobile Car Image - Between Thumbnails and Description */}
        <motion.div
          className="lg:hidden mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div
            className="relative aspect-[4/3] cursor-grab active:cursor-grabbing"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ touchAction: 'pan-y' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedModel}
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -50 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0"
              >
                <Image
                  src={currentModel.imageUrl}
                  alt={`${currentModel.name} ${currentModel.variant}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 100vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mobile Pagination Dots */}
        <motion.div 
          className="lg:hidden mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex justify-center gap-2">
            {models.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedModel(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === selectedModel 
                    ? 'bg-gradient-to-r from-red-600 to-red-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400 w-2'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8">
          
          {/* Model Image - Hero Section */}
          <motion.div
            className="order-2 lg:order-1 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hidden lg:block relative">
              <div
                className="relative aspect-[4/3]"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedModel}
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -50 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentModel.imageUrl}
                      alt={`${currentModel.name} ${currentModel.variant}`}
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows - Desktop */}
              <button
                onClick={() => navigateModel('prev')}
                className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-500 ease-out group z-10"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-red-600 transition-colors duration-300" />
              </button>
            </div>
          </motion.div>

          {/* Model Details */}
          <motion.div
            className="order-1 lg:order-2 h-full flex flex-col justify-between relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button
              onClick={() => navigateModel('next')}
              className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-500 ease-out group z-10"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-red-600 transition-colors duration-300" />
            </button>
            
            {/* Top Section - Title & Info */}
            <div className="space-y-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedModel}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  <div className="space-y-1.5">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight font-manrope">
                      Toyota {currentModel.name}
                    </h2>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Price Section */}
              <motion.div
                className="space-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 text-xs text-gray-600 font-medium font-manrope">
                  <span>Starting from</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-1.5">
                  <span className="text-lg md:text-xl font-bold text-gray-900 font-manrope inline-flex items-baseline">
                    {currentModel.originalPrice
                      ? `${formatPrice(currentModel.price)} - ${formatPrice(currentModel.originalPrice)}`
                      : formatPrice(currentModel.price)
                    }
                    <sup className="inline-flex items-center leading-none ml-0.5 text-[0.6em]">
                      <span className="text-red-600 text-[1em] inline-block align-baseline leading-none">*</span>
                      <span className="text-red-600 text-[0.8em] inline-block align-baseline leading-none ml-1">Ex-showroom</span>
                    </sup>
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Middle Section - Description & Specs */}
            <div className="space-y-3">
             
              {/* Specifications Grid - Desktop */}
              <div className="hidden md:grid grid-cols-3 gap-3 mt-0">
                {[
                  { icon: Fuel, label: 'Fuel Type', value: currentModel.fuelType, clickable: false },
                  { icon: Settings, label: 'Transmission', value: currentModel.transmission, clickable: false },
                  { icon: Calculator, label: 'EMI Calculator', value: 'Calculate', clickable: true },
                ].map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-3 text-center transition-all duration-300 shadow-sm ${
                      spec.clickable
                        ? 'cursor-pointer hover:border-red-400 hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 hover:shadow-lg hover:scale-105 active:scale-95'
                        : 'hover:border-red-300 hover:bg-gray-100 hover:shadow-md'
                    }`}
                    onClick={() => spec.clickable && setShowEmiCalculator(true)}
                  >
                    <spec.icon className={`w-5 h-5 mx-auto mb-2 ${spec.clickable ? 'text-red-600 animate-pulse' : 'text-red-600'}`} />
                    <div className="text-sm text-gray-600 mb-1 font-manrope font-medium">{spec.label}</div>
                    <div className={`text-sm font-bold font-manrope ${spec.clickable ? 'text-red-600' : 'text-gray-900'}`}>
                      {spec.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Single Spec Card */}
              <div className="md:hidden space-y-3">
                <div
                  className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-4 text-center hover:border-red-300 hover:bg-gray-100 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSpecIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      {(() => {
                        const specs = [
                          { icon: Fuel, label: 'Fuel Type', value: currentModel.fuelType },
                          { icon: Settings, label: 'Transmission', value: currentModel.transmission },
                        ];
                        const spec = specs[currentSpecIndex % 2];
                        return (
                          <>
                            <spec.icon className="w-6 h-6 text-red-600 mx-auto" />
                            <div className="text-sm text-gray-600 font-manrope font-medium">{spec.label}</div>
                            <div className="text-sm font-bold text-gray-900 flex items-center justify-center gap-2 font-manrope">
                              {spec.value}
                            </div>
                          </>
                        );
                      })()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Mobile EMI Calculator Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-4 text-center cursor-pointer hover:border-red-400 hover:shadow-lg transition-all duration-300 active:scale-95"
                  onClick={() => setShowEmiCalculator(true)}
                >
                  <Calculator className="w-6 h-6 text-red-600 mx-auto mb-2 animate-pulse" />
                  <div className="text-sm text-gray-600 font-manrope font-medium mb-1">EMI Calculator</div>
                  <div className="text-sm font-bold text-red-600 font-manrope">Calculate</div>
                </motion.div>
              </div>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex flex-row gap-6 mt-2 mb-1 justify-center">
             
               <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                 className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-manrope shadow-sm hover:shadow-md min-w-[240px]"
                onClick={() => {
                  setIsScheduleOpen(true);
                  setScheduleModel(currentModel);
                }}
              >
                Book Test Drive
              </motion.button>
            </div>

            {/* Mobile CTA Buttons */}
            <div className="md:hidden flex-row flex gap-6 mt-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-600/25 font-manrope"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/models';
                  }
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View All Models
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
               <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                 className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-manrope shadow-sm hover:shadow-md min-w-[220px]"
                onClick={() => {
                  setIsScheduleOpen(true);
                  setScheduleModel(currentModel);
                }}
              >
                Book Test Drive
              </motion.button>
            </div>
          </motion.div>
          </div>
        </div>


        {/* Schedule Demo Modal */}

      </div>

      {/* EMI Calculator Modal */}
      <AnimatePresence>
        {showEmiCalculator && (
          <EmiCalculator
            vehiclePrice={parseFloat(currentModel.price)}
            onClose={() => setShowEmiCalculator(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ToyotaFeaturedModels;