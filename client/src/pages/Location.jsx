import React from 'react';

function Location() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">📍 Our Location</h2>
          <p className="text-gray-600 mb-6">
            Visit us at Lungi House, Kaliachak, Malda, West Bengal 732201. We're happy to welcome you!
          </p>

          <div className="aspect-w-16 aspect-h-9">
            <iframe
              title="Lungi House Location"
              className="w-full h-96 rounded-lg border"
              src="https://www.google.com/maps?q=Lungi%20House,%20Kaliachak,%20Malda,%20West%20Bengal%20732201&output=embed"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
