'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, X, IndianRupee, TrendingDown, Calendar, Percent, Info } from 'lucide-react';

interface EmiCalculatorProps {
  vehiclePrice: number;
  onClose: () => void;
}

const EmiCalculator: React.FC<EmiCalculatorProps> = ({ vehiclePrice, onClose }) => {
  const [downPayment, setDownPayment] = useState(Math.round(vehiclePrice * 0.2));
  const [tenure, setTenure] = useState(5);
  const [interestRate, setInterestRate] = useState(8.5);

  const loanAmount = useMemo(() => vehiclePrice - downPayment, [vehiclePrice, downPayment]);

  const calculateEMI = useCallback(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;

    if (monthlyRate === 0) {
      return principal / months;
    }

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                (Math.pow(1 + monthlyRate, months) - 1);

    return Math.round(emi);
  }, [loanAmount, interestRate, tenure]);

  const emi = calculateEMI();
  const totalAmount = emi * tenure * 12;
  const totalInterest = totalAmount - loanAmount;

  const downPaymentPercent = Math.round((downPayment / vehiclePrice) * 100);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatShort = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
    return `₹${amount}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl font-manrope overflow-hidden"
        style={{ maxHeight: '95vh', height: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold">EMI Calculator</h2>
                <p className="text-red-100 text-xs hidden sm:block">Monthly payment estimator</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
          {/* LEFT COLUMN - Controls */}
          <div className="space-y-3 sm:space-y-4">
            {/* Vehicle Price */}
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-gray-600 mb-1">Vehicle Price</div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{formatShort(vehiclePrice)}</div>
            </div>

            {/* Down Payment Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <label className="text-xs sm:text-sm font-semibold text-gray-900">Down Payment</label>
                </div>
                <div className="text-right">
                  <div className="text-sm sm:text-base font-bold text-red-600">{formatShort(downPayment)}</div>
                  <div className="text-xs text-gray-500">{downPaymentPercent}%</div>
                </div>
              </div>
              <input
                type="range"
                min={Math.round(vehiclePrice * 0.1)}
                max={Math.round(vehiclePrice * 0.5)}
                step={10000}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider-red"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>10%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Loan Tenure Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-600" />
                  <label className="text-xs sm:text-sm font-semibold text-gray-900">Loan Tenure</label>
                </div>
                <div className="text-right">
                  <div className="text-sm sm:text-base font-bold text-red-600">{tenure} Years</div>
                  <div className="text-xs text-gray-500">{tenure * 12} months</div>
                </div>
              </div>
              <input
                type="range"
                min={1}
                max={7}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider-red"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 Yr</span>
                <span>7 Yrs</span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-red-600" />
                  <label className="text-xs sm:text-sm font-semibold text-gray-900">Interest Rate</label>
                </div>
                <div className="text-right">
                  <div className="text-sm sm:text-base font-bold text-red-600">{interestRate.toFixed(1)}%</div>
                  <div className="text-xs text-gray-500">p.a.</div>
                </div>
              </div>
              <input
                type="range"
                min={7}
                max={15}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider-red"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>7%</span>
                <span>15%</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Results */}
          <div className="space-y-3 sm:space-y-4">
            {/* EMI Per Month - Hero */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-red-600 to-red-500 text-white rounded-2xl p-4 sm:p-5 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee className="w-5 h-5" />
                <div className="text-xs sm:text-sm font-medium opacity-90">Monthly EMI</div>
              </div>
              <div className="text-3xl sm:text-4xl font-bold mb-1">{formatCurrency(emi)}</div>
              <div className="text-red-100 text-xs">for {tenure * 12} months</div>
            </motion.div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-3">
                <div className="text-xs text-gray-600 mb-1">Loan Amount</div>
                <div className="text-base sm:text-lg font-bold text-gray-900">{formatShort(loanAmount)}</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-3">
                <div className="text-xs text-gray-600 mb-1">Interest</div>
                <div className="text-base sm:text-lg font-bold text-gray-900">{formatShort(totalInterest)}</div>
              </div>
            </div>

            {/* Total Payment */}
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="text-xs sm:text-sm text-gray-600">Total Payment</div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">{formatShort(totalAmount)}</div>
              </div>
            </div>

            {/* Disclaimer - Compact */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex gap-2">
              <Info className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 leading-relaxed">
                Indicative calculation. Actual EMI may vary based on lender terms.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:shadow-xl text-white py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Apply for Loan
            </button>
          </div>
        </div>
      </motion.div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider-red::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #dc2626, #ef4444);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(220, 38, 38, 0.4);
          transition: all 0.2s ease;
        }

        .slider-red::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 10px rgba(220, 38, 38, 0.5);
        }

        .slider-red::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #dc2626, #ef4444);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(220, 38, 38, 0.4);
          transition: all 0.2s ease;
        }

        .slider-red::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 10px rgba(220, 38, 38, 0.5);
        }
      `}</style>
    </motion.div>
  );
};

export default EmiCalculator;