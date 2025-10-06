"use client";

import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-black text-gray-300 relative overflow-hidden">
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 md:mb-10">

          {/* Column 1 - Branding & Logo */}
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <Image
                src="/assets/toyota-models/newlogo.png"
                alt="Epic Toyota Logo"
                width={160}
                height={53}
                className="h-10 sm:h-12 md:h-14 w-auto"
              />
              <div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-1">Epic Toyota</h3>
                <p className="text-xs sm:text-sm text-gray-400">Part of Raam Group</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Your trusted Toyota dealership in Chennai. Experience excellence in automotive sales and service.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-white font-bold text-sm sm:text-base uppercase tracking-wide border-b border-red-600/30 pb-2">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2 sm:space-y-3">
              <a href="#hero" className="text-xs sm:text-sm hover:text-red-500 transition-colors duration-300 flex items-center group">
                <span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                Home
              </a>
              <a href="#about" className="text-xs sm:text-sm hover:text-red-500 transition-colors duration-300 flex items-center group">
                <span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                About Us
              </a>
              <a href="#services" className="text-xs sm:text-sm hover:text-red-500 transition-colors duration-300 flex items-center group">
                <span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                Services
              </a>
              <a href="#models" className="text-xs sm:text-sm hover:text-red-500 transition-colors duration-300 flex items-center group">
                <span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                Models
              </a>
              <a href="#offers" className="text-xs sm:text-sm hover:text-red-500 transition-colors duration-300 flex items-center group">
                <span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                Offers
              </a>
              <a href="#contact" className="text-xs sm:text-sm hover:text-red-500 transition-colors duration-300 flex items-center group">
                <span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                Contact
              </a>
            </nav>
          </div>

          {/* Column 3 - Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-white font-bold text-sm sm:text-base uppercase tracking-wide border-b border-red-600/30 pb-2">
              Contact Us
            </h4>
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <a href="tel:+919500007575" className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm hover:text-red-500 transition-colors duration-300 group">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="break-words">+919500007575</span>
              </a>
              <a href="mailto:support@epictoyota.co.in" className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm hover:text-red-500 transition-colors duration-300 group">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="break-words">support@epictoyota.co.in</span>
              </a>
              <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                <span className="text-gray-400">Chennai, Tamil Nadu</span>
              </div>
            </div>
          </div>

          {/* Column 4 - Social & CTA */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-white font-bold text-sm sm:text-base uppercase tracking-wide border-b border-red-600/30 pb-2">
              Connect With Us
            </h4>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://www.facebook.com/EpicToyotaChennai/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all duration-300 group"
              >
                <Facebook className="w-4 sm:w-5 h-4 sm:h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="https://instagram.com/epictoyotachennai/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all duration-300 group"
              >
                <Instagram className="w-4 sm:w-5 h-4 sm:h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCxMpxPFBbtTXgvqfSsT1FYQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all duration-300 group"
              >
                <Youtube className="w-4 sm:w-5 h-4 sm:h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>

            <div className="pt-2 sm:pt-4">
              <a
                href="#contact"
                className="inline-block w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-xs sm:text-sm text-center hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Book Test Drive
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800/50 mb-4 sm:mb-6"></div>

        {/* Bottom Section - Legal & Copyright */}
        <div className="text-center text-xs text-gray-500 space-y-1.5 sm:space-y-2">
          <p>
            © {new Date().getFullYear()} <span className="text-gray-400 font-medium">EPIC Motors India Private Limited</span>. All Rights Reserved.
          </p>
          <p className="text-gray-600">
            Authorized Toyota Dealer | Part of Raam Group
          </p>
        </div>
      </div>
    </footer>
  );
}
