import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/upload", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: form })
    });

    if (res.ok) {
      navigate("/");
    } else {
      alert("you cant upload try to Contact the Owner ");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Upload Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} placeholder="Product Name" className="w-full border px-4 py-2 rounded" required />
        <input name="price" onChange={handleChange} placeholder="Price" type="number" className="w-full border px-4 py-2 rounded" required />
        <input name="category" onChange={handleChange} placeholder="Category" className="w-full border px-4 py-2 rounded" required />
        <input name="image" onChange={handleChange} placeholder="Image URL" className="w-full border px-4 py-2 rounded" required />
        <textarea name="description" onChange={handleChange} placeholder="Description" className="w-full border px-4 py-2 rounded" required></textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Upload</button>
      </form>
    </div>
  );
}

export default UploadProduct;
