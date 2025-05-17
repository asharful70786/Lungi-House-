import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/get/${id}`)
      .then(res => res.json())
      .then(setProduct)
      .catch(err => console.error("Failed to fetch product:", err));

    fetch("http://localhost:3000/auth/check", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setIsLoggedIn(data.loggedIn))
      .catch(err => {
        console.error("Login check failed", err);
        setIsLoggedIn(false);
      });
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      alert(data.message);
      navigate('/');
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete the product.");
    }
  };

  if (!product) {
    return <div className="text-center mt-10"><Loading /></div>;
  }

  const whatsappLink = `https://wa.me/91967965448?text=${encodeURIComponent(
    `Hi, I'm interested in this product:\n\n${product.name}\n₹${product.price}\n\n${window.location.href}\n\nImage: ${product.image}`
  )}`;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row transition-all duration-300">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-start">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl w-full max-w-sm object-cover border border-gray-200 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right Info Section */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>

          <p className="text-2xl text-green-600 font-bold mb-2">
            ₹{product.price}{' '}
            <span className="text-sm line-through text-gray-400 ml-2">₹{product.price + 300}</span>{' '}
            <span className="text-sm text-red-500 font-medium ml-1">Save ₹300!</span>
          </p>

          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-sm text-gray-500 mb-2"><b>Category</b>: {product.category}</p>

          {product.isBestSelling && (
            <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              🔥 Best Seller
            </span>
          )}

          <ul className="list-disc list-inside text-sm text-gray-700 mb-4 space-y-1">
            {/* <li>✅ 7-day return policy</li> */}
            <li>🚚 Fast delivery across India</li>
            <li>💯 100% Original product guaranteed</li>
            <li>🧾Bill invoice available on request</li>
          </ul>

          <div className="flex gap-4 mt-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>🔒</span> Secure Payment
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>📦</span> Quality Checked
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>🎯</span> Customer Support
            </div>
          </div>

          {/* WhatsApp Order Box - Clickable Entire Box */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="flex items-center gap-4 bg-green-100 border-l-4 border-green-500 p-4 rounded-lg shadow-md mb-4 hover:bg-green-200 cursor-pointer transition-all duration-200">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-12 h-12"
              />
              <div>
                <p className="text-lg font-bold text-green-800">
                  📦 Order on WhatsApp 
                </p>
                <p className="text-red-600 font-semibold animate-pulse">
                  Only a few left in stock – Order Now!
                </p>
              </div>
            </div>
          </a>

          {/* Delivery Info (Static) */}
          <p className="text-sm text-gray-600 mb-1">
            Delivery anywhere in India <strong>within 7 days</strong>
          </p>
          <p className="text-xs text-gray-400 italic mb-4">
            User review section will be added soon.
          </p>

          {isLoggedIn && (
            <div className="flex gap-4 mt-4">
              <Link
                to={`/edit/${product._id}`}
                className="bg-yellow-400 hover:bg-yellow-500 text-sm px-5 py-2 rounded font-medium transition-all"
              >
                ✏️ Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-5 py-2 rounded font-medium transition-all"
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
