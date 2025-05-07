import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import "./App.css";
import Loading from './Loading';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/get/${id}`)
      .then(res => res.json())
      .then(setProduct);

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

    const response = await fetch(`http://localhost:3000/delete/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
    const data = await response.json();
    alert(data.message);
    navigate('/');
  };

  if (!product) return <div className="text-center mt-10"><Loading /></div>;

  return (
    <div className="animated-bg">
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
        <div className="relative w-[350px] h-[300px] mx-auto rounded overflow-hidden">
          {product.isBestSelling && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow z-10 flex items-center gap-1">
              🔥 Best Seller
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded"
          />
        </div>
  
        <h1 className="text-xl font-bold mt-4 text-gray-800">{product.name}</h1>
        <p className="text-lg text-green-600 font-semibold mt-1">₹{product.price}</p>
        <p className="text-sm text-gray-700 mt-2">{product.description}</p>
        <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
        <p className="text-xs text-gray-400 mt-1 italic">User Review Section will be added in the future</p>
  
        {isLoggedIn && (
          <div className="flex justify-between mt-6">
            <Link to={`/edit/${product._id}`} className="bg-yellow-400 px-4 py-2 rounded font-medium">
              ✏️ Edit
            </Link>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded font-medium">
              🗑 Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
  
};

export default ProductDetail;
