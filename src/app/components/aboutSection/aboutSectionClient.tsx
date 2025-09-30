"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full bg-white text-gray-900 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:[grid-template-columns:1fr_1.3fr] items-center gap-8 md:gap-10">
          <div className="flex flex-col items-start text-left lg:pr-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-red-600">
              About Us
            </h2>

            <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              At <span className="text-gray-900 font-semibold">Epic Toyota</span>,
              part of the prestigious <a href="https://raamgroup.in" target="_blank" rel="noopener noreferrer" className="text-red-600 font-semibold underline hover:text-red-700">Raam Group</a>, we are committed to delivering a
              premium Toyota experience. From world-class showrooms to
              state-of-the-art service centers, our goal is simple — provide
              unmatched reliability, service excellence, and trust on every drive.
            </p>
            <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-gray-600">
              With multiple outlets across Chennai and decades of automotive
              expertise, Epic Toyota brings you closer to your dream Toyota with
              transparent deals and exclusive customer care.
            </p>

            {/* Key Features */}
            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-sm md:text-base text-gray-700 font-medium">Premium Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-sm md:text-base text-gray-700 font-medium">Trusted Brand</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-sm md:text-base text-gray-700 font-medium">Expert Team</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-sm md:text-base text-gray-700 font-medium">Multiple Outlets</span>
              </div>
            </div>
          </div>

          <div className="w-full">
            <ShowroomSlider mounted={mounted} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowroomSlider({ mounted }: { mounted: boolean }) {
  const images = [
    "/assets/showroom1.jpeg",
 
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length, mounted]);

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[420px] xl:h-[500px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl bg-gray-100">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={src}
            alt="Epic Toyota Showroom - Premium Toyota Experience"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <span className="text-xs md:text-sm font-bold text-gray-900">TOYOTA</span>
      </div>
    </div>
  );
}
