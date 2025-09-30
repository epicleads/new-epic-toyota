"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ContactForm from "./contactForm";



export default function CountdownSection() {
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Fetch active banner from backend
  useEffect(() => {
    async function fetchBanner() {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://raam-group-all-websites.onrender.com';
        const res = await fetch(
          `${API_BASE}/admin/epic-toyota/campaign-banners/active`
        );
        const data = await res.json();
        if (data.ok && data.data && data.data.end_date) {
          setEndDate(new Date(data.data.end_date));
        } else {
          setEndDate(null);
        }
      } catch (err) {
        console.error("Failed to fetch banner:", err);
        setEndDate(null);
      }
    }
    fetchBanner();
  }, []);

  // Countdown logic
  useEffect(() => {
    if (!endDate) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = endDate.getTime() - now;

      if (diff <= 0) {
        clearInterval(interval);
        setEndDate(null);
        return;
      }

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      );
      const hours = String(
        Math.floor((diff / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((diff / (1000 * 60)) % 60)
      ).padStart(2, "0");
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <>
      <section className="w-full bg-white text-gray-900 py-16 text-center relative overflow-hidden">
        {/* Subtle geometric background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-red-400/10 rotate-45"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border border-red-400/10 rotate-12"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-red-400/10 rotate-45"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 border border-red-400/10"></div>
        </div>

        {/* Red accent lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent"></div>

        {endDate ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto px-6"
          >
            {/* Alert Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 mb-6"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-600 uppercase tracking-wider">
                EXCLUSIVE OFFER ENDS SOON
              </span>
            </motion.div>


            {/* Countdown Timer */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds }
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  className="bg-white border border-gray-200 backdrop-blur-sm px-6 py-8 rounded-xl shadow-lg min-w-[120px]"
                >
                  <div className="text-5xl md:text-6xl font-mono font-black text-gray-900 mb-2">
                    {item.value}
                  </div>
                  <div className="text-sm uppercase tracking-widest text-gray-600 font-medium">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

           

            {/* Book Now Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-4 px-12 rounded-lg uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl border border-red-500 cursor-pointer relative z-10"
            >
              Book Now
            </motion.button>

            <p className="mt-4 text-sm text-gray-600">
              Secure your spot • No hidden charges • Instant confirmation
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto px-6"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase text-gray-900 mb-4">
              EXCITING OFFERS
            </h2>
            <h3 className="text-2xl md:text-3xl font-light text-red-600 mb-6">
              Coming Soon
            </h3>
            <p className="text-xl text-gray-700 mb-8">
              Be the first to know about our exclusive Toyota deals and premium offers
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-4 px-12 rounded-lg uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl border border-red-500 cursor-pointer relative z-10"
            >
              Get Notified
            </motion.button>
          </motion.div>
        )}
      </section>

      {/* Contact Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-lg w-full"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center z-10 transition-colors"
            >
              ✕
            </button>
            <ContactForm buttonLabel="Book Now" />
          </motion.div>
        </div>
      )}
    </>
  );
}
