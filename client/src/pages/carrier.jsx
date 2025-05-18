// Careers.jsx
import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Careers = () => (
  <section className="min-h-screen bg-white text-gray-800 py-12 px-6 md:px-12">
    <div className="max-w-5xl mx-auto bg-gray-100 rounded-2xl shadow-lg p-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b pb-2 border-blue-200">Careers</h1>
      <p className="text-lg leading-relaxed mb-6">
        At <span className="text-blue-600 font-semibold">Kaliachak Lungi House</span>, we're more than just a shop — we're a family of passionate individuals delivering comfort, quality, and tradition.
        We are always looking for driven and energetic team members who can help us grow and better serve our customers.
      </p>

      <ul className="list-disc pl-6 mb-6 text-gray-700">
        <li><strong>Retail Assistant:</strong> Help customers in-store and manage daily sales.</li>
        <li><strong>Delivery Executive:</strong> Deliver products locally (within 15km).</li>
        <li><strong>Warehouse & Stock Manager:</strong> Maintain inventory and assist with orders.</li>
        <li><strong>Online Sales Coordinator:</strong> Manage website orders and customer queries.</li>
      </ul>

      <p className="text-md mb-6">
        If you're enthusiastic, responsible, and want to work in a fast-growing retail business, we’d love to hear from you.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-2">Get in Touch</h2>
        <div className="space-y-2 text-gray-700">
          <p className="flex items-center"><FaPhoneAlt className="mr-2 text-green-600" /> <span>+91-96796544448</span></p>
          {/* <p className="flex items-center"><FaEnvelope className="mr-2 text-blue-500" /> <span>ashrafulmomin530@example.com</span></p> */}
          <a
            href="https://wa.me/919679654448"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition"
          >
            <FaWhatsapp className="mr-2 text-xl" /> Message on WhatsApp
          </a>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        We are committed to providing equal opportunities and a respectful workplace for all.
      </p>
    </div>
  </section>
);

export default Careers;