import React from 'react';
import { ShieldCheck, Ban, Gavel, Info } from 'lucide-react';

const TermsOfUse = () => (
  <div className="p-6 max-w-4xl mx-auto text-gray-800">
    <h1 className="text-3xl font-bold mb-6 text-blue-800 flex items-center gap-2">
      <ShieldCheck className="text-blue-600" /> Terms of Use
    </h1>

    <section className="mb-6">
      <p className="mb-3">
        Welcome to <strong>Kaliachak Lungi House</strong>. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
      </p>
      <ul className="list-disc list-inside space-y-2 text-sm leading-6">
        <li>
          <Ban className="inline w-4 h-4 text-red-500 mr-1" />
          Users must not place fraudulent, fake, or misleading orders.
        </li>
        <li>
          <Gavel className="inline w-4 h-4 text-yellow-600 mr-1" />
          Users must not misuse website content or violate any applicable Indian or international laws.
        </li>
        <li>
          <ShieldCheck className="inline w-4 h-4 text-green-500 mr-1" />
          We reserve the right to suspend or permanently ban accounts involved in suspicious activities.
        </li>
        <li>
          <Info className="inline w-4 h-4 text-blue-400 mr-1" />
          All offers and discounts are subject to change without prior notice. We reserve full rights to add, remove, or modify any deals, shipping policies, or product listings.
        </li>
      </ul>
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Data Privacy & Security</h2>
      <p className="text-sm text-gray-700">
        We are committed to protecting your privacy. Your data is collected only for order processing and improving your experience. We do not sell or share your information with any third party without consent. Please refer to our <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a> for more details.
      </p>
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Customer Commitment</h2>
      <p className="text-sm text-gray-700">
        We are proud to serve thousands of satisfied customers across India. Every product listed on our platform is backed by a <strong>100% originality guarantee</strong>. Our team, including owner <strong>Aktar Alam</strong> and staff, are dedicated to making your shopping experience smooth, secure, and satisfying.
      </p>
    </section>

    <div className="text-xs text-gray-500 mt-10 border-t pt-4">
      Last updated: {new Date().toLocaleDateString()}
    </div>
  </div>
);

export default TermsOfUse;
