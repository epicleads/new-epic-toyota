"use client";

import { useState } from "react";

type LeadFormProps = {
  buttonLabel?: string;
  onSuccess?: () => void;
};

export default function LeadForm({
  buttonLabel = "Submit Now",
  onSuccess,
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_mobile_number: "",
    model_interested: "",
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
            customer_name: formData.customer_name,
            customer_mobile_number: formData.customer_mobile_number,
            model_interested: formData.model_interested,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setFormData({ customer_name: "", customer_mobile_number: "", model_interested: "" });
        if (onSuccess) {
          setTimeout(() => {
            try {
              onSuccess();
            } catch (_) {
              // no-op
            }
          }, 2000);
        }
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
      {/* Customer Name */}
      <div className="mb-5">
        <label
          htmlFor="customer_name"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Customer Name
        </label>
        <input
          type="text"
          id="customer_name"
          name="customer_name"
          value={formData.customer_name}
          onChange={handleChange}
          required
          className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
          placeholder="Enter your name"
        />
      </div>

      {/* Customer Mobile Number */}
      <div className="mb-5">
        <label
          htmlFor="customer_mobile_number"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Mobile Number
        </label>
        <input
          type="tel"
          id="customer_mobile_number"
          name="customer_mobile_number"
          value={formData.customer_mobile_number}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
          className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
          placeholder="Enter 10-digit mobile number"
        />
      </div>

      {/* Model Interested */}
      <div className="mb-6">
        <label
          htmlFor="model_interested"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Model Interested
        </label>
        <select
          id="model_interested"
          name="model_interested"
          value={formData.model_interested}
          onChange={handleChange}
          required
          className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
        >
          <option value="">Select a model</option>
          <option value="Glanza">Glanza</option>
          <option value="Urban Cruiser Taisor">Urban Cruiser Taisor</option>
          <option value="Urban Cruiser Hyryder">Urban Cruiser Hyryder</option>
          <option value="Rumion">Rumion</option>
          <option value="Innova Hycross">Innova Hycross</option>
          <option value="Innova Crysta">Innova Crysta</option>
          <option value="Fortuner">Fortuner</option>
          <option value="Hilux">Hilux</option>
          <option value="Camry">Camry</option>
          <option value="Vellfire">Vellfire</option>
          <option value="Land Cruiser">Land Cruiser</option>
          <option value="Other">Other</option>
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
        <p className="mt-4 text-green-600 text-sm">
          ✅ Thank you! We'll get back to you shortly.
        </p>
      )}
      {errorMsg && (
        <p className="mt-4 text-red-600 text-sm">⚠ {errorMsg}</p>
      )}
    </form>
  );
}