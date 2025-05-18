import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const logout = async () => {
    await fetch("https://lungi-house.onrender.com/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-900 text-white fixed w-full top-0 left-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">Lungi House</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <input
              type="text"
              placeholder="Search for products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-1 rounded-md text-black"
            />
           <Link to="/about" className="hover:text-yellow-300">About</Link>
            <Link to="/cart" className="hover:text-yellow-300 flex items-center gap-1">
              <FaShoppingCart /> Cart
            </Link>
            <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
            <Link to="/location" className="hover:text-yellow-300">Location</Link>
            <a href="tel:1234567890" className="hover:text-yellow-300">📞 9679654448</a>

            {!isLoggedIn ? (
              <Link to="/login" className="hover:text-yellow-300 flex items-center gap-1">
                <FaUserCircle /> Login
              </Link>
            ) : (
              <button
                onClick={logout}
                className="hover:text-yellow-300 flex items-center gap-1"
              >
                <FaUserCircle /> Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white text-2xl">
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-blue-800 px-6 py-8 z-40 flex flex-col gap-6 overflow-y-auto">
          <button onClick={closeMenu} className="absolute top-4 right-4 text-white text-2xl">
            <FaTimes />
          </button>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-md text-black"
          />

          <Link to="/cart" onClick={closeMenu} className="text-xl font-semibold text-white">🛒 Cart</Link>
          <Link to="/contact" onClick={closeMenu} className="text-xl font-semibold text-white">Contact</Link>
          <Link to="/location" onClick={closeMenu} className="text-xl font-semibold text-white">Location</Link>
          <a href="tel:1234567890" onClick={closeMenu} className="text-xl font-semibold text-white">📞 123-456-7890</a>

          {!isLoggedIn ? (
            <Link to="/login" onClick={closeMenu} className="text-xl font-semibold text-white">Login</Link>
          ) : (
            <button
              onClick={() => { logout(); closeMenu(); }}
              className="text-xl font-semibold text-white"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
