import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const sampleImages = [
  'https://images.unsplash.com/photo-1745179276969-d9db2e682b5d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Lungi-like cloth
  'https://images.unsplash.com/photo-1741802872469-b404a312fa91?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Textile image
  'https://images.unsplash.com/photo-1745179276969-d9db2e682b5d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Bangladeshi style
  'https://images.unsplash.com/photo-1741802872469-b404a312fa91?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Fabric store sample
];

const AboutUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sampleImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-white text-gray-800 py-12 px-6 md:px-12 mt-10">
      <div className="max-w-5xl mx-auto bg-gray-100 rounded-2xl shadow-lg overflow-hidden">
        {/* Image Carousel */}
        <div className="w-full h-64 md:h-96 overflow-hidden relative">
          <img
            src={sampleImages[currentIndex]}
            alt="Store Display"
            className="w-full h-full object-cover transition duration-1000 ease-in-out"
          />
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
            {sampleImages.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-blue-300'
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* About Text Content */}
        <div className="p-10">
          <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b pb-2 border-blue-200">
            About Us
          </h1>
          <p className="text-lg leading-relaxed mb-6">
            Welcome to <span className="text-blue-600 font-semibold">Kaliachak Lungi House</span> – your one-stop shop for all kinds of Indian and Bangladeshi lungis.
            We proudly import authentic Bangladeshi <strong>lungis</strong>, <strong>gamchas</strong>, <strong>towels</strong>, and <strong>vests</strong> directly and sell both wholesale and retail.
            <br /><br />
            Located in <span className="font-medium">Kaliachak, Malda - 733301</span>, and led by <strong>Aktar Alam</strong>, our shop is a household name trusted for quality and reliability.
            We deliver all over India and offer home delivery within 15km.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-green-700 mb-2">100% Original Guarantee</h2>
            <p>All products at <strong>LungiHouse.com</strong> are guaranteed to be authentic and of premium quality.</p>
          </div>

          {/* WhatsApp CTA */}
          <div className="flex items-center justify-start space-x-4">
            <a
              href="https://wa.me/919679654448"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition"
            >
              <FaWhatsapp className="mr-2 text-xl" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
