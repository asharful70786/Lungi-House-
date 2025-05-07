import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    isBestSelling: ''
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
      alert("You can't upload. Try contacting the owner.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10 border border-gray-200">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Upload Product</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="name"
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="price"
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="category"
          onChange={handleChange}
          placeholder="Category"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="image"
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {/* Dropdown for isBestSelling */}
        <select
          name="isBestSelling"
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Is Best Selling?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadProduct;


