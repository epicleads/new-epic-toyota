"use client";

import { useState } from "react";

type ContactFormProps = {
  buttonLabel?: string;
};

export default function ContactForm({
  buttonLabel = "Submit Now",
}: ContactFormProps) {
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
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://raam-group-all-websites.onrender.com';
      const res = await fetch(
        `${API_BASE}/admin/epic-toyota/leads`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.ok) {
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
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 md:p-8 text-left w-full max-w-lg mx-auto"
    >
      {/* Name */}
      <div className="mb-5">
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
      <div className="mb-5">
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

      {/* Service Type */}
      <div className="mb-6">
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
        {loading ? "Submitting..." : buttonLabel}
      </button>

      {/* Success / Error Messages */}
      {submitted && (
        <p className="mt-4 text-green-400 text-sm">
          ✅ Thank you! We’ll get back to you shortly.
        </p>
      )}
      {errorMsg && (
        <p className="mt-4 text-red-400 text-sm">⚠ {errorMsg}</p>
      )}
    </form>
  );
}
