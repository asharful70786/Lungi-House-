import React from 'react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        
        {/* About Section */}
        <div>
          <h4 className="text-white font-semibold mb-2">About</h4>
          <ul className="space-y-1">
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            {/* <li>Press</li> */}
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h4 className="text-white font-semibold mb-2">Help</h4>
          <ul className="space-y-1">
            <li>Payments</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Policy Section */}
        <div>
          <h4 className="text-white font-semibold mb-2">Policy</h4>
          <ul className="space-y-1">
            <li>Terms of Use</li>
            <li>Privacy</li>
            <li>Security</li>
            <li>Sitemap</li>
          </ul>
        </div>

        {/* Developer Info */}
        <div>
          <h4 className="text-white font-semibold mb-2">Developer Info</h4>
          <ul className="space-y-1">
            <li>👨‍💻 Built by <span className="text-yellow-400 font-semibold">Ashraful</span></li>
            <li>📍 Mumbai, India</li>
            <li>📞 <span className="text-green-400 font-bold">+91-7076091389</span></li>
            <li>📧 ashrafulmomin530@example.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        &copy; {year} Lungi House. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
