import React, { useState } from 'react';
import { HelpCircle, Truck, PackageCheck, ShieldCheck, RotateCw, ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: 'What types of products do you sell?',
    answer: 'We specialize in all kinds of Indian and Bangladeshi lungis, gamchas, towels, and vests. All are 100% original and directly sourced.',
    icon: <PackageCheck className="text-blue-600 w-6 h-6" />
  },
  {
    question: 'Do you offer home delivery?',
    answer: 'Yes! We provide home delivery within 5km of our shop in Kaliachak, Malda. We also deliver across India via courier.',
    icon: <Truck className="text-green-600 w-6 h-6" />
  },
  {
    question: 'Are your products original?',
    answer: 'Absolutely. All our products are imported directly from trusted manufacturers and we guarantee authenticity.',
    icon: <ShieldCheck className="text-purple-600 w-6 h-6" />
  },
  {
    question: 'Can I return or exchange an item?',
    answer: 'Yes, items can be returned or exchanged within 7 days if they are unused and in original condition. Please contact us on WhatsApp for assistance.',
    icon: <RotateCw className="text-yellow-600 w-6 h-6" />
  },
  {
    question: 'How can I contact you?',
    answer: 'You can WhatsApp us directly at +91 96796 54448  for quick support.',
    icon: <HelpCircle className="text-red-600 w-6 h-6" />
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-white text-gray-800 py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto bg-gray-100 rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 border-b pb-2 border-blue-300">Frequently Asked Questions</h1>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm transition">
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-blue-50 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-lg font-medium text-gray-900">{item.question}</span>
                </div>
                <div>
                  {openIndex === index ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-12 pb-4 text-gray-700">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
