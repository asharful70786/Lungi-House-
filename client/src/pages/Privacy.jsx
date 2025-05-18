import React from 'react';
import { ShieldCheck, Lock, Globe, MailCheck, UserCheck, KeyRound } from 'lucide-react';

const PrivacyPolicy = () => (
  <div className="px-6 py-10 max-w-5xl mx-auto text-gray-800 mt-10">
    <h1 className="text-4xl font-bold mb-6 text-blue-800 flex items-center gap-2">
      <ShieldCheck className="text-blue-700 w-8 h-8" />
      Privacy Policy
    </h1>

    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Section 1 */}
      <div className="flex items-start gap-4">
        <UserCheck className="text-blue-600 w-6 h-6 mt-1" />
        <p className="text-lg leading-relaxed">
          We respect your privacy and are committed to protecting the personal information you share with us at <strong>Kaliachak Lungi House</strong>. This includes your name, address, contact number, and payment details.
        </p>
      </div>

      {/* Section 2 */}
      <div className="flex items-start gap-4">
        <Lock className="text-green-600 w-6 h-6 mt-1" />
        <p className="text-lg leading-relaxed">
          All information is collected through secure, encrypted protocols (HTTPS) and stored safely. We ensure that none of your sensitive data is misused, sold, or shared without your direct consent.
        </p>
      </div>

      {/* Section 3 */}
      <div className="flex items-start gap-4">
        <KeyRound className="text-yellow-600 w-6 h-6 mt-1" />
        <p className="text-lg leading-relaxed">
          You have complete control over your personal data. If you wish to update, delete, or review your data, you may request it anytime via our support.
        </p>
      </div>

      {/* Section 4 */}
      <div className="flex items-start gap-4">
        <Globe className="text-purple-600 w-6 h-6 mt-1" />
        <p className="text-lg leading-relaxed">
          We comply with Indian IT Act (2000) and GDPR-like principles. We use your information only to fulfill orders, handle delivery, improve our platform, and ensure seamless customer service.
        </p>
      </div>

      {/* Contact */}
      <div className="flex items-start gap-4">
        <MailCheck className="text-gray-600 w-6 h-6 mt-1" />
        <p className="text-lg leading-relaxed">
          Have questions? Our developer is available for privacy-related concerns at <a href="mailto:ashrafulmomin530@example.com" className="text-blue-600 underline">ashrafulmomin530@example.com</a>
        </p>
      </div>
    </div>

    <div className="text-xs text-gray-500 mt-8 border-t pt-4">
      Last updated: {new Date().toLocaleDateString()} | © {new Date().getFullYear()} Kaliachak Lungi House
    </div>
  </div>
);

export default PrivacyPolicy;
