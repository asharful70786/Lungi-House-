import React from 'react'

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-10">
    <div className="max-w-6xl mx-auto text-center space-y-1 text-sm">
      <div>📧 Email: support@example.com</div>
      <div>📍 Location: Mumbai, India</div>
      <div>📞 Phone: 123-456-7890</div>
      <div className="mt-2">&copy; {new Date().getFullYear()} Lungi House. All rights reserved.</div>
    </div>
  </footer>
  )
}

export default Footer