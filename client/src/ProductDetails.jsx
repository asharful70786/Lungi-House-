import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './App.css';
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

  return (
    <div className="animated-bg min-h-screen py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded max-w-full h-auto"
            style={{ maxHeight: '500px' }}
          />
        </div>

        {/* Best Seller Tag */}
        {product.isBestSelling && (
          <div className="mt-2 flex justify-center">
            <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              🔥 Best Seller
            </span>
          </div>
        )}

        {/* Product Info */}
        <h1 className="text-2xl font-bold mt-4 text-gray-800">{product.name}</h1>
        <p className="text-lg text-green-600 font-semibold mt-1">₹{product.price}</p>
        <p className="text-sm text-gray-700 mt-3">{product.description}</p>
        <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>
        <p className="text-xs text-gray-400 mt-1 italic">User review section will be added soon.</p>

        {/* Edit/Delete Buttons */}
        {isLoggedIn && (
          <div className="flex justify-between mt-6">
            <Link
              to={`/edit/${product._id}`}
              className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded font-medium text-sm"
            >
              ✏️ Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium text-sm"
            >
              🗑 Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
