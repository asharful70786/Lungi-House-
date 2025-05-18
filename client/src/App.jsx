
import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetch('https://lungi-house.onrender.com')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

 

  return (
    <div className="min-h-screen bg-white py-10 px-4 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800"></h1>
          {isLoggedIn && (
            <Link to="/upload" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow-md">
              + Add Product
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <div
              key={product._id}
              className="border rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover"
                />
              </Link>

              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-lg font-semibold mb-1 text-gray-900">{product.name}</h2>
                  <p className="text-red-600 font-semibold text-sm mb-1">₹{product.price}</p>
                  <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                    <Link
                    to={`/product/${product._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>


                </div>

                <div className="mt-4 flex justify-between items-center bg-red-700">
                  <Link
                    to={`/product/${product._id}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    View
                  </Link>

                  


                  <a
                    href={`https://wa.me/?text=Check%20this%20product:%20${window.location.origin}/product/${product._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-700 transition"
                    title="Share on WhatsApp"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-5 h-5"
                      viewBox="0 0 16 16"
                    >
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
