"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 text-gray-600 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Branding */}
          <div className="text-center md:text-left">
            <h3 className="text-gray-900 font-bold text-xl">Epic Toyota</h3>
            <p className="text-sm mt-1 text-gray-600">Part of Raam Group</p>
          </div>

          {/* Middle - Links */}
          <div className="flex gap-6 text-sm">
            <a href="#about" className="hover:text-red-500 transition">
              About
            </a>
            <a href="#services" className="hover:text-red-500 transition">
              Services
            </a>
            <a href="#contact" className="hover:text-red-500 transition">
              Contact
            </a>
          </div>

          {/* Right - Socials */}
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
          © {new Date().getFullYear()} Epic Toyota | All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
