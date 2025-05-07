import { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const validateForm = () => {
    const { name, email, phone, message } = formData;

    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s()+-]{10,15}$/;

    if (!nameRegex.test(name)) {
      return 'Please enter a valid name (only letters, 2–50 characters).';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    if (!phoneRegex.test(phone)) {
      return 'Please enter a valid phone number.';
    }
    if (message.length < 10 || message.length > 1000) {
      return 'Message should be between 10 and 1000 characters.';
    }

    return null; // no error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setResponseMessage(error);
      setShowPopup(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResponseMessage(data.message || 'Something happened.');
      setShowPopup(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setResponseMessage('Something went wrong. Please try again.');
      setShowPopup(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      className={`relative py-10 px-6 min-h-screen flex items-center justify-center transition-all duration-300 ${
        loading ? 'bg-blue-800 animate-pulse' : 'bg-gradient-to-r from-blue-900 to-blue-700'
      }`}
    >
      {/* Floating "Sending..." badge */}
      {loading && (
        <div className="absolute top-5 right-5 bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow-md animate-bounce z-50">
          Sending...
        </div>
      )}

      {/* Response popup */}
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg shadow-lg p-6 max-w-sm w-full relative animate-fadeIn">
            <button
              className="absolute top-2 right-3 text-gray-600 text-xl font-bold hover:text-red-600"
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-2">Message</h3>
            <p>{responseMessage}</p>
          </div>
        </div>
      )}

      <div className="bg-white text-black shadow-lg rounded-xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. +91 12345 67890"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us how we can help you"
            ></textarea>
          </div>

          <button
  type="submit"
  disabled={loading}
  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
>
  {loading ? (
    <span className="flex items-center gap-2">
      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      Sending...
    </span>
  ) : (
    'Send Message'
  )}
</button>

        </form>
      </div>
    </section>
  );
}

export default ContactUs;
