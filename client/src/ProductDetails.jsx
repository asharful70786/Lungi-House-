import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import "./App.css"
import Loading from './Loading'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch product
    fetch(`http://localhost:3000/get/${id}`)
      .then(res => res.json())
      .then(setProduct)

    // Check login from backend (more secure than document.cookie)
    fetch("http://localhost:3000/auth/check", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setIsLoggedIn(data.loggedIn))
      .catch(err => {
        console.error("Login check failed", err)
        setIsLoggedIn(false)
      });
  }, [id])

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure to delete this product?")
    if (!confirmDelete) return;

    const response = await fetch(`http://localhost:3000/delete/${id}`, {
      credentials: "include",  
      method: "DELETE",
    });
    const data = await response.json();
    alert(data.message);
    navigate('/')
  }

  if (!product) return <div className="text-center mt-10"><Loading /></div>

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-[300px] h-[160px] object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-xl text-green-600 font-semibold mt-1">₹{product.price}</p>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p>Category: {product.category}</p>
      <p className="text-sm text-gray-400 mt-1">User Review Section will be added in the future</p>

      {isLoggedIn && (
        <div className="flex justify-between mt-6">
          <Link to={`/edit/${product._id}`} className="bg-yellow-400 px-4 py-2 rounded">Edit</Link>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
