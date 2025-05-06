import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* //set margein right 1p pz */}
        <h1 className="font-bold mr-25 text-2xl">Lungi House</h1>


        {/* Hamburger Icon */}
        <button 
          className="lg:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Menu */}
        <div className={`flex-col lg:flex-row lg:flex gap-5 text-sm sm:text-base items-center lg:static absolute top-full left-0 w-full bg-blue-800 lg:bg-transparent px-6 py-4 lg:p-0 transition-all duration-300 ease-in-out ${isMenuOpen ? 'flex' : 'hidden'}`}>
          <Link to="/" onClick={closeMenu} className="hover:bg-blue-700 rounded-md p-2 text-center w-full lg:w-auto">Home</Link>
          <a href="/contact" onClick={closeMenu} className="hover:bg-blue-700 rounded-md p-2 text-center w-full lg:w-auto">Contact Us</a>
          <a href="location" onClick={closeMenu} className="hover:bg-blue-700 rounded-md p-2 text-center w-full lg:w-auto">Location</a>
          <a href="tel:1234567890" onClick={closeMenu} className="hover:bg-blue-700 rounded-md p-2 text-center w-full lg:w-auto">📞 123-456-7890</a>

          {!isLoggedIn ? (
            <Link 
              to="/login" 
              onClick={closeMenu}
              className="text-blue-400 hover:bg-blue-700 rounded-md p-2 text-center w-full lg:w-auto"
            >
              Login
            </Link>
          ) : (
            <button 
              onClick={() => {
                logout();
                closeMenu();
              }} 
              className="text-red-400 hover:bg-blue-700 rounded-md p-2 text-center w-full lg:w-auto"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
