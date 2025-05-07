import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    await fetch(`http://localhost:3000/delete/${id}`, {
      credentials: "include",
      method: "DELETE"
    });

    setProducts(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-blue-50 to-white">
      {/* Heartbeat Background */}
      <div className="heartbeat-bg"></div>

      <div className="flex-grow">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-700">Products</h1>
            {isLoggedIn && (
              <Link
                to="/upload"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                + Add Product
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div
                key={product._id}
                className="border rounded-xl shadow-md bg-white p-4 flex flex-col items-center hover:shadow-lg transition duration-200 transform hover:scale-105"
              >
                <div className="relative">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded mb-2 transition-transform duration-300 transform hover:scale-110"
                    />
                    {product.isBestSelling && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow z-50 flex items-center gap-1">
                        🔥 Best Seller
                      </div>
                    )}
                  </Link>
                </div>
                <h2 className="text-xl font-semibold text-center">{product.name}</h2>
                <p className="text-gray-700">₹{product.price}</p>
                <p className="text-sm text-gray-500 text-center mt-1">{product.description}</p>
                <div className="mt-3 flex justify-between w-full px-4">
                  <Link
                    to={`/product/${product._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  {/* Uncomment this block if you want to allow delete */}
                  {/* {isLoggedIn && (
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
