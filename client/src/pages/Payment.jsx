// Payments.jsx
import React from 'react';
import { FaGooglePay, FaPhoneAlt, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { SiPhonepe, SiPaytm, SiRazorpay } from 'react-icons/si';

const Payments = () => (
  <section className="min-h-screen bg-white text-gray-800 py-12 px-6 md:px-12">
    <div className="max-w-5xl mx-auto bg-gray-100 rounded-2xl shadow-lg p-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b pb-2 border-blue-200">Payments</h1>

      <p className="text-lg mb-4">
        At <span className="font-semibold text-blue-600"> Lungi House</span>, we ensure a smooth and secure payment experience for our customers. We proudly accept a variety of online and offline payment methods.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center space-x-3 bg-white shadow p-4 rounded-lg">
          <FaGooglePay className="text-3xl text-indigo-600" />
          <span className="text-lg font-medium">Google Pay (UPI)</span>
        </div>
        <div className="flex items-center space-x-3 bg-white shadow p-4 rounded-lg">
          <SiPhonepe className="text-3xl text-purple-600" />
          <span className="text-lg font-medium">PhonePe (UPI)</span>
        </div>
        <div className="flex items-center space-x-3 bg-white shadow p-4 rounded-lg">
          <SiPaytm className="text-3xl text-blue-600" />
          <span className="text-lg font-medium">Paytm Wallet / UPI</span>
        </div>
        <div className="flex items-center space-x-3 bg-white shadow p-4 rounded-lg">
          <FaCreditCard className="text-3xl text-green-600" />
          <span className="text-lg font-medium">Credit / Debit Cards</span>
        </div>
        <div className="flex items-center space-x-3 bg-white shadow p-4 rounded-lg">
          <SiRazorpay className="text-3xl text-indigo-500" />
          <span className="text-lg font-medium">Net Banking (via Razorpay)</span>
        </div>
        <div className="flex items-center space-x-3 bg-white shadow p-4 rounded-lg">
          <FaMoneyBillWave className="text-3xl text-yellow-600" />
          <span className="text-lg font-medium">Cash on Delivery (within 15km)</span>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        Note: All online payments are processed securely. You will receive confirmation once the order is placed.
      </p>
    </div>
  </section>
);

export default Payments;
