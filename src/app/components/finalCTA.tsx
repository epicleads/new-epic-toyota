"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FinalCTASection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(
        "https://raticwohyvxcyoqzqnwj.supabase.co/functions/v1/smart-handler",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "df878d10-c2e4-42b6-84d5-6a70ed0041dd",
          },
          body: JSON.stringify({
            customer_name: formData.name,
            customer_mobile_number: formData.phone,
            model_interested: formData.service,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", phone: "", service: "" });
      } else {
        setErrorMsg(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setErrorMsg("Failed to submit form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-gradient-to-r from-gray-50 via-white to-gray-50 text-gray-900 py-20 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,10,30,0.03)_0%,transparent_70%)]"></div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-red-600 uppercase"
        >
          Book Your Toyota Experience Today
        </motion.h2>

        <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
          Ready to explore? Share your details and our team will get in touch
          shortly.
        </p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 bg-white border border-gray-200 rounded-2xl shadow-lg p-8 md:p-10"
        >
          {/* Name */}
          <div className="mb-6 text-left">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
              placeholder="Enter your name"
            />
          </div>

          {/* Phone */}
          <div className="mb-6 text-left">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
              placeholder="Enter your phone"
            />
          </div>

          {/* Service Dropdown */}
          <div className="mb-8 text-left">
            <label
              htmlFor="service"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Looking For
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
            >
              <option value="">Select an option</option>
              <option value="buy">Buy New Car</option>
              <option value="service">Servicing</option>
              <option value="exchange">Exchange / Upgrade</option>
              <option value="other">Any Other Services</option>
            </select>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-400 text-white font-bold py-3 md:py-4 rounded-lg uppercase tracking-wide transition-all shadow-md hover:shadow-lg"
          >
            {loading ? "Submitting..." : "Submit Now"}
          </button>

          {/* Success / Error Messages */}
          {submitted && (
            <p className="mt-4 text-green-600 text-sm">
              ✅ Thank you! We'll get back to you shortly.
            </p>
          )}
          {errorMsg && (
            <p className="mt-4 text-red-600 text-sm">⚠ {errorMsg}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
