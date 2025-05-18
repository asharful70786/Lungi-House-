import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', price: '', category: '', description: '', image: '' })

  useEffect(() => {
    fetch(`https://lungi-house.onrender.com/get/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`https://lungi-house.onrender.com/update/${id}`, {
      credentials: 'include',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    navigate(`/product/${id}`)
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-15">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" />
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" />
        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded"></textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  )
}

export default EditProduct
